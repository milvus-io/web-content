---
id: milvus_backup_upgrade.md
summary: >-
  Mettre à niveau Milvus Backup de la version 0.5.x à la version 0.6.0, mettre à
  jour la configuration et les commandes, puis valider la sauvegarde et la
  restauration.
title: Mise à jour de Milvus Backup vers la version 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Mise à jour de Milvus Backup vers la version 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez ce guide pour mettre à niveau <strong>l’outil Milvus Backup</strong> de la version 0.5.x à la version 0.6.0. Cette mise à niveau ne concerne pas votre serveur Milvus. Si vous restez en version 0.5.x, continuez à utiliser le guide <a href="/docs/fr/milvus_backup_cli.md">CLI</a> ou <a href="/docs/fr/milvus_backup_api.md">API</a> de <a href="/docs/fr/milvus_backup_cli.md">la version 0.5.x</a>. Pour une nouvelle installation, utilisez le <a href="/docs/fr/milvus_backup_0_6_cli.md">guide de la version 0.6.0</a>.</p>
<p>Les configurations YAML de la version 1 sont toujours chargées via la traduction automatique. Cependant, les indicateurs CLI obsolètes sont rejetés dans la version 0.6.0, et le format de sauvegarde par défaut change avec Milvus 3.0. Vérifiez à la fois la configuration et les commandes avant de modifier les tâches planifiées ou les services.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Vérifiez le point de départ<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Notez la version de votre solution de sauvegarde, les versions source et cible de Milvus, les fichiers de configuration, les remplacements de variables d’environnement, l’emplacement de sauvegarde et les commandes utilisées par les scripts ou les services API. Vérifiez les <a href="/docs/fr/milvus_backup_overview.md#Compatibility-matrix">informations de compatibilité</a> pour ces versions de serveur.</p>
<p>Conservez le binaire d’origine, la configuration et les répertoires de sauvegarde existants pendant que vous validez la nouvelle installation. Téléchargez la version 0.6.0 dans un répertoire distinct à l’aide de <a href="/docs/fr/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">la section</a> « <a href="/docs/fr/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">Obtenir Milvus Backup</a> ». Toutes les commandes ci-dessous s’exécutent à partir de ce répertoire et appellent le binaire 0.6.0. Placez une copie de votre configuration v1 dans <code translate="no">configs/backup-v1.yaml</code>.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Migration de la configuration<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Une configuration v1 se charge toujours dans la version 0.6.0. Milvus Backup la convertit en v2 au démarrage et affiche un avertissement. Pour enregistrer la configuration convertie dans un fichier séparé :</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> rejette une configuration migrée non valide. Sans ` <code translate="no">--output</code>`, la commande écrit le YAML v2 sur la sortie standard. Ne consultez et n’utilisez le nouveau fichier qu’après avoir vérifié que tous les paramètres ont bien été convertis.</p>
<table>
<thead>
<tr><th>Paramètre v1</th><th>Paramètre v2</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Stockage source sous <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Stockage de sauvegarde sous <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Identifiants de stockage</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, avec un <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Vérifiez les variables d’environnement dans le cadre de la même modification que le fichier de configuration. La v2 n’accepte que les variables d’environnement prises en charge liées aux identifiants, telles que <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. Les anciens noms de la v1 ne sont pas appliqués à un fichier v2. Pour les paramètres non liés aux identifiants, tels que les noms de compartiments et les points de terminaison, utilisez YAML ou une redéfinition par clé de configuration :</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> signale les variables d’environnement concernées sans copier leurs valeurs secrètes dans le fichier de sortie. Voir <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">les variables d’environnement v2 prises en charge</a>. La commande ` <code translate="no">config show</code> ` remplace la commande obsolète ` <code translate="no">check config</code> `.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">Mise à jour des commandes CLI<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>Les indicateurs obsolètes dans la version 0.5 sont rejetés dans la version 0.6.0. Mettez à jour vos scripts avant de mettre à niveau le binaire.</p>
<table>
<thead>
<tr><th>Commande</th><th>Option supprimée</th><th>Remplacement</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, en utilisant les noms de cibles</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Supprimez l'indicateur ; <code translate="no">get</code> renvoie les informations de sauvegarde</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>Aucun filtre de collecte équivalent</td></tr>
</tbody>
</table>
<p>Par exemple, ces commandes de la version 0.5.16 sélectionnent le nom de la source « <code translate="no">coll</code> » :</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Leurs équivalents de la version 0.6.0 utilisent le nom de la cible pour la restauration :</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Un filtre de restauration qui ne correspond à rien peut se terminer avec succès sans créer de collection. Vérifiez toujours la collection cible et ses données. L’API HTTP « <code translate="no">collection_names</code> » sélectionne toujours les noms de source dans la sauvegarde ; consultez le <a href="/docs/fr/milvus_backup_0_6_api.md#Restore-data">guide de l’API 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Choisissez le comportement de sauvegarde<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>Sur les serveurs Milvus 2.x pris en charge, le format « <code translate="no">auto</code> » utilise le journal binaire (binlog). La mise à niveau de la sauvegarde ne nécessite pas le passage à Milvus 3.0.</li>
<li>Sous Milvus 3.0, la commande ` <code translate="no">auto</code> ` sélectionne le mode « snapshot ». La prise en charge officielle de la sauvegarde et de la restauration commence à partir de la version Milvus 3.0.1. Passez l'<code translate="no">--format binlog</code> ` pour conserver le comportement `binlog` lors de la création d'une sauvegarde.</li>
<li>La compatibilité de configuration avec la version 1 ne préserve pas les indicateurs de commande supprimés et ne remplace pas les valeurs par défaut du nouveau format.</li>
<li>Les préréglages de « Purpose » permettent de définir le format et d’autres options. Par exemple, l’option « <code translate="no">--for archive</code> » force l’utilisation du journal binaire même si l’option « <code translate="no">--format snapshot</code> » est également fournie. Vérifiez <a href="/docs/fr/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">les choix de format et d’objectif</a>.</li>
<li>Les collections externes sont ignorées lors de la sauvegarde. Vérifiez les métadonnées de la sauvegarde plutôt que de considérer la réussite de la tâche comme la preuve que toutes les collections ont été incluses.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Validez avant de changer de tâche<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>L’exemple suivant conserve le format du journal binaire et effectue la restauration dans une nouvelle collection. Remplacez « <code translate="no">coll</code> » par une collection dont vous avez enregistré le schéma, le nombre d’éléments, les valeurs scalaires et vectorielles, ainsi que les résultats de recherche. Utilisez un nouveau nom de sauvegarde et assurez-vous que le nom de destination « <code translate="no">coll_upgrade_check</code> » n’existe pas.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Vérifiez que la sauvegarde répertorie <code translate="no">coll</code> et que <code translate="no">coll_upgrade_check</code> existe après la restauration. Créez son index vectoriel si nécessaire, chargez-le, puis comparez les données restaurées et les résultats de recherche avec la référence enregistrée. Ne modifiez pas les données source pendant ce test.</p>
<p>Testez également une sauvegarde existante représentative avant de vous en servir avec le nouvel outil. Pour une sauvegarde 0.5.16 nommée <code translate="no">legacy_backup</code> contenant <code translate="no">coll</code>, utilisez un nom de cible distinct :</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ces parcours de mise à niveau ont été validés avec <strong>Milvus 2.6.11</strong>, une sauvegarde <strong>0.5.16 → 0.6.0</strong> et des sauvegardes de journaux binaires (binlog) dans MinIO. Les sauvegardes nouvellement créées et existantes ont toutes deux été restaurées avec des valeurs d'entité et des résultats de recherche vectorielle concordants. Cela ne garantit pas la compatibilité avec toutes les sauvegardes historiques ni la restauration de Milvus 2.x vers la version 3.0. Cela ne garantit pas non plus que la version 0.5.x puisse lire les sauvegardes créées par la version 0.6.0.</p>
<p>Une fois la validation réussie, mettez à jour les tâches afin d’utiliser conjointement le nouveau binaire, la configuration vérifiée, les paramètres d’environnement et les indicateurs de remplacement. Pour les déploiements via l’API, démarrez le nouveau service avec la configuration vérifiée et vérifiez l’achèvement des tâches via <a href="/docs/fr/milvus_backup_0_6_api.md">l’API HTTP 0.6.0</a>. Pour adopter les instantanés sur Milvus 3.0.1 ou une version ultérieure, suivez la procédure « <a href="/docs/fr/snapshot-backup-and-restore.md">Sauvegarde et restauration d’instantanés dans une seule instance</a> ».</p>
