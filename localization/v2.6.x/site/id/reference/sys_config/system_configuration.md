---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Pelajari tentang konfigurasi sistem Milvus.
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Daftar Periksa Konfigurasi Sistem Milvus<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan bagian umum dari konfigurasi sistem pada Milvus.</p>
<p>Milvus memiliki banyak sekali parameter yang mengonfigurasi sistem. Setiap konfigurasi memiliki nilai default yang dapat digunakan secara langsung. Anda dapat memodifikasi parameter-parameter ini secara fleksibel sehingga Milvus dapat melayani aplikasi Anda dengan lebih baik. Lihat <a href="/docs/id/configure-docker.md">Mengkonfigurasi Milvus</a> untuk informasi lebih lanjut.</p>
<div class="alert note">
Pada rilis saat ini, semua parameter hanya berlaku setelah dikonfigurasi pada saat Milvus dijalankan.</div>
<h2 id="Sections" class="common-anchor-header">Bagian<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk kenyamanan pemeliharaan, Milvus mengklasifikasikan konfigurasinya ke dalam beberapa bagian berdasarkan komponen, ketergantungan, dan penggunaan secara umum.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Konfigurasi terkait etcd, digunakan untuk menyimpan metadata Milvus &amp; penemuan layanan.</p>
<p>Lihat <a href="/docs/id/configure_etcd.md">Konfigurasi terkait etcd</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>Lihat <a href="/docs/id/configure_metastore.md">Konfigurasi terkait metastore</a> untuk penjelasan rinci untuk setiap parameter pada bagian ini.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Konfigurasi terkait tikv, digunakan untuk menyimpan metadata Milvus.</p>
<p>Perhatikan bahwa ketika TiKV diaktifkan untuk metastore, Anda masih perlu memiliki etcd untuk penemuan layanan.</p>
<p>TiKV adalah pilihan yang baik ketika ukuran metadata membutuhkan skalabilitas horizontal yang lebih baik.</p>
<p>Lihat <a href="/docs/id/configure_tikv.md">Konfigurasi terkait tikv</a> untuk penjelasan terperinci untuk setiap parameter di bagian ini.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Lihat <a href="/docs/id/configure_localstorage.md">Konfigurasi terkait localStorage</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>Konfigurasi terkait MinIO/S3/GCS atau layanan lainnya mendukung API S3, yang bertanggung jawab atas persistensi data untuk Milvus.</p>
<p>Kami menyebut layanan penyimpanan sebagai MinIO/S3 dalam deskripsi berikut ini untuk mempermudah.</p>
<p>Lihat <a href="/docs/id/configure_minio.md">Konfigurasi terkait MinIO</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus mendukung empat MQ: rocksmq (berbasis RockDB), natsmq (embedded nats-server), Pulsar, dan Kafka.</p>
<p>Anda dapat mengubah mq Anda dengan mengatur bidang mq.type.</p>
<p>Jika Anda tidak mengatur bidang mq.type sebagai default, ada catatan tentang mengaktifkan prioritas jika kita mengkonfigurasi beberapa mq dalam berkas ini.</p>
<ol>
<li><p>mode standalone (lokal): rocksmq (default) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>mode cluster:  Pulsar(default) &gt; Kafka (rocksmq dan natsmq tidak didukung dalam mode cluster)</p></li>
</ol>
<p>Lihat <a href="/docs/id/configure_mq.md">Konfigurasi terkait mq</a> untuk penjelasan rinci untuk setiap parameter pada bagian ini.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Konfigurasi terkait pulsar, digunakan untuk mengelola log Milvus dari operasi mutasi terkini, log streaming keluaran, dan menyediakan layanan berlangganan-publikasi log.</p>
<p>Lihat <a href="/docs/id/configure_pulsar.md">Konfigurasi terkait pulsar</a> untuk penjelasan rinci untuk setiap parameter pada bagian ini.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>Jika Anda ingin mengaktifkan kafka, Anda perlu mengomentari konfigurasi pulsar</p>
<p>kafka:</p>
<p>brokerList: localhost:9092</p>
<p>saslUsername:</p>
<p>saslKata sandi:</p>
<p>saslMechanisms:</p>
<p>securityProtocol:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>Lihat <a href="/docs/id/configure_rocksmq.md">Konfigurasi terkait rocksmq</a> untuk penjelasan mendetail untuk setiap parameter dalam bagian ini.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>konfigurasi natsmq.</p>
<p>detail lebih lanjut: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>Lihat <a href="/docs/id/configure_natsmq.md">Konfigurasi terkait natsmq</a> untuk penjelasan mendetail untuk setiap parameter pada bagian ini.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Konfigurasi terkait rootCoord, digunakan untuk menangani permintaan bahasa definisi data (DDL) dan bahasa kontrol data (DCL)</p>
<p>Lihat <a href="/docs/id/configure_rootcoord.md">Konfigurasi terkait rootCoord</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Konfigurasi terkait proxy, digunakan untuk memvalidasi permintaan klien dan mengurangi hasil yang dikembalikan.</p>
<p>Lihat <a href="/docs/id/configure_proxy.md">Konfigurasi terkait proxy</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Konfigurasi terkait queryCoord, digunakan untuk mengelola topologi dan penyeimbangan beban untuk node kueri, dan handoff dari segmen yang sedang berkembang ke segmen yang disegel.</p>
<p>Lihat <a href="/docs/id/configure_querycoord.md">Konfigurasi terkait queryCoord</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Konfigurasi terkait queryNode, digunakan untuk menjalankan pencarian hibrida antara data vektor dan skalar.</p>
<p>Lihat <a href="/docs/id/configure_querynode.md">Konfigurasi terkait queryNode</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>Lihat <a href="/docs/id/configure_indexcoord.md">Konfigurasi terkait indexCoord</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>Lihat <a href="/docs/id/configure_indexnode.md">Konfigurasi terkait indexNode</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Lihat <a href="/docs/id/configure_datacoord.md">Konfigurasi terkait dataCoord</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>Lihat <a href="/docs/id/configure_datanode.md">Konfigurasi terkait dataNode</a> untuk penjelasan rinci untuk setiap parameter dalam bagian ini.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>Topik ini memperkenalkan konfigurasi terkait saluran pesan pada Milvus.</p>
<p>Lihat <a href="/docs/id/configure_msgchannel.md">Konfigurasi terkait saluran</a> pesan untuk penjelasan rinci untuk setiap parameter dalam bagian ini.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Mengkonfigurasi output log sistem.</p>
<p>Lihat <a href="/docs/id/configure_log.md">Konfigurasi terkait log</a> untuk penjelasan rinci untuk setiap parameter dalam bagian ini.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>Lihat <a href="/docs/id/configure_grpc.md">Konfigurasi terkait grpc</a> untuk penjelasan rinci untuk setiap parameter dalam bagian ini.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Mengkonfigurasi tls eksternal.</p>
<p>Lihat <a href="/docs/id/configure_tls.md">Konfigurasi terkait tls</a> untuk penjelasan rinci untuk setiap parameter pada bagian ini.</p>
<h3 id="internaltls" class="common-anchor-header"><code translate="no">internaltls</code></h3><p>Mengonfigurasi tls internal.</p>
<p>Lihat <a href="/docs/id/configure_internaltls.md">Konfigurasi terkait tls internal</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Lihat <a href="/docs/id/configure_common.md">Konfigurasi terkait umum</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, konfigurasi kuota dan batas Milvus.</p>
<p>Secara default, kami mengaktifkan:</p>
<ol>
<li><p>Perlindungan TT;</p></li>
<li><p>Perlindungan memori.</p></li>
<li><p>Perlindungan kuota disk.</p></li>
</ol>
<p>Anda dapat mengaktifkan:</p>
<ol>
<li><p>Batasan throughput DML;</p></li>
<li><p>Batasan DDL, DQL qps/rps;</p></li>
<li><p>Perlindungan panjang antrean/latensi DQL;</p></li>
<li><p>Perlindungan tingkat hasil DQL;</p></li>
</ol>
<p>Jika perlu, Anda juga dapat secara manual menolak permintaan RW.</p>
<p>Lihat <a href="/docs/id/configure_quotaandlimits.md">Konfigurasi terkait kuota dan batasan</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>Lihat <a href="/docs/id/configure_trace.md">Konfigurasi terkait jejak</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#Saat menggunakan pengindeksan GPU, Milvus akan menggunakan kumpulan memori untuk menghindari alokasi dan deallokasi memori yang sering terjadi.</p>
<p>#Di sini, Anda dapat mengatur ukuran memori yang ditempati oleh pool memori, dengan satuan MB.</p>
<p>#Perhatikan bahwa ada kemungkinan Milvus mengalami crash ketika permintaan memori aktual melebihi nilai yang ditetapkan oleh maxMemSize.</p>
<p>#Jika initMemSize dan MaxMemSize keduanya bernilai nol,</p>
<p>#milvus akan secara otomatis menginisialisasi setengah dari memori GPU yang tersedia,</p>
<p>#maxMemSize akan menginisialisasi seluruh memori GPU yang tersedia.</p>
<p>Lihat <a href="/docs/id/configure_gpu.md">Konfigurasi terkait GPU</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="streamingNode" class="common-anchor-header"><code translate="no">streamingNode</code></h3><p>Konfigurasi apa pun yang terkait dengan server node streaming.</p>
<p>Lihat <a href="/docs/id/configure_streamingnode.md">Konfigurasi terkait streamingNode</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="streaming" class="common-anchor-header"><code translate="no">streaming</code></h3><p>Konfigurasi apa pun yang terkait dengan layanan streaming.</p>
<p>Lihat <a href="/docs/id/configure_streaming.md">Konfigurasi terkait streaming</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
<h3 id="knowhere" class="common-anchor-header"><code translate="no">knowhere</code></h3><p>Konfigurasi apa pun yang terkait dengan mesin pencari vektor knowhere</p>
<p>Lihat <a href="/docs/id/configure_knowhere.md">Konfigurasi terkait knowhere</a> untuk penjelasan rinci untuk setiap parameter di bagian ini.</p>
