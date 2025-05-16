---
id: single-vector-search.md
title: Búsqueda básica de vectores
summary: >-
  Basándose en un archivo de índice que registra el orden de las incrustaciones
  vectoriales, la búsqueda por vecino más próximo aproximado (RNA) localiza un
  subconjunto de incrustaciones vectoriales basándose en el vector de consulta
  incluido en una solicitud de búsqueda recibida, compara el vector de consulta
  con los del subgrupo y devuelve los resultados más similares. Con la búsqueda
  ANN, Milvus proporciona una experiencia de búsqueda eficiente. Esta página le
  ayuda a aprender a realizar búsquedas RNA básicas.
---
<h1 id="Basic-Vector-Search" class="common-anchor-header">Búsqueda básica de vectores<button data-href="#Basic-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Basándose en un archivo de índice que registra el orden de las incrustaciones vectoriales, la búsqueda por vecino más próximo aproximado (RNA) localiza un subconjunto de incrustaciones vectoriales basándose en el vector de consulta incluido en una solicitud de búsqueda recibida, compara el vector de consulta con los del subgrupo y devuelve los resultados más similares. Con la búsqueda ANN, Milvus proporciona una experiencia de búsqueda eficiente. Esta página le ayudará a aprender a realizar búsquedas RNA básicas.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>La búsqueda RNA y la búsqueda k-Nearest Neighbors (kNN) son los métodos habituales en las búsquedas de similitud vectorial. En una búsqueda kNN, hay que comparar todos los vectores de un espacio vectorial con el vector de consulta que figura en la petición de búsqueda antes de averiguar cuáles son los más similares, lo que lleva mucho tiempo y consume muchos recursos.</p>
<p>A diferencia de las búsquedas kNN, un algoritmo de búsqueda RNA solicita un archivo de <strong>índice</strong> que registra el orden de las incrustaciones vectoriales. Cuando se recibe una solicitud de búsqueda, se puede utilizar el archivo de índice como referencia para localizar rápidamente un subgrupo que probablemente contenga las incrustaciones de vectores más similares al vector de consulta. A continuación, puede utilizar el <strong>tipo de métrica</strong> especificado para medir la similitud entre el vector de consulta y los del subgrupo, clasificar los miembros del grupo en función de la similitud con el vector de consulta y determinar <strong>los K</strong> miembros <strong>principales</strong> del grupo.</p>
<p>Las búsquedas RNA dependen de índices preconstruidos, y el rendimiento de la búsqueda, el uso de memoria y la corrección de la búsqueda pueden variar con los tipos de índice que elija. Es necesario equilibrar el rendimiento y la corrección de la búsqueda.</p>
<p>Para reducir la curva de aprendizaje, Milvus proporciona <strong>AUTOINDEX</strong>. Con <strong>AUTOINDEX</strong>, Milvus puede analizar la distribución de datos dentro de su colección mientras construye el índice y establece los parámetros de índice más optimizados basándose en el análisis para lograr un equilibrio entre el rendimiento de la búsqueda y la corrección.</p>
<p>En esta sección, encontrará información detallada sobre los siguientes temas:</p>
<ul>
<li><p><a href="/docs/es/single-vector-search.md#Single-Vector-Search">Búsqueda monovectorial</a></p></li>
<li><p><a href="/docs/es/single-vector-search.md#Bulk-Vector-Search">Búsqueda vectorial masiva</a></p></li>
<li><p><a href="/docs/es/single-vector-search.md#ANN-Search-in-Partition">Búsqueda RNA en partición</a></p></li>
<li><p><a href="/docs/es/single-vector-search.md#Use-Output-Fields">Utilizar campos de salida</a></p></li>
<li><p><a href="/docs/es/single-vector-search.md#Use-Limit-and-Offset">Utilizar límite y offset</a></p></li>
<li><p><a href="/docs/es/single-vector-search.md#Use-Level">Utilizar nivel</a></p></li>
<li><p><a href="/docs/es/single-vector-search.md#Get-Recall-Rate">Obtener tasa de recuperación</a></p></li>
<li><p><a href="/docs/es/single-vector-search.md#Enhancing-ANN-Search">Mejora de la búsqueda RNA</a></p></li>
</ul>
<h2 id="Single-Vector-Search" class="common-anchor-header">Búsqueda monovectorial<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>En las búsquedas RNA, una búsqueda de un solo vector se refiere a una búsqueda que implica sólo un vector de consulta. Basándose en el índice pre-construido y en el tipo de métrica incluido en la petición de búsqueda, Milvus encontrará los K vectores más similares al vector de consulta.</p>
<p>En esta sección, aprenderá a realizar una búsqueda de un solo vector. La petición de búsqueda lleva un único vector de consulta y pide a Milvus que utilice el Producto Interior (PI) para calcular la similitud entre los vectores de consulta y los vectores de la colección y devuelve los tres más similares.</p>
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
<p>Milvus clasifica los resultados de la búsqueda por su puntuación de similitud con el vector de consulta en orden descendente. La puntuación de similitud también se denomina distancia al vector de consulta, y sus rangos de valores varían según los tipos de métrica utilizados.</p>
<p>La siguiente tabla enumera los tipos de métrica aplicables y los rangos de distancia correspondientes.</p>
<table>
   <tr>
     <th><p>Tipo de métrica</p></th>
     <th><p>Características</p></th>
     <th><p>Rango de distancia</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Un valor menor indica una mayor similitud.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Un valor mayor indica una mayor similitud.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Un valor mayor indica una mayor similitud.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Un valor menor indica una mayor similitud.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Un valor menor indica una mayor similitud.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
</table>
<h2 id="Bulk-Vector-Search" class="common-anchor-header">Búsqueda de vectores múltiples<button data-href="#Bulk-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>De forma similar, puede incluir múltiples vectores de consulta en una petición de búsqueda. Milvus realizará búsquedas RNA de los vectores de consulta en paralelo y devolverá dos conjuntos de resultados.</p>
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
<h2 id="ANN-Search-in-Partition" class="common-anchor-header">Búsqueda RNA en partición<button data-href="#ANN-Search-in-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Supongamos que ha creado varias particiones en una colección y puede restringir el ámbito de búsqueda a un número específico de particiones. En ese caso, puede incluir los nombres de las particiones de destino en la petición de búsqueda para restringir el ámbito de la búsqueda dentro de las particiones especificadas. Reducir el número de particiones implicadas en la búsqueda mejora el rendimiento de la misma.</p>
<p>El siguiente fragmento de código asume una partición llamada <strong>ParticiónA</strong> en tu colección.</p>
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
<h2 id="Use-Output-Fields" class="common-anchor-header">Utilizar campos de salida<button data-href="#Use-Output-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>En un resultado de búsqueda, Milvus incluye los valores de campo primario y las distancias/puntuaciones de similitud de las entidades que contienen las incrustaciones vectoriales top-K por defecto. Puede incluir los nombres de los campos de destino, incluyendo tanto los campos vectoriales como escalares, en una petición de búsqueda como campos de salida para hacer que los resultados de la búsqueda lleven los valores de otros campos en estas entidades.</p>
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
<h2 id="Use-Limit-and-Offset" class="common-anchor-header">Utilizar límite y desplazamiento<button data-href="#Use-Limit-and-Offset" class="anchor-icon" translate="no">
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
    </button></h2><p>Es posible que observe que el parámetro <code translate="no">limit</code> incluido en las peticiones de búsqueda determina el número de entidades que se incluirán en los resultados de la búsqueda. Este parámetro especifica el número máximo de entidades a devolver en una única búsqueda, y suele denominarse <strong>top-K</strong>.</p>
<p>Si desea realizar consultas paginadas, puede utilizar un bucle para enviar múltiples peticiones de búsqueda, con los parámetros <strong>Limit</strong> y <strong>Offset</strong> transportados en cada petición de consulta. En concreto, puede establecer el parámetro <strong>Límite</strong> en el número de entidades que desea incluir en los resultados de la consulta actual, y establecer el <strong>Desplazamiento</strong> en el número total de entidades que ya se han devuelto.</p>
<p>La siguiente tabla muestra cómo establecer los parámetros <strong>Límite</strong> y <strong>Desplazamiento</strong> para consultas paginadas que devuelven 100 entidades cada vez.</p>
<table>
   <tr>
     <th><p>Consultas</p></th>
     <th><p>Entidades a devolver por consulta</p></th>
     <th><p>Entidades ya devueltas en total</p></th>
   </tr>
   <tr>
     <td><p><strong>1ª</strong> consulta</p></td>
     <td><p>100</p></td>
     <td><p>0</p></td>
   </tr>
   <tr>
     <td><p><strong>2ª</strong> consulta</p></td>
     <td><p>100</p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p><strong>3ª</strong> consulta</p></td>
     <td><p>100</p></td>
     <td><p>200</p></td>
   </tr>
   <tr>
     <td><p><strong>Enésima</strong> consulta</p></td>
     <td><p>100</p></td>
     <td><p>100 x (n-1)</p></td>
   </tr>
</table>
<p>Tenga en cuenta que, la suma de <code translate="no">limit</code> y <code translate="no">offset</code> en una sola búsqueda RNA debe ser inferior a 16.384.</p>
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
<h2 id="Enhancing-ANN-Search" class="common-anchor-header">Mejora de la búsqueda RNA<button data-href="#Enhancing-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>AUTOINDEX aplana considerablemente la curva de aprendizaje de las búsquedas RNA. Sin embargo, los resultados de la búsqueda pueden no ser siempre correctos a medida que aumenta el top-K. Al reducir el alcance de la búsqueda, mejorar la relevancia de los resultados de la búsqueda y diversificar los resultados de la búsqueda, Milvus elabora las siguientes mejoras de la búsqueda.</p>
<ul>
<li><p>Búsqueda filtrada</p>
<p>Puede incluir condiciones de filtrado en una solicitud de búsqueda para que Milvus realice un filtrado de metadatos antes de realizar búsquedas RNA, reduciendo el ámbito de búsqueda de toda la colección a sólo las entidades que coincidan con las condiciones de filtrado especificadas.</p>
<p>Para obtener más información sobre el filtrado de metadatos y las condiciones de filtrado, consulte <a href="/docs/es/filtered-search.md">Búsqueda filtrada</a>, <a href="/docs/es/boolean.md">Explicación del filtrado</a> y temas relacionados.</p></li>
<li><p>Búsqueda por rangos</p>
<p>Puede mejorar la relevancia de los resultados de búsqueda restringiendo la distancia o puntuación de las entidades devueltas dentro de un rango específico. En Milvus, una búsqueda por rango implica dibujar dos círculos concéntricos con el vector incrustado más similar al vector de consulta como centro. La petición de búsqueda especifica el radio de ambos círculos, y Milvus devuelve todas las incrustaciones vectoriales que caen dentro del círculo exterior pero no del círculo interior.</p>
<p>Para más información sobre la búsqueda por rango, consulte <a href="/docs/es/range-search.md">Búsqueda por rango</a>.</p></li>
<li><p>Búsqueda por agrupación</p>
<p>Si las entidades devueltas tienen el mismo valor en un campo específico, los resultados de la búsqueda pueden no representar la distribución de todas las incrustaciones vectoriales en el espacio vectorial. Para diversificar los resultados de la búsqueda, considere la posibilidad de utilizar la búsqueda de agrupación.</p>
<p>Para más información sobre la búsqueda agrupada, consulte <a href="/docs/es/grouping-search.md">Búsqueda agrupada</a>,</p></li>
<li><p>Búsqueda híbrida</p>
<p>Una colección puede incluir hasta cuatro campos vectoriales para guardar las incrustaciones vectoriales generadas utilizando diferentes modelos de incrustación. De este modo, puede utilizar una búsqueda híbrida para volver a clasificar los resultados de búsqueda de estos campos vectoriales, mejorando el índice de recuperación.</p>
<p>Para obtener más información sobre la búsqueda híbrida, consulte <a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a>.</p></li>
<li><p>Iterador de búsqueda</p>
<p>Una única búsqueda RNA devuelve un máximo de 16.384 entidades. Considere el uso de iteradores de búsqueda si necesita devolver más entidades en una sola búsqueda.</p>
<p>Para obtener más información sobre los iteradores de búsqueda, consulte <a href="/docs/es/with-iterators.md">Iterador de búsqueda</a>.</p></li>
<li><p>Búsqueda de texto completo</p>
<p>La búsqueda de texto completo es una función que recupera documentos que contienen términos o frases específicos en conjuntos de datos de texto y, a continuación, clasifica los resultados en función de su relevancia. Esta función supera las limitaciones de la búsqueda semántica, que puede pasar por alto términos precisos, garantizando que usted reciba los resultados más precisos y contextualmente relevantes. Además, simplifica las búsquedas vectoriales al aceptar la entrada de texto sin formato, convirtiendo automáticamente sus datos de texto en incrustaciones dispersas sin necesidad de generar manualmente incrustaciones vectoriales.</p>
<p>Para obtener más información sobre la búsqueda de texto completo, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p></li>
<li><p>Concordancia de palabras clave</p>
<p>La concordancia de palabras clave en Milvus permite una recuperación precisa de documentos basada en términos específicos. Esta función se utiliza principalmente para la búsqueda filtrada para satisfacer condiciones específicas y puede incorporar el filtrado escalar para refinar los resultados de la consulta, permitiendo búsquedas de similitud dentro de los vectores que cumplen los criterios escalares.</p>
<p>Para obtener más información sobre la concordancia de palabras clave, consulte <a href="/docs/es/keyword-match.md">Concordancia de palabras clave</a>.</p></li>
<li><p>Utilizar clave de partición</p>
<p>Involucrar varios campos escalares en el filtrado de metadatos y utilizar una condición de filtrado bastante complicada puede afectar a la eficacia de la búsqueda. Una vez establecido un campo escalar como clave de partición y utilizada una condición de filtrado que incluya la clave de partición en la petición de búsqueda, puede ayudar a restringir el ámbito de búsqueda dentro de las particiones correspondientes a los valores de clave de partición especificados.</p>
<p>Para más detalles sobre la clave de partición, consulte <a href="/docs/es/use-partition-key.md">Utilizar clave de partición</a>.</p></li>
<li><p>Utilizar mmap</p>
<p>Para más información sobre la configuración mmap, consulte <a href="/docs/es/mmap.md">Utilizar mmap</a>.</p></li>
<li><p>Compactación en clúster</p>
<p>Para más información sobre la compactación de clústeres, consulte <a href="/docs/es/clustering-compaction.md">Compactación de cl</a>ústeres.</p></li>
</ul>
