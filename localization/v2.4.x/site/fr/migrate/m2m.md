---
id: m2m.md
summary: >-
  Ce guide fournit un processus complet, étape par étape, pour la migration des
  données de Milvus 1.x (y compris 0.9.x et supérieur) vers Milvus 2.x.
title: Depuis Milvus 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">Depuis Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide fournit un processus complet, étape par étape, pour la migration des données de Milvus 1.x (y compris 0.9.x et supérieur) vers Milvus 2.x. En suivant ce guide, vous pourrez transférer efficacement vos données, en tirant parti des fonctionnalités avancées et des performances améliorées de Milvus 2.x.</p>
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
<li><strong>Versions du logiciel</strong>:<ul>
<li>Milvus source : 0.9.x à 1.x</li>
<li>Milvus cible : 2.x</li>
</ul></li>
<li><strong>Outils requis</strong>:<ul>
<li>Outil de<a href="https://github.com/zilliztech/milvus-migration">migration Milvus</a>. Pour plus de détails sur l'installation, voir <a href="/docs/fr/v2.4.x/milvusdm_install.md">Installer l'outil de migration</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Exportation des métadonnées de l'installation Milvus source<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour préparer les données de migration pour Milvus 0.9.x à 1.x, arrêter l'installation Milvus source ou au moins cesser d'y effectuer des opérations DML.</p>
<ol>
<li><p>Exporter les métadonnées de l'installation Milvus source vers <code translate="no">meta.json</code>.</p>
<ul>
<li>Pour les installations utilisant MySQL comme backend, exécuter</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Pour les installations utilisant SQLite comme backend, exécuter</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Copiez le dossier <code translate="no">tables</code> de votre installation Milvus, puis déplacez les dossiers <code translate="no">meta.json</code> et <code translate="no">tables</code> dans un dossier vide.</p>
<p>Une fois cette étape terminée, la structure du dossier vide doit ressembler à ceci :</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Téléchargez le dossier préparé à l'étape précédente vers un bloc de stockage S3 ou utilisez directement ce dossier local dans la section suivante.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Configurer le fichier de migration<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Enregistrez le fichier de configuration de l'exemple de migration sous <code translate="no">migration.yaml</code> et modifiez les configurations en fonction de vos conditions réelles. Vous êtes libre de placer le fichier de configuration dans n'importe quel répertoire local.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>Le tableau suivant décrit les paramètres du fichier de configuration de l'exemple. Pour une liste complète des configurations, reportez-vous à <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration : Milvus1.x à Milvus 2.x.</a></p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description du paramètre</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>Concurrence des threads dumper.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Le mode opérationnel de la tâche de migration. Défini sur <code translate="no">milvus1x</code> lors de la migration depuis Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Taille de la mémoire tampon à lire à partir de Milvus 1.x dans chaque lot. Unité : KO.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Taille de la mémoire tampon pour écrire dans Milvus 2.x dans chaque lot. Unité : Ko : KO.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>Concurrence des threads du chargeur.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Spécifie où le fichier meta meta.json est lu. Valeurs valides : <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Chemin d'accès au répertoire local où se trouve le fichier <code translate="no">meta.json</code>. Cette configuration n'est utilisée que lorsque <code translate="no">meta.mode</code> est défini sur <code translate="no">local</code>. Pour d'autres configurations méta, reportez-vous à <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Spécifie l'endroit où les fichiers sources sont lus. Valeurs valides :<br/>- <code translate="no">local</code>: lit les fichiers à partir d'un disque local.<br/>- <code translate="no">remote</code>: lit les fichiers à partir d'un stockage distant.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>Chemin d'accès au répertoire où se trouvent les fichiers sources. Par exemple, <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Emplacement de stockage des fichiers vidés. Valeurs valides :<br/>- <code translate="no">local</code>: Stockage des fichiers vidés sur les disques locaux.<br/>- <code translate="no">remote</code>: Stockage des fichiers vidés sur le stockage d'objets.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Chemin du répertoire de sortie dans le panier de stockage en nuage.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Clé d'accès pour le stockage Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Clé secrète pour le stockage Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fournisseur de services de stockage en nuage. Exemples de valeurs : <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Région de stockage dans le nuage. Il peut s'agir de n'importe quelle valeur si vous utilisez MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nom du bac pour le stockage des données. La valeur doit être la même que la configuration dans Milvus 2.x. Pour plus d'informations, voir <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurations du système</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Si un rôle IAM doit être utilisé pour la connexion.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Vérifier si le seau spécifié existe dans le stockage d'objets.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Adresse du serveur Milvus cible.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nom d'utilisateur pour le serveur Milvus 2.x. Ce paramètre est requis si l'authentification utilisateur est activée pour votre serveur Milvus. Pour plus d'informations, voir <a href="https://milvus.io/docs/authenticate.md">Activer l'authentification</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Mot de passe pour le serveur Milvus 2.x. Ce paramètre est requis si l'authentification utilisateur est activée pour votre serveur Milvus. Pour plus d'informations, voir <a href="https://milvus.io/docs/authenticate.md">Activer l'authentification</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Démarrer la tâche de migration<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Démarrer la tâche de migration avec la commande suivante. Remplacez <code translate="no">{YourConfigFilePath}</code> par le répertoire local où se trouve le fichier de configuration <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>La commande ci-dessus convertit les données source dans Milvus 1.x en fichiers NumPy, puis utilise l'opération <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> pour écrire les données dans le seau cible.</p></li>
<li><p>Une fois les fichiers NumPy générés, importez-les dans Milvus 2.x à l'aide de la commande suivante. Remplacez <code translate="no">{YourConfigFilePath}</code> par le répertoire local où se trouve le fichier de configuration <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">Vérifier le résultat<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois la tâche de migration exécutée, vous pouvez effectuer des appels API ou utiliser Attu pour afficher le nombre d'entités migrées. Pour plus d'informations, reportez-vous à <a href="https://github.com/zilliztech/attu">Attu</a> et à <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
