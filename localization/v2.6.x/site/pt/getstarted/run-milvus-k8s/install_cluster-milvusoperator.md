---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: >-
  Saiba como instalar um cluster Milvus no Kubernetes utilizando o Milvus
  Operator
title: Instalar o Milvus Cluster com o Milvus Operator
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Executar o Milvus no Kubernetes com o Milvus Operator<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página explica como iniciar uma instância do Milvus no Kubernetes utilizando <a href="https://github.com/zilliztech/milvus-operator">o Milvus Operator</a>.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Operator é uma solução que o ajuda a implementar e gerir uma pilha completa de serviços do Milvus para clusters do Kubernetes (K8s). A pilha inclui todos os componentes do Milvus e dependências relevantes, como o etcd, o Pulsar e o MinIO.</p>
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
    </button></h2><ul>
<li><p><a href="/docs/pt/v2.6.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Crie um cluster K8s</a>.</p></li>
<li><p>Instale uma <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Pode verificar a StorageClass instalada da seguinte forma.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique <a href="/docs/pt/v2.6.x/prerequisite-helm.md">os requisitos de hardware e software</a> antes da instalação.</p></li>
<li><p>Antes de instalar o Milvus, recomenda-se utilizar a <a href="https://milvus.io/tools/sizing">Ferramenta de Dimensionamento do Milvus</a> para estimar os requisitos de hardware com base no tamanho dos seus dados. Isto ajuda a garantir um desempenho ideal e uma alocação de recursos otimizada para a sua instalação do Milvus.</p></li>
</ul>
<div class="alert note">
<p>Se tiver alguma dificuldade ao descarregar a imagem, contacte-nos através do endereço <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema, e iremos prestar-lhe o apoio necessário.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Instalar o Milvus Operator<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Operator define recursos personalizados do cluster Milvus com base nos <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">Recursos Personalizados do Kubernetes</a>. Quando os recursos personalizados são definidos, pode utilizar as APIs do K8s de forma declarativa e gerir a pilha de implementação do Milvus para garantir a sua escalabilidade e alta disponibilidade.</p>
<div class="filter">
 <a href="#helm">Helm</a>
 <a href="#kubectl"> Kubectl</a>
</div>
<div class="filter-helm">
<p>Execute o comando seguinte para instalar o Milvus Operator com o Helm.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.7/milvus-operator-1.3.7.tgz</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verá um resultado semelhante ao seguinte após o término do processo de instalação.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  7 13:18:40 2022
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check if its successfully installed
If Operator not started successfully, check the checker&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
<button class="copy-code-btn"></button></code></pre>
<p>Se já tiver instalado o Milvus Operator anteriormente, atualize-o utilizando o seguinte comando:</p>
<pre><code translate="no" class="language-shell">helm upgrade milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.7/milvus-operator-1.3.7.tgz
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-kubectl">
<p>Execute o comando seguinte para instalar o Milvus Operator com o <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Após a conclusão do processo de instalação, irá ver um resultado semelhante ao seguinte.</p>
<pre><code translate="no" class="language-shell">namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
<button class="copy-code-btn"></button></code></pre>
<p>Pode verificar se o pod do Milvus Operator está a funcionar da seguinte forma:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -n milvus-operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Deploy-Milvus" class="common-anchor-header">Implementar o Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Implementar um cluster Milvus<button data-href="#1-Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>Assim que o pod do Milvus Operator estiver a funcionar, pode implementar um cluster do Milvus da seguinte forma.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>O comando acima implementa um cluster Milvus com <strong>o Woodpecker</strong> como fila de mensagens (recomendado para a v2.6.19) e todos os novos componentes arquitetónicos, incluindo o Streaming Node.</p>
<p><strong>Destaques da arquitetura nesta implementação:</strong></p>
<ul>
<li><strong>Fila de mensagens</strong>: <a href="/docs/pt/v2.6.x/use-woodpecker.md">utiliza o Woodpecker</a> (reduz a manutenção da infraestrutura)</li>
<li><strong>Nó de streaming</strong>: ativado para um processamento de dados melhorado</li>
<li><strong>Mix Coordinator</strong>: Componentes do coordenador consolidados para maior eficiência</li>
</ul>
<p>Para personalizar estas definições, recomendamos que utilize a <a href="https://milvus.io/tools/sizing">Ferramenta de Dimensionamento do Milvus</a> para ajustar as configurações com base no tamanho real dos seus dados e, em seguida, descarregue o ficheiro YAML correspondente. Para saber mais sobre os parâmetros de configuração, consulte <a href="https://milvus.io/docs/system_configuration.md">a Lista de Verificação das Configurações do Sistema Milvus</a>.</p>
<div class="alert note">
<ul>
<li>O nome da versão deve conter apenas letras, números e traços. Não são permitidos pontos no nome da versão.</li>
<li>Também pode implementar uma instância do Milvus no modo autónomo, em que todos os seus componentes estão contidos num único pod. Para tal, altere o URL do ficheiro de configuração no comando acima para <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Verificar o estado do cluster do Milvus<button data-href="#2-Check-Milvus-cluster-status" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute o seguinte comando para verificar o estado do cluster do Milvus</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get milvus my-release -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Assim que o seu cluster Milvus estiver pronto, a saída do comando acima deverá ser semelhante à seguinte. Se o campo « <code translate="no">status.status</code> » permanecer como « <code translate="no">Unhealthy</code> », o seu cluster Milvus ainda está a ser criado.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">status:</span>
  <span class="hljs-attr">conditions:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">StorageReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">StorageReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Pulsar</span> <span class="hljs-string">is</span> <span class="hljs-string">ready</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">PulsarReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">PulsarReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Etcd</span> <span class="hljs-string">endpoints</span> <span class="hljs-string">is</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">EtcdReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">EtcdReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">All</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">components</span> <span class="hljs-string">are</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">MilvusClusterHealthy</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">MilvusReady</span>
  <span class="hljs-attr">endpoint:</span> <span class="hljs-string">my-release-milvus.default:19530</span>
  <span class="hljs-attr">status:</span> <span class="hljs-string">Healthy</span>
<button class="copy-code-btn"></button></code></pre>
<p>O Milvus Operator cria as dependências do Milvus, tais como o etcd, o Pulsar e o MinIO, e, em seguida, os componentes do Milvus, tais como o proxy, os coordenadores e os nós.</p>
<p>Assim que o seu cluster Milvus estiver pronto, o estado de todos os pods no cluster Milvus deverá ser semelhante ao seguinte.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods</span>

NAME                                             READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                1/1     Running   0          2m36s
my-release-etcd-1                                1/1     Running   0          2m36s
my-release-etcd-2                                1/1     Running   0          2m36s
my-release-milvus-datanode-58955c65b9-j4j7s      1/1     Running   0          92s
my-release-milvus-mixcoord-686f84968f-jcv5d      1/1     Running   0          92s
my-release-milvus-proxy-646f48fc7c-4lctb         1/1     Running   0          92s
my-release-milvus-querynode-0-d89d7677b-x7j7q    1/1     Running   0          91s
my-release-milvus-streamingnode-556bdcc87c-2qwcc 1/1     Running   0          92s
my-release-minio-0                               1/1     Running   0          2m36s
my-release-minio-1                               1/1     Running   0          2m36s
my-release-minio-2                               1/1     Running   0          2m35s
my-release-minio-3                               1/1     Running   0          2m35s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Redirecionar uma porta local para o Milvus<button data-href="#3-Forward-a-local-port-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute o comando seguinte para obter a porta na qual o seu cluster Milvus está a funcionar.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template</span>
=&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;
19530
<button class="copy-code-btn"></button></code></pre>
<p>A saída mostra que a instância do Milvus está a funcionar na porta predefinida <strong>19530</strong>.</p>
<div class="alert note">
<p>Se tiver implementado o Milvus no modo autónomo, altere o nome do pod de « <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> » para « <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code> ».</p>
</div>
<p>Em seguida, execute o comando seguinte para reencaminhar uma porta local para a porta em que o Milvus está a funcionar.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530</span>
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, pode utilizar <code translate="no">:19530</code> em vez de <code translate="no">27017:19530</code> no comando acima para permitir que o <code translate="no">kubectl</code> atribua uma porta local por si, de modo a não ter de gerir conflitos de portas.</p>
<p>Por predefinição, o reencaminhamento de portas do `kubectl` apenas escuta em <code translate="no">localhost</code>. Utilize o sinalizador <code translate="no">address</code> se pretender que o Milvus escute no endereço IP selecionado ou em todos os endereços IP. O comando seguinte faz com que o reencaminhamento de portas escute em todos os endereços IP da máquina anfitriã.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530</span>
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Agora, pode ligar-se ao Milvus utilizando a porta reencaminhada.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Opcional) Atualizar as configurações do Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode visualizar e atualizar as configurações do seu cluster Milvus executando o comando ` <code translate="no">patch</code> ` da seguinte forma:</p>
<ol>
<li><p>Execute o comando seguinte para pré-visualizar as configurações propostas.</p>
<p>O exemplo seguinte pressupõe que pretende atualizar o parâmetro « <code translate="no">spec.components.disableMetric</code> » para « <code translate="no">false</code> » ms.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span> \
  --dry-run=client -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para os itens de configuração aplicáveis, consulte <a href="/docs/pt/v2.6.x/system_configuration.md">«Configuração do sistema</a>».</p></li>
<li><p>Atualize as configurações.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span></span> 
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Aceder à interface web do Milvus<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus inclui uma ferramenta GUI integrada chamada Milvus WebUI, à qual pode aceder através do seu navegador. A Milvus WebUI melhora a observabilidade do sistema com uma interface simples e intuitiva. Pode utilizar a Milvus WebUI para observar as estatísticas e métricas dos componentes e dependências do Milvus, verificar detalhes da base de dados e da recolha de dados e listar configurações detalhadas do Milvus. Para mais detalhes sobre a Milvus WebUI, consulte <a href="/docs/pt/v2.6.x/milvus-webui.md">Milvus WebUI</a></p>
<p>Para ativar o acesso à Milvus WebUI, é necessário redirecionar as portas do pod proxy para uma porta local.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Agora, pode aceder à interface web do Milvus em <code translate="no">http://localhost:27018</code>.</p>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Desinstalar o Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute o seguinte comando para desinstalar o cluster do Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete milvus my-release</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Quando elimina o cluster Milvus utilizando a configuração predefinida, as dependências como o etcd, o Pulsar e o MinIO não são eliminadas. Por conseguinte, da próxima vez que instalar a mesma instância do cluster Milvus, estas dependências serão utilizadas novamente.</li>
<li>Para eliminar as dependências e as reivindicações de volume persistente (PVCs) juntamente com o cluster do Milvus, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">o ficheiro de configuração</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Desinstalar o Milvus Operator<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Existem também duas formas de desinstalar o Milvus Operator.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Desinstalar com o Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Desinstalar com o kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Desinstalar com o Helm</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm -n milvus-operator uninstall milvus-operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Desinstalar com o kubectl</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.3.7/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de instalar o Milvus no Docker, pode:</p>
<ul>
<li><p>Consultar <a href="/docs/pt/v2.6.x/quickstart.md">o Hello Milvus</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/v2.6.x/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/v2.6.x/manage-collections.md">Gerir coleções</a></li>
<li><a href="/docs/pt/v2.6.x/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/v2.6.x/insert-update-delete.md">Inserir, atualizar e eliminar</a></li>
<li><a href="/docs/pt/v2.6.x/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/v2.6.x/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/v2.6.x/upgrade_milvus_cluster-helm.md">Atualizar o Milvus utilizando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/v2.6.x/scaleout.md">Dimensionar o seu cluster Milvus</a>.</p></li>
<li><p>Implemente o seu cluster Milvus nas nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/v2.6.x/milvus-webui.md">o Milvus WebUI</a>, uma interface web intuitiva para a monitorização e gestão do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/v2.6.x/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para cópias de segurança dos dados do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/v2.6.x/birdwatcher_overview.md">o Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e atualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">o Attu</a>, uma ferramenta GUI de código aberto para a gestão intuitiva do Milvus.</p></li>
<li><p><a href="/docs/pt/v2.6.x/monitor.md">Monitorize o Milvus com o Prometheus</a>.</p></li>
</ul>
