---
id: embed-with-bgm-m3.md
order: 4
summary: BGE-M3 的名稱源於其具備多語言、多功能及多粒度等特性。
title: BGE M3
---
<h1 id="BGE-M3" class="common-anchor-header">BGE M3<button data-href="#BGE-M3" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>的命名源自其具備的多語言、多功能及多粒度三大特性。BGE-M3 支援超過 100 種語言，在多語言與跨語言檢索任務中樹立了新的標竿。 其獨特之處在於能在單一框架內執行密集檢索、多向量檢索及稀疏檢索，使其成為各類資訊檢索（IR）應用的理想選擇。</p>
<p>Milvus 透過<strong>BGEM3EmbeddingFunction</strong>類別與 BGE-M3 模型整合。此類別負責處理嵌入向量的計算，並以與 Milvus 相容的格式返回結果，以便進行索引與搜尋。</p>
<p>此範例會在您的 Python 程序中產生嵌入向量；它不會連線至 Milvus 伺服器。模型權重會在首次使用時下載，因此您需要連線至模型主機，或具備已載入的本地模型快取。<code translate="no">use_fp16=False</code> 支援 CPU 推論。</p>
<p>若要使用此功能，請安裝必要的依賴項：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>接著，建立<strong>BGEM3EmbeddingFunction</strong> 的實例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

bge_m3_ef = BGEM3EmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;BAAI/bge-m3&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    device=<span class="hljs-string">&#x27;cpu&#x27;</span>, <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
    use_fp16=<span class="hljs-literal">False</span> <span class="hljs-comment"># Specify whether to use fp16. Set to `False` if `device` is `cpu`.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>參數</strong>：</p>
<ul>
<li><p><strong>model_name</strong>(<em>字串</em>)</p>
<p>用於編碼的模型名稱。預設值為<strong>BAAI/bge-m3</strong>。</p></li>
<li><p><strong>device</strong>(<em>字串</em>)</p>
<p>要使用的裝置，其中 `<strong>cpu</strong>` 代表 CPU，`<strong>cuda:n</strong>` 則代表第 n 個 GPU 裝置。</p></li>
<li><p><strong>use_fp16</strong>(<em>布林值</em>)</p>
<p>是否使用 16 位元浮點精度 (fp16)。當<strong>裝置</strong>為<strong>cpu</strong> 時，請指定<strong>False</strong>。</p></li>
</ul>
<p>若要為文件建立嵌入向量，請使用<strong>encode_documents()</strong>方法：</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = bge_m3_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension of dense embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dense document dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;dense&quot;</span>], docs_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>].shape)
<span class="hljs-comment"># Since the sparse embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse document dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-built_in">list</span>(docs_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>])[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期輸出類似如下：</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [array([-<span class="hljs-number">0.02505937</span>, -<span class="hljs-number">0.00142193</span>,  <span class="hljs-number">0.04015467</span>, ..., -<span class="hljs-number">0.02094924</span>,
        <span class="hljs-number">0.02623661</span>,  <span class="hljs-number">0.00324098</span>], dtype=float32), array([ <span class="hljs-number">0.00118463</span>,  <span class="hljs-number">0.00649292</span>, -<span class="hljs-number">0.00735763</span>, ..., -<span class="hljs-number">0.01446293</span>,
        <span class="hljs-number">0.04243685</span>, -<span class="hljs-number">0.01794822</span>], dtype=float32), array([ <span class="hljs-number">0.00415287</span>, -<span class="hljs-number">0.0101492</span> ,  <span class="hljs-number">0.0009811</span> , ..., -<span class="hljs-number">0.02559666</span>,
        <span class="hljs-number">0.08084674</span>,  <span class="hljs-number">0.00141647</span>], dtype=float32)], <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;3x250002 sparse array of <span class="hljs-built_in">type</span> <span class="hljs-string">&#x27;&lt;class &#x27;</span>numpy.float32<span class="hljs-string">&#x27;&gt;&#x27;</span>
        <span class="hljs-keyword">with</span> <span class="hljs-number">43</span> stored elements <span class="hljs-keyword">in</span> Compressed Sparse Row <span class="hljs-built_in">format</span>&gt;}
Dense document dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
Sparse document dim: <span class="hljs-number">250002</span> (<span class="hljs-number">1</span>, <span class="hljs-number">250002</span>)
<button class="copy-code-btn"></button></code></pre>
<p>若要為查詢建立嵌入向量，請使用<strong>encode_queries()</strong>方法：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = bge_m3_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension of dense embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dense query dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;dense&quot;</span>], query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>].shape)
<span class="hljs-comment"># Since the sparse embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse query dim:&quot;</span>, bge_m3_ef.dim[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-built_in">list</span>(query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>])[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>預期輸出類似如下：</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [array([-<span class="hljs-number">0.02024024</span>, -<span class="hljs-number">0.01514386</span>,  <span class="hljs-number">0.02380808</span>, ...,  <span class="hljs-number">0.00234648</span>,
       -<span class="hljs-number">0.00264978</span>, -<span class="hljs-number">0.04317448</span>], dtype=float32), array([ <span class="hljs-number">0.00648045</span>, -<span class="hljs-number">0.0081542</span> , -<span class="hljs-number">0.02717067</span>, ..., -<span class="hljs-number">0.00380103</span>,
        <span class="hljs-number">0.04200587</span>, -<span class="hljs-number">0.01274772</span>], dtype=float32)], <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;2x250002 sparse array of <span class="hljs-built_in">type</span> <span class="hljs-string">&#x27;&lt;class &#x27;</span>numpy.float32<span class="hljs-string">&#x27;&gt;&#x27;</span>
        <span class="hljs-keyword">with</span> <span class="hljs-number">14</span> stored elements <span class="hljs-keyword">in</span> Compressed Sparse Row <span class="hljs-built_in">format</span>&gt;}
Dense query dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
Sparse query dim: <span class="hljs-number">250002</span> (<span class="hljs-number">1</span>, <span class="hljs-number">250002</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Store-and-search-the-embeddings" class="common-anchor-header">儲存與搜尋嵌入向量<button data-href="#Store-and-search-the-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>生成嵌入向量是第一步。若要將這些輸出用於檢索，請定義一個集合，並為每個向量欄位建立索引：</p>
<ul>
<li>將 `<code translate="no">docs_embeddings[&quot;dense&quot;]</code> ` 映射至維度為 `<code translate="no">bge_m3_ef.dim[&quot;dense&quot;]</code>` 的 `<code translate="no">FLOAT_VECTOR</code> ` 欄位。</li>
<li>將 `<code translate="no">docs_embeddings[&quot;sparse&quot;]</code> ` 映射至 `<code translate="no">SPARSE_FLOAT_VECTOR</code> ` 欄位，此欄位在 Milvus 模式中無需固定維度。針對這些學習到的稀疏向量，請使用 `<code translate="no">IP</code> ` 度量。請參閱<a href="/docs/zh-hant/sparse_vector.md">「稀疏向量</a>」。</li>
<li>將每個文檔的 ID 及其來源文字或元資料與其向量一同儲存，以便搜尋結果可追溯至來源。</li>
<li>使用與文件相同的模型和設定來編碼查詢。發出單一的<code translate="no">hybrid_search()</code> 請求，其中包含一個針對稠密欄位的<code translate="no">AnnSearchRequest</code> 以及一個針對稀疏欄位的 ，並讓伺服器端的排序器（例如 RRF）或加權排序器來融合結果。</li>
</ul>
<p>請參閱<a href="/docs/zh-hant/hybrid_search_with_milvus.md">《使用 Milvus 進行混合搜尋</a>》以了解集合架構、索引、插入及混合搜尋請求的相關內容。本頁面的範例使用封裝器的密集型和稀疏型輸出；並未展示 BGE-M3 的可選功能——ColBERT 多向量輸出。</p>
