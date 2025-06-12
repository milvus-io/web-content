---
id: milvus_and_n8n.md
summary: >-
  n8n adalah platform otomatisasi alur kerja sumber terbuka yang kuat yang
  memungkinkan Anda untuk menghubungkan berbagai aplikasi, layanan, dan API
  secara bersamaan untuk membuat alur kerja otomatis tanpa pengkodean. Dengan
  antarmuka visual berbasis node, n8n memungkinkan pengguna untuk membangun
  proses otomatisasi yang kompleks hanya dengan menghubungkan node yang mewakili
  layanan atau tindakan yang berbeda. Ini dapat dihosting sendiri, sangat dapat
  diperluas, dan mendukung kode adil dan lisensi perusahaan.
title: Memulai dengan Milvus dan n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Memulai dengan Milvus dan n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Pengantar n8n dan Node Penyimpanan Vektor Milvus<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> adalah platform otomatisasi alur kerja sumber terbuka yang kuat yang memungkinkan Anda untuk menghubungkan berbagai aplikasi, layanan, dan API bersama-sama untuk membuat alur kerja otomatis tanpa pengkodean. Dengan antarmuka visual berbasis node, n8n memungkinkan pengguna untuk membangun proses otomatisasi yang kompleks hanya dengan menghubungkan node yang mewakili layanan atau tindakan yang berbeda. Node ini dapat dihosting sendiri, sangat dapat diperluas, dan mendukung kode yang adil dan lisensi perusahaan.</p>
<p>Node <strong>Milvus Vector Store</strong> di n8n mengintegrasikan <a href="https://milvus.io/">Milvus</a> ke dalam alur kerja otomasi Anda. Hal ini memungkinkan Anda untuk melakukan pencarian semantik, sistem pengambilan daya - augmented generation (RAG), dan membangun aplikasi AI yang cerdas - semuanya dalam ekosistem n8n.</p>
<p>Dokumentasi ini terutama didasarkan pada <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">dokumentasi</a> resmi <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store</a>. Jika Anda menemukan konten yang ketinggalan zaman atau tidak konsisten, mohon memprioritaskan dokumentasi resmi dan jangan ragu untuk mengajukan masalah kepada kami.</p>
<h2 id="Key-Features" class="common-anchor-header">Fitur Utama<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan simpul Milvus Vector Store di n8n, Anda dapat:</p>
<ul>
<li>Berinteraksi dengan basis data Milvus Anda sebagai <a href="https://docs.n8n.io/glossary/#ai-vector-store">penyimpan vektor</a></li>
<li>Memasukkan dokumen ke dalam Milvus</li>
<li>Mendapatkan dokumen dari Milvus</li>
<li>Mengambil dokumen untuk diberikan kepada retriever yang terhubung ke <a href="https://docs.n8n.io/glossary/#ai-chain">rantai</a></li>
<li>Terhubung langsung ke <a href="https://docs.n8n.io/glossary/#ai-agent">agen</a> sebagai <a href="https://docs.n8n.io/glossary/#ai-tool">alat bantu</a></li>
<li>Memfilter dokumen berdasarkan metadata</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Pola Penggunaan Node<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menggunakan simpul Milvus Vector Store di n8n dengan pola-pola berikut.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Gunakan sebagai simpul biasa untuk menyisipkan dan mengambil dokumen</h3><p>Anda dapat menggunakan Milvus Vector Store sebagai simpul biasa untuk menyisipkan, atau mendapatkan dokumen. Pola ini menempatkan Milvus Vector Store dalam alur koneksi biasa tanpa menggunakan agen.</p>
<p>Lihat <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">contoh templat</a> ini untuk mengetahui cara membangun sistem yang menyimpan dokumen di Milvus dan mengambilnya untuk mendukung jawaban berbasis obrolan.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Menghubungkan langsung ke agen AI sebagai alat bantu</h3><p>Anda dapat menghubungkan simpul Penyimpanan Vektor Milvus secara langsung ke konektor alat <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">agen AI</a> untuk menggunakan penyimpanan vektor sebagai sumber daya saat menjawab pertanyaan.</p>
<p>Di sini, koneksinya adalah: Agen AI (konektor alat) -&gt; simpul Milvus Vector Store. Lihat <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">contoh template</a> ini di mana data disematkan dan diindeks di Milvus, dan Agen AI menggunakan penyimpanan vektor sebagai alat pengetahuan untuk menjawab pertanyaan.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Gunakan retriever untuk mengambil dokumen</h3><p>Anda dapat menggunakan simpul <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vector Store Retriever</a> dengan simpul Milvus Vector Store untuk mengambil dokumen dari simpul Milvus Vector Store. Hal ini sering digunakan dengan node <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">Rantai Pertanyaan dan Jawaban</a> untuk mengambil dokumen dari penyimpanan vektor yang sesuai dengan input obrolan yang diberikan.</p>
<p>Alur koneksi node yang umum terlihat seperti ini: Rantai Pertanyaan dan Jawaban (konektor Retriever) -&gt; Vector Store Retriever (konektor Vector Store) -&gt; Milvus Vector Store.</p>
<p>Lihat <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">contoh alur kerja</a> ini untuk melihat cara memasukkan data eksternal ke dalam Milvus dan membangun sistem tanya jawab semantik berbasis obrolan.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Gunakan Alat Bantu Jawaban Pertanyaan Penyimpanan Vektor untuk menjawab pertanyaan</h3><p>Pola lain menggunakan <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vector Store Question Answer Tool</a> untuk meringkas hasil dan menjawab pertanyaan dari simpul Milvus Vector Store. Daripada menghubungkan Milvus Vector Store secara langsung sebagai alat, pola ini menggunakan alat yang dirancang khusus untuk meringkas data dalam penyimpanan vektor.</p>
<p>Alur koneksi akan terlihat seperti ini: Agen AI (alat penghubung) -&gt; Alat Penjawab Pertanyaan Penyimpanan Vektor (alat penghubung Penyimpanan Vektor) -&gt; Penyimpanan Vektor Milvus.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Mode Operasi Node<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Node Milvus Vector Store mendukung beberapa mode operasi, masing-masing disesuaikan untuk kasus penggunaan alur kerja yang berbeda. Memahami mode-mode ini membantu merancang alur kerja yang lebih efektif.</p>
<p>Kami akan memberikan gambaran umum tingkat tinggi tentang mode operasi dan opsi yang tersedia di bawah ini. Untuk daftar lengkap parameter input dan opsi konfigurasi untuk setiap mode, silakan lihat <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">dokumentasi resmi</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Gambaran Umum Mode Operasi</h3><p>Node Milvus Vector Store mendukung empat mode yang berbeda:</p>
<ul>
<li><strong>Dapatkan Banyak</strong>: Mengambil banyak dokumen berdasarkan kesamaan semantik dengan sebuah perintah.</li>
<li><strong>Sisipkan Dokumen</strong>: Menyisipkan dokumen baru ke dalam koleksi Milvus Anda.</li>
<li><strong>Ambil Dokumen (Sebagai Penyimpanan Vektor untuk Rantai/Alat)</strong>: Gunakan simpul sebagai retriever dalam sistem berbasis rantai.</li>
<li><strong>Ambil Dokumen (Sebagai Alat untuk Agen AI)</strong>: Gunakan node sebagai sumber daya alat untuk agen AI selama tugas menjawab pertanyaan.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Opsi Node Tambahan</h3><ul>
<li><strong>Filter Metadata</strong> (Hanya mode Dapatkan Banyak): Menyaring hasil berdasarkan kunci metadata khusus. Beberapa bidang menerapkan kondisi AND.</li>
<li><strong>Hapus Koleksi</strong> (hanya mode Sisipkan Dokumen): Menghapus dokumen yang ada dari koleksi sebelum memasukkan dokumen baru.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Sumber Daya Terkait</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">Dokumentasi Integrasi n8n Milvus</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">Dokumentasi LangChain Milvus</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">Dokumentasi AI Tingkat Lanjut n8n</a></li>
</ul>
