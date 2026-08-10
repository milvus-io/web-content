---
id: storage-v3.md
title: التخزين V3Compatible with Milvus 3.0.x
summary: >-
  تعرف على ميزات Milvus 3.0 التي تتطلب استخدام Storage V3، وكيفية تفعيلها،
  والقيود المتعلقة بالتوافق التي تنطبق عليها.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">التخزين V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>غالبًا ما تتطور مجموعات بيانات الذكاء الاصطناعي بعد إنشاء المجموعة. مع تغير النماذج وسير العمل، قد تحتاج الفرق إلى إضافة نص، أو إنشاء حقول متجهة جديدة للكيانات الموجودة، أو استخدام البيانات المخزنة خارج Milvus. يتطلب دعم سير العمل هذا نموذج تخزين يمكنه التطور مع مجموعة البيانات.</p>
<p>يوفر التخزين V3 هذا النموذج في Milvus 3.0. ويستخدم تخطيط تخزين مُصنف حسب الإصدار لدمج البيانات المضافة أو المعاد كتابتها بمرور الوقت، بينما تستمر التطبيقات في الوصول إلى المجموعات من خلال نفس واجهات برمجة تطبيقات Milvus.</p>
<p>يتم تعطيل التخزين V3 افتراضيًا. بعد تفعيل « <code translate="no">common.storage.useLoonFFI</code> »، تستخدم عمليات الكتابة الجديدة ومخرجات الضغط التخزين V3. تظل البيانات الموجودة في تخطيطها الحالي حتى تتم إعادة كتابة البيانات المؤهلة بواسطة عملية الضغط في الخلفية. يمكن لـ Milvus قراءة كلا التخطيطين خلال هذه المرحلة الانتقالية. قم بتمكين التخزين V3 لاستخدام الميزات التي تعتمد عليه، وليس كتحسين عام للأداء.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">تنسيقات البيانات في التخزين V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم التخزين V3 قوائم البيانات لوصف بيانات المجموعة بشكل مستقل عن تنسيق البيانات الأساسي. وهذا يتيح لطبقة التخزين نفسها العمل مع كل من البيانات التي يديرها Milvus والبيانات التي تظل في نظام خارجي.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">تنسيقات ملفات المجموعات المُدارة<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للمجموعات المُدارة، يختار « <code translate="no">dataNode.storage.format</code> » تنسيق الملف لبيانات «Storage V3» الجديدة. يدعم هذا الإعداد القيم التالية:</p>
<table>
<thead>
<tr><th>التنسيق</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>تنسيق الملفات العمودي الافتراضي والمعتمد على نطاق واسع، والذي يتميز بتوافق واسع مع النظام البيئي وأدوات ناضجة. ينظم Parquet البيانات في مجموعات صفوف ويدعم الترميز والضغط لكل عمود، مما يسمح لـ Milvus بقراءة الأعمدة المطلوبة فقط ومعالجة عمليات المسح التسلسلي الكبيرة بكفاءة.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>تنسيق ملف عمودي اختياري من الجيل التالي مبني على ترميزات قابلة للتوسيع والتركيب وإحصائيات غنية. في Milvus، يدعم Vortex إسقاط الأعمدة وقراءات النطاق وقراءات الوصول العشوائي. يمكن لهذه القدرات تقليل عمليات قراءة البيانات غير الضرورية لأحمال العمل المناسبة.</td></tr>
</tbody>
</table>
<p>يؤثر تغيير <code translate="no">dataNode.storage.format</code> على عمليات الكتابة الجديدة في Storage V3. تحتفظ الملفات الموجودة بتنسيقها الحالي حتى يعيد الضغط كتابة المقاطع المقابلة. يجب أن تحتفظ معظم عمليات النشر بتنسيق <code translate="no">parquet</code> الافتراضي ما لم تُظهر معايير الأداء التمثيلية أن <code translate="no">vortex</code> يناسب بياناتها وأنماط الوصول بشكل أفضل.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">المجموعات الخارجية وتنسيقات المصادر المدعومة<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>تسمح المجموعات الخارجية لـ Milvus باستخدام البيانات المخزنة في ملفات أو جداول خارجية. يدعم التخزين V3 تنسيقات المصادر الخارجية التالية:</p>
<table>
<thead>
<tr><th>التنسيق</th><th>الفئة</th><th>المصدر المتوقع</th><th>دعم Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>تنسيق الملف</td><td>دليل أو بادئة تخزين كائنات تحتوي على ملفات Parquet.</td><td>يكتشف الملفات، ويقرأ بياناتها الوصفية ومجموعات الصفوف، ويسجلها في بيان Storage V3.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>تنسيق الملف</td><td>دليل أو بادئة تخزين كائنات تحتوي على ملفات Vortex.</td><td>يكتشف الملفات ويستخدم تخطيط Vortex وإحصاءاته من أجل الإسقاط وقراءات النطاق وقراءات الوصول العشوائي.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>تنسيق الجدول</td><td>دليل مجموعة بيانات Lance.</td><td>يقرأ بيانات تعريف مجموعة البيانات ويقوم بتعيين أجزائها في بيان Storage V3.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>تنسيق الجدول</td><td>ملف JSON لبيانات تعريف Iceberg ومعرف اللقطة.</td><td>يحلل اللقطة المحددة، ويخطط ملفات بياناتها، ويحافظ على بيانات التعريف الخاصة بحذف المواقع. لا يتم دعم عمليات الحذف بالتساوي ويجب تحويلها إلى عمليات حذف المواقع قبل تحديث المجموعة الخارجية.</td></tr>
</tbody>
</table>
<p>المصادر الخارجية مخصصة للقراءة فقط. يقوم Storage V3 بإنشاء وتحديث ملف البيانات الخاص به دون تعديل أو نسخ البيانات المصدرية. يمكن لـ Milvus بعد ذلك إنشاء فهارس وإجراء عمليات بحث واستعلامات على البيانات من خلال مجموعة خارجية.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">التخزين السحابي والمصادقة عبر الحسابات</h4><p>يصف الجدول التالي فقط كيفية وصول المجموعة الخارجية إلى البيانات المصدر المخزنة في حساب سحابي آخر. ولا يصف التخزين الكائني المستخدم للبيانات التي تديرها Milvus.</p>
<table>
<thead>
<tr><th>التخزين السحابي</th><th>التنسيقات الخارجية المدعومة</th><th>المصادقة عبر الحسابات للمجموعات الخارجية</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>جميع التنسيقات الأربعة المذكورة أعلاه.</td><td>حدد معرّف دور IAM (ARN) المملوك للعميل. يستخدم Storage V3 خدمة AWS STS <code translate="no">AssumeRole</code> للحصول على بيانات اعتماد مؤقتة وتجديدها حسب الحاجة. يمكنك أيضًا تقديم معرّف خارجي عندما تتطلب سياسة الثقة الخاصة بالدور ذلك.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>جميع التنسيقات الأربعة المذكورة أعلاه.</td><td>حدد حساب الخدمة المستهدف. يقوم Storage V3 بانتحال صفة حساب الخدمة هذا، ويستخدم رموز وصول OAuth قصيرة الأجل الخاصة به للوصول إلى الحاوية المصدر، ويقوم بتحديث الرموز قبل انتهاء صلاحيتها.</td></tr>
<tr><td>تخزين الكتل في Azure</td><td><code translate="no">parquet</code>، و <code translate="no">vortex</code> ، و <code translate="no">lance-table</code>. لا يتم دعم <code translate="no">iceberg-table</code>.</td><td>يطلب Milvus بيانات اعتماد SAS قصيرة الأجل من خلال خدمة gRPC الخاصة بـ <code translate="no">milvus-tools</code>. يستخدم Storage V3 بيانات اعتماد SAS للوصول إلى الحاوية المصدر، ويتم تجديد بيانات الاعتماد قبل انتهاء صلاحيتها.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>جميع التنسيقات الأربعة المذكورة أعلاه.</td><td>يطلب Milvus بيانات اعتماد SAS قصيرة الأجل من خلال خدمة gRPC الخاصة <code translate="no">milvus-tools</code>. يستخدم Storage V3 بيانات اعتماد SAS للوصول إلى الحاوية المصدر، ويتم تجديد بيانات الاعتماد قبل انتهاء صلاحيتها.</td></tr>
<tr><td>خدمة تخزين الكائنات من Alibaba Cloud (OSS)</td><td>جميع التنسيقات الأربعة المذكورة أعلاه.</td><td>حدد ARN لدور RAM المملوك للعميل. يتولى Storage V3 الدور باستخدام هوية حمل العمل الخاصة بوقت التشغيل أو دور RAM الخاص بـ ECS، ثم يستخدم بيانات اعتماد مؤقتة للوصول إلى الحاوية المصدر.</td></tr>
</tbody>
</table>
<p>للحصول على إرشادات تكوين المجموعة الخارجية واستخدامها، راجع <a href="/docs/ar/create-an-external-collection.md">إنشاء مجموعة خارجية</a>.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">الميزات التي تتطلب Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>الميزة</th><th>الوصف</th><th>التكوين المطلوب</th></tr>
</thead>
<tbody>
<tr><td>تنسيق ملف Vortex</td><td>كتابة بيانات المجموعة المُدارة الجديدة بتنسيق ملف Vortex.</td><td><ul><li><a href="/docs/ar/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/ar/text.md"><code translate="no">TEXT</code> الحقل</a></td><td>قم بتخزين النصوص المصدرية الطويلة، مثل المقاطع أو المستندات أو التذاكر أو السجلات، دون تعيين طول أقصى ثابت في مخطط المجموعة.</td><td><a href="/docs/ar/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/ar/add-fields-to-an-existing-collection.md">الحقول المتجهة التي تم إنشاؤها بواسطة الدالة</a></td><td>أضف دالة BM25 أو MinHash إلى مجموعة موجودة حتى يقوم Milvus بإنشاء حقل متجه جديد من حقل " <code translate="no">VARCHAR</code> " الموجود. يقوم Milvus بملء القيم التي تم إنشاؤها للكيانات الموجودة بشكل غير متزامن من خلال عملية الضغط في الخلفية.</td><td><ul><li><a href="/docs/ar/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/ar/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/ar/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/ar/create-an-external-collection.md">المجموعات الخارجية</a></td><td>استعلام البيانات المخزنة خارج Milvus دون نسخها إلى مجموعة مُدارة. قم بتحديث المجموعة الخارجية عند تغيير البيانات المصدرية. لعرض حقول مصدرية إضافية، راجع <a href="/docs/ar/alter-external-collection-schema.md">«تعديل مخطط المجموعة الخارجية</a>».</td><td><a href="/docs/ar/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">قبل تمكين Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>بمجرد أن يقوم Milvus بكتابة البيانات في Storage V3، لا يُدعم الرجوع إلى إصدار Milvus لا يمكنه قراءة Storage V3. ولا يؤدي تعطيل Storage V3 لاحقًا إلى تحويل جميع بيانات Storage V3 الموجودة على الفور أو استعادة التوافق مع الإصدار الأقدم.</p>
</div>
<p>قبل تمكين Storage V3، ضع في اعتبارك سلوك البيانات التالي:</p>
<ul>
<li>نظرًا لأن ميزة « <code translate="no">dataCoord.compaction.storageVersion.enabled</code> » (التضغط التلقائي) ممكّنة افتراضيًا، يمكن للبيانات الحالية المؤهلة الانتقال إلى «Storage V3» تدريجيًا من خلال عملية التضغط في الخلفية.</li>
<li>يؤدي تعطيل Storage V3 إلى تغيير إصدار التخزين المستهدف لعمليات الكتابة المستقبلية ومخرجات الضغط المؤهلة. ولا يؤدي ذلك إلى تحويل جميع بيانات Storage V3 الحالية بشكل متزامن أو جعل الرجوع إلى إصدار أقدم آمنًا.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">تمكين التخزين V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>اضبط " <code translate="no">common.storage.useLoonFFI</code> " على " <code translate="no">true</code> " في تكوين Milvus الخاص بك:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>يعامل Milvus هذا الإعداد على أنه قابل للتحديث. قم بتطبيق التغيير من خلال سير عمل تحديث التكوين الذي يدعمه النشر الخاص بك. لا يضمن تحرير ملف التكوين الثابت وحده أن النشر قيد التشغيل قد تلقى القيمة الجديدة.</p>
<p>إذا كنت تخطط لإضافة دالة (Function) وحقل متجه تم إنشاؤه إلى مجموعة موجودة، فقم أيضًا بتمكين إعدادَي الضغط المطلوبين لملء الفجوات في البيانات الموجودة:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتم إنشاء مخرجات الدالة للكيانات الموجودة بشكل غير متزامن من خلال الضغط في الخلفية. ولا يشير نجاح تحديث المخطط إلى اكتمال عملية ملء الفجوات لكل كيان موجود.</p>
<h2 id="Related-documentation" class="common-anchor-header">الوثائق ذات الصلة<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/ar/text.md">حقل النص</a></li>
<li><a href="/docs/ar/add-fields-to-an-existing-collection.md">تعديل مخطط المجموعة</a></li>
<li><a href="/docs/ar/create-an-external-collection.md">إنشاء مجموعة خارجية</a></li>
<li><a href="/docs/ar/install-overview.md">نظرة عامة على خيارات نشر Milvus</a></li>
<li><a href="/docs/ar/upgrade_milvus_standalone-helm.md">ترقية Milvus المستقل باستخدام مخطط Helm</a></li>
<li><a href="/docs/ar/upgrade_milvus_cluster-helm.md">ترقية مجموعة Milvus باستخدام مخطط Helm</a></li>
<li><a href="/docs/ar/configure_common.md">التكوينات المتعلقة بـ common</a></li>
<li><a href="/docs/ar/configure_datacoord.md">التكوينات المتعلقة بـ dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">لماذا أنشأنا Loon: محرك تخزين لبيانات الذكاء الاصطناعي التي لا تتوقف عن التغير</a> — خلفية هندسية حول دوافع التصميم وراء Storage V3.</li>
</ul>
