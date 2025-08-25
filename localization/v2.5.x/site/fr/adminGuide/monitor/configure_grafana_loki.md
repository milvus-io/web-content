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
<p>Pour référence, <a href="https://grafana.com/docs/loki/latest/send-data/promtail/#promtail-agent">Promtail</a> sera déprécié. Nous introduisons donc Alloy, qui a été officiellement suggéré par Grafana Labs comme le nouvel agent pour collecter les logs Kubernetes et les transmettre à Loki.</p>
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
<li>Vous avez <a href="/docs/fr/v2.5.x/install_cluster-helm.md">installé un cluster Milvus sur K8s</a>.</li>
<li>Vous avez installé les outils nécessaires, y compris <a href="https://helm.sh/docs/intro/install/">Helm</a> et <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
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
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Ajouter le dépôt de graphiques Helm de Grafana<button data-href="#1-Add-Grafanas-Helm-Chart-Repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Ajoutez le dépôt de graphiques de Grafana à Helm et mettez-le à jour :</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Configurer le stockage d'objets pour Loki<button data-href="#2-Configure-Object-Storage-for-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>Choisissez l'une des options de stockage suivantes et créez un fichier de configuration <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>Option 1 : Utiliser MinIO pour le stockage</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Option 2 : Utiliser AWS S3 pour le stockage</p>
<p>Dans l'exemple suivant, remplacez <code translate="no">&lt;accessKey&gt;</code> et <code translate="no">&lt;keyId&gt;</code> par votre propre clé d'accès et ID S3, <code translate="no">s3.endpoint</code> par le point de terminaison S3, et <code translate="no">s3.region</code> par la région S3.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketNames:</span>
      <span class="hljs-attr">chunks:</span> <span class="hljs-string">loki-chunks</span>
      <span class="hljs-attr">ruler:</span> <span class="hljs-string">loki-ruler</span>
      <span class="hljs-attr">admin:</span> <span class="hljs-string">loki-admin</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">&#x27;s3&#x27;</span>
    <span class="hljs-attr">s3:</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.us-west-2.amazonaws.com</span>
      <span class="hljs-attr">region:</span> <span class="hljs-string">us-west-2</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;accessKey&gt;</span>
      <span class="hljs-attr">accessKeyId:</span> <span class="hljs-string">&lt;keyId&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Installer Loki<button data-href="#3-Install-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>Exécutez les commandes suivantes pour installer Loki :</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Alloy" class="common-anchor-header">Déployer Alloy<button data-href="#Deploy-Alloy" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous allons vous montrer la <a href="https://grafana.com/docs/alloy/latest/configure/">configuration d'</a>Alloy.</p>
<h3 id="1-Create-Alloy-Configuration" class="common-anchor-header">1. Créer la configuration de l'alliage<button data-href="#1-Create-Alloy-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Nous utiliserons le site suivant <code translate="no">alloy.yaml</code> pour collecter les logs de tous les pods Kubernetes et les envoyer à Loki via loki-gateway :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">alloy:</span>
  <span class="hljs-attr">enableReporting:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">resources:</span> {}
  <span class="hljs-attr">configMap:</span>
    <span class="hljs-attr">create:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">content:</span> <span class="hljs-string">|-
      loki.write &quot;default&quot; {
        endpoint {
          url = &quot;http://loki-gateway/loki/api/v1/push&quot;
        }
      }
</span>
      <span class="hljs-string">discovery.kubernetes</span> <span class="hljs-string">&quot;pod&quot;</span> {
        <span class="hljs-string">role</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;pod&quot;</span>
      }

      <span class="hljs-string">loki.source.kubernetes</span> <span class="hljs-string">&quot;pod_logs&quot;</span> {
        <span class="hljs-string">targets</span>    <span class="hljs-string">=</span> <span class="hljs-string">discovery.relabel.pod_logs.output</span>
        <span class="hljs-string">forward_to</span> <span class="hljs-string">=</span> [<span class="hljs-string">loki.write.default.receiver</span>]
      }

      <span class="hljs-string">//</span> <span class="hljs-string">Rewrite</span> <span class="hljs-string">the</span> <span class="hljs-string">label</span> <span class="hljs-string">set</span> <span class="hljs-string">to</span> <span class="hljs-string">make</span> <span class="hljs-string">log</span> <span class="hljs-string">query</span> <span class="hljs-string">easier</span>
      <span class="hljs-string">discovery.relabel</span> <span class="hljs-string">&quot;pod_logs&quot;</span> {
        <span class="hljs-string">targets</span> <span class="hljs-string">=</span> <span class="hljs-string">discovery.kubernetes.pod.targets</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;namespace&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;pod&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;pod&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;container&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;container&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;app&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_label_app_kubernetes_io_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_label_app_kubernetes_io_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;app&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;job&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_namespace&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;job&quot;</span>
          <span class="hljs-string">separator</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;$1&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">L&quot;__path__&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_uid&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_uid&quot;</span>, <span class="hljs-string">&quot;__meta_kubernetes_pod_container_name&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;__path__&quot;</span>
          <span class="hljs-string">separator</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;/var/log/pods/*$1/*.log&quot;</span>
        }

        <span class="hljs-string">//</span> <span class="hljs-string">&quot;container_runtime&quot;</span> <span class="hljs-string">&lt;-</span> <span class="hljs-string">&quot;__meta_kubernetes_pod_container_id&quot;</span>
        <span class="hljs-string">rule</span> {
          <span class="hljs-string">source_labels</span> <span class="hljs-string">=</span> [<span class="hljs-string">&quot;__meta_kubernetes_pod_container_id&quot;</span>]
          <span class="hljs-string">action</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;replace&quot;</span>
          <span class="hljs-string">target_label</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;container_runtime&quot;</span>
          <span class="hljs-string">regex</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;^(\\S+):\\/\\/.+$&quot;</span>
          <span class="hljs-string">replacement</span> <span class="hljs-string">=</span> <span class="hljs-string">&quot;$1&quot;</span>
        }
      }
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Alloy" class="common-anchor-header">2. Installer Alloy<button data-href="#2-Install-Alloy" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Interroger les logs avec Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Déployer Grafana et le configurer pour se connecter à Loki pour interroger les journaux.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Déployer Grafana<button data-href="#1-Deploy-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>Installez Grafana à l'aide des commandes suivantes :</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Avant de pouvoir accéder à Grafana, vous devez récupérer le mot de passe <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=&quot;{.data.admin-password}&quot; | base64 --decode ; echo
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, transférez le port Grafana vers votre machine locale :</p>
<pre><code translate="no" class="language-shell">export POD_NAME=$(kubectl get pods --namespace monitoring -l &quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot; -o jsonpath=&quot;{.items[0].metadata.name}&quot;)
kubectl --namespace monitoring port-forward $POD_NAME 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Ajouter Loki comme source de données dans Grafana<button data-href="#2-Add-Loki-as-a-Data-Source-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>Une fois Grafana lancé, vous devez ajouter Loki en tant que source de données pour interroger les journaux.</p>
<ol>
<li>Ouvrez un navigateur web et naviguez vers <code translate="no">127.0.0.1:3000</code>. Connectez-vous en utilisant le nom d'utilisateur <code translate="no">admin</code> et le mot de passe obtenu précédemment.</li>
<li>Dans le menu de gauche, choisissez <strong>Connexions</strong> &gt; <strong>Ajouter une nouvelle connexion</strong>.</li>
<li>Sur la page qui s'affiche, choisissez <strong>Loki</strong> comme type de source de données. Vous pouvez saisir <strong>loki</strong> dans la barre de recherche pour trouver la source de données.</li>
<li>Dans les paramètres de la source de données Loki, indiquez le <strong>nom</strong> et l'<strong>URL</strong>, puis cliquez sur <strong>Enregistrer et tester</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Source de données</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Interroger les journaux Milvus<button data-href="#3-Query-Milvus-Logs" class="anchor-icon" translate="no">
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
    </button></h3><p>Après avoir ajouté Loki comme source de données, interrogez les journaux Milvus dans Grafana :</p>
<ol>
<li>Dans le menu de gauche, cliquez sur <strong>Explore</strong>.</li>
<li>Dans le coin supérieur gauche de la page, choisissez la source de données loki.</li>
<li>Utilisez le <strong>navigateur d'étiquettes</strong> pour sélectionner des étiquettes et interroger les journaux.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Interroger</span> </span></p>
