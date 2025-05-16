---
id: configure_grafana_loki.md
title: Grafana Lokiを設定する
summary: このトピックでは、Lokiを使用してログを収集し、Grafanaを使用してMilvusクラスタのログをクエリする方法について説明します。
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Grafana Lokiの設定<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvusクラスタのログを収集するLokiとログをクエリして表示するGrafanaを設定する方法について説明します。</p>
<p>このガイドでは、以下の方法を学びます：</p>
<ul>
<li>Helmを使用してMilvusクラスタに<a href="https://grafana.com/docs/loki/latest/get-started/overview/">Lokiと</a> <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtailを</a>デプロイする。</li>
<li>Lokiのオブジェクトストレージを設定する。</li>
<li>Grafanaを使用してログをクエリする。</li>
</ul>
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
<li><a href="/docs/ja/v2.4.x/install_cluster-helm.md">K8s上にMilvusクラスタをインストールして</a>いる。</li>
<li><a href="https://helm.sh/docs/intro/install/">Helmや</a> <a href="https://kubernetes.io/docs/tasks/tools/">Kubectlなどの</a>必要なツールをインストールしている。</li>
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
    </button></h2><p>LokiはPrometheusにインスパイアされたログ集計システムです。Helmを使用してLokiをデプロイし、Milvusクラスタからログを収集します。</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1.GrafanaのHelmチャートリポジトリを追加する</h3><p>HelmにGrafanaのチャートリポジトリを追加し、更新します：</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2.Lokiのオブジェクトストレージの設定</h3><p>以下のストレージオプションのいずれかを選択し、<code translate="no">loki.yaml</code> 設定ファイルを作成します：</p>
<ul>
<li><p>オプション1：ストレージにMinIOを使用する</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>オプション2：ストレージにAWS S3を使用する。</p>
<p>以下の例では、<code translate="no">&lt;accessKey&gt;</code> と<code translate="no">&lt;keyId&gt;</code> を独自の S3 アクセスキーと ID に、<code translate="no">s3.endpoint</code> を S3 エンドポイントに、<code translate="no">s3.region</code> を S3 リージョンに置き換えてください。</p>
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
<h3 id="3-Install-Loki" class="common-anchor-header">3.Lokiのインストール</h3><p>以下のコマンドを実行し、Lokiをインストールします：</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Promtailのデプロイ<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>PromtailはLokiのログ収集エージェントです。Milvusポッドからログを読み込み、Lokiに送信します。</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1.Promtail設定の作成</h3><p><code translate="no">promtail.yaml</code> 設定ファイルを作成します：</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2.Promtailのインストール</h3><p>Helmを使ってPromtailをインストールします：</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Grafanaでログをクエリする<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Grafanaをデプロイし、ログをクエリするためにLokiに接続するように設定する。</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1.Grafanaのデプロイ</h3><p>以下のコマンドを使用してGrafanaをインストールします：</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Grafanaにアクセスする前に、<code translate="no">admin</code> パスワードを取得する必要があります：</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、Grafanaポートをローカルマシンに転送する：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2.GrafanaのデータソースとしてLokiを追加する</h3><p>Grafanaが実行されたら、ログをクエリするためのデータソースとしてLokiを追加する必要があります。</p>
<ol>
<li>ウェブブラウザを開き、<code translate="no">127.0.0.1:3000</code> に移動する。ユーザー名<code translate="no">admin</code> と先ほど取得したパスワードを使用してログインする。</li>
<li>左側のメニューで、<strong>Connections</strong>&gt;<strong>Add new connection</strong> を選択する。</li>
<li>表示されるページで、データソースのタイプとして<strong>Lokiを</strong>選択する。検索バーに<strong>loki</strong>と入力すると、データ・ソースを検索できます。</li>
<li>Lokiデータソースの設定で、<strong>Nameと</strong> <strong>URLを</strong>指定し、<strong>Save &amp; testを</strong>クリックします。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>データソース</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3.Milvusログの照会</h3><p>Lokiをデータソースとして追加したら、GrafanaでMilvusのログを照会する：</p>
<ol>
<li>左側のメニューで、<strong>Exploreを</strong>クリックする。</li>
<li>ページの左上隅で、loki データソースを選択する。</li>
<li><strong>Label browserを</strong>使用してラベルを選択し、ログをクエリする。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>クエリ</span> </span></p>
