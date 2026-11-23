---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Conheça os preparativos necessários antes de instalar o Milvus com GPU.
title: Requisitos para a instalação do Milvus com GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Requisitos para a instalação do Milvus com GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página enumera os requisitos de hardware e software para configurar o Milvus com suporte para GPU.</p>
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
    </button></h2><p>A imagem do Milvus para GPU <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> foi criada para dispositivos de GPU com capacidade de computação 7.0, 7.5, 8.0, 8.6, 9.0, 10.0 ou 12.0. O seu dispositivo de GPU deve possuir uma destas capacidades de computação ou uma capacidade de computação posterior que permita executar código compilado para uma delas, como 8.9 ou 12.1. Para mais detalhes, consulte <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">«Compatibilidade binária</a> e <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">funcionalidades específicas da família</a>».</p>
<p>Para verificar se o seu dispositivo GPU cumpre os requisitos, consulte <a href="https://developer.nvidia.com/cuda-gpus">«A Capacidade de Computação da sua GPU»</a> no site de programadores da NVIDIA.</p>
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
    </button></h2><p>O seu anfitrião deve executar uma das <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">distribuições Linux suportadas pelo NVIDIA Container Toolkit</a> e ter instalado o controlador NVIDIA para o seu dispositivo GPU.</p>
<p>A imagem de GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> baseia-se no CUDA 12.9 Update 1. A sua configuração « <code translate="no">NVIDIA_REQUIRE_CUDA</code> » requer « <code translate="no">cuda&gt;=12.9</code> », pelo que o controlador NVIDIA deve suportar o CUDA 12.9 ou uma versão posterior. Para o CUDA 12.9 Update 1, a NVIDIA indica a versão do controlador 575.57.08 ou posterior no Linux x86_64. Para conhecer as versões dos controladores de cada lançamento do CUDA, consulte <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">as notas de lançamento do CUDA Toolkit</a>.</p>
<p>Esta mesma configuração também aceita controladores das ramificações 535, 550, 560, 565 e 570 em algumas marcas de GPU, mas não em GPUs GeForce ou Titan. Com estes controladores, a imagem depende da <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">compatibilidade progressiva do CUDA</a>, que a NVIDIA suporta apenas em GPUs NVIDIA Data Center, em determinados modelos de placas RTX com a certificação «NGC Server Ready» e em placas Jetson. Se o controlador não cumprir estes requisitos, o NVIDIA Container Toolkit apresenta um erro « <code translate="no">unsatisfied condition</code> » e não configura a GPU para o contentor.</p>
<p>Para utilizadores do Ubuntu 22.04, é possível instalar o controlador com o seguinte comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>As GPUs com capacidade de computação 10.0 ou 12.0 (Blackwell) são suportadas apenas pelos módulos de kernel abertos do controlador da NVIDIA. Para estas GPUs, instale <code translate="no">nvidia-headless-580-open</code> em vez de <code translate="no">nvidia-headless-580</code>. Os módulos de kernel abertos não suportam GPUs mais antigas do que a Turing (capacidade de computação 7.5), tais como a Volta (7.0), pelo que deve manter <code translate="no">nvidia-headless-580</code> para essas.</p>
<p>Para outras distribuições Linux, consulte o <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">Guia de Instalação do Controlador NVIDIA</a>.</p>
<p>Pode verificar se o controlador foi instalado corretamente executando o seguinte comando. A saída mostra a versão do controlador instalado.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>Instale o NVIDIA Container Toolkit seguindo os passos para a sua distribuição Linux descritos no <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">guia de instalação do NVIDIA Container Toolkit</a>.</p>
<p>Se instalar o Milvus com o Docker Compose, configure o Docker para utilizar o NVIDIA Container Runtime, reinicie o daemon do Docker e, em seguida, execute uma carga de trabalho de exemplo para verificar se os contentores conseguem aceder à GPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>O último comando executa o comando « <code translate="no">nvidia-smi</code> » num contentor e apresenta informações sobre os dispositivos de GPU no anfitrião. Se instalar o Milvus no Kubernetes, prepare os seus nós de trabalho com GPU conforme descrito nas Perguntas Frequentes no final desta página.</p>
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
    </button></h2><p>Os requisitos desta secção e as perguntas frequentes abaixo aplicam-se quando instala o Milvus com suporte para GPU no Kubernetes utilizando o Helm.</p>
<p>Recomenda-se que execute o cluster do Kubernetes em plataformas Linux.</p>
<ul>
<li>O `kubectl` é a ferramenta de linha de comandos do Kubernetes. Utilize uma versão do `kubectl` que tenha, no máximo, uma diferença de versão secundária em relação ao seu cluster. A utilização da versão mais recente do `kubectl` ajuda a evitar problemas imprevistos.</li>
<li>O `minikube` é necessário para executar o cluster do Kubernetes localmente. O `minikube` requer o Docker como dependência. Certifique-se de que instala o Docker antes de instalar o Milvus utilizando o Helm. Consulte <a href="https://docs.docker.com/get-docker">«Obter o Docker»</a> para obter mais informações.</li>
</ul>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 ou posterior</li><li>kubectl</li><li>Helm 3.0.0 ou posterior</li><li>minikube (para o Milvus autónomo)</li><li>Docker 19.03 ou posterior (para o Milvus autónomo)</li></ul></td><td>Consulte <a href="https://helm.sh/docs/">a documentação do Helm</a> para obter mais informações.</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Como posso iniciar um cluster K8s localmente para fins de teste?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Pode utilizar ferramentas como <a href="https://minikube.sigs.k8s.io/docs/">o minikube</a>, <a href="https://kind.sigs.k8s.io/">o kind</a> e <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">o Kubeadm</a> para configurar rapidamente um cluster do Kubernetes localmente. O procedimento seguinte utiliza o minikube como exemplo.</p>
<ol>
<li>Descarregue o minikube</li>
</ol>
<p>Aceda à página <a href="https://minikube.sigs.k8s.io/docs/start/">«Começar»</a>, verifique se cumpre os requisitos indicados na secção <strong>«O que vai precisar»</strong>, clique nos botões correspondentes à sua plataforma de destino e copie os comandos para descarregar e instalar o ficheiro binário.</p>
<ol start="2">
<li>Inicie um cluster K8s utilizando o minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Verifique o estado do cluster K8s</li>
</ol>
<p>Pode verificar o estado do cluster K8s instalado utilizando o comando seguinte.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Certifique-se de que consegue aceder ao cluster K8s através de <code translate="no">kubectl</code>. Se ainda não instalou o <code translate="no">kubectl</code> localmente, consulte <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">«Utilizar o kubectl no minikube</a>».</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Como posso iniciar um cluster K8s com nós de trabalho com GPU?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Se preferir utilizar nós de trabalho com GPU, pode seguir os passos abaixo para criar um cluster K8s com nós de trabalho com GPU. Recomendamos a instalação do Milvus num cluster K8s com nós de trabalho com GPU e a utilização da classe de armazenamento predefinida provisionada.</p>
<ol>
<li>Preparar nós de trabalho com GPU</li>
</ol>
<p>Para utilizar nós de trabalho com GPU, siga os passos descritos em <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">«Preparar os seus nós de GPU</a>».</p>
<ol start="2">
<li>Ativar o suporte a GPU no K8s</li>
</ol>
<p>Implemente o <strong>nvidia-device-plugin</strong> com o Helm, seguindo <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">estes passos</a>.</p>
<p>Após a configuração, visualize os recursos de GPU com o seguinte comando. Substitua « <code translate="no">&lt;gpu-worker-node&gt;</code> » pelo nome real do nó.</p>
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
