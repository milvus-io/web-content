---
id: switch-mq-type.md
title: تغيير نوع قائمة انتظار الرسائل (MQ)
summary: >-
  تبديل قائمة انتظار الرسائل في نشر Milvus قائم بين Woodpecker وقائمة انتظار
  رسائل أخرى دون توقف.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">تغيير نوع قائمة انتظار الرسائل (MQ)<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الدليل كيفية تبديل قائمة انتظار الرسائل (MQ) لنشر Milvus موجود <strong>بين Woodpecker وقائمة انتظار رسائل أخرى،</strong> عبر الإنترنت ودون توقف.</p>
<div class="alert warning">
<p>هذه الميزة قيد الإصدار وقد تتعرض للتغيير. يرجى التواصل مع فريق دعم Milvus إذا كنت ترغب في تجربتها أو إذا كانت لديك أي أسئلة.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>ميزة "تبديل قائمة انتظار الرسائل" متوفرة في Milvus 3.0 والإصدارات الأحدث.</strong> قم بترقية مثيل Milvus الخاص بك إلى Milvus 3.0 أو إصدار أحدث قبل استخدامها — فهذه الميزة غير متوفرة في الإصدارات الأقدم.</li>
<li>يجب أن يكون المثيل قيد التشغيل بشكل صحيح.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">النطاق<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>يغطي هذا الدليل التبديل <strong>بين Woodpecker وقائمة انتظار رسائل أخرى</strong> فقط. لا يشمل نطاق هذا الدليل التبديل المباشر بين Pulsar و Kafka.</p>
<ul>
<li><a href="/docs/ar/switch-rocksmq-woodpecker.md">التبديل بين RocksMQ و Woodpecker</a> — Milvus المستقل (Docker Compose)</li>
<li><a href="/docs/ar/switch-pulsar-woodpecker.md">التبديل بين Pulsar و Woodpecker</a> — مجموعة Milvus (Helm / Milvus Operator)</li>
<li><a href="/docs/ar/switch-kafka-woodpecker.md">التبديل بين Kafka و Woodpecker</a> — مجموعة Milvus (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">سير العمل العام<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>تأكد من أن مثيل Milvus يعمل بشكل صحيح.</li>
<li>تأكد من نوع MQ المصدر ونوع MQ الهدف.</li>
<li>قم بتحويل إعدادات الوصول إلى MQ الهدف إلى تكوين Milvus <strong>دون</strong> تغيير قيمة " <code translate="no">mqType</code> ".</li>
<li>قم بتشغيل عملية التبديل عن طريق استدعاء واجهة برمجة تطبيقات (API) WAL alter على MixCoord.</li>
<li>راقب السجلات للتأكد من اكتمال عملية التبديل.</li>
</ol>
<div class="alert note">
<p>قبل التبديل، تأكد من أن MQ الهدف لا يحتوي على مواضيع تحمل نفس الأسماء المستخدمة في مثيل Milvus الحالي. وهذا مهم بشكل خاص إذا كان MQ الهدف قد استخدمه مثيل Milvus آخر، حيث يمكن أن تؤدي أسماء المواضيع المتعارضة إلى سلوك غير متوقع.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">مصفوفة الدعم<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>مستودع الرسائل (MQ) المصدر</th><th>MQ الهدف</th><th>النشر</th><th>الحالة</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (محلي/MinIO)</td><td>مستقل (Docker Compose)</td><td><strong>مدعوم</strong></td></tr>
<tr><td>Woodpecker (محلي/MinIO)</td><td>RocksMQ</td><td>مستقل (Docker Compose)</td><td><strong>مدعوم</strong></td></tr>
<tr><td>Pulsar (مدمج/خارجي)</td><td>Woodpecker (MinIO)</td><td>مجموعة (Helm / Operator)</td><td><strong>مدعوم</strong></td></tr>
<tr><td>وودبيكر (MinIO)</td><td>بولسار (خارجي)</td><td>العنقود (Helm / Operator)</td><td><strong>مدعوم</strong></td></tr>
<tr><td>Kafka (مدمج/خارجي)</td><td>وودبيكر (MinIO)</td><td>العنقود (Helm / Operator)</td><td><strong>مدعوم</strong></td></tr>
<tr><td>وودبيكر (MinIO)</td><td>كافكا (خارجي)</td><td>العنقود (Helm / Operator)</td><td><strong>مدعوم</strong></td></tr>
<tr><td>وودبيكر MinIO</td><td>وودبيكر محلي (أو العكس)</td><td>أي</td><td><strong>غير مدعوم</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>تجنب التبديل بين أنواع MQ مرارًا وتكرارًا. إذا كنت بحاجة إلى التبديل، فتأكد من مسح البيانات ذات الصلة قبل كل عملية تبديل — فقد تتسبب البيانات المتبقية في حدوث سلوك غير متوقع.</p>
</div>
