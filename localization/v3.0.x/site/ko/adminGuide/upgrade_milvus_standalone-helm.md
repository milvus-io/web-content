---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Helm 차트를 사용하여 Milvus 독립 실행형 버전을 업그레이드하는 방법을 알아보세요.
title: Helm 차트를 사용하여 Milvus 독립형 버전 업그레이드
---
<div class="tab-wrapper"><a href="/docs/ko/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ko/upgrade_milvus_standalone-docker.md" class=''>Operator</a>, Helm, Docker<a href="/docs/ko/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Helm 차트를 사용하여 Milvus 독립형 버전 업그레이드<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 Helm을 사용하여 Milvus 2.6.x 독립형 배포 환경을 v3.0-beta로 업그레이드하는 방법을 설명합니다.</p>
<div class="alert note">
<p>이 절차는 Milvus Helm 차트 5.0.22를 사용하여 Milvus 2.6.20에서 Milvus v3.0-beta로 업그레이드하는 경우 검증되었습니다. 다른 Milvus 2.6.x 패치 릴리스나 Helm 차트 버전을 사용하는 경우, 먼저 비생산 환경에서 업그레이드를 검증하십시오.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Helm 3.14.0 이상</li>
<li>Helm으로 관리되는 기존 Milvus 2.6.x 배포 환경</li>
<li>기존 배포에 사용된 Helm 값</li>
<li>Milvus 메타데이터 및 영구 데이터의 최신 백업</li>
</ul>
<p><strong>메시지 큐 제한 사항</strong>: Milvus v3.0-beta로 업그레이드할 때는 현재 사용 중인 메시지 큐를 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경에 대한 지원은 향후 버전에서 제공될 예정입니다.</p>
<div class="alert warning">
<p>이 절차의 일환으로 Helm 차트를 변경하거나 다운그레이드하지 마십시오. Helm 릴리스에 이미 설치된 차트 버전을 유지하십시오. 테스트된 기준 환경에서는 Helm 차트 5.0.22를 그대로 유지하고 Milvus 이미지 태그만 <code translate="no">v3.0-beta</code> 로 변경했습니다.</p>
<p>이 절차는 Milvus 이미지를 2.6.x로 되돌리는 다운그레이드 또는 롤백을 검증하지 않습니다. v3.0-beta가 데이터를 기록한 후에는, 이미지만 롤백할 경우 업데이트된 상태를 읽지 못할 수 있습니다. 업그레이드가 실패하면 쓰기 작업을 중지하고, 업그레이드 전 메타데이터와 영구 데이터 백업을 복원하는 복구 계획을 사용하십시오. 복구 계획은 먼저 비생산 환경에서 검증하십시오.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">업그레이드 절차<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Update-the-Helm-repository" class="common-anchor-header">1단계: Helm 저장소 업데이트<button data-href="#Step-1-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Helm 저장소를 추가하거나 업데이트하십시오:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note"><code translate="no">https://milvus-io.github.io/milvus-helm/</code> 에 있던 Milvus Helm 차트 저장소는 아카이브 처리되었습니다. 차트 버전 4.0.31 이상은 새로운 저장소 <code translate="no">https://zilliztech.github.io/milvus-helm/</code> 를 사용하십시오.
</div>
<h3 id="Step-2-Upgrade-Milvus" class="common-anchor-header">2단계: Milvus 업그레이드<button data-href="#Step-2-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Helm 릴리스에 설치된 차트 버전을 확인하십시오:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">CHART</code> 열에서 값의 <code translate="no">milvus-</code> 접두사를 제거하고, 남은 버전을 <code translate="no">&lt;current-chart-version&gt;</code> 형식으로 사용합니다. 그런 다음 업그레이드 명령을 실행합니다:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0-beta&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 20m
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--reset-then-reuse-values</code> 옵션은 이전 릴리스의 값을 유지하면서, 선택한 차트 기본값에 대해 명시적인 이미지 재정의(override)를 적용합니다.</p>
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
    </button></h2><p>Helm 리비전, Pod 상태 및 컨테이너 이미지를 확인하십시오:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>모든 필수 워크로드가 준비되었는지, Milvus가 <code translate="no">v3.0-beta</code> 를 사용하는지, 기존 컬렉션을 계속 쿼리하고 검색할 수 있는지 확인하십시오. v3.0-beta 전용 기능을 활성화하기 전에 이러한 확인 작업을 완료하십시오.</p>
<div class="alert note">
<p>Milvus 3.0으로 업그레이드한다고 해서 Storage V3가 활성화되는 것은 아닙니다. 업그레이드를 확인한 후, Storage V3에 의존하는 기능을 활성화하기 전에 <a href="/docs/ko/storage-v3.md">Storage V3에 대해</a> 검토하십시오. Milvus가 Storage V3 데이터를 기록한 후에는 Storage V3를 읽을 수 없는 이전 버전의 Milvus로 다운그레이드하는 것이 지원되지 않습니다.</p>
</div>
