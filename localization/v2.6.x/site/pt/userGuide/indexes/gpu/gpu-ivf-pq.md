---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  O índice GPU_IVF_PQ baseia-se no conceito IVF_PQ, combinando o agrupamento de
  ficheiros invertido com a Quantização de Produtos (PQ), que decompõe vectores
  de elevada dimensão em subespaços mais pequenos e quantifica-os para pesquisas
  de semelhança eficientes. Exclusivamente concebido para ambientes GPU, o
  GPU_IVF_PQ tira partido do processamento paralelo para acelerar os cálculos e
  tratar eficazmente dados vectoriais de grande escala. Para obter mais
  informações sobre conceitos fundamentais, consulte IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <strong>GPU_IVF_PQ</strong> baseia-se no conceito <strong>IVF_PQ</strong>, combinando o agrupamento de ficheiros invertido com a Quantização de Produtos (PQ), que divide vectores de elevada dimensão em subespaços mais pequenos e quantifica-os para pesquisas de semelhança eficientes. Exclusivamente concebido para ambientes GPU, o GPU_IVF_PQ tira partido do processamento paralelo para acelerar os cálculos e tratar eficazmente dados vectoriais de grande escala. Para obter mais informações sobre conceitos fundamentais, consulte <a href="/docs/pt/ivf-pq.md">IVF_PQ</a>.</p>
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
    </button></h2><p>Para construir um índice <code translate="no">GPU_IVF_PQ</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code> e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice.</p>
<ul>
<li><code translate="no">m</code>: Número de sub-vectores em que dividir o vetor.</li>
</ul>
<p>Para saber mais sobre os parâmetros de construção disponíveis para o índice <code translate="no">GPU_IVF_PQ</code>, consulte <a href="/docs/pt/gpu-ivf-pq.md#Index-building-params">Parâmetros de construção do índice</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice.</p>
<ul>
<li><code translate="no">nprobe</code>: Número de clusters a serem pesquisados.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">GPU_IVF_PQ</code>, consulte <a href="/docs/pt/gpu-ivf-pq.md#Index-specific-search-params">Parâmetros de pesquisa específicos do índice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/gpu-ivf-pq.md#Build-index">construir um índice</a>.</p>
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
     <td><p>Valores maiores de <code translate="no">nlist</code> melhoram a recuperação ao criar clusters mais refinados, mas aumentam o tempo de criação do índice. Optimize com base no tamanho do conjunto de dados e nos recursos disponíveis. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>O número de sub-vectores (utilizados para quantização) para dividir cada vetor de alta dimensão durante o processo de quantização.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro <strong>Intervalo</strong>: [1, 65536]</p>
<p><strong>Valor predefinido</strong>: Nenhum</p></td>
     <td><p>Um valor <code translate="no">m</code> mais elevado pode melhorar a precisão, mas também aumenta a complexidade computacional e a utilização de memória. <code translate="no">m</code> deve ser um divisor da dimensão do vetor<em>(D</em>) para garantir uma decomposição adequada. Um valor geralmente recomendado é <em>m = D/2</em>.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>O número de bits utilizados para representar o índice do centróide de cada sub-vetor na forma comprimida. Ele determina diretamente o tamanho de cada livro de códigos. Cada livro de códigos conterá $2^{\textit{nbits}}$ centroides. Por exemplo, se <code translate="no">nbits</code> estiver definido para 8, cada sub-vetor será representado por um índice de centróide de 8 bits. Isto permite $2^8$ (256) centróides possíveis no livro de códigos para esse sub-vetor.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 64]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">8</code></p></td>
     <td><p>Um valor <code translate="no">nbits</code> mais alto permite livros de códigos maiores, potencialmente levando a representações mais precisas dos vectores originais. No entanto, também significa utilizar mais bits para armazenar cada índice, resultando numa menor compressão. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Decide se o conjunto de dados original deve ser armazenado em cache na memória da GPU. Valores possíveis:</p>
<ul>
<li><p><code translate="no">"true"</code>: Armazena em cache o conjunto de dados original para melhorar a recuperação, refinando os resultados da pesquisa.</p></li>
<li><p><code translate="no">"false"</code>: Não coloca em cache o conjunto de dados original para economizar memória da GPU.</p></li>
</ul></td>
     <td><p><strong>Tipo</strong>: String <strong>Range</strong>: [<code translate="no">"true"</code>, <code translate="no">"false"</code>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">"false"</code></p></td>
     <td><p>Definindo-o para <code translate="no">"true"</code> melhora a recuperação ao refinar os resultados da pesquisa, mas usa mais memória GPU. Definindo-o para <code translate="no">"false"</code> conserva a memória do GPU.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/gpu-ivf-pq.md#Search-on-index">pesquisar no índice</a>.</p>
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
