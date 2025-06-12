---
id: bitmap.md
title: BITMAP
related_key: bitmap
summary: >-
  فهرسة الصور النقطية هي تقنية فهرسة فعالة مصممة لتحسين أداء الاستعلام على
  الحقول العددية منخفضة الكمية.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>فهرسة الصور النقطية هي تقنية فهرسة فعالة مصممة لتحسين أداء الاستعلام على الحقول ذات العددية المنخفضة. تشير الكاردينالية إلى عدد القيم المميزة في الحقل. تعتبر الحقول التي تحتوي على عدد أقل من العناصر المميزة منخفضة الكاردينالية.</p>
<p>يساعد هذا النوع من الفهرس على تقليل وقت استرجاع الاستعلامات العددية من خلال تمثيل قيم الحقل بتنسيق ثنائي مضغوط وإجراء عمليات فعالة على هذه القيم. وبالمقارنة مع الأنواع الأخرى من الفهارس، عادةً ما تتمتع الفهارس النقطية بكفاءة مساحة أعلى وسرعات استعلام أسرع عند التعامل مع الحقول ذات البطاقات المنخفضة.</p>
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
    </button></h2><p>يجمع مصطلح الصورة النقطية بين كلمتين: <strong>بت</strong> <strong>وخريطة</strong>. يمثل البت أصغر وحدة بيانات في الكمبيوتر، والتي يمكن أن تحتوي فقط على قيمة <strong>0</strong> أو <strong>1</strong>. تشير الخريطة، في هذا السياق، إلى عملية تحويل البيانات وتنظيمها وفقًا للقيمة التي يجب تعيينها لـ 0 و1.</p>
<p>يتكون فهرس الصورة النقطية من مكونين رئيسيين: الخرائط النقطية والمفاتيح. تمثل المفاتيح القيم الفريدة في الحقل المفهرس. لكل قيمة فريدة، هناك صورة نقطية مقابلة لها. طول هذه الصور النقطية يساوي عدد السجلات في المجموعة. يتوافق كل بت في الصورة النقطية مع سجل في المجموعة. إذا كانت قيمة الحقل المفهرس في أحد السجلات تتطابق مع المفتاح، يتم تعيين البت المقابل إلى <strong>1،</strong> وإلا يتم تعيينه إلى <strong>0</strong>.</p>
<p>انظر إلى مجموعة من المستندات التي تحتوي على حقلي <strong>الفئة</strong> <strong>والعام</strong>. نريد استرداد المستندات التي تندرج ضمن الفئة <strong>التقنية</strong> والمفتوحة <strong>للجمهور</strong>. في هذه الحالة، تكون مفاتيح فهارس الصور النقطية لدينا هي <strong>التقنية</strong> <strong>والعامة</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>فهرسة الصور النقطية</span> </span></p>
<p>كما هو موضح في الشكل، فهارس الصور النقطية <strong>للفئة</strong> <strong>والعامة</strong> هي</p>
<ul>
<li><p><strong>تقني</strong>: [1، 0، 0، 1، 0، 0]، مما يدل على أن المستندين الأول والثالث فقط يقعان في الفئة <strong>التقنية</strong>.</p></li>
<li><p><strong>عام</strong>: [1، 0، 0، 0، 1، 0]، وهو ما يوضح أن المستندين الأول والرابع فقط متاحان <strong>للعامة</strong>.</p></li>
</ul>
<p>للعثور على المستندات التي تطابق كلا المعيارين، نقوم بإجراء عملية توافق بت على هاتين الخريطتين النقطيتين.</p>
<ul>
<li><strong>تقني</strong> <strong>وعام</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>تشير الصورة النقطية الناتجة [1، 0، 0، 0، 0، 0] إلى أن المستند الأول فقط<strong>(المعرف</strong> <strong>1</strong>) يستوفي كلا المعيارين. باستخدام الفهارس النقطية والعمليات النقطية الفعالة، يمكننا تضييق نطاق البحث بسرعة، مما يلغي الحاجة إلى مسح مجموعة البيانات بأكملها.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">إنشاء فهرس نقطي<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس صورة نقطية في ميلفوس، استخدم الطريقة <code translate="no">create_index()</code> وقم بتعيين المعلمة <code translate="no">index_type</code> إلى <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، نقوم في هذا المثال بإنشاء فهرس صورة نقطية على الحقل <code translate="no">category</code> من المجموعة <code translate="no">my_collection</code>. يُستخدم الأسلوب <code translate="no">add_index()</code> لتحديد اسم الحقل ونوع الفهرس واسم الفهرس.</p>
<p>بمجرد إنشاء فهرس الصورة النقطية، يمكنك استخدام المعلمة <code translate="no">filter</code> في عمليات الاستعلام لإجراء تصفية عددية استنادًا إلى الحقل المفهرس. يتيح لك ذلك تضييق نطاق نتائج البحث بكفاءة باستخدام الفهرس النقطي. لمزيد من المعلومات، راجع <a href="/docs/ar/boolean.md">تصفية البيانات الوصفية</a>.</p>
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
<li><p>الفهارس النقطية مدعومة فقط للحقول القياسية التي ليست مفاتيح أساسية.</p></li>
<li><p>يجب أن يكون نوع بيانات الحقل أحد ما يلي.</p>
<ul>
<li><p><code translate="no">BOOL</code>، <code translate="no">INT8</code> ، <code translate="no">INT16</code> ، ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (يجب أن تكون العناصر واحدة من: <code translate="no">BOOL</code> ، <code translate="no">INT8</code> ، ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>لا تدعم فهارس الصور النقطية أنواع البيانات التالية.</p>
<ul>
<li><p><code translate="no">FLOAT</code>، <code translate="no">DOUBLE</code>: أنواع الفاصلة العائمة غير متوافقة مع الطبيعة الثنائية لفهارس الصور النقطية.</p></li>
<li><p><code translate="no">JSON</code>: أنواع بيانات JSON لها بنية معقدة لا يمكن تمثيلها بكفاءة باستخدام فهارس الصور النقطية.</p></li>
</ul></li>
<li><p>فهارس الصور النقطية غير مناسبة للحقول ذات الكمية الكبيرة (أي الحقول التي تحتوي على عدد كبير من القيم المميزة).</p>
<ul>
<li><p>كمبدأ توجيهي عام، تكون فهارس الصور النقطية أكثر فعالية عندما تكون قيمة الحقل أقل من 500.</p></li>
<li><p>عندما تزيد الكاردينالية عن هذا الحد، تتضاءل مزايا أداء الفهارس النقطية، وتصبح نفقات التخزين الزائدة كبيرة.</p></li>
<li><p>بالنسبة للحقول ذات الكاردينالية العالية، فكر في استخدام تقنيات فهرسة بديلة مثل الفهارس المقلوبة، اعتمادًا على حالة الاستخدام المحددة ومتطلبات الاستعلام.</p></li>
</ul></li>
</ul>
