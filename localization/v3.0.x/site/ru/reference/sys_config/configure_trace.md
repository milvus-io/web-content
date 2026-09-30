---
id: configure_trace.md
related_key: configure
group: system_configuration.md
summary: 'Узнайте, как настроить трассировку для Milvus.'
---
<h1 id="trace-related-Configurations" class="common-anchor-header">Конфигурации, связанные с трассировкой<button data-href="#trace-related-Configurations" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><h2 id="traceexporter" class="common-anchor-header"><code translate="no">trace.exporter</code><button data-href="#traceexporter" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table id="trace.exporter">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>тип экспортера трассировки, по умолчанию - stdout,</li>      
        <li>необязательные значения: ['noop','stdout','jaeger','otlp'].</li>      </td>
      <td>noop</td>
    </tr>
  </tbody>
</table>
<h2 id="tracesampleFraction" class="common-anchor-header"><code translate="no">trace.sampleFraction</code><button data-href="#tracesampleFraction" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table id="trace.sampleFraction">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>доля пробоотборника, основанного на traceID,</li>      
        <li>необязательные значения: [0, 1]</li>      
        <li>Фракции &gt;= 1 всегда будут отбираться. Фракции &lt; 0 рассматриваются как нулевые.</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<h2 id="tracejaegerurl" class="common-anchor-header"><code translate="no">trace.jaeger.url</code><button data-href="#tracejaegerurl" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table id="trace.jaeger.url">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        когда экспортером является jaeger, должен установить URL jaeger'а      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="traceotlpendpoint" class="common-anchor-header"><code translate="no">trace.otlp.endpoint</code><button data-href="#traceotlpendpoint" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table id="trace.otlp.endpoint">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        пример: "127.0.0.1:4317" для grpc, "127.0.0.1:4318" для http    </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="traceotlpmethod" class="common-anchor-header"><code translate="no">trace.otlp.method</code><button data-href="#traceotlpmethod" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table id="trace.otlp.method">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Метод экспорта otlp, допустимые значения: ["grpc", "http"], по умолчанию используется "grpc".      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="traceinitTimeoutSeconds" class="common-anchor-header"><code translate="no">trace.initTimeoutSeconds</code><button data-href="#traceinitTimeoutSeconds" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table id="trace.initTimeoutSeconds">
  <thead>
    <tr>
      <th class="width80">Описание</th>
      <th class="width20">Значение по умолчанию</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        таймаут инициализации segcore в секундах, предотвращающий вечное зависание otlp grpc    </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
