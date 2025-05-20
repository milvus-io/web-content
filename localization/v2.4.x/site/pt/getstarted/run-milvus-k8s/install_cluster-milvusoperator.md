---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: Saiba como instalar o cluster Milvus no Kubernetes usando o Milvus Operator
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
    </button></h1><p>Esta página ilustra como iniciar uma instância do Milvus no Kubernetes usando <a href="https://github.com/zilliztech/milvus-operator">o Milvus Operator</a>.</p>
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
    </button></h2><p>O Milvus Operator é uma solução que ajuda a implantar e gerenciar uma pilha completa de serviços Milvus para atingir os clusters Kubernetes (K8s). A pilha inclui todos os componentes do Milvus e dependências relevantes, como etcd, Pulsar e MinIO.</p>
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
<li><p><a href="/docs/pt/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Criar um cluster K8s</a>.</p></li>
<li><p>Instalar um <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. É possível verificar a StorageClass instalada da seguinte forma.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verificar <a href="/docs/pt/v2.4.x/prerequisite-helm.md">os requisitos de hardware e software</a> antes da instalação.</p></li>
<li><p>Antes de instalar o Milvus, é recomendável usar a <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> para estimar os requisitos de hardware com base no tamanho dos dados. Isso ajuda a garantir o desempenho ideal e a alocação de recursos para a instalação do Milvus.</p></li>
</ul>
<div class="alert note">
<p>Se encontrar algum problema ao puxar a imagem, contacte-nos em <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema, e nós forneceremos o apoio necessário.</p>
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
    </button></h2><p>O Milvus Operator define recursos personalizados de um cluster Milvus em cima dos <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">Recursos Personalizados do Kubernetes</a>. Quando os recursos personalizados são definidos, pode utilizar as APIs do K8s de forma declarativa e gerir a pilha de implementação do Milvus para garantir a sua escalabilidade e alta disponibilidade.</p>
<p>Pode instalar o Milvus Operator de uma das seguintes formas:</p>
<ul>
<li><a href="#Install-with-Helm">Com o Helm</a></li>
<li><a href="#Install-with-kubectl">Com o kubectl</a></li>
</ul>
<h3 id="Install-with-Helm" class="common-anchor-header">Instalar com o Helm</h3><p>Execute o seguinte comando para instalar o Milvus Operator com o Helm.</p>
<pre><code translate="no" class="language-shell">$ helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.1.9/milvus-operator-1.1.9.tgz
<button class="copy-code-btn"></button></code></pre>
<p>Verá uma saída semelhante à seguinte após a conclusão do processo de instalação.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  <span class="hljs-number">7</span> <span class="hljs-number">13</span>:<span class="hljs-number">18</span>:<span class="hljs-number">40</span> <span class="hljs-number">2022</span>
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: <span class="hljs-number">1</span>
TEST SUITE: <span class="hljs-literal">None</span>
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check <span class="hljs-keyword">if</span> its successfully installed
If Operator <span class="hljs-keyword">not</span> started successfully, check the checke<span class="hljs-string">r&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
</span><button class="copy-code-btn"></button></code></pre>
<h3 id="Install-with-kubectl" class="common-anchor-header">Instalar com o kubectl</h3><p>Execute o seguinte comando para instalar o Milvus Operator com <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Você verá uma saída semelhante à seguinte após o término do processo de instalação.</p>
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
<p>Você pode verificar se o pod do Milvus Operator está em execução da seguinte forma:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods -n milvus-<span class="hljs-keyword">operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-<span class="hljs-keyword">operator</span><span class="hljs-number">-5f</span>d77b87dc-msrk4   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running   <span class="hljs-number">0</span>          <span class="hljs-number">46</span>s
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Implantar um cluster do Milvus</h3><p>Depois que o pod do Milvus Operator estiver em execução, você poderá implantar um cluster do Milvus da seguinte maneira.</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>O comando acima implanta um cluster Milvus com seus componentes e dependências em pods separados usando configurações padrão. Para personalizar estas definições, recomendamos que utilize a <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> para ajustar as configurações com base no tamanho real dos dados e, em seguida, transfira o ficheiro YAML correspondente. Para saber mais sobre os parâmetros de configuração, consulte a <a href="https://milvus.io/docs/system_configuration.md">Lista de verificação das configurações do sistema Milvus</a>.</p>
<div class="alert note">
<ul>
<li>O nome da versão deve conter apenas letras, números e traços. Os pontos não são permitidos no nome da versão.</li>
<li>Também é possível implantar uma instância do Milvus no modo autônomo, em que todos os seus componentes estão contidos em um único pod. Para o fazer, altere o URL do ficheiro de configuração no comando acima para <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h4 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Verificar o estado do cluster do Milvus</h4><p>Execute o seguinte comando para verificar o estado do cluster Milvus</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> milvus my-release -o yaml
<button class="copy-code-btn"></button></code></pre>
<p>Quando o cluster do Milvus estiver pronto, a saída do comando acima deverá ser semelhante à seguinte. Se o campo <code translate="no">status.status</code> permanecer <code translate="no">Unhealthy</code>, o seu cluster Milvus ainda está a ser criado.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
...
status:
  conditions:
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    reason: StorageReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: StorageReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:06:23Z&quot;</span>
    message: Pulsar <span class="hljs-keyword">is</span> ready
    reason: PulsarReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: PulsarReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    message: Etcd endpoints <span class="hljs-keyword">is</span> healthy
    reason: EtcdReady
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: EtcdReady
  - lastTransitionTime: <span class="hljs-string">&quot;2021-11-02T06:12:36Z&quot;</span>
    message: All Milvus components are healthy
    reason: MilvusClusterHealthy
    status: <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-built_in">type</span>: MilvusReady
  endpoint: my-release-milvus.default:<span class="hljs-number">19530</span>
  status: Healthy
<button class="copy-code-btn"></button></code></pre>
<p>O Milvus Operator cria as dependências do Milvus, como etcd, Pulsar e MinIO, e depois os componentes do Milvus, como proxy, coordenadores e nós.</p>
<p>Quando o cluster do Milvus estiver pronto, o status de todos os pods no cluster do Milvus deverá ser semelhante ao seguinte.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods

NAME                                            READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-milvus-datanode<span class="hljs-number">-5</span>c686bd65-wxtmf      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-indexnode<span class="hljs-number">-5b</span>9787b54-xclbx     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-querynode<span class="hljs-number">-5b</span>cb59f6-nhqqw      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-milvus-mixcoord-fdcccfc84<span class="hljs-number">-9964</span>g      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">6</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-h6tfz             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-broker<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-proxy<span class="hljs-number">-1</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-d2t56             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-toolset<span class="hljs-number">-0</span>                     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">14</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">13</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Encaminhar uma porta local para o Milvus</h3><p>Execute o seguinte comando para obter a porta na qual o seu cluster Milvus serve.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-84f</span>67cdb7f-pg6wf --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>A saída mostra que a instância do Milvus serve na porta padrão <strong>19530</strong>.</p>
<div class="alert note">
<p>Se você implantou o Milvus no modo autônomo, altere o nome do pod de <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> para <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Em seguida, execute o seguinte comando para encaminhar uma porta local para a porta em que o Milvus serve.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, pode utilizar <code translate="no">:19530</code> em vez de <code translate="no">27017:19530</code> no comando acima para permitir que <code translate="no">kubectl</code> atribua uma porta local para si, para que não tenha de gerir conflitos de portas.</p>
<p>Por predefinição, o encaminhamento de portas do kubectl apenas escuta em <code translate="no">localhost</code>. Use a flag <code translate="no">address</code> se quiser que o Milvus escute nos endereços IP selecionados ou em todos. O comando a seguir faz com que o encaminhamento de porta escute em todos os endereços IP na máquina host.</p>
<pre><code translate="no" class="language-shell">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
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
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> milvus my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Quando você exclui o cluster Milvus usando a configuração padrão, dependências como etcd, Pulsar e MinIO não são excluídas. Portanto, da próxima vez que instalar a mesma instância do cluster Milvus, essas dependências serão usadas novamente.</li>
<li>Para eliminar as dependências e as nuvens virtuais privadas (PVCs) juntamente com o cluster Milvus, consulte o <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">ficheiro de configuração</a>.</li>
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
    </button></h2><p>Há também duas maneiras de desinstalar o Milvus Operator.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Desinstalar com Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Desinstalar com kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Desinstalar com Helm</h4><pre><code translate="no" class="language-shell">$ helm -n milvus-<span class="hljs-keyword">operator</span> uninstall milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Desinstalar com kubectl</h4><pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">delete</span> -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/v1.1.9/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Tendo instalado o Milvus no Docker, você pode:</p>
<ul>
<li><p>Verificar o <a href="/docs/pt/v2.4.x/quickstart.md">Hello Milvus</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/manage_databases.md">Gerenciar bancos de dados</a></li>
<li><a href="/docs/pt/v2.4.x/manage-collections.md">Gerenciar coleções</a></li>
<li><a href="/docs/pt/v2.4.x/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/v2.4.x/insert-update-delete.md">Inserir, Upsert e Apagar</a></li>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-helm.md">Atualizar o Milvus usando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/v2.4.x/scaleout.md">Escalar seu cluster Milvus</a>.</p></li>
<li><p>Implantar seu cluster Milvu em nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/v2.4.x/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para backups de dados do Milvus.</p></li>
<li><p>Explore o <a href="/docs/pt/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e actualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">o Attu</a>, uma ferramenta GUI de código aberto para gerenciamento intuitivo do Milvus.</p></li>
<li><p><a href="/docs/pt/v2.4.x/monitor.md">Monitore o Milvus com o Prometheus</a>.</p></li>
</ul>
