---
id: release_notes.md
summary: Notas de la versión de Milvus
title: Notas de la versión
---
<h1 id="Release-Notes" class="common-anchor-header">Notas de la versión<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Descubra las novedades de Milvus. Esta página resume las nuevas características, mejoras, problemas conocidos y correcciones de errores de cada versión. Puede encontrar las notas de la versión para cada versión publicada después de la v2.6.0 en esta sección. Le sugerimos que visite regularmente esta página para conocer las actualizaciones.</p>
<h2 id="v268" class="common-anchor-header">v2.6.8<button data-href="#v268" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 4 de enero de 2026</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.11</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.6.8. Esta versión introduce el resaltado de resultados de búsqueda, mejorando significativamente la experiencia de recuperación. Bajo el capó, hemos optimizado el procesamiento de consultas, la programación de recursos y los mecanismos de almacenamiento en caché para ofrecer un rendimiento y una estabilidad superiores. Además, esta versión soluciona errores críticos relacionados con la seguridad de los datos, la gestión del almacenamiento y la concurrencia. Recomendamos encarecidamente a todos los usuarios que actualicen a esta versión para obtener un entorno de producción más eficiente y fiable.</p>
<h3 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Soporte de búsqueda con resaltador. Para obtener más información, consulte <a href="/docs/es/text-highlighter.md">Resaltador de texto</a>. <a href="https://github.com/milvus-io/milvus/pull/46052">(#46052</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se ha trasladado la lógica de optimización de consultas al proxy para mejorar el rendimiento<a href="https://github.com/milvus-io/milvus/pull/46549">(nº 46549</a>).</li>
<li>Optimizado el rendimiento del operador <code translate="no">LIKE</code> utilizando la ordenación STL<a href="https://github.com/milvus-io/milvus/pull/46535">(#46535</a>)</li>
<li>Ejecución concurrente de tareas de índice de texto para múltiples campos<a href="https://github.com/milvus-io/milvus/pull/46306">(#46306</a>)</li>
<li>Posibilidad de pausar la GC a nivel de colección<a href="https://github.com/milvus-io/milvus/pull/46201">(#46201</a>)</li>
<li>Implementación de una política de penalización para QueryNodes para gestionar el agotamiento de recursos<a href="https://github.com/milvus-io/milvus/pull/46086">(#46086</a>)</li>
<li>Optimización del almacenamiento de datos en caché mediante la asignación de varios grupos de filas a una única celda de caché<a href="https://github.com/milvus-io/milvus/pull/46542">(nº 46542</a>).</li>
<li>Reducción del uso de CPU en QuotaCenter<a href="https://github.com/milvus-io/milvus/pull/46615">(#46615</a>)</li>
<li>Mejora del rendimiento de la comparación de datos en <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46655">(#46655</a>)</li>
<li>Soporte de campos dinámicos anulables con un objeto JSON vacío como valor por defecto<a href="https://github.com/milvus-io/milvus/pull/46445">(#46445</a>)</li>
<li>Se ha evitado el sellado innecesario de segmentos cuando sólo se modifican las propiedades de la colección<a href="https://github.com/milvus-io/milvus/pull/46489">(nº 46489</a>).</li>
<li>Soporte de reenvío DML y DQL en Proxy para RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46021">(#46021</a>, <a href="https://github.com/milvus-io/milvus/pull/46037">#46037</a>)</li>
<li>Añadido mecanismo de reintento para lecturas de almacenamiento de objetos en errores de límite de velocidad<a href="https://github.com/milvus-io/milvus/pull/46464">(#46464</a>)</li>
<li>Mejora del registro de las metatablas Proxy y RootCoord<a href="https://github.com/milvus-io/milvus/pull/46701">(nº 46701</a>)</li>
<li>Se ha añadido validación para incrustar modelos y tipos de campo de esquema<a href="https://github.com/milvus-io/milvus/pull/46422">(nº 46422</a>).</li>
<li>Introducción de una duración de tolerancia para retrasar las operaciones de retirada de colecciones<a href="https://github.com/milvus-io/milvus/pull/46252">(nº 46252</a>)</li>
<li>Mejora de la programación de tareas de índice mediante la estimación de ranuras en función del tamaño y el tipo de campo<a href="https://github.com/milvus-io/milvus/pull/46276">(#46276</a>, <a href="https://github.com/milvus-io/milvus/pull/45851">#45851</a>)</li>
<li>Se ha añadido un mecanismo de reserva para las rutas de escritura cuando se accede al almacenamiento de objetos sin soporte de escritura condicional<a href="https://github.com/milvus-io/milvus/pull/46022">(nº 46022</a>).</li>
<li>Optimizada la lógica de sincronización del oráculo IDF<a href="https://github.com/milvus-io/milvus/pull/46079">(#46079</a>)</li>
<li>Cambiado el puerto por defecto de RootCoord a un puerto no efímero<a href="https://github.com/milvus-io/milvus/pull/46268">(#46268</a>)</li>
<li>Añadidas métricas para supervisar la memoria caché de Jemalloc<a href="https://github.com/milvus-io/milvus/pull/45973">(#45973</a>)</li>
<li>Mejora de la precisión de la métrica de cuota de disco cuando cambia la cuota del clúster<a href="https://github.com/milvus-io/milvus/pull/46304">(#46304</a>)</li>
<li>Mejora de la observabilidad de trazas para expresiones escalares<a href="https://github.com/milvus-io/milvus/pull/45823">(#45823</a>)</li>
<li>Rechazo de claves primarias duplicadas en solicitudes por lotes upsert<a href="https://github.com/milvus-io/milvus/pull/46035">(#46035</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corregida la coincidencia de prefijos ETCD de RBAC para evitar posibles fugas de datos<a href="https://github.com/milvus-io/milvus/pull/46708">(#46708</a>)</li>
<li>Corrección de la gestión incorrecta de la ruta raíz en el modo de almacenamiento local<a href="https://github.com/milvus-io/milvus/pull/46693">(nº 46693</a>)</li>
<li>Corregida la gestión de tipos mixtos <code translate="no">int64</code>/<code translate="no">float</code> en campos JSON<a href="https://github.com/milvus-io/milvus/pull/46682">(#46682</a>)</li>
<li>Arreglados los fallos de carga del registro de texto durante la actualización del clúster<a href="https://github.com/milvus-io/milvus/pull/46698">(#46698</a>)</li>
<li>Eliminación de otros campos durante la limpieza de datos sin procesar<a href="https://github.com/milvus-io/milvus/pull/46689">(#46689</a>)</li>
<li>Corregido fallo al utilizar el resaltado con múltiples analizadores<a href="https://github.com/milvus-io/milvus/pull/46664">(#46664</a>)</li>
<li>Asegurado que los registros se vacían cuando el sistema operativo sale<a href="https://github.com/milvus-io/milvus/pull/46609">(#46609</a>)</li>
<li>Se ha corregido el error de límite de tamaño excedido de ETCD RPC al eliminar colecciones<a href="https://github.com/milvus-io/milvus/pull/46645">(nº 46645</a>).</li>
<li>Corregidos los problemas de retardo en la replicación cuando el servidor está inactivo<a href="https://github.com/milvus-io/milvus/pull/46612">(#46612</a>)</li>
<li>Corregida la validación de valores por defecto inválidos de <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46556">(#46556</a>)</li>
<li>Corregida la restauración de tareas de compactación para asegurar una limpieza adecuada<a href="https://github.com/milvus-io/milvus/pull/46578">(#46578</a>)</li>
<li>Se ha unificado la gestión de los nodos de sólo lectura para evitar que se atasquen las tareas del canal de equilibrio<a href="https://github.com/milvus-io/milvus/pull/46513">(nº 46513</a>).</li>
<li>Se han evitado las caídas de datos de campo en grupos de columnas de campos múltiples<a href="https://github.com/milvus-io/milvus/pull/46425">(nº 46425</a>).</li>
<li>Eliminación de clientes proxy obsoletos al volver a ver ETCD<a href="https://github.com/milvus-io/milvus/pull/46490">(#46490</a>)</li>
<li>Corregido el orden de fusión del iterador chunk<a href="https://github.com/milvus-io/milvus/pull/46462">(#46462</a>)</li>
<li>Impedida la creación de grupos de consumidores Kafka mediante la desactivación de auto-commit<a href="https://github.com/milvus-io/milvus/pull/46509">(#46509</a>)</li>
<li>Prohibida la recarga en caliente de parámetros de almacenamiento por niveles<a href="https://github.com/milvus-io/milvus/pull/46438">(#46438</a>)</li>
<li>Habilitado el iterador de búsqueda para vectores binarios<a href="https://github.com/milvus-io/milvus/pull/46334">(#46334</a>)</li>
<li>Corregida una condición de carrera en la inicialización del almacenamiento<a href="https://github.com/milvus-io/milvus/pull/46338">(#46338</a>)</li>
<li>Se ha solucionado el problema de que las consultas de resaltado no funcionen en búsquedas que no sean BM25<a href="https://github.com/milvus-io/milvus/pull/46295">(#46295</a>)</li>
<li>Corregido el desbordamiento de pila durante la recolección de basura JSON<a href="https://github.com/milvus-io/milvus/pull/46318">(#46318</a>)</li>
<li>Garantizados los reintentos al escribir binlogs<a href="https://github.com/milvus-io/milvus/pull/46310">(#46310</a>)</li>
<li>Corregida la comprobación del uso de índices para campos JSON<a href="https://github.com/milvus-io/milvus/pull/46281">(#46281</a>)</li>
<li>Evitado el bloqueo de actualización de destino cuando las réplicas carecen de nodos durante el escalado<a href="https://github.com/milvus-io/milvus/pull/46291">(#46291</a>)</li>
<li>Restringido el tokenizador <code translate="no">char_group</code> para soportar sólo delimitadores de un byte<a href="https://github.com/milvus-io/milvus/pull/46196">(#46196</a>)</li>
<li>Omisión del uso del índice de ruta JSON si la ruta de consulta incluye números<a href="https://github.com/milvus-io/milvus/pull/46247">(#46247</a>)</li>
<li>Corrección de errores de concatenación de rutas en MinIO cuando la ruta raíz es "."<a href="https://github.com/milvus-io/milvus/pull/46221">(#46221</a>)</li>
<li>Corrección de falsos positivos en las comprobaciones de estado mediante la corrección del cálculo de la métrica de retardo de réplica<a href="https://github.com/milvus-io/milvus/pull/46122">(#46122</a>)</li>
<li>Corregido el análisis sintáctico de RESTful v2 y los valores predeterminados del esquema con <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46239">(#46239</a>)</li>
<li>Corregido el pánico al buscar resultados vacíos con campos de geometría de salida<a href="https://github.com/milvus-io/milvus/pull/46231">(#46231</a>)</li>
<li>Añadida validación de alineación de datos de campo para evitar pánicos durante actualizaciones parciales<a href="https://github.com/milvus-io/milvus/pull/46180">(#46180</a>)</li>
<li>Solucionado el problema de pérdida de base de datos en RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46172">(#46172</a>)</li>
<li>Corrección del uso incorrecto del contexto en las sesiones de cliente gRPC<a href="https://github.com/milvus-io/milvus/pull/46184">(#46184</a>)</li>
<li>Corregido el reenvío incorrecto de autorizaciones en RESTful v2 durante las actualizaciones<a href="https://github.com/milvus-io/milvus/pull/46140">(#46140</a>)</li>
<li>Corregida la lógica incorrecta de reducción de estructuras<a href="https://github.com/milvus-io/milvus/pull/46151">(#46151</a>)</li>
<li>Corregido error de retorno del resaltador cuando los resultados de búsqueda están vacíos<a href="https://github.com/milvus-io/milvus/pull/46111">(#46111</a>)</li>
<li>Corregida la lógica de carga de datos brutos para campos<a href="https://github.com/milvus-io/milvus/pull/46155">(#46155</a>)</li>
<li>Corregido el problema de movimiento del cursor después de saltar trozos en el índice<a href="https://github.com/milvus-io/milvus/pull/46055">(#46055</a>)</li>
<li>Corregida la lógica de bucle para la salida de índice escalar de <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46110">(#46110</a>)</li>
<li>Corrección de la configuración de valores por defecto para campos de geometría a través de la API RESTful<a href="https://github.com/milvus-io/milvus/pull/46064">(#46064</a>)</li>
<li>Implementación de un fallo rápido si algún componente no está listo al iniciarse<a href="https://github.com/milvus-io/milvus/pull/46070">(#46070</a>)</li>
</ul>
<h2 id="v267" class="common-anchor-header">v2.6.7<button data-href="#v267" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 4 de diciembre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.10</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.7 es una actualización de estabilización crítica para la serie 2.6.x. Esta versión se centra en reforzar el sistema contra fallos distribuidos y en optimizar la utilización de recursos bajo cargas elevadas. Con mejoras significativas en el manejo de E/S, la gestión de memoria y la integración de Kubernetes, recomendamos encarecidamente a todos los usuarios de producción que actualicen a esta versión para garantizar una mayor fiabilidad y un funcionamiento más fluido a escala.</p>
<h3 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se ha añadido el punto final <code translate="no">/livez</code> para dar soporte a las sondas de actividad nativas de Kubernetes, mejorando la estabilidad de la orquestación de contenedores<a href="https://github.com/milvus-io/milvus/pull/45481">(#45481</a>).</li>
<li>Se ha añadido compatibilidad con operaciones <strong>GroupBy</strong> en campos <code translate="no">TIMESTAMPTZ</code>, lo que mejora las capacidades de análisis de series temporales<a href="https://github.com/milvus-io/milvus/pull/45763">(#45763</a>).</li>
<li>Soporte de <code translate="no">mmap</code> para los índices de clave compartida de JSON shredding para reducir la huella de RAM<a href="https://github.com/milvus-io/milvus/pull/45861">(#45861</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Soporte de reenvío de peticiones DML en el Proxy para mejorar la disponibilidad de escritura y la resistencia de enrutamiento<a href="https://github.com/milvus-io/milvus/pull/45922">(#45922</a>).</li>
<li>Actualización de etcd a v3.5.23 para solucionar regresiones de estabilidad y rendimiento consensuadas<a href="https://github.com/milvus-io/milvus/pull/45953">(#45953</a>).</li>
<li>Se ha añadido una sólida gestión de errores para las caídas del servidor Etcd con el fin de evitar fallos en cascada de los componentes<a href="https://github.com/milvus-io/milvus/pull/45633">(#45633</a>).</li>
<li>Reducción de la carga de Etcd mediante la eliminación de costosos observadores para simples comprobaciones de vida de sesión<a href="https://github.com/milvus-io/milvus/pull/45974">(#45974</a>).</li>
<li>Mejorada la estrategia de retención de WAL para equilibrar mejor el uso del disco con la seguridad de recuperación de datos<a href="https://github.com/milvus-io/milvus/pull/45784">(#45784</a>).</li>
<li>Soporte de sincronización de escritura asíncrona para registros para evitar que el bloqueo de E/S de disco afecte a la ruta de ejecución principal<a href="https://github.com/milvus-io/milvus/pull/45806">(#45806</a>).</li>
<li>Uso forzado de E/S en búfer para tareas de carga de alta prioridad para optimizar la utilización de la caché de páginas del sistema operativo y el rendimiento<a href="https://github.com/milvus-io/milvus/pull/45958">(#45958</a>).</li>
<li>Optimización de la estrategia <code translate="no">mmap</code> para asignar trozos de grupo en una única llamada al sistema, reduciendo la sobrecarga del núcleo durante la carga de segmentos<a href="https://github.com/milvus-io/milvus/pull/45893">(#45893</a>).</li>
<li>Mejorada la precisión de la estimación de memoria para la trituración de JSON para evitar muertes OOM o infrautilización<a href="https://github.com/milvus-io/milvus/pull/45876">(#45876</a>).</li>
<li>Se ha perfeccionado la estimación de la carga de segmentos para tener en cuenta los estados de desalojo y calentamiento<a href="https://github.com/milvus-io/milvus/pull/45891">(#45891</a>).</li>
<li>Se han añadido comprobaciones granulares de cancelación en los operadores de consulta para permitir una finalización más rápida de las consultas abortadas o con tiempo de espera agotado<a href="https://github.com/milvus-io/milvus/pull/45894">(#45894</a>).</li>
<li>Eliminación de comprobaciones redundantes del tipo de recurso en la configuración de recursos de archivos<a href="https://github.com/milvus-io/milvus/pull/45727">(#45727</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Intercalados los registros Go y C++ en un flujo unificado para proporcionar una vista cronológica correcta para la depuración<a href="https://github.com/milvus-io/milvus/pull/46005">(#46005</a>).</li>
<li>Resuelta una condición de carrera por la que <code translate="no">LastConfirmedMessageID</code> podía ser incorrecta bajo escrituras de alta concurrencia<a href="https://github.com/milvus-io/milvus/pull/45874">(#45874</a>).</li>
<li>Corregido un error de cálculo al agregar <code translate="no">allsearchcount</code> desde múltiples resultados de búsqueda<a href="https://github.com/milvus-io/milvus/pull/45904">(#45904</a>).</li>
<li>Corregidas las expresiones Term para manejar correctamente la lógica de contención de cadenas dentro de matrices JSON<a href="https://github.com/milvus-io/milvus/pull/45956">(#45956</a>).</li>
<li>Sustitución de <code translate="no">json.doc()</code> por <code translate="no">json.dom_doc()</code> en <code translate="no">JSONContainsExpr</code> para corregir comportamientos de análisis sintáctico y mejorar el rendimiento<a href="https://github.com/milvus-io/milvus/pull/45786">(#45786</a>).</li>
<li>Corregido un pánico en los componentes MixCoord en espera durante la secuencia de apagado<a href="https://github.com/milvus-io/milvus/pull/45898">(#45898</a>).</li>
<li>Se ha corregido el comprobador de líderes para garantizar que la distribución de segmentos se sincroniza correctamente con los nodos de sólo lectura<a href="https://github.com/milvus-io/milvus/pull/45991">(#45991</a>).</li>
<li>Se ha garantizado que <code translate="no">HandleNodeUp</code> se active durante la revisión de nodos para mantener una topología de equilibrio de carga correcta<a href="https://github.com/milvus-io/milvus/pull/45963">(#45963</a>).</li>
<li>Se ha implementado el almacenamiento WAL remoto si el almacenamiento WAL local deja de estar disponible<a href="https://github.com/milvus-io/milvus/pull/45754">(#45754</a>).</li>
<li>Añadido <code translate="no">EmptySessionWatcher</code> para evitar pánicos cuando se ejecuta en modo de enlace IndexNode<a href="https://github.com/milvus-io/milvus/pull/45912">(#45912</a>).</li>
<li>Se ha garantizado la coherencia del estado de la memoria al recuperar tareas de difusión de los búferes de protocolo<a href="https://github.com/milvus-io/milvus/pull/45788">(nº 45788</a>).</li>
<li>Se han resuelto los problemas de seguridad de los hilos en las actualizaciones del esquema de recogida de SegCore<a href="https://github.com/milvus-io/milvus/pull/45618">(nº 45618</a>).</li>
<li>Control de acceso reforzado (RBAC) en las API <code translate="no">ListImport</code> y <code translate="no">GetImportProgress</code> <a href="https://github.com/milvus-io/milvus/pull/45862">(nº 45862</a>).</li>
<li>Se ha corregido un error por el que BulkImport fallaba si la entrada contenía una lista struct vacía<a href="https://github.com/milvus-io/milvus/pull/45692">(#45692</a>).</li>
</ul>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 21 de noviembre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.6.6, que presenta una serie de nuevas y potentes funciones, mejoras de rendimiento y correcciones de errores esenciales. Esta actualización introduce características importantes como el tipo de datos Geospatial y Timestampz, Boost ranker para rescoring, etc. Esta versión también incluye muchas mejoras cruciales en el rendimiento del filtrado escalar. También se han corregido varios errores críticos para garantizar una mayor estabilidad y fiabilidad. Con esta versión, Milvus continúa proporcionando una experiencia más robusta y eficiente para todos los usuarios. A continuación se presentan los aspectos más destacados de esta versión.</p>
<ul>
<li>Tipo de datos geoespaciales: Milvus introduce soporte para el tipo de datos <code translate="no">Geometry</code>, que representa objetos geométricos compatibles con OGC como <code translate="no">POINT</code>, <code translate="no">LINESTRING</code>, y <code translate="no">POLYGON</code>. Este tipo admite múltiples operadores de relaciones espaciales (st_contains, st_intersects, st_within, st_dwithin, ...) y proporciona un índice espacial <code translate="no">RTREE</code> para acelerar el filtrado espacial y la ejecución de consultas. Esto permite un almacenamiento y consulta eficientes de formas geoespaciales para LBS, cartografía y otras cargas de trabajo espaciales.</li>
<li>Tipo de datos Timestamptz: Milvus introduce el tipo de datos TIMESTAMPTZ, que permite conocer la zona horaria de todos los datos temporales. Esta función permite una gestión coherente de los datos en todos los despliegues globales, ya que permite a los usuarios definir un contexto temporal predeterminado mediante la propiedad de zona horaria en bases de datos y colecciones. Además, las operaciones de recuperación (consulta y búsqueda) admiten un parámetro de zona horaria para la conversión instantánea y sobre la marcha de las marcas de tiempo al formato local requerido.</li>
<li>Posicionador Boost: En lugar de basarse únicamente en la similitud semántica calculada a partir de las distancias vectoriales, Boost Ranker permite a Milvus utilizar la condición de filtrado opcional dentro de la función para encontrar coincidencias entre los candidatos a resultados de búsqueda y aumenta las puntuaciones de esas coincidencias aplicando el peso especificado, ayudando a promover o degradar las clasificaciones de las entidades coincidentes en el resultado final.</li>
<li>El índice STL_SORT soporta ahora los tipos de datos VARCHAR y TIMESTAMPTZ.</li>
<li>Ahora se puede habilitar el campo dinámico de una colección existente modificándola.</li>
<li>Corregido cve-2025-63811.</li>
</ul>
<h3 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Añadida nueva configuración y habilitada la actualización dinámica de configuraciones<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corregido cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>Eliminadas las matrices de id de segmento grandes de los registros de querynode<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>Actualizados múltiples lugares donde el expr copiaba los valores de entrada en cada bucle<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>Optimizado el rendimiento del término expr<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)</li>
<li>Prefetched vector chunks for sealed non-indexed segments<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>Expr: sólo se prefijan trozos una vez<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>Añadido soporte nullable para los tipos geometry y timestamptz<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>Incrementado el ttl de sesión de 10s a 30s<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>Añadidas más métricas para ddl framework<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>Actualizada la versión de configuración de maxconnections<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>Se ha omitido la comprobación del ID de origen<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>Soporte de max_connection config para almacenamiento remoto<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>Se ha evitado el pánico añadiendo una comprobación de puntero nulo al borrar el pk2offset de insertrecord<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>Optimización de la obtención de campos escalares en escenarios de almacenamiento por niveles<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>Corregido error tipográfico en los parámetros del analizador<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>Sobreescritura de index_type al crear un índice de segmento<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)</li>
<li>Añadido soporte rbac para updatereplicateconfiguration<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>Aumentada la versión de go a 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>Desactivado jsonshredding para la configuración por defecto<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>Se ha unificado el búfer alineado para la entrada/salida directa y con búfer<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>Se renombraron los parámetros de configuración de usuario relacionados con jsonstats<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)</li>
<li>Actualización de la configuración del grupo de hilos knowhere<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>Parche "cherry-picked" del nuevo framework ddl y cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>Establecer versión de esquema al crear nueva colección<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>Soporte de archivos jsonl/ndjson para bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>Esperar a que el cliente de flujo de réplica finalice<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>Configuración opcional de geometrycache<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>Parche "cherry-picked" del nuevo marco ddl y cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>No iniciar cdc por defecto<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>Parche "cherry-picked" del nuevo marco ddl y cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)</li>
<li>Eliminado el límite máximo de campos vectoriales<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>Mostrado el tiempo de creación del trabajo de importación<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>Optimizada la inicialización del mapa de bits de scalarindexsort para consultas de rango<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>Habilitado stl_sort para soportar varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>Extraída la lógica del cliente shard en un paquete dedicado<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>Refactorizada la gestión de privilegios extrayendo la caché de privilegios a un paquete separado<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>Soporte de valores por defecto json en fillfielddata<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>Actualizados enabledynamicfield y schemaversion durante la modificación de la colección<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corregido pánico de actualización parcial con timestamptz<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>Utilizado 2.6.6 para la actualización de milvus ddl<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>Usado el último timetick para expirar la caché<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>Salida de streamingnode cuando falla la inicialización<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>Protegido tbb concurrent_map emplace para evitar race condition deadlock<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)</li>
<li>Evitar el pánico cuando el nodo de transmisión se cerraba pero el nodo de consulta seguía funcionando<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>Establecer init tarea cuando trabajador no tenía tarea<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)</li>
<li>Evitar el bloqueo en el componente de ejecución cuando falla la preparación<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)</li>
<li>Se ha evitado el pánico al cerrar dos veces el canal de emisión de ack<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)</li>
<li>Corregido el relleno del valor por defecto durante addfield<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)</li>
<li>Compactación del historial de asignación de canales para reducir el tamaño de la información de recuperación de asignaciones<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>Gestión correcta de los valores por defecto durante la compactación de los campos añadidos<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>Eliminado validatefieldname en dropindex<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>Ignorada la tarea de compactación cuando el segmento de origen no estaba en buen estado<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>Establecer propiedades de esquema antes de emitir alter collection<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)</li>
<li>Evento de base de datos almacenado si la clave no era válida<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>Corregido error de bulkimport para campo struct<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>Error al obtener datos sin procesar para un índice híbrido<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>Retención anticipada de la colección para evitar que se libere antes de finalizar la consulta<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>Utilización del bloqueo de clave de recurso correcto para ddl y utilización de un nuevo ddl en la réplica de transferencia<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>Corregida la compatibilidad de índices tras la actualización<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>Corregido error de canal no disponible y liberado bloqueo de colección<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>Se ha eliminado la meta de recopilación al soltar la partición<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>Arreglado el segmento de destino marcado como abandonado para guardar el resultado de las estadísticas dos veces<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>Actualización errónea del timetick de la información de recogida<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>Añadida la dependencia tzdata para permitir el reconocimiento de la zona horaria iana<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>Corregido el cálculo del desplazamiento de los datos de campo en las funciones rerank para la búsqueda masiva<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>Corregida geometría de filtro para crecimiento con mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Nextfieldid no tenía en cuenta struct<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>El valor de grupo era nulo<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>Se ha proporcionado una estimación precisa del tamaño de las matrices de flechas troceadas en la compactación<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>Corregida carrera de datos en cliente de flujo de réplica<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>Se ha omitido la creación de índices de texto para columnas añadidas recientemente<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>Ignorados accidentalmente segmentos sellados en la compactación l0<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>Desplazamiento de finishload antes de la creación del índice de texto para garantizar la disponibilidad de los datos en bruto<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>No se utilizaba json_shredding cuando la ruta json era nula<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>Corrección de errores relacionados con timestamptz<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321</a>)</li>
<li>Corregido fallo de segmento de carga debido a error de uso de disco<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>Apoyado json valor por defecto en la compactación<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>Calculado el tamaño de lote correcto para el índice de geometría del segmento en crecimiento<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>Aplicado parche de error de marco ddl<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>Corregido fallo de alteración de colección con ajuste mmap para struct<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>Inicializado el rango de marcas de tiempo en el escritor binlog compuesto<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>Se ha omitido la creación de un directorio tmp para aumentar el índice r-tree<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>Evitadas potenciales condiciones de carrera al actualizar el ejecutor<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>Permitir "[" y "]" en el nombre del índice<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>Corregido error al destruir json cuando está vacío pero no es nulo<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>Asegurado que la operación de append sólo podía ser cancelada por el propio wal pero no por el rpc<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>Resuelto el problema de acceso al almacenamiento en la nube wp gcp con ak/sk<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>Corregida la importación de datos de geometría null<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>Añadida comprobación de null para packed_writer_ en jsonstatsparquetwriter::close()<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>Error al mmap emb_list_meta en la lista de incrustación<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>Actualizada la métrica numentities de querynode cuando la colección no tenía segmentos<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>Prevención de reintentos al importar cadenas utf-8 no válidas<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>Manejo de fieldsdata vacíos en reduce/rerank para el escenario requery<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>Corregido pánico al detener cdc<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>Corregida la contaminación de token de autenticación, soporte oss/cos, registros de errores de sincronización redundantes<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>Manejar todos los datos nulos en stringindexsort para evitar el tiempo de espera de carga<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>Desactivada la construcción de la versión antigua jsonstats de la solicitud<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>Corregido error al importar datos geométricos<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>Corregido error al importar parquet en struct<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>Añadido getmetrics de nuevo a indexnodeserver para garantizar la compatibilidad<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>Corregido fallo de alteración de la colección para subcampos struct<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>Se ha corregido el error mmap a nivel de colección en struct<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>Evitada la carrera de datos en la actualización del notificador de colección querycoord<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>Gestión de los valores por defecto de los campos json en la capa de almacenamiento<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>Doble comprobación para evitar que el iter sea borrado por otro hilo<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>Corregido error en la función gis para filtrar geometría<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 11 de noviembre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.6.5, que soluciona una <strong>vulnerabilidad de seguridad crítica</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> y se actualiza a Go 1.24.9. Recomendamos encarecidamente a <strong>todos los usuarios de Milvus 2.6.x que actualicen a 2.6.5</strong> lo antes posible. Esta actualización también incluye otras mejoras y correcciones de errores, y proporciona a los usuarios una experiencia más sólida y eficiente.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Actualizada la etiqueta de imagen del constructor al actualizar a go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>Omisión de la comprobación del identificador de origen<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>El valor del grupo es nulo<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>Inicialización del intervalo de marcas de tiempo en el escritor binlog compuesto (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Gestión de los datos de campo vacíos en el escenario de reducción/recuperación (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Añadida comprobación null para packed_writer_ en jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>Se ha omitido la creación de un índice de texto para las nuevas columnas añadidas<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>Ignorados accidentalmente segmentos sellados en la compactación l0<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>Desplazamiento de finishload antes de la creación del índice de texto para garantizar la disponibilidad de los datos sin procesar<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>Apoyado json valor por defecto en la compactación<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>Actualizado milvus-storage para corregir la inicialización duplicada de aws sdk (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 21 de octubre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.6.4, que presenta una serie de nuevas y potentes funciones, mejoras de rendimiento y correcciones de errores esenciales. Esta actualización introduce funciones importantes como Struct en ARRAY para el modelado avanzado de datos. Además, hemos activado JSON Shredding por defecto, mejorando aún más el rendimiento y la eficiencia de las consultas. También se han corregido varios errores críticos para garantizar una mayor estabilidad y fiabilidad. Con esta versión, Milvus sigue proporcionando una experiencia más sólida y eficiente a todos los usuarios. A continuación se presentan los aspectos más destacados de esta versión.</p>
<h3 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Struct en ARRAY: Milvus introdujo el nuevo tipo de datos, Struct, que permite a los usuarios organizar y gestionar múltiples campos relacionados dentro de una única entidad. Actualmente, Struct sólo se puede utilizar como un elemento bajo DataType.ARRAY, permitiendo características como Array of Vector, donde cada fila contiene múltiples vectores, abriendo nuevas posibilidades para el modelado y búsqueda de datos complejos.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>Soporte del modelo Qwen GTE-rerank-v2 en DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Actualizada la versión Go a 1.24.6</strong> con constructor de imágenes<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Habilitada la trituración JSON por defecto<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>Añadida cuota de disco para el tamaño de binlog cargado para evitar fallos de carga del nodo de consulta<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>Habilitado el soporte mmap para struct array en MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>Añadida gestión de capa de caché para TextMatchIndex<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>Optimizado el rendimiento de la búsqueda inversa de mapas de bits (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Actualizada la versión de Knowhere<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Eliminadas las comprobaciones de uso lógico durante la carga de segmentos<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>Se agregó campo de registro de acceso para información de longitud de valor de plantilla<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>Permitido sobrescribir el tipo de índice actual durante la construcción del índice<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>Añadidos parámetros de carga para índice vectorial<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>Gestión unificada del estado de las tareas del ejecutor de compactación<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>Añadidos registros refinados para el programador de tareas en QueryCoord<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>Asegurado accesslog.$consistency_level representa el valor real utilizado (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Eliminado el gestor de canales redundante de datacoord<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se ha eliminado GCC del archivo Dockerfile de compilación para corregir CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>Ordenación determinista de los resultados de búsqueda cuando las puntuaciones son iguales<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>Nueva clasificación antes de volver a consultar si el nuevo clasificador no utilizaba datos de campo<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>Asegurado el cumplimiento de la promesa cuando CreateArrowFileSystem lanza una excepción<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>Corregida la falta de configuración de encriptación de disco<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>Corregida la desactivación del comprobador de saldo que causaba un problema de parada de saldo<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>Solucionado el problema por el que "not equal" no incluye "none"<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>Soportado valor por defecto JSON en CreateArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>Usada cadena de depuración corta para evitar nuevas líneas en los registros de depuración<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>Corregida la expresión exists para el índice plano JSON<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>Unificada la semántica de la ruta JSON exists<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>Corregido el pánico causado por un mensaje interno de inserción vacío<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>Parámetros AI/SAQ actualizados<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>Eliminado límite en deduplicación cuando autoindex está desactivado<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>Evitadas operaciones concurrentes de reinicio/adición en métricas DataCoord<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>Corregido error en JSON_contains(path, int)<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>Evitada la evicción en la capa de caché durante el manejo de JSON<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>Corregidos resultados erróneos del filtro exp cuando se omitía<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>Comprobado si el nodo de consulta es SQN con etiqueta y lista de nodo de transmisión<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>Corregido BM25 con boost devolviendo resultados desordenados<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>Corregida la importación masiva con ID automático<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>Pasado de sistema de archivos a través de FileManagerContext al cargar índice<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>Usado "eventualmente" y arreglado el ID de tarea que aparece en ambos estados, ejecutando y completado<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>Eliminado tick de hora de inicio incorrecto para evitar filtrar DMLs con timeticks inferiores<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>Convertido el proveedor de credenciales de AWS en un singleton<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>Desactivada la trituración para la ruta JSON que contiene dígitos<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>Corregida prueba unitaria válida para TestUnaryRangeJsonNullable<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>Corregidas las pruebas unitarias y eliminada la lógica de fallback del sistema de archivos<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 11 de octubre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.6.3, que introduce una variedad de nuevas e interesantes características, mejoras y correcciones de errores críticos. Esta versión mejora el rendimiento del sistema, amplía la funcionalidad y corrige problemas clave, proporcionando una experiencia más estable para todos los usuarios. A continuación se presentan los aspectos más destacados de esta versión:</p>
<h3 id="New-Features" class="common-anchor-header">Nuevas funciones<button data-href="#New-Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Clave primaria con AutoID activado: Ahora los usuarios pueden escribir el campo de clave primaria cuando <code translate="no">autoid</code> está habilitado.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Compactación manual de segmentos L0: Se ha añadido soporte para la compactación manual de segmentos L0.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>Codificación de ID de clúster en AutoID: Los ID generados automáticamente incluirán ahora el ID de clúster.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>Soporte de Tokenizer gRPC: Integración del tokenizador gRPC para mejorar la flexibilidad de las consultas.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Refinado el comprobador de balance implementando una cola de prioridad, mejorando la distribución de tareas.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>Estadísticas BM25 precargadas para segmentos sellados y serialización optimizada.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Los campos anulables ahora se pueden utilizar como entrada para las funciones BM25.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>Añadido soporte para Azure Blob Storage en Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Purga de archivos pequeños justo después de la compactación de segmentos de Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>Habilitada la funcionalidad de puntuación aleatoria para potenciar las consultas.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>Nuevas opciones de configuración para el tipo de vector <code translate="no">int8</code> en la autoindexación.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>Añadidos elementos de parámetro para controlar la política de consultas de búsqueda híbrida.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>Añadido soporte para controlar la inserción de campos de salida de funciones.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>La función de decaimiento ahora soporta la fusión de puntuación configurable para un mejor rendimiento.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>Se ha mejorado el rendimiento de la búsqueda binaria en cadenas.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>Se ha introducido soporte para filtros dispersos en las consultas. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>Varias actualizaciones para mejorar la funcionalidad de los índices por niveles.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>Añadido seguimiento del uso de recursos de almacenamiento para búsquedas escalares y vectoriales.<a href="https://github.com/milvus-io/milvus/pull/44414">(</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44414 #44308</a>)</li>
<li>Añadido uso de almacenamiento para delete/upsert/restful<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>Habilitados objetivos de descarga granular para operaciones <code translate="no">flushall</code>.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>Datanodes ahora utilizará un sistema de archivos no-singleton para una mejor gestión de los recursos.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>Añadidas opciones de configuración para el procesamiento por lotes en metadatos. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>Los mensajes de error incluyen ahora el nombre de la base de datos para mayor claridad.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>Movida la prueba de rastreo al repositorio <code translate="no">milvus-common</code> para una mejor modularización.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>Movidos los archivos de pruebas unitarias de la API de C al directorio <code translate="no">src</code> para una mejor organización.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>Go SDK ahora permite a los usuarios insertar datos de clave primaria si <code translate="no">autoid</code> está habilitado.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Resueltas las vulnerabilidades CVE-2020-25576 y WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>Solucionado un problema por el que se utilizaban recursos lógicos para métricas en el centro de cuotas en nodos de streaming.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>Establecido <code translate="no">mixcoord</code> en <code translate="no">activatefunc</code> al habilitar el modo de espera.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>Eliminada la inicialización redundante de componentes de almacenamiento V2. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Corregido el bloqueo de la tarea de compactación debido a la salida del bucle del ejecutor.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>Refinanciado el uso de recursos cargados en el destructor <code translate="no">insert/deleterecord</code>.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>Se ha solucionado un problema por el que el replicador no podía detenerse y se ha mejorado el validador de configuración de replicación.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>Establecido <code translate="no">mmap_file_raii_</code> a <code translate="no">nullptr</code> cuando mmap está deshabilitado.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>Hecho <code translate="no">diskfilemanager</code> utilizar el sistema de archivos desde el contexto.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>Forzado host virtual para OSS y COS en almacenamiento V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>Establecido <code translate="no">report_value</code> valor por defecto cuando <code translate="no">extrainfo</code> no es <code translate="no">nil</code> por compatibilidad.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>Limpiadas las métricas de colección después de soltar colecciones en rootcoord.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>Corregido fallo de carga de segmento debido a propiedades duplicadas del campo <code translate="no">mmap.enable</code>.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>Corregidos errores de análisis de configuración de carga para réplicas dinámicas.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Manejado la entrada de fila a columna para columnas dinámicas en Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 19 de septiembre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>¡Nos complace anunciar el lanzamiento de Milvus 2.6.2! Esta actualización introduce nuevas y potentes funciones, importantes mejoras de rendimiento y correcciones críticas que hacen que el sistema sea más estable y esté listo para la producción. Destacan las actualizaciones parciales de campos con upsert, JSON Shredding para acelerar el filtrado dinámico de campos, la indexación NGram para consultas LIKE más rápidas y una evolución de esquemas más flexible en las colecciones existentes. Basada en los comentarios de la comunidad, esta versión ofrece una base más sólida para las implantaciones en el mundo real, y animamos a todos los usuarios a actualizar para aprovechar estas mejoras.</p>
<h3 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se ha añadido compatibilidad con JSON Shredding para acelerar el filtrado dinámico de campos. Para obtener más información, consulte <a href="/docs/es/json-shredding.md">JSON Shredding</a>.</li>
<li>Se ha añadido compatibilidad con NGRAM Index para acelerar las operaciones similares. Para obtener más información, consulte <a href="/docs/es/ngram.md">NGRAM</a>.</li>
<li>Añadido soporte para actualizaciones parciales de campos con upsert API. Para más detalles, consulte <a href="/docs/es/upsert-entities.md">Upsert Entidades</a>.</li>
<li>Añadido soporte para la función Boost. Para más detalles, consulte <a href="/docs/es/boost-ranker.md">Boost Ranker</a>.</li>
<li>Añadido soporte para agrupar por campos JSON y campos dinámicos<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>Añadido soporte para habilitar el esquema dinámico en colecciones existentes<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>Añadido soporte para eliminar índices sin liberar colecciones<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>[StorageV2] Cambiado el tamaño del archivo de registro a tamaño comprimido<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Añadidos campos hijo en la información de carga<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] Añadido soporte para incluir claves de partición y clustering en el grupo de sistemas<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Eliminado tiempo de espera para tareas de compactación<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Habilitada la compilación con Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Utilizada información de grupo para estimar uso de lógica<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Utilizada la información de división de grupo para estimar el uso<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] Guardados los resultados de los grupos de columnas en la compactación<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Añadidas configuraciones para política de división basada en tamaño<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] Añadido soporte para política de división basada en esquema y tamaño<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] Añadida política de división configurable<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] Añadidas más métricas y configuraciones<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Añadido soporte para esperar a que todos los índices estén listos antes de cargar segmentos<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Añadida métrica de latencia interna del núcleo para el nodo rescore<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>Optimizado el formato del registro de acceso al imprimir parámetros KV<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Añadida configuración para modificar el tamaño del lote de instantáneas de volcado<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>Reducción del intervalo de limpieza de la tarea de compactación<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>Mejorada la ordenación por fusión para soportar múltiples campos<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Añadida la estimación de recursos de carga para el índice por niveles<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>Añadida configuración de autoíndice para el caso de deduplicación<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Añadida configuración para permitir caracteres personalizados en los nombres (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Añadido soporte para cchannel para servicio de streaming<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Añadido mutex y comprobación de rango para proteger borrados concurrentes<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Alineado el comportamiento de las expresiones existe entre fuerza bruta e índice<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Corregido error al renombrar a una colección eliminada<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Comprobada la longitud de los campos hijo<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Activado Azure por defecto<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Corregida ruta de carga de compactaciones L0 bajo pooling datanodes<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>No se permite renombrar si la encriptación de la base de datos está activada<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Eliminación de la propiedad dynamicfield.enable<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>Tareas marcadas como fallidas cuando el ID preasignado no es válido<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Omisión de comprobaciones MVCC en expresiones de comparación PK<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>Corregido error json_contains para estadísticas<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Añadida la comprobación del sistema de archivos de inicialización para el nodo de consulta y el nodo de transmisión<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Arreglado el objetivo de compactación vacío cuando el segmento se recogía de la basura<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Corregida la condición de carrera al inicializar el índice timestamp<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Comprobación de si arraydata es nulo para evitar el pánico<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Corregido error al construir estadísticas JSON para objetos anidados<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Evitado reescritura mmap por múltiples campos JSON<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Formatos de datos válidos unificados<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Ocultadas las credenciales de los proveedores de embedding/reranking en la web UI<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Corregida ruta de statslog bajo pooling datanodes<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>Corregida ruta de oráculo IDF<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Utilizado punto de control de instantánea de recuperación si ningún vchannel se está recuperando<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Limitado el número de columnas en las estadísticas JSON<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Índice n-gram de recuento de recursos de carga<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>Deducción del tipo de métrica a partir de resultados de búsqueda no vacíos<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Corregida la escritura multi-segmento que sólo escribe un segmento<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Corregida la ordenación por fusión fuera de rango<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>Añadida comprobación UTF-8 antes de ejecutar la función BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Reintentada sesión antigua si existe<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Añadido límite de tamaño de búfer Kafka para evitar OOM datanode<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>Corregido pánico al extender el rango de bloqueo<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>Corregidos los segmentos crecientes que no se vierten al cambiar el esquema<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Errores de IO manejados<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>Evitado pánico si la ruta del índice Tantivy no existe<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 3 de septiembre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.6.1. Esta versión se basa en los principales avances arquitectónicos de las versiones anteriores, ofreciendo mejoras críticas centradas en la estabilidad de la producción, el rendimiento y la robustez operativa. Esta versión responde a los principales comentarios de la comunidad y refuerza el sistema para despliegues a gran escala. Recomendamos encarecidamente a todos los usuarios que actualicen para beneficiarse de un sistema más estable, fiable y con mayor rendimiento.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Soporta sistemas de archivos compatibles con POSIX para almacenamiento remoto<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Se introducen renovadores basados en modelos<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Optimiza el rendimiento de las expresiones de comparación en campos de clave primaria<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Recoge doc_id de la lista de contabilización directamente para acelerar la coincidencia de texto<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Optimiza el rendimiento de las consultas convirtiendo múltiples condiciones != en una única cláusula NOT IN<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Mejora de la gestión de recursos para la capa de caché durante la carga de segmentos<a href="https://github.com/milvus-io/milvus/pull/43846">(nº 43846</a>)</li>
<li>Mejora la estimación de memoria para índices provisionales durante la carga de datos<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Posibilidad de configurar el ratio de construcción de los índices intermedios<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Añade un límite de velocidad de escritura configurable al escritor de disco<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Los parámetros de SegCore ahora pueden actualizarse dinámicamente sin reiniciar el servicio Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Añade métricas de latencia gRPC unificadas para una mejor observabilidad<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Incluye marcas de tiempo de solicitud del cliente en las cabeceras gRPC para simplificar la depuración<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Admite el nivel de registro de seguimiento para segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Añade un interruptor configurable para ajustar las garantías de consistencia para una mayor disponibilidad<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Implementa un mecanismo robusto de rewatch para manejar los fallos de conexión etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Mejora la lógica interna de comprobación del estado de los nodos<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Optimiza el acceso a metadatos al listar colecciones<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Actualiza el cliente Pulsar a la versión oficial v0.15.1 y añade más registros<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Actualiza aws-sdk de 1.9.234 a 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Admite actualizaciones dinámicas de intervalo para componentes de teletipo<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Mejora la autodetección de los conjuntos de instrucciones ARM SVE para operaciones de conjuntos de bits<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Mejora el mensaje de error cuando falla una coincidencia de texto o frase<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Se mejora el mensaje de error cuando no coinciden las dimensiones de los vectores<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Se mejora el informe de errores para los tiempos de espera de adición cuando el almacén de objetos no está disponible<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corrección de un posible problema de falta de memoria<a href="https://github.com/milvus-io/milvus/pull/43756">(</a>OOM) durante la importación de archivos Parquet<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Corrección de un problema por el que los nodos en espera no podían recuperarse si su contrato de arrendamiento expiraba<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Maneja correctamente el estado de reintento de compactación<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Corrección de un posible bloqueo entre las solicitudes de lectura continua y la carga de índices que podía impedir la carga de índices<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Corrección de un error que podía provocar fallos en la eliminación de datos en situaciones de gran concurrencia<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Se corrige una posible condición de carrera al cargar índices de texto y JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(nº 43811</a>).</li>
<li>Corrección de una incoherencia en el estado de los nodos que podía producirse tras el reinicio de QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(nº 43941</a>).</li>
<li>Garantiza que un QueryNode "sucio" se limpie correctamente tras un reinicio<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Se soluciona un problema por el que el estado de reintento no se gestionaba correctamente para las solicitudes con cargas útiles no vacías<a href="https://github.com/milvus-io/milvus/pull/44068">(nº 44068</a>).</li>
<li>Se soluciona un problema por el que el escritor masivo v2 no utilizaba el nombre de cubo correcto<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Mejora de la seguridad al ocultar los elementos sensibles del punto final RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(nº 44057</a>)</li>
<li>Garantiza que las cargas de objetos para woodpecker sean idempotentes durante los reintentos de tiempo de espera<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>No permite importar elementos nulos en campos de matriz desde archivos Parquet<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Corrige un error por el que la caché de proxy no se invalidaba tras crear un alias de colección<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Mejora del mecanismo interno de descubrimiento de servicios para nodos de streaming<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Corrección de la lógica de grupos de recursos para filtrar correctamente los nodos de streaming<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Añade la etiqueta databaseName a las métricas para evitar conflictos de nomenclatura en entornos con varias bases de datos<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Corrección de un error lógico en la gestión interna del estado de las tareas<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Optimiza el tiempo de inicialización de las métricas internas para evitar posibles pánicos<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Corrección de un posible fallo en el servidor HTTP interno<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 6 de agosto de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>¡Milvus 2.6.0 está oficialmente disponible! Partiendo de la base arquitectónica establecida en <a href="#v260-rc1">2.6.0-rc1</a>, esta versión lista para producción aborda numerosos problemas de estabilidad y rendimiento, al tiempo que introduce nuevas y potentes capacidades, como el formato de almacenamiento V2, el procesamiento JSON avanzado y funciones de búsqueda mejoradas. Con amplias correcciones de errores y optimizaciones basadas en los comentarios de la comunidad durante la fase RC, Milvus 2.6.0 está listo para que lo explore y adopte.</p>
<div class="alert warning">
<p>No se admite la actualización directa desde versiones anteriores a la 2.6.0 debido a los cambios arquitectónicos. Siga nuestra <a href="/docs/es/upgrade_milvus_cluster-operator.md">guía de actualización</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Novedades en 2.6.0 (desde RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Formato de almacenamiento optimizado v2</h4><p>Para hacer frente a los retos del almacenamiento mixto de datos escalares y vectoriales, especialmente las búsquedas puntuales en datos no estructurados, Milvus 2.6 introduce el Formato de Almacenamiento V2. Este nuevo formato de almacenamiento columnar adaptativo adopta una estrategia de diseño de "fusión de columnas estrechas + independencia de columnas anchas", que resuelve fundamentalmente los cuellos de botella de rendimiento cuando se manejan búsquedas de puntos y recuperaciones de lotes pequeños en bases de datos vectoriales.</p>
<p>El nuevo formato admite ahora un acceso aleatorio eficiente sin amplificación de E/S y logra un aumento del rendimiento de hasta 100 veces en comparación con el formato Parquet vainilla adoptado anteriormente, lo que lo hace ideal para cargas de trabajo de IA que requieren tanto procesamiento analítico como recuperación vectorial precisa. Además, puede reducir el número de archivos hasta en un 98% para cargas de trabajo típicas. El consumo de memoria para la compactación principal se reduce en un 300%, y las operaciones de E/S se optimizan hasta un 80% para las lecturas y más de un 600% para las escrituras.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Índice plano JSON (beta)</h4><p>Milvus 2.6 introduce el índice plano JSON para gestionar esquemas JSON altamente dinámicos. A diferencia del índice de rutas JSON, que requiere la declaración previa de rutas específicas y sus tipos previstos, el índice plano JSON descubre e indexa automáticamente todas las estructuras anidadas bajo una ruta determinada. Cuando indexa un campo JSON, aplana recursivamente todo el subárbol, creando entradas de índice invertidas para cada par ruta-valor que encuentra, independientemente de la profundidad o el tipo. Este aplanamiento automático hace que JSON Flat Index sea ideal para esquemas en evolución en los que aparecen nuevos campos sin previo aviso. Por ejemplo, si indexa un campo "metadatos", el sistema gestionará automáticamente nuevos campos anidados como "metadatos.version2.features.experimental" a medida que aparezcan en los datos entrantes, sin necesidad de configurar un nuevo índice.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Recordatorio de las características del núcleo 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Para obtener información detallada sobre los cambios en la arquitectura y las funciones introducidas en 2.6.0-RC, consulte <a href="#v260-rc1">la Nota de la versión 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Simplificación de la arquitectura</h4><ul>
<li>Streaming Node (GA) - Gestión centralizada de WAL</li>
<li>WAL nativo con Woodpecker - Eliminación de la dependencia de Kafka/Pulsar</li>
<li>Coordinadores unificados (MixCoord); IndexNode y DataNode fusionados - Reducción de la complejidad de los componentes</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Búsqueda y análisis</h4><ul>
<li>RaBitQ Cuantificación de 1 bit con alta recuperación</li>
<li>Coincidencia de frases</li>
<li>MinHash LSH para deduplicación</li>
<li>Funciones de clasificación en función del tiempo</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Experiencia del desarrollador</h4><ul>
<li>Funciones de incrustación para el flujo de trabajo "data-in, data-out</li>
<li>Evolución del esquema en línea</li>
<li>Soporte de vectores INT8</li>
<li>Tokenizadores mejorados para soporte global de idiomas</li>
<li>Capa de caché con carga retardada - Procesamiento de conjuntos de datos mayores que la memoria</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 18 de junio de 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Versión de Milvus</th><th style="text-align:center">Versión del SDK de Python</th><th style="text-align:center">Versión del SDK de Node.js</th><th style="text-align:center">Versión del SDK de Java</th><th style="text-align:center">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 introduce una arquitectura simplificada y nativa de la nube diseñada para mejorar la eficiencia operativa, la utilización de recursos y el coste total de propiedad reduciendo la complejidad de la implantación. Esta versión añade nuevas funcionalidades centradas en el rendimiento, la búsqueda y el desarrollo. Entre las funciones clave se incluyen la cuantificación de alta precisión de 1 bit (RaBitQ) y una capa de caché dinámica para mejorar el rendimiento, la detección de casi duplicados con MinHash y la concordancia precisa de frases para la búsqueda avanzada, así como funciones de incrustación automatizadas con modificación de esquemas en línea para mejorar la experiencia del desarrollador.</p>
<div class="alert note">
<p>Esta es una versión preliminar de Milvus 2.6.0. Para probar las últimas funciones, instale esta versión como una nueva implementación. No se admite la actualización de Milvus v2.5.x o anterior a 2.6.0-rc1.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Cambios en la arquitectura<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Desde la versión 2.6, Milvus introduce cambios arquitectónicos significativos destinados a mejorar el rendimiento, la escalabilidad y la facilidad de uso. Para obtener más información, consulte <a href="/docs/es/architecture_overview.md">Visión general de la arquitectura de Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nodo de flujo (GA)</h4><p>En versiones anteriores, el proxy escribía los datos de flujo en la WAL y el QueryNode y el DataNode los leían. Esta arquitectura dificultaba la obtención de consenso en el lado de la escritura y requería una lógica compleja en el lado de la lectura. Además, el delegado de consulta se encontraba en el QueryNode, lo que dificultaba la escalabilidad. Milvus 2.5.0 introdujo el Streaming Node, que pasa a ser GA en la versión 2.6.0. Este componente es ahora responsable de todas las operaciones de lectura/escritura de WAL a nivel de disco y también sirve como delegador de consultas, resolviendo los problemas mencionados y permitiendo nuevas optimizaciones.</p>
<p><strong>Aviso importante de actualización</strong>: Streaming Node es un cambio arquitectónico significativo, por lo que no se admite una actualización directa a Milvus 2.6.0-rc1 desde versiones anteriores.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL nativo de Woodpecker</h4><p>Milvus dependía anteriormente de sistemas externos como Kafka o Pulsar para su WAL. Aunque funcionales, estos sistemas añadían una complejidad operativa y una sobrecarga de recursos significativas, especialmente para implementaciones pequeñas y medianas. En Milvus 2.6, estos sistemas se sustituyen por Woodpecker, un sistema de WAL nativo de la nube creado específicamente. Woodpecker está diseñado para el almacenamiento de objetos y admite modos de disco cero basados tanto en almacenamiento local como en almacenamiento de objetos, lo que simplifica las operaciones al tiempo que mejora el rendimiento y la escalabilidad.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusión de DataNode e IndexNode</h4><p>En Milvus 2.6, tareas como la compactación, la importación masiva, la recopilación de estadísticas y la creación de índices se gestionan ahora mediante un programador unificado. La función de persistencia de datos que antes gestionaba el DataNode se ha trasladado al Streaming Node. Para simplificar el despliegue y el mantenimiento, el IndexNode y el DataNode se han fusionado en un único componente DataNode. Este nodo consolidado ejecuta ahora todas estas tareas críticas, reduciendo la complejidad operativa y optimizando la utilización de los recursos.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusión de coordinadores en MixCoord</h4><p>El diseño anterior con módulos RootCoord, QueryCoord y DataCoord separados introducía complejidad en la comunicación entre módulos. Para simplificar el diseño del sistema, estos componentes se han fusionado en un único coordinador unificado denominado MixCoord. Esta consolidación reduce la complejidad de la programación distribuida al sustituir la comunicación basada en la red por llamadas a funciones internas, lo que se traduce en un funcionamiento más eficiente del sistema y una simplificación del desarrollo y el mantenimiento.</p>
<h3 id="Key-Features" class="common-anchor-header">Características principales<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Cuantificación de 1 bit RaBitQ</h4><p>Para manejar conjuntos de datos a gran escala, la cuantización de 1 bit es una técnica eficaz para mejorar la utilización de los recursos y el rendimiento de la búsqueda. Sin embargo, los métodos tradicionales pueden afectar negativamente a la recuperación. En colaboración con los autores de la investigación original, Milvus 2.6 presenta RaBitQ, una solución de cuantización de 1 bit que mantiene una alta precisión de recuperación al tiempo que ofrece las ventajas de recursos y rendimiento de la compresión de 1 bit.</p>
<p>Para más información, consulte <a href="/docs/es/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Mejora de la capacidad JSON</h4><p>Milvus 2.6 mejora su compatibilidad con el tipo de datos JSON con las siguientes mejoras:</p>
<ul>
<li><strong>Rendimiento</strong>: Ahora se admite oficialmente la indexación de rutas JSON, lo que permite la creación de índices invertidos en rutas específicas dentro de objetos JSON (por ejemplo, <code translate="no">meta.user.location</code>). Esto evita el escaneo completo de objetos y mejora la latencia de las consultas con filtros complejos.</li>
<li><strong>Funcionalidad</strong>: Para soportar una lógica de filtrado más compleja, esta versión añade soporte para las funciones <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, y <code translate="no">CAST</code>. De cara al futuro, nuestro trabajo sobre el soporte de JSON continúa. Nos complace anunciar que las próximas versiones oficiales incluirán funciones aún más potentes, como <strong>la trituración de JSON</strong> y un <strong>índice JSON FLAT</strong>, diseñado para mejorar drásticamente el rendimiento en datos JSON muy anidados.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Mejora de las funciones de analizador y tokenizador</h4><p>Esta versión mejora significativamente las capacidades de procesamiento de texto con varias actualizaciones de Analyzer y Tokenizer:</p>
<ul>
<li>Está disponible una nueva sintaxis de <a href="/docs/es/analyzer-overview.md#Example-use">Run Analyzer</a> para validar las configuraciones del tokenizador.</li>
<li>Se ha integrado el <a href="/docs/es/lindera-tokenizer.md">tokenizador Lindera</a> para mejorar la compatibilidad con idiomas asiáticos como el japonés y el coreano.</li>
<li>Ahora es posible seleccionar el tokenizador a nivel de fila, con el <a href="/docs/es/icu-tokenizer.md">tokenizador ICU</a> de uso general disponible como alternativa para situaciones multilingües.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Entrada y salida de datos con funciones de incrustación</h4><p>Milvus 2.6 introduce la capacidad "Data-in, Data-Out" que simplifica el desarrollo de aplicaciones de IA al integrarse directamente con modelos de incrustación de terceros (por ejemplo, de OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Ahora los usuarios pueden insertar y consultar datos de texto sin procesar, y Milvus llamará automáticamente al servicio de modelo especificado para convertir el texto en vectores en tiempo real. Esto elimina la necesidad de un proceso de conversión vectorial independiente.</p>
<p>Para más información, consulte <a href="/docs/es/embedding-function-overview.md">Visión general de la función de incrustación</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Coincidencia de frases</h4><p>La concordancia de frases es una función de búsqueda de texto que sólo devuelve resultados cuando la secuencia exacta de palabras de una consulta aparece de forma consecutiva y en el orden correcto dentro de un documento.</p>
<p><strong>Características principales</strong>:</p>
<ul>
<li>Sensible al orden: Las palabras deben aparecer en el mismo orden que en la consulta.</li>
<li>Coincidencia consecutiva: Las palabras deben aparecer una junto a otra, a menos que se utilice un valor de inclinación.</li>
<li>Inclinación (opcional): Un parámetro ajustable que permite un pequeño número de palabras intermedias, lo que permite la concordancia difusa de frases.</li>
</ul>
<p>Para más información, consulte <a href="/docs/es/phrase-match.md">Coincidencia de frases</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Índice MinHash LSH (Beta)</h4><p>Para abordar la necesidad de deduplicación de datos en el entrenamiento de modelos, Milvus 2.6 añade soporte para índices MINHASH_LSH. Esta característica proporciona un método computacionalmente eficiente y escalable para estimar la similitud de Jaccard entre documentos para identificar casi duplicados. Los usuarios pueden generar firmas MinHash para sus documentos de texto durante el preprocesamiento y utilizar el índice MINHASH_LSH en Milvus para encontrar eficientemente contenido similar en conjuntos de datos a gran escala, mejorando la limpieza de datos y la calidad del modelo.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Funciones de decaimiento en función del tiempo</h4><p>Milvus 2.6 introduce funciones de decaimiento en función del tiempo para abordar situaciones en las que el valor de la información cambia con el tiempo. Durante la reclasificación de resultados, los usuarios pueden aplicar funciones de decaimiento exponencial, gaussiano o lineal basadas en un campo de fecha y hora para ajustar la puntuación de relevancia de un documento. Esto asegura que el contenido más reciente pueda ser priorizado, lo cual es crítico para aplicaciones como fuentes de noticias, comercio electrónico y la memoria de un agente de IA.</p>
<p>Para obtener más información, consulte <a href="/docs/es/decay-ranker-overview.md">Descripción general de Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Añadir campo para la evolución del esquema en línea</h4><p>Para proporcionar una mayor flexibilidad de esquema, Milvus 2.6 soporta ahora la adición de un nuevo campo escalar al esquema de una colección existente en línea. Esto evita la necesidad de crear una nueva colección y realizar una migración de datos disruptiva cuando cambian los requisitos de la aplicación.</p>
<p>Para obtener más información, consulte <a href="/docs/es/add-fields-to-an-existing-collection.md">Añadir campos a una colección existente</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Soporte de vectores INT8</h4><p>En respuesta al creciente uso de modelos cuantificados que producen incrustaciones de enteros de 8 bits, Milvus 2.6 añade soporte nativo de tipos de datos para vectores INT8. Esto permite a los usuarios ingerir estos vectores directamente sin descuantificación, ahorrando costes de cálculo, ancho de banda de red y almacenamiento. Esta función es compatible inicialmente con los índices de la familia HNSW.</p>
<p>Para más información, consulte <a href="/docs/es/dense-vector.md">Vector denso</a>.</p>
