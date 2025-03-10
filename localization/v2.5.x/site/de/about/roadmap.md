---
id: roadmap.md
title: Milvus-Fahrplan
related_key: Milvus roadmap
summary: >-
  Milvus ist eine Open-Source-Vektordatenbank, die für KI-Anwendungen entwickelt
  wurde. Hier ist unsere Roadmap, die unsere Entwicklung leitet.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus-Fahrplan<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Willkommen bei der Milvus-Roadmap! Begleiten Sie uns auf unserem Weg, Milvus kontinuierlich zu verbessern und weiterzuentwickeln. Wir freuen uns, Ihnen unsere Errungenschaften, Zukunftspläne und unsere Vision für die Zukunft vorzustellen. Unsere Roadmap ist mehr als nur eine Liste kommender Funktionen - sie spiegelt unser Engagement für Innovation und unsere Bereitschaft zur Zusammenarbeit mit der Community wider. Wir laden Sie ein, einen Blick auf unsere Roadmap zu werfen, uns Ihr Feedback zu geben und die Zukunft von Milvus mitzugestalten!</p>
<h2 id="Roadmap" class="common-anchor-header">Fahrplan<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>Kategorie</th>
            <th>Milvus 2.5.x (Erreicht in den letzten Versionen)</th>
            <th>Nächste Veröffentlichung - Milvus 2.6 (Mitte CY25)</th>
            <th>Zukünftige Roadmap - Milvus 3.0 (innerhalb von 1 Jahr)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>KI-gesteuerte Verarbeitung unstrukturierter Daten</strong><br/><i>Stärkung der Fähigkeit, unstrukturierte Daten mithilfe von KI-Modellen und fortschrittlichen Technologien zu verarbeiten und zu analysieren</i></td>
            <td><strong>Volltextsuche</strong><br/><i>Unterstützung der Volltextsuche mit Sparse-BM25. Die neue API akzeptiert Text als Eingabe und generiert automatisch Sparse Vector in Milvus</i><br/><br/><strong>Sparse Vector (GA)</strong><br/><i>Unterstützung effizienter Speicher- und Indizierungsmethoden für Sparse Vector</i><br/></td>
            <td><strong>Data-In und Data-Out</strong><br/><i>Unterstützung der wichtigsten Modelldienste für die Aufnahme von Originaltexten</i><br/><br/><strong>Advanced Reranker</strong><br/><i>Unterstützung modellbasierter Reranker und benutzerdefinierter Scoring-Funktion</i><br/><br/> Iterative<strong>Suche</strong><br/><i>Überarbeitung des Abfragevektors auf der Grundlage von Benutzerbeschriftungen</i></td>
            <td><strong>Unterstützung von Tensoren</strong><br/><i>Unterstützung einer Liste von Vektoren, typische Anwendungen wie Colbert, Copali und Videodarstellung</i><br/><br/><strong>Unterstützung weiterer Datentypen</strong><br/><i>z.B. Datetime, Map, GIS</i></td>
        </tr>
        <tr>
            <td><strong>Suchqualität und -leistung</strong><br/><i>Liefern Sie genaue, relevante und schnelle Ergebnisse durch Optimierung von Architektur, Algorithmen und APIs</i></td>
            <td><strong>Textabgleichsfunktion</strong><br/><i>Schnelles Filtern von Schlüsselwörtern/Tokens in Text/Varchar</i><br/><br/><strong>Verbesserung der Gruppensuche</strong><br/><i>Einführung von group_size und Unterstützung von group by in der hybriden Suche</i><br/><br/><strong>Bitmap Index &amp; Inverted Index</strong><br/><i>Beschleunigung der Filterung nach Tags</i></td>
            <td><strong>Advanced Match</strong><br/><i>z.B. phrase_match, multi_match </i><br/><br/><strong>Analyzer Enhancement</strong><br/><i>Enhance Analyzer with extended tokenizer support and improved observability</i><br/><br/><strong>JSON Filtering</strong><br/><i>Optimize JSON indexing and parsing for faster processing</i></td>
            <td><strong>Sortierfunktion</strong><br/><i>Sortieren nach skalaren Feldern während der Ausführung</i><br/><br/><strong>Unterstützung von Daten-Clustering</strong><br/><i>Daten-Kolokalität</i></td>
        </tr>
        <tr>
            <td><strong>Umfangreiche Funktionalität und Verwaltung</strong><br/><i>Entwicklerfreundliche und robuste Datenverwaltungsfunktionen</i></td>
            <td><strong>Unterstützung von csv-Dateien beim Datenimport</strong><br/><i>Bulkinsert unterstützt das csv-Format</i><br/><br/><strong>Unterstützung von Null- und Standardwerten</strong><br/><i>Null- und Standardtypen erleichtern den Import von Daten aus anderen DBMS</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>Visuelle Verwaltungswerkzeuge für DBAs</i></td>
            <td><strong>Schemaänderung</strong><br/><i>z.B. Hinzufügen/Löschen von Feldern, Ändern der varchar-Länge</i><br/><br/><strong>Aggregationen</strong><br/><i>Skalarfeld-Aggregationen, z.B. count,distinct value, min,max</i><br/><br/><strong>Unterstützung UDF</strong><br/><i>Benutzerdefinierte Funktion</i></td>
            <td><strong>Bulk-Update</strong><br/><i>Unterstützung von Bulk-Updates für den Wert eines bestimmten Feldes</i><br/><br/><strong>Primärschlüssel-Deduplizierung</strong><br/><i>Durch Verwendung des globalen pk-Index</i><br/><br/><strong>Datenversionierung &amp; -wiederherstellung</strong><br/><i>Unterstützung der Datenversionierung durch Snapshot</i></td>
        </tr>
        <tr>
            <td><strong>Kosteneffizienz &amp; Architektur</strong><br/><i>Modernste Systeme mit Stabilität, Kosteneffizienz und optimierter Bereitstellung.</i></td>
            <td><strong>Speicheroptimierung</strong><br/><i>Reduzierung von OOM und Laststeigerung</i><br/><br/><strong>Clustering Compaction</strong><br/><i>Datenumverteilung basierend auf der Konfiguration zur Beschleunigung der Leseleistung</i><br/><br/><strong>Storage Format V2 (Beta)</strong><br/><i>Universelles Formatdesign und Grundlage für plattenbasierten Datenzugriff</i></td>
            <td><strong>Tiered Storage</strong><br/><i>Unterstützung von Hot- und Cold-Storage zur Kostenoptimierung</i><br/><br/><strong>Stream Node</strong><br/><i>Verarbeitung von Streaming-Daten und Vereinfachung des inkrementellen Schreibflusses</i><br/><br/><strong>MixCoord</strong><br/><i>Zusammenführung von Coord-Logiken in einer</i></td>
            <td><strong>Vector Lake</strong><br/><i>Kostengünstige Offline-Lösung, Spark Connector und Integration mit Iceberg</i><br/><br/><strong>Logstore Component</strong><br/><i>Reduzierung der Abhängigkeiten von externen Komponenten wie Pulsar</i><br/><br/><strong>Data Evict Policy</strong><br/><i>Benutzer können ihre eigene Evict Policy definieren</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>Unsere Roadmap ist in der Regel in drei Teile gegliedert: die letzte Version, die nächste Version und eine mittel- bis langfristige Vision für das nächste Jahr.</li>
<li>Während wir Fortschritte machen, lernen wir ständig dazu und passen unseren Fokus gelegentlich an, indem wir je nach Bedarf Punkte hinzufügen oder entfernen.</li>
<li>Diese Pläne sind unverbindlich und können je nach Abonnement variieren.</li>
<li>Wir halten uns strikt an unsere Roadmap, wobei unsere <a href="/docs/de/release_notes.md">Versionshinweise</a> als Referenz dienen.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">Wie Sie beitragen können<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>Als Open-Source-Projekt lebt Milvus von den Beiträgen der Community. Hier erfahren Sie, wie Sie ein Teil unserer Reise werden können.</p>
<h3 id="Share-feedback" class="common-anchor-header">Feedback geben</h3><ul>
<li><p>Problemberichte: Entdecken Sie einen Fehler oder haben Sie einen Vorschlag? Eröffnen Sie ein Problem auf unserer <a href="https://github.com/milvus-io/milvus/issues">GitHub-Seite</a>.</p></li>
<li><p>Feature-Vorschläge: Haben Sie Ideen für neue Funktionen oder Verbesserungen? Beteiligen Sie sich an der Diskussion in <a href="https://github.com/milvus-io/milvus/discussions/40263">unserem aktiven Diskussions-Thread</a>.</p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Code-Beiträge</h3><ul>
<li><p>Pull-Anfragen: Tragen Sie direkt zu unserer <a href="https://github.com/milvus-io/milvus/pulls">Codebasis</a> bei. Ob Sie Fehler beheben, Funktionen hinzufügen oder die Dokumentation verbessern, Ihre Beiträge sind willkommen.</p></li>
<li><p>Entwicklungsleitfaden: In unserem <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Contributor's Guide</a> finden Sie Richtlinien für Code-Beiträge.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Verbreiten Sie die Nachricht</h3><ul>
<li><p>Soziales Teilen: Sie lieben Milvus? Teilen Sie Ihre Anwendungsfälle und Erfahrungen in sozialen Medien und Tech-Blogs.</p></li>
<li><p>Vermerken Sie uns auf GitHub: Zeigen Sie Ihre Unterstützung, indem Sie unser <a href="https://github.com/milvus-io/milvus">GitHub-Repository</a> mit einem Stern versehen.</p></li>
</ul>
