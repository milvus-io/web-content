---
id: configure_proxy.md
related_key: configure
group: system_configuration.md
summary: 'Узнайте, как настроить прокси для Milvus.'
---
<h1 id="proxy-related-Configurations" class="common-anchor-header">Конфигурации, связанные с прокси<button data-href="#proxy-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Связанная конфигурация прокси, используемая для проверки клиентских запросов и уменьшения возвращаемых результатов.</p>
<h2 id="proxytimeTickInterval" class="common-anchor-header"><code translate="no">proxy.timeTickInterval</code><button data-href="#proxytimeTickInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.timeTickInterval">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Интервал, с которым прокси синхронизирует тик времени, единица измерения: мс.      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyhealthCheckTimeout" class="common-anchor-header"><code translate="no">proxy.healthCheckTimeout</code><button data-href="#proxyhealthCheckTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.healthCheckTimeout">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        мс, интервал, через который выполняется проверка работоспособности компонента.      </td>
      <td>3000</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymsgStreamtimeTickbufSize" class="common-anchor-header"><code translate="no">proxy.msgStream.timeTick.bufSize</code><button data-href="#proxymsgStreamtimeTickbufSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.msgStream.timeTick.bufSize">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество сообщений, которое может быть буферизовано в потоке сообщений timeTick прокси при выдаче сообщений.      </td>
      <td>512</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymaxNameLength" class="common-anchor-header"><code translate="no">proxy.maxNameLength</code><button data-href="#proxymaxNameLength" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.maxNameLength">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальная длина имени или псевдонима, который может быть создан в Milvus, включая имя коллекции, псевдоним коллекции, имя раздела и имя поля.      </td>
      <td>255</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymaxFieldNum" class="common-anchor-header"><code translate="no">proxy.maxFieldNum</code><button data-href="#proxymaxFieldNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.maxFieldNum">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество полей, которое может быть создано при создании в коллекции. Настоятельно НЕ рекомендуется устанавливать maxFieldNum &gt;= 64.      </td>
      <td>64</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymaxVectorFieldNum" class="common-anchor-header"><code translate="no">proxy.maxVectorFieldNum</code><button data-href="#proxymaxVectorFieldNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.maxVectorFieldNum">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество векторных полей, которое может быть указано в коллекции. Диапазон значений: [1, 10].      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymaxShardNum" class="common-anchor-header"><code translate="no">proxy.maxShardNum</code><button data-href="#proxymaxShardNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.maxShardNum">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество осколков, которое может быть создано при создании в коллекции.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymaxDimension" class="common-anchor-header"><code translate="no">proxy.maxDimension</code><button data-href="#proxymaxDimension" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.maxDimension">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество размеров вектора при создании в коллекции.      </td>
      <td>32768</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyginLogging" class="common-anchor-header"><code translate="no">proxy.ginLogging</code><button data-href="#proxyginLogging" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.ginLogging">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Нужно ли создавать журналы gin.\n</li>      
        <li>пожалуйста, настройте во встроенном Milvus: false</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyginLogSkipPaths" class="common-anchor-header"><code translate="no">proxy.ginLogSkipPaths</code><button data-href="#proxyginLogSkipPaths" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.ginLogSkipPaths">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        пропускать url-путь для журнала gin   </td>
      <td>/</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymaxTaskNum" class="common-anchor-header"><code translate="no">proxy.maxTaskNum</code><button data-href="#proxymaxTaskNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.maxTaskNum">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальное количество задач в очереди задач прокси-сервера.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymustUsePartitionKey" class="common-anchor-header"><code translate="no">proxy.mustUsePartitionKey</code><button data-href="#proxymustUsePartitionKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.mustUsePartitionKey">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        переключатель, указывающий, должен ли прокси использовать ключ раздела для коллекции      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogenable" class="common-anchor-header"><code translate="no">proxy.accessLog.enable</code><button data-href="#proxyaccessLogenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.enable">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Включать ли функцию журнала доступа.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogminioEnable" class="common-anchor-header"><code translate="no">proxy.accessLog.minioEnable</code><button data-href="#proxyaccessLogminioEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.minioEnable">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Загружать ли локальные файлы журналов доступа в MinIO. Этот параметр может быть указан, если proxy.accessLog.filename не пуст.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLoglocalPath" class="common-anchor-header"><code translate="no">proxy.accessLog.localPath</code><button data-href="#proxyaccessLoglocalPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.localPath">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Путь к локальной папке, в которой хранится файл журнала доступа. Этот параметр может быть указан, если proxy.accessLog.filename не пуст.      </td>
      <td>/tmp/milvus_access</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogfilename" class="common-anchor-header"><code translate="no">proxy.accessLog.filename</code><button data-href="#proxyaccessLogfilename" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.filename">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Имя файла журнала доступа. Если оставить этот параметр пустым, журналы доступа будут выводиться в stdout.      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogmaxSize" class="common-anchor-header"><code translate="no">proxy.accessLog.maxSize</code><button data-href="#proxyaccessLogmaxSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.maxSize">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер, допустимый для одного файла журнала доступа. Если размер файла журнала достигнет этого предела, будет запущен процесс ротации. Этот процесс запечатывает текущий файл журнала доступа, создает новый файл журнала и очищает содержимое исходного файла журнала. Единица измерения: МБ.      </td>
      <td>64</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogrotatedTime" class="common-anchor-header"><code translate="no">proxy.accessLog.rotatedTime</code><button data-href="#proxyaccessLogrotatedTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.rotatedTime">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный интервал времени, допустимый для ротации одного файла журнала доступа. По достижении указанного интервала времени запускается процесс ротации, в результате которого создается новый файл журнала доступа и закрывается предыдущий. Единицы измерения: секунды      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogremotePath" class="common-anchor-header"><code translate="no">proxy.accessLog.remotePath</code><button data-href="#proxyaccessLogremotePath" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.remotePath">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Путь к объектному хранилищу для загрузки файлов журнала доступа.      </td>
      <td>access_log/</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogremoteMaxTime" class="common-anchor-header"><code translate="no">proxy.accessLog.remoteMaxTime</code><button data-href="#proxyaccessLogremoteMaxTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.remoteMaxTime">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Интервал времени, допустимый для загрузки файлов журнала доступа. Если время загрузки файла журнала превышает этот интервал, файл будет удален. Установка значения 0 отключает эту функцию.      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogcacheSize" class="common-anchor-header"><code translate="no">proxy.accessLog.cacheSize</code><button data-href="#proxyaccessLogcacheSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.cacheSize">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Размер журнала кэша записи, в байтах. (Закрыть кэш записи, если его размер был равен 0)  </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyaccessLogcacheFlushInterval" class="common-anchor-header"><code translate="no">proxy.accessLog.cacheFlushInterval</code><button data-href="#proxyaccessLogcacheFlushInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.accessLog.cacheFlushInterval">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Интервал времени автоматической промывки кэша записи, в секундах. (Закрыть автопромывку, если интервал был равен 0)  </td>
      <td>3</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyconnectionCheckIntervalSeconds" class="common-anchor-header"><code translate="no">proxy.connectionCheckIntervalSeconds</code><button data-href="#proxyconnectionCheckIntervalSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.connectionCheckIntervalSeconds">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        интервал времени (в секундах), в течение которого менеджер подключений сканирует информацию о неактивных клиентах.      </td>
      <td>120</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyconnectionClientInfoTTLSeconds" class="common-anchor-header"><code translate="no">proxy.connectionClientInfoTTLSeconds</code><button data-href="#proxyconnectionClientInfoTTLSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.connectionClientInfoTTLSeconds">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        продолжительность TTL информации о неактивном клиенте, в секундах      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
<h2 id="proxymaxConnectionNum" class="common-anchor-header"><code translate="no">proxy.maxConnectionNum</code><button data-href="#proxymaxConnectionNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.maxConnectionNum">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        максимальное количество информации о клиенте, которым должен управлять прокси, чтобы избежать слишком большого количества информации о клиенте      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="proxygracefulStopTimeout" class="common-anchor-header"><code translate="no">proxy.gracefulStopTimeout</code><button data-href="#proxygracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        секунд. принудительная остановка узла без грациозной остановки      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyslowQuerySpanInSeconds" class="common-anchor-header"><code translate="no">proxy.slowQuerySpanInSeconds</code><button data-href="#proxyslowQuerySpanInSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.slowQuerySpanInSeconds">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Запрос, время выполнения которого превышает значение `slowQuerySpanInSeconds`, может считаться медленным, в секундах.      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyqueryNodePoolingsize" class="common-anchor-header"><code translate="no">proxy.queryNodePooling.size</code><button data-href="#proxyqueryNodePoolingsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.queryNodePooling.size">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        размер клиентского пула shardleader(querynode)      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyhttpenabled" class="common-anchor-header"><code translate="no">proxy.http.enabled</code><button data-href="#proxyhttpenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.http.enabled">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Включать ли http-сервер      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyhttpdebugmode" class="common-anchor-header"><code translate="no">proxy.http.debug_mode</code><button data-href="#proxyhttpdebugmode" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.http.debug_mode">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Включать ли режим отладки http-сервера      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyhttpport" class="common-anchor-header"><code translate="no">proxy.http.port</code><button data-href="#proxyhttpport" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.http.port">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        высокоуровневый restful api   </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="proxyhttpacceptTypeAllowInt64" class="common-anchor-header"><code translate="no">proxy.http.acceptTypeAllowInt64</code><button data-href="#proxyhttpacceptTypeAllowInt64" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.http.acceptTypeAllowInt64">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        высокоуровневый restful api, может ли http-клиент иметь дело с int64     </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyhttpenablePprof" class="common-anchor-header"><code translate="no">proxy.http.enablePprof</code><button data-href="#proxyhttpenablePprof" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.http.enablePprof">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Включать ли промежуточное ПО pprof на порту метрики      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="proxyip" class="common-anchor-header"><code translate="no">proxy.ip</code><button data-href="#proxyip" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.ip">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP-адрес прокси-сервера. Если не указан, используется первый одноадресный адрес      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="proxyport" class="common-anchor-header"><code translate="no">proxy.port</code><button data-href="#proxyport" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.port">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP-порт прокси      </td>
      <td>19530</td>
    </tr>
  </tbody>
</table>
<h2 id="proxygrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">proxy.grpc.serverMaxSendSize</code><button data-href="#proxygrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который может отправить прокси, единица измерения: байт      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="proxygrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">proxy.grpc.serverMaxRecvSize</code><button data-href="#proxygrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который может получить прокси, единица измерения: байт      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
<h2 id="proxygrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">proxy.grpc.clientMaxSendSize</code><button data-href="#proxygrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который могут отправлять клиенты на прокси, единица измерения: байт      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="proxygrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">proxy.grpc.clientMaxRecvSize</code><button data-href="#proxygrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="proxy.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Максимальный размер каждого RPC-запроса, который могут получить клиенты на прокси, единица измерения: байт      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
