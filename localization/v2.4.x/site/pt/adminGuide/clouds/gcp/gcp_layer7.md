---
id: gcp_layer7.md
title: Configurar um balanceador de carga de camada 7 para o Milvus no GCP
related_key: cluster
summary: >-
  Saiba como implantar um cluster Milvus por trás de um balanceador de carga
  Layer-7 no GCP.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Configurar um balanceador de carga de camada 7 para Milvus no GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>Quando comparado a um balanceador de carga de camada 4, um balanceador de carga de camada 7 oferece recursos inteligentes de balanceamento de carga e armazenamento em cache e é uma ótima opção para serviços nativos da nuvem.</p>
<p>Este guia orienta-o na configuração de um balanceador de carga de camada 7 para um cluster Milvus já em execução atrás de um balanceador de carga de camada 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Antes de começar</h3><ul>
<li><p>Já existe um projeto na sua conta do GCP.</p>
<p>Para criar um projeto, consulte <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Criar e gerenciar projetos</a>. O nome do projeto utilizado neste guia é <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Você instalou localmente <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">a CLI do gcloud</a>, <a href="https://kubernetes.io/docs/tasks/tools/">o kubectl</a> e <a href="https://helm.sh/docs/intro/install/">o Helm</a> ou decidiu usar o <a href="https://cloud.google.com/shell">Cloud Shell</a> baseado em navegador.</p></li>
<li><p>Você <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">inicializou a CLI do gcloud</a> com as credenciais da sua conta do GCP.</p></li>
<li><p><a href="/docs/pt/v2.4.x/gcp.md">Implantou um cluster do Milvus atrás de um balanceador de carga de camada 4 no GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Ajustar as configurações do Milvus</h3><p>Este guia pressupõe que você já implantou <a href="/docs/pt/v2.4.x/gcp.md">um cluster do Milvus por trás de um balanceador de carga de Camada 4 no GCP</a>.</p>
<p>Antes de configurar um balanceador de carga da Camada 7 para esse cluster do Milvus, execute o seguinte comando para remover o balanceador de carga da Camada 4.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Como serviço de back-end do balanceador de carga de camada 7, o Milvus tem de cumprir <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">determinados requisitos de encriptação</a> para que possa compreender os pedidos HTTP/2 do balanceador de carga. Portanto, é necessário habilitar o TLS no cluster do Milvus da seguinte forma.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>o conteúdo de tls.yaml:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Configurar um ponto de extremidade de verificação de integridade</h3><p>Para garantir a disponibilidade do serviço, o balanceamento de carga da camada 7 no GCP requer a sondagem das condições de saúde do serviço de back-end. Portanto, precisamos configurar um BackendConfig para envolver o ponto de extremidade de verificação de integridade e associar o BackendConfig ao serviço Milvus por meio de anotações.</p>
<p>O snippet a seguir é a configuração do BackendConfig. Guarde-o como <code translate="no">backendconfig.yaml</code> para utilização posterior.</p>
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
<p>Em seguida, execute o seguinte comando para criar o ponto de extremidade de verificação de integridade.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Por fim, atualize as anotações do serviço Milvus para solicitar ao balanceador de carga Layer-7 que criaremos mais tarde que realize verificações de integridade usando o endpoint que acabamos de criar.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Quanto à primeira anotação,</p>
<p>O Milvus é nativo do gRPC, que é construído com base no HTTP/2. Portanto, podemos usar o HTTP/2 como protocolo de comunicação entre o balanceador de carga Layer-7 e o Milvus.</p></li>
<li><p>Quanto à segunda anotação,</p>
<p>O Milvus só oferece o ponto de extremidade de verificação da saúde através de gRPC e HTTP/1. Precisamos de configurar um BackendConfig para envolver o ponto de extremidade de verificação da saúde e associá-lo ao serviço Milvus, de modo a que o equilibrador de carga da camada 7 sondasse este ponto de extremidade para saber o estado de saúde do Milvus.</p></li>
<li><p>Quanto à terceira anotação,</p>
<p>Solicita a criação de um grupo de pontos finais de rede (NEG) após a criação de um Ingress. Quando os NEGs são utilizados com o GKE Ingress, o controlador Ingress facilita a criação de todos os aspectos do equilibrador de carga. Isso inclui a criação do endereço IP virtual, regras de encaminhamento, verificações de integridade, regras de firewall e muito mais. Para obter detalhes, consulte <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">os documentos do Google Cloud</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Preparar certificados TLS</h3><p>O TLS requer certificados para funcionar. <strong>Há duas maneiras de criar certificados: autogerenciados e gerenciados pelo Google.</strong></p>
<p>Este guia utiliza <strong>my-release.milvus.io</strong> como nome de domínio para aceder ao nosso serviço Milvus.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Criar certificados autogeridos</h4><p>Execute os seguintes comandos para criar um certificado.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, crie um segredo no seu cluster GKE com estes ficheiros para utilização posterior.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Criar certificados geridos pelo Google</h4><p>O seguinte snippet é uma configuração ManagedCertificate. Guarde-o como <code translate="no">managed-crt.yaml</code> para utilização posterior.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>Crie um certificado gerido aplicando a definição ao seu cluster GKE da seguinte forma:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Isto pode demorar algum tempo. Pode verificar o progresso executando</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>O resultado deve ser semelhante ao seguinte:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Quando <strong>certificateStatus</strong> mudar para <strong>Active</strong>, estará pronto para configurar o balanceador de carga.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Criar um Ingress para gerar um balanceador de carga da camada 7</h3><p>Crie um arquivo YAML com um dos seguintes snippets.</p>
<ul>
<li><p>Usando certificados autogerenciados</p>
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
<li><p>Usando certificados gerenciados pelo Google</p>
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
<p>Em seguida, pode criar o Ingress aplicando o ficheiro ao seu cluster GKE.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Agora, aguarde que o Google configure o balanceador de carga da camada 7. Pode verificar o progresso executando</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>A saída deve ser semelhante à seguinte:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Assim que for apresentado um endereço IP no campo <strong>ENDEREÇO</strong>, o balanceador de carga da camada 7 está pronto a ser utilizado. Tanto a porta 80 quanto a porta 443 são exibidas na saída acima. Lembre-se de que você deve sempre usar a porta 443 para seu próprio bem.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Verificar a conexão através do balanceador de carga Layer-7<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>Este guia usa o PyMilvus para verificar a conexão com o serviço Milvus por trás do balanceador de carga Layer-7 que acabamos de criar. Para obter etapas detalhadas, <a href="https://milvus.io/docs/v2.3.x/example_code.md">leia isto</a>.</p>
<p>Observe que os parâmetros de conexão variam de acordo com a maneira escolhida para gerenciar os certificados em <a href="#prepare-tls-certificates">Preparar certificados TLS</a>.</p>
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
<li>O endereço IP e o número da porta em <strong>host</strong> e <strong>porta</strong> devem corresponder aos listados no final de <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Criar um Ingress para gerar um balanceador de carga de camada 7</a>.</li>
<li>Se tiver configurado um registo DNS para mapear o nome de domínio para o endereço IP do anfitrião, substitua o endereço IP em <strong>anfitrião</strong> pelo nome de domínio e omita <strong>nome_do_servidor</strong>.</li>
</ul>
</div>
