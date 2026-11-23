---
id: visualize.md
title: Menampilkan Metrik
related_key: 'monitor, alert'
summary: Pelajari cara menampilkan metrik Milvus di Grafana.
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Menampilkan Metrik Milvus di Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara memvisualisasikan metrik Milvus menggunakan Grafana.</p>
<p>Sebagaimana dijelaskan dalam <a href="/docs/id/monitor.md">panduan pemantauan</a>, metrik berisi informasi berguna seperti seberapa banyak memori yang digunakan oleh komponen Milvus tertentu. Memantau metrik membantu Anda memahami kinerja Milvus dan status operasinya dengan lebih baik sehingga Anda dapat menyesuaikan alokasi sumber daya secara tepat waktu.</p>
<p>Visualisasi adalah grafik yang menunjukkan perubahan penggunaan sumber daya dari waktu ke waktu, yang memudahkan Anda untuk dengan cepat melihat dan menyadari perubahan penggunaan sumber daya, terutama saat terjadi suatu peristiwa.</p>
<p>Tutorial ini menggunakan Grafana, sebuah platform sumber terbuka untuk analisis deret waktu, guna memvisualisasikan berbagai metrik kinerja dari sebuah kluster Milvus yang diimplementasikan di Kubernetes (K8s).</p>
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
    </button></h2><ul>
<li>Anda telah <a href="/docs/id/install_cluster-helm.md">menginstal kluster Milvus di K8s.</a></li>
<li>Anda perlu <a href="/docs/id/monitor.md">mengonfigurasi Prometheus</a> untuk memantau dan mengumpulkan metrik sebelum menggunakan Grafana untuk memvisualisasikan metrik tersebut. Jika pengaturan berhasil, Anda dapat mengakses Grafana di <code translate="no">http://localhost:3000</code>. Atau, Anda juga dapat mengakses Grafana menggunakan alamat Grafana default <code translate="no">user:password</code> atau <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Menampilkan metrik menggunakan Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Unduh dan impor dasbor<button data-href="#1-Download-and-import-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>Unduh dan impor dasbor Milvus dari berkas JSON.</p>
<pre><code translate="no" class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" /> 
   <span>Unduh_dan_impor</span>
  
 </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Lihat metrik<button data-href="#2-View-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Pilih instance Milvus yang ingin Anda pantau. Kemudian Anda akan melihat panel komponen Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" /> 
   <span>Pilih_instans</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" /> 
   <span>Panel_Grafana</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">Langkah selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Jika Anda telah mengatur Grafana untuk menampilkan metrik Milvus, Anda mungkin juga ingin:
<ul>
<li>Pelajari cara <a href="/docs/id/alert.md">membuat peringatan untuk layanan Milvus</a></li>
<li>Menyesuaikan <a href="/docs/id/allocate.md">alokasi sumber daya</a></li>
<li><a href="/docs/id/scaleout.md">Memperluas atau memperkecil kluster Milvus</a></li>
</ul></li>
<li>Jika Anda tertarik untuk meningkatkan versi Milvus,
<ul>
<li>Baca <a href="/docs/id/upgrade_milvus_cluster-operator.md">panduan untuk meng-upgrade kluster Milvus</a> dan <a href="/docs/id/upgrade_milvus_standalone-operator.md">panduan untuk meng-upgrade Milvus standalone</a>.</li>
</ul></li>
</ul>
