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
<li><p><a href="/docs/ko/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">K8s 클러스터를 생성한다</a>.</p></li>
<li><p><a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">스토리지클래스를</a> 설치한다. 설치된 StorageClass는 아래와 같이 확인할 수 있다.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>설치하기 전에 <a href="/docs/ko/v2.4.x/prerequisite-helm.md">하드웨어 및 소프트웨어 요구 사항을</a> 확인한다.</p></li>
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
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Milvus Helm Charts 리포지토리( <code translate="no">https://github.com/milvus-io/milvus-helm</code> )는 아카이브되어 있으며, 다음과 같이 <code translate="no">https://github.com/zilliztech/milvus-helm</code> 에서 추가 업데이트를 받을 수 있습니다:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>보관된 리포지토리는 4.0.31까지 차트에 계속 사용할 수 있습니다. 이후 릴리스에서는 새 리포지토리를 사용하세요.</p>
</div>
<p>그런 다음 다음과 같이 리포지토리에서 Milvus 차트를 가져옵니다:</p>
<pre><code translate="no">$ helm repo update
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. 밀버스 클러스터 배포</h3><p>헬름 차트를 설치했으면, 쿠버네티스에서 Milvus를 시작할 수 있다. 이 섹션에서는 Milvus를 시작하는 단계를 안내합니다.</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>위의 명령에서 <code translate="no">my-release</code> 은 릴리스 이름이고 <code translate="no">milvus/milvus</code> 은 로컬로 설치된 차트 리포지토리입니다. 다른 이름을 사용하려면 <code translate="no">my-release</code> 을 원하는 이름으로 바꾸세요.</p>
<p>위의 명령은 기본 구성을 사용하여 구성 요소 및 종속성과 함께 Milvus 클러스터를 배포합니다. 이러한 설정을 사용자 지정하려면 <a href="https://milvus.io/tools/sizing">Milvus 크기</a> 조정 <a href="https://milvus.io/tools/sizing">도구를</a> 사용하여 실제 데이터 크기에 따라 구성을 조정한 다음 해당 YAML 파일을 다운로드하는 것이 좋습니다. 구성 매개변수에 대해 자세히 알아보려면 <a href="https://milvus.io/docs/system_configuration.md">Milvus 시스템 구성 체크리스트를</a> 참조하세요.</p>
<div class="alert note">
  <ul>
    <li>릴리스 이름에는 문자, 숫자 및 대시만 포함해야 합니다. 릴리스 이름에는 점을 사용할 수 없습니다.</li>
    <li>기본 명령줄은 헬름과 함께 Milvus를 설치하는 동안 클러스터 버전의 Milvus를 설치합니다. Milvus를 독립형으로 설치할 때는 추가 설정이 필요하다.</li>
    <li><a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">쿠버네티스의 더 이상 사용되지 않는 API 마이그레이션 가이드에</a> 따르면, v1.25 버전부터 파드장애예산 <b>정책/v1beta1</b> API 버전은 더 이상 제공되지 않는다. 대신 <b>정책/v1</b> API 버전을 사용하도록 매니페스트와 API 클라이언트를 마이그레이션하는 것이 좋다. <br/>쿠버네티스 v1.25 이상에서 여전히 <b>정책/v1beta1</b> 버전의 파드디스럽션예산 API 버전을 사용하는 사용자를 위한 해결 방법으로, 대신 다음 명령을 실행하여 밀버스를 설치할 수 있다:<br/>. <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>자세한 내용은 <a href="https://artifacthub.io/packages/helm/milvus/milvus">밀버스 헬름 차트와</a> <a href="https://helm.sh/docs/">헬름을</a> 참고한다.</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Milvus 클러스터 상태 확인</h3><p>다음 명령어를 실행하여 Milvus 클러스터의 모든 파드의 상태를 확인합니다.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>모든 파드가 실행되면 위 명령어의 출력은 다음과 유사하게 표시됩니다:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Milvus로 로컬 포트 포워딩</h3><p>다음 명령어를 실행하여 Milvus 클러스터가 서비스하는 포트를 가져옵니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>출력은 Milvus 인스턴스가 기본 포트 <strong>19530에서</strong> 서비스하고 있음을 보여줍니다.</p>
<div class="alert note">
<p>독립 실행형 모드로 Milvus를 배포한 경우, 파드 이름을 <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> 에서 <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code> 으로 변경합니다.</p>
</div>
<p>그런 다음 다음 명령을 실행하여 로컬 포트를 Milvus가 서비스하는 포트로 전달합니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>선택적으로, 위의 명령에서 <code translate="no">27017:19530</code> 대신 <code translate="no">:19530</code> 을 사용하여 <code translate="no">kubectl</code> 이 로컬 포트를 할당하도록 하여 포트 충돌을 관리할 필요가 없도록 할 수 있다.</p>
<p>기본적으로 kubectl의 포트 포워딩은 <code translate="no">localhost</code> 에서만 수신 대기한다. 밀버스가 선택한 또는 모든 IP 주소에서 수신 대기하도록 하려면 <code translate="no">address</code> 플래그를 사용한다. 다음 명령은 호스트 머신의 모든 IP 주소에서 포트 포워딩을 수신 대기하도록 한다.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>네트워크가 제한된 환경에 있는 경우 이 섹션의 절차에 따라 Milvus 클러스터를 시작하세요.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Milvus 매니페스트 가져오기</h3><p>다음 명령을 실행하여 Milvus 매니페스트를 가져옵니다.</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>위 명령은 Milvus 클러스터에 대한 차트 템플릿을 렌더링하고 출력을 <code translate="no">milvus_manifest.yaml</code> 이라는 매니페스트 파일에 저장합니다. 이 매니페스트를 사용하여 별도의 파드에 구성 요소 및 종속 요소와 함께 Milvus 클러스터를 설치할 수 있습니다.</p>
<div class="alert note">
<ul>
<li>모든 Milvus 구성 요소가 단일 포드 내에 포함된 독립형 모드에서 Milvus 인스턴스를 설치하려면 대신 <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> 을 실행하여 독립형 모드에서 Milvus 인스턴스에 대한 차트 템플릿을 렌더링해야 합니다.</li>
<li>Milvus 구성을 변경하려면, 템플릿을 다운로드하고 <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> 템플릿을 다운로드하여 원하는 설정을 지정한 다음 <code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> 을 사용하여 매니페스트를 적절히 렌더링합니다.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. 이미지 풀링 스크립트 다운로드</h3><p>이미지 풀링 스크립트는 Python으로 개발되었습니다. <code translate="no">requirement.txt</code> 파일에서 해당 스크립트와 종속 요소를 다운로드해야 합니다.</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. 이미지 가져오기 및 저장</h3><p>다음 명령을 실행하여 필요한 이미지를 가져와 저장합니다.</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이미지는 현재 디렉토리의 <code translate="no">images</code> 이라는 하위 폴더로 가져옵니다.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. 이미지 로드</h3><p>이제 다음과 같이 네트워크가 제한된 환경의 호스트에 이미지를 로드할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Milvus 배포</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
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
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
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
<li><p><a href="/docs/ko/v2.4.x/quickstart.md">Hello Milvus를</a> 확인하여 Milvus의 기능을 살펴봅니다.</p></li>
<li><p>Milvus의 기본 작동에 대해 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/manage_databases.md">데이터베이스 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/manage-partitions.md">파티션 관리</a></li>
<li><a href="/docs/ko/v2.4.x/insert-update-delete.md">삽입, 위로 올리기 및 삭제</a></li>
<li><a href="/docs/ko/v2.4.x/single-vector-search.md">단일 벡터 검색</a></li>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색</a></li>
</ul></li>
<li><p><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-helm.md">헬름 차트를 사용하여 Milvus 업그레이드</a>.</p></li>
<li><p><a href="/docs/ko/v2.4.x/scaleout.md">Milvus 클러스터 확장하기</a>.</p></li>
<li><p>Milvus 클러스터를 클라우드에 배포하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/v2.4.x/gcp.md">구글 클라우드</a></li>
<li><a href="/docs/ko/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Milvus 데이터 백업을 위한 오픈 소스 도구인 Milvus <a href="/docs/ko/v2.4.x/milvus_backup_overview.md">Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/v2.4.x/birdwatcher_overview.md">Birdwatcher를</a> 살펴보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://milvus.io/docs/attu.md">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/v2.4.x/monitor.md">Prometheus로 Milvus 모니터링</a>.</p></li>
</ul>
