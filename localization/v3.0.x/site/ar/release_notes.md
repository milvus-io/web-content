---
id: release_notes.md
summary: ملاحظات إصدار Milvus
title: ملاحظات الإصدار
---
<h1 id="Release-Notes" class="common-anchor-header">ملاحظات الإصدار<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>اكتشف ما الجديد في Milvus! تلخص هذه الصفحة الميزات الجديدة والتحسينات والمشكلات المعروفة وإصلاحات الأخطاء في كل إصدار. ننصحك بزيارة هذه الصفحة بانتظام للتعرف على التحديثات.</p>
<h2 id="v302" class="common-anchor-header">الإصدار 3.0.2<button data-href="#v302" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 20 سبتمبر 2026</p>
<table>
<thead>
<tr><th>إصدار Milvus</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th><th>إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td>3.0.2</td><td>3.0.2</td><td>3.0.6</td><td>3.0.10</td><td>3.0.2</td></tr>
</tbody>
</table>
<p>يسعدنا الإعلان عن إصدار Milvus v3.0.2! يركز هذا الإصدار على أداء البحث والاستعلام — من خلال إزالة التنازع على المسارات الساخنة في البحث المُصفى، والتجميع حسب المجموعات، وبناء الفهرس — إلى جانب دعم أقوى للمجموعات الخارجية وStorage V2، ومجموعة واسعة من إصلاحات الاستقرار في مجالات البث، والضغط، وإدارة الفهرس.</p>
<h3 id="Improvements" class="common-anchor-header">التحسينات<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تم تحسين تصفية ARRAY من خلال دمج شروط التضمين المتسلسلة في تعبير واحد من نوع « <code translate="no">ContainsAny</code> » / «<code translate="no">ContainsAll</code> » في مخطط الاستعلام (<a href="https://github.com/milvus-io/milvus/pull/52365">#52365</a>)</li>
<li>تمت إضافة دعم لنقاط النهاية المخصصة المتوافقة مع S3 في المجموعات الخارجية عبر خيار <code translate="no">extfs.endpoint_url</code> ، مع التحقق من صحة إعدادات نقاط النهاية غير الآمنة أو المتعارضة (<a href="https://github.com/milvus-io/milvus/pull/52814">#52814</a>)</li>
<li>تم توحيد مرشحات العضوية Bloom و Roaring في تعبير <code translate="no">membership_match</code> واحد، مع دعم عميل Go المطابق لإنشاء واستعلام كلا النوعين من المرشحات (<a href="https://github.com/milvus-io/milvus/pull/53019">#53019</a>)</li>
<li>تم تقليل تضخيم الكتابة أثناء إنشاء الفهرس القائم على Tantivy، مما أدى إلى خفض عمليات الإدخال/الإخراج على القرص لمطابقة النص، و NGRAM، وفهارس إحصائيات مفاتيح JSON (<a href="https://github.com/milvus-io/milvus/pull/53057">#53057</a>)</li>
<li>تمت إضافة التحكم في القبول على نقاط نهاية DQL RESTful v2 التي تُرجع HTTP 429 مع <code translate="no">Retry-After</code> قبل فك تشفير الطلب عندما تكون قائمة انتظار استعلامات الوكيل ممتلئة (<a href="https://github.com/milvus-io/milvus/pull/53111">#53111</a>)</li>
<li>تم تقليل نقطة ساخنة في عدّ المرجع الذري في مسار تقييم المرشح القياسي الذي كان يمثل حوالي 48% من وقت وحدة المعالجة المركزية (CPU) للأوراق في عملية البحث، مما أدى إلى تحسين إنتاجية البحث المُصفى (<a href="https://github.com/milvus-io/milvus/pull/53167">#53167</a>)</li>
<li>تم تحسين قابلية توسيع تجمع خيوط التخزين عن طريق استبدال التنفيذ اليدوي بـ <code translate="no">folly::CPUThreadPoolExecutor</code> واستعادة التوسع المرن للعاملين (<a href="https://github.com/milvus-io/milvus/pull/53184">#53184</a>)</li>
<li>تم تحسين مطابقة سجلات الوصول REST بحيث تتم مطابقة أدوات التنسيق مع مسار URL الذي تم تحليله، وتطبق الطرق المُعدة الآن على الطلبات التي تحمل معلمات الاستعلام (<a href="https://github.com/milvus-io/milvus/pull/53147">#53147</a>)</li>
<li>تمت إضافة دعم البث المتكرر (idempotent broadcast) بحيث لم تعد الطلبات المعاد محاولتها تنشئ مهام مكررة، مع استخدام <code translate="no">BulkImport</code> كأول متبنٍ لهذه الميزة (<a href="https://github.com/milvus-io/milvus/pull/53228">#53228</a>)</li>
<li>تمت إضافة أحرف قابلة للتكوين لتقسيم الجمل لمُجزئ Lindera، مما يسمح لمداخل قاموس المستخدم التي تحتوي على علامات الترقيم بالمطابقة كرمز واحد (<a href="https://github.com/milvus-io/milvus/pull/53287">#53287</a>)</li>
<li>تمت إضافة بوابة إصدار الكتلة التي تعمل تلقائيًا على تمكين تجسيد الوظيفة قبل الكتابة فقط بعد انتهاء جميع العقد من الترقية، مما يتجنب عدم الاتساق بين الإصدارات المختلطة أثناء عمليات الترقية التدريجية (<a href="https://github.com/milvus-io/milvus/pull/53261">#53261</a>)</li>
<li>تم ترقية Woodpecker إلى الإصدار v0.1.42، مما أصلح حالات فشل استعادة WAL في المقاطع الفارغة النهائية وحسّن استقرار مسار الإضافة والمقاييس (<a href="https://github.com/milvus-io/milvus/pull/53295">#53295</a>)</li>
<li>تم تقليل الحمل الزائد للعمليات الذرية وعدد المراجع لكل قطعة في المسار الساخن للبحث والاستعلام عن طريق تثبيت لقطة للشريحة المختومة مرة واحدة لكل طلب (<a href="https://github.com/milvus-io/milvus/pull/53301">#53301</a>)</li>
<li>تم تحسين زمن انتقال التحديث الجزئي عن طريق استبدال فترات انتظار TimeTick بالقفل المتفائل القائم على اللقطات، وتحسين معالجة AutoID بحيث يتم الحفاظ على المفاتيح الأساسية الحالية وتحتفظ المعرفات التي يتم إرجاعها بترتيب الإدخال (<a href="https://github.com/milvus-io/milvus/pull/53337">#53337</a>)</li>
<li>تقليل إنشاء عرض الصفوف الزائد عن الحاجة عند تجميع نتائج البحث حسب حقول VARCHAR أو JSON في المقاطع المختومة، مما يقلل من عبء البحث حسب التجميع (<a href="https://github.com/milvus-io/milvus/pull/53500">#53500</a>)</li>
<li>تمت إضافة واجهة برمجة تطبيقات (API) للامتثال تُبلغ عن تقارب تكوين الحمل على المستوى العام وحسب كل مجموعة موارد، وتغطي قابلية صيانة النسخ المتماثلة، ورؤية الاستعلامات، والموارد المتبقية، وموضع WAL (<a href="https://github.com/milvus-io/milvus/pull/53517">#53517</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تم إصلاح مشكلة كانت تؤدي إلى إرجاع الاستعلامات لنتائج غير صحيحة بعد حذف حقل مصفوفة البنية وإعادة إضافته (<a href="https://github.com/milvus-io/milvus/pull/52921">#52921</a>)</li>
<li>تم إصلاح حالات فشل المصادقة SASL/SCRAM-SHA-256 عند الاتصال بوسطاء Apache Kafka 4.x من خلال ترقية librdkafka إلى الإصدار 2.6.1 (<a href="https://github.com/milvus-io/milvus/pull/53086">#53086</a>)</li>
<li>تم إصلاح مشكلة كانت تؤدي إلى تخصيص جميع قنوات النسخة المتماثلة لعقدة استعلام واحدة، مما تسبب في إيقاف التشغيل المتكرر بسبب نفاد الذاكرة وترك النسخة المتماثلة غير صالحة للخدمة (<a href="https://github.com/milvus-io/milvus/pull/53094">#53094</a>)</li>
<li>تم إصلاح تكرار عملية WAL fencing التي كانت تؤدي إلى توقف عمليات الكتابة على PChannel لمدة 45-60 ثانية كل بضع دقائق في ظل الاستيعاب المستمر (<a href="https://github.com/milvus-io/milvus/pull/53118">#53118</a>)</li>
<li>تم إصلاح مشكلة فقدان مسارات المجموعات المادية الصالحة أثناء عملية ضغط التخزين V2، مما كان قد يؤدي إلى اختلال محاذاة فهارس الأعمدة المضغوطة في الشرائح المضغوطة (<a href="https://github.com/milvus-io/milvus/pull/53202">#53202</a>)</li>
<li>تم إصلاح سجلات الضغط التي كانت تعرض مفاتيح تشفير المجموعات وبيانات اعتماد تخزين الكائنات (<a href="https://github.com/milvus-io/milvus/pull/53226">#53226</a>)</li>
<li>تم إصلاح الأسماء المستعارة لإزاحة مصفوفة البنية القديمة التي قد تعرض بيانات غير صحيحة بعد إعادة فتح شريحة مختومة (<a href="https://github.com/milvus-io/milvus/pull/53154">#53154</a>)</li>
<li>تم إصلاح مشكلة تشغيل مزامنة موارد الملفات قبل إضافة أي مورد، مما قد يؤدي إلى مسح الملفات المحلية للعقدة عند بدء التشغيل أو تسجيل العقدة (<a href="https://github.com/milvus-io/milvus/pull/53170">#53170</a>)</li>
<li>تم إصلاح مشكلة حيث يمكن معالجة جزء غير مكتمل من سجل الحاوية (binlog) بصمت على أنه مقروء بالكامل، مما يعرض البيانات للضياع في نتائج الاستعلام والضغط (<a href="https://github.com/milvus-io/milvus/pull/53263">#53263</a>)</li>
<li>تم إصلاح مشكلة عدم استرداد مساحة تخزين المقاطع المحذوفة أبدًا للمجموعات التي لا تحتوي على أي فهرس نشط (<a href="https://github.com/milvus-io/milvus/pull/53252">#53252</a>)</li>
<li>تم إصلاح التقدير غير الدقيق للموارد عند تحميل فهارس المتجهات المتفرقة، مما قد يؤدي إلى معالجة غير صحيحة للبيانات الأولية وتحذيرات متكررة على QueryNode (<a href="https://github.com/milvus-io/milvus/pull/53249">#53249</a>)</li>
<li>تم إصلاح مشكلة كانت تؤدي إلى إلغاء تجميد عقدة البث المجمدة خارج مجموعة الموارد الأساسية بشكل غير متوقع أثناء إعادة التوازن (<a href="https://github.com/milvus-io/milvus/pull/53229">#53229</a>)</li>
<li>تم إصلاح فشل الاتصال بـ Google Cloud Storage حيث لم يتم تسجيل بيانات اعتماد GCP (IAM و HMAC) قبل الفحص المسبق لمدير الأجزاء (<a href="https://github.com/milvus-io/milvus/pull/53288">#53288</a>)</li>
<li>تم إصلاح مشكلة كانت تؤدي إلى كتابة سجلات C++ بشكل غير متوقع إلى الدليل <code translate="no">/tmp</code> بدلاً من إعادة توجيهها إلى مخرج السجل الموحد (<a href="https://github.com/milvus-io/milvus/pull/53293">#53293</a>)</li>
<li>تم إصلاح فشل عمليات التثبيت التكميلية مع ظهور خطأ HTTP 500 عندما كانت نتيجة Spark تمتد عبر أقسام متعددة (<a href="https://github.com/milvus-io/milvus/pull/53346">#53346</a>)</li>
<li>تم إصلاح تسرب الذاكرة في DataNode حيث لم تقم مهمة إنشاء الفهرس أو التحليل الملغاة بتحرير الذاكرة الأصلية للكائن الذي قامت بإنشائه بالفعل (<a href="https://github.com/milvus-io/milvus/pull/53348">#53348</a>)</li>
<li>تم إصلاح مشكلة فشل استيراد سجلات binlog عندما لا تحتوي حقل متجه قابل للقيمة الفارغة على ملفات binlog (<a href="https://github.com/milvus-io/milvus/pull/53363">#53363</a>)</li>
<li>تم إصلاح حقول الإخراج غير المكتملة أو غير الصحيحة عند قراءة طلبات البحث والاستعلام لبيانات الجداول الخارجية (<a href="https://github.com/milvus-io/milvus/pull/53372">#53372</a>، <a href="https://github.com/milvus-io/milvus/pull/53385">#53385</a>)</li>
<li>تم إصلاح تكرار صفوف المتجهات المتفرقة ومعرفات الأقسام في طلبات REST، بالإضافة إلى مشكلات ملكية الذاكرة وتنظيفها التي قد تتسبب في تعطل النظام أو حدوث تسربات عند إنهاء الاستعلامات مبكرًا (<a href="https://github.com/milvus-io/milvus/pull/53402">#53402</a>)</li>
<li>تم إصلاح مشكلة كانت تؤدي فيها عملية الضغط التي تُبلغ عن اكتمالها دون حمولة نتائج إلى تعطل DataCoord أو توقف مهمة الضغط بدلاً من إعادة المحاولة بشكل سليم (<a href="https://github.com/milvus-io/milvus/pull/53443">#53443</a>)</li>
<li>تم إصلاح مشكلة كانت تؤدي إلى حذف خصائص ملفات البيانات الخارجية عند إنشاء قوائم بيانات المقاطع، مما يتسبب في فقدان المجموعات الخارجية لبيانات تعريف الملف المصدر (<a href="https://github.com/milvus-io/milvus/pull/53444">#53444</a>)</li>
<li>تم إصلاح تعطل QueryNode الذي كان قد يحدث عند معالجة طلبات <code translate="no">count(*)</code> على مستوى سجل التصحيح، لا سيما أثناء عمليات الترقية التدريجية (<a href="https://github.com/milvus-io/milvus/pull/53474">#53474</a>)</li>
<li>تم إصلاح مشكلة كانت تؤدي إلى استمرار مهام إنشاء الفهرس والإحصائيات في استهلاك موارد العمال بعد حذف المقطع أو الفهرس أو المجموعة الخاصة بهم، وتم تحسين عملية تنظيف ملفات الفهرس اليتيمة (<a href="https://github.com/milvus-io/milvus/pull/53515">#53515</a>)</li>
<li>تم إصلاح معالجة مسار التخزين المحلي بحيث تصل البيانات التي تكتبها المكونات المختلفة دائمًا إلى المكان الذي يتوقعه القراء وجمع القمامة، مع ترقية تلقائية لعمليات النشر المحلية الحالية (<a href="https://github.com/milvus-io/milvus/pull/53530">#53530</a>)</li>
<li>تم إصلاح مهام إنشاء الفهرس التي كانت تعيد المحاولة إلى ما لا نهاية عندما يحتوي أحد المقاطع على مستندات JSON ذات تنسيق خاطئ؛ وأصبحت عمليات الإنشاء هذه تفشل بسرعة بدلاً من استهلاك موارد العمال إلى ما لا نهاية (<a href="https://github.com/milvus-io/milvus/pull/53531">#53531</a>)</li>
<li>تم إصلاح عمليات استعادة اللقطات المتزامنة التي تستهدف نفس المجموعة: أصبحت عمليات الاستعادة الآن متسلسلة، ويتم رفض الاستعادة إلى هدف موجود برسالة خطأ واضحة تفيد بأن «الهدف موجود بالفعل في قاعدة البيانات» بدلاً من التنافس على الموارد أو تسربها (<a href="https://github.com/milvus-io/milvus/pull/53586">#53586</a>)</li>
<li>تم إصلاح تلف مفاتيح التشفير الثنائية عبر واجهات التخزين وعدم محاذاة المؤشرات في قارئات Storage V2 المضغوطة المتوقعة من خلال ترقية milvus-storage (<a href="https://github.com/milvus-io/milvus/pull/53569">#53569</a>)</li>
</ul>
<h2 id="v301" class="common-anchor-header">الإصدار 3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 9 سبتمبر 2026</p>
<table>
<thead>
<tr><th>إصدار Milvus</th><th>إصدار SDK لـ Python</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th><th>إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>يسعدنا الإعلان عن إصدار Milvus v3.0.1! يضيف هذا الإصدار إدارة اللقطات REST v2، وقدرات إعادة الترتيب الموسعة، ودعم حقل TEXT في عميل Go وواجهة برمجة التطبيقات RESTful، إلى جانب تحسينات في الأداء وإصلاحات تتعلق بـ Storage V3 واتساق البيانات والأمان.</p>
<h3 id="Features-improvements" class="common-anchor-header">تحسينات الميزات<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تمت إضافة واجهات برمجة تطبيقات REST v2 لإدارة اللقطات الأصلية على نطاق المجموعة والاستعادة غير المتزامنة (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>، <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>تمت إضافة عتبة قابلة للتكوين لعدد النتائج للتحكم في اختيار مسار إخراج Take لعمليات البحث والاستعلام (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>تمت إضافة دعم حقل TEXT إلى عميل Go وواجهة برمجة التطبيقات RESTful (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>تمت إضافة معدلات IOPS الأولية والقصوى القابلة للتكوين للقراءة للجداول الخارجية (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>تمت إضافة إعداد اختياري لمهام تحديث المجموعات الخارجية للانتظار حتى يتم فهرسة جميع الشرائح قبل الإبلاغ عن اكتمال المهمة، دون تأخير نشر البيانات (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>تمت إضافة دعم إعادة ترتيب L1 لسلاسل وظائف البحث (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>تمت إضافة إعادة ترتيب RRF المرجح مع أوزان اختيارية لكل طلب ANN عبر FunctionScore وREST والبحث الهجين القديم وعميل Go (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>، <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">تحسينات في الاستقرار<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تم تحسين أمان الذاكرة في فهارس RTree الهندسية وذاكرات التخزين المؤقت، ومعالجة استعلامات WKB غير القابلة للتحليل والاستعلامات ذات الهندسة الفارغة (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>تحسين إدارة الذاكرة من خلال استعادة تخصيص الذاكرة المؤقتة على مستوى العملية وتصحيح تقديرات الذاكرة لتحميل حقول Storage V2/V3 المتزامن وتحميل فهرس V3 القياسي (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>تقليل اختناقات التنزيل واستخدام الذاكرة أثناء إنشاء فهارس المجموعات الخارجية من خلال إجراء القراءات بالتوازي وتدفق البيانات المتجهة الأولية إلى القرص (<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>)</li>
<li>تحسين إنتاجية Woodpecker لأحمال العمل ذات الدفعات الصغيرة والتزامن العالي من خلال تجميع عمليات الإضافة من جانب العميل وكشف إعدادات التزامن (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>تحسين ملكية قارئ السجلات واتساق مدة الصلاحية، ومعالجة الكتل الفارغة، والإبلاغ عن أخطاء القراءة عبر مسارات التخزين والضغط (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>تحسين كفاءة فحص التجزئة للتجميع باستخدام خط أنابيب متداخل رباعي الاتجاهات ووسائل حماية ضد التضارب وحدود إعادة التجزئة (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>تقليل عبء معالجة الإدراج عن طريق تخطي تحليل نص الإدراج في WAL للمجموعات التي لا تحتوي على حقول إخراج BM25 أو MinHash (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>تحسين الإبلاغ عن أعطال التخزين ومعالجة إعادة المحاولة من خلال الحفاظ على تصنيفات الأخطاء المؤقتة والدائمة عبر طبقات التنفيذ (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>تحسين أداء الاستعلامات المكانية من خلال تمكين تقسيم GIS إلى تقريب/تحسين ودمج المسندات في نفس العمود بشكل افتراضي (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>تحسين جدولة مهام فهرسة النص وتجزئة JSON من خلال التحكم في القبول القائم على قائمة المهام المتراكمة المشتركة وأولوية الإرسال بالتناوب (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>تمت إضافة دعم mmap لتعيينات إزاحة المقاطع المختومة، مع خيارات تحميل مخصصة وحساب موارد القرص (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>تم تحسين تحميل بيانات Storage V2 عن طريق تشغيل تقدير ذاكرة الأجزاء لكل عمود عند الطلب (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>تمت إضافة دعم AutoIndex من جانب الخادم للفهارس المرتبطة بحقول إخراج الوظائف الجديدة، مما يسمح لطلبات add_function_field بحذف معلمات الفهرس أو تحديد AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>تم تقليل أحجام بيانات تقارير توزيع QueryNode من خلال إعداد التقارير التزايدية مع اللجوء إلى التقرير الكامل كخيار احتياطي، وتقليل تخصيصات الذاكرة أثناء جمع المقاييس (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>، <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>تحسين قوة تجزئة كلمات المرور عن طريق زيادة تكلفة bcrypt من 4 إلى 10، مع ضرورة تدوير بيانات الاعتماد لترقية التجزئات الحالية (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>تم تقليل عمليات فك التشفير الزائدة أثناء عمليات استيراد Parquet من خلال قراءة الأعمدة الطرفية المطلوبة فقط لحقول المصفوفات الهيكلية (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>تحسين تجميع الدمج القسري من خلال التخطيط متعدد الجولات القائم على الحجم وإلغاء إعداد عتبة التخطيط القديمة (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>تم تحديث cgosymbolizer لمنع تعطل عمليات Milvus التي تعمل برقم PID 1 بعد حدوث أخطاء أصلية (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>تحسين التحقق من عدد الصفوف لمدخلات التمييز الدلالي (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>تحسين التحكم في إعادة محاولة الاستيراد مع تراجع قابل للتكوين لإعادة محاولات الكتابة (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>، <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>، <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>تم تحسين إدارة دورة حياة مهام التحليل من خلال استعادة إصدارات الإحصائيات القديمة والحفاظ على حالات المحطات الطرفية (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>، <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>تحسين تنسيق دورة حياة المقاطع من خلال انتظار تحرير المقطع بعد انتهاء مهلة القفل (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>تحسين فرز التخزين لضغط البيانات باستخدام دمج k-way (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>تقليل توسع مخزن صحة الحقول القابلة للصفر من خلال الحفاظ على الأقنعة المعبأة عبر الوصول إلى المقتطفات وتقييم التعبيرات وإحصائيات JSON (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>تحسين حماية بيانات الاعتماد الحساسة ومفاتيح واجهة برمجة التطبيقات (API) وتجزئة كلمات مرور RBAC وتفاصيل مصادر التجميع الخارجية عن طريق منع الكشف عنها في السجلات أو رسائل الخطأ (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>، <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>، <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>تحسين التحكم في التزامن للتحديث الجزئي باستخدام التحقق المتفائل من CAS والمحاولات الآمنة للتعارضات المؤهلة (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>تحسين استقرار لقطات قراءة المقاطع المتنامية وإدارة عمر لقطات المخطط (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>تقليل عمليات المسح الزائدة لبيانات تعريف التفويض أثناء عمليات النسخ الاحتياطي (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>تحسين تعيين معرفات المتجهات القابلة للصفر عن طريق نقلها إلى طبقة الفهرس، وتوحيد معالجة المعرفات المنطقية، ودعم التعيينات المدعومة بـ mmap للفهارس المختومة (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>تحسين التزامن بين تجميع Sonic JIT وتحميل المكونات الإضافية لـ Go في إصدارات CPU و GPU (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>تحسين تحليل مسار الكتابة للوكيل من خلال ذاكرة التخزين المؤقت للبيانات الوصفية، مما أدى إلى التخلص من طلبات RPC الزائدة للمنسق وتحسين تصنيف الأخطاء (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>تقليل وقت حساب الاسترجاع من حوالي 3.08 ثانية إلى 18.5 مللي ثانية عند topk=100000 في المعيار المبلغ عنه (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>تحسين تصفية الحقول القابلة للصفر من خلال إعادة استخدام خرائط بتات الصلاحية، مما يقلل من التخزين الزائد لإزاحة القيمة الصفرية، ويسرع نسخ مجموعات البتات (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>، <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>، <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>تم تحسين الفهارس القياسية الهجينة على الحقول الفرعية للبنية المتداخلة باستخدام STL_SORT عندما يصل عدد العناصر المتميزة إلى حد سعة خريطة البتات (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>تحسين كفاءة تصفية معرّفات المقاطع في ذاكرة التخزين المؤقت للبيانات الوصفية (<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>تقليل تخصيصات الذاكرة في وظائف مساعدة التجزئة (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>تحسين فرز نتائج إعادة الترتيب المدمجة عن طريق التخلص من عمليات البحث في الخريطة لكل مقارنة (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>تحسين أمان الذاكرة عند التعامل مع القيم الافتراضية لـ JSON وعروض السلاسل غير المنتهية بـ NUL (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>تحسين أوقات إنشاء C++ باستخدام التجميع الموحد المحدد النطاق، وتحسين التخزين المؤقت للمترجم، وتقليل أعمال التجميع الزائدة (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>تحسين تغطية مقاييس نظام الملفات وحداثتها من خلال جمع المقاييس من أنظمة الملفات المخزنة مؤقتًا في وقت الاستخراج مع الحفاظ على أسماء المقاييس وتسمياتها الحالية (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>تمت إضافة إعداد growingBuildThreadRate القابل للتحديث لتكوين الخيوط لكل عملية بناء مؤشر مؤقت للقطعة المتنامية مع الاحتفاظ بالإعداد الافتراضي أحادي الخيط (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>تمت إضافة دعم إعادة كتابة بيانات الحقول mmap إلى الإصدار 3.0 من خلال التوافق مع الإصدارات السابقة، مع خيار queryNode.mmap.writeback المعطل افتراضيًا (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>تم إصلاح النتائج غير الصحيحة والتحقق غير المتسق من صحة المسندات في استعلامات JSON وARRAY وTIMESTAMPTZ، بما في ذلك المسندات ذات الأنواع المختلطة، ومقارنات الأعداد الكبيرة، والتصفية عبر دفعات متعددة (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>تم إصلاح عدم اتساق البيانات المحدثة أثناء عمليات التحديث المتوازية للمجموعات الخارجية عندما تمتد ملفات مصدر المقطع عبر مهام متعددة (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>تم إصلاح تعبيرات MATCH التي كانت تقبل المسندات التي لا تعمل على مستوى العنصر (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>تم إصلاح عمليات البحث التي لا توجد لها نتائج مطابقة والتي كانت تفشل بسبب خطأ نوع معرّف غير مدعوم (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>تم إصلاح توقف Milvus المستقل أثناء إيقاف التشغيل عن طريق إضافة مهلة ترحيل قابلة للتكوين بفترات افتراضية تبلغ 10 ثوانٍ (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>تم إصلاح طلبات تضمين الجداول الخارجية التي تستخدم هوية الكتلة الخاطئة عندما كانت عمال DataNode مشتركة عبر مجموعات الخدمة (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>تم إصلاح مشكلة كانت تمنع تحديث integration_id و model_deployment_id لوظائف TextEmbedding (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>تم إصلاح استجابات HTTP JSON التي كانت تتجاهل الحالة الصريحة ok=false لمقاطع التعبئة اللاحقة الفاشلة (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>تم إصلاح فشل تحميل كائنات MinIO مع ظهور خطأ HTTP 400 XAmzContentChecksumMismatch عند إعادة المحاولة بعد انتهاء مهلة النقل أو انخفاض السرعة (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>، <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>تم إصلاح توقف موازنة المقاطع بين QueryNodes عند تمكين خدمة البث (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>، <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>تم إصلاح فقدان البيانات الصامت أثناء ضغط المزج عندما تعذر إعادة بناء السجلات المحتفظ بها (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>تم إصلاح مشكلة فقدان إعدادات المجموعات عند استعادة اللقطات والعودة بشكل غير متوقع إلى التناسق القوي (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>تم إصلاح حذف التدفق الذي كان يفقد المقاطع المختومة التي تم تحميلها حديثًا، مما يسمح بالاستعلام عن البيانات المحذوفة (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>تم إصلاح عدم إنشاء الفهارس المتداخلة بشكل صحيح للبيانات الفارغة (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>تم إصلاح حالات التعطل عند التبديل إلى خدمة التدفق التي كانت تترك العمليات في انتظار إلى أجل غير مسمى (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>تم إصلاح القيم الافتراضية غير الصحيحة للهندسة أثناء الضغط وإعادة بناء السجلات، وعلامات "null" غير الصحيحة لقيم الهندسة المملوءة افتراضيًا في عمليات استيراد Parquet (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>تم إصلاح رفض المقاطع V3 الصالحة أثناء عملية الضغط والاستعادة بعد إعادة تشغيل DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>، <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>، <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>، <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>، <a href="https://github.com/milvus-io/milvus/pull/52392">#52392،</a> <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>تم إصلاح حالات فشل تحميل المقاطع مع وجود خطأ في بيانات تعريف الإصدار المفقودة عند استخدام الفهارس القياسية الهجينة على الحقول الفرعية لمصفوفة VARCHAR في الهياكل (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>تم إصلاح فشل تحديث الأعمدة الخارجية عند إعادة فتح قائمة البيانات المحدثة (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>تم إصلاح المعالجة غير الصحيحة للتوقيت الزمني في عمليات البحث ذات الشروط المعتمدة على الوقت (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>تم إصلاح المعالجة غير الصحيحة لمدخلات ArrayOfVector في طلبات البحث (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>تم إصلاح فشل عمليات الإدراج في رفض الصفوف التي تتجاوز حد الحجم المدعوم (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>تم إصلاح مشكلة تجاهل الفهارس المؤقتة لإصدار الفهرس المستهدف المُعدّ (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>تم إصلاح مشكلة عدم إرجاع حقول الإخراج المتجهة الكثيفة في الاستعلامات التي تستخدم order_by (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>، <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>تم إصلاح بقاء الامتيازات الملغاة سارية المفعول بعد إزالتها من مجموعة الامتيازات (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>تم إصلاح الأعداد غير الصحيحة لملفات binlog وتسميات تنسيق التخزين لمقاطع Storage V3 بعد إعادة تشغيل DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>، <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>تم إصلاح توقف عمليات استعادة اللقطات الخارجية بسبب عدم موثوقية عمليات التحقق من إصدارات العمال أو إعادة المحاولة المتكررة للعمال غير المدعومين حتى انتهاء المهلة (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>تم إصلاح فشل تحميل المقاطع للفهارس HYBRID في الحقول الفرعية لمصفوفات البنية (struct-array) مع ملفات STLSORT القديمة من الإصدار 3.0.0، دون الحاجة إلى إعادة الفهرسة (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>تم إصلاح حالات التعطل عند معالجة مخازن بيانات Arrow C ذات الطول صفر (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>تم إصلاح المعالجة غير الصحيحة للفشل عند تحميل أو إعادة فتح شرائح التخزين V3 بعد حدوث أخطاء في قائمة البيانات، مع الحفاظ على حالة الشريحة الحالية لإعادة المحاولة بأمان (<a href="https://github.com/milvus-io/milvus/pull/52678">رقم 52678</a>)</li>
<li>تم إصلاح حالات فشل الاستعلامات عندما واجهت عوامل تصفية عناصر ARRAY دفعات كاملة من القيم NULL أو المصفوفات الفارغة قبل العناصر اللاحقة (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>تم إصلاح مهام التعبئة التي تقوم بتثبيت التضمينات القديمة بعد تغيير مخطط المجموعة (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>تم إصلاح مشكلة إرجاع الحقول المفقودة في سجلات Storage V3 بقيمة NULL بدلاً من قيمها الافتراضية المعلنة (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>، <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>، <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>تم إصلاح حالات فشل النسخ من جانب الخادم التي كانت تمنع استعادة لقطات Storage V3 على GCS باستخدام بيانات اعتماد IAM/OAuth، بما في ذلك نسخ الكائنات التي يزيد حجمها عن 5 GiB (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>تم إصلاح الوصول غير المصادق عليه من خلال تدفق مكالمات gRPC على منفذ الوكيل الخارجي (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>تم إصلاح مشكلة فقدان البيانات لطوابعها الزمنية الأصلية بعد ضغط المجموعات (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>تم إصلاح تعطل عقدة البث الناتج عن فشل عمليات التفريغ المتكررة بعد إضافة حقل TEXT إلى المجموعات التي تحتوي على شرائح Storage V2 موجودة مسبقًا (<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>)</li>
<li>تم إصلاح مشكلة الصفوف منتهية الصلاحية في شرائح Storage V3 التي تفشل في تشغيل عملية الضغط المستندة إلى حقل TTL وتظل مخزنة حتى يتم استيفاء شرط ضغط آخر (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>تم إصلاح عدم اتساق المفاتيح الأساسية التي يتم إنشاؤها تلقائيًا بين المجموعات المصدر والهدف أثناء عمليات الاستيراد المنسوخة عبر CDC (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>تم إصلاح فقدان عمليات الكتابة المتزامنة أثناء ترحيل الخلفية WAL (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>، <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>، <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>تم إصلاح مشكلة أن تصبح الفهارس HYBRID المتداخلة التي أعيد بناؤها أو تم ضغطها والتي تحتوي على بيانات ذات كاردينالية عالية غير قابلة للقراءة بعد التراجع إلى إصدار أقدم (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>تم إصلاح معالجة العناصر الفارغة في صفوف المتجهات الكثيفة الخارجية من خلال قبول الصفوف القابلة للفراغ التي تحتوي على قيم فارغة بالكامل وإضافة معالجة قابلة للتكوين للصفوف التي تحتوي على قيم فارغة جزئيًا (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>تم إصلاح الأعداد غير الصحيحة لصفوف شرائح V3 وفشل عمليات الضغط بالفرز المتكررة بعد تجاوز فشل عقدة البث (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>تم إصلاح الاستعلامات التي تجمع بين شروط النطاق وعلامة OR، والتي كانت تتجاهل السجلات عند الحد الأدنى الشامل (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>تم إصلاح عمليات البحث باستخدام المفتاح الأساسي التي كانت تفشل في الحفاظ على ترتيب المعرفات المطلوب (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>تم إصلاح مشكلة كانت تمنع تحميل شرائح التخزين V2 القائمة التي تتوسع عند إضافة حقل TEXT بعد تمكين التخزين V3، مما يؤدي إلى تعطيل عمليات التفريغ والفرز والفهرسة (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>تم إصلاح اللقطات التي تتضمن شرائح Storage V3 غير الملتزم بها، مما تسبب في الإبلاغ عن نجاح عمليات الاستعادة بينما تعذر تحميل الشرائح المستعادة (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>، <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>تم إصلاح مشكلة عدم تحميل فهارس النص في Storage V3 عندما كانت ملفاتها مخزنة في أدلة مهام أو إصدارات متداخلة (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 29 يوليو 2026</p>
<table>
<thead>
<tr><th>إصدار Milvus</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th><th>إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>تم الإصدار الرسمي لـ Milvus 3.0.0! بناءً على بنية lake-native التي تم تقديمها في <a href="https://milvus.io/docs/release_notes.md#v30-beta">الإصدار 3.0-beta</a>، يكمل هذا الإصدار ما بدأته النسخة التجريبية: تغطي المجموعات الخارجية المزيد من سير عمل lakehouse؛ ويدعم المخطط الإضافة / التعبئة / الحذف عبر الإنترنت؛ وأعيد بناء الفهرس المتفرق حول SINDI؛ ويكمل كل من StructArray والبحث المتعدد الأوجه محرك الاسترجاع؛ ويوسع تمرير FAISS و TEXT خيارات الفهرس والطرق؛ ويعمل Woodpecker كخدمة مستقلة.</p>
<p>شاهد الفيديو أدناه لمعرفة المزيد عن Milvus 3.0 وجلسة الأسئلة والأجوبة (AMA) مع القائمين على الصيانة الأساسية:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>إذا كنت جديدًا على سلسلة الإصدارات 3.0، فإن قسم «ملخص ميزات Core 3.0» أدناه يلخص الإمكانات التي تم تقديمها في الإصدار 3.0-beta؛ وتحتوي <a href="https://milvus.io/docs/release_notes.md#v30-beta">ملاحظات الإصدار 3.0-beta</a> على التفاصيل الكاملة.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">ما الجديد في الإصدار 3.0.0 (منذ الإصدار 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">المجموعة الخارجية: سير عمل أكثر اكتمالًا لنظام lakehouse</h4><p>قدمت النسخة 3.0-beta ميزة "المجموعة الخارجية" (External Collection): الرجوع إلى ملفات Lakehouse في مكانها الأصلي، وإنشاء الفهارس، والبحث فيها دون نسخ البيانات إلى Milvus. ويوسع هذا الإصدار نطاقها لتشمل سير عمل استرجاع data lakehouse الكامل. يمكن الآن للحقول الخارجية تغذية حقول مخرجات الدوال مثل متجهات BM25 المتفرقة، وتوقيعات MinHash، وتضمينات النص، بحيث يتم إنشاء حقول الاسترجاع المستمدة من النص والنموذج داخل Milvus دون نسخ الجدول المصدر. كما يدعم التحديث تطور المخطط التراكمي: عندما تكتسب الجدولة الخارجية أعمدة جديدة، يقوم Milvus بتصحيح الأجزاء المتأثرة بدلاً من إعادة بناء المجموعة.</p>
<p>يضيف هذا الإصدار أيضًا تنسيقًا خارجيًا يُسمى « <code translate="no">milvus-table</code> » (تجميع المجموعات واللقطات) الذي يعامل بيانات تعريف Milvus Snapshot وبيانات بيان Storage V3 كمصدر خارجي، بحيث يمكن تقديم لقطة المجموعة نفسها كجدول خارجي — حيث تحصل أنظمة المعالجة الدفعية وأنظمة التقديم على عرض مشترك مدعوم ببيان لنفس البيانات.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/create-an-external-collection.md">إنشاء مجموعة خارجية</a> <a href="/docs/ar/snapshots.md">ولقطات</a>.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">مخطط مرن: إضافة الأعمدة وتعبئتها بأثر رجعي وحذفها عبر الإنترنت</h4><p>لا تظل المخططات ثابتة في بيئة الإنتاج — حيث يتم استبدال النماذج المضمنة، وتتكرر الميزات، وتصبح الحقول قديمة — وكان هذا يعني في السابق إعادة بناء المجموعة بالكامل مع توقف مؤقت أو عمليات كتابة مزدوجة. الإصدار 3.0.0 يغلق هذه الحلقة: يمكن إضافة الأعمدة وتعبئتها وحذفها أثناء استمرار التقديم.</p>
<p>يعمل التعبئة في كلا الاتجاهين. تتعامل التعبئة الخارجية مع القيم المحسوبة خارج Milvus: أضف عمودًا، وقم بأخذ لقطة للمجموعة كنقطة انطلاق متسقة، وقم بتشغيل المهمة دون اتصال بالإنترنت، وأعد كتابة القيم، ويقوم Milvus بفهرسة العمود الجديد بشكل تدريجي — وبذلك تصبح ترقية نموذج التضمين عبر مئات الملايين من الصفوف مسارًا سريعًا دون أي توقف. يغطي التعبئة الداخلية القيم المشتقة من النواة: قم بإرفاق دالة BM25 أو MinHash بمجموعة موجودة ويتم حساب حقل الإخراج الخاص بها تلقائيًا على البيانات الموجودة.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/add-fields-to-an-existing-collection.md">«إضافة حقول إلى مجموعة موجودة</a>».</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">تجديد الفهرس المتفرق: SINDI و Block-Max WAND و Block-Max MaxScore</h4><p>يقوم Milvus 3.0 بتحديث فهرس المتجهات المتفرقة بشكل شامل. ويقدم خوارزميات بحث جديدة — <a href="https://arxiv.org/abs/2509.08395">SINDI</a> وBlock-Max WAND وBlock-Max MaxScore — إلى جانب ضغط القائمة المقلوبة، والتكمية القابلة للتكوين، واختيار خوارزمية البحث لكل حمل عمل. كما تم تحسين التحميل عبر mmap، والتسلسل، وتقييم BM25، مما يقلل من تكلفة تخزين الفهرس وتحميله للبحث المتفرق على نطاق واسع والبحث عن النص الكامل. في الاختبارات المعيارية الداخلية، يكون حجم فهرس BM25 المضغوط أصغر بنحو 3 أضعاف من حجم الفهرس المتفرق 2.6 عند معدل استرجاع مماثل، وتصل SINDI إلى ما يقارب 10 أضعاف معدل QPS لـ MaxScore في عمليات التضمين المتفرقة المُتعلمة. بمجرد تمكين إصدار الفهرس الجديد (انظر ملاحظات التوافق والسلوك)، يصبح SINDI هو الإعداد الافتراضي للبحث المتفرق عن عناوين IP، ويصبح MaxScore هو الإعداد الافتراضي لـ BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">تغطية StructArray</h4><p>يدعم StructArray الآن القيم الفارغة، وفهارس الصور النقطية، وإضافة الحقول الديناميكية إلى المجموعات الحية، والتحديث الجزئي لحقول البنية من خلال upsert، مع تغطية REST والاستيراد المجمّع بما يتناسب مع ذلك.</p>
<p>يضيف البحث على مستوى العناصر بحثًا هجينًا عبر الحقول الفرعية المتجهة مع إمكانية التجميع القابل للتكوين لكل كيان (متغيرات max / sum / avg / top-k)، بالإضافة إلى البحث عن النطاق والتجميع (group-by) داخله. تغطي التصفية المتداخلة المسندات ( <code translate="no">element_filter</code> )، والمحددات الكمية ( <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code> )، والوصول إلى الحقول الفرعية الموضعية مثل <code translate="no">tags[0][name]</code> ، و <code translate="no">array_length()</code> في عمود البنية.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/array-of-structs.md">StructArray</a> <a href="/docs/ar/struct-array-operators.md">وعوامل StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">تجميع البحث والبحث المتعدد الأوجه</h4><p>يقوم تجميع الاستعلامات من الإصدار التجريبي بحساب إحصائيات دقيقة على البيانات التي تمت تصفيتها؛ ويضيف الإصدار 3.0.0 التصفية في مسار البحث. حدد حقل تصفية عند إجراء البحث، وسيقوم Milvus بإرجاع قيم التصفية الأعلى، حيث يمثل كل منها العنصر الأكثر مطابقة في ترتيب الشبكة العصبية الاصطناعية (ANN) ومُرفقًا بمجموعات مثل COUNT وAVG — الشريط الجانبي للبحث المُصنَّف (العلامة التجارية، النطاق السعري، السمات) في طلب واحد، بدلاً من الاسترجاع الزائد والعد من جانب العميل.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">إعادة الترتيب عبر سلسلة الوظائف</h4><p>أصبح من الممكن الآن إعادة الترتيب من خلال واجهة برمجة تطبيقات سلسلة الوظائف (Function Chain API)، التي تنفذ مسارًا مرتبًا ومحدد النوع كجزء من طلب بحث واحد. يمكن للسلسلة أن تجمع بين إعادة التقييم المبكر L0 على QueryNode وإعادة الترتيب L2 بعد التخفيض على Proxy، مما يدعم تحويل الدرجات ودمجها، وإعادة الترتيب القائم على النموذج، والفرز، وتقليص المرشحين دون الحاجة إلى تنسيق من جانب العميل. يضيف هذا الإصدار أيضًا تقييم XGBoost الأصلي لإعادة الترتيب في المستوى L0 باستخدام نماذج UBJ المسجلة كموارد ملفات (FileResources)، إلى جانب مزودي الاستدلال من Hugging Face لتضمين النصوص التي يديرها الخادم وإعادة الترتيب بناءً على تشابه الجمل.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">حقول النصوص الطويلة (TEXT)</h4><p>تجعل حقول TEXT النصوص الطويلة ذات أولوية قصوى، مع إزالة حدود الطول من جانب التخزين: فهي تدعم <code translate="no">text_match</code> و <code translate="no">phrase_match</code> وBM25. تظل القيم التي يقل حجمها عن 64 كيلوبايت مضمنة؛ بينما تنتقل القيم الأكبر إلى ملفات LOB على مستوى القسم بتنسيق Vortex، حيث يخزن العمود مراجع <code translate="no">(file_id, offset)</code> فقط. يتم مشاركة ملفات LOB عبر المقاطع، لذا فإن عملية الضغط تنقل المراجع بدلاً من إعادة كتابة النص. بالنسبة لـ RAG، يعني هذا استرداد المتجهات والنص المصدر من نفس المخزن في عملية إدخال/إخراج واحدة — دون الحاجة إلى تشغيل مخزن blob خارجي.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">تمرير فهرس FAISS</h4><p>يقبل نوع الفهرس الجديد « <code translate="no">FAISS</code> » سلاسل مصنع الفهرس Faiss التعسفية من خلال المعلمة « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code> ، <code translate="no">HNSW16,Flat</code> ، <code translate="no">OPQ16,IVF64,PQ16x4</code> — مع تمرير معلمات البحث، بحيث يتم إعادة إنتاج وصفات Faiss مباشرةً على Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">دعم تنسيقي Vortex و Lance</h4><p>تكتسب طبقة التخزين تنسيقين عموديين مفتوحين: Vortex باعتباره التنسيق الداخلي من الجيل التالي — الترميزات التكيفية (القاموس، RLE، تجميع البتات، الضغط الخاص بالقيم العائمة)، وفك الضغط بدون نسخ، والمُحسّن لأحمال العمل المختلطة بين المتجهات والقيم القياسية — وLance جنبًا إلى جنب مع Parquet للتبادل في النظام البيئي المفتوح. من المقرر أن يصبح Vortex التنسيق الداخلي الافتراضي، مع تضمين دفع المرشحات (filter pushdown) ونسخة محلية في خطة التطوير.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">النشر المستقل لـ Woodpecker</h4><p>يمكن الآن نشر Woodpecker، وهو WAL الذي يشكل جوهر مسار الكتابة المتدفقة، كخدمة مستقلة بدلاً من تضمينه في العقد الأخرى — مع إمكانية التوسع المستقل، وعزل الأعطال، والقابلية للمراقبة، مثل أي خدمة مصغرة أخرى. وهذا أمر بالغ الأهمية بالنسبة للمجموعات الكبيرة وأحمال العمل ذات معدلات الكتابة العالية.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">ملخص ميزات الإصدار 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>تم تقديم الميزات أدناه في <a href="https://milvus.io/docs/release_notes.md#v30-beta">الإصدار 3.0-beta</a> وهي جزء من الإصدار 3.0.0؛ راجع ملاحظات الإصدار التجريبي للاطلاع على التفاصيل الكاملة.</p>
<ul>
<li><strong>المجموعة الخارجية</strong> — استعلام بيانات lakehouse (Parquet، Lance، Iceberg، Vortex) في مكانها: بدون نسخ، للقراءة فقط، ومزامنة من خلال التحديث التزايدي.</li>
<li><strong>Snapshot</strong> — طرق عرض التجميع للقراءة فقط في وقت محدد حسب مرجع الشريحة، مع تخزين هامشي يقترب من الصفر.</li>
<li><strong>التخزين V3 (Loon)</strong> — تخزين عمودي قائم على قائمة البيانات في تخزين الكائنات؛ وهو الأساس لميزة «اللقطة» و«المجموعة الخارجية».</li>
<li><strong>الاستعلام / البحث ORDER BY</strong> — فرز متعدد الحقول من جانب الخادم مع ترتيب تصاعدي (ASC) / تنازلي (DESC) لكل حقل.</li>
<li><strong>تجميع الاستعلامات</strong> — COUNT / SUM / AVG / MIN / MAX مع التجميع حسب المجموعات، ويتم تقييمها من جانب الخادم.</li>
<li><strong>EmbList + DiskANN</strong> — فهرسة متعددة المتجهات على القرص لقوائم تضمين StructArray، مع مسارات تسريع مثل Muvera وLemur.</li>
<li><strong>دالة MinHash (doc-in، doc-out)</strong> — توقيعات MinHash من جانب الخادم بالإضافة إلى <code translate="no">MINHASH_LSH</code> للكشف عن التكرارات شبه المتطابقة.</li>
<li><strong>المتجهات القابلة للإلغاء</strong> — NULL في جميع أنواع المتجهات الستة؛ يتخطى البحث الصفوف التي تحتوي على NULL، ويمتد AddField ليشمل حقول المتجهات.</li>
<li><strong>مدة صلاحية الكيان (Entity TTL</strong> ) — انتهاء الصلاحية لكل صف مدفوع بحقل TIMESTAMPTZ.</li>
<li><strong>FileResource</strong> — قواميس مُدارة عبر الكتلة، وقوائم المرادفات، وقوائم الكلمات المُستبعدة للمحللات، وBM25، وText Match.</li>
<li><strong>Force Merge</strong> — ضغط المقاطع الذي يتم تشغيله بواسطة المشغل، في الوضع المتزامن أو غير المتزامن.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">ملاحظات حول التوافق والسلوك<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>يتم تعطيل Storage V3 (Loon) افتراضيًا.</strong> تتطلب الميزات التي تعتمد عليه — مثل حقول Snapshot و TEXT — تمكينه يدويًا عبر <code translate="no">common.storage.useLoonFFI</code>. سيتم تمكين Storage V3 افتراضيًا في إصدار لاحق.</li>
<li><strong>يتم ضمان التوافق والتراجع بين الإصدارين 2.6 و3.0</strong> — يمكن التراجع عن نشر الإصدار 3.0 إلى الإصدار 2.6. ومع ذلك، بمجرد تمكين أو استخدام الميزات التي تغير تنسيق البيانات المتسلسلة (على سبيل المثال التخزين V3)، لن يكون التراجع ممكنًا بعد ذلك.</li>
<li><strong>إصدارات الفهرس الجديدة اختيارية في الوقت الحالي.</strong> تتطلب خوارزميات الفهرس التي تم إدخالها حديثًا رفع إصدار الفهرس المستهدف يدويًّا (<code translate="no">dataCoord.targetVecIndexVersion</code> إلى 10، و <code translate="no">dataCoord.targetScalarIndexVersion</code> إلى 4) قبل أن تصبح سارية المفعول؛ وسيتم تمكينها افتراضيًّا في إصدار لاحق.</li>
<li><strong>تم تحويل صور GPU إلى CUDA 12.9</strong> ولم تعد تحافظ على توافق GPU مع Ubuntu 20.04.</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 9 مايو 2026</p>
<table>
<thead>
<tr><th>إصدار Milvus</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>يوسع Milvus 3.0-beta قاعدة بيانات المتجهات Milvus من خلال تكامل جديد مع نظام Lakebase المفتوح: تتيح ميزة External Collection لـ Milvus الاستعلام عن جداول Lakebase الخارجية دون نسخ، ويمكن لـ Spark قراءة مجموعات Milvus مباشرةً عبر Snapshot. كما يوفر هذا الإصدار إمكانيات استرجاع أكثر ثراءً، ومخططًا أكثر تعبيرًا، وتخصيصًا أعمق للبحث النصي، وتحكمًا أكثر دقة في دورة حياة البيانات والنماذج، والمزيد من عناصر التحكم من جانب المشغل. يُعد Milvus 3.0 النواة الأساسية لـ Zilliz Lakebase، حيث يدعم خدماتها الموحدة، وعمليات الاستكشاف، والمعالجة الدفعية.</p>
<h3 id="Key-Features" class="common-anchor-header">الميزات الرئيسية<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">المجموعة الخارجية</h4><p>في خطوط أنابيب بيانات الذكاء الاصطناعي النموذجية، توجد تيرابايتات من التضمينات والبيانات الوصفية بالفعل في تخزين الكائنات كجداول Parquet أو Lance أو Iceberg. تؤدي نسخ تلك البيانات إلى Milvus إلى مضاعفة تكلفة التخزين، وإضافة خط أنابيب ETL يجب الحفاظ على مزامنته، ونقل إدارة البيانات بعيدًا عن العميل.</p>
<p>تعمل ميزة «الجمع الخارجي» على التخلص من عملية النسخ. يمكن لمجموعة Milvus الرجوع إلى الملفات في مواقعها الحالية، ولا يتولى Milvus سوى إدارة المخطط والفهارس وتنفيذ الاستعلامات. يضمن التحديث التراكمي توافق المجموعة مع الملفات الأساسية. يمكن للعملاء الذين لا يمكن لبياناتهم مغادرة بحيرة البيانات، مثل فرق العمل في مجالي المالية والرعاية الصحية، تشغيل استرجاع المتجهات على تلك البيانات في مكانها الحالي. كما يمكن تقديم مجموعة بيانات واحدة موجودة في بحيرة البيانات من خلال عدة مثيلات لـ Milvus في آن واحد.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/create-an-external-collection.md">إنشاء مجموعة خارجية</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">اللقطة</h4><p>غالبًا ما يحتاج كل من تقديم البيانات واكتشاف الدُفعات إلى نفس المجموعة في الوقت نفسه. يتطلب تقييم نموذج A/B، وإزالة التكرار على نطاق واسع، والتحقق من صحة البيانات المضافة لاحقًا، والتراجع إلى إصدار سابق، جميعها عرضًا مستقرًا للمجموعة بينما لا تزال عمليات الكتابة جارية.</p>
<p>تُنشئ اللقطة عرضًا في وقت محدد وقراءة فقط للمجموعة من خلال الإشارة إلى الشرائح الموجودة بدلاً من نسخ البيانات، وبالتالي تكون تكلفة التخزين الهامشية قريبة من الصفر. يمكن للمهام الدفعية القراءة من اللقطة في ظل عزل على غرار MVCC بينما تستمر المجموعة الحية في قبول عمليات الكتابة.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/snapshots.md">«اللقطات</a>» <a href="/docs/ar/manage-snapshots.md">و«إدارة اللقطات</a>» و <a href="/docs/ar/snapshot-use-cases.md">«حالات استخدام اللقطات</a>».</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">ترتيب الاستعلامات/عمليات البحث</h4><p>يقبل كل من البحث والاستعلام الآن الترتيب متعدد الحقول، مع نقل عملية الفرز إلى نواة Milvus وإمكانية ضبط « <code translate="no">ASC</code> » و« <code translate="no">DESC</code> » لكل حقل على حدة. وهذا يسد فجوة شائعة في الإنتاج: غالبًا ما لا يتوافق ترتيب «Top-K» حسب المسافة وحدها مع احتياجات العمل عندما لا يكون العنصر الأكثر تشابهًا هو الأرخص أو الأحدث أو الأكثر شعبية.</p>
<p>لم تعد التطبيقات مضطرة إلى استرداد نتائج أكثر من اللازم وإعادة الفرز على جانب العميل لتقديم ترتيب مركب.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«فرز نتائج البحث حسب الحقول القياسية</a> » <a href="/docs/ar/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">و«فرز نتائج الاستعلام</a>».</p>
<h4 id="Query-Aggregation" class="common-anchor-header">تجميع الاستعلامات</h4><p>كان إنتاج إحصائيات توزيع المستأجرين، أو أعداد اكتمال الحقول، أو تقدم طرح الإصدارات من مجموعة Milvus يتطلب في السابق سحب الكيانات المطابقة إلى العميل وتجميعها هناك. يدفع Milvus 3.0 التجميع القياسي على غرار SQL إلى النواة. يقبل استدعاء الاستعلام التجميعات القياسية ( <code translate="no">group_by_fields</code> ) وتعبيرات التجميع في صيغة SQL ( <code translate="no">output_fields</code>)، بما في ذلك التجميعات القياسية ( <code translate="no">count(*)</code>)، والتجميعات المركبة ( <code translate="no">count(&lt;field&gt;)</code>)، والتجميعات المركبة ذات القيم ( <code translate="no">sum(&lt;field&gt;)</code>)، والتجميعات المركبة ذات القيم ( <code translate="no">avg(&lt;field&gt;)</code>)، والتجميعات المركبة ذات القيم ( <code translate="no">min(&lt;field&gt;)</code>)، والتجميعات المركبة ذات القيم ( <code translate="no">max(&lt;field&gt;)</code>). يتم تقييم التجميع من جانب الخادم بعد التصفية.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">«تجميع نتائج الاستعلام</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">المتجه الفارغ</h4><p>غالبًا ما يتم إنتاج التضمينات بشكل غير متزامن، لذا قد تصل الكيانات قبل وصول متجهاتها. تحتوي البيانات متعددة الوسائط أيضًا على فجوات طبيعية، مثل مقطع فيديو بدون تسميات توضيحية أو منتج بدون صورة. لم تكن الإصدارات السابقة تمتلك حلًا جيدًا: فقد كانت التطبيقات إما تؤخر الكتابة حتى يصبح المتجه جاهزًا أو تملأ متجهًا مؤقتًا، وكلا الخيارين يضر بجودة الاسترجاع.</p>
<p>يدعم Milvus 3.0 القيمة NULL في حقول المتجهات عبر جميع أنواع المتجهات الستة. يتخطى البحث المتجهات ذات القيمة NULL تلقائيًا، ولا تتأثر جودة الاسترجاع، كما أن المتجهات ذات القيمة NULL لا تشغل أي مساحة تخزين فعليًا. يمتد «التجميع التلقائي» ( <code translate="no">AddField</code> ) أيضًا إلى حقول المتجهات في ظل هذا التغيير: باستخدام «التجميع التلقائي» ( <code translate="no">nullable=True</code>)، يمكن لمجموعة (Collection) موجودة بالفعل إضافة حقول متجهات جديدة عبر الإنترنت دون الحاجة إلى إعادة البناء.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/nullable-and-default.md">«الحقول القابلة للقيمة NULL</a>».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">القاموس المخصص وقاموس المرادفات</h4><p>لا تلبي أدوات تحليل الرموز الجاهزة دائمًا متطلبات جودة البحث في بيئة الإنتاج. يمكن أن تستفيد اللغة الصينية والمجالات المتخصصة مثل الطب والقانون والكيمياء والمجموعات النصية متعددة اللغات بشكل كبير من القواميس المخصصة وجداول المرادفات. حتى الآن، كانت هذه الموارد موجودة في الغالب كعمليات إعادة كتابة للاستعلامات من جانب التطبيق.</p>
<p>يضيف Milvus 3.0 آلية FileResource لتسجيل قواميس أدوات التقطيع المخصصة وقوائم المرادفات وقوائم الكلمات الممنوعة وقواعد تفكيك المركبات. بمجرد التسجيل، يمكن الرجوع إلى المورد من أي أداة تجزئة أو مرشح، ويصبح ساري المفعول على BM25 والمحللات ووظيفة «Text Match». يمكن الآن إصدار إصدارات من القواميس والمرادفات وإدارتها مركزيًا بدلاً من توزيعها عبر كود التطبيق.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/manage-file-resources.md">«إدارة موارد الملفات</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">مدة صلاحية الكيان (TTL)</h4><p>تعد مدة صلاحية الكيان (TTL) على مستوى المجموعة ومستوى القسم غير دقيقة بما يكفي للعديد من سيناريوهات دورة الحياة والامتثال. غالبًا ما يكون للمستأجرين المختلفين داخل نفس المجموعة قواعد احتفاظ مختلفة، وقد تحتاج الكيانات الفردية إلى انتهاء صلاحيتها وفقًا لجدول زمني لا يتطابق مع بقية المجموعة.</p>
<p>يدعم Milvus 3.0 مدة الصلاحية (TTL) لكل كيان على حدة. قم بتعريف حقل « <code translate="no">TIMESTAMPTZ</code> » في المخطط، وقم بتمييزه كحقل TTL من خلال خاصية المجموعة، وسيقوم Milvus باستعادة الكيانات منتهية الصلاحية تلقائيًا. ويشمل ذلك طلبات «الحق في النسيان»، وبيانات الجلسة منتهية الصلاحية، وسجل المحادثات المحدود دون الحاجة إلى التنظيف من جانب التطبيق.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">«تعيين مدة صلاحية (TTL) على مستوى الكيان</a>».</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>أضاف Milvus 2.6 فهرس <code translate="no">MINHASH_LSH</code> للكشف عن التكرارات شبه المتطابقة القائمة على المجموعات، ولكن كان لا يزال يتعين على التطبيقات حساب توقيعات MinHash قبل كتابة البيانات في Milvus.</p>
<p>يضيف Milvus 3.0 وظيفة MinHash من جانب الخادم. قم بتعريف حقل إدخال <code translate="no">VARCHAR</code> وحقل إخراج <code translate="no">BINARY_VECTOR</code> في المخطط، وأرفق وظيفة <code translate="no">FunctionType.MINHASH</code> ، وسيقوم Milvus بحساب التوقيعات أثناء الإدراج والإدراج المجمع والبحث. جنبًا إلى جنب مع <code translate="no">MINHASH_LSH</code> ، يدعم هذا سير عمل إزالة التكرار لمجموعات البيانات الكبيرة، وأخذ البصمات، وكشف الانتحال داخل Milvus.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/minhash-function.md">دالة MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>لم يعد الافتراض القائل بـ «كيان واحد = متجه واحد» مناسبًا لعمليات الاسترجاع الحديثة. يتم تقسيم المستندات الطويلة إلى أجزاء عديدة، وتصدر نماذج التفاعل المتأخر مثل ColBERT متجهًا واحدًا لكل رمز، ويمكن للكيانات متعددة الوسائط أن تحمل عدة طرق عرض.</p>
<p>يخزن EmbList قائمة متجهات ذات طول متغير لكل كيان، مع استخدام " <code translate="no">DISKANN</code> " كفهرس على القرص. يعمل مسار القرص على التحكم في استخدام ذاكرة الوصول العشوائي (RAM) عندما يتجاوز حجم المجموعة ميزانية الذاكرة. يُعد EmbList + <code translate="no">DISKANN</code> أول متغير من عائلة StructList الأوسع نطاقًا في هذا الإصدار التجريبي (RC). أما باقي العائلة، بما في ذلك تصفية StructList وتسريع المتجهات المتعددة في Muvera / Lemur، فمن المقرر تضمينها في الإصدار الرسمي 3.0.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/search-with-embedding-lists.md">البحث باستخدام قوائم التضمين</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">الدمج القسري</h4><p>تتراكم تجزئة المقاطع في أحمال العمل الإنتاجية بمرور الوقت، مما يتسبب في تقلب زمن استجابة الاستعلامات وزيادة حجم التخزين.</p>
<p>يضيف Milvus 3.0 القدرة على تشغيل ضغط المقاطع بشكل صريح خلال فترات خارج أوقات الذروة، في كل من الوضعين المتزامن وغير المتزامن.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/force-merge.md">«إجبار ضغط الدمج</a>».</p>
<h4 id="Storage-V3" class="common-anchor-header">التخزين V3</h4><p>يقدم Milvus 3.0 التخزين V3، وهو محرك تخزين عمودي قائم على البيانات التعريفية، حيث تُخزّن البيانات والبيانات التعريفية على تخزين كائنات متوافق مع S3. يتم تسجيل كل إصدار من مجموعات البيانات كلقطة بيانات تعريفية ثابتة، وهي ملف مشفر بتنسيق Avro يسجل مجموعات الأعمدة وسجلات التغييرات والإحصائيات التي تتكون منها مجموعة البيانات.</p>
<p>قوائم البيانات هي ملفات Avro مضغوطة، وتسجل سجلات التغييرات عمليات الحذف على مستوى الكيانات دون إعادة كتابة ملفات البيانات. وهذا يحافظ على انخفاض عبء البيانات الوصفية مع نمو مجموعات البيانات. كما تفصل قائمة البيانات تتبع البيانات الوصفية عن مسار الاستعلام، مما يسمح للمجموعة (Collection) بإدارة المزيد من الشرائح دون الإضرار بأداء الاستعلام.</p>
<p>ونظرًا لأن الحالات يتم تخزينها على وحدة تخزين الكائنات، فإن مجموعة البيانات تكون ذاتية الوصف: يمكن لأي قارئ لديه حق الوصول إلى مسار التخزين اكتشافها وتفسيرها دون الحاجة إلى كتالوج مركزي. وتدعم هذه الخاصية تكامل «المجموعة الخارجية» و«اللقطات» وعمليات تكامل بحيرات البيانات المستقبلية.</p>
