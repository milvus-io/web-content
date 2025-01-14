---
id: mmap.md
summary: MMap memungkinkan lebih banyak data dalam satu node.
title: Penyimpanan Data yang mendukung MMap
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">Penyimpanan Data yang mendukung MMap<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam Milvus, file yang dipetakan memori memungkinkan pemetaan langsung konten file ke dalam memori. Fitur ini meningkatkan efisiensi memori, khususnya dalam situasi di mana memori yang tersedia terbatas tetapi pemuatan data secara lengkap tidak memungkinkan. Mekanisme pengoptimalan ini dapat meningkatkan kapasitas data sekaligus memastikan kinerja hingga batas tertentu; namun, ketika jumlah data melebihi memori terlalu banyak, kinerja pencarian dan kueri dapat mengalami penurunan yang serius, jadi pilihlah untuk mengaktifkan atau menonaktifkan fitur ini sebagaimana mestinya.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Mengonfigurasi pemetaan memori<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>Dimulai dengan Milvus 2.4, Anda memiliki fleksibilitas untuk menyesuaikan file konfigurasi statis untuk mengonfigurasi pengaturan pemetaan memori default untuk seluruh cluster sebelum penerapan. Selain itu, ada opsi bagi Anda untuk mengubah parameter secara dinamis untuk menyempurnakan pengaturan pemetaan memori di tingkat cluster dan indeks. Ke depannya, pembaruan di masa mendatang akan memperluas kemampuan pemetaan memori untuk menyertakan konfigurasi tingkat bidang.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Sebelum penerapan cluster: konfigurasi global</h3><p>Sebelum Anda menerapkan cluster, pengaturan <strong>tingkat cluster</strong> menerapkan pemetaan memori di seluruh cluster. Hal ini memastikan semua objek baru akan secara otomatis mematuhi konfigurasi ini. Penting untuk diperhatikan bahwa memodifikasi pengaturan ini memerlukan pengaktifan ulang cluster agar efektif.</p>
<p>Untuk menyesuaikan pengaturan pemetaan memori cluster Anda, edit file <code translate="no">configs/milvus.yaml</code>. Di dalam berkas ini, Anda dapat menentukan apakah akan mengaktifkan pemetaan memori secara default dan menentukan jalur direktori untuk menyimpan berkas yang dipetakan memori. Jika jalur (<code translate="no">mmapDirPath</code>) tidak ditentukan, sistem secara default akan menyimpan file yang dipetakan memori di <code translate="no">{localStorage.path}/mmap</code>. Untuk informasi lebih lanjut, lihat <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Konfigurasi terkait Penyimpanan Lokal</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>Setelah <code translate="no">2.4.10</code>, konfigurasi <code translate="no">queryNode.mmap.mmapEnabled</code> dibagi menjadi empat bidang terpisah di bawah ini, dan semua defaultnya adalah <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, mengontrol apakah data vektor adalah mmap;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>, mengontrol apakah indeks vektor adalah mmap;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>, mengontrol apakah data skalar adalah mmap;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>, mengontrol apakah indeks skalar adalah mmap;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>Selain itu, hanya indeks vektor dan data vektor mmap yang dapat diaktifkan dan dinonaktifkan untuk sebuah koleksi secara terpisah, tetapi tidak untuk koleksi lainnya.</p>
<p>Kompatibilitas: Jika konfigurasi asli <code translate="no">queryNode.mmap.mmapEnabled</code> diatur ke <code translate="no">true</code>, konfigurasi yang baru ditambahkan akan diatur ke <code translate="no">true</code> saat ini. Jika <code translate="no">queryNode.mmap.mmapEnabled</code> diatur ke <code translate="no">false</code>, jika konfigurasi baru diatur ke <code translate="no">true</code>, nilai akhir akan menjadi <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">Selama operasi cluster: konfigurasi dinamis</h3><p>Selama waktu kerja cluster, Anda dapat menyesuaikan pengaturan pemetaan memori secara dinamis pada tingkat koleksi atau indeks.</p>
<p>Pada <strong>tingkat koleksi</strong>, pemetaan memori diterapkan pada semua data mentah yang tidak diindeks di dalam koleksi, tidak termasuk kunci utama, stempel waktu, dan ID baris. Pendekatan ini sangat cocok untuk manajemen komprehensif kumpulan data yang besar.</p>
<p>Untuk penyesuaian dinamis pada pengaturan pemetaan memori dalam koleksi, gunakan metode <code translate="no">set_properties()</code>. Di sini, Anda dapat mengalihkan <code translate="no">mmap.enabled</code> antara <code translate="no">True</code> atau <code translate="no">False</code> sesuai kebutuhan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>Setelah <code translate="no">2.4.10</code>, pengaturan pemetaan memori dalam koleksi, gunakan metode <code translate="no">add_field</code>. Di sini, Anda dapat mengganti <code translate="no">mmap_enabled</code> antara <code translate="no">True</code> atau <code translate="no">False</code> sesuai kebutuhan.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk pengaturan <strong>tingkat indeks</strong>, pemetaan memori dapat diterapkan secara khusus pada indeks vektor tanpa mempengaruhi tipe data lainnya. Fitur ini sangat berharga untuk koleksi yang memerlukan kinerja yang dioptimalkan untuk pencarian vektor.</p>
<p>Untuk mengaktifkan atau menonaktifkan pemetaan memori untuk indeks dalam koleksi, panggil metode <code translate="no">alter_index()</code>, tentukan nama indeks target di <code translate="no">index_name</code> dan atur <code translate="no">mmap.enabled</code> ke <code translate="no">True</code> atau <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Menyesuaikan jalur penyimpanan dalam penerapan yang berbeda<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>File yang dipetakan secara default ke direktori <code translate="no">/mmap</code> di dalam <code translate="no">localStorage.path</code>. Berikut ini cara menyesuaikan pengaturan ini di berbagai metode penyebaran:</p>
<ul>
<li>Untuk Milvus yang diinstal menggunakan Helm Chart:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Untuk Milvus yang diinstal menggunakan Milvus Operator:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Untuk Milvus yang diinstal menggunakan Docker:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Batas<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Pemetaan memori tidak dapat diaktifkan untuk koleksi yang dimuat, pastikan koleksi telah dirilis sebelum mengaktifkan pemetaan memori.</p></li>
<li><p>Pemetaan memori tidak didukung untuk indeks DiskANN atau indeks kelas GPU.</p></li>
</ul>
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
    </button></h2><ul>
<li><p><strong>Dalam skenario apa saja yang disarankan untuk mengaktifkan pemetaan memori? Apa saja trade-off setelah mengaktifkan fitur ini?</strong></p>
<p>Pemetaan memori direkomendasikan ketika memori terbatas atau ketika persyaratan kinerja sedang. Mengaktifkan fitur ini akan meningkatkan kapasitas pemuatan data. Misalnya, dengan konfigurasi 2 CPU dan memori 8 GB, mengaktifkan pemetaan memori dapat memungkinkan pemuatan data hingga 4 kali lebih banyak dibandingkan dengan tidak mengaktifkannya. Dampaknya pada performa bervariasi:</p>
<ul>
<li><p>Dengan memori yang cukup, performa yang diharapkan serupa dengan performa yang hanya menggunakan memori.</p></li>
<li><p>Dengan memori yang tidak mencukupi, kinerja yang diharapkan dapat menurun.</p></li>
</ul></li>
<li><p><strong>Apa hubungan antara konfigurasi tingkat koleksi dan tingkat indeks?</strong></p>
<p>Collection-level dan index-level bukanlah hubungan yang inklusif, collection-level mengontrol apakah data asli diaktifkan mmap atau tidak, sedangkan index-level hanya untuk indeks vektor.</p></li>
<li><p><strong>Apakah ada jenis indeks yang direkomendasikan untuk pemetaan memori?</strong></p>
<p>Ya, HNSW direkomendasikan untuk mengaktifkan mmap. Kami telah menguji indeks seri HNSW, IVF_FLAT, IVF_PQ/SQ sebelumnya, kinerja indeks seri IVF menurun drastis, sedangkan penurunan kinerja dengan mengaktifkan mmap untuk indeks HNSW masih sesuai dengan ekspektasi.</p></li>
<li><p><strong>Jenis penyimpanan lokal seperti apa yang diperlukan untuk pemetaan memori?</strong></p>
<p>Disk berkualitas tinggi akan meningkatkan performa, dengan drive NVMe sebagai opsi yang lebih disukai.</p></li>
<li><p><strong>Apakah data skalar dapat dipetakan ke dalam memori?</strong></p>
<p>Pemetaan memori dapat diterapkan pada data skalar, tetapi tidak dapat diterapkan pada indeks yang dibangun di atas bidang skalar.</p></li>
<li><p><strong>Bagaimana prioritas ditentukan untuk konfigurasi pemetaan memori di berbagai level?</strong></p>
<p>Dalam Milvus, ketika konfigurasi pemetaan memori secara eksplisit ditentukan di berbagai tingkat, konfigurasi tingkat indeks dan tingkat koleksi memiliki prioritas tertinggi, yang kemudian diikuti oleh konfigurasi tingkat kluster.</p></li>
<li><p><strong>Jika saya meng-upgrade dari Milvus 2.3 dan telah mengonfigurasi jalur direktori pemetaan memori, apa yang akan terjadi?</strong></p>
<p>Jika Anda mengupgrade dari Milvus 2.3 dan telah mengkonfigurasi jalur direktori pemetaan memori (<code translate="no">mmapDirPath</code>), konfigurasi Anda akan dipertahankan, dan pengaturan default untuk pemetaan memori yang diaktifkan (<code translate="no">mmapEnabled</code>) adalah <code translate="no">true</code>. Penting untuk memigrasikan metadata untuk menyinkronkan konfigurasi file pemetaan memori yang ada. Untuk detail lebih lanjut, lihat Memigrasi <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">metadata</a>.</p></li>
</ul>
