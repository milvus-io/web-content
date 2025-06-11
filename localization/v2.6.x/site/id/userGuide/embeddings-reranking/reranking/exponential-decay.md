---
id: exponential-decay.md
title: Peluruhan EksponensialCompatible with Milvus 2.6.x
summary: >-
  Peluruhan eksponensial menciptakan penurunan awal yang curam yang diikuti
  dengan ekor yang panjang dalam hasil pencarian Anda. Seperti siklus berita
  terbaru di mana relevansi berkurang dengan cepat pada awalnya, tetapi beberapa
  berita tetap penting dari waktu ke waktu, peluruhan eksponensial menerapkan
  penalti yang tajam pada item yang berada di luar jangkauan ideal Anda, namun
  tetap membuat item yang jauh tetap dapat ditemukan. Pendekatan ini sangat
  ideal ketika Anda ingin sangat memprioritaskan kedekatan atau kemutakhiran
  tetapi tidak ingin sepenuhnya menghilangkan pilihan yang lebih jauh.
beta: Milvus 2.6.x
---
<h1 id="Exponential-Decay" class="common-anchor-header">Peluruhan Eksponensial<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Exponential-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>Peluruhan eksponensial menciptakan penurunan awal yang curam yang diikuti dengan ekor yang panjang dalam hasil pencarian Anda. Seperti siklus berita terbaru di mana relevansi berkurang dengan cepat pada awalnya, tetapi beberapa berita tetap penting dari waktu ke waktu, peluruhan eksponensial menerapkan penalti yang tajam pada item yang berada di luar jangkauan ideal Anda, namun tetap membuat item yang jauh tetap dapat ditemukan. Pendekatan ini sangat ideal ketika Anda ingin sangat memprioritaskan kedekatan atau kemutakhiran, tetapi tidak ingin sepenuhnya menghilangkan opsi yang lebih jauh.</p>
<p>Tidak seperti fungsi peluruhan lainnya:</p>
<ul>
<li><p>Peluruhan Gaussian menciptakan penurunan yang lebih bertahap, berbentuk lonceng</p></li>
<li><p>Peluruhan linier menurun dengan kecepatan konstan hingga mencapai tepat nol</p></li>
</ul>
<p>Peluruhan eksponensial secara unik "membebani" penalti di depan, menerapkan sebagian besar pengurangan relevansi lebih awal sambil mempertahankan ekor panjang dengan relevansi minimal tetapi tidak nol.</p>
<h2 id="When-to-use-exponential-decay" class="common-anchor-header">Kapan menggunakan peluruhan eksponensial<button data-href="#When-to-use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Peluruhan eksponensial sangat efektif untuk:</p>
<table>
   <tr>
     <th><p>Kasus Penggunaan</p></th>
     <th><p>Contoh</p></th>
     <th><p>Mengapa Peluruhan Eksponensial Bekerja dengan Baik</p></th>
   </tr>
   <tr>
     <td><p>Umpan berita</p></td>
     <td><p>Portal berita terkini</p></td>
     <td><p>Dengan cepat mengurangi relevansi berita lama sambil tetap menampilkan berita penting dari beberapa hari yang lalu</p></td>
   </tr>
   <tr>
     <td><p>Linimasa media sosial</p></td>
     <td><p>Umpan aktivitas, pembaruan status</p></td>
     <td><p>Menekankan konten baru tetapi memungkinkan konten lama yang viral muncul ke permukaan</p></td>
   </tr>
   <tr>
     <td><p>Sistem pemberitahuan</p></td>
     <td><p>Pemrioritasan peringatan</p></td>
     <td><p>Menciptakan urgensi untuk pemberitahuan terbaru sambil mempertahankan visibilitas untuk pemberitahuan yang penting</p></td>
   </tr>
   <tr>
     <td><p>Penjualan kilat</p></td>
     <td><p>Penawaran waktu terbatas</p></td>
     <td><p>Dengan cepat mengurangi visibilitas saat tenggat waktu semakin dekat</p></td>
   </tr>
</table>
<p>Pilih peluruhan eksponensial saat:</p>
<ul>
<li><p>Pengguna mengharapkan item yang sangat baru atau terdekat untuk sangat mendominasi hasil</p></li>
<li><p>Item yang lebih lama atau lebih jauh harus tetap dapat ditemukan jika sangat relevan</p></li>
<li><p>Penurunan relevansi harus bersifat front-loaded (lebih curam di awal, lebih bertahap di kemudian hari)</p></li>
</ul>
<h2 id="Sharp-drop-off-principle" class="common-anchor-header">Prinsip penurunan yang tajam<button data-href="#Sharp-drop-off-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>Peluruhan eksponensial menciptakan kurva yang turun dengan cepat pada awalnya, kemudian secara bertahap mendatar menjadi ekor panjang yang mendekati tetapi tidak pernah mencapai nol. Pola matematis ini sering muncul dalam fenomena alam seperti peluruhan radioaktif, penurunan populasi, dan relevansi informasi dari waktu ke waktu.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/exp-decay.png" alt="Exp Decay" class="doc-image" id="exp-decay" />
   </span> <span class="img-wrapper"> <span>Peluruhan Eksponensial</span> </span></p>
<p>Grafik di atas menunjukkan bagaimana peluruhan eksponensial akan memengaruhi peringkat artikel berita di platform berita digital:</p>
<ul>
<li><p><code translate="no">origin</code> (waktu saat ini): Saat ini, di mana relevansi berada pada titik maksimum (1,0).</p></li>
<li><p><code translate="no">offset</code> (3 jam): "Jendela berita terkini"-semua berita yang diterbitkan dalam 3 jam terakhir mempertahankan nilai relevansi penuh (1,0), memastikan bahwa berita yang sangat baru tidak dihukum karena perbedaan waktu yang kecil.</p></li>
<li><p><code translate="no">decay</code> (0.5): Skor pada jarak skala-parameter ini mengontrol seberapa dramatis skor berkurang seiring waktu.</p></li>
<li><p><code translate="no">scale</code> (24 jam): Periode waktu di mana relevansi turun ke nilai peluruhan-artikel berita yang berumur tepat 24 jam memiliki skor relevansinya berkurang setengahnya (0,5).</p></li>
</ul>
<p>Seperti yang dapat Anda lihat dari kurva, artikel berita yang berusia lebih dari 24 jam terus mengalami penurunan relevansi, tetapi tidak pernah mencapai nol. Bahkan berita dari beberapa hari yang lalu pun tetap memiliki relevansi minimal, sehingga berita yang penting tetapi lebih lama masih muncul di feed Anda (meskipun peringkatnya lebih rendah).</p>
<p>Perilaku ini meniru cara kerja relevansi berita - berita yang sangat baru sangat mendominasi, tetapi berita yang lebih lama masih bisa menerobos jika sangat relevan dengan minat pengguna.</p>
<h2 id="Formula" class="common-anchor-header">Rumus<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>Rumus matematika untuk menghitung skor peluruhan eksponensial adalah:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>d</mi><mi>o</mi><mi>c</mi><mo stretchy="false">)</mo><mo>=</mo><mi>exp</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mi>λ</mi><mo>⋅</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mn>0</mn><mo separator="true">,</mo><mrow><mo fence="true">∣</mo><mi>f</mi><mi>i</mi><mi>e</mi><mi>l</mi><mi>d</mi><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><msub><mi>e</mi><mrow><mi>d</mi><mi>o</mi><mi>c</mi></mrow></msub><mo>−</mo><mi>o</mi><mi>r</mi><mi>i</mi><mi>g</mi><mi>i</mi><mi>n</mi><mo fence="true">∣</mo></mrow><mo>−</mo><mi>o</mi><mi>f</mi><mi>f</mi><mi>s</mi><mi>e</mi><mi>t</mi><mo fence="true">)</mo></mrow><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(doc) = \exp\left( \lambda \cdot \max\left(0, \left|fieldvalue_{doc} - origin\right| - offset \right) \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">oc</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">∣</span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">oc</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">in</span><span class="mclose delimcenter" style="top:0em;">∣</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.10764em;">ff</span><span class="mord mathnormal">se</span><span class="mord mathnormal">t</span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span></span></span></span></span></p>
<p>Di mana:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>λ</mi><mo>=</mo><mfrac><mrow><mi>ln</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>d</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>y</mi><mo stretchy="false">)</mo></mrow><mrow><mi>s</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>e</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">\lambda = \frac{\ln(decay)}{scale}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">sc</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">e</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mop">ln</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Menjabarkannya dalam bahasa yang sederhana:</p>
<ol>
<li><p> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span>Hitung seberapa jauh nilai lapangan dari nilai asal:</span></span></span></span></span></span></span></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">∣nilai_lapangan_{doc}</mi></mrow></semantics></math></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">-</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord mathnormal">asal∣|nilai_lapangan_{doc}</span></span><span class="base"><span class="mord"><span class="mord mathnormal">- a</span></span><span class="mord">sal</span><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">∣nilai_lapangan_{doc} ∣nilai_lapangan_{doc} - asal</span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">∣nilai_l</span></span></span></span></span></span><span class="base"><span class="mord">apangan_{doc} - asal</span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="base"><span class="mord"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="base"><span class="mord"> </span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="base"><span class="mord"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">  .</span></span></span></span></p></li>
<li><p>Kurangi offset (jika ada) tetapi jangan sampai di bawah nol: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>max</mi><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi>jarak-offset</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\max(0, jarak - offset)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">jarak</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">offset</span><span class="mclose">)</span></span></span></span>.</p></li>
<li><p>Kalikan dengan <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> λ\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>, yang dihitung dari skala dan parameter peluruhan Anda.</p></li>
<li><p>Ambil eksponennya, yang memberi Anda nilai antara 0 dan 1: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo stretchy="false">(</mo><mi>λ⋅nilai</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\lambda \cdot nilai)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">nilai</span><span class="mclose">)</span></span></span></span>.</p></li>
</ol>
<p>Perhitungan <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> λ\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span> mengubah parameter skala dan peluruhan Anda menjadi parameter laju untuk fungsi eksponensial. Nilai <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> λ\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span> yang lebih negatif akan menghasilkan penurunan awal yang lebih curam.</p>
<h2 id="Use-exponential-decay" class="common-anchor-header">Gunakan peluruhan eksponensial<button data-href="#Use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Peluruhan eksponensial dapat diterapkan pada pencarian vektor standar dan operasi pencarian hibrida di Milvus. Di bawah ini adalah cuplikan kode kunci untuk mengimplementasikan fitur ini.</p>
<div class="alert note">
<p>Sebelum menggunakan fungsi peluruhan, Anda harus terlebih dahulu membuat koleksi dengan bidang numerik yang sesuai (seperti stempel waktu, jarak, dll.) yang akan digunakan untuk perhitungan peluruhan. Untuk contoh kerja lengkap termasuk penyiapan koleksi, definisi skema, dan penyisipan data, lihat <a href="/docs/id/tutorial-implement-a-time-based-ranking-in-milvus.md">Tutorial Decay Ranker</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Membuat pemeringkat peluruhan</h3><p>Setelah koleksi Anda disiapkan dengan bidang numerik (dalam contoh ini, <code translate="no">publish_time</code>), buatlah pemeringkat peluruhan eksponensial:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create an exponential decay ranker for news recency</span>
ranker = Function(
    name=<span class="hljs-string">&quot;news_recency&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;publish_time&quot;</span>],   <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;exp&quot;</span>,                <span class="hljs-comment"># Choose exponential decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime.now().timestamp()),  <span class="hljs-comment"># Current time</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,            <span class="hljs-comment"># 3 hour breaking news window</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>             <span class="hljs-comment"># 24 hours (1 day)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Terapkan ke pencarian vektor standar</h3><p>Setelah menentukan pemeringkat peluruhan, Anda dapat menerapkannya selama operasi pencarian dengan meneruskannya ke parameter <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],             <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Terapkan ke pencarian hibrida</h3><p>Pemeringkat peluruhan juga dapat diterapkan pada operasi pencarian hibrida yang menggabungkan beberapa bidang vektor:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang operasi pencarian hibrida, lihat <a href="/docs/id/multi-vector-search.md">Pencarian Hibrida Multi-Vektor</a>.</p>
