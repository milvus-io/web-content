---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  O HNSW_PRQ combina grafos Hierarchical Navigable Small World (HNSW) com a
  Quantização Residual de Produto (PRQ), oferecendo um método avançado de
  indexação vetorial que permite ajustar com precisão o equilíbrio entre o
  tamanho do índice e a precisão. A PRQ vai além da Quantização de Produto (PQ)
  tradicional, introduzindo uma etapa de quantização residual (RQ) para capturar
  informação adicional, o que resulta em maior precisão ou índices mais
  compactos em comparação com métodos baseados exclusivamente na PQ. No entanto,
  as etapas adicionais podem implicar um maior esforço computacional durante a
  criação do índice e a pesquisa.
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
    </button></h1><p><strong>O HNSW_PRQ</strong> combina grafos Hierarchical Navigable Small World (HNSW) com a Quantização Residual de Produtos (PRQ), oferecendo um método avançado de indexação vetorial que permite ajustar com precisão o equilíbrio entre o tamanho do índice e a precisão. A PRQ vai além da Quantização de Produto (PQ) tradicional, introduzindo uma etapa de quantização residual (RQ) para capturar informação adicional, resultando em maior precisão ou índices mais compactos em comparação com métodos baseados exclusivamente na PQ. No entanto, as etapas adicionais podem levar a uma maior sobrecarga computacional durante a criação do índice e a pesquisa.</p>
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
    </button></h2><p>O HNSW_PRQ combina duas técnicas de indexação: <strong>o HSNW</strong> para uma navegação rápida baseada em grafos e <strong>o PRQ</strong> para uma compressão vetorial eficiente.</p>
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
    </button></h3><p>O HNSW constrói um grafo multicamadas onde cada nó corresponde a um vetor no conjunto de dados. Neste grafo, os nós estão ligados com base na sua semelhança, permitindo uma percorreção rápida pelo espaço de dados. A estrutura hierárquica permite que o algoritmo de pesquisa restrinja os vizinhos candidatos, acelerando significativamente o processo de pesquisa em espaços de alta dimensão.</p>
<p>Para mais informações, consulte <a href="/docs/pt/hnsw.md">HNSW</a>.</p>
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
    </button></h3><p>O PRQ é uma abordagem de compressão de vetores em várias etapas que combina duas técnicas complementares: PQ e RQ. Ao dividir primeiro um vetor de alta dimensão em subvetores mais pequenos (através do PQ) e, em seguida, quantizar qualquer diferença remanescente (através do RQ), o PRQ consegue uma representação compacta, mas precisa, dos dados originais.</p>
<p>A figura seguinte mostra como funciona.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>HNSW PRQ</span>
  
 </span></p>
<ol>
<li><p><strong>Quantização de Produto (PQ)</strong></p>
<p>Nesta fase, o vetor original é dividido em subvetores mais pequenos e cada subvetor é mapeado para o seu centroide mais próximo num livro de códigos aprendido. Este mapeamento reduz significativamente o tamanho dos dados, mas introduz algum erro de arredondamento, uma vez que cada subvetor é aproximado por um único centroide. Para mais detalhes, consulte <a href="/docs/pt/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Quantização Residual (RQ)</strong></p>
<p>Após a fase de PQ, a RQ quantiza o resíduo — a diferença entre o vetor original e a sua aproximação baseada na PQ — utilizando livros de códigos adicionais. Como este resíduo é normalmente muito menor, pode ser codificado com maior precisão sem um grande aumento no espaço de armazenamento.</p>
<p>O parâmetro « <code translate="no">nrq</code> » determina quantas vezes este resíduo é quantizado iterativamente, permitindo-lhe ajustar com precisão o equilíbrio entre a eficiência da compressão e a precisão.</p></li>
<li><p><strong>Representação final da compressão</strong></p>
<p>Assim que o RQ termina de quantizar o resíduo, os códigos inteiros tanto do PQ como do RQ são combinados num único índice comprimido. Ao captar detalhes refinados que o PQ por si só poderia deixar escapar, o RQ melhora a precisão sem causar um aumento significativo no espaço de armazenamento. É esta sinergia entre o PQ e o RQ que define o PRQ.</p></li>
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
    </button></h3><p>Ao combinar o HNSW com o PRQ, <strong>o HNSW_PRQ</strong> mantém a pesquisa rápida baseada em grafos do HNSW, ao mesmo tempo que tira partido da compressão em várias etapas do PRQ. O fluxo de trabalho é o seguinte:</p>
<ol>
<li><p><strong>Compressão de dados:</strong> Cada vetor é primeiro transformado através do PQ numa representação aproximada e, em seguida, os resíduos são quantizados através do RQ para um maior refinamento. O resultado é um conjunto de códigos compactos que representam cada vetor.</p></li>
<li><p><strong>Construção do grafo:</strong> Os vetores comprimidos (incluindo os códigos PQ e RQ) constituem a base para a construção do grafo do HNSW. Como os dados são armazenados de forma compacta, o grafo requer menos memória e a navegação pelo mesmo é acelerada.</p></li>
<li><p><strong>Recuperação de candidatos:</strong> Durante a pesquisa, o HNSW utiliza as representações comprimidas para percorrer o grafo e recuperar um conjunto de candidatos. Isto reduz drasticamente o número de vetores a considerar.</p></li>
<li><p><strong>(Opcional) Aperfeiçoamento dos resultados:</strong> Os resultados iniciais dos candidatos podem ser aperfeiçoados para uma maior precisão, com base nos seguintes parâmetros:</p>
<ul>
<li><p><code translate="no">refine</code>: Controla se esta etapa de refinamento está ativada. Quando definido como « <code translate="no">true</code> », o sistema recalcula as distâncias utilizando representações de maior precisão ou não comprimidas.</p></li>
<li><p><code translate="no">refine_type</code>: Especifica o nível de precisão dos dados utilizados durante o refinamento (por exemplo, SQ6, SQ8, BF16). Uma opção de maior precisão, como « <code translate="no">FP32</code> », pode produzir resultados mais precisos, mas requer mais memória. Esta deve exceder a precisão do conjunto de dados comprimido original definida por « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: Funciona como um fator de ampliação. Por exemplo, se o seu <em>«</em> top <em>k»</em> for 100 e « <code translate="no">refine_k</code> » for 2, o sistema reclassifica os 200 melhores candidatos e devolve os 100 melhores, melhorando a precisão global.</p></li>
</ul></li>
</ol>
<p>Para obter uma lista completa de parâmetros e valores válidos, consulte <a href="/docs/pt/hnsw-prq.md#Index-params">Parâmetros</a> do <a href="/docs/pt/hnsw-prq.md#Index-params">índice</a>.</p>
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
    </button></h2><p>Para criar um índice « <code translate="no">HNSW_PRQ</code> » num campo vetorial no Milvus, utilize o método « <code translate="no">add_index()</code> », especificando « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » e parâmetros adicionais para o índice.</p>
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
<li><p><code translate="no">index_type</code>: O tipo de índice a ser criado. Neste exemplo, defina o valor como « <code translate="no">HNSW_PQ</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vetores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Para mais detalhes, consulte <a href="/docs/pt/metric.md">Tipos</a> de <a href="/docs/pt/metric.md">métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para a criação do índice. Para mais detalhes, consulte <a href="/docs/pt/hnsw-prq.md#Index-building-params">Parâmetros de criação de índices</a>.</p></li>
</ul>
<p>Depois de configurados os parâmetros do índice, pode criar o índice utilizando diretamente o método <code translate="no">create_index()</code> ou passando os parâmetros do índice no método <code translate="no">create_collection</code>. Para mais detalhes, consulte <a href="/docs/pt/create-collection.md">Criar coleção</a>.</p>
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
    </button></h2><p>Assim que o índice estiver criado e as entidades inseridas, pode efetuar pesquisas de similaridade no índice.</p>
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
<li><code translate="no">params</code>: Opções de configuração adicionais para a pesquisa no índice. Para mais detalhes, consulte <a href="/docs/pt/hnsw-prq.md#Index-specific-search-params">«Parâmetros de pesquisa específicos do índice</a>».</li>
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
    </button></h2><p>Esta secção apresenta uma visão geral dos parâmetros utilizados para criar um índice e efetuar pesquisas no índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de criação do índice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte enumera os parâmetros que podem ser configurados no « <code translate="no">params</code> » ao <a href="/docs/pt/hnsw-prq.md#Build-index">criar um índice</a>.</p>
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
     <td><p><code translate="no">M</code></p></td>
     <td><p>Número máximo de ligações (ou arestas) que cada nó pode ter no grafo, incluindo tanto as arestas de saída como as de entrada.
Este parâmetro afeta diretamente tanto a construção do índice como a pesquisa.</p></td>
     <td><p><strong>Tipo</strong>: Número inteiro
 <strong>Intervalo</strong>: [2, 2048]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">30</code> (até 30 arestas de saída e 30 arestas de entrada por nó)</p></td>
     <td><p>Um valor maior de « <code translate="no">M</code> » geralmente conduz a <strong>uma maior precisão</strong>, mas <strong>aumenta a sobrecarga de memória</strong> e <strong>torna mais lentas tanto a construção do índice como a pesquisa</strong>.
Considere aumentar « <code translate="no">M</code> » para conjuntos de dados com elevada dimensionalidade ou quando for crucial obter uma elevada taxa de recuperação.</p>
<p>Considere diminuir o parâmetro ` <code translate="no">M</code> ` quando a utilização de memória e a velocidade de pesquisa forem as principais preocupações.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vizinhos candidatos considerados para ligação durante a construção do índice.
Para cada novo elemento, é avaliado um conjunto maior de candidatos, mas o número máximo de ligações efetivamente estabelecidas continua a ser limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro
 <strong>Intervalo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">360</code></p></td>
     <td><p>Um valor mais elevado de « <code translate="no">efConstruction</code> » resulta normalmente num <strong>índice mais preciso</strong>, uma vez que são exploradas mais ligações potenciais. No entanto, isto também leva a <strong>um tempo de indexação mais longo e a um aumento do consumo de memória</strong> durante a construção.
Considere aumentar « <code translate="no">efConstruction</code> » para melhorar a precisão, especialmente em cenários em que o tempo de indexação é menos crítico.</p>
<p>Considere diminuir o valor de ` <code translate="no">efConstruction</code> ` para acelerar a construção do índice quando houver restrições de recursos.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>O número de subvetores (utilizados para a quantização) em que cada vetor de alta dimensão é dividido durante o processo de quantização.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro
 <strong>Intervalo</strong>: [1, 65536]</p>
<p><strong>Valor predefinido</strong>: Nenhum</p></td>
     <td><p>Um valor mais elevado de <code translate="no">m</code> pode melhorar a precisão, mas também aumenta a complexidade computacional e o consumo de memória.
 <code translate="no">m</code> deve ser um divisor da dimensão do vetor (<em>D</em>) para garantir uma decomposição adequada. Um valor frequentemente recomendado é <em>m = D/2</em>.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>O número de bits utilizados para representar o índice do centroide de cada subvetor na forma comprimida. Determina diretamente o tamanho de cada livro de códigos.
 Cada livro de códigos conterá<sup>2nbits</sup> de centróides. Por exemplo, se <code translate="no">nbits</code> for definido como 8, cada subvetor será representado por um índice de centróide de 8 bits. Isto permite<sup>2⁸</sup> (256) centróides possíveis no livro de códigos para esse subvetor.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro
 <strong>Intervalo</strong>: [1, 24]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">8</code></p></td>
     <td><p>Um valor mais elevado de « <code translate="no">nbits</code> » permite livros de códigos maiores, o que pode conduzir a representações mais precisas dos vetores originais. No entanto, isso também implica a utilização de mais bits para armazenar cada índice, resultando numa menor compressão.
Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Controla o número de subquantizadores residuais utilizados na fase RQ. Um maior número de subquantizadores permite, potencialmente, uma maior compressão, mas pode introduzir uma maior perda de informação.</p></td>
     <td><p><strong>Tipo</strong>: Número inteiro
 <strong>Intervalo</strong>: [1, 16]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">2</code></p></td>
     <td><p>Um valor mais elevado de « <code translate="no">nrq</code> » permite etapas adicionais de subquantização residual, o que pode levar a uma reconstrução mais precisa dos vetores originais. No entanto, isso também implica armazenar e calcular mais subquantizadores, resultando num tamanho de índice maior e numa maior sobrecarga computacional.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Um sinalizador booleano que controla se é aplicada uma etapa de refinamento durante a pesquisa. O refinamento envolve reclassificar os resultados iniciais através do cálculo das distâncias exatas entre o vetor de consulta e os candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Booleano
 <strong>Intervalo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">false</code></p></td>
     <td><p>Defina como <code translate="no">true</code> se for essencial uma elevada precisão e se puder tolerar tempos de pesquisa ligeiramente mais lentos. Utilize <code translate="no">false</code> se a velocidade for uma prioridade e se for aceitável um pequeno compromisso em termos de precisão.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determina a precisão dos dados utilizados durante o processo de refinamento.
Esta precisão deve ser superior à dos vetores comprimidos (conforme definido pelos parâmetros <code translate="no">m</code> e <code translate="no">nbits</code> ).</p></td>
     <td><p><strong>Tipo</strong>: String
 <strong>Intervalo</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Valor predefinido</strong>: Nenhum</p></td>
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/hnsw-prq.md#Search-on-index">efetuar uma pesquisa no índice</a>.</p>
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
     <td><p>Controla a amplitude da pesquisa durante a recuperação do vizinho mais próximo. Determina quantos nós são visitados e avaliados como potenciais vizinhos mais próximos. 
 Este parâmetro afeta apenas o processo de pesquisa e aplica-se exclusivamente à camada inferior do grafo.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro
 <strong>Intervalo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor predefinido</strong>: <em>limit</em> (TopK vizinhos mais próximos a devolver)</p></td>
     <td><p>Um valor maior de « <code translate="no">ef</code> » geralmente conduz a <strong>uma maior precisão de pesquisa</strong>, uma vez que são considerados mais vizinhos potenciais. No entanto, isto também <strong>aumenta o tempo de pesquisa</strong>.
Considere aumentar « <code translate="no">ef</code> » quando for essencial alcançar uma elevada taxa de recuperação e a velocidade de pesquisa for menos importante.</p>
<p>Considere diminuir o ` <code translate="no">ef</code> ` para dar prioridade a pesquisas mais rápidas, especialmente em cenários em que uma ligeira redução na precisão é aceitável.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>O fator de ampliação que controla quantos candidatos adicionais são analisados durante a fase de refinamento (reclassificação), em relação aos primeiros K resultados solicitados.</p></td>
     <td><p><strong>Tipo</strong>: Float
 <strong>Intervalo</strong>: [1, <em>float_max</em>)</p>
<p><strong>Valor predefinido</strong>: 1</p></td>
     <td><p>Valores mais elevados de « <code translate="no">refine_k</code> » podem melhorar a recuperação e a precisão, mas também aumentam o tempo de pesquisa e o consumo de recursos. Um valor de 1 significa que o processo de refinamento considera apenas os primeiros K resultados.</p></td>
   </tr>
</table>
