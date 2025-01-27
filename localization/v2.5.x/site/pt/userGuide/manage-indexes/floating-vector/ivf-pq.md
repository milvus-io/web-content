---
id: ivf-pq.md
order: 2
summary: Este artigo apresenta o índice IVF_PQ no Milvus.
title: IVF_PQ
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <strong>IVF_PQ</strong> é um algoritmo de indexação <strong>baseado em quantização</strong> para pesquisa aproximada do vizinho mais próximo em espaços de alta dimensão. Embora não seja tão rápido quanto alguns métodos baseados em grafos, <strong>o IVF_PQ</strong> geralmente requer muito menos memória, tornando-o uma opção prática para grandes conjuntos de dados.</p>
<h2 id="Overview" class="common-anchor-header">Descrição geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O <strong>IVF_PQ</strong> significa <strong>Inverted File with Product Quantization (Ficheiro invertido com quantificação de produtos</strong>), uma abordagem híbrida que combina indexação e compressão para uma pesquisa e recuperação vectoriais eficientes. Aproveita dois componentes principais: <strong>Inverted File (IVF)</strong> e <strong>Product Quantization (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>O IVF é como criar um índice num livro. Em vez de analisar todas as páginas (ou, no nosso caso, todos os vectores), procura palavras-chave específicas (clusters) no índice para encontrar rapidamente as páginas (vectores) relevantes. No nosso cenário, os vectores são agrupados em clusters e o algoritmo irá procurar dentro de alguns clusters que estejam próximos do vetor de consulta.</p>
<p>Veja como isso funciona:</p>
<ol>
<li><strong>Agrupamento:</strong> O seu conjunto de dados vectoriais é dividido num número especificado de clusters, utilizando um algoritmo de agrupamento como o k-means. Cada cluster tem um centroide (um vetor representativo do cluster).</li>
<li><strong>Atribuição:</strong> Cada vetor é atribuído ao cluster cujo centróide está mais próximo dele.</li>
<li><strong>Índice invertido:</strong> É criado um índice que mapeia cada centróide de cluster para a lista de vectores atribuídos a esse cluster.</li>
<li><strong>Pesquisa:</strong> Quando procura os vizinhos mais próximos, o algoritmo de pesquisa compara o vetor de consulta com os centróides de cluster e seleciona o(s) cluster(s) mais promissor(es). A pesquisa é então reduzida aos vectores dentro desses clusters selecionados.</li>
</ol>
<p>Para saber mais sobre os seus pormenores técnicos, consulte <a href="/docs/pt/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>A Quantização de Produtos (PQ)</strong> é um método de compressão para vectores de elevada dimensão que reduz significativamente os requisitos de armazenamento, permitindo operações de pesquisa de semelhanças rápidas.</p>
<p>O processo PQ envolve as seguintes etapas principais:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>pq-process-1</span> </span></p>
<ol>
<li><strong>Decomposição da dimensão</strong>: O algoritmo começa por decompor cada vetor de alta dimensão em <code translate="no">m</code> sub-vectores de igual dimensão. Esta decomposição transforma o espaço D-dimensional original em <code translate="no">m</code> subespaços disjuntos, em que cada subespaço contém <em>D/m</em> dimensões. O parâmetro <code translate="no">m</code> controla a granularidade da decomposição e influencia diretamente a taxa de compressão.</li>
<li><strong>Geração do livro de códigos do subespaço</strong>: Dentro de cada subespaço, o algoritmo aplica <a href="https://en.wikipedia.org/wiki/K-means_clustering">o agrupamento k-means</a> para aprender um conjunto de vectores representativos (centróides). Estes centróides formam coletivamente um livro de códigos para esse subespaço. O número de centróides em cada livro de códigos é determinado pelo parâmetro <code translate="no">nbits</code>, em que cada livro de códigos contém centróides de 2^nbits. Por exemplo, se <code translate="no">nbits = 8</code>, cada livro de códigos conterá 256 centróides. A cada centróide é atribuído um índice único com <code translate="no">nbits</code> bits.</li>
<li><strong>Quantização</strong><strong>do vetor</strong>: Para cada sub-vetor do vetor original, a PQ identifica o seu centróide mais próximo no subespaço correspondente utilizando um tipo de métrica específico. Este processo mapeia efetivamente cada sub-vetor para o seu vetor representativo mais próximo no livro de códigos. Em vez de armazenar as coordenadas completas do sub-vetor, apenas o índice do centróide correspondente é retido.</li>
<li><strong>Representação comprimida</strong>: A representação comprimida final consiste em <code translate="no">m</code> índices, um de cada subespaço, coletivamente referidos como <strong>códigos PQ</strong>. Esta codificação reduz o requisito de armazenamento de <em>D × 32</em> bits (assumindo números de vírgula flutuante de 32 bits) para <em>m</em> × <em>nbits</em> bits, conseguindo uma compressão substancial ao mesmo tempo que preserva a capacidade de aproximar as distâncias vectoriais.</li>
</ol>
<p>Para obter mais detalhes sobre o ajuste e a otimização dos parâmetros, consulte <a href="#index-params">Index params</a>.</p>
<div class="alert note">
<p><strong>Exemplo de compressão</strong></p>
<p>Considere um vetor com <em>D = 128</em> dimensões usando números de ponto flutuante de 32 bits. Com os parâmetros PQ <em>m = 64</em> (sub-vectores) e <em>nbits = 8</em> (portanto <em>k =</em> 2^8 <em>= 256</em> centróides por subespaço), podemos comparar os requisitos de armazenamento:</p>
<ul>
<li>Vetor original: 128 dimensões × 32 bits = 4.096 bits</li>
<li>Vetor comprimido por PQ: 64 sub-vectores × 8 bits = 512 bits</li>
</ul>
<p>Isto representa uma redução de 8x nos requisitos de armazenamento.</p>
</div>
<p><strong>Cálculo da distância com PQ</strong></p>
<p>Ao efetuar uma pesquisa de similaridade com um vetor de consulta, a PQ permite o cálculo eficiente da distância através dos seguintes passos:</p>
<ol>
<li><p><strong>Pré-processamento da consulta</strong></p>
<ol>
<li>O vetor de consulta é decomposto em <code translate="no">m</code> sub-vectores, correspondendo à estrutura de decomposição PQ original.</li>
<li>Para cada sub-vetor de consulta e o seu livro de códigos correspondente (contendo centróides de 2^nbits), calcular e armazenar as distâncias a todos os centróides.</li>
<li>Isto gera <code translate="no">m</code> tabelas de pesquisa, em que cada tabela contém distâncias de 2^nbits.</li>
</ol></li>
<li><p><strong>Aproximação das distâncias</strong></p>
<p>Para qualquer vetor da base de dados representado por códigos PQ, a sua distância aproximada ao vetor de consulta é calculada da seguinte forma:</p>
<ol>
<li>Para cada um dos sub-vectores de <code translate="no">m</code>, obter a distância pré-computada da tabela de pesquisa correspondente utilizando o índice do centróide armazenado.</li>
<li>Somar estas <code translate="no">m</code> distâncias para obter a distância aproximada com base num tipo específico de métrica (por exemplo, distância euclidiana).</li>
</ol></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>pq-processo-1</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>O índice <strong>IVF_PQ</strong> combina os pontos fortes do <strong>IVF</strong> e do <strong>PQ</strong> para acelerar as pesquisas. O processo funciona em duas etapas:</p>
<ol>
<li><strong>Filtragem grosseira com IVF</strong>: IVF particiona o espaço vetorial em clusters, reduzindo o escopo da pesquisa. Em vez de avaliar todo o conjunto de dados, o algoritmo concentra-se apenas nos clusters mais próximos do vetor de consulta.</li>
<li><strong>Comparação fina com PQ</strong>: Dentro dos clusters selecionados, PQ utiliza representações vectoriais comprimidas e quantizadas para calcular rapidamente distâncias aproximadas.</li>
</ol>
<p>O desempenho do índice <strong>IVF_PQ</strong> é significativamente afetado pelos parâmetros que controlam os algoritmos IVF e PQ. O ajuste desses parâmetros é crucial para obter os melhores resultados para um determinado conjunto de dados e aplicação. Informações mais detalhadas sobre esses parâmetros e como ajustá-los podem ser encontradas em <a href="#index-params">Parâmetros de índice</a>.</p>
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
    </button></h2><p>Para construir um índice <code translate="no">IVF_PQ</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice.</p>
<ul>
<li><code translate="no">m</code>: Número de sub-vectores em que dividir o vetor.</li>
</ul>
<p>Para saber mais sobre os parâmetros de construção disponíveis para o índice <code translate="no">IVF_PQ</code>, consulte <a href="#Index-building-params">Parâmetros de construção do índice</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: 10, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">limit</span>=3,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)

<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice.</p>
<ul>
<li><code translate="no">nprobe</code>: Número de clusters a serem pesquisados.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">IVF_PQ</code>, consulte <a href="#index-specific-search-params">Parâmetros de pesquisa específicos do índice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="#Build-index">construir um índice</a>.</p>
<table>
<thead>
<tr><th></th><th><strong>Parâmetro</strong></th><th><strong>Descrição</strong></th><th><strong>Intervalo de valores</strong></th><th><strong>Sugestão de afinação</strong></th></tr>
</thead>
<tbody>
<tr><td>IVF</td><td><code translate="no">nlist</code></td><td>O número de clusters a criar utilizando o algoritmo k-means durante a construção do índice.</td><td><strong>Tipo</strong>: Inteiro<br><strong>Intervalo</strong>: [1, 65536]<br><strong>Valor predefinido</strong>: <code translate="no">128</code></td><td>Valores maiores de <code translate="no">nlist</code> melhoram a recuperação ao criar clusters mais refinados, mas aumentam o tempo de construção do índice. Optimize com base no tamanho do conjunto de dados e nos recursos disponíveis.<br>Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [32, 4096].</td></tr>
<tr><td>PQ</td><td><code translate="no">m</code></td><td>O número de sub-vectores (utilizados para quantização) para dividir cada vetor de alta dimensão durante o processo de quantização.</td><td><strong>Tipo</strong>: Inteiro<br><strong>Intervalo</strong>: [1, 65536]<br><strong>Valor predefinido</strong>: Nenhum</td><td>Um valor <code translate="no">m</code> mais elevado pode melhorar a precisão, mas também aumenta a complexidade computacional e a utilização de memória.<br><code translate="no">m</code> deve ser um divisor da dimensão do vetor<em>(D</em>) para garantir uma decomposição adequada. Um valor geralmente recomendado é <em>m = D/2</em>.<br>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [D/8, D].</td></tr>
<tr><td></td><td><code translate="no">nbits</code></td><td>O número de bits utilizados para representar o índice do centróide de cada sub-vetor na forma comprimida. Determina diretamente o tamanho de cada livro de códigos. Cada livro de códigos conterá centroides de 2^nbits. Por exemplo, se <code translate="no">nbits</code> estiver definido para 8, cada sub-vetor será representado por um índice de centróide de 8 bits. Isto permite 2^8 (256) centróides possíveis no livro de códigos para esse sub-vetor.</td><td><strong>Tipo</strong>: Inteiro<br><strong>Intervalo</strong>: [1, 64]<br><strong>Valor predefinido</strong>: <code translate="no">8</code></td><td>Um valor <code translate="no">nbits</code> mais alto permite livros de códigos maiores, potencialmente levando a representações mais precisas dos vectores originais. No entanto, isso também significa usar mais bits para armazenar cada índice, resultando em menos compactação.<br>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [1, 16].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="#Search-on-index">pesquisar no índice</a>.</p>
<table>
<thead>
<tr><th></th><th><strong>Parâmetro</strong></th><th><strong>Descrição</strong></th><th><strong>Intervalo de valores</strong></th><th><strong>Sugestão de ajuste</strong></th></tr>
</thead>
<tbody>
<tr><td>FIV</td><td><code translate="no">nprobe</code></td><td>O número de clusters para procurar candidatos.</td><td><strong>Tipo</strong>: Inteiro<br><strong>Intervalo</strong>: [1, <em>nlist</em>]<br><strong>Valor predefinido</strong>: <code translate="no">8</code></td><td>Valores mais altos permitem que mais clusters sejam pesquisados, melhorando a recuperação ao expandir o escopo da pesquisa, mas ao custo de uma maior latência de consulta.<br>Defina <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar velocidade e precisão.<br>Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [1, nlist].</td></tr>
</tbody>
</table>
