---
id: filtered-search-with-structarray.md
title: البحث المُصفى باستخدام StructArray
summary: >-
  استخدم هذه الصفحة لإضافة تصفية قيمية إلى البحث المتجهي في حقول StructArray.
  تتكون تصفية StructArray من مستويين: تعمل المرشحات على مستوى الصفوف على تحديد
  الكيانات الأصلية، بينما تحدد المرشحات على مستوى العناصر عناصر Struct التي
  تشارك في البحث المتجهي على مستوى العناصر.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">البحث المُصفى باستخدام StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم هذه الصفحة لإضافة تصفية قياسية إلى البحث المتجه في حقول StructArray. تتكون تصفية StructArray من مستويين: تعمل المرشحات على مستوى الصف على تحديد الكيانات الأصلية، بينما تحدد المرشحات على مستوى العنصر عناصر Struct التي تشارك في البحث المتجه على مستوى العنصر.</p>
<p>تستخدم هذه الصفحة مجموعة « <code translate="no">tech_articles</code> » من <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>». تحتوي المجموعة على حقل StructArray باسم « <code translate="no">chunks</code> »، مع حقول فرعية قياسية مثل « <code translate="no">section</code> » و« <code translate="no">page</code> » و« <code translate="no">quality_score</code> » و« <code translate="no">has_code</code> »، بالإضافة إلى حقول فرعية متجهة للبحث.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">اختر نوع المرشح<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>الهدف</th><th>الاستخدام</th><th>سلوك النتيجة</th></tr>
</thead>
<tbody>
<tr><td>التصفية حسب حقل قياسي من المستوى الأعلى، مثل <code translate="no">category</code>.</td><td>تعبير تصفية عادي.</td><td>يختار الكيانات الأصلية قبل البحث أو أثناءه.</td></tr>
<tr><td>تقييد البحث المتجهي على مستوى العنصر ليقتصر على عناصر Struct التي تتطابق مع الشروط القياسية.</td><td><code translate="no">element_filter</code>.</td><td>يبحث فقط في عناصر Struct المطابقة ويمكنه إرجاع إزاحات العناصر المطابقة.</td></tr>
<tr><td>تحديد الكيانات بناءً على ما إذا كانت أي عناصر من نوع Struct أو جميعها أو عدد محدد منها تتطابق مع المسند.</td><td><code translate="no">MATCH_ANY</code>، <code translate="no">MATCH_ALL</code> ، <code translate="no">MATCH_LEAST</code> ، <code translate="no">MATCH_MOST</code> ، أو <code translate="no">MATCH_EXACT</code>.</td><td>التصفية على مستوى الصف. لا تُرجع هذه العوامل إزاحات بحد ذاتها.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>تشرح هذه الصفحة كيفية استخدام عوامل تصفية StructArray في سير عمل البحث. للاطلاع على قواعد الصياغة الكاملة وأنواع المسندات المدعومة ومصفوفة المسندات غير المدعومة، راجع <a href="/docs/ar/struct-array-operators.md">عوامل StructArray</a>.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">التصفية حسب الحقول ذات المستوى الأعلى<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم تعبيرات التصفية العادية عندما ينتمي الشرط إلى الكيان الأصلي، وليس إلى عنصر Struct فردي. يعمل هذا مع كل من البحث EmbeddingList والبحث على مستوى العناصر.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>يختار التصفية أعلاه فقط الكيانات التي يكون حقل المستوى الأعلى الخاص بـ <code translate="no">category</code> فيها هو <code translate="no">&quot;search&quot;</code>. ولا يحدد عنصر Struct واحدًا مطابقًا.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">تصفية البحث المتجهي على مستوى العنصر<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم <code translate="no">element_filter(structArrayField, predicate)</code> عندما يجب أن تنطبق الشروط القياسية على نفس عنصر Struct الذي يشارك في البحث المتجهي على مستوى العنصر. داخل المسند، استخدم <code translate="no">$[subfield]</code> للإشارة إلى الحقول الفرعية القياسية لعنصر Struct الحالي.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>في هذا المثال، يختار المسند ذو المستوى الأعلى <code translate="no">category == &quot;search&quot;</code> الكيانات المرشحة، ويقصر <code translate="no">element_filter</code> البحث المتجهي على مستوى العنصر على المجموعات التي تتطابق فيها <code translate="no">section</code> و <code translate="no">quality_score</code> و <code translate="no">has_code</code> جميعها في نفس عنصر Struct.</p>
<div class="alert note">
<p>تحذير</p>
<p>عند دمج مسند من المستوى الأعلى مع <code translate="no">element_filter</code> ، ضع <code translate="no">element_filter</code> في نهاية التعبير. لا يمكن أن يحتوي تعبير التصفية إلا على <code translate="no">element_filter</code> واحد فقط، ولا يمكنك تضمين <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code> داخل عامل StructArray آخر.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">تصفية الكيانات باستخدام عوامل التشغيل MATCH<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم مشغلات « <code translate="no">MATCH_*</code> » عندما يتعين على التصفية تحديد ما إذا كانت الكيانات الأصلية مؤهلة بناءً على عناصر Struct الخاصة بها. هذه المشغلات هي عوامل تصفية على مستوى الصف: فهي تحدد الكيانات، لكنها لا تُرجع إزاحات العناصر بحد ذاتها.</p>
<table>
<thead>
<tr><th>المشغل</th><th>استخدمه عندما</th><th>مثال</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>يجب أن يستوفي عنصر Struct واحد على الأقل الشرط.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>يجب أن تستوفي جميع عناصر Struct الشرط.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>يجب أن تستوفي عناصر Struct التي لا يقل عددها عن <code translate="no">N</code> الشرط.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>يجب أن تستوفي عناصر Struct التي لا يتجاوز عددها <code translate="no">N</code> الشرط.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>يجب أن تستوفي عناصر Struct التي يبلغ عددها بالضبط <code translate="no">N</code> الشرط.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>استخدم " <code translate="no">MATCH_ANY</code> " هنا لأن نتيجة البحث في EmbeddingList تكون على مستوى الكيان. يتطلب المرشح أن تكون هناك قطعة واحدة على الأقل في الكيان من نوع " <code translate="no">&quot;index&quot;</code> " ذات جودة عالية، لكن نتيجة البحث نفسها لا تزال تمثل الكيان الأصلي.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">استخدم المرشحات في البحث المختلط<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>في البحث المختلط، قم بتطبيق مرشحات StructArray حيث يجب أن يسري الشرط. يمكن مشاركة مرشح المستوى الأعلى مع البحث المختلط بأكمله. يجب إرفاق <code translate="no">element_filter</code> بطلب مستوى العنصر StructArray الذي يحتاج إلى قيود على مستوى العنصر.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>تطبق وسيطة <code translate="no">filter</code> شرط الكيان من المستوى الأعلى، بينما يقيد <code translate="no">expr</code> على <code translate="no">chunk_req</code> طلب المتجه على مستوى عنصر StructArray فقط. للاطلاع على تركيبات البحث الهجين المدعومة والقيود الخاصة بالإصدار، راجع <a href="/docs/ar/hybrid-search-with-structarray.md">البحث الهجين باستخدام StructArray</a> <a href="/docs/ar/structarray-limits.md">وقيود StructArray</a>.</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">ملخص دعم المسندات<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الحقول الفرعية القياسية في مسندات StructArray. لا تُعتبر الحقول الفرعية المتجهة مدخلات قياسية للمسندات.</p>
<table>
<thead>
<tr><th>نوع الحقل الفرعي</th><th>أمثلة نموذجية على المسندات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>، <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>أنواع الأعداد الصحيحة</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>، <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>، <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>، <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>الحقول الفرعية للمتجهات</td><td>غير مدعومة كمدخلات للمسندات القياسية في <code translate="no">$[...]</code>. استخدم الحقول الفرعية للمتجهات من خلال البحث المتجهي بدلاً من ذلك.</td></tr>
</tbody>
</table>
<p>بالنسبة للحالات غير المدعومة مثل مسارات JSON، ووظائف حاويات المصفوفات، ووظائف مطابقة النص، والشرط القيم الصفرية في <code translate="no">$[...]</code> ، ووظائف Geometry، وتعبيرات Timestamptz، واستدعاءات الوظائف العامة، راجع <a href="/docs/ar/struct-array-operators.md">StructArray Operators</a>.</p>
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
<li><p>استخدام <code translate="no">$[subfield]</code> خارج <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code>.</p></li>
<li><p>استخدام <code translate="no">chunks.section</code> بدلاً من صيغة مشغل StructArray مثل <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code>.</p></li>
<li><p>استخدام <code translate="no">element_filter</code> عندما تحتاج فقط إلى التصفية على مستوى الصف. استخدم <code translate="no">MATCH_ANY</code> بدلاً من ذلك إذا كنت تحتاج فقط إلى تحديد الكيانات.</p></li>
<li><p>توقع أن تُرجع <code translate="no">MATCH_*</code> إزاحات العناصر. تختار هذه العوامل الكيانات ولا تحدد عنصرًا مطابقًا واحدًا بمفردها.</p></li>
<li><p>كتابة المسندات المنطقية المجردة مثل <code translate="no">$[has_code]</code>. استخدم مقارنات صريحة مثل <code translate="no">$[has_code] == true</code>.</p></li>
<li><p>وضع <code translate="no">element_filter</code> قبل مسند من المستوى الأعلى في نفس تعبير التصفية.</p></li>
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
<li><p>لمراجعة صيغة تصفية StructArray الكاملة، اقرأ <a href="/docs/ar/struct-array-operators.md">«مشغلات StructArray</a>».</p></li>
<li><p>لتشغيل عمليات البحث المتجهية غير المفلترة أولاً، اقرأ <a href="/docs/ar/basic-vector-search-with-structarray.md">«البحث المتجهي الأساسي باستخدام StructArray</a>».</p></li>
<li><p>لإنشاء فهارس قياسية لفلاتر StructArray المستخدمة بشكل متكرر، اقرأ " <a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a>".</p></li>
<li><p>للتحقق من حدود التصفية والبحث الخاصة بكل إصدار، اقرأ " <a href="/docs/ar/structarray-limits.md">حدود StructArray</a>".</p></li>
</ol>
