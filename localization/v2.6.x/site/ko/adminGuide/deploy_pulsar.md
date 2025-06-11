---
id: deploy_pulsar.md
title: Docker Compose 또는 Helm으로 메시지 저장소 구성하기
related_key: 'Pulsar, storage'
summary: 도커 컴포즈 또는 헬름으로 메시지 저장소를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Docker Compose 또는 Helm으로 메시지 저장소 구성하기<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 최근 변경 사항의 로그 관리, 스트림 로그 출력, 로그 구독 제공을 위해 Pulsar 또는 Kafka를 사용합니다. 기본 메시지 저장 시스템은 Pulsar입니다. 이 항목에서는 Docker Compose 또는 Helm으로 메시지 저장소를 구성하는 방법을 소개합니다.</p>
<p><a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> 또는 K8에서 Pulsar를 구성하고 K8에서 Kafka를 구성할 수 있습니다.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">도커 컴포즈로 Pulsar 구성하기<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Pulsar 구성하기</h3><p>Docker Compose로 Pulsar를 구성하려면 milvus/configs 경로의 <code translate="no">milvus.yaml</code> 파일에 <code translate="no">pulsar</code> 섹션에 값을 입력합니다.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용은 <a href="/docs/ko/configure_pulsar.md">Pulsar 관련 구성을</a> 참조하세요.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Milvus 실행</h3><p>다음 명령어를 실행하여 Pulsar 설정을 사용하는 Milvus를 시작합니다.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">구성은 Milvus가 시작된 후에만 적용됩니다. 자세한 내용은 <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Milvus 시작하기를</a> 참조하세요.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">헬름으로 Pulsar 구성하기<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>K8의 Milvus 클러스터의 경우, Milvus를 시작하는 것과 동일한 명령으로 Pulsar를 구성할 수 있습니다. 또는 Milvus를 시작하기 전에 <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> 리포지토리의 /charts/milvus 경로에 있는 <code translate="no">values.yml</code> 파일을 사용하여 Pulsar를 구성할 수 있습니다.</p>
<p>헬름을 사용하여 밀버스를 구성하는 방법에 대한 자세한 내용은 <a href="/docs/ko/configure-helm.md">헬름 차트로 밀버스 구성하기를</a> 참조하세요. 펄사 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/configure_pulsar.md">펄사 관련 구성을</a> 참고한다.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML 파일 사용하기</h3><ol>
<li><code translate="no">values.yaml</code> 파일에서 <code translate="no">externalConfigFiles</code> 섹션을 구성합니다.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect direcly without proxy, should use 8080
      maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>앞의 섹션을 구성하고 <code translate="no">values.yaml</code> 파일을 저장한 후, 다음 명령어를 실행하여 Pulsar 구성을 사용하는 Milvus를 설치합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">헬름으로 Kafka 구성<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>K8의 Milvus 클러스터의 경우, Milvus를 시작하는 것과 동일한 명령으로 Kafka를 구성할 수 있습니다. 또는 Milvus를 시작하기 전에 <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> 리포지토리의 /charts/milvus 경로에 있는 <code translate="no">values.yml</code> 파일을 사용하여 Kafka를 구성할 수 있습니다.</p>
<p>헬름을 사용하여 Milvus를 구성하는 방법에 대한 자세한 내용은 <a href="/docs/ko/configure-helm.md">헬름 차트로 Milvus 구성을</a> 참조하세요. Pulsar 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/configure_pulsar.md">Pulsar 관련 구성을</a> 참고한다.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML 파일 사용하기</h3><ol>
<li>Kafka를 메시지 저장 시스템으로 사용하려면 <code translate="no">values.yaml</code> 파일에서 <code translate="no">externalConfigFiles</code> 섹션을 구성합니다.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>앞의 섹션을 구성하고 <code translate="no">values.yaml</code> 파일을 저장한 후, 다음 명령을 실행하여 Kafka 구성을 사용하는 Milvus를 설치합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">헬름으로 RocksMQ 구성하기<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 스탠드얼론은 기본 메시지 저장소로 RocksMQ를 사용합니다. 헬름으로 Milvus를 구성하는 방법에 대한 자세한 단계는 <a href="/docs/ko/configure-helm.md">헬름 차트로 Milvus 구성하기를</a> 참조하세요. RocksMQ 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/configure_rocksmq.md">RocksMQ 관련 구성을</a> 참조하세요.</p>
<ul>
<li><p>RocksMQ로 Milvus를 시작하고 설정을 변경하려면 다음 YAML 파일에서 변경된 설정으로 <code translate="no">helm upgrade -f</code> 을 실행하면 됩니다.</p></li>
<li><p>헬름을 사용하여 RocksMQ가 아닌 다른 메시지 저장소를 사용하여 Milvus를 독립형으로 설치한 경우 다시 RocksMQ로 변경하려면 모든 컬렉션을 플러시하고 Milvus를 중지한 후 다음 YAML 파일로 <code translate="no">helm upgrade -f</code> 을 실행하세요.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    rocksmq:
      # The path where the message is stored in rocksmq
      # please adjust in embedded Milvus: /tmp/milvus/rdb_data
      path: /var/lib/milvus/rdb_data
      lrucacheratio: 0.06 # rocksdb cache memory ratio
      rocksmqPageSize: 67108864 # 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq
      retentionTimeInMinutes: 4320 # 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.
      retentionSizeInMB: 8192 # 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.
      compactionInterval: 86400 # 1 day, trigger rocksdb compaction every day to remove deleted data
      # compaction compression type, only support use 0,7.
      # 0 means not compress, 7 will use zstd
      # len of types means num of rocksdb level.
      compressionTypes: [0, 0, 7, 7, 7]    
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>메시지 저장소를 변경하는 것은 권장하지 않습니다. 이 작업을 수행하려면 모든 DDL 작업을 중지한 다음 FlushAll API를 호출하여 모든 컬렉션을 플러시하고 마지막으로 메시지 저장소를 실제로 변경하기 전에 Milvus를 마지막으로 중지하세요.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">헬름으로 NATS 구성하기<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS는 RocksMQ를 대체하는 실험적인 메시지 저장소입니다. 헬름으로 밀버스를 구성하는 방법에 대한 자세한 단계는 헬름 <a href="/docs/ko/configure-helm.md">차트로 밀버스 구성하기를</a> 참조하세요. RocksMQ 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/configure_natsmq.md">NATS 관련 구성을</a> 참고한다.</p>
<ul>
<li><p>NATS로 Milvus를 시작하고 설정을 변경하려면 다음 YAML 파일에서 변경된 설정으로 <code translate="no">helm upgrade -f</code> 을 실행하면 됩니다.</p></li>
<li><p>NATS가 아닌 다른 메시지 저장소가 있는 Milvus를 독립형으로 설치한 경우 이를 NATS로 변경하려면 모든 컬렉션을 플러시하고 Milvus를 중지한 후 다음 YAML 파일로 <code translate="no">helm upgrade -f</code> 을 실행하세요.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    mq:
      type: natsmq
    natsmq:
      # server side configuration for natsmq.
      server: 
        # 4222 by default, Port for nats server listening.
        port: 4222 
        # /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.
        storeDir: /var/lib/milvus/nats 
        # (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.
        maxFileStore: 17179869184 
        # (B) 8MB by default, Maximum number of bytes in a message payload.
        maxPayload: 8388608 
        # (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.
        maxPending: 67108864 
        # (√ms) 4s by default, waiting for initialization of natsmq finished.
        initializeTimeout: 4000 
        monitor:
          # false by default, If true enable debug log messages.
          debug: false 
          # true by default, If set to false, log without timestamps.
          logTime: true 
          # no log file by default, Log file path relative to.. .
          logFile: 
          # (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.
          logSizeLimit: 0 
        retention:
          # (min) 3 days by default, Maximum age of any message in the P-channel.
          maxAge: 4320 
          # (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.
          maxBytes:
          # None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    
          maxMsgs: 
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>RocksMQ와 NATS 중 어떤 것을 선택해야 하나요?</strong></p>
<p>RockMQ는 CGO를 사용하여 RocksDB와 상호 작용하고 자체적으로 메모리를 관리하는 반면, Milvus 설치에 내장된 순수 GO NATS는 메모리 관리를 Go의 가비지 컬렉터(GC)에 위임합니다.</p>
<p>데이터 패킷이 64KB보다 작은 시나리오에서는 메모리 사용량, CPU 사용량, 응답 시간 측면에서 RocksDB가 더 나은 성능을 보입니다. 반면에 데이터 패킷이 64KB보다 큰 경우, 충분한 메모리와 이상적인 GC 스케줄링으로 응답 시간 측면에서 NATS가 우수합니다.</p>
<p>현재는 실험용으로만 NATS를 사용하는 것이 좋습니다.</p>
</div>
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
    </button></h2><p>도커 컴포즈 또는 헬름으로 다른 Milvus 종속성을 구성하는 방법을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/deploy_s3.md">도커 컴포즈 또는 헬름으로 오브젝트 스토리지 구성하기</a></li>
<li><a href="/docs/ko/deploy_etcd.md">도커 컴포즈 또는 헬름으로 메타 스토리지 구성하기</a></li>
</ul>
