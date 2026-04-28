---
id: manage-file-resources.md
title: Mengelola Sumber Daya File
summary: >-
  Daftarkan dan kelola file kamus eksternal yang dapat dimuat oleh penganalisis
  teks Milvus pada saat proses.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Mengelola Sumber Daya File<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Sumber daya berkas</strong> adalah referensi yang terdaftar di server ke berkas kamus eksternal yang digunakan oleh penganalisis teks pada saat proses. Pada Milvus 3.0, empat komponen penganalisis dapat memuat kamus mereka dari sumber daya file, bukan dari larik sebaris:</p>
<table>
   <tr>
     <th><p><strong>Komponen penganalisis</strong></p></th>
     <th><p><strong>Parameter yang menerima sumber daya file</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/id/jieba-tokenizer.md">Jieba tokenizer</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/stop-filter.md">Penyaring berhenti</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/decompounder-filter.md">Filter pengurai</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/synonym-filter.md">Filter sinonim</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>Sumber daya berkas memecahkan dua masalah praktis dengan larik kamus sebaris:</p>
<ul>
<li><p>Kamus yang asli berukuran besar. Kosakata Jieba bahasa Mandarin dapat terdiri dari puluhan ribu baris; tabel sinonim biasanya terdiri dari ribuan aturan. Memasukkannya ke dalam konfigurasi penganalisis tidak praktis.</p></li>
<li><p>Kamus yang sama biasanya digunakan bersama di seluruh koleksi. Mendaftarkannya sekali, lalu merujuknya berdasarkan nama, membuat skema tetap kecil dan membuat pembaruan kamus menjadi satu operasi.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">Tipe sumber daya berkas<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mendukung dua jenis sumber daya berkas dengan tanggung jawab manajemen yang berbeda:</p>
<table>
   <tr>
     <th><p><strong>Jenis</strong></p></th>
     <th><p><strong>Di mana berkas berada</strong></p></th>
     <th><p><strong>Siapa yang mengelola berkas tersebut</strong></p></th>
     <th><p><strong>Cocok</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Jarak jauh</strong></p></td>
     <td><p>Di penyimpanan objek (MinIO / S3 / GCS / Azure) yang telah dikonfigurasi untuk digunakan oleh cluster Milvus Anda</p></td>
     <td><p>Milvus, melalui API klien <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> </p></td>
     <td><p>Direkomendasikan untuk sebagian besar penerapan.</p></td>
   </tr>
   <tr>
     <td><p><strong>Lokal</strong></p></td>
     <td><p>Pada jalur absolut yang sama pada sistem berkas lokal setiap komponen Milvus (DataNode, QueryNode, StreamingNode)</p></td>
     <td><p>Anda - memasang berkas sendiri, misalnya melalui volume Kubernetes</p></td>
     <td><p>Skenario open-source / self-hosted di mana Anda lebih suka mengelola berkas kamus di luar Milvus.</p></td>
   </tr>
</table>
<p>Sisa dari halaman ini akan membahas kedua jenis tersebut, dimulai dengan jenis remote yang lebih umum.</p>
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
    </button></h2><ul>
<li><p>Untuk sumber daya berkas <strong>jarak jauh</strong>, penyebaran Milvus Anda harus dikonfigurasikan dengan penyimpanan objek. Sebagian besar deployment sudah melakukannya - periksa bagian <code translate="no">minio:</code> pada <code translate="no">milvus.yaml</code> Anda (atau nilai bagan Helm yang setara). Perhatikan nilai <code translate="no">bucketName</code> dan <code translate="no">rootPath</code>; Anda akan membutuhkannya saat mendaftarkan sumber daya berkas.</p></li>
<li><p>Untuk sumber daya berkas <strong>Lokal</strong>, Anda harus dapat menempatkan berkas pada setiap pod/kontainer Milvus pada jalur absolut yang sama. Bagaimana Anda melakukannya tergantung pada penerapan Anda (bind mount, volume yang didukung ConfigMap, init kontainer, dll.).</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Mendaftarkan sumber daya berkas jarak jauh<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Mendaftarkan sumber daya berkas jarak jauh merupakan alur kerja tiga langkah: <strong>unggah</strong> berkas ke penyimpanan objek, <strong>daftarkan</strong> dengan Milvus dengan nama yang dipilih, lalu <strong>rujuk</strong> dari penganalisis mana pun yang membutuhkannya.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Langkah 1. Unggah file kamus ke penyimpanan objek<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Gunakan perkakas Anda sendiri (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code>, atau klien yang kompatibel dengan S3) untuk meletakkan berkas di dalam bucket yang telah dikonfigurasikan untuk digunakan oleh Milvus.</p>
<p>Misalnya, jika <code translate="no">milvus.yaml</code> berisi:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Mengunggah berkas bernama <code translate="no">chinese_terms.txt</code> dengan <code translate="no">rootPath</code> sebagai awalan akan menempatkan objek di <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>Argumen <code translate="no">path</code> yang akan Anda berikan ke <code translate="no">add_file_resource</code> pada Langkah 2 adalah <strong>kunci objek lengkap, termasuk awalan rootPath</strong> - untuk contoh di atas, <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. Jalur tanpa awalan (misalnya, hanya <code translate="no">&quot;chinese_terms.txt&quot;</code>) akan ditolak dengan kesalahan <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Langkah 2. Daftarkan berkas dengan <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> memvalidasi secara sinkron: pemanggilan kembali hanya setelah Milvus mengonfirmasi bahwa objek tersebut ada di <code translate="no">path</code> dalam penyimpanan objek yang telah dikonfigurasi. Jika objek tidak ada, pemanggilan akan memunculkan <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - unggah berkas terlebih dahulu, lalu coba lagi.</p>
<p>Pemanggilan ini tidak berhasil. Memanggil <code translate="no">add_file_resource</code> dua kali dengan <code translate="no">name</code> dan <code translate="no">path</code> yang sama tidak akan menghasilkan duplikat.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Langkah 3. Merujuk sumber daya file dari penganalisis<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Di mana pun parameter penganalisis menerima referensi file (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), gunakan bentuk jarak jauh kanonik:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Keempat parameter penganalisis menggunakan bentuk yang sama; hanya kunci penganalisis di sekelilingnya yang berbeda. Untuk contoh konkret per penganalisis, lihat Jieba tokenizer, Stop filter, Decompounder filter, dan Synonym filter.</p>
<p>Nama parameternya adalah <code translate="no">resource_name</code> dan <code translate="no">file_name</code> - bukan <code translate="no">name</code> dan <code translate="no">file</code>. Menggunakan <code translate="no">name</code> / <code translate="no">file</code> (atau <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> dan bukan <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) akan memunculkan <code translate="no">MilvusException</code> pada saat pembuatan penganalisis dengan pesan seperti <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">Daftar sumber daya file<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> mengembalikan daftar objek <code translate="no">FileResourceInfo</code>, masing-masing dengan atribut <code translate="no">.name</code> dan <code translate="no">.path</code>. Cluster kosong mengembalikan <code translate="no">[]</code>. Tidak ada per-sumber daya <code translate="no">get</code>; <code translate="no">list_file_resources</code> adalah satu-satunya API yang dapat dibaca.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Menghapus sumber daya berkas<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> adalah idempoten: memanggilnya untuk nama yang tidak ada akan mengembalikan <code translate="no">None</code> tanpa memunculkan.</p>
<p>Sebelum menghapus sumber daya berkas, hapus atau ubah koleksi apa pun yang konfigurasi penganalisisnya mereferensikannya. Menyimpan sumber daya berkas hingga tidak ada koleksi yang bergantung padanya akan menghindari risiko pencarian penganalisis gagal setelah sumber daya tersebut hilang.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Gunakan sumber daya file lokal<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Sumber daya berkas <strong>lokal</strong> menunjuk langsung ke jalur pada sistem berkas lokal setiap komponen Milvus. Tidak ada panggilan <code translate="no">add_file_resource</code> - Milvus tidak melacak sumber daya lokal. Anda menempatkan berkas pada jalur absolut yang sama pada setiap pod atau kontainer yang relevan, lalu merujuknya dengan jalur:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Sumber daya berkas lokal hanya berlaku dalam penerapan di mana Anda mengendalikan sistem berkas DataNode, QueryNode, dan StreamingNode - biasanya Milvus yang dihosting sendiri pada bare-metal atau pada kluster Kubernetes di mana Anda dapat menambahkan mount volume. File harus berada di jalur absolut yang sama persis pada setiap komponen; jika tidak, beberapa node akan gagal saat memuat penganalisis.</p>
<p>Berkas tersebut dibuka saat penganalisis pertama kali dibuat. Jika jalurnya tidak ada pada saat itu, pembuatan penganalisis akan gagal dengan <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">Pertimbangan<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>Ketersediaan di seluruh cluster tidak instan.</strong> Setelah <code translate="no">add_file_resource</code> kembali, Milvus menyinkronkan file tersebut ke setiap komponen yang membutuhkannya. Selama jendela singkat ini, koleksi yang mereferensikan sumber daya mungkin gagal dibuat pada node yang belum disinkronkan. Perbaikan yang umum dilakukan adalah dengan mencoba kembali panggilan create setelah beberapa detik.</p></li>
<li><p><strong>Hapus hanya jika tidak ada koleksi yang bergantung pada sumber daya.</strong> Buang atau ubah koleksi apa pun yang konfigurasi penganalisisnya mereferensikan sumber daya sebelum memanggil <code translate="no">remove_file_resource</code>, untuk menghindari pencarian penganalisis yang gagal menemukan berkas.</p></li>
<li><p><strong>Hanya metadata.</strong> <code translate="no">list_file_resources()</code> mengembalikan <code translate="no">name</code> dan <code translate="no">path</code> - tidak ada ukuran, checksum, waktu pengunggahan, atau metadata lainnya<strong>.</strong> Pantau versi kamus dengan konvensi penamaan Anda sendiri jika Anda membutuhkannya.</p></li>
</ul>
