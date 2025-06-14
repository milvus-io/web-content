---
id: ivf-flat.md
title: IVF_FLAT
summary: >-
  O índice IVF_FLAT é um algoritmo de indexação que pode melhorar o desempenho
  da pesquisa de vectores de vírgula flutuante.
---

<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <strong>IVF_FLAT</strong> é um algoritmo de indexação que pode melhorar o desempenho da pesquisa para vectores de vírgula flutuante.</p>
<p>Este tipo de índice é ideal para conjuntos de dados de grande escala que requerem respostas de consulta rápidas e elevada precisão, especialmente quando o agrupamento do conjunto de dados pode reduzir o espaço de pesquisa e está disponível memória suficiente para armazenar dados de agrupamento.</p>
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
    </button></h2><p>O termo <strong>IVF_FLAT</strong> significa <strong>Inverted File Flat (Ficheiro Invertido Plano</strong>), que engloba a sua abordagem de duas camadas à indexação e pesquisa de vectores de vírgula flutuante:</p>
<ul>
<li><p><strong>Inverted File (IVF):</strong> Refere-se ao agrupamento do espaço vetorial em regiões gerenciáveis usando <a href="https://en.wikipedia.org/wiki/K-means_clustering">o agrupamento k-means</a>. Cada agrupamento é representado por um <strong>centróide</strong>, que serve de ponto de referência para os vectores nele contidos.</p></li>
<li><p><strong>Plano:</strong> Indica que, dentro de cada cluster, os vectores são armazenados na sua forma original (estrutura plana), sem qualquer compressão ou quantização, para cálculos de distância precisos.</p></li>
</ul>
<p>A figura seguinte mostra o seu funcionamento:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow.png" alt="IVF FLAT Workflow" class="doc-image" id="ivf-flat-workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho IVF FLAT</span> </span></p>
<p>Este método de indexação acelera o processo de pesquisa, mas tem uma potencial desvantagem: o candidato encontrado como o mais próximo da incorporação da consulta pode não ser exatamente o mais próximo. Isto pode acontecer se a incorporação mais próxima da incorporação de consulta residir num agrupamento diferente do selecionado com base no centróide mais próximo (ver visualização abaixo).</p>
<p>Para resolver este problema, <strong>o IVF_FLAT</strong> fornece dois hiperparâmetros que podemos ajustar:</p>
<ul>
<li><p><code translate="no">nlist</code>: Especifica o número de partições a criar utilizando o algoritmo k-means.</p></li>
<li><p><code translate="no">nprobe</code>: Especifica o número de partições a considerar durante a pesquisa de candidatos.</p></li>
</ul>
<p>Agora, se definirmos <code translate="no">nprobe</code> para 3 em vez de 1, obtemos o seguinte resultado:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow-2.png" alt="IVF FLAT Workflow 2" class="doc-image" id="ivf-flat-workflow-2" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho 2 do IVF FLAT</span> </span></p>
<p>Ao aumentar o valor de <code translate="no">nprobe</code>, pode incluir mais partições na pesquisa, o que pode ajudar a garantir que a incorporação mais próxima da consulta não é perdida, mesmo que resida numa partição diferente. No entanto, isso tem o custo de aumentar o tempo de pesquisa, pois mais candidatos precisam ser avaliados. Para obter mais informações sobre o ajuste de parâmetros de índice, consulte <a href="/docs/pt/v2.5.x/ivf-flat.md#Index-params">Parâmetros de índice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Construir índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para construir um índice <code translate="no">IVF_FLAT</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
params={
<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
} <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>

<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice.</p>
<ul>
<li><code translate="no">nlist</code>: Número de clusters para dividir o conjunto de dados.</li>
</ul>
<p>Para saber mais sobre os parâmetros de construção disponíveis para o índice <code translate="no">IVF_FLAT</code>, consulte <a href="/docs/pt/v2.5.x/ivf-flat.md#Index-building-params">Parâmetros de construção do índice</a>.</p></li>
</ul>
<p>Assim que os parâmetros do índice estiverem configurados, pode criar o índice utilizando diretamente o método <code translate="no">create_index()</code> ou passando os parâmetros do índice no método <code translate="no">create_collection</code>. Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/create-collection.md">Criar coleção</a>.</p>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>

<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice.</p>
<ul>
<li><code translate="no">nprobe</code>: Número de clusters a serem pesquisados.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">IVF_FLAT</code>, consulte <a href="/docs/pt/v2.5.x/ivf-flat.md#Index-specific-search-params">Parâmetros de pesquisa específicos do índice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/v2.5.x/ivf-flat.md#Build-index">construir um índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>O número de clusters a criar utilizando o algoritmo k-means durante a construção do índice. Cada cluster, representado por um centroide, armazena uma lista de vectores. Aumentar este parâmetro reduz o número de vectores em cada cluster, criando partições mais pequenas e mais focadas.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 65536]</p><p><strong>Valor padrão</strong>: <code translate="no">128</code></p></td>
     <td><p>Valores maiores <code translate="no">nlist</code> melhoram a recuperação, criando clusters mais refinados, mas aumentam o tempo de construção do índice. Optimize com base no tamanho do conjunto de dados e nos recursos disponíveis. Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/v2.5.x/ivf-flat.md#Search-on-index">pesquisar no índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>O número de clusters para pesquisar candidatos. Os valores mais elevados permitem a pesquisa de mais clusters, melhorando a recuperação através da expansão do âmbito da pesquisa, mas à custa de uma maior latência da consulta.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, <em>nlist</em>]</p><p><strong>Valor padrão</strong>: <code translate="no">8</code></p></td>
     <td><p>Aumentar esse valor melhora a recuperação, mas pode tornar a pesquisa mais lenta. Defina <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar a velocidade e a precisão.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [1, nlist].</p></td>
   </tr>
</table>
