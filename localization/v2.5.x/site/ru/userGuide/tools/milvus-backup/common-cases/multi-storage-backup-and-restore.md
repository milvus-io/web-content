---
id: multi-storage-backup-and-restore.md
summary: >-
  В этой теме описывается процесс резервного копирования коллекции из одного
  экземпляра Milvus и ее восстановления в другом экземпляре.
title: Миграция между экземплярами в средах S3
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">Миграция между экземплярами в средах S3<button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме подробно описывается процесс резервного копирования коллекции из одного экземпляра Milvus и ее восстановления в другом экземпляре, причем каждый экземпляр использует разные хранилища объектов.</p>
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
    </button></h2><p>На приведенной ниже диаграмме показан процесс резервного копирования и восстановления с использованием различных объектных хранилищ.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>multi-storage-backup-and-restore.png</span> </span></p>
<p>Предположим, что у нас есть два экземпляра Milvus, <code translate="no">milvus_A</code> и <code translate="no">milvus_B</code>, использующие разные хранилища объектов. В этом примере нам необходимо выполнить следующие задачи:</p>
<ol>
<li><p>Создать резервную копию (my_backup) для коллекции <code translate="no">coll</code> в <code translate="no">bucket_A</code> объектного хранилища<code translate="no">milvus_A</code>.</p></li>
<li><p>Перенести резервную копию my_backup на <code translate="no">bucket_B</code> из <code translate="no">milvus_B</code>'объектного хранилища.</p></li>
</ol>
<p>В <code translate="no">bucket_B</code> выполните восстановление из резервной копии и назовите восстановленную коллекцию coll_bak.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Ознакомьтесь с настройками объектного хранилища Milvus. Подробнее см. в разделе <a href="https://milvus.io/docs/deploy_s3.md">"Объектное хранилище</a>".</p></li>
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
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Шаг 2: Редактирование файла конфигурации</h3><p>Измените файл <code translate="no">backup.yaml</code>, чтобы установить соответствующие конфигурации для milvus_A:</p>
<ul>
<li><p>Connection configs</p>
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
<li><p><code translate="no">milvus.address</code>: IP-адрес или имя хоста сервера milvus_A.</p></li>
<li><p><code translate="no">milvus.port</code>: TCP-порт, на котором прослушивается сервер Milvus (по умолчанию 19530).</p></li>
</ul></li>
<li><p>Конфигурации хранилища (настройки MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: minio_A <span class="hljs-comment"># Address of MinIO/S3</span>
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
  
  backupBucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: Имя ведра, используемого для хранения данных в milvus_A. В данном примере установлено значение <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Корневой путь внутри ведра, где хранятся данные из milvus_A. В данном примере установлено значение <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Имя ведра, используемого для хранения резервных копий. В данном примере установлено значение <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Корневой путь в ведре, предназначенном для хранения файлов резервных копий <code translate="no">milvus_B</code>. В данном примере установлено значение <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Шаг 3: Создание резервной копии</h3><p>После сохранения файла backup.yaml создайте резервную копию с именем <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Эта команда создает резервную копию <code translate="no">bucket_A/backup/my_backup</code> в объектном хранилище <code translate="no">milvus_A</code>.</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">Вручную перенесите резервную копию на milvus_B<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p>Поскольку <code translate="no">milvus_A</code> и <code translate="no">milvus_B</code> используют разные объектные хранилища, вам нужно вручную загрузить резервную копию из хранилища milvus_A и выгрузить ее в хранилище<code translate="no">milvus_B</code>.</p>
<p><strong>Использование консоли MinIO</strong></p>
<ol>
<li><p>Войдите в консоль MinIO.</p></li>
<li><p>Найдите ведро, указанное в minio.address для milvus_A.</p></li>
<li><p>Выберите файлы резервных копий в этом ведре.</p></li>
<li><p>Нажмите <strong>Download</strong>, чтобы загрузить файлы на свой компьютер.</p></li>
</ol>
<p><strong>Использование клиента mc</strong></p>
<p>В качестве альтернативы можно использовать <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">клиент mc</a> для загрузки файлов резервных копий:</p>
<ol>
<li>Настройте хост MinIO:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta"># configure a Minio host</span>
mc <span class="hljs-keyword">alias</span> <span class="hljs-keyword">set</span> my_minio https:<span class="hljs-comment">//&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Список доступных ведер:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Загрузите ведро рекурсивно:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>После загрузки файлов резервных копий их можно загрузить в хранилище объектов, используемое <code translate="no">milvus_B</code>, для последующего восстановления. Кроме того, можно загрузить резервную копию в <a href="https://cloud.zilliz.com/">Zilliz Cloud</a>, чтобы создать управляемую векторную базу данных с вашими данными. Подробности см. в разделе <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Миграция из Milvus в Zilliz Cloud</a>.</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">Восстановление из резервной копии на milvus_B<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
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
  
  address: minio_B <span class="hljs-comment"># Address of MinIO/S3</span>
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">Шаг 2: Восстановление из резервной копии</h3><p>Восстановите резервную копию на <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Эта команда восстанавливает резервную копию в новую коллекцию с именем coll_bak в<code translate="no">milvus_B</code>, с данными, хранящимися в <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code> в хранилище объектов <code translate="no">milvus_B</code>.</p>