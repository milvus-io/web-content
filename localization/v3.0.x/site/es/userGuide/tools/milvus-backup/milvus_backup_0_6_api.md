---
id: milvus_backup_0_6_api.md
summary: >-
  Crear y supervisar las tareas de copia de seguridad y restauración de Milvus
  Backup 0.6.0 a través de la API HTTP.
title: Utilizar la API HTTP de Milvus Backup 0.6.0
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Utilizar la API HTTP de Milvus Backup 0.6.0<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza la API HTTP de Milvus Backup para crear copias de seguridad, restaurar colecciones y supervisar tareas asíncronas. El ejemplo de instantánea que se muestra a continuación utiliza <strong>Milvus Backup 0.6.0</strong> con <strong>Milvus 3.0.1 o posterior</strong>. Para Backup 0.5.x, consulta la <a href="/docs/es/milvus_backup_api.md">guía de la API 0.5.x</a>. Si ya tienes una instalación, consulta <a href="/docs/es/milvus_backup_upgrade.md">Actualizar Milvus Backup</a>.</p>
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
    </button></h2><p>Descarga y extrae el binario correspondiente de la <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">versión v0.6.0</a>. Si prefieres compilarlo desde el código fuente, sigue <a href="/docs/es/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">las instrucciones de «Cómo obtener Milvus Backup»</a>; la compilación requiere Go 1.26 o posterior.</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Preparar el archivo de configuración<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea <a href="/docs/es/milvus_backup_0_6_cli.md#Prepare-configuration-file">un archivo</a> « <code translate="no">configs/backup.yaml</code> » utilizando el ejemplo de la versión v2 que se encuentra en <a href="/docs/es/milvus_backup_0_6_cli.md#Prepare-configuration-file">«Preparar el archivo de configuración</a>». Configura el acceso a Milvus, al almacenamiento de la instancia y al destino de la copia de seguridad. El servidor de Milvus también debe poder acceder al almacenamiento de la copia de seguridad para realizar operaciones de instantáneas.</p>
<p>Si dispone de un archivo v1, este seguirá siendo cargable. Consulte <a href="/docs/es/milvus_backup_upgrade.md#Migrate-the-configuration">«Migrar la configuración</a> » antes de modificar su esquema o sus variables de entorno.</p>
<p>Desde el directorio que contiene el binario, revisa la configuración y comprueba la conectividad:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Continúe cuando la comprobación de conectividad indique « <code translate="no">Success!</code> ».</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">Inicie el servidor de la API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Inicie el servicio con la configuración que ha comprobado:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>El puerto predeterminado es el 8080. Para elegir otro puerto, utiliza <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ejecuta solo uno de estos comandos para un servicio determinado. Los ejemplos siguientes utilizan el puerto 8080; cambia sus URL si has seleccionado otro puerto. Swagger UI está disponible en <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>Mantenga el servicio en ejecución mientras se recopilan las tareas. Los ID de las tareas y el progreso en tiempo real pertenecen al proceso del servicio; la copia de seguridad persistente permanece en el almacenamiento de objetos una vez que el proceso se detiene.</p>
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
    </button></h2><p>Utilice una colección existente denominada <code translate="no">coll</code> o cree la colección de prueba de 256 entidades que se indica en <a href="/docs/es/snapshot-backup-and-restore.md#Prepare-sample-data">«Preparar datos de ejemplo</a>». Modifique los nombres de las colecciones en las solicitudes si utiliza sus propios datos. Mantenga los datos de prueba sin cambios mientras verifica el resultado.</p>
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
    </button></h2><p>Envía una solicitud de copia de seguridad asíncrona:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>La respuesta incluye un « <code translate="no">requestId</code> ». El envío no implica que la copia de seguridad se haya completado. Copie ese valor en « <code translate="no">backup_id</code> » y realice consultas periódicas:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Espere a que <code translate="no">data.state_code</code> se convierta en <code translate="no">2</code>. La API utiliza estos estados de tarea:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Inicial</td></tr>
<tr><td><code translate="no">1</code></td><td>En ejecución</td></tr>
<tr><td><code translate="no">2</code></td><td>Éxito</td></tr>
<tr><td><code translate="no">3</code></td><td>Fallida</td></tr>
<tr><td><code translate="no">4</code></td><td>Tiempo de espera agotado</td></tr>
</tbody>
</table>
<p>Comprueba tanto la respuesta como el estado de la tarea. Un código HTTP 200 por sí solo no es suficiente: un valor distinto de cero en « <code translate="no">code</code> » indica un error. Una respuesta correcta puede omitir « <code translate="no">code</code> », ya que su valor es cero. Si una tarea falla o se agota el tiempo de espera, revisa los detalles de la respuesta y el registro del servidor antes de restaurar desde esa copia de seguridad.</p>
<p>Muestra una lista de las copias de seguridad almacenadas y revisa la copia de seguridad completada por su nombre:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> devuelve metadatos en formato JSON, incluido <code translate="no">collection_backups</code>; <strong>no</strong> descarga los archivos de copia de seguridad. En el caso de una copia de seguridad creada por otro proceso, una consulta solo por nombre puede devolver metadatos sin el progreso en tiempo real de la tarea. Utiliza el ID de la tarea de la respuesta de creación del servicio actual al supervisar una copia de seguridad activa.</p>
<p>El formato predeterminado es <code translate="no">auto</code>, que selecciona la instantánea en Milvus 3.0. Para solicitar explícitamente el binlog, añada <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> al cuerpo de la solicitud create. Los ajustes preestablecidos de la CLI <code translate="no">--for</code> no son un campo de solicitud HTTP.</p>
<p>Para conservar o trasladar la copia de seguridad, copia todo el directorio en el almacenamiento de objetos. Consulta la <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">guía de transferencia de la versión 0.6.0</a>.</p>
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
    </button></h2><p>Asegúrate de que <code translate="no">coll_bak</code> no exista ya. Envía una solicitud de restauración con un sufijo:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>El campo HTTP « <code translate="no">collection_names</code> » selecciona nombres <strong>de la copia de seguridad</strong> antes de aplicar el sufijo. Esta solicitud selecciona « <code translate="no">coll</code> » y crea « <code translate="no">coll_bak</code> ». Por el contrario, el parámetro « <code translate="no">--filter</code> » de la CLI coincide con los nombres de destino tras el cambio de nombre; no sustituya « <code translate="no">coll_bak</code> » en este campo HTTP.</p>
<p>Copia <code translate="no">data.id</code> de la respuesta de restauración y consulta el estado de la tarea:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Espera a que aparezca <code translate="no">data.state_code: 2</code> y comprueba en <code translate="no">collection_restore_tasks</code> que aparece la colección de destinos esperada. Una tarea enviada aún no supone una restauración verificada.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Restauración con el nombre original<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice una instancia de destino en la que no exista <code translate="no">coll</code>. Inicie un servicio de API de copia de seguridad independiente configurado para ese destino y la ubicación de la copia de seguridad completada; a continuación, envíe esta solicitud al servicio de destino:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Consulta <code translate="no">get_restore</code> en el mismo servicio utilizando el ID de tarea devuelto. Configura <code translate="no">milvus.*</code> para el destino de restauración y <code translate="no">backup.storage</code> para la copia de seguridad existente. Consulta <a href="/docs/es/milvus_backup_0_6_cli.md#Prepare-configuration-file">«Preparar el archivo de configuración</a>».</p>
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
    </button></h2><p>Una vez que la tarea de restauración se haya completado con éxito, conéctese a la instancia de Milvus de destino y compruebe que la colección y los datos esperados existen. Para la colección de prueba de 256 entidades, utilice las comprobaciones completas de escalares, vectores y búsquedas descritas en <a href="/docs/es/snapshot-backup-and-restore.md#Verify-the-result">«Verificar el resultado</a>».</p>
<p>Cambia <code translate="no">coll_bak</code> por <code translate="no">coll</code> cuando restaures con el nombre original. El código de verificación lee los datos restaurados sin eliminarlos. Para los datos de producción, compáralos con una línea de base capturada en el momento de la copia de seguridad.</p>
