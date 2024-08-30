---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Milvus with GPU를 설치하기 전에 필요한 준비 사항을 알아보세요.
title: GPU와 함께 Milvus를 설치하기 위한 요구 사항
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">GPU가 포함된 Milvus 설치 요구 사항<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에는 GPU를 지원하는 Milvus를 설정하기 위한 하드웨어 및 소프트웨어 요구 사항이 나열되어 있습니다.</p>
<h2 id="Compute-capability" class="common-anchor-header">컴퓨팅 성능<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU 장치의 컴퓨팅 성능은 다음 중 하나이어야 합니다: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>사용 중인 GPU 장치가 요구 사항을 충족하는지 확인하려면 NVIDIA 개발자 웹사이트에서 <a href="https://developer.nvidia.com/cuda-gpus">GPU 컴퓨팅 성능을</a> 확인하세요.</p>
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
    </button></h2><p>GPU 장치용 NVIDIA 드라이버는 <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">지원되는 Linux 배포판</a> 중 하나에 있어야 하며, <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">이 가이드에</a> 따라 NVIDIA 컨테이너 툴킷이 설치되어 있어야 합니다.</p>
<p>Ubuntu 22.04 사용자의 경우 다음 명령을 사용하여 드라이버와 컨테이너 툴킷을 설치할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>다른 OS 사용자의 경우 <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">공식 설치 가이드를</a> 참조하세요.</p>
<p>다음 명령을 실행하여 드라이버가 올바르게 설치되었는지 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>버전 545 이상의 드라이버를 사용하는 것이 좋습니다.</p>
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
    </button></h2><p>Linux 플랫폼에서 Kubernetes 클러스터를 실행하는 것이 좋습니다.</p>
<ul>
<li>kubectl은 쿠버네티스용 커맨드-라인 도구이다. 클러스터의 사소한 버전 차이가 하나 이내의 kubectl 버전을 사용한다. 최신 버전의 kubectl을 사용하면 예기치 않은 문제를 방지하는 데 도움이 된다.</li>
<li>미니큐브는 쿠버네티스 클러스터를 로컬로 실행할 때 필요합니다. 미니큐브는 종속성으로 도커를 필요로 합니다. 헬름을 사용하여 밀버스를 설치하기 전에 도커를 설치해야 한다. 자세한 내용은 <a href="https://docs.docker.com/get-docker">Docker 설치를</a> 참조한다.</li>
</ul>
<table>
<thead>
<tr><th>운영 체제</th><th>소프트웨어</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>Linux 플랫폼</td><td><ul><li>쿠버네티스 1.16 이상</li><li>kubectl</li><li>헬름 3.0.0 이상</li><li>미니큐브(Milvus 스탠드얼론용)</li><li>도커 19.03 이상(밀버스 독립형용)</li></ul></td><td>자세한 내용은 <a href="https://helm.sh/docs/">헬름 문서를</a> 참조한다.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">FAQ<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">테스트 목적으로 로컬에서 K8s 클러스터를 시작하려면 어떻게 해야 하나요?</h3><p><a href="https://minikube.sigs.k8s.io/docs/">미니큐브</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm과</a> 같은 도구를 사용하여 로컬에서 빠르게 쿠버네티스 클러스터를 설정할 수 있다. 다음 절차에서는 미니큐브를 예로 들어 설명합니다.</p>
<ol>
<li>미니큐브 다운로드</li>
</ol>
<p><a href="https://minikube.sigs.k8s.io/docs/start/">시작하기</a> 페이지로 이동하여 <strong>필요한 사항</strong> 섹션에 나열된 조건을 충족하는지 확인하고 대상 플랫폼을 설명하는 버튼을 클릭한 다음 명령을 복사하여 바이너리를 다운로드 및 설치합니다.</p>
<ol start="2">
<li>미니큐브를 사용하여 K8s 클러스터 시작하기</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>K8s 클러스터의 상태 확인하기</li>
</ol>
<p>다음 명령어를 사용하여 설치된 K8s 클러스터의 상태를 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">kubectl</code> 을 통해 K8s 클러스터에 액세스할 수 있는지 확인합니다. 로컬에 <code translate="no">kubectl</code> 를 설치하지 않은 경우, <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">미니큐브 내에서 kubectl 사용을</a> 참조하세요.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">GPU 워커 노드로 K8s 클러스터를 시작하려면 어떻게 해야 하나요?</h3><p>GPU 지원 워커 노드를 사용하려면 아래 단계에 따라 GPU 워커 노드가 있는 K8s 클러스터를 생성할 수 있다. GPU 워커 노드가 있는 K8s 클러스터에 Milvus를 설치하고 프로비저닝된 기본 스토리지 클래스를 사용하는 것이 좋습니다.</p>
<ol>
<li>GPU 워커 노드 준비</li>
</ol>
<p>GPU 지원 워커 노드를 사용하려면 <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">GPU 노드 준비하기의</a> 단계를 따르세요.</p>
<ol start="2">
<li>K8에서 GPU 지원 활성화</li>
</ol>
<p><a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">다음 단계에</a> 따라 헬름과 함께 <strong>nvidia-device-plugin을</strong> 배포한다.</p>
<p>설정이 끝나면 다음 명령어로 GPU 리소스를 확인한다. <code translate="no">&lt;gpu-worker-node&gt;</code> 을 실제 노드 이름으로 바꾼다.</p>
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
