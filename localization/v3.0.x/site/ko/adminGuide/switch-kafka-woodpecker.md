---
id: switch-kafka-woodpecker.md
title: Kafka와 Woodpecker 간 전환
summary: Helm 또는 Milvus Operator를 사용하여 Milvus 클러스터의 메시지 큐를 Kafka와 Woodpecker 간에 전환합니다.
---
<h1 id="Switch-between-Kafka-and-Woodpecker" class="common-anchor-header">Kafka와 Woodpecker 간 전환<button data-href="#Switch-between-Kafka-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 <strong>Milvus 클러스터의</strong> 메시지 큐(MQ)를 <strong>Kafka</strong> (내장형 또는 외부)와 <strong>Woodpecker</strong> (MinIO 백엔드) 간에 양방향으로 전환하는 방법을 설명합니다. 일반적인 워크플로우 및 필수 조건에 대해서는 <a href="/docs/ko/switch-mq-type.md">MQ 유형 전환을</a> 참조하십시오.</p>
<div class="alert note">
<p><strong>필수 조건:</strong> MQ 전환 기능은 <strong>Milvus 3.0 이상</strong> 버전에서 사용할 수 있습니다. 시작하기 전에 Milvus 인스턴스를 Milvus 3.0 이상으로 업그레이드하십시오. 이전 버전에서는 이 기능을 사용할 수 없습니다.</p>
</div>
<div class="alert warning">
<p>메시지 큐 전환은 <strong>위험도가 높은 작업입니다</strong>. <strong>배포 방식</strong> ( <strong>Helm 사용</strong> 또는 <strong>Milvus Operator 사용</strong> ) <strong>에</strong> 해당하는 섹션을 선택하고, 해당 섹션의 지침을 처음부터 끝까지 따르십시오. Helm 명령어와 Operator 명령어를 혼용하지 마십시오.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Helm 사용 시<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Helm" class="common-anchor-header">Kafka에서 Woodpecker로 전환(Helm)<button data-href="#Switch-from-Kafka-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>1단계: Milvus 인스턴스가 실행 중인지 확인합니다.</strong> 테스트 컬렉션을 생성하고, 데이터를 삽입하며, 쿼리를 실행하는 등의 방법으로 Milvus 클러스터가 정상적으로 작동하는지 확인하십시오.</p>
<p><strong>2단계: MQ 전환을 실행합니다.</strong> MixCoord 관리 인터페이스를 노출한 다음, 전환 API를 호출합니다.</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>다른 터미널에서:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>3단계: 전환이 완료되었는지 확인합니다.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>전환이 성공하면 <code translate="no">[mqTypeValue=woodpecker]</code> 로깅됩니다.</p>
<p><strong>4단계: (선택 사항) Kafka를 중지하고 정리합니다.</strong> <strong>내장형</strong> Kafka의 경우, Kafka 포드와 해당 PVC를 제거합니다. <strong>외부</strong> Kafka의 경우, 외부 Kafka 인스턴스에서 Milvus 토픽을 정리합니다. 토픽 형식은 <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> 입니다.</p>
<div class="alert note">
<p>나중에 다시 Kafka로 전환할 계획이라면, 충돌을 방지하기 위해 먼저 데이터/토픽을 정리하십시오.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Kafka-Helm" class="common-anchor-header">Woodpecker에서 Kafka로 전환 (Helm)<button data-href="#Switch-from-Woodpecker-to-Kafka-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>1단계: Milvus 인스턴스가 실행 중인지 확인합니다.</strong></p>
<p><strong>2단계: 대상 Kafka 연결을 구성하고 Milvus를 다시 시작합니다.</strong> 전환을 위해서는 Milvus가 이미 Kafka 연결 정보를 알고 있어야 하므로, <code translate="no">extraConfigFiles</code> 를 통해 <code translate="no">user.yaml</code> 에 해당 정보를 작성한 후 <code translate="no">helm upgrade</code> 를 실행하여 적용합니다(이 명령은 포드를 롤오버합니다). Switch MQ 기능을 사용하려면 <code translate="no">streaming.enabled=true</code> 가 필요합니다. SASL/SSL에 대한 자세한 내용은 <a href="/docs/ko/connect_kafka_ssl.md">‘SASL/SSL을 사용하여 Kafka에 연결하기’를</a> 참조하십시오.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        - &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set kafka.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>모든 파드가 준비될 때까지 기다린 후, Kafka 액세스 구성이 Milvus 구성에 반영되었는지 확인하십시오.</p>
<p><strong>3단계: MQ 전환을 실행합니다.</strong></p>
<div class="alert note">
<p>대상 Kafka에 이전 구성의 Milvus 토픽이 포함되어 있지 않은지 확인하십시오. Kafka로 처음 전환하는 경우 이 참고 사항을 건너뛰고, 그렇지 않은 경우 먼저 동일한 이름을 가진 잔여 Milvus 토픽을 정리하십시오.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>다른 터미널에서:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>4단계: 전환이 완료되었는지 확인합니다.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>전환이 성공하면 <code translate="no">[mqTypeValue=kafka]</code> 로깅됩니다.</p>
<p><strong>5단계: (선택 사항) Woodpecker 데이터 정리.</strong> MinIO/S3( <code translate="no">&lt;rootPath&gt;/wp/...</code> 폴더 내, 일반적으로 <code translate="no">files/wp/...</code>)에 있는 Woodpecker 데이터와 etcd(<code translate="no">etcdctl get woodpecker --prefix</code>)에 있는 Woodpecker 메타데이터를 삭제하십시오. 나중에 Woodpecker로 다시 전환할 계획이라면, 먼저 이 파일들을 정리하십시오.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Milvus Operator 사용 시<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Kafka에서 Woodpecker로 전환(Milvus Operator)<button data-href="#Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>1단계: Milvus 인스턴스가 실행 중인지 확인합니다.</strong></p>
<p><strong>2단계: MQ 전환을 실행합니다.</strong> MixCoord 서비스는 외부에 노출되지 않으므로 MixCoord 포드 내부에서 전환 API를 실행하십시오:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>3단계: 전환이 완료되었는지 확인합니다.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>전환이 성공하면 <code translate="no">[mqTypeValue=woodpecker]</code> 로깅됩니다.</p>
<p><strong>4단계: Operator에서 MQ 유형을 업데이트합니다.</strong> Operator가 전환을 되돌리지 않도록 Operator가 관리하는 구성을 업데이트합니다. <code translate="no">change_configmap.yaml</code> 를 생성합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>5단계: (선택 사항) Kafka를 중지하고 정리합니다.</strong> <strong>내장형</strong> Kafka의 경우, Kafka 포드와 해당 PVC를 제거합니다. <strong>외부</strong> Kafka의 경우, Milvus 토픽을 정리합니다( <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> 형식).</p>
<h3 id="Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="common-anchor-header">Woodpecker에서 Kafka로 전환(Milvus Operator)<button data-href="#Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>1단계: Milvus 인스턴스가 실행 중인지 확인합니다.</strong></p>
<p><strong>2단계: 대상 Kafka 연결을 구성하고 Milvus를 다시 시작합니다.</strong> Kafka 연결을 <code translate="no">spec.config</code> 아래에 배치하고(Operator는 <code translate="no">spec.config</code> 를 <code translate="no">user.yaml</code> 로 변환합니다), MQ 유형을 설정합니다. CR을 적용하면 포드가 새로운 구성으로 재시작됩니다. SASL/SSL에 대한 자세한 내용은 <a href="/docs/ko/connect_kafka_ssl.md">SASL/SSL을 사용하여 Kafka에 연결하기를</a> 참조하십시오.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">brokerList:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;</span>
      <span class="hljs-attr">saslUsername:</span>
      <span class="hljs-attr">saslPassword:</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">SASL_SSL</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">kafka</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>모든 파드가 준비될 때까지 기다린 후, Kafka 액세스 구성이 Milvus 구성에 반영되었는지 확인하십시오.</p>
<p><strong>3단계: MQ 전환을 실행합니다.</strong></p>
<div class="alert note">
<p>대상 Kafka에 이전 구성의 Milvus 토픽이 포함되어 있지 않은지 확인하십시오. Kafka로 처음 전환하는 경우 이 참고 사항을 건너뛰고, 그렇지 않은 경우 먼저 동일한 이름을 가진 잔여 Milvus 토픽을 정리하십시오.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>4단계: 전환이 완료되었는지 확인합니다.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>전환이 성공하면 <code translate="no">[mqTypeValue=kafka]</code> 로깅됩니다.</p>
<p><strong>5단계: (선택 사항) Woodpecker 데이터 정리.</strong> MinIO/S3( <code translate="no">&lt;rootPath&gt;/wp/...</code> 폴더 내, 일반적으로 <code translate="no">files/wp/...</code>)에 있는 Woodpecker 데이터와 etcd(<code translate="no">etcdctl get woodpecker --prefix</code>)에 있는 Woodpecker 메타데이터를 삭제합니다. 나중에 Woodpecker로 다시 전환할 계획이라면, 먼저 이러한 파일을 정리하십시오.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">지원되는 시나리오<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>소스 MQ</th><th>대상 MQ</th><th>Helm</th><th>Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>내장형 Kafka</td><td>Woodpecker (MinIO)</td><td><strong>지원됨</strong></td><td><strong>지원됨</strong></td></tr>
<tr><td>외부 Kafka</td><td>Woodpecker (MinIO)</td><td><strong>지원됨</strong></td><td><strong>지원됨</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>외부 Kafka</td><td><strong>지원됨</strong></td><td><strong>지원됨</strong></td></tr>
<tr><td>Kafka</td><td>Woodpecker (로컬)</td><td><strong>지원되지만 권장하지 않음</strong> (모든 포드에 공유 파일 시스템이 필요함)</td><td><strong>지원되지 않음</strong></td></tr>
</tbody>
</table>
