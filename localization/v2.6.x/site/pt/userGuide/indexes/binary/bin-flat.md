---
id: bin-flat.md
title: BIN_FLAT
summary: >-
  O índice BIN_FLAT é uma variante do índice FLAT adaptada exclusivamente para
  incorporação binária. É excelente em aplicações em que a pesquisa de
  semelhança de vectores exige uma precisão perfeita em conjuntos de dados
  relativamente pequenos e de escala milionária. Ao empregar uma metodologia de
  pesquisa exaustiva - comparando cada entrada alvo com todos os vectores do
  conjunto de dados - o BIN_FLAT garante resultados exactos. Esta precisão
  torna-o uma referência ideal para avaliar o desempenho de outros índices que
  podem oferecer menos de 100% de recuperação, embora a sua abordagem minuciosa
  também o torne a opção mais lenta para dados de grande escala.
---
<h1 id="BINFLAT" class="common-anchor-header">BIN_FLAT<button data-href="#BINFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <strong>BIN_FLAT</strong> é uma variante do índice <strong>FLAT</strong> adaptada exclusivamente para incorporação binária. É excelente em aplicações em que a pesquisa de semelhança de vectores exige uma precisão perfeita em conjuntos de dados relativamente pequenos e de escala milionária. Ao empregar uma metodologia de pesquisa exaustiva - comparando cada entrada alvo com todos os vectores do conjunto de dados - o BIN_FLAT garante resultados exactos. Esta precisão torna-o uma referência ideal para avaliar o desempenho de outros índices que podem oferecer menos de 100% de recuperação, embora a sua abordagem minuciosa também o torne a opção mais lenta para dados de grande escala.</p>
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
    </button></h2><p>Para construir um índice <code translate="no">BIN_FLAT</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code> e <code translate="no">metric_type</code> para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_binary_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;BIN_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={} <span class="hljs-comment"># No additional parameters required for BIN_FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">BIN_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados para incorporação binária incluem <code translate="no">HAMMING</code> (predefinição) e <code translate="no">JACCARD</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Não são necessários parâmetros adicionais para o índice BIN_FLAT.</p></li>
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
    </button></h2><p>Depois de o índice ser criado e as entidades inseridas, pode efetuar pesquisas de semelhança no índice.</p>
<pre><code translate="no" class="language-python">res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;binary_vector_field&quot;</span>,  <span class="hljs-comment"># Binary vector field name</span>
    data=[query_binary_vector],  <span class="hljs-comment"># Query binary vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {}}  <span class="hljs-comment"># No additional parameters required for BIN_FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais informações, consulte <a href="/docs/pt/binary-vector.md">Vetor binário</a>.</p>
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
    </button></h2><p>Para o índice BIN_FLAT, não são necessários parâmetros adicionais durante a criação do índice ou o processo de pesquisa.</p>
