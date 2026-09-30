---
id: configure_datanode.md
related_key: configure
group: system_configuration.md
summary: 'Узнайте, как настроить dataNode для Milvus.'
---
<h1 id="dataNode-related-Configurations" class="common-anchor-header">Настройки, связанные с dataNode<button data-href="#dataNode-related-Configurations" class="anchor-icon" translate="no">
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
      <td>        Максимальное количество задач, выполняемых параллельно в графе потока      </td>
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
      <td>        Максимальное количество одновременно выполняемых задач синхронизации в системе управления синхронизацией узлов данных (datanode sync mgr) в целом      </td>
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
      <td>        Поддержка пропуска некоторых сообщений о временных отметках для снижения загрузки ЦП      </td>
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
      <td>        Использовать один для каждых n пропущенных записей      </td>
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
      <td>        Включить режим пропуска после того, как в течение x секунд будут поступать только сообщения о времени      </td>
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
        <li>Максимальный размер каждого файла журнала бинарных операций в сегменте, буферизованного в памяти. Файлы журнала бинарных операций, размер которых превышает это значение, затем сбрасываются в MinIO или сервис S3.</li>      
        <li>Единица измерения: байт</li>      
        <li>Слишком низкое значение этого параметра приводит к тому, что система слишком часто сохраняет небольшие объемы данных. Слишком высокое значение увеличивает потребность системы в памяти.</li>      </td>
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
      <td>        Максимальный размер буфера в байтах для очистки del для одного канала, по умолчанию — 16 МБ      </td>
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
      <td>        Установите значение true, чтобы принудительно запустить синхронизацию, если использование памяти слишком велико      </td>
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
      <td>        количество сегментов для синхронизации; будут синхронизированы сегменты с наибольшим буфером.      </td>
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
      <td>        Пороговое значение использования памяти для автономного режима; при достижении этого значения сегменты будут синхронизированы.      </td>
      <td>0,5</td>
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
        <li>Укажите размер глобального пула задач для всех каналов</li>      
        <li>если этот параметр &lt;= 0, он будет установлен равным максимальному количеству процессоров, которые могут выполняться</li>      
        <li>рекомендуется установить большее значение при большом количестве коллекций, чтобы избежать блокировки</li>      </td>
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
        <li>Укажите размер глобального пула задач для обновления контрольных точек канала</li>      
        <li>если этот параметр &lt;= 0, он будет установлен равным 10</li>      </td>
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
      <td>        Интервал (в секундах), через который узел данных обновляет контрольную точку каждого канала      </td>
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
      <td>        таймаут в секундах для RPC-вызова UpdateChannelCheckpoint      </td>
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
      <td>        Максимальное количество контрольных точек канала на один RPC-вызов UpdateChannelCheckpoint.      </td>
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
      <td>        Частота (в секундах), с которой программа обновления контрольных точек канала выполняет обновления.      </td>
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
      <td>        Максимальное количество задач импорта и предварительного импорта, которые могут выполняться одновременно на узле хранения данных.      </td>
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
      <td>        Максимальный размер файла (в ГБ) для файла импорта, где файл импорта означает либо файл на основе строк, либо набор файлов на основе столбцов.      </td>
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
      <td>        Размер блока данных (в МБ), считываемого datanode из менеджера блоков во время импорта.      </td>
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
      <td>        Максимальное количество слотов, занимаемых каждой задачей импорта или предварительного импорта.      </td>
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
      <td>        Минимальная доля свободной памяти для уплотнения уровня нулевого, выполняемого в пакетном режиме.      </td>
      <td>0,5</td>
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
      <td>        Максимальный размер пакета — это максимальное количество сегментов L1/L2 в пакете при выполнении уплотнения уровня L0. По умолчанию — -1; любое значение, меньшее 1, означает отсутствие ограничения. Допустимый диапазон: &gt;= 1.      </td>
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
      <td>        Включить ли режим mergeSort при выполнении mixCompaction.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Пороговое значение соотношения неиспользуемого пространства в существующих файлах LOB для полей TEXT. Во время уплотнения, если это соотношение ниже порогового значения, Milvus повторно использует существующие файлы LOB. Если это соотношение больше или равно пороговому значению, Milvus перезаписывает оставшиеся данные LOB в новые файлы LOB, чтобы освободить место.      </td>
      <td>0,3</td>
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
      <td>        секунд. Принудительная остановка узла без плавного завершения работы      </td>
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
      <td>        Максимальное количество задач (например, уплотнение, импорт), которые могут выполняться одновременно на узле данных.      </td>
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
      <td>        Соотношение буфера памяти при кластерной уплотнении. Данные, объем которых превышает пороговое значение, будут сброшены в хранилище.      </td>
      <td>0,3</td>
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
      <td>        Размер пула рабочих процессов для одного задания кластерной уплотнения.      </td>
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
      <td>        коэффициент параллелизма при применении первичного ключа к фильтру Блума; по умолчанию равен 4*CPU_CORE_NUM      </td>
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
      <td>        Формат deltalog, варианты: [json, parquet]      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Пороговое значение размера (в байтах), используемое для выбора пути хранения значения поля TEXT. Значения, меньшие этого порогового значения, хранятся непосредственно в данных поля. Значения, равные или превышающие это пороговое значение, хранятся отдельно в виде данных LOB, а в данных поля сохраняется внутренняя ссылка.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер (в байтах) одного файла LOB, в котором хранятся полезные нагрузки TEXT. Когда файл LOB достигает этого размера, Milvus записывает последующие полезные нагрузки TEXT LOB в другой файл LOB.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Пороговое значение размера буфера (в байтах), при достижении которого Milvus сбрасывает буферизованные TEXT-нагрузки LOB из растущего сегмента в хранилище.      </td>
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
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP-адрес dataNode. Если не указан, используется первый адрес, поддерживающий одноадресную передачу.      </td>
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
      <td>        TCP-порт dataNode      </td>
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
      <td>        Максимальный размер каждого RPC-запроса, который может принять dataNode, единица измерения: байт      </td>
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
      <td>        Максимальный размер каждого RPC-запроса, который могут отправлять клиенты на dataNode, единица измерения: байт      </td>
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
      <td>        Максимальный размер каждого RPC-запроса, который могут принимать клиенты на dataNode, единица измерения: байт      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
