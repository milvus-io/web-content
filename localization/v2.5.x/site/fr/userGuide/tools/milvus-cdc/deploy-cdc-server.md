---
id: deploy-cdc-server.md
order: 2
summary: >-
  Ce guide fournit une procédure étape par étape pour le déploiement d'un
  serveur Milvus-CDC.
title: Déployer le serveur CDC
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">Déployer le serveur CDC<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide fournit une procédure étape par étape pour déployer un serveur Milvus-CDC.</p>
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
    </button></h2><p>Assurez-vous que les conditions suivantes sont remplies avant de déployer un serveur Milvus-CDC :</p>
<ul>
<li><p><strong>Instances Milvus</strong>: Le Milvus source et au moins un Milvus cible doivent être déployés et opérationnels.</p>
<ul>
<li><p>Les versions de Milvus source et cible doivent être 2.3.2 ou supérieures, de préférence 2.4.x. Nous recommandons d'utiliser la même version pour les Milvus source et cible afin de garantir la compatibilité.</p></li>
<li><p>Définir la configuration <code translate="no">common.ttMsgEnabled</code> de la Milvus cible sur <code translate="no">false</code>.</p></li>
<li><p>Configurer les Milvus source et cible avec des paramètres distincts de méta et de stockage des messages afin d'éviter les conflits. Par exemple, évitez d'utiliser les mêmes configurations etcd et rootPath, ainsi que des services Pulsar et <code translate="no">chanNamePrefix</code> identiques dans plusieurs instances Milvus.</p></li>
</ul></li>
<li><p><strong>Métastore</strong>: Préparer une base de données etcd ou MySQL pour le métastore Milvus-CDC.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Etapes<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Obtenir le fichier de configuration de Milvus-CDC</h3><p>Clonez le <a href="https://github.com/zilliztech/milvus-cdc">repo Milvus-CDC</a> et naviguez jusqu'au répertoire <code translate="no">milvus-cdc/server/configs</code> pour accéder au fichier de configuration <code translate="no">cdc.yaml</code>.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Modifier le fichier de configuration</h3><p>Dans le répertoire <code translate="no">milvus-cdc/server/configs</code>, modifiez le fichier <code translate="no">cdc.yaml</code> pour personnaliser les configurations liées au métastore Milvus-CDC et aux détails de connexion du Milvus source.</p>
<ul>
<li><p><strong>Configuration du métastore</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Type de métastore pour Milvus-CDC. Les valeurs possibles sont <code translate="no">etcd</code> ou <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Adresse de connexion au etcd de Milvus-CDC. Requis si <code translate="no">storeType</code> est défini sur <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Adresse de connexion à la base de données MySQL du serveur Milvus-CDC. Requis si <code translate="no">storeType</code> est défini sur <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Chemin racine du métastore Milvus-CDC. Cette configuration permet une utilisation multiple, permettant à plusieurs services CDC d'utiliser la même instance etcd ou MySQL tout en assurant l'isolation par le biais de chemins d'accès différents.</p></li>
</ul>
<p>Exemple de configuration :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
metaStoreConfig:
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  storeType: etcd
  <span class="hljs-comment"># etcd address</span>
  etcdEndpoints:
    - localhost:<span class="hljs-number">2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  rootPath: cdc
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configuration de la source Milvus :</strong></p>
<p>Spécifier les détails de connexion du Milvus source, y compris etcd et le stockage des messages, pour établir une connexion entre le serveur Milvus-CDC et le Milvus source.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Adresse de connexion au etcd du Milvus source. Pour plus d'informations, voir <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">Configurations liées à etcd</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Préfixe racine de la clé dans laquelle le Milvus source stocke les données dans etcd. La valeur peut varier en fonction de la méthode de déploiement de l'instance Milvus :</p>
<ul>
<li><p><strong>Helm</strong> ou <strong>Docker Compose</strong>: La valeur par défaut est <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Operator</strong>: La valeur par défaut est <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>Nom du canal de réplication Milvus, qui est <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> dans le fichier milvus.yaml.</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Configurations Pulsar pour la source Milvus. Si la source Milvus utilise Kafka pour le stockage des messages, supprimer toutes les configurations liées à Pulsar. Pour plus d'informations, voir <a href="https://milvus.io/docs/configure_pulsar.md">Configurations liées à Pulsar</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Adresse Kafka pour le Milvus source. Décommenter cette configuration si le Milvus source utilise Kafka pour le stockage des messages.</p></li>
</ul></li>
</ul>
<p>Exemple de configuration :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
sourceConfig:
  <span class="hljs-comment"># etcd config</span>
  etcdAddress:
    - localhost:<span class="hljs-number">2379</span>
  etcdRootPath: by-dev
  etcdMetaSubPath: meta
  <span class="hljs-comment"># default partition name</span>
  defaultPartitionName: _default
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  readChanLen: <span class="hljs-number">10</span>
  replicateChan: by-dev-replicate-msg
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  pulsar:
    address: pulsar://localhost:<span class="hljs-number">6650</span>
    webAddress: localhost:<span class="hljs-number">80</span>
    maxMessageSize: <span class="hljs-number">5242880</span>
    tenant: public
    namespace: default
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Compiler le serveur Milvus-CDC</h3><p>Après avoir enregistré le fichier <code translate="no">cdc.yaml</code>, accédez au répertoire <code translate="no">milvus-cdc</code> et exécutez l'une des commandes suivantes pour compiler le serveur :</p>
<ul>
<li><p>Pour un fichier binaire :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">make</span> build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Pour une image Docker :</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Pour une image Docker, monter le fichier compilé sur <code translate="no">/app/server/configs/cdc.yaml</code> dans le conteneur.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Démarrer le serveur</h3><ul>
<li><p>En utilisant le fichier binaire</p>
<p>Naviguez vers le répertoire contenant le binaire <code translate="no">milvus-cdc</code> et le répertoire <code translate="no">configs</code> avec le fichier <code translate="no">cdc.yaml</code>, puis démarrez le serveur :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>En utilisant Docker Compose :</p>
<pre><code translate="no" class="language-bash">docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
