---
id: basic-vector-search-with-structarray.md
title: Einfache Vektorsuche mit StructArray
summary: >-
  Auf dieser Seite können Sie eine Vektorsuche in Vektor-Unterfeldern innerhalb
  eines StructArray-Feldes durchführen. StructArray unterstützt zwei
  grundlegende Vektorsuchmodi: die „EmbeddingList“-Suche, bei der eine in jeder
  Entität gespeicherte Einbettungsliste ausgewertet wird, und die Suche auf
  Elementebene, bei der jedes Struct-Element unabhängig durchsucht wird.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Einfache Vektorsuche mit StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite können Sie eine Vektorsuche in Vektor-Unterfeldern innerhalb eines StructArray-Feldes durchführen. StructArray unterstützt zwei grundlegende Vektorsuchmodi: die EmbeddingList-Suche, bei der eine in jeder Entität gespeicherte Einbettungsliste ausgewertet wird, und die Suche auf Elementebene, bei der jedes Struct-Element unabhängig durchsucht wird.</p>
<p>Diese Seite verwendet die Sammlung „ <code translate="no">tech_articles</code> “ aus dem Abschnitt <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“. Die Sammlung enthält ein StructArray-Feld namens „ <code translate="no">chunks</code> “. Jeder Chunk enthält Text, skalare Metadaten, ein Vektor-Unterfeld namens „ <code translate="no">emb_list_vector</code> “ mit einem Index für die EmbeddingList-Suche sowie ein Vektor-Unterfeld namens „ <code translate="no">emb</code> “ mit einem Index für die Suche auf Elementebene.</p>
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
    </button></h2><p>Stellen Sie sicher, dass das Sammlungsschema, die Daten und die Indizes bereits vorbereitet sind.</p>
<table>
<thead>
<tr><th>Voraussetzung</th><th>Wo dies vorzubereiten ist</th></tr>
</thead>
<tbody>
<tr><td>Erstellen Sie ein StructArray-Feld, z. B. „ <code translate="no">chunks</code> “.</td><td><a href="/docs/de/create-structarray-field.md">Erstellen eines StructArray-Feldes</a></td></tr>
<tr><td>Fügen Sie Entitäten ein, deren Feld „ <code translate="no">chunks</code> “ Struct-Objekte enthält.</td><td><a href="/docs/de/insert-data-into-structarray-fields.md">Daten in „StructArray“-Felder einfügen</a></td></tr>
<tr><td>Erstellen Sie einen „ <code translate="no">MAX_SIM*</code> “-Index auf „ <code translate="no">chunks[emb_list_vector]</code> “ für die Suche in „EmbeddingList“.</td><td><a href="/docs/de/index-structarray-fields.md">StructArray-Felder indizieren</a></td></tr>
<tr><td>Erstellen Sie einen regulären vektormetrischen Index auf „ <code translate="no">chunks[emb]</code> “ für die Suche auf Elementebene.</td><td><a href="/docs/de/index-structarray-fields.md">StructArray-Felder indizieren</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Warnung</p>
<p>Ein Vektorfeld oder Vektor-Unterfeld akzeptiert nur einen Index. Wenn Sie sowohl die „EmbeddingList“-Suche als auch die Suche auf Elementebene benötigen, erstellen Sie zwei separate Vektor-Unterfelder. Auf dieser Seite wird „ <code translate="no">chunks[emb_list_vector]</code> “ für die „EmbeddingList“-Suche indiziert und „ <code translate="no">chunks[emb]</code> “ für die Suche auf Elementebene.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Wählen Sie einen Suchmodus<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>Aspekt</th><th>„EmbeddingList“-Suche</th><th>Suche auf Elementebene</th></tr>
</thead>
<tbody>
<tr><td>Ziel-Unterfeld</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Abfragedaten</td><td>Eine Einbettungsliste, die einen oder mehrere Vektoren enthält.</td><td>Ein regulärer Vektor.</td></tr>
<tr><td>Metrikfamilie</td><td><code translate="no">MAX_SIM*</code>, wie z. B. <code translate="no">MAX_SIM_COSINE</code>.</td><td>Reguläre Vektormetriken, wie z. B. <code translate="no">COSINE</code>, <code translate="no">IP</code> oder <code translate="no">L2</code>.</td></tr>
<tr><td>Was ein Treffer darstellt</td><td>Eine übereinstimmende Entität, deren StructArray-Vektor-Unterfeld der Einbettungsliste der Abfrage ähnelt.</td><td>Ein übereinstimmendes Struct-Element innerhalb des StructArray-Feldes.</td></tr>
<tr><td>Granularität der Ergebnisse</td><td>Entitäts-Ebene.</td><td>Struct-Element-Ebene.</td></tr>
<tr><td>Offset</td><td>Nicht zutreffend.</td><td>Gibt die Position des übereinstimmenden Struct-Elements bei der Rückgabe, beginnend bei Null, an.</td></tr>
<tr><td>Typische Verwendung</td><td>ColBERT, ColPali und andere Retrieval-Muster mit später Interaktion.</td><td>Retrieval auf Chunk-, Passage-, Clip-, Patch- oder Faktenebene.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">EmbeddingList-Suche ausführen<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die „EmbeddingList“-Suche, wenn die Abfrage selbst mehrere Vektoren enthält und das Ziel-StructArray-Vektor-Unterfeld mit einer „ <code translate="no">MAX_SIM*</code> “-Metrik indiziert ist. Das Ergebnis ist eine Übereinstimmung auf Entitätsebene.</p>
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
<p>In diesem Suchmodus steuert „ <code translate="no">limit</code> “, wie viele Entitäten für jede Abfrage zurückgegeben werden. Die Ausgabe kann StructArray-Unterfelder enthalten, aber der Treffer selbst repräsentiert die übereinstimmende übergeordnete Entität und nicht ein bestimmtes Struct-Element.</p>
<div class="alert note">
<p>Eine vollständige Anleitung im Stil von ColBERT oder ColPali finden Sie unter <a href="/docs/de/search-with-embedding-lists.md">„Suche mit Einbettungslisten</a>“. Diese Seite behandelt lediglich das grundlegende Suchverhalten von StructArray.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Suche auf Elementebene durchführen<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die Suche auf Elementebene, wenn jedes Struct-Element unabhängig an der Vektorsuche teilnehmen soll. Die Abfrage ist ein regulärer Vektor, und das Zielvektor-Unterfeld muss mit einer regulären Vektormetrik indiziert sein.</p>
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
<p>Bei der Suche auf Elementebene steht jeder Treffer für ein übereinstimmendes „Struct“-Element. Der Wert „ <code translate="no">offset</code> “ ist die nullbasierte Position dieses Elements im „StructArray“-Feld. Dieselbe Entität kann mehrmals vorkommen, wenn mehr als ein „Struct“-Element mit der Abfrage übereinstimmt. Der Wert „ <code translate="no">limit</code> “ bezieht sich auf Elementtreffer, nicht auf eindeutige übergeordnete Entitäten.</p>
<h2 id="Interpret-results" class="common-anchor-header">Ergebnisse interpretieren<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>Ergebniselement</th><th>„EmbeddingList“-Suche</th><th>Suche auf Elementebene</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Primärschlüssel der übereinstimmenden Entität.</td><td>Primärschlüssel der Entität, die das übereinstimmende Struct-Element enthält.</td></tr>
<tr><td><code translate="no">distance</code> oder Wert</td><td>Score oder Abstand zwischen der Abfrage-Einbettungsliste und der gespeicherten Einbettungsliste.</td><td>Score oder Abstand zwischen dem Abfragevektor und dem Vektor des übereinstimmenden Struct-Elements.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Nicht zutreffend.</td><td>Nullbasierte Position des übereinstimmenden Struct-Elements bei der Rückgabe.</td></tr>
<tr><td>Wiederholte Primärschlüssel</td><td>Bei einer einzelnen Abfrage nicht zu erwarten, da die Ergebnisse auf Entitätsebene vorliegen.</td><td>Möglich, da mehrere Struct-Elemente in derselben Entität übereinstimmen können.</td></tr>
<tr><td>Angeforderte StructArray-Ausgabefelder</td><td>Werden von der übereinstimmenden Entität zurückgegeben.</td><td>Werden mit der von der Ziel-API und dem SDK unterstützten Trefferform auf Elementebene zurückgegeben.</td></tr>
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
<li><p>Verwendung von „ <code translate="no">chunks.emb</code> “ anstelle der erforderlichen Syntax für den Unterfeldpfad „ <code translate="no">chunks[emb]</code> “.</p></li>
<li><p>Verwendung einer „EmbeddingList“-Abfrage für ein Vektor-Unterfeld, das mit einer regulären Vektormetrik indiziert ist.</p></li>
<li><p>Verwendung einer regulären Vektorabfrage für ein Vektor-Unterfeld, das mit einer „ <code translate="no">MAX_SIM*</code> “-Metrik indiziert ist.</p></li>
<li><p>Die Erwartung, dass die Suche auf Elementebene mit „ <code translate="no">limit</code> “ ebenso viele eindeutige übergeordnete Entitäten zurückgibt. Es werden Elementtreffer zurückgegeben.</p></li>
<li><p>Erwartung, dass die „EmbeddingList“-Suche einen bestimmten Element-Offset zurückgibt. Es werden Übereinstimmungen auf Entitätsebene zurückgegeben.</p></li>
<li><p>Wiederverwendung eines Vektor-Teilfelds für beide Suchmodi. Verwenden Sie separate Vektor-Teilfelder, da jedes Vektor-Teilfeld nur einen Index akzeptiert.</p></li>
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
<li><p>Um die Suche auf Elementebene durch skalare Bedingungen einzuschränken, lesen Sie <a href="/docs/de/filtered-search-with-structarray.md">„Gefilterte Suche mit StructArray</a>“.</p></li>
<li><p>Informationen zur Suche anhand von Score- oder Abstandsgrenzen finden Sie unter <a href="/docs/de/range-search-with-structarray.md">„Bereichssuche mit StructArray</a>“.</p></li>
<li><p>Um nach einer Suche auf Elementebene höchstens ein Ergebnis pro übergeordneter Entität zurückzugeben, lesen Sie <a href="/docs/de/grouping-search-with-structarray.md">„Gruppierte Suche mit StructArray</a>“.</p></li>
<li><p>Um die StructArray-Suche mit anderen Vektorsuchen zu kombinieren, lesen Sie <a href="/docs/de/hybrid-search-with-structarray.md">„Hybride Suche mit StructArray</a>“.</p></li>
<li><p>Informationen zu unterstützten Datentypen, Metriken, Filtern und versionsspezifischen Beschränkungen finden Sie unter <a href="/docs/de/structarray-limits.md">„StructArray-Beschränkungen</a>“.</p></li>
</ol>
