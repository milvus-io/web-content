---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  تحقق من توفر حزمة RPM/DEB واختر إحدى طرق التثبيت المدعومة لـ Milvus
  Standalone.
title: تثبيت Milvus Standalone باستخدام حزمة RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">تثبيت Milvus Standalone باستخدام حزمة RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>تشرح هذه الصفحة توفر الحزم الخاصة بـ Milvus Standalone وتقدم روابط لطرق التثبيت باستخدام موارد الإصدار المنشورة.</p>
<h2 id="Check-package-availability" class="common-anchor-header">التحقق من توفر الحزم<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>تنشر إصدارات Milvus 3.0.x، بما في ذلك <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">الإصدار v3.0.5</a>، ملفات تكوين Docker Compose ولكنها لا تنشر حزم RPM أو DEB. لا تقم بإنشاء عناوين URL لتنزيل حزم RPM أو DEB لهذه الإصدارات؛ فاسم ملف الحزمة في أمر التنزيل لا يجعل هذا المورد متاحًا.</p>
<p>بالنسبة للإصدارات الأخرى، تحقق من قسم <strong>«الموارد»</strong> في <a href="https://github.com/milvus-io/milvus/releases">صفحة إصدار Milvus</a> قبل اختيار طريقة تثبيت الحزمة. استخدم فقط الحزمة المدرجة فعليًا لهذا الإصدار وبنية نظامك.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">تثبيت Milvus Standalone باستخدام Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة للإصدار v3.0.5، اختر إحدى طرق التثبيت التالية:</p>
<ul>
<li><a href="/docs/ar/install_standalone-docker-compose.md">قم بتشغيل Milvus باستخدام Docker Compose (Linux)</a> لاستخدام تكوين Compose المنشور مع الإصدار v3.0.5.</li>
<li><a href="/docs/ar/install_standalone-docker.md">قم بتشغيل Milvus في Docker (Linux)</a> لاستخدام البرنامج النصي للتثبيت المستقل. تحقق من علامة الصورة في البرنامج النصي قبل تشغيله.</li>
<li><a href="/docs/ar/install_standalone-windows.md">قم بتشغيل Milvus في Docker (Windows)</a> لاستخدام Docker Desktop مع الخلفية WSL 2 وحاويات Linux.</li>
</ul>
<p>تحقق من <a href="/docs/ar/prerequisite-docker.md">متطلبات الأجهزة والبرامج</a> قبل التثبيت. بعد تشغيل المثيل، اتبع مسار <strong>«استخدام خادم Milvus موجود</strong> » في <a href="/docs/ar/quickstart.md">«البدء السريع</a>»، والاتصال بـ <code translate="no">http://localhost:19530</code> بدلاً من مسار <code translate="no">.db</code> المحلي، لإدخال البيانات وإجراء البحث.</p>
