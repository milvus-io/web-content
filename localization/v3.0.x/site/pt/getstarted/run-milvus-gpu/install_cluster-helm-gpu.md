---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: Saiba como instalar um cluster Milvus no Kubernetes.
title: Executar o Milvus com suporte para GPU utilizando o Helm Chart
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">Executar o Milvus com suporte para GPU utilizando o Helm Chart<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra como iniciar uma instância do Milvus com suporte para GPU utilizando o Helm Chart.</p>
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
    </button></h2><p>O Helm utiliza um formato de empacotamento denominado «charts». Um «chart» é um conjunto de ficheiros que descreve um conjunto relacionado de recursos do Kubernetes. O Milvus fornece um conjunto de «charts» para o ajudar a implementar as dependências e os componentes do Milvus. <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">O Helm Chart do Milvus</a> é uma solução que inicia a implementação do Milvus num cluster do Kubernetes (K8s) utilizando o gestor de pacotes Helm.</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">Instale a CLI do Helm</a>.</p></li>
<li><p><a href="/docs/pt/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">Crie um cluster K8s com nós de trabalho com GPU</a>.</p></li>
<li><p>Instale uma <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Pode verificar a StorageClass instalada da seguinte forma.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique <a href="/docs/pt/prerequisite-gpu.md">os requisitos de hardware e software</a> antes da instalação.</p></li>
</ul>
<div class="alert note">
<p>Se tiver alguma dificuldade ao descarregar a imagem, contacte-nos através do endereço <a href="mailto:community@zilliz.com">community@zilliz.com</a>, indicando os detalhes do problema, e iremos prestar-lhe o apoio necessário.</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Instale o Helm Chart para o Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Helm é um gestor de pacotes do K8s que o pode ajudar a implementar o Milvus rapidamente.</p>
<ol>
<li>Adicione o repositório Helm do Milvus.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O repositório de Helm Charts do Milvus em <code translate="no">https://milvus-io.github.io/milvus-helm/</code> foi arquivado e pode obter atualizações adicionais em <code translate="no">https://zilliztech.github.io/milvus-helm/</code> da seguinte forma:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>O repositório arquivado continua disponível para os charts até à versão 4.0.31. Para versões posteriores, utilize o novo repositório.</p>
</div>
<ol start="2">
<li>Atualize os gráficos localmente.</li>
</ol>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Inicie o Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de instalar o gráfico Helm, pode iniciar o Milvus no Kubernetes. Nesta secção, iremos guiá-lo através dos passos para iniciar o Milvus com suporte para GPU.</p>
<p>Deve iniciar o Milvus com o Helm, especificando o nome da versão, o gráfico e os parâmetros que pretende alterar. Neste guia, utilizamos <code translate="no">my-release</code> como nome da versão. Para utilizar um nome de versão diferente, substitua <code translate="no">my-release</code> nos comandos seguintes pelo nome que estiver a utilizar.</p>
<p>O Milvus permite-lhe atribuir um ou mais dispositivos de GPU ao Milvus.</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. Atribuir um único dispositivo GPU<button data-href="#1-Assign-a-single-GPU-device" class="anchor-icon" translate="no">
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
    </button></h3><p>O Milvus com suporte a GPU permite-lhe atribuir um ou mais dispositivos GPU.</p>
<ul>
<li><p>Cluster do Milvus</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus autónomo</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. Atribuir vários dispositivos GPU<button data-href="#2-Assign-multiple-GPU-devices" class="anchor-icon" translate="no">
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
    </button></h3><p>Para além de um único dispositivo GPU, também pode atribuir vários dispositivos GPU ao Milvus.</p>
<ul>
<li><p>Cluster do Milvus</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>Na configuração acima, existem quatro CPUs disponíveis e cada dataNode e queryNode utiliza duas GPUs. Para atribuir GPUs diferentes ao dataNode e ao queryNode, pode modificar a configuração em conformidade, definindo « <code translate="no">extraEnv</code> » no ficheiro de configuração da seguinte forma:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>O nome da versão deve conter apenas letras, números e traços. Não são permitidos pontos no nome da versão.</li>
      <li>A linha de comando predefinida instala a versão em cluster do Milvus ao instalar o Milvus com o Helm. São necessárias configurações adicionais ao instalar o Milvus de forma autónoma.</li>
      <li>De acordo com o <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">guia de migração da API obsoleta do Kubernetes</a>, a versão da API <b>policy/v1beta1</b> do PodDisruptionBudget deixou de ser suportada a partir da v1.25. Recomenda-se que migre os manifestos e os clientes da API para utilizarem, em vez disso, a versão da API <b>policy/v1</b>. <br/>Como solução alternativa para os utilizadores que ainda utilizam a versão da API <b>policy/v1beta1</b> do PodDisruptionBudget no Kubernetes v1.25 e versões posteriores, pode executar o seguinte comando para instalar o Milvus:<br/>
     <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>Consulte <a href="https://artifacthub.io/packages/helm/milvus/milvus">o Milvus Helm Chart</a> e <a href="https://helm.sh/docs/">o Helm</a> para obter mais informações.</li>
    </ul>
  </div>
</li>
<li><p>Milvus autónomo</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>Na configuração acima, existem quatro CPUs disponíveis, e cada dataNode e queryNode utiliza duas GPUs. Para atribuir GPUs diferentes ao dataNode e ao queryNode, pode modificar a configuração em conformidade, definindo `extraEnv` no ficheiro de configuração da seguinte forma:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. Verificar o estado do Milvus<button data-href="#2-Check-Milvus-status" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute o seguinte comando para verificar o estado do Milvus:</p>
<pre><code translate="no" class="language-bash">$ kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>Após o arranque do Milvus, a coluna « <code translate="no">READY</code> » apresenta « <code translate="no">1/1</code> » para todos os pods.</p>
<ul>
<li><p>Cluster do Milvus</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                  1/1     Running     0             3m24s
my-release-etcd-1                                  1/1     Running     0             3m24s
my-release-etcd-2                                  1/1     Running     0             3m24s
my-release-milvus-datanode-698dbf7d77-rjkkq        1/1     Running     0             3m24s
my-release-milvus-mixcoord-856d666559-rpj8z        1/1     Running     0             3m24s
my-release-milvus-proxy-7f7cf47689-pzltw           1/1     Running     0             3m24s
my-release-milvus-querynode-7fb6d5b5f8-92phj       1/1     Running     0             3m24s
my-release-milvus-streamingnode-5867bfbcbf-cg9xx   1/1     Running     0             3m24s
my-release-minio-0                                 1/1     Running     0             3m24s
my-release-minio-1                                 1/1     Running     0             3m24s
my-release-minio-2                                 1/1     Running     0             3m24s
my-release-minio-3                                 1/1     Running     0             3m24s
my-release-pulsarv3-bookie-0                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-1                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-2                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-init-p8hcq              0/1     Completed   0             3m24s
my-release-pulsarv3-broker-0                       1/1     Running     0             3m24s
my-release-pulsarv3-broker-1                       1/1     Running     0             3m24s
my-release-pulsarv3-proxy-0                        1/1     Running     0             3m24s
my-release-pulsarv3-proxy-1                        1/1     Running     0             3m24s
my-release-pulsarv3-pulsar-init-8kjsj              0/1     Completed   0             3m24s
my-release-pulsarv3-recovery-0                     1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-0                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-1                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-2                    1/1     Running     0             3m24s
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus autónomo</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
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
    </button></h3><p>Verifique em que porta local o servidor do Milvus está a escutar. Substitua o nome do pod pelo seu.</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, execute o comando seguinte para reencaminhar uma porta local para a porta em que o Milvus está a servir.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, pode utilizar <code translate="no">:19530</code> em vez de <code translate="no">27017:19530</code> no comando acima para permitir que o <code translate="no">kubectl</code> atribua uma porta local por si, de modo a não ter de gerir conflitos de portas.</p>
<p>Por predefinição, o reencaminhamento de portas do `kubectl` apenas escuta em <code translate="no">localhost</code>. Utilize o sinalizador <code translate="no">address</code> se pretender que o Milvus escute no endereço IP selecionado ou em todos os endereços IP. O comando seguinte faz com que o reencaminhamento de portas escute em todos os endereços IP da máquina anfitriã.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Agora, pode ligar-se ao Milvus utilizando a porta reencaminhada.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Aceder à WebUI do Milvus<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus inclui uma ferramenta GUI integrada chamada Milvus WebUI, à qual pode aceder através do seu navegador. A Milvus WebUI melhora a observabilidade do sistema com uma interface simples e intuitiva. Pode utilizar a Milvus WebUI para observar as estatísticas e métricas dos componentes e dependências do Milvus, verificar detalhes da base de dados e da recolha de dados e listar configurações detalhadas do Milvus. Para mais detalhes sobre a Milvus WebUI, consulte <a href="/docs/pt/milvus-webui.md">Milvus WebUI</a></p>
<p>Para ativar o acesso à Milvus WebUI, é necessário fazer o encaminhamento de portas do pod proxy para uma porta local.</p>
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
    </button></h2><p>Execute o seguinte comando para desinstalar o Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O Storage V3 está desativado por predefinição. Ative-o antes de utilizar funcionalidades que dependam dele. Para conhecer os requisitos e as considerações de compatibilidade, consulte <a href="/docs/pt/storage-v3.md">Storage V3</a>.</p>
</div>
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
    </button></h2><p>Depois de instalar o Milvus, pode:</p>
<ul>
<li><p>Consultar <a href="/docs/pt/quickstart.md">o Guia de Início Rápido</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/manage-collections.md">Gerir coleções</a></li>
<li><a href="/docs/pt/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/insert-update-delete.md">Inserir, atualizar e eliminar</a></li>
<li><a href="/docs/pt/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/upgrade_milvus_cluster-helm.md">Atualizar o Milvus utilizando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/scaleout.md">Dimensionar o seu cluster Milvus</a>.</p></li>
<li><p>Implemente o seu cluster Milvus nas nuvens:</p>
<ul>
<li><a href="/docs/pt/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/milvus-webui.md">o Milvus WebUI</a>, uma interface web intuitiva para a monitorização e gestão do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para cópias de segurança dos dados do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/birdwatcher_overview.md">o Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e atualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">o Attu</a>, uma ferramenta GUI de código aberto para a gestão intuitiva do Milvus.</p></li>
<li><p><a href="/docs/pt/monitor.md">Monitorize o Milvus com o Prometheus</a>.</p></li>
</ul>
