---
id: milvus-webui.md
summary: >-
  Milvus Web UI es una herramienta de gestión gráfica para Milvus. Mejora la
  observabilidad del sistema con una interfaz sencilla e intuitiva. Puede
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
    </button></h1><p>Milvus Web UI es una herramienta de gestión gráfica para Milvus. Mejora la observabilidad del sistema con una interfaz sencilla e intuitiva. Puede utilizar Milvus Web UI para observar las estadísticas y métricas de los componentes y dependencias de Milvus, comprobar los detalles de la base de datos y la colección, y listar las configuraciones detalladas de Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI difiere de Birdwatcher y Attu en que es una herramienta incorporada para proporcionar una observabilidad general del sistema con una interfaz sencilla e intuitiva.</p>
<p>La siguiente tabla compara las características de Milvus Web UI y Birdwatcher/Attu:</p>
<table>
<thead>
<tr><th>Característica</th><th>Milvus Web UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Forma operativa</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Usuarios objetivo</td><td>Responsables de mantenimiento, desarrolladores</td><td>Responsables</td><td>Desarrolladores</td></tr>
<tr><td>Instalación</td><td>Integrado en</td><td>Herramienta independiente</td><td>Herramienta independiente</td></tr>
<tr><td>Dependencias</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Funciones principales</td><td>Entorno de ejecución, detalles de la base de datos/colección, segmentos, canales, tareas y solicitudes de consultas lentas</td><td>Inspección de metadatos y ejecución de la API de Milvus</td><td>Gestión de bases de datos y tareas operativas</td></tr>
</tbody>
</table>
<p>Puede acceder a Milvus Web UI utilizando la siguiente URL:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI proporciona las siguientes características:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Visión general de Milvus Web UI</span> </span></p>
<ul>
<li><p><a href="#Home">Inicio</a></p>
<p>Puede encontrar información sobre la instancia Milvus en ejecución, sus componentes, clientes conectados y dependencias.</p></li>
<li><p><a href="#Collections">Colecciones</a></p>
<p>Puede ver la lista de bases de datos y colecciones actualmente en Milvus y comprobar sus detalles.</p></li>
<li><p><a href="#Query">Consulta</a></p>
<p>Puede ver las estadísticas recopiladas de los nodos de consulta y los coordinadores de consulta en términos de segmentos, canales, réplicas y grupos de recursos.</p></li>
<li><p><a href="#Data">Datos</a></p>
<p>Puede ver las estadísticas recopiladas de los nodos de datos en términos de segmentos y canales.</p></li>
<li><p><a href="#Tasks">Tareas</a></p>
<p>Puede ver la lista de tareas que se ejecutan en Milvus, incluidas las tareas del programador de Querycoord, las tareas de compactación, las tareas de creación de índices, las tareas de importación y las tareas de sincronización de datos.</p></li>
<li><p><a href="#Slow-requests">Peticiones lentas</a></p>
<p>Puede ver la lista de peticiones lentas en Milvus, incluyendo el tipo de petición, la duración de la petición y los parámetros de la petición.</p></li>
<li><p><a href="#Configurations">Configuraciones</a></p>
<p>Puede ver la lista de configuraciones de Milvus y sus valores.</p></li>
<li><p><a href="#Tools">Herramientas</a></p>
<p>Puede acceder a las dos herramientas integradas, pprof y la herramienta de visualización de datos de Milvus, desde la interfaz web.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Inicio<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>En la página de Inicio, puede encontrar la siguiente información:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Inicio de Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Información del sistema</strong>: Ver información del sistema, incluida información sobre el modo de despliegue, la imagen utilizada en el despliegue e información relacionada.</p></li>
<li><p><strong>Información del componente</strong>: Ver el estado y las métricas de los componentes en Milvus, incluyendo el estado y las métricas de los nodos de consulta, nodos de datos, nodos de índice, coordinadores y proxies.</p></li>
<li><p><strong>Clientes conectados</strong>: Vea los clientes conectados y su información, incluido el tipo y la versión del SDK, el nombre de usuario y su historial de acceso.</p></li>
<li><p><strong>Dependencias del sistema</strong>: Vea el estado y las métricas de las dependencias de Milvus, incluidos el estado y las métricas del metaalmacén, la cola de mensajes y el almacenamiento de objetos.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Colecciones<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>En la página Colecciones, puede ver la lista de bases de datos y colecciones actualmente en Milvus y comprobar sus detalles.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Colecciones de Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Base de datos</strong>: Vea la lista de bases de datos actualmente en Milvus y sus detalles.</p></li>
<li><p><strong>Colecciones</strong>: Vea la lista de colecciones en cada base de datos y sus detalles.</p>
<p>Puede hacer clic en una colección para ver sus detalles, incluido el número de campos, particiones, índices y otra información detallada.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Detalles de la colección de Milvus Web UI</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Consulta<button data-href="#Query" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Página de consulta de Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Segmentos</strong>: Vea la lista de segmentos y sus detalles, incluido el ID del segmento, la colección correspondiente, el estado, el tamaño, etc.</p></li>
<li><p><strong>Canales</strong>: Ver la lista de canales y sus detalles, incluido el nombre del canal, las colecciones correspondientes, etc.</p></li>
<li><p><strong>Réplicas</strong>: Ver la lista de réplicas y sus detalles, incluyendo el ID de réplica, la colección correspondiente, etc.</p></li>
<li><p><strong>Grupos de recursos</strong>: Ver la lista de grupos de recursos y sus detalles, incluyendo el nombre del grupo de recursos, el número de nodos de consulta en el grupo, y sus configuraciones, etc.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Datos<button data-href="#Data" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Página de datos de Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Segmentos</strong>: Ver la lista de segmentos de los nodos de datos/coordinadores y sus detalles, incluido el ID del segmento, la colección correspondiente, el estado, el tamaño, etc.</p></li>
<li><p><strong>Canales</strong>: Vea la lista de canales de los nodos/coordinadores de datos y sus detalles, incluido el nombre del canal, las colecciones correspondientes, etc.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Tareas<button data-href="#Tasks" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Página de tareas de Milvus Web UI</span> </span></p>
<ul>
<li><p><strong>Tareas</strong>: Ver la lista de tareas en ejecución en Milvus, incluyendo el tipo de tarea, estado y acciones.</p>
<ul>
<li><p><strong>Tareas QueryCoord</strong>: Ver todas las tareas del programador QueryCoord, incluidos los verificadores de equilibrador, índice/segmento/canal/líder en los últimos 15 minutos.</p></li>
<li><p><strong>Tareas</strong> de<strong>compactación</strong>: Ver todas las tareas de compactación de los coordinadores de datos en los últimos 15 minutos.</p></li>
<li><p><strong>Tareas</strong> de<strong>creación de índices</strong>: Ver todas las tareas de creación de índices de los coordinadores de datos en los últimos 30 minutos.</p></li>
<li><p><strong>Tareas</strong> de<strong>importación</strong>: Ver todas las tareas de importación de los coordinadores de datos en los últimos 30 minutos.</p></li>
<li><p><strong>Tareas</strong> de<strong>sincronización de datos</strong>: Ver todas las tareas de sincronización de datos de los nodos de datos en los últimos 15 minutos.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Solicitudes lentas<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Página de solicitudes lentas de Milvus Web UI</span> </span></p>
<ul>
<li><strong>Peticiones lentas</strong>: Una solicitud lenta es una búsqueda o una consulta que tiene una latencia superior al valor de <code translate="no">proxy.slowQuerySpanInSeconds</code> especificado en la configuración. La lista de peticiones lentas muestra todas las peticiones lentas de los últimos 15 minutos.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Configuraciones<button data-href="#Configurations" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Página de configuraciones de Milvus Web UI</span> </span></p>
<ul>
<li><strong>Configuraciones</strong>: Vea la lista de configuraciones de tiempo de ejecución de Milvus y sus valores.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Herramientas<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: Acceda a la herramienta pprof para perfilar y depurar Milvus.</p></li>
<li><p><strong>Herramienta de visualización de datos de Milvus</strong>: Acceda a la herramienta de visualización de datos de Milvus para visualizar los datos en Milvus.</p></li>
</ul>
