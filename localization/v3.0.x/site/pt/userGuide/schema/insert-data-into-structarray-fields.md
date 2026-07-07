---
id: insert-data-into-structarray-fields.md
title: Inserir dados nos campos StructArray
summary: >-
  Inserir dados num campo StructArray quando cada entidade contém uma lista
  ordenada de elementos estruturados. Na carga útil de inserção, um campo
  StructArray é representado como uma matriz de objetos. Cada objeto representa
  um elemento Struct e utiliza os nomes dos subcampos Struct definidos no
  esquema da coleção.
---
<h1 id="Insert-Data-into-StructArray-Fields" class="common-anchor-header">Inserir dados nos campos StructArray<button data-href="#Insert-Data-into-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Insira dados num campo StructArray quando cada entidade contiver uma lista ordenada de elementos estruturados. Na carga útil de inserção, um campo StructArray é representado como uma matriz de objetos. Cada objeto representa um elemento Struct e utiliza os nomes dos subcampos Struct definidos no esquema da coleção.</p>
<p>Esta página utiliza a coleção « <code translate="no">tech_articles</code> » da secção <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>». Cada entidade é um artigo técnico e o campo « <code translate="no">chunks</code> » armazena partes do artigo como elementos Struct.</p>
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
    </button></h2><p>Certifique-se de que o esquema da coleção já contém o campo StructArray « <code translate="no">chunks</code> ».</p>
<table>
<thead>
<tr><th>Campo</th><th>Tipo</th><th>Valor de inserção</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>ID do artigo.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Título do artigo.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Categoria do artigo.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Incorporação ao nível do artigo.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>Uma lista de objetos «chunk».</td></tr>
</tbody>
</table>
<p>Cada objeto em « <code translate="no">chunks</code> » deve seguir o esquema Struct.</p>
<table>
<thead>
<tr><th>Subcampo</th><th>Tipo</th><th>Valor a inserir</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Texto do chunk.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Nome da secção, como <code translate="no">index</code>, <code translate="no">search</code> ou <code translate="no">filter</code>.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Número da página ou posição lógica.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Pontuação ao nível do bloco.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Se o fragmento contém código.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Vetor criado para a pesquisa EmbeddingList.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Vetor criado para pesquisa ao nível do elemento.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Numa carga de inserção, « <code translate="no">chunks</code> » é um campo normal cujo valor é uma matriz de objetos «Struct». Dentro de cada objeto, utilize nomes de subcampos como « <code translate="no">text</code> » e « <code translate="no">emb</code> ». Utilize a sintaxe de caminho, como « <code translate="no">chunks[text]</code> » ou « <code translate="no">chunks[emb]</code> », apenas após a inserção, quando criar índices, executar pesquisas, criar filtros ou especificar campos de saída.</p>
</div>
<h2 id="Understand-the-insert-payload-shape" class="common-anchor-header">Compreender a estrutura da carga útil de inserção<button data-href="#Understand-the-insert-payload-shape" class="anchor-icon" translate="no">
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
    </button></h2><p>O valor de ` <code translate="no">chunks</code> ` é uma matriz de elementos `Struct`. Cada elemento é um objeto cujas chaves são nomes de subcampos.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.08</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.32</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.48</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.96</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.91</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.16</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.35</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.45</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.16</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.35</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.45</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">emb_list_vector</code> e <code translate="no">emb</code> são subcampos vetoriais separados, uma vez que suportam modos de pesquisa diferentes. A pesquisa EmbeddingList trata todos os vetores num campo StructArray como uma única lista de embeddings e devolve resultados ao nível da entidade com métricas <code translate="no">MAX_SIM*</code>. A pesquisa ao nível do elemento pesquisa cada elemento Struct de forma independente e pode devolver o deslocamento do elemento correspondente. Este exemplo armazena os mesmos valores vetoriais em ambos os campos por uma questão de simplicidade. Numa aplicação de produção, pode armazenar as mesmas incorporações em ambos os subcampos quando ambos os modos de pesquisa utilizam a mesma incorporação de blocos, ou armazenar incorporações diferentes quando os dois modos de pesquisa utilizam representações diferentes.</p>
<h2 id="Insert-rows" class="common-anchor-header">Inserir linhas<button data-href="#Insert-rows" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize « <code translate="no">client.insert()</code> » para inserir linhas que contenham valores StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

data = [
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.08</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.48</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.96</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.91</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">True</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
            },
        ],
    },
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.20</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.40</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.93</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">True</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.88</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
            },
        ],
    },
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Element-level search with offsets&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.33</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.37</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Element-level search can return the offset of the matched Struct element.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.95</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
            }
        ],
    },
]

result = client.insert(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=data,
)

<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-into-nullable-StructArray-fields" class="common-anchor-header">Inserir em campos StructArray nulos<button data-href="#Insert-into-nullable-StructArray-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Se o campo ` <code translate="no">chunks</code> ` for nulo, uma entidade pode definir todo o campo ` <code translate="no">chunks</code> ` como nulo. Em Python, utilize ` <code translate="no">None</code> ` para representar um valor nulo.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[
        {
            <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">10</span>,
            <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Article without chunks yet&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;draft&quot;</span>,
            <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.05</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.20</span>],
            <span class="hljs-string">&quot;chunks&quot;</span>: <span class="hljs-literal">None</span>,
        }
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Quando um campo StructArray nulo contém um valor StructArray válido, todos os subcampos desse valor devem ser nulos ou ter valores válidos. A inserção de uma entidade com alguns subcampos definidos como nulos e outros com valores válidos resulta num erro.</p>
<div class="alert note">
<p>Aviso
Os campos StructArray nulos estão disponíveis apenas no Milvus v3.0.x. Se adicionar dinamicamente um campo StructArray a uma coleção existente, o campo adicionado deve ser nulo, e as entidades existentes devem devolver « <code translate="no">null</code> » para o novo campo em todos os seus subcampos.</p>
</div>
<h2 id="Validate-inserted-data" class="common-anchor-header">Validar dados inseridos<button data-href="#Validate-inserted-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode consultar a coleção e devolver o campo StructArray ou os subcampos selecionados.</p>
<pre><code translate="no" class="language-python">rows = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
    <span class="hljs-built_in">print</span>(row)
<button class="copy-code-btn"></button></code></pre>
<p>Utilize caminhos de campo StructArray, tais como <code translate="no">chunks[text]</code>, apenas quando consultar, pesquisar, filtrar ou criar índices. As cargas de dados de inserção devem continuar a utilizar objetos aninhados em <code translate="no">chunks</code>.</p>
<h2 id="Insert-rules" class="common-anchor-header">Regras de inserção<button data-href="#Insert-rules" class="anchor-icon" translate="no">
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
<tr><th>Regra</th><th>Explicação</th></tr>
</thead>
<tbody>
<tr><td>Utilize uma matriz de objetos para um campo StructArray.</td><td>O valor de <code translate="no">chunks</code> é uma lista, e cada item da lista é um elemento Struct.</td></tr>
<tr><td>Utilize nomes de subcampos dentro de cada elemento Struct.</td><td>Insira « <code translate="no">{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}</code> » dentro de « <code translate="no">chunks</code> », e não em « <code translate="no">{&quot;chunks[text]&quot;: &quot;...&quot;}</code> ».</td></tr>
<tr><td>Respeite o esquema da Struct.</td><td>Cada elemento Struct deve utilizar os subcampos definidos no esquema Struct.</td></tr>
<tr><td>Respeite as dimensões do vetor.</td><td>Os valores dos vetores devem corresponder aos « <code translate="no">dim</code> » configurados para os seus subcampos vetoriais.</td></tr>
<tr><td>Respeitar o « <code translate="no">max_capacity</code> ».</td><td>O número de elementos Struct numa entidade não deve exceder o <code translate="no">max_capacity</code> do campo StructArray.</td></tr>
<tr><td>Utilize subcampos vetoriais separados para modos de pesquisa distintos.</td><td>Se forem necessárias tanto a pesquisa EmbeddingList como a pesquisa ao nível do elemento, escreva os valores do vetor em ambos os subcampos do vetor.</td></tr>
<tr><td>Utilize « <code translate="no">null</code> » apenas quando o campo for nulo.</td><td>Os campos StructArray não nulos exigem valores StructArray válidos.</td></tr>
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
<li><p>Utilizar caminhos de campo como <code translate="no">chunks[text]</code> em cargas de inserção.</p></li>
<li><p>Omitir subcampos obrigatórios de um elemento Struct.</p></li>
<li><p>Inserir vetores com a dimensão errada.</p></li>
<li><p>Inserir mais elementos Struct do que o permitido por <code translate="no">max_capacity</code>.</p></li>
<li><p>Definir apenas um subcampo como « <code translate="no">null</code> », enquanto outros subcampos no mesmo valor «StructArray» são válidos.</p></li>
<li><p>Gravar vetores apenas em ` <code translate="no">emb_list_vector</code> ` e, em seguida, tentar executar uma pesquisa ao nível do elemento em ` <code translate="no">chunks[emb]</code>`.</p></li>
<li><p>Gravar vetores apenas em « <code translate="no">emb</code> » e, em seguida, tentar executar uma pesquisa «EmbeddingList» em « <code translate="no">chunks[emb_list_vector]</code> ».</p></li>
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
<li><p>Para criar índices para os subcampos « <code translate="no">chunks[emb_list_vector]</code> », « <code translate="no">chunks[emb]</code> » e escalares, consulte <a href="/docs/pt/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para pesquisar subcampos vetoriais do StructArray, consulte «Pesquisa vetorial básica com StructArray».</p></li>
<li><p>Para rever o comportamento de valores nulos e as limitações específicas de cada versão, consulte <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p></li>
</ol>
