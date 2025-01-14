---
id: configure_access_logs.md
title: Mengonfigurasi Log Akses
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Mengonfigurasi Log Akses<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Fitur log akses di Milvus memungkinkan manajer server untuk mencatat dan menganalisis perilaku akses pengguna, membantu dalam memahami aspek-aspek seperti tingkat keberhasilan kueri dan alasan kegagalan.</p>
<p>Panduan ini memberikan instruksi terperinci tentang cara mengonfigurasi log akses di Milvus.</p>
<p>Konfigurasi log akses tergantung pada metode instalasi Milvus:</p>
<ul>
<li><strong>Instalasi Helm</strong>: Konfigurasi di <code translate="no">values.yaml</code>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/configure-helm.md">Mengkonfigurasi Milvus dengan Helm Charts</a>.</li>
<li><strong>Instalasi Docker</strong>: Konfigurasikan di <code translate="no">milvus.yaml</code>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/configure-docker.md">Mengkonfigurasi Milvus dengan Docker Compose</a>.</li>
<li><strong>Instalasi Operator</strong>: Ubah <code translate="no">spec.components</code> dalam berkas konfigurasi. Untuk informasi lebih lanjut, lihat <a href="/docs/id/configure_operator.md">Mengkonfigurasi Milvus dengan Operator Milvus</a>.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opsi konfigurasi<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Pilih di antara tiga opsi konfigurasi berdasarkan kebutuhan Anda:</p>
<ul>
<li><strong>Konfigurasi dasar</strong>: Untuk keperluan umum.</li>
<li><strong>Config untuk file log akses lokal:</strong> Untuk menyimpan log secara lokal.</li>
<li><strong>Config untuk mengunggah log akses lokal ke MinIO</strong>: Untuk penyimpanan dan pencadangan cloud.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Konfigurasi dasar</h3><p>Konfigurasi dasar melibatkan pengaktifan log akses dan menentukan nama file log atau menggunakan stdout.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Apakah akan mengaktifkan fitur log akses. Defaultnya adalah <strong>false (salah</strong>).</li>
<li><code translate="no">proxy.accessLog.filename</code>: Nama file log akses. Jika Anda membiarkan parameter ini kosong, log akses akan dicetak ke stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Konfigurasi untuk file log akses lokal</h3><p>Mengkonfigurasi penyimpanan lokal untuk file log akses dengan parameter yang mencakup jalur file lokal, ukuran file, dan interval rotasi:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Parameter ini ditentukan bila <code translate="no">filename</code> tidak kosong.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Jalur file lokal tempat file log akses disimpan.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: Ukuran maksimum dalam MB yang diperbolehkan untuk satu file log akses. Jika ukuran file log mencapai batas ini, proses rotasi akan dipicu. Proses ini akan menyegel file log akses saat ini, membuat file log baru, dan menghapus isi file log asli.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Interval waktu maksimum dalam detik yang diizinkan untuk memutar file log akses tunggal. Setelah mencapai interval waktu yang ditentukan, proses rotasi akan dipicu, menghasilkan pembuatan file log akses baru dan menyegel file log sebelumnya.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Jumlah maksimum file log akses tersegel yang dapat disimpan. Jika jumlah file log akses tersegel melebihi batas ini, file log akses yang paling lama akan dihapus.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Config untuk mengunggah file log akses lokal ke MinIO</h3><p>Aktifkan dan konfigurasikan pengaturan untuk mengunggah file log akses lokal ke MinIO:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Saat mengonfigurasi parameter MinIO, pastikan Anda telah menetapkan <code translate="no">maxSize</code> atau <code translate="no">rotatedTime</code>. Jika tidak, hal ini dapat menyebabkan kegagalan pengunggahan file log akses lokal ke MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Apakah akan mengunggah file log akses lokal ke MinIO. Defaultnya adalah <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Jalur penyimpanan objek untuk mengunggah file log akses.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: Interval waktu yang diizinkan untuk mengunggah file log akses. Jika waktu pengunggahan file log melebihi interval ini, file akan dihapus. Mengatur nilai ke 0 akan menonaktifkan fitur ini.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Konfigurasi pemformat<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Format log default yang digunakan untuk semua metode adalah format <code translate="no">base</code>, yang tidak memerlukan asosiasi metode tertentu. Namun, jika Anda ingin menyesuaikan output log untuk metode tertentu, Anda dapat menentukan format log khusus dan menerapkannya pada metode yang terkait.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Menentukan format log dengan metrik dinamis. Untuk informasi lebih lanjut, lihat <a href="#reference-supported-metrics">Metrik yang didukung</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Mencantumkan operasi Milvus yang menggunakan pemformat ini. Untuk mendapatkan nama metode, lihat <strong>MilvusService</strong> di <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">metode Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Referensi: Metrik yang didukung<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Nama Metrik</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nama metode</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Status akses: <strong>OK</strong> atau <strong>Gagal</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Ekspresi yang digunakan untuk operasi kueri, pencarian, atau penghapusan</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID yang terkait dengan akses</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Alamat IP pengguna</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nama pengguna</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Ukuran data respons</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Kode kesalahan khusus untuk Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Pesan kesalahan terperinci</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nama pangkalan data Milvus target</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nama koleksi Milvus target</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nama atau nama-nama partisi Milvus target</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Waktu yang dibutuhkan untuk menyelesaikan akses</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Waktu saat log akses dicetak (biasanya setara dengan <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Waktu saat akses dimulai</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Waktu di mana akses berakhir</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versi SDK Milvus yang digunakan oleh pengguna</td></tr>
</tbody>
</table>
