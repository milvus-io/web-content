---
id: performance_faq.md
summary: >-
  Temukan jawaban atas pertanyaan yang sering diajukan mengenai kinerja
  pencarian, peningkatan kinerja, dan masalah lain yang berkaitan dengan
  kinerja.
title: Pertanyaan Umum tentang Kinerja
---
<h1 id="Performance-FAQ" class="common-anchor-header">Pertanyaan Umum tentang Kinerja<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Bagaimana cara mengatur nilai ` <code translate="no">nlist</code> ` dan ` <code translate="no">nprobe</code> ` untuk indeks IVF?</h4><p>Pengaturan ` <code translate="no">nlist</code> ` bergantung pada skenario tertentu. Sebagai pedoman umum, nilai yang direkomendasikan untuk ` <code translate="no">nlist</code> ` adalah ` <code translate="no">4 × sqrt(n)</code>`, di mana ` <code translate="no">n</code> ` adalah jumlah total entitas dalam satu segmen.</p>
<p>Ukuran setiap segmen ditentukan oleh parameter ` <code translate="no">datacoord.segment.maxSize</code> `, yang secara default diatur ke 1024 MB. Jumlah total entitas dalam segmen `n` dapat diperkirakan dengan membagi ` <code translate="no">datacoord.segment.maxSize</code> ` dengan ukuran setiap entitas.</p>
<p>Penetapan nilai <code translate="no">nprobe</code> bergantung pada dataset dan skenario tertentu, serta melibatkan pertimbangan antara akurasi dan kinerja kueri. Kami menyarankan untuk menemukan nilai ideal melalui eksperimen berulang.</p>
<p>Bagan berikut ini merupakan hasil dari pengujian yang dijalankan pada dataset sift50m dan indeks IVF_SQ8, yang membandingkan recall dan kinerja kueri dari berbagai pasangan nilai <code translate="no">nlist</code> dan<code translate="no">nprobe</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>Uji akurasi</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   Uji kinerja</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Mengapa kueri terkadang memakan waktu lebih lama pada dataset yang lebih kecil?</h4><p>Operasi kueri dilakukan pada segmen. Indeks mengurangi waktu yang dibutuhkan untuk mengkueri sebuah segmen. Jika sebuah segmen belum diindeks, Milvus akan melakukan pencarian brute-force pada data mentah—yang secara drastis meningkatkan waktu kueri.</p>
<p>Oleh karena itu, biasanya diperlukan waktu lebih lama untuk melakukan kueri pada kumpulan data (koleksi) yang kecil karena indeksnya belum dibuat. Hal ini disebabkan ukuran segmennya belum mencapai ambang batas pembuatan indeks yang ditetapkan oleh <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Panggil <code translate="no">create_index()</code> untuk memaksa Milvus mengindeks segmen yang telah mencapai ambang batas tetapi belum diindeks secara otomatis, sehingga meningkatkan kinerja kueri secara signifikan.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Faktor apa saja yang memengaruhi penggunaan CPU?</h4><p>Penggunaan CPU meningkat saat Milvus sedang membangun indeks atau menjalankan kueri. Secara umum, pembuatan indeks sangat memakan CPU kecuali saat menggunakan Annoy, yang berjalan pada satu utas.</p>
<p>Saat menjalankan kueri, penggunaan CPU dipengaruhi oleh <code translate="no">nq</code> dan <code translate="no">nprobe</code>. Jika <code translate="no">nq</code> dan <code translate="no">nprobe</code> kecil, konkurensi rendah dan penggunaan CPU tetap rendah.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Apakah penyisipan data dan pencarian secara bersamaan memengaruhi kinerja kueri?</h4><p>Operasi penyisipan tidak memakan banyak CPU. Namun, karena segmen baru mungkin belum mencapai ambang batas untuk pembuatan indeks, Milvus terpaksa menggunakan pencarian brute-force—yang secara signifikan memengaruhi kinerja kueri.</p>
<p>Parameter <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> menentukan ambang batas pembuatan indeks untuk suatu segmen, dan secara default diatur ke 1.024 baris. Lihat <a href="/docs/id/v2.6.x/system_configuration.md">Konfigurasi Sistem</a> untuk informasi lebih lanjut.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">Apakah mengindeks bidang VARCHAR dapat meningkatkan kecepatan penghapusan?</h4><p>Pembuatan indeks pada kolom VARCHAR dapat mempercepat operasi “Delete By Expression”, tetapi hanya dalam kondisi tertentu:</p>
<ul>
<li><strong>Indeks INVERTED</strong>: Indeks ini membantu untuk ekspresi ` <code translate="no">IN</code> ` atau ` <code translate="no">==</code> ` pada kolom VARCHAR yang bukan kunci utama.</li>
<li><strong>Indeks Trie</strong>: Indeks ini membantu untuk kueri awalan (misalnya, <code translate="no">LIKE prefix%</code>) pada kolom VARCHAR yang bukan kunci utama.</li>
</ul>
<p>Namun, mengindeks kolom VARCHAR tidak mempercepat:</p>
<ul>
<li><strong>Penghapusan berdasarkan ID</strong>: Ketika kolom VARCHAR merupakan kunci utama.</li>
<li><strong>Ekspresi yang Tidak Terkait</strong>: Ketika kolom VARCHAR bukan bagian dari ekspresi penghapusan.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Masih ada pertanyaan?</h4><p>Anda dapat:</p>
<ul>
<li>Kunjungi <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> di GitHub. Jangan ragu untuk mengajukan pertanyaan, berbagi ide, dan membantu orang lain.</li>
<li>Bergabunglah dengan <a href="https://discord.com/invite/8uyFbECzPX">saluran Discord</a> kami untuk mendapatkan dukungan dan berinteraksi dengan komunitas open-source kami.</li>
</ul>
