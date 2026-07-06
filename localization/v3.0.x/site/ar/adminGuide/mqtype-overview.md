---
id: mqtype-overview.md
title: نظرة عامة على قائمة انتظار الرسائل
summary: >-
  نظرة عامة على خيارات قائمة انتظار الرسائل (mqType) التي يدعمها Milvus، وأي
  منها يجب استخدامه في حالات النشر المستقلة مقابل حالات النشر الموزعة.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">نظرة عامة على قائمة انتظار الرسائل<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>يعتمد Milvus على قائمة انتظار الرسائل (سجل الكتابة المسبقة، WAL) لإدارة سجلات التغييرات الأخيرة وسجلات تدفق المخرجات، وتوفير اشتراكات السجلات. في Milvus 3.x، يُعد <strong>Woodpecker</strong> قائمة انتظار الرسائل الافتراضية ولا يتطلب أي بنية تحتية منفصلة للمراسلة. ويظل كل من Pulsar وKafka وRocksMQ مدعومًا في سيناريوهات محددة.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">قوائم انتظار الرسائل المدعومة<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>قائمة انتظار الرسائل</th><th style="text-align:center">Milvus المستقل</th><th style="text-align:center">Milvus الموزع (العنقود)</th><th>الافتراضي في</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ar/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (مُدمج)</td><td style="text-align:center">✔️ (مُدمج أو خدمة)</td><td><strong>Milvus 3.x</strong> (كلا الوضعين)</td><td>الافتراضي والموصى به. WAL السحابي الأصلي على تخزين الكائنات؛ لا يلزم وجود خدمة خارجية.</td></tr>
<tr><td><a href="/docs/ar/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (الإعداد الافتراضي للمجموعة)</td><td>مدعوم، خارجي أو مدمج.</td></tr>
<tr><td><a href="/docs/ar/mq_kafka.md">كافكا</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>مدعوم. كافكا 2.x أو 3.x فقط.</td></tr>
<tr><td><a href="/docs/ar/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (الإعداد الافتراضي للنسخة المستقلة)</td><td>مدعوم للإصدار <strong>المستقل فقط</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>تستخدم كل مثيل من Milvus قائمة انتظار رسائل واحدة فقط.</p></li>
<li><p><strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v3.0-beta، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يُدعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.</p></li>
<li><p>لتغيير قائمة انتظار الرسائل لمثيل قيد التشغيل، راجع <a href="/docs/ar/switch-mq-type.md">«تبديل نوع قائمة انتظار الرسائل</a>». تتوفر ميزة «تبديل قائمة انتظار الرسائل» في <strong>Milvus 3.0 والإصدارات الأحدث</strong> — قم بالترقية إلى Milvus 3.0 أو إصدار أحدث أولاً.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">اختيار قائمة انتظار الرسائل<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>عمليات النشر الجديدة (Milvus 3.x):</strong> استخدم <strong>Woodpecker</strong> (الافتراضي). يتم تشغيله مدمجًا في الإصدار المستقل؛ أما بالنسبة للإصدار الموزع (المجموعة)، فإن الإعداد الافتراضي الموصى به هو <a href="/docs/ar/woodpecker.md#Deployment-modes">خدمة</a> مخصصة يتم نشرها باستخدام Helm، كما يتم دعم التشغيل المدمج أيضًا.</li>
<li><strong>مستخدمو Pulsar أو Kafka الحاليون:</strong> لا يزال كل من Pulsar و Kafka مدعومين بالكامل. احتفظ بهما، أو <a href="/docs/ar/switch-mq-type.md">قم بالتبديل إلى Woodpecker</a>.</li>
<li><strong>RocksMQ:</strong> متاح في الإصدار المستقل فقط، وقد حلت محلها خدمة Woodpecker المدمجة في Milvus 3.x.</li>
</ul>
