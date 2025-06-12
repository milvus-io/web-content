---
id: sparse-inverted-index.md
title: ÍNDICE_ESPARSO_INVERTIDO
summary: >-
  O índice SPARSE_INVERTED_INDEX é um tipo de índice utilizado pelo Milvus para
  armazenar e pesquisar eficazmente vectores esparsos. Este tipo de índice
  aproveita os princípios da indexação invertida para criar uma estrutura de
  pesquisa altamente eficiente para dados esparsos. Para obter mais informações,
  consulte INVERTED.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">ÍNDICE_ESPARSO_INVERTIDO<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <code translate="no">SPARSE_INVERTED_INDEX</code> é um tipo de índice utilizado pelo Milvus para armazenar e pesquisar eficazmente vectores esparsos. Este tipo de índice aproveita os princípios da indexação invertida para criar uma estrutura de pesquisa altamente eficiente para dados esparsos. Para obter mais informações, consulte <a href="/docs/pt/inverted.md">INVERTED</a>.</p>
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
    </button></h2><p>Para criar um índice <code translate="no">SPARSE_INVERTED_INDEX</code> num campo de vectores esparsos em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code> e outros parâmetros para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: A métrica usada para calcular a similaridade entre vetores esparsos. Valores válidos:</p>
<ul>
<li><p><code translate="no">IP</code> (Inner Product): Mede a similaridade usando o produto escalar.</p></li>
<li><p><code translate="no">BM25</code>: Normalmente usado para pesquisa de texto completo, com foco na similaridade textual.</p>
<p>Para obter mais detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a> e <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: O algoritmo utilizado para criar e consultar o índice. Valores válidos:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (padrão): Processamento optimizado de consultas Document-at-a-Time (DAAT) utilizando o algoritmo MaxScore. O MaxScore proporciona um melhor desempenho para valores <em>k</em> elevados ou consultas com muitos termos, ignorando termos e documentos que provavelmente terão um impacto mínimo. Consegue-o dividindo os termos em grupos essenciais e não essenciais com base nas suas pontuações máximas de impacto, concentrando-se nos termos que podem contribuir para os resultados do top-k.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Processamento optimizado de consultas DAAT utilizando o algoritmo WAND. O WAND avalia menos documentos atingidos, aproveitando as pontuações de impacto máximo para ignorar documentos não competitivos, mas tem uma sobrecarga mais elevada por hit. Isso torna o WAND mais eficiente para consultas com valores <em>k</em> pequenos ou consultas curtas, em que pular é mais viável.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Processamento de consultas Basic Term-at-a-Time (TAAT). Embora seja mais lento em comparação com <code translate="no">DAAT_MAXSCORE</code> e <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> oferece uma vantagem única. Ao contrário dos algoritmos DAAT, que utilizam pontuações de impacto máximo armazenadas em cache que permanecem estáticas independentemente das alterações ao parâmetro de recolha global (avgdl), o <code translate="no">TAAT_NAIVE</code> adapta-se dinamicamente a essas alterações.</p></li>
</ul>
<p>Para saber mais sobre os parâmetros de construção disponíveis para o índice <code translate="no">SPARSE_INVERTED_INDEX</code>, consulte <a href="/docs/pt/sparse-inverted-index.md#Index-building-params">Parâmetros de construção do índice</a>.</p></li>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice.</p>
<ul>
<li><code translate="no">drop_ratio_search</code>: Ajuste fino do desempenho da pesquisa especificando a proporção de pequenos valores vetoriais a serem ignorados durante o processo de pesquisa. Por exemplo, com <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code>, os 20% mais pequenos dos valores no vetor de consulta serão ignorados durante a pesquisa.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">SPARSE_INVERTED_INDEX</code>, consulte <a href="/docs/pt/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">Parâmetros de pesquisa específicos do índice</a>.</p></li>
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
    </button></h2><p>Esta secção fornece uma visão geral dos parâmetros utilizados para criar um índice e realizar pesquisas no índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice</h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/sparse-inverted-index.md#Build-index">construir um índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>O algoritmo utilizado para construir e consultar o índice. Determina como o índice processa as consultas.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (predefinição), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>Utilize <code translate="no">"DAAT_MAXSCORE"</code> para cenários com valores k elevados ou consultas com muitos termos, que podem beneficiar do facto de ignorar documentos não competitivos. 
 Escolha <code translate="no">"DAAT_WAND"</code> para consultas com valores k pequenos ou consultas curtas para aproveitar a omissão mais eficiente.</p>
<p>Utilize <code translate="no">"TAAT_NAIVE"</code> se for necessário um ajuste dinâmico às alterações da coleção (por exemplo, avgdl).</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/sparse-inverted-index.md#Search-on-index">pesquisar no índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de afinação</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>A proporção dos valores mais pequenos a ignorar durante a pesquisa, ajudando a reduzir o ruído.</p></td>
     <td><p>Fração entre 0,0 e 1,0 (por exemplo, 0,2 ignora os 20% mais pequenos dos valores)</p></td>
     <td><p>Ajuste este parâmetro com base na esparsidade e no nível de ruído dos seus vectores de consulta. Por exemplo, defini-lo como 0,2 pode ajudar a concentrar-se em valores mais significativos durante a pesquisa, melhorando potencialmente a precisão.</p></td>
   </tr>
</table>
