---
id: bin-flat.md
title: BIN_FLAT
summary: >-
  فهرس BIN_FLAT هو متغير من فهرس FLAT مصمم خصيصًا للتضمينات الثنائية. وهو يتفوق
  في التطبيقات التي يتطلب فيها البحث عن تشابه المتجهات دقة مثالية على مجموعات
  بيانات صغيرة نسبيًا بمقياس مليون. من خلال استخدام منهجية بحث شاملة - مقارنة كل
  مدخلات الهدف مع جميع المتجهات في مجموعة البيانات - يضمن لك مؤشر FLAT_FAT نتائج
  دقيقة. هذه الدقة تجعله معيارًا مثاليًا لتقييم أداء الفهارس الأخرى التي قد تقدم
  أقل من 100% استرجاع، على الرغم من أن منهجيته الشاملة تجعله أيضًا الخيار الأبطأ
  للبيانات واسعة النطاق.
---
<h1 id="BINFLAT" class="common-anchor-header">BIN_FLAT<button data-href="#BINFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>فهرس <strong>BIN_FLAT</strong> هو متغير من فهرس <strong>FLAT</strong> مصمم خصيصًا للتضمينات الثنائية. وهو يتفوق في التطبيقات التي يتطلب فيها البحث عن تشابه المتجهات دقة مثالية على مجموعات بيانات صغيرة نسبيًا بمقياس مليون. من خلال استخدام منهجية بحث شاملة - مقارنة كل مدخلات الهدف مع جميع المتجهات في مجموعة البيانات - يضمن لك مؤشر FLAT_FAT نتائج دقيقة. هذه الدقة تجعله معيارًا مثاليًا لتقييم أداء الفهارس الأخرى التي قد تقدم أقل من 100٪ استدعاء، على الرغم من أن منهجيته الشاملة تجعله أيضًا الخيار الأبطأ للبيانات واسعة النطاق.</p>
<h2 id="Build-index" class="common-anchor-header">بناء الفهرس<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس <code translate="no">BIN_FLAT</code> على حقل متجه في ميلفوس، استخدم طريقة <code translate="no">add_index()</code> ، مع تحديد المعلمات <code translate="no">index_type</code> و <code translate="no">metric_type</code> للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_binary_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;BIN_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={} <span class="hljs-comment"># No additional parameters required for BIN_FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">index_type</code>: نوع الفهرس المراد إنشاؤه. في هذا المثال، اضبط القيمة على <code translate="no">BIN_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: الطريقة المستخدمة لحساب المسافة بين المتجهات. تتضمن القيم المدعومة للتضمينات الثنائية <code translate="no">HAMMING</code> (افتراضي) و <code translate="no">JACCARD</code>. للحصول على التفاصيل، راجع <a href="/docs/ar/metric.md">أنواع المقاييس</a>.</p></li>
<li><p><code translate="no">params</code>: لا يلزم وجود معلمات إضافية لفهرس BIN_FLAT.</p></li>
</ul>
<p>بمجرد تكوين معلمات الفهرس، يمكنك إنشاء الفهرس باستخدام الأسلوب <code translate="no">create_index()</code> مباشرةً أو تمرير بارامترات الفهرس في الأسلوب <code translate="no">create_collection</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">البحث في الفهرس<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد إنشاء الفهرس وإدراج الكيانات، يمكنك إجراء عمليات بحث عن التشابه على الفهرس.</p>
<pre><code translate="no" class="language-python">res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;binary_vector_field&quot;</span>,  <span class="hljs-comment"># Binary vector field name</span>
    data=[query_binary_vector],  <span class="hljs-comment"># Query binary vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {}}  <span class="hljs-comment"># No additional parameters required for BIN_FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/binary-vector.md">المتجه الثنائي</a>.</p>
<h2 id="Index-params" class="common-anchor-header">بارامترات الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لفهرس BIN_FLAT، لا يلزم وجود معلمات إضافية سواء أثناء إنشاء الفهرس أو عملية البحث.</p>
