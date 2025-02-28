---
id: milvus_backup_cli.md
summary: Aprenda a utilizar Milvus Backup a través de CLI
title: Copia de seguridad y restauración de datos mediante comandos
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Copia de seguridad y restauración de datos mediante comandos<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup proporciona funciones de copia de seguridad y restauración de datos para garantizar la seguridad de sus datos de Milvus.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Obtener Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede descargar el binario compilado o compilarlo desde el código fuente.</p>
<p>Para descargar el binario compilado, vaya a la página de <a href="https://github.com/zilliztech/milvus-backup/releases">versiones</a>, donde encontrará todas las versiones oficiales. Recuerde, utilice siempre los binarios de la versión marcada como <strong>Última</strong>.</p>
<p>Para compilar desde el código fuente, haz lo siguiente:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Prepare el archivo de configuración<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Descarga el <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">archivo de configuración de ejemplo</a> y adáptalo a tus necesidades.</p>
<p>A continuación, cree una carpeta junto al binario de Milvus Backup descargado o compilado, nombre la carpeta <code translate="no">configs</code>, y coloque el archivo de configuración dentro de la carpeta <code translate="no">configs</code>.</p>
<p>Su estructura de carpetas debe ser similar a la siguiente:</p>
<pre>
workspace ├── milvus-backup └── configs └── backup.yaml</pre>
<p>Dado que Milvus Backup no puede realizar copias de seguridad de sus datos en una ruta local, asegúrese de que la configuración de Minio es correcta al adaptar el archivo de configuración.</p>
<div class="alert note">
<p>El nombre del cubo Minio predeterminado varía según la forma en que instale Milvus. Cuando realice cambios en la configuración de Minio, consulte la siguiente tabla.</p>
<table>
<thead>
<tr><th>campo</th><th>Docker Compose</th><th>Helm / Operador Milvus</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>archivos</td><td>archivo</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Preparar datos<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Si ejecuta una instancia local vacía de Milvus en el puerto por defecto, utilice los scripts Python de ejemplo para generar algunos datos en su instancia. Siéntase libre de realizar los cambios necesarios en los scripts para adaptarlos a sus necesidades.</p>
<p>Obtenga los <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">scripts</a>. A continuación, ejecute los scripts para generar los datos. Asegúrese de que <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, el SDK Python oficial de Milvus, ha sido instalado.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Este paso es opcional. Si lo omite, asegúrese de que ya tiene algunos datos en su instancia de Milvus.</p>
<h2 id="Back-up-data" class="common-anchor-header">Copia de seguridad de los datos<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Tenga en cuenta que ejecutar Milvus Backup contra una instancia de Milvus normalmente no afectará al funcionamiento de la instancia. Su instancia de Milvus es completamente funcional durante la copia de seguridad o la restauración.</p>
<div class="tab-wrapper"></div>
<p>Ejecute el siguiente comando para crear una copia de seguridad.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Una vez ejecutado el comando, puede comprobar los archivos de copia de seguridad en el cubo especificado en la configuración de Minio. Concretamente, puede descargarlos mediante la <strong>consola</strong> de <strong>Minio</strong> o el cliente <strong>mc</strong>.</p>
<p>Para descargarlos desde <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">la</a> Consola de Minio, inicie sesión en la Consola de Minio, localice el cubo especificado en <code translate="no">minio.address</code>, seleccione los archivos del cubo y haga clic en <strong>Descargar</strong> para descargarlos.</p>
<p>Si prefiere <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">el cliente mc</a>, haga lo siguiente:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Ahora, puede guardar los archivos de copia de seguridad en un lugar seguro para restaurarlos en el futuro, o subirlos a <a href="https://cloud.zilliz.com">Zilliz Cloud</a> para crear una base de datos vectorial gestionada con sus datos. Para más detalles, consulte <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrar de Milvus a Zilliz Cloud</a>.</p>
<h2 id="Restore-data" class="common-anchor-header">Restaurar datos<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><div class="tab-wrapper"></div>
<p>Puede ejecutar el comando <code translate="no">restore</code> con la bandera <code translate="no">-s</code> para crear una nueva colección restaurando los datos de la copia de seguridad:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>La bandera <code translate="no">-s</code> permite establecer un sufijo para la nueva colección que se va a crear. El comando anterior creará una nueva colección llamada <strong>hello_milvus_recover</strong> en su instancia de Milvus.</p>
<p>Si prefiere restaurar la colección respaldada sin cambiar su nombre, elimine la colección antes de restaurarla a partir de la copia de seguridad. Ahora puede limpiar los datos generados en <a href="#Prepare-data">Prepare data</a> ejecutando el siguiente comando.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, ejecute el siguiente comando para restaurar los datos desde la copia de seguridad.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">Verificación de los datos restaurados<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez completada la restauración, puede verificar los datos restaurados indexando la colección restaurada como se indica a continuación:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Tenga en cuenta que la secuencia de comandos anterior presupone que ha ejecutado el comando <code translate="no">restore</code> con el indicador <code translate="no">-s</code> y que el sufijo se ha establecido en <code translate="no">-recover</code>. No dude en realizar los cambios necesarios en el script para adaptarlo a sus necesidades.</p>
