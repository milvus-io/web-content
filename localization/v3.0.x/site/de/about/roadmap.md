---
id: roadmap.md
title: Milvus-Roadmap
related_key: Milvus roadmap
summary: >-
  Milvus ist eine Open-Source-Vektordatenbank, die speziell für KI-Anwendungen
  entwickelt wurde. Hier ist unsere Roadmap, die als Leitfaden für unsere
  Entwicklung dient.
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Auf dem Weg zur multimodalen Datenbank und zum Data Lake der nächsten Generation<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus-Produkt-Roadmap</strong></p>
<p>Willkommen bei der Milvus-Roadmap!</p>
<p>Wir führen Milvus in eine neue Ära – die der multimodalen Datenbank der nächsten Generation –, die von <strong>strukturierten bis zu unstrukturierten Daten</strong>, <strong>von Echtzeit-Abfragen bis zu Offline-Analysen</strong> und <strong>von der Leistung eines einzelnen Clusters bis hin zu einer globalen Data-Lake-Architektur</strong> reicht.</p>
<p>Diese Roadmap skizziert die Kernziele für <strong>Milvus v2.6 (in Arbeit)</strong>, <strong>Milvus v3.0 (geplant für Ende 2026)</strong> und <strong>Milvus v3.1 (langfristige Entwicklung)</strong> sowie den Entwicklungsplan für <strong>Vector Lake (Data Lake / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (in Entwicklung)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Zeitrahmen: Mitte 2025 – Ende 2025</strong></p>
<p>Schwerpunkte: <strong>Aktualisierung des Datenmodells</strong>, <strong>Überarbeitung der Streaming-Architektur</strong>, <strong>Aufbau von Hot/Cold-Tiering-Funktionen</strong> und Einführung des <strong>Vector Lake-Prototyps (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Wichtigste Highlights<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Aktualisierung des Datenmodells</strong></h4><ul>
<li><p>Einführung eines einheitlichen <strong>Tensor-/StructList-Datentyps</strong> zur Unterstützung von Multi-Vektor-Einbettungsstrukturen, wodurch Kompatibilität mit <em>ColBERT</em>, <em>CoLQwen</em>, <em>Video-</em> und <em>multimodalen Vektoren</em> ermöglicht wird.</p></li>
<li><p>Erweiterung um Unterstützung <strong>für Geodaten</strong>, einschließlich Punkten, Regionen und räumlicher Indizierung (basierend auf <em>libspatial</em>), um Anwendungsfälle in den Bereichen LBS und GIS zu erweitern.</p></li>
<li><p>Unterstützung für den Datentyp <strong>„Timestamp with Timezone</strong> “.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>Überarbeitung der StreamNode-Architektur</strong></h4><ul>
<li><p>Neuprogrammierung der Streaming-Erfassungspipeline zur Optimierung inkrementeller Schreibvorgänge und Echtzeitberechnungen.</p></li>
<li><p>Deutliche Verbesserung der Parallelverarbeitungsleistung und -stabilität, wodurch die Grundlage für eine einheitliche Echtzeit- und Offline-Verarbeitung geschaffen wird.</p></li>
<li><p>Einführung einer neuen Message-Queue-Engine: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Hot/Cold-Tiering und Speicherarchitektur (StorageV2)</strong></h4><ul>
<li><p>Unterstützung zweier Speicherformate: <strong>Parquet</strong> und <strong>Vortex</strong>, wodurch die Parallelität und die Speichereffizienz verbessert werden.</p></li>
<li><p>Implementierung einer mehrstufigen Speicherung mit automatischer Trennung von „Hot“- und „Cold“-Daten sowie intelligenter Planung.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Vector Lake-Prototyp (v0.1)</strong></h4><ul>
<li><p>Integration mit <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> über FFI, wodurch Offline-Schemaentwicklung und KNN-Abfragen ermöglicht werden.</p></li>
<li><p>Bereitstellung einer multimodalen Datenvisualisierung und einer Spark-ETL-Demo zur Etablierung der grundlegenden Data-Lake-Architektur.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (geplant für Anfang 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Zeitplan: Ende 2025 – Anfang 2026</strong></p>
<p>Schwerpunkt: Umfassende Verbesserungen der <strong>Suchfunktionalität</strong>, <strong>der Schemaflexibilität</strong> und <strong>der Unterstützung unstrukturierter Daten</strong> sowie die Veröffentlichung von <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Wichtigste Highlights<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>Überarbeitung der Sucherfahrung</strong></h4><ul>
<li><p>Einführung der Ähnlichkeitssuche <strong>„More Like This“ (MLT)</strong> mit Unterstützung für Suchanfragen mit Positionsangaben oder Negativbeispielen.</p></li>
<li><p>Erweiterung um semantische Suchfunktionen wie <strong>Hervorhebung</strong> und <strong>Gewichtung</strong>.</p></li>
<li><p>Unterstützung <strong>benutzerdefinierter Wörterbücher</strong> und <strong>Synonymtabellen</strong>, wodurch lexikalische und semantische Regeldefinitionen auf der Analyzer-Ebene ermöglicht werden.</p></li>
<li><p>Einführung von <strong>Aggregationsfunktionen</strong> für Abfragen.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Mandantenfähigkeit und Ressourcenmanagement</strong></h4><ul>
<li><p>Aktivierung von Multi-Tenancy-Löschvorgängen, Statistiken und Hot/Cold-Tiering.</p></li>
<li><p>Verbesserung der Ressourcenisolierung und der Planungsstrategien, um Millionen von Tabellen in einem einzigen Cluster zu unterstützen.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>Verbesserungen bei Schemata und Primärschlüsseln</strong></h4><ul>
<li><p>Implementierung <strong>einer globalen Primärschlüssel-Deduplizierung (Global PK Dedup)</strong>, um Datenkonsistenz und Eindeutigkeit zu gewährleisten.</p></li>
<li><p>Unterstützung <strong>einer flexiblen Schemaverwaltung</strong> (Hinzufügen/Entfernen von Spalten, Backup-Füllung).</p></li>
<li><p>Erlauben Sie <strong>NULL-Werte</strong> in Vektorfeldern.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Erweiterte unstrukturierte Datentypen (BLOB / Text)</strong></h4><ul>
<li><p>Einführung des <strong>BLOB-Typs</strong>, der native Speicherung und Referenzierung für binäre Daten wie Dateien, Bilder und Videos ermöglicht.</p></li>
<li><p>Führen Sie <strong>den TEXT-Typ</strong> ein, der erweiterte Volltext- und inhaltsbasierte Suchfunktionen bietet.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Funktionen auf Enterprise-Niveau</strong></h4><ul>
<li><p>Unterstützung von <strong>Snapshot-basierten Backups und Wiederherstellungen</strong>.</p></li>
<li><p>Bereitstellung von <strong>End-to-End-Tracing</strong> und <strong>Audit-Protokollierung</strong>.</p></li>
<li><p>Implementierung von <strong>Active-Standby-Hochverfügbarkeit (HA)</strong> über mehrere Cluster hinweg.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Unterstützt <strong>TEXT-/BLOB-Speicherung</strong> und <strong>die Verwaltung von Snapshots mit mehreren Versionen</strong>.</p></li>
<li><p>Integration von Spark für Offline-Indizierung, Clustering, Deduplizierung und Aufgaben zur Dimensionsreduktion.</p></li>
<li><p>Bereitstellung von <strong>ChatPDF-Demos für Cold-Query- und Offline-Benchmarks</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (Langfristige Vision)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Zeitplan: Mitte 2026</strong></p>
<p>Schwerpunkte: <strong>Benutzerdefinierte Funktionen (UDF)</strong>, <strong>Integration von verteiltem Rechnen</strong>, <strong>Optimierung skalarer Abfragen</strong>, <strong>dynamisches Sharding</strong> und die offizielle Veröffentlichung von <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Wichtigste Highlights<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>UDF- und verteilte Rechenumgebung</strong></h4><ul>
<li><p>Unterstützung <strong>benutzerdefinierter Funktionen (UDFs)</strong>, die es Entwicklern ermöglichen, benutzerdefinierte Logik in Abruf- und Berechnungsworkflows einzubinden.</p></li>
<li><p>Tiefe Integration mit <strong>Ray Dataset / Daft</strong> für die verteilte Ausführung von UDFs und die Verarbeitung multimodaler Daten.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>Skalare Abfragen und Weiterentwicklung des lokalen Formats</strong></h4><ul>
<li><p>Optimierung der Filter- und Aggregationsleistung für skalare Felder.</p></li>
<li><p>Verbesserung der Auswertungsgeschwindigkeit von Ausdrücken und der indexbeschleunigten Ausführung.</p></li>
<li><p>Unterstützung <strong>von In-Place-Aktualisierungen</strong> für lokale Dateiformate.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Erweiterte Suchfunktionen</strong></h4><ul>
<li><p>Fügen Sie die folgenden Funktionen hinzu: <strong>„RankBy“</strong>, <strong>„OrderBy“</strong>, <strong>„Facet“</strong> und Abfragen <strong>mit unscharfem Abgleich</strong>.</p></li>
<li><p>Verbesserung der Textsuche durch Unterstützung von:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Dynamisches Sharding und Skalierbarkeit</strong></h4><ul>
<li><p>Aktivieren Sie <strong>automatische Shard-Aufteilung</strong> und <strong>Lastenausgleich</strong> für nahtlose Skalierung.</p></li>
<li><p>Verbessern Sie <strong>den Aufbau globaler Indizes</strong> und gewährleisten Sie <strong>eine verteilte Suchleistung</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Tiefe Integration mit <strong>Ray / Daft / PyTorch</strong> zur Unterstützung verteilter UDFs und Anwendungsfälle im Bereich Context Engineering.</p></li>
<li><p>Bereitstellung von <strong>RAG-Demos (Retrieval-Augmented Generation)</strong> <strong>und Import aus Iceberg-Tabellen</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Gemeinsam die Zukunft von Milvus gestalten<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus ist ein Open-Source-Projekt, das von einer globalen Entwickler-Community vorangetrieben wird.</p>
<p>Wir laden alle Community-Mitglieder herzlich ein, die multimodale Datenbank der nächsten Generation mitzugestalten:</p>
<ul>
<li><p>💬 <strong>Feedback geben</strong>: Schlagen Sie neue Funktionen oder Optimierungsideen vor</p></li>
<li><p>🐛 <strong>Probleme melden</strong>: Fehler über GitHub Issues melden</p></li>
<li><p>🔧 <strong>Code beisteuern</strong>: Reichen Sie Pull-Requests ein und helfen Sie beim Aufbau der Kernfunktionen</p>
<ul>
<li><p><strong>Pull-Anfragen</strong>: Leisten Sie einen direkten Beitrag zu unserer <a href="https://github.com/milvus-io/milvus/pulls">Codebasis</a>. Ob es um die Behebung von Fehlern, das Hinzufügen von Funktionen oder die Verbesserung der Dokumentation geht – Ihre Beiträge sind herzlich willkommen.</p></li>
<li><p><strong>Entwicklungsleitfaden</strong>: In unserem <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Leitfaden für Mitwirkende</a> findest du Richtlinien für Code-Beiträge.</p></li>
</ul></li>
<li><p>⭐ <strong>Weiterempfehlen</strong>: Teilen Sie Best Practices und Erfolgsgeschichten</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
