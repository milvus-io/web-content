---
id: hybrid-search-with-structarray.md
title: Hybridsuche mit StructArray
summary: >-
  Auf dieser Seite können Sie die StructArray-Vektorsuche mit anderen
  Vektorsuchen zu einer hybriden Suchanfrage kombinieren. Die
  StructArray-Hybridsuche kann je nach den kombinierten
  AnnSearchRequest-Objekten entweder Ergebnisse auf Entitätsebene oder auf
  Elementebene liefern.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Hybridsuche mit StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie diese Seite, um die StructArray-Vektorsuche mit anderen Vektorsuchen in einer hybriden Suchanfrage zu kombinieren. Die StructArray-Hybridsuche kann je nach den kombinierten „ <code translate="no">AnnSearchRequest</code> “-Objekten entweder Ergebnisse auf Entitätsebene oder auf Elementebene liefern.</p>
<p>Diese Seite verwendet die „ <code translate="no">tech_articles</code> “-Sammlung aus dem Abschnitt <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“. Die Sammlung enthält ein Vektorfeld auf oberster Ebene namens „ <code translate="no">title_vector</code> “ und ein StructArray-Feld namens „ <code translate="no">chunks</code> “. Das Unterfeld „ <code translate="no">chunks[emb_list_vector]</code> “ ist für die EmbeddingList-Suche indiziert, und „ <code translate="no">chunks[emb]</code> “ ist für die Suche auf Elementebene indiziert.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Anwendung der hybriden Suche auf „StructArray“<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> Kombination</th><th>Endgültiger Kandidatenbereich</th><th>Verhalten des Ergebnisses</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Vektorfeld auf Sammlungsebene + StructArray-Unterfeld „EmbeddingList“</td><td>Entitätsebene</td><td>Endgültige Kandidaten werden über den Primärschlüssel indiziert.</td><td>Nicht verwenden.</td></tr>
<tr><td>Vektorfeld auf Sammlungsebene + Unterfeld auf Elementebene von StructArray</td><td>Entitätsebene</td><td>Treffer auf Elementebene werden vor der hybriden Neureihung auf Kandidaten auf Entitätsebene zusammengefasst.</td><td>Optionale Zusammenfassungskonfiguration auf der StructArray-Elementebene <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Mehrere Unterfelder auf Elementebene unter demselben StructArray-Feld</td><td>Elementebene</td><td>Endgültige Kandidaten werden anhand des Primärschlüssels sowie des Struct-Element-Offsets indiziert.</td><td>Nicht verwenden.</td></tr>
<tr><td>Unterfelder auf Elementebene unter verschiedenen StructArray-Feldern</td><td>Entitätsebene</td><td>Element-Offsets haben keine gemeinsame Identität, daher wird jede StructArray-Element- <code translate="no">AnnSearchRequest</code> vor der Neureihung zusammengeklappt.</td><td>Optionale Konfiguration zum Zusammenklappen für jedes „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Elementebene.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Warnung</p>
<p>Verwenden Sie „ <code translate="no">element_scope</code> “ ausschließlich zur Konfiguration des Zusammenklappens für StructArray-Objekte auf Elementebene <code translate="no">AnnSearchRequest</code> bei einer hybriden Suche auf Elementebene mit nicht identischen Strukturen. Verwenden Sie diese Option nicht für EmbeddingList-Anfragen, Vektor-Anfragen auf Sammlungsebene oder hybride Suchen auf Elementebene mit identischen StructArray-Elementen.</p>
</div>
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
    </button></h2><p>Bereiten Sie die Sammlung, die Daten und die Indizes vor, bevor Sie die hybride Suche ausführen.</p>
<table>
<thead>
<tr><th>Voraussetzung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>StructArray-Feld</td><td>Die Sammlung enthält ein StructArray-Feld wie beispielsweise „ <code translate="no">chunks</code> “.</td></tr>
<tr><td>Vektor-Unterfelder</td><td>Verwenden Sie separate Vektor-Unterfelder für die Suche in der „EmbeddingList“ und die Suche auf Elementebene.</td></tr>
<tr><td>Indizes</td><td><code translate="no">chunks[emb_list_vector]</code> verwendet eine „ <code translate="no">MAX_SIM*</code> “-Metrik. „ <code translate="no">chunks[emb]</code> “ verwendet eine reguläre Vektormetrik wie beispielsweise „ <code translate="no">COSINE</code> “, „ <code translate="no">IP</code> “ oder „ <code translate="no">L2</code> “.</td></tr>
<tr><td>Reranker</td><td>Wählen Sie einen hybriden Reranker wie <code translate="no">RRFRanker</code> oder einen anderen von Ihrer Anwendung unterstützten Reranker.</td></tr>
</tbody>
</table>
<p>Informationen zur Indexeinrichtung finden Sie unter <a href="/docs/de/index-structarray-fields.md">„Index StructArray Fields</a>“.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Führen Sie eine hybride Suche mit einer „EmbeddingList“-Anfrage durch<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>Die „EmbeddingList“-Suche in einem StructArray-Vektor-Unterfeld erfolgt bei der hybriden Suche auf Entitätsebene. Sie verhält sich wie eine Vektorsuche auf Entitätsebene und gibt keinen einzelnen Offset eines übereinstimmenden Struct-Elements zurück.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel liefern beide „ <code translate="no">AnnSearchRequest</code> “-Objekte Kandidaten auf Entitätsebene. Das Endergebnis wird anhand des Primärschlüssels der übergeordneten Entität indiziert. Fügen Sie der „EmbeddingList“-Anfrage keine „ <code translate="no">element_scope</code> “-Angabe hinzu.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Führen Sie eine hybride Suche auf Elementebene mit demselben „StructArray“ durch<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn alle „ <code translate="no">AnnSearchRequest</code> “-Objekte auf Vektor-Unterfelder auf Elementebene unter demselben „StructArray“-Feld abzielen, kann die Hybrid-Suche durch eine Neureihung Kandidaten auf Elementebene beibehalten. Dies ist der einzige „StructArray“-Hybridmodus, bei dem die Endergebnisse auf Elementebene verbleiben.</p>
<p>Das folgende Beispiel geht davon aus, dass das StructArray-Feld „ <code translate="no">chunks</code> “ zwei Vektor-Unterfelder auf Elementebene enthält, „ <code translate="no">chunks[emb]</code> “ und „ <code translate="no">chunks[code_emb]</code> “, und dass beide reguläre Vektormetriken verwenden.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>Beide „ <code translate="no">AnnSearchRequest</code> “-Objekte durchsuchen die Vektor-Unterfelder unter „ <code translate="no">chunks</code> “. Derselbe nullbasierte Offset bezieht sich auf dasselbe Struct-Element, sodass der Hybrid-Reranker Elementkandidaten direkt bewerten kann. Setzen Sie „ <code translate="no">element_scope</code> “ in diesem Modus nicht, da keine Zusammenfassung auf Entitätsebene durchgeführt wird.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Zusammenfassung von Treffern auf Elementebene für die hybride Suche auf Entitätsebene<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn eine hybride Suche eine „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Ebene mit einer Vektorabfrage auf Sammlungsebene, einer „EmbeddingList“-Abfrage oder einer Abfrage auf Elementebene unter einem anderen StructArray-Feld kombiniert, liegt der endgültige Kandidatenbereich auf Entitätsebene. In diesem Fall wird jede „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Ebene vor der hybriden Neureihung auf Kandidaten auf Entitätsebene zusammengefasst.</p>
<p>Verwenden Sie „ <code translate="no">element_scope</code> “ innerhalb des „ <code translate="no">params</code> “ des StructArray-Element-Level-„ <code translate="no">AnnSearchRequest</code> “, wenn Sie steuern möchten, wie mehrere übereinstimmende Elemente derselben Entität zusammengefasst werden.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel ist „ <code translate="no">title_req</code> “ auf Entitätsebene, sodass das endgültige hybride Ergebnis ebenfalls auf Entitätsebene liegt. Die „ <code translate="no">chunk_req</code> “-Anfrage gibt zunächst Elementtreffer aus „ <code translate="no">chunks[emb]</code> “ zurück und fasst anschließend die zurückgegebenen Elemente derselben Entität zusammen, indem sie die drei besten Elementwerte addiert. Wird „ <code translate="no">element_scope</code> “ weggelassen, obwohl eine Zusammenfassung auf Entitätsebene erforderlich ist, wird standardmäßig die Zusammenfassungsstrategie „ <code translate="no">max</code> “ verwendet.</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Wählen Sie eine Zusammenfassungsstrategie<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Strategie</th><th>Verhalten</th><th><code translate="no">topk</code></th><th>Metrik-Anforderung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Beibehaltung der besten Elementbewertung für die Entität.</td><td>Nicht zulässig.</td><td>Jede unterstützte reguläre Vektormetrik.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Summe aller zurückgegebenen Elementbewertungen für die Entität.</td><td>Nicht zulässig.</td><td>Nur Metriken mit positiver Korrelation, wie z. B. „ <code translate="no">IP</code> “ oder „ <code translate="no">COSINE</code> “.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Durchschnitt aller zurückgegebenen Elementwerte für die Entität.</td><td>Nicht zulässig.</td><td>Jede unterstützte reguläre Vektormetrik.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Summe der besten „ <code translate="no">K</code> “-Bewertungen der zurückgegebenen Elemente für die Entität.</td><td>Erforderlich und muss positiv sein.</td><td>Nur Metriken mit positiver Korrelation, wie z. B. „ <code translate="no">IP</code> “ oder „ <code translate="no">COSINE</code> “.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Berechne den Durchschnitt der besten von „ <code translate="no">K</code> “ zurückgegebenen Elementbewertungen für die Entität.</td><td>Erforderlich und muss positiv sein.</td><td>Jede unterstützte reguläre Vektormetrik.</td></tr>
</tbody>
</table>
<p>„Collapse“ verwendet ausschließlich die Elementtreffer, die von der „ <code translate="no">AnnSearchRequest</code> “ auf StructArray-Ebene zurückgegeben werden. Es werden nach der ANN-Suche nicht alle Struct-Elemente in der Entität durchsucht. Stellen Sie die „ <code translate="no">limit</code> “ der Anfrage hoch genug ein, um die Elemente bereitzustellen, die Sie für „Collapse“ nutzen möchten.</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Filter, Bereichssuche und Gruppierung hinzufügen<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können „ <code translate="no">element_filter</code> “ an eine „StructArray“-Elementebene-„ <code translate="no">AnnSearchRequest</code> “ anhängen, wenn skalare Bedingungen auf dieselben „Struct“-Elemente angewendet werden sollen, die an der Vektorsuche teilnehmen. Sie können auch eine „ <code translate="no">filter</code> “ auf oberster Ebene für „ <code translate="no">hybrid_search()</code> “ verwenden, um Bedingungen für übergeordnete Entitäten festzulegen.</p>
<p>Vektorfelder auf StructArray-Ebene unterstützen die Bereichssuche bei der hybriden Suche. Fügen Sie „ <code translate="no">radius</code> “ und optional „ <code translate="no">range_filter</code> “ zur „ <code translate="no">AnnSearchRequest</code> “ auf Elementebene hinzu. StructArray-Anfragen auf „EmbeddingList“-Ebene unterstützen keine Bereichssuche.</p>
<p>Die hybride Gruppierung auf Elementebene wird nur unterstützt, wenn alle „ <code translate="no">AnnSearchRequest</code> “-Objekte auf Vektorfelder auf Elementebene unter demselben „StructArray“-Feld abzielen und „ <code translate="no">group_by_field</code> “ der Primärschlüssel sein muss. Die hybride Gruppierung wird nicht unterstützt, wenn die Abfrage Vektorfelder auf Sammlungsebene, verschiedene „StructArray“-Felder oder Abfragen auf „EmbeddingList“-Ebene mischt. Kombinieren Sie die Bereichssuche nicht mit einer Gruppierung.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Hybride Ergebnisse interpretieren<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Endgültiger Kandidatenbereich</th><th>Ergebnisschlüssel</th><th>Offset-Verhalten</th><th>Wann dies auftritt</th></tr>
</thead>
<tbody>
<tr><td>Entitätsebene</td><td>Primärschlüssel.</td><td>Kein Element-Offset im Endergebnis.</td><td>Die Hybridanfrage enthält ein Vektorfeld auf Sammlungsebene, eine „EmbeddingList“-Anfrage oder Anfragen auf Elementebene unter verschiedenen „StructArray“-Feldern.</td></tr>
<tr><td>Ebene der Elemente</td><td>Primärschlüssel plus übergeordnetes StructArray-Feld plus Element-Offset.</td><td>Der ausgewählte Element-Offset kann zurückgegeben werden, wenn er von der API oder dem SDK bereitgestellt wird.</td><td>Alle „ <code translate="no">AnnSearchRequest</code> “-Objekte befinden sich auf Elementebene und unter demselben „StructArray“-Feld.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Einschränkungen<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>Verwenden Sie „ <code translate="no">element_scope</code> “ ausschließlich für „ <code translate="no">AnnSearchRequest</code> “-Objekte auf StructArray-Ebene, die bei der hybriden Suche auf Kandidaten auf Entitätsebene reduziert werden müssen.</p></li>
<li><p>Verwenden Sie „ <code translate="no">element_scope</code> “ nicht für „EmbeddingList“-Anfragen, Vektor-Anfragen auf Sammlungsebene oder die hybride Suche auf Elementebene innerhalb desselben „StructArray“.</p></li>
<li><p><code translate="no">sum</code> Die Zusammenfassungsstrategien „ <code translate="no">topk_sum</code> “ und „ “ erfordern Metriken mit positiver Korrelation, wie beispielsweise „ <code translate="no">IP</code> “ oder „ <code translate="no">COSINE</code> “. Verwenden Sie diese nicht mit „ <code translate="no">L2</code> “.</p></li>
<li><p><code translate="no">topk_sum</code> und „ <code translate="no">topk_avg</code> “ erfordern einen positiven Wert für „ <code translate="no">topk</code> “. Andere Zusammenfassungsstrategien dürfen „ <code translate="no">topk</code> “ nicht enthalten.</p></li>
<li><p>StructArray-Anfragen auf „EmbeddingList“-Ebene unterstützen weder Bereichssuche noch „group-by“.</p></li>
<li><p>Hybride „group-by“-Anweisungen werden nur für hybride Suchvorgänge auf Elementebene desselben „StructArray“ und ausschließlich anhand des Primärschlüssels unterstützt.</p></li>
<li><p>Kombinieren Sie die Bereichssuche nicht mit „group-by“.</p></li>
</ul>
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
<li><p>Hinzufügen von „ <code translate="no">element_scope</code> “ zu einer hybriden Abfrage auf StructArray-Ebene mit identischen Elementen. Diese Abfrage bleibt auf Elementebene und führt keine Zusammenfassung auf Entitätsebene durch.</p></li>
<li><p>Hinzufügen von „ <code translate="no">element_scope</code> “ zu „ <code translate="no">chunks[emb_list_vector]</code> “. Die „EmbeddingList“-Suche erfolgt bereits auf Entitätsebene.</p></li>
<li><p>Annahme, dass zwei StructArray-Felder Element-Offsets gemeinsam nutzen. „Offset <code translate="no">3</code> “ in „ <code translate="no">chunks</code> “ und „Offset <code translate="no">3</code> “ in einem anderen StructArray-Feld beziehen sich auf unterschiedliche Elemente, sodass die Hybridanfrage auf Entitätsebene erfolgt.</p></li>
<li><p>Verwenden Sie „ <code translate="no">topk_sum</code> “ mit „ <code translate="no">L2</code> “. Verwenden Sie „ <code translate="no">max</code> “, „ <code translate="no">avg</code> “ oder „ <code translate="no">topk_avg</code> “ für negative Abstandsmetriken.</p></li>
<li><p>Es wird erwartet, dass hybride Ergebnisse auf Entitätsebene nach dem Zusammenklappen den ausgewählten Struct-Element-Offset enthalten.</p></li>
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
<li><p>Um die beiden grundlegenden Vektorsuchmodi von StructArray kennenzulernen, lesen Sie <a href="/docs/de/basic-vector-search-with-structarray.md">„Grundlegende Vektorsuche mit StructArray</a>“.</p></li>
<li><p>Um der hybriden Suche skalare Filter hinzuzufügen, lesen Sie <a href="/docs/de/filtered-search-with-structarray.md">„Gefilterte Suche mit StructArray</a>“.</p></li>
<li><p>Informationen zur Verwendung von Score- oder Distanzgrenzen bei der hybriden Suche finden Sie unter <a href="/docs/de/range-search-with-structarray.md">„Bereichssuche mit StructArray</a>“.</p></li>
<li><p>Um hybride Ergebnisse auf Elementebene nach übergeordneter Entität zu gruppieren, lesen Sie <a href="/docs/de/grouping-search-with-structarray.md">„Gruppierte Suche mit StructArray</a>“.</p></li>
<li><p>Um die Suchgrenzen von StructArray zu überprüfen, lesen Sie <a href="/docs/de/structarray-limits.md">„StructArray-Grenzen</a>“.</p></li>
</ol>
