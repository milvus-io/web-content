---
id: embed-with-mistral-ai.md
order: 11
summary: >-
  이 문서에서는 미스트랄 AI 임베딩 모델을 사용하여 문서와 쿼리를 인코딩하기 위해 MistralAIEmbeddingFunction을 사용하는
  방법을 설명합니다.
title: 미스트랄 AI
---
<h1 id="Mistral-AI" class="common-anchor-header">미스트랄 AI<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://mistral.ai/">Mistral AI의</a> 임베딩 모델은 텍스트 입력을 조밀한 숫자 벡터로 변환하여 텍스트의 기본 의미를 효과적으로 포착하도록 설계된 텍스트 임베딩 모델입니다. 이 모델은 시맨틱 검색, 자연어 이해, 문맥 인식 애플리케이션과 같은 작업에 고도로 최적화되어 있어 다양한 AI 기반 솔루션에 적합합니다.</p>
<p>Milvus는 MistralAIEmbeddingFunction 클래스를 통해 Mistral AI의 임베딩 모델과 통합됩니다. 이 클래스는 Mistral AI 임베딩 모델을 사용하여 문서와 쿼리를 인코딩하고 임베딩을 Milvus 인덱싱과 호환되는 고밀도 벡터로 반환하는 메서드를 제공합니다. 이 기능을 활용하려면 <a href="https://console.mistral.ai/">Mistral AI에서</a> API 키를 받으세요.</p>
<p>이 기능을 사용하려면 필요한 종속성을 설치하세요:</p>
<pre><code translate="no" class="language-python">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 MistralAIEmbeddingFunction을 인스턴스화합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> MistralAIEmbeddingFunction

ef = MistralAIEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>, <span class="hljs-comment"># Defaults to `mistral-embed`</span>
    api_key=<span class="hljs-string">&quot;MISTRAL_API_KEY&quot;</span> <span class="hljs-comment"># Provide your Mistral AI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수</strong></p>
<ul>
<li><p><code translate="no">model_name</code> <em>(문자열</em>)</p>
<p>인코딩에 사용할 미스트랄 AI 임베딩 모델의 이름입니다. 기본값은 <code translate="no">mistral-embed</code> 입니다. 자세한 내용은 <a href="https://docs.mistral.ai/capabilities/embeddings/">임베딩을</a> 참조하세요.</p></li>
<li><p><code translate="no">api_key</code> <em>(문자열</em>)</p>
<p>Mistral AI API에 액세스하기 위한 API 키입니다.</p></li>
</ul>
<p>문서용 임베딩을 만들려면 <code translate="no">encode_documents()</code> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.06051636</span>, <span class="hljs-number">0.03207397</span>, <span class="hljs-number">0.04684448</span>, ..., -<span class="hljs-number">0.01618958</span>,
       <span class="hljs-number">0.02442932</span>, -<span class="hljs-number">0.01302338</span>]), array([-<span class="hljs-number">0.04675293</span>, <span class="hljs-number">0.06512451</span>, <span class="hljs-number">0.04290771</span>, ..., -<span class="hljs-number">0.01454926</span>,
       <span class="hljs-number">0.0014801</span> , <span class="hljs-number">0.00686646</span>]), array([-<span class="hljs-number">0.05978394</span>, <span class="hljs-number">0.08728027</span>, <span class="hljs-number">0.02217102</span>, ..., -<span class="hljs-number">0.00681305</span>,
       <span class="hljs-number">0.03634644</span>, -<span class="hljs-number">0.01802063</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리에 대한 임베딩을 만들려면 <code translate="no">encode_queries()</code> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>,
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.04916382</span>, <span class="hljs-number">0.04568481</span>, <span class="hljs-number">0.03594971</span>, ..., -<span class="hljs-number">0.02653503</span>,
       <span class="hljs-number">0.02804565</span>, <span class="hljs-number">0.00600815</span>]), array([-<span class="hljs-number">0.05938721</span>, <span class="hljs-number">0.07098389</span>, <span class="hljs-number">0.01773071</span>, ..., -<span class="hljs-number">0.01708984</span>,
       <span class="hljs-number">0.03582764</span>, <span class="hljs-number">0.00366592</span>])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
