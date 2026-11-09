---
id: bitmap.md
title: BITMAP
summary: >-
  تعد فهرسة الصور النقطية تقنية فهرسة فعالة مصممة لتحسين أداء الاستعلامات على
  الحقول القياسية ذات الكاردينالية المنخفضة. ويشير مصطلح «الكاردينالية» إلى عدد
  القيم المتميزة في الحقل. وتُعتبر الحقول التي تحتوي على عدد أقل من العناصر
  المتميزة ذات كاردينالية منخفضة.
---
<h1 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h1><p>الفهرسة باستخدام الخرائط البتية هي تقنية فهرسة فعالة مصممة لتحسين أداء الاستعلامات على الحقول العددية ذات الكاردينالية المنخفضة. تشير الكاردينالية إلى عدد القيم المتميزة في الحقل. وتُعتبر الحقول التي تحتوي على عدد أقل من العناصر المتميزة ذات كاردينالية منخفضة.</p>
<p>يساعد هذا النوع من الفهارس في تقليل وقت استرجاع الاستعلامات القياسية من خلال تمثيل قيم الحقول بتنسيق ثنائي مضغوط وإجراء عمليات بتية فعالة عليها. مقارنةً بأنواع الفهارس الأخرى، تتميز فهارس الصور النقطية عادةً بكفاءة أعلى في استخدام المساحة وسرعات استعلام أسرع عند التعامل مع الحقول ذات الكاردينالية المنخفضة.</p>
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
    </button></h2><p>يجمع مصطلح <strong>«الخريطة البتية» (Bitmap)</strong> بين كلمتين: <strong>«البت» (Bit)</strong> <strong>و«الخريطة» (Map)</strong>. يمثل البت أصغر وحدة من البيانات في الكمبيوتر، والتي لا يمكنها إلا أن تحمل قيمة <strong>0</strong> أو <strong>1</strong>. أما «الخريطة»، في هذا السياق، فتشير إلى عملية تحويل البيانات وتنظيمها وفقًا للقيمة التي يجب تعيينها لـ 0 و1.</p>
<p>يتكون فهرس الصورة النقطية من مكونين رئيسيين: الصور النقطية والمفاتيح. تمثل المفاتيح القيم الفريدة في الحقل المفهرس. لكل قيمة فريدة، توجد صورة نقطية مقابلة لها. يساوي طول هذه الصور النقطية عدد السجلات في المجموعة. كل بت في الصورة النقطية يقابل سجلًا في المجموعة. إذا كانت قيمة الحقل المفهرس في السجل مطابقة للمفتاح، يتم تعيين البت المقابل إلى <strong>1</strong>؛ وإلا، يتم تعيينه إلى <strong>0</strong>.</p>
<p>لنفترض وجود مجموعة من المستندات تحتوي على الحقلين <strong>«الفئة»</strong> <strong>و«عام</strong>». نريد استرداد المستندات التي تندرج ضمن فئة <strong>«التكنولوجيا</strong> » والمتاحة <strong>«للجمهور</strong>». في هذه الحالة، تكون مفاتيح فهارس الصور النقطية لدينا هي <strong>«التكنولوجيا</strong> » <strong>و«عام</strong>».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitmap.png" alt="Bitmap" class="doc-image" id="bitmap" /> 
   <span>الصورة النقطية</span>
  
 </span></p>
<p>كما هو موضح في الشكل، فإن فهارس الصور النقطية لـ <strong>«Category»</strong> <strong>و«Public»</strong> هي:</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0]، مما يشير إلى أن المستندين الأول والثالث فقط يندرجان ضمن فئة <strong>Tech</strong>.</p></li>
<li><p><strong>«Public</strong>»: [1, 0, 0, 1, 0]، مما يشير إلى أن المستندين الأول والرابع فقط متاحان <strong>للجمهور</strong>.</p></li>
</ul>
<p>للعثور على المستندات التي تتطابق مع كلا المعيارين، نقوم بإجراء عملية «AND» بتية على هاتين الخريطتين البتيتين:</p>
<ul>
<li><strong>«Tech»</strong> و <strong>«Public</strong>»: [1, 0, 0, 0, 0]</li>
</ul>
<p>تشير الصورة النقطية الناتجة [1, 0, 0, 0, 0] إلى أن الوثيقة الأولى فقط (<strong>ID</strong> <strong>1</strong>) هي التي تستوفي كلا المعيارين. باستخدام الفهارس النقطية وعمليات البتات الفعالة، يمكننا تضييق نطاق البحث بسرعة، مما يلغي الحاجة إلى مسح مجموعة البيانات بأكملها.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">إنشاء فهرس خريطة بتية<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس صورة نقطية في Milvus، استخدم الطريقة ` <code translate="no">create_index()</code> ` وقم بتعيين المعلمة ` <code translate="no">index_type</code> ` إلى ` <code translate="no">&quot;BITMAP&quot;</code>`.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
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
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
                .indexType(IndexParam.IndexType.BITMAP)
                .indexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
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

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, index.NewBitmapIndex()).WithIndexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>))

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
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;category&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Bitmap)
                    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>),
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

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-built_in">AddIndex</span>(milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;category_bitmap_index&quot;</span>, milvus::IndexType::BITMAP)));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;BITMAP&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Prepare index building params</span>
<span class="hljs-keyword">var</span> indexParam = <span class="hljs-keyword">new</span> IndexParam(
    fieldName: <span class="hljs-string">&quot;category&quot;</span>,
    indexType: IndexType.Bitmap,
    indexName: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>);

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Indexes = [indexParam]
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
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;indexName&quot;: &quot;category_bitmap_index&quot;,
            &quot;indexType&quot;: &quot;BITMAP&quot;
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، نقوم بإنشاء فهرس صور نقطية في الحقل <code translate="no">category</code> الخاص بمجموعة <code translate="no">my_collection</code>. تُستخدم طريقة <code translate="no">add_index()</code> لتحديد اسم الحقل ونوع الفهرس واسم الفهرس.</p>
<p>بمجرد إنشاء فهرس الصورة النقطية، يمكنك استخدام المعلمة <code translate="no">filter</code> في عمليات الاستعلام لإجراء تصفية قياسية استنادًا إلى الحقل المفهرس. يتيح لك ذلك تضييق نطاق نتائج البحث بكفاءة باستخدام فهرس الصورة النقطية. لمزيد من المعلومات، راجع <a href="/docs/ar/boolean.md">شرح التصفية</a>.</p>
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
    </button></h2><p>استخدم الطريقة ` <code translate="no">drop_index()</code> ` لإزالة فهرس موجود من مجموعة.</p>
<div class="alert note">
<ul>
<li><p>في <strong>الإصدار 2.6.3</strong> أو ما قبله، يجب تحرير المجموعة قبل حذف فهرس سكالي.</p></li>
<li><p>بدءًا من <strong>الإصدار 2.6.4</strong> أو الأحدث، يمكنك حذف الفهرس القياسي مباشرةً بمجرد انتفاء الحاجة إليه — دون الحاجة إلى تحرير المجموعة أولاً.</p></li>
</ul>
</div>
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
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
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

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;category_bitmap_index&quot;</span>))

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
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>)
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
        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;category_bitmap_index&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_bitmap_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">await</span> client.DropIndexAsync(<span class="hljs-keyword">new</span> DropIndexReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// Name of the collection</span>
    IndexName = <span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment">// Name of the index to drop</span>
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
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;category_bitmap_index&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">القيود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>يتم دعم الفهارس النقطية فقط للحقول العددية التي ليست مفاتيح أساسية.</p></li>
<li><p>يجب أن يكون نوع بيانات الحقل أحد الأنواع التالية:</p>
<ul>
<li><p><code translate="no">BOOL</code>، <code translate="no">INT8</code> ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (يجب أن تكون العناصر أحد الأنواع التالية: <code translate="no">BOOL</code> ، <code translate="no">INT8</code> ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>لا تدعم فهارس الصور النقطية أنواع البيانات التالية:</p>
<ul>
<li><p><code translate="no">FLOAT</code>، <code translate="no">DOUBLE</code>: أنواع النقاط العائمة غير متوافقة مع الطبيعة الثنائية لفهرس الصور النقطية.</p></li>
<li><p><code translate="no">JSON</code>: تتميز أنواع بيانات JSON ببنية معقدة لا يمكن تمثيلها بكفاءة باستخدام الفهارس النقطية.</p></li>
</ul></li>
<li><p>فهرس الصور النقطية غير مناسب للحقول ذات الكاردينالية العالية (أي الحقول التي تحتوي على عدد كبير من القيم المتميزة).</p>
<ul>
<li><p>كإرشاد عام، تكون الفهارس النقطية أكثر فعالية عندما يكون عدد القيم في الحقل أقل من 500.</p></li>
<li><p>عندما يزيد عدد القيم عن هذا الحد، تتضاءل مزايا أداء الفهارس النقطية، وتصبح تكلفة التخزين كبيرة.</p></li>
<li><p>بالنسبة للحقول ذات الكاردينالية العالية، ضع في اعتبارك استخدام تقنيات فهرسة بديلة مثل الفهارس المقلوبة، اعتمادًا على حالة الاستخدام المحددة ومتطلبات الاستعلام.</p></li>
</ul></li>
</ul>
