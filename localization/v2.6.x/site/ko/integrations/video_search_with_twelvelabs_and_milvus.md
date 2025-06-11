---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  멀티모달 임베딩을 생성하기 위한 Twelve Labs의 임베드 API를 Milvus와 통합하여 시맨틱 비디오 검색 애플리케이션을 만드는
  방법을 알아보세요. 개발 환경 설정부터 하이브리드 검색 및 시간별 동영상 분석과 같은 고급 기능 구현까지 전체 과정을 다루며, 정교한 동영상
  콘텐츠 분석 및 검색 시스템을 구축하기 위한 포괄적인 기반을 제공합니다.
title: '고급 비디오 검색: 시맨틱 검색을 위한 Twelve Labs와 Milvus 활용하기'
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">고급 비디오 검색: 시맨틱 검색을 위한 Twelve Labs와 Milvus 활용하기<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">소개<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.twelvelabs.io/docs/create-embeddings">Twelve Labs Embed API와</a> Milvus를 사용해 시맨틱 비디오 검색을 구현하는 방법에 대한 종합적인 튜토리얼에 오신 것을 환영합니다. 이 가이드에서는 <a href="https://www.twelvelabs.io/blog/multimodal-embeddings">Twelve Labs의 고급 멀티모달 임베딩과</a> <a href="https://milvus.io/intro">Milvus의 효율적인 벡터 데이터베이스를</a> 활용하여 강력한 동영상 검색 솔루션을 구축하는 방법을 살펴봅니다. 이러한 기술을 통합함으로써 개발자는 동영상 콘텐츠 분석의 새로운 가능성을 열어 콘텐츠 기반 동영상 검색, 추천 시스템, 동영상 데이터의 뉘앙스를 이해하는 정교한 검색 엔진과 같은 애플리케이션을 구현할 수 있습니다.</p>
<p>이 튜토리얼에서는 개발 환경 설정부터 기능적인 시맨틱 비디오 검색 애플리케이션 구현까지 전체 프로세스를 안내합니다. 동영상에서 멀티모달 임베딩 생성하기, Milvus에 효율적으로 저장하기, 유사도 검색을 수행하여 관련 콘텐츠를 검색하기 등의 핵심 개념을 다룹니다. 동영상 분석 플랫폼, 콘텐츠 검색 도구를 구축하든, 동영상 검색 기능으로 기존 애플리케이션을 개선하든, 이 가이드는 Twelve Labs와 Milvus의 강점을 프로젝트에 활용할 수 있는 지식과 실용적인 단계를 제공합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>시작하기 전에 다음이 준비되어 있는지 확인하세요:</p>
<p>Twelve Labs API 키(키가 없는 경우 https://api.twelvelabs.io 에서 등록) 시스템에 설치된 Python 3.7 이상 버전</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">개발 환경 설정<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>프로젝트를 위한 새 디렉토리를 만들고 해당 디렉토리로 이동합니다:</p>
<pre><code translate="no" class="language-shell">mkdir video-search-tutorial
cd video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>가상 환경을 설정합니다(선택 사항이지만 권장 사항):</p>
<pre><code translate="no" class="language-shell">python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
<button class="copy-code-btn"></button></code></pre>
<p>필요한 Python 라이브러리를 설치합니다:</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>프로젝트를 위한 새 Python 파일을 만듭니다:</p>
<pre><code translate="no" class="language-shell">touch video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>이 video_search.py 파일이 튜토리얼에 사용하는 기본 스크립트가 됩니다. 다음으로 보안을 위해 Twelve Labs API 키를 환경 변수로 설정합니다:</p>
<pre><code translate="no" class="language-shell">export TWELVE_LABS_API_KEY=&#x27;your_api_key_here&#x27;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">Milvus에 연결하기<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus와의 연결을 설정하기 위해 MilvusClient 클래스를 사용합니다. 이 접근 방식은 연결 프로세스를 간소화하고 로컬 파일 기반 Milvus 인스턴스로 작업할 수 있어 튜토리얼에 적합합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>이 코드는 밀버스_트와엘랩스_데모라는 파일에 모든 데이터를 저장하는 새로운 밀버스 클라이언트 인스턴스를 생성합니다. 이 파일 기반 접근 방식은 개발 및 테스트 목적에 이상적입니다.</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">동영상 임베딩을 위한 Milvus 컬렉션 만들기<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 Milvus에 연결되었으므로 동영상 임베딩과 관련 메타데이터를 저장할 컬렉션을 만들어 보겠습니다. 컬렉션 스키마를 정의하고 컬렉션이 아직 존재하지 않는 경우 컬렉션을 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>이 코드에서는 먼저 컬렉션이 이미 존재하는지 확인하고 존재하는 경우 삭제합니다. 이렇게 하면 깨끗한 상태에서 시작할 수 있습니다. 컬렉션의 크기는 1024이며, 이는 Twelve Labs 임베딩의 출력 크기와 일치합니다.</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">Twelve Labs 임베드 API로 임베딩 생성하기<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>Twelve Labs 임베드 API를 사용하여 동영상에 대한 임베딩을 생성하기 위해 Twelve Labs Python SDK를 사용합니다. 이 프로세스에는 임베딩 작업을 생성하고, 완료될 때까지 기다린 다음, 결과를 검색하는 과정이 포함됩니다. 이를 구현하는 방법은 다음과 같습니다:</p>
<p>먼저 Twelve Labs SDK가 설치되어 있는지 확인하고 필요한 모듈을 가져옵니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">Twelve Labs 클라이언트를 초기화합니다:<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>지정된 동영상 URL에 대한 임베딩을 생성하는 함수를 생성합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>이 함수를 사용하여 동영상에 대한 임베딩을 생성합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>이 구현을 통해 Twelve Labs Embed API를 사용하여 모든 동영상 URL에 대한 임베딩을 생성할 수 있습니다. generate_embedding 함수는 작업 생성부터 결과 검색까지 전체 프로세스를 처리합니다. 이 함수는 메타데이터(시간 범위 및 범위)와 함께 임베딩 벡터가 포함된 사전 목록을 반환하며, 프로덕션 환경에서는 네트워크 문제나 API 제한과 같은 잠재적인 오류를 처리해야 한다는 점을 잊지 마세요. 또한 특정 사용 사례에 따라 재시도 또는 보다 강력한 오류 처리를 구현할 수도 있습니다.</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">Milvus에 임베딩 삽입하기<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Twelve Labs Embed API를 사용하여 임베딩을 생성한 다음 단계는 이러한 임베딩을 메타데이터와 함께 Milvus 컬렉션에 삽입하는 것입니다. 이 과정을 통해 나중에 효율적인 유사도 검색을 위해 동영상 임베딩을 저장하고 색인을 생성할 수 있습니다.</p>
<p>Milvus에 임베딩을 삽입하는 방법은 다음과 같습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>이 기능은 임베딩 벡터, 시간 범위, 소스 동영상 URL 등 모든 관련 메타데이터를 포함하여 삽입할 데이터를 준비합니다. 그런 다음 Milvus 클라이언트를 사용하여 이 데이터를 지정된 컬렉션에 삽입합니다.</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">유사도 검색 수행<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>임베딩이 Milvus에 저장되면 유사도 검색을 수행하여 쿼리 벡터를 기반으로 가장 관련성이 높은 동영상 세그먼트를 찾을 수 있습니다. 이 기능을 구현하는 방법은 다음과 같습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>이 구현은 다음을 수행합니다:</p>
<ol>
<li>쿼리 벡터를 받아 Milvus 컬렉션에서 유사한 임베딩을 검색하는 함수 perform_similarity_search를 정의합니다.</li>
<li>Milvus 클라이언트의 검색 방법을 사용하여 가장 유사한 벡터를 찾습니다.</li>
<li>일치하는 동영상 세그먼트에 대한 메타데이터를 포함하여 검색할 출력 필드를 지정합니다.</li>
<li>쿼리 동영상에 이 함수를 사용하여 먼저 임베딩을 생성한 다음 검색에 사용하는 예시를 제공합니다.</li>
<li>관련 메타데이터 및 유사도 점수를 포함한 검색 결과를 인쇄합니다.</li>
</ol>
<p>이러한 기능을 구현하면 Milvus에 동영상 임베딩을 저장하고 유사도 검색을 수행하는 완벽한 워크플로우를 만들 수 있습니다. 이 설정을 통해 Twelve Labs의 임베드 API에서 생성된 멀티모달 임베딩을 기반으로 유사한 동영상 콘텐츠를 효율적으로 검색할 수 있습니다.</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">성능 최적화<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>자, 이제 이 앱을 한 단계 업그레이드해 봅시다! 대규모 동영상 컬렉션을 다룰 때는 <strong>성능이 핵심입니다</strong>. 최적화를 위해서는 <a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">임베딩 생성 및 삽입을 위한 일괄 처리를 Milvus에</a> 구현해야 합니다. 이렇게 하면 여러 동영상을 동시에 처리할 수 있어 전체 처리 시간을 크게 단축할 수 있습니다. 또한 <a href="https://milvus.io/docs/v2.2.x/partition_key.md">Milvus의 파티셔닝 기능을</a> 활용하여 동영상 카테고리 또는 기간별로 데이터를 보다 효율적으로 구성할 수 있습니다. 이렇게 하면 관련성이 높은 파티션만 검색할 수 있어 쿼리 속도가 빨라집니다.</p>
<p>또 다른 최적화 요령은 <strong>자주 액세스하는 임베딩이나 검색 결과에 캐싱 메커니즘을 사용하는</strong> 것입니다. 이렇게 하면 인기 있는 쿼리의 응답 시간을 크게 개선할 수 있습니다. 특정 데이터 세트와 쿼리 패턴에 따라 <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">Milvus의 인덱스 매개변수를 미세 조정하는</a> 것을 잊지 마세요. 여기서 약간의 조정만으로도 검색 성능을 향상시키는 데 큰 도움이 될 수 있습니다.</p>
<h2 id="Advanced-Features" class="common-anchor-header">고급 기능<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 앱을 돋보이게 하는 몇 가지 멋진 기능을 추가해 보겠습니다! <strong>텍스트와 동영상 쿼리를 결합하는 하이브리드 검색을</strong> 구현할 수 있습니다. 실제로 <a href="https://docs.twelvelabs.io/docs/create-text-embeddings">Twelve Labs 임베드 API는 텍스트 쿼리에 대한 텍스트 임베딩도 생성할 수 있습니다</a>. 사용자가 텍스트 설명과 샘플 동영상 클립을 모두 입력할 수 있다고 상상해 보세요. 이 두 가지 모두에 대한 임베딩을 생성하고 Milvus에서 가중치 검색을 수행합니다. 이렇게 하면 매우 정확한 결과를 얻을 수 있습니다.</p>
<p>또 다른 멋진 추가 기능은 <strong>동영상 내 일시적 검색입니다</strong>. <a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">긴 동영상을 각각 고유한 임베딩이 있는 작은 세그먼트로 나눌 수 있습니다</a>. 이렇게 하면 사용자는 전체 클립뿐만 아니라 동영상 내에서 특정 순간을 찾을 수 있습니다. 그리고 기본적인 동영상 분석 기능도 추가하면 어떨까요? 임베딩을 사용하여 유사한 동영상 세그먼트를 클러스터링하고, 추세를 감지하거나, 대규모 동영상 컬렉션에서 이상값을 식별할 수도 있습니다.</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">오류 처리 및 로깅<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>현실을 직시하자, 문제가 발생할 수 있으며, 문제가 발생하면 이에 대비해야 합니다. <strong>강력한 오류 처리 기능을 구현하는 것이 중요합니다</strong>. <a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">API 호출과 데이터베이스 작업을 시도 예외 블록으로 래핑하여</a> 실패 시 사용자에게 유익한 오류 메시지를 제공해야 합니다. 네트워크 관련 문제의 경우 <a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">기하급수적 백오프를 사용하여 재시도를 구현하면</a> 일시적인 결함을 원활하게 처리하는 데 도움이 될 수 있습니다.</p>
<p><strong>로깅은 디버깅과 모니터링을 위한 가장 좋은 친구입니다</strong>. 애플리케이션 전체에서 중요한 이벤트, 오류 및 성능 메트릭을 추적하려면 <a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">Python의 로깅 모듈을</a> 사용해야 합니다. 개발을 위한 DEBUG, 일반 운영을 위한 INFO, 중요한 문제를 위한 ERROR 등 다양한 로그 수준을 설정해 보겠습니다. 그리고 파일 크기를 관리하기 위해 로그 로테이션을 구현하는 것도 잊지 마세요. 적절한 로깅을 설정하면 문제를 신속하게 식별하고 해결할 수 있으므로 확장 시에도 동영상 검색 앱이 원활하게 실행될 수 있습니다.</p>
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
    </button></h2><p>축하합니다! 이제 Twelve Labs의 Embed API와 Milvus를 사용하여 강력한 시맨틱 동영상 검색 애플리케이션을 구축하셨습니다. 이 통합을 통해 전례 없는 정확도와 효율성으로 동영상 콘텐츠를 처리, 저장 및 검색할 수 있습니다. 멀티모달 임베딩을 활용하면 동영상 데이터의 뉘앙스를 이해하는 시스템을 구축하여 콘텐츠 검색, 추천 시스템 및 고급 동영상 분석에 대한 흥미로운 가능성을 열 수 있습니다.</p>
<p>애플리케이션을 계속 개발하고 개선해 나가면서 Twelve Labs의 고급 임베딩 생성 기능과 Milvus의 확장 가능한 벡터 스토리지의 조합은 훨씬 더 복잡한 동영상 이해 문제를 해결할 수 있는 강력한 기반을 제공한다는 점을 기억하세요. 앞서 설명한 고급 기능을 실험해보고 동영상 검색 및 분석의 한계를 뛰어넘어보시기 바랍니다.</p>
