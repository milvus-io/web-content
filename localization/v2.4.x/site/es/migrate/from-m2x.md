---
id: from-m2x.md
summary: >-
  Esta guía proporciona un proceso completo, paso a paso, para migrar datos de
  Milvus 2.3.x a Milvus 2.3.x o superior.
title: Desde Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">Desde Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía proporciona un proceso completo, paso a paso, para migrar datos de Milvus 2.3.x a Milvus 2.3.x o superior.</p>
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
<li>Milvus de origen: 2.3.0+ (La herramienta utiliza el iterador para obtener los datos de la colección de origen, lo que requiere que Milvus de origen sea la versión 2.3.0 o superior).</li>
<li>Milvus de destino: 2.3.0+</li>
</ul></li>
<li><strong>Herramientas necesarias</strong>:<ul>
<li>Herramienta<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Para obtener más información sobre la instalación, consulte <a href="/docs/es/v2.4.x/milvusdm_install.md">Instalar la herramienta de migración</a>.</li>
</ul></li>
<li><strong>Preparación de los datos</strong>:<ul>
<li>Asegúrese de que la colección Milvus de origen está cargada y lista para la exportación de datos.</li>
<li>Si el Milvus de destino no contiene una colección correspondiente a la colección de origen, la herramienta <a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a> la creará automáticamente. Tenga en cuenta que después de la migración, la colección de destino no se indexará, y deberá indexar manualmente la colección después.</li>
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
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>La siguiente tabla describe los parámetros del archivo de configuración de ejemplo. Para más información, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Migración de Milvus: Milvus2.x a Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>El modo operativo del trabajo de migración. Establezca milvus2x cuando migre desde Milvus 2.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamaño del búfer a leer de Milvus 2.x en cada lote.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Especifica de dónde se lee el archivo meta. Si se establece en config, indica que el archivo meta config puede obtenerse de este archivo migration.yaml.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>Versión Milvus de origen. Establecer como 2.3.0 o superior.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>Nombre de la colección de origen.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>Dirección del servidor Milvus de origen.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>Nombre de usuario del servidor Milvus de origen. Este parámetro es necesario si la autenticación de usuario está habilitada para su servidor Milvus. Para más información, consulte <a href="/docs/es/v2.4.x/authenticate.md">Activar autenticación</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>Contraseña para el servidor Milvus de origen. Este parámetro es necesario si la autenticación de usuario está activada para su servidor Milvus. Para más información, consulte <a href="/docs/es/v2.4.x/authenticate.md">Activar autenticación</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Dirección del servidor Milvus de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nombre de usuario del servidor Milvus de destino. Este parámetro es necesario si la autenticación de usuario está activada para su servidor Milvus. Para más información, consulte <a href="/docs/es/v2.4.x/authenticate.md">Activar autenticación</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Contraseña para el servidor Milvus de destino. Este parámetro es necesario si la autenticación de usuario está activada para su servidor Milvus. Para obtener más información, consulte <a href="/docs/es/v2.4.x/authenticate.md">Activación de la autenticación</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Iniciar la tarea de migración<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><p>Dispone de dos opciones para iniciar la tarea de migración: utilizando la CLI o realizando solicitudes a la API. Elija la que mejor se adapte a sus necesidades.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">Opción 1: Mediante CLI</h3><p>Inicie la tarea de migración con el siguiente comando. Sustituya <code translate="no">{YourConfigFilePath}</code> por el directorio local en el que se encuentra el archivo de configuración <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Supervise los registros en busca de actualizaciones de progreso. Los registros de migración correcta deberían incluir entradas como:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">Opción 2: Solicitudes a la API</h3><p>También puede utilizar la API Restful para ejecutar la migración. Inicie el servidor API con:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que el servidor se inicie correctamente, coloque el archivo <code translate="no">migration.yaml</code> en el directorio <code translate="no">configs/</code> del proyecto e inicie la migración con:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
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
    </button></h2><p>Una vez finalizada la tarea de migración, utilice Attu para ver el número de entidades migradas. Además, puede crear índices y cargar colecciones en Attu. Para más información, consulte <a href="https://github.com/zilliztech/attu">Attu</a> y <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">Opciones de configuración adicionales<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Además de las configuraciones básicas mencionadas anteriormente, también puede añadir opciones adicionales en función de sus requisitos específicos.</p>
<ul>
<li><p><strong>Migración selectiva de campos</strong>: Si necesita migrar sólo campos específicos de una colección en lugar de todos los campos, especifique los campos que desea migrar en la sección <code translate="no">meta</code> del archivo <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Colección de destino personalizada</strong>: Para personalizar las propiedades de la colección de destino, añada las configuraciones relacionadas en la sección <code translate="no">meta</code> del archivo <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Para obtener información detallada, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Migración de Milvus: Milvus2.x a Milvus2.x</a>.</p>
