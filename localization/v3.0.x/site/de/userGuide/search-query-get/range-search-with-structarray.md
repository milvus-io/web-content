---
id: range-search-with-structarray.md
title: Bereichssuche mit StructArray
summary: >-
  Auf dieser Seite können Sie eine Bereichssuche für Vektor-Unterfelder von
  StructArray durchführen. Die Bereichssuche liefert Vektor-Treffer, deren Wert
  oder Abstand innerhalb eines festgelegten Bereichs liegt. Für
  StructArray-Felder sollten Sie die Bereichssuche in Verbindung mit der
  Vektorsuche auf Elementebene verwenden, bei der jedes Struct-Element
  unabhängig durchsucht wird.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">Bereichssuche mit StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie diese Seite, um eine Bereichssuche in den Vektor-Unterfeldern eines StructArray durchzuführen. Die Bereichssuche liefert Vektor-Treffer, deren Wert oder Abstand innerhalb eines festgelegten Bereichs liegt. Bei StructArray-Feldern verwenden Sie die Bereichssuche in Verbindung mit der Vektorsuche auf Elementebene, bei der jedes Struct-Element unabhängig durchsucht wird.</p>
<p>Diese Seite verwendet die Sammlung „ <code translate="no">tech_articles</code> “ aus dem Abschnitt <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“. Die Sammlung enthält ein StructArray-Feld namens „ <code translate="no">chunks</code> “. Das Vektor-Unterfeld „ <code translate="no">chunks[emb]</code> “ ist für die Suche auf Elementebene mit einer regulären Vektormetrik wie „ <code translate="no">COSINE</code> “, „ <code translate="no">IP</code> “ oder „ <code translate="no">L2</code> “ indiziert.</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">Anwendung der Bereichssuche auf StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Suchmodus</th><th>Verhalten der Bereichssuche</th><th>Granularität der Ergebnisse</th></tr>
</thead>
<tbody>
<tr><td>Suche in „EmbeddingList“</td><td>Nicht unterstützt.</td><td>Nicht zutreffend.</td></tr>
<tr><td>Suche auf Elementebene</td><td>Verwenden Sie eine reguläre Vektorabfrage mit „ <code translate="no">radius</code> “ und optional „ <code translate="no">range_filter</code> “.</td><td>Ebene der Struktur-Elemente.</td></tr>
<tr><td>Hybride Suche</td><td>Wird unterstützt, wenn die StructArray-Anfrage auf ein Vektorfeld auf Elementebene abzielt. Anfragen auf EmbeddingList-Ebene unterstützen keine Bereichssuche.</td><td>Teilsuche auf Elementebene, anschließend hybrides Reranking.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Wenn Sie nur die nächstgelegenen Struct-Elemente benötigen, beginnen Sie mit <a href="/docs/de/basic-vector-search-with-structarray.md">der einfachen Vektorsuche mit StructArray</a>. Verwenden Sie die Bereichssuche, wenn das Ergebnis eine Score- oder Abstandsgrenze erfüllen muss, anstatt nur ein Top-K-Ranking.</p>
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
    </button></h2><p>Bereiten Sie die Sammlung, die Daten und die Indizes vor, bevor Sie die Bereichssuche ausführen.</p>
<table>
<thead>
<tr><th>Voraussetzung</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>StructArray-Feld</td><td>Die Sammlung enthält ein StructArray-Feld, z. B. „ <code translate="no">chunks</code> “.</td></tr>
<tr><td>Vektor-Unterfeld auf Elementebene</td><td>Das Ziel-Vektor-Unterfeld lautet „ <code translate="no">chunks[emb]</code> “, nicht „ <code translate="no">chunks[emb_list_vector]</code> “.</td></tr>
<tr><td>Indexmetrik</td><td>Das Vektor-Unterfeld wird mit einer regulären Vektormetrik indiziert, wie z. B. <code translate="no">COSINE</code>, <code translate="no">IP</code> oder <code translate="no">L2</code>.</td></tr>
<tr><td>Abfragedaten</td><td>Die Abfrage ist ein regulärer Vektor, kein „ <code translate="no">EmbeddingList</code> “.</td></tr>
</tbody>
</table>
<p>Informationen zur Indexeinrichtung finden Sie unter <a href="/docs/de/index-structarray-fields.md">„Index StructArray-Felder</a>“.</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">Verwenden Sie „radius“ und „range_filter“<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>Legen Sie „ <code translate="no">radius</code> “ fest, um die Suchgrenze zu definieren. Legen Sie „ <code translate="no">range_filter</code> “ fest, wenn Sie zusätzlich eine innere Grenze benötigen. Die Richtung hängt davon ab, ob eine geringere Entfernung oder ein höherer Ähnlichkeitswert bevorzugt wird.</p>
<table>
<thead>
<tr><th>Metriktyp</th><th>Ist ein höherer Wert besser?</th><th>Bereichsbedingung bei Verwendung von „ <code translate="no">range_filter</code> “</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Nein. Ein geringerer Abstand ist besser.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Ja. Ein höherer Score ist besser.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>Wenn nur „ <code translate="no">radius</code> “ festgelegt ist, liefert die Bereichssuche Treffer, die die äußere Grenze der Metrik erfüllen. Wählen Sie Werte entsprechend der Werteskala oder der Abstandsskala Ihrer Einbettungen aus.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">Bereichssuche auf Elementebene durchführen<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel sucht nach einzelnen Chunks, deren „ <code translate="no">chunks[emb]</code> “-Vektoren dem Abfragevektor ausreichend ähnlich sind. Jeder Treffer entspricht einem übereinstimmenden Struct-Element.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
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
<p>In diesem Beispiel ist „ <code translate="no">COSINE</code> “ eine Ähnlichkeitsmetrik, sodass der Ergebnisbereich größer als <code translate="no">radius</code> und kleiner oder gleich <code translate="no">range_filter</code> ist. Der Wert „ <code translate="no">offset</code> “ identifiziert das übereinstimmende Struct-Element im Array „ <code translate="no">chunks</code> “, wenn es zurückgegeben wird.</p>
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
    </button></h2><p>Sie können die Bereichssuche auf Elementebene mit der skalaren Filterung von `StructArray` kombinieren. Verwenden Sie ein Prädikat der obersten Ebene für Felder der übergeordneten Entität und nutzen Sie ` <code translate="no">element_filter</code> `, um einzuschränken, welche `Struct`-Elemente an der Vektorbereichssuche teilnehmen.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
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
<p>Das Prädikat auf oberster Ebene wählt Kandidatenentitäten aus. Das Prädikat „ <code translate="no">element_filter</code> “ beschränkt die Vektorbereichssuche auf übereinstimmende Struct-Elemente. Weitere Filterbeispiele finden Sie unter <a href="/docs/de/filtered-search-with-structarray.md">„Gefilterte Suche mit StructArray</a>“.</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">Verwenden Sie die Bereichssuche in der hybriden Suche<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Vektorfelder auf StructArray-Ebene unterstützen die Bereichssuche in der hybriden Suche. Fügen Sie „ <code translate="no">radius</code> “ und optional „ <code translate="no">range_filter</code> “ zur „ <code translate="no">AnnSearchRequest</code> “ hinzu, die auf das Vektorfeld auf StructArray-Ebene abzielt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel verwendet nur die Unteranfrage „ <code translate="no">chunks[emb]</code> “ Parameter für die Bereichssuche. Die StructArray-Anfrage folgt weiterhin der Semantik auf Elementebene: Die Bereichsgrenzen gelten für Struct-Element-Treffer, bevor die hybride Suche die Ergebnisse kombiniert und neu bewertet.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">Bereichsergebnisse interpretieren<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>Primärschlüssel der Entität, die das übereinstimmende Struct-Element enthält.</td></tr>
<tr><td><code translate="no">distance</code> oder Score</td><td>Die Punktzahl oder der Abstand zwischen dem Abfragevektor und dem Vektor des übereinstimmenden Struct-Elements.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Nullbasierte Position des übereinstimmenden Struct-Elements im StructArray-Feld bei der Rückgabe.</td></tr>
<tr><td>Wiederholte Primärschlüssel</td><td>Möglich. Mehr als ein Struct-Element in derselben Entität kann in den angegebenen Bereich fallen.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Gilt für Elementtreffer, nicht für eindeutige übergeordnete Entitäten.</td></tr>
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
<li><p>Verwenden Sie für die Bereichssuche in StructArray-Vektor-Unterfeldern keine „ <code translate="no">EmbeddingList</code> “-Abfrage oder die Metrik „ <code translate="no">MAX_SIM*</code> “. Die Suche auf „EmbeddingList“-Ebene unterstützt keine Bereichssuche.</p></li>
<li><p>Kombinieren Sie die Bereichssuche nicht mit einer Gruppierungssuche. Wenn Sie ein Ergebnis pro übergeordneter Entität benötigen, führen Sie eine Suche auf Elementebene ohne Bereichsparameter durch und verwenden Sie die Gruppierung, sofern diese unterstützt wird.</p></li>
<li><p>Die hybride Bereichssuche wird für Vektorfelder auf StructArray-Ebene unterstützt. Für StructArray-Anfragen auf „EmbeddingList“-Ebene wird sie nicht unterstützt.</p></li>
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
<li><p>Durchführung einer Bereichssuche auf „ <code translate="no">chunks[emb_list_vector]</code> “, das für die Suche auf „EmbeddingList“-Ebene vorgesehen ist.</p></li>
<li><p>Verwendung von „ <code translate="no">MAX_SIM_COSINE</code> “ anstelle einer regulären Metrik wie „ <code translate="no">COSINE</code> “ für die Bereichssuche auf Elementebene.</p></li>
<li><p>Verwendung einer „ <code translate="no">EmbeddingList</code> “-Abfrage anstelle einer regulären Vektorabfrage.</p></li>
<li><p>Die Erwartung, dass die Ergebnisse der Bereichssuche pro übergeordneter Entität eindeutig sind. Die Bereichssuche liefert Treffer, die mit Struct-Elementen übereinstimmen.</p></li>
<li><p>Verwendung von „ <code translate="no">chunks.emb</code> “ anstelle der erforderlichen Syntax für den Unterfeldpfad „ <code translate="no">chunks[emb]</code> “.</p></li>
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
<li><p>Um die beiden grundlegenden StructArray-Vektorsuchmodi kennenzulernen, lesen Sie <a href="/docs/de/basic-vector-search-with-structarray.md">„Grundlegende Vektorsuche mit StructArray</a>“.</p></li>
<li><p>Um der Bereichssuche skalare Filter hinzuzufügen, lesen Sie <a href="/docs/de/filtered-search-with-structarray.md">„Gefilterte Suche mit StructArray</a>“.</p></li>
<li><p>Um, sofern unterstützt, höchstens ein Ergebnis pro übergeordneter Entität zurückzugeben, lesen Sie <a href="/docs/de/grouping-search-with-structarray.md">„Gruppierte Suche mit StructArray</a>“.</p></li>
<li><p>Informationen zu versionsspezifischen Suchbeschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Beschränkungen</a>“.</p></li>
</ol>
