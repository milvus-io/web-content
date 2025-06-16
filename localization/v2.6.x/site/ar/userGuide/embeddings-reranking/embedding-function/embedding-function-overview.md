---
id: embedding-function-overview.md
title: نظرة عامة على وظيفة التضمينCompatible with Milvus 2.6.x
summary: >-
  تسمح لك وحدة الوظيفة في Milvus بتحويل البيانات النصية الخام إلى تضمينات متجهة
  عن طريق الاتصال تلقائيًا بموفري النماذج الخارجية (مثل OpenAI و AWS Bedrock و
  Google Vertex AI، إلخ). باستخدام الوحدة النمطية Function، لم تعد بحاجة إلى
  التفاعل يدويًا مع واجهات برمجة تطبيقات التضمين - حيث تتولى Milvus العملية
  الكاملة لإرسال الطلبات إلى المزودين واستلام التضمينات وتخزينها في مجموعاتك.
  بالنسبة للبحث الدلالي، تحتاج إلى توفير بيانات الاستعلام الأولية فقط، وليس متجه
  الاستعلام. ينشئ Milvus متجه الاستعلام بنفس النموذج الذي استخدمته في الاستيعاب،
  ويقارنه بالمتجهات المخزنة، ويعيد النتائج الأكثر صلة.
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
    </button></h1><p>تسمح لك وحدة الدالة في Milvus بتحويل البيانات النصية الخام إلى تضمينات متجهة عن طريق الاتصال تلقائيًا بموفري النماذج الخارجية (مثل OpenAI و AWS Bedrock و Google Vertex AI، إلخ). باستخدام الوحدة النمطية Function، لم تعد بحاجة إلى التفاعل يدويًا مع واجهات برمجة تطبيقات التضمين - حيث تتولى Milvus العملية الكاملة لإرسال الطلبات إلى المزودين واستلام التضمينات وتخزينها في مجموعاتك. بالنسبة للبحث الدلالي، تحتاج إلى توفير بيانات الاستعلام الأولية فقط، وليس متجه الاستعلام. ينشئ Milvus متجه الاستعلام بنفس النموذج الذي استخدمته في الاستيعاب، ويقارنه بالمتجهات المخزنة، ويعيد النتائج الأكثر صلة.</p>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>يجب أن يحتوي أي حقل إدخال تقوم الوحدة النمطية "الدالة" بتضمينه على قيمة دائمًا؛ إذا تم توفير حقل فارغ، فستعرض الوحدة النمطية خطأ.</p></li>
<li><p>تعالج الوحدة النمطية الدالة فقط الحقول التي تم تعريفها صراحةً في مخطط المجموعة؛ فهي لا تنشئ تضمينات للحقول الديناميكية.</p></li>
<li><p>يجب أن تكون حقول الإدخال المراد تضمينها من النوع <code translate="no">VARCHAR</code>.</p></li>
<li><p>يمكن للوحدة النمطية الدالة تضمين حقل الإدخال إلى:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>لا يتم دعم التحويلات إلى <code translate="no">BINARY_VECTOR</code> أو <code translate="no">FLOAT16_VECTOR</code> أو <code translate="no">BFLOAT16_VECTOR</code>.</p></li>
</ul>
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
    </button></h2><p>تقوم الوحدة النمطية الدالة بتحويل النص الخام إلى تضمينات متجهة عن طريق استدعاء موفر نموذج خارجي من اختيارك. يدعم الموفرون المختلفون نماذج وتنسيقات تضمين وطرق مصادقة مختلفة، وكلها ملخصة أدناه.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">موفرو النماذج المدعومون</h3><table>
   <tr>
     <th><p>المزود</p></th>
     <th><p>النماذج النموذجية</p></th>
     <th><p>نوع التضمين</p></th>
     <th><p>طريقة المصادقة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/openai.md">OpenAI</a></p></td>
     <td><p>تضمين النص-3-*</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>قائم على النشر</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/dashscope.md">داش سكوب</a></p></td>
     <td><p>تضمين النص-تضمين النص-ف3</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>مفتاح API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/bedrock.md">بيدروك</a></p></td>
     <td><p>أمازون.تيتان-تضمين النص-ف2</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>زوج AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/vertex-ai.md">فيرتكس AI</a></p></td>
     <td><p>تضمين النص-005</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>خدمة حساب خدمة GCP JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/voyage-ai.md">رحلة AI</a></p></td>
     <td><p>رحلة - 3، رحلة-لايت - 02</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/cohere.md">كوهير</a></p></td>
     <td><p>تضمين-english-v3.0</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>مفتاح واجهة برمجة التطبيقات</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/siliconflow.md">سيليكونفلو</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>مفتاح API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/hugging-face-tei.md">وجه المعانقة</a></p></td>
     <td><p>أي نموذج مخدوم من TEI</p></td>
     <td><p>كثيف (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>مفتاح API اختياري</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">سير العمل</h3><p>يوضح الرسم البياني التالي كيفية عمل الوظيفة في ميلفوس.</p>
<ol>
<li><p><strong>إدخال النص</strong>: يُدخل المستخدمون البيانات الأولية (مثل المستندات) في ملفوس.</p></li>
<li><p><strong>توليد التضمينات</strong>: تستدعي وحدة الدالة داخل ميلفوس تلقائيًا موفر النموذج المهيأ لتحويل البيانات الأولية إلى تضمينات متجهة.</p></li>
<li><p><strong>تخزين التضمينات</strong>: يتم تخزين التضمينات الناتجة في حقول متجهية محددة بشكل صريح ضمن مجموعات Milvus.</p></li>
<li><p><strong>نص الاستعلام</strong>: يرسل المستخدمون استعلامات نصية إلى ميلفوس.</p></li>
<li><p><strong>البحث الدلالي</strong>: يقوم ميلفوس بتحويل الاستعلامات داخليًا إلى تضمينات متجهة، ويجري عمليات بحث عن التشابه مقابل التضمينات المخزنة، ويسترجع النتائج ذات الصلة.</p></li>
<li><p><strong>إرجاع النتائج</strong>: يقوم ميلفوس بإرجاع أفضل النتائج المطابقة إلى التطبيق.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>نظرة عامة على وظيفة التضمين</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">إدارة بيانات الاعتماد</h3><p>يتطلب الاتصال بواجهات برمجة تطبيقات التضمين الخارجية بيانات اعتماد المصادقة (مفاتيح واجهة برمجة التطبيقات أو أزواج مفاتيح الوصول/السر). يؤدي تعريض بيانات الاعتماد هذه في رمز التطبيق الخاص بك إلى مخاطر أمنية. يحل Milvus هذه المشكلة عن طريق تخزين بيانات الاعتماد بشكل آمن في ملف تكوين Milvus (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>أضف بيانات الاعتماد</strong>: تحت كتلة المستوى الأعلى <code translate="no">credential:</code> ، امنح كل بيانات اعتماد تسمية فريدة؛ ثم أشر إلى تلك التسمية في كتلة <code translate="no">function:</code>.</p></li>
<li><p><strong>يقوم الخادم بتحميل التكوين</strong>: يقرأ Milvus ملف YAML، ويخزن المفاتيح الأولية في الذاكرة مؤقتًا، ويتذكر تسمياتها فقط (على سبيل المثال <code translate="no">apikey1</code>).</p></li>
<li><p><strong>استدعاء الدالة</strong>: حدد اختياريًا الوسيطة <code translate="no">credential</code>.</p>
<ul>
<li><p>إذا قمت بتزويد اسم بيانات الاعتماد مع تعريف الدالة، يستخدم ميلفوس بيانات الاعتماد المحددة.</p></li>
<li><p>إذا قمت بحذف الوسيطة، يعود ميلفوس تلقائيًا إلى بيانات الاعتماد التي تم تكوينها لمزود النموذج هذا في <code translate="no">milvus.yaml</code>.</p>
<p>في كلتا الحالتين، لا يغادر المفتاح السري الخادم أبدًا.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>تجاوز تكوين بيانات الاعتماد</span> </span></p>
<div class="alert note">
<p>إذا قمت بنشر Milvus مع Docker Compose، يمكنك أيضًا حقن نفس الحقول من خلال متغيرات البيئة. ارجع إلى الأدلة الخاصة بالموفر للحصول على أسماء المتغيرات الدقيقة.</p>
</div>
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
    </button></h2><p>قبل استخدام وظيفة التضمين مع Milvus، قم بتكوين بيانات اعتماد الوصول.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">الخطوة 1: إضافة بيانات الاعتماد إلى تكوين Milvus</h3><p>في ملف <code translate="no">milvus.yaml</code> الخاص بك، قم بتحرير الكتلة <code translate="no">credential</code> مع إدخالات لكل موفر تحتاج إلى الوصول إليه:</p>
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
<table>
   <tr>
     <th><p>نوع الموفر</p></th>
     <th><p>الحقول المطلوبة</p></th>
     <th><p>مثال على التكوين</p></th>
   </tr>
   <tr>
     <td><p>زوج AK/SK (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>يستند إلى مفتاح API (OpenAI، Voyage AI، إلخ.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>JSON لحساب خدمة GCP (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">الخطوة 2: تكوين إعدادات الموفر</h3><p>في ملف التكوين نفسه، قم بتحرير المكوِّن <code translate="no">function</code> لإخبار Milvus بالمفتاح الذي يجب استخدامه لتضمين استدعاءات الخدمة:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول كيفية تطبيق تكوين Milvus، راجع <a href="/docs/ar/dynamic_config.md">تكوين Milvus أثناء التنقل</a>.</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">الخطوة 2: إضافة دالة التضمين إلى المخطط</h3><p>تقوم الوحدة النمطية الدالة في ميلفوس تلقائيًا بتحويل البيانات الأولية المخزنة في حقل قياسي إلى تضمينات وتخزينها في حقل متجه محدد بشكل صريح.</p>
<p>يضيف المثال أدناه وحدة الدالة النمطية (<code translate="no">openai_embedding</code>) التي تحول الحقل القياسي <code translate="no">&quot;document&quot;</code> إلى تضمينات، وتخزين المتجهات الناتجة في الحقل المتجه <code translate="no">&quot;dense&quot;</code> المحدد مسبقًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>قيمة المثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>المعرف الفريد لدالة التضمين داخل ميلفوس.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نوع دالة التضمين المستخدمة. القيم الممكنة:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: توليد متجهات كثيفة تلتقط المعنى الدلالي داخل النص.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: توليد متجهات متناثرة استنادًا إلى خوارزمية الترتيب BM25، والتي تحسب درجات الصلة باستخدام تكرار المصطلح وتكرار المستند العكسي. لمزيد من المعلومات، راجع <a href="/docs/ar/full-text-search.md">البحث في النص الكامل</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>الحقل العددي الذي يحتوي على البيانات الأولية المراد تضمينها. تقبل هذه المعلمة حاليًا اسم حقل واحد فقط.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>حقل متجه لتخزين التضمينات التي تم إنشاؤها. تقبل هذه المعلمة حالياً اسم حقل واحد فقط.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>قاموس يحتوي على تكوينات التضمين. ملاحظة: تختلف المعلمات داخل <code translate="no">params</code> اعتماداً على موفري نماذج التضمين.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>موفر نموذج التضمين.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>يحدد نموذج التضمين المراد استخدامه.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>تسمية بيانات الاعتماد المحددة في قسم المستوى الأعلى <code translate="no">credential:</code> من <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>عند توفيره، يسترد Milvus زوج المفاتيح المطابق أو رمز واجهة برمجة التطبيقات المطابق ويوقع الطلب من جانب الخادم.</p></li>
<li><p>عند حذفها (<code translate="no">None</code>)، يعود ميلفوس إلى بيانات الاعتماد التي تم تكوينها صراحةً لمزود النموذج الهدف في <code translate="no">milvus.yaml</code>.</p></li>
<li><p>إذا كانت التسمية غير معروفة أو كان المفتاح المشار إليه مفقودًا، يفشل الاستدعاء.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>عدد الأبعاد لتضمينات الإخراج. بالنسبة لنماذج الجيل الثالث من OpenAI، يمكنك اختصار المتجه الكامل لتقليل التكلفة والكمون دون خسارة كبيرة في المعلومات الدلالية. لمزيد من المعلومات، راجع <a href="https://openai.com/blog/new-embedding-models-and-api-updates">منشور مدونة إعلان OpenAI</a>. <strong>ملاحظة:</strong> إذا قمت بتقصير بُعد المتجه، تأكد من أن القيمة <code translate="no">dim</code> المحددة في طريقة <code translate="no">add_field</code> للمخطط لحقل المتجه تتطابق مع بُعد الإخراج النهائي لدالة التضمين الخاصة بك.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>معرّف على مستوى المستخدم لتتبع استخدام واجهة برمجة التطبيقات.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>بالنسبة للمجموعات التي تحتوي على حقول قياسية متعددة تتطلب تحويل النص إلى متجه، أضف دوال منفصلة إلى مخطط المجموعة، وتأكد من أن كل دالة لها اسم فريد وقيمة <code translate="no">output_field_names</code>.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">الخطوة 3: تكوين الفهرس</h3><p>بعد تحديد المخطط مع الحقول الضرورية والدالة المدمجة، قم بإعداد الفهرس لمجموعتك. لتبسيط هذه العملية، استخدم <code translate="no">AUTOINDEX</code> كـ <code translate="no">index_type</code> ، وهو خيار يسمح لـ Milvus باختيار وتكوين نوع الفهرس الأنسب بناءً على بنية بياناتك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">الخطوة 4: إنشاء مجموعة</h3><p>الآن قم بإنشاء المجموعة باستخدام المخطط ومعلمات الفهرس المحددة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">الخطوة 5: إدراج البيانات</h3><p>بعد إعداد المجموعة والفهرس الخاص بك، تكون جاهزًا لإدراج بياناتك الأولية. في هذه العملية، تحتاج فقط إلى توفير النص الخام. تقوم وحدة الدالة التي حددناها سابقًا بإنشاء المتجه المتناثر المقابل تلقائيًا لكل إدخال نصي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">الخطوة 6: إجراء بحث المتجه</h3><p>بعد إدراج البيانات، قم بإجراء بحث دلالي باستخدام نص الاستعلام الخام. يقوم Milvus تلقائيًا بتحويل استعلامك إلى متجه تضمين تلقائيًا، ويسترجع المستندات ذات الصلة بناءً على التشابه، ويعيد النتائج الأكثر مطابقة.</p>
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
<p>لمزيد من المعلومات حول عمليات البحث والاستعلام، راجع <a href="/docs/ar/single-vector-search.md">البحث المتجه الأساسي</a> <a href="/docs/ar/get-and-scalar-query.md">والاستعلام</a>.</p>
