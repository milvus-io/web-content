---
id: snapshots.md
title: اللقطاتCompatible with Milvus 3.0.x
summary: >-
  استخدم اللقطات لالتقاط حالات التجميع في الوقت المحدد للتراجع والإصدار
  والاختبار.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">اللقطات<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>اللقطة هي صورة في الوقت المناسب لمجموعة Milvus، وهي مثالية للتراجع السريع، والإصدار، والاختبار. وهي تلتقط حالة المجموعة في طابع زمني محدد وتخزن فقط البيانات الوصفية وملفات البيانات، مثل المخطط والفهارس وملفات البيانات المتجهة (مدونات البيانات)، من أجل التخزين والاستعادة الفعالة.</p>
<div class="alert note">
<p>اللقطات هي صور سريعة في الوقت المناسب للبيانات، وهي مناسبة للتراجع السريع أو الاختبار السريع<strong>(من أيام إلى أسابيع</strong>). في الوقت نفسه، فإن النسخ الاحتياطية هي نسخ مستقلة وكاملة مخزنة بشكل منفصل لاستعادة البيانات على المدى الطويل<strong>(من أسابيع إلى سنوات</strong>) ولحماية أفضل ضد فشل التخزين الكلي.</p>
<p>لإنشاء نسخ احتياطية، راجع <a href="/docs/ar/milvus_backup_overview.md">ميلفوس النسخ الاحتياطية</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">تشريح اللقطات<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>يطبق Milvus بنية لقطة قائمة على البيان لالتقاط البيانات وتخزينها واستعادتها بكفاءة في الوقت المناسب دون تكرار بيانات المتجه الفعلية. تقوم البنية بفصل إدارة البيانات الوصفية عن تخزين البيانات الفعلية، مما يتيح لقطات خفيفة الوزن تشير إلى ملفات المقاطع الموجودة في تخزين الكائنات.</p>
<p>عند إنشاء لقطة لمجموعة، يجمع Milvus ما يلي:</p>
<ul>
<li><p><strong>بيانات تعريف اللقطة</strong></p>
<p>يوفر المعلومات الأساسية لإنشاء اللقطة، بما في ذلك اسم اللقطة ووصفها، ومعرف المجموعة المستهدفة، والنقطة الزمنية التي تم فيها إنشاء اللقطة.</p></li>
<li><p><strong>وصف المجموعة</strong></p>
<p>يحتوي على وصف المجموعة الهدف، بما في ذلك تعريف المخطط ومعلومات التقسيم وخصائصه.</p></li>
<li><p><strong>معلومات الفهرس</strong></p>
<p>يخزن البيانات الوصفية للفهرس ومسارات ملفات الفهرس.</p></li>
<li><p><strong>بيانات المقطع</strong></p>
<p>يقوم بالتقاط ملفات البيانات المتجهة (سجلات البيانات المجمعة) وسجلات الحذف (الدلتوجات) وملفات الفهرس.</p></li>
</ul>
<p>من بين المعلومات المذكورة أعلاه، ينشئ Milvus ملف بيان Apache Avro لكل مقطع ويخزن البيانات الوصفية للقطة، ووصف المجموعة، ومعلومات الفهرس، ومسارات ملفات البيان في ملف JSON. يوضح الرسم البياني التالي بنية مجلد اللقطة.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>يستغرق إنشاء لقطة عادةً أجزاء من الثانية، وتستغرق استعادتها من ثوانٍ إلى دقائق، اعتمادًا على حجم البيانات.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">تأثيرات واعتبارات التخزين<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن يشير ملف Milvus إلى مقطع أو ملف فهرس في لقطة، فإنه لا يقوم بتجميع هذه الملفات في القمامة إلا إذا قمت بإسقاط اللقطة. وتستهلك اللقطات مساحة تخزين تتناسب مع حجم المجموعات المستهدفة، وتنطبق تكاليف تخزين الكائنات على الاحتفاظ باللقطات. في الحالات القصوى، يمكن أن تؤدي لقطة واحدة إلى مضاعفة تكاليف تخزين الكائنات. يُنصح بما يلي</p>
<ul>
<li>إزالة اللقطات القديمة بانتظام لحفظ التخزين.</li>
<li>استخدم أسماء وأوصاف وصفية للرجوع إليها في المستقبل.</li>
<li>تحقق دائماً من نتائج إنشاء اللقطات واستعادتها.</li>
<li>تتبع الطوابع الزمنية لإنشاء اللقطات واستخدام التخزين ومعرفات مهام الاستعادة للمراقبة واستكشاف الأخطاء وإصلاحها.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">الحدود والقيود<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>تصبح اللقطات غير قابلة للتغيير بعد الإنشاء.</li>
<li>يمكنك استعادة لقطة فقط إلى مجموعة جديدة ضمن نفس المجموعة الأصلية.</li>
<li>تحتفظ المجموعات المستعادة بنفس المخطط وعدد الأجزاء وعدد الأقسام.</li>
<li>قد تتعارض البيانات التاريخية المستعادة مع نُهج TTL. يُنصح بتعطيل TTL أو ضبط إعدادات TTL قبل إنشاء اللقطات.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">قراءات أخرى<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/ar/manage-snapshots.md">إدارة اللقطات</a> - إنشاء اللقطات وإدراجها واستعادتها وحذفها.</li>
<li><a href="/docs/ar/snapshot-use-cases.md">حالات استخدام اللقطات</a> - الأنماط الشائعة وسير العمل.</li>
<li><a href="/docs/ar/milvus_backup_overview.md">النسخ الاحتياطي Milvus Backup</a> - النسخ الاحتياطي والاستعادة على المدى الطويل عبر المجموعات.</li>
</ul>
