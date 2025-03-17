---
id: milvus_and_mcp.md
summary: >-
  Tutorial ini memandu Anda dalam menyiapkan server MCP untuk Milvus, yang
  memungkinkan aplikasi AI melakukan pencarian vektor, mengelola koleksi, dan
  mengambil data menggunakan perintah bahasa alami-tanpa menulis kueri basis
  data khusus.
title: Mengintegrasikan Milvus dengan MindsDB
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: Menghubungkan AI dengan Basis Data Vektor<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">Pendahuluan<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Model Context Protocol (MCP)</strong> adalah protokol terbuka yang memungkinkan aplikasi AI, seperti Claude dan Cursor, untuk berinteraksi dengan sumber data eksternal dan alat bantu dengan lancar. Baik Anda membangun aplikasi AI khusus, mengintegrasikan alur kerja AI, atau meningkatkan antarmuka obrolan, MCP menyediakan cara terstandardisasi untuk menghubungkan model bahasa besar (LLM) dengan data kontekstual yang relevan.</p>
<p>Tutorial ini memandu Anda dalam <strong>menyiapkan server MCP untuk Milvus</strong>, yang memungkinkan aplikasi AI melakukan pencarian vektor, mengelola koleksi, dan mengambil data menggunakan <strong>perintah bahasa alami-tanpa</strong>menulis kueri basis data khusus.</p>
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
    </button></h2><p>Sebelum menyiapkan server MCP, pastikan Anda memiliki:</p>
<ul>
<li>Python 3.10 atau lebih tinggi</li>
<li>Instance <a href="https://milvus.io/">Milvus</a> yang sedang berjalan</li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (disarankan untuk menjalankan server)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Memulai<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Cara yang disarankan untuk menggunakan server MCP ini adalah menjalankannya secara langsung dengan uv tanpa instalasi. Ini adalah bagaimana Claude Desktop dan Cursor dikonfigurasikan untuk menggunakannya dalam contoh di bawah ini.</p>
<p>Jika Anda ingin mengkloning repositori:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Maka Anda dapat menjalankan server secara langsung:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Aplikasi yang Didukung<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>Server MCP ini dapat digunakan dengan berbagai aplikasi AI yang mendukung Protokol Konteks Model, seperti:</p>
<ul>
<li><strong>Claude Desktop</strong>: Aplikasi desktop Anthropic untuk Claude</li>
<li><strong>Kursor</strong>: Editor kode bertenaga AI dengan dukungan MCP dalam fitur Composer-nya</li>
<li><strong>Klien MCP khusus lainnya</strong> Aplikasi apa pun yang mengimplementasikan spesifikasi klien MCP</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Menggunakan MCP dengan Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Instal <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>Buka file konfigurasi Claude:<ul>
<li>Pada macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Tambahkan konfigurasi berikut:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Mulai ulang Claude Desktop untuk menerapkan perubahan.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Menggunakan MCP dengan Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> juga mendukung alat MCP melalui fitur Agen di Composer. Anda dapat menambahkan server MCP Milvus ke Cursor dengan dua cara:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Opsi 1: Menggunakan UI Pengaturan Kursor</h3><ol>
<li>Buka <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Klik <code translate="no">+ Add New MCP Server</code>.</li>
<li>Isi:<ul>
<li>Ketik: <code translate="no">stdio</code></li>
<li>Nama: <code translate="no">milvus</code></li>
<li>Perintah:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Tip: Gunakan <code translate="no">127.0.0.1</code> dan bukan <code translate="no">localhost</code> untuk menghindari potensi masalah resolusi DNS.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Opsi 2: Menggunakan Konfigurasi Khusus Proyek (Direkomendasikan)</h3><ol>
<li>Buat berkas <code translate="no">.cursor/mcp.json</code> di <strong>direktori root proyek</strong> Anda:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Mulai ulang kursor untuk menerapkan konfigurasi.</li>
</ol>
<p>Setelah menambahkan server, Anda mungkin perlu menekan tombol refresh pada pengaturan MCP untuk mengisi daftar alat. Composer Agent akan secara otomatis menggunakan alat Milvus jika relevan dengan pertanyaan Anda.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Memverifikasi Integrasi<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk memastikan server MCP telah diatur dengan benar:</p>
<h3 id="For-Cursor" class="common-anchor-header">Untuk Kursor</h3><ol>
<li>Buka <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Konfirmasikan bahwa <code translate="no">&quot;Milvus&quot;</code> muncul dalam daftar server MCP.</li>
<li>Periksa apakah alat Milvus (misalnya, <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>) terdaftar.</li>
<li>Jika muncul kesalahan, lihat bagian <strong>Pemecahan Masalah</strong> di bawah ini.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Alat Server MCP untuk Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Server MCP ini menyediakan beberapa alat untuk <strong>mencari, menanyakan, dan mengelola data vektor di Milvus</strong>. Untuk lebih jelasnya, silakan lihat dokumentasi <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Alat Pencarian dan Kueri</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Mencari dokumen dengan menggunakan pencarian teks lengkap.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Melakukan pencarian kemiripan vektor pada sebuah koleksi.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Melakukan pencarian hibrida yang menggabungkan kemiripan vektor dan penyaringan atribut.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Melakukan pencarian kemiripan vektor dengan beberapa vektor kueri.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Kueri koleksi menggunakan ekspresi filter.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Menghitung entitas dalam koleksi.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Manajemen Koleksi</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → Membuat daftar semua koleksi dalam database.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Mendapatkan informasi rinci tentang koleksi.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Mendapatkan statistik tentang koleksi.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Membuat koleksi baru dengan skema tertentu.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Memuat koleksi ke dalam memori untuk pencarian dan kueri.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Melepaskan koleksi dari memori.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Mendapatkan informasi tentang segmen kueri.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Mendapatkan kemajuan pemuatan koleksi.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 Operasi Data</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Menyisipkan data ke dalam koleksi.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Menyisipkan data dalam kelompok untuk kinerja yang lebih baik.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Meng-upsert data ke dalam koleksi (menyisipkan atau memperbarui jika ada).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Menghapus entitas dari koleksi berdasarkan ekspresi filter.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Menambahkan bidang dinamis ke koleksi yang sudah ada.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Manajemen Indeks</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Membuat indeks pada bidang vektor.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Mendapatkan informasi tentang indeks dalam koleksi.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Variabel Lingkungan<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → URI server Milvus (dapat ditetapkan sebagai pengganti <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Token otentikasi opsional.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Nama basis data (standarnya adalah "default").</li>
</ul>
<h2 id="Development" class="common-anchor-header">Pengembangan<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menjalankan server secara langsung:</p>
<pre><code translate="no" class="language-bash">uv run server.<span class="hljs-property">py</span> --milvus-uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Contoh<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Menggunakan Claude Desktop</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Contoh 1: Mendaftar Koleksi</h4><pre><code translate="no">What are the collections I have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude kemudian akan menggunakan MCP untuk memeriksa informasi ini di Milvus DB.</p>
<pre><code translate="no">I&#x27;ll check what collections are available in your Milvus database.

&gt; View result from milvus-list-collections from milvus (local)

Here are the collections in your Milvus database:

1. rag_demo
2. test
3. chat_messages
4. text_collection
5. image_collection
6. customized_setup
7. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Contoh 2: Mencari Dokumen</h4><pre><code translate="no"><span class="hljs-title class_">Find</span> documents <span class="hljs-keyword">in</span> my text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude akan menggunakan kemampuan pencarian teks lengkap dari Milvus untuk menemukan dokumen yang relevan:</p>
<pre><code translate="no">I&#x27;ll search for documents about machine learning in your text_collection.

&gt; View result from milvus-text-search from milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based on your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Menggunakan Kursor</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Contoh: Membuat Koleksi</h4><p>Di dalam Cursor's Composer, Anda dapat bertanya:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor akan menggunakan server MCP untuk menjalankan operasi ini:</p>
<pre><code translate="no">I<span class="hljs-string">&#x27;ll create a new collection called &#x27;</span>articles<span class="hljs-string">&#x27; with the specified fields.

&gt; View result from milvus-create-collection from milvus (local)

Collection &#x27;</span>articles<span class="hljs-string">&#x27; has been created successfully with the following schema:
- title: string
- content: string
- vector: float vector[128]
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Pemecahan masalah<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Masalah Umum</h3><h4 id="Connection-Errors" class="common-anchor-header">Kesalahan Koneksi</h4><p>Jika Anda melihat kesalahan seperti &quot;Gagal menyambung ke server Milvus&quot;:</p>
<ol>
<li>Pastikan instans Milvus Anda berjalan: <code translate="no">docker ps</code> (jika menggunakan Docker)</li>
<li>Periksa URI yang benar dalam konfigurasi Anda</li>
<li>Pastikan tidak ada aturan firewall yang memblokir koneksi</li>
<li>Coba gunakan <code translate="no">127.0.0.1</code> alih-alih <code translate="no">localhost</code> pada URI</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Masalah Autentikasi</h4><p>Jika Anda melihat kesalahan autentikasi:</p>
<ol>
<li>Verifikasi <code translate="no">MILVUS_TOKEN</code> Anda sudah benar</li>
<li>Periksa apakah instans Milvus Anda memerlukan autentikasi</li>
<li>Pastikan Anda memiliki izin yang benar untuk operasi yang ingin Anda lakukan</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Alat Tidak Ditemukan</h4><p>Jika alat MCP tidak muncul di Claude Desktop atau Kursor:</p>
<ol>
<li>Mulai ulang aplikasi</li>
<li>Periksa log server untuk mengetahui adanya kesalahan</li>
<li>Pastikan server MCP berjalan dengan benar</li>
<li>Tekan tombol refresh pada pengaturan MCP (untuk Kursor)</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Mendapatkan Bantuan</h3><p>Jika Anda terus mengalami masalah:</p>
<ol>
<li>Periksa <a href="https://github.com/zilliztech/mcp-server-milvus/issues">Masalah GitHub</a> untuk masalah serupa</li>
<li>Bergabunglah dengan <a href="https://discord.gg/zilliz">Komunitas Zilliz Discord</a> untuk mendapatkan dukungan</li>
<li>Ajukan masalah baru dengan informasi rinci tentang masalah Anda</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan mengikuti tutorial ini, Anda sekarang memiliki <strong>server MCP</strong> yang berjalan, memungkinkan pencarian vektor bertenaga AI di Milvus. Baik Anda menggunakan <strong>Claude Desktop</strong> atau <strong>Cursor</strong>, Anda sekarang dapat melakukan kueri, mengelola, dan mencari database Milvus Anda menggunakan <strong>perintah bahasa alami - tanpa</strong>menulis kode database!</p>
