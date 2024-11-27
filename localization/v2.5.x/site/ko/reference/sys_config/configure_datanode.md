---
id: configure_datanode.md
related_key: configure
group: system_configuration.md
summary: Milvus용 데이터노드 구성 방법을 알아보세요.
---
<h1 id="dataNode-related-Configurations" class="common-anchor-header">데이터 노드 관련 구성<button data-href="#dataNode-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="dataNodedataSyncflowGraphmaxQueueLength" class="common-anchor-header"><code translate="no">dataNode.dataSync.flowGraph.maxQueueLength</code><button data-href="#dataNodedataSyncflowGraphmaxQueueLength" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.dataSync.flowGraph.maxQueueLength">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        플로그래프에서 작업 대기열의 최대 길이      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodedataSyncflowGraphmaxParallelism" class="common-anchor-header"><code translate="no">dataNode.dataSync.flowGraph.maxParallelism</code><button data-href="#dataNodedataSyncflowGraphmaxParallelism" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.dataSync.flowGraph.maxParallelism">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        플로우그래프에서 병렬로 실행되는 최대 작업 수   </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodedataSyncmaxParallelSyncMgrTasks" class="common-anchor-header"><code translate="no">dataNode.dataSync.maxParallelSyncMgrTasks</code><button data-href="#dataNodedataSyncmaxParallelSyncMgrTasks" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.dataSync.maxParallelSyncMgrTasks">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        전 세계적으로 데이터노드 동기화 관리자의 최대 동시 동기화 작업 수입니다.      </td>
      <td>256</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodedataSyncskipModeenable" class="common-anchor-header"><code translate="no">dataNode.dataSync.skipMode.enable</code><button data-href="#dataNodedataSyncskipModeenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.dataSync.skipMode.enable">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        CPU 사용량을 줄이기 위해 일부 타임틱 메시지 건너뛰기 지원      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodedataSyncskipModeskipNum" class="common-anchor-header"><code translate="no">dataNode.dataSync.skipMode.skipNum</code><button data-href="#dataNodedataSyncskipModeskipNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.dataSync.skipMode.skipNum">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        건너뛴 레코드 n개당 하나씩 사용      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodedataSyncskipModecoldTime" class="common-anchor-header"><code translate="no">dataNode.dataSync.skipMode.coldTime</code><button data-href="#dataNodedataSyncskipModecoldTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.dataSync.skipMode.coldTime">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        x초 동안 타임틱 메시지만 있는 경우 건너뛰기 모드 켜기      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodesegmentinsertBufSize" class="common-anchor-header"><code translate="no">dataNode.segment.insertBufSize</code><button data-href="#dataNodesegmentinsertBufSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.segment.insertBufSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>메모리에 버퍼링되는 세그먼트 내 각 binlog 파일의 최대 크기입니다. 크기가 이 값을 초과하는 빈로그 파일은 MinIO 또는 S3 서비스로 플러시됩니다.</li>      
        <li>단위: 바이트</li>      
        <li>이 매개 변수를 너무 작게 설정하면 시스템이 소량의 데이터를 너무 자주 저장하게 됩니다. 너무 크게 설정하면 시스템의 메모리 요구량이 증가합니다.</li>      </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodesegmentdeleteBufBytes" class="common-anchor-header"><code translate="no">dataNode.segment.deleteBufBytes</code><button data-href="#dataNodesegmentdeleteBufBytes" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.segment.deleteBufBytes">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        단일 채널에 대해 del을 플러시할 최대 버퍼 크기(바이트), 기본값은 16MB입니다.      </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodesegmentsyncPeriod" class="common-anchor-header"><code translate="no">dataNode.segment.syncPeriod</code><button data-href="#dataNodesegmentsyncPeriod" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.segment.syncPeriod">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        버퍼가 비어 있지 않은 경우 세그먼트를 동기화할 기간입니다.      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodememoryforceSyncEnable" class="common-anchor-header"><code translate="no">dataNode.memory.forceSyncEnable</code><button data-href="#dataNodememoryforceSyncEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.memory.forceSyncEnable">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        메모리 사용량이 너무 많으면 동기화를 강제로 수행하려면 true로 설정합니다.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodememoryforceSyncSegmentNum" class="common-anchor-header"><code translate="no">dataNode.memory.forceSyncSegmentNum</code><button data-href="#dataNodememoryforceSyncSegmentNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.memory.forceSyncSegmentNum">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        동기화할 세그먼트 수, 버퍼가 가장 큰 세그먼트가 동기화됩니다.      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodememorycheckInterval" class="common-anchor-header"><code translate="no">dataNode.memory.checkInterval</code><button data-href="#dataNodememorycheckInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.memory.checkInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터노드 메모리 사용량을 확인할 간격(밀리초 단위)      </td>
      <td>3000</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodememoryforceSyncWatermark" class="common-anchor-header"><code translate="no">dataNode.memory.forceSyncWatermark</code><button data-href="#dataNodememoryforceSyncWatermark" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.memory.forceSyncWatermark">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        독립형용 메모리 워터마크, 이 워터마크에 도달하면 세그먼트가 동기화됩니다.      </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodechannelworkPoolSize" class="common-anchor-header"><code translate="no">dataNode.channel.workPoolSize</code><button data-href="#dataNodechannelworkPoolSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.channel.workPoolSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>모든 채널의 글로벌 작업 풀의 크기를 지정합니다.</li>      
        <li>이 파라미터가 &lt;= 0이면 실행할 수 있는 최대 CPU 수로 설정합니다.</li>      
        <li>차단을 피하기 위해 컬렉션 수가 많은 경우 더 크게 설정하는 것이 좋습니다.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodechannelupdateChannelCheckpointMaxParallel" class="common-anchor-header"><code translate="no">dataNode.channel.updateChannelCheckpointMaxParallel</code><button data-href="#dataNodechannelupdateChannelCheckpointMaxParallel" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.channel.updateChannelCheckpointMaxParallel">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>채널 체크포인트 업데이트를 위한 글로벌 작업 풀의 크기를 지정합니다.</li>      
        <li>이 파라미터가 &lt;= 0이면 10으로 설정합니다.</li>      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodechannelupdateChannelCheckpointInterval" class="common-anchor-header"><code translate="no">dataNode.channel.updateChannelCheckpointInterval</code><button data-href="#dataNodechannelupdateChannelCheckpointInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.channel.updateChannelCheckpointInterval">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터 노드가 각 채널의 채널 체크포인트를 업데이트할 간격(초)입니다.      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodechannelupdateChannelCheckpointRPCTimeout" class="common-anchor-header"><code translate="no">dataNode.channel.updateChannelCheckpointRPCTimeout</code><button data-href="#dataNodechannelupdateChannelCheckpointRPCTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.channel.updateChannelCheckpointRPCTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        업데이트채널체크포인트 RPC 호출에 대한 시간제한(초)      </td>
      <td>20</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodechannelmaxChannelCheckpointsPerPRC" class="common-anchor-header"><code translate="no">dataNode.channel.maxChannelCheckpointsPerPRC</code><button data-href="#dataNodechannelmaxChannelCheckpointsPerPRC" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.channel.maxChannelCheckpointsPerPRC">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        업데이트채널체크포인트 RPC당 최대 채널 체크포인트 수입니다.      </td>
      <td>128</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodechannelchannelCheckpointUpdateTickInSeconds" class="common-anchor-header"><code translate="no">dataNode.channel.channelCheckpointUpdateTickInSeconds</code><button data-href="#dataNodechannelchannelCheckpointUpdateTickInSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.channel.channelCheckpointUpdateTickInSeconds">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        채널 체크포인트 업데이터가 업데이트를 실행하는 빈도(초)입니다.      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeimportmaxConcurrentTaskNum" class="common-anchor-header"><code translate="no">dataNode.import.maxConcurrentTaskNum</code><button data-href="#dataNodeimportmaxConcurrentTaskNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.import.maxConcurrentTaskNum">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터노드에서 동시에 실행할 수 있는 가져오기/사전 가져오기 작업의 최대 개수입니다.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeimportmaxImportFileSizeInGB" class="common-anchor-header"><code translate="no">dataNode.import.maxImportFileSizeInGB</code><button data-href="#dataNodeimportmaxImportFileSizeInGB" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.import.maxImportFileSizeInGB">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        가져오기 파일의 최대 파일 크기(GB)이며, 여기서 가져오기 파일은 행 기반 파일 또는 열 기반 파일 집합을 의미합니다.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeimportreadBufferSizeInMB" class="common-anchor-header"><code translate="no">dataNode.import.readBufferSizeInMB</code><button data-href="#dataNodeimportreadBufferSizeInMB" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.import.readBufferSizeInMB">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        가져오기 중 데이터노드가 청크 관리자에서 읽은 데이터 블록 크기(MB)입니다.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodecompactionlevelZeroBatchMemoryRatio" class="common-anchor-header"><code translate="no">dataNode.compaction.levelZeroBatchMemoryRatio</code><button data-href="#dataNodecompactionlevelZeroBatchMemoryRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.compaction.levelZeroBatchMemoryRatio">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        배치 모드에서 실행되는 레벨 제로 압축을 위한 여유 메모리의 최소 메모리 비율입니다.      </td>
      <td>0.05</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodecompactionlevelZeroMaxBatchSize" class="common-anchor-header"><code translate="no">dataNode.compaction.levelZeroMaxBatchSize</code><button data-href="#dataNodecompactionlevelZeroMaxBatchSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.compaction.levelZeroMaxBatchSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        최대 배치 크기는 L0 압축을 실행할 때 배치에 포함된 최대 L1/L2 세그먼트 수를 나타냅니다. 기본값은 -1이며, 1보다 작은 값은 제한이 없음을 의미합니다. 유효한 범위: &gt;= 1.  </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodegracefulStopTimeout" class="common-anchor-header"><code translate="no">dataNode.gracefulStopTimeout</code><button data-href="#dataNodegracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        초. 정상 정지 없이 노드 강제 중지      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeslotslotCap" class="common-anchor-header"><code translate="no">dataNode.slot.slotCap</code><button data-href="#dataNodeslotslotCap" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.slot.slotCap">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터 노드에서 동시에 실행할 수 있는 최대 작업(예: 압축, 가져오기) 수입니다.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeclusteringCompactionmemoryBufferRatio" class="common-anchor-header"><code translate="no">dataNode.clusteringCompaction.memoryBufferRatio</code><button data-href="#dataNodeclusteringCompactionmemoryBufferRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.clusteringCompaction.memoryBufferRatio">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        클러스터링 압축의 메모리 버퍼 비율입니다. 임계값보다 큰 데이터는 스토리지로 플러시됩니다.      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeclusteringCompactionworkPoolSize" class="common-anchor-header"><code translate="no">dataNode.clusteringCompaction.workPoolSize</code><button data-href="#dataNodeclusteringCompactionworkPoolSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.clusteringCompaction.workPoolSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        하나의 클러스터링 압축 작업에 대한 작업자 풀 크기입니다.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeip" class="common-anchor-header"><code translate="no">dataNode.ip</code><button data-href="#dataNodeip" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.ip">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터노드의 TCP/IP 주소입니다. 지정하지 않으면 첫 번째 유니캐스트 가능한 주소를 사용합니다.      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeport" class="common-anchor-header"><code translate="no">dataNode.port</code><button data-href="#dataNodeport" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.port">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터노드의 TCP 포트      </td>
      <td>21124</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodegrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">dataNode.grpc.serverMaxSendSize</code><button data-href="#dataNodegrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터 노드가 전송할 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodegrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">dataNode.grpc.serverMaxRecvSize</code><button data-href="#dataNodegrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터 노드가 수신할 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodegrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">dataNode.grpc.clientMaxSendSize</code><button data-href="#dataNodegrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터 노드의 클라이언트가 보낼 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodegrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">dataNode.grpc.clientMaxRecvSize</code><button data-href="#dataNodegrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">설명</th>
      <th class="width20">기본값</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        데이터 노드의 클라이언트가 수신할 수 있는 각 RPC 요청의 최대 크기, 단위: 바이트      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
