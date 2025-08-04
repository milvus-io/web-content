---
id: langchain_milvus_async.md
summary: >-
  이 튜토리얼에서는 langchain-milvus에서 비동기 함수를 활용하여 고성능 애플리케이션을 구축하는 방법을 살펴봅니다. 비동기 방식을
  사용하면 특히 대규모 검색을 처리할 때 애플리케이션의 처리량과 응답성을 크게 향상시킬 수 있습니다.
title: 랭체인 밀버스 통합의 비동기 함수
---
<h1 id="Asynchronous-Functions-in-LangChain-Milvus-Integration" class="common-anchor-header">랭체인 밀버스 통합의 비동기 함수<button data-href="#Asynchronous-Functions-in-LangChain-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>이 튜토리얼에서는 <a href="https://github.com/langchain-ai/langchain-milvus">랭체인 밀</a> 버스에서 비동기 함수를 활용하여 고성능 애플리케이션을 구축하는 방법을 살펴봅니다. 비동기 방식을 사용하면 특히 대규모 검색을 처리할 때 애플리케이션의 처리량과 응답성을 크게 향상시킬 수 있습니다. 실시간 추천 시스템을 구축하든, 애플리케이션에서 시맨틱 검색을 구현하든, RAG(검색 증강 생성) 파이프라인을 만들든, 비동기 작업을 사용하면 동시 요청을 보다 효율적으로 처리할 수 있습니다. 고성능 벡터 데이터베이스 Milvus와 LangChain의 강력한 LLM 추상화를 결합하면 확장 가능한 AI 애플리케이션을 구축하기 위한 강력한 기반을 제공할 수 있습니다.</p>
<h2 id="Async-API-Overview" class="common-anchor-header">비동기 API 개요<button data-href="#Async-API-Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>랭체인-밀버스는 포괄적인 비동기 작업 지원을 제공하여 대규모 동시 시나리오에서 성능을 크게 향상시킵니다. 비동기 API는 동기 API와 일관된 인터페이스 디자인을 유지합니다.</p>
<h3 id="Core-Async-Functions" class="common-anchor-header">핵심 비동기 기능</h3><p>langchain-milvus에서 비동기 연산을 사용하려면 메서드 이름에 <code translate="no">a</code> 접두사를 추가하기만 하면 됩니다. 이렇게 하면 동시 검색 요청을 처리할 때 리소스 활용도를 높이고 처리량을 개선할 수 있습니다.</p>
<table>
<thead>
<tr><th>작업 유형</th><th>동기화 메서드</th><th>비동기 메서드</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>텍스트 추가</td><td><code translate="no">add_texts()</code></td><td><code translate="no">aadd_texts()</code></td><td>벡터 스토어에 텍스트 추가</td></tr>
<tr><td>문서 추가</td><td><code translate="no">add_documents()</code></td><td><code translate="no">aadd_documents()</code></td><td>벡터 스토어에 문서 추가</td></tr>
<tr><td>임베딩 추가</td><td><code translate="no">add_embeddings()</code></td><td><code translate="no">aadd_embeddings()</code></td><td>임베딩 벡터 추가하기</td></tr>
<tr><td>유사성 검색</td><td><code translate="no">similarity_search()</code></td><td><code translate="no">asimilarity_search()</code></td><td>텍스트로 시맨틱 검색</td></tr>
<tr><td>벡터 검색</td><td><code translate="no">similarity_search_by_vector()</code></td><td><code translate="no">asimilarity_search_by_vector()</code></td><td>벡터로 시맨틱 검색</td></tr>
<tr><td>점수로 검색</td><td><code translate="no">similarity_search_with_score()</code></td><td><code translate="no">asimilarity_search_with_score()</code></td><td>텍스트로 시맨틱 검색 및 유사도 점수 반환</td></tr>
<tr><td>점수로 벡터 검색</td><td><code translate="no">similarity_search_with_score_by_vector()</code></td><td><code translate="no">asimilarity_search_with_score_by_vector()</code></td><td>벡터로 시맨틱 검색하고 유사도 점수를 반환합니다.</td></tr>
<tr><td>다양성 검색</td><td><code translate="no">max_marginal_relevance_search()</code></td><td><code translate="no">amax_marginal_relevance_search()</code></td><td>MMR 검색(다양성을 최적화하면서 유사한 것을 반환)</td></tr>
<tr><td>벡터 다양성 검색</td><td><code translate="no">max_marginal_relevance_search_by_vector()</code></td><td><code translate="no">amax_marginal_relevance_search_by_vector()</code></td><td>벡터를 통한 MMR 검색</td></tr>
<tr><td>삭제 작업</td><td><code translate="no">delete()</code></td><td><code translate="no">adelete()</code></td><td>문서 삭제</td></tr>
<tr><td>업서트 작업</td><td><code translate="no">upsert()</code></td><td><code translate="no">aupsert()</code></td><td>문서 업서트(기존 문서가 있으면 업데이트, 없으면 삽입)</td></tr>
<tr><td>메타데이터 검색</td><td><code translate="no">search_by_metadata()</code></td><td><code translate="no">asearch_by_metadata()</code></td><td>메타데이터 필터링으로 쿼리</td></tr>
<tr><td>기본 키 가져오기</td><td><code translate="no">get_pks()</code></td><td><code translate="no">aget_pks()</code></td><td>표현식으로 기본 키 가져오기</td></tr>
<tr><td>텍스트에서 생성</td><td><code translate="no">from_texts()</code></td><td><code translate="no">afrom_texts()</code></td><td>텍스트에서 벡터 저장소 만들기</td></tr>
</tbody>
</table>
<p>이러한 함수에 대한 자세한 내용은 <a href="https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html#milvus">API 참조를</a> 참조하세요.</p>
<h3 id="Performance-Benefits" class="common-anchor-header">성능 이점</h3><p>비동기 작업은 대량의 동시 요청을 처리할 때 상당한 성능 향상을 제공하며, 특히 다음과 같은 경우에 적합합니다:</p>
<ul>
<li>일괄 문서 처리</li>
<li>동시 요청이 많은 검색 시나리오</li>
<li>프로덕션 RAG 애플리케이션</li>
<li>대규모 데이터 가져오기/내보내기</li>
</ul>
<p>이 튜토리얼에서는 동기식 작업과 비동기식 작업의 자세한 비교를 통해 이러한 성능 이점을 시연하고, 애플리케이션에서 최적의 성능을 위해 비동기 API를 활용하는 방법을 보여드립니다.</p>
<h2 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>이 페이지의 코드 스니펫에는 다음과 같은 종속성이 필요합니다:</p>
<pre><code translate="no" class="language-python">! pip install -U pymilvus langchain-milvus langchain langchain-core langchain-openai langchain-text-splitters nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 '런타임' 메뉴를 클릭하고 드롭다운 메뉴에서 '세션 다시 시작'을 선택).</p>
</blockquote>
<p>OpenAI 모델을 사용합니다. 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>비동기 코드를 실행하기 전에 이 코드 줄을 실행해야 합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Exploring-Async-APIs-and-Performance-Comparison" class="common-anchor-header">비동기 API와 성능 비교 살펴보기<button data-href="#Exploring-Async-APIs-and-Performance-Comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 langchain-milvus를 사용해 동기식과 비동기식 작업의 성능 비교에 대해 자세히 알아보겠습니다.</p>
<p>먼저 필요한 라이브러리를 가져옵니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Define the Milvus URI</span>
URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-up-Test-Functions" class="common-anchor-header">테스트 함수 설정하기</h3><p>테스트 데이터를 생성하는 헬퍼 함수를 만들어 보겠습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    <span class="hljs-string">&quot;&quot;&quot;Generate a random string ID&quot;&quot;&quot;</span>
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_test_documents</span>(<span class="hljs-params">num_docs</span>):
    <span class="hljs-string">&quot;&quot;&quot;Generate test documents for performance testing&quot;&quot;&quot;</span>
    docs = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_docs):
        content = (
            <span class="hljs-string">f&quot;This is test document <span class="hljs-subst">{i}</span> with some random content: <span class="hljs-subst">{random.random()}</span>&quot;</span>
        )
        metadata = {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">f&quot;doc_<span class="hljs-subst">{i}</span>&quot;</span>,
            <span class="hljs-string">&quot;score&quot;</span>: random.random(),
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">f&quot;cat_<span class="hljs-subst">{i % <span class="hljs-number">5</span>}</span>&quot;</span>,
        }
        doc = Document(page_content=content, metadata=metadata)
        docs.append(doc)
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Initialize-the-Vector-Store" class="common-anchor-header">벡터 저장소 초기화</h3><p>성능 테스트를 실행하기 전에 먼저 깨끗한 Milvus 벡터 저장소를 설정해야 합니다. 이 함수를 사용하면 각 테스트에 대해 새로운 컬렉션으로 시작하여 이전 데이터의 간섭을 제거할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-string">&quot;&quot;&quot;Initialize and return a fresh vector store for testing&quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> Milvus(
        embedding_function=OpenAIEmbeddings(),
        collection_name=<span class="hljs-string">&quot;langchain_perf_test&quot;</span>,
        connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
        auto_id=<span class="hljs-literal">True</span>,
        drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Always start with a fresh collection</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Async-vs-Sync-Add-Documents" class="common-anchor-header">비동기 대 동기화: 문서 추가</h3><p>이제 동기식 문서 추가와 비동기식 문서 추가의 성능을 비교해 보겠습니다. 이 함수는 벡터 스토어에 여러 문서를 추가할 때 비동기 작업이 얼마나 더 빠른지 측정하는 데 도움이 됩니다. 비동기 버전은 각 문서 추가에 대한 작업을 생성하고 동시에 실행하는 반면, 동기 버전은 문서를 하나씩 처리합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents asynchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        <span class="hljs-comment"># Create tasks for each document addition</span>
        task = milvus_store.aadd_documents([doc])
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents synchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        result = milvus_store.add_documents([doc])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>이제 다양한 문서 수로 성능 테스트를 실행하여 실제 성능 차이를 확인해 보겠습니다. 다양한 부하로 테스트하여 비동기 작업이 동기 작업과 비교하여 어떻게 확장되는지 이해해 보겠습니다. 이 테스트는 두 가지 접근 방식에 대한 실행 시간을 측정하고 비동기 작업의 성능 이점을 입증하는 데 도움이 됩니다:</p>
<pre><code translate="no" class="language-python">add_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Get the event loop</span>
loop = asyncio.get_event_loop()

<span class="hljs-comment"># Create a new vector store for testing</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test async document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())

<span class="hljs-comment"># Reset vector store for sync tests</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test sync document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:44:12,274 [DEBUG][_create_connection]: Created new connection using: dd5f77bb78964c079da42c2446b03bf6 (async_milvus_client.py:599)


Async add for 10 documents took 1.74 seconds


2025-06-05 10:44:16,940 [DEBUG][_create_connection]: Created new connection using: 8b13404a78654cdd9b790371eb44e427 (async_milvus_client.py:599)


Async add for 100 documents took 2.77 seconds
Sync add for 10 documents took 5.36 seconds
Sync add for 100 documents took 65.60 seconds
</code></pre>
<h3 id="Async-vs-Sync-Search" class="common-anchor-header">비동기 대 동기화: 검색</h3><p>검색 성능 비교를 위해 먼저 벡터 저장소를 채워야 합니다. 다음 함수는 여러 개의 동시 검색 쿼리를 생성하고 동기 방식과 비동기 방식 간의 실행 시간을 비교하여 검색 성능을 측정하는 데 도움이 됩니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">populate_vector_store</span>(<span class="hljs-params">milvus_store, num_docs=<span class="hljs-number">1000</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;Populate the vector store with test documents&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_docs)
    milvus_store.add_documents(docs)
    <span class="hljs-keyword">return</span> docs


<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform async searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        task = milvus_store.asimilarity_search(query=query, k=<span class="hljs-number">3</span>)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform sync searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        result = milvus_store.similarity_search(query=query, k=<span class="hljs-number">3</span>)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>이제 포괄적인 검색 성능 테스트를 실행하여 비동기 작업이 동기 작업과 비교하여 어떻게 확장되는지 살펴보겠습니다. 특히 동시 작업의 수가 증가할 때 비동기 작업의 성능 이점을 입증하기 위해 다양한 쿼리 볼륨으로 테스트해 보겠습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

query_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Test async search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())

<span class="hljs-comment"># Test sync search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:45:28,131 [DEBUG][_create_connection]: Created new connection using: 851824591c64415baac843e676e78cdd (async_milvus_client.py:599)


Async search for 10 queries took 2.31 seconds
Async search for 100 queries took 3.72 seconds
Sync search for 10 queries took 6.07 seconds
Sync search for 100 queries took 54.22 seconds
</code></pre>
<h3 id="Async-vs-Sync-Delete" class="common-anchor-header">비동기 대 동기: 삭제</h3><p>삭제 작업은 비동기 작업이 상당한 성능 향상을 제공할 수 있는 또 다른 중요한 측면입니다. 동기식 삭제 작업과 비동기식 삭제 작업의 성능 차이를 측정하는 함수를 만들어 보겠습니다. 이 테스트는 비동기 작업이 일괄 삭제를 더 효율적으로 처리하는 방법을 보여주는 데 도움이 될 것입니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents asynchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        task = milvus_store.adelete(expr=expr)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents synchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        result = milvus_store.delete(expr=expr)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>이제 삭제 성능 테스트를 실행하여 성능 차이를 정량화해 보겠습니다. 테스트 데이터로 채워진 새 벡터 저장소로 시작한 다음 동기식 및 비동기식 접근 방식을 모두 사용하여 삭제 작업을 수행해 보겠습니다:</p>
<pre><code translate="no" class="language-python">delete_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test async delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_delete</span>():
        async_time = <span class="hljs-keyword">await</span> async_delete(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_delete())

<span class="hljs-comment"># Reset and repopulate the vector store for sync tests</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test sync delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:
    sync_time = sync_delete(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:46:57,211 [DEBUG][_create_connection]: Created new connection using: 504e9ce3be92411e87077971c82baca2 (async_milvus_client.py:599)


Async delete for 10 operations took 0.58 seconds


2025-06-05 10:47:12,309 [DEBUG][_create_connection]: Created new connection using: 22c1513b444e4c40936e2176d7a1a154 (async_milvus_client.py:599)


Async delete for 100 operations took 0.61 seconds
Sync delete for 10 operations took 2.82 seconds
Sync delete for 100 operations took 29.21 seconds
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>이 튜토리얼에서는 LangChain과 Milvus에서 비동기 연산을 사용할 때 상당한 성능 이점이 있다는 것을 보여주었습니다. 추가, 검색, 삭제 작업의 동기식 버전과 비동기식 버전을 비교하여 비동기식 작업이 특히 대규모 배치 작업에서 어떻게 상당한 속도 향상을 가져올 수 있는지 보여주었습니다.</p>
<p>주요 요점</p>
<ol>
<li>비동기 작업은 병렬로 실행할 수 있는 많은 개별 작업을 수행할 때 가장 큰 이점을 제공합니다.</li>
<li>처리량이 많은 워크로드의 경우 동기화 작업과 비동기 작업 간의 성능 격차가 더 커집니다.</li>
<li>비동기 작업은 머신의 컴퓨팅 성능을 최대한 활용합니다.</li>
</ol>
<p>LangChain 및 Milvus로 프로덕션 RAG 애플리케이션을 구축할 때, 특히 동시 작업의 경우 성능이 우려되는 경우 비동기 API 사용을 고려하세요.</p>
