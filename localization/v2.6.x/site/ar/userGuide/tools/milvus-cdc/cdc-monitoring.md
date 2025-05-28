---
id: cdc-monitoring.md
order: 4
summary: يوفر Milvus-CDC إمكانات مراقبة شاملة من خلال لوحات معلومات Grafana.
title: المراقبة
---
<h1 id="Monitoring" class="common-anchor-header">المراقبة<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر Milvus-CDC إمكانات مراقبة شاملة من خلال لوحات معلومات Grafana، مما يسمح لك بتصور المقاييس الرئيسية وضمان التشغيل السلس لمهام التقاط بيانات التغيير (CDC) وصحة الخادم.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">مقاييس مهام CDC</h3><p>للبدء، قم باستيراد ملف <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> إلى Grafana. سيؤدي ذلك إلى إضافة لوحة معلومات مصممة خصيصًا لمراقبة حالة مهام CDC.</p>
<p><strong>نظرة عامة على لوحة معلومات CDC Grafana Dashboard</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>لوحة القيادة milvus-cdc-dashboard</span> </span></p>
<p><strong>شرح المقاييس الرئيسية:</strong></p>
<ul>
<li><p><strong>المهمة</strong>: عدد مهام CDC في حالات مختلفة، بما في ذلك الحالات <strong>الأولية</strong> <strong>والجارية</strong> <strong>والمتوقفة مؤقتاً</strong>.</p></li>
<li><p><strong>إجمالي الطلبات</strong>: إجمالي عدد الطلبات التي استلمها مركز البيانات الميلفوس-سي دي سي.</p></li>
<li><p><strong>نجاح الطلب</strong>: عدد الطلبات الناجحة التي تم تلقيها بواسطة Milvus-CDC.</p></li>
<li><p><strong>عدد المهام</strong>: عدد المهام في الحالات <strong>الأولية</strong> <strong>والمتوقفة مؤقتاً</strong> <strong>والجارية</strong> بمرور الوقت.</p></li>
<li><p><strong>حالة المهمة</strong>: حالة المهام الفردية.</p></li>
<li><p><strong>عدد الطلبات</strong>: عدد الطلبات الناجحة وإجمالي الطلبات</p></li>
<li><p><strong>كمون الطلب</strong>: كمون الطلبات من خلال p99 والمتوسط والإحصائيات الأخرى.</p></li>
<li><p><strong>معدل بيانات النسخ المتماثل</strong>: معدل بيانات النسخ المتماثل لعمليات القراءة/الكتابة</p></li>
<li><p><strong>التأخر الزمني</strong> للنسخ<strong>المتماثل</strong>: التأخر الزمني للنسخ المتماثل لعمليات القراءة/الكتابة.</p></li>
<li><p><strong>عدد مرات تنفيذ واجهة برمجة التطبيقات</strong>: عدد المرات التي تم فيها تنفيذ واجهات برمجة تطبيقات Milvus-CDC المختلفة.</p></li>
<li><p><strong>مركز ts</strong>: الطابع الزمني لمهام القراءة/الكتابة.</p></li>
</ul>
