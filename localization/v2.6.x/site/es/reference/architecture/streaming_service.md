---
id: streaming_service.md
title: Servicio de streaming
summary: >-
  El Servicio de Streaming es un concepto para el módulo del sistema de
  streaming interno de Milvus, construido alrededor del Registro de Escritura en
  Cabecera (WAL) para soportar varias funciones relacionadas con el streaming.
---
<h1 id="Streaming-Service" class="common-anchor-header">Servicio de streaming<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p>El <strong>Servicio</strong> de Streaming es un concepto para el módulo del sistema de streaming interno de Milvus, construido alrededor del Registro de Escritura en Cabecera (WAL) para soportar varias funciones relacionadas con el streaming. Entre ellas se incluyen la ingesta/suscripción de datos de streaming, la recuperación ante fallos del estado del clúster, la conversión de datos de streaming en datos históricos y las consultas de datos crecientes. Desde el punto de vista arquitectónico, el servicio de streaming consta de tres componentes principales:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>Arco distribuido de streaming</span> </span></p>
<ul>
<li><p><strong>Coordinador de Streaming</strong>: Un componente lógico en el nodo coordinador. Utiliza Etcd para el descubrimiento de servicios con el fin de localizar los nodos de streaming disponibles y se encarga de vincular la WAL a los nodos de streaming correspondientes. También registra el servicio para exponer la topología de distribución de WAL, permitiendo a los clientes de streaming conocer el nodo de streaming apropiado para un WAL dado.</p></li>
<li><p><strong>Clúster de nodos de streaming</strong>: Un clúster de nodos trabajadores de streaming responsables de todas las tareas de procesamiento de streaming, como la anexión de wal, la recuperación de estado, la consulta de datos en crecimiento.</p></li>
<li><p><strong>Cliente de streaming</strong>: Un cliente Milvus desarrollado internamente que encapsula funcionalidades básicas como el descubrimiento de servicios y las comprobaciones de disponibilidad. Se utiliza para iniciar operaciones como la escritura de mensajes y la suscripción.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">Mensaje<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>El servicio de streaming es un sistema de streaming basado en registros, por lo que todas las operaciones de escritura en Milvus (como DML y DDL) se abstraen como <strong>mensajes</strong>.</p>
<ul>
<li><p>A cada Mensaje se le asigna un campo <strong>Timestamp Oracle (TSO)</strong> por el Servicio de Streaming, que indica el orden del mensaje en la WAL. El orden de los mensajes determina el orden de las operaciones de escritura en Milvus. Esto permite reconstruir el último estado del cluster a partir de los logs.</p></li>
<li><p>Cada Mensaje pertenece a un <strong>VChannel</strong> (Canal Virtual) específico y mantiene ciertas propiedades invariantes dentro de ese canal para asegurar la consistencia de las operaciones. Por ejemplo, una operación Insert debe producirse siempre antes de una operación DropCollection en el mismo canal.</p></li>
</ul>
<p>El orden de los mensajes en Milvus puede parecerse al siguiente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>Orden de mensajes</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">Componente WAL<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>Para soportar la escalabilidad horizontal a gran escala, el WAL de Milvus no es un único archivo de registro, sino un compuesto de múltiples registros. Cada registro puede soportar independientemente la funcionalidad de streaming para múltiples VChannels. En un momento dado, un componente WAL puede operar <strong>exactamente en un nodo</strong> de streaming, esta restricción es prometida tanto por un mecanismo de cercado del almacenamiento wal subyacente como por el coordinador de streaming.</p>
<p>Otras características del componente WAL son</p>
<ul>
<li><p><strong>Gestión del ciclo de vida de los segmentos</strong>: Basándose en políticas como las condiciones de memoria, el tamaño del segmento o el tiempo de inactividad del segmento, la WAL gestiona el ciclo de vida de cada segmento.</p></li>
<li><p><strong>Soporte básico de transacciones</strong>: Dado que cada mensaje tiene un límite de tamaño, el componente WAL admite el nivel de transacción simple para prometer escrituras atómicas en el nivel VChannel.</p></li>
<li><p><strong>Escritura de registro remoto de alta concurrencia</strong>: Milvus admite colas de mensajes remotas de terceros como almacenamiento WAL. Para mitigar la latencia de ida y vuelta (RTT) entre el nodo de streaming y el almacenamiento WAL remoto para mejorar el rendimiento de escritura, el servicio de streaming admite escrituras de registro concurrentes. Mantiene el orden de los mensajes mediante sincronización TSO y TSO, y los mensajes de la WAL se leen en orden TSO.</p></li>
<li><p><strong>Buffer de escritura anticipada</strong>: Después de escribir los mensajes en la WAL, se almacenan temporalmente en un búfer de escritura anticipada. Esto permite realizar lecturas de cola de los registros sin tener que recuperar los mensajes del almacenamiento WAL remoto.</p></li>
<li><p><strong>Soporta múltiples almacenamientos WAL</strong>: Woodpecker, Pulsar, Kafka. Si utilizamos Woodpecker en modo disco cero, podemos eliminar la dependencia del almacenamiento WAL remoto.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">Almacenamiento de recuperación<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>El componente <strong>Recovery</strong> Storage siempre se ejecuta en el nodo de streaming en el que se encuentra el componente WAL correspondiente.</p>
<ul>
<li><p>Es responsable de convertir los datos de streaming en datos históricos persistentes y almacenarlos en el almacenamiento de objetos.</p></li>
<li><p>También gestiona la recuperación del estado en memoria para el componente WAL en el nodo de streaming.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>Almacenamiento de recuperación</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">Delegador de consultas<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p>El <strong>Delegador de Consultas</strong> se ejecuta en cada nodo de streaming y es responsable de ejecutar <strong>consultas incrementales</strong> en un único fragmento. Genera planes de consulta, los envía a los nodos de consulta pertinentes y agrega los resultados.</p>
<p>Además, el Delegador de consultas se encarga de transmitir <strong>las operaciones de eliminación</strong> a otros nodos de consulta.</p>
<p>El Delegador de consultas siempre coexiste con el componente WAL en el mismo nodo de transmisión. Pero si la colección está configurada con multi-replica, entonces se desplegarán <strong>N-1</strong> Delegadores en los otros nodos de streaming.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">Duración de la WAL y espera de disponibilidad<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Al separar los nodos de computación del almacenamiento, Milvus puede transferir fácilmente WAL de un nodo de streaming a otro, consiguiendo una alta disponibilidad en el servicio de streaming.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>Tiempo de vida de la WAL</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">Espera de disponibilidad<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuando la WAL va a trasladarse a un nuevo nodo de streaming, el cliente se encontrará con que el antiguo nodo de streaming rechaza algunas peticiones. Mientras tanto, la WAL será recuperada en el nuevo nodo de streaming, el cliente esperará a que la wal en el nuevo nodo de streaming esté lista para servir.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>esperar a que esté listo</span> </span></p>
