---
id: roadmap.md
title: Milvus Straßenkarte
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
            <th>Milvus 2.4.0 (kürzlich erreicht)</th>
            <th>Milvus 2.5.0 (geplant für Mitte JJ24)</th>
            <th>Zukünftige Roadmap (Milvus 3.0 wird für CY24 erwartet)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>KI-Entwicklerfreundlich</strong><br/> Ein<i>entwicklerfreundlicher Technologiestack, erweitert um die neuesten KI-Innovationen</i></td>
            <td><strong>Multi-Vektoren &amp; Hybrid-Suche</strong><br/><i>Framework für Multiplex-Recall und Fusion</i><br/><br/><strong>GPU-Indexbeschleunigung</strong><br/><i>Unterstützung für höhere QPS und schnellere Indexerstellung</i><br/><br/><strong>Modellbibliothek in PyMilvus</strong><br/><i>Integrierte Einbettungsmodelle für Milvus</i></td>
            <td><strong>Sparse Vector (GA)</strong><br/><i>Lokale Merkmalsextraktion und Schlüsselwortsuche</i><br/><br/><strong>Milvus Lite (GA)</strong><br/> Eine<i>leichtgewichtige, speicherinterne Version von Milvus</i><br/><br/><strong>Embedding Models Gallery</strong><br/><i>Unterstützung für Bild- und multimodale Einbettungen und Reranker-Modelle in Modellbibliotheken</i></td>
            <td><strong>Original Data-In und Data-Out</strong><br/><i>Unterstützung für Blob-Datentypen</i><br/><br/><strong>Daten-Clustering</strong><br/><i>Daten-Ko-Lokalität</i><br/><br/><strong>Szenario-orientierte Vektorsuche</strong><br/><i>z.B. Multi-Target-Suche &amp; NN-Filterung</i><br/><br/><strong>Unterstützung von Embedding &amp; Reranker Endpoint</strong></td>
        </tr>
        <tr>
            <td><strong>Reichhaltige Funktionalität</strong><br/><i>Erweiterte Abruf- und Datenverwaltungsfunktionen</i></td>
            <td><strong>Unterstützung für FP16- und BF16-Datentypen</strong><br/><i>Diese ML-Datentypen können dazu beitragen, die Speichernutzung zu reduzieren</i><br/><br/><strong>Grouping Search</strong><br/><i>Aggregate Split Embeddings</i><br/><br/> Fuzzy<strong>Match und Inverted Index</strong><br/><i>Unterstützung für Fuzzy Matching und Inverted Indexing für skalare Typen wie varchar und int</i></td>
            <td><strong>Invertierter Index für Array &amp; JSON</strong><br/><i>Indizierung für Array und teilweise Unterstützung von JSON</i><br/><br/><strong>Bitset-Index</strong><br/><i>Verbesserte Ausführungsgeschwindigkeit und zukünftige Datenaggregation</i><br/><br/><strong>Truncate Collection</strong><br/><i>Ermöglicht Datenlöschung unter Beibehaltung der Metadaten</i><br/><br/><strong>Unterstützung für NULL- und Standardwerte</strong></td>
            <td><strong>Unterstützung für weitere Datentypen</strong><br/><i>z. B. Datetime, GIS</i><br/><br/><strong>Erweiterte Textfilterung</strong><br/><i>z. B. Match Phrase</i><br/><br/><strong>Primärschlüssel-Deduplizierung</strong></td>
        </tr>
        <tr>
            <td><strong>Kosteneffizienz und Architektur</strong><br/><i>Moderne Systeme mit Schwerpunkt auf Stabilität, Kosteneffizienz, Skalierbarkeit und Leistung</i></td>
            <td><strong>Unterstützung für mehr Sammlungen/Partitionen</strong><br/><i>Bewältigung von mehr als 10.000 Sammlungen in kleineren Clustern</i><br/><br/><strong>Mmap-Optimierung</strong><br/><i>Ausgleich zwischen reduziertem Speicherverbrauch und Latenz</i><br/><br/><strong>Bulk-Insert-Optimierung</strong><br/><i>Vereinfacht den Import großer Datensätze</i></td>
            <td><strong>Lazy Load</strong><br/><i>Daten werden bei Bedarf durch Lesevorgänge geladen</i><br/><br/><strong>Major Compaction</strong><br/><i>Neuverteilung von Daten basierend auf der Konfiguration zur Verbesserung der Leseleistung</i><br/><br/> Mmap<strong>für wachsende Daten</strong><br/><i>Mmap-Dateien für expandierende Datensegmente</i></td>
            <td><strong>Speichersteuerung</strong><br/><i>Reduziert Out-of-Memory-Probleme und bietet eine globale Speicherverwaltung</i><br/><br/><strong>LogNode-Einführung</strong><br/><i>Sorgt für globale Konsistenz und behebt den Ein-Punkt-Engpass bei der Root-Koordination</i><br/><br/><strong>Speicherformat V2</strong><br/><i>Universelles Formatdesign legt die Grundlage für den plattenbasierten Datenzugriff</i></td>
        </tr>
        <tr>
            <td><strong>Enterprise Ready</strong><br/><i>Entwickelt, um die Anforderungen von Produktionsumgebungen in Unternehmen zu erfüllen</i></td>
            <td><strong>Milvus CDC</strong><br/><i>Fähigkeit zur Datenreplikation</i><br/><br/><strong>Accesslog Enhancement</strong><br/><i>Detaillierte Aufzeichnung für Audit und Tracing</i></td>
            <td><strong>Neue Ressourcengruppe</strong><br/><i>Verbessertes Ressourcenmanagement</i><br/><br/><strong>Storage Hook</strong><br/><i>Unterstützung für Bring Your Own Key (BYOK) Verschlüsselung</i></td>
            <td><strong>Dynamische Anpassung der Replikatanzahl</strong><br/><i>Erleichtert dynamische Änderungen der Anzahl der Replikate</i><br/><br/><strong>Dynamische Schemaänderung</strong><br/><i>z.B. Hinzufügen/Löschen von Feldern, Ändern von varchar-Längen</i><br/><br/> Rust<strong>und C# SDKs</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>Unsere Roadmap ist in der Regel in drei Teile gegliedert: die letzte Version, die nächste bevorstehende Version und eine mittel- bis langfristige Vision innerhalb des nächsten Jahres.</li>
<li>Während wir Fortschritte machen, lernen wir ständig dazu und passen gelegentlich unseren Fokus an, indem wir Elemente hinzufügen oder entfernen, wenn es nötig ist.</li>
<li>Diese Pläne sind unverbindlich und können je nach Abonnement variieren.</li>
<li>Wir halten uns strikt an unsere Roadmap, wobei unsere <a href="/docs/de/v2.4.x/release_notes.md">Versionshinweise</a> als Referenz dienen.</li>
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
<li><p>Feature-Vorschläge: Haben Sie Ideen für neue Funktionen oder Verbesserungen? <a href="https://github.com/milvus-io/milvus/discussions">Wir würden uns freuen, sie zu hören!</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Code-Beiträge</h3><ul>
<li><p>Pull-Anfragen: Tragen Sie direkt zu unserer <a href="https://github.com/milvus-io/milvus/pulls">Codebasis</a> bei. Ob Sie Fehler beheben, Funktionen hinzufügen oder die Dokumentation verbessern, Ihre Beiträge sind willkommen.</p></li>
<li><p>Entwicklungsleitfaden: In unserem <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Contributor's Guide</a> finden Sie Richtlinien für Code-Beiträge.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Verbreiten Sie die Nachricht</h3><ul>
<li><p>Soziales Teilen: Sie lieben Milvus? Teilen Sie Ihre Anwendungsfälle und Erfahrungen in sozialen Medien und Tech-Blogs.</p></li>
<li><p>Vermerken Sie uns auf GitHub: Zeigen Sie Ihre Unterstützung, indem Sie unser <a href="https://github.com/milvus-io/milvus">GitHub-Repository</a> mit einem Stern versehen.</p></li>
</ul>
