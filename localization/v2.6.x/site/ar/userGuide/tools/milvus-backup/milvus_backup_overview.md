---
id: milvus_backup_overview.md
summary: Milvus-Backup هي أداة تسمح للمستخدمين بالنسخ الاحتياطي واستعادة بيانات Milvus.
title: ميلفوس النسخ الاحتياطي
---
<h1 id="Milvus-Backup" class="common-anchor-header">ميلفوس النسخ الاحتياطي<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup هي أداة تسمح للمستخدمين بالنسخ الاحتياطي واستعادة بيانات Milvus. وهي توفر كلاً من واجهة برمجة التطبيقات CLI وواجهة برمجة التطبيقات API لتتناسب مع سيناريوهات التطبيقات المختلفة.</p>
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
    </button></h2><p>قبل البدء باستخدام Milvus Backup، تأكد من أن</p>
<ul>
<li>نظام التشغيل هو CentOS 7.5+ أو Ubuntu LTS 18.04+,</li>
<li>إصدار Go هو 1.20.2 أو أحدث.</li>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" />
   </span> <span class="img-wrapper"> <span>بنية ميلفوس للنسخ الاحتياطي</span> </span></p>
<p>تسهّل Milvus Backup النسخ الاحتياطي واستعادة البيانات الوصفية والمقاطع والبيانات عبر مثيلات Milvus. ويوفر واجهات متجهة للشمال، مثل واجهة برمجة التطبيقات وواجهة برمجة التطبيقات ووحدة Go المستندة إلى gRPC، من أجل معالجة مرنة لعمليات النسخ الاحتياطي والاستعادة.</p>
<p>يقرأ Milvus Backup البيانات الوصفية للمجموعة والمقاطع من مثيل Milvus المصدر لإنشاء نسخة احتياطية. ثم يقوم بنسخ بيانات المجموعة من المسار الجذر لمثيل Milvus المصدر ويحفظ البيانات المنسوخة في المسار الجذر للنسخ الاحتياطي.</p>
<p>للاستعادة من نسخة احتياطية، ينشئ Milvus Backup مجموعة جديدة في مثيل Milvus الهدف استنادًا إلى بيانات تعريف المجموعة ومعلومات المقطع في النسخة الاحتياطية. ثم ينسخ بيانات النسخة الاحتياطية من المسار الجذر للنسخة الاحتياطية إلى المسار الجذر للمثيل الهدف.</p>
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.4.15">v0.4.15</a></li>
</ul>
