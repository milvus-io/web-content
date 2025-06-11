---
id: dashscope.md
title: داش سكوبCompatible with Milvus 2.6.x
summary: يصف هذا الموضوع كيفية تكوين واستخدام وظائف تضمين DashScope في Milvus.
beta: Milvus 2.6.x
---
<h1 id="DashScope" class="common-anchor-header">داش سكوب<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#DashScope" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية تكوين واستخدام وظائف تضمين DashScope في Milvus.</p>
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
    </button></h2><p>فيما يلي نماذج التضمين DashScope المتوفرة حاليًا للرجوع إليها سريعًا:</p>
<table>
   <tr>
     <th><p>اسم النموذج</p></th>
     <th><p>الأبعاد</p></th>
     <th><p>الحد الأقصى للرموز لكل صف</p></th>
     <th><p>اللغات المدعومة</p></th>
   </tr>
   <tr>
     <td><p>تضمين النص-تضمين النص-ف3</p></td>
     <td><p>1,024 (افتراضي) أو 768 أو 512</p></td>
     <td><p>8,192</p></td>
     <td><p>الصينية والإنجليزية والإسبانية والإسبانية والفرنسية والبرتغالية والبرتغالية والإندونيسية واليابانية والكورية والألمانية والروسية وأكثر من 50 لغة أخرى</p></td>
   </tr>
   <tr>
     <td><p>تضمين النص-تضمين النص-ف2</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>الصينية، الإنجليزية، الإنجليزية، الإسبانية، الفرنسية، الفرنسية، البرتغالية، الإندونيسية، اليابانية، الكورية، الألمانية، الروسية</p></td>
   </tr>
   <tr>
     <td><p>تضمين النص-تضمين النص-ف1</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>الصينية، الإنجليزية، الإنجليزية، الإسبانية، الفرنسية، الفرنسية، البرتغالية، الإندونيسية، اليابانية، الكورية، الألمانية، الروسية</p></td>
   </tr>
</table>
<p>يدعم نموذج التضمين <strong>text-تضمين النص-تضمين-ف3</strong> تقليل حجم التضمين عبر معلمة <code translate="no">dim</code>. عادةً ما تكون التضمينات الأكبر حجمًا أكثر تكلفة من منظور الحوسبة والذاكرة والتخزين. تتيح القدرة على ضبط عدد الأبعاد مزيدًا من التحكم في التكلفة الإجمالية والأداء. لمزيد من التفاصيل حول كل نموذج، راجع <a href="https://help.aliyun.com/zh/model-studio/user-guide/embedding?disableWebsiteRedirect=true">التضمين</a>.</p>
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
    </button></h2><p>يجب أن يعرف Milvus مفتاح DashScope API الخاص بك قبل أن يتمكن من طلب التضمينات. يوفر ميلفوس طريقتين لتكوين بيانات الاعتماد:</p>
<ul>
<li><p><strong>ملف التكوين (موصى به):</strong> تخزين مفتاح واجهة برمجة التطبيقات في <code translate="no">milvus.yaml</code> بحيث تلتقطه كل إعادة تشغيل وعقدة تلقائيًا.</p></li>
<li><p><strong>متغيرات البيئة:</strong> أدخل المفتاح في وقت النشر - مثالي لـ Docker Compose.</p></li>
</ul>
<p>اختر إحدى الطريقتين أدناه - من الأسهل الحفاظ على ملف التهيئة على الأجهزة العارية والأجهزة الافتراضية، بينما يناسب مسار env-var سير عمل الحاوية.</p>
<div class="alert note">
<p>إذا كان مفتاح واجهة برمجة التطبيقات لنفس الموفر موجودًا في كل من ملف التكوين ومتغير البيئة، يستخدم Milvus دائمًا القيمة في <code translate="no">milvus.yaml</code> ويتجاهل متغير البيئة.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">الخيار 1: ملف التكوين (موصى به وأولوية أعلى)</h3><p>احتفظ بمفاتيح واجهة برمجة التطبيقات الخاصة بك في <code translate="no">milvus.yaml</code> ؛ يقرأها Milvus عند بدء التشغيل ويتجاوز أي متغير بيئة لنفس الموفر.</p>
<ol>
<li><p>**أعلن مفاتيحك تحت <code translate="no">credential:</code></p>
<p>يمكنك إدراج مفتاح واحد أو أكثر من مفاتيح واجهة برمجة التطبيقات - أعطِ كل مفتاح تسمية تخترعها وستشير إليها لاحقًا.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>وضع مفاتيح واجهة برمجة التطبيقات هنا يجعلها ثابتة عند إعادة التشغيل ويتيح لك تبديل المفاتيح بمجرد تغيير التسمية.</p></li>
<li><p><strong>أخبر ميلفوس بالمفتاح الذي يجب استخدامه لاستدعاءات DashScope</strong></p>
<p>في نفس الملف، وجّه موفر DashScope إلى التسمية التي تريده أن يستخدمها.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">dashscope:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://dashscope-intl.aliyuncs.com/compatible-mode/v1   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>هذا يربط مفتاحًا محددًا لكل طلب يرسله ميلفوس إلى نقطة نهاية تضمينات DashScope.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">الخيار 2: متغير البيئة</h3><p>استخدم هذه الطريقة عندما تقوم بتشغيل Milvus مع Docker Compose وتفضل الاحتفاظ بالأسرار خارج الملفات والصور.</p>
<p>يعود Milvus إلى متغير البيئة فقط إذا لم يتم العثور على مفتاح للموفر في <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>المتغير</p></th>
     <th><p>مطلوب</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_DASHSCOPE_API_KEY</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يجعل مفتاح DashScope متاحًا داخل كل حاوية Milvus <em>(يتم تجاهله عند وجود مفتاح لـ DashScope في <code translate="no">milvus.yaml</code></em> )</p></td>
   </tr>
</table>
<p>في ملف <strong>docker-compose.yaml</strong> الخاص بك، قم بتعيين متغير البيئة <code translate="no">MILVUSAI_DASHSCOPE_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the DashScope API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_DASHSCOPE_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_DASHSCOPE_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تقوم كتلة <code translate="no">environment:</code> بحقن المفتاح فقط في حاوية Milvus، تاركةً نظام التشغيل المضيف الخاص بك دون أن يمسها. لمزيد من التفاصيل، راجع <a href="/docs/ar/configure-docker.md#Configure-Milvus-with-Docker-Compose">تكوين Milvus مع Docker Compose</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">استخدام وظيفة التضمين<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد تكوين بيانات الاعتماد، اتبع هذه الخطوات لتعريف دوال التضمين واستخدامها.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">الخطوة 1: تحديد حقول المخطط</h3><p>لاستخدام دالة التضمين، قم بإنشاء مجموعة بمخطط محدد. يجب أن يتضمن هذا المخطط ثلاثة حقول ضرورية على الأقل:</p>
<ul>
<li><p>الحقل الأساسي الذي يحدد بشكل فريد كل كيان في المجموعة.</p></li>
<li><p>حقل قياسي يخزن البيانات الأولية المراد تضمينها.</p></li>
<li><p>حقل متجه محجوز لتخزين التضمينات المتجهة التي ستقوم الدالة بإنشائها للحقل القياسي.</p></li>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">الخطوة 2: إضافة دالة التضمين إلى المخطط</h3><p>تقوم الوحدة النمطية الدالة في ميلفوس تلقائيًا بتحويل البيانات الأولية المخزنة في حقل قياسي إلى تضمينات وتخزينها في حقل متجه محدد بشكل صريح.</p>
<p>يضيف المثال أدناه وحدة الدالة (<code translate="no">ali</code>) التي تقوم بتحويل الحقل القياسي <code translate="no">&quot;document&quot;</code> إلى تضمينات، وتخزين المتجهات الناتجة في الحقل المتجه <code translate="no">&quot;dense&quot;</code> المحدد مسبقًا.</p>
<p>بمجرد تعريف دالة التضمين الخاصة بك، قم بإضافتها إلى مخطط مجموعتك. هذا يوجه ميلفوس لاستخدام دالة التضمين المحددة لمعالجة التضمينات وتخزينها من بياناتك النصية.</p>
<pre><code translate="no" class="language-python">
<span class="hljs-comment"># Define embedding function specifically for model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;ali&quot;</span>,                                     <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific embedding parameters</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;dashscope&quot;</span>,                    <span class="hljs-comment"># Embedding provider name (must be &quot;dashscope&quot;)</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-v3&quot;</span>,          <span class="hljs-comment"># Specific embedding model used</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;                # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1024&quot;,                            # Optional: Shorten the output vector dimension</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>بعد تكوين دالة التضمين، ارجع إلى <a href="/docs/ar/embedding-function-overview.md">نظرة عامة على الدالة</a> للحصول على إرشادات إضافية حول تكوين الفهرس وأمثلة إدراج البيانات وعمليات البحث الدلالي.</p>
