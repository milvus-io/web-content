---
id: range-search-with-structarray.md
title: البحث في نطاق مع StructArray
summary: >-
  استخدم هذه الصفحة لإجراء بحث النطاق على الحقول الفرعية المتجهة في StructArray.
  يُرجع بحث النطاق نتائج متجهة تقع درجاتها أو مسافاتها ضمن الحدود المحددة.
  بالنسبة لحقول StructArray، استخدم بحث النطاق مع البحث المتجه على مستوى
  العناصر، حيث يتم البحث في كل عنصر من عناصر Struct بشكل مستقل.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">البحث في نطاق مع StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم هذه الصفحة لإجراء بحث النطاق على الحقول الفرعية للمتجه StructArray. يُرجع بحث النطاق نتائج المتجهات التي تقع درجاتها أو مسافاتها ضمن حدود محددة. بالنسبة لحقول StructArray، استخدم بحث النطاق مع بحث المتجهات على مستوى العناصر، حيث يتم البحث في كل عنصر من عناصر Struct بشكل مستقل.</p>
<p>تستخدم هذه الصفحة المجموعة « <code translate="no">tech_articles</code> » من <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>». تحتوي المجموعة على حقل StructArray باسم « <code translate="no">chunks</code> ». يتم فهرسة الحقل الفرعي المتجه « <code translate="no">chunks[emb]</code> » للبحث على مستوى العناصر باستخدام مقياس متجه عادي مثل « <code translate="no">COSINE</code> » أو « <code translate="no">IP</code> » أو « <code translate="no">L2</code> ».</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">كيفية تطبيق البحث عن النطاق على StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<thead>
<tr><th>وضع البحث</th><th>سلوك البحث عن النطاق</th><th>دقة النتائج</th></tr>
</thead>
<tbody>
<tr><td>البحث في EmbeddingList</td><td>غير مدعوم.</td><td>غير قابل للتطبيق.</td></tr>
<tr><td>البحث على مستوى العناصر</td><td>استخدم استعلام متجه عادي باستخدام <code translate="no">radius</code> ، واختياريًا، <code translate="no">range_filter</code>.</td><td>مستوى عنصر البنية.</td></tr>
<tr><td>البحث المختلط</td><td>يتم دعمه عندما يستهدف طلب StructArray حقل متجه على مستوى العنصر. لا تدعم الطلبات على مستوى EmbeddingList البحث عن النطاق.</td><td>البحث الفرعي على مستوى العناصر، ثم إعادة الترتيب الهجين.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>إذا كنت بحاجة إلى عناصر Struct الأقرب فقط، فابدأ <a href="/docs/ar/basic-vector-search-with-structarray.md">بالبحث المتجه الأساسي باستخدام StructArray</a>. استخدم البحث في النطاق عندما يجب أن تستوفي النتيجة حدًا معينًا للدرجة أو المسافة بدلاً من مجرد ترتيب أعلى K.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">قبل البدء<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإعداد المجموعة والبيانات والفهارس قبل تشغيل البحث في النطاق.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>حقل StructArray</td><td>تحتوي المجموعة على حقل StructArray مثل <code translate="no">chunks</code>.</td></tr>
<tr><td>الحقل الفرعي للمتجه على مستوى العنصر</td><td>الحقل الفرعي للمتجه المستهدف هو <code translate="no">chunks[emb]</code> ، وليس <code translate="no">chunks[emb_list_vector]</code>.</td></tr>
<tr><td>مقياس الفهرسة</td><td>يتم فهرسة الحقل الفرعي للمتجه باستخدام مقياس متجه عادي، مثل <code translate="no">COSINE</code> أو <code translate="no">IP</code> أو <code translate="no">L2</code>.</td></tr>
<tr><td>بيانات الاستعلام</td><td>الاستعلام هو متجه عادي، وليس <code translate="no">EmbeddingList</code>.</td></tr>
</tbody>
</table>
<p>لإعداد الفهرس، راجع <a href="/docs/ar/index-structarray-fields.md">حقول StructArray في الفهرس</a>.</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">استخدم radius و range_filter<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>اضبط <code translate="no">radius</code> لتحديد حدود البحث. اضبط <code translate="no">range_filter</code> عندما تحتاج إلى حدود داخلية أيضًا. يعتمد الاتجاه على ما إذا كانت المسافة الأقصر هي الأفضل أم أن درجة التشابه الأكبر هي الأفضل.</p>
<table>
<thead>
<tr><th>نوع المقياس</th><th>هل الدرجة الأعلى هي الأفضل؟</th><th>شرط النطاق عند استخدام <code translate="no">range_filter</code> </th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>لا. المسافة الأقصر هي الأفضل.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>، <code translate="no">COSINE</code></td><td>نعم. كلما زادت النتيجة، كان ذلك أفضل.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>عند تعيين " <code translate="no">radius</code> " فقط، يعرض البحث عن النطاق النتائج التي تستوفي الحد الخارجي للمقياس. اختر القيم وفقًا لمقياس الدرجة أو المسافة الخاص بعمليات التضمين الخاصة بك.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">تشغيل البحث في النطاق على مستوى العناصر<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>يبحث المثال التالي عن مقاطع فردية تكون متجهات <code translate="no">chunks[emb]</code> الخاصة بها مشابهة بدرجة كافية لمتجه الاستعلام. تمثل كل نتيجة مطابقة عنصر Struct مطابقًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، يُعد « <code translate="no">COSINE</code> » مقياسًا من نوع التشابه، لذا فإن نطاق النتيجة أكبر من <code translate="no">radius</code> وأصغر من أو يساوي <code translate="no">range_filter</code>. تحدد قيمة « <code translate="no">offset</code> » عنصر Struct المطابق في المصفوفة <code translate="no">chunks</code> عند إرجاعها.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">إضافة عوامل تصفية قياسية<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك الجمع بين البحث عن النطاق على مستوى العناصر والتصفية القياسية لـ StructArray. استخدم مسندًا من المستوى الأعلى لحقول الكيان الأصلي، واستخدم <code translate="no">element_filter</code> لتقييد عناصر Struct التي تشارك في البحث عن نطاق المتجه.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>تقوم المسلمة ذات المستوى الأعلى باختيار الكيانات المرشحة. أما مسلمة <code translate="no">element_filter</code> فتقصر البحث عن النطاق المتجه على عناصر Struct المطابقة. لمزيد من أمثلة التصفية، راجع <a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a>.</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">استخدام البحث عن النطاق في البحث المختلط<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>تدعم حقول المتجهات على مستوى العناصر في StructArray البحث عن النطاق في البحث المختلط. أضف <code translate="no">radius</code> و، اختياريًا، <code translate="no">range_filter</code> إلى <code translate="no">AnnSearchRequest</code> الذي يستهدف حقل المتجهات على مستوى العناصر في StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، يستخدم الطلب الفرعي <code translate="no">chunks[emb]</code> فقط معلمات البحث عن النطاق. ولا يزال طلب StructArray يتبع دلالات مستوى العنصر: حيث تنطبق حدود النطاق على نتائج عنصر Struct قبل أن يقوم البحث الهجين بدمج النتائج وإعادة ترتيبها.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">تفسير نتائج النطاق<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<thead>
<tr><th>عنصر النتيجة</th><th>المعنى</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>المفتاح الأساسي للكيان الذي يحتوي على عنصر Struct المطابق.</td></tr>
<tr><td><code translate="no">distance</code> أو النتيجة</td><td>النتيجة أو المسافة بين متجه الاستعلام ومتجه عنصر Struct المطابق.</td></tr>
<tr><td><code translate="no">offset</code></td><td>الموضع الذي يبدأ من الصفر لعنصر Struct المطابق في حقل StructArray عند إرجاعه.</td></tr>
<tr><td>المفاتيح الأساسية المتكررة</td><td>ممكن. يمكن أن يقع أكثر من عنصر Struct واحد في نفس الكيان ضمن النطاق المحدد.</td></tr>
<tr><td><code translate="no">limit</code></td><td>ينطبق على نتائج العناصر، وليس على الكيانات الأصلية الفريدة.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">القيود<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>لا تستخدم استعلام " <code translate="no">EmbeddingList</code> " أو مقياس " <code translate="no">MAX_SIM*</code> " للبحث عن النطاق في الحقول الفرعية للمتجه StructArray. لا يدعم البحث على مستوى EmbeddingList البحث عن النطاق.</p></li>
<li><p>لا تجمع بين البحث في النطاق والبحث المجمّع. إذا كنت بحاجة إلى نتيجة واحدة لكل كيان أبوي، فقم بتشغيل بحث على مستوى العنصر بدون معلمات النطاق واستخدم التجميع حيثما كان ذلك مدعومًا.</p></li>
<li><p>يتم دعم البحث النطاقي المختلط لحقول المتجهات على مستوى العناصر في StructArray. ولا يتم دعمه لطلبات StructArray على مستوى EmbeddingList.</p></li>
</ul>
<h2 id="Common-mistakes" class="common-anchor-header">الأخطاء الشائعة<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>تشغيل البحث النطاقي على <code translate="no">chunks[emb_list_vector]</code> ، وهو مخصص للبحث على مستوى EmbeddingList.</p></li>
<li><p>استخدام <code translate="no">MAX_SIM_COSINE</code> بدلاً من مقياس عادي مثل <code translate="no">COSINE</code> للبحث في النطاق على مستوى العنصر.</p></li>
<li><p>استخدام استعلام <code translate="no">EmbeddingList</code> بدلاً من استعلام متجه عادي.</p></li>
<li><p>توقع أن تكون نتائج البحث عن النطاق فريدة لكل كيان أبوي. يعرض البحث عن النطاق نتائج مطابقة لعناصر Struct.</p></li>
<li><p>استخدام <code translate="no">chunks.emb</code> بدلاً من صيغة مسار الحقل الفرعي المطلوبة <code translate="no">chunks[emb]</code>.</p></li>
</ul>
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
    </button></h2><ol>
<li><p>لمعرفة وضعي البحث المتجهي الأساسيين لـ StructArray، اقرأ <a href="/docs/ar/basic-vector-search-with-structarray.md">البحث المتجهي الأساسي باستخدام StructArray</a>.</p></li>
<li><p>لإضافة عوامل تصفية قياسية إلى البحث في النطاق، اقرأ <a href="/docs/ar/filtered-search-with-structarray.md">«البحث المُصفى باستخدام StructArray</a>».</p></li>
<li><p>لإرجاع نتيجة واحدة على الأكثر لكل كيان أب حيثما كان ذلك مدعومًا، اقرأ " <a href="/docs/ar/grouping-search-with-structarray.md">البحث المجمّع باستخدام StructArray</a>".</p></li>
<li><p>للتحقق من حدود البحث الخاصة بكل إصدار، اقرأ " <a href="/docs/ar/structarray-limits.md">حدود StructArray</a>".</p></li>
</ol>
