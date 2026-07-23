---
id: hugging-face-ranker.md
title: Hugging Face RankerCompatible with Milvus v2.6.20+
summary: >-
  يشرح هذا الموضوع كيفية إعادة ترتيب نتائج بحث Milvus باستخدام نماذج تشابه الجمل
  من Hugging Face المستضافة.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face-Ranker" class="common-anchor-header">Hugging Face Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم البحث المتجهي بترتيب النتائج حسب المسافة المتجهة، ولكن الترتيب الأولي قد لا يعكس مدى ملاءمة نص كل مرشح للاستعلام. يقوم Hugging Face Ranker بإرسال الاستعلام والنص المرشح إلى <a href="https://huggingface.co/docs/inference-providers/index">مزودي الاستدلال Hugging Face</a> المستضافين ويستخدم درجات " <code translate="no">sentence-similarity</code> " لإعادة ترتيب المرشحين الذين أعادهم Milvus.</p>
<p>يستخدم هذا التكامل جهاز التوجيه (router) المستضاف من Hugging Face. لإعادة الترتيب باستخدام خدمة استدلال تضمين النص (TEI) التي تم نشرها بشكل منفصل، راجع <a href="/docs/ar/v2.6.x/tei-ranker.md">TEI Ranker</a>.</p>
<h2 id="Limits" class="common-anchor-header">القيود<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>يجب أن تشير الدالة إلى حقل واحد فقط غير قابل للفراغ من حقول « <code translate="no">VARCHAR</code> » في « <code translate="no">input_field_names</code> ».</li>
<li>يجب أن يكون عدد السلاسل في <code translate="no">queries</code> مساوياً لعدد استعلامات البحث (<code translate="no">nq</code>).</li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيفية العمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/hugging-face-ranker-flow.png" alt="Hugging Face Ranker workflow" class="doc-image" id="hugging-face-ranker-workflow" /> 
   <span>سير عمل Hugging Face Ranker</span>
  
 </span></p>
<p>يتم تشغيل Hugging Face Ranker بعد البحث المتجهي الأولي:</p>
<ol>
<li><strong>استرجاع الكيانات المرشحة.</strong> يقوم Milvus بالبحث في حقل المتجهات المُهيأ ويجمع الكيانات المرشحة.</li>
<li><strong>تحضير النص لإعادة الترتيب.</strong> تقرأ الدالة نص الاستعلام من <code translate="no">params.queries</code> والنص المرشح من الحقل <code translate="no">VARCHAR</code> المحدد في <code translate="no">input_field_names</code>.</li>
<li><strong>طلب درجات التشابه.</strong> يرسل Milvus الاستعلام كـ <code translate="no">source_sentence</code> والنصوص المرشحة كـ <code translate="no">sentences</code> عبر <code translate="no">hf-inference</code> إلى مسار Hugging Face <code translate="no">sentence-similarity</code>.</li>
<li><strong>إعادة ترتيب النصوص المرشحة.</strong> يعرض Hugging Face درجة واحدة لكل نص مرشح. يقوم Milvus بترتيب النصوص المرشحة من أعلى درجة إلى أدنى درجة ويعرض النتائج بعد إعادة الترتيب.</li>
</ol>
<p><strong>كيفية حساب درجات التشابه</strong></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/hugging-face-ranker-scoring.png" alt="How Hugging Face Ranker calculates similarity scores" class="doc-image" id="how-hugging-face-ranker-calculates-similarity-scores" /> 
   <span>كيف يحسب Hugging Face Ranker درجات التشابه</span>
  
 </span></p>
<p>يحسب نموذج Hugging Face الدرجات على ثلاث مراحل:</p>
<ol>
<li><strong>تحضير مدخلات النص.</strong> يقرأ Ranker نص الاستعلام من <code translate="no">params.queries</code> ونص المرشح من الحقل <code translate="no">VARCHAR</code> الذي تم تكوينه.</li>
<li><strong>إنشاء تمثيلات منفصلة للنموذج.</strong> يرسل Milvus الاستعلام على أنه <code translate="no">source_sentence</code> والنصوص المرشحة على أنها <code translate="no">sentences</code>. يقوم النموذج داخليًا بترميز الاستعلام وكل مرشح على حدة.</li>
<li><strong>قارن النتائج وأعد الدرجات.</strong> يقارن النموذج تمثيل الاستعلام مع كل تمثيل مرشح ويعيد درجة تشابه واحدة لكل مرشح.</li>
</ol>
<p>تعد التضمينات أو التمثيلات التي يستخدمها نموذج Hugging Face معالجة نموذجية وسيطة. يعرض Hugging Face الدرجات، وليس المتجهات. وبالتالي، يستخدم استرجاع المتجهات الأولي وإعادة ترتيب النموذج تمثيلات منفصلة وقد يستخدمان نماذج مختلفة.</p>
<h2 id="Before-you-start" class="common-anchor-header">قبل البدء<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل استخدام Hugging Face Ranker، تأكد من توفر ما يلي:</p>
<ul>
<li>Milvus 2.6.20 أو إصدار أحدث من سلسلة الإصدارات 2.6.</li>
<li>PyMilvus 2.6.16 أو أحدث.</li>
<li>رمز وصول مستخدم Hugging Face يمكنه استدعاء مزودي الاستدلال.</li>
<li>نموذج يتم تقديمه حاليًا بواسطة <code translate="no">hf-inference</code> لـ <a href="https://huggingface.co/tasks/sentence-similarity"><code translate="no">sentence-similarity</code></a> المهمة.</li>
<li>مجموعة تخزن النص المرشح في حقل <code translate="no">VARCHAR</code> غير قابل للقيمة الفارغة.</li>
</ul>
<div class="alert note">
<p>لا يتحكم Milvus في ما إذا كان نموذج Hugging Face سيظل متاحًا عبر <code translate="no">hf-inference</code> ، أو ما إذا كان النموذج يلبي متطلباتك من حيث الاستقرار وزمن الاستجابة وجودة المخرجات. تحقق من النموذج على Hugging Face وقم بتقييمه بالنسبة لحمل العمل الخاص بك قبل استخدامه في الإنتاج.</p>
</div>
<p>تستخدم الأمثلة <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a> فقط لتوضيح التكوين. ولا يُعد النموذج توصية أو اعتمادًا من Milvus.</p>
<h2 id="Configure-credentials" class="common-anchor-header">تكوين بيانات الاعتماد<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تكوين رمز وصول مستخدم Hugging Face في <code translate="no">milvus.yaml</code> أو من خلال متغير بيئة.</p>
<p>ترتيب أولوية بيانات الاعتماد هو:</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">الخيار 1: ملف التكوين<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>حدد الرمز في قسم <code translate="no">credential</code> ذي المستوى الأعلى، ثم وجه مزود تصنيف Hugging Face إلى تسمية بيانات الاعتماد:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">huggingface:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
          <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكن لمعلمة <code translate="no">credential</code> على مستوى الدالة أن تتجاوز التسمية على مستوى المزود. يجب أن تكون قيمتها تسمية بيانات اعتماد محددة في <code translate="no">milvus.yaml</code> ، وليس الرمز نفسه.</p>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">الخيار 2: متغير البيئة<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا لم تحدد أي من وظيفة أو تكوين المزود تسمية بيانات الاعتماد، فقم بتعيين <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> في بيئة خدمة Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Hugging-Face-Ranker" class="common-anchor-header">استخدام Hugging Face Ranker<button data-href="#Use-Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تعريف Hugging Face Ranker وتطبيقه في وقت البحث. يمكنك تغيير أو حذف أداة الترتيب لكل عملية بحث دون تغيير مخطط المجموعة.</p>
<h3 id="Step-1-Prepare-a-collection" class="common-anchor-header">الخطوة 1: إعداد مجموعة<button data-href="#Step-1-Prepare-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>يُنشئ المثال التالي مجموعة تحتوي على حقل نصي لإعادة الترتيب وحقل متجه للاسترجاع الأولي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_rerank_demo&quot;</span>
schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Recent renewable energy developments include improved solar efficiency.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Climate policy and carbon markets have evolved rapidly in recent years.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.39</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;New battery technology helps stabilize wind and solar power generation.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.90</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.05</span>, <span class="hljs-number">0.02</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector databases support similarity search for machine learning applications.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.01</span>, <span class="hljs-number">0.02</span>, <span class="hljs-number">0.03</span>, <span class="hljs-number">0.04</span>],
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-the-rerank-Function" class="common-anchor-header">الخطوة 2: تعريف دالة إعادة الترتيب<button data-href="#Step-2-Define-the-rerank-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتعريف دالة " <code translate="no">RERANK</code> " التي تقرأ النص المرشح من <code translate="no">document</code> وتستخدم نص الاستعلام الموجود في <code translate="no">queries</code>:</p>
<pre><code translate="no" class="language-python">hugging_face_ranker = Function(
    name=<span class="hljs-string">&quot;hugging_face_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت تستخدم فقط بيانات الاعتماد على مستوى المزود أو متغير البيئة، فاحذف <code translate="no">credential</code> من معلمات الدالة.</p>
<p>يصف الجدول التالي معلمات Hugging Face Ranker:</p>
<table>
<thead>
<tr><th>المعلمة</th><th>مطلوب؟</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">reranker</code></td><td>نعم</td><td>تنفيذ إعادة الترتيب. اضبط هذه القيمة على <code translate="no">model</code>.</td></tr>
<tr><td><code translate="no">provider</code></td><td>نعم</td><td>مزود النموذج. اضبط هذه القيمة على <code translate="no">huggingface</code>.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>نعم</td><td>معرف نموذج Hugging Face الخاص بنموذج يتم تقديمه عبر <code translate="no">hf-inference</code> لمهمة <code translate="no">sentence-similarity</code>.</td></tr>
<tr><td><code translate="no">queries</code></td><td>نعم</td><td>سلاسل الاستعلام المستخدمة لإعادة الترتيب. أدخل سلسلة واحدة فقط لكل استعلام بحث، حتى عندما يستخدم الاسترجاع الأولي متجهات الاستعلام.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>لا</td><td>مسار مزود الاستدلال (Inference Provider) الخاص بـ Hugging Face. القيمة الافتراضية والوحيدة المدعومة في Milvus 2.6.20 هي <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>لا</td><td>تسمية بيانات الاعتماد المحددة في قسم المستوى الأعلى <code translate="no">credential</code> في <code translate="no">milvus.yaml</code>. هذه القيمة ليست الرمز نفسه.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>لا</td><td>الحد الأقصى لعدد النصوص المرشحة المرسلة في طلب Hugging Face واحد. القيمة الافتراضية هي <code translate="no">32</code> ، ويجب أن تكون القيمة أكبر من <code translate="no">0</code>.</td></tr>
</tbody>
</table>
<h3 id="Step-3-Search-with-the-ranker" class="common-anchor-header">الخطوة 3: البحث باستخدام أداة الترتيب<button data-href="#Step-3-Search-with-the-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتمرير الدالة عبر المعلمة <code translate="no">ranker</code> في <code translate="no">search()</code>:</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.41</span>]

results = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
<span class="highlighted-wrapper-line">    ranker=hugging_face_ranker,</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>يقوم Milvus أولاً باسترداد المرشحين من <code translate="no">dense</code> ، ثم يستخدم نص الاستعلام الموجود في <code translate="no">queries</code> ونص المرشح الموجود في <code translate="no">document</code> لحساب درجات تشابه الجمل. يتم ترتيب المرشحين المعروضين حسب درجات Hugging Face.</p>
<h2 id="Troubleshooting" class="common-anchor-header">استكشاف الأخطاء وإصلاحها<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-sentence-similarity" class="common-anchor-header">النموذج غير متاح لتشابه الجمل<button data-href="#The-model-is-unavailable-for-sentence-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>افتح صفحة النموذج على Hugging Face وتحقق من قسم " <strong>Inference Providers</strong> " (مزودي الاستدلال). تأكد من أن <code translate="no">hf-inference</code> يقدم النموذج لـ <code translate="no">sentence-similarity</code>. إذا لم يكن الأمر كذلك، فاختر نموذجًا آخر يدعم هذه المهمة.</p>
<h3 id="The-number-of-query-strings-does-not-match-the-search-request" class="common-anchor-header">عدد سلاسل الاستعلام لا يتطابق مع طلب البحث<button data-href="#The-number-of-query-strings-does-not-match-the-search-request" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب أن يساوي عدد سلاسل الاستعلام في <code translate="no">queries</code> عدد استعلامات البحث (<code translate="no">nq</code>). للبحث باستخدام متجه استعلام واحد، أدخل سلسلة استعلام واحدة فقط.</p>
<h3 id="Candidate-text-is-missing-or-nullable" class="common-anchor-header">النص المرشح مفقود أو قابل للفراغ<button data-href="#Candidate-text-is-missing-or-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>تأكد من أن <code translate="no">input_field_names</code> يحتوي على حقل واحد فقط غير قابل للفراغ <code translate="no">VARCHAR</code> وأن كل كيان مرشح يحتوي على نص في هذا الحقل.</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">يبلغ Milvus عن فقدان بيانات اعتماد Hugging Face<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>تأكد من وجود تسمية بيانات اعتماد الوظيفة في <code translate="no">milvus.yaml</code> ، وأن التسمية على مستوى المزود صالحة، أو أن <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> موجود في بيئة خدمة Milvus.</p>
<h2 id="Next-steps" class="common-anchor-header">الخطوات التالية<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>للاطلاع على سلوك مصنف النماذج المشترك وحدوده، راجع <a href="/docs/ar/v2.6.x/model-ranker-overview.md">نظرة عامة على مصنف النماذج</a>.</li>
<li>لإنشاء التضمينات من خلال مزودي الاستدلال المستضافين من Hugging Face، راجع <a href="/docs/ar/v2.6.x/hugging-face.md">Hugging Face</a>.</li>
<li>لتطبيق أداة التصنيف على البحث الهجين، راجع " <a href="/docs/ar/v2.6.x/multi-vector-search.md">البحث الهجين متعدد المتجهات</a>".</li>
</ul>
