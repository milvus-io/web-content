---
id: monitor_overview.md
title: Ikhtisar Monitor
related_key: 'monitor, alert'
summary: >-
  Pelajari bagaimana Prometheus dan Grafana digunakan di Milvus untuk layanan
  montoring dan peringatan.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Gambaran umum kerangka kerja pemantauan Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan bagaimana Milvus menggunakan Prometheus untuk memantau metrik dan Grafana untuk memvisualisasikan metrik dan membuat peringatan.</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> adalah perangkat pemantauan dan peringatan sumber terbuka untuk implementasi Kubernetes. Prometheus mengumpulkan dan menyimpan metrik sebagai data deret waktu. Ini berarti bahwa metrik disimpan dengan stempel waktu saat direkam, bersama dengan pasangan nilai-kunci opsional yang disebut label.</p>
<p>Saat ini Milvus menggunakan komponen-komponen Prometheus berikut ini:</p>
<ul>
<li>Titik akhir Prometheus untuk menarik data dari titik akhir yang ditetapkan oleh eksportir.</li>
<li>Operator Prometheus untuk mengelola instance pemantauan Prometheus secara efektif.</li>
<li>Kube-prometheus untuk menyediakan pemantauan cluster Kubernetes end-to-end yang mudah dioperasikan.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nama metrik</h3><p>Nama metrik yang valid di Prometheus berisi tiga elemen: namespace, subsistem, dan nama. Ketiga elemen ini dihubungkan dengan &quot;_&quot;.</p>
<p>Ruang nama metrik Milvus yang dipantau oleh Prometheus adalah &quot;milvus&quot;. Bergantung pada peran yang dimiliki metrik, subsistemnya haruslah salah satu dari delapan peran berikut: &quot;rootcoord&quot;, &quot;proxy&quot;, &quot;querycoord&quot;, &quot;querynode&quot;, &quot;indexcoord&quot;, &quot;indexnode&quot;, &quot;datacoord&quot;, &quot;datanode&quot;.</p>
<p>Misalnya, metrik Milvus yang menghitung jumlah total vektor yang ditanyakan diberi nama <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Jenis metrik</h3><p>Prometheus mendukung empat jenis metrik:</p>
<ul>
<li>Penghitung: jenis metrik kumulatif yang nilainya hanya dapat bertambah atau disetel ulang ke nol pada saat restart.</li>
<li>Pengukur: jenis metrik yang nilainya bisa naik dan turun.</li>
<li>Histogram: jenis metrik yang dihitung berdasarkan bucket yang dapat dikonfigurasi. Contoh umum adalah durasi permintaan.</li>
<li>Ringkasan: jenis metrik yang mirip dengan histogram yang menghitung kuantil yang dapat dikonfigurasi selama jendela waktu geser.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Label metrik</h3><p>Prometheus membedakan sampel dengan nama metrik yang sama dengan memberi label. Label adalah atribut tertentu dari sebuah metrik. Metrik dengan nama yang sama harus memiliki nilai yang sama untuk bidang <code translate="no">variable_labels</code>. Tabel berikut mencantumkan nama dan arti label umum metrik Milvus.</p>
<table>
<thead>
<tr><th>Nama label</th><th>Definisi</th><th>Nilai</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>Identitas unik dari sebuah peran.</td><td>ID unik global yang dihasilkan oleh milvus.</td></tr>
<tr><td>"status"</td><td>Status operasi atau permintaan yang sedang diproses.</td><td>&quot;meninggalkan&quot;, &quot;sukses&quot;, atau &quot;gagal&quot;.</td></tr>
<tr><td>"tipe_query"</td><td>Jenis permintaan baca.</td><td>&quot;cari&quot; atau &quot;kueri&quot;.</td></tr>
<tr><td>"msg_type"</td><td>Jenis pesan.</td><td>&quot;masukkan&quot;, &quot;hapus&quot;, &quot;cari&quot;, atau &quot;kueri&quot;.</td></tr>
<tr><td>"segment_state"</td><td>Status sebuah segmen.</td><td>&quot;Disegel&quot;, &quot;Tumbuh&quot;, &quot;Memerah&quot;, &quot;Pembilasan&quot;, &quot;Menjatuhkan&quot;, atau &quot;Mengimpor&quot;.</td></tr>
<tr><td>"cache_state"</td><td>Status objek yang di-cache.</td><td>&quot;hit&quot; atau &quot;miss&quot;.</td></tr>
<tr><td>"cache_name"</td><td>Nama objek yang ditembolok. Label ini digunakan bersama dengan label &quot;cache_state&quot;.</td><td>Misalnya &quot;CollectionID&quot;, &quot;Schema&quot;, dll.</td></tr>
<tr><td>&quot;channel_name&quot;</td><td>Topik fisik dalam penyimpanan pesan (Pulsar atau Kafka).</td><td>Contoh: &quot;by-dev-rootcoord-dml_0&quot;, &quot;by-dev-rootcoord-dml_255&quot;, dsb.</td></tr>
<tr><td>"nama_fungsi"</td><td>Nama fungsi yang menangani permintaan tertentu.</td><td>Misalnya &quot;CreateCollection&quot;, &quot;CreatePartition&quot;, &quot;CreateIndex&quot;, dll.</td></tr>
<tr><td>"user_name"</td><td>Nama pengguna yang digunakan untuk autentikasi.</td><td>Nama pengguna pilihan Anda.</td></tr>
<tr><td>"index_task_status"</td><td>Status tugas indeks dalam penyimpanan meta.</td><td>&quot;belum diterbitkan&quot;, &quot;sedang dalam proses&quot;, &quot;gagal&quot;, &quot;selesai&quot;, atau &quot;didaur ulang&quot;.</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> adalah tumpukan visualisasi sumber terbuka yang dapat terhubung dengan semua sumber data. Dengan menarik metrik, Grafana membantu pengguna memahami, menganalisis, dan memantau data yang sangat besar.</p>
<p>Milvus menggunakan dasbor Grafana yang dapat disesuaikan untuk visualisasi metrik.</p>
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
    </button></h2><p>Setelah mempelajari alur kerja dasar pemantauan dan peringatan, pelajari:</p>
<ul>
<li><a href="/docs/id/monitor.md">Menerapkan layanan pemantauan</a></li>
<li><a href="/docs/id/visualize.md">Memvisualisasikan metrik Milvus</a></li>
<li><a href="/docs/id/alert.md">Membuat peringatan</a></li>
</ul>
