---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC es una herramienta fácil de usar que puede capturar y sincronizar
  datos incrementales en instancias Milvus.
title: Panorama de los CDC
---
<h1 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC es una herramienta fácil de usar que puede capturar y sincronizar datos incrementales en instancias Milvus. Garantiza la fiabilidad de los datos empresariales transfiriéndolos sin problemas entre las instancias de origen y de destino, lo que permite realizar fácilmente copias de seguridad incrementales y la recuperación ante desastres.</p>
<h2 id="Key-capabilities" class="common-anchor-header">Principales funciones<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>Sincronización secuencial de datos</strong>: Garantiza la integridad y coherencia de los datos sincronizando los cambios de datos secuencialmente entre las instancias de Milvus.</p></li>
<li><p><strong>Replicación incremental de datos</strong>: Replica datos incrementales, incluidas inserciones y eliminaciones, de Milvus de origen a Milvus de destino, ofreciendo almacenamiento persistente.</p></li>
<li><p><strong>Gestión de tareas CDC</strong>: Permite la gestión de tareas CDC a través de peticiones OpenAPI, incluyendo la creación, consulta de estado y eliminación de tareas CDC.</p></li>
</ul>
<p>Además, estamos planeando ampliar nuestras capacidades para incluir soporte para la integración con sistemas de procesamiento de flujos en el futuro.</p>
<h2 id="Architecture" class="common-anchor-header">Arquitectura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC adopta una arquitectura con dos componentes principales - un servidor HTTP que gestiona tareas y metadatos, y <strong>corelib</strong> que sincroniza la ejecución de tareas con un lector que obtiene datos de la instancia Milvus de origen y un escritor que envía datos procesados a la instancia Milvus de destino.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>arquitectura milvus-cdc</span> </span></p>
<p>En el diagrama anterior,</p>
<ul>
<li><p><strong>Servidor HTTP</strong>: Gestiona las peticiones de los usuarios, ejecuta las tareas y mantiene los metadatos. Sirve como plano de control para la orquestación de tareas dentro del sistema Milvus-CDC.</p></li>
<li><p><strong>Corelib</strong>: Responsable de la sincronización real de las tareas. Incluye un componente lector que recupera información del etcd y de la cola de mensajes (MQ) del Milvus de origen, y un componente escritor que traduce los mensajes de la MQ en parámetros API para el sistema Milvus y envía estas solicitudes al Milvus de destino para completar el proceso de sincronización.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">Flujo de trabajo<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>El flujo de procesamiento de datos Milvus-CDC implica los siguientes pasos:</p>
<ol>
<li><p><strong>Creación de tareas</strong>: Los usuarios inician una tarea CDC mediante peticiones HTTP.</p></li>
<li><p><strong>Recuperación de metadatos</strong>: El sistema recupera metadatos específicos de la colección del etcd de Milvus de origen, incluida la información del canal y del punto de control de la colección.</p></li>
<li><p><strong>Conexión MQ</strong>: Con los metadatos a mano, el sistema se conecta al MQ para comenzar a suscribirse al flujo de datos.</p></li>
<li><p><strong>Procesamiento de datos</strong>: Los datos de MQ se leen, se analizan y se transmiten utilizando el SDK Go o se procesan para replicar las operaciones realizadas en el Milvus de origen.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-workflow</span> </span></p>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>Sincronización incremental de datos</strong>: A partir de ahora, Milvus-CDC está diseñado para sincronizar sólo datos incrementales. Si su empresa necesita una copia de seguridad completa de los datos, póngase en <a href="https://milvus.io/community">contacto con nosotros</a> para obtener ayuda.</p></li>
<li><p><strong>Alcance de la sincronización</strong>: Actualmente, Milvus-CDC puede sincronizar datos a nivel de clúster. Estamos trabajando para añadir soporte para la sincronización de datos a nivel de colección en próximas versiones.</p></li>
<li><p><strong>Solicitudes de API compatibles</strong>: Milvus-CDC admite actualmente las siguientes solicitudes de API. Planeamos extender el soporte a solicitudes adicionales en futuras versiones:</p>
<ul>
<li><p>Crear/soltar colección</p></li>
<li><p>Insertar/Borrar/Upsertar</p></li>
<li><p>Crear/soltar partición</p></li>
<li><p>Crear/soltar índice</p></li>
<li><p>Cargar/Liberar/Vaciar</p></li>
<li><p>Cargar/liberar partición</p></li>
<li><p>Crear/soltar base de datos</p></li>
</ul></li>
</ul>
