---
id: message_storage_operator.md
title: Mengonfigurasi Penyimpanan Pesan dengan Operator Milvus
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Pelajari cara mengonfigurasi penyimpanan pesan dengan Milvus Operator.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Mengonfigurasi Penyimpanan Pesan dengan Operator Milvus<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menggunakan RocksMQ, Pulsar, atau Kafka untuk mengelola log perubahan terbaru, mengeluarkan log aliran, dan menyediakan langganan log. Topik ini memperkenalkan cara mengonfigurasi ketergantungan penyimpanan pesan ketika Anda menginstal Milvus dengan Milvus Operator. Untuk detail lebih lanjut, lihat <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Mengonfigurasi Penyimpanan Pesan dengan Milvus Operator</a> di repositori Milvus Operator.</p>
<p>Topik ini mengasumsikan bahwa Anda telah men-deploy Milvus Operator.</p>
<div class="alert note">Lihat <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Menyebarkan Operator Milvus</a> untuk informasi lebih lanjut. </div>
<p>Anda perlu menentukan file konfigurasi untuk menggunakan Milvus Operator untuk memulai cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda hanya perlu mengedit template kode di <code translate="no">milvus_cluster_default.yaml</code> untuk mengonfigurasi dependensi pihak ketiga. Bagian berikut ini memperkenalkan cara mengonfigurasi penyimpanan objek, etcd, dan Pulsar.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Sebelum Anda mulai<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel di bawah ini menunjukkan apakah RocksMQ, NATS, Pulsar, dan Kafka didukung dalam mode mandiri dan klaster Milvus.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Mode mandiri</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Mode cluster</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Ada juga batasan lain untuk menentukan penyimpanan pesan:</p>
<ul>
<li>Hanya satu penyimpanan pesan untuk satu instance Milvus yang didukung. Namun kami masih memiliki kompatibilitas ke belakang dengan beberapa penyimpanan pesan yang ditetapkan untuk satu instance. Prioritasnya adalah sebagai berikut:<ul>
<li>mode mandiri:  RocksMQ (default) &gt; Pulsar &gt; Kafka</li>
<li>mode cluster: Pulsar (default) &gt; Kafka</li>
<li>Nats yang diperkenalkan di 2.3 tidak berpartisipasi dalam aturan prioritas ini untuk kompatibilitas ke belakang.</li>
</ul></li>
<li>Penyimpanan pesan tidak dapat diubah ketika sistem Milvus sedang berjalan.</li>
<li>Hanya versi Kafka 2.x atau 3.x yang didukung.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Mengkonfigurasi RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ adalah penyimpanan pesan default pada Milvus mandiri.</p>
<div class="alert note">
<p>Saat ini, Anda hanya dapat mengonfigurasi RocksMQ sebagai penyimpanan pesan untuk Milvus standalone dengan Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan RocksMQ.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: milvus
spec:
  mode: standalone
  dependencies:
    msgStreamType: rocksmq
    rocksmq:
      persistence:
        enabled: <span class="hljs-literal">true</span>
        pvcDeletion: <span class="hljs-literal">true</span>
        persistentVolumeClaim:
          spec:
            accessModes: [<span class="hljs-string">&quot;ReadWriteOnce&quot;</span>]
            storageClassName: <span class="hljs-string">&quot;local-path&quot;</span>  <span class="hljs-comment"># Specify your storage class</span>
            resources:
              requests:
                storage: 10Gi  <span class="hljs-comment"># Specify your desired storage size</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h5 id="Key-configuration-options" class="common-anchor-header">Opsi konfigurasi utama:</h5><ul>
<li><code translate="no">msgStreamType</code>: rocksmq: Secara eksplisit menetapkan RocksMQ sebagai antrean pesan</li>
<li><code translate="no">persistence.enabled</code>: Mengaktifkan penyimpanan persisten untuk data RocksMQ</li>
<li><code translate="no">persistence.pvcDeletion</code>: Jika benar, PVC akan dihapus ketika instans Milvus dihapus</li>
<li><code translate="no">persistentVolumeClaim.spec</code>: Spesifikasi PVC Kubernetes standar</li>
<li><code translate="no">accessModes</code>: Biasanya <code translate="no">ReadWriteOnce</code> untuk penyimpanan blok</li>
<li><code translate="no">storageClassName</code>: Kelas penyimpanan cluster Anda</li>
<li><code translate="no">storage</code>: Ukuran volume persisten</li>
</ul>
<h2 id="Configure-NATS" class="common-anchor-header">Mengkonfigurasi NATS<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS adalah penyimpanan pesan alternatif untuk NATS.</p>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan NATS.</p>
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
<p>Untuk memigrasikan penyimpanan pesan dari RocksMQ ke NATS, lakukan hal berikut:</p>
<ol>
<li><p>Hentikan semua operasi DDL.</p></li>
<li><p>Panggil API FlushAll dan kemudian hentikan Milvus setelah panggilan API selesai dieksekusi.</p></li>
<li><p>Ubah <code translate="no">msgStreamType</code> menjadi <code translate="no">natsmq</code> dan lakukan perubahan yang diperlukan pada pengaturan NATS di <code translate="no">spec.dependencies.natsmq</code>.</p></li>
<li><p>Jalankan Milvus lagi dan periksa apakah:</p>
<ul>
<li>Entri log yang bertuliskan <code translate="no">mqType=natsmq</code> ada pada log.</li>
<li>Direktori bernama <code translate="no">jetstream</code> ada di direktori yang ditentukan di <code translate="no">spec.dependencies.natsmq.server.storeDir</code>.</li>
</ul></li>
<li><p>(Opsional) Cadangkan dan bersihkan berkas data dalam direktori penyimpanan RocksMQ.</p></li>
</ol>
<div class="alert note">
<p><strong>Pilih antara RocksMQ dan NATS?</strong></p>
<p>RockMQ menggunakan CGO untuk berinteraksi dengan RocksDB dan mengelola memori dengan sendirinya, sementara NATS murni-GO yang tertanam dalam instalasi Milvus mendelegasikan manajemen memorinya ke pengumpul sampah Go (GC).</p>
<p>Dalam skenario di mana paket data lebih kecil dari 64 kb, RocksDB mengungguli dalam hal penggunaan memori, penggunaan CPU, dan waktu respons. Di sisi lain, jika paket data lebih besar dari 64 kb, NATS unggul dalam hal waktu respons dengan memori yang cukup dan penjadwalan GC yang ideal.</p>
<p>Saat ini, Anda disarankan untuk menggunakan NATS hanya untuk eksperimen.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Mengkonfigurasi Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar mengelola log perubahan terbaru, mengeluarkan log aliran, dan menyediakan langganan log. Mengkonfigurasi Pulsar untuk penyimpanan pesan didukung pada Milvus mandiri dan Milvus cluster. Namun, dengan Milvus Operator, Anda hanya dapat mengonfigurasi Pulsar sebagai penyimpanan pesan untuk Milvus cluster. Tambahkan bidang yang diperlukan di bawah <code translate="no">spec.dependencies.pulsar</code> untuk mengkonfigurasi Pulsar.</p>
<p><code translate="no">pulsar</code> Milvus Operator mendukung <code translate="no">external</code> dan <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Pulsar eksternal</h3><p><code translate="no">external</code> menunjukkan penggunaan layanan Pulsar eksternal. Bidang yang digunakan untuk mengkonfigurasi layanan Pulsar eksternal meliputi:</p>
<ul>
<li><code translate="no">external</code>:  Nilai <code translate="no">true</code> menunjukkan bahwa Milvus menggunakan layanan Pulsar eksternal.</li>
<li><code translate="no">endpoints</code>: Titik akhir Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan Pulsar eksternal.</p>
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
<h3 id="Internal-Pulsar" class="common-anchor-header">Pulsar internal</h3><p><code translate="no">inCluster</code> menunjukkan ketika kluster Milvus dimulai, layanan Pulsar dimulai secara otomatis di dalam kluster.</p>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan Pulsar internal.</p>
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
<div class="alert note">Contoh ini menentukan jumlah replika setiap komponen Pulsar, sumber daya komputasi Pulsar BookKeeper, dan konfigurasi lainnya.</div>
<div class="alert note">Temukan item konfigurasi lengkap untuk mengonfigurasi layanan Pulsar internal di <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Tambahkan item konfigurasi sesuai kebutuhan di <code translate="no">pulsar.inCluster.values</code> seperti yang ditunjukkan pada contoh sebelumnya.</div>
<p>Dengan asumsi bahwa berkas konfigurasi bernama <code translate="no">milvuscluster.yaml</code>, jalankan perintah berikut untuk menerapkan konfigurasi.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Mengkonfigurasi Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar adalah penyimpanan pesan default dalam cluster Milvus. Jika Anda ingin menggunakan Kafka, tambahkan bidang opsional <code translate="no">msgStreamType</code> untuk mengkonfigurasi Kafka.</p>
<p><code translate="no">kafka</code> Kafka mendukung <code translate="no">external</code> dan <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Kafka eksternal</h3><p><code translate="no">external</code> mengindikasikan penggunaan layanan Kafka eksternal.</p>
<p>Bidang yang digunakan untuk mengonfigurasi layanan Kafka eksternal meliputi:</p>
<ul>
<li><code translate="no">external</code>: Nilai <code translate="no">true</code> menunjukkan bahwa Milvus menggunakan layanan Kafka eksternal.</li>
<li><code translate="no">brokerList</code>: Daftar broker yang akan dikirimi pesan.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan Kafka eksternal.</p>
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
<p>Konfigurasi SASL didukung dalam operator v0.8.5 atau versi yang lebih tinggi.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Kafka internal</h3><p><code translate="no">inCluster</code> menunjukkan ketika cluster Milvus dimulai, layanan Kafka dimulai secara otomatis dalam cluster.</p>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan Kafka internal.</p>
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
<p>Temukan item konfigurasi lengkap untuk mengonfigurasi layanan Kafka internal <a href="https://artifacthub.io/packages/helm/bitnami/kafka">di sini</a>. Tambahkan item konfigurasi sesuai kebutuhan di <code translate="no">kafka.inCluster.values</code>.</p>
<p>Dengan asumsi bahwa berkas konfigurasi bernama <code translate="no">milvuscluster.yaml</code>, jalankan perintah berikut untuk menerapkan konfigurasi.</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Pelajari cara mengonfigurasi dependensi Milvus lainnya dengan Milvus Operator:</p>
<ul>
<li><a href="/docs/id/object_storage_operator.md">Mengonfigurasi Penyimpanan Objek dengan Milvus Operator</a></li>
<li><a href="/docs/id/meta_storage_operator.md">Mengkonfigurasi Meta Storage dengan Milvus Operator</a></li>
</ul>
