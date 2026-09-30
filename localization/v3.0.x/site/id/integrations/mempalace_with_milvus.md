---
id: mempalace_with_milvus.md
summary: >-
  Dalam tutorial ini, kita akan menggunakan MemPalace CLI untuk mengekstrak
  sebagian kecil dari dokumentasi Milvus yang tersedia untuk umum dan
  menyimpannya di Milvus. Korpus tersebut berisi dokumentasi mengenai
  penganalisis, tokenizer, dan filter token. Halaman-halaman yang saling terkait
  erat ini menyediakan cukup banyak pengalih perhatian sehingga contoh-contoh
  pencarian menjadi bermakna.
title: MemPalace bersama Milvus
---
<h1 id="MemPalace-with-Milvus" class="common-anchor-header">MemPalace bersama Milvus<button data-href="#MemPalace-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/MemPalace/mempalace">MemPalace</a> adalah lapisan memori untuk agen pemrograman dan alur kerja pengembangan jangka panjang. MemPalace mengorganisir pengetahuan proyek ke dalam sayap, ruangan, dan laci, kemudian membuat konten aslinya dapat dicari di seluruh sesi.</p>
<p>Dalam tutorial ini, kita akan menggunakan MemPalace CLI untuk mengekstrak subset nyata dari <a href="https://github.com/milvus-io/milvus-docs">dokumentasi Milvus</a> yang tersedia untuk umum dan menyimpannya di <a href="https://milvus.io/">Milvus</a>. Korpus tersebut berisi dokumentasi mengenai penganalisis, tokenizer, dan filter token. Halaman-halaman yang saling terkait erat ini menyediakan cukup banyak pengalih perhatian sehingga contoh-contoh pencarian menjadi bermakna.</p>
<p>Contoh ini menggunakan Milvus Lite, sehingga dapat dijalankan secara lokal tanpa Docker atau server basis data terpisah. Konfigurasi MemPalace yang sama juga dapat diarahkan ke server Milvus atau Zilliz Cloud untuk penyebaran bersama.</p>
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
    </button></h2><p>Instal MemPalace beserta dependensi Milvus opsionalnya dari PyPI. Perintah ini sengaja tidak menentukan versi tertentu, sehingga instalasi baru akan menggunakan rilis terbaru yang tersedia.</p>
<pre><code translate="no" class="language-shell">uv tool install &quot;mempalace[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga memerlukan Git untuk mengunduh korpus dokumentasi.</p>
<p>Tutorial ini menggunakan model embedding MiniLM lokal MemPalace, sehingga tidak memerlukan kunci API model eksternal. Perintah penambangan atau pencarian pertama mungkin akan mengunduh model embedding ONNX berukuran kecil.</p>
<h2 id="Configure-the-workspace" class="common-anchor-header">Konfigurasikan ruang kerja<button data-href="#Configure-the-workspace" class="anchor-icon" translate="no">
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
    </button></h2><p>Buat ruang kerja dengan direktori terpisah untuk dokumentasi dan MemPalace:</p>
<pre><code translate="no" class="language-shell">mkdir -p mempalace-milvus-demo
cd mempalace-milvus-demo

export PALACE_DIR=&quot;$PWD/palace&quot;
export DOCS_REPO=&quot;$PWD/milvus-docs&quot;
export PROJECT_DIR=&quot;$PWD/milvus-analyzer-docs&quot;
export MEMPALACE_EMBEDDING_MODEL=&quot;minilm&quot;
export MEMPALACE_EMBEDDING_DEVICE=&quot;cpu&quot;
export MEMPALACE_EMBEDDING_THREADS=&quot;2&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Kami meneruskan <code translate="no">--backend milvus</code> ke perintah MemPalace di bawah ini. Karena tidak ada URI Milvus jarak jauh yang dikonfigurasi, MemPalace membuat basis data Milvus Lite lokal di <code translate="no">$PALACE_DIR/milvus.db</code>.</p>
<blockquote>
<p>Mengenai argumen ` <code translate="no">MilvusClient</code> ` yang digunakan oleh backend:</p>
<ul>
<li>Menetapkan <code translate="no">uri</code> ke jalur lokal, seperti <code translate="no">./milvus.db</code>, adalah opsi yang paling praktis. Opsi ini secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan data secara lokal.</li>
<li>Untuk implementasi yang lebih besar, Anda dapat menggunakan <a href="https://milvus.io/docs/quickstart.md">server Milvus</a> dan mengatur URI ke endpoint-nya, seperti <code translate="no">http://localhost:19530</code>.</li>
<li>Untuk menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, atur URI dan token ke <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint dan kunci API</a> kluster tersebut.</li>
</ul>
</blockquote>
<h2 id="Download-the-Milvus-documentation-corpus" class="common-anchor-header">Unduh korpus dokumentasi Milvus<button data-href="#Download-the-Milvus-documentation-corpus" class="anchor-icon" translate="no">
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
    </button></h2><p>Repositori dokumentasi Milvus jauh lebih besar daripada yang dibutuhkan dalam contoh ini. Gunakan Git sparse checkout untuk mengunduh hanya direktori dokumentasi Analyzer dari cabang <code translate="no">v3.0.x</code>:</p>
<pre><code translate="no" class="language-shell">git clone \
  --depth 1 \
  --filter=blob:none \
  --sparse \
  --branch v3.0.x \
  https://github.com/milvus-io/milvus-docs.git \
  &quot;$DOCS_REPO&quot;

git -C &quot;$DOCS_REPO&quot; sparse-checkout set \
  site/en/userGuide/schema/analyzer

cp -R \
  &quot;$DOCS_REPO/site/en/userGuide/schema/analyzer&quot; \
  &quot;$PROJECT_DIR&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Pada saat penulisan, direktori ini berisi 31 halaman Markdown. Halaman-halaman tersebut mencakup panduan umum Analyzer dan tiga kelompok halaman yang saling terkait erat:</p>
<pre><code translate="no" class="language-text">milvus-analyzer-docs/
├── analyzer/       # Built-in language analyzers
├── filter/         # Token filters
├── tokenizer/      # Tokenizers
└── *.md            # Analyzer overviews and selection guides
<button class="copy-code-btn"></button></code></pre>
<p>Konfirmasi jumlah halaman sumber:</p>
<pre><code translate="no" class="language-shell">find &quot;$PROJECT_DIR&quot; -type f -name &quot;*.md&quot; | wc -l
<button class="copy-code-btn"></button></code></pre>
<p>Hasil referensi:</p>
<pre><code translate="no" class="language-text">31
<button class="copy-code-btn"></button></code></pre>
<p>Jumlah pastinya dapat berubah seiring pembaruan cabang dokumentasi Milvus.</p>
<h2 id="Define-the-MemPalace-rooms" class="common-anchor-header">Tentukan ruang MemPalace<button data-href="#Define-the-MemPalace-rooms" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace dapat mendeteksi ruang selama proses inisialisasi ( <code translate="no">mempalace init</code>), tetapi alur inisialisasinya juga melakukan klasifikasi entitas heuristik secara menyeluruh di seluruh proyek dan mencatat hasil yang diterima ke dalam registri entitas. Langkah klasifikasi tersebut tidak diperlukan untuk mendefinisikan korpus dokumentasi ini, sehingga kami menyediakan taksonomi kecil secara langsung. Selama penambangan, MemPalace mungkin masih melampirkan metadata entitas heuristik deterministik dan membangun tautan lorong internal; asosiasi tersebut tidak menentukan ruang mana yang menerima file atau mengubah pencarian dalam lingkup ruang di bawah ini.</p>
<p>Buat berkas ` <code translate="no">$PROJECT_DIR/mempalace.yaml</code> ` dengan isi sebagai berikut:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">wing:</span> <span class="hljs-string">milvus_analyzer_docs</span>
<span class="hljs-attr">rooms:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">analyzer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Built-in</span> <span class="hljs-string">language</span> <span class="hljs-string">analyzers</span> <span class="hljs-string">and</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">selection</span> <span class="hljs-string">guides</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">analyzer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">filter</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Token</span> <span class="hljs-string">filters</span> <span class="hljs-string">used</span> <span class="hljs-string">in</span> <span class="hljs-string">analyzer</span> <span class="hljs-string">pipelines</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">filter</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">tokenizer</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Tokenizers</span> <span class="hljs-string">and</span> <span class="hljs-string">language</span> <span class="hljs-string">identification</span>
    <span class="hljs-attr">keywords:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">tokenizer</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">general</span>
    <span class="hljs-attr">description:</span> <span class="hljs-string">Analyzer</span> <span class="hljs-string">documentation</span> <span class="hljs-string">that</span> <span class="hljs-string">does</span> <span class="hljs-string">not</span> <span class="hljs-string">fit</span> <span class="hljs-string">another</span> <span class="hljs-string">room</span>
    <span class="hljs-attr">keywords:</span> []
<button class="copy-code-btn"></button></code></pre>
<p>"The wing" mewakili keseluruhan korpus dokumentasi. Sebuah "room" mewakili bidang topik. MemPalace mengarahkan sebuah berkas dengan memeriksa direktori berkas tersebut terlebih dahulu, kemudian nama berkasnya, lalu kata kunci "room" dalam isinya. Sebuah berkas di bawah <code translate="no">filter/</code>, misalnya, langsung masuk ke " <code translate="no">filter</code> ".</p>
<p>Setiap berkas kemudian dibagi menjadi potongan teks yang tumpang tindih. Setiap potongan menjadi laci yang berisi Markdown secara verbatim dan metadata seperti <code translate="no">wing</code>, <code translate="no">room</code>, <code translate="no">source_file</code>, <code translate="no">chunk_index</code>, serta nomor baris sumber. Ruang dan laci tetap menjadi metadata logis di dalam koleksi Milvus MemPalace; MemPalace tidak membuat koleksi Milvus terpisah untuk setiap ruang.</p>
<h2 id="Mine-the-documentation-into-Milvus" class="common-anchor-header">Ekstrak dokumentasi ke dalam Milvus<button data-href="#Mine-the-documentation-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Ekstraksi proyek dengan backend Milvus:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  mine &quot;$PROJECT_DIR&quot; \
  --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>Referensi keluaran dari snapshot dokumentasi yang telah diverifikasi:</p>
<pre><code translate="no" class="language-text">=======================================================
  Done.
  Files processed: 31
  Files skipped (already filed or other): 0
  Drawers filed: 473

  By room:
    filter               16 files
    analyzer              8 files
    tokenizer             7 files
=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>MemPalace membaca Markdown tanpa meringkas atau menulis ulang, menghitung embedding lokal, dan menyimpan laci di Milvus. Pada snapshot dokumentasi yang diuji, 31 berkas menghasilkan 473 laci.</p>
<p>Periksa ruangan yang dihasilkan dan jumlah laci:</p>
<pre><code translate="no" class="language-shell">mempalace --palace &quot;$PALACE_DIR&quot; status --backend milvus
<button class="copy-code-btn"></button></code></pre>
<p>Hasil referensi:</p>
<pre><code translate="no" class="language-text">=======================================================
  MemPalace Status -- 473 drawers
=======================================================

  WING: milvus_analyzer_docs
    ROOM: analyzer               212 drawers
    ROOM: filter                 156 drawers
    ROOM: tokenizer              105 drawers

=======================================================
<button class="copy-code-btn"></button></code></pre>
<p>Jumlah laci yang tepat dapat berubah ketika dokumentasi hulu berubah karena halaman yang lebih panjang menghasilkan lebih banyak bagian.</p>
<h2 id="Semantic-search" class="common-anchor-header">Pencarian semantik<button data-href="#Semantic-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan <code translate="no">mempalace search</code> untuk mengambil dokumentasi berdasarkan makna. Pertanyaan berikut ini tidak menyebutkan nama file atau fitur Analyzer tertentu:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How should I analyze documents that mix several languages?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>Hasil referensi (skor mungkin bervariasi):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How should I analyze documents that mix several languages?&quot;
Wing: milvus_analyzer_docs

[1] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
    Match: cosine_sim=0.334 bm25=2.469
[2] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
[3] milvus_analyzer_docs / analyzer
    Source: multi-language-analyzers.md
<button class="copy-code-btn"></button></code></pre>
<p>Dalam eksekusi yang telah divalidasi, ketiga hasil tersebut berasal dari <code translate="no">multi-language-analyzers.md</code>, meskipun korpus juga berisi halaman untuk masing-masing penganalisis bahasa, tokenizer, dan filter.</p>
<h2 id="Search-within-a-room" class="common-anchor-header">Pencarian di dalam ruang<button data-href="#Search-within-a-room" class="anchor-icon" translate="no">
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
    </button></h2><p>Filter ruang berguna ketika konsep-konsep terkait muncul di seluruh korpus. Kueri berikut hanya mencari di ruang " <code translate="no">filter</code> " untuk cara mencocokkan istilah-istilah yang setara:</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;How can equivalent terms such as USA and United States match one another?&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room filter \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>Output referensi (skor dapat bervariasi):</p>
<pre><code translate="no" class="language-text">Results for: &quot;How can equivalent terms such as USA and United States match one another?&quot;
Wing: milvus_analyzer_docs
Room: filter

[1] milvus_analyzer_docs / filter
    Source: synonym-filter.md
    Match: cosine_sim=0.765 bm25=2.573
[2] milvus_analyzer_docs / filter
    Source: stemmer-filter.md
[3] milvus_analyzer_docs / filter
    Source: stop-filter.md
<button class="copy-code-btn"></button></code></pre>
<p>Hasil teratas seharusnya berasal dari <code translate="no">synonym-filter.md</code>. Batasan ruang diterapkan melalui metadata laci sebelum pencarian vektor, sehingga laci tokenizer dan penganalisis bahasa dikecualikan dari pencarian ini.</p>
<h2 id="Search-for-exact-terms" class="common-anchor-header">Mencari istilah yang persis sama<button data-href="#Search-for-exact-terms" class="anchor-icon" translate="no">
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
    </button></h2><p>CLI MemPalace menggabungkan kesamaan semantik dengan sinyal BM25 saat menentukan peringkat kandidat pencarian vektor. Oleh karena itu, nama konfigurasi dan nama fitur yang persis sama dapat meningkatkan peringkat tanpa perlu beralih ke mode pencarian CLI terpisah.</p>
<pre><code translate="no" class="language-shell">mempalace \
  --palace &quot;$PALACE_DIR&quot; \
  search &quot;language_identifier tokenizer&quot; \
  --backend milvus \
  --wing milvus_analyzer_docs \
  --room tokenizer \
  --results 3
<button class="copy-code-btn"></button></code></pre>
<p>Hasil referensi (skor mungkin bervariasi):</p>
<pre><code translate="no" class="language-text">Results for: &quot;language_identifier tokenizer&quot;
Wing: milvus_analyzer_docs
Room: tokenizer

[1] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
    Match: cosine_sim=0.420 bm25=0.969
[2] milvus_analyzer_docs / tokenizer
    Source: language-identifier.md
[3] milvus_analyzer_docs / tokenizer
    Source: lindera-tokenizer.md
<button class="copy-code-btn"></button></code></pre>
<p>Hasilnya seharusnya mengutamakan <code translate="no">language-identifier.md</code>, yang mendokumentasikan tokenizer <code translate="no">language_identifier</code> yang digunakan untuk memilih penganalisis berdasarkan bahasa yang terdeteksi.</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">Periksa koleksi Milvus<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace mengelola skema Milvus-nya secara otomatis. Untuk memastikan apa yang telah disimpan, simpan skrip berikut sebagai <code translate="no">inspect_milvus.py</code>. Skrip ini membuka basis data Milvus Lite yang sama, memeriksa koleksi, dan menghitung laci berdasarkan ruangan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> Counter

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


client = MilvusClient(uri=os.environ[<span class="hljs-string">&quot;MEMPALACE_MILVUS_LITE_PATH&quot;</span>])

<span class="hljs-keyword">for</span> collection_name <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(client.list_collections()):
    stats = client.get_collection_stats(collection_name)
    schema = client.describe_collection(collection_name)
    fields = [field[<span class="hljs-string">&quot;name&quot;</span>] <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> schema[<span class="hljs-string">&quot;fields&quot;</span>]]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{collection_name}</span>: rows=<span class="hljs-subst">{stats[<span class="hljs-string">&#x27;row_count&#x27;</span>]}</span>, fields=<span class="hljs-subst">{fields}</span>&quot;</span>)

client.load_collection(<span class="hljs-string">&quot;mempalace_drawers&quot;</span>)
rows = client.query(
    collection_name=<span class="hljs-string">&quot;mempalace_drawers&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;metadata[&quot;wing&quot;] == &quot;milvus_analyzer_docs&quot;&#x27;</span>,
    limit=<span class="hljs-number">2000</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
)
room_counts = Counter(row[<span class="hljs-string">&quot;metadata&quot;</span>][<span class="hljs-string">&quot;room&quot;</span>] <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Drawers by room:&quot;</span>, <span class="hljs-built_in">dict</span>(<span class="hljs-built_in">sorted</span>(room_counts.items())))
<button class="copy-code-btn"></button></code></pre>
<p>Jalankan skrip dengan set dependensi opsional yang sama seperti yang digunakan oleh CLI:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_LITE_PATH=&quot;$PALACE_DIR/milvus.db&quot;
uv run --with &quot;mempalace[milvus]&quot; inspect_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>Output referensi:</p>
<pre><code translate="no" class="language-text">mempalace_closets: rows=74, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
mempalace_drawers: rows=473, fields=[&#x27;id&#x27;, &#x27;document&#x27;, &#x27;metadata&#x27;, &#x27;vector&#x27;, &#x27;sparse&#x27;]
Drawers by room: {&#x27;analyzer&#x27;: 212, &#x27;filter&#x27;: 156, &#x27;tokenizer&#x27;: 105}
<button class="copy-code-btn"></button></code></pre>
<p>Untuk cuplikan dokumentasi yang diuji, <code translate="no">mempalace_drawers</code> berisi 473 baris dan <code translate="no">mempalace_closets</code> berisi 74 catatan navigasi internal. Jumlah lemari dan laci tidak perlu sama. Metadata laci menunjukkan 212 laci di <code translate="no">analyzer</code>, 156 di <code translate="no">filter</code>, dan 105 di <code translate="no">tokenizer</code>.</p>
<p>Pemeriksaan ini dijalankan dalam proses baru dan membuka kembali basis data yang dibuat oleh CLI, yang juga memastikan bahwa data tetap tersimpan di seluruh perintah.</p>
<h2 id="Optional-use-Milvus-server-or-Zilliz-Cloud" class="common-anchor-header">Opsional: gunakan server Milvus atau Zilliz Cloud<button data-href="#Optional-use-Milvus-server-or-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk penyebaran bersama, atur variabel lingkungan koneksi Milvus sebelum menjalankan perintah CLI MemPalace yang sama. Biarkan variabel tersebut tidak diatur untuk menggunakan basis data Milvus Lite lokal yang ditunjukkan di atas.</p>
<p>Untuk server Milvus:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;http://localhost:19530&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Untuk Zilliz Cloud:</p>
<pre><code translate="no" class="language-shell">export MEMPALACE_MILVUS_URI=&quot;https://your-cluster.api.region.zillizcloud.com&quot;
export MEMPALACE_MILVUS_TOKEN=&quot;your-api-key&quot;
export MEMPALACE_MILVUS_DB_NAME=&quot;default&quot;
export MEMPALACE_MILVUS_NAMESPACE=&quot;team-memory&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Perintah end-to-end dalam tutorial ini telah divalidasi dengan Milvus Lite. Pengaturan server dan cloud di atas merupakan konfigurasi penerapan opsional dan tidak diperlukan untuk validasi lokal.</p>
<h2 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>MemPalace memberikan cara terstruktur bagi agen untuk melestarikan pengetahuan proyek: sebuah "sayap" memisahkan korpus, "ruang" menyediakan cakupan tingkat topik, dan "laci" menyimpan teks sumber asli. Dalam contoh ini, 31 halaman dokumentasi Milvus yang saling terkait erat diubah menjadi ratusan laci yang dapat dicari, bukan sekadar beberapa catatan yang ditulis tangan. Milvus menyediakan penyimpanan vektor, data terpisah, teks, dan metadata yang persisten di balik struktur tersebut.</p>
