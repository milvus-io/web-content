---
id: hdbscan_clustering_with_milvus.md
summary: >-
  في هذا الدفتر، سوف نستخدم نموذج التضمين BGE-M3 لاستخراج التضمينات من مجموعة
  بيانات عناوين الأخبار، واستخدام Milvus لحساب المسافات بين التضمينات بكفاءة
  لمساعدة HDBSCAN في التجميع، ثم تصور النتائج للتحليل باستخدام طريقة UMAP. هذا
  الدفتر هو تكييف لمقالة ديلان كاستيلو من Milvus.
title: تجميع HDBSCAN مع ميلفوس
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="HDBSCAN-Clustering-with-Milvus" class="common-anchor-header">تجميع HDBSCAN مع ميلفوس<button data-href="#HDBSCAN-Clustering-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>يمكن تحويل البيانات إلى تجميعات باستخدام نماذج التعلم العميق، والتي تلتقط تمثيلات ذات معنى للبيانات الأصلية. من خلال تطبيق خوارزمية تجميع غير خاضعة للإشراف، يمكننا تجميع نقاط البيانات المتشابهة معًا استنادًا إلى أنماطها المتأصلة. HDBSCAN (التجميع المكاني القائم على الكثافة الهرمي للتطبيقات مع الضوضاء) هي خوارزمية تجميع مستخدمة على نطاق واسع تقوم بتجميع نقاط البيانات بكفاءة من خلال تحليل كثافتها ومسافتها. وهي مفيدة بشكل خاص لاكتشاف التكتلات ذات الأشكال والأحجام المختلفة. في هذا الدفتر، سنستخدم HDBSCAN مع قاعدة بيانات Milvus، وهي قاعدة بيانات متجهة عالية الأداء، لتجميع نقاط البيانات في مجموعات متميزة بناءً على تضميناتها.</p>
<p>HDBSCAN (التجميع المكاني القائم على الكثافة الهرمية للتطبيقات مع الضوضاء) هي خوارزمية تجميع تعتمد على حساب المسافات بين نقاط البيانات في مساحة التضمين. تمثل هذه التضمينات، التي تم إنشاؤها بواسطة نماذج التعلم العميق، البيانات في شكل عالي الأبعاد. لتجميع نقاط البيانات المتشابهة، تحدد HDBSCAN تقاربها وكثافتها، ولكن قد يكون حساب هذه المسافات بكفاءة، خاصةً بالنسبة لمجموعات البيانات الكبيرة، أمرًا صعبًا.</p>
<p>تعمل قاعدة بيانات Milvus، وهي قاعدة بيانات متجهات عالية الأداء، على تحسين هذه العملية من خلال تخزين وفهرسة التضمينات، مما يسمح باسترجاع سريع للمتجهات المتشابهة. عند استخدامهما معًا، يتيح كل من HDBSCAN و Milvus تجميع مجموعات البيانات واسعة النطاق بكفاءة في مساحة التضمين.</p>
<p>في هذا الدفتر، سوف نستخدم نموذج التضمين BGE-M3 لاستخراج التضمينات من مجموعة بيانات عناوين الأخبار، واستخدام Milvus لحساب المسافات بين التضمينات بكفاءة لمساعدة HDBSCAN في التجميع، ثم تصور النتائج للتحليل باستخدام طريقة UMAP. هذا الدفتر عبارة عن تعديل <a href="https://dylancastillo.co/posts/clustering-documents-with-openai-langchain-hdbscan.html">لمقالة ديلان كاستيلو</a> من Milvus.</p>
<h2 id="Preparation" class="common-anchor-header">التحضير<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>تنزيل مجموعة بيانات الأخبار من https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install hdbscan</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install plotly</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install umap-learn</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Download-Data" class="common-anchor-header">تنزيل البيانات<button data-href="#Download-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتنزيل مجموعة بيانات الأخبار من https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/، واستخرج <code translate="no">news_data_dedup.csv</code> وضعها في الدليل الحالي.</p>
<p>أو يمكنك التنزيل عبر curl:</p>
<pre><code translate="no" class="language-bash">%%bash
curl -L -o ~/Downloads/news-headlines-2024.zip\
  https://www.kaggle.com/api/v1/datasets/download/dylanjcastillo/news-headlines-2024
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0 --:--:--     0
100  225k  100  225k    0     0  33151      0  0:00:06  0:00:06 --:--:-- 62160:03  114k  0:00:07  0:00:06  0:00:01 66615    0  30519      0  0:00:07  0:00:06  0:00:01 61622
</code></pre>
<h2 id="Extract-Embeddings-to-Milvus" class="common-anchor-header">استخراج التضمينات إلى ميلفوس<button data-href="#Extract-Embeddings-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>سننشئ مجموعة باستخدام Milvus، ونستخرج تضمينات كثيفة باستخدام نموذج BGE-M3.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, Collection, connections, CollectionSchema, DataType

load_dotenv()

df = pd.read_csv(<span class="hljs-string">&quot;news_data_dedup.csv&quot;</span>)


docs = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{title}</span>\n<span class="hljs-subst">{description}</span>&quot;</span> <span class="hljs-keyword">for</span> title, description <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(df.title, df.description)
]
ef = BGEM3EmbeddingFunction()

embeddings = ef(docs)[<span class="hljs-string">&quot;dense&quot;</span>]

connections.connect(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>إذا كنت تحتاج فقط إلى قاعدة بيانات متجهية محلية للبيانات الصغيرة الحجم أو النماذج الأولية، فإن تعيين uri كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هي الطريقة الأكثر ملاءمة، حيث تستخدم تلقائيًا Milvus <a href="https://milvus.io/docs/milvus_lite.md">Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، على سبيل المثال أكثر من مليون ناقل، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>. في هذا الإعداد، يُرجى استخدام عنوان الخادم والمنفذ كـ uri، على سبيل المثال<code translate="no">http://localhost:19530</code>. إذا قمت بتمكين ميزة المصادقة على Milvus، استخدم "<your_username>:<your_password>" كرمز مميز، وإلا فلا تقم بتعيين الرمز المميز.</li>
<li>إذا كنت تستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، فاضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> في Zilliz Cloud.</li>
</ul>
</blockquote>
</div>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(
        name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>
    ),  <span class="hljs-comment"># Primary ID field</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>
    ),  <span class="hljs-comment"># Float vector field (embedding)</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;text&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>
    ),  <span class="hljs-comment"># Float vector field (embedding)</span>
]

schema = CollectionSchema(fields=fields, description=<span class="hljs-string">&quot;Embedding collection&quot;</span>)

collection = Collection(name=<span class="hljs-string">&quot;news_data&quot;</span>, schema=schema)

<span class="hljs-keyword">for</span> doc, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(docs, embeddings):
    collection.insert({<span class="hljs-string">&quot;text&quot;</span>: doc, <span class="hljs-string">&quot;embedding&quot;</span>: embedding})
    <span class="hljs-built_in">print</span>(doc)

index_params = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;FLAT&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}

collection.create_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_params=index_params)

collection.flush()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Construct-the-Distance-Matrix-for-HDBSCAN" class="common-anchor-header">قم ببناء مصفوفة المسافة لـ HDBSCAN<button data-href="#Construct-the-Distance-Matrix-for-HDBSCAN" class="anchor-icon" translate="no">
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
    </button></h2><p>يتطلب HDBSCAN حساب المسافات بين النقاط من أجل التجميع، وهو ما يمكن أن يكون مكثفاً من الناحية الحسابية. نظرًا لأن النقاط البعيدة لها تأثير أقل على تعيينات التجميع، يمكننا تحسين الكفاءة من خلال حساب أقرب الجيران الأعلى-ك. في هذا المثال، نستخدم فهرس FLAT، ولكن بالنسبة لمجموعات البيانات واسعة النطاق، يدعم Milvus طرق فهرسة أكثر تقدمًا لتسريع عملية البحث. أولاً، نحتاج أولاً إلى الحصول على مكرر لتكرار مجموعة Milvus التي أنشأناها سابقًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> hdbscan
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> plotly.express <span class="hljs-keyword">as</span> px
<span class="hljs-keyword">from</span> umap <span class="hljs-keyword">import</span> UMAP
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(name=<span class="hljs-string">&quot;news_data&quot;</span>)
collection.load()

iterator = collection.query_iterator(
    batch_size=<span class="hljs-number">10</span>, expr=<span class="hljs-string">&quot;id &gt; 0&quot;</span>, output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>]
)

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
}  <span class="hljs-comment"># L2 is Euclidean distance</span>

ids = []
dist = {}

embeddings = []
<button class="copy-code-btn"></button></code></pre>
<p>سنقوم بتكرار جميع التضمينات في مجموعة ميلفوس. لكل تضمين، سنبحث في كل تضمين عن جيرانه الأعلى-ك في نفس المجموعة، ونحصل على معرفاتهم ومسافاتهم. ثم نحتاج أيضًا إلى إنشاء قاموس لتعيين المعرف الأصلي إلى فهرس متصل في مصفوفة المسافة. عند الانتهاء، نحتاج إلى إنشاء مصفوفة المسافة التي تمت تهيئتها بجميع العناصر على أنها ما لا نهاية وملء العناصر التي بحثنا عنها. بهذه الطريقة، سيتم تجاهل المسافة بين النقاط البعيدة. أخيرًا نستخدم مكتبة HDBSCAN لتجميع النقاط باستخدام مصفوفة المسافة التي أنشأناها. نحتاج إلى ضبط المقياس على "محسوب مسبقاً" للإشارة إلى أن البيانات هي مصفوفة المسافة بدلاً من التضمينات الأصلية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    batch = iterator.<span class="hljs-built_in">next</span>()
    batch_ids = [data[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    ids.extend(batch_ids)

    query_vectors = [data[<span class="hljs-string">&quot;embedding&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    embeddings.extend(query_vectors)

    results = collection.search(
        data=query_vectors,
        limit=<span class="hljs-number">50</span>,
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        param=search_params,
        output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
    )
    <span class="hljs-keyword">for</span> i, batch_id <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(batch_ids):
        dist[batch_id] = []
        <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results[i]:
            dist[batch_id].append((result.<span class="hljs-built_in">id</span>, result.distance))

    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>

ids2index = {}

<span class="hljs-keyword">for</span> <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> dist:
    ids2index[<span class="hljs-built_in">id</span>] = <span class="hljs-built_in">len</span>(ids2index)

dist_metric = np.full((<span class="hljs-built_in">len</span>(ids), <span class="hljs-built_in">len</span>(ids)), np.inf, dtype=np.float64)

<span class="hljs-keyword">for</span> <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> dist:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> dist[<span class="hljs-built_in">id</span>]:
        dist_metric[ids2index[<span class="hljs-built_in">id</span>]][ids2index[result[<span class="hljs-number">0</span>]]] = result[<span class="hljs-number">1</span>]

h = hdbscan.HDBSCAN(min_samples=<span class="hljs-number">3</span>, min_cluster_size=<span class="hljs-number">3</span>, metric=<span class="hljs-string">&quot;precomputed&quot;</span>)
hdb = h.fit(dist_metric)
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، ينتهي تجميع HDBSCAN. يمكننا الحصول على بعض البيانات وإظهار مجموعتها. لاحظ أن بعض البيانات لن يتم تعيينها إلى أي مجموعة، مما يعني أنها ضوضاء، لأنها تقع في منطقة متناثرة.</p>
<h2 id="Clusters-Visualization-using-UMAP" class="common-anchor-header">تصوّر المجموعات باستخدام UMAP<button data-href="#Clusters-Visualization-using-UMAP" class="anchor-icon" translate="no">
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
    </button></h2><p>لقد قمنا بالفعل بتجميع البيانات باستخدام HDBSCAN ويمكننا الحصول على التسميات لكل نقطة بيانات. لكن باستخدام بعض تقنيات التصوّر، يمكننا الحصول على الصورة الكاملة للمجموعات لتحليل حدسي. سنستخدم الآن UMAP لتصور المجموعات. UMAP هي طريقة فعّالة تُستخدم لتقليل الأبعاد، حيث تحافظ على بنية البيانات عالية الأبعاد مع إسقاطها في فضاء منخفض الأبعاد لتصورها أو إجراء مزيد من التحليل. باستخدامه، يمكننا تصور البيانات الأصلية عالية الأبعاد في فضاء ثنائي الأبعاد أو ثلاثي الأبعاد، ورؤية المجموعات بوضوح. هنا مرة أخرى، نقوم بتكرار نقاط البيانات ونحصل على المعرف والنص للبيانات الأصلية، ثم نستخدم التخطيط لرسم نقاط البيانات مع هذه المعلومات الوصفية في شكل، ونستخدم ألوانًا مختلفة لتمثيل المجموعات المختلفة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> plotly.io <span class="hljs-keyword">as</span> pio

pio.renderers.default = <span class="hljs-string">&quot;notebook&quot;</span>

umap = UMAP(n_components=<span class="hljs-number">2</span>, random_state=<span class="hljs-number">42</span>, n_neighbors=<span class="hljs-number">80</span>, min_dist=<span class="hljs-number">0.1</span>)

df_umap = (
    pd.DataFrame(umap.fit_transform(np.array(embeddings)), columns=[<span class="hljs-string">&quot;x&quot;</span>, <span class="hljs-string">&quot;y&quot;</span>])
    .assign(cluster=<span class="hljs-keyword">lambda</span> df: hdb.labels_.astype(<span class="hljs-built_in">str</span>))
    .query(<span class="hljs-string">&#x27;cluster != &quot;-1&quot;&#x27;</span>)
    .sort_values(by=<span class="hljs-string">&quot;cluster&quot;</span>)
)
iterator = collection.query_iterator(
    batch_size=<span class="hljs-number">10</span>, expr=<span class="hljs-string">&quot;id &gt; 0&quot;</span>, output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)

ids = []
texts = []

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    batch = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>
    batch_ids = [data[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    batch_texts = [data[<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    ids.extend(batch_ids)
    texts.extend(batch_texts)

show_texts = [texts[i] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> df_umap.index]

df_umap[<span class="hljs-string">&quot;hover_text&quot;</span>] = show_texts
fig = px.scatter(
    df_umap, x=<span class="hljs-string">&quot;x&quot;</span>, y=<span class="hljs-string">&quot;y&quot;</span>, color=<span class="hljs-string">&quot;cluster&quot;</span>, hover_data={<span class="hljs-string">&quot;hover_text&quot;</span>: <span class="hljs-literal">True</span>}
)
fig.show()
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/images/hdbscan_clustering_with_milvus.png" alt="image" class="doc-image" id="image" />
   </span> <span class="img-wrapper"> <span>الصورة</span> </span></p>
<p>نوضح هنا أن البيانات متجمعة بشكل جيد، ويمكنك التمرير فوق النقاط للتحقق من النص الذي تمثله. من خلال هذا الدفتر، نأمل أن تتعلم كيفية استخدام HDBSCAN لتجميع التضمينات باستخدام Milvus بكفاءة، والتي يمكن تطبيقها أيضًا على أنواع أخرى من البيانات. يسمح هذا النهج، إلى جانب نماذج اللغة الكبيرة، بإجراء تحليل أعمق لبياناتك على نطاق واسع.</p>
