---
id: how_to_enhance_your_rag.md
summary: >-
  Dengan meningkatnya popularitas aplikasi Retrieval Augmented Generation RAG,
  ada kekhawatiran yang berkembang tentang peningkatan kinerja mereka. Artikel
  ini menyajikan semua cara yang memungkinkan untuk mengoptimalkan pipeline RAG
  dan memberikan ilustrasi yang sesuai untuk membantu Anda memahami dengan cepat
  strategi pengoptimalan RAG yang utama.
title: Cara Meningkatkan Kinerja Pipeline RAG Anda
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">Cara Meningkatkan Kinerja Pipeline RAG Anda<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Dengan meningkatnya popularitas aplikasi Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG)</a>, ada perhatian yang semakin besar untuk meningkatkan kinerjanya. Artikel ini menyajikan semua cara yang memungkinkan untuk mengoptimalkan pipeline RAG dan memberikan ilustrasi yang sesuai untuk membantu Anda memahami dengan cepat strategi pengoptimalan RAG yang utama.</p>
<p>Penting untuk dicatat bahwa kami hanya akan memberikan eksplorasi tingkat tinggi dari strategi dan teknik ini, dengan fokus pada bagaimana mereka berintegrasi ke dalam sistem RAG. Namun, kami tidak akan membahas detail yang rumit atau memandu Anda melalui implementasi langkah demi langkah.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">Pipeline RAG Standar<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Diagram di bawah ini menunjukkan pipeline RAG vanila yang paling mudah. Pertama, potongan dokumen dimuat ke dalam penyimpanan vektor (seperti <a href="https://milvus.io/docs">Milvus</a> atau <a href="https://zilliz.com/cloud">Zilliz cloud</a>). Kemudian, penyimpanan vektor mengambil potongan Top-K yang paling relevan yang terkait dengan kueri. Potongan-potongan yang relevan ini kemudian disuntikkan ke dalam prompt konteks <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a>, dan akhirnya, LLM mengembalikan jawaban akhir.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">Berbagai Jenis Teknik Peningkatan RAG<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>Kita dapat mengklasifikasikan pendekatan peningkatan RAG yang berbeda berdasarkan perannya dalam tahapan pipeline RAG.</p>
<ul>
<li><strong>Peningkatan Kueri</strong>: Memodifikasi dan memanipulasi proses kueri dari input RAG untuk mengekspresikan atau memproses maksud kueri dengan lebih baik.</li>
<li><strong>Peningkatan Pengindeksan</strong>: Mengoptimalkan pembuatan indeks chunking menggunakan teknik seperti multi-chunking, pengindeksan bertahap, atau pengindeksan multi-arah.</li>
<li><strong>Peningkatan Retriever</strong>: Menerapkan teknik dan strategi pengoptimalan selama proses pengambilan.</li>
<li><strong>Peningkatan Generator</strong>: Menyesuaikan dan mengoptimalkan prompt saat merakit prompt untuk LLM agar dapat memberikan respons yang lebih baik.</li>
<li><strong>Peningkatan RAG Pipeline</strong>: Mengalihkan proses secara dinamis di dalam seluruh pipeline RAG, termasuk menggunakan agen atau alat untuk mengoptimalkan langkah-langkah utama dalam pipeline RAG.</li>
</ul>
<p>Selanjutnya, kami akan memperkenalkan metode spesifik di bawah masing-masing kategori ini.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">Peningkatan Kueri<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Mari jelajahi empat metode efektif untuk meningkatkan pengalaman kueri Anda: Pertanyaan Hipotetis, Penyematan Dokumen Hipotetis, Sub-Kueri, dan Prompt Mundur.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">Membuat Pertanyaan Hipotetis</h3><p>Membuat pertanyaan hipotetis melibatkan penggunaan LLM untuk menghasilkan beberapa pertanyaan yang mungkin ditanyakan pengguna tentang konten di dalam setiap bagian dokumen. Sebelum kueri pengguna yang sebenarnya mencapai LLM, penyimpanan vektor mengambil pertanyaan hipotetis yang paling relevan yang terkait dengan kueri yang sebenarnya, bersama dengan potongan dokumen yang sesuai, dan meneruskannya ke LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Metodologi ini melewati masalah asimetri lintas domain dalam proses pencarian vektor dengan secara langsung terlibat dalam pencarian kueri-ke-kueri, sehingga mengurangi beban pencarian vektor. Namun, metodologi ini menimbulkan biaya tambahan dan ketidakpastian dalam menghasilkan pertanyaan hipotetis.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (Penyematan Dokumen Hipotetis)</h3><p>HyDE adalah singkatan dari Hypothetical Document Embeddings. Ini memanfaatkan LLM untuk membuat<strong><em>"Hypothetical Document</em></strong>" atau jawaban <strong><em>palsu</em></strong> dalam menanggapi pertanyaan pengguna tanpa informasi kontekstual. Jawaban palsu ini kemudian diubah menjadi vektor embeddings dan digunakan untuk menanyakan potongan dokumen yang paling relevan dalam basis data vektor. Selanjutnya, basis data vektor mengambil potongan dokumen Top-K yang paling relevan dan mengirimkannya ke LLM dan kueri pengguna asli untuk menghasilkan jawaban akhir.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Metode ini mirip dengan teknik pertanyaan hipotetis dalam mengatasi asimetri lintas domain dalam pencarian vektor. Namun, metode ini juga memiliki kekurangan, seperti biaya komputasi tambahan dan ketidakpastian dalam menghasilkan jawaban palsu.</p>
<p>Untuk informasi lebih lanjut, lihat makalah <a href="https://arxiv.org/abs/2212.10496">HyDE</a>.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">Membuat Sub-Kueri</h3><p>Ketika kueri pengguna terlalu rumit, kita dapat menggunakan LLM untuk memecahnya menjadi sub-kueri yang lebih sederhana sebelum meneruskannya ke basis data vektor dan LLM. Mari kita lihat sebuah contoh.</p>
<p>Bayangkan seorang pengguna bertanya:<strong><em>"Apa saja perbedaan fitur antara Milvus dan Zilliz Cloud?</em></strong>" Pertanyaan ini cukup kompleks dan mungkin tidak memiliki jawaban yang mudah dalam basis pengetahuan kami. Untuk mengatasi masalah ini, kita bisa membaginya menjadi dua sub-kueri yang lebih sederhana:</p>
<ul>
<li>Sub-kueri 1: "Apa saja fitur-fitur yang dimiliki Milvus?"</li>
<li>Sub-kueri 2: "Apa saja fitur-fitur Zilliz Cloud?"</li>
</ul>
<p>Setelah kami memiliki sub-kueri ini, kami mengirim semuanya ke basis data vektor setelah mengubahnya menjadi sematan vektor. Basis data vektor kemudian menemukan potongan dokumen Top-K yang paling relevan dengan setiap sub-kueri. Terakhir, LLM menggunakan informasi ini untuk menghasilkan jawaban yang lebih baik.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dengan memecah kueri pengguna menjadi sub-kueri, kami mempermudah sistem kami untuk menemukan informasi yang relevan dan memberikan jawaban yang akurat, bahkan untuk pertanyaan yang rumit sekalipun.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">Membuat Petunjuk Mundur</h3><p>Cara lain untuk menyederhanakan kueri pengguna yang rumit adalah dengan membuat <strong><em>petunjuk mundur</em></strong>. Teknik ini melibatkan pengabstraksian pertanyaan pengguna yang rumit menjadi <em><em>"</em>pertanyaan mundur</em>"** menggunakan LLM. Kemudian, basis data vektor menggunakan pertanyaan-pertanyaan mundur ini untuk mengambil potongan dokumen yang paling relevan. Terakhir, LLM menghasilkan jawaban yang lebih akurat berdasarkan potongan dokumen yang diambil.</p>
<p>Mari kita ilustrasikan teknik ini dengan sebuah contoh. Pertimbangkan pertanyaan berikut ini, yang cukup kompleks dan tidak mudah untuk dijawab secara langsung:</p>
<p><strong><em>Permintaan Pengguna Asli: "Saya memiliki kumpulan data dengan 10 miliar catatan dan ingin menyimpannya di Milvus untuk kueri. Apakah itu mungkin?"</em></strong></p>
<p>Untuk menyederhanakan pertanyaan pengguna ini, kita dapat menggunakan LLM untuk menghasilkan pertanyaan mundur yang lebih mudah:</p>
<p><strong><em>Pertanyaan Mundur: "Berapa batas ukuran dataset yang dapat ditangani oleh Milvus?"</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Metode ini dapat membantu kita mendapatkan jawaban yang lebih baik dan lebih akurat untuk pertanyaan yang kompleks. Metode ini memecah pertanyaan asli ke dalam bentuk yang lebih sederhana, sehingga memudahkan sistem kami untuk menemukan informasi yang relevan dan memberikan jawaban yang akurat.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">Peningkatan Pengindeksan<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Meningkatkan pengindeksan adalah strategi lain untuk meningkatkan kinerja aplikasi RAG Anda. Mari kita jelajahi tiga teknik peningkatan pengindeksan.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">Menggabungkan Potongan Dokumen Secara Otomatis</h3><p>Saat membuat indeks, kita dapat menggunakan dua tingkat perincian: potongan anak dan potongan induknya. Awalnya, kita mencari potongan anak pada tingkat detail yang lebih halus. Kemudian, kami menerapkan strategi penggabungan: jika sejumlah tertentu, <strong><em>n</em></strong>, potongan anak dari <strong><em>k</em></strong> potongan anak pertama termasuk dalam potongan induk yang sama, kami memberikan potongan induk ini ke LLM sebagai informasi kontekstual.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Metodologi ini telah diimplementasikan di <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a>.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">Membangun Indeks Hirarkis</h3><p>Ketika membuat indeks untuk dokumen, kita dapat membuat indeks dua tingkat: satu untuk ringkasan dokumen dan satu lagi untuk potongan dokumen. Proses pencarian vektor terdiri dari dua tahap: pertama, kami menyaring dokumen yang relevan berdasarkan ringkasan, dan selanjutnya, kami mengambil potongan dokumen yang sesuai secara eksklusif di dalam dokumen-dokumen yang relevan ini.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Pendekatan ini terbukti bermanfaat dalam situasi yang melibatkan volume data yang besar atau contoh di mana data bersifat hirarkis, seperti pengambilan konten dalam koleksi perpustakaan.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">Temu Kembali Hibrida dan Pemeringkatan Ulang</h3><p>Teknik Hybrid Retrieval and Reranking mengintegrasikan satu atau lebih metode pencarian tambahan dengan <a href="https://zilliz.com/learn/vector-similarity-search">pencarian kemiripan vektor</a>. Kemudian, pemeringkat memberi peringkat <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">ulang</a> hasil yang diambil berdasarkan relevansinya dengan kueri pengguna.</p>
<p>Algoritme pencarian tambahan yang umum termasuk metode berbasis frekuensi leksikal seperti <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a> atau model besar yang menggunakan sematan jarang seperti <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>. Algoritme pemeringkatan ulang termasuk RRF atau model yang lebih canggih seperti <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>, yang menyerupai arsitektur seperti BERT.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Pendekatan ini memanfaatkan beragam metode pencarian ulang untuk meningkatkan kualitas pencarian ulang dan mengatasi potensi kesenjangan dalam penarikan vektor.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">Peningkatan Retriever<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Penyempurnaan komponen retriever dalam sistem RAG juga dapat meningkatkan aplikasi RAG. Mari kita jelajahi beberapa metode yang efektif untuk meningkatkan retriever.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">Pengambilan Jendela Kalimat</h3><p>Dalam sistem RAG dasar, potongan dokumen yang diberikan kepada LLM adalah jendela yang lebih besar yang mencakup potongan sematan yang diambil. Hal ini memastikan bahwa informasi yang diberikan kepada LLM mencakup detail kontekstual yang lebih luas, sehingga meminimalkan kehilangan informasi. Teknik Pengambilan Jendela Kalimat memisahkan potongan dokumen yang digunakan untuk pengambilan sematan dari potongan yang diberikan ke LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Namun, memperbesar ukuran jendela dapat menyebabkan informasi tambahan yang mengganggu. Kita dapat menyesuaikan ukuran perluasan jendela berdasarkan kebutuhan bisnis tertentu.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">Pemfilteran Meta-data</h3><p>Untuk memastikan jawaban yang lebih tepat, kita dapat menyaring dokumen yang diambil dengan menyaring metadata seperti waktu dan kategori sebelum meneruskannya ke LLM. Misalnya, jika laporan keuangan yang mencakup beberapa tahun diambil, pemfilteran berdasarkan tahun yang diinginkan akan menyaring informasi untuk memenuhi persyaratan tertentu. Metode ini terbukti efektif dalam situasi dengan data yang luas dan metadata yang terperinci, seperti pengambilan konten dalam koleksi perpustakaan.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">Peningkatan Generator<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Mari kita jelajahi lebih banyak teknik pengoptimalan RAG dengan meningkatkan generator dalam sistem RAG.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">Mengompresi prompt LLM</h3><p>Informasi noise dalam potongan dokumen yang diambil dapat secara signifikan memengaruhi keakuratan jawaban akhir RAG. Jendela prompt yang terbatas dalam LLM juga menghadirkan rintangan untuk mendapatkan jawaban yang lebih akurat. Untuk mengatasi tantangan ini, kita dapat memampatkan detail yang tidak relevan, menekankan paragraf kunci, dan mengurangi panjang konteks keseluruhan potongan dokumen yang diambil.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Pendekatan ini mirip dengan metode pengambilan dan pemeringkatan hibrida yang telah dibahas sebelumnya, di mana pemeringkat digunakan untuk menyaring potongan dokumen yang tidak relevan.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">Menyesuaikan urutan potongan dalam prompt</h3><p>Dalam makalah<a href="https://arxiv.org/abs/2307.03172">"Lost in the middle</a>," para peneliti mengamati bahwa LLM sering mengabaikan informasi di tengah-tengah dokumen yang diberikan selama proses penalaran. Sebaliknya, mereka cenderung lebih mengandalkan informasi yang disajikan di awal dan akhir dokumen.</p>
<p>Berdasarkan pengamatan ini, kita dapat menyesuaikan urutan potongan yang diambil untuk meningkatkan kualitas jawaban: ketika mengambil beberapa potongan pengetahuan, potongan dengan kepercayaan yang relatif rendah ditempatkan di tengah, dan potongan dengan kepercayaan yang relatif tinggi diposisikan di kedua ujungnya.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">Peningkatan Pipa RAG<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Kami juga dapat meningkatkan performa aplikasi RAG Anda dengan meningkatkan seluruh pipeline RAG.</p>
<h3 id="Self-reflection" class="common-anchor-header">Refleksi diri</h3><p>Pendekatan ini menggabungkan konsep refleksi diri dalam agen AI. Lalu, bagaimana cara kerja teknik ini?</p>
<p>Beberapa potongan dokumen Top-K yang diambil pada awalnya bersifat ambigu dan mungkin tidak menjawab pertanyaan pengguna secara langsung. Dalam kasus seperti itu, kita dapat melakukan refleksi putaran kedua untuk memverifikasi apakah potongan dokumen tersebut benar-benar dapat menjawab pertanyaan pengguna.</p>
<p>Kita dapat melakukan refleksi dengan menggunakan metode refleksi yang efisien seperti model Natural Language Inference (NLI) atau alat tambahan seperti pencarian di internet untuk verifikasi.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Konsep refleksi diri ini telah dieksplorasi dalam beberapa makalah atau proyek, termasuk <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a>, dll.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">Perutean Kueri dengan Agen</h3><p>Terkadang, kita tidak perlu menggunakan sistem RAG untuk menjawab pertanyaan sederhana karena dapat mengakibatkan lebih banyak kesalahpahaman dan kesimpulan dari informasi yang menyesatkan. Dalam kasus seperti itu, kita dapat menggunakan agen sebagai perute pada tahap kueri. Agen ini menilai apakah kueri perlu melalui jalur RAG. Jika ya, pipa RAG berikutnya dimulai; jika tidak, LLM secara langsung menangani kueri tersebut.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Agen ini dapat mengambil berbagai bentuk, termasuk LLM, model klasifikasi kecil, atau bahkan seperangkat aturan.</p>
<p>Dengan merutekan kueri berdasarkan maksud pengguna, Anda dapat mengalihkan sebagian dari kueri, yang mengarah ke peningkatan signifikan dalam waktu respons dan pengurangan yang nyata dalam kebisingan yang tidak perlu.</p>
<p>Kita dapat memperluas teknik perutean kueri ke proses lain dalam sistem RAG, seperti menentukan kapan harus menggunakan alat bantu seperti penelusuran web, melakukan sub-kueri, atau mencari gambar. Pendekatan ini memastikan bahwa setiap langkah dalam sistem RAG dioptimalkan berdasarkan persyaratan spesifik dari kueri, sehingga menghasilkan pencarian informasi yang lebih efisien dan akurat.</p>
<h2 id="Summary" class="common-anchor-header">Ringkasan<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Meskipun pipeline RAG vanila mungkin terlihat sederhana, namun untuk mencapai kinerja bisnis yang optimal sering kali membutuhkan teknik pengoptimalan yang lebih canggih.</p>
<p>Artikel ini merangkum berbagai pendekatan populer untuk meningkatkan kinerja aplikasi RAG Anda. Kami juga memberikan ilustrasi yang jelas untuk membantu Anda memahami konsep dan teknik ini dengan cepat dan mempercepat implementasi dan pengoptimalannya.</p>
<p>Anda bisa mendapatkan implementasi sederhana dari pendekatan utama yang tercantum dalam artikel ini di <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">tautan GitHub</a> ini.</p>
