---
id: gcp.md
title: Implementar um cluster Milvus no GKE
related_key: cluster
summary: Saiba como implementar um cluster Milvus no GKE.
---
<h1 id="Deploy-a-Milvus-Cluster-on-GKE" class="common-anchor-header">Implantar um cluster do Milvus no GKE<button data-href="#Deploy-a-Milvus-Cluster-on-GKE" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus é um banco de dados vetorial nativo da nuvem e pode ser implantado em vários ambientes de nuvem. Este guia apresenta todos os detalhes sobre a configuração do Milvus no Google Cloud Platform (GCP).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gcp-networking.png" alt="Deploy a Milvus cluster on GCP" class="doc-image" id="deploy-a-milvus-cluster-on-gcp" />
   </span> <span class="img-wrapper"> <span>Implantar um cluster do Milvus no GCP</span> </span></p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de começar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Para implantar o Milvus no GCP, certifique-se de que</p>
<ul>
<li><p>Já existe um projeto na sua conta do GCP.</p>
<p>Para criar um projeto, consulte <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Criar e gerir projetos</a>. O nome do projeto usado neste guia é <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Você instalou localmente <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">a CLI do gcloud</a>, <a href="https://kubernetes.io/docs/tasks/tools/">o kubectl</a> e <a href="https://helm.sh/docs/intro/install/">o Helm</a> ou decidiu usar o <a href="https://cloud.google.com/shell">Cloud Shell</a> baseado em navegador.</p></li>
<li><p>Você <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">inicializou a CLI do gcloud</a> com as credenciais da sua conta do GCP.</p></li>
</ul>
<h2 id="Set-up-the-network" class="common-anchor-header">Configurar a rede<button data-href="#Set-up-the-network" class="anchor-icon" translate="no">
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
    </button></h2><p>Para garantir a segurança do Milvus, é necessário criar uma rede virtual logicamente isolada no seu projeto GCP. O comando a seguir cria um VPC.</p>
<pre><code translate="no" class="language-bash">gcloud compute networks create milvus-network \
    --project=milvus-testing-nonprod \
    --subnet-mode=auto \
    --mtu=1460 \
    --bgp-routing-mode=regional
<button class="copy-code-btn"></button></code></pre>
<p>Para facilitar o seu trabalho, também precisa de configurar várias regras de firewall para permitir o tráfego externo através de ICMP, RDP e SSH, bem como o tráfego dentro da VPC.</p>
<pre><code translate="no" class="language-bash">gcloud compute firewall-rules create milvus-network-allow-icmp \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows ICMP connections from any source to any instance on the network.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=icmp

gcloud compute firewall-rules create milvus-network-allow-internal \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows connections from any source in the network IP range to any instance on the network using all protocols.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">10.128</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">9</span> \
    --action=ALLOW --rules=<span class="hljs-built_in">all</span>

gcloud compute firewall-rules create milvus-network-allow-rdp \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows RDP connections from any source to any instance on the network using port 3389.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=tcp:<span class="hljs-number">3389</span>

gcloud compute firewall-rules create milvus-network-allow-ssh \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows TCP connections from any source to any instance on the network using port 22.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=tcp:<span class="hljs-number">22</span>
<button class="copy-code-btn"></button></code></pre>
<p>Por fim, você precisa permitir o tráfego de entrada para a instância do Milvus que criaremos mais tarde na porta <strong>19530</strong>.</p>
<pre><code translate="no" class="language-bash">gcloud compute firewall-rules create allow-milvus-<span class="hljs-keyword">in</span> \
    --project=milvus-testing-nonprod  \
    --description=<span class="hljs-string">&quot;Allow ingress traffic for Milvus on port 19530&quot;</span> \
    --direction=<span class="hljs-variable constant_">INGRESS</span> \
    --priority=<span class="hljs-number">1000</span> \
    --network=projects/milvus-testing-nonprod/<span class="hljs-variable language_">global</span>/networks/milvus-network \
    --action=<span class="hljs-variable constant_">ALLOW</span> \
    --rules=<span class="hljs-attr">tcp</span>:<span class="hljs-number">19530</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Provisionar um cluster Kubernetes<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Neste guia, usaremos o serviço Google Kubernetes Engine (GKE) para provisionar um cluster Kubernetes com dois nós na zona <strong>us-west1-a</strong>. Cada nó é uma máquina virtual do Compute Engine <strong>e2-standard-4</strong> executando a imagem <strong>COS_CONTAINERD</strong>.</p>
<div class="alert note">
<p>É recomendável usar os tipos de máquinas que oferecem uma memória mínima de 16 GB para garantir a estabilidade do serviço.</p>
</div>
<pre><code translate="no" class="language-bash">gcloud container clusters create <span class="hljs-string">&quot;milvus-cluster-1&quot;</span> \
    --project <span class="hljs-string">&quot;milvus-testing-nonprod&quot;</span> \
    --zone <span class="hljs-string">&quot;us-west1-a&quot;</span> \
    --workload-pool <span class="hljs-string">&quot;milvus-testing-nonprod.svc.id.goog&quot;</span> \
    --no-enable-basic-auth \
    --cluster-version <span class="hljs-string">&quot;1.28.10-gke.1075001&quot;</span> \
    --release-channel <span class="hljs-string">&quot;regular&quot;</span> \
    --machine-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;c2-standard-4&quot;</span> \
    --image-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;COS_CONTAINERD&quot;</span> \
    --disk-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;pd-standard&quot;</span> \
    --disk-size <span class="hljs-string">&quot;100&quot;</span> \
    --<span class="hljs-built_in">max</span>-pods-per-node <span class="hljs-string">&quot;110&quot;</span> \
    --num-nodes <span class="hljs-string">&quot;3&quot;</span> \
    --enable-ip-alias \
    --network <span class="hljs-string">&quot;projects/milvus-testing-nonprod/global/networks/milvus-network&quot;</span> \
    --subnetwork <span class="hljs-string">&quot;projects/milvus-testing-nonprod/regions/us-west1/subnetworks/milvus-network&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Levará alguns minutos para que o cluster do Kubernetes seja ativado. Quando o cluster estiver pronto, use o seguinte comando para obter suas credenciais para que você possa executar <code translate="no">kubectl</code> comandos em seu terminal para se comunicar com o cluster remotamente.</p>
<pre><code translate="no" class="language-bash">gcloud container clusters <span class="hljs-keyword">get</span>-credentials milvus-cluster<span class="hljs-number">-1</span> --zone <span class="hljs-string">&quot;us-west1-a&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Usar o Google Cloud Storage (GCS) como armazenamento de objeto externo<button data-href="#Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="anchor-icon" translate="no">
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
<li>Criar um bucket.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud storage buckets create <span class="hljs-attr">gs</span>:<span class="hljs-comment">//milvus-testing-nonprod --project=milvus-testing-nonprod --default-storage-class=STANDARD --location=us-west1 --uniform-bucket-level-access</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Gerar a chave de acesso do utilizador e a chave secreta, deve ir para a página de armazenamento do seu projeto. Na barra lateral esquerda do painel de controlo, clique em Google Cloud Storage e, em seguida, em Definições. Selecione a guia INTEROPERABILIDADE. Se ainda não o tiver ativado, clique em Acesso interoperável. Em seguida, clique no botão CRIAR UMA CHAVE para criar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/access_key.jpg" alt="GCP Access keys for your user account" class="doc-image" id="gcp-access-keys-for-your-user-account" />
   </span> <span class="img-wrapper"> <span>Chaves de acesso ao GCP para a sua conta de utilizador</span> </span></p>
<ul>
<li>Adicionar values.yaml</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
    enabled: <span class="hljs-literal">true</span>

service:
    <span class="hljs-built_in">type</span>: LoadBalancer

minio:
    enabled: <span class="hljs-literal">false</span>

externalS3:
    enabled: <span class="hljs-literal">true</span>
    host: storage.googleapis.com
    port: 443
    rootPath: milvus/my-release
    bucketName: milvus-testing-nonprod
    cloudProvider: gcp
    useSSL: <span class="hljs-literal">true</span>
    accessKey: <span class="hljs-string">&quot;&lt;access-key&gt;&quot;</span>
    secretKey: <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Implantar o Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora o cluster do Kubernetes está pronto. Vamos implantar o Milvus agora mesmo.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Nos comandos anteriores, adicionamos o repositório de gráficos do Milvus Helm localmente e atualizamos o repositório para buscar os gráficos mais recentes. Em seguida, instalamos uma instância do Milvus e chamamos-lhe <strong>my-release</strong>.</p>
<p>Observe o valor config <code translate="no">service.type</code>, que indica que gostaríamos de expor a instância do Milvus por meio de um balanceador de carga Layer-4.</p>
<p>Se você quiser expor sua instância do Milvus por meio de um balanceador de carga de Camada 7, <a href="/docs/pt/v2.4.x/gcp_layer7.md">leia isto</a>.</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">Verificar a implantação<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando todos os pods estiverem em execução, execute o seguinte comando para obter o endereço IP externo.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Olá Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Consulte <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>, altere o valor do host para o endereço IP externo e, em seguida, execute o código.</p>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Se você quiser aprender como implantar o Milvus em outras nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/eks.md">Implantar o Milvus Cluster no AWS com Kubernetes</a></li>
<li><a href="/docs/pt/v2.4.x/azure.md">Implantar o cluster do Milvus no Azure com o Kubernetes</a></li>
</ul>
