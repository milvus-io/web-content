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
<p>Milvus v3.0-beta marca el inicio de la transición de Milvus de una base de datos vectorial a un motor de lago de datos nativo semántico. El núcleo de Milvus ahora puede operar directamente sobre datos en formatos de lago de datos abiertos, y las capacidades principales de Milvus se han ampliado en lo que respecta a la recuperación, el esquema, el ciclo de vida, el lenguaje y las operaciones.</p>
<p>La recopilación externa y las instantáneas son las principales novedades en el ámbito del lago de datos. Este mismo núcleo también impulsa Zilliz Lakebase, una plataforma de datos nativa semántica basada en Milvus 3.0.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Recopilación externa</h4><p>En los flujos de datos típicos de IA, ya hay terabytes de representaciones y metadatos almacenados en el almacenamiento de objetos como tablas Parquet, Lance o Iceberg. Copiar esos datos a Milvus duplica el coste de almacenamiento, añade un flujo ETL que hay que mantener sincronizado y aleja la gobernanza de los datos del cliente.</p>
<p>La recopilación externa elimina la necesidad de copiar. Una recopilación de Milvus puede hacer referencia a los archivos allí donde ya se encuentran, y Milvus solo gestiona el esquema, los índices y la ejecución de consultas. Una actualización incremental mantiene la colección alineada con los archivos subyacentes. Los clientes cuyos datos no pueden salir del lago de datos, como los equipos de finanzas y sanidad, pueden realizar búsquedas vectoriales en esos datos allí donde se encuentran. Un único conjunto de datos residente en el lago de datos también puede servirse desde varias instancias de Milvus a la vez.</p>
<p>Para obtener más información, consulta <a href="/docs/es/create-an-external-collection.md">«Crear una colección externa</a>».</p>
<h4 id="Snapshot" class="common-anchor-header">Instantánea</h4><p>La entrega de datos y el descubrimiento por lotes suelen necesitar la misma colección al mismo tiempo. La evaluación de modelos A/B, la deduplicación a gran escala, la validación de datos retrospectivos y la reversión de versiones requieren una vista estable de la colección mientras siguen produciéndose escrituras.</p>
<p>La instantánea crea una vista de solo lectura de una colección en un momento determinado haciendo referencia a segmentos existentes en lugar de copiar datos, por lo que el coste marginal de almacenamiento es prácticamente nulo. Los trabajos por lotes pueden leer desde la instantánea bajo aislamiento de tipo MVCC mientras la colección activa sigue aceptando escrituras.</p>
<p>Para obtener más información, consulta <a href="/docs/es/snapshots.md">«Instantáneas</a>», <a href="/docs/es/manage-snapshots.md">«Gestión de instantáneas</a>» y <a href="/docs/es/snapshot-use-cases.md">«Casos de uso de instantáneas</a>».</p>
<h4 id="External-Backfill" class="common-anchor-header">Relleno externo</h4><p>Actualizar un modelo de incrustación, como pasar de incrustaciones v1 a v2 en una colección existente, solía implicar reconstruir todo desde cero. Esto obligaba a interrumpir el servicio o a implementar una lógica de doble escritura en la aplicación.</p>
<p>Milvus 3.0 admite la actualización como un flujo de trabajo en caliente. Se puede añadir un nuevo campo vectorial con ` <code translate="no">AddCollectionField</code>`, utilizar una instantánea para congelar un punto de partida coherente, ejecutar el trabajo de incrustación sin conexión sobre la instantánea y volver a escribir los valores a través de las rutas de ingestión normales. Una vez que el nuevo campo se haya indexado en línea, la aplicación puede realizar la transición sin tiempo de inactividad.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Ordenación en consultas y búsquedas</h4><p>Las funciones de búsqueda y consulta admiten ahora la ordenación por varios campos, con la ordenación trasladada al núcleo de Milvus y la posibilidad de configurar « <code translate="no">ASC</code> » y « <code translate="no">DESC</code> » por cada campo. Esto resuelve una deficiencia habitual en producción: la ordenación «Top-K» basada únicamente en la distancia a menudo no se ajusta a las necesidades empresariales cuando el elemento más similar no es el más barato, el más reciente ni el más popular.</p>
<p>Las aplicaciones ya no tienen que recuperar resultados de más y volver a ordenarlos en el cliente para expresar una clasificación compuesta.</p>
<p>Para obtener más información, consulta <a href="/docs/es/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«Ordenar resultados de búsqueda por campos escalares</a> » y <a href="/docs/es/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">«Ordenar resultados de consulta</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vector nulo</h4><p>Las representaciones vectoriales suelen generarse de forma asíncrona, por lo que una entidad puede llegar antes que su vector. Los datos multimodales también presentan lagunas naturales, como un vídeo sin subtítulos o un producto sin imagen. Las versiones anteriores no ofrecían una solución adecuada: las aplicaciones o bien retrasaban la escritura hasta que el vector estuviera listo, o bien introducían un vector provisional, y ambas opciones perjudicaban la calidad de la recuperación.</p>
<p>Milvus 3.0 admite el valor NULL en los campos vectoriales de los seis tipos de vectores. La búsqueda omite automáticamente los vectores NULL, la calidad de la recuperación no se ve afectada y los vectores NULL prácticamente no ocupan espacio de almacenamiento. El « <code translate="no">AddField</code> » también se extiende a los campos vectoriales con este cambio: con « <code translate="no">nullable=True</code> », una colección existente puede ampliar sus campos vectoriales en línea sin necesidad de reconstruirla.</p>
<p>Para obtener más información, consulta <a href="/docs/es/nullable-and-default.md">«Campos nulos</a>».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Diccionario personalizado y diccionario de sinónimos</h4><p>Los tokenizadores predeterminados no siempre cumplen los requisitos de calidad de búsqueda en producción. El chino, los ámbitos verticales como la medicina, el derecho y la química, y los corpus multilingües pueden beneficiarse sustancialmente de los diccionarios personalizados y las tablas de sinónimos. Hasta ahora, estos recursos se gestionaban principalmente mediante reescrituras de consultas en el lado de la aplicación.</p>
<p>Milvus 3.0 incorpora un mecanismo FileResource para registrar diccionarios personalizados de tokenizadores, listas de sinónimos, listas de palabras vacías y reglas de descomposición de compuestos. Una vez registrado, se puede hacer referencia a un recurso desde cualquier tokenizador o filtro, y surte efecto en BM25, los analizadores y Text Match. Ahora es posible versionar y gestionar de forma centralizada los diccionarios y sinónimos, en lugar de tenerlos dispersos por el código de la aplicación.</p>
<p>Para obtener más información, consulta <a href="/docs/es/manage-file-resources.md">«Gestionar recursos de archivo</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidades</h4><p>El TTL a nivel de colección y de partición resulta demasiado general para muchos escenarios de ciclo de vida y cumplimiento normativo. Los distintos inquilinos dentro de una misma colección suelen tener reglas de retención diferentes, y es posible que las entidades individuales deban caducar según un calendario que no coincida con el del resto de la colección.</p>
<p>Milvus 3.0 admite el TTL por entidad. Basta con declarar un campo « <code translate="no">TIMESTAMPTZ</code> » en el esquema, marcarlo como campo de TTL mediante una propiedad de la colección, y Milvus recuperará automáticamente las entidades caducadas. Esto cubre las solicitudes de «derecho al olvido», la caducidad de los datos de sesión y el historial de conversaciones delimitado sin necesidad de limpieza por parte de la aplicación.</p>
<p>Para obtener más información, consulta <a href="/docs/es/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">«Establecer el TTL a nivel de entidad</a>».</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 añadió el índice « <code translate="no">MINHASH_LSH</code> » para la detección de casi duplicados basada en conjuntos, pero las aplicaciones aún tenían que calcular las firmas MinHash antes de escribir los datos en Milvus.</p>
<p>Milvus 3.0 añade una función MinHash del lado del servidor. Basta con declarar un campo de entrada « <code translate="no">VARCHAR</code> » y un campo de salida « <code translate="no">BINARY_VECTOR</code> » en el esquema, asociar una función « <code translate="no">FunctionType.MINHASH</code> », y Milvus calculará las firmas durante la inserción, la inserción masiva y la búsqueda. Junto con « <code translate="no">MINHASH_LSH</code> », esto permite flujos de trabajo de deduplicación para grandes conjuntos de datos, la creación de huellas digitales y la detección de plagio dentro de Milvus.</p>
<p>Para obtener más información, consulta la <a href="/docs/es/minhash-function.md">función MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>La suposición de «una entidad = un vector» ya no se ajusta a la recuperación moderna. Los documentos largos se dividen en muchos fragmentos, los modelos de interacción tardía como ColBERT emiten un vector por token y las entidades multimodales pueden tener varias vistas.</p>
<p>EmbList almacena una lista de vectores de longitud variable por entidad, con « <code translate="no">DISKANN</code> » como índice en disco. La ruta de disco mantiene bajo control el uso de la RAM cuando el corpus supera los límites de memoria. EmbList + « <code translate="no">DISKANN</code> » es la primera variante de la familia más amplia de StructList en esta versión RC. El resto de la familia, incluido el filtrado de StructList y la aceleración multivectorial de Muvera / Lemur, está previsto para la versión oficial 3.0.</p>
<p>Para obtener más información, consulta <a href="/docs/es/search-with-embedding-lists.md">«Búsqueda con listas</a> de <a href="/docs/es/search-with-embedding-lists.md">incrustación</a>».</p>
<h4 id="Force-Merge" class="common-anchor-header">Fusión forzada</h4><p>Las cargas de trabajo en producción acumulan fragmentación de segmentos con el tiempo, lo que provoca fluctuaciones en la latencia de las consultas y un aumento del almacenamiento.</p>
<p>Milvus 3.0 añade la capacidad de activar la compactación de segmentos de forma explícita durante las franjas horarias de menor actividad, tanto en modo síncrono como asíncrono.</p>
<p>Para obtener más información, consulta <a href="/docs/es/force-merge.md">«Compactación</a> de <a href="/docs/es/force-merge.md">fusión forzada</a>».</p>
