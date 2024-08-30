---
id: rerankers-cohere.md
order: 3
summary: >-
  Milvus supports Cohere reranker models through the `CohereRerankFunction`
  class. This functionality allows you to score the relevance of query-document
  pairs effectively.
title: Rerankers Cohere
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
    </button></h1><p>Milvus supports <a href="https://docs.cohere.com/docs/rerank-2">Cohere</a><a href="https://docs.cohere.com/docs/rerank-2"> reranker models</a> through the <code translate="no">CohereRerankFunction</code> class. This functionality allows you to score the relevance of query-document pairs effectively.</p>
<p>To use this feature, install the necessary dependencies:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then, instantiate the <code translate="no">CohereRerankFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> CohereRerankFunction

<span class="hljs-comment"># Define the rerank function</span>
cohere_rf = CohereRerankFunction(
    model_name=<span class="hljs-string">&quot;rerank-english-v3.0&quot;</span>,  <span class="hljs-comment"># Specify the model name. Defaults to `rerank-english-v2.0`.</span>
    api_key=COHERE_API_KEY <span class="hljs-comment"># Replace with your Cohere API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parameters</strong></p>
<ul>
<li><p><code translate="no">model_name</code> (<em>string</em>)</p>
<p>The name of the model to use. You can specify any of the available Cohere reranker model names, for example, <code translate="no">rerank-english-v3.0</code>, <code translate="no">rerank-multilingual-v3.0</code>, etc. If you leave this parameter unspecified, <code translate="no">rerank-english-v2.0</code> will be used. For a list of available models, refer to <a href="https://docs.cohere.com/docs/rerank-2">Rerank</a>.</p></li>
<li><p><code translate="no">api_key</code> (<em>string</em>)</p>
<p>The API key for accessing the Cohere API. For information on how to create an API key, refer to <a href="https://dashboard.cohere.com/api-keys">Cohere dashboard</a>.</p></li>
</ul>
<p>Then, use the following code to rerank documents based on the query:</p>
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
<p>The expected output is similar to the following:</p>
<pre><code translate="no" class="language-python">Index: <span class="hljs-number">1</span>
Score: <span class="hljs-number">0.99691266</span>
Text: The Dartmouth Conference <span class="hljs-keyword">in</span> <span class="hljs-number">1956</span> <span class="hljs-keyword">is</span> considered the birthplace of artificial intelligence <span class="hljs-keyword">as</span> a field; here, John McCarthy <span class="hljs-keyword">and</span> others coined the term <span class="hljs-string">&#x27;artificial intelligence&#x27;</span> <span class="hljs-keyword">and</span> laid <span class="hljs-keyword">out</span> its basic goals.

Index: <span class="hljs-number">3</span>
Score: <span class="hljs-number">0.8578872</span>
Text: The invention of the Logic Theorist <span class="hljs-keyword">by</span> Allen Newell, Herbert A. Simon, <span class="hljs-keyword">and</span> Cliff Shaw <span class="hljs-keyword">in</span> <span class="hljs-number">1955</span> marked the creation of the first <span class="hljs-literal">true</span> AI program, which was capable of solving logic problems, akin to proving mathematical theorems.

Index: <span class="hljs-number">0</span>
Score: <span class="hljs-number">0.3589146</span>
Text: In <span class="hljs-number">1950</span>, Alan Turing published his seminal paper, <span class="hljs-string">&#x27;Computing Machinery and Intelligence,&#x27;</span> proposing the Turing Test <span class="hljs-keyword">as</span> a criterion of intelligence, a foundational concept <span class="hljs-keyword">in</span> the philosophy <span class="hljs-keyword">and</span> development of artificial intelligence.
<button class="copy-code-btn"></button></code></pre>
