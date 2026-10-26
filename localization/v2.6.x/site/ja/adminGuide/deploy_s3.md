---
id: deploy_s3.md
title: Docker Compose または Helm を使用したオブジェクトストレージの設定
related_key: 'S3, storage'
summary: Docker Compose または Helm を使用して、Milvus 用の S3 ストレージを設定する方法について学びましょう。
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Docker Compose または Helm を使用したオブジェクトストレージの設定<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ではデフォルトで MinIO をオブジェクトストレージとして使用しますが、ログファイルやインデックスファイルの永続的なオブジェクトストレージとして<a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a>を使用することもサポートしています。このトピックでは、Milvus 向けに S3 を設定する方法について説明します。MinIO で問題ない場合は、このトピックをスキップしても構いません。</p>
<p>S3の設定は、<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>または K8s 上で行うことができます。</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Docker Compose を使用した S3 の設定<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. S3の設定<button data-href="#1-Configure-S3" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://min.io/product/overview">MinIOは</a>S3と互換性があります。Docker ComposeでS3を設定するには、milvus/configsパスにある<code translate="no">milvus.yaml</code> ファイル内の<code translate="no">minio</code> セクションに、適切な値を指定してください。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>詳細については、「<a href="/docs/ja/v2.6.x/configure_minio.md">MinIO/S3 設定</a>」を参照してください。</p>
<p>アクセスキーとシークレットキーをハードコーディングしても機能しますが、ワークロード ID をサポートするホストまたはクラスター（たとえば、EC2 インスタンスプロファイルや EKS 上の IRSA）で Milvus を実行する場合は、代わりに IAM ロールを使用することをお勧めします。<code translate="no">useIAM</code> を<code translate="no">true</code> に設定し、<code translate="no">accessKeyID</code> および<code translate="no">secretAccessKey</code> を削除します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">&quot;aws&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、MilvusはワークロードにアタッチされたIAMロールから一時的な認証情報を取得します。<code translate="no">cloudProvider</code> には<code translate="no">aws</code> 、<code translate="no">gcp</code> 、または<code translate="no">aliyun</code> を指定でき、<code translate="no">iamEndpoint</code> では、IAMロールの認証情報を取得するためのカスタムエンドポイントをオプションで指定できます。</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. docker-compose.yaml を修正する<button data-href="#2-Refine-docker-composeyaml" class="anchor-icon" translate="no">
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
    </button></h3><p>また、<code translate="no">docker-compose.yaml</code> にある milvus サービスの環境変数 `<code translate="no">MINIO_ADDRESS</code> ` を削除してください。デフォルトでは、milvus は外部の S3 ではなくローカルの Minio を使用します。</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Milvus を実行する<button data-href="#3-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>S3の設定を使用したMilvusを起動するには、次のコマンドを実行します。</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">設定は、Milvusの起動後にのみ有効になります。詳細については、「<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Milvusの起動</a>」を参照してください。</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">K8s での S3 の設定<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s上のMilvusクラスタの場合、Milvusを起動するコマンド内でS3を設定できます。あるいは、Milvusを起動する前に、<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>リポジトリの/charts/milvusパスにある<code translate="no">values.yml</code> ファイルを使用してS3を設定することもできます。</p>
<p>次の表に、YAML ファイルで S3 を設定するためのキーを一覧表示します。</p>
<table>
<thead>
<tr><th>キー</th><th>説明</th><th>値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>MinIO を有効または無効にします。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>S3を有効または無効にします。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>S3にアクセスするためのエンドポイント。</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>S3にアクセスするためのポート。</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>S3ストレージのルートパス。</td><td>デフォルトでは空の文字列です。</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>S3のアクセスキーID。</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>S3のシークレットアクセスキー。</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>S3 バケットの名前。</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>接続時にSSLを使用するかどうか</td><td>デフォルト値は<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.useIAM</code></td><td>S3へのアクセスに、アクセスキーやシークレットアクセスキーの代わりにIAMロールを使用するかどうか。</td><td>デフォルト値は<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.cloudProvider</code></td><td>IAM ロールの認証情報を発行するクラウドプロバイダー。</td><td><code translate="no">aws</code>、<code translate="no">gcp</code> 、または<code translate="no">aliyun</code> 。デフォルトは<code translate="no">aws</code></td></tr>
<tr><td><code translate="no">externalS3.iamEndpoint</code></td><td>IAM ロールの認証情報を取得するためのカスタムエンドポイント。</td><td>プロバイダーのデフォルトを使用する場合は、空のままにしてください。</td></tr>
</tbody>
</table>
<p>クラスタがワークロード ID（たとえば、EKS 上の IRSA）をサポートしている場合は、<code translate="no">externalS3.useIAM</code> を<code translate="no">true</code> に設定し、<code translate="no">externalS3.accessKey</code> および<code translate="no">externalS3.secretKey</code> を削除してください。Milvus は、ワークロードにアタッチされた IAM ロールから一時的な認証情報を取得します。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML ファイルの使用<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li><code translate="no">values.yaml</code> ファイル内の<code translate="no">minio</code> セクションを設定します。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><code translate="no">values.yaml</code> ファイル内の<code translate="no">externalS3</code> セクションを、適切な値を使用して設定します。</li>
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
<li>前述のセクションを設定し、<code translate="no">values.yaml</code> ファイルを保存した後、次のコマンドを実行して、S3 設定を使用する Milvus をインストールします。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">コマンドの使用<button data-href="#Using-a-command" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus をインストールし、S3 を設定するには、ご自身の値を使用して次のコマンドを実行してください。</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=&lt;your_s3_endpoint&gt; --set externalS3.port=&lt;your_s3_port&gt; --set externalS3.accessKey=&lt;your_s3_access_key_id&gt; --set externalS3.secretKey=&lt;your_s3_secret_key&gt; --set externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次の手順<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Docker Compose または Helm を使用して、他の Milvus 依存関係を設定する方法については、以下を参照してください:</p>
<ul>
<li><a href="/docs/ja/v2.6.x/deploy_etcd.md">Docker Compose または Helm を使用した Meta Storage の設定</a></li>
<li><a href="/docs/ja/v2.6.x/deploy_pulsar.md">Docker Compose または Helm を使用したメッセージストレージの設定</a></li>
</ul>
