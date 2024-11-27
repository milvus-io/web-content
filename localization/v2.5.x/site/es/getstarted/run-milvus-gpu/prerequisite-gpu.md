---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Conozca los preparativos necesarios antes de instalar Milvus con GPU.
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
    </button></h1><p>Esta página enumera los requisitos de hardware y software para instalar Milvus con soporte GPU.</p>
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
    </button></h2><p>La capacidad de cálculo de su dispositivo GPU debe ser una de las siguientes: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>Para comprobar si tu dispositivo GPU cumple el requisito, consulta <a href="https://developer.nvidia.com/cuda-gpus">Your GPU Compute Capability</a> en el sitio web para desarrolladores de NVIDIA.</p>
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
    </button></h2><p>El controlador NVIDIA para tu dispositivo GPU debe estar en una de <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">las distribuciones Linux compatibles</a> y el NVIDIA Container Toolkit debe haberse instalado siguiendo <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">esta guía</a>.</p>
<p>Para los usuarios de Ubuntu 22.04, puedes instalar el controlador y el kit de herramientas de contenedor con los siguientes comandos:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>Para usuarios de otros sistemas operativos, consulta la <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">guía de instalación oficial</a>.</p>
<p>Puede comprobar si el controlador se ha instalado correctamente ejecutando el siguiente comando:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>Se recomienda utilizar los controladores de la versión 545 y superiores.</p>
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
    </button></h2><p>Se recomienda ejecutar el clúster Kubernetes en plataformas Linux.</p>
<ul>
<li>kubectl es la herramienta de línea de comandos para Kubernetes. Utilice una versión de kubectl que esté dentro de una diferencia de versión menor de su clúster. El uso de la última versión de kubectl ayuda a evitar problemas imprevistos.</li>
<li>minikube es necesario cuando se ejecuta el clúster Kubernetes localmente. minikube requiere Docker como dependencia. Asegúrese de instalar Docker antes de instalar Milvus utilizando Helm. Consulte <a href="https://docs.docker.com/get-docker">Obtener Docker</a> para obtener más información.</li>
</ul>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 o posterior</li><li>kubectl</li><li>Helm 3.0.0 o posterior</li><li>minikube (para Milvus independiente)</li><li>Docker 19.03 o posterior (para Milvus standalone)</li></ul></td><td>Consulte <a href="https://helm.sh/docs/">Helm Docs</a> para obtener más información.</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">¿Cómo puedo iniciar un clúster K8s localmente para realizar pruebas?</h3><p>Puede utilizar herramientas como <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> y <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> para configurar rápidamente un clúster Kubernetes de forma local. El siguiente procedimiento utiliza minikube como ejemplo.</p>
<ol>
<li>Descargar minikube</li>
</ol>
<p>Vaya a la página <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, compruebe si cumple las condiciones enumeradas en la sección <strong>What you'll need</strong>, haga clic en los botones que describen su plataforma de destino y copie los comandos para descargar e instalar el binario.</p>
<ol start="2">
<li>Iniciar un clúster K8s utilizando minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Compruebe el estado del clúster K8s</li>
</ol>
<p>Puede comprobar el estado del clúster K8s instalado utilizando el siguiente comando.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Asegúrese de que puede acceder al cluster K8s a través de <code translate="no">kubectl</code>. Si no ha instalado <code translate="no">kubectl</code> localmente, consulte <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Utilizar kubectl dentro de minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">¿Cómo puedo iniciar un clúster K8s con nodos trabajadores GPU?</h3><p>Si prefiere utilizar nodos trabajadores habilitados para GPU, puede seguir los siguientes pasos para crear un cluster K8s con nodos trabajadores GPU. Recomendamos instalar Milvus en un cluster K8s con nodos trabajadores GPU y utilizar la clase de almacenamiento por defecto provisionada.</p>
<ol>
<li>Preparar nodos trabajadores GPU</li>
</ol>
<p>Para utilizar nodos trabajadores habilitados para GPU, siga los pasos indicados en <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Prepare sus nodos GPU</a>.</p>
<ol start="2">
<li>Habilite la compatibilidad con GPU en K8s</li>
</ol>
<p>Despliegue el <strong>plugin nvidia-device</strong> con Helm <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">siguiendo estos pasos</a>.</p>
<p>Tras la configuración, visualice los recursos de la GPU con el siguiente comando. Sustituya <code translate="no">&lt;gpu-worker-node&gt;</code> por el nombre real del nodo.</p>
<pre><code translate="no" class="language-shell">  $ kubectl describe node &lt;gpu-worker-node&gt;

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
