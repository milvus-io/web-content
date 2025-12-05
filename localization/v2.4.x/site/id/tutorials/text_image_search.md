---
id: text_image_search.md
summary: Buat mesin pencari teks ke gambar dengan Milvus.
title: Mesin Pencari Teks ke Gambar
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Mesin Pencari Teks ke Gambar<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Tutorial ini mendemonstrasikan cara menggunakan Milvus, basis data vektor sumber terbuka, untuk membangun mesin pencari teks ke gambar.</p>
<p>Anda dapat dengan cepat membuat mesin pencari teks-ke-gambar yang layak dengan mengikuti tutorial dasar. Atau, Anda juga dapat membaca tutorial mendalam yang mencakup segala hal mulai dari pemilihan model hingga penerapan layanan. Anda bisa membangun mesin pencari teks-ke-gambar yang lebih canggih yang sesuai dengan kebutuhan bisnis Anda sendiri dengan mengikuti instruksi dalam tutorial pendalaman.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Tutorial dasar di buku catatan</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Tutorial pendalaman di buku catatan</a></p></li>
</ul>
<p>Model ML dan perangkat lunak pihak ketiga yang digunakan meliputi:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>Saat ini, mesin pencari teks tradisional kehilangan pesonanya karena semakin banyak orang yang beralih ke TikTok sebagai mesin pencari favorit mereka. Selama pencarian teks tradisional, orang memasukkan kata kunci dan diperlihatkan semua teks yang mengandung kata kunci tersebut. Namun, orang-orang mengeluh bahwa mereka tidak selalu dapat menemukan apa yang mereka inginkan dalam pencarian seperti ini. Terlebih lagi, hasilnya tidak cukup intuitif. Orang-orang mengatakan bahwa mereka menemukan gambar dan video jauh lebih intuitif dan menyenangkan daripada harus merayapi barisan teks. Mesin pencari teks-ke-gambar lintas-modal muncul sebagai hasilnya. Dengan mesin pencari jenis baru ini, orang bisa menemukan gambar yang relevan dengan memasukkan sepotong teks dari beberapa kata kunci.</p>
<p>Dalam tutorial ini, Anda akan belajar cara membuat mesin pencari teks-ke-gambar. Tutorial ini menggunakan model CLIP untuk mengekstrak fitur gambar dan mengubahnya menjadi vektor. Kemudian vektor gambar ini disimpan dalam basis data vektor Milvus. Ketika pengguna memasukkan teks kueri, teks-teks ini juga dikonversi menjadi vektor penyisipan menggunakan model ML CLIP yang sama. Selanjutnya, pencarian kemiripan vektor dilakukan di Milvus untuk mengambil vektor gambar yang paling mirip dengan vektor teks masukan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>Pencarian teks_gambar</span> </span></p>
