---
id: embed-with-gemini.md
order: 2
summary: Milvus는 GeminiEmbeddingFunction 클래스를 통해 OpenAI의 모델과 통합됩니다.
title: Gemini
---
<h1 id="Gemini" class="common-anchor-header">Gemini<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 <strong>GeminiEmbeddingFunction</strong> 클래스를 통해 Gemini의 모델과 통합됩니다. 이 클래스는 사전 학습된 Gemini 모델을 사용하여 문서와 쿼리를 인코딩하고 임베딩을 Milvus 인덱싱과 호환되는 고밀도 벡터로 반환하는 메서드를 제공합니다. 이 기능을 사용하려면 플랫폼에서 계정을 생성하여 <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini로부터</a> API 키를 받습니다.</p>
<p>이 기능을 사용하려면 필요한 종속성을 설치하세요:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <strong>GeminiEmbeddingFunction을</strong> 인스턴스화합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수를</strong> 인스턴스화합니다:</p>
<ul>
<li><p><strong>model_name</strong><em>(문자열</em>)</p>
<p>인코딩에 사용할 Gemini 모델의 이름입니다. 유효한 옵션은 <strong>gemini-embedding-exp-03-07</strong>(기본값), <strong>models/embedding-001</strong>, <strong>models/text-embedding-004입니다</strong>.</p></li>
<li><p><strong>api_key</strong><em>(문자열</em>)</p>
<p>Gemini API에 액세스하기 위한 API 키입니다.</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) 임베딩 모델에 대한 선택적 구성.</p>
<ul>
<li><strong>출력_차원성은</strong> 결과 출력 임베딩의 수로 지정할 수 있습니다.</li>
<li><strong>task_type을</strong> 지정하면 특정 작업에 최적화된 임베딩을 생성하여 시간과 비용을 절약하고 성능을 향상시킬 수 있습니다. <strong>gemini-embedding-exp-03-07</strong> 모델에서만 지원됩니다.</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>모델 이름</th><th>치수</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>models/embedding-001</td><td>768</td></tr>
<tr><td>models/text-embedding-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>작업 유형</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>시맨틱_유사성</td><td>텍스트 유사성을 평가하기 위해 최적화된 임베딩을 생성하는 데 사용됩니다.</td></tr>
<tr><td>분류</td><td>사전 설정된 레이블에 따라 텍스트를 분류하는 데 최적화된 임베딩을 생성하는 데 사용됩니다.</td></tr>
<tr><td>클러스터링</td><td>유사도에 따라 텍스트를 클러스터링하도록 최적화된 임베딩을 생성하는 데 사용됩니다.</td></tr>
<tr><td>재검토_문서, 재검토_질의, 질문_응답, 사실_확인</td><td>문서 검색 또는 정보 검색에 최적화된 임베딩을 생성하는 데 사용됩니다.</td></tr>
<tr><td>코드 검색 쿼리</td><td>배열 정렬 또는 링크된 목록 반전 등 자연어 쿼리를 기반으로 코드 블록을 검색하는 데 사용됩니다. 코드 블록의 임베딩은 RETRIEVAL_DOCUMENT를 사용하여 계산됩니다.</td></tr>
</tbody>
</table>
<p>문서에 대한 임베딩을 만들려면 <strong>encode_documents()</strong> 메서드를 사용합니다:</p>
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
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.00894029</span>,  <span class="hljs-number">0.00573813</span>,  <span class="hljs-number">0.013351</span>  , ..., -<span class="hljs-number">0.00042766</span>,
       -<span class="hljs-number">0.00603091</span>, -<span class="hljs-number">0.00341043</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00222347</span>,  <span class="hljs-number">0.03725113</span>,  <span class="hljs-number">0.01152256</span>, ...,  <span class="hljs-number">0.01047272</span>,
       -<span class="hljs-number">0.01701597</span>,  <span class="hljs-number">0.00565377</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00661134</span>,  <span class="hljs-number">0.00232328</span>, -<span class="hljs-number">0.01342973</span>, ..., -<span class="hljs-number">0.00514429</span>,
       -<span class="hljs-number">0.02374139</span>, -<span class="hljs-number">0.00701721</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim: <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리용 임베딩을 만들려면 <strong>encode_queries()</strong> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.02066572</span>,  <span class="hljs-number">0.02459551</span>,  <span class="hljs-number">0.00707774</span>, ...,  <span class="hljs-number">0.00259341</span>,
       -<span class="hljs-number">0.01797572</span>, -<span class="hljs-number">0.00626168</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00674969</span>,  <span class="hljs-number">0.03023903</span>,  <span class="hljs-number">0.01230692</span>, ...,  <span class="hljs-number">0.00160009</span>,
       -<span class="hljs-number">0.01710967</span>,  <span class="hljs-number">0.00972728</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
