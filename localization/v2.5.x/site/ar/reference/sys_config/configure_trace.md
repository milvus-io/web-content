---
id: configure_trace.md
related_key: configure
group: system_configuration.md
summary: تعرف على كيفية تكوين التتبع لـ Milvus.
---
<h1 id="trace-related-Configurations" class="common-anchor-header">التكوينات المتعلقة بالتتبع<button data-href="#trace-related-Configurations" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>نوع مصدر التتبع، الافتراضي هو stdout,</li>      
        <li>قيم اختيارية: ['noop'، 'stdout'، 'stdout'، 'jaeger'، 'otlp']</li>      </td>
      <td>نوب</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>جزء من أداة أخذ العينات المستندة إلى معرف التتبع,</li>      
        <li>قيم اختيارية: [0, 1]</li>      
        <li>الكسور &gt;= 1 سيتم أخذ عينات دائمًا. يتم التعامل مع الكسور &lt;0 على أنها صفر.</li>      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        عندما يكون المصدر هو jaeger يجب تعيين عنوان URL الخاص بـ jaeger      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        مثال "127.0.0.0.1:4317" لـ grpc، "127.0.0.0.1:4318" لـ http    </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        طريقة تصدير otlp، القيم المقبولة: ["grpc"، "http"]، باستخدام "grpc" افتراضيًا      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        مهلة تهيئة segcore بالثواني، مما يمنع توقف otlp grpc إلى الأبد      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
