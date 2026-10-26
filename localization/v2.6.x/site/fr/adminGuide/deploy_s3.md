---
id: deploy_s3.md
title: Configurer le stockage d'objets avec Docker Compose ou Helm
related_key: 'S3, storage'
summary: >-
  Découvrez comment configurer le stockage S3 pour Milvus à l'aide de Docker
  Compose ou de Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurer le stockage d'objets avec Docker Compose ou Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilise MinIO comme stockage d'objets par défaut, mais il prend également en charge l'utilisation <a href="https://aws.amazon.com/s3/">d'Amazon Simple Storage Service (S3)</a> comme stockage d'objets persistant pour les fichiers journaux et les fichiers d'index. Cette rubrique décrit comment configurer S3 pour Milvus. Vous pouvez ignorer cette rubrique si MinIO vous convient.</p>
<p>Vous pouvez configurer S3 avec <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> ou sur K8s.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Configurer S3 avec Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configurer S3<button data-href="#1-Configure-S3" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://min.io/product/overview">MinIO</a> est compatible avec S3. Pour configurer S3 avec Docker Compose, indiquez vos valeurs dans la section « <code translate="no">minio</code> » du fichier « <code translate="no">milvus.yaml</code> » situé dans le répertoire « milvus/configs ».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Consultez la section « <a href="/docs/fr/v2.6.x/configure_minio.md">Configurations MinIO/S3</a> » pour plus d’informations.</p>
<p>Le codage en dur d’une clé d’accès et d’une clé secrète fonctionne, mais si vous exécutez Milvus sur un hôte ou un cluster prenant en charge l’identité de la charge de travail (par exemple, un profil d’instance EC2 ou IRSA sur EKS), nous vous recommandons d’utiliser un rôle IAM à la place. Définissez ` <code translate="no">useIAM</code> ` sur ` <code translate="no">true</code> ` et supprimez ` <code translate="no">accessKeyID</code> ` et ` <code translate="no">secretAccessKey</code>` :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">&quot;aws&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus obtient alors des identifiants temporaires à partir du rôle IAM associé à la charge de travail. <code translate="no">cloudProvider</code> accepte <code translate="no">aws</code>, <code translate="no">gcp</code> ou <code translate="no">aliyun</code>, et <code translate="no">iamEndpoint</code> permet, de manière facultative, de spécifier un point de terminaison personnalisé pour récupérer les identifiants du rôle IAM.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Modifier le fichier docker-compose.yaml<button data-href="#2-Refine-docker-composeyaml" class="anchor-icon" translate="no">
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
    </button></h3><p>Vous devez également supprimer la variable d’environnement ` <code translate="no">MINIO_ADDRESS</code> ` pour le service Milvus accessible à l’adresse <code translate="no">docker-compose.yaml</code>. Par défaut, Milvus utilisera Minio local plutôt que S3 externe.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Lancer Milvus<button data-href="#3-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Exécutez la commande suivante pour démarrer Milvus en utilisant les configurations S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Les configurations ne prennent effet qu’après le démarrage de Milvus. Consultez la section <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Démarrer Milvus</a> pour plus d’informations.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Configurer S3 sur K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les clusters Milvus sur K8s, vous pouvez configurer S3 dans la même commande qui démarre Milvus. Vous pouvez également configurer S3 à l’aide du fichier ` <code translate="no">values.yml</code> ` situé dans le chemin `/charts/milvus` du référentiel <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> avant de démarrer Milvus.</p>
<p>Le tableau suivant répertorie les clés permettant de configurer S3 dans le fichier YAML.</p>
<table>
<thead>
<tr><th>Clé</th><th>Description</th><th>Valeur</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Active ou désactive MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Active ou désactive S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>Le point de terminaison permettant d'accéder à S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>Le port permettant d'accéder à S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>Le chemin racine du stockage S3.</td><td>Chaîne vide par défaut.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>L'ID de clé d'accès pour S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>La clé d'accès secrète pour S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>Le nom du compartiment S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Indique s'il faut utiliser SSL lors de la connexion</td><td>Les valeurs par défaut sont les suivantes : <code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.useIAM</code></td><td>Indique s'il faut utiliser un rôle IAM à la place des clés d'accès et secrètes pour accéder à S3.</td><td>La valeur par défaut est <code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.cloudProvider</code></td><td>Fournisseur de cloud émettant les identifiants du rôle IAM.</td><td><code translate="no">aws</code>, <code translate="no">gcp</code> ou <code translate="no">aliyun</code>; la valeur par défaut est <code translate="no">aws</code></td></tr>
<tr><td><code translate="no">externalS3.iamEndpoint</code></td><td>Point de terminaison personnalisé pour récupérer les informations d’identification du rôle IAM.</td><td>Laissez ce champ vide pour utiliser la valeur par défaut du fournisseur.</td></tr>
</tbody>
</table>
<p>Si votre cluster prend en charge l’identité de charge de travail (par exemple, IRSA sur EKS), définissez <code translate="no">externalS3.useIAM</code> sur <code translate="no">true</code> et supprimez <code translate="no">externalS3.accessKey</code> et <code translate="no">externalS3.secretKey</code> — Milvus obtiendra des identifiants temporaires à partir du rôle IAM associé à la charge de travail.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilisation du fichier YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configurez la section <code translate="no">minio</code> dans le fichier <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configurez la section « <code translate="no">externalS3</code> » en utilisant vos valeurs dans le fichier « <code translate="no">values.yaml</code> ».</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Après avoir configuré les sections précédentes et enregistré le fichier <code translate="no">values.yaml</code>, exécutez la commande suivante pour installer Milvus en utilisant les configurations S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">À l'aide d'une commande<button data-href="#Using-a-command" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour installer Milvus et configurer S3, exécutez la commande suivante en remplaçant les valeurs par les vôtres.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=&lt;your_s3_endpoint&gt; --set externalS3.port=&lt;your_s3_port&gt; --set externalS3.accessKey=&lt;your_s3_access_key_id&gt; --set externalS3.secretKey=&lt;your_s3_secret_key&gt; --set externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Étapes suivantes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Découvrez comment configurer les autres dépendances de Milvus avec Docker Compose ou Helm :</p>
<ul>
<li><a href="/docs/fr/v2.6.x/deploy_etcd.md">Configurer Meta Storage avec Docker Compose ou Helm</a></li>
<li><a href="/docs/fr/v2.6.x/deploy_pulsar.md">Configurer le stockage des messages avec Docker Compose ou Helm</a></li>
</ul>
