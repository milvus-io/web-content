---
id: rerankers-overview.md
order: 1
summary: 파이밀버스 모델 라이브러리는 재랭크 함수를 통합하여 초기 검색에서 반환되는 결과의 순서를 최적화합니다.
title: 리랭커 개요
---
<h1 id="Rerankers-Overview" class="common-anchor-header">리랭커 개요<button data-href="#Rerankers-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>정보 검색 및 생성 AI 영역에서 리랭커는 초기 검색 결과의 순서를 최적화하는 필수적인 도구입니다. 리랭커는 쿼리와 문서를 입력으로 받아 임베딩 대신 유사도 점수를 직접 반환한다는 점에서 기존의 <a href="/docs/ko/v2.4.x/embeddings.md">임베딩 모델과</a> 다릅니다. 이 점수는 입력 쿼리와 문서 간의 관련성을 나타냅니다.</p>
<p>재랭커는 첫 번째 단계 검색 후에 종종 사용되며, 일반적으로 벡터 근사 근사 이웃(ANN) 기법을 통해 수행됩니다. ANN 검색은 잠재적으로 관련성이 높은 광범위한 결과를 가져오는 데는 효율적이지만, 쿼리에 대한 실제 의미적 근접성 측면에서 항상 결과의 우선순위를 정하지는 않을 수 있습니다. 여기서 재랭커는 심층적인 문맥 분석을 통해 결과 순서를 최적화하는 데 사용되며, 종종 BERT 또는 기타 Transformer 기반 모델과 같은 고급 머신 러닝 모델을 활용합니다. 이를 통해 재랭커는 사용자에게 표시되는 최종 결과의 정확도와 관련성을 크게 향상시킬 수 있습니다.</p>
<p>파이밀버스 모델 라이브러리는 재랭크 함수를 통합하여 초기 검색에서 반환되는 결과의 순서를 최적화합니다. Milvus에서 가장 가까운 임베딩을 검색한 후에는 이러한 재순위 지정 도구를 활용하여 검색 결과를 세분화하여 검색 결과의 정확도를 높일 수 있습니다.</p>
<table>
<thead>
<tr><th>재랭크 기능</th><th>API 또는 오픈 소스</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/BGERerankFunction/BGERerankFunction.md">BGE</a></td><td>오픈 소스</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/CrossEncoderRerankFunction/CrossEncoderRerankFunction.md">크로스 인코더</a></td><td>오픈 소스</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/VoyageRerankFunction/VoyageRerankFunction.md">Voyage</a></td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/CohereRerankFunction/CohereRerankFunction.md">Cohere</a></td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/JinaRerankFunction/JinaRerankFunction.md">Jina AI</a></td><td>API</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>오픈 소스 리랭커를 사용하기 전에 필요한 모든 종속 요소와 모델을 다운로드하여 설치하세요.</p></li>
<li><p>API 기반 재랭커의 경우 제공업체로부터 API 키를 받아 적절한 환경 변수나 인수에 설정하세요.</p></li>
</ul>
</div>
<h2 id="Example-1-Use-BGE-rerank-function-to-rerank-documents-according-to-a-query" class="common-anchor-header">예 1: BGE 재랭크 함수를 사용하여 쿼리에 따라 문서 재랭크하기<button data-href="#Example-1-Use-BGE-rerank-function-to-rerank-documents-according-to-a-query" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예에서는 특정 쿼리를 기반으로 <a href="/docs/ko/v2.4.x/rerankers-bge.md">BGE 리랭커를</a> 사용하여 검색 결과의 순위를 재조정하는 방법을 보여줍니다.</p>
<p><a href="https://github.com/milvus-io/milvus-model">파이밀버스 모델</a> 라이브러리와 함께 재랭커를 사용하려면 먼저 필요한 모든 재랭크 유틸리티가 포함된 모델 서브패키지와 함께 파이밀버스 모델 라이브러리를 설치하세요:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus[model]
<span class="hljs-comment"># or pip install &quot;pymilvus[model]&quot; for zsh.</span>
<button class="copy-code-btn"></button></code></pre>
<p>BGE 리랭커를 사용하려면 먼저 <code translate="no">BGERerankFunction</code> 클래스를 임포트합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">reranker</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BGERerankFunction</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 재랭킹을 위한 <code translate="no">BGERerankFunction</code> 인스턴스를 만듭니다:</p>
<pre><code translate="no" class="language-python">bge_rf = BGERerankFunction(
    model_name=<span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>,  <span class="hljs-comment"># Specify the model name. Defaults to `BAAI/bge-reranker-v2-m3`.</span>
    device=<span class="hljs-string">&quot;cpu&quot;</span> <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리를 기반으로 문서의 순위를 재조정하려면 다음 코드를 사용합니다:</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>
]

<span class="hljs-title function_">bge_rf</span>(query, documents)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>, score=<span class="hljs-number">0.9911615761470803</span>, index=<span class="hljs-number">1</span>),
 <span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>, score=<span class="hljs-number">0.0326971950177779</span>, index=<span class="hljs-number">0</span>),
 <span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&#x27;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&#x27;</span>, score=<span class="hljs-number">0.006514905766152258</span>, index=<span class="hljs-number">3</span>),
 <span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&#x27;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&#x27;</span>, score=<span class="hljs-number">0.0042116724917325935</span>, index=<span class="hljs-number">2</span>)]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Use-a-reranker-to-enhance-relevance-of-search-results" class="common-anchor-header">예 2: 재랭커를 사용하여 검색 결과의 관련성 높이기<button data-href="#Example-2-Use-a-reranker-to-enhance-relevance-of-search-results" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 파이밀버스에서 <code translate="no">search()</code> 메서드를 활용하여 유사도 검색을 수행하는 방법과 재랭커를 사용하여 검색 결과의 연관성을 향상시키는 방법을 살펴봅니다. 데모에서는 다음 데이터 세트를 사용합니다:</p>
<pre><code translate="no" class="language-python">entities = [
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [-<span class="hljs-number">0.0372721</span>,<span class="hljs-number">0.0101959</span>,...,-<span class="hljs-number">0.114994</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>}, 
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [-<span class="hljs-number">0.00308882</span>,-<span class="hljs-number">0.0219905</span>,...,-<span class="hljs-number">0.00795811</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>}, 
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [<span class="hljs-number">0.00945078</span>,<span class="hljs-number">0.00397605</span>,...,-<span class="hljs-number">0.0286199</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&#x27;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&#x27;</span>}, 
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [-<span class="hljs-number">0.0391119</span>,-<span class="hljs-number">0.00880096</span>,...,-<span class="hljs-number">0.0109257</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&#x27;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&#x27;</span>}
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>데이터 세트 구성 요소</strong></p>
<ul>
<li><code translate="no">doc_id</code>: 각 문서의 고유 식별자.</li>
<li><code translate="no">doc_vector</code>: 문서를 나타내는 벡터 임베딩. 임베딩 생성에 대한 지침은 <a href="/docs/ko/v2.4.x/embeddings.md">임베딩을</a> 참조하세요.</li>
<li><code translate="no">doc_text</code>: 문서의 텍스트 콘텐츠입니다.</li>
</ul>
<h3 id="Preparations" class="common-anchor-header">준비 사항</h3><p>유사도 검색을 시작하기 전에 Milvus와 연결을 설정하고 컬렉션을 생성한 다음 해당 컬렉션에 데이터를 준비하여 삽입해야 합니다. 다음 코드 스니펫은 이러한 사전 단계를 설명합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://10.102.6.214:19530&quot;</span> <span class="hljs-comment"># replace with your own Milvus server address</span>
)

client.drop_collection(<span class="hljs-string">&#x27;test_collection&#x27;</span>)

<span class="hljs-comment"># define schema</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enabel_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;doc_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;document id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;doc_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">384</span>, description=<span class="hljs-string">&quot;document vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;doc_text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>, description=<span class="hljs-string">&quot;document text&quot;</span>)

<span class="hljs-comment"># define index params</span>

index_params = client.prepare_index_params()

index_params.add_index(field_name=<span class="hljs-string">&quot;doc_vector&quot;</span>, index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>, params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>})

<span class="hljs-comment"># create collection</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema, index_params=index_params)

<span class="hljs-comment"># insert data into collection</span>

client.insert(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, data=entities)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;insert_count&#x27;: 4, &#x27;ids&#x27;: [0, 1, 2, 3]}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Conduct-a-similarity-search" class="common-anchor-header">유사도 검색 수행</h3><p>데이터를 삽입한 후 <code translate="no">search</code> 메서드를 사용하여 유사도 검색을 수행합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># search results based on our query</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.045217834</span>, <span class="hljs-number">0.035171617</span>, ..., -<span class="hljs-number">0.025117004</span>]], <span class="hljs-comment"># replace with your query vector</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;doc_text&quot;</span>]
)

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;distance: <span class="hljs-subst">{i[<span class="hljs-string">&quot;distance&quot;</span>]}</span>&#x27;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;doc_text: <span class="hljs-subst">{i[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;doc_text&quot;</span>]}</span>&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">distance: <span class="hljs-number">0.7235960960388184</span>
doc_text: The Dartmouth Conference <span class="hljs-keyword">in</span> <span class="hljs-number">1956</span> <span class="hljs-keyword">is</span> considered the birthplace of artificial intelligence <span class="hljs-keyword">as</span> a field; here, John McCarthy <span class="hljs-keyword">and</span> others coined the term <span class="hljs-string">&#x27;artificial intelligence&#x27;</span> <span class="hljs-keyword">and</span> laid <span class="hljs-keyword">out</span> its basic goals.
distance: <span class="hljs-number">0.6269873976707458</span>
doc_text: In <span class="hljs-number">1950</span>, Alan Turing published his seminal paper, <span class="hljs-string">&#x27;Computing Machinery and Intelligence,&#x27;</span> proposing the Turing Test <span class="hljs-keyword">as</span> a criterion of intelligence, a foundational concept <span class="hljs-keyword">in</span> the philosophy <span class="hljs-keyword">and</span> development of artificial intelligence.
distance: <span class="hljs-number">0.5340118408203125</span>
doc_text: The invention of the Logic Theorist <span class="hljs-keyword">by</span> Allen Newell, Herbert A. Simon, <span class="hljs-keyword">and</span> Cliff Shaw <span class="hljs-keyword">in</span> <span class="hljs-number">1955</span> marked the creation of the first <span class="hljs-literal">true</span> AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-a-reranker-to-enhance-search-results" class="common-anchor-header">재랭커를 사용하여 검색 결과 개선하기</h3><p>그런 다음 재랭크 단계를 통해 검색 결과의 관련성을 개선합니다. 이 예에서는 PyMilvus에 내장된 <code translate="no">CrossEncoderRerankFunction</code> 을 사용하여 정확도를 높이기 위해 결과의 순위를 재조정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use reranker to rerank search results</span>

<span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> CrossEncoderRerankFunction

ce_rf = CrossEncoderRerankFunction(
    model_name=<span class="hljs-string">&quot;cross-encoder/ms-marco-MiniLM-L-6-v2&quot;</span>,  <span class="hljs-comment"># Specify the model name.</span>
    device=<span class="hljs-string">&quot;cpu&quot;</span> <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
)

reranked_results = ce_rf(
    query=<span class="hljs-string">&#x27;What event in 1956 marked the official birth of artificial intelligence as a discipline?&#x27;</span>,
    documents=[
        <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
        <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
        <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
        <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>
    ],
    top_k=<span class="hljs-number">3</span>
)

<span class="hljs-comment"># print the reranked results</span>
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> reranked_results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;score: <span class="hljs-subst">{result.score}</span>&#x27;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;doc_text: <span class="hljs-subst">{result.text}</span>&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>예상되는 결과는 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">score: <span class="hljs-number">6.250532627105713</span>
doc_text: The Dartmouth Conference <span class="hljs-keyword">in</span> <span class="hljs-number">1956</span> <span class="hljs-keyword">is</span> considered the birthplace of artificial intelligence <span class="hljs-keyword">as</span> a field; here, John McCarthy <span class="hljs-keyword">and</span> others coined the term <span class="hljs-string">&#x27;artificial intelligence&#x27;</span> <span class="hljs-keyword">and</span> laid <span class="hljs-keyword">out</span> its basic goals.
score: <span class="hljs-number">-2.9546022415161133</span>
doc_text: In <span class="hljs-number">1950</span>, Alan Turing published his seminal paper, <span class="hljs-string">&#x27;Computing Machinery and Intelligence,&#x27;</span> proposing the Turing Test <span class="hljs-keyword">as</span> a criterion of intelligence, a foundational concept <span class="hljs-keyword">in</span> the philosophy <span class="hljs-keyword">and</span> development of artificial intelligence.
score: <span class="hljs-number">-4.771512031555176</span>
doc_text: The invention of the Logic Theorist <span class="hljs-keyword">by</span> Allen Newell, Herbert A. Simon, <span class="hljs-keyword">and</span> Cliff Shaw <span class="hljs-keyword">in</span> <span class="hljs-number">1955</span> marked the creation of the first <span class="hljs-literal">true</span> AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
<button class="copy-code-btn"></button></code></pre>
