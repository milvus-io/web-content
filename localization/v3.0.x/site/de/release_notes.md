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
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: 29. Juli 2026</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python-SDK-Version</th><th>Node.js-SDK-Version</th><th>Java-SDK-Version</th><th>Go-SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 ist offiziell veröffentlicht! Aufbauend auf der in <a href="https://milvus.io/docs/release_notes.md#v30-beta">der 3.0-Beta-Version</a> eingeführten Lake-Native-Architektur vollendet diese Version das, was die Beta-Version begonnen hat: „External Collection“ deckt weitere Lakehouse-Workflows ab; das Schema unterstützt das Online-Hinzufügen, -Nachfüllen und -Löschen; der Sparse-Index wurde auf Basis von SINDI neu aufgebaut; „StructArray“ und die facettierte Suche runden die Abruf-Engine ab; „FAISS-Passthrough“ und „TEXT“ erweitern die Auswahl an Indizes und Modalitäten; und „Woodpecker“ läuft als eigenständiger Dienst.</p>
<p>Sehen Sie sich das folgende Video an, um mehr über Milvus 3.0 zu erfahren, und nehmen Sie an der AMA mit den Kernentwicklern teil:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Wenn Sie neu in der 3.0-Reihe sind, fasst der Abschnitt „Core 3.0-Funktionen im Rückblick“ unten die in der 3.0-Beta eingeführten Funktionen zusammen; die vollständigen Beschreibungen finden Sie in <a href="https://milvus.io/docs/release_notes.md#v30-beta">den Versionshinweisen zur 3.0-Beta</a>.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Neuerungen in 3.0.0 (seit 3.0-Beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Externe Sammlung: umfassendere Lakehouse-Workflows</h4><p>Mit der 3.0-Beta-Version wurde „External Collection“ eingeführt: Sie können Lake-Dateien direkt referenzieren, Indizes erstellen und diese durchsuchen, ohne Daten in Milvus zu kopieren. Diese Version erweitert diese Funktion hin zu vollständigen Lakehouse-Abfrage-Workflows. Externe Felder können nun als Eingabe für Funktionsausgabefelder dienen, wie z. B. BM25-Sparse-Vektoren, MinHash-Signaturen und Text-Embeddings, sodass Text- und modellbasierte Suchfelder innerhalb von Milvus erstellt werden, ohne die Quelltabelle zu kopieren. Die Aktualisierung unterstützt zudem eine additive Schemaentwicklung: Wenn die externe Tabelle neue Spalten erhält, passt Milvus die betroffenen Segmente an, anstatt die Sammlung neu aufzubauen.</p>
<p>Diese Version fügt außerdem ein externes Format namens „ <code translate="no">milvus-table</code> “ hinzu, das Milvus-Snapshot-Metadaten und Storage-V3-Manifeste als externe Quelle behandelt, sodass ein Sammlungs-Snapshot selbst als externe Tabelle bereitgestellt werden kann – Batch- und Servingsysteme erhalten eine gemeinsame, durch Manifeste gestützte Ansicht derselben Daten.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/create-an-external-collection.md">„Externe Sammlung</a> und <a href="/docs/de/snapshots.md">Snapshots</a> <a href="/docs/de/create-an-external-collection.md">erstellen</a> “.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Flexibles Schema: Spalten online hinzufügen, nachträglich einfügen und entfernen</h4><p>Schemas bleiben in der Produktion nicht statisch – eingebettete Modelle werden ersetzt, Features durchlaufen Iterationen, Felder werden veraltet – und dies bedeutete früher einen vollständigen Neuaufbau der Sammlung mit Ausfallzeiten oder doppelten Schreibvorgängen. Version 3.0.0 schließt den Kreis: Spalten können hinzugefügt, nachträglich gefüllt und entfernt werden, während der Betrieb weiterläuft.</p>
<p>Das Nachfüllen funktioniert in beide Richtungen. Das externe Nachfüllen verarbeitet Werte, die außerhalb von Milvus berechnet wurden: Fügen Sie eine Spalte hinzu, erstellen Sie einen Snapshot der Sammlung als konsistenten Ausgangspunkt, führen Sie den Job offline aus, schreiben Sie die Werte zurück, und Milvus indiziert die neue Spalte inkrementell – ein Upgrade des Einbettungsmodells über Hunderte Millionen Zeilen hinweg wird so zu einem Hot-Path ohne Ausfallzeiten. Das interne Backfill deckt vom Kernel abgeleitete Werte ab: Ordnen Sie einer bestehenden Sammlung eine BM25- oder MinHash-Funktion zu, und deren Ausgabefeld wird automatisch anhand der vorhandenen Daten berechnet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/add-fields-to-an-existing-collection.md">„Felder zu einer bestehenden Sammlung hinzufügen</a>“.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Überarbeitung des Sparse-Index: SINDI, Block-Max WAND und Block-Max MaxScore</h4><p>Milvus 3.0 verbessert den Sparse-Vektor-Index in allen Bereichen. Es führt neue Suchalgorithmen ein – <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND und Block-Max MaxScore – sowie Inverted-List-Komprimierung, konfigurierbare Quantisierung und die Auswahl von Suchalgorithmen je nach Workload. Das Laden über mmap, die Serialisierung und die BM25-Bewertung wurden ebenfalls optimiert, wodurch der Speicherbedarf des Indexes und der Overhead beim Laden für die groß angelegte Suche nach spärlichen Vektoren und Volltextsuche reduziert werden. In internen Benchmarks ist der komprimierte BM25-Index bei vergleichbarer Recall-Rate etwa dreimal kleiner als der 2.6-Sparse-Index, und SINDI erreicht bei trainierten spärlichen Einbettungen bis zu etwa das Zehnfache der QPS von MaxScore. Sobald die neue Indexversion aktiviert ist (siehe Hinweise zu Kompatibilität und Verhalten), ist SINDI die Standardeinstellung für die spärliche IP-Suche und MaxScore die Standardeinstellung für BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray-Unterstützung</h4><p>StructArray unterstützt nun Nullwerte, Bitmap-Indizes, das dynamische Hinzufügen von Feldern zu aktiven Sammlungen sowie die teilweise Aktualisierung von Struct-Feldern durch „Upsert“, ergänzt durch entsprechende Unterstützung für REST und Massenimport.</p>
<p>Die Suche auf Elementebene bietet nun eine hybride Suche über Vektor-Unterfelder hinweg mit konfigurierbarer Zusammenfassung pro Entität (Varianten „max“, „sum“, „avg“ und „top-k“) sowie Bereichssuche und Gruppierung innerhalb dieser Suche. Die verschachtelte Filterung umfasst die Prädikate „ <code translate="no">element_filter</code> “, die Quantoren „ <code translate="no">MATCH_ANY</code> “, „ <code translate="no">MATCH_ALL</code> “, „ <code translate="no">MATCH_LEAST</code> “, „ <code translate="no">MATCH_MOST</code> “ und „ <code translate="no">MATCH_EXACT</code> “, den positionellen Zugriff auf Unterfelder wie „ <code translate="no">tags[0][name]</code> “ sowie „ <code translate="no">array_length()</code> “ für die Struct-Spalte.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/array-of-structs.md">„StructArray</a> “ und <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Suchaggregation und facettierte Suche</h4><p>Die Abfrageaggregation aus der Beta-Version berechnet exakte Statistiken über gefilterte Daten; Version 3.0.0 fügt die Facettierung im Suchpfad hinzu. Geben Sie zum Zeitpunkt der Suche ein Facettenfeld an, und Milvus gibt die wichtigsten Facettenwerte zurück, die jeweils durch das am besten passende Element im ANN-Ranking repräsentiert und mit Aggregaten wie COUNT und AVG versehen sind – die Seitenleiste für die facettierte Suche (Marke, Preisklasse, Attribute) in einer einzigen Abfrage, anstatt clientseitig zu viele Daten abzurufen und zu zählen.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Neubewertung über die Function Chain</h4><p>Das Reranking lässt sich nun über die Function-Chain-API zusammenstellen, die eine geordnete, typisierte Pipeline als Teil einer einzigen Suchanfrage ausführt. Eine Kette kann eine frühzeitige L0-Neubewertung auf dem „QueryNode“ mit einer L2-Neubewertung nach der Reduktion auf dem „Proxy“ kombinieren und unterstützt dabei die Transformation und Kombination von Bewertungen, modellbasierte Neubewertung, Sortierung und das Aussortieren von Kandidaten ohne clientseitige Koordination. Diese Version fügt außerdem eine native XGBoost-Bewertung für das L0-Reranking hinzu, die auf als „FileResources“ registrierten UBJ-Modellen basiert, sowie Hugging Face-Inferenz-Provider für serverseitig verwaltete Text-Embeddings und das Reranking nach Satzähnlichkeit.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT-Felder für Langtexte</h4><p>TEXT-Felder machen Langtexte zu einer vollwertigen Datenklasse, wobei speicherseitige Längenbeschränkungen entfallen: Sie unterstützen „ <code translate="no">text_match</code> “, „ <code translate="no">phrase_match</code> “ und „BM25“. Werte unter 64 KB bleiben inline; größere Werte werden in LOB-Dateien auf Partitionsebene im Vortex-Format gespeichert, wobei die Spalte nur „ <code translate="no">(file_id, offset)</code> “-Referenzen enthält. LOB-Dateien werden segmentübergreifend gemeinsam genutzt, sodass bei der Komprimierung Referenzen verschoben werden, anstatt Text neu zu schreiben. Für RAG bedeutet dies, dass Vektoren und Quelltext in einem einzigen I/O-Vorgang aus demselben Speicher abgerufen werden – es ist kein externer Blob-Speicher erforderlich.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS-Index-Passthrough</h4><p>Ein neuer „ <code translate="no">FAISS</code> “-Indextyp akzeptiert beliebige Faiss-Index-Factory-Zeichenfolgen über den Parameter „ <code translate="no">faiss_index_name</code> “ – <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> – wobei Suchparameter weitergegeben werden, sodass Faiss-Rezepte direkt in Milvus reproduziert werden können.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Unterstützung für die Formate Vortex und Lance</h4><p>Die Speicherschicht wird um zwei offene spaltenorientierte Formate erweitert: Vortex als internes Format der nächsten Generation – adaptive Kodierungen (Dictionary, RLE, Bit-Packing, float-spezifische Komprimierung), Zero-Copy-Dekomprimierung, optimiert für gemischte Vektor- und Skalar-Workloads – sowie Lance neben Parquet für den Austausch innerhalb eines offenen Ökosystems. Vortex soll zum standardmäßigen internen Format werden, wobei Filter-Pushdown und eine lokale Variante auf der Roadmap stehen.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Standalone-Bereitstellung von Woodpecker</h4><p>Woodpecker, das WAL im Kern des Streaming-Schreibpfads, kann nun als eigenständiger Dienst bereitgestellt werden, anstatt in andere Knoten eingebettet zu sein – mit unabhängiger Skalierung, Fehlerisolierung und Beobachtbarkeit wie jeder andere Microservice. Dies ist vor allem für große Cluster und Workloads mit hohem Schreibaufkommen von Bedeutung.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Zusammenfassung der wichtigsten Funktionen von 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgenden Funktionen wurden in <a href="https://milvus.io/docs/release_notes.md#v30-beta">der 3.0-Beta</a> eingeführt und sind Teil von 3.0.0; die vollständigen Beschreibungen finden Sie in den Beta-Hinweisen.</p>
<ul>
<li><strong>Externe Sammlung</strong> – Abfrage von Lakehouse-Daten (Parquet, Lance, Iceberg, Vortex) an Ort und Stelle: Zero-Copy, schreibgeschützt, synchronisiert durch inkrementelle Aktualisierung.</li>
<li><strong>Snapshot</strong> – zeitpunktbezogene, schreibgeschützte Sammlungsansichten nach Segmentreferenz mit nahezu null marginalem Speicherbedarf.</li>
<li><strong>Storage V3 (Loon)</strong> – manifestbasierter spaltenorientierter Speicher auf Objektspeicher; die Grundlage für „Snapshot“ und „Externe Sammlung“.</li>
<li><strong>Abfrage/Suche ORDER BY</strong> – serverseitige Sortierung nach mehreren Feldern mit ASC/DESC pro Feld.</li>
<li><strong>Abfrageaggregation</strong> – COUNT / SUM / AVG / MIN / MAX mit Gruppierung, serverseitig ausgewertet.</li>
<li><strong>EmbList + DiskANN</strong> – On-Disk-Multi-Vektor-Indizierung für StructArray-Einbettungslisten, mit Beschleunigungspfaden wie Muvera und Lemur.</li>
<li><strong>MinHash-Funktion (doc-in, doc-out)</strong> – serverseitige MinHash-Signaturen sowie „ <code translate="no">MINHASH_LSH</code> “ zur Erkennung von Beinahe-Duplikaten.</li>
<li><strong>Nullfähige Vektoren</strong> — NULL bei allen sechs Vektortypen; die Suche überspringt NULL-Zeilen, und „AddField“ lässt sich auf Vektorfelder ausweiten.</li>
<li><strong>Entity-TTL</strong> – zeilenweiser Ablauf, gesteuert durch ein TIMESTAMPTZ-Feld.</li>
<li><strong>FileResource</strong> – vom Cluster verwaltete Wörterbücher, Synonymlisten und Stoppwortlisten für Analysatoren, BM25 und Text Match.</li>
<li><strong>Force Merge</strong> – durch einen Operator ausgelöste Segmentverdichtung im synchronen oder asynchronen Modus.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Hinweise zu Kompatibilität und Verhalten<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) ist standardmäßig deaktiviert.</strong> Funktionen, die davon abhängen – wie z. B. Snapshot- und TEXT-Felder – müssen manuell über <code translate="no">common.storage.useLoonFFI</code> aktiviert werden. Storage V3 wird in einer späteren Version standardmäßig aktiviert sein.</li>
<li><strong>Die Kompatibilität und das Rollback von 2.6 → 3.0 sind gewährleistet</strong> – eine 3.0-Bereitstellung kann auf 2.6 zurückgesetzt werden. Sobald Sie jedoch Funktionen aktivieren oder nutzen, die das serialisierte Datenformat ändern (z. B. Storage V3), ist ein Rollback nicht mehr möglich.</li>
<li><strong>Neue Indexversionen sind vorerst optional.</strong> Neu eingeführte Indexalgorithmen erfordern eine manuelle Anhebung der Zielindexversion (<code translate="no">dataCoord.targetVecIndexVersion</code> auf 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> auf 4), bevor sie wirksam werden; in einer späteren Version werden sie standardmäßig aktiviert sein.</li>
<li><strong>GPU-Images werden auf CUDA 12.9 umgestellt</strong> und behalten die GPU-Kompatibilität mit Ubuntu 20.04 nicht mehr bei.</li>
</ul>
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
<p>Milvus 3.0-beta erweitert die Milvus-Vektordatenbank um neue Integrationsmöglichkeiten in das Open-Lake-Ökosystem: Mit „External Collection“ kann Milvus externe Lake-Tabellen ohne Kopiervorgang abfragen, und Spark kann Milvus-Sammlungen direkt über Snapshot lesen. Die Version bietet zudem umfangreichere Abrufmöglichkeiten, ein ausdrucksstärkeres Schema, tiefgreifendere Anpassungsmöglichkeiten für die Textsuche, feinere Steuerungsmöglichkeiten für den Daten- und Modelllebenszyklus sowie mehr Steuerungsmöglichkeiten auf Operatorebene. Milvus 3.0 ist der Kern von Zilliz Lakebase und bildet die Grundlage für dessen einheitliche Bereitstellung, Erkennung und Batch-Verarbeitung.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">„External Collection“</h4><p>In typischen KI-Datenpipelines befinden sich bereits Terabytes an Embeddings und Metadaten als Parquet-, Lance- oder Iceberg-Tabellen im Objektspeicher. Das Kopieren dieser Daten in Milvus verdoppelt die Speicherkosten, erfordert eine ETL-Pipeline, die synchronisiert werden muss, und entzieht dem Kunden die Kontrolle über die Datenverwaltung.</p>
<p>Die externe Erfassung macht das Kopieren überflüssig. Eine Milvus-Sammlung kann auf Dateien verweisen, wo diese sich bereits befinden, und Milvus verwaltet lediglich das Schema, die Indizes und die Abfrageausführung. Eine inkrementelle Aktualisierung sorgt dafür, dass die Collection stets mit den zugrunde liegenden Dateien synchron bleibt. Kunden, deren Daten den Lake nicht verlassen dürfen – beispielsweise Teams aus den Bereichen Finanzen und Gesundheitswesen –, können Vektorabfragen für diese Daten direkt an ihrem Speicherort durchführen. Ein einzelner, im Lake befindlicher Datensatz kann zudem gleichzeitig von mehreren Milvus-Instanzen bereitgestellt werden.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/create-an-external-collection.md">„Externe Sammlung erstellen</a>“.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Für die Bereitstellung und die Batch-Erkennung wird oft gleichzeitig auf dieselbe Sammlung zugegriffen. A/B-Modellauswertung, groß angelegte Deduplizierung, Backfill-Validierung und Versions-Rollback erfordern alle eine stabile Ansicht der Sammlung, während weiterhin Schreibvorgänge stattfinden.</p>
<p>Ein Snapshot erstellt eine zeitpunktbezogene, schreibgeschützte Ansicht einer Collection, indem er auf vorhandene Segmente verweist, anstatt Daten zu kopieren, sodass die zusätzlichen Speicherkosten nahezu null sind. Batch-Jobs können unter MVCC-ähnlicher Isolation aus dem Snapshot lesen, während die Live-Collection weiterhin Schreibvorgänge akzeptiert.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/snapshots.md">„Snapshots“</a>, <a href="/docs/de/manage-snapshots.md">„Snapshots verwalten</a>“ und <a href="/docs/de/snapshot-use-cases.md">„Anwendungsfälle für Snapshots</a>“.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Abfrage / Suche nach „Order By“</h4><p>Suche und Abfrage unterstützen nun die Sortierung nach mehreren Feldern, wobei die Sortierung in den Milvus-Kernel verlagert wird und „ <code translate="no">ASC</code> “ sowie „ <code translate="no">DESC</code> “ pro Feld einstellbar sind. Dies schließt eine häufige Lücke in der Produktion: „Top-K“ allein nach Entfernung entspricht oft nicht den geschäftlichen Anforderungen, wenn das ähnlichste Element nicht das günstigste, das aktuellste oder das beliebteste ist.</p>
<p>Anwendungen müssen nun nicht mehr übermäßig viele Ergebnisse abrufen und auf dem Client neu sortieren, um zusammengesetzte Ranglisten darzustellen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">„Sortieren von Suchergebnissen nach skalaren Feldern</a> “ und <a href="/docs/de/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">„Sortieren von Abfrageergebnissen</a>“.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Abfrageaggregation</h4><p>Um Statistiken zur Mandantenverteilung, Zählungen zur Feldvollständigkeit oder den Fortschritt bei der Versionsbereitstellung aus einer Milvus-Sammlung zu erstellen, mussten bisher passende Entitäten zurück auf den Client geladen und dort aggregiert werden. Milvus 3.0 integriert skalare Aggregationen im SQL-Stil in den Kernel. Ein Abfrageaufruf akzeptiert „ <code translate="no">group_by_fields</code> “ und Aggregationsausdrücke in „ <code translate="no">output_fields</code> “, einschließlich „ <code translate="no">count(*)</code> “, „ <code translate="no">count(&lt;field&gt;)</code> “, „ <code translate="no">sum(&lt;field&gt;)</code> “, „ <code translate="no">avg(&lt;field&gt;)</code> “, „ <code translate="no">min(&lt;field&gt;)</code> “ und „ <code translate="no">max(&lt;field&gt;)</code> “. Die Aggregation wird nach der Filterung serverseitig ausgewertet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">„Aggregieren von Abfrageergebnissen</a>“.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null-Vektor</h4><p>Embeddings werden oft asynchron erzeugt, sodass eine Entität eintreffen kann, bevor ihr Vektor bereitsteht. Auch multimodale Daten weisen natürliche Lücken auf, wie beispielsweise ein Video ohne Untertitel oder ein Produkt ohne Bild. Frühere Versionen boten hierfür keine zufriedenstellende Lösung: Anwendungen verzögerten entweder das Schreiben, bis der Vektor bereit war, oder füllten einen Platzhaltervektor ein – beides beeinträchtigte die Suchqualität.</p>
<p>Milvus 3.0 unterstützt NULL in Vektorfeldern für alle sechs Vektortypen. Die Suche überspringt NULL-Vektoren automatisch, die Suchqualität bleibt unbeeinträchtigt, und NULL-Vektoren beanspruchen praktisch keinen Speicherplatz. Die „ <code translate="no">AddField</code> “-Funktion erstreckt sich im Rahmen dieser Änderung auch auf Vektorfelder: Mit „ <code translate="no">nullable=True</code> “ kann eine bestehende Collection online neue Vektorfelder hinzufügen, ohne dass ein Neuaufbau erforderlich ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullfähige Felder</a>“.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Benutzerdefinierte Wörterbücher und Synonymwörterbücher</h4><p>Standard-Tokenizer erfüllen nicht immer die Anforderungen an die Suchqualität im Produktivbetrieb. Chinesisch, vertikale Fachgebiete wie Medizin, Recht und Chemie sowie mehrsprachige Korpora können erheblich von benutzerdefinierten Wörterbüchern und Synonymtabellen profitieren. Bislang wurden diese Ressourcen meist als anwendungsseitige Abfrageumschreibungen bereitgestellt.</p>
<p>Milvus 3.0 führt einen „FileResource“-Mechanismus ein, mit dem benutzerdefinierte Wörterbücher für Tokenizer, Synonymlisten, Stoppwortlisten und Regeln zur Zerlegung zusammengesetzter Wörter registriert werden können. Nach der Registrierung kann eine Ressource von jedem Tokenizer oder Filter aus referenziert werden und wirkt sich auf BM25, Analysatoren und Text Match aus. Wörterbücher und Synonyme können nun zentral verwaltet und versioniert werden, anstatt über den Anwendungscode verstreut zu sein.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/manage-file-resources.md">„Dateiressourcen verwalten</a>“.</p>
<h4 id="Entity-TTL" class="common-anchor-header">Entitäts-TTL</h4><p>Die TTL auf Collection- und Partitionsebene ist für viele Lebenszyklus- und Compliance-Szenarien zu grob. Verschiedene Mandanten innerhalb derselben Collection haben oft unterschiedliche Aufbewahrungsregeln, und einzelne Entitäten müssen möglicherweise nach einem Zeitplan ablaufen, der nicht mit dem Rest der Collection übereinstimmt.</p>
<p>Milvus 3.0 unterstützt TTL auf Entitätsebene. Deklarieren Sie im Schema ein Feld „ <code translate="no">TIMESTAMPTZ</code> “, kennzeichnen Sie es über eine Collection-Eigenschaft als TTL-Feld, und Milvus entfernt abgelaufene Entitäten automatisch. Dies deckt Anträge auf das Recht auf Vergessenwerden, das Ablaufen von Sitzungsdaten und begrenzte Konversationsverläufe ab, ohne dass eine Bereinigung auf Anwendungsseite erforderlich ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">„TTL auf Entitätsebene festlegen</a>“.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Mit Milvus 2.6 wurde der „ <code translate="no">MINHASH_LSH</code> “-Index für die setbasierte Erkennung von Beinahe-Duplikaten eingeführt, doch Anwendungen mussten weiterhin MinHash-Signaturen berechnen, bevor Daten in Milvus geschrieben wurden.</p>
<p>Milvus 3.0 führt eine serverseitige MinHash-Funktion ein. Deklarieren Sie im Schema ein Eingabefeld „ <code translate="no">VARCHAR</code> “ und ein Ausgabefeld „ <code translate="no">BINARY_VECTOR</code> “, fügen Sie eine „ <code translate="no">FunctionType.MINHASH</code> “-Funktion hinzu, und Milvus berechnet die Signaturen während des Einfügens, des Masseneinfügens und der Suche. Zusammen mit „ <code translate="no">MINHASH_LSH</code> “ unterstützt dies Deduplizierungs-Workflows für große Datensätze, Fingerprinting und Plagiatserkennung innerhalb von Milvus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/minhash-function.md">„MinHash-Funktion</a>“.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Die Annahme „eine Entität = ein Vektor“ passt nicht mehr zur modernen Dokumentensuche. Lange Dokumente werden in viele Teile zerlegt, Modelle mit später Interaktion wie ColBERT geben pro Token einen Vektor aus, und multimodale Entitäten können mehrere Ansichten enthalten.</p>
<p>EmbList speichert pro Entität eine Vektorliste variabler Länge, wobei „ <code translate="no">DISKANN</code> “ als Index auf der Festplatte dient. Der Festplattenpfad hält den RAM-Verbrauch unter Kontrolle, wenn das Korpus die Speichergrenzen überschreitet. EmbList + „ <code translate="no">DISKANN</code> “ ist die erste Variante der umfassenderen StructList-Familie in dieser RC-Version. Der Rest der Familie, einschließlich der StructList-Filterung und der Muvera-/Lemur-Beschleunigung für mehrere Vektoren, ist für die offizielle Version 3.0 vorgesehen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/search-with-embedding-lists.md">„Suche mit Embedding-Listen</a>“.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>In Produktionsumgebungen kommt es im Laufe der Zeit zu einer zunehmenden Segmentfragmentierung, was zu Schwankungen bei der Abfragelatenz und einem übermäßigen Speicherbedarf führt.</p>
<p>Milvus 3.0 bietet nun die Möglichkeit, die Segmentkomprimierung während Zeiten mit geringer Auslastung explizit auszulösen – sowohl im synchronen als auch im asynchronen Modus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/force-merge.md">„Force Merge Compaction</a>“.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 führt „Storage V3“ ein, eine manifestbasierte spaltenorientierte Speicher-Engine, bei der Daten und Metadaten auf einem S3-kompatiblen Objektspeicher liegen. Jede Datensatzversion wird als unveränderlicher Manifest-Snapshot erfasst – eine Avro-kodierte Datei, die festhält, aus welchen Spaltengruppen, Delta-Logs und Statistiken der Datensatz besteht.</p>
<p>Manifeste sind kompakte Avro-Dateien, und Delta-Logs protokollieren Löschungen auf Entitätsebene, ohne dass Datendateien neu geschrieben werden müssen. Dadurch bleibt der Metadaten-Overhead gering, auch wenn Datensätze wachsen. Das Manifest entkoppelt zudem die Metadatenverfolgung vom Abfragepfad, sodass eine Collection mehr Segmente verwalten kann, ohne dass die Abfrageleistung beeinträchtigt wird.</p>
<p>Da die Zustände im Objektspeicher abgelegt werden, ist der Datensatz selbsterklärend: Jeder Leser mit Zugriff auf den Speicherpfad kann ihn ohne zentralen Katalog erkennen und interpretieren. Diese Eigenschaft bildet die Grundlage für die Integration von „External Collection“, „Snapshot“ und zukünftigen Lake-Integrationen.</p>
