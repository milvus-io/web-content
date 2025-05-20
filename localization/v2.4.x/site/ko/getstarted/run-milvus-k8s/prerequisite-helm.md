---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: 헬름과 함께 Milvus를 설치하기 전에 필요한 준비 사항을 알아보세요.
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
    </button></h1><p>이 페이지에는 Milvus를 시작하고 실행하기 위한 하드웨어 및 소프트웨어 요구 사항이 나열되어 있습니다.</p>
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
<tr><th>컴포넌트</th><th>요구 사항</th><th>권장 사항</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>인텔 2세대 코어 CPU 이상</li><li>Apple 실리콘</li></ul></td><td><ul><li>독립형: 4코어 이상</li><li>클러스터: 8코어 이상</li></ul></td><td></td></tr>
<tr><td>CPU 명령어 세트</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 내에서 벡터 유사성 검색 및 인덱스 구축을 위해서는 CPU가 단일 명령어, 다중 데이터(SIMD) 확장 세트를 지원해야 합니다. CPU가 나열된 SIMD 확장 중 하나 이상을 지원하는지 확인하세요. 자세한 내용은 <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVX를 지원하는 CPU를</a> 참조하세요.</td></tr>
<tr><td>RAM</td><td><ul><li>독립형: 8G</li><li>클러스터: 32G</li></ul></td><td><ul><li>독립형: 16G</li><li>클러스터 128G</li></ul></td><td>RAM 크기는 데이터 볼륨에 따라 다릅니다.</td></tr>
<tr><td>하드 드라이브</td><td>SATA 3.0 SSD 또는 CloudStorage</td><td>NVMe SSD 이상</td><td>하드 드라이브의 크기는 데이터 용량에 따라 다릅니다.</td></tr>
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
    </button></h2><p>Linux 플랫폼에서 Kubernetes 클러스터를 실행하는 것이 좋습니다.</p>
<p>kubectl은 쿠버네티스용 명령줄 도구입니다. 클러스터의 사소한 버전 차이가 하나 이내의 kubectl 버전을 사용하세요. 최신 버전의 kubectl을 사용하면 예기치 않은 문제를 방지하는 데 도움이 된다.</p>
<p>미니큐브는 쿠버네티스 클러스터를 로컬로 실행할 때 필요합니다. 미니큐브는 종속성으로 도커를 필요로 합니다. 헬름을 사용하여 밀버스를 설치하기 전에 도커를 설치해야 한다. 자세한 내용은 <a href="https://docs.docker.com/get-docker">Docker 설치를</a> 참조한다.</p>
<table>
<thead>
<tr><th>운영 체제</th><th>소프트웨어</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>Linux 플랫폼</td><td><ul><li>쿠버네티스 1.16 이상</li><li>kubectl</li><li>헬름 3.0.0 이상</li><li>미니큐브(Milvus 스탠드얼론용)</li><li>도커 19.03 이상(밀버스 독립형용)</li></ul></td><td>자세한 내용은 <a href="https://helm.sh/docs/">헬름 문서를</a> 참조한다.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>소프트웨어</th><th>버전</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td><a href="#Additional-disk-requirements">추가 디스크 요구 사항을</a> 참조하세요.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">추가 디스크 요구 사항</h3><p>디스크 성능은 etcd에 매우 중요합니다. 로컬 NVMe SSD를 사용할 것을 적극 권장합니다. 디스크 응답 속도가 느리면 클러스터 선출이 자주 발생하여 결국 etcd 서비스가 저하될 수 있습니다.</p>
<p>디스크가 적격한지 테스트하려면 <a href="https://github.com/axboe/fio">fio를</a> 사용하세요.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>이상적으로는 디스크가 500 IOPS 이상이고 99번째 백분위수 fsync 지연 시간이 10ms 미만이어야 합니다. 자세한 요구 사항은 etcd <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">문서를</a> 참조하세요.</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">테스트 목적으로 로컬에서 K8s 클러스터를 시작하려면 어떻게 해야 하나요?</h3><p><a href="https://minikube.sigs.k8s.io/docs/">미니큐브</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm과</a> 같은 도구를 사용하여 로컬에서 빠르게 Kubernetes 클러스터를 설정할 수 있습니다. 다음 절차에서는 미니큐브를 예로 들어 설명합니다.</p>
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
<li><p>하드웨어와 소프트웨어가 요구 사항을 충족하면 사용할 수 있습니다:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/install_cluster-milvusoperator.md">밀버스 오퍼레이터로 쿠버네츠에서 밀버스 실행하기</a></li>
<li><a href="/docs/ko/v2.4.x/install_cluster-helm.md">헬름으로 쿠버네티스에서 밀버스 실행하기</a></li>
</ul></li>
<li><p>Milvus를 설치하는 동안 설정할 수 있는 파라미터는 <a href="/docs/ko/v2.4.x/system_configuration.md">시스템 구성을</a> 참조하세요.</p></li>
</ul>
