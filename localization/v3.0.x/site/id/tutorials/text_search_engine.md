---
id: text_search_engine.md
summary: Buat mesin pencari teks dengan Milvus.
title: Mesin Pencari Teks
---
<h1 id="Text-Search-Engine" class="common-anchor-header">Mesin Pencari Teks<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam tutorial ini, Anda akan mempelajari cara menggunakan Milvus, basis data vektor sumber terbuka, untuk membangun mesin pencari teks.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Buka buku catatan Jupyter</a></li>
</ul>
<p>Model ML dan perangkat lunak pihak ketiga yang digunakan meliputi:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Salah satu aplikasi utama Milvus dalam bidang pemrosesan bahasa alami (NLP) adalah mesin pencari teks. Ini adalah alat yang hebat yang dapat membantu pengguna menemukan informasi yang mereka cari. Bahkan dapat memunculkan informasi yang sulit ditemukan. Mesin pencari teks membandingkan kata kunci atau semantik yang dimasukkan pengguna dengan database teks, dan kemudian mengembalikan hasil yang memenuhi kriteria tertentu.</p>
<p><br/></p>
<p>Dalam tutorial ini, Anda akan belajar cara membuat mesin pencari teks. Tutorial ini menggunakan BERT untuk mengubah teks menjadi vektor dengan panjang tetap. Milvus digunakan sebagai basis data vektor untuk penyimpanan dan pencarian kemiripan vektor. Kemudian gunakan MySQL untuk memetakan ID vektor yang dihasilkan oleh Milvus ke data teks.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> </span> <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
