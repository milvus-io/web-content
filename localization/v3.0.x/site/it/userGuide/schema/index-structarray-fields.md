---
id: index-structarray-fields.md
title: Campi dell'indice StructArray
summary: >-
  Creare indici sui sottocampi di StructArray prima di eseguire una ricerca
  vettoriale o di accelerare il filtraggio scalare. Per un campo StructArray, la
  destinazione dell'indice è un percorso di sottocampo, ad esempio
  chunks[emb_list_vector], chunks[emb] o chunks[section].
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">Campi dell'indice StructArray<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
<p>Questa pagina utilizza la raccolta <code translate="no">tech_articles</code> descritta in <a href="/docs/it/create-structarray-field.md">Creazione di un campo StructArray</a>. Il campo StructArray <code translate="no">chunks</code> contiene sottocampi scalari per il filtraggio e sottocampi vettoriali per la ricerca.</p>
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
    </button></h2><p>Assicurarsi che lo schema della raccolta contenga già il campo StructArray " <code translate="no">chunks</code> ". Riutilizzare il client inizializzato da " <a href="/docs/it/create-structarray-field.md">Crea un campo StructArray</a> " per il linguaggio selezionato (<code translate="no">cli</code> e <code translate="no">ctx</code> per Go, <code translate="no">client</code> per gli altri SDK). È possibile creare indici prima di inserire i dati.</p>
<table>
<thead>
<tr><th>Percorso del sottocampo</th><th>Tipo</th><th>Scopo dell’indice</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Ricerca in EmbeddingList con metriche " <code translate="no">MAX_SIM*</code> ".</td></tr>
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
<tr><td>Ricerca in EmbeddingList</td><td><code translate="no">chunks[emb_list_vector]</code></td><td>Una famiglia di metriche " <code translate="no">MAX_SIM*</code> ".</td></tr>
<tr><td>Ricerca vettoriale a livello di elemento</td><td><code translate="no">chunks[emb]</code></td><td>Una famiglia di metriche vettoriali regolari, come <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Filtra per stringa o categoria</td><td><code translate="no">chunks[section]</code></td><td>Un indice scalare supportato dalla destinazione.</td></tr>
<tr><td>Filtra per intervallo numerico</td><td><code translate="no">chunks[quality_score]</code>, <code translate="no">chunks[page]</code></td><td>Un indice scalare supportato dal target.</td></tr>
<tr><td>Filtra per valore booleano</td><td><code translate="no">chunks[has_code]</code></td><td>Un indice scalare supportato dal target.</td></tr>
</tbody>
</table>
<p>La ricerca EmbeddingList tratta i vettori presenti in un sottocampo vettoriale di StructArray come una lista di embedding e restituisce risultati a livello di entità. La ricerca a livello di elemento esamina ogni elemento di Struct in modo indipendente e può restituire l'offset dell'elemento corrispondente.</p>
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
    </button></h2><p>L'esempio seguente crea due indici vettoriali. Il primo indice utilizza una metrica di tipo « <code translate="no">MAX_SIM*</code> » per la ricerca EmbeddingList. Il secondo indice utilizza una metrica vettoriale standard per la ricerca a livello di elemento.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Map;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.COSINE)
                        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                        .extraParams(Map.of(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-number">200</span>))
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, index.NewHNSWIndex(entity.MaxSimCosine, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[emb]&quot;</span>, index.NewHNSWIndex(entity.COSINE, <span class="hljs-number">16</span>, <span class="hljs-number">200</span>)).WithIndexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::MaxSimCosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[emb]&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Hnsw)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
                .<span class="hljs-title function_ invoke__">extra_params</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;M&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()), (<span class="hljs-string">&quot;efConstruction&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())])),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_list_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::MAX_SIM_COSINE)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">emb_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    milvus::IndexType::HNSW, milvus::MetricType::COSINE)</span></span>;

emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_list_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;M&quot;</span>, <span class="hljs-string">&quot;16&quot;</span>);
emb_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;efConstruction&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);

milvus::CreateIndexRequest vector_request;
vector_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
vector_request.<span class="hljs-built_in">WithIndexes</span>({emb_list_index, emb_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(vector_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[emb]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">M</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">efConstruction</span>: <span class="hljs-number">200</span> },
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>, IndexType.Hnsw, MetricType.MaxSimCosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } },
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[emb]&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>, IndexType.Hnsw, MetricType.Cosine) { ExtraParams = { [<span class="hljs-string">&quot;M&quot;</span>] = <span class="hljs-number">16</span>, [<span class="hljs-string">&quot;efConstruction&quot;</span>] = <span class="hljs-number">200</span> } }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;chunks[emb_list_vector]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_list_max_sim&quot;,
            &quot;metricType&quot;: &quot;MAX_SIM_COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        },
        {
            &quot;fieldName&quot;: &quot;chunks[emb]&quot;,
            &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;params&quot;: { &quot;index_type&quot;: &quot;HNSW&quot;, &quot;M&quot;: &quot;16&quot;, &quot;efConstruction&quot;: &quot;200&quot; }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Avviso
Non creare un indice con metrica " <code translate="no">MAX_SIM*</code> " e un indice con metrica vettoriale standard sullo stesso sottocampo vettoriale. Se sono necessarie entrambe le modalità di ricerca, scrivere i vettori in due sottocampi vettoriali separati e creare un indice su ciascun sottocampo.</p>
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
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[section]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).indexType(IndexParam.IndexType.INVERTED)
                        .indexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).build(),
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;chunks[page]&quot;</span>).indexType(IndexParam.IndexType.STL_SORT)
                        .indexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[section]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[has_code]&quot;</span>, index.NewInvertedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks[page]&quot;</span>, index.NewSortedIndex()).WithIndexName(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[section]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Inverted),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
            IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks[page]&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_page_sort&quot;</span>).<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort),
        ])
        .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">section_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">has_code_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    milvus::IndexType::INVERTED)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">quality_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">page_index</span><span class="hljs-params">(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    milvus::IndexType::STL_SORT)</span></span>;

milvus::CreateIndexRequest scalar_request;
scalar_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>);
scalar_request.<span class="hljs-built_in">WithIndexes</span>({section_index, has_code_index, quality_index, page_index});

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(scalar_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[section]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[page]&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[section]&quot;</span>, <span class="hljs-string">&quot;chunks_section_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[has_code]&quot;</span>, <span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>, IndexType.Inverted),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>, <span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>, IndexType.StlSort),
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;chunks[page]&quot;</span>, <span class="hljs-string">&quot;chunks_page_sort&quot;</span>, IndexType.StlSort)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexParams&quot;: [
        { &quot;fieldName&quot;: &quot;chunks[section]&quot;, &quot;indexName&quot;: &quot;chunks_section_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[has_code]&quot;, &quot;indexName&quot;: &quot;chunks_has_code_inverted&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;INVERTED&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[quality_score]&quot;, &quot;indexName&quot;: &quot;chunks_quality_score_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } },
        { &quot;fieldName&quot;: &quot;chunks[page]&quot;, &quot;indexName&quot;: &quot;chunks_page_sort&quot;, &quot;params&quot;: { &quot;index_type&quot;: &quot;STL_SORT&quot; } }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Gli indici scalari sono facoltativi ma utili quando i sottocampi scalari di StructArray compaiono frequentemente nei filtri, come <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> o <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>.</p>
<h2 id="Applicable-metric-types" class="common-anchor-header">Tipi di metriche applicabili<button data-href="#Applicable-metric-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Per la ricerca EmbeddingList, scegliere la metrica <code translate="no">MAX_SIM*</code> corrispondente al confronto per vettore: <code translate="no">MAX_SIM_COSINE</code> (chiamata anche <code translate="no">MAX_SIM</code>), <code translate="no">MAX_SIM_IP</code> o <code translate="no">MAX_SIM_L2</code> per i vettori densi, e <code translate="no">MAX_SIM_HAMMING</code> o <code translate="no">MAX_SIM_JACCARD</code> per i vettori binari. Queste metriche confrontano le liste di embedding e restituiscono risultati a livello di entità. Per la ricerca a livello di elemento, utilizzare la metrica regolare corrispondente elencata di seguito.</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">Compatibilità delle metriche di indice<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare le tabelle seguenti per scegliere un tipo di indice e un tipo di metrica per un sottocampo vettoriale StructArray. Partire dalla destinazione, quindi scegliere la famiglia di metriche in base alla modalità di ricerca.</p>
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
    </button></h3><p>La ricerca EmbeddingList utilizza metriche di tip <code translate="no">MAX_SIM*</code>. Considera i vettori presenti in un sottocampo vettoriale StructArray come un elenco di embedding e restituisce risultati a livello di entità.</p>
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
    </button></h2><p>Dopo aver creato gli indici, descrivere gli indici della collezione o della lista per confermare che i percorsi dei sottocampi previsti siano stati indicizzati.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;String&gt; indexes = client.listIndexes(ListIndexesReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .build());
System.out.println(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexes, err := cli.ListIndexes(ctx, milvusclient.NewListIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexes)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">list_indexes</span>(ListIndexesRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, resp.<span class="hljs-title function_ invoke__">index_names</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::ListIndexesResponse list_resp;
status = client-&gt;<span class="hljs-built_in">ListIndexes</span>(milvus::<span class="hljs-built_in">ListIndexesRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>),
                            list_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; name : list_resp.<span class="hljs-built_in">IndexNames</span>()) {
    std::cout &lt;&lt; name &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexes = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(indexes);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> indexes = <span class="hljs-keyword">await</span> client.ListIndexesAsync(<span class="hljs-keyword">new</span> ListIndexesReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, indexes.IndexNames));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver creato sia l’indice vettoriale che quello scalare sopra indicati, la risposta dell’elenco dovrebbe contenere i seguenti nomi, in qualsiasi ordine. La formattazione dipende dall’SDK:</p>
<pre><code translate="no" class="language-plaintext">chunks_emb_list_max_sim
chunks_emb_cosine
chunks_section_inverted
chunks_has_code_inverted
chunks_quality_score_sort
chunks_page_sort
<button class="copy-code-btn"></button></code></pre>
<p>Eseguire il comando `describe` sull’indice ` <code translate="no">chunks_emb_cosine</code> ` creato in precedenza per verificarne il campo di destinazione e la configurazione. La struttura della risposta e la rappresentazione visualizzata variano a seconda dell’SDK.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> client.describeIndex(DescribeIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .indexName(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>)
        .build());
System.out.println(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

indexDesc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption(<span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(indexDesc.IndexType())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">describe_index</span>(DescribeIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>).<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>).<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">description</span> <span class="hljs-keyword">in</span> resp.<span class="hljs-title function_ invoke__">indexes</span>() {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, description);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::DescribeIndexResponse desc_resp;
status = client-&gt;<span class="hljs-built_in">DescribeIndex</span>(milvus::<span class="hljs-built_in">DescribeIndexRequest</span>()
                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                   .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>),
                               desc_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-keyword">throw</span> std::<span class="hljs-built_in">runtime_error</span>(status.<span class="hljs-built_in">Message</span>());
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; desc : desc_resp.<span class="hljs-built_in">Descs</span>()) {
    std::cout &lt;&lt; desc.<span class="hljs-built_in">FieldName</span>() &lt;&lt; <span class="hljs-string">&quot;: &quot;</span> &lt;&lt; desc.<span class="hljs-built_in">IndexName</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(index);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> index = <span class="hljs-keyword">await</span> client.DescribeIndexAsync(<span class="hljs-keyword">new</span> DescribeIndexReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    IndexName = <span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> description <span class="hljs-keyword">in</span> index.Indexes)
{
    Console.WriteLine(<span class="hljs-string">$&quot;<span class="hljs-subst">{description.FieldName}</span>: <span class="hljs-subst">{description.IndexName}</span>&quot;</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;indexName&quot;: &quot;chunks_emb_cosine&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>La risposta dell’elenco contiene i nomi degli indici; la risposta "describe" identifica <code translate="no">chunks[emb]</code> e la configurazione dell’indice. Controlla la risposta o lo stato per individuare eventuali errori prima di utilizzarla.</p>
<h2 id="Index-rules" class="common-anchor-header">Regole dell’indice<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><td>Utilizzare la sintassi del percorso per gli indici dei sottocampi.</td><td><code translate="no">chunks[emb]</code> are l'indice, non <code translate="no">emb</code> o <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Un sottocampo vettoriale accetta un solo indice.</td><td>Utilizzare sottocampi vettoriali separati se sono necessarie famiglie di metriche diverse.</td></tr>
<tr><td>Utilizzare le metriche <code translate="no">MAX_SIM*</code> per la ricerca in EmbeddingList.</td><td>I dati di query EmbeddingList richiedono un indice creato con una metrica <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td>Utilizzare metriche vettoriali regolari per la ricerca a livello di elemento.</td><td>La ricerca a livello di elemento utilizza dati di query vettoriali standard e metriche quali <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
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
<li><p>Riutilizzare un sottocampo vettoriale sia per le metriche <code translate="no">MAX_SIM*</code> che per quelle vettoriali regolari.</p></li>
<li><p>Dimenticare gli indici scalari per i filtri StructArray utilizzati intensamente.</p></li>
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
<li><p>Per eseguire una ricerca EmbeddingList a livello di entità o una ricerca vettoriale a livello di elemento, consultare <a href="/docs/it/basic-vector-search-with-structarray.md">Ricerca vettoriale di base con StructArray</a>.</p></li>
<li><p>Per filtrare i sottocampi scalari di StructArray durante la ricerca, consultare <a href="/docs/it/filtered-search-with-structarray.md">Ricerca filtrata con StructArray</a>.</p></li>
<li><p>Per esaminare i limiti relativi a indici e metriche, consultare <a href="/docs/it/structarray-limits.md">Limiti di StructArray</a>.</p></li>
</ol>
