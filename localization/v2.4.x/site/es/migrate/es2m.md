---
id: es2m.md
summary: >-
  Esta guía proporciona un proceso completo, paso a paso, para migrar datos de
  Elasticsearch a Milvus 2.x.
title: Desde Elasticsearch
---
<h1 id="From-Elasticsearch" class="common-anchor-header">Desde Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía proporciona un proceso completo, paso a paso, para migrar datos de Elasticsearch a Milvus 2.x. Siguiendo esta guía, podrá transferir sus datos eficientemente, aprovechando las características avanzadas y el rendimiento mejorado de Milvus 2.x.</p>
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
<li>Elasticsearch de origen: 7.x u 8.x</li>
<li>Milvus de destino: 2.x</li>
<li>Para obtener más información sobre la instalación, consulte <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Instalación de Elasticsearch</a> e <a href="https://milvus.io/docs/install_standalone-docker.md">Instalación de Milvus</a>.</li>
</ul></li>
<li><strong>Herramientas necesarias</strong>:<ul>
<li>Herramienta<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Para obtener más información sobre la instalación, consulte <a href="/docs/es/v2.4.x/milvusdm_install.md">Instalación de la herramienta de migración</a>.</li>
</ul></li>
<li><strong>Tipos de datos admitidos para la migración</strong>: Los campos a migrar desde el índice Elasticsearch de origen son de los siguientes tipos - <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>. Los tipos de datos que no aparecen en esta lista no son compatibles actualmente con la migración. Consulte la <a href="#field-mapping-reference">Referencia de mapeo de campos</a> para obtener información detallada sobre los mapeos de datos entre las colecciones Milvus y los índices Elasticsearch.</li>
<li><strong>Requisitos del índice de Elasticsearch</strong>:<ul>
<li>El índice Elasticsearch de origen debe contener un campo vectorial del tipo <code translate="no">dense_vector</code>. La migración no puede iniciarse sin un campo vectorial.</li>
</ul></li>
</ul>
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
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>La siguiente tabla describe los parámetros del archivo de configuración de ejemplo. Para obtener una lista completa de configuraciones, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration: Elasticsearch a Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>El modo operativo del trabajo de migración. Establézcalo en <code translate="no">elasticsearch</code> cuando migre desde índices de Elasticsearch.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamaño del búfer a leer desde Elasticsearch en cada lote. Unidad: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Especifica la fuente de las meta configuraciones. Actualmente, sólo se admite <code translate="no">config</code>.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>Identifica el índice de Elasticsearch desde el que migrar los datos.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>Campos dentro del índice Elasticsearch a migrar.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Nombre del campo de Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>Longitud máxima del campo. Este parámetro sólo es necesario cuando <code translate="no">meta.fields.type</code> es <code translate="no">keyword</code> o <code translate="no">text</code>.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>Especifica si el campo sirve como clave primaria.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Tipo de datos del campo Elasticsearch. Actualmente, se admiten los siguientes tipos de datos en Elasticsearch: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>Dimensión del campo vectorial. Este parámetro sólo es necesario cuando <code translate="no">meta.fields.type</code> es <code translate="no">dense_vector</code>.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Configuraciones específicas para crear la colección en Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Nombre de la colección Milvus. Por defecto es el nombre del índice Elasticsearch si no se especifica.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>Especifica si se deshabilita el campo dinámico en la colección. El valor predeterminado es <code translate="no">false</code>. Para obtener más información sobre los campos dinámicos, consulte <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">Habilitar campo dinámico</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>Número de shards que se crearán en la colección. Para obtener más información sobre los fragmentos, consulte <a href="https://milvus.io/docs/glossary.md#Shard">Terminología</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Nivel de consistencia de la colección en Milvus. Para más información, consulte <a href="https://milvus.io/docs/consistency.md">Consistencia</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>Configuración de conexión para el servidor Elasticsearch de origen.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>Dirección del servidor Elasticsearch de origen.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Nombre de usuario para el servidor Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Contraseña para el servidor Elasticsearch.</td></tr>
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
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Ruta del directorio de salida en el bucket de almacenamiento en la nube.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Proveedor del servicio de almacenamiento en la nube. Valores de ejemplo: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Región de almacenamiento en la nube. Puede ser cualquier valor si utiliza MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nombre del cubo para almacenar datos. El valor debe ser el mismo que el configurado en Milvus 2.x. Para más información, consulte <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configuraciones del sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Si se debe utilizar un rol IAM para la conexión.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Si se debe comprobar si el cubo especificado existe en el almacenamiento de objetos.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>Configuraciones de conexión para el servidor Milvus 2.x de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Dirección del servidor Milvus de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nombre de usuario para el servidor Milvus 2.x. Este parámetro es necesario si la autenticación de usuario está habilitada para su servidor Milvus. Para más información, consulte <a href="https://milvus.io/docs/authenticate.md">Activar autenticación</a>.</td></tr>
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
    </button></h2><p>Inicie la tarea de migración con el siguiente comando. Sustituya <code translate="no">{YourConfigFilePath}</code> por el directorio local en el que se encuentra el archivo de configuración <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A continuación se muestra un ejemplo de una salida de registro de migración correcta:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
<h2 id="Field-mapping-reference" class="common-anchor-header">Referencia de asignación de campos<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Revise la siguiente tabla para comprender cómo se asignan los tipos de campo en los índices de Elasticsearch a los tipos de campo en las colecciones de Milvus.</p>
<p>Para obtener más información sobre los tipos <a href="https://milvus.io/docs/schema.md#Supported-data-types">de</a> datos admitidos en Milvus, consulte <a href="https://milvus.io/docs/schema.md#Supported-data-types">Tipos de datos admitidos</a>.</p>
<table>
<thead>
<tr><th>Tipo de campo Elasticsearch</th><th>Tipo de campo Milvus</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>vector_denso</td><td>FloatVector</td><td>Las dimensiones del vector no cambian durante la migración.</td></tr>
<tr><td>palabra clave</td><td>VarChar</td><td>Establece la longitud máxima (de 1 a 65.535). Las cadenas que superen este límite pueden provocar errores de migración.</td></tr>
<tr><td>texto</td><td>VarChar</td><td>Longitud máxima (1 a 65.535). Las cadenas que superen el límite pueden provocar errores de migración.</td></tr>
<tr><td>long</td><td>Int64</td><td>-</td></tr>
<tr><td>entero</td><td>Int32</td><td>-</td></tr>
<tr><td>doble</td><td>Doble</td><td>-</td></tr>
<tr><td>float</td><td>Float</td><td>-</td></tr>
<tr><td>booleano</td><td>Bool</td><td>-</td></tr>
<tr><td>objeto</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
