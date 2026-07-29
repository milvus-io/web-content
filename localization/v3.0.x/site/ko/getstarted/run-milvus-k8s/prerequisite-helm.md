---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Helm을 사용하여 Milvus를 설치하기 전에 필요한 준비 사항을 알아보세요.
title: Kubernetes에서 Milvus를 실행하기 위한 요구 사항
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Kubernetes에서 Milvus를 실행하기 위한 요구 사항<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Milvus를 설치하고 실행하기 위한 하드웨어 및 소프트웨어 요구 사항을 나열합니다.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">하드웨어 요구 사항<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>구성 요소</th><th>요구 사항</th><th>권장 사항</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>인텔 2세대 코어 CPU 이상</li><li>Apple Silicon</li></ul></td><td><ul><li>단독 시스템: 4코어 이상</li><li>클러스터: 8코어 이상</li></ul></td><td></td></tr>
<tr><td>CPU 명령어 세트</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 내에서 벡터 유사도 검색 및 인덱스 생성을 수행하려면 CPU가 단일 명령어 다중 데이터(SIMD) 확장 세트를 지원해야 합니다. CPU가 나열된 SIMD 확장 중 적어도 하나를 지원하는지 확인하십시오. 자세한 내용은 <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVX를 지원하는 CPU를</a> 참조하십시오.</td></tr>
<tr><td>RAM</td><td><ul><li>단독 시스템: 8G</li><li>클러스터: 32G</li></ul></td><td><ul><li>단독 시스템: 16G</li><li>클러스터: 128G</li></ul></td><td>RAM 용량은 데이터 양에 따라 달라집니다.</td></tr>
<tr><td>하드 드라이브</td><td>SATA 3.0 SSD 또는 CloudStorage</td><td>NVMe SSD 이상</td><td>하드 드라이브의 용량은 데이터 양에 따라 다릅니다.</td></tr>
</tbody>
</table>
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
    </button></h2><p>Kubernetes 클러스터는 Linux 플랫폼에서 실행하는 것이 권장됩니다.</p>
<p>kubectl은 쿠버네티스용 명령줄 도구입니다. 클러스터와 마이너 버전 차이가 1 이내인 kubectl 버전을 사용하십시오. 최신 버전의 kubectl을 사용하면 예기치 못한 문제를 방지하는 데 도움이 됩니다.</p>
<p>Kubernetes 클러스터를 로컬에서 실행할 때는 minikube가 필요합니다. minikube는 Docker를 종속성으로 요구합니다. Helm을 사용하여 Milvus를 설치하기 전에 Docker를 설치했는지 확인하십시오. 자세한 내용은 <a href="https://docs.docker.com/get-docker">Docker 설치하기를</a> 참조하십시오.</p>
<table>
<thead>
<tr><th>운영 체제</th><th>소프트웨어</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>Linux 플랫폼</td><td><ul><li>Kubernetes 1.16 이상</li><li>kubectl</li><li>Helm 3.0.0 이상</li><li>minikube (Milvus 독립 실행형용)</li><li>Docker 19.03 이상 (Milvus 독립 실행형용)</li></ul></td><td>자세한 내용은 <a href="https://helm.sh/docs/">Helm 문서를</a> 참조하십시오.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>소프트웨어</th><th>버전</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td><a href="#Additional-disk-requirements">추가 디스크 요구 사항을</a> 참조하십시오.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Milvus와 번들로 제공됨(서비스 모드: <code translate="no">v</code> 이상)</td><td>기본 메시지 큐입니다. 분산 배포의 경우, Woodpecker는 <strong>전용 서비스로</strong> 실행될 수 있으며, <code translate="no">--set woodpecker.image.tag</code> 을 사용하여 버전을 고정할 수 있습니다. 서비스 모드는 Woodpecker <code translate="no">v</code> 부터 지원됩니다.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>선택 사항 — 메시지 큐를 Pulsar로 전환하는 경우에만 해당하며, 기본적으로 설치되지 않습니다.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">추가 디스크 요구 사항<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>디스크 성능은 etcd에 매우 중요합니다. 로컬 NVMe SSD를 사용하는 것을 적극 권장합니다. 디스크 응답 속도가 느리면 클러스터 선거가 빈번하게 발생하여 결국 etcd 서비스 성능이 저하될 수 있습니다.</p>
<p>디스크가 요구 사항을 충족하는지 테스트하려면 <a href="https://github.com/axboe/fio">fio를</a> 사용하십시오.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>이상적으로는 디스크가 500 IOPS 이상을 달성하고, 99번째 백분위수 fsync 지연 시간이 10ms 미만이어야 합니다. 더 자세한 요구 사항은 etcd <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">문서를</a> 참조하십시오.</p>
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
<p><a href="https://minikube.sigs.k8s.io/docs/start/">'시작하기(Get Started)</a> ' 페이지로 이동하여 <strong>'필요한 사항</strong> ( <strong>What you’ll need</strong> )' 섹션에 나열된 조건을 충족하는지 확인한 후, 사용하려는 플랫폼에 해당하는 버튼을 클릭하고 바이너리를 다운로드 및 설치하는 명령어를 복사하세요.</p>
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
<p><code translate="no">kubectl</code> 을 통해 K8s 클러스터에 액세스할 수 있는지 확인하십시오. 로컬에 <code translate="no">kubectl</code> 를 설치하지 않은 경우, <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">‘minikube 내에서 kubectl 사용하기’를</a> 참조하십시오.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>하드웨어 및 소프트웨어가 요구 사항을 충족하는 경우 다음을 수행할 수 있습니다.</p>
<ul>
<li><a href="/docs/ko/install_cluster-milvusoperator.md">Milvus Operator를 사용하여 Kubernetes에서 Milvus 실행</a></li>
<li><a href="/docs/ko/install_cluster-helm.md">Helm을 사용하여 Kubernetes에서 Milvus 실행</a></li>
</ul></li>
<li><p>Milvus 설치 시 설정할 수 있는 매개변수에 대해서는 <a href="/docs/ko/system_configuration.md">‘시스템 구성’을</a> 참조하십시오.</p></li>
</ul>
