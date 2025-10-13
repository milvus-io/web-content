---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Pelajari cara menginstal Milvus mandiri dengan Docker Desktop untuk Windows.
title: Jalankan Milvus di Docker (Linux)
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
    </button></h1><p>Halaman ini mendemonstrasikan cara menjalankan Milvus pada Windows menggunakan Docker Desktop untuk Windows.</p>
<h2 id="Prerequisites​" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Instal Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Instal Windows Subsystem for Linux 2 (WSL 2)</a>.</p></li>
<li><p>Instal Python 3.8+.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Menjalankan Milvus di Docker<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan skrip instalasi untuk menginstalnya sebagai kontainer Docker. Setelah Anda menginstal Docker Desktop pada Microsoft Windows, Anda dapat mengakses Docker CLI dari PowerShell atau Windows Command Prompt dalam mode <strong>administrator</strong> dan dari WSL 2. </p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Dari PowerShell atau Windows Command Prompt<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda lebih akrab dengan PowerShell atau Windows Command Prompt, prompt perintahnya adalah sebagai berikut.</p>
<ol>
<li><p>Buka Desktop Docker dalam mode administrator dengan mengeklik kanan dan memilih Jalankan <strong>sebagai administrator</strong>.</p></li>
<li><p>Unduh skrip instalasi dan simpan sebagai <code translate="no">standalone.bat</code>.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>Jalankan skrip yang diunduh untuk memulai Milvus sebagai kontainer Docker.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>Setelah menjalankan skrip instalasi.</p>
<ul>
<li><p>Kontainer docker bernama <strong>milvus-standalone</strong> telah dimulai pada port <strong>19530</strong>.</p></li>
<li><p>Sebuah embed etcd telah terinstal bersama dengan Milvus di dalam kontainer yang sama dan melayani di port <strong>2379</strong>. Berkas konfigurasinya dipetakan ke <strong>embedEtcd.yaml</strong> di dalam folder saat ini.</p></li>
<li><p>Volume data Milvus dipetakan ke <strong>volume/milvus</strong> dalam folder saat ini.</p></li>
</ul>
<p>Anda dapat menggunakan perintah berikut untuk mengelola kontainer Milvus dan data yang tersimpan.</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">Dari WSL 2<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda lebih suka memulai Milvus menggunakan perintah Linux dan skrip shell pada Windows, pastikan bahwa Anda sudah menginstal perintah WSL 2. Untuk detail tentang cara menginstal perintah WSL 2, Anda dapat merujuk ke <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">artikel Microsoft</a> ini.</p>
<ol>
<li><p>Mulai WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Unduh skrip instalasi</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mulai Milvus sebagai kontainer docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menggunakan perintah berikut untuk mengelola kontainer Milvus dan data yang tersimpan.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Menjalankan Milvus dengan Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda menginstal Docker Desktop pada Microsoft Windows, Anda dapat mengakses CLI Docker dari PowerShell atau Command Prompt Windows dalam mode <strong>administrator</strong>. Anda dapat menjalankan Docker Compose baik di PowerShell, Windows Command Prompt, atau WSL 2 untuk memulai Milvus.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Dari PowerShell atau Windows Command Prompt<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p>Buka Docker Desktop dalam mode administrator dengan mengeklik kanan dan memilih <strong>Run as administrator</strong>.</p></li>
<li><p>Jalankan perintah berikut ini di PowerShell atau Windows Command Prompt untuk mengunduh berkas konfigurasi Docker Compose untuk Milvus Standalone dan memulai Milvus.</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.3/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>Tergantung pada koneksi jaringan Anda, mengunduh citra untuk instalasi Milvus mungkin membutuhkan waktu beberapa saat. Setelah kontainer bernama <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-etcd</strong> aktif, Anda dapat menyaksikan bahwa</p>
<ul>
<li><p>Kontainer <strong>milvus-etcd</strong> tidak mengekspos port apa pun ke hos dan memetakan datanya ke <strong>volume/etcd</strong> dalam folder saat ini.</p></li>
<li><p>Kontainer <strong>milvus-minio</strong> melayani port <strong>9090</strong> dan <strong>9091</strong> secara lokal dengan kredensial autentikasi default dan memetakan datanya ke <strong>volume/minio</strong> dalam folder saat ini.</p></li>
<li><p>Kontainer <strong>milvus-standalone</strong> melayani port <strong>19530</strong> secara lokal dengan pengaturan default dan memetakan datanya ke <strong>volume/milvus</strong> di folder saat ini.</p></li>
</ul></li>
</ol>
<p>Anda juga dapat memanggil perintah Docker Compose versi Linux jika Anda telah menginstal WSL 2.</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Dari WSL 2<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Prosedurnya serupa dengan menggunakan Docker Compose untuk menginstal Milvus di sistem Linux.</p>
<ol>
<li><p>Mulai WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Unduh berkas konfigurasi Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.3/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mulai Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Pertanyaan Umum<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">Bagaimana cara mengatasi kesalahan <code translate="no">Docker Engine stopped</code>?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah Anda menginstal Docker Desktop pada Windows, Anda mungkin mengalami kesalahan <code translate="no">Docker Engine stopped</code> jika komputer Anda tidak terkonfigurasi dengan benar. Dalam kasus ini, Anda mungkin perlu melakukan pemeriksaan berikut.</p>
<ol>
<li><p>Periksa apakah virtualisasi diaktifkan.</p>
<p>Anda dapat memeriksa apakah virtualisasi telah diaktifkan dengan melihat tab <strong>Performa</strong> di <strong>Task Manager</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>Virtualisasi di Task Manager</span> </span></p>
<p>Jika virtualisasi dinonaktifkan, Anda mungkin perlu memeriksa pengaturan BIOS pada firmware motherboard. Cara untuk mengaktifkan virtualisasi dalam pengaturan BIOS bervariasi menurut vendor motherboard. Untuk motherboard ASUS, misalnya, Anda dapat merujuk ke <a href="https://www.asus.com/support/faq/1043786/">artikel ini</a> untuk mengaktifkan virtualisasi.</p>
<p>Kemudian, Anda perlu menghidupkan ulang komputer dan mengaktifkan Hyper-V. Untuk detailnya, lihat <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">artikel Microsoft</a> ini.</p></li>
<li><p>Periksa apakah Layanan Desktop Docker telah dimulai.</p>
<p>Anda dapat menjalankan perintah berikut untuk memulai Layanan Desktop Docker.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>Periksa apakah WSL telah terinstal dengan benar.</p>
<p>Anda dapat menjalankan perintah berikut untuk menginstal atau memperbarui perintah WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>Periksa apakah Docker Daemon telah dimulai.</p>
<p>Anda harus membuka direktori instalasi Docker Desktop dan menjalankan <code translate="no">.\DockerCli.exe -SwitchDaemon</code> untuk memulai Docker Daemon.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>Periksa apakah Anda telah memulai Docker Desktop dalam mode <strong>administrator</strong>.</p>
<p>Pastikan Anda telah memulai Docker Desktop dalam mode administrator. Untuk melakukannya, klik kanan pada <strong>Docker Desktop</strong> dan pilih <strong>Jalankan sebagai administrator</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>Memulai Docker Desktop sebagai Administrator</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Bagaimana cara mengatasi masalah terkait WSL saat men-deploy Milvus?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda mengalami masalah terkait WSL saat menjalankan Milvus dari WSL 2, Anda mungkin perlu memeriksa apakah Anda telah mengonfigurasi Docker Desktop untuk menggunakan mesin berbasis WSL 2 sebagai berikut.</p>
<ol>
<li><p>Pastikan bahwa "Gunakan mesin berbasis WSL 2" dicentang di <strong>Pengaturan</strong> &gt; <strong>Umum</strong>. </p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Gunakan mesin berbasis WSL 2 di Pengaturan Desktop Docker</span> </span></p></li>
<li><p>Pilih dari distribusi WSL 2 terinstal yang ingin Anda aktifkan integrasi Docker dengan membuka <strong>Pengaturan</strong> &gt; <strong>Sumber Daya</strong> &gt; <strong>Integrasi WSL</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Pilih distribusi WSL 2 di Pengaturan Desktop Docker</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Bagaimana cara menangani kesalahan terkait volume yang muncul selama startup Milvus yang berbunyi <code translate="no">Read config failed</code>?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
    </button></h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Prompt kesalahan baca konfigurasi gagal saat pengaktifan Milvus</span> </span></p>
<p>Untuk mengatasi kesalahan yang muncul saat pengaktifan Milvus yang berbunyi "Read config failed," Anda perlu memeriksa apakah volume yang dipasang ke dalam kontainer Milvus sudah benar. Jika volume sudah terpasang dengan benar ke dalam kontainer, Anda dapat menggunakan perintah <code translate="no">docker exec</code> untuk masuk ke dalam kontainer dan membuat daftar folder <strong>/milvus/configs</strong> sebagai berikut.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
    Membuat </span> <span class="img-wrapper"> <span>daftar berkas konfigurasi Milvus</span> </span></p>
<p></p>
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
    </button></h2><p>Setelah menginstal Milvus di Docker, Anda dapat:</p>
<ul>
<li><p>Memeriksa <a href="/docs/id/quickstart.md">Mulai Cepat</a> untuk melihat apa yang dapat dilakukan Milvus.</p></li>
<li><p>Mempelajari operasi dasar Milvus:</p>
<ul>
<li><a href="/docs/id/manage_databases.md">Mengelola Basis Data</a></li>
<li><a href="/docs/id/manage-collections.md">Mengelola Koleksi</a></li>
<li><a href="/docs/id/manage-partitions.md">Mengelola Partisi</a></li>
<li><a href="/docs/id/insert-update-delete.md">Menyisipkan, Menambah &amp; Menghapus</a></li>
<li><a href="/docs/id/single-vector-search.md">Pencarian Vektor Tunggal</a></li>
<li><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a></li>
</ul></li>
<li><p><a href="/docs/id/upgrade_milvus_cluster-helm.md">Tingkatkan Milvus Menggunakan Bagan Helm</a>.</p></li>
<li><p>Mengatur<a href="/docs/id/scaleout.md">skala cluster Milvus Anda</a>.</p></li>
<li><p>Menerapkan cluster Milvu Anda di awan:</p>
<ul>
<li><a href="/docs/id/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>, antarmuka web yang intuitif untuk pengamatan dan manajemen Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk men-debug Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://github.com/zilliztech/attu">Attu</a>, alat GUI sumber terbuka untuk manajemen Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/monitor.md">Memantau Milvus dengan Prometheus</a>.</p></li>
</ul>
