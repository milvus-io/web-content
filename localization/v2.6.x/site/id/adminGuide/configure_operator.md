---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: Pelajari cara mengonfigurasi Milvus dengan Milvus Operator.
title: Mengkonfigurasi Milvus dengan Operator Milvus
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Mengkonfigurasi Milvus dengan Operator Milvus<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam lingkungan produksi, Anda perlu mengalokasikan sumber daya ke cluster Milvus berdasarkan jenis mesin dan beban kerja. Anda dapat mengonfigurasi selama penerapan atau memperbarui konfigurasi saat cluster berjalan.</p>
<p>Topik ini memperkenalkan cara mengonfigurasi cluster Milvus saat Anda menginstalnya dengan Milvus Operator.</p>
<p>Topik ini mengasumsikan bahwa Anda telah menerapkan Milvus Operator. Lihat <a href="/docs/id/install_cluster-milvusoperator.md">Menyebarkan Milvus Operator</a> untuk informasi lebih lanjut.</p>
<p>Mengonfigurasi cluster Milvus dengan Milvus Operator meliputi:</p>
<ul>
<li>Konfigurasi sumber daya global</li>
<li>Konfigurasi sumber daya pribadi</li>
</ul>
<div class="alert note">
Konfigurasi sumber daya privat akan menimpa konfigurasi sumber daya global. Jika Anda mengonfigurasi sumber daya secara global dan menentukan sumber daya privat komponen tertentu pada saat yang sama, komponen akan memprioritaskan dan merespons konfigurasi privat terlebih dahulu.</div>
<h2 id="Configure-global-resources" class="common-anchor-header">Mengonfigurasi sumber daya global<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat menggunakan Milvus Operator untuk memulai cluster Milvus, Anda perlu menentukan file konfigurasi. Contoh di sini menggunakan berkas konfigurasi default.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Rincian berkas konfigurasi adalah sebagai berikut:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">dependencies:</span> {}
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>Bidang <code translate="no">spec.components</code> mencakup konfigurasi sumber daya global dan privat dari semua komponen Milvus. Berikut ini adalah empat bidang yang umum digunakan untuk mengonfigurasi sumber daya global.</p>
<ul>
<li><code translate="no">image</code>: Citra docker Milvus yang digunakan.</li>
<li><code translate="no">resources</code>: Sumber daya komputasi yang dialokasikan untuk setiap komponen.</li>
<li><code translate="no">tolerations</code> dan <code translate="no">nodeSelector</code>: Aturan penjadwalan dari setiap komponen Milvus dalam klaster K8s. Lihat <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">toleransi</a> dan <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector</a> untuk informasi lebih lanjut.</li>
<li><code translate="no">env</code>: Variabel lingkungan.</li>
</ul>
<p>Jika Anda ingin mengonfigurasi lebih banyak bidang, lihat dokumentasi <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">di sini</a>.</p>
<p>Untuk mengonfigurasi sumber daya global untuk klaster Milvus, buat file <code translate="no">milvuscluster_resource.yaml</code>.</p>
<h3 id="Example" class="common-anchor-header">Contoh</h3><p>Contoh berikut ini mengonfigurasi sumber daya global untuk cluster Milvus.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">nodeSelector:</span> {}
    <span class="hljs-attr">tolerations:</span> {}
    <span class="hljs-attr">env:</span> {}
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
      <span class="hljs-attr">requests:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jalankan perintah berikut untuk menerapkan konfigurasi baru:</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Sumber daya cluster akan diperbarui sesuai dengan file konfigurasi jika ada cluster Milvus bernama <code translate="no">my-release</code> di cluster K8s. Jika tidak, cluster Milvus baru akan dibuat.</div>
<h2 id="Configure-private-resources" class="common-anchor-header">Mengonfigurasi sumber daya pribadi<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada awalnya di Milvus 2.0, sebuah klaster Milvus memiliki tujuh komponen: proxy, root coord, data coord, query coord, simpul indeks, simpul data, dan simpul kueri. Namun, sebuah komponen baru, mix coord, dirilis bersama dengan Milvus 2.1.0. Mix coord mencakup semua komponen koordinator. Oleh karena itu, memulai mix coord berarti Anda tidak perlu menginstal dan memulai koordinator lain termasuk root coord, data coord, dan query coord.</p>
<p>Bidang umum yang digunakan untuk mengonfigurasi setiap komponen meliputi:</p>
<ul>
<li><code translate="no">replica</code>: Jumlah replika setiap komponen.</li>
<li><code translate="no">port</code>: Nomor port listen dari setiap komponen.</li>
<li>Empat bidang yang umum digunakan dalam konfigurasi sumber daya global: <code translate="no">image</code> <code translate="no">env</code> , <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (lihat di atas). Untuk bidang yang dapat dikonfigurasi lebih lanjut, klik pada setiap komponen dalam <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">dokumentasi ini</a>.</li>
</ul>
<div class="alert note">
Selain itu, ketika mengkonfigurasi proxy, ada bidang tambahan yang disebut `serviceType`. Bidang ini mendefinisikan jenis layanan yang disediakan Milvus dalam cluster K8s.</div>
<p>Untuk mengonfigurasi sumber daya untuk komponen tertentu, tambahkan nama komponen di bidang di bawah <code translate="no">spec.componets</code> terlebih dahulu dan kemudian konfigurasikan sumber daya pribadinya.</p>
<div class="filter">
<a href="#component">Komponen atau ketergantungan</a> <a href="#purpose">Tujuan konfigurasi</a> </div>
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
            <li><a href="/docs/id/configure_rootcoord.md">Koordinat akar</a></li>
            <li><a href="/docs/id/configure_proxy.md">Proksi</a></li>
            <li><a href="/docs/id/configure_querycoord.md">Koordinat kueri</a></li>
            <li><a href="/docs/id/configure_querynode.md">Simpul kueri</a></li>
            <li><a href="/docs/id/configure_indexnode.md">Simpul indeks</a></li>
            <li><a href="/docs/id/configure_datacoord.md">Koordinat data</a></li>
            <li><a href="/docs/id/configure_datanode.md">Simpul data</a></li>
            <li><a href="/docs/id/configure_localstorage.md">Penyimpanan lokal</a></li>
            <li><a href="/docs/id/configure_log.md">Log</a></li>
            <li><a href="/docs/id/configure_msgchannel.md">Saluran pesan</a></li>
            <li><a href="/docs/id/configure_common.md">Umum</a></li>
            <li><a href="/docs/id/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/id/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/id/configure_indexcoord.md">Kode indeks</a></li>
            <li><a href="/docs/id/configure_metastore.md">Metastore</a></li>
            <li><a href="/docs/id/configure_mq.md">Antrian Pesan</a></li>
            <li><a href="/docs/id/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/id/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/id/configure_trace.md">Lacak</a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md">Kuota dan Batas</a></li>
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
    <td>Penyetelan kinerja</td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/id/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/id/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/id/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/id/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/id/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/id/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/id/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Data dan meta</td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
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
    <td>Kuota dan Batas</td>
    <td>
        <ul>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/id/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">Contoh</h3><p>Contoh di bawah ini mengonfigurasi replika dan sumber daya komputasi proxy dan datanode dalam berkas <code translate="no">milvuscluster.yaml</code>.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
      <span class="hljs-attr">requests:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
    <span class="hljs-attr">rootCoord:</span> 
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span>
      <span class="hljs-attr">resources:</span>
        <span class="hljs-attr">limits:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;6&#x27;</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">&#x27;10Gi&#x27;</span>
    <span class="hljs-attr">dataCoord:</span> {}
    <span class="hljs-attr">queryCoord:</span> {}
    <span class="hljs-attr">indexCoord:</span> {}
    <span class="hljs-attr">dataNode:</span> {}
    <span class="hljs-attr">indexNode:</span> {}
    <span class="hljs-attr">queryNode:</span> {}
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">serviceType:</span> <span class="hljs-string">ClusterIP</span>
      <span class="hljs-attr">resources:</span>
        <span class="hljs-attr">limits:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;2&#x27;</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">4Gi</span>
        <span class="hljs-attr">requests:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">100m</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">128Mi</span>
  <span class="hljs-attr">config:</span> {}
  <span class="hljs-attr">dependencies:</span> {}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Contoh ini mengkonfigurasi tidak hanya sumber daya global tetapi juga sumber daya komputasi pribadi untuk root coord dan proxy. Ketika menggunakan file konfigurasi ini untuk memulai cluster Milvus, konfigurasi sumber daya privat akan diterapkan pada root coord dan proxy, sementara komponen lainnya akan mengikuti konfigurasi sumber daya global.</div>
<p>Jalankan perintah berikut untuk menerapkan konfigurasi baru:</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pelajari cara mengelola ketergantungan Milvus berikut ini dengan Milvus Operator:<ul>
<li><a href="/docs/id/object_storage_operator.md">Mengonfigurasi Penyimpanan Objek dengan Milvus Operator</a></li>
<li><a href="/docs/id/meta_storage_operator.md">Mengonfigurasi Penyimpanan Meta dengan Milvus Operator</a></li>
<li><a href="/docs/id/message_storage_operator.md">Mengonfigurasi Penyimpanan Pesan dengan Operator Milvus</a></li>
</ul></li>
</ul>
