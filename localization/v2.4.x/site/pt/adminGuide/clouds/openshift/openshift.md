---
id: openshift.md
title: Implantar um cluster do Milvus no OpenShift
related_key: cluster
summary: Saiba como implementar um cluster Milvus no OpenShift.
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">Implantar um cluster do Milvus no OpenShift<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico fornece um guia passo a passo sobre como implantar o Milvus no OpenShift.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de iniciar o processo de implantação, verifique se você tem:</p>
<ul>
<li>Um cluster OpenShift em execução.</li>
<li>Acesso ao cluster do OpenShift com privilégios suficientes (função<code translate="no">cluster-admin</code> ou equivalente).</li>
<li>Acesso ao console da web do OpenShift Container Platform.</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">Etapa 1: instalar o Cert Manager<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>O Cert Manager é necessário para gerir certificados TLS para o Milvus Operator.</p>
<ol>
<li><p>Encontre uma versão adequada do cert-manager para a sua versão do OpenShift: <a href="https://cert-manager.io/docs/releases/">Versões do Cert Manager</a>.</p></li>
<li><p>Instale o Cert Manager seguindo o guia oficial: <a href="https://cert-manager.io/docs/installation/">Instalação do Cert Manager</a>.</p></li>
<li><p>Verifique se o seu Cert Manager está a funcionar:</p>
<ol>
<li><p>No seu console openshift, navegue para <strong>Workloads</strong> &gt; <strong>Pods</strong>. Selecione o projeto <strong>cert-manager</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
   </span> <span class="img-wrapper"> <span>cert-manager-1</span> </span></p></li>
<li><p>Certifique-se de que todos os pods estejam prontos. Por exemplo, a imagem abaixo sugere que os pods ainda estão a iniciar. Aguarde até que todos esses pods estejam prontos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
   </span> <span class="img-wrapper"> <span>gerenciador de certificados-2</span> </span></p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">Etapa 2: emitir um certificado auto-assinado para o Milvus Operator<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Certifique-se de que tem sessão iniciada como <code translate="no">kubeadmin</code> ou tem privilégios equivalentes.</p>
<ol>
<li><p>Crie o seguinte arquivo de manifesto chamado <code translate="no">milvus-operator-certificate.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-operator-certificate.yaml</span>
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: milvus-operator-serving-cert
  namespace: milvus-operator
spec:
  dnsNames:
  - milvus-operator-webhook-service.milvus-operator.svc
  - milvus-operator-webhook-service.milvus-operator.svc.cluster.local
  issuerRef:
    kind: Issuer
    name: milvus-operator-selfsigned-issuer
  secretName: milvus-operator-webhook-cert
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: milvus-operator-selfsigned-issuer
  namespace: milvus-operator
spec:
  selfSigned: {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aplique o ficheiro:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-<span class="hljs-keyword">operator</span>-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">Passo 3: Instalar o Milvus Operator<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora pode começar a instalar o Milvus Operator. Recomenda-se usar o Helm para instalar o Milvus Operator para simplificar o processo de configuração.</p>
<ol>
<li><p>Adicione o repositório Helm do Milvus Operator:</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Instalar o Milvus Operator:</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">Passo 4: Implantar o Milvus<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Siga o restante do guia no site de documentação do Milvus: <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Implantar o Milvus</a>.</p>
<h2 id="Whats-Next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li><a href="/docs/pt/v2.4.x/azure.md">Implantar o Cluster Milvus no Azure com Kubernetes</a></li>
<li><a href="/docs/pt/v2.4.x/gcp.md">Implantar o Cluster Milvus no GCP com Kubernetes</a></li>
</ul>
