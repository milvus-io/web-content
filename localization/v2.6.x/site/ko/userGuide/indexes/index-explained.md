---
id: index-explained.md
title: 인덱스 설명
summary: >-
  인덱스는 데이터 위에 구축된 추가 구조입니다. 내부 구조는 사용 중인 대략적인 최인접 이웃 검색 알고리즘에 따라 달라집니다. 인덱스를
  사용하면 검색 속도가 빨라지지만 검색 중에 전처리 시간, 공간, RAM이 추가로 발생합니다. 또한 인덱스를 사용하면 일반적으로 리콜률이
  낮아집니다(그 효과는 무시할 수 있지만 여전히 중요합니다). 따라서 이 문서에서는 색인 사용으로 인한 비용을 최소화하면서 이점을 극대화하는
  방법에 대해 설명합니다.
---
<h1 id="Index-Explained" class="common-anchor-header">인덱스 설명<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>인덱스는 데이터 위에 구축된 추가 구조입니다. 내부 구조는 사용 중인 대략적인 최인접 이웃 검색 알고리즘에 따라 달라집니다. 인덱스를 사용하면 검색 속도가 빨라지지만 검색 중에 전처리 시간, 공간 및 RAM이 추가로 발생합니다. 또한 인덱스를 사용하면 일반적으로 리콜률이 낮아집니다(그 효과는 무시할 수 있지만 여전히 중요합니다). 따라서 이 문서에서는 색인 사용으로 인한 비용을 최소화하면서 이점을 극대화하는 방법에 대해 설명합니다.</p>
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
    </button></h2><p>Milvus에서 인덱스는 필드에 한정되어 있으며, 대상 필드의 데이터 유형에 따라 적용 가능한 인덱스 유형이 달라집니다. 전문 벡터 데이터베이스로서 Milvus는 벡터 검색과 스칼라 필터링의 성능을 모두 향상시키는 데 중점을 두고 있으며, 이 때문에 다양한 인덱스 유형을 제공합니다.</p>
<p>다음 표에는 필드 데이터 유형과 적용 가능한 인덱스 유형 간의 매핑 관계가 나와 있습니다.</p>
<table>
   <tr>
     <th><p>필드 데이터 유형</p></th>
     <th><p>적용 가능한 인덱스 유형</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED(권장)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li>BITMAP(권장)</li><li>INVERTED</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>INVERTED</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FLOAT</li><li>DOUBLE</li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(BOOL, INT8/16/32/64 및 VARCHAR 타입의 요소)</sup></p></td>
     <td><p>BITMAP(권장)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(BOOL, INT8/16/32/64, FLOAT, DOUBLE 및 VARCHAR 타입의 요소)</sup></p></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>이 문서에서는 적절한 벡터 인덱스를 선택하는 방법에 대해 중점적으로 설명합니다. 스칼라 필드의 경우 항상 권장 인덱스 유형을 사용할 수 있습니다.</p>
<p>벡터 검색에 적합한 인덱스 유형을 선택하면 성능과 리소스 사용량에 큰 영향을 미칠 수 있습니다. 벡터 필드에 대한 인덱스 유형을 선택할 때는 기본 데이터 구조, 메모리 사용량, 성능 요구 사항 등 다양한 요소를 고려해야 합니다.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">벡터 인덱스 구조<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 다이어그램에서 볼 수 있듯이 Milvus의 인덱스 유형은 <strong>데이터 구조</strong>, <strong>양자화</strong>, <strong>정제기의</strong> 세 가지 핵심 구성 요소로 이루어져 있습니다. 양자화 및 정제기는 선택 사항이지만 비용 대비 이득이 크기 때문에 널리 사용됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>벡터 인덱스 구조</span> </span></p>
<p>인덱스를 생성하는 동안 Milvus는 선택한 데이터 구조와 양자화 방법을 결합하여 최적의 <strong>확장 속도를</strong> 결정합니다. 쿼리 시, 시스템은 <code translate="no">topK × expansion rate</code> 후보 벡터를 검색하고, 리파이너를 적용하여 더 높은 정밀도로 거리를 재계산한 다음, 최종적으로 가장 정확한 <code translate="no">topK</code> 결과를 반환합니다. 이 하이브리드 접근 방식은 리소스 집약적인 정제 작업을 필터링된 후보 하위 집합으로 제한하여 속도와 정확도의 균형을 맞춥니다.</p>
<h3 id="Data-structure" class="common-anchor-header">데이터 구조</h3><p>데이터 구조는 인덱스의 기본 계층을 형성합니다. 일반적인 유형은 다음과 같습니다:</p>
<ul>
<li><p><strong>반전 파일(IVF)</strong></p>
<p>IVF 계열 인덱스 유형은 Milvus가 중심 기반 파티셔닝을 통해 벡터를 버킷으로 클러스터링할 수 있게 해줍니다. 일반적으로 버킷 중심이 쿼리 벡터에 가까우면 버킷에 있는 모든 벡터가 쿼리 벡터에 가까울 가능성이 높다고 가정하는 것이 안전합니다. 이 전제를 바탕으로 Milvus는 전체 데이터 세트를 검사하지 않고 중심이 쿼리 벡터에 가까운 버킷의 벡터 임베딩만 스캔합니다. 이 전략은 허용 가능한 정확도를 유지하면서 계산 비용을 줄여줍니다.</p>
<p>이러한 유형의 인덱스 데이터 구조는 빠른 처리량이 필요한 대규모 데이터 세트에 이상적입니다.</p></li>
<li><p><strong>그래프 기반 구조</strong></p>
<p>계층적 탐색 가능한 작은 세계<a href="https://arxiv.org/abs/1603.09320">(HNSW)</a>와 같은 벡터 검색을 위한 그래프 기반 데이터 구조는 각 벡터가 가장 가까운 이웃에 연결되는 계층형 그래프를 구성합니다. 쿼리는 거친 상위 계층에서 시작하여 하위 계층으로 전환하면서 이 계층 구조를 탐색하므로 로그 시간 검색의 복잡성을 효율적으로 처리할 수 있습니다.</p>
<p>이러한 유형의 인덱스 데이터 구조는 고차원 공간과 저지연 쿼리가 필요한 시나리오에서 탁월한 성능을 발휘합니다.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">양자화</h3><p>양자화는 더 거친 표현을 통해 메모리 사용량과 계산 비용을 줄여줍니다:</p>
<ul>
<li><p><strong>스칼라 양자화</strong> (예: <strong>SQ8</strong>)는 각 벡터 차원을 단일 바이트(8비트)로 압축하여 32비트 플로트에 비해 메모리 사용량을 75%까지 줄이면서도 적절한 정확도를 유지할 수 있습니다.</p></li>
<li><p><strong>제품 양자화</strong><strong>(PQ)</strong>를 통해 Milvus는 벡터를 서브벡터로 분할하고 코드북 기반 클러스터링을 사용하여 인코딩할 수 있습니다. 이를 통해 리콜을 약간 줄이면서 더 높은 압축률(예: 4~32배)을 달성할 수 있으므로 메모리가 제한된 환경에 적합합니다.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">리파이너</h3><p>양자화는 본질적으로 손실이 있습니다. 리콜률을 유지하기 위해 양자화는 필요 이상으로 많은 상위 K 후보를 지속적으로 생성하며, 리파이너는 더 높은 정밀도를 사용해 이러한 후보에서 상위 K 결과를 추가로 선택함으로써 리콜률을 향상시킬 수 있습니다.</p>
<p>예를 들어, FP32 리파이너는 양자화를 통해 반환된 검색 결과 후보에 대해 양자화된 값이 아닌 FP32 정밀도를 사용해 거리를 다시 계산하는 방식으로 작동합니다.</p>
<p>이는 사소한 거리 변화가 결과 품질에 큰 영향을 미치는 시맨틱 검색이나 추천 시스템과 같이 검색 효율성과 정밀도 간의 절충이 필요한 애플리케이션에 매우 중요합니다.</p>
<h3 id="Summary" class="common-anchor-header">요약</h3><p>데이터 구조를 통한 거친 필터링, 양자화를 통한 효율적인 계산, 세분화를 통한 정밀도 조정이라는 계층화된 아키텍처를 통해 Milvus는 정확도와 성능의 트레이드오프를 적절히 최적화할 수 있습니다.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">성능 트레이드 오프<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>성능을 평가할 때는 <strong>빌드 시간</strong>, <strong>초당 쿼리 수(QPS)</strong>, <strong>리콜률의</strong> 균형을 맞추는 것이 중요합니다. 일반적인 규칙은 다음과 같습니다:</p>
<ul>
<li><p><strong>그래프 기반 인덱스 유형은</strong> 일반적으로 <strong>QPS</strong> 측면에서 <strong>IVF 변형보다</strong> 성능이 우수합니다.</p></li>
<li><p><strong>IVF 변형</strong> 은 특히 <strong>상위 K가 큰</strong> 시나리오 <strong>(예: 2,000개 이상)</strong>에 적합합니다.</p></li>
<li><p><strong>PQ는</strong> 일반적으로 <strong>SQ와</strong> 비교할 때 비슷한 압축률에서 더 나은 리콜률을 제공하지만, 후자는 더 빠른 성능을 제공합니다.</p></li>
<li><p><strong>DiskANN에서와</strong> 같이 인덱스의 일부에 하드 드라이브를 사용하면 대규모 데이터 세트를 관리하는 데 도움이 되지만, 잠재적인 IOPS 병목 현상이 발생할 수도 있습니다.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">용량</h3><p>용량은 일반적으로 데이터 크기와 사용 가능한 RAM 간의 관계와 관련이 있습니다. 용량을 다룰 때는 다음 사항을 고려하세요:</p>
<ul>
<li><p>원시 데이터의 1/4이 메모리에 들어가는 경우 안정적인 지연 시간을 제공하는 DiskANN을 고려하세요.</p></li>
<li><p>모든 원시 데이터가 메모리에 맞는 경우 메모리 기반 인덱스 유형과 mmap을 고려하세요.</p></li>
<li><p>양자화 적용 인덱스 유형과 mmap을 사용해 정확도와 최대 용량을 맞바꿀 수 있습니다.</p></li>
</ul>
<div class="alert note">
<p>Mmap이 항상 해결책은 아닙니다. 대부분의 데이터가 디스크에 있는 경우 DiskANN이 더 나은 지연 시간을 제공합니다.</p>
</div>
<h3 id="Recall" class="common-anchor-header">리콜</h3><p>리콜은 일반적으로 검색 전에 필터링되는 데이터를 의미하는 필터 비율과 관련이 있습니다. 리콜을 처리할 때 다음 사항을 고려하세요:</p>
<ul>
<li><p>필터 비율이 85% 미만인 경우, 그래프 기반 인덱스 유형이 IVF 변형보다 성능이 우수합니다.</p></li>
<li><p>필터 비율이 85%에서 95% 사이인 경우 IVF 변형을 사용합니다.</p></li>
<li><p>필터 비율이 98%를 초과하는 경우 가장 정확한 검색 결과를 얻으려면 무차별 대입(FLAT)을 사용하세요.</p></li>
</ul>
<div class="alert note">
<p>위의 항목이 항상 정확한 것은 아닙니다. 다른 인덱스 유형으로 리콜을 조정하여 어떤 인덱스 유형이 작동하는지 확인하는 것이 좋습니다.</p>
</div>
<h3 id="Performance" class="common-anchor-header">성능</h3><p>검색의 성능에는 일반적으로 검색이 반환하는 레코드 수를 나타내는 상위-K가 포함됩니다. 성능을 다룰 때는 다음 사항을 고려하세요:</p>
<ul>
<li><p>상위 K가 작고(예: 2,000개) 높은 리콜률이 필요한 검색의 경우 그래프 기반 인덱스 유형이 IVF 변형보다 성능이 뛰어납니다.</p></li>
<li><p>(벡터 임베딩의 총 수와 비교하여) 상위 K가 큰 검색의 경우, IVF 변형이 그래프 기반 인덱스 유형보다 더 나은 선택입니다.</p></li>
<li><p>중간 크기의 상위 K와 높은 필터 비율을 가진 검색의 경우 IVF 변형이 더 나은 선택입니다.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">의사 결정 매트릭스: 가장 적합한 인덱스 유형 선택하기</h3><p>다음 표는 적절한 인덱스 유형을 선택할 때 참조할 수 있는 의사 결정 매트릭스입니다.</p>
<table>
   <tr>
     <th><p>시나리오</p></th>
     <th><p>권장 인덱스</p></th>
     <th><p>참고</p></th>
   </tr>
   <tr>
     <td><p>메모리에 맞는 원시 데이터</p></td>
     <td><p>HNSW, IVF + 정제</p></td>
     <td><p>낮은-<code translate="no">k</code>/높은 리콜에는 HNSW를 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p>디스크, SSD의 원시 데이터</p></td>
     <td><p>DiskANN</p></td>
     <td><p>지연 시간에 민감한 쿼리에 최적입니다.</p></td>
   </tr>
   <tr>
     <td><p>디스크의 원시 데이터, 제한된 RAM</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>메모리와 디스크 액세스의 균형을 맞춥니다.</p></td>
   </tr>
   <tr>
     <td><p>높은 필터 비율(&gt;95%)</p></td>
     <td><p>무차별 대입(FLAT)</p></td>
     <td><p>작은 후보 세트에 대한 인덱스 오버헤드를 방지합니다.</p></td>
   </tr>
   <tr>
     <td><p>대규모 <code translate="no">k</code> (데이터 세트의 ≥1%)</p></td>
     <td><p>IVF</p></td>
     <td><p>클러스터 가지치기로 계산을 줄입니다.</p></td>
   </tr>
   <tr>
     <td><p>매우 높은 리콜률(&gt;99%)</p></td>
     <td><p>무차별 대입(FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">메모리 사용량 추정<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>이 섹션에서는 특정 인덱스 유형의 메모리 사용량을 계산하는 데 중점을 두며 많은 기술적 세부 사항을 포함합니다. 관심 분야에 맞지 않는 경우 이 섹션을 건너뛰셔도 됩니다.</p>
</div>
<p>인덱스의 메모리 소비량은 데이터 구조, 정량화를 통한 압축률, 사용 중인 정제기의 영향을 받습니다. 일반적으로 그래프 기반 인덱스는 일반적으로 그래프의 구조(예: <strong>HNSW</strong>)로 인해 메모리 사용량이 더 많으며, 이는 일반적으로 벡터당 공간 오버헤드가 눈에 띄게 높다는 것을 의미합니다. 반면, IVF와 그 변형은 벡터당 공간 오버헤드가 적기 때문에 메모리 효율성이 더 높습니다. 그러나 <strong>DiskANN과</strong> 같은 고급 기술을 사용하면 그래프나 정제기와 같은 인덱스의 일부가 디스크에 상주하여 메모리 부하를 줄이면서 성능을 유지할 수 있습니다.</p>
<p>구체적으로 인덱스의 메모리 사용량은 다음과 같이 계산할 수 있습니다:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVF 인덱스 메모리 사용량</h3><p>IVF 인덱스는 데이터를 클러스터로 분할하여 검색 성능과 메모리 효율성의 균형을 유지합니다. 아래는 IVF 변형을 사용해 인덱싱된 1백만 개의 128차원 벡터가 사용하는 메모리 사용량 분석입니다.</p>
<ol>
<li><p><strong>중심이 사용하는 메모리를 계산합니다.</strong></p>
<p>IVF 계열 인덱스 유형을 사용하면 Milvus는 중심 기반 파티셔닝을 사용하여 벡터를 버킷으로 클러스터링할 수 있습니다. 각 중심은 원시 벡터 임베딩의 인덱스에 포함됩니다. 벡터를 2,000개의 클러스터로 나누면 메모리 사용량은 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>클러스터 할당에 사용되는 메모리를 계산합니다.</strong></p>
<p>각 벡터 임베딩은 클러스터에 할당되어 정수 ID로 저장됩니다. 2,000개의 클러스터의 경우 2바이트 정수로 충분합니다. 메모리 사용량은 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>양자화로 인한 압축을 계산합니다.</strong></p>
<p>IVF 변형은 일반적으로 PQ와 SQ8을 사용하며, 메모리 사용량은 다음과 같이 추정할 수 있습니다:</p>
<ul>
<li><p>8개의 서브퀀타이저와 함께 PQ 사용</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>SQ8 사용</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>다음 표에는 다양한 구성에 따른 예상 메모리 사용량이 나와 있습니다:</p>
<p><table>
<tr>
<th><p>구성</p></th>
<th><p>메모리 예상</p></th>
<th><p>총 메모리</p></th>
</tr>
<tr>
<td><p>IVF-PQ(세분화 없음)</p></td>
<td><p>1.0MB + 2.0MB + 8.0MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% 원시 정제</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB + 51.2 MB</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8(정제 없음)</p></td>
<td><p>1.0 MB + 2.0 MB + 128 MB</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT(전체 원시 벡터)</p></td>
<td><p>1.0 MB + 2.0 MB + 512 MB</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>정제 오버헤드를 계산합니다.</strong></p>
<p>IVF 변형은 종종 후보의 순위를 재조정하기 위해 정제기와 짝을 이룹니다. 확장률이 5인 상위 10개 결과를 검색하는 검색의 경우, 정제 오버헤드는 다음과 같이 추정할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">그래프 기반 인덱스 메모리 사용량</h3><p>HNSW와 같은 그래프 기반 인덱스 유형은 그래프 구조와 원시 벡터 임베딩을 모두 저장하는 데 상당한 메모리가 필요합니다. 아래는 HNSW 인덱스 유형을 사용해 색인된 1백만 개의 128차원 벡터가 사용하는 메모리에 대한 자세한 분석입니다.</p>
<ol>
<li><p><strong>그래프 구조가 사용하는 메모리를 계산합니다.</strong></p>
<p>HNSW의 각 벡터는 이웃 벡터와의 연결을 유지합니다. 그래프 차수(노드당 에지)가 32인 경우, 소비되는 메모리는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>원시 벡터 임베딩에 사용되는 메모리를 계산합니다.</strong></p>
<p>압축되지 않은 FP32 벡터를 저장하는 데 사용되는 메모리는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>HNSW를 사용하여 1백만 개의 128차원 벡터 임베딩을 인덱싱하는 경우, 사용되는 총 메모리는 <strong>128MB(그래프) + 512MB(벡터) = 640MB가</strong> 됩니다.</p></li>
<li><p><strong>양자화로 인한 압축을 계산합니다.</strong></p>
<p>양자화는 벡터 크기를 줄입니다. 예를 들어, 8개의 서브퀀타이저(벡터당 8바이트)가 있는 PQ를 사용하면 압축이 급격히 줄어듭니다. 압축된 벡터 임베딩이 소비하는 메모리는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>원시 벡터 임베딩과 비교했을 때 64배의 압축률을 달성하며, <strong>HNSWPQ</strong> 인덱스 유형이 사용하는 총 메모리는 <strong>128MB(그래프) + 8MB(압축 벡터) = 136MB가</strong> 됩니다.</p></li>
<li><p><strong>정제 오버헤드를 계산합니다.</strong></p>
<p>원시 벡터를 사용한 순위 재조정과 같은 세분화는 고정밀 데이터를 메모리에 일시적으로 로드합니다. 확장률이 5인 상위 10개 결과를 검색하는 검색의 경우, 정제 오버헤드는 다음과 같이 추정할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">기타 고려 사항</h3><p>IVF 및 그래프 기반 인덱스는 양자화를 통해 메모리 사용량을 최적화하지만, 메모리 맵 파일(mmap)과 DiskANN은 데이터 세트가 사용 가능한 RAM(랜덤 액세스 메모리)을 초과하는 시나리오를 해결합니다.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN은 검색 중 효율적인 탐색을 위해 데이터 포인트를 연결하는 동시에 벡터의 크기를 줄이고 벡터 간의 대략적인 거리를 빠르게 계산할 수 있도록 PQ를 적용하는 Vamana 그래프 기반 인덱스입니다.</p>
<p>Vamana 그래프는 디스크에 저장되기 때문에 DiskANN은 메모리에 담기에는 너무 큰 대용량 데이터 세트를 처리할 수 있습니다. 이는 10억 포인트 데이터 세트에 특히 유용합니다.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">메모리 매핑 파일(mmap)</h4><p>메모리 매핑(Mmap)을 사용하면 디스크의 대용량 파일에 직접 메모리에 액세스할 수 있으므로 Milvus는 인덱스와 데이터를 메모리와 하드 드라이브 모두에 저장할 수 있습니다. 이 접근 방식은 액세스 빈도에 따라 I/O 호출의 오버헤드를 줄여 I/O 작업을 최적화함으로써 검색 성능에 큰 영향을 주지 않으면서 컬렉션의 저장 용량을 확장하는 데 도움이 됩니다.</p>
<p>특히, 특정 필드에 있는 원시 데이터를 메모리에 완전히 로드하는 대신 메모리 매핑하도록 Milvus를 구성할 수 있습니다. 이렇게 하면 메모리 문제에 대한 걱정 없이 필드에 직접 메모리 액세스를 확보하고 컬렉션 용량을 확장할 수 있습니다.</p>
