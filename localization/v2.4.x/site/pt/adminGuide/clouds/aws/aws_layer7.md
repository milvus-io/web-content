---
id: aws_layer7.md
title: Configurar um balanceador de carga de camada 7 para o Milvus no AWS
related_key: cluster
summary: >-
  Saiba como implantar um cluster Milvus por trás de um balanceador de carga
  Layer-7 no AWS.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">Configurar um balanceador de carga de camada 7 para o Milvus no AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
<li>Você implantou <a href="/docs/pt/v2.4.x/eks.md">um cluster do Milvus por trás de um balanceador de carga de camada 4 no AWS</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Ajustar as configurações do Milvus</h3><p>Este guia pressupõe que você já <a href="/docs/pt/v2.4.x/eks.md">implantou um cluster Milvus por trás de um balanceador de carga de camada 4 no AWS</a>.</p>
<p>Antes de configurar um balanceador de carga da Camada 7 para esse cluster do Milvus, execute o seguinte comando para remover o balanceador de carga da Camada 4.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Preparar certificados TLS</h3><p>O TLS requer certificados para funcionar. Estamos a usar <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">o ACM</a> para gerir certificados e precisamos de importar um certificado existente para o ACM. Consulte <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">Importar certificado</a>. A seguir, um exemplo.</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Criar um Ingress para gerar um balanceador de carga de camada 7</h3><p>Prepare o ficheiro de entrada da seguinte forma e dê-lhe o nome de <code translate="no">ingress.yaml</code>. <strong>Substitua o arn do certificado e o host pelo seu próprio.</strong></p>
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
<p>Em seguida, você pode criar o Ingress aplicando o arquivo ao cluster do EKS.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Agora, aguarde até que o AWS configure o balanceador de carga de camada 7. Você pode verificar o progresso executando</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>A saída deve ser semelhante à seguinte:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>Quando um endereço for exibido no campo <strong>ENDEREÇO</strong>, o balanceador de carga da Camada 7 estará pronto para uso.</p>
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
<li>O <strong>host</strong> e <strong>o nome_do_servidor</strong> devem ser substituídos pelo seu próprio <strong>nome</strong>.</li>
<li>Se tiver configurado um registo DNS para mapear o nome de domínio para o alb, substitua o <strong>anfitrião</strong> pelo nome de domínio e omita <strong>server_name</strong>.</li>
</ul>
</div>
