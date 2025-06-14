---
id: integrate_with_bentoml.md
summary: >-
  يوضّح هذا الدليل كيفية استخدام نموذج التضمين مفتوح المصدر ونموذج اللغة الكبيرة
  على BentoCloud مع قاعدة بيانات Milvus المتجهة لبناء تطبيق الجيل المعزز
  للاسترجاع (RAG).
title: التوليد المعزز للاسترجاع (RAG) مع Milvus و BentoML
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="common-anchor-header">التوليد المعزز للاسترجاع (RAG) مع Milvus و BentoML<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="Introduction" class="common-anchor-header">مقدمة<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح هذا الدليل كيفية استخدام نموذج التضمين مفتوح المصدر ونموذج اللغة الكبيرة على BentoCloud مع قاعدة بيانات Milvus المتجهة لبناء تطبيق RAG (التوليد المعزز للاسترجاع). BentoCloud هي منصة استدلالية للذكاء الاصطناعي لفرق الذكاء الاصطناعي سريعة الحركة، حيث تقدم بنية تحتية مُدارة بالكامل مصممة خصيصًا للاستدلال على النماذج. وهي تعمل جنباً إلى جنب مع BentoML، وهو إطار عمل مفتوح المصدر لخدمة النماذج، لتسهيل إنشاء ونشر خدمات النماذج عالية الأداء بسهولة. في هذا العرض التوضيحي، نستخدم Milvus Lite كقاعدة بيانات متجهة، وهي نسخة خفيفة الوزن من Milvus التي يمكن تضمينها في تطبيق Python الخاص بك.</p>
<h2 id="Before-you-begin" class="common-anchor-header">قبل أن تبدأ<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>يتوفر Milvus Lite على PyPI. يمكنك تثبيته عبر pip لبايثون 3.8+:</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus bentoml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<p>بعد تسجيل الدخول إلى بينتوكلاود، يمكننا التفاعل مع خدمات بينتوكلاود التي تم نشرها في عمليات النشر، وتوجد النهاية_POINT وواجهة برمجة التطبيقات المقابلة في ساحة اللعب -&gt; بايثون. يمكنك تنزيل بيانات المدينة <a href="https://github.com/ytang07/bento_octo_milvus_RAG/tree/main/data">هنا</a>.</p>
<h2 id="Serving-Embeddings-with-BentoMLBentoCloud" class="common-anchor-header">خدمة التضمينات باستخدام BentoML/BentoCloud<button data-href="#Serving-Embeddings-with-BentoMLBentoCloud" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام نقطة النهاية هذه، قم باستيراد <code translate="no">bentoml</code> وقم بإعداد عميل HTTP باستخدام <code translate="no">SyncHTTPClient</code> من خلال تحديد نقطة النهاية واختيارياً الرمز المميز (إذا قمت بتشغيل <code translate="no">Endpoint Authorization</code> على BentoCloud). بدلاً من ذلك، يمكنك استخدام نفس النموذج الذي يتم تقديمه من خلال BentoML باستخدام مستودع <a href="https://github.com/bentoml/BentoSentenceTransformers">تضمينات محولات الجمل</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bentoml

BENTO_EMBEDDING_MODEL_END_POINT = <span class="hljs-string">&quot;BENTO_EMBEDDING_MODEL_END_POINT&quot;</span>
BENTO_API_TOKEN = <span class="hljs-string">&quot;BENTO_API_TOKEN&quot;</span>

embedding_client = bentoml.SyncHTTPClient(
    BENTO_EMBEDDING_MODEL_END_POINT, token=BENTO_API_TOKEN
)
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد أن نتصل بعميل_التضمين_التضمين، نحتاج إلى معالجة بياناتنا. لقد وفرنا عدة وظائف لإجراء تقسيم البيانات والتضمين.</p>
<p>قراءة الملفات ومعالجة النص مسبقًا إلى قائمة من السلاسل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># naively chunk on newlines</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">chunk_text</span>(<span class="hljs-params">filename: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(filename, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
        text = f.read()
    sentences = text.split(<span class="hljs-string">&quot;\n&quot;</span>)
    <span class="hljs-keyword">return</span> sentences
<button class="copy-code-btn"></button></code></pre>
<p>نحتاج أولاً إلى تنزيل بيانات المدينة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> urllib.request

<span class="hljs-comment"># set up the data source</span>
repo = <span class="hljs-string">&quot;ytang07/bento_octo_milvus_RAG&quot;</span>
directory = <span class="hljs-string">&quot;data&quot;</span>
save_dir = <span class="hljs-string">&quot;./city_data&quot;</span>
api_url = <span class="hljs-string">f&quot;https://api.github.com/repos/<span class="hljs-subst">{repo}</span>/contents/<span class="hljs-subst">{directory}</span>&quot;</span>


response = requests.get(api_url)
data = response.json()

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(save_dir):
    os.makedirs(save_dir)

<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data:
    <span class="hljs-keyword">if</span> item[<span class="hljs-string">&quot;type&quot;</span>] == <span class="hljs-string">&quot;file&quot;</span>:
        file_url = item[<span class="hljs-string">&quot;download_url&quot;</span>]
        file_path = os.path.join(save_dir, item[<span class="hljs-string">&quot;name&quot;</span>])
        urllib.request.urlretrieve(file_url, file_path)
<button class="copy-code-btn"></button></code></pre>
<p>بعد ذلك، نقوم بمعالجة كل ملف من الملفات التي لدينا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># please upload your data directory under this file&#x27;s folder</span>
cities = os.listdir(<span class="hljs-string">&quot;city_data&quot;</span>)
<span class="hljs-comment"># store chunked text for each of the cities in a list of dicts</span>
city_chunks = []
<span class="hljs-keyword">for</span> city <span class="hljs-keyword">in</span> cities:
    chunked = chunk_text(<span class="hljs-string">f&quot;city_data/<span class="hljs-subst">{city}</span>&quot;</span>)
    cleaned = []
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> chunked:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(chunk) &gt; <span class="hljs-number">7</span>:
            cleaned.append(chunk)
    mapped = {<span class="hljs-string">&quot;city_name&quot;</span>: city.split(<span class="hljs-string">&quot;.&quot;</span>)[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;chunks&quot;</span>: cleaned}
    city_chunks.append(mapped)
<button class="copy-code-btn"></button></code></pre>
<p>نقسّم قائمة من السلاسل إلى قائمة من التضمينات، كل منها مجمّع 25 سلسلة نصية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(texts) &gt; <span class="hljs-number">25</span>:
        splits = [texts[x : x + <span class="hljs-number">25</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(texts), <span class="hljs-number">25</span>)]
        embeddings = []
        <span class="hljs-keyword">for</span> split <span class="hljs-keyword">in</span> splits:
            embedding_split = embedding_client.encode(sentences=split)
            embeddings += embedding_split
        <span class="hljs-keyword">return</span> embeddings
    <span class="hljs-keyword">return</span> embedding_client.encode(
        sentences=texts,
    )
<button class="copy-code-btn"></button></code></pre>
<p>والآن، نحتاج إلى مطابقة التضمينات والسلاسل النصية. نظرًا لأنه يجب أن تتطابق قائمة التضمينات وقائمة الجمل حسب الفهرس، يمكننا <code translate="no">enumerate</code> من خلال أي من القائمتين لمطابقتها.</p>
<pre><code translate="no" class="language-python">entries = []
<span class="hljs-keyword">for</span> city_dict <span class="hljs-keyword">in</span> city_chunks:
    <span class="hljs-comment"># No need for the embeddings list if get_embeddings already returns a list of lists</span>
    embedding_list = get_embeddings(city_dict[<span class="hljs-string">&quot;chunks&quot;</span>])  <span class="hljs-comment"># returns a list of lists</span>
    <span class="hljs-comment"># Now match texts with embeddings and city name</span>
    <span class="hljs-keyword">for</span> i, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embedding_list):
        entry = {
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
            <span class="hljs-string">&quot;sentence&quot;</span>: city_dict[<span class="hljs-string">&quot;chunks&quot;</span>][
                i
            ],  <span class="hljs-comment"># Assume &quot;chunks&quot; has the corresponding texts for the embeddings</span>
            <span class="hljs-string">&quot;city&quot;</span>: city_dict[<span class="hljs-string">&quot;city_name&quot;</span>],
        }
        entries.append(entry)
    <span class="hljs-built_in">print</span>(entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Inserting-Data-into-a-Vector-Database-for-Retrieval" class="common-anchor-header">إدراج البيانات في قاعدة بيانات المتجهات لاسترجاعها<button data-href="#Inserting-Data-into-a-Vector-Database-for-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إعداد التضمينات والبيانات الخاصة بنا، يمكننا إدراج المتجهات مع البيانات الوصفية في Milvus Lite للبحث عن المتجهات لاحقًا. الخطوة الأولى في هذا القسم هي بدء تشغيل عميل عن طريق الاتصال بـ Milvus Lite. نقوم ببساطة باستيراد الوحدة النمطية <code translate="no">MilvusClient</code> وتهيئة عميل Milvus Lite الذي يتصل بقاعدة بيانات متجهات Milvus Lite. يأتي حجم البعد من حجم نموذج التضمين، على سبيل المثال نموذج محول الجملة <code translate="no">all-MiniLM-L6-v2</code> ينتج متجهات ذات أبعاد 384.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

COLLECTION_NAME = <span class="hljs-string">&quot;Bento_Milvus_RAG&quot;</span>  <span class="hljs-comment"># random name for your collection</span>
DIMENSION = <span class="hljs-number">384</span>

<span class="hljs-comment"># Initialize a Milvus Lite client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>أما بالنسبة للوسيطة <code translate="no">MilvusClient</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">uri</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">ملف Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">uri</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
</ul>
</div>
<p>أو مع واجهة برمجة التطبيقات القديمة للاتصالات.connect.API (غير مستحسن):</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

connections.connect(uri=<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Creating-Your-Milvus-Lite-Collection" class="common-anchor-header">إنشاء مجموعة ميلفوس لايت الخاصة بك<button data-href="#Creating-Your-Milvus-Lite-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>يتضمن إنشاء مجموعة باستخدام Milvus Lite خطوتين: أولاً، تحديد المخطط، وثانياً، تحديد الفهرس. في هذا القسم، نحتاج إلى وحدة واحدة: DataType تخبرنا بنوع البيانات التي ستكون في الحقل. نحتاج أيضًا إلى استخدام دالتين لإنشاء مخطط وإضافة حقول. create_schema(): إنشاء مخطط مجموعة، و add_field(): إضافة حقل إلى مخطط المجموعة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection

<span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<p>الآن بعد أن أنشأنا المخطط وحددنا حقل البيانات بنجاح، نحتاج إلى تحديد الفهرس. فيما يتعلق بالبحث، يحدد "الفهرس" كيف سنقوم بتعيين بياناتنا لاسترجاعها. نستخدم الخيار الافتراضي <a href="https://docs.zilliz.com/docs/autoindex-explained">AUTOINDEX</a> لفهرسة بياناتنا لهذا المشروع.</p>
<p>بعد ذلك، ننشئ المجموعة بالاسم والمخطط والفهرس المعطى مسبقًا. أخيرًا، نقوم بإدراج البيانات التي تمت معالجتها مسبقًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># prepare index parameters</span>
index_params = milvus_client.prepare_index_params()

<span class="hljs-comment"># add index</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)

<span class="hljs-comment"># create collection</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME, schema=schema, index_params=index_params
)

<span class="hljs-comment"># Outside the loop, now you upsert all the entries at once</span>
milvus_client.insert(collection_name=COLLECTION_NAME, data=entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Your-LLM-for-RAG" class="common-anchor-header">إعداد LLM الخاص بك لـ RAG<button data-href="#Set-up-Your-LLM-for-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء تطبيق RAG، نحتاج إلى نشر LLM على BentoCloud. دعنا نستخدم أحدث Llama3 LLM. بمجرد تشغيله وتشغيله، ما عليك سوى نسخ نقطة النهاية والرمز المميز لهذه الخدمة النموذجية وإعداد عميل لها.</p>
<pre><code translate="no" class="language-python">BENTO_LLM_END_POINT = <span class="hljs-string">&quot;BENTO_LLM_END_POINT&quot;</span>

llm_client = bentoml.SyncHTTPClient(BENTO_LLM_END_POINT, token=BENTO_API_TOKEN)
<button class="copy-code-btn"></button></code></pre>
<h2 id="LLM-Instructions" class="common-anchor-header">تعليمات LLM<button data-href="#LLM-Instructions" class="anchor-icon" translate="no">
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
    </button></h2><p>والآن، سنقوم بإعداد تعليمات LLM مع المطالبة والسياق والسؤال. هذه هي الدالة التي تتصرف كـ LLM ثم تقوم بإرجاع المخرجات من العميل بتنسيق سلسلة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">dorag</span>(<span class="hljs-params">question: <span class="hljs-built_in">str</span>, context: <span class="hljs-built_in">str</span></span>):

    prompt = (
        <span class="hljs-string">f&quot;You are a helpful assistant. The user has a question. Answer the user question based only on the context: <span class="hljs-subst">{context}</span>. \n&quot;</span>
        <span class="hljs-string">f&quot;The user question is <span class="hljs-subst">{question}</span>&quot;</span>
    )

    results = llm_client.generate(
        max_tokens=<span class="hljs-number">1024</span>,
        prompt=prompt,
    )

    res = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        res += result

    <span class="hljs-keyword">return</span> res
<button class="copy-code-btn"></button></code></pre>
<h2 id="A-RAG-Example" class="common-anchor-header">مثال RAG<button data-href="#A-RAG-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>نحن الآن جاهزون لطرح سؤال. تأخذ هذه الدالة ببساطة سؤالًا ثم تقوم بعمل RAG لتوليد السياق ذي الصلة من المعلومات الأساسية. ثم نمرر السياق والسؤال إلى dorag() ونحصل على النتيجة.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What state is Cambridge in?&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">ask_a_question</span>(<span class="hljs-params">question</span>):
    embeddings = get_embeddings([question])
    res = milvus_client.search(
        collection_name=COLLECTION_NAME,
        data=embeddings,  <span class="hljs-comment"># search for the one (1) embedding returned as a list of lists</span>
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,  <span class="hljs-comment"># Search across embeddings</span>
        limit=<span class="hljs-number">5</span>,  <span class="hljs-comment"># get me the top 5 results</span>
        output_fields=[<span class="hljs-string">&quot;sentence&quot;</span>],  <span class="hljs-comment"># get the sentence/chunk and city</span>
    )

    sentences = []
    <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
        <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
            <span class="hljs-built_in">print</span>(hit)
            sentences.append(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;sentence&quot;</span>])
    context = <span class="hljs-string">&quot;. &quot;</span>.join(sentences)
    <span class="hljs-keyword">return</span> context


context = ask_a_question(question=question)
<span class="hljs-built_in">print</span>(context)
<button class="copy-code-btn"></button></code></pre>
<p>تنفيذ RAG</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(dorag(question=question, context=context))
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لمثال السؤال الذي يسأل عن الحالة التي تتواجد فيها كامبريدج، يمكننا طباعة الإجابة كاملةً من BentoML. ومع ذلك، إذا أخذنا الوقت الكافي لتحليله، سيبدو الأمر أجمل، وسيخبرنا أن كامبريدج تقع في ماساتشوستس.</p>
