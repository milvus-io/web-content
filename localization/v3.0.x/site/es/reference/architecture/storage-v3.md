---
id: storage-v3.md
title: Almacenamiento V3Compatible with Milvus 3.0.x
summary: >-
  Descubre qué funciones de Milvus 3.0 requieren Storage V3, cómo activarlo y
  qué limitaciones de compatibilidad se aplican.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Almacenamiento V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Los conjuntos de datos de IA suelen evolucionar una vez creada la colección. A medida que cambian los modelos y los flujos de trabajo, es posible que los equipos necesiten añadir texto, generar nuevos campos vectoriales para entidades existentes o utilizar datos almacenados fuera de Milvus. Para dar soporte a estos flujos de trabajo se requiere un modelo de almacenamiento capaz de evolucionar junto con el conjunto de datos.</p>
<p>El almacenamiento V3 proporciona este modelo en Milvus 3.0. Utiliza una estructura de almacenamiento con versiones para incorporar los datos añadidos o reescritos a lo largo del tiempo, mientras que las aplicaciones siguen accediendo a las colecciones a través de las mismas API de Milvus.</p>
<p>El almacenamiento V3 está desactivado por defecto. Una vez que la opción « <code translate="no">common.storage.useLoonFFI</code> » (Habilitar almacenamiento V3) surta efecto, las nuevas escrituras y los resultados de la compactación utilizarán el almacenamiento V3. Los datos existentes permanecen en su estructura actual hasta que los datos elegibles sean reescritos mediante la compactación en segundo plano. Milvus puede leer ambas estructuras durante esta transición. Habilita el almacenamiento V3 para utilizar las funciones que dependen de él, más que como una optimización general del rendimiento.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Formatos de datos en Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 utiliza manifiestos para describir los datos de las colecciones independientemente del formato de datos subyacente. Esto permite que la misma capa de almacenamiento funcione tanto con los datos gestionados por Milvus como con los datos que permanecen en un sistema externo.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Formatos de archivo de las colecciones gestionadas<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>En el caso de las colecciones gestionadas, la opción « <code translate="no">dataNode.storage.format</code> » selecciona el formato de archivo para los nuevos datos de Storage V3. La configuración admite los siguientes valores:</p>
<table>
<thead>
<tr><th>Formato</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>El formato de archivo columnar predeterminado y ampliamente adoptado, con una amplia compatibilidad con el ecosistema y herramientas consolidadas. Parquet organiza los datos en grupos de filas y admite la codificación y compresión por columna, lo que permite a Milvus leer solo las columnas necesarias y procesar de forma eficiente grandes escaneos secuenciales.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Un formato de archivo columnar opcional de última generación, basado en codificaciones extensibles y combinables, y en estadísticas avanzadas. En Milvus, Vortex admite la proyección de columnas, las lecturas por rango y las lecturas de acceso aleatorio. Estas capacidades pueden reducir las lecturas de datos innecesarias en cargas de trabajo adecuadas.</td></tr>
</tbody>
</table>
<p>Cambiar <code translate="no">dataNode.storage.format</code> afecta a las nuevas escrituras en Storage V3. Los archivos existentes conservan su formato actual hasta que la compactación reescriba los segmentos correspondientes. La mayoría de las implementaciones deberían mantener el formato predeterminado <code translate="no">parquet</code>, a menos que pruebas de rendimiento representativas demuestren que <code translate="no">vortex</code> se adapta mejor a sus datos y patrones de acceso.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">Colecciones externas y formatos de origen compatibles<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Las colecciones externas permiten a Milvus utilizar datos almacenados en archivos o tablas externos. Storage V3 admite los siguientes formatos de origen externos:</p>
<table>
<thead>
<tr><th>Formato</th><th>Categoría</th><th>Fuente prevista</th><th>Compatibilidad con Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Formato de archivo</td><td>Un directorio o prefijo de almacenamiento de objetos que contenga archivos Parquet.</td><td>Detecta los archivos, lee sus metadatos y grupos de filas, y los registra en un manifiesto de Storage V3.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Formato de archivo</td><td>Un directorio o prefijo de almacenamiento de objetos que contenga archivos Vortex.</td><td>Detecta los archivos y utiliza el diseño y las estadísticas de Vortex para la proyección, las lecturas por rango y las lecturas de acceso aleatorio.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Formato de tabla</td><td>Un directorio de conjuntos de datos de Lance.</td><td>Lee los metadatos del conjunto de datos y asigna sus fragmentos a un manifiesto de Storage V3.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Formato de tabla</td><td>Un archivo JSON de metadatos de Iceberg y un ID de instantánea.</td><td>Resuelve la instantánea especificada, planifica sus archivos de datos y conserva los metadatos de eliminación por posición. Las eliminaciones por igualdad no son compatibles y deben convertirse en eliminaciones por posición antes de que se actualice la colección externa.</td></tr>
</tbody>
</table>
<p>Las fuentes externas son de solo lectura. Storage V3 crea y actualiza su propio manifiesto sin modificar ni copiar los datos de origen. A continuación, Milvus puede crear índices y realizar búsquedas y consultas sobre los datos a través de una colección externa.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Almacenamiento en la nube y autenticación entre cuentas</h4><p>La siguiente tabla describe únicamente cómo una colección externa accede a los datos de origen almacenados en otra cuenta en la nube. No describe el almacenamiento de objetos utilizado para los datos gestionados por Milvus.</p>
<table>
<thead>
<tr><th>Almacenamiento en la nube</th><th>Formatos externos compatibles</th><th>Autenticación entre cuentas para colecciones externas</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>Los cuatro formatos enumerados anteriormente.</td><td>Especifica el ARN del rol de IAM propiedad del cliente. Storage V3 utiliza el servicio de gestión de identidades y accesos de AWS (AWS STS) <code translate="no">AssumeRole</code> para obtener credenciales temporales y actualizarlas según sea necesario. También puedes proporcionar un identificador externo cuando así lo exija la política de confianza del rol.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Los cuatro formatos indicados anteriormente.</td><td>Especifica la cuenta de servicio de destino. Storage V3 se hace pasar por esa cuenta de servicio, utiliza sus tokens de acceso OAuth de corta duración para acceder al bucket de origen y actualiza los tokens antes de que caduquen.</td></tr>
<tr><td>Almacenamiento de blobs de Azure</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code> y <code translate="no">lance-table</code>. No se admite <code translate="no">iceberg-table</code>.</td><td>Milvus solicita credenciales SAS de corta duración a través del servicio gRPC privado de <code translate="no">milvus-tools</code>. Storage V3 utiliza las credenciales SAS para acceder al contenedor de origen, y las credenciales se renuevan antes de que caduquen.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>Los cuatro formatos mencionados anteriormente.</td><td>Milvus solicita credenciales SAS de corta duración a través del servicio gRPC privado <code translate="no">milvus-tools</code>. Storage V3 utiliza las credenciales SAS para acceder al contenedor de origen, y las credenciales se renuevan antes de que caduquen.</td></tr>
<tr><td>Servicio de almacenamiento de objetos de Alibaba Cloud (OSS)</td><td>Los cuatro formatos mencionados anteriormente.</td><td>Especifica el ARN del rol RAM propiedad del cliente. Storage V3 asume el rol utilizando la identidad de carga de trabajo del entorno de ejecución o el rol RAM de ECS, y a continuación utiliza credenciales temporales para acceder al bucket de origen.</td></tr>
</tbody>
</table>
<p>Para obtener información sobre la configuración de la recopilación externa y las instrucciones de uso, consulta <a href="/docs/es/create-an-external-collection.md">Crear una recopilación externa</a>.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Funciones que requieren Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Funcionalidad</th><th>Descripción</th><th>Configuración necesaria</th></tr>
</thead>
<tbody>
<tr><td>Formato de archivo Vortex</td><td>Escribir nuevos datos de colecciones gestionadas en el formato de archivo Vortex.</td><td><ul><li><a href="/docs/es/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/es/text.md"><code translate="no">TEXT</code> campo</a></td><td>Almacena texto de origen extenso, como pasajes, documentos, tickets o registros, sin establecer una longitud máxima fija en el esquema de la colección.</td><td><a href="/docs/es/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/es/add-fields-to-an-existing-collection.md">Campos vectoriales generados por funciones</a></td><td>Añade una función BM25 o MinHash a una colección existente para que Milvus genere un nuevo campo vectorial a partir de un campo « <code translate="no">VARCHAR</code> » ya existente. Milvus rellena los valores generados para las entidades existentes de forma asíncrona mediante la compactación en segundo plano.</td><td><ul><li><a href="/docs/es/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/es/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/es/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/es/create-an-external-collection.md">Colecciones externas</a></td><td>Consulta datos almacenados fuera de Milvus sin copiarlos en una colección gestionada. Actualiza la colección externa cuando cambien los datos de origen. Para exponer campos de origen adicionales, consulta <a href="/docs/es/alter-external-collection-schema.md">«Modificar el esquema de una colección externa</a>».</td><td><a href="/docs/es/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Antes de habilitar Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Una vez que Milvus escribe datos en Storage V3, no se admite la vuelta a una versión de Milvus que no pueda leer Storage V3. Desactivar Storage V3 posteriormente no convierte de forma inmediata todos los datos existentes de Storage V3 ni restaura la compatibilidad con la versión anterior.</p>
</div>
<p>Antes de habilitar Storage V3, tenga en cuenta el siguiente comportamiento de los datos:</p>
<ul>
<li>Dado que la compactación en segundo plano ( <code translate="no">dataCoord.compaction.storageVersion.enabled</code> ) está habilitada de forma predeterminada, los datos existentes que cumplan los requisitos pueden pasar a Storage V3 de forma gradual mediante dicha compactación.</li>
<li>Desactivar Storage V3 cambia la versión de almacenamiento de destino para futuras escrituras y para los resultados de compactación que cumplan los requisitos. No convierte de forma sincrónica todos los datos existentes de Storage V3 ni garantiza que la actualización a una versión anterior sea segura.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Habilitar Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Establece « <code translate="no">common.storage.useLoonFFI</code> » en « <code translate="no">true</code> » en tu configuración de Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus considera que este ajuste se puede actualizar. Aplica el cambio mediante el flujo de trabajo de actualización de la configuración compatible con tu implementación. La mera edición de un archivo de configuración estático no garantiza que la implementación en ejecución haya recibido el nuevo valor.</p>
<p>Si tiene previsto añadir una función y su campo vectorial generado a una colección existente, active también los dos ajustes de compactación necesarios para la retroalimentación de datos existentes:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>La salida de la función para las entidades existentes se genera de forma asíncrona mediante la compactación en segundo plano. Una actualización correcta del esquema no indica que el rellenado se haya completado para todas las entidades existentes.</p>
<h2 id="Related-documentation" class="common-anchor-header">Documentación relacionada<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/es/text.md">Campo de texto</a></li>
<li><a href="/docs/es/add-fields-to-an-existing-collection.md">Modificar el esquema de una colección</a></li>
<li><a href="/docs/es/create-an-external-collection.md">Crear una colección externa</a></li>
<li><a href="/docs/es/install-overview.md">Descripción general de las opciones de implementación de Milvus</a></li>
<li><a href="/docs/es/upgrade_milvus_standalone-helm.md">Actualizar Milvus independiente con Helm Chart</a></li>
<li><a href="/docs/es/upgrade_milvus_cluster-helm.md">Actualizar el clúster de Milvus con Helm Chart</a></li>
<li><a href="/docs/es/configure_common.md">Configuraciones relacionadas con «common»</a></li>
<li><a href="/docs/es/configure_datacoord.md">Configuraciones relacionadas con dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Por qué creamos Loon: un motor de almacenamiento para datos de IA que nunca deja de cambiar</a> — Antecedentes técnicos sobre las motivaciones de diseño que hay detrás de Storage V3.</li>
</ul>
