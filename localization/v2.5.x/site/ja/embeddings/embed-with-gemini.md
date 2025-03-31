---
id: embed-with-gemini.md
order: 2
summary: Milvusは、GeminiEmbeddingFunctionクラスを介してOpenAIのモデルと統合される。
title: ジェミニ
---
<h1 id="Gemini" class="common-anchor-header">ジェミニ<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは<strong>GeminiEmbeddingFunction</strong>クラスを通してGeminiのモデルと統合されます。このクラスは、事前に学習されたGeminiモデルを用いてドキュメントやクエリをエンコードし、Milvusインデックスと互換性のある密なベクトルとしてエンベッディングを返すためのメソッドを提供します。この機能を利用するには、<a href="https://ai.google.dev/gemini-api/docs/api-key">Geminiの</a>プラットフォームでアカウントを作成し、APIキーを取得してください。</p>
<p>この機能を使用するには、必要な依存関係をインストールする：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、<strong>GeminiEmbeddingFunctionを</strong>インスタンス化します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>パラメータ</strong></p>
<ul>
<li><p><strong>model_name</strong><em>(string</em>)</p>
<p>エンコーディングに使用するGeminiモデルの名前。有効なオプションは、<strong>gemini-embedding-exp-03-07</strong>（デフォルト）、<strong>models/embedding-001</strong>、<strong>models/text-embedding-004</strong>。</p></li>
<li><p><strong>api_key</strong><em>(文字列</em>)</p>
<p>Gemini APIにアクセスするためのAPIキー。</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) 埋め込みモデルのオプション設定。</p>
<ul>
<li><strong>output_dimensionalityには</strong>、結果の出力埋め込み数を指定できる。</li>
<li><strong>task_typeを</strong>指定することで、特定のタスクに最適化された埋め込みを生成し、時間とコストを節約し、パフォーマンスを向上させることができる。<strong>gemini-embedding-exp-03-07</strong>モデルでのみサポートされています。</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>モデル名</th><th>寸法</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>モデル/エンベッディング-001</td><td>768</td></tr>
<tr><td>モデル/テキスト埋め込み-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>タスクタイプ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>セマンティック類似度</td><td>テキストの類似度を評価するために最適化された埋め込みを生成する。</td></tr>
<tr><td>分類</td><td>あらかじめ設定されたラベルに従ってテキストを分類するために最適化された埋め込みを生成するために使用される。</td></tr>
<tr><td>クラスタリング</td><td>テキストの類似性に基づいてクラスタリングするように最適化された埋め込みを生成するために使用されます。</td></tr>
<tr><td>RETRIEVAL_DOCUMENT、RETRIEVAL_QUERY、QUESTION_ANSWERING、FACT_VERIFICATION</td><td>文書検索や情報検索のために最適化された埋め込みを生成するために使用します。</td></tr>
<tr><td>コード検索クエリ</td><td>配列のソートやリンクリストの逆引きなど、自然言語によるクエリに基づいてコードブロックを検索するために使用します。コードブロックの埋め込みはRETRIEVAL_DOCUMENTを使って計算される。</td></tr>
</tbody>
</table>
<p>ドキュメントの埋め込みを作成するには、<strong>encode_documents()</strong>メソッドを使用します：</p>
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
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.00894029,  0.00573813,  0.013351  , ..., -0.00042766,
       -0.00603091, -0.00341043], shape=(3072,)), array([ 0.00222347,  0.03725113,  0.01152256, ...,  0.01047272,
       -0.01701597,  0.00565377], shape=(3072,)), array([ 0.00661134,  0.00232328, -0.01342973, ..., -0.00514429,
       -0.02374139, -0.00701721], shape=(3072,))]
Dim: 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
<p>クエリの埋め込みを作成するには<strong>encode_queries()</strong>メソッドを使用します：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は以下のようなものです：</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.02066572,  0.02459551,  0.00707774, ...,  0.00259341,
       -0.01797572, -0.00626168], shape=(3072,)), array([ 0.00674969,  0.03023903,  0.01230692, ...,  0.00160009,
       -0.01710967,  0.00972728], shape=(3072,))]
Dim 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
