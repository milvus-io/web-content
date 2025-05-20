---
id: clustering-compaction.md
title: Pemadatan Pengelompokan
related_key: 'clustering, compaction'
summary: >-
  Pemadatan pengelompokan dirancang untuk meningkatkan kinerja pencarian dan
  mengurangi biaya dalam koleksi besar. Panduan ini akan membantu Anda memahami
  pemadatan pengelompokan dan bagaimana fitur ini dapat meningkatkan kinerja
  pencarian.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Pemadatan Pengelompokan<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Pemadatan pengelompokan dirancang untuk meningkatkan kinerja pencarian dan mengurangi biaya dalam koleksi yang besar. Panduan ini akan membantu Anda memahami pemadatan pengelompokan dan bagaimana fitur ini dapat meningkatkan kinerja pencarian.</p>
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
    </button></h2><p>Milvus menyimpan entitas yang masuk dalam segmen di dalam koleksi dan menutup segmen jika sudah penuh. Jika hal ini terjadi, sebuah segmen baru dibuat untuk mengakomodasi entitas tambahan. Akibatnya, entitas didistribusikan secara acak di seluruh segmen. Distribusi ini mengharuskan Milvus untuk mencari beberapa segmen untuk menemukan tetangga terdekat dengan vektor kueri yang diberikan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Tanpa Pemadatan Pengelompokan</span> </span></p>
<p>Jika Milvus dapat mendistribusikan entitas di antara segmen berdasarkan nilai di bidang tertentu, cakupan pencarian dapat dibatasi dalam satu segmen, sehingga meningkatkan kinerja pencarian.</p>
<p><strong>Pemadatan Clustering</strong> adalah fitur di Milvus yang mendistribusikan kembali entitas di antara segmen dalam koleksi berdasarkan nilai dalam bidang skalar. Untuk mengaktifkan fitur ini, pertama-tama Anda harus memilih sebuah bidang skalar sebagai <strong>kunci pengelompokan</strong>. Hal ini memungkinkan Milvus untuk mendistribusikan ulang entitas ke dalam segmen ketika nilai kunci pengelompokannya berada dalam rentang tertentu. Ketika Anda memicu pemadatan pengelompokan, Milvus membuat/memperbaharui indeks global yang disebut <strong>PartitionStats</strong>, yang mencatat hubungan pemetaan antara segmen dan nilai kunci pengelompokan.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Dengan Pemadatan Pengelompokan</span> </span></p>
<p>Dengan menggunakan <strong>PartitionStats</strong> sebagai referensi, Milvus dapat memangkas data yang tidak relevan setelah menerima permintaan pencarian/kueri yang membawa nilai kunci pengelompokan dan membatasi cakupan pencarian dalam pemetaan segmen ke nilai tersebut, sehingga meningkatkan kinerja pencarian. Untuk detail tentang peningkatan kinerja, lihat Tes tolok ukur.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Gunakan Pemadatan Pengelompokan<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Fitur Pemadatan Klaster di Milvus sangat mudah dikonfigurasi. Anda dapat memilih untuk memicunya secara manual atau mengaturnya untuk dipicu secara otomatis pada interval tertentu oleh Milvus. Untuk mengaktifkan pemadatan pengelompokan, lakukan hal berikut:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Konfigurasi Global</h3><p>Anda perlu memodifikasi file konfigurasi Milvus Anda seperti yang ditunjukkan di bawah ini.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Item Konfigurasi</th><th>Deskripsi</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Menentukan apakah akan mengaktifkan pemadatan pengelompokan.<br>Setel ini ke <code translate="no">true</code> jika Anda perlu mengaktifkan fitur ini untuk setiap koleksi yang memiliki kunci pengelompokan.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Menentukan apakah akan mengaktifkan pemadatan yang dipicu secara otomatis.<br>Mengatur ini ke <code translate="no">true</code> mengindikasikan bahwa Milvus akan memadatkan koleksi yang memiliki kunci pengelompokan pada interval yang ditentukan.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Menentukan interval dalam milidetik saat Milvus memulai pemadatan pengelompokan.<br>Parameter ini hanya berlaku jika <code translate="no">autoEnable</code> diatur ke <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Menentukan interval minimum dalam detik.<br>Parameter ini hanya berlaku jika <code translate="no">autoEnable</code> diatur ke <code translate="no">true</code>.<br>Mengaturnya ke bilangan bulat yang lebih besar dari triggerInterval akan membantu menghindari pemadatan berulang dalam waktu singkat.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Menentukan interval maksimum dalam detik.<br>Parameter ini hanya berlaku jika <code translate="no">autoEnable</code> diatur ke <code translate="no">true</code>.<br>Ketika Milvus mendeteksi bahwa sebuah koleksi belum dipadatkan secara klaster untuk durasi yang lebih lama dari nilai ini, maka Milvus akan memaksa pemadatan klaster.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Menentukan ambang batas atas untuk memicu pemadatan pengelompokan.<br>Parameter ini hanya berlaku jika <code translate="no">autoEnable</code> disetel ke <code translate="no">true</code>.<br>Setelah Milvus mendeteksi bahwa volume data dalam koleksi melebihi nilai ini, Milvus akan memulai proses pemadatan pengelompokan.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Menentukan durasi batas waktu untuk pemadatan pengelompokan.<br>Pemadatan clustering akan gagal jika waktu eksekusinya melebihi nilai ini.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Item Konfigurasi</th><th>Deskripsi</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Menentukan apakah Milvus memangkas data dengan merujuk ke PartitionStats saat menerima permintaan pencarian/kueri.<br>Mengatur ini ke <code translate="no">true</code> memungkinkan Milvus memangkas data yang tidak relevan dari segmen selama permintaan pencarian/kueri.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Item Konfigurasi</th><th>Deskripsi</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Menentukan rasio buffer memori untuk tugas pemadatan pengelompokan. <br>Milvus akan memangkas data ketika ukuran data melebihi ukuran buffer yang dialokasikan yang dihitung menggunakan rasio ini.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Menentukan ukuran kumpulan pekerja untuk tugas pemadatan pengelompokan.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Item Konfigurasi</th><th>Deskripsi</th><th>Nilai Default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Menentukan apakah akan menggunakan kunci partisi dalam koleksi sebagai kunci pengelompokan.<br>Mengatur ini ke <code translate="no">true</code> mengindikasikan bahwa kunci partisi digunakan sebagai kunci pengelompokan.<br>Anda selalu dapat mengganti pengaturan ini dalam koleksi dengan mengatur kunci pengelompokan secara eksplisit.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>Untuk menerapkan perubahan di atas pada kluster Milvus Anda, silakan ikuti langkah-langkah di <a href="/docs/id/v2.4.x/configure-helm.md">Konfigurasi Milvus dengan Helm</a> dan <a href="/docs/id/v2.4.x/configure_operator.md">Konfigurasi Milvus dengan Operator Milvus</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Konfigurasi Koleksi</h3><p>Untuk pemadatan klaster dalam koleksi tertentu, Anda harus memilih sebuah bidang skalar dari koleksi sebagai kunci klaster.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Anda dapat menggunakan bidang skalar dari tipe data berikut ini sebagai kunci pengelompokan: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, dan <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Memicu Pemadatan Pengelompokan<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda telah mengaktifkan pemadatan pengelompokan otomatis, Milvus secara otomatis memicu pemadatan pada interval yang ditentukan. Atau, Anda dapat memicu pemadatan secara manual sebagai berikut:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Uji Tolok Ukur</h3><p>Volume data dan pola kueri yang digabungkan menentukan peningkatan kinerja yang dapat dihasilkan oleh pemadatan klaster. Uji tolok ukur internal menunjukkan bahwa pemadatan pengelompokan menghasilkan peningkatan hingga 25 kali lipat dalam kueri per detik (QPS).</p>
<p>Uji tolok ukur dilakukan pada koleksi yang berisi entitas dari kumpulan data LAION sebanyak 20 juta, 768 dimensi dengan bidang kunci yang ditetapkan sebagai kunci pengelompokan. Setelah pemadatan clustering dipicu dalam koleksi, pencarian secara bersamaan dikirim hingga penggunaan CPU mencapai level tertinggi.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Filter Pencarian</th>
      <th rowspan="2">Rasio Pemangkasan</th>
      <th colspan="5">Latensi (ms)</th>
      <th rowspan="2">QPS (permintaan / s)</th>
    </tr>
    <tr>
      <th>Rata-rata</th>
      <th>Min</th>
      <th>Maks</th>
      <th>Median</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tidak ada</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>kunci &gt; 200 dan kunci &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>kunci &gt; 200 dan kunci &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>kunci &gt; 200 dan kunci &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>kunci == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>Ketika rentang pencarian menyempit dalam filter pencarian, rasio pemangkasan meningkat. Ini berarti lebih banyak entitas yang dilewati selama proses pencarian. Ketika membandingkan statistik di baris pertama dan terakhir, Anda dapat melihat bahwa pencarian tanpa pemadatan pengelompokan memerlukan pemindaian seluruh koleksi. Di sisi lain, pencarian dengan pemadatan pengelompokan menggunakan kunci tertentu dapat mencapai peningkatan hingga 25 kali lipat.</p>
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
    </button></h2><p>Berikut ini beberapa kiat agar Anda dapat menggunakan pemadatan pengelompokan secara efisien:</p>
<ul>
<li><p>Aktifkan ini untuk koleksi dengan volume data yang besar. Performa pencarian meningkat dengan volume data yang lebih besar dalam koleksi. Ini adalah pilihan yang baik untuk mengaktifkan fitur ini untuk koleksi dengan lebih dari 1 juta entitas.</p></li>
<li><p>Pilih kunci pengelompokan yang tepat: Anda dapat menggunakan bidang skalar yang biasa digunakan sebagai kondisi pemfilteran sebagai kunci pengelompokan. Untuk koleksi yang menyimpan data dari beberapa penyewa, Anda dapat menggunakan bidang yang membedakan satu penyewa dengan penyewa lainnya sebagai kunci pengelompokan.</p></li>
<li><p>Gunakan kunci partisi sebagai kunci pengelompokan. Anda dapat mengatur <code translate="no">common.usePartitionKeyAsClusteringKey</code> ke true jika Anda ingin mengaktifkan fitur ini untuk semua koleksi di instance Milvus Anda atau jika Anda masih menghadapi masalah kinerja dalam koleksi besar dengan kunci partisi. Dengan demikian, Anda akan memiliki kunci pengelompokan dan kunci partisi ketika Anda memilih sebuah field skalar dalam koleksi sebagai kunci partisi.</p>
<p>Perhatikan bahwa pengaturan ini tidak menghalangi Anda untuk memilih bidang skalar lain sebagai kunci pengelompokan. Kunci pengelompokan yang ditetapkan secara eksplisit selalu diutamakan.</p></li>
</ul>
