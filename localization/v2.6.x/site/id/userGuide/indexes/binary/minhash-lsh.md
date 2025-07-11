---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  Deduplikasi yang efisien dan pencarian kemiripan sangat penting untuk dataset
  pembelajaran mesin berskala besar, terutama untuk tugas-tugas seperti
  membersihkan korpus pelatihan untuk Model Bahasa Besar (LLM). Ketika berurusan
  dengan jutaan atau miliaran dokumen, pencocokan tepat tradisional menjadi
  terlalu lambat dan mahal.
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
    </button></h1><p>Deduplikasi yang efisien dan pencarian kemiripan sangat penting untuk dataset pembelajaran mesin berskala besar, terutama untuk tugas-tugas seperti membersihkan korpora pelatihan untuk Model Bahasa Besar (LLM). Ketika berurusan dengan jutaan atau miliaran dokumen, pencocokan tepat tradisional menjadi terlalu lambat dan mahal.</p>
<p>Indeks <strong>MINHASH_LSH</strong> di Milvus memungkinkan deduplikasi perkiraan yang cepat, terukur, dan akurat dengan menggabungkan dua teknik yang kuat:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: Dengan cepat menghasilkan tanda tangan ringkas (atau "sidik jari") untuk memperkirakan kemiripan dokumen.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Hashing yang Peka terhadap Lokalitas (LSH</a>): Menemukan dengan cepat kelompok dokumen yang mirip berdasarkan tanda tangan MinHash mereka.</p></li>
</ul>
<p>Panduan ini memandu Anda melalui konsep, prasyarat, penyiapan, dan praktik terbaik untuk menggunakan MINHASH_LSH di Milvus.</p>
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Kesamaan Jaccard</h3><p>Kesamaan Jaccard mengukur tumpang tindih antara dua set A dan B, yang secara formal didefinisikan sebagai:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Di mana nilainya berkisar dari 0 (benar-benar terpisah) hingga 1 (identik).</p>
<p>Namun, menghitung kemiripan Jaccard dengan tepat antara semua pasangan dokumen dalam set data berskala besar akan memakan waktu dan memori yang sangat mahal - O<strong>(n²)</strong> jika <strong>n</strong> besar. Hal ini membuatnya tidak memungkinkan untuk kasus-kasus penggunaan seperti pembersihan korpus pelatihan LLM atau analisis dokumen berskala web.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">Tanda tangan MinHash: Perkiraan kesamaan Jaccard</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> adalah teknik probabilistik yang menawarkan cara yang efisien untuk memperkirakan kemiripan Jaccard. Teknik ini bekerja dengan mengubah setiap set menjadi <strong>vektor tanda tangan</strong> yang ringkas, menyimpan informasi yang cukup untuk memperkirakan kemiripan set secara efisien.</p>
<p><strong>Ide intinya</strong>:</p>
<p>Semakin mirip dua set, semakin besar kemungkinan tanda tangan MinHash mereka akan cocok pada posisi yang sama. Properti ini memungkinkan MinHash untuk memperkirakan kemiripan Jaccard antar set.</p>
<p>Properti ini memungkinkan MinHash untuk <strong>memperkirakan kemiripan Jaccard</strong> antar set tanpa perlu membandingkan set lengkap secara langsung.</p>
<p>Proses MinHash melibatkan:</p>
<ol>
<li><p><strong>Shingling</strong>: Mengonversi dokumen menjadi kumpulan urutan token yang tumpang tindih (shingling)</p></li>
<li><p><strong>Hashing</strong>: Menerapkan beberapa fungsi hash independen ke setiap sirap</p></li>
<li><p><strong>Seleksi Min</strong>: Untuk setiap fungsi hash, catat nilai hash <strong>minimum</strong> di semua sirap</p></li>
</ol>
<p>Anda dapat melihat seluruh proses yang diilustrasikan di bawah ini:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Minhash</span> </span></p>
<div class="alert note">
<p>Jumlah fungsi hash yang digunakan menentukan dimensi tanda tangan MinHash. Dimensi yang lebih tinggi memberikan akurasi perkiraan yang lebih baik, dengan biaya penyimpanan dan komputasi yang lebih besar.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH untuk MinHash</h3><p>Walaupun tanda tangan MinHash secara signifikan mengurangi biaya komputasi kemiripan Jaccard yang tepat antara dokumen, membandingkan setiap pasangan vektor tanda tangan secara menyeluruh masih tidak efisien dalam skala besar.</p>
<p>Untuk mengatasi hal ini, <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a> digunakan. LSH memungkinkan pencarian kemiripan yang cepat dengan memastikan bahwa item yang mirip di-hash ke dalam "bucket" yang sama dengan probabilitas yang tinggi - menghindari kebutuhan untuk membandingkan setiap pasangan secara langsung.</p>
<p>Prosesnya meliputi:</p>
<ol>
<li><p><strong>Segmentasi tanda tangan:</strong></p>
<p>Tanda tangan MinHash <em>n-dimensi</em> dibagi menjadi <em>b</em> band. Setiap pita berisi <em>r</em> nilai hash yang berurutan, sehingga total panjang tanda tangan memenuhi: <em>n = b × r</em>.</p>
<p>Sebagai contoh, jika Anda memiliki tanda tangan MinHash 128 dimensi<em>(n = 128)</em> dan membaginya menjadi 32 band<em>(b = 32)</em>, maka setiap band berisi 4 nilai hash<em>(r = 4)</em>.</p></li>
<li><p><strong>Hash tingkat band:</strong></p>
<p>Setelah segmentasi, setiap pita diproses secara independen menggunakan fungsi hash standar untuk menetapkannya ke dalam sebuah ember. Jika dua tanda tangan menghasilkan nilai hash yang sama dalam sebuah band-yaitu, mereka masuk ke dalam ember yang sama-mereka dianggap sebagai pasangan yang potensial.</p></li>
<li><p><strong>Pemilihan kandidat:</strong></p>
<p>Pasangan yang bertabrakan dalam setidaknya satu pita dipilih sebagai kandidat kemiripan.</p></li>
</ol>
<div class="alert note">
<p>Mengapa cara ini berhasil?</p>
<p>Secara matematis, jika dua tanda tangan memiliki kemiripan Jaccard <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s,</p>
<ul>
<li><p>Probabilitas mereka identik dalam satu baris (posisi hash) adalah <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s</p></li>
<li><p>Probabilitas bahwa mereka cocok di semua <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> r baris dari sebuah band adalah <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p>Probabilitas bahwa mereka cocok dalam <strong>setidaknya satu band</strong> adalah:</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>Untuk detailnya, lihat Penguraian yang <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">sensitif terhadap lokalitas</a>.</p>
</div>
<p>Pertimbangkan tiga dokumen dengan tanda tangan MinHash 128 dimensi:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Lsh 1</span> </span></p>
<p>Pertama, LSH membagi tanda tangan 128 dimensi menjadi 32 band yang masing-masing terdiri dari 4 nilai yang berurutan:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Lsh 2</span> </span></p>
<p>Kemudian, setiap band di-hash ke dalam ember yang berbeda menggunakan fungsi hash. Pasangan dokumen yang berbagi ember dipilih sebagai kandidat kemiripan. Pada contoh di bawah ini, Dokumen A dan Dokumen B dipilih sebagai kandidat kemiripan karena hasil hash mereka bertabrakan di <strong>Band 0</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Lsh 3</span> </span></p>
<div class="alert note">
<p>Jumlah pita dikontrol oleh parameter <code translate="no">mh_lsh_band</code>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/minhash-lsh.md#Index-building-params">Parameter pembuatan indeks</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD: Membandingkan tanda tangan MinHash di Milvus</h3><p>Tanda tangan MinHash mendekati kesamaan Jaccard antara set menggunakan vektor biner dengan panjang tetap. Akan tetapi, karena tanda tangan ini tidak mempertahankan set asli, metrik standar seperti <code translate="no">JACCARD</code>, <code translate="no">L2</code>, atau <code translate="no">COSINE</code> tidak dapat secara langsung digunakan untuk membandingkannya.</p>
<p>Untuk mengatasi hal ini, Milvus memperkenalkan jenis metrik khusus yang disebut <code translate="no">MHJACCARD</code>, yang didesain secara khusus untuk membandingkan tanda tangan MinHash.</p>
<p>Ketika menggunakan MinHash di Milvus:</p>
<ul>
<li><p>Bidang vektor harus bertipe <code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> haruslah <code translate="no">MINHASH_LSH</code> (atau <code translate="no">BIN_FLAT</code>)</p></li>
<li><p><code translate="no">metric_type</code> harus diatur ke <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>Menggunakan metrik lain akan menjadi tidak valid atau memberikan hasil yang salah.</p>
<p>Untuk informasi lebih lanjut mengenai jenis metrik ini, lihat <a href="/docs/id/metric.md#MHJACCARD">MHJACCARD</a>.</p>
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
    </button></h2><p>Sebelum menggunakan MinHash LSH di Milvus, Anda harus terlebih dahulu membuat <strong>tanda tangan MinHash</strong>. Tanda tangan biner ringkas ini mendekati kesamaan Jaccard antara set dan diperlukan untuk pencarian berbasis <code translate="no">MHJACCARD</code> di Milvus.</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Pilih metode untuk menghasilkan tanda tangan MinHash</h3><p>Tergantung pada beban kerja Anda, Anda dapat memilih:</p>
<ul>
<li><p>Gunakan <code translate="no">datasketch</code> dari Python untuk kesederhanaan (direkomendasikan untuk pembuatan prototipe)</p></li>
<li><p>Gunakan alat terdistribusi (misalnya, Spark, Ray) untuk set data berskala besar</p></li>
<li><p>Menerapkan logika khusus (NumPy, C++, dll.) jika penyetelan kinerja sangat penting</p></li>
</ul>
<p>Dalam panduan ini, kami menggunakan <code translate="no">datasketch</code> untuk kesederhanaan dan kompatibilitas dengan format input Milvus.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Menginstal pustaka-pustaka yang diperlukan</h3><p>Instal paket-paket yang diperlukan untuk contoh ini:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Hasilkan tanda tangan MinHash</h3><p>Kita akan menghasilkan tanda tangan MinHash 256 dimensi, dengan setiap nilai hash direpresentasikan sebagai bilangan bulat 64-bit. Ini sesuai dengan format vektor yang diharapkan untuk <code translate="no">MINHASH_LSH</code>.</p>
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
<p>Setiap tanda tangan berukuran 256 × 64 bit = 2048 byte. String byte ini dapat langsung dimasukkan ke dalam bidang Milvus <code translate="no">BINARY_VECTOR</code>. Untuk informasi lebih lanjut mengenai vektor biner yang digunakan di Milvus, lihat <a href="/docs/id/binary-vector.md">Vektor B</a>iner.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Opsional) Menyiapkan set token mentah (untuk pencarian yang disempurnakan)</h3><p>Secara default, Milvus hanya menggunakan tanda tangan MinHash dan indeks LSH untuk menemukan perkiraan tetangga. Ini cepat tetapi dapat menghasilkan positif palsu atau melewatkan kecocokan yang dekat.</p>
<p>Jika Anda menginginkan <strong>kemiripan Jaccard yang akurat</strong>, Milvus mendukung pencarian yang disempurnakan yang menggunakan set token asli. Untuk mengaktifkannya:</p>
<ul>
<li><p>Simpan set token sebagai bidang <code translate="no">VARCHAR</code> yang terpisah</p></li>
<li><p>Tetapkan <code translate="no">&quot;with_raw_data&quot;: True</code> saat <a href="/docs/id/minhash-lsh.md#Build-index-parameters-and-create-collection">membangun parameter indeks</a></p></li>
<li><p>Dan aktifkan <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> saat <a href="/docs/id/minhash-lsh.md#Perform-similarity-search">melakukan pencarian kesamaan</a></p></li>
</ul>
<p><strong>Contoh ekstraksi set token</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">Gunakan MinHash LSH di Milvus<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah vektor MinHash dan set token asli Anda siap, Anda dapat menyimpan, mengindeks, dan mencarinya menggunakan Milvus dengan <code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Menghubungkan ke Milvus</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Tentukan skema koleksi</h3><p>Tentukan skema dengan:</p>
<ul>
<li><p>Kunci utama</p></li>
<li><p>Bidang <code translate="no">BINARY_VECTOR</code> untuk tanda tangan MinHash</p></li>
<li><p>Bidang <code translate="no">VARCHAR</code> untuk kumpulan token asli (jika pencarian yang disempurnakan diaktifkan)</p></li>
<li><p>Opsional, sebuah bidang <code translate="no">document</code> untuk teks asli</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Membangun parameter indeks dan membuat koleksi</h3><p>Bangun indeks <code translate="no">MINHASH_LSH</code> dengan penyempurnaan Jaccard diaktifkan:</p>
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
<p>Untuk informasi lebih lanjut tentang parameter pembuatan indeks, lihat Parameter <a href="/docs/id/minhash-lsh.md#Index-building-params">pembuatan indeks</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Memasukkan data</h3><p>Untuk setiap dokumen, siapkan:</p>
<ul>
<li><p>Tanda tangan MinHash biner</p></li>
<li><p>String set token yang diserialisasikan</p></li>
<li><p>(Opsional) teks asli</p></li>
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
<h3 id="Perform-similarity-search" class="common-anchor-header">Lakukan pencarian kemiripan</h3><p>Milvus mendukung dua mode pencarian kemiripan menggunakan MinHash LSH:</p>
<ul>
<li><p><strong>Pencarian perkiraan</strong> - hanya menggunakan tanda tangan MinHash dan LSH untuk hasil yang cepat namun probabilistik.</p></li>
<li><p><strong>Pencarian</strong> yang<strong>disempurnakan</strong> - menghitung ulang kemiripan Jaccard menggunakan set token asli untuk meningkatkan akurasi.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Menyiapkan kueri</h4><p>Untuk melakukan pencarian kemiripan, buatlah tanda tangan MinHash untuk dokumen kueri. Tanda tangan ini harus sesuai dengan dimensi dan format pengkodean yang sama dengan yang digunakan saat penyisipan data.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Pencarian perkiraan (khusus LSH)</h4><p>Pencarian ini cepat dan terukur, tetapi mungkin melewatkan kecocokan yang dekat atau menyertakan positif palsu:</p>
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
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Pencarian yang disempurnakan (direkomendasikan untuk akurasi):</h4><p>Ini memungkinkan perbandingan Jaccard yang akurat menggunakan set token asli yang disimpan di Milvus. Ini sedikit lebih lambat tetapi direkomendasikan untuk tugas-tugas yang sensitif terhadap kualitas:</p>
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> ketika <a href="/docs/id/minhash-lsh.md#Build-index-parameters-and-create-collection">membangun indeks.</a></p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Lebar bit dari setiap nilai hash dalam tanda tangan MinHash. Harus dapat dibagi dengan 8.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Gunakan <code translate="no">32</code> untuk performa dan akurasi yang seimbang. Gunakan <code translate="no">64</code> untuk presisi yang lebih tinggi dengan set data yang lebih besar. Gunakan <code translate="no">16</code> untuk menghemat memori dengan kehilangan akurasi yang dapat diterima.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Jumlah band untuk membagi tanda tangan MinHash untuk LSH. Mengontrol tradeoff recall-performance.</p></td>
     <td><p>[1, <em>panjang_tanda tangan</em>]</p></td>
     <td><p>Untuk tanda tangan 128-bit: mulai dengan 32 pita (4 nilai/pita). Naikkan ke 64 untuk penarikan yang lebih tinggi, turunkan ke 16 untuk performa yang lebih baik. Harus membagi panjang tanda tangan secara merata.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Apakah akan menyimpan kode hash LSH di memori anonim (<code translate="no">true</code>) atau menggunakan pemetaan memori (<code translate="no">false</code>).</p></td>
     <td><p>benar, salah</p></td>
     <td><p>Gunakan <code translate="no">false</code> untuk set data yang besar (&gt;1 juta set) untuk mengurangi penggunaan memori. Gunakan <code translate="no">true</code> untuk kumpulan data yang lebih kecil yang membutuhkan kecepatan pencarian maksimum.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Apakah akan menyimpan tanda tangan MinHash asli bersama dengan kode LSH untuk penyempurnaan.</p></td>
     <td><p>benar, salah</p></td>
     <td><p>Gunakan <code translate="no">true</code> ketika presisi tinggi diperlukan dan biaya penyimpanan dapat diterima. Gunakan <code translate="no">false</code> untuk meminimalkan biaya penyimpanan dengan sedikit pengurangan akurasi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>Probabilitas positif palsu untuk filter Bloom yang digunakan dalam pengoptimalan bucket LSH.</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>Gunakan <code translate="no">0.01</code> untuk penggunaan memori dan akurasi yang seimbang. Nilai yang lebih rendah (<code translate="no">0.001</code>) mengurangi positif palsu tetapi meningkatkan memori. Nilai yang lebih tinggi (<code translate="no">0.05</code>) menghemat memori tetapi dapat mengurangi presisi.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/minhash-lsh.md#Perform-similarity-search">mencari di indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Apakah akan melakukan penghitungan kemiripan Jaccard yang tepat pada hasil kandidat untuk penyempurnaan.</p></td>
     <td><p>benar, salah</p></td>
     <td><p>Gunakan <code translate="no">true</code> untuk aplikasi yang membutuhkan presisi tinggi (misalnya, deduplikasi). Gunakan <code translate="no">false</code> untuk pencarian perkiraan yang lebih cepat ketika sedikit kehilangan akurasi dapat diterima.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Jumlah kandidat yang harus diambil sebelum perbaikan Jaccard. Hanya efektif jika <code translate="no">mh_search_with_jaccard</code> adalah <code translate="no">true</code>.</p></td>
     <td><p><em>[top_k</em>, *top_k * 10*]</p></td>
     <td><p>Setel ke 2-5x <em>top_k</em> yang diinginkan untuk keseimbangan performa-penarikan yang baik. Nilai yang lebih tinggi meningkatkan penarikan tetapi meningkatkan biaya komputasi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Apakah akan mengaktifkan pengoptimalan batch untuk beberapa kueri simultan.</p></td>
     <td><p>benar, salah</p></td>
     <td><p>Gunakan <code translate="no">true</code> saat mencari dengan beberapa kueri secara bersamaan untuk hasil yang lebih baik. Gunakan <code translate="no">false</code> untuk skenario kueri tunggal untuk mengurangi overhead memori.</p></td>
   </tr>
</table>
