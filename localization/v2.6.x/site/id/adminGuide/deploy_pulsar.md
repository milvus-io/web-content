---
id: deploy_pulsar.md
title: Mengonfigurasi Penyimpanan Pesan dengan Docker Compose atau Helm
related_key: 'Pulsar, storage'
summary: >-
  Pelajari cara mengonfigurasi penyimpanan pesan dengan Docker Compose atau
  Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Mengonfigurasi Penyimpanan Pesan dengan Docker Compose atau Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menggunakan Pulsar atau Kafka untuk mengelola log perubahan terbaru, mengeluarkan log aliran, dan menyediakan langganan log. Pulsar adalah sistem penyimpanan pesan default. Topik ini memperkenalkan cara mengonfigurasi penyimpanan pesan dengan Docker Compose atau Helm.</p>
<p>Anda dapat mengonfigurasi Pulsar dengan <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> atau pada K8 dan mengonfigurasi Kafka pada K8.</p>
<div class="alert note">
<p><strong>Keterbatasan Antrian Pesan</strong>: Saat meningkatkan ke Milvus v2.6.4, Anda harus mempertahankan pilihan antrean pesan saat ini. Beralih di antara sistem antrean pesan yang berbeda selama upgrade tidak didukung. Dukungan untuk mengubah sistem antrean pesan akan tersedia di versi mendatang.</p>
</div>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Mengonfigurasi Pulsar dengan Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Mengkonfigurasi Pulsar<button data-href="#1-Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengonfigurasi Pulsar dengan Docker Compose, berikan nilai Anda untuk bagian <code translate="no">pulsar</code> di berkas <code translate="no">milvus.yaml</code> pada jalur milvus/configs.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lihat <a href="/docs/id/configure_pulsar.md">Konfigurasi terkait Pulsar</a> untuk informasi lebih lanjut.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Menjalankan Milvus<button data-href="#2-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Jalankan perintah berikut untuk menjalankan Milvus yang menggunakan konfigurasi Pulsar.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Konfigurasi hanya berlaku setelah Milvus dijalankan. Lihat <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Memulai Milvus</a> untuk informasi lebih lanjut.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Mengkonfigurasi Pulsar dengan Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk gugus Milvus pada K8, Anda dapat mengonfigurasi Pulsar dengan perintah yang sama dengan perintah untuk memulai Milvus. Atau, Anda dapat mengkonfigurasi Pulsar menggunakan berkas <code translate="no">values.yml</code> pada jalur /charts/milvus di repositori <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> sebelum memulai Milvus.</p>
<p>Untuk detail tentang cara mengkonfigurasi Milvus menggunakan Helm, lihat <a href="/docs/id/configure-helm.md">Mengkonfigurasi Milvus dengan Grafik Helm</a>. Untuk detail mengenai item konfigurasi yang berhubungan dengan Pulsar, lihat Konfigurasi <a href="/docs/id/configure_pulsar.md">yang berhubungan dengan Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Menggunakan file YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li>Konfigurasikan bagian <code translate="no">externalConfigFiles</code> pada file <code translate="no">values.yaml</code>.</li>
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
<li>Setelah mengkonfigurasi bagian sebelumnya dan menyimpan file <code translate="no">values.yaml</code>, jalankan perintah berikut untuk menginstal Milvus yang menggunakan konfigurasi Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Woodpecker-with-Helm" class="common-anchor-header">Konfigurasi Milvus dengan Helm<button data-href="#Configure-Woodpecker-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk cluster Milvus pada K8, Anda dapat mengonfigurasi Woodpecker dengan perintah yang sama dengan perintah untuk memulai Milvus. Sebagai alternatif, Anda dapat mengkonfigurasi Woodpecker menggunakan file <code translate="no">values.yml</code> pada jalur /charts/milvus di repositori <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> sebelum memulai Milvus.</p>
<p>Untuk detail mengenai cara mengkonfigurasi Milvus menggunakan Helm, lihat <a href="/docs/id/configure-helm.md">Mengkonfigurasi Milvus dengan Grafik Helm</a>. Untuk detail mengenai item konfigurasi yang berhubungan dengan Woodpecker, lihat Konfigurasi <a href="/docs/id/use-woodpecker.md">yang berhubungan dengan Woodpecker</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Menggunakan file YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li>Konfigurasikan bagian <code translate="no">externalConfigFiles</code> di file <code translate="no">values.yaml</code>.</li>
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
<li>Setelah mengonfigurasi bagian sebelumnya dan menyimpan berkas <code translate="no">values.yaml</code>, jalankan perintah berikut untuk menginstal Milvus yang menggunakan konfigurasi Woodpecker.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Mengkonfigurasi Kafka dengan Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk cluster Milvus pada K8, Anda dapat mengonfigurasi Kafka dengan perintah yang sama dengan perintah untuk menjalankan Milvus. Atau, Anda dapat mengonfigurasi Kafka menggunakan file <code translate="no">values.yml</code> pada jalur /charts/milvus di repositori <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> sebelum memulai Milvus.</p>
<p>Untuk detail mengenai cara mengkonfigurasi Milvus menggunakan Helm, lihat <a href="/docs/id/configure-helm.md">Mengkonfigurasi Milvus dengan Grafik Helm</a>. Untuk detail mengenai item konfigurasi yang berhubungan dengan Pulsar, lihat Konfigurasi <a href="/docs/id/configure_pulsar.md">yang berhubungan dengan Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Menggunakan file YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li>Konfigurasikan bagian <code translate="no">externalConfigFiles</code> pada file <code translate="no">values.yaml</code> jika Anda ingin menggunakan Kafka sebagai sistem penyimpanan pesan.</li>
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
<li>Setelah mengkonfigurasi bagian sebelumnya dan menyimpan berkas <code translate="no">values.yaml</code>, jalankan perintah berikut untuk menginstal Milvus yang menggunakan konfigurasi Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Mengkonfigurasi RocksMQ dengan Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mandiri menggunakan RocksMQ sebagai penyimpanan pesan default. Untuk langkah-langkah terperinci tentang cara mengonfigurasi Milvus dengan Helm, lihat <a href="/docs/id/configure-helm.md">Mengonfigurasi Milvus dengan Grafik Helm</a>. Untuk detail tentang item konfigurasi yang berhubungan dengan RocksMQ, lihat Konfigurasi <a href="/docs/id/configure_rocksmq.md">yang berhubungan dengan RocksMQ</a>.</p>
<ul>
<li><p>Jika Anda memulai Milvus dengan RocksMQ dan ingin mengubah pengaturannya, Anda dapat menjalankan <code translate="no">helm upgrade -f</code> dengan pengaturan yang telah diubah pada file YAML berikut ini.</p></li>
<li><p>Jika Anda telah menginstal Milvus mandiri menggunakan Helm dengan penyimpanan pesan selain RocksMQ dan ingin mengubahnya kembali ke RocksMQ, jalankan <code translate="no">helm upgrade -f</code> dengan berkas YAML berikut setelah Anda telah mem-flush semua koleksi dan menghentikan Milvus.</p></li>
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
<p>Mengubah penyimpanan pesan tidak disarankan. Jika Anda ingin melakukan ini, hentikan semua operasi DDL, lalu panggil FlushAll API untuk mem-flush semua koleksi, dan akhirnya hentikan Milvus sebelum Anda benar-benar mengubah penyimpanan pesan.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Mengkonfigurasi NATS dengan Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS adalah alternatif penyimpanan pesan eksperimental untuk RocksMQ. Untuk langkah rinci tentang bagaimana mengkonfigurasi Milvus dengan Helm, lihat <a href="/docs/id/configure-helm.md">Mengkonfigurasi Milvus dengan Grafik Helm</a>. Untuk detail tentang item konfigurasi yang berhubungan dengan RocksMQ, lihat Konfigurasi <a href="/docs/id/configure_natsmq.md">yang berhubungan dengan NATS</a>.</p>
<ul>
<li><p>Jika Anda memulai Milvus dengan NATS dan ingin mengubah pengaturannya, Anda dapat menjalankan <code translate="no">helm upgrade -f</code> dengan pengaturan yang telah diubah pada file YAML berikut ini.</p></li>
<li><p>Jika Anda telah menginstal Milvus mandiri dengan penyimpanan pesan selain NATS dan ingin mengubahnya menjadi NATS, jalankan <code translate="no">helm upgrade -f</code> dengan berkas YAML berikut setelah Anda mem-flush semua koleksi dan menghentikan Milvus.</p></li>
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
<p><strong>Memilih antara RockMQ dan NATS?</strong></p>
<p>RockMQ menggunakan CGO untuk berinteraksi dengan RocksDB dan mengelola memori dengan sendirinya, sementara NATS murni-GO yang tertanam dalam instalasi Milvus mendelegasikan pengelolaan memorinya ke pengumpul sampah Go (GC).</p>
<p>Dalam skenario di mana paket data lebih kecil dari 64 kb, RocksDB mengungguli dalam hal penggunaan memori, penggunaan CPU, dan waktu respons. Di sisi lain, jika paket data lebih besar dari 64 kb, NATS unggul dalam hal waktu respons dengan memori yang cukup dan penjadwalan GC yang ideal.</p>
<p>Saat ini, Anda disarankan untuk menggunakan NATS hanya untuk eksperimen.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Pelajari cara mengonfigurasi dependensi Milvus lainnya dengan Docker Compose atau Helm:</p>
<ul>
<li><a href="/docs/id/deploy_s3.md">Mengonfigurasi Penyimpanan Objek dengan Docker Compose atau Helm</a></li>
<li><a href="/docs/id/deploy_etcd.md">Mengonfigurasi Penyimpanan Meta dengan Docker Compose atau Helm</a></li>
</ul>
