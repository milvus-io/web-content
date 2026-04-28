---
id: force-merge.md
title: Pemadatan Penggabungan PaksaCompatible with Milvus 3.0.x
summary: >-
  Gunakan pemadatan penggabungan paksa untuk menggabungkan segmen-segmen kecil
  dan meningkatkan kinerja kueri serta efisiensi penyimpanan.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Pemadatan Penggabungan Paksa<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge dirancang untuk menggabungkan segmen-segmen kecil dan terfragmentasi menjadi segmen yang lebih sedikit dan lebih besar untuk meningkatkan kinerja kueri dan efisiensi penyimpanan. Panduan ini menjelaskan cara menggunakan pemadatan penggabungan paksa.</p>
<div class="alert note">
<p>Fitur ini dalam pratinjau publik. Jangan gunakan fitur ini di lingkungan produksi.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Ikhtisar<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">Pemadatan</a> standar menjaga ukuran segmen tetap mendekati <code translate="no">maxSize</code> yang dikonfigurasi melalui penggabungan banyak-ke-satu, tetapi masih dapat menyisakan fragmen berukuran sedang yang tidak dapat digabungkan lebih lanjut tanpa melebihi batas. Misalnya, seperti yang diilustrasikan di bawah ini, jika koleksi memiliki lima segmen 2 MB dan <code translate="no">maxSize</code> berukuran 3 MB, penggabungan dua segmen akan melebihi batas, sehingga pemadatan standar tidak dapat mengurangi jumlah segmen lebih lanjut dan tata letak yang terfragmentasi tetap ada.</p>
<p>Penggabungan paksa menambahkan parameter <code translate="no">target_size</code> dan mendukung pengorganisasian ulang segmen ke ukuran yang diinginkan dalam toleransi yang ketat jika memungkinkan. Seperti yang diilustrasikan di bawah ini, jika <code translate="no">target_size</code> yang ditentukan adalah 4 MB, lima segmen kecil berukuran 2 MB dapat digabungkan lebih lanjut menjadi lebih sedikit segmen yang lebih besar. Hal ini mengurangi jumlah segmen yang berlebih, mendukung target yang lebih besar dari pengaturan default <code translate="no">maxSize</code>, dan, jika targetnya sangat besar, memungkinkan sistem memilih ukuran output dan jumlah segmen yang praktis untuk perangkat keras dan topologi QueryNode saat ini.</p>
<p>Untuk memahami metode pemadatan mana yang digunakan, lihat <a href="#faq">Pertanyaan</a> Umum.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>Pemadatan penggabungan paksa memperluas pemadatan yang sudah ada <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API dengan parameter <code translate="no">target_size</code>. API ini sepenuhnya kompatibel ke belakang: panggilan pemadatan yang sudah ada tanpa <code translate="no">target_size</code> akan tetap berfungsi seperti sebelumnya.</p>
<p>Penggabungan paksa beroperasi secara asinkron. Ia tidak memblokir operasi pencarian atau kueri, meskipun mengkonsumsi sumber daya I/O dan memori selama eksekusi.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Menggunakan Pemadatan Penggabungan Paksa<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus versi 2.6.15 atau yang lebih baru</p></li>
<li><p>pymilvus 2.6.13 atau yang lebih baru</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Konfigurasi Global<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Parameter konfigurasi berikut ini mengontrol perilaku Penggabungan Paksa. Aturlah dalam berkas konfigurasi Milvus atau melalui variabel lingkungan.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Nilai Default</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>Ukuran maksimum segmen default dalam MB. Digunakan sebagai target ketika <code translate="no">target_size</code> adalah 0 atau dihilangkan. Juga berfungsi sebagai nilai minimum yang diizinkan untuk <code translate="no">target_size</code> eksplisit.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Ambang batas jumlah segmen untuk pemilihan algoritma. Ketika jumlah segmen melebihi nilai ini, Milvus menggunakan algoritma greedy yang lebih cepat untuk perencanaan penggabungan.</p><ul><li><p><strong>Algoritma standar</strong> (digunakan ketika jumlah segmen &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): menghasilkan hasil penggabungan yang lebih optimal tetapi membutuhkan waktu lebih lama untuk dihitung.</p></li><li><p><strong>Algoritma Greedy</strong> (digunakan ketika jumlah segmen &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): menyelesaikan perencanaan dengan lebih cepat dengan mengorbankan pengelompokan segmen yang kurang optimal.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Memori DataNode dibagi dengan faktor ini untuk menghitung ukuran segmen terbesar yang dapat diijinkan oleh sistem.</p><ul><li><p>Nilai yang lebih besar mengalokasikan lebih sedikit memori untuk penggabungan tetapi menyisakan lebih banyak untuk operasi DataNode lainnya, sehingga meningkatkan stabilitas node.</p></li><li><p>Nilai yang lebih kecil memungkinkan penggabungan yang lebih besar tetapi meningkatkan tekanan memori.</p></li><li><p>Sebagai contoh, dengan faktor default 4.0 dan DataNode dengan memori 16 GB, anggaran penggabungan adalah 4 GB. Ini berarti ukuran total segmen yang digabungkan dalam satu operasi tidak boleh melebihi 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Memori QueryNode minimum dibagi dengan faktor ini. Digunakan selama perhitungan ukuran otomatis (<code translate="no">target_size=max_int64</code>) untuk memastikan bahwa segmen yang digabungkan dapat dimuat oleh QueryNode.</p><ul><li><p>Nilai yang lebih besar menghasilkan segmen yang lebih kecil yang lebih mudah dimuat oleh QueryNode.</p></li><li><p>Nilai yang lebih kecil memungkinkan segmen yang lebih besar tetapi dapat menyebabkan kegagalan pemuatan pada QueryNode yang memiliki keterbatasan memori.</p></li><li><p>Sebagai contoh, dengan faktor default 4.0 dan QueryNode terkecil memiliki memori 16 GB, ukuran target yang dihitung secara otomatis tidak akan melebihi 4 GB. Hal ini mencegah Penggabungan Paksa menghasilkan segmen yang sangat besar sehingga QueryNode tidak dapat memuatnya.</p></li></ul></td>
   </tr>
</table>
<p>Untuk menerapkan perubahan di atas pada cluster Milvus Anda, silakan ikuti langkah-langkah di <a href="/docs/id/configure-helm.md#Configure-Milvus-via-configuration-file">Konfigurasi Milvus dengan Helm</a> dan <a href="/docs/id/configure_operator.md">Konfigurasi Milvus dengan Operator Milvus</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Memicu Pemadatan Penggabungan Paksa<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda memicu pemadatan Force Merge dengan memanggil <code translate="no">compact()</code> dengan parameter <code translate="no">target_size</code>. Untuk detail parameter, lihat <a href="#parameter-reference">Referensi parameter</a> di bawah ini.</p>
<p>Tersedia tiga mode pemadatan penggabungan gaya:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>Berikut ini adalah contoh untuk menunjukkan cara menggunakan setiap mode pemadatan penggabungan gaya.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Default (pemadatan standar)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Ukuran target eksplisit</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Perhitungan ukuran otomatis</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Referensi parameter</h4><p>Tabel berikut menjelaskan parameter.</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Jenis</strong></p></th>
     <th><p><strong>Deskripsi</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Wajib. Nama koleksi yang akan dipadatkan.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Opsional. Ukuran segmen target dalam MB. Ada 3 pilihan nilai parameter:</p><ul><li><p><strong>0 atau dihilangkan</strong>: Menggunakan <code translate="no">dataCoord.segment.maxSize</code> yang telah dikonfigurasi (default: 512 MB). Setara dengan pemadatan standar.</p></li><li><p><strong>Nilai eksplisit</strong>: Menggabungkan segmen menjadi kira-kira ukuran yang ditentukan dalam MB (mis. 2048). Harus lebih besar dari atau sama dengan yang dikonfigurasi <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Secara otomatis menghitung ukuran optimal berdasarkan distribusi segmen saat ini dan sumber daya simpul yang tersedia.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Jika <code translate="no">target_size</code> yang ditentukan kurang dari <code translate="no">dataCoord.segment.maxSize</code> yang dikonfigurasi, permintaan ditolak dengan kesalahan.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Memeriksa Kemajuan Pemadatan<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>Pemadatan Penggabungan Paksa berjalan secara asinkron. Gunakan ID pekerjaan yang dikembalikan untuk memeriksa kemajuan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Praktik terbaik<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>Jangan gunakan pemadatan penggabungan paksa di lingkungan produksi.</strong></p></li>
<li><p><strong>Gunakan mode penghitungan ukuran otomatis untuk sebagian besar kasus.</strong> Mengatur <code translate="no">target_size</code> ke <code translate="no">max_int64</code> memungkinkan Milvus menganalisis distribusi segmen dan sumber daya simpul untuk menentukan ukuran terbaik. Ini adalah pendekatan yang direkomendasikan kecuali Anda memiliki persyaratan ukuran tertentu.</p></li>
<li><p><strong>Pertimbangkan pertukaran kinerja.</strong> Pemadatan Force Merge adalah operasi yang membutuhkan banyak sumber daya. Operasi ini membaca, menggabungkan, dan menulis ulang data segmen. Jadwalkan selama periode lalu lintas rendah untuk meminimalkan dampak pada latensi kueri.</p></li>
<li><p><strong>Pantau jumlah segmen sebelum dan sesudahnya.</strong> Gunakan <code translate="no">get_compaction_state()</code> dan <code translate="no">list_persistent_segments</code> untuk memverifikasi bahwa pemadatan menghasilkan segmen yang lebih sedikit dan lebih besar seperti yang diharapkan.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">PERTANYAAN UMUM<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Apa perbedaan Penggabungan Paksa dengan pemadatan standar?</strong></p>
<p>Kedua jenis operasi pemadatan ini memiliki tujuan yang berbeda.</p>
<ul>
<li><p>Pemadatan standar (targetSize = 0 atau dihilangkan) adalah upaya terbaik, jalur pembersihan bertahap.</p></li>
<li><p>Penggabungan paksa (targetSize&gt;0) adalah jalur pengemasan ulang tingkat koleksi untuk menghasilkan segmen yang lebih sedikit, lebih besar, dan mendekati target.</p></li>
</ul>
<p>Perbedaan utamanya adalah bentuk penggabungan: pemadatan standar secara efektif adalah m → 1 per tugas, sedangkan penggabungan paksa adalah m → n di seluruh input yang dikelompokkan. Inilah sebabnya mengapa penggabungan paksa dapat menyelesaikan tata letak segmen yang tidak dapat dilakukan oleh pemadatan standar. Tabel berikut ini membandingkan 2 jenis operasi tersebut.</p>
<table>
   <tr>
     <th><p><strong>Dimensi</strong></p></th>
     <th><p><strong>Pemadatan standar (default)</strong></p></th>
     <th><p><strong>Penggabungan paksa</strong></p></th>
   </tr>
   <tr>
     <td><p>Pemicu API</p></td>
     <td><p>targetSize = 0 (atau tidak disetel), tidak ada flag Major/L0</p></td>
     <td><p>targetUkuran&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Tujuan utama</p></td>
     <td><p>Pembersihan tambahan dari fragmen yang jelas; pemeliharaan rutin</p></td>
     <td><p>Konsolidasi seluruh koleksi untuk pencarian dan keseimbangan</p></td>
   </tr>
   <tr>
     <td><p>Sumber ukuran segmen</p></td>
     <td><p>Memperbaiki dataCoord.segment.maxSize (konfigurasi server)</p></td>
     <td><p>Ukuran target pengguna, kemudian dijepit dengan pengaman oleh maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Validitas parameter</p></td>
     <td><p>Tidak ada penyetelan ukuran pengguna</p></td>
     <td><p>TargetSize pengguna harus &gt;= dataCoord.segment.maxSize; jika tidak, ditolak</p></td>
   </tr>
   <tr>
     <td><p>Batas atas keamanan</p></td>
     <td><p>Hanya batas konfigurasi</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (mandiri non-pooling: dibagi dua)</p></td>
   </tr>
   <tr>
     <td><p>Gabungkan bentuk</p></td>
     <td><p>m → 1 per tugas, keluaran &lt;= configMaxSize</p></td>
     <td><p>m → n, keluaran mendekati targetSize</p></td>
   </tr>
   <tr>
     <td><p>Perilaku segmen menengah</p></td>
     <td><p>Dapat macet secara permanen (misalnya, dua segmen 60% tidak dapat secara legal menjadi satu segmen 120%)</p></td>
     <td><p>Pengemasan ulang + pemisahan berfungsi; tidak ada pola "macet di 60%"</p></td>
   </tr>
   <tr>
     <td><p>Kemampuan perataan koleksi</p></td>
     <td><p>Terbatas; proses yang berulang-ulang mungkin masih menyisakan banyak segmen sedang</p></td>
     <td><p>Kuat; dirancang untuk mengurangi jumlah segmen dan mendorong kepenuhan lebih tinggi</p></td>
   </tr>
   <tr>
     <td><p>Kesadaran topologi</p></td>
     <td><p>Tidak ada</p></td>
     <td><p>Ya; menggunakan tata letak QueryNode/replika/pecahan</p></td>
   </tr>
   <tr>
     <td><p>Penyetelan paralelisme jalur baca</p></td>
     <td><p>Tidak ada</p></td>
     <td><p>Menyesuaikan jumlah keluaran menggunakan queryNodeCount / (replika × pecahan) jika valid</p></td>
   </tr>
   <tr>
     <td><p>Kasus penggunaan umum</p></td>
     <td><p>Pembersihan harian dengan tingkat kemelut tinggi setelah penulisan/penghapusan</p></td>
     <td><p>Persiapan tolok ukur, pengoptimalan pencarian, penyelarasan paralelisme beban</p></td>
   </tr>
   <tr>
     <td><p>Ekspektasi cakupan</p></td>
     <td><p>Jangan mengharapkan pengemasan ulang koleksi penuh</p></td>
     <td><p>Ditujukan untuk hasil pengemasan ulang tingkat koleksi</p></td>
   </tr>
</table>
<p><strong>Panduan pemilihan:</strong></p>
<ul>
<li><p>Pilih pemadatan standar untuk pembersihan bertahap yang berisiko rendah.</p></li>
<li><p>Pilih penggabungan paksa jika Anda secara eksplisit ingin membentuk kembali koleksi menjadi lebih sedikit, segmen yang lebih besar yang selaras dengan perilaku pencarian dan pemuatan.</p></li>
</ul>
<p><strong>Apa perbedaan Force Merge dengan pemadatan pengelompokan?</strong></p>
<p><a href="/docs/id/clustering-compaction.md">Pemadatan</a> pengelompokan (<code translate="no">is_clustering=True</code>) mengatur ulang data dalam segmen berdasarkan kunci pengelompokan untuk meningkatkan pemangkasan pencarian. Force Merge (<code translate="no">target_size=N</code>) mengoptimalkan ukuran segmen tanpa mengubah distribusi data. Keduanya memiliki tujuan yang berbeda dan dapat digunakan bersamaan - jalankan pemadatan pengelompokan terlebih dahulu untuk mengatur data, lalu lakukan Penggabungan Paksa untuk menggabungkan segmen yang dihasilkan.</p>
<p><strong>Dapatkah saya menjalankan Penggabungan Paksa pada koleksi yang sedang ditanyakan?</strong></p>
<p>Ya. Force Merge berjalan secara asinkron dan tidak memblokir kueri. Namun, proses ini menghabiskan sumber daya DataNode dan disk I/O, sehingga latensi kueri dapat meningkat selama pemadatan. Jadwalkan Penggabungan Paksa selama periode lalu lintas rendah untuk hasil terbaik.</p>
<p><strong>Apa yang terjadi jika saya menetapkan target_size lebih kecil dari maxSize?</strong></p>
<p>Permintaan akan ditolak dengan kesalahan. Ukuran target harus lebih besar atau sama dengan yang dikonfigurasi <code translate="no">dataCoord.segment.maxSize</code>.</p>
