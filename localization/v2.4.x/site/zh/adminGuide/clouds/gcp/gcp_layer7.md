---
id: gcp_layer7.md
title: 为 GCP 上的 Milvus 设置七层负载平衡器
related_key: cluster
summary: 了解如何在 GCP 上的 Layer-7 负载均衡器后面部署 Milvus 集群。
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">为 GCP 上的 Milvus 设置第 7 层负载平衡器<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>与第四层负载平衡器相比，第七层负载平衡器具有智能负载平衡和缓存功能，是云原生服务的最佳选择。</p>
<p>本指南将指导您为已在第 4 层负载平衡器后面运行的 Milvus 集群设置第 7 层负载平衡器。</p>
<h3 id="Before-your-start" class="common-anchor-header">开始之前</h3><ul>
<li><p>您的 GCP 账户中已经存在一个项目。</p>
<p>要创建项目，请参阅<a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">创建和管理项目</a>。本指南中使用的项目名称是<strong>milvus-testing-nonprod</strong>。</p></li>
<li><p>您已在本地安装了<a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>、<a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> 和<a href="https://helm.sh/docs/intro/install/">Helm</a>，或者决定使用基于浏览器的<a href="https://cloud.google.com/shell">Cloud Shell</a>。</p></li>
<li><p>您已使用 GCP 账户凭据<a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">初始化了 gcloud CLI</a>。</p></li>
<li><p>您已<a href="/docs/zh/v2.4.x/gcp.md">在 GCP 的第 4 层负载平衡器后面部署了 Milvus 群集</a>。</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">调整 Milvus 配置</h3><p>本指南假定您已<a href="/docs/zh/v2.4.x/gcp.md">在 GCP 的第 4 层负载平衡器后面部署了 Milvus 群集</a>。</p>
<p>在为该 Milvus 群集设置第 7 层负载平衡器之前，请运行以下命令移除第 4 层负载平衡器。</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>作为第 7 层负载平衡器的后端服务，Milvus 必须满足<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">某些加密要求</a>，这样才能理解来自负载平衡器的 HTTP/2 请求。因此，你需要在 Milvus 集群上启用 TLS，如下所示。</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>在负载均衡器上启用 TLS：</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">设置健康检查端点</h3><p>为确保服务可用性，GCP 上的七层负载平衡需要探测后端服务的健康状况。因此，我们需要设置一个 BackendConfig 来封装健康检查端点，并通过注解将 BackendConfig 与 Milvus 服务关联起来。</p>
<p>以下代码段就是 BackendConfig 的设置。将其保存为<code translate="no">backendconfig.yaml</code> ，以便以后使用。</p>
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
<p>然后运行以下命令创建健康检查端点。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>最后，更新 Milvus 服务的注解，要求我们稍后创建的 Layer-7 负载平衡器使用刚刚创建的端点执行健康检查。</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>关于第一个注释、</p>
<p>Milvus 原生于基于 HTTP/2 的 gRPC。因此，我们可以使用 HTTP/2 作为第 7 层负载平衡器和 Milvus 之间的通信协议。</p></li>
<li><p>至于第二个注释、</p>
<p>Milvus 只通过 gRPC 和 HTTP/1 提供健康检查端点。我们需要设置一个 BackendConfig 来封装健康检查端点，并将其与 Milvus 服务关联起来，以便 Layer-7 负载均衡器探查该端点以了解 Milvus 的健康状况。</p></li>
<li><p>至于第三个注释、</p>
<p>它要求在创建入口后创建网络端点组（NEG）。当 NEG 与 GKE Ingress 一起使用时，Ingress 控制器会帮助创建负载平衡器的所有方面。这包括创建虚拟 IP 地址、转发规则、健康检查、防火墙规则等。有关详细信息，请参阅<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">Google Cloud 文档</a>。</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">准备 TLS 证书</h3><p>TLS 需要证书才能工作。<strong>创建证书有两种方法，即自我管理和 Google 管理。</strong></p>
<p>本指南使用<strong>my-release.milvus.io</strong>作为访问 Milvus 服务的域名。</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">创建自我管理证书</h4><p>运行以下命令创建证书。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>然后在 GKE 集群中用这些文件创建一个秘密，以供日后使用。</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">创建谷歌管理证书</h4><p>以下代码段是 ManagedCertificate 设置。将其保存为<code translate="no">managed-crt.yaml</code> ，以便日后使用。</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>在 GKE 集群中应用以下设置，创建受管证书：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>这可能会持续一段时间。您可以运行</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>输出结果应与下图类似：</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>一旦<strong>certificateStatus</strong>变为<strong>Active</strong>，您就可以设置负载平衡器了。</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">创建入口以生成第 7 层负载平衡器</h3><p>用以下代码段之一创建一个 YAML 文件。</p>
<ul>
<li><p>使用自我管理证书</p>
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
<li><p>使用 Google 管理的证书</p>
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
<p>然后，将该文件应用到 GKE 集群，即可创建 Ingress。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>现在，等待 Google 设置第 7 层负载平衡器。您可以运行</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>输出结果应与下图类似：</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>一旦<strong>ADDRESS</strong>字段中显示了 IP<strong>地址</strong>，第七层负载平衡器就可以使用了。端口 80 和端口 443 都显示在上述输出中。请记住，为了您的利益，应始终使用端口 443。</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">验证通过 Layer-7 负载平衡器的连接<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南使用 PyMilvus 来验证与我们刚刚创建的 Layer-7 负载均衡器后面的 Milvus 服务的连接。有关详细步骤，请<a href="https://milvus.io/docs/v2.3.x/example_code.md">阅读此文</a>。</p>
<p>请注意，连接参数会因<a href="#prepare-tls-certificates">准备 TLS 证书</a>中管理证书的方式而不同。</p>
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
<li><strong>host</strong>和<strong>port</strong>中的 IP 地址和<strong>端口号</strong>应与<a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Create an Ingress to generate a Layer-7 Load Balancer</a> 末尾列出的地址和<strong>端口号</strong>一致。</li>
<li>如果已设置 DNS 记录将域名映射到主机 IP 地址，请将<strong>host</strong>中的 IP 地址替换为域名，省略<strong>server_name</strong>。</li>
</ul>
</div>
