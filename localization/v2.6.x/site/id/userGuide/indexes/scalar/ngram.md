---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  Indeks NGRAM di Milvus dibuat untuk mempercepat kueri LIKE pada bidang VARCHAR
  atau jalur JSON tertentu di dalam bidang JSON. Sebelum membangun indeks,
  Milvus membagi teks menjadi substring pendek yang saling tumpang tindih dengan
  panjang tetap n, yang dikenal sebagai n-gram. Sebagai contoh, dengan n = 3,
  kata "Milvus" dipecah menjadi 3-gram: "Mil", "ilv", "lvu", dan "vus". N-gram
  ini kemudian disimpan dalam indeks terbalik yang memetakan setiap gram ke ID
  dokumen tempat kata tersebut muncul. Pada waktu kueri, indeks ini memungkinkan
  Milvus mempersempit pencarian dengan cepat menjadi sekumpulan kecil kandidat,
  sehingga menghasilkan eksekusi kueri yang jauh lebih cepat.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks <code translate="no">NGRAM</code> di Milvus dibuat untuk mempercepat kueri <code translate="no">LIKE</code> pada bidang <code translate="no">VARCHAR</code> atau jalur JSON tertentu di dalam bidang <code translate="no">JSON</code>. Sebelum membuat indeks, Milvus membagi teks menjadi substring-substring pendek yang saling tumpang tindih dengan panjang tetap <em>n</em>, yang dikenal sebagai <em>n-gram</em>. Sebagai contoh, dengan <em>n = 3</em>, kata <em>"Milvus"</em> dipecah menjadi 3-gram: <em>"Mil",</em> <em>"ilv",</em> <em>"lvu"</em>, dan <em>"vus"</em>. N-gram ini kemudian disimpan dalam indeks terbalik yang memetakan setiap gram ke ID dokumen tempat kata tersebut muncul. Pada saat kueri, indeks ini memungkinkan Milvus mempersempit pencarian dengan cepat menjadi sekumpulan kecil kandidat, sehingga menghasilkan eksekusi kueri yang jauh lebih cepat.</p>
<p>Gunakan ini ketika Anda membutuhkan pemfilteran awalan, akhiran, infiks, atau karakter pengganti yang cepat, seperti:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Untuk detail tentang sintaks ekspresi penyaringan, lihat <a href="/docs/id/basic-operators.md#Range-operators">Operator Dasar</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Bagaimana cara kerjanya<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mengimplementasikan indeks <code translate="no">NGRAM</code> dalam proses dua tahap:</p>
<ol>
<li><p><strong>Membangun indeks</strong>: Menghasilkan n-gram untuk setiap dokumen dan membangun indeks terbalik selama proses ingest.</p></li>
<li><p><strong>Mempercepat kueri</strong>: Gunakan indeks untuk memfilter ke kumpulan kandidat yang kecil, lalu verifikasi kecocokan yang tepat.</p></li>
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
    </button></h3><p>Selama konsumsi data, Milvus membangun indeks NGRAM dengan melakukan dua langkah utama:</p>
<ol>
<li><p><strong>Menguraikan teks menjadi n-gram</strong>: Milvus menggeser jendela <em>n</em> di setiap string di bidang target dan mengekstrak substring yang tumpang tindih, atau <em>n-gram</em>. Panjang substring ini berada dalam rentang yang dapat dikonfigurasi, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: N-gram terpendek yang akan dihasilkan. Ini juga mendefinisikan panjang substring kueri minimum yang dapat memanfaatkan indeks.</p></li>
<li><p><code translate="no">max_gram</code>: N-gram terpanjang yang akan dihasilkan. Pada waktu kueri, ini juga digunakan sebagai ukuran jendela maksimum ketika memisahkan string kueri yang panjang.</p></li>
</ul>
<p>Sebagai contoh, dengan <code translate="no">min_gram=2</code> dan <code translate="no">max_gram=3</code>, string <code translate="no">&quot;AI database&quot;</code> dipecah sebagai berikut:</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Membangun Indeks Ngram</span> </span></p>
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
<li><p><strong>Membangun indeks terbalik</strong>: <strong>Indeks terbalik</strong> dibuat yang memetakan setiap n-gram yang dihasilkan ke daftar ID dokumen yang mengandungnya.</p>
<p>Misalnya, jika 2-gram <code translate="no">&quot;AI&quot;</code> muncul di dokumen dengan ID 1, 5, 6, 8, dan 9, indeks akan mencatat <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Indeks ini kemudian digunakan pada waktu kueri untuk mempersempit cakupan pencarian dengan cepat.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Membangun Indeks Ngram 2</span> </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Tahap 2: Mempercepat kueri<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Ketika filter <code translate="no">LIKE</code> dijalankan, Milvus menggunakan indeks NGRAM untuk mempercepat kueri dengan langkah-langkah berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>Mempercepat Kueri</span> </span></p>
<ol>
<li><p><strong>Ekstrak istilah kueri:</strong> Substring yang bersebelahan tanpa karakter pengganti diekstrak dari ekspresi <code translate="no">LIKE</code> (misalnya, <code translate="no">&quot;%database%&quot;</code> menjadi <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Menguraikan istilah kueri:</strong> Istilah kueri diuraikan menjadi <em>n-gram</em> berdasarkan panjangnya (<code translate="no">L</code>) dan pengaturan <code translate="no">min_gram</code> dan <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Jika <code translate="no">L &lt; min_gram</code>, indeks tidak dapat digunakan, dan kueri kembali ke pemindaian penuh.</p></li>
<li><p>Jika <code translate="no">min_gram ≤ L ≤ max_gram</code>, seluruh istilah kueri diperlakukan sebagai satu n-gram, dan tidak perlu dilakukan penguraian lebih lanjut.</p></li>
<li><p>Jika <code translate="no">L &gt; max_gram</code>, istilah kueri dipecah menjadi beberapa gram yang tumpang tindih menggunakan ukuran jendela yang sama dengan <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Sebagai contoh, jika <code translate="no">max_gram</code> disetel ke <code translate="no">3</code> dan istilah kueri adalah <code translate="no">&quot;database&quot;</code>, yang memiliki panjang <strong>8</strong>, istilah tersebut diuraikan menjadi substring 3 gram seperti <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, dan seterusnya.</p></li>
<li><p><strong>Cari setiap gram &amp; potong</strong>: Milvus mencari setiap gram kueri dalam indeks terbalik dan kemudian memotong daftar ID dokumen yang dihasilkan untuk menemukan sekumpulan kecil dokumen kandidat. Kandidat-kandidat ini berisi semua gram dari kueri.</p></li>
<li><p><strong>Verifikasi dan kembalikan hasilnya:</strong> Filter <code translate="no">LIKE</code> asli kemudian diterapkan sebagai pemeriksaan akhir hanya pada kumpulan kandidat kecil untuk menemukan kecocokan yang tepat.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Membuat indeks NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat membuat indeks NGRAM pada bidang <code translate="no">VARCHAR</code> atau pada jalur tertentu di dalam bidang <code translate="no">JSON</code>.</p>
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
    </button></h3><p>Untuk bidang <code translate="no">VARCHAR</code>, Anda cukup menentukan <code translate="no">field_name</code> dan mengonfigurasi <code translate="no">min_gram</code> dan <code translate="no">max_gram</code>.</p>
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
<p>Konfigurasi ini menghasilkan 2-gram dan 3-gram untuk setiap string di <code translate="no">text</code> dan menyimpannya dalam indeks terbalik.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Contoh 2: Membuat pada jalur JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
<li><p><code translate="no">params.json_path</code> - jalur JSON yang mengarah ke nilai yang ingin diindeks.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - harus <code translate="no">&quot;varchar&quot;</code> (tidak peka huruf besar-kecil), karena pengindeksan NGRAM beroperasi pada string.</p></li>
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
<li><p>Nilai tersebut di-cast ke <code translate="no">VARCHAR</code> sebelum tokenisasi n-gram.</p></li>
<li><p>Milvus menghasilkan substring dengan panjang 2 hingga 4 dan menyimpannya dalam indeks terbalik.</p></li>
</ul>
<p>Untuk informasi lebih lanjut tentang cara mengindeks bidang JSON, lihat <a href="/docs/id/use-json-fields.md">Bidang JSON</a>.</p>
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
<li><p>Kueri harus menargetkan bidang <code translate="no">VARCHAR</code> (atau jalur JSON) yang memiliki indeks <code translate="no">NGRAM</code>.</p></li>
<li><p>Bagian literal dari pola <code translate="no">LIKE</code> harus memiliki panjang setidaknya <code translate="no">min_gram</code> karakter.<em>(Misalnya, jika istilah kueri terpendek yang Anda harapkan adalah 2 karakter, tetapkan min_gram = 2 saat membuat indeks).</em></p></li>
</ul>
<p>Jenis kueri yang didukung:</p>
<ul>
<li><p><strong>Pencocokan awalan</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Pencocokan akhiran</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Pencocokan infiks</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Pencocokan wildcard</strong></p>
<p>Milvus mendukung <code translate="no">%</code> (nol karakter atau lebih) dan <code translate="no">_</code> (tepat satu karakter).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Kueri jalur JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Untuk informasi lebih lanjut tentang sintaks ekspresi filter, lihat <a href="/docs/id/basic-operators.md">Operator Dasar</a>.</p>
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
<li><p><strong>Jenis bidang</strong>: Didukung pada bidang <code translate="no">VARCHAR</code> dan <code translate="no">JSON</code>. Untuk JSON, sediakan <code translate="no">params.json_path</code> dan <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Unicode</strong>: Penguraian NGRAM berbasis karakter dan bahasa-agnostik serta menyertakan spasi dan tanda baca.</p></li>
<li><p><strong>Pertukaran ruang-waktu</strong>: Rentang gram yang lebih luas <code translate="no">[min_gram, max_gram]</code> menghasilkan lebih banyak gram dan indeks yang lebih besar. Jika memori terbatas, pertimbangkan mode <code translate="no">mmap</code> untuk daftar posting yang besar. Untuk informasi lebih lanjut, lihat <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">Menggunakan mmap</a>.</p></li>
<li><p><strong>Kekekalan</strong>: <code translate="no">min_gram</code> dan <code translate="no">max_gram</code> tidak dapat diubah di tempatnya-bangun kembali indeks untuk menyesuaikannya.</p></li>
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
<li><p><strong>Pilih min_gram dan max_gram untuk mencocokkan perilaku pencarian</strong></p>
<ul>
<li><p>Mulai dengan <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Tetapkan <code translate="no">min_gram</code> ke literal terpendek yang Anda perkirakan akan diketik oleh pengguna.</p></li>
<li><p>Tetapkan <code translate="no">max_gram</code> di dekat panjang khas substring yang bermakna; <code translate="no">max_gram</code> yang lebih besar meningkatkan penyaringan tetapi menambah ruang.</p></li>
</ul></li>
<li><p><strong>Hindari gram dengan selektivitas rendah</strong></p>
<p>Pola yang sangat berulang (misalnya, <code translate="no">&quot;aaaaaa&quot;</code>) memberikan penyaringan yang lemah dan mungkin menghasilkan keuntungan yang terbatas.</p></li>
<li><p><strong>Lakukan normalisasi secara konsisten</strong></p>
<p>Terapkan normalisasi yang sama pada teks yang dicerna dan literal kueri (misalnya, huruf kecil, pemangkasan) jika kasus penggunaan Anda membutuhkannya.</p></li>
</ul>
