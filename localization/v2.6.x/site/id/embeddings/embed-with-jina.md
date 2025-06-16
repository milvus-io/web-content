---
id: embed-with-jina.md
order: 8
summary: >-
  Artikel ini menjelaskan cara menggunakan JinaEmbeddingFunction untuk
  menyandikan dokumen dan kueri menggunakan model penyematan Jina AI.
title: Jina AI - Sematkan
---
<h1 id="Jina-AI" class="common-anchor-header">Jina AI<button data-href="#Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Model penyematan Jina AI adalah model penyematan teks berkinerja tinggi yang dapat menerjemahkan input tekstual ke dalam representasi numerik, menangkap semantik teks. Model-model ini unggul dalam aplikasi seperti pengambilan data yang padat, kesamaan teks semantik, dan pemahaman multibahasa.</p>
<p>Milvus terintegrasi dengan model penyematan Jina AI melalui kelas <code translate="no">JinaEmbeddingFunction</code>. Kelas ini menyediakan metode untuk mengkodekan dokumen dan kueri menggunakan model penyematan Jina AI dan mengembalikan penyematan sebagai vektor padat yang kompatibel dengan pengindeksan Milvus. Untuk memanfaatkan fungsionalitas ini, dapatkan kunci API dari <a href="https://jina.ai/embeddings/">Jina AI</a>.</p>
<p>Untuk menggunakan fitur ini, instal dependensi yang diperlukan:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, instal <code translate="no">JinaEmbeddingFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINAAI_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>, <span class="hljs-comment"># Specify the task</span>
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameter</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(string</em>)</p>
<p>Nama model penyematan Jina AI yang akan digunakan untuk penyandian. Anda dapat menentukan salah satu nama model penyematan Jina AI yang tersedia, misalnya, <code translate="no">jina-embeddings-v3</code>, <code translate="no">jina-embeddings-v2-base-en</code>, dll. Jika Anda membiarkan parameter ini tidak ditentukan, <code translate="no">jina-embeddings-v3</code> akan digunakan. Untuk daftar model yang tersedia, lihat <a href="https://jina.ai/embeddings">Penyematan Jina</a>.</p></li>
<li><p><code translate="no">api_key</code> <em>(string</em>)</p>
<p>Kunci API untuk mengakses API Jina AI.</p></li>
<li><p><code translate="no">task</code> <em>(string</em>)</p>
<p>Jenis input yang diteruskan ke model. Diperlukan untuk model penyematan v3 dan yang lebih tinggi.</p>
<ul>
<li><code translate="no">&quot;retrieval.passage&quot;</code>: Digunakan untuk menyandikan dokumen besar dalam tugas pengambilan pada waktu pengindeksan.</li>
<li><code translate="no">&quot;retrieval.query&quot;</code>: Digunakan untuk menyandikan kueri atau pertanyaan pengguna dalam tugas pengambilan.</li>
<li><code translate="no">&quot;classification&quot;</code>: Digunakan untuk menyandikan teks untuk tugas klasifikasi teks.</li>
<li><code translate="no">&quot;text-matching&quot;</code>: Digunakan untuk menyandikan teks untuk pencocokan kemiripan, seperti mengukur kemiripan antara dua kalimat.</li>
<li><code translate="no">&quot;clustering&quot;</code>: Digunakan untuk tugas pengelompokan atau pemeringkatan.</li>
</ul></li>
<li><p><code translate="no">dimensions</code> <em>(int</em>)</p>
<p>Jumlah dimensi yang harus dimiliki oleh penyematan keluaran yang dihasilkan. Nilai default adalah 1024. Hanya didukung untuk model penyematan v3 dan yang lebih tinggi.</p></li>
<li><p><code translate="no">late_chunking</code> <em>(bool</em>)</p>
<p>Parameter ini mengontrol apakah akan menggunakan metode chunking baru yang <a href="https://arxiv.org/abs/2409.04701">diperkenalkan Jina AI bulan lalu</a> untuk menyandikan sekumpulan kalimat. Defaultnya adalah <code translate="no">False</code>. Jika disetel ke <code translate="no">True</code>, Jina AI API akan menggabungkan semua kalimat di bidang input dan mengumpankannya sebagai string tunggal ke model. Secara internal, model menyematkan string panjang yang digabungkan ini dan kemudian melakukan pemotongan akhir, mengembalikan daftar penyematan yang sesuai dengan ukuran daftar masukan.</p></li>
</ul>
<p>Untuk membuat penyematan dokumen, gunakan metode <code translate="no">encode_documents()</code>. Metode ini dirancang untuk penyematan dokumen dalam tugas pengambilan asimetris, seperti mengindeks dokumen untuk tugas pencarian atau rekomendasi. Metode ini menggunakan <code translate="no">retrieval.passage</code> sebagai tugas.</p>
<pre><code translate="no" class="language-python:">
```python
docs = [
    &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;,
    &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;,
    &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;,
]

docs_embeddings = jina_ef.encode_documents(docs)

# Print embeddings
print(&quot;Embeddings:&quot;, docs_embeddings)
# Print dimension and shape of embeddings
print(&quot;Dim:&quot;, jina_ef.dim, docs_embeddings[0].shape)
</code></pre>
<p>Hasil yang diharapkan adalah seperti berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">9.80641991e-02</span>, -<span class="hljs-number">8.51697400e-02</span>,  <span class="hljs-number">7.36531913e-02</span>,  <span class="hljs-number">1.42558888e-02</span>,
       -<span class="hljs-number">2.23589484e-02</span>,  <span class="hljs-number">1.68494112e-03</span>, -<span class="hljs-number">3.50753777e-02</span>, -<span class="hljs-number">3.11530549e-02</span>,
       -<span class="hljs-number">3.26012149e-02</span>,  <span class="hljs-number">5.04568312e-03</span>,  <span class="hljs-number">3.69836427e-02</span>,  <span class="hljs-number">3.48948985e-02</span>,
        <span class="hljs-number">8.19722563e-03</span>,  <span class="hljs-number">5.88679723e-02</span>, -<span class="hljs-number">6.71099266e-03</span>, -<span class="hljs-number">1.82369724e-02</span>,
...
        <span class="hljs-number">2.48654783e-02</span>,  <span class="hljs-number">3.43279652e-02</span>, -<span class="hljs-number">1.66154150e-02</span>, -<span class="hljs-number">9.90478322e-03</span>,
       -<span class="hljs-number">2.96043139e-03</span>, -<span class="hljs-number">8.57473817e-03</span>, -<span class="hljs-number">7.39028037e-04</span>,  <span class="hljs-number">6.25024503e-03</span>,
       -<span class="hljs-number">1.08831357e-02</span>, -<span class="hljs-number">4.00776342e-02</span>,  <span class="hljs-number">3.25369164e-02</span>, -<span class="hljs-number">1.42691191e-03</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat sematan untuk kueri, gunakan metode <code translate="no">encode_queries()</code>. Metode ini dirancang untuk penyematan kueri dalam tugas pengambilan asimetris, seperti kueri penelusuran atau pertanyaan. Metode ini menggunakan <code translate="no">retrieval.query</code> sebagai tugas.</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Keluaran yang diharapkan mirip dengan yang berikut ini:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">8.79201014e-03</span>,  <span class="hljs-number">1.47551354e-02</span>,  <span class="hljs-number">4.02722731e-02</span>, -<span class="hljs-number">2.52991207e-02</span>,
        <span class="hljs-number">1.12719582e-02</span>,  <span class="hljs-number">3.75947170e-02</span>,  <span class="hljs-number">3.97946090e-02</span>, -<span class="hljs-number">7.36681819e-02</span>,
       -<span class="hljs-number">2.17952449e-02</span>, -<span class="hljs-number">1.16298944e-02</span>, -<span class="hljs-number">6.83426252e-03</span>, -<span class="hljs-number">5.12507409e-02</span>,
        <span class="hljs-number">5.26071340e-02</span>,  <span class="hljs-number">6.75181448e-02</span>,  <span class="hljs-number">3.92445624e-02</span>, -<span class="hljs-number">1.40817231e-02</span>,
...
        <span class="hljs-number">8.81703943e-03</span>,  <span class="hljs-number">4.24629413e-02</span>, -<span class="hljs-number">2.32944116e-02</span>, -<span class="hljs-number">2.05193572e-02</span>,
       -<span class="hljs-number">3.22035812e-02</span>,  <span class="hljs-number">2.81896023e-03</span>,  <span class="hljs-number">3.85326855e-02</span>,  <span class="hljs-number">3.64372656e-02</span>,
       -<span class="hljs-number">1.65050142e-02</span>, -<span class="hljs-number">4.26847413e-02</span>,  <span class="hljs-number">2.02664156e-02</span>, -<span class="hljs-number">1.72684863e-02</span>])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat penyematan input untuk pencocokan kesamaan (seperti tugas STS atau pengambilan simetris), klasifikasi teks, pengelompokan, atau tugas pemeringkatan, gunakan nilai parameter <code translate="no">task</code> yang sesuai saat menginstansiasi kelas <code translate="no">JinaEmbeddingFunction</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINA_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;text-matching&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)

texts = [
    <span class="hljs-string">&quot;Follow the white rabbit.&quot;</span>,  <span class="hljs-comment"># English</span>
    <span class="hljs-string">&quot;Sigue al conejo blanco.&quot;</span>,  <span class="hljs-comment"># Spanish</span>
    <span class="hljs-string">&quot;Suis le lapin blanc.&quot;</span>,  <span class="hljs-comment"># French</span>
    <span class="hljs-string">&quot;跟着白兔走。&quot;</span>,  <span class="hljs-comment"># Chinese</span>
    <span class="hljs-string">&quot;اتبع الأرنب الأبيض.&quot;</span>,  <span class="hljs-comment"># Arabic</span>
    <span class="hljs-string">&quot;Folge dem weißen Kaninchen.&quot;</span>,  <span class="hljs-comment"># German</span>
]

embeddings = jina_ef(texts)

<span class="hljs-comment"># Compute similarities</span>
<span class="hljs-built_in">print</span>(embeddings[<span class="hljs-number">0</span>] @ embeddings[<span class="hljs-number">1</span>].T)
<button class="copy-code-btn"></button></code></pre>
