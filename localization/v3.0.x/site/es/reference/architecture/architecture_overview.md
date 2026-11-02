---
id: architecture_overview.md
summary: >-
  Milvus ofrece una base de datos vectorial rápida, fiable y estable, diseñada
  específicamente para la búsqueda de similitudes y la inteligencia artificial.
title: Descripción general de la arquitectura de Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Descripción general de la arquitectura de Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus es una base de datos vectorial <strong>de código abierto</strong> y <strong>nativa de la nube</strong>, diseñada para realizar búsquedas de similitud de alto rendimiento en conjuntos de datos vectoriales masivos. Basada en bibliotecas populares de búsqueda vectorial, como Faiss, HNSW, DiskANN y SCANN, potencia las aplicaciones de IA y los escenarios de recuperación de datos no estructurados. Antes de continuar, familiarízate con los <a href="/docs/es/glossary.md">principios básicos</a> de la recuperación de representaciones.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Diagrama de arquitectura<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente diagrama ilustra la arquitectura general de Milvus, mostrando su diseño modular, escalable y nativo de la nube, con capas de almacenamiento y computación totalmente desagregadas.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>Diagrama_de_arquitectura</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Principios arquitectónicos<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus sigue el principio de desagregación del plano de datos y del plano de control, y consta de cuatro capas principales que son mutuamente independientes en términos de escalabilidad y recuperación ante desastres. Esta arquitectura de almacenamiento compartido, con capas de almacenamiento y computación totalmente desagregadas, permite el escalado horizontal de los nodos de computación, al tiempo que implementa Woodpecker como una capa WAL sin disco para aumentar la elasticidad y reducir la sobrecarga operativa.</p>
<p>Al separar el procesamiento de flujos en el nodo de streaming y el procesamiento por lotes en el nodo de consultas y el nodo de datos, Milvus alcanza un alto rendimiento al tiempo que cumple simultáneamente con los requisitos de procesamiento en tiempo real.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Arquitectura detallada de las capas<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Capa 1: Capa de acceso<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>Compuesta por un grupo de proxies sin estado, la capa de acceso es la capa frontal del sistema y el punto final para los usuarios. Valida las solicitudes de los clientes y filtra los resultados devueltos:</p>
<ul>
<li>El proxy es, en sí mismo, sin estado. Proporciona una dirección de servicio unificada mediante componentes de equilibrio de carga como Nginx, Kubernetes Ingress, NodePort y LVS.</li>
<li>Dado que Milvus emplea una arquitectura de procesamiento masivamente paralelo (MPP), el proxy agrega y procesa posteriormente los resultados intermedios antes de devolver los resultados finales al cliente.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Capa 2: Coordinador<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>El coordinador actúa como el cerebro de Milvus. En todo momento, hay exactamente un coordinador activo en todo el clúster, encargado de mantener la topología del clúster, programar todos los tipos de tareas y garantizar la coherencia a nivel del clúster.</p>
<p>A continuación se enumeran algunas de las tareas que gestiona el <strong>coordinador</strong>:</p>
<ul>
<li><strong>Gestión de DDL/DCL/TSO</strong>: gestiona las solicitudes de lenguaje de definición de datos (DDL) y de control de datos (DCL), como la creación o eliminación de colecciones, particiones o índices, así como la gestión de la marca de tiempo de Oracle (TSO) y la emisión de marcadores de tiempo.</li>
<li><strong>Gestión del servicio de streaming</strong>: vincula el registro de escritura anticipada (WAL) con los nodos de streaming y proporciona el descubrimiento de servicios para el servicio de streaming.</li>
<li><strong>Gestión de consultas</strong>: gestiona la topología y el equilibrio de carga de los nodos de consulta, y proporciona y gestiona las vistas de consulta que se sirven para guiar el enrutamiento de las consultas.</li>
<li><strong>Gestión de datos históricos</strong>: distribuye tareas fuera de línea, como la compactación y la creación de índices, a los nodos de datos, y gestiona la topología de los segmentos y las vistas de datos.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Capa 3: Nodos de trabajo<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Son los brazos y las piernas. Los nodos de trabajo son ejecutores «tontos» que siguen las instrucciones del coordinador. Los nodos de trabajo carecen de estado gracias a la separación entre almacenamiento y computación, y pueden facilitar la escalabilidad horizontal del sistema y la recuperación ante desastres cuando se implementan en Kubernetes. Existen tres tipos de nodos de trabajo:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nodo de streaming<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>El nodo de streaming actúa como un «minicerebro» a nivel de fragmento, proporcionando garantías de consistencia a nivel de fragmento y recuperación ante fallos basadas en el almacenamiento WAL subyacente. Al mismo tiempo, el nodo de streaming también se encarga de consultar los datos en crecimiento y de generar planes de consulta. Además, gestiona la conversión de los datos en crecimiento en datos sellados (históricos).</p>
<h3 id="Query-node" class="common-anchor-header">Nodo de consulta<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>El nodo de consulta carga los datos históricos desde el almacenamiento de objetos y permite la consulta de dichos datos.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo de datos<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>El nodo de datos se encarga del procesamiento fuera de línea de los datos históricos, como la compactación y la creación de índices.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Capa 4: Almacenamiento<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>El almacenamiento es la columna vertebral del sistema, responsable de la persistencia de los datos. Comprende el metalmacero, el gestor de registros y el almacenamiento de objetos.</p>
<h3 id="Meta-storage" class="common-anchor-header">Almacenamiento de metadatos<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>El metalmacenamiento almacena instantáneas de metadatos, como el esquema de la colección y los puntos de control de consumo de mensajes. El almacenamiento de metadatos exige una disponibilidad extremadamente alta, una consistencia fuerte y soporte para transacciones, por lo que Milvus eligió etcd como metalmaceno. Milvus también utiliza etcd para el registro de servicios y la comprobación de estado.</p>
<h3 id="Object-storage" class="common-anchor-header">Almacenamiento de objetos<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>El almacenamiento de objetos conserva los datos y los archivos de índice. Milvus es compatible con backends de almacenamiento de objetos como MinIO, AWS S3 y Azure Blob Storage. Los QueryNodes almacenan en caché los datos y los índices necesarios para atender las consultas.</p>
<p>Con <a href="/docs/es/tiered-storage-overview.md">el almacenamiento por niveles</a>, disponible en Milvus 2.6.4 y versiones posteriores, los QueryNodes pueden cargar primero los metadatos de los segmentos y recuperar los datos de los campos o los índices bajo demanda, en lugar de cargarlo todo durante la inicialización. El almacenamiento de objetos remoto sigue siendo la fuente persistente; eliminar una entrada de la caché local no borra los datos almacenados. El acceso a datos no almacenados en caché añade E/S de almacenamiento y puede aumentar la latencia de las consultas. Utiliza <a href="/docs/es/warm-up.md">«Warm Up»</a> para campos o índices sensibles a la latencia, y evalúa tanto la latencia de las consultas «frías» como la de la caché «tibia» antes de elegir una estrategia de carga.</p>
<h3 id="WAL-storage" class="common-anchor-header">Almacenamiento WAL<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>El almacenamiento del registro de escritura anticipada (WAL) es la base de la durabilidad y la consistencia de los datos en los sistemas distribuidos. Antes de que se confirme cualquier cambio, este se registra primero en un registro, lo que garantiza que, en caso de fallo, se pueda recuperar exactamente desde donde se dejó.</p>
<p>Entre las implementaciones habituales de WAL se incluyen Kafka, Pulsar y Woodpecker. A diferencia de las soluciones tradicionales basadas en disco, Woodpecker adopta un diseño nativo de la nube y sin disco que escribe directamente en el almacenamiento de objetos. Este enfoque se adapta sin esfuerzo a tus necesidades y simplifica las operaciones al eliminar la sobrecarga que supone la gestión de discos locales.</p>
<p>Al registrar cada operación de escritura con antelación, la capa WAL garantiza un mecanismo fiable a nivel de todo el sistema para la recuperación y la consistencia, independientemente de lo complejo que llegue a ser su entorno distribuido.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Flujo de datos y categorías de API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Las API de Milvus se clasifican según su función y siguen rutas específicas a través de la arquitectura:</p>
<table>
<thead>
<tr><th>Categoría de API</th><th>Operaciones</th><th>Ejemplos de API</th><th>Flujo de la arquitectura</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Esquema y control de acceso</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Capa de acceso → Coordinador</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulación de datos</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Capa de acceso → Nodo de trabajo de streaming</td></tr>
<tr><td><strong>DQL</strong></td><td>Consulta de datos</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Capa de acceso → Nodo de procesamiento por lotes (nodos de consulta)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Ejemplo de flujo de datos: operación de búsqueda<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>El cliente envía una solicitud de búsqueda a través del SDK o la API RESTful</li>
<li>El equilibrador de carga redirige la solicitud al proxy disponible en la capa de acceso</li>
<li>El proxy utiliza la caché de enrutamiento para determinar los nodos de destino; solo se pone en contacto con el coordinador si la caché no está disponible</li>
<li>El proxy reenvía la solicitud a los nodos de streaming adecuados, que a su vez se coordinan con los nodos de consulta para la búsqueda de datos sellados, al tiempo que ejecutan localmente la búsqueda en datos en crecimiento</li>
<li>Los nodos de consulta cargan segmentos sellados desde el almacenamiento de objetos según sea necesario y realizan la búsqueda a nivel de segmento</li>
<li>Los resultados de la búsqueda se someten a una reducción multinivel: los nodos de consulta reducen los resultados a través de múltiples segmentos, los nodos de streaming reducen los resultados de los nodos de consulta y el proxy reduce los resultados de todos los nodos de streaming antes de devolverlos al cliente</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Ejemplo de flujo de datos: inserción de datos<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>El cliente envía una solicitud de inserción con datos vectoriales</li>
<li>La capa de acceso valida y reenvía la solicitud al nodo de streaming</li>
<li>El nodo de streaming registra la operación en el almacenamiento WAL para garantizar la durabilidad</li>
<li>Los datos se procesan en tiempo real y se ponen a disposición para las consultas</li>
<li>Cuando los segmentos alcanzan su capacidad máxima, el nodo de streaming activa la conversión a segmentos sellados</li>
<li>El nodo de datos se encarga de la compactación y crea índices sobre los segmentos sellados, almacenando los resultados en el almacenamiento de objetos</li>
<li>Los nodos de consulta cargan los índices recién creados y sustituyen los datos correspondientes que van creciendo</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Explora los <a href="/docs/es/main_components.md">componentes principales</a> para conocer los detalles específicos de la implementación</li>
<li>Infórmate sobre los flujos de trabajo <a href="/docs/es/data_processing.md">de procesamiento de datos</a> y las estrategias de optimización</li>
<li>Comprende el <a href="/docs/es/tune_consistency.md">modelo de consistencia</a> y las garantías de transacción en Milvus</li>
</ul>
