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
    </button></h1><p>Finden Sie heraus, was es Neues in Milvus gibt! Auf dieser Seite werden neue Funktionen, Verbesserungen, bekannte Probleme und Fehlerbehebungen in jeder Version zusammengefasst. Sie können die Versionshinweise für jede Version nach v2.5.0 in diesem Abschnitt finden. Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um sich über Updates zu informieren.</p>
<h2 id="v250-beta" class="common-anchor-header">v2.5.0-beta<button data-href="#v250-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: November 26, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.0-beta</td><td>2.5.0</td><td>2.5.0</td><td>2.5.0</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0-beta bringt bedeutende Fortschritte zur Verbesserung der Benutzerfreundlichkeit, Skalierbarkeit und Leistung für Benutzer, die mit Vektorsuche und umfangreicher Datenverwaltung zu tun haben. Mit dieser Version integriert Milvus leistungsstarke neue Funktionen wie die begriffsbasierte Suche, Clustering-Kompaktierung für optimierte Abfragen und vielseitige Unterstützung für spärliche und dichte Vektorsuchmethoden. Verbesserungen in den Bereichen Cluster-Management, Indizierung und Datenhandling sorgen für ein neues Maß an Flexibilität und Benutzerfreundlichkeit und machen Milvus zu einer noch robusteren und benutzerfreundlicheren Vektordatenbank.</p>
<h3 id="Key-Features" class="common-anchor-header">Wesentliche Merkmale</h3><h4 id="Full-Text-Search" class="common-anchor-header">Volltextsuche</h4><p>Milvus 2.5 unterstützt die mit Sparse-BM25 implementierte Volltextsuche! Diese Funktion ist eine wichtige Ergänzung zu den starken semantischen Suchfähigkeiten von Milvus, insbesondere in Szenarien, die seltene Wörter oder technische Begriffe beinhalten. In früheren Versionen unterstützte Milvus Sparse-Vektoren, um bei der Stichwortsuche zu helfen. Diese spärlichen Vektoren wurden außerhalb von Milvus durch neuronale Modelle wie SPLADEv2/BGE-M3 oder statistische Modelle wie den BM25-Algorithmus erzeugt.</p>
<p>Milvus 2.5 verfügt über eine eingebaute Tokenisierung und Sparse-Vector-Extraktion, wodurch die API nicht mehr nur Vektoren als Eingabe empfängt, sondern direkt Text akzeptiert. Die statistischen Informationen des BM25-Algorithmus werden bei der Eingabe von Daten in Echtzeit aktualisiert, was die Benutzerfreundlichkeit und Genauigkeit erhöht. Darüber hinaus bieten spärliche Vektoren auf der Grundlage von ANN-Algorithmen (Approximate Nearest Neighbour) eine bessere Leistung als Standard-Schlüsselwortsuchsysteme.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">Cluster Management WebUI (Beta)</h4><p>Um massive Datenmengen und umfangreiche Funktionen besser zu unterstützen, umfasst das ausgeklügelte Design von Milvus verschiedene Abhängigkeiten, zahlreiche Knotenrollen, komplexe Datenstrukturen und mehr. Diese Aspekte können eine Herausforderung für die Nutzung und Wartung darstellen.</p>
<p>Milvus 2.5 führt eine integrierte Cluster Management WebUI ein, die die Schwierigkeiten bei der Systemwartung reduziert, indem sie die komplexen Informationen der Milvus-Laufzeitumgebung visualisiert. Dazu gehören Details zu Datenbanken und Sammlungen, Segmenten, Kanälen, Abhängigkeiten, Knotenstatus, Aufgabeninformationen, langsame Abfragen und vieles mehr.</p>
<h4 id="Text-Match" class="common-anchor-header">Textabgleich</h4><p>Milvus 2.5 nutzt die Analyse- und Indizierungsfunktionen von Tantivy für die Textvorverarbeitung und den Aufbau von Indizes und unterstützt den präzisen Abgleich von Textdaten in natürlicher Sprache auf der Grundlage bestimmter Begriffe. Diese Funktion wird in erster Linie für die gefilterte Suche nach bestimmten Bedingungen verwendet und kann skalare Filter zur Verfeinerung der Abfrageergebnisse einbeziehen, so dass Ähnlichkeitssuchen innerhalb von Vektoren, die skalare Kriterien erfüllen, möglich sind.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/keyword-match.md">Textabgleich</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Bitmap-Index</h4><p>Ein neuer skalarer Datenindex wurde der Milvus-Familie hinzugefügt. Der BitMap-Index verwendet ein Array von Bits, dessen Länge der Anzahl der Zeilen entspricht, um die Existenz von Werten darzustellen und die Suche zu beschleunigen.</p>
<p>Bitmap-Indizes haben sich traditionell bei Feldern mit niedriger Kardinalität bewährt, die nur eine geringe Anzahl unterschiedlicher Werte haben, z. B. eine Spalte mit Geschlechtsinformationen, die nur zwei mögliche Werte enthält: männlich und weiblich.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/bitmap.md">Bitmap-Index</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullbar &amp; Standardwert</h4><p>Milvus unterstützt jetzt das Festlegen von löschbaren Eigenschaften und Standardwerten für skalare Felder mit Ausnahme des Primärschlüsselfeldes. Bei skalaren Feldern, die als <code translate="no">nullable=True</code> gekennzeichnet sind, können Benutzer das Feld beim Einfügen von Daten auslassen; das System behandelt es als Nullwert oder Standardwert (falls gesetzt), ohne einen Fehler zu verursachen.</p>
<p>Standardwerte und löschbare Eigenschaften bieten Milvus mehr Flexibilität. Benutzer können diese Funktion für Felder mit unsicheren Werten bei der Erstellung von Sammlungen nutzen. Es vereinfacht auch die Datenmigration von anderen Datenbanksystemen zu Milvus, indem es die Handhabung von Datensätzen mit Nullwerten unter Beibehaltung der ursprünglichen Standardwerteinstellungen ermöglicht.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">Faiss-basierte HNSW SQ/PQ/PRQ</h4><p>Durch die enge Zusammenarbeit mit der Faiss-Gemeinschaft konnte der HNSW-Algorithmus in Faiss sowohl in Bezug auf die Funktionalität als auch auf die Leistung erheblich verbessert werden. Aus Gründen der Stabilität und Wartungsfreundlichkeit hat Milvus 2.5 seine Unterstützung für HNSW offiziell von hnswlib nach Faiss verlagert.</p>
<p>Basierend auf Faiss unterstützt Milvus 2.5 mehrere Quantisierungsmethoden für HNSW, um den Anforderungen verschiedener Szenarien gerecht zu werden: SQ (Scalar Quantizer), PQ (Product Quantizer) und PRQ (Product Residual Quantizer). SQ und PQ sind häufiger anzutreffen; SQ bietet eine gute Abfrageleistung und Aufbaugeschwindigkeit, während PQ bei gleichem Komprimierungsverhältnis eine bessere Wiedererkennung bietet. Viele Vektordatenbanken verwenden in der Regel eine binäre Quantisierung, die eine einfache Form der SQ-Quantisierung darstellt.</p>
<p>PRQ ist eine Verschmelzung von PQ und AQ (Additive Quantizer). Im Vergleich zu PQ sind längere Erstellungszeiten erforderlich, um einen besseren Recall zu erzielen, insbesondere bei hohen Komprimierungsraten, wie bei der binären Komprimierung.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Clustering-Verdichtung (Beta)</h4><p>Milvus 2.5 führt die Clustering Compaction ein, um die Suche zu beschleunigen und die Kosten in großen Sammlungen zu reduzieren. Durch die Angabe eines skalaren Feldes als Clustering-Schlüssel werden die Daten nach Bereichen umverteilt, um die Speicherung und den Abruf zu optimieren. Diese Funktion funktioniert wie ein globaler Index und ermöglicht Milvus, Daten bei Abfragen auf der Grundlage von Clustering-Metadaten effizient zu beschneiden und die Suchleistung zu verbessern, wenn skalare Filter angewendet werden.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/clustering-compaction.md">Clustering Compaction</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Andere Funktionen</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Streaming-Knoten (Beta)</h4><p>Mit Milvus 2.5 wird eine neue Komponente namens Streaming Node eingeführt, die WAL-Dienste (Write-Ahead Logging) bereitstellt. Dadurch ist Milvus in der Lage, vor und nach dem Lesen und Schreiben von Kanälen einen Konsens zu erzielen, wodurch neue Merkmale, Funktionalitäten und Optimierungen möglich werden. Diese Funktion ist in Milvus 2.5 standardmäßig deaktiviert und wird in Version 3.0 offiziell verfügbar sein.</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6-Unterstützung</h4><p>Milvus unterstützt jetzt IPv6, was eine erweiterte Netzwerkkonnektivität und Kompatibilität ermöglicht.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV-Bulk-Import</h4><p>Zusätzlich zu den JSON- und Parquet-Formaten unterstützt Milvus jetzt auch den direkten Massenimport von Daten im CSV-Format.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Expression Templates zur Abfrage-Beschleunigung</h4><p>Milvus unterstützt jetzt Ausdrucksvorlagen und verbessert damit die Effizienz der Ausdrucksanalyse, insbesondere in Szenarien mit komplexen Ausdrücken.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">GroupBy-Verbesserungen</h4><ul>
<li><strong>Anpassbare Gruppengröße</strong>: Es wurde Unterstützung für die Angabe der Anzahl von Einträgen hinzugefügt, die für jede Gruppe zurückgegeben werden.</li>
<li><strong>Hybride GroupBy-Suche</strong>: Unterstützt die hybride GroupBy-Suche auf der Basis mehrerer Vektoren-Spalten.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Iterator-Erweiterungen</h4><ul>
<li><strong>MVCC-Unterstützung</strong>: Dank der Multi-Version Concurrency Control (MVCC) können Benutzer jetzt Iteratoren verwenden, ohne von nachfolgenden Datenänderungen wie Einfügungen und Löschungen betroffen zu sein.</li>
<li><strong>Persistenter Cursor</strong>: Milvus unterstützt jetzt einen persistenten Cursor für QueryIterator, so dass Benutzer die Iteration nach einem Neustart von Milvus an der letzten Position wieder aufnehmen können, ohne den gesamten Iterationsprozess neu starten zu müssen.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Optimierung des Löschens</h4><p>Verbesserte Geschwindigkeit und verringerter Speicherverbrauch bei umfangreichen Löschvorgängen durch Optimierung der Sperrenverwendung und der Speicherverwaltung.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Upgrade der Abhängigkeiten</h4><p>Upgrade auf ETCD 3.5.16 und Pulsar 3.0.7 LTS, wobei bestehende CVEs behoben und die Sicherheit verbessert wurde. Hinweis: Das Upgrade auf Pulsar 3.x ist nicht mit früheren 2.x-Versionen kompatibel.</p>
<p>Benutzer, die bereits eine funktionierende Milvus-Installation haben, müssen die ETCD- und Pulsar-Komponenten aktualisieren, bevor sie die neuen Features und Funktionen nutzen können. Einzelheiten finden Sie unter <a href="/docs/de/upgrade-pulsar-v3.md">Upgrade von Pulsar von 2.x auf 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Lokale Speicherung V2</h4><p>Mit Milvus 2.5 wurde ein neues lokales Dateiformat eingeführt, das die Lade- und Abfrageeffizienz für skalare Daten verbessert, den Speicher-Overhead reduziert und die Grundlage für zukünftige Optimierungen schafft.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Optimierung des Ausdrucks-Parsing</h4><p>Verbessertes Parsen von Ausdrücken durch Implementierung von Caching für wiederholte Ausdrücke, Aktualisierung von ANTLR und Optimierung der Leistung von <code translate="no">NOT IN</code> Klauseln.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Verbesserte DDL-Gleichzeitigkeitsleistung</h4><p>Die Gleichzeitigkeitsleistung von Data Definition Language (DDL)-Operationen wurde optimiert.</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Angleichung der RESTful-API-Funktionen</h4><p>Angleichung der Funktionen der RESTful-API an andere SDKs zur Gewährleistung der Konsistenz.</p>
