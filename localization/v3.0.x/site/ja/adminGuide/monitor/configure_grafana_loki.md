---
id: configure_grafana_loki.md
title: Grafana Loki の設定
summary: このトピックでは、Loki を使用してログを収集する方法と、Grafana を使用して Milvus クラスターのログをクエリする方法について説明します。
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Grafana Loki の設定<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus クラスタのログを収集するために Loki を設定し、ログをクエリして表示するために Grafana を設定する方法について説明します。</p>
<p>このガイドでは、以下の手順について説明します：</p>
<ul>
<li>Helm を使用して Milvus クラスターに<a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a>および<a href="https://grafana.com/docs/alloy/latest/">Alloy</a>をデプロイする。</li>
<li>Loki用のオブジェクトストレージを設定する。</li>
<li>Grafana を使用したログのクエリ。</li>
</ul>
<p>参考までに、<a href="https://grafana.com/docs/loki/latest/send-data/promtail/#promtail-agent">Promtailは</a>2026年3月2日にサポート終了（EOL）となりました。
このガイドでは、Grafana LabsがKubernetesログを収集し、Lokiに転送するためのエージェントとして推奨しているAlloyを使用します。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/install_cluster-helm.md">K8s上にMilvusクラスターがインストールされている</a>こと。</li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a>や<a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a> などの必要なツールがインストールされていること。</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Lokiのデプロイ<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Lokiは、Prometheusを参考にしたログ集約システムです。Helmを使用してLokiをデプロイし、Milvusクラスターからログを収集します。</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. GrafanaのHelmチャートリポジトリを追加する<button data-href="#1-Add-Grafanas-Helm-Chart-Repository" class="anchor-icon" translate="no">
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
    </button></h3><p>GrafanaのチャートリポジトリをHelmに追加し、更新します:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Loki用のオブジェクトストレージを設定する<button data-href="#2-Configure-Object-Storage-for-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のストレージオプションのいずれかを選択し、<code translate="no">loki.yaml</code> 設定ファイルを作成します:</p>
<ul>
<li><p>オプション 1: MinIO をストレージとして使用</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>オプション 2: ストレージとして AWS S3 を使用する</p>
<p>以下の例では、「<code translate="no">&lt;accessKey&gt;</code> 」と「<code translate="no">&lt;keyId&gt;</code> 」を各自の S3 アクセスキーおよび ID に、「<code translate="no">s3.endpoint</code> 」を S3 エンドポイントに、「<code translate="no">s3.region</code> 」を S3 リージョンに置き換えてください。</p>
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
<h3 id="3-Install-Loki" class="common-anchor-header">3. Lokiのインストール<button data-href="#3-Install-Loki" class="anchor-icon" translate="no">
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
    </button></h3><p>Loki をインストールするには、次のコマンドを実行します:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Alloy" class="common-anchor-header">Alloyのデプロイ<button data-href="#Deploy-Alloy" class="anchor-icon" translate="no">
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
    </button></h2><p>Alloy<a href="https://grafana.com/docs/alloy/latest/configure/">の設定方法について</a>説明します。</p>
<h3 id="1-Create-Alloy-Configuration" class="common-anchor-header">1. Alloyの設定を作成する<button data-href="#1-Create-Alloy-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>すべての Kubernetes ポッドのログを収集し、loki-gateway 経由で Loki に送信するために、以下の `<code translate="no">alloy.yaml</code> ` を使用します:</p>
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
<h3 id="2-Install-Alloy" class="common-anchor-header">2. Alloyのインストール<button data-href="#2-Install-Alloy" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">helm install --values alloy.yaml alloy grafana/alloy -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Grafana でのログクエリ<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Grafanaをデプロイし、ログをクエリするためにLokiに接続するよう設定します。</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Grafanaのデプロイ<button data-href="#1-Deploy-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のコマンドを使用して Grafana をインストールします:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Grafanaにアクセスするには、まず<code translate="no">admin</code> のパスワードを取得する必要があります:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=&quot;{.data.admin-password}&quot; | base64 --decode ; echo
<button class="copy-code-btn"></button></code></pre>
<p>次に、Grafanaのポートをローカルマシンに転送します:</p>
<pre><code translate="no" class="language-shell">export POD_NAME=$(kubectl get pods --namespace monitoring -l &quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot; -o jsonpath=&quot;{.items[0].metadata.name}&quot;)
kubectl --namespace monitoring port-forward $POD_NAME 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. GrafanaにLokiをデータソースとして追加する<button data-href="#2-Add-Loki-as-a-Data-Source-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h3><p>Grafanaが起動したら、ログをクエリするためにLokiをデータソースとして追加する必要があります。</p>
<ol>
<li>Webブラウザを開き、<code translate="no">127.0.0.1:3000</code> にアクセスします。ユーザー名「<code translate="no">admin</code> 」と、先ほど取得したパスワードを使用してログインします。</li>
<li>左側のメニューから、<strong>[Connections]</strong>&gt;<strong>[Add new connection</strong>] を選択します。</li>
<li>表示されたページで、データソースの種類として<strong>「Loki」</strong>を選択します。検索バーに<strong>「loki」</strong>と入力してデータソースを検索することもできます。</li>
<li>Loki データソースの設定で、[<strong>Name</strong>] と<strong>[URL</strong>] を指定し、[<strong>Save &amp; test</strong>] をクリックします。</li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" /> 
   <span>データソース</span>
  
 </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Milvus ログのクエリ<button data-href="#3-Query-Milvus-Logs" class="anchor-icon" translate="no">
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
    </button></h3><p>Loki をデータソースとして追加したら、Grafana で Milvus ログをクエリします:</p>
<ol>
<li>左側のメニューで「<strong>Explore</strong>」をクリックします。</li>
<li>ページの左上隅で、Loki データソースを選択します。</li>
<li>「<strong>Label browser</strong>」を使用してラベルを選択し、ログをクエリします。</li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" /> 
   <span>クエリ</span>
  
 </span></p>
