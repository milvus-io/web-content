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
    </button></h1><p>Descubra las novedades de Milvus. Esta página resume las nuevas características, mejoras, problemas conocidos y correcciones de errores de cada versión. Puede encontrar las notas de la versión para cada versión publicada después de la v2.5.0 en esta sección. Le sugerimos que visite regularmente esta página para conocer las actualizaciones.</p>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 23 de diciembre de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 aporta avances significativos para mejorar la facilidad de uso, la escalabilidad y el rendimiento para los usuarios que se ocupan de la búsqueda vectorial y la gestión de datos a gran escala. Con esta versión, Milvus integra nuevas y potentes funciones como la búsqueda basada en términos, la compactación de clústeres para optimizar las consultas y la compatibilidad versátil con métodos de búsqueda vectorial dispersa y densa. Las mejoras en la gestión de clusters, indexación y manejo de datos introducen nuevos niveles de flexibilidad y facilidad de uso, haciendo de Milvus una base de datos vectorial aún más robusta y fácil de usar.</p>
<h3 id="Key-Features" class="common-anchor-header">Características principales</h3><h4 id="Full-Text-Search" class="common-anchor-header">Búsqueda de texto completo</h4><p>Milvus 2.5 es compatible con la búsqueda de texto completo implementada con Sparse-BM25. Esta función es un complemento importante de las potentes capacidades de búsqueda semántica de Milvus, especialmente en situaciones en las que intervienen palabras raras o términos técnicos. En versiones anteriores, Milvus soportaba vectores dispersos para ayudar en escenarios de búsqueda de palabras clave. Estos vectores dispersos se generaban fuera de Milvus mediante modelos neuronales como SPLADEv2/BGE-M3 o modelos estadísticos como el algoritmo BM25.</p>
<p>Desarrollado por <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus 2.5 incorpora analizadores y extracción de vectores dispersos, ampliando la API de sólo recibir vectores como entrada a aceptar directamente texto. La información estadística de BM25 se actualiza en tiempo real a medida que se introducen los datos, lo que mejora la facilidad de uso y la precisión. Además, los vectores dispersos basados en algoritmos de aproximación al vecino más cercano (RNA) ofrecen un rendimiento más potente que los sistemas estándar de búsqueda por palabras clave.</p>
<p>Para obtener más información, consulte <a href="/docs/es/analyzer-overview.md">Visión general del analizador</a> y <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">WebUI de gestión de clústeres (Beta)</h4><p>Para soportar mejor los datos masivos y las ricas funciones, el sofisticado diseño de Milvus incluye varias dependencias, numerosos roles de nodo, estructuras de datos complejas y mucho más. Estos aspectos pueden plantear retos de uso y mantenimiento.</p>
<p>Milvus 2.5 introduce una WebUI integrada de gestión de clústeres, que reduce la dificultad de mantenimiento del sistema mediante la visualización de la compleja información del entorno de ejecución de Milvus. Esto incluye detalles de bases de datos y colecciones, segmentos, canales, dependencias, estado de salud de los nodos, información de tareas, consultas lentas, etc.</p>
<h4 id="Text-Match" class="common-anchor-header">Coincidencia de texto</h4><p>Milvus 2.5 aprovecha los analizadores y la indexación de <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para el preprocesamiento de textos y la creación de índices, lo que permite una correspondencia precisa en lenguaje natural de datos de texto basados en términos específicos. Esta función se utiliza principalmente para la búsqueda filtrada para satisfacer condiciones específicas y puede incorporar el filtrado escalar para refinar los resultados de la consulta, permitiendo búsquedas de similitud dentro de vectores que cumplen criterios escalares.</p>
<p>Para obtener más información, consulte <a href="/docs/es/analyzer-overview.md">Visión general del analizador</a> y <a href="/docs/es/keyword-match.md">Coincidencia de texto</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Índice de mapa de bits</h4><p>Se ha añadido un nuevo índice de datos escalares a la familia Milvus. El índice BitMap utiliza una matriz de bits, de longitud igual al número de filas, para representar la existencia de valores y acelerar las búsquedas.</p>
<p>Los índices Bitmap han sido tradicionalmente eficaces para los campos de baja cardinalidad, que tienen un número modesto de valores distintos, por ejemplo, una columna que contiene información sobre el sexo con sólo dos valores posibles: masculino y femenino.</p>
<p>Para obtener más información, consulte <a href="/docs/es/bitmap.md">Índice de mapa de bits</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Anulable y valor por defecto</h4><p>Milvus permite ahora establecer propiedades anulables y valores por defecto para campos escalares distintos del campo de clave primaria. Para los campos escalares marcados como <code translate="no">nullable=True</code>, los usuarios pueden omitir el campo al insertar datos; el sistema lo tratará como un valor nulo o un valor por defecto (si está establecido) sin lanzar un error.</p>
<p>Los valores por defecto y las propiedades anulables proporcionan una mayor flexibilidad a Milvus. Los usuarios pueden utilizar esta característica para campos con valores inciertos al crear colecciones. También simplifica la migración de datos desde otros sistemas de bases de datos a Milvus, permitiendo el manejo de conjuntos de datos que contienen valores nulos mientras se preserva la configuración original del valor por defecto.</p>
<p>Para más detalles, consulte <a href="/docs/es/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ basado en Faiss</h4><p>Gracias a la estrecha colaboración con la comunidad de Faiss, el algoritmo HNSW de Faiss ha experimentado mejoras significativas tanto en funcionalidad como en rendimiento. Por consideraciones de estabilidad y mantenimiento, Milvus 2.5 ha migrado oficialmente su soporte para HNSW de hnswlib a Faiss.</p>
<p>Basado en Faiss, Milvus 2.5 soporta múltiples métodos de cuantificación en HNSW para satisfacer las necesidades de diferentes escenarios: SQ (Scalar Quantizers), PQ (Product Quantizer), y PRQ (Product Residual Quantizer). SQ y PQ son los más comunes; SQ ofrece un buen rendimiento de consulta y velocidad de construcción, mientras que PQ ofrece una mejor recuperación con la misma relación de compresión. Muchas bases de datos vectoriales suelen utilizar la cuantificación binaria, que es una forma sencilla de cuantificación SQ.</p>
<p>PRQ es una fusión de PQ y AQ (cuantificador aditivo). En comparación con PQ, requiere tiempos de compilación más largos para ofrecer una mejor recuperación, especialmente a tasas de compresión altas, diciendo compresión binaria.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Compactación en clústeres (Beta)</h4><p>Milvus 2.5 introduce la compactación por agrupamiento para acelerar las búsquedas y reducir los costes en grandes colecciones. Al especificar un campo escalar como clave de agrupación, los datos se redistribuyen por rangos para optimizar el almacenamiento y la recuperación. Actuando como un índice global, esta función permite a Milvus podar eficazmente los datos durante las consultas basándose en metadatos de agrupación, mejorando el rendimiento de la búsqueda cuando se aplican filtros escalares.</p>
<p>Para obtener más información, consulte <a href="/docs/es/clustering-compaction.md">Compactación</a> de <a href="/docs/es/clustering-compaction.md">agrupaciones</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Otras funciones</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Nodo de streaming (Beta)</h4><p>Milvus 2.5 introduce un nuevo componente llamado nodo de streaming, que proporciona servicios de registro de escritura en cabeza (WAL). Esto permite a Milvus lograr consenso antes y después de leer y escribir canales, desbloqueando nuevas características, funcionalidades y optimizaciones. Esta característica está desactivada por defecto en Milvus 2.5 y estará disponible oficialmente en la versión 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Soporte IPv6</h4><p>Milvus es ahora compatible con IPv6, lo que permite una mayor conectividad de red y compatibilidad.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Importación masiva de CSV</h4><p>Además de los formatos JSON y Parquet, Milvus admite ahora la importación masiva directa de datos en formato CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Plantillas de expresiones para acelerar las consultas</h4><p>Milvus admite ahora plantillas de expresiones, lo que mejora la eficacia del análisis sintáctico de expresiones, especialmente en escenarios con expresiones complejas.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Mejoras en GroupBy</h4><ul>
<li><strong>Tamaño de grupo personalizable</strong>: Se ha añadido soporte para especificar el número de entradas devueltas para cada grupo.</li>
<li><strong>Búsqueda híbrida GroupBy</strong>: Admite la búsqueda híbrida GroupBy basada en varias columnas de vectores.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Mejoras del iterador</h4><ul>
<li><strong>Compatibilidad con MVCC</strong>: Ahora los usuarios pueden utilizar iteradores sin verse afectados por cambios posteriores en los datos, como inserciones y eliminaciones, gracias al control de concurrencia multiversión (MVCC).</li>
<li><strong>Cursor persistente</strong>: Milvus soporta ahora un cursor persistente para QueryIterator, permitiendo a los usuarios reanudar la iteración desde la última posición después de un reinicio de Milvus sin necesidad de reiniciar todo el proceso de iteración.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Optimización del borrado</h4><p>Mejorada la velocidad y reducido el uso de memoria para borrados a gran escala optimizando el uso de bloqueos y la gestión de memoria.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Actualización de dependencias</h4><p>Actualizado a ETCD 3.5.16 y Pulsar 3.0.7 LTS, corrigiendo CVEs existentes y mejorando la seguridad. Nota: La actualización a Pulsar 3.x no es compatible con las versiones anteriores 2.x.</p>
<p>Los usuarios que ya dispongan de una implantación de Milvus en funcionamiento deberán actualizar los componentes ETCD y Pulsar antes de poder utilizar las nuevas características y funciones. Para más detalles, consulte <a href="/docs/es/upgrade-pulsar-v3.md">Actualización de Pulsar de 2.x a 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Almacenamiento local V2</h4><p>Introdujo un nuevo formato de archivo local en Milvus 2.5, mejorando la eficiencia de carga y consulta para datos escalares, reduciendo la sobrecarga de memoria y sentando las bases para futuras optimizaciones.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Optimización del análisis sintáctico de expresiones</h4><p>Se ha mejorado el análisis sintáctico de expresiones implementando el almacenamiento en caché para expresiones repetidas, actualizando ANTLR y optimizando el rendimiento de las cláusulas <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Mejora del rendimiento de la concurrencia de DDL</h4><p>Se ha optimizado el rendimiento de la concurrencia de las operaciones del lenguaje de definición de datos (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Alineación de las funciones de la API RESTful</h4><p>Alineación de las funcionalidades de la API RESTful con otros SDK para mayor coherencia.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Actualizaciones de seguridad y configuración</h4><p>Soporte de TLS para asegurar la comunicación entre nodos en entornos más complejos o empresariales. Para obtener más información, consulte <a href="/docs/es/tls.md">Configuración de seguridad</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Mejoras en el rendimiento de la compactación</h4><p>Se han eliminado las limitaciones de segmentos máximos en la compactación mixta y ahora se da prioridad a los segmentos más pequeños, lo que mejora la eficacia y acelera las consultas en conjuntos de datos grandes o fragmentados.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Equilibrio de canales basado en la puntuación</h4><p>Se ha introducido una política que equilibra dinámicamente las cargas entre canales, lo que mejora la utilización de los recursos y la estabilidad general en las implantaciones a gran escala.</p>
