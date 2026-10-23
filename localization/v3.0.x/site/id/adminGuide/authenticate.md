---
id: authenticate.md
summary: Pelajari cara mengelola otentikasi pengguna di Milvus.
title: Otentikasi Akses Pengguna
---
<h1 id="Authenticate-User-Access" class="common-anchor-header">Otentikasi Akses Pengguna<button data-href="#Authenticate-User-Access" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara mengelola otentikasi pengguna di Milvus, termasuk mengaktifkan otentikasi, masuk sebagai pengguna, dan mengubah kredensial pengguna.</p>
<div class="alert note">
<ul>
<li><p>TLS dan otentikasi pengguna adalah dua pendekatan keamanan yang berbeda. Jika Anda telah mengaktifkan baik otentikasi pengguna maupun TLS di sistem Milvus Anda, Anda harus menyediakan nama pengguna, kata sandi, dan jalur file sertifikat. Untuk informasi tentang cara mengaktifkan TLS, lihat <a href="/docs/id/tls.md">Enkripsi Selama Transmisi</a>.</p></li>
<li><p>Potongan kode pada halaman ini menggunakan `new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> ` (Python) untuk berinteraksi dengan Milvus. SDK MilvusClient baru untuk bahasa pemrograman lain akan dirilis pada pembaruan mendatang.</p></li>
</ul>
</div>
<h2 id="Enable-user-authentication" class="common-anchor-header">Mengaktifkan otentikasi pengguna<button data-href="#Enable-user-authentication" class="anchor-icon" translate="no">
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
    </button></h2><div class="filter">
 <a href="#docker">Docker Compose</a>
 <a href="#helm"> Helm</a>
 <a href="#operator"> Milvus Operator</a>
</div>
<div class="filter-docker">
<p>Untuk mengaktifkan otentikasi pengguna pada server Milvus Anda, atur common.security.authorizationEnabled menjadi true di berkas konfigurasi Milvus <code translate="no">milvus.yaml</code>. Untuk informasi lebih lanjut mengenai konfigurasi, lihat <a href="https://milvus.io/docs/configure-docker.md?tab=component">Konfigurasi Milvus dengan Docker Compose</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
<span class="hljs-string">...</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-helm">
<p>Untuk mengaktifkan otentikasi pengguna pada server Milvus Anda, atur `authorizationEnabled` menjadi `true` di berkas konfigurasi Milvus ` <code translate="no">values.yaml</code>`. Untuk informasi lebih lanjut mengenai konfigurasi, lihat <a href="https://milvus.io/docs/configure-helm.md?tab=component">Konfigurasi Milvus dengan Helm Charts</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        authorizationEnabled: true
</span><span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-operator">
<p>Untuk mengaktifkan otentikasi, atur ` <code translate="no">spec.config.common.security.authorizationEnabled</code> ` menjadi ` <code translate="no">true</code> ` di CRD ` <code translate="no">Milvus</code> `. Untuk informasi lebih lanjut mengenai CRD Milvus, lihat <a href="https://milvus.io/docs/configure_operator.md?tab=component">Konfigurasi Milvus dengan Milvus Operator</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Connect-to-Milvus-with-authentication" class="common-anchor-header">Menghubungkan ke Milvus dengan otentikasi<button data-href="#Connect-to-Milvus-with-authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah mengaktifkan otentikasi, Anda perlu terhubung ke Milvus menggunakan nama pengguna dan kata sandi. Secara default, pengguna <code translate="no">root</code> dibuat dengan kata sandi <code translate="no">Milvus</code> saat Milvus dimulai. Berikut adalah contoh cara terhubung ke Milvus dengan otentikasi diaktifkan menggunakan pengguna <code translate="no">root</code> default:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use default `root` user to connect to Milvus</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
) 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Jika Anda gagal memberikan token yang valid saat terhubung ke Milvus dengan otentikasi yang diaktifkan, Anda akan menerima kesalahan gRPC.
</div>
<h2 id="Create-a-new-user" class="common-anchor-header">Buat pengguna baru<button data-href="#Create-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Saat terhubung sebagai <code translate="no">root</code>, buat pengguna dengan <code translate="no">create_user()</code>. Pilih kata sandi berpanjang 6–72 byte UTF-8, kecuali jika deployment Anda menggunakan <a href="/docs/id/authenticate.md#Password-requirements">batasan panjang kata sandi</a> khusus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># create a user</span>
client.create_user(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
)

<span class="hljs-comment"># verify the user has been created</span>

client.describe_user(<span class="hljs-string">&quot;user_1&quot;</span>)

<span class="hljs-comment"># output</span>
<span class="hljs-comment"># {&#x27;user_name&#x27;: &#x27;user_1&#x27;, &#x27;roles&#x27;: ()}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang membuat pengguna, lihat <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/create_user.md">create_user()</a>.</p>
<h2 id="Connect-to-Milvus-with-a-new-user" class="common-anchor-header">Terhubung ke Milvus dengan pengguna baru<button data-href="#Connect-to-Milvus-with-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Terhubung menggunakan kredensial pengguna yang baru dibuat:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># connect to milvus with the newly created user</span>

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;user_1:P@ssw0rd&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Update-user-password" class="common-anchor-header">Perbarui kata sandi pengguna<button data-href="#Update-user-password" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengubah kata sandi pengguna, masukkan kata sandi saat ini dan kata sandi baru yang memenuhi <a href="/docs/id/authenticate.md#Password-requirements">persyaratan kata sandi</a> yang sama.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># update password</span>

client.update_password(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
    new_password=<span class="hljs-string">&quot;P@ssw0rd123&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut mengenai pembaruan kata sandi pengguna, lihat fungsi ` <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/update_password.md">update_password()</a>`.</p>
<p>Jika Anda lupa kata sandi lama, Milvus menyediakan opsi konfigurasi yang memungkinkan Anda menunjuk pengguna tertentu sebagai pengguna super. Hal ini menghilangkan kebutuhan akan kata sandi lama saat Anda mereset kata sandi.</p>
<p>Secara default, kolom ` <code translate="no">common.security.superUsers</code> ` dalam berkas konfigurasi Milvus kosong, artinya semua pengguna harus memasukkan kata sandi lama saat mereset kata sandi mereka. Namun, Anda dapat menunjuk pengguna tertentu sebagai pengguna super yang tidak perlu memasukkan kata sandi lama. Dalam potongan kode di bawah ini, <code translate="no">root</code> dan <code translate="no">foo</code> ditunjuk sebagai pengguna super.</p>
<p>Anda harus menambahkan item konfigurasi di bawah ini ke dalam berkas konfigurasi Milvus yang mengatur pengoperasian instance Milvus Anda.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
    <span class="hljs-attr">security:</span>
        <span class="hljs-attr">superUsers:</span> <span class="hljs-string">root,</span> <span class="hljs-string">foo</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-user" class="common-anchor-header">Menghapus pengguna<button data-href="#Drop-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menghapus pengguna, gunakan metode ` <code translate="no">drop_user()</code> `.</p>
<pre><code translate="no" class="language-python">client.drop_user(user_name=<span class="hljs-string">&quot;user_1&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Untuk menghapus pengguna, Anda tidak boleh menjadi pengguna yang akan dihapus. Jika tidak, akan muncul pesan kesalahan.
</div>
<h2 id="List-all-users" class="common-anchor-header">Menampilkan daftar semua pengguna<button data-href="#List-all-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Menampilkan daftar semua pengguna.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># list all users</span>

client.list_users()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">Batasan<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Username-requirements" class="common-anchor-header">Persyaratan nama pengguna<button data-href="#Username-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Nama pengguna tidak boleh kosong atau melebihi 32 karakter. Nama pengguna harus dimulai dengan huruf dan hanya boleh berisi huruf, angka, atau garis bawah.</p>
<h3 id="Password-requirements" class="common-anchor-header">Persyaratan kata sandi<button data-href="#Password-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Kata sandi harus memiliki panjang 6–72 byte UTF-8 secara default. Setiap karakter ASCII menempati satu byte; karakter multibyte menempati lebih dari satu byte. Milvus tidak mensyaratkan kombinasi tertentu antara huruf besar, huruf kecil, angka, atau karakter khusus.</p>
<p>Untuk mengubah batas panjang, konfigurasikan <code translate="no">proxy.minPasswordLength</code> dan <code translate="no">proxy.maxPasswordLength</code>. Batas maksimum tidak boleh melebihi 72 byte. Nilai <code translate="no">proxy.maxPasswordLength</code> yang nol atau kurang, atau di atas 72, akan dianggap sebagai 72. Untuk petunjuk konfigurasi, lihat <a href="/docs/id/dynamic_config.md">Konfigurasi Milvus Secara Langsung</a>.</p>
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
    </button></h2><ul>
<li>Anda mungkin juga ingin mempelajari cara:
<ul>
<li><a href="/docs/id/scaleout.md">Menskala kluster Milvus</a></li>
</ul></li>
<li>Jika Anda siap untuk menerapkan kluster Anda di cloud:
<ul>
<li>Pelajari cara <a href="/docs/id/eks.md">Mengimplementasikan Milvus di Amazon EKS dengan Terraform</a></li>
<li>Pelajari cara <a href="/docs/id/gcp.md">mengimplementasikan kluster Milvus di GCP menggunakan Kubernetes</a></li>
<li>Pelajari cara <a href="/docs/id/azure.md">mengimplementasikan Milvus di Microsoft Azure dengan Kubernetes</a></li>
</ul></li>
</ul>
