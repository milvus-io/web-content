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
<p>El almacenamiento V3 está desactivado de forma predeterminada. Una vez que la opción « <code translate="no">common.storage.useLoonFFI</code> » (Habilitar almacenamiento V3) surta efecto, las nuevas escrituras y los resultados de la compactación utilizarán el almacenamiento V3. Los datos existentes permanecen en su estructura actual hasta que los datos elegibles sean reescritos mediante la compactación en segundo plano. Milvus puede leer ambas estructuras durante esta transición. Habilita el almacenamiento V3 para utilizar las funciones que dependen de él, más que como una optimización general del rendimiento.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Funcionalidades que requieren Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><td><a href="/docs/es/text.md"><code translate="no">TEXT</code> campo</a></td><td>Almacenar texto de origen extenso, como pasajes, documentos, tickets o registros, sin establecer una longitud máxima fija en el esquema de la colección.</td><td><a href="/docs/es/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
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
