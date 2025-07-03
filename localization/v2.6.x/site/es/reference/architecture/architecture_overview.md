---
id: architecture_overview.md
summary: >-
  Milvus proporciona una base de datos vectorial rápida, fiable y estable
  construida específicamente para la búsqueda de similitudes y la inteligencia
  artificial.
title: Visión general de la arquitectura de Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Visión general de la arquitectura de Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus es una base de datos vectorial <strong>de código abierto</strong>, <strong>nativa de la nube</strong>, diseñada para la búsqueda de similitud de alto rendimiento en conjuntos de datos vectoriales masivos. Construida sobre librerías populares de búsqueda vectorial, incluyendo Faiss, HNSW, DiskANN y SCANN, potencia las aplicaciones de IA y los escenarios de recuperación de datos no estructurados. Antes de continuar, familiarícese con los <a href="/docs/es/glossary.md">principios básicos</a> de la recuperación por incrustación.</p>
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
    </button></h2><p>El siguiente diagrama ilustra la arquitectura de alto nivel de Milvus, mostrando su diseño modular, escalable y nativo de la nube con capas de almacenamiento y computación totalmente desagregadas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Diagrama_de_arquitectura</span> </span></p>
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
    </button></h2><p>Milvus sigue el principio de desagregación del plano de datos y el plano de control, y consta de cuatro capas principales que son independientes entre sí en términos de escalabilidad y recuperación ante desastres. Esta arquitectura de almacenamiento compartido con capas de almacenamiento y computación totalmente desagregadas permite el escalado horizontal de los nodos de computación al tiempo que implementa Woodpecker como capa WAL de disco cero para aumentar la elasticidad y reducir la sobrecarga operativa.</p>
<p>Al separar el procesamiento de flujos en Streaming Node y el procesamiento por lotes en Query Node y Data Node, Milvus consigue un alto rendimiento y satisface simultáneamente los requisitos de procesamiento en tiempo real.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Arquitectura detallada de capas<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Capa 1: Capa de acceso</h3><p>Compuesta por un grupo de proxies sin estado, la capa de acceso es la capa frontal del sistema y el punto final para los usuarios. Valida las solicitudes de los clientes y reduce los resultados devueltos:</p>
<ul>
<li>El proxy es en sí mismo apátrida. Proporciona una dirección de servicio unificada utilizando componentes de equilibrio de carga como Nginx, Kubernetes Ingress, NodePort y LVS.</li>
<li>Como Milvus emplea una arquitectura de procesamiento paralelo masivo (MPP), el proxy agrega y post-procesa los resultados intermedios antes de devolver los resultados finales al cliente.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Capa 2: Coordinador</h3><p>El Coordinador es el cerebro de Milvus. En cualquier momento, hay exactamente un Coordinador activo en todo el clúster, responsable de mantener la topología del clúster, programar todos los tipos de tareas y garantizar la coherencia a nivel de clúster.</p>
<p>Las siguientes son algunas de las tareas gestionadas por el <strong>Coordinador</strong>:</p>
<ul>
<li><strong>Gestión de DDL/DCL/TSO</strong>: Gestiona las solicitudes del lenguaje de definición de datos (DDL) y del lenguaje de control de datos (DCL), como la creación o eliminación de colecciones, particiones o índices, así como la gestión de la marca de tiempo Oracle (TSO) y la emisión de marcas de tiempo.</li>
<li><strong>Gestión de servicios de streaming</strong>: Vincula el registro de escritura en cabeza (WAL) con los nodos de streaming y proporciona el descubrimiento de servicios para el servicio de streaming.</li>
<li><strong>Gestión de consultas</strong>: Gestiona la topología y el equilibrio de carga para los nodos de consulta, y proporciona y gestiona las vistas de consulta de servicio para guiar el enrutamiento de la consulta.</li>
<li><strong>Gestión de datos históricos</strong>: Distribuye tareas fuera de línea como la compactación y la creación de índices a los Nodos de Datos, y gestiona la topología de segmentos y vistas de datos.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Capa 3: Nodos de trabajo</h3><p>Los brazos y las piernas. Los nodos de trabajo son ejecutores mudos que siguen las instrucciones del coordinador. Los nodos de trabajo son apátridas gracias a la separación del almacenamiento y la computación, y pueden facilitar la escalabilidad del sistema y la recuperación ante desastres cuando se despliegan en Kubernetes. Existen tres tipos de nodos trabajadores:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nodo de streaming</h3><p>Streaming Node actúa como "mini-cerebro" a nivel de shard, proporcionando garantías de consistencia a nivel de shard y recuperación de fallos basada en el almacenamiento WAL subyacente. Mientras tanto, Streaming Node también es responsable de la consulta de datos crecientes y de la generación de planes de consulta. Además, también se encarga de la conversión de los datos crecientes en datos sellados (históricos).</p>
<h3 id="Query-node" class="common-anchor-header">Nodo de consulta</h3><p>El nodo de consulta carga los datos históricos desde el almacenamiento de objetos y proporciona la consulta de datos históricos.</p>
<h3 id="Data-node" class="common-anchor-header">Nodo de datos</h3><p>El nodo de datos es responsable del procesamiento fuera de línea de los datos históricos, como la compactación y la creación de índices.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Capa 4: Almacenamiento</h3><p>El almacenamiento es el núcleo del sistema, responsable de la persistencia de los datos. Comprende el metaalmacenamiento, el corredor de registros y el almacenamiento de objetos.</p>
<h3 id="Meta-storage" class="common-anchor-header">Metaalmacenamiento</h3><p>El metaalmacenamiento almacena instantáneas de metadatos, como el esquema de recopilación y los puntos de control de consumo de mensajes. El almacenamiento de metadatos exige una disponibilidad extremadamente alta, una fuerte consistencia y soporte de transacciones, por lo que Milvus eligió etcd para el metaalmacenamiento. Milvus también utiliza etcd para el registro de servicios y la comprobación del estado.</p>
<h3 id="Object-storage" class="common-anchor-header">Almacenamiento de objetos</h3><p>El almacenamiento de objetos almacena archivos de instantáneas de registros, archivos de índices para datos escalares y vectoriales y resultados intermedios de consultas. Milvus utiliza MinIO como almacenamiento de objetos y puede desplegarse fácilmente en AWS S3 y Azure Blob, dos de los servicios de almacenamiento más populares y rentables del mundo. Sin embargo, el almacenamiento de objetos tiene una alta latencia de acceso y cobra por el número de consultas. Para mejorar su rendimiento y reducir los costes, Milvus planea implementar la separación de datos en frío y en caliente en una reserva de caché basada en memoria o SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Almacenamiento WAL</h3><p>El almacenamiento WAL (Write-Ahead Log) es la base de la durabilidad y coherencia de los datos en los sistemas distribuidos. Antes de confirmar cualquier cambio, se registra en un registro, lo que garantiza que, en caso de fallo, se pueda recuperar la información exactamente donde se dejó.</p>
<p>Entre las implementaciones habituales de WAL se encuentran Kafka, Pulsar y Woodpecker. A diferencia de las soluciones tradicionales basadas en disco, Woodpecker adopta un diseño de disco cero nativo de la nube que escribe directamente en el almacenamiento de objetos. Este enfoque se adapta sin esfuerzo a sus necesidades y simplifica las operaciones al eliminar la sobrecarga de la gestión de discos locales.</p>
<p>Al registrar todas las operaciones de escritura con antelación, la capa WAL garantiza un mecanismo fiable en todo el sistema para la recuperación y la coherencia, independientemente de la complejidad de su entorno distribuido.</p>
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
    </button></h2><p>Las API de Milvus se clasifican por su función y siguen rutas específicas a través de la arquitectura:</p>
<table>
<thead>
<tr><th>Categoría de API</th><th>Operaciones</th><th>Ejemplo de API</th><th>Flujo de la arquitectura</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Esquema y control de acceso</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Capa de acceso → Coordinador</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulación de Datos</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Capa de acceso → Nodo de trabajo de streaming</td></tr>
<tr><td><strong>DQL</strong></td><td>Consulta de datos</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Capa de acceso → Nodo de trabajo por lotes (nodos de consulta)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Ejemplo de flujo de datos: operación de búsqueda</h3><ol>
<li>El cliente envía una solicitud de búsqueda a través de SDK/RESTful API</li>
<li>El equilibrador de carga enruta la solicitud al proxy disponible en la capa de acceso</li>
<li>El proxy utiliza la caché de enrutamiento para determinar los nodos de destino; sólo se pone en contacto con el coordinador si la caché no está disponible.</li>
<li>El proxy reenvía la solicitud a los nodos de transmisión adecuados, que a su vez se coordinan con los nodos de consulta para la búsqueda de datos sellados mientras ejecutan localmente la búsqueda de datos crecientes.</li>
<li>Los nodos de consulta cargan los segmentos sellados desde el almacenamiento de objetos según sea necesario y realizan la búsqueda a nivel de segmento.</li>
<li>Los resultados de la búsqueda se someten a una reducción multinivel: Los nodos de consulta reducen los resultados en varios segmentos, los nodos de transmisión reducen los resultados de los nodos de consulta y el proxy reduce los resultados de todos los nodos de transmisión antes de devolverlos al cliente.</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Ejemplo de flujo de datos: inserción de datos</h3><ol>
<li>El cliente envía una solicitud de inserción con datos vectoriales</li>
<li>La capa de acceso valida y reenvía la solicitud al nodo de transmisión.</li>
<li>El nodo de transmisión registra la operación en el almacenamiento WAL para garantizar su durabilidad.</li>
<li>Los datos se procesan en tiempo real y están disponibles para consultas</li>
<li>Cuando los segmentos alcanzan su capacidad, el nodo de transmisión activa la conversión a segmentos sellados.</li>
<li>El nodo de datos se encarga de la compactación y crea índices sobre los segmentos sellados, almacenando los resultados en el almacenamiento de objetos.</li>
<li>Los nodos de consulta cargan los índices recién creados y sustituyen los datos crecientes correspondientes.</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Explore los <a href="/docs/es/main_components.md">componentes</a> principales para conocer los detalles de implementación</li>
<li>Conozca los flujos de trabajo <a href="/docs/es/data_processing.md">de procesamiento de datos</a> y las estrategias de optimización</li>
<li>Comprender el <a href="/docs/es/consistency.md">Modelo de Consistencia</a> y las garantías de transacción en Milvus</li>
</ul>
