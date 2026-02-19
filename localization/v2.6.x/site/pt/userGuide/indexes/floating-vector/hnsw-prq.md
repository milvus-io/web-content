---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  O HNSW_PRQ aproveita os gráficos Hierarchical Navigable Small World (HNSW) com
  Product Residual Quantization (PRQ), oferecendo um método avançado de
  indexação de vectores que permite ajustar a relação entre o tamanho do índice
  e a precisão. A PRQ vai além da Quantização de Produto (PQ) tradicional,
  introduzindo uma etapa de quantização residual (RQ) para capturar informações
  adicionais, resultando em maior precisão ou índices mais compactos em
  comparação com métodos puramente baseados em PQ. No entanto, as etapas
  adicionais podem levar a um maior custo computacional durante a construção e
  pesquisa do índice.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>O HNSW_PRQ</strong> aproveita os gráficos Hierarchical Navigable Small World (HNSW) com Product Residual Quantization (PRQ), oferecendo um método avançado de indexação de vectores que permite ajustar a relação entre o tamanho do índice e a precisão. A PRQ vai além da Quantização de Produto (PQ) tradicional, introduzindo uma etapa de quantização residual (RQ) para capturar informações adicionais, resultando em maior precisão ou índices mais compactos em comparação com métodos puramente baseados em PQ. No entanto, os passos adicionais podem levar a um maior custo computacional durante a construção e pesquisa do índice.</p>
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
    </button></h2><p>O HNSW_PRQ combina duas técnicas de indexação: <strong>HSNW</strong> para uma navegação rápida baseada em grafos e <strong>PRQ</strong> para uma compressão vetorial eficiente.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>O HNSW constrói um grafo de várias camadas em que cada nó corresponde a um vetor no conjunto de dados. Neste gráfico, os nós são ligados com base na sua semelhança, permitindo uma rápida deslocação através do espaço de dados. A estrutura hierárquica permite que o algoritmo de pesquisa reduza os vizinhos candidatos, acelerando significativamente o processo de pesquisa em espaços de elevada dimensão.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/hnsw.md">HNSW</a>.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ é uma abordagem de compressão vetorial em várias fases que combina duas técnicas complementares: PQ e RQ. Ao dividir primeiro um vetor de elevada dimensão em sub-vectores mais pequenos (através de PQ) e depois quantizar qualquer diferença restante (através de RQ), o PRQ consegue uma representação compacta mas precisa dos dados originais.</p>
<p>A figura seguinte mostra o seu funcionamento.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" />
   </span> <span class="img-wrapper"> <span>Hnsw Prq</span> </span></p>
<ol>
<li><p><strong>Quantização do produto (PQ)</strong></p>
<p>Nesta fase, o vetor original é dividido em sub-vectores mais pequenos, e cada sub-vetor é mapeado para o seu centróide mais próximo num livro de códigos aprendido. Este mapeamento reduz significativamente o tamanho dos dados, mas introduz algum erro de arredondamento, uma vez que cada sub-vetor é aproximado por um único centróide. Para mais pormenores, consulte <a href="/docs/pt/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Quantização residual (RQ)</strong></p>
<p>Após a fase PQ, a RQ quantiza o resíduo - a diferença entre o vetor original e a sua aproximação baseada na PQ - utilizando livros de códigos adicionais. Como este resíduo é tipicamente muito mais pequeno, pode ser codificado com mais precisão sem um grande aumento no armazenamento.</p>
<p>O parâmetro <code translate="no">nrq</code> determina o número de vezes que este resíduo é quantizado iterativamente, permitindo-lhe ajustar o equilíbrio entre a eficiência e a precisão da compressão.</p></li>
<li><p><strong>Representação de compressão final</strong></p>
<p>Quando o RQ termina a quantização do resíduo, os códigos inteiros do PQ e do RQ são combinados num único índice comprimido. Ao capturar detalhes refinados que o PQ sozinho poderia perder, o RQ melhora a precisão sem causar um aumento significativo no armazenamento. Esta sinergia entre PQ e RQ é o que define PRQ.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Ao combinar o HNSW com o PRQ, <strong>o HNSW_PRQ</strong> mantém a pesquisa rápida baseada em gráficos do HNSW, aproveitando a compactação em vários estágios do PRQ. O fluxo de trabalho tem o seguinte aspeto:</p>
<ol>
<li><p><strong>Compressão de dados:</strong> Cada vetor é primeiro transformado através de PQ para uma representação grosseira e, em seguida, os resíduos são quantizados através de RQ para um maior refinamento. O resultado é um conjunto de códigos compactos que representam cada vetor.</p></li>
<li><p><strong>Construção de gráficos:</strong> Os vectores comprimidos (incluindo os códigos PQ e RQ) formam a base para a construção do gráfico HNSW. Como os dados são armazenados numa forma compacta, o gráfico requer menos memória e a navegação através dele é acelerada.</p></li>
<li><p><strong>Recuperação de candidatos:</strong> Durante a pesquisa, o HNSW usa as representações compactadas para percorrer o gráfico e recuperar um conjunto de candidatos. Isto reduz drasticamente o número de vectores que precisam de ser considerados.</p></li>
<li><p><strong>(Opcional) Refinamento de resultados:</strong> Os resultados iniciais dos candidatos podem ser refinados para uma melhor precisão, com base nos seguintes parâmetros:</p>
<ul>
<li><p><code translate="no">refine</code>: Controla se esta etapa de refinamento está activada. Quando definido para <code translate="no">true</code>, o sistema recalcula as distâncias utilizando representações de maior precisão ou não comprimidas.</p></li>
<li><p><code translate="no">refine_type</code>: Especifica o nível de precisão dos dados utilizados durante o refinamento (por exemplo, SQ6, SQ8, BF16). Uma escolha de maior precisão, como <code translate="no">FP32</code>, pode produzir resultados mais exactos, mas requer mais memória. Isto deve exceder a precisão do conjunto de dados comprimido original em <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: Actua como um fator de ampliação. Por exemplo, se o seu top <em>k</em> for 100 e <code translate="no">refine_k</code> for 2, o sistema volta a classificar os 200 principais candidatos e devolve os 100 melhores, aumentando a precisão geral.</p></li>
</ul></li>
</ol>
<p>Para obter uma lista completa de parâmetros e valores válidos, consulte <a href="/docs/pt/hnsw-prq.md#Index-params">Parâmetros do índice</a>.</p>
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
    </button></h2><p>Para construir um índice <code translate="no">HNSW_PRQ</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice. Para obter detalhes, consulte <a href="/docs/pt/hnsw-prq.md#Index-building-params">Parâmetros de construção de índice</a>.</p></li>
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
    </button></h2><p>Depois de o índice ter sido criado e as entidades terem sido inseridas, pode efetuar pesquisas de similaridade no índice.</p>
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
<li><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice. Para obter detalhes, consulte <a href="/docs/pt/hnsw-prq.md#Index-specific-search-params">Parâmetros de pesquisa específicos do índice</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção de índice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/hnsw-prq.md#Build-index">construir um índice</a>.</p>
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
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>O número de sub-vectores (utilizados para quantização) para dividir cada vetor de alta dimensão durante o processo de quantização.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro <strong>Intervalo</strong>: [1, 65536]</p>
<p><strong>Valor predefinido</strong>: Nenhum</p></td>
     <td><p>Um valor <code translate="no">m</code> mais elevado pode melhorar a precisão, mas também aumenta a complexidade computacional e a utilização de memória. <code translate="no">m</code> tem de ser um divisor da dimensão do vetor<em>(D</em>) para garantir uma decomposição adequada. Um valor geralmente recomendado é <em>m = D/2</em>.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>O número de bits utilizados para representar o índice do centróide de cada sub-vetor na forma comprimida. Determina diretamente o tamanho de cada livro de códigos. Cada livro de códigos conterá centroides de <sup>2nbits</sup>. Por exemplo, se <code translate="no">nbits</code> estiver definido para 8, cada sub-vetor será representado por um índice de centróide de 8 bits. Isto permite<sup>28</sup> (256) centróides possíveis no livro de códigos para esse sub-vetor.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 24]</p>
<p><strong>Valor por defeito</strong>: <code translate="no">8</code></p></td>
     <td><p>Um valor <code translate="no">nbits</code> mais alto permite livros de códigos maiores, potencialmente levando a representações mais precisas dos vectores originais. No entanto, também significa utilizar mais bits para armazenar cada índice, resultando numa menor compressão. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Controla quantos subquantizadores residuais são usados no estágio RQ. Um maior número de subquantizadores pode potencialmente alcançar uma maior compressão, mas pode introduzir uma maior perda de informação.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 16]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">2</code></p></td>
     <td><p>Um valor mais elevado em <code translate="no">nrq</code> permite passos adicionais de subquantização residual, levando potencialmente a uma reconstrução mais precisa dos vectores originais. No entanto, também significa armazenar e computar mais subquantizadores, resultando num tamanho de índice maior e numa maior sobrecarga computacional.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Um sinalizador booleano que controla se um passo de refinamento é aplicado durante a pesquisa. O refinamento envolve a reordenação dos resultados iniciais através do cálculo de distâncias exactas entre o vetor de consulta e os candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Boolean <strong>Range</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/hnsw-prq.md#Search-on-index">pesquisar no índice</a>.</p>
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
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>O fator de ampliação que controla quantos candidatos extra são examinados durante a fase de refinamento (reranking), relativamente aos K resultados principais solicitados.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Intervalo</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valor por defeito</strong>: 1</p></td>
     <td><p>Valores mais elevados de <code translate="no">refine_k</code> podem melhorar a recuperação e a precisão, mas também aumentam o tempo de pesquisa e a utilização de recursos. Um valor de 1 significa que o processo de refinamento considera apenas os K resultados principais iniciais.</p></td>
   </tr>
</table>
