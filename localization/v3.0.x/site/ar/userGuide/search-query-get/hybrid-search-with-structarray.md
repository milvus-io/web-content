---
id: hybrid-search-with-structarray.md
title: البحث الهجين باستخدام StructArray
summary: >-
  استخدم هذه الصفحة لدمج البحث المتجهي في StructArray مع عمليات بحث متجهة أخرى
  في طلب بحث هجين واحد. يمكن أن يُنتج البحث الهجين في StructArray نتائج على
  مستوى الكيان أو على مستوى العنصر، اعتمادًا على كائنات AnnSearchRequest التي
  تقوم بدمجها.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">البحث الهجين باستخدام StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم هذه الصفحة لدمج البحث المتجه باستخدام StructArray مع عمليات بحث متجهة أخرى في طلب بحث هجين واحد. يمكن أن ينتج عن البحث الهجين باستخدام StructArray نتائج على مستوى الكيان أو على مستوى العنصر، اعتمادًا على كائنات <code translate="no">AnnSearchRequest</code> التي تقوم بدمجها.</p>
<p>تستخدم هذه الصفحة مجموعة « <code translate="no">tech_articles</code> » من <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>». تحتوي المجموعة على حقل متجه من المستوى الأعلى باسم « <code translate="no">title_vector</code> » وحقل StructArray باسم « <code translate="no">chunks</code> ». يتم فهرسة الحقل الفرعي « <code translate="no">chunks[emb_list_vector]</code> » للبحث في «EmbeddingList»، ويتم فهرسة « <code translate="no">chunks[emb]</code> » للبحث على مستوى العناصر.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">كيف ينطبق البحث الهجين على StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> التركيبة</th><th>نطاق المرشح النهائي</th><th>سلوك النتيجة</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>حقل متجه على مستوى المجموعة + الحقل الفرعي EmbeddingList في StructArray</td><td>مستوى الكيان</td><td>يتم فهرسة المرشحين النهائيين حسب المفتاح الأساسي.</td><td>لا تستخدم.</td></tr>
<tr><td>حقل متجه على مستوى المجموعة + حقل فرعي على مستوى عنصر StructArray</td><td>مستوى الكيان</td><td>يتم طي النتائج على مستوى العنصر إلى مرشحين على مستوى الكيان قبل إعادة الترتيب المختلط.</td><td>تكوين طي اختياري على مستوى عنصر StructArray <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>حقول فرعية متعددة على مستوى العنصر ضمن نفس حقل StructArray</td><td>مستوى العنصر</td><td>يتم تحديد المرشحين النهائيين باستخدام المفتاح الأساسي بالإضافة إلى إزاحة عنصر Struct.</td><td>لا تستخدم.</td></tr>
<tr><td>الحقول الفرعية على مستوى العنصر ضمن حقول StructArray مختلفة</td><td>مستوى الكيان</td><td>لا تشترك إزاحات العناصر في الهوية، لذا يتم طي كل حقل فرعي على مستوى العنصر في StructArray <code translate="no">AnnSearchRequest</code> قبل إعادة الترتيب.</td><td>تكوين طي اختياري لكل حقل فرعي على مستوى العنصر ( <code translate="no">AnnSearchRequest</code>) في StructArray.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>تحذير</p>
<p>استخدم <code translate="no">element_scope</code> فقط لتكوين الطي لكائنات <code translate="no">AnnSearchRequest</code> على مستوى العناصر في StructArray في بحث هجين على مستوى العناصر غير المتطابق في البنية. لا تستخدمه لطلبات EmbeddingList، أو طلبات المتجهات على مستوى المجموعة، أو البحث الهجين على مستوى العناصر في StructArray المتطابق.</p>
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
    </button></h2><p>قم بإعداد المجموعة والبيانات والفهارس قبل تشغيل البحث الهجين.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>التفاصيل</th></tr>
</thead>
<tbody>
<tr><td>حقل StructArray</td><td>تحتوي المجموعة على حقل StructArray مثل <code translate="no">chunks</code>.</td></tr>
<tr><td>الحقول الفرعية من نوع Vector</td><td>استخدم حقول فرعية متجهة منفصلة للبحث في EmbeddingList والبحث على مستوى العناصر.</td></tr>
<tr><td>الفهارس</td><td><code translate="no">chunks[emb_list_vector]</code> يستخدم مقياس <code translate="no">MAX_SIM*</code>. يستخدم <code translate="no">chunks[emb]</code> مقياس متجه عادي مثل <code translate="no">COSINE</code> أو <code translate="no">IP</code> أو <code translate="no">L2</code>.</td></tr>
<tr><td>أداة إعادة الترتيب</td><td>اختر أداة إعادة الترتيب الهجينة مثل <code translate="no">RRFRanker</code> أو أداة إعادة ترتيب أخرى يدعمها تطبيقك.</td></tr>
</tbody>
</table>
<p>لإعداد الفهرس، راجع <a href="/docs/ar/index-structarray-fields.md">حقول StructArray للفهرس</a>.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">تشغيل البحث الهجين باستخدام طلب EmbeddingList<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>يُعد بحث EmbeddingList في حقل فرعي متجه StructArray بحثًا على مستوى الكيان في البحث الهجين. وهو يعمل كطلب بحث متجه على مستوى الكيان ولا يُرجع إزاحة عنصر Struct واحد متطابق.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، ينتج كلا كائني « <code translate="no">AnnSearchRequest</code> » مرشحين على مستوى الكيان. يتم فهرسة النتيجة النهائية باستخدام المفتاح الأساسي للكيان الأصلي. لا تضف « <code translate="no">element_scope</code> » إلى طلب «EmbeddingList».</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">تشغيل البحث الهجين على مستوى العناصر لنفس StructArray<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>عندما تستهدف جميع كائنات <code translate="no">AnnSearchRequest</code> الحقول الفرعية المتجهة على مستوى العنصر ضمن حقل StructArray نفسه، يمكن للبحث الهجين الاحتفاظ بالمرشحين على مستوى العنصر من خلال إعادة الترتيب. هذا هو الوضع الهجين الوحيد لـ StructArray الذي تظل فيه النتائج النهائية على مستوى العنصر.</p>
<p>يفترض المثال التالي أن حقل StructArray <code translate="no">chunks</code> يحتوي على حقلين فرعيين متجهين على مستوى العنصر، هما <code translate="no">chunks[emb]</code> و <code translate="no">chunks[code_emb]</code> ، وكلاهما يستخدم مقاييس متجهة عادية.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>تقوم كلتا كائنتَي <code translate="no">AnnSearchRequest</code> بالبحث في الحقول الفرعية المتجهة تحت <code translate="no">chunks</code>. يشير نفس الإزاحة التي تبدأ من الصفر إلى نفس عنصر Struct، لذا يمكن لأداة إعادة الترتيب الهجينة ترتيب المرشحين على مستوى العنصر مباشرةً. لا تقم بتعيين <code translate="no">element_scope</code> في هذا الوضع لأنه لا يتم إجراء أي طي على مستوى الكيان.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">طي النتائج على مستوى العنصر للبحث الهجين على مستوى الكيان<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا مزج البحث الهجين طلبًا من نوع « <code translate="no">AnnSearchRequest</code> » على مستوى عنصر StructArray مع طلب متجه على مستوى المجموعة، أو طلب «EmbeddingList»، أو طلب على مستوى العنصر ضمن حقل StructArray مختلف، فإن نطاق المرشحين النهائي يكون على مستوى الكيان. في هذه الحالة، يتم طي كل حقل « <code translate="no">AnnSearchRequest</code> » على مستوى عنصر StructArray إلى مرشحين على مستوى الكيان قبل إعادة الترتيب الهجين.</p>
<p>استخدم <code translate="no">element_scope</code> داخل <code translate="no">params</code> الخاص بـ <code translate="no">AnnSearchRequest</code> على مستوى عنصر StructArray عندما تحتاج إلى التحكم في كيفية طي العناصر المتطابقة المتعددة من نفس الكيان.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>في هذا المثال، تكون " <code translate="no">title_req</code> " على مستوى الكيان، لذا تكون النتيجة الهجينة النهائية أيضًا على مستوى الكيان. يعرض طلب " <code translate="no">chunk_req</code> " أولاً نتائج العناصر المطابقة من " <code translate="no">chunks[emb]</code>"، ثم يدمج العناصر المعروضة من نفس الكيان عن طريق جمع أفضل ثلاث درجات للعناصر. إذا تم حذف " <code translate="no">element_scope</code> " عند الحاجة إلى الدمج على مستوى الكيان، فإن استراتيجية الدمج تكون افتراضيًا " <code translate="no">max</code>".</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">اختر استراتيجية تجميع<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>الاستراتيجية</th><th>السلوك</th><th><code translate="no">topk</code></th><th>متطلبات المقياس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>الاحتفاظ بأفضل نتيجة للعنصر الذي تم إرجاعه للكيان.</td><td>غير مسموح به.</td><td>أي مقياس متجه عادي مدعوم.</td></tr>
<tr><td><code translate="no">sum</code></td><td>جمع جميع درجات العناصر التي تم إرجاعها للكيان.</td><td>غير مسموح به.</td><td>مقاييس الارتباط الإيجابي فقط، مثل <code translate="no">IP</code> أو <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>متوسط جميع درجات العناصر التي تم إرجاعها للكيان.</td><td>غير مسموح به.</td><td>أي مقياس متجه عادي مدعوم.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>جمع أفضل درجات العناصر التي تم إرجاعها لـ <code translate="no">K</code> للكيان.</td><td>مطلوب ويجب أن يكون موجبًا.</td><td>مقاييس الارتباط الإيجابي فقط، مثل <code translate="no">IP</code> أو <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>حساب متوسط أفضل درجات العناصر التي تم إرجاعها من <code translate="no">K</code> للكيان.</td><td>مطلوب ويجب أن يكون موجبًا.</td><td>أي مقياس متجه عادي مدعوم.</td></tr>
</tbody>
</table>
<p>يستخدم "Collapse" فقط نتائج العناصر التي تم إرجاعها بواسطة مقياس " <code translate="no">AnnSearchRequest</code>" على مستوى العنصر في StructArray. ولا يقوم بمسح كل عنصر Struct في الكيان بعد البحث ANN. اضبط " <code translate="no">limit</code> " للطلب على قيمة عالية بما يكفي لتوفير العناصر التي تريدها متاحة لـ "Collapse".</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">إضافة عوامل التصفية والبحث في النطاق والتجميع<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إرفاق <code translate="no">element_filter</code> بـ <code translate="no">AnnSearchRequest</code> على مستوى عنصر StructArray عندما يجب تطبيق الشروط القياسية على نفس عناصر Struct التي تشارك في البحث المتجه. يمكنك أيضًا استخدام <code translate="no">filter</code> على المستوى الأعلى في <code translate="no">hybrid_search()</code> لشروط الكيان الأصلي.</p>
<p>تدعم الحقول المتجهة على مستوى العنصر في StructArray البحث عن النطاق في البحث المختلط. أضف <code translate="no">radius</code> و، اختياريًا، <code translate="no">range_filter</code> إلى <code translate="no">AnnSearchRequest</code> على مستوى العنصر. لا تدعم طلبات StructArray على مستوى EmbeddingList البحث عن النطاق.</p>
<p>يتم دعم التجميع الهجين على مستوى العنصر فقط عندما تستهدف جميع كائنات <code translate="no">AnnSearchRequest</code> حقول متجهة على مستوى العنصر ضمن نفس حقل StructArray، ويجب أن يكون <code translate="no">group_by_field</code> هو المفتاح الأساسي. لا يتم دعم التجميع الهجين عندما يخلط الطلب بين حقول متجهة على مستوى المجموعة، أو حقول StructArray مختلفة، أو طلبات على مستوى EmbeddingList. لا تقم بدمج البحث عن النطاق مع التجميع.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">تفسير النتائج المختلطة<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>نطاق المرشح النهائي</th><th>مفتاح النتيجة</th><th>سلوك الإزاحة</th><th>متى يحدث</th></tr>
</thead>
<tbody>
<tr><td>مستوى الكيان</td><td>المفتاح الأساسي.</td><td>لا يوجد إزاحة للعناصر في النتيجة النهائية.</td><td>يتضمن الطلب الهجين حقل متجه على مستوى المجموعة، أو طلب EmbeddingList، أو طلبات على مستوى العنصر ضمن حقول StructArray مختلفة.</td></tr>
<tr><td>مستوى العنصر</td><td>المفتاح الأساسي بالإضافة إلى حقل StructArray الأصلي بالإضافة إلى إزاحة العنصر.</td><td>يمكن إرجاع إزاحة العنصر المحدد عند عرضها بواسطة واجهة برمجة التطبيقات (API) أو حزمة تطوير البرامج (SDK).</td><td>جميع كائنات " <code translate="no">AnnSearchRequest</code> " تكون على مستوى العنصر وتقع ضمن حقل StructArray نفسه.</td></tr>
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
<li><p>استخدم <code translate="no">element_scope</code> فقط لكائنات <code translate="no">AnnSearchRequest</code> على مستوى عنصر StructArray التي يجب طيها إلى مرشحين على مستوى الكيان في البحث المختلط.</p></li>
<li><p>لا تستخدم <code translate="no">element_scope</code> لطلبات EmbeddingList، أو طلبات المتجهات على مستوى المجموعة، أو البحث الهجين على مستوى العناصر في نفس StructArray.</p></li>
<li><p><code translate="no">sum</code> وتتطلب استراتيجيات الطي <code translate="no">topk_sum</code> مقاييس ارتباط موجبة، مثل <code translate="no">IP</code> أو <code translate="no">COSINE</code>. لا تستخدمها مع <code translate="no">L2</code>.</p></li>
<li><p><code translate="no">topk_sum</code> وتتطلب <code translate="no">topk_avg</code> قيمة <code translate="no">topk</code> موجبة. ويجب ألا تتضمن استراتيجيات الطي الأخرى <code translate="no">topk</code>.</p></li>
<li><p>لا تدعم طلبات StructArray على مستوى EmbeddingList البحث عن النطاق أو التجميع حسب.</p></li>
<li><p>يتم دعم التجميع الهجين فقط للبحث الهجين على مستوى عنصر StructArray نفسه وفقط حسب المفتاح الأساسي.</p></li>
<li><p>لا تقم بدمج البحث عن النطاق مع التجميع.</p></li>
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
<li><p>إضافة <code translate="no">element_scope</code> إلى طلب هجين على مستوى عنصر StructArray نفسه. يظل هذا الطلب على مستوى العنصر ولا يقوم بالطي على مستوى الكيان.</p></li>
<li><p>إضافة " <code translate="no">element_scope</code> " إلى " <code translate="no">chunks[emb_list_vector]</code>". البحث في "EmbeddingList" يكون بالفعل على مستوى الكيان.</p></li>
<li><p>افتراض أن حقلين من StructArray يشتركان في إزاحات العناصر. إن الإزاحة <code translate="no">3</code> في <code translate="no">chunks</code> والإزاحة <code translate="no">3</code> في حقل StructArray آخر هما عنصران مختلفان، وبالتالي يصبح الطلب الهجين على مستوى الكيان.</p></li>
<li><p>استخدام <code translate="no">topk_sum</code> مع <code translate="no">L2</code>. استخدم <code translate="no">max</code> أو <code translate="no">avg</code> أو <code translate="no">topk_avg</code> لمقاييس المسافة السالبة.</p></li>
<li><p>من المتوقع أن تتضمن النتائج الهجينة على مستوى الكيان إزاحة عنصر Struct المحدد بعد الطي.</p></li>
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
<li><p>لإضافة عوامل تصفية قياسية إلى البحث الهجين، اقرأ <a href="/docs/ar/filtered-search-with-structarray.md">«البحث المُصفى باستخدام StructArray</a>».</p></li>
<li><p>لاستخدام حدود الدرجة أو المسافة في البحث الهجين، اقرأ " <a href="/docs/ar/range-search-with-structarray.md">البحث عن النطاق باستخدام StructArray</a>".</p></li>
<li><p>لتجميع النتائج الهجينة على مستوى العنصر حسب الكيان الأصلي، اقرأ " <a href="/docs/ar/grouping-search-with-structarray.md">تجميع البحث باستخدام StructArray</a>".</p></li>
<li><p>للتحقق من حدود البحث في StructArray، اقرأ <a href="/docs/ar/structarray-limits.md">«حدود StructArray</a>».</p></li>
</ol>
