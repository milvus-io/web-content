---
id: milvus-webui.md
summary: >-
  Milvus Web UI ist ein grafisches Verwaltungstool für Milvus. Es verbessert die
  Beobachtbarkeit des Systems durch eine einfache und intuitive Schnittstelle.
  Sie können
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI ist ein grafisches Verwaltungswerkzeug für Milvus. Es verbessert die Beobachtbarkeit des Systems mit einer einfachen und intuitiven Schnittstelle. Sie können Milvus Web UI verwenden, um die Statistiken und Metriken der Komponenten und Abhängigkeiten von Milvus zu beobachten, Datenbank- und Sammlungsdetails zu überprüfen und detaillierte Milvus-Konfigurationen aufzulisten.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI unterscheidet sich von Birdwatcher und Attu dadurch, dass es ein integriertes Tool ist, das eine allgemeine Systembeobachtung mit einer einfachen und intuitiven Oberfläche ermöglicht.</p>
<p>Die folgende Tabelle vergleicht die Funktionen von Milvus Web UI und Birdwatcher/Attu:</p>
<table>
<thead>
<tr><th>Funktion</th><th>Milvus Web UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Bedienbare Form</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Ziel-Benutzer</td><td>Maintainer, Entwickler</td><td>Maintainer</td><td>Entwickler</td></tr>
<tr><td>Installation</td><td>Eingebaut</td><td>Eigenständiges Werkzeug</td><td>Eigenständiges Werkzeug</td></tr>
<tr><td>Abhängigkeiten</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Primäre Funktionalitäten</td><td>Laufzeitumgebung, Datenbank-/Sammlungsdetails, Segmente, Kanäle, Aufgaben und langsame Abfragen</td><td>Überprüfung von Metadaten und Ausführung der Milvus-API</td><td>Datenbankmanagement und operative Aufgaben</td></tr>
<tr><td>Verfügbar seit</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>Ab v2.5.0 können Sie auf einer laufenden Milvus-Instanz über die folgende URL auf die Milvus Web UI zugreifen:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">Funktionen<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI bietet die folgenden Funktionen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Übersicht</span> </span></p>
<ul>
<li><p><a href="#Home">Startseite</a></p>
<p>Hier finden Sie Informationen über die aktuell laufende Milvus-Instanz, ihre Komponenten, verbundene Clients und Abhängigkeiten.</p></li>
<li><p><a href="#Collections">Sammlungen</a></p>
<p>Sie können die Liste der Datenbanken und Sammlungen, die sich derzeit in Milvus befinden, einsehen und deren Details überprüfen.</p></li>
<li><p><a href="#Query">Abfrage</a></p>
<p>Sie können die gesammelten Statistiken der Abfrageknoten und Abfragekoordinatoren in Bezug auf Segmente, Kanäle, Replikate und Ressourcengruppen einsehen.</p></li>
<li><p><a href="#Data">Daten</a></p>
<p>Sie können die gesammelten Statistiken der Datenknoten in Bezug auf Segmente und Kanäle anzeigen.</p></li>
<li><p><a href="#Tasks">Tasks</a></p>
<p>Sie können die Liste der in Milvus laufenden Tasks anzeigen, einschließlich Querycoord-Scheduler-Tasks, Verdichtungs-Tasks, Indexerstellungs-Tasks, Import-Tasks und Datensynchronisierungs-Tasks.</p></li>
<li><p><a href="#Slow-requests">Langsame Anfragen</a></p>
<p>Sie können die Liste der langsamen Anfragen in Milvus anzeigen, einschließlich des Anfragetyps, der Anfragedauer und der Anfrageparameter.</p></li>
<li><p><a href="#Configurations">Konfigurationen</a></p>
<p>Sie können die Liste der Milvus-Konfigurationen und deren Werte anzeigen.</p></li>
<li><p><a href="#Tools">Werkzeuge</a></p>
<p>Über die Web-UI können Sie auf die beiden integrierten Tools pprof und Milvus-Datenvisualisierung zugreifen.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Startseite<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>Auf der Home-Seite finden Sie die folgenden Informationen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Startseite</span> </span></p>
<ul>
<li><p><strong>System-Informationen</strong>: Zeigen Sie Systeminformationen an, einschließlich Informationen über den Bereitstellungsmodus, das bei der Bereitstellung verwendete Image und zugehörige Informationen.</p></li>
<li><p><strong>Komponenten-Informationen</strong>: Zeigen Sie den Status und die Metriken der Komponenten in Milvus an, einschließlich des Status und der Metriken der Abfrageknoten, Datenknoten, Indexknoten, Koordinatoren und Proxys.</p></li>
<li><p><strong>Verbundene Clients</strong>: Zeigen Sie die verbundenen Clients und ihre Informationen an, einschließlich SDK-Typ und -Version, Benutzername und Zugriffshistorie.</p></li>
<li><p><strong>System-Abhängigkeiten</strong>: Zeigen Sie den Status und die Metriken der Abhängigkeiten von Milvus an, einschließlich des Status und der Metriken des Metaspeichers, der Nachrichtenwarteschlange und des Objektspeichers.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Sammlungen<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Auf der Seite Sammlungen können Sie die Liste der Datenbanken und Sammlungen, die sich derzeit in Milvus befinden, einsehen und deren Details überprüfen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Sammlungen</span> </span></p>
<ul>
<li><p><strong>Datenbank</strong>: Zeigen Sie die Liste der derzeit in Milvus vorhandenen Datenbanken und deren Details an.</p></li>
<li><p><strong>Sammlungen</strong>: Zeigen Sie die Liste der Sammlungen in jeder Datenbank und deren Details an.</p>
<p>Sie können auf eine Sammlung klicken, um ihre Details zu sehen, einschließlich der Anzahl der Felder, Partitionen, Indizes und anderer Informationen im Detail.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Sammlungsdetails</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Abfrage<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Abfrage Seite</span> </span></p>
<ul>
<li><p><strong>Segmente</strong>: Zeigen Sie die Liste der Segmente und ihre Details an, einschließlich der Segment-ID, der entsprechenden Sammlung, des Status, der Größe usw.</p></li>
<li><p><strong>Kanäle</strong>: Zeigen Sie die Liste der Kanäle und deren Details an, einschließlich des Kanalnamens, der entsprechenden Sammlungen usw.</p></li>
<li><p><strong>Replikate</strong>: Zeigen Sie die Liste der Replikate und deren Details an, einschließlich der Replikat-ID, der zugehörigen Sammlung usw.</p></li>
<li><p><strong>Ressourcengruppen</strong>: Zeigen Sie die Liste der Ressourcengruppen und ihre Details an, einschließlich des Namens der Ressourcengruppe, der Anzahl der Abfrageknoten in der Gruppe und ihrer Konfigurationen usw.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Daten<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Daten Seite</span> </span></p>
<ul>
<li><p><strong>Segmente</strong>: Zeigen Sie die Liste der Segmente aus den Datenknoten/Koordinatoren und deren Details an, einschließlich der Segment-ID, der entsprechenden Sammlung, des Status, der Größe usw.</p></li>
<li><p><strong>Kanäle</strong>: Zeigen Sie die Liste der Kanäle von den Datenknoten/Koordinatoren und deren Details an, einschließlich des Kanalnamens, der entsprechenden Sammlungen usw.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Aufgaben<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Aufgaben Seite</span> </span></p>
<ul>
<li><p><strong>Aufgaben</strong>: Zeigen Sie die Liste der in Milvus laufenden Aufgaben an, einschließlich des Aufgabentyps, des Status und der Aktionen.</p>
<ul>
<li><p><strong>QueryCoord-Aufgaben</strong>: Anzeige aller QueryCoord Scheduler-Tasks, einschließlich Balancer, Index/Segment/Channel/Leader Checker der letzten 15 Minuten.</p></li>
<li><p><strong>Verdichtungs-Aufgaben</strong>: Anzeige aller Verdichtungsaufgaben der Datenkoordinatoren in den letzten 15 Minuten.</p></li>
<li><p><strong>Indexerstellungs-Aufgaben</strong>: Zeigt alle Indexerstellungsaufgaben der Datenkoordinatoren der letzten 30 Minuten an.</p></li>
<li><p><strong>Import-Aufgaben</strong>: Zeigt alle Importaufgaben der Datenkoordinatoren der letzten 30 Minuten an.</p></li>
<li><p><strong>Daten-Synchronisations-Aufgaben</strong>: Zeigen Sie alle Datensynchronisierungsaufgaben der Datenknoten in den letzten 15 Minuten an.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Langsame Anfragen<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Seite Langsame Anfragen</span> </span></p>
<ul>
<li><strong>Langsame Anfragen</strong>: Eine langsame Anfrage ist eine Suche oder eine Abfrage, deren Latenzzeit länger ist als der in der Konfiguration angegebene Wert von <code translate="no">proxy.slowQuerySpanInSeconds</code>. Die Liste der langsamen Anfragen zeigt alle langsamen Anfragen der letzten 15 Minuten an.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Konfigurationen<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Konfigurationen Seite</span> </span></p>
<ul>
<li><strong>Konfigurationen</strong>: Zeigt die Liste der Milvus-Laufzeitkonfigurationen und deren Werte an.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Werkzeuge<button data-href="#Tools" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>pprof</strong>: Zugriff auf das pprof-Tool zur Profilerstellung und Fehlersuche in Milvus.</p></li>
<li><p><strong>Milvus-Datenvisualisierungstool</strong>: Zugriff auf das Milvus-Datenvisualisierungstool zur Visualisierung der Daten in Milvus.</p></li>
</ul>
