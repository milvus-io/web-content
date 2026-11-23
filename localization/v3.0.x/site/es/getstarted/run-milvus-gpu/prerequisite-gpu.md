---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Infórmate sobre los preparativos necesarios antes de instalar Milvus con GPU.
title: Requisitos para instalar Milvus con GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Requisitos para instalar Milvus con GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta página se enumeran los requisitos de hardware y software para configurar Milvus con soporte para GPU.</p>
<h2 id="Compute-capability" class="common-anchor-header">Capacidad de cálculo<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>La imagen de GPU de Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> está diseñada para dispositivos GPU con capacidad de cálculo 7.0, 7.5, 8.0, 8.6, 9.0, 10.0 o 12.0. Tu dispositivo de GPU debe tener una de estas capacidades de cálculo, o una capacidad de cálculo posterior que pueda ejecutar código compilado para una de ellas, como 8.9 o 12.1. Para obtener más detalles, consulta <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">«Compatibilidad binaria</a> y <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">características específicas de cada familia</a>».</p>
<p>Para comprobar si tu dispositivo GPU cumple los requisitos, consulta <a href="https://developer.nvidia.com/cuda-gpus">«Tu capacidad de cálculo de la GPU</a> » en el sitio web para desarrolladores de NVIDIA.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">Controlador NVIDIA<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>Su host debe ejecutar una de las <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">distribuciones de Linux compatibles con NVIDIA Container Toolkit</a> y tener instalado el controlador de NVIDIA para su dispositivo GPU.</p>
<p>La imagen de GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> se basa en CUDA 12.9 Update 1. Su configuración « <code translate="no">NVIDIA_REQUIRE_CUDA</code> » requiere « <code translate="no">cuda&gt;=12.9</code> », por lo que el controlador de NVIDIA debe ser compatible con CUDA 12.9 o posterior. Para CUDA 12.9 Update 1, NVIDIA indica la versión del controlador 575.57.08 o posterior en Linux x86_64. Para conocer las versiones de los controladores de cada lanzamiento de CUDA, consulta <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">las notas de la versión del kit de herramientas CUDA</a>.</p>
<p>Esta misma configuración también admite controladores de las ramas 535, 550, 560, 565 y 570 en algunas marcas de GPU, pero no en las GPU GeForce ni Titan. Con estos controladores, la imagen depende de <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">la compatibilidad hacia adelante de CUDA</a>, que NVIDIA solo admite en las GPU NVIDIA Data Center, en determinados modelos de tarjetas RTX con la etiqueta «NGC Server Ready» y en las placas Jetson. Si el controlador no cumple estos requisitos, el NVIDIA Container Toolkit muestra el error « <code translate="no">unsatisfied condition</code> » y no configura la GPU para el contenedor.</p>
<p>Los usuarios de Ubuntu 22.04 pueden instalar el controlador con el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>Las GPU con capacidad de cálculo 10.0 o 12.0 (Blackwell) solo son compatibles con los módulos de kernel abiertos del controlador de NVIDIA. Para estas GPU, instala <code translate="no">nvidia-headless-580-open</code> en lugar de <code translate="no">nvidia-headless-580</code>. Los módulos de kernel abiertos no son compatibles con GPU anteriores a Turing (capacidad de cálculo 7.5), como Volta (7.0), por lo que debes conservar <code translate="no">nvidia-headless-580</code> para esas.</p>
<p>Para otras distribuciones de Linux, consulta la <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">Guía de instalación del controlador NVIDIA</a>.</p>
<p>Puede comprobar si el controlador se ha instalado correctamente ejecutando el siguiente comando. El resultado muestra la versión del controlador instalado.</p>
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
    </button></h2><p>Instala el NVIDIA Container Toolkit siguiendo los pasos correspondientes a tu distribución de Linux que se indican en la <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">guía de instalación del NVIDIA Container Toolkit</a>.</p>
<p>Si instalas Milvus con Docker Compose, configura Docker para que utilice NVIDIA Container Runtime, reinicia el daemon de Docker y, a continuación, ejecuta una carga de trabajo de ejemplo para comprobar que los contenedores pueden acceder a la GPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>El último comando ejecuta « <code translate="no">nvidia-smi</code> » en un contenedor y muestra información sobre los dispositivos de GPU del host. Si instalas Milvus en Kubernetes, prepara tus nodos de trabajo con GPU tal y como se describe en las preguntas frecuentes al final de esta página.</p>
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
    </button></h2><p>Los requisitos de esta sección y las preguntas frecuentes que figuran a continuación se aplican cuando se instala Milvus con soporte para GPU en Kubernetes mediante Helm.</p>
<p>Se recomienda ejecutar el clúster de Kubernetes en plataformas Linux.</p>
<ul>
<li>kubectl es la herramienta de línea de comandos de Kubernetes. Utiliza una versión de kubectl que no difiera en más de una versión secundaria de la de tu clúster. Utilizar la última versión de kubectl ayuda a evitar problemas imprevistos.</li>
<li>Se requiere minikube para ejecutar un clúster de Kubernetes localmente. minikube necesita Docker como dependencia. Asegúrate de instalar Docker antes de instalar Milvus mediante Helm. Consulta <a href="https://docs.docker.com/get-docker">«Obtener Docker»</a> para obtener más información.</li>
</ul>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 o posterior</li><li>kubectl</li><li>Helm 3.0.0 o posterior</li><li>minikube (para Milvus autónomo)</li><li>Docker 19.03 o posterior (para Milvus autónomo)</li></ul></td><td>Consulta <a href="https://helm.sh/docs/">la documentación de Helm</a> para obtener más información.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">¿Cómo puedo iniciar un clúster de K8s localmente con fines de prueba?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Puedes utilizar herramientas como <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> y <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> para configurar rápidamente un clúster de Kubernetes de forma local. En el siguiente procedimiento se utiliza minikube a modo de ejemplo.</p>
<ol>
<li>Descargar minikube</li>
</ol>
<p>Ve a la página <a href="https://minikube.sigs.k8s.io/docs/start/">«Empezar»</a>, comprueba si cumples los requisitos que se indican en la sección <strong>«Lo que necesitarás»</strong>, haz clic en los botones correspondientes a tu plataforma de destino y copia los comandos para descargar e instalar el binario.</p>
<ol start="2">
<li>Iniciar un clúster de K8s con minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Comprueba el estado del clúster de K8s</li>
</ol>
<p>Puedes comprobar el estado del clúster de K8s instalado mediante el siguiente comando.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Asegúrate de que puedes acceder al clúster de K8s a través de <code translate="no">kubectl</code>. Si no has instalado <code translate="no">kubectl</code> localmente, consulta <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">«Usar kubectl dentro de minikube</a>».</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">¿Cómo puedo iniciar un clúster de K8s con nodos de trabajo con GPU?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Si prefiere utilizar nodos de trabajo con GPU, puede seguir los pasos que se indican a continuación para crear un clúster de K8s con nodos de trabajo con GPU. Recomendamos instalar Milvus en un clúster de K8s con nodos de trabajo con GPU y utilizar la clase de almacenamiento predeterminada aprovisionada.</p>
<ol>
<li>Preparar los nodos de trabajo con GPU</li>
</ol>
<p>Para utilizar nodos de trabajo con GPU, sigue los pasos descritos en <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">«Preparar tus nodos de GPU</a>».</p>
<ol start="2">
<li>Habilitar la compatibilidad con GPU en K8s</li>
</ol>
<p>Implementa el <strong>nvidia-device-plugin</strong> con Helm siguiendo <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">estos pasos</a>.</p>
<p>Una vez configurado, consulta los recursos de GPU con el siguiente comando. Sustituye « <code translate="no">&lt;gpu-worker-node&gt;</code> » por el nombre real del nodo.</p>
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
