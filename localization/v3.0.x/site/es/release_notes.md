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
<p>Milvus 3.0-beta amplía la base de datos vectorial de Milvus con una nueva integración en el ecosistema Open Lake: External Collection permite a Milvus consultar tablas externas de Lake sin copia, y Spark puede leer colecciones de Milvus directamente a través de Snapshot. Esta versión también ofrece una recuperación más completa, un esquema más expresivo, una personalización más profunda de la búsqueda de texto, controles más precisos del ciclo de vida de los datos y los modelos, y más controles por parte del operador. Milvus 3.0 es el núcleo central de Zilliz Lakebase, impulsando su servicio unificado, descubrimiento y procesamiento por lotes.</p>
<p>Ve el vídeo a continuación para obtener más información sobre Milvus 3.0 y la sesión de preguntas y respuestas con los principales mantenedores:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Colección externa</h4><p>En los flujos de datos típicos de IA, terabytes de incrustaciones y metadatos ya se encuentran en el almacenamiento de objetos como tablas Parquet, Lance o Iceberg. Copiar esos datos a Milvus duplica el coste de almacenamiento, añade un flujo de trabajo ETL que debe mantenerse sincronizado y aleja la gobernanza de los datos del cliente.</p>
<p>La colección externa elimina la copia. Una colección de Milvus puede hacer referencia a los archivos allí donde ya se encuentran, y Milvus gestiona únicamente el esquema, los índices y la ejecución de consultas. Una actualización incremental mantiene la colección alineada con los archivos subyacentes. Los clientes cuyos datos no pueden salir del lago, como los equipos de finanzas y de atención sanitaria, pueden ejecutar la recuperación de vectores sobre esos datos allí donde se encuentran. Un único conjunto de datos residente en el lago también puede servirse desde varias instancias de Milvus a la vez.</p>
<p>Para obtener más información, consulte <a href="/docs/es/create-an-external-collection.md">Crear una colección externa</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantánea</h4><p>La entrega y el descubrimiento por lotes a menudo necesitan la misma colección al mismo tiempo. La evaluación de modelos A/B, la deduplicación a gran escala, la validación de rellenado y la reversión de versiones requieren una vista estable de la colección mientras siguen produciéndose escrituras.</p>
<p>Snapshot crea una vista de solo lectura de una colección en un momento determinado haciendo referencia a segmentos existentes en lugar de copiar datos, por lo que el coste marginal de almacenamiento es casi nulo. Los trabajos por lotes pueden leer desde el Snapshot bajo aislamiento de tipo MVCC mientras la colección activa sigue aceptando escrituras.</p>
<p>Para obtener más información, consulte <a href="/docs/es/snapshots.md">Instantáneas</a>, <a href="/docs/es/manage-snapshots.md">Gestionar instantáneas</a> y <a href="/docs/es/snapshot-use-cases.md">Casos de uso de instantáneas</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Ordenar por en consultas y búsquedas</h4><p>La búsqueda y la consulta ahora admiten la ordenación por varios campos, con la ordenación trasladada al núcleo de Milvus y la configuración de « <code translate="no">ASC</code> » y « <code translate="no">DESC</code> » por campo. Esto resuelve una deficiencia común en producción: el Top-K basado únicamente en la distancia a menudo no se ajusta a las necesidades empresariales cuando el elemento más similar no es el más barato, el más reciente o el más popular.</p>
<p>Las aplicaciones ya no tienen que recuperar resultados en exceso y volver a ordenarlos en el cliente para expresar una clasificación compuesta.</p>
<p>Para obtener más información, consulte <a href="/docs/es/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordenar resultados de búsqueda por campos escalares</a> y <a href="/docs/es/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordenar resultados de consulta</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregación de consultas</h4><p>La generación de estadísticas de distribución de inquilinos, recuentos de integridad de campos o el progreso del lanzamiento de versiones a partir de una colección de Milvus solía requerir la recuperación de las entidades coincidentes en el cliente y su agregación allí. Milvus 3.0 incorpora la agregación escalar de estilo SQL en el núcleo. Una llamada de consulta acepta expresiones de agregación de tipo « <code translate="no">group_by_fields</code> » y « <code translate="no">output_fields</code> », incluyendo « <code translate="no">count(*)</code> », « <code translate="no">count(&lt;field&gt;)</code> », « <code translate="no">sum(&lt;field&gt;)</code> », « <code translate="no">avg(&lt;field&gt;)</code> », « <code translate="no">min(&lt;field&gt;)</code> » y « <code translate="no">max(&lt;field&gt;)</code> ». La agregación se evalúa en el lado del servidor tras el filtrado.</p>
<p>Para obtener más información, consulte <a href="/docs/es/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Resultados</a> de <a href="/docs/es/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">consultas agregadas</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vector nulo</h4><p>Las incrustaciones suelen generarse de forma asíncrona, por lo que una entidad puede llegar antes que su vector. Los datos multimodales también tienen lagunas naturales, como un vídeo sin subtítulos o un producto sin imagen. Las versiones anteriores no ofrecían una solución adecuada: las aplicaciones retrasaban la escritura hasta que el vector estuviera listo o rellenaban un vector marcador de posición, y ambas opciones perjudicaban la calidad de la recuperación.</p>
<p>Milvus 3.0 admite el valor NULL en los campos vectoriales de los seis tipos de vectores. La búsqueda omite automáticamente los vectores NULL, la calidad de la recuperación no se ve afectada y los vectores NULL prácticamente no ocupan espacio de almacenamiento. La función « <code translate="no">AddField</code> » también se extiende a los campos vectoriales con este cambio: con « <code translate="no">nullable=True</code> », una colección existente puede añadir nuevos campos vectoriales en línea sin necesidad de reconstruirla.</p>
<p>Para obtener más información, consulte <a href="/docs/es/nullable-and-default.md">Campos nulos</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Diccionario personalizado y diccionario de sinónimos</h4><p>Los tokenizadores predeterminados no siempre cumplen los requisitos de calidad de búsqueda en producción. El chino, los dominios verticales como la medicina, el derecho y la química, y los corpus multilingües pueden beneficiarse sustancialmente de los diccionarios personalizados y las tablas de sinónimos. Hasta ahora, estos recursos existían principalmente como reescrituras de consultas del lado de la aplicación.</p>
<p>Milvus 3.0 añade un mecanismo FileResource para registrar diccionarios de tokenizadores personalizados, listas de sinónimos, listas de palabras vacías y reglas de descomposición de compuestos. Una vez registrado, se puede hacer referencia a un recurso desde cualquier tokenizador o filtro y surte efecto en BM25, los analizadores y Text Match. Ahora los diccionarios y los sinónimos se pueden versionar y gestionar de forma centralizada, en lugar de estar dispersos por el código de la aplicación.</p>
<p>Para obtener más información, consulte <a href="/docs/es/manage-file-resources.md">Gestionar recursos</a> de <a href="/docs/es/manage-file-resources.md">archivo</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidad</h4><p>El TTL a nivel de colección y de partición es demasiado general para muchos escenarios de ciclo de vida y cumplimiento normativo. Los diferentes inquilinos dentro de la misma colección suelen tener reglas de retención diferentes, y es posible que las entidades individuales deban caducar según un calendario que no coincida con el resto de la colección.</p>
<p>Milvus 3.0 admite el TTL por entidad. Declare un campo « <code translate="no">TIMESTAMPTZ</code> » en el esquema, márquelo como campo TTL a través de una propiedad de la colección y Milvus recuperará automáticamente las entidades caducadas. Esto cubre las solicitudes del derecho al olvido, los datos de sesión caducados y el historial de conversaciones delimitado sin necesidad de limpieza por parte de la aplicación.</p>
<p>Para obtener más información, consulte <a href="/docs/es/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Establecer el TTL a nivel de entidad</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 añadió el índice « <code translate="no">MINHASH_LSH</code> » para la detección de casi duplicados basada en conjuntos, pero las aplicaciones aún tenían que calcular las firmas MinHash antes de escribir datos en Milvus.</p>
<p>Milvus 3.0 añade una función MinHash del lado del servidor. Declare un campo de entrada « <code translate="no">VARCHAR</code> » y un campo de salida « <code translate="no">BINARY_VECTOR</code> » en el esquema, asigne una función « <code translate="no">FunctionType.MINHASH</code> », y Milvus calculará las firmas durante la inserción, la inserción masiva y la búsqueda. Junto con « <code translate="no">MINHASH_LSH</code> », esto admite flujos de trabajo de deduplicación para grandes conjuntos de datos, huellas digitales y detección de plagio dentro de Milvus.</p>
<p>Para obtener más información, consulte <a href="/docs/es/minhash-function.md">Función MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>La suposición de «una entidad = un vector» ya no se ajusta a la recuperación moderna. Los documentos largos se dividen en muchos fragmentos, los modelos de interacción tardía como ColBERT emiten un vector por token, y las entidades multimodales pueden tener varias vistas.</p>
<p>EmbList almacena una lista de vectores de longitud variable por entidad, con <code translate="no">DISKANN</code> como índice en disco. La ruta de disco mantiene bajo control el uso de RAM cuando el corpus excede los límites de memoria. EmbList + <code translate="no">DISKANN</code> es la primera variante de la familia más amplia de StructList en esta RC. El resto de la familia, incluyendo el filtrado de StructList y la aceleración multivectorial de Muvera / Lemur, está previsto para la versión oficial 3.0.</p>
<p>Para obtener más información, consulte <a href="/docs/es/search-with-embedding-lists.md">Búsqueda con listas</a> de <a href="/docs/es/search-with-embedding-lists.md">incrustación</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Fusionar a la fuerza</h4><p>Las cargas de trabajo de producción acumulan fragmentación de segmentos con el tiempo, lo que provoca fluctuaciones en la latencia de las consultas y un aumento del almacenamiento.</p>
<p>Milvus 3.0 añade la capacidad de activar la compactación de segmentos de forma explícita durante las ventanas de menor actividad, tanto en modo síncrono como asíncrono.</p>
<p>Para obtener más información, consulte <a href="/docs/es/force-merge.md">Compactación</a> de <a href="/docs/es/force-merge.md">fusión forzada</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Almacenamiento V3</h4><p>Milvus 3.0 introduce Almacenamiento V3, un motor de almacenamiento columnar basado en manifiestos en el que los datos y los metadatos residen en un almacenamiento de objetos compatible con S3. Cada versión del conjunto de datos se captura como una instantánea de manifiesto inmutable, un archivo codificado en Avro que registra qué grupos de columnas, registros delta y estadísticas componen el conjunto de datos.</p>
<p>Los manifiestos son archivos Avro compactos, y los registros delta registran las eliminaciones a nivel de entidad sin reescribir los archivos de datos. Esto mantiene baja la sobrecarga de metadatos a medida que crecen los conjuntos de datos. El manifiesto también desacopla el seguimiento de metadatos de la ruta de consulta, lo que permite que una colección gestione más segmentos sin degradar el rendimiento de las consultas.</p>
<p>Dado que los estados se almacenan en el almacenamiento de objetos, el conjunto de datos es autodescriptivo: cualquier lector con acceso a la ruta de almacenamiento puede descubrirlo e interpretarlo sin necesidad de un catálogo central. Esta propiedad sustenta las integraciones de External Collection, Snapshot y futuros lagos de datos.</p>
