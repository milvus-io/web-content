---
id: deploy_pulsar.md
title: Docker Compose 또는 Helm을 사용하여 메시지 저장소 구성
related_key: 'Pulsar, storage'
summary: Docker Compose 또는 Helm을 사용하여 메시지 저장소를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Docker Compose 또는 Helm을 사용하여 메시지 저장소 구성<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 최근 변경 내역의 로그 관리, 스트림 로그 출력 및 로그 구독 제공을 위해 Pulsar 또는 Kafka를 사용합니다. Pulsar는 기본 메시지 저장소 시스템입니다. 이 항목에서는 Docker Compose 또는 Helm을 사용하여 메시지 저장소를 구성하는 방법을 소개합니다.</p>
<p>Pulsar는 <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> 또는 K8s에서 구성할 수 있으며, Kafka는 K8s에서 구성할 수 있습니다.</p>
<div class="alert note">
<p><strong>메시지 큐 제한 사항</strong>: Milvus v2.6.19로 업그레이드할 때는 현재 사용 중인 메시지 큐를 그대로 유지해야 합니다. 업그레이드 과정에서 다른 메시지 큐 시스템으로 전환하는 것은 지원되지 않습니다. 메시지 큐 시스템 변경 기능은 향후 버전에서 제공될 예정입니다.</p>
</div>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Docker Compose를 사용하여 Pulsar 구성<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Pulsar 구성<button data-href="#1-Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>Docker Compose를 사용하여 Pulsar를 구성하려면, milvus/configs 경로에 있는 <code translate="no">milvus.yaml</code> 파일의 <code translate="no">pulsar</code> 섹션에 값을 지정하십시오.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용은 <a href="/docs/ko/v2.6.x/configure_pulsar.md">Pulsar 관련 구성을</a> 참조하십시오.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Milvus 실행<button data-href="#2-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령어를 실행하여 Pulsar 구성을 사용하는 Milvus를 시작하십시오.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">설정은 Milvus가 시작된 후에만 적용됩니다. 자세한 내용은 <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Milvus 시작을</a> 참조하십시오.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Helm을 사용하여 Pulsar 구성<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s상의 Milvus 클러스터의 경우, Milvus를 시작하는 동일한 명령어에서 Pulsar를 구성할 수 있습니다. 또는 Milvus를 시작하기 전에 <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> 저장소의 /charts/milvus 경로에 있는 ` <code translate="no">values.yml</code> ` 파일을 사용하여 Pulsar를 구성할 수도 있습니다.</p>
<p>Helm을 사용하여 Milvus를 구성하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/configure-helm.md">‘Helm 차트를 사용하여 Milvus 구성’을</a> 참조하십시오. Pulsar 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/configure_pulsar.md">‘Pulsar 관련 구성’을</a> 참조하십시오.
|</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML 파일 사용<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><code translate="no">values.yaml</code> 파일의 <code translate="no">externalConfigFiles</code> 섹션을 구성하십시오.</li>
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
<li>앞서 설명한 섹션을 구성하고 ` <code translate="no">values.yaml</code> ` 파일을 저장한 후, 다음 명령어를 실행하여 Pulsar 구성을 사용하는 Milvus를 설치하십시오.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Woodpecker-with-Helm" class="common-anchor-header">Helm을 사용하여 Woodpecker 구성<button data-href="#Configure-Woodpecker-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s상의 Milvus 클러스터의 경우, Milvus를 시작하는 동일한 명령어를 통해 Woodpecker를 구성할 수 있습니다. 또는 Milvus를 시작하기 전에 <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> 저장소의 /charts/milvus 경로에 있는 <code translate="no">values.yml</code> 파일을 사용하여 Woodpecker를 구성할 수도 있습니다.</p>
<p>Helm을 사용하여 Milvus를 구성하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/configure-helm.md">Helm 차트를 사용하여 Milvus 구성하기를</a> 참조하십시오. Woodpecker 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/use-woodpecker.md">woodpecker 관련 구성을</a> 참조하십시오.
|</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML 파일 사용<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><code translate="no">values.yaml</code> 파일의 <code translate="no">externalConfigFiles</code> 섹션을 구성하십시오.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    woodpecker:
      meta:
        type: etcd # The Type of the metadata provider. currently only support etcd.
        prefix: woodpecker # The Prefix of the metadata provider. default is woodpecker.
      client:
        segmentAppend:
          queueSize: 10000 # The size of the queue for pending messages to be sent of each log.
          maxRetries: 3 # Maximum number of retries for segment append operations.
        segmentRollingPolicy:
          maxSize: 256M # Maximum size of a segment.
          maxInterval: 10m # Maximum interval between two segments, default is 10 minutes.
          maxBlocks: 1000 # Maximum number of blocks in a segment
        auditor:
          maxInterval: 10s # Maximum interval between two auditing operations, default is 10 seconds.
      logstore:
        segmentSyncPolicy:
          maxInterval: 200ms # Maximum interval between two sync operations, default is 200 milliseconds.
          maxIntervalForLocalStorage: 10ms # Maximum interval between two sync operations local storage backend, default is 10 milliseconds.
          maxBytes: 256M # Maximum size of write buffer in bytes.
          maxEntries: 10000 # Maximum entries number of write buffer.
          maxFlushRetries: 5 # Maximum size of write buffer in bytes.
          retryInterval: 1000ms # Maximum interval between two retries. default is 1000 milliseconds.
          maxFlushSize: 2M # Maximum size of a fragment in bytes to flush.
          maxFlushThreads: 32 # Maximum number of threads to flush data
        segmentCompactionPolicy:
          maxSize: 2M # The maximum size of the merged files.
          maxParallelUploads: 4 # The maximum number of parallel upload threads for compaction.
          maxParallelReads: 8 # The maximum number of parallel read threads for compaction.
        segmentReadPolicy:
          maxBatchSize: 16M # Maximum size of a batch in bytes.
          maxFetchThreads: 32 # Maximum number of threads to fetch data.
      storage:
        type: minio # The Type of the storage provider. Valid values: [minio, local]
        rootPath: /var/lib/milvus/woodpecker # The root path of the storage provider.    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>앞서 설명한 섹션을 구성하고 ` <code translate="no">values.yaml</code> ` 파일을 저장한 후, 다음 명령어를 실행하여 Woodpecker 구성을 사용하는 Milvus를 설치하십시오.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Helm을 사용하여 Kafka 구성<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>K8s상의 Milvus 클러스터의 경우, Milvus를 시작하는 동일한 명령어에서 Kafka를 구성할 수 있습니다. 또는 Milvus를 시작하기 전에 <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> 저장소의 /charts/milvus 경로에 있는 <code translate="no">values.yml</code> 파일을 사용하여 Kafka를 구성할 수도 있습니다.</p>
<p>Helm을 사용하여 Milvus를 구성하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/configure-helm.md">Helm 차트를 사용하여 Milvus 구성하기를</a> 참조하십시오. Pulsar 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/configure_pulsar.md">Pulsar 관련 구성을</a> 참조하십시오.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">YAML 파일 사용<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Kafka를 메시지 저장 시스템으로 사용하려면 <code translate="no">values.yaml</code> 파일의 <code translate="no">externalConfigFiles</code> 섹션을 구성하십시오.</li>
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
<li>앞서 설명한 섹션을 구성하고 ` <code translate="no">values.yaml</code> ` 파일을 저장한 후, 다음 명령어를 실행하여 Kafka 구성을 사용하는 Milvus를 설치하십시오.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Helm을 사용하여 RocksMQ 구성<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 스탠드얼론은 기본적으로 RocksMQ를 메시지 저장소로 사용합니다. Helm을 사용하여 Milvus를 구성하는 자세한 단계는 <a href="/docs/ko/v2.6.x/configure-helm.md">‘Helm 차트를 사용하여 Milvus 구성’을</a> 참조하십시오. RocksMQ 관련 구성 항목에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/configure_rocksmq.md">‘RocksMQ 관련 구성’을</a> 참조하십시오.</p>
<ul>
<li><p>RocksMQ와 함께 Milvus를 시작했고 설정을 변경하려는 경우, 다음 YAML 파일에 변경된 설정을 포함하여 ` <code translate="no">helm upgrade -f</code> `를 실행할 수 있습니다.</p></li>
<li><p>Helm을 사용하여 RocksMQ 이외의 메시지 저장소를 지정해 Milvus를 독립형으로 설치한 후, 이를 다시 RocksMQ로 변경하려면 모든 컬렉션을 플러시하고 Milvus를 중지한 후, 다음 YAML 파일을 사용하여 ` <code translate="no">helm upgrade -f</code> `를 실행하십시오.</p></li>
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
<p>메시지 저장소를 변경하는 것은 권장되지 않습니다. 그래도 변경을 원하신다면, 모든 DDL 작업을 중지한 후 FlushAll API를 호출하여 모든 컬렉션을 플러시하고, 마지막으로 Milvus를 중지한 다음 메시지 저장소를 실제로 변경하십시오.</p>
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
    </button></h2><p>Docker Compose 또는 Helm을 사용하여 다른 Milvus 종속성을 구성하는 방법을 알아보세요:</p>
<ul>
<li><a href="/docs/ko/v2.6.x/deploy_s3.md">Docker Compose 또는 Helm을 사용하여 객체 스토리지 구성</a></li>
<li><a href="/docs/ko/v2.6.x/deploy_etcd.md">Docker Compose 또는 Helm을 사용하여 메타 스토어 구성</a></li>
</ul>
