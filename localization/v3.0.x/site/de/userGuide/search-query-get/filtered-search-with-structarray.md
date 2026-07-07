---
id: filtered-search-with-structarray.md
title: Gefilterte Suche mit StructArray
summary: >-
  Auf dieser Seite können Sie die Vektorsuche für StructArray-Felder um eine
  skalare Filterung erweitern. Die Filterung von StructArrays erfolgt auf zwei
  Ebenen: Filter auf Zeilenebene wählen übergeordnete Entitäten aus, während
  Filter auf Elementebene festlegen, welche Struct-Elemente an der Vektorsuche
  auf Elementebene teilnehmen.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">Gefilterte Suche mit StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie diese Seite, um die Vektorsuche in StructArray-Feldern um eine skalare Filterung zu erweitern. Die StructArray-Filterung erfolgt auf zwei Ebenen: Filter auf Zeilenebene wählen übergeordnete Entitäten aus, während Filter auf Elementebene festlegen, welche Struct-Elemente an der Vektorsuche auf Elementebene teilnehmen.</p>
<p>Diese Seite verwendet die Sammlung „ <code translate="no">tech_articles</code> “ aus dem Abschnitt <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“. Die Sammlung enthält ein StructArray-Feld namens „ <code translate="no">chunks</code> “ mit skalaren Unterfeldern wie „ <code translate="no">section</code> “, „ <code translate="no">page</code> “, „ <code translate="no">quality_score</code> “ und „ <code translate="no">has_code</code> “ sowie Vektor-Unterfeldern für die Suche.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">Wählen Sie einen Filtertyp<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>Ziel</th><th>Verwendung</th><th>Verhalten des Ergebnisses</th></tr>
</thead>
<tbody>
<tr><td>Filtern nach einem Skalarfeld der obersten Ebene, z. B. <code translate="no">category</code>.</td><td>Regulärer Filterausdruck.</td><td>Wählt übergeordnete Entitäten vor oder während der Suche aus.</td></tr>
<tr><td>Beschränkt die Vektorsuche auf Elementebene auf Struct-Elemente, die den skalaren Bedingungen entsprechen.</td><td><code translate="no">element_filter</code>.</td><td>Durchsucht nur übereinstimmende Struct-Elemente und kann Offsets der übereinstimmenden Elemente zurückgeben.</td></tr>
<tr><td>Wählt Entitäten danach aus, ob einige, alle oder eine bestimmte Anzahl von Struct-Elementen einem Prädikat entsprechen.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> oder <code translate="no">MATCH_EXACT</code>.</td><td>Filterung auf Zeilenebene. Diese Operatoren geben selbst keine Offsets zurück.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Auf dieser Seite wird erläutert, wie StructArray-Filter in Such-Workflows verwendet werden. Die vollständigen Syntaxregeln, unterstützte Prädikattypen und die Liste der nicht unterstützten Prädikate finden Sie unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">Filtern nach Feldern der obersten Ebene<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie reguläre Filterausdrücke, wenn die Bedingung sich auf die übergeordnete Entität bezieht und nicht auf ein einzelnes Struct-Element. Dies funktioniert sowohl bei der EmbeddingList-Suche als auch bei der Suche auf Elementebene.</p>
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
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Der obige Filter wählt nur Entitäten aus, deren Feld „ <code translate="no">category</code> “ auf oberster Ebene den Wert „ <code translate="no">&quot;search&quot;</code> “ hat. Er identifiziert kein einzelnes übereinstimmendes Struct-Element.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">Filter für die Vektorsuche auf Elementebene<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">element_filter(structArrayField, predicate)</code> “, wenn die skalaren Bedingungen für dasselbe Struct-Element gelten müssen, das an der Vektorsuche auf Elementebene beteiligt ist. Verwenden Sie innerhalb des Prädikats „ <code translate="no">$[subfield]</code> “, um auf skalare Unterfelder des aktuellen Struct-Elements zu verweisen.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>In diesem Beispiel wählt das Prädikat oberster Ebene „ <code translate="no">category == &quot;search&quot;</code> “ Kandidatenentitäten aus, und „ <code translate="no">element_filter</code> “ beschränkt die Vektorsuche auf Elementebene auf Blöcke, in denen „ <code translate="no">section</code> “, „ <code translate="no">quality_score</code> “ und „ <code translate="no">has_code</code> “ alle im selben Struct-Element übereinstimmen.</p>
<div class="alert note">
<p>Warnung</p>
<p>Wenn Sie ein Prädikat der obersten Ebene mit „ <code translate="no">element_filter</code> “ kombinieren, platzieren Sie „ <code translate="no">element_filter</code> “ am Ende des Ausdrucks. Ein Filterausdruck darf nur ein „ <code translate="no">element_filter</code> “ enthalten, und Sie können „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “ nicht innerhalb eines anderen „StructArray“-Operators verschachteln.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">Entitäten mit MATCH-Operatoren filtern<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie „ <code translate="no">MATCH_*</code> “-Operatoren, wenn der Filter anhand der Struct-Elemente entscheiden soll, ob eine übergeordnete Entität die Bedingungen erfüllt. Diese Operatoren sind Filter auf Zeilenebene: Sie wählen Entitäten aus, geben jedoch selbst keine Element-Offsets zurück.</p>
<table>
<thead>
<tr><th>Operator</th><th>Verwenden Sie ihn, wenn</th><th>Beispiel</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>Mindestens ein Struct-Element muss das Prädikat erfüllen.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>Alle Struct-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>Mindestens <code translate="no">N</code> -Struktur-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>Höchstens <code translate="no">N</code> Struct-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>Genau <code translate="no">N</code> Struct-Elemente müssen das Prädikat erfüllen.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>Verwenden Sie hier „ <code translate="no">MATCH_ANY</code> “, da das Suchergebnis von „EmbeddingList“ auf Entitätsebene erfolgt. Der Filter erfordert, dass mindestens ein Chunk in der Entität ein „ <code translate="no">&quot;index&quot;</code> “-Chunk mit hoher Qualität ist, das Suchergebnis selbst repräsentiert jedoch weiterhin die übergeordnete Entität.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">Verwenden Sie Filter in der hybriden Suche<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenden Sie in der hybriden Suche „StructArray“-Filter dort an, wo die Bedingung wirksam werden soll. Ein Filter auf oberster Ebene kann von der gesamten hybriden Suche gemeinsam genutzt werden. Ein „ <code translate="no">element_filter</code> “ sollte an die „StructArray“-Anfrage auf Elementebene angehängt werden, die Einschränkungen auf Elementebene erfordert.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>Das Argument „ <code translate="no">filter</code> “ wendet die Entitätsbedingung der obersten Ebene an, während „ <code translate="no">expr</code> “ auf „ <code translate="no">chunk_req</code> “ nur die Vektorabfrage auf StructArray-Ebene einschränkt. Informationen zu unterstützten Kombinationen der hybriden Suche und versionsspezifischen Einschränkungen finden Sie unter <a href="/docs/de/hybrid-search-with-structarray.md">„Hybride Suche mit StructArray“</a> und <a href="/docs/de/structarray-limits.md">„StructArray-Einschränkungen</a>“.</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">Zusammenfassung der Prädikatunterstützung<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie skalare Unterfelder in StructArray-Prädikaten. Vektor-Unterfelder sind keine Eingaben für skalare Prädikate.</p>
<table>
<thead>
<tr><th>Unterfeldtyp</th><th>Typische Prädikatbeispiele</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>Ganzzahltypen</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>Vektor-Teilfelder</td><td>Werden nicht als skalare Prädikate für „ <code translate="no">$[...]</code> “ unterstützt. Verwenden Sie stattdessen Vektor-Teilfelder über die Vektorsuche.</td></tr>
</tbody>
</table>
<p>Für nicht unterstützte Fälle wie JSON-Pfade, Array-Container-Funktionen, Textabgleichsfunktionen, Null-Prädikate auf ` <code translate="no">$[...]</code>`, Geometrie-Funktionen, `Timestamptz`-Ausdrücke und generische Funktionsaufrufe siehe <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p>
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
<li><p>Verwendung von „ <code translate="no">$[subfield]</code> “ außerhalb von „ <code translate="no">element_filter</code> “ oder „ <code translate="no">MATCH_*</code> “.</p></li>
<li><p>Verwendung von „ <code translate="no">chunks.section</code> “ anstelle der StructArray-Operatorsyntax wie z. B. „ <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code> “.</p></li>
<li><p>Verwendung von „ <code translate="no">element_filter</code> “, wenn nur eine Filterung auf Zeilenebene erforderlich ist. Verwenden Sie stattdessen „ <code translate="no">MATCH_ANY</code> “, wenn Sie lediglich Entitäten auswählen müssen.</p></li>
<li><p>Die Erwartung, dass ` <code translate="no">MATCH_*</code> ` Element-Offsets zurückgibt. Diese Operatoren wählen Entitäten aus und identifizieren selbst kein einzelnes übereinstimmendes Element.</p></li>
<li><p>Das Schreiben von bloßen booleschen Prädikaten wie „ <code translate="no">$[has_code]</code> “. Verwenden Sie explizite Vergleiche wie „ <code translate="no">$[has_code] == true</code> “.</p></li>
<li><p>„ <code translate="no">element_filter</code> “ vor einem Prädikat der obersten Ebene im selben Filterausdruck platzieren.</p></li>
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
<li><p>Um die vollständige StructArray-Filtersyntax nachzulesen, lesen Sie <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p></li>
<li><p>Um zunächst ungefilterte Vektorsuchen durchzuführen, lesen Sie <a href="/docs/de/basic-vector-search-with-structarray.md">„Grundlegende Vektorsuche mit StructArray</a>“.</p></li>
<li><p>Informationen zum Erstellen von Skalarindizes für häufig verwendete StructArray-Filter finden Sie unter <a href="/docs/de/index-structarray-fields.md">„StructArray-Felder indizieren</a>“.</p></li>
<li><p>Informationen zu versionsspezifischen Filter- und Suchbeschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Beschränkungen</a>“.</p></li>
</ol>
