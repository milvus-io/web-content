---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: Kubernetes에 Milvus 클러스터를 설치하는 방법을 알아보세요.
title: 헬름으로 Milvus 클러스터 설치
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">헬름으로 쿠버네티스에서 밀버스 실행하기<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지는 <a href="https://github.com/zilliztech/milvus-helm">밀버스 헬름 차트를</a> 사용하여 쿠버네티스에서 밀버스 인스턴스를 시작하는 방법을 설명한다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>헬름은 차트라는 패키징 형식을 사용한다. 차트는 관련 쿠버네티스 리소스 집합을 설명하는 파일 모음이다. 밀버스는 밀버스 의존성과 컴포넌트를 배포하는 데 도움이 되는 차트 세트를 제공한다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p><a href="https://helm.sh/docs/intro/install/">헬름 CLI를 설치한다</a>.</p></li>
<li><p><a href="/docs/ko/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">K8s 클러스터를 생성한다</a>.</p></li>
<li><p><a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">스토리지클래스를</a> 설치한다. 설치된 StorageClass는 아래와 같이 확인할 수 있다.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>설치 전 <a href="/docs/ko/prerequisite-helm.md">하드웨어 및 소프트웨어 요구 사항을</a> 확인한다.</p></li>
<li><p>밀버스를 설치하기 전에 <a href="https://milvus.io/tools/sizing">밀버스 사이징 툴을</a> 사용하여 데이터 크기에 따라 하드웨어 요구 사항을 추정하는 것을 권장합니다. 이렇게 하면 Milvus 설치를 위한 최적의 성능과 리소스 할당을 보장하는 데 도움이 됩니다.</p></li>
</ul>
<div class="alert note">
<p>이미지를 가져오는 데 문제가 발생하면 <a href="mailto:community@zilliz.com">community@zilliz.com</a> 으로 문의하여 문제에 대한 자세한 내용을 알려주시면 필요한 지원을 제공해 드리겠습니다.</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">Milvus 헬름 차트 설치<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스 헬름 차트를 설치하기 전에 밀버스 헬름 리포지토리를 추가해야 합니다.</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Milvus Helm Charts 리포지토리( <code translate="no">https://github.com/milvus-io/milvus-helm</code> )가 아카이브되었습니다. 이제 <code translate="no">https://github.com/zilliztech/milvus-helm</code> 에서 새 리포지토리를 사용합니다. 보관된 리포지토리는 4.0.31까지의 차트에 계속 사용할 수 있지만 이후 릴리스에서는 새 리포지토리를 사용하세요.</p>
</div>
<p>그런 다음 다음과 같이 리포지토리에서 Milvus 차트를 가져옵니다:</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>언제든지 이 명령을 실행하여 최신 Milvus 헬름 차트를 가져올 수 있습니다.</p>
<h2 id="Online-install" class="common-anchor-header">온라인 설치<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. 밀버스 클러스터 배포<button data-href="#1-Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>헬름 차트를 설치했으면, 쿠버네티스에서 밀버스를 시작할 수 있다. 이 섹션에서는 Milvus 클러스터를 배포하는 방법을 안내한다.</p>
<div class="alert note" id="standalone-deployment-note">
<p><strong>대신 독립형 배포가 필요하신가요?</strong></p>
<p>개발 또는 테스트를 위해 독립 실행형 모드(단일 노드)로 Milvus를 배포하려면 이 명령을 사용하세요:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.4 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>참고</strong>: 독립 실행형 모드는 기본 메시지 큐로 딱따구리를 사용하며 스트리밍 노드 구성 요소를 활성화합니다. 자세한 내용은 <a href="/docs/ko/architecture_overview.md">아키텍처 개요</a> 및 <a href="/docs/ko/use-woodpecker.md">딱따구리 사용하기를</a> 참조하세요.</p>
</div>
<p><strong>Milvus 클러스터 배포:</strong></p>
<p>다음 명령은 Woodpecker를 권장 메시지 큐로 사용하여 v2.6.4에 최적화된 설정으로 Milvus 클러스터를 배포합니다:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.4 \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>이 명령이 수행하는 작업</strong></p>
<ul>
<li>메시지 큐로 <strong>Woodpecker를</strong> 사용합니다(유지보수 감소를 위해 권장).</li>
<li>성능 향상을 위해 새로운 <strong>스트리밍 노드</strong> 구성 요소를 활성화합니다.</li>
<li>레거시 <strong>인덱스 노드를</strong> 비활성화합니다(이제 데이터 노드에서 기능을 처리합니다).</li>
<li>Pulsar를 비활성화하여 대신 Woodpecker 사용</li>
</ul>
<div class="alert note">
<p><strong>Milvus 2.6.x의 아키텍처 변경 사항:</strong></p>
<ul>
<li><strong>메시지 큐</strong>: 이제 <strong>Woodpecker가</strong> 권장됩니다(Pulsar에 비해 인프라 유지보수 감소).</li>
<li><strong>새로운 컴포넌트</strong>: <strong>스트리밍 노드가</strong> 도입되어 기본적으로 활성화됩니다.</li>
<li><strong>병합된 구성 요소</strong>: <strong>인덱스 노</strong> 드와 <strong>데이터 노드가</strong> 단일 <strong>데이터 노드로</strong> 통합되었습니다.</li>
</ul>
<p>전체 아키텍처에 대한 자세한 내용은 <a href="/docs/ko/architecture_overview.md">아키텍처 개요를</a> 참조하세요.</p>
</div>
<p><strong>대체 메시지 큐 옵션:</strong></p>
<p>우드페커 대신 <strong>Pulsar</strong> (기존 선택 사항)를 사용하려는 경우:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.4 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>다음 단계:</strong>위의 명령은 권장 구성으로 Milvus를 배포합니다. 프로덕션용:</p>
<ul>
<li><a href="https://milvus.io/tools/sizing">Milvus 크기 조정 도구를</a> 사용하여 데이터 크기에 따라 설정을 최적화합니다.</li>
<li>고급 구성 옵션에 대해서는 <a href="https://milvus.io/docs/system_configuration.md">Milvus 시스템 구성 체크리스트를</a> 검토하세요.</li>
</ul>
<div class="alert note">
<p><strong>중요 참고 사항</strong></p>
<ul>
<li><strong>릴리스 이름 지정</strong>: 문자, 숫자, 대시만 사용하세요(점 사용 불가).</li>
<li><strong>쿠버네티스 v1.25+</strong>: 파드장애예산 문제가 발생하면 이 해결 방법을 사용하세요:<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> pulsar.bookkeeper.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.broker.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.proxy.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.zookeeper.pdb.usePolicy=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>자세한 내용은 <a href="https://artifacthub.io/packages/helm/milvus/milvus">밀버스 헬름 차트와</a> <a href="https://helm.sh/docs/">헬름 문서를</a> 참고한다.</p>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. 밀버스 클러스터 상태 확인<button data-href="#2-Check-Milvus-cluster-status" class="anchor-icon" translate="no">
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
    </button></h3><p>파드 상태를 확인하여 배포가 성공했는지 확인한다:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p><strong>모든 파드가 "실행 중" 상태가 표시될 때까지 기다립니다.</strong> v2.6.4 구성에서는 다음과 유사한 파드가 표시되어야 합니다:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-68</span>cb87dcbd<span class="hljs-number">-4</span>khpm      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>fb9488465<span class="hljs-operator">-</span>dmbbj      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>bd7f5587<span class="hljs-operator">-</span>ds2xv          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-5</span>cd8fff495<span class="hljs-operator">-</span>k6gtg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streaming<span class="hljs-operator">-</span>node<span class="hljs-operator">-</span>xxxxxxxxx       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>autorecovery<span class="hljs-number">-86</span>f5dbdf77<span class="hljs-operator">-</span>lchpc  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">98</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>broker<span class="hljs-number">-556</span>ff89d4c<span class="hljs-number">-2</span>m29m        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>fbd75db75<span class="hljs-operator">-</span>nhg4v         <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-operator">-</span>metadata<span class="hljs-number">-98</span>zbr       <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>   Completed  <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
<button class="copy-code-btn"></button></code></pre>
<p><strong>확인해야 할 주요 구성 요소</strong></p>
<ul>
<li><strong>Milvus 구성 요소</strong>: <code translate="no">mixcoord</code>, <code translate="no">datanode</code>, <code translate="no">querynode</code>, <code translate="no">proxy</code>, <code translate="no">streaming-node</code></li>
<li><strong>종속성</strong>: <code translate="no">etcd</code> (메타데이터), <code translate="no">minio</code> (오브젝트 스토리지), <code translate="no">pulsar</code> (메시지 큐)</li>
</ul>
<p>포트 포워딩이 설정되면 <code translate="no">http://127.0.0.1:9091/webui/</code> 에서 <strong>Milvus 웹UI에</strong> 액세스할 수도 있습니다(다음 단계 참조). 자세한 내용은 <a href="/docs/ko/milvus-webui.md">Milvus WebUI를</a> 참조하세요.</p>
<h3 id="3-Connect-to-Milvus" class="common-anchor-header">3. Milvus에 연결하기<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>쿠버네티스 외부에서 Milvus 클러스터에 연결하려면 포트 포워딩을 설정해야 합니다.</p>
<p><strong>포트 포워딩을 설정합니다:</strong></p>
<pre><code translate="no" class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre>
<p>이 명령은 로컬 포트 <code translate="no">27017</code> 를 Milvus 포트 <code translate="no">19530</code> 로 포워딩합니다. 다음과 같이 표시됩니다:</p>
<pre><code translate="no"><span class="hljs-attribute">Forwarding</span> from <span class="hljs-number">127.0.0.1:27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>연결 세부 정보:</strong></p>
<ul>
<li><strong>로컬 연결</strong>: <code translate="no">localhost:27017</code></li>
<li><strong>Milvus 기본 포트</strong>: <code translate="no">19530</code></li>
</ul>
<div class="alert note">
<p><strong>포트 포워딩 옵션:</strong></p>
<ul>
<li><strong>로컬 포트 자동 할당</strong>: <code translate="no">27017:19530</code> 대신 <code translate="no">:19530</code> 을 사용하여 kubectl이 사용 가능한 포트를 선택하도록 한다.</li>
<li><strong>모든 인터페이스에서 수신 대기</strong>: <code translate="no">--address 0.0.0.0</code> 를 추가하여 다른 머신에서 연결을 허용한다:<pre><code translate="no" class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre></li>
<li><strong>독립형 배포</strong>: 독립 실행형 모드를 사용하는 경우, 서비스 이름은 동일하게 유지된다.</li>
</ul>
</div>
<p>Milvus를 사용하는 동안<strong>이 터미널을 열어</strong> 두세요. 이제 <code translate="no">localhost:27017</code> 에서 Milvus SDK를 사용하여 Milvus에 연결할 수 있습니다.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(선택 사항) Milvus 설정 업데이트하기<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">values.yaml</code> 파일을 편집한 후 다시 적용하여 Milvus 클러스터의 구성을 업데이트할 수 있습니다.</p>
<ol>
<li><p>원하는 구성으로 <code translate="no">values.yaml</code> 파일을 만듭니다.</p>
<p>다음은 <code translate="no">proxy.http</code> 을 활성화한다고 가정합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        enabled: true
</span><button class="copy-code-btn"></button></code></pre>
<p>적용 가능한 구성 항목은 <a href="/docs/ko/system_configuration.md">시스템 구성을</a> 참조하세요.</p></li>
<li><p><code translate="no">values.yaml</code> 파일을 적용합니다.</p></li>
</ol>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus --namespace my-namespace -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<ol>
<li><p>업데이트된 구성을 확인합니다.</p>
<pre><code translate="no" class="language-shell">helm get values my-release
<button class="copy-code-btn"></button></code></pre>
<p>출력에 업데이트된 구성이 표시되어야 합니다.</p></li>
</ol>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Milvus WebUI 액세스<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 브라우저를 통해 액세스할 수 있는 Milvus WebUI라는 기본 제공 GUI 도구와 함께 제공됩니다. Milvus Web UI는 간단하고 직관적인 인터페이스로 시스템 관찰성을 향상시킵니다. Milvus Web UI를 사용하여 Milvus의 구성 요소 및 종속성에 대한 통계 및 메트릭을 관찰하고, 데이터베이스 및 수집 세부 정보를 확인하고, 자세한 Milvus 구성을 나열할 수 있습니다. 밀버스 웹 UI에 대한 자세한 내용은 밀버스 <a href="/docs/ko/milvus-webui.md">웹 UI를</a> 참조하세요.</p>
<p>Milvus 웹 UI에 액세스할 수 있도록 하려면 프록시 포드를 로컬 포트로 포트 포워딩해야 합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>이제 <code translate="no">http://localhost:27018</code> 에서 Milvus 웹 UI에 액세스할 수 있습니다.</p>
<h2 id="Offline-install" class="common-anchor-header">오프라인 설치<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>네트워크가 제한된 환경에 있는 경우, 이 섹션의 절차에 따라 Milvus 클러스터를 시작하세요.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Milvus 매니페스트 가져오기<button data-href="#1-Get-Milvus-manifest" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령을 실행하여 Milvus 매니페스트를 가져옵니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm template my-release zilliztech/milvus &gt; milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>위 명령은 Milvus 클러스터에 대한 차트 템플릿을 렌더링하고 출력을 <code translate="no">milvus_manifest.yaml</code> 이라는 매니페스트 파일에 저장합니다. 이 매니페스트를 사용하여 별도의 파드에 구성 요소 및 종속 요소와 함께 Milvus 클러스터를 설치할 수 있습니다.</p>
<div class="alert note">
<ul>
<li>모든 Milvus 구성 요소가 단일 포드 내에 포함된 독립형 모드에서 Milvus 인스턴스를 설치하려면 대신 <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false zilliztech/milvus &gt; milvus_manifest.yaml</code> 을 실행하여 독립형 모드에서 Milvus 인스턴스에 대한 차트 템플릿을 렌더링해야 합니다.</li>
<li>Milvus 구성을 변경하려면, 템플릿을 다운로드하고 <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> 템플릿을 다운로드하여 원하는 설정을 지정한 다음 <code translate="no">helm template -f values.yaml my-release zilliztech/milvus &gt; milvus_manifest.yaml</code> 을 사용하여 매니페스트를 적절히 렌더링합니다.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. 이미지 풀링 스크립트 다운로드<button data-href="#2-Download-image-pulling-script" class="anchor-icon" translate="no">
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
    </button></h3><p>이미지 풀링 스크립트는 Python으로 개발되었습니다. <code translate="no">requirement.txt</code> 파일에서 해당 스크립트와 종속 요소를 다운로드해야 합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. 이미지 가져오기 및 저장<button data-href="#3-Pull-and-save-images" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령을 실행하여 필요한 이미지를 가져와 저장합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip3 install -r requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">python3 save_image.py --manifest milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>이미지는 현재 디렉토리의 <code translate="no">images</code> 이라는 하위 폴더로 가져옵니다.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. 이미지 로드<button data-href="#4-Load-images" class="anchor-icon" translate="no">
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
    </button></h3><p>이제 다음과 같이 네트워크가 제한된 환경의 호스트에 이미지를 로드할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Milvus 배포<button data-href="#5-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>지금까지는 온라인 설치의 <a href="#2-Check-Milvus-cluster-status">2</a>, <a href="#3-Forward-a-local-port-to-Milvus">3단계에</a> 따라 클러스터 상태를 확인하고 로컬 포트를 Milvus로 전달할 수 있습니다.</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">실행 중인 Milvus 클러스터 업그레이드<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령어를 실행하여 실행 중인 Milvus 클러스터를 최신 버전으로 업그레이드합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --reset-then-reuse-values</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Milvus 제거<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 실행하여 Milvus를 제거합니다.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Docker에 Milvus를 설치했으면 다음을 수행할 수 있습니다:</p>
<ul>
<li><p><a href="/docs/ko/quickstart.md">Hello Milvus를</a> 확인하여 Milvus의 기능을 살펴봅니다.</p></li>
<li><p>Milvus의 기본 작동에 대해 알아보세요:</p>
<ul>
<li><a href="/docs/ko/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/insert-update-delete.md">삽입, 위로 올리기 및 삭제</a></li>
<li><a href="/docs/ko/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/docs/ko/upgrade_milvus_cluster-helm.md">헬름 차트를 사용하여 Milvus 업그레이드</a>.</p></li>
<li><p><a href="/docs/ko/scaleout.md">Milvus 클러스터 확장하기</a>.</p></li>
<li><p>Milvus 클러스터를 클라우드에 배포하세요:</p>
<ul>
<li><a href="/docs/ko/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/gcp.md">구글 클라우드</a></li>
<li><a href="/docs/ko/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvus 통합 가시성 및 관리를 위한 직관적인 웹 인터페이스인 Milvus <a href="/docs/ko/milvus-webui.md">WebUI를</a> 살펴보세요.</p></li>
<li><p>Milvus 데이터 백업을 위한 오픈 소스 도구인 Milvus <a href="/docs/ko/milvus_backup_overview.md">Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/birdwatcher_overview.md">Birdwatcher에</a> 대해 알아보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://github.com/zilliztech/attu">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/monitor.md">Prometheus로 Milvus 모니터링하기</a>.</p></li>
</ul>
