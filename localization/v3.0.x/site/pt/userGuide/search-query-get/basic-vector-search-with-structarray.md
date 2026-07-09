---
id: basic-vector-search-with-structarray.md
title: Pesquisa vetorial básica com StructArray
summary: >-
  Utilize esta página para efetuar uma pesquisa vetorial nos subcampos vetoriais
  dentro de um campo StructArray. O StructArray suporta dois modos básicos de
  pesquisa vetorial: a pesquisa EmbeddingList, que avalia uma lista de
  embeddings armazenada em cada entidade, e a pesquisa ao nível do elemento, que
  pesquisa cada elemento Struct de forma independente.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Pesquisa vetorial básica com StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize esta página para efetuar uma pesquisa vetorial em subcampos vetoriais dentro de um campo StructArray. O StructArray suporta dois modos básicos de pesquisa vetorial: a pesquisa EmbeddingList, que avalia uma lista de incorporações armazenada em cada entidade, e a pesquisa ao nível do elemento, que pesquisa cada elemento Struct de forma independente.</p>
<p>Esta página utiliza a coleção « <code translate="no">tech_articles</code> » da secção <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>». A coleção possui um campo StructArray denominado « <code translate="no">chunks</code> ». Cada chunk contém texto, metadados escalares, um subcampo vetorial denominado « <code translate="no">emb_list_vector</code> » com um índice para a pesquisa EmbeddingList e um subcampo vetorial denominado « <code translate="no">emb</code> » com um índice para a pesquisa ao nível do elemento.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de começar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Certifique-se de que o esquema da coleção, os dados e os índices já estão preparados.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Onde preparar</th></tr>
</thead>
<tbody>
<tr><td>Crie um campo StructArray, como <code translate="no">chunks</code>.</td><td><a href="/docs/pt/create-structarray-field.md">Criar um campo StructArray</a></td></tr>
<tr><td>Inserir entidades cujo campo « <code translate="no">chunks</code> » contenha objetos Struct.</td><td><a href="/docs/pt/insert-data-into-structarray-fields.md">Inserir dados nos campos StructArray</a></td></tr>
<tr><td>Crie um índice « <code translate="no">MAX_SIM*</code> » em « <code translate="no">chunks[emb_list_vector]</code> » para a pesquisa «EmbeddingList».</td><td><a href="/docs/pt/index-structarray-fields.md">Indexar campos StructArray</a></td></tr>
<tr><td>Criar um índice métrico vetorial regular em « <code translate="no">chunks[emb]</code> » para pesquisa ao nível do elemento.</td><td><a href="/docs/pt/index-structarray-fields.md">Indexar campos StructArray</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Aviso</p>
<p>Um campo vetorial ou subcampo vetorial aceita apenas um índice. Se precisar tanto da pesquisa EmbeddingList como da pesquisa ao nível do elemento, crie dois subcampos vetoriais separados. Nesta página, <code translate="no">chunks[emb_list_vector]</code> é indexado para a pesquisa EmbeddingList e <code translate="no">chunks[emb]</code> é indexado para a pesquisa ao nível do elemento.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Escolha um modo de pesquisa<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>Aspecto</th><th>Pesquisa na EmbeddingList</th><th>Pesquisa ao nível do elemento</th></tr>
</thead>
<tbody>
<tr><td>Subcampo de destino</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Dados da consulta</td><td>Uma lista de incorporação que contém um ou mais vetores.</td><td>Um vetor normal.</td></tr>
<tr><td>Família de métricas</td><td><code translate="no">MAX_SIM*</code>, como <code translate="no">MAX_SIM_COSINE</code>.</td><td>Métricas de vetores regulares, como <code translate="no">COSINE</code>, <code translate="no">IP</code> ou <code translate="no">L2</code>.</td></tr>
<tr><td>O que representa um resultado</td><td>Uma entidade correspondente cujo subcampo vetorial StructArray é semelhante à lista de embeddings da consulta.</td><td>Um elemento Struct correspondente dentro do campo StructArray.</td></tr>
<tr><td>Granularidade do resultado</td><td>Nível da entidade.</td><td>Nível do elemento Struct.</td></tr>
<tr><td>Deslocamento</td><td>Não aplicável.</td><td>Identifica a posição, com início em zero, do elemento Struct correspondente quando devolvido.</td></tr>
<tr><td>Utilização típica</td><td>ColBERT, ColPali e outros padrões de recuperação de interação tardia.</td><td>Recuperação ao nível do bloco, da passagem, do excerto, do fragmento ou do facto.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">Executar pesquisa EmbeddingList<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize a pesquisa EmbeddingList quando a própria consulta contiver vários vetores e o subcampo do vetor StructArray de destino estiver indexado com uma métrica de « <code translate="no">MAX_SIM*</code> ». O resultado é uma correspondência ao nível da entidade.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Neste modo de pesquisa, a « <code translate="no">limit</code> » controla quantas entidades são devolvidas para cada consulta. O resultado pode incluir subcampos «StructArray», mas o próprio resultado representa a entidade-pai correspondente, em vez de um elemento «Struct» específico.</p>
<div class="alert note">
<p>Para um guia passo a passo completo ao estilo ColBERT ou ColPali, consulte <a href="/docs/pt/search-with-embedding-lists.md">«Pesquisa com listas de incorporação</a>». Esta página aborda apenas o comportamento básico da pesquisa no StructArray.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Executar pesquisa ao nível do elemento<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize a pesquisa ao nível do elemento quando cada elemento Struct deva participar na pesquisa vetorial de forma independente. A consulta é um vetor normal, e o subcampo do vetor de destino deve ser indexado com uma métrica vetorial normal.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>Na pesquisa ao nível do elemento, cada resultado representa um elemento Struct correspondente. O valor « <code translate="no">offset</code> » é a posição, com início em zero, desse elemento no campo StructArray. A mesma entidade pode aparecer mais do que uma vez se mais do que um elemento Struct corresponder à consulta. O valor « <code translate="no">limit</code> » aplica-se aos resultados dos elementos, e não a entidades-pai únicas.</p>
<h2 id="Interpret-results" class="common-anchor-header">Interpretar resultados<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>Item de resultado</th><th>Pesquisa EmbeddingList</th><th>Pesquisa ao nível do elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Chave primária da entidade correspondente.</td><td>Chave primária da entidade que contém o elemento Struct correspondente.</td></tr>
<tr><td><code translate="no">distance</code> ou pontuação</td><td>Pontuação ou distância entre a lista de incorporações da consulta e a lista de incorporações armazenada.</td><td>Pontuação ou distância entre o vetor da consulta e o vetor do elemento Struct correspondente.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Não aplicável.</td><td>Posição, a partir de zero, do elemento Struct correspondente quando devolvido.</td></tr>
<tr><td>Chaves primárias repetidas</td><td>Não é esperado para uma única consulta, uma vez que os resultados são ao nível da entidade.</td><td>Possível, uma vez que vários elementos Struct na mesma entidade podem corresponder.</td></tr>
<tr><td>Campos de saída StructArray solicitados</td><td>Devolvidos a partir da entidade correspondente.</td><td>Devolvidos com a forma de correspondência ao nível do elemento suportada pela API e pelo SDK de destino.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Erros comuns<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Utilizar « <code translate="no">chunks.emb</code> » em vez da sintaxe de caminho de subcampo exigida « <code translate="no">chunks[emb]</code> ».</p></li>
<li><p>Utilizar uma consulta EmbeddingList num subcampo vetorial indexado com uma métrica vetorial normal.</p></li>
<li><p>Utilizar uma consulta vetorial normal num subcampo vetorial indexado com uma métrica « <code translate="no">MAX_SIM*</code> ».</p></li>
<li><p>Esperar que a pesquisa ao nível do elemento « <code translate="no">limit</code> » devolva esse número de entidades-pai únicas. Ela devolve resultados ao nível do elemento.</p></li>
<li><p>Esperar que a pesquisa «EmbeddingList» devolva um deslocamento específico de um elemento. Devolve correspondências ao nível da entidade.</p></li>
<li><p>Reutilizar um subcampo vetorial para ambos os modos de pesquisa. Utilize subcampos vetoriais separados, uma vez que cada subcampo vetorial aceita apenas um índice.</p></li>
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
<li><p>Para restringir a pesquisa ao nível do elemento por condições escalares, consulte <a href="/docs/pt/filtered-search-with-structarray.md">«Pesquisa filtrada com StructArray</a>».</p></li>
<li><p>Para pesquisar por limites de pontuação ou distância, leia <a href="/docs/pt/range-search-with-structarray.md">«Pesquisa por intervalo com StructArray</a>».</p></li>
<li><p>Para devolver, no máximo, um resultado por entidade pai após uma pesquisa ao nível do elemento, leia <a href="/docs/pt/grouping-search-with-structarray.md">«Pesquisa agrupada com StructArray</a>».</p></li>
<li><p>Para combinar a pesquisa com StructArray com outras pesquisas vetoriais, consulte <a href="/docs/pt/hybrid-search-with-structarray.md">«Pesquisa híbrida com StructArray</a>».</p></li>
<li><p>Para consultar os tipos de dados, métricas, filtros e limites específicos da versão suportados, leia <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p></li>
</ol>
