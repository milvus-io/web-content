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
    </button></h1><p>اكتشف الجديد في Milvus! تلخص هذه الصفحة الميزات الجديدة والتحسينات والمشاكل المعروفة وإصلاحات الأخطاء في كل إصدار. يمكنك العثور على ملاحظات الإصدار لكل إصدار تم إصداره بعد الإصدار 2.5.0 في هذا القسم. نقترح عليك زيارة هذه الصفحة بانتظام للتعرف على التحديثات.</p>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار جافا SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار Milvus 2.5.11! يقدم هذا الإصدار ميزات جديدة وقوية مثل إمكانية التحليل المتعدد ودعم موسع للرموز (جيبا، لينديرا، وحدة المعالجة المركزية، معرف اللغة). لقد أجرينا أيضًا العديد من التحسينات، بما في ذلك تحديثات تجمع مؤشرات ترابط تحميل المقاطع الديناميكية وتصفية الحذف المحسّنة أثناء عمليات استيراد مدونة البيانات. تعالج إصلاحات الأخطاء الرئيسية مشكلات إسقاط المقاطع المحتملة وفشل البحث في BM25 وأخطاء تصفية إحصائيات JSON.</p>
<p>نشجعك على الترقية إلى 2.5.11 للاستفادة من هذه التحسينات والإصلاحات!</p>
<h3 id="Features" class="common-anchor-header">الميزات</h3><ul>
<li>إضافة القدرة على تكوين محللات متعددة (محللو الرموز) لدعم لغات متعددة واختيار المحلل المناسب بناءً على تعليمات بيانات الإدخال<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>تحسين وظيفة محلل BM25<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>تقديم واجهة برمجة تطبيقات <code translate="no">run_analyzer</code> للتشغيل الجاف للمساعدة في تحليل نتائج الترميز. لمزيد من المعلومات، ارجع إلى <a href="/docs/ar/analyzer-overview.md">نظرة عامة</a> على <a href="/docs/ar/analyzer-overview.md">المحلل</a>.</li>
<li>أدوات الترميز<ul>
<li>تمت إضافة دعم لتخصيص معلمات أداة الترميز Jieba.</li>
<li>إضافة دعم لمُرمِّز لينديرا. لمزيد من المعلومات، راجع <a href="/docs/ar/lindera-tokenizer.md">لينديرا</a>.</li>
<li>إضافة دعم لأداة الترميز ICU. لمزيد من المعلومات، راجع <a href="/docs/ar/icu-tokenizer.md">ICU</a>.</li>
<li>تمت إضافة أداة ترميز معرّف اللغة لاكتشاف اللغة.</li>
</ul></li>
<li>الفلاتر<ul>
<li>توسيع دعم اللغة لمرشح كلمات الإيقاف المدمج. لمزيد من المعلومات، ارجع إلى <a href="/docs/ar/stop-filter.md">إيقاف</a>.</li>
<li>تمت إضافة عامل تصفية <code translate="no">remove_punct</code> لإزالة علامات الترقيم. لمزيد من المعلومات، راجع <a href="/docs/ar/removepunct-filter.md">إزالة علامات الترقيم</a>.</li>
<li>تمت إضافة عامل تصفية <code translate="no">regex</code> لتصفية النص المستند إلى النمط. لمزيد من المعلومات، راجع <a href="/docs/ar/regex-filter.md">Regex</a>.</li>
</ul></li>
</ul></li>
<li>تمت إضافة دعم لتعديل السعة القصوى لحقول المصفوفات<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>تمت إضافة دعم لتعبيرات النطاق الثنائي في فهارس مسار JSON<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>تمت إضافة دعم لأنواع المطابقة اللواحق واللاحقة في إحصائيات JSON<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">تحسينات</h3><ul>
<li>تمكين التحديثات الديناميكية لحجم تجمّع مؤشرات ترابط تحميل الأجزاء<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>).</li>
<li>تسريع عملية تصفية الحذف أثناء استيراد مدونة البيانات<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>).</li>
<li>إضافة معلمات مراقبة لنسبة تصفية التعبير<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>إضافة خيار تكوين لفرض إعادة بناء الفهارس إلى أحدث إصدار<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>تحسين رسالة سجل الأخطاء لنهج القائمة<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>تعديل التعامل مع الواصلات في رؤوس البيانات الوصفية ل gRPC<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>ترقية إصدار Go المطور إلى 1.24.1 لمعالجة نقاط الضعف القابلة للتغيير<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522،</a> <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>إصلاح مشكلة عدم إسقاط المقاطع بشكل صحيح عند إسقاط قسم<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>تم إصلاح الإدراج المجمّع لاستخدام قائمة حقول الإدخال الخاصة بالوظيفة المشغلة بدلاً من قائمة حقول المخطط<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>).</li>
<li>إصلاح حالات فشل بحث BM25 التي تحدث عندما يكون <code translate="no">avgdl</code> (متوسط طول المستند) هو NaN<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>تم تصحيح التسميات غير الدقيقة في مقاييس QueryNode<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>تم إصلاح مشكلة فشل إنشاء فهرس إحصائيات JSON في حالة احتواء البيانات على خريطة فارغة<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>تم إصلاح واجهة برمجة التطبيقات <code translate="no">AlterCollection</code> لحفظ الطابع الزمني للتعديل بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li>إصلاح خطأ في التصفية المتقطعة في إحصائيات JSON ضمن <code translate="no">ConjunctExpr</code> وتحسين منطق حساب خانة المهمة لتسريع بناء إحصائيات JSON<a href="https://github.com/milvus-io/milvus/pull/41458">(# 41458</a>).</li>
<li>إصلاح تسرب IDF أوراكل في حساب إحصائيات BM25<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>تم التأكد من فحص المواضيع التي تم إنشاؤها مسبقًا أولاً أثناء التحقق من صحة رقم الجزء<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>).</li>
<li>تم إصلاح تقرير الجمود الخاطئ الذي يحدث في اختبارات الوحدة<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 21 أبريل 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>يقدم الإصدار Milvus 2.5.10 أداءً محسّنًا في البحث والتحميل، وتقارير محسّنة عن المقاييس، ودعم SVE الموسع لحساب المقاييس المتسارع. يتضمن هذا الإصدار أيضًا إصلاحات متعددة للأخطاء التي تعزز الثبات والصحة. نحن نشجعك على الترقية أو تجربته - فملاحظاتك لا تقدر بثمن في مساعدتنا على جعل Milvus أفضل!</p>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><ul>
<li>تجاهل الإبلاغ عن مقاييس الفهرس للفهارس غير الموجودة<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>استخدام وضع المسح ل LIKE حتى في حالة وجود فهرس مقلوب<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>تحسين الأداء لتعبيرات LIKE<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)</li>
<li>تحسين تنسيق الفهرس لتحسين أداء التحميل<a href="https://github.com/milvus-io/milvus/pull/41041">(# 41041</a>)</li>
<li>RESTful: جعل المهلة الافتراضية قابلة للتكوين<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)</li>
<li>تمكين دعم SVE لحساب متري L2 في دالات FP16 / نيويورك<a href="https://github.com/zilliztech/knowhere/pull/1134">(رقم 1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>إصلاح عدم عمل فهرس JSON لفلاتر السلاسل<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>تخطي التحقق من الأبعاد للحقول غير المتجهة في الفحص المسبق<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>تقوم مجموعة التغيير الآن بتحديث المخطط بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>تحديث إصدار knowhere لإصلاح إصدار macOS<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>منع الذعر عند إدراج الفهارس قبل اكتمال تهيئة فهرس المقطع<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>حل مشكلة تراجع الأداء بتغيير مستوى السجل<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>إغلاق العميل قبل إزالة العميل العامل<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 11 أبريل 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن الإصدار 2.5.9 من Milvus، الذي يجلب أداءً محسّنًا لإحصائيات مفاتيح JSON، وقدرات فهرسة محسّنة، والعديد من إصلاحات الأخطاء الهامة التي تعزز الاستقرار ومعالجة البيانات. نحن نشجعك على الترقية أو تجربة هذا الإصدار، وكما هو الحال دائمًا، نقدر ملاحظاتك بشكل كبير بينما نواصل تحسين Milvus.</p>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><ul>
<li>دعم تخطي تطبيع الدرجات لإعادة التصنيف الموزون<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>تحسين أداء بناء إحصائيات مفاتيح JSON عن طريق إضافة المستندات على دفعات<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>استخدام <code translate="no">int32</code> عند إنشاء فهارس المصفوفات لأنواع العناصر <code translate="no">int8</code>/<code translate="no">int16</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(# 41186</a>)</li>
<li>مواءمة نتائج بحث القوة الغاشمة مع سلوك فهرس JSON للتعبير <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(# 41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاح الأخطاء</h3><ul>
<li>إصلاح مشكلة تتسبب في حدوث ارتباك في معرف التتبع إذا أرسل العميل معرف تتبع<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>إصلاح تعطل محتمل بسبب الاستخدام غير الصحيح لـ <code translate="no">noexcept</code> ، مما يؤدي إلى فشل الإدخال والإخراج<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>تم حل حلقة الرصيد العادي اللانهائية التي تم تشغيلها بعد تعليق الرصيد<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>يدعم عرض المجموعات الآن الكائنات الممنوحة لمجموعات الامتيازات المخصصة<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>تم إصلاح فشل استرداد مواضع القنوات المتماثلة<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>تم إصلاح تسرب مؤشر ترابط محتمل ناجم عن مهلات RESTful<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>إضافة صورة نقطية واضحة لوضع تخطي الدُفعات<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>تم إصلاح مشكلة فشل إزالة نوع فهرس في التخزين عن بُعد في الوضع المحلي<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>استخدام <code translate="no">element_type</code> لمشغلي الصفيف <code translate="no">isNull</code> <a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>تمت إزالة إعادة تعيين المقاييس لضمان دقة التقارير<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>إصلاح خطأ في منع تصفية بيانات <code translate="no">null</code> بواسطة تعبيرات <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>تجاهل المقاطع المتزايدة مع عدم وجود موضع بداية لسياسة الختم<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>تجنب تحديث طلبات البحث/الاستعلام الأصلية أثناء إعادة المحاولة<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>إصلاح خطأ التجزئة إذا تم تشغيل <code translate="no">LoadArrowReaderFromRemote</code> في مسار استثناء<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>معالجة مشاكل التحقق من الرصيد اليدوي والتحقق من الرصيد<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>المخطط الذي تم التحقق من صحته ليس <code translate="no">nil</code> لإحصائيات JSON مع <code translate="no">DescribeCollection</code> الكسول<a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>تم إصلاح خطأ في حركة المؤشر عند مقارنة عمودين<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>تم حل مشكلة تعطل عند إدراج مصفوفتين <code translate="no">null</code> وغير فارغة مع فتح mmap المتزايد<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>تم إصلاح مشكلة تجميع arm64<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>تمت إضافة وضع تجاوز تجمع الخيوط لتجنب عرقلة عمليات الإدراج/التحميل عن طريق زيادة الفهارس<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>إصلاح أخطاء تنسيق JSON<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>تم إصلاح خطأ 404 في WebUI عندما يكون <code translate="no">http.enablepprof</code> خطأ<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 1 أبريل 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار الإصدار Milvus 2.5.8، الذي يتميز بتحسينات على تعابير JSON، والتحقق من صحة UTF-8، واستخدام الذاكرة، ومنطق الموازنة. يتضمن هذا الإصدار أيضًا العديد من إصلاحات الأخطاء المهمة لتحسين التزامن ومعالجة البيانات. نحن نشجعك على الترقية أو التجربة، وكما هو الحال دائمًا، تساعدنا ملاحظاتك على تحسين Milvus باستمرار!</p>
<h3 id="Features" class="common-anchor-header">الميزات</h3><ul>
<li>دعم تعبيرات JSON <code translate="no">null</code>/<code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>دعم تحليل المتجهات المتفرقة من هياكل الباركيه في عمليات الإدراج المجمعة<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><ul>
<li>موازنة المجموعة ذات عدد الصفوف الأكبر أولاً<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>دعم التحقق من صحة سلسلة UTF-8 أثناء الاستيراد<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>إضافة التحقق من صحة UTF-8 لجميع حقول VARCHAR<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>تجنب إعادة الاستعلام إذا كان البحث المختلط يطلب فقط PK كحقل إخراج<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>تحسين طرق عرض المصفوفات لتحسين استخدام الذاكرة<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>إضافة تكوين فاصل زمني للموازنة التلقائية<a href="https://github.com/milvus-io/milvus/pull/39918">(# 399918</a>)</li>
<li>تحويل تعبيرات OR المتعددة إلى تعبير IN<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>دعم معايير الضغط اليدوي التفصيلية<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>الاحتفاظ بالرموز الخام لتسجيل التدقيق<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>تحسين استخدام كتم الصوت التعريفي DataCoord<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li>إدخال الاشتراكات المجمعة في <code translate="no">MsgDispatcher</code> <a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاح الأخطاء</h3><ul>
<li>إصلاح التعطل الذي يتضمن مدخلات لاغية وأنواع بيانات mmap المتزايدة<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>تم إصلاح فقدان البيانات المحتمل في عمليات الحذف الناجم عن تكرار معرّفات مدونة البيانات<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>)،<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>تمت إضافة أقفال فهرس الحقل المضافة لـ <code translate="no">GetSegmentsIndexStates</code> لتجنب الذعر المحتمل عند الإدراج أثناء إنشاء مجموعة<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>إصلاح مشاكل التزامن في تسجيل مستهلكي Rocksmq<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>استرداد جميع سجلات دلتا الفرعية لتحميل المقطع<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>تم إصلاح النتائج الخاطئة الناتجة عن استخدام فهرس JSON عند تحديد <code translate="no">iterative_filter</code> <a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>ضمان أولوية أعلى لعملية <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>تصحيح <code translate="no">WithGroupSize</code> أثناء التصغير<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>زيادة عدد الفتحات بشكل متناسب مع زيادة حجم المقطع<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862#</a>)</li>
<li>تعيين وقت قائمة انتظار المهام قبل الإنكويو<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>إصلاح عدم توازن القنوات على عقد البيانات<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>تعيين التكوينات الافتراضية الصحيحة لفتحات المهام<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>اذهب إلى SDK: تعيين علامات لاغية وفقًا ل FieldSchema للإدراج المستند إلى الصف<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 21 مارس 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار Milvus 2.5.7، والذي يتميز بميزة فهرس مسار JSON التي تم تقديمها حديثًا. يسمح لك هذا بإنشاء فهارس مقلوبة على الأعمدة الديناميكية أو أعمدة JSON لتحسين أداء الاستعلام بشكل كبير. إلى جانب هذه الوظيفة الجديدة، أجرينا العديد من التحسينات وإصلاحات الأخطاء لتحسين الموثوقية ومعالجة الأخطاء بشكل أكثر دقة وتحسين قابلية الاستخدام. نحن نشجعك على الترقية أو التجربة، وكما هو الحال دائمًا، نقدر ملاحظاتك بشكل كبير بينما نواصل تحسين Milvus!</p>
<h3 id="Features" class="common-anchor-header">الميزات</h3><ul>
<li><strong>فهرس مسار JSON</strong>: لتلبية احتياجات المستخدم للمخططات الديناميكية، يقدم Milvus 2.5.7 القدرة على إنشاء فهارس على الأعمدة الديناميكية وأعمدة JSON. باستخدام هذه الميزة، يمكنك إنشاء فهارس مقلوبة لأعمدة ديناميكية محددة أو مسارات JSON، متجاوزًا بشكل فعال عملية تحميل JSON الأبطأ ومحسنًا أداء الاستعلام بشكل كبير. لمزيد من المعلومات، راجع <a href="/docs/ar/use-json-fields.md">حقل JSON</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><ul>
<li>إعادة ترتيب التعبيرات الفرعية للتعبيرات المقترنة<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>إضافة المزيد من خيارات التكوين لـ <code translate="no">interimindex</code> لدعم الأوضاع المكررة<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>استخدام مقاييس العداد الصحيحة لحسابات WA الإجمالية<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>جعل تكوين تقليم المقطع قابل للتحديث<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>إضافة سياسة ختم القناة على أساس حظر L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>تحسين البيانات الوصفية للمهام مع تأمين على مستوى المفتاح<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>إزالة تسميات التجميع والتقسيم غير الضرورية من المقاييس<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>تحسين رسائل أخطاء الاستيراد<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li>تجنب تحويل شرائح بايت الجسم إلى سلاسل في <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>تسجيل موضع بداية رسائل الحذف<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>دعم استرداد مدونات المقاطع باستخدام واجهة <code translate="no">GetSegmentsInfo</code> الجديدة<a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>استخدام <code translate="no">newInsertDataWithFunctionOutputField</code> عند استيراد ملفات مدونات المقاطع<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>إصلاح مشكلة فشل تطبيق خصائص mmap عند إنشاء مجموعة<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>لا تحذف ملف السنترويدات عند فشل أخذ العينات؛ بدلاً من ذلك، انتظر حتى يتم إجراء GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>إصلاح مشاكل فقدان الرسائل أثناء البحث<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>إزالة الأهداف المتأخرة بعد المرسل الرئيسي<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>تمت إضافة مدخلات الصورة النقطية الواضحة لكل حلقة دفعية<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>حماية <code translate="no">GetSegmentIndexes</code> باستخدام RLock<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>تجنب أخطاء التجزئة الناتجة عن استرجاع مجموعات بيانات المتجهات الفارغة<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>إصلاح عامل تصفية "غير متساوٍ" لفهرس JSON<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>إصلاح تحميل الإزاحة الفارغة في الفهرس المقلوب<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>تم إصلاح منطق تنظيف القمامة في <code translate="no">jsonKey</code> الإحصائيات وتحسين مرشح إحصائيات مفاتيح JSON<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>تم اكتشاف أخطاء مؤشر JSON غير صالح<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>يعود امتياز نجمة RBAC الآن فارغًا عند إدراج النُهج<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>تجنب الذعر عند عدم وجود حقل في المخطط في QueryNode<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>تم إصلاح مشكلة تجميع المراجع للبحث/الاستعلام<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>معالجة الصفوف الفارغة للمتجهات المتفرقة<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>تمت إضافة التحقق من معلمة النوع/الفهرس المكرر عند إنشاء المجموعات<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>تم نقل <code translate="no">metaHeader</code> إلى العميل لتجنب سباقات البيانات<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444#</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 10 مارس 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار الإصدار Milvus 2.5.6، الذي يتميز بتحسينات قيّمة على سلاسل الأدوات والتسجيل والمقاييس ومعالجة المصفوفات، بالإضافة إلى إصلاحات متعددة للأخطاء لتحسين الموثوقية والأداء. يتضمن هذا التحديث معالجة التزامن المحسنة، ومهام ضغط أكثر قوة، وتحسينات رئيسية أخرى. نحن نشجعك على الترقية أو تجربته، وكما هو الحال دائمًا، نرحب بتعليقاتك لمساعدتنا في تحسين ميلفوس باستمرار!</p>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><ul>
<li>ترقية سلسلة أدوات Go إلى 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>ترقية إصدار Rust إلى 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>رفع إصدار Etcd إلى 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>التحقق من نوع العنصر فقط للمصفوفات غير الفارغة<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>إزالة سجلات التصحيح في معالج مجموعة الموارد (الإصدار 2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>تحسين التسجيل لمحلل gRPC<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>إضافة المزيد من المقاييس لمكونات CGO غير المتزامنة<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>تنظيف ذاكرة التخزين المؤقت لموقع الجزء بعد إصدار مجموعة<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>إصلاح تلف المصفوفة الناجم عن تجاهل الصلاحية<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>إصلاح مشكلة عدم عمل تعبيرات <code translate="no">null</code> لحقول JSON<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>تم إصلاح مشكلة تخزين إزاحة خاطئة عند إنشاء Tantivy مع حقل قابل للإلغاء<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>تم تخطي تنفيذ الإحصائيات للمقاطع الصفرية<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>تصحيح تقدير حجم الذاكرة للمصفوفات<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>تمرير مؤشر الحزمة المتشابكة لتجنب عمليات الدمج المتعددة<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>إصلاح مشكلة تعطل في الإدراج الجماعي<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>منع تسرب تدفق الرسائل عن طريق إنهاء المرسل الرئيسي بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>تم إصلاح مشكلات التزامن في <code translate="no">null</code> إزاحة<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>)،<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>تم إصلاح تحليل <code translate="no">import end ts</code> <a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>تحسين معالجة الأخطاء واختبارات الوحدة للدالة <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>إضافة التحقق من المعلمة المكررة ل <code translate="no">CreateIndex</code> <a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>تم حل مشكلة منع مهام الضغط عند تجاوز الحجم الحد الأقصى<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>إصلاح الاستهلاك المكرر من الدفق للمقاطع غير المرئية<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>تم تغيير متغير CMake للتبديل إلى <code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>تم إصلاح مشكلة فشل إسقاط خصائص قاعدة البيانات عبر RESTful<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>استخدم نوع رسالة مختلف لواجهة برمجة التطبيقات <code translate="no">OperatePrivilegeV2</code> <a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>إصلاح سباق البيانات في ذاكرة التخزين المؤقت لدلتا المهام<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>تم حل تسرب في ذاكرة التخزين المؤقت لدلتا المهام الناجم عن تكرار معرفات المهام<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار 26 فبراير 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>يجلب Milvus 2.5.5.5 تحسينات كبيرة في عدد المجموعات والأقسام التي يمكن أن تدعمها مجموعة واحدة. أصبح من الممكن الآن تشغيل Milvus مع 10 آلاف مجموعة و100 ألف قسم. يعالج هذا الإصدار أيضًا العديد من الأخطاء الحرجة، بما في ذلك إحصائيات التطابق المفقودة ومشكلة الجمود في الاستعلامات متعددة المراحل. بالإضافة إلى ذلك، فهو يتضمن العديد من التحسينات في إمكانية الملاحظة والأمان. نوصي بشدة أن يقوم جميع المستخدمين الذين يقومون بتشغيل Milvus 2.5.x بالترقية في أقرب وقت ممكن.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">ترقية التبعية</h3><p>تمت الترقية إلى ETCD 3.5.18 لإصلاح العديد من نقاط الضعف.</p>
<ul>
<li>[2.5] تحديث الطوافة إلى cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] تحديث إصدار Knowhere<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">الأخطاء الحرجة</h3><ul>
<li>[2.5] تم استخدام البادئة <code translate="no">text_log</code> لملف الإزاحة الفارغة لملف الإزاحة الفارغة textmatchindex<a href="https://github.com/milvus-io/milvus/pull/39936">(# 39936</a>)</li>
<li>[2.5] تمت إضافة تجمع مهام فرعي للمهام متعددة المراحل لتجنب الجمود<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>[2.5] إصلاح الجمود في جدولة المهام<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] إصلاح حالة السباق التي تسببت في إنشاء عدة فهارس متطابقة<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] تم إصلاح مشكلة إمكانية إنشاء مجموعات ذات أسماء مكررة<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>تم إصلاح فشل البحث عن تعبيرات فارغة<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] إصلاح الخلل في فشل مطابقة البادئة عندما تكون أحرف البدل في البادئة<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>إلغاء تسلسل النصوص الفرعية الملغاة عند انتهاء مهلة طلب HTTP<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] تم إصلاح تسرب ذاكرة التخزين المؤقت لدلتا المهام في مهمة الاختزال<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] إصلاح حالة ذعر الاستعلامات في حالة الزاوية<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] تم تحسين دالة isbalanced لحساب أزواج الاقتباس بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] إصلاح سالب -1 تنفيذ مهام الضغط<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] تم إصلاح الخلل حيث قد لا يتم نقل مقطع من مختوم إلى مسح<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>تخطي إنشاء فهرس مفتاح أساسي عند تحميل فهرس pk<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] تخطي إنشاء فهرس نصي عندما تكون القطعة صفرية بعد الفرز<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] تم إصلاح فشل البحث عن أقرب موضع<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>تجاهل خيار النمو المفقود في البحث الهجين<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] تم إصلاح عدم إمكانية تعديل مستوى التناسق<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>إصلاح فشل الاستيراد بسبب عدد الصفوف 0<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] تم إصلاح نتيجة الوحدة النمطية الخاطئة للنوع الطويل<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] إضافة واستخدام سياق العمر الافتراضي لمشغل الضغط<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] التحقق من إصدار المجموعة قبل التحقق من الهدف<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>تم إصلاح فشل الإيقاف الآمن لـ Rootcoord والتوقف الآمن والموارد المحدودة لـ CI<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] تمت إزالة التحقق من حجم حقل التحميل وحجم عمود المخطط<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834،</a> <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] إزالة المعلمة mmap.enable في معلمة النوع عند إنشاء الفهرس<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] عدم تمرير اسم الفهرس عند إسقاط الخصائص<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] أرجع الشرائح نتائج متزايدة ومغلقة<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] تم إصلاح مشكلة الخريطة المتزامنة<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] حل التعارض في اختبار مهمة مراقبة الجودة<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] تم إصلاح مشكلة توقف تحميل المجموعة في حالة حدوث ضغط أو GC<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] تم إصلاح التوزيع غير المتكافئ الناجم عن تنفيذ تسرب ذاكرة التخزين المؤقت لدلتا المهمة<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] تم إرجاعه مبكرًا عند تخطي فهرس تحميل pk<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] إصلاح تمكن المستخدم الجذر من سرد جميع المجموعات حتى عند تعيين <code translate="no">common.security.rootShouldBindRole</code> <a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] تم إصلاح تسرب مخطط التدفق<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686#</a>)</li>
<li>[2.5] استخدام مُنسق عنصر المعلمة لتجنب تراكب Setconfig<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] تم التحقق من اسم امتياز Metastore مع اسم الامتياز "الكل"<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>.5)</li>
<li>[2.5] تمت إضافة محدد المعدل ل RESTful v1<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] إزالة رقم القسم المشفّر في معالج RESTful<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><h4 id="Observability" class="common-anchor-header">إمكانية المراقبة</h4><ul>
<li>تمت إضافة مقياس مراقبة لاسترداد البيانات الخام<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] تمت إضافة مقياس زمن انتقال الحصول على المتجه ورسالة خطأ حد الطلب المحسنة<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] تمت إضافة مقاييس لقائمة انتظار الوكيل<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>كشف المزيد من بيانات المقاييس<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466 39466</a>)</li>
<li>[2.5] مقاييس مضافة لتعبير التحليل<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] تمت إضافة حقل سجل DSL للبحوث الهجينة<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] تخطي تحديث مقاييس الفهرس إذا تم إسقاط الفهرس<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] تم تفريغ معلومات pprof في حالة انتهاء مهلة تقدم إيقاف المكون<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] تمت إضافة واجهة برمجة تطبيقات الإدارة للتحقق من حالة رصيد الاستعلام<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">تحسين جدولة مهام الفهرس/الإحصائيات/جدولة مهام الفهرس</h4><ul>
<li>تحسين سياسة جدولة مهام الفهرس<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] الحد من سرعة توليد مهمة الإحصائيات<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>تكوينات مضافة لجدول الضغط<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] تم التحقق من ضغط L0 فقط مع نفس القناة عند الذكر<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] تعديل تقدير ذاكرة محمل المقطع للفهارس المؤقتة<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] تم استخدام نقاط بدء التشغيل لمقطع الختم حسب سياسة العمر الافتراضي<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>إزالة تعريف المهمة عند انتفاء الحاجة إلى المهمة<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] تسريع سرد الكائنات أثناء استيراد مدونة البيانات<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>دعم إنشاء مجموعة مدعومة بالوصف<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] تصدير فاصل مهلة طلب الفهرس في التكوين<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] مزامنة القيمة الافتراضية proxy.maxTaskNum إلى 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>خفض حد لقطة التفريغ من 10 واط إلى 1 واط<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] تجنب نسخ السلسلة إلى شريحة بايت للبايتات لنسخة pk الدفعية الموجودة<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>دعم إرجاع الخصائص القابلة للتكوين عند وصف الفهرس<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>تحسين أداء التعبير لنقاط معينة<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] تحسين تنسيق نتائج getQueryNodeDistribution<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] تمكين مراقبة تضخيم الكتابة<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] إرجاع أعلى k من النتائج عند البحث في RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5] [GoSDK] تمت إضافة سكر نحوي مُمكّن<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] [2.5] دعم الفهرس المؤقت أنواع مختلفة من الفهارس والمزيد من أنواع البيانات (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK] [2.5] مزامنة التزامات GoSDK من الفرع الرئيسي<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>حافظ على اتساق الذاكرة والتوصيف الوصفية للبث<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>البث مع إشعار قائم على الحدث<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] تنقيح رسالة الخطأ للتحقق من المخطط والفهرس<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] إعادة تعيين نوع الفهرس التلقائي الافتراضي للعدد القياسي<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] إعادة ترتيب مهمة ضغط L0 عند فشل الفحص المسبق<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 23 يناير 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار الإصدار Milvus 2.5.4، والذي يقدم تحسينات رئيسية في الأداء وميزات جديدة مثل عزل مفتاح التقسيم والفهرس المتناثر مع DAAT MaxScore وآليات تأمين محسّنة. من أبرز ما يميز هذا الإصدار هو دعمه لـ 10000 مجموعة ومليون قسم، مما يمثل علامة فارقة رئيسية لحالات الاستخدام متعدد المستأجرين. يعالج هذا الإصدار أيضًا العديد من الأخطاء التي تعمل على تحسين الاستقرار والموثوقية بشكل عام، وقد يتسبب اثنان من الأخطاء الحرجة في فقدان البيانات. نحن نشجعك على الترقية أو تجربة هذا الإصدار الأخير، ونتطلع إلى تلقي ملاحظاتك لمساعدتنا في تحسين Milvus باستمرار!</p>
<h3 id="Features" class="common-anchor-header">الميزات</h3><ul>
<li>يدعم عزل PartitionKey لتحسين الأداء مع مفاتيح أقسام متعددة<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). لمزيد من المعلومات، راجع <a href="/docs/ar/use-partition-key.md">استخدام مفتاح التقسيم</a>.</li>
<li>يدعم الفهرس المتناثر الآن DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">المعروف بـ (#1015</a>). لمزيد من المعلومات، راجع <a href="/docs/ar/sparse_vector.md">المتجهات المتفرقة</a>.</li>
<li>يضيف دعمًا ل <code translate="no">is_null</code> في التعبير<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>يمكن تخصيص امتيازات الجذر<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><ul>
<li>دعم 10 آلاف مجموعة و1 مليون قسم في مجموعة واحدة<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>معلومات دلتا المقاطع المخزنة مؤقتًا لتسريع منسق الاستعلام<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>قراءة البيانات الوصفية بشكل متزامن على مستوى المجموعة لتسريع استرداد الأعطال<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>تنقيح دقة التأمين في QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>)،<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>أسلوب موحد باستخدام CStatus للتعامل مع استدعاءات CGO NewCollection CGO<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>تخطي إنشاء محدد القسم إذا لم يتم تعيين أي قسم<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>إضافة المزيد من دعم RESTful API<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>إزالة مرشحات بلوم غير الضرورية في QueryNode وDataNode لتقليل استخدام الذاكرة<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>تسريع تحميل البيانات عن طريق تسريع إنشاء المهام وجدولتها وتنفيذها في QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>تقليل التأمين في DataCoord لتسريع عمليات التحميل والإدراج<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>إضافة أسماء الحقول الأساسية في <code translate="no">SearchResult</code> و <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>استخدام كل من حجم مدونة البيانات وحجم الفهرس كمعيار لتخفيض حصة القرص<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>تحسين استخدام الذاكرة للبحث عن النص الكامل في البحث عن النص الكامل في المكان المعروف/#1011</li>
<li>إضافة التحكم في الإصدار للفهارس العددية<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>تحسين سرعة جلب معلومات المجموعة من RootCoord عن طريق تجنب النسخ غير الضرورية<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">إصلاحات الأخطاء الحرجة</h3><ul>
<li>إصلاح حالات فشل البحث للمفاتيح الأساسية ذات الفهارس<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>تم إصلاح مشكلة فقدان البيانات المحتملة الناجمة عن إعادة تشغيل MixCoord والمسح المتزامن<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>تم إصلاح فشل الحذف الناجم عن التزامن غير المناسب بين مهام الإحصائيات وضغط L0 بعد إعادة تشغيل MixCoord<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>إصلاح عدم توافق الفهرس المقلوب العددي عند الترقية من 2.4 إلى 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>تم إصلاح مشكلات الاستعلام البطيء الناجمة عن دقة القفل الخشنة أثناء تحميل أعمدة متعددة<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>تم إصلاح مشكلة حيث يمكن أن يؤدي استخدام الأسماء المستعارة إلى اجتياز مكرر قاعدة البيانات الخطأ<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>إصلاح فشل تحديث مجموعة الموارد عند تغيير قاعدة البيانات<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>تم إصلاح مشكلة متقطعة حيث لم يتمكن فهرس tantivy من حذف ملفات الفهرس أثناء الإصدار<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>تم إصلاح بطء الفهرسة البطيء الناجم عن وجود عدد كبير جداً من المواضيع<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>تم إصلاح مشكلة منع تخطي عمليات التحقق من حصص الأقراص أثناء الاستيراد الجماعي<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>تم حل مشكلات التجميد الناتجة عن وجود عدد كبير جدًا من مستهلكي قائمة انتظار الرسائل عن طريق الحد من التزامن<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>إصلاح مهلات الاستعلامات التي تسببها إعادة تشغيل MixCoord أثناء عمليات الدمج واسعة النطاق<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>إصلاح مشاكل عدم توازن القنوات الناجمة عن تعطل العقدة<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>تم إصلاح مشكلة يمكن أن تتسبب في تعطل توازن القنوات.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>تم إصلاح مشكلة حيث أصبحت عمليات التحقق من مستوى امتيازات المجموعة المخصصة RBAC غير فعالة<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>إصلاح فشل استرداد عدد الصفوف في الفهارس الفارغة<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>إصلاح تقدير الذاكرة غير الصحيح للمقاطع الصغيرة<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 13 يناير 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>يقدم الإصدار 2.5.3 من Milvus 2.5.3 إصلاحات مهمة للأخطاء وتحسينات في الأداء لتحسين الاستقرار والموثوقية وسهولة الاستخدام بشكل عام. يعمل هذا الإصدار على تحسين معالجة التزامن، وتعزيز فهرسة البيانات واسترجاعها، وتحديث العديد من المكونات الرئيسية للحصول على تجربة مستخدم أكثر قوة.</p>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>تم إصلاح مشكلة حيث يمكن أن يؤدي استخدام عامل تصفية <code translate="no">IN</code> على مفتاح أساسي <code translate="no">VARCHAR</code> إلى إرجاع نتائج فارغة.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>إصلاح مشكلة التزامن بين عمليات الاستعلام والحذف التي قد تؤدي إلى نتائج غير صحيحة.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>تم إصلاح الفشل الناجم عن التصفية التكرارية عندما يكون <code translate="no">expr</code> فارغاً في طلب استعلام.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>تم إصلاح مشكلة حيث أدى خطأ في القرص أثناء تحديثات التكوين إلى استخدام إعدادات التكوين الافتراضية.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>تم إصلاح الفقدان المحتمل للبيانات المحذوفة بسبب ضغط التجميع.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>إصلاح استعلام مطابقة النص المقطوع في قطاعات البيانات المتزايدة.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>إصلاح حالات فشل الاسترجاع الناجمة عن عدم احتواء الفهرس على البيانات الأصلية للمتجهات المتفرقة.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>إصلاح حالة سباق حقول الأعمدة المحتملة الناجمة عن الاستعلام المتزامن وتحميل البيانات.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>تم إصلاح حالات فشل الإدراج المجمّع عندما لا يتم تضمين الحقول القابلة للإلغاء أو الافتراضية_القيمة في البيانات.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">تحسينات</h3><ul>
<li>إضافة واجهة برمجة تطبيقات مجموعة الموارد لواجهة RESTful.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>تحسين أداء الاسترداد من خلال الاستفادة من أساليب مجموعة البتات SIMD.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>استخدام الطابع الزمني ل MVCC كطابع زمني للضمان عند تحديده.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>تمت إضافة مقاييس الحذف المفقودة.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>تم تحديث Etcd إلى الإصدار 3.5.16.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>تم إنشاء حزمة Go جديدة لإدارة البروتو.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>).</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 3 يناير 2025</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>يدعم الإصدار Milvus 2.5.2 تعديل الحد الأقصى لطول أعمدة VARCHAR ويحل العديد من المشكلات الحرجة المتعلقة بالتزامن، وانخفاضات الأقسام، ومعالجة إحصائيات BM25 أثناء الاستيراد. نوصي بشدة بالترقية إلى هذا الإصدار لتحسين الاستقرار والأداء.</p>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><ul>
<li>إنشاء سجلات استخدام القرص فقط في حالة عدم وجود المسار المحدد.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>تمت إضافة معلمة لضبط الحد الأقصى لطول VARCHAR واستعادة الحد الأقصى إلى 65,535.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>دعم تحويل نوع المعلمة للتعبيرات.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>إصلاح حالات الجمود المحتملة في سيناريوهات التزامن.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>تم إنشاء ملف index_null_offset للحقول التي تدعم القيم الفارغة فقط.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>تم إصلاح استخدام خطة الاسترداد بعد التحرير في مرحلة الاختزال.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>تم التعرف على التعبيرات ذات الأحرف الكبيرة AND و OR.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>السماح بإسقاط الأقسام بنجاح حتى في حالة فشل التحميل.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>تم إصلاح مشاكل تسجيل ملف إحصائيات BM25 أثناء الاستيراد.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 26 ديسمبر 2024</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>يركز الإصدار Milvus 2.5.1 على سلسلة من إصلاحات الأخطاء التي تعالج تحميل الذاكرة، وقوائم RBAC، وموازنة عقدة الاستعلام، وفهرسة المقاطع المختومة، مع تحسين واجهة مستخدم الويب والمعترضات. نوصي بشدة بالترقية إلى الإصدار 2.5.1 لتحسين الاستقرار والموثوقية.</p>
<h3 id="Improvement" class="common-anchor-header">التحسينات</h3><ul>
<li>تحديث مجموعة واجهة مستخدم الويب وصفحات الاستعلام.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>إصلاح مشكلات OOM بإضافة عامل ذاكرة إلى تقديرات التحميل.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>إصلاح توسيع مجموعة الامتيازات عند إدراج النُهج في RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>إصلاح المشاكل المتعلقة بإدراج مجموعات الامتيازات والمجموعات.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>إصلاح الموازن لتجنب التحميل الزائد المتكرر على نفس عقدة الاستعلام.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>إصلاح مهام التوازن غير المتوقعة التي تم تشغيلها بعد إعادة تشغيل QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>إصلاح تحديثات تكوين التحميل التي لا تنطبق على تحميل المجموعات.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>إصلاح عدد القراءات الصفرية أثناء استيراد البيانات.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>إصلاح فك ترميز Unicode لمفاتيح JSON في التعبيرات.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>تم إصلاح اسم قاعدة البيانات المعترضة لـ alterCollectionField في 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>تم إصلاح معلمات الفهرس الفارغة للقطاعات المختومة عند استخدام البحث بالقوة الغاشمة BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 23 ديسمبر 2024</p>
<table>
<thead>
<tr><th>إصدار ميلفوس</th><th>إصدار Python SDK</th><th>إصدار Node.js SDK</th><th>إصدار Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>يجلب الإصدار 2.5.0 من Milvus 2.5.0 تطورات كبيرة لتعزيز قابلية الاستخدام وقابلية التوسع والأداء للمستخدمين الذين يتعاملون مع البحث المتجه وإدارة البيانات على نطاق واسع. من خلال هذا الإصدار، يدمج Milvus ميزات جديدة قوية مثل البحث القائم على المصطلحات، وضغط التجميع للاستعلامات المحسّنة، والدعم متعدد الاستخدامات لطرق البحث المتجه المتفرقة والكثيفة. تقدم التحسينات في إدارة المجموعات والفهرسة ومعالجة البيانات مستويات جديدة من المرونة وسهولة الاستخدام، مما يجعل من Milvus قاعدة بيانات متجهات أكثر قوة وسهولة في الاستخدام.</p>
<h3 id="Key-Features" class="common-anchor-header">الميزات الرئيسية</h3><h4 id="Full-Text-Search" class="common-anchor-header">بحث نصي كامل</h4><p>يدعم الإصدار Milvus 2.5 البحث في النص الكامل المنفذ باستخدام Sparse-BM25! تعد هذه الميزة مكملًا مهمًا لقدرات البحث الدلالي القوية في ميلفوس خاصةً في السيناريوهات التي تتضمن كلمات نادرة أو مصطلحات تقنية. في الإصدارات السابقة، دعمت Milvus المتجهات المتفرقة للمساعدة في سيناريوهات البحث بالكلمات الرئيسية. تم إنشاء هذه المتجهات المتفرقة خارج Milvus بواسطة نماذج عصبية مثل SPLADEv2/BGE-M3 أو نماذج إحصائية مثل خوارزمية BM25.</p>
<p>يحتوي Milvus 2.5، المدعوم من <a href="https://github.com/quickwit-oss/tantivy">Tantivy،</a> على محلل مدمج واستخراج متجهات متناثرة، مما يوسع واجهة برمجة التطبيقات من تلقي المتجهات فقط كمدخلات إلى قبول النص مباشرةً. يتم تحديث معلومات BM25 الإحصائية في الوقت الحقيقي عند إدخال البيانات، مما يعزز قابلية الاستخدام والدقة. بالإضافة إلى ذلك، توفر المتجهات المتفرقة المستندة إلى خوارزميات أقرب جار تقريبي (ANN) أداءً أقوى من أنظمة البحث القياسية للكلمات الرئيسية.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md">نظرة عامة على المحلل</a> <a href="/docs/ar/full-text-search.md">والبحث في النص الكامل</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">واجهة ويب لإدارة المجموعات (بيتا)</h4><p>لدعم البيانات الضخمة والميزات الغنية بشكل أفضل، يتضمن تصميم Milvus المتطور العديد من التبعيات والعديد من أدوار العقد، وهياكل البيانات المعقدة، وغير ذلك. يمكن أن تشكل هذه الجوانب تحديات للاستخدام والصيانة.</p>
<p>يقدّم الإصدار 2.5 من ميلفوس 2.5 واجهة ويب مدمجة لإدارة المجموعات (Cluster Management WebUI)، مما يقلل من صعوبة صيانة النظام من خلال عرض معلومات بيئة وقت تشغيل ميلفوس المعقدة. ويتضمن ذلك تفاصيل قواعد البيانات والمجموعات والمقاطع والقنوات والتبعيات وحالة صحة العقدة ومعلومات المهام والاستعلامات البطيئة والمزيد.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">مطابقة النص</h4><p>تستفيد Milvus 2.5 من أدوات التحليل والفهرسة من <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> للمعالجة المسبقة للنص وبناء الفهرس، مما يدعم مطابقة اللغة الطبيعية الدقيقة للبيانات النصية استنادًا إلى مصطلحات محددة. تُستخدم هذه الميزة في المقام الأول للبحث المصفى لاستيفاء شروط محددة ويمكنها دمج التصفية القياسية لتحسين نتائج الاستعلام، مما يسمح بالبحث عن التشابه داخل المتجهات التي تستوفي المعايير القياسية.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md">نظرة عامة على المحلل</a> <a href="/docs/ar/keyword-match.md">ومطابقة النص</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">فهرس الصور النقطية</h4><p>تمت إضافة فهرس بيانات قياسي جديد إلى عائلة ميلفوس. ويستخدم فهرس الخريطة النقطية مصفوفة من البتات، مساوية في الطول لعدد الصفوف، لتمثيل وجود القيم وتسريع عمليات البحث.</p>
<p>عادةً ما تكون فهارس الخريطة النقطية فعالة للحقول منخفضة البطاقات، والتي تحتوي على عدد متواضع من القيم المميزة - على سبيل المثال، عمود يحتوي على معلومات عن الجنس مع قيمتين محتملتين فقط: ذكر وأنثى.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/bitmap.md">فهرس الصور النقطية</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">القيمة اللاغية والافتراضية</h4><p>يدعم Milvus الآن تعيين الخصائص القابلة للإلغاء والقيم الافتراضية للحقول القياسية بخلاف حقل المفتاح الأساسي. بالنسبة للحقول القياسية التي تم وضع علامة <code translate="no">nullable=True</code> ، يمكن للمستخدمين حذف الحقل عند إدراج البيانات؛ وسيتعامل النظام مع الحقل كقيمة لاغية أو قيمة افتراضية (إذا تم تعيينها) دون طرح خطأ.</p>
<p>توفر القيم الافتراضية والخصائص القابلة للإلغاء مرونة أكبر لـ Milvus. يمكن للمستخدمين الاستفادة من هذه الميزة للحقول ذات القيم غير المؤكدة عند إنشاء المجموعات. كما أنها تبسط أيضًا ترحيل البيانات من أنظمة قواعد البيانات الأخرى إلى ميلفوس، مما يسمح بالتعامل مع مجموعات البيانات التي تحتوي على قيم فارغة مع الحفاظ على إعدادات القيمة الافتراضية الأصلية.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/nullable-and-default.md">القيمة الفارغة والقيم الافتراضية</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ/PRQ المستندة إلى فايس</h4><p>من خلال التعاون الوثيق مع مجتمع Faiss، شهدت خوارزمية HNSW في Faiss تحسينات كبيرة في كل من الوظائف والأداء. ولاعتبارات تتعلق بالاستقرار وقابلية الصيانة، قام ميلفوس 2.5 بترحيل دعمه لخوارزمية HNSW رسميًا من hnswlib إلى Faiss.</p>
<p>استنادًا إلى Faiss، يدعم Milvus 2.5 طرق تكميم متعددة على HNSW لتلبية احتياجات السيناريوهات المختلفة: SQ (الكميات العددية)، و PQ (الكمي المنتج)، و PRQ (الكمي المنتج المتبقي). يعد SQ و PQ أكثر شيوعًا؛ حيث يوفر SQ أداءً جيدًا للاستعلام وسرعة بناء، بينما يوفر PQ استرجاعًا أفضل بنفس نسبة الضغط. عادةً ما تستخدم العديد من قواعد البيانات المتجهة التكميم الثنائي، وهو شكل بسيط من أشكال التكميم الكمي SQ.</p>
<p>PRQ هو اندماج بين PQ و AQ (الكمي المضاف). بالمقارنة مع PQ، فإنه يتطلب أوقات بناء أطول لتقديم استرجاع أفضل، خاصةً عند معدلات الضغط العالية، قائلاً الضغط الثنائي.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">ضغط التجميع (بيتا)</h4><p>يقدم الإصدار Milvus 2.5 ضغط التجميع لتسريع عمليات البحث وتقليل التكاليف في المجموعات الكبيرة. من خلال تحديد حقل قياسي كمفتاح تجميع، يتم إعادة توزيع البيانات حسب النطاق لتحسين التخزين والاسترجاع. تعمل هذه الميزة مثل الفهرس العام، وتتيح هذه الميزة لـ Milvus إمكانية تشذيب البيانات بكفاءة أثناء الاستعلامات استنادًا إلى البيانات الوصفية للتجميع، مما يعزز أداء البحث عند تطبيق عوامل التصفية القياسية.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/clustering-compaction.md">ضغط التجميع</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">ميزات أخرى</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">عقدة التدفق (بيتا)</h4><p>يقدم الإصدار Milvus 2.5 مكونًا جديدًا يسمى عقدة التدفق، والذي يوفر خدمات تسجيل الكتابة الأمامية (WAL). وهذا يمكّن ميلفوس من تحقيق الإجماع قبل وبعد قنوات القراءة والكتابة، مما يتيح ميزات ووظائف وتحسينات جديدة. هذه الميزة معطلة افتراضيًا في الإصدار 2.5 من Milvus 2.5 وستكون متاحة رسميًا في الإصدار 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">دعم IPv6</h4><p>يدعم Milvus الآن IPv6، مما يسمح بتوسيع نطاق الاتصال بالشبكة والتوافق.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">استيراد CSV بالجملة</h4><p>بالإضافة إلى تنسيقات JSON و Parquet، يدعم Milvus الآن الاستيراد المباشر للبيانات بتنسيق CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">قوالب التعبيرات لتسريع الاستعلامات</h4><p>يدعم Milvus الآن قوالب التعبيرات، مما يحسن من كفاءة تحليل التعبيرات، خاصةً في السيناريوهات ذات التعبيرات المعقدة.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/filtering-templating.md">تصفية القوالب</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">تحسينات GroupBy</h4><ul>
<li><strong>حجم المجموعة القابل للتخصيص</strong>: إضافة دعم لتحديد عدد الإدخالات التي يتم إرجاعها لكل مجموعة.</li>
<li><strong>بحث هجين بنظرية التجميع المختلط</strong>: يدعم البحث الهجين في GroupBy استنادًا إلى أعمدة متجهات متعددة.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">تحسينات المُكرر</h4><ul>
<li><strong>دعم MVCC</strong>: يمكن للمستخدمين الآن استخدام المكررات دون أن يتأثروا بتغييرات البيانات اللاحقة مثل عمليات الإدراج والحذف، وذلك بفضل التحكم في التزامن متعدد الإصدارات (MVCC).</li>
<li><strong>المؤشر الدائم</strong>: يدعم Milvus الآن مؤشراً مستمراً ل QueryIterator، مما يتيح للمستخدمين استئناف التكرار من الموضع الأخير بعد إعادة تشغيل Milvus دون الحاجة إلى إعادة تشغيل عملية التكرار بأكملها.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">التحسينات</h3><h4 id="Deletion-Optimization" class="common-anchor-header">تحسين الحذف</h4><p>تحسين السرعة وتقليل استخدام الذاكرة لعمليات الحذف واسعة النطاق من خلال تحسين استخدام القفل وإدارة الذاكرة.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">ترقية التبعيات</h4><p>تمت الترقية إلى ETCD 3.5.16 وPulsar 3.0.7 LTS، وإصلاح نقاط الضعف الحالية وتعزيز الأمان. ملاحظة: الترقية إلى Pulsar 3.x غير متوافقة مع الإصدارات السابقة 2.x.</p>
<p>بالنسبة للمستخدمين الذين لديهم بالفعل نشر Milvus يعمل بالفعل، تحتاج إلى ترقية مكونات ETCD وPulsar قبل أن تتمكن من استخدام الميزات والوظائف الجديدة. للحصول على التفاصيل، راجع <a href="/docs/ar/upgrade-pulsar-v3.md">ترقية بولسار من 2.x إلى 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">التخزين المحلي V2</h4><p>تم تقديم تنسيق ملف محلي جديد في Milvus 2.5، مما أدى إلى تحسين كفاءة التحميل والاستعلام للبيانات القياسية، وتقليل الحمل الزائد للذاكرة، ووضع الأساس للتحسينات المستقبلية.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">تحسين تحليل التعبيرات</h4><p>تحسين تحليل التعبيرات من خلال تنفيذ التخزين المؤقت للتعبيرات المتكررة، وترقية ANTLR، وتحسين أداء <code translate="no">NOT IN</code> البنود.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">تحسين أداء التزامن في DDL</h4><p>تحسين أداء التزامن لعمليات لغة تعريف البيانات (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">مواءمة ميزات RESTful API</h4><p>مواءمة وظائف واجهة برمجة تطبيقات RESTful API مع حزم SDK الأخرى لتحقيق الاتساق.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">تحديثات الأمان والتهيئة</h4><p>دعم TLS لتأمين الاتصال بين العقد في البيئات الأكثر تعقيدًا أو بيئات المؤسسات. لمزيد من التفاصيل، راجع <a href="/docs/ar/tls.md">تكوين الأمان</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">تحسينات أداء الضغط</h4><p>تمت إزالة القيود القصوى للمقاطع في الضغط المختلط، والآن تعطي الأولوية للمقاطع الأصغر أولاً، مما يحسن الكفاءة ويسرّع الاستعلامات على مجموعات البيانات الكبيرة أو المجزأة.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">موازنة القنوات المستندة إلى النقاط</h4><p>تقديم نهج يوازن الأحمال ديناميكيًا عبر القنوات، مما يعزز استخدام الموارد والاستقرار العام في عمليات النشر واسعة النطاق.</p>
