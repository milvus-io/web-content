---
id: embed-with-bgm-m3.md
order: 4
summary: BGE-M3は、マルチリンガル、マルチファンクション、マルチグラニュラリティの能力から名付けられた。
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
    </button></h1><p><a href="https://arxiv.org/abs/2402.03216">BGE-M3は</a>、多言語、多機能、多グラニュラリティに対応することから命名されました。100以上の言語をサポートするBGE-M3は、多言語およびクロスリンガル検索タスクにおいて新たなベンチマークを打ち立てます。単一のフレームワークで高密度検索、マルチベクトル検索、スパース検索を実行できるユニークな機能により、幅広い情報検索（IR）アプリケーションに理想的な選択肢となっています。</p>
<p>Milvusは<strong>BGEM3EmbeddingFunction</strong>クラスを使用してBGE M3モデルと統合されています。このクラスはエンベッディングの計算を処理し、Milvusと互換性のあるフォーマットでインデックスや検索用に返します。この機能を使用するには、FlagEmbeddingがインストールされている必要があります。</p>
<p>この機能を使用するには、必要な依存関係をインストールします：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、<strong>BGEM3EmbeddingFunctionを</strong>インスタンス化します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

bge_m3_ef = BGEM3EmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;BAAI/bge-m3&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    device=<span class="hljs-string">&#x27;cpu&#x27;</span>, <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
    use_fp16=<span class="hljs-literal">False</span> <span class="hljs-comment"># Specify whether to use fp16. Set to `False` if `device` is `cpu`.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>パラメータ</strong></p>
<ul>
<li><p><strong>model_name</strong><em>(string</em>)</p>
<p>エンコーディングに使用するモデルの名前。デフォルトは<strong>BAAI/bge-m3</strong>。</p></li>
<li><p><strong>device</strong><em>(string</em>)</p>
<p>使用するデバイス。CPUには<strong>cpu</strong>、n番目のGPUデバイスには<strong>cuda:nを</strong>指定します。</p></li>
<li><p><strong>use_fp16</strong><em>(bool</em>)</p>
<p>16ビット浮動小数点精度（fp16）を利用するかどうか。<strong>デバイスが</strong> <strong>cpuの</strong>場合は<strong>Falseを</strong>指定します。</p></li>
</ul>
<p>ドキュメントの埋め込みを作成するには、<strong>encode_documents()</strong>メソッドを使います：</p>
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
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [array([-<span class="hljs-number">0.02505937</span>, -<span class="hljs-number">0.00142193</span>,  <span class="hljs-number">0.04015467</span>, ..., -<span class="hljs-number">0.02094924</span>,
        <span class="hljs-number">0.02623661</span>,  <span class="hljs-number">0.00324098</span>], dtype=float32), array([ <span class="hljs-number">0.00118463</span>,  <span class="hljs-number">0.00649292</span>, -<span class="hljs-number">0.00735763</span>, ..., -<span class="hljs-number">0.01446293</span>,
        <span class="hljs-number">0.04243685</span>, -<span class="hljs-number">0.01794822</span>], dtype=float32), array([ <span class="hljs-number">0.00415287</span>, -<span class="hljs-number">0.0101492</span> ,  <span class="hljs-number">0.0009811</span> , ..., -<span class="hljs-number">0.02559666</span>,
        <span class="hljs-number">0.08084674</span>,  <span class="hljs-number">0.00141647</span>], dtype=float32)], <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;3x250002 sparse array of <span class="hljs-built_in">type</span> <span class="hljs-string">&#x27;&lt;class &#x27;</span>numpy.float32<span class="hljs-string">&#x27;&gt;&#x27;</span>
        <span class="hljs-keyword">with</span> <span class="hljs-number">43</span> stored elements <span class="hljs-keyword">in</span> Compressed Sparse Row <span class="hljs-built_in">format</span>&gt;}
Dense document dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
Sparse document dim: <span class="hljs-number">250002</span> (<span class="hljs-number">1</span>, <span class="hljs-number">250002</span>)
<button class="copy-code-btn"></button></code></pre>
<p>クエリの埋め込みを作成するには、<strong>encode_queries()</strong>メソッドを使用します：</p>
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
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: {<span class="hljs-string">&#x27;dense&#x27;</span>: [array([-<span class="hljs-number">0.02024024</span>, -<span class="hljs-number">0.01514386</span>,  <span class="hljs-number">0.02380808</span>, ...,  <span class="hljs-number">0.00234648</span>,
       -<span class="hljs-number">0.00264978</span>, -<span class="hljs-number">0.04317448</span>], dtype=float32), array([ <span class="hljs-number">0.00648045</span>, -<span class="hljs-number">0.0081542</span> , -<span class="hljs-number">0.02717067</span>, ..., -<span class="hljs-number">0.00380103</span>,
        <span class="hljs-number">0.04200587</span>, -<span class="hljs-number">0.01274772</span>], dtype=float32)], <span class="hljs-string">&#x27;sparse&#x27;</span>: &lt;2x250002 sparse array of <span class="hljs-built_in">type</span> <span class="hljs-string">&#x27;&lt;class &#x27;</span>numpy.float32<span class="hljs-string">&#x27;&gt;&#x27;</span>
        <span class="hljs-keyword">with</span> <span class="hljs-number">14</span> stored elements <span class="hljs-keyword">in</span> Compressed Sparse Row <span class="hljs-built_in">format</span>&gt;}
Dense query dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
Sparse query dim: <span class="hljs-number">250002</span> (<span class="hljs-number">1</span>, <span class="hljs-number">250002</span>)
<button class="copy-code-btn"></button></code></pre>
