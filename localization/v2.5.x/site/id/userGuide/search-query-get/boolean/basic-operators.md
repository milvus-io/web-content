---
id: basic-operators.md
summary: >-
  Milvus menyediakan serangkaian operator dasar yang kaya untuk membantu Anda
  memfilter dan menanyakan data secara efisien. Operator-operator ini
  memungkinkan Anda untuk mempersempit kondisi pencarian Anda berdasarkan bidang
  skalar, perhitungan numerik, kondisi logika, dan banyak lagi. Memahami cara
  menggunakan operator-operator ini sangat penting untuk membuat kueri yang
  tepat dan memaksimalkan efisiensi pencarian Anda.
title: Operator Dasar
---
<h1 id="Basic-Operators​" class="common-anchor-header">Operator Dasar<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyediakan serangkaian operator dasar yang kaya untuk membantu Anda memfilter dan menanyakan data secara efisien. Operator-operator ini memungkinkan Anda untuk mempersempit kondisi pencarian Anda berdasarkan bidang skalar, perhitungan numerik, kondisi logika, dan banyak lagi. Memahami cara menggunakan operator-operator ini sangat penting untuk membuat kueri yang tepat dan memaksimalkan efisiensi pencarian Anda.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Operator perbandingan<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator perbandingan digunakan untuk memfilter data berdasarkan persamaan, ketidaksamaan, atau ukuran. Operator ini dapat digunakan untuk bidang numerik, teks, dan tanggal.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Operator Perbandingan yang Didukung.</h3><ul>
<li><p><code translate="no">==</code> (Sama dengan)</p></li>
<li><p><code translate="no">!=</code> (Tidak sama dengan)</p></li>
<li><p><code translate="no">&gt;</code> (Lebih besar dari)</p></li>
<li><p><code translate="no">&lt;</code> (Kurang dari)</p></li>
<li><p><code translate="no">&gt;=</code> (Lebih besar dari atau sama dengan)</p></li>
<li><p><code translate="no">&lt;=</code> (Kurang dari atau sama dengan)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Contoh 1: Memfilter dengan Lebih besar dari atau sama dengan (<code translate="no">&gt;=</code>)</h3><p>Jika Anda ingin menemukan semua entitas dengan <code translate="no">rating</code> lebih besar dari atau sama dengan 4.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Contoh 2: Memfilter dengan Kurang Dari atau Sama Dengan (<code translate="no">&lt;=</code>)</h3><p>Untuk menemukan entitas dengan <code translate="no">discount</code> kurang dari atau sama dengan 10%.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Operator rentang<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator rentang membantu memfilter data berdasarkan set atau rentang nilai tertentu.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Operator Rentang yang Didukung.</h3><ul>
<li><p><code translate="no">IN</code>: Digunakan untuk mencocokkan nilai dalam set atau rentang tertentu.</p></li>
<li><p><code translate="no">LIKE</code>: Digunakan untuk mencocokkan pola (sebagian besar untuk bidang teks).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Contoh 1: Menggunakan <code translate="no">IN</code> untuk Mencocokkan Beberapa Nilai</h3><p>Jika Anda ingin menemukan semua entitas di mana <code translate="no">color</code> adalah &quot;merah&quot;, &quot;hijau&quot;, atau &quot;biru&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ini berguna ketika Anda ingin memeriksa keanggotaan dalam daftar nilai.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Contoh 2: Menggunakan <code translate="no">LIKE</code> untuk Pencocokan Pola</h3><p>Operator <code translate="no">LIKE</code> digunakan untuk pencocokan pola dalam bidang string. Operator ini dapat mencocokkan substring di berbagai posisi dalam teks: sebagai <strong>awalan</strong>, akhiran, atau <strong>akhiran</strong>. Operator <code translate="no">LIKE</code> menggunakan simbol <code translate="no">%</code> sebagai wildcard, yang dapat mencocokkan sejumlah karakter (termasuk nol).</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Pencocokan Awalan (Dimulai dengan)</h4><p>Untuk melakukan pencocokan <strong>awalan</strong>, di mana string dimulai dengan pola tertentu, Anda dapat menempatkan pola di awal dan menggunakan <code translate="no">%</code> untuk mencocokkan karakter apa pun yang mengikutinya. Misalnya, untuk menemukan semua produk yang <code translate="no">name</code> -nya dimulai dengan &quot;Prod&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mencocokkan semua produk yang namanya dimulai dengan &quot;Prod&quot;, seperti &quot;Produk A&quot;, &quot;Produk B&quot;, dll.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Pencocokan Akhiran (Berakhiran dengan)</h4><p>Untuk pencocokan <strong>akhiran</strong>, di mana string diakhiri dengan pola tertentu, letakkan simbol <code translate="no">%</code> di awal pola. Misalnya, untuk menemukan semua produk yang <code translate="no">name</code> -nya diakhiri dengan &quot;XYZ&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mencocokkan semua produk yang namanya diakhiri dengan &quot;XYZ&quot;, seperti &quot;ProductXYZ&quot;, &quot;SampleXYZ&quot;, dll.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Pencocokan Infiks (Berisi)</h4><p>Untuk melakukan pencocokan <strong>infix</strong>, di mana pola dapat muncul di mana saja dalam string, Anda dapat menempatkan simbol <code translate="no">%</code> di awal dan akhir pola. Misalnya, untuk menemukan semua produk yang <code translate="no">name</code> -nya mengandung kata &quot;Pro&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ini akan mencocokkan semua produk yang namanya mengandung substring &quot;Pro&quot;, seperti &quot;Produk&quot;, &quot;ProLine&quot;, atau &quot;SuperPro&quot;.</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">Operator Aritmatika<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator aritmatika memungkinkan Anda untuk membuat kondisi berdasarkan perhitungan yang melibatkan bidang numerik.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Operator Aritmatika yang Didukung.</h3><ul>
<li><p><code translate="no">+</code> (Penambahan)</p></li>
<li><p><code translate="no">-</code> (Pengurangan)</p></li>
<li><p><code translate="no">*</code> (Perkalian)</p></li>
<li><p><code translate="no">/</code> (Pembagian)</p></li>
<li><p><code translate="no">%</code> (Modulus)</p></li>
<li><p><code translate="no">**</code> (Eksponensial)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Contoh 1: Menggunakan Penjumlahan (<code translate="no">+</code>)</h3><p>Untuk menemukan entitas di mana harga <code translate="no">total</code> adalah jumlah dari <code translate="no">base_price</code> dan <code translate="no">tax</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Contoh 2: Menggunakan Pengurangan (<code translate="no">-</code>)</h3><p>Untuk menemukan entitas di mana <code translate="no">quantity</code> lebih besar dari 50 dan <code translate="no">quantity_sold</code> kurang dari 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Contoh 3: Menggunakan Perkalian (<code translate="no">*</code>)</h3><p>Untuk menemukan entitas di mana <code translate="no">price</code> lebih besar dari 100 dan <code translate="no">quantity</code> lebih besar dari 10, dikalikan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Contoh 4: Menggunakan Pembagian (<code translate="no">/</code>)</h3><p>Untuk mencari hasil bagi di mana <code translate="no">total_price</code> dibagi dengan <code translate="no">quantity</code> kurang dari 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Contoh 5: Menggunakan Modulus (<code translate="no">%</code>)</h3><p>Untuk menemukan entitas di mana <code translate="no">id</code> adalah bilangan genap (yaitu, habis dibagi 2).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Contoh 6: Menggunakan Eksponensial (<code translate="no">**</code>)</h3><p>Untuk menemukan entitas di mana <code translate="no">price</code> yang dipangkatkan dengan pangkat 2 lebih besar dari 1000.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">Operator Logika<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator logika digunakan untuk menggabungkan beberapa kondisi ke dalam ekspresi filter yang lebih kompleks. Operator ini termasuk <code translate="no">AND</code>, <code translate="no">OR</code>, dan <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Operator Logika yang didukung.</h3><ul>
<li><p><code translate="no">AND</code>: Menggabungkan beberapa kondisi yang semuanya harus benar.</p></li>
<li><p><code translate="no">OR</code>: Menggabungkan kondisi di mana setidaknya satu kondisi harus benar.</p></li>
<li><p><code translate="no">NOT</code>: Meniadakan sebuah kondisi.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Contoh 1: Menggunakan <code translate="no">AND</code> untuk Menggabungkan Kondisi</h3><p>Untuk menemukan semua produk di mana <code translate="no">price</code> lebih besar dari 100 dan <code translate="no">stock</code> lebih besar dari 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Contoh 2: Menggunakan <code translate="no">OR</code> untuk Menggabungkan Kondisi</h3><p>Untuk menemukan semua produk di mana <code translate="no">color</code> adalah &quot;merah&quot; atau &quot;biru&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Contoh 3: Menggunakan <code translate="no">NOT</code> untuk Mengecualikan Kondisi</h3><p>Untuk menemukan semua produk di mana <code translate="no">color</code> tidak berwarna &quot;hijau&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-Operators" class="common-anchor-header">Operator IS NULL dan IS NOT NULL<button data-href="#IS-NULL-and-IS-NOT-NULL-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">IS NULL</code> dan <code translate="no">IS NOT NULL</code> digunakan untuk memfilter bidang berdasarkan apakah bidang tersebut mengandung nilai null (tidak ada data).</p>
<ul>
<li><code translate="no">IS NULL</code>: Mengidentifikasi entitas di mana bidang tertentu berisi nilai null, yaitu nilai tidak ada atau tidak terdefinisi.</li>
<li><code translate="no">IS NOT NULL</code>: Mengidentifikasi entitas di mana bidang tertentu berisi nilai apa pun selain null, yang berarti bidang tersebut memiliki nilai yang valid dan terdefinisi.</li>
</ul>
<div class="alert note">
<p>Operator ini tidak peka huruf besar-kecil, sehingga Anda bisa menggunakan <code translate="no">IS NULL</code> atau <code translate="no">is null</code>, dan <code translate="no">IS NOT NULL</code> atau <code translate="no">is not null</code>.</p>
</div>
<h3 id="Regular-Scalar-Fields-with-Null-Values" class="common-anchor-header">Bidang Skalar Biasa dengan Nilai Nol</h3><p>Milvus memungkinkan pemfilteran pada bidang skalar biasa, seperti string atau angka, dengan nilai nol.</p>
<div class="alert note">
<p>String kosong <code translate="no">&quot;&quot;</code> tidak diperlakukan sebagai nilai nol untuk bidang VARCHAR.</p>
</div>
<p>Untuk mengambil entitas di mana bidang <code translate="no">description</code> bernilai null:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mengambil entitas yang bidang <code translate="no">description</code> tidak bernilai null:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mengambil entitas yang bidang <code translate="no">description</code> tidak bernilai null dan bidang <code translate="no">price</code> lebih tinggi dari 10:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-Fields-with-Null-Values" class="common-anchor-header">Bidang JSON dengan Nilai Nol</h3><p>Milvus memungkinkan pemfilteran pada bidang JSON yang mengandung nilai null. Bidang JSON diperlakukan sebagai null dengan cara berikut ini:</p>
<ul>
<li>Seluruh objek JSON secara eksplisit disetel ke None (null), misalnya, <code translate="no">{&quot;metadata&quot;: None}</code>.</li>
<li>Bidang JSON itu sendiri benar-benar hilang dari entitas.</li>
</ul>
<div class="alert note">
<p>Jika beberapa elemen dalam objek JSON bernilai null (misalnya kunci individual), bidang tersebut masih dianggap non-null. Sebagai contoh, <code translate="no">{&quot;metadata&quot;: {&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> tidak dianggap sebagai null, meskipun key <code translate="no">category</code> adalah null.</p>
</div>
<p>Untuk mengilustrasikan lebih lanjut bagaimana Milvus menangani field JSON dengan nilai null, perhatikan contoh data berikut ini dengan field JSON <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-comment"># Entire JSON object is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
  },
  {  <span class="hljs-comment"># JSON field `metadata` is completely missing</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>}, <span class="hljs-comment"># Individual key value is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Contoh 1: Mengambil entitas di mana <code translate="no">metadata</code> bernilai null</strong></p>
<p>Untuk menemukan entitas di mana bidang <code translate="no">metadata</code> tidak ada atau secara eksplisit disetel ke None:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Contoh 2: Mengambil entitas di mana <code translate="no">metadata</code> bukan null</strong></p>
<p>Untuk menemukan entitas di mana bidang <code translate="no">metadata</code> tidak bernilai null:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-Fields-with-Null-Values" class="common-anchor-header">Bidang ARRAY dengan Nilai Nol</h3><p>Milvus memungkinkan pemfilteran pada bidang ARRAY yang berisi nilai null. Bidang ARRAY diperlakukan sebagai nilai null dengan cara berikut:</p>
<ul>
<li>Seluruh bidang ARRAY secara eksplisit disetel ke None (null), misalnya, <code translate="no">&quot;tags&quot;: None</code>.</li>
<li>Bidang ARRAY benar-benar hilang dari entitas.</li>
</ul>
<div class="alert note">
<p>Bidang ARRAY tidak dapat berisi nilai null parsial karena semua elemen dalam bidang ARRAY harus memiliki tipe data yang sama. Untuk detailnya, lihat <a href="/docs/id/array_data_type.md">Bidang Array</a>.</p>
</div>
<p>Untuk mengilustrasikan lebih lanjut bagaimana Milvus menangani field ARRAY dengan nilai null, pertimbangkan contoh data berikut ini dengan field ARRAY <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Contoh 1: Mengambil entitas di mana <code translate="no">tags</code> bernilai null</strong></p>
<p>Untuk mengambil entitas di mana bidang <code translate="no">tags</code> tidak ada atau secara eksplisit disetel ke None:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Contoh 2: Mengambil entitas di mana <code translate="no">tags</code> tidak bernilai null</strong></p>
<p>Untuk mengambil entitas yang bidang <code translate="no">tags</code> tidak bernilai null:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Tips Menggunakan Operator Dasar dengan Bidang JSON dan ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Meskipun operator dasar di Milvus bersifat serbaguna dan dapat diterapkan pada bidang skalar, operator ini juga dapat digunakan secara efektif dengan kunci dan indeks di bidang JSON dan ARRAY.</p>
<p>Sebagai contoh, jika Anda memiliki bidang <code translate="no">product</code> yang berisi beberapa kunci seperti <code translate="no">price</code>, <code translate="no">model</code>, dan <code translate="no">tags</code>, selalu rujuk kunci secara langsung.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Untuk menemukan catatan di mana suhu pertama dalam larik suhu yang direkam melebihi nilai tertentu, gunakan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menawarkan berbagai operator dasar yang memberikan fleksibilitas dalam memfilter dan menanyakan data Anda. Dengan menggabungkan operator perbandingan, rentang, aritmatika, dan logika, Anda dapat membuat ekspresi filter yang kuat untuk mempersempit hasil pencarian dan mengambil data yang Anda butuhkan secara efisien.</p>
