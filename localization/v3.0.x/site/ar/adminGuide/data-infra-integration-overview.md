---
id: data-infra-integration-overview.md
title: البنية التحتية للبيانات والتكامل
summary: >-
  نظرة عامة على البنية التحتية التابعة لأطراف ثالثة التي يتكامل معها Milvus —
  البيانات الوصفية، وتخزين الكائنات، وقوائم انتظار الرسائل.
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">البنية التحتية للبيانات والتكامل<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>يعتمد Milvus على بنية تحتية مفتوحة للبيانات لتلبية احتياجاته الأساسية. يتناول هذا الفصل المكونات التي يمكنك توصيلها وتهيئتها:</p>
<ul>
<li><strong><a href="/docs/ar/etcd.md">البيانات الوصفية</a></strong> — يخزن Milvus البيانات الوصفية (مخططات المجموعات، وحالة العقد، ونقاط فحص الاستهلاك) في etcd.</li>
<li><strong><a href="/docs/ar/object-storage.md">تخزين الكائنات</a></strong> — يخزن Milvus ملفات الفهرس والسجلات الثنائية في MinIO أو AWS S3 أو أي نظام تخزين كائنات سحابي آخر متوافق مع S3.</li>
<li><strong><a href="/docs/ar/mqtype-overview.md">قائمة انتظار الرسائل</a></strong> — يستخدم Milvus سجل الكتابة المسبقة (WAL): Woodpecker (الافتراضي)، أو Pulsar، أو Kafka، أو RocksMQ.</li>
</ul>
<p>بشكل افتراضي، يعمل النشر الجديد لـ Milvus 3.x باستخدام <strong>Woodpecker</strong> كقائمة انتظار الرسائل، <strong>وetcd</strong> للبيانات الوصفية، <strong>وMinIO</strong> لتخزين الكائنات — دون الحاجة إلى بنية تحتية إضافية للمراسلة.</p>
