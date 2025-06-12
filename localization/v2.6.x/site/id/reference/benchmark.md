---
id: benchmark.md
summary: Pelajari tentang hasil tolok ukur Milvus.
title: Laporan Uji Coba Benchmark Milvus 2.2
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Laporan Uji Coba Benchmark Milvus 2.2<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>Laporan ini menunjukkan hasil pengujian utama Milvus 2.2.0. Laporan ini bertujuan untuk memberikan gambaran kinerja pencarian Milvus 2.2.0, terutama dalam kemampuan untuk meningkatkan dan mengurangi.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>Kami baru saja menjalankan benchmark terhadap Milvus 2.2.3 dan mendapatkan beberapa temuan penting berikut ini:</p>
    <ul>
      <li>Pengurangan latensi pencarian sebesar 2,5x lipat</li>
      <li>Peningkatan 4,5x dalam QPS</li>
      <li>Pencarian kemiripan skala miliaran dengan sedikit penurunan kinerja</li>
      <li>Skalabilitas linier saat menggunakan beberapa replika</li>
    </ul>
    <p>Untuk detailnya, silakan merujuk ke <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">whitepaper ini</a> dan <a href="https://github.com/zilliztech/VectorDBBench">kode uji benchmark terkait</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">Ringkasan<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>Dibandingkan dengan Milvus 2.1, QPS Milvus 2.2.0 meningkat lebih dari 48% dalam mode cluster dan lebih dari 75% dalam mode mandiri.</li>
<li>Milvus 2.2.0 memiliki kemampuan yang mengesankan untuk meningkatkan dan mengurangi:<ul>
<li>QPS meningkat secara linear ketika memperluas core CPU dari 8 menjadi 32.</li>
<li>QPS meningkat secara linear ketika memperluas replika Querynode dari 1 hingga 8.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">Terminologi<button data-href="#Terminology" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary>Klik untuk melihat detail istilah yang digunakan dalam pengujian</summary>
<table class="terminology">
<thead>
<tr>
<th>Istilah</th>
<th>Deskripsi</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Jumlah vektor yang akan dicari dalam satu permintaan pencarian</td>
</tr>
<tr>
<td>topk</td>
<td>Jumlah vektor terdekat yang akan diambil untuk setiap vektor (dalam nq) dalam permintaan pencarian</td>
</tr>
<tr>
<td>ef</td>
<td>Parameter pencarian khusus untuk <a href="https://milvus.io/docs/v2.2.x/index.md">indeks HNSW</a></td>
</tr>
<tr>
<td>RT</td>
<td>Waktu respons dari mengirim permintaan hingga menerima respons</td>
</tr>
<tr>
<td>QPS</td>
<td>Jumlah permintaan pencarian yang berhasil diproses per detik</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Lingkungan pengujian<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Semua pengujian dilakukan di bawah lingkungan berikut ini.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Lingkungan perangkat keras</h3><table>
<thead>
<tr><th>Perangkat keras</th><th>Spesifikasi</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>Intel® Xeon® Gold 6226R CPU @ 2,90GHz</td></tr>
<tr><td>Memori</td><td>RDIMM 16 * \ 32 GB, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Lingkungan perangkat lunak</h3><table>
<thead>
<tr><th>Perangkat lunak</th><th>Versi</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Skema penyebaran</h3><ul>
<li>Instance Milvus (mandiri atau klaster) digunakan melalui <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> pada klaster Kubernetes berdasarkan mesin fisik atau virtual.</li>
<li>Pengujian yang berbeda hanya bervariasi dalam jumlah inti CPU, ukuran memori, dan jumlah replika (node pekerja), yang hanya berlaku untuk cluster Milvus.</li>
<li>Konfigurasi yang tidak ditentukan identik dengan <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">konfigurasi default</a>.</li>
<li>Ketergantungan Milvus (MinIO, Pulsar, dan Etcd) menyimpan data pada SSD lokal di setiap node.</li>
<li>Permintaan pencarian dikirim ke instance Milvus melalui <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Kumpulan data</h3><p>Pengujian ini menggunakan dataset sumber terbuka SIFT (128 dimensi) dari <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">Pipeline pengujian<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Mulai instans Milvus dengan Helm dengan konfigurasi server masing-masing seperti yang tercantum dalam setiap pengujian.</li>
<li>Hubungkan ke instance Milvus melalui Milvus GO SDK dan dapatkan hasil pengujian yang sesuai.</li>
<li>Buat sebuah koleksi.</li>
<li>Masukkan 1 juta vektor SIFT. Buat indeks HNSW dan konfigurasikan parameter indeks dengan mengatur <code translate="no">M</code> ke <code translate="no">8</code> dan <code translate="no">efConstruction</code> ke <code translate="no">200</code>.</li>
<li>Memuat koleksi.</li>
<li>Cari dengan nomor konkuren yang berbeda dengan parameter pencarian <code translate="no">nq=1, topk=1, ef=64</code>, durasi setiap konkuren minimal 1 jam.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Hasil pengujian<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 vs. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">Cluster</h4><p><details>
<summary><b>Konfigurasi server (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>Kinerja pencarian</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT (TP99) / ms</th><th>RT (TP50) / ms</th><th>gagal / s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>Performa pencarian cluster</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">Mandiri</h4><p><details>
<summary><b>Konfigurasi server (mandiri)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>Kinerja pencarian</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT (TP99) / ms</th><th>RT (TP50) / ms</th><th>gagal / s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>Performa pencarian mandiri</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Peningkatan Skala Milvus 2.2.0</h3><p>Perluas inti CPU dalam satu Querynode untuk memeriksa kemampuan peningkatan skala.</p>
<p><details>
<summary><b>Konfigurasi server (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>Performa Pencarian</strong></p>
<table>
<thead>
<tr><th>Inti CPU</th><th>Jumlah bersamaan</th><th>QPS</th><th>RT (TP99) / ms</th><th>RT (TP50) / ms</th><th>gagal / s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>Performa pencarian berdasarkan inti CPU Querynode</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Peningkatan skala</h3><p>Perluas lebih banyak replika dengan lebih banyak Querynode untuk memeriksa kemampuan untuk melakukan scale-out.</p>
<div class="alert note">
<p>Catatan: jumlah Querynode sama dengan <code translate="no">replica_number</code> saat memuat koleksi.</p>
</div>
<p><details>
<summary><b>Konfigurasi server (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>Replika</th><th>Jumlah Serentak</th><th>QPS</th><th>RT (TP99) / ms</th><th>RT (TP50) / ms</th><th>gagal / s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>Performa pencarian dengan replika Querynode</span> </span></p>
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
<li>Coba lakukan pengujian benchmark Milvus 2.2.0 secara mandiri dengan mengacu pada <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">panduan ini</a>, kecuali Anda sebaiknya menggunakan Milvus 2.2 dan Pymilvus 2.2 dalam panduan ini.</li>
</ul>
