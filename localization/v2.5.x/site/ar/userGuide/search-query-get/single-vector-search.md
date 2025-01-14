---
id: single-vector-search.md
order: 1
summary: >-
  توضح هذه المقالة كيفية البحث عن المتجهات في مجموعة ميلفوس باستخدام متجه
  استعلام واحد.
title: بحث ANN الأساسي
---
<h1 id="Ba​sic-ANN-Search" class="common-anchor-header">بحث ANN الأساسي<button data-href="#Ba​sic-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>استنادًا إلى ملف الفهرس الذي يسجل الترتيب المصنّف لتضمينات المتجهات، يحدد البحث التقريبي لأقرب جار (ANN) مجموعة فرعية من تضمينات المتجهات استنادًا إلى متجه الاستعلام المنقول في طلب البحث المستلم، ويقارن متجه الاستعلام مع تلك الموجودة في المجموعة الفرعية، ويعيد النتائج الأكثر تشابهًا. مع البحث باستخدام ANN، يوفر ميلفوس تجربة بحث فعالة. تساعدك هذه الصفحة على تعلم كيفية إجراء عمليات البحث الأساسية للشبكات النانوية الاصطناعية.</p>
<h2 id="Overview​" class="common-anchor-header">نظرة عامة<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>يعتبر بحث ANN وبحث k-Nearest Neighbours (kNN) هما الطريقتان المعتادتان في عمليات البحث عن تشابه المتجهات. في بحث kNN، يجب مقارنة جميع المتجهات في فضاء المتجهات مع متجه الاستعلام المحمول في طلب البحث قبل معرفة أكثرها تشابهًا، وهو ما يستغرق وقتًا طويلاً ويستهلك الكثير من الموارد.</p>
<p>على عكس عمليات بحث kNN، تطلب خوارزمية بحث الشبكة العصبية الاصطناعية ملف <strong>فهرس</strong> يسجل الترتيب المصنف لتضمينات المتجهات. عند ورود طلب بحث، يمكنك استخدام ملف الفهرس كمرجع لتحديد موقع مجموعة فرعية تحتوي على الأرجح على تضمينات متجهات أكثر تشابهًا مع متجه الاستعلام بسرعة. بعد ذلك، يمكنك استخدام <strong>نوع المقياس</strong> المحدد لقياس التشابه بين متجه الاستعلام وتلك الموجودة في المجموعة الفرعية، وفرز أعضاء المجموعة بناءً على التشابه مع متجه الاستعلام، ومعرفة أعضاء المجموعة <strong>الأعلى K.</strong> </p>
<p>تعتمد عمليات بحث ANN على فهارس مبنية مسبقًا، وقد يختلف إنتاجية البحث واستخدام الذاكرة وصحة البحث باختلاف أنواع الفهارس التي تختارها. تحتاج إلى الموازنة بين أداء البحث وصحة البحث. </p>
<p>ولتقليل منحنى التعلم، يوفر Milvus <strong>الفهرس التلقائي</strong>. باستخدام <strong>AUTOINDEX،</strong> يمكن ل Milvus تحليل توزيع البيانات داخل مجموعتك أثناء إنشاء الفهرس وتعيين معلمات الفهرس الأكثر تحسينًا استنادًا إلى التحليل لتحقيق التوازن بين أداء البحث وصحته. </p>
<p>للحصول على تفاصيل حول AUTOINDEX وأنواع المقاييس المطبقة، راجع <a href="https://milvus.io/docs/glossary.md#Auto-Index">AUTOINDEX</a> <a href="/docs/ar/metric.md">وأنواع المقاييس</a>. ستجد في هذا القسم معلومات مفصلة حول المواضيع التالية.</p>
<ul>
<li><p><a href="#Single-Vector-Search">البحث أحادي المتجه</a></p></li>
<li><p><a href="#Bulk-Vector-Search">البحث في متجه واحد</a></p></li>
<li><p><a href="#ANN-Search-in-Partition">البحث في متجه واحد في التقسيم</a></p></li>
<li><p><a href="#Use-Output-Fields">استخدام حقول الإخراج</a></p></li>
<li><p><a href="#Use-Limit-and-Offset">استخدام الحد والإزاحة</a></p></li>
<li><p><a href="#Enhance-ANN-Search">تعزيز بحث ANN</a></p></li>
</ul>
<h2 id="Single-Vector-Search​" class="common-anchor-header">البحث أحادي المتجه<button data-href="#Single-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>في عمليات بحث ANN، يشير البحث أحادي المتجه إلى بحث يتضمن متجه استعلام واحد فقط. استنادًا إلى الفهرس الذي تم إنشاؤه مسبقًا ونوع المقياس الموجود في طلب البحث، سيجد ميلفوس المتجهات الأكثر تشابهًا مع متجه الاستعلام.</p>
<p>في هذا القسم، ستتعلم في هذا القسم كيفية إجراء بحث من متجه واحد. يفترض مقتطف الشيفرة أنك قمت بإنشاء مجموعة بطريقة <a href="/docs/ar/create-collection-instantly#Quick-Setup">الإعداد السريع</a>. يحمل طلب البحث متجه استعلام واحد ويطلب من ميلفوس استخدام الضرب الداخلي (IP) لحساب التشابه بين متجهات الاستعلام والمتجهات في المجموعة وإرجاع أكثر ثلاثة متجهات متشابهة.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}​
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​
​
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
    ​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.866088, id=7)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;context&quot;</span>​
    <span class="hljs-string">&quot;fmt&quot;</span>​
    <span class="hljs-string">&quot;log&quot;</span>​
​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>​
)​
​
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ExampleClient_Search_basic</span><span class="hljs-params">()</span></span> {​
    ctx, cancel := context.WithCancel(context.Background())​
    <span class="hljs-keyword">defer</span> cancel()​
​
    milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>​
    token := <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
    cli, err := client.New(ctx, &amp;client.ClientConfig{​
        Address: milvusAddr,​
        APIKey:  token,​
    })​
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())​
    }​
​
    <span class="hljs-keyword">defer</span> cli.Close(ctx)​
​
    queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}​
​
    resultSets, err := cli.Search(ctx, client.NewSearchOption(​
        <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName​</span>
        <span class="hljs-number">3</span>,             <span class="hljs-comment">// limit​</span>
        []entity.Vector{entity.FloatVector(queryVector)},​
    ))​
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        log.Fatal(<span class="hljs-string">&quot;failed to perform basic ANN search collection: &quot;</span>, err.Error())​
    }​
​
    <span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {​
        log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)​
        log.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)​
    }​
    <span class="hljs-comment">// Output:​</span>
    <span class="hljs-comment">// IDs:​</span>
    <span class="hljs-comment">// Scores:​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 4. Single vector search​</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: query_vector,​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return​</span>
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)​
​
<span class="hljs-comment">// [​</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }​</span>
<span class="hljs-comment">// ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<p>يصنف Milvus نتائج البحث حسب درجات تشابهها مع متجه الاستعلام بترتيب تنازلي. يُطلق على درجة التشابه أيضًا المسافة إلى متجه الاستعلام، وتختلف نطاقات قيمتها باختلاف أنواع المقاييس المستخدمة.</p>
<p>يسرد الجدول التالي أنواع المقاييس القابلة للتطبيق ونطاقات المسافة المقابلة.</p>
<table data-block-token="CTYBd8RSbogpjGxSmRCc937Qnud"><thead><tr><th data-block-token="Mk6idXTyjokI5FxIHgzc1FmhnLf" colspan="1" rowspan="1"><p data-block-token="DT2rdNtuYoJZPwxsZMCc9zTDnZf">نوع المقياس</p>
</th><th data-block-token="DlbbdGOQ8oy3DJxe57tcR4f9nee" colspan="1" rowspan="1"><p data-block-token="CnVsdS8KboXGUGx9rQFcB0G5nXb">الخصائص</p>
</th><th data-block-token="QhwVdn1JvoCPd5x8Pxrck2QOnEf" colspan="1" rowspan="1"><p data-block-token="GQ4cdd3n4oNnjOxD9uhc5SCpnyh">نطاق المسافة</p>
</th></tr></thead><tbody><tr><td data-block-token="SDGPdrT6ioYrZtx0jn6chigDnRe" colspan="1" rowspan="1"><p data-block-token="BF8Wd7b57oSJxHxeMUvchxNtntg"><code translate="no">L2</code></p>
</td><td data-block-token="R8zodDVyco81tkxgY3Lc3eNpnDe" colspan="1" rowspan="1"><p data-block-token="WOYAdjefpojiUMxhvFxcFzYun5d">تشير القيمة الأصغر إلى تشابه أعلى.</p>
</td><td data-block-token="FDRXdODH5oFZzixRMtXcJTBbnLe" colspan="1" rowspan="1"><p data-block-token="HKPedGZntoh3hDxY587ch8F9nzg">[0, ∞)</p>
</td></tr><tr><td data-block-token="QqHidyCE9ozC6Gxyx28cunhcnvg" colspan="1" rowspan="1"><p data-block-token="FVgcdXpbMolSpdx1ZRSc7sO1nGD"><code translate="no">IP</code></p>
</td><td data-block-token="Rfa8dK5VHowbyQxk1iEcZUrUn5f" colspan="1" rowspan="1"><p data-block-token="L7NTdDhmkozbcwx3ek1cWU8WnCh">تشير القيمة الأكبر إلى تشابه أعلى.</p>
</td><td data-block-token="NhQ5d5F7Bo08Ocxeugicxqh2nrb" colspan="1" rowspan="1"><p data-block-token="E3Etd3rT1o2pwMxeZSdcB0Lpnlf">[-1, 1]</p>
</td></tr><tr><td data-block-token="QasQdmuapouIonxvyNJcBp89nNU" colspan="1" rowspan="1"><p data-block-token="MqFDdgMTgo5weSxNIRJc6XLBn8S"><code translate="no">COSINE</code></p>
</td><td data-block-token="O7hJdRazyo2YpYxBP9AcD1h8nqe" colspan="1" rowspan="1"><p data-block-token="CbhXdgXP3o8lAhxxwchcIvp3nze">تشير القيمة الأكبر إلى تشابه أعلى.</p>
</td><td data-block-token="KrMvdljV3o6KoNxghnZcBBLDnNK" colspan="1" rowspan="1"><p data-block-token="KGZVdGhL9oqfSHxOVF7cg3b4nEh">[-1, 1]</p>
</td></tr><tr><td data-block-token="OSJAd3zrsoPBBMxvmRtc5vpunnh" colspan="1" rowspan="1"><p data-block-token="W8thd8nk3oRpLyxAKrGciKANnJe"><code translate="no">JACCARD</code></p>
</td><td data-block-token="PfMKdBztaoD5e1xKowmc8bUPnOe" colspan="1" rowspan="1"><p data-block-token="ZHAPdWjEsowodbxCnVGc38Qln9f">تشير القيمة الأصغر إلى تشابه أعلى.</p>
</td><td data-block-token="FtMsd7sd4otaEQxF4d3ctRR9nFb" colspan="1" rowspan="1"><p data-block-token="ThTkdBR5roENdsxTVk4cLlTvniy">[0, 1]</p>
</td></tr><tr><td data-block-token="BQcBdYGZWolZuTxijxmchefJnme" colspan="1" rowspan="1"><p data-block-token="Kowbdw3mRot9cAxg9yScuHlandh"><code translate="no">HAMMING</code></p>
</td><td data-block-token="BNYxdVEuVoqd4jxves5cQCXdnoe" colspan="1" rowspan="1"><p data-block-token="Tvghdcmo2omlhUx39tucVUPZnEh">تشير القيمة الأصغر إلى تشابه أعلى.</p>
</td><td data-block-token="YKW8dTla0oe7xdx4Hfjc0i9tned" colspan="1" rowspan="1"><p data-block-token="CzHkdNE2yoWu5ExHtXfcY0G9n2x">[0، خافت (متجه)]</p>
</td></tr></tbody></table>
<h2 id="Bulk-Vector-Search​" class="common-anchor-header">البحث في المتجهات المجمعة<button data-href="#Bulk-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>وبالمثل، يمكنك تضمين عدة متجهات استعلام في طلب البحث. سيُجري ميلفوس عمليات بحث ANN عن متجهات الاستعلام بالتوازي ويعيد مجموعتين من النتائج.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Search with multiple vectors​</span>
<span class="hljs-comment"># 7.1. Prepare query vectors​</span>
query_vectors = [​
    [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>],​
    [<span class="hljs-number">0.0039737443</span>, <span class="hljs-number">0.003020432</span>, -<span class="hljs-number">0.0006188639</span>, <span class="hljs-number">0.03913546</span>, -<span class="hljs-number">0.00089768134</span>]​
]​
​
<span class="hljs-comment"># 7.2. Start search​</span>
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=query_vectors,​
    limit=<span class="hljs-number">3</span>,​
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ],​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 730,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04431751370429993,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 333,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04231833666563034,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 232,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04221535101532936,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
List&lt;BaseVector&gt; queryVectors = Arrays.asList(​
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.041732933f</span>, <span class="hljs-number">0.013779674f</span>, -<span class="hljs-number">0.027564144f</span>, -<span class="hljs-number">0.013061441f</span>, <span class="hljs-number">0.009748648f</span>}),​
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0039737443f</span>, <span class="hljs-number">0.003020432f</span>, -<span class="hljs-number">0.0006188639f</span>, <span class="hljs-number">0.03913546f</span>, -<span class="hljs-number">0.00089768134f</span>})​
);​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .data(queryVectors)​
        .topK(<span class="hljs-number">3</span>)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49548206, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.320147, id=3)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.107413776, id=6)​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5678123, id=6)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.32368967, id=2)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24108477, id=3)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Search with multiple vectors​</span>
<span class="hljs-keyword">const</span> query_vectors = [​
    [<span class="hljs-meta">0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592</span>], ​
    [<span class="hljs-meta">0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104</span>]​
]​
​
res = <span class="hljs-keyword">await</span> client.search({​
    collection_name: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    vectors: query_vectors,​
    limit: <span class="hljs-number">5</span>,​
})​
​
console.log(res.results)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// [​</span>
<span class="hljs-comment">//   [​</span>
<span class="hljs-comment">//     { score: 0.08821295201778412, id: &#x27;551&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.0800950899720192, id: &#x27;296&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.07794742286205292, id: &#x27;43&#x27; }​</span>
<span class="hljs-comment">//   ],​</span>
<span class="hljs-comment">//   [​</span>
<span class="hljs-comment">//     { score: 0.04431751370429993, id: &#x27;730&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.04231833666563034, id: &#x27;333&#x27; },​</span>
<span class="hljs-comment">//     { score: 0.04221535101532936, id: &#x27;232&#x27; },​</span>
<span class="hljs-comment">//   ]​</span>
<span class="hljs-comment">// ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         [​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 551​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 296​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 43​</span>
<span class="hljs-comment">#           }​</span>
<span class="hljs-comment">#         ],​</span>
<span class="hljs-comment">#         [​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04431751370429993,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 730​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04231833666563034,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 333​</span>
<span class="hljs-comment">#           },​</span>
<span class="hljs-comment">#           {​</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04221535101532936,​</span>
<span class="hljs-comment">#               &quot;id&quot;: 232​</span>
<span class="hljs-comment">#           }​</span>
<span class="hljs-comment">#        ]​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="ANN-Search-in-Partition​" class="common-anchor-header">ANN البحث في التقسيم<button data-href="#ANN-Search-in-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>لنفترض أنك قمت بإنشاء أقسام متعددة في مجموعة، ويمكنك تضييق نطاق البحث إلى عدد محدد من الأقسام. في هذه الحالة، يمكنك تضمين أسماء الأقسام المستهدفة في طلب البحث لتقييد نطاق البحث ضمن الأقسام المحددة. يؤدي تقليل عدد الأقسام المتضمنة في البحث إلى تحسين أداء البحث.</p>
<p>يفترض مقتطف الشيفرة التالي وجود قسم باسم <strong>PartitionA</strong> في مجموعتك.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],​
    data=[query_vector],​
    <span class="hljs-built_in">limit</span>=3,​
)​
​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​
​
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.6395302, id=13)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5408028, id=12)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49696884, id=17)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search​</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],​
    <span class="hljs-attr">data</span>: query_vector,​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return​</span>
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)​
​
<span class="hljs-comment">// [​</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },​</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }​</span>
<span class="hljs-comment">// ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Output-Fields​" class="common-anchor-header">استخدام حقول المخرجات<button data-href="#Use-Output-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>في نتيجة البحث، يتضمن Milvus قيم الحقول الأساسية ومسافات/درجات التشابه للكيانات التي تحتوي على تضمينات متجه K الأعلى افتراضيًا. يمكنك تضمين أسماء الحقول المستهدفة في طلب البحث كحقول مخرجات لجعل نتائج البحث تحمل قيم الحقول الأخرى في هذه الكيانات.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    data=[query_vector],​
    <span class="hljs-built_in">limit</span>=3, <span class="hljs-comment"># The number of results to return​</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-next-line​</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># [​</span>
<span class="hljs-comment">#     [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {​</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;orange_6781&quot;​</span>
<span class="hljs-comment">#             }​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {​</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;red_4794&quot;​</span>
<span class="hljs-comment">#             }​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;entity&quot;: {​</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;grey_8510&quot;​</span>
<span class="hljs-comment">#             }​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># ]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=black_9955}, score=0.95944905, id=5)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_7319}, score=0.8689616, id=1)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=white_5015}, score=0.866088, id=7)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">// <span class="hljs-number">4.</span> Single vector search​
var query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.search({​
    collection_name: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    data: query_vector,​
    limit: <span class="hljs-number">3</span>, // The number of results to <span class="hljs-keyword">return</span>​
    // highlight-<span class="hljs-built_in">next</span>-line​
    output_fields: [<span class="hljs-string">&quot;color&quot;</span>]​
})​
​
console.log(res.results)​
​
// [​
//   { score: <span class="hljs-number">0.08821295201778412</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;551&#x27;</span>, entity: {<span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>}},​
//   { score: <span class="hljs-number">0.0800950899720192</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;296&#x27;</span> entity: {<span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>}},​
//   { score: <span class="hljs-number">0.07794742286205292</span>, <span class="hljs-built_in">id</span>: <span class="hljs-string">&#x27;43&#x27;</span> entity: {<span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>}}​
// ]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3,​
    &quot;outputFields&quot;: [&quot;color&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: [​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,​</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;orange_6781&quot;​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,​</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;red_4794&quot;​</span>
<span class="hljs-comment">#         },​</span>
<span class="hljs-comment">#         {​</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,​</span>
<span class="hljs-comment">#             &quot;id&quot;: 43​</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;grey_8510&quot;​</span>
<span class="hljs-comment">#         }​</span>
<span class="hljs-comment">#     ]​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Limit-and-Offset​" class="common-anchor-header">استخدام الحد والإزاحة<button data-href="#Use-Limit-and-Offset​" class="anchor-icon" translate="no">
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
    </button></h2><p>قد تلاحظ أن المعلمة <code translate="no">limit</code> التي يتم حملها في طلبات البحث تحدد عدد الكيانات المراد تضمينها في نتائج البحث. تحدد هذه المعلمة الحد الأقصى لعدد الكيانات المراد إرجاعها في بحث واحد، وعادةً ما يُطلق عليها <strong>الحد الأعلى-ك</strong>.</p>
<p>إذا كنت ترغب في إجراء استعلامات مرقمة، يمكنك استخدام حلقة لإرسال طلبات بحث متعددة، مع معلمي <strong>الحد</strong> <strong>والإزاحة</strong> المنقولين في كل طلب استعلام. على وجه التحديد، يمكنك تعيين معلمة <strong>الحد</strong> إلى عدد الكيانات التي تريد تضمينها في نتائج الاستعلام الحالية، وتعيين <strong>الإزاحة</strong> إلى إجمالي عدد الكيانات التي تم إرجاعها بالفعل.</p>
<p>يوضح الجدول أدناه كيفية تعيين معلمات <strong>الحد</strong> <strong>والإزاحة</strong> للاستعلامات المرقمة عند إرجاع 100 كيان في المرة الواحدة.</p>
<table data-block-token="WHdZdkFtYol0QWxfjYzcMsyrnHd"><thead><tr><th data-block-token="YRpAdF69noO2EwxQJKkcRoB4nGp" colspan="1" rowspan="1"><p data-block-token="EhjLdXqY7op6anxCtOtc8KeKnkh">الاستعلامات</p>
</th><th data-block-token="D6tSdFQQAouKA3xol6RcGFUCn4c" colspan="1" rowspan="1"><p data-block-token="KjGadCmVxoLmmIxjI3McBr18nFg">الكيانات المراد إرجاعها لكل استعلام</p>
</th><th data-block-token="IDzvd2OCho3Qp0xMwXWcMZLlnWg" colspan="1" rowspan="1"><p data-block-token="RP69d4efqoAHXkxkY8OcBwPXn9e">الكيانات التي تم إرجاعها بالفعل في المجموع</p>
</th></tr></thead><tbody><tr><td data-block-token="QkqCdnVafo68dGxGRmicOHEQnxe" colspan="1" rowspan="1"><p data-block-token="QyEBdwnZiolkYZxWLYPc59j6nL0">الاستعلام <strong>الأول</strong> </p>
</td><td data-block-token="E4vsdiNZQowy6rxIy0ecRQC4nEc" colspan="1" rowspan="1"><p data-block-token="QYfudUm7uokKlIxw2n9cxKGKnyg">100</p>
</td><td data-block-token="KpaFdQx6qow5zcxElk4clK8dnEp" colspan="1" rowspan="1"><p data-block-token="ZwAAd3eu8oYltYxeyCzcvmkLnbh">0</p>
</td></tr><tr><td data-block-token="D8teddAAZoM2duxDniIc2njyn6C" colspan="1" rowspan="1"><p data-block-token="CdySdMxJ2oZ0uSxNddQcByijnhb">الاستعلام <strong>الثاني</strong> </p>
</td><td data-block-token="EhRzdF75hoPXIsxmi4Iczj87nIc" colspan="1" rowspan="1"><p data-block-token="VAPzdkDTHogP5axuOI8c101tnAh">100</p>
</td><td data-block-token="WZQ1dHMMPooABtxi0OfcEOC7nQe" colspan="1" rowspan="1"><p data-block-token="LQ59denn6obaw0xiNGec9uVEn7f">100</p>
</td></tr><tr><td data-block-token="LqQcdHDM5ozahHxEiKzcOtrxn2g" colspan="1" rowspan="1"><p data-block-token="KfKjdUdK3oAt7Fx2w7icUIapnbd">الاستعلام <strong>الثالث</strong> </p>
</td><td data-block-token="W1TfddD7poKCKzxX83wcjvoXnXb" colspan="1" rowspan="1"><p data-block-token="ELT7dJe2Ao8L6LxZODccTjAcnKb">100</p>
</td><td data-block-token="SDYedyTVDoSt9Pxwf2xcQtrInBb" colspan="1" rowspan="1"><p data-block-token="DmAId1cA0oOaUNxg6bzc1iIEn2I">200</p>
</td></tr><tr><td data-block-token="EV1Sddbj4og1YnxN3pVcI4PenWe" colspan="1" rowspan="1"><p data-block-token="J1zAdtY1MosjA0xrNuycUTLln7b">الاستعلام <strong>التاسع</strong> </p>
</td><td data-block-token="M9EPdp9haoP5HqxfNvTcP9Non3e" colspan="1" rowspan="1"><p data-block-token="KNJfdZ7bFo9Jooxy2d2ckuf7n3c">100</p>
</td><td data-block-token="NobhdOnAgo2DFixUrNTcmBOVnje" colspan="1" rowspan="1"><p data-block-token="DxU4dV3WpoqEDbxMIWYcumjenUb">100 × (ن-1)</p>
</td></tr></tbody></table>
<p>لاحظ أنه، يجب أن يكون مجموع <code translate="no">limit</code> و <code translate="no">offset</code> في بحث واحد لشبكة ANN أقل من 16,384.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا جافا</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search​</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return​</span>
    search_params={​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, ​
        <span class="hljs-comment"># highlight-next-line​</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">10</span> <span class="hljs-comment"># The records to skip​</span>
    }​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp​
​
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});​
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .offset(<span class="hljs-number">10</span>)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​
​
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();​
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {​
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);​
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {​
        System.out.println(result);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// TopK results:​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24120237, id=16)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.22559784, id=9)​</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=-0.09906838, id=2)​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search​</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">data</span>: query_vector,​
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return,​</span>
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">offset</span>: <span class="hljs-number">10</span> <span class="hljs-comment">// The record to skip.​</span>
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;annsField&quot;: &quot;vector&quot;,​
    &quot;limit&quot;: 3,​
    &quot;offset&quot;: 10​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Enhancing-ANN-Search​" class="common-anchor-header">تعزيز البحث في الشبكة العصبية الاصطناعية<button data-href="#Enhancing-ANN-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل نظام AUTOINDEX على تسطيح منحنى التعلّم لعمليات بحث الشبكة العصبية الاصطناعية إلى حد كبير. ومع ذلك، قد لا تكون نتائج البحث صحيحة دائمًا مع زيادة أعلى K. من خلال تقليل نطاق البحث، وتحسين ملاءمة نتائج البحث، وتنويع نتائج البحث، يعمل ميلفوس على تحسينات البحث التالية.</p>
<ul>
<li><p>البحث المصفى</p>
<p>يمكنك تضمين شروط التصفية في طلب البحث بحيث يقوم ميلفوس بإجراء تصفية للبيانات الوصفية قبل إجراء عمليات بحث ANN، مما يقلل نطاق البحث من المجموعة بأكملها إلى الكيانات المطابقة لشروط التصفية المحددة فقط.</p>
<p>لمعرفة المزيد حول تصفية البيانات الوصفية وشروط التصفية، راجع <a href="/docs/ar/filtered-search.md">البحث المصفى</a> <a href="/docs/ar/boolean.md">وتصفية البيانات الوصفية</a>.</p></li>
<li><p>نطاق البحث</p>
<p>يمكنك تحسين ملاءمة نتائج البحث عن طريق تقييد مسافة أو درجة الكيانات التي تم إرجاعها ضمن نطاق محدد. في ميلفوس، يتضمن البحث في النطاق رسم دائرتين متحدتي المركز مع تضمين المتجه الأكثر تشابهًا مع متجه الاستعلام كمركز. يحدد طلب البحث نصف قطر كلتا الدائرتين، ويعيد ميلفوس جميع التضمينات المتجهة التي تقع ضمن الدائرة الخارجية وليس الدائرة الداخلية.</p>
<p>لمعرفة المزيد حول بحث النطاق، راجع <a href="/docs/ar/range-search.md">بحث النطاق</a>.</p></li>
<li><p>بحث التجميع</p>
<p>إذا كانت الكيانات التي تم إرجاعها تحمل نفس القيمة في حقل معين، فقد لا تمثل نتائج البحث توزيع جميع التضمينات المتجهة في الفضاء المتجه. لتنويع نتائج البحث، فكر في استخدام بحث التجميع.</p>
<p>لمعرفة المزيد حول بحث التجميع، راجع <a href="/docs/ar/grouping-search.md">بحث التجميع</a>.</p></li>
<li><p>البحث المختلط</p>
<p>يمكن أن تتضمن المجموعة ما يصل إلى أربعة حقول متجهة لحفظ التضمينات المتجهة التي تم إنشاؤها باستخدام نماذج تضمين مختلفة. من خلال القيام بذلك، يمكنك استخدام بحث مختلط لإعادة ترتيب نتائج البحث من هذه الحقول المتجهة، مما يحسن معدل الاستدعاء.</p>
<p>لمعرفة المزيد حول البحث المختلط، راجع <a href="/docs/ar/multi-vector-search.md">البحث المختلط</a>.</p></li>
<li><p>مكرر البحث</p>
<p>يقوم بحث ANN واحد بإرجاع 16,384 كيانًا كحد أقصى. فكر في استخدام مكرر البحث إذا كنت بحاجة إلى إرجاع المزيد من الكيانات في بحث واحد.</p>
<p>للحصول على تفاصيل حول مكرر البحث، راجع مكرر <a href="/docs/ar/with-iterators.md">البحث</a>.</p></li>
<li><p>البحث بالنص الكامل</p>
<p>البحث بالنص الكامل هي ميزة تسترجع المستندات التي تحتوي على مصطلحات أو عبارات محددة في مجموعات البيانات النصية، ثم تقوم بترتيب النتائج بناءً على مدى الصلة. تتغلب هذه الميزة على قيود البحث الدلالي، التي قد تغفل المصطلحات الدقيقة، مما يضمن حصولك على النتائج الأكثر دقة وذات الصلة بالسياق. بالإضافة إلى ذلك، تعمل هذه الميزة على تبسيط عمليات البحث المتجهية من خلال قبول مدخلات النص الخام، وتحويل بياناتك النصية تلقائيًا إلى تضمينات متفرقة دون الحاجة إلى إنشاء تضمينات متجهة يدويًا.</p>
<p>للحصول على تفاصيل حول البحث في النص الكامل، راجع <a href="/docs/ar/full-text-search.md">البحث في النص الكامل</a>.</p></li>
<li><p>مطابقة النص</p>
<p>تتيح مطابقة النص في ميلفوس استرجاع المستندات بدقة بناءً على مصطلحات محددة. تُستخدم هذه الميزة في المقام الأول للبحث المصفى لاستيفاء شروط محددة ويمكنها دمج التصفية القياسية لتحسين نتائج الاستعلام، مما يسمح بالبحث عن التشابه داخل المتجهات التي تستوفي المعايير القياسية.</p>
<p>للحصول على تفاصيل حول مطابقة النص، راجع <a href="/docs/ar/keyword-match.md">مطابقة النص</a>.</p></li>
<li><p>استخدام مفتاح التقسيم</p>
<p>قد يؤثر تضمين حقول قياسية متعددة في تصفية البيانات الوصفية واستخدام شرط تصفية معقد نوعًا ما على كفاءة البحث. بمجرد تعيين حقل قياسي كمفتاح التقسيم واستخدام شرط تصفية يتضمن مفتاح التقسيم في طلب البحث، يمكن أن يساعد في تقييد نطاق البحث داخل الأقسام المطابقة لقيم مفتاح التقسيم المحددة. </p>
<p>للحصول على تفاصيل حول مفتاح القسم، راجع <a href="/docs/ar/use-partition-key.md">استخدام مفتاح القسم</a>.</p></li>
<li><p>استخدام مفتاح التقسيم</p>
<p>في Milvus، تسمح الملفات المعينة بالذاكرة بتعيين مباشر لمحتويات الملفات في الذاكرة. تعمل هذه الميزة على تحسين كفاءة الذاكرة، خاصةً في الحالات التي تكون فيها الذاكرة المتوفرة نادرة ولكن تحميل البيانات بالكامل غير ممكن. يمكن لآلية التحسين هذه أن تزيد من سعة البيانات مع ضمان الأداء حتى حد معين؛ ومع ذلك، عندما يتجاوز حجم البيانات الذاكرة بقدر كبير، قد يعاني أداء البحث والاستعلام من تدهور خطير، لذا يرجى اختيار تشغيل هذه الميزة أو إيقاف تشغيلها حسب الاقتضاء.</p>
<p>للحصول على تفاصيل حول إعدادات mmap-settings، راجع <a href="/docs/ar/mmap.md">استخدام mmap</a>.</p></li>
<li><p>ضغط التجميع</p>
<p>تم تصميم ضغط التجميع لتحسين أداء البحث وتقليل التكاليف في المجموعات الكبيرة. سيساعدك هذا الدليل على فهم ضغط التجميع وكيف يمكن لهذه الميزة تحسين أداء البحث.</p>
<p>للحصول على تفاصيل حول ضغط التجميع، راجع <a href="/docs/ar/clustering-compaction.md">ضغط الت</a>جميع.</p></li>
</ul>
