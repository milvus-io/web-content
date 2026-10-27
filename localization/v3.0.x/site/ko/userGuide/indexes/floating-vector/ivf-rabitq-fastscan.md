---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN은 IVF, RaBitQ 이진 양자화 및 SIMD 배치 스캔을 결합하여 메모리 효율이 높고 처리량이 높은
  벡터 검색 기능을 제공합니다.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> IVF_RABITQ_FASTSCAN은 IVF 분할, RaBitQ 이진 양자화 및 FastScan 일괄 처리를 결합한 알고리즘입니다. 이 알고리즘은 데이터베이스 벡터에 대한 1비트 RaBitQ 코드를 저장하고, SIMD 처리에 적합한 32개의 데이터베이스 벡터 단위로 코드를 처리합니다. 따라서 근사값을 허용할 수 있는 고처리량, 메모리 제약이 있는 워크로드에 적합한 선택입니다.</p>
<p>검색 시 많은 후보를 스캔해야 하고 처리량이 최우선 목표인 경우에는 <a href="/docs/ko/ivf-rabitq.md">IVF_RABITQ</a> 대신 <code translate="no">IVF_RABITQ_FASTSCAN</code> 을 선택하십시오. FastScan의 쿼리당 초기화 비용은 압축된 코드 블록 전체에 분산되므로, 일반적으로 대규모 데이터셋이나 긴 IVF 목록에 더 유리합니다. 소규모 컬렉션이나 후보를 적게 검토하는 검색의 경우, 대신 <code translate="no">IVF_RABITQ</code> 를 사용하십시오. 또한 이 기능은 구성 가능한 쿼리 양자화, 더 다양한 정제 유형 및 반복자를 지원합니다.</p>
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 다음과 같은 단계를 거칩니다:</p>
<ol>
<li><strong>IVF 분할</strong>: IVF는 벡터를 <code translate="no">nlist</code> 클러스터로 그룹화하고, <code translate="no">nprobe</code> 에서 가장 가까운 클러스터를 검색합니다.</li>
<li><strong>RaBitQ 인코딩</strong>: 각 벡터 잔차는 차원당 1비트인 RaBitQ 코드로 인코딩됩니다.</li>
<li><strong>FastScan</strong>: 인덱스는 캐시 친화적인 SIMD 배치 처리를 위해 코드를 압축합니다. 각 배치에서 32개의 데이터베이스 벡터를 평가합니다.</li>
<li><strong>선택적 정제</strong>: 이 기능이 활성화되면, Milvus가 최종 결과를 반환하기 전에 FP32 정제기가 후보들에 대해 재평가를 수행합니다.</li>
</ol>
<p>기반이 되는 Faiss 인덱스는 <code translate="no">IndexIVFRaBitQFastScan</code> 입니다. Knowhere는 이를 무작위 회전 변환으로 감싸고, 선택적으로 FP32 정밀화기를 추가합니다.</p>
<p>FastScan은 압축된 코드 블록을 스캔하기 전에 쿼리 관련 조회 테이블을 구축하고 양자화하는 등 쿼리별 설정 작업을 수행합니다. 사용자의 데이터와 검색 매개변수를 사용하여 <code translate="no">IVF_RABITQ</code> 및 <code translate="no">IVF_RABITQ_FASTSCAN</code> 를 모두 벤치마킹해 보십시오.</p>
<h2 id="Build-index" class="common-anchor-header">인덱스 구축<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">IVF_RABITQ_FASTSCAN</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 메서드를 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개변수를 지정하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서:</p>
<ul>
<li><p><code translate="no">index_type</code>: 생성할 인덱스의 유형입니다. 이 예제에서는 값을 <code translate="no">IVF_RABITQ_FASTSCAN</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 방법입니다. 지원되는 값으로는 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 등이 있습니다. 자세한 내용은 <a href="/docs/ko/metric.md">‘메트릭 유형’을</a> 참조하십시오.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/ivf-rabitq-fastscan.md#Index-building-params">‘인덱스 구축 매개변수’를</a> 참조하십시오.</p></li>
</ul>
<p>인덱스 매개변수 구성이 완료되면, ` <code translate="no">create_index()</code> ` 메서드를 직접 사용하거나 ` <code translate="no">create_collection</code> ` 메서드에 인덱스 매개변수를 전달하여 인덱스를 생성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">‘컬렉션 생성’을</a> 참조하십시오.</p>
<h2 id="Search-on-index" class="common-anchor-header">인덱스 검색<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스가 구축되고 엔티티가 삽입되면, 인덱스를 사용하여 유사도 검색을 수행할 수 있습니다.</p>
<p><code translate="no">nprobe</code> 를 설정하여 검색할 IVF 클러스터 수를 제어할 수 있습니다. 인덱스가 정제(refinement) 기능과 함께 구축된 경우, <code translate="no">refine_k</code> 를 사용하여 FP32 정제기에 전달되는 후보 풀을 제어하십시오.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는:</p>
<ul>
<li><code translate="no">params</code>: 인덱스 검색을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/ivf-rabitq-fastscan.md#Index-specific-search-params">‘인덱스별 검색 매개변수’를</a> 참조하십시오.</li>
</ul>
<div class="alert note">
<p><code translate="no">IVF_RABITQ</code> 와 달리, <code translate="no">IVF_RABITQ_FASTSCAN</code> 는 <code translate="no">rbq_bits_query</code> 검색 매개변수를 허용하지 않습니다. FastScan은 내부적으로 항상 8비트 쿼리 양자화를 사용하므로, <code translate="no">rbq_bits_query</code> 를 생략하거나 <code translate="no">0</code> 로 설정하십시오. 이보다 큰 값은 거부됩니다.</p>
</div>
<h2 id="Index-params" class="common-anchor-header">인덱스 매개변수<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 인덱스를 생성하고 인덱스를 기반으로 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 생성 매개변수<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/ivf-rabitq-fastscan.md#Build-index">인덱스를 생성할</a> 때 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>튜닝 권장 사항</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>인덱스 생성 시 k-means 알고리즘을 사용하여 생성할 클러스터의 수입니다. 중심점(centroid)으로 표현되는 각 클러스터는 벡터 목록을 저장합니다. 이 매개변수의 값을 늘리면 각 클러스터에 포함된 벡터의 수가 줄어들어, 더 작고 집중된 파티션이 생성됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수<br><strong>범위</strong>: [1, 65536]<br><strong>기본값</strong>: <code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> 값을 크게 설정하면 더 정교한 클러스터가 생성되어 리콜이 향상되지만, 인덱스 구축 시간이 늘어납니다. 데이터셋 크기와 사용 가능한 리소스를 고려하여 최적화하십시오. 대부분의 경우 [32, 4096] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>정제 프로세스를 활성화하고 정제된 데이터를 저장합니다. <code translate="no">IVF_RABITQ_FASTSCAN</code> 는 FP32 정제만 지원합니다.</p></td>
     <td><p><strong>유형</strong>: 부울<br><strong>범위</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>기본값</strong>: <code translate="no">false</code></p></td>
     <td><p>0.9 이상의 리콜률이 필요한 경우 <code translate="no">true</code> 로 설정하십시오. 정제 기능을 활성화하면 정확도는 향상되지만, 저장 공간 요구량과 인덱스 생성 시간이 증가합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p><code translate="no">refine</code> 이 활성화된 경우 정밀화 시 사용되는 데이터 표현 방식을 정의합니다. <code translate="no">refine</code> 이 <code translate="no">true</code> 일 때만 필수입니다.</p></td>
     <td><p><strong>유형</strong>: 문자열<br><strong>범위</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>기본값</strong>: 없음</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> FP32 정제만 지원하며, <code translate="no">FLAT</code> 은 <code translate="no">FP32</code> 과 동일합니다. 값 일치 시 대소문자를 구분하지 않습니다.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/ivf-rabitq-fastscan.md#Search-on-index">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 권장 사항</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>후보 클러스터를 검색할 클러스터 수입니다. 값이 높을수록 더 많은 클러스터를 검색할 수 있어 검색 범위를 확장함으로써 리콜률을 향상시키지만, 쿼리 지연 시간이 증가하는 단점이 있습니다.</p></td>
     <td><p><strong>유형</strong>: 정수<br><strong>범위</strong>: [1, <em>nlist</em>]<br><strong>기본값</strong>: <code translate="no">8</code></p></td>
     <td><p>이 값을 높이면 재현율이 향상되지만 검색 속도가 느려질 수 있습니다. 속도와 정확도의 균형을 맞추려면 ` <code translate="no">nprobe</code> `을 ` <code translate="no">nlist</code> `에 비례하여 설정하십시오. 대부분의 경우 [1, <em>nlist</em>] 범위 내의 값을 설정하는 것을 권장합니다.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>정제 과정에서는 더 높은 품질의 양자화를 사용하여, IVF_RABITQ_FASTSCAN을 통해 선택된 후보 풀( <code translate="no">refine_k</code> 배 더 큰 규모)에서 필요한 수의 가장 가까운 이웃을 선별합니다. 정제 기능이 비활성화된 경우에는 효과가 없습니다.</p></td>
     <td><p><strong>유형</strong>: 부동소수점<br><strong>범위</strong>: [1, <em>float_max</em>)<br><strong>기본값</strong>: <code translate="no">1</code></p></td>
     <td><p><code translate="no">refine_k</code> 값이 높을수록 QPS는 감소하지만 리콜률은 증가합니다. <code translate="no">1</code> 으로 시작하여 <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code>, <code translate="no">5</code> 등의 값을 테스트하여 데이터셋에 맞는 QPS와 리콜률 간의 최적의 균형을 찾으십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>쿼리 벡터에 대한 추가 스칼라 양자화를 적용할지 여부를 설정합니다. <strong> <code translate="no">IVF_RABITQ_FASTSCAN</code> 에서는 지원되지 않습니다</strong>. 이 인덱스는 내부적으로 항상 8비트 쿼리 양자화를 사용합니다. 이 매개변수를 생략하거나 <code translate="no">0</code> 로 설정하십시오. <code translate="no">0</code> 보다 큰 값은 거부됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수<br><strong>범위</strong>: [0, 0]<br><strong>기본값</strong>: <code translate="no">0</code></p></td>
     <td><p>설정하지 마십시오. 쿼리 양자화를 구성하려면 대신 <a href="/docs/ko/ivf-rabitq.md">IVF_RABITQ를</a> 사용하십시오.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">제한 사항<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan은 고정된 1비트 RaBitQ 데이터베이스 인코딩과 8비트 쿼리 양자화를 사용합니다. <code translate="no">rbq_bits_query</code> 는 생략하거나 <code translate="no">0</code> 로 설정해야 합니다.</li>
<li>FP32( <code translate="no">FLAT</code> 와 동일) 정밀도 조정만 지원됩니다.</li>
<li>이테레이터는 지원되지 않습니다.</li>
<li>이 기능은 CPU 인덱스입니다. GPU에서는 실행되지 않습니다.</li>
<li>실제 성능은 CPU SIMD 지원 여부, 벡터 차원, <code translate="no">nlist</code>, <code translate="no">nprobe</code> 및 데이터 분포에 따라 달라집니다. 프로덕션 환경에 배포하기 전에 워크로드를 사용하여 벤치마킹을 수행하십시오.</li>
</ul>
<p>FastScan이 아닌 RaBitQ 변형 및 해당 추가 정제 옵션에 대해서는 <a href="/docs/ko/ivf-rabitq.md">IVF_RABITQ를</a> 참조하십시오.</p>
