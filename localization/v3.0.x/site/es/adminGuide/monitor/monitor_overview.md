---
id: monitor_overview.md
title: Descripción general del monitor
related_key: 'monitor, alert'
summary: >-
  Descubre cómo se utilizan Prometheus y Grafana en Milvus para la supervisión y
  las alertas de los servicios.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Descripción general del marco de monitorización de Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>En este tema se explica cómo Milvus utiliza Prometheus para supervisar métricas y Grafana para visualizarlas y crear alertas.</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> es un conjunto de herramientas de código abierto para la monitorización y las alertas en implementaciones de Kubernetes. Recopila y almacena métricas como datos de series temporales. Esto significa que las métricas se almacenan con marcas de tiempo en el momento de su registro, junto con pares clave-valor opcionales denominados «etiquetas».</p>
<p>Actualmente, Milvus utiliza los siguientes componentes de Prometheus:</p>
<ul>
<li>El punto final de Prometheus para extraer datos de los puntos finales establecidos por los exportadores.</li>
<li>El operador de Prometheus para gestionar de forma eficaz las instancias de monitorización de Prometheus.</li>
<li>Kube-prometheus, para proporcionar una monitorización de clústeres de Kubernetes de extremo a extremo fácil de manejar.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nombres de métricas<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Un nombre de métrica válido en Prometheus contiene tres elementos: espacio de nombres, subsistema y nombre. Estos tres elementos se unen mediante el símbolo «_».</p>
<p>El espacio de nombres de las métricas de Milvus supervisadas por Prometheus es «milvus». El subsistema de una métrica es uno de los siguientes: «cdc», «cgo», «datacoord», «datanode», «indexnode», «logging», «meta», «msg_queue», «msgstream», «proxy», «querycoord», «querynode», «rootcoord», «storage», «streaming», «streamingcoord», «streamingnode» y «wal». Algunas métricas, como <code translate="no">milvus_build_info</code> y <code translate="no">milvus_num_node</code>, no tienen subsistema.</p>
<p>Por ejemplo, la métrica de Milvus que calcula el número total de vectores consultados se denomina « <code translate="no">milvus_proxy_search_vectors_count</code> ».</p>
<h3 id="Metric-types" class="common-anchor-header">Tipos de métricas<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus admite cuatro tipos de métricas:</p>
<ul>
<li>Contador: un tipo de métrica acumulativa cuyo valor solo puede aumentar o restablecerse a cero al reiniciar el sistema.</li>
<li>Indicador: un tipo de métrica cuyo valor puede tanto subir como bajar.</li>
<li>Histograma: un tipo de métrica que se contabiliza en función de intervalos configurables. Un ejemplo habitual es la duración de las solicitudes.</li>
<li>Resumen: un tipo de métrica similar al histograma que calcula cuantiles configurables en una ventana de tiempo deslizante.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Etiquetas de métricas<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus distingue las muestras con el mismo nombre de métrica mediante el uso de etiquetas. Una etiqueta es un atributo concreto de una métrica. Las métricas con el mismo nombre deben tener el mismo valor en el campo « <code translate="no">variable_labels</code> ». La siguiente tabla recoge los nombres y significados de las etiquetas más comunes de las métricas de Milvus.</p>
<table>
<thead>
<tr><th>Nombre de la etiqueta</th><th>Definición</th><th>Valores</th></tr>
</thead>
<tbody>
<tr><td>«node_id»</td><td>La identidad única de un rol.</td><td>Un identificador único a nivel global generado por Milvus.</td></tr>
<tr><td>«status»</td><td>El estado de una operación o solicitud procesada.</td><td>«abandon», «success» o «fail».</td></tr>
<tr><td>«query_type»</td><td>El tipo de una solicitud de lectura.</td><td>«search» o «query».</td></tr>
<tr><td>«msg_type»</td><td>El tipo de mensajes.</td><td>«insert», «delete», «search» o «query».</td></tr>
<tr><td>«segment_state»</td><td>El estado de un segmento.</td><td>«Sealed», «Growing», «Flushed», «Flushing», «Dropped» o «Importing».</td></tr>
<tr><td>«cache_state»</td><td>El estado de un objeto almacenado en caché.</td><td>«hit» o «miss».</td></tr>
<tr><td>«cache_name»</td><td>El nombre de un objeto almacenado en caché. Esta etiqueta se utiliza junto con la etiqueta «cache_state».</td><td>Por ejemplo: «CollectionID», «Schema», etc.</td></tr>
<tr><td>«channel_name»</td><td>Temas físicos en el almacenamiento de mensajes (Pulsar o Kafka).</td><td>Por ejemplo: «by-dev-rootcoord-dml_0», «by-dev-rootcoord-dml_255», etc.</td></tr>
<tr><td>«function_name»</td><td>El nombre de una función que gestiona determinadas solicitudes.</td><td>Por ejemplo: «CreateCollection», «CreatePartition», «CreateIndex», etc.</td></tr>
<tr><td>«user_name»</td><td>El nombre de usuario utilizado para la autenticación.</td><td>Un nombre de usuario de su elección.</td></tr>
<tr><td>«index_task_status»</td><td>El estado de una tarea de indexación en el metalmemoria.</td><td>«unissued», «in-progress», «failed», «finished» o «recycled».</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> es una plataforma de visualización de código abierto que puede conectarse con todas las fuentes de datos. Al extraer métricas, ayuda a los usuarios a comprender, analizar y supervisar grandes volúmenes de datos.</p>
<p>Milvus utiliza los paneles personalizables de Grafana para la visualización de métricas.</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que conozcas el flujo de trabajo básico de la supervisión y las alertas, aprende:</p>
<ul>
<li><a href="/docs/es/monitor.md">Implementar servicios de supervisión</a></li>
<li><a href="/docs/es/visualize.md">Visualizar métricas de Milvus</a></li>
<li><a href="/docs/es/alert.md">Crear una alerta</a></li>
</ul>
