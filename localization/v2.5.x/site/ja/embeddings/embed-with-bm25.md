---
id: embed-with-bm25.md
order: 5
summary: BM25は、情報検索において、与えられた検索クエリに対する文書の関連性を推定するために使用されるランキング関数である。
title: BM25
---
<h1 id="BM25" class="common-anchor-header">BM25<button data-href="#BM25" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25は</a>、情報検索において、与えられた検索クエリに対する文書の関連性を推定するために使用されるランキング関数である。文書の長さの正規化と用語頻度の飽和を組み込むことで、基本的な用語頻度アプローチを強化する。BM25は文書を用語の重要度スコアのベクトルとして表現することでスパース埋め込みを生成し、スパースベクトル空間における効率的な検索とランキングを可能にする。</p>
<p>MilvusはBM25<strong>EmbeddingFunction</strong>クラスを使ってBM25モデルと統合します。このクラスはエンベッディングの計算を処理し、インデックス作成と検索のためにMilvusと互換性のあるフォーマットで返します。この処理に不可欠なのは、トークン化のためのアナライザを構築することです。</p>
<p>この機能を使用するには、必要な依存関係をインストールしてください：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>トークン解析器を簡単に作成するために、Milvusはテキストの言語を指定するだけでよいデフォルトの解析器を提供しています。</p>
<p><strong>例</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.sparse.bm25.tokenizers <span class="hljs-keyword">import</span> build_default_analyzer
<span class="hljs-keyword">from</span> pymilvus.model.sparse <span class="hljs-keyword">import</span> BM25EmbeddingFunction

<span class="hljs-comment"># there are some built-in analyzers for several languages, now we use &#x27;en&#x27; for English.</span>
analyzer = build_default_analyzer(language=<span class="hljs-string">&quot;en&quot;</span>)

corpus = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># analyzer can tokenize the text into tokens</span>
tokens = analyzer(corpus[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;tokens:&quot;</span>, tokens)
<button class="copy-code-btn"></button></code></pre>
<p><strong>パラメータ</strong></p>
<ul>
<li><p><strong>language</strong><em>(文字列</em>)</p>
<p>トークン化するテキストの言語。有効なオプションは<strong>en</strong>(英語)、<strong>de</strong>(ドイツ語)、<strong>fr</strong>(フランス語)、<strong>ru</strong>(ロシア語)、<strong>sp</strong>(スペイン語)、<strong>it</strong>(イタリア語)、<strong>pt</strong>(ポルトガル語)、<strong>zh</strong>(中国語)、<strong>jp</strong>(日本語)、<strong>kr</strong>(韓国語) です。</p></li>
</ul>
<p>期待される出力は以下のようなものである：</p>
<pre><code translate="no" class="language-python"><span class="hljs-attr">tokens</span>: [<span class="hljs-string">&#x27;artifici&#x27;</span>, <span class="hljs-string">&#x27;intellig&#x27;</span>, <span class="hljs-string">&#x27;found&#x27;</span>, <span class="hljs-string">&#x27;academ&#x27;</span>, <span class="hljs-string">&#x27;disciplin&#x27;</span>, <span class="hljs-string">&#x27;1956&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>BM25アルゴリズムは、<strong>「artifici」、「</strong> <strong>intellig」、</strong>「<strong>academ」の</strong>ような英語のトークンで示したように、内蔵のアナライザを使用して、まずテキストをトークンに分割して処理します。次に、これらのトークンの統計情報を収集し、その頻度と文書全体の分布を評価する。BM25のコアは各トークンの重要度に基づいて関連性スコアを計算し、より稀なトークンはより高いスコアを得る。この簡潔な処理により、クエリとの関連性によって文書を効果的にランク付けすることができる。</p>
<p>コーパスの統計情報を収集するには、<strong>fit()</strong>メソッドを使用する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the analyzer to instantiate the BM25EmbeddingFunction</span>
bm25_ef = BM25EmbeddingFunction(analyzer)

<span class="hljs-comment"># Fit the model on the corpus to get the statstics of the corpus</span>
bm25_ef.fit(corpus)
<button class="copy-code-btn"></button></code></pre>
<p>次に、<strong>encode_documents() を使って</strong>文書の埋め込みを作成します：</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;The field of artificial intelligence was established as an academic subject in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the pioneer in conducting significant research in artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;Originating in Maida Vale, London, Turing grew up in the southern regions of England.&quot;</span>,
    <span class="hljs-string">&quot;In 1956, artificial intelligence emerged as a scholarly field.&quot;</span>,
    <span class="hljs-string">&quot;Turing, originally from Maida Vale, London, was brought up in the south of England.&quot;</span>
]

<span class="hljs-comment"># Create embeddings for the documents</span>
docs_embeddings = bm25_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(docs_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        1.0208816705336425
  (0, 1)        1.0208816705336425
  (0, 3)        1.0208816705336425
...
  (4, 16)        0.9606986899563318
  (4, 17)        0.9606986899563318
  (4, 20)        0.9606986899563318
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p>クエリの埋め込みを作成するには、<strong>encode_queries()</strong>メソッドを使います：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = bm25_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(query_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は次のようになります：</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        0.5108256237659907
  (0, 1)        0.5108256237659907
  (0, 2)        0.5108256237659907
  (1, 6)        0.5108256237659907
  (1, 7)        0.11554389108992644
  (1, 14)        0.5108256237659907
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p><strong>注意：</strong></p>
<p><strong>BM25EmbeddingFunction を</strong>使うとき、<strong>encoding_queries()</strong>と<strong>encoding_documents() の</strong>操作は、数学的に交換できないことに注意。したがって、実装された<strong>bm25_ef(texts) は</strong>ない。</p>
