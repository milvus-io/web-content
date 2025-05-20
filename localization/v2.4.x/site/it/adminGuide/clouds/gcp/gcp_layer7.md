---
id: gcp_layer7.md
title: Configurare un bilanciatore di carico Layer-7 per Milvus su GCP
related_key: cluster
summary: >-
  Scoprite come distribuire un cluster Milvus dietro un bilanciatore di carico
  Layer-7 su GCP.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Configurare un bilanciatore di carico Layer-7 per Milvus su GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>Rispetto a un bilanciatore di carico Layer-4, un bilanciatore di carico Layer-7 offre funzionalità intelligenti di bilanciamento del carico e di caching ed è un'ottima scelta per i servizi cloud-nativi.</p>
<p>Questa guida illustra la configurazione di un bilanciatore di carico Layer-7 per un cluster Milvus già in esecuzione dietro un bilanciatore di carico Layer-4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Prima di iniziare</h3><ul>
<li><p>Nel vostro account GCP esiste già un progetto.</p>
<p>Per creare un progetto, consultare la sezione <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Creazione e gestione dei progetti</a>. Il nome del progetto utilizzato in questa guida è <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Avete installato localmente <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> e <a href="https://helm.sh/docs/intro/install/">Helm</a> o avete deciso di utilizzare la <a href="https://cloud.google.com/shell">Cloud Shell</a> basata su browser.</p></li>
<li><p>Avete <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">inizializzato la gcloud CLI</a> con le credenziali del vostro account GCP.</p></li>
<li><p>Avete <a href="/docs/it/v2.4.x/gcp.md">distribuito un cluster Milvus dietro un bilanciatore di carico Layer-4 su GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Modificare le configurazioni di Milvus</h3><p>Questa guida presuppone che abbiate già <a href="/docs/it/v2.4.x/gcp.md">implementato un cluster Milvus dietro un bilanciatore di carico Layer-4 su GCP</a>.</p>
<p>Prima di configurare un bilanciatore di carico Layer-7 per questo cluster Milvus, eseguire il seguente comando per rimuovere il bilanciatore di carico Layer-4.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Come servizio backend del bilanciatore di carico Layer-7, Milvus deve soddisfare <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">alcuni requisiti di crittografia</a> per poter comprendere le richieste HTTP/2 del bilanciatore di carico. Pertanto, è necessario abilitare TLS sul cluster Milvus come segue.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>il contenuto di tls.yaml:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Impostare un endpoint di controllo dello stato di salute</h3><p>Per garantire la disponibilità del servizio, il bilanciamento del carico Layer-7 su GCP richiede di sondare le condizioni di salute del servizio backend. Pertanto, è necessario impostare un BackendConfig per avvolgere l'endpoint di controllo dello stato di salute e associare il BackendConfig al servizio Milvus tramite annotazioni.</p>
<p>Il seguente frammento è l'impostazione di BackendConfig. Salvarlo come <code translate="no">backendconfig.yaml</code> per utilizzarlo in seguito.</p>
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
<p>Eseguire quindi il comando seguente per creare l'endpoint di controllo dello stato di salute.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Infine, aggiornare le annotazioni del servizio Milvus per chiedere al bilanciatore di carico Layer-7 che creeremo in seguito di eseguire i controlli sullo stato di salute usando l'endpoint appena creato.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Per quanto riguarda la prima annotazione,</p>
<p>Milvus è nativo di gRPC, che si basa su HTTP/2. Pertanto, è possibile utilizzare HTTP/2. Pertanto, possiamo usare HTTP/2 come protocollo di comunicazione tra il bilanciatore di carico Layer-7 e Milvus.</p></li>
<li><p>Per quanto riguarda la seconda annotazione,</p>
<p>Milvus offre solo l'endpoint di controllo dello stato di salute tramite gRPC e HTTP/1. Dobbiamo impostare un BackendConfig per avvolgere l'endpoint di controllo dello stato di salute e associarlo al servizio Milvus, in modo che il bilanciatore di carico Layer-7 sondi questo endpoint per le condizioni di salute di Milvus.</p></li>
<li><p>Per quanto riguarda la terza annotazione,</p>
<p>Chiede la creazione di un gruppo di endpoint di rete (NEG) dopo la creazione di un Ingress. Quando si utilizzano i NEG con GKE Ingress, il controller Ingress facilita la creazione di tutti gli aspetti del bilanciatore di carico. Ciò include la creazione dell'indirizzo IP virtuale, delle regole di inoltro, dei controlli di salute, delle regole del firewall e altro ancora. Per i dettagli, consultare i <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">documenti di Google Cloud</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Preparare i certificati TLS</h3><p>TLS richiede certificati per funzionare. <strong>Esistono due modi per creare i certificati: quelli autogestiti e quelli gestiti da Google.</strong></p>
<p>Questa guida utilizza <strong>my-release.milvus.io</strong> come nome di dominio per accedere al servizio Milvus.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Creare certificati autogestiti</h4><p>Eseguire i seguenti comandi per creare un certificato.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>Quindi create un segreto nel vostro cluster GKE con questi file per un uso successivo.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Creare certificati gestiti da Google</h4><p>Il seguente frammento è un'impostazione di ManagedCertificate. Salvarlo come <code translate="no">managed-crt.yaml</code> per un uso successivo.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>Creare un certificato gestito applicando l'impostazione al cluster GKE come segue:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>L'operazione potrebbe durare un po'. È possibile verificare i progressi eseguendo</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>L'output dovrebbe essere simile al seguente:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Quando <strong>certificateStatus</strong> diventa <strong>Active</strong>, si è pronti a configurare il bilanciatore di carico.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Creare un Ingress per generare un bilanciatore di carico Layer-7</h3><p>Creare un file YAML con uno dei seguenti snippet.</p>
<ul>
<li><p>Utilizzo di certificati autogestiti</p>
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
<li><p>Utilizzo di certificati gestiti da Google</p>
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
<p>Quindi è possibile creare l'Ingress applicando il file al cluster GKE.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A questo punto, attendere che Google imposti il bilanciatore di carico Layer-7. È possibile verificare i progressi eseguendo</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>L'output dovrebbe essere simile al seguente:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Una volta visualizzato un indirizzo IP nel campo <strong>ADDRESS</strong>, il bilanciatore di carico Layer-7 è pronto all'uso. Nell'output di cui sopra sono visualizzate sia la porta 80 che la porta 443. Ricordare che si dovrebbe sempre usare la porta 443 per il proprio bene.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Verifica della connessione attraverso il bilanciatore di carico Layer-7<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa guida utilizza PyMilvus per verificare la connessione al servizio Milvus dietro il bilanciatore di carico Layer-7 appena creato. Per i passi dettagliati, <a href="https://milvus.io/docs/v2.3.x/example_code.md">leggete qui</a>.</p>
<p>Si noti che i parametri di connessione variano a seconda del modo in cui si sceglie di gestire i certificati in <a href="#prepare-tls-certificates">Prepare TLS certificates</a>.</p>
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
<li>L'indirizzo IP e il numero di porta in <strong>host</strong> e <strong>porta</strong> devono corrispondere a quelli elencati alla fine di <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Creare un ingresso per generare un bilanciatore di carico Layer-7</a>.</li>
<li>Se si è impostato un record DNS per mappare il nome di dominio all'indirizzo IP dell'host, sostituire l'indirizzo IP in <strong>host</strong> con il nome di dominio e omettere <strong>nome_server</strong>.</li>
</ul>
</div>
