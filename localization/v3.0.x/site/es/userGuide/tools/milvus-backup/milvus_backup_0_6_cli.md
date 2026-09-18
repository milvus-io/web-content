---
id: milvus_backup_0_6_cli.md
summary: >-
  Configura Milvus Backup 0.6.0, crea una copia de seguridad y comprueba los
  datos restaurados mediante la interfaz de línea de comandos (CLI).
title: Utiliza Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Utiliza Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza Milvus Backup para realizar copias de seguridad de colecciones y restaurarlas en la misma instancia de Milvus o en otra. Esta guía trata sobre <strong>Milvus Backup 0.6.0</strong>. La creación de copias de seguridad y la restauración en Milvus 3.0 son compatibles oficialmente a partir de <strong>la versión Milvus 3.0.1</strong>. Backup 0.6.0 también admite flujos de trabajo binlog en las versiones compatibles de Milvus 2.x; consulta <a href="/docs/es/milvus_backup_overview.md#Compatibility-matrix">la compatibilidad de Milvus Backup</a>.</p>
<p>Si sigue utilizando Backup 0.5.x, utilice la <a href="/docs/es/milvus_backup_cli.md">guía de la CLI de la versión 0.5.x</a>. Si va a actualizar, siga primero las instrucciones de <a href="/docs/es/milvus_backup_upgrade.md">«Actualizar Milvus Backup</a> ».</p>
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
    </button></h2><p>Descarga el binario para tu sistema operativo y arquitectura de la <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">versión v0.6.0</a> y, a continuación, descomprímelo. Mantén el binario y los ejemplos de configuración en la misma versión.</p>
<p>Si, por el contrario, desea compilarlo desde el código fuente, instale <strong>Go 1.26 o una versión posterior</strong> y, a continuación, ejecute:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>El binario precompilado no requiere Go. Ejecuta todos los comandos de shell posteriores desde el directorio que contiene « <code translate="no">milvus-backup</code> ».</p>
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
    </button></h2><p>Milvus Backup necesita acceso al punto final gRPC de Milvus, a su punto final de gestión, al almacenamiento de la instancia y al destino de la copia de seguridad. Para las copias de seguridad de instantáneas, el servidor Milvus también necesita acceso al almacenamiento de copias de seguridad.</p>
<p>Crea un directorio de configuración:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Guarda este ejemplo de MinIO como <code translate="no">configs/backup.yaml</code>. Sustituye las direcciones, las credenciales, el bucket y la ruta raíz por la configuración de tu implementación. Las credenciales <code translate="no">minioadmin</code> son los valores predeterminados de prueba de MinIO.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> Se conecta a la instancia de la que se está realizando la copia de seguridad o la restauración. Si la autenticación está habilitada, configura también <code translate="no">milvus.user</code> y <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> Se utiliza para pausar o reanudar la recolección de basura durante la copia de seguridad.</li>
<li><code translate="no">milvus.storage</code> Debe coincidir con el almacenamiento de objetos real de la instancia. Establecer un bucket aquí no modifica la configuración de Milvus.</li>
<li><code translate="no">backup.storage</code> identifica la ubicación de la copia de seguridad. Los campos sin configurar se heredan de <code translate="no">milvus.storage</code>, excepto <code translate="no">rootPath</code>, cuyo valor por defecto es <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> Selecciona la copia desde el almacenamiento cuando los backends coinciden y, en caso contrario, la transmisión a través de Milvus Backup. Esta configuración controla la transferencia de objetos, no el formato de copia de seguridad.</li>
</ul>
<p>A continuación se muestran los valores predeterminados habituales del almacenamiento. Confirma los valores en tu entorno de producción antes de utilizarlos.</p>
<table>
<thead>
<tr><th>Configuración</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Depósito</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Ruta raíz</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Si el servidor Milvus utiliza una dirección diferente para acceder al almacén de copias de seguridad, configura <code translate="no">backup.storage.milvusAddress</code> y <code translate="no">milvusPort</code> con la dirección a la que el servidor puede acceder. Para la autenticación, TLS, otros proveedores de almacenamiento y configuraciones adicionales, consulta el <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">ejemplo de configuración de la versión 0.6.0</a>.</p>
<p>Comprueba los valores efectivos y verifica la conectividad:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> oculta los valores secretos e indica de dónde procede cada valor. La comprobación de conectividad debería indicar <code translate="no">Success!</code>. Resuelve los errores de conexión o de almacenamiento antes de crear una copia de seguridad.</p>
<p>Para configuraciones v1 existentes, consulta <a href="/docs/es/milvus_backup_upgrade.md#Migrate-the-configuration">Actualizar la copia de seguridad de Milvus</a>. La conversión automática de la configuración no sustituye a los indicadores de la CLI que se hayan eliminado.</p>
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
    </button></h2><p>Utilice una colección existente denominada « <code translate="no">coll</code> » y asegúrese de que no exista « <code translate="no">coll_bak</code> ». Anote el esquema, el recuento de entidades, valores escalares y vectoriales representativos, y un resultado de búsqueda conocido antes de la copia de seguridad. Mantenga los datos de ejemplo sin cambios mientras compara la copia restaurada. Para crear en su lugar un pequeño conjunto de datos desechable, utilice <a href="/docs/es/snapshot-backup-and-restore.md#Prepare-sample-data">«Preparar datos de muestra</a>».</p>
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
    </button></h2><p>Crea una copia de seguridad con el nombre « <code translate="no">coll</code> »:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>El comando «create» debería mostrar « <code translate="no">create backup success</code> ». « <code translate="no">get</code> » devuelve los metadatos de la copia de seguridad; comprueba que la colección esperada esté presente. Si se omite « <code translate="no">--filter</code> », se realiza una copia de seguridad de todas las colecciones elegibles. Las colecciones externas se omiten.</p>
<p><code translate="no">--filter</code> Acepta nombres separados por comas: <code translate="no">coll</code> en la base de datos predeterminada, <code translate="no">db1.coll</code> o <code translate="no">'db1.*'</code> para todas las colecciones de una base de datos. Coloca entre comillas los patrones que contengan <code translate="no">*</code> para evitar la expansión del shell.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Elige un formato de copia de seguridad o un propósito<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>Con el valor predeterminado <code translate="no">--format auto</code>, Milvus 3.0 utiliza copias de seguridad de instantáneas; los servidores Milvus 2.x compatibles utilizan binlog. Para mantener explícitamente el comportamiento de binlog, pasa <code translate="no">--format binlog</code>. El <a href="/docs/es/snapshot-backup-and-restore.md">ejemplo de instantánea</a> selecciona explícitamente <code translate="no">--format snapshot</code>.</p>
<p>Utilice <code translate="no">--for</code> cuando una finalidad se ajuste a su flujo de trabajo:</p>
<table>
<thead>
<tr><th>Propósito</th><th>Valores aplicados por el ajuste preestablecido</th><th>Uso previsto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Habilita la copia de seguridad RBAC; conserva sus elecciones de formato y estrategia</td><td>Copia datos a otra instancia; « <code translate="no">auto</code> » utiliza una instantánea en Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Fuerza el uso de « <code translate="no">binlog</code> » y habilita la copia de seguridad RBAC</td><td>Mantiene una copia de seguridad en formato binlog para su posterior restauración</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Fuerza la función « <code translate="no">binlog</code> », « <code translate="no">bulk_flush</code> », la copia de seguridad RBAC y los metadatos adicionales de los índices</td><td>Inicializa un servidor secundario en una topología de replicación configurada</td></tr>
</tbody>
</table>
<p>Por ejemplo:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Una configuración preestablecida anula los valores conflictivos de las opciones que corrige. Por ejemplo, « <code translate="no">--for archive --format snapshot</code> » genera una copia de seguridad en formato binlog. Realizar una copia de seguridad de los metadatos de RBAC no implica su restauración automática; utiliza la opción « <code translate="no">--rbac</code> » del comando de restauración cuando sea necesario.</p>
<p><code translate="no">secondary</code> no es un atajo para la restauración habitual entre instancias. También requiere acceso al etcd de origen para los metadatos del índice, los ID y canales correctos del clúster de replicación, y un destino secundario nuevo. La copia de seguridad debe conservar todos sus metadatos, incluido <code translate="no">meta/full_meta.json</code>. La configuración de la replicación y la ejecución de la conmutación por error quedan fuera del alcance de esta guía. Consulte el <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">código fuente y la documentación de referencia de la versión 0.6.0</a> para conocer la implementación y los requisitos específicos de dicha versión.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Conserve la copia de seguridad completa<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Una copia de seguridad se almacena en <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. Conserve todos los objetos de este directorio. Las copias de seguridad de instantáneas incluyen un paquete exportado, además de los metadatos.</p>
<p>No copies solo los archivos de metadatos ni des por sentado que una copia de seguridad de instantánea tiene la misma estructura que una copia de seguridad de binlog.</p>
<h2 id="Restore-data" class="common-anchor-header">Restaurar los datos<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Restaura <code translate="no">coll</code> como <code translate="no">coll_bak</code> en la instancia configurada:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>En la CLI, « <code translate="no">--filter</code> » coincide con los nombres <strong>tras</strong> aplicar « <code translate="no">-s</code> » o « <code translate="no">--rename</code> ». Un comando con « <code translate="no">--filter coll -s _bak</code> » no coincide con nada y puede finalizar correctamente sin restaurar ninguna colección.</p>
<p>Para restaurar utilizando el nombre original, elija un destino en el que no exista ese nombre de colección, dirija la configuración a ese destino y a la ubicación de la copia de seguridad, y omita el sufijo:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Para ver un ejemplo completo en la misma instancia, consulta <a href="/docs/es/snapshot-backup-and-restore.md">«Copia de seguridad y restauración de instantáneas en una misma instancia</a>». Las páginas existentes sobre casos comunes entre instancias utilizan la configuración de Backup 0.5.16 y v1; no apliques sus comandos sin modificaciones a la versión 0.6.0. Para la configuración de transferencia de la versión 0.6.0, consulta <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">la guía de transferencia correspondiente a esa versión</a>.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">Verifica los datos restaurados<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Confirme que existe <code translate="no">coll_bak</code>. Si la restauración no ha recreado su índice vectorial, cree el índice adecuado para su esquema antes de cargar la colección. Compare su esquema, el recuento de entidades, los valores escalares y vectoriales, y los resultados de búsqueda conocidos con la línea de base capturada antes de la copia de seguridad.</p>
<p>Para el conjunto de datos desechable de 256 entidades, utilice las comprobaciones completas descritas en <a href="/docs/es/snapshot-backup-and-restore.md#Verify-the-result">«Verificar el resultado</a>». El mero hecho de que un comando se ejecute con éxito no garantiza que se hayan restaurado los datos esperados.</p>
