---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: Milvus 3.0에서 FAISS 인덱스 패스스루 기능을 사용하여 Faiss 인덱스 팩토리 문자열과 팩토리별 검색 매개변수를 지정하십시오.
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">FAISS</code> 인덱스 유형은 Milvus 3.0.0 이상 버전에서 사용할 수 있는 전문가 수준의 패스스루 기능입니다. 이 기능을 사용하면 고정된 Milvus 인덱스 유형을 선택하는 대신 <a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">Faiss 인덱스 팩토리 문자열을</a> 직접 지정할 수 있습니다.</p>
<p>이미 테스트를 거친 Faiss 레시피가 있고 그 구성을 직접 제어해야 할 경우 <code translate="no">FAISS</code> 를 사용하십시오. 전용 Milvus 인덱스 유형이 있는 일반적인 레시피의 경우, 안정적이고 문서화된 매개변수 계약이 있으므로 전용 유형을 우선적으로 사용하는 것이 좋습니다.</p>
<div class="alert note">
<p>업스트림 Faiss에서 허용하는 팩토리 문자열이 Milvus에서 자동으로 지원되는 것은 아닙니다. 호환성은 벡터 필드 유형, 메트릭, 차원, Milvus 이미지에 컴파일된 Faiss 모듈, 그리고 생성된 인덱스가 Milvus에서 요구하는 연산을 지원하는지 여부에 따라 달라집니다.</p>
</div>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><code translate="no">FAISS</code> <code translate="no">FLOAT_VECTOR</code> 및 필드를 지원합니다. , , 또는 필드는 지원하지 않습니다. <code translate="no">BINARY_VECTOR</code> <code translate="no">FLOAT16_VECTOR</code> <code translate="no">BFLOAT16_VECTOR</code> <code translate="no">INT8_VECTOR</code> <code translate="no">SPARSE_FLOAT_VECTOR</code> </p></li>
<li><p>일반 <code translate="no">FAISS</code> 어댑터는 CPU에서 실행됩니다. 이는 Faiss GPU 인덱스 유형이 아닙니다.</p></li>
<li><p><code translate="no">faiss_index_name</code> 빌드 매개변수가 필수입니다. Milvus는 레시피를 전용 Milvus 인덱스 유형으로 변환하지 않고 해당 값을 Faiss로 전달합니다.</p></li>
<li><p>빌드 및 검색 매개변수는 팩토리별로 다릅니다. 한 팩토리에서 지원하는 매개변수가 다른 팩토리에서는 거부될 수 있습니다.</p></li>
<li><p>스칼라 필터링을 사용하려면 기본 Faiss 인덱스가 ID 선택기를 지원해야 합니다. Milvus 3.0.0 테스트는 <code translate="no">Flat</code>, <code translate="no">IVF64,Flat</code> 및 <code translate="no">HNSW16,Flat</code> 부동 소수점 팩토리를 사용한 필터링 검색을 다룹니다. 모든 팩토리가 필터를 지원하거나, 이진 <code translate="no">FAISS</code> 인덱스가 스칼라 필터링을 지원한다고 가정해서는 안 됩니다.</p></li>
<li><p>검색 이터레이터는 지원되지 않습니다.</p></li>
<li><p>이 어댑터는 원시 벡터 검색 기능을 제공하지 않습니다.</p></li>
<li><p>범위 검색 지원 여부는 팩토리에 따라 다릅니다. Float <code translate="no">Flat</code> 는 릴리스 범위를 지원합니다. 이진 <code translate="no">FAISS</code> 인덱스에서는 범위 검색을 사용하지 마십시오.</p></li>
<li><p>팩토리가 성공적으로 빌드되더라도 일부 Milvus 검색 작업을 거부할 수 있습니다. 예를 들어, standalone <code translate="no">PQ8x4</code> 는 스칼라 필터링 검색에서 사용되는 선택기를 거부합니다. 필터링되지 않은 사용은 별도로 검증하십시오.</p></li>
<li><p>Milvus 3.0.0에서는 인덱스를 재로드한 후 <code translate="no">COSINE</code> 점수와 범위 검색 임계값을 다시 검증해야 합니다. Knowhere v3.0.6은 역직렬화 과정에서 <code translate="no">FAISS</code> 어댑터의 코사인 정규화 상태를 복원하지 않습니다.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">작동 원리<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>FAISS 인덱스 패스스루 워크플로우</span>
  
 </span></p>
<p>인덱스 구축 시, Milvus는 <code translate="no">faiss_index_name</code>, 벡터 필드 유형, 메트릭 및 기타 구축 매개변수를 Knowhere FAISS 어댑터로 전달합니다. 어댑터는 <code translate="no">FLOAT_VECTOR</code> 필드의 경우 <code translate="no">faiss::index_factory()</code> 를, <code translate="no">BINARY_VECTOR</code> 필드의 경우 <code translate="no">faiss::index_binary_factory()</code> 를 호출합니다. 그 결과 생성된 객체는 일반적인 Milvus 인덱스 수명 주기를 통해 관리되는 네이티브 Faiss 인덱스입니다.</p>
<p>검색 시, 어댑터는 제공된 팩토리별 매개변수를 일치하는 Faiss <code translate="no">SearchParameters</code> 객체로 변환합니다. 지원되는 부동소수점 팩토리의 경우, Milvus 필터 비트셋을 Faiss 선택자로도 전달합니다. 셀렉터 지원은 팩토리별로 다르며, 공개된 테스트에서는 이진 <code translate="no">FAISS</code> 인덱스에 대한 스칼라 필터링을 구현하지 않습니다. 이 때문에 레시피가 독립형 Faiss에서는 유효할 수 있지만, Milvus 검색 경로에서 요구하는 작업은 거부될 수 있습니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 이상</li>
<li>PyMilvus 3.0.0 이상</li>
<li>Faiss 인덱스 팩토리 구문 및 선택한 팩토리의 훈련 요구 사항에 대한 이해</li>
</ul>
<p>설치 방법은 <a href="/docs/ko/install-pymilvus.md">PyMilvus 설치를</a> 참조하십시오.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">팩토리 문자열 선택<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>팩토리 문자열은 Faiss 인덱스를 일련의 구성 요소로 설명합니다. 다음 예시는 Milvus 3.0.0 릴리스 테스트에서 검증되었습니다. 이 목록은 모든 경우를 망라하지는 않습니다.</p>
<table>
<thead>
<tr><th>팩토리 문자열</th><th>필드 유형</th><th>릴리스 테스트에서 검증된 메트릭</th><th>검색 매개변수</th><th>비고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>없음</td><td>정확한 검색.</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>64개의 역순 목록과 압축되지 않은 벡터를 사용하는 IVF.</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>플랫 벡터 저장을 사용하는 HNSW 그래프.</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>팩토리별</td><td>OPQ, IVF 및 PQ를 결합합니다. 사용자의 데이터로 훈련 규모와 재현율을 검증하십시오.</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>, <code translate="no">k_factor</code></td><td>PQ 후보 검색 후 플랫 리파이너를 사용합니다.</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>없음</td><td>릴리스 테스트가 내장되어 있습니다. 인덱스가 선택기를 거부하기 때문에 스칼라 필터링 검색이 실패합니다. 필터링되지 않은 사용은 별도로 검증하십시오.</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>없음</td><td>이진 벡터에 대한 정확한 검색.</td></tr>
</tbody>
</table>
<p><code translate="no">COSINE</code> 항목은 빌드 및 검색 스모크 테스트 범위를 나타냅니다. Milvus 3.0.0의 경우, 인덱스 재로드 후 점수 또는 범위 검색의 정확성을 보장하지 않습니다. <a href="#limits">‘제한 사항’을</a> 참조하십시오.</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">부동소수점 인덱스 빌드 및 검색<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 128차원 벡터 3,000개를 생성합니다. 이는 예제에서 사용되는 ‘ <code translate="no">IVF64,Flat</code> ’ 레시피에 충분한 훈련 데이터를 제공합니다. 인덱스를 빌드하고 검색하기 전에 설정 블록을 확장하여 실행하십시오.</p>
<p><details></p>
<p><summary>부동소수점 벡터 컬렉션 준비</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">인덱스 생성<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>' <code translate="no">index_type</code> '을 ' <code translate="no">FAISS</code>'로 설정하고, ' <code translate="no">faiss_index_name</code> '를 사용하여 네이티브 Faiss 팩토리 레시피를 선택하십시오.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IVF64,Flat</code> 팩토리 문자열은 64개의 역목록을 가진 IVF 인덱스를 생성하고 각 목록에 압축되지 않은 벡터를 저장합니다.</p>
<h3 id="Search-the-index" class="common-anchor-header">인덱스 검색<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">search_params.params</code> 내에서 팩토리별 검색 매개변수를 설정합니다. IVF 팩토리의 경우, <code translate="no">nprobe</code> 가 Faiss가 검색할 인버티드 리스트의 수를 제어합니다.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리는 ` <code translate="no">nprobe=8</code>`를 사용하므로, Faiss는 64개의 역색인 리스트 중 8개를 검색합니다. 필터는 ` <code translate="no">category</code> ` 값이 ` <code translate="no">reference</code>`인 엔티티로 결과를 제한합니다.</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">이진 인덱스 구축 및 검색<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">BINARY_VECTOR</code> 필드의 경우, <code translate="no">BFlat</code> 와 같은 이진 팩토리 문자열과 호환되는 이진 메트릭을 사용하십시오. 인덱스를 구축하고 검색하기 전에 설정 블록을 확장하여 실행하십시오.</p>
<p><details></p>
<p><summary>바이너리 벡터 컬렉션 준비</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">인덱스 구축<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>이 바이너리 벡터 예제에서는 <code translate="no">BFlat</code> 을 팩토리 문자열로, <code translate="no">HAMMING</code> 을 메트릭으로 사용하십시오.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">인덱스 검색<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> 에는 패밀리별 검색 매개변수가 없습니다. 검색 요청을 구성할 때 빈 <code translate="no">params</code> 매핑을 전달하십시오.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>각 128차원 바이너리 벡터는 16바이트로 표현됩니다. 자세한 내용은 <a href="/docs/ko/binary-vector.md">‘바이너리 벡터’를</a> 참조하십시오.</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">빌드 및 검색 매개변수 구성<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FAISS</code> 인덱스 유형에는 하나의 필수 패스스루 빌드 매개변수가 있습니다.</p>
<table>
<thead>
<tr><th>매개변수</th><th>위치</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> in <code translate="no">add_index()</code></td><td>Faiss 인덱스 팩토리 문자열입니다. 예: <code translate="no">IVF64,Flat</code>.</td></tr>
</tbody>
</table>
<p><code translate="no">search_params.params</code> 내부에서 팩토리별 검색 매개변수를 설정합니다. 다음 표에는 일반적인 예시가 나열되어 있으나, 이것이 전부는 아닙니다.</p>
<table>
<thead>
<tr><th>매개변수</th><th>예시 공장</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>검색할 역순 목록의 수.</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>HNSW 검색 후보 목록의 크기.</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>요청된 상위 K개에 대해 리파이너에 제공되는 후보의 수.</td></tr>
</tbody>
</table>
<p>Milvus는 어댑터가 인식하는 추가 매개변수만 전달합니다. 구체적인 팩토리 계열에서 지원하지 않는 알 수 없는 빌드 키와 검색 키는 거부됩니다. Milvus는 가능한 모든 팩토리에 대한 범용 매개변수 스키마를 유지하지 않습니다. 선택한 팩토리에 대한 Faiss 문서를 확인한 다음, 배포할 예정인 정확한 Milvus 버전 및 이미지를 기준으로 전체 빌드 및 검색 흐름을 검증하십시오.</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">오류 및 지원되지 않는 작업 처리<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>팩토리 문자열이 유효하지 않거나 Milvus 빌드에서 사용할 수 없는 경우, 인덱스 구축이 실패합니다. 컬렉션을 로드하기 전에 인덱스 상태와 실패 원인을 확인하십시오.</p></li>
<li><p>매개변수의 유형이 잘못된 경우 검색이 실패합니다. 예를 들어, ` <code translate="no">nprobe=&quot;invalid&quot;</code> `는 ` <code translate="no">nprobe</code> `가 숫자형이어야 하므로 거부됩니다.</p></li>
<li><p>매개변수가 구축된 팩토리에 적용되지 않는 경우, 어댑터는 이를 지원되지 않는 것으로 간주하여 거부합니다.</p></li>
<li><p>팩토리가 Milvus 선택자를 지원하지 않는 경우, 동일한 팩토리가 독립형 Faiss에서는 검색이 가능하더라도 필터링된 검색이 실패할 수 있습니다.</p></li>
<li><p><code translate="no">FAISS</code> 인덱스와 함께 <code translate="no">search_iterator()</code> 를 사용하지 마십시오.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ko/index-explained.md">'인덱스 설명</a>'에서 Milvus 인덱스가 어떻게 구성되어 있는지 알아보세요.</li>
<li>전용 <a href="/docs/ko/ivf-flat.md">IVF_FLAT</a> 및 <a href="/docs/ko/hnsw.md">HNSW</a> 인덱스 유형을 비교해 보세요.</li>
<li>팩토리에 사용할 메트릭을 선택하기 전에 <a href="/docs/ko/metric.md">‘메트릭 유형’을</a> 검토하십시오.</li>
</ul>
