---
id: integrate_with_sentencetransformers.md
summary: 이 페이지에서는 Milvus를 사용한 동영상 검색에 대해 설명합니다.
title: Milvus와 SentenceTransformers를 사용한 영화 검색
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">Milvus와 SentenceTransformers를 사용한 영화 검색<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
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
    </button></h1><p>이 예제에서는 Milvus와 SentenceTransformers 라이브러리를 사용해 Wikipedia 문서를 검색하는 방법을 살펴보겠습니다. 우리가 검색할 데이터 세트는 HuggingFace에서 호스팅되는 <a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">요약이 포함된 Wikipedia 영화 플롯입니다</a>.</p>
<p>시작해 봅시다!</p>
<h2 id="Required-Libraries" class="common-anchor-header">필요한 라이브러리<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예제에서는 Milvus를 사용하기 위해 <code translate="no">pymilvus</code>, 벡터 임베딩을 생성하기 위해 <code translate="no">sentence-transformers</code>, 예제 데이터 세트를 다운로드하기 위해 <code translate="no">datasets</code> 을 사용할 것입니다.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, connections
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">Collection</span>
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> <span class="hljs-title class_">SentenceTransformer</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>몇 가지 전역 매개변수를 정의하겠습니다,</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">데이터 세트 다운로드 및 열기<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">datasets</code> 에서 한 줄로 데이터 세트를 다운로드하고 열 수 있습니다. 라이브러리는 데이터 집합을 로컬에 캐시하고 다음에 실행할 때 해당 복사본을 사용합니다. 각 행에는 Wikipedia 문서가 첨부된 영화에 대한 세부 정보가 포함되어 있습니다. <code translate="no">Title</code> 및 <code translate="no">PlotSummary</code> 열만 사용합니다.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, <span class="hljs-built_in">split</span>=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">데이터베이스에 연결하기<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 Milvus 설정을 시작하겠습니다. 단계는 다음과 같습니다:</p>
<ol>
<li>로컬 파일에 Milvus Lite 데이터베이스를 만듭니다. (이 URI를 Milvus 독립형 및 Milvus 배포용 서버 주소로 바꿉니다.).</li>
</ol>
<pre><code translate="no" class="language-python">connections.<span class="hljs-title function_">connect</span>(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>데이터 스키마를 생성합니다. 여기에는 벡터 임베딩의 차원을 포함하여 요소를 구성하는 필드가 지정됩니다.</li>
</ol>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;title&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim)
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
collection = Collection(name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>벡터 검색 인덱싱 알고리즘을 정의합니다. Milvus Lite는 무차별 대입 검색과 HNSW를 구현하는 반면, Milvus Standalone과 Milvus Distributed는 다양한 방법을 구현합니다. 이 정도의 데이터 규모라면 순진한 무차별 대입 검색으로도 충분합니다.</li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">params</span> = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;FLAT&quot;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&quot;IP&quot;</span>
    }

collection.create_index(
    <span class="hljs-string">&#x27;embedding&#x27;</span>,
    <span class="hljs-keyword">params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 단계가 완료되면 데이터를 컬렉션에 삽입하고 검색을 수행할 준비가 된 것입니다. 추가된 모든 데이터는 자동으로 색인화되어 즉시 검색에 사용할 수 있습니다. 데이터가 매우 새 데이터인 경우, 아직 색인화 중인 데이터에 대해 무차별 대입 검색이 사용되므로 검색 속도가 느려질 수 있습니다.</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">데이터 삽입하기<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예제에서는 SentenceTransformers miniLM 모델을 사용하여 플롯 텍스트의 임베딩을 만들겠습니다. 이 모델은 384차원 임베딩을 반환합니다.</p>
<pre><code translate="no" class="language-python">model = <span class="hljs-title class_">SentenceTransformer</span>(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>데이터의 행을 반복하고, 플롯 요약 필드를 임베드하고, 엔티티를 벡터 데이터베이스에 삽입합니다. 일반적으로 이 단계는 여기처럼 임베딩 모델의 CPU 또는 GPU 처리량을 최대화하기 위해 데이터 항목의 배치에 대해 수행해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch in <span class="hljs-title function_">tqdm</span><span class="hljs-params">(ds.batch(batch_size=<span class="hljs-number">512</span>)</span>):
    embeddings = model.encode(batch[<span class="hljs-string">&#x27;PlotSummary&#x27;</span>])
    data = [{<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding} <span class="hljs-keyword">for</span> title, embedding in <span class="hljs-title function_">zip</span><span class="hljs-params">(batch[<span class="hljs-string">&#x27;Title&#x27;</span>], embeddings)</span>]
    res = collection.insert(data=data)
<button class="copy-code-btn"></button></code></pre>
<p>안전을 위해 데이터 쓰기 대기열을 플러시하고 예상되는 요소 수가 데이터베이스에 있는지 확인합니다.</p>
<pre><code translate="no" class="language-python">collection.flush()
<span class="hljs-built_in">print</span>(collection.num_entities)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>임베딩에는 시간이 걸리기 때문에 위의 작업은 상대적으로 시간이 많이 걸립니다. 이 단계는 2023 MacBook Pro의 CPU를 사용하면 약 2분이 소요되며, 전용 GPU를 사용하면 훨씬 더 빨라집니다. 잠시 휴식을 취하며 커피 한 잔을 즐기세요!</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">검색 수행하기<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에 모든 데이터를 삽입했으면 검색을 시작할 수 있습니다. 이 예에서는 줄거리를 기준으로 영화를 검색하겠습니다. 일괄 검색을 수행하기 때문에 검색 시간은 영화 검색에 걸쳐 공유됩니다. (영화 검색을 기반으로 의도한 결과가 무엇인지 짐작할 수 있을까요?)</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&#x27;A shark terrorizes an LA beach.&#x27;</span>,
    <span class="hljs-string">&#x27;An archaeologist searches for ancient artifacts while fighting Nazis.&#x27;</span>,
    <span class="hljs-string">&#x27;Teenagers in detention learn about themselves.&#x27;</span>,
    <span class="hljs-string">&#x27;A teenager fakes illness to get off school and have adventures with two friends.&#x27;</span>,
    <span class="hljs-string">&#x27;A young couple with a kid look after a hotel during winter and the husband goes insane.&#x27;</span>,
    <span class="hljs-string">&#x27;Four turtles fight bad guys.&#x27;</span>
    ]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data) 
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]

search_data = embed_search(queries)

res = collection.search(
    data=search_data,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    param={},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>]
)

<span class="hljs-keyword">for</span> idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Title:&#x27;</span>, queries[idx])
    <span class="hljs-comment"># print(&#x27;Search Time:&#x27;, end-start)</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Results:&#x27;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>( hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>), <span class="hljs-string">&#x27;(&#x27;</span>, <span class="hljs-built_in">round</span>(hit.distance, <span class="hljs-number">2</span>), <span class="hljs-string">&#x27;)&#x27;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>결과는 다음과 같습니다:</p>
<pre><code translate="no" class="language-shell">Title: An archaeologist searches <span class="hljs-keyword">for</span> ancient artifacts <span class="hljs-keyword">while</span> fighting Nazis.
Results:
<span class="hljs-string">&quot;Pimpernel&quot;</span> Smith ( <span class="hljs-number">0.48</span> )
<span class="hljs-function">Phantom of <span class="hljs-title">Chinatown</span> (<span class="hljs-params"> <span class="hljs-number">0.42</span> </span>)
<span class="hljs-title">Counterblast</span> (<span class="hljs-params"> <span class="hljs-number">0.41</span> </span>)

Title: Teenagers <span class="hljs-keyword">in</span> detention learn about themselves.
Results:
The Breakfast <span class="hljs-title">Club</span> (<span class="hljs-params"> <span class="hljs-number">0.54</span> </span>)
Up the <span class="hljs-title">Academy</span> (<span class="hljs-params"> <span class="hljs-number">0.46</span> </span>)
<span class="hljs-title">Fame</span> (<span class="hljs-params"> <span class="hljs-number">0.43</span> </span>)

Title: A teenager fakes illness to <span class="hljs-keyword">get</span> off school <span class="hljs-keyword">and</span> have adventures <span class="hljs-keyword">with</span> two friends.
Results:
Ferris Bueller&#x27;s Day <span class="hljs-title">Off</span> (<span class="hljs-params"> <span class="hljs-number">0.48</span> </span>)
Fever <span class="hljs-title">Lake</span> (<span class="hljs-params"> <span class="hljs-number">0.47</span> </span>)
A Walk to <span class="hljs-title">Remember</span> (<span class="hljs-params"> <span class="hljs-number">0.45</span> </span>)

Title: A young couple <span class="hljs-keyword">with</span> a kid look after a hotel during winter <span class="hljs-keyword">and</span> the husband goes insane.
Results:
Always a <span class="hljs-title">Bride</span> (<span class="hljs-params"> <span class="hljs-number">0.54</span> </span>)
Fast <span class="hljs-keyword">and</span> <span class="hljs-title">Loose</span> (<span class="hljs-params"> <span class="hljs-number">0.49</span> </span>)
The <span class="hljs-title">Shining</span> (<span class="hljs-params"> <span class="hljs-number">0.48</span> </span>)

Title: Four turtles fight bad guys.
Results:
TMNT 2: Out of the <span class="hljs-title">Shadows</span> (<span class="hljs-params"> <span class="hljs-number">0.49</span> </span>)
Teenage Mutant Ninja Turtles II: The Secret of the <span class="hljs-title">Ooze</span> (<span class="hljs-params"> <span class="hljs-number">0.47</span> </span>)
Gamera: Super <span class="hljs-title">Monster</span> (<span class="hljs-params"> <span class="hljs-number">0.43</span> </span>)
</span><button class="copy-code-btn"></button></code></pre>
