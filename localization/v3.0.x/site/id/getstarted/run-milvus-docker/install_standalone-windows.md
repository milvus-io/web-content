---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Pelajari cara menginstal Milvus versi mandiri menggunakan Docker Desktop untuk
  Windows.
title: Menjalankan Milvus di Docker (Windows)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Menjalankan Milvus di Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>Secara default, deployment ini menjalankan <strong>Woodpecker</strong> (sistem berkas lokal) sebagai antrian pesannya, sehingga tidak diperlukan layanan antrian pesan eksternal. Lihat <a href="/docs/id/woodpecker.md">Woodpecker</a>.</p>
</blockquote>
<p>Halaman ini menunjukkan cara menjalankan Milvus di Windows menggunakan Docker Desktop dengan backend WSL 2 dan kontainer Linux.</p>
<h2 id="Prerequisites" class="common-anchor-header">Persyaratan<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Instal Docker Desktop</a> dan penuhi persyaratan Windows serta perangkat kerasnya.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Instal Windows Subsystem for Linux 2 (WSL 2)</a>.</li>
<li>Jalankan Docker Desktop, aktifkan <strong>"Gunakan mesin berbasis WSL 2"</strong>, dan pilih kontainer Linux. Untuk perintah yang dijalankan di dalam distribusi WSL, aktifkan juga distribusi tersebut di bawah <strong>Pengaturan</strong> &gt; <strong>Sumber Daya</strong> &gt; <strong>Integrasi WSL</strong>. Lihat <a href="https://docs.docker.com/desktop/features/wsl/">backend WSL 2 Docker Desktop</a>.</li>
</ul>
<p>Lakukan pemeriksaan berikut di PowerShell atau Command Prompt Windows sebelum mengunduh berkas Milvus:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>Jenis OS Docker harus " <code translate="no">linux</code>". Contoh Compose menggunakan plugin " <code translate="no">docker compose</code> " (V2 atau yang lebih baru), bukan perintah " <code translate="no">docker-compose</code> " V1 yang sudah usang.</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Jalankan Milvus di Docker<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Pilih salah satu terminal berikut. Jalankan perintah di direktori kerja yang dapat ditulis; skrip tersebut menyimpan berkas konfigurasi dan direktori <code translate="no">volumes</code> di sana.</p>
<p>Skrip ini diunduh dari cabang Milvus <code translate="no">master</code>. Tag gambar Docker-nya ditentukan dalam skrip dan dapat berbeda dari v3.0.5. Untuk menerapkan rilis tersebut secara tepat, gunakan konfigurasi Docker Compose berversi di bawah ini.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Dari PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Unduh skrip, lalu jalankan Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>PowerShell memerlukan awalan <code translate="no">.\</code> untuk menjalankan skrip dari direktori kerja.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Dari Command Prompt Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan <code translate="no">curl.exe</code> untuk mengunduh skrip; <code translate="no">Invoke-WebRequest</code> adalah perintah PowerShell dan tidak dapat dijalankan di Command Prompt:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>Setelah menjalankan salah satu urutan perintah Windows berikut:</p>
<ul>
<li>Sebuah kontainer Docker bernama <strong>milvus-standalone</strong> melayani port <strong>19530</strong>.</li>
<li>Etcd tertanam berjalan di kontainer yang sama pada port <strong>2379</strong>. Berkas konfigurasinya mengacu pada <strong>embedEtcd.yaml</strong> di direktori kerja.</li>
<li>Milvus menyimpan data di ` <strong>volumes/milvus</strong> ` di direktori kerja.</li>
<li>Pengaturan pengganti (override) harus ditempatkan di <strong>berkas user.yaml</strong> di direktori kerja. Mulai ulang kontainer setelah mengubahnya.</li>
</ul>
<p>Perintah ` <code translate="no">start</code> ` menampilkan pesan " <code translate="no">Wait for Milvus Starting...</code> " dan kemudian memeriksa setiap detik hingga ` <code translate="no">docker ps</code> ` melaporkan bahwa kontainer dalam keadaan sehat. Pemeriksaan ini tidak memiliki batas waktu. Jika perintah tidak kembali, periksa log kontainer dari terminal lain dengan perintah ` <code translate="no">docker logs milvus-standalone</code>`. Skrip ini memulai kontainer dengan opsi ` <code translate="no">--security-opt seccomp:unconfined</code>`, sehingga kontainer berjalan tanpa profil seccomp default Docker.</p>
<div class="alert warning">
<blockquote>
<p>Skrip ini mempublikasikan port <strong>19530</strong>, <strong>9091</strong>, dan <strong>2379</strong> tanpa alamat host, dan ` <strong>embedEtcd.yaml</strong> ` mengatur etcd untuk mendengarkan di <code translate="no">http://0.0.0.0:2379</code>. Secara default, Docker Desktop mempublikasikan port-port tersebut di semua antarmuka jaringan, sehingga mesin lain yang dapat menjangkau komputer ini juga dapat terhubung ke Milvus dan etcd. Untuk membatasi akses ke komputer ini, edit opsi ` <code translate="no">-p</code> ` di ` <code translate="no">standalone.bat</code> ` sebelum baris pertama ` <code translate="no">start</code>`, misalnya ` <code translate="no">-p 127.0.0.1:19530:19530</code>`, dan hapus ` <code translate="no">-p 2379:2379</code> ` jika Anda tidak terhubung ke etcd dari luar kontainer. Jika kontainer <code translate="no">milvus-standalone</code> sudah ada, perintah <code translate="no">start</code> akan menjalankannya kembali dengan opsi aslinya. Untuk mengikat port yang dipublikasikan ke localhost secara default, lihat <a href="https://docs.docker.com/desktop/features/networking/">bagian Jaringan di Docker Desktop</a>.</p>
</blockquote>
</div>
<p>Periksa status gambar dan kontainer di salah satu terminal berikut:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>Untuk menghentikan Milvus dari PowerShell, jalankan ` <code translate="no">.\standalone.bat stop</code>`; dari Command Prompt, jalankan ` <code translate="no">standalone.bat stop</code>`. Jalankan ` <code translate="no">stop</code> ` sebelum ` <code translate="no">delete</code>`: setelah Anda mengonfirmasi, perintah ` <code translate="no">delete</code> ` akan mencoba menghapus kontainer dan kemudian menghapus folder <strong>volume</strong>, <strong>`embedEtcd.yaml`</strong>, dan <strong>`user.yaml`</strong>, meskipun kontainer masih berjalan dan belum dihapus. Cadangkan data sebelum menggunakannya.</p>
<h3 id="From-WSL-2" class="common-anchor-header">Dari WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Buka distribusi WSL yang telah Anda instal dari terminal Windows:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>Di terminal WSL, unduh skrip Linux dan jalankan Milvus sekali:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menghentikan Milvus, jalankan ` <code translate="no">bash standalone_embed.sh stop</code>`. Perintah ` <code translate="no">bash standalone_embed.sh delete</code> ` akan menghapus kontainer, konfigurasi, dan data; buat cadangan data sebelum menggunakannya.</p>
<p>Skrip Linux menjalankan Docker dengan perintah ` <code translate="no">sudo</code>`, mempublikasikan port-nya tanpa alamat host, dan memulai kontainer dengan perintah ` <code translate="no">--security-opt seccomp:unconfined</code>`. Catatan mengenai pengaturan ini dalam panduan <a href="/docs/id/install_standalone-docker.md">"Run Milvus in Docker (Linux)</a> " juga berlaku saat Anda menjalankannya di WSL 2.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Jalankan Milvus dengan Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan konfigurasi yang disertakan dalam rilis v3.0.5. Jalankan hanya urutan perintah yang sesuai untuk terminal Anda.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Dari PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Unduh konfigurasi dan cetak hash SHA-256-nya:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yaml
Get-FileHash docker-compose.yaml -Algorithm SHA256
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Dari Command Prompt Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Unduh konfigurasi dan tampilkan hash SHA-256-nya:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yaml
certutil -hashfile docker-compose.yaml SHA256
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">Dari WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Buka distribusi WSL Anda, lalu unduh konfigurasi dan tampilkan nilai hash SHA-256-nya:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml
<span class="hljs-built_in">sha256sum</span> docker-compose.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">Jalankan Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Bandingkan hash tersebut dengan ringkasan <code translate="no">sha256</code> yang tercantum untuk <code translate="no">milvus-standalone-docker-compose.yaml</code> di <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">halaman rilis v3.0.5</a>. <code translate="no">Get-FileHash</code> mencetak hash dalam huruf besar, sedangkan halaman rilis mencantumkannya dalam huruf kecil, jadi abaikan perbedaan huruf besar-kecil saat membandingkan. Kemudian jalankan Milvus dan periksa kontainer dari terminal yang sama:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>Konfigurasi ini memulai tiga kontainer yang berjalan dalam jangka panjang: <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-etcd</strong>. Konfigurasi ini juga menjalankan layanan satu kali ( <code translate="no">milvus-volume-init</code> ) untuk mempersiapkan kepemilikan direktori data. Data mereka dipetakan ke <strong>volumes/milvus</strong>, <strong>volumes/minio</strong>, dan <strong>volumes/etcd</strong> di direktori kerja. MinIO mengekspos port <strong>9000</strong> dan <strong>9001</strong>; Milvus mengekspos port <strong>19530</strong> dan <strong>9091</strong>. Konfigurasi ini mempublikasikan port-port tersebut di semua antarmuka jaringan, MinIO menggunakan kredensial default <code translate="no">minioadmin</code>, dan layanan <code translate="no">standalone</code> menetapkan <code translate="no">security_opt: seccomp:unconfined</code>. Untuk membatasi akses, mengubah kredensial, serta untuk perintah konfigurasi dan siklus hidup, lihat <a href="/docs/id/install_standalone-docker-compose.md">Jalankan Milvus dengan Docker Compose</a>.</p>
<h2 id="FAQs" class="common-anchor-header">Pertanyaan Umum<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">Bagaimana cara mengatasi kesalahan " <code translate="no">Docker Engine stopped</code> "?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus menggunakan kontainer Linux. Periksa Docker Desktop dan backend WSL 2-nya sebelum mencoba menginstal ulang:</p>
<ol>
<li><p>Aktifkan virtualisasi perangkat keras di BIOS/UEFI jika <strong>Task Manager</strong> &gt; <strong>Kinerja</strong> menunjukkan bahwa fitur tersebut dinonaktifkan. Lihat <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">persyaratan Docker Desktop untuk Windows</a>.</p></li>
<li><p>Jalankan Docker Desktop dari menu Start Windows dan tunggu hingga mesinnya berjalan. Hak akses administrator mungkin diperlukan untuk menginstal atau memperbarui WSL atau untuk mode instalasi Docker Desktop tertentu; hal ini bukanlah persyaratan umum untuk menjalankan kontainer Linux dengan backend WSL 2.</p></li>
<li><p>Periksa WSL dari terminal Windows. Jika perlu diperbarui, jalankan perintah pembaruan dengan hak akses yang diminta oleh Windows:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Aktifkan <strong>Gunakan mesin berbasis WSL 2</strong> di Docker Desktop. Jika menu Docker menawarkan <strong>Beralih ke kontainer Linux</strong>, pilih opsi tersebut. Jangan beralih ke kontainer Windows untuk memecahkan masalah pada gambar Milvus Linux.</p></li>
<li><p>Jalankan pemeriksaan berikut di terminal yang Anda gunakan untuk instalasi:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>Hasilnya harus " <code translate="no">linux</code>". Jika tidak dapat terhubung ke daemon, ikuti <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">panduan pemecahan masalah Docker Desktop</a> sebelum menjalankan kembali skrip Milvus. Hanya menjalank <code translate="no">com.docker.service</code> saja tidak menjamin bahwa mesin Linux WSL 2 sedang berjalan.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">Bagaimana cara mengatasi masalah terkait WSL saat menerapkan Milvus?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda mengalami masalah terkait WSL saat menjalankan Milvus dari WSL 2, Anda mungkin perlu memeriksa apakah Docker Desktop telah dikonfigurasi untuk menggunakan mesin berbasis WSL 2 sebagai berikut:</p>
<ol>
<li><p>Pastikan opsi “Gunakan mesin berbasis WSL 2” telah dicentang di <strong>Pengaturan</strong> &gt; <strong>Umum</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Gunakan mesin berbasis WSL 2 di Pengaturan Docker Desktop</span>
  
 </span></p></li>
<li><p>Pilih dari distribusi WSL 2 yang telah Anda instal mana yang ingin Anda aktifkan integrasi Docker-nya dengan membuka: <strong>Pengaturan</strong> &gt; <strong>Sumber Daya</strong> &gt; <strong>Integrasi WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Memilih distribusi WSL 2 di Pengaturan Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">Bagaimana cara mengatasi kesalahan terkait volume yang muncul saat Milvus dimulai dengan pesan “ <code translate="no">Read config failed</code> ”?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Pesan kesalahan “Read config failed” saat Milvus dimulai</span>
  
 </span></p>
<p>Untuk mengatasi kesalahan yang muncul saat Milvus dimulai yang berbunyi “Read config failed,” Anda perlu memeriksa apakah volume yang dipasang ke dalam kontainer Milvus sudah benar. Jika volume sudah dipasang dengan benar ke dalam kontainer, Anda dapat menggunakan perintah <code translate="no">docker exec</code> untuk masuk ke dalam kontainer dan menampilkan daftar folder <strong>/milvus/configs</strong> sebagai berikut:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Menampilkan daftar berkas konfigurasi Milvus</span>
  
 </span></p>
<div class="alert note">
<p>Storage V3 dinonaktifkan secara default. Aktifkan fitur ini sebelum menggunakan fitur-fitur yang bergantung padanya. Untuk persyaratan dan pertimbangan kompatibilitas, lihat <a href="/docs/id/storage-v3.md">Storage V3</a>.</p>
</div>
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
    </button></h2><p>Setelah menginstal Milvus di Docker, ikuti jalur <strong>"Gunakan server Milvus yang sudah ada</strong> " di <a href="/docs/id/quickstart.md">Panduan Cepat</a> dan hubungkan SDK ke <code translate="no">http://localhost:19530</code>. Jalur server ini tidak memerlukan Milvus Lite; blok koneksi <code translate="no">.db</code> lokal akan memulai database lokal terpisah alih-alih menggunakan kontainer ini.</p>
<p>Anda juga dapat:</p>
<ul>
<li><p>Periksa <a href="/docs/id/quickstart.md">Panduan Cepat</a> untuk melihat apa saja yang dapat dilakukan Milvus.</p></li>
<li><p>Pelajari operasi dasar Milvus:</p>
<ul>
<li><a href="/docs/id/manage_databases.md">Mengelola Basis Data</a></li>
<li><a href="/docs/id/manage-collections.md">Mengelola Koleksi</a></li>
<li><a href="/docs/id/manage-partitions.md">Mengelola Partisi</a></li>
<li><a href="/docs/id/insert-update-delete.md">Sisipkan, Upsert, &amp; Hapus</a></li>
<li><a href="/docs/id/single-vector-search.md">Pencarian Vektor Tunggal</a></li>
<li><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a></li>
</ul></li>
<li><p>Untuk penyebaran Compose, ikuti panduan " <a href="/docs/id/upgrade_milvus_standalone-docker.md">Memperbarui Milvus Standalone dengan Docker Compose</a>"; pastikan prosedur tersebut berfungsi di lingkungan Anda sebelum melakukan pembaruan.</p></li>
<li><p><a href="/docs/id/scaleout.md">Skalakan kluster Milvus</a> di Kubernetes. Prosedur tersebut menggunakan Helm dan tidak berlaku untuk penyebaran Docker ini.</p></li>
<li><p>Terapkan kluster Milvus Anda di cloud:</p>
<ul>
<li><a href="/docs/id/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>, antarmuka web yang intuitif untuk pemantauan dan pengelolaan Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk debugging Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://github.com/zilliztech/attu">Attu</a>, alat GUI sumber terbuka untuk pengelolaan Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/monitor.md">Pantau Milvus dengan Prometheus</a>.</p></li>
</ul>
