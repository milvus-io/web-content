---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  O HNSW_PQ aproveita os grafos Hierarchical Navigable Small World (HNSW) com
  Product Quantization (PQ), criando um método avançado de indexação vetorial
  que oferece um compromisso controlável entre tamanho e precisão. Em comparação
  com o HNSW_SQ, este tipo de índice proporciona uma taxa de recuperação mais
  elevada com o mesmo nível de compressão, embora com uma velocidade de
  processamento de consultas inferior e um tempo de construção do índice mais
  longo.
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>O HNSW_PQ</strong> aproveita os gráficos Hierarchical Navigable Small World (HNSW) com Product Quantization (PQ), criando um método avançado de indexação de vectores que oferece um compromisso controlável entre tamanho e precisão. Em comparação com o <a href="/docs/pt/hnsw-sq.md">HNSW_SQ</a>, este tipo de índice proporciona uma taxa de recuperação mais elevada com o mesmo nível de compressão, embora com uma velocidade de processamento de consultas inferior e um tempo de construção do índice mais longo.</p>
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
    </button></h2><p>O HNSW_PQ combina duas técnicas de indexação: <strong>HNSW</strong> para uma navegação rápida baseada em grafos e <strong>PQ</strong> para uma compressão vetorial eficiente.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>O HNSW constrói um grafo de várias camadas em que cada nó corresponde a um vetor no conjunto de dados. Neste gráfico, os nós são ligados com base na sua semelhança, permitindo uma rápida deslocação através do espaço de dados. A estrutura hierárquica permite que o algoritmo de pesquisa reduza os vizinhos candidatos, acelerando significativamente o processo de pesquisa em espaços de elevada dimensão.</p>
<p>Para mais informações, consulte <a href="/docs/pt/hnsw.md">HNSW</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>PQ é uma técnica de compressão de vectores que decompõe vectores de elevada dimensão em sub-vectores mais pequenos, que são depois quantizados e comprimidos. A compressão reduz drasticamente os requisitos de memória e acelera os cálculos de distância.</p>
<p>Para mais informações, consulte <a href="/docs/pt/ivf-pq.md#PQ">IVF_PQ</a>.</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ</h3><p>O HNSW_PQ combina os pontos fortes do HNSW e do PQ para permitir uma pesquisa eficiente do vizinho mais próximo aproximado. Utiliza PQ para comprimir os dados (reduzindo assim a utilização de memória) e, em seguida, constrói um gráfico HNSW nestes vectores comprimidos para permitir uma rápida recuperação de candidatos. Durante a pesquisa, o algoritmo pode, opcionalmente, refinar os resultados dos candidatos utilizando dados de maior precisão para melhorar a exatidão. Eis como funciona o processo:</p>
<ol>
<li><p><strong>Compressão de dados</strong>: O PQ divide cada vetor em vários sub-vectores e quantifica-os utilizando um livro de códigos de centróides, controlado por parâmetros como <code translate="no">m</code> (contagem de sub-vectores) e <code translate="no">nbits</code> (bits por sub-vetor).</p></li>
<li><p><strong>Construção de gráficos</strong>: Os vectores comprimidos são então utilizados para construir um gráfico HNSW. Como os vectores são armazenados de forma comprimida, o gráfico resultante é normalmente mais pequeno, requer menos memória e pode ser percorrido mais rapidamente - acelerando significativamente a etapa de recuperação de candidatos.</p></li>
<li><p><strong>Recuperação de candidatos</strong>: Quando uma consulta é executada, o algoritmo utiliza os dados comprimidos no gráfico HNSW para identificar eficientemente um conjunto de vizinhos candidatos. Esta pesquisa baseada no gráfico reduz drasticamente o número de vectores que devem ser considerados, melhorando a latência da consulta em comparação com as pesquisas de força bruta.</p></li>
<li><p><strong>(Opcional) Refinamento de resultados</strong>: Os resultados candidatos iniciais podem ser refinados para melhor precisão, com base nos seguintes parâmetros:</p>
<ul>
<li><p><code translate="no">refine</code>: Controla se esta etapa de refinamento está activada. Quando definido para <code translate="no">true</code>, o sistema recalcula as distâncias utilizando representações de maior precisão ou não comprimidas.</p></li>
<li><p><code translate="no">refine_type</code>: Especifica o nível de precisão dos dados utilizados durante o refinamento (por exemplo, SQ6, SQ8, BF16). Uma escolha de maior precisão, como <code translate="no">FP32</code>, pode produzir resultados mais exactos, mas requer mais memória. Isto deve exceder a precisão do conjunto de dados comprimido original em <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Actua como um fator de ampliação. Por exemplo, se o seu top <em>k</em> for 100 e <code translate="no">refine_k</code> for 2, o sistema volta a classificar os 200 principais candidatos e devolve os 100 melhores, aumentando a precisão geral.</p></li>
</ul></li>
</ol>
<p>Para obter uma lista completa de parâmetros e valores válidos, consulte <a href="/docs/pt/hnsw-sq.md#Index-params">Parâmetros do índice</a>.</p>
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
    </button></h2><p>Para construir um índice <code translate="no">HNSW_PQ</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice. Para obter detalhes, consulte <a href="/docs/pt/hnsw-pq.md#Index-building-params">Parâmetros de construção de índice</a>.</p></li>
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
    </button></h2><p>Depois de o índice ser construído e as entidades serem inseridas, pode efetuar pesquisas de semelhança no índice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice. Para obter detalhes, consulte <a href="/docs/pt/hnsw-pq.md#Index-specific-search-params">Parâmetros de pesquisa específicos do índice</a>.</li>
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
    </button></h2><p>Esta secção fornece uma visão geral dos parâmetros utilizados para construir um índice e executar pesquisas no índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção de índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/hnsw-pq.md#Build-index">construir um índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de afinação</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Número máximo de ligações (ou arestas) que cada nó pode ter no gráfico, incluindo as arestas de saída e de entrada. Este parâmetro afecta diretamente a construção e a pesquisa do índice.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Range</strong>: [2, 2048]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">30</code> (até 30 arestas de saída e 30 arestas de entrada por nó)</p></td>
     <td><p>Um <code translate="no">M</code> maior geralmente leva a uma <strong>maior precisão</strong>, mas <strong>aumenta a sobrecarga de memória</strong> e <strong>torna mais lenta a construção do índice e a pesquisa</strong>. Considere aumentar o <code translate="no">M</code> para conjuntos de dados com elevada dimensionalidade ou quando é crucial uma elevada recuperação.</p>
<p>Considere diminuir <code translate="no">M</code> quando a utilização da memória e a velocidade de pesquisa forem as principais preocupações.</p>
<p>Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vizinhos candidatos considerados para conexão durante a construção do índice. Um conjunto maior de candidatos é avaliado para cada novo elemento, mas o número máximo de conexões realmente estabelecidas ainda é limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">360</code></p></td>
     <td><p>Um valor mais elevado em <code translate="no">efConstruction</code> resulta normalmente num <strong>índice mais preciso</strong>, uma vez que são exploradas mais ligações potenciais. No entanto, isto também leva a um <strong>tempo de indexação mais longo e a uma maior utilização de memória</strong> durante a construção. Considere aumentar <code translate="no">efConstruction</code> para melhorar a precisão, especialmente em cenários em que o tempo de indexação é menos crítico.</p>
<p>Considere diminuir <code translate="no">efConstruction</code> para acelerar a construção do índice quando as restrições de recursos são uma preocupação.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>O número de sub-vectores (utilizados para quantização) para dividir cada vetor de alta dimensão durante o processo de quantização.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 65536]</p>
<p><strong>Valor predefinido</strong>: Nenhum</p></td>
     <td><p>Um valor <code translate="no">m</code> mais elevado pode melhorar a precisão, mas também aumenta a complexidade computacional e a utilização de memória. <code translate="no">m</code> deve ser um divisor da dimensão do vetor<em>(D</em>) para garantir uma decomposição adequada. Um valor geralmente recomendado é <em>m = D/2</em>.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>O número de bits utilizados para representar o índice do centróide de cada sub-vetor na forma comprimida. Ele determina diretamente o tamanho de cada livro de códigos. Cada livro de códigos conterá $2^{\textit{nbits}}$ centroides. Por exemplo, se <code translate="no">nbits</code> estiver definido para 8, cada sub-vetor será representado por um índice de centróide de 8 bits. Isto permite $2^8$ (256) centróides possíveis no livro de códigos para esse sub-vetor.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 64]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">8</code></p></td>
     <td><p>Um valor <code translate="no">nbits</code> mais alto permite livros de códigos maiores, potencialmente levando a representações mais precisas dos vectores originais. No entanto, também significa utilizar mais bits para armazenar cada índice, resultando numa menor compressão. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Um sinalizador booleano que controla se uma etapa de refinamento é aplicada durante a pesquisa. O refinamento envolve a reordenação dos resultados iniciais através do cálculo de distâncias exactas entre o vetor de consulta e os candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Booleano <strong>Intervalo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">false</code></p></td>
     <td><p>Defina como <code translate="no">true</code> se for essencial uma precisão elevada e puder tolerar tempos de pesquisa ligeiramente mais lentos. Utilize <code translate="no">false</code> se a velocidade for uma prioridade e for aceitável um pequeno compromisso na precisão.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determina a precisão dos dados utilizados durante o processo de refinamento. Esta precisão tem de ser superior à dos vectores comprimidos (tal como definido pelos parâmetros <code translate="no">m</code> e <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Tipo</strong>: String <strong>Intervalo</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Valor por defeito</strong>: Nenhum</p></td>
     <td><p>Utilize <code translate="no">FP32</code> para obter a máxima precisão com um custo de memória mais elevado, ou <code translate="no">SQ6</code>/<code translate="no">SQ8</code> para uma melhor compressão. <code translate="no">BF16</code> e <code translate="no">FP16</code> oferecem uma alternativa equilibrada.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/hnsw-pq.md#Search-on-index">pesquisar no índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Controla a amplitude da pesquisa durante a recuperação do vizinho mais próximo. Ele determina quantos nós são visitados e avaliados como possíveis vizinhos mais próximos. 
 Este parâmetro afecta apenas o processo de pesquisa e aplica-se exclusivamente à camada inferior do gráfico.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor por defeito</strong>: <em>limite</em> (TopK vizinhos mais próximos a devolver)</p></td>
     <td><p>Um <code translate="no">ef</code> maior conduz geralmente a uma <strong>maior precisão de pesquisa</strong>, uma vez que são considerados mais vizinhos potenciais. Considere aumentar <code translate="no">ef</code> quando a obtenção de uma alta recuperação é crítica e a velocidade de <strong>pesquisa</strong> é menos preocupante.</p>
<p>Considere diminuir <code translate="no">ef</code> para dar prioridade a pesquisas mais rápidas, especialmente em cenários em que uma ligeira redução na precisão é aceitável.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>O fator de ampliação que controla quantos candidatos extra são examinados durante a fase de refinamento (reranking), relativamente aos K resultados principais solicitados.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Intervalo</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valor por defeito</strong>: 1</p></td>
     <td><p>Valores mais elevados de <code translate="no">refine_k</code> podem melhorar a recuperação e a precisão, mas também aumentam o tempo de pesquisa e a utilização de recursos. Um valor de 1 significa que o processo de refinamento considera apenas os K resultados principais iniciais.</p></td>
   </tr>
</table>
