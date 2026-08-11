---
id: index-explained.md
title: 인덱스 설명
summary: >-
  인덱스는 데이터 위에 구축된 추가적인 구조입니다. 인덱스의 내부 구조는 사용 중인 근사 최인접 이웃 검색 알고리즘에 따라 달라집니다.
  인덱스는 검색 속도를 높여주지만, 검색 과정에서 추가적인 전처리 시간, 공간 및 RAM을 소모합니다. 또한, 인덱스를 사용하면 일반적으로
  리콜률이 낮아집니다(그 영향은 미미하지만, 여전히 중요한 요소입니다). 따라서 이 글에서는 인덱스 사용의 이점을 극대화하면서 비용을
  최소화하는 방법을 설명합니다.
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
    </button></h1><p>인덱스는 데이터 위에 구축된 추가적인 구조입니다. 인덱스의 내부 구조는 사용 중인 근사 최인접 이웃 검색 알고리즘에 따라 달라집니다. 인덱스는 검색 속도를 높여주지만, 검색 과정에서 추가적인 전처리 시간, 공간 및 RAM을 소모합니다. 또한, 인덱스를 사용하면 일반적으로 리콜률이 낮아집니다(그 영향은 미미하지만 여전히 중요한 요소입니다). 따라서 이 글에서는 인덱스 사용의 이점을 극대화하면서 비용을 최소화하는 방법을 설명합니다.</p>
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
    </button></h2><p>Milvus에서 인덱스는 필드별로 지정되며, 적용 가능한 인덱스 유형은 대상 필드의 데이터 유형에 따라 달라집니다. 전문 벡터 데이터베이스인 Milvus는 벡터 검색 성능과 스칼라 필터링 성능 모두를 향상시키는 데 중점을 두고 있으며, 이것이 바로 다양한 인덱스 유형을 제공하는 이유입니다.</p>
<p>다음 표는 필드 데이터 유형과 적용 가능한 인덱스 유형 간의 매핑 관계를 보여줍니다.</p>
<table>
   <tr>
     <th><p>필드 데이터 유형</p></th>
     <th><p>적용 가능한 인덱스 유형</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_무차별대입</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (권장)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP (권장)</p></li><li><p>반전</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>반전</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(BOOL, INT8/16/32/64 및 VARCHAR 유형의 요소)</sup></p></td>
     <td><p>BITMAP (권장)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(BOOL, INT8/16/32/64, FLOAT, DOUBLE 및 VARCHAR 유형의 요소)</sup></p></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>이 문서에서는 적절한 벡터 인덱스를 선택하는 방법에 중점을 둡니다. 스칼라 필드의 경우 항상 권장되는 인덱스 유형을 사용할 수 있습니다.</p>
<p>벡터 검색에 적합한 인덱스 유형을 선택하면 성능과 리소스 사용량에 상당한 영향을 미칠 수 있습니다. 벡터 필드의 인덱스 유형을 선택할 때는 기본 데이터 구조, 메모리 사용량, 성능 요구 사항 등 다양한 요소를 고려하는 것이 필수적입니다.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">벡터 인덱스의 구성<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 다이어그램에서 볼 수 있듯이, Milvus의 인덱스 유형은 <strong>데이터 구조</strong>, <strong>양자화</strong>, <strong>리파이너라는</strong> 세 가지 핵심 구성 요소로 이루어져 있습니다. 양자화와 리파이너는 선택 사항이지만, 비용 대비 이득이 크다는 점에서 널리 사용됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>벡터 인덱스 구조</span>
  
 </span></p>
<p>인덱스 생성 과정에서 Milvus는 선택된 데이터 구조와 양자화 방법을 결합하여 최적의 <strong>확장 비율을</strong> 결정합니다. 쿼리 시점에 시스템은 후보 벡터 <code translate="no">topK × expansion rate</code> 를 검색하고, 리파이너를 적용하여 더 높은 정밀도로 거리를 재계산한 후, 최종적으로 가장 정확한 결과 <code translate="no">topK</code> 를 반환합니다. 이러한 하이브리드 접근 방식은 리소스 집약적인 정밀화 처리를 필터링된 후보 집합으로 제한함으로써 속도와 정확성 간의 균형을 맞춥니다.</p>
<h3 id="Data-structure" class="common-anchor-header">데이터 구조<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터 구조는 인덱스의 기초 계층을 형성합니다. 일반적인 유형은 다음과 같습니다:</p>
<ul>
<li><p><strong>인버티드 파일(IVF)</strong></p>
<p>IVF 계열 인덱스 유형을 통해 Milvus는 중심점 기반 분할을 통해 벡터를 버킷으로 클러스터링할 수 있습니다. 일반적으로 버킷의 중심점이 쿼리 벡터에 가까우면, 해당 버킷 내의 모든 벡터도 쿼리 벡터에 가까울 가능성이 높다고 가정해도 무방합니다. 이러한 전제를 바탕으로, Milvus는 전체 데이터셋을 검사하는 대신 중심점이 쿼리 벡터에 가까운 버킷에 포함된 벡터 임베딩만 스캔합니다. 이 전략은 허용 가능한 정확도를 유지하면서 계산 비용을 절감합니다.</p>
<p>이러한 유형의 인덱스 데이터 구조는 빠른 처리 속도가 필요한 대규모 데이터셋에 이상적입니다.</p></li>
<li><p><strong>그래프 기반 구조</strong></p>
<p>Hierarchical Navigable Small World(<a href="https://arxiv.org/abs/1603.09320">HNSW</a>)와 같은 벡터 검색용 그래프 기반 데이터 구조는 각 벡터가 가장 가까운 이웃과 연결되는 계층적 그래프를 구성합니다. 쿼리는 거친 상위 계층에서 시작하여 하위 계층으로 이동하며 이 계층 구조를 탐색함으로써, 효율적인 로그 시간 검색 복잡도를 실현합니다.</p>
<p>이러한 유형의 인덱스 데이터 구조는 고차원 공간과 저지연 쿼리가 요구되는 시나리오에서 뛰어난 성능을 발휘합니다.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">양자화<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>양자화는 더 거친 표현 방식을 통해 메모리 사용량과 계산 비용을 줄여줍니다.</p>
<ul>
<li><p><strong>스칼라 양자화</strong> (예: <strong>SQ8</strong>)를 통해 Milvus는 각 벡터 차원을 단일 바이트(8비트)로 압축할 수 있으며, 이는 32비트 부동소수점 형식에 비해 메모리 사용량을 75% 줄이면서도 합리적인 정확도를 유지합니다.</p></li>
<li><p><strong>제품 양자화</strong> (<strong>PQ</strong>)를 통해 Milvus는 벡터를 하위 벡터로 분할하고 코드북 기반 클러스터링을 사용하여 인코딩할 수 있습니다. 이를 통해 리콜이 약간 감소하는 대가로 더 높은 압축률(예: 4~32배)을 달성하므로, 메모리 제약이 있는 환경에 적합합니다.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">리파이너<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>양자화는 본질적으로 손실이 발생합니다. 리콜률을 유지하기 위해 양자화는 필요 이상으로 많은 상위 K개 후보를 일관되게 생성하며, 이를 통해 리파이너는 더 높은 정밀도를 사용하여 이러한 후보 중에서 상위 K개 결과를 추가로 선별함으로써 리콜률을 향상시킬 수 있습니다.</p>
<p>예를 들어, FP32 리파이너는 양자화에서 반환된 검색 결과 후보에 대해 양자화된 값 대신 FP32 정밀도를 사용하여 거리를 재계산합니다.</p>
<p>이는 사소한 거리 차이도 결과 품질에 큰 영향을 미치는 시맨틱 검색이나 추천 시스템과 같이, 검색 효율과 정밀도 간의 절충이 필요한 애플리케이션에 매우 중요합니다.</p>
<h3 id="Summary" class="common-anchor-header">요약<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터 구조를 통한 대략적인 필터링, 양자화를 통한 효율적인 계산, 정밀화 과정을 통한 정밀도 조정으로 구성된 이 계층적 아키텍처를 통해 Milvus는 정확도와 성능 간의 균형을 적응적으로 최적화할 수 있습니다.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">성능 상의 절충점<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>성능을 평가할 때는 <strong>빌드 시간</strong>, <strong>초당 쿼리 수(QPS)</strong>, <strong>리콜률</strong> 간의 균형을 맞추는 것이 중요합니다. 일반적인 규칙은 다음과 같습니다.</p>
<ul>
<li><p><strong>그래프 기반 인덱스 유형은</strong> 일반적으로 <strong>QPS</strong> 측면에서 <strong>IVF 변형보다</strong> 우수한 성능을 보입니다.</p></li>
<li><p><strong>IVF 변형은</strong> 특히 <strong>topK가 큰</strong> 시나리오 <strong>(예: 2,000 이상)</strong>에 적합합니다.</p></li>
<li><p><strong>PQ는</strong> 일반적으로 <strong>SQ와</strong> 비교했을 때 유사한 압축률에서 더 나은 리콜률을 제공하지만, SQ가 더 빠른 성능을 제공합니다.</p></li>
<li><p>인덱스의 일부에 하드 드라이브를 사용하는 것( <strong>DiskANN의</strong> 경우)은 대용량 데이터셋을 관리하는 데 도움이 되지만, 잠재적인 IOPS 병목 현상을 유발할 수도 있습니다.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">용량<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>용량은 대개 데이터 크기와 사용 가능한 RAM 간의 관계를 의미합니다. 용량을 다룰 때는 다음 사항을 고려하십시오.</p>
<ul>
<li><p>원시 데이터의 4분의 1이 메모리에 들어갈 수 있다면, 안정적인 지연 시간을 제공하는 DiskANN을 고려해 보십시오.</p></li>
<li><p>원시 데이터 전체가 메모리에 들어갈 수 있다면, 메모리 기반 인덱스 유형과 mmap을 고려해 보십시오.</p></li>
<li><p>양자화 적용 인덱스 유형과 mmap을 사용하여 정확도를 희생하는 대신 최대 용량을 확보할 수 있습니다.</p></li>
</ul>
<div class="alert note">
<p>mmap이 항상 해결책은 아닙니다. 데이터의 대부분이 디스크에 있는 경우, DiskANN이 더 나은 지연 시간을 제공합니다.</p>
</div>
<h3 id="Recall" class="common-anchor-header">리콜<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>리콜은 일반적으로 필터 비율과 관련이 있으며, 이는 검색 전에 필터링되어 제외되는 데이터를 의미합니다. 리콜을 다룰 때는 다음 사항을 고려하십시오.</p>
<ul>
<li><p>필터 비율이 85% 미만이면 그래프 기반 인덱스 유형이 IVF 변형보다 성능이 우수합니다.</p></li>
<li><p>필터 비율이 85%에서 95% 사이인 경우, IVF 변형을 사용하십시오.</p></li>
<li><p>필터 비율이 98%를 초과하는 경우, 가장 정확한 검색 결과를 얻으려면 Brute-Force(FLAT)를 사용하십시오.</p></li>
</ul>
<div class="alert note">
<p>위의 사항이 항상 정확한 것은 아닙니다. 다양한 인덱스 유형을 사용하여 리콜을 조정해 보고, 어떤 인덱스 유형이 효과적인지 확인하는 것이 좋습니다.</p>
</div>
<h3 id="Performance" class="common-anchor-header">성능<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>검색 성능은 일반적으로 검색 결과가 반환하는 레코드 수를 의미하는 ‘top-K’와 관련이 있습니다. 성능을 고려할 때는 다음 사항을 참고하십시오.</p>
<ul>
<li><p>리콜률이 높아야 하는 작은 top-K(예: 2,000) 검색의 경우, 그래프 기반 인덱스 유형이 IVF 변형보다 우수한 성능을 보입니다.</p></li>
<li><p>(벡터 임베딩의 총 개수에 비해) top-K가 매우 큰 검색의 경우, 그래프 기반 인덱스 유형보다 IVF 변형이 더 나은 선택입니다.</p></li>
<li><p>중간 규모의 top-K와 높은 필터 비율을 갖는 검색의 경우, IVF 변형이 더 나은 선택입니다.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">결정 매트릭스: 가장 적합한 인덱스 유형 선택<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 표는 적절한 인덱스 유형을 선택할 때 참고할 수 있는 결정 매트릭스입니다.</p>
<table>
   <tr>
     <th><p>시나리오</p></th>
     <th><p>권장 인덱스</p></th>
     <th><p>비고</p></th>
   </tr>
   <tr>
     <td><p>원시 데이터가 메모리에 들어갈 수 있는 경우</p></td>
     <td><p>HNSW, IVF + 정제</p></td>
     <td><p>낮은 정밀도(<code translate="no">k</code>) / 높은 재현율(recall)을 위해 HNSW를 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p>디스크(SSD)에 원시 데이터 저장</p></td>
     <td><p>DiskANN</p></td>
     <td><p>지연 시간에 민감한 쿼리에 최적입니다.</p></td>
   </tr>
   <tr>
     <td><p>디스크에 원시 데이터 저장, 제한된 RAM</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>메모리 및 디스크 액세스 간의 균형을 맞춥니다.</p></td>
   </tr>
   <tr>
     <td><p>높은 필터링 비율 (&gt;95%)</p></td>
     <td><p>무차별 대입(FLAT)</p></td>
     <td><p>후보 집합이 매우 작은 경우 인덱스 오버헤드를 피합니다.</p></td>
   </tr>
   <tr>
     <td><p>대규모 후보 집합( <code translate="no">k</code>, 데이터셋의 1% 이상)</p></td>
     <td><p>IVF</p></td>
     <td><p>클러스터 프루닝을 통해 계산량을 줄입니다.</p></td>
   </tr>
   <tr>
     <td><p>매우 높은 리콜률 (&gt;99%)</p></td>
     <td><p>무차별 대입법(FLAT) + GPU</p></td>
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
<p>이 섹션은 특정 인덱스 유형의 메모리 소비량을 계산하는 데 중점을 두며, 많은 기술적 세부 사항을 다룹니다. 관심 분야와 관련이 없다면 이 섹션을 건너뛰어도 무방합니다.</p>
</div>
<p>인덱스의 메모리 소비량은 데이터 구조, 양자화를 통한 압축률, 그리고 사용 중인 리파이너의 영향을 받습니다. 일반적으로 그래프 기반 인덱스(예: <strong>HNSW</strong>)는 그래프 구조로 인해 메모리 사용량이 더 많은 편이며, 이는 대개 벡터 공간당 상당한 오버헤드를 의미합니다. 반면, IVF 및 그 변형들은 벡터당 공간 오버헤드가 적게 발생하므로 메모리 효율이 더 높습니다. 그러나 <strong>DiskANN과</strong> 같은 고급 기술을 사용하면 그래프나 리파이너와 같은 인덱스의 일부를 디스크에 상주시킬 수 있어, 성능을 유지하면서 메모리 부하를 줄일 수 있습니다.</p>
<p>구체적으로, 인덱스의 메모리 사용량은 다음과 같이 계산할 수 있습니다:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVF 인덱스의 메모리 사용량<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF 인덱스는 데이터를 클러스터로 분할하여 메모리 효율성과 검색 성능의 균형을 맞춥니다. 다음은 IVF 변형을 사용하여 인덱싱된 100만 개의 128차원 벡터가 사용하는 메모리의 세부 내역입니다.</p>
<ol>
<li><p><strong>중심점(centroids)이 사용하는 메모리를 계산합니다.</strong></p>
<p>IVF 시리즈 인덱스 유형을 사용하면 Milvus가 중심점 기반 분할을 통해 벡터를 버킷으로 클러스터링할 수 있습니다. 각 중심점은 원시 벡터 임베딩 형태로 인덱스에 포함됩니다. 벡터를 2,000개의 클러스터로 나눌 때, 메모리 사용량은 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>클러스터 할당에 사용되는 메모리를 계산합니다.</strong></p>
<p>각 벡터 임베딩은 클러스터에 할당되어 정수 ID로 저장됩니다. 2,000개의 클러스터의 경우 2바이트 정수면 충분합니다. 메모리 사용량은 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>양자화로 인한 압축 효과를 계산합니다.</strong></p>
<p>IVF 변형 알고리즘은 일반적으로 PQ와 SQ8을 사용하며, 메모리 사용량은 다음과 같이 추정할 수 있습니다:</p>
<ul>
<li><p>8개의 서브양자화기를 사용하는 PQ</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>SQ8 사용 시</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>다음 표는 다양한 구성에 따른 예상 메모리 사용량을 나열합니다:</p>
<p><table>
<tr>
<th><p>구성</p></th>
<th><p>메모리 추정값</p></th>
<th><p>총 메모리</p></th>
</tr>
<tr>
<td><p>IVF-PQ (정밀도 조정 없음)</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% 원시 정밀도 향상</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB + 51.2 MB</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (정제 없음)</p></td>
<td><p>1.0 MB + 2.0 MB + 128 MB</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (전체 원시 벡터)</p></td>
<td><p>1.0 MB + 2.0 MB + 512 MB</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>정제 오버헤드를 계산합니다.</strong></p>
<p>IVF 변형 알고리즘은 후보를 재순위화하기 위해 종종 리파이너와 함께 사용됩니다. 확장 비율이 5인 검색에서 상위 10개 결과를 반환하는 경우, 정제 오버헤드는 다음과 같이 추정할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">그래프 기반 인덱스의 메모리 사용량<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW와 같은 그래프 기반 인덱스 유형은 그래프 구조와 원시 벡터 임베딩을 모두 저장하기 위해 상당한 메모리를 필요로 합니다. 다음은 HNSW 인덱스 유형을 사용하여 인덱싱된 100만 개의 128차원 벡터가 소비하는 메모리에 대한 상세한 분석입니다.</p>
<ol>
<li><p><strong>그래프 구조가 사용하는 메모리를 계산합니다.</strong></p>
<p>HNSW의 각 벡터는 인접 노드와의 연결을 유지합니다. 그래프 차수(노드당 에지 수)가 32인 경우, 소비되는 메모리는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>원시 벡터 임베딩이 사용하는 메모리를 계산합니다.</strong></p>
<p>압축되지 않은 FP32 벡터를 저장하는 데 소요되는 메모리는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>HNSW를 사용하여 100만 개의 128차원 벡터 임베딩을 인덱싱할 경우, 총 사용 메모리는 <strong>128 MB(그래프) + 512 MB(벡터) = 640 MB가</strong> 됩니다.</p></li>
<li><p><strong>양자화에 의한 압축 효과를 계산합니다.</strong></p>
<p>양자화는 벡터 크기를 줄입니다. 예를 들어, 8개의 하위 양자화기(벡터당 8바이트)를 사용하는 PQ를 적용하면 압축 효과가 극대화됩니다. 압축된 벡터 임베딩이 소비하는 메모리는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>이는 원시 벡터 임베딩에 비해 64배의 압축률을 달성하며, <strong>HNSWPQ</strong> 인덱스 유형이 사용하는 총 메모리는 <strong>128 MB(그래프) + 8 MB(압축된 벡터) = 136 MB가</strong> 됩니다.</p></li>
<li><p><strong>정제 오버헤드를 계산합니다.</strong></p>
<p>원시 벡터를 사용한 재순위와 같은 정제 과정에서는 고정밀도 데이터가 일시적으로 메모리에 로드됩니다. 확장 비율 5로 상위 10개 결과를 검색하는 경우, 정제 오버헤드는 다음과 같이 추정할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">기타 고려 사항<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF 및 그래프 기반 인덱스는 양자화를 통해 메모리 사용량을 최적화하는 반면, 메모리 매핑 파일(mmap)과 DiskANN은 데이터셋이 사용 가능한 랜덤 액세스 메모리(RAM) 용량을 초과하는 시나리오를 처리합니다.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN은 Vamana 그래프 기반 인덱스로, 검색 중 효율적인 탐색을 위해 데이터 포인트를 연결하는 동시에 PQ를 적용하여 벡터의 크기를 줄이고 벡터 간의 근사 거리를 신속하게 계산할 수 있게 합니다.</p>
<p>Vamana 그래프는 디스크에 저장되므로, DiskANN은 메모리에 모두 담기에는 너무 큰 대규모 데이터셋도 처리할 수 있습니다. 이는 특히 수십억 개의 데이터 포인트로 구성된 데이터셋에 유용합니다.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">메모리 매핑 파일(mmap)</h4><p>메모리 매핑(mmap)을 통해 디스크에 있는 대용량 파일에 직접 메모리 액세스할 수 있으므로, Milvus는 인덱스와 데이터를 메모리와 하드 드라이브 모두에 저장할 수 있습니다. 이 접근 방식은 액세스 빈도에 따라 I/O 호출의 오버헤드를 줄여 I/O 작업을 최적화함으로써, 검색 성능에 큰 영향을 주지 않으면서 컬렉션의 저장 용량을 확장하는 데 도움이 됩니다.</p>
<p>구체적으로, 특정 필드의 원시 데이터를 메모리에 완전히 불러오는 대신 메모리 매핑되도록 Milvus를 구성할 수 있습니다. 이렇게 하면 메모리 문제를 걱정할 필요 없이 해당 필드에 직접 메모리 액세스를 수행할 수 있으며, 컬렉션 용량을 확장할 수 있습니다.</p>
