---
id: milvus_backup_0_6_cli.md
summary: >-
  Configurez Milvus Backup 0.6.0, créez une sauvegarde et vérifiez les données
  restaurées à l'aide de l'interface en ligne de commande (CLI).
title: Utiliser Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Utiliser Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez Milvus Backup pour sauvegarder des collections et les restaurer dans la même instance Milvus ou dans une autre. Ce guide concerne <strong>Milvus Backup 0.6.0</strong>. La sauvegarde et la restauration sur Milvus 3.0 sont officiellement prises en charge à partir de <strong>la version Milvus 3.0.1</strong>. La version 0.6.0 de Milvus Backup prend également en charge les workflows binlog sur les versions 2.x de Milvus compatibles ; consultez <a href="/docs/fr/milvus_backup_overview.md#Compatibility-matrix">la page de compatibilité de Milvus Backup</a>.</p>
<p>Si vous utilisez encore la version 0.5.x de Backup, consultez le <a href="/docs/fr/milvus_backup_cli.md">guide de l’interface CLI 0.5.x</a>. Si vous effectuez une mise à niveau, suivez d’abord <a href="/docs/fr/milvus_backup_upgrade.md">la procédure de mise à niveau de Milvus Backup</a>.</p>
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
    </button></h2><p>Téléchargez le fichier binaire correspondant à votre système d’exploitation et à votre architecture à partir de la <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">version v0.6.0</a>, puis décompressez-le. Veillez à ce que le fichier binaire et les exemples de configuration proviennent de la même version.</p>
<p>Pour effectuer une compilation à partir du code source, installez <strong>Go 1.26 ou une version ultérieure</strong>, puis exécutez :</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>Le binaire précompilé ne nécessite pas Go. Exécutez toutes les commandes shell suivantes à partir du répertoire contenant « <code translate="no">milvus-backup</code> ».</p>
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
    </button></h2><p>Milvus Backup doit pouvoir accéder au point de terminaison gRPC de Milvus, à son point de terminaison de gestion, au stockage de l’instance et à la destination de sauvegarde. Pour les sauvegardes par instantané, le serveur Milvus doit également pouvoir accéder au stockage de sauvegarde.</p>
<p>Créez un répertoire de configuration :</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Enregistrez cet exemple MinIO sous le nom <code translate="no">configs/backup.yaml</code>. Remplacez les adresses, les identifiants, le bucket et le chemin racine par les paramètres de votre déploiement. Les identifiants <code translate="no">minioadmin</code> correspondent aux valeurs par défaut de test de MinIO.</p>
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
<li><code translate="no">milvus.grpc</code> se connecte à l’instance en cours de sauvegarde ou de restauration. Si l’authentification est activée, définissez également <code translate="no">milvus.user</code> et <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> est utilisé pour suspendre/reprendre le ramasse-miettes pendant la sauvegarde.</li>
<li><code translate="no">milvus.storage</code> doit correspondre au stockage d’objets réel de l’instance. La définition d’un compartiment ici ne modifie pas la configuration de Milvus.</li>
<li><code translate="no">backup.storage</code> identifie l’emplacement de la sauvegarde. Les champs non définis héritent de la valeur de <code translate="no">milvus.storage</code>, à l’exception de <code translate="no">rootPath</code>, dont la valeur par défaut est <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> sélectionne la copie côté stockage lorsque les backends correspondent et, dans le cas contraire, la transmission en continu via Milvus Backup. Ce paramètre contrôle le transfert des objets, et non le format de sauvegarde.</li>
</ul>
<p>Les valeurs par défaut typiques de stockage sont indiquées ci-dessous. Vérifiez les valeurs de votre déploiement en cours d’exécution avant de les utiliser.</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Compartiment</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Chemin racine</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Si le serveur Milvus utilise une adresse différente pour accéder au magasin de sauvegarde, définissez <code translate="no">backup.storage.milvusAddress</code> et <code translate="no">milvusPort</code> sur l’adresse accessible par le serveur. Pour l’authentification, le protocole TLS, les autres fournisseurs de stockage et les paramètres supplémentaires, consultez <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">l’exemple de configuration de la version 0.6.0</a>.</p>
<p>Vérifiez les valeurs effectives et contrôlez la connectivité :</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> masque les valeurs secrètes et indique la provenance de chaque valeur. Le test de connectivité doit indiquer <code translate="no">Success!</code>. Résolvez les erreurs de connexion ou de stockage avant de créer une sauvegarde.</p>
<p>Pour les configurations v1 existantes, consultez la section <a href="/docs/fr/milvus_backup_upgrade.md#Migrate-the-configuration">Mise à niveau de Milvus Backup</a>. La conversion automatique de la configuration ne remplace pas les indicateurs CLI supprimés.</p>
<h2 id="Prepare-data" class="common-anchor-header">Préparez les données<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez une collection existante nommée « <code translate="no">coll</code> » et assurez-vous que « <code translate="no">coll_bak</code> » n’existe pas. Enregistrez le schéma, le nombre d’entités, des valeurs scalaires et vectorielles représentatives, ainsi qu’un résultat de recherche connu avant la sauvegarde. Conservez les données d’exemple inchangées lors de la comparaison avec la copie restaurée. Pour créer à la place un petit ensemble de données jetable, utilisez <a href="/docs/fr/snapshot-backup-and-restore.md#Prepare-sample-data">«Préparer des données d’exemple</a>».</p>
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
    </button></h2><p>Créez une sauvegarde nommée de « <code translate="no">coll</code> » :</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>La commande create doit afficher <code translate="no">create backup success</code>. <code translate="no">get</code> renvoie les métadonnées de la sauvegarde ; vérifiez que la collection attendue est bien présente. L'omission de <code translate="no">--filter</code> permet de sauvegarder toutes les collections éligibles. Les collections externes sont ignorées.</p>
<p><code translate="no">--filter</code> Accepte des noms séparés par des virgules : « <code translate="no">coll</code> » dans la base de données par défaut, « <code translate="no">db1.coll</code> », ou « <code translate="no">'db1.*'</code> » pour toutes les collections d’une base de données. Mettez entre guillemets les expressions contenant « <code translate="no">*</code> » pour empêcher l’expansion du shell.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Choisissez un format de sauvegarde ou un objectif<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>Avec la valeur par défaut <code translate="no">--format auto</code>, Milvus 3.0 utilise des sauvegardes de type « snapshot » ; les serveurs Milvus 2.x pris en charge utilisent le journal binaire (binlog). Pour conserver explicitement le comportement du journal binaire, passez <code translate="no">--format binlog</code>. <a href="/docs/fr/snapshot-backup-and-restore.md">L’exemple de sauvegarde de type « snapshot »</a> sélectionne explicitement <code translate="no">--format snapshot</code>.</p>
<p>Utilisez ` <code translate="no">--for</code> ` lorsqu’un objectif correspond à votre workflow :</p>
<table>
<thead>
<tr><th>Objectif</th><th>Valeurs appliquées par le préréglage</th><th>Utilisation prévue</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Active la sauvegarde RBAC ; conserve vos choix de format et de stratégie</td><td>Copie des données vers une autre instance ; « <code translate="no">auto</code> » utilise un instantané sur Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Force l’ <code translate="no">binlog</code> et active la sauvegarde RBAC</td><td>Conserve une sauvegarde au format binlog en vue d’une restauration ultérieure</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Force l'<code translate="no">binlog</code>, l'<code translate="no">bulk_flush</code>, la sauvegarde RBAC et l'indexation des métadonnées supplémentaires</td><td>Initialiser un serveur secondaire dans une topologie de réplication configurée</td></tr>
</tbody>
</table>
<p>Par exemple :</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Un préréglage remplace les valeurs conflictuelles pour les options qu’il définit. Par exemple, « <code translate="no">--for archive --format snapshot</code> » génère une sauvegarde au format binlog. La sauvegarde des métadonnées RBAC n’entraîne pas automatiquement leur restauration ; utilisez l’option « <code translate="no">--rbac</code> » de la commande de restauration lorsque cela est nécessaire.</p>
<p><code translate="no">secondary</code> Ce n’est pas un raccourci pour une restauration inter-instances ordinaire. Cela nécessite également l’accès à l’etcd source pour les métadonnées d’index, des ID de cluster de réplication et des canaux corrects, ainsi qu’une nouvelle cible secondaire. La sauvegarde doit conserver l’intégralité de ses métadonnées, y compris ` <code translate="no">meta/full_meta.json</code>`. La configuration de la réplication et l’exécution du basculement ne font pas l’objet de ce guide. Consultez le <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">code source et la documentation de référence de la version 0.6.0</a> pour connaître l’implémentation et les exigences spécifiques à cette version.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Conservez la sauvegarde complète<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Une sauvegarde est stockée sous <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. Conservez tous les objets de ce répertoire. Les sauvegardes de type « snapshot » comprennent un bundle exporté ainsi que les métadonnées.</p>
<p>Ne copiez pas uniquement les fichiers de métadonnées et ne partez pas du principe qu’une sauvegarde de type « snapshot » présente la même structure qu’une sauvegarde de type « binlog ».</p>
<h2 id="Restore-data" class="common-anchor-header">Restaurer les données<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Restaurez <code translate="no">coll</code> en tant que <code translate="no">coll_bak</code> dans l’instance configurée :</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Dans l’interface CLI, « <code translate="no">--filter</code> » correspond aux noms <strong>après</strong> l’application de « <code translate="no">-s</code> » ou « <code translate="no">--rename</code> ». Une commande avec « <code translate="no">--filter coll -s _bak</code> » ne correspond à rien et peut se terminer avec succès sans restaurer de collection.</p>
<p>Pour restaurer en utilisant le nom d’origine, choisissez une cible où ce nom de collection n’existe pas, pointez la configuration vers cette cible et l’emplacement de sauvegarde, puis omettez le suffixe :</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Pour un exemple complet sur une même instance, voir « <a href="/docs/fr/snapshot-backup-and-restore.md">Sauvegarde et restauration d’instantanés dans une même instance</a> ». Les pages existantes consacrées aux cas courants inter-instances utilisent la configuration de Backup 0.5.16 et v1 ; n’appliquez pas leurs commandes telles quelles à la version 0.6.0. Pour la configuration de transfert de la version 0.6.0, consultez le <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">guide de transfert correspondant à cette version</a>.</p>
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
    </button></h2><p>Vérifiez que <code translate="no">coll_bak</code> existe. Si la restauration n’a pas recréé son index vectoriel, créez l’index adapté à votre schéma avant de charger la collection. Comparez son schéma, le nombre d’entités, les valeurs scalaires et vectorielles, ainsi que les résultats de recherche connus, avec la référence capturée avant la sauvegarde.</p>
<p>Pour le jeu de données jetable de 256 entités, effectuez l’ensemble des vérifications décrites dans la section « <a href="/docs/fr/snapshot-backup-and-restore.md#Verify-the-result">Vérifier le résultat</a> ». La réussite d’une commande ne suffit pas à elle seule à prouver que les données attendues ont bien été restaurées.</p>
