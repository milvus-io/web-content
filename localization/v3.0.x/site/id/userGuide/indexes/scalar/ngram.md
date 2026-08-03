---
id: ngram.md
title: NGRAM
summary: >-
  Indeks NGRAM di Milvus mempercepat kueri LIKE dan filter regex yang memenuhi
  syarat pada kolom VARCHAR atau jalur JSON tertentu di dalam kolom JSON.
  Sebelum membuat indeks, Milvus membagi teks menjadi substring-substring pendek
  yang saling tumpang tindih dengan panjang tetap n, yang dikenal sebagai
  n-gram. Saat melakukan kueri, Milvus menggunakan n-gram ini untuk mempersempit
  entitas kandidat sebelum memverifikasi kondisi filter asli.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks " <code translate="no">NGRAM</code> " di Milvus mempercepat kueri " <code translate="no">LIKE</code> " dan filter regex yang memenuhi syarat pada kolom " <code translate="no">VARCHAR</code> " atau jalur JSON tertentu di dalam kolom " <code translate="no">JSON</code> ". Sebelum membangun indeks, Milvus membagi teks menjadi substring pendek yang tumpang tindih dengan panjang tetap <em>n</em>, yang dikenal sebagai <em>n-gram</em>. Misalnya, dengan <em>n = 3</em>, kata <em>“Milvus”</em> dipecah menjadi 3-gram: <em>“Mil”</em>, <em>“ilv”</em>, <em>“lvu”</em>, dan <em>“vus”.</em> N-gram ini kemudian disimpan dalam indeks terbalik yang memetakan setiap gram ke ID dokumen tempatnya muncul. Pada saat pencarian, indeks ini memungkinkan Milvus untuk dengan cepat mempersempit pencarian ke sekumpulan kecil kandidat sebelum memverifikasi kondisi filter asli.</p>
<p>Gunakan fitur ini saat Anda memerlukan penyaringan awalan, akhiran, sisipan, karakter pengganti, atau regex yang memenuhi syarat secara cepat, seperti:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Untuk detail mengenai sintaks ekspresi filter “ <code translate="no">LIKE</code> ”, dan regex, lihat <a href="/docs/id/pattern-matching.md">Pattern Matching</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mengimplementasikan indeks <code translate="no">NGRAM</code> dalam proses dua fase:</p>
<ol>
<li><p><strong>Pembuatan indeks</strong>: Menghasilkan n-gram untuk setiap dokumen dan membangun indeks terbalik selama proses pengimporan.</p></li>
<li><p><strong>Mempercepat kueri</strong>: Gunakan indeks untuk menyaring ke sekumpulan kandidat yang lebih kecil, lalu verifikasi kecocokan yang tepat.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Tahap 1: Membangun indeks<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Selama proses pengimporan data, Milvus membangun indeks NGRAM dengan melakukan dua langkah utama:</p>
<ol>
<li><p><strong>Menguraikan teks menjadi n-gram</strong>: Milvus menggeser jendela berukuran <em>n</em> ke setiap string di bidang target dan mengekstrak substring yang tumpang tindih, atau <em>n-gram</em>. Panjang substring ini berada dalam rentang yang dapat dikonfigurasi, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: n-gram terpendek yang akan dihasilkan. Ini juga menentukan panjang substring kueri minimum yang dapat memanfaatkan indeks.</p></li>
<li><p><code translate="no">max_gram</code>: N-gram terpanjang yang akan dihasilkan. Pada saat kueri, nilai ini juga digunakan sebagai ukuran jendela maksimum saat memecah string kueri yang panjang.</p></li>
</ul>
<p>Misalnya, dengan <code translate="no">min_gram=2</code> dan <code translate="no">max_gram=3</code>, string <code translate="no">&quot;AI database&quot;</code> diuraikan sebagai berikut:</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>Membuat Indeks N-gram</span>
  
 </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>Buat indeks terbalik</strong>: <strong>Indeks terbalik</strong> dibuat untuk memetakan setiap n-gram yang dihasilkan ke daftar ID dokumen yang mengandungnya.</p>
<p>Misalnya, jika 2-gram <code translate="no">&quot;AI&quot;</code> muncul dalam dokumen dengan ID 1, 5, 6, 8, dan 9, indeks tersebut mencatat <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Indeks ini kemudian digunakan pada saat kueri untuk mempersempit cakupan pencarian dengan cepat.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>Membuat Indeks N-gram 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Fase 2: Mempercepat kueri<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Saat filter ` <code translate="no">LIKE</code> ` atau filter regex yang memenuhi syarat dijalankan, Milvus menggunakan indeks NGRAM untuk mempercepat kueri melalui langkah-langkah berikut:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>Mempercepat Kueri</span>
  
 </span></p>
<ol>
<li><p><strong>Ekstraksi istilah kueri:</strong> Substring berurutan tanpa karakter pengganti diekstraksi dari ekspresi <code translate="no">LIKE</code> (misalnya, <code translate="no">&quot;%database%&quot;</code> menjadi <code translate="no">&quot;database&quot;</code>). Untuk filter regex, Milvus mengekstraksi substring literal tetap dari pola regex jika memungkinkan. Misalnya, <code translate="no">message =~ &quot;error.*timeout&quot;</code> mengandung literal <code translate="no">error</code> dan <code translate="no">timeout</code>.</p></li>
<li><p><strong>Mendekomposisi istilah kueri:</strong> Istilah kueri didekomposisi menjadi <em>n-gram</em> berdasarkan panjangnya (<code translate="no">L</code>) serta pengaturan <code translate="no">min_gram</code> dan <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Jika <code translate="no">L &lt; min_gram</code>, indeks tidak dapat digunakan, dan kueri akan kembali ke pemindaian penuh.</p></li>
<li><p>Jika <code translate="no">min_gram ≤ L ≤ max_gram</code>, seluruh istilah kueri diperlakukan sebagai satu n-gram, dan tidak diperlukan dekomposisi lebih lanjut.</p></li>
<li><p>Jika <code translate="no">L &gt; max_gram</code>, istilah kueri dipecah menjadi gram yang tumpang tindih menggunakan ukuran jendela yang sama dengan <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Misalnya, jika ` <code translate="no">max_gram</code> ` diatur ke ` <code translate="no">3</code> ` dan istilah kueri adalah ` <code translate="no">&quot;database&quot;</code>` (yang memiliki panjang <strong>8</strong>), istilah tersebut akan diuraikan menjadi substring 3-gram seperti ` <code translate="no">&quot;dat&quot;</code>`, ` <code translate="no">&quot;ata&quot;</code>`, ` <code translate="no">&quot;tab&quot;</code>`, dan seterusnya.</p></li>
<li><p><strong>Mencari setiap gram &amp; melakukan perpotongan</strong>: Milvus mencari setiap gram kueri dalam indeks terbalik, lalu melakukan perpotongan terhadap daftar ID dokumen yang dihasilkan untuk menemukan sekumpulan kecil dokumen kandidat. Dokumen-dokumen kandidat ini mengandung semua gram dari kueri.</p></li>
<li><p><strong>Verifikasi dan kembalikan hasil:</strong> Filter " <code translate="no">LIKE</code> " atau regex asli kemudian diterapkan sebagai pemeriksaan akhir hanya pada himpunan kandidat kecil tersebut untuk menemukan kecocokan yang tepat.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Buat indeks NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat membuat indeks NGRAM pada bidang " <code translate="no">VARCHAR</code> " atau pada jalur tertentu di dalam bidang " <code translate="no">JSON</code> ".</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Contoh 1: Membuat pada bidang VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk bidang <code translate="no">VARCHAR</code>, Anda cukup menentukan <code translate="no">field_name</code> dan mengonfigurasi <code translate="no">min_gram</code> serta <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Konfigurasi ini menghasilkan 2-gram dan 3-gram untuk setiap string dalam ` <code translate="no">text</code> ` dan menyimpannya dalam indeks terbalik.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Contoh 2: Membuat di jalur JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk bidang <code translate="no">JSON</code>, selain pengaturan gram, Anda juga harus menentukan:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – jalur JSON yang mengarah ke nilai yang ingin Anda indeks.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – harus berupa <code translate="no">&quot;varchar&quot;</code> (tidak peka huruf besar/kecil), karena pengindeksan NGRAM beroperasi pada string.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini:</p>
<ul>
<li><p>Hanya nilai di <code translate="no">json_field[&quot;body&quot;]</code> yang diindeks.</p></li>
<li><p>Nilai tersebut dikonversi menjadi <code translate="no">VARCHAR</code> sebelum proses tokenisasi n-gram.</p></li>
<li><p>Milvus menghasilkan substring dengan panjang 2 hingga 4 dan menyimpannya dalam indeks terbalik.</p></li>
</ul>
<p>Untuk informasi lebih lanjut tentang cara mengindeks bidang JSON, lihat <a href="/docs/id/json-indexing.md">Pengindeksan JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Kueri yang dipercepat oleh NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Agar indeks NGRAM dapat diterapkan:</p>
<ul>
<li><p>Kueri harus menargetkan bidang " <code translate="no">VARCHAR</code> " (atau jalur JSON) yang memiliki indeks " <code translate="no">NGRAM</code> ".</p></li>
<li><p>Bagian literal dari pola " <code translate="no">LIKE</code> " harus memiliki panjang minimal <code translate="no">min_gram</code> karakter.
<em>(Misalnya, jika istilah kueri terpendek yang diharapkan adalah 2 karakter, atur min_gram=2 saat membuat indeks.)</em></p></li>
</ul>
<p>Jenis kueri yang didukung:</p>
<ul>
<li><p><strong>Pencocokan awalan</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Pencocokan sufiks</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Pencocokan infiks</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Pencocokan wildcard</strong></p>
<p>Milvus mendukung baik " <code translate="no">%</code> " (nol atau lebih karakter) maupun " <code translate="no">_</code> " (tepat satu karakter).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Kueri jalur JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filter regex</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filter regex pada jalur JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Untuk informasi lebih lanjut mengenai sintaks ekspresi filter, lihat <a href="/docs/id/pattern-matching.md">Pencocokan Pola</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Menghapus indeks<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan metode ` <code translate="no">drop_index()</code> ` untuk menghapus indeks yang sudah ada dari sebuah koleksi.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Catatan penggunaan<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Tipe bidang</strong>: Didukung pada bidang ` <code translate="no">VARCHAR</code> ` dan ` <code translate="no">JSON</code> `. Untuk JSON, berikan baik ` <code translate="no">params.json_path</code> ` maupun ` <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>`.</p></li>
<li><p><strong>Peningkatan kinerja regex</strong>: <code translate="no">NGRAM</code> mempercepat filter regex hanya jika Milvus dapat mengekstrak substring literal tetap dari pola regex. Pola seperti <code translate="no">[a-z]+</code> mungkin akan kembali ke pemindaian karena tidak mengandung literal tetap.</p></li>
<li><p><strong>Regex yang tidak membedakan huruf besar-kecil</strong>: Pola regex dengan <code translate="no">(?i)</code> didukung, tetapi mungkin melewatkan optimasi <code translate="no">NGRAM</code> karena indeks mempertahankan huruf besar-kecil aslinya.</p></li>
<li><p><strong>Langkah verifikasi</strong>: Untuk filter regex, <code translate="no">NGRAM</code> menghasilkan kandidat dan Milvus memverifikasinya dengan pola regex RE2 lengkap, sehingga akselerasi indeks tidak mengubah hasil pencocokan.</p></li>
<li><p><strong>Unicode</strong>: Dekomposisi NGRAM berbasis karakter dan tidak bergantung pada bahasa, serta mencakup spasi kosong dan tanda baca.</p></li>
<li><p><strong>Perbandingan ruang-waktu</strong>: Rentang gram yang lebih luas <code translate="no">[min_gram, max_gram]</code> menghasilkan lebih banyak gram dan indeks yang lebih besar. Jika memori terbatas, pertimbangkan mode <code translate="no">mmap</code> untuk daftar posting yang besar. Untuk informasi lebih lanjut, lihat <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">Gunakan mmap</a>.</p></li>
<li><p><strong>Ketidakberubahan</strong>: <code translate="no">min_gram</code> dan <code translate="no">max_gram</code> tidak dapat diubah di tempat—bangun ulang indeks untuk menyesuaikannya.</p></li>
</ul>
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
<li><p><strong>Pilih nilai `min_gram` dan `max_gram` agar sesuai dengan perilaku pencarian</strong></p>
<ul>
<li><p>Mulailah dengan <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Tetapkan ` <code translate="no">min_gram</code> ` ke literal terpendek yang Anda perkirakan akan diketik oleh pengguna.</p></li>
<li><p>Atur ` <code translate="no">max_gram</code> ` mendekati panjang tipikal substring yang bermakna; nilai ` <code translate="no">max_gram</code> ` yang lebih besar meningkatkan penyaringan tetapi menambah penggunaan ruang.</p></li>
</ul></li>
<li><p><strong>Hindari gram dengan selektivitas rendah</strong></p>
<p>Pola yang sangat berulang (misalnya, <code translate="no">&quot;aaaaaa&quot;</code>) memberikan penyaringan yang lemah dan mungkin hanya memberikan keuntungan yang terbatas.</p></li>
<li><p><strong>Lakukan normalisasi secara konsisten</strong></p>
<p>Terapkan normalisasi yang sama pada teks yang dimasukkan dan literal kueri (misalnya, mengubah huruf besar menjadi kecil, memotong karakter di awal dan akhir) jika kasus penggunaan Anda membutuhkannya.</p></li>
</ul>
