---
id: recommendation_system.md
summary: Bangun sistem rekomendasi yang dipersonalisasi dengan Milvus.
title: Sistem Rekomendasi
---
<h1 id="Recommender-System" class="common-anchor-header">Sistem Rekomendasi<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Tutorial ini mendemonstrasikan cara menggunakan Milvus, basis data vektor sumber terbuka, untuk membangun sistem rekomendasi.</p>
<p>Model ML dan perangkat lunak pihak ketiga yang digunakan meliputi:</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis atau MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Sistem rekomendasi adalah bagian dari sistem penyaringan informasi, yang dapat digunakan dalam berbagai skenario termasuk rekomendasi film, musik, produk, dan feed stream yang dipersonalisasi. Tidak seperti mesin pencari, sistem rekomendasi tidak mengharuskan pengguna untuk mendeskripsikan kebutuhan mereka secara akurat, tetapi menemukan kebutuhan dan minat pengguna dengan menganalisis perilaku pengguna.</p>
<p></br></p>
<p>Dalam tutorial ini, Anda akan belajar cara membuat sistem rekomendasi film yang dapat menyarankan film yang sesuai dengan minat pengguna. Untuk membangun sistem rekomendasi seperti itu, pertama-tama unduhlah dataset terkait film. Tutorial ini menggunakan MovieLens 1M. Sebagai alternatif, Anda dapat menyiapkan dataset Anda sendiri, yang harus menyertakan informasi seperti penilaian pengguna terhadap film, karakteristik demografis pengguna, dan deskripsi film. Gunakan PaddlePaddle untuk menggabungkan ID dan fitur pengguna dan mengonversinya menjadi vektor 256 dimensi. Ubah ID dan fitur film menjadi vektor dengan cara yang sama. Simpan vektor film di Milvus dan gunakan vektor pengguna untuk pencarian kemiripan. Jika vektor pengguna mirip dengan vektor film, Milvus akan mengembalikan vektor film dan ID-nya sebagai hasil rekomendasi. Kemudian melakukan kueri informasi film menggunakan ID vektor film yang disimpan di Redis atau MySQL.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>recommender_system</span> </span></p>
