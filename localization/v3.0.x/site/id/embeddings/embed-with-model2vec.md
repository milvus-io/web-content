---
id: embed-with-model2vec.md
order: 14
summary: >-
  Milvus terintegrasi dengan model-model Model2Vec melalui kelas
  Model2VecEmbeddingFunction.
title: Model2Vec
---
<h1 id="Model2Vec" class="common-anchor-header">Model2Vec<button data-href="#Model2Vec" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/MinishLab/model2vec">Model2Vec</a> adalah teknik penyematan ringan dan berkinerja tinggi yang mengubah model Sentence Transformer menjadi model statis yang ringkas. Teknik ini mengurangi ukuran model hingga 50x dan mempercepat inferensi hingga 500x, dengan penurunan performa yang minimal. Model2Vec sangat ideal ketika Anda memiliki perangkat dengan sumber daya terbatas.</p>
<p>Milvus terintegrasi dengan model-model Model2Vec melalui kelas <strong>Model2VecEmbeddingFunction</strong>. Kelas ini menyediakan metode untuk menyandikan dokumen dan kueri menggunakan model Model2Vec yang telah dilatih sebelumnya dan mengembalikan sematan sebagai vektor padat yang kompatibel dengan pengindeksan Milvus.</p>
<p>Kelas ini mendukung pemuatan model dari Hugging Face Hub dan pengunggahan model Model2Vec lokal, yang menawarkan fleksibilitas untuk digunakan di berbagai lingkungan.</p>
<p>Untuk menggunakan fitur ini, instal dependensi yang diperlukan:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, instal <strong>Model2VecEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

model2vec_ef = model.dense.Model2VecEmbeddingFunction(
    model_source=<span class="hljs-string">&#x27;minishlab/potion-base-8M&#x27;</span>, <span class="hljs-comment"># or local directory</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameter</strong>:</p>
<ul>
<li><p><strong>model_source</strong><em>(string</em>)</p>
<p>Menentukan sumber model Model2Vec yang akan digunakan untuk menghasilkan penyematan. Ini mendukung dua metode pemuatan model:</p>
<ol>
<li><p><strong>Memuat dari Hugging Face Hub (Disarankan):</strong></p>
<ul>
<li>Berikan nama model sebagai string (misalnya, <code translate="no">&quot;minishlab/potion-base-8M&quot;</code>).</li>
<li>Opsi model dicantumkan sebagai berikut:<ul>
<li><code translate="no">minishlab/potion-base-8M</code> (Default)</li>
<li><code translate="no">minishlab/potion-base-4M</code></li>
<li><code translate="no">minishlab/potion-base-2M</code></li>
<li><code translate="no">minishlab/potion-base-32M</code></li>
<li><code translate="no">minishlab/potion-retrieval-32M</code></li>
</ul></li>
</ul></li>
<li><p><strong>Memuat Secara Lokal:</strong></p>
<ul>
<li>Berikan jalur file lokal tempat model Model2Vec disimpan (misalnya, <code translate="no">&quot;/path/to/local/model&quot;</code>).</li>
</ul></li>
</ol></li>
</ul>
<p>Untuk membuat penyematan untuk dokumen, gunakan metode <strong>encode_documents()</strong>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = model2vec_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, model2vec_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Keluaran yang diharapkan mirip dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">0.02220882</span>,  <span class="hljs-number">0.11436888</span>, -<span class="hljs-number">0.15094341</span>,  <span class="hljs-number">0.08149259</span>,  <span class="hljs-number">0.20425692</span>,
       -<span class="hljs-number">0.15727402</span>, -<span class="hljs-number">0.25320682</span>, -<span class="hljs-number">0.00669029</span>,  <span class="hljs-number">0.03157463</span>,  <span class="hljs-number">0.08974048</span>,
       -<span class="hljs-number">0.00148778</span>, -<span class="hljs-number">0.01803541</span>,  <span class="hljs-number">0.00230828</span>, -<span class="hljs-number">0.0137875</span> , -<span class="hljs-number">0.19242321</span>,
...
       -<span class="hljs-number">7.29782460e-03</span>, -<span class="hljs-number">2.15345751e-02</span>, -<span class="hljs-number">4.13905866e-02</span>,  <span class="hljs-number">3.70773636e-02</span>,
        <span class="hljs-number">5.45082428e-02</span>,  <span class="hljs-number">1.36436718e-02</span>,  <span class="hljs-number">1.38598625e-02</span>,  <span class="hljs-number">3.91175086e-03</span>],
      dtype=float32)]
Dim: <span class="hljs-number">256</span> (<span class="hljs-number">256</span>,)

<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat penyematan untuk kueri, gunakan metode <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = model2vec_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, model2vec_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Keluaran yang diharapkan mirip dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">1.87109038e-02</span>, -<span class="hljs-number">2.81724217e-03</span>, -<span class="hljs-number">1.67356253e-01</span>, -<span class="hljs-number">5.30372337e-02</span>,
        <span class="hljs-number">1.08304240e-01</span>, -<span class="hljs-number">1.09269567e-01</span>, -<span class="hljs-number">2.53464818e-01</span>, -<span class="hljs-number">1.77880954e-02</span>,
        <span class="hljs-number">3.05427872e-02</span>,  <span class="hljs-number">1.68244764e-01</span>, -<span class="hljs-number">7.25950347e-03</span>, -<span class="hljs-number">2.52178032e-02</span>,
...
        <span class="hljs-number">8.60440824e-03</span>,  <span class="hljs-number">2.12906860e-03</span>,  <span class="hljs-number">1.50156394e-02</span>, -<span class="hljs-number">1.29304864e-02</span>,
       -<span class="hljs-number">3.66544276e-02</span>,  <span class="hljs-number">5.01735881e-03</span>, -<span class="hljs-number">1.53137008e-02</span>,  <span class="hljs-number">9.57900891e-04</span>],
      dtype=float32)]
Dim <span class="hljs-number">256</span> (<span class="hljs-number">256</span>,)
<button class="copy-code-btn"></button></code></pre>
