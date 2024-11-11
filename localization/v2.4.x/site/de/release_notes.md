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
    </button></h1><p>Finden Sie heraus, was es Neues in Milvus gibt! Auf dieser Seite werden neue Funktionen, Verbesserungen, bekannte Probleme und Fehlerbehebungen in jeder Version zusammengefasst. Sie können die Versionshinweise für jede Version nach v2.4.0 in diesem Abschnitt finden. Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um sich über Updates zu informieren.</p>
<h2 id="v2415" class="common-anchor-header">v2.4.15<button data-href="#v2415" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: November 5, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.15</td><td>2.4.9</td><td>2.4.8</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.15 war eine kritische Fehlerbehebungsversion, die sich auf die Verbesserung der Systemstabilität, Leistung und Kompatibilität konzentrierte. Mit dieser Version wurde ein größeres Deadlock-Problem behoben, das bei Abstürzen von QueryNode auftreten konnte, und es wurden Kompatibilitätsupdates für das Backup-Tool mit der Datenbankfunktion eingeführt. Darüber hinaus verbesserte Milvus 2.4.15 die Löschleistung und Stabilität durch erhebliche Optimierungen bei der L0-Behandlung. <strong>Ein Upgrade auf v2.4.15 wird dringend empfohlen</strong>, um von diesen kritischen Verbesserungen zu profitieren.</p>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Kritische Fehlerbehebungen</h3><ul>
<li>Ein Deadlock-Problem wurde behoben, wenn der QueryNode während der Initialisierung des Shard-Clients abstürzte<a href="https://github.com/milvus-io/milvus/pull/37354">(#37354</a>).</li>
<li>Die Verbesserung zur Unterstützung von Datenbanken für Bulk Insert wurde rückgängig gemacht<a href="https://github.com/milvus-io/milvus/pull/37421">(#37421</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Es wurde ein Fehler behoben, bei dem bestimmte Ausdrücke die Werte nicht korrekt parsen konnten<a href="https://github.com/milvus-io/milvus/pull/37342">(#37342</a>).</li>
<li>Der Proxy wurde verbessert, um bei entladenen Sammlungen erneut zu versuchen, den Shard-Leader zu erhalten<a href="https://github.com/milvus-io/milvus/pull/37326">(#37326</a>).</li>
<li>Es wurde ein Problem behoben, bei dem der Wert der L0-Zeilenzahl-Metrik immer leer war<a href="https://github.com/milvus-io/milvus/pull/37307">(#37307</a>).</li>
<li>Das Markieren des Verdichtungs-Timeouts für gemischte und L0 Verdichtungs-Szenarien wurde übersprungen<a href="https://github.com/milvus-io/milvus/pull/37194">(#37194</a>).</li>
<li>Die Einschließungslogik von OffsetOrderedArray wurde korrigiert<a href="https://github.com/milvus-io/milvus/pull/37309">(#37309</a>).</li>
<li>Überprüfung der Ressourcen beim Laden von Delta-Logs hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/37263">(#37263</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Die L0-Logik wurde außerhalb der Delta-Sperre verschoben, um die Leistung zu verbessern<a href="https://github.com/milvus-io/milvus/pull/37340">(#37340</a>).</li>
<li>Verdichtete wachsende Segmente werden freigegeben, wenn sie in der Abwurfliste vorhanden sind<a href="https://github.com/milvus-io/milvus/pull/37266">(#37266</a>).</li>
<li>Einführung einer Middleware zur Überwachung von RESTful V2 Input/Output RPC-Statistiken<a href="https://github.com/milvus-io/milvus/pull/37224">(#37224</a>, <a href="https://github.com/milvus-io/milvus/pull/37440">#37440</a>).</li>
</ul>
<h2 id="v2414" class="common-anchor-header">v2.4.14<button data-href="#v2414" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Oktober 31, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.14</td><td>2.4.9</td><td>2.4.7</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.14 behebt ein kritisches Problem aus Version 2.4.13, das dazu führen konnte, dass Sammlungsinformationen nach <code translate="no">snapshotKV</code> garbage collection verloren gingen. Es wurden auch einige Ressourcenlecks behoben. Darüber hinaus enthält diese Version zahlreiche Verbesserungen, die sich auf die Verbesserung der Stabilität bei umfangreichen Löschvorgängen und der Kompaktionsleistung konzentrieren.</p>
<h3 id="Features" class="common-anchor-header">Merkmale</h3><ul>
<li>Unterstützt Memory Mode Chunk Cache<a href="https://github.com/milvus-io/milvus/pull/35836">(#35836</a>)</li>
<li>Unterstützt db für bulkinsert<a href="https://github.com/milvus-io/milvus/pull/37017">(#37017</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Optimierung von Lösch-/Kompaktierungsvorgängen<ul>
<li>Ermöglicht parallele Ausführung von l0-Kompaktierungen<a href="https://github.com/milvus-io/milvus/pull/36985">(#36985</a>)</li>
<li>Gebündeltes Löschen in Vorwärtsrichtung bei direkter Vorwärtsrichtung<a href="https://github.com/milvus-io/milvus/pull/37107">(#37107</a>)</li>
<li>Überspringen des Ladens von Deltadaten im Delegater bei Verwendung von remoteload<a href="https://github.com/milvus-io/milvus/pull/37112">(#37112</a>)</li>
<li>Direktes Weiterleiten von Delta ohne l0-Segmente<a href="https://github.com/milvus-io/milvus/pull/36914">(#36914</a>)</li>
<li>Priorisierung von Verdichtungsaufgaben in DataCoord hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36979">(#36979</a>)</li>
<li>Verfolgung von komplexen Löschraten<a href="https://github.com/milvus-io/milvus/pull/36958">(#36958</a>)</li>
</ul></li>
<li>Refaktorierte CreateCollection in der RESTFul API<a href="https://github.com/milvus-io/milvus/pull/36885">(#36885</a>)</li>
<li>Verschmelzung mehrerer 'und' und 'oder' Operationen in eine einzige Operation<a href="https://github.com/milvus-io/milvus/pull/36973">(#36973</a>)</li>
<li>Skip Load funktioniert jetzt für alle Zweige<a href="https://github.com/milvus-io/milvus/pull/37161">(#37161</a>)</li>
<li>Die Minio-Abhängigkeit wurde aktualisiert, um EKS Pod Identitäten zu unterstützen<a href="https://github.com/milvus-io/milvus/pull/37089">(#37089</a>)</li>
<li>Aufgeräumte Import-Optionen<a href="https://github.com/milvus-io/milvus/pull/37078">(#37078</a>)</li>
<li>Begrenzung der maximalen Anzahl von Importaufträgen<a href="https://github.com/milvus-io/milvus/pull/36892">(#36892</a>)</li>
<li>Vorab zugewiesene Daten-Slice, um die Neuzuweisung von Speicher zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/37044">(#37044</a>)</li>
<li>Verhindert, dass DataNode die bf lädt<a href="https://github.com/milvus-io/milvus/pull/37027">(#37027</a>)</li>
<li>Vermeidet die wiederholte Begrenzung von ddl-Operationen<a href="https://github.com/milvus-io/milvus/pull/37011">(#37011</a>)</li>
<li>Das Konfigurations-Element <code translate="no">datanode.import.maxconcurrenttasknum</code> wurde dynamisch anpassbar gemacht<a href="https://github.com/milvus-io/milvus/pull/37103">(#37103</a>)</li>
<li>Verwendet <code translate="no">queryNode.mmap.growingMmapEnabled</code>, um das Verhalten des Zwischenindexes zu kontrollieren<a href="https://github.com/milvus-io/milvus/pull/36391">(#36391</a>)</li>
<li>Füllte die Felder <code translate="no">Level</code> und <code translate="no">StartPosition</code> in segmentLoadInfo von wachsenden Segmenten<a href="https://github.com/milvus-io/milvus/pull/36911">(#36911</a>)</li>
<li>Erzwingt das Anhalten von Puffer-Nachrichten beim Empfang der Drop-Collection-Nachricht<a href="https://github.com/milvus-io/milvus/pull/36917">(#36917</a>)</li>
<li>Metrik für Querynode-Löschpuffer-Info hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/37097">(#37097</a>)</li>
<li>Bezeichnung des Sammlungsnamens für einige Metriken hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/37159">(#37159</a>)</li>
<li>Verwendete Middleware zur Beobachtung von RESTful v2 in/out rpc stats<a href="https://github.com/milvus-io/milvus/pull/37224">(#37224</a>)</li>
<li>Geänderte GPU-Standard-Speicherpoolgröße<a href="https://github.com/milvus-io/milvus/pull/36969">(#36969</a>)</li>
<li>Knowhere Version auf 2.3.12 aktualisiert<a href="https://github.com/milvus-io/milvus/pull/37132">(#37132</a>)</li>
<li>Erlaubt das Löschen von Daten, wenn das Festplattenkontingent erschöpft ist<a href="https://github.com/milvus-io/milvus/pull/37139">(#37139</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Es wurde ein Fehler behoben, der nach einem Neustart nicht aus metakv wiederhergestellt werden konnte, wenn alle Snapshots gelöscht wurden<a href="https://github.com/milvus-io/milvus/pull/36950">(#36950</a>)</li>
<li>Der rpc-Fehlercode wurde korrigiert, um ungültige Wiederholungsversuche im Client zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/37025">(#37025</a>)</li>
<li>Ignorierte den Fehler "db nicht gefunden" im Quota Center<a href="https://github.com/milvus-io/milvus/pull/36850">(#36850</a>)</li>
<li>Korrigierte Goroutine-Leck in QueryNode durch Verwendung eines Singleton-Lösch-Pools<a href="https://github.com/milvus-io/milvus/pull/37225">(#37225</a>)</li>
<li>Behobenes Sammlungsleck in QueryNode<a href="https://github.com/milvus-io/milvus/pull/37079">(#37079</a>)</li>
<li>Korrigiertes Leck in der Clustering-Kompaktierungsaufgabe<a href="https://github.com/milvus-io/milvus/pull/36803">(#36803</a>)</li>
<li>Verbot das Umbenennen einer Sammlung, die einen Alias hatte<a href="https://github.com/milvus-io/milvus/pull/37208">(#37208</a>)</li>
<li>Sicherstellung, dass Alias zwischengespeichert wurde<a href="https://github.com/milvus-io/milvus/pull/36808">(#36808</a>)</li>
<li>Suche/Abfrage konnte während der Aktualisierung des Delegator-Caches fehlschlagen<a href="https://github.com/milvus-io/milvus/pull/37174">(#37174</a>)</li>
<li>Ausgeschlossene l0 Verdichtung, wenn Clustering ausgeführt wurde<a href="https://github.com/milvus-io/milvus/pull/37142">(#37142</a>)</li>
<li>Referenzierte Sammlungsmeta, wenn nur l0-Segmentmeta geladen wurde<a href="https://github.com/milvus-io/milvus/pull/37179">(#37179</a>)</li>
<li>Delegator konnte nach Querycoord-Neustart unbrauchbar werden<a href="https://github.com/milvus-io/milvus/pull/37100">(#37100</a>)</li>
<li>Dynamische Freigabe-Partition konnte Suche/Abfrage fehlschlagen lassen<a href="https://github.com/milvus-io/milvus/pull/37099">(#37099</a>)</li>
<li>Der Quotenwert für die Anzahl der Löschpufferzeilen wurde korrigiert<a href="https://github.com/milvus-io/milvus/pull/37068">(#37068</a>)</li>
<li>Volle Feldliste übergeben, wenn partielle Last aktiviert<a href="https://github.com/milvus-io/milvus/pull/37063">(#37063</a>)</li>
<li>Abfrageknoten-Panik trat beim Senden von rpc an Worker auf<a href="https://github.com/milvus-io/milvus/pull/36988">(#36988</a>)</li>
<li>Datacoord blieb beim Anhalten des Fortschritts stecken<a href="https://github.com/milvus-io/milvus/pull/36961">(#36961</a>)</li>
<li>Der Out-of-bounds-Zugriff im wachsenden Segment wurde behoben, wenn Rohdaten durch einen Zwischenindex ersetzt wurden<a href="https://github.com/milvus-io/milvus/pull/36938">(#36938</a>)</li>
<li>Rootcoord blieb beim Anhalten des Fortschritts stecken<a href="https://github.com/milvus-io/milvus/pull/36881">(#36881</a>)</li>
</ul>
<h2 id="v2413-hotfix" class="common-anchor-header">v2.4.13-Hotfix<button data-href="#v2413-hotfix" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Oktober 17, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.13-Hotfix</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus v2.4.13-hotfix behebt ein kritisches Problem in v2.4.13, bei dem Milvus nach einem Neustart möglicherweise keine Sammlungsinformationen abrufen kann, wenn alle MetaKV-Snapshots als Müll gesammelt wurden<a href="https://github.com/milvus-io/milvus/pull/36933">(#36933</a>). <strong>Benutzern, die derzeit v2.4.13 verwenden, wird empfohlen, so schnell wie möglich auf v2.4.13-Hotfix zu aktualisieren, um mögliche Störungen zu vermeiden</strong>.</p>
<h3 id="Critical-fixes" class="common-anchor-header">Kritische Korrekturen</h3><ul>
<li>Originalschlüssel laden, wenn Zeitstempel MaxTimestamp ist<a href="https://github.com/milvus-io/milvus/pull/36935">(#36935</a>)</li>
</ul>
<h2 id="Deprecated-v2413" class="common-anchor-header">[Veraltet] v2.4.13<button data-href="#Deprecated-v2413" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Oktober 12, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.13</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.13 führt die dynamische Replikabelastung ein, die es den Benutzern ermöglicht, die Anzahl der Sammlungsreplikate anzupassen, ohne die Sammlung freigeben und neu laden zu müssen. Diese Version behebt außerdem mehrere kritische Fehler im Zusammenhang mit dem Massenimport, dem Parsen von Ausdrücken, dem Lastausgleich und der Fehlerbehebung. Darüber hinaus wurden die MMAP-Ressourcennutzung und die Importleistung erheblich verbessert, wodurch die Effizienz des Systems insgesamt gesteigert wurde. Wir empfehlen dringend ein Upgrade auf diese Version, um die Leistung und Stabilität zu verbessern.</p>
<h3 id="Features" class="common-anchor-header">Funktionen</h3><ul>
<li>Dynamische Replika-Anpassung für geladene Sammlungen<a href="https://github.com/milvus-io/milvus/pull/36417">(#36417</a>)</li>
<li>Sparse-Vector-MMAP in wachsenden Segmenttypen<a href="https://github.com/milvus-io/milvus/pull/36565">(#36565</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Ein Problem mit der Flush-Leistung wurde behoben<a href="https://github.com/milvus-io/milvus/pull/36741">(#36741</a>)</li>
<li>Fehler mit JSON-Ausdrücken in &quot;[]&quot; behoben<a href="https://github.com/milvus-io/milvus/pull/36722">(#36722</a>)</li>
<li>Entfernte Nachbarn, wenn kompaktes Ziel unindiziert ist<a href="https://github.com/milvus-io/milvus/pull/36694">(#36694</a>)</li>
<li>Verbesserte Leistung für Rocksmq, wenn der Kanal voll ist<a href="https://github.com/milvus-io/milvus/pull/36618">(#36618</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Fehler während des Entpinnens nicht verzögert wurden<a href="https://github.com/milvus-io/milvus/pull/36665">(#36665</a>)</li>
<li>Ein Speicherleck für importierte Segmente im Segmentmanager wurde behoben<a href="https://github.com/milvus-io/milvus/pull/36631">(#36631</a>)</li>
<li>Unnötige Gesundheitsprüfungen für Abfrageknoten im Proxy wurden übersprungen<a href="https://github.com/milvus-io/milvus/pull/36553">(#36553</a>)</li>
<li>Ein Überlaufproblem mit Termausdrücken wurde behoben<a href="https://github.com/milvus-io/milvus/pull/36534">(#36534</a>)</li>
<li>Aufzeichnung der Knoten-ID vor der Zuweisung von Aufgaben, um Fehlzuweisungen von Aufgaben zu verhindern<a href="https://github.com/milvus-io/milvus/pull/36493">(#36493</a>)</li>
<li>Daten-Wettlauf-Probleme in der Clustering-Kompaktierung behoben<a href="https://github.com/milvus-io/milvus/pull/36499">(#36499</a>)</li>
<li>Überprüfung der maximalen Länge von String-Arrays nach dem Typabgleich hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36497">(#36497</a>)</li>
<li>Behebung von Race Conditions im Mix- oder Standalone-Modus<a href="https://github.com/milvus-io/milvus/pull/36459">(#36459</a>)</li>
<li>Segment-Ungleichgewicht nach wiederholten Lade- und Freigabeoperationen behoben<a href="https://github.com/milvus-io/milvus/pull/36543">(#36543</a>)</li>
<li>Korrigierte einen Eckfall, bei dem Segmente nicht von einem stoppenden Knoten verschoben werden konnten<a href="https://github.com/milvus-io/milvus/pull/36475">(#36475</a>)</li>
<li>Aktualisierte die Segmentinformationen korrekt, auch wenn einige Segmente fehlten<a href="https://github.com/milvus-io/milvus/pull/36729">(#36729</a>)</li>
<li>Verhindert, dass etcd-Transaktionen das maximale Limit im Snapshot KV überschreiten<a href="https://github.com/milvus-io/milvus/pull/36773">(#36773</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Verbesserte Schätzung der MMAP-Ressourcen:<ul>
<li>Verbesserter MMAP-bezogener Code in column.h<a href="https://github.com/milvus-io/milvus/pull/36521">(#36521</a>)</li>
<li>Verfeinerte Ressourcenabschätzung beim Laden von Collections<a href="https://github.com/milvus-io/milvus/pull/36728">(#36728</a>)</li>
</ul></li>
<li>Leistungsverbesserungen:<ul>
<li>Verbesserte Effizienz beim Parsen von Ausdrücken durch Konvertierung von Unicode nach ASCII<a href="https://github.com/milvus-io/milvus/pull/36676">(#36676</a>)</li>
<li>Ermöglicht parallele Produktion von Nachrichten für mehrere Themen<a href="https://github.com/milvus-io/milvus/pull/36462">(#36462</a>)</li>
<li>Reduzierter CPU-Overhead bei der Berechnung der Indexdateigröße<a href="https://github.com/milvus-io/milvus/pull/36580">(#36580</a>)</li>
<li>Abrufen des Nachrichtentyps aus dem Header, um Unmarshalling zu minimieren<a href="https://github.com/milvus-io/milvus/pull/36454">(#36454</a>)</li>
<li>Optimierte Workload-basierte Replika-Auswahlpolitik<a href="https://github.com/milvus-io/milvus/pull/36384">(#36384</a>)</li>
</ul></li>
<li>Aufteilung von Lösch-Task-Nachrichten, um die maximale Nachrichtengröße einzuhalten<a href="https://github.com/milvus-io/milvus/pull/36574">(#36574</a>)</li>
<li>Neue RESTful URL zur Beschreibung von Importaufträgen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36754">(#36754</a>)</li>
<li>Die Importplanung wurde optimiert und eine Zeitkosten-Metrik hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36684">(#36684</a>)</li>
<li>Balance Report Protokoll für Query Coordinator Balancer hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36749">(#36749</a>)</li>
<li>Umstellung auf die Verwendung einer gemeinsamen GC-Konfiguration<a href="https://github.com/milvus-io/milvus/pull/36670">(#36670</a>)</li>
<li>Streaming Forward Policy Schalter für Delegator hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36712">(#36712</a>)</li>
<li>Aktivierte manuelle Verdichtung für Sammlungen ohne Indizes<a href="https://github.com/milvus-io/milvus/pull/36581">(#36581</a>)</li>
<li>Aktivierte Lastverteilung auf Abfrageknoten mit unterschiedlichen Speicherkapazitäten<a href="https://github.com/milvus-io/milvus/pull/36625">(#36625</a>)</li>
<li>Vereinheitlichter Fall für eingehende Labels mit metrics.label<a href="https://github.com/milvus-io/milvus/pull/36616">(#36616</a>)</li>
<li>Übertragungskanal/Segment-Operationen wurden idempotent gemacht<a href="https://github.com/milvus-io/milvus/pull/36552">(#36552</a>)</li>
<li>Metriken zur Überwachung des Importdurchsatzes und der Anzahl importierter Zeilen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36588">(#36588</a>)</li>
<li>Verhinderte die Erstellung von mehreren Timer-Objekten in Zielen<a href="https://github.com/milvus-io/milvus/pull/36573">(#36573</a>)</li>
<li>Aktualisierte Ausdrucksversion und formatierte HTTP-Antwort für Ausdrücke<a href="https://github.com/milvus-io/milvus/pull/36467">(#36467</a>)</li>
<li>Verbesserte Garbage Collection in Snapshot KV<a href="https://github.com/milvus-io/milvus/pull/36793">(#36793</a>)</li>
<li>Unterstützung für die Ausführung von Methoden mit Kontextparametern hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36798">(#36798</a>)</li>
</ul>
<h2 id="v2412" class="common-anchor-header">v2.4.12<button data-href="#v2412" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: September 26, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.12</td><td>2.4.7</td><td>2.4.4</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.12 enthält wichtige Verbesserungen und kritische Fehlerbehebungen. Diese Version behebt Probleme mit der Datenduplizierung und verbessert die Geschwindigkeit der Fehlerbehebung, insbesondere bei der Verarbeitung einer großen Anzahl von Löschungen. Es gibt jedoch nach wie vor ein bekanntes Problem, bei dem die Fehlerbehebung beim Löschen großer Datenmengen langsam sein kann. Wir arbeiten aktiv an der Behebung dieses Problems.</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Graceful Stop für Flowgraph Manager implementiert<a href="https://github.com/milvus-io/milvus/pull/36358">(#36358</a>)</li>
<li>Deaktivierte Indexprüfungen für nicht geladene Vektorfelder<a href="https://github.com/milvus-io/milvus/pull/36280">(#36280</a>)</li>
<li>Ausfiltern von nicht getroffenen Löschdatensätzen während des Deltaladens<a href="https://github.com/milvus-io/milvus/pull/36272">(#36272</a>)</li>
<li>Verbesserte Fehlerbehandlung für std::stoi Ausnahmen<a href="https://github.com/milvus-io/milvus/pull/36296">(#36296</a>)</li>
<li>Unzulässige Schlüsselwörter als Feldnamen oder dynamische Feldnamen<a href="https://github.com/milvus-io/milvus/pull/36108">(#36108</a>)</li>
<li>Metriken für Löscheinträge in L0-Segmenten hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36227">(#36227</a>)</li>
<li>L0-Weiterleitungsrichtlinie implementiert, um Fernladen zu unterstützen<a href="https://github.com/milvus-io/milvus/pull/36208">(#36208</a>)</li>
<li>ANN-Feldladeprüfung im Proxy hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/36194">(#36194</a>)</li>
<li>Unterstützung für leere Sparse-Zeilen aktiviert<a href="https://github.com/milvus-io/milvus/pull/36061">(#36061</a>)</li>
<li>Eine Sicherheitslücke wurde behoben<a href="https://github.com/milvus-io/milvus/pull/36156">(#36156</a>)</li>
<li>Implementierte Statistik-Handler für Anfrage/Antwort Größenmetriken<a href="https://github.com/milvus-io/milvus/pull/36118">(#36118</a>)</li>
<li>Korrigierte Größenabschätzung für kodierte Array-Daten<a href="https://github.com/milvus-io/milvus/pull/36379">(#36379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Metrik-Typ-Fehler für Sammlungen mit zwei Vektorfeldern behoben<a href="https://github.com/milvus-io/milvus/pull/36473">(#36473</a>)</li>
<li>Probleme mit langen Puffern behoben, die zu Empfangsfehlern in der Nachrichtenwarteschlange führten<a href="https://github.com/milvus-io/milvus/pull/36425">(#36425</a>)</li>
<li>Implementierte korrekte 'Kompakt-zu-Segment'-Rückgabe nach Split-Unterstützung<a href="https://github.com/milvus-io/milvus/pull/36429">(#36429</a>)</li>
<li>Daten-Race-Probleme mit der Node ID Check Goroutine behoben<a href="https://github.com/milvus-io/milvus/pull/36377">(#36377</a>)</li>
<li>Entfernte Elementtyp-Prüfung<a href="https://github.com/milvus-io/milvus/pull/36324">(#36324</a>)</li>
<li>Probleme mit gleichzeitigem Zugriff für wachsende und versiegelte Segmente behoben<a href="https://github.com/milvus-io/milvus/pull/36288">(#36288</a>)</li>
<li>Implementierte zukünftige zustandsabhängige Sperre<a href="https://github.com/milvus-io/milvus/pull/36333">(#36333</a>)</li>
<li>Korrigierte Offset-Verwendung in HybridSearch<a href="https://github.com/milvus-io/milvus/pull/36287">(#36287</a>, <a href="https://github.com/milvus-io/milvus/pull/36253">#36253</a>)</li>
<li>Behebung von schmutzigen Segment/Kanal Lecks auf QueryNode<a href="https://github.com/milvus-io/milvus/pull/36259">(#36259</a>)</li>
<li>Korrigierte Behandlung von Primärschlüssel-Duplikationen<a href="https://github.com/milvus-io/milvus/pull/36274">(#36274</a>)</li>
<li>Erzwungene Metrik-Typ Einstellung in Suchanfragen<a href="https://github.com/milvus-io/milvus/pull/36279">(#36279</a>)</li>
<li>Korrigiertes Stored_index_files_size Metrik-Löschproblem<a href="https://github.com/milvus-io/milvus/pull/36161">(#36161</a>)</li>
<li>Korrigiertes Verhalten der Lese- und Schreibberechtigungsgruppe für globalen API-Zugriff<a href="https://github.com/milvus-io/milvus/pull/36145">(#36145</a>)</li>
</ul>
<h2 id="v2411" class="common-anchor-header">v2.4.11<button data-href="#v2411" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: September 11, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.11</td><td>2.4.6</td><td>2.4.3</td><td>2.4.8</td></tr>
</tbody>
</table>
<p>Milvus 2.4.11 ist eine Fehlerbehebungsversion, die mehrere kritische Probleme im Zusammenhang mit dem MARISA-Trie-Index, der Verdichtung und den Ladevorgängen behebt. Mit dieser Version werden neue Funktionen zur Anzeige von Ausdrücken und zur Verbesserung der Stabilität beim Löschen eingeführt. Wir empfehlen allen Nutzern der 2.4.x-Reihe, auf diese Version zu aktualisieren, um von diesen Verbesserungen und Fehlerbehebungen zu profitieren.</p>
<h3 id="Features" class="common-anchor-header">Funktionen</h3><ul>
<li>Statische Ansicht für Ausdrücke in 2.4 hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35954">(#35954</a>)</li>
<li>Quotenlogik für Löschpuffer implementiert<a href="https://github.com/milvus-io/milvus/pull/35997">(#35997</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Problem mit Trie-Indexbereich-Operationen für GreaterThan und GreaterThanEqual Vergleiche behoben<a href="https://github.com/milvus-io/milvus/pull/36126">(#36126</a>)</li>
<li>Korrigierte <code translate="no">marisa_label_order</code> Verwendung in der Trie Index Konstruktion<a href="https://github.com/milvus-io/milvus/pull/36060">(#36060</a>)</li>
<li>Verbesserte Wertüberprüfung für <code translate="no">trie.predictive_search</code> <a href="https://github.com/milvus-io/milvus/pull/35999">(#35999</a>)</li>
<li>Aktivierte Unterstützung für binäre arithmetische Ausdrücke bei invertiertem Index<a href="https://github.com/milvus-io/milvus/pull/36097">(#36097</a>)</li>
<li>Behobener Segment-Fehler, verursacht durch Skipindex<a href="https://github.com/milvus-io/milvus/pull/35908">(#35908</a>)</li>
<li>Speicherleck im Proxy-Meta-Cache behoben<a href="https://github.com/milvus-io/milvus/pull/36076">(#36076</a>)</li>
<li>Der mmap-Dateipfad wurde umbenannt, um Verzeichniskonflikte zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/35975">(#35975</a>)</li>
<li>Verbesserte Protokollierung und Bereinigung für fehlgeschlagene/zeitüberschrittene Tasks in der Mix-Compaction<a href="https://github.com/milvus-io/milvus/pull/35967">(#35967</a>)</li>
<li>Behebung eines logischen Deadlocks bei hohem Speicherverbrauch durch den Delegator<a href="https://github.com/milvus-io/milvus/pull/36066">(#36066</a>)</li>
<li>Leere Segmente werden nun erstellt, wenn die Verdichtung alle Einfügungen löscht<a href="https://github.com/milvus-io/milvus/pull/36045">(#36045</a>)</li>
<li>Korrigierte Ladefeld-Listen-Bevölkerung von alten Versionen der Ladeinformationen in 2.4<a href="https://github.com/milvus-io/milvus/pull/36018">(#36018</a>)</li>
<li>Korrigierte Verfolgungslogik der Konfigurationsaktualisierung in 2.4<a href="https://github.com/milvus-io/milvus/pull/35998">(#35998</a>)</li>
<li>Behebung von Fehlern bei Such- und Abfrageanfragen während der Freigabe dynamischer Partitionen<a href="https://github.com/milvus-io/milvus/pull/36019">(#36019</a>)</li>
<li>Verhinderte das Überschreiben von Fallback-Parametern<a href="https://github.com/milvus-io/milvus/pull/36006">(#36006</a>)</li>
<li>Sicherstellung der korrekten Registrierung von Berechtigungsgruppen für die Validierung<a href="https://github.com/milvus-io/milvus/pull/35938">(#35938</a>)</li>
<li>Verhinderte fehlerhaftes Aufräumen von db limiter Knoten<a href="https://github.com/milvus-io/milvus/pull/35992">(#35992</a>)</li>
<li>Problem mit Replikaten, die nach einer Fehlerbehebung nicht an Abfragen teilnehmen, wurde behoben<a href="https://github.com/milvus-io/milvus/pull/35925">(#35925</a>)</li>
<li>Behobenes Data Race im Clustering Compaction Writer<a href="https://github.com/milvus-io/milvus/pull/35958">(#35958</a>)</li>
<li>Korrigierte Variablenreferenz nach einer Verschiebeoperation<a href="https://github.com/milvus-io/milvus/pull/35904">(#35904</a>)</li>
<li>Implementierte Clustering Key Skip Load Verhaltensprüfung<a href="https://github.com/milvus-io/milvus/pull/35899">(#35899</a>)</li>
<li>Sicherstellung eines einzelnen Starts von Querycoord-Beobachtern in 2.4<a href="https://github.com/milvus-io/milvus/pull/35817">(#35817</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Aktualisierung von Milvus &amp; proto auf Version 2.4.11<a href="https://github.com/milvus-io/milvus/pull/36069">(#36069</a>)</li>
<li>Adressiert ein Speicherleck in Unit-Tests und aktiviert die use_asan Option für Unittest-Builds<a href="https://github.com/milvus-io/milvus/pull/35857">(#35857</a>)</li>
<li>Anpassung der l0segmentsrowcount-Grenzwerte auf angemessenere Werte<a href="https://github.com/milvus-io/milvus/pull/36015">(#36015</a>)</li>
<li>Änderung des deltalog Speicherschätzungsfaktors auf eins<a href="https://github.com/milvus-io/milvus/pull/36035">(#36035</a>)</li>
<li>Implementierte Slicesetequal für Ladefeldlistenvergleiche<a href="https://github.com/milvus-io/milvus/pull/36062">(#36062</a>)</li>
<li>Reduzierte Log-Häufigkeit für Löschoperationen<a href="https://github.com/milvus-io/milvus/pull/35981">(#35981</a>)</li>
<li>Upgraded etcd Version auf 3.5.14<a href="https://github.com/milvus-io/milvus/pull/35977">(#35977</a>)</li>
<li>Optimierte mmap-rss Reduzierung nach dem Aufwärmen<a href="https://github.com/milvus-io/milvus/pull/35965">(#35965</a>)</li>
<li>Abkühlungsperiode im Ratenbegrenzer für Leseanfragen wurde entfernt<a href="https://github.com/milvus-io/milvus/pull/35936">(#35936</a>)</li>
<li>Verbesserte Überprüfung von Ladefeldern für zuvor geladene Sammlungen<a href="https://github.com/milvus-io/milvus/pull/35910">(#35910</a>)</li>
<li>Unterstützung für das Löschen von Rollen im Zusammenhang mit Berechtigungslisten in 2.4 hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35863">(#35863</a>)</li>
<li>Implementierung von depguard-Regeln, um die Verwendung veralteter Proto-Bibliotheken zu verbieten<a href="https://github.com/milvus-io/milvus/pull/35818">(#35818</a>)</li>
</ul>
<h3 id="Others" class="common-anchor-header">Andere</h3><ul>
<li>Aktualisierte Knowhere Version<a href="https://github.com/milvus-io/milvus/pull/36067">(#36067</a>)</li>
</ul>
<h2 id="v2410" class="common-anchor-header">v2.4.10<button data-href="#v2410" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: August 30, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.10</td><td>2.4.6</td><td>2.4.3</td><td>2.4.6</td></tr>
</tbody>
</table>
<p>Milvus 2.4.10 bietet erhebliche Verbesserungen in Bezug auf Funktionalität und Stabilität. Zu den wichtigsten Funktionen gehören die Unterstützung von Upsert-Operationen bei AutoID-aktivierten Sammlungen, die Möglichkeit, Sammlungen teilweise zu laden, und verschiedene Memory-Mapped-Konfigurationen (MMAP) zur Optimierung der Speichernutzung. In dieser Version wurden außerdem mehrere Fehler behoben, die zu Panics, Core Dumps und Ressourcenlecks führten. Wir empfehlen ein Upgrade, um alle Vorteile dieser Verbesserungen zu nutzen.</p>
<h3 id="Features" class="common-anchor-header">Funktionen</h3><ul>
<li><strong>Upsert mit automatischer ID</strong>: Unterstützung für Upsert-Operationen mit automatischer ID-Generierung<a href="https://github.com/milvus-io/milvus/pull/34633">(#34633</a>)</li>
<li><strong>Feldpartielles Laden von Sammlungen</strong> [Beta-Vorschau]: Ermöglicht das Laden bestimmter Felder einer Sammlung<a href="https://github.com/milvus-io/milvus/pull/35696">(#35696</a>)</li>
<li><strong>RBAC-Verbesserungen</strong>:<ul>
<li>RBAC Nachrichtenunterstützung für Change Data Capture (CDC) hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35562">(#35562</a>)</li>
<li>Einführung von readonly/readwrite/admin privilege Gruppen zur Vereinfachung des RBAC grant Prozesses<a href="https://github.com/milvus-io/milvus/pull/35543">(#35543</a>)</li>
<li>Neue API für das Sichern und Wiederherstellen von RBAC-Konfigurationen<a href="https://github.com/milvus-io/milvus/pull/35513">(#35513</a>)</li>
<li>Aktualisieren des Proxy-Caches nach der Wiederherstellung von RBAC-Metadaten<a href="https://github.com/milvus-io/milvus/pull/35636">(#35636</a>)</li>
</ul></li>
<li><strong>Verbesserte MMAP-Konfiguration</strong>: Mehr allgemeine Konfigurationsoptionen zur Steuerung des MMAP-Verhaltens<a href="https://github.com/milvus-io/milvus/pull/35609">(#35609</a>)</li>
<li><strong>Datenbank-Zugriffsbeschränkungen</strong>: Neue Eigenschaften zur Einschränkung des Lesezugriffs auf Datenbanken<a href="https://github.com/milvus-io/milvus/pull/35754">(#35754</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Arrow Go Client gibt keinen Fehler mehr zurück<a href="https://github.com/milvus-io/milvus/pull/35820">(#35820</a>)</li>
<li>Korrigierte ungenaue Ratenbegrenzung<a href="https://github.com/milvus-io/milvus/pull/35700">(#35700</a>)</li>
<li>Proxy-Panik nach importbezogenen API-Fehlern behoben<a href="https://github.com/milvus-io/milvus/pull/35559">(#35559</a>)</li>
<li>Mögliche fehlerhafte Löschungen während GC Channel Checkpoints behoben<a href="https://github.com/milvus-io/milvus/pull/35708">(#35708</a>)</li>
<li>Behoben wurde eine Panik aufgrund von leeren Kandidaten-Importsegmenten<a href="https://github.com/milvus-io/milvus/pull/35674">(#35674</a>)</li>
<li>Korrigierte mmap Speicherfreigabe<a href="https://github.com/milvus-io/milvus/pull/35726">(#35726</a>)</li>
<li>Sicherstellung der korrekten Channel-Überwachung bei Upgrades von 2.2 auf 2.4<a href="https://github.com/milvus-io/milvus/pull/35695">(#35695</a>)</li>
<li>Reparierte DataNode unüberwachte Channel Release Funktion<a href="https://github.com/milvus-io/milvus/pull/35657">(#35657</a>)</li>
<li>Korrigierte Partitionsanzahl in RootCoord Metadaten<a href="https://github.com/milvus-io/milvus/pull/35601">(#35601</a>)</li>
<li>Probleme mit dynamischen Konfigurations-Updates für bestimmte Parameter behoben<a href="https://github.com/milvus-io/milvus/pull/35637">(#35637</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><h4 id="Performance" class="common-anchor-header">Leistung</h4><ul>
<li>Optimierte Abfrage von dynamischen Feldern<a href="https://github.com/milvus-io/milvus/pull/35602">(#35602</a>)</li>
<li>Verbesserte Bitset-Leistung für AVX512<a href="https://github.com/milvus-io/milvus/pull/35480">(#35480</a>)</li>
<li>Neueinlesen des Wertes nach <code translate="no">once</code> Initialisierung für bessere Effizienz<a href="https://github.com/milvus-io/milvus/pull/35643">(#35643</a>)</li>
</ul>
<h4 id="Rolling-upgrade-improvements" class="common-anchor-header">Verbesserungen beim Rolling Upgrade</h4><ul>
<li>Markierung von Abfrageknoten als schreibgeschützt nach dem Aussetzen<a href="https://github.com/milvus-io/milvus/pull/35586">(#35586</a>)</li>
<li>Verhinderte die Koexistenz des alten Koordinators mit dem neuen Knoten/Proxy<a href="https://github.com/milvus-io/milvus/pull/35760">(#35760</a>)</li>
</ul>
<h4 id="Others" class="common-anchor-header">Andere</h4><ul>
<li>Optimierter Prozess zur Erstellung des Milvus-Kerns<a href="https://github.com/milvus-io/milvus/pull/35660">(#35660</a>)</li>
<li>Aktualisiert auf protobuf-go v2<a href="https://github.com/milvus-io/milvus/pull/35555">(#35555</a>)</li>
<li>Verbessertes Tracing mit Hex-String-Kodierung für traceid und spanid<a href="https://github.com/milvus-io/milvus/pull/35568">(#35568</a>)</li>
<li>Treffer-Segmentnummer-Metrik für Query Hook hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35619">(#35619</a>)</li>
<li>Verbesserte Kompatibilität mit dem alten SDK für die configure load param Funktion<a href="https://github.com/milvus-io/milvus/pull/35573">(#35573</a>)</li>
<li>Unterstützung für HTTP v1/v2 Drosselung hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35504">(#35504</a>)</li>
<li>Reparierte Index-Speicher-Schätzung<a href="https://github.com/milvus-io/milvus/pull/35670">(#35670</a>)</li>
<li>Möglichkeit, mehrere Segmente in den Mix Compactor zu schreiben, um die Erzeugung großer Segmente zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/35648">(#35648</a>)</li>
</ul>
<h2 id="v249" class="common-anchor-header">v2.4.9<button data-href="#v249" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: August 20, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.9</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.9 behebt ein kritisches Problem, das in einigen Fällen Ergebnisse unterhalb des Limits (topk) liefern konnte, und enthält mehrere wichtige Verbesserungen, um die Leistung und Benutzerfreundlichkeit der Plattform zu verbessern.</p>
<h3 id="Critical-fixes" class="common-anchor-header">Kritische Fehlerbehebungen</h3><ul>
<li>Das l0-Segment wurde aus dem lesbaren Snapshot ausgeschlossen<a href="https://github.com/milvus-io/milvus/pull/35510">(#35510</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Duplizierte Schema-Helper-Erstellung im Proxy wurde entfernt<a href="https://github.com/milvus-io/milvus/pull/35502">(#35502</a>).</li>
<li>Unterstützung für die Kompilierung von Milvus auf Ubuntu 20.04 hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35457">(#35457</a>).</li>
<li>Optimierte Verwendung von Sperren und Vermeidung von Double Flush Clustering Buffer Writer<a href="https://github.com/milvus-io/milvus/pull/35490">(#35490</a>).</li>
<li>Das ungültige Protokoll wurde entfernt<a href="https://github.com/milvus-io/milvus/pull/35473">(#35473</a>).</li>
<li>Ein Benutzerhandbuch für die Clustering-Verdichtung wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35428">(#35428</a>).</li>
<li>Unterstützung für dynamische Felder im Schemahelfer<a href="https://github.com/milvus-io/milvus/pull/35469">(#35469</a>).</li>
<li>Der Abschnitt msgchannel wurde in der generierten YAML hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/35466">(#35466</a>).</li>
</ul>
<h2 id="v248" class="common-anchor-header">v2.4.8<button data-href="#v248" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: August 14, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.8</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Mit Milvus 2.4.8 wurden mehrere bedeutende Verbesserungen der Leistung und Stabilität des Systems eingeführt. Das bemerkenswerteste Merkmal war die Implementierung der Clusterverdichtung, ein Mechanismus, der die Such- und Abfrageeffizienz erhöht, indem er Daten in großen Sammlungen auf der Grundlage eines festgelegten Clustering-Schlüssels umverteilt und so die Menge der gescannten Daten reduziert. Die Verdichtung wurde auch vom Shard DataNode entkoppelt, so dass jeder DataNode die Verdichtung unabhängig durchführen kann, was die Fehlertoleranz, Stabilität, Leistung und Skalierbarkeit verbessert. Darüber hinaus wurde die Schnittstelle zwischen den Go- und C++-Komponenten überarbeitet, um asynchrone CGO-Aufrufe zu verwenden und Probleme wie Session-Timeouts zu beheben. Die Abhängigkeiten der Anwendung wurden ebenfalls aktualisiert, um bekannte Sicherheitslücken zu schließen. Darüber hinaus enthält diese Version auch zahlreiche Leistungsoptimierungen und kritische Bugfixes.</p>
<h3 id="Features" class="common-anchor-header">Funktionen</h3><ul>
<li>Es wurde eine Clustering-Kompaktierung implementiert, die es ermöglicht, Daten auf der Grundlage eines bestimmten Clustering-Schlüssels neu zu verteilen, um die Abfrageeffizienz zu verbessern<a href="https://github.com/milvus-io/milvus/pull/34326">(#34326</a>),<a href="https://github.com/milvus-io/milvus/pull/34363">(#34363</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Implementierung von asynchronen Such- und Abruffunktionen in CGO.<a href="https://github.com/milvus-io/milvus/pull/34200">(#34200</a>)</li>
<li>Der Verdichtungsprozess wurde vom Shard DataNode getrennt, um die Modularität des Systems zu verbessern.<a href="https://github.com/milvus-io/milvus/pull/34157">(#34157</a>)</li>
<li>Unterstützung für Client-Pooling in QueryNode innerhalb des Proxy/Delegator hinzugefügt, um die Leistung zu verbessern.<a href="https://github.com/milvus-io/milvus/pull/35195">(#35195</a>)</li>
<li>Sonic wurde integriert, um den CPU-Overhead während des JSON-Marshaling und -Marshaling in Gin und RestfulV1 Handlern zu minimieren.<a href="https://github.com/milvus-io/milvus/pull/35018">(#35018</a>)</li>
<li>Es wurde ein In-Memory-Cache eingeführt, um den Abruf von Authentifizierungsergebnissen zu optimieren.<a href="https://github.com/milvus-io/milvus/pull/35272">(#35272</a>)</li>
<li>Der Standard-Metrik-Typ für Autoindex wurde geändert.<a href="https://github.com/milvus-io/milvus/pull/34277">[#34277</a>, <a href="https://github.com/milvus-io/milvus/pull/34479">#34479</a>]</li>
<li>Das Laufzeit-Speicherformat für variable Spalten wurde überarbeitet, was zu einer geringeren Speichernutzung führt.<a href="https://github.com/milvus-io/milvus/pull/34367">[#34367</a>, <a href="https://github.com/milvus-io/milvus/pull/35012">#35012</a>, <a href="https://github.com/milvus-io/milvus/pull/35041">#35041</a>]</li>
<li>Die Verdichtungsprozesse wurden überarbeitet, um eine dauerhafte Datenspeicherung zu ermöglichen.<a href="https://github.com/milvus-io/milvus/pull/34268">(#34268</a>)</li>
<li>Unterstützung von Memory-Mapped-Dateien für wachsende Segmente wurde aktiviert, was die Speicherverwaltung verbessert.<a href="https://github.com/milvus-io/milvus/pull/34110">(#34110</a>)</li>
<li>Verbesserte Zugriffsprotokolle durch Hinzufügen von RESTful API-Unterstützung, Protokollierung von Konsistenzstufen und Unterscheidung zwischen System- und Benutzerfehlern.<a href="https://github.com/milvus-io/milvus/pull/34295">[#34295</a>, <a href="https://github.com/milvus-io/milvus/pull/34352">#34352</a>, <a href="https://github.com/milvus-io/milvus/pull/34396">#34396</a>]</li>
<li>Der neue Parameter <code translate="no">range_search_k</code> in Knowhere wurde verwendet, um die Bereichssuche zu beschleunigen.<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>Anwendung von blockierten Bloom-Filtern, um die Geschwindigkeit der Filterkonstruktion und Abfrage zu erhöhen.<a href="https://github.com/milvus-io/milvus/pull/34377">[#34377</a>, <a href="https://github.com/milvus-io/milvus/pull/34922">#34922</a>]</li>
<li>Verbesserungen bei der Speichernutzung:<ul>
<li>Vorab zugewiesener Platz für DataNode-Einfügepuffer.<a href="https://github.com/milvus-io/milvus/pull/34205">(#34205</a>)</li>
<li>Vorab zugewiesene <code translate="no">FieldData</code> für Reduce-Operationen.<a href="https://github.com/milvus-io/milvus/pull/34254">(#34254</a>)</li>
<li>Freigegebene Datensätze im Delete Codec, um Speicherlecks zu verhindern.<a href="https://github.com/milvus-io/milvus/pull/34506">(#34506</a>)</li>
<li>Kontrollierte Gleichzeitigkeitsstufe des Disk File Managers während des Ladens von Dateien.<a href="https://github.com/milvus-io/milvus/pull/35282">(#35282</a>)</li>
<li>Optimierte Go-Laufzeit-Garbage-Collection-Logik für rechtzeitige Speicherfreigabe.<a href="https://github.com/milvus-io/milvus/pull/34950">(#34950</a>)</li>
<li>Es wurde eine neue Versiegelungsrichtlinie für wachsende Segmente implementiert.<a href="https://github.com/milvus-io/milvus/pull/34779">(#34779</a>)</li>
</ul></li>
<li>DataCoord-Verbesserungen:<ul>
<li>Reduzierte CPU-Auslastung.<a href="https://github.com/milvus-io/milvus/pull/34231">[#34231</a>, <a href="https://github.com/milvus-io/milvus/pull/34309">#34309</a>]</li>
<li>Schnellere Logik für das Beenden der Garbage Collection wurde implementiert.<a href="https://github.com/milvus-io/milvus/pull/35051">(#35051</a>)</li>
<li>Verbesserte Algorithmen zur Planung der Arbeitsknoten.<a href="https://github.com/milvus-io/milvus/pull/34382">(#34382</a>)</li>
<li>Verbesserter Algorithmus zur Kontrolle der Segmentgröße speziell für Importoperationen.<a href="https://github.com/milvus-io/milvus/pull/35149">(#35149</a>)</li>
</ul></li>
<li>Verbesserungen des Lastausgleichs-Algorithmus:<ul>
<li>Verringerung des Speicherüberlastungsfaktors auf dem Delegator.<a href="https://github.com/milvus-io/milvus/pull/35164">(#35164</a>)</li>
<li>Zuweisung einer festen Speichergröße für den Delegator.<a href="https://github.com/milvus-io/milvus/pull/34600">(#34600</a>)</li>
<li>Die übermäßige Zuweisung von Segmenten und Kanälen für neue Abfrageknoten wurde vermieden.<a href="https://github.com/milvus-io/milvus/pull/34245">(#34245</a>)</li>
<li>Die Anzahl der Aufgaben pro Planungszyklus durch den Abfragekoordinator wurde reduziert, während die Planungshäufigkeit erhöht wurde.<a href="https://github.com/milvus-io/milvus/pull/34987">(#34987</a>)</li>
<li>Verbesserter Algorithmus zum Kanalausgleich auf dem DataNode<a href="https://github.com/milvus-io/milvus/pull/35033">(#35033</a>)</li>
</ul></li>
<li>Erweiterte Systemmetriken: Es wurden neue Metriken für verschiedene Komponenten hinzugefügt, um bestimmte Aspekte zu überwachen, darunter:<ul>
<li>Force-deny-writing-Status.<a href="https://github.com/milvus-io/milvus/pull/34989">(#34989</a>)</li>
<li>Warteschlangen-Latenz.<a href="https://github.com/milvus-io/milvus/pull/34788">(#34788</a>)</li>
<li>Festplatten-Quota.<a href="https://github.com/milvus-io/milvus/pull/35306">(#35306</a>)</li>
<li>Task-Ausführungszeit.<a href="https://github.com/milvus-io/milvus/pull/35141">(#35141</a>)</li>
<li>Binlog-Größe.<a href="https://github.com/milvus-io/milvus/pull/35235">(#35235</a>)</li>
<li>Einfügerate.<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>Speicher-Hochwasserstand.<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>RESTful API Metriken.<a href="https://github.com/milvus-io/milvus/pull/35083">(#35083</a>)</li>
<li>Such-Latenzzeit.<a href="https://github.com/milvus-io/milvus/pull/34783">(#34783</a>)</li>
</ul></li>
</ul>
<h3 id="Changes" class="common-anchor-header">Änderungen</h3><ul>
<li><p>Für Open-Source-Benutzer ändert diese Version die Metrik-Typen in AutoIndex für <code translate="no">FloatVector</code> und <code translate="no">BinaryVector</code> in <code translate="no">Cosine</code> bzw. <code translate="no">Hamming</code>.</p></li>
<li><p><strong>Korrigierte Versionen von Drittanbieter-Abhängigkeiten</strong>:</p>
<ul>
<li>Mit dieser Version werden feste Versionen für bestimmte Bibliotheken von Drittanbietern eingeführt, was das Software Supply Chain Management von Milvus erheblich verbessert.</li>
<li>Durch die Isolierung des Projekts von Upstream-Änderungen werden die täglichen Builds vor möglichen Unterbrechungen geschützt.</li>
<li>Das Update gewährleistet Stabilität, indem es ausschließlich validierte C++-Pakete von Drittanbietern auf der JFrog Cloud hostet und Conan Recipe Revisions (RREV) verwendet.</li>
<li>Dieser Ansatz mindert das Risiko, dass Änderungen durch Updates im ConanCenter unterbrochen werden.</li>
<li>Entwickler, die Ubuntu 22.04 verwenden, werden sofort von diesen Änderungen profitieren. Entwickler auf anderen Betriebssystemen müssen jedoch möglicherweise ihre <code translate="no">glibc</code> Version aktualisieren, um Kompatibilitätsprobleme zu vermeiden.</li>
</ul></li>
</ul>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Kritische Fehlerbehebungen</h3><ul>
<li>Es wurde ein Problem behoben, bei dem Löschdaten verloren gingen, weil Segmente während der L0-Kompaktierung ausgelassen wurden.<a href="https://github.com/milvus-io/milvus/pull/33980">[#33980</a>, <a href="https://github.com/milvus-io/milvus/pull/34363">#34363</a>]</li>
<li>Es wurde ein Problem behoben, bei dem Löschnachrichten aufgrund einer falschen Behandlung des Datenbereichs nicht weitergeleitet werden konnten.<a href="https://github.com/milvus-io/milvus/pull/35313">(#35313</a>)</li>
<li>Behebung einer SIGBUS-Ausnahme, die aufgrund einer falschen Verwendung von <code translate="no">mmap</code> auftrat.<a href="https://github.com/milvus-io/milvus/pull/34455">[#34455</a>, <a href="https://github.com/milvus-io/milvus/pull/34530">#34530</a>]</li>
<li>Abstürze, die durch illegale Suchausdrücke verursacht wurden, wurden behoben.<a href="https://github.com/milvus-io/milvus/pull/35307">(#35307</a>)</li>
<li>Es wurde ein Problem behoben, bei dem die DataNode-Überwachung aufgrund einer falschen Timeout-Einstellung im Überwachungskontext fehlschlug.<a href="https://github.com/milvus-io/milvus/pull/35017">(#35017</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Behebung von Sicherheitsschwachstellen durch Aktualisierung bestimmter Abhängigkeiten.<a href="https://github.com/milvus-io/milvus/pull/33927">[#33927</a>, <a href="https://github.com/milvus-io/milvus/pull/34693">#34693</a>]</li>
<li>Es wurde ein Parsing-Fehler behoben, der durch übermäßig lange Ausdrücke ausgelöst wurde.<a href="https://github.com/milvus-io/milvus/pull/34957">(#34957</a>)</li>
<li>Es wurde ein Speicherleck behoben, das beim Parsen des Abfrageplans auftrat.<a href="https://github.com/milvus-io/milvus/pull/34932">(#34932</a>)</li>
<li>Es wurde ein Problem behoben, bei dem dynamische Änderungen der Log-Ebene nicht wirksam wurden.<a href="https://github.com/milvus-io/milvus/pull/34777">(#34777</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Gruppierungsabfragen für wachsende Daten aufgrund von nicht initialisierten Segmentoffsets fehlschlugen.<a href="https://github.com/milvus-io/milvus/pull/34750">(#34750</a>)</li>
<li>Die Einstellung der Suchparameter bei Verwendung des Knowhere-Iterators wurde korrigiert.<a href="https://github.com/milvus-io/milvus/pull/34732">(#34732</a>)</li>
<li>Die Logik zur Überprüfung des Status der Partitionsladung wurde überarbeitet.<a href="https://github.com/milvus-io/milvus/pull/34305">(#34305</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Aktualisierungen des Privilegien-Caches aufgrund von unbehandelten Anfragefehlern fehlschlugen.<a href="https://github.com/milvus-io/milvus/pull/34697">(#34697</a>)</li>
<li>Es wurde ein Fehler bei der Wiederherstellung von geladenen Sammlungen nach einem Neustart von QueryCoord behoben.<a href="https://github.com/milvus-io/milvus/pull/35211">(#35211</a>)</li>
<li>Ein Problem mit der Last-Idempotenz wurde behoben, indem eine unnötige Validierung der Indexparameter entfernt wurde.<a href="https://github.com/milvus-io/milvus/pull/35179">(#35179</a>)</li>
<li>Es wurde sichergestellt, dass <code translate="no">compressBinlog</code> ausgeführt wird, um <code translate="no">reloadFromKV</code> zu ermöglichen, binlog's <code translate="no">logID</code> nach dem Neustart von DataCoord korrekt zu füllen.<a href="https://github.com/milvus-io/milvus/pull/34062">(#34062</a>)</li>
<li>Ein Problem wurde behoben, bei dem Sammlungs-Metadaten nach der Garbage Collection in DataCoord nicht entfernt wurden.<a href="https://github.com/milvus-io/milvus/pull/34884">(#34884</a>)</li>
<li>Ein Speicherleck im SegmentManager innerhalb von DataCoord wurde behoben, indem durch Importe erzeugte Flush-Segmente entfernt wurden.<a href="https://github.com/milvus-io/milvus/pull/34651">(#34651</a>)</li>
<li>Ein Panic-Problem wurde behoben, das auftrat, wenn die Verdichtung deaktiviert war und eine Sammlung gelöscht wurde.<a href="https://github.com/milvus-io/milvus/pull/34206">(#34206</a>)</li>
<li>Ein Out-of-Memory-Problem in DataNode wurde behoben, indem der Algorithmus zur Schätzung der Speichernutzung verbessert wurde.<a href="https://github.com/milvus-io/milvus/pull/34203">(#34203</a>)</li>
<li>Durch die Implementierung von Singleflight für den Chunk-Cache wurde ein Burst-Speicherverbrauch verhindert, wenn mehrere Vektor-Abrufanforderungen auf einen Cache-Miss treffen.<a href="https://github.com/milvus-io/milvus/pull/34283">(#34283</a>)</li>
<li>Erfasst <code translate="no">ErrKeyNotFound</code> während CAS (Compare and Swap) Operationen in der Konfiguration.<a href="https://github.com/milvus-io/milvus/pull/34489">(#34489</a>)</li>
<li>Es wurde ein Problem behoben, bei dem Konfigurationsaktualisierungen fehlschlugen, weil fälschlicherweise der formatierte Wert in einer CAS-Operation verwendet wurde.<a href="https://github.com/milvus-io/milvus/pull/34373">(#34373</a>)</li>
</ul>
<h3 id="Miscellaneous" class="common-anchor-header">Verschiedenes</h3><ul>
<li>Unterstützung für den OTLP HTTP-Exporter wurde hinzugefügt, wodurch die Beobachtbarkeit und die Überwachungsmöglichkeiten verbessert wurden.<a href="https://github.com/milvus-io/milvus/pull/35073">[#35073</a>, <a href="https://github.com/milvus-io/milvus/pull/35299">#35299</a>]</li>
<li>Verbesserte Datenbankfunktionalität durch Einführung von Eigenschaften wie "max collections" und "disk quota", die nun dynamisch geändert werden können.<a href="https://github.com/milvus-io/milvus/pull/34511">[#34511</a>, <a href="https://github.com/milvus-io/milvus/pull/34386">#34386</a>]</li>
<li>Es wurden Tracing-Funktionen für L0-Verdichtungsprozesse innerhalb von DataNode hinzugefügt, um Diagnose und Überwachung zu verbessern.<a href="https://github.com/milvus-io/milvus/pull/33898">(#33898</a>)</li>
<li>Es wurde eine Quotenkonfiguration für die Anzahl der L0-Segmenteinträge pro Sammlung eingeführt, die eine bessere Kontrolle der Löschungsraten durch Anwendung von Gegendruck ermöglicht.<a href="https://github.com/milvus-io/milvus/pull/34837">(#34837</a>)</li>
<li>Der Mechanismus zur Ratenbegrenzung für Einfügeoperationen wurde erweitert, um auch Upsert-Operationen abzudecken, was eine konsistente Leistung unter hoher Last gewährleistet.<a href="https://github.com/milvus-io/milvus/pull/34616">(#34616</a>)</li>
<li>Es wurde ein dynamischer CGO-Pool für Proxy-CGO-Aufrufe implementiert, der die Ressourcennutzung und Leistung optimiert.<a href="https://github.com/milvus-io/milvus/pull/34842">(#34842</a>)</li>
<li>Die DiskAnn-Kompilierungsoption für die Betriebssysteme Ubuntu, Rocky und Amazon wurde aktiviert, was die Kompatibilität und Leistung auf diesen Plattformen verbessert.<a href="https://github.com/milvus-io/milvus/pull/34244">(#34244</a>)</li>
<li>Conan wurde auf Version 1.64.1 aktualisiert, um die Kompatibilität mit den neuesten Funktionen und Verbesserungen zu gewährleisten.<a href="https://github.com/milvus-io/milvus/pull/35216">(#35216</a>)</li>
<li>Knowhere wurde auf Version 2.3.7 aktualisiert, was Leistungsverbesserungen und neue Funktionen mit sich bringt.<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>Die Revision bestimmter Pakete von Drittanbietern wurde korrigiert, um konsistente Builds zu gewährleisten und das Risiko unerwarteter Änderungen zu verringern.<a href="https://github.com/milvus-io/milvus/pull/35316">(#35316</a>)</li>
</ul>
<h2 id="v246" class="common-anchor-header">v2.4.6<button data-href="#v246" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Juli 16, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.6</td><td>2.4.4</td><td>2.4.2</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.6 ist ein Bugfix-Release, das kritische Probleme wie Panics, Speicherlecks und Datenverluste bei Löschvorgängen behebt. Außerdem werden mehrere Optimierungen eingeführt, darunter Verbesserungen der Überwachungsmetriken, die Aktualisierung der Go-Version auf 1.21 und die Verbesserung der Benutzerfreundlichkeit bei RESTful count(*)-Abfragen.</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Die Benutzerfreundlichkeit von RESTful-API-Abfragen wurde verbessert<a href="https://github.com/milvus-io/milvus/pull/34444">(#34444</a>).</li>
<li>Aktualisierung der Go-Version von 1.20 auf 1.21<a href="https://github.com/milvus-io/milvus/pull/33940">(#33940</a>).</li>
<li>Optimierung des Histogramm-Metrik-Buckets für feinere Granularität beim Bucketing<a href="https://github.com/milvus-io/milvus/pull/34592">(#34592</a>).</li>
<li>Aktualisierung der Pulsar-Abhängigkeitsversion von 2.8.2 auf 2.9.5. Es wird empfohlen, Pulsar seit Milvus 2.4.6 auf 2.9.5 zu aktualisieren.</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Es wurde ein Problem behoben, bei dem die GetReplicas API einen Nil-Status zurückgab<a href="https://github.com/milvus-io/milvus/pull/34019">(#34019</a>).</li>
<li>Es wurde ein Problem behoben, bei dem Abfragen gelöschte Datensätze zurückgeben konnten<a href="https://github.com/milvus-io/milvus/pull/34502">(#34502</a>).</li>
<li>Es wurde ein Problem behoben, bei dem IndexNode während des Anhaltens aufgrund einer falschen Lebenszeitkontrolle stecken blieb<a href="https://github.com/milvus-io/milvus/pull/34559">(#34559</a>).</li>
<li>Es wurde ein Speicherleck bei Primärschlüssel-Orakel-Objekten behoben, wenn ein Worker offline ist<a href="https://github.com/milvus-io/milvus/pull/34020">(#34020</a>).</li>
<li>ChannelManagerImplV2 korrigiert, um den richtigen Knoten zu benachrichtigen, und behebt Probleme mit der Parametererfassung beim Schließen von Schleifen<a href="https://github.com/milvus-io/milvus/pull/34004">(#34004</a>).</li>
<li>Ein Lese- und Schreibdaten-Race in ImportTask segmentsInfo wurde durch die Implementierung einer tiefen Kopie behoben<a href="https://github.com/milvus-io/milvus/pull/34126">(#34126</a>).</li>
<li>Korrigierte Versionsinformationen für die Konfigurationsoption "legacyVersionWithoutRPCWatch", um Fehler bei Rolling Upgrades zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/34185">(#34185</a>).</li>
<li>Die Metrik für die Anzahl der geladenen Partitionen wurde korrigiert<a href="https://github.com/milvus-io/milvus/pull/34195">(#34195</a>).</li>
<li>Übergabe der <code translate="no">otlpSecure</code> Konfiguration beim Einrichten von Segcore Tracing<a href="https://github.com/milvus-io/milvus/pull/34210">(#34210</a>).</li>
<li>Es wurde ein Problem behoben, bei dem die Eigenschaften von DataCoord versehentlich überschrieben wurden<a href="https://github.com/milvus-io/milvus/pull/34240">(#34240</a>).</li>
<li>Es wurde ein Problem mit Datenverlust behoben, das durch das fälschliche Zusammenführen von zwei neu erstellten Nachrichtenströmen verursacht wurde<a href="https://github.com/milvus-io/milvus/pull/34563">(#34563</a>).</li>
<li>Eine Panik wurde behoben, die dadurch verursacht wurde, dass msgstream versuchte, einen ungültigen pchannel zu konsumieren<a href="https://github.com/milvus-io/milvus/pull/34230">(#34230</a>).</li>
<li>Es wurde ein Problem behoben, bei dem Importe verwaiste Dateien erzeugen konnten<a href="https://github.com/milvus-io/milvus/pull/34071">(#34071</a>).</li>
<li>Unvollständige Abfrageergebnisse aufgrund von doppelten Primärschlüsseln in einem Segment behoben<a href="https://github.com/milvus-io/milvus/pull/34302">(#34302</a>).</li>
<li>Ein Problem mit fehlenden versiegelten Segmenten bei der L0-Verdichtung wurde behoben<a href="https://github.com/milvus-io/milvus/pull/34566">(#34566</a>).</li>
<li>Das Problem der schmutzigen Daten in der channel-cp-Meta, die nach der Garbage Collection erzeugt wurde, wurde behoben<a href="https://github.com/milvus-io/milvus/pull/34609">(#34609</a>).</li>
<li>Korrigierte die Metriken, bei denen database_num nach dem Neustart von RootCoord 0 war<a href="https://github.com/milvus-io/milvus/pull/34010">(#34010</a>).</li>
<li>Ein Speicherleck im SegmentManager in DataCoord wurde behoben, indem durch Import erzeugte geflushte Segmente entfernt wurden<a href="https://github.com/milvus-io/milvus/pull/34652">(#34652</a>).</li>
<li>Es wurde sichergestellt, dass compressBinlog die logID von binlogs nach einem Neustart von DataCoord füllt, um ein korrektes Neuladen von KV sicherzustellen<a href="https://github.com/milvus-io/milvus/pull/34064">(#34064</a>).</li>
</ul>
<h2 id="v245" class="common-anchor-header">v2.4.5<button data-href="#v245" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Juni 18, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.5</td><td>2.4.4</td><td>2.4.1</td><td>2.4.3</td></tr>
</tbody>
</table>
<p>Die Veröffentlichung von Milvus 2.4.5 führt mehrere Verbesserungen und Fehlerbehebungen ein, um Leistung, Stabilität und Funktionalität zu verbessern. Milvus 2.4.5 vereinfacht die Suche nach Sparse-, Float16- und bfloat16-Vektoren durch automatische Indizierung, beschleunigt Suchen, Löschen und Verdichten durch Bloom-Filter-Optimierungen und verbessert die Datenverwaltung durch schnellere Ladezeiten und Unterstützung von L0-Segmenten beim Import. Außerdem wird der Sparse-HNSW-Index für eine effiziente hochdimensionale Sparse-Datensuche eingeführt, die RESTful-API mit Unterstützung für Sparse-Float-Vektoren erweitert und kritische Fehler für mehr Stabilität behoben.</p>
<h3 id="New-Features" class="common-anchor-header">Neue Funktionen</h3><ul>
<li>rbac-Unterstützung zur describe/alter database api hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/33804">(#33804</a>)</li>
<li>Unterstützt den Aufbau des HNSW-Index für Sparse-Vektoren<a href="https://github.com/milvus-io/milvus/pull/33653">(#33653</a>, <a href="https://github.com/milvus-io/milvus/pull/33662">#33662</a>)</li>
<li>Unterstützt die Erstellung des Disk-Index für binäre Vektoren<a href="https://github.com/milvus-io/milvus/pull/33575">(#33575</a>)</li>
<li>Unterstützt sparse Vektortyp auf RESTful v2<a href="https://github.com/milvus-io/milvus/pull/33555">(#33555</a>)</li>
<li>Hinzufügen von /management/stop RESTful api zum Stoppen einer Komponente<a href="https://github.com/milvus-io/milvus/pull/33799">(#33799</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Setzt maxPartitionNum Standardwert auf 1024<a href="https://github.com/milvus-io/milvus/pull/33950">(#33950</a>)</li>
<li>Aktiviert, um das Zurücksetzen der Verbindung für nicht verfügbare Fehler zu erzwingen<a href="https://github.com/milvus-io/milvus/pull/33910">(#33910</a>)</li>
<li>Aktiviert Flush-Ratenbegrenzer der Sammlungsebene<a href="https://github.com/milvus-io/milvus/pull/33864">(#33864</a>)</li>
<li>Parallele Ausführung von Bloom-Filtern zur Beschleunigung der Segment-Vorhersage<a href="https://github.com/milvus-io/milvus/pull/33793">(#33793</a>)</li>
<li>Benutzte fastjson lib für unmarshal delete log, um json.Unmarshal zu beschleunigen<a href="https://github.com/milvus-io/milvus/pull/33802">(#33802</a>)</li>
<li>Verwendet BatchPkExist, um die Kosten für Bloomfilter-Funktionsaufrufe zu reduzieren<a href="https://github.com/milvus-io/milvus/pull/33752">(#33752</a>)</li>
<li>Beschleunigte das Laden von kleinen Sammlungen<a href="https://github.com/milvus-io/milvus/pull/33746">(#33746</a>)</li>
<li>Unterstützt den Import von Löschdaten in das L0-Segment (<a href="https://github.com/milvus-io/milvus/pull/33712">#33712</a>)</li>
<li>Übersprungene Markierungskompaktierungs-Tasks werden zeitgesteuert, um zu vermeiden, dass dieselbe Task immer wieder ausgeführt wird<a href="https://github.com/milvus-io/milvus/pull/33833">(#33833</a>)</li>
<li>Behandelt float16 und bfloat16 Vektoren als gleich wie BinaryVector in numpy bulk insert (<a href="https://github.com/milvus-io/milvus/pull/33788">#33788</a>)</li>
<li>Das includeCurrentMsg Flag für die seek Methode wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/33743">(#33743</a>)</li>
<li>MergeInterval, targetBufSize, maxTolerantLag von msgdispatcher zu Configs hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/33680">(#33680</a>)</li>
<li>Verbesserte GetVectorByID von Sparse Vector<a href="https://github.com/milvus-io/milvus/pull/33652">(#33652</a>)</li>
<li>StringPrimarykey wurde entfernt, um unnötige Kopier- und Funktionsaufrufkosten zu reduzieren (<a href="https://github.com/milvus-io/milvus/pull/33649">#33649</a>)</li>
<li>Autoindex-Zuordnung für binäre/sparsame Datentypen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/33625">(#33625</a>)</li>
<li>Optimierte einige Caches, um den Speicherverbrauch zu reduzieren<a href="https://github.com/milvus-io/milvus/pull/33560">(#33560</a>)</li>
<li>Abstrahierte Ausführungsschnittstelle für Import/Preimport Aufgabe (<a href="https://github.com/milvus-io/milvus/pull/33607">#33607</a>)</li>
<li>Map pk zu Zeitstempel beim Einfügen in Puffer verwendet, um bf Ursachen zu reduzieren<a href="https://github.com/milvus-io/milvus/pull/33582">(#33582</a>)</li>
<li>Redundante Meta-Operationen beim Import wurden vermieden (<a href="https://github.com/milvus-io/milvus/pull/33519">#33519</a>)</li>
<li>Verbesserung der Logs durch bessere Festplatten-Quota-Informationen, Hinzufügen des UseDefaultConsistency-Flags, Entfernen unnötiger Logs<a href="https://github.com/milvus-io/milvus/pull/33597">(#33597</a>, <a href="https://github.com/milvus-io/milvus/pull/33644">#33644</a>, <a href="https://github.com/milvus-io/milvus/pull/33670">#33670</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Fehler behoben, dass queryHook den Vektortyp nicht erkennen konnte<a href="https://github.com/milvus-io/milvus/pull/33911">(#33911</a>)</li>
<li>Verhinderte die Verwendung der erfassten Iterationsvariable partitionID<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>Es wurde ein Fehler behoben, der dazu führen konnte, dass Milvus nicht in der Lage war, AutoIndex auf binären und spärlichen Vektoren zu erstellen<a href="https://github.com/milvus-io/milvus/pull/33867">(#33867</a>)</li>
<li>Fehler behoben, der dazu führen konnte, dass indexnode die Indexerstellung bei ungültigen Indexparametern aller Vektoren <a href="https://github.com/milvus-io/milvus/pull/33878"> wiederholte（#33878</a>)</li>
<li>Fehler behoben, der bei gleichzeitigem Laden und Freigeben zum Absturz des Servers führen kann<a href="https://github.com/milvus-io/milvus/pull/33699">(#33699</a>)</li>
<li>Verbesserte Cache-Konsistenz für Konfigurationswerte<a href="https://github.com/milvus-io/milvus/pull/33797">(#33797</a>)</li>
<li>Verhindert möglichen Datenverlust beim Löschen<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>Sicherstellung, dass das Feld DroppedAt (wahrscheinlicher Zeitstempel der Löschung) nach dem Löschen von Sammlungen gesetzt wird<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>Es wurde ein Problem behoben, das Milvus dazu veranlasste, binäre Vektordatengrößen falsch zu behandeln<a href="https://github.com/milvus-io/milvus/pull/33751">(#33751</a>)</li>
<li>Verhindert, dass sensible Kafka-Anmeldeinformationen im Klartext protokolliert werden<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Es wurde sichergestellt, dass Milvus Daten mit mehreren Vektorfeldern korrekt importieren kann.<a href="https://github.com/milvus-io/milvus/pull/33724">(#33724</a>)</li>
<li>Die Zuverlässigkeit des Imports wurde erhöht, indem vor dem Start geprüft wird, ob ein Importauftrag existiert.<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>Verbesserte Handhabung des spärlichen HNSW-Index (interne Funktionalität)<a href="https://github.com/milvus-io/milvus/pull/33714">(#33714</a>)</li>
<li>Bereinigung des Vektorspeichers zur Vermeidung von Speicherlecks<a href="https://github.com/milvus-io/milvus/pull/33708">(#33708</a>)</li>
<li>Sicherstellung eines reibungsloseren asynchronen Aufwärmens durch Behebung eines State-Lock-Problems<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>Es wurde ein Fehler behoben, der fehlende Ergebnisse in Abfrage-Iteratoren verursachen konnte.<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>Es wurde ein Fehler behoben, der dazu führen konnte, dass die Größe von Importsegmenten ungleichmäßig war (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Falsche Handhabung der Datengröße für bf16, fp16 und binäre Vektortypen behoben<a href="https://github.com/milvus-io/milvus/pull/33488">(#33488</a>)</li>
<li>Verbesserte Stabilität durch Behebung möglicher Probleme mit dem L0 Compactor<a href="https://github.com/milvus-io/milvus/pull/33564">(#33564</a>)</li>
<li>Es wurde sichergestellt, dass dynamische Konfigurationsaktualisierungen korrekt im Cache reflektiert werden.<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>Verbesserte die Genauigkeit der RootCoordQuotaStates-Metrik (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Die Anzahl der geladenen Entitäten in der Metrik wurde genauer angezeigt<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>Bietet vollständigere Informationen in Ausnahmeprotokollen. <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>Optimierte Abfrage-Pipeline durch Entfernen des unnötigen Gruppen-Checkers<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>Der lokale Speicherpfad wurde für eine genauere Überprüfung der Festplattenkapazität auf dem Indexknoten verwendet.<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>Korrigiert, dass hasMoreResult false zurückgeben kann, wenn die Trefferanzahl größer als das Limit ist<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>Verzögertes Laden von bf im Delegator, um zu verhindern, dass bfs immer wieder geladen wird, wenn der Worker keinen Speicher mehr hat<a href="https://github.com/milvus-io/milvus/pull/33650">(#33650</a>)- Fehler behoben, dass queryHook den Vektortyp nicht erkennen konnte<a href="https://github.com/milvus-io/milvus/pull/33911">(#33911</a>)</li>
<li>Verhinderte die Verwendung der erfassten Iterationsvariable partitionID<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>Es wurde ein Fehler behoben, der dazu führen konnte, dass Milvus nicht in der Lage war, AutoIndex auf binären und spärlichen Vektoren zu erstellen<a href="https://github.com/milvus-io/milvus/pull/33867">(#33867</a>)</li>
<li>Fehler behoben, der dazu führen konnte, dass indexnode die Indexerstellung bei ungültigen Indexparametern aller Vektoren <a href="https://github.com/milvus-io/milvus/pull/33878"> wiederholte（#33878</a>)</li>
<li>Fehler behoben, der bei gleichzeitigem Laden und Freigeben zum Absturz des Servers führen kann<a href="https://github.com/milvus-io/milvus/pull/33699">(#33699</a>)</li>
<li>Verbesserte Cache-Konsistenz für Konfigurationswerte<a href="https://github.com/milvus-io/milvus/pull/33797">(#33797</a>)</li>
<li>Verhindert möglichen Datenverlust beim Löschen<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>Sicherstellung, dass das Feld DroppedAt (wahrscheinlicher Zeitstempel der Löschung) nach dem Löschen von Sammlungen gesetzt wird<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>Es wurde ein Problem behoben, das Milvus dazu veranlasste, binäre Vektordatengrößen falsch zu behandeln<a href="https://github.com/milvus-io/milvus/pull/33751">(#33751</a>)</li>
<li>Verhindert, dass sensible Kafka-Anmeldeinformationen im Klartext protokolliert werden<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Es wurde sichergestellt, dass Milvus Daten mit mehreren Vektorfeldern korrekt importieren kann.<a href="https://github.com/milvus-io/milvus/pull/33724">(#33724</a>)</li>
<li>Die Zuverlässigkeit des Imports wurde erhöht, indem vor dem Start geprüft wird, ob ein Importauftrag existiert.<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>Verbesserte Handhabung des spärlichen HNSW-Index (interne Funktionalität)<a href="https://github.com/milvus-io/milvus/pull/33714">(#33714</a>)</li>
<li>Bereinigung des Vektorspeichers zur Vermeidung von Speicherlecks<a href="https://github.com/milvus-io/milvus/pull/33708">(#33708</a>)</li>
<li>Sicherstellung eines reibungsloseren asynchronen Aufwärmens durch Behebung eines State-Lock-Problems<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>Es wurde ein Fehler behoben, der fehlende Ergebnisse in Abfrage-Iteratoren verursachen konnte.<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>Es wurde ein Fehler behoben, der dazu führen konnte, dass die Größe von Importsegmenten ungleichmäßig war (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Falsche Handhabung der Datengröße für bf16, fp16 und binäre Vektortypen behoben<a href="https://github.com/milvus-io/milvus/pull/33488">(#33488</a>)</li>
<li>Verbesserte Stabilität durch Behebung möglicher Probleme mit dem L0 Compactor<a href="https://github.com/milvus-io/milvus/pull/33564">(#33564</a>)</li>
<li>Es wurde sichergestellt, dass dynamische Konfigurationsaktualisierungen korrekt im Cache reflektiert werden.<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>Verbesserte die Genauigkeit der RootCoordQuotaStates-Metrik (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Die Anzahl der geladenen Entitäten in der Metrik wurde genauer angezeigt<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>Bietet vollständigere Informationen in Ausnahmeprotokollen. <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>Optimierte Abfrage-Pipeline durch Entfernen des unnötigen Gruppen-Checkers<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>Verwendung des lokalen Speicherpfads für eine genauere Überprüfung der Festplattenkapazität auf dem Indexknoten.<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>Korrigiert, dass hasMoreResult false zurückgeben kann, wenn die Trefferanzahl größer als das Limit ist<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>Verzögertes Laden von bf im Delegator, um zu verhindern, dass bfs immer wieder geladen werden, wenn der Worker keinen Speicher mehr hat<a href="https://github.com/milvus-io/milvus/pull/33650">(#33650</a>)</li>
</ul>
<h2 id="v244" class="common-anchor-header">v2.4.4<button data-href="#v244" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Mai 31, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.4</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus v2.4.4 enthält mehrere kritische Fehlerkorrekturen und Verbesserungen zur Steigerung der Leistung und Stabilität. Insbesondere haben wir <strong>ein kritisches Problem behoben, bei dem Bulk-Insert-Statistikprotokolle fälschlicherweise als Müll gesammelt wurden</strong>, was die Datenintegrität beeinträchtigen konnte. <strong>Wir empfehlen allen Anwendern von v2.4 dringend ein Upgrade auf diese Version, um von diesen Korrekturen zu profitieren.</strong></p>
<p><strong>Wenn Sie Bulk Insert verwenden, sollten Sie so schnell wie möglich auf v2.4.4 aktualisieren, um die Datenintegrität zu gewährleisten.</strong></p>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Kritische Fehlerbehebungen</h3><ul>
<li>Die ID des Statistikprotokolls wurde ausgefüllt und auf ihre Korrektheit hin überprüft<a href="https://github.com/milvus-io/milvus/pull/33478">(#33478</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Verbesserter Bitset für ARM SVE<a href="https://github.com/milvus-io/milvus/pull/33440">(#33440</a>)</li>
<li>Ermöglicht Milvus-Kompilierung mit GCC-13<a href="https://github.com/milvus-io/milvus/pull/33441">(#33441</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Leere Sammlungen wurden angezeigt, wenn alle Rechte gewährt wurden<a href="https://github.com/milvus-io/milvus/pull/33454">(#33454</a>)</li>
<li>Sicherstellung, dass CMake für die aktuelle Plattform heruntergeladen und installiert wird, nicht nur für x86_64<a href="https://github.com/milvus-io/milvus/pull/33439">(#33439</a>)</li>
</ul>
<h2 id="v243" class="common-anchor-header">v2.4.3<button data-href="#v243" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Mai 29, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.3</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus Version 2.4.3 bietet eine Vielzahl von Funktionen, Verbesserungen und Fehlerbehebungen, um die Leistung und Zuverlässigkeit zu erhöhen. Zu den bemerkenswerten Erweiterungen gehören die Unterstützung von Sparse-Float-Vektor-Bulk-Insert und eine optimierte Bloom-Filter-Beschleunigung. Die Verbesserungen betrafen verschiedene Bereiche, von dynamischen Konfigurationsaktualisierungen bis zur Optimierung der Speichernutzung. Fehlerkorrekturen behoben kritische Probleme wie Panikszenarien und sorgten für einen reibungsloseren Systembetrieb. Diese Version unterstreicht das kontinuierliche Engagement von Milvus für die Verbesserung der Funktionalität, die Optimierung der Leistung und die Bereitstellung einer robusten Benutzererfahrung.</p>
<h3 id="Features" class="common-anchor-header">Merkmale</h3><ul>
<li>Unterstützt sparse float vector bulk insert für binlog/json/parquet<a href="https://github.com/milvus-io/milvus/pull/32649">(#32649</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Implementierter Datacoord/Knoten-Überwachungskanal basierend auf RPC<a href="https://github.com/milvus-io/milvus/pull/32036">(#32036</a>)</li>
<li>Optimierter Bloom-Filter zur Beschleunigung der Löschfilterung<a href="https://github.com/milvus-io/milvus/pull/32642">(#32642</a>, <a href="https://github.com/milvus-io/milvus/pull/33329">#33329</a>, <a href="https://github.com/milvus-io/milvus/pull/33284">#33284</a>)</li>
<li>Rohdaten wurden über mmap geladen, wenn der skalare Index keine Rohdaten enthielt<a href="https://github.com/milvus-io/milvus/pull/33317">(#33317</a>)</li>
<li>Synchronisierung der milvus Konfiguration mit milvus.yaml<a href="https://github.com/milvus-io/milvus/pull/33322">(#33322</a>, <a href="https://github.com/milvus-io/milvus/pull/32920">#32920</a>, <a href="https://github.com/milvus-io/milvus/pull/32857">#32857</a>, <a href="https://github.com/milvus-io/milvus/pull/32946">#32946</a>)</li>
<li>Aktualisierte knowhere Version<a href="https://github.com/milvus-io/milvus/pull/33310">(#33310</a>, <a href="https://github.com/milvus-io/milvus/pull/32931">#32931</a>, <a href="https://github.com/milvus-io/milvus/pull/33043">#33043</a>)</li>
<li>Aktivierte dynamische Aktualisierung der Balancer-Richtlinie in QueryCoord<a href="https://github.com/milvus-io/milvus/pull/33272">(#33272</a>)</li>
<li>Verwendet einen vorgefertigten Logger im Schreibpuffer, um die Logger-Zuweisung zu minimieren<a href="https://github.com/milvus-io/milvus/pull/33304">(#33304</a>)</li>
<li>Verbesserte Parameterüberprüfung<a href="https://github.com/milvus-io/milvus/pull/32777">(#32777</a>, <a href="https://github.com/milvus-io/milvus/pull/33271">#33271</a>, <a href="https://github.com/milvus-io/milvus/pull/33218">#33218</a>)</li>
<li>Es wurde ein Parameter hinzugefügt, um falsche Nachrichten-IDs im Checkpoint zu ignorieren<a href="https://github.com/milvus-io/milvus/pull/33249">(#33249</a>)</li>
<li>Konfiguration hinzugefügt, um die Behandlung von Initialisierungsfehlern für Plugins zu kontrollieren<a href="https://github.com/milvus-io/milvus/pull/32680">(#32680</a>)</li>
<li>Konfiguration zur Berechnung der Konsistenz von Punkten für Knowhere hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32997">(#32997</a>)</li>
<li>Konfigurationsoption zur Steuerung der Initialisierung von öffentlichen Rollenberechtigungen eingeführt<a href="https://github.com/milvus-io/milvus/pull/33174">(#33174</a>)</li>
<li>Optimierte Speichernutzung beim Lesen von Feldern<a href="https://github.com/milvus-io/milvus/pull/33196">(#33196</a>)</li>
<li>Verfeinerte Implementierung des Channel Managers v2<a href="https://github.com/milvus-io/milvus/pull/33172">(#33172</a>, <a href="https://github.com/milvus-io/milvus/pull/33121">#33121</a>, <a href="https://github.com/milvus-io/milvus/pull/33014">#33014</a>)</li>
<li>Funktion hinzugefügt, um die Größe der Daten im Speicher für binlog zu verfolgen<a href="https://github.com/milvus-io/milvus/pull/33025">(#33025</a>)</li>
<li>Metriken für die Größe von Segment-Index-Dateien hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32979">(#32979</a>, <a href="https://github.com/milvus-io/milvus/pull/33305">#33305</a>)</li>
<li>Ersetzte Delete mit DeletePartialMatch, um Metriken zu entfernen<a href="https://github.com/milvus-io/milvus/pull/33029">(#33029</a>)</li>
<li>Bezogene Datengröße gemäß Segmenttyp erhalten<a href="https://github.com/milvus-io/milvus/pull/33017">(#33017</a>)</li>
<li>Kanal-Knoten-Informationen im Metaspeicher bereinigt<a href="https://github.com/milvus-io/milvus/pull/32988">(#32988</a>)</li>
<li>Rootcoord aus Datenknoten-Broker entfernt<a href="https://github.com/milvus-io/milvus/pull/32818">(#32818</a>)</li>
<li>Aktiviert Batch-Upload<a href="https://github.com/milvus-io/milvus/pull/32788">(#32788</a>)</li>
<li>Die Standard-Partitionsnummer wurde auf 16 geändert, wenn ein Partitionsschlüssel verwendet wird<a href="https://github.com/milvus-io/milvus/pull/32950">(#32950</a>)</li>
<li>Verbesserte Reduktionsleistung bei sehr großen top-k Abfragen<a href="https://github.com/milvus-io/milvus/pull/32871">(#32871</a>)</li>
<li>Nutzung der TestLocations-Fähigkeit zur Beschleunigung von Schreiben und Verdichtung<a href="https://github.com/milvus-io/milvus/pull/32948">(#32948</a>)</li>
<li>Optimierter Plan-Parser-Pool, um unnötiges Recycling zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/32869">(#32869</a>)</li>
<li>Verbesserte Ladegeschwindigkeit<a href="https://github.com/milvus-io/milvus/pull/32898">(#32898</a>)</li>
<li>Verwendete Standard-Konsistenzstufe für restv2<a href="https://github.com/milvus-io/milvus/pull/32956">(#32956</a>)</li>
<li>Kostenantwort für die Rest-API hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32620">(#32620</a>)</li>
<li>Aktivierte Kanal-exklusive Balance-Politik (<a href="https://github.com/milvus-io/milvus/pull/32911">#32911</a>)</li>
<li>Beschriebene Datenbank-API im Proxy offengelegt<a href="https://github.com/milvus-io/milvus/pull/32732">(#32732</a>)</li>
<li>Verwendetes coll2replica Mapping beim Abrufen von RG nach Sammlung<a href="https://github.com/milvus-io/milvus/pull/32892">(#32892</a>)</li>
<li>Mehr Tracing für Suche und Abfrage hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32734">(#32734</a>)</li>
<li>Unterstützt dynamische Konfiguration für opentelemetry Trace<a href="https://github.com/milvus-io/milvus/pull/32169">(#32169</a>)</li>
<li>Vermeidet Iteration über Kanal-Ergebnisse beim Aktualisieren der Leaderview<a href="https://github.com/milvus-io/milvus/pull/32887">(#32887</a>)</li>
<li>Optimierte Handhabung von Vektor-Offsets für Parkett<a href="https://github.com/milvus-io/milvus/pull/32822">(#32822</a>)</li>
<li>Verbesserte Datensatz-Segment-Filterung mit Collection<a href="https://github.com/milvus-io/milvus/pull/32831">(#32831</a>)</li>
<li>Angepasste Log-Level und Frequenz<a href="https://github.com/milvus-io/milvus/pull/33042">(#33042</a>, <a href="https://github.com/milvus-io/milvus/pull/32838">#32838</a>, <a href="https://github.com/milvus-io/milvus/pull/33337">#33337</a>)</li>
<li>Ermöglichte das Anhalten des Ausgleichs, nachdem der Ausgleich ausgesetzt wurde<a href="https://github.com/milvus-io/milvus/pull/32812">(#32812</a>)</li>
<li>Aktualisierter Shard-Leader-Cache bei Änderung des Leader-Standorts<a href="https://github.com/milvus-io/milvus/pull/32470">(#32470</a>)</li>
<li>Entfernte veraltete API und Felder<a href="https://github.com/milvus-io/milvus/pull/32808">(#32808</a>, <a href="https://github.com/milvus-io/milvus/pull/32704">#32704</a>)</li>
<li>metautil.channel hinzugefügt, um String-Vergleiche in int zu konvertieren<a href="https://github.com/milvus-io/milvus/pull/32749">(#32749</a>)</li>
<li>Typinformation für Payload Writer Fehlermeldung und Log hinzugefügt, wenn Querynode eine neue Sammlung gefunden hat<a href="https://github.com/milvus-io/milvus/pull/32522">(#32522</a>)</li>
<li>Überprüfung der Partitionsnummer beim Erstellen von Sammlungen mit Partitionsschlüssel<a href="https://github.com/milvus-io/milvus/pull/32670">(#32670</a>)</li>
<li>Altes l0-Segment wurde entfernt, wenn Watch fehlschlug<a href="https://github.com/milvus-io/milvus/pull/32725">(#32725</a>)</li>
<li>Verbessertes Drucken des Typs der Anfrage<a href="https://github.com/milvus-io/milvus/pull/33319">(#33319</a>)</li>
<li>Überprüft, ob die Array-Felddaten gleich Null sind, bevor der Typ ermittelt wird<a href="https://github.com/milvus-io/milvus/pull/33311">(#33311</a>)</li>
<li>Gab einen Fehler zurück, wenn die Delete/AddNode Knoten-Operation beim Start fehlschlug<a href="https://github.com/milvus-io/milvus/pull/33258">(#33258</a>)</li>
<li>Erlaubte das Aktualisieren der Server-ID von Datenknoten<a href="https://github.com/milvus-io/milvus/pull/31597">(#31597</a>)</li>
<li>Vereinheitlichte Bereinigung der Querynode-Metriken in der Collection-Version<a href="https://github.com/milvus-io/milvus/pull/32805">(#32805</a>)</li>
<li>Fehlerhafte Version der skalaren Auto-Index-Konfiguration behoben<a href="https://github.com/milvus-io/milvus/pull/32795">(#32795</a>)</li>
<li>Verfeinerte Index-Param-Prüfung beim Erstellen/Ändern von Indizes<a href="https://github.com/milvus-io/milvus/pull/32712">(#32712</a>)</li>
<li>Redundante Replika-Wiederherstellung wurde entfernt<a href="https://github.com/milvus-io/milvus/pull/32985">(#32985</a>)</li>
<li>Ermöglicht das Schreiben von mehr als 200k Segmenten in der Kanal-Metatabelle<a href="https://github.com/milvus-io/milvus/pull/33300">(#33300</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Panic behoben, wenn die Datenbank im Rate Limit Interceptor nicht existierte<a href="https://github.com/milvus-io/milvus/pull/33308">(#33308</a>)</li>
<li>Fehler bei der Sammlung von Quotacenter-Metriken aufgrund falscher Parameter behoben<a href="https://github.com/milvus-io/milvus/pull/33399">(#33399</a>)</li>
<li>Panik behoben, wenn processactivestandby einen Fehler zurückgab<a href="https://github.com/milvus-io/milvus/pull/33372">(#33372</a>)</li>
<li>Korrigierte das Abschneiden von Suchergebnissen in restful v2, wenn nq &gt; 1<a href="https://github.com/milvus-io/milvus/pull/33363">(#33363</a>)</li>
<li>Datenbank-Namensfeld für Rollenoperationen in restful v2 hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/33291">(#33291</a>)</li>
<li>Behoben: Globale Ratenbegrenzung funktionierte nicht<a href="https://github.com/milvus-io/milvus/pull/33336">(#33336</a>)</li>
<li>Korrigierte Panik, die durch das Scheitern des Indexaufbaus verursacht wurde<a href="https://github.com/milvus-io/milvus/pull/33314">(#33314</a>)</li>
<li>Validierung für sparse vector in segcore hinzugefügt, um die Legalität sicherzustellen<a href="https://github.com/milvus-io/milvus/pull/33312">(#33312</a>)</li>
<li>Entfernte Aufgabe aus syncmgr nach Abschluss der Aufgabe<a href="https://github.com/milvus-io/milvus/pull/33303">(#33303</a>)</li>
<li>Fehler bei der Partitionsschlüssel-Filterung während des Datenimports behoben<a href="https://github.com/milvus-io/milvus/pull/33277">(#33277</a>)</li>
<li>Die Unfähigkeit, TraceID zu generieren, wenn der noop-Exporter verwendet wird, wurde behoben<a href="https://github.com/milvus-io/milvus/pull/33208">(#33208</a>)</li>
<li>Verbesserter Abruf von Abfrageergebnissen<a href="https://github.com/milvus-io/milvus/pull/33179">(#33179</a>)</li>
<li>Markierter Kanal-Checkpoint wurde fallen gelassen, um das Auslaufen von Checkpoint-Lag-Metriken zu verhindern<a href="https://github.com/milvus-io/milvus/pull/33201">(#33201</a>)</li>
<li>Korrigierter Abfrageknoten, der während des Anhaltens des Fortschritts stecken blieb<a href="https://github.com/milvus-io/milvus/pull/33154">(#33154</a>)</li>
<li>Fehlende Segmente in der Flush-Antwort behoben<a href="https://github.com/milvus-io/milvus/pull/33061">(#33061</a>)</li>
<li>Absendeoperation idempotent gemacht<a href="https://github.com/milvus-io/milvus/pull/33053">(#33053</a>)</li>
<li>Zuweisung eines neuen Slice für jeden Batch im Streaming Reader<a href="https://github.com/milvus-io/milvus/pull/33360">(#33360</a>)</li>
<li>Offline-Knoten aus der Ressourcen-Gruppe nach QueryCoord-Neustart entfernt<a href="https://github.com/milvus-io/milvus/pull/33233">(#33233</a>)</li>
<li>Entfernter l0 compactor in completedCompactor<a href="https://github.com/milvus-io/milvus/pull/33216">(#33216</a>)</li>
<li>Quota-Wert bei Initialisierung des Limiters zurückgesetzt<a href="https://github.com/milvus-io/milvus/pull/33152">(#33152</a>)</li>
<li>Problem behoben, bei dem das etcd-Limit überschritten wurde<a href="https://github.com/milvus-io/milvus/pull/33041">(#33041</a>)</li>
<li>Überschreitung des etcd-Transaktionslimits aufgrund zu vieler Felder behoben<a href="https://github.com/milvus-io/milvus/pull/33040">(#33040</a>)</li>
<li>RLock-Wiedereintritt in GetNumRowsOfPartition entfernt<a href="https://github.com/milvus-io/milvus/pull/33045">(#33045</a>)</li>
<li>LeaderCacheObserver wurde vor SyncAll gestartet<a href="https://github.com/milvus-io/milvus/pull/33035">(#33035</a>)</li>
<li>Aktivierte den Ausgleich des freigegebenen Standby-Kanals<a href="https://github.com/milvus-io/milvus/pull/32986">(#32986</a>)</li>
<li>Initialisierte den Zugriffslogger vor der Serverinitialisierung<a href="https://github.com/milvus-io/milvus/pull/32976">(#32976</a>)</li>
<li>Verdichter wurde in die Lage versetzt, leere Segmente zu löschen<a href="https://github.com/milvus-io/milvus/pull/32821">(#32821</a>)</li>
<li>Füllte Deltalog-Eintragsnummer und Zeitbereich in L0-Kompaktierungen<a href="https://github.com/milvus-io/milvus/pull/33004">(#33004</a>)</li>
<li>Proxy-Absturz aufgrund von Shard-Leader-Cache-Daten-Race behoben<a href="https://github.com/milvus-io/milvus/pull/32971">(#32971</a>)</li>
<li>Korrigierte Zeiteinheit für Lastindex-Metrik<a href="https://github.com/milvus-io/milvus/pull/32935">(#32935</a>)</li>
<li>Problem behoben, bei dem ein Segment auf einem stoppenden Abfrageknoten nicht erfolgreich freigegeben werden konnte<a href="https://github.com/milvus-io/milvus/pull/32929">(#32929</a>)</li>
<li>Korrigierte Index-Ressourcen-Schätzung<a href="https://github.com/milvus-io/milvus/pull/32842">(#32842</a>)</li>
<li>Kanal-Prüfpunkt wurde auf Delta-Position gesetzt<a href="https://github.com/milvus-io/milvus/pull/32878">(#32878</a>)</li>
<li>Syncmgr sperrte den Schlüssel vor der Rückgabe von future<a href="https://github.com/milvus-io/milvus/pull/32865">(#32865</a>)</li>
<li>Sicherstellung, dass invertierter Index nur ein Segment hat<a href="https://github.com/milvus-io/milvus/pull/32858">(#32858</a>)</li>
<li>Behobener Verdichtungs-Trigger, der zwei identische Segmente auswählt<a href="https://github.com/milvus-io/milvus/pull/32800">(#32800</a>)</li>
<li>Problem behoben, bei dem der Partitionsname im binlog-Import nicht angegeben werden konnte<a href="https://github.com/milvus-io/milvus/pull/32730">(#32730</a>, <a href="https://github.com/milvus-io/milvus/pull/33027">#33027</a>)</li>
<li>Dynamische Spalte wurde optional im Parkett-Import<a href="https://github.com/milvus-io/milvus/pull/32738">(#32738</a>)</li>
<li>Überprüfung der Auto-ID beim Einfügen von Daten wurde übersprungen<a href="https://github.com/milvus-io/milvus/pull/32775">(#32775</a>)</li>
<li>Validierung der Anzahl von Zeilen für Insert-Felddaten mit Schema<a href="https://github.com/milvus-io/milvus/pull/32770">(#32770</a>)</li>
<li>Wrapper und Keepalive für CTraceContext IDs hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32746">(#32746</a>)</li>
<li>Problem behoben, bei dem der Datenbankname nicht im Datacoord-Metaobjekt gefunden wurde<a href="https://github.com/milvus-io/milvus/pull/33412">(#33412</a>)</li>
<li>Synchronisiertes verworfenes Segment für verworfene Partition<a href="https://github.com/milvus-io/milvus/pull/33332">(#33332</a>)</li>
<li>Fehler bei der Sammlung von quotaCenter-Metriken aufgrund von falschen Parametern behoben<a href="https://github.com/milvus-io/milvus/pull/33399">(#33399</a>)</li>
</ul>
<h2 id="v241" class="common-anchor-header">v2.4.1<button data-href="#v241" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Mai 6, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th><th>Java SDK-Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.1</td><td>2.4.1</td><td>2.4.0</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus Version 2.4.1 bringt zahlreiche Verbesserungen und Fehlerkorrekturen, die darauf abzielen, die Leistung, Beobachtbarkeit und Stabilität der Software zu verbessern. Zu diesen Verbesserungen gehören eine deklarative Ressourcengruppen-API, eine erweiterte Bulk-Insert-Funktionalität, die Float16/BFloat16-Vektordatentypen unterstützt, ein verfeinerter Garbage-Collection-Mechanismus (GC), der Listenoperationen für die Objektspeicherung reduziert, sowie weitere Änderungen im Zusammenhang mit Leistungsoptimierungen. Darüber hinaus wurden Fehler behoben, wie z. B. Kompilierungsfehler, fehlgeschlagene Fuzzy-Übereinstimmungen bei Zeilenumbrüchen, falsche Parameterdatentypen für RESTful-Schnittstellen und BulkInsert, das Fehler bei Numpy-Dateien auslöst, wenn dynamische Felder aktiviert sind.</p>
<h3 id="Breaking-changes" class="common-anchor-header">Behebbare Änderungen</h3><ul>
<li>Die Unterstützung für das Löschen mit einem leeren Filterausdruck wurde eingestellt.<a href="https://github.com/milvus-io/milvus/pull/32472">(#32472</a>)</li>
</ul>
<h3 id="Features" class="common-anchor-header">Funktionen</h3><ul>
<li>Unterstützung für Float16/BFloat16 Vektor-Datentypen in BulkInsert hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32157">(#32157</a>)</li>
<li>Verbesserter Sparse-Float-Vektor zur Unterstützung von Brute-Force-Iterator-Suche und Bereichs-Suche<a href="https://github.com/milvus-io/milvus/pull/32635">(#32635</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Deklarative Ressourcengruppen-Api hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/31930">(#31930</a>, <a href="https://github.com/milvus-io/milvus/pull/32297">#32297</a>, <a href="https://github.com/milvus-io/milvus/pull/32536">#32536</a>, <a href="https://github.com/milvus-io/milvus/pull/32666">#32666</a>)</li>
<li>Der Collection Observer in QueryCoord wurde umgeschrieben, um ihn aufgabenorientiert zu machen<a href="https://github.com/milvus-io/milvus/pull/32441">(#32441</a>)</li>
<li>Überarbeitung der Datenstruktur, die im SyncManager von DataNode verwendet wird, um die Speichernutzung zu reduzieren und Fehler zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/32673">(#32673</a>)</li>
<li>Die Implementierung der Garbage Collection wurde überarbeitet, um die mit der Objektspeicherung verbundenen Listenoperationen zu minimieren<a href="https://github.com/milvus-io/milvus/pull/31740">(#31740</a>)</li>
<li>Reduzierte die CPU-Auslastung bei einer hohen Anzahl von Sammlungen<a href="https://github.com/milvus-io/milvus/pull/32245">(#32245</a>)</li>
<li>Verbessertes Management von milvus.yaml durch automatische Generierung relevanter Konfigurationselemente in der milvus.yaml Datei durch Code<a href="https://github.com/milvus-io/milvus/pull/31832">(#31832</a>, <a href="https://github.com/milvus-io/milvus/pull/32357">#32357</a>)</li>
<li>Die Leistung der Abfrage wurde verbessert, indem die Daten nach der Durchführung einer lokalen Reduktion abgerufen werden<a href="https://github.com/milvus-io/milvus/pull/32346">(#32346</a>)</li>
<li>Option WithBlock für die Erstellung von etcd-Clients hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32641">(#32641</a>)</li>
<li>Verwendet die vom Client angegebene client_request_id als TraceID, wenn der Client diese angibt<a href="https://github.com/milvus-io/milvus/pull/32264">(#32264</a>)</li>
<li>db label zu den Metriken für die delete und bulk insert Operationen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/32611">(#32611</a>)</li>
<li>Logik hinzugefügt, um die Überprüfung durch die Konfiguration für AutoID und PartitionKey Spalten zu überspringen<a href="https://github.com/milvus-io/milvus/pull/32592">(#32592</a>)</li>
<li>Verfeinerte Fehler im Zusammenhang mit der Authentifizierung<a href="https://github.com/milvus-io/milvus/pull/32253">(#32253</a>)</li>
<li>Verfeinerte Fehlerprotokolle für AllocSegmentID in DataCoord<a href="https://github.com/milvus-io/milvus/pull/32351">(#32351</a>, <a href="https://github.com/milvus-io/milvus/pull/32335">#32335</a>)</li>
<li>Doppelte Metriken wurden entfernt<a href="https://github.com/milvus-io/milvus/pull/32380">(#32380</a>, <a href="https://github.com/milvus-io/milvus/pull/32308">#32308</a>) und unbenutzte Metriken aufgeräumt<a href="https://github.com/milvus-io/milvus/pull/32404">(#32404</a>, <a href="https://github.com/milvus-io/milvus/pull/32515">#32515</a>)</li>
<li>Konfigurationsoption hinzugefügt, um zu steuern, ob die Aktivierung der partitionKey-Funktion erzwungen werden soll<a href="https://github.com/milvus-io/milvus/pull/32433">(#32433</a>)</li>
<li>Konfigurationsoption hinzugefügt, um die maximale Datenmenge zu kontrollieren, die in einer einzigen Anfrage eingefügt werden kann<a href="https://github.com/milvus-io/milvus/pull/32433">(#32433</a>)</li>
<li>Parallelisierung der applyDelete-Operation auf Segment-Ebene, um die Verarbeitung von Delete-Nachrichten durch den Delegator zu beschleunigen<a href="https://github.com/milvus-io/milvus/pull/32291">(#32291</a>)</li>
<li>Verwendung von Index<a href="https://github.com/milvus-io/milvus/pull/32232">(#32232</a>, <a href="https://github.com/milvus-io/milvus/pull/32505">#32505</a>, <a href="https://github.com/milvus-io/milvus/pull/32533">#32533</a>, <a href="https://github.com/milvus-io/milvus/pull/32595">#32595</a>) und Add Cache<a href="https://github.com/milvus-io/milvus/pull/32580">(#32580</a>), um häufige Filterungsoperationen in QueryCoord zu beschleunigen.</li>
<li>Umschreiben der Datenstruktur<a href="https://github.com/milvus-io/milvus/pull/32273">(#32273</a>) und Refactoring des Codes<a href="https://github.com/milvus-io/milvus/pull/32389">(#32389</a>), um häufige Operationen in DataCoord zu beschleunigen.</li>
<li>Entfernt openblas aus conan<a href="https://github.com/milvus-io/milvus/pull/32002">(#32002</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Build-Milvus in rockylinux8 behoben<a href="https://github.com/milvus-io/milvus/pull/32619">(#32619</a>)</li>
<li>Kompilierungsfehler für SVE auf ARM behoben<a href="https://github.com/milvus-io/milvus/pull/32463">(#32463</a>, <a href="https://github.com/milvus-io/milvus/pull/32270">#32270</a>)</li>
<li>Das Absturzproblem auf ARM-basierten GPU-Images wurde behoben<a href="https://github.com/milvus-io/milvus/pull/31980">(#31980</a>)</li>
<li>Behoben: Regex-Abfrage kann Text mit Zeilenumbruch nicht verarbeiten<a href="https://github.com/milvus-io/milvus/pull/32569">(#32569</a>)</li>
<li>Korrigiert, dass die Suche leere Ergebnisse liefert, wenn GetShardLeaders eine leere Knotenliste zurückgibt<a href="https://github.com/milvus-io/milvus/pull/32685">(#32685</a>)</li>
<li>Korrigierter BulkInsert-Fehler beim Auffinden von dynamischen Feldern in Numpy-Dateien<a href="https://github.com/milvus-io/milvus/pull/32596">(#32596</a>)</li>
<li>Fehler im Zusammenhang mit der RESTFulV2-Schnittstelle behoben, einschließlich eines wichtigen Fixes, der es numerischen Parametern in Anfragen erlaubt, numerische Eingaben anstelle von Strings zu akzeptieren<a href="https://github.com/milvus-io/milvus/pull/32485">(#32485</a>, <a href="https://github.com/milvus-io/milvus/pull/32355">#32355</a>)</li>
<li>Speicherleck im Proxy behoben, indem das beobachtende Konfigurationsereignis im Ratenbegrenzer entfernt wurde<a href="https://github.com/milvus-io/milvus/pull/32313">(#32313</a>)</li>
<li>Problem behoben, bei dem der Ratenbegrenzer fälschlicherweise meldet, dass die Partition nicht gefunden werden kann, wenn partitionName nicht angegeben ist<a href="https://github.com/milvus-io/milvus/pull/32647">(#32647</a>)</li>
<li>Es wurde eine Erkennung zwischen den Fällen hinzugefügt, in denen sich die Sammlung im Wiederherstellungszustand befindet und im Fehlertyp nicht geladen ist.<a href="https://github.com/milvus-io/milvus/pull/32447">(#32447</a>)</li>
<li>Die Metrik für negative abfragbare num Entitäten wurde korrigiert<a href="https://github.com/milvus-io/milvus/pull/32361">(#32361</a>)</li>
</ul>
<h2 id="v240" class="common-anchor-header">v2.4.0<button data-href="#v240" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: April 17, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK Version</th><th>Node.js SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.0</td><td>2.4.0</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die offizielle Markteinführung von Milvus 2.4.0 bekannt zu geben. Aufbauend auf der soliden Grundlage der Version 2.4.0-rc.1 haben wir uns darauf konzentriert, kritische Fehler zu beheben, die von unseren Benutzern gemeldet wurden, und gleichzeitig die bestehende Funktionalität zu erhalten. Darüber hinaus führt Milvus 2.4.0 eine Reihe von Optimierungen ein, die darauf abzielen, die Systemleistung zu erhöhen, die Beobachtbarkeit durch die Einbeziehung verschiedener Metriken zu verbessern und die Codebasis für eine größere Einfachheit zu verschlanken.</p>
<h3 id="Improvements" class="common-anchor-header">Verbesserungen</h3><ul>
<li>Unterstützung für MinIO TLS-Verbindungen<a href="https://github.com/milvus-io/milvus/pull/31396">(#31396</a>, <a href="https://github.com/milvus-io/milvus/pull/31618">#31618</a>)</li>
<li>AutoIndex-Unterstützung für skalare Felder<a href="https://github.com/milvus-io/milvus/pull/31593">(#31593</a>)</li>
<li>Hybrid Search Refactoring für konsistente Ausführungspfade mit regulärer Suche<a href="https://github.com/milvus-io/milvus/pull/31742">(#31742</a>, <a href="https://github.com/milvus-io/milvus/pull/32178">#32178</a>)</li>
<li>Beschleunigte Filterung durch Bitset und Bitset_view Refaktorierung<a href="https://github.com/milvus-io/milvus/pull/31592">(#31592</a>, <a href="https://github.com/milvus-io/milvus/pull/31754">#31754</a>, <a href="https://github.com/milvus-io/milvus/pull/32139">#32139</a>)</li>
<li>Importaufgaben unterstützen nun das Warten auf den Abschluss des Datenindexes<a href="https://github.com/milvus-io/milvus/pull/31733">(#31733</a>)</li>
<li>Verbesserte Importkompatibilität<a href="https://github.com/milvus-io/milvus/pull/32121">(#32121</a>), Aufgabenplanung<a href="https://github.com/milvus-io/milvus/pull/31475">(#31475</a>) und Begrenzung der Größe und Anzahl importierter Dateien<a href="https://github.com/milvus-io/milvus/pull/31542">(#31542</a>)</li>
<li>Code-Vereinfachung, einschließlich Schnittstellen-Standardisierung für Typüberprüfung<a href="https://github.com/milvus-io/milvus/pull/31945">(#31945</a>, <a href="https://github.com/milvus-io/milvus/pull/31857">#31857</a>), Entfernung von veraltetem Code und Metriken<a href="https://github.com/milvus-io/milvus/pull/32079">(#32079</a>, <a href="https://github.com/milvus-io/milvus/pull/32134">#32134</a>, <a href="https://github.com/milvus-io/milvus/pull/31535">#31535</a>, <a href="https://github.com/milvus-io/milvus/pull/32211">#32211</a>, <a href="https://github.com/milvus-io/milvus/pull/31935">#31935</a>) und Normalisierung von Konstantennamen<a href="https://github.com/milvus-io/milvus/pull/31515">(#31515</a>)</li>
<li>Neue Metriken für QueryCoord, die Verzögerung des aktuellen Zielkanalprüfpunkts (<a href="https://github.com/milvus-io/milvus/pull/31420">#31420</a>)</li>
<li>Neue db-Bezeichnung für allgemeine Metriken<a href="https://github.com/milvus-io/milvus/pull/32024">(#32024</a>)</li>
<li>Neue Metriken bezüglich der Anzahl gelöschter, indizierter und geladener Entitäten, mit der Einbeziehung von Bezeichnungen wie collectionName und dbName<a href="https://github.com/milvus-io/milvus/pull/31861">(#31861</a>)</li>
<li>Verbesserungen bei der Fehlerbehandlung für nicht übereinstimmende Vektortypen<a href="https://github.com/milvus-io/milvus/pull/31766">(#31766</a>)</li>
<li>Unterstützung für das Auslösen von Fehlern anstelle eines Absturzes, wenn der Index nicht erstellt werden kann<a href="https://github.com/milvus-io/milvus/pull/31845">(#31845</a>)</li>
<li>Unterstützung für die Invalidierung des Datenbank-Meta-Cache beim Löschen von Datenbanken<a href="https://github.com/milvus-io/milvus/pull/32092">(#32092</a>)</li>
<li>Überarbeitung der Schnittstelle für die Kanalverteilung<a href="https://github.com/milvus-io/milvus/pull/31814">(#31814</a>) und die Verwaltung von Leader Views<a href="https://github.com/milvus-io/milvus/pull/32127">(#32127</a>)</li>
<li>Refactor channel dist manager interface<a href="https://github.com/milvus-io/milvus/pull/31814">(#31814</a>) und Refactor leader view manager interface<a href="https://github.com/milvus-io/milvus/pull/32127">(#32127</a>)</li>
<li>Stapelverarbeitung<a href="https://github.com/milvus-io/milvus/pull/31632">(#31632</a>), Hinzufügen von Zuordnungsinformationen<a href="https://github.com/milvus-io/milvus/pull/32234">(#32234</a>, <a href="https://github.com/milvus-io/milvus/pull/32249">#32249</a>) und Vermeidung der Verwendung von Sperren<a href="https://github.com/milvus-io/milvus/pull/31787">(#31787</a>) zur Beschleunigung häufig aufgerufener Operationen</li>
</ul>
<h3 id="Breaking-Changes" class="common-anchor-header">Aufhebende Änderungen</h3><ul>
<li>Abschaffung der Gruppierungssuche bei binären Vektoren<a href="https://github.com/milvus-io/milvus/pull/31735">(#31735</a>)</li>
<li>Abgekündigte Gruppierungssuche mit hybrider Suche<a href="https://github.com/milvus-io/milvus/pull/31812">(#31812</a>)</li>
<li>HNSW-Index für binäre Vektoren wurde eingestellt<a href="https://github.com/milvus-io/milvus/pull/31883">(#31883</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Fehlerbehebungen</h3><ul>
<li>Verbesserte Datentyp- und Werteprüfungen für Abfragen und Einfügungen, um Abstürze zu verhindern<a href="https://github.com/milvus-io/milvus/pull/31478">(#31478</a>, <a href="https://github.com/milvus-io/milvus/pull/31653">#31653</a>, <a href="https://github.com/milvus-io/milvus/pull/31698">#31698</a>, <a href="https://github.com/milvus-io/milvus/pull/31842">#31842</a>, <a href="https://github.com/milvus-io/milvus/pull/32042">#32042</a>, <a href="https://github.com/milvus-io/milvus/pull/32251">#32251</a>, <a href="https://github.com/milvus-io/milvus/pull/32204">#32204</a>)</li>
<li>RESTful API Fehlerbehebungen<a href="https://github.com/milvus-io/milvus/pull/32160">(#32160</a>)</li>
<li>Verbesserte Vorhersage des Ressourcenverbrauchs bei invertierten Indizes<a href="https://github.com/milvus-io/milvus/pull/31641">(#31641</a>)</li>
<li>Behebung von Verbindungsproblemen mit etcd, wenn Autorisierung aktiviert ist<a href="https://github.com/milvus-io/milvus/pull/31668">(#31668</a>)</li>
<li>Sicherheitsupdate für nats Server<a href="https://github.com/milvus-io/milvus/pull/32023">(#32023</a>)</li>
<li>Speichern von invertierten Index-Dateien in einem lokalen Speicherpfad von QueryNode statt /tmp<a href="https://github.com/milvus-io/milvus/pull/32210">(#32210</a>)</li>
<li>Adressierte Datenordner-Speicherlecks für collectionInfo<a href="https://github.com/milvus-io/milvus/pull/32243">(#32243</a>)</li>
<li>Korrekturen für fp16/bf16 bezogene Fehler, die möglicherweise eine Systempanik verursachen konnten<a href="https://github.com/milvus-io/milvus/pull/31677">(#31677</a>, <a href="https://github.com/milvus-io/milvus/pull/31841">#31841</a>, <a href="https://github.com/milvus-io/milvus/pull/32196">#32196</a>)</li>
<li>Behebung von Problemen mit der Gruppierungssuche, die unzureichende Ergebnisse lieferte<a href="https://github.com/milvus-io/milvus/pull/32151">(#32151</a>)</li>
<li>Anpassung der Suche mit Iteratoren, um Offsets im Reduce-Schritt effektiver zu behandeln und adäquate Ergebnisse mit aktiviertem "reduceStopForBest" zu gewährleisten<a href="https://github.com/milvus-io/milvus/pull/32088">(#32088</a>)</li>
</ul>
<h2 id="v240-rc1" class="common-anchor-header">v2.4.0-rc.1<button data-href="#v240-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: März 20, 2024</p>
<table>
<thead>
<tr><th>Milvus-Version</th><th>Python SDK-Version</th></tr>
</thead>
<tbody>
<tr><td>2.4.0-rc.1</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>Mit dieser Version werden mehrere szenariobasierte Funktionen eingeführt:</p>
<ul>
<li><p><strong>Neuer GPU-Index - CAGRA</strong>: Dank des Beitrags von NVIDIA bietet dieser neue GPU-Index eine 10-fache Leistungssteigerung, insbesondere bei Batch-Suchen. Einzelheiten finden Sie unter <a href="/docs/de/gpu_index.md">GPU-Index</a>.</p></li>
<li><p><strong>Multi-Vektor-</strong> und <strong>Hybrid-Suche</strong>: Diese Funktion ermöglicht die Speicherung von Vektoreinbettungen aus mehreren Modellen und die Durchführung hybrider Suchen. Weitere Informationen finden Sie unter <a href="/docs/de/multi-vector-search.md">Hybride Suche</a>.</p></li>
<li><p><strong>Spärliche Vektoren</strong>: Sparse Vectors sind ideal für die Interpretation und Analyse von Schlüsselwörtern und werden jetzt für die Verarbeitung in Ihrer Sammlung unterstützt. Weitere Informationen finden Sie unter <a href="/docs/de/sparse_vector.md">Spärliche Vektoren</a>.</p></li>
<li><p><strong>Gruppierungssuche</strong>: Die kategoriale Aggregation verbessert den Abruf auf Dokumentenebene für Retrieval-Augmented Generation (RAG)-Anwendungen. Einzelheiten finden Sie unter <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Gruppierungssuche</a>.</p></li>
<li><p><strong>Invertierter Index</strong> und <strong>Fuzzy Matching</strong>: Diese Funktionen verbessern die Suche nach Schlüsselwörtern für skalare Felder. Weitere Informationen finden Sie unter <a href="/docs/de/index-scalar-fields.md">Skalare Felder indizieren</a> und <a href="/docs/de/single-vector-search.md#filtered-search">gefilterte Suche</a>.</p></li>
</ul>
<h3 id="New-Features" class="common-anchor-header">Neue Funktionen</h3><h4 id="GPU-Index---CAGRA" class="common-anchor-header">GPU-Index - CAGRA</h4><p>Wir möchten dem NVIDIA-Team unseren aufrichtigen Dank für seinen unschätzbaren Beitrag zu CAGRA aussprechen, einem hochmodernen (SoTA) GPU-basierten Graph-Index, der online verwendet werden kann.</p>
<p>Im Gegensatz zu früheren GPU-Indizes zeigt CAGRA selbst bei kleinen Batch-Abfragen eine überwältigende Überlegenheit, ein Bereich, in dem CPU-Indizes traditionell überragend sind. Darüber hinaus ist die Leistung von CAGRA bei großen Batch-Abfragen und bei der Geschwindigkeit des Indexaufbaus - Bereiche, in denen GPU-Indizes bereits glänzen - wirklich beispiellos.</p>
<p>Ein Beispielcode ist in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_gpu_cagra.py">example_gpu_cagra.py</a> zu finden.</p>
<h4 id="Sparse-Vector-Beta" class="common-anchor-header">Sparse Vector (Beta)</h4><p>In dieser Version führen wir einen neuen Typ von Vektorfeldern ein, den Sparse Vector. Sparse Vektoren unterscheiden sich von ihren dichten Gegenstücken, da sie in der Regel eine um ein Vielfaches höhere Anzahl von Dimensionen haben, von denen nur eine Handvoll ungleich Null ist. Diese Eigenschaft bietet eine bessere Interpretierbarkeit aufgrund ihrer termbasierten Natur und kann in bestimmten Bereichen effektiver sein. Gelernte Sparse-Modelle wie SPLADEv2/BGE-M3 haben sich als sehr nützlich für gängige First-Stage-Ranking-Aufgaben erwiesen. Der Hauptanwendungsfall für diese neue Funktion in Milvus ist die Ermöglichung einer effizienten semantischen Näherungssuche über spärliche Vektoren, die von neuronalen Modellen wie SPLADEv2/BGE-M3 und Statistikmodellen wie dem BM25-Algorithmus erzeugt werden. Milvus unterstützt nun die effektive und leistungsstarke Speicherung, Indizierung und Suche (MIPS, Maximum Inner Product Search) von spärlichen Vektoren.</p>
<p>Ein Beispielcode ist in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hello_sparse.py">hello_sparse.py</a> zu finden.</p>
<h4 id="Multi-Embedding---Hybrid-Search" class="common-anchor-header">Multi-Embedding &amp; Hybride Suche</h4><p>Die Unterstützung mehrerer Vektoren ist der Grundstein für Anwendungen, die eine Datenverarbeitung mit mehreren Modellen oder eine Mischung aus dichten und spärlichen Vektoren erfordern. Mit der Multi-Vektor-Unterstützung können Sie jetzt:</p>
<ul>
<li>Speichern von Vektoreinbettungen, die für unstrukturierte Text-, Bild- oder Audiobeispiele aus mehreren Modellen generiert wurden.</li>
<li>ANN-Suchen durchführen, die mehrere Vektoren jeder Entität umfassen.</li>
<li>Suchstrategien anpassen, indem Sie verschiedenen Einbettungsmodellen Gewichte zuweisen.</li>
<li>Experimentieren Sie mit verschiedenen Einbettungsmodellen, um die optimale Modellkombination zu finden.</li>
</ul>
<p>Die Unterstützung für mehrere Vektoren ermöglicht das Speichern, Indizieren und Anwenden von Reranking-Strategien auf mehrere Vektorfelder unterschiedlichen Typs, wie FLOAT_VECTOR und SPARSE_FLOAT_VECTOR, in einer Sammlung. Derzeit sind zwei Rangordnungsstrategien verfügbar: <strong>Reciprocal Rank Fusion (RRF)</strong> und <strong>Average Weighted Scoring</strong>. Beide Strategien kombinieren die Suchergebnisse aus verschiedenen Vektorfeldern zu einer einheitlichen Ergebnismenge. Die erste Strategie priorisiert die Entitäten, die immer wieder in den Suchergebnissen verschiedener Vektorfelder auftauchen, während die andere Strategie den Suchergebnissen der einzelnen Vektorfelder Gewichte zuweist, um ihre Bedeutung in der endgültigen Ergebnismenge zu bestimmen.</p>
<p>Ein Beispielcode ist in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hybrid_search.py">hybrid_search.py</a> zu finden.</p>
<h4 id="Inverted-Index-and-Fuzzy-Match" class="common-anchor-header">Invertierter Index und Fuzzy Match</h4><p>In früheren Versionen von Milvus wurden speicherbasierte binäre Suchindizes und Marisa-Trie-Indizes für die Indizierung skalarer Felder verwendet. Diese Methoden waren jedoch sehr speicherintensiv. Die neueste Version von Milvus verwendet nun den Tantivy-basierten invertierten Index, der auf alle numerischen und String-Datentypen angewendet werden kann. Dieser neue Index verbessert die Leistung skalarer Abfragen drastisch und reduziert die Abfrage von Schlüsselwörtern in Strings um das Zehnfache. Darüber hinaus verbraucht der invertierte Index dank zusätzlicher Optimierungen bei der Datenkomprimierung und dem Memory-mapped storage (MMap)-Mechanismus der internen Indizierungsstruktur weniger Speicher.</p>
<p>Diese Version unterstützt auch unscharfe Übereinstimmungen bei der skalaren Filterung mit Präfixen, Infixen und Suffixen.</p>
<p>Beispielcode finden Sie in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/inverted_index_example.py">inverted_index_example.py</a> und <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/fuzzy_match.py">fuzzy_match.py</a>.</p>
<h4 id="Grouping-Search" class="common-anchor-header">Gruppierte Suche</h4><p>Sie können nun die Suchergebnisse nach den Werten in einem bestimmten skalaren Feld gruppieren. Dies hilft RAG-Anwendungen bei der Implementierung eines Rückrufs auf Dokumentenebene. Betrachten Sie eine Sammlung von Dokumenten, wobei jedes Dokument in verschiedene Passagen aufgeteilt ist. Jede Passage wird durch eine Vektoreinbettung dargestellt und gehört zu einem Dokument. Um die relevantesten Dokumente anstelle der verstreuten Passagen zu finden, können Sie das Argument group_by_field in die search()-Operation aufnehmen, um die Ergebnisse nach der Dokument-ID zu gruppieren.</p>
<p>Ein Beispielcode findet sich in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_group_by.py">example_group_by.py</a>.</p>
<h4 id="Float16-and-BFloat--Vector-DataType" class="common-anchor-header">Float16 und BFloat- Vektor Datentyp</h4><p>Maschinelles Lernen und neuronale Netze verwenden häufig Datentypen mit halber Genauigkeit, wie Float16 und BFloat. Während diese Datentypen die Abfrageeffizienz verbessern und die Speichernutzung reduzieren können, haben sie den Nachteil einer geringeren Genauigkeit. Mit dieser Version unterstützt Milvus nun diese Datentypen für Vektorfelder.</p>
<p>Beispielcode finden Sie in <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/float16_example.py">float16_example.py</a> und <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/bfloat16_example.py">bfloat16_example.py</a>.</p>
<h3 id="Upgraded-Architecture" class="common-anchor-header">Verbesserte Architektur</h3><h4 id="L0-Segment" class="common-anchor-header">L0-Segment</h4><p>Diese Version enthält ein neues Segment namens L0-Segment, das zur Aufzeichnung gelöschter Daten dient. Dieses Segment verdichtet regelmäßig die gespeicherten gelöschten Datensätze und teilt sie in versiegelte Segmente auf, wodurch die Anzahl der Datenflushs, die für kleine Löschungen erforderlich sind, reduziert wird und ein geringer Speicherplatzbedarf entsteht. Mit diesem Mechanismus trennt Milvus die Datenverdichtung vollständig von den Datenflushs und verbessert so die Leistung von Lösch- und Upsert-Operationen.</p>
<h4 id="Refactored-BulkInsert" class="common-anchor-header">Überarbeitetes BulkInsert</h4><p>Mit dieser Version wurde auch die Logik für Masseneinfügungen verbessert. Damit können Sie mehrere Dateien in einer einzigen BulkInsert-Anforderung importieren. Mit der überarbeiteten Version wurden sowohl die Leistung als auch die Stabilität von BulkInsert deutlich verbessert. Auch die Benutzerfreundlichkeit wurde verbessert, z. B. durch eine fein abgestimmte Ratenbegrenzung und benutzerfreundlichere Fehlermeldungen. Darüber hinaus können Sie über die RESTful-API von Milvus einfach auf die Bulk-Insert-Endpunkte zugreifen.</p>
<h4 id="Memory-mapped-Storage" class="common-anchor-header">Memory-mapped Speicherung</h4><p>Milvus verwendet Memory-mapped Storage (MMap), um die Speichernutzung zu optimieren. Anstatt den Dateiinhalt direkt in den Speicher zu laden, ordnet dieser Mechanismus den Dateiinhalt dem Speicher zu. Dieser Ansatz geht mit einer Leistungsverschlechterung einher.  Wenn Sie MMap für eine HNSW-indizierte Sammlung auf einem Host mit 2 CPUs und 8 GB RAM aktivieren, können Sie 4x mehr Daten mit weniger als 10 % Leistungseinbußen laden.</p>
<p>Darüber hinaus ermöglicht diese Version eine dynamische und feinkörnige Kontrolle über MMap, ohne dass Milvus neu gestartet werden muss.</p>
<p>Einzelheiten finden Sie unter <a href="/docs/de/mmap.md">MMap-Speicher</a>.</p>
<h3 id="Others" class="common-anchor-header">Andere</h3><h4 id="Milvus-CDC" class="common-anchor-header">Milvus-CDC</h4><p>Milvus-CDC ist ein benutzerfreundliches Zusatztool zur Erfassung und Synchronisierung inkrementeller Daten zwischen Milvus-Instanzen, das eine einfache inkrementelle Sicherung und Disaster Recovery ermöglicht. In dieser Version wurde die Stabilität von Milvus-CDC verbessert, und die Change Data Capture (CDC)-Funktionalität ist nun allgemein verfügbar.</p>
<p>Um mehr über Milvus-CDC zu erfahren, besuchen Sie das <a href="https://github.com/zilliztech/milvus-cdc">GitHub Repository</a> und die <a href="/docs/de/milvus-cdc-overview.md">Milvus-CDC Übersicht</a>.</p>
<h4 id="Refined-MilvusClient-Interfaces" class="common-anchor-header">Verfeinerte MilvusClient-Schnittstellen</h4><p>MilvusClient ist eine einfach zu bedienende Alternative zum ORM-Modul. Es verfolgt einen rein funktionalen Ansatz, um die Interaktion mit dem Server zu vereinfachen. Anstatt einen Verbindungspool zu unterhalten, baut jeder MilvusClient eine gRPC-Verbindung zum Server auf. Das MilvusClient-Modul hat die meisten Funktionen des ORM-Moduls implementiert. Um mehr über das MilvusClient-Modul zu erfahren, besuchen Sie <a href="https://github.com/milvus-io/pymilvus">pymilvus</a> und die <a href="/api-reference/pymilvus/v2.4.x/About.md">Referenzdokumente</a>.</p>
