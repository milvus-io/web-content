---
id: stl-sort.md
title: STL_SORT
summary: >-
  يُعد فهرس STL_SORT نوعًا من الفهارس مصممًا خصيصًا لتحسين أداء الاستعلامات على
  الحقول الرقمية (INT8، INT16، إلخ)، أو حقول VARCHAR، أو حقول TIMESTAMPTZ، وذلك
  من خلال تنظيم البيانات بترتيب مرتب.
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
    </button></h1><p>فهرس " <code translate="no">STL_SORT</code> " هو نوع من الفهارس مصمم خصيصًا لتحسين أداء الاستعلامات على الحقول الرقمية (INT8، INT16، إلخ)، أو الحقول من نوع " <code translate="no">VARCHAR</code> "، أو الحقول من نوع " <code translate="no">TIMESTAMPTZ</code> " داخل Milvus، وذلك من خلال تنظيم البيانات بترتيب مرتب.</p>
<p>استخدم فهرس <code translate="no">STL_SORT</code> إذا كنت تُجري استعلامات بشكل متكرر باستخدام:</p>
<ul>
<li><p>تصفية المقارنة باستخدام عوامل التشغيل <code translate="no">==</code> و <code translate="no">!=</code> و <code translate="no">&gt;</code> و <code translate="no">&lt;</code> و <code translate="no">&gt;=</code> و <code translate="no">&lt;=</code> </p></li>
<li><p>تصفية النطاق باستخدام عوامل التشغيل <code translate="no">IN</code> و <code translate="no">LIKE</code> </p></li>
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
<li><p>الحقول الرقمية (على سبيل المثال، <code translate="no">INT8</code> و <code translate="no">INT16</code> و <code translate="no">INT32</code> و <code translate="no">INT64</code> و <code translate="no">FLOAT</code> و <code translate="no">DOUBLE</code>). لمزيد من التفاصيل، راجع " <a href="/docs/ar/number.md">القيم المنطقية والأرقام"</a>.</p></li>
<li><p><code translate="no">VARCHAR</code> الحقول. لمزيد من التفاصيل، راجع <a href="/docs/ar/string.md">«حقل السلسلة</a>».</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> الحقول. لمزيد من التفاصيل، راجع <a href="/docs/ar/timestamptz-field.md">حقل TIMESTAMPTZ</a>.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيفية العمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنفذ Milvus عملية " <code translate="no">STL_SORT</code> " على مرحلتين:</p>
<ol>
<li><p><strong>إنشاء الفهرس</strong></p>
<ul>
<li><p>أثناء الاستيعاب، يجمع Milvus جميع القيم الخاصة بالحقل المفهرس.</p></li>
<li><p>يتم فرز القيم بترتيب تصاعدي باستخدام <a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sort</a> في مكتبة C++ STL.</p></li>
<li><p>يتم إقران كل قيمة بمعرف الكيان الخاص بها، ويتم حفظ المصفوفة المرتبة كفهرس.</p></li>
</ul></li>
<li><p><strong>تسريع الاستعلامات</strong></p>
<ul>
<li><p>عند إجراء الاستعلام، يستخدم Milvus <strong>البحث الثنائي</strong> (<a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">std::lower_bound</a> و <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>) على المصفوفة المرتبة.</p></li>
<li><p>في حالة المساواة، يعثر Milvus بسرعة على جميع القيم المطابقة.</p></li>
<li><p>بالنسبة للنطاقات، يحدد Milvus موضع البداية والنهاية ويعرض جميع القيم الموجودة بينهما.</p></li>
<li><p>يتم تمرير معرّفات الكيانات المطابقة إلى منفّذ الاستعلام لتجميع النتيجة النهائية.</p></li>
</ul></li>
</ol>
<p>وهذا يقلل من تعقيد الاستعلام من <strong>O(n)</strong> (المسح الكامل) إلى <strong>O(log n + m)</strong>، حيث <em>m</em> هو عدد التطابقات.</p>
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
    </button></h2><p>يمكنك إنشاء فهرس <code translate="no">STL_SORT</code> في حقل رقمي أو حقل من نوع <code translate="no">VARCHAR</code> أو <code translate="no">TIMESTAMPTZ</code>. ولا يلزم وجود معلمات إضافية.</p>
<p>يوضح المثال أدناه كيفية إنشاء فهرس <code translate="no">STL_SORT</code> على حقل <code translate="no">TIMESTAMPTZ</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add STL_SORT index on the &quot;tsz&quot; field</span>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tsz_demo&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;tsz&quot;</span>)
                .indexType(IndexParam.IndexType.STL_SORT)
                .indexName(<span class="hljs-string">&quot;tsz_index&quot;</span>)
                .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tsz_demo&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;tsz_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tsz_demo&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;tsz&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort)
                    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;tsz_index&quot;</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tsz_demo&quot;</span>)
        .<span class="hljs-built_in">AddIndex</span>(milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;tsz&quot;</span>, <span class="hljs-string">&quot;tsz_index&quot;</span>, milvus::IndexType::STL_SORT)));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tsz_demo&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;tsz&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;tsz_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tsz_demo&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;tsz&quot;,
            &quot;indexName&quot;: &quot;tsz_index&quot;,
            &quot;indexType&quot;: &quot;STL_SORT&quot;
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-an-index" class="common-anchor-header">إزالة فهرس<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم الطريقة <code translate="no">drop_index()</code> لإزالة فهرس موجود من مجموعة.</p>
<div class="alert note">
<ul>
<li><p>في <strong>الإصدار 2.6.3</strong> أو ما قبله، يجب تحرير المجموعة قبل حذف مؤشر سكالي.</p></li>
<li><p>ابتداءً من <strong>الإصدار v2.6.4</strong> أو الأحدث، يمكنك حذف الفهرس القياسي مباشرةً بمجرد انتفاء الحاجة إليه — دون الحاجة إلى تحرير المجموعة أولاً.</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tsz_demo&quot;</span>)
        .indexName(<span class="hljs-string">&quot;tsz_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;tsz_demo&quot;</span>, <span class="hljs-string">&quot;tsz_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">drop_index</span>(
        DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tsz_demo&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;tsz_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tsz_demo&quot;</span>)
        .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;tsz_index&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tsz_demo&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;tsz_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tsz_demo&quot;,
    &quot;indexName&quot;: &quot;tsz_index&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
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
<li><p><strong>أنواع الحقول:</strong> تعمل مع الحقول الرقمية و <code translate="no">VARCHAR</code> و <code translate="no">TIMESTAMPTZ</code>. لمزيد من المعلومات حول أنواع البيانات، راجع <a href="/docs/ar/number.md">Boolean &amp; Number</a> <a href="/docs/ar/timestamptz-field.md">وTIMESTAMPTZ Field</a>.</p></li>
<li><p><strong>المعلمات:</strong> لا توجد حاجة إلى معلمات فهرس.</p></li>
<li><p><strong>Mmap غير مدعوم:</strong> وضع التعيين الذاكري غير متاح لـ <code translate="no">STL_SORT</code>.</p></li>
</ul>
