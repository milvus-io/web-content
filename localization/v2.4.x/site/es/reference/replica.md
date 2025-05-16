---
id: replica.md
summary: Más información sobre la réplica en memoria en Milvus.
title: Réplica en memoria
---
<h1 id="In-Memory-Replica" class="common-anchor-header">Réplica en memoria<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta el mecanismo de réplica en memoria en Milvus que permite múltiples réplicas de segmentos en la memoria de trabajo para mejorar el rendimiento y la disponibilidad.</p>
<p>Para obtener información sobre cómo configurar réplicas en memoria, consulte <a href="/docs/es/v2.4.x/configure_querynode.md#queryNodereplicas">Configuraciones relacionadas con nodos de consulta</a>.</p>
<h2 id="Overview" class="common-anchor-header">Resumen<button data-href="#Overview" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>Disponibilidad_de_las_réplicas</span> </span></p>
<p>Con las réplicas en memoria, Milvus puede cargar el mismo segmento en múltiples nodos de consulta. Si un nodo de consulta ha fallado o está ocupado con una solicitud de búsqueda actual cuando llega otra, el sistema puede enviar nuevas solicitudes a un nodo de consulta inactivo que tenga una réplica del mismo segmento.</p>
<h3 id="Performance" class="common-anchor-header">Rendimiento</h3><p>Las réplicas en memoria permiten aprovechar recursos adicionales de CPU y memoria. Es muy útil si tiene un conjunto de datos relativamente pequeño pero desea aumentar el rendimiento de lectura con recursos de hardware adicionales. El QPS (consultas por segundo) y el rendimiento general pueden mejorar significativamente.</p>
<h3 id="Availability" class="common-anchor-header">Disponibilidad</h3><p>Las réplicas en memoria ayudan a Milvus a recuperarse más rápidamente si falla un nodo de consulta. Cuando falla un nodo de consulta, no es necesario volver a cargar el segmento en otro nodo de consulta. En su lugar, la solicitud de búsqueda puede reenviarse a un nuevo nodo de consulta inmediatamente sin tener que volver a cargar los datos. Con múltiples réplicas de segmentos mantenidas simultáneamente, el sistema es más resistente ante una conmutación por error.</p>
<h2 id="Key-Concepts" class="common-anchor-header">Conceptos clave<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Las réplicas en memoria se organizan como grupos de réplicas. Cada grupo de réplica contiene réplicas de <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">fragmentos</a>. Cada réplica de fragmento tiene una réplica de flujo y una réplica histórica que corresponden a los <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmentos</a> en crecimiento y sellados en el fragmento (es decir, el canal DML).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>Ilustración del funcionamiento de las réplicas en memoria</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">Grupo de réplica</h3><p>Un grupo de réplica consiste en múltiples <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">nodos de consulta</a> que son responsables de manejar los datos históricos y las réplicas.</p>
<h3 id="Shard-replica" class="common-anchor-header">Réplica de fragmentos</h3><p>Una réplica de fragmento consta de una réplica de flujo y una réplica histórica, ambas pertenecientes al mismo <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">fragmento</a>. El número de réplicas de fragmentos de un grupo de réplicas viene determinado por el número de fragmentos de una colección específica.</p>
<h3 id="Streaming-replica" class="common-anchor-header">Réplica de flujo</h3><p>Una réplica de streaming contiene todos los <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmentos crecientes</a> del mismo canal DML. Técnicamente hablando, una réplica de streaming debe ser servida por un solo nodo de consulta en una réplica.</p>
<h3 id="Historical-replica" class="common-anchor-header">Réplica histórica</h3><p>Una réplica histórica contiene todos los segmentos sellados del mismo canal DML. Los segmentos sellados de una réplica histórica pueden distribuirse en varios nodos de consulta dentro del mismo grupo de réplicas.</p>
<h3 id="Shard-leader" class="common-anchor-header">Líder de fragmentos</h3><p>Un líder de fragmento es el nodo de consulta que sirve la réplica de flujo en una réplica de fragmento.</p>
<h2 id="Design-Details" class="common-anchor-header">Detalles de diseño<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">Equilibrio</h3><p>Un nuevo segmento que deba cargarse se asignará a varios nodos de consulta diferentes. Una petición de búsqueda puede procesarse una vez que al menos una réplica se ha cargado correctamente.</p>
<h3 id="Search" class="common-anchor-header">Búsqueda</h3><h4 id="Cache" class="common-anchor-header">Caché</h4><p>El proxy mantiene una caché que asigna segmentos a nodos de consulta y la actualiza periódicamente. Cuando el proxy recibe una petición, Milvus obtiene de la caché todos los segmentos sellados que necesitan ser buscados e intenta asignarlos a los nodos de consulta de manera uniforme.</p>
<p>Para los segmentos en crecimiento, el proxy también mantiene una caché de canal a nodo de consulta y envía solicitudes a los nodos de consulta correspondientes.</p>
<h4 id="Failover" class="common-anchor-header">Conmutación por error</h4><p>Las cachés del proxy no siempre están actualizadas. Algunos segmentos o canales pueden haberse movido a otros nodos de consulta cuando llega una petición. En este caso, el proxy recibirá una respuesta de error, actualizará la caché e intentará asignarlo a otro nodo de consulta.</p>
<p>Un segmento se ignorará si el proxy sigue sin encontrarlo tras actualizar la caché. Esto puede ocurrir si el segmento ha sido compactado.</p>
<p>Si la caché no es precisa, el proxy puede pasar por alto algunos segmentos. Los nodos de consulta con canales DML (segmentos crecientes) devuelven respuestas de búsqueda junto con una lista de segmentos fiables con los que el proxy puede comparar y actualizar la caché.</p>
<h3 id="Enhancement" class="common-anchor-header">Mejora</h3><p>El proxy no puede asignar las peticiones de búsqueda a los nodos de consulta de forma completamente equitativa y los nodos de consulta pueden tener diferentes recursos para servir las peticiones de búsqueda. Para evitar una distribución de recursos con colas largas, el proxy asignará segmentos activos en otros nodos de consulta a un nodo de consulta inactivo que también disponga de estos segmentos.</p>
