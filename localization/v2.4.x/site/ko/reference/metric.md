---
id: metric.md
summary: 'Milvus는 유클리드 거리, 내적 곱, Jaccard 등 다양한 유사성 메트릭을 지원합니다.'
title: 유사성 메트릭
---
<h1 id="Similarity-Metrics" class="common-anchor-header">유사성 메트릭<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 유사성 메트릭은 벡터 간의 유사성을 측정하는 데 사용됩니다. 좋은 거리 메트릭을 선택하면 분류 및 클러스터링 성능을 크게 향상시키는 데 도움이 됩니다.</p>
<p>다음 표는 널리 사용되는 유사도 메트릭이 다양한 입력 데이터 양식과 Milvus 인덱스에 어떻게 적용되는지 보여줍니다. 현재 Milvus는 부동 소수점 임베딩(부동 소수점 벡터 또는 고밀도 벡터라고도 함), 이진 임베딩(이진 벡터라고도 함), 스파스 임베딩(스파스 벡터라고도 함)을 포함한 다양한 유형의 데이터를 지원합니다.</p>
<div class="filter">
 <a href="#floating">부동 소수점 임베딩</a> <a href="#binary">이진 임베딩</a> <a href="#sparse">스파스 임베딩</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">메트릭 유형</th>
    <th class="tg-0pky">인덱스 유형</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>유클리드 거리(L2)</li><li>내적 곱(IP)</li><li>코사인 유사도(COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">메트릭 유형</th>
    <th class="tg-0pky">인덱스 유형</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">메트릭 유형</th>
    <th class="tg-0pky">인덱스 유형</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>SPARSE_INVERTED_INDEX</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">유클리드 거리(L2)</h3><p>기본적으로 유클리드 거리는 두 점을 연결하는 세그먼트의 길이를 측정합니다.</p>
<p>유클리드 거리의 공식은 다음과 같습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>유클리드</span> </span></p>
<p>여기서 <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)과 <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>,..., <sub>bn-1</sub>)은 n차원 유클리드 공간에서 두 점입니다.</p>
<p>가장 일반적으로 사용되는 거리 측정법으로 데이터가 연속적인 경우 매우 유용합니다.</p>
<div class="alert note">
밀버스는 유클리드 거리를 거리 측정값으로 선택한 경우 제곱근을 적용하기 전의 값만 계산합니다.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">내부 곱(IP)</h3><p>두 벡터 임베딩 사이의 IP 거리는 다음과 같이 정의됩니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>IP</span> </span></p>
<p>IP는 정규화되지 않은 데이터를 비교해야 하거나 크기와 각도를 고려해야 할 때 더 유용합니다.</p>
<div class="alert note">
<p>정규화된 임베딩에 IP 거리 메트릭을 적용하면 결과는 임베딩 간의 코사인 유사성을 계산하는 것과 동일합니다.</p>
</div>
<p>X'가 임베딩 X에서 정규화되었다고 가정해 보겠습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normalize</span> </span></p>
<p>두 임베딩 간의 상관관계는 다음과 같습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>정규화</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">코사인 유사도</h3><p>코사인 유사도는 두 벡터 세트 사이의 각도의 코사인을 사용하여 얼마나 유사한지 측정합니다. 두 벡터 세트는 같은 원점([0,0,...])에서 시작하지만 서로 다른 방향을 가리키는 두 개의 선분으로 생각할 수 있습니다.</p>
<p>두 벡터 집합 <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> 와 <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub></strong>) 사이의 코사인 유사도를 계산하려면 다음 공식을 사용합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>코사인_유사도</span> </span></p>
<p>코사인 유사도는 항상 <strong>[-1, 1]</strong> 간격에 있습니다. 예를 들어 두 개의 비례 벡터의 코사인 유사도는 <strong>1</strong>, 두 개의 직교 벡터의 유사도는 <strong>0</strong>, 두 개의 반대 벡터의 유사도는 <strong>-1입니다</strong>. 코사인이 클수록 두 벡터 사이의 각도가 작아져 이 두 벡터가 서로 더 유사하다는 것을 나타냅니다.</p>
<p>코사인 유사도를 1에서 빼면 두 벡터 사이의 코사인 거리를 구할 수 있습니다.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">자카드 거리</h3><p>자카드 유사도 계수는 두 샘플 세트 간의 유사도를 측정하며, 정의된 세트의 교집합의 카디널리티를 두 세트의 합집합의 카디널리티로 나눈 값으로 정의됩니다. 유한한 샘플 세트에만 적용할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Jaccard 유사도 계수</span> </span></p>
<p>Jaccard 거리는 데이터 세트 간의 유사성을 측정하며 1에서 Jaccard 유사성 계수를 빼면 구할 수 있습니다. 이진 변수의 경우 Jaccard 거리는 타니모토 계수와 동일합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>자카드 거리</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">해밍 거리</h3><p>해밍 거리는 이진 데이터 문자열을 측정합니다. 길이가 같은 두 문자열 사이의 거리는 비트가 서로 다른 비트 위치의 수입니다.</p>
<p>예를 들어 1101 1001과 1001 1101이라는 두 문자열이 있다고 가정해 보겠습니다.</p>
<p>11011001 ⊕ 10011101 = 01000100. 여기에는 두 개의 1이 포함되어 있으므로 해밍 거리는 d(11011001, 10011101) = 2입니다.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">구조적 유사성</h3><p>어떤 화학 구조가 더 큰 화학 구조의 일부로 존재하는 경우 전자를 하부 구조라고 하고 후자를 상부 구조라고 합니다. 예를 들어 에탄올은 아세트산의 하부 구조이고 아세트산은 에탄올의 상부 구조입니다.</p>
<p>구조 유사성은 두 화학식이 서로 유사한지 여부를 판단하는 데 사용되며, 한 화학식이 다른 화학식의 상부 구조인지 하부 구조인지 판단하는 데 사용됩니다.</p>
<p>A가 B의 상부 구조인지 확인하려면 다음 공식을 사용하세요:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>상부 구조</span> </span></p>
<p>여기서</p>
<ul>
<li>A는 검색하려는 화학식의 이진 표현입니다.</li>
<li>B는 데이터베이스에 있는 화학식의 이진 표현입니다.</li>
</ul>
<p><code translate="no">0</code> 이 반환되면 <strong>A는</strong> <strong>B의</strong> 상부 구조가 아닙니다. 그렇지 않으면 결과는 그 반대입니다.</p>
<p>A가 B의 하부 구조인지 확인하려면 다음 공식을 사용합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>하부 구조</span> </span></p>
<p>여기서:</p>
<ul>
<li>A는 검색하려는 화학식의 이진 표현입니다.</li>
<li>B는 데이터베이스에 있는 화학식의 이진 표현입니다.</li>
</ul>
<p><code translate="no">0</code> 이 반환되면 <strong>A는</strong> <strong>B의</strong> 하위 구조가 아닙니다. 그렇지 않으면 결과는 그 반대입니다.</p>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">메트릭 유형이 내적 곱인 경우 벡터 검색의 상위 1순위 결과가 검색 벡터 자체가 아닌 이유는 무엇인가요?</font></summary>거리 메트릭으로 내적 곱을 사용할 때 벡터를 정규화하지 않은 경우 이런 문제가 발생합니다.</details>
<details>
<summary><font color="#4fc4f9">정규화란 무엇인가요? 정규화가 필요한 이유는 무엇인가요?</font></summary></p>
<p>정규화란 임베딩(벡터)을 변환하는 과정을 통해 해당 벡터의 규범이 1이 되도록 변환하는 것을 말합니다. 내적 곱을 사용하여 임베딩 유사성을 계산하는 경우, 임베딩을 정규화해야 합니다. 정규화 후 내적 곱은 코사인 유사도와 같습니다.</p>
<p>
자세한 내용은 <a href="https://en.wikipedia.org/wiki/Unit_vector">위키백과를</a> 참조하세요.</p>
</details>
<details>
<summary><font color="#4fc4f9">거리 측정값으로 유클리드 거리(L2)와 내적 곱(IP)을 사용하면 왜 다른 결과가 나오나요?</font></summary>벡터가 정규화되어 있는지 확인하세요. 그렇지 않은 경우 먼저 벡터를 정규화해야 합니다. 이론적으로 벡터가 정규화되지 않은 경우 L2로 계산된 유사도는 IP로 계산된 유사도와 다릅니다.</details>
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
<li>Milvus에서 지원되는 <a href="/docs/ko/v2.4.x/index.md">인덱스 유형에</a> 대해 자세히 알아보세요.</li>
</ul>
