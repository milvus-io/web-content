---
id: release_notes.md
summary: Milvus Versionshinweise
title: Hinweise zur Veröffentlichung
---
<h1 id="Release-Notes" class="common-anchor-header">Hinweise zur Veröffentlichung<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Finden Sie heraus, was es Neues in Milvus gibt! Auf dieser Seite werden neue Funktionen, Verbesserungen, bekannte Probleme und Fehlerbehebungen in jeder Version zusammengefasst. Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um sich über Updates zu informieren.</p>
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
    </button></h2><p>Veröffentlichungsdatum: Mai 9, 2026</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus v3.0-beta leitet den Wandel von Milvus von einer Vektordatenbank zu einer semantisch-nativen Lake-Engine ein. Der Milvus-Kernel kann nun direkt mit Daten in offenen See-Formaten arbeiten, und die Kernfunktionen von Milvus wurden in den Bereichen Retrieval, Schema, Lebenszyklus, Sprache und Operationen erweitert.</p>
<p>External Collection und Snapshot sind die wichtigsten Neuerungen auf der Lake-Seite. Auf demselben Kernel basiert auch Zilliz Lakebase, eine semantisch-native Datenplattform, die auf Milvus 3.0 aufbaut.</p>
<h3 id="Key-Features" class="common-anchor-header">Hauptmerkmale<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Externe Sammlung</h4><p>In typischen KI-Datenpipelines befinden sich bereits Terabytes an Einbettungen und Metadaten auf Objektspeicher als Parquet-, Lance- oder Iceberg-Tabellen. Das Kopieren dieser Daten in Milvus verdoppelt die Speicherkosten, fügt eine ETL-Pipeline hinzu, die synchron gehalten werden muss, und verlagert die Datenverwaltung weg vom Kunden.</p>
<p>Mit einer externen Sammlung entfällt diese Kopie. Eine Milvus-Collection kann auf Dateien verweisen, wo sie bereits vorhanden sind, und Milvus verwaltet nur das Schema, die Indizes und die Abfrageausführung. Durch eine inkrementelle Aktualisierung wird die Collection mit den zugrunde liegenden Dateien abgeglichen. Kunden, deren Daten den Lake nicht verlassen dürfen, wie Finanz- und Gesundheitsteams, können Vector Retrieval für diese Daten dort ausführen, wo sie sich befinden. Ein einzelner Datensatz im Lake kann auch von mehreren Milvus-Instanzen gleichzeitig bedient werden.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/create-an-external-collection.md">Erstellen einer externen Sammlung</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Schnappschuss</h4><p>Serving und Batch-Discovery benötigen oft dieselbe Sammlung zur gleichen Zeit. A/B-Modellevaluierung, groß angelegte Deduplizierung, Backfill-Validierung und Versions-Rollback benötigen alle eine stabile Ansicht der Collection, während noch Schreibvorgänge stattfinden.</p>
<p>Snapshot erstellt eine zeitpunktgenaue, schreibgeschützte Ansicht einer Collection, indem es auf vorhandene Segmente verweist, anstatt Daten zu kopieren, so dass die marginalen Speicherkosten gegen Null gehen. Batch-Jobs können unter MVCC-ähnlicher Isolierung aus dem Snapshot lesen, während die Live-Sammlung weiterhin Schreibvorgänge akzeptiert.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/snapshots.md">Snapshots</a>, <a href="/docs/de/manage-snapshots.md">Verwalten von Snapshots</a> und <a href="/docs/de/snapshot-use-cases.md">Snapshot Use Cases</a>.</p>
<h4 id="External-Backfill" class="common-anchor-header">Externes Backfill</h4><p>Das Upgrade eines Einbettungsmodells, z. B. der Wechsel von v1-Einbettungen zu v2-Einbettungen in einer bestehenden Sammlung, bedeutete früher einen Neuaufbau von Grund auf. Dies erzwang entweder eine Ausfallzeit des Dienstes oder eine doppelte Schreiblogik auf der Anwendungsseite.</p>
<p>Milvus 3.0 unterstützt das Upgrade als Hot-Workflow. Sie können ein neues Vektorfeld mit <code translate="no">AddCollectionField</code> hinzufügen, Snapshot verwenden, um einen konsistenten Startpunkt einzufrieren, den Einbettungsauftrag offline gegen den Snapshot laufen lassen und die Werte über die normalen Ingestion-Pfade zurückschreiben. Nachdem das neue Feld online indiziert wurde, kann die Anwendung ohne Ausfallzeit umgeschaltet werden.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Abfrage/Suchreihenfolge nach</h4><p>Suche und Abfrage akzeptieren jetzt die Sortierung nach mehreren Feldern, wobei die Sortierung in den Milvus-Kernel verlagert wird und <code translate="no">ASC</code> / <code translate="no">DESC</code> pro Feld einstellbar ist. Damit wird eine häufige Produktionslücke geschlossen: Top-K nach Entfernung allein entspricht oft nicht den geschäftlichen Anforderungen, wenn der ähnlichste Artikel nicht der billigste, der neueste oder der beliebteste ist.</p>
<p>Anwendungen müssen nicht mehr zu viele Ergebnisse abrufen und auf dem Client neu sortieren, um eine zusammengesetzte Rangfolge auszudrücken.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Suchergebnisse nach skalaren Feldern sortieren</a> und <a href="/docs/de/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Abfrageergebnisse sortieren</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null-Vektor</h4><p>Einbettungen werden oft asynchron erzeugt, so dass eine Entität vor ihrem Vektor eintreffen kann. Multimodale Daten haben auch natürliche Lücken, z. B. ein Video ohne Untertitel oder ein Produkt ohne Bild. Frühere Versionen hatten darauf keine gute Antwort: Anwendungen verzögerten entweder das Schreiben, bis der Vektor fertig war, oder füllten einen Platzhaltervektor ein, und beide Möglichkeiten beeinträchtigten die Abrufqualität.</p>
<p>Milvus 3.0 unterstützt NULL auf Vektorfeldern in allen sechs Vektortypen. Die Suche überspringt NULL-Vektoren automatisch, die Qualität der Suche wird nicht beeinträchtigt und NULL-Vektoren nehmen praktisch keinen Speicherplatz in Anspruch. <code translate="no">AddField</code> wird durch diese Änderung auch auf Vektorfelder ausgedehnt: Mit <code translate="no">nullable=True</code> kann eine bestehende Sammlung online neue Vektorfelder ohne Neuaufbau erzeugen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">Nullbare Felder</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Benutzerdefiniertes Wörterbuch &amp; Synonymwörterbuch</h4><p>Standard-Tokenizer erfüllen nicht immer die Anforderungen an die Qualität der Produktionssuche. Chinesisch, vertikale Domänen wie Medizin, Recht und Chemie sowie mehrsprachige Korpora können von benutzerdefinierten Wörterbüchern und Synonymtabellen erheblich profitieren. Bis jetzt wurden diese Ressourcen meist als anwendungsseitige Abfrageumschreibungen genutzt.</p>
<p>Milvus 3.0 fügt einen FileResource-Mechanismus zur Registrierung von benutzerdefinierten Tokenizer-Wörterbüchern, Synonymlisten, Stoppwortlisten und Dekompositionsregeln hinzu. Einmal registriert, kann eine Ressource von jedem Tokenizer oder Filter referenziert werden und wirkt sich auf BM25, Analysatoren und Text Match aus. Wörterbücher und Synonyme können nun zentral versioniert und verwaltet werden, anstatt über den Anwendungscode verstreut zu sein.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/manage-file-resources.md">Verwalten von Dateiressourcen</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">Entitäts-TTL</h4><p>Die TTL auf Sammlungs- und Partitionsebene ist für viele Lebenszyklus- und Compliance-Szenarien zu grob. Verschiedene Tenants innerhalb derselben Sammlung haben oft unterschiedliche Aufbewahrungsregeln, und einzelne Entitäten müssen möglicherweise nach einem Zeitplan ablaufen, der nicht mit dem Rest der Sammlung übereinstimmt.</p>
<p>Milvus 3.0 unterstützt die TTL pro Entität. Deklarieren Sie ein <code translate="no">TIMESTAMPTZ</code> Feld im Schema, markieren Sie es als TTL-Feld durch eine Sammlungseigenschaft, und Milvus fordert abgelaufene Entitäten automatisch zurück. Dies deckt Right-to-Be-Forgotten-Anfragen, ablaufende Sitzungsdaten und einen begrenzten Gesprächsverlauf ohne anwendungsseitige Bereinigung ab.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">TTL auf Entitätsebene festlegen</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 fügte den <code translate="no">MINHASH_LSH</code> -Index für die setbasierte Erkennung von Beinahe-Duplikaten hinzu, aber Anwendungen mussten immer noch MinHash-Signaturen berechnen, bevor sie Daten in Milvus schreiben konnten.</p>
<p>Milvus 3.0 fügt eine Server-seitige MinHash-Funktion hinzu. Deklarieren Sie ein <code translate="no">VARCHAR</code> Eingabefeld und ein <code translate="no">BINARY_VECTOR</code> Ausgabefeld im Schema, fügen Sie eine <code translate="no">FunctionType.MINHASH</code> Funktion hinzu, und Milvus berechnet die Signaturen während des Einfügens, der Masseneinfügung und der Suche. Zusammen mit <code translate="no">MINHASH_LSH</code> unterstützt dies Deduplizierungs-Workflows für große Datensätze, Fingerprinting und Plagiatserkennung innerhalb von Milvus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/minhash-function.md">MinHash-Funktion</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Die Annahme "eine Entität = ein Vektor" passt nicht mehr zum modernen Retrieval. Lange Dokumente werden in viele Teile zerlegt, späte Interaktionsmodelle wie ColBERT geben einen Vektor pro Token aus, und multimodale Entitäten können mehrere Ansichten enthalten.</p>
<p>EmbList speichert eine Vektorliste variabler Länge pro Entität, mit <code translate="no">DISKANN</code> als Index auf der Festplatte. Der Festplattenpfad hält die RAM-Nutzung unter Kontrolle, wenn der Korpus das Speicherbudget überschreitet. EmbList + <code translate="no">DISKANN</code> ist die erste Variante der breiteren StructList-Familie in diesem RC. Der Rest der Familie, einschließlich StructList-Filterung und Muvera/Lemur-Multivektorbeschleunigung, ist für die offizielle Version 3.0 vorgesehen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/search-with-embedding-lists.md">Suche mit einbettenden Listen</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Zusammenführen erzwingen</h4><p>Produktions-Workloads akkumulieren im Laufe der Zeit Segmentfragmentierung, was zu Abfrage-Latenz-Jitter und aufgeblähtem Speicher führt.</p>
<p>Milvus 3.0 fügt die Möglichkeit hinzu, die Segmentkompaktierung explizit in Schwachlastzeiten auszulösen, sowohl im synchronen als auch im asynchronen Modus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/force-merge.md">Erzwingen der Zusammenführung von Daten</a>.</p>
