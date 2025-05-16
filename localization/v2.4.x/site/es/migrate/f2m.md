---
id: f2m.md
title: De Faiss
related_key: 'Faiss, migrate, import'
summary: Aprenda a migrar los datos de Faiss a Milvus.
---
<h1 id="From-Faiss" class="common-anchor-header">Desde Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía proporciona un proceso completo, paso a paso, para migrar datos de Faiss a Milvus 2.x. Siguiendo esta guía, podrá transferir sus datos eficientemente, aprovechando las características avanzadas y el rendimiento mejorado de Milvus 2.x.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Versiones de software</strong>:<ul>
<li>Faiss de origen</li>
<li>Milvus de destino: 2.x</li>
<li>Para más detalles sobre la instalación, consulte <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Instalar Faiss</a> e <a href="https://milvus.io/docs/install_standalone-docker.md">Instalar Milvus</a>.</li>
</ul></li>
<li><strong>Herramientas necesarias</strong>:<ul>
<li>Herramienta de<a href="https://github.com/zilliztech/milvus-migration">migración de Milvus</a>. Para más detalles sobre la instalación, consulte <a href="/docs/es/v2.4.x/milvusdm_install.md">Instalar la herramienta de migración</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">Configurar la migración<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>Guarde el archivo de configuración de migración de ejemplo como <code translate="no">migration.yaml</code> y modifique la configuración en función de sus condiciones reales. Puede colocar el archivo de configuración en cualquier directorio local.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: <span class="hljs-literal">false</span>
    useSSL: <span class="hljs-literal">false</span>
    checkBucket: <span class="hljs-literal">true</span>
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

<button class="copy-code-btn"></button></code></pre>
<p>La siguiente tabla describe los parámetros del archivo de configuración de ejemplo. Para obtener una lista completa de configuraciones, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Migración de Milvus: Faiss to Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>La concurrencia de subprocesos de volcado.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>El modo operativo del trabajo de migración. Se establece en faiss cuando se migra desde índices Faiss.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamaño del buffer a leer de Faiss en cada lote. Unidad: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Tamaño del búfer para escribir en Milvus en cada lote. Unidad: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>La concurrencia de hilos del cargador.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Especifica de dónde se leen los archivos fuente. Valores válidos:<br/>- <code translate="no">local</code>: lee archivos de un disco local.<br/>- <code translate="no">remote</code>: lee archivos de un almacenamiento remoto.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>La ruta del directorio donde se encuentran los archivos fuente. Por ejemplo, <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Nombre de la colección Milvus.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>Número de shards que se crearán en la colección. Para más información sobre los fragmentos, consulte <a href="https://milvus.io/docs/glossary.md#Shard">Terminología</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>Dimensión del campo vectorial.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>Tipo de métrica utilizada para medir las similitudes entre vectores. Para más información, consulte <a href="https://milvus.io/docs/glossary.md#Metric-type">Terminología</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>Ubicación de almacenamiento de los archivos volcados. Valores válidos:<br/>- <code translate="no">local</code>: Almacena los archivos volcados en discos locales.<br/>- <code translate="no">remote</code>: Almacena los archivos volcados en almacenamiento de objetos.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Ruta del directorio de salida en el bucket de almacenamiento en la nube.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Proveedor del servicio de almacenamiento en la nube. Valores de ejemplo: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Punto final de almacenamiento de Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Región de almacenamiento en la nube. Puede ser cualquier valor si utiliza MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nombre del cubo para almacenar datos. El valor debe ser el mismo que el configurado en Milvus 2.x. Para más información, consulte <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configuraciones del sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Clave de acceso para el almacenamiento de Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Clave secreta para el almacenamiento de Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Si se debe utilizar un rol IAM para la conexión.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Si habilitar SSL al conectarse a Milvus 2.x. Para más información, consulte <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">Cifrado en tránsito</a>.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Si se debe comprobar si el bucket especificado existe en el almacenamiento de objetos.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Dirección del servidor Milvus de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nombre de usuario para el servidor Milvus 2.x. Este parámetro es necesario si la autenticación de usuario está habilitada para su servidor Milvus. Para obtener más información, consulte <a href="https://milvus.io/docs/authenticate.md">Activación de la autenticación</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Contraseña para el servidor Milvus 2.x. Este parámetro es necesario si la autenticación de usuario está activada para su servidor Milvus. Para más información, consulte <a href="https://milvus.io/docs/authenticate.md">Activar autenticación</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Inicie la tarea de migración<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Inicie la tarea de migración con el siguiente comando. Sustituya <code translate="no">{YourConfigFilePath}</code> por el directorio local en el que se encuentra el archivo de configuración <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>El comando anterior convierte los datos de índice de Faiss en archivos NumPy y, a continuación, utiliza la operación <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> para escribir los datos en el bucket de destino.</p></li>
<li><p>Una vez generados los archivos NumPy, importe estos archivos a Milvus 2.x con el siguiente comando. Sustituya <code translate="no">{YourConfigFilePath}</code> por el directorio local donde reside el archivo de configuración <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">Verificar el resultado<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez ejecutada la tarea de migración, puede realizar llamadas a la API o utilizar Attu para ver el número de entidades migradas. Para obtener más información, consulte <a href="https://github.com/zilliztech/attu">Attu</a> y <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
