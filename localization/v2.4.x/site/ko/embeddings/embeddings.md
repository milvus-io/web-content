---
id: embeddings.md
order: 1
summary: 데이터 임베딩을 생성하는 방법을 알아보세요.
title: 임베딩 개요
---
<h1 id="Embedding-Overview" class="common-anchor-header">임베딩 개요<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>임베딩은 비슷한 의미의 데이터를 서로 가깝게 배치해 데이터를 고차원 공간에 매핑하는 머신 러닝 개념입니다. 일반적으로 BERT 또는 다른 Transformer 제품군의 심층 신경망인 임베딩 모델은 텍스트, 이미지 및 기타 데이터 유형의 의미를 벡터로 알려진 일련의 숫자로 효과적으로 나타낼 수 있습니다. 이 모델의 주요 특징은 고차원 공간에서 벡터 사이의 수학적 거리가 원본 텍스트나 이미지의 의미론적 유사성을 나타낼 수 있다는 것입니다. 이 속성은 Google이나 Bing과 같은 웹 검색 엔진, 이커머스 사이트의 제품 검색 및 추천, 그리고 최근 인기를 끌고 있는 제너레이티브 AI의 검색 증강 생성(RAG) 패러다임 등 다양한 정보 검색 애플리케이션에 활용되고 있습니다.</p>
<p>임베딩에는 크게 두 가지 범주가 있으며, 각각 다른 유형의 벡터를 생성합니다:</p>
<ul>
<li><p><strong>고밀도 임베딩</strong>: 대부분의 임베딩 모델은 정보를 수백에서 수천 차원의 부동 소수점 벡터로 표현합니다. 대부분의 차원이 0이 아닌 값을 갖기 때문에 이러한 결과를 "고밀도" 벡터라고 합니다. 예를 들어, 널리 사용되는 오픈 소스 임베딩 모델인 BAAI/bge-base-en-v1.5는 768개의 부동 소수점 숫자(768차원 부동 소수점 벡터)로 이루어진 벡터를 출력합니다.</p></li>
<li><p><strong>스파스 임베딩</strong>: 이와 대조적으로, 스파스 임베딩의 출력 벡터는 대부분의 차원이 0, 즉 "스파스" 벡터입니다. 이러한 벡터는 토큰 어휘의 크기에 따라 결정되는 훨씬 더 높은 차원(수만 개 이상)을 갖는 경우가 많습니다. 스파스 벡터는 심층 신경망이나 텍스트 말뭉치의 통계 분석을 통해 생성될 수 있습니다. 희소 임베딩은 해석 가능성이 높고 도메인 외부 일반화 기능이 더 뛰어나기 때문에 개발자들이 밀도 임베딩을 보완하기 위해 점점 더 많이 채택하고 있습니다.</p></li>
</ul>
<p>Milvus는 벡터 데이터 관리, 저장 및 검색을 위해 설계된 벡터 데이터베이스입니다. 주류 임베딩 및 <a href="https://milvus.io/docs/rerankers-overview.md">재랭크</a> 모델을 통합함으로써 원본 텍스트를 검색 가능한 벡터로 쉽게 변환하거나 강력한 모델을 사용하여 결과를 재랭크하여 RAG에 대한 보다 정확한 결과를 얻을 수 있습니다. 이러한 통합은 텍스트 변환을 간소화하고 추가적인 임베딩 또는 재랭크 구성 요소가 필요하지 않으므로 RAG 개발 및 검증을 간소화합니다.</p>
<p>실제로 임베딩을 생성하려면 <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">PyMilvus의 모델을 사용하여 텍스트 임베딩 생성하기를</a> 참조하세요.</p>
<table>
<thead>
<tr><th>임베딩 함수</th><th>유형</th><th>API 또는 오픈 소스</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">문장 변환기</a></td><td>Dense</td><td>오픈 소스</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/BM25EmbeddingFunction/BM25EmbeddingFunction.md">bm25</a></td><td>Sparse</td><td>오픈 소스</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Sparse</td><td>오픈 소스</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Hybrid</td><td>오픈 소스</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">cohere</a></td><td>Dense</td><td>API</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">예제 1: 기본 임베딩 함수를 사용하여 밀도 벡터 생성하기<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 임베딩 함수를 사용하려면 먼저 임베딩 생성을 위한 모든 유틸리티를 래핑하는 <code translate="no">model</code> 서브패키지와 함께 PyMilvus 클라이언트 라이브러리를 설치하세요.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">model</code> 서브 패키지는 <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>, <a href="https://milvus.io/docs/embed-with-bm25.md">BM25부터</a> <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a> 사전 훈련 모델에 이르기까지 다양한 임베딩 모델을 지원합니다. 단순화를 위해 이 예제에서는 <strong>전체 MiniLM-L6-v2</strong> 문장 트랜스포머 모델인 <code translate="no">DefaultEmbeddingFunction</code> 을 사용하며, 이 모델은 약 70MB로 처음 사용할 때 다운로드됩니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-3.09392996e-02</span>, <span class="hljs-number">-1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       <span class="hljs-number">-4.86349640e-03</span>, <span class="hljs-number">-3.12581174e-02</span>, <span class="hljs-number">-3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       <span class="hljs-number">-4.61330153e-02</span>, <span class="hljs-number">-4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       <span class="hljs-number">-4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, <span class="hljs-number">-5.36676683e-02</span>],
      dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">예 2: BGE M3 모델을 사용하여 한 번의 호출로 고밀도 및 스파스 벡터 생성하기<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예에서는 <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> 하이브리드 모델을 사용하여 텍스트를 고밀도 및 스파스 벡터에 모두 임베드하고 관련 문서를 검색하는 데 사용합니다. 전체 단계는 다음과 같습니다:</p>
<ol>
<li><p>BGE-M3 모델을 사용하여 텍스트를 고밀도 및 스파스 벡터로 임베드합니다;</p></li>
<li><p>밀도 및 희소 벡터를 저장할 Milvus 컬렉션을 설정합니다;</p></li>
<li><p>Milvus에 데이터를 삽입합니다;</p></li>
<li><p>결과를 검색하고 검사합니다.</p></li>
</ol>
<p>먼저 필요한 종속 요소를 설치해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">hybrid</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BGEM3EmbeddingFunction</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>,
    <span class="hljs-title class_">Collection</span>, <span class="hljs-title class_">AnnSearchRequest</span>, <span class="hljs-title class_">RRFRanker</span>, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>임베딩 검색을 위한 문서와 쿼리를 인코딩하기 위해 BGE M3를 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-3-Generate--sparse-vectors-using-BM25-model" class="common-anchor-header">예 3: BM25 모델을 사용하여 스파스 벡터 생성하기<button data-href="#Example-3-Generate--sparse-vectors-using-BM25-model" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25는 단어 발생 빈도를 사용하여 쿼리와 문서 간의 관련성을 결정하는 잘 알려진 방법입니다. 이 예에서는 <code translate="no">BM25EmbeddingFunction</code> 을 사용하여 쿼리와 문서 모두에 대한 스파스 임베딩을 생성하는 방법을 보여 드리겠습니다.</p>
<p>먼저 <strong>BM25EmbeddingFunction</strong> 클래스를 가져옵니다.</p>
<pre><code translate="no" class="language-xml"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">sparse</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BM25EmbeddingFunction</span>
<button class="copy-code-btn"></button></code></pre>
<p>BM25에서는 문서의 통계를 계산하여 문서의 패턴을 나타낼 수 있는 IDF(역문서 빈도)를 구하는 것이 중요합니다. IDF는 단어가 얼마나 많은 정보를 제공하는지, 즉 모든 문서에서 공통적인지 또는 드문지를 측정하는 척도입니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Where was Turing born?&quot;</span>
bm25_ef = BM25EmbeddingFunction()

<span class="hljs-comment"># 2. fit the corpus to get BM25 model parameters on your documents.</span>
bm25_ef.fit(docs)

<span class="hljs-comment"># 3. store the fitted parameters to disk to expedite future processing.</span>
bm25_ef.save(<span class="hljs-string">&quot;bm25_params.json&quot;</span>)

<span class="hljs-comment"># 4. load the saved params</span>
new_bm25_ef = BM25EmbeddingFunction()
new_bm25_ef.load(<span class="hljs-string">&quot;bm25_params.json&quot;</span>)

docs_embeddings = new_bm25_ef.encode_documents(docs)
query_embeddings = new_bm25_ef.encode_queries([query])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, new_bm25_ef.dim, <span class="hljs-built_in">list</span>(docs_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">Dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
