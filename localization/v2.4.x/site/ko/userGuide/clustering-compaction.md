---
id: clustering-compaction.md
title: 클러스터링 압축
related_key: 'clustering, compaction'
summary: >-
  클러스터링 압축은 대규모 컬렉션에서 검색 성능을 개선하고 비용을 절감하기 위해 고안되었습니다. 이 가이드는 클러스터링 압축을 이해하고 이
  기능을 통해 검색 성능을 개선하는 방법을 이해하는 데 도움이 됩니다.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">클러스터링 압축<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>클러스터링 압축은 대규모 컬렉션에서 검색 성능을 개선하고 비용을 절감하기 위해 고안되었습니다. 이 가이드는 클러스터링 압축을 이해하고 이 기능을 통해 검색 성능을 개선하는 방법을 이해하는 데 도움이 됩니다.</p>
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
    </button></h2><p>Milvus는 들어오는 엔티티를 컬렉션 내의 세그먼트에 저장하고 세그먼트가 가득 차면 세그먼트를 봉인합니다. 이 경우 추가 엔티티를 수용하기 위해 새 세그먼트가 생성됩니다. 결과적으로 엔티티는 세그먼트 간에 임의로 분산됩니다. 이러한 분포로 인해 Milvus는 주어진 쿼리 벡터에 가장 가까운 이웃을 찾기 위해 여러 세그먼트를 검색해야 합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>클러스터링 없이 압축</span> </span></p>
<p>Milvus가 특정 필드의 값을 기반으로 세그먼트 간에 엔티티를 분산할 수 있다면 검색 범위를 한 세그먼트 내에서 제한할 수 있으므로 검색 성능이 향상됩니다.</p>
<p><strong>클러스터링</strong> 압축은 스칼라 필드의 값을 기반으로 컬렉션의 세그먼트 간에 엔티티를 재분배하는 Milvus의 기능입니다. 이 기능을 사용하려면 먼저 <strong>클러스터링 키로</strong> 스칼라 필드를 선택해야 합니다. 이렇게 하면 클러스터링 키 값이 특정 범위에 속할 때 Milvus가 엔티티를 세그먼트에 재분배할 수 있습니다. 클러스터링 압축을 트리거하면 Milvus는 세그먼트와 클러스터링 키 값 간의 매핑 관계를 기록하는 <strong>PartitionStats라는</strong> 글로벌 인덱스를 생성/업데이트합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>클러스터링 압축 사용</span> </span></p>
<p>Milvus는 <strong>PartitionStats를</strong> 참조로 사용하여 클러스터링 키 값이 포함된 검색/쿼리 요청을 수신하면 관련 없는 데이터를 정리하고 해당 값에 매핑되는 세그먼트 내에서 검색 범위를 제한하여 검색 성능을 개선할 수 있습니다. 성능 향상에 대한 자세한 내용은 벤치마크 테스트를 참조하세요.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">클러스터링 압축 사용<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 클러스터링 압축 기능은 고도로 구성할 수 있습니다. 수동으로 트리거하거나 Milvus에서 일정 간격으로 자동으로 트리거되도록 설정할 수 있습니다. 클러스터링 압축을 활성화하려면 다음과 같이 하세요:</p>
<h3 id="Global-Configuration" class="common-anchor-header">전역 구성</h3><p>아래와 같이 Milvus 구성 파일을 수정해야 합니다.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>구성 항목</th><th>설명</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>클러스터링 압축을 활성화할지 여부를 지정합니다.<br>클러스터링 키가 있는 모든 컬렉션에 대해 이 기능을 활성화해야 하는 경우 <code translate="no">true</code> 로 설정합니다.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>자동으로 트리거되는 압축을 활성화할지 여부를 지정합니다.<br><code translate="no">true</code> 로 설정하면 Milvus가 클러스터링 키가 있는 컬렉션을 지정된 간격으로 압축합니다.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Milvus가 클러스터링 압축을 시작하는 간격(밀리초)을 지정합니다.<br>이 매개 변수는 <code translate="no">autoEnable</code> 가 <code translate="no">true</code> 로 설정된 경우에만 유효합니다.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>최소 간격을 초 단위로 지정합니다.<br>이 매개변수는 <code translate="no">autoEnable</code> 이 <code translate="no">true</code> 으로 설정된 경우에만 유효합니다.<br>이 값을 triggerInterval보다 큰 정수로 설정하면 짧은 기간 내에 반복되는 압축을 방지하는 데 도움이 됩니다.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>최대 간격을 초 단위로 지정합니다.<br>이 매개변수는 <code translate="no">autoEnable</code> 가 <code translate="no">true</code> 로 설정된 경우에만 유효합니다.<br>이 값보다 긴 기간 동안 컬렉션이 클러스터링 압축되지 않은 것을 Milvus가 감지하면 클러스터링 압축을 강제로 수행합니다.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>클러스터링 압축을 트리거할 상한 임계값을 지정합니다.<br>이 매개변수는 <code translate="no">autoEnable</code> 이 <code translate="no">true</code> 으로 설정된 경우에만 유효합니다.<br>Milvus는 컬렉션의 데이터 볼륨이 이 값을 초과하는 것을 감지하면 클러스터링 압축 프로세스를 시작합니다.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>클러스터링 압축의 시간 초과 기간을 지정합니다.<br>실행 시간이 이 값을 초과하면 클러스터링 압축이 실패합니다.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>구성 항목</th><th>설명</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Milvus가 검색/쿼리 요청을 수신할 때 PartitionStats를 참조하여 데이터를 정리할지 여부를 지정합니다.<br><code translate="no">true</code> 로 설정하면 Milvus가 검색/쿼리 요청 중에 세그먼트에서 관련 없는 데이터를 정리할 수 있습니다.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>구성 항목</th><th>설명</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>클러스터링 압축 작업의 메모리 버퍼 비율을 지정합니다. <br>데이터 크기가 이 비율을 사용하여 계산된 할당된 버퍼 크기를 초과하면 Milvus는 데이터를 플러시합니다.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>클러스터링 압축 작업의 작업자 풀 크기를 지정합니다.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>구성 항목</th><th>설명</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>컬렉션의 파티션 키를 클러스터링 키로 사용할지 여부를 지정합니다.<br><code translate="no">true</code> 로 설정하면 파티션 키가 클러스터링 키로 사용됩니다.<br>컬렉션에서 클러스터링 키를 명시적으로 설정하여 언제든지 이 설정을 재정의할 수 있습니다.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>위의 변경 사항을 Milvus 클러스터에 적용하려면 <a href="/docs/ko/v2.4.x/configure-helm.md">헬름으로 Milvus 구성하기</a> 및 Milvus <a href="/docs/ko/v2.4.x/configure_operator.md">오퍼레이터로 Milvus 구성하기의</a> 단계를 따르세요.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">수집 구성</h3><p>특정 컬렉션에서 클러스터링 압축을 하려면 컬렉션에서 스칼라 필드를 클러스터링 키로 선택해야 합니다.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>다음 데이터 유형의 스칼라 필드를 클러스터링 키로 사용할 수 있습니다: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">클러스터링 압축 트리거<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>자동 클러스터링 압축을 활성화한 경우, Milvus는 지정된 간격으로 압축을 자동으로 트리거합니다. 또는 다음과 같이 수동으로 압축을 트리거할 수 있습니다:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">벤치마크 테스트</h3><p>데이터 볼륨과 쿼리 패턴을 결합하여 클러스터링 압축이 가져올 수 있는 성능 향상을 결정합니다. 내부 벤치마크 테스트에 따르면 클러스터링 압축은 초당 쿼리 수(QPS)를 최대 25배까지 향상시키는 것으로 나타났습니다.</p>
<p>벤치마크 테스트는 키 필드가 클러스터링 키로 지정된 2,000만 768차원 LAION 데이터 세트의 엔티티가 포함된 컬렉션에 대한 것입니다. 컬렉션에서 클러스터링 압축이 트리거된 후, CPU 사용량이 최고 수준에 도달할 때까지 동시 검색이 전송됩니다.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">검색 필터</th>
      <th rowspan="2">프루닝 비율</th>
      <th colspan="5">지연 시간(ms)</th>
      <th rowspan="2">QPS(요청/초)</th>
    </tr>
    <tr>
      <th>평균</th>
      <th>Min</th>
      <th>최대</th>
      <th>중앙값</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>없음</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>키 &gt; 200 및 키 &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>키 &gt; 200 및 키 &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>키 &gt; 200 및 키 &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>키 == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>검색 필터에서 검색 범위가 좁아질수록 프룬 비율이 증가합니다. 이는 검색 과정에서 더 많은 엔티티가 생략된다는 의미입니다. 첫 번째 행과 마지막 행의 통계를 비교하면 클러스터링 압축이 없는 검색은 전체 컬렉션을 스캔해야 한다는 것을 알 수 있습니다. 반면, 특정 키를 사용해 클러스터링 압축을 적용한 검색은 최대 25배까지 개선될 수 있습니다.</p>
<h2 id="Best-practices" class="common-anchor-header">모범 사례<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>다음은 클러스터링 압축을 효율적으로 사용하기 위한 몇 가지 팁입니다:</p>
<ul>
<li><p>데이터 볼륨이 큰 컬렉션에 이 기능을 사용 설정합니다. 컬렉션의 데이터 볼륨이 클수록 검색 성능이 향상됩니다. 엔터티가 100만 개가 넘는 컬렉션에 이 기능을 사용하도록 설정하는 것이 좋습니다.</p></li>
<li><p>적절한 클러스터링 키 선택. 필터링 조건으로 일반적으로 사용되는 스칼라 필드를 클러스터링 키로 사용할 수 있습니다. 여러 테넌트의 데이터를 보유하는 컬렉션의 경우, 한 테넌트와 다른 테넌트를 구분하는 필드를 클러스터링 키로 활용할 수 있습니다.</p></li>
<li><p>파티션 키를 클러스터링 키로 사용하세요. Milvus 인스턴스의 모든 컬렉션에 이 기능을 사용하도록 설정하거나 파티션 키가 있는 대규모 컬렉션에서 여전히 성능 문제가 발생하는 경우 <code translate="no">common.usePartitionKeyAsClusteringKey</code> 을 true로 설정할 수 있습니다. 이렇게 하면 컬렉션에서 스칼라 필드를 파티션 키로 선택할 때 클러스터링 키와 파티션 키를 갖게 됩니다.</p>
<p>이 설정은 다른 스칼라 필드를 클러스터링 키로 선택하는 것을 방해하지 않습니다. 명시적으로 지정된 클러스터링 키가 항상 우선합니다.</p></li>
</ul>
