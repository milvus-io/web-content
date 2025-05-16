---
id: performance_faq.md
summary: >-
  Temukan jawaban atas pertanyaan yang sering diajukan tentang performa
  pencarian, peningkatan performa, dan masalah terkait performa lainnya.
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Bagaimana cara mengatur <code translate="no">nlist</code> dan <code translate="no">nprobe</code> untuk indeks IVF?</h4><p>Menyetel <code translate="no">nlist</code> bersifat spesifik untuk setiap skenario. Sebagai patokan, nilai yang disarankan untuk <code translate="no">nlist</code> adalah <code translate="no">4 × sqrt(n)</code>, di mana <code translate="no">n</code> adalah jumlah total entitas dalam sebuah segmen.</p>
<p>Ukuran setiap segmen ditentukan oleh parameter <code translate="no">datacoord.segment.maxSize</code>, yang disetel ke 512 MB secara default. Jumlah total entitas dalam segmen n dapat diperkirakan dengan membagi <code translate="no">datacoord.segment.maxSize</code> dengan ukuran masing-masing entitas.</p>
<p>Pengaturan <code translate="no">nprobe</code> khusus untuk dataset dan skenario, dan melibatkan pertukaran antara akurasi dan kinerja kueri. Kami merekomendasikan untuk menemukan nilai ideal melalui eksperimen berulang kali.</p>
<p>Grafik berikut ini adalah hasil dari uji coba yang dilakukan pada dataset sift50m dan indeks IVF_SQ8, yang membandingkan performa recall dan kueri dari pasangan <code translate="no">nlist</code>/<code translate="no">nprobe</code> yang berbeda.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>Uji akurasi</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>Uji kinerja</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Mengapa kueri terkadang membutuhkan waktu lebih lama pada set data yang lebih kecil?</h4><p>Operasi kueri dilakukan pada segmen. Indeks mengurangi jumlah waktu yang diperlukan untuk melakukan kueri pada sebuah segmen. Jika sebuah segmen belum diindeks, Milvus menggunakan pencarian brute-force pada data mentah - meningkatkan waktu kueri secara drastis.</p>
<p>Oleh karena itu, biasanya diperlukan waktu lebih lama untuk melakukan kueri pada kumpulan data yang kecil (koleksi) karena belum membangun indeks. Hal ini karena ukuran segmen-segmennya belum mencapai ambang batas pembangunan indeks yang ditetapkan oleh <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Hubungi <code translate="no">create_index()</code> untuk memaksa Milvus mengindeks segmen yang telah mencapai ambang batas tetapi belum diindeks secara otomatis, sehingga secara signifikan meningkatkan kinerja kueri.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Faktor-faktor apa saja yang memengaruhi penggunaan CPU?</h4><p>Penggunaan CPU meningkat ketika Milvus membangun indeks atau menjalankan kueri. Secara umum, pembuatan indeks menggunakan CPU yang intensif kecuali ketika menggunakan Annoy, yang berjalan pada satu thread.</p>
<p>Ketika menjalankan kueri, penggunaan CPU dipengaruhi oleh <code translate="no">nq</code> dan <code translate="no">nprobe</code>. Ketika <code translate="no">nq</code> dan <code translate="no">nprobe</code> kecil, konkurensi rendah dan penggunaan CPU tetap rendah.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">Apakah memasukkan data dan pencarian secara bersamaan memengaruhi kinerja kueri?</h4><p>Operasi penyisipan tidak menggunakan CPU secara intensif. Namun, karena segmen baru mungkin belum mencapai ambang batas untuk pembuatan indeks, Milvus menggunakan pencarian brute-force - yang secara signifikan memengaruhi kinerja kueri.</p>
<p>Parameter <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> menentukan ambang batas pembuatan indeks untuk sebuah segmen, dan diatur ke 1024 baris secara default. Lihat <a href="/docs/id/v2.4.x/system_configuration.md">Konfigurasi Sistem</a> untuk informasi lebih lanjut.</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">Apakah ruang penyimpanan akan langsung dilepaskan setelah penghapusan data di Milvus?</h4><p>Tidak, ruang penyimpanan tidak akan langsung dilepaskan ketika Anda menghapus data di Milvus. Meskipun menghapus data akan menandai entitas sebagai "terhapus secara logis", ruang penyimpanan yang sebenarnya mungkin tidak akan langsung kosong. Inilah alasannya:</p>
<ul>
<li><strong>Pemadatan</strong>: Milvus secara otomatis memadatkan data di latar belakang. Proses ini menggabungkan segmen data yang lebih kecil menjadi lebih besar dan menghapus data yang dihapus secara logis (entitas yang ditandai untuk dihapus) atau data yang telah melampaui Time-To-Live (TTL). Namun, pemadatan menciptakan segmen baru sekaligus menandai segmen lama sebagai "Dibuang".</li>
<li><strong>Pengumpulan Sampah</strong>: Proses terpisah yang disebut Garbage Collection (GC) secara berkala menghapus segmen "Dropped" ini, membebaskan ruang penyimpanan yang mereka tempati. Hal ini memastikan penggunaan penyimpanan yang efisien, tetapi dapat menimbulkan sedikit penundaan antara penghapusan dan reklamasi ruang.</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">Dapatkah saya melihat data yang disisipkan, dihapus, atau disisipkan segera setelah operasi tanpa menunggu flush?</h4><p>Ya, di Milvus, visibilitas data tidak secara langsung terkait dengan operasi flush karena arsitektur pemilahan komputasi penyimpanannya. Anda dapat mengelola keterbacaan data menggunakan tingkat konsistensi.</p>
<p>Ketika memilih tingkat konsistensi, pertimbangkan trade-off antara konsistensi dan kinerja. Untuk operasi yang membutuhkan visibilitas langsung, gunakan tingkat konsistensi "Kuat". Untuk penulisan yang lebih cepat, prioritaskan konsistensi yang lebih lemah (data mungkin tidak langsung terlihat). Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.4.x/consistency.md">Konsistensi</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">Apakah mengindeks field VARCHAR dapat meningkatkan kecepatan penghapusan?</h4><p>Mengindeks bidang VARCHAR dapat mempercepat operasi "Hapus Berdasarkan Ekspresi", tetapi hanya dalam kondisi tertentu:</p>
<ul>
<li><strong>Indeks Terbalik</strong>: Indeks ini membantu untuk ekspresi <code translate="no">IN</code> atau <code translate="no">==</code> pada field VARCHAR non-kunci utama.</li>
<li><strong>Indeks Trie</strong>: Indeks ini membantu untuk kueri awalan (misalnya, <code translate="no">LIKE prefix%</code>) pada bidang VARCHAR non-kunci utama.</li>
</ul>
<p>Namun, mengindeks bidang VARCHAR tidak mempercepat:</p>
<ul>
<li><strong>Menghapus berdasarkan ID</strong>: Ketika bidang VARCHAR adalah kunci utama.</li>
<li><strong>Ekspresi yang tidak terkait</strong>: Ketika bidang VARCHAR bukan bagian dari ekspresi penghapusan.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Masih memiliki pertanyaan?</h4><p>Anda bisa:</p>
<ul>
<li>Lihat <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> di GitHub. Jangan ragu untuk bertanya, berbagi ide, dan membantu orang lain.</li>
<li>Bergabunglah dengan <a href="https://discord.com/invite/8uyFbECzPX">Server Discord</a> kami untuk mendapatkan dukungan dan terlibat dengan komunitas sumber terbuka kami.</li>
</ul>
