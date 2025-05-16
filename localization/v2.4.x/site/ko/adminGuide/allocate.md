---
id: allocate.md
title: 쿠버네티스에서 밀버스에 리소스 할당하기
summary: Kubernetes에서 Milvus에 리소스를 할당하는 방법을 알아보세요.
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">쿠버네티스에서 리소스 할당하기<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 쿠버네티스의 Milvus 클러스터에 리소스를 할당하는 방법을 설명합니다.</p>
<p>일반적으로, 프로덕션 환경에서 Milvus 클러스터에 할당하는 리소스는 머신 워크로드에 비례해야 합니다. 리소스를 할당할 때 머신 유형도 고려해야 합니다. 클러스터가 실행 중일 때 구성을 업데이트할 수 있지만 <a href="/docs/ko/v2.4.x/install_cluster-helm.md">클러스터를 배포하기</a> 전에 값을 설정하는 것이 좋습니다.</p>
<div class="alert note">
<p>Milvus 운영자를 사용하여 리소스를 할당하는 방법에 대한 자세한 내용은 <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Milvus 운영자를 사용하여 리소스 할당하기를</a> 참조하세요.</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1. 사용 가능한 리소스 보기<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">kubectl describe nodes</code> 를 실행하여 프로비저닝한 인스턴스에서 사용 가능한 리소스를 확인합니다.</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2. 리소스 할당하기<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>헬름을 사용하여 CPU와 메모리 리소스를 밀버스 컴포넌트에 할당한다.</p>
<div class="alert note">
헬름을 사용하여 리소스를 업그레이드하면 실행 중인 파드가 롤링 업데이트를 수행하게 된다.</div>
<p>리소스를 할당하는 방법에는 두 가지가 있다:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/allocate.md#Allocate-resources-with-commands">다음 명령을 사용한다.</a></li>
<li><a href="/docs/ko/v2.4.x/allocate.md#Allocate-resources-by-setting-configuration-file"> <code translate="no">YAML</code> 파일에서 파라미터를 설정한다.</a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">명령어로 리소스 할당</h3><p><code translate="no">--set</code> 를 사용하여 리소스 구성을 업데이트하는 경우 각 Milvus 구성 요소에 대한 리소스 변수를 설정해야 합니다.</p>
<div class="filter">
<a href="#standalone">Milvus 독립형</a> <a href="#cluster">Milvus 클러스터</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> standalone.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> standalone.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> standalone.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> dataNode.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> dataNode.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> dataNode.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">구성 파일을 설정하여 리소스 할당</h3><p><code translate="no">resources.yaml</code> 파일에 <code translate="no">resources.requests</code> 및 <code translate="no">resources.limits</code> 파라미터를 지정하여 CPU 및 메모리 리소스를 할당할 수도 있습니다.</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3. 구성 적용<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령어를 실행하여 Milvus 클러스터에 새 구성을 적용합니다.</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
 <code translate="no">resources.limits</code> 을 지정하지 않으면, 파드가 사용 가능한 모든 CPU 및 메모리 리소스를 사용하게 됩니다. 따라서 동일한 인스턴스에서 실행 중인 다른 작업에서 더 많은 메모리 소비가 필요한 경우 리소스의 전체 할당을 피하려면 <code translate="no">resources.requests</code> 및 <code translate="no">resources.limits</code> 을 지정해야 합니다.</div>
<p>리소스 관리에 대한 자세한 내용은 <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">쿠버네티스 설명서를</a> 참조한다.</p>
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
<li>다음 방법을 배울 수도 있습니다:<ul>
<li><a href="/docs/ko/v2.4.x/scaleout.md">Milvus 클러스터 확장하기</a></li>
<li><a href="/docs/ko/v2.4.x/upgrade_milvus_cluster-operator.md">Milvus 클러스터 업그레이드</a></li>
<li><a href="/docs/ko/v2.4.x/upgrade_milvus_standalone-operator.md">Milvus 독립 실행형 업그레이드</a></li>
</ul></li>
<li>클라우드에 클러스터를 배포할 준비가 되셨다면:<ul>
<li><a href="/docs/ko/v2.4.x/eks.md">Terraform을 사용하여 Amazon EKS에 Milvus를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.4.x/gcp.md">Kubernetes를 사용하여 GCP에 Milvus 클러스터를 배포하는</a> 방법 알아보기</li>
<li><a href="/docs/ko/v2.4.x/azure.md">Kubernetes를 사용하여 Microsoft Azure에 Milvus를 배포하는</a> 방법 알아보기</li>
</ul></li>
</ul>
