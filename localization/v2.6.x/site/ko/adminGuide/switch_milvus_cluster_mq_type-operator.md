---
id: switch_milvus_cluster_mq_type-operator.md
summary: Milvus 클러스터의 메시지 큐 유형을 전환하는 방법을 알아보세요.
title: Milvus 클러스터의 MQ 유형 전환하기
---
<h1 id="Switch-MQ-Type-for-Milvus-Cluster" class="common-anchor-header">Milvus 클러스터의 MQ 유형 전환하기<button data-href="#Switch-MQ-Type-for-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>이 도움말 항목에서는 기존 Milvus 클러스터 배포의 메시지 큐(MQ) 유형을 전환하는 방법에 대해 설명합니다. Milvus는 가동 중단 시간 없이 Pulsar, Kafka, Woodpecker 간의 온라인 MQ 전환을 지원합니다.</p>
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
<li><a href="/docs/ko/v2.6.x/install_cluster-milvusoperator.md">Milvus Operator</a> 또는 <a href="/docs/ko/v2.6.x/install_cluster-helm.md">Helm을</a> 통해 설치된 실행 중인 Milvus 클러스터 인스턴스.</li>
<li>Milvus 인스턴스가 이 Switch MQ 기능을 지원하는 최신 버전으로 업그레이드되었습니다.</li>
</ul>
<h2 id="Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="common-anchor-header">Pulsar/Kafka에서 Woodpecker(MinIO)로 전환하기<button data-href="#Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 단계에 따라 MQ 유형을 Pulsar 또는 Kafka에서 MinIO 스토리지가 있는 Woodpecker로 전환하세요.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">1단계: Milvus 인스턴스가 실행 중인지 확인<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>전환하기 전에 Milvus 클러스터 인스턴스가 제대로 실행되고 있는지 확인하세요. 테스트 컬렉션을 만들고, 데이터를 삽입하고, 쿼리를 실행하여 이를 확인할 수 있습니다.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">2단계: (선택 사항) 우드펙커 구성 확인<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 Milvus 구성은 이미 Woodpecker 스토리지 유형을 MinIO로 설정하고 있으므로 대부분의 경우 추가 구성이 필요하지 않습니다.</p>
<p>그러나 이전에 Woodpecker 구성을 사용자 지정한 경우 <code translate="no">woodpecker.storage.type</code> 가 <code translate="no">minio</code> 로 설정되어 있는지 확인해야 합니다. <code translate="no">mqType</code> 값을 변경하지 <strong>않고</strong> Milvus 구성을 업데이트하세요:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>헬름의</strong> 경우 구성 업데이트에 대한 지침은 <a href="/docs/ko/v2.6.x/configure-helm.md">헬름 차트로 Milvus 구성을</a> 참조하세요.</li>
<li><strong>밀버스 오퍼</strong>레이터의 경우, 구성 업데이트에 대한 지침은 <a href="/docs/ko/v2.6.x/configure_operator.md">밀버스 오퍼레이터로 밀버스 구</a> 성을 참조하세요.</li>
</ul>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">3단계: MQ 스위치 실행하기<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령을 실행하여 우드페커로 전환을 트리거합니다:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">&lt;mixcoord_addr&gt;</code> 을 실제 MixCoord 서비스의 주소로 바꿉니다.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">4단계: 전환이 완료되었는지 확인<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>스위치 프로세스가 자동으로 완료됩니다. Milvus 로그에서 다음 주요 메시지가 있는지 모니터링하여 전환이 완료되었는지 확인하세요:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>위의 로그 메시지에서 <code translate="no">&lt;MQ1&gt;</code> 는 소스 MQ 유형(예: <code translate="no">pulsar</code> 또는 <code translate="no">kafka</code>)이고 <code translate="no">&lt;MQ2&gt;</code> 는 대상 MQ 유형(<code translate="no">woodpecker</code>)입니다.</p>
<ul>
<li>첫 번째 메시지는 소스에서 대상으로의 WAL 전환이 완료되었음을 나타냅니다.</li>
<li>두 번째 메시지는 모든 물리적 채널이 전환되었음을 나타냅니다.</li>
<li>세 번째 메시지는 <code translate="no">mq.type</code> 구성이 etcd에서 업데이트되었음을 나타냅니다.</li>
</ul>
</div>
<h2 id="Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="common-anchor-header">우드페커(MinIO)에서 펄서 또는 카프카로 전환하기<button data-href="#Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 단계에 따라 MQ 유형을 우드펙커에서 Pulsar 또는 카프카로 다시 전환하세요.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">1단계: Milvus 인스턴스가 실행 중인지 확인하기<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>전환하기 전에 Milvus 클러스터 인스턴스가 제대로 실행되고 있는지 확인하세요.</p>
<h3 id="Step-2-Configure-the-target-MQ" class="common-anchor-header">2단계: 대상 MQ 구성<button data-href="#Step-2-Configure-the-target-MQ" class="anchor-icon" translate="no">
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
    </button></h3><p>전환을 트리거하기 전에 대상 MQ 서비스(Pulsar 또는 Kafka)를 사용할 수 있고 해당 액세스 구성이 Milvus 구성에 렌더링되어 있는지 확인해야 합니다.</p>
<div class="alert note">
<p>이 섹션의 정확한 단계는 내부(번들) 또는 외부 MQ 서비스를 사용하는지 여부에 따라 다릅니다.</p>
</div>
<h4 id="Option-A-Internal-PulsarKafka-bundled-with-Helm" class="common-anchor-header">옵션 A: 내부 Pulsar/Kafka(헬름에 번들로 제공)</h4><p>헬름에서 배포한 번들 Pulsar 또는 카프카를 사용하는 경우, 헬름 릴리스를 업데이트하여 대상 MQ 서비스를 활성화하고 딱따구리를 비활성화한다. <code translate="no">streaming.enabled=true</code> 플래그는 스트리밍 노드를 활성화하는 데 필요하며, 이는 스위치 MQ 기능의 전제 조건이다. 예를 들어, Pulsar로 전환하려면:</p>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>업그레이드 후 대상 MQ 액세스 구성이 Milvus 구성으로 렌더링되었는지 확인합니다. 예를 들어, Pulsar의 경우</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar-proxy-address&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Option-B-Internal-PulsarKafka-managed-by-Milvus-Operator" class="common-anchor-header">옵션 B: 내부 Pulsar/Kafka(Milvus Operator에서 관리)</h4><p>Milvus Operator를 사용하는 경우, 대상 MQ 액세스 구성을 포함하도록 Milvus 사용자 정의 리소스를 업데이트하세요. Milvus 구성 업데이트에 대한 자세한 내용은 Milvus <a href="/docs/ko/v2.6.x/configure_operator.md">Operator로 Milvus 구성하기를</a> 참조하세요.</p>
<h4 id="Option-C-External-PulsarKafka" class="common-anchor-header">옵션 C: 외부 Pulsar/Kafka</h4><p>외부 Pulsar 또는 Kafka 서비스를 사용하는 경우 <code translate="no">mqType</code> 을 변경할 필요가 없습니다. <code translate="no">values.yaml</code> 에 외부 MQ 액세스 구성을 추가하고 Milvus 인스턴스를 다시 시작하여 구성을 렌더링하기만 하면 됩니다.</p>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">3단계: MQ 스위치 실행하기<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령을 실행하여 Pulsar로 전환을 트리거합니다(Kafka로 전환하는 경우 <code translate="no">pulsar</code> 을 <code translate="no">kafka</code> 으로 대체):</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">&lt;mixcoord_addr&gt;</code> 을 MixCoord 서비스의 실제 주소로 바꿉니다.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">4단계: 전환이 완료되었는지 확인<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>전환 프로세스가 자동으로 완료됩니다. Milvus 로그에서 다음 주요 메시지를 모니터링하여 전환이 완료되었는지 확인하세요:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>위의 로그 메시지에서 <code translate="no">&lt;MQ1&gt;</code> 는 소스 MQ 유형(<code translate="no">woodpecker</code>)이고 <code translate="no">&lt;MQ2&gt;</code> 는 대상 MQ 유형(예: <code translate="no">pulsar</code> 또는 <code translate="no">kafka</code>)입니다.</p>
<ul>
<li>첫 번째 메시지는 소스에서 대상으로의 WAL 전환이 완료되었음을 나타냅니다.</li>
<li>두 번째 메시지는 모든 물리적 채널이 전환되었음을 나타냅니다.</li>
<li>세 번째 메시지는 <code translate="no">mq.type</code> 구성이 etcd에서 업데이트되었음을 나타냅니다.</li>
</ul>
</div>
