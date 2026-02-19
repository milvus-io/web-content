---
id: index.md
related_key: index
summary: Indexmechanismus in Milvus.
title: In-Memory-Index
---
<h1 id="In-memory-Index" class="common-anchor-header">In-Memory-Index<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert warning">
<p>Diese Seite ist veraltet. Den neuesten Inhalt finden Sie unter <a href="/docs/de/index-explained.md">Index erklärt</a>.</p>
</div>
<p>Dieses Thema listet verschiedene Arten von In-Memory-Indizes auf, die von Milvus unterstützt werden, die Szenarien, für die jeder von ihnen am besten geeignet ist, und die Parameter, die Benutzer konfigurieren können, um eine bessere Suchleistung zu erzielen. Für On-Disk-Indizes, siehe <strong><a href="/docs/de/disk_index.md">On-Disk-Index</a></strong>.</p>
<p>Indizierung ist der Prozess der effizienten Organisation von Daten und spielt eine wichtige Rolle bei der Nützlichkeit der Ähnlichkeitssuche, indem sie zeitaufwändige Abfragen auf großen Datenbeständen drastisch beschleunigt.</p>
<p>Um die Abfrageleistung zu verbessern, können Sie für jedes Vektorfeld <a href="/docs/de/index-vector-fields.md">einen Indextyp angeben</a>.</p>
<div class="alert note">
Derzeit unterstützt ein Vektorfeld nur einen Index-Typ. Milvus löscht automatisch den alten Index, wenn der Indextyp gewechselt wird.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">ANNS-Vektorindizes<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Die meisten der von Milvus unterstützten Vektorindex-Typen verwenden ANNS-Algorithmen (approximate nearest neighbors search). Verglichen mit der genauen Suche, die in der Regel sehr zeitaufwändig ist, beschränkt sich die Kernidee von ANNS nicht mehr darauf, das genaueste Ergebnis zu liefern, sondern sucht nur noch nach Nachbarn des Ziels. ANNS verbessert die Effizienz des Abrufs, indem es die Genauigkeit innerhalb eines akzeptablen Bereichs opfert.</p>
<p>Je nach Implementierungsmethode kann der ANNS-Vektorindex in vier Typen eingeteilt werden: Baum-basiert, Graph-basiert, Hash-basiert und Quantisierungs-basiert.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">In Milvus unterstützte Indizes<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt verschiedene Indextypen, die nach der Art der Vektoreinbettungen, die sie verarbeiten, kategorisiert werden: <strong>Fließkomma-Einbettungen</strong> (auch bekannt als Fließkomma-Vektoren oder dichte Vektoren), <strong>binäre Einbettungen</strong> (auch bekannt als binäre Vektoren) und <strong>spärliche Einbettungen</strong> (auch bekannt als spärliche Vektoren).</p>
<div class="filter">
 <a href="#floating">Fließkomma-Einbettungen</a> <a href="#binary">Binäre Einbettungen</a> <a href="#sparse">Sparse Embeddings</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">Indizes für Fließkomma-Einbettungen<button data-href="#Indexes-for-floating-point-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>Für 128-dimensionale Fließkomma-Einbettungen (Vektoren) beträgt der benötigte Speicherplatz 128 * die Größe von float = 512 Byte. Die für Fließkomma-Einbettungen verwendeten <a href="/docs/de/metric.md">Abstandsmetriken</a> sind der euklidische Abstand (<code translate="no">L2</code>) und das innere Produkt (<code translate="no">IP</code>).</p>
<p>Diese Arten von Indizes umfassen <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code> und <code translate="no">SCANN</code> für CPU-basierte ANN-Suchen.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">Indizes für binäre Einbettungen<button data-href="#Indexes-for-binary-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>Für 128-dimensionale binäre Einbettungen beträgt der Speicherplatzbedarf 128 / 8 = 16 Bytes. Und die für binäre Einbettungen verwendeten Abstandsmetriken sind <code translate="no">JACCARD</code> und <code translate="no">HAMMING</code>.</p>
<p>Zu dieser Art von Indizes gehören <code translate="no">BIN_FLAT</code> und <code translate="no">BIN_IVF_FLAT</code>.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">Indizes für spärliche Einbettungen<button data-href="#Indexes-for-sparse-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>Indizes für spärliche Einbettungen unterstützen nur die Metriken <code translate="no">IP</code> und <code translate="no">BM25</code> (für Volltextsuche).</p>
<p>Unterstützter Index-Typ für spärliche Einbettungen: <code translate="no">SPARSE_INVERTED_INDEX</code>.</p>
<div class="alert note">
<p>Ab Milvus 2.5.4 wird <code translate="no">SPARSE_WAND</code> veraltet sein. Stattdessen wird empfohlen, <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> zu verwenden, um Äquivalenz und Kompatibilität zu gewährleisten. Weitere Informationen finden Sie unter <a href="/docs/de/sparse_vector.md#Set-index-params-for-vector-field">Sparse Vector</a>.</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>Unterstützter Index</th>
    <th>Klassifizierung</th>
    <th>Szenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>FLAT</td>
    <td>K.A.</td>
    <td>
      <ul>
        <li>Relativ kleiner Datensatz</li>
        <li>Erfordert eine Wiedererkennungsrate von 100%.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>K.A.</td>
    <td>
      <ul>
        <li>Hochgeschwindigkeitsabfrage</li>
        <li>Erfordert eine möglichst hohe Wiederfindungsrate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>Quantisierungsbasierter Index</td>
    <td>
      <ul>
        <li>Abfrage mit sehr hoher Geschwindigkeit</li>
        <li>Begrenzte Speicherressourcen</li>
        <li>Akzeptiert geringfügige Kompromisse bei der Abrufrate</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>Quantisierungsbasierter Index</td>
    <td>
      <ul>
        <li>Hochgeschwindigkeitsabfrage</li>
        <li>Begrenzte Speicherressourcen</li>
        <li>Akzeptiert geringfügige Kompromisse bei der Abrufrate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Graph-basierter Index</td>
    <td>
      <ul>
        <li>Abfrage mit sehr hoher Geschwindigkeit</li>
        <li>Erfordert eine möglichst hohe Abrufrate</li>
        <li>Große Speicherressourcen</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>Quantisierungsbasierter Index</td>
    <td>
      <ul>
        <li>Abfrage mit sehr hoher Geschwindigkeit</li>
        <li>Begrenzte Speicherressourcen</li>
        <li>Akzeptiert geringfügige Kompromisse bei der Abrufrate</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>Quantisierungsbasierter Index</td>
    <td>
      <ul>
        <li>Abfrage mit mittlerer Geschwindigkeit</li>
        <li>Sehr begrenzte Speicherressourcen</li>
        <li>Akzeptiert geringfügige Kompromisse bei der Abrufrate</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>Quantisierungsbasierter Index</td>
    <td>
      <ul>
        <li>Mittelschnelle Abfrage</li>
        <li>Sehr begrenzte Speicherressourcen</li>
        <li>Akzeptiert geringfügige Kompromisse bei der Abrufrate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>Quantisierungsbasierter Index</td>
    <td>
      <ul>
        <li>Abfrage mit sehr hoher Geschwindigkeit</li>
        <li>Erfordert eine möglichst hohe Abrufrate</li>
        <li>Große Speicherressourcen</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>Unterstützter Index</th>
    <th>Klassifizierung</th>
    <th>Szenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>Quantisierungsbasierter Index</td>
    <td><ul>
      <li>Hängt von relativ kleinen Datensätzen ab.</li>
      <li>Erfordert perfekte Genauigkeit.</li>
      <li>Es findet keine Komprimierung statt.</li>
      <li>Garantiert exakte Suchergebnisse.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Quantisierungsbasierter Index</td>
    <td><ul>
      <li>Hochgeschwindigkeitsabfrage</li>
      <li>Erfordert eine möglichst hohe Wiederfindungsrate</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>Unterstützter Index</th>
    <th>Klassifizierung</th>
    <th>Szenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>SPÄRLICHER_INVERTIERTER_INDEX</td>
    <td>Invertierter Index</td>
    <td><ul>
      <li>Hängt von relativ kleinen Datensätzen ab.</li>
      <li>Erfordert eine Wiedererkennungsrate von 100%.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT<button data-href="#FLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>Für Anwendungen der Vektorähnlichkeitssuche, die perfekte Genauigkeit erfordern und von relativ kleinen Datensätzen (im Millionenbereich) abhängen, ist der FLAT-Index eine gute Wahl. FLAT komprimiert die Vektoren nicht und ist der einzige Index, der exakte Suchergebnisse garantieren kann. Die Ergebnisse von FLAT können auch als Vergleichspunkt für Ergebnisse anderer Indizes verwendet werden, die weniger als 100 % Recall haben.</p>
<p>FLAT ist genau, weil er einen erschöpfenden Suchansatz verfolgt, d. h. für jede Abfrage wird die Zieleingabe mit jedem Satz von Vektoren in einem Datensatz verglichen. Dadurch ist FLAT der langsamste Index auf unserer Liste und eignet sich schlecht für die Abfrage umfangreicher Vektordaten. Für den FLAT-Index in Milvus sind keine Parameter erforderlich, und seine Verwendung erfordert keine zusätzliche Indexerstellung.</p>
<ul>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Optional] Die gewählte Distanzmetrik.</td><td>Siehe <a href="/docs/de/metric.md">Unterstützte Metriken</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF_FLAT unterteilt Vektordaten in <code translate="no">nlist</code> Cluster-Einheiten und vergleicht dann die Abstände zwischen dem Ziel-Eingangsvektor und dem Zentrum jedes Clusters. Abhängig von der Anzahl der Cluster, die das System abfragt (<code translate="no">nprobe</code>), werden die Ergebnisse der Ähnlichkeitssuche nur auf der Grundlage von Vergleichen zwischen der Zieleingabe und den Vektoren in den ähnlichsten Clustern zurückgegeben, was die Abfragezeit drastisch reduziert.</p>
<p>Durch die Anpassung von <code translate="no">nprobe</code> kann ein ideales Gleichgewicht zwischen Genauigkeit und Geschwindigkeit für ein bestimmtes Szenario gefunden werden. Die Ergebnisse des <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT-Leistungstests</a> zeigen, dass die Abfragezeit stark ansteigt, wenn sowohl die Anzahl der Zieleingangsvektoren (<code translate="no">nq</code>) als auch die Anzahl der zu durchsuchenden Cluster (<code translate="no">nprobe</code>) zunimmt.</p>
<p>IVF_FLAT ist der einfachste IVF-Index, und die in jeder Einheit gespeicherten kodierten Daten stimmen mit den Originaldaten überein.</p>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Anzahl der Cluster-Einheiten</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<ul>
<li><p>Gemeinsame Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Bereichssuche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Maximale Anzahl von Bereichen, die keine Suchergebnisse liefern.<br/>Dies ist ein Parameter für die Bereichssuche und beendet den Suchvorgang, wenn die Anzahl der aufeinanderfolgenden leeren Bereiche den angegebenen Wert erreicht.<br/>Eine Erhöhung dieses Wertes kann die Abrufrate auf Kosten einer längeren Suchzeit verbessern.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF_FLAT führt keine Komprimierung durch, so dass die erzeugten Indexdateien ungefähr die gleiche Größe haben wie die ursprünglichen, nicht indizierten Vektordaten. Wenn z. B. der ursprüngliche 1B-SIFT-Datensatz 476 GB groß ist, sind die IVF_FLAT-Indexdateien etwas kleiner (~470 GB). Wenn alle Indexdateien in den Speicher geladen werden, werden 470 GB Speicherplatz verbraucht.</p>
<p>Wenn Festplatten-, CPU- oder GPU-Speicherressourcen begrenzt sind, ist IVF_SQ8 eine bessere Option als IVF_FLAT. Dieser Indextyp kann jedes FLOAT (4 Byte) in UINT8 (1 Byte) umwandeln, indem er eine Skalarquantisierung (SQ) durchführt. Dies reduziert den Festplatten-, CPU- und GPU-Speicherverbrauch um 70-75 %. Für den 1B-SIFT-Datensatz benötigen die IVF_SQ8-Indexdateien nur 140 GB Speicherplatz.</p>
<ul>
<li><p>Parameter für die Indexerstellung</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Anzahl der Cluster-Einheiten</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<ul>
<li><p>Gemeinsame Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Bereichssuche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Maximale Anzahl von Bereichen, die keine Suchergebnisse liefern.<br/>Dies ist ein Parameter für die Bereichssuche und beendet den Suchvorgang, wenn die Anzahl der aufeinanderfolgenden leeren Bereiche den angegebenen Wert erreicht.<br/>Eine Erhöhung dieses Wertes kann die Abrufrate auf Kosten einer längeren Suchzeit verbessern.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">PQ</code> (Produktquantisierung) zerlegt den ursprünglichen hochdimensionalen Vektorraum gleichmäßig in kartesische Produkte von <code translate="no">m</code> niedrigdimensionalen Vektorräumen und quantisiert dann die zerlegten niedrigdimensionalen Vektorräume. Anstatt die Abstände zwischen dem Zielvektor und dem Zentrum aller Einheiten zu berechnen, ermöglicht die Produktquantisierung die Berechnung der Abstände zwischen dem Zielvektor und dem Clustering-Zentrum jedes niedrigdimensionalen Raums und reduziert die Zeit- und Raumkomplexität des Algorithmus erheblich.</p>
<p>IVF_PQ führt das IVF-Index-Clustering durch, bevor das Produkt der Vektoren quantisiert wird. Seine Indexdatei ist sogar noch kleiner als IVF_SQ8, aber auch hier kommt es zu einem Verlust an Genauigkeit bei der Suche nach Vektoren.</p>
<div class="alert note">
<p>Die Parameter für die Indexerstellung und die Suchparameter variieren je nach Milvus-Verteilung. Wählen Sie zunächst Ihre Milvus-Distribution aus.</p>
</div>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Anzahl der Cluster-Einheiten</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>Anzahl der Faktoren der Produktquantisierung</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Optional] Anzahl der Bits, in denen jeder niedrigdimensionale Vektor gespeichert wird.</td><td>[1, 24] (8 als Standard)</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<ul>
<li><p>Allgemeine Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Bereichssuche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Maximale Anzahl von Bereichen, die keine Suchergebnisse liefern.<br/>Dies ist ein Parameter für die Bereichssuche und beendet den Suchvorgang, wenn die Anzahl der aufeinanderfolgenden leeren Bereiche den angegebenen Wert erreicht.<br/>Eine Erhöhung dieses Wertes kann die Abrufrate auf Kosten einer längeren Suchzeit verbessern.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h3><p>ScaNN (Scalable Nearest Neighbors) ähnelt IVF_PQ in Bezug auf Vektor-Clustering und Produktquantisierung. Der Unterschied liegt in den Implementierungsdetails der Produktquantisierung und der Verwendung von SIMD (Single-Instruction / Multi-data) für eine effiziente Berechnung.</p>
<ul>
<li><p>Parameter für die Indexbildung</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Anzahl der Cluster-Einheiten</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>Angabe, ob die Rohdaten in den Index aufgenommen werden sollen</td><td><code translate="no">True</code> oder <code translate="no">False</code>. Der Standardwert ist <code translate="no">True</code>.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Im Gegensatz zu IVF_PQ gelten die Standardwerte für <code translate="no">m</code> und <code translate="no">nbits</code>, um die Leistung zu optimieren.</p>
  </div>
</li>
<li><p>Suchparameter</p>
<ul>
<li><p>Allgemeine Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[1, nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>Bereichssuche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Maximale Anzahl von Bereichen, die keine Suchergebnisse liefern.<br/>Dies ist ein Parameter für die Bereichssuche und beendet den Suchvorgang, wenn die Anzahl der aufeinanderfolgenden leeren Bereiche den angegebenen Wert erreicht.<br/>Eine Erhöhung dieses Wertes kann die Abrufrate auf Kosten einer längeren Suchzeit verbessern.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW (Hierarchical Navigable Small World Graph) ist ein graphbasierter Indizierungsalgorithmus. Er baut eine mehrschichtige Navigationsstruktur für ein Bild nach bestimmten Regeln auf. In dieser Struktur sind die oberen Schichten spärlicher und die Abstände zwischen den Knoten größer; die unteren Schichten sind dichter und die Abstände zwischen den Knoten sind kleiner. Die Suche beginnt in der obersten Schicht, findet den Knoten, der dem Ziel in dieser Schicht am nächsten liegt, und begibt sich dann in die nächste Schicht, um eine weitere Suche zu beginnen. Nach mehreren Iterationen kann sie sich schnell der Zielposition nähern.</p>
<p>Um die Leistung zu verbessern, begrenzt HNSW den maximalen Grad der Knoten auf jeder Ebene des Graphen auf <code translate="no">M</code>. Außerdem können Sie <code translate="no">efConstruction</code> (beim Indexaufbau) oder <code translate="no">ef</code> (bei der Suche nach Zielen) verwenden, um einen Suchbereich anzugeben.</p>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definiert die maximale Anzahl der ausgehenden Verbindungen im Graphen. Ein höheres M führt zu höherer Genauigkeit/Laufzeit bei fester ef/efConstruction.</td><td>[2, 2048]</td><td>Keine</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction steuert den Kompromiss zwischen Indexsuchgeschwindigkeit und Erstellungsgeschwindigkeit. Eine Erhöhung des efConstruction-Parameters kann die Indexqualität verbessern, führt aber auch zu einer Verlängerung der Indexierungszeit.</td><td>[1, int_max]</td><td>Keine</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter, der den Kompromiss zwischen Abfragezeit und -genauigkeit steuert. Eine höhere <code translate="no">ef</code> führt zu einer genaueren, aber langsameren Suche.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Keine</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Skalarquantisierung (SQ) ist eine Technik zur Diskretisierung von Fließkommadaten in eine endliche Menge von Werten auf der Grundlage ihres Betrags. <strong>SQ6</strong> steht beispielsweise für die Quantisierung in (2^6 = 64) diskrete Werte, wobei jede Fließkommazahl mit 6 Bits kodiert wird. Analog dazu quantisiert <strong>SQ8</strong> die Daten in (2^8 = 256) diskrete Werte, wobei jede Fließkommazahl durch 8 Bits dargestellt wird. Durch diese Quantisierung wird der Speicherplatzbedarf reduziert, während die wesentliche Struktur der Daten für eine effiziente Verarbeitung erhalten bleibt.</p>
<p>In Kombination mit SQ bietet HNSW_SQ einen kontrollierbaren Kompromiss zwischen Indexgröße und Genauigkeit, wobei eine hohe Abfrageleistung pro Sekunde (QPS) beibehalten wird. Im Vergleich zu Standard-HNSW führt dies zu einer bescheidenen Erhöhung der Indexaufbauzeit.</p>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definiert die maximale Anzahl der ausgehenden Verbindungen im Graphen. Ein höheres M führt zu höherer Genauigkeit/Laufzeit bei fester ef/efConstruction.</td><td>[2, 2048]</td><td>Keine</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction steuert den Kompromiss zwischen Indexsuchgeschwindigkeit und Erstellungsgeschwindigkeit. Eine Erhöhung des efConstruction-Parameters kann die Indexqualität verbessern, führt aber auch zu einer Verlängerung der Indexierungszeit.</td><td>[1, int_max]</td><td>Keine</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>Skalarer Quantisierer-Typ.</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>Ob verfeinerte Daten während des Indexaufbaus reserviert werden.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Der Datentyp des verfeinerten Indexes.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Keine</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter, der den Kompromiss zwischen Abfragezeit und -genauigkeit steuert. Eine höhere <code translate="no">ef</code> führt zu einer genaueren, aber langsameren Suche.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Keine</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Der Vergrößerungsfaktor von refine im Vergleich zu <em>k</em>.</td><td>(1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Grundidee von PQ besteht darin, den Vektor in <code translate="no">m</code> Untervektoren aufzuteilen, von denen jeder <em>2^{nbits}</em> Zentroide auf der Grundlage von kmeans findet, und jeder Untervektor wählt den nächstgelegenen Zentroid als seinen ungefähren Untervektor. Dann zeichnen wir alle Zentroide auf, so dass jeder Untervektor als <code translate="no">nbits</code> kodiert werden kann und ein fließender Vektor der Länge <code translate="no">dim</code> als <em>m ⋅ nbits</em> Bits kodiert werden kann.</p>
<p>In Kombination mit PQ bietet HNSW_PQ einen kontrollierbaren Kompromiss zwischen Indexgröße und Genauigkeit, hat aber einen niedrigeren QPS-Wert und eine höhere Wiederfindungsrate als HNSW_SQ bei gleicher Kompressionsrate. Im Vergleich zu HNSW_SQ dauert es länger, den Index aufzubauen.</p>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definiert die maximale Anzahl der ausgehenden Verbindungen im Graphen. Ein höheres M führt zu höherer Genauigkeit/Laufzeit bei fester ef/efConstruction.</td><td>[2, 2048]</td><td>Keine</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction steuert den Kompromiss zwischen Indexsuchgeschwindigkeit und Erstellungsgeschwindigkeit. Eine Erhöhung des efConstruction-Parameters kann die Indexqualität verbessern, führt aber auch zu einer Verlängerung der Indexierungszeit.</td><td>[1, int_max]</td><td>Keine</td></tr>
<tr><td><code translate="no">m</code></td><td>Die Anzahl der Untervektorgruppen, in die der Vektor aufgeteilt werden soll.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Die Anzahl der Bits, in die jede Gruppe von Untervektoren quantisiert wird.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>Ob verfeinerte Daten während der Indexerstellung reserviert werden.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Der Datentyp des verfeinerten Indexes.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Keine</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter, der den Kompromiss zwischen Abfragezeit und -genauigkeit steuert. Eine höhere <code translate="no">ef</code> führt zu einer genaueren, aber langsameren Suche.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Keine</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Der Vergrößerungsfaktor von refine im Vergleich zu <em>k</em>.</td><td>(1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ ist ähnlich wie PQ und unterteilt den Vektor ebenfalls in <code translate="no">m</code> Gruppen. Jeder Untervektor wird als <code translate="no">nbits</code> kodiert. Nach Abschluss einer pq-Quantisierung wird der Rest zwischen dem Vektor und dem pq-quantisierten Vektor berechnet und die pq-Quantisierung auf den Restvektor angewendet. Insgesamt werden <code translate="no">nrq</code> vollständige pq-Quantisierungen durchgeführt, so dass ein gleitender Vektor der Länge <code translate="no">dim</code> als <em>m ⋅ nbits ⋅ nrq</em> bits kodiert wird.</p>
<p>In Kombination mit einem Product Residual Quantizer (PRQ) bietet HNSW_PRQ einen noch besser kontrollierbaren Kompromiss zwischen Indexgröße und Genauigkeit. Es hat einen fast gleichwertigen QPS-Wert und eine höhere Wiederfindungsrate als HNSW_PQ bei gleicher Kompressionsrate. Im Vergleich zu HNSW_PQ kann sich die Zeit für den Aufbau des Index um ein Vielfaches erhöhen.</p>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definiert die maximale Anzahl der ausgehenden Verbindungen im Graphen. Ein höheres M führt zu höherer Genauigkeit/Laufzeit bei fester ef/efConstruction.</td><td>[2, 2048]</td><td>Keine</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction steuert den Kompromiss zwischen Indexsuchgeschwindigkeit und Erstellungsgeschwindigkeit. Eine Erhöhung des efConstruction-Parameters kann die Indexqualität verbessern, führt aber auch zu einer Verlängerung der Indexierungszeit.</td><td>[1, int_max]</td><td>Keine</td></tr>
<tr><td><code translate="no">m</code></td><td>Die Anzahl der Untervektorgruppen, in die der Vektor aufgeteilt werden soll.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Die Anzahl der Bits, in die jede Gruppe von Untervektoren quantisiert wird.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>Die Anzahl der restlichen Unterquantisierer.</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>Ob verfeinerte Daten während der Indexerstellung reserviert werden.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Der Datentyp des verfeinerten Indexes.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Keine</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parameter, der den Kompromiss zwischen Abfragezeit und -genauigkeit steuert. Eine höhere <code translate="no">ef</code> führt zu einer genaueren, aber langsameren Suche.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Keine</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Der Vergrößerungsfaktor von refine im Vergleich zu <em>k</em>.</td><td>(1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT<button data-href="#BINFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Index ist genau dasselbe wie FLAT, außer dass er nur für binäre Einbettungen verwendet werden kann.</p>
<p>Für Anwendungen der Vektorähnlichkeitssuche, die perfekte Genauigkeit erfordern und von relativ kleinen Datensätzen (im Millionenbereich) abhängen, ist der Index BIN_FLAT eine gute Wahl. BIN_FLAT komprimiert keine Vektoren und ist der einzige Index, der exakte Suchergebnisse garantieren kann. Die Ergebnisse von BIN_FLAT können auch als Vergleichspunkt für Ergebnisse anderer Indizes verwendet werden, die weniger als 100 % Recall haben.</p>
<p>BIN_FLAT ist genau, weil er einen erschöpfenden Suchansatz verfolgt, d. h. für jede Abfrage wird die Zieleingabe mit Vektoren in einem Datensatz verglichen. Dadurch ist BIN_FLAT der langsamste Index auf unserer Liste und eignet sich schlecht für die Abfrage umfangreicher Vektordaten. Es gibt keine Parameter für den BIN_FLAT-Index in Milvus, und seine Verwendung erfordert kein Datentraining oder zusätzlichen Speicherplatz.</p>
<ul>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Optional] Die gewählte Abstandsmetrik.</td><td>Siehe <a href="/docs/de/metric.md">Unterstützte Metriken</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT<button data-href="#BINIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>Dieser Index ist genau derselbe wie IVF_FLAT, außer dass er nur für binäre Einbettungen verwendet werden kann.</p>
<p>BIN_IVF_FLAT unterteilt die Vektordaten in <code translate="no">nlist</code> Cluster-Einheiten und vergleicht dann die Abstände zwischen dem Ziel-Eingangsvektor und dem Zentrum jedes Clusters. Abhängig von der Anzahl der Cluster, die das System abfragt (<code translate="no">nprobe</code>), werden die Ergebnisse der Ähnlichkeitssuche nur auf der Grundlage von Vergleichen zwischen der Zieleingabe und den Vektoren in den ähnlichsten Clustern zurückgegeben, was die Abfragezeit drastisch reduziert.</p>
<p>Durch die Anpassung von <code translate="no">nprobe</code> kann ein ideales Gleichgewicht zwischen Genauigkeit und Geschwindigkeit für ein bestimmtes Szenario gefunden werden. Die Abfragezeit steigt stark an, wenn sowohl die Anzahl der Zieleingangsvektoren (<code translate="no">nq</code>) als auch die Anzahl der zu durchsuchenden Cluster (<code translate="no">nprobe</code>) zunimmt.</p>
<p>BIN_IVF_FLAT ist der einfachste BIN_IVF-Index, und die in jeder Einheit gespeicherten kodierten Daten stimmen mit den Originaldaten überein.</p>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Anzahl der Cluster-Einheiten</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Suchparameter</p>
<ul>
<li><p>Gemeinsame Suche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Anzahl der abzufragenden Einheiten</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Bereichssuche</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Maximale Anzahl von Bereichen, die keine Suchergebnisse liefern.<br/>Dies ist ein Parameter für die Bereichssuche und beendet den Suchvorgang, wenn die Anzahl der aufeinanderfolgenden leeren Bereiche den angegebenen Wert erreicht.<br/>Eine Erhöhung dieses Wertes kann die Abrufrate auf Kosten einer längeren Suchzeit verbessern.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Für jede Dimension wird eine Liste von Vektoren geführt, die in dieser Dimension einen Wert ungleich Null haben. Während der Suche iteriert Milvus durch jede Dimension des Abfragevektors und berechnet die Punktzahlen für Vektoren, die in diesen Dimensionen Werte ungleich Null haben.</p>
<ul>
<li><p>Parameter für den Indexaufbau</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>Der für den Aufbau und die Abfrage des Index verwendete Algorithmus. Details finden Sie unter <a href="/docs/de/sparse_vector.md#Set-index-params-for-vector-field">Sparse Vector</a>.</td><td><code translate="no">DAAT_MAXSCORE</code> (Standard), <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>Steuert die Sättigung der Termhäufigkeit. Höhere Werte erhöhen die Bedeutung der Termhäufigkeit in der Dokumentenbewertung.</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>Steuert das Ausmaß, in dem die Dokumentlänge normalisiert wird. Der Standardwert ist 0,75.</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Der Parameter <code translate="no">drop_ratio_build</code> ist seit Milvus v2.5.4 veraltet. Er kann immer noch während der Indexerstellung akzeptiert werden, hat aber keine Auswirkungen mehr auf den Index.</p>
  </div>
</li>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>Der Anteil der kleinen Vektorwerte, die während des Suchvorgangs ausgeschlossen werden. Diese Option ermöglicht eine Feinabstimmung des Suchprozesses, indem sie das Verhältnis der kleinsten Werte im Abfragevektor angibt, die ignoriert werden sollen. Sie hilft, ein Gleichgewicht zwischen Suchgenauigkeit und Leistung herzustellen. Je kleiner der Wert für <code translate="no">drop_ratio_search</code> eingestellt wird, desto weniger tragen diese kleinen Werte zur endgültigen Bewertung bei. Durch das Ignorieren einiger kleiner Werte kann die Suchleistung bei minimalen Auswirkungen auf die Genauigkeit verbessert werden.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Was ist der Unterschied zwischen dem FLAT-Index und dem IVF_FLAT-Index?</font></summary></p>
<p>Der IVF_FLAT-Index unterteilt einen Vektorraum in <code translate="no">nlist</code> -Cluster. Wenn Sie den Standardwert von <code translate="no">nlist</code> mit 16384 beibehalten, vergleicht Milvus die Abstände zwischen dem Zielvektor und den Zentren aller 16384 Cluster, um <code translate="no">nprobe</code> nächstgelegene Cluster zu erhalten. Dann vergleicht Milvus die Abstände zwischen dem Zielvektor und den Vektoren in den ausgewählten Clustern, um die nächstgelegenen Vektoren zu ermitteln. Im Gegensatz zu IVF_FLAT vergleicht FLAT direkt die Abstände zwischen dem Zielvektor und jedem einzelnen Vektor.</p>
<p>
Wenn die Gesamtzahl der Vektoren ungefähr <code translate="no">nlist</code> beträgt, unterscheiden sich IVF_FLAT und FLAT daher kaum in der Art der erforderlichen Berechnungen und der Suchleistung. Aber wenn die Anzahl der Vektoren auf das Zwei-, Drei- oder n-fache von <code translate="no">nlist</code> ansteigt, beginnt der IVF_FLAT-Index immer größere Vorteile zu zeigen.</p>
<p>
Weitere Informationen finden Sie unter <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Wie man einen Index in Milvus auswählt</a>.</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie mehr über die in Milvus unterstützten <a href="/docs/de/metric.md">Ähnlichkeitsmetriken</a>.</li>
</ul>
