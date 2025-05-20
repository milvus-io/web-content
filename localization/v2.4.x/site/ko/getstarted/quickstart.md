---
id: quickstart.md
summary: Milvus 시작하기.
title: 빠른 시작
---
<h1 id="Quickstart-with-Milvus-Lite" class="common-anchor-header">Milvus Lite로 빠르게 시작하기<button data-href="#Quickstart-with-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/quickstart.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/quickstart.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>신경망 모델의 출력 데이터 형식인 벡터는 정보를 효과적으로 인코딩하고 지식 베이스, 시맨틱 검색, 검색 증강 생성(RAG) 등과 같은 AI 애플리케이션에서 중추적인 역할을 할 수 있습니다.</p>
<p>Milvus는 오픈 소스 벡터 데이터베이스로, Jupyter 노트북에서 데모 챗봇을 실행하는 것부터 수십억 명의 사용자에게 서비스를 제공하는 웹 규모 검색 구축에 이르기까지 모든 규모의 AI 애플리케이션에 적합합니다. 이 가이드에서는 몇 분 안에 Milvus를 로컬에서 설정하고 Python 클라이언트 라이브러리를 사용하여 벡터를 생성, 저장 및 검색하는 방법을 안내해 드립니다.</p>
<h2 id="Install-Milvus" class="common-anchor-header">Milvus 설치하기<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 클라이언트 애플리케이션에 임베드할 수 있는 <code translate="no">pymilvus</code> 에 포함된 Python 라이브러리인 Milvus Lite를 사용합니다. Milvus는 프로덕션 사용 사례를 위해 <a href="/docs/ko/v2.4.x/install_standalone-docker.md">Docker</a> 및 <a href="/docs/ko/v2.4.x/install_cluster-milvusoperator.md">Kubernetes에</a> 배포하는 것도 지원합니다.</p>
<p>시작하기 전에 로컬 환경에서 Python 3.8 이상을 사용할 수 있는지 확인하세요. 파이썬 클라이언트 라이브러리와 Milvus Lite가 모두 포함된 <code translate="no">pymilvus</code> 을 설치합니다:</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다. (화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택합니다).</p>
</blockquote>
</div>
<h2 id="Set-Up-Vector-Database" class="common-anchor-header">벡터 데이터베이스 설정<button data-href="#Set-Up-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>로컬 Milvus 벡터 데이터베이스를 만들려면 "milvus_demo.db"와 같이 모든 데이터를 저장할 파일 이름을 지정하여 <code translate="no">MilvusClient</code> 인스턴스화하면 됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Collection" class="common-anchor-header">컬렉션 만들기<button data-href="#Create-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서는 벡터와 관련 메타데이터를 저장할 컬렉션이 필요합니다. 기존 SQL 데이터베이스의 테이블이라고 생각하시면 됩니다. 컬렉션을 만들 때 스키마 및 인덱스 매개변수를 정의하여 차원, 인덱스 유형 및 먼 거리 메트릭과 같은 벡터 사양을 구성할 수 있습니다. 벡터 검색 성능을 위해 인덱스를 최적화하는 복잡한 개념도 있습니다. 지금은 기본에 집중하고 가능한 모든 것을 기본값으로 사용하겠습니다. 최소한 컬렉션 이름과 컬렉션의 벡터 필드 차원만 설정하면 됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> client.has_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>):
    client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">768</span>,  <span class="hljs-comment"># The vectors we will use in this demo has 768 dimensions</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>위의 설정에서</p>
<ul>
<li>기본 키와 벡터 필드는 기본 이름("id" 및 "vector")을 사용합니다.</li>
<li>메트릭 유형(벡터 거리 정의)은 기본값<a href="/docs/ko/v2.4.x/metric.md#Cosine-Similarity">(COSINE</a>)으로 설정됩니다.</li>
<li>기본 키 필드는 정수를 허용하며 자동으로 증가하지 않습니다(즉, <a href="/docs/ko/v2.4.x/schema.md">자동 ID 기능을</a> 사용하지 않음). 또는 이 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">지침에</a> 따라 컬렉션의 스키마를 공식적으로 정의할 수 있습니다.</li>
</ul>
<h2 id="Prepare-Data" class="common-anchor-header">데이터 준비<button data-href="#Prepare-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 벡터를 사용하여 텍스트에 대한 의미론적 검색을 수행합니다. 임베딩 모델을 다운로드하여 텍스트에 대한 벡터를 생성해야 합니다. 이는 <code translate="no">pymilvus[model]</code> 라이브러리의 유틸리티 함수를 사용하여 쉽게 수행할 수 있습니다.</p>
<h2 id="Represent-text-with-vectors" class="common-anchor-header">벡터로 텍스트 표현하기<button data-href="#Represent-text-with-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>먼저 모델 라이브러리를 설치합니다. 이 패키지에는 PyTorch와 같은 필수 머신러닝 도구가 포함되어 있습니다. PyTorch를 설치하지 않은 로컬 환경에서는 패키지 다운로드에 다소 시간이 걸릴 수 있습니다.</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>기본 모델을 사용하여 벡터 임베딩을 생성합니다. Milvus는 데이터가 사전 목록으로 구성되어 삽입될 것으로 예상하며, 각 사전은 엔티티라고 하는 데이터 레코드를 나타냅니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># If connection to https://huggingface.co/ failed, uncomment the following path</span>
<span class="hljs-comment"># import os</span>
<span class="hljs-comment"># os.environ[&#x27;HF_ENDPOINT&#x27;] = &#x27;https://hf-mirror.com&#x27;</span>

<span class="hljs-comment"># This will download a small embedding model &quot;paraphrase-albert-small-v2&quot; (~50MB).</span>
embedding_fn = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

vectors = embedding_fn.encode_documents(docs)
<span class="hljs-comment"># The output vector has 768 dimensions, matching the collection that we just created.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, embedding_fn.dim, vectors[<span class="hljs-number">0</span>].shape)  <span class="hljs-comment"># Dim: 768 (768,)</span>

<span class="hljs-comment"># Each entity has id, vector representation, raw text, and a subject label that we use</span>
<span class="hljs-comment"># to demo metadata filtering later.</span>
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dim: <span class="hljs-number">768</span> (<span class="hljs-number">768</span>,)
Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alternatively-Use-fake-representation-with-random-vectors" class="common-anchor-header">[대안] 임의의 벡터로 가짜 표현 사용<button data-href="#Alternatively-Use-fake-representation-with-random-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>네트워크 문제로 인해 모델을 다운로드할 수 없는 경우, 임시방편으로 임의의 벡터를 사용하여 텍스트를 표현하면서도 예제를 완료할 수 있습니다. 벡터는 가짜 벡터이므로 검색 결과에 의미적 유사성이 반영되지 않는다는 점에 유의하세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># Use fake representation with random vectors (768 dimension).</span>
vectors = [[random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">768</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> docs]
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-Data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 데이터를 삽입해 보겠습니다:</p>
<pre><code translate="no" class="language-python">res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{<span class="hljs-string">&#x27;insert_count&#x27;</span>: 3, <span class="hljs-string">&#x27;ids&#x27;</span>: [0, 1, 2], <span class="hljs-string">&#x27;cost&#x27;</span>: 0}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search" class="common-anchor-header">시맨틱 검색<button data-href="#Semantic-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 검색 쿼리 텍스트를 벡터로 표현하여 의미론적 검색을 수행하고 Milvus에서 벡터 유사도 검색을 수행할 수 있습니다.</p>
<h3 id="Vector-search" class="common-anchor-header">벡터 검색</h3><p>Milvus는 동시에 하나 또는 여러 개의 벡터 검색 요청을 받아들입니다. 쿼리_벡터 변수의 값은 벡터의 목록이며, 각 벡터는 실수 배열입니다.</p>
<pre><code translate="no" class="language-python">query_vectors = embedding_fn.encode_queries([<span class="hljs-string">&quot;Who is Alan Turing?&quot;</span>])
<span class="hljs-comment"># If you don&#x27;t have the embedding function you can use a fake vector to finish the demo:</span>
<span class="hljs-comment"># query_vectors = [ [ random.uniform(-1, 1) for _ in range(768) ] ]</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,  <span class="hljs-comment"># target collection</span>
    data=query_vectors,  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">2</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.5859944820404053, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}, {&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.5118255615234375, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>출력은 각각 벡터 검색 쿼리에 매핑되는 결과 목록입니다. 각 쿼리에는 결과 목록이 포함되며, 각 결과에는 엔티티 기본 키, 쿼리 벡터까지의 거리 및 지정된 <code translate="no">output_fields</code> 으로 엔티티 세부 정보가 포함됩니다.</p>
<h2 id="Vector-Search-with-Metadata-Filtering" class="common-anchor-header">메타데이터 필터링을 사용한 벡터 검색<button data-href="#Vector-Search-with-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>메타데이터의 값을 고려하면서 벡터 검색을 수행할 수도 있습니다(Milvus에서는 "스칼라" 필드라고 하며, 스칼라는 벡터가 아닌 데이터를 의미하므로). 이는 특정 기준을 지정하는 필터 표현식을 사용하여 수행됩니다. 다음 예제에서 <code translate="no">subject</code> 필드를 사용하여 검색 및 필터링하는 방법을 살펴보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert more docs in another subject.</span>
docs = [
    <span class="hljs-string">&quot;Machine learning has been used for drug design.&quot;</span>,
    <span class="hljs-string">&quot;Computational synthesis with AI algorithms predicts molecular properties.&quot;</span>,
    <span class="hljs-string">&quot;DDR1 is involved in cancers and fibrosis.&quot;</span>,
]
vectors = embedding_fn.encode_documents(docs)
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span> + i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;biology&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=embedding_fn.encode_queries([<span class="hljs-string">&quot;tell me AI related information&quot;</span>]),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 4, &#x27;distance&#x27;: 0.27030569314956665, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Computational synthesis with AI algorithms predicts molecular properties.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}, {&#x27;id&#x27;: 3, &#x27;distance&#x27;: 0.16425910592079163, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Machine learning has been used for drug design.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>기본적으로 스칼라 필드는 인덱싱되지 않습니다. 대규모 데이터 세트에서 메타데이터 필터링 검색을 수행해야 하는 경우 고정 스키마를 사용하고 <a href="/docs/ko/v2.4.x/scalar_index.md">인덱스를</a> 켜서 검색 성능을 개선하는 것도 고려해 볼 수 있습니다.</p>
<p>벡터 검색 외에도 다른 유형의 검색을 수행할 수도 있습니다:</p>
<h3 id="Query" class="common-anchor-header">쿼리</h3><p>쿼리()는 <a href="/docs/ko/v2.4.x/boolean.md">필터 표현식이나</a> 일부 ID와 일치하는 등 조건에 일치하는 모든 엔터티를 검색하는 작업입니다.</p>
<p>예를 들어, 스칼라 필드에 특정 값이 있는 모든 엔터티를 검색합니다:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>기본 키로 엔티티를 직접 검색합니다:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-Entities" class="common-anchor-header">엔티티 삭제<button data-href="#Delete-Entities" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터를 제거하려면 기본 키를 지정하는 엔티티를 삭제하거나 특정 필터 표현식과 일치하는 모든 엔티티를 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete entities by primary key</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>])

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete entities by a filter expression</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[<span class="hljs-meta">0, 2</span>]
[<span class="hljs-meta">3, 4, 5</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Existing-Data" class="common-anchor-header">기존 데이터 로드<button data-href="#Load-Existing-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스 라이트의 모든 데이터는 로컬 파일에 저장되므로 프로그램이 종료된 후에도 기존 파일로 <code translate="no">MilvusClient</code> 을 생성하여 모든 데이터를 메모리로 로드할 수 있습니다. 예를 들어, 이렇게 하면 "milvus_demo.db" 파일에서 컬렉션을 복구하고 데이터를 계속 쓸 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-the-collection" class="common-anchor-header">컬렉션 삭제<button data-href="#Drop-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 모든 데이터를 삭제하려면 다음을 사용하여 컬렉션을 삭제할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Drop collection</span>
client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Learn-More" class="common-anchor-header">자세히 알아보기<button data-href="#Learn-More" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스 라이트는 로컬 파이썬 프로그램을 시작하기에 좋습니다. 대규모 데이터가 있거나 프로덕션 환경에서 Milvus를 사용하려는 경우, <a href="/docs/ko/v2.4.x/install_standalone-docker.md">Docker</a> 및 <a href="/docs/ko/v2.4.x/install_cluster-milvusoperator.md">Kubernetes에</a> Milvus 배포에 대해 알아볼 수 있습니다. Milvus의 모든 배포 모드는 동일한 API를 공유하므로 다른 배포 모드로 이동하는 경우 클라이언트 측 코드를 크게 변경할 필요가 없습니다. 어디든 배포된 Milvus 서버의 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md">URI와 토큰을</a> 지정하기만 하면 됩니다:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus는 <a href="/docs/ko/v2.4.x/install-pymilvus.md">Python</a>, <a href="/docs/ko/v2.4.x/install-java.md">Java</a>, <a href="/docs/ko/v2.4.x/install-go.md">Go</a>, C#, <a href="/docs/ko/v2.4.x/install-node.md">Node.js</a> 등의 언어로 된 클라이언트 라이브러리와 함께 REST 및 gRPC API를 제공합니다.</p>
