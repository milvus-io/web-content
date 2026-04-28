---
id: deploy-cdc-server.md
order: 2
summary: >-
  Panduan ini menyediakan proses langkah demi langkah untuk menerapkan server
  Milvus-CDC.
title: Menyebarkan Server CDC
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">Menyebarkan Server CDC<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menyediakan proses langkah demi langkah untuk menerapkan server Milvus-CDC.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Pastikan kondisi berikut ini terpenuhi sebelum menggunakan server Milvus-CDC:</p>
<ul>
<li><p><strong>Instance Milvus</strong>: Milvus sumber dan setidaknya satu Milvus target harus diterapkan dan beroperasi.</p>
<ul>
<li><p>Versi Milvus sumber dan target harus 2.3.2 atau lebih tinggi, sebaiknya 2.4.x. Kami menyarankan untuk menggunakan versi yang sama untuk Milvus sumber dan target untuk memastikan kompatibilitas.</p></li>
<li><p>Atur konfigurasi <code translate="no">common.ttMsgEnabled</code> pada Milvus target ke <code translate="no">false</code>.</p></li>
<li><p>Konfigurasikan Milvus sumber dan target dengan pengaturan meta dan penyimpanan pesan yang berbeda untuk mencegah konflik. Sebagai contoh, hindari penggunaan konfigurasi etcd dan rootPath yang sama, serta layanan Pulsar dan <code translate="no">chanNamePrefix</code> yang sama di beberapa instans Milvus.</p></li>
</ul></li>
<li><p><strong>Metastore</strong>: Siapkan basis data etcd atau MySQL untuk metastore Milvus-CDC.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Langkah-langkah<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Dapatkan berkas konfigurasi Milvus-CDC</h3><p>Kloning <a href="https://github.com/zilliztech/milvus-cdc">repo Milvus-CDC</a> dan arahkan ke direktori <code translate="no">milvus-cdc/server/configs</code> untuk mengakses berkas konfigurasi <code translate="no">cdc.yaml</code>.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Mengedit berkas konfigurasi</h3><p>Di direktori <code translate="no">milvus-cdc/server/configs</code>, ubah berkas <code translate="no">cdc.yaml</code> untuk menyesuaikan konfigurasi yang terkait dengan metastore Milvus-CDC dan detail koneksi Milvus sumber.</p>
<ul>
<li><p><strong>Konfigurasi Metastore</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Jenis metastore untuk Milvus-CDC. Nilai yang mungkin adalah <code translate="no">etcd</code> atau <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Alamat untuk menyambung ke etcd Milvus-CDC. Diperlukan jika <code translate="no">storeType</code> diatur ke <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Alamat koneksi database MySQL untuk server Milvus-CDC. Diperlukan jika <code translate="no">storeType</code> diatur ke <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Jalur root dari metastore Milvus-CDC. Konfigurasi ini memungkinkan multi-tenancy, yang memungkinkan beberapa layanan CDC untuk menggunakan instance etcd atau MySQL yang sama sembari mencapai isolasi melalui jalur root yang berbeda.</p></li>
</ul>
<p>Contoh konfigurasi:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
<span class="hljs-attr">metaStoreConfig:</span>
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  <span class="hljs-attr">storeType:</span> <span class="hljs-string">etcd</span>
  <span class="hljs-comment"># etcd address</span>
  <span class="hljs-attr">etcdEndpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">cdc</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Konfigurasi Milvus Sumber:</strong></p>
<p>Tentukan detail koneksi Milvus sumber, termasuk etcd dan penyimpanan pesan, untuk membuat koneksi antara server Milvus-CDC dan Milvus sumber.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Alamat untuk menyambung ke etcd Milvus sumber. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">Konfigurasi terkait etcd</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Awalan root dari kunci di mana Milvus sumber menyimpan data dalam etcd. Nilainya dapat bervariasi berdasarkan metode penyebaran instans Milvus:</p>
<ul>
<li><p><strong>Helm</strong> atau <strong>Docker Compose</strong>: Defaultnya adalah <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Operator</strong>: Defaultnya adalah <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>: nama saluran replikasi milvus, yaitu <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> dalam berkas milvus.yaml</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Konfigurasi pulsar untuk Milvus sumber. Jika Milvus sumber menggunakan Kafka untuk penyimpanan pesan, hapus semua konfigurasi yang berhubungan dengan Pulsar. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/configure_pulsar.md">Konfigurasi yang berhubungan dengan Pulsar</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Alamat Kafka untuk Milvus sumber. Hapus konfigurasi ini jika Milvus sumber menggunakan Kafka untuk penyimpanan pesan.</p></li>
</ul></li>
</ul>
<p>Contoh konfigurasi:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
<span class="hljs-attr">sourceConfig:</span>
  <span class="hljs-comment"># etcd config</span>
  <span class="hljs-attr">etcdAddress:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">etcdRootPath:</span> <span class="hljs-string">by-dev</span>
  <span class="hljs-attr">etcdMetaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-comment"># default partition name</span>
  <span class="hljs-attr">defaultPartitionName:</span> <span class="hljs-string">_default</span>
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  <span class="hljs-attr">readChanLen:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">replicateChan:</span> <span class="hljs-string">by-dev-replicate-msg</span>
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  <span class="hljs-attr">pulsar:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">pulsar://localhost:6650</span>
    <span class="hljs-attr">webAddress:</span> <span class="hljs-string">localhost:80</span>
    <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span>
    <span class="hljs-attr">tenant:</span> <span class="hljs-string">public</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Mengkompilasi server Milvus-CDC</h3><p>Setelah menyimpan berkas <code translate="no">cdc.yaml</code>, arahkan ke direktori <code translate="no">milvus-cdc</code> dan jalankan salah satu perintah berikut untuk mengkompilasi server:</p>
<ul>
<li><p>Untuk berkas biner:</p>
<pre><code translate="no" class="language-bash">make build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Untuk citra Docker:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Untuk citra Docker, pasang berkas yang telah dikompilasi ke <code translate="no">/app/server/configs/cdc.yaml</code> di dalam kontainer.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Memulai server</h3><ul>
<li><p>Menggunakan biner</p>
<p>Arahkan ke direktori yang berisi berkas biner <code translate="no">milvus-cdc</code> dan direktori <code translate="no">configs</code> dengan berkas <code translate="no">cdc.yaml</code>, lalu mulai server:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Menggunakan Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
