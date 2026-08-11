---
id: array-of-structs.md
title: StructArray – Überblick
summary: >-
  Verwenden Sie StructArray, wenn eine Entität eine geordnete Liste
  strukturierter Elemente speichern muss, beispielsweise ein Dokument mit vielen
  Abschnitten, eine Seite mit vielen visuellen Elementen oder ein Video mit
  vielen Clips. StructArray speichert diese Elemente innerhalb der
  übergeordneten Entität und ermöglicht dennoch die Vektorsuche sowie die
  skalare Filterung nach Feldern innerhalb jedes einzelnen Elements.
---
<h1 id="StructArray-Overview" class="common-anchor-header">StructArray – Überblick<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie StructArray, wenn eine Entität eine geordnete Liste strukturierter Elemente speichern muss, wie beispielsweise ein Dokument mit vielen Abschnitten, eine Seite mit vielen visuellen Elementen oder ein Video mit vielen Clips. StructArray speichert diese Elemente innerhalb der übergeordneten Entität und ermöglicht dennoch die Vektorsuche sowie die skalare Filterung nach Feldern innerhalb jedes Elements.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">Was ist StructArray?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein <strong>StructArray</strong>, auch als Array von Structs bezeichnet, speichert in jeder Entität eine geordnete Menge von Struct-Elementen. Jedes Struct-Element im Array folgt demselben Schema. Ein Struct-Element kann skalare Unterfelder, vektorielle Unterfelder oder beides enthalten.</p>
<p>Beispielsweise kann eine Sammlung einen Artikel als Entität speichern und dessen Chunks in einem StructArray-Feld namens „ <code translate="no">chunks</code> “ ablegen. Jeder Chunk kann Text, Abschnittsmetadaten, Qualitätsbewertungen und eine oder mehrere Vektor-Embeddings enthalten.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Die beiden Vektor-Unterfelder in diesem Beispiel repräsentieren denselben Chunk aus zwei Suchperspektiven. „ <code translate="no">chunks[emb_list_vector]</code> “ ist für die „EmbeddingList“-Suche mit „ <code translate="no">MAX_SIM*</code> “-Metriken vorgesehen, während „ <code translate="no">chunks[emb]</code> “ für die Suche auf Elementebene mit regulären Vektormetriken wie „ <code translate="no">COSINE</code> “, „ <code translate="no">IP</code> “ oder „ <code translate="no">L2</code> “ gedacht ist.</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">Wann sollte StructArray verwendet werden?<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie StructArray, wenn die natürliche Einheit, die Sie zurückgeben möchten, größer ist als die natürliche Einheit, nach der Sie suchen oder filtern möchten.</p>
<table>
<thead>
<tr><th>Anwendungsfall</th><th>Warum StructArray hilfreich ist</th><th>Typisches StructArray-Feld</th></tr>
</thead>
<tbody>
<tr><td>Dokumentenabruf</td><td>Speichern Sie ein Dokument als Entität, während Sie dessen Chunks durchsuchen.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Abruf bei späterer Interaktion</td><td>Speichern Sie ein Dokument oder eine Seite als Einbettungsliste und bewerten Sie es/sie mit „ <code translate="no">MAX_SIM*</code> “.</td><td><code translate="no">chunks[emb_list_vector]</code> oder <code translate="no">patches[emb]</code></td></tr>
<tr><td>Abruf auf Elementebene</td><td>Geben Sie den relevantesten Chunk, Clip, Patch oder die relevanteste Beobachtung zurück, einschließlich des Array-Offsets.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Strukturierte Filterung</td><td>Filtern Sie nach skalaren Unterfeldern innerhalb von „Struct“-Elementen, wie z. B. Abschnitt, Partitur, Seite oder Flags.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Reduzierung doppelter übergeordneter Ergebnisse</td><td>Behalten Sie untergeordnete Elemente unter derselben übergeordneten Entität bei, anstatt jedes untergeordnete Element als separate Zeile zu speichern.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Entscheidungsmatrix<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die folgende Matrix, um den richtigen StructArray-Pfad auszuwählen.</p>
<table>
<thead>
<tr><th>Ziel</th><th>Empfohlener Pfad</th><th>Granularität des Ergebnisses</th><th>Beginnen Sie hier</th></tr>
</thead>
<tbody>
<tr><td>Modellieren Sie ein übergeordnetes Objekt mit vielen strukturierten untergeordneten Objekten.</td><td>Erstellen Sie ein StructArray-Feld.</td><td>Die Entität enthält geordnete Struct-Elemente.</td><td><a href="/docs/de/create-structarray-field.md">Erstellen Sie ein StructArray-Feld</a></td></tr>
<tr><td>Fügen Sie übergeordnete Datensätze mit verschachtelten untergeordneten Daten ein.</td><td>Fügen Sie Entitäten ein, deren StructArray-Feld eine Liste von Struct-Objekten ist.</td><td>Einfügen auf Entitätsebene.</td><td><a href="/docs/de/insert-data-into-structarray-fields.md">Daten in „StructArray“-Felder einfügen</a></td></tr>
<tr><td>Führen Sie ColBERT, ColPali oder die späte Interaktionssuche auf Dokumentebene durch.</td><td>Verwenden Sie die EmbeddingList-Suche mit einem „ <code translate="no">MAX_SIM*</code> “-Index.</td><td>Entitäts-Ebene.</td><td><a href="/docs/de/search-with-embedding-lists.md">Suche mit Embedding-Listen</a></td></tr>
<tr><td>Durchsuchen Sie einzelne Chunks, Clips oder Patches.</td><td>Verwenden Sie die Suche auf Elementebene mit einer regulären Vektormetrik.</td><td>Strukturelementebene, mit Offset, sofern verfügbar.</td><td>Einfache Vektorsuche mit StructArray</td></tr>
<tr><td>Beschränken Sie die Vektorsuche auf Elementebene auf Elemente, die skalaren Bedingungen entsprechen.</td><td>Verwenden Sie „ <code translate="no">element_filter</code> “.</td><td>Filterung auf Elementebene; die Form des Ergebnisses hängt vom Suchtyp ab.</td><td>Gefilterte Suche mit StructArray</td></tr>
<tr><td>Wählen Sie Entitäten danach aus, wie viele Struct-Elemente eine Bedingung erfüllen.</td><td>Verwenden Sie „ <code translate="no">MATCH_ANY</code> “, „ <code translate="no">MATCH_ALL</code> “, „ <code translate="no">MATCH_LEAST</code> “, „ <code translate="no">MATCH_MOST</code> “ oder „ <code translate="no">MATCH_EXACT</code> “.</td><td>Entitäts-Ebene.</td><td><a href="/docs/de/struct-array-operators.md">StructArray-Operatoren</a></td></tr>
<tr><td>Verwenden Sie Score- oder Distanzgrenzen für StructArray-Vektor-Teilfelder.</td><td>Verwenden Sie die Bereichssuche auf Elementebene.</td><td>Struct-Elementebene.</td><td>Bereichssuche mit StructArray</td></tr>
<tr><td>Geben Sie nach der Suche auf Elementebene höchstens ein Ergebnis pro übergeordneter Entität zurück.</td><td>Verwenden Sie die Gruppierungssuche nach Primärschlüssel.</td><td>Entitätsebene nach der Gruppierung.</td><td>Gruppierte Suche mit StructArray</td></tr>
<tr><td>Kombinieren Sie die StructArray-Element-Suche mit einem anderen Vektorfeld.</td><td>Verwenden Sie eine hybride Suche mit einem AnnSearchRequest, der auf ein StructArray-Vektor-Unterfeld abzielt.</td><td>Teilsuche auf Elementebene, Neuordnung auf Entitätsebene.</td><td>Hybride Suche mit StructArray</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Die beiden Suchmodelle verstehen<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
<tr><th>### EmbeddingList-Suche Bei der EmbeddingList-Suche werden die Vektoren innerhalb eines StructArray-Vektor-Unterfelds als eine Embedding-Liste für die übergeordnete Entität behandelt. Die Abfrage ist ebenfalls eine Embedding-Liste. Milvus vergleicht die Embedding-Liste der Abfrage mit der gespeicherten Embedding-Liste unter Verwendung einer „ <code translate="no">MAX_SIM*</code> “-Metrik und gibt übereinstimmende Entitäten zurück. - Abfragedaten: Embedding-Liste. - Metrikfamilie: „ <code translate="no">MAX_SIM*</code> “. - Ergebnisgranularität: Entitätsebene. - Am besten geeignet für: Abruf mit später Interaktion auf Dokument- oder Seitenebene.</th><th>### Suche auf Elementebene Bei der Suche auf Elementebene wird jedes Struct-Element als eigenständiger Kandidat für die Vektorsuche behandelt. Jeder Treffer stellt ein übereinstimmendes Element innerhalb des StructArray-Feldes dar, und bei nicht gruppierten Ergebnissen kann der Element-Offset angezeigt werden. - Abfragedaten: regulärer Vektor. - Metrikfamilie: reguläre Vektormetriken. - Ergebnisgranularität: Struct-Element-Ebene. - Am besten geeignet für: Abruf auf Chunk-, Clip- oder Patch-Ebene.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>Warnung</p>
<p>Wenn Ihre Sammlung sowohl die „EmbeddingList“-Suche als auch die Suche auf Elementebene benötigt, verwenden Sie zwei separate Vektor-Unterfelder. Ein Vektorfeld oder Vektor-Unterfeld akzeptiert nur einen Index, und die beiden Suchmodi erfordern unterschiedliche Metrikfamilien.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Übersicht über die Dokumentation<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>Die StructArray-Dokumentation ist in Modellierungs- und Suchseiten unterteilt. Verwenden Sie die Modellierungsseiten, um Daten zu definieren und vorzubereiten. Verwenden Sie die Suchseiten, um das richtige Abruf- und Filterverhalten auszuwählen.</p>
<table>
<thead>
<tr><th>Bereich</th><th>Seite</th><th>Verwenden Sie sie für</th></tr>
</thead>
<tbody>
<tr><td>Modellierung</td><td><a href="/docs/de/create-structarray-field.md">Erstellen eines StructArray-Feldes</a></td><td>Definieren Sie ein Struct-Schema und fügen Sie ein StructArray-Feld hinzu.</td></tr>
<tr><td>Modellierung</td><td><a href="/docs/de/insert-data-into-structarray-fields.md">Daten in StructArray-Felder einfügen</a></td><td>Bereiten Sie verschachtelte StructArray-Daten vor und fügen Sie sie ein.</td></tr>
<tr><td>Modellierung</td><td><a href="/docs/de/index-structarray-fields.md">StructArray-Felder indizieren</a></td><td>Erstellen Sie Vektor- und Skalarindizes für StructArray-Unterfelder.</td></tr>
<tr><td>Referenz</td><td><a href="/docs/de/structarray-limits.md">StructArray-Beschränkungen</a></td><td>Überprüfen Sie die Beschränkungen hinsichtlich Schema, Datentyp, Index, Suche, Filter und Version.</td></tr>
<tr><td>Suche</td><td>Einfache Vektorsuche mit StructArray</td><td>Vergleichen Sie die Suche mit „EmbeddingList“ und die Vektorsuche auf Elementebene.</td></tr>
<tr><td>Suche</td><td>Bereichssuche mit StructArray</td><td>Verwenden Sie Bereichsbeschränkungen mit StructArray-Vektor-Unterfeldern.</td></tr>
<tr><td>Suche</td><td>Gruppierte Suche mit StructArray</td><td>Gruppieren Sie Suchergebnisse auf Elementebene nach Primärschlüssel.</td></tr>
<tr><td>Suche</td><td>Hybride Suche mit StructArray</td><td>Kombinieren Sie die Suche auf StructArray-Ebene mit anderen Vektorsuchen.</td></tr>
<tr><td>Suche</td><td>Gefilterte Suche mit StructArray</td><td>Verwenden Sie StructArray-Filter bei der Suche, Abfrage und hybriden Suche.</td></tr>
<tr><td>Suche</td><td><a href="/docs/de/search-with-embedding-lists.md">Suche mit Einbettungslisten</a></td><td>Erstellen Sie mit StructArray Retrieval-Systeme im Stil von ColBERT und ColPali.</td></tr>
<tr><td>Filter</td><td><a href="/docs/de/struct-array-operators.md">StructArray-Operatoren</a></td><td>Referenzsyntax für die Operatoren „ <code translate="no">element_filter</code> “ und „ <code translate="no">MATCH_*</code> “.</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Zuerst zu prüfende Schlüsselbeschränkungen<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>„Struct“ kann als Elementtyp eines Array-Feldes verwendet werden. Es wird nicht als Sammlungsfeld auf oberster Ebene verwendet.</p></li>
<li><p>Alle Struct-Elemente im selben StructArray-Feld teilen sich ein vordefiniertes Schema.</p></li>
<li><p>Vektor-Unterfelder erfordern Indizes. Die „EmbeddingList“-Suche verwendet „ <code translate="no">MAX_SIM*</code> “-Metriken, während die Suche auf Elementebene reguläre Vektormetriken nutzt.</p></li>
<li><p><code translate="no">element_filter</code> und „ <code translate="no">MATCH_*</code> “ gelten für skalare Unterfelder innerhalb von „StructArray“-Feldern. Verwenden Sie „ <code translate="no">$[subfield]</code> “ nur innerhalb dieser Operatoren.</p></li>
<li><p>Einige Suchkombinationen sind versionsabhängig oder modusspezifisch. Überprüfen Sie <a href="/docs/de/structarray-limits.md">die „StructArray-Einschränkungen“</a>, bevor Sie auf Bereichssuche, Gruppensuche, Hybridsuche, nullfähige Felder oder dynamisch hinzugefügte Felder zurückgreifen.</p></li>
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
<li><p>Um ein Schema zu entwerfen, lesen Sie <a href="/docs/de/create-structarray-field.md">„Erstellen eines StructArray-Feldes</a>“.</p></li>
<li><p>Informationen zur Datenaufbereitung finden Sie unter <a href="/docs/de/insert-data-into-structarray-fields.md">„Daten in StructArray-Felder einfügen</a>“.</p></li>
<li><p>Informationen zur Auswahl von Indizes finden Sie unter <a href="/docs/de/index-structarray-fields.md">„StructArray-Felder indizieren</a>“.</p></li>
<li><p>Um StructArray-Vektor-Unterfelder zu durchsuchen, beginnen Sie mit „Grundlegende Vektorsuche mit StructArray“.</p></li>
<li><p>Informationen zum Filtern von StructArray-Skalar-Unterfeldern finden Sie unter <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a> “ und „Gefilterte Suche mit StructArray“.</p></li>
</ol>
