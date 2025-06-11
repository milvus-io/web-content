---
id: schema-hands-on.md
title: تصميم نموذج البيانات للبحث
summary: >-
  تُعد أنظمة استرجاع المعلومات، والمعروفة أيضًا باسم محركات البحث، ضرورية
  لتطبيقات الذكاء الاصطناعي المختلفة مثل التوليد المعزز للاسترجاع (RAG) والبحث
  المرئي والتوصية بالمنتجات. ويقع في صميم هذه الأنظمة نموذج بيانات مصمم بعناية
  لتنظيم المعلومات وفهرستها واسترجاعها.
---

<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">تصميم نموذج البيانات للبحث<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>تُعد أنظمة استرجاع المعلومات، والمعروفة أيضًا باسم محركات البحث، ضرورية لتطبيقات الذكاء الاصطناعي المختلفة مثل التوليد المعزز للاسترجاع (RAG) والبحث المرئي والتوصية بالمنتجات. يوجد في صميم هذه الأنظمة نموذج بيانات مصمم بعناية لتنظيم المعلومات وفهرستها واسترجاعها.</p>
<p>يسمح لك Milvus بتحديد نموذج بيانات البحث من خلال مخطط المجموعة، وتنظيم البيانات غير المهيكلة، وتمثيلاتها المتجهة الكثيفة أو المتناثرة، والبيانات الوصفية المهيكلة. سواء كنت تعمل مع النصوص أو الصور أو أنواع البيانات الأخرى، سيساعدك هذا الدليل العملي على فهم وتطبيق مفاهيم المخطط الرئيسية لتصميم نموذج بيانات البحث عمليًا.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>تشريح نموذج البيانات</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">نموذج البيانات<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>ينطوي تصميم نموذج البيانات لنظام البحث على تحليل احتياجات العمل وتجريد المعلومات في نموذج بيانات معبر عن المخطط. يعد المخطط المحدد جيدًا أمرًا مهمًا لمواءمة نموذج البيانات مع أهداف العمل، وضمان اتساق البيانات وجودة الخدمة.  بالإضافة إلى ذلك، يعد اختيار أنواع البيانات والفهرس المناسبين أمرًا مهمًا في تحقيق هدف العمل بشكل اقتصادي.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">تحليل احتياجات العمل</h3><p>تبدأ المعالجة الفعالة لاحتياجات العمل بتحليل أنواع الاستعلامات التي سيقوم بها المستخدمون وتحديد طرق البحث الأنسب.</p>
<ul>
<li><p><strong>استعلامات المستخدم:</strong> تحديد أنواع الاستعلامات المتوقع أن يقوم بها المستخدمون. يساعد ذلك على ضمان دعم مخططك لحالات الاستخدام في العالم الحقيقي وتحسين أداء البحث. قد تتضمن هذه الاستعلامات:</p>
<ul>
<li><p>استرجاع المستندات التي تطابق استعلام لغة طبيعية</p></li>
<li><p>البحث عن صور مشابهة لصورة مرجعية أو مطابقة وصف نصي</p></li>
<li><p>البحث عن المنتجات حسب السمات مثل الاسم أو الفئة أو العلامة التجارية</p></li>
<li><p>تصفية العناصر بناءً على البيانات الوصفية المنظمة (على سبيل المثال، تاريخ النشر والعلامات والتقييمات)</p></li>
<li><p>الجمع بين معايير متعددة في الاستعلامات المختلطة (على سبيل المثال، في البحث المرئي، مع مراعاة التشابه الدلالي لكل من الصور وتعليقاتها)</p></li>
</ul></li>
<li><p><strong>طرق البحث:</strong> اختر أساليب البحث المناسبة التي تتماشى مع أنواع الاستعلامات التي سيجريها المستخدمون. تخدم الطرق المختلفة أغراضًا مختلفة ويمكن في كثير من الأحيان الجمع بينها للحصول على نتائج أكثر قوة:</p>
<ul>
<li><p><strong>البحث الدلالي</strong>: يستخدم التشابه المتجه الكثيف للعثور على العناصر ذات المعنى المتشابه، وهو مثالي للبيانات غير المنظمة مثل النصوص أو الصور.</p></li>
<li><p><strong>البحث في النص الكامل</strong>: استكمال البحث الدلالي بمطابقة الكلمات الرئيسية.  يمكن للبحث في النص الكامل الاستفادة من التحليل المعجمي لتجنب تقسيم الكلمات الطويلة إلى رموز مجزأة، واستيعاب المصطلحات الخاصة أثناء الاسترجاع.</p></li>
<li><p><strong>تصفية البيانات الوصفية</strong>: علاوة على البحث المتجه، تطبيق قيود مثل نطاقات التاريخ أو الفئات أو العلامات.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">ترجمة متطلبات العمل إلى نموذج بيانات البحث</h3><p>الخطوة التالية هي ترجمة متطلبات عملك إلى نموذج بيانات ملموس، من خلال تحديد المكونات الأساسية لمعلوماتك وطرق البحث الخاصة بها:</p>
<ul>
<li><p>تحديد البيانات التي تحتاج إلى تخزينها، مثل المحتوى الخام (النصوص والصور والصوت)، والبيانات الوصفية المرتبطة بها (العناوين والعلامات والعلامات والتأليف)، والسمات السياقية (الطوابع الزمنية وسلوك المستخدم، إلخ).</p></li>
<li><p>تحديد أنواع البيانات والتنسيقات المناسبة لكل عنصر. على سبيل المثال:</p>
<ul>
<li><p>أوصاف نصية → سلسلة</p></li>
<li><p>تضمينات الصور أو المستندات → متجهات كثيفة أو متفرقة</p></li>
<li><p>الفئات أو الوسوم أو العلامات أو الأعلام → سلسلة أو مصفوفة أو صفيف أو صوري</p></li>
<li><p>السمات العددية مثل السعر أو التصنيف → عدد صحيح أو عائم</p></li>
<li><p>المعلومات المهيكلة مثل تفاصيل المؤلف -&gt; json</p></li>
</ul></li>
</ul>
<p>يضمن التعريف الواضح لهذه العناصر اتساق البيانات، ونتائج بحث دقيقة، وسهولة التكامل مع منطق التطبيقات النهائية.</p>
<h2 id="Schema-Design" class="common-anchor-header">تصميم المخطط<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>في ميلفوس، يتم التعبير عن نموذج البيانات من خلال مخطط المجموعة. يعد تصميم الحقول الصحيحة داخل مخطط المجموعة أمرًا أساسيًا لتمكين الاسترجاع الفعال. يحدد كل حقل نوعًا معينًا من البيانات المخزنة في المجموعة ويلعب دورًا مميزًا في عملية البحث. على المستوى العالي، يدعم Milvus نوعين رئيسيين من الحقول: <strong>الحقول المتجهة</strong> <strong>والحقول القياسية</strong>.</p>
<p>الآن، يمكنك تعيين نموذج البيانات الخاص بك إلى مخطط للحقول، بما في ذلك المتجهات وأي حقول قياسية مساعدة. تأكد من ارتباط كل حقل بالسمات من نموذج البيانات الخاص بك، وانتبه بشكل خاص إلى نوع المتجه (كثيف أو قياسي) وبُعده.</p>
<h3 id="Vector-Field" class="common-anchor-header">الحقل المتجه</h3><p>تخزن الحقول المتجهة تضمينات لأنواع البيانات غير المنظمة مثل النصوص والصور والصوت. قد تكون هذه التضمينات كثيفة أو متناثرة أو ثنائية، اعتمادًا على نوع البيانات وطريقة الاسترجاع المستخدمة. عادةً ما يتم استخدام المتجهات الكثيفة للبحث الدلالي، في حين أن المتجهات المتفرقة مناسبة بشكل أفضل لمطابقة النص الكامل أو المطابقة المعجمية. تكون المتجهات الثنائية مفيدة عندما تكون موارد التخزين والموارد الحاسوبية محدودة. قد تحتوي المجموعة على العديد من حقول المتجهات لتمكين استراتيجيات الاسترجاع متعدد الوسائط أو المختلطة. للحصول على دليل مفصل حول هذا الموضوع، يرجى الرجوع إلى <a href="/docs/ar/v2.5.x/multi-vector-search.md">البحث الهجين متعدد المتجهات</a>.</p>
<p>يدعم ميلفوس أنواع بيانات المتجهات: <code translate="no">FLOAT_VECTOR</code> للمتجهات <a href="/docs/ar/v2.5.x/dense-vector.md">الكثيفة،</a> <code translate="no">SPARSE_FLOAT_VECTOR</code> للمتجهات <a href="/docs/ar/v2.5.x/sparse_vector.md">المتفرقة</a> و <code translate="no">BINARY_VECTOR</code> <a href="/docs/ar/v2.5.x/binary-vector.md">للمتجهات الثنائية</a></p>
<h3 id="Scalar-Field" class="common-anchor-header">الحقول العددية</h3><p>تخزن الحقول العددية قيمًا بدائية منظمة - يشار إليها عادةً بالبيانات الوصفية - مثل الأرقام أو السلاسل أو التواريخ. يمكن إرجاع هذه القيم جنبًا إلى جنب مع نتائج البحث المتجهة وهي ضرورية للتصفية والفرز. فهي تسمح لك بتضييق نتائج البحث بناءً على سمات محددة، مثل حصر المستندات في فئة معينة أو نطاق زمني محدد.</p>
<p>يدعم ميلفوس أنواعًا قياسية مثل <code translate="no">BOOL</code> و <code translate="no">INT8/16/32/64</code> و و <code translate="no">FLOAT</code> و <code translate="no">DOUBLE</code> و <code translate="no">VARCHAR</code> و <code translate="no">JSON</code> و <code translate="no">ARRAY</code> لتخزين وتصفية البيانات غير المتجهة. تعزز هذه الأنواع دقة عمليات البحث وتخصيصها.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">الاستفادة من الميزات المتقدمة في تصميم المخطط<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>عند تصميم مخطط، لا يكفي مجرد تعيين بياناتك إلى الحقول باستخدام أنواع البيانات المدعومة. من الضروري أن يكون لديك فهم شامل للعلاقات بين الحقول والاستراتيجيات المتاحة للتكوين. إن وضع الميزات الرئيسية في الاعتبار أثناء مرحلة التصميم يضمن أن المخطط لا يلبي متطلبات معالجة البيانات الفورية فحسب، بل إنه قابل للتطوير والتكيف مع الاحتياجات المستقبلية. من خلال دمج هذه الميزات بعناية، يمكنك بناء بنية بيانات قوية تزيد من إمكانيات ميلفوس وتدعم استراتيجية وأهداف البيانات الأوسع نطاقًا. فيما يلي نظرة عامة على الميزات الرئيسية التي تنشئ مخطط تجميع:</p>
<h3 id="Primary-Key" class="common-anchor-header">المفتاح الأساسي</h3><p>يعد حقل المفتاح الأساسي مكونًا أساسيًا في المخطط، حيث إنه يحدد بشكل فريد كل كيان داخل المجموعة. تعريف المفتاح الأساسي إلزامي. يجب أن يكون حقلًا قياسيًا من النوع الصحيح أو السلسلة ويتم تمييزه على أنه <code translate="no">is_primary=True</code>. اختياريًا، يمكنك تمكين <code translate="no">auto_id</code> للمفتاح الأساسي، والذي يتم تعيينه تلقائيًا بأرقام صحيحة تنمو بشكل متجانس كلما تم إدخال المزيد من البيانات في المجموعة.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.5.x/primary-field.md">الحقل الأساسي والمعرف التلقائي</a>.</p>
<h3 id="Partitioning" class="common-anchor-header">التقسيم</h3><p>لتسريع البحث، يمكنك اختياريًا تشغيل التقسيم. من خلال تعيين حقل قياسي محدد للتقسيم وتحديد معايير التصفية استنادًا إلى هذا الحقل أثناء عمليات البحث، يمكن أن يقتصر نطاق البحث بشكل فعال على الأقسام ذات الصلة فقط. تعمل هذه الطريقة على تحسين كفاءة عمليات الاسترجاع بشكل كبير من خلال تقليل نطاق البحث.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.5.x/use-partition-key.md">استخدام مفتاح التقسيم</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">المحلل</h3><p>يعد المحلل أداة أساسية لمعالجة البيانات النصية وتحويلها. وتتمثل وظيفته الرئيسية في تحويل النص الخام إلى رموز وهيكلتها للفهرسة والاسترجاع. وهو يقوم بذلك عن طريق ترميز السلسلة، وإسقاط كلمات التوقف، وتجزئة الكلمات الفردية إلى رموز.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.5.x/analyzer-overview.md">نظرة عامة</a> على <a href="/docs/ar/v2.5.x/analyzer-overview.md">المحلِّل</a>.</p>
<h3 id="Function" class="common-anchor-header">الوظيفة</h3><p>يسمح لك Milvus بتعريف الدوال المضمنة كجزء من المخطط لاشتقاق حقول معينة تلقائيًا. على سبيل المثال، يمكنك إضافة دالة BM25 مضمنة تقوم بإنشاء متجه متناثر من حقل <code translate="no">VARCHAR</code> لدعم البحث في النص الكامل. تعمل هذه الحقول المشتقة من الدالة على تبسيط المعالجة المسبقة وضمان بقاء المجموعة مكتفية بذاتها وجاهزة للاستعلام.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/v2.5.x/full-text-search.md">البحث عن النص الكامل</a>.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">مثال من العالم الحقيقي<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، سنوضح في هذا القسم تصميم المخطط ومثالاً على الكود لتطبيق بحث عن مستند الوسائط المتعددة الموضح في الرسم البياني أعلاه. تم تصميم هذا المخطط لإدارة مجموعة بيانات تحتوي على مقالات مع تعيين البيانات إلى الحقول التالية:</p>
<table>
   <tr>
     <th><p><strong>الحقل</strong></p></th>
     <th><p><strong>مصدر البيانات</strong></p></th>
     <th><p><strong>المستخدمة من قبل طرق البحث</strong></p></th>
     <th><p><strong>المفتاح الأساسي</strong></p></th>
     <th><p><strong>مفتاح التقسيم</strong></p></th>
     <th><p><strong>المحلل</strong></p></th>
     <th><p><strong>مدخلات/مخرجات الوظيفة</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>تم إنشاؤه تلقائيًا مع تمكين <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/ar/v2.5.x/get-and-scalar-query.md">استعلام باستخدام Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>العنوان (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>عنوان المقالة</p></td>
     <td><p><a href="/docs/ar/v2.5.x/keyword-match.md">تطابق النص</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>الطابع الزمني (<code translate="no">INT32</code>)</p></td>
     <td><p>تاريخ النشر</p></td>
     <td><p><a href="/docs/ar/v2.5.x/use-partition-key.md">تصفية حسب مفتاح التقسيم</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>النص (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>النص الخام للمقال</p></td>
     <td><p><a href="/docs/ar/v2.5.x/multi-vector-search.md">البحث الهجين متعدد النواقل</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>المدخلات</p></td>
   </tr>
   <tr>
     <td><p>text_dense_vector (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>متجه كثيف تم إنشاؤه بواسطة نموذج تضمين النص</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">بحث المتجه الأساسي</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>متجه متناثر يتم إنشاؤه تلقائيًا بواسطة دالة BM25 المدمجة</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">بحث النص الكامل</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>الإخراج</p></td>
   </tr>
</table>
<p>لمزيد من المعلومات حول المخططات وإرشادات مفصلة حول إضافة أنواع مختلفة من الحقول، يرجى الرجوع إلى <a href="/docs/ar/v2.5.x/schema.md">شرح المخطط</a>.</p>
<h3 id="Initialize-schema" class="common-anchor-header">تهيئة المخطط</h3><p>للبدء، نحتاج إلى إنشاء مخطط فارغ. تؤسس هذه الخطوة بنية أساسية لتحديد نموذج البيانات.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">إضافة حقول</h3><p>حالما يتم إنشاء المخطط، الخطوة التالية هي تحديد الحقول التي ستضم بياناتك. يرتبط كل حقل بأنواع البيانات والسمات الخاصة به.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، تم تحديد السمات التالية للحقول:</p>
<ul>
<li><p>المفتاح الأساسي: يتم استخدام <code translate="no">article_id</code> كمفتاح أساسي يتيح تخصيص المفاتيح الأساسية تلقائيًا للكيانات الواردة.</p></li>
<li><p>مفتاح التقسيم: يتم تعيين <code translate="no">timestamp</code> كمفتاح تقسيم يسمح بالتصفية حسب الأقسام. قد يكون هذا</p></li>
<li><p>محلل النص: يتم تطبيق محلل النص على حقلي السلسلة <code translate="no">title</code> و <code translate="no">text</code> لدعم مطابقة النص والبحث عن النص الكامل على التوالي.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(اختياري) إضافة دوال</h3><p>لتعزيز قدرات الاستعلام عن البيانات، يمكن دمج الدوال في المخطط. على سبيل المثال، يمكن إنشاء دالة لمعالجة متعلقة بحقول محددة.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يضيف هذا المثال دالة BM25 مدمجة في المخطط، باستخدام الحقل <code translate="no">text</code> كمدخلات وتخزين المتجهات المتفرقة الناتجة في الحقل <code translate="no">text_sparse_vector</code>.</p>
<h2 id="Next-Steps" class="common-anchor-header">الخطوات التالية<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ar/v2.5.x/create-collection.md">إنشاء مجموعة</a></p></li>
<li><p><a href="/docs/ar/v2.5.x/alter-collection-field.md">تغيير حقل المجموعة</a></p></li>
</ul>
