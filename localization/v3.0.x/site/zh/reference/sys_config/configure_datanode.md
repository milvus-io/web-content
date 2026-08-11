---
id: configure_datanode.md
related_key: configure
group: system_configuration.md
summary: 了解如何为 Milvus 配置 dataNode。
---
<h1 id="dataNode-related-Configurations" class="common-anchor-header">与 dataNode 相关的配置<button data-href="#dataNode-related-Configurations" class="anchor-icon" translate="no">
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        流图中任务队列的最大长度      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        流程图中并行执行的任务最大数量      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        数据节点同步管理器全局最大并发同步任务数      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        支持跳过某些时间戳消息以减少 CPU 使用率      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        每跳过 n 条记录消耗一个      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        当仅剩时间戳消息持续 x 秒后，启用跳过模式      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>内存中缓冲的每个分段中，每个二进制日志文件的最大大小。大小超过此值的二进制日志文件将被刷新到 MinIO 或 S3 服务。</li>      
        <li>单位：字节</li>      
        <li>如果将此参数设置得过小，会导致系统过于频繁地存储少量数据。如果设置得过大，则会增加系统对内存的需求。</li>      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        单个通道的 del 刷新最大缓冲区大小（以字节为单位），默认值为 16MB      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        当缓冲区不为空时，同步分段的周期。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        如果内存使用率过高，请设置为 true 以强制同步      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        要同步的段数，缓冲区最大的段将被同步。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        检查数据节点内存使用情况的间隔，单位为毫秒      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        独立实例的内存水位线，达到该水位线时，将同步分段。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>指定所有通道的全局工作池大小</li>      
        <li>如果此参数 &lt;= 0，则将其设置为可执行的 CPU 最大数量</li>      
        <li>建议在Collection数量较大时将其设置得更大，以避免阻塞</li>      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>指定用于通道检查点更新的全局工作池大小</li>      
        <li>如果此参数 &lt;= 0，则将其设置为 10</li>      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        数据节点更新每个通道检查点的间隔时间（以秒为单位）      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        UpdateChannelCheckpoint RPC 调用的超时时间（以秒为单位）      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        每个 UpdateChannelCheckpoint RPC 调用的通道检查点最大数量。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        通道检查点更新程序执行更新的频率（单位：秒）。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        允许在数据节点上并发运行的导入/预导入任务的最大数量。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        导入文件的最大文件大小（以 GB 为单位），此处“导入文件”指行式文件或一组列式文件。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        导入过程中，数据节点从分块管理器读取的数据块大小（单位：MB）。      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodeimportmaxTaskSlotNum" class="common-anchor-header"><code translate="no">dataNode.import.maxTaskSlotNum</code><button data-href="#dataNodeimportmaxTaskSlotNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.import.maxTaskSlotNum">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        每个导入/预导入任务所占用的槽位最大数量。      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        在批处理模式下执行零级压缩时，可用内存的最小比例。      </td>
      <td>0.5</td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        最大批处理大小指执行 L0 压缩时，一个批处理中 L1/L2 段的最大数量。默认值为 -1，小于 1 的任何值均表示无限制。有效范围：≥ 1。      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodecompactionuseMergeSort" class="common-anchor-header"><code translate="no">dataNode.compaction.useMergeSort</code><button data-href="#dataNodecompactionuseMergeSort" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.compaction.useMergeSort">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        执行 mixCompaction 时是否启用 mergeSort 模式。      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodecompactionmaxSegmentMergeSort" class="common-anchor-header"><code translate="no">dataNode.compaction.maxSegmentMergeSort</code><button data-href="#dataNodecompactionmaxSegmentMergeSort" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.compaction.maxSegmentMergeSort">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        在 mergeSort 模式下要合并的分段最大数量。      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodecompactionlobHoleRatioThreshold" class="common-anchor-header"><code translate="no">dataNode.compaction.lobHoleRatioThreshold</code><button data-href="#dataNodecompactionlobHoleRatioThreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.compaction.lobHoleRatioThreshold">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TEXT 字段现有 LOB 文件中未使用空间比例的阈值。在压缩过程中，如果该比例低于阈值，Milvus 将复用现有 LOB 文件；如果该比例大于或等于阈值，Milvus 将把剩余的 LOB 有效载荷重写到新的 LOB 文件中以回收空间。      </td>
      <td>0.3</td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        秒。强制停止节点，不进行优雅停止      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        允许在数据节点上并发运行的任务（例如：压缩、导入）的最大数量      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        集群压缩的内存缓冲区比例。超过阈值的数据将被刷新到存储中。      </td>
      <td>0.3</td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        单个聚簇压缩任务的工作线程池大小。      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodebloomFilterApplyParallelFactor" class="common-anchor-header"><code translate="no">dataNode.bloomFilterApplyParallelFactor</code><button data-href="#dataNodebloomFilterApplyParallelFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.bloomFilterApplyParallelFactor">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        将主键应用于布隆过滤器时的并行因子，默认值为 4*CPU_CORE_NUM      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodestoragedeltalog" class="common-anchor-header"><code translate="no">dataNode.storage.deltalog</code><button data-href="#dataNodestoragedeltalog" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.storage.deltalog">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        增量日志格式，选项：[json, parquet]      </td>
      <td>json</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodetextinlineThreshold" class="common-anchor-header"><code translate="no">dataNode.text.inlineThreshold</code><button data-href="#dataNodetextinlineThreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.text.inlineThreshold">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        用于选择 TEXT 字段值存储路径的大小阈值（单位：字节）。小于该阈值的值将内联存储在字段数据中；大于或等于该阈值的值将作为 LOB 有效载荷单独存储，而字段数据中则存储一个内部引用。      </td>
      <td>65536</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodetextmaxLobFileBytes" class="common-anchor-header"><code translate="no">dataNode.text.maxLobFileBytes</code><button data-href="#dataNodetextmaxLobFileBytes" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.text.maxLobFileBytes">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        存储 TEXT 有效载荷的单个 LOB 文件的最大大小（以字节为单位）。当 LOB 文件达到此大小时，Milvus 会将后续的 TEXT LOB 有效载荷写入另一个 LOB 文件。      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
<h2 id="dataNodetextflushThresholdBytes" class="common-anchor-header"><code translate="no">dataNode.text.flushThresholdBytes</code><button data-href="#dataNodetextflushThresholdBytes" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataNode.text.flushThresholdBytes">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        触发 Milvus 将缓冲的 TEXT LOB 有效载荷从增长段刷新到存储的缓冲区大小阈值（单位：字节）。      </td>
      <td>16777216</td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dataNode 的 TCP/IP 地址。如果未指定，则使用第一个可单播地址      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dataNode 的 TCP 端口      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dataNode 可发送的每个 RPC 请求的最大大小，单位：字节      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dataNode 可以接收的每个 RPC 请求的最大大小，单位：字节      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dataNode 上的客户端可发送的每个 RPC 请求的最大大小，单位：字节      </td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        dataNode 上的客户端可接收的每个 RPC 请求的最大大小，单位：字节      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
