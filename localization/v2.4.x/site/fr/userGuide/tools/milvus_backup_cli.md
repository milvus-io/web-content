---
id: milvus_backup_cli.md
summary: Apprendre à utiliser Milvus Backup via CLI
title: Sauvegarde et restauration des données à l'aide de commandes
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Sauvegarde et restauration de données à l'aide de commandes<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup propose des fonctions de sauvegarde et de restauration des données afin de garantir la sécurité de vos données Milvus.</p>
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
    </button></h2><p>Vous pouvez télécharger le binaire compilé ou construire à partir de la source.</p>
<p>Pour télécharger le binaire compilé, rendez-vous sur la page des <a href="https://github.com/zilliztech/milvus-backup/releases">versions</a>, où vous trouverez toutes les versions officielles. N'oubliez pas de toujours utiliser les binaires de la version marquée comme la <strong>plus récente</strong>.</p>
<p>Pour compiler à partir des sources, procédez comme suit :</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Préparer le fichier de configuration<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Téléchargez le <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">fichier de configuration d'exemple</a> et adaptez-le à vos besoins.</p>
<p>Créez ensuite un dossier à côté du binaire Milvus Backup téléchargé ou construit, nommez le dossier <code translate="no">configs</code> et placez le fichier de configuration dans le dossier <code translate="no">configs</code>.</p>
<p>La structure de votre dossier doit être similaire à la suivante :</p>
<pre>
workspace ├── milvus-backup └── configs └── backup.yaml</pre>
<p>Milvus Backup ne pouvant pas sauvegarder vos données sur un chemin local, assurez-vous que les paramètres Minio sont corrects lorsque vous adaptez le fichier de configuration.</p>
<div class="alert note">
<p>Le nom du seau Minio par défaut varie en fonction de la manière dont vous installez Milvus. Lorsque vous modifiez les paramètres Minio, reportez-vous au tableau suivant.</p>
<table>
<thead>
<tr><th>champ</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>Milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>fichiers</td><td>fichier</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Préparer les données<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Si vous exécutez une instance locale vide de Milvus au port par défaut, utilisez les scripts Python d'exemple pour générer des données dans votre instance. N'hésitez pas à apporter les modifications nécessaires aux scripts pour les adapter à vos besoins.</p>
<p>Obtenez les <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">scripts</a>. Exécutez ensuite les scripts pour générer les données. Assurez-vous que <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, le SDK Python officiel de Milvus, a été installé.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Cette étape est facultative. Si vous la sautez, assurez-vous que vous avez déjà des données dans votre instance Milvus.</p>
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
    </button></h2><p>Notez que l'exécution de Milvus Backup sur une instance Milvus n'affectera normalement pas le fonctionnement de l'instance. Votre instance Milvus est entièrement fonctionnelle pendant la sauvegarde ou la restauration.</p>
<div class="tab-wrapper"></div>
<p>Exécutez la commande suivante pour créer une sauvegarde.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Une fois la commande exécutée, vous pouvez vérifier les fichiers de sauvegarde dans le bac spécifié dans les paramètres de Minio. Plus précisément, vous pouvez les télécharger à l'aide de la <strong>console Minio</strong> ou du client <strong>mc</strong>.</p>
<p>Pour télécharger à partir de la console <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio</a>, connectez-vous à la console Minio, localisez le bac spécifié dans <code translate="no">minio.address</code>, sélectionnez les fichiers dans le bac et cliquez sur <strong>Télécharger</strong> pour les télécharger.</p>
<p>Si vous préférez <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">utiliser le client mc</a>, procédez comme suit :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez maintenant enregistrer les fichiers de sauvegarde dans un endroit sûr pour les restaurer ultérieurement ou les télécharger vers <a href="https://cloud.zilliz.com">Zilliz Cloud</a> pour créer une base de données vectorielle gérée avec vos données. Pour plus de détails, reportez-vous à la section <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrer de Milvus vers Zilliz Cloud</a>.</p>
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
<p>Vous pouvez exécuter la commande <code translate="no">restore</code> avec l'option <code translate="no">-s</code> pour créer une nouvelle collection en restaurant les données de la sauvegarde :</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>L'option <code translate="no">-s</code> vous permet de définir un suffixe pour la nouvelle collection à créer. La commande ci-dessus créera une nouvelle collection appelée <strong>hello_milvus_recover</strong> dans votre instance Milvus.</p>
<p>Si vous préférez restaurer la collection sauvegardée sans changer son nom, supprimez la collection avant de la restaurer à partir de la sauvegarde. Vous pouvez maintenant nettoyer les données générées dans <a href="#Prepare-data">Prepare data</a> en exécutant la commande suivante.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
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
    </button></h2><p>Une fois la restauration terminée, vous pouvez vérifier les données restaurées en indexant la collection restaurée comme suit :</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Notez que le script ci-dessus suppose que vous avez exécuté la commande <code translate="no">restore</code> avec l'indicateur <code translate="no">-s</code> et que le suffixe est défini sur <code translate="no">-recover</code>. N'hésitez pas à modifier le script en fonction de vos besoins.</p>
