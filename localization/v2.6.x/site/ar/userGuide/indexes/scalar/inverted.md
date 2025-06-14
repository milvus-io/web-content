---
id: inverted.md
title: مقلوب
summary: >-
  تم تصميم الفهرس المقلوب في Milvus لتسريع استعلامات التصفية على كل من الحقول
  القياسية وحقول JSON المهيكلة. من خلال تعيين المصطلحات إلى المستندات أو السجلات
  التي تحتوي عليها، تعمل الفهارس المقلوبة على تحسين أداء الاستعلام بشكل كبير
  مقارنةً بعمليات البحث الغاشمة.
---
<h1 id="INVERTED" class="common-anchor-header">مقلوب<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>تم تصميم الفهرس <code translate="no">INVERTED</code> في Milvus لتسريع استعلامات التصفية على كل من الحقول القياسية وحقول JSON المهيكلة. من خلال تعيين المصطلحات إلى المستندات أو السجلات التي تحتوي عليها، تعمل الفهارس المقلوبة على تحسين أداء الاستعلام بشكل كبير مقارنةً بعمليات البحث الغاشمة.</p>
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
    </button></h2><p>بدعم من <a href="https://github.com/quickwit-oss/tantivy">Tantivy،</a> يطبّق Milvus الفهرسة المقلوبة لتسريع استعلامات التصفية، خاصةً للبيانات النصية. إليك كيفية عملها</p>
<ol>
<li><p><strong>ترميز البيانات</strong>: يأخذ Milvus بياناتك الأولية - في هذا المثال، جملتان:</p>
<ul>
<li><p><strong>"Milvus هي قاعدة بيانات متجهة سحابية أصلية."</strong></p></li>
<li><p><strong>"Milvus جيد جدًا في الأداء."</strong></p></li>
</ul>
<p>ويقسمها إلى كلمات فريدة (على سبيل المثال، " <em>ميلفوس</em>"، <em>هي</em> <em>قاعدة</em> <em>بيانات</em> <em>سحابية</em> أصلية، <em>قاعدة بيانات</em> <em>متجهة،</em> <em>قاعدة بيان</em>ات، <em>جيد</em> <em>جداً،</em> جيد، <em>في،</em> <em>أداء</em>).</p></li>
<li><p><strong>بناء قاموس المصطلحات</strong>: يتم تخزين هذه الكلمات الفريدة في قائمة مرتبة تسمى <strong>قاموس</strong> المصطلحات. يتيح هذا القاموس لـ Milvus التحقق بسرعة من وجود كلمة ما وتحديد موقعها في الفهرس.</p></li>
<li><p><strong>إنشاء القائمة المقلوبة</strong>: لكل كلمة في قاموس المصطلحات، يحتفظ ميلفوس <strong>بقائمة</strong> مقلوبة توضح المستندات التي تحتوي على تلك الكلمة. على سبيل المثال، تظهر <strong>كلمة "Milvus"</strong> في كلتا الجملتين، لذا فإن القائمة المقلوبة تشير إلى كلا معرفي المستندين.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>مقلوب</span> </span></p>
<p>نظرًا لأنه يتم فرز القاموس، يمكن التعامل مع التصفية القائمة على المصطلحات بكفاءة. فبدلاً من مسح جميع المستندات، يبحث "ميلفوس" فقط عن المصطلح في القاموس ويسترجع قائمته المقلوبة - مما يسرّع بشكل كبير من عمليات البحث والتصفية على مجموعات البيانات الكبيرة.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">فهرسة حقل قياسي عادي<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة للحقول القياسية مثل <strong>BOOL</strong> و <strong>INT8</strong> و <strong>INT16</strong> و <strong>INT32</strong> و <strong>INT64</strong> و <strong>FLOAT و FLOAT</strong> و <strong>DOUBLE</strong> و <strong>VARCHAR</strong> و <strong>ARRAY،</strong> فإن إنشاء فهرس مقلوب أمر بسيط ومباشر. استخدم الأسلوب <code translate="no">create_index()</code> مع ضبط المعلمة <code translate="no">index_type</code> على <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">فهرسة حقل JSON<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>يوسع ميلفوس إمكانيات الفهرسة إلى حقول JSON، مما يسمح لك بتصفية البيانات المتداخلة أو المنظمة المخزنة داخل عمود واحد بكفاءة. على عكس الحقول العددية، عند فهرسة حقل JSON، يجب عليك توفير معلمتين إضافيتين:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> تحديد المفتاح المتداخل المراد فهرسته.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> يحدد نوع البيانات (على سبيل المثال، <code translate="no">&quot;varchar&quot;</code> أو <code translate="no">&quot;double&quot;</code> أو أو <code translate="no">&quot;bool&quot;</code>) التي سيتم إرسال قيمة JSON المستخرجة إليها.</p></li>
</ul>
<p>على سبيل المثال، ضع في اعتبارك حقل JSON المسمى <code translate="no">metadata</code> بالبنية التالية:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>لإنشاء فهارس مقلوبة على مسارات JSON محددة، يمكنك استخدام الطريقة التالية:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>مثال القيمة</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>اسم حقل JSON في مخططك.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>نوع الفهرس المراد إنشاؤه؛ حالياً فقط <code translate="no">INVERTED</code> مدعوم لفهرسة مسار JSON.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(اختياري) اسم فهرس مخصص. حدد أسماء مختلفة إذا قمت بإنشاء فهارس متعددة على نفس حقل JSON.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>تحديد مسار JSON المراد فهرسته. يمكنك استهداف مفاتيح متداخلة أو مواضع مصفوفة أو كليهما (على سبيل المثال، <code translate="no">metadata["product_info"]["category"]</code> أو <code translate="no">metadata["tags"][0]</code>). إذا كان المسار مفقودًا أو كان عنصر المصفوفة غير موجود لصف معين، يتم ببساطة تخطي هذا الصف أثناء الفهرسة، ولا يتم طرح أي خطأ.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>نوع البيانات الذي سيقوم ميلفوس بإرسال قيم JSON المستخرجة إليه عند بناء الفهرس. القيم الصالحة:</p>
<ul>
<li><p><code translate="no">"bool"</code> أو <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> أو <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> أو <code translate="no">"VARCHAR"</code></p>
<p><strong>ملاحظة</strong>: بالنسبة لقيم الأعداد الصحيحة، يستخدم Milvus داخليًا مزدوجًا للفهرس. الأعداد الصحيحة الكبيرة التي تزيد عن 2^53 تفقد الدقة. إذا فشلت عملية الإرسال (بسبب عدم تطابق النوع)، لا يتم طرح أي خطأ، ولا تتم فهرسة قيمة ذلك الصف.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">اعتبارات حول فهرسة JSON<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>منطق الفهرسة</strong>:</p>
<ul>
<li><p>إذا <strong>أنشأت فهرسًا من النوع المزدوج</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>)، يمكن فقط لشروط التصفية من النوع الرقمي استخدام الفهرس. إذا قارن عامل التصفية فهرسًا مزدوجًا بشرط غير رقمي، فإن ميلفوس يعود إلى البحث بالقوة الغاشمة.</p></li>
<li><p>إذا قمت <strong>بإنشاء فهرس من نوع varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>)، يمكن فقط لشروط التصفية من نوع السلسلة استخدام الفهرس. خلاف ذلك، يعود ميلفوس إلى القوة الغاشمة.</p></li>
<li><p>تتصرف الفهرسة<strong>المنطقية</strong> بشكل مشابه للنوع المتغير.</p></li>
</ul></li>
<li><p><strong>تعبيرات المصطلحات</strong>:</p>
<ul>
<li>يمكنك استخدام <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. ومع ذلك، يعمل الفهرس فقط للقيم العددية المخزنة تحت هذا المسار. إذا كان <code translate="no">json[&quot;field&quot;]</code> عبارة عن مصفوفة، يعود الاستعلام إلى القوة الغاشمة (الفهرسة من نوع الصفيف غير مدعومة بعد).</li>
</ul></li>
<li><p><strong>الدقة العددية</strong>:</p>
<ul>
<li>داخليًا، يقوم ميلفوس بفهرسة جميع الحقول الرقمية كمضاعفات. إذا تجاوزت قيمة رقمية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2532</mn></msup></mrow><annotation encoding="application/x-tex">^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53،</span></span></span></span></span></span></span></span></span></span></span></span> فإنها تفقد الدقة، وقد لا تتطابق الاستعلامات على تلك القيم خارج النطاق تمامًا.</li>
</ul></li>
<li><p><strong>تكامل البيانات</strong>:</p>
<ul>
<li>لا يقوم Milvus بتحليل مفاتيح JSON أو تحويلها خارج نطاق الصب المحدد. إذا كانت البيانات المصدر غير متناسقة (على سبيل المثال، تخزن بعض الصفوف سلسلة للمفتاح <code translate="no">&quot;k&quot;</code> بينما تخزن أخرى رقمًا)، فلن تتم فهرسة بعض الصفوف.</li>
</ul></li>
</ul>
