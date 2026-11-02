---
id: index-structarray-fields.md
title: StructArray-Felder indizieren
summary: >-
  Erstellen Sie Indizes für StructArray-Unterfelder, bevor Sie eine Vektorsuche
  durchführen oder die skalare Filterung beschleunigen. Bei einem
  StructArray-Feld ist das Indexziel ein Unterfeldpfad, z. B.
  chunks[emb_list_vector], chunks[emb] oder chunks[section].
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">StructArray-Felder indizieren<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Erstellen Sie Indizes für StructArray-Unterfelder, bevor Sie eine Vektorsuche durchführen oder die skalare Filterung beschleunigen. Bei einem StructArray-Feld ist das Indexziel ein Unterfeldpfad, z. B. <code translate="no">chunks[emb_list_vector]</code>, <code translate="no">chunks[emb]</code> oder <code translate="no">chunks[section]</code>.</p>
<p>Auf dieser Seite wird die Sammlung „ <code translate="no">tech_articles</code> “ aus dem <a href="/docs/de/create-structarray-field.md">Abschnitt „Erstellen eines StructArray-Feldes“</a> verwendet. Das StructArray-Feld „ <code translate="no">chunks</code> “ enthält skalare Unterfelder für die Filterung und Vektor-Unterfelder für die Suche.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Stellen Sie sicher, dass das Sammlungsschema bereits das StructArray-Feld „ <code translate="no">chunks</code> “ enthält. Verwenden Sie den initialisierten Client aus <a href="/docs/de/create-structarray-field.md">„Create a StructArray Field“</a> für die von Ihnen gewählte Sprache (<code translate="no">cli</code> und <code translate="no">ctx</code> für Go, <code translate="no">client</code> für die anderen SDKs). Sie können Indizes erstellen, bevor Sie Daten einfügen.</p>
<table>
<thead>
<tr><th>Pfad zum Unterfeld</th><th>Typ</th><th>Zweck des Index</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Suche in „EmbeddingList“ mit „ <code translate="no">MAX_SIM*</code> “-Metriken.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Suche auf Elementebene mit regulären Vektormetriken.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>Kategorische Filterung.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>Numerische Filterung und Prädikate im Bereichsstil.</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>Boolesche Filterung.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Ein Vektorfeld oder Vektorunterfeld akzeptiert nur einen Index. Wenn Sie sowohl die „EmbeddingList“-Suche als auch die Suche auf Elementebene benötigen, erstellen Sie zwei separate Vektorunterfelder und indizieren Sie diese separat. Auf dieser Seite wird „ <code translate="no">chunks[emb_list_vector]</code> “ für die „EmbeddingList“-Suche indiziert und „ <code translate="no">chunks[emb]</code> “ für die Suche auf Elementebene.</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">Indizes auswählen<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie den Suchmodus, um die Vektormetrikfamilie auszuwählen.</p>
<table>
<thead>
<tr><th>Such- oder Filterziel</th><th>Zielpfad</th><th>Was Sie auswählen sollten</th></tr>
</thead>
<tbody>
<tr><td>Suche in der EmbeddingList</td><td><code translate="no">chunks[emb_list_vector]</code></td><td>Eine „ <code translate="no">MAX_SIM*</code> “-Metrikfamilie.</td></tr>
<tr><td>Vektorsuche auf Elementebene</td><td><code translate="no">chunks[emb]</code></td><td>Eine reguläre Vektormetrikfamilie, wie z. B. „ <code translate="no">COSINE</code> “, „ <code translate="no">IP</code> “ oder „ <code translate="no">L2</code> “.</td></tr>
<tr><td>Nach Zeichenfolge oder Kategorie filtern</td><td><code translate="no">chunks[section]</code></td><td>Ein von Ihrem Ziel unterstützter skalarer Index.</td></tr>
<tr><td>Nach numerischem Bereich filtern</td><td><code translate="no">chunks[quality_score]</code>, <code translate="no">chunks[page]</code></td><td>Ein von Ihrem Ziel unterstützter skalarer Index.</td></tr>
<tr><td>Nach boolescher Wert filtern</td><td><code translate="no">chunks[has_code]</code></td><td>Ein von Ihrem Zielobjekt unterstützter Skalarindex.</td></tr>
</tbody>
</table>
<p>Die „EmbeddingList“-Suche behandelt die Vektoren in einem StructArray-Vektor-Unterfeld als Einbettungsliste und gibt Ergebnisse auf Entitätsebene zurück. Die Suche auf Elementebene durchsucht jedes Struct-Element unabhängig und kann den Offset des übereinstimmenden Elements zurückgeben.</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">Vektorindizes erstellen<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Im folgenden Beispiel werden zwei Vektorindizes erstellt. Der erste Index verwendet eine „ <code translate="no">MAX_SIM*</code> “-Metrik für die „EmbeddingList“-Suche. Der zweite Index verwendet eine reguläre Vektormetrik für die Suche auf Elementebene.</p>
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
<p>Warnung
Erstellen Sie keinen „ <code translate="no">MAX_SIM*</code> “-Index und keinen regulären Vektor-Metrik-Index für dasselbe Vektor-Teilfeld. Wenn beide Suchmodi erforderlich sind, schreiben Sie die Vektoren in zwei separate Vektor-Teilfelder und erstellen Sie für jedes Teilfeld einen eigenen Index.</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">Erstellen Sie Skalarindizes<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie skalare Indizes für skalare StructArray-Unterfelder, wenn Sie diese in Filtern verwenden. Verwenden Sie dabei dieselbe Syntax für den Pfad „ <code translate="no">structArray[subfield]</code> “.</p>
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
<p>Skalare Indizes sind optional, aber nützlich, wenn skalare StructArray-Teilfelder häufig in Filtern vorkommen, wie z. B. bei „ <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> “ oder „ <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> “.</p>
<h2 id="Applicable-metric-types" class="common-anchor-header">Geeignete Metriktypen<button data-href="#Applicable-metric-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Für die Suche in „EmbeddingList“ wählen Sie die Metrik „ <code translate="no">MAX_SIM*</code> “, die dem Vergleich auf Vektor-Ebene entspricht: „ <code translate="no">MAX_SIM_COSINE</code> “ (auch „ <code translate="no">MAX_SIM</code> “ genannt), „ <code translate="no">MAX_SIM_IP</code> “ oder „ <code translate="no">MAX_SIM_L2</code> “ für dichte Vektoren sowie „ <code translate="no">MAX_SIM_HAMMING</code> “ oder „ <code translate="no">MAX_SIM_JACCARD</code> “ für binäre Vektoren. Diese Metriken vergleichen Einbettungslisten und liefern Ergebnisse auf Entitätsebene. Für die Suche auf Elementebene verwenden Sie die entsprechende reguläre Metrik, die unten aufgeführt ist.</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">Kompatibilität von Indexmetriken<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die folgenden Tabellen, um einen Indextyp und einen Metriktyp für ein StructArray-Vektor-Unterfeld auszuwählen. Beginnen Sie mit dem Ziel und wählen Sie dann die Metrikfamilie nach Suchmodus aus.</p>
<p>Wählen Sie einen Milvus-Indextyp und einen Metriktyp aus den folgenden Kompatibilitätstabellen aus.</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">„EmbeddingList“-Suche<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Die „EmbeddingList“-Suche verwendet „ <code translate="no">MAX_SIM*</code> “-Metriken. Sie behandelt die Vektoren in einem StructArray-Vektor-Unterfeld als Einbettungsliste und liefert Ergebnisse auf Entitätsebene.</p>
<table>
<thead>
<tr><th>Datentyp des Vektor-Unterfelds</th><th>Indextyp</th><th>Metriktyp</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>, <code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">Suche auf Elementebene<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Suche auf Elementebene verwendet reguläre Vektormetriken. Sie durchsucht jedes Struct-Element unabhängig und kann den Offset des übereinstimmenden Elements zurückgeben.</p>
<table>
<thead>
<tr><th>Datentyp des Vektor-Teilfelds</th><th>Indextyp</th><th>Metriktyp</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">IVF_SQ_CC</code>, <code translate="no">IVF_PQ</code>, <code translate="no">SCANN</code>, <code translate="no">IVF_RABITQ</code>, <code translate="no">IVF_RABITQ_FASTSCAN</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code>, <code translate="no">SUBSTRUCTURE</code>, <code translate="no">SUPERSTRUCTURE</code>, <code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>Informationen zu versionsspezifischem Support und weiteren Einschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Einschränkungen</a>“.</p>
<h2 id="Verify-indexes" class="common-anchor-header">Indizes überprüfen<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Beschreiben Sie nach dem Erstellen der Indizes die Indizes der Sammlung oder Liste, um sicherzustellen, dass die erwarteten Unterfeldpfade indiziert sind.</p>
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
<p>Nachdem Sie sowohl den Vektor- als auch den Skalarindex wie oben beschrieben erstellt haben, sollte die Liste der Rückmeldungen die folgenden Namen in beliebiger Reihenfolge enthalten. Die Formatierung hängt vom jeweiligen SDK ab:</p>
<pre><code translate="no" class="language-plaintext">chunks_emb_list_max_sim
chunks_emb_cosine
chunks_section_inverted
chunks_has_code_inverted
chunks_quality_score_sort
chunks_page_sort
<button class="copy-code-btn"></button></code></pre>
<p>Beschreiben Sie den oben erstellten „ <code translate="no">chunks_emb_cosine</code> “-Index, um dessen Zielfeld und Konfiguration zu überprüfen. Die Struktur der Antwort und die ausgegebene Darstellung unterscheiden sich je nach SDK.</p>
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
<p>Die Listenantwort enthält die Indexnamen; die „describe“-Antwort identifiziert „ <code translate="no">chunks[emb]</code> “ und die Indexkonfiguration. Überprüfen Sie die Antwort oder den Status auf Fehler, bevor Sie sie verwenden.</p>
<h2 id="Index-rules" class="common-anchor-header">Indexregeln<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><th>Regel</th><th>Erläuterung</th></tr>
</thead>
<tbody>
<tr><td>Verwenden Sie die Pfadsyntax für Unterfeld-Indizes.</td><td>Indizieren Sie „ <code translate="no">chunks[emb]</code> “, nicht „ <code translate="no">emb</code> “ oder „ <code translate="no">chunks.emb</code> “.</td></tr>
<tr><td>Ein Vektor-Unterfeld akzeptiert einen Index.</td><td>Verwenden Sie separate Vektor-Teilfelder, wenn Sie unterschiedliche Metrikfamilien benötigen.</td></tr>
<tr><td>Verwenden Sie „ <code translate="no">MAX_SIM*</code> “-Metriken für die EmbeddingList-Suche.</td><td>Für Abfragen in der „EmbeddingList“ sind Daten aus einem Index erforderlich, der mit einer „ <code translate="no">MAX_SIM*</code> “-Metrik erstellt wurde.</td></tr>
<tr><td>Verwenden Sie reguläre Vektormetriken für die Suche auf Elementebene.</td><td>Die Suche auf Elementebene verwendet reguläre Vektorabfragedaten und Metriken wie „ <code translate="no">COSINE</code> “, „ <code translate="no">IP</code> “ oder „ <code translate="no">L2</code> “.</td></tr>
<tr><td>Indizieren Sie skalare Unterfelder, die in Filtern vorkommen.</td><td>Verwenden Sie skalare Indextypen, die von Ihrem Zielsystem unterstützt werden.</td></tr>
<tr><td>Beachten Sie die Beschränkungen für Vektorfelder.</td><td>Die Gesamtzahl der Vektorfelder und Vektor-Teilfelder ist begrenzt. Lesen Sie den Abschnitt „StructArray-Grenzwerte“, bevor Sie viele Vektor-Teilfelder hinzufügen.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Häufige Fehler<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Erstellen eines Index auf „ <code translate="no">chunks.emb</code> “ anstelle von „ <code translate="no">chunks[emb]</code> “.</p></li>
<li><p>Erstellen Sie nur einen „ <code translate="no">MAX_SIM*</code> “-Index und versuchen Sie anschließend, eine Suche auf Elementebene im selben Unterfeld durchzuführen.</p></li>
<li><p>Nur einen regulären Vektorindex erstellen und anschließend versuchen, eine „EmbeddingList“-Suche auf demselben Unterfeld durchzuführen.</p></li>
<li><p>Wiederverwendung eines Vektor-Unterfelds sowohl für „ <code translate="no">MAX_SIM*</code> “- als auch für reguläre Vektormetriken.</p></li>
<li><p>Das Versäumen, skalare Indizes für häufig verwendete „StructArray“-Filter zu erstellen.</p></li>
<li><p>Indizierung eines StructArray-Unterfelds, das im Struct-Schema nicht vorhanden ist.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Um eine „EmbeddingList“-Suche auf Entitätsebene oder eine Vektorsuche auf Elementebene durchzuführen, lesen Sie <a href="/docs/de/basic-vector-search-with-structarray.md">„Grundlegende Vektorsuche mit StructArray</a>“.</p></li>
<li><p>Informationen zum Filtern von skalaren StructArray-Unterfeldern während der Suche finden Sie unter <a href="/docs/de/filtered-search-with-structarray.md">„Gefilterte Suche mit StructArray</a>“.</p></li>
<li><p>Informationen zu Index- und Metrikbeschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Beschränkungen</a>“.</p></li>
</ol>
