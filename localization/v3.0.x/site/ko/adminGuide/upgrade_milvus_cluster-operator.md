---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Milvus Operator를 사용하여 Milvus 클러스터를 업그레이드하는 방법을 알아보세요.
title: Milvus Operator를 사용하여 Milvus 클러스터 업그레이드하기
---
<div class="tab-wrapper"><a href="/docs/ko/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/ko/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Milvus Operator를 사용하여 Milvus 클러스터 업그레이드하기<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 Milvus Operator를 사용하여 Milvus 2.6.x 클러스터를 v3.0-beta로 업그레이드하는 방법을 설명합니다.</p>
<div class="alert note">
<p>이 절차는 Milvus Operator 1.3.0, MixCoord, StreamingNode, Woodpecker, 클러스터 내 etcd 및 클러스터 내 MinIO를 사용하여 Milvus 2.6.20에서 Milvus v3.0-beta로 업그레이드하는 과정에서 검증되었습니다. 다른 Milvus 2.6.x 패치 릴리스, Operator 버전, 구성 요소 토폴로지, 메시지 큐 또는 종속성 구성을 사용하는 경우, 먼저 비생산 환경에서 업그레이드를 검증하십시오.</p>
</div>
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
<li>Milvus Operator로 관리되는 Milvus 2.6.x 클러스터가 포함된 Kubernetes 클러스터</li>
<li><code translate="no">kubectl</code> 클러스터에 대한 접근 권한</li>
<li>기존 배포에 사용된 전체 Milvus 사용자 정의 리소스(CR) 매니페스트</li>
<li>기존 Milvus Operator에 사용된 설치 방법 및 매니페스트</li>
<li>Milvus 메타데이터 및 영구 데이터의 최신 백업</li>
</ul>
<p><strong>메시지 큐 제한 사항</strong>: Milvus v3.0-beta로 업그레이드할 때는 현재 사용 중인 메시지 큐를 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경에 대한 지원은 향후 버전에서 제공될 예정입니다.</p>
<div class="alert warning">
<p>이번 업그레이드에는 전체 Milvus CR을 적용하십시오. 이미지 전용 병합 패치는 사용하지 마십시오. 오퍼레이터는 생략된 레플리카가 0개인 컴포넌트 필드를 기본값으로 설정할 수 있으며, 이로 인해 기존 2.6.x 배포에서 비활성화된 컴포넌트가 다시 활성화될 수 있습니다.</p>
<p>이 절차는 Milvus 이미지를 2.6.x로 되돌리는 다운그레이드 또는 롤백을 검증하지 않습니다. v3.0-beta가 데이터를 기록한 후에는, 이미지 전용 롤백 시 업데이트된 상태를 읽지 못할 수 있습니다. 업그레이드가 실패할 경우, 쓰기 작업을 중지하고 업그레이드 전 메타데이터 및 영구 데이터 백업을 복원하는 복구 계획을 사용하십시오. 복구 계획은 먼저 비생산 환경에서 검증하십시오.</p>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">1단계: 현재 Milvus CR 백업<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>배포를 변경하기 전에 현재 CR을 저장하십시오:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>기존 배포의 소스 매니페스트를 업그레이드 매니페스트로 사용하십시오. 서버에서 관리하는 메타데이터 및 상태 필드를 먼저 제거하지 않고는 내보낸 백업 파일을 직접 적용하지 마십시오.</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">2단계: Milvus Operator 버전 확인<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>설치된 Milvus Operator에서 사용하는 이미지를 확인하십시오:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>검증된 업그레이드에서는 Milvus Operator 버전을 1.3.0으로 유지했습니다. 지원 정책에 따라 별도의 Operator 업그레이드가 필요한 경우가 아니라면, 현재 Milvus 2.6.x 배포를 관리하는 Operator 버전을 그대로 유지하십시오. 최신 버전의 Operator를 테스트된 버전으로 다운그레이드하지 마십시오. Operator 버전을 변경해야 하는 경우, 기존 설치와 동일한 Helm 또는 <code translate="no">kubectl</code> 설치 방법을 사용하고 동일한 릴리스 이름 및 네임스페이스를 지정한 다음, Milvus CR을 업데이트하기 전에 Operator 변경 사항을 검증하십시오.</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">3단계: Milvus 이미지 업데이트<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>완성된 Milvus CR 매니페스트에서 <code translate="no">spec.components.image</code> 을 대상 버전으로 변경하십시오. 현재 모드, 컴포넌트 토폴로지, 메시지 큐, etcd, 스토리지 및 기타 종속성 설정은 그대로 유지하십시오. 다음 발췌문은 확인해야 할 필드를 보여줍니다. 전체 CR을 이 발췌문으로 대체하지 마십시오.</p>
<p>대상 CR을 적용하기 전에 <code translate="no">indexNode.replicas</code> 가 <code translate="no">0</code> 인지 확인하십시오. 검증된 Milvus 2.6.20 구성에서는 이미 이 설정이 사용되었습니다. 대상 CR에서 명시적인 복제본 0개 설정을 유지하십시오.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
    <span class="hljs-attr">indexNode:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p>전체 CR 매니페스트를 적용합니다:</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
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
    </button></h2><p>CR 상태, Pod 상태 및 컨테이너 이미지를 확인하십시오:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CR이 <code translate="no">Healthy</code> 를 보고하는지, 모든 Milvus 구성 요소가 <code translate="no">milvusdb/milvus:v3.0-beta</code> 를 사용하는지, 실행 중인 IndexNode Pod가 없는지, 기존 컬렉션에 대한 쿼리 및 검색이 여전히 가능한지 확인하십시오. v3.0-beta 전용 기능을 활성화하기 전에 이러한 확인 작업을 완료하십시오.</p>
