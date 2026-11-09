---
id: basic-operators.md
title: Operator Dasar
summary: >-
  Gunakan operator perbandingan, rentang, aritmatika, logika, dan NULL untuk
  menyaring entitas. Mulai dari Milvus 3.0.3, operator IS NULL dan IS NOT NULL
  juga mendukung bidang vektor biasa.
---
<h1 id="Basic-Operators" class="common-anchor-header">Operator Dasar<button data-href="#Basic-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyediakan operator perbandingan, rentang, aritmatika, logika, dan NULL untuk menyaring entitas. Setiap operator mendukung tipe bidang tertentu.</p>
<div class="alert note">
<p>Literal di sisi kiri ekspresi penyaringan dapat berupa nama bidang koleksi, seperti <code translate="no">status</code>, <code translate="no">color</code>, dan sebagainya, yang digunakan dalam contoh di bawah ini, atau nama subbidang StructArray pada indeks elemen tertentu, seperti <code translate="no">filter = 'struct[0][subfield] &gt; 10'</code>.</p>
<p>Untuk detail mengenai penyaringan skalar dalam bidang StructArray, lihat <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>.</p>
</div>
<h2 id="Comparison-operators" class="common-anchor-header">Operator perbandingan<button data-href="#Comparison-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator perbandingan digunakan untuk menyaring data berdasarkan kesamaan, ketidaksamaan, atau ukuran. Operator ini berlaku untuk bidang numerik dan teks.</p>
<h3 id="Supported-comparison-operators" class="common-anchor-header">Operator perbandingan yang didukung<button data-href="#Supported-comparison-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">==</code> (Sama dengan)</p></li>
<li><p><code translate="no">!=</code> (Tidak sama dengan)</p></li>
<li><p><code translate="no">&gt;</code> (Lebih besar dari)</p></li>
<li><p><code translate="no">&lt;</code> (Lebih kecil dari)</p></li>
<li><p><code translate="no">&gt;=</code> (Lebih besar dari atau sama dengan)</p></li>
<li><p><code translate="no">&lt;=</code> (Kurang dari atau sama dengan)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-equal-to-" class="common-anchor-header">Contoh 1: Penyaringan dengan operator sama dengan (<code translate="no">==</code>)<button data-href="#Example-1-Filtering-with-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p>Misalkan Anda memiliki bidang bernama ` <code translate="no">status</code> ` dan ingin mencari semua entitas di mana ` <code translate="no">status</code> ` bernilai "active". Anda dapat menggunakan operator kesamaan ` <code translate="no">==</code>`:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-not-equal-to-" class="common-anchor-header">Contoh 2: Penyaringan dengan tidak sama dengan (<code translate="no">!=</code>)<button data-href="#Example-2-Filtering-with-not-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan entitas di mana <code translate="no">status</code> tidak "inactive":</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;status != \&quot;inactive\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;status != \&quot;inactive\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;status != \&quot;inactive\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;status != \&quot;inactive\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;status != \&quot;inactive\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-greater-than-" class="common-anchor-header">Contoh 3: Penyaringan dengan "lebih besar dari" (<code translate="no">&gt;</code>)<button data-href="#Example-3-Filtering-with-greater-than-" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda ingin mencari semua entitas dengan <code translate="no">age</code> lebih besar dari 30:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;age &gt; 30&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;age &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;age &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;age &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;age &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-less-than" class="common-anchor-header">Contoh 4: Penyaringan dengan kurang dari<button data-href="#Example-4-Filtering-with-less-than" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan entitas yang <code translate="no">price</code> -nya kurang dari 100:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;price &lt; 100&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;price &lt; 100&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;price &lt; 100&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;price &lt; 100&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;price &lt; 100&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;price &lt; 100&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-greater-than-or-equal-to-" class="common-anchor-header">Contoh 5: Penyaringan dengan nilai lebih besar dari atau sama dengan (<code translate="no">&gt;=</code>)<button data-href="#Example-5-Filtering-with-greater-than-or-equal-to-" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda ingin mencari semua entitas dengan nilai <code translate="no">rating</code> lebih besar dari atau sama dengan 4:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;rating &gt;= 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;rating &gt;= 4&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;rating &gt;= 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;rating &gt;= 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;rating &gt;= 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-less-than-or-equal-to" class="common-anchor-header">Contoh 6: Penyaringan dengan kurang dari atau sama dengan<button data-href="#Example-6-Filtering-with-less-than-or-equal-to" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan entitas dengan <code translate="no">discount</code> kurang dari atau sama dengan 10%:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;discount &lt;= 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;discount &lt;= 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;discount &lt;= 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;discount &lt;= 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;discount &lt;= 10&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators" class="common-anchor-header">Operator rentang<button data-href="#Range-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator rentang membantu menyaring data berdasarkan sekumpulan nilai tertentu. Milvus mendukung <code translate="no">IN</code> untuk pemeriksaan keanggotaan himpunan.</p>
<p>Jika Anda ingin menemukan semua entitas yang nilai " <code translate="no">color</code> "-nya adalah "red", "green", atau "blue":</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;color in [\&quot;red\&quot;, \&quot;green\&quot;, \&quot;blue\&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;color in [\&quot;red\&quot;, \&quot;green\&quot;, \&quot;blue\&quot;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;color in [\&quot;red\&quot;, \&quot;green\&quot;, \&quot;blue\&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;color in [\&quot;red\&quot;, \&quot;green\&quot;, \&quot;blue\&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;color in [\&quot;red\&quot;, \&quot;green\&quot;, \&quot;blue\&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ini berguna saat Anda ingin memeriksa keanggotaan dalam daftar nilai.</p>
<h2 id="Pattern-matching-operators" class="common-anchor-header">Operator pencocokan pola<button data-href="#Pattern-matching-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator pencocokan pola membantu menyaring nilai string berdasarkan pola wildcard atau ekspresi reguler.</p>
<ul>
<li><p><code translate="no">LIKE</code>: Digunakan untuk mencocokkan pola karakter pengganti sederhana pada nilai string. Misalnya, <code translate="no">name LIKE &quot;Prod%&quot;</code> mencocokkan nilai yang dimulai dengan <code translate="no">Prod</code>.</p></li>
<li><p><code translate="no">=~</code>: Digunakan untuk mencocokkan nilai string dengan ekspresi reguler RE2. Misalnya, <code translate="no">code =~ &quot;E[0-9]{4}&quot;</code> mencocokkan nilai yang mengandung kode kesalahan seperti <code translate="no">E1001</code>.</p></li>
<li><p><code translate="no">!~</code>: Digunakan untuk mengecualikan nilai string yang cocok dengan ekspresi reguler RE2. Ini setara dengan <code translate="no">NOT (field =~ &quot;pattern&quot;)</code>.</p></li>
</ul>
<p>Untuk menemukan entitas di mana <code translate="no">name</code> dimulai dengan <code translate="no">Prod</code>:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;name LIKE \&quot;Prod%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;name LIKE \&quot;Prod%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;name LIKE \&quot;Prod%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;name LIKE \&quot;Prod%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;name LIKE \&quot;Prod%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menemukan entitas yang <code translate="no">code</code> -nya berisi kode kesalahan seperti <code translate="no">E1001</code>:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;code =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;code =~ \&quot;E[0-9]{4}\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;code =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;code =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;code =~ &quot;E[0-9]{4}&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;code =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;code =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mengecualikan entitas yang <code translate="no">message</code> -nya dimulai dengan <code translate="no">DEBUG</code>:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detail lebih lanjut tentang memilih antara <code translate="no">LIKE</code> dan regex, jenis bidang yang didukung, sintaks regex, aturan escaping, dan kinerja, lihat <a href="/docs/id/pattern-matching.md">Pattern Matching</a>. Milvus juga memungkinkan Anda membuat indeks <code translate="no">NGRAM</code> pada bidang <code translate="no">VARCHAR</code> atau jalur string JSON untuk mempercepat filter pencocokan pola yang memenuhi syarat. Untuk detailnya, lihat <a href="/docs/id/ngram.md">NGRAM</a>.</p>
<h2 id="Arithmetic-operators" class="common-anchor-header">Operator aritmatika<button data-href="#Arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator aritmatika memungkinkan Anda membuat kondisi berdasarkan perhitungan yang melibatkan bidang numerik.</p>
<h3 id="Supported-arithmetic-operators" class="common-anchor-header">Operator aritmatika yang didukung<button data-href="#Supported-arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">+</code> (Penjumlahan)</p></li>
<li><p><code translate="no">-</code> (Pengurangan)</p></li>
<li><p><code translate="no">*</code> (Perkalian)</p></li>
<li><p><code translate="no">/</code> (Pembagian)</p></li>
<li><p><code translate="no">%</code> (Modulus)</p></li>
<li><p><code translate="no">**</code> (Pangkat)</p></li>
</ul>
<h3 id="Example-1-Using-modulus-" class="common-anchor-header">Contoh 1: Menggunakan modulus (<code translate="no">%</code>)<button data-href="#Example-1-Using-modulus-" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mencari entitas di mana <code translate="no">id</code> adalah bilangan genap (yaitu, dapat dibagi 2):</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;id % 2 == 0&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;id % 2 == 0&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;id % 2 == 0&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;id % 2 == 0&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;id % 2 == 0&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-exponentiation-" class="common-anchor-header">Contoh 2: Menggunakan pangkat (<code translate="no">**</code>)<button data-href="#Example-2-Using-exponentiation-" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan entitas di mana <code translate="no">price</code> dipangkatkan dengan 2 hasilnya lebih besar dari 1000:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;price ** 2 &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;price ** 2 &gt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;price ** 2 &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;price ** 2 &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;price ** 2 &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Operator aritmatika hanya mendukung ekspresi yang melibatkan <strong>satu bidang dan satu konstanta</strong>. Ekspresi yang menggabungkan dua bidang secara aritmatika — seperti <code translate="no">price * quantity &gt; 100</code> — saat ini tidak didukung dan akan menghasilkan kesalahan. Jika Anda perlu menyaring berdasarkan nilai turunan yang dihitung dari beberapa bidang, pertimbangkan untuk menyimpan nilai yang telah dihitung sebelumnya sebagai bidang skalar terpisah pada saat penyisipan.</p>
</div>
<h2 id="Bitwise-operators" class="common-anchor-header">Operator bitwise<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Bitwise-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator bitwise berguna ketika bidang bilangan bulat mengkodekan beberapa flag, seperti izin, flag fitur, atau bit status. Anda dapat menggunakan operator ini dalam ekspresi filter untuk memeriksa, menggabungkan, atau membandingkan bit individual dalam nilai bilangan bulat.</p>
<p>Untuk bidang skalar, operator bitwise berlaku untuk tipe bidang bilangan bulat, seperti <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, dan <code translate="no">INT64</code>.</p>
<h3 id="Supported-bitwise-operators" class="common-anchor-header">Operator bitwise yang didukung<button data-href="#Supported-bitwise-operators" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Operator</th><th>Nama</th><th>Penggunaan umum</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">&amp;</code></td><td>AND bitwise</td><td>Memeriksa apakah bit tertentu disetel.</td></tr>
<tr><td><code translate="no">|</code></td><td>OR bitwise</td><td>Menggabungkan bit sebelum perbandingan.</td></tr>
<tr><td><code translate="no">^</code></td><td>XOR bitwise</td><td>Bandingkan perbedaan bit antara dua nilai.</td></tr>
</tbody>
</table>
<h3 id="Example-Filtering-by-permission-bits" class="common-anchor-header">Contoh: Penyaringan berdasarkan bit izin<button data-href="#Example-Filtering-by-permission-bits" class="anchor-icon" translate="no">
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
    </button></h3><p>Asumsikan Anda memiliki bidang bilangan bulat bernama ` <code translate="no">permissions</code>`, dan setiap bit dalam bilangan bulat tersebut mewakili bendera izin:</p>
<table>
<thead>
<tr><th>Bendera izin</th><th>Nilai bit</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">READ</code></td><td><code translate="no">1</code></td></tr>
<tr><td><code translate="no">WRITE</code></td><td><code translate="no">2</code></td></tr>
<tr><td><code translate="no">SHARE</code></td><td><code translate="no">4</code></td></tr>
<tr><td><code translate="no">ADMIN</code></td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
<p>Misalnya, <code translate="no">permissions = 5</code> berarti bit <code translate="no">READ</code> dan <code translate="no">SHARE</code> disetel, karena <code translate="no">5 = 1 + 4</code>.</p>
<p>Untuk menemukan entitas di mana bit ` <code translate="no">SHARE</code> ` diaktifkan, gunakan operasi bitwise AND (`<code translate="no">&amp;</code>`):</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;(permissions &amp; 4) == 4&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menemukan entitas di mana pengaturan bit " <code translate="no">WRITE</code> " menghasilkan set izin " <code translate="no">READ + WRITE + SHARE</code> ", gunakan operasi bitwise OR (<code translate="no">|</code>):</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;(permissions | 2) == 7&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;(permissions | 2) == 7&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;(permissions | 2) == 7&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menemukan entitas yang bit izinnya berbeda dari " <code translate="no">READ + WRITE + SHARE</code> " hanya pada bit " <code translate="no">WRITE</code> ", gunakan operasi bitwise XOR (<code translate="no">^</code>):</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;(permissions ^ 7) == 2&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;(permissions ^ 7) == 2&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;(permissions ^ 7) == 2&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Selalu letakkan operasi bitwise di dalam tanda kurung sebelum membandingkan hasilnya, seperti <code translate="no">(permissions &amp; 4) == 4</code>. Milvus mendukung <code translate="no">&amp;</code>, <code translate="no">|</code>, dan <code translate="no">^</code> dalam ekspresi filter. Operator bitwise NOT (<code translate="no">~</code>) dan operator pergeseran (<code translate="no">&lt;&lt;</code> dan <code translate="no">&gt;&gt;</code>) tidak didukung.</p>
</div>
<h2 id="Logical-operators" class="common-anchor-header">Operator logika<button data-href="#Logical-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator logika digunakan untuk menggabungkan beberapa kondisi menjadi ekspresi filter yang lebih kompleks. Operator ini meliputi <code translate="no">AND</code>, <code translate="no">OR</code>, dan <code translate="no">NOT</code>.</p>
<h3 id="Supported-logical-operators" class="common-anchor-header">Operator logika yang didukung<button data-href="#Supported-logical-operators" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><code translate="no">AND</code>: Menggabungkan beberapa kondisi yang semuanya harus benar.</p></li>
<li><p><code translate="no">OR</code>: Menggabungkan kondisi di mana setidaknya satu di antaranya harus benar.</p></li>
<li><p><code translate="no">NOT</code>: Menegasikan suatu kondisi.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-combine-conditions" class="common-anchor-header">Contoh 1: Menggunakan <code translate="no">AND</code> untuk menggabungkan kondisi<button data-href="#Example-1-Using-AND-to-combine-conditions" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menemukan semua produk di mana <code translate="no">price</code> lebih besar dari 100 dan <code translate="no">stock</code> lebih besar dari 50:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;price &gt; 100 AND stock &gt; 50&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;price &gt; 100 AND stock &gt; 50&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;price &gt; 100 AND stock &gt; 50&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;price &gt; 100 AND stock &gt; 50&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;price &gt; 100 AND stock &gt; 50&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-combine-conditions" class="common-anchor-header">Contoh 2: Menggunakan <code translate="no">OR</code> untuk menggabungkan kondisi<button data-href="#Example-2-Using-OR-to-combine-conditions" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mencari semua produk yang <code translate="no">color</code> -nya adalah “red” atau “blue”:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;color == \&quot;red\&quot; OR color == \&quot;blue\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;color == \&quot;red\&quot; OR color == \&quot;blue\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;color == \&quot;red\&quot; OR color == \&quot;blue\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;color == \&quot;red\&quot; OR color == \&quot;blue\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;color == \&quot;red\&quot; OR color == \&quot;blue\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-exclude-a-condition" class="common-anchor-header">Contoh 3: Menggunakan <code translate="no">NOT</code> untuk mengecualikan suatu kondisi<button data-href="#Example-3-Using-NOT-to-exclude-a-condition" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mencari semua produk yang <code translate="no">color</code> -nya bukan "green":</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;NOT color == \&quot;green\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;NOT color == \&quot;green\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;NOT color == \&quot;green\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;NOT color == \&quot;green\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;NOT color == \&quot;green\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-operators" class="common-anchor-header">Operator IS NULL dan IS NOT NULL<button data-href="#IS-NULL-and-IS-NOT-NULL-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan ` <code translate="no">IS NULL</code> ` dan ` <code translate="no">IS NOT NULL</code> ` untuk menemukan entitas dengan nilai bidang yang hilang atau tersedia. Misalnya, Anda dapat menemukan produk tanpa kategori atau entitas yang embedding-nya siap untuk pencarian. Kedua operator ini berfungsi pada bidang skalar dan vektor yang didukung, dengan arti yang sama:</p>
<table>
<thead>
<tr><th>Operator</th><th>Mencocokkan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">&lt;field&gt; IS NULL</code></td><td>Entitas yang bidang yang ditentukan memiliki nilai NULL</td></tr>
<tr><td><code translate="no">&lt;field&gt; IS NOT NULL</code></td><td>Entitas yang memiliki nilai non-NULL pada bidang yang ditentukan</td></tr>
</tbody>
</table>
<p>Bidang skalar yang didukung meliputi bidang Boolean, numerik, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code>, dan <code translate="no">ARRAY</code>. Operator-operator ini tidak mendukung <a href="/docs/id/text.md">bidang TEXT</a>.</p>
<p>Mulai dari Milvus 3.0.3, operator-operator ini juga mendukung bidang vektor biasa: <code translate="no">FLOAT_VECTOR</code>, <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code>, <code translate="no">SPARSE_FLOAT_VECTOR</code>, dan <code translate="no">INT8_VECTOR</code>.</p>
<p>Operator-operator ini tidak membedakan huruf besar-kecil: <code translate="no">IS NULL</code> dan <code translate="no">is null</code> setara, begitu pula <code translate="no">IS NOT NULL</code> dan <code translate="no">is not null</code>.</p>
<h3 id="Example-Find-entities-with-missing-or-available-values" class="common-anchor-header">Contoh: Mencari entitas dengan nilai yang hilang atau tersedia<button data-href="#Example-Find-entities-with-missing-or-available-values" class="anchor-icon" translate="no">
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
    </button></h3><p>Asumsikan sebuah koleksi bernama <code translate="no">products</code> telah diindeks dan dimuat. Koleksi tersebut memiliki kunci utama <code translate="no">INT64</code> bernama <code translate="no">id</code>, bidang <code translate="no">VARCHAR</code> yang dapat bernilai null bernama <code translate="no">category</code>, dan bidang <code translate="no">FLOAT_VECTOR</code> tiga dimensi yang dapat bernilai null bernama <code translate="no">embedding</code>. Koleksi tersebut sudah berisi entitas-entitas berikut:</p>
<table>
<thead>
<tr><th><code translate="no">id</code></th><th><code translate="no">category</code></th><th><code translate="no">embedding</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">1</code></td><td><code translate="no">&quot;book&quot;</code></td><td><code translate="no">[0.1, 0.2, 0.3]</code></td></tr>
<tr><td><code translate="no">2</code></td><td>NULL</td><td><code translate="no">[0.4, 0.5, 0.6]</code></td></tr>
<tr><td><code translate="no">3</code></td><td><code translate="no">&quot;book&quot;</code></td><td>NULL</td></tr>
</tbody>
</table>
<p>Proses pembuatan koleksi dan penyisipan data diabaikan. Untuk langkah-langkah tersebut, lihat <a href="/docs/id/nullable-and-default.md">Bidang yang Dapat Bernilai NULL</a>.</p>
<p>Untuk menemukan entitas yang masih memerlukan embedding, jalankan kueri ` <code translate="no">embedding IS NULL</code>`. Sesuaikan pengaturan koneksi sesuai dengan server Anda.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

results = client.query(
    collection_name=<span class="hljs-string">&quot;products&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;embedding IS NULL&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
    limit=<span class="hljs-number">10</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">sorted</span>(entity[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> entity <span class="hljs-keyword">in</span> results))
<span class="hljs-comment"># Expected: [3]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;products&quot;</span>)
        .filter(<span class="hljs-string">&quot;embedding IS NULL&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;id&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build();
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
System.out.println(queryResp.getQueryResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;products&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;embedding IS NULL&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to query: &quot;</span>, err.Error())
}
ids := rs.GetColumn(<span class="hljs-string">&quot;id&quot;</span>)
<span class="hljs-keyword">var</span> result []<span class="hljs-type">int64</span>
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; ids.Len(); i++ {
    v, _ := ids.GetAsInt64(i)
    result = <span class="hljs-built_in">append</span>(result, v)
}
fmt.Println(result)
<span class="hljs-comment">// Expected: [3]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;products&quot;</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;embedding IS NULL&quot;</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>])
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">query</span>(request).<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">get_i64</span>(<span class="hljs-string">&quot;id&quot;</span>)?);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;products&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;embedding IS NULL&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

milvus::QueryResponse response;
status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;products&quot;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;embedding IS NULL&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

QueryResp results = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;products&quot;</span>,
    Expression = <span class="hljs-string">&quot;embedding IS NULL&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span> },
        Limit = <span class="hljs-number">10</span>
    }
});

<span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> i = <span class="hljs-number">0</span>; i &lt; results.RowCount; i++)
{
    Console.WriteLine(results.GetRow(i)[<span class="hljs-string">&quot;id&quot;</span>]);
}
<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/entities/query&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Authorization: Bearer root:Milvus&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;products&quot;,
    &quot;filter&quot;: &quot;embedding IS NULL&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;],
    &quot;limit&quot;: 10
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ganti ` <code translate="no">filter</code> ` dalam kueri yang sama untuk memeriksa salah satu bidang atau menggabungkan kondisi:</p>
<table>
<thead>
<tr><th>Ekspresi filter</th><th>ID yang Cocok</th><th>Tujuan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">category IS NULL</code></td><td><code translate="no">2</code></td><td>Temukan entitas tanpa kategori</td></tr>
<tr><td><code translate="no">category IS NOT NULL</code></td><td><code translate="no">1</code>, <code translate="no">3</code></td><td>Temukan entitas yang memiliki kategori</td></tr>
<tr><td><code translate="no">embedding IS NULL</code></td><td><code translate="no">3</code></td><td>Menemukan entitas tanpa embedding</td></tr>
<tr><td><code translate="no">embedding IS NOT NULL</code></td><td><code translate="no">1</code>, <code translate="no">2</code></td><td>Temukan entitas yang memiliki embedding</td></tr>
<tr><td><code translate="no">category IS NOT NULL AND embedding IS NOT NULL</code></td><td><code translate="no">1</code></td><td>Temukan entitas yang memiliki kedua nilai tersebut</td></tr>
</tbody>
</table>
<p><a id="Regular-scalar-fields-with-null-values"></a>
<a id="JSON-fields-with-null-values"></a>
<a id="ARRAY-fields-with-null-values"></a></p>
<h3 id="How-field-values-are-treated" class="common-anchor-header">Bagaimana nilai bidang diolah<button data-href="#How-field-values-are-treated" class="anchor-icon" translate="no">
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
    </button></h3><p>Operator memeriksa nilai bidang yang disimpan. Untuk bidang yang dapat bernilai NULL tanpa nilai default, mengabaikan bidang tersebut saat penyisipan atau secara eksplisit menetapkannya ke NULL akan menyimpan nilai NULL. Nilai default yang dikonfigurasi dapat mengubah nilai yang disimpan. Untuk detailnya, lihat <a href="/docs/id/nullable-and-default.md">Bidang yang Dapat Bernilai NULL</a> dan <a href="/docs/id/default-values.md">Nilai Default</a>.</p>
<table>
<thead>
<tr><th>Tipe bidang</th><th>Perilaku NULL</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code></td><td>String kosong <code translate="no">&quot;&quot;</code> adalah nilai non-NULL.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Nilai NULL untuk seluruh bidang sesuai dengan <code translate="no">IS NULL</code>. Objek JSON seperti <code translate="no">{&quot;category&quot;: null}</code> bukanlah NULL, meskipun nilai di dalamnya adalah NULL.</td></tr>
<tr><td><code translate="no">ARRAY</code></td><td>Nilai NULL untuk seluruh bidang cocok dengan <code translate="no">IS NULL</code>. Elemen individual tidak boleh NULL, dan <code translate="no">IS NULL</code> / <code translate="no">IS NOT NULL</code> tidak mendukung akses elemen array seperti <code translate="no">tags[0]</code>. Lihat <a href="/docs/id/array_data_type.md">Bidang Array</a>.</td></tr>
<tr><td>Tipe vektor biasa</td><td>NULL berarti nilai vektor tidak ada. Vektor yang komponennya bernilai nol bukanlah NULL.</td></tr>
</tbody>
</table>
<p>Untuk bidang yang didukung yang didefinisikan dengan <code translate="no">nullable=False</code>, <code translate="no">IS NULL</code> tidak akan menemukan entitas apa pun, sedangkan <code translate="no">IS NOT NULL</code> akan menemukan semua entitas yang terlihat. Kondisi lain dalam filter tetap berlaku.</p>
<h3 id="Use-NULL-filters-in-vector-search" class="common-anchor-header">Gunakan filter NULL dalam pencarian vektor<button data-href="#Use-NULL-filters-in-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Operator yang sama dapat digunakan dalam filter pencarian, tetapi suatu entitas juga memerlukan vektor di bidang yang dicari agar dapat berpartisipasi dalam pencarian kesamaan.</p>
<p>Menggunakan data contoh di atas, pertimbangkan pencarian dengan <code translate="no">anns_field=&quot;embedding&quot;</code>:</p>
<table>
<thead>
<tr><th>Ekspresi filter</th><th>Entitas yang memenuhi syarat untuk pencarian kesamaan</th><th>Alasan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">category IS NULL</code></td><td><code translate="no">2</code></td><td>Entitas <code translate="no">2</code> tidak memiliki kategori, tetapi memiliki vektor <code translate="no">embedding</code>.</td></tr>
<tr><td><code translate="no">embedding IS NULL</code></td><td>Tidak ada</td><td>Entitas <code translate="no">3</code> sesuai dengan filter, tetapi tidak memiliki vektor <code translate="no">embedding</code> untuk dibandingkan dengan vektor kueri.</td></tr>
<tr><td><code translate="no">embedding IS NOT NULL</code></td><td><code translate="no">1</code>, <code translate="no">2</code></td><td>Kedua entitas memiliki vektor <code translate="no">embedding</code>.</td></tr>
</tbody>
</table>
<p>Ketiga filter tersebut valid. Pencarian pada ` <code translate="no">embedding</code> ` dengan ` <code translate="no">embedding IS NULL</code> ` tidak menghasilkan hasil karena tidak ada entitas yang dapat memenuhi kedua persyaratan tersebut. Untuk mengambil entitas dengan embedding yang hilang, gunakan ` <code translate="no">query()</code> ` seperti yang ditunjukkan di atas.</p>
<p>Pencarian vektor sudah mengabaikan entitas yang bidang vektornya NULL, sehingga <code translate="no">embedding IS NOT NULL</code> tidak mempersempit kandidat lebih lanjut untuk pencarian pada <code translate="no">embedding</code>. Peringkat, filter lain, dan batas pencarian tetap menentukan kandidat mana yang akan ditampilkan.</p>
<h2 id="Tips-on-using-basic-operators-with-JSON-and-ARRAY-fields" class="common-anchor-header">Tips menggunakan operator dasar dengan bidang JSON dan ARRAY<button data-href="#Tips-on-using-basic-operators-with-JSON-and-ARRAY-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Meskipun operator dasar di Milvus serbaguna dan dapat diterapkan pada bidang skalar, operator tersebut juga dapat digunakan secara efektif dengan kunci dan indeks di bidang JSON dan ARRAY.</p>
<p>Misalnya, jika Anda memiliki bidang <code translate="no">product</code> yang berisi beberapa kunci seperti <code translate="no">price</code>, <code translate="no">model</code>, dan <code translate="no">tags</code>, selalu rujuk kunci tersebut secara langsung:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;product[\&quot;price\&quot;] &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;product[\&quot;price\&quot;] &gt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;product[\&quot;price\&quot;] &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;product[\&quot;price\&quot;] &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;product[\&quot;price\&quot;] &gt; 1000&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mencari catatan di mana suhu pertama dalam array suhu yang tercatat melebihi nilai tertentu, gunakan:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;history_temperatures[0] &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;history_temperatures[0] &gt; 30&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;history_temperatures[0] &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;history_temperatures[0] &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;history_temperatures[0] &gt; 30&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Milvus menawarkan berbagai operator dasar yang memberi Anda fleksibilitas dalam memfilter dan menanyakan data Anda. Dengan menggabungkan operator perbandingan, rentang, aritmatika, dan logika, Anda dapat membuat ekspresi filter yang kuat untuk mempersempit hasil pencarian dan mengambil data yang Anda butuhkan secara efisien.</p>
<h2 id="FAQ" class="common-anchor-header">Pertanyaan Umum<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Apakah ada batasan panjang daftar nilai pencocokan dalam kondisi filter (misalnya, filter=’color in ["red", "green", “blue”]')? Apa yang harus saya lakukan jika daftar tersebut terlalu panjang?</strong></p>
<p>Milvus tidak memberlakukan batasan panjang pada daftar nilai pencocokan dalam kondisi filter. Namun, daftar yang terlalu panjang dapat berdampak signifikan terhadap kinerja kueri.
Jika kondisi filter Anda mencakup daftar nilai pencocokan yang panjang atau ekspresi kompleks dengan banyak elemen, kami menyarankan penggunaan <a href="/docs/id/filtering-templating.md">Filter Templating</a> untuk meningkatkan kinerja kueri.</p>
