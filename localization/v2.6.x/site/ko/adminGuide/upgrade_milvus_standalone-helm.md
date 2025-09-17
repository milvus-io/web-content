---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 헬름 차트를 사용하여 Milvus를 스탠드얼론으로 업그레이드하는 방법을 알아보세요.
title: 헬름 차트로 밀버스 스탠드얼론 업그레이드하기
---
<div class="tab-wrapper"><a href="/docs/ko/upgrade_milvus_standalone-operator.md" class=''>밀버스</a><a href="/docs/ko/upgrade_milvus_standalone-helm.md" class='active '>오퍼레이터헬름도커</a><a href="/docs/ko/upgrade_milvus_standalone-docker.md" class=''>컴포즈</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">헬름 차트로 밀버스 스탠드얼론 업그레이드하기<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 헬름 차트를 사용하여 Milvus 독립 실행형 배포를 v2.5.x에서 v2.6.0으로 업그레이드하는 방법을 설명한다.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v260" class="common-anchor-header">v2.6.0의 새로운 기능<button data-href="#Whats-new-in-v260" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 2.5.x에서 2.6.0으로 업그레이드하려면 아키텍처가 크게 변경됩니다:</p>
<ul>
<li><strong>코디네이터 통합</strong>: 기존의 개별 코디네이터 (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>)가 단일 코디네이터로 통합되었습니다. <code translate="no">mixCoord</code></li>
<li><strong>새로운 구성 요소</strong>: 향상된 데이터 처리를 위한 스트리밍 노드 도입</li>
<li><strong>구성 요소 제거</strong>: <code translate="no">indexNode</code> 제거 및 통합</li>
</ul>
<p>이 업그레이드 프로세스는 새로운 아키텍처로의 적절한 마이그레이션을 보장합니다. 아키텍처 변경에 대한 자세한 내용은 <a href="/docs/ko/architecture_overview.md">Milvus 아키텍처 개요를</a> 참조하세요.</p>
<h3 id="Requirements" class="common-anchor-header">요구 사항<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>시스템 요구 사항:</strong></p>
<ul>
<li>헬름 버전 &gt;= 3.14.0</li>
<li>Kubernetes 버전 &gt;= 1.20.0</li>
<li>헬름 차트를 통해 배포된 밀버스 독립형</li>
</ul>
<p><strong>호환성 요구 사항:</strong></p>
<ul>
<li>밀버스 v2.6.0-rc1은 v2.6.0과 <strong>호환되지 않는다</strong>. 릴리스 후보에서 직접 업그레이드하는 것은 지원되지 않는다.</li>
<li>현재 v2.6.0-rc1을 실행 중이며 데이터를 보존해야 하는 경우 <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">이 커뮤니티 가이드에서</a> 마이그레이션 지원을 참조하세요.</li>
<li>v2.6.0으로 업그레이드하기 전에 v2.5.16 이상으로 <strong>업그레이드해야</strong> 합니다.</li>
</ul>
<div class="alert note">
밀버스 헬름 차트 버전 4.2.21부터 pulsar-v3.x 차트를 종속성으로 도입했습니다. 이전 버전과의 호환성을 위해 헬름을 v3.14 이상 버전으로 업그레이드하고 <code translate="no">helm upgrade</code> 을 사용할 때마다 <code translate="no">--reset-then-reuse-values</code> 옵션을 추가해야 한다.</div>
<h2 id="Upgrade-process" class="common-anchor-header">업그레이드 프로세스<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-Helm-Chart" class="common-anchor-header">1단계: 헬름 차트 업그레이드<button data-href="#Step-1-Upgrade-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h3><p>먼저, 밀버스 헬름 차트를 버전 5.0.0으로 업그레이드한다:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
 <code translate="no">https://milvus-io.github.io/milvus-helm/</code> 에 있는 밀버스 헬름 차트 리포지토리가 아카이브되었다. 차트 버전 4.0.31 이상에서는 새 리포지토리( <code translate="no">https://zilliztech.github.io/milvus-helm/</code> )를 사용한다.</div>
<p>밀버스 버전과의 헬름 차트 버전 호환성을 확인하려면:</p>
<pre><code translate="no" class="language-bash">helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<p>이 가이드는 최신 버전을 설치한다고 가정합니다. 특정 버전을 설치해야 하는 경우 그에 따라 <code translate="no">--version</code> 매개 변수를 지정하세요.</p>
<h3 id="Step-2-Upgrade-to-v2516" class="common-anchor-header">2단계: v2.5.16으로 업그레이드하기<button data-href="#Step-2-Upgrade-to-v2516" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert-note">
<p>독립 실행형 배포가 이미 v2.5.16 이상을 실행 중인 경우 이 단계를 건너뛰세요.</p>
</div>
<p>Milvus 스탠드얼론을 v2.5.16으로 업그레이드합니다:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
<p>업그레이드가 완료될 때까지 기다립니다:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Upgrade-to-v260" class="common-anchor-header">3단계: v2.6.0으로 업그레이드하기<button data-href="#Step-3-Upgrade-to-v260" class="anchor-icon" translate="no">
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
    </button></h3><p>v2.5.16이 성공적으로 실행되면 v2.6.0으로 업그레이드합니다:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.6.0&quot;</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">업그레이드 확인<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>독립 실행형 배포에서 새 버전이 실행되고 있는지 확인합니다:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>추가 지원이 필요한 경우 <a href="https://milvus.io/docs">Milvus 설명서</a> 또는 <a href="https://github.com/milvus-io/milvus/discussions">커뮤니티 포럼을</a> 참조하세요.</p>
