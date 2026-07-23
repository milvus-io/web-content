---
id: hugging-face.md
title: Hugging FaceCompatible with Milvus v2.6.20+
summary: >-
  يشرح هذا الموضوع كيفية استخدام مزودي الاستدلال المستضافين من Hugging Face
  لإدماج النصوص في Milvus.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face" class="common-anchor-header">Hugging Face<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face" class="anchor-icon" translate="no">
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
    </button></h1><p>عادةً ما يتطلب استخدام نموذج التضمين من Hugging Face أن يقوم تطبيقك بإدارة بيانات الاعتماد، واستدعاء النموذج بشكل منفصل، وإنشاء تضمينات بشكل متسق للبيانات المُدرجة واستعلامات البحث. باستخدام وظيفة تضمين النص (Text Embedding Function)، يقوم Milvus باستدعاء <a href="https://huggingface.co/docs/inference-providers/index">مزودي الاستدلال (Inference Providers)</a> المستضافين <a href="https://huggingface.co/docs/inference-providers/index">من Hugging Face</a> لتحويل النص الخام إلى متجهات أثناء الإدراج والبحث.</p>
<p>يستخدم هذا التكامل جهاز التوجيه المستضاف من Hugging Face. لربط Milvus بخدمة استدلال تضمين النص (TEI) التي تم نشرها بشكل منفصل، راجع <a href="/docs/ar/hugging-face-tei.md">Hugging Face TEI</a>.</p>
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
<li>يجب أن يستخدم حقل إخراج الوظيفة نوع البيانات « <code translate="no">FLOAT_VECTOR</code> ». لا يدعم التضمين من Hugging Face في Milvus حقول الإخراج « <code translate="no">INT8_VECTOR</code> » أو « <code translate="no">BINARY_VECTOR</code> » أو « <code translate="no">FLOAT16_VECTOR</code> » أو « <code translate="no">BFLOAT16_VECTOR</code> ».</li>
<li>يجب أن يتطابق بُعد حقل إخراج الدالة مع بُعد إخراج النموذج المحدد.</li>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-embedding-flow.png" alt="Hugging Face text embedding workflow" class="doc-image" id="hugging-face-text-embedding-workflow" /> 
   <span>سير عمل تضمين النص في Hugging Face</span>
  
 </span></p>
<p>يتكون سير العمل من ثلاث مراحل:</p>
<ol>
<li><strong>إرسال النص الخام.</strong> يقدم تطبيقك النص الخام في طلب إدراج أو بحث.</li>
<li><strong>إنشاء تضمين.</strong> ترسل وظيفة تضمين النص (Text Embedding Function) النص عبر "إرسال النص إلى Hugging Face" ( <code translate="no">hf-inference</code> ) إلى مسار "تضمين النص" ( <code translate="no">feature-extraction</code> ) في Hugging Face. تستخدم الوظيفة "تحديد النموذج" ( <code translate="no">model_name</code> ) لاختيار النموذج ويمكنها تمرير خيارات الاستدلال المدعومة مثل التطبيع والاقتطاع.</li>
<li><strong>استخدام التضمين.</strong> تُرجع Hugging Face تضمينًا واحدًا ذي نقطة عائمة لكل نص مدخل. أثناء الإدراج، يخزن Milvus المتجه في حقل إخراج الوظيفة. أثناء البحث، يستخدم Milvus المتجه كمتجه الاستعلام.</li>
</ol>
<p>تتولى نفس تهيئة الوظيفة معالجة الإدراج والبحث، مما يحافظ على اتساق النموذج ومعلمات الاستدلال عبر كلتا العمليتين.</p>
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
    </button></h2><p>قبل استخدام تضمين النص المستضاف من Hugging Face، تأكد من توفر ما يلي:</p>
<ul>
<li>Milvus 2.6.20 أو إصدار أحدث ضمن سلسلة الإصدارات 2.6.</li>
<li>PyMilvus 2.6.16 أو أحدث.</li>
<li>رمز وصول مستخدم Hugging Face يمكنه استدعاء مزودي الاستدلال.</li>
<li>نموذج يتم تقديمه حاليًا بواسطة <code translate="no">hf-inference</code> لـ <a href="https://huggingface.co/docs/inference-providers/en/tasks/feature-extraction"><code translate="no">feature-extraction</code></a> المهمة.</li>
</ul>
<div class="alert note">
<p>لا يتحكم Milvus في ما إذا كان نموذج Hugging Face سيظل متاحًا عبر <code translate="no">hf-inference</code> ، أو ما إذا كان النموذج يفي بمتطلباتك من حيث الاستقرار وزمن الاستجابة وجودة المخرجات. تحقق من النموذج على Hugging Face وقم بتقييمه بالنسبة لحمل العمل الخاص بك قبل استخدامه في بيئة الإنتاج.</p>
</div>
<p>تستخدم الأمثلة <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a>، الذي ينتج تضمينات ذات 384 بُعدًا. يُستخدم النموذج فقط لتوضيح التكوين ولا يمثل توصية أو اعتمادًا من Milvus.</p>
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
    </button></h2><p>يتطلب Milvus رمز وصول مستخدم Hugging Face لاستدعاء الموجه المستضاف. يمكنك تكوين الرمز في <code translate="no">milvus.yaml</code> أو من خلال متغير بيئة.</p>
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
    </button></h3><p>حدد الرمز في قسم المستوى الأعلى <code translate="no">credential</code> في <code translate="no">milvus.yaml</code> ، ثم قم بتوجيه مزود التضمين Hugging Face إلى تسمية بيانات الاعتماد تلك:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">huggingface:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
        <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا تعيين <code translate="no">credential</code> في معلمات الوظيفة. يجب أن تكون القيمة هي التسمية المحددة في قسم المستوى الأعلى <code translate="no">credential</code> ، وليس الرمز نفسه. وتكون أولوية تسمية بيانات الاعتماد على مستوى الوظيفة أعلى من أولوية التسمية على مستوى المزود.</p>
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
    </button></h3><p>إذا لم تحدد إعدادات الدالة أو المزود تسمية بيانات الاعتماد، فإن Milvus يقرأ الرمز المميز من <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code>.</p>
<p>بالنسبة إلى Docker Compose، قم بتعيين المتغير في خدمة Milvus المستقلة:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>للحصول على تفاصيل حول تطبيق إعدادات Docker Compose، راجع <a href="/docs/ar/configure-docker.md">تكوين Milvus باستخدام Docker Compose</a>.</p>
<h2 id="Use-Hugging-Face-text-embedding" class="common-anchor-header">استخدام تضمين النص في Hugging Face<button data-href="#Use-Hugging-Face-text-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="common-anchor-header">الخطوة 1: إنشاء مجموعة باستخدام وظيفة تضمين النص<button data-href="#Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بإنشاء مخطط يحتوي على حقل أساسي، وحقل إدخال <code translate="no">VARCHAR</code> ، وحقل إخراج <code translate="no">FLOAT_VECTOR</code>. يجب أن يتطابق بُعد الإخراج مع النموذج المحدد.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_embedding_demo&quot;</span>
schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;document&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">9000</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">384</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>حدد دالة " <code translate="no">TEXTEMBEDDING</code> " التي تكتب التضمينات من " <code translate="no">document</code> " إلى " <code translate="no">dense</code>":</p>
<pre><code translate="no" class="language-python">text_embedding_function = Function(
    name=<span class="hljs-string">&quot;hugging_face_embedding&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    function_type=FunctionType.TEXTEMBEDDING,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;normalize&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    },</span>
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p>إذا كنت تستخدم فقط بيانات اعتماد مستوى المزود أو متغير البيئة، فاحذف <code translate="no">credential</code> من معلمات الدالة.</p>
<p>قم بتكوين فهرس لحقل الإخراج، ثم أنشئ المجموعة:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
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
<button class="copy-code-btn"></button></code></pre>
<p>يصف الجدول التالي معلمات الوظيفة الخاصة بـ Hugging Face:</p>
<table>
<thead>
<tr><th>المعلمة</th><th>مطلوب؟</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">provider</code></td><td>نعم</td><td>مزود نموذج التضمين. اضبط هذه القيمة على <code translate="no">huggingface</code>.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>نعم</td><td>معرف نموذج Hugging Face لنموذج يتم تقديمه عبر <code translate="no">hf-inference</code> لمهمة <code translate="no">feature-extraction</code>.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>لا</td><td>مسار مزود الاستدلال في Hugging Face. القيمة الافتراضية والوحيدة المدعومة في Milvus 2.6.20 هي <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>لا</td><td>تسمية بيانات الاعتماد المحددة في قسم <code translate="no">credential</code> ذي المستوى الأعلى ضمن <code translate="no">milvus.yaml</code>. هذه القيمة ليست الرمز المميز نفسه.</td></tr>
<tr><td><code translate="no">normalize</code></td><td>لا</td><td>ما إذا كان يجب على Hugging Face إرجاع التضمينات المعيارية. القيم المدعومة هي <code translate="no">true</code> و <code translate="no">false</code>. إذا تم حذفها، فإن Milvus لا يضبط هذا الخيار في الطلب.</td></tr>
<tr><td><code translate="no">prompt_name</code></td><td>لا</td><td>اسم الموجه المحدد في تكوين Sentence Transformers للنموذج المحدد.</td></tr>
<tr><td><code translate="no">truncate</code></td><td>لا</td><td>ما إذا كان يجب على Hugging Face اقتطاع المدخلات التي تتجاوز الطول المدعوم من قبل النموذج. القيم المدعومة هي <code translate="no">true</code> و <code translate="no">false</code>.</td></tr>
<tr><td><code translate="no">truncation_direction</code></td><td>لا</td><td>الاتجاه الذي يقوم Hugging Face من خلاله باقتطاع المدخلات. القيم المدعومة هي <code translate="no">left</code> و <code translate="no">right</code>.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>لا</td><td>الحد الأقصى لعدد النصوص المدخلة المرسلة في طلب واحد إلى Hugging Face. القيمة الافتراضية هي <code translate="no">128</code> ، ويجب أن تكون القيمة أكبر من <code translate="no">0</code>.</td></tr>
</tbody>
</table>
<h3 id="Step-2-Insert-raw-text" class="common-anchor-header">الخطوة 2: إدراج النص الخام<button data-href="#Step-2-Insert-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>أدخل النص دون توفير متجهات. يقوم Milvus باستدعاء Hugging Face وكتابة التضمينات التي تم إنشاؤها إلى <code translate="no">dense</code>.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Search-with-raw-text" class="common-anchor-header">الخطوة 3: البحث باستخدام النص الخام<button data-href="#Step-3-Search-with-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>البحث باستخدام استعلام نصي. يطبق Milvus نفس تكوين الوظيفة لإنشاء متجه الاستعلام قبل تشغيل البحث المتجهي.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>تحتوي النتيجة على المستندات الأكثر صلة بنص الاستعلام، مرتبة حسب تشابه جيب التمام.</p>
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
    </button></h2><h3 id="The-model-is-unavailable-for-feature-extraction" class="common-anchor-header">النموذج غير متاح لاستخراج الميزات<button data-href="#The-model-is-unavailable-for-feature-extraction" class="anchor-icon" translate="no">
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
    </button></h3><p>افتح صفحة النموذج على Hugging Face وتحقق من قسم " <strong>Inference Providers</strong> " (مزودي الاستدلال). تأكد من أن " <code translate="no">hf-inference</code> " يقدم النموذج لـ " <code translate="no">feature-extraction</code>" (الاستدلال على النص). إذا لم يكن الأمر كذلك، فحدد نموذجًا آخر وقم بتحديث بُعد حقل المتجه إذا لزم الأمر.</p>
<h3 id="The-returned-vector-dimension-does-not-match-the-field" class="common-anchor-header">أبعاد المتجه المرتجعة لا تتطابق مع الحقل<button data-href="#The-returned-vector-dimension-does-not-match-the-field" class="anchor-icon" translate="no">
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
    </button></h3><p>تحقق من بُعد مخرجات النموذج وقارنه مع <code translate="no">dim</code> في حقل «مخرجات الدالة». يرفض Milvus أي استجابة يختلف بُعد متجهها عن بُعد حقل <code translate="no">FLOAT_VECTOR</code>.</p>
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
    </button></h3><p>تأكد من وجود تسمية بيانات اعتماد الوظيفة (Function credential) في قسم «بيانات اعتماد Hugging Face» ( <code translate="no">credential</code> ) على المستوى الأعلى، أو أن التسمية على مستوى المزود صالحة، أو أن «بيانات اعتماد Hugging Face» ( <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> ) موجودة في بيئة خدمة Milvus.</p>
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
<li>للاطلاع على المفاهيم العامة لـ Function وسلوك الإدراج/البحث، راجع <a href="/docs/ar/embedding-function-overview.md">نظرة عامة على Embedding Function</a>.</li>
<li>لإعادة ترتيب المرشحين في البحث المتجه باستخدام درجات تشابه الجمل المستضافة من Hugging Face، راجع <a href="/docs/ar/hugging-face-ranker.md">Hugging Face Ranker</a>.</li>
</ul>
