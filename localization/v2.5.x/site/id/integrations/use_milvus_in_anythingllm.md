---
id: use_milvus_in_anythingllm.md
summary: >-
  Panduan ini akan memandu Anda dalam mengonfigurasi Milvus sebagai basis data
  vektor di AnythingLLM, sehingga Anda dapat menyematkan, menyimpan, dan mencari
  dokumen Anda untuk pencarian dan obrolan cerdas.
title: Gunakan Milvus di AnythingLLM
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">Gunakan Milvus di AnythingLLM<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a> adalah aplikasi desktop AI yang kuat, berfokus pada privasi, dan all-in-one yang mendukung berbagai LLM, jenis dokumen, dan basis data vektor. Aplikasi ini memungkinkan Anda untuk membangun asisten pribadi seperti ChatGPT yang dapat berjalan secara lokal atau di-host dari jarak jauh, sehingga Anda dapat mengobrol secara cerdas dengan dokumen apa pun yang Anda berikan.</p>
<p>Panduan ini akan memandu Anda dalam mengonfigurasi Milvus sebagai basis data vektor di AnythingLLM, sehingga Anda dapat menyematkan, menyimpan, dan mencari dokumen Anda untuk pencarian dan obrolan yang cerdas.</p>
<blockquote>
<p>Tutorial ini didasarkan pada dokumentasi resmi AnythingLLM dan langkah-langkah penggunaan yang sebenarnya. Jika UI atau langkah-langkahnya berubah, silakan merujuk ke dokumen resmi terbaru dan jangan ragu untuk menyarankan perbaikan.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. Prasyarat<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs/install-overview.md">Milvus</a> terinstal secara lokal atau akun <a href="https://zilliz.com/cloud">Zilliz Cloud</a> </li>
<li><a href="https://anythingllm.com/desktop">AnythingLLM Desktop</a> sudah terinstal</li>
<li>Dokumen atau sumber data yang siap untuk diunggah dan disematkan (PDF, Word, CSV, halaman web, dll.)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. Mengonfigurasi Milvus sebagai Basis Data Vektor<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
<li>Buka AnythingLLM dan klik ikon <strong>pengaturan</strong> di sudut kiri bawah<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>Buka Pengaturan</span> </span></li>
</ol>
<ol start="2">
<li><p>Di menu sebelah kiri, pilih <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>Pilih Basis Data Vektor</span> </span></p></li>
<li><p>Pada menu tarik-turun Penyedia Basis Data Vektor, pilih <strong>Milvus</strong> (atau Zilliz Cloud)<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Pilih Milvus</span> </span></p></li>
<li><p>Isi detail koneksi Milvus Anda (untuk Milvus lokal). Berikut ini contohnya:</p>
<ul>
<li><strong>Alamat DB Milvus</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Nama Pengguna Milvus</strong>: <code translate="no">root</code></li>
<li><strong>Kata Sandi Milvus</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Koneksi Milvus</span> </span></li>
</ul>
<blockquote>
<p>Jika menggunakan Zilliz Cloud, masukkan Cluster Endpoint dan Token API Anda:</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Koneksi Zilliz Cloud</span> </span></p></li>
<li><p>Klik <strong>Simpan perubahan</strong> untuk menerapkan pengaturan Anda.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. Membuat Ruang Kerja dan Mengunggah Dokumen<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
<li><p>Masuk ke ruang kerja Anda dan klik ikon <strong>unggah</strong> untuk membuka dialog unggah dokumen<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>Buka Dialog Unggah</span> </span></p></li>
<li><p>Anda dapat mengunggah berbagai macam sumber data:</p>
<ul>
<li><strong>File lokal</strong>: PDF, Word, CSV, TXT, file audio, dll.</li>
<li><strong>Halaman web</strong>: Rekatkan URL dan ambil konten situs web secara langsung.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>Mengunggah Dokumen</span> </span></p></li>
<li><p>Setelah mengunggah atau mengambil, klik <strong>Pindah ke Ruang Kerja</strong> untuk memindahkan dokumen atau data ke ruang kerja Anda saat ini<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>Pindah ke Ruang Kerja</span> </span></p></li>
<li><p>Pilih dokumen atau data dan klik <strong>Simpan dan Sematkan</strong>. AnythingLLM akan secara otomatis memotong, menyematkan, dan menyimpan konten Anda di Milvus<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>Simpan dan Sematkan</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Mengobrol dan Mengambil Jawaban dari Milvus<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
<li>Kembali ke antarmuka obrolan ruang kerja dan ajukan pertanyaan. AnythingLLM akan mencari basis data vektor Milvus Anda untuk konten yang relevan dan menggunakan LLM untuk menghasilkan jawaban<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>Mengobrol dengan Dokumen</span> </span></li>
</ol>
<hr>
