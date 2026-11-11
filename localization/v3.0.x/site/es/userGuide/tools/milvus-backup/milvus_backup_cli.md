---
id: milvus_backup_cli.md
summary: Aprende a utilizar Milvus Backup a través de la CLI
title: >-
  Copia de seguridad y restauración de datos mediante comandosCompatible with
  Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Copia de seguridad y restauración de datos mediante comandos<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Para conocer los flujos de trabajo actuales, consulta la <a href="/docs/es/milvus_backup_0_6_cli.md">guía de la interfaz de línea de comandos (CLI)</a> o <a href="/docs/es/milvus_backup_upgrade.md">actualiza desde la versión 0.5.x</a>. Consulta la <a href="/docs/es/milvus_backup_overview.md#Compatibility-matrix">matriz de compatibilidad</a> para conocer las versiones del servidor Milvus compatibles.</p>
<p>Milvus Backup ofrece funciones de copia de seguridad y restauración de datos para garantizar la seguridad de sus datos de Milvus.</p>
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
    </button></h2><p>Puede descargar el binario compilado o compilarlo a partir del código fuente.</p>
<p>Descarga el binario para tu sistema operativo y arquitectura de la <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">versión 0.5.16</a>. Utiliza la configuración y los ejemplos correspondientes a la versión 0.5.16 que se incluyen en esta página.</p>
<p>Para compilar la versión 0.5.16 a partir del código fuente, instala Go 1.25 o posterior y ejecuta:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Prepara el archivo de configuración<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Descarga el <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">archivo de configuración de ejemplo</a> y adáptalo a tus necesidades.</p>
<p>A continuación, crea una carpeta junto al binario de Milvus Backup descargado o compilado, asígnale el nombre « <code translate="no">configs</code> » y coloca el archivo de configuración dentro de la carpeta « <code translate="no">configs</code> ».</p>
<p>Tu estructura de carpetas debería ser similar a la siguiente:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>En este ejemplo se utiliza MinIO como almacenamiento de copias de seguridad. Configura « <code translate="no">minio.*</code> » para que coincida con tu almacenamiento de Milvus y el destino de las copias de seguridad, incluyendo las direcciones, las credenciales, los nombres de los buckets y las rutas raíz.</p>
<div class="alert note">
<p>El nombre del bucket predeterminado de MinIO varía en función de cómo se instale Milvus. Al realizar cambios en la configuración de MinIO, consulte la siguiente tabla.</p>
<table>
<thead>
<tr><th>campo</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>archivos</td><td>archivo</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Preparar los datos<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Si ejecutas una instancia local vacía de Milvus en el puerto predeterminado, utiliza los scripts de ejemplo en Python para generar algunos datos en tu instancia. No dudes en realizar los cambios necesarios en los scripts para adaptarlos a tus necesidades.</p>
<p>Consigue los <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">scripts</a>. A continuación, ejecútalos para generar los datos. Asegúrate de que <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, el SDK oficial de Milvus para Python, esté instalado.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Este paso es opcional. Si lo omite, asegúrese de que ya dispone de algunos datos en su instancia de Milvus.</p>
<h2 id="Back-up-data" class="common-anchor-header">Hacer una copia de seguridad de los datos<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Ten en cuenta que ejecutar Milvus Backup en una instancia de Milvus no suele afectar al funcionamiento de la misma. Tu instancia de Milvus seguirá funcionando con total normalidad durante la copia de seguridad o la restauración.</p>
<div class="tab-wrapper"></div>
<p>Ejecuta el siguiente comando para crear una copia de seguridad.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Una vez ejecutado el comando, puedes comprobar los archivos de copia de seguridad en el bucket especificado en la configuración de Minio. En concreto, puedes descargarlos mediante <strong>la consola de Minio</strong> o el cliente <strong>mc</strong>.</p>
<p>Para descargarlos desde <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">la consola de Minio</a>, inicia sesión en la consola de Minio, localiza el depósito especificado en <code translate="no">minio.backupBucketName</code>, selecciona los archivos del depósito y haz clic en <strong>«Descargar»</strong> para descargarlos.</p>
<p>Si prefieres <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">el cliente mc</a>, haz lo siguiente:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Ahora puede guardar los archivos de copia de seguridad en un lugar seguro para restaurarlos en el futuro, o subirlos a <a href="https://cloud.zilliz.com">Zilliz Cloud</a> para crear una base de datos vectorial gestionada con sus datos. Para obtener más información, consulte <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«Migrar de Milvus a Zilliz Cloud</a>».</p>
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
<p>Puedes ejecutar el comando « <code translate="no">restore</code> » con el indicador « <code translate="no">-s</code> » para crear una nueva colección restaurando los datos de la copia de seguridad:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>El indicador ` <code translate="no">-s</code> ` le permite establecer un sufijo para la nueva colección que se va a crear. El comando anterior creará una nueva colección llamada ` <strong>hello_milvus_recover</strong> ` en su instancia de Milvus.</p>
<p>Si prefieres restaurar la colección de la copia de seguridad sin cambiar su nombre, elimina la colección antes de restaurarla desde la copia de seguridad. Ahora puedes limpiar los datos generados en <a href="#Prepare-data">«Prepare data»</a> ejecutando el siguiente comando.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, ejecuta el siguiente comando para restaurar los datos desde la copia de seguridad.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">Verificar los datos restaurados<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>En el caso de los datos de ejemplo desechables creados anteriormente, el script «upstream» indexa y consulta « <code translate="no">hello_milvus_recover</code> » y « <code translate="no">hello_milvus2_recover</code> », y a continuación <strong>elimina ambas colecciones restauradas</strong>. Ejecútalo solo después de haber restaurado ambas colecciones de ejemplo con « <code translate="no">_recover</code> ». En el caso de tus propios datos, compáralos con tu referencia del momento de la copia de seguridad sin utilizar este script de limpieza.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Ten en cuenta que el script anterior da por hecho que has ejecutado el comando <code translate="no">restore</code> con el indicador <code translate="no">-s</code> y que el sufijo está establecido en <code translate="no">_recover</code>. No dudes en realizar los cambios necesarios en el script para adaptarlo a tus necesidades.</p>
