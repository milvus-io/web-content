---
id: hnsw.md
title: HNSW
summary: >-
  O índice HNSW é um algoritmo de indexação baseado em grafos que pode melhorar
  o desempenho na pesquisa de vectores flutuantes de elevada dimensão. Oferece
  uma excelente precisão de pesquisa e baixa latência, embora exija um elevado
  consumo de memória para manter a sua estrutura gráfica hierárquica.
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
    </button></h1><p>O índice <strong>HNSW</strong> é um algoritmo de indexação <strong>baseado em grafos</strong> que pode melhorar o desempenho na pesquisa de vectores flutuantes de elevada dimensão. Oferece <strong>uma excelente</strong> precisão de pesquisa e <strong>baixa</strong> latência, embora exija um <strong>elevado</strong> consumo de memória para manter a sua estrutura hierárquica de grafos.</p>
<h2 id="Overview" class="common-anchor-header">Síntese<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O algoritmo Hierarchical Navigable Small World (HNSW) constrói um gráfico com várias camadas, como um mapa com diferentes níveis de zoom. A <strong>camada inferior</strong> contém todos os pontos de dados, enquanto as <strong>camadas superiores</strong> consistem num subconjunto de pontos de dados amostrados a partir da camada inferior.</p>
<p>Nesta hierarquia, cada camada contém nós que representam pontos de dados, ligados por arestas que indicam a sua proximidade. As camadas superiores fornecem saltos de longa distância para se aproximarem rapidamente do alvo, enquanto as camadas inferiores permitem uma pesquisa fina para obter os resultados mais exactos.</p>
<p>Eis como funciona:</p>
<ol>
<li><p><strong>Ponto de entrada</strong>: A pesquisa começa num ponto de entrada fixo na camada superior, que é um nó pré-determinado no gráfico.</p></li>
<li><p><strong>Pesquisa gulosa</strong>: O algoritmo move-se avidamente para o vizinho mais próximo na camada atual até não conseguir aproximar-se mais do vetor de consulta. As camadas superiores servem um objetivo de navegação, actuando como um filtro grosseiro para localizar potenciais pontos de entrada para a pesquisa mais fina nos níveis inferiores.</p></li>
<li><p><strong>Camada descendente</strong>: Quando é atingido um <strong>mínimo local</strong> na camada atual, o algoritmo salta para a camada inferior, utilizando uma ligação pré-estabelecida, e repete a pesquisa gulosa.</p></li>
<li><p><strong>Refinamento</strong><strong>final</strong>: Este processo continua até atingir a camada inferior, onde um passo final de refinamento identifica os vizinhos mais próximos.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/HNSW.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>O desempenho do HNSW depende de vários parâmetros chave que controlam tanto a estrutura do grafo como o comportamento da pesquisa. Estes incluem:</p>
<ul>
<li><p><code translate="no">M</code>: O número máximo de arestas ou ligações que cada nó pode ter no gráfico em cada nível da hierarquia. Um <code translate="no">M</code> mais elevado resulta num gráfico mais denso e aumenta a recordação e a precisão, uma vez que a pesquisa tem mais caminhos para explorar, o que também consome mais memória e torna o tempo de inserção mais lento devido às ligações adicionais. Como se pode ver na imagem acima, <strong>M = 5</strong> indica que cada nó do gráfico HNSW está diretamente ligado a um máximo de 5 outros nós. Isto cria uma estrutura de grafo moderadamente densa em que os nós têm vários caminhos para chegar a outros nós.</p></li>
<li><p><code translate="no">efConstruction</code>: O número de candidatos considerados durante a construção do índice. Um <code translate="no">efConstruction</code> mais elevado resulta geralmente num gráfico de melhor qualidade, mas requer mais tempo para ser construído.</p></li>
<li><p><code translate="no">ef</code>: O número de vizinhos avaliados durante uma pesquisa. Aumentar <code translate="no">ef</code> melhora a probabilidade de encontrar os vizinhos mais próximos, mas torna o processo de pesquisa mais lento.</p></li>
</ul>
<p>Para obter detalhes sobre como ajustar estas definições de acordo com as suas necessidades, consulte <a href="/docs/pt/hnsw.md#Index-params">Parâmetros de índice</a>.</p>
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
    </button></h2><p>Para construir um índice <code translate="no">HNSW</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice.</p>
<ul>
<li><p><code translate="no">M</code>: Número máximo de vizinhos a que cada nó se pode ligar.</p></li>
<li><p><code translate="no">efConstruction</code>: Número de vizinhos candidatos considerados para ligação durante a construção do índice.</p></li>
</ul>
<p>Para saber mais sobre os parâmetros de construção disponíveis para o índice <code translate="no">HNSW</code>, consulte <a href="/docs/pt/hnsw.md#Index-building-params">Parâmetros de construção do índice</a>.</p></li>
</ul>
<p>Assim que os parâmetros do índice estiverem configurados, pode criar o índice utilizando diretamente o método <code translate="no">create_index()</code> ou passando os parâmetros do índice no método <code translate="no">create_collection</code>. Para obter detalhes, consulte <a href="/docs/pt/create-collection.md">Criar coleção</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pesquisar no índice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de o índice ser criado e as entidades serem inseridas, pode efetuar pesquisas de semelhança no índice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice.</p>
<ul>
<li><code translate="no">ef</code>: Número de vizinhos a considerar durante uma pesquisa.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">HNSW</code>, consulte <a href="/docs/pt/hnsw.md#Index-specific-search-params">Parâmetros de pesquisa específicos do índice</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parâmetros de índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção fornece uma visão geral dos parâmetros utilizados para criar um índice e efetuar pesquisas no índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/hnsw.md#Build-index">construir um índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de afinação</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Número máximo de ligações (ou arestas) que cada nó pode ter no gráfico, incluindo as arestas de saída e de entrada. Este parâmetro afecta diretamente tanto a construção como a pesquisa do índice.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Range</strong>: [2, 2048]</p><p><strong>Valor predefinido</strong>: <code translate="no">30</code> (até 30 arestas de saída e 30 arestas de entrada por nó)</p></td>
     <td><p>Um <code translate="no">M</code> maior geralmente leva a uma <strong>maior precisão</strong>, mas <strong>aumenta a sobrecarga de memória</strong> e <strong>torna mais lenta a construção do índice e a pesquisa</strong>. Considere o aumento de <code translate="no">M</code> para conjuntos de dados com elevada dimensionalidade ou quando é crucial uma elevada recuperação.</p><p>Considere diminuir <code translate="no">M</code> quando a utilização da memória e a velocidade de pesquisa forem as principais preocupações.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vizinhos candidatos considerados para conexão durante a construção do índice. Um conjunto maior de candidatos é avaliado para cada novo elemento, mas o número máximo de conexões realmente estabelecidas ainda é limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Range</strong>: [1, <em>int_max</em>]</p><p><strong>Valor predefinido</strong>: <code translate="no">360</code></p></td>
     <td><p>Um valor mais elevado em <code translate="no">efConstruction</code> resulta normalmente num <strong>índice mais preciso</strong>, uma vez que são exploradas mais ligações potenciais. No entanto, isto também leva a um <strong>tempo de indexação mais longo e a uma maior utilização de memória</strong> durante a construção. Considere aumentar <code translate="no">efConstruction</code> para melhorar a precisão, especialmente em cenários em que o tempo de indexação é menos crítico.</p><p>Considere diminuir <code translate="no">efConstruction</code> para acelerar a construção do índice quando as restrições de recursos são uma preocupação.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/hnsw.md#Search-on-index">pesquisar no índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controla a amplitude da pesquisa durante a recuperação do vizinho mais próximo. Ele determina quantos nós são visitados e avaliados como possíveis vizinhos mais próximos.  Este parâmetro afecta apenas o processo de pesquisa e aplica-se exclusivamente à camada inferior do gráfico.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defeito</strong>: <em>limite</em> (TopK vizinhos mais próximos a devolver)</p></td>
     <td><p>Um <code translate="no">ef</code> maior leva geralmente a uma <strong>maior precisão de pesquisa</strong>, uma vez que são considerados mais vizinhos potenciais. No entanto, isto também <strong>aumenta o tempo de pesquisa</strong>. Considere aumentar <code translate="no">ef</code> quando a obtenção de uma elevada recuperação é crítica e a velocidade de pesquisa é menos preocupante.</p><p>Considere diminuir <code translate="no">ef</code> para dar prioridade a pesquisas mais rápidas, especialmente em cenários em que uma ligeira redução na precisão é aceitável.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [K, 10K].</p></td>
   </tr>
</table>
