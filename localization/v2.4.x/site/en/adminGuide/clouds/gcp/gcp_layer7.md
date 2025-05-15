---
id: gcp_layer7.md
title: Set up a Layer-7 Load Balancer for Milvus on GCP
related_key: cluster
summary: Learn how to deploy a Milvus cluster behind a Layer-7 load balancer on GCP.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Set up a Layer-7 Load Balancer for Milvus on GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>When compared to a Layer-4 load balancer, a Layer-7 load balancer offers smart load balancing and caching capabilities and is a great choice for cloud-native services.</p>
<p>This guide walks you through setting up a layer-7 load balancer for a Milvus cluster already running behind a Layer-4 load balancer.</p>
<h3 id="Before-your-start" class="common-anchor-header">Before your start</h3><ul>
<li><p>A project already exists in your GCP account.</p>
<p>To create a project, refer to <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Creating and managing projects</a>. The name of the project used in this guide is <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>You have locally installed <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a>, and <a href="https://helm.sh/docs/intro/install/">Helm</a>, or decided to use the browser-based <a href="https://cloud.google.com/shell">Cloud Shell</a> instead.</p></li>
<li><p>You have <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">initialized the gcloud CLI</a> with your GCP account credentials.</p></li>
<li><p>You have <a href="/docs/v2.4.x/gcp.md">deployed a Milvus cluster behind a Layer-4 load balancer on GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Tweak Milvus configurations</h3><p>This guide assumes that you have already <a href="/docs/v2.4.x/gcp.md">deployed a Milvus cluster behind a Layer-4 load balancer on GCP</a>.</p>
<p>Before setting up a Layer-7 load balancer for this Milvus cluster, run the following command to remove the Layer-4 load balancer.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.type=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>As a backend service of the Layer-7 load balancer, Milvus has to meet <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">certain encryption requirements</a> so that it can understand the HTTP/2 requests from the load balancer. Therefore, you need to enable TLS on your Milvus cluster as follows.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>the tls.yaml content:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        tlsMode: 1
</span><button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Set up a health check endpoint</h3><p>To ensure service availability, Layer-7 load balancing on GCP requires probing the health conditions of the backend service. Therefore, we need to set up a BackendConfig to wrap up the health check endpoint and associate the BackendConfig with the Milvus service through annotations.</p>
<p>The following snippet is the BackendConfig settings. Save it as <code translate="no">backendconfig.yaml</code> for later use.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cloud.google.com/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">BackendConfig</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-backendconfig</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">healthCheck:</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9091</span>
    <span class="hljs-attr">requestPath:</span> <span class="hljs-string">/healthz</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">HTTP</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then run the following command to create the health check endpoint.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Finally, update the annotations of the Milvus service to ask the Layer-7 load balancer that we will create later to perform health checks using the endpoint just created.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>As to the first annotation,</p>
<p>Milvus is native to gRPC, which is built upon HTTP/2. Therefore, we can use HTTP/2 as the communication protocol between the Layer-7 load balancer and Milvus.</p></li>
<li><p>As to the second annotation,</p>
<p>Milvus only offers the health check endpoint over gRPC and HTTP/1. We need to set up a BackendConfig to wrap the health check endpoint and associate it with the Milvus service so that the Layer-7 load balancer probes this endpoint for the health condition of Milvus.</p></li>
<li><p>As to the third annotation,</p>
<p>It asks for the creation of a network endpoint group (NEG) after an Ingress is created. When NEGs are used with GKE Ingress, the Ingress controller facilitates the creation of all aspects of the load balancer. This includes creating the virtual IP address, forwarding rules, health checks, firewall rules, and more. For details, refer to <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">Google Cloud docs</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Prepare TLS certificates</h3><p>TLS requires certificates to work. <strong>There are two ways to create certificates, namely self-managed and Google-managed.</strong></p>
<p>This guide uses <strong>my-release.milvus.io</strong> as the domain name to access our Milvus service.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Create self-managed certificates</h4><p>Run the following commands to create a certificate.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Generates a tls.key.</span>
openssl genrsa -out tls.key 2048

<span class="hljs-comment"># Creates a certificate and signs it with the preceding key.</span>
openssl req -new -key tls.key -out tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days 99999 -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -out tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>Then create a secret in your GKE cluster with these files for later use.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Create Google-managed certificates</h4><p>The following snippet is a ManagedCertificate setting. Save it as <code translate="no">managed-crt.yaml</code> for later use.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">networking.gke.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">ManagedCertificate</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus-tls</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">domains:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">my-release.milvus.io</span>
<button class="copy-code-btn"></button></code></pre>
<p>Create a managed certificate by applying the setting to your GKE cluster as follows:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>This could last for a while. You can check the progress by running</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>The output should be similar to the following:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Once <strong>certificateStatus</strong> turns to <strong>Active</strong>, you are ready to set up the load balancer.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Create an Ingress to generate a Layer-7 Load Balancer</h3><p>Create a YAML file with one of the following snippets.</p>
<ul>
<li><p>Using self-managed certificates</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">networking.k8s.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Ingress</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">tls:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">hosts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">my-release.milvus.io</span>
    <span class="hljs-attr">secretName:</span> <span class="hljs-string">my-release-milvus-tls</span>
  <span class="hljs-attr">rules:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">host:</span> <span class="hljs-string">my-release.milvus.io</span>
    <span class="hljs-attr">http:</span>
      <span class="hljs-attr">paths:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">path:</span> <span class="hljs-string">/</span>
        <span class="hljs-attr">pathType:</span> <span class="hljs-string">Prefix</span>
        <span class="hljs-attr">backend:</span>
          <span class="hljs-attr">service:</span>
            <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus</span>
            <span class="hljs-attr">port:</span>
              <span class="hljs-attr">number:</span> <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Using Google-managed certificates</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">networking.k8s.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Ingress</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">networking.gke.io/managed-certificates:</span> <span class="hljs-string">&quot;my-release-milvus-tls&quot;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">rules:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">host:</span> <span class="hljs-string">my-release.milvus.io</span>
    <span class="hljs-attr">http:</span>
      <span class="hljs-attr">paths:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">path:</span> <span class="hljs-string">/</span>
        <span class="hljs-attr">pathType:</span> <span class="hljs-string">Prefix</span>
        <span class="hljs-attr">backend:</span>
          <span class="hljs-attr">service:</span>
            <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus</span>
            <span class="hljs-attr">port:</span>
              <span class="hljs-attr">number:</span> <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Then you can create the Ingress by applying the file to your GKE cluster.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Now, wait for Google to set up the Layer-7 load balancer. You can check the progress by running</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>The output should be similar to the following:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Once an IP address is displayed in the <strong>ADDRESS</strong> field, the Layer-7 load balancer is ready to use. Both port 80 and port 443 are displayed in the above output. Remember, you should always use port 443 for your own good.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Verify the connection through the Layer-7 load balancer<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>This guide uses PyMilvus to verify the connection to the Milvus service behind the Layer-7 load balancer we have just created. For detailed steps, <a href="https://milvus.io/docs/v2.3.x/example_code.md">read this</a>.</p>
<p>Notice that connection parameters vary with the way you choose to manage the certificates in <a href="#prepare-tls-certificates">Prepare TLS certificates</a>.</p>
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
<li>The IP address and port number in <strong>host</strong> and <strong>port</strong> should match those listed at the end of <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Create an Ingress to generate a Layer-7 Load Balancer</a>.</li>
<li>If you have set up a DNS record to map domain name to the host IP address, replace the IP address in <strong>host</strong> with the domain name and omit <strong>server_name</strong>.</li>
</ul>
</div>
