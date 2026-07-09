---
id: switch-kafka-woodpecker.md
title: Beralih antara Kafka dan Woodpecker
summary: >-
  Beralihkan antrian pesan pada klaster Milvus antara Kafka dan Woodpecker,
  menggunakan Helm atau Milvus Operator.
---
<h1 id="Switch-between-Kafka-and-Woodpecker" class="common-anchor-header">Beralih antara Kafka dan Woodpecker<button data-href="#Switch-between-Kafka-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini menjelaskan cara mengganti antrian pesan (MQ) pada <strong>kluster Milvus</strong> antara <strong>Kafka</strong> (bawaan atau eksternal) dan <strong>Woodpecker</strong> (backend MinIO), baik untuk arah masuk maupun keluar. Untuk alur kerja umum dan prasyarat, lihat <a href="/docs/id/switch-mq-type.md">Mengganti Jenis MQ</a>.</p>
<div class="alert note">
<p><strong>Prasyarat:</strong> Fitur Beralih MQ tersedia di <strong>Milvus 3.0 dan versi selanjutnya</strong>. Perbarui instance Milvus Anda ke Milvus 3.0 atau versi selanjutnya sebelum memulai — fitur ini tidak tersedia pada versi sebelumnya.</p>
</div>
<div class="alert warning">
<p>Mengganti antrian pesan adalah <strong>operasi berisiko tinggi</strong>. Pilih bagian yang sesuai dengan metode penyebaran <strong>Anda</strong> — <strong>Dengan Helm</strong> atau <strong>Dengan Milvus Operator</strong> — dan ikuti langkah-langkahnya dari atas ke bawah. Jangan mencampurkan perintah Helm dan Operator.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Dengan Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Helm" class="common-anchor-header">Beralih dari Kafka ke Woodpecker (Helm)<button data-href="#Switch-from-Kafka-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Langkah 1: Pastikan instance Milvus sedang berjalan.</strong> Pastikan kluster Milvus Anda berjalan dengan baik — misalnya, dengan membuat koleksi uji, memasukkan data, dan menjalankan kueri.</p>
<p><strong>Langkah 2: Jalankan peralihan MQ.</strong> Buka antarmuka manajemen MixCoord, lalu panggil API peralihan:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>Di terminal lain:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Langkah 3: Pastikan proses peralihan telah selesai.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Peralihan yang berhasil akan mencatat pesan " <code translate="no">[mqTypeValue=woodpecker]</code>".</p>
<p><strong>Langkah 4: (Opsional) Hentikan Kafka dan bersihkan.</strong> Untuk Kafka <strong>bawaan</strong>, hapus pod Kafka dan PVC-nya. Untuk Kafka <strong>eksternal</strong>, bersihkan topik Milvus di instance Kafka eksternal — topik tersebut mengikuti format <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>.</p>
<div class="alert note">
<p>Jika Anda berencana untuk beralih kembali ke Kafka nanti, bersihkan data/topik terlebih dahulu untuk menghindari konflik.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Kafka-Helm" class="common-anchor-header">Beralih dari Woodpecker ke Kafka (Helm)<button data-href="#Switch-from-Woodpecker-to-Kafka-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Langkah 1: Pastikan instance Milvus sedang berjalan.</strong></p>
<p><strong>Langkah 2: Konfigurasikan koneksi Kafka tujuan dan mulai ulang Milvus.</strong> Proses peralihan ini memerlukan Milvus untuk sudah mengetahui koneksi Kafka, jadi tuliskan ke <code translate="no">user.yaml</code> melalui <code translate="no">extraConfigFiles</code> dan terapkan dengan <code translate="no">helm upgrade</code> (yang akan me-roll pod-pod tersebut). <code translate="no">streaming.enabled=true</code> diperlukan untuk fitur Switch MQ. Untuk detail SASL/SSL, lihat <a href="/docs/id/connect_kafka_ssl.md">Menghubungkan ke Kafka dengan SASL/SSL</a>.</p>
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
<p>Tunggu hingga semua pod siap, lalu pastikan konfigurasi akses Kafka telah diterapkan ke dalam konfigurasi Milvus.</p>
<p><strong>Langkah 3: Jalankan peralihan MQ.</strong></p>
<div class="alert note">
<p>Pastikan Kafka tujuan tidak berisi topik Milvus dari konfigurasi sebelumnya. Jika ini adalah peralihan pertama Anda ke Kafka, abaikan catatan ini; jika tidak, bersihkan terlebih dahulu topik Milvus sisa dengan nama yang sama.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>Di terminal lain:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Langkah 4: Verifikasi bahwa peralihan telah selesai.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Peralihan yang berhasil akan mencatat pesan " <code translate="no">[mqTypeValue=kafka]</code>".</p>
<p><strong>Langkah 5: (Opsional) Bersihkan data Woodpecker.</strong> Hapus data Woodpecker di MinIO/S3 (di bawah <code translate="no">&lt;rootPath&gt;/wp/...</code>, biasanya <code translate="no">files/wp/...</code>) dan metadata Woodpecker di etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Jika Anda berencana untuk kembali ke Woodpecker nanti, bersihkan file-file ini terlebih dahulu.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Dengan Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Beralih dari Kafka ke Woodpecker (Milvus Operator)<button data-href="#Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Langkah 1: Pastikan instance Milvus sedang berjalan.</strong></p>
<p><strong>Langkah 2: Jalankan peralihan MQ.</strong> Layanan MixCoord tidak terpapar, jadi jalankan API peralihan dari dalam pod MixCoord:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Langkah 3: Pastikan proses peralihan telah selesai.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Peralihan yang berhasil akan mencatat <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<p><strong>Langkah 4: Perbarui jenis MQ di Operator.</strong> Perbarui konfigurasi yang dikelola Operator agar Operator tidak membatalkan peralihan tersebut. Buat <code translate="no">change_configmap.yaml</code>:</p>
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
<p><strong>Langkah 5: (Opsional) Hentikan Kafka dan bersihkan.</strong> Untuk Kafka <strong>bawaan</strong>, hapus pod Kafka dan PVC-nya. Untuk Kafka <strong>eksternal</strong>, bersihkan topik Milvus (format <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<h3 id="Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="common-anchor-header">Beralih dari Woodpecker ke Kafka (Milvus Operator)<button data-href="#Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Langkah 1: Pastikan instance Milvus sedang berjalan.</strong></p>
<p><strong>Langkah 2: Konfigurasikan koneksi Kafka tujuan dan mulai ulang Milvus.</strong> Tempatkan koneksi Kafka di bawah <code translate="no">spec.config</code> (Operator mengubah <code translate="no">spec.config</code> menjadi <code translate="no">user.yaml</code>) dan atur jenis MQ; penerapan CR akan memperbarui pod dengan konfigurasi baru. Untuk detail SASL/SSL, lihat <a href="/docs/id/connect_kafka_ssl.md">Menghubungkan ke Kafka dengan SASL/SSL</a>.</p>
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
<p>Tunggu hingga semua pod siap, lalu pastikan konfigurasi akses Kafka telah diterapkan ke konfigurasi Milvus.</p>
<p><strong>Langkah 3: Jalankan peralihan MQ.</strong></p>
<div class="alert note">
<p>Pastikan Kafka tujuan tidak berisi topik Milvus dari konfigurasi sebelumnya. Jika ini adalah peralihan pertama Anda ke Kafka, lewati catatan ini; jika tidak, bersihkan terlebih dahulu topik Milvus sisa dengan nama yang sama.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Langkah 4: Verifikasi bahwa peralihan telah selesai.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Peralihan yang berhasil akan mencatat pesan " <code translate="no">[mqTypeValue=kafka]</code>".</p>
<p><strong>Langkah 5: (Opsional) Bersihkan data Woodpecker.</strong> Hapus data Woodpecker di MinIO/S3 (di bawah <code translate="no">&lt;rootPath&gt;/wp/...</code>, biasanya <code translate="no">files/wp/...</code>) dan metadata Woodpecker di etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Jika Anda berencana beralih kembali ke Woodpecker nanti, bersihkan file-file ini terlebih dahulu.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Skenario yang didukung<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>MQ Sumber</th><th>MQ Tujuan</th><th>Helm</th><th>Operator Milvus</th></tr>
</thead>
<tbody>
<tr><td>Kafka bawaan</td><td>Woodpecker (MinIO)</td><td><strong>Didukung</strong></td><td><strong>Didukung</strong></td></tr>
<tr><td>Kafka Eksternal</td><td>Woodpecker (MinIO)</td><td><strong>Didukung</strong></td><td><strong>Didukung</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka Eksternal</td><td><strong>Didukung</strong></td><td><strong>Didukung</strong></td></tr>
<tr><td>Kafka</td><td>Woodpecker (lokal)</td><td><strong>Didukung tetapi tidak direkomendasikan</strong> (semua pod memerlukan sistem file bersama)</td><td><strong>Tidak didukung</strong></td></tr>
</tbody>
</table>
