---
id: monitor_overview.md
title: Resumen del monitor
related_key: 'monitor, alert'
summary: >-
  Descubra cómo se utilizan Prometheus y Grafana en Milvus para los servicios de
  supervisión y alerta.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Visión general del marco de supervisión de Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema explica cómo Milvus utiliza Prometheus para supervisar las métricas y Grafana para visualizar las métricas y crear alertas.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus en Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> es un conjunto de herramientas de supervisión y alerta de código abierto para implementaciones de Kubernetes. Recopila y almacena métricas como datos de series temporales. Esto significa que las métricas se almacenan con marcas de tiempo cuando se registran, junto con pares clave-valor opcionales denominados etiquetas.</p>
<p>Actualmente Milvus utiliza los siguientes componentes de Prometheus:</p>
<ul>
<li>Prometheus endpoint para extraer datos de endpoints establecidos por exportadores.</li>
<li>Prometheus operator para gestionar eficazmente las instancias de supervisión de Prometheus.</li>
<li>Kube-prometheus para proporcionar una monitorización de clústeres Kubernetes de extremo a extremo fácil de operar.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nombres de métricas</h3><p>Un nombre de métrica válido en Prometheus contiene tres elementos: espacio de nombres, subsistema y nombre. Estos tres elementos están conectados con &quot;_&quot;.</p>
<p>El espacio de nombres de las métricas de Milvus supervisadas por Prometheus es &quot;milvus&quot;. Dependiendo del rol al que pertenezca una métrica, su subsistema debe ser uno de los ocho roles siguientes: &quot;rootcoord&quot;, &quot;proxy&quot;, &quot;querycoord&quot;, &quot;querynode&quot;, &quot;indexcoord&quot;, &quot;indexnode&quot;, &quot;datacoord&quot;, &quot;datanode&quot;.</p>
<p>Por ejemplo, la métrica Milvus que calcula el número total de vectores consultados se denomina <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Tipos de métricas</h3><p>Prometheus admite cuatro tipos de métricas:</p>
<ul>
<li>Contador: un tipo de métrica acumulativa cuyo valor solo puede aumentar o ponerse a cero al reiniciarse.</li>
<li>Gauge: un tipo de métrica cuyo valor puede subir o bajar.</li>
<li>Histograma: un tipo de métrica que se cuenta en función de cubos configurables. Un ejemplo común es la duración de la solicitud.</li>
<li>Resumen: un tipo de métrica similar al histograma que calcula cuantiles configurables sobre una ventana de tiempo deslizante.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Etiquetas de métricas</h3><p>Prometheus diferencia muestras con el mismo nombre de métrica etiquetándolas. Una etiqueta es un atributo determinado de una métrica. Las métricas con el mismo nombre deben tener el mismo valor para el campo <code translate="no">variable_labels</code>. La siguiente tabla enumera los nombres y significados de las etiquetas comunes de las métricas de Milvus.</p>
<table>
<thead>
<tr><th>Nombre de la etiqueta</th><th>Definición</th><th>Valores</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>La identidad única de un rol.</td><td>Un ID único global generado por milvus.</td></tr>
<tr><td>"status"</td><td>El estado de una operación o solicitud procesada.</td><td>&quot;abandono&quot;, &quot;éxito&quot; o &quot;fallo&quot;.</td></tr>
<tr><td>"tipo_consulta"</td><td>El tipo de una solicitud de lectura.</td><td>&quot;search&quot; o &quot;query&quot;.</td></tr>
<tr><td>"msg_type"</td><td>El tipo de mensajes.</td><td>&quot;insert&quot;, &quot;delete&quot;, &quot;search&quot; o &quot;query&quot;.</td></tr>
<tr><td>"segment_state"</td><td>El estado de un segmento.</td><td>&quot;Sealed&quot;, &quot;Growing&quot;, &quot;Flushed&quot;, &quot;Flushing&quot;, &quot;Dropped&quot; o &quot;Importing&quot;.</td></tr>
<tr><td>"cache_state"</td><td>Estado de un objeto almacenado en caché.</td><td>&quot;Acierto&quot; o &quot;fallo&quot;.</td></tr>
<tr><td>"cache_name"</td><td>El nombre de un objeto almacenado en caché. Esta etiqueta se utiliza junto con la etiqueta &quot;cache_state&quot;.</td><td>Por ejemplo, &quot;CollectionID&quot;, &quot;Schema&quot;, etc.</td></tr>
<tr><td>&quot;nombre_canal&quot;</td><td>Temas físicos en el almacenamiento de mensajes (Pulsar o Kafka).</td><td>Por ejemplo, &quot;by-dev-rootcoord-dml_0&quot;, &quot;by-dev-rootcoord-dml_255&quot;, etc.</td></tr>
<tr><td>"nombre_función"</td><td>El nombre de una función que gestiona determinadas peticiones.</td><td>Por ejemplo, &quot;CreateCollection&quot;, &quot;CreatePartition&quot;, &quot;CreateIndex&quot;, etc.</td></tr>
<tr><td>"nombre_usuario"</td><td>El nombre de usuario utilizado para la autenticación.</td><td>Un nombre de usuario de su preferencia.</td></tr>
<tr><td>"estado_tarea_índice"</td><td>El estado de una tarea de índice en metaalmacenamiento.</td><td>&quot;no emitida&quot;, &quot;en curso&quot;, &quot;fallida&quot;, &quot;finalizada&quot; o &quot;reciclada&quot;.</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana en Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> es una pila de visualización de código abierto que puede conectarse con todas las fuentes de datos. Al extraer métricas, ayuda a los usuarios a comprender, analizar y supervisar datos masivos.</p>
<p>Milvus utiliza los paneles personalizables de Grafana para la visualización de métricas.</p>
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
    </button></h2><p>Después de conocer el flujo de trabajo básico de la monitorización y las alertas, aprenda:</p>
<ul>
<li><a href="/docs/es/v2.4.x/monitor.md">Desplegar servicios de supervisión</a></li>
<li><a href="/docs/es/v2.4.x/visualize.md">Visualizar las métricas de Milvus</a></li>
<li><a href="/docs/es/v2.4.x/alert.md">Crear una alerta</a></li>
</ul>
