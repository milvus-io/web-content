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
<h2 id="v269" class="common-anchor-header">v2.6.9<button data-href="#v269" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 16 يناير 2026</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.12</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>يسعدنا أن نعلن عن إصدار الإصدار 2.6.9 من ميلفوس 2.6.9! يقدم هذا التحديث درجات التمييز لنتائج البحث، ويعزز إدارة المقاطع مع دعم إعادة فتح المقاطع عند حدوث تغييرات في البيانات أو المخطط، ويحسن معالجة إصدار التخزين. تتضمن التحسينات الرئيسية أداءً أفضل للتسجيل، وعناصر تحكم أمنية محسّنة لنقاط نهاية التعبير، وتحسينات لمحللات النصوص وبناء الفهرس. يعمل هذا الإصدار أيضًا على حل المشكلات الحرجة بما في ذلك دقة تقدير الذاكرة، وتحويلات البيانات الهندسية، وإصلاحات الاستقرار المختلفة. نوصي جميع المستخدمين في الفرع 2.6 بالترقية إلى هذا الإصدار لتحسين موثوقية النظام وأدائه.</p>
<h3 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>البحث المدعوم بالمفاتيح الأساسية<a href="https://github.com/milvus-io/milvus/pull/46528">(46528 #46528</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">تحسينات<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>إضافة مقياس تسمية إصدار التخزين لتحسين إمكانية الملاحظة<a href="https://github.com/milvus-io/milvus/pull/47014">(#47014</a>)</li>
<li>يدعم QueryCoord الآن إعادة فتح المقطع عند تغيير مسار البيان<a href="https://github.com/milvus-io/milvus/pull/46921">(#46921</a>)</li>
<li>تمت إضافة دعم لإعادة فتح المقاطع عند حدوث تغييرات في البيانات أو المخطط<a href="https://github.com/milvus-io/milvus/pull/46412">(#46412</a>)</li>
<li>تحسين أداء وكفاءة السجل البطيء<a href="https://github.com/milvus-io/milvus/pull/47086">(#47086</a>)</li>
<li>تمت إضافة سياسة ضغط ترقية إصدار التخزين لتسهيل عمليات ترحيل الإصدارات<a href="https://github.com/milvus-io/milvus/pull/47011">(#47011</a>)</li>
<li>Eliminated extra memory copy operations for C++ logging to improve performance<a href="https://github.com/milvus-io/milvus/pull/46992">(#46992</a>)</li>
<li>تمت إضافة عناصر تحكم الأمان لنقطة النهاية /expr لمنع الوصول غير المصرح به<a href="https://github.com/milvus-io/milvus/pull/46978">(#46978</a>)</li>
<li>تظل خدمة البث الآن ممكّنة حتى يتم الوصول إلى عدد عقدة البث المطلوبة<a href="https://github.com/milvus-io/milvus/pull/46982">(#46982</a>)</li>
<li>إزالة عمليات وضع إلخd الزائدة عن الحاجة عند تحديث معلومات المقطع<a href="https://github.com/milvus-io/milvus/pull/46794">(#46794</a>)</li>
<li>تم تحسين التحقق من صحة عدد الصفوف وتقليل سجلات التحذير المضللة لضغط الفرز<a href="https://github.com/milvus-io/milvus/pull/46824">(#46824</a>)</li>
<li>تنظيف وتنظيم رسائل سجل بناء الفهرس<a href="https://github.com/milvus-io/milvus/pull/46769">(#46769</a>)</li>
<li>تحديد عدد عمليات بناء الفهرس المتجه المتزامنة لكل عامل لمنع استنفاد الموارد<a href="https://github.com/milvus-io/milvus/pull/46877">(#46877</a>)</li>
<li>تحسين عمليات استنساخ محلل جيبا ومحلل لينديرا لتحسين الأداء<a href="https://github.com/milvus-io/milvus/pull/46757">(#46757</a>)</li>
<li>إضافة بالوعة glog لنقل سجلات CGO إلى مسجل zap لتسجيل موحد<a href="https://github.com/milvus-io/milvus/pull/46741">(#46741</a>)</li>
<li>فرض استخدام تنسيق V2 للتخزين وإهمال كتابات V1<a href="https://github.com/milvus-io/milvus/pull/46889">(#46889</a>)</li>
<li>تنفيذ المعالجة المجمعة لعمليات ngram لتحسين الكفاءة<a href="https://github.com/milvus-io/milvus/pull/46703">(#46703</a>)</li>
<li>تمت إضافة آلية إعادة المحاولة التلقائية لعمليات الكتابة في السجل لتحسين الموثوقية<a href="https://github.com/milvus-io/milvus/pull/46854">(#46854</a>)</li>
<li>تصفية رسائل النقر الزمني الفارغة من الجانب المستهلك لتقليل المعالجة غير الضرورية<a href="https://github.com/milvus-io/milvus/pull/46730">(#46730</a>)</li>
<li>تحسين البحث حسب المفتاح الأساسي مع التحقق من التكرارات والاستدلال التلقائي لحقل anns_field<a href="https://github.com/milvus-io/milvus/pull/46745">(#46745</a>)</li>
<li>إضافة دعم معلمة البعد لموفري تضمين السيليكون فلو والتماسك<a href="https://github.com/milvus-io/milvus/pull/47081">(#47081</a>)</li>
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
<li>تم إصلاح العد المزدوج لذاكرة الفهرس في تقدير تحميل المقطع<a href="https://github.com/milvus-io/milvus/pull/47046">(#47046</a>)</li>
<li>تم إصلاح مشكلات التجميع على macOS 14<a href="https://github.com/milvus-io/milvus/pull/47048">(#47048</a>)</li>
<li>استخدام المراجعة كإصدار عالمي لاكتشاف خدمة التدفق لتحسين الاتساق<a href="https://github.com/milvus-io/milvus/pull/47023">(#47023</a>)</li>
<li>التأكد من اكتمال جميع العقود الآجلة عند الاستثناء لمنع حدوث أعطال بعد الاستخدام المجاني<a href="https://github.com/milvus-io/milvus/pull/46960">(#46960</a>)</li>
<li>تم إصلاح معترض التجزئة الذي يتخطى عمليات <code translate="no">FlushAllMsg</code> بشكل غير صحيح<a href="https://github.com/milvus-io/milvus/pull/47004">(#47004</a>)</li>
<li>تمت إضافة التحقق من صحة النطاق الصالح ل TTL للتجميع TTL لمنع التكوينات غير الصالحة<a href="https://github.com/milvus-io/milvus/pull/47010">(#47010</a>)</li>
<li>تم إصلاح <code translate="no">GetCredentialInfo</code> عدم تخزين استجابات RPC مؤقتًا<a href="https://github.com/milvus-io/milvus/pull/46945">(#46945</a>)</li>
<li>تم إصلاح مشكلة تعذر استدعاء <code translate="no">AlterFunction</code> عندما تصبح وظائف متعددة غير صالحة<a href="https://github.com/milvus-io/milvus/pull/46986">(#46986</a>)</li>
<li>إصلاح عدم ضغط ملف الإزاحة الفارغة للفهرس المقلوب<a href="https://github.com/milvus-io/milvus/pull/46950">(#46950</a>)</li>
<li>إصلاح التعطل عند استخدام is_null_expr في حقول JSON المفهرسة<a href="https://github.com/milvus-io/milvus/pull/46894">(#46894</a>)</li>
<li>تمت إضافة التحقق من علامة السماح بالإدراج التلقائي في واجهة برمجة تطبيقات الإدراج RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46931">(#46931</a>)</li>
<li>تمت إضافة التحقق من وجود الحقل في مجموعات الأعمدة قبل القراءة من بيان لون<a href="https://github.com/milvus-io/milvus/pull/46924">(#46924</a>)</li>
<li>إصلاح الخلل حيث لم تكن معلمة التمييز تعمل بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/46876">(#46876</a>)</li>
<li>يتجاهل مركز الحصص الآن المفوض عندما يكون في حالة الاسترداد<a href="https://github.com/milvus-io/milvus/pull/46858">(#46858</a>)</li>
<li>محاذاة خيارات تحويل WKT/WKB لضمان سلوك متسق عبر العمليات<a href="https://github.com/milvus-io/milvus/pull/46874">(#46874</a>)</li>
<li>إصلاح الخلل في نموذج voyageai int8<a href="https://github.com/milvus-io/milvus/pull/46821">(#46821</a>)</li>
<li>إصلاح التعامل المفقود مع <code translate="no">FlushAllMsg</code> في عمليات تخزين الاسترداد<a href="https://github.com/milvus-io/milvus/pull/46803">(#46803</a>)</li>
<li>تم إصلاح حقل shardclientmgr المفقود في مهمة الاستعلام لمنع الذعر<a href="https://github.com/milvus-io/milvus/pull/46838">(#46838#</a>)</li>
<li>تم استخدام معرف القائد للتحقق من العمل القديم في المجدول لتحسين الدقة<a href="https://github.com/milvus-io/milvus/pull/46788">(#46788</a>)</li>
<li>استعادة دعم المستأجر/مساحة الاسم ل Pulsar الذي فُقد في 2.6<a href="https://github.com/milvus-io/milvus/pull/46759">(#46759</a>)</li>
<li>تمت إضافة مراقب تكوين التحميل لمنع فقدان تعديلات تكوين التحميل<a href="https://github.com/milvus-io/milvus/pull/46786">(#46786</a>)</li>
<li>إصلاح خطأ واجهة تحرير الدالة<a href="https://github.com/milvus-io/milvus/pull/46782">(#46782</a>)</li>
<li>تمت إضافة التحقق من صحة خاصية TTL للمجموعة لمنع توقف الضغط<a href="https://github.com/milvus-io/milvus/pull/46736">(#46736</a>)</li>
</ul>
<h2 id="v268" class="common-anchor-header">v2.6.8<button data-href="#v268" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 4 يناير 2026</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.11</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار الإصدار 2.6.8 من ميلفوس! يقدم هذا الإصدار تمييز نتائج البحث، مما يعزز تجربة الاسترجاع بشكل كبير. تحت الغطاء، قمنا بتحسين معالجة الاستعلام، وجدولة الموارد، وآليات التخزين المؤقت لتقديم أداء واستقرار فائقين. بالإضافة إلى ذلك، يعالج هذا الإصدار الأخطاء الحرجة المتعلقة بأمان البيانات، ومعالجة التخزين، والتزامن. نوصي بشدة جميع المستخدمين بالترقية إلى هذا الإصدار للحصول على بيئة إنتاج أكثر كفاءة وموثوقية.</p>
<h3 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>دعم البحث باستخدام أداة تمييز. لمزيد من التفاصيل، راجع <a href="/docs/ar/text-highlighter.md">أداة تمييز النص</a>. <a href="https://github.com/milvus-io/milvus/pull/46052">(#46052</a>)</li>
</ul>
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
<li>نقل منطق تحسين الاستعلام إلى الوكيل لتحسين الأداء<a href="https://github.com/milvus-io/milvus/pull/46549">(46549/4</a>)</li>
<li>تحسين أداء مشغل <code translate="no">LIKE</code> باستخدام فرز STL<a href="https://github.com/milvus-io/milvus/pull/46535">(46535 #46535</a>)</li>
<li>تمكين التنفيذ المتزامن لمهام الفهرس النصي لحقول متعددة<a href="https://github.com/milvus-io/milvus/pull/46306">(#46306</a>)</li>
<li>دعم إيقاف GC مؤقتًا على مستوى المجموعة<a href="https://github.com/milvus-io/milvus/pull/46201">(#46201</a>)</li>
<li>تنفيذ سياسة جزاءات ل QueryNodes للتعامل مع استنفاد الموارد<a href="https://github.com/milvus-io/milvus/pull/46086">(#46086</a>)</li>
<li>تحسين التخزين المؤقت للبيانات عن طريق تعيين مجموعات صفوف متعددة إلى خلية تخزين مؤقت واحدة<a href="https://github.com/milvus-io/milvus/pull/46542">(# 46542</a>)</li>
<li>تقليل استخدام وحدة المعالجة المركزية في QuotaCenter<a href="https://github.com/milvus-io/milvus/pull/46615">(46615 #4</a>)</li>
<li>تحسين أداء المقارنة بين البيانات <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46655">(46655#</a>)</li>
<li>دعم الحقول الديناميكية القابلة للإلغاء مع كائن JSON فارغ كقيمة افتراضية<a href="https://github.com/milvus-io/milvus/pull/46445">(#46445</a>)</li>
<li>منع ختم المقطع غير الضروري عند تغيير خصائص المجموعة فقط<a href="https://github.com/milvus-io/milvus/pull/46489">(#46489</a>)</li>
<li>دعم إعادة توجيه DML و DQL في Proxy ل RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46021">(#46021</a>, <a href="https://github.com/milvus-io/milvus/pull/46037">#46037</a>)</li>
<li>إضافة آلية إعادة المحاولة لقراءات تخزين الكائنات عند حدوث أخطاء في الحد الأقصى للمعدل<a href="https://github.com/milvus-io/milvus/pull/46464">(#46464</a>)</li>
<li>تسجيل محسّن لجداول التعريف Proxy وRootCoord<a href="https://github.com/milvus-io/milvus/pull/46701">(#46701</a>)</li>
<li>إضافة التحقق من صحة تضمين النماذج وأنواع حقول المخطط<a href="https://github.com/milvus-io/milvus/pull/46422">(#46422</a>)</li>
<li>تقديم مدة تحمل لتأخير عمليات إسقاط المجموعة<a href="https://github.com/milvus-io/milvus/pull/46252">(#46252</a>)</li>
<li>تحسين جدولة مهام الفهرس من خلال تقدير الخانات بناءً على حجم الحقل ونوعه<a href="https://github.com/milvus-io/milvus/pull/46276">(#46276،</a> <a href="https://github.com/milvus-io/milvus/pull/45851">#45851</a>)</li>
<li>إضافة آلية احتياطية لمسارات الكتابة الاحتياطية عند الوصول إلى تخزين الكائنات دون دعم الكتابة المشروطة<a href="https://github.com/milvus-io/milvus/pull/46022">(#46022</a>)</li>
<li>تحسين منطق مزامنة أوراكل IDF أوراكل<a href="https://github.com/milvus-io/milvus/pull/46079">(#46079</a>)</li>
<li>تغيير منفذ RootCoord الافتراضي إلى منفذ غير مؤقت<a href="https://github.com/milvus-io/milvus/pull/46268">(#46268</a>)</li>
<li>تمت إضافة مقاييس لمراقبة ذاكرة Jemalloc المخزنة مؤقتًا<a href="https://github.com/milvus-io/milvus/pull/45973">(#45973</a>)</li>
<li>تحسين دقة قياس حصة القرص عند تغير حصة المجموعة<a href="https://github.com/milvus-io/milvus/pull/46304">(#46304</a>)</li>
<li>تحسين مراقبة التتبع للتعبيرات العددية<a href="https://github.com/milvus-io/milvus/pull/45823">(#45823</a>)</li>
<li>رفض تكرار المفاتيح الأساسية المكررة في طلبات دُفعات الإدراج<a href="https://github.com/milvus-io/milvus/pull/46035">(#46035</a>)</li>
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
<li>إصلاح مطابقة بادئة RBAC ETCD لمنع تسرب البيانات المحتمل<a href="https://github.com/milvus-io/milvus/pull/46708">(#46708</a>)</li>
<li>إصلاح معالجة المسار الجذر غير الصحيح لوضع التخزين المحلي<a href="https://github.com/milvus-io/milvus/pull/46693">(# 46693 4</a>)</li>
<li>تم إصلاح معالجة معالجة الأنواع المختلطة <code translate="no">int64</code>/<code translate="no">float</code> في حقول JSON<a href="https://github.com/milvus-io/milvus/pull/46682">(# 46682</a>)</li>
<li>إصلاح فشل تحميل سجل النص أثناء ترقية المجموعة<a href="https://github.com/milvus-io/milvus/pull/46698">(46698/4</a>)</li>
<li>منع حذف الحقول الأخرى أثناء تنظيف البيانات الأولية<a href="https://github.com/milvus-io/milvus/pull/46689">(46689/4</a>)</li>
<li>تم إصلاح الفشل عند استخدام التظليل مع عدة محللات<a href="https://github.com/milvus-io/milvus/pull/46664">(46664/4</a>)</li>
<li>ضمان مسح السجلات عند خروج نظام التشغيل<a href="https://github.com/milvus-io/milvus/pull/46609">(#46609</a>)</li>
<li>تم إصلاح خطأ تجاوز الحد الأقصى لحجم ETCD RPC عند إسقاط المجموعات<a href="https://github.com/milvus-io/milvus/pull/46645">(46645 #46645</a>)</li>
<li>تم إصلاح مشاكل تأخر النسخ المتماثل عندما يكون الخادم خاملاً<a href="https://github.com/milvus-io/milvus/pull/46612">(# 46612</a>)</li>
<li>تم إصلاح التحقق من صحة القيم الافتراضية <code translate="no">TIMESTAMPTZ</code> غير الصالحة<a href="https://github.com/milvus-io/milvus/pull/46556">(4656 #46556</a>)</li>
<li>إصلاح استعادة مهام الضغط لضمان التنظيف المناسب<a href="https://github.com/milvus-io/milvus/pull/46578">(46578/4</a>)</li>
<li>معالجة موحدة لعقدة القراءة فقط لتجنب مهام قناة التوازن العالقة<a href="https://github.com/milvus-io/milvus/pull/46513">(46513/4</a>)</li>
<li>منع إسقاط بيانات الحقول لمجموعات الأعمدة متعددة الحقول<a href="https://github.com/milvus-io/milvus/pull/46425">(#46425</a>)</li>
<li>إزالة عملاء الوكيل القديم عند إعادة مشاهدة ETCD<a href="https://github.com/milvus-io/milvus/pull/46490">(#46490</a>)</li>
<li>إصلاح ترتيب دمج مكرر القطع<a href="https://github.com/milvus-io/milvus/pull/46462">(#46462</a>)</li>
<li>تم منع إنشاء مجموعات مستهلكي كافكا عن طريق تعطيل الالتزام التلقائي<a href="https://github.com/milvus-io/milvus/pull/46509">(#46509</a>)</li>
<li>منع إعادة التحميل السريع لمعلمات التخزين المتدرج<a href="https://github.com/milvus-io/milvus/pull/46438">(#46438</a>)</li>
<li>تمكين مكرر البحث للمتجهات الثنائية<a href="https://github.com/milvus-io/milvus/pull/46334">(#46334</a>)</li>
<li>إصلاح حالة السباق في تهيئة التخزين<a href="https://github.com/milvus-io/milvus/pull/46338">(#46338</a>)</li>
<li>تم إصلاح استعلامات التمييز التي لا تعمل لعمليات البحث غير BM25<a href="https://github.com/milvus-io/milvus/pull/46295">(#46295</a>)</li>
<li>تم إصلاح تجاوز سعة التخزين الزائدة أثناء تجميع نفايات JSON<a href="https://github.com/milvus-io/milvus/pull/46318">(#46318</a>)</li>
<li>ضمان إعادة المحاولة عند كتابة المدونات الثنائية<a href="https://github.com/milvus-io/milvus/pull/46310">(#46310</a>)</li>
<li>فحص استخدام الفهرس الثابت لحقول JSON<a href="https://github.com/milvus-io/milvus/pull/46281">(#46281</a>)</li>
<li>منع حظر حظر تحديث الهدف عند افتقار النسخ المتماثلة للعقد أثناء التحجيم<a href="https://github.com/milvus-io/milvus/pull/46291">(#46291</a>)</li>
<li>تقييد أداة الترميز <code translate="no">char_group</code> لدعم المحددات ذات البايت الواحد فقط<a href="https://github.com/milvus-io/milvus/pull/46196">(#46196</a>)</li>
<li>تخطي استخدام فهرس مسار JSON إذا كان مسار الاستعلام يتضمن أرقاماً<a href="https://github.com/milvus-io/milvus/pull/46247">(#46247</a>)</li>
<li>إصلاح أخطاء تسلسل المسار في MinIO عندما يكون المسار الجذر "."<a href="https://github.com/milvus-io/milvus/pull/46221">(#46221</a>)</li>
<li>تم إصلاح عمليات التحقق من الصحة الإيجابية الخاطئة عن طريق تصحيح حساب مقياس تأخر النسخ المتماثل<a href="https://github.com/milvus-io/milvus/pull/46122">(#46122</a>)</li>
<li>إصلاح تحليل RESTful v2 وإعدادات المخطط الافتراضية مع <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46239">(#46239</a>)</li>
<li>إصلاح الذعر عند البحث عن نتائج فارغة مع حقول هندسة الإخراج<a href="https://github.com/milvus-io/milvus/pull/46231">(#46231</a>)</li>
<li>تمت إضافة التحقق من صحة محاذاة بيانات الحقل لمنع حدوث ذعر أثناء التحديثات الجزئية<a href="https://github.com/milvus-io/milvus/pull/46180">(#46180</a>)</li>
<li>إصلاح مشكلة فقدان قاعدة البيانات في RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46172">(#46172</a>)</li>
<li>إصلاح الاستخدام غير الصحيح للسياق في جلسات عميل gRPC<a href="https://github.com/milvus-io/milvus/pull/46184">(#46184</a>)</li>
<li>إصلاح إعادة توجيه التفويض غير الصحيح في RESTful v2 أثناء الترقيات<a href="https://github.com/milvus-io/milvus/pull/46140">(#46140</a>)</li>
<li>إصلاح منطق تصغير الهيكل غير الصحيح<a href="https://github.com/milvus-io/milvus/pull/46151">(#46151#</a>)</li>
<li>إصلاح الخطأ العائد من أداة التمييز عندما تكون نتائج البحث فارغة<a href="https://github.com/milvus-io/milvus/pull/46111">(#46111#</a>)</li>
<li>تصحيح منطق تحميل البيانات الخام للحقول<a href="https://github.com/milvus-io/milvus/pull/46155">(#46155</a>)</li>
<li>تم إصلاح مشكلة حركة المؤشر بعد تخطي الأجزاء في الفهرس<a href="https://github.com/milvus-io/milvus/pull/46055">(#46055</a>)</li>
<li>تم تصحيح منطق الحلقة المصحح لإخراج الفهرس القياسي <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46110">(#46110</a>)</li>
<li>تم إصلاح تعيين القيم الافتراضية لحقول الهندسة عبر واجهة برمجة تطبيقات RESTful<a href="https://github.com/milvus-io/milvus/pull/46064">(#46064</a>)</li>
<li>تم تنفيذ فشل سريع إذا لم يكن أي مكون جاهزًا عند بدء التشغيل<a href="https://github.com/milvus-io/milvus/pull/46070">(#46070</a>)</li>
</ul>
<h2 id="v267" class="common-anchor-header">v2.6.7<button data-href="#v267" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 4 ديسمبر 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.10</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>الإصدار Milvus 2.6.7 هو تحديث استقرار مهم لسلسلة 2.6.x. يركز هذا الإصدار على تقوية النظام ضد الأعطال الموزعة وتحسين استخدام الموارد في ظل التحميل العالي. مع تحسينات كبيرة في معالجة الإدخال/الإخراج، وإدارة الذاكرة، وتكامل Kubernetes، نوصي بشدة جميع مستخدمي الإنتاج بالترقية إلى هذا الإصدار لضمان موثوقية أكبر وتشغيل أكثر سلاسة على نطاق واسع.</p>
<h3 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>تمت إضافة نقطة نهاية <code translate="no">/livez</code> لدعم مسابر Kubernetes الأصلية، مما يحسّن استقرار تنسيق الحاويات<a href="https://github.com/milvus-io/milvus/pull/45481">(#45481</a>).</li>
<li>تمت إضافة دعم لعمليات <strong>GroupBy</strong> على حقول <code translate="no">TIMESTAMPTZ</code> ، مما يعزز قدرات تحليلات السلاسل الزمنية<a href="https://github.com/milvus-io/milvus/pull/45763">(#45763</a>)</li>
<li>دعم <code translate="no">mmap</code> لمؤشرات المفاتيح المشتركة لتقطيع JSON لتقليل بصمة ذاكرة الوصول العشوائي<a href="https://github.com/milvus-io/milvus/pull/45861">(#45861</a>)</li>
</ul>
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
<li>دعم إعادة توجيه طلب DML في الوكيل لتحسين توافر الكتابة ومرونة التوجيه<a href="https://github.com/milvus-io/milvus/pull/45922">(#45922</a>).</li>
<li>ترقية etcd إلى الإصدار 3.5.23 لمعالجة استقرار الإجماع وتراجعات الأداء<a href="https://github.com/milvus-io/milvus/pull/45953">(#45953</a>).</li>
<li>إضافة معالجة قوية للأخطاء عند تعطل خادم Etcd لمنع الأعطال المتتالية للمكونات<a href="https://github.com/milvus-io/milvus/pull/45633">(#45633</a>).</li>
<li>تقليل الحمل على Etcd عن طريق إزالة المراقبين المكلفين لعمليات التحقق من حيوية الجلسة البسيطة<a href="https://github.com/milvus-io/milvus/pull/45974">(#45974</a>).</li>
<li>تحسين استراتيجية الاحتفاظ ب WAL لتحقيق توازن أفضل بين استخدام القرص وسلامة استعادة البيانات<a href="https://github.com/milvus-io/milvus/pull/45784">(#45784</a>).</li>
<li>دعم مزامنة الكتابة غير المتزامنة للسجلات لمنع حظر الإدخال/الإخراج على القرص من التأثير على مسار التنفيذ الرئيسي<a href="https://github.com/milvus-io/milvus/pull/45806">(#45806</a>).</li>
<li>فرض استخدام الإدخال/الإخراج المخزن المؤقت لمهام التحميل ذات الأولوية العالية لتحسين استخدام ذاكرة التخزين المؤقت لصفحات نظام التشغيل والإنتاجية<a href="https://github.com/milvus-io/milvus/pull/45958">(#45958</a>).</li>
<li>تحسين استراتيجية <code translate="no">mmap</code> لتعيين أجزاء المجموعة في استدعاء نظام واحد، مما يقلل من النفقات الزائدة للنواة أثناء تحميل المقطع<a href="https://github.com/milvus-io/milvus/pull/45893">(#45893</a>).</li>
<li>تحسين دقة تقدير الذاكرة لتقطيع JSON لتجنب حالات القتل أو الاستخدام الناقص<a href="https://github.com/milvus-io/milvus/pull/45876">(#45876</a>).</li>
<li>تحسين تقدير حمل المقطع لحساب كل من حالتي الإخلاء والإحماء<a href="https://github.com/milvus-io/milvus/pull/45891">(#45891</a>).</li>
<li>تمت إضافة عمليات التحقق من الإلغاء التفصيلي في مشغلي الاستعلامات للسماح بإنهاء أسرع للاستعلامات المجهضة أو التي انتهت مدتها<a href="https://github.com/milvus-io/milvus/pull/45894">(#45894</a>).</li>
<li>إزالة عمليات التحقق من نوع الموارد الزائدة عن الحاجة في تكوين موارد الملفات<a href="https://github.com/milvus-io/milvus/pull/45727">(#45727</a>).</li>
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
<li>تم دمج سجلات Go و C ++C في دفق موحد لتوفير عرض زمني صحيح لتصحيح الأخطاء<a href="https://github.com/milvus-io/milvus/pull/46005">(#46005</a>).</li>
<li>تم حل حالة سباق حيث يمكن أن يكون <code translate="no">LastConfirmedMessageID</code> غير صحيح في حالة الكتابة عالية التزامن<a href="https://github.com/milvus-io/milvus/pull/45874">(#45874</a>).</li>
<li>إصلاح خطأ حسابي في تجميع <code translate="no">allsearchcount</code> من نتائج بحث متعددة<a href="https://github.com/milvus-io/milvus/pull/45904">(#45904</a>).</li>
<li>تم إصلاح تعبيرات المصطلحات للتعامل بشكل صحيح مع منطق احتواء السلسلة داخل مصفوفات JSON<a href="https://github.com/milvus-io/milvus/pull/45956">(#45956</a>).</li>
<li>استبدال <code translate="no">json.doc()</code> بـ <code translate="no">json.dom_doc()</code> في <code translate="no">JSONContainsExpr</code> لإصلاح سلوكيات التحليل وتحسين الأداء<a href="https://github.com/milvus-io/milvus/pull/45786">(#45786</a>).</li>
<li>تم إصلاح حالة الذعر في مكونات Standby MixCoord أثناء تسلسل إيقاف التشغيل<a href="https://github.com/milvus-io/milvus/pull/45898">(#4589845</a>).</li>
<li>تم إصلاح مدقق القائد لضمان مزامنة توزيع المقاطع بشكل صحيح في عقد القراءة فقط<a href="https://github.com/milvus-io/milvus/pull/45991">(#45991</a>).</li>
<li>ضمان تشغيل <code translate="no">HandleNodeUp</code> أثناء إعادة مراقبة العقد للحفاظ على طوبولوجيا موازنة التحميل الصحيحة<a href="https://github.com/milvus-io/milvus/pull/45963">(#45963</a>).</li>
<li>تم تنفيذ الرجوع إلى تخزين WAL عن بُعد في حالة عدم توفر تخزين WAL المحلي<a href="https://github.com/milvus-io/milvus/pull/45754">(#45754</a>).</li>
<li>تمت إضافة <code translate="no">EmptySessionWatcher</code> لمنع الذعر عند التشغيل في وضع ربط عقدة الفهرس<a href="https://github.com/milvus-io/milvus/pull/45912">(#45912</a>).</li>
<li>ضمان اتساق حالة الذاكرة عند استعادة مهام البث من المخازن المؤقتة للبروتوكول<a href="https://github.com/milvus-io/milvus/pull/45788">(#45788</a>).</li>
<li>معالجة مشاكل سلامة مؤشر الترابط في تحديثات مخطط مجموعة SegCore<a href="https://github.com/milvus-io/milvus/pull/45618">(#45618</a>).</li>
<li>فرض عمليات التحقق من التحكم في الوصول (RBAC) لـ <code translate="no">ListImport</code> وواجهات برمجة التطبيقات <code translate="no">GetImportProgress</code> <a href="https://github.com/milvus-io/milvus/pull/45862">(#45862</a>).</li>
<li>إصلاح الخلل حيث كان يفشل الاستيراد بالجملة إذا احتوى الإدخال على قائمة هيكلية فارغة<a href="https://github.com/milvus-io/milvus/pull/45692">(#45692</a>).</li>
</ul>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 21 نوفمبر 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>يسعدنا أن نعلن عن إصدار الإصدار 2.6.6.6 من برنامج Milvus، الذي يضم مجموعة من الإمكانات الجديدة القوية وتحسينات الأداء وإصلاحات الأخطاء الأساسية. يقدّم هذا التحديث ميزات مهمة مثل نوع البيانات الجغرافية المكانية والتوقيتية، ومُصنّف معزز لإعادة التصنيف، إلخ. يحتوي هذا الإصدار أيضًا على العديد من التحسينات الهامة في أداء التصفية العددية. كما تمت معالجة العديد من الأخطاء الحرجة لضمان المزيد من الاستقرار والموثوقية. مع هذا الإصدار، تواصل ميلفوس توفير تجربة أكثر قوة وفعالية لجميع المستخدمين. فيما يلي أبرز النقاط الرئيسية لهذا الإصدار.</p>
<ul>
<li>نوع البيانات الجغرافية المكانية: يقدم Milvus دعمًا لنوع البيانات <code translate="no">Geometry</code> ، الذي يمثل كائنات هندسية متوافقة مع OGC مثل <code translate="no">POINT</code> و <code translate="no">LINESTRING</code> و <code translate="no">POLYGON</code>. يدعم هذا النوع العديد من مشغلي العلاقات المكانية (st_contains، st_intersects، st_within، st_dwithin، ...) ويوفر فهرسًا مكانيًا <code translate="no">RTREE</code> لتسريع التصفية المكانية وتنفيذ الاستعلام. يتيح ذلك التخزين الفعال والاستعلام عن الأشكال الجغرافية المكانية للأشكال الجغرافية المكانية من أجل LBS، ورسم الخرائط، وأعباء العمل المكانية الأخرى.</li>
<li>نوع بيانات Timestamptz: يقدم Milvus نوع بيانات TIMESTAMPTZ، مما يوفر الوعي بالمنطقة الزمنية لجميع البيانات الزمنية. تتيح هذه الميزة إدارة البيانات بشكل متسق عبر عمليات النشر العالمية من خلال السماح للمستخدمين بتحديد سياق زمني افتراضي باستخدام خاصية المنطقة الزمنية في قواعد البيانات والمجموعات. والأهم من ذلك، يدعم الحقل بشكل كامل التصفية المستندة إلى التعبير لاستعلامات النطاق الزمني، وتدعم عمليات الاسترجاع (الاستعلام والبحث) معلمة المنطقة الزمنية للتحويل الفوري والفوري للطوابع الزمنية إلى التنسيق المحلي المطلوب عند الإخراج.</li>
<li>تعزيز التصنيف: بدلًا من الاعتماد فقط على التشابه الدلالي المحسوب على أساس المسافات المتجهة، يسمح Boost Ranker لـ Milvus باستخدام شرط التصفية الاختياري داخل الدالة للعثور على التطابقات بين نتائج البحث المرشحة ويعزز درجات تلك التطابقات من خلال تطبيق الوزن المحدد، مما يساعد على ترقية أو خفض تصنيف الكيانات المتطابقة في النتيجة النهائية.</li>
<li>يدعم فهرس STL_SORT الآن نوع بيانات VARCHAR و TIMESTAMPTZ.</li>
<li>يمكنك الآن تمكين الحقل الديناميكي لمجموعة موجودة عن طريق تغييرها.</li>
<li>تم إصلاح cve-2025-63811.</li>
</ul>
<h3 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>تمت إضافة تهيئة جديدة وتمكين تكوينات التحديث الديناميكي<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">تحسينات<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>تم إصلاح cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>تمت إزالة مصفوفات معرف المقطع الكبير من سجلات كويرينود<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>تم تحديث الأماكن المتعددة التي نسخ فيها expr قيم الإدخال في كل حلقة<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>أداء محسن لمصطلح expr<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)</li>
<li>قطع المتجهات مسبقة التجهيز للمقاطع المختومة غير المفهرسة<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>إكسبير: القطع مسبقة التجهيز مرة واحدة فقط<a href="https://github.com/milvus-io/milvus/pull/45555">(#4555545</a>)</li>
<li>إضافة دعم قابل للإلغاء لأنواع الهندسة و timestamptz<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>زيادة وقت الجلسة من 10 ثوانٍ إلى 30 ثانية<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>إضافة المزيد من المقاييس لإطار عمل ddl<a href="https://github.com/milvus-io/milvus/pull/45559">(#455559</a>)</li>
<li>تحديث إصدار تكوين الحد الأقصى للوصلات<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>تخطي التحقق من معرف المصدر<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>دعم تكوين max_connection max_connection للتخزين عن بُعد<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>منع الذعر عن طريق إضافة التحقق من المؤشر الفارغ عند مسح إزاحة pk2offset لإدراج السجل<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>إجراء بعض التحسينات على جلب الحقول العددية في سيناريوهات التخزين المتدرج<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>إصلاح الخطأ المطبعي في بارامز المحلل<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>تجاوز نوع_الفهرس أثناء إنشاء فهرس المقطع<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)</li>
<li>تمت إضافة دعم rbac ل updatereplicateconfiguration<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>رفع إصدار go إلى 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>تعطيل تمزيق jonshredding للتكوين الافتراضي<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>توحيد المخزن المؤقت المحاذي لكل من التخزين المؤقت والإدخال المباشر<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>إعادة تسمية بارامترات تكوين المستخدم ذات الصلة ب jsonstats<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)</li>
<li>جعل تكوين تجمع مؤشرات الترابط في مكان المعرفة قابلاً للتحديث<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>تصحيح منتقى بالكرز لإطار عمل ddl الجديد و cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>تعيين إصدار المخطط عند إنشاء مجموعة جديدة<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>دعم ملفات jsonl/ndjson المدعومة لملفات bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>انتظار انتهاء عميل دفق النسخ المتماثل<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>جعل geometrycache تكوينًا اختياريًا<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>تصحيح منتقى بالكرز من إطار عمل ddl الجديد و cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>عدم بدء تشغيل cdc افتراضيًا<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>التصحيح المنتقى بالكرز لإطار عمل ddl الجديد و cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(# 45025</a>)</li>
<li>إزالة الحد الأقصى لعدد الحقول المتجهة<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>إظهار وقت الإنشاء لمهمة الاستيراد<a href="https://github.com/milvus-io/milvus/pull/45059">(# 45059</a>)</li>
<li>تحسين تهيئة الصورة النقطية للفرز النقطي القياسي للفرز النقطي لاستعلامات النطاق<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>تمكين stl_sort لدعم varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#4505050</a>)</li>
<li>استخراج منطق عميل التجزئة في حزمة مخصصة<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>إعادة هيكلة إدارة الامتيازات عن طريق استخراج ذاكرة التخزين المؤقت للامتيازات في حزمة منفصلة<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>دعم قيم json الافتراضية في بيانات التعبئة<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>تحديث تمكين الحقل الديناميكي والمخطط أثناء تعديل المجموعة<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
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
<li>تم إصلاح ذعر التحديث الجزئي مع timestamptz<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>استخدام 2.6.6.6 لترقية milvus ddl<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>استخدام أحدث علامة زمنية لانتهاء صلاحية ذاكرة التخزين المؤقت<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>جعل عقدة البث تخرج عند فشل التهيئة<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>حماية tbb concurrent_map emplace لتجنب الجمود في حالة السباق<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)</li>
<li>منع الذعر عند إيقاف تشغيل تنسيق البث ولكن تنسيق الاستعلام لا يزال يعمل<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>تعيين بدء المهمة عندما لا يكون للعامل مهمة<a href="https://github.com/milvus-io/milvus/pull/45676">(#4567645</a>)</li>
<li>منع الجمود في مكون التشغيل عند فشل الإعداد<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)</li>
<li>منع حدوث ذعر عند الإغلاق المزدوج لقناة بث ack<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)</li>
<li>تم تصحيح ردم القيمة الافتراضية أثناء حقل الإضافة<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)</li>
<li>ضغط سجل التخصيص للقناة لتقليل حجم معلومات استرداد التخصيص<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>معالجة القيم الافتراضية بشكل صحيح أثناء ضغط الحقول المضافة<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>تمت إزالة اسم الحقل الذي تم التحقق من صحته في إسقاط الفهرس<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>تجاهل مهمة الضغط عندما لا يكون الجزء من المقطع غير سليم<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>تعيين خصائص المخطط قبل بث مجموعة التغيير<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)</li>
<li>تخزين حدث قاعدة البيانات إذا كان المفتاح غير صالح<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>إصلاح الخلل في الاستيراد الجماعي لحقل البنية<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>فشل الحصول على البيانات الأولية للفهرس الهجين<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>الاحتفاظ بالمجموعة في وقت مبكر لمنع تحريرها قبل اكتمال الاستعلام<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>استخدم قفل مفتاح المورد الصحيح لـ ddl واستخدم ddl الجديد في نسخة متماثلة للنقل<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>تم إصلاح توافق الفهرس بعد الترقية<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>إصلاح خطأ عدم توفر القناة وإصدار حظر المجموعة<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>تمت إزالة تعريف المجموعة عند إسقاط القسم<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>تم إصلاح الجزء المستهدف الذي تم وضع علامة إسقاط على الجزء الذي تم إسقاطه لحفظ الإحصائيات مرتين<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>تم تحديث توقيت معلومات المجموعة بشكل خاطئ<a href="https://github.com/milvus-io/milvus/pull/45471">(#4547145</a>)</li>
<li>تمت إضافة تبعية tzdata لتمكين التعرف على معرف المنطقة الزمنية لإيانا<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>تم تصحيح حساب إزاحة بيانات الحقل في دوال إعادة الترتيب للبحث الجماعي<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>تم إصلاح هندسة التصفية للتزايد باستخدام mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>لم يأخذ Nextfieldid في الاعتبار البنية<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438#</a>)</li>
<li>كانت قيمة المجموعة لا شيء<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>توفير تقدير دقيق لحجم مصفوفات الأسهم المقطعة في الضغط<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>إصلاح سباق البيانات في عميل دفق النسخ المتماثل<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>تخطي إنشاء فهرس نصي للأعمدة المضافة حديثًا<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>تجاهل المقاطع المختومة عن طريق الخطأ في ضغط l0<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>نقل تحميل النهاية قبل إنشاء الفهرس النصي لضمان توفر البيانات الأولية<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>عدم استخدام json_shredding لمسار json فارغ<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>إصلاحات منتقاة بالكرز تتعلق ب timestamptz<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321</a>)</li>
<li>إصلاح فشل تحميل المقطع بسبب الحصول على خطأ في استخدام القرص<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>دعم القيمة الافتراضية لـ json في الضغط<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>حساب حجم الدُفعة الصحيح لفهرس الهندسة للمقطع المتزايد<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>تطبيق تصحيح خطأ إطار عمل ddl<a href="https://github.com/milvus-io/milvus/pull/45292">(#4529245</a>)</li>
<li>تم إصلاح فشل تغيير التجميع مع إعداد mmap للهيكل<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>تم تهيئة نطاق الطابع الزمني في كاتب مدونة السجل المركب<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>تم تخطي إنشاء قرص tmp dir لفهرس r-tree المتزايد<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>تجنب حالات السباق المحتملة عند تحديث المنفذ<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>السماح ب "[" و "]" في اسم الفهرس<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>إصلاح الخلل في تمزيق json عندما يكون json فارغًا وليس فارغًا<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>التأكد من إمكانية إلغاء عملية الإلحاق فقط من قبل المحفظة نفسها وليس من قبل rpc<a href="https://github.com/milvus-io/milvus/pull/45079">(# 45079</a>)</li>
<li>تم حل مشكلة الوصول إلى التخزين السحابي wp gcp مع ak/sk<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>تم إصلاح استيراد بيانات هندسية فارغة<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>تمت إضافة فحص فارغ لـ pack_writer_ في jsonstatsparquetwriter::close()<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>فشل في تعيين mmap emb_list_meta في قائمة التضمين<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>تم تحديث مقاييس عدد نواتج الاستعلامات عندما لا تحتوي المجموعة على مقاطع<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>منع إعادة المحاولة عند استيراد سلاسل utf-8 غير صالحة<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>تم التعامل مع بيانات الحقول الفارغة في سيناريو الاختزال/الإعادة لسيناريو إعادة المحاولة<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>إصلاح الذعر عند إيقاف cdc بأمان<a href="https://github.com/milvus-io/milvus/pull/45095">(# 45095</a>)</li>
<li>تم إصلاح تلوث رمز المصادقة، ودعم oss/cos، وسجلات أخطاء المزامنة الزائدة عن الحاجة<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>التعامل مع البيانات الفارغة بالكامل في stringindexexsort لمنع انتهاء مهلة التحميل<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>تعطيل بناء الإصدار القديم jsonstats من الطلب<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>إصلاح الخلل في استيراد البيانات الهندسية<a href="https://github.com/milvus-io/milvus/pull/45090">(# 45090</a>)</li>
<li>إصلاح الخلل في استيراد الباركيه في الهيكل<a href="https://github.com/milvus-io/milvus/pull/45071">(# 45071</a>)</li>
<li>تمت إضافة getmetrics مرة أخرى إلى indexnodeserver لضمان التوافق<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>تم إصلاح فشل تغيير التجميع للمجالات الفرعية للهيكل<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>تم إصلاح عدم سريان مفعول mmap على مستوى التجميع للهيكل<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>منع سباق البيانات الممنوع في تحديث إعلام مجموعة الاستعلامات<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>معالجة القيم الافتراضية لحقل json في طبقة التخزين<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>تم التدقيق المزدوج لتجنب محو التكرار بواسطة مؤشر ترابط آخر<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>إصلاح الخلل في دالة gis لتصفية الهندسة<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 11 نوفمبر 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار الإصدار Milvus 2.6.5، الذي يعالج <strong>ثغرة أمنية خطيرة</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> وترقية إلى الإصدار Go 1.24.9. نشجع بشدة <strong>جميع مستخدمي Milvus 2.6.x على الترقية إلى 2.6.5 في</strong> أقرب وقت ممكن. يتضمن هذا التحديث أيضًا العديد من التحسينات وإصلاحات الأخطاء الأخرى، ويوفر للمستخدمين تجربة أكثر قوة وكفاءة.</p>
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
<li>تحديث علامة صورة المنشئ المحدثة لترقية go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>تخطي التحقق من معرف المصدر<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
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
<li>قيمة المجموعة لا شيء<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>تم تهيئة نطاق الطابع الزمني في كاتب مدونة السجل المركب (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>التعامل مع بيانات الحقول الفارغة في تصغير/رئيسي لسيناريو إعادة البحث (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>تمت إضافة فحص فارغ لـ pack_writer_ في jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>تخطي إنشاء فهرس نصي للأعمدة المضافة حديثًا<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>تجاهل المقاطع المختومة عن طريق الخطأ في ضغط l0<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>نقل تحميل النهاية قبل إنشاء الفهرس النصي لضمان توفر البيانات الأولية<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>دعم قيمة json الافتراضية المدعومة في الضغط<a href="https://github.com/milvus-io/milvus/pull/45332">(#4533245</a>)</li>
<li>تم تحديث تخزين ميلفوس-التخزين لإصلاح تهيئة aws sdk المكررة (<a href="https://github.com/milvus-io/milvus/pull/45075"># 45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار 21 أكتوبر 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار الإصدار Milvus 2.6.4، الذي يتميز بمجموعة من الإمكانات الجديدة القوية وتحسينات الأداء وإصلاحات الأخطاء الأساسية. يقدم هذا التحديث ميزات مهمة مثل Struct in ARRAY لنمذجة البيانات المتقدمة. بالإضافة إلى ذلك، قمنا بتمكين خاصية JSON Shredding بشكل افتراضي، مما يزيد من تحسين أداء الاستعلام وكفاءته. كما تمت معالجة العديد من الأخطاء الحرجة لضمان المزيد من الاستقرار والموثوقية. مع هذا الإصدار، تواصل Milvus توفير تجربة أكثر قوة وكفاءة لجميع المستخدمين. فيما يلي أبرز الملامح الرئيسية لهذا الإصدار.</p>
<h3 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>الهيكل في ARRAY: قدم Milvus نوع البيانات الجديد، Struct، مما يسمح للمستخدمين بتنظيم وإدارة حقول متعددة ذات صلة داخل كيان واحد. في الوقت الحالي، لا يمكن استخدام Struct إلا كعنصر تحت DataType.ARRAY، مما يتيح ميزات مثل Array of Vector، حيث يحتوي كل صف على عدة متجهات، مما يفتح إمكانيات جديدة لنمذجة البيانات المعقدة والبحث.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>دعم نموذج Qwen GTE-rerank-v2 في DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
<li>دعم فهرس AISAQ - فهرس الكل في التخزين<a href="https://github.com/zilliztech/knowhere/pull/1282">(#1282</a>)</li>
</ul>
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
<li><strong>ترقية إصدار Go إلى 1.24.6</strong> مع أداة إنشاء الصور<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>تم تمكين تمزيق JSON الافتراضي<a href="https://github.com/milvus-io/milvus/pull/44811">(# 44811</a>)</li>
<li>تمت إضافة حصة القرص لحجم مدونة البيانات المحملة لمنع فشل تحميل عقدة الاستعلام<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>تمكين دعم mmap لدعم المصفوفة الهيكلية في MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(# 44832</a>)</li>
<li>إضافة إدارة طبقة التخزين المؤقت لطبقة التخزين المؤقت ل TextMatchIndex<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>تحسين أداء البحث العكسي للصورة النقطية (<a href="https://github.com/milvus-io/milvus/pull/44838"># 44838</a>)</li>
<li>نسخة محدثة من Knowhere<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>تمت إزالة عمليات التحقق من الاستخدام المنطقي أثناء تحميل المقطع<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770#</a>)</li>
<li>تمت إضافة حقل سجل الوصول لمعلومات طول قيمة القالب<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>السماح بالكتابة فوق نوع الفهرس الحالي أثناء إنشاء الفهرس<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>تمت إضافة معلمات تحميل لفهرس المتجهات<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>إدارة حالة مهمة منفذ الضغط الموحد<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>تمت إضافة سجلات محسنة لجدولة المهام في QueryCoord<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>التأكد من أن accesslog.$consistency_level يمثل القيمة الفعلية المستخدمة (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>إزالة مدير القناة الزائدة عن الحاجة من داتاكورد<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
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
<li>تمت إزالة GCC من ملف إنشاء Dockerfile لإصلاح CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(# 44882</a>)</li>
<li>ضمان ترتيب نتائج البحث الحتمي عند تساوي الدرجات<a href="https://github.com/milvus-io/milvus/pull/44884">(# 44884</a>)</li>
<li>إعادة الترتيب قبل إعادة البحث إذا لم تستخدم أداة إعادة الترتيب بيانات الحقل<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>ضمان الوفاء بالوعد عند قيام CreateArrowFileSystem بإلقاء استثناء<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>إصلاح تكوين تشفير القرص المفقود<a href="https://github.com/milvus-io/milvus/pull/44839">(# 44839</a>)</li>
<li>تم إصلاح مشكلة إلغاء تنشيط مدقق الرصيد التي تسبب مشكلة توقف الرصيد<a href="https://github.com/milvus-io/milvus/pull/44836">(# 44836</a>)</li>
<li>تم إصلاح مشكلة عدم تضمين "غير متساوٍ" لا يتضمن "لا شيء"<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>دعم قيمة JSON الافتراضية في إنشاءArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>استخدام سلسلة تصحيح الأخطاء القصيرة لتجنب الأسطر الجديدة في سجلات التصحيح<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>تم إصلاح تعبير موجود لفهرس JSON المسطح<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>توحيد دلالات المسار الموجود في JSON<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>إصلاح الذعر الناجم عن رسالة إدراج داخلية فارغة<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>تحديث معلمات AI/SAQ<a href="https://github.com/milvus-io/milvus/pull/44862">(# 44862</a>)</li>
<li>إزالة حد إلغاء التكرار عند تعطيل الفهرس التلقائي<a href="https://github.com/milvus-io/milvus/pull/44824">(# 44824</a>)</li>
<li>تجنب عمليات إعادة التعيين/الإضافة المتزامنة على مقاييس DataCoord<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>تم إصلاح الخلل في JSON_contains(المسار، int)<a href="https://github.com/milvus-io/milvus/pull/44818">(44818/4</a>)</li>
<li>تجنب الإخلاء في طبقة التخزين المؤقت أثناء معالجة JSON<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>تم إصلاح النتائج الخاطئة من مرشح exp عند التخطي<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>التحقق مما إذا كانت عقدة الاستعلام هي SQN مع التسمية وقائمة عقدة التدفق<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>إصلاح BM25 مع التعزيز الذي يُرجع نتائج غير مرتبة<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>إصلاح الاستيراد بالجملة مع المعرف التلقائي<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>تمرير نظام الملفات عبر FileManagerContext عند تحميل الفهرس<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>استخدام "في النهاية" ومعرف المهمة الثابت الذي يظهر في كل من حالتي التنفيذ والإكمال<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>تمت إزالة علامة وقت البدء غير الصحيحة لتجنب تصفية DMLs ذات المدد الزمنية الأقل منها<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>جعل موفر بيانات اعتماد AWS موفر وحيد<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>تعطيل التمزيق لمسار JSON الذي يحتوي على أرقام<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>اختبار وحدة صالح ثابت لاختبار TestUnaryRangeJsonNullable<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>تم إصلاح اختبارات الوحدة وإزالة المنطق الاحتياطي لنظام الملفات<a href="https://github.com/milvus-io/milvus/pull/44686">(#4468644</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار 11 أكتوبر 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>يسرنا أن نعلن عن إصدار الإصدار Milvus 2.6.3، والذي يقدم مجموعة متنوعة من الميزات الجديدة المثيرة والتحسينات وإصلاحات الأخطاء الهامة. يعمل هذا الإصدار على تحسين أداء النظام وتوسيع الوظائف وإصلاح المشكلات الرئيسية، مما يوفر تجربة أكثر استقرارًا لجميع المستخدمين. فيما يلي أبرز ميزات هذا الإصدار:</p>
<h3 id="New-Features" class="common-anchor-header">الميزات الجديدة<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>المفتاح الأساسي مع تمكين المعرف التلقائي: يمكن للمستخدمين الآن كتابة حقل المفتاح الأساسي عند تمكين <code translate="no">autoid</code>.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>الضغط اليدوي لمقاطع L0: تمت إضافة دعم لضغط مقاطع L0 يدوياً.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>ترميز معرّف المجموعة في المعرّف التلقائي: ستتضمن المعرّفات التي يتم إنشاؤها تلقائيًا الآن معرّف المجموعة.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>دعم ترميز gRPC: تكامل أداة ترميز gRPC لتعزيز مرونة الاستعلام.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
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
<li>تحسين مدقق التوازن من خلال تنفيذ قائمة انتظار ذات أولوية، وتحسين توزيع المهام.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>إحصائيات BM25 المحملة مسبقًا لقطاعات مختومة وتسلسل محسن.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>يمكن الآن استخدام الحقول القابلة للإلغاء كمدخلات لدوال BM25. (<a href="https://github.com/milvus-io/milvus/pull/44586">#44586</a>)</li>
<li>تمت إضافة دعم لتخزين Azure Blob Storage في Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>تطهير الملفات الصغيرة مباشرةً بعد ضغط مقطع Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>تمكين وظيفة النتيجة العشوائية لتعزيز الاستعلامات.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>خيارات تكوين جديدة لنوع المتجه <code translate="no">int8</code> في الفهرسة التلقائية.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>تمت إضافة عناصر معلمات للتحكم في سياسة إعادة البحث الهجين.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>تمت إضافة دعم للتحكم في إدراج حقول مخرجات الدالة.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>تدعم دالة الاضمحلال الآن دمج الدرجات القابلة للتكوين لتحسين الأداء.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>تحسين أداء البحث الثنائي على السلاسل.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>تقديم دعم للمرشحات المتفرقة في الاستعلامات. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>تحديثات مختلفة لتحسين وظيفة الفهرس المتدرج.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>إضافة تتبع استخدام موارد التخزين لعمليات البحث القياسية والمتجهة.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>إضافة استخدام التخزين للحذف/التعديل/الاستراحة<a href="https://github.com/milvus-io/milvus/pull/44512">(# 44512</a>)</li>
<li>تمكين أهداف التدفق الحبيبي لعمليات <code translate="no">flushall</code>.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>ستستخدم Datanodes الآن نظام ملفات غير منفصلة لإدارة الموارد بشكل أفضل.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>خيارات التكوين المضافة لمعالجة الدُفعات في البيانات الوصفية. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>تتضمن رسائل الخطأ الآن اسم قاعدة البيانات لتوضيح أفضل.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>تم نقل اختبار التتبع إلى مستودع <code translate="no">milvus-common</code> لتحسين النمذجة.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>نقل ملفات اختبار وحدة C API جانبًا إلى دليل <code translate="no">src</code> لتنظيم أفضل.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>تسمح الآن Go SDK للمستخدمين بإدراج بيانات المفتاح الأساسي إذا تم تمكين <code translate="no">autoid</code>.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
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
<li>تم حل الثغرات الأمنية CVE-2020-25576 و WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>تم إصلاح مشكلة استخدام الموارد المنطقية للمقاييس في مركز الحصص في عقد التدفق.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>تعيين <code translate="no">mixcoord</code> في <code translate="no">activatefunc</code> عند تمكين وضع الاستعداد.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>إزالة التهيئة الزائدة عن الحاجة لمكونات التخزين V2. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>إصلاح حظر مهمة الضغط بسبب الخروج من حلقة المنفذ. (<a href="https://github.com/milvus-io/milvus/pull/44543">#44543</a>)</li>
<li>إعادة تحميل استخدام الموارد المحملة في المدمر <code translate="no">insert/deleterecord</code>.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>تم إصلاح مشكلة تعذر توقف المُكرر وتحسين أداة التحقق من صحة تكوين النسخ المتماثل. (<a href="https://github.com/milvus-io/milvus/pull/44531">#44531</a>)</li>
<li>تعيين <code translate="no">mmap_file_raii_</code> إلى <code translate="no">nullptr</code> عند تعطيل mmap.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>جعل <code translate="no">diskfilemanager</code> يستخدم نظام الملفات من السياق.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>فرض المضيف الظاهري لـ OSS وCOS في التخزين V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>تعيين القيمة الافتراضية <code translate="no">report_value</code> عندما لا يكون <code translate="no">extrainfo</code> <code translate="no">nil</code> للتوافق.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>تنظيف مقاييس المجموعة بعد إسقاط المجموعات في rootcoord. (<a href="https://github.com/milvus-io/milvus/pull/44511">#44511</a>)</li>
<li>تم إصلاح فشل تحميل المقطع بسبب تكرار خصائص الحقل <code translate="no">mmap.enable</code>.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>تم إصلاح أخطاء تحليل تكوين التحميل للنسخ المتماثلة الديناميكية.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>معالجة إدخال صف إلى عمود للأعمدة الديناميكية في Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>تاريخ الإصدار: 19 سبتمبر 2025</p>
<table>
<thead>
<tr><th style="text-align:left">إصدار ميلفوس</th><th style="text-align:left">إصدار Python SDK</th><th style="text-align:left">إصدار Node.js SDK</th><th style="text-align:left">إصدار Java SDK</th><th style="text-align:left">إصدار Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>نحن متحمسون للإعلان عن إصدار الإصدار Milvus 2.6.2! يقدم هذا التحديث ميزات جديدة قوية، وتحسينات كبيرة في الأداء، وإصلاحات مهمة تجعل النظام أكثر استقرارًا وجاهزًا للإنتاج. تتضمن الميزات البارزة تحديثات جزئية للحقول مع التحديثات الجزئية مع ميزة الإدراج، وتقطيع JSON Shredding لتسريع تصفية الحقول الديناميكية، وفهرسة NGram لفهرسة NGram من أجل استعلامات LIKE أسرع، وتطوير مخطط أكثر مرونة على المجموعات الحالية. بناءً على ملاحظات المجتمع، يوفر هذا الإصدار أساسًا أقوى لعمليات النشر في العالم الحقيقي، ونحن نشجع جميع المستخدمين على الترقية للاستفادة من هذه التحسينات.</p>
<h3 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>إضافة دعم لتقطيع JSON Shredding لتسريع تصفية الحقول الديناميكية. لمزيد من التفاصيل، راجع <a href="/docs/ar/json-shredding.md">JSON Shredding</a>.</li>
<li>دعم مضاف لفهرس NGRAM لتسريع عملية مماثلة. لمزيد من التفاصيل، راجع <a href="/docs/ar/ngram.md">NGRAM</a>.</li>
<li>تمت إضافة دعم للتحديثات الجزئية للحقول باستخدام واجهة برمجة تطبيقات Upsert. لمزيد من التفاصيل، ارجع إلى <a href="/docs/ar/upsert-entities.md">Upsert Entities</a>.</li>
<li>تمت إضافة دعم لوظيفة التعزيز. لمزيد من التفاصيل، ارجع إلى <a href="/docs/ar/boost-ranker.md">Boost Ranker</a>.</li>
<li>إضافة دعم للتجميع حسب حقول JSON والحقول الديناميكية<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>تمت إضافة دعم لتمكين المخطط الديناميكي على المجموعات الحالية<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>إضافة دعم لإسقاط الفهارس دون تحرير المجموعات<a href="https://github.com/milvus-io/milvus/pull/42941">(# 42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">تحسينات<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>[StorageV2] تغيير حجم ملف السجل إلى حجم مضغوط<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] إضافة حقول فرعية في معلومات التحميل<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] تمت إضافة دعم لتضمين مفاتيح التقسيم والتجميع في مجموعة النظام<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>تمت إزالة المهلة لمهام الضغط<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] تم تمكين الإنشاء مع Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] استخدام معلومات المجموعة المستخدمة لتقدير استخدام المنطق<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] استخدام معلومات تقسيم المجموعة لتقدير الاستخدام<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] نتائج مجموعة الأعمدة المحفوظة في الضغط<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] تكوينات مضافة لنهج التقسيم المستند إلى الحجم<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] تمت إضافة دعم لنهج التقسيم المستند إلى المخطط ونهج التقسيم المستند إلى الحجم<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] إضافة نهج تقسيم قابل للتكوين<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[طبقة التخزين المؤقت] تمت إضافة المزيد من المقاييس والتكوينات<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>تمت إضافة دعم لانتظار أن تكون جميع المؤشرات جاهزة قبل تحميل المقاطع<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>تمت إضافة مقياس الكمون الأساسي الداخلي لعقدة إعادة التحميل<a href="https://github.com/milvus-io/milvus/pull/44010">(#444010</a>)</li>
<li>تحسين تنسيق سجل الوصول عند طباعة بارامترات KV<a href="https://github.com/milvus-io/milvus/pull/43742">(# 43742</a>)</li>
<li>تكوين مضاف لتعديل حجم دفعة لقطات التفريغ<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>تقليل الفاصل الزمني لتنظيف مهمة الضغط<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>فرز الدمج المحسن لدعم حقول متعددة<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>إضافة تقدير موارد التحميل للفهرس المتدرج<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>تمت إضافة تكوين الفهرس التلقائي لحالة إلغاء التكرار<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>تكوين مضاف للسماح بالأحرف المخصصة في الأسماء (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>إضافة دعم قناة cchannel لخدمة البث<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>تمت إضافة كتم الصوت وفحص النطاق لحماية عمليات الحذف المتزامنة<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
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
<li>مواءمة سلوك التعبيرات الموجودة بين القوة الغاشمة والفهرس<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>تم إصلاح الخطأ عند إعادة التسمية إلى مجموعة مسقطة<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] التحقق من طول الحقول الفرعية<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] تم تشغيل Azure افتراضيًا<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>تم تصحيح مسار التحميل المصحح لعمليات تجميع L0 تحت تجميع رموز البيانات<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>إلغاء السماح بإعادة التسمية إذا تم تمكين تشفير قاعدة البيانات<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>عدم السماح بحذف خاصية dynamicfield.enable<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>وضع علامة على المهام على أنها فاشلة عندما يكون المعرف المخصص مسبقًا غير صالح<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>تخطي عمليات التحقق من MVCC على تعبيرات مقارنة PK<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>إصلاح خطأ json_contains للإحصائيات<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>تمت إضافة التحقق من نظام ملفات التهيئة لعقدة الاستعلام وعقدة التدفق<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>تم إصلاح هدف الضغط الفارغ عند تجميع القطعة في القمامة<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>إصلاح حالة السباق عند تهيئة فهرس الطابع الزمني<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>تم التحقق مما إذا كانت بيانات المصفوفة لا شيء لمنع الذعر<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>إصلاح خطأ في إنشاء إحصائيات JSON للكائنات المتداخلة<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>تجنب إعادة كتابة mmap بواسطة حقول JSON متعددة<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>توحيد تنسيقات البيانات الصالحة<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>إخفاء بيانات اعتماد موفري التضمين/إعادة الترتيب في واجهة مستخدم الويب<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>تصحيح مسار مدونة الإحصائيات تحت تجميع رموز البيانات<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>تصحيح مسار أوراكل IDF أوراكل<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>تم استخدام نقطة فحص لقطة الاسترداد في حالة عدم استرداد قناة vchannel<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>عدد الأعمدة المحدود في إحصائيات JSON<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>جعل عدد موارد التحميل فهرس n-غرام<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>استنتاج نوع المقياس من نتائج البحث غير الفارغة<a href="https://github.com/milvus-io/milvus/pull/44222">(#4422244</a>)</li>
<li>إصلاح الكتابة متعددة الأجزاء بكتابة جزء واحد فقط<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>تم إصلاح فرز الدمج خارج النطاق<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>تمت إضافة التحقق من UTF-8 قبل تنفيذ دالة BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>إعادة تجربة الجلسة القديمة إذا كانت موجودة<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>تمت إضافة حد لحجم المخزن المؤقت لكافكا لمنع خروج عقدة البيانات عن النطاق<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>تم إصلاح الذعر من خلال توسيع نطاق حراسة القفل<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>إصلاح عدم مسح المقاطع المتزايدة عند تغيير المخطط<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] معالجة أخطاء الإدخال والإخراج<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>منع الذعر في حالة عدم وجود مسار فهرس Tantivy<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
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
<li>إصلاح مشكلة محتملة لنفاد الذاكرة (OOM) أثناء عمليات استيراد ملفات الباركيه<a href="https://github.com/milvus-io/milvus/pull/43756">(43756/43756</a>)</li>
<li>إصلاح مشكلة تعذر استرداد العقد الاحتياطية إذا انتهت صلاحية عقد الإيجار<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>معالجة حالة إعادة محاولة الضغط بشكل صحيح<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
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
<li>إصلاح عطل محتمل نادر في خادم HTTP الداخلي<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
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
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">الجديد في الإصدار 2.6.0 (منذ RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">تنسيق التخزين المُحسَّن الإصدار 2</h4><p>لمواجهة تحديات تخزين البيانات القياسية والمتجهة المختلطة، وخاصةً عمليات البحث النقطية على البيانات غير المهيكلة، يقدم Milvus 2.6 تنسيق التخزين V2. يتبنى تنسيق التخزين العمودي التكيفي الجديد هذا استراتيجية تخطيط "دمج الأعمدة الضيقة + استقلالية الأعمدة العريضة"، مما يحل بشكل أساسي اختناقات الأداء عند التعامل مع عمليات البحث النقطية وعمليات الاسترجاع ذات الدُفعات الصغيرة في قواعد البيانات المتجهة.</p>
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
<h4 id="Streaming-Node-GA" class="common-anchor-header">عقدة التدفق (GA)</h4><p>في الإصدارات السابقة، كان يتم كتابة البيانات المتدفقة إلى WAL بواسطة الوكيل، وقراءتها بواسطة QueryNode وDataNode. جعلت هذه البنية من الصعب تحقيق الإجماع على جانب الكتابة، مما تطلب منطقًا معقدًا على جانب القراءة. بالإضافة إلى ذلك، تم وضع مفوض الاستعلام في QueryNode، مما أعاق قابلية التوسع. قدم الإصدار 2.5.0 من ميلفوس 2.5.0 عقدة التدفق، والتي أصبحت GA في الإصدار 2.6.0. هذا المكون مسؤول الآن عن جميع عمليات قراءة/كتابة WAL على مستوى السرداب ويعمل أيضًا كمفوض استعلام، مما أدى إلى حل المشكلات المذكورة أعلاه وتمكين التحسينات الجديدة.</p>
<p><strong>إشعار ترقية مهم</strong>: يعد تدفق العقدة تغييرًا معماريًا كبيرًا، لذلك لا يتم دعم الترقية المباشرة إلى Milvus 2.6.0-rc1 من الإصدارات السابقة.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">وودبيكر الأصلي WAL</h4><p>كان ميلفوس يعتمد في السابق على أنظمة خارجية مثل Kafka أو Pulsar في نظام WAL الخاص به. وعلى الرغم من أن هذه الأنظمة كانت فعالة، إلا أنها أضافت تعقيدًا تشغيليًا كبيرًا ونفقات زائدة على الموارد، خاصةً بالنسبة لعمليات النشر الصغيرة والمتوسطة الحجم. في الإصدار Milvus 2.6، تم استبدال هذه الأنظمة ب Woodpecker، وهو نظام WAL مصمم خصيصًا للسحابة. صُمم Woodpecker لتخزين الكائنات، حيث يدعم كلاً من وضعي التخزين المحلي وتخزين الكائنات القائم على التخزين الصفري القائم على التخزين المحلي والكائنات، مما يبسط العمليات مع تحسين الأداء وقابلية التوسع.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">دمج عقدة البيانات وعقدة الفهرس</h4><p>في الإصدار Milvus 2.6، تتم الآن إدارة مهام مثل الضغط والاستيراد الجماعي وجمع الإحصائيات وبناء الفهرس بواسطة جدولة موحدة. تم نقل وظيفة ثبات البيانات التي كانت تتم معالجتها سابقًا بواسطة DataNode إلى عقدة التدفق. لتبسيط عملية النشر والصيانة، تم دمج عقدة الفهرس وعقدة البيانات في مكون DataNode واحد. تقوم هذه العقدة المدمجة الآن بتنفيذ جميع هذه المهام الحرجة، مما يقلل من التعقيد التشغيلي ويحسن استخدام الموارد.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">دمج المنسق في MixCoord</h4><p>أدى التصميم السابق مع وحدات RootCoord وCuord الاستعلام وDataCoord المنفصلة إلى تعقيد الاتصال بين الوحدات. لتبسيط تصميم النظام، تم دمج هذه المكونات في منسق واحد موحد يسمى MixCoord. يقلل هذا الدمج من تعقيد البرمجة الموزعة من خلال استبدال الاتصال القائم على الشبكة باستدعاءات الدالة الداخلية، مما يؤدي إلى تشغيل النظام بشكل أكثر كفاءة وتبسيط التطوير والصيانة.</p>
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
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">مؤشر MinHash LSH (بيتا)</h4><p>لتلبية الحاجة إلى إلغاء البيانات المكررة في تدريب النموذج، يضيف Milvus 2.6 دعمًا لفهارس MINHASH_LSH. توفر هذه الميزة طريقة فعالة حسابيًا وقابلة للتطوير لتقدير تشابه Jaccard بين المستندات لتحديد التكرارات شبه المكررة. يمكن للمستخدمين إنشاء تواقيع MinHash_LSH لمستنداتهم النصية أثناء المعالجة المسبقة واستخدام فهرس MINHASH_LSH في Milvus للعثور على محتوى متشابه بكفاءة في مجموعات البيانات واسعة النطاق، مما يحسن من تنظيف البيانات وجودة النموذج.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">وظائف الاضمحلال الواعية بالوقت</h4><p>يقدّم الإصدار Milvus 2.6 وظائف الاضمحلال المدرك للوقت لمعالجة السيناريوهات التي تتغير فيها قيمة المعلومات بمرور الوقت. أثناء إعادة تصنيف النتائج، يمكن للمستخدمين تطبيق دوال التضاؤل الأسي أو الغوسي أو الخطي بناءً على حقل الطابع الزمني لضبط درجة أهمية المستند. يضمن ذلك إعطاء الأولوية للمحتوى الأحدث، وهو أمر بالغ الأهمية لتطبيقات مثل موجز الأخبار والتجارة الإلكترونية وذاكرة وكيل الذكاء الاصطناعي.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/decay-ranker-overview.md">نظرة عامة</a> على <a href="/docs/ar/decay-ranker-overview.md">نظرة عامة على مصنف الاضمحلال</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">إضافة حقل لتطور المخطط عبر الإنترنت</h4><p>لتوفير مرونة أكبر في المخطط، يدعم Milvus 2.6 الآن إضافة حقل قياسي جديد إلى مخطط مجموعة موجودة على الإنترنت. وهذا يتجنب الحاجة إلى إنشاء مجموعة جديدة وإجراء عملية ترحيل بيانات معطلة عند تغيير متطلبات التطبيق.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/add-fields-to-an-existing-collection.md">إضافة حقول إلى مجموعة موجودة</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">دعم متجه INT8</h4><p>استجابةً للاستخدام المتزايد للنماذج الكمية التي تنتج تضمينات 8 بت من الأعداد الصحيحة، يضيف الإصدار Milvus 2.6 دعم نوع البيانات الأصلي لمتجهات INT8. يسمح ذلك للمستخدمين باستيعاب هذه المتجهات مباشرةً دون إزالة التكافؤ، مما يوفر تكاليف الحساب وعرض النطاق الترددي للشبكة وتكاليف التخزين. هذه الميزة مدعومة مبدئيًا لفهارس عائلة HNSW.</p>
<p>لمزيد من المعلومات، راجع <a href="/docs/ar/dense-vector.md">المتجهات الكثيفة</a>.</p>
