---
id: mq_rocksmq.md
title: RocksMQ
---
<h1 id="Use-RocksMQ-as-the-Milvus-Message-Queue" class="common-anchor-header">Gunakan RocksMQ sebagai Antrian Pesan Milvus<button data-href="#Use-RocksMQ-as-the-Milvus-Message-Queue" class="anchor-icon" translate="no">
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
    </button></h1><p>RocksMQ adalah antrian pesan tertanam (WAL) yang disertakan dalam Milvus, dan <strong>hanya</strong> tersedia untuk <strong>Milvus Standalone</strong>. Antrian pesan ini merupakan antrian pesan bawaan untuk Milvus Standalone pada versi Milvus sebelumnya; pada Milvus 3.x, Milvus Standalone menggunakan <a href="/docs/id/woodpecker.md">Woodpecker</a> tertanam sebagai antrian pesan bawaan.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Kompatibilitas versi<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
<li><strong>Hanya untuk Standalone</strong> — RocksMQ <strong>tidak</strong> didukung di Milvus Distributed (kluster). Lihat <a href="/docs/id/mqtype-overview.md#Supported-message-queues">matriks dukungan antrian pesan</a>.</li>
<li>RocksMQ sudah disertakan dalam Milvus, sehingga tidak perlu menginstal versi terpisah.</li>
<li>Ini adalah antrian pesan standalone default pada versi Milvus sebelumnya, dan telah digantikan oleh Woodpecker tertanam di Milvus 3.x.</li>
</ul>
<h2 id="Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="common-anchor-header">Deploy Milvus Standalone dengan RocksMQ menggunakan Docker<button data-href="#Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install" class="common-anchor-header">Instal<button data-href="#Install" class="anchor-icon" translate="no">
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
    </button></h3><p>Ikuti <a href="/docs/id/install_standalone-docker.md">panduan "Run Milvus in Docker"</a>. Pada Milvus 3.x, antrian pesan default standalone adalah Woodpecker, jadi ubah jenis antrian pesan menjadi RocksMQ secara eksplisit. Skrip bootstrap akan menulis file ` <code translate="no">user.yaml</code> ` baru pada <strong>saat pertama kali dijalankan</strong> ( <code translate="no">start</code>), jadi atur jenisnya <strong>setelah</strong> proses startup pertama, lalu jalankan ` <code translate="no">restart</code> ` untuk menerapkan perubahan (perintah ` <code translate="no">restart</code> ` akan mempertahankan ` <code translate="no">user.yaml</code>`):</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-rocksmq &amp;&amp; <span class="hljs-built_in">cd</span> milvus-rocksmq
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># 1. First start — boots the container and writes a default user.yaml</span>
bash standalone_embed.sh start

<span class="hljs-comment"># 2. Set the message queue to RocksMQ</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: rocksmq
EOF

<span class="hljs-comment"># 3. Restart to apply the change</span>
bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Peralihan <code translate="no">mq.type</code> dengan cara ini ditujukan untuk instance yang <b>benar-benar baru</b> (belum ada koleksi). Untuk mengubah antrian pesan pada instance yang sudah menyimpan data, ikuti <a href="/docs/id/switch-rocksmq-woodpecker.md">prosedur peralihan</a> sebagai gantinya.
</div>
<h3 id="Configure" class="common-anchor-header">Konfigurasi<button data-href="#Configure" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengoptimalkan RocksMQ, tambahkan bagian ` <code translate="no">rocksmq</code> ` ke ` <code translate="no">user.yaml</code> ` dan mulai ulang layanan:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<span class="hljs-attr">rocksmq:</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">/var/lib/milvus/rdb_data</span>   <span class="hljs-comment"># where messages are stored</span>
  <span class="hljs-attr">lrucacheratio:</span> <span class="hljs-number">0.06</span>              <span class="hljs-comment"># rocksdb cache memory ratio</span>
  <span class="hljs-attr">rocksmqPageSize:</span> <span class="hljs-number">67108864</span>        <span class="hljs-comment"># 64 MB, size of each message page</span>
  <span class="hljs-attr">retentionTimeInMinutes:</span> <span class="hljs-number">4320</span>     <span class="hljs-comment"># 3 days</span>
  <span class="hljs-attr">retentionSizeInMB:</span> <span class="hljs-number">8192</span>          <span class="hljs-comment"># 8 GB</span>
  <span class="hljs-attr">compactionInterval:</span> <span class="hljs-number">86400</span>        <span class="hljs-comment"># 1 day, trigger rocksdb compaction</span>
  <span class="hljs-attr">compressionTypes:</span> [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall" class="common-anchor-header">Hapus Instalasi<button data-href="#Uninstall" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">bash standalone_embed.sh stop
bash standalone_embed.sh delete
<button class="copy-code-btn"></button></code></pre>
<h2 id="Notes" class="common-anchor-header">Catatan<button data-href="#Notes" class="anchor-icon" translate="no">
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
<li><strong>Memperbarui dari 2.5.x ke 2.6.x:</strong> <strong>Batasan antrian pesan</strong>: Saat memperbarui ke Milvus v3.0-beta, Anda harus mempertahankan pilihan antrian pesan saat ini. Beralih antara sistem antrian pesan yang berbeda selama proses pembaruan tidak didukung. Dukungan untuk mengganti sistem antrian pesan akan tersedia di versi mendatang.
Karena versi 2.6.x mengubah pengaturan default standalone menjadi Woodpecker, tetapkan <code translate="no">mq.type: rocksmq</code> di berkas <code translate="no">user.yaml</code> Anda <strong>sebelum</strong> melakukan pembaruan jika Anda ingin tetap menggunakan RocksMQ.</li>
<li>Untuk mengubah antrian pesan pada instance yang sedang berjalan, lihat <a href="/docs/id/switch-rocksmq-woodpecker.md">Beralih dari RocksMQ ke Woodpecker</a>.</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Langkah Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/id/woodpecker.md">Woodpecker (antrian pesan default)</a></li>
<li><a href="/docs/id/switch-rocksmq-woodpecker.md">Beralih dari RocksMQ ke Woodpecker</a></li>
</ul>
