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
    </button></h1><p>Erfahren Sie, was es Neues bei Milvus gibt! Auf dieser Seite finden Sie eine Übersicht über neue Funktionen, Verbesserungen, bekannte Probleme und Fehlerbehebungen in den einzelnen Versionen. Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um sich über Aktualisierungen zu informieren.</p>
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
<p>Mit Milvus v3.0-beta beginnt der Wandel von Milvus von einer Vektordatenbank zu einer semantisch nativen Lake-Engine. Der Milvus-Kernel kann nun direkt mit Daten in offenen Lake-Formaten arbeiten, und die Kernfunktionen von Milvus wurden in den Bereichen Abruf, Schema, Lebenszyklus, Sprache und Operationen erweitert.</p>
<p>„External Collection“ und „Snapshot“ sind die wichtigsten Neuerungen auf der Lake-Seite. Derselbe Kernel bildet auch die Grundlage für Zilliz Lakebase, eine semantisch-native Datenplattform, die auf Milvus 3.0 aufbaut.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Externe Erfassung</h4><p>In typischen KI-Datenpipelines befinden sich bereits Terabytes an Embeddings und Metadaten als Parquet-, Lance- oder Iceberg-Tabellen im Objektspeicher. Das Kopieren dieser Daten in Milvus verdoppelt die Speicherkosten, erfordert eine ETL-Pipeline, die synchronisiert werden muss, und entzieht dem Kunden die Kontrolle über die Datenverwaltung.</p>
<p>Die externe Erfassung macht das Kopieren überflüssig. Eine Milvus-Erfassung kann auf Dateien verweisen, wo diese bereits gespeichert sind, und Milvus verwaltet lediglich das Schema, die Indizes und die Abfrageausführung. Eine inkrementelle Aktualisierung sorgt dafür, dass die Collection stets mit den zugrunde liegenden Dateien synchron bleibt. Kunden, deren Daten den Lake nicht verlassen dürfen – beispielsweise Teams aus den Bereichen Finanzen und Gesundheitswesen –, können Vektorabfragen für diese Daten direkt an ihrem Speicherort durchführen. Ein einzelner, im Lake befindlicher Datensatz kann zudem gleichzeitig von mehreren Milvus-Instanzen bereitgestellt werden.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/create-an-external-collection.md">„Externe Sammlung erstellen</a>“.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Für die Bereitstellung und die Batch-Erkennung wird oft gleichzeitig auf dieselbe Sammlung zugegriffen. A/B-Modellauswertung, groß angelegte Deduplizierung, Backfill-Validierung und Versions-Rollback erfordern alle eine stabile Ansicht der Sammlung, während weiterhin Schreibvorgänge stattfinden.</p>
<p>Ein Snapshot erstellt eine zeitpunktbezogene, schreibgeschützte Ansicht einer Collection, indem er auf vorhandene Segmente verweist, anstatt Daten zu kopieren, sodass die zusätzlichen Speicherkosten nahezu null sind. Batch-Jobs können unter MVCC-ähnlicher Isolation aus dem Snapshot lesen, während die Live-Collection weiterhin Schreibvorgänge akzeptiert.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/snapshots.md">„Snapshots“</a>, <a href="/docs/de/manage-snapshots.md">„Snapshots verwalten</a>“ und <a href="/docs/de/snapshot-use-cases.md">„Anwendungsfälle für Snapshots</a>“.</p>
<h4 id="External-Backfill" class="common-anchor-header">Externes Backfill</h4><p>Das Upgrade eines Einbettungsmodells – beispielsweise der Wechsel von v1-Einbettungen zu v2-Einbettungen in einer bestehenden Sammlung – bedeutete bisher, dass das Modell von Grund auf neu erstellt werden musste. Dies führte entweder zu Ausfallzeiten des Dienstes oder erforderte eine Dual-Write-Logik auf Anwendungsseite.</p>
<p>Milvus 3.0 unterstützt das Upgrade als „Hot Workflow“. Sie können ein neues Vektorfeld mit „ <code translate="no">AddCollectionField</code> “ hinzufügen, mithilfe eines Snapshots einen konsistenten Ausgangspunkt einfrieren, den Einbettungsjob offline anhand des Snapshots ausführen und die Werte über die normalen Erfassungspfade zurückschreiben. Nachdem das neue Feld online indiziert wurde, kann die Anwendung ohne Ausfallzeiten umschalten.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Abfrage / Suche nach „Order By“</h4><p>Suche und Abfrage akzeptieren nun die Sortierung nach mehreren Feldern, wobei die Sortierung in den Milvus-Kern verlagert wird und „ <code translate="no">ASC</code> “ sowie „ <code translate="no">DESC</code> “ pro Feld einstellbar sind. Dies schließt eine häufige Lücke in der Produktion: „Top-K“ allein nach Entfernung entspricht oft nicht den geschäftlichen Anforderungen, wenn das ähnlichste Element nicht das günstigste, das neueste oder das beliebteste ist.</p>
<p>Anwendungen müssen nun nicht mehr übermäßig viele Ergebnisse abrufen und auf dem Client neu sortieren, um zusammengesetzte Ranglisten darzustellen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">„Sortieren von Suchergebnissen nach skalaren Feldern</a> “ und <a href="/docs/de/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">„Sortieren von Abfrageergebnissen</a>“.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null-Vektor</h4><p>Einbettungen werden oft asynchron erzeugt, sodass eine Entität eintreffen kann, bevor ihr Vektor bereitsteht. Auch multimodale Daten weisen natürliche Lücken auf, wie beispielsweise ein Video ohne Untertitel oder ein Produkt ohne Bild. Frühere Versionen hatten hierfür keine gute Lösung: Anwendungen verzögerten entweder den Schreibvorgang, bis der Vektor bereit war, oder füllten einen Platzhaltervektor ein – beides beeinträchtigte die Abfragequalität.</p>
<p>Milvus 3.0 unterstützt „NULL“ für Vektorfelder bei allen sechs Vektortypen. Die Suche überspringt „NULL“-Vektoren automatisch, die Suchqualität bleibt unbeeinträchtigt, und „NULL“-Vektoren beanspruchen praktisch keinen Speicherplatz. Die Funktion „ <code translate="no">AddField</code> “ gilt im Rahmen dieser Änderung auch für Vektorfelder: Mit „ <code translate="no">nullable=True</code> “ kann eine bestehende Sammlung online neue Vektorfelder hinzufügen, ohne dass ein Neuaufbau erforderlich ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullable Fields</a>“.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Benutzerdefinierte Wörterbücher und Synonymwörterbücher</h4><p>Standard-Tokenizer erfüllen nicht immer die Anforderungen an die Suchqualität im Produktivbetrieb. Chinesisch, vertikale Fachgebiete wie Medizin, Recht und Chemie sowie mehrsprachige Korpora können erheblich von benutzerdefinierten Wörterbüchern und Synonymtabellen profitieren. Bislang wurden diese Ressourcen meist als anwendungsseitige Abfrageumschreibungen implementiert.</p>
<p>Milvus 3.0 führt einen „FileResource“-Mechanismus ein, mit dem benutzerdefinierte Wörterbücher für Tokenizer, Synonymlisten, Stoppwortlisten und Regeln zur Zerlegung zusammengesetzter Wörter registriert werden können. Nach der Registrierung kann eine Ressource von jedem Tokenizer oder Filter aus referenziert werden und wirkt sich auf BM25, Analysatoren und Text Match aus. Wörterbücher und Synonyme können nun zentral verwaltet und versioniert werden, anstatt über den Anwendungscode verstreut zu sein.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/manage-file-resources.md">„Dateiressourcen verwalten</a>“.</p>
<h4 id="Entity-TTL" class="common-anchor-header">Entity-TTL</h4><p>Die TTL auf Collection- und Partitionsebene ist für viele Lebenszyklus- und Compliance-Szenarien zu grob. Verschiedene Mandanten innerhalb derselben Collection haben oft unterschiedliche Aufbewahrungsregeln, und einzelne Entitäten müssen möglicherweise nach einem Zeitplan ablaufen, der nicht mit dem Rest der Collection übereinstimmt.</p>
<p>Milvus 3.0 unterstützt TTL auf Entitätsebene. Deklarieren Sie im Schema ein Feld „ <code translate="no">TIMESTAMPTZ</code> “, kennzeichnen Sie es über eine Collection-Eigenschaft als TTL-Feld, und Milvus entfernt abgelaufene Entitäten automatisch. Dies deckt Anträge auf das Recht auf Vergessenwerden, das Ablaufen von Sitzungsdaten und begrenzte Konversationsverläufe ab, ohne dass eine Bereinigung auf Anwendungsseite erforderlich ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">„TTL auf Entitätsebene festlegen</a>“.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Mit Milvus 2.6 wurde der „ <code translate="no">MINHASH_LSH</code> “-Index für die setbasierte Erkennung von Beinahe-Duplikaten eingeführt, doch Anwendungen mussten weiterhin MinHash-Signaturen berechnen, bevor Daten in Milvus geschrieben wurden.</p>
<p>Milvus 3.0 führt eine serverseitige MinHash-Funktion ein. Deklarieren Sie im Schema ein Eingabefeld „ <code translate="no">VARCHAR</code> “ und ein Ausgabefeld „ <code translate="no">BINARY_VECTOR</code> “, fügen Sie eine „ <code translate="no">FunctionType.MINHASH</code> “-Funktion hinzu, und Milvus berechnet die Signaturen während des Einfügens, des Masseneinfügens und der Suche. Zusammen mit „ <code translate="no">MINHASH_LSH</code> “ unterstützt dies Deduplizierungs-Workflows für große Datensätze, Fingerprinting und Plagiatserkennung innerhalb von Milvus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/minhash-function.md">„MinHash-Funktion</a>“.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Die Annahme „eine Entität = ein Vektor“ passt nicht mehr zur modernen Informationsgewinnung. Lange Dokumente werden in viele Teile zerlegt, Modelle mit später Interaktion wie ColBERT geben pro Token einen Vektor aus, und multimodale Entitäten können mehrere Ansichten enthalten.</p>
<p>EmbList speichert pro Entität eine Vektorliste variabler Länge, wobei „ <code translate="no">DISKANN</code> “ als Index auf der Festplatte dient. Der Festplattenpfad hält den RAM-Verbrauch unter Kontrolle, wenn das Korpus die Speichergrenzen überschreitet. EmbList + „ <code translate="no">DISKANN</code> “ ist die erste Variante der umfassenderen StructList-Familie in diesem RC. Der Rest der Familie, einschließlich der StructList-Filterung und der Muvera-/Lemur-Beschleunigung für mehrere Vektoren, ist für die offizielle Version 3.0 vorgesehen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/search-with-embedding-lists.md">„Suche mit Embedding-Listen</a>“.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>In Produktionsumgebungen kommt es im Laufe der Zeit zu einer zunehmenden Segmentfragmentierung, was zu Schwankungen bei der Abfragelatenz und einem übermäßigen Speicherbedarf führt.</p>
<p>Milvus 3.0 bietet nun die Möglichkeit, die Segmentkomprimierung während Zeiten mit geringer Auslastung explizit auszulösen – sowohl im synchronen als auch im asynchronen Modus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/force-merge.md">„Zwangskompaktierung erzwingen</a>“.</p>
