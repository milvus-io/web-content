---
id: mmap.md
summary: MMap permite más datos en un solo nodo.
title: Almacenamiento de datos habilitado para MMap
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">Almacenamiento de datos habilitado para MMap<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, los archivos mapeados en memoria permiten la asignación directa del contenido de los archivos a la memoria. Esta característica mejora la eficiencia de la memoria, particularmente en situaciones en las que la memoria disponible es escasa pero la carga completa de datos es inviable. Este mecanismo de optimización puede aumentar la capacidad de los datos asegurando el rendimiento hasta un cierto límite; sin embargo, cuando la cantidad de datos excede demasiado la memoria, el rendimiento de las búsquedas y consultas puede sufrir una grave degradación, por lo que le rogamos que active o desactive esta característica según le convenga.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Configurar la asignación de memoria<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>A partir de Milvus 2.4, tiene la flexibilidad de ajustar el archivo de configuración estática para configurar los ajustes predeterminados de asignación de memoria para todo el clúster antes del despliegue. Además, tiene la opción de modificar dinámicamente los parámetros para ajustar con precisión la configuración de la asignación de memoria tanto a nivel de clúster como de índice. De cara al futuro, las futuras actualizaciones ampliarán las capacidades de asignación de memoria para incluir configuraciones a nivel de campo.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Antes del despliegue del clúster: configuración global</h3><p>Antes de desplegar un clúster, la configuración <strong>a nivel de cl</strong> úster aplica la asignación de memoria a todo el clúster. Esto garantiza que todos los objetos nuevos se adhieran automáticamente a estas configuraciones. Es importante tener en cuenta que la modificación de estos ajustes requiere reiniciar el clúster para que surta efecto.</p>
<p>Para ajustar la configuración de asignación de memoria de su clúster, edite el archivo <code translate="no">configs/milvus.yaml</code>. Dentro de este archivo, puede especificar si desea activar la asignación de memoria por defecto y determinar la ruta del directorio para almacenar los archivos asignados a la memoria. Si la ruta (<code translate="no">mmapDirPath</code>) se deja sin especificar, el sistema almacena por defecto los archivos mapeados en memoria en <code translate="no">{localStorage.path}/mmap</code>. Para obtener más información, consulte <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Configuraciones relacionadas con el almacenamiento local</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>Después de <code translate="no">2.4.10</code>, la configuración <code translate="no">queryNode.mmap.mmapEnabled</code> se divide en cuatro campos separados, y todos los valores por defecto son <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, controla si los datos del vector son mmap;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>, controla si el índice vectorial es mmap;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>, controla si los datos escalares son mmap;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>, controla si el índice escalar es mmap;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>Además, sólo el índice vectorial y el mmap de datos vectoriales pueden activarse y desactivarse para una colección individualmente, pero no para otras.</p>
<p>Compatibilidad: Si la configuración original <code translate="no">queryNode.mmap.mmapEnabled</code> se establece en <code translate="no">true</code>, la nueva configuración añadida se establecerá en <code translate="no">true</code> en este momento. Si <code translate="no">queryNode.mmap.mmapEnabled</code> se establece en <code translate="no">false</code>, si la nueva configuración se establece en <code translate="no">true</code>, el valor final será <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">Durante el funcionamiento del clúster: configuración dinámica</h3><p>Durante el funcionamiento del clúster, puede ajustar dinámicamente la configuración de asignación de memoria a nivel de colección o de índice.</p>
<p>En el <strong>nivel</strong> de colección, la asignación de memoria se aplica a todos los datos brutos no indexados dentro de una colección, excluyendo las claves primarias, las marcas de tiempo y los ID de fila. Este enfoque es especialmente adecuado para la gestión integral de grandes conjuntos de datos.</p>
<p>Para realizar ajustes dinámicos en la configuración de la asignación de memoria dentro de una colección, utilice el método <code translate="no">set_properties()</code>. Aquí, puede alternar <code translate="no">mmap.enabled</code> entre <code translate="no">True</code> o <code translate="no">False</code> según sea necesario.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>Después de <code translate="no">2.4.10</code>, los ajustes de asignación de memoria dentro de una colección, utilice el método <code translate="no">add_field</code>. Aquí, puede alternar <code translate="no">mmap_enabled</code> entre <code translate="no">True</code> o <code translate="no">False</code> según sea necesario.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para los ajustes <strong>a nivel de índice</strong>, la asignación de memoria puede aplicarse específicamente a los índices vectoriales sin afectar a otros tipos de datos. Esta característica es muy valiosa para las colecciones que requieren un rendimiento optimizado para las búsquedas vectoriales.</p>
<p>Para activar o desactivar la asignación de memoria para un índice dentro de una colección, llame al método <code translate="no">alter_index()</code>, especificando el nombre del índice de destino en <code translate="no">index_name</code> y estableciendo <code translate="no">mmap.enabled</code> en <code translate="no">True</code> o <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Personalizar la ruta de almacenamiento en diferentes implementaciones<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>Los archivos mapeados en memoria se encuentran por defecto en el directorio <code translate="no">/mmap</code> dentro de <code translate="no">localStorage.path</code>. A continuación se muestra cómo personalizar esta configuración en varios métodos de despliegue:</p>
<ul>
<li>Para Milvus instalado utilizando Helm Chart:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para Milvus instalado utilizando Milvus Operator:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para Milvus instalado utilizando Docker:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>La asignación de memoria no puede habilitarse para una colección cargada, asegúrese de que la colección se ha liberado antes de habilitar la asignación de memoria.</p></li>
<li><p>La asignación de memoria no es compatible con los índices de clase DiskANN o GPU.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PREGUNTAS FRECUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>¿En qué casos se recomienda activar la asignación de memoria? ¿Cuáles son las desventajas de activar esta función?</strong></p>
<p>La asignación de memoria se recomienda cuando la memoria es limitada o cuando los requisitos de rendimiento son moderados. La activación de esta función aumenta la capacidad de carga de datos. Por ejemplo, con una configuración de 2 CPU y 8 GB de memoria, habilitar la asignación de memoria puede permitir cargar hasta 4 veces más datos en comparación con no habilitarla. El impacto en el rendimiento varía:</p>
<ul>
<li><p>Con memoria suficiente, el rendimiento esperado es similar al de utilizar sólo memoria.</p></li>
<li><p>Con memoria insuficiente, el rendimiento esperado puede degradarse.</p></li>
</ul></li>
<li><p><strong>¿Cuál es la relación entre las configuraciones a nivel de colección y a nivel de índice?</strong></p>
<p>El nivel de colección y el nivel de índice no son relaciones inclusivas, el nivel de colección controla si los datos originales están habilitados para mmap o no, mientras que el nivel de índice es sólo para índices vectoriales.</p></li>
<li><p><strong>¿Hay algún tipo de índice recomendado para la asignación de memoria?</strong></p>
<p>Sí, se recomienda HNSW para habilitar mmap. Hemos probado anteriormente índices de las series HNSW, IVF_FLAT, IVF_PQ/SQ, y el rendimiento de los índices de la serie IVF se redujo considerablemente, mientras que la reducción del rendimiento al activar mmap para los índices HNSW sigue estando dentro de lo esperado.</p></li>
<li><p><strong>¿Qué tipo de almacenamiento local se necesita para la asignación de memoria?</strong></p>
<p>Un disco de alta calidad mejora el rendimiento, siendo las unidades NVMe la opción preferida.</p></li>
<li><p><strong>¿Se pueden mapear en memoria los datos escalares?</strong></p>
<p>La asignación de memoria puede aplicarse a datos escalares, pero no es aplicable a índices creados sobre campos escalares.</p></li>
<li><p><strong>¿Cómo se determina la prioridad de las configuraciones de asignación de memoria en los distintos niveles?</strong></p>
<p>En Milvus, cuando las configuraciones de asignación de memoria se definen explícitamente en varios niveles, las configuraciones a nivel de índice y a nivel de colección comparten la prioridad más alta, seguidas por las configuraciones a nivel de clúster.</p></li>
<li><p><strong>Si actualizo desde Milvus 2.3 y he configurado la ruta del directorio de asignación de memoria, ¿qué ocurrirá?</strong></p>
<p>Si actualiza desde Milvus 2.3 y ha configurado la ruta del directorio de mapeo de memoria (<code translate="no">mmapDirPath</code>), su configuración se mantendrá, y la configuración por defecto para el mapeo de memoria habilitado (<code translate="no">mmapEnabled</code>) será <code translate="no">true</code>. Es importante migrar los metadatos para sincronizar la configuración de sus archivos mapeados en memoria existentes. Para más detalles, consulte <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">Migrar los metadatos</a>.</p></li>
</ul>
