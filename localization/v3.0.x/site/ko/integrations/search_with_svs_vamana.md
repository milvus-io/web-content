---
id: search_with_svs_vamana.md
summary: >-
  FAISS 인덱스 패스스루를 통해 Milvus에서 인메모리 SVS Vamana 그래프 인덱스를 구축하고 검색하며, Intel CPU에서는
  선택적으로 LeanVec 또는 LVQ 압축을 적용할 수 있습니다.
title: SVS Vamana 및 Milvus를 이용한 검색
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">SVS Vamana 및 Milvus를 이용한 검색<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search)는 Vamana 그래프 알고리즘을 구현한 인텔의 고성능 벡터 검색 라이브러리입니다. Milvus에서는 <a href="https://milvus.io/docs/faiss.md">FAISS 인덱스 패스스루를</a> 통해 SVS Vamana를 이용할 수 있습니다. ` <code translate="no">index_type</code> `를 ` <code translate="no">FAISS</code> `로 설정하고 ` <code translate="no">SVSVamana</code> ` 인덱스 팩토리 문자열을 지정하면, Milvus는 Faiss의 SVS 통합 기능을 통해 인덱스를 구축하고 검색합니다.</p>
<p>Vamana는 <a href="https://milvus.io/docs/diskann.md">DISKANN에서도</a> 사용하는 그래프 구조이지만, SVS Vamana는 전체 그래프를 메모리에 유지합니다. 또한 <strong>LeanVec</strong> 또는 <strong>LVQ를</strong> 사용하여 벡터를 압축할 수 있어, 메모리 사용량을 줄이고 검색 속도를 높이는 동시에 매우 높은 리콜률을 달성할 수 있습니다.</p>
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
<li>SVS가 활성화된 상태로 소스 코드에서 빌드된 Milvus 3.0.0 이상</li>
<li>PyMilvus 3.0.0 이상</li>
<li><code translate="no">LVQ*</code> 또는 <code translate="no">LeanVec*</code> 스토리지를 사용하는 경우 Intel CPU가 필요합니다. <code translate="no">FP32</code>, <code translate="no">FP16</code> 및 <code translate="no">SQ8</code> 스토리지는 모든 플랫폼에서 실행됩니다.</li>
<li><a href="https://milvus.io/docs/faiss.md">FAISS 인덱스 팩토리 문자열</a>에 대한 이해</li>
</ul>
<div class="alert note">
<p>SVS는 기본 Milvus 빌드에 포함되어 있지 않습니다. <code translate="no">SVSVamana</code> 팩토리를 사용하려면 소스 코드에서 <code translate="no">make USE_SVS=ON</code> 옵션을 사용하여 Milvus를 빌드해야 합니다. SVS가 포함되지 않은 빌드에서는 Faiss가 팩토리 문자열을 인식하지 못해 인덱스 생성이 실패합니다.</p>
</div>
<p>LVQ 및 LeanVec 압축은 Intel CPU에서만 실행되며, AVX-512를 지원하는 CPU에서 더 빠르게 실행됩니다. 다른 CPU에서는 <code translate="no">LVQ*</code> 및 <code translate="no">LeanVec*</code> 팩토리 문자열을 사용할 경우 인덱스 생성이 실패합니다.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">SVS Vamana의 작동 방식<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Vamana 그래프<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana는 단일 계층 근접 그래프를 구축합니다. 각 벡터는 노드이며, 가장 가까운 이웃일 가능성이 높은 벡터들을 연결하는 에지가 있습니다. 그래프를 구축하기 위해 SVS는 각 노드 <strong>x에</strong> 대해 다음을 수행합니다:</p>
<ol>
<li><p><strong>탐욕적 탐색(Greedy search</strong>): SVS는 지금까지 구축된 그래프를 탐색하며, 크기 <code translate="no">construction_window_size</code> 인 후보 목록을 유지합니다.</p></li>
<li><p><strong>인접 노드 제거</strong>: 방문한 노드들은 <strong>x의</strong> 후보 인접 노드가 됩니다. SVS는 <strong>x로부터의</strong> 거리가 증가하는 순서대로 이 노드들을 고려합니다. 이미 유지된 더 가까운 이웃 <code translate="no">n</code> 이 <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code> 를 만족하는 경우, 후보 <code translate="no">c</code> 는 건너뜁니다. 이를 통해 장거리 에지는 유지하고 중복된 단거리 에지는 제거하므로, 검색은 가장 가까운 이웃을 하나씩 차례로 이동하는 대신 그래프를 가로질러 건너뛸 수 있습니다. 그래프의 차수에 도달하면 정리 작업이 중단됩니다.</p></li>
<li><p><strong>역방향 에지</strong>: <strong>x의</strong> 새로운 이웃마다 SVS는 <strong>x로</strong> 돌아가는 역방향 에지를 추가하고, 해당 이웃의 에지 목록이 그래프의 차수를 초과할 경우 이를 제거합니다.</p></li>
</ol>
<p>가지치기는 두 단계로 진행됩니다. 첫 번째 단계에서는 ‘ <code translate="no">alpha = 1</code> ’를 사용하고, 두 번째 단계에서는 설정된 ‘ <code translate="no">alpha</code> ’를 사용합니다. 그래프 도(degree)와 ‘ <code translate="no">construction_window_size</code> ’ 값이 클수록 더 조밀하고 품질이 높은 그래프가 생성되지만, 더 많은 메모리를 사용하고 구축하는 데 더 오랜 시간이 소요됩니다.</p>
<p>검색 시 SVS는 그래프를 탐욕적(greedy) 방식으로 탐색하며, 지금까지 확인된 가장 가까운 후보들을 ‘ <code translate="no">search_window_size</code> ’에 저장합니다. 다음에는 항상 가장 가까운 미방문 후보를 탐색합니다. 현재 노드의 모든 이웃이 쿼리로부터 ‘ <code translate="no">search_window_size</code> ’ 내 최악의 후보보다 더 멀리 떨어져 있을 때 검색이 종료됩니다. ‘ ’의 크기를 늘리면 그래프의 더 많은 부분을 탐색하게 되어 리콜률은 높아지지만, 지연 시간도 증가합니다.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">LeanVec 압축<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec은</a> 벡터당 차원 수와 차원당 비트 수를 모두 줄입니다. LeanVec 인덱스는 각 벡터에 대해 두 가지 표현을 유지합니다:</p>
<ul>
<li><p><strong>1차(차원 축소)</strong>: 벡터를 더 적은 차원으로 선형 투영한 것입니다. 그래프 검색은 이 1차 데이터셋을 대상으로 수행되므로, 대부분의 거리 계산은 저차원 공간에서 이루어집니다. 이를 통해 연산 및 메모리 대역폭 요구 사항이 모두 감소합니다. 기본적으로 차원 축소 비율은 원래 차원의 절반입니다(<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>보조(전체 차원)</strong>: 벡터의 원래 차원입니다. SVS는 차원 축소로 인해 손실된 정확도를 회복하기 위해, 이 보조 데이터셋을 기준으로 1차 그래프 검색에서 반환된 후보들을 재순위화합니다.</p></li>
</ul>
<p>두 표현 모두 <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (국소 적응형 벡터 양자화)를 통해 양자화됩니다. 팩토리 문자열의 저장소 구성 요소가 인코딩 방식을 선택합니다. 예를 들어, <code translate="no">LeanVec4x8</code> 는 1차 데이터셋의 경우 차원당 4비트를, 2차 데이터셋의 경우 차원당 8비트를 사용합니다. 재순위 지정 단계에서도 전체 정밀도 벡터를 읽지 않습니다.</p>
<p>기본적으로 LeanVec은 인덱싱된 벡터와 쿼리에 대해 별도의 투영을 학습하여, 인덱싱된 벡터와 다른 분포에서 비롯된 쿼리(분포 외, OOD)를 지원합니다. 이는 텍스트-이미지 검색과 같은 크로스 모달 워크로드에서 특히 효과적이며, 쿼리가 인덱싱된 벡터와 동일한 분포에서 비롯된 경우에도 잘 작동합니다. Milvus는 아직 투영 계산을 위해 쿼리를 전달하는 방법을 지원하지 않으므로, 현재는 기본 벡터만 사용됩니다. OOD 훈련은 빌드 시간을 증가시킵니다. 쿼리 성능을 다소 희생하더라도 빌드 속도를 높이려면 ` <code translate="no">ood_training</code> `을 ` <code translate="no">False</code>`로 설정하십시오.</p>
<h3 id="LVQ-compression" class="common-anchor-header">LVQ 압축<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>차원이 약 512 미만인 데이터셋의 경우, 차원 축소를 생략하고 LVQ 양자화만으로 압축하는 것이 더 효과적일 수 있습니다. LeanVec과 마찬가지로, LVQ 인덱스는 빠른 검색을 위한 기본 표현과 재순위를 위한 잔차 표현을 유지합니다. 예를 들어, <code translate="no">LVQ4x4</code> 는 기본 표현에 4비트를, 잔차 표현에 4비트를 사용합니다. <code translate="no">LVQ4x0</code> 및 <code translate="no">LVQ8x0</code> 는 재순위 단계를 생략하므로, 리콜이 워크로드에 충분히 양호한 경우 쿼리 속도가 빨라집니다.</p>
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
    </button></h2><p>SVS Vamana 팩토리 문자열은 <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code> 형식을 따르며, 여기서 <code translate="no">&lt;degree&gt;</code> 은 그래프 내 노드당 최대 에지 수를 나타냅니다.</p>
<table>
<thead>
<tr><th>팩토리 문자열</th><th>저장소</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>압축되지 않은 벡터.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>16비트 부동 소수점</td><td><code translate="no">FP32</code> 의 벡터 메모리 용량의 절반이며, 정확도 손실은 최소화됩니다.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>8비트 스칼라 양자화</td><td><code translate="no">FP32</code> 의 벡터 메모리 용량의 1/4입니다.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ 기본, 잔차 없음</td><td>인텔 CPU 전용. 재순위 지정 없음.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ 기본 및 잔차</td><td>인텔 CPU 전용.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec 기본 및 보조</td><td>인텔 CPU 전용. 차원 축소 값을 설정하려면 <code translate="no">_&lt;dim&gt;</code> 접미사를 추가하십시오. 예를 들어, <code translate="no">LeanVec4x8_128</code> 는 1차 데이터셋을 128차원으로 축소합니다. 접미사가 없으면 차원 축소 값은 <code translate="no">dim / 2</code> 입니다.</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> 이는 좋은 출발점입니다. 그 다음에는:</p>
<ul>
<li><p>메모리 비용을 어느 정도 감수하고 <strong>리콜률을 높이려면</strong>, <code translate="no">_&lt;dim&gt;</code> 접미사를 사용하여 LeanVec 차원을 늘리십시오.</p></li>
<li><p>리콜 성능을 다소 희생하더라도 <strong>메모리 사용량을 줄이려면</strong> LeanVec의 차원을 낮추십시오.</p></li>
<li><p>저차원 벡터의 경우, ` <code translate="no">LVQ8</code>`를 사용해 보세요.</p></li>
<li><p><strong>인텔(Intel)이 아닌 CPU에서는</strong> <code translate="no">FP16</code> 또는 <code translate="no">SQ8</code> 를 사용하십시오.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">인덱스 구축<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 그래프 차수 64 및 LeanVec 압축을 사용하여 SVS Vamana 인덱스를 구축합니다. 인덱스를 구축하기 전에 설정 블록을 확장하고 실행하십시오.</p>
<p><details></p>
<p><summary>컬렉션 준비</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><code translate="no">index_type</code> 을 <code translate="no">FAISS</code> 로 설정하고, <code translate="no">faiss_index_name</code> 를 사용하여 SVS Vamana 레시피를 선택하십시오.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">인덱스 검색<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> <a href="https://milvus.io/docs/hnsw.md">는 HNSW에서</a>` <code translate="no">ef</code> `가 하는 것처럼 리콜과 지연 시간 간의 균형을 조절합니다. ` <code translate="no">search_buffer_capacity</code> `를 최소한 동일한 값으로 설정하십시오. 두 항목의 인덱스 기본값은 모두 10이며, SVS는 ` <code translate="no">search_window_size</code> `가 ` <code translate="no">search_buffer_capacity</code>`보다 큰 검색을 거부합니다.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">limit</code> 가 <code translate="no">search_window_size</code> 보다 크면, SVS는 해당 검색에 대해 <code translate="no">limit</code> 까지 창 크기를 늘립니다.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">SVS Vamana 매개변수<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 빌드 매개변수는 <code translate="no">params</code> 의 <code translate="no">add_index()</code> 에 <code translate="no">faiss_index_name</code> 바로 옆에 지정됩니다. 인덱스가 구축된 후에는 이 매개변수를 변경할 수 없습니다.</p>
<table>
<thead>
<tr><th>매개변수</th><th>기본값</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>그래프 구축 시 각 노드의 인접 노드를 찾는 데 사용되는 후보 목록의 크기입니다. 값이 클수록 그래프 품질과 리콜률은 향상되지만, 구축에 더 많은 시간이 소요됩니다. 최소한 그래프의 차수만큼으로 설정하십시오. 200이 일반적으로 많이 사용됩니다.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> <code translate="no">L2</code> 의 경우 , 의 경우 <code translate="no">0.95</code> <code translate="no">IP</code> <code translate="no">COSINE</code></td><td><code translate="no">L2</code> 의 경우, <code translate="no">IP</code>, <code translate="no">COSINE</code> 의 경우, ‘Pruning strength’입니다. 1에서 멀어질수록 더 공격적으로 정리를 수행하여, 중복된 단거리 에지보다 장거리 에지를 우선시합니다. 에는 1보다 큰 값을, 및 에는 1보다 작은 값을 사용하십시오. 데이터에서 더 나은 값을 측정하지 않은 한 기본값을 유지하십시오.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>팩토리 문자열의 도(degree) 또는 <code translate="no">32</code></td><td>노드당 최대 에지 수입니다. 팩토리 문자열의 도(degree) 값을 재정의합니다. [32, 128] 범위의 값이 대부분의 워크로드에 적합합니다. 값을 높이면 리콜률은 향상될 수 있지만, 더 많은 메모리를 사용하고 빌드 시간이 길어집니다.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>그래프 차수에서 4를 뺀 값</td><td>노드가 그래프 차수를 초과한 후, 가지치기를 거친 뒤에도 유지하는 에지 수입니다.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>노드의 인접 노드를 전정할 때 고려되는 최대 후보 수입니다. 이 값은 ` <code translate="no">construction_window_size</code>`보다 커야 합니다.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>가지치기가 최종 후보 노드뿐만 아니라 생성 검색 과정에서 방문한 모든 노드를 고려할지 여부.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> 공장 문자열 접미사 또는 <code translate="no">dim / 2</code></td><td>LeanVec 전용. 기본 데이터셋의 차원 축소 값. factory-string 접미사를 재정의합니다. 값이 작을수록 메모리 사용량이 줄어들고 그래프 검색 속도가 빨라지지만, 리콜률은 낮아집니다.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> LeanVec용</td><td>LeanVec 전용. 인덱싱된 벡터와 쿼리에 대해 별도의 투영을 학습할지 여부. 더 빠른 빌드를 위해 <code translate="no">False</code> 를 설정하십시오. LeanVec 이외의 팩토리에서 <code translate="no">True</code> 를 설정하면 오류가 발생합니다.</td></tr>
</tbody>
</table>
<p>다음 검색 매개변수는 ` <code translate="no">search_params.params</code>`에 포함됩니다. 또한 이를 빌드 매개변수로 설정할 수도 있으며, 이 경우 해당 매개변수가 설정되지 않은 검색에 대해 인덱스가 사용하는 기본값이 변경됩니다.</p>
<table>
<thead>
<tr><th>매개변수</th><th>기본값</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>그래프를 탐색하는 동안 유지하는 가장 가까운 후보의 수입니다. 값이 클수록 리콜률과 지연 시간이 증가합니다.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>검색 버퍼의 용량입니다. <code translate="no">search_window_size</code> 보다 크거나 같아야 합니다. 대부분의 경우 <code translate="no">search_window_size</code> 와 동일하게 설정하십시오. LeanVec의 경우 <code translate="no">search_window_size</code> 의 1.5배를 시도해 보십시오.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">자세히 알아보기<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>일반적인 팩토리-스트링 계약, 제한 사항 및 오류 처리에 대해서는 <a href="https://milvus.io/docs/faiss.md">FAISS 인덱스 패스스루</a> 참조 문서를 읽어보십시오.</li>
<li><a href="https://milvus.io/docs/diskann.md">DISKANN의</a> 디스크 기반 Vamana 구현과 비교해 보세요.</li>
<li>빌드 세부 정보, 성능 튜닝 및 기본 C++ API에 대해서는 <a href="https://github.com/intel/ScalableVectorSearch">SVS 저장소를</a> 참조하십시오.</li>
</ul>
