---
id: primary-key-search.md
title: Búsqueda por clave primariaCompatible with Milvus 2.6.9+
summary: >-
  Al realizar búsquedas de similitud, siempre se te pide que proporciones uno o
  varios vectores de consulta, incluso si dichos vectores ya están presentes en
  la colección de destino. Para evitar tener que recuperar los vectores antes de
  la búsqueda, puedes utilizar claves primarias en su lugar.
beta: Milvus 2.6.9+
---
<h1 id="Primary-Key-Search" class="common-anchor-header">Búsqueda por clave primaria<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.9+</span><button data-href="#Primary-Key-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Al realizar búsquedas por similitud, siempre se te pedirá que proporciones uno o más vectores de consulta, incluso si dichos vectores ya están presentes en la colección de destino. Para evitar tener que recuperar los vectores antes de la búsqueda, puedes utilizar claves primarias en su lugar.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>En las plataformas de comercio electrónico, los usuarios pueden introducir una palabra clave para recuperar productos que coincidan con ella. Una vez que el usuario consulta la página de detalles de un producto, la plataforma también muestra una lista de productos similares en la parte inferior de la página para aquellos usuarios que deseen compararlos.</p>
<p>Las recomendaciones se ordenan según su similitud con la palabra clave o con el producto actual. Para lograrlo, los desarrolladores de la plataforma deben recuperar la representación vectorial de la palabra clave o del producto actual de Milvus antes de la búsqueda de similitud propiamente dicha, lo que aumenta el número de idas y venidas entre la plataforma y Milvus y da lugar a la transmisión a través de la red de un gran número de valores flotantes de alta dimensión.</p>
<p>Para simplificar la lógica de interacción entre sus aplicaciones y Milvus, reducir el número de idas y vueltas y evitar la transmisión de grandes cantidades de valores de punto flotante de alta dimensión a través de la red, considere la posibilidad de utilizar búsquedas por clave primaria.</p>
<p>En una búsqueda por clave primaria, no es necesario proporcionar ningún vector de consulta. En su lugar, se le pedirá que facilite las claves primarias (<code translate="no">ids</code>) de las entidades que contienen los vectores de consulta.</p>
<h2 id="Limits--restrictions" class="common-anchor-header">Límites y restricciones<button data-href="#Limits--restrictions" class="anchor-icon" translate="no">
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
<li><p>Las búsquedas mediante claves primarias se aplican a todos los tipos de datos vectoriales, excepto a los campos vectoriales dispersos derivados de campos VarChar, como en las funciones BM25.</p></li>
<li><p>Puede utilizar claves primarias en lugar de vectores de consulta en búsquedas filtradas, por rango y por agrupación, opcionalmente con la paginación activada. Sin embargo, esta función no se aplica a las búsquedas híbridas ni a los iteradores de búsqueda.</p></li>
<li><p>Para las búsquedas por similitud que impliquen listas de incrustaciones, sigue siendo necesario recuperar los vectores de consulta, organizarlos en listas de incrustaciones y ejecutar las búsquedas.</p></li>
<li><p>No se pueden utilizar claves primarias en lugar de vectores de consulta en las API RESTful.</p></li>
<li><p>En el caso de claves primarias inexistentes o con un formato incorrecto, Milvus mostrará mensajes de error.</p></li>
<li><p>Las claves primarias y los vectores de consulta son mutuamente excluyentes. Proporcionar ambos también da lugar a errores.</p></li>
</ul>
<h2 id="Examples" class="common-anchor-header">Ejemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Los siguientes ejemplos dan por hecho que todos los ID de tipo Int64 proporcionados están disponibles en la colección de destino.</p>
<div class="alert note">
<p>Las claves primarias no se utilizan para filtrar, sino únicamente para la recuperación de vectores.</p>
</div>
<h3 id="Example-1-Basic-primary-key-search" class="common-anchor-header">Ejemplo 1: Búsqueda básica por clave primaria<button data-href="#Example-1-Basic-primary-key-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Para realizar una búsqueda básica por clave primaria, basta con sustituir los vectores de consulta por claves primarias.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment"># a list of primary keys</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .ids(ids)
        .limit(<span class="hljs-number">3</span>)
        .metricType(IndexParam.MetricType.IP)
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">// a list of primary keys</span></span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

<span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>}) <span class="hljs-comment">// a list of primary keys</span></span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,             <span class="hljs-comment">// limit</span>
    ids,
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                         .<span class="hljs-built_in">WithMetricType</span>(milvus::MetricType::IP);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i] &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtered-search-using-primary-keys" class="common-anchor-header">Ejemplo 2: Búsqueda filtrada mediante claves primarias<button data-href="#Example-2-Filtered-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>El siguiente ejemplo parte de la base de que «color» y «likes» son dos campos definidos en el esquema de la colección de destino.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">#</span></span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ids(ids)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and likes &gt; 50&quot;</span>)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithFilter(<span class="hljs-string">`color like &quot;red%&quot; and likes &gt; 50`</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>))
    fmt.Println(<span class="hljs-string">&quot;likes: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;likes&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;filter&quot;: &quot;color like \\&quot;red%\\&quot; and likes &gt; 50&quot;,
    &quot;outputFields&quot;: [&quot;color&quot;, &quot;likes&quot;],
    &quot;limit&quot;: 3
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(color like &quot;red%&quot; and likes &gt; 50)&quot;</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> colors = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::VarCharFieldData&gt;(<span class="hljs-string">&quot;color&quot;</span>);
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> likes = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::Int64FieldData&gt;(<span class="hljs-string">&quot;likes&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i]
                  &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, color=&quot;</span> &lt;&lt; colors-&gt;<span class="hljs-built_in">Data</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, likes=&quot;</span> &lt;&lt; likes-&gt;<span class="hljs-built_in">Data</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-search-using-primary-keys" class="common-anchor-header">Ejemplo 3: Búsqueda por rango utilizando claves primarias<button data-href="#Example-3-Range-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    search_params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span></span>
<span class="highlighted-comment-line">        }</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;radius&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>);
params.put(<span class="hljs-string">&quot;range_filter&quot;</span>, <span class="hljs-string">&quot;0.6&quot;</span>);

List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ids(ids)
        .limit(<span class="hljs-number">3</span>)
        .searchParams(params)
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">params</span>: {
<span class="highlighted-comment-line">        <span class="hljs-attr">radius</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">range_filter</span>: <span class="hljs-number">0.6</span>,</span>
    },
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annParam := index.NewCustomAnnParam()
<span class="highlighted-comment-line">annParam.WithRadius(<span class="hljs-number">0.4</span>)</span>
<span class="highlighted-comment-line">annParam.WithRangeFilter(<span class="hljs-number">0.6</span>)</span>

<span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3,
    &quot;searchParams&quot;: {
      &quot;params&quot;: {
        &quot;radius&quot;: 0.4,
        &quot;range_filter&quot;: 0.6
      }
    }
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithRadius</span>(<span class="hljs-number">0.4</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithRangeFilter</span>(<span class="hljs-number">0.6</span>)</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i] &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Grouping-search-using-primary-keys" class="common-anchor-header">Ejemplo 4: Búsqueda por agrupación utilizando claves primarias<button data-href="#Example-4-Grouping-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>El siguiente ejemplo parte de la base de que « <code translate="no">docId</code> » es un campo definido en el esquema de la colección de destino.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;Object&gt; ids = Arrays.asList(<span class="hljs-number">551L</span>, <span class="hljs-number">296L</span>, <span class="hljs-number">43L</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .ids(ids)
        .limit(<span class="hljs-number">3</span>)
        .groupByFieldName(<span class="hljs-string">&quot;docId&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;docId&quot;</span>))
        .build());
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithGroupByField(<span class="hljs-string">&quot;docId&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;docId&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;docId: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;docId&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3,
    &quot;groupingField&quot;: &quot;docId&quot;,
    &quot;outputFields&quot;: [&quot;docId&quot;]
  }&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;docId&quot;</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;docId&quot;</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> docIds = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::Int64FieldData&gt;(<span class="hljs-string">&quot;docId&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i]
                  &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, docId=&quot;</span> &lt;&lt; docIds-&gt;<span class="hljs-built_in">Data</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
