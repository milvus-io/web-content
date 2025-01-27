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
<p>نحن متحمسون للإعلان عن إصدار الإصدار Milvus 2.5.4، والذي يقدم تحسينات رئيسية في الأداء وميزات جديدة مثل عزل مفتاح التقسيم والفهرس المتناثر مع DAAT MaxScore وآليات تأمين محسّنة. ومن أبرز ما يميز هذا الإصدار هو دعمه لـ 10,000 مجموعة ومليون قسم، مما يمثل علامة فارقة رئيسية لحالات الاستخدام متعدد المستأجرين. يعالج هذا الإصدار أيضًا العديد من الأخطاء التي تعمل على تحسين الاستقرار والموثوقية بشكل عام، وقد يتسبب اثنان من الأخطاء الحرجة في فقدان البيانات. نحن نشجعك على الترقية أو تجربة هذا الإصدار الأخير، ونتطلع إلى تلقي ملاحظاتك لمساعدتنا في تحسين Milvus باستمرار!</p>
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
<li>تم إصلاح فشل الحذف الناجم عن التزامن غير السليم بين مهام الإحصائيات وضغط L0 بعد إعادة تشغيل MixCoord<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>إصلاح عدم توافق الفهرس المقلوب العددي عند الترقية من 2.4 إلى 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">إصلاحات الأخطاء</h3><ul>
<li>تم إصلاح مشكلات الاستعلام البطيء الناجمة عن دقة القفل الخشنة أثناء تحميل أعمدة متعددة<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>تم إصلاح مشكلة حيث يمكن أن يؤدي استخدام الأسماء المستعارة إلى اجتياز مكرر قاعدة البيانات الخطأ<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>إصلاح فشل تحديث مجموعة الموارد عند تغيير قاعدة البيانات<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>تم إصلاح مشكلة متقطعة حيث لم يتمكن فهرس tantivy من حذف ملفات الفهرس أثناء الإصدار<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>تم إصلاح بطء الفهرسة البطيء الناجم عن وجود عدد كبير جداً من الخيوط<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>تم إصلاح مشكلة منع تخطي عمليات التحقق من حصص الأقراص أثناء الاستيراد الجماعي<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>تم حل مشكلات التجميد الناتجة عن وجود عدد كبير جدًا من مستهلكي قائمة انتظار الرسائل عن طريق الحد من التزامن<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>إصلاح مهلات الاستعلامات التي تسببها إعادة تشغيل MixCoord أثناء عمليات الدمج واسعة النطاق<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>إصلاح مشاكل عدم توازن القنوات الناجمة عن تعطل العقدة<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>تم إصلاح مشكلة قد تتسبب في تعطل توازن القناة.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
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
<li>إصلاح مشكلة حيث يمكن أن يؤدي استخدام عامل تصفية <code translate="no">IN</code> على مفتاح أساسي <code translate="no">VARCHAR</code> إلى إرجاع نتائج فارغة.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
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
<p>يجلب الإصدار 2.5.0 من Milvus 2.5.0 تطورات كبيرة لتعزيز قابلية الاستخدام وقابلية التوسع والأداء للمستخدمين الذين يتعاملون مع البحث المتجه وإدارة البيانات على نطاق واسع. من خلال هذا الإصدار، يدمج Milvus ميزات جديدة قوية مثل البحث القائم على المصطلحات، وضغط التجميع للاستعلامات المحسّنة، والدعم المتنوع لأساليب البحث المتجهية المتفرقة والكثيفة. تقدم التحسينات في إدارة المجموعات والفهرسة ومعالجة البيانات مستويات جديدة من المرونة وسهولة الاستخدام، مما يجعل من Milvus قاعدة بيانات متجهات أكثر قوة وسهولة في الاستخدام.</p>
<h3 id="Key-Features" class="common-anchor-header">الميزات الرئيسية</h3><h4 id="Full-Text-Search" class="common-anchor-header">بحث نصي كامل</h4><p>يدعم الإصدار Milvus 2.5 البحث في النص الكامل المنفذ باستخدام Sparse-BM25! تعد هذه الميزة مكملًا مهمًا لقدرات البحث الدلالي القوية في ميلفوس خاصةً في السيناريوهات التي تتضمن كلمات نادرة أو مصطلحات تقنية. في الإصدارات السابقة، دعمت Milvus المتجهات المتفرقة للمساعدة في سيناريوهات البحث بالكلمات الرئيسية. تم إنشاء هذه المتجهات المتفرقة خارج Milvus بواسطة نماذج عصبية مثل SPLADEv2/BGE-M3 أو نماذج إحصائية مثل خوارزمية BM25.</p>
<p>يحتوي Milvus 2.5، المدعوم من <a href="https://github.com/quickwit-oss/tantivy">Tantivy،</a> على محلل مدمج واستخراج متجهات متناثرة، مما يوسع واجهة برمجة التطبيقات من تلقي المتجهات فقط كمدخلات إلى قبول النص مباشرةً. يتم تحديث المعلومات الإحصائية BM25 في الوقت الحقيقي عند إدخال البيانات، مما يعزز قابلية الاستخدام والدقة. بالإضافة إلى ذلك، توفر المتجهات المتفرقة المستندة إلى خوارزميات أقرب جار تقريبي (ANN) أداءً أقوى من أنظمة البحث القياسية للكلمات الرئيسية.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md">نظرة عامة على المحلل</a> <a href="/docs/ar/full-text-search.md">والبحث في النص الكامل</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">واجهة ويب لإدارة المجموعات (بيتا)</h4><p>لدعم البيانات الضخمة والميزات الغنية بشكل أفضل، يتضمن تصميم Milvus المتطور العديد من التبعيات والعديد من أدوار العقد، وهياكل البيانات المعقدة، وغير ذلك. يمكن أن تشكل هذه الجوانب تحديات للاستخدام والصيانة.</p>
<p>يقدّم الإصدار 2.5 من ميلفوس 2.5 واجهة ويب مدمجة لإدارة المجموعات (Cluster Management WebUI)، مما يقلل من صعوبة صيانة النظام من خلال عرض معلومات بيئة وقت تشغيل ميلفوس المعقدة. ويتضمن ذلك تفاصيل قواعد البيانات والمجموعات والمقاطع والقنوات والتبعيات وحالة صحة العقدة ومعلومات المهام والاستعلامات البطيئة والمزيد.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">مطابقة النص</h4><p>تستفيد Milvus 2.5 من أدوات التحليل والفهرسة من <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> للمعالجة المسبقة للنصوص وبناء الفهرس، مما يدعم مطابقة اللغة الطبيعية الدقيقة للبيانات النصية استنادًا إلى مصطلحات محددة. تُستخدم هذه الميزة في المقام الأول للبحث المصفى لاستيفاء شروط محددة ويمكنها دمج التصفية القياسية لتحسين نتائج الاستعلام، مما يسمح بالبحث عن التشابه داخل المتجهات التي تستوفي المعايير القياسية.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md">نظرة عامة على المحلل</a> <a href="/docs/ar/keyword-match.md">ومطابقة النص</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">فهرس الصور النقطية</h4><p>تمت إضافة فهرس بيانات قياسي جديد إلى عائلة ميلفوس. ويستخدم فهرس الخريطة النقطية مصفوفة من البتات، مساوية في الطول لعدد الصفوف، لتمثيل وجود القيم وتسريع عمليات البحث.</p>
<p>عادةً ما تكون فهارس الخريطة النقطية فعالة للحقول منخفضة البطاقات، والتي تحتوي على عدد متواضع من القيم المميزة - على سبيل المثال، عمود يحتوي على معلومات عن الجنس مع قيمتين محتملتين فقط: ذكر وأنثى.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/bitmap.md">فهرس الصور النقطية</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">القيمة اللاغية والافتراضية</h4><p>يدعم Milvus الآن تعيين الخصائص القابلة للإلغاء والقيم الافتراضية للحقول القياسية بخلاف حقل المفتاح الأساسي. بالنسبة للحقول العددية التي تم وضع علامة <code translate="no">nullable=True</code> ، يمكن للمستخدمين حذف الحقل عند إدراج البيانات؛ وسيتعامل النظام مع الحقل كقيمة لاغية أو قيمة افتراضية (إذا تم تعيينها) دون طرح خطأ.</p>
<p>توفر القيم الافتراضية والخصائص القابلة للإلغاء مرونة أكبر لـ Milvus. يمكن للمستخدمين الاستفادة من هذه الميزة للحقول ذات القيم غير المؤكدة عند إنشاء المجموعات. كما أنها تبسط أيضًا ترحيل البيانات من أنظمة قواعد البيانات الأخرى إلى ميلفوس، مما يسمح بالتعامل مع مجموعات البيانات التي تحتوي على قيم فارغة مع الحفاظ على إعدادات القيمة الافتراضية الأصلية.</p>
<p>للحصول على التفاصيل، راجع <a href="/docs/ar/nullable-and-default.md">القيمة الفارغة والقيم الافتراضية</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ/PRQ المستندة إلى فايس</h4><p>من خلال التعاون الوثيق مع مجتمع Faiss، شهدت خوارزمية HNSW في Faiss تحسينات كبيرة في كل من الوظائف والأداء. ولاعتبارات تتعلق بالاستقرار وقابلية الصيانة، قام ميلفوس 2.5 بترحيل دعمه لخوارزمية HNSW رسميًا من hnswlib إلى Faiss.</p>
<p>استنادًا إلى Faiss، يدعم Milvus 2.5 طرق تكميم متعددة على HNSW لتلبية احتياجات السيناريوهات المختلفة: SQ (الكميات العددية)، و PQ (الكمي المنتج)، و PRQ (الكمي المنتج المتبقي). يعد SQ و PQ أكثر شيوعًا؛ حيث يوفر SQ أداءً جيدًا للاستعلام وسرعة بناء، بينما يوفر PQ استرجاعًا أفضل بنفس نسبة الضغط. عادةً ما تستخدم العديد من قواعد البيانات المتجهة التكميم الثنائي، وهو شكل بسيط من أشكال التكميم الكمي SQ.</p>
<p>PRQ هو اندماج بين PQ و AQ (الكمي المضاف). بالمقارنة مع PQ، فإنه يتطلب أوقات بناء أطول لتقديم استرجاع أفضل، خاصةً عند معدلات الضغط العالية، قائلاً الضغط الثنائي.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">ضغط التجميع (بيتا)</h4><p>يقدم الإصدار Milvus 2.5 ضغط التجميع لتسريع عمليات البحث وتقليل التكاليف في المجموعات الكبيرة. من خلال تحديد حقل قياسي كمفتاح تجميع، يتم إعادة توزيع البيانات حسب النطاق لتحسين التخزين والاسترجاع. تعمل هذه الميزة مثل الفهرس العام، وتتيح هذه الميزة لـ Milvus إمكانية تقليم البيانات بكفاءة أثناء الاستعلامات استنادًا إلى البيانات الوصفية للتجميع، مما يعزز أداء البحث عند تطبيق عوامل التصفية القياسية.</p>
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
<li><strong>دعم MVCC</strong>: يمكن للمستخدمين الآن استخدام المكررات دون التأثر بالتغييرات اللاحقة للبيانات مثل عمليات الإدراج والحذف، وذلك بفضل التحكم في التزامن متعدد الإصدارات (MVCC).</li>
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
