---
id: release_notes.md
summary: Milvus-Versionshinweise
title: Versionshinweise
---
<h1 id="Release-Notes" class="common-anchor-header">Versionshinweise<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Erfahren Sie, was es Neues bei Milvus gibt! Auf dieser Seite finden Sie eine Übersicht über neue Funktionen, Verbesserungen, bekannte Probleme und Fehlerbehebungen in jeder Version. Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um sich über Updates zu informieren.</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: 9. Mai 2026</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python-SDK-Version</th><th>Node.js-SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta erweitert die Milvus-Vektordatenbank um eine neue Integration in das Open-Lake-Ökosystem: Mit „External Collection“ kann Milvus externe Lake-Tabellen ohne Kopieren abfragen, und Spark kann Milvus-Sammlungen direkt über Snapshot lesen. Die Version bietet außerdem umfangreichere Abfragefunktionen, ein ausdrucksstärkeres Schema, tiefgreifendere Anpassungsmöglichkeiten für die Textsuche, feinere Steuerungsmöglichkeiten für den Daten- und Modelllebenszyklus sowie mehr Steuerungsmöglichkeiten auf der Operatorseite. Milvus 3.0 ist der Kern von Zilliz Lakebase und unterstützt dessen einheitliche Bereitstellung, Erkennung und Batch-Verarbeitung.</p>
<p>Sehen Sie sich das folgende Video an, um mehr über Milvus 3.0 und das AMA mit den Hauptentwicklern zu erfahren:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h3 id="Key-Features" class="common-anchor-header">Wichtigste Funktionen<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Externe Sammlung</h4><p>In typischen KI-Datenpipelines befinden sich bereits Terabytes an Embeddings und Metadaten als Parquet-, Lance- oder Iceberg-Tabellen im Objektspeicher. Das Kopieren dieser Daten in Milvus verdoppelt die Speicherkosten, erfordert eine ETL-Pipeline, die synchronisiert werden muss, und entzieht dem Kunden die Kontrolle über die Datenverwaltung.</p>
<p>Die externe Sammlung macht das Kopieren überflüssig. Eine Milvus-Sammlung kann auf Dateien verweisen, wo diese bereits gespeichert sind, und Milvus verwaltet nur das Schema, die Indizes und die Abfrageausführung. Eine inkrementelle Aktualisierung sorgt dafür, dass die Sammlung mit den zugrunde liegenden Dateien synchron bleibt. Kunden, deren Daten den Lake nicht verlassen dürfen, wie beispielsweise Teams aus den Bereichen Finanzen und Gesundheitswesen, können Vektorabfragen für diese Daten direkt an ihrem Speicherort durchführen. Ein einzelner, im Lake befindlicher Datensatz kann auch von mehreren Milvus-Instanzen gleichzeitig bereitgestellt werden.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/create-an-external-collection.md">„Externe Sammlung erstellen</a>“.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Für die Bereitstellung und die Batch-Erkennung wird oft dieselbe Collection gleichzeitig benötigt. A/B-Modellbewertung, groß angelegte Deduplizierung, Backfill-Validierung und Versions-Rollback erfordern alle eine stabile Ansicht der Collection, während weiterhin Schreibvorgänge stattfinden.</p>
<p>Snapshot erstellt eine zeitpunktbezogene, schreibgeschützte Ansicht einer Collection, indem es auf vorhandene Segmente verweist, anstatt Daten zu kopieren, sodass die marginalen Speicherkosten nahezu null sind. Batch-Jobs können unter MVCC-ähnlicher Isolation aus dem Snapshot lesen, während die Live-Collection weiterhin Schreibvorgänge akzeptiert.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/snapshots.md">„Snapshots“</a>, <a href="/docs/de/manage-snapshots.md">„Snapshots verwalten</a>“ und <a href="/docs/de/snapshot-use-cases.md">„Anwendungsfälle für Snapshots</a>“.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Abfrage / Suche nach Reihenfolge</h4><p>Suche und Abfrage unterstützen nun die Sortierung nach mehreren Feldern, wobei die Sortierung in den Milvus-Kernel verlagert wird und „ <code translate="no">ASC</code> “ sowie „ <code translate="no">DESC</code> “ pro Feld einstellbar sind. Dies schließt eine häufige Lücke in der Produktion: „Top-K“ allein nach Entfernung entspricht oft nicht den geschäftlichen Anforderungen, wenn das ähnlichste Element nicht das günstigste, das neueste oder das beliebteste ist.</p>
<p>Anwendungen müssen nun nicht mehr übermäßig viele Ergebnisse abrufen und auf dem Client neu sortieren, um ein zusammengesetztes Ranking darzustellen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">„Sortieren von Suchergebnissen nach skalaren Feldern</a> “ und <a href="/docs/de/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">„Sortieren von Abfrageergebnissen</a>“.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Abfrageaggregation</h4><p>Um Statistiken zur Mandantenverteilung, Zählungen zur Feldvollständigkeit oder den Fortschritt bei der Versionsbereitstellung aus einer Milvus-Sammlung zu erstellen, mussten bisher passende Entitäten zurück auf den Client geladen und dort aggregiert werden. Milvus 3.0 integriert die skalare Aggregation im SQL-Stil in den Kernel. Ein Abfrageaufruf akzeptiert „ <code translate="no">group_by_fields</code> “ und Aggregationsausdrücke in „ <code translate="no">output_fields</code> “, einschließlich „ <code translate="no">count(*)</code> “, „ <code translate="no">count(&lt;field&gt;)</code> “, „ <code translate="no">sum(&lt;field&gt;)</code> “, „ <code translate="no">avg(&lt;field&gt;)</code> “, „ <code translate="no">min(&lt;field&gt;)</code> “ und „ <code translate="no">max(&lt;field&gt;)</code> “. Die Aggregation wird nach dem Filtern serverseitig ausgewertet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Aggregieren von Abfrageergebnissen</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null-Vektor</h4><p>Einbettungen werden oft asynchron erzeugt, sodass eine Entität vor ihrem Vektor eintreffen kann. Auch multimodale Daten weisen natürliche Lücken auf, wie beispielsweise ein Video ohne Untertitel oder ein Produkt ohne Bild. Frühere Versionen hatten keine gute Lösung: Anwendungen verzögerten entweder das Schreiben, bis der Vektor bereit war, oder füllten einen Platzhaltervektor ein, wobei beide Optionen die Abfragequalität beeinträchtigten.</p>
<p>Milvus 3.0 unterstützt NULL in Vektorfeldern für alle sechs Vektortypen. Die Suche überspringt NULL-Vektoren automatisch, die Abfragequalität bleibt unbeeinträchtigt, und NULL-Vektoren beanspruchen praktisch keinen Speicherplatz. Die „ <code translate="no">AddField</code> “ erstreckt sich im Rahmen dieser Änderung auch auf Vektorfelder: Mit „ <code translate="no">nullable=True</code> “ kann eine bestehende Sammlung online neue Vektorfelder hinzufügen, ohne neu aufgebaut werden zu müssen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullable Fields</a>“.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Benutzerdefiniertes Wörterbuch &amp; Synonymwörterbuch</h4><p>Standard-Tokenizer erfüllen nicht immer die Anforderungen an die Suchqualität in der Produktion. Chinesisch, vertikale Domänen wie Medizin, Recht und Chemie sowie mehrsprachige Korpora können erheblich von benutzerdefinierten Wörterbüchern und Synonymtabellen profitieren. Bislang wurden diese Ressourcen meist als anwendungsseitige Abfrageumschreibungen bereitgestellt.</p>
<p>Milvus 3.0 führt einen FileResource-Mechanismus ein, um benutzerdefinierte Tokenizer-Wörterbücher, Synonymlisten, Stoppwortlisten und Regeln zur Zerlegung von zusammengesetzten Wörtern zu registrieren. Nach der Registrierung kann eine Ressource von jedem Tokenizer oder Filter aus referenziert werden und wirkt sich auf BM25, Analysatoren und Text Match aus. Wörterbücher und Synonyme können nun zentral verwaltet und versioniert werden, anstatt über den Anwendungscode verstreut zu sein.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/manage-file-resources.md">„Dateiressourcen verwalten</a>“.</p>
<h4 id="Entity-TTL" class="common-anchor-header">Entity-TTL</h4><p>TTL auf Collection- und Partitionsebene sind für viele Lebenszyklus- und Compliance-Szenarien zu grob. Verschiedene Mandanten innerhalb derselben Collection haben oft unterschiedliche Aufbewahrungsregeln, und einzelne Entitäten müssen möglicherweise nach einem Zeitplan ablaufen, der nicht mit dem Rest der Collection übereinstimmt.</p>
<p>Milvus 3.0 unterstützt TTL auf Entitätsebene. Deklarieren Sie ein Feld „ <code translate="no">TIMESTAMPTZ</code> “ im Schema, kennzeichnen Sie es über eine Collection-Eigenschaft als TTL-Feld, und Milvus entfernt abgelaufene Entitäten automatisch. Dies deckt Anträge auf das Recht auf Vergessenwerden, das Ablaufen von Sitzungsdaten und begrenzte Konversationshistorien ab, ohne dass eine Bereinigung auf Anwendungsseite erforderlich ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">„TTL auf Entitätsebene festlegen</a>“.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 führte den „ <code translate="no">MINHASH_LSH</code> “-Index für die setbasierte Erkennung von Beinahe-Duplikaten ein, doch Anwendungen mussten weiterhin MinHash-Signaturen berechnen, bevor Daten in Milvus geschrieben wurden.</p>
<p>Milvus 3.0 führt eine serverseitige MinHash-Funktion ein. Deklarieren Sie im Schema ein Eingabefeld „ <code translate="no">VARCHAR</code> “ und ein Ausgabefeld „ <code translate="no">BINARY_VECTOR</code> “, fügen Sie eine Funktion „ <code translate="no">FunctionType.MINHASH</code> “ hinzu, und Milvus berechnet die Signaturen während des Einfügens, des Masseneinfügens und der Suche. Zusammen mit „ <code translate="no">MINHASH_LSH</code> “ unterstützt dies Deduplizierungs-Workflows für große Datensätze, Fingerprinting und Plagiatserkennung innerhalb von Milvus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/minhash-function.md">MinHash-Funktion</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Die Annahme „eine Entität = ein Vektor“ passt nicht mehr zur modernen Suche. Lange Dokumente werden in viele Teile aufgeteilt, Modelle mit später Interaktion wie ColBERT geben einen Vektor pro Token aus, und multimodale Entitäten können mehrere Ansichten enthalten.</p>
<p>EmbList speichert eine Vektorliste variabler Länge pro Entität, wobei „ <code translate="no">DISKANN</code> “ als On-Disk-Index dient. Der Speicherpfad hält den RAM-Verbrauch unter Kontrolle, wenn der Korpus die Speichergrenzen überschreitet. EmbList + „ <code translate="no">DISKANN</code> “ ist die erste Variante der umfassenderen StructList-Familie in diesem RC. Der Rest der Familie, einschließlich StructList-Filterung und Muvera-/Lemur-Multivektor-Beschleunigung, ist für die offizielle Version 3.0 vorgesehen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/search-with-embedding-lists.md">„Suche mit Embedding-Listen</a>“.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>In Produktionsumgebungen kommt es im Laufe der Zeit zu einer zunehmenden Segmentfragmentierung, was zu Schwankungen bei der Abfragelatenz und einem erhöhten Speicherbedarf führt.</p>
<p>Milvus 3.0 bietet die Möglichkeit, die Segmentkomprimierung während Zeiten mit geringer Auslastung explizit auszulösen, sowohl im synchronen als auch im asynchronen Modus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/force-merge.md">„Force Merge Compaction</a>“.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 führt Storage V3 ein, eine manifestbasierte spaltenorientierte Speicher-Engine, bei der Daten und Metadaten auf S3-kompatiblem Objektspeicher liegen. Jede Datensatzversion wird als unveränderlicher Manifest-Snapshot erfasst, eine Avro-kodierte Datei, die festhält, aus welchen Spaltengruppen, Delta-Logs und Statistiken der Datensatz besteht.</p>
<p>Manifeste sind kompakte Avro-Dateien, und Delta-Logs zeichnen Löschungen auf Entitätsebene auf, ohne Datendateien neu zu schreiben. Dadurch bleibt der Metadaten-Overhead gering, auch wenn Datensätze wachsen. Das Manifest entkoppelt zudem die Metadatenverfolgung vom Abfragepfad, sodass eine Collection mehr Segmente verwalten kann, ohne die Abfrageleistung zu beeinträchtigen.</p>
<p>Da Zustände im Objektspeicher abgelegt werden, ist der Datensatz selbstbeschreibend: Jeder Leser mit Zugriff auf den Speicherpfad kann ihn ohne zentralen Katalog erkennen und interpretieren. Diese Eigenschaft bildet die Grundlage für die Integration von External Collection, Snapshot und zukünftigen Lake-Integrationen.</p>
