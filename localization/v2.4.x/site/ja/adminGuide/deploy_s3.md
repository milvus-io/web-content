---
id: deploy_s3.md
title: Docker ComposeまたはHelmでオブジェクトストレージを構成する
related_key: 'S3, storage'
summary: Docker ComposeまたはHelmを使用してMilvus用のS3ストレージをセットアップする方法について説明します。
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Docker ComposeまたはHelmでオブジェクトストレージを設定する<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>MilvusはデフォルトでオブジェクトストレージにMinIOを使用しますが、ログファイルやインデックスファイルの永続オブジェクトストレージとして<a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service（S3）の</a>使用もサポートしています。このトピックでは、Milvus用にS3を設定する方法について説明します。MinIOで十分であれば、このトピックはスキップできます。</p>
<p>S3は<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>またはK8sで設定できます。</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Docker ComposeでS3を設定する<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1.S3の構成</h3><p><a href="https://min.io/product/overview">MinIOは</a>S3と互換性があります。Docker ComposeでS3を設定するには、milvus/configパスの<code translate="no">milvus.yaml</code> ファイルの<code translate="no">minio</code> セクションに値を指定します。</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>詳細は<a href="/docs/ja/v2.4.x/configure_minio.md">MinIO/S3設定を</a>参照してください。</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2.docker-compose.yaml を洗練させる。</h3><p>また、<code translate="no">docker-compose.yaml</code> にある milvus サービス用の環境変数<code translate="no">MINIO_ADDRESS</code> も削除します。デフォルトでは、milvusは外部のS3の代わりにローカルのminioを使用する。</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3.Milvusの実行</h3><p>以下のコマンドを実行して、S3の設定を使用するMilvusを起動する。</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">設定はMilvusの起動後にのみ有効になる。詳細は<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Milvusの起動を</a>参照。</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">K8s上のS3の構成<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s上のMilvusクラスタでは、Milvusの起動と同じコマンドでS3を設定することができます。または、Milvusを起動する前に、<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>リポジトリの/charts/milvusパスにある<code translate="no">values.yml</code> ファイルを使用してS3を設定することもできます。</p>
<p>次の表は、YAMLファイルでS3を設定するためのキーの一覧です。</p>
<table>
<thead>
<tr><th>キー</th><th>説明</th><th>値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>MinIOを有効または無効にする。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>S3を有効または無効にする。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>S3にアクセスするエンドポイント。</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>S3にアクセスするポート。</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>S3ストレージのルートパス。</td><td>デフォルトはemtpy文字列。</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>S3のアクセスキーID</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>S3のシークレットアクセスキー</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>S3バケットの名前。</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>接続時にSSLを使用するかどうか。</td><td>デフォルトは<code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAMLファイルを使う</h3><ol>
<li><code translate="no">values.yaml</code> ファイルで<code translate="no">minio</code> セクションを設定する。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><code translate="no">values.yaml</code> ファイルの値を使用して<code translate="no">externalS3</code> セクションを設定する。</li>
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
<li>前述のセクションを設定し、<code translate="no">values.yaml</code> ファイルを保存した後、以下のコマンドを実行し、S3 設定を使用する Milvus をインストールします。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">コマンドの使用</h3><p>Milvusをインストールし、S3を設定するには、以下のコマンドを実行します。</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Docker ComposeまたはHelmを使って他のMilvusの依存関係を設定する方法を学びます：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/deploy_etcd.md">Docker ComposeまたはHelmでメタストレージを設定する</a></li>
<li><a href="/docs/ja/v2.4.x/deploy_pulsar.md">Docker ComposeまたはHelmでメッセージストレージを設定する</a></li>
</ul>
