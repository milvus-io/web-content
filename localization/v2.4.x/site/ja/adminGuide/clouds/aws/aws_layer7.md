---
id: aws_layer7.md
title: AWS上のMilvusにレイヤー7ロードバランサーをセットアップする
related_key: cluster
summary: AWS上のLayer-7ロードバランサーの背後にMilvusクラスタをデプロイする方法を学びます。
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">AWS上のMilvusにレイヤー7ロードバランサーをセットアップする<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>レイヤ4ロードバランサと比較すると、レイヤ7ロードバランサはスマートなロードバランシングとキャッシュ機能を提供し、クラウドネイティブなサービスに最適な選択です。</p>
<p>このガイドでは、Layer-4 ロードバランサーの背後で既に稼働している Milvus クラスタに対して、Layer-7 ロードバランサーを設定する手順を説明します。</p>
<h3 id="Before-your-start" class="common-anchor-header">始める前に</h3><ul>
<li><a href="/docs/ja/v2.4.x/eks.md">AWS上のLayer-4ロードバランサの後ろにMilvusクラスタをデプロイして</a>いる。</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Milvusの設定を調整する</h3><p>このガイドでは、<a href="/docs/ja/v2.4.x/eks.md">AWS上のLayer-4ロードバランサの後ろにMilvusクラスタをデプロイ</a>済みであることを前提としています。</p>
<p>このMilvusクラスタにLayer-7ロードバランサをセットアップする前に、以下のコマンドを実行してLayer-4ロードバランサを削除します。</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">TLS証明書の準備</h3><p>TLSを動作させるには証明書が必要だ。<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACMを使って</a>証明書を管理しているので、既存の証明書をACMにインポートする必要がある。<a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">証明書のインポート</a>」を参照。以下はその例である。</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">レイヤー7ロードバランサーを生成するためのイングレスの作成</h3><p>以下のようにイングレスファイルを準備し、名前を<code translate="no">ingress.yaml</code> とします。<strong>証明書の arn と host は自分のものに置き換えてください。</strong></p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: milvus
  name: milvus-demo
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/backend-protocol-version: GRPC
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: <span class="hljs-string">&#x27;[{&quot;HTTPS&quot;:443}]&#x27;</span>
    alb.ingress.kubernetes.io/certificate-arn: <span class="hljs-string">&quot;arn:aws:acm:region:account-id:certificate/certificate-id&quot;</span>

spec:
  ingressClassName: alb
  rules:
    - host: milvus-demo.milvus.io
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: milvus-demo
              port:
                number: 19530
<button class="copy-code-btn"></button></code></pre>
<p>このファイルをEKSクラスタに適用してIngressを作成します。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>あとはAWSがLayer-7ロードバランサーをセットアップするのを待つ。を実行することで進捗を確認できる。</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>出力は以下のようになるはずだ：</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p><strong>ADDRESS</strong>フィールドにアドレスが表示されたら、Layer-7 ロードバランサーの使用準備は完了です。</p>
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
    </button></h2><p>このガイドでは PyMilvus を使って、先ほど作成した Layer-7 ロードバランサの背後にある Milvus サービスへの接続を検証します。詳しい手順は<a href="https://milvus.io/docs/v2.3.x/example_code.md">こちらを読んで</a>ください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;milvus-demo.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><strong>hostと</strong> <strong>server_nameは</strong>自分のものに置き換えてください。</li>
<li>ドメイン名と alb を対応付ける DNS レコードを設定している場合は、<strong>host</strong>をドメイン名に置き換え、<strong>server_name を</strong>省略してください。</li>
</ul>
</div>
