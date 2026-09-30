---
id: embed-with-voyage.md
order: 7
summary: >-
  Artikel ini menjelaskan cara menggunakan VoyageEmbeddingFunction untuk
  menyandikan dokumen dan kueri menggunakan model Voyage.
title: Sematkan Perjalanan
---
<h1 id="Voyage" class="common-anchor-header">Voyage<button data-href="#Voyage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus terintegrasi dengan model-model Voyage melalui kelas VoyageEmbeddingFunction. Kelas ini menyediakan metode untuk mengkodekan dokumen dan kueri menggunakan model Voyage dan mengembalikan sematan sebagai vektor padat yang kompatibel dengan pengindeksan Milvus. Untuk menggunakan fungsi ini, dapatkan kunci API dari <a href="https://docs.voyageai.com/docs/api-key-and-installation">Voyage</a> dengan membuat akun di platform mereka.</p>
<p>Untuk menggunakan fitur ini, instal dependensi yang diperlukan:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, instal <code translate="no">VoyageEmbeddingFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> VoyageEmbeddingFunction

voyage_ef = VoyageEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;voyage-3&quot;</span>, <span class="hljs-comment"># Defaults to `voyage-3`</span>
    api_key=VOYAGE_API_KEY <span class="hljs-comment"># Provide your Voyage API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameter</strong>:</p>
<ul>
<li><code translate="no">model_name</code> (string) Nama model Voyage yang akan digunakan untuk pengkodean. Anda dapat menentukan salah satu nama model Voyage yang tersedia, misalnya, <code translate="no">voyage-3-lite</code>, <code translate="no">voyage-finance-2</code>, dsb. Jika Anda membiarkan parameter ini tidak ditentukan, <code translate="no">voyage-3</code> akan digunakan. Untuk daftar model yang tersedia, lihat <a href="https://docs.voyageai.com/docs/embeddings">dokumentasi resmi Voyage</a>.</li>
<li><code translate="no">api_key</code> (string) Kunci API untuk mengakses API Voyage. Untuk informasi tentang cara membuat kunci API, lihat <a href="https://docs.voyageai.com/docs/api-key-and-installation">Kunci API dan Klien Python</a>.</li>
</ul>
<p>Untuk membuat penyematan dokumen, gunakan metode <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = voyage_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, voyage_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang diharapkan serupa dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">0.02582654</span>, -<span class="hljs-number">0.00907086</span>, -<span class="hljs-number">0.04604037</span>, ..., -<span class="hljs-number">0.01227521</span>,
        <span class="hljs-number">0.04420955</span>, -<span class="hljs-number">0.00038829</span>]), array([ <span class="hljs-number">0.03844212</span>, -<span class="hljs-number">0.01597065</span>, -<span class="hljs-number">0.03728884</span>, ..., -<span class="hljs-number">0.02118733</span>,
        <span class="hljs-number">0.03349845</span>,  <span class="hljs-number">0.0065346</span> ]), array([ <span class="hljs-number">0.05143557</span>, -<span class="hljs-number">0.01096631</span>, -<span class="hljs-number">0.02690451</span>, ..., -<span class="hljs-number">0.02416254</span>,
        <span class="hljs-number">0.07658645</span>,  <span class="hljs-number">0.03064499</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat penyematan untuk kueri, gunakan metode <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = voyage_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, voyage_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Hasil yang diharapkan serupa dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">0.01733501</span>, -<span class="hljs-number">0.0230672</span> , -<span class="hljs-number">0.05208827</span>, ..., -<span class="hljs-number">0.00957995</span>,
        <span class="hljs-number">0.04493361</span>,  <span class="hljs-number">0.01485138</span>]), array([ <span class="hljs-number">0.05937521</span>, -<span class="hljs-number">0.00729363</span>, -<span class="hljs-number">0.02184347</span>, ..., -<span class="hljs-number">0.02107683</span>,
        <span class="hljs-number">0.05706626</span>,  <span class="hljs-number">0.0263358</span> ])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
