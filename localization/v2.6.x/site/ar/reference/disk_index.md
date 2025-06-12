---
id: disk_index.md
related_key: disk_index
summary: آلية فهرسة الأقراص في Milvus للبحث المتجه المحسّن على القرص.
title: الفهرسة على القرص
---
<h1 id="On-disk-Index" class="common-anchor-header">الفهرسة على القرص<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>تقدم هذه المقالة خوارزمية الفهرسة على القرص DiskANN، وهي خوارزمية فهرسة على القرص لعمليات البحث المتجهة المحسّنة على القرص. استنادًا إلى الرسوم البيانية Vamana، يعمل DiskANN على تشغيل عمليات بحث متجهية فعالة على القرص ضمن مجموعات البيانات الكبيرة.</p>
<p>لتحسين أداء الاستعلام، يمكنك <a href="/docs/ar/index-vector-fields.md">تحديد نوع فهرس</a> لكل حقل متجه.</p>
<div class="alert note"> 
يدعم الحقل المتجه حاليًا نوع فهرس واحد فقط. يقوم Milvus تلقائيًا بحذف الفهرس القديم عند تبديل نوع الفهرس.</div>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>لاستخدام DiskANN في ملفوس، لاحظ ما يلي</p>
<ul>
<li>يعمل مثيل Milvus على Ubuntu 18.04.6 أو إصدار أحدث.</li>
<li>يجب تثبيت مسار بيانات Milvus على محرك أقراص NVMe SSD للحصول على أداء كامل:<ul>
<li>بالنسبة لمثيل Milvus Standalone، يجب أن يكون مسار البيانات هو <strong>/var/lib/milvus/data</strong> في الحاوية التي يعمل فيها المثيل.</li>
<li>بالنسبة إلى مثيل Milvus Cluster، يجب أن يكون مسار البيانات <strong>/var/lib/milvus/data</strong> في الحاويات التي يتم فيها تشغيل QueryNodes و IndexNodes.</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>لاستخدام DiskANN، تأكد من أنك</p>
<ul>
<li>استخدم فقط المتجهات العائمة ذات الأبعاد 1 على الأقل في بياناتك.</li>
<li>استخدم فقط المسافة الإقليدية (L2) أو الضرب الداخلي (IP) أو COSINE لقياس المسافة بين المتجهات.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">إعدادات الفهرس والبحث<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><p>معلمات بناء الفهرس</p>
<p>عند إنشاء فهرس DiskANN، استخدم <code translate="no">DISKANN</code> كنوع الفهرس. لا توجد معلمات فهرس ضرورية.</p></li>
<li><p>معلمات البحث</p>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>النطاق</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>حجم القائمة المرشحة، الحجم الأكبر يوفر معدل استرجاع أعلى مع أداء متدهور.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">تكوينات ميلفوس ذات الصلة بـ DiskANN<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>DiskANN قابل للضبط. يمكنك تعديل المعلمات المتعلقة بـ DiskANN في <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> لتحسين أدائه.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>المعلمة</th><th>الوصف</th><th>نطاق القيمة</th><th>القيمة الافتراضية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>الدرجة القصوى للرسم البياني لفامانا. <br/> توفر القيمة الأكبر معدل استرجاع أعلى ولكنها تزيد من حجم الفهرس والوقت اللازم لبناء الفهرس.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>حجم القائمة المرشحة. <br/> تزيد القيمة الأكبر من الوقت المستغرق في بناء الفهرس ولكنها توفر معدل استدعاء أعلى. <br/> اضبطه على قيمة أصغر من <code translate="no">MaxDegree</code> إلا إذا كنت بحاجة إلى تقليل وقت بناء الفهرس.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>الحد الأقصى لحجم رمز PQ. <br/> توفر القيمة الأكبر معدل استدعاء أعلى ولكنها تزيد من استخدام الذاكرة.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>نسبة أرقام العقد المخزنة مؤقتاً إلى البيانات الأولية. <br/> تؤدي القيمة الأكبر إلى تحسين أداء بناء الفهرس مع زيادة استخدام الذاكرة.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>النسبة بين الحد الأقصى لعدد طلبات الإدخال والإخراج لكل تكرار بحث ورقم وحدة المعالجة المركزية.</td><td>[1، الحد الأقصى (128 / رقم وحدة المعالجة المركزية، 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">استكشاف الأخطاء وإصلاحها<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><p>كيفية التعامل مع الخطأ <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code> ؟</p>
<p>يوفر Linux kernel ميزة الإدخال/الإخراج غير المتزامن غير المحظور (AIO) التي تسمح للعملية ببدء عمليات إدخال/إخراج متعددة في وقت واحد دون الحاجة إلى انتظار اكتمال أي منها. يساعد ذلك في تعزيز الأداء للتطبيقات التي يمكن أن تتداخل فيها المعالجة مع الإدخال/الإخراج.</p>
<p>يمكن ضبط الأداء باستخدام الملف الظاهري <code translate="no">/proc/sys/fs/aio-max-nr</code> في نظام الملفات proc. تحدد المعلمة <code translate="no">aio-max-nr</code> الحد الأقصى لعدد الطلبات المتزامنة المسموح بها.</p>
<p>يتم تعيين <code translate="no">aio-max-nr</code> افتراضيًا على <code translate="no">65535</code> ، ويمكنك ضبطه حتى <code translate="no">10485760</code>.</p></li>
</ul>
