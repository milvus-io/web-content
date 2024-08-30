---
id: configure_querycoord.md
related_key: configure
group: system_configuration.md
summary: Milvus용 쿼리코드 구성 방법을 알아보세요.
title: ''
---
<h1 id="queryCoord-related-Configurations" class="common-anchor-header">쿼리코드 관련 구성<button data-href="#queryCoord-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>쿼리 노드의 토폴로지 및 로드 밸런싱을 관리하고 성장하는 세그먼트에서 봉인된 세그먼트로 핸드오프하는 데 사용되는 queryCoord의 관련 구성입니다.</p>
<h2 id="queryCoordautoHandoff" class="common-anchor-header"><code translate="no">queryCoord.autoHandoff</code><button data-href="#queryCoordautoHandoff" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoHandoff">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>증가하는 세그먼트가 봉인 임계값에 도달할 때 증가하는 세그먼트를 해당 인덱싱된 봉인 세그먼트로 자동 대체할지 여부를 제어하는 스위치 값입니다.</li>      
        <li>이 매개변수를 false로 설정하면 Milvus는 단순히 무차별 대입으로 성장하는 세그먼트를 검색합니다.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordautoBalance" class="common-anchor-header"><code translate="no">queryCoord.autoBalance</code><button data-href="#queryCoordautoBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        세그먼트 로딩 및 해제 작업을 균등하게 분배하여 쿼리 노드 간의 메모리 사용량 균형을 자동으로 조정할지 여부를 제어하는 스위치 값입니다.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordautoBalanceChannel" class="common-anchor-header"><code translate="no">queryCoord.autoBalanceChannel</code><button data-href="#queryCoordautoBalanceChannel" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoBalanceChannel">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        자동 밸런스 채널 활성화      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalancer" class="common-anchor-header"><code translate="no">queryCoord.balancer</code><button data-href="#queryCoordbalancer" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balancer">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리 노드의 세그먼트에 사용되는 자동 밸런서입니다.      </td>
      <td>점수 기반 밸런서</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordglobalRowCountFactor" class="common-anchor-header"><code translate="no">queryCoord.globalRowCountFactor</code><button data-href="#queryCoordglobalRowCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.globalRowCountFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리 노드 간 세그먼트의 균형을 맞출 때 사용되는 가중치입니다.      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordscoreUnbalanceTolerationFactor" class="common-anchor-header"><code translate="no">queryCoord.scoreUnbalanceTolerationFactor</code><button data-href="#queryCoordscoreUnbalanceTolerationFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.scoreUnbalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        밸런싱을 수행할 때 출발 노드와 도착 노드 간의 불균형 범위에 대한 최소값입니다.      </td>
      <td>0.05</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordreverseUnBalanceTolerationFactor" class="common-anchor-header"><code translate="no">queryCoord.reverseUnBalanceTolerationFactor</code><button data-href="#queryCoordreverseUnBalanceTolerationFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.reverseUnBalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        밸런스 수행 후 노드 간 불균형 범위의 최대값입니다.      </td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordoverloadedMemoryThresholdPercentage" class="common-anchor-header"><code translate="no">queryCoord.overloadedMemoryThresholdPercentage</code><button data-href="#queryCoordoverloadedMemoryThresholdPercentage" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.overloadedMemoryThresholdPercentage">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        봉인된 세그먼트 밸런싱을 트리거하기 위한 쿼리 노드의 메모리 사용량 임계값(백분율)입니다.      </td>
      <td>90</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalanceIntervalSeconds" class="common-anchor-header"><code translate="no">queryCoord.balanceIntervalSeconds</code><button data-href="#queryCoordbalanceIntervalSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balanceIntervalSeconds">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리 코드가 쿼리 노드 간의 메모리 사용량 균형을 맞추는 간격입니다.      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordmemoryUsageMaxDifferencePercentage" class="common-anchor-header"><code translate="no">queryCoord.memoryUsageMaxDifferencePercentage</code><button data-href="#queryCoordmemoryUsageMaxDifferencePercentage" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.memoryUsageMaxDifferencePercentage">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        봉인된 세그먼트 밸런싱을 트리거하기 위한 두 쿼리 노드 간의 메모리 사용량 차이 임계값(백분율)입니다.      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrowCountFactor" class="common-anchor-header"><code translate="no">queryCoord.rowCountFactor</code><button data-href="#queryCoordrowCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.rowCountFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리 노드 간에 세그먼트 밸런싱을 수행할 때 사용되는 행 수 가중치입니다.      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentCountFactor" class="common-anchor-header"><code translate="no">queryCoord.segmentCountFactor</code><button data-href="#queryCoordsegmentCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentCountFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리 노드 간에 세그먼트 밸런싱을 수행할 때 사용되는 세그먼트 수 가중치입니다.      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordglobalSegmentCountFactor" class="common-anchor-header"><code translate="no">queryCoord.globalSegmentCountFactor</code><button data-href="#queryCoordglobalSegmentCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.globalSegmentCountFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리 노드 간 세그먼트 밸런싱 시 사용되는 세그먼트 수 가중치입니다.      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentCountMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.segmentCountMaxSteps</code><button data-href="#queryCoordsegmentCountMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        세그먼트 수 기반 계획 생성기 최대 단계      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrowCountMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.rowCountMaxSteps</code><button data-href="#queryCoordrowCountMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.rowCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        세그먼트 수 기반 계획 생성기 최대 단계      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrandomMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.randomMaxSteps</code><button data-href="#queryCoordrandomMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.randomMaxSteps">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        세그먼트 수 기반 계획 생성기 최대 단계      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrowingRowCountWeight" class="common-anchor-header"><code translate="no">queryCoord.growingRowCountWeight</code><button data-href="#queryCoordgrowingRowCountWeight" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.growingRowCountWeight">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        세그먼트 행 수 증가에 따른 메모리 가중치      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoorddelegatorMemoryOverloadFactor" class="common-anchor-header"><code translate="no">queryCoord.delegatorMemoryOverloadFactor</code><button data-href="#queryCoorddelegatorMemoryOverloadFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.delegatorMemoryOverloadFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        델리게이터 과부하 메모리 계수      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalanceCostThreshold" class="common-anchor-header"><code translate="no">queryCoord.balanceCostThreshold</code><button data-href="#queryCoordbalanceCostThreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balanceCostThreshold">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        밸런스 비용의 임계값으로, 밸런스 계획 실행 후 클러스터의 비용 차이가 이 값보다 작으면 계획이 실행되지 않습니다.      </td>
      <td>0.001</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordchannelTaskTimeout" class="common-anchor-header"><code translate="no">queryCoord.channelTaskTimeout</code><button data-href="#queryCoordchannelTaskTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.channelTaskTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        1분    </td>
      <td>60000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentTaskTimeout" class="common-anchor-header"><code translate="no">queryCoord.segmentTaskTimeout</code><button data-href="#queryCoordsegmentTaskTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentTaskTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        2분    </td>
      <td>120000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordheartbeatAvailableInterval" class="common-anchor-header"><code translate="no">queryCoord.heartbeatAvailableInterval</code><button data-href="#queryCoordheartbeatAvailableInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.heartbeatAvailableInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        10초, 기간 내에 하트비트를 가져온 쿼리노드만 사용할 수 있습니다.      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoorddistRequestTimeout" class="common-anchor-header"><code translate="no">queryCoord.distRequestTimeout</code><button data-href="#queryCoorddistRequestTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.distRequestTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리노드에서 데이터 분포를 가져오는 쿼리코드의 요청 시간 제한(밀리초 단위)      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordheatbeatWarningLag" class="common-anchor-header"><code translate="no">queryCoord.heatbeatWarningLag</code><button data-href="#queryCoordheatbeatWarningLag" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.heatbeatWarningLag">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        마지막 히트 비트가 너무 오래된 경우 쿼리코드 보고서 경고에 대한 지연 값(밀리초)      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckHealthInterval" class="common-anchor-header"><code translate="no">queryCoord.checkHealthInterval</code><button data-href="#queryCoordcheckHealthInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkHealthInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        3초, 쿼리 코디가 쿼리 노드의 상태를 확인하려고 시도하는 간격      </td>
      <td>3000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckHealthRPCTimeout" class="common-anchor-header"><code translate="no">queryCoord.checkHealthRPCTimeout</code><button data-href="#queryCoordcheckHealthRPCTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkHealthRPCTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        100ms, 쿼리 노드에 대한 상태 확인 RPC의 타임아웃 시간      </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbrokerTimeout" class="common-anchor-header"><code translate="no">queryCoord.brokerTimeout</code><button data-href="#queryCoordbrokerTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.brokerTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5000ms, 쿼리코드 브로커 RPC 타임아웃      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcollectionRecoverTimes" class="common-anchor-header"><code translate="no">queryCoord.collectionRecoverTimes</code><button data-href="#queryCoordcollectionRecoverTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.collectionRecoverTimes">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        로딩 상태에서 수집 복구 시간이 한계에 도달하면 해제합니다.      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordobserverTaskParallel" class="common-anchor-header"><code translate="no">queryCoord.observerTaskParallel</code><button data-href="#queryCoordobserverTaskParallel" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.observerTaskParallel">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        병렬 옵저버 디스패처 작업 번호      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckAutoBalanceConfigInterval" class="common-anchor-header"><code translate="no">queryCoord.checkAutoBalanceConfigInterval</code><button data-href="#queryCoordcheckAutoBalanceConfigInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkAutoBalanceConfigInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        자동 밸런스 구성 확인 간격      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckNodeSessionInterval" class="common-anchor-header"><code translate="no">queryCoord.checkNodeSessionInterval</code><button data-href="#queryCoordcheckNodeSessionInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkNodeSessionInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리노드 클러스터 세션 확인 간격(초)      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgracefulStopTimeout" class="common-anchor-header"><code translate="no">queryCoord.gracefulStopTimeout</code><button data-href="#queryCoordgracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        초. 유예 없이 노드를 강제 종료합니다.      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordenableStoppingBalance" class="common-anchor-header"><code translate="no">queryCoord.enableStoppingBalance</code><button data-href="#queryCoordenableStoppingBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.enableStoppingBalance">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        잔액 정지 활성화 여부      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordchannelExclusiveNodeFactor" class="common-anchor-header"><code translate="no">queryCoord.channelExclusiveNodeFactor</code><button data-href="#queryCoordchannelExclusiveNodeFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.channelExclusiveNodeFactor">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        채널 전용 모드 활성화를 위한 최소 노드 수입니다.      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcollectionObserverInterval" class="common-anchor-header"><code translate="no">queryCoord.collectionObserverInterval</code><button data-href="#queryCoordcollectionObserverInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.collectionObserverInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        수집 옵저버의 간격      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckExecutedFlagInterval" class="common-anchor-header"><code translate="no">queryCoord.checkExecutedFlagInterval</code><button data-href="#queryCoordcheckExecutedFlagInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkExecutedFlagInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        강제로 dist를 가져올 검사 실행 플래그의 간격입니다.      </td>
      <td>100</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordupdateCollectionLoadStatusInterval" class="common-anchor-header"><code translate="no">queryCoord.updateCollectionLoadStatusInterval</code><button data-href="#queryCoordupdateCollectionLoadStatusInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.updateCollectionLoadStatusInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        수집 로드 상태를 업데이트하는 최대 간격, 5분    </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcleanExcludeSegmentInterval" class="common-anchor-header"><code translate="no">queryCoord.cleanExcludeSegmentInterval</code><button data-href="#queryCoordcleanExcludeSegmentInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.cleanExcludeSegmentInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        유효하지 않은 데이터를 필터링하는 데 사용되는 클린 파이프라인 제외 세그먼트의 기간(초)      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordip" class="common-anchor-header"><code translate="no">queryCoord.ip</code><button data-href="#queryCoordip" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.ip">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        queryCoord의 TCP/IP 주소입니다. 지정하지 않으면 첫 번째 유니캐스트 가능한 주소를 사용합니다.      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordport" class="common-anchor-header"><code translate="no">queryCoord.port</code><button data-href="#queryCoordport" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.port">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        queryCoord의 TCP 포트      </td>
      <td>19531</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.serverMaxSendSize</code><button data-href="#queryCoordgrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리코드가 전송할 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.serverMaxRecvSize</code><button data-href="#queryCoordgrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리코드가 수신할 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.clientMaxSendSize</code><button data-href="#queryCoordgrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        쿼리코드에 있는 클라이언트가 보낼 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.clientMaxRecvSize</code><button data-href="#queryCoordgrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        queryCoord의 클라이언트가 수신할 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
