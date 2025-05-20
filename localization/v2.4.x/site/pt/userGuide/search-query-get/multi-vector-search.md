---
id: multi-vector-search.md
order: 2
summary: >-
  Este guia demonstra como efetuar uma pesquisa híbrida no Milvus e compreender
  a classificação dos resultados.
title: Pesquisa híbrida
---
<h1 id="Hybrid-Search" class="common-anchor-header">Pesquisa híbrida<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Desde o Milvus 2.4, introduzimos o suporte multi-vetorial e uma estrutura de pesquisa híbrida, o que significa que os utilizadores podem trazer vários campos vectoriais (até 10) para uma única coleção. Estes vectores em diferentes colunas representam diversas facetas dos dados, provenientes de diferentes modelos de incorporação ou submetidos a métodos de processamento distintos. Os resultados das pesquisas híbridas são integrados usando estratégias de reranking, como Reciprocal Rank Fusion (RRF) e Weighted Scoring. Para saber mais sobre as estratégias de reranking, consulte <a href="/docs/pt/v2.4.x/reranking.md">Reranking</a>.</p>
<p>Esta funcionalidade é particularmente útil em cenários de pesquisa abrangente, como a identificação da pessoa mais semelhante numa biblioteca de vectores com base em vários atributos, como imagens, voz, impressões digitais, etc.</p>
<p>Neste tutorial, você aprenderá como:</p>
<ul>
<li><p>Criar várias instâncias de <code translate="no">AnnSearchRequest</code> para pesquisas de similaridade em diferentes campos vetoriais;</p></li>
<li><p>Configurar uma estratégia de classificação para combinar e classificar os resultados de pesquisa de várias instâncias de <code translate="no">AnnSearchRequest</code>;</p></li>
<li><p>Utilizar o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> para executar uma pesquisa híbrida.</p></li>
</ul>
<div class="alert note">
<p>Os trechos de código nesta página usam o <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">módulo ORM do PyMilvus</a> para interagir com o Milvus. Os trechos de código com o novo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">SDK MilvusClient</a> estarão disponíveis em breve.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Preparativos<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de iniciar uma pesquisa híbrida, certifique-se de que tem uma coleção com vários campos vectoriais. Atualmente, o Milvus introduz uma predefinição de quatro campos vectoriais por coleção, que pode ser alargada até um máximo de dez modificando a configuração <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>.</p>
<p>Abaixo está um exemplo de criação de uma coleção chamada <code translate="no">test_collection</code> com dois campos vectoriais, <code translate="no">filmVector</code> e <code translate="no">posterVector</code>, e a inserção de entidades aleatórias na mesma.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Etapa 1: criar várias instâncias de AnnSearchRequest<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma pesquisa híbrida usa a API <code translate="no">hybrid_search()</code> para executar várias solicitações de pesquisa ANN em uma única chamada. Cada <code translate="no">AnnSearchRequest</code> representa uma única solicitação de pesquisa em um campo vetorial específico.</p>
<p>O exemplo a seguir cria duas instâncias <code translate="no">AnnSearchRequest</code> para executar pesquisas de similaridade individuais em dois campos vetoriais.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>Parâmetros:</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(objeto</em>)</p>
<p>Uma classe que representa um pedido de pesquisa ANN. Cada pesquisa híbrida pode conter de 1 a 1.024 objectos <code translate="no">ANNSearchRequest</code> de cada vez.</p></li>
<li><p><code translate="no">data</code> <em>(lista</em>)</p>
<p>O vetor de consulta a pesquisar num único <code translate="no">AnnSearchRequest</code>. Atualmente, este parâmetro aceita uma lista que contém apenas um único vetor de pesquisa, por exemplo, <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. No futuro, este parâmetro será expandido para aceitar múltiplos vectores de pesquisa.</p></li>
<li><p><code translate="no">anns_field</code> <em>(string</em>)</p>
<p>O nome do campo vetorial a utilizar num único <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>Um dicionário de parâmetros de pesquisa para um único <code translate="no">AnnSearchRequest</code>. Estes parâmetros de pesquisa são idênticos aos de uma pesquisa de vetor único. Para mais informações, consulte <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Parâmetros de pesquisa</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>O número máximo de resultados de pesquisa a incluir num único <code translate="no">ANNSearchRequest</code>.</p>
<p>Este parâmetro afecta apenas o número de resultados de pesquisa a devolver num <code translate="no">ANNSearchRequest</code> individual e não decide os resultados finais a devolver para uma chamada <code translate="no">hybrid_search</code>. Em uma pesquisa híbrida, os resultados finais são determinados pela combinação e classificação dos resultados de várias instâncias do <code translate="no">ANNSearchRequest</code>.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Etapa 2: Configurar uma estratégia de ranqueamento<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de criar instâncias de <code translate="no">AnnSearchRequest</code>, configure uma estratégia de reclassificação para combinar e reclassificar os resultados. Atualmente, há duas opções: <code translate="no">WeightedRanker</code> e <code translate="no">RRFRanker</code>. Para obter mais informações sobre estratégias de ranqueamento, consulte <a href="/docs/pt/v2.4.x/reranking.md">Ranqueamento</a>.</p>
<ul>
<li><p>Usar pontuação ponderada</p>
<p>O <code translate="no">WeightedRanker</code> é usado para atribuir importância aos resultados de cada pesquisa de campo vetorial com pesos especificados. Se der prioridade a alguns campos vectoriais em detrimento de outros, <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> pode refletir isso nos resultados de pesquisa combinados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>Ao usar <code translate="no">WeightedRanker</code>, observe que:</p>
<ul>
<li>Cada valor de peso varia de 0 (menos importante) a 1 (mais importante), influenciando a pontuação agregada final.</li>
<li>O número total de valores de ponderação fornecidos em <code translate="no">WeightedRanker</code> deve ser igual ao número de instâncias de <code translate="no">AnnSearchRequest</code> que criou.</li>
</ul></li>
<li><p>Use a Fusão de classificação recíproca (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Etapa 3: Executar uma pesquisa híbrida<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Com as instâncias <code translate="no">AnnSearchRequest</code> e a estratégia de reranking definidas, use o método <code translate="no">hybrid_search()</code> para executar a pesquisa híbrida.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Parâmetros:</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(lista</em>)</p>
<p>Uma lista de pedidos de pesquisa, em que cada pedido é um objeto <code translate="no">ANNSearchRequest</code>. Cada pedido pode corresponder a um campo vetorial diferente e a um conjunto diferente de parâmetros de pesquisa.</p></li>
<li><p><code translate="no">rerank</code> <em>(objeto</em>)</p>
<p>A estratégia de reordenação a utilizar para a pesquisa híbrida. Valores possíveis: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> e <code translate="no">RRFRanker()</code>.</p>
<p>Para mais informações sobre estratégias de classificação, consulte <a href="/docs/pt/v2.4.x/reranking.md">Classificação</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>O número máximo de resultados finais a devolver na pesquisa híbrida.</p></li>
</ul>
<p>A saída é semelhante à seguinte:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Normalmente, cada coleção tem uma permissão predefinida de até 4 campos vectoriais. No entanto, você tem a opção de ajustar a configuração <code translate="no">proxy.maxVectorFieldNum</code> para expandir o número máximo de campos vetoriais em uma coleção, com um limite máximo de 10 campos vetoriais por coleção. Consulte <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Configurações relacionadas a proxy</a> para saber mais.</p></li>
<li><p>Campos vetoriais parcialmente indexados ou carregados em uma coleção resultarão em um erro.</p></li>
<li><p>Atualmente, cada <code translate="no">AnnSearchRequest</code> numa pesquisa híbrida pode transportar apenas um vetor de consulta.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Em que cenário a pesquisa híbrida é recomendada?</strong></p>
<p>A pesquisa híbrida é ideal para situações complexas que exigem uma elevada precisão, especialmente quando uma entidade pode ser representada por vários vectores diferentes. Isto aplica-se aos casos em que os mesmos dados, como uma frase, são processados através de diferentes modelos de incorporação ou quando a informação multimodal (como imagens, impressões digitais e impressões de voz de um indivíduo) é convertida em vários formatos vectoriais. Ao atribuir pesos a estes vectores, a sua influência combinada pode enriquecer significativamente a recuperação e melhorar a eficácia dos resultados da pesquisa.</p></li>
<li><p><strong>Como é que um classificador ponderado normaliza as distâncias entre diferentes campos vectoriais?</strong></p>
<p>Um classificador ponderado normaliza as distâncias entre campos vectoriais utilizando pesos atribuídos a cada campo. Calcula a importância de cada campo vetorial de acordo com o seu peso, dando prioridade aos que têm pesos mais elevados. É aconselhável utilizar o mesmo tipo de métrica nos pedidos de pesquisa ANN para garantir a consistência. Este método garante que os vectores considerados mais significativos têm uma maior influência na classificação geral.</p></li>
<li><p><strong>É possível utilizar classificadores alternativos como o Cohere Ranker ou o BGE Ranker?</strong></p>
<p>Atualmente, apenas são suportados os classificadores fornecidos. Estão em curso planos para incluir classificadores adicionais em futuras actualizações.</p></li>
<li><p><strong>É possível efetuar várias operações de pesquisa híbrida ao mesmo tempo?</strong></p>
<p>Sim, é suportada a execução simultânea de várias operações de pesquisa híbrida.</p></li>
<li><p><strong>Posso utilizar o mesmo campo vetorial em vários objectos AnnSearchRequest para efetuar pesquisas híbridas?</strong></p>
<p>Tecnicamente, é possível utilizar o mesmo campo de vetor em vários objectos AnnSearchRequest para pesquisas híbridas. Não é necessário ter vários campos de vetor para uma pesquisa híbrida.</p></li>
</ul>
