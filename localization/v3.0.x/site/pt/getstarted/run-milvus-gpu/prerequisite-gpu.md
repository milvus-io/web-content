---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Conheça os preparativos necessários antes de instalar o Milvus com GPU.
title: Requisitos para instalar o Milvus com GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Requisitos para instalar o Milvus com GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página lista os requisitos de hardware e software para configurar o Milvus com suporte a GPU.</p>
<h2 id="Compute-capability" class="common-anchor-header">Capacidade de computação<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>A capacidade de computação do seu dispositivo GPU deve ser uma das seguintes: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>Para verificar se o seu dispositivo de GPU atende ao requisito, verifique <a href="https://developer.nvidia.com/cuda-gpus">a Capacidade de computação da GPU</a> no site do desenvolvedor NVIDIA.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">Driver NVIDIA<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>O driver NVIDIA para o seu dispositivo de GPU deve estar em uma das <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">distribuições Linux suportadas</a> e o NVIDIA Container Toolkit deve ter sido instalado seguindo <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">este guia</a>.</p>
<p>Para usuários do Ubuntu 22.04, é possível instalar o driver e o kit de ferramentas de contêiner com os seguintes comandos:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para outros utilizadores de sistemas operativos, consulte o <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">guia de instalação oficial</a>.</p>
<p>Pode verificar se o controlador foi instalado corretamente executando o seguinte comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
version:        545.29.06
<button class="copy-code-btn"></button></code></pre>
<p>Recomenda-se a utilização dos controladores da versão 545 e superior.</p>
<h2 id="Software-requirements" class="common-anchor-header">Requisitos de software<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Recomenda-se que execute o cluster Kubernetes em plataformas Linux.</p>
<ul>
<li>kubectl é a ferramenta de linha de comando para o Kubernetes. Use uma versão do kubectl que esteja dentro de uma diferença de versão menor do seu cluster. Usar a versão mais recente do kubectl ajuda a evitar problemas imprevistos.</li>
<li>O minikube é necessário ao executar o cluster Kubernetes localmente. O minikube requer o Docker como uma dependência. Certifique-se de que instala o Docker antes de instalar o Milvus utilizando o Helm. Consulte <a href="https://docs.docker.com/get-docker">Obter o Docker</a> para obter mais informações.</li>
</ul>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 ou posterior</li><li>kubectl</li><li>Helm 3.0.0 ou posterior</li><li>minikube (para Milvus autónomo)</li><li>Docker 19.03 ou posterior (para Milvus autónomo)</li></ul></td><td>Consulte <a href="https://helm.sh/docs/">os documentos do Helm</a> para obter mais informações.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Como posso iniciar um cluster do K8s localmente para fins de teste?</h3><p>Pode utilizar ferramentas como <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> e <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> para configurar rapidamente um cluster Kubernetes localmente. O procedimento a seguir usa o minikube como exemplo.</p>
<ol>
<li>Descarregar o minikube</li>
</ol>
<p>Aceda à página <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, verifique se cumpre as condições listadas na secção <strong>What you'll need</strong>, clique nos botões que descrevem a sua plataforma de destino e copie os comandos para transferir e instalar o binário.</p>
<ol start="2">
<li>Iniciar um cluster K8s usando o minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Verificar o estado do cluster K8s</li>
</ol>
<p>Pode verificar o estado do cluster K8s instalado utilizando o seguinte comando.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Certifique-se de que pode aceder ao cluster K8s através de <code translate="no">kubectl</code>. Se não tiver instalado o <code translate="no">kubectl</code> localmente, consulte <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Utilizar o kubectl dentro do minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Como posso iniciar um cluster do K8s com nós de trabalho de GPU?</h3><p>Se preferir usar nós de trabalho habilitados para GPU, pode seguir as etapas abaixo para criar um cluster K8s com nós de trabalho de GPU. Recomendamos instalar o Milvus em um cluster K8s com nós de trabalho de GPU e usar a classe de armazenamento padrão provisionada.</p>
<ol>
<li>Preparar nós de trabalho da GPU</li>
</ol>
<p>Para usar nós de trabalho habilitados para GPU, siga as etapas em <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Preparar seus nós de GPU</a>.</p>
<ol start="2">
<li>Habilitar o suporte à GPU no K8s</li>
</ol>
<p>Implante o <strong>nvidia-device-plugin</strong> com o Helm seguindo <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">estas etapas</a>.</p>
<p>Após a configuração, visualize os recursos da GPU com o seguinte comando. Substitua <code translate="no">&lt;gpu-worker-node&gt;</code> pelo nome real do nó.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
