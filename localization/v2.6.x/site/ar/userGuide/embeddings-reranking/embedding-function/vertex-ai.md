---
id: vertex-ai.md
title: فيرتكس للذكاء الاصطناعيCompatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AI هي خدمة عالية الأداء مصممة خصيصًا لنماذج تضمين النصوص.
  يشرح هذا الدليل كيفية استخدام Google Cloud Vertex AI مع Milvus لتوليد تضمين
  نصي فعال.
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">فيرتكس للذكاء الاصطناعي<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AI</a> هي خدمة عالية الأداء مصممة خصيصًا لنماذج تضمين النصوص. يشرح هذا الدليل كيفية استخدام Google Cloud Vertex AI مع Milvus لتوليد تضمين النص بكفاءة.</p>
<p>يدعم Vertex AI العديد من نماذج التضمين لحالات استخدام مختلفة:</p>
<ul>
<li><p>تضمين النص-005 (أحدث نموذج تضمين نصي)</p></li>
<li><p>تضمين نص متعدد اللغات-تضمين النص-002 (أحدث نموذج تضمين نص متعدد اللغات)</p></li>
</ul>
<p>للحصول على التفاصيل، ارجع إلى <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">مرجع نماذج تضمين النص Vertex AI</a>.</p>
<h2 id="Vertex-AI-deployment" class="common-anchor-header">نشر فيرتكس للذكاء الاصطناعي<button data-href="#Vertex-AI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تكوين Milvus مع وظيفة Vertex AI، تحتاج إلى تكوين مثيل Milvus الخاص بك لاستخدام بيانات اعتماد حساب خدمة Google Cloud الخاص بك. يدعم Milvus طريقتين رئيسيتين للنشر:</p>
<h3 id="Standard-deployment-Docker-Compose" class="common-anchor-header">النشر القياسي (Docker-compose)</h3><p>في ملف docker-compose.yaml الخاص بك، تحتاج إلى تحميل ملف بيانات الاعتماد وتعيين متغير البيئة <code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-comment"># ... other mounts ...</span>
    <span class="hljs-comment"># Mount the credential file from the host to the specified path inside the container</span>
    <span class="hljs-comment"># Replace /path/to/your/credentials.json with the actual path</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-Helm-Chart-deployment-Kubernetes" class="common-anchor-header">نشر مخطط ميلفوس هيلم (Kubernetes)</h3><p>بالنسبة لبيئات Kubernetes، يوصى باستخدام سر Kubernetes لتخزين ملف بيانات الاعتماد:</p>
<ol>
<li><p><strong>إنشاء سر</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">secret</span> <span class="hljs-string">generic</span> <span class="hljs-string">vertex-ai-secret</span> <span class="hljs-string">\</span>
  <span class="hljs-string">--from-file=credentials.json=/path/to/your/credentials.json</span> <span class="hljs-string">\</span>
  <span class="hljs-string">-n</span> <span class="hljs-string">&lt;your-milvus-namespace&gt;</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>تكوين القيم.yaml</strong></p>
<p>أضف ما يلي ضمن أقسام مستقل أو وكيل/عُقدة بيانات:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
    <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">التكوين في ميلفوس<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد نشر بيانات اعتماد Vertex AI، ستحتاج إلى تكوين وظيفة التضمين. يدعم Milvus طرقًا متعددة لتكوين بيانات اعتماد المصادقة لـ Vertex AI، يتم تطبيقها بالترتيب التالي حسب الأسبقية:</p>
<ul>
<li><p><strong>ملف تكوين ملف Milvus (milvus.yaml)</strong> - الأولوية القصوى</p></li>
<li><p><strong>متغيرات البيئة</strong> - الأولوية الأقل</p></li>
</ul>
<p><strong>ملف تكوين Milvus (milvus.yaml)</strong></p>
<p>بالنسبة للإعدادات الثابتة على مستوى المجموعة، يمكن ترميز بيانات بيانات الاعتماد json بتنسيق base64 ثم تعريفها في ملف milvus.yaml.<code translate="no">cat credentials.json|jq .|base64</code>استبدل <code translate="no">credentials.json</code> بمسار ملف بيانات الاعتماد</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp1:</span>
    <span class="hljs-attr">credential_json:</span>  <span class="hljs-comment"># base64 based gcp credential data</span>

<span class="hljs-comment"># Any configuration related to functions</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span>  <span class="hljs-string">gcp1</span> <span class="hljs-comment"># The name in the crendential configuration item</span>
        <span class="hljs-attr">url:</span>  <span class="hljs-comment"># Your VertexAI embedding url</span>

<button class="copy-code-btn"></button></code></pre>
<p><strong>متغيرات البيئة</strong></p>
<p>توفر متغيرات البيئة طريقة تكوين بديلة، تُستخدم عادةً عند إعداد بيئات الحاويات في عمليات نشر Docker Compose أو Kubernetes.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Example (typically set in docker-compose.yaml or Kubernetes manifest)</span>
<span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
    
<span class="hljs-comment">#Add the following under the standalone or proxy/dataNode sections in values.yaml:    </span>
<span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>    
    
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>بمجرد تكوين Vertex AI، اتبع هذه الخطوات لتعريف دوال التضمين واستخدامها.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">الخطوة 1: تحديد حقول المخطط</h3><p>لاستخدام دالة التضمين، قم بإنشاء مجموعة بمخطط محدد. يجب أن يتضمن هذا المخطط ثلاثة حقول ضرورية على الأقل:</p>
<ul>
<li><p>الحقل الأساسي الذي يحدد بشكل فريد كل كيان في المجموعة.</p></li>
<li><p>حقل قياسي يخزن البيانات الأولية المراد تضمينها.</p></li>
<li><p>حقل متجه محجوز لتخزين التضمينات المتجهة التي ستنشئها الدالة للحقل القياسي.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">الخطوة 2: إضافة دالة التضمين إلى المخطط</h3><p>تقوم الوحدة النمطية الدالة في ميلفوس تلقائيًا بتحويل البيانات الخام المخزنة في الحقل القياسي إلى تضمينات وتخزينها في الحقل المتجه المحدد صراحةً.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>المعلمة</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
     <th><p><strong>مطلوبة؟</strong></p></th>
     <th><p><strong>مثال القيمة</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>موفر نموذج التضمين. تعيين إلى "vertexai".</p></td>
     <td><p>نعم</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>تحديد نموذج تضمين Vertex AI المراد استخدامه.</p></td>
     <td><p>نعم</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>معرّف مشروع Google Cloud الخاص بك.</p></td>
     <td><p>نعم</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>المنطقة الخاصة بخدمة Vertex AI. تدعم تضمينات Vertex AI حاليًا تضمينات Vertex AI بشكل أساسي us-central1. افتراضي إلى us-central1.</p></td>
     <td><p>لا</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>تحديد نوع مهمة التضمين، مما يؤثر على نتائج التضمين. القيم المقبولة: DOC_RETRIETRIEVAL (افتراضي)، CODE_RETRIEVAL (مدعومة فقط 005)، STS (التشابه النصي الدلالي).</p></td>
     <td><p>لا يوجد</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>بُعد ناقلات تضمين الإخراج. يقبل الأعداد الصحيحة بين 1 و768. <strong>ملاحظة:</strong> في حالة تحديدها، تأكد من أن بُعد حقل المتجه في المخطط يطابق هذه القيمة.</p></td>
     <td><p>لا يوجد</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
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
    </button></h2><p>بعد تكوين دالة التضمين، ارجع إلى <a href="/docs/ar/embeddings.md">نظرة عامة على الدالة</a> للحصول على إرشادات إضافية حول تكوين الفهرس وأمثلة إدراج البيانات وعمليات البحث الدلالي.</p>
