---
id: milvus_backup_api.md
summary: Découvrez comment utiliser Milvus Backup via l'API
title: >-
  Sauvegarde et restauration des données à l'aide des APICompatible with Milvus
  Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Sauvegarde et restauration des données à l'aide des API<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Pour les workflows actuels, consultez le <a href="/docs/fr/milvus_backup_0_6_api.md">guide de l'API HTTP</a> ou <a href="/docs/fr/milvus_backup_upgrade.md">effectuez une mise à niveau à partir de la version 0.5.x</a>. Consultez la <a href="/docs/fr/milvus_backup_overview.md#Compatibility-matrix">matrice de compatibilité</a> pour connaître les versions prises en charge du serveur Milvus.</p>
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
<p>Téléchargez le binaire correspondant à votre système d'exploitation et à votre architecture à partir de la <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">version 0.5.16</a>. Utilisez la configuration 0.5.16 et les exemples correspondants disponibles sur cette page.</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">Démarrer le serveur API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez ensuite démarrer le serveur API comme suit :</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>Par défaut, le serveur API écoute sur le port 8080. Vous pouvez modifier ce port en l'exécutant avec l'option « <code translate="no">-p</code> ». Pour démarrer le serveur API sur le port 443, procédez comme suit :</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez accéder à l'interface utilisateur Swagger via http://localhost :<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>Si vous exécutez une instance Milvus locale vide écoutant sur le port par défaut 19530, utilisez les exemples de scripts Python pour générer des données dans votre instance. N’hésitez pas à apporter les modifications nécessaires aux scripts pour les adapter à vos besoins.</p>
<p>Procurez-vous les <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">scripts</a>. Exécutez-les ensuite pour générer les données. Assurez-vous que <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, le SDK Python officiel de Milvus, a bien été installé.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>Notez que l’exécution de Milvus Backup sur une instance Milvus n’affecte normalement pas le fonctionnement de l’instance. Votre instance Milvus reste pleinement opérationnelle pendant la sauvegarde ou la restauration.</p>
<p>Exécutez la commande suivante pour créer une sauvegarde. Remplacez <code translate="no">collection_names</code> et <code translate="no">backup_name</code> si nécessaire.</p>
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
<p>La requête de création est asynchrone. Interrogez <code translate="no">get_backup</code> en utilisant l’ <code translate="no">requestId</code> renvoyée comme <code translate="no">backup_id</code> et attendez que <code translate="no">data.state_code</code> devienne <code translate="no">2</code> avant de procéder à la restauration.</p>
<p>Vous pouvez lister les sauvegardes dans le compartiment spécifié dans les paramètres Minio comme suit :</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Récupérez les métadonnées de la sauvegarde comme suit :</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Remplacez <code translate="no">backup_id</code> et <code translate="no">backup_name</code> par les valeurs correspondant à votre sauvegarde. Ce point de terminaison renvoie des métadonnées au format JSON, et non les fichiers de sauvegarde. Copiez l’intégralité du répertoire de sauvegarde depuis le stockage d’objets lors de son archivage.</p>
<p>Vous pouvez désormais enregistrer les fichiers de sauvegarde dans un emplacement sûr en vue d’une restauration ultérieure, ou les télécharger sur <a href="https://cloud.zilliz.com">Zilliz Cloud</a> pour créer une base de données vectorielle gérée contenant vos données. Pour plus de détails, consultez la section « <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migration de Milvus vers Zilliz Cloud</a> ».</p>
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
<p>Vous pouvez appeler la commande API de restauration avec l’option « <code translate="no">collection_suffix</code> » pour créer une nouvelle collection en restaurant les données à partir de la sauvegarde. Modifiez <code translate="no">collection_names</code> et <code translate="no">backup_name</code> si nécessaire.</p>
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
<p>L’option <code translate="no">collection_suffix</code> vous permet de définir un suffixe pour la nouvelle collection à créer. La commande ci-dessus créera une nouvelle collection nommée <strong>hello_milvus_recover</strong> dans votre instance Milvus.</p>
<p>Si vous préférez restaurer la collection sauvegardée sans modifier son nom, supprimez la collection avant de la restaurer à partir de la sauvegarde. Vous pouvez désormais nettoyer les données générées lors de l’étape « <a href="#Prepare-data">Préparation des données</a> » en exécutant la commande suivante.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Exécutez ensuite la commande suivante pour restaurer les données à partir de la sauvegarde.</p>
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
<p>Le processus de restauration peut prendre un certain temps selon la taille des données à restaurer. C’est pourquoi les exemples ci-dessus utilisent l’exécution asynchrone avec ` <code translate="no">&quot;async&quot;: true</code>`. Vous pouvez vérifier l’état d’une tâche de restauration en exécutant :</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>N’oubliez pas de remplacer <code translate="no">test_restore_id</code> par l’ <code translate="no">data.id</code> renvoyé par l’API de restauration. Attendez que <code translate="no">data.state_code</code> passe à <code translate="no">2</code> avant de vérifier les données ; <code translate="no">3</code> indique un échec et <code translate="no">4</code> un délai d’expiration.</p>
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
    </button></h2><p>Une fois la tâche réussie, vérifiez que <code translate="no">hello_milvus_recover</code> existe. Créez un index adapté, chargez la collection, puis comparez le nombre d’entités, les valeurs scalaires et vectorielles, ainsi que les résultats de recherche avec les données source capturées avant la sauvegarde. Pour une restauration sous le nom d’origine, utilisez plutôt <code translate="no">hello_milvus</code>.</p>
<p>L’exemple <code translate="no">verify_data.py</code> lié au guide de l’interface CLI prévoit deux collections restaurées et les supprime à la fin. Il n’est pas adapté à cet exemple d’API, qui sélectionne uniquement <code translate="no">hello_milvus</code>.</p>
