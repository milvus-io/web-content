---
id: embed-with-model2vec.md
order: 14
summary: MilvusはModel2VecEmbeddingFunctionクラスを通してModel2Vecのモデルと統合します。
title: モデル2Vec
---
<h1 id="Model2Vec" class="common-anchor-header">モデル2Vec<button data-href="#Model2Vec" class="anchor-icon" translate="no">
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
    </button></h1><p>Model2Vecは、Sentence Transformerモデルをコンパクトな静的モデルに変換する、軽量で高性能な埋め込み技術です。モデルサイズを最大50倍縮小し、推論を最大500倍高速化します。Model2Vecは、リソースに制約のあるデバイスに最適です。</p>
<p>MilvusはModel2<strong>VecEmbeddingFunction</strong>クラスを介してModel2Vecのモデルと統合します。このクラスは、事前に学習されたModel2Vecモデルを用いて文書やクエリをエンコードし、Milvusのインデックスと互換性のある密なベクトルとしてエンベッディングを返すためのメソッドを提供します。</p>
<p>Hugging Face HubからのモデルのロードとローカルのModel2Vecモデルのアップロードの両方をサポートしており、様々な環境での展開に柔軟性を提供します。</p>
<p>この機能を使うには、必要な依存関係をインストールする：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、<strong>Model2VecEmbeddingFunctionを</strong>インスタンス化します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

model2vec_ef = model.dense.Model2VecEmbeddingFunction(
    model_source=<span class="hljs-string">&#x27;minishlab/potion-base-8M&#x27;</span>, <span class="hljs-comment"># or local directory</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>パラメータ</strong></p>
<ul>
<li><p><strong>model_source</strong><em>(string</em>)</p>
<p>埋め込みを生成するために使われるModel2Vecモデルのソースを指定する。モデルをロードする2つの方法をサポートする：</p>
<ol>
<li><p><strong>Hugging Face Hubからの読み込み（推奨）：</strong></p>
<ul>
<li>モデル名を文字列で指定する（例：<code translate="no">&quot;minishlab/potion-base-8M&quot;</code> ）。</li>
<li>モデルのオプションは以下の通りです：<ul>
<li><code translate="no">minishlab/potion-base-8M</code> (デフォルト）</li>
<li><code translate="no">minishlab/potion-base-4M</code></li>
<li><code translate="no">minishlab/potion-base-2M</code></li>
<li><code translate="no">minishlab/potion-base-32M</code></li>
<li><code translate="no">minishlab/potion-retrieval-32M</code></li>
</ul></li>
</ul></li>
<li><p><strong>ローカルでロード：</strong></p>
<ul>
<li>Model2Vecモデルが格納されているローカルファイルパスを指定する（例：<code translate="no">&quot;/path/to/local/model&quot;</code> ）。</li>
</ul></li>
</ol></li>
</ul>
<p>ドキュメントの埋め込みを作成するには、<strong>encode_documents()</strong>メソッドを使います：</p>
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
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">0.02220882</span>,  <span class="hljs-number">0.11436888</span>, <span class="hljs-number">-0.15094341</span>,  <span class="hljs-number">0.08149259</span>,  <span class="hljs-number">0.20425692</span>,
       <span class="hljs-number">-0.15727402</span>, <span class="hljs-number">-0.25320682</span>, <span class="hljs-number">-0.00669029</span>,  <span class="hljs-number">0.03157463</span>,  <span class="hljs-number">0.08974048</span>,
       <span class="hljs-number">-0.00148778</span>, <span class="hljs-number">-0.01803541</span>,  <span class="hljs-number">0.00230828</span>, <span class="hljs-number">-0.0137875</span> , <span class="hljs-number">-0.19242321</span>,
...
       <span class="hljs-number">-7.29782460e-03</span>, <span class="hljs-number">-2.15345751e-02</span>, <span class="hljs-number">-4.13905866e-02</span>,  <span class="hljs-number">3.70773636e-02</span>,
        <span class="hljs-number">5.45082428e-02</span>,  <span class="hljs-number">1.36436718e-02</span>,  <span class="hljs-number">1.38598625e-02</span>,  <span class="hljs-number">3.91175086e-03</span>],
      dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">256</span> (<span class="hljs-number">256</span>,)

<button class="copy-code-btn"></button></code></pre>
<p>クエリの埋め込みを作成するには、<strong>encode_queries()</strong>メソッドを使います：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = model2vec_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, model2vec_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-1.87109038e-02</span>, <span class="hljs-number">-2.81724217e-03</span>, <span class="hljs-number">-1.67356253e-01</span>, <span class="hljs-number">-5.30372337e-02</span>,
        <span class="hljs-number">1.08304240e-01</span>, <span class="hljs-number">-1.09269567e-01</span>, <span class="hljs-number">-2.53464818e-01</span>, <span class="hljs-number">-1.77880954e-02</span>,
        <span class="hljs-number">3.05427872e-02</span>,  <span class="hljs-number">1.68244764e-01</span>, <span class="hljs-number">-7.25950347e-03</span>, <span class="hljs-number">-2.52178032e-02</span>,
...
        <span class="hljs-number">8.60440824e-03</span>,  <span class="hljs-number">2.12906860e-03</span>,  <span class="hljs-number">1.50156394e-02</span>, <span class="hljs-number">-1.29304864e-02</span>,
       <span class="hljs-number">-3.66544276e-02</span>,  <span class="hljs-number">5.01735881e-03</span>, <span class="hljs-number">-1.53137008e-02</span>,  <span class="hljs-number">9.57900891e-04</span>],
      dtype=<span class="hljs-type">float32</span>)]
Dim <span class="hljs-number">256</span> (<span class="hljs-number">256</span>,)
<button class="copy-code-btn"></button></code></pre>
