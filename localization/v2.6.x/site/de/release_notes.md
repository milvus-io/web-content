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
    </button></h1><p>Finden Sie heraus, was es Neues in Milvus gibt! Auf dieser Seite werden neue Funktionen, Verbesserungen, bekannte Probleme und Fehlerbehebungen in jeder Version zusammengefasst. In diesem Abschnitt finden Sie die Versionshinweise für jede veröffentlichte Version nach v2.6.0. Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um sich über Updates zu informieren.</p>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Oktober 11, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus-Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK-Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.3 ankündigen zu können, die eine Vielzahl von interessanten neuen Funktionen, Verbesserungen und kritischen Fehlerkorrekturen enthält. Diese Version verbessert die Systemleistung, erweitert den Funktionsumfang und behebt wichtige Probleme, um allen Benutzern ein stabileres Erlebnis zu bieten. Im Folgenden finden Sie die Highlights dieser Version:</p>
<h3 id="New-Features" class="common-anchor-header">Neue Funktionen<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>Primärschlüssel mit aktivierter AutoID: Benutzer können jetzt das Primärschlüsselfeld schreiben, wenn <code translate="no">autoid</code> aktiviert ist.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Manuelle Verdichtung für L0-Segmente: Unterstützung für die manuelle Verdichtung von L0-Segmenten wurde hinzugefügt.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>Cluster-ID-Kodierung in AutoID: Automatisch generierte IDs enthalten jetzt die Cluster-ID.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>gRPC Tokenizer Unterstützung: Integration von gRPC Tokenizer für mehr Flexibilität bei Abfragen.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
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
<li>Verfeinerung der Gleichgewichtsprüfung durch Implementierung einer Prioritätswarteschlange, wodurch die Aufgabenverteilung verbessert wurde.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>Vorgeladene BM25-Statistiken für versiegelte Segmente und optimierte Serialisierung.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Nullbare Felder können nun als Eingabe für BM25-Funktionen verwendet werden.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>Unterstützung für Azure Blob Storage in Woodpecker hinzugefügt.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Kleine Dateien werden nun direkt nach der Woodpecker-Segmentkomprimierung bereinigt.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>Die Funktion für zufällige Ergebnisse bei Boosting-Abfragen wurde aktiviert.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>Neue Konfigurationsoptionen für den <code translate="no">int8</code> Vektortyp in der Autoindizierung.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>Neue Parameter zur Steuerung der hybriden Suchabfragepolitik.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>Unterstützung für die Steuerung des Einfügens von Funktionsausgabefeldern wurde hinzugefügt.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>Die Decay-Funktion unterstützt nun eine konfigurierbare Zusammenführung von Ergebnissen für eine bessere Leistung.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>Die Leistung der binären Suche bei Strings wurde verbessert.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>Es wurde Unterstützung für spärliche Filter in Abfragen eingeführt. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>Verschiedene Aktualisierungen zur Verbesserung der Funktionalität von Tiered Index.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>Verfolgung der Speicherressourcennutzung für skalare und vektorielle Abfragen hinzugefügt.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>Speichernutzung für delete/upsert/restful hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>Aktivierte granulare Flush-Ziele für <code translate="no">flushall</code> Operationen.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>Datanodes verwenden nun ein Nicht-Singleton-Dateisystem für eine bessere Ressourcenverwaltung.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>Konfigurationsoptionen für die Stapelverarbeitung in den Metadaten hinzugefügt. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>Fehlermeldungen enthalten jetzt den Datenbanknamen zur besseren Übersichtlichkeit.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>Der Tracer-Test wurde zur besseren Modularisierung in das Repository <code translate="no">milvus-common</code> verschoben.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>Die C-API-Unit-Testdateien wurden zur besseren Organisation in das Verzeichnis <code translate="no">src</code> ausgelagert.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>Go SDK erlaubt nun das Einfügen von Primärschlüsseldaten, wenn <code translate="no">autoid</code> aktiviert ist.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
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
<li>Behebung der Sicherheitslücken CVE-2020-25576 und WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>Es wurde ein Problem behoben, bei dem logische Ressourcen für Metriken im Quota Center auf Streaming-Knoten verwendet wurden.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>Setzen von <code translate="no">mixcoord</code> in <code translate="no">activatefunc</code> bei Aktivierung von Standby.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>Redundante Initialisierung von Storage-V2-Komponenten wurde entfernt. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Das Blockieren der Verdichtungsaufgabe aufgrund eines Executor-Schleifenausgangs wurde behoben.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>Die Verwendung geladener Ressourcen im <code translate="no">insert/deleterecord</code> Destruktor wurde zurückgesetzt.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>Es wurde ein Problem behoben, bei dem der Replikator nicht gestoppt werden konnte, und der Validator der Replikatkonfiguration wurde verbessert.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>Setzt <code translate="no">mmap_file_raii_</code> auf <code translate="no">nullptr</code>, wenn mmap deaktiviert ist.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li><code translate="no">diskfilemanager</code> verwendet nun das Dateisystem aus dem Kontext.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>Erzwungener virtueller Host für OSS und COS in Storage V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>Aus Kompatibilitätsgründen wurde <code translate="no">report_value</code> als Standardwert gesetzt, wenn <code translate="no">extrainfo</code> nicht <code translate="no">nil</code> ist.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>Aufgeräumte Sammlungsmetriken nach dem Löschen von Sammlungen in rootcoord.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>Fehler beim Laden von Segmenten aufgrund von doppelten Eigenschaften des Feldes <code translate="no">mmap.enable</code> behoben.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>Fehler beim Parsen der Ladekonfiguration für dynamische Replikate behoben.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Behandlung der Zeile-zu-Spalte-Eingabe für dynamische Spalten im Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: September 19, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus-Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.2 ankündigen zu können! Dieses Update bietet leistungsstarke neue Funktionen, erhebliche Leistungsverbesserungen und kritische Fehlerbehebungen, die das System stabiler und produktionsfähiger machen. Zu den Highlights gehören partielle Feldaktualisierungen mit Upsert, JSON Shredding zur Beschleunigung der dynamischen Feldfilterung, NGram-Indizierung für schnellere LIKE-Abfragen und eine flexiblere Schemaentwicklung für bestehende Sammlungen. Diese Version basiert auf dem Feedback der Community und bietet eine solidere Grundlage für reale Implementierungen. Wir empfehlen allen Benutzern ein Upgrade, um von diesen Verbesserungen zu profitieren.</p>
<h3 id="Features" class="common-anchor-header">Funktionen<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Unterstützung für JSON Shredding wurde hinzugefügt, um die dynamische Feldfilterung zu beschleunigen. Einzelheiten finden Sie unter <a href="/docs/de/json-shredding.md">JSON Shredding</a>.</li>
<li>Unterstützung für NGRAM Index wurde hinzugefügt, um ähnliche Operationen zu beschleunigen. Einzelheiten finden Sie unter <a href="/docs/de/ngram.md">NGRAM</a>.</li>
<li>Unterstützung für partielle Feldaktualisierungen mit Upsert API wurde hinzugefügt. Details finden Sie unter <a href="/docs/de/upsert-entities.md">Upsert Entities</a>.</li>
<li>Unterstützung für die Boost-Funktion wurde hinzugefügt. Weitere Informationen finden Sie unter <a href="/docs/de/boost-ranker.md">Boost Ranker</a>.</li>
<li>Unterstützung für die Gruppierung nach JSON-Feldern und dynamischen Feldern wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>Unterstützung für die Aktivierung des dynamischen Schemas für bestehende Sammlungen wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>Unterstützung für das Löschen von Indizes ohne Freigabe von Sammlungen wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
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
<li>[StorageV2] Die Größe der Logdatei wurde auf komprimierte Größe geändert<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Kind-Felder in Ladeinformationen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] Unterstützung für die Aufnahme von Partitions- und Clustering-Schlüsseln in die Systemgruppe hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Timeout für Verdichtungsaufgaben entfernt<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Ermöglicht die Erstellung mit Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Verwendete Gruppen-Infos zur Abschätzung der Logiknutzung<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Verwendete Gruppen-Split-Infos zur Abschätzung der Nutzung<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] Gespeicherte Spaltengruppen-Ergebnisse in der Verdichtung<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Konfigurationen für größenbasierte Aufteilungsrichtlinien hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] Unterstützung für schemabasierte und größenbasierte Aufteilungsrichtlinie hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] Konfigurierbare Split-Richtlinie hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] Weitere Metriken und Konfigurationen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Unterstützung für das Warten auf die Bereitschaft aller Indizes vor dem Laden von Segmenten hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Interne Kern-Latenz-Metrik für Rescore-Knoten hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>Optimiertes Zugriffsprotokollformat beim Drucken von KV-Parametern<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Konfiguration hinzugefügt, um die Größe von Dump-Snapshot-Batches zu ändern<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>Reduziertes Bereinigungsintervall für Verdichtungsaufgaben<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>Verbessertes Merge-Sortieren zur Unterstützung mehrerer Felder<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Abschätzung der Lastressourcen für Tiered Index hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>Autoindex-Konfiguration für Deduplizierungsfall hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Konfiguration hinzugefügt, um benutzerdefinierte Zeichen in Namen zu erlauben (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Unterstützung für cchannel für Streaming-Dienst hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Mutex und Bereichsüberprüfung hinzugefügt, um gleichzeitige Löschungen zu schützen<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
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
<li>Angleichung des Verhaltens von exists-Ausdrücken zwischen Brute-Force und Index<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Fehler beim Umbenennen in eine gelöschte Sammlung behoben<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Überprüfte Länge von Child-Feldern<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Azure wurde standardmäßig aktiviert<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Korrigierter Upload-Pfad von L0-Verdichtungen unter Pooling-Datanodes<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>Unzulässige Umbenennung, wenn Datenbank-Verschlüsselung aktiviert ist<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Löschung der Eigenschaft dynamicfield.enable wurde nicht zugelassen<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>Markierte Aufgaben als fehlgeschlagen, wenn die vorher zugewiesene ID ungültig ist<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Übersprungene MVCC Prüfungen bei PK Vergleichsausdrücken<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>Korrigierter json_contains Bug für Stats<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Initialisierungs-Dateisystem-Prüfung für Abfrage- und Streaming-Knoten hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Korrigiertes leeres Verdichtungsziel, wenn das Segment garbage collected wurde<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Korrigierte Race Condition bei der Initialisierung des Zeitstempel-Index<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Überprüft, ob arraydata null ist, um Panik zu verhindern<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Korrigierter Fehler beim Erstellen von JSON-Statistiken für verschachtelte Objekte<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Vermeidet mmap-Rewrite bei mehreren JSON-Feldern<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Vereinheitlichte gültige Datenformate<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Versteckte Anmeldeinformationen von Einbettungs-/Ranking-Anbietern in der Web UI<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Korrigierter Statslog-Pfad unter Pooling-Datanodes<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>Der Pfad des IDF-Orakels wurde korrigiert<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Verwendete Wiederherstellungs-Snapshot Checkpoint, wenn kein vchannel wiederhergestellt wird<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Begrenzte Spaltenanzahl in JSON-Statistiken<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Last-Ressourcen-Zählung wurde zu einem n-gram Index<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>Ableitung des Metrik-Typs aus nicht-leeren Suchergebnissen<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Behoben: Multi-Segment-Schreiben schreibt nur ein Segment<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Reparierte Merge-Sortierung außerhalb des Bereichs<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>UTF-8 Prüfung vor Ausführung der BM25 Funktion hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Wiederholung der alten Session, wenn sie existiert<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Kafka Puffergrößen-Limit hinzugefügt, um Datenknoten OOM zu verhindern<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>Panik durch Erweiterung des Lock Guarding Bereichs behoben<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>Korrigierte wachsende Segmente, die bei Schema-Änderung nicht gespült wurden<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Behandelte IO-Fehler<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>Verhinderte Panik, wenn der Tantivy-Index-Pfad nicht existiert<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: September 3, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.1 ankündigen zu können! Diese Version baut auf den großen architektonischen Fortschritten früherer Versionen auf und bietet entscheidende Verbesserungen, die sich auf die Produktionsstabilität, die Leistung und die Betriebsstabilität konzentrieren. Diese Version berücksichtigt wichtige Rückmeldungen aus der Community und stärkt das System für groß angelegte Einsätze. Wir empfehlen allen Anwendern dringend ein Upgrade, um von einem stabileren, leistungsfähigeren und zuverlässigeren System zu profitieren.</p>
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
<li>Unterstützung von POSIX-kompatiblen Dateisystemen für die Fernspeicherung<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Einführung von modellbasierten Rerankern<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Optimiert die Leistung von Vergleichsausdrücken auf Primärschlüsselfeldern<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Sammelt doc_id direkt aus der Buchungsliste, um den Textabgleich zu beschleunigen<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Optimiert die Abfrageleistung durch Konvertierung mehrerer != Bedingungen in eine einzige NOT IN Klausel<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Verbessertes Ressourcenmanagement für die Caching-Schicht beim Laden von Segmenten<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>Verbessert die Speicherabschätzung für Zwischenindizes während des Datenladens<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Konfiguriert das Aufbauverhältnis für Zwischenindizes<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Fügt ein konfigurierbares Schreibratenlimit für den Disk Writer hinzu<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>SegCore-Parameter können nun dynamisch aktualisiert werden, ohne dass der Milvus-Dienst neu gestartet werden muss<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Fügt einheitliche gRPC Latenzmetriken für bessere Beobachtbarkeit hinzu<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Enthält Zeitstempel für Client-Anfragen in gRPC-Header, um die Fehlersuche zu vereinfachen<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Unterstützt Trace Log Level für segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Fügt einen konfigurierbaren Schalter hinzu, um Konsistenzgarantien für höhere Verfügbarkeit anzupassen<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Implementiert einen robusten Rewatch-Mechanismus zur Behandlung von etcd-Verbindungsfehlern<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Verbessert die interne Logik zur Überprüfung des Knotenzustands<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Optimiert den Zugriff auf Metadaten beim Auflisten von Sammlungen<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Aktualisiert den Pulsar-Client auf die offizielle Version v0.15.1 und fügt mehr Logging hinzu<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Aktualisiert aws-sdk von 1.9.234 auf 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Unterstützt dynamische Intervall-Updates für Ticker-Komponenten<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Verbessert die automatische Erkennung von ARM SVE Befehlssätzen für Bitset-Operationen<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Verbessert die Fehlermeldung, wenn eine Text- oder Phrasenübereinstimmung fehlschlägt<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Verbessert die Fehlermeldung für nicht übereinstimmende Vektordimensionen<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Verbesserte Fehlermeldung bei Append-Timeouts, wenn der Objektspeicher nicht verfügbar ist<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
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
<li>Behebt ein potentielles Out-Of-Memory (OOM) Problem während des Imports von Parquet-Dateien<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Behebt ein Problem, bei dem Standby-Knoten nicht wiederhergestellt werden konnten, wenn ihr Lease ablief<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Behandelt den Status der Verdichtungswiederholung korrekt<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Behebt ein potenzielles Deadlock zwischen kontinuierlichen Leseanfragen und dem Laden von Indizes, das das Laden von Indizes verhindern konnte<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Behebt einen Fehler, der dazu führen konnte, dass Datenlöschungen in Szenarien mit hoher Parallelität fehlschlugen<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Behebt eine mögliche Race Condition beim Laden von Text- und JSON-Indizes<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>Behebt eine Knotenstatus-Inkonsistenz, die nach einem QueryCoord-Neustart auftreten konnte<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>Stellt sicher, dass ein "schmutziger" QueryNode nach einem Neustart ordnungsgemäß aufgeräumt wird<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Behebt ein Problem, bei dem der Wiederholungsstatus für Anfragen mit nicht leeren Nutzdaten nicht korrekt behandelt wurde<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>Behebt ein Problem, bei dem der Bulk Writer v2 nicht den korrekten Bucket-Namen verwendet hat<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Erhöht die Sicherheit durch das Verstecken von sensiblen Elementen vor dem RESTful get_configs Endpunkt<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>Stellt sicher, dass Objekt-Uploads für Woodpecker während Timeout-Wiederholungen idempotent sind<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>Verbietet den Import von Nullelementen in Array-Feldern aus Parquet-Dateien<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Behebt einen Fehler, bei dem der Proxy-Cache nach der Erstellung eines Collection-Alias nicht ungültig gemacht wurde<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Verbessert den internen Service-Erkennungsmechanismus für Streaming-Knoten<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Korrigiert die Ressourcengruppen-Logik, um Streaming Nodes korrekt zu filtern<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Fügt die Bezeichnung databaseName zu Metriken hinzu, um Namenskonflikte in Multi-Datenbank-Umgebungen zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Behebt einen Logikfehler in der internen Behandlung des Taskstatus<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Optimiert das Initialisierungs-Timing der internen Metriken, um eine mögliche Panik zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Behebt einen seltenen potentiellen Absturz des internen HTTP-Servers<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: August 6, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus-Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 ist offiziell freigegeben! Aufbauend auf der architektonischen Grundlage, die in <a href="#v260-rc1">2.6.0-rc1</a> gelegt wurde, behebt diese produktionsreife Version zahlreiche Stabilitäts- und Leistungsprobleme und führt gleichzeitig leistungsstarke neue Funktionen wie Storage Format V2, erweiterte JSON-Verarbeitung und verbesserte Suchfunktionen ein. Mit umfangreichen Fehlerkorrekturen und Optimierungen, die auf dem Feedback der Community während der RC-Phase basieren, ist Milvus 2.6.0 bereit, von Ihnen erforscht und übernommen zu werden.</p>
<div class="alert warning">
<p>Ein direktes Upgrade von einer Vorversion 2.6.0 wird aufgrund von Architekturänderungen nicht unterstützt. Bitte folgen Sie unserer <a href="/docs/de/upgrade_milvus_cluster-operator.md">Upgrade-Anleitung</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Was ist neu in 2.6.0 (seit RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Optimiertes Speicherformat v2</h4><p>Um die Herausforderungen der gemischten Skalar- und Vektordatenspeicherung zu bewältigen, insbesondere Punkt-Lookups auf unstrukturierten Daten, führt Milvus 2.6 das Speicherformat V2 ein. Dieses neue adaptive spaltenbasierte Speicherformat verwendet eine Layout-Strategie mit "enger Spaltenzusammenführung und breiter Spaltenunabhängigkeit", die die Leistungsengpässe bei der Verarbeitung von Punktnachschlagevorgängen und Abfragen in kleinen Mengen in Vektordatenbanken grundlegend behebt.</p>
<p>Das neue Format unterstützt nun einen effizienten Zufallszugriff ohne E/A-Verstärkung und erreicht eine bis zu 100-fache Leistungssteigerung im Vergleich zum bisherigen Vanilla-Parquet-Format, was es ideal für KI-Arbeitslasten macht, die sowohl analytische Verarbeitung als auch präzise Vektorabfragen erfordern. Darüber hinaus kann es die Anzahl der Dateien bei typischen Arbeitslasten um bis zu 98 % reduzieren. Der Speicherverbrauch für die Hauptkompaktierung wird um 300 % reduziert, und die E/A-Vorgänge werden um bis zu 80 % beim Lesen und um mehr als 600 % beim Schreiben optimiert.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Flacher JSON-Index (Beta)</h4><p>Milvus 2.6 führt JSON Flat Index ein, um hochdynamische JSON-Schemata zu verarbeiten. Im Gegensatz zu JSON Path Index, bei dem bestimmte Pfade und ihre erwarteten Typen vorab deklariert werden müssen, entdeckt und indiziert JSON Flat Index automatisch alle verschachtelten Strukturen unter einem bestimmten Pfad. Bei der Indizierung eines JSON-Feldes wird der gesamte Teilbaum rekursiv abgeflacht, wobei für jedes gefundene Pfad-Wert-Paar invertierte Indexeinträge erstellt werden, unabhängig von der Tiefe oder dem Typ. Diese automatische Abflachung macht JSON Flat Index ideal für sich entwickelnde Schemata, in denen neue Felder ohne Vorwarnung erscheinen. Wenn Sie beispielsweise ein "Metadaten"-Feld indizieren, verarbeitet das System automatisch neue verschachtelte Felder wie "metadata.version2.features.experimental", sobald sie in den eingehenden Daten erscheinen, ohne dass eine neue Indexkonfiguration erforderlich ist.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Core 2.6.0 Funktionen Rückruf<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Ausführliche Informationen zu den Änderungen an der Architektur und den in 2.6.0-RC eingeführten Funktionen finden Sie in der <a href="#v260-rc1">Release Note 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Vereinfachung der Architektur</h4><ul>
<li>Streaming Node (GA) - Zentralisierte WAL-Verwaltung</li>
<li>Natives WAL mit Woodpecker - Entfernte Kafka/Pulsar-Abhängigkeit</li>
<li>Vereinheitlichte Koordinatoren (MixCoord); Zusammenlegung von IndexNode und DataNode - Reduzierte Komplexität der Komponenten</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Suche und Analytik</h4><ul>
<li>RaBitQ 1-Bit-Quantisierung mit hoher Wiedererkennung</li>
<li>Phrase Matching</li>
<li>MinHash LSH für Deduplizierung</li>
<li>Zeitabhängige Ranking-Funktionen</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Erfahrung für Entwickler</h4><ul>
<li>Einbettungsfunktionen für den "Data-in, Data-out"-Workflow</li>
<li>Online-Schema-Entwicklung</li>
<li>INT8-Vektor-Unterstützung</li>
<li>Verbesserte Tokenizer für globale Sprachunterstützung</li>
<li>Cache-Schicht mit "Lazy Loading" - Verarbeitung von Datensätzen, die größer als der Speicher sind</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Juni 18, 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus-Version</th><th style="text-align:center">Python SDK Version</th><th style="text-align:center">Node.js SDK Version</th><th style="text-align:center">Java SDK Version</th><th style="text-align:center">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 führt eine vereinfachte, Cloud-native Architektur ein, die darauf ausgelegt ist, die betriebliche Effizienz, die Ressourcennutzung und die Gesamtbetriebskosten zu verbessern, indem die Komplexität der Bereitstellung reduziert wird. Diese Version fügt neue Funktionalitäten hinzu, die sich auf Leistung, Suche und Entwicklung konzentrieren. Zu den wichtigsten Funktionen gehören die hochpräzise 1-Bit-Quantisierung (RaBitQ) und eine dynamische Cache-Schicht zur Leistungssteigerung, die Erkennung von Beinahe-Duplikaten mit MinHash und der präzise Abgleich von Phrasen für die erweiterte Suche sowie automatisierte Einbettungsfunktionen mit Online-Schemaänderung zur Verbesserung der Entwicklererfahrung.</p>
<div class="alert note">
<p>Dies ist eine Vorabversion von Milvus 2.6.0. Um die neuesten Funktionen auszuprobieren, installieren Sie diese Version als eine neue Bereitstellung. Ein Upgrade von Milvus v2.5.x oder früher auf 2.6.0-rc1 wird nicht unterstützt.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Änderungen an der Architektur<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Seit 2.6 führt Milvus bedeutende architektonische Änderungen ein, die auf eine Verbesserung der Leistung, Skalierbarkeit und Benutzerfreundlichkeit abzielen. Weitere Informationen finden Sie unter <a href="/docs/de/architecture_overview.md">Milvus-Architekturübersicht</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming-Knoten (GA)</h4><p>In früheren Versionen wurden Streaming-Daten vom Proxy in die WAL geschrieben und vom QueryNode und DataNode gelesen. Diese Architektur machte es schwierig, einen Konsens auf der Schreibseite zu erreichen, und erforderte eine komplexe Logik auf der Leseseite. Außerdem befand sich der Query-Delegator im QueryNode, was die Skalierbarkeit behinderte. Mit Milvus 2.5.0 wurde der Streaming Node eingeführt, der in Version 2.6.0 zu GA wird. Diese Komponente ist nun für alle WAL-Lese-/Schreiboperationen auf Shard-Ebene verantwortlich und dient auch als Abfrage-Delegator, wodurch die oben genannten Probleme gelöst und neue Optimierungen ermöglicht werden.</p>
<p><strong>Wichtiger Hinweis zum Upgrade</strong>: Streaming Node ist eine bedeutende architektonische Änderung, daher wird ein direktes Upgrade auf Milvus 2.6.0-rc1 von früheren Versionen nicht unterstützt.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Milvus war bisher auf externe Systeme wie Kafka oder Pulsar für sein WAL angewiesen. Diese Systeme waren zwar funktional, brachten aber eine erhebliche betriebliche Komplexität und einen erheblichen Ressourcen-Overhead mit sich, insbesondere bei kleinen bis mittelgroßen Implementierungen. In Milvus 2.6 werden diese Systeme durch Woodpecker ersetzt, ein speziell entwickeltes, Cloud-natives WAL-System. Woodpecker wurde für die Objektspeicherung entwickelt und unterstützt sowohl lokale als auch objektspeicherbasierte Zero-Disk-Modi, die den Betrieb vereinfachen und gleichzeitig die Leistung und Skalierbarkeit verbessern.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">DataNode und IndexNode verschmelzen</h4><p>In Milvus 2.6 werden Aufgaben wie Verdichtung, Massenimport, Statistiksammlung und Indexerstellung nun von einem einheitlichen Scheduler verwaltet. Die Funktion der Datenpersistenz, die zuvor vom DataNode ausgeführt wurde, wurde in den Streaming Node verlagert. Um die Bereitstellung und Wartung zu vereinfachen, wurden der IndexNode und der DataNode zu einer einzigen DataNode-Komponente zusammengeführt. Dieser konsolidierte Knoten führt nun all diese wichtigen Aufgaben aus, wodurch die betriebliche Komplexität reduziert und die Ressourcennutzung optimiert wird.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Zusammenführung von Koordinatoren zu MixCoord</h4><p>Das vorherige Design mit separaten RootCoord-, QueryCoord- und DataCoord-Modulen führte zu einer komplexen Kommunikation zwischen den Modulen. Um das Systemdesign zu vereinfachen, wurden diese Komponenten zu einem einzigen, vereinheitlichten Koordinator namens MixCoord zusammengeführt. Diese Konsolidierung reduziert die Komplexität der verteilten Programmierung, indem die netzwerkbasierte Kommunikation durch interne Funktionsaufrufe ersetzt wird, was zu einem effizienteren Systembetrieb und einer vereinfachten Entwicklung und Wartung führt.</p>
<h3 id="Key-Features" class="common-anchor-header">Wesentliche Merkmale<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1-Bit-Quantisierung</h4><p>Bei der Verarbeitung großer Datensätze ist die 1-Bit-Quantisierung eine effektive Technik zur Verbesserung der Ressourcennutzung und der Suchleistung. Herkömmliche Methoden können sich jedoch negativ auf die Wiederauffindbarkeit auswirken. In Zusammenarbeit mit den ursprünglichen Forschungsautoren führt Milvus 2.6 RaBitQ ein, eine 1-Bit-Quantisierungslösung, die eine hohe Recall-Genauigkeit beibehält und gleichzeitig die Ressourcen- und Leistungsvorteile der 1-Bit-Kompression bietet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Erweiterung der JSON-Fähigkeit</h4><p>Milvus 2.6 erweitert seine Unterstützung für den JSON-Datentyp mit den folgenden Verbesserungen:</p>
<ul>
<li><strong>Leistung</strong>: JSON Path Indexing wird nun offiziell unterstützt und ermöglicht die Erstellung von invertierten Indizes auf bestimmten Pfaden innerhalb von JSON-Objekten (z.B. <code translate="no">meta.user.location</code>). Dadurch werden vollständige Objekt-Scans vermieden und die Latenzzeit von Abfragen mit komplexen Filtern verbessert.</li>
<li><strong>Funktionsweise</strong>: Um eine komplexere Filterlogik zu unterstützen, bietet diese Version Unterstützung für die Funktionen <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> und <code translate="no">CAST</code>. Unsere Arbeit an der JSON-Unterstützung geht weiter. Wir freuen uns, Ihnen mitteilen zu können, dass die kommenden offiziellen Versionen noch leistungsfähigere Funktionen bieten werden, wie z. B. <strong>JSON Shredding</strong> und einen <strong>JSON FLAT Index</strong>, der die Leistung bei stark verschachtelten JSON-Daten erheblich verbessern soll.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Analyzer/Tokenizer Funktionserweiterung</h4><p>In dieser Version werden die Textverarbeitungsfunktionen durch mehrere Aktualisierungen des Analyzers und Tokenizers erheblich verbessert:</p>
<ul>
<li>Eine neue <a href="/docs/de/analyzer-overview.md#Example-use">Run Analyzer-Syntax</a> ist verfügbar, um Tokenizer-Konfigurationen zu validieren.</li>
<li>Der <a href="/docs/de/lindera-tokenizer.md">Lindera Tokenizer</a> wurde integriert, um asiatische Sprachen wie Japanisch und Koreanisch besser zu unterstützen.</li>
<li>Die Auswahl des Tokenizers auf Zeilenebene wird jetzt unterstützt, wobei der universelle <a href="/docs/de/icu-tokenizer.md">ICU-Tokenizer</a> als Fallback für mehrsprachige Szenarien zur Verfügung steht.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Dateneingabe, Datenausgabe mit Einbettungsfunktionen</h4><p>Milvus 2.6 führt eine "Data-in, Data-Out"-Funktion ein, die die Entwicklung von KI-Anwendungen durch die direkte Integration von Einbettungsmodellen von Drittanbietern (z. B. von OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face) vereinfacht. Milvus ruft dann automatisch den angegebenen Modelldienst auf, um den Text in Echtzeit in Vektoren umzuwandeln. Damit entfällt die Notwendigkeit einer separaten Vektor-Konvertierungs-Pipeline.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/embedding-function-overview.md">Übersicht über die Einbettungsfunktion</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Phrasenabgleich</h4><p>Phrase Match ist eine Textsuchfunktion, die nur dann Ergebnisse liefert, wenn die exakte Abfolge von Wörtern in einer Abfrage nacheinander und in der richtigen Reihenfolge in einem Dokument vorkommt.</p>
<p><strong>Hauptmerkmale</strong>:</p>
<ul>
<li>Ordnungsabhängig: Die Wörter müssen in der gleichen Reihenfolge wie in der Abfrage erscheinen.</li>
<li>Aufeinanderfolgende Übereinstimmung: Die Wörter müssen direkt nebeneinander stehen, es sei denn, es wird ein Slop-Wert verwendet.</li>
<li>Slop (optional): Ein einstellbarer Parameter, der eine geringe Anzahl von Zwischenwörtern zulässt, um eine unscharfe Phrasenübereinstimmung zu ermöglichen.</li>
</ul>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/phrase-match.md">Phrase Match</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH-Index (Beta)</h4><p>Um den Bedarf an Datendeduplizierung beim Modelltraining zu decken, bietet Milvus 2.6 Unterstützung für MINHASH_LSH-Indizes. Diese Funktion bietet eine rechnerisch effiziente und skalierbare Methode zur Schätzung der Jaccard-Ähnlichkeit zwischen Dokumenten, um Fast-Duplikate zu identifizieren. Benutzer können während der Vorverarbeitung MinHash-Signaturen für ihre Textdokumente erzeugen und den MINHASH_LSH-Index in Milvus verwenden, um ähnliche Inhalte in großen Datensätzen effizient zu finden und so die Datenbereinigung und Modellqualität zu verbessern.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Zeitabhängige Abklingfunktionen</h4><p>Milvus 2.6 führt zeitabhängige Abklingfunktionen ein, um Szenarien zu berücksichtigen, in denen sich der Informationswert im Laufe der Zeit ändert. Bei der Neueinstufung von Ergebnissen können Benutzer exponentielle, Gaußsche oder lineare Abklingfunktionen auf der Grundlage eines Zeitstempelfeldes anwenden, um die Relevanzbewertung eines Dokuments anzupassen. Dadurch wird sichergestellt, dass aktuellere Inhalte priorisiert werden können, was für Anwendungen wie Newsfeeds, E-Commerce und das Gedächtnis eines KI-Agenten entscheidend ist.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/decay-ranker-overview.md">Decay Ranker Übersicht</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Feld für Online-Schema-Evolution hinzufügen</h4><p>Um eine größere Schema-Flexibilität zu bieten, unterstützt Milvus 2.6 jetzt das Hinzufügen eines neuen skalaren Feldes zum Schema einer bestehenden Sammlung online. Dadurch wird die Notwendigkeit vermieden, eine neue Sammlung zu erstellen und eine störende Datenmigration durchzuführen, wenn sich die Anwendungsanforderungen ändern.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/add-fields-to-an-existing-collection.md">Felder zu einer bestehenden Sammlung hinzufügen</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8-Vektor-Unterstützung</h4><p>Als Reaktion auf die zunehmende Verwendung von quantisierten Modellen, die 8-Bit-Integer-Einbettungen erzeugen, bietet Milvus 2.6 native Datentypunterstützung für INT8-Vektoren. Dadurch können Benutzer diese Vektoren direkt ohne De-Quantisierung einlesen, was Berechnungen, Netzwerkbandbreite und Speicherkosten spart. Diese Funktion wird zunächst für Indizes der HNSW-Familie unterstützt.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/dense-vector.md">Dense Vector</a>.</p>
