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
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
<tr><th>Milvus-Version</th><th>Python SDK Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.5.11 ankündigen zu können! Diese Version bietet leistungsstarke neue Funktionen wie die Multi-Analysator-Fähigkeit und erweiterte Tokenizer-Unterstützung (Jieba, Lindera, ICU, Language Identifier). Außerdem haben wir mehrere Verbesserungen vorgenommen, darunter die Aktualisierung des Threadpools für das dynamische Laden von Segmenten und die optimierte Filterung von Löschvorgängen während des binlog-Imports. Wichtige Fehlerkorrekturen betreffen potenzielle Probleme mit dem Fallenlassen von Segmenten, BM25-Suchfehlern und JSON-Statistik-Filterungsfehlern.</p>
<p>Wir empfehlen Ihnen, auf 2.5.11 zu aktualisieren, um von diesen Verbesserungen und Fehlerbehebungen zu profitieren!</p>
<h3 id="Features" class="common-anchor-header">Funktionen</h3><ul>
<li>Es wurde die Möglichkeit hinzugefügt, mehrere Analyzer (Tokenizer) für die Unterstützung von mehreren Sprachen zu konfigurieren und den entsprechenden Analyzer auf der Grundlage der Anweisungen der Eingabedaten auszuwählen<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>Die Funktionalität des BM25 Analyzers wurde verbessert<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>Einführung einer <code translate="no">run_analyzer</code> API für Trockenübungen, um die Analyse der Tokenisierungsergebnisse zu erleichtern. Weitere Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md">Analyzer-Übersicht</a>.</li>
<li>Tokenisierer<ul>
<li>Unterstützung für die Anpassung von Jieba Tokenizer-Parametern wurde hinzugefügt.</li>
<li>Unterstützung für den Lindera Tokenizer wurde hinzugefügt. Weitere Informationen finden Sie unter <a href="/docs/de/lindera-tokenizer.md">Lindera</a>.</li>
<li>Unterstützung für den ICU-Tokenizer wurde hinzugefügt. Weitere Informationen finden Sie unter <a href="/docs/de/icu-tokenizer.md">ICU</a>.</li>
<li>Ein Language Identifier Tokenizer für die Spracherkennung wurde hinzugefügt.</li>
</ul></li>
<li>Filter<ul>
<li>Erweiterte Sprachunterstützung für den eingebauten Stoppwortfilter. Weitere Informationen finden Sie unter <a href="/docs/de/stop-filter.md">Stop</a>.</li>
<li>Es wurde ein <code translate="no">remove_punct</code> Filter zum Entfernen von Interpunktionszeichen hinzugefügt. Weitere Informationen finden Sie unter <a href="/docs/de/removepunct-filter.md">Remove Punct</a>.</li>
<li>Es wurde ein <code translate="no">regex</code> Filter für musterbasiertes Filtern von Text hinzugefügt. Weitere Informationen finden Sie unter <a href="/docs/de/regex-filter.md">Regex</a>.</li>
</ul></li>
</ul></li>
<li>Unterstützung für die Änderung der maximalen Kapazität von Array-Feldern wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>Unterstützung für binäre Bereichsausdrücke in JSON-Pfadindizes wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>Unterstützung für Infix- und Suffix-Match-Typen in JSON-Statistiken wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Dynamische Aktualisierungen der Größe des Segmentlade-Threadpools wurden aktiviert<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>).</li>
<li>Beschleunigte Löschfilterung während des Binlog-Imports<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>).</li>
<li>Überwachungsparameter für das Expression-Filter-Verhältnis wurden hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>Es wurde eine Konfigurationsoption hinzugefügt, um den Neuaufbau von Indizes auf die neueste Version zu erzwingen<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>Die Fehlerprotokollmeldung für die Listenrichtlinie wurde verbessert<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>Die Behandlung von Bindestrichen in gRPC-Metadaten-Headern wurde angepasst<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>Aktualisierung der Go-Version auf 1.24.1 zur Behebung von CVEs<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Es wurde ein Problem behoben, bei dem Segmente möglicherweise nicht korrekt gelöscht wurden, wenn eine Partition gelöscht wurde<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>Bulk-Insert behoben, so dass die Eingabefeldliste des Funktionsläufers statt der Feldliste des Schemas verwendet wurde<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>).</li>
<li>BM25-Suchfehler behoben, die auftraten, wenn <code translate="no">avgdl</code> (durchschnittliche Dokumentlänge) NaN war<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>Ungenaue Bezeichnungen in QueryNode Metriken korrigiert<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>Es wurde ein Problem behoben, bei dem die Erstellung eines JSON-Statistik-Index fehlschlagen konnte, wenn die Daten eine leere Karte enthielten<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>Die <code translate="no">AlterCollection</code> API wurde korrigiert, um den Zeitstempel der Änderung korrekt zu speichern<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li>Ein gelegentlicher Filterfehler in JSON-Statistiken unter <code translate="no">ConjunctExpr</code> wurde behoben und die Berechnungslogik für Taskslots verbessert, um die Erstellung von JSON-Statistiken zu beschleunigen<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>).</li>
<li>Ein IDF-Orakel-Leck in der BM25-Statistikberechnung wurde behoben<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>Es wurde sichergestellt, dass vorerstellte Themen bei der Überprüfung der Shard-Nummer zuerst geprüft werden<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>).</li>
<li>Ein fehlerhafter Deadlock-Bericht in Unit-Tests wurde behoben<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: April 21, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10 bietet eine verbesserte Such- und Ladeleistung, verbesserte Metrikberichte und erweiterte SVE-Unterstützung für eine beschleunigte Metrikberechnung. Diese Version enthält außerdem mehrere Fehlerkorrekturen, die die Stabilität und Korrektheit erhöhen. Wir möchten Sie ermutigen, ein Upgrade durchzuführen oder es auszuprobieren - Ihr Feedback ist von unschätzbarem Wert, um Milvus noch besser zu machen!</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Ignorieren der Meldung von Indexmetriken für nicht existierende Indizes<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>Scan-Modus für LIKE verwenden, auch wenn ein invertierter Index existiert<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>Optimierung der Leistung für LIKE-Ausdrücke<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)</li>
<li>Optimiere das Indexformat für verbesserte Ladeleistung<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful: Konfigurierbarkeit des Standard-Timeouts<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)</li>
<li>SVE-Unterstützung für L2-Metrik-Berechnung in FP16 / NY-Funktionen aktivieren<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Fix JSON Index funktioniert nicht für String-Filter<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>Dimensionsprüfung für Nicht-Vektorfelder in der Vorprüfung überspringen<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>Alter collection aktualisiert das Schema nun korrekt<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>Update der knowhere Version um macOS Build zu korrigieren<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>Verhindert Panik, wenn Indizes aufgelistet werden, bevor die Initialisierung des Segment-Index abgeschlossen ist<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>Behebt Leistungsregression durch Änderung eines Loglevels<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>Schließen des Clients vor dem Entfernen des Worker-Clients<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: April 11, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Wir freuen uns, Milvus 2.5.9 ankündigen zu können. Diese Version bietet eine verbesserte Leistung für JSON-Schlüsselstatistiken, erweiterte Indizierungsfunktionen und mehrere kritische Fehlerbehebungen, die die Stabilität und die Datenverarbeitung verbessern. Wir möchten Sie ermutigen, ein Upgrade durchzuführen oder diese Version auszuprobieren, und wie immer sind wir für Ihr Feedback dankbar, um Milvus weiter zu verbessern.</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Unterstützung des Überspringens der Punkte-Normalisierung für den gewichteten Re-Ranker<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>Verbesserung der Leistung bei der Erstellung von JSON-Schlüsselstatistiken durch Hinzufügen von Dokumenten in Batches<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>Verwendung von <code translate="no">int32</code> bei der Erstellung von Array-Indizes für <code translate="no">int8</code>/<code translate="no">int16</code> Elementtypen<a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>Anpassen der Brute-Force-Suchergebnisse an das Verhalten des JSON-Index für den Ausdruck <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Ein Problem behoben, das zu TraceID-Verwechslungen führte, wenn der Client eine TraceID sendete<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>Ein möglicher Absturz aufgrund einer falschen Verwendung von <code translate="no">noexcept</code> wurde behoben, was zu IO-Fehlern führte<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>Behebung einer normalen Endlosschleife, die nach der Aussetzung des Gleichgewichts ausgelöst wurde<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>Sammlungen anzeigen unterstützt nun Objekte, die benutzerdefinierten Berechtigungsgruppen gewährt werden<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>Fehler bei der Abfrage von Replikat-Kanalpositionen behoben<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>Potenzielles Thread-Leck behoben, das durch RESTful-Zeitüberschreitungen verursacht wurde<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>Ein klares Bitmap für den Batch-Sprungmodus wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>Es wurde ein Problem behoben, bei dem das Entfernen eines Index-Typs im lokalen Modus der entfernten Speicherung fehlschlug<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>Verwendung von <code translate="no">element_type</code> für Array <code translate="no">isNull</code> Operatoren<a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>Zurücksetzen von Metriken entfernt, um genaue Berichte zu gewährleisten<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>Ein Fehler wurde behoben, der verhinderte, dass <code translate="no">null</code> Daten durch <code translate="no">null</code> Ausdrücke gefiltert werden konnten<a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>Ignoriert wachsende Segmente ohne Startposition für Siegelrichtlinien<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>Das Aktualisieren von ursprünglichen Such-/Abfrageanfragen bei Wiederholungsversuchen wurde vermieden<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>Ein Segmentierungsfehler wurde behoben, wenn <code translate="no">LoadArrowReaderFromRemote</code> in einem Ausnahmepfad läuft<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>Probleme mit manuellem Ausgleich und Ausgleichsprüfung behoben<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>Validiertes Schema ist nicht <code translate="no">nil</code> für JSON-Statistiken mit Lazy <code translate="no">DescribeCollection</code> <a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>Fehler bei der Cursorbewegung beim Vergleich zweier Spalten behoben<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>Behobener Absturz beim Einfügen von sowohl <code translate="no">null</code> als auch non-null Arrays mit wachsender mmap open<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>Ein arm64 Kompilierungsproblem wurde behoben<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>Ein Bypass-Thread-Pool-Modus wurde hinzugefügt, um blockierende Einfüge-/Ladeoperationen durch wachsende Indizes zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>JSON-Formatfehler behoben<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>Ein 404-Fehler in der WebUI wurde behoben, wenn <code translate="no">http.enablepprof</code> falsch ist<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: April 1, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.5.8 ankündigen zu können, die Verbesserungen bei JSON-Ausdrücken, UTF-8-Validierung, Speichernutzung und Ausgleichslogik enthält. Diese Version enthält außerdem mehrere wichtige Fehlerkorrekturen zur Verbesserung der Gleichzeitigkeit und der Datenverarbeitung. Wir möchten Sie ermutigen, ein Upgrade durchzuführen oder es auszuprobieren, und wie immer hilft uns Ihr Feedback, Milvus kontinuierlich zu verbessern!</p>
<h3 id="Features" class="common-anchor-header">Merkmale</h3><ul>
<li>Unterstützung von JSON <code translate="no">null</code>/<code translate="no">exists</code> Ausdrücken<a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>Unterstützung für das Parsen von Sparse-Vektoren aus Parquet-Strukturen bei Bulk-Inserts<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Balanciert die Sammlung mit der größten Zeilenzahl zuerst<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>Unterstützt UTF-8 String-Validierung während des Imports<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>Hinzufügen von UTF-8 Validierung für alle VARCHAR Felder<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>Vermeiden Sie eine erneute Abfrage, wenn die hybride Suche nur den PK als Ausgabefeld anfordert<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>Verfeinerung von Array-Ansichten zur Optimierung der Speichernutzung<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>Hinzufügen einer Trigger-Intervall-Konfiguration für den automatischen Abgleich<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)</li>
<li>Konvertierung mehrerer OR-Ausdrücke in IN-Ausdrücke<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>Unterstützung detaillierter manueller Verdichtungskriterien<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>Behält rohe Token für Audit-Protokollierung bei<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>Optimierung der DataCoord-Meta-Mutex-Nutzung<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li>Einführung von Batch-Abonnements in <code translate="no">MsgDispatcher</code> <a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Es wurde ein Absturz behoben, der durch nullbare Eingabe und wachsende mmap-Datentypen verursacht wurde<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>Möglicher Datenverlust bei Löschoperationen durch doppelte binlog IDs behoben<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>Feldindex-Sperren für <code translate="no">GetSegmentsIndexStates</code> hinzugefügt, um eine mögliche Panik beim Einfügen während der Erstellung der Sammlung zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>Gleichzeitigkeitsprobleme bei der Rocksmq Verbraucherregistrierung behoben<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>Abrufen aller Child-Delta-Logs für das Laden von Segmenten<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>Falsche Ergebnisse behoben, die durch die Verwendung von JSON-Index verursacht wurden, wenn <code translate="no">iterative_filter</code> angegeben wurde<a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>Sicherstellung einer höheren Priorität für die <code translate="no">exists</code> Operation<a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>Korrigierte <code translate="no">WithGroupSize</code> beim Reduzieren<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>Erhöhte die Anzahl der Slots proportional zur Segmentgröße<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>Setzen der Task-Warteschlangenzeit vor dem Einreihen<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>Kanal-Ungleichgewicht auf DataNodes behoben<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>Korrekte Standard-Konfigurationen für Task-Slots gesetzt<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK: Setzen von nullable Flags gemäß FieldSchema für zeilenbasiertes Einfügen<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: März 21, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.5.7 ankündigen zu können. Das Highlight ist die neu eingeführte JSON Path Index-Funktion. Dies ermöglicht es Ihnen, invertierte Indizes auf dynamische oder JSON-Spalten zu erstellen, um die Abfrageleistung erheblich zu verbessern. Neben dieser neuen Funktionalität haben wir zahlreiche Verbesserungen und Fehlerbehebungen vorgenommen, um die Zuverlässigkeit zu erhöhen, die Fehlerbehandlung zu verfeinern und die Benutzerfreundlichkeit zu verbessern. Wir ermutigen Sie zum Upgrade oder zum Ausprobieren, und wie immer sind wir für Ihr Feedback sehr dankbar, um Milvus weiter zu verbessern!</p>
<h3 id="Features" class="common-anchor-header">Funktionen</h3><ul>
<li><strong>JSON-Pfad-Index</strong>: Um den Bedürfnissen der Benutzer nach dynamischen Schemata gerecht zu werden, führt Milvus 2.5.7 die Möglichkeit ein, Indizes für dynamische Spalten und JSON-Spalten zu erstellen. Mit dieser Funktion können Sie invertierte Indizes für bestimmte dynamische Spalten oder JSON-Pfade erstellen, wodurch der langsamere JSON-Ladeprozess effektiv umgangen und die Abfrageleistung erheblich verbessert wird. Weitere Informationen finden Sie unter <a href="/docs/de/use-json-fields.md">JSON-Feld</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Neuordnung von Unterausdrücken für konjunktionale Ausdrücke<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>Hinzufügen weiterer Konfigurationsoptionen für <code translate="no">interimindex</code> zur Unterstützung von verfeinerten Modi<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>Verwendung der korrekten Zählermetriken für WA-Gesamtberechnungen<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>Aktualisierbarkeit der Segment Prune Konfiguration<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>Hinzufügen einer Channel-Seal-Policy basierend auf der Blockierung von L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>Verfeinerung der Task-Metadaten mit Key-Level Locking<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>Entfernen von unnötigen Sammlungs- und Partitionsbezeichnungen aus Metriken<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>Verbessern von Import-Fehlermeldungen<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li>Vermeiden Sie die Konvertierung von Body-Byte-Slices in Strings in <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>Protokollierung der Startposition von Löschmeldungen<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>Unterstützung des Abrufs von Segment-Binlogs mit der neuen <code translate="no">GetSegmentsInfo</code> Schnittstelle<a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Verwendung von <code translate="no">newInsertDataWithFunctionOutputField</code> beim Importieren von Binlog-Dateien<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>Es wurde ein Problem behoben, bei dem mmap-Eigenschaften beim Erstellen einer Sammlung nicht angewendet wurden<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>Löscht die centroids-Datei nicht, wenn das Sampling fehlschlägt; stattdessen wird auf GC gewartet<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>Probleme mit Nachrichtenverlusten während der Suche behoben<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>Entfernte Verzögerungsziele nach dem Hauptdispatcher<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>Bitmap-Eingabe für jede Batch-Schleife wurde gelöscht<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>Schützte <code translate="no">GetSegmentIndexes</code> mit einem RLock<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>Vermeiden von Segmentierungsfehlern, die durch das Abrufen leerer Vektordatensätze verursacht wurden<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>Korrigierter JSON Index "nicht-gleich" Filter<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>Korrigiertes Null-Offset-Laden im invertierten Index<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>Korrigierte die Garbage Cleanup Logik von <code translate="no">jsonKey</code> stats und verbesserte den JSON key stats Filter<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>Ungültige JSON-Zeiger-Fehler wurden abgefangen<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>RBAC star privilege gibt jetzt leer zurück, wenn Richtlinien aufgelistet werden<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>Vermeidung von Panik, wenn ein Feld im Schema in QueryNode nicht existiert<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>Ein Problem mit Referenzsammlungen für Suche/Abfrage wurde behoben<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>Behandlung von leeren Zeilen für spärliche Vektoren<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>Überprüfung auf doppelte Typ/Index-Parameter bei der Erstellung von Sammlungen<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li><code translate="no">metaHeader</code> wurde auf den Client verschoben, um Datenrennen zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: März 10, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.5.6 ankündigen zu können, die wertvolle Verbesserungen für Toolchains, Logging, Metriken und Array-Handling sowie mehrere Bugfixes für verbesserte Zuverlässigkeit und Leistung enthält. Dieses Update beinhaltet eine verfeinerte Gleichzeitigkeitsbehandlung, robustere Verdichtungsaufgaben und andere wichtige Verbesserungen. Wir möchten Sie ermutigen, ein Upgrade durchzuführen oder es auszuprobieren, und wie immer freuen wir uns über Ihr Feedback, damit wir Milvus kontinuierlich verbessern können!</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Upgrade der Go-Toolchain auf 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Aktualisierung der Rust-Version auf 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Erhöhen der Etcd Version auf 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>Überprüfe nur den Elementtyp für nicht-null Arrays<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>Entfernen der Debug-Logs im Resource Group Handler (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>Verbessertes Logging für den gRPC Resolver<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>Hinzufügen weiterer Metriken für asynchrone CGO-Komponenten<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>Bereinigung des Shard Location Cache nach Freigabe einer Collection<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Array-Korruption behoben, die durch Ignorieren der Gültigkeit verursacht wurde<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>Es wurde ein Problem behoben, bei dem <code translate="no">null</code> Ausdrücke nicht für JSON-Felder funktionierten<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>Es wurde ein Problem behoben, das den falschen Offset speicherte, wenn Tantivy mit einem nullbaren Feld gebaut wurde<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>Die Ausführung von Statistiken für Null-Segmente wurde übersprungen<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>Korrigierte Schätzung der Speichergröße für Arrays<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>Übergabe eines Knapsack-Zeigers zur Vermeidung von Mehrfachkompaktierungen<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>Korrigierte ein Absturzproblem mit Bulk Insert<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>Verhinderte Lecks im Nachrichtenstrom durch korrektes Beenden des Haupt-Dispatchers<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>Korrigierte Gleichzeitigkeitsprobleme für <code translate="no">null</code> offsets<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>Korrigierte das Parsen von <code translate="no">import end ts</code> <a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>Verbesserte Fehlerbehandlung und Unit-Tests für die Funktion <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>Überprüfung auf doppelte Parameter für <code translate="no">CreateIndex</code> hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>Es wurde ein Problem behoben, das Verdichtungsaufgaben verhinderte, wenn die Größe die maximale Grenze überschritt<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>Duplizierter Verbrauch des Streams für unsichtbare Segmente behoben<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>Die CMake-Variable wurde geändert, um auf <code translate="no">knowhere-cuvs</code> zu wechseln<a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>Es wurde ein Problem behoben, bei dem das Löschen von DB-Eigenschaften über RESTful fehlschlug<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>Verwendet einen anderen Nachrichtentyp für die <code translate="no">OperatePrivilegeV2</code> API<a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>Ein Daten-Race im Task-Delta-Cache wurde behoben<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>Ein Leck im Aufgabendelta-Cache, verursacht durch doppelte Aufgaben-IDs, wurde behoben<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Februar 26, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 bringt erhebliche Verbesserungen bei der Anzahl der Sammlungen und Partitionen, die ein einzelner Cluster unterstützen kann. Es ist nun möglich, Milvus mit 10K Sammlungen und 100K Partitionen zu betreiben. In dieser Version wurden auch mehrere kritische Fehler behoben, darunter fehlende Match-Statistiken und ein Deadlock-Problem bei mehrstufigen Abfragen. Außerdem enthält sie zahlreiche Verbesserungen in Bezug auf Beobachtbarkeit und Sicherheit. Wir empfehlen allen Anwendern, die Milvus 2.5.x einsetzen, so bald wie möglich ein Upgrade durchzuführen.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Upgrade der Abhängigkeiten</h3><p>Aktualisiert auf ETCD 3.5.18, um mehrere CVEs zu beheben.</p>
<ul>
<li>[2.5] Raft auf cuvs aktualisiert<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] Aktualisierte Knowhere-Version<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Kritische Bugs</h3><ul>
<li>[2.5] <code translate="no">text_log</code> Präfix für textmatchindex Null-Offset-Datei verwendet<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] Sub-Task-Pool für mehrstufige Aufgaben hinzugefügt, um Deadlocks zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>[2.5] Deadlock im Aufgabenplaner behoben<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] Race Condition behoben, die dazu führte, dass mehrere identische Indizes erstellt wurden<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] Problem behoben, bei dem Sammlungen mit doppelten Namen erstellt werden konnten<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>Fehler bei der Suche nach einem Null-Ausdruck behoben<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] Fehler behoben, bei dem der Präfix-Abgleich fehlschlug, wenn Wildcards im Präfix enthalten waren<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>Abgebrochene Kaskade von Subkontexten, wenn HTTP-Anfrage ein Timeout hatte<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] Behobenes Task-Delta-Cache-Leck bei Reduce-Task<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] Korrigierte querycoord Panik in einem Eckfall<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] Verbesserte isbalanced Funktion, um Anführungszeichenpaare korrekt zu zählen<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] Negative -1 bei der Ausführung von Verdichtungsaufgaben behoben<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] Fehler behoben, bei dem ein Segment nie von sealed zu flushing übergehen konnte<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>Übersprungene Erstellung des Primärschlüssel-Index beim Laden des pk-Index<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] Übersprungene Textindex-Erstellung, wenn das Segment nach der Sortierung Null war<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] Fehler bei der Suche nach der frühesten Position behoben<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>Ignorierte wachsende Option, die bei der Hybridsuche verloren ging<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] Behoben: altercollection konnte die Konsistenzstufe nicht ändern<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>Behoben: Importfehler aufgrund von 0 Zeilen (<a href="https://github.com/milvus-io/milvus/pull/39904">#39904</a>)</li>
<li>[2.5] Falsches Modul-Ergebnis für langen Typ behoben<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] Lebenszeit-Kontext für Verdichtungs-Trigger hinzugefügt und verwendet<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] Überprüfte Sammlungsfreigabe vor Zielprüfungen<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Fehlverhalten von Rootcoord und begrenzte Ressourcen von CI behoben<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] Überprüfung der Größe von Ladefeldern und Schemaspalten entfernt<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Entfernt den mmap.enable-Parameter im type-Parameter beim Erstellen eines Index<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] Beim Löschen von Eigenschaften wurde der Indexname nicht übergeben<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] Segmente gaben sowohl wachsende als auch versiegelte Ergebnisse zurück<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] Problem mit gleichzeitigen Karten behoben<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] Konflikt beim QC-Aufgabentest behoben<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] Behoben, dass die Ladung der Sammlung hängen blieb, wenn Verdichtung oder GC auftrat<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] Ungleiche Verteilung behoben, die durch ein Delta-Cache-Leck bei der Ausführung von Aufgaben verursacht wurde<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] Frühzeitige Rückgabe beim Überspringen von load pk index<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] Root-Benutzer konnte alle Sammlungen auflisten, auch wenn <code translate="no">common.security.rootShouldBindRole</code> gesetzt war<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] Flowgraph-Leck behoben<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] Verwendete param item formatter, um setconfig Overlay zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] Metastore-Privilegname mit Privilegname "all" geprüft<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] Ratenbegrenzer für RESTful v1 hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] Hardcodierte Partitionsnummer im RESTful Handler entfernt<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><h4 id="Observability" class="common-anchor-header">Beobachtbarkeit</h4><ul>
<li>Monitor-Metrik zum Abrufen von Rohdaten hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] Metrik für die Latenzzeit von Get-Vektoren hinzugefügt und Fehlermeldung zum Anfragelimit verfeinert<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] Metrik für Proxy-Warteschlange hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>Mehr Metrik-Daten veröffentlicht<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] Metriken für Parse-Ausdruck hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] DSL-Log-Feld für hybridsearch hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] Überspringen der Aktualisierung von Index-Metriken, wenn der Index gelöscht wurde<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] pprof-Informationen wurden gelöscht, wenn der Komponentenstopp-Fortschritt abgelaufen war<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] Verwaltungs-API hinzugefügt, um den Abfragekoordinaten-Balance-Status zu prüfen<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Statistiken/Kompaktierung/Index-Task-Scheduler-Optimierung</h4><ul>
<li>Verfeinerte Index-Task-Scheduler-Richtlinie<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] Die Geschwindigkeit der Generierung von Statistik-Tasks wurde begrenzt<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>Konfigurationen für Verdichtungszeitplan hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] L0-Verdichtung nur mit dem gleichen Kanal geprüft, wenn angegeben<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] Die Speicherschätzung des Segmentladers für Zwischenindizes wurde angepasst<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] Verwendete Startpos ts für Siegelsegmente nach Lebenszeitrichtlinie<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>Entfernte Task-Meta, wenn der Task nicht mehr benötigt wurde<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] Beschleunigte Auflistung von Objekten während des Binlog-Imports<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>Unterstützt das Erstellen von Sammlungen mit Beschreibung<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] Exportiertes Zeitintervall für Indexanfragen in der Konfiguration<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] Der Standardwert für proxy.maxTaskNum wurde auf 1024 gesetzt<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>Verringertes Dump-Snapshot-Limit von 10w auf 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] Vermeiden des Kopierens von Strings in Slice-Bytes für Batch pk exists<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>Unterstützt die Rückgabe konfigurierbarer Eigenschaften bei der Beschreibung von Indizes<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>Optimierte Ausdrucksleistung für bestimmte Punkte<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] Optimiertes Ergebnisformat von getQueryNodeDistribution<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] Aktivierte Beobachtung der Schreibverstärkung<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] Rückgabe von Top-k Ergebnissen bei der Suche in RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] Syntaktischer Zucker withEnableMatch hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] Interimsindex unterstützt verschiedene Indextypen und mehr Datentypen (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] Synchronisierte GoSDK-Commits vom Master-Zweig<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>Konsistenz von Speicher und Meta des Broadcasters beibehalten<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>Broadcasting mit Ereignis-basierter Benachrichtigung<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] Verfeinerte Fehlermeldung für Schema- und Indexüberprüfung<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] Zurücksetzen des Standard-Auto-Index-Typs für Skalare<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] L0-Verdichtungsaufgabe erneut in die Warteschlange gestellt, wenn die Vorprüfung fehlschlug<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Januar 23, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.5.4 ankündigen zu können, die wichtige Leistungsoptimierungen und neue Funktionen wie PartitionKey-Isolierung, Sparse Index mit DAAT MaxScore und verbesserte Sperrmechanismen enthält. Ein herausragendes Highlight dieser Version ist die Unterstützung von 10.000 Collections und 1 Million Partitionen, was einen wichtigen Meilenstein für mandantenfähige Anwendungsfälle darstellt. In dieser Version wurden außerdem mehrere Fehler behoben, die die allgemeine Stabilität und Zuverlässigkeit verbessern, wobei zwei der kritischen Fehler zu Datenverlusten führen können. Wir ermutigen Sie, diese neueste Version zu aktualisieren oder auszuprobieren, und wir freuen uns auf Ihr Feedback, das uns hilft, Milvus kontinuierlich zu verbessern!</p>
<h3 id="Features" class="common-anchor-header">Merkmale</h3><ul>
<li>Unterstützt PartitionKey-Isolierung zur Verbesserung der Leistung bei mehreren Partitionsschlüsseln<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). Weitere Informationen finden Sie unter <a href="/docs/de/use-partition-key.md">Partitionsschlüssel verwenden</a>.</li>
<li>Sparse Index unterstützt jetzt DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. Weitere Informationen finden Sie unter <a href="/docs/de/sparse_vector.md">Sparse Vector</a>.</li>
<li>Unterstützung für <code translate="no">is_null</code> in Ausdrücken hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>Root-Rechte können angepasst werden<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Unterstützung von 10K Sammlungen und 1 Million Partitionen in einem Cluster<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>Zwischengespeicherte Segment-Delta-Informationen zur Beschleunigung des Query Coordinators<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>Gleichzeitiges Lesen von Metadaten auf der Sammlungsebene zur Beschleunigung der Fehlerbehebung<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>Verfeinerte Sperrgranularität in QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>Vereinheitlichung des Stils durch die Verwendung von CStatus zur Behandlung von NewCollection CGO-Aufrufen<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>Überspringen der Generierung des Partitionsbegrenzers, wenn keine Partition gesetzt ist<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>Mehr RESTful API Unterstützung hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>Unnötige Bloom-Filter in QueryNode und DataNode wurden entfernt, um die Speichernutzung zu reduzieren<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>Beschleunigung des Datenladens durch Beschleunigung der Aufgabenerstellung, -planung und -ausführung in QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>Reduzierte Sperrung in DataCoord, um Lade- und Einfügeoperationen zu beschleunigen<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>Hinzufügen von Primärfeldnamen in <code translate="no">SearchResult</code> und <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>Verwendet sowohl die Binlog-Größe als auch die Index-Größe als Standard für die Festplatten-Quoten-Drosselung<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>Optimierte Speichernutzung für die Volltextsuche knowhere/#1011</li>
<li>Versionskontrolle für skalare Indizes hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>Die Geschwindigkeit des Abrufs von Sammlungsinformationen aus RootCoord wurde verbessert, indem unnötige Kopien vermieden wurden<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Kritische Fehlerbehebungen</h3><ul>
<li>Suchfehler für Primärschlüssel mit Indizes behoben<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>Potenzieller Datenverlust durch gleichzeitigen Neustart von MixCoord und Flushing behoben<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>Löschfehler behoben, der durch unsachgemäße Gleichzeitigkeit zwischen Statistik-Tasks und L0-Verdichtung nach MixCoord-Neustarts ausgelöst wurde<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>Skalare invertierte Index-Inkompatibilität beim Upgrade von 2.4 auf 2.5 behoben<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Langsame Abfrageprobleme behoben, die durch grobe Sperrgranularität beim Laden von mehreren Spalten verursacht wurden<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>Es wurde ein Problem behoben, bei dem die Verwendung von Aliasen dazu führen konnte, dass ein Iterator die falsche Datenbank durchlief<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>Es wurde ein Fehler bei der Aktualisierung von Ressourcengruppen behoben, wenn die Datenbank geändert wurde<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>Es wurde ein sporadisches Problem behoben, bei dem der tantivy-Index Index-Dateien während der Freigabe nicht löschen konnte<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>Langsame Indexierung behoben, die durch zu viele Threads verursacht wurde<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>Es wurde ein Problem behoben, das verhinderte, dass Festplattenkontingentprüfungen während des Massenimports übersprungen wurden<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>Freeze-Probleme behoben, die durch zu viele Message-Queue-Konsumenten verursacht wurden, indem die Gleichzeitigkeit begrenzt wurde<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>Behobene Abfrage-Timeouts, die durch MixCoord-Neustarts während großflächiger Verdichtungen verursacht wurden<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>Probleme mit Channel-Ungleichgewicht, verursacht durch Knoten-Ausfallzeiten, wurden behoben<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>Es wurde ein Problem behoben, das dazu führen konnte, dass die Kanalbalance stecken blieb.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>Es wurde ein Problem behoben, bei dem RBAC-Privilegienprüfungen für benutzerdefinierte Gruppen unwirksam wurden<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>Es wurde ein Fehler beim Abrufen der Anzahl von Zeilen in leeren Indizes behoben<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>Falsche Speicherabschätzung für kleine Segmente behoben<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Januar 13, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 bietet kritische Fehlerbehebungen und Leistungsverbesserungen zur Verbesserung der allgemeinen Stabilität, Zuverlässigkeit und Benutzerfreundlichkeit. Diese Version verfeinert die Gleichzeitigkeitsbehandlung, verbessert die Indizierung und den Abruf von Daten und aktualisiert mehrere Schlüsselkomponenten, um die Benutzerfreundlichkeit zu erhöhen.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Es wurde ein Problem behoben, bei dem die Verwendung eines <code translate="no">IN</code> Filters auf einem <code translate="no">VARCHAR</code> Primärschlüssel leere Ergebnisse liefern konnte.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>Es wurde ein Gleichzeitigkeitsproblem zwischen Abfrage- und Löschoperationen behoben, das zu falschen Ergebnissen führen konnte.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>Es wurde ein Fehler behoben, der durch iteratives Filtern verursacht wurde, wenn ein <code translate="no">expr</code> in einer Abfrage leer war.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>Es wurde ein Problem behoben, bei dem ein Festplattenfehler während Konfigurations-Updates zur Verwendung von Standard-Konfigurationseinstellungen führte.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>Ein möglicher Verlust von gelöschten Daten aufgrund von Clustering-Kompaktierung wurde behoben.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>Eine fehlerhafte Textabgleichsabfrage in wachsenden Datensegmenten wurde behoben.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>Es wurden Abruffehler behoben, die dadurch verursacht wurden, dass der Index nicht die Originaldaten für spärliche Vektoren enthielt.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>Es wurde eine mögliche Spaltenfeld-Race-Bedingung behoben, die durch gleichzeitiges Abfragen und Laden von Daten verursacht wurde.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>Bulk-Insert-Fehler wurden behoben, wenn nullable oder default_value Felder nicht in den Daten enthalten waren.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Hinzufügen einer Ressourcengruppen-API für die RESTful-Schnittstelle.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>Optimierte Abrufleistung durch Nutzung von Bitset SIMD Methoden.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>Der MVCC-Zeitstempel wird nun als Garantiezeitstempel verwendet, wenn er angegeben ist.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>Fehlende Lösch-Metriken wurden hinzugefügt.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Etcd auf Version v3.5.16 aktualisiert.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>Neues Go-Paket zur Verwaltung von Protos erstellt.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Januar 3, 2025</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 unterstützt die Änderung der maximalen Länge für VARCHAR-Spalten und behebt mehrere kritische Probleme im Zusammenhang mit Gleichzeitigkeit, Partitionsabbrüchen und der Behandlung von BM25-Statistiken beim Import. Wir empfehlen dringend ein Upgrade auf diese Version, um die Stabilität und Leistung zu verbessern.</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Festplattennutzungsprotokolle werden nur noch erzeugt, wenn der angegebene Pfad nicht existiert.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>Es wurde ein Parameter zur Einstellung der maximalen VARCHAR-Länge hinzugefügt und das Limit auf 65.535 zurückgesetzt<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>).</li>
<li>Unterstützt die Konvertierung von Parametertypen für Ausdrücke.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Mögliche Deadlocks in Gleichzeitigkeitsszenarien wurden behoben.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>Die index_null_offset-Datei wurde nur für Felder erzeugt, die Nullwerte unterstützen.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>Die Verwendung des Abrufplans nach dem Freigeben in der Reduzierungsphase wurde korrigiert.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>Erkennung von Ausdrücken mit großgeschriebenem AND und OR.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>Erlaubt erfolgreiche Partitionsdrops, auch wenn das Laden fehlgeschlagen ist.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>Probleme bei der Registrierung von BM25-Statistikdateien während des Imports wurden behoben.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Dezember 26, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 konzentriert sich auf eine Reihe von Fehlerkorrekturen, die sich mit dem Laden von Speicher, RBAC-Listen, dem Ausgleich von Abfrageknoten und der versiegelten Segmentindizierung befassen und gleichzeitig die Web-UI und die Interceptoren verbessern. Wir empfehlen dringend, auf 2.5.1 zu aktualisieren, um die Stabilität und Zuverlässigkeit zu verbessern.</p>
<h3 id="Improvement" class="common-anchor-header">Verbesserung</h3><ul>
<li>Aktualisierung der Web-UI-Sammlungs- und Abfrageseiten.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Behebung von OOM-Problemen durch Hinzufügen eines Speicherfaktors zu Ladeschätzungen.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Die Erweiterung von Berechtigungsgruppen bei der Auflistung von Richtlinien in RootCoord wurde korrigiert.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Es wurden Probleme bei der Auflistung von Berechtigungsgruppen und Sammlungen behoben.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Der Balancer wurde korrigiert, um eine wiederholte Überlastung des gleichen Abfrageknotens zu vermeiden.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Unerwartete Ausgleichsaufgaben, die nach Neustarts von QueryCoord ausgelöst wurden, wurden behoben.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Es wurde behoben, dass Aktualisierungen der Ladekonfiguration nicht auf ladende Sammlungen angewendet wurden.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Null-Lesezähler beim Datenimport behoben.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Die Unicode-Dekodierung für JSON-Schlüssel in Ausdrücken wurde korrigiert.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Korrigierter Interceptor DB-Name für alterCollectionField in 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Korrigierte leere Index-Parameter für versiegelte Segmente bei der Verwendung von BM25 Brute-Force-Suche.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Dezember 23, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Node.js SDK-Version</th><th>Java SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 bringt bedeutende Fortschritte zur Verbesserung der Benutzerfreundlichkeit, Skalierbarkeit und Leistung für Benutzer, die mit Vektorsuche und umfangreicher Datenverwaltung zu tun haben. Mit dieser Version integriert Milvus leistungsstarke neue Funktionen wie die begriffsbasierte Suche, Clustering-Kompaktierung für optimierte Abfragen und vielseitige Unterstützung für spärliche und dichte Vektorsuchmethoden. Verbesserungen in den Bereichen Cluster-Management, Indizierung und Datenhandling sorgen für ein neues Maß an Flexibilität und Benutzerfreundlichkeit und machen Milvus zu einer noch robusteren und benutzerfreundlicheren Vektordatenbank.</p>
<h3 id="Key-Features" class="common-anchor-header">Wesentliche Merkmale</h3><h4 id="Full-Text-Search" class="common-anchor-header">Volltextsuche</h4><p>Milvus 2.5 unterstützt die mit Sparse-BM25 implementierte Volltextsuche! Diese Funktion ist eine wichtige Ergänzung zu den starken semantischen Suchfähigkeiten von Milvus, insbesondere in Szenarien, die seltene Wörter oder technische Begriffe beinhalten. In früheren Versionen unterstützte Milvus Sparse-Vektoren, um bei der Stichwortsuche zu helfen. Diese spärlichen Vektoren wurden außerhalb von Milvus durch neuronale Modelle wie SPLADEv2/BGE-M3 oder statistische Modelle wie den BM25-Algorithmus erzeugt.</p>
<p>Milvus 2.5 basiert auf <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> und verfügt über eingebaute Analysatoren und Sparse-Vektor-Extraktion, wodurch die API nicht mehr nur Vektoren als Eingabe erhält, sondern auch direkt Text akzeptiert. Die statistischen BM25-Informationen werden in Echtzeit aktualisiert, wenn Daten eingefügt werden, was die Benutzerfreundlichkeit und Genauigkeit erhöht. Darüber hinaus bieten spärliche Vektoren, die auf ANN-Algorithmen (Approximate Nearest Neighbour) basieren, eine bessere Leistung als Standard-Schlüsselwortsuchsysteme.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/analyzer-overview.md">Analyzer-Übersicht</a> und <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">Cluster Management WebUI (Beta)</h4><p>Um massive Daten und umfangreiche Funktionen besser zu unterstützen, umfasst das ausgeklügelte Design von Milvus verschiedene Abhängigkeiten, zahlreiche Knotenrollen, komplexe Datenstrukturen und mehr. Diese Aspekte können eine Herausforderung für die Nutzung und Wartung darstellen.</p>
<p>Milvus 2.5 führt eine integrierte Cluster Management WebUI ein, die die Schwierigkeiten bei der Systemwartung reduziert, indem sie die komplexen Informationen der Milvus-Laufzeitumgebung visualisiert. Dazu gehören Details zu Datenbanken und Sammlungen, Segmenten, Kanälen, Abhängigkeiten, Knotenstatus, Aufgabeninformationen, langsame Abfragen und vieles mehr.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Textabgleich</h4><p>Milvus 2.5 nutzt die Analyse- und Indizierungsfunktionen von <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> für die Textvorverarbeitung und den Aufbau von Indizes und unterstützt den präzisen Abgleich von Textdaten in natürlicher Sprache auf der Grundlage bestimmter Begriffe. Diese Funktion wird in erster Linie für die gefilterte Suche nach bestimmten Bedingungen verwendet und kann skalare Filterung zur Verfeinerung von Abfrageergebnissen einbeziehen, was eine Ähnlichkeitssuche innerhalb von Vektoren ermöglicht, die skalare Kriterien erfüllen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md">Analyzer Overview</a> und <a href="/docs/de/keyword-match.md">Text Match</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Bitmap-Index</h4><p>Ein neuer skalarer Datenindex wurde der Milvus-Familie hinzugefügt. Der BitMap-Index verwendet ein Array von Bits, dessen Länge der Anzahl der Zeilen entspricht, um die Existenz von Werten darzustellen und die Suche zu beschleunigen.</p>
<p>Bitmap-Indizes haben sich traditionell für Felder mit niedriger Kardinalität bewährt, die nur eine geringe Anzahl unterschiedlicher Werte aufweisen, z. B. eine Spalte mit Geschlechtsinformationen, die nur zwei mögliche Werte enthält: männlich und weiblich.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/bitmap.md">Bitmap-Index</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullbar &amp; Standardwert</h4><p>Milvus unterstützt jetzt das Festlegen von löschbaren Eigenschaften und Standardwerten für skalare Felder mit Ausnahme des Primärschlüsselfeldes. Bei skalaren Feldern, die als <code translate="no">nullable=True</code> markiert sind, können Benutzer das Feld beim Einfügen von Daten auslassen; das System behandelt es als Nullwert oder Standardwert (falls gesetzt), ohne einen Fehler zu verursachen.</p>
<p>Standardwerte und löschbare Eigenschaften bieten Milvus mehr Flexibilität. Benutzer können diese Funktion für Felder mit unsicheren Werten bei der Erstellung von Sammlungen nutzen. Es vereinfacht auch die Datenmigration von anderen Datenbanksystemen zu Milvus, indem es die Handhabung von Datensätzen mit Nullwerten unter Beibehaltung der ursprünglichen Standardwerteinstellungen ermöglicht.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">Faiss-basierte HNSW SQ/PQ/PRQ</h4><p>Durch die enge Zusammenarbeit mit der Faiss-Gemeinschaft konnte der HNSW-Algorithmus in Faiss sowohl in Bezug auf die Funktionalität als auch auf die Leistung erheblich verbessert werden. Aus Gründen der Stabilität und Wartungsfreundlichkeit hat Milvus 2.5 seine Unterstützung für HNSW offiziell von hnswlib nach Faiss verlagert.</p>
<p>Basierend auf Faiss unterstützt Milvus 2.5 mehrere Quantisierungsmethoden für HNSW, um den Anforderungen verschiedener Szenarien gerecht zu werden: SQ (Scalar Quantizer), PQ (Product Quantizer) und PRQ (Product Residual Quantizer). SQ und PQ sind häufiger anzutreffen; SQ bietet eine gute Abfrageleistung und Erstellungsgeschwindigkeit, während PQ bei gleichem Komprimierungsverhältnis eine bessere Wiedererkennung bietet. Viele Vektordatenbanken verwenden in der Regel eine binäre Quantisierung, die eine einfache Form der SQ-Quantisierung darstellt.</p>
<p>PRQ ist eine Verschmelzung von PQ und AQ (Additive Quantizer). Im Vergleich zu PQ sind längere Erstellungszeiten erforderlich, um einen besseren Recall zu erzielen, insbesondere bei hohen Komprimierungsraten, wie bei der binären Komprimierung.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Clustering-Verdichtung (Beta)</h4><p>Milvus 2.5 führt die Clustering Compaction ein, um die Suche zu beschleunigen und die Kosten in großen Sammlungen zu reduzieren. Durch die Angabe eines skalaren Feldes als Clustering-Schlüssel werden die Daten nach Bereichen umverteilt, um die Speicherung und den Abruf zu optimieren. Diese Funktion funktioniert wie ein globaler Index und ermöglicht es Milvus, Daten bei Abfragen auf der Grundlage von Clustering-Metadaten effizient zu beschneiden und die Suchleistung zu verbessern, wenn skalare Filter angewendet werden.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/clustering-compaction.md">Clustering Compaction</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Andere Funktionen</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Streaming-Knoten (Beta)</h4><p>Mit Milvus 2.5 wird eine neue Komponente namens Streaming Node eingeführt, die WAL-Dienste (Write-Ahead Logging) bereitstellt. Dadurch ist Milvus in der Lage, vor und nach dem Lesen und Schreiben von Kanälen einen Konsens zu erzielen, wodurch neue Merkmale, Funktionalitäten und Optimierungen möglich werden. Diese Funktion ist in Milvus 2.5 standardmäßig deaktiviert und wird in Version 3.0 offiziell verfügbar sein.</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6-Unterstützung</h4><p>Milvus unterstützt jetzt IPv6, was eine erweiterte Netzwerkkonnektivität und Kompatibilität ermöglicht.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV-Bulk-Import</h4><p>Zusätzlich zu den JSON- und Parquet-Formaten unterstützt Milvus jetzt auch den direkten Massenimport von Daten im CSV-Format.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Expression Templates zur Abfrage-Beschleunigung</h4><p>Milvus unterstützt jetzt Ausdrucksvorlagen, die die Effizienz des Ausdrucks-Parsing verbessern, insbesondere in Szenarien mit komplexen Ausdrücken.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/filtering-templating.md">Filtervorlagen</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">GroupBy-Verbesserungen</h4><ul>
<li><strong>Anpassbare Gruppengröße</strong>: Es wurde Unterstützung für die Angabe der Anzahl von Einträgen hinzugefügt, die für jede Gruppe zurückgegeben werden.</li>
<li><strong>Hybride GroupBy-Suche</strong>: Unterstützt die hybride GroupBy-Suche basierend auf mehreren Vektoren.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Iterator-Erweiterungen</h4><ul>
<li><strong>MVCC-Unterstützung</strong>: Dank der Multi-Version Concurrency Control (MVCC) können Benutzer jetzt Iteratoren verwenden, ohne von nachfolgenden Datenänderungen wie Einfügungen und Löschungen betroffen zu sein.</li>
<li><strong>Persistenter Cursor</strong>: Milvus unterstützt jetzt einen persistenten Cursor für QueryIterator, so dass Benutzer die Iteration nach einem Neustart von Milvus an der letzten Position wieder aufnehmen können, ohne den gesamten Iterationsprozess neu starten zu müssen.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Optimierung des Löschens</h4><p>Verbesserte Geschwindigkeit und verringerter Speicherverbrauch bei umfangreichen Löschvorgängen durch Optimierung der Sperrenverwendung und der Speicherverwaltung.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Upgrade der Abhängigkeiten</h4><p>Upgrade auf ETCD 3.5.16 und Pulsar 3.0.7 LTS, wobei bestehende CVEs behoben und die Sicherheit verbessert wurde. Hinweis: Das Upgrade auf Pulsar 3.x ist nicht mit früheren 2.x-Versionen kompatibel.</p>
<p>Benutzer, die bereits eine funktionierende Milvus-Installation haben, müssen die ETCD- und Pulsar-Komponenten aktualisieren, bevor sie die neuen Features und Funktionen nutzen können. Einzelheiten finden Sie unter <a href="/docs/de/upgrade-pulsar-v3.md">Upgrade von Pulsar von 2.x auf 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Lokale Speicherung V2</h4><p>In Milvus 2.5 wurde ein neues lokales Dateiformat eingeführt, das die Lade- und Abfrageeffizienz für skalare Daten verbessert, den Speicher-Overhead reduziert und die Grundlage für künftige Optimierungen schafft.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Optimierung des Ausdrucks-Parsing</h4><p>Verbessertes Parsen von Ausdrücken durch Implementierung von Caching für wiederholte Ausdrücke, Aktualisierung von ANTLR und Optimierung der Leistung von <code translate="no">NOT IN</code> Klauseln.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Verbesserte DDL-Gleichzeitigkeitsleistung</h4><p>Die Gleichzeitigkeitsleistung von Data Definition Language (DDL)-Operationen wurde optimiert.</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Angleichung der RESTful-API-Funktionen</h4><p>Angleichung der Funktionen der RESTful-API an andere SDKs zur Gewährleistung der Konsistenz.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Aktualisierungen für Sicherheit und Konfiguration</h4><p>Unterstützung von TLS zur Sicherung der Kommunikation zwischen Knoten in komplexeren oder Unternehmensumgebungen. Details finden Sie unter <a href="/docs/de/tls.md">Sicherheitskonfiguration</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Leistungsverbesserungen bei der Komprimierung</h4><p>Die maximale Segmentbegrenzung bei der gemischten Komprimierung wurde aufgehoben und kleinere Segmente werden nun zuerst priorisiert, wodurch die Effizienz verbessert und Abfragen bei großen oder fragmentierten Datensätzen beschleunigt werden.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Score-basierter Channel-Ausgleich</h4><p>Es wurde eine Richtlinie eingeführt, die die Lasten dynamisch über die Kanäle hinweg ausgleicht und so die Ressourcennutzung und die Gesamtstabilität in groß angelegten Implementierungen verbessert.</p>
