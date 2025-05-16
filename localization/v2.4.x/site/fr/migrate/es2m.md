---
id: es2m.md
summary: >-
  Ce guide fournit un processus complet, étape par étape, pour la migration des
  données d'Elasticsearch vers Milvus 2.x.
title: À partir d'Elasticsearch
---
<h1 id="From-Elasticsearch" class="common-anchor-header">Depuis Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide fournit un processus complet, étape par étape, pour la migration des données d'Elasticsearch vers Milvus 2.x. En suivant ce guide, vous serez en mesure de transférer efficacement vos données, en tirant parti des fonctionnalités avancées et des performances améliorées de Milvus 2.x.</p>
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
<li>Source Elasticsearch : 7.x ou 8.x</li>
<li>Milvus cible : 2.x</li>
<li>Pour plus de détails sur l'installation, voir <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Installation d'Elasticsearch</a> et <a href="https://milvus.io/docs/install_standalone-docker.md">Installation de Milvus</a>.</li>
</ul></li>
<li><strong>Outils requis</strong>:<ul>
<li>Outil de<a href="https://github.com/zilliztech/milvus-migration">migration Milvus</a>. Pour plus de détails sur l'installation, voir <a href="/docs/fr/v2.4.x/milvusdm_install.md">Installer l'outil de migration</a>.</li>
</ul></li>
<li><strong>Types de données pris en charge pour la migration</strong>: Les champs à migrer à partir de l'index Elasticsearch source sont des types suivants : <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>. Les types de données qui ne figurent pas dans cette liste ne sont actuellement pas pris en charge pour la migration. Reportez-vous à la <a href="#field-mapping-reference">référence de mappage des champs</a> pour obtenir des informations détaillées sur les mappages de données entre les collections Milvus et les index Elasticsearch.</li>
<li><strong>Exigences relatives à l'index Elasticsearch</strong>:<ul>
<li>L'index Elasticsearch source doit contenir un champ vectoriel du type <code translate="no">dense_vector</code>. La migration ne peut pas commencer sans champ vectoriel.</li>
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
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le tableau suivant décrit les paramètres du fichier de configuration de l'exemple. Pour une liste complète des configurations, reportez-vous à <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration : Elasticsearch vers Milvus 2.x.</a></p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Mode opérationnel de la tâche de migration. Défini sur <code translate="no">elasticsearch</code> lors de la migration à partir d'index Elasticsearch.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Taille de la mémoire tampon à lire à partir d'Elasticsearch dans chaque lot. Unité : KO.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Spécifie la source des méta-configs. Actuellement, seul <code translate="no">config</code> est pris en charge.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>Identifie l'index Elasticsearch à partir duquel les données doivent migrer.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>Champs de l'index Elasticsearch à migrer.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Nom du champ Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>Longueur maximale du champ. Ce paramètre n'est requis que si <code translate="no">meta.fields.type</code> est <code translate="no">keyword</code> ou <code translate="no">text</code>.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>Indique si le champ sert de clé primaire.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Type de données du champ Elasticsearch. Actuellement, les types de données suivants sont pris en charge dans Elasticsearch : <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>Dimension du champ vectoriel. Ce paramètre n'est requis que lorsque <code translate="no">meta.fields.type</code> est <code translate="no">dense_vector</code>.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Configs spécifiques à la création de la collection dans Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Nom de la collection Milvus. Le nom de l'index Elasticsearch est utilisé par défaut s'il n'est pas spécifié.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>Spécifie s'il faut désactiver le champ dynamique dans la collection. La valeur par défaut est <code translate="no">false</code>. Pour plus d'informations sur les champs dynamiques, voir <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">Activer le champ dynamique</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>Nombre de groupes de données à créer dans la collection. Pour plus d'informations sur les groupes de données, reportez-vous à la section <a href="https://milvus.io/docs/glossary.md#Shard">Terminologie</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Niveau de cohérence de la collection dans Milvus. Pour plus d'informations, voir <a href="https://milvus.io/docs/consistency.md">Cohérence</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Paramètre Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>Configurations de connexion pour le serveur Elasticsearch source.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>Adresse du serveur Elasticsearch source.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Nom d'utilisateur du serveur Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Mot de passe pour le serveur Elasticsearch.</td></tr>
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
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fournisseur de services de stockage en nuage. Exemples de valeurs : <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Région de stockage en nuage. Il peut s'agir de n'importe quelle valeur si vous utilisez MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nom du bac pour le stockage des données. La valeur doit être la même que la configuration dans Milvus 2.x. Pour plus d'informations, voir <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurations du système</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Si un rôle IAM doit être utilisé pour la connexion.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Vérifier si le seau spécifié existe dans le stockage d'objets.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>Configurations de connexion pour le serveur Milvus 2.x cible.</td></tr>
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
    </button></h2><p>Démarrer la tâche de migration avec la commande suivante. Remplacer <code translate="no">{YourConfigFilePath}</code> par le répertoire local où se trouve le fichier de configuration <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Voici un exemple de sortie de journal de migration réussie :</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
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
    </button></h2><p>Une fois la tâche de migration exécutée, vous pouvez effectuer des appels API ou utiliser Attu pour afficher le nombre d'entités migrées. Pour plus d'informations, consultez <a href="https://github.com/zilliztech/attu">Attu</a> et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">Référence au mappage des champs<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Consultez le tableau ci-dessous pour comprendre comment les types de champs des index Elasticsearch sont mappés aux types de champs des collections Milvus.</p>
<p>Pour plus d'informations sur les types de données pris en charge dans Milvus, voir <a href="https://milvus.io/docs/schema.md#Supported-data-types">Types de données pris en charge</a>.</p>
<table>
<thead>
<tr><th>Type de champ Elasticsearch</th><th>Type de champ Milvus</th><th>Description du champ</th></tr>
</thead>
<tbody>
<tr><td>dense_vector</td><td>Vecteur flottant</td><td>Les dimensions du vecteur restent inchangées pendant la migration.</td></tr>
<tr><td>mot-clé</td><td>VarChar</td><td>Définit la longueur maximale (1 à 65 535). Les chaînes de caractères dépassant cette limite peuvent déclencher des erreurs de migration.</td></tr>
<tr><td>texte</td><td>VarChar</td><td>Longueur maximale (1 à 65 535). Les chaînes de caractères dépassant la limite peuvent déclencher des erreurs de migration.</td></tr>
<tr><td>long</td><td>Int64</td><td>-</td></tr>
<tr><td>entier</td><td>Int32</td><td>-</td></tr>
<tr><td>double</td><td>Double</td><td>-</td></tr>
<tr><td>float</td><td>Flottant</td><td>-</td></tr>
<tr><td>booléen</td><td>Bool</td><td>-</td></tr>
<tr><td>objet</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
