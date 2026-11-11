---
id: shared-bucket-backup-and-restore.md
summary: >-
  En este tema se describe detalladamente el proceso para realizar una copia de
  seguridad de una colección desde una instancia de Milvus y restaurarla en
  otra, utilizando un depósito compartido para el almacenamiento de objetos.
title: >-
  Migración entre instancias de un mismo depósito (rutas raíz
  diferentes)Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="common-anchor-header">Migración entre instancias de un mismo depósito (rutas raíz diferentes)<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="anchor-icon" translate="no">
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
    </button></h1><p>Para conocer los flujos de trabajo actuales, consulta la <a href="/docs/es/milvus_backup_0_6_cli.md">guía de la CLI</a> o <a href="/docs/es/milvus_backup_upgrade.md">actualiza desde la versión 0.5.x</a>. Consulta la <a href="/docs/es/milvus_backup_overview.md#Compatibility-matrix">matriz de compatibilidad</a> para conocer las versiones del servidor Milvus compatibles.</p>
<p>En este tema se detalla el proceso para realizar una copia de seguridad de una colección desde una
instancia de Milvus y restaurarla en otra, utilizando un depósito compartido
para el almacenamiento de objetos, con rutas raíz distintas para cada instancia.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente diagrama ilustra el proceso de copia de seguridad y restauración utilizando un
depósito compartido.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/shared-bucket-backup-and-restore.png" alt="shared-bucket-backup-and-restore.png" class="doc-image" id="shared-bucket-backup-and-restore.png" /> 
   <span>shared-bucket-backup-and-restore.png</span>
  
 </span></p>
<p>Supongamos que tenemos las instancias de Milvus <code translate="no">milvus_A</code> y <code translate="no">milvus_B</code>, ambas utilizando
el motor de almacenamiento predeterminado de MinIO para el almacenamiento de objetos. Estas instancias
comparten el mismo bucket, <code translate="no">bucket_A</code>, pero almacenan sus datos en rutas raíz
diferentes: <code translate="no">files_A</code> para <code translate="no">milvus_A</code> y files_B para <code translate="no">milvus_B</code>. En este ejemplo,
nuestro objetivo es completar las siguientes tareas:</p>
<ol>
<li><p>Crear una copia de seguridad (my_backup) de la colección «coll» que se almacene en la
ruta<code translate="no">files_A</code> para <code translate="no">milvus_A</code>.</p></li>
<li><p>Restaurar a partir de la copia de seguridad y almacenarla en files_B para <code translate="no">milvus_B</code>.</p></li>
</ol>
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
<li><p>Instala <strong>Milvus Backup 0.5.16</strong> siguiendo la <a href="/docs/es/milvus_backup_cli.md#Obtain-Milvus-Backup">guía de la CLI 0.5.x</a>.</p></li>
<li><p>Familiarícese con la configuración de los ajustes de almacenamiento de objetos de Milvus.
Para obtener más detalles, consulte <a href="https://milvus.io/docs/deploy_s3.md">Almacenamiento</a> de <a href="https://milvus.io/docs/deploy_s3.md">objetos.</a></p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Realizar una copia de seguridad de una colección desde <code translate="no">milvus_A</code><button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Paso 1: Preparar la configuración<button data-href="#Step-1-Prepare-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Vaya al directorio del proyecto milvus-backup y cree un directorio
denominado « <code translate="no">configs</code> ». Ejecute los siguientes comandos desde el directorio que contiene « <code translate="no">milvus-backup</code> »:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Descarga el archivo de configuración de la copia de seguridad backup.yaml:</p>
<pre><code translate="no" class="language-shell">wget -O configs/backup.yaml https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>La estructura del archivo es la siguiente:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Paso 2: Editar el archivo de configuración<button data-href="#Step-2-Edit-configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>El código YAML que se muestra a continuación indica los campos que hay que editar en el archivo v1 descargado. Mantén el resto de ajustes necesarios. Dirija <code translate="no">milvus.address</code> y <code translate="no">milvus.port</code> a la instancia de la que se va a realizar la copia de seguridad o la restauración. Establezca <code translate="no">minio.backupAddress</code>, <code translate="no">minio.backupPort</code> y <code translate="no">minio.backupStorageType</code> como destino de la copia de seguridad, y <code translate="no">backup.gcPause.address</code> como punto final de gestión de Milvus de origen (puerto 9091 por defecto). Sustituya todas las direcciones, nombres de buckets, rutas y credenciales de ejemplo por la configuración de su implementación.</p>
<p>Modifica el archivo backup.yaml para establecer las configuraciones adecuadas para
<code translate="no">milvus_A</code>:</p>
<ul>
<li><p>Configuración de conexión</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: dirección IP o nombre de host del servidor <code translate="no">milvus_A</code>.</p></li>
<li><p><code translate="no">milvus.port</code>: Puerto TCP en el que el servidor de Milvus está a la escucha (por defecto
19530).</p></li>
</ul></li>
<li><p>Configuraciones de almacenamiento (ajustes de MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_A&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># Backup storage credentials</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">minio.bucketName</code>: Nombre del bucket utilizado para el almacenamiento de <code translate="no">milvus_A</code>. En este
ejemplo, configúralo como <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Ruta raíz dentro del bucket donde se almacenan los datos de <code translate="no">milvus_A</code>. En este ejemplo, se ha establecido en <code translate="no">files_A</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Nombre del depósito utilizado para el almacenamiento. En este
ejemplo, <code translate="no">milvus_A</code> y <code translate="no">milvus_B</code> comparten el depósito. Por lo tanto, configúralo como
<code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Ruta raíz dentro del depósito designada para almacenar los archivos de copia de seguridad en <code translate="no">milvus_B</code>. En este ejemplo, utilice una ruta diferente a la de <code translate="no">milvus_A</code>. Por lo tanto, establezca el valor en <code translate="no">backup</code>.</p></li>
</ul></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Paso 3: Crear una copia de seguridad<button data-href="#Step-3-Create-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez guardado <code translate="no">backup.yaml</code>, crea una copia de seguridad con el nombre my_backup:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Este comando crea la copia de seguridad <code translate="no">bucket_A/backup/my_backup</code> en el almacenamiento de objetos
para la colección <code translate="no">coll</code>.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">Restaura la copia de seguridad en <code translate="no">milvus_B</code><button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Paso 1: Configurar los ajustes de restauración<button data-href="#Step-1-Configure-restoration-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Repite el paso
2 para modificar las configuraciones de restauración de « <code translate="no">milvus_B</code> », asegurándote de que « <code translate="no">minio.bucketName</code> » esté configurado como « <code translate="no">bucket_A</code> » y « <code translate="no">minio.rootPath</code> » como « <code translate="no">files_B</code> » para distinguir las ubicaciones de almacenamiento entre las dos instancias.</p>
<p>A continuación se muestra un ejemplo de configuración:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_B&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">Paso 2: Restaurar la copia de seguridad<button data-href="#Step-2-Restore-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Restaura la copia de seguridad en <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Este comando restaura la copia de seguridad en una nueva colección denominada <code translate="no">coll_bak</code> en <code translate="no">milvus_B</code>, utilizando la raíz de almacenamiento configurada de la instancia de destino: <code translate="no">bucket_A/files_B</code>.</p>
<p>En Backup 0.5.16, la opción obsoleta « <code translate="no">-c</code> » selecciona el nombre de la colección en la copia de seguridad, antes de que se aplique « <code translate="no">_bak</code> ». La sustitución de « <code translate="no">--filter</code> » en la versión 0.6.0 utiliza el nombre de destino en su lugar; véase <a href="/docs/es/milvus_backup_upgrade.md#Update-CLI-commands">«Actualizar comandos de la CLI</a>».</p>
<p>Tras la restauración, compruebe que <code translate="no">coll_bak</code> existe, cree un índice vectorial adecuado si es necesario y compare su recuento de entidades, valores representativos y resultados de búsqueda con una línea de base capturada antes de la copia de seguridad. El mero hecho de que el comando se ejecute correctamente no garantiza la veracidad de los datos.</p>
