---
id: json-operators.md
title: Operator JSON
summary: >-
  Milvus mendukung operator tingkat lanjut untuk melakukan kueri dan penyaringan
  pada bidang JSON, sehingga sangat cocok untuk mengelola data terstruktur yang
  kompleks. Operator-operator ini memungkinkan pelaksanaan kueri yang sangat
  efektif terhadap dokumen JSON, sehingga Anda dapat mengambil entitas
  berdasarkan elemen, nilai, atau kondisi tertentu di dalam bidang JSON. Bagian
  ini akan memandu Anda dalam menggunakan operator khusus JSON di Milvus,
  disertai contoh-contoh praktis untuk mengilustrasikan fungsinya.
---
<h1 id="JSON-Operators" class="common-anchor-header">Operator JSON<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mendukung operator lanjutan untuk melakukan kueri dan penyaringan pada bidang JSON, sehingga sangat cocok untuk mengelola data yang kompleks dan terstruktur. Operator-operator ini memungkinkan kueri yang sangat efektif terhadap dokumen JSON, sehingga Anda dapat mengambil entitas berdasarkan elemen, nilai, atau kondisi tertentu di dalam bidang JSON. Bagian ini akan memandu Anda dalam menggunakan operator khusus JSON di Milvus, disertai contoh-contoh praktis untuk menggambarkan fungsionalitasnya.</p>
<div class="alert note">
<p>Bidang JSON tidak dapat menangani struktur bersarang yang kompleks dan memperlakukan semua struktur bersarang sebagai string biasa. Oleh karena itu, saat bekerja dengan bidang JSON, disarankan untuk menghindari penyarangan yang terlalu dalam dan memastikan bahwa struktur data Anda sedatar mungkin untuk kinerja yang optimal.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">Operator JSON yang Tersedia<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan beberapa operator JSON yang kuat yang membantu menyaring dan menanyakan data JSON, dan operator-operator tersebut adalah:</p>
<ul>
<li><p><a href="#JSONCONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: Menyaring entitas di mana ekspresi JSON yang ditentukan ditemukan di dalam bidang tersebut.</p></li>
<li><p><a href="#JSONCONTAINSALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: Memastikan bahwa semua elemen dari ekspresi JSON yang ditentukan terdapat di dalam bidang tersebut.</p></li>
<li><p><a href="#JSONCONTAINSANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: Menyaring entitas di mana setidaknya satu anggota dari ekspresi JSON tersebut terdapat di dalam bidang.</p></li>
</ul>
<p>Mari kita pelajari operator-operator ini melalui contoh-contoh untuk melihat bagaimana operator-operator tersebut dapat diterapkan dalam skenario dunia nyata.</p>
<h2 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">json_contains</code> memeriksa apakah elemen atau subarray tertentu ada di dalam bidang JSON. Operator ini berguna ketika Anda ingin memastikan bahwa array atau objek JSON berisi nilai tertentu.</p>
<p><strong>Contoh</strong></p>
<p>Bayangkan Anda memiliki kumpulan produk, masing-masing dengan bidang ` <code translate="no">tags</code> ` yang berisi array JSON berupa string, seperti ` <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>`. Anda ingin menyaring produk yang memiliki tag ` <code translate="no">&quot;sale&quot;</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, Milvus akan mengembalikan semua produk yang bidang <code translate="no">tags</code> -nya berisi elemen <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">json_contains_all</code> memastikan bahwa semua elemen dari ekspresi JSON yang ditentukan terdapat dalam bidang target. Operator ini sangat berguna ketika Anda perlu mencocokkan beberapa nilai dalam sebuah array JSON.</p>
<p><strong>Contoh</strong></p>
<p>Melanjutkan skenario tag produk, jika Anda ingin menemukan semua produk yang memiliki tag <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, dan <code translate="no">&quot;new&quot;</code>, Anda dapat menggunakan operator <code translate="no">json_contains_all</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kueri ini akan mengembalikan semua produk di mana array ` <code translate="no">tags</code> ` berisi ketiga elemen yang ditentukan: ` <code translate="no">&quot;electronics&quot;</code>`, ` <code translate="no">&quot;sale&quot;</code>`, dan ` <code translate="no">&quot;new&quot;</code>`.</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">JSON_CONTAINS_ANY<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator ` <code translate="no">json_contains_any</code> ` menyaring entitas di mana setidaknya satu anggota dari ekspresi JSON terdapat di dalam bidang tersebut. Hal ini berguna ketika Anda ingin mencocokkan entitas berdasarkan salah satu dari beberapa nilai yang mungkin.</p>
<p><strong>Contoh</strong></p>
<p>Misalkan Anda ingin menyaring produk yang memiliki setidaknya satu dari tag berikut: <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, atau <code translate="no">&quot;new&quot;</code>. Anda dapat menggunakan operator <code translate="no">json_contains_any</code> untuk melakukannya.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dalam hal ini, Milvus akan mengembalikan semua produk yang memiliki setidaknya satu dari tag dalam daftar <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Meskipun sebuah produk hanya memiliki salah satu dari tag tersebut, produk tersebut akan tetap dimasukkan ke dalam hasil.</p>
