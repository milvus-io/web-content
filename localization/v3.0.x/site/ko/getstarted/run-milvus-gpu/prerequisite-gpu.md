---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: GPU를 사용하여 Milvus를 설치하기 전에 필요한 준비 사항을 알아보세요.
title: GPU를 사용하여 Milvus를 설치하기 위한 요구 사항
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">GPU를 사용하여 Milvus를 설치하기 위한 요구 사항<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 GPU를 지원하는 Milvus를 설정하기 위한 하드웨어 및 소프트웨어 요구 사항을 나열합니다.</p>
<h2 id="Compute-capability" class="common-anchor-header">컴퓨트 성능<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus GPU 이미지 <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 는 컴퓨트 캐파빌리티 7.0, 7.5, 8.0, 8.6, 9.0, 10.0 또는 12.0을 지원하는 GPU 장치용으로 빌드되었습니다. 사용 중인 GPU 장치는 이러한 컴퓨트 캡빌리티 중 하나를 지원하거나, 8.9 또는 12.1과 같이 해당 컴퓨트 캡빌리티 중 하나를 위해 빌드된 코드를 실행할 수 있는 더 높은 버전의 컴퓨트 캡빌리티를 지원해야 합니다. 자세한 내용은 <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">바이너리 호환성</a> 및 <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">제품군별 기능을</a> 참조하십시오.</p>
<p>사용 중인 GPU 장치가 이 요구 사항을 충족하는지 확인하려면 NVIDIA 개발자 웹사이트의 <a href="https://developer.nvidia.com/cuda-gpus">‘GPU 컴퓨트 성능’을</a> 참조하십시오.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">NVIDIA 드라이버<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>호스트는 <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">NVIDIA Container Toolkit에서 지원하는 Linux 배포판</a> 중 하나를 실행해야 하며, 사용 중인 GPU 장치에 맞는 NVIDIA 드라이버가 설치되어 있어야 합니다.</p>
<p>Milvus GPU 이미지 <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 는 CUDA 12.9 Update 1을 기반으로 합니다. 이 이미지의 ‘ <code translate="no">NVIDIA_REQUIRE_CUDA</code> ’ 설정에는 ‘ <code translate="no">cuda&gt;=12.9</code> ’가 필요하므로, NVIDIA 드라이버는 CUDA 12.9 이상을 지원해야 합니다. CUDA 12.9 업데이트 1의 경우, NVIDIA는 Linux x86_64에서 드라이버 버전 575.57.08 이상을 지원한다고 명시하고 있습니다. 각 CUDA 릴리스의 드라이버 버전에 대해서는 <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">CUDA 툴킷 릴리스 노트를</a> 참조하십시오.</p>
<p>동일한 설정은 일부 GPU 브랜드의 535, 550, 560, 565 및 570 브랜치 드라이버도 허용하지만, GeForce 또는 Titan GPU에서는 허용하지 않습니다. 이러한 드라이버를 사용할 경우, 이미지는 <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">CUDA 전방 호환성에</a> 의존하게 되며, NVIDIA는 NVIDIA 데이터 센터 GPU, 일부 RTX 카드의 NGC Server Ready SKU 및 Jetson 보드에서만 이를 지원합니다. 드라이버가 이러한 요구 사항을 충족하지 않으면 NVIDIA Container Toolkit은 ' <code translate="no">unsatisfied condition</code> ' 오류를 보고하며 컨테이너용 GPU를 설정하지 않습니다.</p>
<p>Ubuntu 22.04 사용자의 경우, 다음 명령어를 사용하여 드라이버를 설치할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>컴퓨트 성능 10.0 또는 12.0(Blackwell)을 지원하는 GPU는 NVIDIA 드라이버의 오픈 커널 모듈에서만 지원됩니다. 이러한 GPU의 경우, ` <code translate="no">nvidia-headless-580</code>` 대신 ` <code translate="no">nvidia-headless-580-open</code> `을 설치하십시오. 오픈 커널 모듈은 Volta(7.0)와 같이 Turing(컴퓨트 기능 7.5)보다 오래된 GPU를 지원하지 않으므로, 해당 GPU의 경우 ` <code translate="no">nvidia-headless-580</code> `을 계속 사용하십시오.</p>
<p>다른 리눅스 배포판의 경우, <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">NVIDIA 드라이버 설치 가이드를</a> 참조하십시오.</p>
<p>다음 명령을 실행하여 드라이버가 올바르게 설치되었는지 확인할 수 있습니다. 출력 결과에는 설치된 드라이버의 버전이 표시됩니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA 컨테이너 툴킷<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>NVIDIA 컨테이너 툴킷 <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">설치 가이드에 명시된</a> 해당 리눅스 배포판별 단계를 따라 <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA 컨테이너 툴킷을</a> 설치하십시오.</p>
<p>Docker Compose를 사용하여 Milvus를 설치하는 경우, Docker가 NVIDIA 컨테이너 런타임을 사용하도록 구성하고, Docker 데몬을 다시 시작한 다음, 샘플 워크로드를 실행하여 컨테이너가 GPU에 액세스할 수 있는지 확인하십시오.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>마지막 명령어는 컨테이너 내에서 ` <code translate="no">nvidia-smi</code> `를 실행하고 호스트의 GPU 장치에 대한 정보를 출력합니다. Kubernetes에 Milvus를 설치하는 경우, 대신 이 페이지 하단의 FAQ에 설명된 대로 GPU 워커 노드를 준비하십시오.</p>
<h2 id="Software-requirements" class="common-anchor-header">소프트웨어 요구 사항<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션과 아래 FAQ에 명시된 요구 사항은 Helm을 사용하여 Kubernetes에 GPU 지원이 포함된 Milvus를 설치할 때 적용됩니다.</p>
<p>Kubernetes 클러스터는 Linux 플랫폼에서 실행하는 것이 좋습니다.</p>
<ul>
<li>kubectl은 Kubernetes용 명령줄 도구입니다. 클러스터와 마이너 버전 차이가 1 이내인 kubectl 버전을 사용하십시오. 최신 버전의 kubectl을 사용하면 예기치 못한 문제를 방지하는 데 도움이 됩니다.</li>
<li>로컬에서 쿠버네티스 클러스터를 실행할 때는 minikube가 필요합니다. minikube는 Docker를 종속성으로 요구합니다. Helm을 사용하여 Milvus를 설치하기 전에 Docker를 설치했는지 확인하십시오. 자세한 내용은 <a href="https://docs.docker.com/get-docker">Docker 설치하기를</a> 참조하십시오.</li>
</ul>
<table>
<thead>
<tr><th>운영 체제</th><th>소프트웨어</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>Linux 플랫폼</td><td><ul><li>Kubernetes 1.16 이상</li><li>kubectl</li><li>Helm 3.0.0 이상</li><li>minikube (Milvus 독립 실행형용)</li><li>Docker 19.03 이상 (Milvus 독립 실행형용)</li></ul></td><td>자세한 내용은 <a href="https://helm.sh/docs/">Helm 문서를</a> 참조하십시오.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">테스트 목적으로 로컬에서 K8s 클러스터를 시작하려면 어떻게 해야 하나요?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm과</a> 같은 도구를 사용하여 로컬에서 Kubernetes 클러스터를 빠르게 설정할 수 있습니다. 다음 절차에서는 minikube를 예로 들어 설명합니다.</p>
<ol>
<li>minikube 다운로드</li>
</ol>
<p><a href="https://minikube.sigs.k8s.io/docs/start/">'시작하기'</a> 페이지로 이동하여 <strong>'필요한 사항'</strong> 섹션에 나열된 조건을 충족하는지 확인한 후, 사용하려는 플랫폼에 해당하는 버튼을 클릭하고 명령어를 복사하여 바이너리를 다운로드 및 설치하십시오.</p>
<ol start="2">
<li>minikube를 사용하여 K8s 클러스터 시작하기</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>K8s 클러스터 상태 확인</li>
</ol>
<p>다음 명령어를 사용하여 설치된 K8s 클러스터의 상태를 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">kubectl</code> 을 통해 K8s 클러스터에 액세스할 수 있는지 확인하십시오. 로컬에 <code translate="no">kubectl</code> 를 설치하지 않은 경우, <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">'minikube 내에서 kubectl 사용하기'를</a> 참조하십시오.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">GPU 워커 노드가 포함된 K8s 클러스터를 시작하려면 어떻게 해야 하나요?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>GPU 지원 워커 노드를 사용하려는 경우, 아래 단계를 따라 GPU 워커 노드가 포함된 K8s 클러스터를 생성할 수 있습니다. GPU 워커 노드가 포함된 K8s 클러스터에 Milvus를 설치하고, 프로비저닝된 기본 스토리지 클래스를 사용하는 것을 권장합니다.</p>
<ol>
<li>GPU 워커 노드 준비</li>
</ol>
<p>GPU 지원 워커 노드를 사용하려면 <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">‘GPU 노드 준비’의</a> 단계를 따르세요.</p>
<ol start="2">
<li>K8s에서 GPU 지원 활성화</li>
</ol>
<p><a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">다음 단계를</a> 따라 Helm을 사용하여 <strong>nvidia-device-plugin을</strong> 배포하십시오.</p>
<p>설정이 완료된 후, 다음 명령어를 사용하여 GPU 리소스를 확인하십시오. <code translate="no">&lt;gpu-worker-node&gt;</code> 을 실제 노드 이름으로 대체하십시오.</p>
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
