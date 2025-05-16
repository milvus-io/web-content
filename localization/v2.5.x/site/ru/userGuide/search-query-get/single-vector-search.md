---
id: single-vector-search.md
title: Базовый векторный поиск
summary: >-
  На основе индексного файла, содержащего отсортированный порядок векторных
  вкраплений, поиск по методу приближенного ближайшего соседа (ANN) находит
  подгруппу векторных вкраплений, основанную на векторе запроса, содержащемся в
  полученном поисковом запросе, сравнивает вектор запроса с векторами в
  подгруппе и возвращает наиболее похожие результаты. С помощью ANN-поиска
  Milvus обеспечивает эффективный поиск. Эта страница поможет вам узнать, как
  проводить базовый ANN-поиск.
---
<h1 id="Basic-Vector-Search" class="common-anchor-header">Базовый векторный поиск<button data-href="#Basic-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>На основе индексного файла, в котором хранится отсортированный порядок векторных вкраплений, поиск по методу приближенного ближайшего соседа (ANN) находит подгруппу векторных вкраплений на основе вектора запроса, содержащегося в полученном поисковом запросе, сравнивает вектор запроса с векторами в подгруппе и возвращает наиболее похожие результаты. С помощью ANN-поиска Milvus обеспечивает эффективный поиск. На этой странице вы узнаете, как проводить базовый ANN-поиск.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
<p>В отличие от kNN-поиска, алгоритм ANN-поиска запрашивает <strong>индексный</strong> файл, в котором записан отсортированный порядок векторных вкраплений. Когда поступает запрос на поиск, вы можете использовать индексный файл в качестве справочника, чтобы быстро найти подгруппу, вероятно, содержащую векторные вложения, наиболее похожие на вектор запроса. Затем можно использовать указанный <strong>тип метрики</strong> для измерения сходства между вектором запроса и векторами в подгруппе, отсортировать членов группы по сходству с вектором запроса и определить <strong>топ-K</strong> членов группы.</p>
<p>Поиск в ANN зависит от предварительно созданных индексов, поэтому производительность поиска, использование памяти и корректность поиска могут отличаться в зависимости от выбранного типа индекса. Необходимо найти баланс между производительностью и корректностью поиска.</p>
<p>Чтобы сократить время обучения, Milvus предоставляет <strong>AUTOINDEX</strong>. С помощью <strong>AUTOINDEX</strong> Milvus анализирует распределение данных в вашей коллекции во время создания индекса и устанавливает наиболее оптимизированные параметры индекса на основе анализа, чтобы найти баланс между производительностью и корректностью поиска.</p>
<p>В этом разделе вы найдете подробную информацию по следующим темам:</p>
<ul>
<li><p><a href="/docs/ru/single-vector-search.md#Single-Vector-Search">Одновекторный поиск</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#Bulk-Vector-Search">Поиск по объемному вектору</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#ANN-Search-in-Partition">ANN-поиск в разделе</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#Use-Output-Fields">Использование полей вывода</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#Use-Limit-and-Offset">Использовать ограничение и смещение</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#Use-Level">Использовать уровень</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#Get-Recall-Rate">Получение коэффициента возврата</a></p></li>
<li><p><a href="/docs/ru/single-vector-search.md#Enhancing-ANN-Search">Улучшение поиска с помощью ANN</a></p></li>
</ul>
<h2 id="Single-Vector-Search" class="common-anchor-header">Одновекторный поиск<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
<p>В этом разделе вы узнаете, как выполнить одновекторный поиск. Запрос на поиск содержит один вектор запроса и просит Milvus использовать Inner Product (IP) для вычисления сходства между векторами запроса и векторами в коллекции и возвращает три наиболее похожих.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
    
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.866088, id=7)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus ранжирует результаты поиска по степени их сходства с вектором запроса в порядке убывания. Показатель сходства также называется расстоянием до вектора запроса, и его диапазон значений зависит от используемых типов метрик.</p>
<p>В следующей таблице перечислены применимые типы метрик и соответствующие диапазоны расстояний.</p>
<table>
   <tr>
     <th><p>Тип метрики</p></th>
     <th><p>Характеристики</p></th>
     <th><p>Диапазон расстояний</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Меньшее значение указывает на большее сходство.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Большее значение указывает на большее сходство.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Большее значение указывает на большее сходство.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Меньшее значение указывает на большее сходство.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Меньшее значение указывает на большее сходство.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
</table>
<h2 id="Bulk-Vector-Search" class="common-anchor-header">Поиск по большому вектору<button data-href="#Bulk-Vector-Search" class="anchor-icon" translate="no">
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
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Search with multiple vectors</span>
<span class="hljs-comment"># 7.1. Prepare query vectors</span>
query_vectors = [
    [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>],
    [<span class="hljs-number">0.0039737443</span>, <span class="hljs-number">0.003020432</span>, -<span class="hljs-number">0.0006188639</span>, <span class="hljs-number">0.03913546</span>, -<span class="hljs-number">0.00089768134</span>]
]

<span class="hljs-comment"># 7.2. Start search</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=query_vectors,
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 730,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04431751370429993,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 333,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04231833666563034,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 232,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04221535101532936,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

List&lt;BaseVector&gt; queryVectors = Arrays.asList(
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.041732933f</span>, <span class="hljs-number">0.013779674f</span>, -<span class="hljs-number">0.027564144f</span>, -<span class="hljs-number">0.013061441f</span>, <span class="hljs-number">0.009748648f</span>}),
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0039737443f</span>, <span class="hljs-number">0.003020432f</span>, -<span class="hljs-number">0.0006188639f</span>, <span class="hljs-number">0.03913546f</span>, -<span class="hljs-number">0.00089768134f</span>})
);
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(queryVectors)
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49548206, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.320147, id=3)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.107413776, id=6)</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5678123, id=6)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.32368967, id=2)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24108477, id=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVectors := []entity.Vector{
    entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}),
    entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>}),
}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    queryVectors,
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Search with multiple vectors</span>
<span class="hljs-keyword">const</span> query_vectors = [
    [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], 
    [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">vectors</span>: query_vectors,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//     { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//     { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">//   ],</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     { score: 0.04431751370429993, id: &#x27;730&#x27; },</span>
<span class="hljs-comment">//     { score: 0.04231833666563034, id: &#x27;333&#x27; },</span>
<span class="hljs-comment">//     { score: 0.04221535101532936, id: &#x27;232&#x27; },</span>
<span class="hljs-comment">//   ]</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         [</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#               &quot;id&quot;: 551</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#               &quot;id&quot;: 296</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#               &quot;id&quot;: 43</span>
<span class="hljs-comment">#           }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         [</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04431751370429993,</span>
<span class="hljs-comment">#               &quot;id&quot;: 730</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04231833666563034,</span>
<span class="hljs-comment">#               &quot;id&quot;: 333</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04221535101532936,</span>
<span class="hljs-comment">#               &quot;id&quot;: 232</span>
<span class="hljs-comment">#           }</span>
<span class="hljs-comment">#        ]</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="ANN-Search-in-Partition" class="common-anchor-header">Поиск ANN в разделах<button data-href="#ANN-Search-in-Partition" class="anchor-icon" translate="no">
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
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-comment"># highlight-next-line</span>
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.6395302, id=13)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5408028, id=12)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49696884, id=17)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithPartitions(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Output-Fields" class="common-anchor-header">Использование выходных полей<button data-href="#Use-Output-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>В результаты поиска Milvus по умолчанию включает значения первичных полей и расстояния/коэффициенты сходства сущностей, содержащих векторные вкрапления top-K. Вы можете включить имена целевых полей, включая векторные и скалярные поля, в поисковый запрос в качестве выходных полей, чтобы результаты поиска содержали значения других полей в этих сущностях.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
    <span class="hljs-comment"># highlight-next-line</span>
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;orange_6781&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;red_4794&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;grey_8510&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=black_9955}, score=0.95944905, id=5)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_7319}, score=0.8689616, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=white_5015}, score=0.866088, id=7)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27;, entity: {&quot;color&quot;: &quot;orange_6781&quot;}},</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; entity: {&quot;color&quot;: &quot;red_4794&quot;}},</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; entity: {&quot;color&quot;: &quot;grey_8510&quot;}}</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;color&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;orange_6781&quot;</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;red_4794&quot;</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;grey_8510&quot;</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Limit-and-Offset" class="common-anchor-header">Использование лимита и смещения<button data-href="#Use-Limit-and-Offset" class="anchor-icon" translate="no">
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
<table>
   <tr>
     <th><p>Запросы</p></th>
     <th><p>Сущности, возвращаемые по одному запросу</p></th>
     <th><p>Сущности, которые уже были возвращены в общей сложности</p></th>
   </tr>
   <tr>
     <td><p><strong>1-й</strong> запрос</p></td>
     <td><p>100</p></td>
     <td><p>0</p></td>
   </tr>
   <tr>
     <td><p><strong>2-й</strong> запрос</p></td>
     <td><p>100</p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p><strong>Третий</strong> запрос</p></td>
     <td><p>100</p></td>
     <td><p>200</p></td>
   </tr>
   <tr>
     <td><p><strong>Пятый</strong> запрос</p></td>
     <td><p>100</p></td>
     <td><p>100 x (n-1)</p></td>
   </tr>
</table>
<p>Обратите внимание, что сумма <code translate="no">limit</code> и <code translate="no">offset</code> в одном ANN-поиске должна быть меньше 16 384.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, 
        <span class="hljs-comment"># highlight-next-line</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">10</span> <span class="hljs-comment"># The records to skip</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .offset(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24120237, id=16)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.22559784, id=9)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=-0.09906838, id=2)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOffset(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return,</span>
    <span class="hljs-comment">// highlight-next-line</span>
    <span class="hljs-attr">offset</span>: <span class="hljs-number">10</span> <span class="hljs-comment">// The record to skip.</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3,
    &quot;offset&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Enhancing-ANN-Search" class="common-anchor-header">Улучшение поиска с помощью ИНС<button data-href="#Enhancing-ANN-Search" class="anchor-icon" translate="no">
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
<p>Дополнительные сведения о фильтрации метаданных и условиях фильтрации см. в разделах <a href="/docs/ru/filtered-search.md">"Фильтрованный поиск"</a>, <a href="/docs/ru/boolean.md">"Объяснение фильтрации"</a> и смежных темах.</p></li>
<li><p>Поиск по диапазону</p>
<p>Вы можете улучшить релевантность результатов поиска, ограничив расстояние или оценку возвращаемых сущностей определенным диапазоном. В Milvus поиск по диапазону включает в себя рисование двух концентрических окружностей с векторной вставкой, наиболее похожей на вектор запроса, в качестве центра. В поисковом запросе указывается радиус обеих окружностей, и Milvus возвращает все векторные вкрапления, которые попадают во внешнюю окружность, но не во внутреннюю.</p>
<p>Подробнее о поиске по диапазону см. в разделе <a href="/docs/ru/range-search.md">Поиск по диапазону</a>.</p></li>
<li><p>Группировочный поиск</p>
<p>Если возвращаемые сущности имеют одинаковое значение в определенном поле, результаты поиска могут не отражать распределение всех векторных вкраплений в векторном пространстве. Чтобы разнообразить результаты поиска, воспользуйтесь группирующим поиском.</p>
<p>Подробнее о группирующем поиске см. в разделе <a href="/docs/ru/grouping-search.md">Группирующий поиск</a>,</p></li>
<li><p>Гибридный поиск</p>
<p>Коллекция может включать до четырех векторных полей для сохранения векторных вкраплений, созданных с помощью различных моделей вкраплений. При этом можно использовать гибридный поиск для ранжирования результатов поиска по этим векторным полям, что повышает коэффициент запоминания.</p>
<p>Подробнее о гибридном поиске см. в разделе <a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a>.</p></li>
<li><p>Итератор поиска</p>
<p>Один поиск ANN возвращает максимум 16 384 сущности. Если вам нужно вернуть больше сущностей за один поиск, используйте итераторы поиска.</p>
<p>Подробнее об итераторах поиска см. в разделе <a href="/docs/ru/with-iterators.md">Итератор поиска</a>.</p></li>
<li><p>Полнотекстовый поиск</p>
<p>Полнотекстовый поиск - это функция поиска документов, содержащих определенные термины или фразы в текстовых наборах данных, с последующим ранжированием результатов на основе релевантности. Эта функция позволяет преодолеть ограничения семантического поиска, который может упускать из виду точные термины, обеспечивая получение наиболее точных и контекстуально релевантных результатов. Кроме того, она упрощает векторный поиск, принимая исходный текст, автоматически преобразуя текстовые данные в разреженные вкрапления без необходимости вручную генерировать векторные вкрапления.</p>
<p>Подробнее о полнотекстовом поиске см. в разделе <a href="/docs/ru/full-text-search.md">"Полнотекстовый поиск"</a>.</p></li>
<li><p>Поиск по ключевым словам</p>
<p>Функция поиска по ключевым словам в Milvus позволяет точно находить документы по определенным терминам. Эта функция используется в основном для фильтрации поиска по определенным условиям и может включать скалярную фильтрацию для уточнения результатов запроса, позволяя искать сходство в векторах, которые соответствуют скалярным критериям.</p>
<p>Подробные сведения о подборе ключевых слов см. в разделе <a href="/docs/ru/keyword-match.md">Подбор ключевых слов</a>.</p></li>
<li><p>Использование ключа раздела</p>
<p>Вовлечение нескольких скалярных полей в фильтрацию метаданных и использование довольно сложных условий фильтрации может повлиять на эффективность поиска. Если задать скалярное поле в качестве ключа раздела и использовать в поисковом запросе условие фильтрации, включающее ключ раздела, это поможет ограничить область поиска разделами, соответствующими указанным значениям ключа раздела.</p>
<p>Подробнее о ключе раздела см. в разделе <a href="/docs/ru/use-partition-key.md">Использование ключа раздела</a>.</p></li>
<li><p>Использовать mmap</p>
<p>Подробнее о настройках mmap см. в разделе <a href="/docs/ru/mmap.md">Использовать mmap</a>.</p></li>
<li><p>Компактификация кластеризации</p>
<p>Подробные сведения о кластерном уплотнении см. в разделе <a href="/docs/ru/clustering-compaction.md">Кластерное уплотнение</a>.</p></li>
</ul>
