---
id: cdc-monitoring.md
order: 4
summary: Milvus-CDC bietet umfassende Überwachungsfunktionen über Grafana-Dashboards.
title: Überwachung
---
<h1 id="Monitoring" class="common-anchor-header">Überwachung<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC bietet umfassende Überwachungsfunktionen über Grafana-Dashboards, die es Ihnen ermöglichen, wichtige Metriken zu visualisieren und den reibungslosen Betrieb Ihrer Change Data Capture (CDC)-Aufgaben und den Serverzustand sicherzustellen.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Metriken für CDC-Aufgaben</h3><p>Um zu beginnen, importieren Sie die Datei <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> in Grafana. Dadurch wird ein Dashboard hinzugefügt, das speziell für die Überwachung des Status von CDC-Aufgaben entwickelt wurde.</p>
<p><strong>CDC Grafana Dashboard Übersicht</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>Schlüsselmetriken erklärt:</strong></p>
<ul>
<li><p><strong>Aufgabe</strong>: Anzahl der CDC-Aufgaben in verschiedenen Zuständen, einschließlich <strong>Initial</strong>, <strong>Running</strong> und <strong>Paused</strong>.</p></li>
<li><p><strong>Request Total</strong>: Gesamtzahl der von Milvus-CDC empfangenen Anfragen.</p></li>
<li><p><strong>Anfrage Erfolg</strong>: Anzahl der erfolgreichen Anfragen, die von Milvus-CDC empfangen wurden.</p></li>
<li><p><strong>Aufgabe num</strong>: Anzahl der Aufgaben in den Zuständen <strong>Initial</strong>, <strong>Paused</strong> und <strong>Running</strong> über die Zeit.</p></li>
<li><p><strong>task state</strong>: Zustand der einzelnen Aufgaben.</p></li>
<li><p><strong>request count</strong>: Anzahl der erfolgreichen und gesamten Anfragen</p></li>
<li><p><strong>Anfrage-Latenzzeit</strong>: Latenzzeit der Anfragen durch p99, Durchschnitt und andere Statistiken.</p></li>
<li><p><strong>Replikationsdatenrate</strong>: Replikationsdatenrate für Lese-/Schreibvorgänge</p></li>
<li><p><strong>replicate tt lag</strong>: Replikationszeitverzögerung für Lese-/Schreibvorgänge.</p></li>
<li><p><strong>api execute count</strong>: Anzahl, wie oft verschiedene Milvus-CDC-APIs ausgeführt wurden</p></li>
<li><p><strong>center ts</strong>: Zeitstempel für Lese-/Schreibvorgänge.</p></li>
</ul>
