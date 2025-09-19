---
id: json-indexing.md
title: فهرسة JSON
summary: >-
  توفر حقول JSON طريقة مرنة لتخزين البيانات الوصفية المنظمة في Milvus. وبدون
  فهرسة، تتطلب الاستعلامات على حقول JSON عمليات مسح كاملة للمجموعة، والتي تصبح
  بطيئة مع نمو مجموعة بياناتك. تتيح فهرسة JSON عمليات بحث سريعة من خلال إنشاء
  فهارس داخل بيانات JSON الخاصة بك.
---
<h1 id="JSON-Indexing" class="common-anchor-header">فهرسة JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>توفر حقول JSON طريقة مرنة لتخزين البيانات الوصفية المنظمة في ميلفوس. وبدون الفهرسة، تتطلب الاستعلامات على حقول JSON عمليات مسح كاملة للمجموعة، والتي تصبح بطيئة مع نمو مجموعة بياناتك. تتيح فهرسة JSON عمليات بحث سريعة من خلال إنشاء فهارس داخل بيانات JSON الخاصة بك.</p>
<p>فهرسة JSON مثالية لـ</p>
<ul>
<li><p>المخططات المنظمة ذات المفاتيح المتسقة والمعروفة</p></li>
<li><p>استعلامات المساواة والنطاق على مسارات JSON محددة</p></li>
<li><p>السيناريوهات التي تحتاج فيها إلى تحكم دقيق في المفاتيح المفهرسة</p></li>
<li><p>التسريع الفعال في التخزين للاستعلامات المستهدفة</p></li>
</ul>
<div class="alert note">
<p>بالنسبة لمستندات JSON المعقدة ذات أنماط استعلام متنوعة، ضع في اعتبارك <a href="/docs/ar/json-shredding.md">فهرسة JSON Shredding</a> كبديل.</p>
</div>
<h2 id="JSON-indexing-syntax" class="common-anchor-header">بناء جملة فهرسة JSON<button data-href="#JSON-indexing-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>عندما تقوم بإنشاء فهرس JSON، فإنك تحدد</p>
<ul>
<li><p><strong>مسار JSON</strong>: الموقع الدقيق للبيانات التي تريد فهرستها</p></li>
<li><p><strong>نوع البيانات المصبوب</strong>: كيفية تفسير وتخزين القيم المفهرسة</p></li>
<li><p><strong>تحويل النوع الاختياري</strong>: تحويل البيانات أثناء الفهرسة إذا لزم الأمر</p></li>
</ul>
<p>إليك بناء الجملة لفهرسة حقل JSON:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;&lt;json_field_name&gt;&quot;</span>,  <span class="hljs-comment"># Name of the JSON field</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Must be AUTOINDEX or INVERTED</span>
    index_name=<span class="hljs-string">&quot;&lt;unique_index_name&gt;&quot;</span>,  <span class="hljs-comment"># Index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;&lt;path_to_json_key&gt;&quot;</span>,  <span class="hljs-comment"># Specific key to be indexed within JSON data</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;&lt;data_type&gt;&quot;</span>,  <span class="hljs-comment"># Data type to use when interpreting and indexing the value</span>
        <span class="hljs-comment"># &quot;json_cast_function&quot;: &quot;&lt;cast_function&gt;&quot;  # Optional: convert key values into a target type at index time</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة / مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>اسم حقل JSON في مخطط المجموعة.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>يجب أن يكون <code translate="no">"AUTOINDEX"</code> أو <code translate="no">"INVERTED"</code> لفهرسة JSON.</p></td>
     <td><p><code translate="no">"AUTOINDEX"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>المعرف الفريد لهذا الفهرس.</p></td>
     <td><p><code translate="no">"category_index"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_path</code></p></td>
     <td><p>المسار إلى المفتاح الذي تريد فهرسته داخل كائن JSON الخاص بك.</p></td>
     <td><ul><li><p>مفتاح المستوى الأعلى: <code translate="no">'metadata["category"]'</code></p></li><li><p>مفتاح متداخل: <code translate="no">'metadata["supplier"]["contact"]["email"]'</code></p></li><li><p>كائن JSON بأكمله: <code translate="no">"metadata"</code></p></li><li><p>كائن فرعي: <code translate="no">'metadata["supplier"]'</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_type</code></p></td>
     <td><p>نوع البيانات المراد استخدامه عند تفسير القيمة وفهرستها. يجب أن يتطابق مع نوع البيانات الفعلي للمفتاح.</p><p>للحصول على قائمة بأنواع الإرسال المتاحة، انظر <a href="/docs/ar/json-indexing.md#Supported-cast-types">أنواع الإرسال المدعومة</a><a href="/docs/ar/json-indexing.md#Supported-cast-types"> أدناه</a>.</p></td>
     <td><p><code translate="no">"VARCHAR"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_function</code></p></td>
     <td><p><strong>(اختياري)</strong> تحويل قيم المفتاح الأصلية إلى النوع المستهدف في وقت الفهرسة. هذا التكوين مطلوب فقط عندما يتم تخزين قيم المفاتيح بتنسيق خاطئ وتريد تحويل نوع البيانات أثناء الفهرسة.</p><p>للحصول على قائمة بدوال الإرسال المتاحة، راجع <a href="/docs/ar/json-indexing.md#Supported-cast-functions">دوال الإرسال المدعومة أدناه</a>.</p></td>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
   </tr>
</table>
<h3 id="Supported-cast-types" class="common-anchor-header">أنواع الإرسال المدعومة<button data-href="#Supported-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>يدعم Milvus أنواع البيانات التالية للإرسال في وقت الفهرسة. تضمن هذه الأنواع تفسير بياناتك بشكل صحيح من أجل التصفية الفعالة.</p>
<table>
   <tr>
     <th><p>نوع الإرسال</p></th>
     <th><p>الوصف</p></th>
     <th><p>مثال قيمة JSON</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">BOOL</code> / <code translate="no">bool</code></p></td>
     <td><p>تُستخدم لفهرسة القيم المنطقية، مما يتيح الاستعلامات التي تصفي على شروط صواب/خطأ.</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">DOUBLE</code> / <code translate="no">double</code></p></td>
     <td><p>يُستخدم للقيم الرقمية، بما في ذلك الأعداد الصحيحة وأرقام الفاصلة العائمة. ويتيح التصفية بناءً على النطاقات أو المساواة (على سبيل المثال، <code translate="no">&gt;</code> ، <code translate="no">&lt;</code> ، ، <code translate="no">==</code>).</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code> / <code translate="no">varchar</code></p></td>
     <td><p>يُستخدم لفهرسة قيم السلسلة، وهو أمر شائع للبيانات النصية مثل الأسماء أو الفئات أو المعرفات.</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_BOOL</code> / <code translate="no">array_bool</code></p></td>
     <td><p>يُستخدم لفهرسة مصفوفة من القيم المنطقية.</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_DOUBLE</code> / <code translate="no">array_double</code></p></td>
     <td><p>يُستخدم لفهرسة مصفوفة من القيم الرقمية.</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_VARCHAR</code> / <code translate="no">array_varchar</code></p></td>
     <td><p>تُستخدم لفهرسة مصفوفة من السلاسل، وهي مثالية لقائمة من العلامات أو الكلمات الرئيسية.</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JSON</code> / <code translate="no">json</code></p></td>
     <td><p>كائنات JSON بأكملها أو كائنات فرعية مع الاستدلال التلقائي للنوع وتسويته.</p><p>تزيد فهرسة كائنات JSON بأكملها من حجم الفهرس. بالنسبة للسيناريوهات ذات المفاتيح المتعددة، ضع في اعتبارك <a href="/docs/ar/json-shredding.md">فهرسة JSON Shredding</a>.</p></td>
     <td><p>أي كائن JSON</p></td>
   </tr>
</table>
<div class="alert note">
<p>يجب أن تحتوي المصفوفات على عناصر من نفس النوع للفهرسة المثلى. لمزيد من المعلومات، راجع <a href="/docs/ar/array_data_type.md">حقل المصفوفات</a>.</p>
</div>
<h3 id="Supported-cast-functions" class="common-anchor-header">دوال الإرسال المدعومة<button data-href="#Supported-cast-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كان مفتاح حقل JSON الخاص بك يحتوي على قيم بتنسيق غير صحيح (على سبيل المثال، الأرقام المخزنة كسلاسل)، يمكنك تمرير دالة الإرسال إلى الوسيطة <code translate="no">json_cast_function</code> لتحويل هذه القيم في وقت الفهرسة.</p>
<p>دوال الإرسال غير حساسة لحالة الأحرف. الدوال التالية مدعومة:</p>
<table>
   <tr>
     <th><p>دالة الإرسال</p></th>
     <th><p>التحويل من → إلى</p></th>
     <th><p>حالة الاستخدام</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">STRING_TO_DOUBLE</code> / <code translate="no">string_to_double</code></p></td>
     <td><p>سلسلة → عددية (مزدوجة)</p></td>
     <td><p>تحويل <code translate="no">"99.99"</code> إلى <code translate="no">99.99</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>في حالة فشل التحويل (على سبيل المثال، سلسلة غير رقمية)، يتم تخطي القيمة وعدم فهرستها.</p>
</div>
<h2 id="Create-JSON-indexes" class="common-anchor-header">إنشاء فهارس JSON<button data-href="#Create-JSON-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح هذا القسم كيفية إنشاء فهارس على أنواع مختلفة من بيانات JSON باستخدام أمثلة عملية. تستخدم جميع الأمثلة نموذج بنية JSON الموضحة أدناه وتفترض أنك قد أنشأت بالفعل اتصالاً ب <strong>MilvusClient</strong> مع مخطط مجموعة محدد بشكل صحيح.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">نموذج بنية JSON<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
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
<h3 id="Basic-setup" class="common-anchor-header">الإعداد الأساسي<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل إنشاء أي فهارس JSON، قم بإعداد معلمات الفهرس:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-1-Index-a-simple-JSON-key" class="common-anchor-header">مثال 1: فهرسة مفتاح JSON بسيط<button data-href="#Example-1-Index-a-simple-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بإنشاء فهرس على الحقل <code translate="no">category</code> لتمكين التصفية السريعة حسب فئة المنتج:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">مثال 2: فهرسة مفتاح متداخل<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بإنشاء فهرس على الحقل <code translate="no">email</code> المتداخل بعمق للبحث عن جهات اتصال الموردين:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the nested JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Convert-data-type-at-index-time" class="common-anchor-header">مثال 3: تحويل نوع البيانات في وقت الفهرس<button data-href="#Example-3-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>في بعض الأحيان يتم تخزين البيانات الرقمية عن طريق الخطأ كسلاسل. استخدم الدالة <code translate="no">STRING_TO_DOUBLE</code> cast لتحويلها وفهرستها بشكل صحيح:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>هام</strong>: في حالة فشل التحويل لأي مستند (على سبيل المثال، سلسلة غير رقمية مثل <code translate="no">&quot;invalid&quot;</code>)، سيتم استبعاد قيمة ذلك المستند من الفهرس ولن تظهر في النتائج التي تمت تصفيتها.</p>
<h3 id="Example-4-Index-entire-objects" class="common-anchor-header">مثال 4: فهرسة كائنات كاملة<button data-href="#Example-4-Index-entire-objects" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بفهرسة كائن JSON الكامل لتمكين الاستعلامات على أي حقل داخله. عندما تستخدم <code translate="no">json_cast_type=&quot;JSON&quot;</code> ، فإن النظام تلقائيًا:</p>
<ul>
<li><p><strong>تسطيح بنية JSON</strong>: يتم تحويل الكائنات المتداخلة إلى مسارات مسطحة للفهرسة الفعالة</p></li>
<li><p><strong>يستنتج أنواع البيانات</strong>: يتم تصنيف كل قيمة تلقائيًا على أنها رقمية أو سلسلة أو منطقية أو تاريخية بناءً على محتواها</p></li>
<li><p><strong>ينشئ تغطية شاملة</strong>: جميع المفاتيح والمسارات المتداخلة داخل الكائن تصبح قابلة للبحث</p></li>
</ul>
<p>بالنسبة <a href="/docs/ar/json-indexing.md#Sample-JSON-structure">لعينة بنية JSON</a> أعلاه، قم بفهرسة الكائن <code translate="no">metadata</code> بالكامل:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the entire JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أيضًا فهرسة جزء فقط من بنية JSON، مثل جميع المعلومات <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index a sub-object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-index-configuration" class="common-anchor-header">تطبيق تكوين الفهرس<button data-href="#Apply-index-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تحديد جميع معلمات الفهرس الخاصة بك، قم بتطبيقها على مجموعتك:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply all index configurations to the collection</span>
MilvusClient.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد اكتمال الفهرسة، ستستخدم استعلامات حقول JSON الخاصة بك تلقائيًا هذه الفهارس لتحقيق أداء أسرع.</p>
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
    </button></h2><h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">ماذا يحدث إذا كان تعبير عامل التصفية الخاص بالاستعلام يستخدم نوعًا مختلفًا عن نوع الجبيرة المفهرسة؟<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا كان تعبير عامل التصفية الخاص بك يستخدم نوعًا مختلفًا عن نوع الفهرس <code translate="no">json_cast_type</code> ، فلن يستخدم ميلفوس الفهرس وقد يعود إلى مسح فوري أبطأ إذا سمحت البيانات بذلك. للحصول على أفضل أداء، قم دائمًا بمحاذاة تعبير التصفية الخاص بك مع نوع الفهرس المصبوب. على سبيل المثال، إذا تم إنشاء فهرس رقمي باستخدام <code translate="no">json_cast_type=&quot;double&quot;</code> ، فإن شروط التصفية الرقمية فقط هي التي ستستفيد من الفهرس.</p>
<h3 id="When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">عند إنشاء فهرس JSON، ماذا لو كان مفتاح JSON يحتوي على أنواع بيانات غير متسقة عبر كيانات مختلفة؟<button data-href="#When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكن أن تؤدي الأنواع غير المتسقة إلى <strong>فهرسة جزئية</strong>. على سبيل المثال، إذا تم تخزين حقل <code translate="no">metadata[&quot;price&quot;]</code> كرقم (<code translate="no">99.99</code>) وسلسلة (<code translate="no">&quot;99.99&quot;</code>) وقمت بإنشاء فهرس باستخدام <code translate="no">json_cast_type=&quot;double&quot;</code> ، سيتم فهرسة القيم الرقمية فقط. سيتم تخطي إدخالات نموذج السلسلة ولن تظهر في نتائج التصفية.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">هل يمكنني إنشاء فهارس متعددة على نفس مفتاح JSON؟<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، كل مفتاح JSON يدعم فهرسًا واحدًا فقط. يجب عليك اختيار فهرس واحد <code translate="no">json_cast_type</code> يطابق بياناتك. ومع ذلك، يمكنك إنشاء فهرس على كائن JSON بأكمله وفهرس على مفتاح متداخل داخل هذا الكائن.</p>
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
    </button></h3><p>لا، لا تدعم حقول JSON القيم الافتراضية. ومع ذلك، يمكنك تعيين <code translate="no">nullable=True</code> عند تعريف الحقل للسماح بإدخالات فارغة. لمزيد من المعلومات، راجع <a href="/docs/ar/nullable-and-default.md">Nullable &amp; Default</a>.</p>
