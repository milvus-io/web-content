---
id: grouping-search-with-structarray.md
title: Gruppierung der Suche mit StructArray
summary: >-
  Verwenden Sie diese Seite, um Suchergebnisse auf StructArray-Ebene nach der
  übergeordneten Entität zu gruppieren. Bei der Suche auf Elementebene können
  mehrere Treffer derselben Entität zurückgegeben werden, wenn mehrere
  Struct-Elemente der Suchanfrage entsprechen. Durch die Gruppierung werden
  diese Elementtreffer zusammengefasst, sodass jede übergeordnete Entität
  höchstens einmal erscheint.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">Gruppierung der Suche mit StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie diese Seite, um Suchergebnisse auf StructArray-Ebene nach der übergeordneten Entität zu gruppieren. Bei der Suche auf Elementebene können mehrere Treffer derselben Entität zurückgegeben werden, wenn mehrere Struct-Elemente der Abfrage entsprechen. Durch die Gruppierung werden diese Elementtreffer zusammengefasst, sodass jede übergeordnete Entität höchstens einmal erscheint.</p>
<p>Diese Seite verwendet die Sammlung „ <code translate="no">tech_articles</code> “ aus dem Abschnitt <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“. Die Sammlung enthält ein StructArray-Feld namens „ <code translate="no">chunks</code> “. Das Vektor-Unterfeld „ <code translate="no">chunks[emb]</code> “ ist für die Suche auf Elementebene mit einer regulären Vektormetrik indiziert.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">Wie sich die Gruppierung auf StructArray auswirkt<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Suchmodus</th><th>Gruppierungsverhalten</th><th>Verhalten der Ergebnisse</th></tr>
</thead>
<tbody>
<tr><td>„EmbeddingList“-Suche</td><td>Nicht unterstützt.</td><td>Nicht zutreffend.</td></tr>
<tr><td>Suche auf Elementebene</td><td>Wird durch Gruppierung nach dem Primärschlüssel unterstützt.</td><td>Liefert höchstens ein Ergebnis pro übergeordneter Entität. Metadaten auf Elementebene bleiben erhalten, sodass der Index oder Offset des ausgewählten Elements zurückgegeben werden kann, wenn dieser über die API oder das SDK bereitgestellt wird.</td></tr>
<tr><td>Hybride Suche</td><td>Wird nur unterstützt, wenn alle Teilsuchen auf Vektorfelder auf Elementebene unter demselben StructArray-Feld abzielen.</td><td>Teilsuchen auf Elementebene werden vor der endgültigen Ergebnisverarbeitung nach Primärschlüssel gruppiert.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Verwenden Sie die Gruppierung, wenn eine nicht gruppierte Suche auf Elementebene zu viele doppelte übergeordnete Entitäten zurückgibt. Wenn Sie jedes übereinstimmende Struct-Element als einzelnen Treffer erhalten möchten, verwenden Sie <a href="/docs/de/basic-vector-search-with-structarray.md">die einfache Vektorsuche mit StructArray</a> ohne „ <code translate="no">group_by_field</code> “.</p>
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
    </button></h2><p>Bereiten Sie die Sammlung, die Daten und die Indizes vor, bevor Sie die gruppierte Suche ausführen.</p>
<table>
<thead>
<tr><th>Voraussetzung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>Vektor-Unterfeld auf Elementebene</td><td>Verwenden Sie ein StructArray-Vektor-Unterfeld wie beispielsweise „ <code translate="no">chunks[emb]</code> “, das mit einer regulären Vektormetrik indiziert ist.</td></tr>
<tr><td>Reguläre Vektorabfrage</td><td>Verwenden Sie einen regulären Abfragevektor, keinen „ <code translate="no">EmbeddingList</code> “.</td></tr>
<tr><td>Gruppierung nach Primärschlüssel</td><td>Verwenden Sie den Primärschlüssel der Sammlung als „ <code translate="no">group_by_field</code> “, z. B. „ <code translate="no">doc_id</code> “.</td></tr>
<tr><td>Keine Bereichsparameter</td><td>Kombinieren Sie die Gruppierungssuche nicht mit Bereichssuchparametern wie <code translate="no">radius</code> oder <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>Informationen zur Indexkonfiguration finden Sie unter <a href="/docs/de/index-structarray-fields.md">„Index StructArray-Felder</a>“.</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">Gruppierte Suche auf Elementebene durchführen<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel durchsucht zunächst einzelne Chunks und gruppiert anschließend die Elementtreffer anhand des Primärschlüssels der übergeordneten Entität.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Ohne Gruppierung kann dasselbe „ <code translate="no">doc_id</code> “ mehrfach erscheinen, wenn mehrere Chunks der Abfrage entsprechen. Mit „ <code translate="no">group_by_field=&quot;doc_id&quot;</code> “ erscheint jede übergeordnete Entität höchstens einmal. Durch die Gruppierung bleiben Metadaten auf Elementebene erhalten, sodass das gruppierte Ergebnis weiterhin den ausgewählten Struct-Element-Index oder -Offset enthalten kann, sofern die API oder das SDK diesen bereitstellt.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">Skalarfilter hinzufügen<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die Gruppierungssuche mit der skalaren Filterung von `StructArray` kombinieren. Verwenden Sie ` <code translate="no">element_filter</code> `, wenn die skalare Bedingung einschränken soll, welche `Struct`-Elemente an der Vektorsuche auf Elementebene teilnehmen.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Das Prädikat auf oberster Ebene wählt Kandidatenentitäten aus. Das Prädikat „ <code translate="no">element_filter</code> “ beschränkt die Vektorsuche auf Elementebene auf übereinstimmende Struct-Elemente. Die Gruppierung fasst dann die übereinstimmenden Elementtreffer anhand des Primärschlüssels zusammen.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Verwenden Sie die Gruppierung bei der hybriden Suche<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Die hybride Gruppierung mit „StructArray“ ist eine Funktion auf Elementebene. Sie wird nur unterstützt, wenn alle Teilsuchen auf Vektorfelder auf Elementebene unter demselben „StructArray“-Feld abzielen. Verwenden Sie keine Anfragen auf „EmbeddingList“-Ebene in einer gruppierten „StructArray“-Hybridsuche.</p>
<p>Das folgende Beispiel geht davon aus, dass das StructArray-Feld „ <code translate="no">chunks</code> “ zwei Vektor-Unterfelder auf Elementebene enthält, „ <code translate="no">chunks[emb]</code> “ und „ <code translate="no">chunks[code_emb]</code> “, und dass beide mit regulären Vektormetriken indiziert sind.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel zielen beide Unterabfragen auf Vektorfelder auf Elementebene unter demselben StructArray-Feld „ <code translate="no">chunks</code> “ ab. Eine Hybrid-Suche unterstützt keine Gruppierung auf Elementebene, wenn sie normale Vektorfelder, verschiedene StructArray-Felder oder Abfragen auf EmbeddingList-Ebene mischt.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">Gruppierte Ergebnisse interpretieren<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><th>Ergebniselement</th><th>Bedeutung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Primärschlüssel der gruppierten übergeordneten Entität.</td></tr>
<tr><td><code translate="no">distance</code> oder Wert</td><td>Wert oder Abstand des ausgewählten Struct-Elements für diese übergeordnete Entität.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Nullbasierte Position des ausgewählten Struct-Elements bei der Rückgabe.</td></tr>
<tr><td>Wiederholte Primärschlüssel</td><td>Bei einer Gruppierung nach dem Primärschlüssel nicht zu erwarten.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Gilt für gruppierte Ergebnisse der übergeordneten Entität.</td></tr>
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
<li><p>Die Gruppierungssuche gilt nur für die StructArray-Vektorsuche auf Elementebene. Die EmbeddingList-Suche und die hybride Suche auf EmbeddingList-Ebene unterstützen keine Gruppierung.</p></li>
<li><p>Verwenden Sie den Primärschlüssel als „ <code translate="no">group_by_field</code> “. Die Gruppierung auf StructArray-Ebene ist keine universelle Gruppierung nach beliebigen Skalarfeldern.</p></li>
<li><p>Kombinieren Sie die Gruppierungssuche nicht mit der Bereichssuche.</p></li>
<li><p>Verwenden Sie für die Gruppierungssuche keine „ <code translate="no">EmbeddingList</code> “-Abfrage oder eine „ <code translate="no">MAX_SIM*</code> “-Metrik.</p></li>
<li><p>Hybride Gruppierung wird nur unterstützt, wenn alle Teilsuchen auf Vektorfelder auf Elementebene unter demselben StructArray-Feld abzielen.</p></li>
<li><p>Die hybride Gruppierung wird nicht unterstützt, wenn die hybride Suche ein normales Vektorfeld, ein anderes StructArray-Feld oder eine Anforderung auf EmbeddingList-Ebene einbezieht.</p></li>
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
<li><p>Verwendung der Gruppierung mit „ <code translate="no">chunks[emb_list_vector]</code> “, das für die „EmbeddingList“-Suche vorgesehen ist.</p></li>
<li><p>Gruppierung nach einem Skalarfeld, das kein Primärschlüssel ist.</p></li>
<li><p>Gruppierung nach mehreren Feldern. Die StructArray-Gruppierung auf Elementebene unterstützt nur die Gruppierung nach Primärschlüsseln.</p></li>
<li><p>Die Erwartung, dass gruppierte Ergebnisse jedes übereinstimmende Struct-Element darstellen. Die Gruppierung liefert höchstens ein Ergebnis pro übergeordneter Entität.</p></li>
<li><p>Annahme, dass die gruppierte Suche auf Elementebene einen „ <code translate="no">MAX_SIM*</code> “-Score im Stil von „EmbeddingList“ neu berechnet. Die Gruppierung fasst Treffer auf Elementebene zusammen; sie ändert das Bewertungsmodell nicht.</p></li>
<li><p>Kombination von „ <code translate="no">group_by_field</code> “ mit „ <code translate="no">radius</code> “ oder „ <code translate="no">range_filter</code> “.</p></li>
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
<li><p>Um zunächst die ungegruppierte Suche auf Elementebene kennenzulernen, lesen Sie <a href="/docs/de/basic-vector-search-with-structarray.md">„Grundlegende Vektorsuche mit StructArray</a>“.</p></li>
<li><p>Um der gruppierten Suche skalare Filter hinzuzufügen, lesen Sie <a href="/docs/de/filtered-search-with-structarray.md">„Gefilterte Suche mit StructArray</a>“.</p></li>
<li><p>Um anstelle der Gruppierung Score- oder Distanzgrenzen zu verwenden, lesen Sie <a href="/docs/de/range-search-with-structarray.md">„Bereichssuche mit StructArray</a>“.</p></li>
<li><p>Um die Suchgrenzen von StructArray zu überprüfen, lesen Sie <a href="/docs/de/structarray-limits.md">„StructArray-Grenzen</a>“.</p></li>
</ol>
