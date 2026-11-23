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
    </button></h1><p>Fitur log akses di Milvus memungkinkan pengelola server untuk merekam dan menganalisis perilaku akses pengguna, sehingga membantu memahami aspek-aspek seperti tingkat keberhasilan kueri dan alasan kegagalan.</p>
<p>Panduan ini memberikan petunjuk terperinci mengenai konfigurasi log akses di Milvus.</p>
<p>Konfigurasi log akses bergantung pada metode instalasi Milvus:</p>
<ul>
<li><strong>Instalasi Helm</strong>: Konfigurasikan di <code translate="no">values.yaml</code>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/configure-helm.md">Konfigurasi Milvus dengan Helm Charts</a>.</li>
<li><strong>Instalasi Docker</strong>: Konfigurasikan di <code translate="no">milvus.yaml</code>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/configure-docker.md">Konfigurasi Milvus dengan Docker Compose</a>.</li>
<li><strong>Instalasi Operator</strong>: Ubah <code translate="no">spec.components</code> di berkas konfigurasi. Untuk informasi lebih lanjut, lihat <a href="/docs/id/configure_operator.md">Konfigurasi Milvus dengan Milvus Operator</a>.</li>
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
    </button></h2><p>Pilih salah satu dari tiga opsi konfigurasi sesuai kebutuhan Anda:</p>
<ul>
<li><strong>Konfigurasi dasar</strong>: Untuk keperluan umum.</li>
<li><strong>Konfigurasi untuk file log akses lokal</strong>: Untuk menyimpan log secara lokal.</li>
<li><strong>Konfigurasi untuk mengunggah log akses lokal ke MinIO</strong>: Untuk penyimpanan cloud dan cadangan.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Konfigurasi dasar<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>Konfigurasi dasar melibatkan pengaktifan log akses dan penentuan nama berkas log atau penggunaan stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Menentukan apakah fitur log akses akan diaktifkan. Nilai defaultnya adalah <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Nama berkas log akses. Jika parameter ini dibiarkan kosong, log akses akan ditampilkan ke stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Konfigurasi untuk berkas log akses lokal<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>Konfigurasikan penyimpanan lokal untuk berkas log akses dengan parameter yang mencakup jalur berkas lokal, ukuran berkas, dan interval rotasi:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Parameter-parameter ini ditentukan jika ` <code translate="no">filename</code> ` tidak kosong.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Jalur file lokal tempat berkas log akses disimpan. Nilai defaultnya adalah ` <code translate="no">/tmp/milvus_access</code>`.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: Ukuran maksimum dalam MB yang diperbolehkan untuk satu berkas log akses. Jika ukuran berkas log mencapai batas ini, proses rotasi akan dipicu. Proses ini mengunci berkas log akses saat ini, membuat berkas log baru, dan menghapus isi berkas log asli. Nilai defaultnya adalah <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Interval waktu maksimum dalam detik yang diizinkan untuk rotasi satu berkas log akses. Saat mencapai interval waktu yang ditentukan, proses rotasi akan dipicu, yang mengakibatkan pembuatan berkas log akses baru dan penyegelan berkas sebelumnya. Nilai defaultnya adalah <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Jumlah maksimum berkas log akses yang telah disegel yang dapat disimpan. Jika jumlah berkas log akses yang telah disegel melebihi batas ini, berkas yang paling lama akan dihapus. Nilai defaultnya adalah <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Konfigurasi untuk mengunggah berkas log akses lokal ke MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>Aktifkan dan konfigurasikan pengaturan untuk mengunggah berkas log akses lokal ke MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Saat mengonfigurasi parameter MinIO, pastikan Anda telah menetapkan salah satu dari <code translate="no">maxSize</code> atau <code translate="no">rotatedTime</code>. Jika tidak, pengunggahan berkas log akses lokal ke MinIO mungkin tidak berhasil.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Apakah akan mengunggah berkas log akses lokal ke MinIO. Nilai defaultnya adalah <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Jalur penyimpanan objek untuk mengunggah berkas log akses. Nilai defaultnya adalah <code translate="no">access_log/</code>.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: Interval waktu yang diizinkan untuk mengunggah berkas log akses. Jika waktu unggah berkas log melebihi interval ini, berkas tersebut akan dihapus. Menetapkan nilai ke 0 akan menonaktifkan fitur ini. Nilai defaultnya adalah <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Konfigurasi pemformatan<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Format log default yang digunakan untuk semua metode adalah format <code translate="no">base</code>, yang tidak memerlukan asosiasi metode tertentu. Namun, jika Anda ingin menyesuaikan keluaran log untuk metode tertentu, Anda dapat mendefinisikan format log khusus dan menerapkannya ke metode yang terkait.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: Menentukan format log dengan metrik dinamis. Untuk informasi lebih lanjut, lihat <a href="#reference-supported-metrics">Metrik yang didukung</a>.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: Menampilkan daftar operasi Milvus yang menggunakan pemformatan ini. Untuk mengetahui nama-nama metode, lihat <strong>MilvusService</strong> dalam <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Metode Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Referensi: Metrik yang Didukung<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">$trace_id</code></td><td>TraceID yang terkait dengan akses tersebut</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Alamat IP pengguna</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nama pengguna</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Ukuran data respons</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Kode kesalahan khusus Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Pesan kesalahan terperinci</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nama basis data Milvus tujuan</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nama koleksi Milvus tujuan</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nama partisi Milvus tujuan (satu atau lebih)</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Waktu yang dibutuhkan untuk menyelesaikan akses</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Waktu saat log akses dicetak (biasanya setara deng <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Waktu dimulainya akses</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Waktu berakhirnya akses</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versi Milvus SDK yang digunakan oleh pengguna</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>Jenis kesalahan: <strong>system_error</strong> atau <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>Kolom keluaran dari permintaan</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>Awalan kluster yang ditetapkan di <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>Tingkat konsistensi permintaan</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>Bidang vektor dari permintaan pencarian atau pencarian hibrida</td></tr>
<tr><td><code translate="no">$nq</code></td><td>Jumlah vektor kueri dari permintaan pencarian atau pencarian hibrida</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>Parameter pencarian dari permintaan pencarian atau pencarian hibrida</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>Parameter kueri dari permintaan kueri</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>Waktu permintaan yang ditetapkan klien dalam metadata gRPC</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>Panjang setiap nilai templat ekspresi</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>Apakah permintaan upsert merupakan pembaruan parsial</td></tr>
</tbody>
</table>
