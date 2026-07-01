---
id: milvus_backup_overview.md
summary: >-
  Milvus-Backup هي أداة تتيح للمستخدمين إجراء النسخ الاحتياطي لبيانات Milvus
  واستعادتها.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup هي أداة تتيح للمستخدمين إجراء النسخ الاحتياطي لبيانات Milvus واستعادتها. وهي توفر كل من واجهة سطر الأوامر (CLI) وواجهة برمجة التطبيقات (API) لتتناسب مع سيناريوهات الاستخدام المختلفة.</p>
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
    </button></h2><p>قبل البدء في استخدام Milvus Backup، تأكد من</p>
<ul>
<li>أن نظام التشغيل هو CentOS 7.5+ أو Ubuntu LTS 18.04+،</li>
<li>أن يكون إصدار Go هو 1.20.2 أو أحدث.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">البنية<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" /> 
   <span>بنية Milvus Backup</span>
  
 </span></p>
<p>يسهل Milvus Backup عملية النسخ الاحتياطي والاستعادة للبيانات الوصفية والمقاطع والبيانات عبر مثيلات Milvus. ويوفر واجهات اتصال خارجية، مثل واجهة سطر الأوامر (CLI) وواجهة برمجة التطبيقات (API) ووحدة Go القائمة على gRPC، من أجل التعامل المرن مع عمليات النسخ الاحتياطي والاستعادة.</p>
<p>يقوم Milvus Backup بقراءة بيانات تعريف المجموعة والشرائح من مثيل Milvus المصدر لإنشاء نسخة احتياطية. ثم يقوم بنسخ بيانات المجموعة من المسار الجذري لمثيل Milvus المصدر وحفظ البيانات المنسوخة في المسار الجذري للنسخة الاحتياطية.</p>
<p>لاستعادة البيانات من النسخة الاحتياطية، يقوم Milvus Backup بإنشاء مجموعة جديدة في مثيل Milvus الهدف استنادًا إلى بيانات تعريف المجموعة ومعلومات المقاطع الموجودة في النسخة الاحتياطية. ثم يقوم بنسخ بيانات النسخة الاحتياطية من المسار الجذري للنسخة الاحتياطية إلى المسار الجذري للمثيل الهدف.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">مصفوفة التوافق<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي توافق عمليات النسخ الاحتياطي والاستعادة بين إصدارات Milvus المختلفة بدءًا من Milvus Backup v0.5.7.</p>
<table>
<thead>
<tr><th>النسخ الاحتياطي من ↓ / الاستعادة إلى →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus الإصدار 2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus الإصدار 2.2.x</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.3.x</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.4.x</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.5.x</td><td>لا</td><td>لا</td><td>لا</td><td>نعم</td><td>نعم</td></tr>
<tr><td>Milvus الإصدار 2.6.x</td><td>لا</td><td>لا</td><td>لا</td><td>لا</td><td>نعم</td></tr>
</tbody>
</table>
<h2 id="Latest-release" class="common-anchor-header">أحدث إصدار<button data-href="#Latest-release" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.10">v0.5.10</a></li>
</ul>
