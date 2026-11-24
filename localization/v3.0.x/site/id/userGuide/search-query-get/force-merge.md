---
id: force-merge.md
title: Pemadatan Force MergeCompatible with Milvus 3.0.x
summary: >-
  Gunakan pemadatan penggabungan paksa untuk menggabungkan segmen-segmen kecil
  serta meningkatkan kinerja kueri dan efisiensi penyimpanan.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Pemadatan Force Merge<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge dirancang untuk menggabungkan segmen-segmen kecil dan terfragmentasi menjadi segmen yang lebih sedikit namun lebih besar guna meningkatkan kinerja kueri dan efisiensi penyimpanan. Panduan ini menjelaskan cara menggunakan kompresi Force Merge.</p>
<div class="alert note">
<p>Fitur ini masih dalam tahap pratinjau publik. Jangan gunakan fitur ini di lingkungan produksi.</p>
</div>
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
    </button></h2><p><code translate="no">maxSize</code> K <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">ompresi</a> standar menjaga ukuran segmen tetap mendekati batas maksimum yang dikonfigurasi ( <code translate="no">maxSize</code> ) melalui penggabungan banyak-ke-satu, tetapi masih dapat meninggalkan fragmen berukuran sedang yang tidak dapat digabungkan lebih lanjut tanpa melebihi batas. Misalnya, seperti yang digambarkan di bawah ini, jika sebuah koleksi memiliki lima segmen berukuran 2 MB dan batas ukuran maksimum ( ) adalah 3 MB, penggabungan dua segmen mana pun akan melebihi batas tersebut, sehingga kompresi standar tidak dapat mengurangi jumlah segmen lebih lanjut dan tata letak yang terfragmentasi tetap ada.</p>
<p>Penggabungan paksa (Force merge) menambahkan parameter " <code translate="no">target_size</code> " dan mendukung reorganisasi segmen menuju ukuran yang diinginkan dalam toleransi yang ketat jika memungkinkan. Seperti yang digambarkan di bawah ini, jika ukuran target ( <code translate="no">target_size</code> ) yang ditentukan adalah 4 MB, lima segmen kecil berukuran 2 MB dapat digabungkan lebih lanjut menjadi segmen-segmen yang lebih besar dengan jumlah yang lebih sedikit. Hal ini mengurangi jumlah segmen yang berlebihan, mendukung target yang lebih besar dari pengaturan default " <code translate="no">maxSize</code> ", dan, ketika target sangat besar, memungkinkan sistem memilih ukuran keluaran dan jumlah segmen yang praktis sesuai dengan hardware dan topologi QueryNode saat ini.</p>
<p>Untuk memahami metode pemadatan mana yang harus digunakan, lihat <a href="#faq">FAQ</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>Pemadatan penggabungan paksa memperluas <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> dengan parameter ` <code translate="no">target_size</code> `. Metode ini sepenuhnya kompatibel ke belakang: panggilan kompaksi yang ada tanp <code translate="no">target_size</code> tetap berfungsi seperti sebelumnya.</p>
<p>Force merge beroperasi secara asinkron. Metode ini tidak memblokir operasi pencarian atau kueri, meskipun mengonsumsi sumber daya I/O dan memori selama eksekusi.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Menggunakan Pemadatan Force Merge<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus versi 3.0 atau yang lebih baru</p></li>
<li><p>PyMilvus 3.0 atau yang lebih baru</p></li>
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
    </button></h3><p>Parameter konfigurasi berikut mengontrol perilaku Force Merge. Atur parameter ini di berkas konfigurasi Milvus atau melalui variabel lingkungan.</p>
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
     <td><p>1024</p></td>
     <td><p>Ukuran maksimum segmen default dalam MB. Digunakan sebagai target saat ` <code translate="no">target_size</code> ` bernilai 0 atau diabaikan. Juga berfungsi sebagai nilai minimum yang diperbolehkan untuk ` <code translate="no">target_size</code>` yang ditentukan secara eksplisit.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Ambang batas jumlah segmen untuk pemilihan algoritma. Ketika jumlah segmen melebihi nilai ini, Milvus menggunakan algoritma rakus yang lebih cepat untuk perencanaan penggabungan.</p><ul><li><p><strong>Algoritma standar</strong> (digunakan saat jumlah segmen &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): menghasilkan hasil penggabungan yang lebih optimal tetapi membutuhkan waktu komputasi yang lebih lama.</p></li><li><p><strong>Algoritma rakus</strong> (digunakan saat jumlah segmen &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): menyelesaikan perencanaan jauh lebih cepat dengan mengorbankan pengelompokan segmen yang sedikit kurang optimal.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Memori DataNode dibagi dengan faktor ini untuk menghitung ukuran segmen terbesar yang dapat diizinkan oleh sistem.</p><ul><li><p>Nilai yang lebih besar mengalokasikan lebih sedikit memori untuk penggabungan tetapi menyisakan lebih banyak untuk operasi DataNode lainnya, sehingga meningkatkan stabilitas node.</p></li><li><p>Nilai yang lebih kecil memungkinkan penggabungan yang lebih besar tetapi meningkatkan tekanan memori.</p></li><li><p>Misalnya, dengan faktor default 4.0 dan DataNode dengan memori 16 GB, anggaran penggabungan adalah 4 GB. Ini berarti ukuran total segmen yang digabungkan dalam satu operasi tidak boleh melebihi 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4,0</p></td>
     <td><p>Memori minimum QueryNode dibagi dengan faktor ini. Digunakan selama perhitungan ukuran otomatis (<code translate="no">target_size=max_int64</code>) untuk memastikan bahwa segmen yang digabungkan dapat dimuat oleh QueryNodes.</p><ul><li><p>Nilai yang lebih besar menghasilkan segmen yang lebih kecil sehingga lebih mudah dimuat oleh QueryNodes.</p></li><li><p>Nilai yang lebih kecil memungkinkan segmen yang lebih besar, tetapi dapat menyebabkan kegagalan pemuatan pada QueryNodes yang memiliki keterbatasan memori.</p></li><li><p>Misalnya, dengan faktor default 4.0 dan QueryNode terkecil yang memiliki memori 16 GB, ukuran target yang dihitung secara otomatis tidak akan melebihi 4 GB. Hal ini mencegah Force Merge menghasilkan segmen yang terlalu besar sehingga tidak dapat dimuat oleh QueryNodes.</p></li></ul></td>
   </tr>
</table>
<p>Untuk menerapkan perubahan di atas ke kluster Milvus Anda, ikuti langkah-langkah dalam <a href="/docs/id/configure-helm.md#Configure-Milvus-via-configuration-file">Konfigurasi Milvus dengan Helm</a> dan <a href="/docs/id/configure_operator.md">Konfigurasi Milvus dengan Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Memicu Kompresi Force Merge<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda memicu pemadatan Force Merge dengan memanggil ` <code translate="no">compact()</code> ` menggunakan parameter ` <code translate="no">target_size</code> `. Untuk detail parameter, lihat <a href="#parameter-reference">Referensi Parameter</a> di bawah ini.</p>
<p>Tersedia tiga mode kompaksi Force Merge:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 1024 MB)
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
<p>Berikut ini adalah contoh yang menunjukkan cara menggunakan setiap mode pemadatan Force Merge.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Default (kompaksi standar)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 1024 MB)</span>
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
<h4 id="Parameter-reference" class="common-anchor-header">Referensi parameter</h4><p>Tabel berikut menjelaskan parameter-parameter tersebut.</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Jenis</strong></p></th>
     <th><p><strong>Deskripsi</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Diperlukan. Nama koleksi yang akan dikompres.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Opsional. Ukuran segmen target dalam MB. Terdapat 3 opsi nilai parameter:</p><ul><li><p><strong>0 atau diabaikan</strong>: Menggunakan nilai " <code translate="no">dataCoord.segment.maxSize</code> " yang telah dikonfigurasi (default: 1024 MB). Setara dengan kompresi standar.</p></li><li><p><strong>Nilai eksplisit</strong>: Menggabungkan segmen hingga kira-kira ukuran yang ditentukan dalam MB (mis. 2048). Harus lebih besar dari atau sama dengan nilai ` <code translate="no">dataCoord.segment.maxSize</code>` yang dikonfigurasi.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Secara otomatis menghitung ukuran optimal berdasarkan distribusi segmen saat ini dan sumber daya node yang tersedia.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Jika ` <code translate="no">target_size</code> ` yang ditentukan lebih kecil dari ` <code translate="no">dataCoord.segment.maxSize</code>` yang dikonfigurasi, permintaan akan ditolak dengan pesan kesalahan.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Periksa Kemajuan Pemadatan<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>Proses kompaksi Force Merge berjalan secara asinkron. Gunakan ID pekerjaan yang dikembalikan untuk memeriksa kemajuan:</p>
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
<li><p><strong>Jangan gunakan pemadatan force merge di lingkungan produksi.</strong></p></li>
<li><p><strong>Gunakan mode perhitungan ukuran otomatis untuk sebagian besar kasus.</strong> Mengatur ` <code translate="no">target_size</code> ` menjadi ` <code translate="no">max_int64</code> ` memungkinkan Milvus menganalisis distribusi segmen dan sumber daya node Anda untuk menentukan ukuran terbaik. Ini adalah pendekatan yang direkomendasikan kecuali Anda memiliki persyaratan ukuran khusus.</p></li>
<li><p><strong>Pertimbangkan trade-off kinerja.</strong> Kompresi Force Merge adalah operasi yang memakan banyak sumber daya. Operasi ini membaca, menggabungkan, dan menulis ulang data segmen. Jadwalkan operasi ini selama periode lalu lintas rendah untuk meminimalkan dampak pada latensi kueri.</p></li>
<li><p><strong>Pantau jumlah segmen sebelum dan sesudah.</strong> Gunakan <code translate="no">get_compaction_state()</code> dan <code translate="no">list_persistent_segments</code> untuk memverifikasi bahwa proses kompaksi menghasilkan segmen yang lebih sedikit namun lebih besar, sesuai harapan.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">Pertanyaan Umum<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Apa perbedaan Force Merge dengan pemadatan standar?</strong></p>
<p>Kedua jenis operasi pemadatan ini memiliki tujuan yang berbeda.</p>
<ul>
<li><p>Pemadatan standar (targetSize=0 atau diabaikan) adalah jalur pembersihan bertahap dengan upaya terbaik.</p></li>
<li><p>Force merge (targetSize&gt;0) adalah jalur pengemasan ulang di tingkat koleksi untuk menghasilkan segmen yang lebih sedikit, lebih besar, dan mendekati target.</p></li>
</ul>
<p>Perbedaan utamanya terletak pada bentuk penggabungan: pemadatan standar secara efektif adalah m → 1 per tugas, sedangkan Force Merge adalah m → n di seluruh input yang dikelompokkan. Inilah sebabnya mengapa Force Merge dapat mengatasi tata letak segmen yang tidak dapat ditangani oleh pemadatan standar. Tabel berikut membandingkan kedua jenis operasi tersebut.</p>
<table>
   <tr>
     <th><p><strong>Dimensi</strong></p></th>
     <th><p><strong>Pemadatan standar (default)</strong></p></th>
     <th><p><strong>Penggabungan paksa</strong></p></th>
   </tr>
   <tr>
     <td><p>Pemicu API</p></td>
     <td><p>targetSize=0 (atau tidak diatur), tanpa bendera Major/L0</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Tujuan utama</p></td>
     <td><p>Pembersihan bertahap terhadap fragmen yang jelas; pemeliharaan rutin</p></td>
     <td><p>Konsolidasi di seluruh koleksi untuk pencarian dan keseimbangan</p></td>
   </tr>
   <tr>
     <td><p>Sumber ukuran segmen</p></td>
     <td><p>dataCoord.segment.maxSize yang tetap (konfigurasi server)</p></td>
     <td><p>Ukuran target pengguna, kemudian dibatasi secara aman oleh maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Validitas parameter</p></td>
     <td><p>Tidak ada penyesuaian ukuran oleh pengguna</p></td>
     <td><p>Ukuran target pengguna harus &gt;= dataCoord.segment.maxSize; jika tidak, akan ditolak</p></td>
   </tr>
   <tr>
     <td><p>Batas atas aman</p></td>
     <td><p>Hanya batas konfigurasi</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (standalone non-pooling: dibagi dua lagi)</p></td>
   </tr>
   <tr>
     <td><p>Bentuk penggabungan</p></td>
     <td><p>m → 1 per tugas, keluaran &lt;= configMaxSize</p></td>
     <td><p>m → n, keluaran mendekati targetSize</p></td>
   </tr>
   <tr>
     <td><p>Perilaku segmen menengah</p></td>
     <td><p>Dapat terjebak secara permanen (misalnya, dua segmen 60% tidak dapat secara sah menjadi satu segmen 120%)</p></td>
     <td><p>Pengemasan ulang + pemisahan berfungsi; tidak ada pola “terjebak di 60%”</p></td>
   </tr>
   <tr>
     <td><p>Kemampuan meratakan koleksi</p></td>
     <td><p>Terbatas; menjalankan proses berulang kali mungkin masih meninggalkan banyak segmen menengah</p></td>
     <td><p>Kuat; dirancang untuk mengurangi jumlah segmen dan meningkatkan tingkat kepenuhan</p></td>
   </tr>
   <tr>
     <td><p>Kesadaran topologi</p></td>
     <td><p>Tidak ada</p></td>
     <td><p>Ya; menggunakan tata letak QueryNode/replika/shard</p></td>
   </tr>
   <tr>
     <td><p>Penyesuaian paralelisme jalur baca</p></td>
     <td><p>Tidak ada</p></td>
     <td><p>Menyesuaikan jumlah keluaran menggunakan queryNodeCount / (replika × shard) jika valid</p></td>
   </tr>
   <tr>
     <td><p>Kasus penggunaan umum</p></td>
     <td><p>Pembersihan harian dengan tingkat pergantian data tinggi setelah penulisan/penghapusan</p></td>
     <td><p>Persiapan benchmark, optimasi pencarian, penyelarasan beban-paralelisme</p></td>
   </tr>
   <tr>
     <td><p>Harapan cakupan</p></td>
     <td><p>Jangan mengharapkan repack seluruh koleksi</p></td>
     <td><p>Ditujukan untuk hasil repack pada tingkat koleksi</p></td>
   </tr>
</table>
<p><strong>Panduan pemilihan:</strong></p>
<ul>
<li><p>Pilih pemadatan standar untuk pembersihan bertahap dengan risiko rendah.</p></li>
<li><p>Pilih penggabungan paksa (force merge) jika Anda secara eksplisit ingin mengubah bentuk koleksi menjadi segmen yang lebih sedikit namun lebih besar, yang selaras dengan perilaku pencarian dan pemuatan.</p></li>
</ul>
<p><strong>Apa perbedaan Force Merge dengan kompresi berbasis clustering?</strong></p>
<p>Pemadatan pengelompokan (<code translate="no">is_clustering=True</code>) mengatur ulang data dalam segmen berdasarkan kunci pengelompokan untuk meningkatkan pemangkasan pencarian. Penggabungan Paksa (<code translate="no">target_size=N</code>) mengoptimalkan ukuran segmen tanpa mengubah distribusi data. Keduanya memiliki tujuan yang berbeda dan dapat digunakan bersamaan — jalankan pemadatan pengelompokan terlebih dahulu untuk mengatur data, lalu gunakan Penggabungan Paksa untuk mengkonsolidasikan segmen yang dihasilkan.</p>
<p><strong>Apakah saya dapat menjalankan Force Merge pada koleksi yang sedang di-query?</strong></p>
<p>Ya. Force Merge berjalan secara asinkron dan tidak menghalangi kueri. Namun, proses ini menghabiskan sumber daya DataNode dan I/O disk, sehingga latensi kueri mungkin meningkat selama proses pemadatan. Jadwalkan Force Merge selama periode lalu lintas rendah untuk hasil terbaik.</p>
<p><strong>Apa yang terjadi jika saya menetapkan `target_size` lebih kecil dari `maxSize`?</strong></p>
<p>Permintaan tersebut akan ditolak dengan pesan kesalahan. Ukuran target harus lebih besar dari atau sama dengan ` <code translate="no">dataCoord.segment.maxSize</code>` yang telah dikonfigurasi.</p>
