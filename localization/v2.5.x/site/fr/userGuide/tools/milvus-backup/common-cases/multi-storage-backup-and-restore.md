---
id: multi-storage-backup-and-restore.md
summary: >-
  Cette rubrique détaille le processus de sauvegarde d'une collection à partir
  d'une instance Milvus et sa restauration dans une autre instance.
title: Migration entre instances à travers des environnements S3
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">Migration entre instances à travers des environnements S3<button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique détaille le processus de sauvegarde d'une collection à partir d'une instance Milvus et sa restauration dans une autre, chaque instance utilisant un stockage d'objets différent.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme ci-dessous illustre le processus de sauvegarde et de restauration à l'aide de différents stockages d'objets.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>multi-storage-backup-and-restore.png</span> </span></p>
<p>Supposons que nous ayons deux instances Milvus, <code translate="no">milvus_A</code> et <code translate="no">milvus_B</code>, qui utilisent un stockage d'objets différent. Dans cet exemple, notre objectif est de réaliser les tâches suivantes :</p>
<ol>
<li><p>Créer une sauvegarde (my_backup) pour la collection <code translate="no">coll</code> dans <code translate="no">bucket_A</code> du stockage d'objets de<code translate="no">milvus_A</code>.</p></li>
<li><p>Transférer la sauvegarde my_backup vers <code translate="no">bucket_B</code> du stockage d'objets <code translate="no">milvus_B</code>.</p></li>
</ol>
<p>Dans <code translate="no">bucket_B</code>, restaurez la sauvegarde et nommez la collection restaurée coll_bak.</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>S'assurer que l'outil <strong>milvus-backup</strong> est installé.</p></li>
<li><p>Se familiariser avec la configuration des paramètres de stockage d'objets Milvus. Pour plus de détails, voir <a href="https://milvus.io/docs/deploy_s3.md">Stockage d'objets</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Sauvegarde d'une collection à partir de milvus_A<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Etape 1 : Préparer la configuration</h3><p>Aller dans le répertoire du projet milvus-backup et créer un répertoire nommé configs :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>Télécharger le fichier de configuration de sauvegarde <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>La structure du fichier ressemble à ceci :</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Étape 2 : Éditer le fichier de configuration</h3><p>Modifiez le fichier <code translate="no">backup.yaml</code> pour définir les configurations appropriées pour milvus_A :</p>
<ul>
<li><p>Connexion configs</p>
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
<li><p><code translate="no">milvus.address</code>: Adresse IP ou nom d'hôte du serveur milvus_A.</p></li>
<li><p><code translate="no">milvus.port</code>: Port TCP sur lequel le serveur Milvus écoute (par défaut 19530).</p></li>
</ul></li>
<li><p>Configurations de stockage (paramètres MinIO/S3)</p>
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
<li><p><code translate="no">minio.bucketName</code>: Nom du seau utilisé pour le stockage des données dans milvus_A. Dans cet exemple, il s'agit de <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Chemin racine dans le seau où les données de milvus_A sont stockées. Dans cet exemple, il s'agit de <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Nom du seau utilisé pour le stockage de sauvegarde. Dans cet exemple, il s'agit de <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Chemin racine dans le seau désigné pour le stockage des fichiers de sauvegarde dans <code translate="no">milvus_B</code>. Dans cet exemple, il s'agit de <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Étape 3 : Création de la sauvegarde</h3><p>Une fois le fichier backup.yaml enregistré, créez une sauvegarde nommée <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Cette commande crée la sauvegarde <code translate="no">bucket_A/backup/my_backup</code> dans le stockage d'objets de <code translate="no">milvus_A</code>.</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">Transférer manuellement la sauvegarde vers milvus_B<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p>Étant donné que <code translate="no">milvus_A</code> et <code translate="no">milvus_B</code> utilisent un stockage d'objets différent, vous devez télécharger manuellement la sauvegarde à partir du stockage de milvus_A et la charger dans le stockage de<code translate="no">milvus_B</code>.</p>
<p><strong>Utilisation de la console MinIO</strong></p>
<ol>
<li><p>Connectez-vous à la console MinIO.</p></li>
<li><p>Localisez le seau spécifié dans minio.address pour milvus_A.</p></li>
<li><p>Sélectionnez les fichiers de sauvegarde dans le seau.</p></li>
<li><p>Cliquez sur <strong>Télécharger</strong> pour télécharger les fichiers sur votre machine.</p></li>
</ol>
<p><strong>Utilisation du client mc</strong></p>
<p>Vous pouvez également utiliser le <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">client mc</a> pour télécharger les fichiers de sauvegarde :</p>
<ol>
<li>Configurez un hôte MinIO :</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta"># configure a Minio host</span>
mc <span class="hljs-keyword">alias</span> <span class="hljs-keyword">set</span> my_minio https:<span class="hljs-comment">//&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Dresser la liste des buckets disponibles :</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Télécharger un conteneur de manière récursive :</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Une fois les fichiers de sauvegarde téléchargés, vous pouvez les télécharger vers le stockage d'objets utilisé par <code translate="no">milvus_B</code> pour une restauration ultérieure. Vous pouvez également télécharger la sauvegarde vers <a href="https://cloud.zilliz.com/">Zilliz Cloud</a> pour créer une base de données vectorielle gérée avec vos données. Pour plus de détails, voir <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrer de Milvus vers Zilliz Cloud</a>.</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">Restauration à partir de la sauvegarde vers milvus_B<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Étape 1 : Configuration des paramètres de restauration</h3><p>Répétez l'étape 2 pour modifier les configurations pour la restauration vers <code translate="no">milvus_B</code>, en vous assurant que <code translate="no">minio.bucketName</code> est défini sur <code translate="no">bucket_B</code>.</p>
<p>Voici un exemple de configuration :</p>
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
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">Étape 2 : Restauration à partir de la sauvegarde</h3><p>Restaurer la sauvegarde sur <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Cette commande restaure la sauvegarde dans une nouvelle collection nommée coll_bak dans<code translate="no">milvus_B</code>, avec des données stockées dans <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code> dans le stockage d'objets de <code translate="no">milvus_B</code>.</p>
