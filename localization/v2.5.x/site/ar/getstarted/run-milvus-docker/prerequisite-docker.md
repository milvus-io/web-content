---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: تعرف على الاستعدادات اللازمة قبل تثبيت Milvus مع Docker Compose.
title: متطلبات تثبيت Milvus باستخدام Docker Compose
---

<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">متطلبات تثبيت Milvus باستخدام Docker Compose<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>قبل تثبيت مثيل Milvus، تحقق من أجهزتك وبرامجك لمعرفة ما إذا كانت تفي بالمتطلبات.</p>
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
<tr><th>المكوّن</th><th>المتطلبات</th><th>التوصية</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>وحدة المعالجة المركزية</td><td><ul><li>وحدة معالجة مركزية Intel من الجيل الثاني أو أعلى</li><li>أبل سيليكون</li></ul></td><td><ul><li>مستقل: 4 نواة أو أكثر</li><li>عنقودي: 8 نواة أو أكثر</li></ul></td><td></td></tr>
<tr><td>مجموعة تعليمات وحدة المعالجة المركزية</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>يتطلب البحث عن تشابه المتجهات وبناء الفهرس داخل Milvus دعم وحدة المعالجة المركزية لمجموعات امتدادات التعليمات الأحادية والبيانات المتعددة (SIMD). تأكد من أن وحدة المعالجة المركزية تدعم واحدة على الأقل من امتدادات SIMD المدرجة. راجع <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">وحدات المعالجة المركزية مع AVX</a> لمزيد من المعلومات.</td></tr>
<tr><td>ذاكرة الوصول العشوائي</td><td><ul><li>مستقل: 8G</li><li>المجموعة العنقودية: 32G</li></ul></td><td><ul><li>مستقل: 16G</li><li>الكتلة: 128G</li></ul></td><td>يعتمد حجم ذاكرة الوصول العشوائي على حجم البيانات.</td></tr>
<tr><td>القرص الصلب</td><td>SATA 3.0 SSD أو أعلى</td><td>NVMe SSD أو أعلى</td><td>يعتمد حجم القرص الصلب على حجم البيانات.</td></tr>
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
<tr><th>نظام التشغيل</th><th>البرمجيات</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 أو أحدث</td><td>سطح مكتب Docker</td><td>اضبط جهاز Docker الظاهري (VM) على استخدام وحدتي معالجة مركزية افتراضية (vCPUs) وذاكرة أولية بسعة 8 جيجابايت على الأقل. وإلا فقد يفشل التثبيت. <br/>راجع <a href="https://docs.docker.com/desktop/mac/install/">تثبيت Docker Desktop على نظام Mac</a> لمزيد من المعلومات.</td></tr>
<tr><td>منصات لينكس</td><td><ul><li>Docker 19.03 أو أحدث</li><li>Docker Compose 1.25.1 أو أحدث</li></ul></td><td>راجع <a href="https://docs.docker.com/engine/install/">تثبيت محرك Docker Engine</a> <a href="https://docs.docker.com/compose/install/">وتثبيت Docker Compose</a> لمزيد من المعلومات.</td></tr>
<tr><td>ويندوز مع تمكين WSL 2</td><td>سطح مكتب Docker</td><td>نوصيك بتخزين التعليمات البرمجية المصدرية والبيانات الأخرى المثبتة في حاويات لينكس في نظام ملفات لينكس بدلاً من نظام ملفات ويندوز.<br/>راجع <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">تثبيت Docker Desktop على ويندوز مع الواجهة الخلفية WSL 2</a> لمزيد من المعلومات.</td></tr>
</tbody>
</table>
<p>سيتم الحصول على التبعيات التالية وتهيئتها تلقائيًا عند تثبيت Milvus Standalone باستخدام البرنامج النصي Docker، أو تكوين Docker Compose:</p>
<table>
<thead>
<tr><th>البرنامج</th><th>الإصدار</th><th>ملاحظة</th></tr>
</thead>
<tbody>
<tr><td>إلخd</td><td>3.5.0</td><td>انظر <a href="#Additional-disk-requirements">متطلبات القرص الإضافية</a>.</td></tr>
<tr><td>مينيو</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>بولسار</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">متطلبات القرص الإضافية</h3><p>أداء القرص أمر بالغ الأهمية لـ etcd. يوصى بشدة استخدام أقراص NVMe SSD المحلية. قد تتسبب الاستجابة الأبطأ للقرص في إجراء انتخابات متكررة للمجموعة مما سيؤدي في النهاية إلى تدهور خدمة إلخd.</p>
<p>لاختبار ما إذا كان قرصك مؤهلاً، استخدم <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>من الناحية المثالية، يجب أن يصل قرصك المخصص لـ etcd إلى أكثر من 500 IOPS وأقل من 10 مللي ثانية لنسبة 99% من زمن استجابة المزامنة. اقرأ <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">مستندات</a> etcd لمزيد من المتطلبات التفصيلية.</p>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>إذا كانت أجهزتك وبرامجك تستوفي المتطلبات المذكورة أعلاه، يمكنك</p>
<ul>
<li><a href="/docs/ar/v2.5.x/install_standalone-docker.md">تشغيل Milvus في Docker</a></li>
<li><a href="/docs/ar/v2.5.x/install_standalone-docker-compose.md">تشغيل Milvus باستخدام Docker Compose</a></li>
</ul>
