---
id: configure-docker.md
label: Docker Compose
related_key: configure
summary: Konfigurasikan Milvus menggunakan Docker Compose.
title: Mengonfigurasi Milvus dengan Docker Compose
---
<h1 id="Configure-Milvus-with-Docker-Compose" class="common-anchor-header">Mengonfigurasi Milvus dengan Docker Compose<button data-href="#Configure-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara mengonfigurasi komponen Milvus dan dependensi pihak ketiga menggunakan Docker Compose.</p>
<div class="alert note">
Beberapa parameter dapat diubah saat Milvus sedang berjalan. Untuk detailnya, lihat <a href="/docs/id/dynamic_config.md">Konfigurasi Milvus Secara Langsung</a>. Untuk menerapkan perubahan pada parameter lainnya, jalankan ulang Milvus.
</div>
<h2 id="Download-a-configuration-file" class="common-anchor-header">Unduh berkas konfigurasi<button data-href="#Download-a-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml">Unduh</a> berk <code translate="no">milvus.yaml</code> secara langsung atau dengan perintah berikut.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-configuration-file" class="common-anchor-header">Ubah berkas konfigurasi<button data-href="#Modify-the-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Konfigurasikan instance Milvus Anda agar sesuai dengan skenario aplikasi Anda dalam berkas <code translate="no">user.yaml</code>. Tambahkan hanya parameter yang ingin Anda ubah, dan gunakan berkas <code translate="no">milvus.yaml</code> yang telah diunduh sebagai referensi untuk nama dan nilai defaultnya. Milvus membaca <code translate="no">user.yaml</code> setelah <code translate="no">milvus.yaml</code>, sehingga nilai dalam <code translate="no">user.yaml</code> akan menggantikan nilai default. Contoh berikut mengubah tingkat log:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">log:</span>
  <span class="hljs-attr">level:</span> <span class="hljs-string">warn</span>
<button class="copy-code-btn"></button></code></pre>
<p>Periksa tautan berikut untuk informasi lebih lanjut mengenai setiap parameter.</p>
<p>Diurutkan berdasarkan:</p>
<div class="filter">
<a href="#component">Komponen atau dependensi</a> <a href="#purpose">Tujuan konfigurasi</a> 
</div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>Ketergantungan</th>
    <th>Komponen</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/id/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/id/configure_minio.md">MinIO atau S3</a></li>
            <li><a href="/docs/id/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/id/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_rootcoord.md">Koord. akar</a></li>
            <li><a href="/docs/id/configure_proxy.md">Proksi</a></li>
            <li><a href="/docs/id/configure_querycoord.md">Koord. kueri</a></li>
            <li><a href="/docs/id/configure_querynode.md">Node kueri</a></li>
            <li><a href="/docs/id/configure_indexnode.md">Node indeks (versi lama)</a></li>
            <li><a href="/docs/id/configure_datacoord.md">Koordinat data</a></li>
            <li><a href="/docs/id/configure_datanode.md">Node data</a></li>
            <li><a href="/docs/id/configure_localstorage.md">Penyimpanan lokal</a></li>
            <li><a href="/docs/id/configure_log.md">Log</a></li>
            <li><a href="/docs/id/configure_msgchannel.md">Saluran pesan</a></li>
            <li><a href="/docs/id/configure_common.md">Umum</a></li>
            <li><a href="/docs/id/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/id/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/id/configure_indexcoord.md">Koord. indeks (versi lama)</a></li>
            <li><a href="/docs/id/configure_metastore.md">Metastore</a></li>
            <li><a href="/docs/id/configure_mq.md">Antrian Pesan</a></li>
            <li><a href="/docs/id/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/id/configure_trace.md">Trace</a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md">Kuota dan Batasan</a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-purpose table-wrapper">
<table id="purpose">
<thead>
  <tr>
    <th>Tujuan</th>
    <th>Parameter</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Penyesuaian kinerja</td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_common.md#commongracefulTime"><code translate="no">common.gracefulTime</code></a></li>
            <li><a href="/docs/id/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/id/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/id/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/id/configure_datanode.md#dataNodesegmentinsertBufSize"><code translate="no">dataNode.segment.insertBufSize</code></a></li>
            <li><a href="/docs/id/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/id/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Data dan meta</td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/id/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/id/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/id/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Administrasi</td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/id/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/id/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/id/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/id/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Kuota dan Batasan</td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsflushRatemax"><code translate="no">quotaAndLimits.flushRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitscompactionRateenabled"><code translate="no">quotaAndLimits.compactionRate.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitscompactionRatemax"><code translate="no">quotaAndLimits.compactionRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h2 id="Download-an-installation-file" class="common-anchor-header">Unduh berkas instalasi<button data-href="#Download-an-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Unduh berkas instalasi untuk Milvus <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml">standalone</a>, lalu simpan sebagai <code translate="no">docker-compose.yml</code>.</p>
<p>Anda juga dapat langsung menjalankan perintah berikut.</p>
<pre><code translate="no"><span class="hljs-meta prompt_"># </span><span class="language-bash">For Milvus standalone</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-installation-file" class="common-anchor-header">Ubah berkas instalasi<button data-href="#Modify-the-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Di berkas ` <code translate="no">docker-compose.yml</code>`, sesuaikan jalur lokal ke berkas ` <code translate="no">user.yaml</code> ` Anda dengan ` <code translate="no">/milvus/configs/user.yaml</code> ` pada bagian ` <code translate="no">volumes</code> ` dari layanan ` <code translate="no">standalone</code> `. Pertahankan entri volume yang ada serta pengaturan lain dari layanan tersebut, seperti gambar, variabel lingkungan, pemeriksaan kesehatan, dan ketergantungan:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/local/path/to/your/user.yaml:/milvus/configs/user.yaml</span>   <span class="hljs-comment"># Map the local path to the container path</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Data disimpan di folder <code translate="no">./volumes</code> sesuai dengan konfigurasi default di <code translate="no">docker-compose.yml</code>. Untuk mengubah folder penyimpanan data, edit <code translate="no">docker-compose.yml</code> atau jalankan perintah <code translate="no">$ export DOCKER_VOLUME_DIRECTORY=</code>.
</div>
<h2 id="Start-Milvus" class="common-anchor-header">Mulai Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah selesai memodifikasi berkas konfigurasi dan berkas instalasi, Anda dapat memulai Milvus.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
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
<li>Pelajari cara mengelola dependensi Milvus berikut ini dengan Docker Compose atau Helm:
<ul>
<li><a href="/docs/id/deploy_s3.md">Konfigurasikan Penyimpanan Objek dengan Docker Compose atau Helm</a></li>
<li><a href="/docs/id/deploy_etcd.md">Konfigurasikan Penyimpanan Meta dengan Docker Compose atau Helm</a></li>
<li><a href="/docs/id/deploy_pulsar.md">Konfigurasikan Penyimpanan Pesan dengan Docker Compose atau Helm</a></li>
</ul></li>
</ul>
