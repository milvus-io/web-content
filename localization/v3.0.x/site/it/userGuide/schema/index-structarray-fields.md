---
id: index-structarray-fields.md
title: Campi dell'StructArray per l'indicizzazione
summary: >-
  Creare indici sui sottocampi di StructArray prima di eseguire una ricerca
  vettoriale o di accelerare il filtraggio scalare. Per un campo StructArray,
  l'obiettivo dell'indice è un percorso di sottocampo, ad esempio
  chunks[emb_list_vector], chunks[emb] o chunks[section].
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">Campi dell'StructArray per l'indicizzazione<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Creare indici sui sottocampi di StructArray prima di eseguire una ricerca vettoriale o di accelerare il filtraggio scalare. Per un campo StructArray, la destinazione dell'indice è un percorso di sottocampo, ad esempio <code translate="no">chunks[emb_list_vector]</code>, <code translate="no">chunks[emb]</code> o <code translate="no">chunks[section]</code>.</p>
<p>Questa pagina utilizza la raccolta <code translate="no">tech_articles</code> descritta in <a href="/docs/it/create-structarray-field.md">Creare un campo StructArray</a>. Il campo StructArray <code translate="no">chunks</code> contiene sottocampi scalari per il filtraggio e sottocampi vettoriali per la ricerca.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Assicurarsi che lo schema della raccolta contenga già il campo StructArray " <code translate="no">chunks</code> " e che i dati siano stati inseriti.</p>
<table>
<thead>
<tr><th>Percorso del sottocampo</th><th>Tipo</th><th>Scopo dell’indice</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Ricerca EmbeddingList con metriche " <code translate="no">MAX_SIM*</code> ".</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Ricerca a livello di elemento con metriche vettoriali regolari.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>Filtraggio categoriale.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>Filtraggio numerico e predicati di tipo intervallo.</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>Filtraggio booleano.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Un campo vettoriale o un sottocampo vettoriale accetta un solo indice. Se sono necessarie sia la ricerca EmbeddingList che quella a livello di elemento, creare due sottocampi vettoriali distinti e indicizzarli separatamente. In questa pagina, <code translate="no">chunks[emb_list_vector]</code> è indicizzato per la ricerca EmbeddingList, mentre <code translate="no">chunks[emb]</code> è indicizzato per la ricerca a livello di elemento.</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">Scegliere gli indici<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizza la modalità di ricerca per scegliere la famiglia di metriche vettoriali.</p>
<table>
<thead>
<tr><th>Obiettivo della ricerca o del filtro</th><th>Percorso di destinazione</th><th>Cosa scegliere</th></tr>
</thead>
<tbody>
<tr><td>Ricerca EmbeddingList</td><td><code translate="no">chunks[emb_list_vector]</code></td><td>Una famiglia di metriche " <code translate="no">MAX_SIM*</code> ".</td></tr>
<tr><td>Ricerca vettoriale a livello di elemento</td><td><code translate="no">chunks[emb]</code></td><td>Una famiglia di metriche vettoriali regolari, come <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Filtra per stringa o categoria</td><td><code translate="no">chunks[section]</code></td><td>Un indice scalare supportato dalla destinazione.</td></tr>
<tr><td>Filtra per intervallo numerico</td><td><code translate="no">chunks[quality_score]</code>, <code translate="no">chunks[page]</code></td><td>Un indice scalare supportato dal target.</td></tr>
<tr><td>Filtra per valore booleano</td><td><code translate="no">chunks[has_code]</code></td><td>Un indice scalare supportato dal target.</td></tr>
</tbody>
</table>
<p>La ricerca EmbeddingList tratta i vettori presenti in un sottocampo vettoriale di StructArray come una lista di embedding e restituisce risultati a livello di entità. La ricerca a livello di elemento esegue la ricerca su ciascun elemento di Struct in modo indipendente e può restituire l'offset dell'elemento corrispondente.</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">Creazione di indici vettoriali<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente crea due indici vettoriali. Il primo indice utilizza una metrica " <code translate="no">MAX_SIM*</code> " per la ricerca EmbeddingList. Il secondo indice utilizza una metrica vettoriale standard per la ricerca a livello di elemento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index for EmbeddingList search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

<span class="hljs-comment"># Index for element-level search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Avviso
Non creare un indice con la metrica " <code translate="no">MAX_SIM*</code> " e un indice con una metrica vettoriale standard sullo stesso sottocampo vettoriale. Se sono necessarie entrambe le modalità di ricerca, scrivere i vettori in due sottocampi vettoriali separati e creare un indice su ciascun sottocampo.</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">Creare indici scalari<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare indici scalari sui sottocampi scalari di StructArray quando li si utilizza nei filtri. Utilizzare la stessa sintassi del percorso <code translate="no">structArray[subfield]</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[section]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[page]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Gli indici scalari sono facoltativi ma utili quando i sottocampi scalari di StructArray compaiono frequentemente nei filtri, come <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> o <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>.</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">Compatibilità delle metriche degli indici<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare le tabelle seguenti per scegliere un tipo di indice e un tipo di metrica per un sottocampo vettoriale di StructArray. Partire dall’obiettivo, quindi scegliere la famiglia di metriche in base alla modalità di ricerca.</p>
<p>Scegliere un tipo di indice Milvus e un tipo di metrica dalle seguenti tabelle di compatibilità.</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">Ricerca EmbeddingList<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>La ricerca EmbeddingList utilizza metriche di tipo <code translate="no">MAX_SIM*</code>. Tratta i vettori presenti in un sottocampo vettoriale StructArray come una lista di embedding e restituisce risultati a livello di entità.</p>
<table>
<thead>
<tr><th>Tipo di dati del sottocampo vettoriale</th><th>Tipo di indice</th><th>Tipo di metrica</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>, <code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">Ricerca a livello di elemento<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>La ricerca a livello di elemento utilizza metriche vettoriali standard. Esegue la ricerca su ciascun elemento della struttura in modo indipendente e può restituire l'offset dell'elemento corrispondente.</p>
<table>
<thead>
<tr><th>Tipo di dati del sottocampo vettoriale</th><th>Tipo di indice</th><th>Tipo di metrica</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">IVF_SQ_CC</code>, <code translate="no">IVF_PQ</code>, <code translate="no">SCANN</code>, <code translate="no">IVF_RABITQ</code>, <code translate="no">IVF_RABITQ_FASTSCAN</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code>, <code translate="no">SUBSTRUCTURE</code>, <code translate="no">SUPERSTRUCTURE</code>, <code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>Per il supporto specifico per versione e altre limitazioni, consultare <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p>
<h2 id="Verify-indexes" class="common-anchor-header">Verifica degli indici<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver creato gli indici, descrivere gli indici della collezione o dell’elenco per confermare che i percorsi dei sottocampi previsti siano indicizzati.</p>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<p>È inoltre possibile descrivere un indice specifico se la versione dell’SDK espone le API di descrizione degli indici.</p>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-rules" class="common-anchor-header">Regole degli indici<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><th>Regola</th><th>Spiegazione</th></tr>
</thead>
<tbody>
<tr><td>Utilizzare la sintassi del percorso per gli indici dei sottocampi.</td><td><code translate="no">chunks[emb]</code>, non <code translate="no">emb</code> o <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Un sottocampo vettoriale accetta un solo indice.</td><td>Utilizzare sottocampi vettoriali separati se sono necessarie famiglie di metriche diverse.</td></tr>
<tr><td>Utilizzare le metriche <code translate="no">MAX_SIM*</code> per la ricerca EmbeddingList.</td><td>I dati di query EmbeddingList richiedono un indice creato con una metrica <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td>Utilizzare metriche vettoriali standard per la ricerca a livello di elemento.</td><td>La ricerca a livello di elemento utilizza dati di query vettoriali regolari e metriche quali <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Indicizzare i sottocampi scalari che compaiono nei filtri.</td><td>Utilizzare i tipi di indice scalare supportati dalla destinazione.</td></tr>
<tr><td>Tenere presenti i limiti dei campi vettoriali.</td><td>Il numero totale di campi vettoriali e sottocampi vettoriali è limitato. Consultare Limiti di StructArray prima di aggiungere molti sottocampi vettoriali.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Errori comuni<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Creare un indice su <code translate="no">chunks.emb</code> invece che su <code translate="no">chunks[emb]</code>.</p></li>
<li><p>Creare solo un indice <code translate="no">MAX_SIM*</code> e poi tentare di eseguire una ricerca a livello di elemento sullo stesso sottocampo.</p></li>
<li><p>Creare solo un indice vettoriale regolare e poi tentare di eseguire una ricerca EmbeddingList sullo stesso sottocampo.</p></li>
<li><p>Riutilizzare un sottocampo vettoriale sia per le metriche di tipo " <code translate="no">MAX_SIM*</code> " che per quelle vettoriali standard.</p></li>
<li><p>Tralasciare gli indici scalari per i filtri StructArray utilizzati intensamente.</p></li>
<li><p>Indicizzazione di un sottocampo StructArray che non esiste nello schema Struct.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Prossimi passi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Per eseguire una ricerca EmbeddingList a livello di entità o una ricerca vettoriale a livello di elemento, consultare Ricerca vettoriale di base con StructArray.</p></li>
<li><p>Per filtrare i sottocampi scalari di StructArray durante la ricerca, consultare Ricerca filtrata con StructArray.</p></li>
<li><p>Per esaminare i limiti relativi a indici e metriche, consultare <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p></li>
</ol>
