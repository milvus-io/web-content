---
id: dna_sequence_classification.md
summary: Membangun sistem klasifikasi sekuens DNA dengan Milvus.
title: Klasifikasi Urutan DNA
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">Klasifikasi Urutan DNA<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>Tutorial ini mendemonstrasikan cara menggunakan Milvus, basis data vektor sumber terbuka, untuk membangun model klasifikasi sekuens DNA.</p>
<p>Model ML dan perangkat lunak pihak ketiga yang digunakan meliputi:</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Sekuens DNA adalah konsep yang populer dalam penelusuran gen, identifikasi spesies, diagnosis penyakit, dan masih banyak lagi. Ketika semua industri membutuhkan metode penelitian yang lebih cerdas dan efisien, kecerdasan buatan telah menarik banyak perhatian terutama dari domain biologi dan medis. Semakin banyak ilmuwan dan peneliti yang berkontribusi pada pembelajaran mesin dan pembelajaran mendalam di bidang bioinformatika. Untuk membuat hasil eksperimen lebih meyakinkan, salah satu opsi yang umum dilakukan adalah dengan meningkatkan ukuran sampel. Kolaborasi dengan data besar dalam genomik membawa lebih banyak kemungkinan aplikasi dalam kenyataan. Namun, penyelarasan sekuens tradisional memiliki keterbatasan, sehingga tidak cocok untuk dataset yang besar. Untuk mengurangi trade-off pada kenyataannya, vektorisasi adalah pilihan yang baik untuk kumpulan data sekuens DNA yang besar.</p>
<p><br/></p>
<p>Dalam tutorial ini, Anda akan belajar bagaimana membangun model klasifikasi sekuens DNA. Tutorial ini menggunakan CountVectorizer untuk mengekstrak fitur-fitur sekuens DNA dan mengubahnya menjadi vektor. Kemudian, vektor-vektor ini disimpan dalam Milvus dan kelas DNA yang sesuai disimpan dalam MySQL. Pengguna dapat melakukan pencarian kemiripan vektor di Milvus dan mengingat klasifikasi DNA yang sesuai dari MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>dna</span> </span></p>
