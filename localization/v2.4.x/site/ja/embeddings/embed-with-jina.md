---
id: embed-with-jina.md
order: 8
summary: この記事では、JinaEmbeddingFunctionを使って、Jina AIエンベッディングモデルを使って文書やクエリをエンコードする方法を説明します。
title: ジーナAI - エンベッド
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
    </button></h1><p>Jina AIの埋め込みモデルは、テキスト入力を数値表現に変換し、テキストのセマンティクスを捉えることができる高性能テキスト埋め込みモデルです。これらのモデルは、高密度検索、意味的テキスト類似性、多言語理解などの用途に優れています。</p>
<p>Milvusは、<code translate="no">JinaEmbeddingFunction</code> クラスを介してJina AIの埋め込みモデルと統合されています。このクラスは、Jina AIの埋め込みモデルを使って文書やクエリをエンコードし、Milvusのインデックスと互換性のある密なベクトルとして埋め込みを返すためのメソッドを提供します。この機能を利用するには、<a href="https://jina.ai/embeddings/">Jina AIから</a>APIキーを取得してください。</p>
<p>この機能を使用するには、必要な依存関係をインストールします：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、<code translate="no">JinaEmbeddingFunction</code> をインスタンス化する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINAAI_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>, <span class="hljs-comment"># Specify the task</span>
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>パラメータ</strong>：</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(文字列）</em></p>
<p>エンコードに使用するJina AIエンベッディングモデルの名前。利用可能なJina AIエンベッディング・モデル名のいずれかを指定できます。例えば、<code translate="no">jina-embeddings-v3</code> 、<code translate="no">jina-embeddings-v2-base-en</code> など。このパラメータを未指定のままにすると、<code translate="no">jina-embeddings-v3</code> が使用されます。利用可能なモデルのリストについては、<a href="https://jina.ai/embeddings">Jina Embeddingsを</a>参照してください。</p></li>
<li><p><code translate="no">api_key</code> <em>(文字列</em>)</p>
<p>Jina AI APIにアクセスするためのAPIキー。</p></li>
<li><p><code translate="no">task</code> <em>(文字列</em>)</p>
<p>モデルに渡される入力のタイプ。エンベッディングモデルv3以降では必須。</p>
<ul>
<li><code translate="no">&quot;retrieval.passage&quot;</code>:インデックス作成時の検索タスクで、大きな文書をエンコードするために使われる。</li>
<li><code translate="no">&quot;retrieval.query&quot;</code>:検索タスクにおいて、ユーザーからの問い合わせや質問を符号化するために使用される。</li>
<li><code translate="no">&quot;classification&quot;</code>:テキスト分類タスクでテキストを符号化する。</li>
<li><code translate="no">&quot;text-matching&quot;</code>:2つの文の類似度を測定するような、類似度マッチングのためにテキストを符号化する。</li>
<li><code translate="no">&quot;clustering&quot;</code>:クラスタリングやリランキングに使用される。</li>
</ul></li>
<li><p><code translate="no">dimensions</code> <em>(int</em>)</p>
<p>埋め込み結果の次元数。デフォルトは1024です。埋め込みモデルv3以降でのみサポートされる。</p></li>
<li><p><code translate="no">late_chunking</code> <em>(bool</em>)</p>
<p>このパラメータは、<a href="https://arxiv.org/abs/2409.04701">Jina AIが先月導入した</a>新しいチャンキング手法を、文の一括エンコーディングに使用するかどうかを制御する。デフォルトは<code translate="no">False</code> 。<code translate="no">True</code> に設定すると、Jina AI APIは入力フィールドの全ての文章を連結し、一つの文字列としてモデルに送り込む。内部的には、モデルはこの長く連結された文字列を埋め込み、その後チャンキングを行い、入力リストのサイズに一致する埋め込みリストを返す。</p></li>
</ul>
<p>ドキュメントの埋め込みを作成するには、<code translate="no">encode_documents()</code> メソッドを使います。このメソッドは、検索や推薦タスクのための文書のインデックス付けのような、非対称検索タスクにおける文書の埋め込み用に設計されている。このメソッドはタスクとして<code translate="no">retrieval.passage</code> 。</p>
<pre><code translate="no" class="language-python:">
```python
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = jina_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, jina_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([9.80641991e-02, -8.51697400e-02,  7.36531913e-02,  1.42558888e-02,
       -2.23589484e-02,  1.68494112e-03, -3.50753777e-02, -3.11530549e-02,
       -3.26012149e-02,  5.04568312e-03,  3.69836427e-02,  3.48948985e-02,
        8.19722563e-03,  5.88679723e-02, -6.71099266e-03, -1.82369724e-02,
...
        2.48654783e-02,  3.43279652e-02, -1.66154150e-02, -9.90478322e-03,
       -2.96043139e-03, -8.57473817e-03, -7.39028037e-04,  6.25024503e-03,
       -1.08831357e-02, -4.00776342e-02,  3.25369164e-02, -1.42691191e-03])]
Dim: 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>クエリの埋め込みを作成するには、<code translate="no">encode_queries()</code> 。このメソッドは、検索クエリや質問などの非対称検索タスクにおけるクエリ埋め込み用に設計されています。このメソッドは<code translate="no">retrieval.query</code> をタスクとして使用します。</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([8.79201014e-03,  1.47551354e-02,  4.02722731e-02, -2.52991207e-02,
        1.12719582e-02,  3.75947170e-02,  3.97946090e-02, -7.36681819e-02,
       -2.17952449e-02, -1.16298944e-02, -6.83426252e-03, -5.12507409e-02,
        5.26071340e-02,  6.75181448e-02,  3.92445624e-02, -1.40817231e-02,
...
        8.81703943e-03,  4.24629413e-02, -2.32944116e-02, -2.05193572e-02,
       -3.22035812e-02,  2.81896023e-03,  3.85326855e-02,  3.64372656e-02,
       -1.65050142e-02, -4.26847413e-02,  2.02664156e-02, -1.72684863e-02])]
Dim 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>類似マッチング（STS や対称検索タスクなど）、テキスト分類、クラスタリング、リランキングタスクの入力の埋め込みを作成するには、<code translate="no">JinaEmbeddingFunction</code> クラスをインスタンス化するときに、適切な<code translate="no">task</code> パラメータ値を使用します。</p>
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
