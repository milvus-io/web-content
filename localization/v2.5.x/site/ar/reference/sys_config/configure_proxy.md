---
id: configure_proxy.md
related_key: configure
group: system_configuration.md
summary: تعرف على كيفية تكوين الوكيل لـ Milvus.
---
<h1 id="proxy-related-Configurations" class="common-anchor-header">التكوينات المتعلقة بالوكيل<button data-href="#proxy-related-Configurations" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>تكوين متعلق بالوكيل، يُستخدم للتحقق من صحة طلبات العميل وتقليل النتائج التي يتم إرجاعها.</p>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الفاصل الزمني الذي يقوم فيه الوكيل بمزامنة علامة الوقت، الوحدة: مللي ثانية.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        مللي ثانية، الفاصل الزمني الذي يتم فيه التحقق من صحة المكون      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لعدد الرسائل التي يمكن تخزينها مؤقتاً في دفق رسائل timeTick للوكيل عند إنتاج الرسائل.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لطول الاسم أو الاسم المستعار الذي يمكن إنشاؤه في Milvus، بما في ذلك اسم المجموعة والاسم المستعار للمجموعة واسم القسم واسم الحقل.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لعدد الحقول التي يمكن إنشاؤها عند الإنشاء في مجموعة. يُنصح بشدة بتعيين maxFieldNum &gt;= 64.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لعدد الحقول المتجهة التي يمكن تحديدها في مجموعة. نطاق القيمة: [1, 10].      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لعدد القطع التي يمكن إنشاؤها عند الإنشاء في مجموعة.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لعدد أبعاد المتجه الذي يمكن أن يكون عند الإنشاء في مجموعة.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>سواء لإنتاج سجلات الجن.</li>      
        <li>يرجى الضبط في ميلفوس المضمنة: خطأ</li>      </td>
      <td>صواب</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        تخطي مسار url لسجل الجن      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لعدد المهام في قائمة انتظار المهام الخاصة بالوكيل.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        مفتاح تبديل لما إذا كان يجب على الوكيل استخدام مفتاح التقسيم للمجموعة      </td>
      <td>خطأ</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ما إذا كان يجب تمكين ميزة سجل الوصول.      </td>
      <td>خطأ</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ما إذا كان سيتم تحميل ملفات سجل الوصول المحلي إلى MinIO. يمكن تحديد هذه المعلمة عندما يكون proxy.accessLog.filename غير فارغ.      </td>
      <td>خطأ</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        مسار المجلد المحلي حيث يتم تخزين ملف سجل الوصول. يمكن تحديد هذه المعلمة عندما يكون proxy.accessLog.filename غير فارغ.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        اسم ملف سجل الوصول. إذا تركت هذه المعلمة فارغة، ستتم طباعة سجلات الوصول إلى stdout.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى للحجم المسموح به لملف سجل وصول واحد. إذا وصل حجم ملف السجل إلى هذا الحد، سيتم تشغيل عملية تدوير. تقوم هذه العملية بإغلاق ملف سجل الوصول الحالي وإنشاء ملف سجل جديد ومسح محتويات ملف السجل الأصلي. الوحدة: ميغابايت.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى للفاصل الزمني المسموح به لتدوير ملف سجل وصول واحد. عند الوصول إلى الفاصل الزمني المحدد، يتم تشغيل عملية تدوير، مما يؤدي إلى إنشاء ملف سجل وصول جديد وإغلاق الملف السابق. الوحدة: ثانية      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        مسار تخزين الكائن لتحميل ملفات سجل الوصول.      </td>
      <td>Access_log/</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الفاصل الزمني المسموح به لتحميل ملفات سجل الوصول. إذا تجاوز وقت تحميل ملف السجل هذا الفاصل الزمني، فسيتم حذف الملف. يؤدي تعيين القيمة إلى 0 إلى تعطيل هذه الميزة.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        حجم سجل ذاكرة التخزين المؤقت للكتابة، بالبايت. (إغلاق ذاكرة التخزين المؤقت للكتابة إذا كان الحجم 0)  </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الفاصل الزمني لذاكرة التخزين المؤقت للكتابة ذات التدفق التلقائي، بالثواني. (إغلاق التدفق التلقائي إذا كان الفاصل الزمني 0)  </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الوقت الفاصل الزمني (بالثواني) لمدير الاتصال لمسح معلومات العميل غير النشطة      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        مدة الفاصل الزمني لمعلومات العميل غير النشط، بالثواني      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لأرقام معلومات العميل التي يجب أن يديرها الوكيل، وتجنب الكثير من معلومات العميل      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ثانية. فرض إيقاف العقدة بدون توقف رشيق      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        يمكن اعتبار الاستعلام الذي يتجاوز زمن تنفيذه 'slowQuerySpanInSeconds' بطيئاً، بالثواني.      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        حجم تجمع عملاء shardleader(querynode)      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        سواء لتمكين خادم http    </td>
      <td>صواب</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ما إذا كان سيتم تمكين وضع تصحيح أخطاء خادم http    </td>
      <td>خطأ</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        واجهة برمجة تطبيقات مرنة عالية المستوى      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        واجهة برمجة تطبيقات مرنة عالية المستوى، ما إذا كان بإمكان عميل http التعامل مع int64     </td>
      <td>صحيح</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ما إذا كان تمكين البرنامج الوسيط pprof على منفذ المقاييس      </td>
      <td>صواب</td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        عنوان TCP/IP للوكيل. إذا لم يتم تحديده، استخدم أول عنوان أحادي الإرسال      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        منفذ TCP للوكيل      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لحجم كل طلب طلب بروتوكول معالجة طلبات الشراء (RPC) الذي يمكن للوكيل إرساله، الوحدة: بايت      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لحجم كل طلب استدعاء أوامر الشراء عن بُعد الذي يمكن للوكيل استقباله، الوحدة: بايت      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لحجم كل طلب طلب استدعاء أوامر الشراء عن بُعد الذي يمكن للعملاء على الوكيل إرساله، الوحدة: بايت      </td>
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
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لحجم كل طلب طلب استدعاء أوامر الشراء عن بُعد (RPC) الذي يمكن للعملاء على الوكيل تلقيه، الوحدة: بايت      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
