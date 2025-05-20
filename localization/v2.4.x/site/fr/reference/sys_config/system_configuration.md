---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: En savoir plus sur la configuration du système Milvus.
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Liste de contrôle des configurations du système Milvus<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente les sections générales des configurations du système dans Milvus.</p>
<p>Milvus gère un nombre considérable de paramètres qui configurent le système. Chaque configuration a une valeur par défaut qui peut être utilisée directement. Vous pouvez modifier ces paramètres de manière flexible afin que Milvus puisse mieux servir votre application. Voir <a href="/docs/fr/v2.4.x/configure-docker.md">Configurer Milvus</a> pour plus d'informations.</p>
<div class="alert note">
Dans la version actuelle, tous les paramètres ne prennent effet qu'après avoir été configurés au démarrage de Milvus.</div>
<h2 id="Sections" class="common-anchor-header">Sections<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour faciliter la maintenance, Milvus classe ses configurations en %s sections en fonction de ses composants, de ses dépendances et de son utilisation générale.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Configuration liée à etcd, utilisée pour stocker les métadonnées de Milvus et la découverte de services.</p>
<p>Voir <a href="/docs/fr/v2.4.x/configure_etcd.md">Configurations liées à etcd</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_metastore.md">configurations relatives au métastore</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Configuration connexe de tikv, utilisée pour stocker les métadonnées Milvus.</p>
<p>Notez que lorsque TiKV est activé pour le métastore, vous devez toujours avoir etcd pour la découverte des services.</p>
<p>TiKV est une bonne option lorsque la taille des métadonnées nécessite une meilleure évolutivité horizontale.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_tikv.md">Configurations liées à tikv</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_localstorage.md">configurations liées à localStorage</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>La configuration associée de MinIO/S3/GCS ou de tout autre service prend en charge l'API S3, qui est responsable de la persistance des données pour Milvus.</p>
<p>Par souci de simplicité, nous désignons le service de stockage par MinIO/S3 dans la description suivante.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_minio.md">Configurations liées à Minio</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus prend en charge quatre MQ : rocksmq (basé sur RockDB), natsmq (serveur nats intégré), Pulsar et Kafka.</p>
<p>Vous pouvez changer de MQ en définissant le champ mq.type.</p>
<p>Si vous ne définissez pas le champ mq.type par défaut, il y a une note sur l'activation de la priorité si nous configurons plusieurs mq dans ce fichier.</p>
<ol>
<li><p>mode autonome (local) : rocksmq(default) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>mode cluster :  Pulsar(default) &gt; Kafka (rocksmq et natsmq ne sont pas supportés en mode cluster)</p></li>
</ol>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_mq.md">Configurations liées à mq</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Configuration connexe de pulsar, utilisée pour gérer les journaux Milvus des opérations de mutation récentes, produire des journaux en continu et fournir des services de publication et d'abonnement de journaux.</p>
<p>Voir <a href="/docs/fr/v2.4.x/configure_pulsar.md">Configurations liées à pulsar</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>Si vous souhaitez activer kafka, vous devez commenter les configurations de pulsar</p>
<p>kafka :</p>
<p>brokerList :</p>
<p>saslUsername :</p>
<p>saslPassword :</p>
<p>saslMechanisms :</p>
<p>securityProtocol :</p>
<p>ssl :</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout : 10</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_rocksmq.md">configurations liées à rocksmq</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>Configuration natsmq.</p>
<p>plus de détails : https://docs.nats.io/running-a-nats-service/configuration</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_natsmq.md">configurations relatives à natsmq</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Configuration connexe de rootCoord, utilisée pour traiter les requêtes en langage de définition des données (DDL) et en langage de contrôle des données (DCL).</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_rootcoord.md">configurations relatives à rootCoord</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Configuration connexe du proxy, utilisée pour valider les demandes des clients et réduire les résultats renvoyés.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_proxy.md">configurations relatives au proxy</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Configuration connexe de queryCoord, utilisée pour gérer la topologie et l'équilibrage de la charge pour les nœuds de requête, et le transfert de segments croissants vers des segments scellés.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_querycoord.md">configurations liées à queryCoord</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Configuration connexe du nœud de requête, utilisée pour effectuer une recherche hybride entre les données vectorielles et scalaires.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_querynode.md">configurations liées à queryNode</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_indexcoord.md">configurations liées à indexCoord</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_indexnode.md">configurations liées à indexNode</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Pour une description détaillée de chaque paramètre de cette section, voir les <a href="/docs/fr/v2.4.x/configure_datacoord.md">Configurations liées à dataCoord</a>.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_datanode.md">configurations liées aux nœuds de données</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>Cette rubrique présente les configurations de Milvus liées au canal de messages.</p>
<p>Voir <a href="/docs/fr/v2.4.x/configure_msgchannel.md">Configurations liées au canal de messages</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Configure la sortie du journal du système.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_log.md">Configurations relatives au journal</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_grpc.md">configurations relatives à grpc</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Configure l'activation du proxy tls.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_tls.md">configurations relatives à tls</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_common.md">configurations liées à common</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, configuration des quotas et des limites de Milvus.</p>
<p>Par défaut, nous activons</p>
<ol>
<li><p>Protection TT ;</p></li>
<li><p>Protection de la mémoire.</p></li>
<li><p>Protection du quota de disque.</p></li>
</ol>
<p>Vous pouvez activer :</p>
<ol>
<li><p>Limitation du débit DML ;</p></li>
<li><p>la limitation du débit DDL, DQL ;</p></li>
<li><p>Protection de la longueur/latence de la file d'attente DQL ;</p></li>
<li><p>la protection du taux de résultat DQL ;</p></li>
</ol>
<p>Si nécessaire, vous pouvez également forcer manuellement le refus des requêtes RW.</p>
<p>Voir <a href="/docs/fr/v2.4.x/configure_quotaandlimits.md">les configurations relatives aux quotas et aux limites</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>Voir les <a href="/docs/fr/v2.4.x/configure_trace.md">configurations relatives à la trace</a> pour une description détaillée de chaque paramètre de cette section.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#Lors de l'utilisation de l'indexation GPU, Milvus utilisera un pool de mémoire pour éviter l'allocation et la désallocation fréquentes de la mémoire.</p>
<p>#Ici, vous pouvez définir la taille de la mémoire occupée par le pool de mémoire, l'unité étant le Mo.</p>
<p>#note that there is a possibility of Milvus crashing when the actual memory demand exceeds the value set by maxMemSize.</p>
<p>#Si initMemSize et MaxMemSize sont tous deux à zéro,</p>
<p>#Milvus initialisera automatiquement la moitié de la mémoire GPU disponible,</p>
<p>#maxMemSize initialisera la totalité de la mémoire disponible sur le GPU.</p>
<p>Voir les <a href="/docs/fr/v2.4.x/configure_gpu.md">Configurations liées au GPU</a> pour une description détaillée de chaque paramètre de cette section.</p>
