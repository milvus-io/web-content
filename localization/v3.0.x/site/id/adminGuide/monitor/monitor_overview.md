---
id: monitor_overview.md
title: Gambaran Umum Monitor
related_key: 'monitor, alert'
summary: >-
  Pelajari bagaimana Prometheus dan Grafana digunakan di Milvus untuk memantau
  dan memberikan peringatan terkait layanan.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Gambaran Umum Kerangka Kerja Pemantauan Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan bagaimana Milvus menggunakan Prometheus untuk memantau metrik dan Grafana untuk memvisualisasikan metrik serta membuat peringatan.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus di Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> adalah perangkat pemantauan dan peringatan sumber terbuka untuk implementasi Kubernetes. Prometheus mengumpulkan dan menyimpan metrik sebagai data deret waktu. Artinya, metrik disimpan bersama cap waktu saat direkam, bersama dengan pasangan kunci-nilai opsional yang disebut label.</p>
<p>Saat ini Milvus menggunakan komponen-komponen Prometheus berikut:</p>
<ul>
<li>Titik akhir (endpoint) Prometheus untuk mengambil data dari titik akhir yang ditetapkan oleh eksporter.</li>
<li>Operator Prometheus untuk mengelola instance pemantauan Prometheus secara efektif.</li>
<li>Kube-prometheus untuk menyediakan pemantauan klaster Kubernetes end-to-end yang mudah dioperasikan.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nama metrik<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Nama metrik yang valid di Prometheus terdiri dari tiga elemen: namespace, subsystem, dan nama. Ketiga elemen ini dihubungkan dengan tanda "_".</p>
<p>Namespace metrik Milvus yang dipantau oleh Prometheus adalah "milvus". Subsistem suatu metrik adalah salah satu dari berikut ini: "cdc", "cgo", "datacoord", "datanode", "indexnode", "logging", "meta", "msg_queue", "msgstream", "proxy", "querycoord", "querynode", "rootcoord", "storage", "streaming", "streamingcoord", "streamingnode", dan "wal". Beberapa metrik, seperti <code translate="no">milvus_build_info</code> dan <code translate="no">milvus_num_node</code>, tidak memiliki subsistem.</p>
<p>Misalnya, metrik Milvus yang menghitung jumlah total vektor yang di-query diberi nama <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Jenis metrik<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus mendukung empat jenis metrik:</p>
<ul>
<li>Counter: jenis metrik kumulatif yang nilainya hanya dapat bertambah atau disetel ulang ke nol saat sistem dimulai ulang.</li>
<li>Gauge: jenis metrik yang nilainya dapat naik maupun turun.</li>
<li>Histogram: jenis metrik yang dihitung berdasarkan bucket yang dapat dikonfigurasi. Contoh umum adalah durasi permintaan.</li>
<li>Ringkasan: jenis metrik yang mirip dengan histogram yang menghitung kuantil yang dapat dikonfigurasi selama jendela waktu geser.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Label metrik<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus membedakan sampel dengan nama metrik yang sama dengan memberi label. Label adalah atribut tertentu dari sebuah metrik. Metrik dengan nama yang sama harus memiliki nilai yang sama untuk bidang <code translate="no">variable_labels</code>. Tabel berikut mencantumkan nama dan arti label umum dari metrik Milvus.</p>
<table>
<thead>
<tr><th>Nama label</th><th>Definisi</th><th>Nilai</th></tr>
</thead>
<tbody>
<tr><td>“node_id”</td><td>Identitas unik dari suatu peran.</td><td>ID unik secara global yang dihasilkan oleh Milvus.</td></tr>
<tr><td>“status”</td><td>Status dari suatu operasi atau permintaan yang telah diproses.</td><td>"abandon", "success", atau "fail".</td></tr>
<tr><td>“query_type”</td><td>Jenis permintaan baca.</td><td>“search” atau "query".</td></tr>
<tr><td>“msg_type”</td><td>Jenis pesan.</td><td>"insert", "delete", "search", atau "query".</td></tr>
<tr><td>“segment_state”</td><td>Status segmen.</td><td>"Sealed", "Growing", "Flushed", "Flushing", "Dropped", atau "Importing".</td></tr>
<tr><td>“cache_state”</td><td>Status objek yang disimpan dalam cache.</td><td>“hit” atau "miss".</td></tr>
<tr><td>“cache_name”</td><td>Nama objek yang disimpan dalam cache. Label ini digunakan bersama dengan label "cache_state".</td><td>Misalnya: "CollectionID", "Schema", dll.</td></tr>
<tr><td>“channel_name”</td><td>Topik fisik di penyimpanan pesan (Pulsar atau Kafka).</td><td>Misalnya, "by-dev-rootcoord-dml_0", "by-dev-rootcoord-dml_255", dll.</td></tr>
<tr><td>“function_name”</td><td>Nama fungsi yang menangani permintaan tertentu.</td><td>Misalnya, "CreateCollection", "CreatePartition", "CreateIndex", dll.</td></tr>
<tr><td>“user_name”</td><td>Nama pengguna yang digunakan untuk otentikasi.</td><td>Nama pengguna sesuai pilihan Anda.</td></tr>
<tr><td>“index_task_status”</td><td>Status tugas indeks di penyimpanan meta.</td><td>"belum diterbitkan", "sedang berlangsung", "gagal", "selesai", atau "didaur ulang".</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana di Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> adalah platform visualisasi sumber terbuka yang dapat terhubung dengan semua sumber data. Dengan menampilkan metrik, Grafana membantu pengguna memahami, menganalisis, dan memantau data dalam jumlah besar.</p>
<p>Milvus menggunakan dasbor Grafana yang dapat disesuaikan untuk visualisasi metrik.</p>
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
    </button></h2><p>Setelah mempelajari alur kerja dasar pemantauan dan peringatan, pelajari:</p>
<ul>
<li><a href="/docs/id/monitor.md">Menerapkan layanan pemantauan</a></li>
<li><a href="/docs/id/visualize.md">Memvisualisasikan metrik Milvus</a></li>
<li><a href="/docs/id/alert.md">Membuat peringatan</a></li>
</ul>
