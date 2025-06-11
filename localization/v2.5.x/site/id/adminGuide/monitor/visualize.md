---
id: visualize.md
title: Memvisualisasikan Metrik
related_key: "monitor, alert"
summary: Pelajari cara memvisualisasikan metrik Milvus di Grafana.
---

<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Memvisualisasikan Metrik Milvus di Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
<p>Seperti yang dijelaskan dalam <a href="/docs/id/v2.5.x/monitor.md">panduan pemantauan</a>, metrik berisi informasi yang berguna seperti berapa banyak memori yang digunakan oleh komponen Milvus tertentu. Memantau metrik membantu Anda lebih memahami kinerja Milvus dan status berjalannya sehingga Anda dapat menyesuaikan alokasi sumber daya secara tepat waktu.</p>
<p>Visualisasi adalah grafik yang menunjukkan perubahan penggunaan sumber daya dari waktu ke waktu, yang memudahkan Anda untuk melihat dan mengetahui perubahan penggunaan sumber daya dengan cepat, terutama ketika suatu peristiwa terjadi.</p>
<p>Tutorial ini menggunakan Grafana, sebuah platform sumber terbuka untuk analisis deret waktu, untuk memvisualisasikan berbagai metrik kinerja cluster Milvus yang digunakan di Kubernetes (K8).</p>
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
<li>Anda telah <a href="/docs/id/v2.5.x/install_cluster-helm.md">menginstal cluster Milvus pada K8s)</a>.</li>
<li>Anda perlu <a href="/docs/id/v2.5.x/monitor.md">mengonfigurasi Prometheus</a> untuk memantau dan mengumpulkan metrik sebelum menggunakan Grafana untuk memvisualisasikan metrik. Jika pengaturan berhasil, Anda dapat mengakses Grafana di <code translate="no">http://localhost:3000</code>. Atau Anda juga dapat mengakses Grafana menggunakan Grafana default <code translate="no">user:password</code> dari <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Memvisualisasikan metrik menggunakan Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Unduh dan impor dasbor</h3><p>Unduh dan impor dasbor Milvus dari file JSON.</p>
<pre><code translate="no">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/deployments/monitor/grafana/milvus-dashboard.json</span>
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>Unduh_dan_impor</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Melihat metrik</h3><p>Pilih instance Milvus yang ingin Anda pantau. Kemudian Anda dapat melihat panel komponen Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Pilih instance</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Grafana_panel</span> </span></p>
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
<li>Jika Anda telah mengatur Grafana untuk memvisualisasikan metrik Milvus, Anda mungkin juga ingin melakukannya:<ul>
<li>Mempelajari cara <a href="/docs/id/v2.5.x/alert.md">membuat peringatan untuk layanan Milvus</a></li>
<li>Menyesuaikan <a href="/docs/id/v2.5.x/allocate.md">alokasi sumber daya</a> Anda</li>
<li><a href="/docs/id/v2.5.x/scaleout.md">Memperkecil atau memperbesar skala dalam cluster Milvus</a></li>
</ul></li>
<li>Jika Anda tertarik untuk meningkatkan versi Milvus,<ul>
<li>Baca <a href="/docs/id/v2.5.x/upgrade_milvus_cluster-operator.md">panduan untuk memutakhirkan cluster Milvus</a> dan <a href="/docs/id/v2.5.x/upgrade_milvus_standalone-operator.md">panduan untuk memutakhirkan Milvus mandiri</a>.</li>
</ul></li>
</ul>
