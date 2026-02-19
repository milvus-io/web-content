---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  O HNSW_SQ combina grafos Hierarchical Navigable Small World (HNSW) com Scalar
  Quantization (SQ), criando um método avançado de indexação vetorial que
  oferece um compromisso controlável entre tamanho e precisão. Em comparação com
  o HNSW padrão, este tipo de índice mantém uma elevada velocidade de
  processamento de consultas, embora introduza um ligeiro aumento no tempo de
  construção do índice.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>O HNSW_SQ</strong> combina gráficos Hierarchical Navigable Small World (HNSW) com Scalar Quantization (SQ), criando um método avançado de indexação vetorial que oferece um compromisso controlável entre tamanho e precisão. Em comparação com o <a href="/docs/pt/hnsw.md">HNSW</a> padrão, este tipo de índice mantém uma elevada velocidade de processamento de consultas, embora introduza um ligeiro aumento no tempo de construção do índice.</p>
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
    </button></h2><p>O HNSW_SQ combina duas técnicas de indexação: <strong>HNSW</strong> para uma navegação rápida baseada em grafos e <strong>SQ</strong> para uma compressão vetorial eficiente.</p>
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
    </button></h3><p>O HNSW constrói um gráfico de várias camadas em que cada nó corresponde a um vetor no conjunto de dados. Neste gráfico, os nós são ligados com base na sua semelhança, permitindo uma rápida deslocação através do espaço de dados. A estrutura hierárquica permite que o algoritmo de pesquisa reduza os vizinhos candidatos, acelerando significativamente o processo de pesquisa em espaços de elevada dimensão.</p>
<p>Para mais informações, consulte <a href="/docs/pt/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ é um método de compressão de vectores, representando-os com menos bits. Por exemplo:</p>
<ul>
<li><p><strong>SQ8</strong> usa 8 bits, mapeando valores em 256 níveis.  Para mais informações, consulte <a href="/docs/pt/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> utiliza 6 bits para representar cada valor de vírgula flutuante, resultando em 64 níveis discretos.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>Esta redução na precisão diminui drasticamente o espaço de memória e acelera o cálculo, mantendo a estrutura essencial dos dados.</p>
<h3 id="SQ4U--Milvus-268+" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U--Milvus-268+" class="anchor-icon" translate="no">
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
    </button></h3><p>Para cenários que exigem uma velocidade de consulta extrema e uma utilização mínima de memória, Milvus introduz <code translate="no">SQ4U</code>, uma Quantização Escalar Uniforme de 4 bits. Esta é uma forma agressiva de quantização escalar que comprime o valor de ponto flutuante de cada dimensão num inteiro sem sinal <strong>de 4 bits</strong>.</p>
<p>O "U" em SQ4U significa Uniforme. Ao contrário da Quantização escalar não uniforme, que normalmente calcula os valores mínimo e máximo independentemente para cada dimensão (Quantização por dimensão), o SQ4U aplica uma estratégia <strong>de Quantização uniforme global</strong>:</p>
<ol>
<li><p><strong>Estatísticas Globais</strong>: O sistema calcula um <strong>único</strong> valor mínimo <code translate="no">vmin</code> e um <strong>único</strong> intervalo de valores <code translate="no">vdiff</code> que se aplica a <strong>todas as dimensões</strong> do vetor (ou a todo o segmento do vetor).</p></li>
<li><p><strong>Mapeamento uniforme</strong>: O intervalo de valores globais é dividido em 16 intervalos iguais. Cada valor de vírgula flutuante no vetor, independentemente da dimensão a que pertence, é mapeado para um inteiro de 4 bits (0-15) utilizando estes parâmetros partilhados.</p></li>
</ol>
<p><strong>Vantagens de desempenho:</strong></p>
<ul>
<li><p><strong>Rácio de compressão de 8x:</strong> Reduz o tamanho em 8x em comparação com <code translate="no">FP32</code> e 2x em comparação com <code translate="no">SQ8</code>, diminuindo significativamente a pressão da largura de banda da memória - frequentemente o gargalo na pesquisa de vetores.</p></li>
<li><p><strong>Otimização SIMD:</strong> A estrutura compacta permite que as CPUs modernas (AVX2/AVX-512) processem mais dimensões por ciclo. Crucialmente, o uso de parâmetros globais elimina a necessidade de carregar valores variáveis de escala/offset durante o cálculo da distância, mantendo o pipeline de instruções totalmente saturado.</p></li>
<li><p><strong>Eficiência da cache:</strong> Tamanhos menores de vetor significam que mais dados cabem no cache da CPU, reduzindo a latência causada pelo acesso à memória.</p></li>
</ul>
<div class="alert note">
<p>Devido à partilha global de parâmetros, o SQ4U tem um melhor desempenho em dados normalizados ou conjuntos de dados com distribuições de valores consistentes entre dimensões.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>O HNSW_SQ combina os pontos fortes do HNSW e do SQ para permitir uma pesquisa eficiente do vizinho mais próximo aproximado. Veja como o processo funciona:</p>
<ol>
<li><p><strong>Compressão de dados:</strong> O SQ comprime os vectores utilizando o <code translate="no">sq_type</code> (por exemplo, SQ6 ou SQ8), o que reduz a utilização de memória. Esta compressão pode diminuir a precisão, mas permite que o sistema lide com conjuntos de dados maiores.</p></li>
<li><p><strong>Construção de gráficos:</strong> Os vectores comprimidos são utilizados para construir um gráfico HNSW. Como os dados são comprimidos, o gráfico resultante é mais pequeno e mais rápido de pesquisar.</p></li>
<li><p><strong>Recuperação de candidatos:</strong> Quando é fornecido um vetor de consulta, o algoritmo utiliza os dados comprimidos para identificar rapidamente um conjunto de vizinhos candidatos a partir do gráfico HNSW.</p></li>
<li><p><strong>(Opcional) Refinamento de resultados:</strong> Os resultados candidatos iniciais podem ser refinados para uma melhor precisão, com base nos seguintes parâmetros:</p>
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
    </button></h2><p>Para construir um índice <code translate="no">HNSW_SQ</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice. Para obter detalhes, consulte <a href="/docs/pt/hnsw-sq.md#Index-building-params">Parâmetros de construção de índice</a>.</p></li>
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
<li><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice. Para obter detalhes, consulte Parâmetros <a href="/docs/pt/hnsw-sq.md#Index-specific-search-params">de pesquisa específicos do índice</a>.</li>
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
    </button></h2><p>Esta secção fornece uma visão geral dos parâmetros utilizados para criar um índice e executar pesquisas no índice.</p>
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">construir um índice</a>.</p>
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
     <td><p>Número máximo de ligações (ou arestas) que cada nó pode ter no gráfico, incluindo as arestas de saída e de entrada.</p><p>Este parâmetro afecta diretamente a construção e a pesquisa de índices.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Range</strong>: [2, 2048]</p><p><strong>Valor por defeito</strong>: <code translate="no">30</code> (até 30 arestas de saída e 30 arestas de entrada por nó)</p></td>
     <td><p>Um <code translate="no">M</code> maior geralmente leva a uma <strong>maior precisão</strong>, mas <strong>aumenta a sobrecarga de memória</strong> e <strong>torna mais lenta a construção do índice e a pesquisa</strong>.</p><p>Considere o aumento de <code translate="no">M</code> para conjuntos de dados com elevada dimensionalidade ou quando é crucial uma elevada recuperação.</p><p>Considere diminuir <code translate="no">M</code> quando a utilização da memória e a velocidade de pesquisa forem as principais preocupações.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Número de vizinhos candidatos considerados para conexão durante a construção do índice.</p><p>Um conjunto maior de candidatos é avaliado para cada novo elemento, mas o número máximo de conexões realmente estabelecidas ainda é limitado por <code translate="no">M</code>.</p></td>
     <td><p><strong>Tipo</strong>: Integer</p><p><strong>Range</strong>: [1, <em>int_max</em>]</p><p><strong>Valor predefinido</strong>: <code translate="no">360</code></p></td>
     <td><p>Um <code translate="no">efConstruction</code> mais elevado resulta normalmente num <strong>índice mais preciso</strong>, uma vez que são exploradas mais ligações potenciais. No entanto, isto também leva a um <strong>tempo de indexação mais longo e a uma maior utilização de memória</strong> durante a construção.</p><p>Considere aumentar <code translate="no">efConstruction</code> para melhorar a precisão, especialmente em cenários em que o tempo de indexação é menos crítico.</p><p>Considere diminuir <code translate="no">efConstruction</code> para acelerar a construção do índice quando as restrições de recursos são uma preocupação.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Especifica o método de quantização escalar para comprimir vectores. Cada opção oferece um equilíbrio diferente entre compressão e precisão:</p><ul><li><p><code translate="no">SQ4U</code>: Codifica vectores utilizando quantização uniforme de 4 bits. Este modo oferece a maior velocidade e compressão.</p></li><li><p><code translate="no">SQ6</code>: Codifica vectores utilizando números inteiros de 6 bits.</p></li><li><p><code translate="no">SQ8</code>: Codifica vectores utilizando números inteiros de 8 bits.</p></li><li><p><code translate="no">BF16</code>: Usa o formato Bfloat16.</p></li><li><p><code translate="no">FP16</code>: Utiliza o formato padrão de ponto flutuante de 16 bits.</p></li></ul></td>
     <td><p><strong>Tipo</strong>: String</p><p><strong>Range</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>Valor por defeito</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>A escolha de <code translate="no">sq_type</code> depende das necessidades específicas da aplicação. <code translate="no">SQ4U</code> é escolhido para máxima velocidade e eficiência de memória. <code translate="no">SQ6</code> ou <code translate="no">SQ8</code> podem ser adequados para um desempenho equilibrado. Por outro lado, se a precisão for primordial, <code translate="no">BF16</code> ou <code translate="no">FP16</code> podem ser preferidos.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Um sinalizador booleano que controla se uma etapa de refinamento é aplicada durante a pesquisa. O refinamento envolve uma nova classificação dos resultados iniciais através do cálculo de distâncias exactas entre o vetor de consulta e os candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Range</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>Valor predefinido</strong>: <code translate="no">false</code></p></td>
     <td><p>Defina para <code translate="no">true</code> se for essencial uma elevada precisão e puder tolerar tempos de pesquisa ligeiramente mais lentos. Utilize <code translate="no">false</code> se a velocidade for uma prioridade e for aceitável um pequeno compromisso na precisão.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Determina a precisão dos dados utilizados para o refinamento.</p><p>Esta precisão tem de ser superior à dos vectores comprimidos (conforme definido por <code translate="no">sq_type</code>), o que afecta a exatidão dos vectores reordenados e o seu espaço de memória.</p></td>
     <td><p><strong>Tipo</strong>: String</p><p><strong>Intervalo</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>Valor por defeito</strong>: Nenhum</p></td>
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">pesquisar no índice</a>.</p>
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
     <td><p>Controla a amplitude da pesquisa durante a recuperação do vizinho mais próximo. Ele determina quantos nós são visitados e avaliados como possíveis vizinhos mais próximos. </p><p>Este parâmetro afecta apenas o processo de pesquisa e aplica-se exclusivamente à camada inferior do gráfico.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Intervalo</strong>: [1, <em>int_max</em>]</p><p><strong>Valor por defeito</strong>: <em>limite</em> (TopK vizinhos mais próximos a devolver)</p></td>
     <td><p>Um <code translate="no">ef</code> maior conduz geralmente a uma <strong>maior precisão de pesquisa</strong>, uma vez que são considerados mais vizinhos potenciais. No entanto, isto também <strong>aumenta o tempo de pesquisa</strong>.</p><p>Considere aumentar <code translate="no">ef</code> quando a obtenção de uma elevada recuperação é crítica e a velocidade de pesquisa é menos preocupante.</p><p>Considere diminuir <code translate="no">ef</code> para dar prioridade a pesquisas mais rápidas, especialmente em cenários em que uma ligeira redução na precisão é aceitável.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>O fator de ampliação que controla quantos candidatos extra são examinados durante a fase de refinamento, relativamente aos K resultados principais solicitados.</p></td>
     <td><p><strong>Tipo</strong>: Flutuante</p><p><strong>Intervalo</strong>: [1, <em>float_max</em>)</p><p><strong>Valor predefinido</strong>: 1</p></td>
     <td><p>Valores mais altos de <code translate="no">refine_k</code> podem melhorar a recuperação e a precisão, mas também aumentarão o tempo de pesquisa e a utilização de recursos. Um valor de 1 significa que o processo de refinamento considera apenas os K resultados principais iniciais.</p></td>
   </tr>
</table>
