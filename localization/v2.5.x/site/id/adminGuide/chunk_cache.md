---
id: chunk_cache.md
title: Mengonfigurasi Chunk Cache
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">Mengonfigurasi Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>Mekanisme chunk cache memungkinkan Milvus untuk memuat data terlebih dahulu ke dalam cache pada hard disk lokal dari node kueri sebelum dibutuhkan. Mekanisme ini secara signifikan meningkatkan kinerja pengambilan vektor dengan mengurangi waktu yang dibutuhkan untuk memuat data dari disk ke memori.</p>
<h2 id="Background" class="common-anchor-header">Latar Belakang<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum melakukan kueri untuk mengambil vektor, Milvus perlu memuat data dari penyimpanan objek ke cache memori pada hard disk lokal node kueri. Ini adalah proses yang memakan waktu. Sebelum semua data dimuat, Milvus mungkin merespons beberapa permintaan pengambilan vektor dengan penundaan.</p>
<p>Untuk meningkatkan kinerja kueri, Milvus menyediakan mekanisme cache chunk untuk memuat data dari penyimpanan objek ke dalam cache di hard disk lokal sebelum dibutuhkan. Ketika permintaan kueri diterima, Segcore pertama-tama memeriksa apakah data ada di cache, bukan di penyimpanan objek. Jika data ada di cache, Segcore dapat dengan cepat mengambilnya dari cache dan mengembalikan hasilnya ke klien.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">Mengonfigurasi Cache Chunk<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>Panduan ini menyediakan instruksi tentang cara mengonfigurasi mekanisme chunk cache untuk instance Milvus. Konfigurasi bervariasi sesuai dengan cara Anda menginstal instans Milvus.</p>
<ul>
<li><p>Untuk instans Milvus yang diinstal menggunakan Helm Charts</p>
<p>Tambahkan konfigurasi ke file <code translate="no">values.yaml</code> di bawah bagian <code translate="no">config</code>. Untuk detailnya, lihat <a href="/docs/id/configure-helm.md">Mengonfigurasi Milvus dengan Helm Charts</a>.</p></li>
<li><p>Untuk instans Milvus yang diinstal menggunakan Docker Compose</p>
<p>Tambahkan konfigurasi ke berkas <code translate="no">milvus.yaml</code> yang Anda gunakan untuk memulai instans Milvus. Untuk detailnya, lihat <a href="/docs/id/configure-docker.md">Mengkonfigurasi Milvus dengan Docker Compose</a>.</p></li>
<li><p>Untuk instans Milvus yang diinstal menggunakan Operator</p>
<p>Tambahkan konfigurasi ke bagian <code translate="no">spec.components</code> pada sumber daya kustom <code translate="no">Milvus</code>. Untuk detailnya, lihat <a href="/docs/id/configure_operator.md">Mengkonfigurasi Milvus dengan Operator</a>.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">Opsi konfigurasi</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p>Parameter <code translate="no">warmup</code> menentukan apakah Milvus melakukan pra-muat data dari penyimpanan objek ke dalam cache di hard disk lokal dari node kueri sebelum dibutuhkan. Parameter ini secara default adalah <code translate="no">disable</code>. Opsi yang mungkin adalah sebagai berikut:</p>
<ul>
<li><code translate="no">async</code>: Milvus melakukan pra-muat data secara asinkron di latar belakang, yang tidak mempengaruhi waktu yang dibutuhkan untuk memuat koleksi. Namun, pengguna mungkin mengalami penundaan ketika mengambil vektor untuk waktu yang singkat setelah proses pemuatan selesai.  Ini adalah opsi default.</li>
<li><code translate="no">sync</code>: Milvus melakukan pra-load data secara sinkron, yang dapat mempengaruhi waktu yang dibutuhkan untuk memuat koleksi. Namun, pengguna dapat melakukan kueri segera setelah proses pemuatan selesai tanpa penundaan.</li>
<li><code translate="no">disable</code>: Milvus tidak melakukan pra-memuat data ke dalam cache memori.</li>
</ul>
<p>Perhatikan bahwa pengaturan cache chunk juga berlaku ketika data baru dimasukkan ke dalam koleksi atau indeks koleksi dibangun ulang.</p>
<h3 id="FAQ" class="common-anchor-header">PERTANYAAN UMUM</h3><ul>
<li><p><strong>Bagaimana cara menentukan apakah mekanisme chunk cache bekerja dengan benar?</strong></p>
<p>Anda disarankan untuk memeriksa latensi permintaan pencarian atau kueri setelah memuat koleksi. Jika latensi secara signifikan lebih tinggi dari yang diharapkan (misalnya, beberapa detik), hal ini mengindikasikan bahwa mekanisme cache chunk masih berfungsi.</p>
<p>Jika latensi kueri tetap tinggi untuk waktu yang lama. Anda dapat memeriksa throughput penyimpanan objek untuk memastikan bahwa chunk cache masih berfungsi. Dalam kasus normal, chunk cache yang berfungsi akan menghasilkan throughput yang tinggi pada penyimpanan objek. Sebagai alternatif, Anda dapat mencoba chunk cache dalam mode <code translate="no">sync</code>.</p></li>
</ul>
