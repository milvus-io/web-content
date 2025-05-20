---
id: integrate_with_voxel51.md
summary: 이 페이지에서는 voxel51과의 통합에 대해 설명합니다.
title: 밀버스 및 피프티원과 함께 비전 검색 수행
---
<h1 id="Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="common-anchor-header">Milvus와 FiftyOne으로 비전 검색 수행하기<button data-href="#Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.voxel51.com/">FiftyOne은</a> 고품질 데이터 세트와 컴퓨터 비전 모델을 구축하기 위한 오픈 소스 도구입니다. 이 가이드는 Milvus의 유사도 검색 기능을 FiftyOne에 통합하여 자체 데이터 세트에서 비전 검색을 수행할 수 있도록 도와줍니다.</p>
<p>FiftyOne은 Python에서 <a href="https://docs.voxel51.com/integrations/milvus.html#milvus-query">프로그래밍 방식으로</a> 또는 앱에서 포인트 앤 클릭을 통해 Milvus 컬렉션을 생성하고, 벡터를 업로드하고, 유사도 쿼리를 실행할 수 있는 API를 제공합니다. 이 페이지의 데모는 프로그래밍 방식의 통합에 중점을 두고 있습니다.</p>
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
<ul>
<li>실행 중인 <a href="/docs/ko/v2.4.x/install_standalone-docker.md">Milvus 서버</a>.</li>
<li><code translate="no">pymilvus</code> 및 <code translate="no">fiftyone</code> 이 설치된 Python 환경.</li>
<li>검색할 이미지 <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">데이터 세트</a>.</li>
</ul>
<h2 id="Installing-Requirements" class="common-anchor-header">설치 요구 사항<button data-href="#Installing-Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예제에서는 <code translate="no">pymilvus</code> 및 <code translate="no">fiftyone</code> 을 사용하겠습니다. 다음 명령을 실행하여 설치할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">python3 -m pip install pymilvus fiftyone torch torchvision
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-recipe" class="common-anchor-header">기본 레시피<button data-href="#Basic-recipe" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus를 사용하여 FiftyOne 데이터 세트에 유사성 인덱스를 생성하고 이를 사용하여 데이터를 쿼리하는 기본 워크플로는 다음과 같습니다:</p>
<ol>
<li><a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">데이터 세트를</a> FiftyOne에 로드합니다.</li>
<li>데이터 세트의 샘플 또는 패치에 대한 벡터 임베딩을 계산하거나 임베딩 생성에 사용할 모델을 선택합니다.</li>
<li>밀버스 임베딩을 생성하려면 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> 매개변수 <code translate="no">backend=&quot;milvus&quot;</code> 를 설정하고 원하는 <code translate="no">brain_key</code> 을 지정하여 데이터 세트의 샘플 또는 개체 패치에 대한 Milvus 유사성 지수를 생성합니다.</li>
<li>이 Milvus 유사성 인덱스를 사용하여 데이터를 쿼리할 때 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.sort_by_similarity"><code translate="no">sort_by_similarity()</code></a>.</li>
<li>원하는 경우 인덱스를 삭제합니다.</li>
</ol>
<h2 id="Procedures" class="common-anchor-header">절차<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 예는 위의 워크플로우를 보여줍니다.</p>
<h3 id="1-Load-a-dataset-into-FiftyOne-and-compute-embeddings-for-the-samples" class="common-anchor-header">1. FiftyOne에 데이터 세트를 로드하고 샘플에 대한 임베딩을 계산합니다.</h3><p>다음 코드는 FiftyOne에서 제공하는 샘플 이미지 세트를 사용하여 통합을 시연합니다. <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">이 문서를</a> 참조하여 자신만의 이미지 세트를 준비할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone <span class="hljs-keyword">as</span> fo
<span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob
<span class="hljs-keyword">import</span> fiftyone.zoo <span class="hljs-keyword">as</span> foz

<span class="hljs-comment"># Step 1: Load your data into FiftyOne</span>
dataset = foz.load_zoo_dataset(<span class="hljs-string">&quot;quickstart&quot;</span>)

<span class="hljs-comment"># Steps 2 and 3: Compute embeddings and create a similarity index</span>
milvus_index = fob.compute_similarity(
    dataset,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Conduct-vision-similarity-searches" class="common-anchor-header">2. 비전 유사도 검색 수행</h3><p>이제 Milvus 유사성 지수를 사용하여 데이터 세트에서 비전 유사성 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 4: Query your data</span>
query = dataset.first().<span class="hljs-built_in">id</span>  <span class="hljs-comment"># query by sample ID</span>
view = dataset.sort_by_similarity(
    query,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    k=<span class="hljs-number">10</span>,  <span class="hljs-comment"># limit to 10 most similar samples</span>
)

<span class="hljs-comment"># Step 5 (optional): Cleanup</span>

<span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index.cleanup()

<span class="hljs-comment"># Delete run record from FiftyOne</span>
dataset.delete_brain_run(<span class="hljs-string">&quot;milvus_index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Delete-the-index" class="common-anchor-header">3. 인덱스 삭제하기</h3><p>Milvus 유사도 인덱스가 더 이상 필요하지 않은 경우 다음 코드를 사용하여 삭제할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 5: Delete the index</span>
milvus_index.delete()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-Milvus-backend" class="common-anchor-header">Milvus 백엔드 사용<button data-href="#Use-the-Milvus-backend" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적으로 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> 또는 <code translate="no">sort_by_similarity()</code> 을 호출하면 스클레인 백엔드가 사용됩니다.</p>
<p>Milvus 백엔드를 사용하려면 선택적 백엔드 매개변수( <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> 를 <code translate="no">&quot;milvus&quot;</code> 로 설정하면 됩니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.<span class="hljs-property">brain</span> <span class="hljs-keyword">as</span> fob

fob.<span class="hljs-title function_">compute_similarity</span>(..., backend=<span class="hljs-string">&quot;milvus&quot;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<p>또는 다음 환경 변수를 설정하여 Milvus 백엔드를 사용하도록 FiftyOne을 영구적으로 구성할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">FIFTYONE_BRAIN_DEFAULT_SIMILARITY_BACKEND</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>또는 <code translate="no">~/.fiftyone/brain_config.json</code> 에 위치한 <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">뇌 구성의</a> <code translate="no">default_similarity_backend</code> 파라미터를 설정하여 설정할 수 있습니다:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;default_similarity_backend&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Authentication" class="common-anchor-header">인증<button data-href="#Authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자 지정 Milvus 서버를 사용하는 경우 다양한 방법으로 자격 증명을 제공할 수 있습니다.</p>
<h3 id="Environment-variables-recommended" class="common-anchor-header">환경 변수(권장)</h3><p>Milvus 자격 증명을 구성하는 권장 방법은 아래 표시된 환경 변수에 저장하는 것이며, 이 변수는 Milvus에 연결될 때마다 FiftyOne에서 자동으로 액세스합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_URI=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_USER=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_PASSWORD=XXXXXX

<span class="hljs-comment"># also available if necessary</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SECURE=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_TOKEN=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_DB_NAME=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_KEY_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CA_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_NAME=XXXXXX
<button class="copy-code-btn"></button></code></pre>
<h3 id="FiftyOne-Brain-config" class="common-anchor-header">피프티원 브레인 설정</h3><p><code translate="no">~/.fiftyone/brain_config.json</code> 에 위치한 <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">뇌 구성에</a> 자격 증명을 저장할 수도 있습니다:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;password&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,

            <span class="hljs-comment"># also available if necessary</span>
            <span class="hljs-string">&quot;secure&quot;</span>: true,
            <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_key_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;ca_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>이 파일은 생성할 때까지 존재하지 않는다는 점에 유의하세요.</p>
<h3 id="Keyword-arguments" class="common-anchor-header">키워드 인수</h3><p>다음과 같은 메서드를 호출할 때마다 Milvus 자격 증명을 키워드 인자로 수동으로 제공할 수 있습니다. <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> 와 같은 메서드를 호출할 때마다 키워드 인자로 Milvus 자격 증명을 수동으로 제공할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

milvus_index = fob.compute_similarity(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>이 전략을 사용하는 경우 나중에 인덱스를 로드할 때 다음을 통해 자격 증명을 수동으로 제공해야 합니다. <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>:</p>
<pre><code translate="no" class="language-python">milvus_index = dataset.load_brain_results(
    <span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-config-parameters" class="common-anchor-header">Milvus 구성 매개변수</h3><p>Milvus 백엔드는 유사도 쿼리를 사용자 정의하는 데 사용할 수 있는 다양한 쿼리 매개변수를 지원합니다. 이러한 매개변수는 다음과 같습니다:</p>
<ul>
<li><p><strong>collection_name</strong><em>(없음</em>): 사용하거나 생성할 Milvus 컬렉션의 이름입니다. 아무것도 제공되지 않으면 새 컬렉션이 생성됩니다.</p></li>
<li><p><strong>metric</strong> (<em>"dotproduct")</em>: 새 인덱스를 생성할 때 사용할 임베딩 거리 메트릭입니다. 지원되는 값은 (<code translate="no">&quot;dotproduct&quot;</code>, <code translate="no">&quot;euclidean&quot;</code>)</p></li>
<li><p><strong>일관성_레벨</strong> (<em>"세션")</em>: 사용할 일관성 수준입니다. 지원되는 값은 (<code translate="no">&quot;Strong&quot;</code>, <code translate="no">&quot;Session&quot;</code>, <code translate="no">&quot;Bounded&quot;</code>, <code translate="no">&quot;Eventually&quot;</code>)입니다.</p></li>
</ul>
<p>이러한 매개변수에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/authenticate.md">Milvus 인증 문서</a> 및 <a href="/docs/ko/v2.4.x/consistency.md">Milvus 일관성 수준 문서를</a> 참조하세요.</p>
<p>이전 섹션에서 설명한 전략 중 하나를 통해 이러한 매개변수를 지정할 수 있습니다. 다음은 사용 가능한 모든 파라미터를 포함하는 <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">브레인 구성의</a> 예입니다:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;your_collection&quot;</span>,
            <span class="hljs-string">&quot;metric&quot;</span>: <span class="hljs-string">&quot;dotproduct&quot;</span>,
            <span class="hljs-string">&quot;consistency_level&quot;</span>: <span class="hljs-string">&quot;Strong&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>그러나 일반적으로 이러한 매개변수는 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> 에 직접 전달하여 특정 새 인덱스를 구성합니다:</p>
<pre><code translate="no" class="language-python">milvus_index = fob.<span class="hljs-title function_">compute_similarity</span>(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    metric=<span class="hljs-string">&quot;dotproduct&quot;</span>,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-brain-runs" class="common-anchor-header">브레인 런 관리<button data-href="#Manage-brain-runs" class="anchor-icon" translate="no">
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
    </button></h2><p>FiftyOne은 브레인 런을 관리하는 데 사용할 수 있는 다양한 방법을 제공합니다.</p>
<p>예를 들어 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.list_brain_runs"><code translate="no">list_brain_runs()</code></a> 를 호출하여 데이터 세트에서 사용 가능한 브레인 키를 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

<span class="hljs-comment"># List all brain runs</span>
dataset.list_brain_runs()

<span class="hljs-comment"># Only list similarity runs</span>
dataset.list_brain_runs(<span class="hljs-built_in">type</span>=fob.Similarity)

<span class="hljs-comment"># Only list specific similarity runs</span>
dataset.list_brain_runs(
    <span class="hljs-built_in">type</span>=fob.Similarity,
    patches_field=<span class="hljs-string">&quot;ground_truth&quot;</span>,
    supports_prompts=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>또는 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.get_brain_info"><code translate="no">get_brain_info()</code></a> 를 사용하여 브레인 런의 구성에 대한 정보를 검색할 수 있습니다:</p>
<pre><code translate="no" class="language-python">info = dataset.get_brain_info(brain_key)
<span class="hljs-built_in">print</span>(info)
<button class="copy-code-btn"></button></code></pre>
<p>사용 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a> 를 사용하여 <a href="https://docs.voxel51.com/api/fiftyone.brain.similarity.html#fiftyone.brain.similarity.SimilarityIndex"><code translate="no">SimilarityIndex</code></a> 인스턴스를 로드할 때 사용합니다.</p>
<p>다음을 사용할 수 있습니다. <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.rename_brain_run"><code translate="no">rename_brain_run()</code></a> 을 사용하여 기존 유사도 결과 실행과 연결된 브레인 키의 이름을 바꿀 수 있습니다:</p>
<pre><code translate="no" class="language-python">dataset.rename_brain_run(brain_key, new_brain_key)
<button class="copy-code-btn"></button></code></pre>
<p>마지막으로 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> 을 사용하여 브레인 런을 삭제할 수 있습니다:</p>
<pre><code translate="no" class="language-python">dataset.delete_brain_run(brain_key)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>호출 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> 을 호출하면 FiftyOne 데이터 세트에서 브레인 런의 레코드만 삭제되며, 연결된 Milvus 컬렉션은 삭제되지 않으며, 다음과 같이 할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index = dataset.load_brain_results(brain_key)
milvus_index.cleanup()
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Milvus 백엔드를 사용하는 FiftyOne 데이터 세트의 일반적인 벡터 검색 워크플로에 대해서는 <a href="https://docs.voxel51.com/integrations/milvus.html#examples">여기에서 예제를</a> 참조하세요.</p>
