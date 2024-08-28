---
id: limitations.md
title: 밀버스 한도
related_key: Limitations
summary: Milvus 사용 중 제한 사항에 대해 알아보세요.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Milvus 제한 사항<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 AI 애플리케이션과 벡터 유사도 검색을 지원하는 최고의 벡터 데이터베이스를 제공하기 위해 최선을 다하고 있습니다. 하지만 사용자 경험을 향상시키기 위해 더 많은 기능과 최고의 유틸리티를 제공하기 위해 지속적으로 노력하고 있습니다. 이 페이지에는 Milvus를 사용할 때 사용자가 직면할 수 있는 몇 가지 알려진 제한 사항이 나열되어 있습니다.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">리소스 이름의 길이<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>리소스</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td>컬렉션</td><td>255자</td></tr>
<tr><td>필드</td><td>255자</td></tr>
<tr><td>색인</td><td>255자</td></tr>
<tr><td>파티션</td><td>255자</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">이름 지정 규칙<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>리소스 이름에는 숫자, 문자, 밑줄(_)을 포함할 수 있습니다. 리소스 이름은 문자 또는 밑줄(_)로 시작해야 합니다.</p>
<h2 id="Number-of-resources" class="common-anchor-header">리소스 수<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>리소스</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td>컬렉션</td><td>65,536</td></tr>
<tr><td>연결/프록시</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">컬렉션의 리소스 수<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>리소스</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td>파티션</td><td>4,096</td></tr>
<tr><td>샤드</td><td>16</td></tr>
<tr><td>필드</td><td>64</td></tr>
<tr><td>색인</td><td>1</td></tr>
<tr><td>엔티티</td><td>무제한</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">문자열의 길이<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>데이터 유형</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">벡터의 차원<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>속성</th><th>Limit</th></tr>
</thead>
<tbody>
<tr><td>차원</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">RPC당 입력 및 출력<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>연산</th><th>Limit</th></tr>
</thead>
<tbody>
<tr><td>삽입</td><td>64 MB</td></tr>
<tr><td>검색</td><td>64 MB</td></tr>
<tr><td>쿼리</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">로드 제한<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 릴리스에서는 로드할 데이터가 모든 쿼리 노드의 총 메모리 리소스의 90% 미만이어야 실행 엔진을 위한 메모리 리소스를 예약할 수 있습니다.</p>
<h2 id="Search-limits" class="common-anchor-header">검색 제한<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>벡터</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (반환할 가장 유사한 결과의 개수)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (검색 요청 수)</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">다양한 검색 유형에 대한 색인 제한<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표는 다양한 인덱스 유형에 대한 다양한 검색 동작 지원에 대한 개요를 제공합니다.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>FLAT</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>SPARSE_INVERTED_INDEX</th><th>SPARSE_WAND</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>기본 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>파티션 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>원시 데이터가 검색된 기본 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>페이지 매김을 사용한 기본 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>필터링된 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>범위 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>예</td><td>예</td></tr>
<tr><td>그룹 검색</td><td>예</td><td>아니요</td><td>예</td><td>예</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td></tr>
<tr><td>반복기를 사용한 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td></tr>
<tr><td>하이브리드 검색</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예(RRFRanker만 해당)</td><td>예(RRFRanker만 해당)</td><td>예</td><td>예</td></tr>
<tr><td>쿼리/조회</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
<tr><td>반복기를 사용한 쿼리</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>예</td><td>아니요</td><td>아니요</td><td>아니요</td><td>아니요</td><td>예</td><td>예</td><td>예</td><td>예</td></tr>
</tbody>
</table>
