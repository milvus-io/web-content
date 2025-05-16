---
id: sparse_vector.md
summary: Milvus에서 스파스 벡터를 사용하는 방법을 알아보세요.
title: 스파스 벡터
---
<h1 id="Sparse-Vector" class="common-anchor-header">스파스 벡터<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>스파스 벡터는 대부분의 요소가 0인 벡터 임베딩을 사용하여 단어 또는 구문을 나타내며, 0이 아닌 요소 하나만 특정 단어의 존재를 나타냅니다. <a href="https://arxiv.org/abs/2109.10086">SPLADEv2와</a> 같은 희소 벡터 모델은 도메인 외 지식 검색, 키워드 인식 및 해석 가능성에서 고밀도 모델보다 성능이 뛰어납니다. 정보 검색, 자연어 처리, 추천 시스템에서 특히 유용하며, 리콜을 위한 스파스 벡터와 랭킹을 위한 대규모 모델을 결합하면 검색 결과를 크게 개선할 수 있습니다.</p>
<p>Milvus에서 스파스 벡터의 사용은 밀도 벡터와 유사한 워크플로우를 따릅니다. 여기에는 희소 벡터 열로 컬렉션을 만들고, 데이터를 삽입하고, 인덱스를 만들고, 유사도 검색과 스칼라 쿼리를 수행하는 것이 포함됩니다.</p>
<p>이 튜토리얼에서는 그 방법을 배웁니다:</p>
<ul>
<li>스파스 벡터 임베딩 준비하기;</li>
<li>스파스 벡터 필드가 있는 컬렉션 만들기;</li>
<li>스파스 벡터 임베딩으로 엔티티 삽입하기;</li>
<li>컬렉션 색인화 및 희소 벡터에 대한 ANN 검색을 수행합니다.</li>
</ul>
<p>스파스 벡터가 실제로 작동하는 모습을 보려면 <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py를</a> 참조하세요.</p>
<div class="admonition note">
    <p><b>참고</b></p>
        현재 스파스 벡터 지원은 2.4.0의 베타 기능으로 제공되며, 3.0.0에서 정식으로 제공될 예정입니다.</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">스파스 벡터 임베딩 준비하기<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 스파스 벡터를 사용하려면 지원되는 형식 중 하나로 벡터 임베딩을 준비하세요:</p>
<ul>
<li><p><strong>스파스 행렬</strong>: <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> 클래스 패밀리를 활용하여 희소 임베딩을 표현합니다. 이 방법은 대규모의 고차원 데이터를 처리하는 데 효율적입니다.</p></li>
<li><p><strong>사전 목록</strong>: 각 스파스 임베딩을 <code translate="no">{dimension_index: value, ...}</code> 로 구조화된 사전으로 표현하며, 각 키-값 쌍은 차원 인덱스와 해당 값을 나타냅니다.</p>
<p>예시:</p>
<pre><code translate="no" class="language-python">{2: 0.33, 98: 0.72, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>튜플의 이터러블 목록</strong>: 사전 목록과 유사하지만 0이 아닌 차원과 해당 값만 지정하기 위해 튜플의 이터러블인 <code translate="no">[(dimension_index, value)]</code> 을 사용합니다.</p>
<p>예제:</p>
<pre><code translate="no" class="language-python">[(2, 0.33), (98, 0.72), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>다음 예는 각각 10,000개의 차원과 0.005의 희소성 밀도를 가진 10,000개의 엔티티에 대해 무작위 희소 행렬을 생성하여 스파스 임베딩을 준비합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>참고 사항</b></p>
<p>벡터 차원은 Python <code translate="no">int</code> 또는 <code translate="no">numpy.integer</code> 유형이어야 하며, 값은 Python <code translate="no">float</code> 또는 <code translate="no">numpy.floating</code> 유형이어야 합니다.</p>
</div>
<p>임베딩을 생성하려면 다양한 임베딩 함수를 제공하는 PyMilvus 라이브러리에 내장된 <code translate="no">model</code> 패키지를 사용할 수도 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/embeddings.md">임베딩을</a> 참조하세요.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">스파스 벡터 필드로 컬렉션 만들기<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>스파스 벡터 필드가 있는 컬렉션을 만들려면 스파스 벡터 필드의 <strong>데이터 타입을</strong> <strong>DataType.SPARSE_FLOAT_VECTOR로</strong> 설정합니다. 고밀도 벡터와 달리 스파스 벡터에는 차원을 지정할 필요가 없습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>일반적인 컬렉션 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection() 을</a> 참조하십시오 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">.</a></p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">스파스 벡터 임베딩으로 엔티티 삽입하기<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>스파스 벡터 임베딩이 있는 엔티티를 삽입하려면 엔티티의 목록을 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> 메서드에 엔티티 목록을 전달하면 됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">컬렉션 색인 생성<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>유사도 검색을 수행하기 전에 컬렉션에 대한 색인을 만드세요. 인덱스 유형 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()를</a> 참조하세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>스파스 벡터에 인덱스를 구축하려면 다음 사항에 유의하세요:</p>
<ul>
<li><p><code translate="no">index_type</code>: 작성할 인덱스 유형입니다. 스파스 벡터에 사용할 수 있는 옵션:</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: 각 차원을 0이 아닌 벡터에 매핑하는 역 인덱스로, 검색 중에 관련 데이터에 직접 액세스할 수 있습니다. 희소하지만 고차원 데이터로 구성된 데이터 세트에 이상적입니다.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: WAND(Weak-AND) 알고리즘을 사용해 가능성이 낮은 후보를 빠르게 우회하여 순위 가능성이 높은 후보에 평가의 초점을 맞춥니다. 차원을 용어로, 벡터를 문서로 취급하여 대규모의 희박한 데이터 세트에서 검색 속도를 높입니다.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: 희소 벡터에 대해서는 <code translate="no">IP</code> (내부 제품) 거리 메트릭만 지원됩니다.</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: 희소 벡터에 특별히 사용되는 인덱스 매개변수입니다. 인덱싱 과정에서 제외되는 작은 벡터 값의 비율을 제어합니다. 이 매개변수를 사용하면 인덱스를 구성할 때 작은 값을 무시함으로써 효율성과 정확성 사이의 균형을 미세 조정할 수 있습니다. 예를 들어 <code translate="no">drop_ratio_build = 0.3</code> 인 경우 인덱스를 구성하는 동안 모든 스파스 벡터의 모든 값이 수집되고 정렬됩니다. 이 중 가장 작은 30%의 값은 인덱스에 포함되지 않으므로 검색 시 계산 작업량이 줄어듭니다.</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/v2.4.x/index.md">인메모리 인덱스를</a> 참조하세요.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">ANN 검색 수행<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션이 색인화되어 메모리에 로드된 후에는 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> 메서드를 사용하여 쿼리를 기반으로 관련 문서를 검색합니다.</p>
<pre><code translate="no" class="language-python"># Load the collection into memory
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

# Perform ANN search on sparse vectors

# <span class="hljs-keyword">for</span> demo purpose we search <span class="hljs-keyword">for</span> the last inserted vector
query_vector = entities[<span class="hljs-number">-1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, # the ratio of small vector values to be dropped during search.
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits in search_res:
    <span class="hljs-keyword">for</span> hit in hits:
        <span class="hljs-built_in">print</span>(f<span class="hljs-string">&quot;hit: {hit}&quot;</span>)
        
# Output:
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">7.220192909240723</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.46767865218233806</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">1.2287548780441284</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.7315987515699472</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">0.9848432540893555</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9871869181562156</span>}}
<button class="copy-code-btn"></button></code></pre>
<p>검색 매개변수를 구성할 때 다음 사항에 유의하세요:</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: 스파스 벡터에 특별히 사용되는 검색 매개변수입니다. 이 옵션을 사용하면 쿼리 벡터에서 무시할 가장 작은 값의 비율을 지정하여 검색 프로세스를 미세 조정할 수 있습니다. 검색 정확도와 성능의 균형을 맞추는 데 도움이 됩니다. <code translate="no">drop_ratio_search</code> 에 설정된 값이 작을수록 이러한 작은 값이 최종 점수에 기여하는 비중이 줄어듭니다. 일부 작은 값을 무시하면 정확도에 미치는 영향을 최소화하면서 검색 성능을 향상시킬 수 있습니다.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">스칼라 쿼리 수행<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 ANN 검색 외에도 스파스 벡터에 대한 스칼라 쿼리도 지원합니다. 이러한 쿼리를 사용하면 희소 벡터와 연관된 스칼라 값을 기반으로 문서를 검색할 수 있습니다. 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()를</a> 참조하세요.</p>
<p><strong>scalar_field가</strong> 3보다 큰 엔티티를 필터링합니다:</p>
<pre><code translate="no" class="language-python"># Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    filter=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

# Output:
# [{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272701862&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9994093623822689</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">173</span>: <span class="hljs-number">0.35266244411468506</span>, <span class="hljs-number">400</span>: <span class="hljs-number">0.49995484948158264</span>, <span class="hljs-number">480</span>: <span class="hljs-number">0.8757831454277039</span>, <span class="hljs-number">661</span>: <span class="hljs-number">0.9931875467300415</span>, <span class="hljs-number">1040</span>: <span class="hljs-number">0.0965644046664238</span>, <span class="hljs-number">1728</span>: <span class="hljs-number">0.7478245496749878</span>, <span class="hljs-number">2365</span>: <span class="hljs-number">0.4351981580257416</span>, <span class="hljs-number">2923</span>: <span class="hljs-number">0.5505295395851135</span>, <span class="hljs-number">3181</span>: <span class="hljs-number">0.7396837472915649</span>, <span class="hljs-number">3848</span>: <span class="hljs-number">0.4428485333919525</span>, <span class="hljs-number">4701</span>: <span class="hljs-number">0.39119353890419006</span>, <span class="hljs-number">5199</span>: <span class="hljs-number">0.790219783782959</span>, <span class="hljs-number">5798</span>: <span class="hljs-number">0.9623121619224548</span>, <span class="hljs-number">6213</span>: <span class="hljs-number">0.453134149312973</span>, <span class="hljs-number">6341</span>: <span class="hljs-number">0.745091438293457</span>, <span class="hljs-number">6775</span>: <span class="hljs-number">0.27766478061676025</span>, <span class="hljs-number">6875</span>: <span class="hljs-number">0.017947908490896225</span>, <span class="hljs-number">8093</span>: <span class="hljs-number">0.11834774166345596</span>, <span class="hljs-number">8617</span>: <span class="hljs-number">0.2289179265499115</span>, <span class="hljs-number">8991</span>: <span class="hljs-number">0.36600416898727417</span>, <span class="hljs-number">9346</span>: <span class="hljs-number">0.5502803921699524</span>}}, {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702421&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9990218525410719</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">448</span>: <span class="hljs-number">0.587817907333374</span>, <span class="hljs-number">1866</span>: <span class="hljs-number">0.0994109958410263</span>, <span class="hljs-number">2438</span>: <span class="hljs-number">0.8672442436218262</span>, <span class="hljs-number">2533</span>: <span class="hljs-number">0.8063794374465942</span>, <span class="hljs-number">2595</span>: <span class="hljs-number">0.02122959867119789</span>, <span class="hljs-number">2828</span>: <span class="hljs-number">0.33827054500579834</span>, <span class="hljs-number">2871</span>: <span class="hljs-number">0.1984412521123886</span>, <span class="hljs-number">2938</span>: <span class="hljs-number">0.09674275666475296</span>, <span class="hljs-number">3154</span>: <span class="hljs-number">0.21552987396717072</span>, <span class="hljs-number">3662</span>: <span class="hljs-number">0.5236313343048096</span>, <span class="hljs-number">3711</span>: <span class="hljs-number">0.6463911533355713</span>, <span class="hljs-number">4029</span>: <span class="hljs-number">0.4041993021965027</span>, <span class="hljs-number">7143</span>: <span class="hljs-number">0.7370485663414001</span>, <span class="hljs-number">7589</span>: <span class="hljs-number">0.37588241696357727</span>, <span class="hljs-number">7776</span>: <span class="hljs-number">0.436136394739151</span>, <span class="hljs-number">7962</span>: <span class="hljs-number">0.06377989053726196</span>, <span class="hljs-number">8385</span>: <span class="hljs-number">0.5808192491531372</span>, <span class="hljs-number">8592</span>: <span class="hljs-number">0.8865005970001221</span>, <span class="hljs-number">8648</span>: <span class="hljs-number">0.05727503448724747</span>, <span class="hljs-number">9071</span>: <span class="hljs-number">0.9450633525848389</span>, <span class="hljs-number">9161</span>: <span class="hljs-number">0.146037295460701</span>, <span class="hljs-number">9358</span>: <span class="hljs-number">0.1903032660484314</span>, <span class="hljs-number">9679</span>: <span class="hljs-number">0.3146636486053467</span>, <span class="hljs-number">9974</span>: <span class="hljs-number">0.8561339378356934</span>, <span class="hljs-number">9991</span>: <span class="hljs-number">0.15841573476791382</span>}}]
<button class="copy-code-btn"></button></code></pre>
<p>기본 키를 기준으로 엔터티를 필터링합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 스파스 벡터를 사용할 때는 다음 제한 사항을 고려하세요:</p>
<ul>
<li><p>현재 스파스 벡터에는 <strong>IP</strong> 거리 메트릭만 지원됩니다.</p></li>
<li><p>스파스 벡터 필드의 경우, <strong>SPARSE_INVERTED_INDEX</strong> 및 <strong>SPARSE_WAND</strong> 인덱스 유형만 지원됩니다.</p></li>
<li><p>현재 스파스 벡터에는 <a href="https://milvus.io/docs/single-vector-search.md#Range-search">범위 검색</a>, <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">그룹화 검색</a>, <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">검색 반복기가</a> 지원되지 않습니다.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>스파스 벡터에는 어떤 거리 메트릭이 지원되나요?</strong></p>
<p>스파스 벡터의 차원이 높기 때문에 L2 거리와 코사인 거리는 비현실적이기 때문에 스파스 벡터는 내적 곱(IP) 거리 메트릭만 지원합니다.</p></li>
<li><p><strong>SPARSE_INVERTED_INDEX와 SPARSE_WAND의 차이점과 둘 중 하나를 선택하려면 어떻게 해야 하나요?</strong></p>
<p><strong>SPARSE_INVERTED_INDEX는</strong> 기존의 반전 인덱스인 반면, <strong>SPARSE_WAND는</strong> 검색 시 전체 IP 거리 평가 횟수를 줄이기 위해 <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> 알고리즘을 사용합니다. <strong>SPARSE_WAND는</strong> 일반적으로 더 빠르지만 벡터 밀도가 증가하면 성능이 저하될 수 있습니다. 이 중 하나를 선택하려면 특정 데이터 세트와 사용 사례에 따라 실험과 벤치마크를 수행하세요.</p></li>
<li><p><strong>drop_ratio_build 및 drop_ratio_search 매개변수는 어떻게 선택해야 하나요?</strong></p>
<p><strong>drop_ratio_build</strong> 및 <strong>drop_ratio_search의</strong> 선택은 데이터의 특성과 검색 지연 시간/처리량 및 정확도에 대한 요구 사항에 따라 달라집니다.</p></li>
<li><p><strong>스파스 임베딩에 지원되는 데이터 유형은 무엇인가요?</strong></p>
<p>차원 부분은 부호가 없는 32비트 정수여야 하며, 값 부분은 음수가 아닌 32비트 부동 소수점 숫자일 수 있습니다.</p></li>
<li><p><strong>희소 임베딩의 치수는 uint32 공간 내의 모든 불연속형 값이 될 수 있나요?</strong></p>
<p>예, 한 가지 예외가 있습니다. 희소 임베딩의 차원은 <code translate="no">[0, maximum of uint32)</code> 범위의 모든 값이 될 수 있습니다. 즉, 최대값인 uint32를 사용할 수 없습니다.</p></li>
<li><p><strong>증가하는 세그먼트에 대한 검색은 인덱스를 통해 수행되나요 아니면 무차별 대입으로 수행되나요?</strong></p>
<p>증가하는 세그먼트에 대한 검색은 봉인된 세그먼트 인덱스와 동일한 유형의 인덱스를 통해 수행됩니다. 인덱스가 구축되기 전에 새로 증가하는 세그먼트의 경우 무차별 대입 검색이 사용됩니다.</p></li>
<li><p><strong>하나의 컬렉션에 희소 벡터와 고밀도 벡터를 모두 포함할 수 있나요?</strong></p>
<p>예. 여러 벡터 유형을 지원하므로 스파스 및 고밀도 벡터 열이 모두 포함된 컬렉션을 생성하고 하이브리드 검색을 수행할 수 있습니다.</p></li>
<li><p><strong>스파스 임베딩을 삽입하거나 검색하려면 어떤 요건을 충족해야 하나요?</strong></p>
<p>스파스 임베딩에는 0이 아닌 값이 하나 이상 있어야 하며, 벡터 인덱스는 음수가 아니어야 합니다.</p></li>
</ul>
