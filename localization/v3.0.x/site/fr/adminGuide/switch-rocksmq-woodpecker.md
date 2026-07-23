---
id: switch-rocksmq-woodpecker.md
title: Basculer entre RocksMQ et Woodpecker
summary: >-
  Basculer la file d'attente de messages d'un déploiement Milvus Standalone
  (Docker Compose) entre RocksMQ et Woodpecker.
---
<h1 id="Switch-between-RocksMQ-and-Woodpecker" class="common-anchor-header">Basculer entre RocksMQ et Woodpecker<button data-href="#Switch-between-RocksMQ-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page décrit comment basculer la file d'attente de messages (MQ) d'un déploiement <strong>Milvus Standalone (Docker Compose)</strong> entre <strong>RocksMQ</strong> et <strong>Woodpecker</strong> (backend local ou MinIO), dans les deux sens. Pour connaître le déroulement général et les prérequis, consultez la section <a href="/docs/fr/switch-mq-type.md">Changer de type de MQ</a>.</p>
<div class="alert note">
<ul>
<li><strong>Prérequis :</strong> la fonctionnalité de changement de file d’attente de messages est disponible dans <strong>Milvus 3.0 et versions ultérieures</strong>. Mettez à niveau votre instance Milvus vers Milvus 3.0 ou une version ultérieure avant de commencer — cette fonctionnalité n’est pas disponible dans les versions antérieures.</li>
<li>Le changement de MQ nécessite un déploiement Docker <strong>Compose</strong> (qui active une source de configuration etcd). Le déploiement Docker à conteneur unique ne prend pas en charge ce changement.</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker" class="common-anchor-header">Passer de RocksMQ à Woodpecker<button data-href="#Switch-from-RocksMQ-to-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Étape 1 : Vérifiez que l’instance Milvus est en cours d’exécution<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Vérifiez que votre instance Milvus Standalone Docker Compose fonctionne correctement — par exemple, en créant une collection de test, en y insérant des données et en exécutant une requête.</p>
<h3 id="Step-2-Configure-Woodpecker-storage" class="common-anchor-header">Étape 2 : Configurer le stockage Woodpecker<button data-href="#Step-2-Configure-Woodpecker-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Ajoutez les paramètres Woodpecker à la configuration Milvus <strong>sans</strong> modifier la valeur « <code translate="no">mqType</code> ». Exécutez la commande « <code translate="no">docker exec -it milvus-standalone bash</code> » pour accéder au conteneur, puis modifiez le fichier « <code translate="no">/milvus/configs/user.yaml</code> » :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>   <span class="hljs-comment"># minio or local</span>
<button class="copy-code-btn"></button></code></pre>
<p>Redémarrez l’instance Milvus pour appliquer la configuration :</p>
<pre><code translate="no" class="language-shell">docker compose restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Étape 3 : Effectuer la bascule vers MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Si c’est la première fois que vous basculez vers Woodpecker, ignorez cette remarque. Sinon, nettoyez les métadonnées et données résiduelles de Woodpecker avant de basculer à nouveau — les données résiduelles peuvent entraîner un comportement inattendu.</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Le port MixCoord est généralement <code translate="no">9091</code>.</p>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Étape 4 : Vérifiez que la bascule est terminée<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Une migration réussie génère l'entrée suivante dans le journal : <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<h3 id="Step-5-Optional-Clean-up-RocksMQ-data" class="common-anchor-header">Étape 5 : (Facultatif) Nettoyage des données RocksMQ<button data-href="#Step-5-Optional-Clean-up-RocksMQ-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Les données RocksMQ se trouvent dans les répertoires <code translate="no">volumes/milvus/rdb_data</code> et <code translate="no">volumes/milvus/rdb_data_meta_kv</code> définis dans <code translate="no">docker-compose.yaml</code>. Si vous prévoyez de revenir à RocksMQ ultérieurement, supprimez d’abord ces fichiers pour éviter tout conflit.</p>
<h2 id="Switch-from-Woodpecker-to-RocksMQ" class="common-anchor-header">Passer de Woodpecker à RocksMQ<button data-href="#Switch-from-Woodpecker-to-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Étape 1 : Vérifiez que l’instance Milvus est en cours d’exécution<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Assurez-vous que votre instance Milvus Standalone Docker Compose fonctionne correctement.</p>
<h3 id="Step-2-Execute-the-MQ-switch" class="common-anchor-header">Étape 2 : Effectuez la transition vers MQ<button data-href="#Step-2-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Assurez-vous que l’instance ne contient aucune donnée RocksMQ résiduelle provenant d’une exécution précédente. S’il s’agit de votre premier passage à RocksMQ, ignorez cette remarque ; sinon, nettoyez d’abord les métadonnées et les données RocksMQ associées.</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;rocksmq&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Verify-the-switch-is-complete" class="common-anchor-header">Étape 3 : Vérifier que la migration est terminée<button data-href="#Step-3-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Une migration réussie génère l'entrée suivante dans le journal : <code translate="no">[mqTypeValue=rocksmq]</code>.</p>
<h3 id="Step-4-Optional-Clean-up-Woodpecker-data" class="common-anchor-header">Étape 4 : (Facultatif) Nettoyage des données Woodpecker<button data-href="#Step-4-Optional-Clean-up-Woodpecker-data" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Métadonnées (etcd) :</strong> le préfixe de la clé Woodpecker est généralement <code translate="no">woodpecker/...</code>. Affichez-le à l’aide de la commande <code translate="no">etcdctl get woodpecker --prefix</code>, puis supprimez-le.</li>
<li><strong>Données de stockage :</strong> en <strong>mode MinIO</strong>, supprimez les données de journalisation situées sous <code translate="no">&lt;rootPath&gt;/wp/...</code> (généralement <code translate="no">files/wp/...</code>) dans le bucket ; en <strong>mode local</strong>, les données se trouvent sur le disque local à l'emplacement <code translate="no">volumes/milvus/data/wp/...</code>.</li>
</ul>
<p>Si vous prévoyez de revenir à Woodpecker ultérieurement, nettoyez d’abord ces fichiers pour éviter tout conflit.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Scénarios pris en charge<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>MQ source</th><th>MQ cible</th><th>État</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (MinIO/local)</td><td><strong>Pris en charge</strong></td><td></td></tr>
<tr><td>Woodpecker (MinIO/local)</td><td>RocksMQ</td><td><strong>Pris en charge</strong></td><td></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker local</td><td><strong>Non pris en charge</strong></td><td>Le passage d'un mode de stockage Woodpecker à un autre nécessite un traitement supplémentaire des métadonnées, qui n'est pas encore pris en charge.</td></tr>
<tr><td>Woodpecker local</td><td>Woodpecker MinIO</td><td><strong>Non pris en charge</strong></td><td>Idem que ci-dessus.</td></tr>
<tr><td>RocksMQ / Woodpecker</td><td>Pulsar / Kafka externes</td><td><strong>Pris en charge mais non recommandé</strong></td><td>Veillez à ce que les instances autonomes restent aussi simples que possible.</td></tr>
</tbody>
</table>
