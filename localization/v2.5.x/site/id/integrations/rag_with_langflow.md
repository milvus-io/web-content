---
id: rag_with_langflow.md
summary: >-
  Panduan ini mendemonstrasikan cara menggunakan Langflow untuk membuat pipeline
  Retrieval-Augmented Generation (RAG) dengan Milvus.
title: Membangun Sistem RAG Menggunakan Langflow dengan Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Membangun Sistem RAG Menggunakan Langflow dengan Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini mendemonstrasikan cara menggunakan <a href="https://www.langflow.org/">Langflow</a> untuk membangun pipeline Retrieval-Augmented Generation (RAG) dengan <a href="https://milvus.io/">Milvus</a>.</p>
<p>Sistem RAG meningkatkan pembuatan teks dengan pertama-tama mengambil dokumen yang relevan dari basis pengetahuan dan kemudian menghasilkan respons baru berdasarkan konteks ini. Milvus digunakan untuk menyimpan dan mengambil penyematan teks, sementara Langflow memfasilitasi integrasi pengambilan dan pembuatan dalam alur kerja visual.</p>
<p>Langflow memungkinkan konstruksi yang mudah dari pipa RAG, di mana potongan-potongan teks disematkan, disimpan di Milvus, dan diambil ketika kueri yang relevan dibuat. Hal ini memungkinkan model bahasa untuk menghasilkan respons yang sesuai dengan konteks.</p>
<p>Milvus berfungsi sebagai basis data vektor yang dapat diskalakan yang dengan cepat menemukan teks yang mirip secara semantik, sementara Langflow memungkinkan Anda untuk mengatur bagaimana pipeline Anda menangani pengambilan teks dan pembuatan respons. Bersama-sama, keduanya menyediakan cara yang efisien untuk membangun pipeline RAG yang kuat untuk aplikasi berbasis teks yang disempurnakan.</p>
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
    </button></h2><p>Sebelum menjalankan notebook ini, pastikan Anda telah menginstal dependensi berikut ini:</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">Tutorial<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah semua dependensi terinstal, mulai dasbor Langflow dengan mengetikkan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian sebuah dashboard akan muncul seperti yang ditunjukkan di bawah ini: <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>Kita ingin membuat sebuah proyek <strong>Vector Store</strong>, jadi pertama-tama kita perlu mengklik tombol <strong>New Project.</strong> Sebuah panel akan muncul, dan kita pilih opsi <strong>Vector Store RAG</strong>: <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Setelah proyek Vector Store Rag berhasil dibuat, penyimpanan vektor defaultnya adalah AstraDB, sedangkan kita ingin menggunakan Milvus. Jadi kita perlu mengganti kedua modul astraDB ini dengan Milvus agar dapat menggunakan Milvus sebagai vektor store. <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Langkah-langkah untuk mengganti astraDB dengan Milvus:</h3><ol>
<li>Hapus kartu-kartu yang ada di Vector Store. Klik pada dua kartu AstraDB yang ditandai dengan warna merah pada gambar di atas, dan tekan <strong>backspace</strong> untuk menghapusnya.</li>
<li>Klik pada opsi <strong>Vector Store</strong> pada bilah sisi, pilih Milvus dan seret ke dalam kanvas. Lakukan ini dua kali karena kita membutuhkan 2 kartu Milvus, satu untuk menyimpan alur kerja pemrosesan file dan satu lagi untuk alur kerja pencarian.</li>
<li>Tautkan Modul Milvus ke komponen lainnya. Lihat gambar di bawah ini untuk referensi.</li>
<li>Konfigurasikan kredensial Milvus untuk kedua modul Milvus. Cara yang paling sederhana adalah dengan menggunakan Milvus Lite dengan mengatur Connection URI ke milvus_demo.db. Jika Anda memiliki server Milvus yang digunakan sendiri atau di Zilliz Cloud, atur Connection URI ke server endpoint dan Connection Password ke token (untuk Milvus yang digabungkan &quot;<username>:<password>&quot;, untuk Zilliz Cloud adalah API Key). Lihat gambar di bawah ini untuk referensi:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Demo Struktur Milvus</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Menanamkan pengetahuan ke dalam sistem RAG</h3><ol>
<li>Unggah sebuah file sebagai basis pengetahuan LLM melalui modul file di bagian kiri bawah. Di sini kami mengunggah sebuah file yang berisi pengenalan singkat tentang Milvus</li>
<li>Jalankan alur kerja penyisipan dengan menekan tombol run pada modul Milvus di kanan bawah. Ini akan menyisipkan pengetahuan ke dalam penyimpanan vektor Milvus</li>
<li>Uji apakah pengetahuan tersebut ada di dalam memori. Buka playground dan tanyakan apa saja yang berhubungan dengan file yang Anda unggah.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>mengapa milvus</span> </span></p>
