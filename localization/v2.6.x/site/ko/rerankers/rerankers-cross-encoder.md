---
id: rerankers-cross-encoder.md
order: 4
summary: >-
  밀버스는 `CrossEncoderRerankFunction` 클래스를 통해 크로스 인코더 재랭크 모델을 지원합니다. 이 기능을 사용하면
  쿼리-문서 쌍의 관련성을 효과적으로 점수화할 수 있습니다.
title: 크로스 인코더
---
<h1 id="Cross-Encoder" class="common-anchor-header">크로스 인코더<button data-href="#Cross-Encoder" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 <code translate="no">CrossEncoderRerankFunction</code> 클래스를 통해 <a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/reranker">크로스 인코더를</a> 지원합니다. 이 기능을 사용하면 쿼리-문서 쌍의 관련성을 효과적으로 점수화할 수 있습니다.</p>
<p>이 기능을 사용하려면 필요한 종속성을 설치하세요:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <code translate="no">CrossEncoderRerankFunction</code> 을 인스턴스화합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> CrossEncoderRerankFunction

<span class="hljs-comment"># Define the rerank function</span>
ce_rf = CrossEncoderRerankFunction(
    model_name=<span class="hljs-string">&quot;cross-encoder/ms-marco-MiniLM-L-6-v2&quot;</span>,  <span class="hljs-comment"># Specify the model name.</span>
    device=<span class="hljs-string">&quot;cpu&quot;</span> <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수</strong></p>
<ul>
<li><p><code translate="no">model_name</code> <em>(문자열</em>)</p>
<p>사용할 모델의 이름입니다. 사용 가능한 크로스 인코더 모델 이름(예: <code translate="no">cross-encoder/ms-marco-TinyBERT-L-2-v2</code>, <code translate="no">cross-encoder/ms-marco-MiniLM-L-2-v2</code> 등)을 지정할 수 있습니다. 이 매개변수를 지정하지 않으면 빈 문자열이 사용됩니다. 사용 가능한 모델 목록은 <a href="https://www.sbert.net/docs/pretrained_cross-encoders.html#">사전 학습된 크로스 인코더를</a> 참조하세요.</p></li>
<li><p><code translate="no">device</code> <em>(문자열</em>)</p>
<p>모델을 실행하는 데 사용할 장치입니다. CPU에는 <code translate="no">cpu</code>, n번째 GPU 장치에는 <code translate="no">cuda:n</code> 을 지정할 수 있습니다.</p></li>
</ul>
<p>그런 다음 다음 코드를 사용하여 쿼리를 기반으로 문서의 순위를 다시 매깁니다:</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>
]

results = ce_rf(
    query=query,
    documents=documents,
    top_k=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Index: <span class="hljs-subst">{result.index}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Score: <span class="hljs-subst">{result.score:<span class="hljs-number">.6</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{result.text}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">Index: <span class="hljs-number">1</span>
Score: <span class="hljs-number">6.250533</span>
Text: The Dartmouth Conference <span class="hljs-keyword">in</span> <span class="hljs-number">1956</span> <span class="hljs-keyword">is</span> considered the birthplace of artificial intelligence <span class="hljs-keyword">as</span> a field; here, John McCarthy <span class="hljs-keyword">and</span> others coined the term <span class="hljs-string">&#x27;artificial intelligence&#x27;</span> <span class="hljs-keyword">and</span> laid out its basic goals.

Index: <span class="hljs-number">0</span>
Score: -<span class="hljs-number">2.954602</span>
Text: In <span class="hljs-number">1950</span>, Alan Turing published his seminal paper, <span class="hljs-string">&#x27;Computing Machinery and Intelligence,&#x27;</span> proposing the Turing Test <span class="hljs-keyword">as</span> a criterion of intelligence, a foundational concept <span class="hljs-keyword">in</span> the philosophy <span class="hljs-keyword">and</span> development of artificial intelligence.

Index: <span class="hljs-number">3</span>
Score: -<span class="hljs-number">4.771512</span>
Text: The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, <span class="hljs-keyword">and</span> Cliff Shaw <span class="hljs-keyword">in</span> <span class="hljs-number">1955</span> marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
<button class="copy-code-btn"></button></code></pre>
