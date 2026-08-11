---
id: json-field-overview.md
title: نظرة عامة على حقول JSON
summary: >-
  عند تطوير تطبيقات مثل كتالوجات المنتجات أو أنظمة إدارة المحتوى أو محركات
  تفضيلات المستخدمين، غالبًا ما تحتاج إلى تخزين بيانات وصفية مرنة جنبًا إلى جنب
  مع التضمينات المتجهة. فخصائص المنتجات تختلف حسب الفئة، وتفضيلات المستخدمين
  تتطور بمرور الوقت، كما أن خصائص المستندات تتميز بهياكل متداخلة معقدة. وتحل
  حقول JSON في Milvus هذه المشكلة من خلال السماح لك بتخزين البيانات المنظمة
  المرنة والاستعلام عنها دون المساس بالأداء.
---
<h1 id="JSON-Field-Overview" class="common-anchor-header">نظرة عامة على حقول JSON<button data-href="#JSON-Field-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>عند إنشاء تطبيقات مثل كتالوجات المنتجات أو أنظمة إدارة المحتوى أو محركات تفضيلات المستخدم، غالبًا ما تحتاج إلى تخزين بيانات وصفية مرنة جنبًا إلى جنب مع التضمينات المتجهة. تختلف سمات المنتجات حسب الفئة، وتتطور تفضيلات المستخدم بمرور الوقت، وتتميز خصائص المستندات بهياكل متداخلة معقدة. تحل حقول JSON في Milvus هذه المشكلة من خلال السماح لك بتخزين البيانات المنظمة المرنة والاستعلام عنها دون التضحية بالأداء.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">ما هو حقل JSON؟<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>حقل JSON هو نوع بيانات محدد بمخطط (<code translate="no">DataType.JSON</code>) في Milvus يخزن بيانات منظمة من نوع «مفتاح-قيمة». وعلى عكس أعمدة قواعد البيانات التقليدية الصارمة، تستوعب حقول JSON الكائنات المتداخلة والمصفوفات وأنواع البيانات المختلطة، مع توفير خيارات فهرسة متعددة للاستعلامات السريعة.</p>
<p>مثال على بنية حقل JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> 
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، <code translate="no">metadata</code> هو حقل JSON واحد يحتوي على مزيج من القيم المسطحة (على سبيل المثال <code translate="no">category</code> ، <code translate="no">in_stock</code>)، والمصفوفات (<code translate="no">tags</code>)، والكائنات المتداخلة (<code translate="no">supplier</code>).</p>
<div class="alert note">
<p><strong>قواعد التسمية:</strong> استخدم الأحرف والأرقام وعلامات التسطير السفلية فقط في مفاتيح JSON. تجنب الأحرف الخاصة أو المسافات أو النقاط لأنها قد تسبب مشكلات في تحليل الاستعلامات.</p>
</div>
<h2 id="JSON-field-vs-dynamic-field" class="common-anchor-header">الحقل JSON مقابل الحقل الديناميكي<button data-href="#JSON-field-vs-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>من النقاط الشائعة التي تسبب الارتباك الفرق بين حقل JSON <a href="/docs/ar/enable-dynamic-field.md">والحقل الديناميكي</a>. ورغم أن كليهما مرتبط بـ JSON، إلا أنهما يخدمان أغراضًا مختلفة.</p>
<p>يلخص الجدول أدناه الاختلافات الرئيسية بين حقل JSON والحقل الديناميكي:</p>
<table>
   <tr>
     <th><p>الميزة</p></th>
     <th><p>حقل JSON</p></th>
     <th><p>الحقل الديناميكي</p></th>
   </tr>
   <tr>
     <td><p>تعريف المخطط</p></td>
     <td><p>حقل قياسي يجب الإعلان عنه صراحةً في مخطط المجموعة بنوع <code translate="no">DataType.JSON</code>.</p></td>
     <td><p>حقل JSON مخفي (يُسمى <code translate="no">$meta</code>) يقوم تلقائيًا بتخزين الحقول غير المُعلنة.</p></td>
   </tr>
   <tr>
     <td><p>حالة الاستخدام</p></td>
     <td><p>يخزن البيانات المنظمة التي يكون مخططها معروفًا ومتسقًا.</p></td>
     <td><p>يخزن البيانات المرنة أو المتطورة أو شبه المنظمة التي لا تتوافق مع مخطط ثابت.</p></td>
   </tr>
   <tr>
     <td><p>التحكم</p></td>
     <td><p>يمكنك التحكم في اسم الحقل وبنيته.</p></td>
     <td><p>تتم إدارتها من قبل النظام بالنسبة للحقول غير المحددة.</p></td>
   </tr>
   <tr>
     <td><p>الاستعلام</p></td>
     <td><p>يمكنك الاستعلام باستخدام اسم الحقل الخاص بك أو المفتاح المستهدف داخل حقل JSON: <code translate="no">metadata["key"]</code>.</p></td>
     <td><p>الاستعلام مباشرةً باستخدام مفتاح الحقل الديناميكي: <code translate="no">"dynamic_key"</code> أو عبر <code translate="no">$meta</code>: <code translate="no">$meta["dynamic_key"]</code></p></td>
   </tr>
</table>
<h2 id="Basic-operations" class="common-anchor-header">العمليات الأساسية<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>يتضمن سير العمل الأساسي لاستخدام حقل JSON تعريفه في المخطط الخاص بك، وإدراج البيانات، ثم الاستعلام عن البيانات باستخدام تعبيرات تصفية محددة.</p>
<h3 id="Define-a-JSON-field" class="common-anchor-header">تحديد حقل JSON<button data-href="#Define-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>لاستخدام حقل JSON، قم بتعريفه صراحةً في مخطط المجموعة عند إنشاء المجموعة. يوضح المثال التالي كيفية إنشاء مجموعة تحتوي على حقل <code translate="no">metadata</code> من النوع <code translate="no">DataType.JSON</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address </span>

<span class="hljs-comment"># Create schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>) <span class="hljs-comment"># Vector field</span>
<span class="hljs-comment"># Define a JSON field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)</span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>في هذا المثال، يسمح حقل JSON المُعرَّف في مخطط المجموعة بالقيم الفارغة (null) مع <code translate="no">nullable=True</code>. لمزيد من التفاصيل، راجع «القيم الفارغة ( <a href="/docs/ar/nullable-and-default.md">Nullable) والقيم الافتراضية (Default)</a>».</p>
</div>
<h3 id="Insert-data" class="common-anchor-header">إدراج البيانات<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد إنشاء المجموعة، قم بإدراج الكيانات التي تحتوي على كائنات JSON منظمة في حقل JSON المحدد. يجب تنسيق بياناتك كقائمة من القواميس.</p>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;metadata&quot;</span>: { <span class="hljs-comment"># JSON field</span></span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;supplier&quot;</span>: {</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,</span>
<span class="highlighted-comment-line">                <span class="hljs-string">&quot;contact&quot;</span>: {</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,</span>
<span class="highlighted-comment-line">                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span></span>
<span class="highlighted-comment-line">                }</span>
<span class="highlighted-comment-line">            }</span>
<span class="highlighted-comment-line">        }</span>
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Filtering-operations" class="common-anchor-header">عمليات التصفية<button data-href="#Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل أن تتمكن من إجراء عمليات التصفية على حقول JSON، تأكد مما يلي:</p>
<ul>
<li><p>أنك قمت بإنشاء فهرس لكل حقل متجه.</p></li>
<li><p>تم تحميل المجموعة في الذاكرة.</p></li>
</ul>
<p><details></p>
<p><summary>عرض الكود</summary></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, index_params=index_params)

client.load_collection(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>بمجرد استيفاء هذه المتطلبات، يمكنك استخدام التعبيرات أدناه لتصفية المجموعة بناءً على القيم الموجودة داخل حقل JSON. تستفيد تعبيرات التصفية هذه من صيغة مسار JSON محددة وعوامل تشغيل مخصصة.</p>
<h4 id="Filtering-with-JSON-path-syntax" class="common-anchor-header">التصفية باستخدام صيغة مسار JSON</h4><p>للاستعلام عن مفتاح معين، استخدم صيغة الأقواس للوصول إلى مفاتيح JSON: <code translate="no">json_field_name[&quot;key&quot;]</code>. بالنسبة للمفاتيح المتداخلة، قم بربطها معًا: <code translate="no">json_field_name[&quot;key1&quot;][&quot;key2&quot;]</code>.</p>
<p>لتصفية الكيانات التي يكون فيها <code translate="no">category</code> هو <code translate="no">&quot;electronics&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>لتصفية الكيانات التي يكون فيها المفتاح المتداخل <code translate="no">supplier[&quot;country&quot;]</code> هو <code translate="no">&quot;USA&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;country&quot;] == &quot;USA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filtering-with-JSON-specific-operators" class="common-anchor-header">التصفية باستخدام عوامل التشغيل الخاصة بـ JSON</h4><p>يوفر Milvus أيضًا عوامل خاصة للاستعلام عن قيم المصفوفات بناءً على مفاتيح حقول JSON محددة. على سبيل المثال:</p>
<ul>
<li><p><code translate="no">json_contains(identifier, expr)</code>: يتحقق من وجود عنصر معين أو مصفوفة فرعية داخل مصفوفة JSON</p></li>
<li><p><code translate="no">json_contains_all(identifier, expr)</code>: يضمن وجود جميع عناصر تعبير JSON المحدد في الحقل</p></li>
<li><p><code translate="no">json_contains_any(identifier, expr)</code>: تصفية الكيانات التي يوجد فيها عضو واحد على الأقل من تعبير JSON داخل الحقل</p></li>
</ul>
<p>للعثور على منتج يحتوي على القيمة <code translate="no">&quot;summer_sale&quot;</code> تحت مفتاح <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;summer_sale&quot;)&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>للعثور على منتج يحتوي على قيمة واحدة على الأقل من القيم <code translate="no">&quot;electronics&quot;</code> أو <code translate="no">&quot;new&quot;</code> أو <code translate="no">&quot;clearance&quot;</code> تحت المفتاح <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(metadata[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,  <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],               <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                           <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                    <span class="hljs-comment"># Filter expression</span></span>
    output_fields=[<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>]   <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول العوامل الخاصة بـ JSON، راجع <a href="/docs/ar/json-operators.md">عوامل JSON</a>.</p>
<h2 id="Next-Accelerate-JSON-queries" class="common-anchor-header">التالي: تسريع استعلامات JSON<button data-href="#Next-Accelerate-JSON-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>بشكل افتراضي، ستقوم الاستعلامات على حقول JSON التي لا تخضع للتسريع بإجراء مسح كامل لجميع الصفوف، مما قد يؤدي إلى بطء الأداء عند التعامل مع مجموعات البيانات الكبيرة. لتسريع استعلامات JSON، يوفر Milvus ميزات متقدمة للفهرسة وتحسين التخزين.</p>
<div class="alert warning">
<p>بدءًا من Milvus 3.0.0، تم إيقاف استخدام فهرسة JSON للكائن بأكمله (<code translate="no">json_cast_type=&quot;JSON&quot;</code>)، والمعروفة أيضًا باسم فهرسة JSON المسطحة. لا يزال يتم دعم الفهارس الحالية وطلبات إنشاء الفهارس الجديدة من أجل التوافق، ولكن لم يعد يُنصح باستخدام هذا الوضع لأحمال العمل الجديدة. استخدم فهرسة مسار JSON لمسارات الاستعلام المعروفة، أو ضع في اعتبارك استخدام تقنية <a href="/docs/ar/json-shredding.md">JSON Shredding</a> لتسريع الاستعلامات على نطاق واسع عبر المستندات المعقدة أو المتغيرة.</p>
</div>
<p>يلخص الجدول أدناه الاختلافات بينهما وسيناريوهات الاستخدام الأمثل:</p>
<table>
   <tr>
     <th><p>التقنية</p></th>
     <th><p>الأفضل لـ</p></th>
     <th><p>تسريع المصفوفات</p></th>
     <th><p>ملاحظات</p></th>
   </tr>
   <tr>
     <td><p>فهرسة JSON</p></td>
     <td><p>مجموعة صغيرة من المفاتيح التي يتم الوصول إليها بشكل متكرر، ومصفوفات على مفتاح مصفوفة محدد</p></td>
     <td><p>نعم (على مفتاح المصفوفة المفهرس)</p></td>
     <td><p>يجب تحديد المفاتيح مسبقًا، وتحتاج إلى صيانة في حالة تطور المخطط</p></td>
   </tr>
   <tr>
     <td><p>تجزئة JSON</p></td>
     <td><p>زيادة عامة في السرعة عبر العديد من المفاتيح، ومرونة في التعامل مع الاستعلامات المتنوعة</p></td>
     <td><p>لا (لا يسرع القيم داخل المصفوفات)</p></td>
     <td><p>تكوين تخزين إضافي، ولا تزال المصفوفات تحتاج إلى فهرس لكل مفتاح</p></td>
   </tr>
   <tr>
     <td><p>فهرس NGRAM</p></td>
     <td><p>عمليات البحث باستخدام أحرف البدل، ومطابقة أجزاء السلسلة في الحقول النصية</p></td>
     <td><p>غير متوفر</p></td>
     <td><p>لا ينطبق على عوامل التصفية الرقمية/النطاقية</p></td>
   </tr>
</table>
<p><strong>نصيحة:</strong> يمكنك الجمع بين هذه الأساليب — على سبيل المثال، استخدم تجزئة JSON لتسريع الاستعلامات العامة، وفهرسة JSON لمفاتيح المصفوفات عالية التكرار، وفهرسة NGRAM للبحث النصي المرن.</p>
<p>للحصول على تفاصيل التنفيذ، راجع:</p>
<ul>
<li><p><a href="/docs/ar/json-indexing.md">فهرسة JSON</a></p></li>
<li><p><a href="/docs/ar/json-shredding.md">تجزئة JSON</a></p></li>
<li><p><a href="/docs/ar/ngram.md">NGRAM</a></p></li>
</ul>
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
    </button></h2><h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">هل هناك أي قيود على حجم حقل JSON؟<button data-href="#Are-there-any-limitations-on-the-size-of-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم. يقتصر حجم كل حقل JSON على 65,536 بايت.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">هل يدعم حقل JSON تعيين قيمة افتراضية؟<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، لا تدعم حقول JSON القيم الافتراضية. ومع ذلك، يمكنك تعيين " <code translate="no">nullable=True</code> " عند تعريف الحقل للسماح بالإدخالات الفارغة.</p>
<p>يرجى الرجوع إلى "القيم الفارغة والقيم الافتراضية" ( <a href="/docs/ar/nullable-and-default.md">Nullable &amp; Default</a> ) للحصول على التفاصيل.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">هل توجد أي قواعد لتسمية مفاتيح حقول JSON؟<button data-href="#Are-there-any-naming-conventions-for-JSON-field-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم، لضمان التوافق مع الاستعلامات والفهرسة:</p>
<ul>
<li><p>استخدم الأحرف والأرقام وعلامات التسطير السفلية فقط في مفاتيح JSON.</p></li>
<li><p>تجنب استخدام الأحرف الخاصة أو المسافات أو النقاط (<code translate="no">.</code> ، <code translate="no">/</code> ، إلخ).</p></li>
<li><p>قد تتسبب المفاتيح غير المتوافقة في حدوث مشكلات في تحليل تعبيرات التصفية.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">كيف يتعامل Milvus مع القيم النصية في حقول JSON؟<button data-href="#How-does-Milvus-handle-string-values-in-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>يخزن Milvus القيم النصية تمامًا كما تظهر في مدخلات JSON — دون أي تحويل دلالي. قد تؤدي السلاسل التي لا تحتوي على علامات اقتباس صحيحة إلى حدوث أخطاء أثناء التحليل.</p>
<p><strong>أمثلة على السلاسل الصحيحة</strong>:</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>أمثلة على السلاسل غير الصالحة</strong>:</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
