---
id: alert.md
title: Crear una alerta
related_key: monitor and alert.
summary: Aprenda a crear una alerta para los servicios Milvus en Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Crear una alerta para los servicios Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta el mecanismo de alerta para los servicios Milvus y explica por qué, cuándo y cómo crear alertas en Milvus.</p>
<p>Al crear alertas, puede recibir notificaciones cuando el valor de una métrica específica supere el umbral que haya predefinido.</p>
<p>Por ejemplo, usted crea una alerta y establece 80 MB como valor máximo para el uso de memoria por parte de los componentes de Milvus. Si el uso real supera el número predefinido, recibirá alertas que le recordarán que el uso de memoria por parte del componente Milvus supera los 80 MB. Una vez recibida la alerta, podrá ajustar la asignación de recursos en consecuencia y a tiempo para garantizar la disponibilidad del servicio.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Escenarios para la creación de alertas<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>A continuación se muestran algunos escenarios comunes para los que necesita crear una alerta.</p>
<ul>
<li>El uso de CPU o memoria por parte de los componentes de Milvus es demasiado elevado.</li>
<li>Los pods de componentes de Milvus tienen poco espacio en disco.</li>
<li>Los pods de componentes Milvus se reinician con demasiada frecuencia.</li>
</ul>
<p>Las siguientes métricas están disponibles para la configuración de alertas:</p>
<table>
<thead>
<tr><th>Métrica</th><th>Descripción</th><th>Unidad de medida</th></tr>
</thead>
<tbody>
<tr><td>Uso de CPU</td><td>Uso de la CPU por los componentes de Milvus que se indica mediante el tiempo de ejecución de la CPU.</td><td>Segundo</td></tr>
<tr><td>Memoria</td><td>Recursos de memoria consumidos por los componentes de Milvus.</td><td>MB</td></tr>
<tr><td>Goroutines</td><td>Actividades de ejecución concurrente en lenguaje GO.</td><td>/</td></tr>
<tr><td>Hilos de sistema operativo</td><td>Hilos o procesos ligeros en un sistema operativo.</td><td>/</td></tr>
<tr><td>Fds abiertos por proceso</td><td>El número actual de descriptores de archivo utilizados.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Configurar alertas<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta guía toma como ejemplo la creación de una alerta para el uso de memoria de los componentes de Milvus. Para crear otros tipos de alertas, por favor ajuste sus comandos en consecuencia. Si encuentra algún problema durante el proceso, no dude en preguntar en <a href="https://github.com/milvus-io/milvus/discussions">las discusiones de Github</a> o iniciar un hilo en <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Requisitos previos</h3><p>Este tutorial asume que tienes Grafana instalado y configurado. Si no es así, recomendamos leer la <a href="/docs/es/v2.4.x/monitor.md">guía de monitorización</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Añadir una nueva consulta</h3><p>Para añadir una alerta para el uso de memoria de los componentes de Milvus, edite el panel Memoria. A continuación, añada una nueva consulta con la métrica <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alerta_metrica</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Guarde el panel</h3><p>Guarde el panel y espere unos minutos para ver la alerta.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Alert_dashboard</span> </span></p>
<p>La consulta de alerta de Grafana no admite variables de plantilla. Por lo tanto, debes añadir una segunda consulta sin variables de plantilla en las etiquetas. La segunda consulta se llama "A" por defecto. Puedes cambiarle el nombre haciendo clic en el desplegable.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Consulta_alerta</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Añadir notificaciones de alerta</h3><p>Para recibir notificaciones de alerta, añada un &quot;canal de notificación&quot;. A continuación, especifique el canal en el campo &quot;Enviar a&quot;.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>Notificación_de_alerta</span> </span></p>
<p>Si la alerta se crea y activa correctamente, recibirá la notificación que se muestra en la siguiente captura de pantalla.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>Mensaje_notificación</span> </span></p>
<p>Para eliminar una alerta, vaya al panel "Alerta" y haga clic en el botón eliminar.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>Eliminar_alerta</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Siguiente paso<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si necesita iniciar servicios de monitorización para Milvus:<ul>
<li>Lea la <a href="/docs/es/v2.4.x/monitor.md">guía de monitorización</a></li>
<li>Aprenda a <a href="/docs/es/v2.4.x/visualize.md">visualizar las métricas de monitorización</a></li>
</ul></li>
<li>Si ha creado alertas para el uso de memoria por los componentes de Milvus:<ul>
<li>Aprenda a <a href="/docs/es/v2.4.x/allocate.md#standalone">asignar recursos</a></li>
</ul></li>
<li>Si está buscando información sobre cómo escalar un cluster Milvus:<ul>
<li>Aprenda a <a href="/docs/es/v2.4.x/scaleout.md">escalar un cluster Milvus</a></li>
</ul></li>
</ul>
