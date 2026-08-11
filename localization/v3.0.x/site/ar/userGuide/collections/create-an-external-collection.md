---
id: create-an-external-collection.md
title: إنشاء مجموعة خارجيةCompatible with Milvus 3.0.x
summary: >-
  المجموعة الخارجية هي نوع من مجموعات البيانات في Milvus التي تتيح الوصول إلى
  البيانات من أنظمة التخزين الخارجية أو جداول قواعد البيانات، مثل AWS S3
  وIceberg، دون نسخها إلى Milvus. وهي تعمل كطبقة استعلام فوق بحيرات البيانات مع
  الحفاظ على التوافق مع واجهات الاستعلام في Milvus.
beta: Milvus 3.0.x
---
<h1 id="Create-an-External-Collection" class="common-anchor-header">إنشاء مجموعة خارجية<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Create-an-External-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>المجموعة الخارجية هي نوع من مجموعات البيانات في Milvus التي تصل إلى البيانات من أنظمة التخزين الخارجية أو جداول قواعد البيانات مثل AWS S3 و Iceberg دون نسخها إلى Milvus. وهي تعمل كطبقة استعلام فوق بحيرات البيانات مع الحفاظ على التوافق مع واجهات الاستعلام في Milvus.</p>
<div class="alert note">
<p>تتطلب هذه الميزة Storage V3. للاطلاع على إرشادات التفعيل واعتبارات التوافق، راجع <a href="/docs/ar/storage-v3.md">Storage V3</a>.</p>
</div>
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
    </button></h2><p>في مسار بيانات الذكاء الاصطناعي النموذجي، قد يكون المستخدمون قد خزنوا بياناتهم بالفعل بتنسيق Parquet أو تنسيقات أخرى على نظام التخزين الخاص بهم، مثل AWS S3. لكي يتمكن Milvus من استخدام هذه البيانات المخزنة خارجيًا، يحتاج المستخدمون عادةً إلى استيرادها إلى وحدة التخزين الخاصة بـ Milvus باستخدام مسارات استخراج-تحويل-تحميل (ETL).</p>
<p>يؤدي سير العمل هذا، الذي يعتمد على «جلب البيانات إلى Milvus»، إلى إنشاء بيانات مكررة يصعب مزامنتها، كما يزيد من عبء الصيانة الهندسية لضمان اتساق البيانات.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-data-to-compute.png" alt="Bring data to compute workflow" class="doc-image" id="bring-data-to-compute-workflow" /> 
   <span>سير عمل «جلب البيانات إلى نظام المعالجة</span> </span>» <span class="img-wrapper">
  
 </span></p>
<p>لحل هذه المشكلات، يوفر Milvus مجموعات خارجية تتيح لك الوصول إلى بياناتك المخزنة خارجيًا من Milvus دون القلق بشأن مزامنة البيانات ومسارات ETL.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-compute-to-data.png" alt="Bring compute to data workflow" class="doc-image" id="bring-compute-to-data-workflow" /> 
   <span>سير عمل "جلب الحوسبة إلى البيانات</span> </span>" <span class="img-wrapper">
  
 </span></p>
<p>بمجرد إنشاء المجموعة الخارجية، يمكنها الوصول إلى بياناتك مباشرةً والاحتفاظ بها في نفس المكان الذي تخزنها فيه. في الخلفية، يقوم Milvus بإنشاء ملفات بيان لتسجيل التعيينات بين بيانات Milvus الوصفية والصفوف الموجودة في ملفات البيانات الخارجية. بعد أن تصبح ملفات البيان جاهزة، يمكنك إنشاء فهارس في المجموعة الخارجية كما تفعل في أي مجموعة مُدارة.</p>
<p>عندما تتغير بياناتك، يؤدي تشغيل التحديث يدويًا في أقل من ثانية إلى تحديث البيانات الوصفية، مما يحافظ على تحديث Milvus دائمًا.</p>
<h2 id="Step-1-Create-schema" class="common-anchor-header">الخطوة 1: إنشاء مخطط<button data-href="#Step-1-Create-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>كما هو الحال عند إنشاء مجموعة مُدارة، تحتاج أيضًا إلى إنشاء مخطط قبل إنشاء مجموعة خارجية. ومع ذلك، يختلف المخطط قليلاً عن مخطط المجموعة المُدارة.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema(
    external_source=<span class="hljs-string">&#x27;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&#x27;</span>,
    external_spec=<span class="hljs-string">&#x27;{
        &quot;format&quot;: &quot;parquet&quot;,
        &quot;extfs&quot;: {
            ...
        }
    }&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">externalSpec</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
externalSpec.addProperty(<span class="hljs-string">&quot;format&quot;</span>, <span class="hljs-string">&quot;parquet&quot;</span>);
externalSpec.add(<span class="hljs-string">&quot;extfs&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .externalSource(<span class="hljs-string">&quot;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&quot;</span>)
        .externalSpec(externalSpec)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;product_embeddings&quot;</span>).
    WithExternalSource(<span class="hljs-string">&quot;s3://my-bucket/embeddings/&quot;</span>).
    WithExternalSpec(<span class="hljs-string">`{&quot;format&quot;: &quot;parquet&quot;, &quot;extfs&quot;: { ... }}`</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;product_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;768&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;product_name&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 512
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لإنشاء مخطط لمجموعة خارجية، تحتاج إلى تحديد عنوان URI لبيانات المصدر، وتنسيق البيانات، وإعدادات المصادقة.</p>
<table>
   <tr>
     <th><p>اسم المعلمة</p></th>
     <th><p>وصف المعلمة</p></th>
     <th><p>قيمة مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>تنسيق ملفات البيانات المصدر المستهدفة.</p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">snapshot_id</code></p></td>
     <td><p>معرف لقطة جدول Iceberg صالح. لا ينطبق هذا المعامل إلا عند تعيين " <code translate="no">format</code> " إلى " <code translate="no">iceberg_table</code>".</p></td>
     <td><p><code translate="no">473984310232959286</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>إعدادات نظام الملفات الخارجية في بنية JSON محولة إلى سلسلة نصية.</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<p><details summary="Authentication Options"></p>
<p>تتوفر لك الخيارات التالية لتعيين إعدادات المصادقة:</p>
<h3 id="Use-AWS-AKSK" class="common-anchor-header">استخدام AWS AK/SK<button data-href="#Use-AWS-AKSK" class="anchor-icon" translate="no">
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
    </button></h3><p>ينطبق هذا الخيار على MinIO المُستضاف ذاتيًا أو في الحالة التي يكون لديك فيها AK/SK للعمل.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;access_key_id&quot;</span><span class="hljs-punctuation">:</span>     <span class="hljs-string">&quot;AKIA..&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;access_key_value&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;u4Lh...&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_virtual_host&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>اسم المعلمة</p></th>
     <th><p>وصف المعلمة</p></th>
     <th><p>مثال على القيمة</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_id</code></p></td>
     <td><p>معرف مفتاح الوصول</p></td>
     <td><p><code translate="no">AKIA...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_value</code></p></td>
     <td><p>قيمة مفتاح الوصول</p></td>
     <td><p><code translate="no">u7LH...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>معرف منطقة السحابة</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>معرف مزود الخدمة السحابية</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>ما إذا كان يتم استخدام SSL لإنشاء الاتصالات.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_virtual_host</code></p></td>
     <td><p>ما إذا كان سيتم استخدام الاستضافة الافتراضية للوصول إلى دلو التخزين الخاص بك.</p><p>للحصول على التفاصيل، راجع <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">هذه المقالة</a>.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-AWS-IAM" class="common-anchor-header">استخدام AWS IAM<button data-href="#Use-AWS-IAM" class="anchor-icon" translate="no">
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
    </button></h3><p>ينطبق هذا الخيار على السيناريو الذي يعمل فيه Milvus على مثيل EC2 أو مجموعة EKS. في هذه الحالة، لا تحتاج إلى ترميز AK/SK بشكل ثابت.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;iam_endpoint&quot;</span><span class="hljs-punctuation">:</span>      <span class="hljs-string">&quot;https://sts.&lt;region&gt;.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>اسم المعلمة</p></th>
     <th><p>وصف المعلمة</p></th>
     <th><p>مثال على القيمة</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>ما إذا كان سيتم استخدام AWS IAM أم لا.</p><p>اضبط هذا الخيار على <code translate="no">"true"</code>.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.iam_endpoint</code></p></td>
     <td><p>نقطة نهاية AWS STS صالحة. </p><p>للحصول على التفاصيل، راجع <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_region-endpoints.html">هذه المقالة</a>.</p></td>
     <td><p><code translate="no">https:&ast;//&ast;sts.&lt;region&gt;.amazonaws.com</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>معرف منطقة السحابة</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>معرف مزود الخدمة السحابية</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>ما إذا كان يتم استخدام SSL لإنشاء الاتصالات.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-Milvus-global-credentials" class="common-anchor-header">استخدام بيانات اعتماد Milvus العالمية<button data-href="#Use-Milvus-global-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>ينطبق هذا الخيار عند تخزين البيانات الخارجية في دلو Milvus، ويمكن استخدام إعدادات MinIO العامة المحددة في <code translate="no">milvus.yaml</code> مباشرةً للوصول إلى البيانات.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-IAM-Role-ARN" class="common-anchor-header">استخدام ARN دور IAM<button data-href="#Use-IAM-Role-ARN" class="anchor-icon" translate="no">
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
    </button></h3><p>ينطبق هذا الخيار عندما تستخدم مؤسستك حسابات AWS مختلفة لإدارة مجموعة Milvus وحاوية البيانات التي تحتوي على ملفات البيانات المستهدفة.</p>
<p>في هذه الحالة، يجب على مالك الحاوية إنشاء دور IAM يقوم بما يلي</p>
<ul>
<li><p>يربط سياسة « <code translate="no">AmazonS3FullAccess</code> » أو سياسة أكثر تفصيلًا للوصول إلى الحاوية.</p></li>
<li><p>يتضمن سياسة " <code translate="no">sts:ExternalId</code> " محددة ذاتيًا في حقل "Condition" (الشرط) في سياسة الثقة الخاصة بالدور.</p></li>
</ul>
<p>بعد ذلك، يجب على مالك الحاوية تزويدك برقم تعريف دور IAM (ARN) والمعرف الخارجي (External ID) حتى تتمكن من استدعاء <code translate="no">sts:AssumeRole</code> باستخدام تلك القيم لتولي دور IAM.</p>
<p>فيما يلي مثال على سياسة أذونات تُرفق بدور IAM مع الأذونات المسموح بها. يمكنك تعديلها لتلبية متطلباتك.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:GetBucketLocation&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:DeleteObject&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET/*&quot;</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>وتحدد سياسة الثقة المرتبطة بدور IAM من يُسمح له بتولي هذا الدور.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AWS&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::ACCOUNT_RUNNING_MILVUS:root&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Condition&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;StringEquals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;sts:ExternalId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد حصولك على معرّف دور IAM (ARN) والمعرف الخارجي، يمكنك إعداد معلمة <code translate="no">external_spec</code> على النحو التالي:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;role_arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::306787000000:role/lentitude-bucket-role&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;external_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;load_frequency&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;900&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>اسم المعلمة</p></th>
     <th><p>وصف المعلمة</p></th>
     <th><p>قيمة مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>معرف مزود الخدمة السحابية</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>معرف منطقة السحابة</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>ما إذا كان يتم استخدام SSL لإنشاء الاتصالات.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>ما إذا كان سيتم استخدام AWS IAM.</p><p>اضبط هذا على <code translate="no">"true"</code> لهذا الخيار.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.role_arn</code></p></td>
     <td><p>ARN دور IAM الذي تم الحصول عليه من مالك الحاوية.</p></td>
     <td><p><code translate="no">arn:aws:iam::306787000000:role/...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.external_id</code></p></td>
     <td><p>المعرف الخارجي الذي تم الحصول عليه من مالك الحاوية.</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.load_frequency</code></p></td>
     <td><p>الفاصل الزمني الذي يسترد فيه Milvus بيانات اعتماد المصادقة المؤقتة بالثواني.</p></td>
     <td><p><code translate="no">900</code></p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Step-2-Add-fields" class="common-anchor-header">الخطوة 2: إضافة الحقول<button data-href="#Step-2-Add-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن يصبح المخطط جاهزًا، يمكنك إضافة الحقول على النحو التالي:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,
    datatype=DataType.INT64,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-comment"># field name in the external data file</span></span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;product_name&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;name&quot;</span></span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;vector&quot;</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.Int64)
        .externalField(<span class="hljs-string">&quot;id&quot;</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_name&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .externalField(<span class="hljs-string">&quot;name&quot;</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .externalField(<span class="hljs-string">&quot;vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema = schema.
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_id&quot;</span>).
            WithDataType(entity.FieldTypeInt64).
            WithExternalField(<span class="hljs-string">&quot;id&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_name&quot;</span>).
            WithDataType(entity.FieldTypeVarChar).
            WithMaxLength(<span class="hljs-number">512</span>).
            WithExternalField(<span class="hljs-string">&quot;name&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">768</span>).
            WithExternalField(<span class="hljs-string">&quot;vector&quot;</span>),
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;externalSource\&quot;: \&quot;volume://my_volume/path/to/a/folder\&quot;,
    \&quot;externalSpec\&quot;: \&quot;{\\\&quot;format\\\&quot;: \\\&quot;parquet\\\&quot;}\&quot;,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Create-a-collection" class="common-anchor-header">الخطوة 3: إنشاء مجموعة<button data-href="#Step-3-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إضافة جميع الحقول إلى المخطط، يمكنك إنشاء المجموعة الخارجية.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(createReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey: token
})

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>, schema))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Create-indexes" class="common-anchor-header">الخطوة 4: إنشاء الفهارس<button data-href="#Step-4-Create-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إنشاء فهارس لحقول المجموعة الخارجية كما تفعل في المجموعات المُدارة.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;product_name&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>
)
client.create_index(
    db_name=<span class="hljs-string">&quot;my_database&quot;</span>,
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;product_name&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build();
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
        .dbName(<span class="hljs-string">&quot;my_database&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .indexParams(indexParams)
        .build();
client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

collectionName := <span class="hljs-string">&quot;test_collection&quot;</span>
indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;embedding&quot;</span>, index.NewAutoIndex(entity.COSINE)),
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;product_name&quot;</span>, index.NewAutoIndex(index.AUTOINDEX)),
}
indexTask, err := client.CreateIndex(ctx, indexOptions)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handler err</span>
}
err = indexTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handler err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;product_name&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>
})
client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;product_name&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Refresh-data" class="common-anchor-header">الخطوة 5: تحديث البيانات<button data-href="#Step-5-Refresh-data" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن تصبح المجموعة جاهزة، قم بتحديثها لإنشاء البيانات الوصفية والفهارس لبياناتك.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">job_id = client.refresh_external_collection(
    db_name=<span class="hljs-string">&quot;my_database&quot;</span>,
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>
)
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    progress = client.get_refresh_external_collection_progress(job_id=job_id)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{progress.state}</span>: <span class="hljs-subst">{progress.progress}</span>%&quot;</span>)
    <span class="hljs-keyword">if</span> progress.state == <span class="hljs-string">&quot;RefreshCompleted&quot;</span>:
        elapsed = progress.end_time - progress.start_time
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Completed in <span class="hljs-subst">{elapsed}</span>ms&quot;</span>)
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">elif</span> progress.state == <span class="hljs-string">&quot;RefreshFailed&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Failed: <span class="hljs-subst">{progress.reason}</span>&quot;</span>)
        <span class="hljs-keyword">break</span>
    time.sleep(<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetRefreshExternalCollectionProgressReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListRefreshExternalCollectionJobsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetRefreshExternalCollectionProgressResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListRefreshExternalCollectionJobsResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-type">GetRefreshExternalCollectionProgressResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.getRefreshExternalCollectionProgress(
            GetRefreshExternalCollectionProgressReq.builder()
                    .jobId(jobId)
                    .build());
    <span class="hljs-type">RefreshExternalCollectionJobInfo</span> <span class="hljs-variable">jobInfo</span> <span class="hljs-operator">=</span> resp.getJobInfo();
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;RefreshCompleted&quot;</span>.equals(jobInfo.getState())) {
        <span class="hljs-type">long</span> <span class="hljs-variable">elapsed</span> <span class="hljs-operator">=</span> jobInfo.getEndTime() - jobInfo.getStartTime();
        System.out.printf(<span class="hljs-string">&quot;  Refresh completed in %dms%n&quot;</span>, elapsed);
        <span class="hljs-keyword">break</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;RefreshFailed&quot;</span>.equals(jobInfo.getState())) {
        System.out.printf(<span class="hljs-string">&quot;  Refresh failed: %s%n&quot;</span>, jobInfo.getReason());
    }
    TimeUnit.SECONDS.sleep(<span class="hljs-number">2</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">refreshResult, err := client.RefreshExternalCollection(ctx,
    client.NewRefreshExternalCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>))
jobID := refreshResult.JobID
<span class="hljs-keyword">for</span> {
    progress, _ := client.GetRefreshExternalCollectionProgress(ctx,
        client.NewGetRefreshExternalCollectionProgressOption(jobID))
    fmt.Printf(<span class="hljs-string">&quot;State: %s\n&quot;</span>, progress.State)
    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateCompleted {
        fmt.Println(<span class="hljs-string">&quot;Refresh completed!&quot;</span>)
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateFailed {
        fmt.Printf(<span class="hljs-string">&quot;Refresh failed: %s\n&quot;</span>, progress.Reason)
        <span class="hljs-keyword">break</span>
    }
    time.Sleep(<span class="hljs-number">2</span> * time.Second)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/jobs/external_collection/refresh&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;externalSource\&quot;: \&quot;volume://my_volume/path/to/a/folder\&quot;,
    \&quot;externalSpec\&quot;: \&quot;{\\\&quot;format\\\&quot;: \\\&quot;parquet\\\&quot;}\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>عملية التحديث غير متزامنة، لذا تحتاج إلى إعداد تكرار لمراقبة تقدمها.</p>
<div class="alert note">
<ul>
<li><p>تقوم عملية التحديث بمسح البيانات الوصفية لملفات البيانات وإنشاء ملفات البيان وفقًا لذلك. وعادةً ما تستغرق هذه العملية ما بين 150 و250 مللي ثانية.</p></li>
<li><p>تسجل ملفات البيان التعيين بين البيانات الوصفية في Milvus والصفوف في الملفات الخارجية.</p></li>
<li><p>إذا كان هناك تحديث لبياناتك المصدرية، فستحتاج إلى استدعاء عملية التحديث يدويًا مرة أخرى للحفاظ على تحديث Milvus.</p></li>
<li><p>يؤدي التحديث الذي يتطلب إزالة جميع البيانات الوصفية النشطة دون أي إدخالات إلى الرفض.</p></li>
</ul>
</div>
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
    </button></h2><p>بمجرد تحديث المجموعة الخارجية، يمكنك تحميل المجموعة وإطلاقها وإجراء عمليات البحث عن التشابه والاستعلامات في المجموعة الخارجية كما تفعل في أي مجموعة مُدارة، باستثناء أن المجموعات الموجودة في قاعدة بيانات للحوسبة عند الطلب يجب أن تكون مرفقة بمجموعة عند الطلب لإجراء عمليات البحث والاستعلامات.</p>
<p>قبل إجراء عمليات DQL، مثل البحث والاستعلام والحصول والبحث المختلط، تحتاج إلى إنشاء جلسة عمل لربط موارد الحوسبة الخاصة بمجموعة عند الطلب.</p>
<p>إذا احتوى مصدر البيانات الخارجي لاحقًا على حقل آخر تريد عرضه في Milvus، فقم بإضافة حقل إلى مخطط المجموعة الخارجية وقم بتحديث المجموعة الخارجية مرة أخرى. للحصول على التفاصيل، راجع <a href="/docs/ar/alter-external-collection-schema.md">«تعديل مخطط المجموعة الخارجية</a>».</p>
