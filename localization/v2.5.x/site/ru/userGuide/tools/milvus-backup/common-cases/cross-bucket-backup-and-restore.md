---
id: cross-bucket-backup-and-restore.md
summary: >-
  В этой теме описывается процесс резервного копирования коллекции из одного
  экземпляра Milvus и ее восстановления в другом экземпляре.
title: Миграция между экземплярами с использованием разных ведер
---
<h1 id="Migrate-Between-Instances-Across-Buckets" class="common-anchor-header">Миграция между экземплярами с использованием разных ведер<button data-href="#Migrate-Between-Instances-Across-Buckets" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается процесс резервного копирования коллекции из одного экземпляра Milvus и ее восстановления в другом экземпляре, причем каждый экземпляр использует разные ведра в одном и том же хранилище объектов.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>На диаграмме ниже показан процесс резервного копирования и восстановления с использованием разных ведер в одном объектном хранилище.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cross-bucket-backup-and-restore.png" alt="cross-bucket-backup-and-restore.png" class="doc-image" id="cross-bucket-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>cross-bucket-backup-and-restore.png</span> </span></p>
<p>Предположим, что у нас есть два экземпляра Milvus, <code translate="no">milvus_A</code> и <code translate="no">milvus_B</code>, оба используют стандартный механизм хранения MinIO для хранения объектов. Эти экземпляры используют разные ведра bucket_A и <code translate="no">bucket_B</code> в одном и том же объектном хранилище. В этом примере нам необходимо выполнить следующие задачи:</p>
<ol>
<li><p>Создать резервную копию (<code translate="no">my_backup</code>) для коллекции <code translate="no">coll</code> в <code translate="no">bucket_A</code> и сохранить ее в <code translate="no">bucket_B</code>.</p></li>
<li><p>В <code translate="no">bucket_B</code> восстановите из резервной копии и назовите восстановленную коллекцию <code translate="no">coll_bak</code>.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия**<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Убедитесь, что инструмент <strong>milvus-backup</strong> установлен.</p></li>
<li><p>Ознакомьтесь с настройкой параметров объектного хранилища Milvus. Подробные сведения см. в разделе <a href="https://milvus.io/docs/deploy_s3.md">Объектное хранилище</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Резервное копирование коллекции из milvus_A<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Шаг 1: Подготовьте конфигурацию</h3><p>Перейдите в каталог проекта milvus-backup и создайте каталог с именем configs:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>Загрузите резервный файл конфигурации <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Структура файла выглядит следующим образом:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Шаг 2: Редактирование файла конфигурации</h3><p>Измените файл backup.yaml, чтобы установить соответствующие конфигурации для<code translate="no">milvus_A</code>:</p>
<ul>
<li><p>Конфиги подключения</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_A
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: IP-адрес или имя хоста сервера <code translate="no">milvus_A</code>.</p></li>
<li><p><code translate="no">milvus.port</code>: TCP-порт, на котором прослушивается сервер Milvus (по умолчанию 19530).</p></li>
</ul></li>
<li><p>Конфигурации хранилища (настройки MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: localhost <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: Имя ведра, используемого для хранения данных в <code translate="no">milvus_A</code>. В данном примере установлено значение <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Корневой путь внутри ведра, в котором хранятся данные из <code translate="no">milvus_A</code>. В данном примере установлено значение <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Имя ведра, используемого для хранения резервных копий в<code translate="no">milvus_B</code>. В этом примере <code translate="no">milvus_A</code> и <code translate="no">milvus_B</code> используют разные ведра. Поэтому установите значение <code translate="no">bucket_B</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Корневой путь в ведре, предназначенном для хранения файлов резервных копий в <code translate="no">milvus_B</code>. В данном примере установите значение <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Шаг 3: Создание резервной копии</h3><p>После сохранения файла backup.yaml создайте резервную копию с именем <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Эта команда создает резервную копию <code translate="no">bucket_B/backup/my_backup</code> в объектном хранилище для коллекции coll.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">Восстановление резервной копии на milvus_B<button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Шаг 1: Настройте параметры восстановления</h3><p>Повторите шаг 2, чтобы изменить конфигурацию для восстановления на <code translate="no">milvus_B</code>, убедившись, что <code translate="no">minio.bucketName</code> установлен на <code translate="no">bucket_B</code>.</p>
<p>Вот пример конфигурации:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_B
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: localhost <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">Шаг 2: Восстановление резервной копии</h3><p>Восстановите резервную копию на <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Эта команда восстанавливает резервную копию в новую коллекцию с именем <code translate="no">coll_bak</code> в <code translate="no">milvus_B</code>, с данными, хранящимися в <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code>.</p>
