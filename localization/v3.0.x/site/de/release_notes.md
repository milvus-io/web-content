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
<h2 id="v302" class="common-anchor-header">v3.0.2<button data-href="#v302" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: 20. September 2026</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python-SDK-Version</th><th>Node.js-SDK-Version</th><th>Java-SDK-Version</th><th>Go-SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>3.0.2</td><td>3.0.2</td><td>3.0.6</td><td>3.0.10</td><td>3.0.2</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus v3.0.2 bekannt zu geben! Diese Version konzentriert sich auf die Such- und Abfrageleistung – durch die Beseitigung von Hot-Path-Konflikten bei der gefilterten Suche, bei Gruppierungen und beim Indexaufbau – sowie auf eine verbesserte Unterstützung für externe Sammlungen und Storage V2 und eine Vielzahl von Stabilitätskorrekturen in den Bereichen Streaming, Komprimierung und Indexverwaltung.</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Optimierte ARRAY-Filterung durch Zusammenführung verketteter „contains“-Prädikate zu einem einzigen Ausdruck „ <code translate="no">ContainsAny</code> “ bzw. „<code translate="no">ContainsAll</code> “ im Abfrageplaner (<a href="https://github.com/milvus-io/milvus/pull/52365">#52365</a>)</li>
<li>Unterstützung für benutzerdefinierte S3-kompatible Endpunkte in externen Sammlungen über die Option „ <code translate="no">extfs.endpoint_url</code> “ hinzugefügt, mit Validierung unsicherer oder widersprüchlicher Endpunkt-Einstellungen (<a href="https://github.com/milvus-io/milvus/pull/52814">#52814</a>)</li>
<li>Vereinheitlichung der Bloom- und Roaring-Mitgliedschaftsfilter hinter einem einzigen „ <code translate="no">membership_match</code> “-Ausdruck, mit entsprechender Go-Client-Unterstützung für die Erstellung und Abfrage beider Filtertypen (<a href="https://github.com/milvus-io/milvus/pull/53019">#53019</a>)</li>
<li>Reduzierung der Schreibamplifikation beim Tantivy-basierten Indexaufbau, wodurch die Festplatten-E/A für Text-Match-, NGRAM- und JSON-Key-Stats-Indizes gesenkt wird (<a href="https://github.com/milvus-io/milvus/pull/53057">#53057</a>)</li>
<li>Zugriffskontrolle für RESTful-v2-DQL-Endpunkte hinzugefügt, die bei voller Proxy-Abfragewarteschlange vor der Dekodierung der Anfrage einen HTTP-429-Fehler mit „ <code translate="no">Retry-After</code> “ zurückgibt (<a href="https://github.com/milvus-io/milvus/pull/53111">#53111</a>)</li>
<li>Reduzierung eines atomaren Refcount-Hotspots im Auswertungspfad für skalare Filter, der etwa 48 % der CPU-Zeit auf Blattknoten bei der Suche ausmachte, wodurch der Durchsatz bei gefilterten Suchvorgängen verbessert wurde (<a href="https://github.com/milvus-io/milvus/pull/53167">#53167</a>)</li>
<li>Die Skalierbarkeit des Speicher-Thread-Pools wurde verbessert, indem die selbst entwickelte Implementierung durch „ <code translate="no">folly::CPUThreadPoolExecutor</code> “ ersetzt und die elastische Skalierung der Worker wiederhergestellt wurde (<a href="https://github.com/milvus-io/milvus/pull/53184">#53184</a>)</li>
<li>Verbesserung des Abgleichs von REST-Zugriffsprotokollen, sodass Formatierer mit dem geparsten URL-Pfad abgeglichen werden und konfigurierte Methoden nun auch für Anfragen mit Abfrageparametern gelten (<a href="https://github.com/milvus-io/milvus/pull/53147">#53147</a>)</li>
<li>Unterstützung für idempotente Broadcasts hinzugefügt, sodass bei wiederholten Anfragen keine doppelten Aufgaben mehr erstellt werden; „ <code translate="no">BulkImport</code> “ ist der erste Anwender dieser Funktion (<a href="https://github.com/milvus-io/milvus/pull/53228">#53228</a>)</li>
<li>Konfigurierbare Satztrennzeichen für den Lindera-Tokenizer hinzugefügt, sodass Einträge im Benutzerwörterbuch, die Satzzeichen enthalten, als ein einziges Token abgeglichen werden können (<a href="https://github.com/milvus-io/milvus/pull/53287">#53287</a>)</li>
<li>Ein Cluster-Versions-Gate wurde hinzugefügt, das die „Write-Before“-Funktionsmaterialisierung erst dann automatisch aktiviert, wenn alle Knoten das Upgrade abgeschlossen haben, wodurch Inkonsistenzen durch gemischte Versionen bei rollierenden Upgrades vermieden werden (<a href="https://github.com/milvus-io/milvus/pull/53261">#53261</a>)</li>
<li>Woodpecker wurde auf v0.1.42 aktualisiert, wodurch Fehler bei der WAL-Wiederherstellung auf finalisierten leeren Segmenten behoben und die Stabilität sowie die Metriken des Append-Pfads verbessert wurden (<a href="https://github.com/milvus-io/milvus/pull/53295">#53295</a>)</li>
<li>Reduzierung des Overheads für atomare Operationen und Referenzzählungen pro Chunk im Such- und Abfrage-Hot-Path durch das einmalige Fixieren eines Snapshots eines versiegelten Segments pro Anfrage (<a href="https://github.com/milvus-io/milvus/pull/53301">#53301</a>)</li>
<li>Die Latenz bei Teilaktualisierungen wurde verbessert, indem TimeTick-Wartezeiten durch Snapshot-basierte optimistische Sperren ersetzt wurden; außerdem wurde die AutoID-Verarbeitung verfeinert, sodass bestehende Primärschlüssel erhalten bleiben und zurückgegebene IDs die Eingabereihenfolge beibehalten (<a href="https://github.com/milvus-io/milvus/pull/53337">#53337</a>)</li>
<li>Reduzierung der redundanten Erstellung von Zeilenansichten beim Gruppieren von Suchergebnissen nach VARCHAR- oder JSON-Feldern auf versiegelten Segmenten, wodurch der Overhead bei der „Group-by“-Suche gesenkt wird (<a href="https://github.com/milvus-io/milvus/pull/53500">#53500</a>)</li>
<li>Hinzufügung einer Compliance-API, die die Konvergenz der Lastkonfiguration global und pro Ressourcengruppe meldet und dabei die Betriebsbereitschaft von Replikaten, die Sichtbarkeit von Abfragen, verbleibende Ressourcen und die WAL-Platzierung abdeckt (<a href="https://github.com/milvus-io/milvus/pull/53517">#53517</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Es wurde ein Problem behoben, bei dem Abfragen nach dem Löschen und erneuten Hinzufügen eines Feldes in einem Struktur-Array falsche Ergebnisse zurückgeben konnten (<a href="https://github.com/milvus-io/milvus/pull/52921">#52921</a>)</li>
<li>Behebung von SASL/SCRAM-SHA-256-Authentifizierungsfehlern bei der Verbindung zu Apache Kafka 4.x-Brokern durch ein Upgrade von librdkafka auf 2.6.1 (<a href="https://github.com/milvus-io/milvus/pull/53086">#53086</a>)</li>
<li>Es wurde ein Problem behoben, bei dem alle Kanäle einer Replik einem einzigen Abfrageknoten zugewiesen wurden, was wiederholt zu „Out-of-Memory“-Abbrüchen führte und die Replik nicht mehr betriebsbereit machte (<a href="https://github.com/milvus-io/milvus/pull/53094">#53094</a>)</li>
<li>Wiederholtes WAL-Fencing behoben, das bei anhaltender Dateneingabe alle paar Minuten Schreibvorgänge auf einem PChannel für 45–60 Sekunden blockierte (<a href="https://github.com/milvus-io/milvus/pull/53118">#53118</a>)</li>
<li>Es wurde behoben, dass bei der Storage-V2-Kompaktierung gültige physische Gruppenpfade verloren gingen, was zu einer Fehlausrichtung gepackter Spaltenindizes in kompaktierten Segmenten führen konnte (<a href="https://github.com/milvus-io/milvus/pull/53202">#53202</a>)</li>
<li>Es wurde behoben, dass in Kompaktierungsprotokollen Verschlüsselungsschlüssel für Sammlungen und Anmeldedaten für den Objektspeicher ausgegeben wurden (<a href="https://github.com/milvus-io/milvus/pull/53226">#53226</a>)</li>
<li>Es wurde behoben, dass veraltete Offset-Aliase von Struktur-Arrays nach dem erneuten Öffnen eines versiegelten Segments falsche Daten anzeigen konnten (<a href="https://github.com/milvus-io/milvus/pull/53154">#53154</a>)</li>
<li>Es wurde behoben, dass die Synchronisierung von Dateiressourcen ausgeführt wurde, bevor Ressourcen hinzugefügt wurden, was beim Start oder bei der Registrierung eines Knotens zum Löschen knotenlokaler Dateien führen konnte (<a href="https://github.com/milvus-io/milvus/pull/53170">#53170</a>)</li>
<li>Es wurde ein Problem behoben, bei dem ein unvollständiger Binlog-Chunk stillschweigend als vollständig gelesen behandelt werden konnte, was zu fehlenden Daten in Abfrage- und Kompaktierungsergebnissen führen konnte (<a href="https://github.com/milvus-io/milvus/pull/53263">#53263</a>)</li>
<li>Es wurde ein Problem behoben, bei dem der Speicherplatz gelöschter Segmente für Sammlungen ohne aktiven Index nie zurückgewonnen wurde (<a href="https://github.com/milvus-io/milvus/pull/53252">#53252</a>)</li>
<li>Es wurde eine ungenaue Ressourcenschätzung beim Laden spärlicher Vektorindizes behoben, die zu einer fehlerhaften Verarbeitung der Rohdaten und wiederholten Warnungen auf dem QueryNode führen konnte (<a href="https://github.com/milvus-io/milvus/pull/53249">#53249</a>)</li>
<li>Es wurde ein Problem behoben, bei dem ein eingefrorener Streaming-Knoten außerhalb der primären Ressourcengruppe während der Neuverteilung unerwartet aufgetaut werden konnte (<a href="https://github.com/milvus-io/milvus/pull/53229">#53229</a>)</li>
<li>Es wurde ein Fehler bei der Verbindung zu Google Cloud Storage behoben, bei dem die GCP-Anmeldedaten (IAM und HMAC) vor der Vorabprüfung des Chunk-Managers nicht registriert waren (<a href="https://github.com/milvus-io/milvus/pull/53288">#53288</a>)</li>
<li>Es wurde ein Problem behoben, bei dem C++-Protokolle unerwartet in das Verzeichnis „ <code translate="no">/tmp</code> “ geschrieben wurden, anstatt an die einheitliche Protokollausgabe weitergeleitet zu werden (<a href="https://github.com/milvus-io/milvus/pull/53293">#53293</a>)</li>
<li>Es wurde behoben, dass Backfill-Commits mit einem HTTP-500-Fehler fehlschlugen, wenn ein Spark-Ergebnis sich über mehrere Partitionen erstreckte (<a href="https://github.com/milvus-io/milvus/pull/53346">#53346</a>)</li>
<li>Es wurde ein Speicherleck im DataNode behoben, bei dem eine abgebrochene Indexerstellungs- oder Analysieraufgabe den nativen Speicher des bereits erstellten Objekts nie freigab (<a href="https://github.com/milvus-io/milvus/pull/53348">#53348</a>)</li>
<li>Es wurde ein Problem behoben, bei dem der Binlog-Import fehlschlug, wenn für ein nullfähiges Vektorfeld keine Binlog-Dateien vorhanden waren (<a href="https://github.com/milvus-io/milvus/pull/53363">#53363</a>).</li>
<li>Es wurden unvollständige oder fehlerhafte Ausgabefelder behoben, wenn Such- und Abfrageanfragen Daten aus externen Tabellen auslasen (<a href="https://github.com/milvus-io/milvus/pull/53372">#53372</a>, <a href="https://github.com/milvus-io/milvus/pull/53385">#53385</a>)</li>
<li>Es wurden doppelte Zeilen mit spärlichen Vektoren und Partitions-IDs in REST-Anfragen sowie Probleme mit Speicherzuordnung und -bereinigung behoben, die zu Abstürzen oder Speicherlecks führen konnten, wenn Abfragen vorzeitig beendet wurden (<a href="https://github.com/milvus-io/milvus/pull/53402">#53402</a>)</li>
<li>Es wurde ein Problem behoben, bei dem eine Komprimierung, die den Abschluss ohne Ergebnis-Payload meldete, DataCoord zum Absturz bringen oder die Komprimierungsaufgabe blockieren konnte, anstatt ordnungsgemäß wiederholt zu werden (<a href="https://github.com/milvus-io/milvus/pull/53443">#53443</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Eigenschaften externer Datendateien beim Erstellen von Segmentmanifesten verloren gingen, was dazu führte, dass externe Sammlungen die Metadaten der Quelldateien verloren (<a href="https://github.com/milvus-io/milvus/pull/53444">#53444</a>)</li>
<li>Ein Absturz von „QueryNode“, der bei der Verarbeitung von „ <code translate="no">count(*)</code> “-Anfragen auf Debug-Protokollstufe auftreten konnte – insbesondere während rollierender Upgrades – wurde behoben (<a href="https://github.com/milvus-io/milvus/pull/53474">#53474</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Aufgaben zur Index- und Statistikerstellung weiterhin Worker-Ressourcen beanspruchten, nachdem ihr Segment, Index oder ihre Sammlung entfernt worden war, und die Bereinigung verwaister Indexdateien wurde verbessert (<a href="https://github.com/milvus-io/milvus/pull/53515">#53515</a>)</li>
<li>Die Verarbeitung lokaler Speicherpfade wurde korrigiert, sodass von verschiedenen Komponenten geschriebene Daten stets dort abgelegt werden, wo Leser und die Garbage Collection sie erwarten; dies beinhaltet ein automatisches Upgrade für bestehende lokale Bereitstellungen (<a href="https://github.com/milvus-io/milvus/pull/53530">#53530</a>)</li>
<li>Es wurde behoben, dass Index-Erstellungsaufgaben endlos Wiederholungsversuche durchführten, wenn ein Segment fehlerhafte JSON-Dokumente enthielt; solche Erstellungen schlagen nun sofort fehl, anstatt Worker-Ressourcen auf unbestimmte Zeit zu beanspruchen (<a href="https://github.com/milvus-io/milvus/pull/53531">#53531</a>)</li>
<li>Es wurde ein Problem bei gleichzeitigen Snapshot-Wiederherstellungen behoben, die auf dieselbe Sammlung abzielten: Wiederherstellungen werden nun serialisiert, und eine Wiederherstellung auf ein bereits vorhandenes Ziel wird mit einem eindeutigen Fehler „bereits in der Datenbank vorhanden“ abgelehnt, anstatt zu einem Wettlauf oder einem Ressourcenverlust zu führen (<a href="https://github.com/milvus-io/milvus/pull/53586">#53586</a>)</li>
<li>Es wurde behoben, dass binäre Verschlüsselungsschlüssel über Speicherschnittstellen hinweg beschädigt wurden und Cursor in den projizierten „Storage V2 Packed“-Lesern falsch ausgerichtet waren, indem „milvus-storage“ aktualisiert wurde (<a href="https://github.com/milvus-io/milvus/pull/53569">#53569</a>)</li>
</ul>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: 9. September 2026</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python-SDK-Version</th><th>Node.js-SDK-Version</th><th>Java-SDK-Version</th><th>Go-SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus v3.0.1 bekannt zu geben! Diese Version bietet neben Leistungsverbesserungen und Fehlerbehebungen für Storage V3, Datenkonsistenz und Sicherheit auch die Snapshot-Verwaltung nach REST v2, erweiterte Funktionen zur Neureihenfolge sowie Unterstützung für TEXT-Felder im Go-Client und in der RESTful-API.</p>
<h3 id="Features-improvements" class="common-anchor-header">Verbesserungen der Funktionen<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
<li>REST-v2-APIs für die native Snapshot-Verwaltung auf Collection-Ebene und die asynchrone Wiederherstellung hinzugefügt (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>, <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>Ein konfigurierbarer Schwellenwert für die Anzahl der Ergebnisse wurde hinzugefügt, um die Auswahl des „Take“-Ausgabepfads für Such- und Abfragevorgänge zu steuern (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>Unterstützung für TEXT-Felder im Go-Client und in der RESTful-API hinzugefügt (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>Konfigurierbare anfängliche und maximale Lese-IOPS-Raten für externe Tabellen hinzugefügt (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>Eine Opt-in-Einstellung für Aktualisierungsaufträge externer Sammlungen wurde hinzugefügt, damit diese warten, bis alle Segmente indiziert sind, bevor der Abschluss gemeldet wird, ohne die Datenveröffentlichung zu verzögern (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>Unterstützung für L1-Neurangierung in Suchfunktionsketten hinzugefügt (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>Gewichtetes RRF-Reranking mit optionalen Gewichten pro ANN-Anfrage für FunctionScore, REST, die alte Hybrid-Suche und den Go-Client hinzugefügt (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>, <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">Stabilitätsverbesserungen<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
<li>Verbesserte Speichersicherheit in Geometrie-RTree-Indizes und -Caches sowie bei der Behandlung von nicht parsbaren WKB- und leeren Geometrie-Abfragen (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>Verbesserte Speicherverwaltung durch Wiederherstellung der prozessweiten Zuweisung von temporärem Speicher und Korrektur der Speicherschätzungen für das gleichzeitige Laden von Storage V2/V3-Feldern und skalaren V3-Indizes (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>Reduzierung von Download-Engpässen und Speicherverbrauch beim Erstellen von Indizes für externe Sammlungen durch Parallelisierung von Lesevorgängen und das Streamen von Rohvektordaten auf die Festplatte (<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>)</li>
<li>Verbesserter Woodpecker-Durchsatz für Workloads mit kleinen Batches und hoher Parallelität durch Batch-Verarbeitung von Client-Anhängungen und Bereitstellung von Synchronisationseinstellungen (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>Verbesserte Konsistenz bei der Eigentümerschaft und Lebensdauer von Datensatzlesern, bei der Behandlung leerer Blobs sowie bei der Meldung von Lesefehlern über Speicher- und Komprimierungspfade hinweg (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>Verbesserte Effizienz der Hash-Probe-Gruppierung durch eine vierfach verschachtelte Pipeline und Schutzmaßnahmen gegen Kollisionen und Rehash-Grenzen (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>Reduzierter Overhead bei der Einfügevorgangsverarbeitung durch Überspringen der WAL-Einfüge-Body-Analyse für Sammlungen ohne BM25- oder MinHash-Ausgabefelder (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>Verbesserte Berichterstattung bei Speicherausfällen und die Handhabung von Wiederholungsversuchen durch Beibehaltung der Klassifizierung von vorübergehenden und permanenten Fehlern über alle Ausführungsebenen hinweg (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>Verbesserte Leistung bei räumlichen Abfragen durch standardmäßige Aktivierung der GIS-Aufteilung in Grob- und Feinsuche sowie der Prädikatsfusion innerhalb derselben Spalte (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>Verbesserte Aufgabenplanung für Textindizierung und JSON-Shredding durch gemeinsame, auf dem Backlog basierende Zulassungskontrolle und abwechselnde Übermittlungspriorität (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>mmap-Unterstützung für Offset-Zuordnungen versiegelter Segmente hinzugefügt, mit dedizierten Ladeoptionen und Erfassung der Festplattenressourcen (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>Optimiertes Laden von Storage-V2-Daten durch bedarfsgesteuerte, spaltenbezogene Schätzung des Chunk-Speicherbedarfs (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>Unterstützung für serverseitiges „AutoIndex“ für Indizes hinzugefügt, die an Ausgabefelder neuer Funktionen gebunden sind, wodurch „add_function_field“-Anfragen Indexparameter weglassen oder „AUTOINDEX“ angeben können (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>Reduzierung der Datenmengen in QueryNode-Verteilungsberichten durch inkrementelle Berichterstellung mit Fallback auf Vollberichte sowie Reduzierung der Speicherzuweisungen während der Metrik-Erfassung (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>, <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>Verbesserung der Passwort-Hash-Sicherheit durch Erhöhung des bcrypt-Werts von 4 auf 10; für die Aktualisierung bestehender Hashes ist eine Rotation der Anmeldedaten erforderlich (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>Reduzierung redundanter Dekodierungen bei Parquet-Importen durch das Lesen nur der erforderlichen Blattspalten für Unterfelder von Struktur-Arrays (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>Verbesserung der „Force-Merge“-Gruppierung durch mehrstufige, größenbasierte Planung und Veralterung der alten Schwellenwerteinstellung für die Planung (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>cgosymbolizer wurde aktualisiert, um zu verhindern, dass Milvus-Prozesse, die als PID 1 laufen, nach nativen Fehlern hängen bleiben (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>Verbesserte Überprüfung der Zeilenanzahl für Eingaben zur semantischen Hervorhebung (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>Verbesserte Steuerung von Import-Wiederholungsversuchen mit konfigurierbarem Backoff für Schreibversuche (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>, <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>, <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>Verbesserung der Lebenszyklusverwaltung von Analyseaufgaben durch Rückgewinnung veralteter Statistikversionen und Speicherung von Endzuständen (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>, <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>Verbesserte Koordination des Segment-Lebenszyklus durch Abwarten der Segmentfreigabe nach Zeitüberschreitungen bei Sperren (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>Verbesserte Speichersortierung für die Datenverdichtung mit einer k-Wege-Zusammenführung (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>Reduzierte Erweiterung des Gültigkeitspuffers für nullfähige Felder durch Beibehaltung gepackter Masken bei Chunk-Zugriff, Ausdrucksauswertung und JSON-Statistiken (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>Verbesserter Schutz sensibler Anmeldedaten, API-Schlüssel, RBAC-Passwort-Hashes und Details zu externen Erfassungsquellen durch Verhinderung ihrer Offenlegung in Protokollen oder Fehlermeldungen (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>, <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>, <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>Verbesserte Parallelitätskontrolle bei Teilaktualisierungen durch optimistische CAS-Validierung und sichere Wiederholungsversuche bei zulässigen Konflikten (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>Verbesserte Stabilität von Lese-Snapshots wachsender Segmente und Verwaltung der Lebensdauer von Schema-Snapshots (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>Reduzierung redundanter Scans von Autorisierungsmetadaten während Backups (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>Verbesserte Zuordnung von nullfähigen Vektor-IDs durch Verlagerung in die Indexebene, Vereinheitlichung der Behandlung logischer IDs und Unterstützung von mmap-gestützten Zuordnungen für versiegelte Indizes (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>Verbesserte Synchronisation zwischen der Sonic-JIT-Kompilierung und dem Laden von Go-Plugins in CPU- und GPU-Builds (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>Verbesserte Auflösung des Proxy-Schreibpfadkanals über den Metadaten-Cache, wodurch redundante Koordinator-RPCs eliminiert und die Fehlerklassifizierung verbessert wurden (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>Reduzierung der Berechnungszeit für den Recall von ca. 3,08 Sekunden auf 18,5 Millisekunden bei topk=100000 im angegebenen Benchmark (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>Optimierte Filterung von Feldern mit Null-Möglichkeit durch Wiederverwendung von Gültigkeits-Bitmaps, Reduzierung redundanter Null-Offset-Speicherungen und Beschleunigung von Bitset-Kopien (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>, <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>, <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>Verbesserung hybrider Skalarindizes für verschachtelte Struktur-Unterfelder durch Verwendung von STL_SORT, wenn die Anzahl der unterschiedlichen Elemente die Kardinalitätsgrenze der Bitmap erreicht (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>Verbesserung der Effizienz der Segment-ID-Filterung im Metadaten-Cache (<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>Reduzierung der Speicherzuweisungen in Hash-Hilfsfunktionen (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>Optimierte Sortierung von zusammengeführten Rerank-Ergebnissen durch Eliminierung von Map-Lookups pro Vergleich (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>Verbesserte Speichersicherheit bei der Verarbeitung von JSON-Standardwerten und nicht mit NUL terminierten String-Ansichten (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>Verbesserung der C++-Build-Zeiten durch bereichsbezogene Unity-Kompilierung, verbessertes Compiler-Caching und Reduzierung redundanter Kompilierungsarbeit (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>Verbesserte Abdeckung und Aktualität der Dateisystem-Metriken durch das Sammeln von Metriken aus zwischengespeicherten Dateisystemen zum Zeitpunkt des Scrapings unter Beibehaltung bestehender Metriknamen und -bezeichnungen (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>Hinzufügung einer aktualisierbaren Einstellung „growingBuildThreadRate“ zur Konfiguration der Threads pro Zwischenindex-Erstellung für wachsende Segmente unter Beibehaltung der standardmäßigen Single-Thread-Ausführung (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>Unterstützung für das mmap-Field-Data-Writeback wurde durch einen Backport in Version 3.0 hinzugefügt, mit der standardmäßig deaktivierten Option `queryNode.mmap.writeback` (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Behebung falscher Ergebnisse und inkonsistenter Prädikatsvalidierung in JSON-, ARRAY- und TIMESTAMPTZ-Abfragen, einschließlich Prädikaten mit gemischten Typen, Vergleichen großer Zahlen und Filterung über mehrere Batches hinweg (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>Behebung von inkonsistenten aktualisierten Daten bei parallelen Aktualisierungen externer Sammlungen, wenn sich die Quelldateien eines Segments über mehrere Tasks erstreckten (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>Es wurde behoben, dass MATCH-Ausdrücke Prädikate akzeptierten, die nicht auf Elementebene wirkten (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>Behebung eines Fehlers, bei dem Suchvorgänge ohne Treffer mit einem Fehler wegen eines nicht unterstützten ID-Typs fehlschlugen (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>Es wurde behoben, dass sich der eigenständige Milvus beim Herunterfahren aufhängte, indem ein konfigurierbares Migrations-Timeout mit einem Standardwert von 10 Sekunden hinzugefügt wurde (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>Es wurde behoben, dass Einbettungsanfragen für externe Tabellen die falsche Cluster-Identität verwendeten, wenn DataNode-Worker von mehreren Serving-Clustern gemeinsam genutzt wurden (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>Es wurde ein Problem behoben, das die Aktualisierung von `integration_id` und `model_deployment_id` für TextEmbedding-Funktionen verhinderte (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>Es wurde behoben, dass in HTTP-JSON-Antworten der explizite Status „ok=false“ für fehlgeschlagene Backfill-Segmente fehlte (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>Es wurde behoben, dass MinIO-Objekt-Uploads mit dem HTTP-Fehler 400 „XAmzContentChecksumMismatch“ fehlschlugen, wenn sie nach Transport- oder Low-Speed-Timeouts erneut versucht wurden (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>, <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>Behebung eines Problems, bei dem der Segmentausgleich zwischen QueryNodes ins Stocken geriet, wenn der Streaming-Dienst aktiviert war (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>, <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>Behebung eines stillen Datenverlusts während der Mix-Kompaktierung, wenn aufbewahrte Datensätze nicht wiederhergestellt werden konnten (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>Es wurde behoben, dass bei der Wiederherstellung von Snapshots die Sammlungseinstellungen verloren gingen und unerwartet auf „Starke Konsistenz“ zurückgesetzt wurden (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>Es wurde behoben, dass beim Löschen im Streaming-Modus neu geladene versiegelte Segmente fehlten, wodurch gelöschte Daten weiterhin abfragbar blieben (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>Es wurde behoben, dass verschachtelte Indizes für leere Daten nicht korrekt erstellt wurden (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>Es wurde ein Deadlock behoben, der beim Wechsel zum Streaming-Dienst auftrat und dazu führte, dass Operationen unbegrenzt warteten (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>Es wurde behoben, dass bei der Kompaktierung und beim Wiederaufbau von Datensätzen falsche Standardwerte für Geometrieangaben auftraten und bei Parquet-Importen falsche Null-Markierungen für standardmäßig gefüllte Geometriewerte gesetzt wurden (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>Es wurde behoben, dass gültige V3-Segmente während der Komprimierung und Wiederherstellung nach einem Neustart von DataCoord abgelehnt wurden (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>, <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>, <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>, <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>, <a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>, <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>Fehler beim Laden von Segmenten mit einem Fehler wegen fehlender Versionsmetadaten bei der Verwendung von hybriden Skalarindizes für VARCHAR-Array-Unterfelder in Strukturen behoben (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>Es wurde behoben, dass externe Spalten nicht aktualisiert wurden, wenn ein aktualisiertes Manifest erneut geöffnet wurde (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>Die fehlerhafte Zeitzonenbehandlung bei Suchvorgängen mit zeitabhängigen Bedingungen wurde behoben (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>Die fehlerhafte Verarbeitung von „ArrayOfVector“-Eingaben in Suchanfragen wurde behoben (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>Es wurde behoben, dass bei Einfügungen Zeilen, die die unterstützte Größenbeschränkung überschritten, nicht abgelehnt wurden (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>Es wurde behoben, dass Zwischenindizes die konfigurierte Zielindexversion ignorierten (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>Es wurde behoben, dass Abfragen mit „order_by“ keine dichten Vektor-Ausgabefelder zurückgaben (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>, <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>Es wurde behoben, dass widerrufene Berechtigungen auch nach dem Entfernen aus einer Berechtigungsgruppe weiterhin wirksam blieben (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>Es wurde behoben, dass nach einem Neustart von DataCoord die Anzahl der Binlog-Dateien und die Bezeichnungen des Speicherformats für Storage-V3-Segmente falsch waren (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>, <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>Es wurde behoben, dass die Wiederherstellung externer Snapshots aufgrund unzuverlässiger Worker-Versionsprüfungen oder wiederholter Versuche mit nicht unterstützten Workern bis zum Timeout ins Stocken geriet (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>Es wurde ein Fehler behoben, bei dem das Laden von Segmenten für HYBRID-Indizes auf Struct-Array-Unterfeldern mit älteren STLSORT-Dateien aus Version 3.0.0 fehlschlug, ohne dass eine Neuindizierung erforderlich war (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>Abstürze bei der Verarbeitung von Arrow-C-Datenpuffern mit der Länge Null wurden behoben (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>Es wurde eine fehlerhafte Fehlerbehandlung beim Laden oder erneuten Öffnen von Storage-V3-Segmenten nach Manifestfehlern behoben, wobei der bestehende Segmentzustand für sichere Wiederholungsversuche beibehalten wird (<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>)</li>
<li>Fehler bei Abfragen behoben, bei denen ARRAY-Elementfilter auf vollständige Batches mit NULL- oder leeren Arrays stießen, bevor spätere Elemente auftraten (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>Behebung des Problems, dass Backfill-Jobs veraltete Einbettungen festschrieben, nachdem sich das Sammlungsschema geändert hatte (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>Es wurde behoben, dass fehlende Felder in Storage V3-Datensätzen als NULL anstelle ihrer deklarierten Standardwerte zurückgegeben wurden (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>, <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>, <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>Es wurden serverseitige Kopierfehler behoben, die die Wiederherstellung von Storage V3-Snapshots auf GCS mit IAM-/OAuth-Anmeldedaten verhinderten, einschließlich Kopien von Objekten, die größer als 5 GiB waren (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>Behebung eines nicht authentifizierten Zugriffs über gRPC-Streaming-Aufrufe auf dem externen Proxy-Port (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>Es wurde behoben, dass Daten nach einer Cluster-Kompaktierung ihre ursprünglichen Commit-Zeitstempel verloren (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>Abstürze von Streaming-Knoten wurden behoben, die durch wiederholte Flush-Fehler nach dem Hinzufügen eines TEXT-Feldes zu Sammlungen mit bestehenden Storage V2-Segmenten verursacht wurden (<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>)</li>
<li>Behebung eines Problems, bei dem abgelaufene Zeilen in Storage V3-Segmenten keine TTL-Feld-basierte Komprimierung auslösten und so lange gespeichert blieben, bis eine andere Komprimierungsbedingung erfüllt war (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>Es wurde behoben, dass automatisch generierte Primärschlüssel zwischen Quell- und Zielsammlungen bei CDC-replizierten Importen inkonsistent waren (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>Es wurde behoben, dass gleichzeitige Schreibvorgänge während der WAL-Backend-Migration verloren gingen (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>, <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>, <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>Es wurde behoben, dass neu erstellte oder komprimierte verschachtelte HYBRID-Indizes mit Daten hoher Kardinalität nach einem Rollback auf eine ältere Version unlesbar wurden (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>Die Behandlung von Null-Elementen in externen dichten Vektorzeilen wurde korrigiert, indem vollständig null-gefüllte, nullfähige Zeilen akzeptiert und eine konfigurierbare Behandlung von teilweise null-gefüllten Zeilen hinzugefügt wurde (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>Es wurde behoben, dass nach einem Failover des Streaming-Knotens falsche Zeilenanzahlen in V3-Segmenten auftraten und wiederholt Fehler bei der Sortierkomprimierung auftraten (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Abfragen, die Bereichsbedingungen mit „OR“ kombinierten, Datensätze an der inklusiven unteren Grenze ausließen (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>Behebung eines Problems, bei dem bei Suchvorgängen nach Primärschlüssel die angeforderte ID-Reihenfolge nicht beibehalten wurde (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>Es wurde ein Problem behoben, bei dem das Hinzufügen eines TEXT-Feldes nach der Aktivierung von Storage V3 das Laden bestehender wachsender Segmente von Storage V2 verhinderte und dadurch Flush-, Sortier- und Indexvorgänge unterbrach (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Snapshots nicht festgeschriebene Storage V3-Segmente enthielten, was dazu führte, dass Wiederherstellungen als erfolgreich gemeldet wurden, obwohl die wiederhergestellten Segmente nicht geladen werden konnten (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>, <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>Es wurde behoben, dass Storage-V3-Textindizes nicht geladen werden konnten, wenn ihre Dateien in verschachtelten Aufgaben- oder Versionsverzeichnissen gespeichert waren (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
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
<p>Milvus 3.0.0 ist offiziell veröffentlicht! Aufbauend auf der in <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a> eingeführten Lake-Native-Architektur vollendet diese Version, was die Beta-Version begonnen hat: „External Collection“ deckt mehr Lakehouse-Workflows ab; das Schema unterstützt das Online-Hinzufügen, -Nachfüllen und -Löschen; der Sparse-Index wurde auf Basis von SINDI neu aufgebaut; „StructArray“ und die facettierte Suche runden die Abruf-Engine ab; „FAISS-Passthrough“ und „TEXT“ erweitern die Auswahl an Indizes und Modalitäten; und „Woodpecker“ läuft als eigenständiger Dienst.</p>
<p>Sehen Sie sich das folgende Video an, um mehr über Milvus 3.0 zu erfahren, und nehmen Sie an der AMA mit den Kernentwicklern teil:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Wenn Sie mit der 3.0-Reihe noch nicht vertraut sind, fasst der Abschnitt „Zusammenfassung der Core 3.0-Funktionen“ unten die in der 3.0-Beta eingeführten Funktionen zusammen; die vollständigen Beschreibungen finden Sie in <a href="https://milvus.io/docs/release_notes.md#v30-beta">den Versionshinweisen zur 3.0-Beta</a>.</p>
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Externe Sammlung: umfassendere Lakehouse-Workflows</h4><p>Mit der 3.0-Beta wurde „External Collection“ eingeführt: Sie können Lake-Dateien direkt referenzieren, Indizes erstellen und diese durchsuchen, ohne Daten in Milvus zu kopieren. Diese Version erweitert diese Funktion hin zu vollständigen Lakehouse-Abfrage-Workflows. Externe Felder können nun als Eingabe für Funktionsausgabefelder dienen, wie z. B. BM25-Sparse-Vektoren, MinHash-Signaturen und Text-Embeddings, sodass Text- und modellbasierte Suchfelder innerhalb von Milvus erstellt werden, ohne die Quelltabelle zu kopieren. „Refresh“ unterstützt zudem eine additive Schemaentwicklung: Wenn die externe Tabelle neue Spalten erhält, passt Milvus die betroffenen Segmente an, anstatt die Sammlung neu zu erstellen.</p>
<p>Diese Version fügt außerdem ein externes Format namens „ <code translate="no">milvus-table</code> “ hinzu, das Milvus-Snapshot-Metadaten und Storage-V3-Manifeste als externe Quelle behandelt, sodass ein Sammlungs-Snapshot selbst als externe Tabelle bereitgestellt werden kann – Batch- und Servingsysteme erhalten eine gemeinsame, durch Manifeste gestützte Ansicht derselben Daten.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/create-an-external-collection.md">„Externe Sammlung</a> und <a href="/docs/de/snapshots.md">Snapshots</a> <a href="/docs/de/create-an-external-collection.md">erstellen</a> “.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Flexibles Schema: Spalten online hinzufügen, nachträgliches Einfügen und Löschen</h4><p>Schemas bleiben in der Produktion nicht statisch – eingebettete Modelle werden ersetzt, Features durchlaufen Iterationen, Felder werden veraltet – und dies bedeutete früher einen vollständigen Neuaufbau der Sammlung mit Ausfallzeiten oder doppelten Schreibvorgängen. 3.0.0 schließt den Kreis: Spalten können hinzugefügt, nachträglich gefüllt und entfernt werden, während die Bereitstellung weiterläuft.</p>
<p>Das Nachfüllen funktioniert in beide Richtungen. Das externe Nachfüllen verarbeitet Werte, die außerhalb von Milvus berechnet wurden: Fügen Sie eine Spalte hinzu, erstellen Sie einen Snapshot der Sammlung als konsistenten Ausgangspunkt, führen Sie den Job offline aus, schreiben Sie die Werte zurück, und Milvus indiziert die neue Spalte inkrementell – ein Upgrade des Einbettungsmodells über Hunderte Millionen Zeilen hinweg wird zu einem Hot-Path ohne Ausfallzeiten. Das interne Backfill deckt vom Kernel abgeleitete Werte ab: Fügen Sie einer bestehenden Sammlung eine BM25- oder MinHash-Funktion hinzu, und deren Ausgabefeld wird automatisch anhand der vorhandenen Daten berechnet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/add-fields-to-an-existing-collection.md">„Felder zu einer bestehenden Sammlung hinzufügen</a>“.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Überarbeitung des Sparse-Index: SINDI, Block-Max WAND und Block-Max MaxScore</h4><p>Milvus 3.0 verbessert den Sparse-Vektor-Index auf breiter Front. Es führt neue Suchalgorithmen ein – <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND und Block-Max MaxScore – sowie Inverted-List-Komprimierung, konfigurierbare Quantisierung und die Auswahl von Suchalgorithmen je nach Workload. Das Laden über mmap, die Serialisierung und die BM25-Bewertung wurden ebenfalls optimiert, wodurch der Speicherbedarf des Indexes und der Overhead beim Laden für die groß angelegte Suche nach spärlichen Vektoren und Volltextsuche reduziert werden. In internen Benchmarks ist der komprimierte BM25-Index bei vergleichbarer Recall-Rate etwa dreimal kleiner als der 2.6-Sparse-Index, und SINDI erreicht bei trainierten spärlichen Einbettungen bis zu etwa das Zehnfache der QPS von MaxScore. Sobald die neue Indexversion aktiviert ist (siehe Hinweise zu Kompatibilität und Verhalten), ist SINDI die Standardeinstellung für die spärliche IP-Suche und MaxScore die Standardeinstellung für BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray-Unterstützung</h4><p>StructArray unterstützt nun Nullwerte, Bitmap-Indizes, das dynamische Hinzufügen von Feldern zu aktiven Sammlungen sowie die teilweise Aktualisierung von Struct-Feldern per „Upsert“, ergänzt durch entsprechende Unterstützung für REST und Massenimport.</p>
<p>Die Suche auf Elementebene bietet nun eine hybride Suche über Vektor-Unterfelder hinweg mit konfigurierbarer Zusammenfassung pro Entität (Varianten „max“, „sum“, „avg“ und „top-k“) sowie Bereichssuche und Gruppierung innerhalb dieser Suche. Die verschachtelte Filterung umfasst die Prädikate „ <code translate="no">element_filter</code> “, die Quantoren „ <code translate="no">MATCH_ANY</code> “, „ <code translate="no">MATCH_ALL</code> “, „ <code translate="no">MATCH_LEAST</code> “, „ <code translate="no">MATCH_MOST</code> “ und „ <code translate="no">MATCH_EXACT</code> “, den positionellen Zugriff auf Unterfelder wie „ <code translate="no">tags[0][name]</code> “ sowie „ <code translate="no">array_length()</code> “ für die Struct-Spalte.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/array-of-structs.md">„StructArray</a> “ und <a href="/docs/de/struct-array-operators.md">„StructArray-Operatoren</a>“.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Suchaggregation und facettierte Suche</h4><p>Die Abfrageaggregation aus der Beta-Version berechnet exakte Statistiken über gefilterte Daten; Version 3.0.0 fügt die Facettierung im Suchpfad hinzu. Geben Sie zum Zeitpunkt der Suche ein Facettenfeld an, und Milvus gibt die wichtigsten Facettenwerte zurück, die jeweils durch das am besten passende Element im ANN-Ranking repräsentiert und mit Aggregaten wie COUNT und AVG – die Seitenleiste für die facettierte Suche (Marke, Preisklasse, Attribute) in einer einzigen Abfrage, anstatt clientseitig zu viele Daten abzurufen und zu zählen.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Neubewertung über die Function Chain</h4><p>Das Reranking lässt sich nun über die Function-Chain-API zusammenstellen, die eine geordnete, typisierte Pipeline als Teil einer einzigen Suchanfrage ausführt. Eine Kette kann eine frühzeitige L0-Neubewertung auf dem „QueryNode“ mit einer L2-Neubewertung nach der Reduktion auf dem „Proxy“ kombinieren und unterstützt dabei die Transformation und Kombination von Bewertungen, modellbasierte Neubewertung, Sortierung und das Aussortieren von Kandidaten ohne clientseitige Koordination. Diese Version fügt außerdem eine native XGBoost-Bewertung für das L0-Reranking hinzu, wobei als FileResources registrierte UBJ-Modelle verwendet werden, sowie Hugging Face Inference Provider für serverseitig verwaltete Text-Embeddings und das Reranking anhand der Satzähnlichkeit.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT-Felder für Langtexte</h4><p>TEXT-Felder machen Langtexte zu einer vollwertigen Kategorie, wobei speicherseitige Längenbeschränkungen entfallen: Sie unterstützen „ <code translate="no">text_match</code> “, „ <code translate="no">phrase_match</code> “ und „BM25“. Werte unter 64 KB bleiben inline; größere Werte werden in LOB-Dateien auf Partitionsebene im Vortex-Format gespeichert, wobei die Spalte nur „ <code translate="no">(file_id, offset)</code> “-Referenzen enthält. LOB-Dateien werden segmentübergreifend gemeinsam genutzt, sodass bei der Komprimierung Referenzen verschoben werden, anstatt Text neu zu schreiben. Für RAG bedeutet dies, dass Vektoren und Quelltext in einem einzigen I/O-Vorgang aus demselben Speicher abgerufen werden – es muss kein externer Blob-Speicher betrieben werden.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS-Index-Passthrough</h4><p>Ein neuer „ <code translate="no">FAISS</code> “-Indextyp akzeptiert beliebige Faiss-Index-Factory-Strings über den Parameter „ <code translate="no">faiss_index_name</code> “ – <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> – wobei Suchparameter weitergeleitet werden, sodass Faiss-Rezepte direkt in Milvus reproduziert werden können.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Unterstützung für die Formate „Vortex“ und „Lance“</h4><p>Die Speicherschicht wird um zwei offene spaltenorientierte Formate erweitert: Vortex als internes Format der nächsten Generation – adaptive Kodierungen (Dictionary, RLE, Bit-Packing, Float-spezifische Komprimierung), Zero-Copy-Dekomprimierung, optimiert für gemischte Vektor- und Skalar-Workloads – sowie Lance neben Parquet für den Austausch innerhalb eines offenen Ökosystems. Vortex soll zum standardmäßigen internen Format werden, wobei Filter-Pushdown und eine lokale Variante auf der Roadmap stehen.</p>
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
<li><strong>Abfrage / Suche ORDER BY</strong> – serverseitige Sortierung nach mehreren Feldern mit ASC / DESC pro Feld.</li>
<li><strong>Abfrageaggregation</strong> – COUNT / SUM / AVG / MIN / MAX mit „group-by“, serverseitig ausgewertet.</li>
<li><strong>EmbList + DiskANN</strong> – On-Disk-Indexierung mit mehreren Vektoren für StructArray-Einbettungslisten, mit Beschleunigungspfaden wie Muvera und Lemur.</li>
<li><strong>MinHash-Funktion (doc-in, doc-out)</strong> – serverseitige MinHash-Signaturen sowie „ <code translate="no">MINHASH_LSH</code> “ zur Erkennung von Beinahe-Duplikaten.</li>
<li><strong>Nullfähige Vektoren</strong> — NULL bei allen sechs Vektortypen; die Suche überspringt NULL-Zeilen, und „AddField“ lässt sich auf Vektorfelder erweitern.</li>
<li><strong>Entity-TTL</strong> — zeilenweiser Ablauf, gesteuert durch ein TIMESTAMPTZ-Feld.</li>
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
<li><strong>Storage V3 (Loon) ist standardmäßig deaktiviert.</strong> Funktionen, die davon abhängen – wie Snapshot- und TEXT-Felder – erfordern die manuelle Aktivierung über <code translate="no">common.storage.useLoonFFI</code>. Storage V3 wird in einer späteren Version standardmäßig aktiviert sein.</li>
<li><strong>Die Kompatibilität und das Rollback von 2.6 → 3.0 sind gewährleistet</strong> – eine 3.0-Bereitstellung kann auf 2.6 zurückgesetzt werden. Sobald Sie jedoch Funktionen aktivieren oder nutzen, die das serialisierte Datenformat ändern (z. B. Storage V3), ist ein Rollback nicht mehr möglich.</li>
<li><strong>Neue Indexversionen sind vorerst optional.</strong> Neu eingeführte Indexalgorithmen erfordern eine manuelle Erhöhung der Zielindexversion (<code translate="no">dataCoord.targetVecIndexVersion</code> auf 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> auf 4), bevor sie wirksam werden; in einer späteren Version werden sie standardmäßig aktiviert sein.</li>
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
<p>Milvus 3.0-beta erweitert die Milvus-Vektordatenbank um eine neue Integration in das Open-Lake-Ökosystem: Mit „External Collection“ kann Milvus externe Lake-Tabellen ohne Kopiervorgang abfragen, und Spark kann Milvus-Sammlungen direkt über Snapshot lesen. Die Version bietet zudem umfangreichere Abrufmöglichkeiten, ein ausdrucksstärkeres Schema, tiefgreifendere Anpassungsmöglichkeiten für die Textsuche, feinere Steuerungsmöglichkeiten für den Daten- und Modelllebenszyklus sowie mehr Steuerungsmöglichkeiten auf Operatorenebene. Milvus 3.0 ist der Kern von Zilliz Lakebase und bildet die Grundlage für dessen einheitliche Bereitstellung, Erkennung und Batch-Verarbeitung.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">„External Collection“</h4><p>In typischen KI-Datenpipelines befinden sich bereits Terabytes an Embeddings und Metadaten im Objektspeicher als Parquet-, Lance- oder Iceberg-Tabellen. Das Kopieren dieser Daten in Milvus verdoppelt die Speicherkosten, erfordert eine ETL-Pipeline, die synchronisiert werden muss, und entzieht dem Kunden die Kontrolle über die Datenverwaltung.</p>
<p>Die externe Erfassung macht das Kopieren überflüssig. Eine Milvus-Sammlung kann auf Dateien verweisen, wo diese sich bereits befinden, und Milvus verwaltet lediglich das Schema, die Indizes und die Abfrageausführung. Eine inkrementelle Aktualisierung sorgt dafür, dass die Sammlung stets mit den zugrunde liegenden Dateien synchron bleibt. Kunden, deren Daten den Lake nicht verlassen dürfen – beispielsweise Teams aus den Bereichen Finanzen und Gesundheitswesen –, können Vektorabfragen direkt an den Daten durchführen, wo diese sich befinden. Ein einzelner, im Lake befindlicher Datensatz kann zudem gleichzeitig von mehreren Milvus-Instanzen bereitgestellt werden.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/create-an-external-collection.md">„Externe Sammlung erstellen</a>“.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Für die Bereitstellung und die Batch-Ermittlung wird oft gleichzeitig auf dieselbe Sammlung zugegriffen. A/B-Modellbewertung, groß angelegte Deduplizierung, Backfill-Validierung und Versions-Rollback erfordern alle eine stabile Ansicht der Sammlung, während weiterhin Schreibvorgänge stattfinden.</p>
<p>Ein Snapshot erstellt eine zeitpunktbezogene, schreibgeschützte Ansicht einer Collection, indem er auf vorhandene Segmente verweist, anstatt Daten zu kopieren, sodass die zusätzlichen Speicherkosten nahezu null sind. Batch-Jobs können unter MVCC-ähnlicher Isolation aus dem Snapshot lesen, während die Live-Collection weiterhin Schreibvorgänge akzeptiert.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/snapshots.md">„Snapshots“</a>, <a href="/docs/de/manage-snapshots.md">„Snapshots verwalten</a>“ und <a href="/docs/de/snapshot-use-cases.md">„Anwendungsfälle für Snapshots</a>“.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Abfrage / Suche nach „Order By“</h4><p>Suche und Abfrage unterstützen nun die Sortierung nach mehreren Feldern, wobei die Sortierung in den Milvus-Kernel verlagert wird und „ <code translate="no">ASC</code> “ sowie „ <code translate="no">DESC</code> “ pro Feld einstellbar sind. Dies schließt eine häufige Lücke im Produktiveinsatz: „Top-K“ allein nach Entfernung entspricht oft nicht den geschäftlichen Anforderungen, wenn das ähnlichste Element nicht das günstigste, das aktuellste oder das beliebteste ist.</p>
<p>Anwendungen müssen nun nicht mehr übermäßig viele Ergebnisse abrufen und auf dem Client neu sortieren, um zusammengesetzte Ranglisten darzustellen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">„Sortieren von Suchergebnissen nach skalaren Feldern</a> “ und <a href="/docs/de/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">„Sortieren von Abfrageergebnissen</a>“.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Abfrageaggregation</h4><p>Um Statistiken zur Mandantenverteilung, Zählungen zur Feldvollständigkeit oder den Fortschritt bei der Versionsbereitstellung aus einer Milvus-Sammlung zu erstellen, mussten bisher passende Entitäten auf den Client zurückgeladen und dort aggregiert werden. Milvus 3.0 integriert skalare Aggregationen im SQL-Stil in den Kernel. Ein Abfrageaufruf akzeptiert „ <code translate="no">group_by_fields</code> “ und Aggregationsausdrücke in „ <code translate="no">output_fields</code> “, einschließlich „ <code translate="no">count(*)</code> “, „ <code translate="no">count(&lt;field&gt;)</code> “, „ <code translate="no">sum(&lt;field&gt;)</code> “, „ <code translate="no">avg(&lt;field&gt;)</code> “, „ <code translate="no">min(&lt;field&gt;)</code> “ und „ <code translate="no">max(&lt;field&gt;)</code> “. Die Aggregation wird nach dem Filtern serverseitig ausgewertet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">„Aggregieren von Abfrageergebnissen</a>“.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null-Vektor</h4><p>Einbettungen werden oft asynchron erzeugt, sodass eine Entität eintreffen kann, bevor ihr Vektor bereitsteht. Auch multimodale Daten weisen natürliche Lücken auf, wie beispielsweise ein Video ohne Untertitel oder ein Produkt ohne Bild. Frühere Versionen hatten hierfür keine gute Lösung: Anwendungen verzögerten entweder das Schreiben, bis der Vektor bereit war, oder füllten einen Platzhaltervektor ein – beides beeinträchtigte die Suchqualität.</p>
<p>Milvus 3.0 unterstützt NULL in Vektorfeldern für alle sechs Vektortypen. Die Suche überspringt NULL-Vektoren automatisch, die Suchqualität bleibt unbeeinträchtigt, und NULL-Vektoren beanspruchen praktisch keinen Speicherplatz. Die „ <code translate="no">AddField</code> “-Funktion erstreckt sich im Rahmen dieser Änderung auch auf Vektorfelder: Mit „ <code translate="no">nullable=True</code> “ kann eine bestehende Collection online neue Vektorfelder hinzufügen, ohne dass ein Neuaufbau erforderlich ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">„Nullfähige Felder</a>“.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Benutzerdefiniertes Wörterbuch &amp; Synonymwörterbuch</h4><p>Standard-Tokenizer erfüllen nicht immer die Anforderungen an die Suchqualität im Produktivbetrieb. Chinesisch, vertikale Fachgebiete wie Medizin, Recht und Chemie sowie mehrsprachige Korpora können erheblich von benutzerdefinierten Wörterbüchern und Synonymtabellen profitieren. Bislang wurden diese Ressourcen meist als anwendungsseitige Abfrageumschreibungen implementiert.</p>
<p>Milvus 3.0 führt einen „FileResource“-Mechanismus ein, mit dem benutzerdefinierte Wörterbücher für Tokenizer, Synonymlisten, Stoppwortlisten und Regeln zur Zerlegung zusammengesetzter Wörter registriert werden können. Nach der Registrierung kann eine Ressource von jedem Tokenizer oder Filter aus referenziert werden und wirkt sich auf BM25, Analysatoren und Text Match aus. Wörterbücher und Synonyme können nun zentral verwaltet und versioniert werden, anstatt über den Anwendungscode verstreut zu sein.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/manage-file-resources.md">„Dateiressourcen verwalten</a>“.</p>
<h4 id="Entity-TTL" class="common-anchor-header">Entitäts-TTL</h4><p>TTL auf Collection- und Partitionsebene sind für viele Lebenszyklus- und Compliance-Szenarien zu grob. Verschiedene Mandanten innerhalb derselben Collection haben oft unterschiedliche Aufbewahrungsregeln, und einzelne Entitäten müssen möglicherweise nach einem Zeitplan ablaufen, der nicht mit dem Rest der Collection übereinstimmt.</p>
<p>Milvus 3.0 unterstützt TTL auf Entitätsebene. Deklarieren Sie im Schema ein Feld „ <code translate="no">TIMESTAMPTZ</code> “, kennzeichnen Sie es über eine Collection-Eigenschaft als TTL-Feld, und Milvus entfernt abgelaufene Entitäten automatisch. Dies deckt Anträge auf das Recht auf Vergessenwerden, das Ablaufen von Sitzungsdaten und begrenzte Konversationsverläufe ab, ohne dass eine Bereinigung auf Anwendungsseite erforderlich ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">„TTL auf Entitätsebene festlegen</a>“.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Mit Milvus 2.6 wurde der „ <code translate="no">MINHASH_LSH</code> “-Index für die setbasierte Erkennung von Beinahe-Duplikaten eingeführt, doch Anwendungen mussten weiterhin MinHash-Signaturen berechnen, bevor Daten in Milvus geschrieben wurden.</p>
<p>Milvus 3.0 führt eine serverseitige MinHash-Funktion ein. Deklarieren Sie im Schema ein Eingabefeld „ <code translate="no">VARCHAR</code> “ und ein Ausgabefeld „ <code translate="no">BINARY_VECTOR</code> “, verknüpfen Sie eine „ <code translate="no">FunctionType.MINHASH</code> “-Funktion damit, und Milvus berechnet die Signaturen während des Einfügens, der Masseneingabe und der Suche. Zusammen mit „ <code translate="no">MINHASH_LSH</code> “ unterstützt dies Deduplizierungs-Workflows für große Datensätze, Fingerprinting und Plagiatserkennung innerhalb von Milvus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/minhash-function.md">„MinHash-Funktion</a>“.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Die Annahme „eine Entität = ein Vektor“ passt nicht mehr zur modernen Informationsgewinnung. Lange Dokumente werden in viele Teile zerlegt, Modelle mit später Interaktion wie ColBERT geben pro Token einen Vektor aus, und multimodale Entitäten können mehrere Ansichten enthalten.</p>
<p>EmbList speichert pro Entität eine Vektorliste variabler Länge, wobei „ <code translate="no">DISKANN</code> “ als Index auf der Festplatte dient. Der Festplattenpfad hält den RAM-Verbrauch unter Kontrolle, wenn das Korpus die Speichergrenzen überschreitet. EmbList + „ <code translate="no">DISKANN</code> “ ist die erste Variante der umfassenderen StructList-Familie in dieser RC-Version. Der Rest der Familie, einschließlich der StructList-Filterung und der Multi-Vektor-Beschleunigung durch Muvera/Lemur, ist für die offizielle Version 3.0 vorgesehen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/search-with-embedding-lists.md">„Suche mit Embedding-Listen</a>“.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>In Produktionsumgebungen kommt es im Laufe der Zeit zu einer zunehmenden Segmentfragmentierung, was zu Schwankungen bei der Abfragelatenz und einem übermäßigen Speicherbedarf führt.</p>
<p>Milvus 3.0 bietet nun die Möglichkeit, die Segmentkomprimierung während Zeiten mit geringer Auslastung explizit auszulösen – sowohl im synchronen als auch im asynchronen Modus.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/force-merge.md">„Kompaktierung durch erzwungene Zusammenführung</a>“.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 führt „Storage V3“ ein, eine manifestbasierte spaltenorientierte Speicher-Engine, bei der Daten und Metadaten auf einem S3-kompatiblen Objektspeicher abgelegt werden. Jede Datensatzversion wird als unveränderlicher Manifest-Snapshot erfasst – eine Avro-kodierte Datei, die festhält, aus welchen Spaltengruppen, Delta-Protokollen und Statistiken der Datensatz besteht.</p>
<p>Manifeste sind kompakte Avro-Dateien, und Delta-Logs protokollieren Löschungen auf Entitätsebene, ohne dass Datendateien neu geschrieben werden müssen. Dadurch bleibt der Metadaten-Overhead gering, auch wenn die Datensätze wachsen. Das Manifest entkoppelt zudem die Metadatenverfolgung vom Abfragepfad, sodass eine Collection mehr Segmente verwalten kann, ohne dass die Abfrageleistung beeinträchtigt wird.</p>
<p>Da die Zustände im Objektspeicher abgelegt werden, ist der Datensatz selbsterklärend: Jeder Leser mit Zugriff auf den Speicherpfad kann ihn ohne zentralen Katalog erkennen und interpretieren. Diese Eigenschaft bildet die Grundlage für die Integration von „External Collection“, „Snapshot“ und zukünftigen Lake-Integrationen.</p>
