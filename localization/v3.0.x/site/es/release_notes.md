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
    </button></h1><p>¡Descubre las novedades de Milvus! En esta página se resumen las nuevas funciones, las mejoras, los problemas conocidos y las correcciones de errores de cada versión. Te recomendamos que visites esta página con regularidad para estar al tanto de las actualizaciones.</p>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 29 de julio de 2026</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th><th>Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>¡Milvus 3.0.0 ya está disponible oficialmente! Basándose en la arquitectura «lake-native» introducida en <a href="https://milvus.io/docs/release_notes.md#v30-beta">la versión 3.0-beta</a>, esta versión completa lo que la beta inició: External Collection cubre más flujos de trabajo de «lakehouse»; el esquema admite la adición, el relleno y la eliminación en línea; el índice disperso se ha reconstruido en torno a SINDI; StructArray y la búsqueda por facetas completan el motor de recuperación; el paso directo de FAISS y TEXT amplían las opciones de indexación y modalidades; y Woodpecker se ejecuta como un servicio independiente.</p>
<p>Mira el vídeo a continuación para obtener más información sobre Milvus 3.0 y participa en la sesión de preguntas y respuestas (AMA) con los responsables del mantenimiento del núcleo:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Si eres nuevo en la línea 3.0, la sección «Resumen de las características principales de la versión 3.0» que aparece a continuación resume las capacidades introducidas en la versión 3.0-beta; las <a href="https://milvus.io/docs/release_notes.md#v30-beta">notas de la versión 3.0-beta</a> contienen la información completa.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Novedades de la versión 3.0.0 (desde la 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Colección externa: flujos de trabajo de «lakehouse» más completos</h4><p>La versión 3.0-beta introdujo la «Colección externa»: permite hacer referencia a archivos de lago de datos in situ, crear índices y realizar búsquedas en ellos sin copiar los datos a Milvus. Esta versión amplía esta funcionalidad hacia flujos de trabajo completos de recuperación en un «lakehouse». Los campos externos ahora pueden alimentar campos de salida de funciones, como vectores dispersos BM25, firmas MinHash e incrustaciones de texto, de modo que los campos de recuperación de texto y derivados de modelos se crean dentro de Milvus sin copiar la tabla de origen. La actualización también admite la evolución aditiva del esquema: cuando la tabla externa incorpora nuevas columnas, Milvus actualiza los segmentos afectados en lugar de reconstruir la colección.</p>
<p>Esta versión también añade un formato externo « <code translate="no">milvus-table</code> » que trata los metadatos de Milvus Snapshot y los manifiestos de Storage V3 como una fuente externa, de modo que una instantánea de la colección puede servirla como tabla externa: los sistemas de procesamiento por lotes y de servicio obtienen una vista compartida, respaldada por el manifiesto, de los mismos datos.</p>
<p>Para obtener más información, consulta <a href="/docs/es/create-an-external-collection.md">«Crear una colección externa</a> y <a href="/docs/es/snapshots.md">instantáneas</a>».</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Esquema flexible: añadir, rellenar y eliminar columnas en línea</h4><p>Los esquemas no permanecen estáticos en producción —los modelos incrustados se sustituyen, las características se actualizan, los campos quedan obsoletos— y esto solía implicar reconstrucciones completas de la colección con tiempo de inactividad o escrituras duplicadas. La versión 3.0.0 cierra el ciclo: se pueden añadir, rellenar y eliminar columnas mientras continúa el servicio.</p>
<p>El rellenado funciona en ambas direcciones. El rellenado externo gestiona valores calculados fuera de Milvus: se añade una columna, se toma una instantánea de la colección como punto de partida coherente, se ejecuta el trabajo sin conexión, se vuelven a escribir los valores y Milvus indexa la nueva columna de forma incremental; así, una actualización del modelo de incrustación en cientos de millones de filas se convierte en una ruta activa sin tiempo de inactividad. El rellenado interno cubre los valores derivados del núcleo: al asociar una función BM25 o MinHash a una colección existente, su campo de salida se calcula automáticamente a partir de los datos existentes.</p>
<p>Para obtener más información, consulta <a href="/docs/es/add-fields-to-an-existing-collection.md">«Añadir campos a una colección existente</a>».</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Revisión del índice disperso: SINDI, Block-Max WAND y Block-Max MaxScore</h4><p>Milvus 3.0 actualiza el índice de vectores dispersos en todos los aspectos. Introduce nuevos algoritmos de búsqueda <a href="https://arxiv.org/abs/2509.08395">—SINDI</a>, Block-Max WAND y Block-Max MaxScore— junto con la compresión de listas invertidas, la cuantificación configurable y la selección del algoritmo de búsqueda por carga de trabajo. También se han optimizado la carga mediante mmap, la serialización y la puntuación BM25, lo que reduce el almacenamiento del índice y la sobrecarga de carga para la búsqueda de vectores dispersos y de texto completo a gran escala. En pruebas de rendimiento internas, el índice BM25 comprimido es aproximadamente tres veces más pequeño que el índice disperso 2.6 con una recuperación comparable, y SINDI alcanza hasta unas diez veces el QPS de MaxScore en incrustaciones dispersas aprendidas. Una vez habilitada la nueva versión del índice (véanse las notas sobre compatibilidad y comportamiento), SINDI pasa a ser la opción predeterminada para la búsqueda de IP dispersa, y MaxScore, la predeterminada para BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Cobertura de StructArray</h4><p>StructArray ahora admite valores nulos, índices de mapa de bits, la adición dinámica de campos en colecciones activas y la actualización parcial de campos de estructura mediante «upsert», con cobertura correspondiente para REST e importación masiva.</p>
<p>La búsqueda a nivel de elemento añade la búsqueda híbrida entre subcampos vectoriales con colapso configurable por entidad (variantes max / sum / avg / top-k), además de la búsqueda por rango y la agrupación dentro de la misma. El filtrado anidado abarca los predicados « <code translate="no">element_filter</code> », los cuantificadores « <code translate="no">MATCH_ANY</code> » / « <code translate="no">MATCH_ALL</code> » / « <code translate="no">MATCH_LEAST</code> » / « <code translate="no">MATCH_MOST</code> » / « <code translate="no">MATCH_EXACT</code> », el acceso posicional a subcampos como « <code translate="no">tags[0][name]</code> » y « <code translate="no">array_length()</code> » en la columna de la estructura.</p>
<p>Para obtener más información, consulta <a href="/docs/es/array-of-structs.md">«StructArray</a> » y <a href="/docs/es/struct-array-operators.md">«Operadores</a> de <a href="/docs/es/struct-array-operators.md">StructArray</a>».</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Agregación de búsquedas y búsqueda por facetas</h4><p>La agregación de consultas de la versión beta calcula estadísticas exactas sobre los datos filtrados; la versión 3.0.0 añade la faceta a la ruta de búsqueda. Especifica un campo de faceta en el momento de la búsqueda y Milvus devuelve los valores de faceta principales, cada uno representado por su miembro que mejor se ajusta en la clasificación ANN y anotado con agregados como COUNT y AVG — la barra lateral de búsqueda por facetas (marca, rango de precios, atributos) en una sola solicitud, en lugar de realizar una recuperación excesiva y el recuento en el lado del cliente.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Reordenación mediante la cadena de funciones</h4><p>La reordenación de la clasificación ahora se puede componer a través de la API de la cadena de funciones, que ejecuta un flujo ordenado y tipado como parte de una única solicitud de búsqueda. Una cadena puede combinar la reevaluación temprana L0 en QueryNode con la reordenación L2 posterior a la reducción en Proxy, lo que permite la transformación y combinación de puntuaciones, la reordenación basada en modelos, la clasificación y la eliminación de candidatos sin necesidad de orquestación del lado del cliente. Esta versión también añade la puntuación nativa de XGBoost para la reordenación de L0 utilizando modelos UBJ registrados como FileResources, junto con los proveedores de inferencia de Hugging Face para la incrustación de texto gestionada por el servidor y la reordenación por similitud de frases.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Campos de texto largo TEXT</h4><p>Los campos TEXT convierten el texto largo en contenido de primera clase, al eliminar los límites de longitud del lado del almacenamiento: admiten <code translate="no">text_match</code>, <code translate="no">phrase_match</code> y BM25. Los valores inferiores a 64 KB permanecen en línea; los valores más grandes se almacenan en archivos LOB a nivel de partición en formato Vortex, y la columna solo almacena referencias <code translate="no">(file_id, offset)</code>. Los archivos LOB se comparten entre segmentos, por lo que la compactación mueve las referencias en lugar de reescribir el texto. Para RAG, esto significa recuperar vectores y texto fuente del mismo almacén en una sola operación de E/S, sin necesidad de utilizar un almacén de blobs externo.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Pasar el índice FAISS</h4><p>Un nuevo tipo de índice « <code translate="no">FAISS</code> » acepta cadenas arbitrarias de la fábrica de índices Faiss a través del parámetro « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — con los parámetros de búsqueda pasados directamente, de modo que las recetas de Faiss se reproducen directamente en Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Compatibilidad con los formatos Vortex y Lance</h4><p>La capa de almacenamiento incorpora dos formatos columnares abiertos: Vortex como formato interno de próxima generación —codificaciones adaptativas (diccionario, RLE, empaquetamiento de bits, compresión específica para números flotantes), descompresión sin copia, optimizado para cargas de trabajo mixtas de vectores y escalares— y Lance, junto con Parquet, para el intercambio en un ecosistema abierto. Vortex está destinado a convertirse en el formato interno por defecto, con la aplicación de filtros y una variante local previstas en la hoja de ruta.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Despliegue autónomo de Woodpecker</h4><p>Woodpecker, el WAL que constituye el núcleo de la ruta de escritura en streaming, ahora puede implementarse como un servicio independiente en lugar de integrarse en otros nodos —escalabilidad independiente, aislamiento de fallos y observabilidad, como cualquier otro microservicio—. Esto es especialmente importante para clústeres grandes y cargas de trabajo con un alto volumen de escritura.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Resumen de las características principales de la versión 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Las características que se indican a continuación se introdujeron en la <a href="https://milvus.io/docs/release_notes.md#v30-beta">versión 3.0-beta</a> y forman parte de la 3.0.0; consulta las notas de la versión beta para obtener la descripción completa.</p>
<ul>
<li><strong>Colección externa</strong>: consulta de datos de lakehouse (Parquet, Lance, Iceberg, Vortex) in situ: sin copias, de solo lectura y sincronizados mediante actualización incremental.</li>
<li><strong>Instantánea</strong>: vistas de recopilación de solo lectura en un momento determinado por referencia de segmento, con un almacenamiento marginal casi nulo.</li>
<li><strong>Almacenamiento V3 (Loon)</strong>: almacenamiento columnar basado en manifiestos en almacenamiento de objetos; la base para Snapshot y Colección externa.</li>
<li><strong>Consulta/Búsqueda ORDER BY</strong>: ordenación de varios campos del lado del servidor con ASC/DESC por campo.</li>
<li><strong>Agregación de consultas</strong>: COUNT / SUM / AVG / MIN / MAX con agrupación, evaluadas del lado del servidor.</li>
<li><strong>EmbList + DiskANN</strong>: indexación multivectorial en disco para listas de incrustación StructArray, con vías de aceleración como Muvera y Lemur.</li>
<li><strong>Función MinHash (doc-in, doc-out)</strong>: firmas MinHash del lado del servidor, además de « <code translate="no">MINHASH_LSH</code> » para la detección de casi duplicados.</li>
<li><strong>Vectores nulos</strong> — NULL en los seis tipos de vectores; la búsqueda omite las filas NULL, y AddField se extiende a los campos vectoriales.</li>
<li><strong>TTL de entidad</strong> — caducidad por fila controlada por un campo TIMESTAMPTZ.</li>
<li><strong>FileResource</strong>: diccionarios, listas de sinónimos y listas de palabras vacías gestionados por el clúster para analizadores, BM25 y Text Match.</li>
<li><strong>Fusión forzada</strong>: compactación de segmentos activada por un operador, en modo síncrono o asíncrono.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Notas sobre compatibilidad y comportamiento<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
<li><strong>Storage V3 (Loon) está desactivado por defecto.</strong> Las funciones que dependen de él —como Snapshot y los campos TEXT— requieren activarlo manualmente a través de <code translate="no">common.storage.useLoonFFI</code>. Storage V3 se activará por defecto en una versión posterior.</li>
<li><strong>Se garantiza la compatibilidad y la reversión de la versión 2.6 a la 3.0</strong>: una implementación de la versión 3.0 se puede revertir a la 2.6. Sin embargo, una vez que se habiliten o utilicen funciones que modifiquen el formato de datos serializados (por ejemplo, Storage V3), ya no será posible la reversión.</li>
<li><strong>Las nuevas versiones de índice son opcionales por el momento.</strong> Los algoritmos de índice recién introducidos requieren aumentar manualmente la versión de índice de destino (<code translate="no">dataCoord.targetVecIndexVersion</code> a 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> a 4) antes de que surtan efecto; en una versión posterior se habilitarán de forma predeterminada.</li>
<li><strong>Las imágenes de GPU pasan a CUDA 12.9</strong> y ya no conservan la compatibilidad con las GPU de Ubuntu 20.04.</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 9 de mayo de 2026</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta amplía la base de datos vectorial de Milvus con una nueva integración en el ecosistema Open Lake: External Collection permite a Milvus consultar tablas externas de Lake sin copia (zero-copy), y Spark puede leer colecciones de Milvus directamente a través de Snapshot. Esta versión también ofrece una recuperación más completa, un esquema más expresivo, una personalización más profunda de la búsqueda de texto, controles más precisos sobre el ciclo de vida de los datos y los modelos, y más controles por parte del operador. Milvus 3.0 es el núcleo central de Zilliz Lakebase, que impulsa su servicio unificado, el descubrimiento y el procesamiento por lotes.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Colección externa</h4><p>En los flujos de datos típicos de IA, ya existen terabytes de representaciones y metadatos almacenados en el almacenamiento de objetos como tablas Parquet, Lance o Iceberg. Copiar esos datos a Milvus duplica el coste de almacenamiento, añade un flujo ETL que debe mantenerse sincronizado y aleja la gobernanza de los datos del cliente.</p>
<p>La recopilación externa elimina la necesidad de copiar. Una recopilación de Milvus puede hacer referencia a los archivos en su ubicación original, y Milvus se encarga únicamente de gestionar el esquema, los índices y la ejecución de consultas. Una actualización incremental mantiene la colección alineada con los archivos subyacentes. Los clientes cuyos datos no pueden salir del lago de datos, como los equipos de finanzas y sanidad, pueden realizar búsquedas vectoriales en esos datos allí donde se encuentran. Un único conjunto de datos residente en el lago de datos también puede servirse desde varias instancias de Milvus a la vez.</p>
<p>Para obtener más información, consulta <a href="/docs/es/create-an-external-collection.md">«Crear una colección externa</a>».</p>
<h4 id="Snapshot" class="common-anchor-header">Instantánea</h4><p>La entrega de datos y el descubrimiento por lotes suelen necesitar la misma colección al mismo tiempo. La evaluación de modelos A/B, la deduplicación a gran escala, la validación de datos retrospectivos y la reversión de versiones requieren una vista estable de la colección mientras siguen produciéndose escrituras.</p>
<p>La instantánea crea una vista de solo lectura de una colección en un momento determinado haciendo referencia a segmentos existentes en lugar de copiar datos, por lo que el coste marginal de almacenamiento es prácticamente nulo. Los trabajos por lotes pueden leer desde la instantánea bajo aislamiento de tipo MVCC mientras la colección activa sigue aceptando escrituras.</p>
<p>Para obtener más información, consulta <a href="/docs/es/snapshots.md">«Instantáneas</a>», <a href="/docs/es/manage-snapshots.md">«Gestión de instantáneas</a>» y <a href="/docs/es/snapshot-use-cases.md">«Casos de uso de instantáneas</a>».</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Ordenación en consultas y búsquedas</h4><p>La búsqueda y las consultas admiten ahora la ordenación por varios campos, con la ordenación delegada al núcleo de Milvus y la configuración de « <code translate="no">ASC</code> » y « <code translate="no">DESC</code> » por campo. Esto resuelve una limitación habitual en producción: la ordenación «Top-K» basada únicamente en la distancia a menudo no se ajusta a las necesidades empresariales cuando el elemento más similar no es el más barato, el más reciente ni el más popular.</p>
<p>Las aplicaciones ya no tienen que recuperar resultados de más y volver a ordenarlos en el cliente para expresar una clasificación compuesta.</p>
<p>Para obtener más información, consulta <a href="/docs/es/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«Ordenar resultados de búsqueda por campos escalares</a> » y <a href="/docs/es/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">«Ordenar resultados de consulta</a>».</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregación de consultas</h4><p>La generación de estadísticas de distribución por inquilinos, recuentos de completitud de campos o el progreso del despliegue de versiones a partir de una colección de Milvus solía requerir la recuperación de las entidades coincidentes en el cliente y su agregación allí. Milvus 3.0 integra la agregación escalar de estilo SQL en el núcleo. Una llamada de consulta admite expresiones de agregación de tipo « <code translate="no">group_by_fields</code> » y « <code translate="no">output_fields</code> », incluyendo « <code translate="no">count(*)</code> », « <code translate="no">count(&lt;field&gt;)</code> », « <code translate="no">sum(&lt;field&gt;)</code> », « <code translate="no">avg(&lt;field&gt;)</code> », « <code translate="no">min(&lt;field&gt;)</code> » y « <code translate="no">max(&lt;field&gt;)</code> ». La agregación se evalúa en el lado del servidor tras el filtrado.</p>
<p>Para obtener más información, consulte <a href="/docs/es/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">«Agregar resultados de consultas</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vector nulo</h4><p>Las representaciones suelen generarse de forma asíncrona, por lo que una entidad puede llegar antes que su vector. Los datos multimodales también presentan lagunas naturales, como un vídeo sin subtítulos o un producto sin imagen. Las versiones anteriores no ofrecían una solución adecuada: las aplicaciones retrasaban la escritura hasta que el vector estuviera listo o introducían un vector provisional, y ambas opciones perjudicaban la calidad de la recuperación.</p>
<p>Milvus 3.0 admite el valor NULL en los campos vectoriales de los seis tipos de vectores. La búsqueda omite automáticamente los vectores NULL, la calidad de la recuperación no se ve afectada y los vectores NULL prácticamente no ocupan espacio de almacenamiento. La función « <code translate="no">AddField</code> » también se extiende a los campos vectoriales con este cambio: con « <code translate="no">nullable=True</code> », una colección existente puede ampliar sus campos vectoriales en línea sin necesidad de reconstruirla.</p>
<p>Para obtener más información, consulta <a href="/docs/es/nullable-and-default.md">«Campos nulos</a>».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Diccionario personalizado y diccionario de sinónimos</h4><p>Los tokenizadores predeterminados no siempre cumplen los requisitos de calidad de búsqueda en producción. El chino, los ámbitos verticales como la medicina, el derecho y la química, y los corpus multilingües pueden beneficiarse sustancialmente de los diccionarios personalizados y las tablas de sinónimos. Hasta ahora, estos recursos se gestionaban principalmente mediante reescrituras de consultas en el lado de la aplicación.</p>
<p>Milvus 3.0 incorpora un mecanismo FileResource para registrar diccionarios de tokenizadores personalizados, listas de sinónimos, listas de palabras vacías y reglas de descomposición de compuestos. Una vez registrado, se puede hacer referencia a un recurso desde cualquier tokenizador o filtro, y surte efecto en BM25, los analizadores y Text Match. Ahora es posible versionar y gestionar de forma centralizada los diccionarios y sinónimos, en lugar de tenerlos dispersos por el código de la aplicación.</p>
<p>Para obtener más información, consulta <a href="/docs/es/manage-file-resources.md">«Gestionar recursos de archivo</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidades</h4><p>El TTL a nivel de colección y de partición resulta demasiado general para muchos escenarios de ciclo de vida y cumplimiento normativo. Los distintos inquilinos dentro de una misma colección suelen tener reglas de retención diferentes, y es posible que las entidades individuales deban caducar según un calendario que no coincida con el del resto de la colección.</p>
<p>Milvus 3.0 admite el TTL por entidad. Basta con declarar un campo « <code translate="no">TIMESTAMPTZ</code> » en el esquema, marcarlo como campo de TTL mediante una propiedad de la colección, y Milvus recuperará automáticamente las entidades caducadas. Esto cubre las solicitudes de «derecho al olvido», la caducidad de los datos de sesión y el historial de conversaciones delimitado sin necesidad de limpieza por parte de la aplicación.</p>
<p>Para obtener más información, consulta <a href="/docs/es/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">«Establecer el TTL a nivel de entidad</a>».</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 añadió el índice « <code translate="no">MINHASH_LSH</code> » para la detección de casi-duplicados basada en conjuntos, pero las aplicaciones aún tenían que calcular las firmas MinHash antes de escribir los datos en Milvus.</p>
<p>Milvus 3.0 añade una función MinHash del lado del servidor. Basta con declarar un campo de entrada « <code translate="no">VARCHAR</code> » y un campo de salida « <code translate="no">BINARY_VECTOR</code> » en el esquema, asociar una función « <code translate="no">FunctionType.MINHASH</code> », y Milvus calculará las firmas durante la inserción, la inserción masiva y la búsqueda. Junto con « <code translate="no">MINHASH_LSH</code> », esto permite flujos de trabajo de deduplicación para grandes conjuntos de datos, la creación de huellas digitales y la detección de plagio dentro de Milvus.</p>
<p>Para obtener más información, consulta la <a href="/docs/es/minhash-function.md">función MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>La suposición de «una entidad = un vector» ya no se ajusta a la recuperación moderna. Los documentos largos se dividen en muchos fragmentos, los modelos de interacción tardía como ColBERT emiten un vector por token y las entidades multimodales pueden tener varias vistas.</p>
<p>EmbList almacena una lista de vectores de longitud variable por entidad, utilizando « <code translate="no">DISKANN</code> » como índice en disco. La ruta de disco mantiene bajo control el uso de la RAM cuando el corpus supera los límites de memoria. EmbList + « <code translate="no">DISKANN</code> » es la primera variante de la familia más amplia de StructList en esta versión RC. El resto de la familia, incluido el filtrado de StructList y la aceleración multivectorial de Muvera/Lemur, está previsto para la versión oficial 3.0.</p>
<p>Para obtener más información, consulta <a href="/docs/es/search-with-embedding-lists.md">«Búsqueda con listas</a> de <a href="/docs/es/search-with-embedding-lists.md">incrustación</a>».</p>
<h4 id="Force-Merge" class="common-anchor-header">Fusión forzada</h4><p>Las cargas de trabajo en producción acumulan fragmentación de segmentos con el tiempo, lo que provoca fluctuaciones en la latencia de las consultas y un aumento excesivo del almacenamiento.</p>
<p>Milvus 3.0 añade la capacidad de activar la compactación de segmentos de forma explícita durante las franjas horarias de menor actividad, tanto en modo síncrono como asíncrono.</p>
<p>Para obtener más información, consulta <a href="/docs/es/force-merge.md">«Compactación</a> de <a href="/docs/es/force-merge.md">fusión forzada</a>».</p>
<h4 id="Storage-V3" class="common-anchor-header">Almacenamiento V3</h4><p>Milvus 3.0 introduce Almacenamiento V3, un motor de almacenamiento columnar basado en manifiestos en el que los datos y los metadatos residen en un almacenamiento de objetos compatible con S3. Cada versión del conjunto de datos se captura como una instantánea de manifiesto inmutable, un archivo codificado en Avro que registra qué grupos de columnas, registros delta y estadísticas componen el conjunto de datos.</p>
<p>Los manifiestos son archivos Avro compactos, y los registros delta registran las eliminaciones a nivel de entidad sin reescribir los archivos de datos. Esto mantiene baja la sobrecarga de metadatos a medida que crecen los conjuntos de datos. El manifiesto también desacopla el seguimiento de metadatos de la ruta de consulta, lo que permite que una colección gestione más segmentos sin degradar el rendimiento de las consultas.</p>
<p>Dado que los estados se almacenan en el almacenamiento de objetos, el conjunto de datos es autodescriptivo: cualquier lector con acceso a la ruta de almacenamiento puede descubrirlo e interpretarlo sin necesidad de un catálogo central. Esta propiedad sustenta las integraciones con External Collection, Snapshot y futuros lagos de datos.</p>
