---
id: integrate_with_sentencetransformers.md
summary: تناقش هذه الصفحة البحث عن الأفلام باستخدام ميلفوس
title: البحث عن الأفلام باستخدام Milvus و SentenceTransformers
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">البحث عن الأفلام باستخدام Milvus و SentenceTransformers<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>في هذا المثال، سنبحث في هذا المثال عن ملخصات حبكة الفيلم باستخدام Milvus ومكتبة SentenceTransformers. مجموعة البيانات التي سنستخدمها هي <a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">مؤامرات أفلام ويكيبيديا مع ملخصات</a> مستضافة على HuggingFace.</p>
<p>لنبدأ!</p>
<h2 id="Required-Libraries" class="common-anchor-header">المكتبات المطلوبة<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>في هذا المثال، سنستخدم في هذا المثال <code translate="no">pymilvus</code> للاتصال لاستخدام ميلفوس، و <code translate="no">sentence-transformers</code> لتوليد تضمينات المتجهات، و <code translate="no">datasets</code> لتنزيل مجموعة بيانات المثال.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>سنحدد بعض المعلمات العامة,</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">تنزيل مجموعة البيانات وفتحها<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>في سطر واحد، يتيح لنا <code translate="no">datasets</code> تنزيل مجموعة بيانات وفتحها. ستقوم المكتبة بتخزين مجموعة البيانات مؤقتًا محليًا واستخدام تلك النسخة في المرة التالية التي يتم تشغيلها فيها. يحتوي كل صف على تفاصيل فيلم يحتوي على مقالة ويكيبيديا مصاحبة له. نستخدم الأعمدة <code translate="no">Title</code> و <code translate="no">PlotSummary</code> و <code translate="no">Release Year</code> و <code translate="no">Origin/Ethnicity</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">الاتصال بقاعدة البيانات<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>في هذه المرحلة، سنبدأ في إعداد ميلفوس. الخطوات كالتالي:</p>
<ol>
<li>إنشاء قاعدة بيانات ميلفوس لايت في ملف محلي. (استبدل عنوان URI هذا بعنوان الخادم الخاص بـ Milvus Standalone و Milvus Distributed).</li>
</ol>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>إنشاء مخطط البيانات. هذا يحدد الحقول التي تشكل العنصر بما في ذلك بُعد تضمين المتجه.</li>
</ol>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
    FieldSchema(name=<span class="hljs-string">&quot;year&quot;</span>, dtype=DataType.INT64),
    FieldSchema(name=<span class="hljs-string">&quot;origin&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">64</span>),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>تحديد خوارزمية فهرسة البحث المتجه. يدعم Milvus Lite نوع الفهرس المسطح، في حين أن Milvus Standalone وMilvus Distributed ينفذان مجموعة متنوعة من الأساليب مثل IVF وHNSW وDiskANN. بالنسبة للنطاق الصغير للبيانات في هذا العرض التوضيحي، يكفي أي نوع فهرس بحث، لذا نستخدم أبسط نوع FLAT هنا.</li>
</ol>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد الانتهاء من هذه الخطوات، نكون جاهزين لإدراج البيانات في المجموعة وإجراء بحث. ستتم فهرسة أي بيانات مضافة تلقائيًا وستكون متاحة للبحث على الفور. إذا كانت البيانات حديثة جدًا، فقد يكون البحث أبطأ حيث سيتم استخدام البحث بالقوة الغاشمة على البيانات التي لا تزال قيد الفهرسة.</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">إدراج البيانات<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>في هذا المثال، سنستخدم في هذا المثال نموذج SentenceTransformers miniLM لإنشاء تضمينات لنص المؤامرة. يُرجع هذا النموذج تضمينات ذات 384 بُعدًا.</p>
<pre><code translate="no" class="language-python">model = SentenceTransformer(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>نقوم بتكرار صفوف البيانات، ونقوم بتضمين حقل ملخص الرسم البياني، وإدراج الكيانات في قاعدة بيانات المتجهات. بشكل عام، يجب عليك تنفيذ هذه الخطوة على دفعات من عناصر البيانات لزيادة إنتاجية وحدة المعالجة المركزية أو وحدة معالجة الرسومات لنموذج التضمين، كما نفعل هنا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    embeddings = model.encode(batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>])
    data = [
        {<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding, <span class="hljs-string">&quot;year&quot;</span>: year, <span class="hljs-string">&quot;origin&quot;</span>: origin}
        <span class="hljs-keyword">for</span> title, embedding, year, origin <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(
            batch[<span class="hljs-string">&quot;Title&quot;</span>], embeddings, batch[<span class="hljs-string">&quot;Release Year&quot;</span>], batch[<span class="hljs-string">&quot;Origin/Ethnicity&quot;</span>]
        )
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تستغرق العملية المذكورة أعلاه وقتًا طويلًا نسبيًا لأن التضمين يستغرق وقتًا. تستغرق هذه الخطوة حوالي دقيقتين باستخدام وحدة المعالجة المركزية على جهاز MacBook Pro 2023 وستكون أسرع بكثير مع وحدات معالجة الرسومات المخصصة. خذ استراحة واستمتع بفنجان قهوة!</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">إجراء البحث<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>مع إدخال جميع البيانات في Milvus، يمكننا البدء في إجراء عمليات البحث. في هذا المثال، سنقوم بالبحث عن الأفلام بناءً على ملخصات الحبكة من ويكيبيديا. نظرًا لأننا نجري بحثًا دفعيًا، يتم تقاسم وقت البحث عبر عمليات البحث عن الأفلام. (هل يمكنك تخمين الفيلم الذي كنت أفكر في استرجاعه بناءً على نص وصف الاستعلام؟)</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&#x27;A shark terrorizes an LA beach.&#x27;</span>,
    <span class="hljs-string">&#x27;An archaeologist searches for ancient artifacts while fighting Nazis.&#x27;</span>,
    <span class="hljs-string">&#x27;Teenagers in detention learn about themselves.&#x27;</span>,
    <span class="hljs-string">&#x27;A teenager fakes illness to get off school and have adventures with two friends.&#x27;</span>,
    <span class="hljs-string">&#x27;A young couple with a kid look after a hotel during winter and the husband goes insane.&#x27;</span>,
    <span class="hljs-string">&#x27;Four turtles fight bad guys.&#x27;</span>
    ]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_query</span>(<span class="hljs-params">data</span>):
    vectors = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> vectors]


query_vectors = embed_query(queries)

res = client.search(
    collection_name=collection_name,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;origin == &quot;American&quot; and year &gt; 1945 and year &lt; 2000&#x27;</span>,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>],
)

<span class="hljs-keyword">for</span> idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries[idx])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>].get(<span class="hljs-string">&quot;title&quot;</span>), <span class="hljs-string">&quot;(&quot;</span>, <span class="hljs-built_in">round</span>(hit[<span class="hljs-string">&quot;distance&quot;</span>], <span class="hljs-number">2</span>), <span class="hljs-string">&quot;)&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>النتائج هي</p>
<pre><code translate="no" class="language-shell">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
Love Slaves of the Amazons ( 0.4 )
A Time to Love and a Time to Die ( 0.39 )
The Fifth Element ( 0.39 )

Query: Teenagers in detention learn about themselves.
Results:
The Breakfast Club ( 0.54 )
Up the Academy ( 0.46 )
Fame ( 0.43 )

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
Ferris Bueller&#x27;s Day Off ( 0.48 )
Fever Lake ( 0.47 )
Losin&#x27; It ( 0.39 )

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
The Shining ( 0.48 )
The Four Seasons ( 0.42 )
Highball ( 0.41 )

Query: Four turtles fight bad guys.
Results:
Teenage Mutant Ninja Turtles II: The Secret of the Ooze ( 0.47 )
Devil May Hare ( 0.43 )
Attack of the Giant Leeches ( 0.42 )
<button class="copy-code-btn"></button></code></pre>
