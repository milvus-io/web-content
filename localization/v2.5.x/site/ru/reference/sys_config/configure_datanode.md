---
id: configure_datanode.md
related_key: configure
group: system_configuration.md
summary: 'Узнайте, как настроить dataNode для Milvus.'
---
<h1 id="dataNode-related-Configurations" class="common-anchor-header">Конфигурации, связанные с dataNode<button data-href="#dataNode-related-Configurations" class="anchor-icon" translate="no">
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальная длина очереди задач в графе потока      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество параллельно выполняемых задач в графе потока      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество одновременных задач синхронизации для datanode sync mgr в глобальном масштабе      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Поддержка пропуска некоторых сообщений timetick для снижения нагрузки на процессор      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Потреблять по одной за каждые n пропущенных записей      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Включить режим пропуска после того, как в течение x секунд были только сообщения о таймлапсе      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Максимальный размер каждого файла binlog в сегменте, буферизованном в памяти. Файлы бинлога, размер которых превышает это значение, затем сбрасываются в службу MinIO или S3.</li>      
        <li>Единица измерения: Байт .</li>      
        <li>Слишком маленькое значение этого параметра приводит к тому, что система слишком часто сохраняет небольшой объем данных. Слишком большое значение увеличивает потребность системы в памяти.</li>      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер буфера в байтах для промывки del для одного канала, по умолчанию 16 МБ.     </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Период синхронизации сегментов, если буфер не пуст.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Установите значение true, чтобы принудительно синхронизировать сегменты при слишком большом использовании памяти      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        количество сегментов для синхронизации, будут синхронизированы сегменты с наибольшим буфером.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        интервал проверки использования памяти узла данных, в миллисекундах      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        водяной знак памяти для автономной работы, при достижении которого сегменты будут синхронизированы.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>указать размер глобального рабочего пула всех каналов</li>      
        <li>если этот параметр &lt;= 0, то он будет установлен как максимальное количество CPU, которые могут выполнять работу</li>      
        <li>рекомендуется устанавливать большее значение при большом количестве коллекций, чтобы избежать блокировки</li>      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>указать размер глобального рабочего пула для обновления контрольных точек каналов</li>      
        <li>если этот параметр &lt;= 0, то будет установлено значение 10</li>      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        длительность интервала (в секундах) для обновления контрольной точки каждого канала на узле данных      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        таймаут в секундах для вызова RPC UpdateChannelCheckpoint      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество контрольных точек канала для одного RPC UpdateChannelCheckpoint.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Частота, в секундах, с которой программа обновления контрольных точек канала выполняет обновления.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество задач импорта/преимпорта, разрешенных для одновременного выполнения на узле данных.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер файла (в ГБ) для файла импорта, где файл импорта относится либо к файлу на основе строк, либо к набору файлов на основе столбцов.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Размер блока данных (в МБ), считываемый из менеджера чанков узлом данных во время импорта.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество слотов, занимаемых каждой задачей импорта/преимпорта.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Минимальный коэффициент свободной памяти для уплотнения нулевого уровня, выполняемого в пакетном режиме      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер партии означает максимальное количество сегментов L1/L2 в партии при выполнении уплотнения L0. По умолчанию -1, любое значение, меньшее 1, означает отсутствие ограничения. Допустимый диапазон: &gt;= 1.  </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Включать ли режим mergeSort при выполнении mixCompaction.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество сегментов, которые будут объединены в режиме mergeSort.      </td>
      <td>30</td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        секунд. принудительная остановка узла без изящной остановки      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество задач (например, уплотнение, импорт), разрешенных для одновременного выполнения на узле данных      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Коэффициент буфера памяти для кластерного уплотнения. Данные, превышающие пороговое значение, будут выгружаться в хранилище.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        размер рабочего пула для одного задания по уплотнению кластеризации.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        коэффициент параллельности при применении pk к bloom-фильтру, по умолчанию 4*CPU_CORE_NUM      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        формат дельталога, опции: [json, parquet].      </td>
      <td>json</td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP-адрес узла данных. Если не указан, используется первый одноадресный адрес.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP-порт узла данных      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который может отправить dataNode, единица измерения: байт      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который может получить узел данных, единица измерения: байт      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который могут отправить клиенты на dataNode, единица измерения: байт      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который могут получить клиенты на dataNode, единица измерения: байт      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
