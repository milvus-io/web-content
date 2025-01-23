---
id: build_RAG_with_milvus_and_firecrawl.md
summary: >-
  이 튜토리얼에서는 Milvus와 Firecrawl을 사용해 검색 증강 생성(RAG) 파이프라인을 구축하는 방법을 보여드리겠습니다. 이
  파이프라인은 웹 데이터 스크래핑을 위한 Firecrawl, 벡터 스토리지를 위한 Milvus, 인사이트가 있는 문맥 인식 응답을 생성하기
  위한 OpenAI를 통합합니다.
title: Milvus와 Firecrawl로 RAG 구축하기
---
<h1 id="Building-RAG-with-Milvus-and-Firecrawl" class="common-anchor-header">Milvus와 Firecrawl로 RAG 구축하기<button data-href="#Building-RAG-with-Milvus-and-Firecrawl" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_firecrawl.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_firecrawl.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://www.firecrawl.dev/">Firecrawl은</a> 개발자가 모든 웹사이트에서 스크랩한 깨끗한 데이터로 AI 애플리케이션을 구축할 수 있도록 지원합니다. 고급 스크래핑, 크롤링 및 데이터 추출 기능을 갖춘 Firecrawl은 웹사이트 콘텐츠를 깔끔한 마크다운 또는 구조화된 데이터로 변환하여 다운스트림 AI 워크플로우를 위한 프로세스를 간소화합니다.</p>
<p>이 튜토리얼에서는 Milvus와 Firecrawl을 사용하여 검색 증강 생성(RAG) 파이프라인을 구축하는 방법을 보여드립니다. 이 파이프라인은 웹 데이터 스크래핑을 위한 Firecrawl, 벡터 스토리지를 위한 Milvus, 인사이트가 있는 상황 인식 응답을 생성하기 위한 OpenAI를 통합합니다.</p>
<h2 id="Preparation" class="common-anchor-header">준비<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">종속성 및 환경</h3><p>시작하려면 다음 명령을 실행하여 필요한 종속 요소를 설치하세요:</p>
<pre><code translate="no" class="language-shell">$ pip install firecrawl-py pymilvus openai requests tqdm
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 '런타임' 메뉴를 클릭하고 드롭다운 메뉴에서 '세션 다시 시작'을 선택).</p>
</div>
<h3 id="Setting-Up-API-Keys" class="common-anchor-header">API 키 설정하기</h3><p>파이어크롤을 사용하여 지정된 URL에서 데이터를 스크래핑하려면 <a href="https://www.firecrawl.dev/">FIRECRAWL_API_KEY를</a> 가져와 환경 변수로 설정해야 합니다. 또한 이 예제에서는 OpenAI를 LLM으로 사용합니다. <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY도</a> 환경 변수로 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;FIRECRAWL_API_KEY&quot;</span>] = <span class="hljs-string">&quot;fc-***********&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-LLM-and-Embedding-Model" class="common-anchor-header">LLM 및 임베딩 모델 준비</h3><p>임베딩 모델을 준비하기 위해 OpenAI 클라이언트를 초기화합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

openai_client = <span class="hljs-title class_">OpenAI</span>()
<button class="copy-code-btn"></button></code></pre>
<p>OpenAI 클라이언트를 사용하여 텍스트 임베딩을 생성하는 함수를 정의합니다. <a href="https://platform.openai.com/docs/guides/embeddings">텍스트 임베딩 3-소형</a> 모델을 예로 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>테스트 임베딩을 생성하고 해당 치수와 처음 몇 개의 요소를 인쇄합니다.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Scrape-Data-Using-Firecrawl" class="common-anchor-header">파이어크롤을 사용하여 데이터 스크랩<button data-href="#Scrape-Data-Using-Firecrawl" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Initialize-the-Firecrawl-Application" class="common-anchor-header">파이어크롤 애플리케이션 초기화하기</h3><p><code translate="no">firecrawl</code> 라이브러리를 사용하여 지정된 URL에서 마크다운 형식으로 데이터를 스크랩하겠습니다. 먼저 파이어크롤 애플리케이션을 초기화합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> firecrawl <span class="hljs-keyword">import</span> <span class="hljs-title class_">FirecrawlApp</span>

app = <span class="hljs-title class_">FirecrawlApp</span>(api_key=os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;FIRECRAWL_API_KEY&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Scrape-the-Target-Website" class="common-anchor-header">대상 웹사이트 스크랩</h3><p>대상 URL에서 콘텐츠를 스크랩합니다. LLM <a href="https://lilianweng.github.io/posts/2023-06-23-agent/">기반 자율 에이전트</a> 웹사이트에서는 대규모 언어 모델(LLM)을 사용하여 구축된 자율 에이전트 시스템에 대한 심층적인 탐색을 제공합니다. 이러한 콘텐츠를 사용하여 RAG 시스템을 구축합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-meta"># Scrape a website:</span>
scrape_status = app.scrape_url(
    <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;formats&quot;</span>: [<span class="hljs-string">&quot;markdown&quot;</span>]},
)

markdown_content = scrape_status[<span class="hljs-string">&quot;markdown&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Process-the-Scraped-Content" class="common-anchor-header">스크랩된 콘텐츠 처리하기</h3><p>스크랩된 콘텐츠를 Milvus에 삽입하기 위해 관리하기 쉽게 만들기 위해 &quot;#&quot;를 사용하여 콘텐츠를 구분하면 스크랩된 마크다운 파일의 각 주요 부분의 콘텐츠를 대략적으로 구분할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">split_markdown_content</span>(<span class="hljs-params">content</span>):
    <span class="hljs-keyword">return</span> [section.strip() <span class="hljs-keyword">for</span> section <span class="hljs-keyword">in</span> content.split(<span class="hljs-string">&quot;# &quot;</span>) <span class="hljs-keyword">if</span> section.strip()]


<span class="hljs-comment"># Process the scraped markdown content</span>
sections = split_markdown_content(markdown_content)

<span class="hljs-comment"># Print the first few sections to understand the structure</span>
<span class="hljs-keyword">for</span> i, section <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(sections[:<span class="hljs-number">3</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Section <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(section[:<span class="hljs-number">300</span>] + <span class="hljs-string">&quot;...&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Section 1:
Table of Contents

- [Agent System Overview](#agent-system-overview)
- [Component One: Planning](#component-one-planning)  - [Task Decomposition](#task-decomposition)
  - [Self-Reflection](#self-reflection)
- [Component Two: Memory](#component-two-memory)  - [Types of Memory](#types-of-memory)
  - [...
--------------------------------------------------
Section 2:
Agent System Overview [\#](\#agent-system-overview)

In a LLM-powered autonomous agent system, LLM functions as the agent’s brain, complemented by several key components:

- **Planning**
  - Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling effi...
--------------------------------------------------
Section 3:
Component One: Planning [\#](\#component-one-planning)

A complicated task usually involves many steps. An agent needs to know what they are and plan ahead.

#...
--------------------------------------------------
</code></pre>
<h2 id="Load-Data-into-Milvus" class="common-anchor-header">Milvus에 데이터 로드<button data-href="#Load-Data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-collection" class="common-anchor-header">컬렉션 생성</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusClient</code> 의 인수는 다음과 같습니다:</p>
<ul>
<li><p><code translate="no">uri</code> 를 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</p></li>
<li><p>데이터 규모가 큰 경우, <a href="https://milvus.io/docs/quickstart.md">도커나 쿠버네티스에</a> 더 고성능의 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 <code translate="no">uri</code> 으로 사용하세요.</p></li>
<li><p>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 을 조정하세요.</p></li>
</ul>
</div>
<p>컬렉션이 이미 존재하는지 확인하고 존재한다면 삭제합니다.</p>
<pre><code translate="no" class="language-python">if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>지정된 파라미터로 새 컬렉션을 생성합니다.</p>
<p>필드 정보를 지정하지 않으면 기본 키로 <code translate="no">id</code> 필드와 벡터 데이터를 저장할 <code translate="no">vector</code> 필드가 자동으로 생성됩니다. 예약된 JSON 필드는 스키마에 정의되지 않은 필드와 그 값을 저장하는 데 사용됩니다.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">데이터 삽입</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, section <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(sections, desc=<span class="hljs-string">&quot;Processing sections&quot;</span>)):
    embedding = emb_text(section)
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: section})

<span class="hljs-comment"># Insert data into Milvus</span>
milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Processing sections: 100%|██████████| 17/17 [00:08&lt;00:00,  2.09it/s]





{'insert_count': 17, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAG 구축<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">쿼리에 대한 데이터 검색</h3><p>방금 스크랩한 웹사이트에 대한 쿼리 질문을 지정해 보겠습니다.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What are the main components of autonomous agents?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>컬렉션에서 질문을 검색하고 시맨틱 상위 3개 일치 항목을 검색합니다.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[emb_text(question)],
    <span class="hljs-built_in">limit</span>=3,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리의 검색 결과를 살펴봅시다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot;Agent System Overview [\\#](\\#agent-system-overview)\n\nIn a LLM-powered autonomous agent system, LLM functions as the agent\u2019s brain, complemented by several key components:\n\n- **Planning**\n  - Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling efficient handling of complex tasks.\n  - Reflection and refinement: The agent can do self-criticism and self-reflection over past actions, learn from mistakes and refine them for future steps, thereby improving the quality of final results.\n- **Memory**\n  - Short-term memory: I would consider all the in-context learning (See [Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)) as utilizing short-term memory of the model to learn.\n  - Long-term memory: This provides the agent with the capability to retain and recall (infinite) information over extended periods, often by leveraging an external vector store and fast retrieval.\n- **Tool use**\n  - The agent learns to call external APIs for extra information that is missing from the model weights (often hard to change after pre-training), including current information, code execution capability, access to proprietary information sources and more.\n\n![](agent-overview.png)Fig. 1. Overview of a LLM-powered autonomous agent system.&quot;,
        0.6343474388122559
    ],
    [
        &quot;Table of Contents\n\n- [Agent System Overview](#agent-system-overview)\n- [Component One: Planning](#component-one-planning)  - [Task Decomposition](#task-decomposition)\n  - [Self-Reflection](#self-reflection)\n- [Component Two: Memory](#component-two-memory)  - [Types of Memory](#types-of-memory)\n  - [Maximum Inner Product Search (MIPS)](#maximum-inner-product-search-mips)\n- [Component Three: Tool Use](#component-three-tool-use)\n- [Case Studies](#case-studies)  - [Scientific Discovery Agent](#scientific-discovery-agent)\n  - [Generative Agents Simulation](#generative-agents-simulation)\n  - [Proof-of-Concept Examples](#proof-of-concept-examples)\n- [Challenges](#challenges)\n- [Citation](#citation)\n- [References](#references)\n\nBuilding agents with LLM (large language model) as its core controller is a cool concept. Several proof-of-concepts demos, such as [AutoGPT](https://github.com/Significant-Gravitas/Auto-GPT), [GPT-Engineer](https://github.com/AntonOsika/gpt-engineer) and [BabyAGI](https://github.com/yoheinakajima/babyagi), serve as inspiring examples. The potentiality of LLM extends beyond generating well-written copies, stories, essays and programs; it can be framed as a powerful general problem solver.&quot;,
        0.5715497732162476
    ],
    [
        &quot;Challenges [\\#](\\#challenges)\n\nAfter going through key ideas and demos of building LLM-centered agents, I start to see a couple common limitations:\n\n- **Finite context length**: The restricted context capacity limits the inclusion of historical information, detailed instructions, API call context, and responses. The design of the system has to work with this limited communication bandwidth, while mechanisms like self-reflection to learn from past mistakes would benefit a lot from long or infinite context windows. Although vector stores and retrieval can provide access to a larger knowledge pool, their representation power is not as powerful as full attention.\n\n- **Challenges in long-term planning and task decomposition**: Planning over a lengthy history and effectively exploring the solution space remain challenging. LLMs struggle to adjust plans when faced with unexpected errors, making them less robust compared to humans who learn from trial and error.\n\n- **Reliability of natural language interface**: Current agent system relies on natural language as an interface between LLMs and external components such as memory and tools. However, the reliability of model outputs is questionable, as LLMs may make formatting errors and occasionally exhibit rebellious behavior (e.g. refuse to follow an instruction). Consequently, much of the agent demo code focuses on parsing model output.&quot;,
        0.5009307265281677
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLM을 사용하여 RAG 응답 얻기</h3><p>검색된 문서를 문자열 형식으로 변환합니다.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.<span class="hljs-keyword">join</span>(
    [<span class="hljs-meta">line_with_distance[0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>Lanage 모델에 대한 시스템 및 사용자 프롬프트를 정의합니다. 이 프롬프트는 Milvus에서 검색된 문서로 조립됩니다.</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>OpenAI ChatGPT를 사용하여 프롬프트에 따라 응답을 생성합니다.</p>
<pre><code translate="no" class="language-python">response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The main components of a LLM-powered autonomous agent system are the Planning, Memory, and Tool use. 

1. Planning: The agent breaks down large tasks into smaller, manageable subgoals, and can self-reflect and learn from past mistakes, refining its actions for future steps.

2. Memory: This includes short-term memory, which the model uses for in-context learning, and long-term memory, which allows the agent to retain and recall information over extended periods. 

3. Tool use: This component allows the agent to call external APIs for additional information that is not available in the model weights, like current information, code execution capacity, and access to proprietary information sources.
</code></pre>
