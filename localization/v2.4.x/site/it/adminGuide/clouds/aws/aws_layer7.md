---
id: aws_layer7.md
title: Configurare un bilanciatore di carico Layer-7 per Milvus su AWS
related_key: cluster
summary: >-
  Imparate a distribuire un cluster Milvus dietro un bilanciatore di carico
  Layer-7 su AWS.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">Configurare un bilanciatore di carico Layer-7 per Milvus su AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
<p>Questa guida illustra come configurare un bilanciatore di carico Layer-7 per un cluster Milvus già in esecuzione dietro a un bilanciatore di carico Layer-4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Prima di iniziare</h3><ul>
<li>Avete <a href="/docs/it/v2.4.x/eks.md">distribuito un cluster Milvus dietro un bilanciatore di carico Layer-4 su AWS</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Modificare le configurazioni di Milvus</h3><p>Questa guida presuppone che abbiate già <a href="/docs/it/v2.4.x/eks.md">implementato un cluster Milvus dietro un bilanciatore di carico Layer-4 su AWS</a>.</p>
<p>Prima di impostare un bilanciatore di carico Layer-7 per questo cluster Milvus, eseguite il seguente comando per rimuovere il bilanciatore di carico Layer-4.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Preparare i certificati TLS</h3><p>Il TLS richiede certificati per funzionare. Stiamo usando <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a> per gestire i certificati e dobbiamo importare un certificato esistente in ACM. Fare riferimento a <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">Importazione di certificati</a>. Di seguito è riportato un esempio.</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Creare un ingress per generare un bilanciatore di carico Layer-7</h3><p>Preparare il file di ingress come segue e nominarlo <code translate="no">ingress.yaml</code>. <strong>Sostituire il certificato arn e host con il proprio.</strong></p>
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
<p>Quindi è possibile creare l'Ingress applicando il file al cluster EKS.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ora, attendere che AWS imposti il bilanciatore di carico Layer-7. È possibile verificare i progressi eseguendo</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>L'output dovrebbe essere simile al seguente:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>Una volta visualizzato un indirizzo nel campo <strong>ADDRESS</strong>, il bilanciatore di carico Layer-7 è pronto per l'uso.</p>
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
<li>L'<strong>host</strong> e il <strong>nome_del_server</strong> devono essere sostituiti con i propri.</li>
<li>Se si è impostato un record DNS per mappare il nome di dominio all'alb, sostituire l'<strong>host</strong> con il nome di dominio e omettere <strong>nome_server</strong>.</li>
</ul>
</div>
