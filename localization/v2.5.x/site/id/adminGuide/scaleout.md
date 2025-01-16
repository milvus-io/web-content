---
id: scaleout.md
related_key: scale Milvus cluster
summary: >-
  Pelajari cara melakukan scale out dan scale in secara manual atau otomatis
  dalam cluster Milvus.
title: Menetapkan Skala Cluster Milvus
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Menetapkan Skala Cluster Milvus<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mendukung penskalaan horizontal pada komponen-komponennya. Ini berarti Anda dapat menambah atau mengurangi jumlah node pekerja dari setiap jenis sesuai dengan kebutuhan Anda.</p>
<p>Topik ini menjelaskan cara untuk melakukan scale out dan scale in pada cluster Milvus. Kami mengasumsikan bahwa Anda telah <a href="/docs/id/install_cluster-helm.md">menginstal cluster Milvus</a> sebelum melakukan penskalaan. Selain itu, kami sarankan untuk membiasakan diri Anda dengan <a href="/docs/id/architecture_overview.md">arsitektur Milvus</a> sebelum memulai.</p>
<p>Tutorial ini menggunakan penskalaan tiga node kueri sebagai contoh. Untuk menskalakan jenis node lainnya, ganti <code translate="no">queryNode</code> dengan jenis node yang sesuai pada baris perintah.</p>
<div class="alert note">
<p>Untuk informasi tentang cara menskalakan cluster dengan Milvus Operator, lihat Menskalakan <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Cluster dengan Milvus Operator</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">Apa yang dimaksud dengan penskalaan horizontal?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Penskalaan horizontal meliputi penskalaan keluar dan penskalaan masuk.</p>
<h3 id="Scaling-out" class="common-anchor-header">Scaling out</h3><p>Scaling out mengacu pada peningkatan jumlah node dalam sebuah cluster. Tidak seperti scaling up, scaling out tidak mengharuskan Anda mengalokasikan lebih banyak sumber daya ke satu node dalam cluster. Sebaliknya, scaling out memperluas cluster secara horizontal dengan menambahkan lebih banyak node.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
    Pengecilan </span> <span class="img-wrapper"> <span>ukuran</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>Peningkatan</span> </span></p>
<p>Menurut <a href="/docs/id/architecture_overview.md">arsitektur Milvus</a>, node pekerja tanpa kewarganegaraan meliputi node kueri, node data, node indeks, dan proxy. Oleh karena itu, Anda dapat melakukan scale out node jenis ini agar sesuai dengan kebutuhan bisnis dan skenario aplikasi Anda. Anda dapat menskalakan cluster Milvus secara manual atau otomatis.</p>
<p>Umumnya, Anda perlu melakukan scale out cluster Milvus yang Anda buat jika cluster tersebut digunakan secara berlebihan. Di bawah ini adalah beberapa situasi umum di mana Anda mungkin perlu melakukan scale out cluster Milvus:</p>
<ul>
<li>Penggunaan CPU dan memori tinggi untuk jangka waktu tertentu.</li>
<li>Throughput kueri menjadi lebih tinggi.</li>
<li>Diperlukan kecepatan yang lebih tinggi untuk pengindeksan.</li>
<li>Volume besar dari kumpulan data yang besar perlu diproses.</li>
<li>Ketersediaan layanan Milvus yang tinggi perlu dipastikan.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">Penskalaan ke dalam</h3><p>Scaling in mengacu pada pengurangan jumlah node dalam sebuah cluster. Umumnya, Anda perlu melakukan penskalaan dalam cluster Milvus yang Anda buat jika cluster tersebut kurang dimanfaatkan. Di bawah ini adalah beberapa situasi umum di mana Anda perlu melakukan penskalaan dalam cluster Milvus:</p>
<ul>
<li>Pemanfaatan CPU dan memori rendah untuk jangka waktu tertentu.</li>
<li>Throughput kueri menjadi lebih rendah.</li>
<li>Kecepatan yang lebih tinggi untuk pengindeksan tidak diperlukan.</li>
<li>Ukuran dataset yang akan diproses kecil.</li>
</ul>
<div class="alert note">
Kami tidak menyarankan untuk mengurangi jumlah node pekerja secara drastis. Misalnya, jika ada lima node data dalam cluster, kami sarankan untuk mengurangi satu node data pada satu waktu untuk memastikan ketersediaan layanan. Jika layanan tersedia setelah upaya pertama penskalaan, Anda dapat melanjutkan untuk mengurangi jumlah node data lebih lanjut.</div>
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
    </button></h2><p>Jalankan <code translate="no">kubectl get pods</code> untuk mendapatkan daftar komponen dan status kerjanya dalam cluster Milvus yang Anda buat.</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my-release-etcd-0                               1/1     Running      0          1m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running      0          1m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running      0          1m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running      0          1m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running      0          1m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running      0          1m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running      0          1m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running      0          1m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running      0          1m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running      0          1m
my-release-minio-5564fbbddc-9sbgv               1/1     Running      0          1m 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Milvus hanya mendukung penambahan node pekerja dan tidak mendukung penambahan komponen koordinator.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Mengukur skala klaster Milvus<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat melakukan penskalaan pada klaster Milvus Anda secara manual atau otomatis. Jika autoscaling diaktifkan, cluster Milvus akan menyusut atau membesar secara otomatis ketika konsumsi sumber daya CPU dan memori mencapai nilai yang Anda tetapkan.</p>
<p>Saat ini, Milvus 2.1.0 hanya mendukung penskalaan masuk dan keluar secara manual.</p>
<h4 id="Scaling-out" class="common-anchor-header">Mengecilkan skala</h4><p>Jalankan <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> untuk memperkecil node kueri secara manual.</p>
<p>Jika berhasil, tiga pod yang sedang berjalan pada node kueri akan ditambahkan seperti yang ditunjukkan pada contoh berikut.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-czq9f    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-jcdcn    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">Penskalaan masuk</h4><p>Jalankan <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> untuk menskalakan node kueri.</p>
<p>Jika berhasil, tiga pod yang sedang berjalan pada simpul kueri dikurangi menjadi satu seperti yang ditunjukkan pada contoh berikut.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
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
<li><p>Jika Anda ingin mempelajari cara memonitor layanan Milvus dan membuat peringatan:</p>
<ul>
<li>Pelajari Memantau <a href="/docs/id/monitor.md">Milvus dengan Operator Prometheus di Kubernetes</a></li>
</ul></li>
<li><p>Jika Anda siap untuk men-deploy cluster Anda di awan:</p>
<ul>
<li>Pelajari cara <a href="/docs/id/eks.md">Menerapkan Milvus di Amazon EKS dengan Terraform</a></li>
<li>Pelajari cara <a href="/docs/id/gcp.md">Menerapkan Cluster Milvus di GCP dengan Kubernetes</a></li>
<li>Pelajari cara <a href="/docs/id/azure.md">Menerapkan Milvus di Microsoft Azure dengan Kubernetes</a></li>
</ul></li>
<li><p>Jika Anda mencari petunjuk tentang cara mengalokasikan sumber daya:</p>
<ul>
<li><a href="/docs/id/allocate.md#standalone">Mengalokasikan Sumber Daya di Kubernetes</a></li>
</ul></li>
</ul>