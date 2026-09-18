---
id: milvus_backup_upgrade.md
summary: >-
  Actualizar Milvus Backup de la versión 0.5.x a la 0.6.0, actualizar la
  configuración y los comandos, y comprobar que la copia de seguridad y la
  restauración funcionan correctamente.
title: Actualizar Milvus Backup a la versión 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Actualizar Milvus Backup a la versión 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza esta guía para actualizar la <strong>herramienta Milvus Backup</strong> de la versión 0.5.x a la 0.6.0. Esta guía no actualiza tu servidor Milvus. Si vas a seguir utilizando la versión 0.5.x, sigue utilizando la guía <a href="/docs/es/milvus_backup_cli.md">de la CLI</a> o <a href="/docs/es/milvus_backup_api.md">la API</a> de <a href="/docs/es/milvus_backup_cli.md">la versión 0.5.x</a>. Para una nueva instalación, utiliza la <a href="/docs/es/milvus_backup_0_6_cli.md">guía de la versión 0.6.0</a>.</p>
<p>Las configuraciones YAML de la versión 1 siguen cargándose mediante traducción automática. Sin embargo, en la versión 0.6.0 se rechazan los indicadores de la CLI obsoletos y el formato de copia de seguridad predeterminado cambia en Milvus 3.0. Revisa tanto la configuración como los comandos antes de modificar las tareas programadas o los servicios.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Comprueba el punto de partida<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Anota tu versión de Backup, las versiones de origen y destino de Milvus, los archivos de configuración, las modificaciones de las variables de entorno, la ubicación de las copias de seguridad y los comandos utilizados por los scripts o los servicios de la API. Consulta la <a href="/docs/es/milvus_backup_overview.md#Compatibility-matrix">información de compatibilidad</a> de esas versiones del servidor.</p>
<p>Conserva los directorios originales de binarios, configuración y copias de seguridad existentes mientras validas la nueva instalación. Descarga la versión 0.6.0 en un directorio independiente utilizando <a href="/docs/es/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">«Obtener Milvus Backup</a>». Todos los comandos que se indican a continuación se ejecutan desde ese directorio e invocan el binario 0.6.0. Coloca una copia de tu configuración de la v1 en <code translate="no">configs/backup-v1.yaml</code>.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Migrar la configuración<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Una configuración de la v1 todavía se carga en la versión 0.6.0. Milvus Backup la convierte a la v2 al iniciar y muestra una advertencia. Para guardar la configuración convertida en un archivo independiente:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> rechaza una configuración migrada no válida. Sin <code translate="no">--output</code>, el comando escribe el YAML de la v2 en la salida estándar. Revisa y utiliza el nuevo archivo solo después de comprobar que los ajustes se han resuelto correctamente.</p>
<table>
<thead>
<tr><th>Configuración de la v1</th><th>Configuración de la v2</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Almacenamiento de origen en <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Almacenamiento de copias de seguridad en <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Credenciales de almacenamiento</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, con una <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Revisa las variables de entorno en el mismo cambio que el archivo de configuración. La v2 solo acepta las variables de entorno relacionadas con credenciales compatibles, como <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. Los nombres antiguos de la v1 no se aplican a un archivo de la v2. Para ajustes que no sean de credenciales, como nombres de buckets y puntos finales, utiliza YAML o una anulación de clave de configuración:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> informa de las variables de entorno afectadas sin copiar sus valores secretos en el archivo de salida. Consulte <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">las variables de entorno compatibles con la v2</a>. <code translate="no">config show</code> sustituye al comando obsoleto <code translate="no">check config</code>.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">Actualización de los comandos de la CLI<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>Los indicadores obsoletos en la versión 0.5 se rechazan en la 0.6.0. Actualice los scripts antes de actualizar el binario.</p>
<table>
<thead>
<tr><th>Comando</th><th>Opción eliminada</th><th>Sustitución</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, utilizando nombres de destino</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Elimina el indicador; <code translate="no">get</code> devuelve la información de la copia de seguridad</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>No hay ningún filtro de recopilación equivalente</td></tr>
</tbody>
</table>
<p>Por ejemplo, estos comandos de la versión 0.5.16 seleccionan el nombre de origen « <code translate="no">coll</code> »:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Sus equivalentes en la versión 0.6.0 utilizan el nombre de destino para la restauración:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Un filtro de restauración que no coincida con nada puede finalizar correctamente sin crear una colección. Comprueba siempre la colección de destino y sus datos. La API HTTP « <code translate="no">collection_names</code> » sigue seleccionando nombres de origen en la copia de seguridad; consulta <a href="/docs/es/milvus_backup_0_6_api.md#Restore-data">la guía de la API 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Elige el comportamiento de la copia de seguridad<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>En los servidores Milvus 2.x compatibles, el formato « <code translate="no">auto</code> » utiliza el binlog. La actualización de la copia de seguridad no requiere pasar a Milvus 3.0.</li>
<li>En Milvus 3.0, <code translate="no">auto</code> selecciona «snapshot». La compatibilidad oficial con copias de seguridad y restauraciones comienza a partir de Milvus 3.0.1. Pasa <code translate="no">--format binlog</code> para mantener el comportamiento de binlog al crear una copia de seguridad.</li>
<li>La compatibilidad con la configuración de la versión 1 no conserva los indicadores de comando eliminados ni anula el valor predeterminado del nuevo formato.</li>
<li>Los ajustes predefinidos de propósito pueden establecer el formato y otras opciones. Por ejemplo, « <code translate="no">--for archive</code> » fuerza el binlog incluso si también se proporciona « <code translate="no">--format snapshot</code> ». Revisa <a href="/docs/es/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">las opciones de formato y propósito</a>.</li>
<li>Las colecciones externas se omiten durante la copia de seguridad. Comprueba los metadatos de la copia de seguridad en lugar de dar por hecho que el éxito de la tarea garantiza que se hayan incluido todas las colecciones.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Valida antes de cambiar de trabajo<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo mantiene el formato binlog y restaura en una nueva colección. Sustituya <code translate="no">coll</code> por una colección cuyo esquema, recuento, valores escalares y vectoriales, y resultados de búsqueda haya registrado. Utilice un nuevo nombre de copia de seguridad y asegúrese de que el nombre de destino <code translate="no">coll_upgrade_check</code> no exista.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Confirma que la copia de seguridad incluya <code translate="no">coll</code> y que <code translate="no">coll_upgrade_check</code> exista tras la restauración. Crea su índice vectorial si es necesario, cárgalo y compara los datos restaurados y los resultados de búsqueda con la referencia registrada. Mantén los datos de origen sin cambios durante esta prueba.</p>
<p>Pruebe también una copia de seguridad existente representativa antes de utilizarla con la nueva herramienta. Para una copia de seguridad 0.5.16 denominada « <code translate="no">legacy_backup</code> » que contenga « <code translate="no">coll</code> », utilice un nombre de destino distinto:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Estas rutas de actualización se validaron con <strong>Milvus 2.6.11</strong>, la copia de seguridad <strong>0.5.16 → 0.6.0</strong> y copias de seguridad de binlog en MinIO. Tanto las copias de seguridad recién creadas como las existentes se restauraron con valores de entidad y resultados de búsqueda vectorial coincidentes. Esto no garantiza la compatibilidad con todas las copias de seguridad históricas ni con la restauración de Milvus 2.x a 3.0. Tampoco garantiza que la versión 0.5.x pueda leer copias de seguridad creadas por la 0.6.0.</p>
<p>Una vez que la validación se haya completado con éxito, actualice los trabajos para que utilicen conjuntamente el nuevo binario, la configuración comprobada, los ajustes de entorno y los indicadores de sustitución. Para las implementaciones de API, inicie el nuevo servicio con la configuración comprobada y verifique la finalización de las tareas a través de la <a href="/docs/es/milvus_backup_0_6_api.md">API HTTP 0.6.0</a>. Para adoptar instantáneas en Milvus 3.0.1 o posterior, siga las instrucciones de <a href="/docs/es/snapshot-backup-and-restore.md">«Copia de seguridad y restauración de instantáneas en una sola instancia</a>».</p>
