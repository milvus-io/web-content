---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  O índice SPARSE_INVERTED_INDEX é um tipo de índice utilizado pelo Milvus para
  armazenar e pesquisar vetores esparsos de forma eficiente. Este tipo de índice
  recorre aos princípios da indexação invertida para criar uma estrutura de
  pesquisa altamente eficiente para dados esparsos.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice « <code translate="no">SPARSE_INVERTED_INDEX</code> » é um tipo de índice utilizado pelo Milvus para armazenar e pesquisar vetores esparsos de forma eficiente. Este índice cria uma estrutura invertida a partir das dimensões diferentes de zero nos vetores esparsos. Pode utilizar este índice para a pesquisa de texto completo BM25 e para a pesquisa de incorporação esparsa com base no produto interno.</p>
<p>Para mais informações sobre campos de vetores esparsos, tipos de métricas e pesquisa de texto completo, consulte <a href="/docs/pt/sparse_vector.md">Vetor esparso</a>, <a href="/docs/pt/metric.md">tipos de métricas</a> e <a href="/docs/pt/full-text-search.md">pesquisa de texto completo</a>.</p>
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
    </button></h2><p>Para criar um índice « <code translate="no">SPARSE_INVERTED_INDEX</code> » num campo de vetores esparsos no Milvus, utilize o método « <code translate="no">add_index()</code> » e especifique os parâmetros « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » e «index».</p>
<p>Para a pesquisa de texto completo BM25, crie o índice no campo de vetores esparsos gerado por uma função BM25. Defina ` <code translate="no">metric_type</code> ` como ` <code translate="no">BM25</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Para a pesquisa de incorporação esparsa, crie o índice num campo de vetores esparsos que armazene vetores esparsos gerados externamente. Defina « <code translate="no">metric_type</code> » como « <code translate="no">IP</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Nas configurações anteriores:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a criar. Defina este valor como « <code translate="no">SPARSE_INVERTED_INDEX</code> ».</p></li>
<li><p><code translate="no">metric_type</code>: A métrica utilizada para calcular a semelhança entre vetores esparsos. Valores válidos:</p>
<ul>
<li><p><code translate="no">BM25</code>: Utiliza a pontuação de relevância BM25 para a pesquisa de texto completo.</p></li>
<li><p><code translate="no">IP</code> (Produto Interno): Mede a similaridade entre vetores esparsos utilizando o produto escalar.</p></li>
</ul>
<p>Para mais detalhes, consulte <a href="/docs/pt/metric.md">Tipos</a> de <a href="/docs/pt/metric.md">métricas</a> e <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: O algoritmo utilizado para criar e consultar o índice. Valores válidos:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Processamento de consultas «Document-at-a-Time» com MaxScore. Esta é a configuração predefinida para « <code translate="no">BM25</code> ». Para mais informações, consulte <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">«Avaliação</a> de <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">Consultas: Estratégias e Otimizações</a>».</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Processamento de consultas WAND «Documento de cada vez». Este algoritmo é adequado para valores topK mais pequenos ou consultas mais curtas. Para mais informações, consulte <a href="https://dl.acm.org/doi/10.1145/956863.956944">«Avaliação eficiente de consultas utilizando um processo de recuperação de dois níveis</a>».</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Processamento básico de consultas «Term-at-a-Time». Utilize esta opção como referência ou quando precisar que a pontuação se adapte dinamicamente às estatísticas globais da coleção, tais como o comprimento médio dos documentos.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: Processamento de consultas MaxScore com metadados de pontuação máxima ao nível do bloco. Para mais informações, consulte <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«Recuperação mais rápida de documentos top-k utilizando índices Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: Processamento de consultas WAND com metadados de pontuação máxima ao nível do bloco. Para mais informações, consulte <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">«Recuperação mais rápida de documentos Top-k utilizando índices Block-Max</a>».</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: Um índice invertido esparso baseado em janelas fixas de ID de documento, com aceleração SIMD para a pesquisa. Esta é a configuração predefinida para <code translate="no">IP</code>. Para mais detalhes, consulte o <a href="https://arxiv.org/abs/2509.08395">artigo</a> sobre <a href="https://arxiv.org/abs/2509.08395">o SINDI</a>.</p></li>
</ul>
<p>Se não especificar <code translate="no">inverted_index_algo</code>, o Milvus seleciona o algoritmo predefinido com base em <code translate="no">metric_type</code>: <code translate="no">DAAT_MAXSCORE</code> para <code translate="no">BM25</code> e <code translate="no">SINDI</code> para <code translate="no">IP</code>.</p>
<p>Para saber mais sobre os parâmetros de criação disponíveis para o índice <code translate="no">SPARSE_INVERTED_INDEX</code>, consulte <a href="/docs/pt/sparse-inverted-index.md#Index-building-params">Parâmetros de criação</a> do <a href="/docs/pt/sparse-inverted-index.md#Index-building-params">índice</a>.</p></li>
</ul>
<p>Depois de configurados os parâmetros do índice, pode criar o índice utilizando diretamente o método ` <code translate="no">create_index()</code> ` ou passando os parâmetros do índice no método ` <code translate="no">create_collection</code> `. Para mais detalhes, consulte <a href="/docs/pt/create-collection.md">«Criar coleção</a>».</p>
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
    </button></h2><p>Assim que o índice estiver construído e as entidades inseridas, pode realizar pesquisas de similaridade no índice.</p>
<p>Para a pesquisa de texto completo BM25, utilize texto bruto como consulta. O Milvus converte o texto da consulta num vetor esparso através da função BM25.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Para a pesquisa de incorporação esparsa, utilize um dicionário de vetores esparsos como vetor de consulta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>Por predefinição, o Milvus utiliza o algoritmo de pesquisa configurado para o índice.</p>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice « <code translate="no">SPARSE_INVERTED_INDEX</code> », consulte <a href="/docs/pt/sparse-inverted-index.md#Index-specific-search-params">«Parâmetros de pesquisa específicos do índice</a>».</p>
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
    </button></h2><p>Esta secção apresenta uma visão geral dos parâmetros utilizados para criar um índice e realizar pesquisas nesse índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de criação de índices<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados no <code translate="no">params</code> ao <a href="/docs/pt/sparse-inverted-index.md#Build-index">criar um índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>O algoritmo utilizado para criar e consultar o índice. Determina a forma como o índice processa as consultas.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>Valor predefinido: <code translate="no">"DAAT_MAXSCORE"</code> para <code translate="no">BM25</code>; <code translate="no">"SINDI"</code> para <code translate="no">IP</code>.</p></td>
     <td><p>Utilize <code translate="no">"DAAT_MAXSCORE"</code> para cargas de trabalho de pesquisa de texto completo do BM25 com valores k elevados ou consultas com muitos termos.</p><p>Utilize <code translate="no">"DAAT_WAND"</code> para cargas de trabalho BM25 com valores k pequenos ou consultas curtas.</p><p>Utilize <code translate="no">"TAAT_NAIVE"</code> como referência ou quando precisar que a pontuação se adapte dinamicamente às estatísticas globais da coleção, tais como o comprimento médio dos documentos.</p><p>Utilize <code translate="no">"BLOCK_MAX_MAXSCORE"</code> ou <code translate="no">"BLOCK_MAX_WAND"</code> para utilizar metadados de pontuação máxima ao nível do bloco para a poda de consultas.</p><p>Utilize <code translate="no">"SINDI"</code> para a pesquisa de incorporação esparsa com <code translate="no">IP</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>Controla a saturação da frequência dos termos para a pontuação BM25. Este parâmetro aplica-se apenas quando <code translate="no">metric_type</code> é <code translate="no">BM25</code>.</p></td>
     <td><p>Intervalo recomendado: [1,2; 2,0]</p><p>Valor predefinido: 1,2</p></td>
     <td><p>Aumente este valor para atribuir maior peso à frequência dos termos na classificação dos documentos.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>Controla a intensidade da normalização do comprimento do documento para a pontuação BM25. Este parâmetro aplica-se apenas quando <code translate="no">metric_type</code> é <code translate="no">BM25</code>.</p></td>
     <td><p>Intervalo: [0, 1]</p><p>Valor predefinido: 0,75</p></td>
     <td><p>Utilize um valor mais elevado para aplicar uma normalização do comprimento mais forte. Utilize um valor mais baixo para reduzir o efeito do comprimento do documento na classificação.</p></td>
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
    </button></h3><p>A tabela seguinte apresenta os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/sparse-inverted-index.md#Search-on-index">efetuar uma pesquisa no índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>A proporção dos valores mais pequenos a ignorar durante a pesquisa, o que ajuda a reduzir o ruído.</p></td>
     <td><p>Intervalo: [0,0; 1,0) (por exemplo, 0,2 ignora os 20% dos valores mais pequenos)</p></td>
     <td><p>Ajuste este parâmetro com base na dispersão e no nível de ruído dos seus vetores de consulta.</p><p>Este parâmetro controla a proporção de valores de baixa magnitude que são descartados durante a pesquisa. Aumentar este valor (por exemplo, para <code translate="no">0.2</code>) pode reduzir o ruído e concentrar a pesquisa em componentes mais significativos, o que pode melhorar a precisão e a eficiência. No entanto, descartar mais valores também pode reduzir a recuperação, ao excluir sinais potencialmente relevantes. Escolha um valor que equilibre a recuperação e a precisão para a sua carga de trabalho.</p></td>
   </tr>
</table>
