---
id: movie_recommendation_with_milvus.md
summary: >-
  이 노트북에서는 OpenAI를 사용해 영화 설명의 임베딩을 생성하고 Milvus 내에서 이러한 임베딩을 활용하여 사용자의 취향에 맞는 영화를
  추천하는 방법을 살펴봅니다. 검색 결과를 향상시키기 위해 필터링을 활용하여 메타데이터 검색을 수행합니다. 이 예제에 사용된 데이터 세트는
  HuggingFace 데이터 세트에서 제공되며 8,000개 이상의 영화 항목을 포함하고 있어 영화 추천을 위한 풍부한 옵션 풀을 제공합니다.
title: Milvus로 영화 추천하기
---
<h1 id="Movie-Recommendation-with-Milvus" class="common-anchor-header">Milvus로 영화 추천하기<button data-href="#Movie-Recommendation-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/movie_recommendation_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/movie_recommendation_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>이 노트북에서는 OpenAI를 사용해 영화 설명의 임베딩을 생성하고 Milvus 내에서 이러한 임베딩을 활용하여 사용자의 취향에 맞는 영화를 추천하는 방법을 살펴봅니다. 검색 결과를 향상시키기 위해 필터링을 활용하여 메타데이터 검색을 수행합니다. 이 예제에 사용된 데이터 세트는 HuggingFace 데이터 세트에서 제공되며 8,000개 이상의 영화 항목을 포함하고 있어 영화 추천을 위한 풍부한 옵션 풀을 제공합니다.</p>
<h2 id="Dependencies-and-Environment" class="common-anchor-header">종속성 및 환경<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 명령을 실행하여 종속 요소를 설치할 수 있습니다:</p>
<pre><code translate="no" class="language-python">$ pip install openai pymilvus datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속 요소를 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 '런타임' 메뉴를 클릭하고 드롭다운 메뉴에서 '세션 다시 시작'을 선택).</p>
<p>이 예제에서는 OpenAI를 LLM으로 사용하겠습니다. 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-OpenAI-client-and-Milvus" class="common-anchor-header">OpenAI 클라이언트 및 Milvus 초기화하기<button data-href="#Initialize-OpenAI-client-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>OpenAI 클라이언트를 초기화합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

openai_client = <span class="hljs-title class_">OpenAI</span>()
<button class="copy-code-btn"></button></code></pre>
<p>임베딩에 대한 컬렉션 이름과 차원을 설정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;movie_search&quot;</span>
<span class="hljs-variable constant_">DIMENSION</span> = <span class="hljs-number">1536</span>

<span class="hljs-variable constant_">BATCH_SIZE</span> = <span class="hljs-number">1000</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus에 연결합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Database</span>
client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">url</code> 및 <code translate="no">token</code> 의 인수를 사용합니다:</p>
<ul>
<li><code translate="no">uri</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하여 모든 데이터를 이 파일에 저장하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대량의 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에</a> 더 성능이 좋은 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "&lt;사용자 이름&gt;:&lt;사용자 비밀번호&gt;"를 사용하고, 그렇지 않은 경우 토큰을 설정하지 마세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 를 조정합니다.</li>
</ul>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Remove collection if it already exists</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<p>아이디, 제목, 유형, 출시 연도, 등급, 설명 등 컬렉션의 필드를 정의합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

<span class="hljs-comment"># Create collection which includes the id, title, and embedding.</span>

<span class="hljs-comment"># 1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># 2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;type&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;release_year&quot;</span>, datatype=DataType.INT64)
schema.add_field(field_name=<span class="hljs-string">&quot;rating&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;description&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)

<span class="hljs-comment"># 3. Create collection with the schema</span>
client.create_collection(collection_name=COLLECTION_NAME, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>컬렉션에 인덱스를 생성하고 로드합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create the index on the collection and load it.</span>

<span class="hljs-comment"># 1. Prepare index parameters</span>
index_params = client.prepare_index_params()


<span class="hljs-comment"># 2. Add an index on the embedding field</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, params={}
)


<span class="hljs-comment"># 3. Create index</span>
client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)


<span class="hljs-comment"># 4. Load collection</span>
client.load_collection(collection_name=COLLECTION_NAME, replica_number=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Dataset" class="common-anchor-header">데이터 세트<button data-href="#Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus가 실행되면 데이터 수집을 시작할 수 있습니다. <code translate="no">Hugging Face Datasets</code> 은 다양한 사용자 데이터 세트를 보유하고 있는 허브로, 이 예제에서는 HuggingLearners의 netflix-shows 데이터 세트를 사용합니다. 이 데이터 세트에는 8천 개 이상의 영화에 대한 영화와 해당 메타데이터 쌍이 포함되어 있습니다. 각 설명을 임베드하고 제목, 유형, 개봉 연도 및 등급과 함께 Milvus 내에 저장하겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

dataset = <span class="hljs-title function_">load_dataset</span>(<span class="hljs-string">&quot;hugginglearners/netflix-shows&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-the-Data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 데이터가 컴퓨터에 저장되었으므로 데이터를 임베드하여 Milvus에 삽입할 수 있습니다. 임베딩 함수는 텍스트를 받아 목록 형식으로 임베딩을 반환합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_texts</span>(<span class="hljs-params">texts</span>):
    res = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=texts, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
    <span class="hljs-keyword">return</span> [res_data.embedding <span class="hljs-keyword">for</span> res_data <span class="hljs-keyword">in</span> res.data]
<button class="copy-code-btn"></button></code></pre>
<p>다음 단계에서는 실제 삽입을 수행합니다. 모든 항목을 반복하고 설정한 배치 크기에 도달하면 삽입할 배치를 만듭니다. 루프가 끝나면 마지막 남은 배치가 있으면 삽입합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

<span class="hljs-comment"># batch (data to be inserted) is a list of dictionaries</span>
batch = []

<span class="hljs-comment"># Embed and insert in batches</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> tqdm(<span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(dataset))):
    batch.append(
        {
            <span class="hljs-string">&quot;title&quot;</span>: dataset[i][<span class="hljs-string">&quot;title&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
            <span class="hljs-string">&quot;type&quot;</span>: dataset[i][<span class="hljs-string">&quot;type&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
            <span class="hljs-string">&quot;release_year&quot;</span>: dataset[i][<span class="hljs-string">&quot;release_year&quot;</span>] <span class="hljs-keyword">or</span> -<span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: dataset[i][<span class="hljs-string">&quot;rating&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
            <span class="hljs-string">&quot;description&quot;</span>: dataset[i][<span class="hljs-string">&quot;description&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
        }
    )

    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) % BATCH_SIZE == <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> i == <span class="hljs-built_in">len</span>(dataset) - <span class="hljs-number">1</span>:
        embeddings = emb_texts([item[<span class="hljs-string">&quot;description&quot;</span>] <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> batch])

        <span class="hljs-keyword">for</span> item, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch, embeddings):
            item[<span class="hljs-string">&quot;embedding&quot;</span>] = emb

        client.insert(collection_name=COLLECTION_NAME, data=batch)
        batch = []
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-the-Database" class="common-anchor-header">데이터베이스 쿼리<button data-href="#Query-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터가 Milvus에 안전하게 삽입되었으므로 이제 쿼리를 수행할 수 있습니다. 쿼리는 검색하려는 동영상 설명과 사용할 필터의 튜플을 가져옵니다. 필터에 대한 자세한 정보는 <a href="https://milvus.io/docs/boolean.md">여기에서</a> 확인할 수 있습니다. 검색은 먼저 설명과 필터 표현식을 출력합니다. 그런 다음 각 결과에 대해 결과 영화의 점수, 제목, 유형, 개봉 연도, 등급 및 설명을 인쇄합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap


<span class="hljs-keyword">def</span> <span class="hljs-title function_">query</span>(<span class="hljs-params">query, top_k=<span class="hljs-number">5</span></span>):
    text, expr = query

    res = client.search(
        collection_name=COLLECTION_NAME,
        data=emb_texts(text),
        <span class="hljs-built_in">filter</span>=expr,
        limit=top_k,
        output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;release_year&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>],
        search_params={
            <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
            <span class="hljs-string">&quot;params&quot;</span>: {},
        },
    )

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Description:&quot;</span>, text, <span class="hljs-string">&quot;Expression:&quot;</span>, expr)

    <span class="hljs-keyword">for</span> hit_group <span class="hljs-keyword">in</span> res:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
        <span class="hljs-keyword">for</span> rank, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(hit_group, start=<span class="hljs-number">1</span>):
            entity = hit[<span class="hljs-string">&quot;entity&quot;</span>]

            <span class="hljs-built_in">print</span>(
                <span class="hljs-string">f&quot;\tRank: <span class="hljs-subst">{rank}</span> Score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:}</span> Title: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;title&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span>&quot;</span>
            )
            <span class="hljs-built_in">print</span>(
                <span class="hljs-string">f&quot;\t\tType: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;type&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span> &quot;</span>
                <span class="hljs-string">f&quot;Release Year: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;release_year&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span> &quot;</span>
                <span class="hljs-string">f&quot;Rating: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;rating&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span>&quot;</span>
            )
            description = entity.get(<span class="hljs-string">&quot;description&quot;</span>, <span class="hljs-string">&quot;&quot;</span>)
            <span class="hljs-built_in">print</span>(textwrap.fill(description, width=<span class="hljs-number">88</span>))
            <span class="hljs-built_in">print</span>()


my_query = (<span class="hljs-string">&quot;movie about a fluffly animal&quot;</span>, <span class="hljs-string">&#x27;release_year &lt; 2019 and rating like &quot;PG%&quot;&#x27;</span>)

query(my_query)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Description: movie about a fluffly animal Expression: release_year &lt; 2019 and rating like &quot;PG%&quot;
Results:
    Rank: 1 Score: 0.42213767766952515 Title: The Adventures of Tintin
        Type: Movie Release Year: 2011 Rating: PG
This 3-D motion capture adapts Georges Remi's classic comic strip about the adventures
of fearless young journalist Tintin and his trusty dog, Snowy.

    Rank: 2 Score: 0.4041026830673218 Title: Hedgehogs
        Type: Movie Release Year: 2016 Rating: PG
When a hedgehog suffering from memory loss forgets his identity, he ends up on a big
city journey with a pigeon to save his habitat from a human threat.

    Rank: 3 Score: 0.3980264663696289 Title: Osmosis Jones
        Type: Movie Release Year: 2001 Rating: PG
Peter and Bobby Farrelly outdo themselves with this partially animated tale about an
out-of-shape 40-year-old man who's the host to various organisms.

    Rank: 4 Score: 0.39479154348373413 Title: The Lamb
        Type: Movie Release Year: 2017 Rating: PG
A big-dreaming donkey escapes his menial existence and befriends some free-spirited
animal pals in this imaginative retelling of the Nativity Story.

    Rank: 5 Score: 0.39370301365852356 Title: Open Season 2
        Type: Movie Release Year: 2008 Rating: PG
Elliot the buck and his forest-dwelling cohorts must rescue their dachshund pal from
some spoiled pets bent on returning him to domesticity.
</code></pre>
