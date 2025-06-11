---
id: hugging-face-tei.md
title: عناق الوجه TEICompatible with Milvus 2.6.x
summary: >-
  يُعدّ Hugging Face Inclusioning Text Embedddings Inference (TEI) خادم استدلال
  عالي الأداء مصمم خصيصًا لنماذج تضمين النصوص. يشرح هذا الدليل كيفية استخدام
  Hugging Face TEI مع Milvus لتوليد تضمين النص بكفاءة.
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">عناق الوجه TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>إن Hugging Face <a href="https://huggingface.co/docs/text-embeddings-inference/en/index">Inclusion Inclusion Inclusion (TEI)</a> هو خادم استدلال عالي الأداء مصمم خصيصًا لنماذج تضمين النصوص. يشرح هذا الدليل كيفية استخدام Hugging Face TEI مع Milvus لتوليد تضمين نصي فعال.</p>
<p>تعمل TEI مع العديد من نماذج تضمين النصوص من Hugging Face Hub، بما في ذلك:</p>
<ul>
<li><p>سلسلة BAAI/bge-*</p></li>
<li><p>سلسلة محولات الجملة/*</p></li>
<li><p>نماذج E5</p></li>
<li><p>نماذج GTE</p></li>
<li><p>وغيرها الكثير</p></li>
</ul>
<div class="alert note">
<p>للحصول على أحدث قائمة من النماذج المدعومة، راجع <a href="https://github.com/huggingface/text-embeddings-inference">مستودع TEI GitHub ومستودع TEI GitHub</a> و <a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hub</a>.</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">نشر TEI<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تكوين Milvus مع وظيفة TEI، يجب أن يكون لديك خدمة TEI قيد التشغيل. يدعم ميلفوس طريقتين لنشر TEI:</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">النشر القياسي (خارجي)</h3><p>يمكنك نشر TEI كخدمة مستقلة باستخدام الطرق الرسمية من Hugging Face. يمنحك هذا الأسلوب أقصى قدر من المرونة والتحكم في خدمة TEI الخاصة بك.</p>
<p>للحصول على إرشادات مفصلة حول نشر TEI باستخدام Docker أو طرق أخرى، راجع <a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">الوثائق الرسمية لـ Hugging Face Text Embedddings Inference</a>.</p>
<p>بعد النشر، قم بتدوين نقطة نهاية خدمة TEI الخاصة بك (على سبيل المثال، <code translate="no">http://localhost:8080</code>) حيث ستحتاج إليها عند <a href="/docs/ar/hugging-face-tei.md#Use-embedding-function-">استخدام وظيفة TEI في Milvus</a>.</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">نشر مخطط Milvus Helm البياني (متكامل)</h3><p>بالنسبة لبيئات Kubernetes، تقدم Milvus خيار النشر المتكامل من خلال مخطط Helm. هذا يبسط العملية عن طريق نشر وتكوين TEI جنبًا إلى جنب مع Milvus.</p>
<p>لتمكين TEI في نشر Milvus Helm الخاص بك:</p>
<ol>
<li><p>تكوين <strong>القيم.yaml</strong> لتمكين TEI:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>نشر أو ترقية Milvus:</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>عند استخدام نشر مخطط Helm، سيتم الوصول إلى خدمة TEI داخل مجموعة Kubernetes الخاصة بك على <code translate="no">http://my-release-milvus-tei:80</code> (باستخدام اسم الإصدار الخاص بك). استخدم هذا كنقطة نهاية في تكوين وظيفة TEI.</p>
<p></div></p></li>
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
    </button></h2><p>بعد نشر خدمة TEI الخاصة بك، ستحتاج إلى توفير نقطة النهاية الخاصة بها عند تحديد دالة تضمين TEI. في معظم الحالات، لا يلزم إجراء أي تكوين إضافي حيث يتم تمكين TEI افتراضيًا في Milvus.</p>
<p>ومع ذلك، إذا تم نشر خدمة TEI الخاصة بك مع مصادقة مفتاح واجهة برمجة التطبيقات (<code translate="no">--api-key</code> )، فستحتاج إلى تكوين Milvus لاستخدام هذا المفتاح:</p>
<ol>
<li><p><strong>حدد مفاتيح واجهة برمجة التطبيقات في قسم <code translate="no">credential</code>:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>قم بالإشارة إلى بيانات الاعتماد في milvus.yaml:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>بمجرد تكوين خدمة TEI، اتبع هذه الخطوات لتعريف دوال التضمين واستخدامها.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">الخطوة 1: تحديد حقول المخطط</h3><p>لاستخدام دالة التضمين، قم بإنشاء مجموعة بمخطط محدد. يجب أن يتضمن هذا المخطط ثلاثة حقول ضرورية على الأقل:</p>
<ul>
<li><p>الحقل الأساسي الذي يحدد بشكل فريد كل كيان في المجموعة.</p></li>
<li><p>حقل قياسي يخزن البيانات الأولية المراد تضمينها.</p></li>
<li><p>حقل متجه محجوز لتخزين التضمينات المتجهة التي ستقوم الدالة بإنشائها للحقل القياسي.</p></li>
</ul>
<p>يحدد المثال التالي مخططًا يحتوي على حقل قياسي واحد <code translate="no">&quot;document&quot;</code> لتخزين البيانات النصية وحقل متجه واحد <code translate="no">&quot;dense_vector&quot;</code> لتخزين التضمينات التي سيتم إنشاؤها بواسطة الوحدة النمطية للدالة. تذكر تعيين البعد المتجه (<code translate="no">dim</code>) لمطابقة مخرجات نموذج التضمين الذي اخترته.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">الخطوة 2: إضافة دالة التضمين إلى المخطط</h3><p>تقوم الوحدة النمطية الدالة في ميلفوس تلقائيًا بتحويل البيانات الأولية المخزنة في حقل قياسي إلى تضمينات وتخزينها في حقل المتجه المحدد صراحةً.</p>
<p>يضيف المثال أدناه وحدة الدالة (<code translate="no">tei_func</code>) التي تقوم بتحويل الحقل القياسي <code translate="no">&quot;document&quot;</code> إلى تضمينات، وتخزين المتجهات الناتجة في الحقل المتجه <code translate="no">&quot;dense_vector&quot;</code> المحدد مسبقًا.</p>
<p>بمجرد تعريف دالة التضمين الخاصة بك، قم بإضافتها إلى مخطط مجموعتك. هذا يوجه ميلفوس لاستخدام دالة التضمين المحددة لمعالجة التضمينات وتخزينها من بياناتك النصية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>المعلمة</strong></p></th>
     <th><p><strong>مطلوبة؟</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
     <th><p><strong>مثال القيمة</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>نعم</p></td>
     <td><p>موفر نموذج التضمين. تعيين إلى "TEI".</p></td>
     <td><p>"TEI"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>نعم</p></td>
     <td><p>عنوان الشبكة الذي يشير إلى خدمة TEI المنشورة. في حالة النشر عبر مخطط Milvus Helm، يكون هذا عادةً عنوان الخدمة الداخلي.</p></td>
     <td><p>"http://localhost:8080"، "http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>لا</p></td>
     <td><p>ما إذا كان سيتم اقتطاع نصوص الإدخال التي تتجاوز الحد الأقصى لطول النموذج. الافتراضي إلى خطأ.</p></td>
     <td><p>"صواب"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>فعالة عندما يكون الاقتطاع صحيحاً. يحدد ما إذا كان سيتم الاقتطاع من اليسار أو اليمين. الافتراضي إلى اليمين.</p></td>
     <td><p>"يسار"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>الحد الأقصى لحجم الدفعة التي يرسلها عميل Milvus إلى TEI. الإعداد الافتراضي 32.</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>رقم</p></td>
     <td><p>(متقدم) يحدد مفتاحاً في قاموس مطالبات تكوين محولات الجمل. يُستخدم لنماذج معينة تتطلب تنسيقات مطالبة محددة. قد يكون دعم TEI محدودًا ويعتمد على تكوين النموذج على المحور.</p></td>
     <td><p>"مفتاح المطالبة الخاص بك"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>(متقدم) يحدد المطالبة المراد استخدامها أثناء مرحلة إدخال البيانات (الإدخال). يعتمد على نموذج TEI المستخدم؛ يجب أن يدعم النموذج المطالبات.</p></td>
     <td><p>"مرور "</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>رقم</p></td>
     <td><p>(متقدم) يحدد المطالبة المراد استخدامها أثناء مرحلة البحث. يعتمد على نموذج TEI المستخدم؛ يجب أن يدعم النموذج المطالبات.</p></td>
     <td><p>"استعلام: "</p></td>
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
    </button></h2><p>بعد تكوين دالة التضمين، ارجع إلى <a href="/docs/ar/embedding-function-overview.md">نظرة عامة على الوظيفة</a> للحصول على إرشادات إضافية حول تكوين الفهرس وأمثلة إدراج البيانات وعمليات البحث الدلالي.</p>
