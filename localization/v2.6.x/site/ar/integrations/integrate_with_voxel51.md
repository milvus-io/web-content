---
id: integrate_with_voxel51.md
summary: تناقش هذه الصفحة التكامل مع voxel51
title: إجراء عمليات بحث في الرؤية باستخدام Milvus و FiftyOne
---
<h1 id="Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="common-anchor-header">إجراء عمليات بحث في الرؤية باستخدام Milvus و FiftyOne<button data-href="#Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.voxel51.com/">FiftyOne</a> هي أداة مفتوحة المصدر لبناء مجموعات بيانات ونماذج رؤية حاسوبية عالية الجودة. يساعدك هذا الدليل على دمج إمكانيات البحث عن التشابه الخاصة ب Milvus في FiftyOne، مما يتيح لك إجراء عمليات بحث عن الرؤية على مجموعات البيانات الخاصة بك.</p>
<p>يوفر FiftyOne واجهة برمجة تطبيقات لإنشاء مجموعات Milvus، وتحميل المتجهات، وتشغيل استعلامات التشابه، سواءً <a href="https://docs.voxel51.com/integrations/milvus.html#milvus-query">برمجيًا</a> في Python أو عبر التأشير والنقر في التطبيق. يركز العرض التوضيحي في هذه الصفحة على التكامل البرمجي.</p>
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
    </button></h2><p>قبل البدء، تأكد من أن لديك ما يلي:</p>
<ul>
<li><a href="/docs/ar/install_standalone-docker.md">خادم ميلفوس</a> قيد التشغيل.</li>
<li>بيئة بايثون مع تثبيت <code translate="no">pymilvus</code> و <code translate="no">fiftyone</code>.</li>
<li><a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">مجموعة بيانات</a> من الصور للبحث فيها.</li>
</ul>
<h2 id="Installing-Requirements" class="common-anchor-header">متطلبات التثبيت<button data-href="#Installing-Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا المثال، سنستخدم في هذا المثال <code translate="no">pymilvus</code> و <code translate="no">fiftyone</code>. يمكنك تثبيتها عن طريق تشغيل الأوامر التالية:</p>
<pre><code translate="no" class="language-shell">python3 -m pip install pymilvus fiftyone torch torchvision
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-recipe" class="common-anchor-header">الوصفة الأساسية<button data-href="#Basic-recipe" class="anchor-icon" translate="no">
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
    </button></h2><p>سير العمل الأساسي لاستخدام ميلفوس لإنشاء فهرس تشابه على مجموعات بيانات فيفتي ون واستخدامه للاستعلام عن بياناتك هو كالتالي</p>
<ol>
<li>تحميل <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">مجموعة بيانات</a> إلى FiftyOne</li>
<li>احسب التضمينات المتجهة للعينات أو البقع في مجموعة البيانات الخاصة بك، أو حدد نموذجًا لاستخدامه في إنشاء التضمينات.</li>
<li>استخدم <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> الطريقة لإنشاء فهرس تشابه ميلفوس للعينات أو رقع الكائنات في مجموعة البيانات عن طريق تعيين المعلمة <code translate="no">backend=&quot;milvus&quot;</code> وتحديد <code translate="no">brain_key</code> من اختيارك.</li>
<li>استخدم فهرس تشابه ميلفوس هذا للاستعلام عن بياناتك باستخدام <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.sort_by_similarity"><code translate="no">sort_by_similarity()</code></a>.</li>
<li>إذا رغبت في ذلك، احذف الفهرس.</li>
</ol>
<h2 id="Procedures" class="common-anchor-header">الإجراءات<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح المثال أدناه سير العمل أعلاه.</p>
<h3 id="1-Load-a-dataset-into-FiftyOne-and-compute-embeddings-for-the-samples" class="common-anchor-header">1. تحميل مجموعة بيانات إلى FiftyOne وحساب التضمينات للعينات</h3><p>تستخدم الشيفرة التالية مجموعة الصور النموذجية التي يوفرها FiftyOne لتوضيح التكامل. يمكنك إعداد مجموعة الصور الخاصة بك بالرجوع إلى <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">هذه المقالة</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone <span class="hljs-keyword">as</span> fo
<span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob
<span class="hljs-keyword">import</span> fiftyone.zoo <span class="hljs-keyword">as</span> foz

<span class="hljs-comment"># Step 1: Load your data into FiftyOne</span>
dataset = foz.load_zoo_dataset(<span class="hljs-string">&quot;quickstart&quot;</span>)

<span class="hljs-comment"># Steps 2 and 3: Compute embeddings and create a similarity index</span>
milvus_index = fob.compute_similarity(
    dataset,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Conduct-vision-similarity-searches" class="common-anchor-header">2. إجراء عمليات البحث عن تشابه الرؤية</h3><p>يمكنك الآن استخدام فهرس التشابه Milvus لإجراء عمليات بحث عن تشابه الرؤية على مجموعة البيانات الخاصة بك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 4: Query your data</span>
query = dataset.first().<span class="hljs-built_in">id</span>  <span class="hljs-comment"># query by sample ID</span>
view = dataset.sort_by_similarity(
    query,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    k=<span class="hljs-number">10</span>,  <span class="hljs-comment"># limit to 10 most similar samples</span>
)

<span class="hljs-comment"># Step 5 (optional): Cleanup</span>

<span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index.cleanup()

<span class="hljs-comment"># Delete run record from FiftyOne</span>
dataset.delete_brain_run(<span class="hljs-string">&quot;milvus_index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Delete-the-index" class="common-anchor-header">3. حذف الفهرس</h3><p>إذا لم تعد بحاجة إلى فهرس تشابه ميلفوس فيمكنك حذفه باستخدام الكود التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 5: Delete the index</span>
milvus_index.delete()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-Milvus-backend" class="common-anchor-header">استخدام الواجهة الخلفية لميلفوس<button data-href="#Use-the-Milvus-backend" class="anchor-icon" translate="no">
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
    </button></h2><p>بشكل افتراضي، استدعاء <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> أو <code translate="no">sort_by_similarity()</code> سيستخدم الواجهة الخلفية ل sklearn.</p>
<p>لاستخدام الواجهة الخلفية لـ Milvus، ما عليك سوى تعيين معلمة الواجهة الخلفية الاختيارية <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> إلى <code translate="no">&quot;milvus&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

fob.compute_similarity(..., backend=<span class="hljs-string">&quot;milvus&quot;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<p>بدلاً من ذلك، يمكنك تهيئة FiftyOne بشكل دائم لاستخدام الواجهة الخلفية لـ Milvus عن طريق تعيين متغير البيئة التالي</p>
<pre><code translate="no" class="language-shell">export FIFTYONE_BRAIN_DEFAULT_SIMILARITY_BACKEND=milvus
<button class="copy-code-btn"></button></code></pre>
<p>أو عن طريق تعيين المعلمة <code translate="no">default_similarity_backend</code> من <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">تكوين الدماغ</a> الموجود في <code translate="no">~/.fiftyone/brain_config.json</code>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;default_similarity_backend&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;milvus&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Authentication" class="common-anchor-header">المصادقة<button data-href="#Authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت تستخدم خادم Milvus مخصص، يمكنك توفير بيانات الاعتماد الخاصة بك بعدة طرق.</p>
<h3 id="Environment-variables-recommended" class="common-anchor-header">متغيرات البيئة (موصى بها)</h3><p>الطريقة الموصى بها لتهيئة بيانات اعتماد ميلفوس الخاصة بك هي تخزينها في متغيرات البيئة الموضحة أدناه، والتي يتم الوصول إليها تلقائيًا بواسطة فيفتي ون كلما تم إجراء اتصال بميلفوس.</p>
<pre><code translate="no" class="language-python">export FIFTYONE_BRAIN_SIMILARITY_MILVUS_URI=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_USER=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_PASSWORD=XXXXXX

<span class="hljs-comment"># also available if necessary</span>
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_SECURE=true
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_TOKEN=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_DB_NAME=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_KEY_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_PEM_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_CA_PEM_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_PEM_PATH=XXXXXX
export FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_NAME=XXXXXX
<button class="copy-code-btn"></button></code></pre>
<h3 id="FiftyOne-Brain-config" class="common-anchor-header">تهيئة دماغ فيفتي ون</h3><p>يمكنك أيضًا تخزين بيانات الاعتماد الخاصة بك في <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">تكوين الدماغ</a> الموجود في <code translate="no">~/.fiftyone/brain_config.json</code>:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;password&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,

            <span class="hljs-comment"># also available if necessary</span>
            <span class="hljs-string">&quot;secure&quot;</span>: true,
            <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_key_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;ca_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أن هذا الملف لن يكون موجوداً حتى تقوم بإنشائه.</p>
<h3 id="Keyword-arguments" class="common-anchor-header">وسيطات الكلمات الرئيسية</h3><p>يمكنك تقديم بيانات اعتماد ميلفوس يدويًا كوسيطات كلمات رئيسية في كل مرة تستدعي فيها طرقًا مثل <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> التي تتطلب الاتصال بـ Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

milvus_index = fob.compute_similarity(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أنه عند استخدام هذه الاستراتيجية، يجب عليك توفير بيانات الاعتماد يدويًا عند تحميل فهرس لاحقًا عبر <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>:</p>
<pre><code translate="no" class="language-python">milvus_index = dataset.load_brain_results(
    <span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-config-parameters" class="common-anchor-header">معلمات تكوين ميلفوس</h3><p>تدعم الواجهة الخلفية لـ Milvus مجموعة متنوعة من معلمات الاستعلام التي يمكن استخدامها لتخصيص استعلامات التشابه الخاصة بك. تتضمن هذه المعلمات ما يلي:</p>
<ul>
<li><p><strong>اسم_المجموعة</strong><em>(بلا</em>): اسم مجموعة Milvus المراد استخدامها أو إنشاؤها. إذا لم يتم توفير أي منها، سيتم إنشاء مجموعة جديدة</p></li>
<li><p><strong>المقياس</strong> (<em>"dotproduct")</em>: مقياس مسافة التضمين المراد استخدامه عند إنشاء فهرس جديد. القيم المدعومة هي (<code translate="no">&quot;dotproduct&quot;</code> ، <code translate="no">&quot;euclidean&quot;</code>)</p></li>
<li><p><strong>مستوى_الاتساق</strong> (<em>"الجلسة")</em>: مستوى الاتساق المطلوب استخدامه. القيم المدعومة هي (<code translate="no">&quot;Strong&quot;</code> ، <code translate="no">&quot;Session&quot;</code> ، ، <code translate="no">&quot;Bounded&quot;</code> ، <code translate="no">&quot;Eventually&quot;</code>)</p></li>
</ul>
<p>للحصول على معلومات مفصلة عن هذه المعلمات، راجع <a href="/docs/ar/authenticate.md">وثائق مصادقة Milvus</a> <a href="/docs/ar/consistency.md">ووثائق مستويات الاتساق في Milvus</a>.</p>
<p>يمكنك تحديد هذه المعلمات عبر أي من الاستراتيجيات الموضحة في القسم السابق. فيما يلي مثال على <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">تكوين الدماغ</a> الذي يتضمن جميع المعلمات المتاحة:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;similarity_backends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;collection_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;your_collection&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;metric&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dotproduct&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;consistency_level&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Strong&quot;</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>ومع ذلك، عادةً ما يتم تمرير هذه المعلمات مباشرةً إلى <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> لتكوين فهرس جديد محدد:</p>
<pre><code translate="no" class="language-python">milvus_index = fob.compute_similarity(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    metric=<span class="hljs-string">&quot;dotproduct&quot;</span>,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-brain-runs" class="common-anchor-header">إدارة عمليات تشغيل الدماغ<button data-href="#Manage-brain-runs" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر FiftyOne مجموعة متنوعة من الطرق التي يمكنك استخدامها لإدارة عمليات تشغيل الدماغ.</p>
<p>على سبيل المثال، يمكنك استدعاء <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.list_brain_runs"><code translate="no">list_brain_runs()</code></a> لرؤية مفاتيح الدماغ المتوفرة في مجموعة بيانات:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

<span class="hljs-comment"># List all brain runs</span>
dataset.list_brain_runs()

<span class="hljs-comment"># Only list similarity runs</span>
dataset.list_brain_runs(<span class="hljs-built_in">type</span>=fob.Similarity)

<span class="hljs-comment"># Only list specific similarity runs</span>
dataset.list_brain_runs(
    <span class="hljs-built_in">type</span>=fob.Similarity,
    patches_field=<span class="hljs-string">&quot;ground_truth&quot;</span>,
    supports_prompts=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>أو يمكنك استخدام <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.get_brain_info"><code translate="no">get_brain_info()</code></a> لاسترجاع معلومات حول تكوين تشغيل دماغ:</p>
<pre><code translate="no" class="language-python">info = dataset.get_brain_info(brain_key)
<span class="hljs-built_in">print</span>(info)
<button class="copy-code-btn"></button></code></pre>
<p>استخدم <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a> لتحميل <a href="https://docs.voxel51.com/api/fiftyone.brain.similarity.html#fiftyone.brain.similarity.SimilarityIndex"><code translate="no">SimilarityIndex</code></a> مثيل لتشغيل دماغ.</p>
<p>يمكنك استخدام <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.rename_brain_run"><code translate="no">rename_brain_run()</code></a> لإعادة تسمية مفتاح الدماغ المرتبط بتشغيل نتائج تشابه موجودة:</p>
<pre><code translate="no" class="language-python">dataset.rename_brain_run(brain_key, new_brain_key)
<button class="copy-code-btn"></button></code></pre>
<p>وأخيراً، يمكنك استخدام <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> لحذف تشغيل دماغ:</p>
<pre><code translate="no" class="language-python">dataset.delete_brain_run(brain_key)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>استدعاء <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> يحذف فقط سجل التشغيل الدماغي من مجموعة بيانات FiftyOne، ولن يحذف أي مجموعة Milvus مرتبطة بها، وهو ما يمكنك القيام به على النحو التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index = dataset.load_brain_results(brain_key)
milvus_index.cleanup()
<button class="copy-code-btn"></button></code></pre>
</div>
<p>للاطلاع على سير عمل البحث المتجه الشائع على مجموعة بيانات FiftyOne باستخدام الواجهة الخلفية لـ Milvus، انظر <a href="https://docs.voxel51.com/integrations/milvus.html#examples">الأمثلة هنا</a>.</p>
