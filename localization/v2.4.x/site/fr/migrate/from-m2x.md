---
id: from-m2x.md
summary: >-
  Ce guide fournit un processus complet, étape par étape, de migration des
  données de Milvus 2.3.x vers Milvus 2.3.x ou supérieur.
title: Depuis Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">Depuis Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide fournit un processus complet, étape par étape, de migration des données de Milvus 2.3.x vers Milvus 2.3.x ou supérieur.</p>
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
<li>Milvus source : 2.3.0+ (L'outil utilise l'itérateur pour récupérer les données de collecte source, ce qui nécessite que Milvus source soit la version 2.3.0 ou supérieure).</li>
<li>Milvus cible : 2.3.0+.</li>
</ul></li>
<li><strong>Outils requis</strong>:<ul>
<li>Outil<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Pour plus de détails sur l'installation, voir <a href="/docs/fr/v2.4.x/milvusdm_install.md">Installer l'outil de migration</a>.</li>
</ul></li>
<li><strong>Préparation des données</strong>:<ul>
<li>S'assurer que la collection Milvus source est chargée et prête pour l'exportation des données.</li>
<li>Si le Milvus cible ne contient pas de collection correspondant à la collection source, l'outil <a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a> la créera automatiquement. Notez qu'après la migration, la collection cible ne sera pas indexée et que vous devrez l'indexer manuellement par la suite.</li>
</ul></li>
</ul>
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
    </button></h2><p>Enregistrez le fichier de configuration de l'exemple de migration sous <code translate="no">migration.yaml</code> et modifiez les configurations en fonction de vos conditions réelles. Vous pouvez placer le fichier de configuration dans n'importe quel répertoire local.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>Le tableau suivant décrit les paramètres du fichier de configuration de l'exemple. Pour plus d'informations, reportez-vous à <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration : Milvus2.x vers Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Mode opérationnel de la tâche de migration. Défini sur milvus2x lors de la migration à partir de Milvus 2.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Taille de la mémoire tampon à lire à partir de Milvus 2.x dans chaque lot.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Spécifie l'endroit où le métafichier est lu. La valeur config indique que la configuration méta peut être obtenue à partir de ce fichier migration.yaml.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>Version source de Milvus. Défini sur 2.3.0 ou supérieur.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>Nom de la collection source.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>Adresse du serveur Milvus source.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>Nom d'utilisateur du serveur Milvus source. Ce paramètre est requis si l'authentification utilisateur est activée pour votre serveur Milvus. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/authenticate.md">Activer l'authentification</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>Mot de passe du serveur Milvus source. Ce paramètre est requis si l'authentification utilisateur est activée pour votre serveur Milvus. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/authenticate.md">Activer l'authentification</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'adresse du serveur Milvus cible</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Adresse du serveur Milvus cible.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nom d'utilisateur du serveur Milvus cible. Ce paramètre est requis si l'authentification utilisateur est activée pour votre serveur Milvus. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/authenticate.md">Activer l'authentification</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Mot de passe du serveur Milvus cible. Ce paramètre est requis si l'authentification utilisateur est activée pour votre serveur Milvus. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/authenticate.md">Activer l'authentification</a>.</td></tr>
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
    </button></h2><p>Vous avez deux options pour démarrer la tâche de migration : utiliser le CLI ou effectuer des requêtes API. Choisissez celle qui correspond le mieux à vos besoins.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">Option 1 : Utilisation de l'interface de programmation</h3><p>Lancez la tâche de migration à l'aide de la commande suivante. Remplacez <code translate="no">{YourConfigFilePath}</code> par le répertoire local où se trouve le fichier de configuration <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Surveillez les journaux pour connaître l'état d'avancement de la migration. Les journaux de migration réussis devraient contenir des entrées telles que :</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">Option 2 : Faire des demandes d'API</h3><p>Vous pouvez également utiliser l'API Restful pour exécuter la migration. Démarrez le serveur API avec :</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le serveur démarré avec succès, placez le fichier <code translate="no">migration.yaml</code> dans le répertoire <code translate="no">configs/</code> du projet et démarrez la migration avec :</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Une fois la tâche de migration terminée, utilisez Attu pour voir le nombre d'entités migrées. En outre, vous pouvez créer des index et charger des collections dans Attu. Pour plus d'informations, reportez-vous à <a href="https://github.com/zilliztech/attu">Attu</a> et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">Options de configuration supplémentaires<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Outre les configurations de base mentionnées ci-dessus, vous pouvez également ajouter des paramètres supplémentaires en fonction de vos besoins spécifiques.</p>
<ul>
<li><p><strong>Migration sélective des champs</strong>: Si vous avez besoin de migrer uniquement des champs spécifiques dans une collection plutôt que tous les champs, spécifiez les champs à migrer dans la section <code translate="no">meta</code> du fichier <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Collection cible personnalisée</strong>: Pour personnaliser les propriétés de la collection cible, ajoutez les configurations correspondantes dans la section <code translate="no">meta</code> du fichier <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Pour des informations détaillées, voir <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration : Milvus2.x à Milvus2.x</a>.</p>
