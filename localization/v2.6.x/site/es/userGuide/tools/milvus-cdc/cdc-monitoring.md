---
id: cdc-monitoring.md
order: 4
summary: >-
  Milvus-CDC proporciona capacidades de supervisión exhaustivas a través de los
  paneles de control de Grafana.
title: Supervisión
---
<h1 id="Monitoring" class="common-anchor-header">Supervisión<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC proporciona capacidades integrales de supervisión a través de paneles de Grafana, lo que le permite visualizar métricas clave y garantizar el buen funcionamiento de sus tareas de Captura de Datos de Cambios (CDC) y la salud del servidor.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Métricas para tareas CDC</h3><p>Para empezar, importe el archivo <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> a Grafana. Esto añadirá un panel de control diseñado específicamente para supervisar el estado de las tareas de CDC.</p>
<p><strong>Descripción general del panel CDC Grafana</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>Explicación de las métricas clave:</strong></p>
<ul>
<li><p><strong>Tarea</strong>: Número de tareas CDC en diferentes estados, incluidos <strong>Inicial</strong>, <strong>En ejecución</strong> y <strong>En pausa</strong>.</p></li>
<li><p><strong>Total de solicitudes</strong>: Número total de solicitudes recibidas por Milvus-CDC.</p></li>
<li><p><strong>Éxito de la solicitud</strong>: Número de solicitudes recibidas con éxito por Milvus-CDC.</p></li>
<li><p><strong>Número de tareas</strong>: Número de tareas en los estados <strong>Inicial</strong>, <strong>En pausa</strong> y <strong>En</strong> ejecución a lo largo del tiempo.</p></li>
<li><p><strong>Estado de la tarea</strong>: Estado de las tareas individuales.</p></li>
<li><p><strong>recuento de solicitudes</strong>: Número de solicitudes correctas y totales.</p></li>
<li><p><strong>latencia de solicitudes</strong>: Latencia de las peticiones a través de p99, media y otras estadísticas.</p></li>
<li><p><strong>tasa de replicación de datos</strong>: Tasa de datos de replicación para operaciones de lectura/escritura.</p></li>
<li><p><strong>Replicate tt lag</strong>: Tiempo de repliegue para operaciones de lectura/escritura.</p></li>
<li><p><strong>api execute count</strong>: Número de veces que se han ejecutado distintas API de Milvus-CDC.</p></li>
<li><p><strong>center ts</strong>: Marca de tiempo para las tareas de lectura/escritura.</p></li>
</ul>
