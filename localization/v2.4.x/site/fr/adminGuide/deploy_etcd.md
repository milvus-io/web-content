---
id: deploy_etcd.md
title: Configurer Meta Storage avec Docker Compose ou Helm
related_key: 'S3, storage'
summary: Apprenez à configurer le méta stockage pour Milvus avec Docker Compose/Helm.
---
<h1 id="Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurer le stockage des métadonnées avec Docker Compose ou Helm<button data-href="#Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilise etcd pour stocker les métadonnées. Cette rubrique explique comment configurer etcd avec Docker Compose ou Helm.</p>
<h2 id="Configure-etcd-with-Docker-Compose" class="common-anchor-header">Configurer etcd avec Docker Compose<button data-href="#Configure-etcd-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-etcd" class="common-anchor-header">1. Configurer etcd</h3><p>Pour configurer etcd avec Docker Compose, fournissez vos valeurs pour la section <code translate="no">etcd</code> dans le fichier <code translate="no">milvus.yaml</code> sur le chemin milvus/configs.</p>
<pre><code translate="no">etcd:
  endpoints:
    - localhost:<span class="hljs-number">2379</span>
  rootPath: by-dev <span class="hljs-comment"># The root path where data are stored in etcd</span>
  metaSubPath: meta <span class="hljs-comment"># metaRootPath = rootPath + &#x27;/&#x27; + metaSubPath</span>
  kvSubPath: kv <span class="hljs-comment"># kvRootPath = rootPath + &#x27;/&#x27; + kvSubPath</span>
  log:
    <span class="hljs-comment"># path is one of:</span>
    <span class="hljs-comment">#  - &quot;default&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stderr&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stdout&quot; as os.Stdout,</span>
    <span class="hljs-comment">#  - file path to append server logs to.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log</span>
    path: stdout
    level: info <span class="hljs-comment"># Only supports debug, info, warn, error, panic, or fatal. Default &#x27;info&#x27;.</span>
  use:
    <span class="hljs-comment"># please adjust in embedded Milvus: true</span>
    embed: false <span class="hljs-comment"># Whether to enable embedded Etcd (an in-process EtcdServer).</span>
  data:
    <span class="hljs-comment"># Embedded Etcd only.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/etcdData/</span>
    <span class="hljs-built_in">dir</span>: default.etcd
<button class="copy-code-btn"></button></code></pre>
<p>Voir <a href="/docs/fr/v2.4.x/configure_etcd.md">Configurations liées à etcd</a> pour plus d'informations.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Exécuter Milvus</h3><p>Exécutez la commande suivante pour démarrer Milvus qui utilise les configurations etcd.</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Les configurations ne prennent effet qu'après le démarrage de Milvus. Voir <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Démarrer Milvus</a> pour plus d'informations.</div>
<h2 id="Configure-etcd-on-K8s" class="common-anchor-header">Configurer etcd sur K8s<button data-href="#Configure-etcd-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les clusters Milvus sur K8s, vous pouvez configurer etcd dans la même commande que celle qui démarre Milvus. Vous pouvez également configurer etcd à l'aide du fichier <code translate="no">values.yml</code> dans le chemin /charts/milvus du référentiel <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> avant de démarrer Milvus.</p>
<p>Le tableau suivant répertorie les clés de configuration de etcd dans le fichier YAML.</p>
<table>
<thead>
<tr><th>Clé</th><th>Description de la clé</th><th>Valeur</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">etcd.enabled</code></td><td>Active ou désactive etcd.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.enabled</code></td><td>Active ou désactive etcd. externe.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.endpoints</code></td><td>Le point d'accès à etcd.</td><td></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilisation du fichier YAML</h3><ol>
<li>Configurez la section <code translate="no">etcd</code> en utilisant vos valeurs dans le fichier <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">etcd</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configurez la section <code translate="no">externaletcd</code> en utilisant vos valeurs dans le fichier <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalEtcd:
  enabled: <span class="hljs-literal">true</span>
  <span class="hljs-comment">## the endpoints of the external etcd</span>
  endpoints:
    - &lt;your_etcd_IP&gt;:2379
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Après avoir configuré les sections précédentes et enregistré le fichier <code translate="no">values.yaml</code>, exécutez la commande suivante pour installer Milvus qui utilise les configurations etcd.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Utilisation d'une commande</h3><p>Pour installer Milvus et configurer etcd, exécutez la commande suivante en utilisant vos valeurs.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> etcd.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externaletcd.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalEtcd.endpoints={&lt;your_etcd_IP&gt;:2379}
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
    </button></h2><p>Découvrez comment configurer d'autres dépendances de Milvus avec Docker Compose ou Helm :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/deploy_s3.md">Configurer le stockage d'objets avec Docker Compose ou Helm</a></li>
<li><a href="/docs/fr/v2.4.x/deploy_pulsar.md">Configurer le stockage des messages avec Docker Compose ou Helm</a></li>
</ul>
