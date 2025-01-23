---
id: limitations.md
title: Batasan Milvus
related_key: Limitations
summary: Pelajari tentang batasan-batasan saat menggunakan Milvus.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Batasan Milvus<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus berkomitmen untuk menyediakan basis data vektor terbaik untuk mendukung aplikasi AI dan pencarian kemiripan vektor. Namun, tim terus bekerja untuk menghadirkan lebih banyak fitur dan utilitas terbaik untuk meningkatkan pengalaman pengguna. Halaman ini mencantumkan beberapa batasan yang diketahui yang mungkin ditemui pengguna saat menggunakan Milvus.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">Panjang nama sumber daya<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
<tr><th>Sumber daya</th><th>Batas</th></tr>
</thead>
<tbody>
<tr><td>Koleksi</td><td>255 karakter</td></tr>
<tr><td>Bidang</td><td>255 karakter</td></tr>
<tr><td>Indeks</td><td>255 karakter</td></tr>
<tr><td>Partisi</td><td>255 karakter</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Aturan penamaan<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Nama sumber daya seperti nama koleksi, nama partisi, atau nama indeks dapat berisi angka, huruf, dan garis bawah (_). Nama sumber daya harus dimulai dengan huruf atau garis bawah (_).</p>
<h2 id="Number-of-resources" class="common-anchor-header">Jumlah sumber daya<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
<tr><th>Sumber daya</th><th>Batas</th></tr>
</thead>
<tbody>
<tr><td>Koleksi</td><td>65,536</td></tr>
<tr><td>Koneksi / proxy</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">Jumlah sumber daya dalam koleksi<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
<tr><th>Sumber daya</th><th>Batas</th></tr>
</thead>
<tbody>
<tr><td>Partisi</td><td>1,024</td></tr>
<tr><td>Pecahan</td><td>16</td></tr>
<tr><td>Bidang</td><td>64</td></tr>
<tr><td>Indeks</td><td>1</td></tr>
<tr><td>Entitas</td><td>tidak terbatas</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Panjang sebuah string<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<tr><th>Tipe data</th><th>Batas</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">Dimensi sebuah vektor<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
<tr><th>Properti</th><th>Batas</th></tr>
</thead>
<tbody>
<tr><td>Dimensi</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">Masukan dan Keluaran per RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
<tr><th>Operasi</th><th>Batas</th></tr>
</thead>
<tbody>
<tr><td>Memasukkan</td><td>64 MB</td></tr>
<tr><td>Cari</td><td>64 MB</td></tr>
<tr><td>Permintaan</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">Batas pemuatan<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada rilis saat ini, data yang akan dimuat harus di bawah 90% dari total sumber daya memori semua node kueri untuk mencadangkan sumber daya memori untuk mesin eksekusi.</p>
<h2 id="Search-limits" class="common-anchor-header">Batas pencarian<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Vektor</th><th>Batas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (jumlah hasil yang paling mirip untuk dikembalikan)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (jumlah permintaan pencarian)</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Batas indeks pada berbagai jenis pencarian<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut ini memberikan gambaran umum tentang dukungan untuk berbagai perilaku pencarian di berbagai jenis indeks.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>DATAR</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>PEMINDAIAN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>INDEKS_TERBALIK_JARANG</th><th>SPARSE_WAND</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Pencarian dasar</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Pencarian partisi</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Pencarian dasar dengan data mentah yang diambil</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Pencarian dasar dengan penomoran halaman</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Pencarian yang difilter</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Pencarian rentang</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Mengelompokkan pencarian</td><td>Ya</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td></tr>
<tr><td>Cari dengan iterator</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td></tr>
<tr><td>Pencarian hibrida</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya (Hanya RRFRanker)</td><td>Ya (Hanya RRFRanker)</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Query/Get</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
<tr><td>Kueri dengan iterator</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Tidak</td><td>Ya</td><td>Ya</td><td>Ya</td><td>Ya</td></tr>
</tbody>
</table>
