---
id: milvus_backup_cli.md
summary: >-
  Découvrez comment utiliser Milvus Backup via l'interface de ligne de commande
  (CLI)
title: >-
  Sauvegarde et restauration des données à l'aide de commandesCompatible with
  Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Sauvegarde et restauration des données à l'aide de commandes<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Pour les workflows actuels, consultez le <a href="/docs/fr/milvus_backup_0_6_cli.md">guide de l'interface en ligne de commande (CLI)</a> ou <a href="/docs/fr/milvus_backup_upgrade.md">effectuez une mise à niveau à partir de la version 0.5.x</a>. Consultez la <a href="/docs/fr/milvus_backup_overview.md#Compatibility-matrix">matrice de compatibilité</a> pour connaître les versions prises en charge du serveur Milvus.</p>
<p>Milvus Backup offre des fonctionnalités de sauvegarde et de restauration des données afin de garantir la sécurité de vos données Milvus.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Obtenir Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez soit télécharger le binaire compilé, soit le compiler à partir du code source.</p>
<p>Téléchargez le binaire adapté à votre système d'exploitation et à votre architecture à partir de la <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">version 0.5.16</a>. Utilisez la configuration 0.5.16 correspondante et les exemples fournis sur cette page.</p>
<p>Pour compiler la version 0.5.16 à partir du code source, installez Go 1.25 ou une version ultérieure, puis exécutez :</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Préparez le fichier de configuration<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Téléchargez le <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">fichier de configuration d'exemple</a> et adaptez-le à vos besoins.</p>
<p>Créez ensuite un dossier à côté du binaire Milvus Backup téléchargé ou compilé, nommez ce dossier « <code translate="no">configs</code> » et placez le fichier de configuration dans le dossier « <code translate="no">configs</code> ».</p>
<p>Votre structure de dossiers doit ressembler à celle-ci :</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Cet exemple utilise MinIO comme stockage de sauvegarde. Configurez le dossier « <code translate="no">minio.*</code> » en fonction de votre stockage Milvus et de votre destination de sauvegarde, en incluant les adresses, les identifiants, les noms de buckets et les chemins d’accès racine.</p>
<div class="alert note">
<p>Le nom du bucket MinIO par défaut varie en fonction de la manière dont vous installez Milvus. Lorsque vous modifiez les paramètres MinIO, veuillez vous référer au tableau suivant.</p>
<table>
<thead>
<tr><th>Champ</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>fichiers</td><td>fichier</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Préparation des données<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Si vous exécutez une instance Milvus locale vide sur le port par défaut, utilisez les exemples de scripts Python pour générer des données dans votre instance. N'hésitez pas à modifier les scripts selon vos besoins.</p>
<p>Téléchargez les <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">scripts</a>. Exécutez-les ensuite pour générer les données. Assurez-vous que <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, le SDK Python officiel de Milvus, a bien été installé.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Cette étape est facultative. Si vous la sautez, assurez-vous de disposer déjà de données dans votre instance Milvus.</p>
<h2 id="Back-up-data" class="common-anchor-header">Sauvegarder les données<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Notez que l'exécution de Milvus Backup sur une instance Milvus n'affecte généralement pas le fonctionnement de celle-ci. Votre instance Milvus reste pleinement opérationnelle pendant la sauvegarde ou la restauration.</p>
<div class="tab-wrapper"></div>
<p>Exécutez la commande suivante pour créer une sauvegarde.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Une fois la commande exécutée, vous pouvez vérifier les fichiers de sauvegarde dans le compartiment spécifié dans les paramètres de Minio. Plus précisément, vous pouvez les télécharger à l’aide de <strong>la console Minio</strong> ou du client <strong>mc</strong>.</p>
<p>Pour les télécharger depuis <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">la console Minio</a>, connectez-vous à la console Minio, localisez le compartiment spécifié dans <code translate="no">minio.backupBucketName</code>, sélectionnez les fichiers dans le compartiment, puis cliquez sur <strong>« Télécharger »</strong> pour les récupérer.</p>
<p>Si vous préférez utiliser <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">le client mc</a>, procédez comme suit :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez désormais enregistrer les fichiers de sauvegarde dans un emplacement sûr en vue d’une restauration ultérieure, ou les télécharger vers <a href="https://cloud.zilliz.com">Zilliz Cloud</a> afin de créer une base de données vectorielle gérée contenant vos données. Pour plus de détails, consultez la section « <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migration de Milvus vers Zilliz Cloud</a> ».</p>
<h2 id="Restore-data" class="common-anchor-header">Restauration des données<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
<p>Vous pouvez exécuter la commande ` <code translate="no">restore</code> ` avec l’option ` <code translate="no">-s</code> ` pour créer une nouvelle collection en restaurant les données à partir de la sauvegarde :</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>L'indicateur ` <code translate="no">-s</code> ` vous permet de définir un suffixe pour la nouvelle collection à créer. La commande ci-dessus créera une nouvelle collection nommée ` <strong>hello_milvus_recover</strong> ` dans votre instance Milvus.</p>
<p>Si vous préférez restaurer la collection sauvegardée sans modifier son nom, supprimez-la avant de la restaurer à partir de la sauvegarde. Vous pouvez désormais nettoyer les données générées lors de <a href="#Prepare-data">la préparation des données</a> en exécutant la commande suivante.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Exécutez ensuite la commande suivante pour restaurer les données à partir de la sauvegarde.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">Vérification des données restaurées<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les données d’exemple jetables créées ci-dessus, le script en amont indexe et interroge <strong>les collections</strong> « <code translate="no">hello_milvus_recover</code> » et « <code translate="no">hello_milvus2_recover</code> », puis <strong>supprime les deux collections restaurées</strong>. N’exécutez-le qu’après avoir restauré les deux collections d’exemple à l’aide de la commande « <code translate="no">_recover</code> ». Pour vos propres données, comparez-les à votre référence au moment de la sauvegarde sans utiliser ce script de nettoyage.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Notez que le script ci-dessus part du principe que vous avez exécuté la commande <code translate="no">restore</code> avec l’indicateur <code translate="no">-s</code> et que le suffixe est défini sur <code translate="no">_recover</code>. N’hésitez pas à apporter les modifications nécessaires au script pour l’adapter à vos besoins.</p>
