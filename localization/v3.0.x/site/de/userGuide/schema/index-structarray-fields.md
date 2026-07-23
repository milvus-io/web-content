---
id: index-structarray-fields.md
title: StructArray-Felder indizieren
summary: >-
  Erstellen Sie Indizes für StructArray-Unterfelder, bevor Sie eine Vektorsuche
  durchführen oder die skalare Filterung beschleunigen. Bei einem
  StructArray-Feld ist das Indexziel ein Unterfeldpfad, beispielsweise
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
    </button></h2><p>Stellen Sie sicher, dass das Schema der Sammlung bereits das StructArray-Feld „ <code translate="no">chunks</code> “ enthält und Daten eingefügt wurden.</p>
<table>
<thead>
<tr><th>Unterfeldpfad</th><th>Typ</th><th>Zweck des Index</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Suche in der „EmbeddingList“ mit „ <code translate="no">MAX_SIM*</code> “-Metriken.</td></tr>
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
<tr><td>Suche in der „EmbeddingList“</td><td><code translate="no">chunks[emb_list_vector]</code></td><td>Eine „ <code translate="no">MAX_SIM*</code> “-Metrikfamilie.</td></tr>
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
<p>Warnung
Erstellen Sie keinen „ <code translate="no">MAX_SIM*</code> “-Index und keinen regulären Vektor-Metrik-Index für dasselbe Vektor-Unterfeld. Wenn beide Suchmodi erforderlich sind, schreiben Sie die Vektoren in zwei separate Vektor-Unterfelder und erstellen Sie für jedes Unterfeld einen eigenen Index.</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">Erstellen von Skalarindizes<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie skalare Indizes für skalare StructArray-Unterfelder, wenn Sie diese in Filtern verwenden. Verwenden Sie dabei dieselbe „ <code translate="no">structArray[subfield]</code> “-Pfadsyntax.</p>
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
<p>Skalare Indizes sind optional, aber nützlich, wenn skalare StructArray-Teilfelder häufig in Filtern vorkommen, wie z. B. „ <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> “ oder „ <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> “.</p>
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
    </button></h2><p>Beschreiben Sie nach dem Erstellen von Indizes die Sammlung oder listen Sie die Indizes auf, um sicherzustellen, dass die erwarteten Unterfeldpfade indiziert sind.</p>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch einen bestimmten Index beschreiben, sofern Ihre SDK-Version APIs zur Indexbeschreibung bereitstellt.</p>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
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
<tr><td>Verwenden Sie die Pfadsyntax für Unterfeldindizes.</td><td>Indexieren Sie „ <code translate="no">chunks[emb]</code> “, nicht „ <code translate="no">emb</code> “ oder „ <code translate="no">chunks.emb</code> “.</td></tr>
<tr><td>Ein Vektor-Unterfeld akzeptiert einen Index.</td><td>Verwenden Sie separate Vektor-Teilfelder, wenn Sie unterschiedliche Metrikfamilien benötigen.</td></tr>
<tr><td>Verwenden Sie „ <code translate="no">MAX_SIM*</code> “-Metriken für die EmbeddingList-Suche.</td><td>Für Abfragen in der „EmbeddingList“ sind Daten aus einem Index erforderlich, der mit einer „ <code translate="no">MAX_SIM*</code> “-Metrik erstellt wurde.</td></tr>
<tr><td>Verwenden Sie reguläre Vektormetriken für die Suche auf Elementebene.</td><td>Die Suche auf Elementebene verwendet reguläre Vektorabfragedaten und Metriken wie „ <code translate="no">COSINE</code> “, „ <code translate="no">IP</code> “ oder „ <code translate="no">L2</code> “.</td></tr>
<tr><td>Indizieren Sie skalare Unterfelder, die in Filtern vorkommen.</td><td>Verwenden Sie skalare Indizierungstypen, die von Ihrem Zielsystem unterstützt werden.</td></tr>
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
<li><p>Erstellen Sie nur einen „ <code translate="no">MAX_SIM*</code> “-Index und versuchen Sie dann, eine Suche auf Elementebene im selben Unterfeld durchzuführen.</p></li>
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
<li><p>Um eine „EmbeddingList“-Suche auf Entitätsebene oder eine Vektorsuche auf Elementebene durchzuführen, lesen Sie „Grundlegende Vektorsuche mit StructArray“.</p></li>
<li><p>Informationen zum Filtern von skalaren StructArray-Unterfeldern während der Suche finden Sie unter „Gefilterte Suche mit StructArray“.</p></li>
<li><p>Informationen zu Index- und Metrikgrenzen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Grenzwerte</a>“.</p></li>
</ol>
