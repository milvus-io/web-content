---
id: audio_similarity_search.md
summary: Bangun sistem pencarian kemiripan audio dengan Milvus.
title: Pencarian Kemiripan Audio
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">Pencarian Kemiripan Audio<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Tutorial ini mendemonstrasikan cara menggunakan Milvus, basis data vektor sumber terbuka untuk membangun sistem pencarian kemiripan audio.</p>
<p>Model ML dan perangkat lunak pihak ketiga yang digunakan meliputi:</p>
<ul>
<li>PANN (Jaringan Saraf Tiruan Audio Skala Besar yang Sudah Terlatih)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Pencarian ucapan, musik, efek suara, dan jenis pencarian audio lainnya memungkinkan untuk secara cepat meminta data audio dalam jumlah besar dan memunculkan suara yang mirip. Aplikasi sistem pencarian kemiripan audio termasuk mengidentifikasi efek suara yang mirip, meminimalkan pelanggaran IP, dan banyak lagi. Pencarian audio dapat digunakan untuk mencari dan memantau media online secara real-time untuk menindak pelanggaran hak kekayaan intelektual. Ini juga mengasumsikan peran penting dalam klasifikasi dan analisis statistik data audio.</p>
<p></br></p>
<p>Dalam tutorial ini, Anda akan belajar cara membangun sistem pencarian kemiripan audio yang dapat mengembalikan klip suara yang serupa. Klip audio yang diunggah diubah menjadi vektor menggunakan PANN. Vektor-vektor ini disimpan di Milvus yang secara otomatis menghasilkan ID unik untuk setiap vektor. Kemudian pengguna dapat melakukan pencarian kemiripan vektor di Milvus dan menanyakan jalur data klip audio yang sesuai dengan ID vektor unik yang dikembalikan oleh Milvus.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_search_demo</span> </span></p>
