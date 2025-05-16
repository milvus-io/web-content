---
id: visualize.md
title: Metriken visualisieren
related_key: 'monitor, alert'
summary: 'Erfahren Sie, wie Sie Milvus-Metriken in Grafana visualisieren können.'
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Visualisierung von Milvus-Metriken in Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema beschreibt, wie man Milvus-Metriken mit Grafana visualisiert.</p>
<p>Wie im <a href="/docs/de/v2.4.x/monitor.md">Überwachungshandbuch</a> beschrieben, enthalten Metriken nützliche Informationen, wie z. B. wie viel Speicher von einer bestimmten Milvus-Komponente verwendet wird. Die Überwachung von Metriken hilft Ihnen, die Leistung von Milvus und seinen Betriebsstatus besser zu verstehen, so dass Sie die Ressourcenzuweisung rechtzeitig anpassen können.</p>
<p>Die Visualisierung ist ein Diagramm, das die Veränderung der Ressourcennutzung über die Zeit anzeigt, was es Ihnen erleichtert, die Veränderungen der Ressourcennutzung schnell zu sehen und zu bemerken, insbesondere wenn ein Ereignis eintritt.</p>
<p>In diesem Tutorial wird Grafana, eine Open-Source-Plattform für Zeitreihenanalysen, verwendet, um verschiedene Leistungsmetriken eines Milvus-Clusters zu visualisieren, der auf Kubernetes (K8s) bereitgestellt wird.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Sie haben <a href="/docs/de/v2.4.x/install_cluster-helm.md">einen Milvus-Cluster auf K8s) installiert</a>.</li>
<li>Sie müssen <a href="/docs/de/v2.4.x/monitor.md">Prometheus</a> für die Überwachung und Erfassung von Metriken <a href="/docs/de/v2.4.x/monitor.md">konfigurieren</a>, bevor Sie Grafana zur Visualisierung der Metriken verwenden können. Wenn die Einrichtung erfolgreich war, können Sie auf Grafana unter <code translate="no">http://localhost:3000</code> zugreifen. Oder Sie können Grafana auch über die Standard-Grafana-Seite <code translate="no">user:password</code> von <code translate="no">admin:admin</code> aufrufen.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Visualisieren von Metriken mit Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Herunterladen und Importieren des Dashboards</h3><p>Laden Sie das Milvus Dashboard herunter und importieren Sie es aus der JSON-Datei.</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>Herunterladen_und_Importieren</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Metriken anzeigen</h3><p>Wählen Sie die Milvus-Instanz aus, die Sie überwachen möchten. Dann sehen Sie das Milvus-Komponenten-Panel.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Instanz auswählen</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Grafana_Bedienfeld</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Wenn Sie Grafana so eingestellt haben, dass es Milvus-Metriken visualisiert, möchten Sie das vielleicht auch:<ul>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/alert.md">einen Alarm für Milvus-Dienste erstellen</a></li>
<li>Ihre <a href="/docs/de/v2.4.x/allocate.md">Ressourcenzuweisung</a> anpassen</li>
<li><a href="/docs/de/v2.4.x/scaleout.md">Skalieren Sie einen Milvus-Cluster aus oder ein</a></li>
</ul></li>
<li>Wenn Sie an einem Upgrade der Milvus-Version interessiert sind,<ul>
<li>Lesen Sie den <a href="/docs/de/v2.4.x/upgrade_milvus_cluster-operator.md">Leitfaden für das Upgrade von Milvus-Cluster</a> und <a href="/docs/de/v2.4.x/upgrade_milvus_standalone-operator.md">den Leitfaden für das Upgrade von Milvus-Standalone</a>.</li>
</ul></li>
</ul>
