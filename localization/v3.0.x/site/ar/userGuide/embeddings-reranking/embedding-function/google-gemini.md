---
id: google-gemini.md
title: جوجل الجوزاء
summary: >-
  استخدم نموذج تضمين Google Gemini مع Milvus عن طريق اختيار نموذج وتهيئة Milvus
  باستخدام مفتاح واجهة برمجة تطبيقات Gemini الخاص بك.
---
<h1 id="Google-Gemini" class="common-anchor-header">جوجل الجوزاء<button data-href="#Google-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم نموذج تضمين Google Gemini مع Milvus عن طريق اختيار نموذج وتكوين Milvus باستخدام مفتاح واجهة برمجة تطبيقات Gemini الخاص بك.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">اختر نموذج التضمين<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus نماذج التضمين التي يوفرها Google Gemini. فيما يلي نماذج التضمين المتوفرة حاليًا من Gemini للرجوع إليها سريعًا:</p>
<table>
   <tr>
     <th><p><strong>اسم النموذج</strong></p></th>
     <th><p><strong>الأبعاد</strong></p></th>
     <th><p><strong>الحد الأقصى للرموز</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
   </tr>
   <tr>
     <td><p>تضمين الجوزاء-001</p></td>
     <td><p>افتراضي: 3,072 (موصى به: 768 أو 1,536 أو 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>نموذج تضمين النص بأبعاد مرنة، تم تدريبه باستخدام تعلم تمثيل ماتريوشكا (MRL).</p></td>
   </tr>
   <tr>
     <td><p>التضمين الجيمي -2</p></td>
     <td><p>افتراضي: 3,072 (موصى به: 768 أو 1,536 أو 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>أول نموذج تضمين متعدد الوسائط أصلاً من Google، يدعم النصوص والصور والفيديو والصوت والمستندات في مساحة تضمين موحدة.</p></td>
   </tr>
</table>
<p>يتم تدريب كلا النموذجين باستخدام تقنية تعلُّم تمثيل ماتريوشكا (MRL)، التي تسمح بأبعاد مخرجات مرنة عبر معلمة <code translate="no">dim</code>. يوصى بالبدء بـ 768 بُعدًا وتوسيع نطاقها إلى 1,536 أو 3,072 إذا لزم الأمر. لمزيد من التفاصيل، راجع <a href="https://ai.google.dev/gemini-api/docs/embeddings">نماذج تضمين الجوزاء</a>.</p>
<p>تدعم نماذج تضمين الجوزاء أيضًا معلمة <strong>نوع المهمة</strong> التي تعمل على تحسين التضمينات لحالات استخدام محددة. يقوم Milvus تلقائيًا بتعيين نوع المهمة بناءً على العملية:</p>
<ul>
<li><p><strong>إدراج/إدراج</strong>: <code translate="no">RETRIEVAL_DOCUMENT</code></p></li>
<li><p><strong>بحث</strong>: <code translate="no">RETRIEVAL_QUERY</code></p></li>
</ul>
<p>يمكنك تجاوز ذلك من خلال تحديد معلمة <code translate="no">task</code> بشكل صريح (على سبيل المثال، <code translate="no">SEMANTIC_SIMILARITY</code> ، ، <code translate="no">CLASSIFICATION</code> ، <code translate="no">CLUSTERING</code>).</p>
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
    </button></h2><p>يجب أن يعرف Milvus مفتاح Gemini API الخاص بك قبل أن يتمكن من طلب التضمينات. يوفر Milvus طريقتين لتكوين بيانات الاعتماد:</p>
<ul>
<li><p><strong>ملف التكوين (موصى به):</strong> قم بتخزين مفتاح واجهة برمجة التطبيقات في <code translate="no">milvus.yaml</code> بحيث تلتقطه كل إعادة تشغيل وعقدة تلقائيًا.</p></li>
<li><p><strong>متغيرات البيئة:</strong> أدخل المفتاح في وقت النشر - مثالي لـ Docker Compose.</p></li>
</ul>
<p>اختر إحدى الطريقتين أدناه - من الأسهل الحفاظ على ملف التهيئة على الأجهزة العارية والأجهزة الافتراضية، بينما يناسب مسار env-var سير عمل الحاوية.</p>
<p>إذا كان مفتاح واجهة برمجة التطبيقات لنفس الموفر موجودًا في كل من ملف التكوين ومتغير البيئة، يستخدم Milvus دائمًا القيمة في <code translate="no">milvus.yaml</code> ويتجاهل متغير البيئة.</p>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">الخيار 1: ملف التكوين (موصى به وأولوية أعلى)<button data-href="#Option-1-Configuration-file-recommended--higher-priority" class="anchor-icon" translate="no">
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
    </button></h3><p>احتفظ بمفاتيح واجهة برمجة التطبيقات الخاصة بك في <code translate="no">milvus.yaml</code> ؛ يقرأها Milvus عند بدء التشغيل ويتجاوز أي متغير بيئة لنفس الموفر.</p>
<ol>
<li><p><strong>أعلن مفاتيحك ضمن بيانات الاعتماد:</strong></p>
<p>يمكنك سرد مفتاح واحد أو أكثر من مفاتيح واجهة برمجة التطبيقات - أعطِ كل منها تسمية تخترعها وستشير إليها لاحقًا.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>وضع مفاتيح واجهة برمجة التطبيقات هنا يجعلها ثابتة عبر عمليات إعادة التشغيل ويتيح لك تبديل المفاتيح بمجرد تغيير التسمية.</p></li>
<li><p><strong>أخبر ميلفوس بالمفتاح الذي يجب استخدامه لمكالمات الجوزاء</strong></p>
<p>في نفس الملف، وجّه موفر Gemini إلى التسمية التي تريده أن يستخدمها.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">gemini:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>هذا يربط مفتاحًا محددًا لكل طلب يرسله ميلفوس إلى نقطة نهاية تضمينات الجوزاء.</p></li>
</ol>
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
    </button></h3><p>استخدم هذه الطريقة عندما تقوم بتشغيل Milvus مع Docker Compose وتفضل الاحتفاظ بالأسرار خارج الملفات والصور.</p>
<p>يعود Milvus إلى متغير البيئة فقط إذا لم يتم العثور على مفتاح للموفر في <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p><strong>المتغير</strong></p></th>
     <th><p><strong>مطلوب</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
   </tr>
   <tr>
     <td><p>milvus_gemini_api_key</p></td>
     <td><p>نعم</p></td>
     <td><p>يجعل مفتاح Gemini متاحًا داخل كل حاوية Milvus (يتم تجاهله عند وجود مفتاح ل Gemini في milvus.yaml)</p></td>
   </tr>
</table>
<p>في ملف <strong>docker-compose.yaml</strong> الخاص بك، قم بتعيين متغير البيئة <code translate="no">MILVUS_GEMINI_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Gemini API key inside the container</span>
    <span class="hljs-attr">MILVUS_GEMINI_API_KEY:</span> <span class="hljs-string">&lt;YOUR_GEMINI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تقوم كتلة <code translate="no">environment:</code> بحقن المفتاح فقط في حاوية Milvus، تاركةً نظام التشغيل المضيف الخاص بك دون أن يمسه أحد. لمزيد من التفاصيل، راجع <a href="http://configure-docker.md#Configure-Milvus-with-Docker-Compose">تكوين Milvus مع Docker Compose</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-text-embedding-function" class="common-anchor-header">الخطوة 1: إنشاء مجموعة بدالة تضمين نصية<button data-href="#Step-1-Create-a-collection-with-a-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-schema-fields" class="common-anchor-header">تحديد حقول المخطط<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>لاستخدام دالة التضمين، قم بإنشاء مجموعة بمخطط محدد. يجب أن يتضمن هذا المخطط ثلاثة حقول ضرورية على الأقل:</p>
<ul>
<li><p>الحقل الأساسي الذي يحدد بشكل فريد كل كيان في المجموعة.</p></li>
<li><p>حقل <code translate="no">VARCHAR</code> الذي يخزن البيانات الأولية المراد تضمينها.</p></li>
<li><p>حقل متجه محجوز لتخزين التضمينات المتجهة الكثيفة التي ستقوم دالة تضمين النص بإنشائها للحقل <code translate="no">VARCHAR</code>.</p></li>
</ul>
<p>يحدد المثال التالي مخططًا يحتوي على حقل قياسي واحد <code translate="no">&quot;document&quot;</code> لتخزين البيانات النصية وحقل متجه واحد <code translate="no">&quot;dense&quot;</code> لتخزين التضمينات التي سيتم إنشاؤها بواسطة الوحدة النمطية للدالة. تذكر تعيين البعد المتجه (<code translate="no">dim</code>) لمطابقة مخرجات نموذج التضمين الذي اخترته.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment"># For instance, Gemini&#x27;s gemini-embedding-001 model outputs 3072-dimensional vectors by default,</span>
<span class="hljs-comment"># but can be shortened to 768 or 1536 dimensions.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-text-embedding-function" class="common-anchor-header">تحديد دالة تضمين النص<button data-href="#Define-the-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h3><p>تقوم دالة تضمين النص تلقائيًا بتحويل البيانات الأولية المخزنة في حقل <code translate="no">VARCHAR</code> إلى تضمينات وتخزينها في حقل المتجه المحدد صراحةً.</p>
<p>يضيف المثال أدناه وحدة دالة (<code translate="no">gemini_embedding</code>) تقوم بتحويل الحقل القياسي <code translate="no">&quot;document&quot;</code> إلى تضمينات، وتخزين المتجهات الناتجة في الحقل المتجه <code translate="no">&quot;dense&quot;</code> المحدد مسبقًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: Gemini provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;gemini_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;gemini&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>,       <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;768&quot;,                             # Optional: Output vector dimension (default 3072)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;RETRIEVAL_DOCUMENT&quot;,             # Optional: Task type for embedding optimization</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p><strong>أنواع المهام المدعومة لمعلمة المهمة:</strong></p>
<ul>
<li><p><code translate="no">RETRIEVAL_DOCUMENT</code> - تحسين التضمينات لفهرسة المستندات (افتراضي للإدراج/الإدراج).</p></li>
<li><p><code translate="no">RETRIEVAL_QUERY</code> - تحسين التضمينات لاسترجاع الاستعلام (افتراضي للبحث).</p></li>
<li><p><code translate="no">SEMANTIC_SIMILARITY</code> - تحسين التضمينات لقياس تشابه النص.</p></li>
<li><p><code translate="no">CLASSIFICATION</code> - تحسين التضمينات لتصنيف النصوص.</p></li>
<li><p><code translate="no">CLUSTERING</code> - تحسين التضمينات للتجميع.</p></li>
</ul>
<p>عندما لا يتم تعيينها بشكل صريح، يستخدم Milvus تلقائيًا <code translate="no">RETRIEVAL_DOCUMENT</code> أثناء الإدراج/الإضافة و <code translate="no">RETRIEVAL_QUERY</code> أثناء البحث.</p>
<h3 id="Configure-the-index" class="common-anchor-header">تكوين الفهرس<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تحديد المخطط مع الحقول الضرورية والوظيفة المدمجة، قم بإعداد الفهرس لمجموعتك. لتبسيط هذه العملية، استخدم <code translate="no">AUTOINDEX</code> كـ <code translate="no">index_type</code> ، وهو خيار يسمح لـ Milvus باختيار وتكوين نوع الفهرس الأنسب بناءً على بنية بياناتك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-collection" class="common-anchor-header">إنشاء المجموعة<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>الآن قم بإنشاء المجموعة باستخدام المخطط ومعلمات الفهرس المحددة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-data" class="common-anchor-header">الخطوة 2: إدراج البيانات<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إعداد المجموعة والفهرس الخاص بك، تكون جاهزًا لإدراج بياناتك الأولية. في هذه العملية، تحتاج فقط إلى توفير النص الخام. تقوم وحدة الدالة التي حددناها سابقًا بإنشاء المتجه المتناثر المقابل تلقائيًا لكل إدخال نصي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text" class="common-anchor-header">الخطوة 3: البحث بالنص<button data-href="#Step-3-Search-with-text" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إدراج البيانات، قم بإجراء بحث دلالي باستخدام نص الاستعلام الخام. يقوم Milvus تلقائيًا بتحويل استعلامك إلى متجه تضمين تلقائيًا، ويسترجع المستندات ذات الصلة بناءً على التشابه، ويعيد النتائج الأكثر مطابقة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول عمليات البحث والاستعلام، راجع <a href="/docs/ar/single-vector-search.md">البحث المتجه الأساسي</a> <a href="/docs/ar/get-and-scalar-query.md">والاستعلام</a>.</p>
