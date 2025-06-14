---
id: aws_layer7.md
title: 在 AWS 上為 Milvus 設定第 7 層負載平衡器
related_key: cluster
summary: 瞭解如何在 AWS 上的 Layer-7 負載平衡器後面部署 Milvus 叢集。
---

<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">在 AWS 上為 Milvus 設定第 7 層負載平衡器<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>與第 4 層負載平衡器相比，第 7 層負載平衡器提供智慧型負載平衡和快取功能，是雲原生服務的最佳選擇。</p>
<p>本指南將教您如何為已經在第 4 層負載平衡器後面執行的 Milvus 叢集設定第 7 層負載平衡器。</p>
<h3 id="Before-your-start" class="common-anchor-header">開始之前</h3><ul>
<li>您已<a href="/docs/zh-hant/v2.5.x/eks.md">在 AWS 的第 4 層負載平衡器後面部署了 Milvus 叢集</a>。</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">調整 Milvus 配置</h3><p>本指南假設您已<a href="/docs/zh-hant/v2.5.x/eks.md">在 AWS 的第 4 層負載平衡器後部署 Milvus 叢集</a>。</p>
<p>在為此 Milvus 叢集設定第 7 層負載平衡器之前，請執行下列指令移除第 4 層負載平衡器。</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">準備 TLS 證書</h3><p>TLS 需要憑證才能運作。我們使用<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a>管理憑證，需要將現有的憑證匯入 ACM。請參考<a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">匯入憑證</a>。以下是一個範例。</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">建立 Ingress 以產生第七層負載平衡器</h3><p>按以下方式準備 Ingress 檔案，並將其命名為<code translate="no">ingress.yaml</code> 。<strong>請將憑證 arn 和 host 改為您自己的。</strong></p>
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
rules: - host: milvus-demo.milvus.io
http:
paths: - path: /
pathType: Prefix
backend:
service:
name: milvus-demo
port:
number: 19530
<button class="copy-code-btn"></button></code></pre>

<p>然後，您就可以將該檔案套用到 EKS 叢集來建立 Ingress。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>現在，等待 AWS 設定 Layer-7 負載平衡器。您可以執行</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>輸出應該與下面相似：</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>一旦<strong>ADDRESS</strong>欄位顯示地址，Layer-7 負載平衡器就可以使用了。</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">驗證透過 Layer-7 負載平衡器的連線<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南使用 PyMilvus 來驗證與我們剛剛建立的 Layer-7 負載平衡器後面的 Milvus 服務的連線。如需詳細步驟，請<a href="https://milvus.io/docs/v2.3.x/example_code.md">閱讀此</a>內容。</p>
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
<li><strong>host</strong>和<strong>server_name</strong>應該用您自己的<strong>名稱</strong>取代。</li>
<li>如果您已經設定 DNS 記錄，將網域名稱對應到 alb，請將<strong>host</strong>改為網域名稱，並省略<strong>server_name</strong>。</li>
</ul>
</div>
