---
id: membership-match.md
title: Pertandingan AnggotaCompatible with Milvus v3.0.2+
summary: >-
  Saring entitas berdasarkan kumpulan anggota yang besar menggunakan filter
  Bloom ringkas atau bitmap Roaring yang tepat, lengkap dengan sintaksis, pola
  permintaan SDK, semantik penghapusan, dan batasan operasional.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Pertandingan Anggota<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Pencocokan keanggotaan menyaring entitas dengan memeriksa apakah nilai bidang skalar termasuk dalam himpunan yang disediakan oleh pemanggil. Klien membangun blob filter keanggotaan biner yang ringkas dan meneruskannya sebagai nilai templat ekspresi.</p>
<p>Fitur ini menggantikan daftar " <code translate="no">IN [...]</code> " yang besar. Filter " <code translate="no">IN</code> " menserialisasikan setiap anggota ke dalam permintaan, sehingga himpunan anggota yang cukup besar dapat melebihi batas penerimaan gRPC proxy. Dengan " <code translate="no">membership_match</code>", proxy memvalidasi blob tersebut dan menyematkannya ke dalam rencana kueri tanpa perlu membangun ulang daftar anggota.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>Alur kerja Membership Match: klien membuat blob yang dapat digunakan kembali, proxy memvalidasinya, dan QueryNodes mengevaluasinya.</span>
  
 </span></p>
<p>Diagram tersebut menunjukkan pembagian tugas yang tetap. Klien membuat blob satu kali dan menggunakannya kembali di seluruh permintaan; proxy memvalidasi batas amplop dan ukuran serta menyematkan blob ke dalam rencana kueri secara verbatim; dan QueryNodes mengevaluasi rencana tersebut terhadap data mentah atau indeks.</p>
<p>Operator ini memiliki dua pengkodean dengan jaminan kebenaran yang berbeda:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): Keanggotaan perkiraan. Hasil positif palsu mungkin terjadi; hasil negatif palsu tidak diharapkan dari filter yang valid. Penggunaan umum: filter audiens atau pengecualian dengan volume tinggi di mana hasil positif palsu sesekali dapat diterima.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): Keanggotaan yang tepat untuk nilai bilangan bulat. Penggunaan umum: ACL, visibilitas penyewa, filter kepatuhan, dan operasi penghapusan berdasarkan kumpulan ID.</li>
</ul>
<p>Jangan gunakan keanggotaan <strong>Bloom</strong> untuk keputusan otorisasi atau penghapusan yang merusak. Hasil positif palsu dapat mengekspos entitas atau menghapus entitas yang tidak termasuk dalam kumpulan yang dimaksud.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Daftar periksa operasional<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Pastikan tipe bidang target dan buat blob dari domain nilai yang sama.</li>
<li>Pilih Bloom hanya jika hasil positif palsu dapat diterima.</li>
<li>Pilih Roaring untuk operasi ACL, kepatuhan, isolasi penyewa, dan penghapusan.</li>
<li>Buat blob besar sekali saja dan gunakan kembali; jangan buat ulang di setiap permintaan.</li>
<li>Hitung ukuran blob dalam byte yang diserialisasikan, bukan berdasarkan jumlah anggota.</li>
<li>Pada kluster dengan versi campuran, selesaikan peningkatan bertahap (rolling upgrade), mulai dari proxy terlebih dahulu, sebelum mengaktifkan " <code translate="no">membership_match</code>".</li>
<li>Uji ekspresi tersebut pada koleksi non-produksi sebelum mengaktifkan alur kerja yang bersifat destruktif.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Sintaks ekspresi<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>Argumen kedua adalah penanda tempat templat. SDK menyediakan nilai penanda tempat sebagai objek ` <code translate="no">bytes</code> ` protobuf yang berisi blob filter yang dibangun oleh klien. Pastikan ` <code translate="no">type</code> ` dinyatakan secara eksplisit dalam ekspresi produksi agar kontrak kebenaran yang dimaksud terlihat dalam kode dan log.</p>
<p>Argumen ` <code translate="no">type</code> ` bersifat opsional. Setiap blob membawa header magis yang mendeskripsikan dirinya sendiri, ` <code translate="no">MBF1</code> ` untuk Bloom dan ` <code translate="no">MRB1</code> ` untuk Roaring, dan server mendeteksi header tersebut saat ` <code translate="no">type</code> ` diabaikan. ` <code translate="no">type</code> ` eksplisit yang bertentangan dengan header blob akan ditolak sebagai kesalahan permintaan, sedangkan header yang tidak dikenal atau terpotong mengakibatkan status fail-closed.</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Pilih pengkodean<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan Bloom jika false positive dapat diterima. Bloom mendukung bidang bilangan bulat bertanda (<strong>INT8/16/32/64</strong>), bidang <strong>VARCHAR</strong>, dan jalur <strong>JSON</strong>. Filter Bloom bukanlah daftar izinkan yang tepat.</p>
<p><code translate="no">fpr</code> (false-positive rate) adalah probabilitas bahwa filter Bloom melaporkan suatu nilai sebagai anggota padahal nilai tersebut tidak pernah dimasukkan: <code translate="no">fpr=0.005</code> berarti kira-kira satu nilai non-anggota dari setiap 200 nilai dilaporkan secara keliru sebagai ada. FPR yang lebih rendah menghasilkan blob yang lebih besar.</p>
<p>Gunakan <strong>Roaring</strong> jika setiap pencocokan harus tepat. <strong>Roaring</strong> hanya menerima kolom bilangan bulat bertanda; anggota diperluas tanda menjadi <strong>INT64</strong> sebelum serialisasi, sehingga INT8 -1 dan INT64 -1 dianggap sebagai anggota yang sama. Jangan gunakan metode ini untuk UUID atau kolom string lainnya.</p>
<table>
<thead>
<tr><th>Dimensi</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Presisi</td><td>Perkiraan; kemungkinan hasil positif palsu; tidak ada hasil negatif palsu</td><td>Tepat; tidak ada hasil positif palsu dan tidak ada hasil negatif palsu</td></tr>
<tr><td>Kolom</td><td>INT8/16/32/64, VARCHAR, jalur JSON</td><td>Hanya INT8/16/32/64 bertanda</td></tr>
<tr><td>Ukuran Blob</td><td>Jumlah anggota dan FPR; sekitar 11 bit per anggota pada FPR 0,005; struktur berkuasa dua</td><td>Distribusi nilai; himpunan padat terkompresi menjadi ukuran yang jauh lebih kecil; nilai acak 64-bit mencapai batas maksimum wadah sebesar 262.144</td></tr>
<tr><td>Penghapusan</td><td>Ditolak pada saat penguraian</td><td>Diizinkan</td></tr>
<tr><td>Penggunaan umum</td><td>Filter audiens dan pengecualian</td><td>ACL, kepatuhan, isolasi penyewa, penghapusan berdasarkan kumpulan ID</td></tr>
</tbody>
</table>
<p>Jalur<strong>JSON</strong> bertipe ketat, baris demi baris: string <strong>JSON</strong> diperiksa sebagai nilai <strong>VARCHAR</strong>, bilangan bulat <strong>JSON</strong> sebagai nilai <strong>INT64</strong>, dan bilangan ganda <strong>JSON</strong> tidak pernah cocok dengan anggota bilangan bulat, tidak seperti <code translate="no">IN</code> yang tepat, di mana 5,0 sama dengan 5. Jika penulis Anda mengenkode bilangan bulat sebagai float, normalisasikan saat penulisan atau gunakan bidang skalar bertipe.</p>
<p>Untuk kedua pengkodean tersebut, buat kumpulan anggota dari domain nilai yang sama dengan bidang target. Jangan membangun filter Bloom dari string <code translate="no">&quot;10086&quot;</code> dan menerapkannya ke bidang <code translate="no">INT64</code>. Header blob mencatat domain nilai yang dimasukkan, dan blob dengan domain yang salah akan ditolak oleh proxy dengan kesalahan parameter, bukan diam-diam tidak cocok dengan apa pun. Gunakan kembali blob yang sudah dibuat di seluruh permintaan daripada membangunnya ulang untuk setiap kueri.</p>
<p>Untuk himpunan dengan beberapa ribu anggota atau kurang, " <code translate="no">IN</code> " biasa tetap menjadi opsi paling sederhana. Server tidak memilih antara <strong>IN</strong>, <strong>Bloom</strong>, dan <strong>Roaring</strong>. Pemilihan enkoding menjadi tanggung jawab pemanggil.</p>
<p>Untuk memilih pengkodean:</p>
<ol>
<li>Tentukan apakah beban kerja dapat mentoleransi hasil positif palsu. Jika tidak, <strong>Bloom</strong> bukanlah pilihan yang tepat.</li>
<li>Untuk keanggotaan yang tepat, gunakan <strong>Roaring</strong> dengan bidang bilangan bulat bertanda. Nilai yang padat atau terkluster akan terkompresi menjadi blob terkecil.</li>
<li>Periksa batas ukuran. Nilai acak seragam 64-bit mungkin melebihi batas maksimum kontainer sebesar 262.144 atau batas ukuran. Jika demikian, gunakan daftar <strong>IN</strong> tradisional yang sesuai dengan batas permintaan.</li>
<li>Untuk keanggotaan yang tepat pada bidang non-bilangan bulat, gunakan <strong>IN</strong>. Tidak ada pengkodean keanggotaan yang tepat untuk bidang-bidang ini.</li>
</ol>
<p>Pencocokan keanggotaan tidak tersedia melalui API HTTP RESTful. Parameter templat ekspresi HTTP hanya menerima nilai bool, angka, string, dan array; tidak ada tipe biner <code translate="no">bytes</code> untuk blob. Gunakan SDK berbasis gRPC untuk mengirimkan blob keanggotaan.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">Pola permintaan SDK<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Potongan kode berikut berfokus pada pembuatan blob keanggotaan dan meneruskannya sebagai parameter templat filter. Potongan kode ini mengasumsikan bahwa koleksi dan bidang sudah ada dan dimuat, klien SDK sudah terhubung, serta vektor kueri, daftar anggota, dan variabel lain yang dirujuk telah didefinisikan. Pengaturan koleksi dan kerangka aplikasi lengkap tidak disertakan.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Hapus dengan Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan blob <strong>Roaring</strong> yang tepat saat menghapus entitas yang dipilih oleh himpunan ID integer eksternal. Periksa himpunan anggota dan tipe bidang koleksi sebelum menjalankan perintah hapus. Jangan gunakan Bloom: keanggotaan perkiraan bukanlah predikat hapus yang aman, dan bentuk Bloom ditolak dalam ekspresi Hapus pada saat penguraian.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>Semantik penghapusan mengikuti pencocokan tiga nilai yang tepat:</p>
<table>
<thead>
<tr><th>Nilai bidang</th><th>membership_match(…)</th><th>bukan membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>tidak cocok (NULL)</td><td>tidak cocok (NULL)</td></tr>
<tr><td>dalam himpunan anggota</td><td>cocok</td><td>tidak cocok</td></tr>
<tr><td>di luar himpunan</td><td>tidak cocok</td><td>cocok</td></tr>
</tbody>
</table>
<p>Tabel tersebut dibaca baris demi baris: perintah Delete dengan <code translate="no">membership_match</code> menghapus entitas yang berada di dalam himpunan, perintah Delete dengan <code translate="no">not membership_match</code> menghapus entitas yang berada di luar himpunan, dan entitas dengan nilai NULL tetap ada pada kedua polaritas.</p>
<ul>
<li>Entitas dengan nilai bidang NULL tidak pernah dihapus, di bawah polaritas mana pun.</li>
<li>Bitmap kosong tidak menghapus apa pun. ` <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> ` menghapus setiap entitas dengan nilai bidang non-NULL; komplemen yang tepat, yang mungkin merupakan himpunan besar sesuai desain.</li>
<li><code translate="no">not membership_match</code> adalah komplemen tepat dari himpunan anggota atas entitas non-NULL, bukan perkiraan.</li>
</ul>
<p>Pada segmen tertutup yang dimuat hanya berdasarkan indeks, tanpa data skalar mentah, evaluasi menggunakan pencarian terbalik terbatas jika indeks mendukungnya. Jika data bidang mentah maupun indeks yang memenuhi syarat tidak tersedia, permintaan akan gagal dengan " <code translate="no">FieldNotLoaded</code> " alih-alih mengembalikan entitas yang tidak difilter.</p>
<h2 id="Operational-limits" class="common-anchor-header">Batasan operasional<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Pengaturan</th><th>Default</th><th>Dapat dikonfigurasi</th><th>Apa yang dibatasi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> proksi</td><td>satu isi blob</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proksi</td><td>agregat per permintaan</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proksi</td><td>seluruh permintaan</td></tr>
<tr><td>Batas maksimum kontainer yang sangat tinggi</td><td>262.144</td><td>diperbaiki dalam kode</td><td>per filter</td></tr>
<tr><td>Perkiraan memori terdekodifikasi Roaring</td><td>64 MiB</td><td>tetap dalam kode</td><td>per filter</td></tr>
<tr><td>Batas format MBF1</td><td>128 MiB</td><td>tetap dalam kode</td><td>batas atas format blob</td></tr>
<tr><td>Bloom <code translate="no">fpr</code></td><td>0,005</td><td>pembuat klien</td><td>target positif palsu</td></tr>
</tbody>
</table>
<p>Pengaturan " <code translate="no">proxy.*</code> " merupakan konfigurasi server Milvus: pengaturan ini ditetapkan oleh operator kluster di <code translate="no">milvus.yaml</code> pada bagian " <code translate="no">proxy</code> " dan tidak dapat disesuaikan per permintaan atau per ekspresi saat proses penyaringan. Pengaturan " <strong>Roaring</strong> admissions" dan batas format MBF1 sudah ditetapkan dalam implementasi dan tidak dapat dikonfigurasi di mana pun. Baris " <code translate="no">fpr</code> " adalah satu-satunya pengaturan di sisi klien: nilainya ditentukan saat blob dibuat, dengan rentang yang diterima antara 0,0001 hingga 0,05.</p>
<p>Badan blob maksimum dapat menampung sekitar 48,6 juta anggota INT64 pada fpr default, dengan header amplop 32-byte tetap yang diizinkan di bagian atas. Anggaran permintaan mencakup ukuran serialisasi agregat dari rencana yang mengandung keanggotaan ditambah ukuran terdekodasi yang diperkirakan secara agregat dari filter Roaring, dan sub-permintaan HybridSearch serta filter penilai berbagi anggaran tersebut. Tubuh Bloom merupakan pangkat dua: jumlah anggota yang sedikit melebihi batas tingkatan akan menggandakan ukuran blob, dan nilai fpr yang sedikit lebih tinggi sering kali masih muat di tingkatan di bawahnya. Ketika proxy menolak blob Bloom yang berukuran terlalu besar, pesan kesalahan akan menyarankan ekspresi keanggotaan ( <code translate="no">fpr</code> ) yang sesuai.</p>
<ul>
<li>Hasil ekspresi keanggotaan tidak disimpan dalam cache antar permintaan.</li>
<li>Cluster versi campuran gagal ditutup: QueryNodes yang menjalankan kode lama menolak rencana yang berisi node rencana keanggotaan. Tingkatkan proxy terlebih dahulu, lalu selesaikan peningkatan bertahap sebelum mengaktifkan operator.</li>
<li>Log server menyensor byte blob. Teks ekspresi hanya berisi nama templat; muatan biner dikirimkan di luar jalur dalam nilai-nilai templat.</li>
</ul>
