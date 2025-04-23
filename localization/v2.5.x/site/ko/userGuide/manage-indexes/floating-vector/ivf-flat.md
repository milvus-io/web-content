---
id: ivf-flat.md
title: IVF_FLAT
summary: IVF_FLAT 인덱스는 부동 소수점 벡터의 검색 성능을 향상시킬 수 있는 인덱싱 알고리즘입니다.
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_FLAT</strong> 인덱스는 부동 소수점 벡터의 검색 성능을 향상시킬 수 있는 인덱싱 알고리즘입니다.</p>
<p>이 인덱스 유형은 빠른 쿼리 응답과 높은 정확도가 필요한 대규모 데이터 세트에 이상적이며, 특히 데이터 세트를 클러스터링하면 검색 공간을 줄일 수 있고 클러스터 데이터를 저장하기에 충분한 메모리를 사용할 수 있는 경우에 적합합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>IVF_FLAT이라는</strong> 용어는 부동소수점 벡터의 인덱싱과 검색에 대한 이중 계층 접근 방식을 캡슐화하는 <strong>역파일 플랫(Inverted File Flat</strong>)의 약자입니다:</p>
<ul>
<li><p><strong>반전된 파일(IVF):</strong> <a href="https://en.wikipedia.org/wiki/K-means_clustering">K-평균 클러스터링을</a> 사용해 벡터 공간을 관리 가능한 영역으로 클러스터링하는 것을 말합니다. 각 클러스터는 <strong>중심점으로</strong> 표시되며, 그 안에 있는 벡터의 기준점 역할을 합니다.</p></li>
<li><p><strong>플랫:</strong> 정확한 거리 계산을 위해 각 클러스터 내에서 벡터가 압축이나 양자화 없이 원래의 형태(플랫 구조)로 저장됨을 나타냅니다.</p></li>
</ul>
<p>다음 그림은 그 작동 방식을 보여줍니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow.png" alt="IVF FLAT Workflow" class="doc-image" id="ivf-flat-workflow" />
   </span> <span class="img-wrapper"> <span>IVF 플랫 워크플로</span> </span></p>
<p>이 인덱싱 방법은 검색 프로세스의 속도를 높여주지만, 쿼리 임베딩에 가장 가까운 것으로 발견된 후보가 정확히 가장 가까운 후보가 아닐 수 있다는 잠재적인 단점이 있습니다. 쿼리 임베딩에 가장 가까운 임베딩이 가장 가까운 중심을 기준으로 선택한 클러스터와 다른 클러스터에 있는 경우 이러한 문제가 발생할 수 있습니다(아래 시각화 참조).</p>
<p>이 문제를 해결하기 위해 <strong>IVF_FLAT은</strong> 조정할 수 있는 두 가지 하이퍼파라미터를 제공합니다:</p>
<ul>
<li><p><code translate="no">nlist</code>: k-평균 알고리즘을 사용하여 생성할 파티션의 수를 지정합니다.</p></li>
<li><p><code translate="no">nprobe</code>: 후보를 검색하는 동안 고려할 파티션 수를 지정합니다.</p></li>
</ul>
<p>이제 <code translate="no">nprobe</code> 을 1 대신 3으로 설정하면 다음과 같은 결과가 나타납니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow-2.png" alt="IVF FLAT Workflow 2" class="doc-image" id="ivf-flat-workflow-2" />
   </span> <span class="img-wrapper"> <span>IVF 플랫 워크플로 2</span> </span></p>
<p><code translate="no">nprobe</code> 값을 늘리면 검색에 더 많은 파티션을 포함할 수 있으므로 쿼리와 가장 가까운 임베딩이 다른 파티션에 있더라도 놓치지 않고 찾을 수 있습니다. 하지만 더 많은 후보를 평가해야 하므로 검색 시간이 늘어나는 대가가 따릅니다. 인덱스 매개변수 조정에 대한 자세한 내용은 <a href="/docs/ko/ivf-flat.md#Index-params">인덱스</a> 매개변수를 참조하세요.</p>
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">IVF_FLAT</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개 변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">IVF_FLAT</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다.</p>
<ul>
<li><code translate="no">nlist</code>: 데이터 세트를 분할할 클러스터의 수입니다.</li>
</ul>
<p><code translate="no">IVF_FLAT</code> 인덱스에 사용할 수 있는 더 많은 구축 매개변수에 대해 알아보려면 <a href="/docs/ko/ivf-flat.md#Index-building-params">인덱스 구축</a> 매개변수를 참조하세요.</p></li>
</ul>
<p>인덱스 파라미터가 구성되면 <code translate="no">create_index()</code> 메서드를 직접 사용하거나 <code translate="no">create_collection</code> 메서드에서 인덱스 파라미터를 전달하여 인덱스를 생성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
<h2 id="Search-on-index" class="common-anchor-header">인덱스에서 검색<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스가 구축되고 엔티티가 삽입되면 인덱스에서 유사도 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">params</code>: 색인에서 검색을 위한 추가 구성 옵션.</p>
<ul>
<li><code translate="no">nprobe</code>: 검색할 클러스터 수입니다.</li>
</ul>
<p><code translate="no">IVF_FLAT</code> 인덱스에 사용할 수 있는 검색 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-flat.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</p></li>
</ul>
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
    </button></h2><p>이 섹션에서는 인덱스를 만들고 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-flat.md#Build-index">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>인덱스 구축 시 k-평균 알고리즘을 사용하여 생성할 클러스터의 수입니다. 중심점으로 표시되는 각 클러스터는 벡터 목록을 저장합니다. 이 매개변수를 늘리면 각 클러스터의 벡터 수가 줄어들어 더 작고 집중적인 파티션이 만들어집니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 65536]</p><p><strong>기본값입니다</strong>: <code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> 값이 클수록 더 세분화된 클러스터를 생성하여 정확도가 향상되지만 인덱스 구축 시간이 늘어납니다. 데이터 세트 크기와 사용 가능한 리소스에 따라 최적화하세요. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-flat.md#Search-on-index">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>튜닝 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>후보를 검색할 클러스터의 수입니다. 값이 클수록 더 많은 클러스터를 검색할 수 있으므로 검색 범위가 확장되어 회상률이 향상되지만 쿼리 대기 시간이 늘어납니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>nlist</em>]</p><p><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p>이 값을 늘리면 검색 회수율은 향상되지만 검색 속도가 느려질 수 있습니다. 속도와 정확도의 균형을 맞추려면 <code translate="no">nprobe</code> 을 <code translate="no">nlist</code> 에 비례하여 설정하세요.</p><p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1, nlist].</p></td>
   </tr>
</table>
