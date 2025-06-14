---
id: four_layers.md
summary: Estructura de desagregación almacenamiento/informática en Milvus.
title: Desagregación de almacenamiento/informática
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">Desagregación de almacenamiento/informática<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Siguiendo el principio de desagregación del plano de datos y el plano de control, Milvus comprende cuatro capas que son independientes entre sí en términos de escalabilidad y recuperación ante desastres.</p>
<h2 id="Access-layer" class="common-anchor-header">Capa de acceso<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>Compuesta por un grupo de proxies sin estado, la capa de acceso es la capa frontal del sistema y el punto final para los usuarios. Valida las solicitudes de los clientes y reduce los resultados devueltos:</p>
<ul>
<li>El proxy es en sí mismo apátrida. Proporciona una dirección de servicio unificada utilizando componentes de equilibrio de carga como Nginx, Kubernetes Ingress, NodePort y LVS.</li>
<li>Como Milvus emplea una arquitectura de procesamiento paralelo masivo (MPP), el proxy agrega y post-procesa los resultados intermedios antes de devolver los resultados finales al cliente.</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">Servicio de coordinación<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>El servicio coordinador asigna tareas a los nodos trabajadores y funciona como el cerebro del sistema. Entre las tareas que asume se incluyen la gestión de la topología del clúster, el equilibrio de la carga, la generación de marcas de tiempo, la declaración de datos y la gestión de datos.</p>
<p>Existen tres tipos de coordinadores: coordinador raíz (root coord), coordinador de datos (data coord) y coordinador de consultas (query coord).</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">Coordinador raíz (root coord)</h3><p>El coordinador raíz gestiona las solicitudes de lenguaje de definición de datos (DDL) y lenguaje de control de datos (DCL), como crear o eliminar colecciones, particiones o índices, así como gestionar la emisión de TSO (timestamp Oracle) y time ticker.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">Coordinador de consultas (query coord)</h3><p>El coordinador de consultas gestiona la topología y el equilibrio de carga de los nodos de consulta, así como el traspaso de segmentos en crecimiento a segmentos cerrados.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">Coordinador de datos (data coord)</h3><p>El coordinador de datos gestiona la topología de los nodos de datos y los nodos de índice, mantiene los metadatos y activa la descarga, compactación y creación de índices y otras operaciones de datos en segundo plano.</p>
<h2 id="Worker-nodes" class="common-anchor-header">Nodos de trabajo<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Los brazos y las piernas. Los nodos de trabajo son ejecutores mudos que siguen instrucciones del servicio de coordinación y ejecutan comandos de lenguaje de manipulación de datos (DML) desde el proxy. Los nodos de trabajo son apátridas gracias a la separación del almacenamiento y la computación, y pueden facilitar la escalabilidad del sistema y la recuperación ante desastres cuando se despliegan en Kubernetes. Existen tres tipos de nodos de trabajo:</p>
<h3 id="Query-node" class="common-anchor-header">Nodo de consulta</h3><p>El nodo de consulta recupera datos de registro incrementales y los convierte en segmentos crecientes suscribiéndose al corredor de registros, carga datos históricos del almacenamiento de objetos y ejecuta búsquedas híbridas entre datos vectoriales y escalares.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo de datos</h3><p>El nodo de datos recupera datos de registro incrementales suscribiéndose al agente de registros, procesa las solicitudes de mutación y empaqueta los datos de registro en instantáneas de registro y las almacena en el almacenamiento de objetos.</p>
<h3 id="Index-node" class="common-anchor-header">Nodo de índices</h3><p>El nodo de índices crea índices.  Los nodos de índice no necesitan ser residentes en memoria y pueden implementarse con el marco sin servidor.</p>
<h2 id="Storage" class="common-anchor-header">Almacenamiento<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>El almacenamiento es el hueso del sistema, responsable de la persistencia de los datos. Comprende el metaalmacenamiento, el log broker y el almacenamiento de objetos.</p>
<h3 id="Meta-storage" class="common-anchor-header">Metaalmacenamiento</h3><p>El metaalmacenamiento almacena instantáneas de metadatos, como el esquema de recopilación y los puntos de control de consumo de mensajes. El almacenamiento de metadatos exige una disponibilidad extremadamente alta, una fuerte consistencia y soporte de transacciones, por lo que Milvus eligió etcd para el metaalmacenamiento. Milvus también utiliza etcd para el registro de servicios y la comprobación del estado.</p>
<h3 id="Object-storage" class="common-anchor-header">Almacenamiento de objetos</h3><p>El almacenamiento de objetos almacena archivos de instantáneas de registros, archivos de índices para datos escalares y vectoriales y resultados intermedios de consultas. Milvus utiliza MinIO como almacenamiento de objetos y puede desplegarse fácilmente en AWS S3 y Azure Blob, dos de los servicios de almacenamiento más populares y rentables del mundo. Sin embargo, el almacenamiento de objetos tiene una alta latencia de acceso y cobra por el número de consultas. Para mejorar su rendimiento y reducir los costes, Milvus planea implementar la separación de datos en frío y en caliente en una reserva de caché basada en memoria o SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Almacenamiento WAL</h3><p>El almacenamiento WAL (Write-Ahead Log) es la base de la durabilidad y coherencia de los datos en los sistemas distribuidos. Antes de confirmar cualquier cambio, se registra en un registro, lo que garantiza que, en caso de fallo, se pueda recuperar la información exactamente donde se dejó.</p>
<p>Entre las implementaciones habituales de WAL se encuentran Kafka, Pulsar y Woodpecker. A diferencia de las soluciones tradicionales basadas en disco, Woodpecker adopta un diseño de disco cero nativo de la nube que escribe directamente en el almacenamiento de objetos. Este enfoque se adapta sin esfuerzo a sus necesidades y simplifica las operaciones al eliminar la sobrecarga de la gestión de discos locales.</p>
<p>Al registrar todas las operaciones de escritura con antelación, la capa WAL garantiza un mecanismo fiable en todo el sistema para la recuperación y la coherencia, independientemente de la complejidad de su entorno distribuido.</p>
<h2 id="Whats-next" class="common-anchor-header">Más información<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Lea <a href="/docs/es/main_components.md">Componentes principales</a> para obtener más detalles sobre la arquitectura Milvus.</li>
</ul>
