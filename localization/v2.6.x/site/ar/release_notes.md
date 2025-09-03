---
id: release_notes.md
summary: ملاحظات الإصدار ميلفوس
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
    </button></h1><p>اكتشف الجديد في Milvus! تلخص هذه الصفحة الميزات الجديدة والتحسينات والمشاكل المعروفة وإصلاحات الأخطاء في كل إصدار. يمكنك العثور على ملاحظات الإصدار لكل إصدار تم إصداره بعد الإصدار 2.6.0 في هذا القسم. نقترح عليك زيارة هذه الصفحة بانتظام للتعرف على التحديثات.</p>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 3 سبتمبر 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار Milvus 2.6.1! يعتمد هذا الإصدار على التحسينات المعمارية الرئيسية للإصدارات السابقة، ويقدم تحسينات مهمة تركز على استقرار الإنتاج والأداء والمتانة التشغيلية. يعالج هذا الإصدار ملاحظات المجتمع الرئيسية ويعزز النظام لعمليات النشر واسعة النطاق. نشجع جميع المستخدمين بشدة على الترقية للاستفادة من نظام أكثر استقراراً وأداءً وموثوقية.</p>
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
<li>دعم أنظمة الملفات المتوافقة مع POSIX للتخزين عن بُعد<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>تقديم أدوات إعادة الترتيب المستندة إلى النموذج<a href="https://github.com/milvus-io/milvus/pull/43270">(43270/4</a>)</li>
<li>تحسين أداء تعبيرات المقارنة على حقول المفاتيح الأساسية<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>يجمع doc_id من قائمة الترحيل مباشرةً لتسريع مطابقة النص<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>يحسن أداء الاستعلام عن طريق تحويل عدة شروط != إلى شرط واحد ليس في<a href="https://github.com/milvus-io/milvus/pull/43690">(# 43690</a>)</li>
<li>تحسين إدارة الموارد لطبقة التخزين المؤقت أثناء تحميل المقطع<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>يحسن تقدير الذاكرة للفهارس المؤقتة أثناء تحميل البيانات<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>يجعل نسبة البناء للفهارس المؤقتة قابلة للتكوين<a href="https://github.com/milvus-io/milvus/pull/43939">(# 4393939</a>)</li>
<li>يضيف حد معدل كتابة قابل للتكوين لكاتب القرص<a href="https://github.com/milvus-io/milvus/pull/43912">(# 43912</a>)</li>
<li>يمكن الآن تحديث معلمات SegCore ديناميكيًا دون إعادة تشغيل خدمة Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>يضيف مقاييس موحدة لزمن انتقال gRPC لتحسين إمكانية المراقبة<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>تضمين الطوابع الزمنية لطلب العميل في رؤوس gRPC لتبسيط تصحيح الأخطاء<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>يدعم مستوى سجل التتبع ل segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>يضيف مفتاح تبديل قابل للتكوين لضبط ضمانات الاتساق من أجل توافر أعلى<a href="https://github.com/milvus-io/milvus/pull/43874">(# 43874</a>)</li>
<li>ينفذ آلية إعادة مراقبة قوية للتعامل مع حالات فشل اتصال إلخd<a href="https://github.com/milvus-io/milvus/pull/43829">(# 43829</a>)</li>
<li>تحسين منطق التحقق من صحة العقدة الداخلية<a href="https://github.com/milvus-io/milvus/pull/43768">(43768/4</a>)</li>
<li>تحسين الوصول إلى البيانات الوصفية عند إدراج المجموعات<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>ترقية عميل Pulsar إلى الإصدار الرسمي 0.15.1 وإضافة المزيد من التسجيل<a href="https://github.com/milvus-io/milvus/pull/43913">(# 43913</a>)</li>
<li>ترقية aws-sdk من 1.9.234 إلى 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(# 43916</a>)</li>
<li>يدعم تحديثات الفواصل الزمنية الديناميكية لمكونات المؤشر<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>يحسِّن الاكتشاف التلقائي لمجموعات تعليمات ARM SVE لعمليات مجموعة البتات<a href="https://github.com/milvus-io/milvus/pull/43833">(43833/4</a>)</li>
<li>تحسين رسالة الخطأ عند فشل مطابقة نص أو عبارة<a href="https://github.com/milvus-io/milvus/pull/43366">(43366/4</a>)</li>
<li>يحسن رسالة الخطأ عند عدم تطابق أبعاد المتجهات<a href="https://github.com/milvus-io/milvus/pull/43835">(43835/4</a>)</li>
<li>يحسّن الإبلاغ عن الخطأ عند انتهاء مهلة الإلحاق عندما يكون مخزن الكائنات غير متوفر<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاح الأخطاء<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>إصلاح مشكلة محتملة في نفاد الذاكرة (OOM) أثناء عمليات استيراد ملفات الباركيه<a href="https://github.com/milvus-io/milvus/pull/43756">(43756/43756</a>)</li>
<li>إصلاح مشكلة تعذر استرداد العقد الاحتياطية إذا انتهت صلاحية عقد الإيجار<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>يعالج حالة إعادة محاولة الضغط بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>إصلاح حالة الجمود المحتملة بين طلبات القراءة المستمرة وتحميل الفهرس التي قد تمنع تحميل الفهرس<a href="https://github.com/milvus-io/milvus/pull/43937">(# 43937</a>)</li>
<li>إصلاح الخلل الذي قد يتسبب في فشل عمليات حذف البيانات في سيناريوهات عالية التكرار<a href="https://github.com/milvus-io/milvus/pull/43831">(# 43831</a>)</li>
<li>إصلاح حالة سباق محتملة عند تحميل فهارس النصوص وفهارس JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>إصلاح عدم اتساق حالة العقدة التي قد تحدث بعد إعادة تشغيل QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>يضمن تنظيف عقدة الاستعلام "المتسخة" بشكل صحيح بعد إعادة التشغيل<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>يعمل على إصلاح مشكلة عدم معالجة حالة إعادة المحاولة بشكل صحيح للطلبات ذات الحمولات غير الفارغة<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>إصلاح مشكلة عدم استخدام الكاتب المجمّع v2 لاسم الدلو الصحيح<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>تحسين الأمان عن طريق إخفاء العناصر الحساسة من نقطة نهاية RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>التأكد من أن عمليات تحميل الكائنات لنقار الخشب تكون خاملة أثناء محاولات إعادة المهلة<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>عدم السماح باستيراد عناصر فارغة في حقول المصفوفات من ملفات الباركيه<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>إصلاح الخلل حيث لم يتم إبطال ذاكرة التخزين المؤقت للوكيل بعد إنشاء اسم مستعار للمجموعة<a href="https://github.com/milvus-io/milvus/pull/43854">(43854/4</a>)</li>
<li>تحسين آلية اكتشاف الخدمة الداخلية للعقد المتدفقة<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>إصلاح منطق مجموعة الموارد لتصفية عقد التدفق بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>يضيف تسمية اسم قاعدة البيانات إلى المقاييس لمنع تعارض التسمية في بيئات قواعد البيانات المتعددة<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>يعمل على إصلاح خطأ منطقي في معالجة حالة المهام الداخلية<a href="https://github.com/milvus-io/milvus/pull/43777">(43777/4</a>)</li>
<li>يحسن توقيت تهيئة المقاييس الداخلية لتجنب الذعر المحتمل<a href="https://github.com/milvus-io/milvus/pull/43773">(43773/4373</a>)</li>
<li>إصلاح تعطل محتمل نادر في خادم HTTP الداخلي<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 6 أغسطس 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>تم إصدار Milvus 2.6.0 رسميًا! بناءً على الأساس المعماري الذي تم وضعه في <a href="#v260-rc1">الإصدار 2.6.0-rc1،</a> يعالج هذا الإصدار الجاهز للإنتاج العديد من مشكلات الاستقرار والأداء مع تقديم إمكانات جديدة قوية بما في ذلك تنسيق التخزين V2 ومعالجة JSON المتقدمة وميزات البحث المحسنة. مع إصلاحات شاملة للأخطاء والتحسينات المستندة إلى ملاحظات المجتمع خلال مرحلة RC، أصبح الإصدار Milvus 2.6.0 جاهزًا للاستكشاف والاعتماد.</p>
<div class="alert warning">
<p>الترقية المباشرة من إصدارات ما قبل الإصدار 2.6.0 غير مدعومة بسبب التغييرات المعمارية. يرجى اتباع <a href="/docs/ar/upgrade_milvus_cluster-operator.md">دليل الترقية</a> الخاص بنا.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">ما الجديد في 2.6.0 (منذ RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">تنسيق التخزين المُحسَّن الإصدار 2</h4><p>لمعالجة تحديات تخزين البيانات القياسية والمتجهة المختلطة، وخاصةً عمليات البحث النقطية على البيانات غير المهيكلة، يقدم Milvus 2.6 تنسيق التخزين V2. يتبنى تنسيق التخزين العمودي التكيفي الجديد هذا استراتيجية تخطيط "دمج الأعمدة الضيقة + استقلالية الأعمدة العريضة"، مما يحل بشكل أساسي اختناقات الأداء عند التعامل مع عمليات البحث النقطية وعمليات الاسترجاع ذات الدُفعات الصغيرة في قواعد البيانات المتجهة.</p>
<p>يدعم التنسيق الجديد الآن الوصول العشوائي الفعال دون تضخيم الإدخال/الإخراج ويحقق مكاسب في الأداء تصل إلى 100 ضعف مقارنةً بتنسيق Parquet الفانيليا المعتمد سابقاً، مما يجعله مثالياً لأعباء عمل الذكاء الاصطناعي التي تتطلب كلاً من المعالجة التحليلية واسترجاع المتجهات الدقيقة. بالإضافة إلى ذلك، يمكنه تقليل عدد الملفات بنسبة تصل إلى 98% لأحمال العمل النموذجية. يتم تقليل استهلاك الذاكرة للضغط الرئيسي بنسبة 300%، ويتم تحسين عمليات الإدخال/الإخراج بنسبة تصل إلى 80% للقراءة وأكثر من 600% للكتابة.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">فهرس JSON المسطح (تجريبي)</h4><p>يقدم Milvus 2.6 فهرس JSON Flat Index للتعامل مع مخططات JSON الديناميكية للغاية. على عكس فهرس مسار JSON الذي يتطلب الإعلان المسبق عن مسارات محددة وأنواعها المتوقعة، يكتشف فهرس JSON Flat Index تلقائيًا جميع البنى المتداخلة تحت مسار معين ويفهرسها. عند فهرسة حقل JSON، يقوم الفهرس بتسوية الشجرة الفرعية بأكملها بشكل متكرر، مما يؤدي إلى إنشاء إدخالات فهرس مقلوبة لكل زوج من قيمة المسار الذي يواجهه، بغض النظر عن العمق أو النوع. هذا التسطيح التلقائي يجعل الفهرس المسطح التلقائي JSON Flat Index مثاليًا للمخططات المتطورة حيث تظهر حقول جديدة دون سابق إنذار. على سبيل المثال، إذا قمت بفهرسة حقل "البيانات الوصفية"، فسيتعامل النظام تلقائيًا مع الحقول المتداخلة الجديدة مثل "metadata.version2.features.experimental" عند ظهورها في البيانات الواردة، دون الحاجة إلى تكوين فهرس جديد.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">استدعاء ميزات الإصدار 2.6.0 الأساسية<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>للحصول على معلومات مفصلة حول التغييرات في البنية والميزات المقدمة في 2.6.0-RC، راجع <a href="#v260-rc1">مذكرة الإصدار 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">تبسيط البنية</h4><ul>
<li>عقدة التدفق (GA) - إدارة WAL المركزية</li>
<li>WAL الأصلي مع نقار الخشب - إزالة تبعية كافكا/بولسار</li>
<li>المنسقين الموحدين (MixCoord)؛ دمج عقدة الفهرس وعقدة البيانات - تقليل تعقيد المكونات</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">البحث والتحليلات</h4><ul>
<li>تكميم RaBitQ 1 بت مع استرجاع عالٍ</li>
<li>مطابقة العبارات</li>
<li>MinHash LSH لإلغاء البيانات المكررة</li>
<li>وظائف الترتيب المدركة للوقت</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">تجربة المطور</h4><ul>
<li>تضمين وظائف لسير عمل "إدخال البيانات وإخراجها"</li>
<li>تطوير المخطط عبر الإنترنت</li>
<li>دعم متجه INT8</li>
<li>رموز محسّنة لدعم اللغة العالمية</li>
<li>طبقة التخزين المؤقت مع التحميل البطيء - معالجة مجموعات البيانات الأكبر من الذاكرة</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">الإصدار 2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 18 يونيو 2025</p>
<table>
<thead>
<tr><th style="text-align:center">إصدار ميلفوس</th><th style="text-align:center">إصدار Python SDK</th><th style="text-align:center">إصدار Node.js SDK</th><th style="text-align:center">إصدار Java SDK</th><th style="text-align:center">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">الإصدار 2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0.0-rc.1</td></tr>
</tbody>
</table>
<p>يقدم الإصدار 2.6.0-rc1 من Milvus 2.6.0-rc1 بنية مبسطة وأصلية للسحابة مصممة لتحسين الكفاءة التشغيلية واستخدام الموارد والتكلفة الإجمالية للملكية من خلال تقليل تعقيدات النشر. يضيف هذا الإصدار وظائف جديدة تركز على الأداء والبحث والتطوير. تتضمن الميزات الرئيسية التكميم عالي الدقة 1 بت (RaBitQ) وطبقة ذاكرة تخزين مؤقت ديناميكية لتحقيق مكاسب في الأداء، واكتشاف التكرار القريب من التكرار باستخدام MinHash ومطابقة دقيقة للعبارات للبحث المتقدم، ووظائف التضمين التلقائي مع تعديل المخطط عبر الإنترنت لتحسين تجربة المطور.</p>
<div class="alert note">
<p>هذه نسخة ما قبل الإصدار من Milvus 2.6.0. لتجربة أحدث الميزات، قم بتثبيت هذا الإصدار كنشر جديد. الترقية من Milvus v2.5.x أو إصدار سابق إلى 2.6.0-rc1 غير مدعومة.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">تغييرات البنية<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>منذ الإصدار 2.6، أدخلت Milvus تغييرات معمارية مهمة تهدف إلى تحسين الأداء وقابلية التوسع وسهولة الاستخدام. لمزيد من المعلومات، راجع <a href="/docs/ar/architecture_overview.md">نظرة عامة</a> على <a href="/docs/ar/architecture_overview.md">نظرة عامة على بنية Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">عقدة التدفق (GA)</h4><p>في الإصدارات السابقة، كان يتم كتابة البيانات المتدفقة إلى WAL بواسطة الوكيل، وقراءتها بواسطة QueryNode وDataNode. جعلت هذه البنية من الصعب تحقيق الإجماع على جانب الكتابة، مما تطلب منطقًا معقدًا على جانب القراءة. بالإضافة إلى ذلك، تم وضع مفوض الاستعلام في QueryNode، مما أعاق قابلية التوسع. قدم الإصدار 2.5.0 من Milvus 2.5.0 عقدة التدفق، والتي أصبحت GA في الإصدار 2.6.0. هذا المكون مسؤول الآن عن جميع عمليات قراءة/كتابة WAL على مستوى السرداب ويعمل أيضًا كمفوض استعلام، مما أدى إلى حل المشكلات المذكورة أعلاه وتمكين التحسينات الجديدة.</p>
<p><strong>إشعار ترقية مهم</strong>: يعد تدفق العقدة تغييرًا معماريًا كبيرًا، لذا لا يتم دعم الترقية المباشرة إلى Milvus 2.6.0-rc1 من الإصدارات السابقة.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">وودبيكر الأصلي WAL</h4><p>اعتمد ميلفوس سابقًا على أنظمة خارجية مثل Kafka أو Pulsar في نظام WAL الخاص به. وعلى الرغم من أن هذه الأنظمة كانت فعالة، إلا أنها أضافت تعقيدًا تشغيليًا كبيرًا ونفقات زائدة على الموارد، خاصةً بالنسبة لعمليات النشر الصغيرة والمتوسطة الحجم. في الإصدار Milvus 2.6، تم استبدال هذه الأنظمة ب Woodpecker، وهو نظام WAL مصمم خصيصًا للسحابة. صُمم Woodpecker لتخزين الكائنات، حيث يدعم كلاً من وضعي التخزين المحلي وتخزين الكائنات القائم على التخزين الصفري القائم على التخزين المحلي، مما يبسط العمليات مع تحسين الأداء وقابلية التوسع.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">دمج عقدة البيانات وعقدة الفهرس</h4><p>في الإصدار Milvus 2.6، تتم الآن إدارة مهام مثل الضغط والاستيراد الجماعي وجمع الإحصائيات وبناء الفهرس بواسطة جدولة موحدة. تم نقل وظيفة ثبات البيانات التي كانت تتم معالجتها سابقًا بواسطة DataNode إلى عقدة التدفق. لتبسيط عملية النشر والصيانة، تم دمج عقدة الفهرس وعقدة البيانات في مكون DataNode واحد. تقوم هذه العقدة المدمجة الآن بتنفيذ جميع هذه المهام الحرجة، مما يقلل من التعقيد التشغيلي ويحسن استخدام الموارد.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">دمج المنسق في MixCoord</h4><p>أدى التصميم السابق مع وحدات RootCoord وCuord الاستعلام وDataCoord المنفصلة إلى تعقيد الاتصال بين الوحدات. لتبسيط تصميم النظام، تم دمج هذه المكونات في منسق واحد موحد يسمى MixCoord. يقلل هذا الدمج من تعقيد البرمجة الموزعة عن طريق استبدال الاتصال القائم على الشبكة باستدعاءات الدالة الداخلية، مما يؤدي إلى تشغيل النظام بشكل أكثر كفاءة وتبسيط التطوير والصيانة.</p>
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">التكميم الكمي RaBitQ 1 بت</h4><p>للتعامل مع مجموعات البيانات واسعة النطاق، يعد التكميم 1 بت تقنية فعالة لتحسين استخدام الموارد وأداء البحث. ومع ذلك، يمكن أن تؤثر الطرق التقليدية سلبًا على الاستدعاء. بالتعاون مع مؤلفي البحث الأصليين، يقدم Milvus 2.6 حل RaBitQ، وهو حل تكميم 1 بت يحافظ على دقة استرجاع عالية مع توفير مزايا الموارد والأداء لضغط 1 بت.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">تحسين قدرة JSON</h4><p>يعزز Milvus 2.6 دعمه لنوع بيانات JSON بالتحسينات التالية:</p>
<ul>
<li><strong>الأداء</strong>: يتم الآن دعم فهرسة مسار JSON رسميًا، مما يسمح بإنشاء فهارس مقلوبة على مسارات محددة داخل كائنات JSON (على سبيل المثال، <code translate="no">meta.user.location</code>). هذا يتجنب عمليات المسح الكامل للكائنات ويحسن من زمن الاستجابة للاستعلامات ذات الفلاتر المعقدة.</li>
<li><strong>الوظيفة</strong>: لدعم منطق التصفية الأكثر تعقيدًا، يضيف هذا الإصدار دعمًا لوظائف <code translate="no">JSON_CONTAINS</code> و <code translate="no">JSON_EXISTS</code> و <code translate="no">IS NULL</code> و <code translate="no">CAST</code>. بالنظر إلى المستقبل، يستمر عملنا على دعم JSON. نحن متحمسون لمعاينة أن الإصدارات الرسمية القادمة ستتميز بقدرات أكثر قوة، مثل <strong>تمزيق J</strong> SON <strong>وفهرس JSON FLAT،</strong> المصمم لتحسين الأداء بشكل كبير على بيانات JSON المتداخلة للغاية.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">تحسين وظيفة المحلّل/الترميز</h4><p>يعزّز هذا الإصدار قدرات معالجة النصوص بشكل كبير مع العديد من التحديثات التي أُدخلت على وظيفتي المحلل والمُرمِّز:</p>
<ul>
<li>تتوفر صيغة جديدة <a href="/docs/ar/analyzer-overview.md#Example-use">لمحلل التشغيل</a> للتحقق من صحة تكوينات أداة الترميز.</li>
<li>تم دمج <a href="/docs/ar/lindera-tokenizer.md">أداة ترميز لينديرا</a> لتحسين دعم اللغات الآسيوية مثل اليابانية والكورية.</li>
<li>يتم الآن دعم اختيار أداة الترميز على مستوى الصف، مع توفر <a href="/docs/ar/icu-tokenizer.md">أداة الترميز</a> للأغراض العامة <a href="/docs/ar/icu-tokenizer.md">لوحدة الترميز ICU</a> كخيار احتياطي لسيناريوهات متعددة اللغات.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">إدخال البيانات وإخراج البيانات مع وظائف التضمين</h4><p>يقدّم الإصدار Milvus 2.6 إمكانية "إدخال البيانات وإخراج البيانات" التي تبسّط تطوير تطبيقات الذكاء الاصطناعي من خلال التكامل مباشرةً مع نماذج التضمين من طرف ثالث (على سبيل المثال، من OpenAI وAWS Bedrock وGoogle Vertex AI وHugging Face). يمكن للمستخدمين الآن الإدراج والاستعلام باستخدام بيانات نصية أولية، وسيقوم Milvus تلقائيًا باستدعاء خدمة النموذج المحدد لتحويل النص إلى متجهات في الوقت الفعلي. هذا يزيل الحاجة إلى خط أنابيب تحويل متجهات منفصل.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/embedding-function-overview.md">نظرة عامة</a> على <a href="/docs/ar/embedding-function-overview.md">وظيفة التضمين</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">مطابقة العبارة</h4><p>Phrase Match هي ميزة بحث نصية تقوم بإرجاع النتائج فقط عندما يظهر التسلسل الدقيق للكلمات في الاستعلام بشكل متتابع وبالترتيب الصحيح داخل المستند.</p>
<p><strong>الخصائص الرئيسية</strong>:</p>
<ul>
<li>حساس للترتيب: يجب أن تظهر الكلمات بنفس الترتيب الوارد في الاستعلام.</li>
<li>مطابقة متتالية: يجب أن تظهر الكلمات بجانب بعضها البعض مباشرةً، ما لم يتم استخدام قيمة انحدار.</li>
<li>منحدر (اختياري): معلمة قابلة للضبط تسمح بوجود عدد قليل من الكلمات المتداخلة، مما يتيح مطابقة العبارات بشكل غير واضح.</li>
</ul>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/phrase-match.md">مطابقة العبارة</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">مؤشر MinHash LSH (بيتا)</h4><p>لتلبية الحاجة إلى إلغاء البيانات المكررة في تدريب النموذج، يضيف Milvus 2.6 دعمًا لفهارس MINHASH_LSH. توفر هذه الميزة طريقة فعالة حسابيًا وقابلة للتطوير لتقدير تشابه Jaccard بين المستندات لتحديد التكرارات شبه المكررة. يمكن للمستخدمين إنشاء تواقيع MinHash_LSH لمستنداتهم النصية أثناء المعالجة المسبقة واستخدام فهرس MINHASH_LSH في Milvus للعثور بكفاءة على محتوى متشابه في مجموعات البيانات واسعة النطاق، مما يحسن من تنظيف البيانات وجودة النموذج.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">وظائف الاضمحلال الواعية بالوقت</h4><p>يقدّم الإصدار Milvus 2.6 وظائف الاضمحلال المدرك للوقت لمعالجة السيناريوهات التي تتغير فيها قيمة المعلومات بمرور الوقت. أثناء إعادة تصنيف النتائج، يمكن للمستخدمين تطبيق دوال التضاؤل الأسي أو الغوسي أو الخطي بناءً على حقل الطابع الزمني لضبط درجة أهمية المستند. يضمن ذلك إعطاء الأولوية للمحتوى الأحدث، وهو أمر بالغ الأهمية لتطبيقات مثل موجز الأخبار والتجارة الإلكترونية وذاكرة وكيل الذكاء الاصطناعي.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/decay-ranker-overview.md">نظرة عامة</a> على <a href="/docs/ar/decay-ranker-overview.md">نظرة عامة على مصنف الاضمحلال</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">إضافة حقل لتطور المخطط عبر الإنترنت</h4><p>لتوفير مرونة أكبر في المخطط، يدعم Milvus 2.6 الآن إضافة حقل قياسي جديد إلى مخطط مجموعة موجودة على الإنترنت. وهذا يتجنب الحاجة إلى إنشاء مجموعة جديدة وإجراء عملية ترحيل بيانات معطلة عند تغيير متطلبات التطبيق.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/add-fields-to-an-existing-collection.md">إضافة حقول إلى مجموعة موجودة</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">دعم متجه INT8</h4><p>استجابةً للاستخدام المتزايد للنماذج الكمية التي تنتج تضمينات 8 بت من الأعداد الصحيحة، يضيف الإصدار Milvus 2.6 دعم نوع البيانات الأصلي لمتجهات INT8. يسمح ذلك للمستخدمين باستيعاب هذه المتجهات مباشرةً دون إلغاء التكافؤ، مما يوفر تكاليف الحساب وعرض النطاق الترددي للشبكة وتكاليف التخزين. هذه الميزة مدعومة مبدئيًا لفهارس عائلة HNSW.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/dense-vector.md">المتجهات الكثيفة</a>.</p>
