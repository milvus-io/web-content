---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: Kubernetes에 Milvus 클러스터를 설치하는 방법을 알아보세요.
title: 헬름 차트를 사용하여 GPU 지원 밀버스 실행하기
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">헬름 차트를 사용하여 GPU 지원으로 밀버스 실행하기<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지는 헬름 차트를 사용하여 GPU를 지원하는 Milvus 인스턴스를 시작하는 방법을 설명한다.</p>
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
    </button></h2><p>헬름은 차트라는 패키징 형식을 사용한다. 차트는 관련 쿠버네티스 리소스 집합을 설명하는 파일 모음이다. 밀버스는 밀버스 의존성과 컴포넌트를 배포하는 데 도움이 되는 차트 세트를 제공한다. <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus 헬름 차트는</a> 헬름 패키지 관리자를 사용하여 쿠버네티스(K8s) 클러스터에서 Milvus 배포를 부트스트랩하는 솔루션입니다.</p>
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
<li><p><a href="/docs/ko/v2.4.x/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">GPU 워커 노드가 있는 K8s 클러스터를 생성한다</a>.</p></li>
<li><p><a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">스토리지클래스를</a> 설치한다. 설치된 StorageClass는 아래와 같이 확인할 수 있다.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>설치하기 전에 <a href="/docs/ko/v2.4.x/prerequisite-gpu.md">하드웨어 및 소프트웨어 요구 사항을</a> 확인한다.</p></li>
</ul>
<div class="alert note">
<p>이미지를 가져오는 데 문제가 발생하면 <a href="mailto:community@zilliz.com">community@zilliz.com</a> 으로 문의해 주시면 필요한 지원을 제공해 드리겠습니다.</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Milvus용 헬름 차트 설치<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>헬름은 Milvus를 빠르게 배포할 수 있도록 도와주는 K8s 패키지 관리자입니다.</p>
<ol>
<li>밀버스 헬름 리포지토리를 추가합니다.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">https://milvus-io.github.io/milvus-helm/</code> 에 있는 밀버스 헬름 차트 리포지토리가 아카이브되었으며, 다음과 같이 <code translate="no">https://zilliztech.github.io/milvus-helm/</code> 에서 추가 업데이트를 받을 수 있다:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>보관된 리포지토리는 4.0.31까지 차트에 계속 사용할 수 있습니다. 이후 릴리스에서는 대신 새 리포지토리를 사용하세요.</p>
</div>
<ol start="2">
<li>로컬에서 차트 업데이트</li>
</ol>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">밀버스 시작<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>헬름 차트를 설치했으면, 쿠버네티스에서 밀버스를 시작할 수 있다. 이 섹션에서는 GPU 지원으로 Milvus를 시작하는 단계를 안내한다.</p>
<p>릴리스 이름, 차트 및 변경할 파라미터를 지정하여 헬름으로 Milvus를 시작해야 한다. 이 가이드에서는 릴리스 이름으로 <code translate="no">my-release</code> 을 사용한다. 다른 릴리스 이름을 사용하려면 다음 명령에서 <code translate="no">my-release</code> 를 사용 중인 릴리스 이름으로 바꾼다.</p>
<p>Milvus를 사용하면 하나 이상의 GPU 장치를 Milvus에 할당할 수 있습니다.</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. 단일 GPU 장치 할당</h3><p>GPU를 지원하는 Milvus에서는 하나 이상의 GPU 장치를 할당할 수 있습니다.</p>
<ul>
<li><p>Milvus 클러스터</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus 독립형</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. 여러 GPU 장치 할당</h3><p>단일 GPU 장치 외에도 여러 개의 GPU 장치를 Milvus에 할당할 수 있습니다.</p>
<ul>
<li><p>Milvus 클러스터</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 구성에서 indexNode와 queryNode는 두 개의 GPU를 공유합니다. 인덱스 노드와 쿼리 노드에 다른 GPU를 할당하려면 구성 파일에서 <code translate="no">extraEnv</code> 을 다음과 같이 설정하여 구성을 적절히 수정할 수 있습니다:</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>릴리스 이름에는 문자, 숫자, 대시만 포함해야 합니다. 릴리즈 이름에는 점을 사용할 수 없습니다.</li>
      <li>기본 명령줄은 헬름과 함께 밀버스를 설치하는 동안 클러스터 버전의 밀버스를 설치한다. Milvus를 독립형으로 설치할 때는 추가 설정이 필요하다.</li>
      <li><a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">쿠버네티스의 더 이상 사용되지 않는 API 마이그레이션 가이드에</a> 따르면, v1 <b>.</b> 25부터 <b>정책/v1beta1</b> 버전의 파드디스럽션버짓 API 버전은 더 이상 제공되지 않는다. 대신 <b>정책/v1</b> API 버전을 사용하도록 매니페스트와 API 클라이언트를 마이그레이션하는 것이 좋다. <br/>쿠버네티스 v1 <b>.</b> 25 이상에서 여전히 파드디스럽션버짓의 <b>정책/v1beta1</b> API 버전을 사용하는 사용자를 위한 해결 방법으로, 대신 다음 명령을 실행하여 밀버스를 설치할 수 있다:<br/>. <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>자세한 내용은 <a href="https://artifacthub.io/packages/helm/milvus/milvus">밀버스 헬름 차트와</a> <a href="https://helm.sh/docs/">헬름을</a> 참고한다.</li>
    </ul>
  </div>
</li>
<li><p>Milvus 독립형</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 구성에서 인덱스노드와 쿼리노드는 두 개의 GPU를 공유합니다. 인덱스 노드와 쿼리 노드에 다른 GPU를 할당하려면 다음과 같이 설정 파일에서 extraEnv를 설정하여 구성을 수정할 수 있습니다:</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. Milvus 상태 확인</h3><p>다음 명령어를 실행하여 Milvus 상태를 확인합니다:</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Milvus가 시작되면 <code translate="no">READY</code> 열에 모든 파드에 대해 <code translate="no">1/1</code> 이 표시됩니다.</p>
<ul>
<li><p>Milvus 클러스터</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datacoord-6fd4bd885c-gkzwx     1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexcoord-5bfcf6bdd8-nmh5l    1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querycoord-579cd79455-xht5n    1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-rootcoord-7fb9488465-dmbbj     1/1    Running   0        3m23s
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
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus 독립형</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. 로컬 포트를 Milvus로 포워드하기</h3><p>Milvus 서버가 수신 대기 중인 로컬 포트를 확인합니다. 포드 이름을 사용자 이름으로 바꿉니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음 명령을 실행하여 로컬 포트를 Milvus가 서비스하는 포트로 전달합니다.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>선택적으로, 위의 명령에서 <code translate="no">27017:19530</code> 대신 <code translate="no">:19530</code> 을 사용하여 <code translate="no">kubectl</code> 이 로컬 포트를 할당하도록 하여 포트 충돌을 관리할 필요가 없도록 할 수 있다.</p>
<p>기본적으로 kubectl의 포트 포워딩은 <code translate="no">localhost</code> 에서만 수신 대기한다. 밀버스가 선택한 또는 모든 IP 주소에서 수신 대기하도록 하려면 <code translate="no">address</code> 플래그를 사용한다. 다음 명령은 호스트 머신의 모든 IP 주소에서 포트 포워딩을 수신 대기하도록 한다.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
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
    </button></h2><p>Milvus를 설치했으면 다음을 수행할 수 있습니다:</p>
<ul>
<li><p><a href="/docs/ko/v2.4.x/quickstart.md">빠른 시작을</a> 확인하여 Milvus의 기능을 살펴봅니다.</p></li>
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
<li><p>Milvu 클러스터를 클라우드에 배포하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ko/v2.4.x/gcp.md">구글 클라우드</a></li>
<li><a href="/docs/ko/v2.4.x/azure.md">마이크로소프트 애저</a></li>
</ul></li>
<li><p>Milvus 데이터 백업을 위한 오픈 소스 도구인 <a href="/docs/ko/v2.4.x/milvus_backup_overview.md">Milvus Backup을</a> 살펴보세요.</p></li>
<li><p>Milvus 디버깅 및 동적 구성 업데이트를 위한 오픈 소스 도구인 <a href="/docs/ko/v2.4.x/birdwatcher_overview.md">Birdwatcher를</a> 살펴보세요.</p></li>
<li><p>직관적인 Milvus 관리를 위한 오픈 소스 GUI 도구인 <a href="https://milvus.io/docs/attu.md">Attu를</a> 살펴보세요.</p></li>
<li><p><a href="/docs/ko/v2.4.x/monitor.md">Prometheus로 Milvus 모니터링하기</a>.</p></li>
</ul>
