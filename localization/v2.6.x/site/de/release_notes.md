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
<h2 id="v269" class="common-anchor-header">v2.6.9<button data-href="#v269" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Januar 16, 2026</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus-Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.12</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.9 ankündigen zu können! Dieses Update führt Highlight-Scores für Suchergebnisse ein, verbessert die Segmentverwaltung mit Unterstützung für das erneute Öffnen von Segmenten, wenn Daten- oder Schemaänderungen auftreten, und verbessert die Handhabung von Speicherversionen. Zu den wichtigsten Verbesserungen gehören eine bessere Protokollierungsleistung, erweiterte Sicherheitskontrollen für Ausdrucksendpunkte und Optimierungen für Textanalysatoren und Indexerstellung. Diese Version behebt außerdem kritische Probleme wie die Genauigkeit der Speicherschätzung, die Konvertierung von Geometriedaten und verschiedene Stabilitätsprobleme. Wir empfehlen allen Benutzern des Zweigs 2.6 ein Upgrade auf diese Version, um die Zuverlässigkeit und Leistung des Systems zu verbessern.</p>
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
<li>Unterstützt die Suche nach Primärschlüsseln<a href="https://github.com/milvus-io/milvus/pull/46528">(#46528</a>)</li>
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
<li>Eine Metrik zur Kennzeichnung der Speicherversion wurde hinzugefügt, um die Beobachtbarkeit zu verbessern<a href="https://github.com/milvus-io/milvus/pull/47014">(#47014</a>)</li>
<li>QueryCoord unterstützt nun das erneute Öffnen von Segmenten, wenn sich der Manifestpfad ändert<a href="https://github.com/milvus-io/milvus/pull/46921">(#46921</a>)</li>
<li>Unterstützung für das erneute Öffnen von Segmenten bei Daten- oder Schemaänderungen wurde hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/46412">(#46412</a>)</li>
<li>Verbesserte Leistung und Effizienz von Slow Logs<a href="https://github.com/milvus-io/milvus/pull/47086">(#47086</a>)</li>
<li>Verdichtungsrichtlinie für Speicherversions-Upgrades hinzugefügt, um Versionsmigrationen zu erleichtern<a href="https://github.com/milvus-io/milvus/pull/47011">(#47011</a>)</li>
<li>Zusätzliche Speicherkopieroperationen für C++ Logging wurden eliminiert, um die Leistung zu verbessern<a href="https://github.com/milvus-io/milvus/pull/46992">(#46992</a>)</li>
<li>Sicherheitskontrollen für den /expr Endpunkt hinzugefügt, um unautorisierten Zugriff zu verhindern<a href="https://github.com/milvus-io/milvus/pull/46978">(#46978</a>)</li>
<li>Der Streaming-Dienst bleibt nun aktiviert, bis die erforderliche Anzahl an Streaming-Knoten erreicht ist<a href="https://github.com/milvus-io/milvus/pull/46982">(#46982</a>)</li>
<li>Redundante etcd put Operationen beim Aktualisieren von Segmentinformationen wurden entfernt<a href="https://github.com/milvus-io/milvus/pull/46794">(#46794</a>)</li>
<li>Verbesserte Validierung der Zeilenzahl und Reduzierung irreführender Warnprotokolle für die Sortierverdichtung<a href="https://github.com/milvus-io/milvus/pull/46824">(#46824</a>)</li>
<li>Aufgeräumte und organisierte Build-Index-Protokollmeldungen<a href="https://github.com/milvus-io/milvus/pull/46769">(#46769</a>)</li>
<li>Begrenzung der Anzahl gleichzeitiger Vektorindexerstellungen pro Worker, um eine Erschöpfung der Ressourcen zu verhindern<a href="https://github.com/milvus-io/milvus/pull/46877">(#46877</a>)</li>
<li>Optimierte jieba und lindera analyzer cloning Operationen für bessere Leistung<a href="https://github.com/milvus-io/milvus/pull/46757">(#46757</a>)</li>
<li>Glog-Sink hinzugefügt, um CGO-Protokolle in den zap-Logger für einheitliche Protokollierung zu übertragen<a href="https://github.com/milvus-io/milvus/pull/46741">(#46741</a>)</li>
<li>Erzwingt die Verwendung des V2-Speicherformats und veraltetes V1-Schreiben<a href="https://github.com/milvus-io/milvus/pull/46889">(#46889</a>)</li>
<li>Stapelverarbeitung für ngram-Operationen implementiert, um die Effizienz zu verbessern<a href="https://github.com/milvus-io/milvus/pull/46703">(#46703</a>)</li>
<li>Automatischer Wiederholungsmechanismus für binlog-Schreiboperationen hinzugefügt, um die Zuverlässigkeit zu verbessern<a href="https://github.com/milvus-io/milvus/pull/46854">(#46854</a>)</li>
<li>Leere Timetick-Nachrichten auf der konsumierenden Seite wurden gefiltert, um unnötige Verarbeitung zu reduzieren<a href="https://github.com/milvus-io/milvus/pull/46730">(#46730</a>)</li>
<li>Verbesserte Suche nach Primärschlüssel mit Duplikatsprüfung und automatischer anns_field Inferenz<a href="https://github.com/milvus-io/milvus/pull/46745">(#46745</a>)</li>
<li>Unterstützung von Dimensionsparametern für siliconflow und cohere embedding providers<a href="https://github.com/milvus-io/milvus/pull/47081">(#47081</a>)</li>
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
<li>Doppelte Zählung von Index-Speicher in der Segment-Ladeabschätzung behoben<a href="https://github.com/milvus-io/milvus/pull/47046">(#47046</a>)</li>
<li>Kompilierungsprobleme unter macOS 14 behoben<a href="https://github.com/milvus-io/milvus/pull/47048">(#47048</a>)</li>
<li>Verwendet Revision als globale Version der Streaming Service Discovery für bessere Konsistenz<a href="https://github.com/milvus-io/milvus/pull/47023">(#47023</a>)</li>
<li>Sicherstellung, dass alle Futures bei Ausnahmen abgeschlossen werden, um Use-after-free-Abstürze zu verhindern<a href="https://github.com/milvus-io/milvus/pull/46960">(#46960</a>)</li>
<li>Der Shard Interceptor hat <code translate="no">FlushAllMsg</code> Operationen fälschlicherweise übersprungen<a href="https://github.com/milvus-io/milvus/pull/47004">(#47004</a>)</li>
<li>Gültige Bereichsprüfung für Sammel-TTL hinzugefügt, um ungültige Konfigurationen zu verhindern<a href="https://github.com/milvus-io/milvus/pull/47010">(#47010</a>)</li>
<li><code translate="no">GetCredentialInfo</code> korrigierte, dass RPC-Antworten nicht zwischengespeichert wurden<a href="https://github.com/milvus-io/milvus/pull/46945">(#46945</a>)</li>
<li>Problem behoben, bei dem <code translate="no">AlterFunction</code> nicht aufgerufen werden konnte, wenn mehrere Funktionen ungültig wurden<a href="https://github.com/milvus-io/milvus/pull/46986">(#46986</a>)</li>
<li>Korrigierte invertierte Index-Null-Offset-Datei, die nicht komprimiert wurde<a href="https://github.com/milvus-io/milvus/pull/46950">(#46950</a>)</li>
<li>Korrigierter Absturz bei der Verwendung von is_null_expr auf indizierten JSON-Feldern<a href="https://github.com/milvus-io/milvus/pull/46894">(#46894</a>)</li>
<li>Überprüfung für allow_insert_auto_id Flag in RESTful v2 insert API hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/46931">(#46931</a>)</li>
<li>Überprüfung des Vorhandenseins von Feldern in Spaltengruppen vor dem Lesen aus dem Loon-Manifest hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/46924">(#46924</a>)</li>
<li>Fehler behoben, bei dem der Highlight-Parameter nicht korrekt funktionierte<a href="https://github.com/milvus-io/milvus/pull/46876">(#46876</a>)</li>
<li>Quotenzentrale ignoriert nun den Delegator, wenn er sich im Erholungszustand befindet<a href="https://github.com/milvus-io/milvus/pull/46858">(#46858</a>)</li>
<li>Angepasste WKT/WKB Konvertierungsoptionen, um ein konsistentes Verhalten über alle Operationen hinweg zu gewährleisten<a href="https://github.com/milvus-io/milvus/pull/46874">(#46874</a>)</li>
<li>Fehler im Voyageai-Modell int8 behoben<a href="https://github.com/milvus-io/milvus/pull/46821">(#46821</a>)</li>
<li>Fehlende Behandlung von <code translate="no">FlushAllMsg</code> in Wiederherstellungs-Speicheroperationen behoben<a href="https://github.com/milvus-io/milvus/pull/46803">(#46803</a>)</li>
<li>Fehlendes shardclientmgr Feld in querytask behoben, um Panik zu verhindern<a href="https://github.com/milvus-io/milvus/pull/46838">(#46838</a>)</li>
<li>Verwendete leaderid für leaderaction stale check im Scheduler, um die Genauigkeit zu verbessern<a href="https://github.com/milvus-io/milvus/pull/46788">(#46788</a>)</li>
<li>Wiederherstellung der Tenant/Namespace-Unterstützung für Pulsar, die in 2.6 verloren gegangen war<a href="https://github.com/milvus-io/milvus/pull/46759">(#46759</a>)</li>
<li>Load Config Watcher hinzugefügt, um zu verhindern, dass Änderungen an der Load Config verloren gehen<a href="https://github.com/milvus-io/milvus/pull/46786">(#46786</a>)</li>
<li>Fehler in der Schnittstelle zur Funktionsbearbeitung behoben<a href="https://github.com/milvus-io/milvus/pull/46782">(#46782</a>)</li>
<li>TTL-Eigenschaftsüberprüfung für Sammlungen hinzugefügt, um zu verhindern, dass die Verdichtung hängen bleibt<a href="https://github.com/milvus-io/milvus/pull/46736">(#46736</a>)</li>
</ul>
<h2 id="v268" class="common-anchor-header">v2.6.8<button data-href="#v268" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Januar 4, 2026</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.11</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.8 ankündigen zu können! Diese Version führt die Hervorhebung von Suchergebnissen ein, was das Sucherlebnis deutlich verbessert. Unter der Haube haben wir die Abfrageverarbeitung, die Ressourcenplanung und die Caching-Mechanismen optimiert, um eine bessere Leistung und Stabilität zu erreichen. Außerdem wurden in dieser Version kritische Fehler im Zusammenhang mit der Datensicherheit, der Speicherverwaltung und der Gleichzeitigkeit behoben. Wir empfehlen allen Anwendern dringend ein Upgrade auf diese Version, um eine effizientere und zuverlässigere Produktionsumgebung zu erhalten.</p>
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
<li>Unterstützte Suche mit Textmarker. Einzelheiten finden Sie unter <a href="/docs/de/text-highlighter.md">Textmarker</a>. <a href="https://github.com/milvus-io/milvus/pull/46052">(#46052</a>)</li>
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
<li>Verlagerung der Abfrageoptimierungslogik in den Proxy zur Verbesserung der Leistung<a href="https://github.com/milvus-io/milvus/pull/46549">(#46549</a>)</li>
<li>Optimierte Leistung des <code translate="no">LIKE</code> Operators mit STL-Sortierung<a href="https://github.com/milvus-io/milvus/pull/46535">(#46535</a>)</li>
<li>Gleichzeitige Ausführung von Textindex-Tasks für mehrere Felder ermöglicht<a href="https://github.com/milvus-io/milvus/pull/46306">(#46306</a>)</li>
<li>Unterstützt das Pausieren von GC auf der Sammlungsebene<a href="https://github.com/milvus-io/milvus/pull/46201">(#46201</a>)</li>
<li>Implementierte eine Strafregelung für QueryNodes, um Ressourcenerschöpfung zu behandeln<a href="https://github.com/milvus-io/milvus/pull/46086">(#46086</a>)</li>
<li>Optimiertes Daten-Caching durch Zuordnung mehrerer Zeilengruppen zu einer einzigen Cache-Zelle<a href="https://github.com/milvus-io/milvus/pull/46542">(#46542</a>)</li>
<li>Reduzierte CPU-Auslastung im QuotaCenter<a href="https://github.com/milvus-io/milvus/pull/46615">(#46615</a>)</li>
<li>Verbesserte <code translate="no">TIMESTAMPTZ</code> Datenvergleichsleistung<a href="https://github.com/milvus-io/milvus/pull/46655">(#46655</a>)</li>
<li>Unterstützt löschbare dynamische Felder mit einem leeren JSON-Objekt als Standardwert<a href="https://github.com/milvus-io/milvus/pull/46445">(#46445</a>)</li>
<li>Unnötige Segmentversiegelung wurde verhindert, wenn nur Sammlungseigenschaften geändert wurden<a href="https://github.com/milvus-io/milvus/pull/46489">(#46489</a>)</li>
<li>Unterstützt DML und DQL Weiterleitung im Proxy für RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46021">(#46021</a>, <a href="https://github.com/milvus-io/milvus/pull/46037">#46037</a>)</li>
<li>Wiederholungsmechanismus für Objektspeicher-Lesevorgänge bei Ratenbegrenzungsfehlern hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/46464">(#46464</a>)</li>
<li>Verbessertes Logging für Proxy und RootCoord Meta-Tabellen<a href="https://github.com/milvus-io/milvus/pull/46701">(#46701</a>)</li>
<li>Validierung für das Einbetten von Modellen und Schema-Feldtypen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/46422">(#46422</a>)</li>
<li>Einführung einer Toleranzdauer zur Verzögerung von Collection Drop Operationen<a href="https://github.com/milvus-io/milvus/pull/46252">(#46252</a>)</li>
<li>Verbesserte Index-Task-Planung durch Schätzung von Slots basierend auf Feldgröße und -typ<a href="https://github.com/milvus-io/milvus/pull/46276">(#46276</a>, <a href="https://github.com/milvus-io/milvus/pull/45851">#45851</a>)</li>
<li>Fallback-Mechanismus für Schreibpfade beim Zugriff auf Objektspeicher ohne Condition-Write-Unterstützung hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/46022">(#46022</a>)</li>
<li>Optimierte IDF-Orakel-Synchronisationslogik<a href="https://github.com/milvus-io/milvus/pull/46079">(#46079</a>)</li>
<li>RootCoord Standard-Port wurde auf einen nicht-ephemeren Port geändert<a href="https://github.com/milvus-io/milvus/pull/46268">(#46268</a>)</li>
<li>Metriken zur Überwachung von Jemalloc Cache-Speicher hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/45973">(#45973</a>)</li>
<li>Verbesserte Genauigkeit der Festplatten-Quota-Metrik, wenn sich die Cluster-Quota ändert<a href="https://github.com/milvus-io/milvus/pull/46304">(#46304</a>)</li>
<li>Verbesserte Trace-Beobachtbarkeit für skalare Ausdrücke<a href="https://github.com/milvus-io/milvus/pull/45823">(#45823</a>)</li>
<li>Abgelehnte doppelte Primärschlüssel in Upsert-Batch-Anfragen<a href="https://github.com/milvus-io/milvus/pull/46035">(#46035</a>)</li>
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
<li>RBAC ETCD Präfix-Abgleich behoben, um potentielle Datenlecks zu verhindern<a href="https://github.com/milvus-io/milvus/pull/46708">(#46708</a>)</li>
<li>Falsche Behandlung des Root-Pfads im lokalen Speichermodus behoben<a href="https://github.com/milvus-io/milvus/pull/46693">(#46693</a>)</li>
<li>Korrigierte Behandlung von gemischten <code translate="no">int64</code>/<code translate="no">float</code> Typen in JSON-Feldern<a href="https://github.com/milvus-io/milvus/pull/46682">(#46682</a>)</li>
<li>Fehler beim Laden von Textprotokollen während eines Cluster-Upgrades behoben<a href="https://github.com/milvus-io/milvus/pull/46698">(#46698</a>)</li>
<li>Verhinderte das Löschen von anderen Feldern während der Rohdatenbereinigung<a href="https://github.com/milvus-io/milvus/pull/46689">(#46689</a>)</li>
<li>Fehler bei der Verwendung von Hervorhebungen mit mehreren Analysatoren behoben<a href="https://github.com/milvus-io/milvus/pull/46664">(#46664</a>)</li>
<li>Sicherstellung, dass Protokolle gespült werden, wenn das Betriebssystem beendet wird<a href="https://github.com/milvus-io/milvus/pull/46609">(#46609</a>)</li>
<li>ETCD RPC Größenlimit überschritten Fehler behoben, wenn Sammlungen gelöscht wurden<a href="https://github.com/milvus-io/milvus/pull/46645">(#46645</a>)</li>
<li>Replikations-Verzögerungsprobleme behoben, wenn der Server im Leerlauf ist<a href="https://github.com/milvus-io/milvus/pull/46612">(#46612</a>)</li>
<li>Korrigierte Validierung für ungültige <code translate="no">TIMESTAMPTZ</code> Standardwerte<a href="https://github.com/milvus-io/milvus/pull/46556">(#46556</a>)</li>
<li>Korrigierte Wiederherstellung von Verdichtungsaufgaben, um eine korrekte Bereinigung sicherzustellen<a href="https://github.com/milvus-io/milvus/pull/46578">(#46578</a>)</li>
<li>Vereinheitlichte Behandlung von Nur-Lese-Knoten, um steckengebliebene Balance-Channel-Aufgaben zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/46513">(#46513</a>)</li>
<li>Verhindern von Felddatenverlusten bei Spaltengruppen mit mehreren Feldern<a href="https://github.com/milvus-io/milvus/pull/46425">(#46425</a>)</li>
<li>Entfernt veraltete Proxy-Clients beim erneuten Überwachen von ETCD<a href="https://github.com/milvus-io/milvus/pull/46490">(#46490</a>)</li>
<li>Die Reihenfolge der Zusammenführung von Chunk-Iteratoren wurde korrigiert<a href="https://github.com/milvus-io/milvus/pull/46462">(#46462</a>)</li>
<li>Verhinderte die Erstellung von Kafka-Verbrauchergruppen durch Deaktivierung von Auto-Commit<a href="https://github.com/milvus-io/milvus/pull/46509">(#46509</a>)</li>
<li>Verbotenes Hot-Reloading von Tiered Storage Parametern<a href="https://github.com/milvus-io/milvus/pull/46438">(#46438</a>)</li>
<li>Aktivierter Such-Iterator für binäre Vektoren<a href="https://github.com/milvus-io/milvus/pull/46334">(#46334</a>)</li>
<li>Korrigierte Race Condition in der Speicherinitialisierung<a href="https://github.com/milvus-io/milvus/pull/46338">(#46338</a>)</li>
<li>Behoben: Highlight-Abfragen funktionierten nicht für Nicht-BM25-Suchen<a href="https://github.com/milvus-io/milvus/pull/46295">(#46295</a>)</li>
<li>Korrigierter Stapelüberlauf während JSON Garbage Collection<a href="https://github.com/milvus-io/milvus/pull/46318">(#46318</a>)</li>
<li>Sicherstellung von Wiederholungsversuchen beim Schreiben von binlogs<a href="https://github.com/milvus-io/milvus/pull/46310">(#46310</a>)</li>
<li>Korrigierte Index-Verwendungsprüfung für JSON-Felder<a href="https://github.com/milvus-io/milvus/pull/46281">(#46281</a>)</li>
<li>Verhinderte das Blockieren der Zielaktualisierung, wenn Replikate während der Skalierung keine Knoten haben<a href="https://github.com/milvus-io/milvus/pull/46291">(#46291</a>)</li>
<li>Einschränkung des <code translate="no">char_group</code> Tokenizers, um nur Ein-Byte-Begrenzer zu unterstützen<a href="https://github.com/milvus-io/milvus/pull/46196">(#46196</a>)</li>
<li>Übersprungene JSON-Pfadindexnutzung, wenn der Abfragepfad Zahlen enthält<a href="https://github.com/milvus-io/milvus/pull/46247">(#46247</a>)</li>
<li>Pfadverkettungsfehler in MinIO behoben, wenn der Wurzelpfad "." ist<a href="https://github.com/milvus-io/milvus/pull/46221">(#46221</a>)</li>
<li>Falsch-positive Gesundheitsprüfungen wurden behoben, indem die Berechnung der Replikat-Verzögerungsmetrik korrigiert wurde<a href="https://github.com/milvus-io/milvus/pull/46122">(#46122</a>)</li>
<li>Korrigierte RESTful v2 Parsing und Schema-Vorgaben mit <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46239">(#46239</a>)</li>
<li>Panik bei der Suche nach leeren Ergebnissen mit Ausgabegeometrie-Feldern behoben<a href="https://github.com/milvus-io/milvus/pull/46231">(#46231</a>)</li>
<li>Validierung der Felddatenausrichtung hinzugefügt, um Panik während partieller Aktualisierungen zu verhindern<a href="https://github.com/milvus-io/milvus/pull/46180">(#46180</a>)</li>
<li>Korrigiertes Datenbankverlust-Problem in RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46172">(#46172</a>)</li>
<li>Korrigierte fehlerhafte Kontextverwendung in gRPC Client Sitzungen<a href="https://github.com/milvus-io/milvus/pull/46184">(#46184</a>)</li>
<li>Korrigierte falsche Autorisierungsweiterleitung in RESTful v2 während Upgrades<a href="https://github.com/milvus-io/milvus/pull/46140">(#46140</a>)</li>
<li>Korrigierte inkorrekte Struktur-Reduktions-Logik<a href="https://github.com/milvus-io/milvus/pull/46151">(#46151</a>)</li>
<li>Korrigierte Fehlerrückgabe vom Highlighter, wenn Suchergebnisse leer sind<a href="https://github.com/milvus-io/milvus/pull/46111">(#46111</a>)</li>
<li>Korrigierte Logik für das Laden von Rohdaten für Felder<a href="https://github.com/milvus-io/milvus/pull/46155">(#46155</a>)</li>
<li>Problem mit der Cursorbewegung nach dem Überspringen von Chunks im Index behoben<a href="https://github.com/milvus-io/milvus/pull/46055">(#46055</a>)</li>
<li>Korrigierte Schleifenlogik für <code translate="no">TIMESTAMPTZ</code> skalare Indexausgabe<a href="https://github.com/milvus-io/milvus/pull/46110">(#46110</a>)</li>
<li>Das Setzen von Standardwerten für Geometriefelder über RESTful API wurde korrigiert<a href="https://github.com/milvus-io/milvus/pull/46064">(#46064</a>)</li>
<li>Schnelles Fail implementiert, wenn eine Komponente beim Start nicht bereit ist<a href="https://github.com/milvus-io/milvus/pull/46070">(#46070</a>)</li>
</ul>
<h2 id="v267" class="common-anchor-header">v2.6.7<button data-href="#v267" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Dezember 4, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.10</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.7 ist ein kritisches Stabilisierungsupdate für die 2.6.x-Serie. Diese Version konzentriert sich auf die Härtung des Systems gegen verteilte Ausfälle und die Optimierung der Ressourcennutzung unter hoher Last. Mit signifikanten Verbesserungen bei der E/A-Behandlung, der Speicherverwaltung und der Kubernetes-Integration empfehlen wir allen Produktionsanwendern dringend ein Upgrade auf diese Version, um eine höhere Zuverlässigkeit und einen reibungsloseren Betrieb im großen Maßstab zu gewährleisten.</p>
<h3 id="Features" class="common-anchor-header">Merkmale<button data-href="#Features" class="anchor-icon" translate="no">
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
<li><code translate="no">/livez</code> Endpunkt wurde hinzugefügt, um Kubernetes native Liveness Probes zu unterstützen, was die Stabilität der Container-Orchestrierung verbessert<a href="https://github.com/milvus-io/milvus/pull/45481">(#45481</a>).</li>
<li>Unterstützung für <strong>GroupBy-Operationen</strong> für <code translate="no">TIMESTAMPTZ</code> -Felder wurde hinzugefügt, um die Möglichkeiten der Zeitreihenanalyse zu verbessern<a href="https://github.com/milvus-io/milvus/pull/45763">(#45763</a>)</li>
<li>Unterstützung von <code translate="no">mmap</code> für JSON Shredding's Shared Key Indices zur Reduzierung des RAM-Footprints<a href="https://github.com/milvus-io/milvus/pull/45861">(#45861</a>)</li>
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
<li>Unterstützung der Weiterleitung von DML-Anfragen im Proxy zur Verbesserung der Schreibverfügbarkeit und Routing-Ausfallsicherheit<a href="https://github.com/milvus-io/milvus/pull/45922">(#45922</a>).</li>
<li>Upgrade von etcd auf v3.5.23 zur Behebung von Regressionen bei Konsensstabilität und Leistung<a href="https://github.com/milvus-io/milvus/pull/45953">(#45953</a>).</li>
<li>Robuste Fehlerbehandlung für Etcd-Server-Abstürze hinzugefügt, um kaskadierende Komponentenausfälle zu verhindern<a href="https://github.com/milvus-io/milvus/pull/45633">(#45633</a>).</li>
<li>Reduzierte Etcd-Last durch Entfernen von teuren Watchern für einfache Session-Liveness-Checks<a href="https://github.com/milvus-io/milvus/pull/45974">(#45974</a>).</li>
<li>Die WAL-Aufbewahrungsstrategie wurde verbessert, um ein besseres Gleichgewicht zwischen Festplattennutzung und Datenwiederherstellungssicherheit herzustellen<a href="https://github.com/milvus-io/milvus/pull/45784">(#45784</a>).</li>
<li>Unterstützt asynchrone Schreibsynchronisation für Logs, um zu verhindern, dass Festplatten-I/O-Blockierungen den Hauptausführungspfad beeinträchtigen<a href="https://github.com/milvus-io/milvus/pull/45806">(#45806</a>).</li>
<li>Erzwungene gepufferte I/O-Nutzung für Lasttasks mit hoher Priorität, um die Nutzung des OS-Seitencaches und den Durchsatz zu optimieren<a href="https://github.com/milvus-io/milvus/pull/45958">(#45958</a>).</li>
<li>Optimierte <code translate="no">mmap</code> Strategie, um Gruppen-Chunks in einem einzigen Systemaufruf abzubilden, was den Kernel-Overhead während des Segmentladens reduziert<a href="https://github.com/milvus-io/milvus/pull/45893">(#45893</a>).</li>
<li>Die Genauigkeit der Speicherabschätzung für JSON Shredding wurde verbessert, um OOM Kills oder Unterauslastung zu verhindern<a href="https://github.com/milvus-io/milvus/pull/45876">(#45876</a>).</li>
<li>Die Schätzung der Segmentauslastung wurde verfeinert, um sowohl Eviction- als auch Warmup-Zustände zu berücksichtigen<a href="https://github.com/milvus-io/milvus/pull/45891">(#45891</a>).</li>
<li>Granulare Abbruchprüfungen in Abfrageoperatoren hinzugefügt, um eine schnellere Beendigung von abgebrochenen oder zeitlich begrenzten Abfragen zu ermöglichen<a href="https://github.com/milvus-io/milvus/pull/45894">(#45894</a>).</li>
<li>Redundante Ressourcentyp-Prüfungen in der Dateiressourcenkonfiguration wurden entfernt<a href="https://github.com/milvus-io/milvus/pull/45727">(#45727</a>).</li>
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
<li>Go- und C++-Protokolle wurden in einen einheitlichen Stream verschachtelt, um eine korrekte chronologische Ansicht für die Fehlersuche zu bieten<a href="https://github.com/milvus-io/milvus/pull/46005">(#46005</a>).</li>
<li>Behebung einer Race Condition, bei der <code translate="no">LastConfirmedMessageID</code> bei Schreibvorgängen mit hoher Gleichzeitigkeit falsch sein konnte<a href="https://github.com/milvus-io/milvus/pull/45874">(#45874</a>).</li>
<li>Ein Berechnungsfehler bei der Aggregation von <code translate="no">allsearchcount</code> aus mehreren Suchergebnissen wurde behoben<a href="https://github.com/milvus-io/milvus/pull/45904">(#45904</a>).</li>
<li>Term-Ausdrücke wurden korrigiert, um die Logik für String-Einschlüsse in JSON-Arrays korrekt zu behandeln<a href="https://github.com/milvus-io/milvus/pull/45956">(#45956</a>).</li>
<li>Ersetzte <code translate="no">json.doc()</code> durch <code translate="no">json.dom_doc()</code> in <code translate="no">JSONContainsExpr</code>, um das Parsing-Verhalten zu korrigieren und die Leistung zu verbessern<a href="https://github.com/milvus-io/milvus/pull/45786">(#45786</a>).</li>
<li>Eine Panik in Standby MixCoord Komponenten während der Abschaltsequenz wurde behoben<a href="https://github.com/milvus-io/milvus/pull/45898">(#45898</a>).</li>
<li>Der Leader-Checker wurde korrigiert, um sicherzustellen, dass die Segmentverteilung korrekt mit Nur-Lese-Knoten synchronisiert wird<a href="https://github.com/milvus-io/milvus/pull/45991">(#45991</a>).</li>
<li>Es wurde sichergestellt, dass <code translate="no">HandleNodeUp</code> während der erneuten Überwachung von Knoten ausgelöst wird, um die korrekte Lastverteilungstopologie zu erhalten<a href="https://github.com/milvus-io/milvus/pull/45963">(#45963</a>).</li>
<li>Es wurde ein Fallback auf einen entfernten WAL-Speicher implementiert, wenn der lokale WAL-Speicher nicht mehr verfügbar ist<a href="https://github.com/milvus-io/milvus/pull/45754">(#45754</a>).</li>
<li><code translate="no">EmptySessionWatcher</code> hinzugefügt, um Panics zu verhindern, wenn im IndexNode Bindungsmodus gearbeitet wird<a href="https://github.com/milvus-io/milvus/pull/45912">(#45912</a>).</li>
<li>Sicherstellung der Konsistenz des Speicherstatus bei der Wiederherstellung von Broadcast-Tasks aus Protokollpuffern<a href="https://github.com/milvus-io/milvus/pull/45788">(#45788</a>).</li>
<li>Adressiert Thread-Sicherheitsprobleme in SegCore Sammlungsschema Updates<a href="https://github.com/milvus-io/milvus/pull/45618">(#45618</a>).</li>
<li>Erzwungene Zugriffskontrolle (RBAC) Prüfungen für <code translate="no">ListImport</code> und <code translate="no">GetImportProgress</code> APIs<a href="https://github.com/milvus-io/milvus/pull/45862">(#45862</a>).</li>
<li>Es wurde ein Fehler behoben, bei dem BulkImport fehlschlug, wenn die Eingabe eine leere Strukturliste enthielt<a href="https://github.com/milvus-io/milvus/pull/45692">(#45692</a>).</li>
</ul>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: November 21, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus-Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.6 ankündigen zu können, das eine Reihe von leistungsstarken neuen Funktionen, Leistungsverbesserungen und wichtigen Fehlerkorrekturen enthält. Dieses Update führt wichtige Funktionen ein, wie z.B. Geospatial und Timestampz Datentyp, Boost Ranker für Rescoring, etc. Diese Version enthält auch viele entscheidende Leistungsverbesserungen bei der skalaren Filterung. Darüber hinaus wurden mehrere kritische Fehler behoben, um eine größere Stabilität und Zuverlässigkeit zu gewährleisten. Mit dieser Version bietet Milvus weiterhin eine robustere und effizientere Erfahrung für alle Benutzer. Im Folgenden finden Sie die wichtigsten Highlights dieser Version.</p>
<ul>
<li>Geospatial Datentyp: Milvus führt die Unterstützung für den Datentyp <code translate="no">Geometry</code> ein, der OGC-konforme geometrische Objekte wie <code translate="no">POINT</code>, <code translate="no">LINESTRING</code> und <code translate="no">POLYGON</code> repräsentiert. Dieser Typ unterstützt mehrere räumliche Beziehungsoperatoren (st_contains, st_intersects, st_within, st_dwithin, ...) und bietet einen <code translate="no">RTREE</code> räumlichen Index zur Beschleunigung der räumlichen Filterung und Abfrageausführung. Dies ermöglicht eine effiziente Speicherung und Abfrage von Geospatial Shapes für LBS, Mapping und andere räumliche Workloads.</li>
<li>Timestamptz Datentyp: Milvus führt den TIMESTAMPTZ-Datentyp ein, der Zeitzonenbewusstsein für alle zeitlichen Daten bietet. Diese Funktion ermöglicht ein konsistentes Datenmanagement über globale Implementierungen hinweg, indem Benutzer einen Standard-Zeitkontext mithilfe der Zeitzonen-Eigenschaft für Datenbanken und Sammlungen definieren können. Entscheidend ist, dass das Feld die ausdrucksbasierte Filterung für Zeitbereichsabfragen vollständig unterstützt und Abrufoperationen (Abfrage und Suche) einen Zeitzonenparameter für die sofortige, fliegende Konvertierung von Zeitstempeln in das erforderliche lokale Format bei der Ausgabe unterstützen.</li>
<li>Boost Ranker: Anstatt sich nur auf die semantische Ähnlichkeit zu verlassen, die auf der Grundlage von Vektorabständen berechnet wird, ermöglicht Boost Ranker Milvus, die optionale Filterbedingung innerhalb der Funktion zu verwenden, um Übereinstimmungen unter den Suchergebniskandidaten zu finden und die Punktzahlen dieser Übereinstimmungen durch Anwendung der angegebenen Gewichtung zu erhöhen, was dazu beiträgt, die Rangfolge der übereinstimmenden Entitäten im Endergebnis zu verbessern oder zu verschlechtern.</li>
<li>Der Index STL_SORT unterstützt jetzt die Datentypen VARCHAR und TIMESTAMPTZ.</li>
<li>Sie können jetzt das dynamische Feld einer bestehenden Sammlung aktivieren, indem Sie es ändern.</li>
<li>Cve-2025-63811 behoben.</li>
</ul>
<h3 id="Features" class="common-anchor-header">Merkmale<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Neue Konfiguration hinzugefügt und dynamische Update-Konfigurationen aktiviert<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
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
<li>Cve-2025-63811 behoben<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>Große Segment-ID-Arrays wurden aus den Querynode-Protokollen entfernt<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>Aktualisierte mehrere Stellen, an denen der expr die Eingabewerte in jeder Schleife kopierte<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>Optimierte Term-Expr-Leistung<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)</li>
<li>Vorgeholte Vektorbrocken für versiegelte nicht-indizierte Segmente<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>Expr: nur einmalige Vorabholung von Chunks<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>Unterstützung von nullable für Geometrie- und Timestamptz-Typen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>Session ttl von 10s auf 30s erhöht<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>Weitere Metriken für das ddl-Framework hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>Aktualisierte maxconnections Konfigurationsversion<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>Überspringt die Überprüfung der Quell-ID<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>Unterstützt max_connection config für Remote Storage<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>Verhinderte eine Panik durch Hinzufügen einer Null-Zeiger-Prüfung beim Löschen von insertrecord pk2offset<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>Optimierung des Abrufs skalarer Felder in Tiered Storage Szenarien<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>Tippfehler bei analyzer params behoben<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>Überschreibt index_type beim Erstellen eines Segment-Index<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)</li>
<li>rbac Unterstützung für updatereplicateconfiguration hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>Die go Version wurde auf 1.24.9 erhöht<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>Deaktiviert jsonshredding für die Standardkonfiguration<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>Vereinheitlichung des ausgerichteten Puffers sowohl für gepufferte als auch direkte E/A<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>Umbenennung von jsonstats bezogenen Benutzer-Konfigurationsparametern<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)</li>
<li>Knowhere Threadpool-Konfiguration aktualisierbar gemacht<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>Cherry-picked Patch des neuen ddl Frameworks und cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>Setzen der Schema-Version beim Erstellen einer neuen Sammlung<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>Unterstützt jsonl/ndjson Dateien für bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>Warten auf Beendigung des Replicate Stream Clients<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>Geometrycache wurde zu einer optionalen Konfiguration<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>Cherry-picked Patch des neuen ddl Frameworks und cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>Startete cdc nicht mehr standardmäßig<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>Rosinenpickender Patch für das neue ddl-Framework und cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)</li>
<li>Begrenzung der maximalen Anzahl von Vektorfeldern entfernt<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>Anzeige der Erstellungszeit für Importaufträge<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>Optimierte scalarindexsort Bitmap Initialisierung für Bereichsabfragen<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>Ermöglicht stl_sort die Unterstützung von varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>Extrahierte Shard Client Logik in ein eigenes Paket<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>Überarbeitung der Rechteverwaltung durch Extraktion des Rechte-Caches in ein eigenes Paket<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>Unterstützt json Standardwerte in fillfielddata<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>Aktualisierte enabledynamicfield und schemaversion während der Änderung der Sammlung<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
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
<li>Teilweise Update-Panik mit timestamptz behoben<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>Verwendet 2.6.6 für die Aktualisierung von milvus ddl<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>Benutzte den letzten Timetick, um den Cache ablaufen zu lassen<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>Streamingnode wurde beendet, wenn die Initialisierung fehlschlug<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>Geschützter tbb concurrent_map emplace, um Race Condition Deadlock zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)</li>
<li>Verhinderte Panik, wenn Streaming-Koordinaten heruntergefahren wurden, aber Query-Koordinaten noch funktionierten<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>Task-Init setzen, wenn Worker keine Aufgabe hatte<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)</li>
<li>Verhinderte Deadlock in der Runcomponent, wenn Prepare fehlschlug<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)</li>
<li>Verhinderte Panik beim doppelten Schließen des Kanals von ack broadcast<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)</li>
<li>Korrigierte Standardwert-Backfill während Addfield<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)</li>
<li>Die Zuweisungshistorie eines Kanals wurde komprimiert, um die Größe der Zuweisungswiederherstellungsinformationen zu verringern<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>Standardwerte wurden während der Verdichtung für hinzugefügte Felder korrekt behandelt<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>Entfernt wurde validatefieldname in dropindex<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>Die Verdichtungsaufgabe wurde ignoriert, wenn das from-Segment nicht gesund war<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>Setzen von Schemaeigenschaften vor der Übertragung von alter collection<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)</li>
<li>Datenbankereignis wurde gespeichert, wenn der Schlüssel ungültig war<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>Bulkimport-Fehler für struct-Feld behoben<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>Rohdaten für Hybrid-Index konnten nicht abgerufen werden<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>Frühzeitiges Zurückhalten der Sammlung, um zu verhindern, dass sie vor Abschluss der Abfrage freigegeben wird<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>Verwendete die richtige Ressource-Schlüsselsperre für ddl und verwendete neue ddl in der Transferreplik<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>Index-Kompatibilität nach Upgrade behoben<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>Behobener Channel-nicht-verfügbar-Fehler und Aufhebung der Sammlungssperrung<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>Entfernte Sammlungs-Meta, wenn Partition fallengelassen wurde<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>Behobenes Zielsegment, das beim Speichern von Statistiken zweimal als fallengelassen markiert wurde<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>Falsch aktualisierter Timetick der Sammlungsinfo<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>tzdata-Abhängigkeit hinzugefügt, um iana-Zeitzonenerkennung zu ermöglichen<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>Korrigierte Berechnung des Felddaten-Offsets in den Ranglistenfunktionen für die Massensuche<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>Korrigierte Filtergeometrie für Wachsen mit mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Nextfieldid berücksichtigte nicht struct<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>Gruppenwert war Null<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>Ermöglichte eine genaue Größenabschätzung für geslicte Pfeil-Arrays in der Verdichtung<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>Daten-Race im Replicate Stream Client behoben<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>Übersprungener Aufbau des Text-Index für neu hinzugefügte Spalten<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>Versehentlich wurden versiegelte Segmente in der l0-Kompaktierung ignoriert<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>Verschieben von finishload vor der Textindex-Erstellung, um die Verfügbarkeit von Rohdaten zu gewährleisten<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>Verwendete json_shredding nicht für json path is null<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>Rosinenpickende Korrekturen im Zusammenhang mit timestamptz<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321</a>)</li>
<li>Behobener Fehler beim Laden von Segmenten aufgrund eines "get disk usage"-Fehlers<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>Unterstützte json-Standardwerte bei der Verdichtung<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>Berechnet die korrekte Stapelgröße für den Geometrieindex des wachsenden Segments<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>Bug-Patch für das ddl-Framework angewendet<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>Behobener alter collection Fehler mit mmap Einstellung für struct<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>Initialisierter Zeitstempel-Bereich im zusammengesetzten binlog writer<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>Übersprungene Erstellung des tmp-Verzeichnisses für wachsenden r-tree Index<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>Vermeiden von potentiellen Race Conditions beim Aktualisieren des Executors<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>Erlaubte "[" und "]" im Indexnamen<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>Fehler beim Schreddern von json behoben, wenn json leer, aber nicht null ist<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>Sicherstellung, dass die Append-Operation nur von der Wal selbst abgebrochen werden kann, nicht aber von der RPC<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>Problem mit dem Zugriff auf wp gcp Cloud-Speicher mit ak/sk behoben<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>Import von Null-Geometriedaten behoben<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>Null-Prüfung für packed_writer_ in jsonstatsparquetwriter::close() hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>Fehler beim mmap emb_list_meta in der Einbettungsliste<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>Aktualisierte querynode numentities Metriken, wenn die Sammlung keine Segmente hatte<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>Verhinderte Wiederholungsversuche beim Importieren von ungültigen utf-8 Strings<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>Behandlung von leeren Felddaten in reduce/rerank für requery Szenario<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>Panik beim eleganten Beenden von cdc behoben<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>Kontamination des Auth-Tokens, oss/cos-Unterstützung, redundante Sync-Fehlerprotokolle behoben<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>Behandelte all-null Daten in stringindexsort, um Lade-Timeout zu verhindern<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>Deaktiviert das Erstellen alter Versionen von jsonstats aus Anfragen<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>Fehler beim Importieren von Geometriedaten behoben<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>Fehler beim Parkett-Import in struct behoben<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>getmetrics wieder zu indexnodeserver hinzugefügt, um Kompatibilität zu gewährleisten<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>Fehler bei alter collection für struct Unterfelder behoben<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>Behoben: mmap auf Auflistungsebene wirkt nicht für struct<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>Verhinderter Daten-Wettlauf in querycoord collection notifier update<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>Behandelte json Feld-Standardwerte in der Speicherebene<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>Doppelte Überprüfung, um zu verhindern, dass Iter von einem anderen Thread gelöscht werden<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>Fehler in der gis-Funktion zum Filtern von Geometrie behoben<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Erscheinungsdatum: November 11, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.5 ankündigen zu können, die eine <strong>kritische Sicherheitslücke</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> behebt und auf Go 1.24.9 aktualisiert wurde. Wir empfehlen <strong>allen Milvus 2.6.x-Benutzern</strong> dringend, so bald wie möglich <strong>auf 2.6.5 zu aktualisieren</strong>. Dieses Update enthält auch verschiedene andere Verbesserungen und Fehlerbehebungen und bietet den Nutzern eine robustere und effizientere Erfahrung.</p>
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
<li>Aktualisiertes Builder-Image-Tag zur Aktualisierung von go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>Übersprungene Überprüfung der Quell-ID<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
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
<li>Gruppenwert ist Null<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>Initialisierter Zeitstempelbereich im Composite Binlog Writer (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Behandlung von leeren Felddaten in reduce/rerank für requery Szenario (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Null-Prüfung für packed_writer_ in jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>Überspringen des Aufbaus eines Textindexes für neu hinzugefügte Spalten<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>Versehentlich wurden versiegelte Segmente in der l0-Kompaktierung ignoriert<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>Verschieben von finishload vor der Textindex-Erstellung, um die Verfügbarkeit von Rohdaten sicherzustellen<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>Unterstützte json-Standardwerte bei der Verdichtung<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>milvus-storage wurde aktualisiert, um doppelte aws sdk Initialisierung zu beheben (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Veröffentlichungsdatum: Oktober 21, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK-Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.4 ankündigen zu können, die eine Reihe von leistungsstarken neuen Funktionen, Leistungsverbesserungen und wichtigen Fehlerkorrekturen enthält. Mit diesem Update werden wichtige Funktionen wie Struct in ARRAY für die erweiterte Datenmodellierung eingeführt. Außerdem haben wir JSON Shredding standardmäßig aktiviert, was die Abfrageleistung und -effizienz weiter verbessert. Außerdem wurden mehrere kritische Fehler behoben, um mehr Stabilität und Zuverlässigkeit zu gewährleisten. Mit dieser Version bietet Milvus weiterhin eine robustere und effizientere Erfahrung für alle Benutzer. Nachfolgend finden Sie die wichtigsten Highlights dieser Version.</p>
<h3 id="Features" class="common-anchor-header">Merkmale<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Struct in ARRAY: Milvus hat den neuen Datentyp Struct eingeführt, der es Benutzern ermöglicht, mehrere zusammenhängende Felder innerhalb einer einzigen Entität zu organisieren und zu verwalten. Derzeit kann Struct nur als Element unter DataType.ARRAY verwendet werden, was Funktionen wie Array of Vector ermöglicht, bei denen jede Zeile mehrere Vektoren enthält, was neue Möglichkeiten für komplexe Datenmodellierung und Suche eröffnet.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>Unterstützt das Qwen GTE-rerank-v2 Modell in DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
<li>Unterstützter AISAQ-Index - ein All-in-Storage-Index<a href="https://github.com/zilliztech/knowhere/pull/1282">(#1282</a>)</li>
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
<li><strong>Aktualisierte Go Version auf 1.24.6</strong> mit Image Builder<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Aktiviert standardmäßiges JSON Shredding<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>Festplatten-Quota für geladene Binlog-Größe hinzugefügt, um Query Node-Ladefehler zu verhindern<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>Aktivierte mmap Unterstützung für struct array in MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>Caching Layer Management für TextMatchIndex hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>Optimierte Bitmap Reverse Lookup Leistung (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Aktualisierte Knowhere Version<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Entfernte logische Verwendungsprüfungen während des Segmentladens<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>Zugriffsprotokollfeld für Schablonenwert-Längeninformationen hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>Erlaubt das Überschreiben des aktuellen Indextyps während des Indexaufbaus<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>Ladeparameter für Vektorindex hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>Vereinheitlichte Verwaltung des Task-Status des Verdichtungsexecutors<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>Verfeinerte Logs für Task-Scheduler in QueryCoord hinzugefügt<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>Sicherstellung, dass accesslog.$consistency_level den tatsächlich verwendeten Wert repräsentiert (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Redundanter Channel Manager aus Datacoord entfernt<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
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
<li>GCC wurde aus dem Dockerfile entfernt, um ein CVE zu beheben<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>Sicherstellung einer deterministischen Reihenfolge der Suchergebnisse, wenn die Punktzahlen gleich sind<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>Reranked vor Neuabfrage, wenn Reranker keine Felddaten verwendet<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>Sicherstellung der Erfüllung von Versprechen, wenn CreateArrowFileSystem eine Exception auslöst<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>Fehlende Festplattenverschlüsselungs-Konfiguration behoben<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>Deaktivierte Gleichgewichtsprüfung verursachte ein Gleichgewichtsstopp-Problem<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>Problem behoben, bei dem "not equal" nicht "none" enthielt<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>Unterstützte JSON Standardwerte in CreateArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>Verwendete kurze Debug-Strings, um Zeilenumbrüche in Debug-Logs zu vermeiden<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>Korrigierter exists Ausdruck für JSON flat index<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>Vereinheitlichte JSON exists Pfad Semantik<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>Korrigierte Panik, verursacht durch leere interne Insert-Meldung<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>Aktualisierte AI/SAQ Parameter<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>Entfernte Begrenzung der Deduplizierung, wenn autoindex deaktiviert ist<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>Gleichzeitige Reset/Addd-Operationen auf DataCoord-Metriken wurden vermieden<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>Fehler in JSON_contains(path, int) behoben<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>Vermeidung von Eviction in der Caching-Schicht während der JSON-Verarbeitung<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>Behoben: Falsche Ergebnisse vom exp Filter, wenn übersprungen<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>Überprüft, ob Abfrageknoten SQN mit Label und Streaming Node Liste ist<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>Korrigierter BM25 mit Boost, der ungeordnete Ergebnisse zurückgibt<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>Behoben: Massenimport mit Auto-ID<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>Übergabe des Dateisystems via FileManagerContext beim Laden des Index<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>Verwendet "eventually" und korrigierte die Aufgaben-ID, die sowohl im Ausführungs- als auch im Abschluss-Status erscheint<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>Entfernte den falschen Startzeit-Tick, um das Filtern von DMLs zu vermeiden, deren Timeticks kleiner als dieser sind<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>AWS Credential Provider wurde zu einem Singleton gemacht<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>Deaktivierte Schredderung für JSON-Pfade, die Ziffern enthalten<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>Gültiger Unit-Test für TestUnaryRangeJsonNullable behoben<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>Reparierte Unit-Tests und entfernte Dateisystem Fallback-Logik<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
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
<tr><th style="text-align:left">Milvus Version</th><th style="text-align:left">Python SDK Version</th><th style="text-align:left">Node.js SDK Version</th><th style="text-align:left">Java SDK Version</th><th style="text-align:left">Go SDK Version</th></tr>
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
<li>Die C API Unit Test Dateien wurden zur besseren Organisation in das <code translate="no">src</code> Verzeichnis verschoben.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
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
<p>Wir freuen uns, die Veröffentlichung von Milvus 2.6.2 ankündigen zu können! Dieses Update bietet leistungsstarke neue Funktionen, erhebliche Leistungsverbesserungen und kritische Fehlerbehebungen, die das System stabiler und produktionsfähiger machen. Zu den Highlights gehören partielle Feldaktualisierungen mit Upsert, JSON Shredding zur Beschleunigung der dynamischen Feldfilterung, NGram-Indizierung für schnellere LIKE-Abfragen und eine flexiblere Schemaentwicklung bei bestehenden Sammlungen. Diese Version basiert auf dem Feedback der Community und bietet eine solidere Grundlage für reale Implementierungen. Wir empfehlen allen Benutzern ein Upgrade, um von diesen Verbesserungen zu profitieren.</p>
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
<li>Korrigierte wachsende Segmente, die bei Schema-Änderungen nicht gespült wurden<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
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
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming-Knoten (GA)</h4><p>In früheren Versionen wurden Streaming-Daten vom Proxy in die WAL geschrieben und vom QueryNode und DataNode gelesen. Diese Architektur machte es schwierig, einen Konsens auf der Schreibseite zu erreichen, und erforderte eine komplexe Logik auf der Leseseite. Außerdem befand sich der Query-Delegator im QueryNode, was die Skalierbarkeit behinderte. Mit Milvus 2.5.0 wurde der Streaming Node eingeführt, der in Version 2.6.0 zu GA wird. Diese Komponente ist nun für alle WAL-Lese-/Schreiboperationen auf Shard-Ebene verantwortlich und dient auch als Abfragedelegator, wodurch die oben genannten Probleme behoben und neue Optimierungen ermöglicht werden.</p>
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
