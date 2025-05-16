---
id: m2m.md
summary: >-
  Esta guía proporciona un proceso completo, paso a paso, para migrar datos de
  Milvus 1.x (incluyendo 0.9.x y superiores) a Milvus 2.x.
title: Desde Milvus 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">Desde Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía proporciona un proceso completo, paso a paso, para migrar datos de Milvus 1.x (incluyendo 0.9.x y superior) a Milvus 2.x. Siguiendo esta guía, podrá transferir sus datos eficientemente, aprovechando las características avanzadas y el rendimiento mejorado de Milvus 2.x.</p>
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
<li>Milvus de origen: 0.9.x a 1.x</li>
<li>Milvus de destino: 2.x</li>
</ul></li>
<li><strong>Herramientas necesarias</strong>:<ul>
<li>Herramienta de<a href="https://github.com/zilliztech/milvus-migration">migración Milvus</a>. Para más detalles sobre la instalación, consulte <a href="/docs/es/v2.4.x/milvusdm_install.md">Instalar la herramienta de migración</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Exportar metadatos de la instalación Milvus de origen<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Para preparar los datos de migración para Milvus 0.9.x a 1.x, detenga el Milvus de origen o al menos deje de realizar cualquier operación DML en él.</p>
<ol>
<li><p>Exporte los metadatos de la instalación Milvus de origen a <code translate="no">meta.json</code>.</p>
<ul>
<li>Para aquellas instalaciones que utilicen MySQL como backend, ejecute</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para aquellas instalaciones que utilicen SQLite como backend, ejecute</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Copie la carpeta <code translate="no">tables</code> de su instalación de Milvus y, a continuación, mueva tanto la carpeta <code translate="no">meta.json</code> como <code translate="no">tables</code> a una carpeta vacía.</p>
<p>Una vez realizado este paso, la estructura de la carpeta vacía debería tener este aspecto:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Suba la carpeta preparada en el paso anterior a un bucket de almacenamiento en bloque S3 o utilice directamente esta carpeta local en el siguiente apartado.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Configurar el archivo de migración<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>La siguiente tabla describe los parámetros del archivo de configuración de ejemplo. Para obtener una lista completa de configuraciones, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Migración de Milvus: Milvus1.x a Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>La concurrencia de subprocesos de volcado.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>El modo operativo del trabajo de migración. Establecido en <code translate="no">milvus1x</code> al migrar desde Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamaño del búfer a leer de Milvus 1.x en cada lote. Unidad: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Tamaño del búfer para escribir en Milvus 2.x en cada lote. Unidad: KB.</td></tr>
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
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Especifica de dónde se lee el archivo meta meta.json. Valores válidos: <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Ruta del directorio local donde reside el archivo <code translate="no">meta.json</code>. Esta configuración sólo se utiliza cuando <code translate="no">meta.mode</code> está configurado como <code translate="no">local</code>. Para otras configuraciones meta, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Especifica desde dónde se leen los archivos fuente. Valores válidos:<br/>- <code translate="no">local</code>: lee archivos de un disco local.<br/>- <code translate="no">remote</code>: lee archivos de un almacenamiento remoto.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>La ruta del directorio donde se encuentran los archivos fuente. Por ejemplo, <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Ubicación de almacenamiento para los archivos volcados. Valores válidos:<br/>- <code translate="no">local</code>: Almacena los archivos volcados en discos locales.<br/>- <code translate="no">remote</code>: Almacena los archivos volcados en almacenamiento de objetos.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Ruta del directorio de salida en el cubo de almacenamiento en la nube.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Clave de acceso para el almacenamiento Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Clave secreta para el almacenamiento Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Proveedor del servicio de almacenamiento en la nube. Valores de ejemplo: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Región de almacenamiento en la nube. Puede ser cualquier valor si utiliza MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nombre del cubo para almacenar datos. El valor debe ser el mismo que el configurado en Milvus 2.x. Para más información, consulte <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configuraciones del sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Si se debe utilizar un rol IAM para la conexión.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Si se debe comprobar si el cubo especificado existe en el almacenamiento de objetos.</td></tr>
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
<p>El comando anterior convierte los datos de origen en Milvus 1.x en archivos NumPy y, a continuación, utiliza la operación <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> para escribir los datos en el bucket de destino.</p></li>
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
