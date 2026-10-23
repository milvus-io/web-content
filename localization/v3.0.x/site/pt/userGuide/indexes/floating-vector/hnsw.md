---
id: hnsw.md
title: HNSW
summary: >-
  O índice HNSW é um algoritmo de indexação baseado em grafos que pode melhorar
  o desempenho na pesquisa de vetores flutuantes de alta dimensão. Oferece uma
  excelente precisão de pesquisa e baixa latência, embora exija um elevado
  consumo de memória para manter a sua estrutura hierárquica em grafo.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <strong>HNSW</strong> é um algoritmo de indexação <strong>baseado em grafos</strong> que pode melhorar o desempenho na pesquisa de vetores flutuantes de alta dimensão. Oferece uma <strong>excelente</strong> precisão de pesquisa e <strong>baixa</strong> latência, embora exija um <strong>elevado</strong> consumo de memória para manter a sua estrutura hierárquica em grafo.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O algoritmo Hierarchical Navigable Small World (HNSW) constrói um grafo com várias camadas, semelhante a um mapa com diferentes níveis de zoom. A <strong>camada inferior</strong> contém todos os pontos de dados, enquanto as <strong>camadas superiores</strong> consistem num subconjunto de pontos de dados amostrados a partir da camada inferior.</p>
<p>Nesta hierarquia, cada camada contém nós que representam pontos de dados, ligados por arestas que indicam a sua proximidade. As camadas superiores permitem saltos de longa distância para se aproximar rapidamente do alvo, enquanto as camadas inferiores permitem uma pesquisa mais detalhada para obter os resultados mais precisos.</p>
<p>Eis como funciona:</p>
<ol>
<li><p><strong>Ponto de entrada</strong>: A pesquisa começa num ponto de entrada fixo na camada superior, que é um nó pré-determinado no gráfico.</p></li>
<li><p><strong>Pesquisa «greedy</strong>»: O algoritmo desloca-se de forma «greedy» para o vizinho mais próximo na camada atual até não conseguir aproximar-se mais do vetor de consulta. As camadas superiores têm uma função de navegação, atuando como um filtro grosseiro para localizar potenciais pontos de entrada para a pesquisa mais detalhada nos níveis inferiores.</p></li>
<li><p><strong>Descida de camadas</strong>: Assim que se atinge um <strong>mínimo local</strong> na camada atual, o algoritmo salta para a camada inferior, utilizando uma ligação pré-estabelecida, e repete a pesquisa gananciosa.</p></li>
<li><p><strong>Aperfeiçoamento</strong><strong>final</strong>: Este processo continua até se atingir a camada inferior, onde uma etapa de aperfeiçoamento final identifica os vizinhos mais próximos.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>O desempenho do HNSW depende de vários parâmetros-chave que controlam tanto a estrutura do grafo como o comportamento de pesquisa. Estes incluem:</p>
<ul>
<li><p><code translate="no">M</code>: O número máximo de arestas ou ligações que cada nó pode ter no grafo em cada nível da hierarquia. Um valor mais elevado de « <code translate="no">M</code> » resulta num grafo mais denso e aumenta a recuperação e a precisão, uma vez que a pesquisa tem mais caminhos para explorar, o que também consome mais memória e torna o tempo de inserção mais lento devido às ligações adicionais. Conforme ilustrado na imagem acima, <strong>M = 5</strong> indica que cada nó no grafo HNSW está diretamente ligado a um máximo de 5 outros nós. Isto cria uma estrutura de grafo moderadamente densa, na qual os nós dispõem de múltiplas vias para alcançar outros nós.</p></li>
<li><p><code translate="no">efConstruction</code>: O número de candidatos considerados durante a construção do índice. Um valor mais elevado de « <code translate="no">efConstruction</code> » resulta geralmente num grafo de melhor qualidade, mas requer mais tempo para ser construído.</p></li>
<li><p><code translate="no">ef</code>: O número de vizinhos avaliados durante uma pesquisa. Aumentar o parâmetro « <code translate="no">ef</code> » melhora a probabilidade de encontrar os vizinhos mais próximos, mas torna o processo de pesquisa mais lento.</p></li>
</ul>
<p>Para obter detalhes sobre como ajustar estas definições de acordo com as suas necessidades, consulte <a href="/docs/pt/hnsw.md#Index-params">Parâmetros</a> do <a href="/docs/pt/hnsw.md#Index-params">índice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Criar índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Este exemplo utiliza um cliente ligado denominado « <code translate="no">client</code> » e uma coleção existente denominada « <code translate="no">your_collection_name</code> ». A coleção possui um campo vetorial de cinco dimensões denominado « <code translate="no">your_vector_field_name</code> ».</p>
<p>Defina os parâmetros do índice com <code translate="no">add_index()</code> e, em seguida, crie o índice com <code translate="no">create_index()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a ser criado. Neste exemplo, defina o valor como « <code translate="no">HNSW</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vetores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Para mais detalhes, consulte <a href="/docs/pt/metric.md">Tipos</a> de <a href="/docs/pt/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para a criação do índice.</p>
<ul>
<li><p><code translate="no">M</code>: Número máximo de vizinhos a que cada nó se pode ligar.</p></li>
<li><p><code translate="no">efConstruction</code>: Número de vizinhos candidatos considerados para ligação durante a construção do índice.</p></li>
</ul>
<p>O exemplo define <code translate="no">M=64</code> e <code translate="no">efConstruction=100</code> como substituições de ajuste. Para valores predefinidos e intervalos aceites, consulte <a href="/docs/pt/hnsw.md#Index-building-params">Parâmetros de criação de índices</a>.</p></li>
</ul>
<p>Para criar uma coleção e o respetivo índice em simultâneo, passe os parâmetros do índice para <code translate="no">create_collection()</code>. Para mais detalhes, consulte <a href="/docs/pt/create-collection.md">Criar coleção</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pesquisa no índice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Após construir o índice e inserir entidades, carregue a coleção e pesquise no seu campo vetorial. Para pesquisas kNN comuns, defina <code translate="no">ef</code> para, pelo menos, <code translate="no">limit</code>.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para a pesquisa no índice.</p>
<ul>
<li><code translate="no">ef</code>: Número de vizinhos a considerar durante uma pesquisa.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">HNSW</code>, consulte <a href="/docs/pt/hnsw.md#Index-specific-search-params">Parâmetros de pesquisa específicos</a> do <a href="/docs/pt/hnsw.md#Index-specific-search-params">índice</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parâmetros do índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>As tabelas abaixo apresentam os parâmetros para a criação do índice e para a pesquisa. As definições do servidor podem substituir os valores predefinidos dos parâmetros que omitir.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de criação de índices<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte apresenta os parâmetros que podem ser configurados no <code translate="no">params</code> durante <a href="/docs/pt/hnsw.md#Build-index">a criação de um índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Número máximo de ligações (ou arestas) que cada nó pode ter no gráfico, incluindo tanto as arestas de saída como as de entrada. Este parâmetro afeta diretamente tanto a construção do índice como a pesquisa.</p></td>
     <td><p><strong>Tipo</strong>: Número inteiro <strong>Intervalo</strong>: [2, 2048]</p><p><strong>Valor predefinido</strong>: <code translate="no">30</code> (até 30 arestas de saída e 30 arestas de entrada por nó)</p></td>
     <td><p>Um valor maior de « <code translate="no">M</code> » geralmente conduz a <strong>uma maior precisão</strong>, mas <strong>aumenta a sobrecarga de memória</strong> e <strong>torna mais lentas tanto a construção do índice como a pesquisa</strong>. Considere aumentar « <code translate="no">M</code> » para conjuntos de dados com elevada dimensionalidade ou quando for crucial obter uma elevada taxa de recuperação.</p><p>Considere diminuir o valor de ` <code translate="no">M</code> ` quando a utilização de memória e a velocidade de pesquisa forem as principais preocupações.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vizinhos candidatos considerados para ligação durante a construção do índice. É avaliado um conjunto maior de candidatos para cada novo elemento, mas o número máximo de ligações efetivamente estabelecidas continua a ser limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro <strong>Intervalo</strong>: [1, <em>int_max</em>]</p><p><strong>Valor predefinido</strong>: <code translate="no">360</code></p></td>
     <td><p>Um valor mais elevado de « <code translate="no">efConstruction</code> » resulta normalmente num <strong>índice mais preciso</strong>, uma vez que são exploradas mais ligações potenciais. No entanto, isto também leva a <strong>um tempo de indexação mais longo e a um aumento do consumo de memória</strong> durante a construção. Considere aumentar « <code translate="no">efConstruction</code> » para melhorar a precisão, especialmente em cenários em que o tempo de indexação é menos crítico.</p><p>Considere diminuir o valor de ` <code translate="no">efConstruction</code> ` para acelerar a construção do índice quando houver restrições de recursos.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/hnsw.md#Search-on-index">efetuar pesquisas no índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controla a amplitude da pesquisa durante a recuperação do vizinho mais próximo. Determina quantos nós são visitados e avaliados como potenciais vizinhos mais próximos. Este parâmetro afeta apenas o processo de pesquisa e aplica-se exclusivamente à camada inferior do gráfico.</p></td>
     <td><p><strong>Tipo</strong>: Número inteiro <strong>Intervalo</strong>: [1, <em>int_max</em>]</p><p><strong>Valor predefinido</strong>: <code translate="no">max(limit, 16)</code> para a pesquisa kNN normal; <code translate="no">512</code> para a pesquisa por intervalo.</p><p>Para a pesquisa kNN normal, um valor explícito de ` <code translate="no">ef</code> ` deve ser maior ou igual a ` <code translate="no">limit</code> ` (o número de vizinhos mais próximos a devolver).</p></td>
     <td><p>Um valor maior de <code translate="no">ef</code> conduz geralmente a <strong>uma maior precisão de pesquisa</strong>, uma vez que são considerados mais vizinhos potenciais. No entanto, isto também <strong>aumenta o tempo de pesquisa</strong>. Considere aumentar <code translate="no">ef</code> quando for essencial obter uma elevada taxa de recuperação e a velocidade de pesquisa for menos importante.</p><p>Considere diminuir o « <code translate="no">ef</code> » para dar prioridade a pesquisas mais rápidas, especialmente em cenários em que uma ligeira redução na precisão seja aceitável.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [K, 10K].</p></td>
   </tr>
</table>
