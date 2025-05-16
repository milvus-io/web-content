---
id: hybrid_search_with_milvus.md
summary: Milvus를 사용한 하이브리드 검색
title: Milvus를 사용한 하이브리드 검색
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hybrid_search_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h1 id="Hybrid-Search-with-Milvus" class="common-anchor-header">Milvus를 사용한 하이브리드 검색<button data-href="#Hybrid-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼의 최종 효과를 경험하고 싶다면 https://demos.milvus.io/hybrid-search/ 으로 바로 이동하세요.</p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus/pics/demo.png"/></p>
<p>이 튜토리얼에서는 <a href="https://milvus.io/docs/multi-vector-search.md">Milvus와</a> <a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/BGE_M3">BGE-M3 모델을</a> 사용하여 하이브리드 검색을 수행하는 방법을 보여드리겠습니다. BGE-M3 모델은 텍스트를 고밀도 및 희소 벡터로 변환할 수 있습니다. Milvus는 두 가지 유형의 벡터를 하나의 컬렉션에 저장하여 결과 연관성을 향상시키는 하이브리드 검색을 지원합니다.</p>
<p>Milvus는 밀도, 스파스, 하이브리드 검색 방식을 지원합니다:</p>
<ul>
<li>밀도 검색: 시맨틱 컨텍스트를 활용하여 쿼리 뒤에 숨겨진 의미를 이해합니다.</li>
<li>스파스 검색: 키워드 매칭을 강조하여 전체 텍스트 검색과 동일하게 특정 용어에 기반한 결과를 찾습니다.</li>
<li>하이브리드 검색: 밀도 검색과 스파스 검색 방식을 모두 결합하여 전체 문맥과 특정 키워드를 파악하여 포괄적인 검색 결과를 제공합니다.</li>
</ul>
<p>이러한 방법을 통합함으로써 Milvus 하이브리드 검색은 의미론적 유사성과 어휘적 유사성의 균형을 유지하여 검색 결과의 전반적인 관련성을 개선합니다. 이 노트북에서는 이러한 검색 전략을 설정하고 사용하는 과정을 안내하며, 다양한 검색 시나리오에서 그 효과를 강조합니다.</p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">종속성 및 환경</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-Dataset" class="common-anchor-header">데이터 세트 다운로드</h3><p>검색을 시연하려면 문서 말뭉치가 필요합니다. Quora 중복 질문 데이터 집합을 사용하여 로컬 디렉터리에 배치해 보겠습니다.</p>
<p>데이터 집합의 출처: <a href="https://www.quora.com/q/quoradata/First-Quora-Dataset-Release-Question-Pairs">첫 번째 Quora 데이터 세트 릴리즈: 질문 쌍</a></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Run this cell to download the dataset</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget http://qim.fs.quoracdn.net/quora_duplicate_questions.tsv</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-and-Prepare-Data" class="common-anchor-header">데이터 로드 및 준비</h3><p>데이터 세트를 로드하고 검색을 위한 작은 말뭉치를 준비합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

file_path = <span class="hljs-string">&quot;quora_duplicate_questions.tsv&quot;</span>
df = pd.read_csv(file_path, sep=<span class="hljs-string">&quot;\t&quot;</span>)
questions = <span class="hljs-built_in">set</span>()
<span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> df.iterrows():
    obj = row.to_dict()
    questions.add(obj[<span class="hljs-string">&quot;question1&quot;</span>][:<span class="hljs-number">512</span>])
    questions.add(obj[<span class="hljs-string">&quot;question2&quot;</span>][:<span class="hljs-number">512</span>])
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(questions) &gt; <span class="hljs-number">500</span>:  <span class="hljs-comment"># Skip this if you want to use the full dataset</span>
        <span class="hljs-keyword">break</span>

docs = <span class="hljs-built_in">list</span>(questions)

<span class="hljs-comment"># example question</span>
<span class="hljs-built_in">print</span>(docs[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">What is the strongest Kevlar cord?
</code></pre>
<h3 id="Use-BGE-M3-Model-for-Embeddings" class="common-anchor-header">임베딩에 BGE-M3 모델 사용</h3><p>BGE-M3 모델은 텍스트를 고밀도 및 스파스 벡터로 임베드할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction

ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)
dense_dim = ef.dim[<span class="hljs-string">&quot;dense&quot;</span>]

<span class="hljs-comment"># Generate embeddings using BGE-M3 model</span>
docs_embeddings = ef(docs)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 302473.85it/s]
Inference Embeddings: 100%|██████████| 32/32 [01:59&lt;00:00,  3.74s/it]
</code></pre>
<h3 id="Setup-Milvus-Collection-and-Index" class="common-anchor-header">Milvus 컬렉션 및 색인 설정</h3><p>Milvus 컬렉션을 설정하고 벡터 필드에 대한 인덱스를 생성하겠습니다.</p>
<div class="alert alert-info">
<ul>
<li>URL을 로컬 파일(예: "./milvus.db"로 설정하는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대규모 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에</a> 더 성능이 뛰어난 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예: http://localhost:19530)을 사용자 URL로 사용하세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 uri와 토큰을 조정하세요.</li>
</ul>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># Connect to Milvus given URI</span>
connections.connect(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>)

<span class="hljs-comment"># Specify the data schema for the new Collection</span>
fields = [
    <span class="hljs-comment"># Use auto generated id as primary key</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;pk&quot;</span>, dtype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>
    ),
    <span class="hljs-comment"># Store the original text to retrieve based on semantically distance</span>
    FieldSchema(name=<span class="hljs-string">&quot;text&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>),
    <span class="hljs-comment"># Milvus now supports both sparse and dense vectors,</span>
    <span class="hljs-comment"># we can store each in a separate field to conduct hybrid search on both vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, dtype=DataType.SPARSE_FLOAT_VECTOR),
    FieldSchema(name=<span class="hljs-string">&quot;dense_vector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dense_dim),
]
schema = CollectionSchema(fields)

<span class="hljs-comment"># Create collection (drop the old one if exists)</span>
col_name = <span class="hljs-string">&quot;hybrid_demo&quot;</span>
<span class="hljs-keyword">if</span> utility.has_collection(col_name):
    Collection(col_name).drop()
col = Collection(col_name, schema, consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)

<span class="hljs-comment"># To make vector search efficient, we need to create indices for the vector fields</span>
sparse_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
col.create_index(<span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_index)
dense_index = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
col.create_index(<span class="hljs-string">&quot;dense_vector&quot;</span>, dense_index)
col.load()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-Data-into-Milvus-Collection" class="common-anchor-header">밀버스 컬렉션에 데이터 삽입하기</h3><p>컬렉션에 문서와 임베딩을 삽입합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># For efficiency, we insert 50 records in each small batch</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(docs), <span class="hljs-number">50</span>):
    batched_entities = [
        docs[i : i + <span class="hljs-number">50</span>],
        docs_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][i : i + <span class="hljs-number">50</span>],
        docs_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][i : i + <span class="hljs-number">50</span>],
    ]
    col.insert(batched_entities)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of entities inserted:&quot;</span>, col.num_entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of entities inserted: 502
</code></pre>
<h3 id="Enter-Your-Search-Query" class="common-anchor-header">검색 쿼리 입력</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Enter your search query</span>
query = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter your search query: &quot;</span>)
<span class="hljs-built_in">print</span>(query)

<span class="hljs-comment"># Generate embeddings for the query</span>
query_embeddings = ef([query])
<span class="hljs-comment"># print(query_embeddings)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">How to start learning programming?
</code></pre>
<h3 id="Run-the-Search" class="common-anchor-header">검색 실행</h3><p>먼저 검색을 실행하는 데 유용한 몇 가지 기능을 준비합니다:</p>
<ul>
<li><code translate="no">dense_search</code>밀집 벡터 필드에서만 검색</li>
<li><code translate="no">sparse_search</code>: 희소 벡터 필드에서만 검색</li>
<li><code translate="no">hybrid_search</code>: 가중치 재랭커를 사용하여 밀집 벡터 필드와 희소 벡터 필드 모두에서 검색</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    AnnSearchRequest,
    WeightedRanker,
)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">dense_search</span>(<span class="hljs-params">col, query_dense_embedding, limit=<span class="hljs-number">10</span></span>):
    search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    res = col.search(
        [query_dense_embedding],
        anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
        param=search_params,
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sparse_search</span>(<span class="hljs-params">col, query_sparse_embedding, limit=<span class="hljs-number">10</span></span>):
    search_params = {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {},
    }
    res = col.search(
        [query_sparse_embedding],
        anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
        param=search_params,
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">hybrid_search</span>(<span class="hljs-params">
    col,
    query_dense_embedding,
    query_sparse_embedding,
    sparse_weight=<span class="hljs-number">1.0</span>,
    dense_weight=<span class="hljs-number">1.0</span>,
    limit=<span class="hljs-number">10</span>,
</span>):
    dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    dense_req = AnnSearchRequest(
        [query_dense_embedding], <span class="hljs-string">&quot;dense_vector&quot;</span>, dense_search_params, limit=limit
    )
    sparse_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}
    sparse_req = AnnSearchRequest(
        [query_sparse_embedding], <span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_search_params, limit=limit
    )
    rerank = WeightedRanker(sparse_weight, dense_weight)
    res = col.hybrid_search(
        [sparse_req, dense_req], rerank=rerank, limit=limit, output_fields=[<span class="hljs-string">&quot;text&quot;</span>]
    )[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">return</span> [hit.get(<span class="hljs-string">&quot;text&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res]
<button class="copy-code-btn"></button></code></pre>
<p>정의된 함수를 사용하여 세 가지 다른 검색을 실행해 보겠습니다:</p>
<pre><code translate="no" class="language-python">dense_results = dense_search(col, query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>])
sparse_results = sparse_search(col, query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]])
hybrid_results = hybrid_search(
    col,
    query_embeddings[<span class="hljs-string">&quot;dense&quot;</span>][<span class="hljs-number">0</span>],
    query_embeddings[<span class="hljs-string">&quot;sparse&quot;</span>][[<span class="hljs-number">0</span>]],
    sparse_weight=<span class="hljs-number">0.7</span>,
    dense_weight=<span class="hljs-number">1.0</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Display-Search-Results" class="common-anchor-header">검색 결과 표시</h3><p>밀도, 스파스, 하이브리드 검색의 결과를 표시하려면 결과 서식을 지정하는 몇 가지 유틸리티가 필요합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">doc_text_formatting</span>(<span class="hljs-params">ef, query, docs</span>):
    tokenizer = ef.model.tokenizer
    query_tokens_ids = tokenizer.encode(query, return_offsets_mapping=<span class="hljs-literal">True</span>)
    query_tokens = tokenizer.convert_ids_to_tokens(query_tokens_ids)
    formatted_texts = []

    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        ldx = <span class="hljs-number">0</span>
        landmarks = []
        encoding = tokenizer.encode_plus(doc, return_offsets_mapping=<span class="hljs-literal">True</span>)
        tokens = tokenizer.convert_ids_to_tokens(encoding[<span class="hljs-string">&quot;input_ids&quot;</span>])[<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>]
        offsets = encoding[<span class="hljs-string">&quot;offset_mapping&quot;</span>][<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>]
        <span class="hljs-keyword">for</span> token, (start, end) <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(tokens, offsets):
            <span class="hljs-keyword">if</span> token <span class="hljs-keyword">in</span> query_tokens:
                <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(landmarks) != <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> start == landmarks[-<span class="hljs-number">1</span>]:
                    landmarks[-<span class="hljs-number">1</span>] = end
                <span class="hljs-keyword">else</span>:
                    landmarks.append(start)
                    landmarks.append(end)
        close = <span class="hljs-literal">False</span>
        formatted_text = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-keyword">for</span> i, c <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(doc):
            <span class="hljs-keyword">if</span> ldx == <span class="hljs-built_in">len</span>(landmarks):
                <span class="hljs-keyword">pass</span>
            <span class="hljs-keyword">elif</span> i == landmarks[ldx]:
                <span class="hljs-keyword">if</span> close:
                    formatted_text += <span class="hljs-string">&quot;&lt;/span&gt;&quot;</span>
                <span class="hljs-keyword">else</span>:
                    formatted_text += <span class="hljs-string">&quot;&lt;span style=&#x27;color:red&#x27;&gt;&quot;</span>
                close = <span class="hljs-keyword">not</span> close
                ldx = ldx + <span class="hljs-number">1</span>
            formatted_text += c
        <span class="hljs-keyword">if</span> close <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
            formatted_text += <span class="hljs-string">&quot;&lt;/span&gt;&quot;</span>
        formatted_texts.append(formatted_text)
    <span class="hljs-keyword">return</span> formatted_texts
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 검색 결과를 하이라이트가 있는 텍스트로 표시할 수 있습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> Markdown, display

<span class="hljs-comment"># Dense search results</span>
display(Markdown(<span class="hljs-string">&quot;**Dense Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, dense_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> dense_results:
    display(Markdown(result))

<span class="hljs-comment"># Sparse search results</span>
display(Markdown(<span class="hljs-string">&quot;\n**Sparse Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, sparse_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> formatted_results:
    display(Markdown(result))

<span class="hljs-comment"># Hybrid search results</span>
display(Markdown(<span class="hljs-string">&quot;\n**Hybrid Search Results:**&quot;</span>))
formatted_results = doc_text_formatting(ef, query, hybrid_results)
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> formatted_results:
    display(Markdown(result))
<button class="copy-code-btn"></button></code></pre>
<p><strong>밀도 검색 결과:</strong></p>
<p>로봇 공학 학습을 시작하는 가장 좋은 방법은 무엇인가요?</p>
<p>자바 같은 컴퓨터 언어를 배우려면 어떻게 해야 하나요?</p>
<p>정보 보안을 배우려면 어떻게 시작해야 하나요?</p>
<p>자바 프로그래밍이란 무엇인가요? 자바 프로그래밍 언어를 배우는 방법?</p>
<p>컴퓨터 보안은 어떻게 배울 수 있나요?</p>
<p>로봇 공학을 시작하는 가장 좋은 방법은 무엇인가요? 작업을 시작할 수 있는 최고의 개발 보드는 무엇인가요?</p>
<p>영어를 유창하게 배우려면 어떻게 해야 하나요?</p>
<p>프랑스어를 배우는 가장 좋은 방법은 무엇인가요?</p>
<p>물리학을 쉽게 배우려면 어떻게 해야 하나요?</p>
<p>UPSC는 어떻게 준비하나요?</p>
<p><strong>스파스 검색 결과:</strong></p>
<p>자바<span style='color:red'> 프로그래밍이란</span> 무엇인가요<span style='color:red'>?</span> 자바 프로그래밍 언어를 배우는<span style='color:red'> 방법</span>?</p>
<p>로봇 공학을<span style='color:red'> 배우는</span> 가장 좋은 방법은 무엇인가요<span style='color:red'>?</span></p>
<p>머신<span style='color:red'> 러닝의</span> 대안은 무엇인가요?</p>
<p>C<span style='color:red'> 프로그래밍을</span> 사용하여 Linux에서 새 터미널과 새 셸을 만들려면<span style='color:red'>어떻게해야합니까</span><span style='color:red'>?</span></p>
<p>C<span style='color:red'> 프로그래밍</span> (Linux 터미널)을 사용하여 새 터미널에서 새 셸을 만들려면<span style='color:red'>어떻게해야하나요</span><span style='color:red'>?</span></p>
<p>하이데라바드에서 어떤 사업을<span style='color:red'> 시작하는</span> 것이 더 낫습니까<span style='color:red'>?</span></p>
<p>하이데라바드에서 어떤 사업을<span style='color:red'> 시작하는</span> 것이 좋은가요<span style='color:red'>?</span></p>
<p>로봇 공학을<span style='color:red'> 시작하는</span> 가장 좋은 방법은 무엇인가요<span style='color:red'>?</span> 작업을<span style='color:red'> 시작할</span> 수있는 최고의 개발 보드는 무엇입니까<span style='color:red'>?</span></p>
<p>초보자가 컴퓨터<span style='color:red'> 프로그래밍</span> 알고리즘을<span style='color:red'> 이해하려면</span> 어떤 수학이 필요하나요<span style='color:red'>?</span> 완전 초보자에게 적합한 알고리즘 관련 서적은 무엇인가요<span style='color:red'>?</span></p>
<p><span style='color:red'>어떻게</span> 하면 삶이 자신에게 적합하게 만들고 삶이 정신적, 정서적으로 <span style='color:red'>학대하는</span> 것을 막을 수 있습니까<span style='color:red'>?</span></p>
<p><strong>하이브리드 검색 결과:</strong></p>
<p>로봇 공학을<span style='color:red'> 시작하는</span> 가장 좋은 방법은 무엇인가요<span style='color:red'>?</span> 작업을<span style='color:red'> 시작할</span> 수있는 최고의 개발 보드는 무엇입니까<span style='color:red'>?</span></p>
<p>자바<span style='color:red'> 프로그래밍이란</span> 무엇인가요<span style='color:red'>?</span> 자바 프로그래밍 언어를 배우는<span style='color:red'> 방법</span>?</p>
<p>로봇 공학을<span style='color:red'> 배우는</span> 가장 좋은 방법은 무엇인가요<span style='color:red'>?</span></p>
<p>UPSC는<span style='color:red'>어떻게</span> 준비하나요<span style='color:red'>?</span></p>
<p>물리학을<span style='color:red'> 쉽게</span> 배우려면<span style='color:red'>어떻게</span> 해야 하나요<span style='color:red'>?</span></p>
<p>프랑스어를 배우는 가장<span style='color:red'> 좋은</span> 방법은 무엇인가요<span style='color:red'>?</span></p>
<p>영어를 유창하게<span style='color:red'> 배우려면</span><span style='color:red'>어떻게</span> 해야 하나요<span style='color:red'>?</span></p>
<p>컴퓨터 보안은<span style='color:red'>어떻게</span> 배울 수 있나요<span style='color:red'>?</span></p>
<p>정보 보안을<span style='color:red'> 배우려면</span><span style='color:red'>어떻게</span> 시작해야 하나요<span style='color:red'>?</span></p>
<p>자바 같은 컴퓨터 언어를 배우려면<span style='color:red'>어떻게</span> 해야 하나요<span style='color:red'>?</span></p>
<p>머신<span style='color:red'> 러닝의</span> 대안은 무엇인가요?</p>
<p>C<span style='color:red'> 프로그래밍을</span> 사용하여 Linux에서 새 터미널과 새 셸을 만들려면<span style='color:red'>어떻게</span> 해야 하나요<span style='color:red'>?</span></p>
<p>C<span style='color:red'> 프로그래밍</span> (Linux 터미널)을 사용하여 새 터미널에서 새 셸을 만들려면<span style='color:red'>어떻게해야하나요</span><span style='color:red'>?</span></p>
<p>하이데라바드에서 어떤 사업을<span style='color:red'> 시작하는</span> 것이 더 낫습니까<span style='color:red'>?</span></p>
<p>하이데라바드에서 어떤 사업을<span style='color:red'> 시작하는</span> 것이 좋은가요<span style='color:red'>?</span></p>
<p>완전한 초보자가 컴퓨터<span style='color:red'> 프로그래밍</span> 알고리즘을<span style='color:red'> 이해하려면</span> 어떤 수학이 필요합니까<span style='color:red'>?</span> 완전한 초보자에게 적합한 알고리즘에 관한 책은 무엇입니까<span style='color:red'>?</span></p>
<p><span style='color:red'>어떻게</span> 삶을 자신에게 적합하게 만들고 삶이 정신적, 정서적으로 당신을 <span style='color:red'>학대하는</span> 것을 막을 수 있습니까<span style='color:red'>?</span></p>
<h3 id="Quick-Deploy" class="common-anchor-header">빠른 배포</h3><p>이 튜토리얼을 통해 온라인 데모를 시작하는 방법에 대해 알아보려면 <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials/quickstart/apps/hybrid_demo_with_milvus">예제 애플리케이션을</a> 참조하세요.</p>
