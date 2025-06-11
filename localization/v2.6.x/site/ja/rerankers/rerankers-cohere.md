---
id: rerankers-cohere.md
order: 3
summary: >-
  Milvusは `CohereRerankFunction`
  クラスを通してCohereリランカーモデルをサポートしています。この機能により、クエリとドキュメントのペアの関連性を効果的にスコアリングすることができる。
title: リランカーズ・コヒーレ
---
<h1 id="Cohere" class="common-anchor-header">Cohere<button data-href="#Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは<code translate="no">CohereRerankFunction</code> クラスを通して<a href="https://docs.cohere.com/docs/rerank-2">Cohere</a><a href="https://docs.cohere.com/docs/rerank-2"> リランカーモデルを</a>サポートしています。この機能により、クエリとドキュメントのペアの関連性を効果的にスコアリングすることができます。</p>
<p>この機能を使用するには、必要な依存関係をインストールします：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>そして、<code translate="no">CohereRerankFunction</code> をインスタンス化してください：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> CohereRerankFunction

<span class="hljs-comment"># Define the rerank function</span>
cohere_rf = CohereRerankFunction(
    model_name=<span class="hljs-string">&quot;rerank-english-v3.0&quot;</span>,  <span class="hljs-comment"># Specify the model name. Defaults to `rerank-english-v2.0`.</span>
    api_key=COHERE_API_KEY <span class="hljs-comment"># Replace with your Cohere API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>パラメータ</strong></p>
<ul>
<li><p><code translate="no">model_name</code> <em>(文字列</em>)</p>
<p>使用するモデルの名前。例えば、<code translate="no">rerank-english-v3.0</code> 、<code translate="no">rerank-multilingual-v3.0</code> など。このパラメータを指定しない場合、<code translate="no">rerank-english-v2.0</code> が使用されます。利用可能なモデルの一覧は、<a href="https://docs.cohere.com/docs/rerank-2">Rerank</a> を参照してください。</p></li>
<li><p><code translate="no">api_key</code> <em>(文字列</em>)</p>
<p>Cohere API にアクセスするための API キー。API キーの作成方法については、<a href="https://dashboard.cohere.com/api-keys">Cohere ダッシュボードを</a>参照してください。</p></li>
</ul>
<p>次に、以下のコードを使用して、クエリに基づいてドキュメントをランク付けします：</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>
]

results = cohere_rf(
    query=query,
    documents=documents,
    top_k=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Index: <span class="hljs-subst">{result.index}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Score: <span class="hljs-subst">{result.score:<span class="hljs-number">.6</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{result.text}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>期待される出力は以下のようになります：</p>
<pre><code translate="no" class="language-python">Index: <span class="hljs-number">1</span>
Score: <span class="hljs-number">0.99691266</span>
Text: The Dartmouth Conference <span class="hljs-keyword">in</span> <span class="hljs-number">1956</span> <span class="hljs-keyword">is</span> considered the birthplace of artificial intelligence <span class="hljs-keyword">as</span> a field; here, John McCarthy <span class="hljs-keyword">and</span> others coined the term <span class="hljs-string">&#x27;artificial intelligence&#x27;</span> <span class="hljs-keyword">and</span> laid out its basic goals.

Index: <span class="hljs-number">3</span>
Score: <span class="hljs-number">0.8578872</span>
Text: The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, <span class="hljs-keyword">and</span> Cliff Shaw <span class="hljs-keyword">in</span> <span class="hljs-number">1955</span> marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.

Index: <span class="hljs-number">0</span>
Score: <span class="hljs-number">0.3589146</span>
Text: In <span class="hljs-number">1950</span>, Alan Turing published his seminal paper, <span class="hljs-string">&#x27;Computing Machinery and Intelligence,&#x27;</span> proposing the Turing Test <span class="hljs-keyword">as</span> a criterion of intelligence, a foundational concept <span class="hljs-keyword">in</span> the philosophy <span class="hljs-keyword">and</span> development of artificial intelligence.
<button class="copy-code-btn"></button></code></pre>
