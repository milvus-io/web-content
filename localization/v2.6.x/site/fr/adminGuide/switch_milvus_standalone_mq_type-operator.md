---
id: switch_milvus_standalone_mq_type-operator.md
summary: >-
  Découvrez comment changer le type de file d'attente des messages pour Milvus
  standalone.
title: Changement de type MQ pour Milvus Standalone
---
<h1 id="Switch-MQ-Type-for-Milvus-Standalone" class="common-anchor-header">Changement de type MQ pour Milvus Standalone<button data-href="#Switch-MQ-Type-for-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment changer le type de file d'attente de messages (MQ) pour un déploiement Milvus autonome existant. Milvus prend en charge le changement de type MQ en ligne sans temps d'arrêt.</p>
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
<li>Une instance Milvus Standalone en cours d'exécution installée via <a href="/docs/fr/v2.6.x/install_standalone-docker.md">Docker</a> ou <a href="/docs/fr/v2.6.x/install_standalone-docker-compose.md">Docker Compose</a>.</li>
<li>L'instance Milvus a été mise à niveau vers la dernière version qui prend en charge cette fonctionnalité Switch MQ.</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Flux de travail général<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Le processus général de changement de type MQ est le suivant :</p>
<ol>
<li>S'assurer que l'instance Milvus fonctionne correctement.</li>
<li>Confirmer le type de MQ source et le type de MQ cible.</li>
<li>Configurer les paramètres d'accès du MQ cible dans la configuration Milvus sans modifier la valeur <code translate="no">mqType</code>.</li>
<li>Déclencher le basculement en appelant l'API WAL alter.</li>
<li>Surveillez les journaux pour vérifier que le basculement s'est bien déroulé.</li>
</ol>
<div class="alert note">
<p>Avant de procéder au basculement, assurez-vous que le MQ cible ne contient pas de rubriques portant les mêmes noms que celles utilisées par l'instance Milvus actuelle. Ceci est particulièrement important si le service MQ cible a été précédemment utilisé par une autre instance Milvus, car des noms de rubriques conflictuels peuvent entraîner un comportement inattendu.</p>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="common-anchor-header">Passage de RocksMQ à Woodpecker (stockage local)<button data-href="#Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette procédure s'applique aux déploiements <strong>Milvus Standalone Docker</strong> qui utilisent RocksMQ par défaut.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Étape 1 : Vérifier que l'instance Milvus est en cours d'exécution<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Assurez-vous que votre instance Milvus Standalone Docker fonctionne correctement. Vous pouvez le vérifier en créant une collection de test, en insérant des données et en exécutant une requête.</p>
<h3 id="Step-2-Configure-Woodpecker-with-local-storage" class="common-anchor-header">Étape 2 : Configurer Woodpecker avec le stockage local<button data-href="#Step-2-Configure-Woodpecker-with-local-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Mettez à jour la configuration Milvus pour ajouter les paramètres Woodpecker <strong>sans</strong> modifier la valeur <code translate="no">mqType</code>. Créer ou mettre à jour le fichier <code translate="no">user.yaml</code> avec le contenu suivant :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">local</span>
<button class="copy-code-btn"></button></code></pre>
<p>Redémarrer ensuite l'instance Milvus pour appliquer la configuration :</p>
<pre><code translate="no" class="language-shell">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Étape 3 : Exécuter le commutateur MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Exécuter la commande suivante pour déclencher le passage à Woodpecker :</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Remplacer <code translate="no">&lt;mixcoord_addr&gt;</code> par l'adresse réelle de votre service MixCoord (par défaut, <code translate="no">localhost</code> pour les déploiements autonomes).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Étape 4 : Vérifier que le basculement est terminé<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Le processus de basculement se termine automatiquement. Surveillez les messages clés suivants dans les journaux Milvus pour confirmer que le basculement est terminé :</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dans les messages ci-dessus, <code translate="no">&lt;MQ1&gt;</code> est le type MQ source (<code translate="no">rocksmq</code>) et <code translate="no">&lt;MQ2&gt;</code> est le type MQ cible (<code translate="no">woodpecker</code>).</p>
<ul>
<li>Le premier message indique que le basculement WAL de la source vers la cible est terminé.</li>
<li>Le deuxième message indique que tous les canaux physiques ont été commutés.</li>
<li>Le troisième message indique que la configuration de <code translate="no">mq.type</code> a été mise à jour dans etcd.</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="common-anchor-header">Passage de RocksMQ à Woodpecker (stockage MinIO)<button data-href="#Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette procédure s'applique aux déploiements <strong>Milvus Standalone Docker Compose</strong>.</p>
<div class="alert note">
<p>A partir de Milvus v2.6, la configuration par défaut <code translate="no">docker-compose.yaml</code> déclare déjà <code translate="no">mqType</code> comme étant Woodpecker. A moins d'avoir modifié la configuration par défaut ou d'avoir effectué une mise à niveau à partir de la version 2.5, cette procédure n'est peut-être pas nécessaire.</p>
</div>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Etape 1 : Vérifier que l'instance Milvus est en cours d'exécution<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">Étape 2 : (Facultatif) Vérifier la configuration de Woodpecker<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>La configuration par défaut de Milvus définit déjà le type de stockage Woodpecker sur MinIO, de sorte qu'aucune configuration supplémentaire n'est requise dans la plupart des cas.</p>
<p>Toutefois, si vous avez précédemment personnalisé la configuration de Woodpecker, vous devez vous assurer que <code translate="no">woodpecker.storage.type</code> est défini sur <code translate="no">minio</code>. Créez ou mettez à jour le fichier <code translate="no">user.yaml</code> avec le contenu suivant :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<p>Redémarrez ensuite l'instance Milvus pour appliquer la configuration :</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Étape 3 : Exécuter le commutateur MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Exécutez la commande suivante pour déclencher le passage à Woodpecker :</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Remplacer <code translate="no">&lt;mixcoord_addr&gt;</code> par l'adresse réelle de votre service MixCoord (par défaut, <code translate="no">localhost</code> pour les déploiements autonomes).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Étape 4 : Vérifier que le basculement est terminé<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Le processus de basculement se termine automatiquement. Surveillez les messages clés suivants dans les journaux Milvus pour confirmer que le basculement est terminé :</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dans les messages ci-dessus, <code translate="no">&lt;MQ1&gt;</code> est le type MQ source (<code translate="no">rocksmq</code>) et <code translate="no">&lt;MQ2&gt;</code> est le type MQ cible (<code translate="no">woodpecker</code>).</p>
<ul>
<li>Le premier message indique que le basculement WAL de la source vers la cible est terminé.</li>
<li>Le deuxième message indique que tous les canaux physiques ont été commutés.</li>
<li>Le troisième message indique que la configuration de <code translate="no">mq.type</code> a été mise à jour dans etcd.</li>
</ul>
</div>
