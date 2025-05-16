---
id: visualize.md
title: Visualizar métricas
related_key: 'monitor, alert'
summary: Aprenda a visualizar las métricas de Milvus en Grafana.
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Visualizar las métricas de Milvus en Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema describe cómo visualizar las métricas de Milvus usando Grafana.</p>
<p>Como se describe en la <a href="/docs/es/v2.4.x/monitor.md">guía de monitoreo</a>, las métricas contienen información útil como cuánta memoria utiliza un componente específico de Milvus. El monitoreo de las métricas le ayuda a comprender mejor el rendimiento de Milvus y su estado de ejecución para que pueda ajustar la asignación de recursos a tiempo.</p>
<p>La visualización es un gráfico que muestra el cambio del uso de recursos a través del tiempo, lo que le facilita ver y notar rápidamente los cambios en el uso de recursos, especialmente cuando ocurre un evento.</p>
<p>Este tutorial utiliza Grafana, una plataforma de código abierto para el análisis de series temporales, para visualizar varias métricas de rendimiento de un clúster Milvus desplegado en Kubernetes (K8s).</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Ha <a href="/docs/es/v2.4.x/install_cluster-helm.md">instalado un clúster Milvus en K8s)</a>.</li>
<li>Debe <a href="/docs/es/v2.4.x/monitor.md">configurar Prometheus</a> para supervisar y recopilar métricas antes de utilizar Grafana para visualizar las métricas. Si la configuración se realiza correctamente, puede acceder a Grafana en <code translate="no">http://localhost:3000</code>. O también puede acceder a Grafana utilizando la dirección predeterminada de Grafana <code translate="no">user:password</code> de <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Visualización de métricas con Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Descargue e importe el panel de control</h3><p>Descargue e importe el cuadro de mandos de Milvus desde el archivo JSON.</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>Descargar_e_importar</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Ver métricas</h3><p>Seleccione la instancia de Milvus que desea supervisar. Entonces podrá ver el panel de componentes de Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Seleccionar_instancia</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Panel_Grafana</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si ha configurado Grafana para visualizar las métricas de Milvus, es posible que también desee:<ul>
<li>Aprender a <a href="/docs/es/v2.4.x/alert.md">crear una alerta para los servicios de Milvus</a></li>
<li>Ajustar su <a href="/docs/es/v2.4.x/allocate.md">asignación de recursos</a></li>
<li><a href="/docs/es/v2.4.x/scaleout.md">Reducir o ampliar un clúster Milvus</a></li>
</ul></li>
<li>Si está interesado en actualizar la versión de Milvus,<ul>
<li>Lea la <a href="/docs/es/v2.4.x/upgrade_milvus_cluster-operator.md">guía para</a> <a href="/docs/es/v2.4.x/upgrade_milvus_standalone-operator.md">actualizar</a> <a href="/docs/es/v2.4.x/upgrade_milvus_cluster-operator.md">Milvus cluster</a> y <a href="/docs/es/v2.4.x/upgrade_milvus_standalone-operator.md">la</a> <a href="/docs/es/v2.4.x/upgrade_milvus_cluster-operator.md">guía</a> <a href="/docs/es/v2.4.x/upgrade_milvus_standalone-operator.md">para actualizar Milvus standalone</a>.</li>
</ul></li>
</ul>
