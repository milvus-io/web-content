---
id: embedding-function-overview.md
title: نظرة عامة على وظيفة التضمينCompatible with Milvus 2.6.x
summary: >-
  تتيح لك وحدة «Function» في Milvus تحويل البيانات النصية الأولية إلى تمثيلات
  متجهة من خلال الاستدعاء التلقائي لمزودي خدمات التمثيل الخارجيين (مثل OpenAI
  وAWS Bedrock وGoogle Vertex AI، وغيرها). بفضل وحدة الوظائف، لم تعد بحاجة إلى
  التفاعل يدويًّا مع واجهات برمجة تطبيقات (API) التضمين — حيث يتولى Milvus
  العملية بأكملها المتمثلة في إرسال الطلبات إلى مزودي الخدمة، واستلام التضمينات،
  وتخزينها في مجموعاتك. بالنسبة للبحث الدلالي، ما عليك سوى توفير بيانات
  الاستعلام الأولية، وليس متجه الاستعلام. يقوم Milvus بإنشاء متجه الاستعلام
  باستخدام نفس النموذج الذي استخدمته للاستيعاب، ومقارنته بالمتجهات المخزنة،
  وإرجاع النتائج الأكثر صلة.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">نظرة عامة على وظيفة التضمين<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>تتيح لك وحدة الوظائف في Milvus تحويل البيانات النصية الأولية إلى تضمينات متجهة من خلال الاستدعاء التلقائي لمزودي خدمات التضمين الخارجيين (مثل OpenAI و AWS Bedrock و Google Vertex AI، إلخ). بفضل وحدة الوظائف، لم تعد بحاجة إلى التفاعل يدويًّا مع واجهات برمجة تطبيقات (API) التضمين — حيث يتولى Milvus العملية بأكملها المتمثلة في إرسال الطلبات إلى مزودي الخدمة، واستلام التضمينات، وتخزينها في مجموعاتك. بالنسبة للبحث الدلالي، ما عليك سوى توفير بيانات الاستعلام الأولية، وليس متجه الاستعلام. يقوم Milvus بإنشاء متجه الاستعلام باستخدام نفس النموذج الذي استخدمته للاستيعاب، ومقارنته بالمتجهات المخزنة، وإرجاع النتائج الأكثر صلة.</p>
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
<li><p>يجب أن يحتوي أي حقل إدخال تقوم وحدة Function بتضمينه على قيمة دائمًا؛ فإذا تم توفير قيمة فارغة، فستقوم الوحدة بإصدار خطأ.</p></li>
<li><p>تقوم وحدة Function بمعالجة الحقول المحددة صراحةً في مخطط المجموعة فقط؛ ولا تقوم بإنشاء تضمينات للحقول الديناميكية.</p></li>
<li><p>يجب أن تكون حقول الإدخال المراد تضمينها من النوع « <code translate="no">VARCHAR</code> ».</p></li>
<li><p>يمكن لوحدة «Function» تضمين حقل إدخال إلى:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>لا يتم دعم التحويلات إلى <code translate="no">BINARY_VECTOR</code> أو <code translate="no">FLOAT16_VECTOR</code> أو <code translate="no">BFLOAT16_VECTOR</code>.</p></li>
</ul>
<h2 id="Supported-embedding-service-providers" class="common-anchor-header">مزودي خدمات التضمين المدعومين<button data-href="#Supported-embedding-service-providers" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>المزود</p></th>
     <th><p>النماذج النموذجية</p></th>
     <th><p>نوع التضمين</p></th>
     <th><p>طريقة المصادقة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/openai.md">OpenAI</a></p></td>
     <td><p>text-embedding-3-*</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>مفتاح API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>قائم على النشر</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/yandex-cloud.md">Yandex Cloud</a></p></td>
     <td><p>Yandex Cloud AI Studio نماذج تحويل النص إلى متجهات</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>زوج AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>text-embedding-005</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>بيانات اعتماد حساب خدمة GCP بتنسيق JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3، voyage-lite-02</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>مفتاح API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/hugging-face-tei.md">Hugging Face TEI</a></p></td>
     <td><p>أي نموذج مدعوم بـ TEI</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>مفتاح API اختياري</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/hugging-face.md">Hugging Face</a></p></td>
     <td><p>النماذج المقدمة عبر <code translate="no">hf-inference</code> لاستخراج الميزات</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>مفتاح API</p></td>
   </tr>
</table>
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
    </button></h2><p>يوضح الرسم البياني التالي كيفية عمل الوظيفة في Milvus.</p>
<ol>
<li><p><strong>النص المدخل</strong>: يقوم المستخدمون بإدخال البيانات الأولية (مثل المستندات) إلى Milvus.</p></li>
<li><p><strong>إنشاء التضمينات</strong>: تقوم وحدة الوظيفة داخل Milvus تلقائيًا باستدعاء مزود النموذج المُهيأ لتحويل البيانات الأولية إلى تضمينات متجهة.</p></li>
<li><p><strong>تخزين التضمينات</strong>: يتم تخزين التضمينات الناتجة في حقول متجهة محددة بشكل صريح ضمن مجموعات Milvus.</p></li>
<li><p><strong>نص الاستعلام</strong>: يقوم المستخدمون بإرسال استعلامات نصية إلى Milvus.</p></li>
<li><p><strong>البحث الدلالي</strong>: يقوم Milvus داخليًّا بتحويل الاستعلامات إلى تضمينات متجهة، ويجري عمليات بحث عن التشابه مقابل التضمينات المخزنة، ويسترد النتائج ذات الصلة.</p></li>
<li><p><strong>إرجاع النتائج</strong>: يعرض Milvus النتائج الأكثر مطابقة للتطبيق.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" /> 
   <span>نظرة عامة على وظيفة التضمين</span>
  
 </span></p>
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
    </button></h2><p>قبل استخدام وظيفة التضمين مع Milvus، قم بتكوين بيانات اعتماد خدمة التضمين للوصول إلى Milvus.</p>
<p>يتيح لك Milvus توفير بيانات اعتماد خدمة التضمين بطريقتين:</p>
<ul>
<li><p><strong>ملف التكوين</strong> (<code translate="no">milvus.yaml</code>):</p>
<p>يوضح المثال الوارد في هذا الموضوع <strong>الإعداد الموصى به</strong> باستخدام <code translate="no">milvus.yaml</code>.</p></li>
<li><p><strong>متغيرات البيئة</strong>:</p>
<p>للحصول على تفاصيل حول تكوين بيانات الاعتماد عبر متغيرات البيئة، راجع وثائق مزود خدمة التضمين (على سبيل المثال، <a href="/docs/ar/openai.md">OpenAI</a> أو <a href="/docs/ar/azure-openai.md">Azure OpenAI</a>).</p></li>
</ul>
<p>يوضح الرسم البياني التالي عملية تكوين بيانات الاعتماد عبر ملف تكوين Milvus (<code translate="no">milvus.yaml</code>) ثم استدعاء الوظيفة داخل Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" /> 
   <span>تجاوز تكوين بيانات الاعتماد</span>
  
 </span></p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration-file" class="common-anchor-header">الخطوة 1: إضافة بيانات الاعتماد إلى ملف تكوين Milvus<button data-href="#Step-1-Add-credentials-to-Milvus-configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>في ملف <code translate="no">milvus.yaml</code> الخاص بك، قم بتحرير كتلة <code translate="no">credential</code> بإدخال بيانات لكل مزود تحتاج إلى الوصول إليه:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">الخطوة 2: تكوين إعدادات المزود<button data-href="#Step-2-Configure-provider-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>في ملف التكوين نفسه (<code translate="no">milvus.yaml</code>)، قم بتحرير كتلة <code translate="no">function</code> لإخبار Milvus بالمفتاح الذي يجب استخدامه لتضمين استدعاءات الخدمة:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom url</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom url</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول كيفية تطبيق تكوين Milvus، راجع <a href="/docs/ar/dynamic_config.md">تكوين Milvus أثناء التشغيل</a>.</p>
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
    </button></h2><p>بمجرد تكوين بيانات الاعتماد في ملف تكوين Milvus الخاص بك، اتبع هذه الخطوات لتعريف وظائف التضمين واستخدامها.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">الخطوة 1: تعريف حقول المخطط<button data-href="#Step-1-Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>لاستخدام دالة التضمين، قم بإنشاء مجموعة بمخطط معين. يجب أن يتضمن هذا المخطط ثلاثة حقول أساسية على الأقل:</p>
<ul>
<li><p><strong>الحقل الأساسي</strong> الذي يحدد بشكل فريد كل كيان في المجموعة.</p></li>
<li><p><strong>حقل قياسي</strong> يخزن البيانات الأولية المراد تضمينها.</p></li>
<li><p><strong>حقل متجه</strong> مخصص لتخزين التضمينات المتجهة التي ستولدها الدالة للحقل القياسي.</p></li>
</ul>
<p>يحدد المثال التالي مخططًا يحتوي على حقل قياسي واحد <code translate="no">&quot;document&quot;</code> لتخزين البيانات النصية وحقل متجه واحد <code translate="no">&quot;dense&quot;</code> لتخزين التضمينات التي ستولدها وحدة الوظيفة. تذكر ضبط بُعد المتجه (<code translate="no">dim</code>) ليتوافق مع مخرجات نموذج التضمين الذي اخترته.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Create a new schema for the collection</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// Add primary field &quot;id&quot;</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

<span class="hljs-comment">// Add scalar field &quot;document&quot; for storing textual data</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">9000</span>)
        .build());

<span class="hljs-comment">// Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment">// IMPORTANT: Set dimension to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment">// For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment">// For dense vector, data type can be FloatVector or Int8Vector</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">1536</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Define the fields of the collection schema</span>
<span class="hljs-keyword">const</span> schema = [
    <span class="hljs-comment">// Primary field &quot;id&quot;</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    <span class="hljs-comment">// Scalar field &quot;document&quot; for storing textual data</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">9000</span>,
    },
    <span class="hljs-comment">// Vector field &quot;dense&quot; for storing embeddings.</span>
    <span class="hljs-comment">// IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
    <span class="hljs-comment">// For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
    <span class="hljs-comment">// For dense vector, data type can be FloatVector or Int8Vector</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">1536</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;demo&quot;</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">9000</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;dense&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">1536</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 9000
            }
        },
        {
            &quot;fieldName&quot;: &quot;dense&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 1536
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">الخطوة 2: إضافة وظيفة التضمين إلى المخطط<button data-href="#Step-2-Add-embedding-function-to-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>تقوم وحدة Function في Milvus تلقائيًا بتحويل البيانات الأولية المخزنة في حقل قياسي إلى تضمينات وتخزينها في الحقل المتجه المحدد صراحةً.</p>
<p>يضيف المثال أدناه وحدة «Function» (<code translate="no">openai_embedding</code>) التي تحول الحقل القياسي <code translate="no">&quot;document&quot;</code> إلى تضمينات، وتخزن المتجهات الناتجة في حقل المتجهات <code translate="no">&quot;dense&quot;</code> المحدد مسبقًا.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                  <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING, <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],           <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],             <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                  <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                 <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,            # Optional: Credential label</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,       # Optionally shorten the vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;    # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-comment">// Define embedding function (example: OpenAI provider)</span>
<span class="hljs-type">Function</span> <span class="hljs-variable">textEmbeddingFunction</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;openai_embedding&quot;</span>)                                <span class="hljs-comment">// Unique identifier for this embedding function</span>
        .functionType(FunctionType.TEXTEMBEDDING)                <span class="hljs-comment">// Type of embedding function</span>
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))  <span class="hljs-comment">// Scalar field to embed</span>
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;dense&quot;</span>))    <span class="hljs-comment">// Vector field to store embeddings</span>
        <span class="hljs-comment">// Provider-specific configuration (highest priority)</span>
        .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;openai&quot;</span>)                             <span class="hljs-comment">// Embedding model provider</span>
        .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)           <span class="hljs-comment">// Embedding model</span>
        <span class="hljs-comment">// .param(&quot;credential&quot;, &quot;apikey1&quot;)                       // Optional: Credential label</span>
        <span class="hljs-comment">// Optional parameters:</span>
        <span class="hljs-comment">// .param(&quot;dim&quot;, &quot;1536&quot;)                                 // Optionally shorten the vector dimension</span>
        <span class="hljs-comment">// .param(&quot;user&quot;, &quot;user123&quot;)                             // Optional: identifier for API tracking</span>
        .build();

<span class="hljs-comment">// Add the embedding function to your schema</span>
schema.addFunction(textEmbeddingFunction);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Define embedding function (example: OpenAI provider)</span>
<span class="hljs-comment">// Pass these functions to createCollection() together with the schema fields</span>
<span class="hljs-keyword">const</span> functions = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;openai_embedding&quot;</span>,                 <span class="hljs-comment">// Unique identifier for this embedding function</span>
        <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">TEXTEMBEDDING</span>,         <span class="hljs-comment">// Type of embedding function</span>
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;document&quot;</span>],          <span class="hljs-comment">// Scalar field to embed</span>
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;dense&quot;</span>],            <span class="hljs-comment">// Vector field to store embeddings</span>
        <span class="hljs-attr">params</span>: {                                 <span class="hljs-comment">// Provider-specific configuration (highest priority)</span>
            <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;openai&quot;</span>,                   <span class="hljs-comment">// Embedding model provider</span>
            <span class="hljs-attr">model_name</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>, <span class="hljs-comment">// Embedding model</span>
            <span class="hljs-comment">// credential: &quot;apikey1&quot;,             // Optional: Credential label</span>
            <span class="hljs-comment">// Optional parameters:</span>
            <span class="hljs-comment">// dim: &quot;1536&quot;,                       // Optionally shorten the vector dimension</span>
            <span class="hljs-comment">// user: &quot;user123&quot;,                   // Optional: identifier for API tracking</span>
        },
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

embeddingFunction := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;openai_embedding&quot;</span>).
    WithType(entity.FunctionTypeTextEmbedding).
    WithInputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;dense&quot;</span>).
    WithParam(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;openai&quot;</span>).
    WithParam(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)

schema.WithFunction(embeddingFunction)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> embeddingFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;openai_embedding&quot;,
    &quot;type&quot;: &quot;TextEmbedding&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document&quot;
    ],
    &quot;outputFieldNames&quot;: [
        &quot;dense&quot;
    ],
    &quot;params&quot;: {
        &quot;provider&quot;: &quot;openai&quot;,
        &quot;model_name&quot;: &quot;text-embedding-3-small&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>قيمة المثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>المعرف الفريد لوظيفة التضمين داخل Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نوع الدالة المستخدمة. لتضمين النص، اضبط القيمة على <code translate="no">FunctionType.TEXTEMBEDDING</code>.</p><p><strong>ملاحظة</strong>: يقبل Milvus القيمتين <code translate="no">FunctionType.BM25</code> (لتحويل التضمين المتفرق) و <code translate="no">FunctionType.RERANK</code> (لإعادة الترتيب) لهذه المعلمة. راجع " <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a> " و" <a href="/docs/ar/decay-ranker-overview.md">نظرة عامة على Decay Ranker</a> " للحصول على التفاصيل.</p></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>حقل عددي يحتوي على البيانات الأولية المراد تضمينها. حاليًا، لا تقبل هذه المعلمة سوى اسم حقل واحد.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>حقل متجه لتخزين عمليات التضمين التي تم إنشاؤها. حاليًا، لا تقبل هذه المعلمة سوى اسم حقل واحد.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>قاموس يحتوي على تكوينات التضمين. ملاحظة: تختلف المعلمات الموجودة ضمن " <code translate="no">params</code> " (تكوينات التضمين) باختلاف مزودي نماذج التضمين.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>مزود نموذج التضمين.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>يحدد نموذج التضمين المطلوب استخدامه.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>تسمية بيانات الاعتماد المحددة في قسم المستوى الأعلى لـ <code translate="no">credential:</code> في <code translate="no">milvus.yaml</code>. </p><ul><li><p>عند توفيرها، يسترد Milvus زوج المفاتيح المطابق أو رمز API ويوقع الطلب من جانب الخادم.</p></li><li><p>عند حذفه (<code translate="no">None</code>)، يلجأ Milvus إلى بيانات الاعتماد التي تم تكوينها صراحةً لمزود النموذج المستهدف في <code translate="no">milvus.yaml</code>.</p></li><li><p>إذا كانت التسمية غير معروفة أو كان المفتاح المشار إليه مفقودًا، يفشل الاستدعاء.</p></li></ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>عدد أبعاد التضمينات الناتجة. بالنسبة لنماذج OpenAI من الجيل الثالث، يمكنك تقصير المتجه الكامل لتقليل التكلفة وزمن الاستجابة دون فقدان كبير للمعلومات الدلالية. لمزيد من المعلومات، راجع <a href="https://openai.com/blog/new-embedding-models-and-api-updates">منشور مدونة إعلان OpenAI</a>.</p><p><strong>ملاحظة:</strong> إذا قمت بتقصير بُعد المتجه، فتأكد من أن قيمة « <code translate="no">dim</code> » المحددة في طريقة « <code translate="no">add_field</code> » الخاصة بالمخطط لحقل المتجه تتطابق مع البُعد النهائي للإخراج الخاص بوظيفة التضمين الخاصة بك.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>معرف على مستوى المستخدم لتتبع استخدام واجهة برمجة التطبيقات (API).</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>بالنسبة للمجموعات التي تحتوي على حقول عددية متعددة تتطلب تحويل النص إلى متجه، أضف دوال منفصلة إلى مخطط المجموعة، مع التأكد من أن كل دالة لها اسم فريد وقيمة <code translate="no">output_field_names</code>.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">الخطوة 3: تكوين الفهرس<button data-href="#Step-3-Configure-index" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تعريف المخطط بالحقول الضرورية والدالة المدمجة، قم بإعداد الفهرس لمجموعتك. لتبسيط هذه العملية، استخدم <code translate="no">AUTOINDEX</code> كـ <code translate="no">index_type</code> ، وهو خيار يسمح لـ Milvus باختيار وتكوين نوع الفهرس الأنسب بناءً على بنية بياناتك.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// Prepare index parameters</span>
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-comment">// Add AUTOINDEX to automatically select optimal indexing method</span>
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Prepare index parameters</span>
<span class="hljs-comment">// Add AUTOINDEX to automatically select optimal indexing method</span>
<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">COSINE</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;demo&quot;</span>, <span class="hljs-string">&quot;dense&quot;</span>, index.NewAutoIndex(entity.COSINE))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;dense&quot;,
        &quot;indexName&quot;: &quot;dense&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;
    }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">الخطوة 4: إنشاء المجموعة<button data-href="#Step-4-Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>الآن قم بإنشاء المجموعة باستخدام معلمات المخطط والفهرس المحددة.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create collection named &quot;demo&quot;</span>
client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create collection named &quot;demo&quot;</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">functions</span>: functions,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

request=$(jq -n --argjson schema <span class="hljs-string">&quot;<span class="hljs-variable">$schema</span>&quot;</span> --argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$embeddingFunction</span>&quot;</span> --argjson indexParams <span class="hljs-string">&quot;<span class="hljs-variable">$indexParams</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;demo&quot;,
    schema: ($schema + {functions: [$fn]}),
    indexParams: $indexParams
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">الخطوة 5: إدراج البيانات<button data-href="#Step-5-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد إعداد المجموعة والفهرس، تكون جاهزًا لإدراج البيانات الأولية. في هذه العملية، ما عليك سوى توفير النص الأولي. تقوم وحدة الوظائف التي حددناها سابقًا تلقائيًا بإنشاء المتجه المتفرق المقابل لكل إدخال نصي.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;document\&quot;: \&quot;Milvus simplifies semantic search through embeddings.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;document\&quot;: \&quot;Vector embeddings convert text into searchable numeric data.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;document\&quot;: \&quot;Semantic search helps users find relevant information quickly.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [
        { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span> },
    ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;demo&quot;</span>).
    WithColumns(
        column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>}),
        column.NewColumnVarChar(<span class="hljs-string">&quot;document&quot;</span>, []<span class="hljs-type">string</span>{
            <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
            <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
            <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        }),
    ))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;document&quot;: &quot;Milvus simplifies semantic search through embeddings.&quot;},
        {&quot;id&quot;: 2, &quot;document&quot;: &quot;Vector embeddings convert text into searchable numeric data.&quot;},
        {&quot;id&quot;: 3, &quot;document&quot;: &quot;Semantic search helps users find relevant information quickly.&quot;}
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">الخطوة 6: إجراء البحث المتجهي<button data-href="#Step-6-Perform-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد إدخال البيانات، قم بإجراء بحث دلالي باستخدام نص الاستعلام الخام. يقوم Milvus تلقائيًا بتحويل استعلامك إلى متجه تضمين، واسترجاع المستندات ذات الصلة بناءً على التشابه، وإرجاع النتائج الأكثر مطابقة.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Perform semantic search</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>))) <span class="hljs-comment">// Use text query rather than query vector</span>
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)   <span class="hljs-comment">// Use the vector field that stores embeddings</span>
        .limit(<span class="hljs-number">1</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .build());

System.out.println(results.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Perform semantic search</span>
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>], <span class="hljs-comment">// Use text query rather than query vector</span>
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,   <span class="hljs-comment">// Use the vector field that stores embeddings</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, rs := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, rs.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, rs.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [&quot;How does Milvus handle semantic search?&quot;],
    &quot;annsField&quot;: &quot;dense&quot;,
    &quot;limit&quot;: 1,
    &quot;outputFields&quot;: [&quot;document&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول عمليات البحث والاستعلام، راجع <a href="/docs/ar/single-vector-search.md">«البحث</a> <a href="/docs/ar/get-and-scalar-query.md">والاستعلام</a> <a href="/docs/ar/single-vector-search.md">الأساسي بالمتجهات</a> ».</p>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="common-anchor-header">ما الفرق بين تكوين بيانات الاعتماد في ملف milvus.yaml ومتغيرات البيئة؟<button data-href="#Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="anchor-icon" translate="no">
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
    </button></h3><p>تعمل كلتا الطريقتين، ولكن يُنصح باستخدام ملف « <code translate="no">milvus.yaml</code> » لأنه يوفر إدارة مركزية لبيانات الاعتماد وتسمية متسقة لبيانات الاعتماد عبر جميع مزودي الخدمة. عند استخدام متغيرات البيئة، تختلف أسماء المتغيرات اعتمادًا على مزود خدمة التضمين، لذا يرجى الرجوع إلى الصفحة المخصصة لكل مزود لفهم أسماء متغيرات البيئة المحددة المطلوبة (على سبيل المثال، <a href="/docs/ar/openai.md">OpenAI</a> أو <a href="/docs/ar/azure-openai.md">Azure OpenAI</a>).</p>
<h3 id="What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="common-anchor-header">ماذا يحدث إذا لم أحدد معلمة بيانات الاعتماد في تعريف الدالة؟<button data-href="#What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="anchor-icon" translate="no">
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
    </button></h3><p>يتبع Milvus ترتيب تحديد بيانات الاعتماد التالي:</p>
<ol>
<li>أولاً، يبحث عن بيانات الاعتماد الافتراضية التي تم تكوينها لهذا المزود في ملف <code translate="no">milvus.yaml</code> </li>
<li>إذا لم تكن هناك بيانات اعتماد افتراضية في ملف milvus.yaml، فإنه يلجأ إلى متغيرات البيئة (إذا تم تكوينها)</li>
<li>إذا لم يتم تكوين بيانات اعتماد <code translate="no">milvus.yaml</code> ولا متغيرات البيئة، فسيصدر Milvus خطأً</li>
</ol>
<h3 id="How-can-I-verify-that-embeddings-are-being-generated-correctly" class="common-anchor-header">كيف يمكنني التحقق من أن عمليات التضمين يتم إنشاؤها بشكل صحيح؟<button data-href="#How-can-I-verify-that-embeddings-are-being-generated-correctly" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك التحقق من ذلك عن طريق:</p>
<ol>
<li>الاستعلام عن مجموعتك بعد الإدراج لمعرفة ما إذا كان حقل المتجهات يحتوي على بيانات</li>
<li>التحقق من أن طول حقل المتجهات يتطابق مع الأبعاد المتوقعة</li>
<li>إجراء بحث بسيط عن التشابه للتحقق من أن التضمينات تنتج نتائج ذات مغزى</li>
</ol>
<h3 id="When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="common-anchor-header">عند إجراء بحث عن التشابه، هل يمكنني استخدام متجه استعلام بدلاً من النص الخام؟<button data-href="#When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم، يمكنك استخدام متجهات الاستعلام المحسوبة مسبقًا بدلاً من النص الخام لإجراء بحث التشابه. في حين أن وحدة الوظيفة (Function module) تقوم تلقائيًا بتحويل استعلامات النص الخام إلى تضمينات، يمكنك أيضًا توفير بيانات متجهة مباشرةً إلى المعلمة " <code translate="no">data</code> " في عملية البحث الخاصة بك. <strong>ملاحظة</strong>: يجب أن يكون حجم أبعاد متجه الاستعلام الذي قدمته متسقًا مع حجم أبعاد التضمينات المتجهة التي أنشأتها وحدة الوظائف الخاصة بك.</p>
<p><strong>مثال</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using raw text (Function module converts automatically)</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)

<span class="hljs-comment"># Using pre-computed query vector (must match stored vector dimensions)</span>
query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, ...]  <span class="hljs-comment"># Must be same dimension as stored embeddings</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[query_vector],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Using raw text (Function module converts automatically)</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">textResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">1</span>)
        .build());

<span class="hljs-comment">// Using pre-computed query vector (must match stored vector dimensions)</span>
<span class="hljs-type">float</span>[] queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span> <span class="hljs-comment">/* ... */</span>};  <span class="hljs-comment">// Must be same dimension as stored embeddings</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">vectorResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryVector)))
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">1</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Using raw text (Function module converts automatically)</span>
<span class="hljs-keyword">const</span> textResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
});

<span class="hljs-comment">// Using pre-computed query vector (must match stored vector dimensions)</span>
<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span> <span class="hljs-comment">/* ... */</span>];  <span class="hljs-comment">// Must be same dimension as stored embeddings</span>
<span class="hljs-keyword">const</span> vectorResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Raw text: the embedding function converts the query automatically</span>
textResults, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-comment">// Pre-computed vector: yourQueryVector must have the same dimension as the stored embeddings</span>
vectorResults, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.FloatVector(yourQueryVector)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Println(textResults, vectorResults)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Raw text: the embedding function converts the query automatically</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [&quot;How does Milvus handle semantic search?&quot;],
    &quot;annsField&quot;: &quot;dense&quot;,
    &quot;limit&quot;: 1
}&#x27;</span>

<span class="hljs-comment"># Pre-computed vector: QUERY_VECTOR is a JSON array with the same dimension as the stored embeddings</span>
request=$(jq -n --argjson vec <span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;demo&quot;,
    data: [$vec],
    annsField: &quot;dense&quot;,
    limit: 1
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
