---
id: grouping-search-with-structarray.md
title: تجميع نتائج البحث باستخدام StructArray
summary: >-
  استخدم هذه الصفحة لتجميع نتائج البحث على مستوى عناصر StructArray حسب الكيان
  الأصلي. قد يُسفر البحث على مستوى العناصر عن عدة نتائج من نفس الكيان عندما
  تتطابق عدة عناصر Struct مع الاستعلام. ويؤدي التجميع إلى طي تلك النتائج
  المتعلقة بالعناصر بحيث يظهر كل كيان أصلي مرة واحدة على الأكثر.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">تجميع نتائج البحث باستخدام StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم هذه الصفحة لتجميع نتائج البحث على مستوى عناصر StructArray حسب الكيان الأصلي. يمكن أن يُرجع البحث على مستوى العناصر عدة نتائج من نفس الكيان عندما تتطابق عدة عناصر Struct مع الاستعلام. يؤدي التجميع إلى طي نتائج العناصر هذه بحيث يظهر كل كيان أصلي مرة واحدة على الأكثر.</p>
<p>تستخدم هذه الصفحة المجموعة « <code translate="no">tech_articles</code> » من <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>». تحتوي المجموعة على حقل StructArray باسم « <code translate="no">chunks</code> ». يتم فهرسة الحقل الفرعي « <code translate="no">chunks[emb]</code> » للبحث على مستوى العناصر باستخدام مقياس متجه عادي.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">كيفية تطبيق التجميع على StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>وضع البحث</th><th>سلوك التجميع</th><th>سلوك النتائج</th></tr>
</thead>
<tbody>
<tr><td>البحث في EmbeddingList</td><td>غير مدعوم.</td><td>غير قابل للتطبيق.</td></tr>
<tr><td>البحث على مستوى العنصر</td><td>مدعوم من خلال التجميع على المفتاح الأساسي.</td><td>يُرجع نتيجة واحدة كحد أقصى لكل كيان أبوي. يتم الاحتفاظ بالبيانات الوصفية على مستوى العنصر، لذا يمكن إرجاع فهرس العنصر المحدد أو الإزاحة عند عرضها بواسطة واجهة برمجة التطبيقات (API) أو مجموعة أدوات تطوير البرامج (SDK).</td></tr>
<tr><td>البحث المختلط</td><td>يتم دعمه فقط عندما تستهدف جميع عمليات البحث الفرعية حقول متجهة على مستوى العنصر ضمن حقل StructArray نفسه.</td><td>يتم تجميع عمليات البحث الفرعية على مستوى العنصر حسب المفتاح الأساسي قبل معالجة النتيجة النهائية.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>استخدم التجميع عندما يعرض البحث على مستوى العنصر غير المجمّع عددًا كبيرًا جدًّا من الكيانات الأصلية المكررة. إذا كنت تريد أن يُعامل كل عنصر Struct مطابق على أنه نتيجة فردية، فاستخدم <a href="/docs/ar/basic-vector-search-with-structarray.md">"البحث المتجه الأساسي" مع StructArray</a> بدون <code translate="no">group_by_field</code>.</p>
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
    </button></h2><p>قم بإعداد المجموعة والبيانات والفهارس قبل تشغيل البحث المجمّع.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>الحقل الفرعي المتجه على مستوى العنصر</td><td>استخدم حقل فرعي متجه من نوع StructArray مثل <code translate="no">chunks[emb]</code> ، مفهرسًا باستخدام مقياس متجه عادي.</td></tr>
<tr><td>استعلام متجه عادي</td><td>استخدم متجه استعلام عادي، وليس <code translate="no">EmbeddingList</code>.</td></tr>
<tr><td>تجميع المفتاح الأساسي</td><td>استخدم المفتاح الأساسي للمجموعة كـ <code translate="no">group_by_field</code> ، مثل <code translate="no">doc_id</code>.</td></tr>
<tr><td>عدم استخدام معلمات النطاق</td><td>لا تجمع بين البحث التجميعي ومعلمات البحث عن النطاق مثل <code translate="no">radius</code> أو <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>لإعداد الفهرس، راجع <a href="/docs/ar/index-structarray-fields.md">حقول StructArray في الفهرس</a>.</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">تنفيذ البحث المجمّع على مستوى العناصر<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>يبحث المثال التالي في الأجزاء الفردية أولاً، ثم يجمع نتائج العناصر حسب المفتاح الأساسي للكيان الأصلي.</p>
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
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>بدون التجميع، يمكن أن يظهر نفس <code translate="no">doc_id</code> عدة مرات إذا كانت هناك عدة أجزاء تتطابق مع الاستعلام. مع <code translate="no">group_by_field=&quot;doc_id&quot;</code> ، يظهر كل كيان أب مرة واحدة على الأكثر. يحافظ التجميع على البيانات الوصفية على مستوى العنصر، لذا يمكن أن تتضمن النتيجة المجمعة مؤشر عنصر Struct المحدد أو الإزاحة عندما تكشفها واجهة برمجة التطبيقات (API) أو حزمة تطوير البرامج (SDK).</p>
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
    </button></h2><p>يمكنك الجمع بين البحث المجمّع وتصفية StructArray القياسية. استخدم <code translate="no">element_filter</code> عندما يجب أن يقيد الشرط القياسي عناصر Struct التي تشارك في البحث المتجهي على مستوى العنصر.</p>
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
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>تقوم المسندات ذات المستوى الأعلى باختيار الكيانات المرشحة. ويقصر مسند <code translate="no">element_filter</code> البحث المتجهي على مستوى العنصر على عناصر Struct المطابقة. ثم تقوم عملية التجميع بطي نتائج العناصر المطابقة حسب المفتاح الأساسي.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">استخدم التجميع في البحث المختلط<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>يُعد التجميع الهجين باستخدام StructArray ميزة على مستوى العنصر. ولا يتم دعمه إلا عندما تستهدف جميع عمليات البحث الفرعية حقول متجهات على مستوى العنصر ضمن حقل StructArray نفسه. لا تستخدم الطلبات على مستوى EmbeddingList في البحث الهجين المجمّع باستخدام StructArray.</p>
<p>يفترض المثال التالي أن حقل StructArray <code translate="no">chunks</code> يحتوي على حقلين فرعيين متجهين على مستوى العنصر، وهما <code translate="no">chunks[emb]</code> و <code translate="no">chunks[code_emb]</code> ، وكلاهما مفهرس بمقاييس متجهة عادية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، تستهدف كلتا الطلبات الفرعية حقول متجهة على مستوى العنصر ضمن حقل StructArray نفسه، <code translate="no">chunks</code>. لا يدعم البحث الهجين التجميع على مستوى العنصر إذا كان يخلط بين حقول متجهة عادية، أو حقول StructArray مختلفة، أو طلبات على مستوى EmbeddingList.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">تفسير النتائج المجمعة<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>المفتاح الأساسي للكيان الأصلي المجمّع.</td></tr>
<tr><td><code translate="no">distance</code> أو النتيجة</td><td>النتيجة أو المسافة لعنصر Struct المحدد لذلك الكيان الأصلي.</td></tr>
<tr><td><code translate="no">offset</code></td><td>الموضع الذي يبدأ من الصفر لعنصر Struct المحدد عند إرجاعه.</td></tr>
<tr><td>المفاتيح الأساسية المتكررة</td><td>غير متوقع عند التجميع حسب المفتاح الأساسي.</td></tr>
<tr><td><code translate="no">limit</code></td><td>ينطبق على نتائج الكيانات الأصلية المجمعة.</td></tr>
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
<li><p>لا ينطبق البحث بالتجميع إلا على البحث في متجه StructArray على مستوى العنصر. لا يدعم البحث في EmbeddingList والبحث الهجين على مستوى EmbeddingList التجميع.</p></li>
<li><p>استخدم المفتاح الأساسي كـ <code translate="no">group_by_field</code>. لا يُعد التجميع على مستوى عناصر StructArray عملية تجميع عامة الغرض عبر حقول قياسية عشوائية.</p></li>
<li><p>لا تقم بدمج البحث المجمّع مع البحث النطاقي.</p></li>
<li><p>لا تستخدم استعلام <code translate="no">EmbeddingList</code> أو مقياس <code translate="no">MAX_SIM*</code> للبحث المجمّع.</p></li>
<li><p>يتم دعم التجميع الهجين فقط عندما تستهدف جميع عمليات البحث الفرعية حقول متجهة على مستوى العنصر ضمن نفس حقل StructArray.</p></li>
<li><p>لا يتم دعم التجميع الهجين عندما يخلط البحث الهجين بين حقل متجه عادي، أو حقل StructArray مختلف، أو طلب على مستوى EmbeddingList.</p></li>
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
<li><p>استخدام التجميع مع <code translate="no">chunks[emb_list_vector]</code> ، وهو مخصص للبحث في EmbeddingList.</p></li>
<li><p>التجميع حسب حقل قياسي غير مفتاح أساسي.</p></li>
<li><p>التجميع حسب حقول متعددة. لا يدعم التجميع على مستوى العناصر في StructArray سوى التجميع حسب المفتاح الأساسي.</p></li>
<li><p>توقع أن تمثل النتائج المجمعة كل عنصر Struct مطابق. يعرض التجميع نتيجة واحدة على الأكثر لكل كيان أب.</p></li>
<li><p>الافتراض بأن البحث المجمّع على مستوى العناصر يعيد حساب درجة " <code translate="no">MAX_SIM*</code> " بنمط EmbeddingList. يؤدي التجميع إلى طي النتائج المطابقة على مستوى العناصر؛ ولا يغير نموذج التقييم.</p></li>
<li><p>الجمع بين <code translate="no">group_by_field</code> و <code translate="no">radius</code> أو <code translate="no">range_filter</code>.</p></li>
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
<li><p>لتعلم البحث على مستوى العناصر غير المجمعة أولاً، اقرأ <a href="/docs/ar/basic-vector-search-with-structarray.md">«البحث المتجهي الأساسي باستخدام StructArray</a>».</p></li>
<li><p>لإضافة مرشحات قياسية إلى البحث المجمّع، اقرأ <a href="/docs/ar/filtered-search-with-structarray.md">«البحث المُصفّى باستخدام StructArray</a>».</p></li>
<li><p>لاستخدام حدود التقييم أو المسافة بدلاً من التجميع، اقرأ <a href="/docs/ar/range-search-with-structarray.md">البحث في النطاق باستخدام StructArray</a>.</p></li>
<li><p>للتحقق من حدود البحث في StructArray، اقرأ <a href="/docs/ar/structarray-limits.md">«حدود StructArray</a>».</p></li>
</ol>
