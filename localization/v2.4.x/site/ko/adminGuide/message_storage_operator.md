---
id: message_storage_operator.md
title: 밀버스 오퍼레이터로 메시지 저장소 구성하기
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 밀버스 오퍼레이터로 메시지 저장소를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Milvus 운영자로 메시지 저장소 구성하기<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 최근 변경 사항 로그 관리, 스트림 로그 출력, 로그 구독 제공을 위해 RocksMQ, Pulsar 또는 Kafka를 사용합니다. 이 항목에서는 Milvus Operator와 함께 Milvus를 설치할 때 메시지 저장소 종속성을 구성하는 방법을 소개합니다. 자세한 내용은 Milvus <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Operator</a> 리포지토리에서 <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Milvus Operator로 메시지 저장소 구성을</a> 참조하세요.</p>
<p>이 항목에서는 Milvus Operator를 배포했다고 가정합니다.</p>
<div class="alert note">자세한 내용은 <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus 운영자 배포하기를</a> 참조하세요. </div>
<p>밀버스 오퍼레이터를 사용하여 밀버스 클러스터를 시작하려면 구성 파일을 지정해야 합니다.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>타사 종속성을 구성하려면 <code translate="no">milvus_cluster_default.yaml</code> 에서 코드 템플릿을 편집하기만 하면 됩니다. 다음 섹션에서는 각각 개체 스토리지, etcd 및 Pulsar를 구성하는 방법을 소개합니다.</p>
<h2 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 표는 Milvus 독립 실행형 및 클러스터 모드에서 RocksMQ, NATS, Pulsar 및 Kafka가 지원되는지 여부를 보여줍니다.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">독립 실행형 모드</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">클러스터 모드</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>메시지 저장소를 지정하는 데에는 다른 제한 사항도 있습니다:</p>
<ul>
<li>하나의 Milvus 인스턴스에 대해 하나의 메시지 저장소만 지원됩니다. 그러나 하나의 인스턴스에 대해 여러 개의 메시지 저장소를 설정할 수 있는 이전 버전과의 호환성은 여전히 유지됩니다. 우선순위는 다음과 같습니다:<ul>
<li>독립형 모드:  RocksMQ(기본값) &gt; Pulsar &gt; Kafka</li>
<li>클러스터 모드: Pulsar(기본값) &gt; Kafka</li>
<li>2.3에 도입된 Nats는 이전 버전과의 호환성을 위해 이러한 우선순위 규칙에 포함되지 않습니다.</li>
</ul></li>
<li>Milvus 시스템이 실행되는 동안에는 메시지 저장소를 변경할 수 없습니다.</li>
<li>Kafka 2.x 또는 3.x 버전만 지원됩니다.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">RocksMQ 구성<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ는 Milvus 스탠드얼론의 기본 메시지 저장소입니다.</p>
<div class="alert note">
<p>현재 Milvus Operator를 통해서만 Milvus 스탠드얼론의 메시지 저장소로 RocksMQ를 구성할 수 있습니다.</p>
</div>
<h4 id="Example" class="common-anchor-header">예제</h4><p>다음 예는 RocksMQ 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-NATS" class="common-anchor-header">NATS 구성하기<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS는 NATS의 대체 메시지 저장소입니다.</p>
<h4 id="Example" class="common-anchor-header">예제</h4><p>다음 예는 NATS 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: 
    msgStreamType: <span class="hljs-string">&#x27;natsmq&#x27;</span>
    natsmq:
      <span class="hljs-comment"># server side configuration for natsmq.</span>
      server: 
        <span class="hljs-comment"># 4222 by default, Port for nats server listening.</span>
        port: <span class="hljs-number">4222</span> 
        <span class="hljs-comment"># /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.</span>
        storeDir: /var/lib/milvus/nats 
        <span class="hljs-comment"># (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.</span>
        maxFileStore: <span class="hljs-number">17179869184</span> 
        <span class="hljs-comment"># (B) 8MB by default, Maximum number of bytes in a message payload.</span>
        maxPayload: <span class="hljs-number">8388608</span> 
        <span class="hljs-comment"># (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.</span>
        maxPending: <span class="hljs-number">67108864</span> 
        <span class="hljs-comment"># (√ms) 4s by default, waiting for initialization of natsmq finished.</span>
        initializeTimeout: <span class="hljs-number">4000</span> 
        monitor:
          <span class="hljs-comment"># false by default, If true enable debug log messages.</span>
          debug: false 
          <span class="hljs-comment"># true by default, If set to false, log without timestamps.</span>
          logTime: true 
          <span class="hljs-comment"># no log file by default, Log file path relative to.. .</span>
          logFile: 
          <span class="hljs-comment"># (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.</span>
          logSizeLimit: <span class="hljs-number">0</span> 
        retention:
          <span class="hljs-comment"># (min) 3 days by default, Maximum age of any message in the P-channel.</span>
          maxAge: <span class="hljs-number">4320</span> 
          <span class="hljs-comment"># (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.</span>
          maxBytes:
          <span class="hljs-comment"># None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    </span>
          maxMsgs: 
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>메시지 저장소를 RocksMQ에서 NATS로 마이그레이션하려면 다음과 같이 하세요:</p>
<ol>
<li><p>모든 DDL 작업을 중지합니다.</p></li>
<li><p>FlushAll API를 호출한 다음 API 호출 실행이 완료되면 Milvus를 중지합니다.</p></li>
<li><p><code translate="no">msgStreamType</code> 을 <code translate="no">natsmq</code> 으로 변경하고 <code translate="no">spec.dependencies.natsmq</code> 에서 NATS 설정에 필요한 사항을 변경합니다.</p></li>
<li><p>Milvus를 다시 시작하고 여부를 확인합니다:</p>
<ul>
<li><code translate="no">mqType=natsmq</code> 이라는 로그 항목이 로그에 존재합니다.</li>
<li><code translate="no">spec.dependencies.natsmq.server.storeDir</code> 에 지정된 디렉터리에 <code translate="no">jetstream</code> 라는 디렉터리가 존재합니다.</li>
</ul></li>
<li><p>(선택 사항) RocksMQ 스토리지 디렉토리에 있는 데이터 파일을 백업하고 정리합니다.</p></li>
</ol>
<div class="alert note">
<p><strong>RocksMQ와 NATS 중 어떤 것을 선택해야 하나요?</strong></p>
<p>RockMQ는 CGO를 사용하여 RocksDB와 상호 작용하고 자체적으로 메모리를 관리하는 반면, Milvus 설치에 내장된 순수-GO NATS는 메모리 관리를 Go의 가비지 컬렉터(GC)에 위임합니다.</p>
<p>데이터 패킷이 64KB보다 작은 시나리오에서는 메모리 사용량, CPU 사용량, 응답 시간 측면에서 RocksDB가 더 나은 성능을 보입니다. 반면 데이터 패킷이 64KB보다 큰 경우, 충분한 메모리와 이상적인 GC 스케줄링으로 응답 시간 측면에서 NATS가 우수합니다.</p>
<p>현재 NATS는 실험용으로만 사용하는 것이 좋습니다.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Pulsar 구성<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar는 최근 변경 사항의 로그를 관리하고, 스트림 로그를 출력하며, 로그 구독을 제공합니다. 메시지 저장을 위한 Pulsar 구성은 Milvus 독립형과 Milvus 클러스터 모두에서 지원됩니다. 그러나 Milvus Operator를 사용할 때는 Milvus 클러스터의 메시지 저장소로만 Pulsar를 구성할 수 있습니다. <code translate="no">spec.dependencies.pulsar</code> 에서 필수 필드를 추가하여 Pulsar를 구성하세요.</p>
<p><code translate="no">pulsar</code> <code translate="no">external</code> 및 <code translate="no">inCluster</code> 을 지원합니다.</p>
<h3 id="External-Pulsar" class="common-anchor-header">외부 펄서</h3><p><code translate="no">external</code> 는 외부 Pulsar 서비스를 사용함을 나타냅니다. 외부 Pulsar 서비스를 구성하는 데 사용되는 필드는 다음과 같습니다:</p>
<ul>
<li><code translate="no">external</code>:  <code translate="no">true</code> 값은 Milvus가 외부 Pulsar 서비스를 사용함을 나타냅니다.</li>
<li><code translate="no">endpoints</code>: Pulsar의 엔드포인트입니다.</li>
</ul>
<h4 id="Example" class="common-anchor-header">예제</h4><p>다음은 외부 Pulsar 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    pulsar: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">6650</span>
  components: {}
  config: {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">내부 펄서</h3><p><code translate="no">inCluster</code> 는 Milvus 클러스터가 시작되면 클러스터에서 Pulsar 서비스가 자동으로 시작됨을 나타냅니다.</p>
<h4 id="Example" class="common-anchor-header">예제</h4><p>다음은 내부 Pulsar 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      inCluster:
        values:
          components:
            autorecovery: <span class="hljs-literal">false</span>
          zookeeper:
            replicaCount: 1
          bookkeeper:
            replicaCount: 1
            resoureces:
              <span class="hljs-built_in">limit</span>:
                cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
          broker:
            replicaCount: 1
            configData:
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              autoSkipNonRecoverableData: <span class="hljs-string">&quot;true&quot;</span>
              managedLedgerDefaultEnsembleSize: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultWriteQuorum: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultAckQuorum: <span class="hljs-string">&quot;1&quot;</span>
          proxy:
            replicaCount: 1
  components: {}
  config: {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">이 예에서는 Pulsar의 각 구성 요소의 복제본 수, Pulsar BookKeeper의 컴퓨팅 리소스 및 기타 구성을 지정합니다.</div>
<div class="alert note">내부 Pulsar 서비스를 구성하기 위한 전체 구성 항목은 <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml에서</a> 찾을 수 있습니다. 앞의 예와 같이 <code translate="no">pulsar.inCluster.values</code> 아래에 필요에 따라 구성 항목을 추가합니다.</div>
<p>구성 파일의 이름이 <code translate="no">milvuscluster.yaml</code> 이라고 가정하고 다음 명령을 실행하여 구성을 적용합니다.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Kafka 구성<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar는 Milvus 클러스터의 기본 메시지 저장소입니다. Kafka를 사용하려면 선택적 필드 <code translate="no">msgStreamType</code> 를 추가하여 Kafka를 구성합니다.</p>
<p><code translate="no">kafka</code> <code translate="no">external</code> 및 <code translate="no">inCluster</code> 을 지원합니다.</p>
<h3 id="External-Kafka" class="common-anchor-header">외부 카프카</h3><p><code translate="no">external</code> 는 외부 Kafka 서비스를 사용함을 나타냅니다.</p>
<p>외부 Kafka 서비스를 구성하는 데 사용되는 필드는 다음과 같습니다:</p>
<ul>
<li><code translate="no">external</code>: <code translate="no">true</code> 값은 Milvus가 외부 Kafka 서비스를 사용함을 나타냅니다.</li>
<li><code translate="no">brokerList</code>: 메시지를 전송할 브로커 목록입니다.</li>
</ul>
<h4 id="Example" class="common-anchor-header">예제</h4><p>다음은 외부 Kafka 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  config:
    kafka:
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      securityProtocol: PLAINTEXT
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      saslMechanisms: PLAIN
      saslUsername: <span class="hljs-string">&quot;&quot;</span>
      saslPassword: <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      external: true
      brokerList: 
        - <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        - <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>SASL 구성은 운영자 v0.8.5 이상 버전에서 지원됩니다.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">내부 카프카</h3><p><code translate="no">inCluster</code> 는 Milvus 클러스터가 시작되면 클러스터에서 Kafka 서비스가 자동으로 시작됨을 나타냅니다.</p>
<h4 id="Example" class="common-anchor-header">예제</h4><p>다음 예는 내부 Kafka 서비스를 구성하는 예제입니다.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec: 
  dependencies:
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      inCluster: 
        values: {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>내부 Kafka 서비스 구성을 위한 전체 구성 항목은 <a href="https://artifacthub.io/packages/helm/bitnami/kafka">여기에서</a> 확인할 수 있습니다. <code translate="no">kafka.inCluster.values</code> 에서 필요에 따라 구성 항목을 추가합니다.</p>
<p>구성 파일의 이름이 <code translate="no">milvuscluster.yaml</code> 이라고 가정하고 다음 명령을 실행하여 구성을 적용합니다.</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
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
    </button></h2><p>Milvus Operator로 다른 Milvus 종속 요소를 구성하는 방법을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/object_storage_operator.md">Milvus 오퍼레이터로 오브젝트 스토리지 구성하기</a></li>
<li><a href="/docs/ko/v2.4.x/meta_storage_operator.md">Milvus 오퍼레이터로 메타 스토리지 구성하기</a></li>
</ul>
