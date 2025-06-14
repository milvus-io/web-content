---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  تعرّف على كيفية إنشاء تطبيق بحث دلالي للفيديو من خلال دمج واجهة برمجة تطبيقات
  Twelve Labs Embed API لتوليد تضمينات متعددة الوسائط مع Milvus. وهو يغطي
  العملية بأكملها بدءًا من إعداد بيئة التطوير إلى تنفيذ الميزات المتقدمة مثل
  البحث الهجين والتحليل الزمني للفيديو، مما يوفر أساسًا شاملاً لبناء أنظمة تحليل
  واسترجاع محتوى الفيديو المتطورة.
title: >-
  بحث الفيديو المتقدم: الاستفادة من مختبرات Twelve Labs و Milvus للاسترجاع
  الدلالي
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">بحث الفيديو المتقدم: الاستفادة من مختبرات Twelve Labs و Milvus للاسترجاع الدلالي<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">مقدمة<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>مرحبًا بكم في هذا البرنامج التعليمي الشامل حول تنفيذ البحث الدلالي عن الفيديو باستخدام <a href="https://docs.twelvelabs.io/docs/create-embeddings">واجهة برمجة تطبيقات Twelve Labs Embed API</a> و Milvus. في هذا الدليل، سنستكشف في هذا الدليل كيفية تسخير قوة <a href="https://www.twelvelabs.io/blog/multimodal-embeddings">التضمينات متعددة الوسائط المتقدمة من Twelve Labs</a> <a href="https://milvus.io/intro">وقاعدة بيانات Milvus الفعالة المتجهة</a> لإنشاء حل بحث فيديو قوي. من خلال دمج هذه التقنيات، يمكن للمطورين فتح إمكانيات جديدة في تحليل محتوى الفيديو، مما يتيح تطبيقات مثل استرجاع الفيديو القائم على المحتوى، وأنظمة التوصيات، ومحركات البحث المتطورة التي تفهم الفروق الدقيقة في بيانات الفيديو.</p>
<p>سيرشدك هذا البرنامج التعليمي خلال العملية بأكملها، بدءًا من إعداد بيئة التطوير الخاصة بك إلى تنفيذ تطبيق بحث دلالي وظيفي للفيديو. سنغطي المفاهيم الأساسية مثل توليد تضمينات متعددة الوسائط من مقاطع الفيديو، وتخزينها بكفاءة في ميلفوس، وإجراء عمليات البحث عن التشابه لاسترداد المحتوى ذي الصلة. سواء كنت تقوم ببناء منصة لتحليلات الفيديو، أو أداة لاكتشاف المحتوى، أو تحسين تطبيقاتك الحالية بقدرات البحث عن الفيديو، سيزودك هذا الدليل بالمعرفة والخطوات العملية للاستفادة من نقاط القوة المشتركة ل Twelve Labs و Milvus في مشاريعك.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل أن نبدأ، تأكد من حصولك على ما يلي:</p>
<p>مفتاح Twelve Labs API (قم بالتسجيل في https://api.twelvelabs.io إذا لم يكن لديك واحد) بايثون 3.7 أو أحدث مثبت على نظامك</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">إعداد بيئة التطوير<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء دليل جديد لمشروعك وانتقل إليه:</p>
<pre><code translate="no" class="language-shell">mkdir video-search-tutorial
cd video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>قم بإعداد بيئة افتراضية (اختياري ولكن يوصى به):</p>
<pre><code translate="no" class="language-shell">python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
<button class="copy-code-btn"></button></code></pre>
<p>تثبيت مكتبات بايثون المطلوبة:</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء ملف بايثون جديد لمشروعك:</p>
<pre><code translate="no" class="language-shell">touch video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>سيكون ملف video_search.py هذا هو البرنامج النصي الرئيسي الذي نستخدمه في البرنامج التعليمي. بعد ذلك، قم بإعداد مفتاح Twelve Labs API الخاص بك كمتغير بيئة للأمان:</p>
<pre><code translate="no" class="language-shell">export TWELVE_LABS_API_KEY=&#x27;your_api_key_here&#x27;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">الاتصال بـ Milvus<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء اتصال مع Milvus، سنستخدم فئة MilvusClient. هذا النهج يبسط عملية الاتصال ويسمح لنا بالعمل مع مثيل Milvus محلي قائم على ملف محلي، وهو مثالي لبرنامجنا التعليمي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>يقوم هذا الرمز بإنشاء مثيل عميل Milvus جديد يقوم بتخزين جميع البيانات في ملف باسم milvus_twelvelvelabs_demo.db. هذا النهج القائم على الملفات مثالي لأغراض التطوير والاختبار.</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">إنشاء مجموعة ميلفوس لتضمين الفيديو<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن بعد أن أصبحنا متصلين ب Milvus، دعونا ننشئ مجموعة لتخزين تضمينات الفيديو والبيانات الوصفية المرتبطة بها. سنقوم بتعريف مخطط المجموعة وإنشاء المجموعة إذا لم تكن موجودة بالفعل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>في هذه الشيفرة، نتحقق أولًا مما إذا كانت المجموعة موجودة بالفعل ونحذفها إذا كانت موجودة بالفعل. هذا يضمن أن نبدأ بسجل نظيف. ننشئ المجموعة ببُعد 1024، وهو ما يطابق بُعد الإخراج لتضمينات Twelve Labs.</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">توليد التضمينات باستخدام واجهة برمجة تطبيقات Twelve Labs Embed API<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>لتوليد تضمينات لمقاطع الفيديو الخاصة بنا باستخدام واجهة برمجة تطبيقات Twelve Labs Embed API، سنستخدم مجموعة أدوات تطوير البرمجيات الخاصة ب Twelve Labs Python SDK. تتضمن هذه العملية إنشاء مهمة تضمين، وانتظار اكتمالها، واسترداد النتائج. إليك كيفية تنفيذ ذلك:</p>
<p>أولاً، تأكد أولاً من تثبيت Twelve Labs SDK واستيراد الوحدات النمطية اللازمة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">قم بتهيئة عميل Twelve Labs:<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>إنشاء دالة لإنشاء تضمينات لعنوان URL فيديو معين:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>استخدم الدالة لإنشاء تضمينات لمقاطع الفيديو الخاصة بك:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>يسمح لك هذا التطبيق بإنشاء تضمينات لأي عنوان URL للفيديو باستخدام واجهة برمجة تطبيقات Twelve Labs Embeding API. تعالج الدالة gener_embedding العملية بأكملها، بدءًا من إنشاء المهمة إلى استرداد النتائج. تقوم بإرجاع قائمة من القواميس، يحتوي كل منها على متجه التضمين مع بياناته الوصفية (النطاق الزمني والنطاق).تذكر أن تتعامل مع الأخطاء المحتملة، مثل مشاكل الشبكة أو حدود واجهة برمجة التطبيقات، في بيئة الإنتاج. قد ترغب أيضًا في تنفيذ عمليات إعادة المحاولة أو معالجة أخطاء أكثر قوة بناءً على حالة الاستخدام الخاصة بك.</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">إدراج التضمينات في ميلفوس<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إنشاء التضمينات باستخدام واجهة برمجة تطبيقات Twelve Labs Embed API، فإن الخطوة التالية هي إدراج هذه التضمينات مع بياناتها الوصفية في مجموعة Milvus الخاصة بنا. تسمح لنا هذه العملية بتخزين وفهرسة تضمينات الفيديو الخاصة بنا للبحث الفعال عن التشابه لاحقًا.</p>
<p>إليك كيفية إدراج التضمينات في Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>تقوم هذه الدالة بإعداد البيانات للإدراج، بما في ذلك جميع البيانات الوصفية ذات الصلة مثل متجه التضمين والنطاق الزمني وعنوان URL لمصدر الفيديو. ثم يستخدم عميل Milvus لإدراج هذه البيانات في المجموعة المحددة.</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">إجراء بحث التشابه<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن نحصل على التضمينات المخزنة في Milvus، يمكننا إجراء عمليات بحث عن التشابه للعثور على مقاطع الفيديو الأكثر صلة بناءً على متجه الاستعلام. إليك كيفية تنفيذ هذه الوظيفة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>يقوم هذا التنفيذ بما يلي:</p>
<ol>
<li>يُعرّف الدالة perform_similarity_search التي تأخذ متجه استعلام وتبحث عن تضمينات مشابهة في مجموعة Milvus.</li>
<li>يستخدم طريقة بحث عميل Milvus للعثور على المتجهات الأكثر تشابهًا.</li>
<li>يحدد حقول الإخراج التي نريد استردادها، بما في ذلك البيانات الوصفية حول مقاطع الفيديو المطابقة.</li>
<li>يقدم مثالاً على كيفية استخدام هذه الدالة مع فيديو استعلام، حيث يتم أولاً إنشاء تضمينها ثم استخدامها للبحث.</li>
<li>يطبع نتائج البحث، بما في ذلك البيانات الوصفية ذات الصلة ودرجات التشابه.</li>
</ol>
<p>من خلال تنفيذ هذه الدوال، تكون قد أنشأت سير عمل كامل لتخزين تضمينات الفيديو في ملفوس وإجراء عمليات البحث عن التشابه. يسمح هذا الإعداد باسترجاع فعال لمحتوى الفيديو المتشابه بناءً على التضمينات متعددة الوسائط التي تم إنشاؤها بواسطة واجهة برمجة تطبيقات التضمين في Twelve Labs.</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">تحسين الأداء<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>حسنًا، لننتقل بهذا التطبيق إلى المستوى التالي! عند التعامل مع مجموعات الفيديو واسعة النطاق، فإن <strong>الأداء هو المفتاح</strong>. ولتحسين الأداء، يجب علينا تنفيذ <a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">المعالجة المجمعة لتوليد التضمين والإدراج في Milvus</a>. بهذه الطريقة، يمكننا التعامل مع العديد من مقاطع الفيديو في وقت واحد، مما يقلل بشكل كبير من وقت المعالجة الإجمالي. بالإضافة إلى ذلك، يمكننا الاستفادة من <a href="https://milvus.io/docs/v2.2.x/partition_key.md">ميزة التقسيم في ميلفوس</a> لتنظيم بياناتنا بشكل أكثر كفاءة، ربما حسب فئات الفيديو أو الفترات الزمنية. سيؤدي ذلك إلى تسريع الاستعلامات من خلال السماح لنا بالبحث في الأقسام ذات الصلة فقط.</p>
<p>هناك حيلة تحسين أخرى تتمثل في <strong>استخدام آليات التخزين المؤقت للتضمينات أو نتائج البحث التي يتم الوصول إليها بشكل متكرر</strong>. يمكن أن يؤدي ذلك إلى تحسين أوقات الاستجابة للاستعلامات الشائعة بشكل كبير. لا تنسَ أن <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">تضبط معلمات فهرس ميلفوس بدقة</a> بناءً على مجموعة بياناتك وأنماط الاستعلام الخاصة بك - يمكن أن يؤدي القليل من التعديل هنا إلى قطع شوط طويل في تعزيز أداء البحث.</p>
<h2 id="Advanced-Features" class="common-anchor-header">الميزات المتقدمة<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>والآن، دعونا نضيف بعض الميزات الرائعة لجعل تطبيقنا مميزاً! يمكننا تنفيذ <strong>بحث هجين يجمع بين الاستعلامات النصية والفيديو</strong>. في واقع الأمر، <a href="https://docs.twelvelabs.io/docs/create-text-embeddings">يمكن لـ Twelve Labs Embed API أيضًا إنشاء تضمينات نصية لاستعلاماتك النصية</a>. تخيّل السماح للمستخدمين بإدخال وصف نصي ونموذج لمقطع فيديو - سنقوم بإنشاء تضمينات لكليهما وإجراء بحث مرجح في ميلفوس. سيعطينا هذا نتائج فائقة الدقة.</p>
<p>إضافة رائعة أخرى ستكون <strong>البحث الزمني داخل مقاطع الفيديو</strong>. <a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">يمكننا تقسيم مقاطع الفيديو الطويلة إلى مقاطع أصغر، لكل منها تضمين خاص به</a>. بهذه الطريقة، يمكن للمستخدمين العثور على لحظات محددة داخل مقاطع الفيديو، وليس فقط مقاطع كاملة. ولمَ لا نضيف بعض تحليلات الفيديو الأساسية؟ يمكننا استخدام التضمينات لتجميع مقاطع الفيديو المتشابهة، أو اكتشاف الاتجاهات، أو حتى تحديد القيم المتطرفة في مجموعات الفيديو الكبيرة.</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">معالجة الأخطاء وتسجيلها<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>دعونا نواجه الأمر، يمكن أن تسوء الأمور، وعندما تسوء، يجب أن نكون مستعدين. <strong>تنفيذ معالجة قوية للأخطاء أمر بالغ الأهمية</strong>. يجب أن <a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">نغلف مكالمات واجهة برمجة التطبيقات وعمليات قاعدة البيانات في كتل "حاول إلا"</a>، مع توفير رسائل خطأ مفيدة للمستخدمين عند فشل شيء ما. بالنسبة للمشكلات المتعلقة بالشبكة، يمكن أن يساعد <a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">تنفيذ عمليات إعادة المحاولة مع إعادة التشغيل الأسية</a> في التعامل مع مواطن الخلل المؤقتة بأمان.</p>
<p><strong>أما بالنسبة للتسجيل، فهو أفضل صديق لنا لتصحيح الأخطاء والمراقبة</strong>. يجب أن نستخدم <a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">وحدة تسجيل Python</a> لتتبع الأحداث المهمة والأخطاء ومقاييس الأداء في تطبيقنا. لنقم بإعداد مستويات سجلات مختلفة - DEBUG للتطوير، و INFO للتشغيل العام، و ERROR للمشاكل الحرجة. ولا تنسَ تنفيذ تدوير السجل لإدارة أحجام الملفات. مع وجود السجل المناسب، سنتمكن من تحديد المشكلات وحلها بسرعة، مما يضمن تشغيل تطبيق البحث عن الفيديو بسلاسة حتى مع زيادة حجمه.</p>
<h2 id="Conclusion" class="common-anchor-header">خاتمة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>تهانينا! لقد أنشأت الآن تطبيقًا قويًا للبحث عن الفيديو الدلالي باستخدام واجهة برمجة تطبيقات Twelve Labs Embed API و Milvus. يتيح لك هذا التكامل معالجة محتوى الفيديو وتخزينه واسترجاعه بدقة وكفاءة غير مسبوقة. وبالاستفادة من التضمينات متعددة الوسائط، تكون قد أنشأت نظامًا يفهم الفروق الدقيقة في بيانات الفيديو، مما يفتح لك إمكانيات مثيرة لاكتشاف المحتوى وأنظمة التوصيات وتحليلات الفيديو المتقدمة.</p>
<p>بينما تستمر في تطوير تطبيقك وتحسينه، تذكّر أن الجمع بين توليد التضمين المتقدم من Twelve Labs والتخزين المتجه القابل للتطوير من Milvus يوفر أساسًا قويًا لمعالجة تحديات فهم الفيديو الأكثر تعقيدًا. نحن نشجعك على تجربة الميزات المتقدمة التي تمت مناقشتها وتخطي حدود الممكن في البحث عن الفيديو وتحليله.</p>
