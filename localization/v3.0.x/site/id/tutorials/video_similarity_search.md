---
id: video_similarity_search.md
summary: Buat sistem pencarian kemiripan video dengan Milvus.
title: Pencarian Kemiripan Video
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Pencarian Kemiripan Video<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Tutorial ini mendemonstrasikan cara menggunakan Milvus, basis data vektor sumber terbuka, untuk membangun sistem pencarian kemiripan video.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Buka buku catatan Jupyter</a></li>
</ul>
<p>Model ML dan perangkat lunak pihak ketiga yang digunakan meliputi:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Saat ini, setelah menonton film atau video yang mereka sukai, orang dapat dengan mudah mengambil tangkapan layar dan membagikan pemikiran mereka dengan memposting di berbagai platform jejaring sosial. Ketika para pengikut melihat tangkapan layar, akan sangat sulit bagi mereka untuk mengetahui film mana yang dimaksud jika nama film tersebut tidak disebutkan secara eksplisit dalam postingan. Untuk mengetahui nama filmnya, orang bisa memanfaatkan sistem pencarian kemiripan video. Dengan menggunakan sistem ini, pengguna dapat mengunggah sebuah gambar dan mendapatkan video atau film yang mengandung frame kunci yang mirip dengan gambar yang diunggah.</p>
<p><br/></p>
<p>Dalam tutorial ini, Anda akan belajar cara membuat sistem pencarian kemiripan video. Tutorial ini menggunakan sekitar 100 gif animasi di Tumblr untuk membangun sistem. Namun, Anda juga dapat menyiapkan dataset video Anda sendiri. Sistem ini pertama-tama menggunakan OpenCV untuk mengekstrak frame kunci dalam video dan kemudian mendapatkan vektor fitur dari setiap frame kunci menggunakan ResNet-50. Semua vektor disimpan dan dicari di Milvus, yang akan mengembalikan ID vektor yang serupa. Kemudian memetakan ID ke video yang sesuai yang disimpan di MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
