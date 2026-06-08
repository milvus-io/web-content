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
    </button></h1><p>Descubra las novedades de Milvus. Esta página resume las nuevas funciones, mejoras, problemas conocidos y correcciones de errores de cada versión. Le sugerimos que visite regularmente esta página para enterarse de las actualizaciones.</p>
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
<p>Milvus 3.0-beta amplía la base de datos vectorial Milvus con una nueva integración en el ecosistema de lago abierto: External Collection permite a Milvus consultar tablas externas del lago sin copia, y Spark puede leer las colecciones de Milvus directamente a través de Snapshot. La versión también aporta una recuperación más rica, un esquema más expresivo, una mayor personalización de la búsqueda de texto, controles más precisos del ciclo de vida de los datos y los modelos, y más controles del lado del operador. Milvus 3.0 es el núcleo de Zilliz Lakebase, que impulsa su servicio, descubrimiento y procesamiento por lotes unificados.</p>
<p>Haga clic a continuación para unirse a nuestro seminario web para obtener más detalles sobre Milvus 3.0 y AMA con los mantenedores del núcleo:</p>
<p><a href="https://zilliz.com/event/whats-new-in-milvus-3-0-beta">
  
   <span class="img-wrapper"> <img translate="no" src="https://assets.zilliz.com/webinar_3_0_4746da7c2d.png" alt="Webinar 3.0 walkthrough" class="doc-image" id="webinar-3.0-walkthrough" />
 </span>  <span class="img-wrapper"> <span>Webinar 3.0 walkthrough</span> </span></a></p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Recopilación externa</h4><p>En los conductos de datos de IA típicos, los terabytes de incrustaciones y metadatos ya se encuentran en el almacenamiento de objetos como tablas Parquet, Lance o Iceberg. Copiar esos datos en Milvus duplica el coste de almacenamiento, añade una canalización ETL que tiene que mantenerse sincronizada y desplaza el control de los datos fuera del cliente.</p>
<p>External Collection elimina la copia. Una colección de Milvus puede hacer referencia a archivos donde ya se encuentran, y Milvus sólo gestiona el esquema, los índices y la ejecución de consultas. Una actualización incremental mantiene la colección alineada con los archivos subyacentes. Los clientes cuyos datos no pueden salir del lago, como los equipos financieros y sanitarios, pueden ejecutar la recuperación vectorial de esos datos allí donde se encuentran. Un único conjunto de datos residente en el lago también se puede servir desde varias instancias de Milvus a la vez.</p>
<p>Para obtener más información, consulte <a href="/docs/es/create-an-external-collection.md">Crear una colección externa</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantánea</h4><p>El servicio y el descubrimiento por lotes a menudo necesitan la misma colección al mismo tiempo. La evaluación de modelos A/B, la deduplicación a gran escala, la validación de backfill y la reversión de versiones necesitan una vista estable de la colección mientras las escrituras siguen entrando.</p>
<p>La instantánea crea una vista puntual de sólo lectura de una colección haciendo referencia a los segmentos existentes en lugar de copiar los datos, por lo que el coste marginal de almacenamiento es casi nulo. Los trabajos por lotes pueden leer desde la instantánea con un aislamiento de tipo MVCC mientras la colección activa sigue aceptando escrituras.</p>
<p>Para obtener más información, consulte <a href="/docs/es/snapshots.md">Instantáneas</a>, <a href="/docs/es/manage-snapshots.md">Gestionar instantáneas</a> y <a href="/docs/es/snapshot-use-cases.md">Casos de uso de instantáneas</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Consulta / Búsqueda Ordenar por</h4><p>La búsqueda y la consulta ahora aceptan el ordenamiento por campos múltiples, con el ordenamiento empujado hacia abajo en el núcleo de Milvus y <code translate="no">ASC</code> / <code translate="no">DESC</code> configurable por campo. Esto cierra una brecha de producción común: El orden superior por distancia no suele satisfacer las necesidades de la empresa cuando el artículo más similar no es el más barato, el más reciente o el más popular.</p>
<p>Las aplicaciones ya no tienen que sobrecargar los resultados y reordenarlos en el cliente para expresar una clasificación compuesta.</p>
<p>Para obtener más información, consulte <a href="/docs/es/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordenar resultados de búsqueda por campos escalares</a> y <a href="/docs/es/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordenar resultados de consulta</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregación de consultas</h4><p>Producir estadísticas de distribución de inquilinos, recuentos de campos completos o progreso de versiones de una colección Milvus solía requerir extraer entidades coincidentes de vuelta al cliente y agregarlas allí. Milvus 3.0 introduce la agregación escalar de estilo SQL en el núcleo. Una llamada de consulta acepta <code translate="no">group_by_fields</code> y expresiones de agregación en <code translate="no">output_fields</code>, incluyendo <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code>, y <code translate="no">max(&lt;field&gt;)</code>. La agregación se evalúa en el servidor después del filtrado.</p>
<p>Para obtener más información, consulte <a href="/docs/es/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Agregar resultados de consulta</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vector nulo</h4><p>Las incrustaciones se producen a menudo de forma asíncrona, por lo que una entidad puede llegar antes que su vector. Los datos multimodales también tienen lagunas naturales, como un vídeo sin subtítulos o un producto sin imagen. Las versiones anteriores no tenían una buena respuesta: las aplicaciones retrasaban la escritura hasta que el vector estaba listo o rellenaban un vector de reserva, y ambas opciones perjudicaban la calidad de la recuperación.</p>
<p>Milvus 3.0 admite NULL en los campos vectoriales de los seis tipos de vectores. La búsqueda omite automáticamente los vectores NULL, la calidad de la recuperación no se ve afectada y los vectores NULL no ocupan espacio de almacenamiento. <code translate="no">AddField</code> también se extiende a los campos vectoriales con este cambio: con <code translate="no">nullable=True</code>, una colección existente puede crear nuevos campos vectoriales en línea sin necesidad de reconstruirla.</p>
<p>Para obtener más información, consulte <a href="/docs/es/nullable-and-default.md">Campos anulables</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Diccionario personalizado y diccionario de sinónimos</h4><p>Los tokenizadores preconfigurados no siempre cumplen los requisitos de calidad de las búsquedas de producción. Los diccionarios personalizados y las tablas de sinónimos pueden ser muy útiles en chino, en ámbitos verticales como la medicina, el derecho o la química, y en corpus multilingües. Hasta ahora, estos recursos se utilizaban sobre todo para reescribir las consultas del lado de la aplicación.</p>
<p>Milvus 3.0 añade un mecanismo FileResource para registrar diccionarios tokenizadores personalizados, listas de sinónimos, listas de palabras clave y reglas de descomposición. Una vez registrado, un recurso puede ser referenciado desde cualquier tokenizador o filtro y tiene efecto en BM25, analizadores y Text Match. Ahora, los diccionarios y sinónimos pueden versionarse y gestionarse de forma centralizada, en lugar de estar dispersos por el código de la aplicación.</p>
<p>Para obtener más información, consulte <a href="/docs/es/manage-file-resources.md">Gestión de recursos de archivos</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidad</h4><p>El TTL a nivel de colección y a nivel de partición es demasiado tosco para muchos escenarios de ciclo de vida y cumplimiento. Los diferentes inquilinos dentro de la misma colección a menudo tienen diferentes reglas de retención, y las entidades individuales pueden necesitar expirar en un horario que no coincida con el resto de la colección.</p>
<p>Milvus 3.0 admite TTL por entidad. Declare un campo <code translate="no">TIMESTAMPTZ</code> en el esquema, márquelo como campo TTL a través de una propiedad de la colección y Milvus recuperará automáticamente las entidades caducadas. Esto cubre las solicitudes de derecho al olvido, los datos de sesión que caducan y el historial de conversaciones limitado sin necesidad de limpieza del lado de la aplicación.</p>
<p>Para más información, consulte <a href="/docs/es/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Establecer TTL a nivel de entidad</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 añadió el índice <code translate="no">MINHASH_LSH</code> para la detección de casi duplicados basada en conjuntos, pero las aplicaciones todavía tenían que calcular las firmas MinHash antes de escribir datos en Milvus.</p>
<p>Milvus 3.0 añade una función MinHash en el servidor. Declare un campo de entrada <code translate="no">VARCHAR</code> y un campo de salida <code translate="no">BINARY_VECTOR</code> en el esquema, adjunte una función <code translate="no">FunctionType.MINHASH</code> y Milvus calculará las firmas durante la inserción, la inserción masiva y la búsqueda. Junto con <code translate="no">MINHASH_LSH</code>, esto soporta flujos de trabajo de deduplicación para grandes conjuntos de datos, huellas digitales y detección de plagio dentro de Milvus.</p>
<p>Para más información, consulte <a href="/docs/es/minhash-function.md">Función MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>El supuesto "una entidad = un vector" ya no se ajusta a la recuperación moderna. Los documentos largos se dividen en muchos trozos, los modelos de interacción tardía como ColBERT emiten un vector por token, y las entidades multimodales pueden contener varias vistas.</p>
<p>EmbList almacena una lista de vectores de longitud variable por entidad, con <code translate="no">DISKANN</code> como índice en disco. La ruta en disco mantiene bajo control el uso de RAM cuando el corpus supera los presupuestos de memoria. EmbList + <code translate="no">DISKANN</code> es la primera variante de la familia más amplia StructList en esta RC. El resto de la familia, incluido el filtrado StructList y la aceleración multivectorial Muvera / Lemur, está previsto para la versión oficial 3.0.</p>
<p>Para más información, consulte <a href="/docs/es/search-with-embedding-lists.md">Búsqueda con listas de incrustación</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Fusión forzada</h4><p>Las cargas de trabajo de producción acumulan fragmentación de segmentos con el tiempo, lo que provoca fluctuaciones en la latencia de las consultas y un almacenamiento inflado.</p>
<p>Milvus 3.0 añade la capacidad de activar la compactación de segmentos explícitamente durante las ventanas fuera de pico, tanto en modo síncrono como asíncrono.</p>
<p>Para obtener más información, consulte <a href="/docs/es/force-merge.md">Forzar la compactación combinada</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Almacenamiento V3</h4><p>Milvus 3.0 introduce Storage V3, un motor de almacenamiento columnar basado en manifiestos en el que los datos y metadatos viven en un almacenamiento de objetos compatible con S3. Cada versión del conjunto de datos se captura como una instantánea de manifiesto inmutable, un archivo codificado en Avro que registra qué grupos de columnas, registros delta y estadísticas componen el conjunto de datos.</p>
<p>Los manifiestos son archivos Avro compactos, y los registros delta registran las eliminaciones a nivel de entidad sin reescribir los archivos de datos. De este modo, la sobrecarga de metadatos se mantiene reducida a medida que crecen los conjuntos de datos. El manifiesto también desvincula el seguimiento de metadatos de la ruta de consulta, lo que permite a Collection gestionar más segmentos sin degradar el rendimiento de la consulta.</p>
<p>Dado que los estados se almacenan en el almacenamiento de objetos, el conjunto de datos es autodescriptivo: cualquier lector con acceso a la ruta de almacenamiento puede descubrirlo e interpretarlo sin necesidad de un catálogo central. Esta propiedad sustenta las integraciones de External Collection, Snapshot y futuros lagos.</p>
