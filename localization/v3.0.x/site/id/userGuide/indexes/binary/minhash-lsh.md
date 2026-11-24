---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  Gunakan indeks MinHash LSH untuk mempercepat proses deteksi teks yang hampir
  duplikat dan pencarian kesamaan Jaccard pada kumpulan data teks berskala
  besar.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>Deduplikasi yang efisien dan pencarian kesamaan sangat penting untuk dataset pembelajaran mesin berskala besar, terutama untuk tugas-tugas seperti pembersihan korpus pelatihan untuk Model Bahasa Besar (LLM). Saat menangani jutaan atau miliaran dokumen, pencocokan eksak tradisional menjadi terlalu lambat dan mahal.</p>
<p>Indeks <strong>MINHASH_LSH</strong> di Milvus memungkinkan deduplikasi perkiraan yang cepat, skalabel, dan akurat dengan menggabungkan dua teknik yang kuat:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: Dengan cepat menghasilkan tanda tangan (atau “sidik jari”) yang ringkas untuk memperkirakan kemiripan dokumen.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-Sensitive Hashing (LSH)</a>: Dengan cepat menemukan kelompok dokumen serupa berdasarkan tanda tangan MinHash mereka.</p></li>
</ul>
<p>Panduan ini akan memandu Anda melalui konsep, prasyarat, pengaturan, dan praktik terbaik dalam menggunakan MINHASH_LSH di Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Kesamaan Jaccard<button data-href="#Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Kesamaan Jaccard mengukur tumpang tindih antara dua himpunan A dan B, yang secara formal didefinisikan sebagai:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0962em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Nilai kemiripannya berkisar dari 0 (sama sekali tidak saling tumpang tindih) hingga 1 (identik).</p>
<p>Namun, menghitung kesamaan Jaccard secara tepat antara semua pasangan dokumen dalam kumpulan data berskala besar membutuhkan komputasi yang<strong>mahal—O(n²)</strong> dalam hal waktu dan memori ketika <strong>n</strong> besar. Hal ini membuatnya tidak layak untuk kasus penggunaan seperti pembersihan korpus pelatihan LLM atau analisis dokumen berskala web.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">Tanda tangan MinHash: Perkiraan kemiripan Jaccard<button data-href="#MinHash-signatures-Approximate-Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> adalah teknik probabilistik yang menawarkan cara efisien untuk memperkirakan kemiripan Jaccard. Teknik ini bekerja dengan mengubah setiap himpunan menjadi <strong>vektor tanda tangan</strong> yang ringkas, dengan tetap mempertahankan informasi yang cukup untuk memperkirakan kemiripan himpunan secara efisien.</p>
<p><strong>Ide intinya</strong>:</p>
<p>Semakin mirip kedua himpunan tersebut, semakin besar kemungkinan tanda tangan MinHash-nya akan cocok pada posisi yang sama. Sifat ini memungkinkan MinHash untuk memperkirakan kesamaan Jaccard antar himpunan.</p>
<p>Sifat ini memungkinkan MinHash untuk <strong>memperkirakan kesamaan Jaccard</strong> antar himpunan tanpa perlu membandingkan himpunan secara langsung.</p>
<p>Proses MinHash melibatkan:</p>
<ol>
<li><p><strong>Shingling</strong>: Mengubah dokumen menjadi kumpulan urutan token yang tumpang tindih (shingles)</p></li>
<li><p><strong>Hashing</strong>: Menerapkan beberapa fungsi hash independen ke setiap shingle</p></li>
<li><p><strong>Min Selection</strong>: Untuk setiap fungsi hash, catat nilai hash <strong>minimum</strong> di seluruh shingle</p></li>
</ol>
<p>Anda dapat melihat ilustrasi seluruh proses di bawah ini:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" /> 
   <span>Alur Kerja MinHash</span>
  
 </span></p>
<div class="alert note">
<p>Jumlah fungsi hash yang digunakan menentukan dimensi tanda tangan MinHash. Dimensi yang lebih tinggi memberikan akurasi aproksimasi yang lebih baik, dengan konsekuensi peningkatan kebutuhan penyimpanan dan komputasi.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH untuk MinHash<button data-href="#LSH-for-MinHash" class="anchor-icon" translate="no">
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
    </button></h3><p>Meskipun tanda tangan MinHash secara signifikan mengurangi biaya komputasi kesamaan Jaccard yang tepat antar dokumen, membandingkan setiap pasangan vektor tanda tangan secara menyeluruh tetap tidak efisien dalam skala besar.</p>
<p>Untuk mengatasi hal ini, <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a> digunakan. LSH memungkinkan pencarian kesamaan aproksimasi yang cepat dengan memastikan bahwa item yang serupa di-hash ke dalam “bucket” yang sama dengan probabilitas tinggi — sehingga menghindari kebutuhan untuk membandingkan setiap pasangan secara langsung.</p>
<p>Prosesnya meliputi:</p>
<ol>
<li><p><strong>Segmentasi tanda tangan:</strong></p>
<p>Tanda tangan MinHash <em>n-dimensi</em> dibagi menjadi <em>b</em> band. Setiap band berisi <em>r</em> nilai hash berturut-turut, sehingga panjang total tanda tangan memenuhi: <em>n = b × r</em>.</p>
<p>Misalnya, jika Anda memiliki tanda tangan MinHash 128-dimensi (<em>n = 128</em>) dan membaginya menjadi 32 band (<em>b = 32</em>), maka setiap band berisi 4 nilai hash (<em>r = 4</em>).</p></li>
<li><p><strong>Penghashing tingkat pita:</strong></p>
<p>Setelah segmentasi, setiap band diproses secara independen menggunakan fungsi hash standar untuk menetapkannya ke sebuah bucket. Jika dua tanda tangan menghasilkan nilai hash yang sama dalam sebuah band—yaitu, keduanya masuk ke bucket yang sama—maka keduanya dianggap sebagai kecocokan potensial.</p></li>
<li><p><strong>Pemilihan kandidat:</strong></p>
<p>Pasangan yang bertabrakan setidaknya di satu band dipilih sebagai kandidat kesamaan.</p></li>
</ol>
<div class="alert note">
<p>Mengapa cara ini berhasil?</p>
<p>Secara matematis, jika dua tanda tangan memiliki kesamaan Jaccard <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span>,</p>
<ul>
<li><p>Kemungkinan keduanya identik dalam satu baris (posisi hash) adalah <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span></p></li>
<li><p>Probabilitas keduanya cocok di semua <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span> baris dalam satu band adalah <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span></span></span></span></p></li>
<li><p>Probabilitas bahwa keduanya cocok <strong>setidaknya</strong> di <strong>satu band</strong> adalah <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>1−</mo><mo stretchy="false">(</mo><msup><mi>1−sr</mi></msup><msup><mo stretchy="false">)</mo></msup></mrow><annotation encoding="application/x-tex">b1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span> (<span class="katex-base"><span class="mbin">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathnormal"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0991em;vertical-align:-0.25em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;"> s</span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></p></li>
</ul>
<p>Untuk detailnya, lihat <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-sensitive hashing</a>.</p>
</div>
<p>Pertimbangkan tiga dokumen dengan tanda tangan MinHash berdimensi 128:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" /> 
   <span>Alur Kerja LSH 1</span>
  
 </span></p>
<p>Pertama, LSH membagi tanda tangan berdimensi 128 tersebut menjadi 32 rentang yang masing-masing terdiri dari 4 nilai berturut-turut:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" /> 
   <span>Alur Kerja LSH 2</span>
  
 </span></p>
<p>Kemudian, setiap band di-hash ke dalam bucket yang berbeda menggunakan fungsi hash. Pasangan dokumen yang berbagi bucket dipilih sebagai kandidat kesamaan. Dalam contoh di bawah ini, Dokumen A dan Dokumen B dipilih sebagai kandidat kesamaan karena hasil hash-nya bertabrakan di <strong>Band 0</strong>:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" /> 
   <span>Alur Kerja LSH 3</span>
  
 </span></p>
<div class="alert note">
<p>Jumlah band dikendalikan oleh parameter ` <code translate="no">mh_lsh_band</code> `. Untuk informasi lebih lanjut, lihat <a href="/docs/id/minhash-lsh.md#Index-building-params">parameter pembuatan indeks</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures" class="common-anchor-header">MHJACCARD: Membandingkan tanda tangan MinHash<button data-href="#MHJACCARD-Comparing-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Tanda tangan MinHash mendekati kemiripan Jaccard antar himpunan menggunakan vektor biner berpanjang tetap. Namun, karena tanda tangan ini tidak mempertahankan himpunan aslinya, metrik standar seperti <code translate="no">JACCARD</code>, <code translate="no">L2</code>, atau <code translate="no">COSINE</code> tidak dapat langsung diterapkan untuk membandingkannya.</p>
<p>Untuk mengatasi hal ini, Milvus memperkenalkan jenis metrik khusus yang disebut <code translate="no">MHJACCARD</code>, yang dirancang khusus untuk membandingkan tanda tangan MinHash.</p>
<p>Saat menggunakan MinHash di Milvus:</p>
<ul>
<li><p>Bidang vektor harus bertipe <code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> harus berupa <code translate="no">MINHASH_LSH</code> (atau <code translate="no">BIN_FLAT</code>)</p></li>
<li><p><code translate="no">metric_type</code> harus disetel ke <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>Penggunaan metrik lain akan dianggap tidak valid atau menghasilkan hasil yang salah.</p>
<p>Untuk informasi lebih lanjut mengenai tipe metrik ini, lihat <a href="/docs/id/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h3 id="Deduplication-workflow" class="common-anchor-header">Alur kerja deduplikasi<button data-href="#Deduplication-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Proses deduplikasi yang didukung oleh MinHash LSH memungkinkan Milvus untuk secara efisien mengidentifikasi dan menyaring teks atau catatan terstruktur yang hampir duplikat sebelum memasukkannya ke dalam koleksi.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/it9wwbcfwhft0rbwosacgltzneb.png" alt="It9wwbcfwhft0rbwosacgltzneb" class="doc-image" id="it9wwbcfwhft0rbwosacgltzneb" /> 
   <span>It9wwbcfwhft0rbwosacgltzneb</span>
  
 </span></p>
<ol>
<li><p><strong>Chunk &amp; praproses</strong>: Pisahkan data teks atau data terstruktur yang masuk (misalnya, catatan, bidang) menjadi beberapa bagian; normalisasi teks (ubah menjadi huruf kecil, hapus tanda baca), dan hapus kata-kata yang tidak relevan sesuai kebutuhan.</p></li>
<li><p><strong>Pembuatan fitur</strong>: Membangun kumpulan token yang digunakan untuk MinHash (misalnya, shingles dari teks; token bidang yang digabungkan untuk data terstruktur).</p></li>
<li><p><strong>Pembuatan tanda tangan MinHash</strong>: Hitung tanda tangan MinHash untuk setiap potongan atau catatan.</p></li>
<li><p><strong>Konversi vektor biner</strong>: Konversi tanda tangan menjadi vektor biner yang kompatibel dengan Milvus.</p></li>
<li><p><strong>Pencarian sebelum penyisipan</strong>: Gunakan indeks MinHash LSH untuk mencari koleksi target guna menemukan item yang hampir duplikat dari item yang masuk.</p></li>
<li><p><strong>Sisipkan &amp; simpan</strong>: Sisipkan hanya item unik ke dalam koleksi. Item tersebut menjadi dapat dicari untuk pemeriksaan deduplikasi di masa mendatang.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum menggunakan MinHash LSH di Milvus, Anda harus terlebih dahulu membuat <strong>tanda tangan MinHash</strong>. Tanda tangan biner ringkas ini mendekati kemiripan Jaccard antar himpunan dan diperlukan untuk pencarian berbasis <code translate="no">MHJACCARD</code> di Milvus.</p>
<div class="alert note">
<p>Anda dapat menyiapkan tanda tangan MinHash untuk indeks <code translate="no">MINHASH_LSH</code> dengan dua cara:</p>
<ul>
<li><p>Membuat tanda tangan sendiri menggunakan alat eksternal dan memasukkannya ke dalam bidang BINARY_VECTOR, atau</p></li>
<li><p>Gunakan fungsi MinHash bawaan untuk secara otomatis menghasilkan vektor biner yang kompatibel dari teks. Untuk alur kerja end-to-end dan opsi konfigurasi fungsi MinHash, lihat <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p></li>
</ul>
</div>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Pilih metode untuk menghasilkan tanda tangan MinHash<button data-href="#Choose-a-method-to-generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Tergantung pada beban kerja Anda, Anda dapat memilih:</p>
<ul>
<li><p>Gunakan <a href="https://ekzhu.github.io/datasketch/"><code translate="no">datasketch</code></a> untuk kemudahan (disarankan untuk pembuatan prototipe)</p></li>
<li><p>Gunakan alat terdistribusi (misalnya, Spark, Ray) untuk kumpulan data berskala besar</p></li>
<li><p>Menerapkan logika khusus (NumPy, C++, dll.) jika penyempurnaan kinerja sangat penting</p></li>
</ul>
<p>Dalam panduan ini, kami menggunak <code translate="no">datasketch</code> demi kemudahan dan kompatibilitas dengan format input Milvus.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Instal pustaka yang diperlukan<button data-href="#Install-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><p>Instal paket yang diperlukan untuk contoh ini:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Buat tanda tangan MinHash<button data-href="#Generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Kami akan menghasilkan tanda tangan MinHash berdimensi 256, dengan setiap nilai hash direpresentasikan sebagai bilangan bulat 64-bit. Hal ini sesuai dengan format vektor yang diharapkan untuk <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setiap tanda tangan berukuran 256 × 64 bit = 2048 byte. String byte ini dapat langsung dimasukkan ke dalam bidang <code translate="no">BINARY_VECTOR</code>. Untuk informasi lebih lanjut mengenai vektor biner yang digunakan di Milvus, lihat <a href="/docs/id/binary-vector.md">Binary Vector</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Opsional) Siapkan kumpulan token mentah (untuk pencarian yang lebih terperinci)<button data-href="#Optional-Prepare-raw-token-sets-for-refined-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Secara default, Milvus hanya menggunakan tanda tangan MinHash dan indeks LSH untuk menemukan tetangga yang mendekati. Cara ini cepat tetapi mungkin menghasilkan hasil positif palsu atau melewatkan kecocokan yang dekat.</p>
<p>Jika Anda menginginkan <strong>kesamaan Jaccard yang akurat</strong>, Milvus mendukung pencarian terperinci yang menggunakan kumpulan token asli. Untuk mengaktifkannya:</p>
<ul>
<li><p>Simpan kumpulan token sebagai bidang terpisah " <code translate="no">VARCHAR</code> "</p></li>
<li><p>Tentukan <code translate="no">&quot;with_raw_data&quot;: True</code> saat <a href="/docs/id/minhash-lsh.md#Build-index-parameters-and-create-collection">membuat parameter indeks</a></p></li>
<li><p>Dan aktifkan ` <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> ` saat <a href="/docs/id/minhash-lsh.md#Perform-similarity-search">melakukan pencarian kesamaan</a></p></li>
</ul>
<p><strong>Contoh ekstraksi kumpulan token</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH" class="common-anchor-header">Gunakan MinHash LSH<button data-href="#Use-MinHash-LSH" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah vektor MinHash dan kumpulan token asli Anda siap, Anda dapat menyimpannya, mengindeksnya, dan mencarinya menggunakan Milvus dengan <code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-your-cluster" class="common-anchor-header">Hubungkan ke klaster Anda<button data-href="#Connect-to-your-cluster" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment">// Update if your URI is different</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Tentukan skema koleksi<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Tentukan skema dengan:</p>
<ul>
<li><p>Kunci utama</p></li>
<li><p>Kolom <code translate="no">BINARY_VECTOR</code> untuk tanda tangan MinHash</p></li>
<li><p>Sebuah bidang ` <code translate="no">VARCHAR</code> ` untuk kumpulan token asli (jika pencarian terperinci diaktifkan)</p></li>
<li><p>Secara opsional, bidang ` <code translate="no">document</code> ` untuk teks asli</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">16384</span>) <span class="hljs-comment">// 256 hash values × 64 bits</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;token_set&quot;</span>) <span class="hljs-comment">// required for refinement</span>
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">16384</span>, <span class="hljs-comment">// 256 hash values × 64 bits</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;token_set&quot;</span>, <span class="hljs-comment">// required for refinement</span>
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">false</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;doc_id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;minhash_signature&quot;</span>).WithDataType(entity.FieldTypeBinaryVector).WithDim(<span class="hljs-number">16384</span>)). <span class="hljs-comment">// 256 hash values × 64 bits</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;token_set&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>)).        <span class="hljs-comment">// required for refinement</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;minhash_signature&quot;,
            &quot;dataType&quot;: &quot;BinaryVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 16384
            }
        },
        {
            &quot;fieldName&quot;: &quot;token_set&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Buat parameter indeks dan buat koleksi<button data-href="#Build-index-parameters-and-create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Buat indeks " <code translate="no">MINHASH_LSH</code> " dengan penyempurnaan Jaccard diaktifkan:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;mh_element_bit_width&quot;</span>, <span class="hljs-number">64</span>); <span class="hljs-comment">// Must match signature bit width</span>
extraParams.put(<span class="hljs-string">&quot;mh_lsh_band&quot;</span>, <span class="hljs-number">16</span>);          <span class="hljs-comment">// Band count</span>
extraParams.put(<span class="hljs-string">&quot;with_raw_data&quot;</span>, <span class="hljs-literal">true</span>);      <span class="hljs-comment">// Required for Jaccard refinement</span>

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .indexType(IndexParam.IndexType.MINHASH_LSH)
        .metricType(IndexParam.MetricType.MHJACCARD)
        .extraParams(extraParams)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">MINHASH_LSH</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">MHJACCARD</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">mh_element_bit_width</span>: <span class="hljs-number">64</span>, <span class="hljs-comment">// Must match signature bit width</span>
            <span class="hljs-attr">mh_lsh_band</span>: <span class="hljs-number">16</span>,          <span class="hljs-comment">// Band count</span>
            <span class="hljs-attr">with_raw_data</span>: <span class="hljs-literal">true</span>,      <span class="hljs-comment">// Required for Jaccard refinement</span>
        },
    },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    schema,
    index_params,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">false</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, <span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index.NewMinHashLSHIndex(entity.MHJACCARD, <span class="hljs-number">16</span>). <span class="hljs-comment">// mh_lsh_band: band count</span>
        WithElementBitWidth(<span class="hljs-number">64</span>).                    <span class="hljs-comment">// Must match signature bit width</span>
        WithRawData(<span class="hljs-literal">true</span>))                          <span class="hljs-comment">// Required for Jaccard refinement</span>

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

err = loadTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;minhash_signature&quot;,
        &quot;metricType&quot;: &quot;MHJACCARD&quot;,
        &quot;indexType&quot;: &quot;MINHASH_LSH&quot;,
        &quot;params&quot;: {
            &quot;mh_element_bit_width&quot;: 64,
            &quot;mh_lsh_band&quot;: 16,
            &quot;with_raw_data&quot;: true
        }
    }
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut mengenai parameter pembuatan indeks, lihat <a href="/docs/id/minhash-lsh.md#Index-building-params">Parameter pembuatan indeks</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Sisipkan data<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk setiap dokumen, siapkan:</p>
<ul>
<li><p>Tanda tangan MinHash biner</p></li>
<li><p>String kumpulan token yang diserialisasikan</p></li>
<li><p>(Opsional) teks aslinya</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Lakukan pencarian kesamaan<button data-href="#Perform-similarity-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus mendukung dua mode pencarian kesamaan menggunakan MinHash LSH:</p>
<ul>
<li><p><strong>Pencarian perkiraan</strong> — hanya menggunakan tanda tangan MinHash dan LSH untuk hasil yang cepat namun probabilistik.</p></li>
<li><p><strong>Pencarian terperinci</strong> — menghitung ulang kemiripan Jaccard menggunakan kumpulan token asli untuk meningkatkan akurasi.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Siapkan kueri</h4><p>Untuk melakukan pencarian kesamaan, buat tanda tangan MinHash untuk dokumen kueri. Tanda tangan ini harus sesuai dengan dimensi dan format pengkodean yang sama yang digunakan saat penyisipan data.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Pencarian perkiraan (hanya LSH)</h4><p>Pencarian ini cepat dan skalabel, tetapi mungkin melewatkan kecocokan yang sangat mirip atau menghasilkan hasil positif palsu:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">approxResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = approxResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> approxResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {},</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

approxResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// querySig holds the query signature as a []byte</span>
approxResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; approxResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := approxResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-approxResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {}
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Pencarian terperinci (direkomendasikan untuk akurasi):</h4><p>Ini memungkinkan perbandingan Jaccard yang akurat menggunakan kumpulan token asli yang disimpan di Milvus. Proses ini sedikit lebih lambat, tetapi direkomendasikan untuk tugas-tugas yang mengutamakan kualitas:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>, <span class="hljs-literal">true</span>); <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;refine_k&quot;</span>, <span class="hljs-number">5</span>);                  <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">refinedResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = refinedResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> refinedResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mh_search_with_jaccard</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-attr">refine_k</span>: <span class="hljs-number">5</span>,                  <span class="hljs-comment">// Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    },</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

refinedResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

<span class="highlighted-comment-line">annParam := index.NewMinHashLSHAnnParam().</span>
<span class="highlighted-comment-line">    WithSearchWithJACCARD(<span class="hljs-literal">true</span>). <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">    WithRefineK(<span class="hljs-number">5</span>)               <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a []byte</span>
refinedResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-comment-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
<span class="highlighted-comment-line">    WithAnnParam(annParam).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; refinedResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := refinedResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-refinedResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {
        &quot;mh_search_with_jaccard&quot;: true,
        &quot;refine_k&quot;: 5
    }
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Parameter indeks<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks tersebut.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/minhash-lsh.md#Build-index-parameters-and-create-collection">membuat indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Lebar bit setiap nilai hash dalam tanda tangan MinHash. Harus dapat dibagi 8.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Gunakan <code translate="no">32</code> untuk kinerja dan akurasi yang seimbang. Gunakan <code translate="no">64</code> untuk presisi yang lebih tinggi dengan dataset yang lebih besar. Gunakan <code translate="no">16</code> untuk menghemat memori dengan kehilangan akurasi yang dapat diterima.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Jumlah band untuk membagi tanda tangan MinHash untuk LSH. Mengontrol keseimbangan antara recall dan kinerja.</p></td>
     <td><p>[1, <em>panjang_tanda_tangan</em>]</p></td>
     <td><p>Untuk tanda tangan 128-dimensi: mulailah dengan 32 pita (4 nilai/pita). Tingkatkan menjadi 64 untuk recall yang lebih tinggi, kurangi menjadi 16 untuk kinerja yang lebih baik. Panjang tanda tangan harus dibagi secara merata.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Apakah akan menyimpan kode hash LSH di memori anonim (<code translate="no">true</code>) atau menggunakan pemetaan memori (<code translate="no">false</code>).</p></td>
     <td><p>true, false</p></td>
     <td><p>Gunakan <code translate="no">false</code> untuk dataset besar (&gt;1 juta set) guna mengurangi penggunaan memori. Gunakan <code translate="no">true</code> untuk dataset yang lebih kecil yang memerlukan kecepatan pencarian maksimum.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Apakah akan menyimpan tanda tangan MinHash asli bersama kode LSH untuk penyempurnaan.</p></td>
     <td><p>true, false</p></td>
     <td><p>Gunakan <code translate="no">true</code> jika diperlukan presisi tinggi dan biaya penyimpanan masih dapat diterima. Gunakan <code translate="no">false</code> untuk meminimalkan beban penyimpanan dengan sedikit pengurangan akurasi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>Probabilitas positif palsu untuk filter Bloom yang digunakan dalam optimasi bucket LSH.</p></td>
     <td><p>[0,001; 0,1]</p></td>
     <td><p>Gunakan <code translate="no">0.01</code> untuk keseimbangan antara penggunaan memori dan akurasi. Nilai yang lebih rendah (<code translate="no">0.001</code>) mengurangi false positive tetapi meningkatkan penggunaan memori. Nilai yang lebih tinggi (<code translate="no">0.05</code>) menghemat memori tetapi mungkin mengurangi presisi.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/minhash-lsh.md#Perform-similarity-search">melakukan pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Apakah akan melakukan perhitungan kesamaan Jaccard yang tepat pada hasil kandidat untuk penyempurnaan.</p></td>
     <td><p>true, false</p></td>
     <td><p>Gunakan " <code translate="no">true</code> " untuk aplikasi yang memerlukan presisi tinggi (misalnya, deduplikasi). Gunakan " <code translate="no">false</code> " untuk pencarian perkiraan yang lebih cepat ketika sedikit penurunan akurasi dapat diterima.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Jumlah kandidat yang akan diambil sebelum penyempurnaan Jaccard. Hanya efektif jika <code translate="no">mh_search_with_jaccard</code> adalah <code translate="no">true</code>.</p></td>
     <td><p>[<em>top_k</em>, <em>top_k &amp;ast; 10</em>]</p></td>
     <td><p>Atur ke 2-5 kali <em>top_k</em> yang diinginkan untuk keseimbangan recall-kinerja yang baik. Nilai yang lebih tinggi meningkatkan recall tetapi menambah beban komputasi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Apakah akan mengaktifkan optimasi batch untuk beberapa kueri simultan.</p></td>
     <td><p>true, false</p></td>
     <td><p>Gunakan <code translate="no">true</code> saat melakukan pencarian dengan beberapa kueri secara bersamaan untuk throughput yang lebih baik. Gunakan <code translate="no">false</code> untuk skenario kueri tunggal guna mengurangi beban memori.</p></td>
   </tr>
</table>
