---
id: embed-with-cohere.md
order: 9
summary: 이 문서에서는 코히어 임베딩 함수를 사용하여 코히어 임베딩 모델을 사용하여 문서와 쿼리를 인코딩하는 방법을 설명합니다.
title: Cohere 포함
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
    </button></h1><p>Cohere의 임베딩 모델은 텍스트에 대한 의미적 정보를 캡처하는 부동 소수점 숫자 목록인 텍스트 임베딩을 생성하는 데 사용됩니다. 이러한 임베딩은 텍스트 분류 및 의미론적 검색과 같은 작업에 사용할 수 있습니다.</p>
<p>Milvus는 <code translate="no">CohereEmbeddingFunction</code> 클래스를 사용하여 Cohere의 임베딩 모델과 통합됩니다. 이 클래스는 임베딩 계산을 처리하고 인덱싱 및 검색을 위해 Milvus와 호환되는 형식으로 임베딩을 반환합니다.</p>
<p>이 기능을 사용하려면 필요한 종속성을 설치하세요:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <code translate="no">CohereEmbeddingFunction</code> 을 인스턴스화합니다:</p>
<pre><code translate="no" class="language-python">cohere_ef = <span class="hljs-title class_">CohereEmbeddingFunction</span>(
    model_name=<span class="hljs-string">&quot;embed-english-light-v3.0&quot;</span>,
    api_key=<span class="hljs-string">&quot;YOUR_COHERE_API_KEY&quot;</span>,
    input_type=<span class="hljs-string">&quot;search_document&quot;</span>,
    embedding_types=[<span class="hljs-string">&quot;float&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수</strong></p>
<ul>
<li><p><code translate="no">model_name</code> <em>(문자열</em>)</p>
<p>인코딩에 사용할 Cohere 임베딩 모델의 이름입니다. 예를 들어 <code translate="no">embed-english-v3.0</code>, <code translate="no">embed-multilingual-v3.0</code> 등과 같이 사용 가능한 Cohere 임베딩 모델 이름을 지정할 수 있습니다. 이 매개변수를 지정하지 않으면 <code translate="no">embed-english-light-v3.0</code> 이 사용됩니다. 사용 가능한 모델 목록은 <a href="https://docs.cohere.com/docs/models#embed">임베드를</a> 참조하세요.</p></li>
<li><p><code translate="no">api_key</code> <em>(문자열</em>)</p>
<p>Cohere API에 액세스하기 위한 API 키입니다.</p></li>
<li><p><code translate="no">input_type</code> <em>(문자열</em>)</p>
<p>모델에 전달된 입력 유형입니다. 모델 v3 이상 임베드에 필요합니다.</p>
<ul>
<li><code translate="no">&quot;search_document&quot;</code>: 검색 사용 사례를 위해 벡터 데이터베이스에 저장된 임베딩에 사용됩니다.</li>
<li><code translate="no">&quot;search_query&quot;</code>: 관련 문서를 찾기 위해 벡터 DB에 대해 실행되는 검색 쿼리의 임베딩에 사용됩니다.</li>
<li><code translate="no">&quot;classification&quot;</code>: 텍스트 분류기를 통과한 임베딩에 사용됩니다.</li>
<li><code translate="no">&quot;clustering&quot;</code>: 클러스터링 알고리즘을 통해 실행되는 임베딩에 사용됩니다.</li>
</ul></li>
<li><p><code translate="no">embedding_types</code> <em>(List[str]</em>)</p>
<p>반환하려는 임베딩 유형입니다. 필수는 아니며 기본값은 없음으로, 임베드 플로트 응답 유형을 반환합니다. 현재 이 매개변수에는 하나의 값만 지정할 수 있습니다. 가능한 값</p>
<ul>
<li><code translate="no">&quot;float&quot;</code>: 기본 플로트 임베딩을 반환하려는 경우 이 값을 사용합니다. 모든 모델에 유효합니다.</li>
<li><code translate="no">&quot;binary&quot;</code>: 서명된 바이너리 임베딩을 반환할 때 사용합니다. v3 모델에만 유효합니다.</li>
<li><code translate="no">&quot;ubinary&quot;</code>: 서명되지 않은 바이너리 임베딩을 반환할 때 사용합니다. v3 모델에만 유효합니다.</li>
</ul></li>
</ul>
<p>문서용 임베딩을 만들려면 <code translate="no">encode_documents()</code> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = cohere_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, cohere_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">3.43322754e-02</span>,  <span class="hljs-number">1.16252899e-03</span>, <span class="hljs-number">-5.25207520e-02</span>,  <span class="hljs-number">1.32846832e-03</span>,
       <span class="hljs-number">-6.80541992e-02</span>,  <span class="hljs-number">6.10961914e-02</span>, <span class="hljs-number">-7.06176758e-02</span>,  <span class="hljs-number">1.48925781e-01</span>,
        <span class="hljs-number">1.54174805e-01</span>,  <span class="hljs-number">1.98516846e-02</span>,  <span class="hljs-number">2.43835449e-02</span>,  <span class="hljs-number">3.55224609e-02</span>,
        <span class="hljs-number">1.82952881e-02</span>,  <span class="hljs-number">7.57446289e-02</span>, <span class="hljs-number">-2.40783691e-02</span>,  <span class="hljs-number">4.40063477e-02</span>,
...
        <span class="hljs-number">0.06359863</span>, <span class="hljs-number">-0.01971436</span>, <span class="hljs-number">-0.02253723</span>,  <span class="hljs-number">0.00354195</span>,  <span class="hljs-number">0.00222015</span>,
        <span class="hljs-number">0.00184727</span>,  <span class="hljs-number">0.03408813</span>, <span class="hljs-number">-0.00777817</span>,  <span class="hljs-number">0.04919434</span>,  <span class="hljs-number">0.01519775</span>,
       <span class="hljs-number">-0.02862549</span>,  <span class="hljs-number">0.04760742</span>, <span class="hljs-number">-0.07891846</span>,  <span class="hljs-number">0.0124054</span> ], dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리용 임베딩을 만들려면 <code translate="no">encode_queries()</code> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = cohere_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, cohere_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-1.33361816e-02</span>,  <span class="hljs-number">9.79423523e-04</span>, <span class="hljs-number">-7.28759766e-02</span>, <span class="hljs-number">-1.93786621e-02</span>,
       <span class="hljs-number">-9.71679688e-02</span>,  <span class="hljs-number">4.34875488e-02</span>, <span class="hljs-number">-9.81445312e-02</span>,  <span class="hljs-number">1.16882324e-01</span>,
        <span class="hljs-number">5.89904785e-02</span>, <span class="hljs-number">-4.19921875e-02</span>,  <span class="hljs-number">4.95910645e-02</span>,  <span class="hljs-number">5.83496094e-02</span>,
        <span class="hljs-number">3.47595215e-02</span>, <span class="hljs-number">-5.87463379e-03</span>, <span class="hljs-number">-7.30514526e-03</span>,  <span class="hljs-number">2.92816162e-02</span>,
...
        <span class="hljs-number">0.00749969</span>, <span class="hljs-number">-0.01192474</span>,  <span class="hljs-number">0.02719116</span>,  <span class="hljs-number">0.03347778</span>,  <span class="hljs-number">0.07696533</span>,
        <span class="hljs-number">0.01409149</span>,  <span class="hljs-number">0.00964355</span>, <span class="hljs-number">-0.01681519</span>, <span class="hljs-number">-0.0073204</span> ,  <span class="hljs-number">0.00043154</span>,
       <span class="hljs-number">-0.04577637</span>,  <span class="hljs-number">0.03591919</span>, <span class="hljs-number">-0.02807617</span>, <span class="hljs-number">-0.04812622</span>], dtype=<span class="hljs-type">float32</span>)]
Dim <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
