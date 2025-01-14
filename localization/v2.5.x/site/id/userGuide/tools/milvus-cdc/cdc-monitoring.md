---
id: cdc-monitoring.md
order: 4
summary: >-
  Milvus-CDC menyediakan kemampuan pemantauan yang komprehensif melalui dasbor
  Grafana.
title: Pemantauan
---
<h1 id="Monitoring" class="common-anchor-header">Pemantauan<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC menyediakan kemampuan pemantauan yang komprehensif melalui dasbor Grafana, yang memungkinkan Anda memvisualisasikan metrik-metrik utama dan memastikan kelancaran tugas-tugas Change Data Capture (CDC) dan kesehatan server Anda.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Metrik untuk tugas CDC</h3><p>Untuk memulai, impor file <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> ke Grafana. Ini akan menambahkan dasbor yang dirancang khusus untuk memantau status tugas CDC.</p>
<p><strong>Ikhtisar Dasbor CDC Grafana</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>Penjelasan Metrik Utama:</strong></p>
<ul>
<li><p><strong>Tugas</strong>: Jumlah tugas CDC dalam berbagai status, termasuk <strong>Inisial</strong>, <strong>Berjalan</strong>, dan <strong>Dijeda</strong>.</p></li>
<li><p><strong>Total Permintaan</strong>: Jumlah total permintaan yang diterima oleh Milvus-CDC.</p></li>
<li><p><strong>Keberhasilan Permintaan</strong>: Jumlah permintaan yang berhasil diterima oleh Milvus-CDC.</p></li>
<li><p><strong>task num</strong>: Jumlah tugas dalam status <strong>Inisial</strong>, <strong>Jeda</strong>, dan <strong>Berjalan</strong> dari waktu ke waktu.</p></li>
<li><p><strong>task state</strong>: Status dari masing-masing tugas.</p></li>
<li><p><strong>jumlah permintaan</strong>: Jumlah permintaan yang berhasil dan total permintaan</p></li>
<li><p><strong>latensi permintaan</strong>: Latensi permintaan melalui p99, rata-rata, dan statistik lainnya.</p></li>
<li><p><strong>kecepatan data replikasi</strong>: Kecepatan data replikasi untuk operasi baca/tulis</p></li>
<li><p><strong>replicate tt lag</strong>: Jeda waktu replikasi untuk operasi baca/tulis.</p></li>
<li><p><strong>api execute count</strong>: Berapa kali API Milvus-CDC yang berbeda dieksekusi.</p></li>
<li><p><strong>center ts</strong>: Stempel waktu untuk tugas baca/tulis.</p></li>
</ul>
