---
id: embed-with-gemini.md
order: 2
summary: Milvus terintegrasi dengan model OpenAI melalui kelas GeminiEmbeddingFunction.
title: Gemini
---
<h1 id="Gemini" class="common-anchor-header">Gemini<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus berintegrasi dengan model Gemini melalui kelas <strong>GeminiEmbeddingFunction</strong>. Kelas ini menyediakan metode untuk menyandikan dokumen dan kueri menggunakan model Gemini yang telah dilatih sebelumnya dan mengembalikan sematan sebagai vektor padat yang kompatibel dengan pengindeksan Milvus. Untuk menggunakan fungsi ini, dapatkan kunci API dari <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a> dengan membuat akun di platform mereka.</p>
<p>Untuk menggunakan fitur ini, instal dependensi yang diperlukan:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, instal <strong>GeminiEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameter</strong>:</p>
<ul>
<li><p><strong>model_name</strong><em>(string</em>)</p>
<p>Nama model Gemini yang akan digunakan untuk pengkodean. Opsi yang valid adalah <strong>gemini-embedding-exp-03-07</strong>(default), <strong>models/embedding-001</strong>, dan <strong>models/text-embedding-004</strong>.</p></li>
<li><p><strong>api_key</strong><em>(string</em>)</p>
<p>Kunci API untuk mengakses API Gemini.</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) Konfigurasi opsional untuk model penyematan.</p>
<ul>
<li><strong>Output_dimensionality</strong> dapat ditentukan untuk jumlah penyematan output yang dihasilkan.</li>
<li><strong>Task_type</strong> dapat ditentukan untuk menghasilkan penyematan yang dioptimalkan untuk tugas tertentu, sehingga menghemat waktu dan biaya serta meningkatkan kinerja. Hanya didukung dalam model <strong>gemini-embedding-exp-03-07</strong>.</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>Nama Model</th><th>Dimensi</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>model/embedding-001</td><td>768</td></tr>
<tr><td>model/text-embedding-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Jenis Tugas</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td>SEMANTIC_SIMILARITY</td><td>Digunakan untuk menghasilkan penyematan yang dioptimalkan untuk menilai kemiripan teks.</td></tr>
<tr><td>KLASIFIKASI</td><td>Digunakan untuk menghasilkan sematan yang dioptimalkan untuk mengklasifikasikan teks menurut label yang telah ditetapkan.</td></tr>
<tr><td>PENGELOMPOKAN</td><td>Digunakan untuk menghasilkan sematan yang dioptimalkan untuk mengelompokkan teks berdasarkan kemiripannya.</td></tr>
<tr><td>RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, QUESTION_ANSWERING, dan FACT_VERIFICATION</td><td>Digunakan untuk menghasilkan sematan yang dioptimalkan untuk pencarian dokumen atau pencarian informasi.</td></tr>
<tr><td>KUERI PENGAMBILAN_KODE</td><td>Digunakan untuk mengambil blok kode berdasarkan kueri bahasa alami, seperti mengurutkan larik atau membalikkan senarai bertautan. Penyematan blok kode dihitung menggunakan RETRIEVAL_DOCUMENT.</td></tr>
</tbody>
</table>
<p>Untuk membuat penyematan untuk dokumen, gunakan metode <strong>encode_documents()</strong>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = gemini_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, gemini_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Keluaran yang diharapkan mirip dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.00894029,  0.00573813,  0.013351  , ..., -0.00042766,
       -0.00603091, -0.00341043], shape=(3072,)), array([ 0.00222347,  0.03725113,  0.01152256, ...,  0.01047272,
       -0.01701597,  0.00565377], shape=(3072,)), array([ 0.00661134,  0.00232328, -0.01342973, ..., -0.00514429,
       -0.02374139, -0.00701721], shape=(3072,))]
Dim: 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat sematan untuk kueri, gunakan metode <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Keluaran yang diharapkan mirip dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.02066572,  0.02459551,  0.00707774, ...,  0.00259341,
       -0.01797572, -0.00626168], shape=(3072,)), array([ 0.00674969,  0.03023903,  0.01230692, ...,  0.00160009,
       -0.01710967,  0.00972728], shape=(3072,))]
Dim 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
