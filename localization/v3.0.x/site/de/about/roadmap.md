---
id: roadmap.md
title: Milvus-Roadmap
related_key: Milvus roadmap
summary: >-
  Entdecken Sie die Milvus-Roadmap für Suche, Analytik, Schemaentwicklung,
  Lake-Integration und Leistung in den Versionen 3.0 und 3.1.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus-Roadmap<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 3.0 vereint Multi-Vektor-Abfrage, SQL-ähnliche Abfragen, flexible Schemata und den Zugriff auf Daten im Lake-Speicher. Die nächsten Phasen bauen auf dieser Grundlage auf und bieten umfangreichere Abfragen, breitere Datenmodelle sowie Verbesserungen bei Leistung und Skalierbarkeit. Diese Roadmap umreißt die Prioritäten für das Open-Source-Projekt Milvus.</p>
<p>Milvus 3.0 ist ab <strong>Version 3.0.1</strong> allgemein verfügbar. Die unten aufgeführten veröffentlichten Funktionen wurden in <strong>Version 3.0.0</strong> eingeführt; Preview-Funktionen und Opt-in-Funktionen sind an den jeweiligen Stellen gekennzeichnet. Die <strong>3.0.x-Serie</strong> erweitert diese Funktionen, während <strong>3.1 für Dezember 2026 angestrebt wird</strong>. Geplante Funktionen und Zieltermine können sich im Laufe der Entwicklung ändern.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">Suche und Abruf<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Roadmap für die Ergebnisausgabe konzentriert sich auf die Kombination weiterer Relevanzsignale innerhalb von Milvus, von Textabgleich und Multi-Vektor-Darstellungen bis hin zu Reranking und Facetten für Suchergebnisse.</p>
<p><strong>Verfügbar in 3.0</strong></p>
<ul>
<li><strong>Multi-Vektor-Abruf:</strong> Die StructArray-Suche unterstützt Muvera und Lemur sowie „ <code translate="no">element_filter</code> “ für die Filterung auf Elementebene. Zu den Übereinstimmungsrichtlinien gehören „ <code translate="no">MATCH_ANY</code> “, „ <code translate="no">MATCH_ALL</code> “, „ <code translate="no">MATCH_LEAST</code> “, „ <code translate="no">MATCH_MOST</code> “ und „ <code translate="no">MATCH_EXACT</code> “.</li>
<li><strong>Textabgleich und Ähnlichkeit:</strong> Benutzerdefinierte Wörterbücher und Synonyme passen die Textsuche an die Anforderungen der Anwendung an. Die Regex-Filterung unterstützt den Musterabgleich, und MinHash unterstützt die Erkennung von Beinahe-Duplikaten.</li>
<li><strong>Neurangierung und Inferenz:</strong> Milvus 3.0 führt einen ersten Satz von Funktionen zur Neurangierung mittels „Function Chain“ sowie den „Hugging Face Inference Provider“ ein. Die übrigen „Function Chain“-Funktionen sind für Version 3.0.x geplant.</li>
<li><strong>Suchaggregation: Die</strong> Suchaggregation bietet Facetten für Suchergebnisse.</li>
</ul>
<p><strong>Geplant für 3.0.x</strong></p>
<p>Für die 3.0.x-Serie sind die Erweiterung um Fuzzy-Matching und globale Statistiken sowie die vollständige Unterstützung von „Function Chain“ geplant.</p>
<p><strong>Geplant für 3.1</strong></p>
<p>Geplant sind eine Grep-basierte Suche, eine engere Integration der Annäherungs-Nächster-Nachbar-Suche (ANN) und Filterung durch ANN-Filter-Fusion sowie Verbesserungen bei der spärlichen Suche.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">Analytik und Abfragen im SQL-Stil<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus erweitert seine Abfrage-Engine, sodass Anwendungen Daten neben der Abfrage auch sortieren und aggregieren können. In der nächsten Phase kommen Joins, materialisierte Ansichten und benutzerdefinierte Berechnungen hinzu.</p>
<p><strong>Verfügbar in 3.0</strong></p>
<p>Abfragen und Suchvorgänge unterstützen das Sortieren mit „ <code translate="no">ORDER BY</code> “. „Query Aggregation“ fügt „ <code translate="no">GROUP BY</code> “ zur Berechnung gruppierter Statistiken hinzu.</p>
<p><strong>Geplant für 3.1</strong></p>
<ul>
<li><strong>Erweiterte Abfragen:</strong> Einführung von Joins, beginnend mit Semi-Joins, sowie von „Materialized View Collections“.</li>
<li><strong>Datenaktualisierungen und -integrität:</strong> Unterstützung von In-Place-Aktualisierungen und der Deduplizierung von Primärschlüsseln während der Datenaufnahme.</li>
<li><strong>Abfrageiteration und JSON-Semantik:</strong> Hinzufügen eines zustandsbehafteten Abfrageiterators, JSON- <code translate="no">GROUP BY</code> s sowie SQL-/JSON-NULL-Semantik.</li>
<li><strong>Benutzerdefinierte Berechnungen:</strong> Unterstützung für benutzerdefinierte Python-Funktionen (UDFs).</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">Flexibles Schema und Datentypen<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Arbeit am Schema konzentriert sich auf die Weiterentwicklung bestehender Sammlungen und die Darstellung eines breiteren Spektrums an Daten. Sie umfasst Feldänderungen, Multi-Vektor-Strukturen, Langtext und das Ablaufen von Entitäten.</p>
<p><strong>Verfügbar in Version 3.0</strong></p>
<ul>
<li><strong>Online-Schemaänderungen:</strong> Bestehende Sammlungen unterstützen das Hinzufügen von Feldern im laufenden Betrieb, einschließlich Vektor- und <code translate="no">Array&lt;Struct&gt;</code> -Feldern. Das Löschen von Feldern ist als <strong>Vorschau</strong> verfügbar und unterliegt möglicherweise Einschränkungen.</li>
<li><strong>Nachvervollständigung für vorhandene Daten:</strong> Die externe Nachvervollständigung nutzt den Spark-Connector. Bei der internen Nachvervollständigung wird eine BM25- oder MinHash-Funktion an eine Sammlung angehängt und deren Ausgabe über die vorhandenen Daten berechnet.</li>
<li><strong>Text- und Multi-Vektor-Daten:</strong> Der Typ „ <code translate="no">TEXT</code> “ speichert Langtext, während „StructArray“ das Abrufen bei späterer Interaktion über „ <code translate="no">MAX_SIM</code> “ unterstützt. „ <code translate="no">TEXT</code> “ erfordert die aktivierte Storage V3.</li>
<li><strong>NULL-Werte und Ablauf:</strong> Vektorfelder akzeptieren NULL-Werte, und die Gültigkeitsdauer (Time-to-Live, TTL) auf Entitätsebene steuert den Ablauf.</li>
</ul>
<p><strong>Geplant für 3.0.x</strong></p>
<p>Geplante Schemaerweiterungen erweitern die StructArray-Unterstützung um Typen, NULL-Werte sowie das Hinzufügen und Entfernen von Feldern. Außerdem werden Unterstützung für Molekülformeln sowie Filter für „ <code translate="no">IS NULL</code> “ und „ <code translate="no">IS NOT NULL</code> “ für Vektorfelder hinzugefügt.</p>
<p><strong>Geplant für 3.1</strong></p>
<p>Die nächsten Erweiterungen des Datenmodells umfassen verschachtelte JSON- und Struct-Elemente, zusammengesetzte Primärschlüssel, Sammlungen ohne Vektorfelder sowie spärliche Vektoren in StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">Lake-Integration und Datenversionierung<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus arbeitet an einer engeren Integration mit Lake-Speichern und der Stapelverarbeitung. Externe Sammlungen ermöglichen den Zugriff auf Daten an ihrem Speicherort, während Snapshots die Grundlage für die Datenversionierung bilden.</p>
<p><strong>Verfügbar in 3.0</strong></p>
<ul>
<li><strong>Externer Datenzugriff:</strong> „External Collection“ unterstützt Lance-, Parquet- und Iceberg-Daten.</li>
<li><strong>Snapshots und Batch-Integration:</strong> Snapshots erfassen eine Version der Sammlungsdaten, und der Spark-Connector unterstützt Batch-Workflows.</li>
<li><strong>Speichergrundlage: Storage</strong> V3 (Loon) bietet optionale Unterstützung für Vortex und Lance. Diese ist standardmäßig deaktiviert und wird über „ <code translate="no">common.storage.useLoonFFI</code> “ aktiviert. Sowohl „Snapshot“ als auch „ <code translate="no">TEXT</code> “ sind davon abhängig.</li>
</ul>
<p><strong>Geplant für 3.0.x</strong></p>
<p>Geplante Erweiterungen ermöglichen es, dass ein Milvus-Erfassungs-Snapshot als externe Erfassung dient. Die Unterstützung für externe Tabellen wird zudem auf JSON-Shredding, das Hinzufügen von Funktionsfeldern und das Entfernen von Feldern ausgeweitet.</p>
<p><strong>Geplant für 3.1</strong></p>
<p>Geplant sind S3-basierte Sparse- und Skalarindizes sowie das Löschen per Import.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">Leistung, Indizierung und Skalierbarkeit<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Leistungs-Roadmap umfasst Abrufindizes, die Ausführung von Abfragen und das Clusterwachstum. Sie befasst sich zudem mit der Wiederherstellung und mit Abfragen, bei denen Daten aus dem Objektspeicher gelesen werden müssen.</p>
<p><strong>Verfügbar in Version 3.0</strong></p>
<ul>
<li><strong>Sparse-Indizierung:</strong> Mit der Überarbeitung der Sparse-Indizes wird SINDI eingeführt.</li>
<li><strong>Indexauswahl:</strong> Der „ <code translate="no">FAISS</code> “-Passthrough-Index akzeptiert Faiss-Index-Factory-Strings mit Optionen wie SVS, Panorama, PQ, IVFPQ und ScaNN. Die DiskANN-Indizierung ist ebenfalls für eingebettete Listen (EmbList) verfügbar.</li>
<li><strong>Kompaktierung:</strong> „Force Merge“ ermöglicht eine explizite Steuerung der Segmentzusammenführung.</li>
</ul>
<p><strong>Geplant für 3.1</strong></p>
<ul>
<li><strong>Speicheroptimierte Abfragen:</strong> Hinzufügen von Prädikat-Pushdown für Vortex, einschließlich Pruning auf Seitenebene und Skip-Indizes.</li>
<li><strong>Clusterwachstum und Mandantenfähigkeit:</strong> Unterstützung von Shard-Aufteilung, benutzerdefinierten Sharding-Schlüsseln und Optimierungen für die Mandantenfähigkeit.</li>
<li><strong>Abfrageausführung und Indizierung:</strong> Entwicklung von „QueryView“, Verbesserung der Unterstützung für umfangreiche Sammlungen, Reduzierung von Stream-Ergebnissen und Unterstützung mehrerer Indizes.</li>
<li><strong>Schreibzuverlässigkeit:</strong> Unterstützung idempotenter Schreibvorgänge.</li>
<li><strong>Objektspeicher-Caching:</strong> Einsatz von Talon als S3-Cache zur Verbesserung der Fehlerbehebung und der Leistung bei seltenen Abfragen.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">Über 3.1 hinaus<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>Zu den längerfristigen Arbeiten gehören „Time Travel“ und das Zurücksetzen von Snapshots. Der Umfang und der Zeitpunkt der Veröffentlichung stehen noch nicht fest.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">Gestalten Sie die Roadmap mit<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Teilen Sie in <a href="https://github.com/milvus-io/milvus/discussions">den GitHub-Diskussionen</a> die Arbeitslasten, Einschränkungen und Feature-Wünsche mit, die für Ihre Anwendungen wichtig sind. Melden Sie Fehler über <a href="https://github.com/milvus-io/milvus/issues">GitHub-Issues</a>.</p>
<p>Wenn Sie Code oder Dokumentation beisteuern möchten, lesen Sie zunächst den <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Leitfaden für Mitwirkende</a>.</p>
