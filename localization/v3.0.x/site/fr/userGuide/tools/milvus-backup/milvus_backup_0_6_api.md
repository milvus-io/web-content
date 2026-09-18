---
id: milvus_backup_0_6_api.md
summary: >-
  Créer et surveiller les tâches de sauvegarde et de restauration de Milvus
  Backup 0.6.0 via l'API HTTP.
title: Utilisation de l'API HTTP de Milvus Backup 0.6.0
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Utilisation de l'API HTTP de Milvus Backup 0.6.0<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez l'API HTTP de Milvus Backup pour créer des sauvegardes, restaurer des collections et surveiller les tâches asynchrones. L'exemple de capture d'écran ci-dessous utilise <strong>Milvus Backup 0.6.0</strong> avec <strong>Milvus 3.0.1 ou une version ultérieure</strong>. Pour la version 0.5.x de Backup, consultez <a href="/docs/fr/milvus_backup_api.md">le guide de l'API 0.5.x</a>. Pour une installation existante, consultez la section <a href="/docs/fr/milvus_backup_upgrade.md">Mise à niveau de Milvus Backup</a>.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Procurez-vous Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Téléchargez et extrayez le fichier binaire approprié de la <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">version v0.6.0</a>. Pour compiler à partir du code source, suivez les instructions de la section « <a href="/docs/fr/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">Obtenir Milvus Backup</a> » ; la compilation nécessite Go 1.26 ou une version ultérieure.</p>
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
    </button></h2><p>Créez <a href="/docs/fr/milvus_backup_0_6_cli.md#Prepare-configuration-file">un fichier</a>` <code translate="no">configs/backup.yaml</code> ` à l’aide de l’exemple v2 fourni dans la section « <a href="/docs/fr/milvus_backup_0_6_cli.md#Prepare-configuration-file">Préparer le fichier de configuration</a> ». Configurez l’accès à Milvus, au stockage de l’instance et à la destination de sauvegarde. Le serveur Milvus doit également pouvoir accéder au stockage de sauvegarde pour les opérations de snapshot.</p>
<p>Si vous disposez d’un fichier v1, celui-ci reste chargeable. Consultez la section « <a href="/docs/fr/milvus_backup_upgrade.md#Migrate-the-configuration">Migrer la configuration</a> » avant de modifier son schéma ou ses variables d’environnement.</p>
<p>Depuis le répertoire contenant le binaire, vérifiez la configuration et la connectivité :</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Poursuivez lorsque le test de connectivité indique « <code translate="no">Success!</code> ».</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">Démarrez le serveur API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Démarrez le service avec la configuration que vous avez vérifiée :</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Le port par défaut est le 8080. Pour choisir un autre port, utilisez <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>N’exécutez qu’une seule de ces commandes pour un service donné. Les exemples ci-dessous utilisent le port 8080 ; modifiez leurs URL si vous avez sélectionné un autre port. L’interface Swagger UI est accessible à l’adresse <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>Laissez le service en cours d'exécution pendant l'interrogation des tâches. Les ID de tâche et la progression en temps réel sont liés au processus du service ; la sauvegarde persistante reste dans le stockage d'objets une fois le processus arrêté.</p>
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
    </button></h2><p>Utilisez une collection existante nommée « <code translate="no">coll</code> », ou créez la collection de test de 256 entités à partir de la section « <a href="/docs/fr/snapshot-backup-and-restore.md#Prepare-sample-data">Préparer des données d'exemple</a> ». Modifiez les noms des collections dans les requêtes si vous utilisez vos propres données. Ne modifiez pas les données de test pendant la vérification des résultats.</p>
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
    </button></h2><p>Envoyez une requête de sauvegarde asynchrone :</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>La réponse inclut un <code translate="no">requestId</code>. L’envoi ne signifie pas que la sauvegarde est terminée. Copiez cette valeur dans <code translate="no">backup_id</code> et interrogez-la :</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Attendez que <code translate="no">data.state_code</code> devienne <code translate="no">2</code>. L’API utilise les états de tâche suivants :</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Signification</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Initial</td></tr>
<tr><td><code translate="no">1</code></td><td>En cours d’exécution</td></tr>
<tr><td><code translate="no">2</code></td><td>Réussite</td></tr>
<tr><td><code translate="no">3</code></td><td>Échec</td></tr>
<tr><td><code translate="no">4</code></td><td>Délai d'attente dépassé</td></tr>
</tbody>
</table>
<p>Vérifiez à la fois la réponse et l'état de la tâche. Un code HTTP 200 seul n'est pas suffisant : une réponse non nulle <code translate="no">code</code> indique une erreur. Une réponse réussie peut omettre <code translate="no">code</code> car sa valeur est nulle. Si une tâche échoue ou expire, examinez les détails de la réponse et le journal du serveur avant de restaurer à partir de cette sauvegarde.</p>
<p>Répertoriez les sauvegardes stockées et examinez la sauvegarde terminée par son nom :</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> renvoie des métadonnées au format JSON, y compris <code translate="no">collection_backups</code>; cette commande <strong>ne</strong> télécharge <strong>pas</strong> les fichiers de sauvegarde. Pour une sauvegarde créée par un autre processus, une requête par nom uniquement peut renvoyer des métadonnées sans afficher la progression en temps réel de la tâche. Utilisez l’ID de la tâche issu de la réponse de création du service actuel lorsque vous surveillez une sauvegarde en cours.</p>
<p>Le format par défaut est <code translate="no">auto</code>, qui sélectionne un instantané sur Milvus 3.0. Pour demander explicitement le journal binaire (binlog), ajoutez <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> au corps de la requête create. Les préréglages de la CLI <code translate="no">--for</code> ne constituent pas un champ de requête HTTP.</p>
<p>Pour conserver ou déplacer la sauvegarde, copiez l’intégralité du répertoire dans le stockage objet. Consultez le <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">guide de transfert de la version 0.6.0</a>.</p>
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
    </button></h2><p>Assurez-vous que <code translate="no">coll_bak</code> n’existe pas déjà. Envoyez une requête de restauration avec un suffixe :</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Le champ HTTP « <code translate="no">collection_names</code> » sélectionne les noms <strong>présents dans la sauvegarde</strong>, avant l’application du suffixe. Cette requête sélectionne « <code translate="no">coll</code> » et crée « <code translate="no">coll_bak</code> ». L’option « <code translate="no">--filter</code> » de l’interface CLI, en revanche, fait correspondre les noms cibles après le renommage ; ne remplacez pas « <code translate="no">coll_bak</code> » dans ce champ HTTP.</p>
<p>Copiez <code translate="no">data.id</code> à partir de la réponse de restauration et interrogez la tâche :</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Attendez que « <code translate="no">data.state_code: 2</code> » s'affiche et vérifiez sur <code translate="no">collection_restore_tasks</code> que la collection de cibles attendue est bien présente. Une tâche soumise ne correspond pas encore à une restauration vérifiée.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Restauration avec le nom d’origine<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez une instance cible sur laquelle <code translate="no">coll</code> n’existe pas. Lancez un service API de sauvegarde distinct, configuré pour cette cible et l’emplacement de sauvegarde final, puis envoyez cette requête au service cible :</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Interrogez <code translate="no">get_restore</code> sur le même service à l'aide de l'ID de tâche renvoyé. Configurez <code translate="no">milvus.*</code> pour la cible de restauration et <code translate="no">backup.storage</code> pour la sauvegarde existante. Voir <a href="/docs/fr/milvus_backup_0_6_cli.md#Prepare-configuration-file">Préparer le fichier de configuration</a>.</p>
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
    </button></h2><p>Une fois la tâche de restauration réussie, connectez-vous à l’instance Milvus cible et vérifiez que la collection et les données attendues existent. Pour la collection de test de 256 entités, utilisez les vérifications complètes des scalaires, des vecteurs et des recherches décrites dans la section « <a href="/docs/fr/snapshot-backup-and-restore.md#Verify-the-result">Vérifier le résultat</a> ».</p>
<p>Remplacez <code translate="no">coll_bak</code> par <code translate="no">coll</code> lorsque vous effectuez une restauration en conservant le nom d’origine. Le code de vérification lit les données restaurées sans les supprimer. Pour les données de production, comparez-les à une référence capturée au moment de la sauvegarde.</p>
