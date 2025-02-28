---
id: cdc-monitoring.md
order: 4
summary: Milvus-CDC는 Grafana 대시보드를 통해 포괄적인 모니터링 기능을 제공합니다.
title: 모니터링
---
<h1 id="Monitoring" class="common-anchor-header">모니터링<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC는 Grafana 대시보드를 통해 포괄적인 모니터링 기능을 제공하여 주요 지표를 시각화하고 변경 데이터 캡처(CDC) 작업 및 서버 상태의 원활한 운영을 보장할 수 있습니다.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">CDC 작업에 대한 메트릭</h3><p>시작하려면 <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> 파일을 Grafana로 가져오세요. 그러면 CDC 작업의 상태를 모니터링하기 위해 특별히 설계된 대시보드가 추가됩니다.</p>
<p><strong>CDC Grafana 대시보드 개요</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>MILVUS-CDC-대시보드</span> </span></p>
<p><strong>주요 메트릭 설명:</strong></p>
<ul>
<li><p><strong>작업</strong>: 작업: <strong>초기</strong>, <strong>실행 중</strong>, <strong>일시 중지</strong> 등 다양한 상태의 CDC 작업 수입니다.</p></li>
<li><p><strong>요청 총계</strong>: Milvus-CDC에서 받은 총 요청 수입니다.</p></li>
<li><p><strong>요청 성공</strong>: Milvus-CDC가 수신한 성공적인 요청 수입니다.</p></li>
<li><p><strong>작업 수</strong>: 시간 경과에 따른 <strong>초기</strong>, <strong>일시 중지</strong> 및 <strong>실행</strong> 상태의 작업 수입니다.</p></li>
<li><p><strong>작업 상태</strong>: 개별 작업의 상태입니다.</p></li>
<li><p><strong>요청 횟수</strong>: 성공 및 총 요청 수</p></li>
<li><p><strong>요청 대기 시간</strong>: p99까지의 요청 지연 시간, 평균 및 기타 통계입니다.</p></li>
<li><p><strong>복제 데이터 속도</strong>: 읽기/쓰기 작업의 복제 데이터 속도</p></li>
<li><p><strong>복제 TT 지연</strong>: 읽기/쓰기 작업의 복제 시간 지연.</p></li>
<li><p><strong>API 실행 횟수</strong>: 다른 Milvus-CDC API가 실행된 횟수입니다.</p></li>
<li><p><strong>center ts</strong>: 읽기/쓰기 작업의 타임스탬프.</p></li>
</ul>
