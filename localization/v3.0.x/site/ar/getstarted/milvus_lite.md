---
id: milvus_lite.md
summary: >-
  قم بتثبيت Milvus Lite وقم بإجراء بحث متجه محلي باستخدام مسار قاعدة بيانات
  ثابت.
title: تشغيل Milvus Lite محليًّا
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">تشغيل Milvus Lite محليًّا<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية تشغيل البحث المتجه محليًا باستخدام Milvus Lite. وهي تتناول التثبيت، وحفظ البيانات، والتصفية، وتصدير البيانات إلى نسخة أخرى من Milvus.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite هو نظام خلفي محلي خفيف الوزن لـ <a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK</a>. قم بتثبيته باستخدام المكون الإضافي الاختياري <code translate="no">milvus-lite</code> ؛ حيث إن تثبيت <code translate="no">pymilvus</code> وحده لا يؤدي إلى تثبيت هذا النظام الخلفي في إصدار SDK المستخدم أدناه.</p>
<p>يُعد Milvus Lite مناسبًا للتطوير المحلي وأحمال العمل الصغيرة في بيئات مثل:</p>
<ul>
<li>Jupyter Notebook أو Google Colab</li>
<li>أجهزة الكمبيوتر المحمولة</li>
<li>أجهزة الحافة المزودة بتبعيات Python المتوافقة</li>
</ul>
<p>يستخدم Milvus Lite واجهة برمجة تطبيقات (API) <code translate="no">MilvusClient</code> للعمليات المدعومة، بما في ذلك استمرارية بيانات المتجهات، والإدراج والحذف، والبحث عن المتجهات، وتصفية البيانات الوصفية. لنقل سير عمل تطبيق مدعوم إلى نشر عن بُعد، قم بتغيير عنوان URI للاتصال وبيانات الاعتماد، وراجع الاختلافات في الميزات المدعومة. بالنسبة لأحمال العمل الإنتاجية واسعة النطاق، استخدم <a href="/docs/ar/install-overview.md">Milvus Standalone أو Distributed،</a> أو Milvus المُدار بالكامل على <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
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
    </button></h2><p>يستخدم هذا الدليل PyMilvus <strong>3.0.2</strong> و Milvus Lite <strong>3.2.2</strong>. قم بإعداد البيئة التالية:</p>
<ul>
<li>Python 3.10 أو أحدث. يتطلب الخادم الخلفي المحلي لـ Lite إصدارًا أدنى من Python أعلى من إصدار عميل PyMilvus البعيد.</li>
<li>macOS أو Linux أو Windows، مع عجلات متوافقة للتبعيات مثل <code translate="no">faiss-cpu</code> و <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 عبارة عن حزمة Python خالصة، لذا يجب أن يفي نظام التشغيل والبنية بهذه التبعيات بدلاً من حزمة Lite نفسها.</li>
<li>دليل محلي قابل للكتابة لتخزين قاعدة البيانات.</li>
</ul>
<p>في نظام Windows، يتخطى pip المكون الإضافي <code translate="no">milvus-lite</code> الخاص بـ PyMilvus 3.0.2 بسبب علامة النظام الأساسي الخاصة به، لذا يجب تسمية <code translate="no">milvus-lite</code> صراحةً. يقوم الأمر install أدناه بذلك بالفعل. بالنسبة لتركيبات الحزم والأنظمة الأساسية الأخرى، راجع <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">متطلبات إصدار Milvus Lite</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">إعداد Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء بيئة Python معزولة وقم بتثبيت كلتا الحزمتين:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ضع تعبير الإضافات بين علامتي اقتباس حتى لا تفسر الأوامر النصية مثل zsh الأقواس. في Windows PowerShell، قم بتنشيط البيئة باستخدام <code translate="no">.venv\Scripts\Activate.ps1</code> بدلاً من <code translate="no">source .venv/bin/activate</code>. تضمن الإصدارات المحددة صراحةً توافق SDK والواجهة الخلفية المحلية مع هذا الدليل.</p>
<div class="alert note">
<blockquote>
<p>يستخدم Milvus Lite 3.x محرك تخزين مختلفًا عن الحزمة الأصلية 2.x. ولا يمكنه فتح ملف <code translate="no">.db</code> موجود من الإصدار 2.x في مكانه. احتفظ بقاعدة البيانات الأصلية وبيئة يمكنها فتحها، وقم بتصدير بياناتها إلى هناك، ثم استيراد البيانات إلى قاعدة بيانات جديدة. لا يؤدي تثبيت حزمة جديدة إلى ترحيل تنسيق التخزين القديم. راجع <a href="#Migrating-data-from-Milvus-Lite">ترحيل البيانات من Milvus Lite</a>.</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">الاتصال بـ Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتمرير مسار محلي ينتهي بـ <code translate="no">.db</code> إلى <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة إلى Milvus Lite 3.2.2، يؤدي هذا إلى إنشاء <strong>دليل milvus_demo.db</strong> في دليل العمل. يحتوي الدليل على ملفات تخزين قاعدة البيانات؛ ولا تعني اللاحقة <code translate="no">.db</code> أنه ملف واحد قابل للنقل. أعد استخدام نفس المسار لإعادة فتح قاعدة البيانات بعد إغلاق العميل أو إعادة تشغيل التطبيق.</p>
<p>استخدم مسارًا مختلفًا لقاعدة بيانات جديدة. للاتصال بخادم Milvus بعيد بدلاً من ذلك، قم بتمرير نقطة النهاية وبيانات الاعتماد الخاصة به:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">تشغيل مثال للبحث المحلي<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح المثال التالي سير عمل واجهة برمجة التطبيقات (API) باستخدام المتجهات التي تم إنشاؤها. لا تشفر هذه المتجهات معنى النص؛ استخدم نموذج التضمين عند إنشاء بحث دلالي. قم بتشغيل المثال باستخدام مسار قاعدة بيانات جديد، أو قم بإزالة ملف <code translate="no">demo_collection</code> الموجود قبل تشغيله مرة أخرى.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة للتطبيق الذي يُنشئ عمليات التضمين من النص، تابع مع <a href="/docs/ar/quickstart.md">«البدء السريع</a>». يمكنك أيضًا استكشاف <a href="https://github.com/milvus-io/bootcamp">أمثلة Milvus Bootcamp</a> الخاصة بـ RAG، والبحث عن الصور، وعمليات تكامل الأطر.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">الميزات المدعومة والحدود<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنفذ Milvus Lite 3.2.2 مجموعة فرعية من عمليات Milvus من خلال محول PyMilvus المحلي الخاص به. ويصف <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">دليل الميزات المُصنف حسب الإصدار</a> الخاص به القدرات التالية:</p>
<table>
<thead>
<tr><th>المجال</th><th>الدعم في إصدار Lite هذا</th></tr>
</thead>
<tbody>
<tr><td>المتجهات الكثيفة والمتفرقة</td><td><code translate="no">FLOAT_VECTOR</code> و <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>فهارس المتجهات</td><td><code translate="no">FLAT</code>، <code translate="no">BRUTE_FORCE</code> ، <code translate="no">IVF_FLAT</code> ، <code translate="no">IVF_SQ8</code> ، <code translate="no">HNSW</code> ، <code translate="no">HNSW_SQ</code> ، و <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>الفهارس القياسية والمتفرقة</td><td><code translate="no">INVERTED</code> الفهارس القياسية و <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>عمليات البيانات</td><td>الإدراج، والتحديث والإدراج، والاسترجاع، والاستعلام، والبحث المتجه، والحذف</td></tr>
<tr><td>البحث</td><td>البحث الكثيف والمتفرق، وفلاتر البيانات الوصفية، وحقول المتجهات المتعددة، والبحث الهجين</td></tr>
<tr><td>تنظيم المجموعات</td><td>المجموعات، وقواعد البيانات المسماة، والأسماء المستعارة، والأقسام، ضمن العمليات المدعومة من قبل المحول المحلي</td></tr>
</tbody>
</table>
<p>لا يقتصر هذا الإصدار على فهارس <code translate="no">FLAT</code>. يعتمد توفر الفهرس وسلوكه على إصدار Lite؛ لا تقم بتطبيق القيود من الخلفية الأصلية 2.x على المحرك 3.x.</p>
<p>راجع هذه الحدود قبل اختيار Lite لتطبيق ما:</p>
<ul>
<li>يمكن لعملية واحدة فقط امتلاك دليل تخزين قاعدة البيانات في كل مرة. يحمي المحرك الدليل بقفل ملف.</li>
<li>قم بتسلسل عمليات الكتابة إلى نفس المجموعة. لا يتم دعم عمليات الكتابة المتزامنة بأمان.</li>
<li>لا يقوم المحول المحلي بتنفيذ كل RPC الخاص بـ Milvus. تعرض العمليات غير المدعومة خطأً من نوع « <code translate="no">UNIMPLEMENTED</code> »؛ ولا تتوفر عمليات تعديل المخطط أو التحميل أو التحرير على مستوى القسم.</li>
<li>لا يتم دعم المصادقة والمستخدمين والأدوار وRBAC وTLS. لا تعرض الخادم المحلي لشبكة غير موثوق بها.</li>
<li>لا يتم دعم الحقول المتجهة الثنائية و float16 و bfloat16 و int8، وفهارس تكمية المنتج.</li>
<li>تم تصميم Lite لأحمال العمل المحلية. لا يوفر توافق واجهة برمجة التطبيقات (API) المحلية التوسع الموزع أو عزل الإنتاج وتوافر النشر عن بُعد.</li>
</ul>
<p>راجع <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">القيود المعروفة الخاصة بالإصدار</a> قبل الاعتماد على ميزة خادم لا يستخدمها المثال المحلي.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">ترحيل البيانات من Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم <code translate="no">milvus-lite dump</code> لتصدير مجموعة كملفات JSON لـ Milvus BulkWriter. يمكن استيراد هذه الملفات إلى نشر Milvus مستضاف ذاتيًا أو إلى Zilliz Cloud.</p>
<p>قم بتثبيت تبعيات أداة الكتابة المجمعة (bulk writer) الخاصة بـ SDK في البيئة التي تفتح قاعدة البيانات المصدر:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>أغلق تطبيق Python الذي يمتلك قاعدة البيانات المحلية قبل تشغيل الأمر في عملية أخرى. قم بتصدير المجموعة من المثال السابق:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>يقرأ الأمر <code translate="no">demo_collection</code> من <strong>دليل التخزين milvus_demo.db</strong> ويكتب ملفات التصدير ضمن <strong>data_dir</strong>. قم باستيراد تلك الملفات باستخدام <a href="/docs/ar/import-data.md">Bulk Insert</a> أو <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>لتصدير ملف قاعدة بيانات 2.x الأصلي، قم بتشغيل أداة dump في بيئة تحتوي على الإصدار الأصلي من Lite الذي يمكنه فتح هذا الملف. لا تقوم أداة dump الخاصة بالإصدار 3.x بتحويل تنسيق التخزين القديم عن طريق فتحه مباشرةً. احتفظ بقاعدة البيانات المصدر حتى تتحقق من عدد الصفوف المستوردة ونتائج البحث.</p>
</blockquote>
</div>
<p>للاطلاع على خيارات النسخ المدعومة وقيود تنسيق التخزين، راجع <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">مرجع التصدير</a> في <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">Milvus Lite</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>تابع هذه المهام:</p>
<ul>
<li><a href="/docs/ar/quickstart.md">البدء السريع</a>: إنشاء التضمينات وتشغيل سير عمل البحث.</li>
<li><a href="/docs/ar/single-vector-search.md">البحث أحادي المتجه</a> <a href="/docs/ar/multi-vector-search.md">والبحث الهجين</a>: تصميم استعلامات لتطبيقك.</li>
<li><a href="/docs/ar/install-overview.md">اختر طريقة النشر</a>: تجاوز مرحلة التطوير المحلي.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: استكشف واجهة المستخدم الرسومية لـ Milvus من أجل النشر عن بُعد.</li>
</ul>
