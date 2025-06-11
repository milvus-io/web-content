---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  O índice IVF_SQ8 é um algoritmo de indexação baseado na quantização, concebido
  para enfrentar desafios de pesquisa de semelhanças em grande escala. Este tipo
  de índice permite pesquisas mais rápidas com um espaço de memória muito mais
  pequeno em comparação com os métodos de pesquisa exaustiva.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <strong>IVF_SQ8</strong> é um algoritmo de indexação <strong>baseado na quantização</strong>, concebido para enfrentar desafios de pesquisa de semelhanças em grande escala. Este tipo de índice consegue pesquisas mais rápidas com um espaço de memória muito mais pequeno em comparação com os métodos de pesquisa exaustiva.</p>
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
    </button></h2><p>O índice IVF_SQ8 baseia-se em dois componentes principais:</p>
<ul>
<li><p><strong>Arquivo invertido (IVF)</strong>: Organiza os dados em clusters, permitindo que o algoritmo de pesquisa se concentre apenas nos subconjuntos de vectores mais relevantes.</p></li>
<li><p><strong>Quantização escalar (SQ8)</strong>: Comprime os vectores para uma forma mais compacta, reduzindo drasticamente a utilização de memória e mantendo a precisão suficiente para cálculos de semelhança rápidos.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">FIV</h3><p>A FIV é como criar um índice num livro. Em vez de analisar cada página (ou, no nosso caso, cada vetor), procura palavras-chave específicas (clusters) no índice para encontrar rapidamente as páginas relevantes (vectores). No nosso cenário, os vectores são agrupados em clusters e o algoritmo irá procurar dentro de alguns clusters que estejam próximos do vetor de consulta.</p>
<p>Veja como isso funciona:</p>
<ol>
<li><p><strong>Agrupamento:</strong> O seu conjunto de dados vectoriais é dividido num número especificado de clusters, utilizando um algoritmo de agrupamento como o k-means. Cada cluster tem um centroide (um vetor representativo do cluster).</p></li>
<li><p><strong>Atribuição:</strong> Cada vetor é atribuído ao cluster cujo centróide está mais próximo dele.</p></li>
<li><p><strong>Índice invertido:</strong> É criado um índice que mapeia cada centróide de cluster para a lista de vectores atribuídos a esse cluster.</p></li>
<li><p><strong>Pesquisa:</strong> Quando procura os vizinhos mais próximos, o algoritmo de pesquisa compara o vetor de consulta com os centróides de cluster e seleciona o(s) cluster(s) mais promissor(es). A pesquisa é então reduzida aos vectores dentro desses clusters selecionados.</p></li>
</ol>
<p>Para saber mais sobre os seus pormenores técnicos, consulte <a href="/docs/pt/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>A Quantização escalar (SQ) é uma técnica utilizada para reduzir o tamanho de vectores de elevada dimensão, substituindo os seus valores por representações mais pequenas e compactas. A variante <strong>SQ8</strong> utiliza números inteiros de 8 bits em vez dos típicos números de ponto flutuante de 32 bits para armazenar cada valor de dimensão de um vetor. Isso reduz bastante a quantidade de memória necessária para armazenar os dados.</p>
<p>Veja como o SQ8 funciona:</p>
<ol>
<li><p><strong>Identificação do intervalo:</strong> Primeiro, identifica os valores mínimo e máximo dentro do vetor. Este intervalo define os limites para a quantização.</p></li>
<li><p><strong>Normalização:</strong> Normalize os valores do vetor para um intervalo entre 0 e 1 utilizando a fórmula:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Isso garante que todos os valores sejam mapeados proporcionalmente dentro de um intervalo padronizado, preparando-os para a compactação.</p></li>
<li><p><strong>Compressão de 8 bits:</strong> Multiplique o valor normalizado por 255 (o valor máximo para um número inteiro de 8 bits) e arredonde o resultado para o número inteiro mais próximo. Isso comprime efetivamente cada valor em uma representação de 8 bits.</p></li>
</ol>
<p>Suponha que você tenha um valor de dimensão de 1,2, com um valor mínimo de -1,7 e um valor máximo de 2,3. A figura seguinte mostra como o SQ8 é aplicado para converter um valor float32 num inteiro int8.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>O índice IVF_SQ8 combina IVF e SQ8 para efetuar pesquisas de semelhança de forma eficiente:</p>
<ol>
<li><p><strong>O IVF limita o âmbito da pesquisa</strong>: O conjunto de dados é dividido em clusters e, quando é emitida uma consulta, o IVF compara primeiro a consulta com os centróides dos clusters, selecionando os clusters mais relevantes.</p></li>
<li><p><strong>O SQ8 acelera os cálculos de distância</strong>: Dentro dos clusters selecionados, o SQ8 comprime os vectores em números inteiros de 8 bits, reduzindo a utilização de memória e acelerando os cálculos de distância.</p></li>
</ol>
<p>Ao utilizar o IVF para concentrar a pesquisa e o SQ8 para acelerar os cálculos, o IVF_SQ8 consegue tempos de pesquisa rápidos e eficiência de memória.</p>
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
    </button></h2><p>Para construir um índice <code translate="no">IVF_SQ8</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice.</p>
<ul>
<li><code translate="no">nlist</code>: Número de clusters a criar utilizando o algoritmo k-means durante a construção do índice.</li>
</ul>
<p>Para saber mais sobre os parâmetros de construção disponíveis para o índice <code translate="no">IVF_SQ8</code>, consulte <a href="/docs/pt/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">Parâmetros de construção de índice</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
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
<li><code translate="no">nprobe</code>: Número de clusters para pesquisar candidatos.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">IVF_SQ8</code>, consulte <a href="/docs/pt/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">Parâmetros de pesquisa específicos do índice</a>.</p></li>
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
    </button></h2><p>Esta secção fornece uma visão geral dos parâmetros utilizados para criar um índice e efetuar pesquisas no índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">construir um índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de afinação</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>O número de clusters a criar utilizando o algoritmo k-means durante a construção do índice.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 65536]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">128</code></p></td>
     <td><p>Valores maiores de <code translate="no">nlist</code> melhoram a recuperação, criando clusters mais refinados, mas aumentam o tempo de criação do índice. Optimize com base no tamanho do conjunto de dados e nos recursos disponíveis. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">pesquisar no índice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p>FIV</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>O número de clusters para procurar candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, <em>nlist</em>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">8</code></p></td>
     <td><p>Valores mais altos permitem que mais clusters sejam pesquisados, melhorando a recuperação ao expandir o escopo da pesquisa, mas ao custo de uma maior latência de consulta. Defina <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar velocidade e precisão.</p>
<p>Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [1, nlist].</p></td>
   </tr>
</table>
