---
id: array-of-structs.md
title: Visão geral do StructArray
summary: >-
  Utilize o StructArray quando uma entidade precisar de armazenar uma lista
  ordenada de elementos estruturados, como um documento com vários blocos, uma
  página com vários elementos visuais ou um vídeo com vários clipes. O
  StructArray mantém estes elementos dentro da entidade principal, permitindo,
  ao mesmo tempo, a pesquisa vetorial e a filtragem escalar nos campos dentro de
  cada elemento.
---
<h1 id="StructArray-Overview" class="common-anchor-header">Visão geral do StructArray<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize o StructArray quando uma entidade precisar de armazenar uma lista ordenada de elementos estruturados, tais como um documento com vários segmentos, uma página com vários elementos visuais ou um vídeo com vários clipes. O StructArray mantém estes elementos dentro da entidade principal, permitindo simultaneamente a pesquisa vetorial e a filtragem escalar nos campos dentro de cada elemento.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">O que é o StructArray?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Um <strong>StructArray</strong>, também conhecido como matriz de estruturas, armazena um conjunto ordenado de elementos Struct em cada entidade. Cada elemento Struct na matriz segue o mesmo esquema. Um elemento Struct pode conter subcampos escalares, subcampos vetoriais ou ambos.</p>
<p>Por exemplo, uma coleção pode armazenar um artigo como uma entidade e armazenar os seus fragmentos num campo StructArray denominado « <code translate="no">chunks</code> ». Cada fragmento pode incluir texto, metadados da secção, pontuações de qualidade e uma ou mais incorporações vetoriais.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Os dois subcampos vetoriais neste exemplo representam o mesmo fragmento a partir de duas perspetivas de pesquisa. « <code translate="no">chunks[emb_list_vector]</code> » destina-se à pesquisa «EmbeddingList» com métricas « <code translate="no">MAX_SIM*</code> », enquanto « <code translate="no">chunks[emb]</code> » se destina à pesquisa ao nível do elemento com métricas vetoriais regulares, tais como « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » ou « <code translate="no">L2</code> ».</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">Quando utilizar o StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize o StructArray quando a unidade natural que pretende devolver for maior do que a unidade natural que pretende pesquisar ou filtrar.</p>
<table>
<thead>
<tr><th>Caso de utilização</th><th>Por que é que o StructArray ajuda</th><th>Campo típico do StructArray</th></tr>
</thead>
<tbody>
<tr><td>Recuperação de documentos</td><td>Armazene um documento como uma entidade enquanto efetua a pesquisa nos seus fragmentos.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Recuperação com interação tardia</td><td>Armazene um documento ou uma página como uma lista de incorporações e atribua-lhe uma pontuação com o ` <code translate="no">MAX_SIM*</code>`.</td><td><code translate="no">chunks[emb_list_vector]</code> ou <code translate="no">patches[emb]</code></td></tr>
<tr><td>Recuperação ao nível do elemento</td><td>Retornar o fragmento, recorte, patch ou observação mais relevante, incluindo o seu deslocamento na matriz.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Filtragem estruturada</td><td>Filtre por subcampos escalares dentro de elementos Struct, tais como secção, pontuação, página ou sinalizadores.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Reduzir resultados duplicados de entidades pai</td><td>Manter os elementos filhos sob a mesma entidade pai, em vez de armazenar cada filho como uma linha separada.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Matriz de decisão<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize a seguinte matriz para escolher o caminho StructArray adequado.</p>
<table>
<thead>
<tr><th>Objetivo</th><th>Percurso recomendado</th><th>Granularidade do resultado</th><th>Comece aqui</th></tr>
</thead>
<tbody>
<tr><td>Modele um objeto pai com muitos filhos estruturados.</td><td>Crie um campo StructArray.</td><td>A entidade contém elementos Struct ordenados.</td><td><a href="/docs/pt/create-structarray-field.md">Criar um campo StructArray</a></td></tr>
<tr><td>Inserir registos pai com dados filhos aninhados.</td><td>Inserir entidades cujo campo StructArray seja uma lista de objetos Struct.</td><td>Inserção ao nível da entidade.</td><td><a href="/docs/pt/insert-data-into-structarray-fields.md">Inserir dados em campos «StructArray»</a></td></tr>
<tr><td>Executar ColBERT, ColPali ou recuperação de interação tardia ao nível do documento.</td><td>Utilizar a pesquisa EmbeddingList com um índice « <code translate="no">MAX_SIM*</code> ».</td><td>Nível de entidade.</td><td><a href="/docs/pt/search-with-embedding-lists.md">Pesquisar com listas de incorporação</a></td></tr>
<tr><td>Pesquise fragmentos, clipes ou partes individuais.</td><td>Utilize a pesquisa ao nível do elemento com uma métrica vetorial regular.</td><td>Nível de elemento Struct, com deslocamento, quando disponível.</td><td><a href="/docs/pt/basic-vector-search-with-structarray.md">Pesquisa vetorial básica com StructArray</a></td></tr>
<tr><td>Restringir a pesquisa vetorial ao nível do elemento aos elementos que correspondam a condições escalares.</td><td>Utilize ` <code translate="no">element_filter</code>`.</td><td>Filtragem ao nível do elemento; a forma do resultado depende do tipo de pesquisa.</td><td><a href="/docs/pt/filtered-search-with-structarray.md">Pesquisa filtrada com StructArray</a></td></tr>
<tr><td>Selecione entidades com base no número de elementos Struct que satisfazem uma condição.</td><td>Utilize <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> ou <code translate="no">MATCH_EXACT</code>.</td><td>Nível da entidade.</td><td><a href="/docs/pt/struct-array-operators.md">Operadores StructArray</a></td></tr>
<tr><td>Utilize limites de pontuação ou distância nos subcampos do vetor StructArray.</td><td>Utilize a pesquisa por intervalo ao nível do elemento.</td><td>Nível de elemento Struct.</td><td><a href="/docs/pt/range-search-with-structarray.md">Pesquisa por intervalo com StructArray</a></td></tr>
<tr><td>Retorne, no máximo, um resultado por entidade pai após a pesquisa ao nível do elemento.</td><td>Utilize a pesquisa agrupada por chave primária.</td><td>Nível de entidade após o agrupamento.</td><td><a href="/docs/pt/grouping-search-with-structarray.md">Pesquisa agrupada com StructArray</a></td></tr>
<tr><td>Combine a pesquisa de elementos do StructArray com outro campo vetorial.</td><td>Utilize uma pesquisa híbrida com um AnnSearchRequest direcionado a um subcampo vetorial do StructArray.</td><td>Subpesquisa ao nível do elemento, reclassificação ao nível da entidade.</td><td><a href="/docs/pt/hybrid-search-with-structarray.md">Pesquisa híbrida com StructArray</a></td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Compreender os dois modelos de pesquisa<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
    </button></h2><table>
  <thead>
    <tr>
      <th scope="col"><h3>Pesquisa EmbeddingList</h3></th>
      <th scope="col"><h3>Pesquisa ao nível do elemento</h3></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>A pesquisa EmbeddingList trata os vetores dentro de um subcampo de vetores do StructArray como uma lista de incorporação para a entidade pai. A consulta é também uma lista de incorporação. O Milvus compara a lista de incorporação da consulta com a lista de incorporação armazenada, utilizando uma métrica de « <code translate="no">MAX_SIM*</code> », e devolve as entidades correspondentes.</p>
        <ul>
          <li>Dados da consulta: lista de incorporação.</li>
          <li>Família de métricas: <code translate="no">MAX_SIM*</code>.</li>
          <li>Granularidade do resultado: nível da entidade.</li>
          <li>Ideal para: recuperação de interação tardia ao nível do documento ou da página.</li>
        </ul>
      </td>
      <td>
        <p>A pesquisa ao nível do elemento trata cada elemento Struct como um candidato independente à pesquisa vetorial. Cada resultado representa um elemento correspondente dentro do campo StructArray, e os resultados não agrupados podem revelar o deslocamento do elemento.</p>
        <ul>
          <li>Dados de consulta: vetor regular.</li>
          <li>Família de métricas: métricas de vetor regular.</li>
          <li>Granularidade dos resultados: nível do elemento Struct.</li>
          <li>Ideal para: recuperação ao nível de blocos, clipes ou fragmentos.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<div class="alert note">
<p>Aviso</p>
<p>Se a sua coleção necessitar tanto de pesquisa EmbeddingList como de pesquisa ao nível do elemento, utilize dois subcampos vetoriais separados. Um campo vetorial ou subcampo vetorial aceita apenas um índice, e os dois modos de pesquisa requerem famílias de métricas diferentes.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Mapa da documentação<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>A documentação do StructArray está dividida em páginas de modelação e páginas de pesquisa. Utilize as páginas de modelação para definir e preparar os dados. Utilize as páginas de pesquisa para escolher o comportamento adequado de recuperação e filtragem.</p>
<table>
<thead>
<tr><th>Área</th><th>Página</th><th>Utilize-a para</th></tr>
</thead>
<tbody>
<tr><td>Modelação</td><td><a href="/docs/pt/create-structarray-field.md">Criar um campo StructArray</a></td><td>Definir o esquema da estrutura e adicionar um campo StructArray.</td></tr>
<tr><td>Modelação</td><td><a href="/docs/pt/insert-data-into-structarray-fields.md">Inserir dados nos campos StructArray</a></td><td>Prepare e insira dados StructArray aninhados.</td></tr>
<tr><td>Modelação</td><td><a href="/docs/pt/index-structarray-fields.md">Indexar campos StructArray</a></td><td>Criar índices vetoriais e escalares nos subcampos do StructArray.</td></tr>
<tr><td>Referência</td><td><a href="/docs/pt/structarray-limits.md">Limites do StructArray</a></td><td>Verifique os limites do esquema, do tipo de dados, do índice, da pesquisa, do filtro e da versão.</td></tr>
<tr><td>Pesquisa</td><td><a href="/docs/pt/basic-vector-search-with-structarray.md">Pesquisa vetorial básica com StructArray</a></td><td>Compare a pesquisa com EmbeddingList e a pesquisa vetorial ao nível dos elementos.</td></tr>
<tr><td>Pesquisa</td><td><a href="/docs/pt/range-search-with-structarray.md">Pesquisa por intervalo com StructArray</a></td><td>Utilize restrições de intervalo com subcampos vetoriais do StructArray.</td></tr>
<tr><td>Pesquisa</td><td><a href="/docs/pt/grouping-search-with-structarray.md">Pesquisa agrupada com StructArray</a></td><td>Agrupar os resultados da pesquisa ao nível dos elementos por chave primária.</td></tr>
<tr><td>Pesquisa</td><td><a href="/docs/pt/hybrid-search-with-structarray.md">Pesquisa híbrida com StructArray</a></td><td>Combinar a pesquisa ao nível dos elementos do StructArray com outras pesquisas vetoriais.</td></tr>
<tr><td>Pesquisa</td><td><a href="/docs/pt/filtered-search-with-structarray.md">Pesquisa filtrada com StructArray</a></td><td>Utilize os filtros do StructArray na pesquisa, na consulta e na pesquisa híbrida.</td></tr>
<tr><td>Pesquisa</td><td><a href="/docs/pt/search-with-embedding-lists.md">Pesquisa com listas de incorporação</a></td><td>Crie sistemas de recuperação ao estilo ColBERT e ColPali com o StructArray.</td></tr>
<tr><td>Filtro</td><td><a href="/docs/pt/struct-array-operators.md">Operadores do StructArray</a></td><td>Sintaxe de referência para os operadores « <code translate="no">element_filter</code> » e « <code translate="no">MATCH_*</code> ».</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Limites-chave a verificar em primeiro lugar<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>O Struct pode ser utilizado como tipo de elemento de um campo Array. Não é utilizado como campo de coleção de nível superior.</p></li>
<li><p>Todos os elementos Struct no mesmo campo StructArray partilham um esquema predefinido.</p></li>
<li><p>Os subcampos «Vector» requerem índices. A pesquisa «EmbeddingList» utiliza métricas « <code translate="no">MAX_SIM*</code> », enquanto a pesquisa ao nível do elemento utiliza métricas «Vector» normais.</p></li>
<li><p><code translate="no">element_filter</code> e « <code translate="no">MATCH_*</code> » destinam-se a subcampos escalares dentro de campos «StructArray». Utilize « <code translate="no">$[subfield]</code> » apenas dentro destes operadores.</p></li>
<li><p>Algumas combinações de pesquisa estão sujeitas a restrições de versão ou são específicas de um modo. Verifique <a href="/docs/pt/structarray-limits.md">os Limites do StructArray</a> antes de recorrer à pesquisa por intervalo, pesquisa por agrupamento, pesquisa híbrida, campos nulos ou campos adicionados dinamicamente.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Próximos passos<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Para conceber um esquema, leia <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>».</p></li>
<li><p>Para preparar dados, leia <a href="/docs/pt/insert-data-into-structarray-fields.md">«Inserir dados em campos StructArray</a>».</p></li>
<li><p>Para escolher índices, leia <a href="/docs/pt/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para pesquisar subcampos vetoriais do StructArray, comece por <a href="/docs/pt/basic-vector-search-with-structarray.md">«Pesquisa vetorial básica com StructArray</a>».</p></li>
<li><p>Para filtrar subcampos escalares do StructArray, leia <a href="/docs/pt/struct-array-operators.md">«Operadores do StructArray</a> » e <a href="/docs/pt/filtered-search-with-structarray.md">«Pesquisa filtrada com StructArray</a>».</p></li>
</ol>
