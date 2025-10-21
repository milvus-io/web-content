---
id: stl-sort.md
title: STL_SORT
summary: >-
  فهرس STL_SORT هو نوع فهرس مصمم خصيصًا لتحسين أداء الاستعلام على الحقول الرقمية
  (INT8، INT16، إلخ) أو حقول TIMESTAMPTZ داخل Milvus من خلال تنظيم البيانات
  بترتيب مرتب.
---
<h1 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h1><p>الفهرس <code translate="no">STL_SORT</code> هو نوع فهرس مصمم خصيصًا لتحسين أداء الاستعلام على الحقول الرقمية (INT8، INT16، إلخ) أو حقول <code translate="no">TIMESTAMPTZ</code> داخل Milvus من خلال تنظيم البيانات بترتيب مرتب.</p>
<p>استخدم الفهرس <code translate="no">STL_SORT</code> إذا كنت تقوم بتشغيل الاستعلامات بشكل متكرر مع:</p>
<ul>
<li><p>تصفية المقارنة باستخدام <code translate="no">==</code> و <code translate="no">!=</code> و و <code translate="no">&gt;</code> و <code translate="no">&lt;</code> و <code translate="no">&gt;=</code> و <code translate="no">&lt;=</code> </p></li>
<li><p>تصفية النطاق باستخدام المشغلين <code translate="no">IN</code> و <code translate="no">LIKE</code> </p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">أنواع البيانات المدعومة<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><p>الحقول العددية (على سبيل المثال، <code translate="no">INT8</code> ، <code translate="no">INT16</code> ، ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">FLOAT</code> ، <code translate="no">DOUBLE</code>). لمزيد من التفاصيل، راجع الحقول <a href="/docs/ar/number.md">المنطقية والعددية</a>.</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> الحقول. لمزيد من التفاصيل، راجع <a href="/docs/ar/timestamptz-field.md">حقل TIMESTAMPTZ</a>.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيف يعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>ينفذ ميلفوس <code translate="no">STL_SORT</code> على مرحلتين:</p>
<ol>
<li><p><strong>بناء الفهرس</strong></p>
<ul>
<li><p>أثناء الاستيعاب، يجمع Milvus جميع القيم للحقل المفهرس.</p></li>
<li><p>يتم فرز القيم بترتيب تصاعدي باستخدام <a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std:::sort</a> الخاص بـ C++ STL.</p></li>
<li><p>يتم إقران كل قيمة بمعرف الكيان الخاص بها، ويتم استمرار المصفوفة المصنفة كفهرس.</p></li>
</ul></li>
<li><p><strong>تسريع الاستعلامات</strong></p>
<ul>
<li><p>في وقت الاستعلام، يستخدم Milvus <strong>بحثًا ثنائيًا</strong><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">(std::Lower_bound</a> و <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>) على المصفوفة المصنفة.</p></li>
<li><p>بالنسبة للتساوي، يعثر ميلفوس بسرعة على جميع القيم المطابقة.</p></li>
<li><p>بالنسبة للنطاقات، يحدد Milvus موقعي البداية والنهاية ويعيد جميع القيم بينهما.</p></li>
<li><p>يتم تمرير معرفات الكيانات المطابقة إلى منفذ الاستعلام لتجميع النتائج النهائية.</p></li>
</ul></li>
</ol>
<p>وهذا يقلل من تعقيد الاستعلام من <strong>O(n)</strong> (مسح كامل) إلى <strong>O(log n + m)</strong>، حيث <em>m</em> هو عدد مرات التطابق.</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">إنشاء فهرس STL_SORT<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إنشاء فهرس <code translate="no">STL_SORT</code> على حقل رقمي أو <code translate="no">TIMESTAMPTZ</code>. لا توجد معلمات إضافية مطلوبة.</p>
<p>يوضح المثال أدناه كيفية إنشاء فهرس <code translate="no">STL_SORT</code> على حقل <code translate="no">TIMESTAMPTZ</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;tsz&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;tsz&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,   <span class="hljs-comment"># Index for TIMESTAMPTZ</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">ملاحظات الاستخدام<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>أنواع الحقول:</strong> يعمل مع الحقول الرقمية و <code translate="no">TIMESTAMPTZ</code>. لمزيد من المعلومات حول أنواع البيانات، راجع <a href="/docs/ar/timestamptz-field.md">الحقل</a> <a href="/docs/ar/number.md">المنطقي والرقم</a> <a href="/docs/ar/timestamptz-field.md">وحقل TIMESTAMPTZ</a>.</p></li>
<li><p><strong>المعلمات:</strong> لا حاجة إلى معلمات فهرس.</p></li>
<li><p><strong>Mmap غير مدعوم:</strong> وضع تعيين الذاكرة غير متاح لـ <code translate="no">STL_SORT</code>.</p></li>
</ul>
