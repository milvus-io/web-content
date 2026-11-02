---
id: index-structarray-fields.md
title: فهرسة حقول StructArray
summary: >-
  قم بإنشاء فهارس على الحقول الفرعية لـ StructArray قبل إجراء البحث المتجه أو
  تسريع عملية التصفية القياسية. بالنسبة لحقل StructArray، يكون هدف الفهرس هو
  مسار الحقل الفرعي، مثل chunks[emb_list_vector] أو chunks[emb] أو
  chunks[section].
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">فهرسة حقول StructArray<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>قم بإنشاء فهارس على الحقول الفرعية لـ StructArray قبل تشغيل البحث المتجه أو تسريع التصفية القياسية. بالنسبة لحقل StructArray، يكون هدف الفهرس هو مسار الحقل الفرعي، مثل <code translate="no">chunks[emb_list_vector]</code> أو <code translate="no">chunks[emb]</code> أو <code translate="no">chunks[section]</code>.</p>
<p>تستخدم هذه الصفحة مجموعة <code translate="no">tech_articles</code> من <a href="/docs/ar/create-structarray-field.md">"إنشاء حقل StructArray</a>". يحتوي حقل StructArray <code translate="no">chunks</code> على حقول فرعية قياسية للتصفية وحقول فرعية متجهة للبحث.</p>
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
    </button></h2><p>تأكد من أن مخطط المجموعة يحتوي بالفعل على حقل StructArray <code translate="no">chunks</code>. أعد استخدام العميل المُهيأ من <a href="/docs/ar/create-structarray-field.md">"إنشاء حقل StructArray</a> " للغة التي اخترتها (<code translate="no">cli</code> و <code translate="no">ctx</code> للغة Go، و <code translate="no">client</code> لمجموعات أدوات التطوير البرمجية الأخرى). يمكنك إنشاء فهارس قبل إدراج البيانات.</p>
<table>
<thead>
<tr><th>مسار الحقل الفرعي</th><th>النوع</th><th>الغرض من الفهرس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>البحث في EmbeddingList باستخدام مقاييس <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>البحث على مستوى العنصر باستخدام مقاييس متجهة عادية.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>التصفية التصنيفية.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>التصفية الرقمية والمسندات على غرار النطاق.</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>التصفية المنطقية.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>لا يقبل الحقل المتجه أو الحقل الفرعي المتجه سوى فهرس واحد. إذا كنت بحاجة إلى كل من البحث في EmbeddingList والبحث على مستوى العناصر، فأنشئ حقلين فرعيين متجهين منفصلين وقم بفهرستهما بشكل منفصل. في هذه الصفحة، يتم فهرسة <code translate="no">chunks[emb_list_vector]</code> للبحث في EmbeddingList، ويتم فهرسة <code translate="no">chunks[emb]</code> للبحث على مستوى العناصر.</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">اختر الفهارس<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم وضع البحث لاختيار عائلة المقاييس المتجهة.</p>
<table>
<thead>
<tr><th>هدف البحث أو التصفية</th><th>المسار المستهدف</th><th>ما يجب اختياره</th></tr>
</thead>
<tbody>
<tr><td>البحث في قائمة التضمين</td><td><code translate="no">chunks[emb_list_vector]</code></td><td>مجموعة المقاييس " <code translate="no">MAX_SIM*</code> ".</td></tr>
<tr><td>البحث المتجهي على مستوى العنصر</td><td><code translate="no">chunks[emb]</code></td><td>عائلة المقاييس المتجهة العادية، مثل <code translate="no">COSINE</code> أو <code translate="no">IP</code> أو <code translate="no">L2</code>.</td></tr>
<tr><td>التصفية حسب السلسلة أو الفئة</td><td><code translate="no">chunks[section]</code></td><td>فهرس قياسي يدعمه الهدف الخاص بك.</td></tr>
<tr><td>التصفية حسب النطاق الرقمي</td><td><code translate="no">chunks[quality_score]</code>، <code translate="no">chunks[page]</code></td><td>مؤشر قياسي يدعمه الهدف الخاص بك.</td></tr>
<tr><td>التصفية حسب القيمة المنطقية</td><td><code translate="no">chunks[has_code]</code></td><td>فهرس قياسي يدعمه الهدف الخاص بك.</td></tr>
</tbody>
</table>
<p>يعامل البحث في EmbeddingList المتجهات الموجودة في حقل فرعي من نوع StructArray كقائمة تضمين ويُرجع نتائج على مستوى الكيان. أما البحث على مستوى العنصر فيبحث في كل عنصر من عناصر Struct بشكل مستقل ويمكنه إرجاع إزاحة العنصر المطابق.</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">إنشاء فهارس متجهة<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنشئ المثال التالي فهرسين متجهيين. يستخدم الفهرس الأول مقياس « <code translate="no">MAX_SIM*</code> » للبحث في قائمة التضمين (EmbeddingList). ويستخدم الفهرس الثاني مقياسًا متجهيًا عاديًا للبحث على مستوى العنصر.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Index for EmbeddingList search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

<span class="hljs-comment"># Index for element-level search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Map;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, index.NewHNSWIndex(entity.MaxSimCosine, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb]&quot;</span>, index.NewHNSWIndex(entity.COSINE, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::MaxSimCosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_list_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::MAX_SIM_COSINE)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::COSINE)</span></span>;

emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);

milvus::CreateIndexRequest vector_request;
vector_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
vector_request.<span class="hljs-built_in">WithIndexes</span>({emb_list_index, emb_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(vector_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>, IndexType.Hnsw, MetricType.MaxSimCosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } },
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>, IndexType.Hnsw, MetricType.Cosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;chunks[emb_list_vector]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_list_max_sim&quot;,
            &quot;metricType&quot;: &quot;MAX_SIM_COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        },
        {
            &quot;fieldName&quot;: &quot;chunks[emb]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تحذير
لا تقم بإنشاء فهرس مقياس التباعد ( <code translate="no">MAX_SIM*</code> ) وفهرس مقياس متجه عادي على نفس الحقل الفرعي للمتجه. إذا كان كلا وضعي البحث مطلوبين، فاكتب المتجهات في حقلين فرعيين منفصلين للمتجه وأنشئ فهرسًا واحدًا لكل حقل فرعي.</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">إنشاء فهارس قياسية<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء فهارس قيمية على الحقول الفرعية القيمية لـ StructArray عند استخدامها في عوامل التصفية. استخدم نفس صيغة مسار <code translate="no">structArray[subfield]</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[section]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[page]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[section]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[page]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">section_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">has_code_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">quality_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">page_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;

milvus::CreateIndexRequest scalar_request;
scalar_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
scalar_request.<span class="hljs-built_in">WithIndexes</span>({section_index, has_code_index, quality_index, page_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(scalar_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[section]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[page]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>, IndexType.StlSort),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>, IndexType.StlSort)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        { &quot;fieldName&quot;: &quot;chunks[section]&quot;, &quot;indexName&quot;: &quot;chunks_section_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[has_code]&quot;, &quot;indexName&quot;: &quot;chunks_has_code_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[quality_score]&quot;, &quot;indexName&quot;: &quot;chunks_quality_score_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[page]&quot;, &quot;indexName&quot;: &quot;chunks_page_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تعد الفهارس القياسية اختيارية، لكنها مفيدة عندما تظهر الحقول الفرعية القياسية لـ StructArray بشكل متكرر في عوامل التصفية، مثل <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> أو <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>.</p>
<h2 id="Applicable-metric-types" class="common-anchor-header">أنواع المقاييس القابلة للتطبيق<button data-href="#Applicable-metric-types" class="anchor-icon" translate="no">
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
    </button></h2><p>للبحث في EmbeddingList، اختر المقياس <code translate="no">MAX_SIM*</code> المطابق للمقارنة لكل متجه: <code translate="no">MAX_SIM_COSINE</code> (يُسمى أيضًا <code translate="no">MAX_SIM</code>)، <code translate="no">MAX_SIM_IP</code> ، أو <code translate="no">MAX_SIM_L2</code> للمتجهات الكثيفة، و <code translate="no">MAX_SIM_HAMMING</code> أو <code translate="no">MAX_SIM_JACCARD</code> للمتجهات الثنائية. تقارن هذه المقاييس قوائم التضمين وتُرجع نتائج على مستوى الكيان. للبحث على مستوى العنصر، استخدم المقياس العادي المطابق المذكور أدناه.</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">توافق مقاييس الفهرس<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الجداول التالية لاختيار نوع الفهرس ونوع المقياس لحقل فرعي من متجه StructArray. ابدأ من الهدف، ثم اختر عائلة المقاييس حسب وضع البحث.</p>
<p>اختر نوع فهرس Milvus ونوع المقياس من جداول التوافق التالية.</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">البحث في EmbeddingList<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>يستخدم بحث EmbeddingList مقاييس " <code translate="no">MAX_SIM*</code> ". ويعامل المتجهات الموجودة في حقل فرعي من نوع StructArray كقائمة تضمين ويعرض نتائج على مستوى الكيان.</p>
<table>
<thead>
<tr><th>نوع بيانات الحقل الفرعي للمتجهات</th><th>نوع الفهرس</th><th>نوع المقياس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>، <code translate="no">FLOAT16_VECTOR</code> ، <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>، <code translate="no">IVF_FLAT_CC</code> ، <code translate="no">HNSW</code> ، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code> ، <code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>، <code translate="no">MAX_SIM_COSINE</code> ، <code translate="no">MAX_SIM_IP</code> ، <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>، <code translate="no">MAX_SIM_COSINE</code> ، <code translate="no">MAX_SIM_IP</code> ، <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>، <code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">البحث على مستوى العناصر<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>يستخدم البحث على مستوى العناصر مقاييس متجهة عادية. ويقوم بالبحث في كل عنصر من عناصر Struct بشكل مستقل ويمكنه إرجاع إزاحة العنصر المطابق.</p>
<table>
<thead>
<tr><th>نوع بيانات الحقل الفرعي للمتجه</th><th>نوع الفهرس</th><th>نوع المقياس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>، <code translate="no">FLOAT16_VECTOR</code> ، <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>، <code translate="no">IVF_FLAT</code> ، <code translate="no">IVF_FLAT_CC</code> ، <code translate="no">IVF_SQ8</code> ، <code translate="no">IVF_SQ_CC</code> ، <code translate="no">IVF_PQ</code> ، <code translate="no">SCANN</code> ، <code translate="no">IVF_RABITQ</code> ، <code translate="no">IVF_RABITQ_FASTSCAN</code> ، <code translate="no">HNSW</code> ، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code> ، <code translate="no">DISKANN</code></td><td><code translate="no">L2</code>، <code translate="no">IP</code> ، <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>، <code translate="no">HNSW_SQ</code> ، <code translate="no">HNSW_PQ</code> ، <code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>، <code translate="no">IP</code> ، <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>، <code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>، <code translate="no">JACCARD</code> ، <code translate="no">SUBSTRUCTURE</code> ، <code translate="no">SUPERSTRUCTURE</code> ، <code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>، <code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>للحصول على دعم خاص بالإصدار والقيود الأخرى، راجع " <a href="/docs/ar/structarray-limits.md">قيود StructArray</a>".</p>
<h2 id="Verify-indexes" class="common-anchor-header">التحقق من الفهارس<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد إنشاء الفهارس، قم بوصف فهارس المجموعة أو القائمة للتأكد من أن مسارات الحقول الفرعية المتوقعة قد تم فهرستها.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;String&gt; indexes = client.listIndexes(ListIndexesReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());
System.out.println(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexes, err := cli.ListIndexes(ctx, milvusclient.NewListIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">list_indexes</span>(ListIndexesRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, resp.<span class="hljs-title function_ invoke__">index_names</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::ListIndexesResponse list_resp;
status = client-&gt;<span class="hljs-built_in">ListIndexes</span>(milvus::<span class="hljs-built_in">ListIndexesRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>),
                            list_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; name : list_resp.<span class="hljs-built_in">IndexNames</span>()) {
    std::cout &lt;&lt; name &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexes = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> indexes = <span class="hljs-keyword">await</span> client.ListIndexesAsync(<span class="hljs-keyword">new</span> ListIndexesReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, indexes.IndexNames));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>بعد إنشاء كل من الفهارس المتجهة والعددية أعلاه، يجب أن تحتوي استجابة القائمة على الأسماء التالية، بأي ترتيب. يعتمد التنسيق على SDK:</p>
<pre><code translate="no" class="language-plaintext">chunks_emb_list_max_sim
chunks_emb_cosine
chunks_section_inverted
chunks_has_code_inverted
chunks_quality_score_sort
chunks_page_sort
<button class="copy-code-btn"></button></code></pre>
<p>قم بوصف فهرس « <code translate="no">chunks_emb_cosine</code> » الذي تم إنشاؤه أعلاه لفحص الحقل المستهدف وتكوينه. تختلف بنية الاستجابة والتمثيل المطبوع باختلاف حزم SDK.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> client.describeIndex(DescribeIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
        .build());
System.out.println(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexDesc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexDesc.IndexType())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">describe_index</span>(DescribeIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">description</span> <span class="hljs-keyword">in</span> resp.<span class="hljs-title function_ invoke__">indexes</span>() {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, description);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::DescribeIndexResponse desc_resp;
status = client-&gt;<span class="hljs-built_in">DescribeIndex</span>(milvus::<span class="hljs-built_in">DescribeIndexRequest</span>()
                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                   .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>),
                               desc_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; desc : desc_resp.<span class="hljs-built_in">Descs</span>()) {
    std::cout &lt;&lt; desc.<span class="hljs-built_in">FieldName</span>() &lt;&lt; <span class="hljs-string">&quot;: &quot;</span> &lt;&lt; desc.<span class="hljs-built_in">IndexName</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> index = <span class="hljs-keyword">await</span> client.DescribeIndexAsync(<span class="hljs-keyword">new</span> DescribeIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    IndexName = <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> description <span class="hljs-keyword">in</span> index.Indexes)
{
    Console.WriteLine(<span class="hljs-string">$&quot;<span class="hljs-subst">{description.FieldName}</span>: <span class="hljs-subst">{description.IndexName}</span>&quot;</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تحتوي استجابة القائمة على أسماء الفهارس؛ وتحدد استجابة الوصف <code translate="no">chunks[emb]</code> وتكوين الفهرس. افحص الاستجابة أو الحالة بحثًا عن أخطاء قبل استخدامها.</p>
<h2 id="Index-rules" class="common-anchor-header">قواعد الفهرس<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><th>القاعدة</th><th>الشرح</th></tr>
</thead>
<tbody>
<tr><td>استخدم صيغة المسار لفهارس الحقول الفرعية.</td><td>قم بفهرسة <code translate="no">chunks[emb]</code> ، وليس <code translate="no">emb</code> أو <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>يقبل كل حقل فرعي متجه فهرسًا واحدًا.</td><td>استخدم حقول فرعية متجهة منفصلة إذا كنت بحاجة إلى مجموعات مقاييس مختلفة.</td></tr>
<tr><td>استخدم مقاييس <code translate="no">MAX_SIM*</code> للبحث في EmbeddingList.</td><td>تتطلب بيانات استعلام EmbeddingList فهرسًا تم إنشاؤه باستخدام مقياس <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td>استخدم مقاييس المتجهات العادية للبحث على مستوى العناصر.</td><td>يستخدم البحث على مستوى العنصر بيانات استعلام متجهة عادية ومقاييس مثل <code translate="no">COSINE</code> أو <code translate="no">IP</code> أو <code translate="no">L2</code>.</td></tr>
<tr><td>قم بفهرسة الحقول الفرعية القياسية التي تظهر في عوامل التصفية.</td><td>استخدم أنواع الفهرس القياسي التي يدعمها هدفك.</td></tr>
<tr><td>ضع حدود الحقول المتجهة في الاعتبار.</td><td>العدد الإجمالي للحقول المتجهة والحقول الفرعية المتجهة محدود. راجع حدود StructArray قبل إضافة العديد من الحقول الفرعية المتجهة.</td></tr>
</tbody>
</table>
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
<li><p>إنشاء فهرس على <code translate="no">chunks.emb</code> بدلاً من <code translate="no">chunks[emb]</code>.</p></li>
<li><p>إنشاء فهرس <code translate="no">MAX_SIM*</code> فقط ثم محاولة إجراء بحث على مستوى العنصر في نفس الحقل الفرعي.</p></li>
<li><p>إنشاء فهرس متجه عادي فقط ثم محاولة تشغيل بحث EmbeddingList على نفس الحقل الفرعي.</p></li>
<li><p>إعادة استخدام حقل فرعي متجه واحد لكل من مقاييس <code translate="no">MAX_SIM*</code> والمقاييس المتجهة العادية.</p></li>
<li><p>تجاهل الفهارس القياسية لمرشحات StructArray المستخدمة بكثرة.</p></li>
<li><p>فهرسة حقل فرعي لـ StructArray غير موجود في مخطط Struct.</p></li>
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
<li><p>لتشغيل بحث EmbeddingList على مستوى الكيان أو البحث المتجه على مستوى العنصر، اقرأ " <a href="/docs/ar/basic-vector-search-with-structarray.md">البحث المتجه الأساسي باستخدام StructArray</a>".</p></li>
<li><p>لتصفية الحقول الفرعية القياسية لـ StructArray أثناء البحث، اقرأ " <a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a>".</p></li>
<li><p>لمراجعة حدود الفهرس والمقاييس، اقرأ " <a href="/docs/ar/structarray-limits.md">حدود StructArray</a>".</p></li>
</ol>
