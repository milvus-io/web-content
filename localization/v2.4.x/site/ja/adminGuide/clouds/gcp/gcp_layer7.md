---
id: gcp_layer7.md
title: GCP上のMilvusにレイヤー7ロードバランサーをセットアップする
related_key: cluster
summary: GCP上のLayer-7ロードバランサーの背後にMilvusクラスタをデプロイする方法を学びます。
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">GCP上のMilvusにレイヤー7ロードバランサーをセットアップする<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>Layer-4ロードバランサと比較すると、Layer-7ロードバランサはスマートなロードバランシングとキャッシュ機能を提供し、クラウドネイティブなサービスに最適です。</p>
<p>このガイドでは、Layer-4ロードバランサーの背後ですでに稼働しているMilvusクラスタにLayer-7ロードバランサーをセットアップする手順を説明します。</p>
<h3 id="Before-your-start" class="common-anchor-header">始める前に</h3><ul>
<li><p>GCPアカウントにプロジェクトが既に存在している。</p>
<p>プロジェクトを作成するには、<a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">プロジェクトの作成と</a>管理を参照してください。このガイドで使用するプロジェクトの名前は<strong>milvus-testing-nonprod</strong> です。</p></li>
<li><p><a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>、<a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a>、および<a href="https://helm.sh/docs/intro/install/">Helm を</a>ローカルにインストールしたか、代わりにブラウザベースの<a href="https://cloud.google.com/shell">Cloud Shell</a>を使用することにしました。</p></li>
<li><p>GCP アカウント認証情報を使用して<a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">gcloud CLI を初期化</a>しました。</p></li>
<li><p><a href="/docs/ja/v2.4.x/gcp.md">GCP上のLayer-4ロードバランサーの背後にMilvusクラスタをデプロイ</a>しました。</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Milvus設定の微調整</h3><p>このガイドでは、<a href="/docs/ja/v2.4.x/gcp.md">GCP上のLayer-4ロードバランサの背後にMilvusクラスタをデプロイ</a>済みであることを前提としています。</p>
<p>このMilvusクラスタにLayer-7ロードバランサをセットアップする前に、以下のコマンドを実行してLayer-4ロードバランサを削除してください。</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Layer-7ロードバランサのバックエンドサービスとして、MilvusはロードバランサからのHTTP/2リクエストを理解できるように、<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">特定の暗号化要件を</a>満たす必要があります。そのため、以下のようにMilvusクラスタでTLSを有効にする必要があります。</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>tls.yamlの内容を確認します：</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">ヘルスチェックエンドポイントの設定</h3><p>サービスの可用性を確保するために、GCP上のレイヤー7ロードバランシングではバックエンドサービスのヘルスコンディションをプローブする必要がある。そのため、ヘルスチェックエンドポイントをラップするBackendConfigをセットアップし、アノテーションを通じてBackendConfigとMilvusサービスを関連付ける必要がある。</p>
<p>以下のスニペットはBackendConfigの設定です。後で使用するために<code translate="no">backendconfig.yaml</code> として保存してください。</p>
<pre><code translate="no" class="language-yaml">apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: my-release-backendconfig
  namespace: default
spec:
  healthCheck:
    port: 9091
    requestPath: /healthz
    <span class="hljs-built_in">type</span>: HTTP
<button class="copy-code-btn"></button></code></pre>
<p>次に以下のコマンドを実行し、ヘルスチェックエンドポイントを作成します。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>最後に、Milvusサービスのアノテーションを更新して、後で作成するLayer-7ロードバランサーに、作成したエンドポイントを使ってヘルスチェックを実行するように依頼する。</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>最初のアノテーションについて、</p>
<p>MilvusはHTTP/2をベースに構築されたgRPCをネイティブとしている。そのため、Layer-7ロードバランサーとMilvus間の通信プロトコルとしてHTTP/2を使うことができる。</p></li>
<li><p>2つ目の注釈について、</p>
<p>MilvusはgRPCとHTTP/1上でヘルスチェックエンドポイントを提供するだけです。ヘルスチェックエンドポイントをラップするBackendConfigを設定し、Milvusサービスと関連付け、Layer-7ロードバランサーがこのエンドポイントにMilvusの健康状態をプローブする必要があります。</p></li>
<li><p>3番目の注釈について、</p>
<p>Ingressの作成後にネットワークエンドポイントグループ（NEG）を作成するよう求めている。NEG が GKE Ingress とともに使用される場合、Ingress コントローラーはロードバランサーのすべての側面の作成を容易にする。これには仮想IPアドレスの作成、転送ルール、ヘルスチェック、ファイアウォールルールなどが含まれる。詳しくは<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">Google Cloudのドキュメントを</a>参照してください。</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">TLS証明書の準備</h3><p>TLSを動作させるには証明書が必要です。<strong>証明書を作成するには、自己管理型とGoogle管理型の2つの方法があります。</strong></p>
<p>このガイドでは、Milvusサービスにアクセスするためのドメイン名として<strong>my-release.milvus.ioを</strong>使用します。</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">自己管理型証明書の作成</h4><p>以下のコマンドを実行して証明書を作成します。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>その後、後で使用するために、これらのファイルを使ってGKEクラスタにシークレットを作成します。</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Googleマネージド証明書の作成</h4><p>以下のスニペットは ManagedCertificate の設定です。後で使用するために<code translate="no">managed-crt.yaml</code> として保存してください。</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>以下のように GKE クラスタに設定を適用して、マネージド証明書を作成します：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>これはしばらく続く可能性があります。を実行することで進捗を確認できます。</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>出力は以下のようになるはずです：</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p><strong>certificateStatusが</strong> <strong>Activeに</strong>変わったら、ロードバランサーのセットアップは完了です。</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">レイヤ7ロードバランサを生成するためにIngressを作成する</h3><p>以下のいずれかのスニペットで YAML ファイルを作成する。</p>
<ul>
<li><p>自己管理型証明書を使う</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: networking.<span class="hljs-property">k8s</span>.<span class="hljs-property">io</span>/v1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Ingress</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release-milvus
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">tls</span>:
  - <span class="hljs-attr">hosts</span>:
    - my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">secretName</span>: my-release-milvus-tls
  <span class="hljs-attr">rules</span>:
  - <span class="hljs-attr">host</span>: my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">http</span>:
      <span class="hljs-attr">paths</span>:
      - <span class="hljs-attr">path</span>: /
        <span class="hljs-attr">pathType</span>: <span class="hljs-title class_">Prefix</span>
        <span class="hljs-attr">backend</span>:
          <span class="hljs-attr">service</span>:
            <span class="hljs-attr">name</span>: my-release-milvus
            <span class="hljs-attr">port</span>:
              <span class="hljs-attr">number</span>: <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Google が管理する証明書を使う</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-release-milvus
  namespace: default
  annotations:
    networking.gke.io/managed-certificates: <span class="hljs-string">&quot;my-release-milvus-tls&quot;</span>
spec:
  rules:
  - host: my-release.milvus.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-release-milvus
            port:
              number: 19530
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>次に、このファイルを GKE クラスタに適用して Ingress を作成します。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>あとはGoogleがLayer-7ロードバランサーをセットアップするのを待つ。を実行することで進捗を確認できる。</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>出力は以下のようになるはずだ：</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p><strong>ADDRESS</strong>フィールドに IP アドレスが表示されたら、Layer-7 ロードバランサは使用可能です。上の出力ではポート 80 とポート 443 の両方が表示されています。常にポート 443 を使用することを忘れないでください。</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Layer-7 ロードバランサ経由の接続を確認する<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>このガイドでは PyMilvus を使って、先ほど作成した Layer-7 ロードバランサーの背後にある Milvus サービスへの接続を検証します。詳しい手順は<a href="https://milvus.io/docs/v2.3.x/example_code.md">こちらを読んで</a>ください。</p>
<p>接続パラメータは、<a href="#prepare-tls-certificates">Prepare TLS certificatesで</a>証明書を管理する方法によって異なることに注意してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># For self-managed certificates, you need to include the certificate in the parameters used to set up the connection.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, server_pem_path=<span class="hljs-string">&quot;tls.crt&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)

<span class="hljs-comment"># For Google-managed certificates, there is not need to do so.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><strong>host</strong>と<strong>port</strong>の IP アドレスとポート番号は、<a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Create an Ingress to generate a Layer-7 Load Balancer</a> の最後に挙げたものと一致させる。</li>
<li>ドメイン名をホストIPアドレスにマッピングするDNSレコードを設定している場合は、<strong>hostの</strong>IPアドレスをドメイン名に置き換え、<strong>server_nameを</strong>省略します。</li>
</ul>
</div>
