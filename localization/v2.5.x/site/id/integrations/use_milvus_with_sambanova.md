---
id: use_milvus_with_sambanova.md
summary: >-
  Tutorial ini memanfaatkan integrasi Milvus dalam SambaNova AI Starter Kits
  untuk membangun sistem Enterprise Knowledge Retrieval, mirip dengan RAG
  (Retrieval-Augmented Generation), untuk mengambil dan menjawab berdasarkan
  dokumen pribadi perusahaan.
title: Menggunakan Milvus dengan SambaNova
---
<h1 id="Use-Milvus-with-SambaNova" class="common-anchor-header">Menggunakan Milvus dengan SambaNova<button data-href="#Use-Milvus-with-SambaNova" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://sambanova.ai/">SambaNova</a> adalah platform teknologi AI inovatif yang mempercepat penerapan AI canggih dan kemampuan pembelajaran mendalam. Dirancang untuk penggunaan perusahaan, platform ini memberdayakan organisasi untuk memanfaatkan AI generatif untuk meningkatkan kinerja dan efisiensi. Dengan menyediakan solusi mutakhir seperti SambaNova Suite dan DataScale, platform ini memungkinkan perusahaan untuk mengekstrak wawasan berharga dari data mereka, mendorong peningkatan operasional, dan mendorong peluang baru dalam lanskap AI.</p>
<p><a href="https://github.com/sambanova/ai-starter-kit">SambaNova AI Starter Kits</a> adalah kumpulan sumber daya open-source yang dirancang untuk membantu para pengembang dan perusahaan dalam menerapkan aplikasi berbasis AI dengan SambaNova. Kit ini memberikan contoh dan panduan praktis yang memfasilitasi implementasi berbagai kasus penggunaan AI, sehingga memudahkan pengguna untuk memanfaatkan teknologi canggih SambaNova.</p>
<p>Tutorial ini memanfaatkan integrasi Milvus dalam SambaNova AI Starter Kits untuk membangun sistem Enterprise Knowledge Retrieval, yang mirip dengan RAG (Retrieval-Augmented Generation), untuk mengambil dan menjawab berdasarkan dokumen pribadi perusahaan.</p>
<div class="alert note">
<p>Tutorial ini terutama mengacu pada panduan resmi <a href="https://github.com/sambanova/ai-starter-kit/tree/main">SambaNova AI Starter Kits</a>. Jika Anda menemukan bahwa tutorial ini memiliki bagian yang sudah usang, Anda dapat memprioritaskan untuk mengikuti panduan resmi dan mengajukan pertanyaan kepada kami.</p>
</div>
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
    </button></h2><p>Kami merekomendasikan penggunaan Python &gt;= 3.10 dan &lt; 3.12.</p>
<p>Kunjungi <a href="https://cloud.sambanova.ai/">SambaNova Cloud</a> untuk mendapatkan kunci API SambaNova.</p>
<h2 id="Clone-the-repository" class="common-anchor-header">Kloning repositori<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/sambanova/ai-starter-kit.git
$ d ai-starter-kit/enterprise_knowledge_retriever
<button class="copy-code-btn"></button></code></pre>
<h2 id="Change-the-vector-store-type" class="common-anchor-header">Ubah jenis penyimpanan vektor<button data-href="#Change-the-vector-store-type" class="anchor-icon" translate="no">
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
    </button></h2><p>Ubah penyimpanan vektor dengan mengatur <code translate="no">db_type='milvus'</code> di fungsi <code translate="no">create_vector_store()</code> dan <code translate="no">load_vdb()</code> di <code translate="no">src/document_retrieval.py</code>.</p>
<pre><code translate="no" class="language-python">...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.create_vector_store(
    ..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>
)
...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.load_vdb(..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-dependencies" class="common-anchor-header">Menginstal dependensi<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Instal dependensi yang diperlukan dengan menjalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">python3 -m venv enterprise_knowledge_env
<span class="hljs-built_in">source</span> enterprise_knowledge_env/bin/activate
pip install -r requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-the-application" class="common-anchor-header">Memulai aplikasi<button data-href="#Start-the-application" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan perintah berikut untuk memulai aplikasi:</p>
<pre><code translate="no" class="language-bash">$ streamlit run streamlit/app.py --browser.gatherUsageStats <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre>
<p>Setelah itu, Anda akan melihat antarmuka pengguna di peramban Anda:<code translate="no">http://localhost:8501/</code></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/sambanava_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Setelah mengatur kunci API SambaNova Anda di UI, Anda dapat bermain-main dengan UI dan mengajukan pertanyaan tentang dokumen Anda.</p>
<p>Untuk detail lebih lanjut, silakan lihat dokumentasi resmi <a href="https://github.com/sambanova/ai-starter-kit/tree/main/enterprise_knowledge_retriever">Enterprise Knowledge Retrieval of SambaNova AI Starter Kits</a>.</p>
