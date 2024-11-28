---
id: single-vector-search.md
order: 1
summary: >-
  Este artigo descreve como procurar vectores numa coleção Milvus utilizando um
  único vetor de consulta.
title: Pesquisa ANN básica
---
<h1 id="Ba​sic-ANN-Search" class="common-anchor-header">Pesquisa ANN básica<button data-href="#Ba​sic-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Com base num ficheiro de índice que regista a ordem de ordenação dos vectores incorporados, a pesquisa ANN (Approximate Nearest Neighbor) localiza um subconjunto de vectores incorporados com base no vetor de consulta incluído num pedido de pesquisa recebido, compara o vetor de consulta com os do subgrupo e devolve os resultados mais semelhantes. Com a pesquisa ANN, o Milvus fornece uma experiência de pesquisa eficiente. Esta página ajuda-o a aprender como realizar pesquisas ANN básicas.</p>
<h2 id="Overview​" class="common-anchor-header">Visão geral<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>A pesquisa ANN e a pesquisa k-Nearest Neighbors (kNN) são os métodos habituais nas pesquisas de semelhança de vectores. Numa pesquisa kNN, é necessário comparar todos os vectores num espaço vetorial com o vetor de consulta transportado no pedido de pesquisa antes de descobrir os mais semelhantes, o que consome muito tempo e recursos.</p>
<p>Ao contrário das pesquisas kNN, um algoritmo de pesquisa ANN pede um ficheiro <strong>de índice</strong> que regista a ordem ordenada das incorporações vectoriais. Quando chega um pedido de pesquisa, pode utilizar o ficheiro de índice como referência para localizar rapidamente um subgrupo que provavelmente contém as incorporações vectoriais mais semelhantes ao vetor de consulta. Em seguida, pode utilizar o <strong>tipo de métrica</strong> especificado para medir a semelhança entre o vetor de consulta e os do subgrupo, ordenar os membros do grupo com base na semelhança com o vetor de consulta e descobrir os membros do grupo <strong>K de topo</strong>.</p>
<p>As pesquisas ANN dependem de índices pré-construídos, e o rendimento da pesquisa, a utilização de memória e a correção da pesquisa podem variar com os tipos de índice escolhidos. É necessário equilibrar o desempenho e a correção da pesquisa. </p>
<p>Para reduzir a curva de aprendizagem, Milvus fornece <strong>AUTOINDEX</strong>. Com o <strong>AUTOINDEX</strong>, o Milvus pode analisar a distribuição de dados dentro da sua coleção enquanto constrói o índice e define os parâmetros de índice mais optimizados com base na análise para atingir um equilíbrio entre o desempenho da pesquisa e a correção. </p>
<p>Para obter detalhes sobre AUTOINDEX e tipos de métricas aplicáveis, consulte <a href="https://milvus.io/docs/glossary.md#Auto-Index">AUTOINDEX</a> e <a href="/docs/pt/metric.md">tipos de métricas</a>. Nesta secção, encontrará informações detalhadas sobre os seguintes tópicos.</p>
<ul>
<li><p><a href="#Single-Vector-Search">Pesquisa de vetor único</a></p></li>
<li><p><a href="#Bulk-Vector-Search">Pesquisa de vectores em massa</a></p></li>
<li><p><a href="#ANN-Search-in-Partition">Pesquisa ANN em partição</a></p></li>
<li><p><a href="#Use-Output-Fields">Utilizar campos de saída</a></p></li>
<li><p><a href="#Use-Limit-and-Offset">Usar limite e deslocamento</a></p></li>
<li><p><a href="#Enhance-ANN-Search">Melhorar a pesquisa ANN</a></p></li>
</ul>
<h2 id="Single-Vector-Search​" class="common-anchor-header">Pesquisa de vetor único<button data-href="#Single-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Nas pesquisas ANN, uma pesquisa de vetor único refere-se a uma pesquisa que envolve apenas um vetor de consulta. Com base no índice pré-construído e no tipo de métrica transportado no pedido de pesquisa, o Milvus irá encontrar os top-K vectores mais semelhantes ao vetor de consulta.</p>
<p>Nesta secção, aprenderá a realizar uma pesquisa de vetor único. O trecho de código pressupõe a criação de uma coleção de forma <a href="/docs/pt/create-collection-instantly#Quick-Setup">rápida</a>. A solicitação de pesquisa carrega um único vetor de consulta e pede ao Milvus para usar o Inner Product (IP) para calcular a similaridade entre os vetores de consulta e os vetores na coleção e retorna os três mais semelhantes.</p>
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
<p>O Milvus classifica os resultados da pesquisa pelas suas pontuações de semelhança com o vetor de consulta, por ordem descendente. A pontuação de semelhança é também designada por distância ao vetor de consulta e os seus intervalos de valores variam consoante os tipos de métricas utilizados.</p>
<p>A tabela seguinte lista os tipos de métricas aplicáveis e os intervalos de distância correspondentes.</p>
<table data-block-token="CTYBd8RSbogpjGxSmRCc937Qnud"><thead><tr><th data-block-token="Mk6idXTyjokI5FxIHgzc1FmhnLf" colspan="1" rowspan="1"><p data-block-token="DT2rdNtuYoJZPwxsZMCc9zTDnZf">Tipo de métrica</p>
</th><th data-block-token="DlbbdGOQ8oy3DJxe57tcR4f9nee" colspan="1" rowspan="1"><p data-block-token="CnVsdS8KboXGUGx9rQFcB0G5nXb">Caraterísticas</p>
</th><th data-block-token="QhwVdn1JvoCPd5x8Pxrck2QOnEf" colspan="1" rowspan="1"><p data-block-token="GQ4cdd3n4oNnjOxD9uhc5SCpnyh">Intervalo de distância</p>
</th></tr></thead><tbody><tr><td data-block-token="SDGPdrT6ioYrZtx0jn6chigDnRe" colspan="1" rowspan="1"><p data-block-token="BF8Wd7b57oSJxHxeMUvchxNtntg"><code translate="no">L2</code></p>
</td><td data-block-token="R8zodDVyco81tkxgY3Lc3eNpnDe" colspan="1" rowspan="1"><p data-block-token="WOYAdjefpojiUMxhvFxcFzYun5d">Um valor menor indica uma maior similaridade.</p>
</td><td data-block-token="FDRXdODH5oFZzixRMtXcJTBbnLe" colspan="1" rowspan="1"><p data-block-token="HKPedGZntoh3hDxY587ch8F9nzg">[0, ∞)</p>
</td></tr><tr><td data-block-token="QqHidyCE9ozC6Gxyx28cunhcnvg" colspan="1" rowspan="1"><p data-block-token="FVgcdXpbMolSpdx1ZRSc7sO1nGD"><code translate="no">IP</code></p>
</td><td data-block-token="Rfa8dK5VHowbyQxk1iEcZUrUn5f" colspan="1" rowspan="1"><p data-block-token="L7NTdDhmkozbcwx3ek1cWU8WnCh">Um valor maior indica uma maior semelhança.</p>
</td><td data-block-token="NhQ5d5F7Bo08Ocxeugicxqh2nrb" colspan="1" rowspan="1"><p data-block-token="E3Etd3rT1o2pwMxeZSdcB0Lpnlf">[-1, 1]</p>
</td></tr><tr><td data-block-token="QasQdmuapouIonxvyNJcBp89nNU" colspan="1" rowspan="1"><p data-block-token="MqFDdgMTgo5weSxNIRJc6XLBn8S"><code translate="no">COSINE</code></p>
</td><td data-block-token="O7hJdRazyo2YpYxBP9AcD1h8nqe" colspan="1" rowspan="1"><p data-block-token="CbhXdgXP3o8lAhxxwchcIvp3nze">Um valor maior indica uma maior similaridade.</p>
</td><td data-block-token="KrMvdljV3o6KoNxghnZcBBLDnNK" colspan="1" rowspan="1"><p data-block-token="KGZVdGhL9oqfSHxOVF7cg3b4nEh">[-1, 1]</p>
</td></tr><tr><td data-block-token="OSJAd3zrsoPBBMxvmRtc5vpunnh" colspan="1" rowspan="1"><p data-block-token="W8thd8nk3oRpLyxAKrGciKANnJe"><code translate="no">JACCARD</code></p>
</td><td data-block-token="PfMKdBztaoD5e1xKowmc8bUPnOe" colspan="1" rowspan="1"><p data-block-token="ZHAPdWjEsowodbxCnVGc38Qln9f">Um valor menor indica uma maior semelhança.</p>
</td><td data-block-token="FtMsd7sd4otaEQxF4d3ctRR9nFb" colspan="1" rowspan="1"><p data-block-token="ThTkdBR5roENdsxTVk4cLlTvniy">[0, 1]</p>
</td></tr><tr><td data-block-token="BQcBdYGZWolZuTxijxmchefJnme" colspan="1" rowspan="1"><p data-block-token="Kowbdw3mRot9cAxg9yScuHlandh"><code translate="no">HAMMING</code></p>
</td><td data-block-token="BNYxdVEuVoqd4jxves5cQCXdnoe" colspan="1" rowspan="1"><p data-block-token="Tvghdcmo2omlhUx39tucVUPZnEh">Um valor mais pequeno indica uma maior semelhança.</p>
</td><td data-block-token="YKW8dTla0oe7xdx4Hfjc0i9tned" colspan="1" rowspan="1"><p data-block-token="CzHkdNE2yoWu5ExHtXfcY0G9n2x">[0, dim(vetor)]</p>
</td></tr></tbody></table>
<h2 id="Bulk-Vector-Search​" class="common-anchor-header">Pesquisa de vetor em massa<button data-href="#Bulk-Vector-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Da mesma forma, você pode incluir vários vetores de consulta em uma solicitação de pesquisa. Milvus realizará pesquisas ANN para os vetores de consulta em paralelo e retornará dois conjuntos de resultados.</p>
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
<h2 id="ANN-Search-in-Partition​" class="common-anchor-header">Pesquisa ANN em partição<button data-href="#ANN-Search-in-Partition​" class="anchor-icon" translate="no">
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
    </button></h2><p>Suponha que criou várias partições numa coleção e que pode restringir o âmbito da pesquisa a um número específico de partições. Nesse caso, pode incluir os nomes das partições de destino no pedido de pesquisa para restringir o âmbito da pesquisa dentro das partições especificadas. A redução do número de partições envolvidas na pesquisa melhora o desempenho da pesquisa.</p>
<p>O seguinte trecho de código assume uma partição chamada <strong>PartitionA</strong> na sua coleção.</p>
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
<h2 id="Use-Output-Fields​" class="common-anchor-header">Usar campos de saída<button data-href="#Use-Output-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Num resultado de pesquisa, o Milvus inclui os valores do campo primário e as distâncias/pontuações de similaridade das entidades que contêm os vectores de incorporação top-K por defeito. Você pode incluir os nomes dos campos de destino em uma solicitação de pesquisa como os campos de saída para fazer com que os resultados da pesquisa carreguem os valores de outros campos nessas entidades.</p>
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
<h2 id="Use-Limit-and-Offset​" class="common-anchor-header">Utilizar o limite e o desvio<button data-href="#Use-Limit-and-Offset​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode reparar que o parâmetro <code translate="no">limit</code> incluído nos pedidos de pesquisa determina o número de entidades a incluir nos resultados da pesquisa. Esse parâmetro especifica o número máximo de entidades a serem retornadas em uma única pesquisa, e geralmente é denominado <strong>top-K</strong>.</p>
<p>Se desejar efetuar consultas paginadas, pode utilizar um ciclo para enviar vários pedidos de pesquisa, com os parâmetros <strong>Limite</strong> e <strong>Deslocamento</strong> transportados em cada pedido de consulta. Especificamente, pode definir o parâmetro <strong>Limite</strong> para o número de Entidades que pretende incluir nos resultados da consulta atual e definir o <strong>Deslocamento</strong> para o número total de Entidades que já foram devolvidas.</p>
<p>A tabela abaixo descreve como definir os parâmetros <strong>Limite</strong> e <strong>Deslocamento</strong> para consultas paginadas ao retornar 100 Entidades de cada vez.</p>
<table data-block-token="WHdZdkFtYol0QWxfjYzcMsyrnHd"><thead><tr><th data-block-token="YRpAdF69noO2EwxQJKkcRoB4nGp" colspan="1" rowspan="1"><p data-block-token="EhjLdXqY7op6anxCtOtc8KeKnkh">Consultas</p>
</th><th data-block-token="D6tSdFQQAouKA3xol6RcGFUCn4c" colspan="1" rowspan="1"><p data-block-token="KjGadCmVxoLmmIxjI3McBr18nFg">Entidades a devolver por consulta</p>
</th><th data-block-token="IDzvd2OCho3Qp0xMwXWcMZLlnWg" colspan="1" rowspan="1"><p data-block-token="RP69d4efqoAHXkxkY8OcBwPXn9e">Entidades já retornadas no total</p>
</th></tr></thead><tbody><tr><td data-block-token="QkqCdnVafo68dGxGRmicOHEQnxe" colspan="1" rowspan="1"><p data-block-token="QyEBdwnZiolkYZxWLYPc59j6nL0">A <strong>**1ª**</strong> consulta</p>
</td><td data-block-token="E4vsdiNZQowy6rxIy0ecRQC4nEc" colspan="1" rowspan="1"><p data-block-token="QYfudUm7uokKlIxw2n9cxKGKnyg">100</p>
</td><td data-block-token="KpaFdQx6qow5zcxElk4clK8dnEp" colspan="1" rowspan="1"><p data-block-token="ZwAAd3eu8oYltYxeyCzcvmkLnbh">0</p>
</td></tr><tr><td data-block-token="D8teddAAZoM2duxDniIc2njyn6C" colspan="1" rowspan="1"><p data-block-token="CdySdMxJ2oZ0uSxNddQcByijnhb">A <strong>**2ª**</strong> consulta</p>
</td><td data-block-token="EhRzdF75hoPXIsxmi4Iczj87nIc" colspan="1" rowspan="1"><p data-block-token="VAPzdkDTHogP5axuOI8c101tnAh">100</p>
</td><td data-block-token="WZQ1dHMMPooABtxi0OfcEOC7nQe" colspan="1" rowspan="1"><p data-block-token="LQ59denn6obaw0xiNGec9uVEn7f">100</p>
</td></tr><tr><td data-block-token="LqQcdHDM5ozahHxEiKzcOtrxn2g" colspan="1" rowspan="1"><p data-block-token="KfKjdUdK3oAt7Fx2w7icUIapnbd">A <strong>**3ª**</strong> consulta</p>
</td><td data-block-token="W1TfddD7poKCKzxX83wcjvoXnXb" colspan="1" rowspan="1"><p data-block-token="ELT7dJe2Ao8L6LxZODccTjAcnKb">100</p>
</td><td data-block-token="SDYedyTVDoSt9Pxwf2xcQtrInBb" colspan="1" rowspan="1"><p data-block-token="DmAId1cA0oOaUNxg6bzc1iIEn2I">200</p>
</td></tr><tr><td data-block-token="EV1Sddbj4og1YnxN3pVcI4PenWe" colspan="1" rowspan="1"><p data-block-token="J1zAdtY1MosjA0xrNuycUTLln7b">A <strong>**nésima**</strong> consulta</p>
</td><td data-block-token="M9EPdp9haoP5HqxfNvTcP9Non3e" colspan="1" rowspan="1"><p data-block-token="KNJfdZ7bFo9Jooxy2d2ckuf7n3c">100</p>
</td><td data-block-token="NobhdOnAgo2DFixUrNTcmBOVnje" colspan="1" rowspan="1"><p data-block-token="DxU4dV3WpoqEDbxMIWYcumjenUb">100 x (n-1)</p>
</td></tr></tbody></table>
<p>Observe que a soma de <code translate="no">limit</code> e <code translate="no">offset</code> em uma única pesquisa ANN deve ser menor que 16.384.</p>
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
<h2 id="Enhancing-ANN-Search​" class="common-anchor-header">Melhorar a pesquisa ANN<button data-href="#Enhancing-ANN-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>O AUTOINDEX alisa consideravelmente a curva de aprendizagem das pesquisas ANN. No entanto, os resultados da pesquisa podem nem sempre estar corretos à medida que o top-K aumenta. Reduzindo o âmbito da pesquisa, melhorando a relevância dos resultados da pesquisa e diversificando os resultados da pesquisa, o Milvus desenvolve as seguintes melhorias de pesquisa.</p>
<ul>
<li><p>Pesquisa filtrada</p>
<p>Pode incluir condições de filtragem num pedido de pesquisa para que o Milvus efectue a filtragem de metadados antes de efetuar pesquisas ANN, reduzindo o âmbito da pesquisa de toda a coleção para apenas as entidades que correspondem às condições de filtragem especificadas.</p>
<p>Para obter mais informações sobre filtragem de metadados e condições de filtragem, consulte <a href="/docs/pt/filtered-search.md">Pesquisa filtrada</a> e <a href="/docs/pt/boolean.md">Filtragem de metadados</a>.</p></li>
<li><p>Pesquisa de intervalo</p>
<p>É possível melhorar a relevância dos resultados da pesquisa restringindo a distância ou a pontuação das entidades retornadas dentro de um intervalo específico. No Milvus, uma pesquisa de intervalo envolve o desenho de dois círculos concêntricos com a incorporação de vetor mais semelhante ao vetor de consulta como o centro. O pedido de pesquisa especifica o raio de ambos os círculos, e o Milvus devolve todas as incorporações vectoriais que se enquadram no círculo exterior mas não no círculo interior.</p>
<p>Para obter mais informações sobre a pesquisa de intervalo, consulte <a href="/docs/pt/range-search.md">Pesquisa de intervalo</a>.</p></li>
<li><p>Pesquisa de agrupamento</p>
<p>Se as entidades retornadas tiverem o mesmo valor em um campo específico, os resultados da pesquisa podem não representar a distribuição de todas as incorporações vetoriais no espaço vetorial. Para diversificar os resultados da pesquisa, considere o uso da pesquisa de agrupamento.</p>
<p>Para saber mais sobre a pesquisa de agrupamento, consulte <a href="/docs/pt/grouping-search.md">Pesquisa de agrupamento</a>.</p></li>
<li><p>Pesquisa híbrida</p>
<p>Uma coleção pode incluir até quatro campos vectoriais para guardar as incorporações vectoriais geradas utilizando diferentes modelos de incorporação. Ao fazer isso, é possível usar uma pesquisa híbrida para ranquear novamente os resultados da pesquisa desses campos vetoriais, melhorando a taxa de recuperação.</p>
<p>Para saber mais sobre a pesquisa híbrida, consulte <a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a>.</p></li>
<li><p>Iterador de pesquisa</p>
<p>Uma única pesquisa ANN retorna um máximo de 16.384 entidades. Considere usar iteradores de pesquisa se precisar de mais entidades para retornar em uma única pesquisa.</p>
<p>Para obter detalhes sobre iteradores de pesquisa, consulte <a href="/docs/pt/with-iterators.md">Iterador de pesquisa</a>.</p></li>
<li><p>Pesquisa de texto completo</p>
<p>A pesquisa de texto completo é um recurso que recupera documentos que contêm termos ou frases específicos em conjuntos de dados de texto e, em seguida, classifica os resultados com base na relevância. Esta funcionalidade ultrapassa as limitações da pesquisa semântica, que pode ignorar termos precisos, garantindo que recebe os resultados mais exactos e contextualmente relevantes. Além disso, simplifica as pesquisas vectoriais ao aceitar a entrada de texto em bruto, convertendo automaticamente os seus dados de texto em embeddings esparsos sem a necessidade de gerar manualmente embeddings vectoriais.</p>
<p>Para mais informações sobre a pesquisa de texto integral, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto integral</a>.</p></li>
<li><p>Correspondência de texto</p>
<p>A correspondência de texto em Milvus permite a recuperação precisa de documentos com base em termos específicos. Esta funcionalidade é utilizada principalmente para pesquisa filtrada para satisfazer condições específicas e pode incorporar filtragem escalar para refinar os resultados da consulta, permitindo pesquisas de semelhança dentro de vectores que satisfaçam critérios escalares.</p>
<p>Para obter detalhes sobre a correspondência de texto, consulte <a href="/docs/pt/keyword-match.md">Correspondência de texto</a>.</p></li>
<li><p>Usar chave de partição</p>
<p>O envolvimento de vários campos escalares na filtragem de metadados e a utilização de uma condição de filtragem bastante complicada pode afetar a eficiência da pesquisa. Depois de definir um campo escalar como chave de partição e utilizar uma condição de filtragem que envolva a chave de partição no pedido de pesquisa, pode ajudar a restringir o âmbito da pesquisa dentro das partições correspondentes aos valores de chave de partição especificados. </p>
<p>Para obter detalhes sobre a chave de partição, consulte <a href="/docs/pt/use-partition-key.md">Usar chave de partição</a>.</p></li>
<li><p>Usar mmap</p>
<p>No Milvus, os arquivos mapeados na memória permitem o mapeamento direto do conteúdo do arquivo na memória. Este recurso aumenta a eficiência da memória, particularmente em situações onde a memória disponível é escassa, mas o carregamento completo de dados é inviável. Este mecanismo de otimização pode aumentar a capacidade de dados, assegurando o desempenho até um certo limite; no entanto, quando a quantidade de dados excede demasiado a memória, o desempenho da pesquisa e da consulta pode sofrer uma degradação grave, pelo que deve optar por ativar ou desativar esta funcionalidade, conforme apropriado.</p>
<p>Para obter detalhes sobre as configurações de mmap, consulte <a href="/docs/pt/mmap.md">Usar mmap</a>.</p></li>
<li><p>Compactação de clustering</p>
<p>A compactação de clustering foi concebida para melhorar o desempenho da pesquisa e reduzir os custos em grandes colecções. Este guia ajudará a entender a compactação de clustering e como esse recurso pode melhorar o desempenho da pesquisa.</p>
<p>Para obter detalhes sobre compactações de agrupamento, consulte <a href="/docs/pt/clustering-compaction.md">Compactação de agrupamento</a>.</p></li>
</ul>
