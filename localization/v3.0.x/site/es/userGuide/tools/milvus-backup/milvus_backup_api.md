---
id: milvus_backup_api.md
summary: Aprende a utilizar Milvus Backup a través de la API
title: >-
  Copia de seguridad y restauración de datos mediante APICompatible with Milvus
  Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Copia de seguridad y restauración de datos mediante API<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Para conocer los flujos de trabajo actuales, consulta la <a href="/docs/es/milvus_backup_0_6_api.md">guía de la API HTTP</a> o <a href="/docs/es/milvus_backup_upgrade.md">actualiza desde la versión 0.5.x</a>. Consulta la <a href="/docs/es/milvus_backup_overview.md#Compatibility-matrix">matriz de compatibilidad</a> para conocer las versiones del servidor Milvus compatibles.</p>
<p>Milvus Backup ofrece funciones de copia de seguridad y restauración de datos para garantizar la seguridad de sus datos de Milvus.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Cómo obtener Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
<p>A continuación, crea una carpeta junto al binario de Milvus Backup descargado o compilado, nómbrala « <code translate="no">configs</code> » y coloca el archivo de configuración dentro de la carpeta « <code translate="no">configs</code> ».</p>
<p>La estructura de carpetas debería ser similar a la siguiente:</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">Iniciar el servidor de la API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>A continuación, puedes iniciar el servidor de la API de la siguiente manera:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>El servidor de la API escucha en el puerto 8080 de forma predeterminada. Puedes cambiarlo ejecutándolo con el indicador « <code translate="no">-p</code> ». Para iniciar el servidor de la API para que escuche en el puerto 443, haz lo siguiente:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Puedes acceder a la interfaz de usuario de Swagger mediante http://localhost:<port>/api/v1/docs/index.html.</p>
<h2 id="Prepare-data" class="common-anchor-header">Prepara los datos<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Si ejecutas una instancia local vacía de Milvus que escucha en el puerto predeterminado 19530, utiliza los scripts de ejemplo en Python para generar algunos datos en tu instancia. No dudes en realizar los cambios necesarios en los scripts para adaptarlos a tus necesidades.</p>
<p>Consigue los <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">scripts</a>. A continuación, ejecútalos para generar los datos. Asegúrate de que <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, el SDK oficial de Milvus para Python, esté instalado.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Este paso es opcional. Si lo omites, asegúrate de que ya dispones de algunos datos en tu instancia de Milvus.</p>
<h2 id="Back-up-data" class="common-anchor-header">Realizar una copia de seguridad de los datos<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
<p>Ten en cuenta que ejecutar Milvus Backup en una instancia de Milvus no suele afectar al funcionamiento de la misma. Tu instancia de Milvus seguirá siendo totalmente funcional durante la copia de seguridad o la restauración.</p>
<p>Ejecuta el siguiente comando para crear una copia de seguridad. Cambia <code translate="no">collection_names</code> y <code translate="no">backup_name</code> si es necesario.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>La solicitud de creación es asíncrona. Consulta <code translate="no">get_backup</code> con el <code translate="no">requestId</code> devuelto como <code translate="no">backup_id</code> y espera a que <code translate="no">data.state_code</code> pase a <code translate="no">2</code> antes de restaurar.</p>
<p>Puedes ver la lista de copias de seguridad en el depósito especificado en la configuración de Minio de la siguiente manera:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Recupera los metadatos de la copia de seguridad de la siguiente manera:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Sustituya <code translate="no">backup_id</code> y <code translate="no">backup_name</code> por los valores correspondientes a su copia de seguridad. Este punto final devuelve metadatos en formato JSON, no archivos de copia de seguridad. Copie el directorio completo de la copia de seguridad del almacenamiento de objetos al archivarla.</p>
<p>Ahora, puede guardar los archivos de copia de seguridad en un lugar seguro para restaurarlos en el futuro, o subirlos a <a href="https://cloud.zilliz.com">Zilliz Cloud</a> para crear una base de datos vectorial gestionada con sus datos. Para obtener más información, consulte <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«Migrar de Milvus a Zilliz Cloud</a>».</p>
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
<p>Puede llamar al comando de la API de restauración con la opción « <code translate="no">collection_suffix</code> » para crear una nueva colección restaurando los datos de la copia de seguridad. Modifique « <code translate="no">collection_names</code> » y « <code translate="no">backup_name</code> » si es necesario.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>La opción <code translate="no">collection_suffix</code> le permite establecer un sufijo para la nueva colección que se va a crear. El comando anterior creará una nueva colección llamada <strong>hello_milvus_recover</strong> en su instancia de Milvus.</p>
<p>Si prefieres restaurar la colección de la copia de seguridad sin cambiar su nombre, elimina la colección antes de restaurarla desde la copia de seguridad. Ahora puedes limpiar los datos generados en <a href="#Prepare-data">«Prepare data»</a> ejecutando el siguiente comando.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, ejecuta el siguiente comando para restaurar los datos desde la copia de seguridad.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>El proceso de restauración puede llevar bastante tiempo, dependiendo del tamaño de los datos que se vayan a restaurar. Por ello, los ejemplos anteriores solicitan una ejecución asíncrona con ` <code translate="no">&quot;async&quot;: true</code>`. Puedes comprobar el estado de una tarea de restauración ejecutando:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Recuerda cambiar <code translate="no">test_restore_id</code> por el <code translate="no">data.id</code> devuelto por la API de restauración. Espera a que <code translate="no">data.state_code</code> pase a <code translate="no">2</code> antes de verificar los datos; <code translate="no">3</code> indica un error y <code translate="no">4</code> un tiempo de espera agotado.</p>
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
    </button></h2><p>Una vez que la tarea se haya completado con éxito, comprueba que <code translate="no">hello_milvus_recover</code> existe. Crea un índice adecuado, carga la colección y compara el recuento de entidades, los valores escalares y vectoriales, y los resultados de búsqueda con los datos de origen capturados antes de la copia de seguridad. Para una restauración con el nombre original, utiliza <code translate="no">hello_milvus</code> en su lugar.</p>
<p>El ejemplo <code translate="no">verify_data.py</code> al que enlaza la guía de la CLI espera dos colecciones restauradas y las elimina al final. No es adecuado para este ejemplo de API, que selecciona únicamente <code translate="no">hello_milvus</code>.</p>
