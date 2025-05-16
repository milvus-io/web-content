---
id: configure_grafana_loki.md
title: Configurer Grafana Loki
summary: >-
  Cette rubrique décrit comment collecter des journaux à l'aide de Loki et
  interroger des journaux pour un cluster Milvus à l'aide de Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Configurer Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide fournit des instructions sur la manière de configurer Loki pour collecter des journaux et Grafana pour interroger et afficher des journaux pour un cluster Milvus.</p>
<p>Dans ce guide, vous apprendrez à :</p>
<ul>
<li>Déployer <a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a> et <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> sur un cluster Milvus à l'aide de Helm.</li>
<li>Configurer le stockage d'objets pour Loki.</li>
<li>Interroger les journaux à l'aide de Grafana.</li>
</ul>
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
<li>Vous avez <a href="/docs/fr/v2.4.x/install_cluster-helm.md">installé un cluster Milvus sur K8s</a>.</li>
<li>Vous avez installé les outils nécessaires, notamment <a href="https://helm.sh/docs/intro/install/">Helm</a> et <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Déployer Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki est un système d'agrégation de logs inspiré de Prometheus. Déployez Loki à l'aide de Helm pour collecter les journaux de votre cluster Milvus.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Ajouter le dépôt de graphiques Helm de Grafana</h3><p>Ajoutez le dépôt de graphiques de Grafana à Helm et mettez-le à jour :</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Configurer le stockage d'objets pour Loki</h3><p>Choisissez l'une des options de stockage suivantes et créez un fichier de configuration <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>Option 1 : Utiliser MinIO pour le stockage</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Option 2 : Utiliser AWS S3 pour le stockage</p>
<p>Dans l'exemple suivant, remplacez <code translate="no">&lt;accessKey&gt;</code> et <code translate="no">&lt;keyId&gt;</code> par votre propre clé d'accès et ID S3, <code translate="no">s3.endpoint</code> par le point de terminaison S3, et <code translate="no">s3.region</code> par la région S3.</p>
<pre><code translate="no" class="language-yaml">loki:
  commonConfig:
    replication_factor: 1
  auth_enabled: <span class="hljs-literal">false</span>
  storage:
    bucketNames:
      chunks: loki-chunks
      ruler: loki-ruler
      admin: loki-admin
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&#x27;s3&#x27;</span>
    s3:
      endpoint: s3.us-west-2.amazonaws.com
      region: us-west-2
      secretAccessKey: &lt;accessKey&gt;
      accessKeyId: &lt;keyId&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Installer Loki</h3><p>Exécutez les commandes suivantes pour installer Loki :</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Déployer Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail est un agent de collecte de journaux pour Loki. Il lit les journaux des pods Milvus et les envoie à Loki.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Créer la configuration de Promtail</h3><p>Créer un fichier de configuration <code translate="no">promtail.yaml</code>:</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. Installer Promtail</h3><p>Installer Promtail à l'aide de Helm :</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Interroger les journaux avec Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Déployer Grafana et le configurer pour qu'il se connecte à Loki pour interroger les journaux.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Déployer Grafana</h3><p>Installez Grafana à l'aide des commandes suivantes :</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Avant de pouvoir accéder à Grafana, vous devez récupérer le mot de passe <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, transférez le port Grafana vers votre machine locale :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Ajouter Loki comme source de données dans Grafana</h3><p>Une fois Grafana lancé, vous devez ajouter Loki en tant que source de données pour interroger les journaux.</p>
<ol>
<li>Ouvrez un navigateur web et naviguez vers <code translate="no">127.0.0.1:3000</code>. Connectez-vous en utilisant le nom d'utilisateur <code translate="no">admin</code> et le mot de passe obtenu précédemment.</li>
<li>Dans le menu de gauche, choisissez <strong>Connexions</strong> &gt; <strong>Ajouter une nouvelle connexion</strong>.</li>
<li>Sur la page qui s'affiche, choisissez <strong>Loki</strong> comme type de source de données. Vous pouvez saisir <strong>loki</strong> dans la barre de recherche pour trouver la source de données.</li>
<li>Dans les paramètres de la source de données Loki, indiquez le <strong>nom</strong> et l'<strong>URL</strong>, puis cliquez sur <strong>Enregistrer et tester</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Source de données</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Interroger les journaux Milvus</h3><p>Après avoir ajouté Loki comme source de données, interrogez les journaux Milvus dans Grafana :</p>
<ol>
<li>Dans le menu de gauche, cliquez sur <strong>Explore</strong>.</li>
<li>Dans le coin supérieur gauche de la page, choisissez la source de données loki.</li>
<li>Utilisez le <strong>navigateur d'étiquettes</strong> pour sélectionner des étiquettes et interroger les journaux.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Interroger</span> </span></p>
