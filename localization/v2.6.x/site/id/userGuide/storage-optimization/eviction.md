---
id: eviction.md
title: PenggusuranCompatible with Milvus 2.6.4+
summary: >-
  Eviction mengelola sumber daya cache dari setiap QueryNode di Milvus. Ketika
  diaktifkan, secara otomatis menghapus data yang di-cache setelah ambang batas
  sumber daya tercapai, memastikan kinerja yang stabil dan mencegah kehabisan
  memori atau disk.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Penggusuran<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>Eviction mengelola sumber daya cache dari setiap QueryNode di Milvus. Ketika diaktifkan, fitur ini secara otomatis menghapus data yang ditembolok setelah ambang batas sumber daya tercapai, memastikan kinerja yang stabil dan mencegah kehabisan memori atau disk.</p>
<p>Penggusuran menggunakan kebijakan <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">Least Recently Used (LRU</a> ) untuk mendapatkan kembali ruang cache. Metadata selalu di-cache dan tidak pernah digusur, karena metadata sangat penting untuk perencanaan kueri dan biasanya berukuran kecil.</p>
<div class="alert note">
<p>Penggusuran harus diaktifkan secara eksplisit. Tanpa konfigurasi, data yang ditembolok akan terus terakumulasi hingga sumber daya habis.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Jenis penggusuran<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung dua mode penggusuran yang saling melengkapi<strong>(sinkronisasi</strong> dan <strong>asinkronisasi</strong>) yang bekerja bersama untuk manajemen sumber daya yang optimal:</p>
<table>
   <tr>
     <th><p>Aspek</p></th>
     <th><p>Penggusuran Sinkronisasi</p></th>
     <th><p>Penggusuran Asinkron</p></th>
   </tr>
   <tr>
     <td><p>Pemicu</p></td>
     <td><p>Selama kueri atau pencarian ketika penggunaan memori/disk melebihi batas internal.</p></td>
     <td><p>Thread latar belakang secara berkala memeriksa penggunaan dan memicu penggusuran ketika tanda air tinggi terlampaui.</p></td>
   </tr>
   <tr>
     <td><p>Perilaku</p></td>
     <td><p>Eksekusi kueri berhenti sementara cache diambil kembali. Penggusuran berlanjut hingga penggunaan turun di bawah watermark rendah.</p></td>
     <td><p>Berjalan terus menerus di latar belakang; menghapus data ketika penggunaan melebihi watermark tinggi hingga turun di bawah watermark rendah. Kueri tidak diblokir.</p></td>
   </tr>
   <tr>
     <td><p>Paling cocok untuk</p></td>
     <td><p>Beban kerja yang dapat mentoleransi lonjakan latensi singkat atau ketika penggusuran asinkronisasi tidak dapat mendapatkan kembali ruang dengan cukup cepat.</p></td>
     <td><p>Beban kerja yang sensitif terhadap latensi yang membutuhkan kinerja yang lancar. Ideal untuk manajemen sumber daya proaktif.</p></td>
   </tr>
   <tr>
     <td><p>Perhatian</p></td>
     <td><p>Menambahkan latensi ke kueri yang sedang berlangsung. Dapat menyebabkan waktu habis jika data yang dapat diambil kembali tidak mencukupi.</p></td>
     <td><p>Membutuhkan tanda air yang disetel dengan benar. Sedikit overhead sumber daya latar belakang.</p></td>
   </tr>
   <tr>
     <td><p>Konfigurasi</p></td>
     <td><p>Diaktifkan melalui <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Diaktifkan melalui <code translate="no">backgroundEvictionEnabled: true</code> (memerlukan <code translate="no">evictionEnabled: true</code>)</p></td>
   </tr>
</table>
<p><strong>Penyiapan</strong> yang<strong>disarankan</strong>:</p>
<p>Aktifkan kedua mode untuk keseimbangan optimal. Penggusuran asinkron mengelola penggunaan cache secara proaktif, sementara penggusuran sinkronisasi bertindak sebagai pengaman ketika sumber daya hampir habis.</p>
<div class="alert note">
<p>Untuk bidang dan indeks yang dapat digusur, unit penggusuran sesuai dengan perincian pemuatan-bidang skalar/vektor digusur berdasarkan potongan, dan indeks skalar/vektor digusur berdasarkan segmen.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Mengaktifkan penggusuran<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Konfigurasikan penggusuran di bawah <code translate="no">queryNode.segcore.tieredStorage</code> di <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Jenis</p></th>
     <th><p>Nilai</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Kasus penggunaan yang disarankan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Sakelar utama untuk strategi penggusuran. Default ke <code translate="no">false</code>. Mengaktifkan mode penggusuran sinkronisasi.</p></td>
     <td><p>Selalu setel ke <code translate="no">true</code> di Penyimpanan Berjenjang.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Menjalankan penggusuran secara asinkron di latar belakang. Memerlukan <code translate="no">evictionEnabled: true</code>. Setelan default ke <code translate="no">false</code>.</p></td>
     <td><p>Gunakan <code translate="no">true</code> untuk kinerja kueri yang lebih lancar; ini mengurangi frekuensi penggusuran sinkronisasi.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Mengonfigurasi tanda air<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanda air menentukan kapan penggusuran cache dimulai dan diakhiri untuk memori dan disk. Setiap jenis sumber daya memiliki dua ambang batas:</p>
<ul>
<li><p><strong>Tanda air tinggi:</strong> Penggusuran dimulai saat penggunaan melebihi nilai ini.</p></li>
<li><p><strong>Tanda air rendah:</strong> Penggusuran berlanjut hingga penggunaan turun di bawah nilai ini.</p></li>
</ul>
<div class="alert note">
<p>Konfigurasi ini hanya berlaku ketika <a href="/docs/id/eviction.md#Enable-eviction">penggusuran diaktifkan</a>.</p>
</div>
<p><strong>Contoh YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Jenis</p></th>
     <th><p>Rentang</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Kasus penggunaan yang disarankan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>mengambang</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Tingkat penggunaan memori di mana penggusuran berhenti.</p></td>
     <td><p>Mulai dari <code translate="no">0.75</code>. Turunkan sedikit jika memori QueryNode terbatas.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Tingkat penggunaan memori di mana penggusuran asinkron dimulai.</p></td>
     <td><p>Mulai dari <code translate="no">0.8</code>. Jaga jarak yang masuk akal dari watermark rendah (misalnya, 0.05-0.10) untuk mencegah pemicu yang sering terjadi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>mengambang</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Tingkat penggunaan disk di mana penggusuran berhenti.</p></td>
     <td><p>Mulai dari <code translate="no">0.75</code>. Sesuaikan lebih rendah jika I / O disk terbatas.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Tingkat penggunaan disk di mana penggusuran asinkron dimulai.</p></td>
     <td><p>Mulai di <code translate="no">0.8</code>. Jaga jarak yang masuk akal dari tanda air yang rendah (mis., 0,05-0,10) untuk mencegah pemicu yang sering terjadi.</p></td>
   </tr>
</table>
<p><strong>Praktik terbaik</strong>:</p>
<ul>
<li><p>Jangan menetapkan watermark tinggi atau rendah di atas ~0,80 untuk menyisakan ruang untuk penggunaan statis QueryNode dan ledakan waktu kueri.</p></li>
<li><p>Hindari kesenjangan yang besar antara watermark tinggi dan rendah; kesenjangan yang besar akan memperpanjang setiap siklus penggusuran dan dapat menambah latensi.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Mengonfigurasi TTL cache<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cache Time-to-Live (TTL)</strong> secara otomatis menghapus data yang ditembolok setelah durasi yang ditetapkan, meskipun ambang batas sumber daya tidak tercapai. TTL bekerja bersama penggusuran LRU untuk mencegah data yang sudah basi menempati cache tanpa batas waktu.</p>
<div class="alert note">
<p>Cache TTL membutuhkan <code translate="no">backgroundEvictionEnabled: true</code>, karena berjalan pada thread latar belakang yang sama.</p>
</div>
<p><strong>Contoh YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Tipe</p></th>
     <th><p>Satuan</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Kasus penggunaan yang disarankan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>bilangan bulat</p></td>
     <td><p>detik</p></td>
     <td><p>Durasi sebelum data yang di-cache kedaluwarsa. Item yang kedaluwarsa akan dihapus di latar belakang.</p></td>
     <td><p>Gunakan TTL pendek (jam) untuk data yang sangat dinamis; gunakan TTL panjang (hari) untuk kumpulan data yang stabil. Tetapkan 0 untuk menonaktifkan kedaluwarsa berbasis waktu.</p></td>
   </tr>
</table>
<h2 id="Configure-overcommit-ratio" class="common-anchor-header">Mengonfigurasi rasio overcommit<button data-href="#Configure-overcommit-ratio" class="anchor-icon" translate="no">
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
    </button></h2><p>Rasio overcommit menentukan berapa banyak cache yang dicadangkan sebagai penggusuran, yang memungkinkan QueryNodes untuk sementara melebihi kapasitas normal sebelum penggusuran meningkat.</p>
<div class="alert note">
<p>Konfigurasi ini hanya berlaku ketika <a href="/docs/id/eviction.md#Enable-eviction">penggusuran diaktifkan</a>.</p>
</div>
<p><strong>Contoh YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Evictable Memory Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of physical memory is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-comment"># Evictable Disk Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of disk capacity is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Tipe</p></th>
     <th><p>Rentang</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Kasus penggunaan yang disarankan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictableMemoryCacheRatio</code></p></td>
     <td><p>mengambang</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Bagian cache memori yang dialokasikan untuk data yang dapat digusur.</p></td>
     <td><p>Mulai dari <code translate="no">0.3</code>. Naikkan (0,5-0,7) untuk frekuensi penggusuran yang lebih rendah; turunkan (0,1-0,2) untuk kapasitas segmen yang lebih tinggi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">evictableDiskCacheRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Porsi cache disk yang dialokasikan untuk data yang dapat digusur.</p></td>
     <td><p>Gunakan rasio yang sama dengan memori kecuali jika I / O disk menjadi hambatan.</p></td>
   </tr>
</table>
<p><strong>Perilaku batas</strong>:</p>
<ul>
<li><p><code translate="no">1.0</code>: Semua cache dapat digusur - penggusuran jarang terjadi, tetapi lebih sedikit segmen yang muat per QueryNode.</p></li>
<li><p><code translate="no">0.0</code>: Tidak ada cache yang dapat digusur - penggusuran sering terjadi; lebih banyak segmen yang muat, tetapi latensi dapat meningkat.</p></li>
</ul>
