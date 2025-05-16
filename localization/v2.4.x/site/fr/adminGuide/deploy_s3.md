---
id: deploy_s3.md
title: Configurer le stockage d'objets avec Docker Compose ou Helm
related_key: 'S3, storage'
summary: >-
  Découvrez comment configurer le stockage S3 pour Milvus avec Docker Compose ou
  Helm.
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
    </button></h1><p>Milvus utilise MinIO pour le stockage d'objets par défaut, mais il prend également en charge l'utilisation d'<a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> en tant que stockage d'objets persistants pour les fichiers journaux et les fichiers d'index. Cette rubrique décrit comment configurer S3 pour Milvus. Vous pouvez ignorer cette rubrique si vous êtes satisfait de MinIO.</p>
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configurer S3</h3><p><a href="https://min.io/product/overview">MinIO</a> est compatible avec S3. Pour configurer S3 avec Docker Compose, fournissez vos valeurs pour la section <code translate="no">minio</code> dans le fichier <code translate="no">milvus.yaml</code> sur le chemin milvus/configs.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Voir <a href="/docs/fr/v2.4.x/configure_minio.md">Configurations MinIO/S3</a> pour plus d'informations.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Affiner docker-compose.yaml</h3><p>Vous devez également supprimer la variable d'environnement <code translate="no">MINIO_ADDRESS</code> pour le service milvus à <code translate="no">docker-compose.yaml</code>. Par défaut, milvus utilisera minio local au lieu de S3 externe.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Exécuter Milvus</h3><p>Exécutez la commande suivante pour démarrer Milvus qui utilise les configurations S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Les configurations ne prennent effet qu'après le démarrage de Milvus. Voir <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Démarrer Milvus</a> pour plus d'informations.</div>
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
    </button></h2><p>Pour les clusters Milvus sur K8s, vous pouvez configurer S3 dans la même commande que celle qui démarre Milvus. Vous pouvez également configurer S3 à l'aide du fichier <code translate="no">values.yml</code> sur le chemin /charts/milvus dans le référentiel <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> avant de démarrer Milvus.</p>
<p>Le tableau suivant répertorie les clés de configuration de S3 dans le fichier YAML.</p>
<table>
<thead>
<tr><th>Clé</th><th>Description de la clé</th><th>Valeur</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Active ou désactive MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Active ou désactive S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>Le point d'extrémité pour accéder à S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>Le port pour accéder à S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>Le chemin racine du stockage S3.</td><td>Une chaîne emtpy par défaut.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>L'ID de la clé d'accès à S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>La clé d'accès secrète pour S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>Le nom de l'espace de stockage S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Utilisation ou non de SSL lors de la connexion</td><td>La valeur par défaut est <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilisation du fichier YAML</h3><ol>
<li>Configurez la section <code translate="no">minio</code> dans le fichier <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configurez la section <code translate="no">externalS3</code> en utilisant vos valeurs dans le fichier <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  port: <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  accessKey: <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  secretKey: <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Après avoir configuré les sections précédentes et enregistré le fichier <code translate="no">values.yaml</code>, exécutez la commande suivante pour installer Milvus qui utilise les configurations S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Utilisation d'une commande</h3><p>Pour installer Milvus et configurer S3, exécutez la commande suivante en utilisant vos valeurs.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Découvrez comment configurer d'autres dépendances Milvus avec Docker Compose ou Helm :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/deploy_etcd.md">Configurer le stockage de méta avec Docker Compose ou Helm</a></li>
<li><a href="/docs/fr/v2.4.x/deploy_pulsar.md">Configurer le stockage des messages avec Docker Compose ou Helm</a></li>
</ul>
