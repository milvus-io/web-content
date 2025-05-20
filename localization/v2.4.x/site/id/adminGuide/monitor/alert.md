---
id: alert.md
title: Membuat peringatan
related_key: monitor and alert.
summary: Pelajari cara membuat peringatan untuk layanan Milvus di Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Membuat Peringatan untuk Layanan Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan mekanisme peringatan untuk layanan Milvus dan menjelaskan mengapa, kapan, dan bagaimana cara membuat peringatan di Milvus.</p>
<p>Dengan membuat peringatan, Anda dapat menerima notifikasi ketika nilai metrik tertentu melebihi ambang batas yang telah Anda tentukan sebelumnya.</p>
<p>Sebagai contoh, Anda membuat peringatan dan menetapkan 80 MB sebagai nilai maksimum untuk penggunaan memori oleh komponen Milvus. Jika penggunaan aktual melebihi angka yang telah ditetapkan, Anda akan menerima peringatan yang mengingatkan Anda bahwa penggunaan memori oleh komponen Milvus melebihi 80 MB. Setelah menerima peringatan tersebut, Anda dapat menyesuaikan alokasi sumber daya secara tepat dan tepat waktu untuk memastikan ketersediaan layanan.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Skenario untuk membuat peringatan<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Di bawah ini adalah beberapa skenario umum yang perlu Anda buat peringatannya.</p>
<ul>
<li>Penggunaan CPU atau memori oleh komponen Milvus terlalu tinggi.</li>
<li>Pod komponen Milvus hampir kehabisan ruang disk.</li>
<li>Pod komponen Milvus terlalu sering memulai ulang.</li>
</ul>
<p>Metrik berikut ini tersedia untuk konfigurasi peringatan:</p>
<table>
<thead>
<tr><th>Metrik</th><th>Deskripsi</th><th>Satuan ukuran</th></tr>
</thead>
<tbody>
<tr><td>Penggunaan CPU</td><td>Penggunaan CPU oleh komponen Milvus yang ditunjukkan oleh waktu berjalannya CPU.</td><td>Detik</td></tr>
<tr><td>Memori</td><td>Sumber daya memori yang dikonsumsi oleh komponen Milvus.</td><td>MB</td></tr>
<tr><td>Goroutines</td><td>Aktivitas eksekusi bersamaan dalam bahasa GO.</td><td>/</td></tr>
<tr><td>OS Threads</td><td>Thread, atau proses ringan dalam sistem operasi.</td><td>/</td></tr>
<tr><td>Proses yang Dibuka Fds</td><td>Jumlah deskriptor file yang digunakan saat ini.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Mengatur peringatan<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Panduan ini mengambil contoh membuat peringatan untuk penggunaan memori komponen Milvus. Untuk membuat jenis peringatan lain, silakan sesuaikan perintah Anda. Jika Anda menemukan masalah selama prosesnya, jangan ragu untuk bertanya di <a href="https://github.com/milvus-io/milvus/discussions">diskusi Github</a> atau membuat utas di <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prasyarat</h3><p>Tutorial ini mengasumsikan bahwa Anda telah menginstal dan mengkonfigurasi Grafana. Jika belum, kami sarankan untuk membaca <a href="/docs/id/v2.4.x/monitor.md">panduan pemantauan</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Menambahkan kueri baru</h3><p>Untuk menambahkan peringatan untuk penggunaan memori komponen Milvus, edit panel Memori. Kemudian, tambahkan kueri baru dengan metrik: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Menyimpan dasbor</h3><p>Simpan dasbor, dan tunggu beberapa menit untuk melihat peringatan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Alert_dashboard</span> </span></p>
<p>Kueri peringatan Grafana tidak mendukung variabel template. Oleh karena itu, Anda harus menambahkan kueri kedua tanpa variabel template dalam label. Kueri kedua diberi nama "A" secara default. Anda dapat mengganti namanya dengan mengklik dropdown.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Alert_query</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Menambahkan notifikasi peringatan</h3><p>Untuk menerima notifikasi peringatan, tambahkan &quot;saluran notifikasi&quot;. Kemudian, tentukan saluran di bidang &quot;Kirim ke&quot;.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>Alert_notification</span> </span></p>
<p>Jika peringatan berhasil dibuat dan dipicu, Anda akan menerima notifikasi seperti yang ditunjukkan pada gambar di bawah ini.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>Pesan_pemberitahuan</span> </span></p>
<p>Untuk menghapus peringatan, buka panel "Peringatan" dan klik tombol hapus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>Hapus_peringatan</span> </span></p>
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
<li>Jika Anda perlu memulai layanan pemantauan untuk Milvus:<ul>
<li>Baca <a href="/docs/id/v2.4.x/monitor.md">panduan pemantauan</a></li>
<li>Pelajari cara <a href="/docs/id/v2.4.x/visualize.md">memvisualisasikan metrik pemantauan</a></li>
</ul></li>
<li>Jika Anda telah membuat peringatan untuk penggunaan memori oleh komponen Milvus:<ul>
<li>Pelajari cara <a href="/docs/id/v2.4.x/allocate.md#standalone">mengalokasikan sumber daya</a></li>
</ul></li>
<li>Jika Anda mencari informasi tentang cara menskalakan cluster Milvus:<ul>
<li>Pelajari <a href="/docs/id/v2.4.x/scaleout.md">cara menskalakan cluster Milvus</a></li>
</ul></li>
</ul>
