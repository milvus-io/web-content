---
id: embed-with-jina.md
order: 8
summary: >-
  이 문서에서는 JinaEmbeddingFunction을 사용하여 Jina AI 임베딩 모델을 사용하여 문서와 쿼리를 인코딩하는 방법을
  설명합니다.
title: Jina AI - 임베드
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
    </button></h1><p>Jina AI의 임베딩 모델은 텍스트 입력을 숫자 표현으로 변환하여 텍스트의 의미를 파악할 수 있는 고성능 텍스트 임베딩 모델입니다. 이러한 모델은 고밀도 검색, 의미론적 텍스트 유사성, 다국어 이해와 같은 애플리케이션에서 탁월한 성능을 발휘합니다.</p>
<p>Milvus는 <code translate="no">JinaEmbeddingFunction</code> 클래스를 통해 Jina AI의 임베딩 모델과 통합됩니다. 이 클래스는 Jina AI 임베딩 모델을 사용하여 문서와 쿼리를 인코딩하고 임베딩을 Milvus 인덱싱과 호환되는 고밀도 벡터로 반환하는 메서드를 제공합니다. 이 기능을 활용하려면 <a href="https://jina.ai/embeddings/">Jina AI에서</a> API 키를 받으세요.</p>
<p>이 기능을 사용하려면 필요한 종속성을 설치하세요:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <code translate="no">JinaEmbeddingFunction</code> 을 인스턴스화합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINAAI_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>, <span class="hljs-comment"># Specify the task</span>
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수</strong></p>
<ul>
<li><p><code translate="no">model_name</code> <em>(문자열</em>)</p>
<p>인코딩에 사용할 Jina AI 임베딩 모델의 이름입니다. 예를 들어 <code translate="no">jina-embeddings-v3</code>, <code translate="no">jina-embeddings-v2-base-en</code> 등과 같이 사용 가능한 Jina AI 임베딩 모델 이름 중 하나를 지정할 수 있습니다. 이 파라미터를 지정하지 않으면 <code translate="no">jina-embeddings-v3</code> 이 사용됩니다. 사용 가능한 모델 목록은 <a href="https://jina.ai/embeddings">Jina 임베딩을</a> 참조하세요.</p></li>
<li><p><code translate="no">api_key</code> <em>(문자열</em>)</p>
<p>Jina AI API에 액세스하기 위한 API 키입니다.</p></li>
<li><p><code translate="no">task</code> <em>(문자열</em>)</p>
<p>모델에 전달된 입력 유형입니다. 임베딩 모델 v3 이상에 필요합니다.</p>
<ul>
<li><code translate="no">&quot;retrieval.passage&quot;</code>: 인덱싱 시 검색 작업에서 대용량 문서를 인코딩하는 데 사용됩니다.</li>
<li><code translate="no">&quot;retrieval.query&quot;</code>: 검색 작업에서 사용자 쿼리 또는 질문을 인코딩하는 데 사용됩니다.</li>
<li><code translate="no">&quot;classification&quot;</code>: 텍스트 분류 작업에서 텍스트를 인코딩하는 데 사용됩니다.</li>
<li><code translate="no">&quot;text-matching&quot;</code>: 두 문장 간의 유사도 측정과 같은 유사도 매칭을 위해 텍스트를 인코딩하는 데 사용됩니다.</li>
<li><code translate="no">&quot;clustering&quot;</code>: 클러스터링 또는 재순위 지정 작업에 사용됩니다.</li>
</ul></li>
<li><p><code translate="no">dimensions</code> <em>(int</em>)</p>
<p>결과 출력 임베딩이 가져야 하는 차원 수입니다. 기본값은 1024입니다. 임베딩 모델 v3 이상에서만 지원됩니다.</p></li>
<li><p><code translate="no">late_chunking</code> <em>(bool</em>)</p>
<p>이 매개변수는 <a href="https://arxiv.org/abs/2409.04701">지난 달에 도입된</a> 새로운 청킹 방법인 <a href="https://arxiv.org/abs/2409.04701">Jina AI를</a> 문장 일괄 인코딩에 사용할지 여부를 제어합니다. 기본값은 <code translate="no">False</code> 입니다. <code translate="no">True</code> 으로 설정하면 Jina AI API가 입력 필드에 있는 모든 문장을 연결하여 단일 문자열로 모델에 공급합니다. 내부적으로 모델은 이 긴 연결 문자열을 임베딩한 다음 후기 청킹을 수행하여 입력 목록의 크기와 일치하는 임베딩 목록을 반환합니다.</p></li>
</ul>
<p>문서에 대한 임베딩을 만들려면 <code translate="no">encode_documents()</code> 메서드를 사용합니다. 이 방법은 검색 또는 추천 작업을 위한 문서 색인화와 같은 비대칭 검색 작업에서 문서 임베딩을 위해 설계되었습니다. 이 방법은 <code translate="no">retrieval.passage</code> 을 작업으로 사용합니다.</p>
<pre><code translate="no" class="language-python:">
```python
docs = [
    &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;,
    &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;,
    &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;,
]

docs_embeddings = jina_ef.encode_documents(docs)

# Print embeddings
print(&quot;Embeddings:&quot;, docs_embeddings)
# Print dimension and shape of embeddings
print(&quot;Dim:&quot;, jina_ef.dim, docs_embeddings[0].shape)
</code></pre>
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">9.80641991e-02</span>, -<span class="hljs-number">8.51697400e-02</span>,  <span class="hljs-number">7.36531913e-02</span>,  <span class="hljs-number">1.42558888e-02</span>,
       -<span class="hljs-number">2.23589484e-02</span>,  <span class="hljs-number">1.68494112e-03</span>, -<span class="hljs-number">3.50753777e-02</span>, -<span class="hljs-number">3.11530549e-02</span>,
       -<span class="hljs-number">3.26012149e-02</span>,  <span class="hljs-number">5.04568312e-03</span>,  <span class="hljs-number">3.69836427e-02</span>,  <span class="hljs-number">3.48948985e-02</span>,
        <span class="hljs-number">8.19722563e-03</span>,  <span class="hljs-number">5.88679723e-02</span>, -<span class="hljs-number">6.71099266e-03</span>, -<span class="hljs-number">1.82369724e-02</span>,
...
        <span class="hljs-number">2.48654783e-02</span>,  <span class="hljs-number">3.43279652e-02</span>, -<span class="hljs-number">1.66154150e-02</span>, -<span class="hljs-number">9.90478322e-03</span>,
       -<span class="hljs-number">2.96043139e-03</span>, -<span class="hljs-number">8.57473817e-03</span>, -<span class="hljs-number">7.39028037e-04</span>,  <span class="hljs-number">6.25024503e-03</span>,
       -<span class="hljs-number">1.08831357e-02</span>, -<span class="hljs-number">4.00776342e-02</span>,  <span class="hljs-number">3.25369164e-02</span>, -<span class="hljs-number">1.42691191e-03</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리용 임베딩을 만들려면 <code translate="no">encode_queries()</code> 메서드를 사용합니다. 이 방법은 검색 쿼리 또는 질문과 같은 비대칭 검색 작업의 쿼리 임베딩을 위해 설계되었습니다. 이 방법은 <code translate="no">retrieval.query</code> 을 작업으로 사용합니다.</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">8.79201014e-03</span>,  <span class="hljs-number">1.47551354e-02</span>,  <span class="hljs-number">4.02722731e-02</span>, -<span class="hljs-number">2.52991207e-02</span>,
        <span class="hljs-number">1.12719582e-02</span>,  <span class="hljs-number">3.75947170e-02</span>,  <span class="hljs-number">3.97946090e-02</span>, -<span class="hljs-number">7.36681819e-02</span>,
       -<span class="hljs-number">2.17952449e-02</span>, -<span class="hljs-number">1.16298944e-02</span>, -<span class="hljs-number">6.83426252e-03</span>, -<span class="hljs-number">5.12507409e-02</span>,
        <span class="hljs-number">5.26071340e-02</span>,  <span class="hljs-number">6.75181448e-02</span>,  <span class="hljs-number">3.92445624e-02</span>, -<span class="hljs-number">1.40817231e-02</span>,
...
        <span class="hljs-number">8.81703943e-03</span>,  <span class="hljs-number">4.24629413e-02</span>, -<span class="hljs-number">2.32944116e-02</span>, -<span class="hljs-number">2.05193572e-02</span>,
       -<span class="hljs-number">3.22035812e-02</span>,  <span class="hljs-number">2.81896023e-03</span>,  <span class="hljs-number">3.85326855e-02</span>,  <span class="hljs-number">3.64372656e-02</span>,
       -<span class="hljs-number">1.65050142e-02</span>, -<span class="hljs-number">4.26847413e-02</span>,  <span class="hljs-number">2.02664156e-02</span>, -<span class="hljs-number">1.72684863e-02</span>])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>유사도 매칭(예: STS 또는 대칭 검색 작업), 텍스트 분류, 클러스터링 또는 순위 재조정 작업에 대한 입력의 임베딩을 만들려면 <code translate="no">JinaEmbeddingFunction</code> 클래스를 인스턴스화할 때 적절한 <code translate="no">task</code> 매개 변수 값을 사용하세요.</p>
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
