---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: تعرف على الاستعدادات اللازمة قبل تثبيت Milvus Standalone.
title: متطلبات تثبيت Milvus Standalone
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">متطلبات تثبيت Milvus Standalone<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>قبل تثبيت مثيل Milvus Standalone، تحقق من الأجهزة والبرامج لديك لمعرفة ما إذا كانت تستوفي المتطلبات.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">متطلبات الأجهزة<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table>
<thead>
<tr><th>المكون</th><th>المتطلب</th><th>التوصية</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>وحدة المعالجة المركزية</td><td><ul><li>معالج Intel Core من الجيل الثاني أو أحدث</li><li>Apple Silicon</li></ul></td><td><ul><li>مستقل: 4 نوى أو أكثر</li><li>المجموعة: 8 نوى أو أكثر</li></ul></td><td></td></tr>
<tr><td>مجموعة تعليمات وحدة المعالجة المركزية</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>يتطلب البحث عن التشابه بين المتجهات وإنشاء الفهرس داخل Milvus دعم وحدة المعالجة المركزية (CPU) لمجموعات امتدادات التعليمات الفردية والبيانات المتعددة (SIMD). تأكد من أن وحدة المعالجة المركزية تدعم واحدًا على الأقل من امتدادات SIMD المذكورة. راجع <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">وحدات المعالجة المركزية المزودة بـ AVX</a> لمزيد من المعلومات.</td></tr>
<tr><td>ذاكرة الوصول العشوائي (RAM)</td><td><ul><li>نظام مستقل: 8G</li><li>المجموعة: 32G</li></ul></td><td><ul><li>جهاز مستقل: 16G</li><li>المجموعة: 128G</li></ul></td><td>يعتمد حجم ذاكرة الوصول العشوائي (RAM) على حجم البيانات.</td></tr>
<tr><td>محرك الأقراص الثابتة</td><td>محرك أقراص SSD SATA 3.0 أو أعلى</td><td>محرك أقراص SSD من نوع NVMe أو أعلى</td><td>يعتمد حجم القرص الصلب على حجم البيانات.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">متطلبات البرامج<button data-href="#Software-requirements" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table>
<thead>
<tr><th>نظام التشغيل</th><th>البرامج</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 أو أحدث</td><td>Docker Desktop</td><td>اضبط الجهاز الظاهري (VM) لـ Docker بحيث يستخدم ما لا يقل عن 2 وحدة معالجة مركزية افتراضية (vCPU) وذاكرة أولية تبلغ 8 جيجابايت. وإلا، فقد يفشل التثبيت. <br/>انظر <a href="https://docs.docker.com/desktop/mac/install/">تثبيت Docker Desktop على Mac</a> لمزيد من المعلومات.</td></tr>
<tr><td>أنظمة Linux</td><td><ul><li>Docker 19.03 أو أحدث</li><li>Docker Compose 1.25.1 أو أحدث</li></ul></td><td>انظر <a href="https://docs.docker.com/engine/install/">تثبيت محرك دوكر</a> <a href="https://docs.docker.com/compose/install/">وتثبيت دوكر كومبوز</a> لمزيد من المعلومات.</td></tr>
<tr><td>نظام Windows مع تمكين WSL 2</td><td>Docker Desktop</td><td>نوصي بتخزين شفرة المصدر والبيانات الأخرى المربوطة في حاويات Linux في نظام ملفات Linux بدلاً من نظام ملفات Windows.<br/>انظر <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">تثبيت Docker Desktop على Windows مع WSL 2 كخلفية</a> لمزيد من المعلومات.</td></tr>
</tbody>
</table>
<p>سيتم الحصول على التبعيات التالية وتكوينها تلقائيًا عند تثبيت Milvus Standalone باستخدام البرنامج النصي لـ Docker أو تكوين Docker Compose:</p>
<table>
<thead>
<tr><th>البرامج</th><th>الإصدار</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>انظر <a href="#Additional-disk-requirements">متطلبات القرص الإضافية</a>.</td></tr>
<tr><td>MinIO</td><td>الإصدار 2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>مُضمّن مع Milvus</td><td>قائمة انتظار الرسائل الافتراضية (مضمنة)؛ لا توجد خدمة منفصلة لتثبيتها.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>اختياري — فقط إذا قمت بتحويل قائمة انتظار الرسائل إلى Pulsar؛ غير مثبت بشكل افتراضي.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">متطلبات القرص الإضافية<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><p>يعد أداء القرص أمرًا بالغ الأهمية لـ etcd. يوصى بشدة باستخدام محركات أقراص SSD NVMe محلية. قد تؤدي استجابة القرص البطيئة إلى إجراء انتخابات متكررة للمجموعة، مما يؤدي في النهاية إلى تدهور خدمة etcd.</p>
<p>لاختبار ما إذا كان القرص الخاص بك مؤهلاً، استخدم <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>من الناحية المثالية، يجب أن يصل القرص المخصص لـ etcd إلى أكثر من 500 IOPS وأن يكون زمن انتقال fsync في المئوية 99 أقل من 10 مللي ثانية. اقرأ <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">وثائق</a> etcd للحصول على متطلبات أكثر تفصيلاً.</p>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>إذا كانت الأجهزة والبرامج لديك تستوفي المتطلبات المذكورة أعلاه، فيمكنك</p>
<ul>
<li><a href="/docs/ar/install_standalone-docker.md">تشغيل Milvus في Docker</a></li>
<li><a href="/docs/ar/install_standalone-docker-compose.md">تشغيل Milvus باستخدام Docker Compose</a></li>
</ul>
