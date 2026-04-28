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
<li><p>gemini-embedding-001 (أحدث أداء عبر مهام اللغة الإنجليزية ومتعددة اللغات والرموز)</p></li>
<li><p>النص-التضمين النصي-005 (أحدث نموذج تضمين نصي)</p></li>
<li><p>text-multultilingual-embedding-002 (أحدث نموذج لتضمين النص متعدد اللغات)</p></li>
</ul>
<p>لمزيد من المعلومات، راجع <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">نماذج تضمين النصوص فيرتكس AI</a>.</p>
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
    </button></h2><p>تأكد من استيفاء هذه المتطلبات قبل تكوين Vertex AI:</p>
<ul>
<li><p><strong>تشغيل الإصدار 2.6 أو أعلى من Milvus</strong> - تحقق من أن عملية النشر تفي بالحد الأدنى من متطلبات الإصدار.</p></li>
<li><p><strong>إنشاء حساب خدمة Google Cloud</strong> - كحد أدنى، ستحتاج على الأرجح إلى أدوار مثل "مستخدم Vertex AI" أو أدوار أخرى أكثر تحديدًا. لمزيد من التفاصيل، راجع <a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">إنشاء حسابات الخدمة</a>.</p></li>
<li><p><strong>قم بتنزيل ملف مفتاح JSON لحساب الخدمة</strong> - قم بتخزين ملف بيانات الاعتماد هذا بشكل آمن على الخادم أو الجهاز المحلي. لمزيد من التفاصيل، راجع <a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">إنشاء مفتاح حساب خدمة</a>.</p></li>
</ul>
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
    </button></h2><p>قبل أن يتمكن Milvus من استدعاء Vertex AI، يحتاج إلى الوصول إلى مفتاح JSON لحساب خدمة GCP الخاص بك. نحن ندعم طريقتين - اختر إحداهما بناءً على احتياجات النشر والتشغيل الخاصة بك.</p>
<table>
   <tr>
     <th><p>الخيار</p></th>
     <th><p>الأولوية</p></th>
     <th><p>الأفضل لـ</p></th>
   </tr>
   <tr>
     <td><p>ملف التكوين (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>عالية</p></td>
     <td><p>إعدادات ثابتة على مستوى المجموعة</p></td>
   </tr>
   <tr>
     <td><p>متغيرات البيئة (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>منخفض</p></td>
     <td><p>سير عمل الحاوية والاختبارات السريعة</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">الخيار 1: ملف التكوين (موصى به وأولوية أعلى)</h3><p>سيفضل Milvus دائمًا بيانات الاعتماد المعلنة في <code translate="no">milvus.yaml</code> على أي متغيرات بيئة لنفس الموفر.</p>
<ol>
<li><p>Base64-encode مفتاح JSON الخاص بك</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بإعلان بيانات الاعتماد في <code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>ربط بيانات الاعتماد بموفر Vertex AI</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>إذا احتجت لاحقًا إلى تدوير المفاتيح، فما عليك سوى تحديث سلسلة Base64 ضمن <code translate="no">credential_json</code> وإعادة تشغيل Milvus - لا يلزم إجراء تغييرات على بيئتك أو حاوياتك.</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">الخيار 2: متغيرات البيئة</h3><p>استخدم هذه الطريقة عندما تفضل حقن الأسرار في وقت النشر. يعود Milvus إلى متغيرات البيئة فقط في حالة عدم وجود إدخال مطابق في <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>تعتمد خطوات التهيئة على وضع نشر Milvus الخاص بك (مستقل مقابل الكتلة الموزعة) ومنصة التنسيق (Docker Compose مقابل Kubernetes).</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<div class="alert note">
<p>للحصول على ملف تهيئة ميلفوس<strong>(docker-compose.yaml</strong>)، راجع <a href="/docs/ar/configure-docker.md#Download-an-installation-file">تنزيل ملف التثبيت</a>.</p>
</div>
<ol>
<li><p><strong>قم بتركيب مفتاحك في الحاوية</strong></p>
<p>قم بتحرير ملف <code translate="no">docker-compose.yaml</code> الخاص بك لتضمين تعيين وحدة تخزين بيانات الاعتماد:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>في التكوين السابق:</p>
<ul>
<li><p>استخدم المسارات المطلقة للوصول الموثوق إلى الملفات (<code translate="no">/home/user/credentials.json</code> وليس <code translate="no">~/credentials.json</code>)</p></li>
<li><p>يجب أن ينتهي مسار الحاوية بامتداد <code translate="no">.json</code> </p></li>
<li><p><code translate="no">:ro</code> تضمن العلامة الوصول للقراءة فقط للأمان</p></li>
</ul></li>
<li><p><strong>تعيين متغير البيئة</strong></p>
<p>في نفس الملف <code translate="no">docker-compose.yaml</code> ، أضف متغير البيئة الذي يشير إلى مسار بيانات الاعتماد:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>تطبيق التغييرات</strong></p>
<p>أعد تشغيل حاوية Milvus لتفعيل التكوين:</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>للحصول على ملف تكوين Milvus<strong>(القيم.yaml</strong>)، راجع <a href="/docs/ar/configure-helm.md#Configure-Milvus-via-configuration-file">تكوين Milvus عبر ملف التكوين</a>.</p>
</div>
<ol>
<li><p><strong>إنشاء سر Kubernetes</strong></p>
<p>قم بتنفيذ ذلك على جهاز التحكم الخاص بك (حيث تم تكوين <strong>kubectl</strong> ):</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>في الأمر السابق</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>: اسم للسر الخاص بك (قابل للتخصيص)</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>: اسم الملف المحلي لملف بيانات اعتماد GCP الخاص بك</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>: مساحة أسماء Kubernetes التي تستضيف Milvus</p></li>
</ul></li>
<li><p><strong>تكوين قيم Helm</strong></p>
<p>قم بتحديث <code translate="no">values.yaml</code> بناءً على نوع النشر الخاص بك:</p>
<ul>
<li><p><strong>للنشر المستقل</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>للنشر الموزع (إضافة إلى كل مكون)</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
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

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><strong>تطبيق تكوين Helm</strong></p>
<p>انشر التكوين المحدث إلى مجموعتك:</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<h2 id="Use-embedding-function" class="common-anchor-header">استخدم وظيفة التضمين<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
     <td><p>بُعد ناقلات تضمين الإخراج. يقبل الأعداد الصحيحة بين 1 و768. <strong>ملاحظة:</strong> إذا تم تحديدها، تأكد من أن بُعد حقل المتجه في المخطط يطابق هذه القيمة.</p></td>
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
