---
id: question_answering_system.md
summary: Bangun sistem penjawab pertanyaan dengan Milvus.
title: Sistem Penjawab Pertanyaan
---
<h1 id="Question-Answering-System" class="common-anchor-header">Sistem Penjawab Pertanyaan<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Tutorial ini mendemonstrasikan cara menggunakan Milvus, basis data vektor sumber terbuka, untuk membangun sistem penjawab pertanyaan (QA).</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Buka buku catatan Jupyter</a></li>
<li><a href="https://milvus.io/milvus-demos/">Coba demo online</a></li>
</ul>
<p>Model ML dan perangkat lunak pihak ketiga yang digunakan meliputi:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Sistem penjawab pertanyaan adalah aplikasi dunia nyata umum yang termasuk dalam bidang pemrosesan bahasa alami. Sistem QA yang umum mencakup sistem layanan pelanggan online, chatbot QA, dan banyak lagi. Sebagian besar sistem penjawab pertanyaan dapat diklasifikasikan sebagai: sistem penjawab pertanyaan generatif atau pengambilan, satu putaran atau multi-putaran, domain terbuka atau sistem penjawab pertanyaan spesifik.</p>
<p></br></p>
<p>Dalam tutorial ini, Anda akan belajar cara membuat sistem QA yang dapat menghubungkan pertanyaan pengguna baru dengan jawaban besar yang sebelumnya disimpan dalam database vektor. Untuk membuat chatbot seperti itu, siapkan kumpulan data pertanyaan dan jawaban yang sesuai. Simpan pertanyaan dan jawaban di MySQL, sebuah database relasional. Kemudian gunakan BERT, model machine learning (ML) untuk pemrosesan bahasa alami (NLP) untuk mengubah pertanyaan menjadi vektor. Vektor pertanyaan ini disimpan dan diindeks dalam Milvus.  Ketika pengguna memasukkan pertanyaan baru, pertanyaan tersebut diubah menjadi vektor dengan model BERT juga, dan Milvus mencari vektor pertanyaan yang paling mirip dengan vektor baru ini. Sistem QA mengembalikan jawaban yang sesuai untuk pertanyaan yang paling mirip.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
