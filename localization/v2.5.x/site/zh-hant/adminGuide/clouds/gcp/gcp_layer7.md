---
id: gcp_layer7.md
title: 為 GCP 上的 Milvus 設定第 7 層負載平衡器
related_key: cluster
summary: 了解如何在 GCP 上的 Layer-7 負載平衡器後面部署 Milvus 群集。
---

<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">為 GCP 上的 Milvus 設定第 7 層負載平衡器<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>與 Layer-4 負載平衡器相比，Layer-7 負載平衡器提供智慧型負載平衡和快取功能，是雲原生服務的最佳選擇。</p>
<p>本指南將教您如何為已在第 4 層負載平衡器後執行的 Milvus 集群設定第 7 層負載平衡器。</p>
<h3 id="Before-your-start" class="common-anchor-header">開始之前</h3><ul>
<li><p>您的 GCP 帳戶中已存在專案。</p>
<p>若要建立專案，請參閱<a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">建立和管理專案</a>。本指南中使用的專案名稱為<strong>milvus-testing-nonprod</strong>。</p></li>
<li><p>您已在本機安裝<a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>、<a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> 和<a href="https://helm.sh/docs/intro/install/">Helm</a>，或決定改用瀏覽器式<a href="https://cloud.google.com/shell">Cloud Shell</a>。</p></li>
<li><p>您已使用 GCP 帳戶憑證<a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">初始化 gcloud CLI</a>。</p></li>
<li><p>您已<a href="/docs/zh-hant/v2.5.x/gcp.md">在 GCP 的 Layer-4 負載平衡器後面部署 Milvus 叢集</a>。</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">調整 Milvus 配置</h3><p>本指南假設您已<a href="/docs/zh-hant/v2.5.x/gcp.md">在 GCP 的第 4 層負載平衡器後部署 Milvus 叢集</a>。</p>
<p>在為此 Milvus 叢集設定 Layer-7 負載平衡器之前，請執行下列指令移除 Layer-4 負載平衡器。</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>作為第 7 層負載平衡器的後端服務，Milvus 必須符合<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">某些加密要求</a>，這樣才能理解來自負載平衡器的 HTTP/2 請求。因此，您需要在 Milvus 集群上啟用 TLS，如下所示。</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>的 tls.yaml 內容：</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">設定健康檢查端點</h3><p>為了確保服務可用性，GCP 上的 Layer-7 負載平衡需要探測後端服務的健康狀況。因此，我們需要設定一個 BackendConfig 來包裝健康檢查端點，並透過註解將 BackendConfig 與 Milvus 服務關聯。</p>
<p>以下片段就是 BackendConfig 的設定。將它儲存為<code translate="no">backendconfig.yaml</code> ，以備日後使用。</p>
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
<p>然後執行下列指令來建立健康檢查端點。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>最後，更新 Milvus 服務的註解，要求我們稍後建立的 Layer-7 負載平衡器使用剛建立的端點執行健康檢查。</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>至於第一個註解、</p>
<p>Milvus 原生於 gRPC，而 gRPC 是建基於 HTTP/2 的。因此，我們可以使用 HTTP/2 作為 Layer-7 負載平衡器與 Milvus 之間的通訊協定。</p></li>
<li><p>至於第二個註解、</p>
<p>Milvus 只透過 gRPC 和 HTTP/1 提供健康檢查端點。我們需要設定一個 BackendConfig 來包裝健康檢查端點，並將其與 Milvus 服務關聯，以便 Layer-7 負載平衡器探測此端點以瞭解 Milvus 的健康狀況。</p></li>
<li><p>至於第三個註解、</p>
<p>它要求在建立入口後建立網路端點群組 (NEG)。當 NEG 與 GKE Ingress 一起使用時，Ingress 控制器會促進負載平衡器各方面的建立。這包括建立虛擬 IP 位址、轉寄規則、健康檢查、防火牆規則等。如需詳細資訊，請參閱<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">Google Cloud 文件</a>。</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">準備 TLS 憑證</h3><p>TLS 需要憑證才能運作。<strong>有兩種建立憑證的方法，即自我管理和 Google 管理。</strong></p>
<p>本指南使用<strong>my-release.milvus.io</strong>作為存取我們 Milvus 服務的網域名稱。</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">建立自我管理的憑證</h4><p>執行下列指令來建立證書。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
 -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
 -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>

<p>然後使用這些檔案在您的 GKE 叢集中建立一個秘密，以供日後使用。</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">建立 Google 管理的憑證</h4><p>以下片段是 ManagedCertificate 的設定。將它儲存為<code translate="no">managed-crt.yaml</code> 以備稍後使用。</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>將設定套用至您的 GKE 叢集，建立受管理的憑證，方法如下：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>這可能會持續一段時間。您可以執行</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>輸出應與以下相似：</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>一旦<strong>certificateStatus</strong>轉為<strong>Active</strong>，您就可以設定負載平衡器了。</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">建立一個 Ingress 來產生第七層負載平衡器</h3><p>使用下列其中一個片段建立 YAML 檔案。</p>
<ul>
<li><p>使用自我管理的憑證</p>
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
<li><p>使用 Google 管理的憑證</p>
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
<p>然後將檔案套用到 GKE 叢集，即可建立 Ingress。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>現在，等待 Google 設定第七層負載平衡器。您可以執行</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>輸出應該與下面相似：</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>一旦<strong>ADDRESS</strong>欄位顯示 IP 位址，Layer-7 負載平衡器就可以使用了。連接埠 80 和連接埠 443 都會顯示在上述輸出中。請記住，為了您的利益，您應該始終使用連接埠 443。</p>
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
<p>請注意，連線參數會隨著您在<a href="#prepare-tls-certificates">Prepare TLS certificates</a> 中選擇管理憑證的方式而有所不同。</p>
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
<li><strong>host</strong>和<strong>port</strong>中的 IP 位址和<strong>連接埠號</strong>應該與<a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Create an Ingress to generate a Layer-7 Load Balancer</a> 結尾所列的 IP 位址和<strong>連接埠號</strong>相符。</li>
<li>如果您已設定 DNS 記錄將網域名稱對應到主機 IP 位址，請以網域名稱取代<strong>host</strong>中的 IP 位址，並省略<strong>server_name</strong>。</li>
</ul>
</div>
