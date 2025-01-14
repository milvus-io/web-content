---
id: single-vector-search.md
order: 1
summary: >-
  В этой статье описывается, как искать векторы в коллекции Milvus с помощью
  одного вектора запроса.
title: Базовый ANN-поиск
---
<h1 id="Ba​sic-ANN-Search" class="common-anchor-header">Базовый ANN-поиск<button data-href="#Ba​sic-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>На основе индексного файла, в котором хранится отсортированный порядок векторных вкраплений, поиск по методу приближенного ближайшего соседа (ANN) находит подгруппу векторных вкраплений на основе вектора запроса, содержащегося в полученном поисковом запросе, сравнивает вектор запроса с векторами в подгруппе и возвращает наиболее похожие результаты. С помощью ANN-поиска Milvus обеспечивает эффективный поиск. Эта страница поможет вам узнать, как проводить базовый поиск с помощью ANN.</p>
<h2 id="Overview​" class="common-anchor-header">Обзор<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Поиск ANN и поиск k-Nearest Neighbors (kNN) являются обычными методами поиска векторного сходства. При kNN-поиске необходимо сравнить все векторы в векторном пространстве с вектором запроса, переданным в поисковом запросе, прежде чем определить наиболее похожие, что занимает много времени и ресурсов.</p>
<p>В отличие от kNN-поиска, алгоритм ANN-поиска запрашивает <strong>индексный</strong> файл, в котором записан отсортированный порядок векторных вкраплений. Когда поступает запрос на поиск, вы можете использовать индексный файл в качестве справочника, чтобы быстро найти подгруппу, вероятно, содержащую векторные вложения, наиболее похожие на вектор запроса. Затем вы можете использовать указанный <strong>тип метрики</strong> для измерения сходства между вектором запроса и векторами в подгруппе, отсортировать членов группы по сходству с вектором запроса и определить членов группы <strong>Top-K</strong>.</p>
<p>Поиск в ANN зависит от предварительно созданных индексов, поэтому производительность поиска, использование памяти и корректность поиска могут отличаться в зависимости от выбранного типа индекса. Необходимо соблюдать баланс между производительностью и корректностью поиска. </p>
<p>Чтобы сократить время обучения, Milvus предоставляет <strong>AUTOINDEX</strong>. С помощью <strong>AUTOINDEX</strong> Milvus анализирует распределение данных в вашей коллекции во время создания индекса и устанавливает наиболее оптимальные параметры индекса на основе анализа, чтобы найти баланс между производительностью и корректностью поиска. </p>
<p>Подробные сведения об AUTOINDEX и применимых типах метрик см. в разделе <a href="https://milvus.io/docs/glossary.md#Auto-Index">AUTOINDEX</a> и <a href="/docs/ru/metric.md">типы метрик</a>. В этом разделе вы найдете подробную информацию о следующих темах.</p>
<ul>
<li><p><a href="#Single-Vector-Search">Одновекторный поиск</a></p></li>
<li><p><a href="#Bulk-Vector-Search">Поиск по объемному вектору</a></p></li>
<li><p><a href="#ANN-Search-in-Partition">ANN-поиск в разделе</a></p></li>
<li><p><a href="#Use-Output-Fields">Использование полей вывода</a></p></li>
<li><p><a href="#Use-Limit-and-Offset">Использование ограничения и смещения</a></p></li>
<li><p><a href="#Enhance-ANN-Search">Усовершенствование поиска с помощью ANN</a></p></li>
</ul>
<h2 id="Single-Vector-Search​" class="common-anchor-header">Одновекторный поиск<button data-href="#Single-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>В ANN-поиске одновекторный поиск означает поиск, который включает только один вектор запроса. На основе предварительно созданного индекса и типа метрики, указанного в поисковом запросе, Milvus найдет топ-K векторов, наиболее похожих на вектор запроса.</p>
<p>В этом разделе вы узнаете, как выполнить одновекторный поиск. Сниппет кода предполагает, что вы создали коллекцию <a href="/docs/ru/create-collection-instantly#Quick-Setup">быстрым</a> способом. Запрос на поиск содержит один вектор запроса и просит Milvus использовать Inner Product (IP) для расчета сходства между векторами запроса и векторами в коллекции и возвращает три наиболее похожих.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<p>Milvus ранжирует результаты поиска по степени их сходства с вектором запроса в порядке убывания. Показатель сходства также называется расстоянием до вектора запроса, и его диапазон значений зависит от используемых типов метрик.</p>
<p>В следующей таблице перечислены используемые типы метрик и соответствующие диапазоны расстояний.</p>
<table data-block-token="CTYBd8RSbogpjGxSmRCc937Qnud"><thead><tr><th data-block-token="Mk6idXTyjokI5FxIHgzc1FmhnLf" colspan="1" rowspan="1"><p data-block-token="DT2rdNtuYoJZPwxsZMCc9zTDnZf">Тип метрики</p>
</th><th data-block-token="DlbbdGOQ8oy3DJxe57tcR4f9nee" colspan="1" rowspan="1"><p data-block-token="CnVsdS8KboXGUGx9rQFcB0G5nXb">Характеристики</p>
</th><th data-block-token="QhwVdn1JvoCPd5x8Pxrck2QOnEf" colspan="1" rowspan="1"><p data-block-token="GQ4cdd3n4oNnjOxD9uhc5SCpnyh">Диапазон расстояний</p>
</th></tr></thead><tbody><tr><td data-block-token="SDGPdrT6ioYrZtx0jn6chigDnRe" colspan="1" rowspan="1"><p data-block-token="BF8Wd7b57oSJxHxeMUvchxNtntg"><code translate="no">L2</code></p>
</td><td data-block-token="R8zodDVyco81tkxgY3Lc3eNpnDe" colspan="1" rowspan="1"><p data-block-token="WOYAdjefpojiUMxhvFxcFzYun5d">Меньшее значение указывает на большее сходство.</p>
</td><td data-block-token="FDRXdODH5oFZzixRMtXcJTBbnLe" colspan="1" rowspan="1"><p data-block-token="HKPedGZntoh3hDxY587ch8F9nzg">[0, ∞)</p>
</td></tr><tr><td data-block-token="QqHidyCE9ozC6Gxyx28cunhcnvg" colspan="1" rowspan="1"><p data-block-token="FVgcdXpbMolSpdx1ZRSc7sO1nGD"><code translate="no">IP</code></p>
</td><td data-block-token="Rfa8dK5VHowbyQxk1iEcZUrUn5f" colspan="1" rowspan="1"><p data-block-token="L7NTdDhmkozbcwx3ek1cWU8WnCh">Большее значение указывает на большее сходство.</p>
</td><td data-block-token="NhQ5d5F7Bo08Ocxeugicxqh2nrb" colspan="1" rowspan="1"><p data-block-token="E3Etd3rT1o2pwMxeZSdcB0Lpnlf">[-1, 1]</p>
</td></tr><tr><td data-block-token="QasQdmuapouIonxvyNJcBp89nNU" colspan="1" rowspan="1"><p data-block-token="MqFDdgMTgo5weSxNIRJc6XLBn8S"><code translate="no">COSINE</code></p>
</td><td data-block-token="O7hJdRazyo2YpYxBP9AcD1h8nqe" colspan="1" rowspan="1"><p data-block-token="CbhXdgXP3o8lAhxxwchcIvp3nze">Большее значение указывает на большее сходство.</p>
</td><td data-block-token="KrMvdljV3o6KoNxghnZcBBLDnNK" colspan="1" rowspan="1"><p data-block-token="KGZVdGhL9oqfSHxOVF7cg3b4nEh">[-1, 1]</p>
</td></tr><tr><td data-block-token="OSJAd3zrsoPBBMxvmRtc5vpunnh" colspan="1" rowspan="1"><p data-block-token="W8thd8nk3oRpLyxAKrGciKANnJe"><code translate="no">JACCARD</code></p>
</td><td data-block-token="PfMKdBztaoD5e1xKowmc8bUPnOe" colspan="1" rowspan="1"><p data-block-token="ZHAPdWjEsowodbxCnVGc38Qln9f">Меньшее значение указывает на большее сходство.</p>
</td><td data-block-token="FtMsd7sd4otaEQxF4d3ctRR9nFb" colspan="1" rowspan="1"><p data-block-token="ThTkdBR5roENdsxTVk4cLlTvniy">[0, 1]</p>
</td></tr><tr><td data-block-token="BQcBdYGZWolZuTxijxmchefJnme" colspan="1" rowspan="1"><p data-block-token="Kowbdw3mRot9cAxg9yScuHlandh"><code translate="no">HAMMING</code></p>
</td><td data-block-token="BNYxdVEuVoqd4jxves5cQCXdnoe" colspan="1" rowspan="1"><p data-block-token="Tvghdcmo2omlhUx39tucVUPZnEh">Меньшее значение указывает на большее сходство.</p>
</td><td data-block-token="YKW8dTla0oe7xdx4Hfjc0i9tned" colspan="1" rowspan="1"><p data-block-token="CzHkdNE2yoWu5ExHtXfcY0G9n2x">[0, dim(vector)].</p>
</td></tr></tbody></table>
<h2 id="Bulk-Vector-Search​" class="common-anchor-header">Поиск по большому вектору<button data-href="#Bulk-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Аналогичным образом вы можете включить в поисковый запрос несколько векторов запроса. Milvus проведет параллельный поиск ANN по векторам запроса и вернет два набора результатов.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="ANN-Search-in-Partition​" class="common-anchor-header">Поиск ANN в разделах<button data-href="#ANN-Search-in-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>Предположим, вы создали несколько разделов в коллекции, и вам нужно сузить область поиска до определенного количества разделов. В этом случае в запрос на поиск можно включить имена целевых разделов, чтобы ограничить область поиска указанными разделами. Сокращение числа разделов, участвующих в поиске, повышает производительность поиска.</p>
<p>Следующий фрагмент кода предполагает наличие в коллекции раздела с именем <strong>PartitionA</strong>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="Use-Output-Fields​" class="common-anchor-header">Использование выходных полей<button data-href="#Use-Output-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>В результаты поиска Milvus по умолчанию включает значения первичных полей и расстояния/коэффициенты сходства сущностей, содержащих векторные вкрапления top-K. Вы можете включить имена целевых полей в поисковый запрос в качестве выходных полей, чтобы результаты поиска содержали значения других полей этих сущностей.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="Use-Limit-and-Offset​" class="common-anchor-header">Использование лимита и смещения<button data-href="#Use-Limit-and-Offset​" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете заметить, что параметр <code translate="no">limit</code>, передаваемый в поисковых запросах, определяет количество сущностей, включаемых в результаты поиска. Этот параметр определяет максимальное количество сущностей, возвращаемых при одном поиске, и обычно называется <strong>top-K</strong>.</p>
<p>Если вы хотите выполнять постраничные запросы, вы можете использовать цикл для отправки нескольких запросов на поиск, при этом параметры <strong>Limit</strong> и <strong>Offset</strong> будут передаваться в каждом запросе. В частности, вы можете установить параметр <strong>Limit</strong> на количество сущностей, которые вы хотите включить в результаты текущего запроса, а <strong>Offset</strong> - на общее количество сущностей, которые уже были возвращены.</p>
<p>В таблице ниже показано, как задать параметры <strong>Limit</strong> и <strong>Offset</strong> для постраничных запросов, возвращающих 100 сущностей за раз.</p>
<table data-block-token="WHdZdkFtYol0QWxfjYzcMsyrnHd"><thead><tr><th data-block-token="YRpAdF69noO2EwxQJKkcRoB4nGp" colspan="1" rowspan="1"><p data-block-token="EhjLdXqY7op6anxCtOtc8KeKnkh">Запросы</p>
</th><th data-block-token="D6tSdFQQAouKA3xol6RcGFUCn4c" colspan="1" rowspan="1"><p data-block-token="KjGadCmVxoLmmIxjI3McBr18nFg">Сущности, возвращаемые по одному запросу</p>
</th><th data-block-token="IDzvd2OCho3Qp0xMwXWcMZLlnWg" colspan="1" rowspan="1"><p data-block-token="RP69d4efqoAHXkxkY8OcBwPXn9e">Сущности, которые уже были возвращены в общей сложности</p>
</th></tr></thead><tbody><tr><td data-block-token="QkqCdnVafo68dGxGRmicOHEQnxe" colspan="1" rowspan="1"><p data-block-token="QyEBdwnZiolkYZxWLYPc59j6nL0"><strong>1-й</strong> запрос</p>
</td><td data-block-token="E4vsdiNZQowy6rxIy0ecRQC4nEc" colspan="1" rowspan="1"><p data-block-token="QYfudUm7uokKlIxw2n9cxKGKnyg">100</p>
</td><td data-block-token="KpaFdQx6qow5zcxElk4clK8dnEp" colspan="1" rowspan="1"><p data-block-token="ZwAAd3eu8oYltYxeyCzcvmkLnbh">0</p>
</td></tr><tr><td data-block-token="D8teddAAZoM2duxDniIc2njyn6C" colspan="1" rowspan="1"><p data-block-token="CdySdMxJ2oZ0uSxNddQcByijnhb"><strong>2-й</strong> запрос</p>
</td><td data-block-token="EhRzdF75hoPXIsxmi4Iczj87nIc" colspan="1" rowspan="1"><p data-block-token="VAPzdkDTHogP5axuOI8c101tnAh">100</p>
</td><td data-block-token="WZQ1dHMMPooABtxi0OfcEOC7nQe" colspan="1" rowspan="1"><p data-block-token="LQ59denn6obaw0xiNGec9uVEn7f">100</p>
</td></tr><tr><td data-block-token="LqQcdHDM5ozahHxEiKzcOtrxn2g" colspan="1" rowspan="1"><p data-block-token="KfKjdUdK3oAt7Fx2w7icUIapnbd"><strong>Третий</strong> запрос</p>
</td><td data-block-token="W1TfddD7poKCKzxX83wcjvoXnXb" colspan="1" rowspan="1"><p data-block-token="ELT7dJe2Ao8L6LxZODccTjAcnKb">100</p>
</td><td data-block-token="SDYedyTVDoSt9Pxwf2xcQtrInBb" colspan="1" rowspan="1"><p data-block-token="DmAId1cA0oOaUNxg6bzc1iIEn2I">200</p>
</td></tr><tr><td data-block-token="EV1Sddbj4og1YnxN3pVcI4PenWe" colspan="1" rowspan="1"><p data-block-token="J1zAdtY1MosjA0xrNuycUTLln7b"><strong>Пятый</strong> запрос</p>
</td><td data-block-token="M9EPdp9haoP5HqxfNvTcP9Non3e" colspan="1" rowspan="1"><p data-block-token="KNJfdZ7bFo9Jooxy2d2ckuf7n3c">100</p>
</td><td data-block-token="NobhdOnAgo2DFixUrNTcmBOVnje" colspan="1" rowspan="1"><p data-block-token="DxU4dV3WpoqEDbxMIWYcumjenUb">100 x (n-1)</p>
</td></tr></tbody></table>
<p>Обратите внимание, что сумма <code translate="no">limit</code> и <code translate="no">offset</code> в одном ANN-поиске должна быть меньше 16 384.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
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
<h2 id="Enhancing-ANN-Search​" class="common-anchor-header">Улучшение поиска с помощью ИНС<button data-href="#Enhancing-ANN-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>AUTOINDEX значительно сглаживает кривую обучения при поиске с помощью ANN. Однако результаты поиска могут быть не всегда корректными по мере увеличения top-K. Уменьшив объем поиска, улучшив релевантность результатов поиска и разнообразив их, Milvus разработал следующие усовершенствования поиска.</p>
<ul>
<li><p>Фильтрованный поиск</p>
<p>Вы можете включить условия фильтрации в поисковый запрос, чтобы Milvus выполнял фильтрацию метаданных перед проведением ANN-поиска, сокращая область поиска со всей коллекции до сущностей, соответствующих заданным условиям фильтрации.</p>
<p>Дополнительные сведения о фильтрации метаданных и условиях фильтрации см. в разделах <a href="/docs/ru/filtered-search.md">Фильтрованный поиск</a> и <a href="/docs/ru/boolean.md">Фильтрация метаданных</a>.</p></li>
<li><p>Поиск по диапазону</p>
<p>Вы можете улучшить релевантность результатов поиска, ограничив расстояние или оценку возвращаемых сущностей определенным диапазоном. В Milvus поиск по диапазону предполагает рисование двух концентрических окружностей, в центре которых находится векторное вложение, наиболее похожее на вектор запроса. В поисковом запросе указывается радиус обеих окружностей, и Milvus возвращает все векторные вкрапления, которые попадают во внешнюю окружность, но не во внутреннюю.</p>
<p>Подробнее о поиске по диапазону см. в разделе <a href="/docs/ru/range-search.md">Поиск по диапазону</a>.</p></li>
<li><p>Группировочный поиск</p>
<p>Если возвращаемые сущности имеют одинаковое значение в определенном поле, результаты поиска могут не отражать распределение всех векторных вкраплений в векторном пространстве. Чтобы разнообразить результаты поиска, воспользуйтесь группирующим поиском.</p>
<p>Подробнее о группирующем поиске см. в разделе <a href="/docs/ru/grouping-search.md">Группирующий поиск</a>.</p></li>
<li><p>Гибридный поиск</p>
<p>Коллекция может включать до четырех векторных полей для сохранения векторных вкраплений, созданных с помощью различных моделей вкраплений. При этом можно использовать гибридный поиск для ранжирования результатов поиска по этим векторным полям, что повышает коэффициент запоминания.</p>
<p>Подробнее о гибридном поиске см. в разделе <a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a>.</p></li>
<li><p>Итератор поиска</p>
<p>Один поиск ANN возвращает максимум 16 384 сущности. Если вам нужно вернуть больше сущностей за один поиск, используйте итераторы поиска.</p>
<p>Подробнее об итераторах поиска см. в разделе <a href="/docs/ru/with-iterators.md">Итератор поиска</a>.</p></li>
<li><p>Полнотекстовый поиск</p>
<p>Полнотекстовый поиск - это функция поиска документов, содержащих определенные термины или фразы в текстовых наборах данных, с последующим ранжированием результатов на основе релевантности. Эта функция позволяет преодолеть ограничения семантического поиска, который может упускать из виду точные термины, обеспечивая получение наиболее точных и контекстуально релевантных результатов. Кроме того, она упрощает векторный поиск, принимая исходный текст, автоматически преобразуя текстовые данные в разреженные вкрапления без необходимости вручную генерировать векторные вкрапления.</p>
<p>Подробнее о полнотекстовом поиске см. в разделе <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p></li>
<li><p>Совпадение текста</p>
<p>Функция сопоставления текста в Milvus позволяет точно находить документы по определенным терминам. Эта функция используется в основном для фильтрации поиска по определенным условиям и может включать скалярную фильтрацию для уточнения результатов запроса, позволяя искать сходство в векторах, удовлетворяющих скалярным критериям.</p>
<p>Подробные сведения о текстовом совпадении см. в разделе <a href="/docs/ru/keyword-match.md">"Текстовое совпадение</a>".</p></li>
<li><p>Использование ключа раздела</p>
<p>Вовлечение нескольких скалярных полей в фильтрацию метаданных и использование довольно сложных условий фильтрации может повлиять на эффективность поиска. Если задать скалярное поле в качестве ключа раздела и использовать в поисковом запросе условие фильтрации, включающее ключ раздела, это поможет ограничить область поиска разделами, соответствующими указанным значениям ключа раздела. </p>
<p>Подробнее о ключе раздела см. в разделе <a href="/docs/ru/use-partition-key.md">Использование ключа раздела</a>.</p></li>
<li><p>Использовать mmap</p>
<p>В Milvus файлы с отображением памяти позволяют напрямую отображать содержимое файлов в память. Эта функция повышает эффективность использования памяти, особенно в ситуациях, когда доступной памяти мало, а полная загрузка данных невозможна. Этот механизм оптимизации может увеличить объем памяти, обеспечивая производительность до определенного предела; однако, когда объем данных слишком сильно превышает объем памяти, производительность поиска и запросов может серьезно снизиться, поэтому, пожалуйста, включите или выключите эту функцию в зависимости от ситуации.</p>
<p>Подробнее о настройках mmap см. в разделе <a href="/docs/ru/mmap.md">Использование mmap</a>.</p></li>
<li><p>Уплотнение кластеров</p>
<p>Кластерное уплотнение предназначено для повышения производительности поиска и снижения затрат в больших коллекциях. Это руководство поможет вам понять, что такое кластерное уплотнение и как эта функция может повысить производительность поиска.</p>
<p>Подробные сведения о кластерном уплотнении см. в разделе <a href="/docs/ru/clustering-compaction.md">Кластерное уплотнение</a>.</p></li>
</ul>
