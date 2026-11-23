---
id: bitmap.md
title: BITMAP
summary: >-
  استخدم BITMAP للتصفية القياسية ذات الكاردينالية المنخفضة. تحقق من المرشحات
  المدعومة، وقيود الحقول، وإنشاء الفهارس.
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
    </button></h1><p><code translate="no">BITMAP</code> تعمل على تسريع عملية التصفية القياسية للحقول التي تحتوي على عدد قليل من القيم المتميزة، مثل رموز الحالة والفئات. ويُقصد بالعددية عدد القيم المتميزة في الحقل. تصف هذه الصفحة عوامل التصفية المدعومة، وقيود الحقول، وإنشاء الفهارس.</p>
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
    </button></h2><!-- Preserve the published #Limits link and the filter link used by related pages. These anchors are not headings. -->
<a id="Limits"></a>
<a id="Queries-accelerated-by-BITMAP"></a>
<h3 id="Index-targets-and-filters" class="common-anchor-header">أهداف الفهرس والمرشحات<button data-href="#Index-targets-and-filters" class="anchor-icon" translate="no">
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
    </button></h3><p>لإنشاء فهرس « <code translate="no">BITMAP</code> » بشكل صريح، اختر هدفًا غير مفتاح أساسي من الجدول أدناه. يربط كل صف هدفًا مدعومًا بالمرشحات التي يمكن للفهرس المساعدة في تقييمها:</p>
<table>
<thead>
<tr><th>هدف الفهرس</th><th>المعايير التي يمكنها استخدام الفهرس</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code> الحقل</td><td>المساواة (<code translate="no">==</code> ، <code translate="no">!=</code>) والانتماء (<code translate="no">in</code> ، <code translate="no">not in</code>).</td></tr>
<tr><td>الحقل الصحيح (<code translate="no">INT8</code> ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code>)</td><td>المساواة والانتماء والنطاقات (<code translate="no">&lt;</code> ، <code translate="no">&lt;=</code> ، <code translate="no">&gt;</code> ، <code translate="no">&gt;=</code>).</td></tr>
<tr><td><code translate="no">VARCHAR</code> الحقل</td><td>المساواة، والانتماء، والنطاقات، <a href="/docs/ar/pattern-matching.md">وأنماط LIKE أو regex</a>. يمكن لتقييم النمط أن يمر على العديد من السلاسل المفهرسة المتميزة.</td></tr>
<tr><td>حقل <code translate="no">ARRAY</code> عادي مع عناصر <code translate="no">BOOL</code> ، <code translate="no">INT8</code> ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، أو <code translate="no">VARCHAR</code> </td><td><code translate="no">ARRAY_CONTAINS</code>، <code translate="no">ARRAY_CONTAINS_ANY</code> ، <code translate="no">ARRAY_CONTAINS_ALL</code>. انظر <a href="/docs/ar/array_data_type.md#Array-index-support">دعم مؤشر المصفوفة</a>.</td></tr>
<tr><td>تحويل مسار JSON إلى <code translate="no">BOOL</code> أو <code translate="no">VARCHAR</code></td><td>مرشحات للقيم المنطقية أو السلسلية المقابلة أعلاه، وفقًا <a href="/docs/ar/json-indexing.md#Index-requirements">لمتطلبات فهرس JSON</a>.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>لا تدعم الفهارس القياسية، بما في ذلك <code translate="no">AUTOINDEX</code> ، حقول ARRAY التكرارية أو المصفوفات التي تحتوي على عناصر قابلة للقيمة null. انظر <a href="/docs/ar/array_data_type.md#Array-index-support">دعم فهرس المصفوفة</a> لمعاملات تصفية المصفوفات العادية <a href="/docs/ar/index-structarray-fields.md#Create-scalar-indexes">وفهرسة حقول StructArray</a> لقواعد الحقول الفرعية.</p>
</blockquote>
</div>
<p>بالنسبة لأهداف ARRAY، يستخدم <code translate="no">BITMAP</code> عوامل تصفية احتواء العناصر، وليس المساواة للمصفوفة بأكملها، أو الوصول إلى العناصر حسب الموضع، أو طول المصفوفة. انظر <a href="/docs/ar/array_data_type.md#Array-index-support">دعم فهرس المصفوفات</a>.</p>
<p>بالنسبة للاختيار التلقائي خارج نطاق هذه الأهداف الصريحة، راجع <a href="/docs/ar/scalar_index.md#AUTOINDEX-behavior">سلوك AUTOINDEX</a>.</p>
<div class="alert note">
<blockquote>
<p>هذه هي إمكانيات الفهرس، وليست قيودًا على تعبيرات المرشحات الصالحة. انظر <a href="/docs/ar/scalar_index.md#Filter-execution">«الفهرس القياسي» (Scalar Index)</a> لمعرفة قيود البحث المشتركة. بالنسبة لاختبارات <code translate="no">AND</code> و <code translate="no">OR</code> و <code translate="no">NOT</code> وNULL (<code translate="no">IS NULL</code> و <code translate="no">IS NOT NULL</code>)، انظر <a href="/docs/ar/basic-operators.md">«المشغلات الأساسية» (Basic Operators</a>).</p>
</blockquote>
</div>
<h3 id="Memory-considerations" class="common-anchor-header">اعتبارات الذاكرة<button data-href="#Memory-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>تعتمد تكاليف الذاكرة والاستعلام على عدد القيم المتميزة وتوزيعها. قارن الفهارس باستخدام عوامل تصفية تمثيلية بدلاً من التعامل مع الكاردينالية الثابتة كحد فاصل عام للأداء.</p>
<p>بالنسبة للخرائط النقطية الكثيفة، فإن التقدير التقريبي بالبايت هو <code translate="no">(D + 1) * N / 8</code> ، حيث <code translate="no">N</code> هو عدد الكيانات و <code translate="no">D</code> هو عدد القيم المتميزة. ويشمل ذلك خريطة نقطية واحدة لكل قيمة متميزة وأخرى للتحقق من الصحة. يُضاف تخزين القيم والتكاليف الإضافية الأخرى إلى هذا التقدير؛ حيث تضيف ذاكرة التخزين المؤقتة الاختيارية حوالي <code translate="no">8 * N</code> بايت على نظام 64 بت. وقد تختلف استهلاك الذاكرة بشكل كبير في تمثيلات الصور النقطية المضغوطة.</p>
<p>تغطي هذه التقديرات التقريبية ذاكرة الفهرس المحملة مع تعطيل تعيين الذاكرة. احسبها لكل مقطع، ثم اجمعها عبر المقاطع المحملة والنسخ المتماثلة.</p>
<div class="alert note">
<blockquote>
<p>خصص ذاكرة إضافية لبيانات الحقول المحملة، وفهارس المتجهات، والتكاليف الإضافية للمجموعات والفهارس، والتخصيصات المؤقتة. تحقق من صحة التقديرات باستخدام بيانات واستعلامات تمثيلية؛ حيث تتطلب المصفوفات، وملفات JSON، وتنسيقات الفهارس القديمة، وتعيين الذاكرة قياسات منفصلة.</p>
</blockquote>
</div>
<h3 id="How-BITMAP-works" class="common-anchor-header">كيفية عمل BITMAP<button data-href="#How-BITMAP-works" class="anchor-icon" translate="no">
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
    </button></h3><p><details>
<summary><strong>عرض مثال على تصفية الصور النقطية</strong></summary></p>
<p>يربط فهرس الصور النقطية كل قيمة حقل مميزة بصورة نقطية. ويتوافق كل بت مع كيان: حيث يعني <strong>الرقم 1</strong> أن الكيان يحتوي على تلك القيمة، بينما يعني <strong>الرقم 0</strong> أنه لا يحتوي عليها.</p>
<p>على سبيل المثال، للعثور على المستندات العامة في فئة <strong>«Tech</strong> »، اجمع الصور النقطية الخاصة بـ <strong>«Category = Tech</strong> » و <strong>«Public = true</strong>»:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitmap.png" alt="Bitmap" class="doc-image" id="bitmap" /> 
   <span>الصورة النقطية</span>
  
 </span></p>
<p>كما هو موضح في الشكل، فإن فهارس الصور النقطية لـ <strong>«الفئة»</strong> <strong>و«عامة»</strong> هي:</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0]، مما يشير إلى أن المستندين الأول والثالث فقط يندرجان ضمن فئة <strong>Tech</strong>.</p></li>
<li><p><strong>«Public</strong>»: [1، 0، 0، 1، 0]، مما يشير إلى أن الوثيقتين الأولى والرابعة فقط متاحتان <strong>للجمهور</strong>.</p></li>
</ul>
<p>للعثور على المستندات التي تتطابق مع كلا المعيارين، نقوم بإجراء عملية «AND» بتية على هاتين الخريطتين البتيتين:</p>
<ul>
<li><strong>التقنية</strong> و <strong>«عامة</strong>»: [1، 0، 0، 0، 0]</li>
</ul>
<p>الوثيقة الأولى فقط (<strong>رقم التعريف 1</strong>) هي التي تستوفي كلا المعيارين.</p>
<p></details></p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">إنشاء فهرس صور نقطية<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>لإنشاء فهرس صور نقطية في Milvus، استخدم طريقة ` <code translate="no">create_index()</code> ` وقم بتعيين المعلمة ` <code translate="no">index_type</code> ` إلى ` <code translate="no">&quot;BITMAP&quot;</code>`.</p>
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
<p>يؤدي هذا إلى إنشاء فهرس على <code translate="no">my_collection.category</code>. استخدم الحقل في استعلام أو ابحث عن <code translate="no">filter</code> ؛ انظر <a href="/docs/ar/boolean.md">شرح التصفية</a>.</p>
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
<blockquote>
<p>للاطلاع على متطلبات الإصدار عند حذف فهرس سكالاري، راجع <a href="/docs/ar/scalar_index.md#Drop-index-compatibility">«الفهرس السكالاري</a>».</p>
</blockquote>
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
