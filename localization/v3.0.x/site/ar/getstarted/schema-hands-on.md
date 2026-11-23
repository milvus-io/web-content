---
id: schema-hands-on.md
title: تصميم نموذج البيانات للبحث
summary: >-
  تعد أنظمة استرجاع المعلومات، المعروفة أيضًا باسم محركات البحث، أساسيةً لمختلف
  تطبيقات الذكاء الاصطناعي مثل «التوليد المعزز بالاسترجاع» (RAG)، والبحث المرئي،
  وتوصيات المنتجات. ويكمن جوهر هذه الأنظمة في نموذج بيانات مصمم بعناية لتنظيم
  المعلومات وفهرستها واسترجاعها.
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
    </button></h1><p>تعد أنظمة استرجاع المعلومات، المعروفة أيضًا باسم محركات البحث، أساسية لمختلف تطبيقات الذكاء الاصطناعي مثل التوليد المعزز بالاسترجاع (RAG) والبحث المرئي وتوصيات المنتجات. ويكمن في صميم هذه الأنظمة نموذج بيانات مصمم بعناية لتنظيم المعلومات وفهرستها واسترجاعها.</p>
<p>يتيح لك Milvus تحديد نموذج بيانات البحث من خلال مخطط المجموعة، وتنظيم البيانات غير المنظمة، وتمثيلاتها المتجهة الكثيفة أو المتفرقة، والبيانات الوصفية المنظمة. سواء كنت تعمل مع النصوص أو الصور أو أنواع البيانات الأخرى، سيساعدك هذا الدليل العملي على فهم وتطبيق مفاهيم المخطط الرئيسية لتصميم نموذج بيانات البحث في الممارسة العملية.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" /> 
   <span>تركيب نموذج البيانات</span>
  
 </span></p>
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
    </button></h2><p>يتضمن تصميم نموذج بيانات نظام البحث تحليل احتياجات العمل وتجريد المعلومات إلى نموذج بيانات معبر عنه بمخطط. يعد المخطط المحدد جيدًا أمرًا مهمًا لمواءمة نموذج البيانات مع أهداف العمل، وضمان اتساق البيانات وجودة الخدمة.  بالإضافة إلى ذلك، يعد اختيار أنواع البيانات والفهرس المناسبين أمرًا مهمًا لتحقيق هدف العمل بطريقة اقتصادية.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">تحليل احتياجات العمل<button data-href="#Analyzing-Business-Needs" class="anchor-icon" translate="no">
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
    </button></h3><p>تبدأ الاستجابة الفعالة لاحتياجات العمل بتحليل أنواع الاستعلامات التي سيقوم بها المستخدمون وتحديد طرق البحث الأنسب.</p>
<ul>
<li><p><strong>استعلامات المستخدمين:</strong> حدد أنواع الاستعلامات التي يُتوقع أن يقوم بها المستخدمون. يساعد ذلك في ضمان أن المخطط الخاص بك يدعم حالات الاستخدام الواقعية ويحسن أداء البحث. وقد تشمل هذه الحالات ما يلي:</p>
<ul>
<li><p>استرجاع المستندات التي تطابق استعلامًا باللغة الطبيعية</p></li>
<li><p>العثور على صور مشابهة لصورة مرجعية أو مطابقة لوصف نصي</p></li>
<li><p>البحث عن المنتجات حسب سمات مثل الاسم أو الفئة أو العلامة التجارية</p></li>
<li><p>تصفية العناصر بناءً على البيانات الوصفية المنظمة (مثل تاريخ النشر، والعلامات، والتقييمات)</p></li>
<li><p>الجمع بين معايير متعددة في الاستعلامات المختلطة (على سبيل المثال، في البحث المرئي، مع مراعاة التشابه الدلالي لكل من الصور وتعليقاتها)</p></li>
</ul></li>
<li><p><strong>طرق البحث:</strong> اختر تقنيات البحث المناسبة التي تتوافق مع أنواع الاستعلامات التي سيقوم بها المستخدمون. تخدم الطرق المختلفة أغراضًا مختلفة ويمكن في كثير من الأحيان دمجها للحصول على نتائج أكثر فعالية:</p>
<ul>
<li><p><strong>البحث الدلالي</strong>: يستخدم التشابه المتجه الكثيف للعثور على العناصر ذات المعنى المماثل، وهو مثالي للبيانات غير المنظمة مثل النصوص أو الصور.</p></li>
<li><p><strong>البحث عن النص الكامل</strong>: يكمل البحث الدلالي بمطابقة الكلمات المفتاحية. يمكن للبحث عن النص الكامل الاستفادة من التحليل المعجمي لتجنب تقسيم الكلمات الطويلة إلى أجزاء مجزأة، مع استيعاب المصطلحات الخاصة أثناء الاسترجاع.</p></li>
<li><p><strong>تصفية البيانات الوصفية</strong>: بالإضافة إلى البحث المتجه، يتم تطبيق قيود مثل نطاقات التواريخ أو الفئات أو العلامات.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">ترجمة متطلبات العمل إلى نموذج بيانات البحث<button data-href="#Translates-Business-Requirements-into-a-Search-Data-Model" class="anchor-icon" translate="no">
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
    </button></h3><p>تتمثل الخطوة التالية في ترجمة متطلبات عملك إلى نموذج بيانات ملموس، من خلال تحديد المكونات الأساسية لمعلوماتك وطرق البحث عنها:</p>
<ul>
<li><p>تحديد البيانات التي تحتاج إلى تخزينها، مثل المحتوى الخام (النصوص، والصور، والصوت)، والبيانات الوصفية المرتبطة (العناوين، والعلامات، والمؤلف)، والسمات السياقية (الطوابع الزمنية، وسلوك المستخدم، وما إلى ذلك)</p></li>
<li><p>تحديد أنواع البيانات وتنسيقاتها المناسبة لكل عنصر. على سبيل المثال:</p>
<ul>
<li><p>الأوصاف النصية → سلسلة</p></li>
<li><p>الصور أو المستندات المضمنة → متجهات كثيفة أو متفرقة</p></li>
<li><p>الفئات أو العلامات أو الإشارات → سلسلة، مصفوفة، وقيمة منطقية</p></li>
<li><p>السمات الرقمية مثل السعر أو التقييم → عدد صحيح أو عدد عائم</p></li>
<li><p>المعلومات المنظمة مثل تفاصيل المؤلف → json</p></li>
</ul></li>
</ul>
<p>يضمن التعريف الواضح لهذه العناصر اتساق البيانات ودقة نتائج البحث وسهولة التكامل مع منطق التطبيقات اللاحقة.</p>
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
    </button></h2><p>في Milvus، يتم التعبير عن نموذج البيانات من خلال مخطط المجموعة. يعد تصميم الحقول المناسبة ضمن مخطط المجموعة أمرًا أساسيًا لتمكين الاسترجاع الفعال. يحدد كل حقل نوعًا معينًا من البيانات المخزنة في المجموعة ويلعب دورًا مميزًا في عملية البحث. على المستوى العالي، يدعم Milvus نوعين رئيسيين من الحقول: <strong>الحقول المتجهة</strong> <strong>والحقول القياسية</strong>.</p>
<p>الآن، يمكنك تعيين نموذج البيانات الخاص بك إلى مخطط حقول، بما في ذلك المتجهات وأي حقول قياسية مساعدة. تأكد من أن كل حقل يرتبط بالسمات الموجودة في نموذج البيانات الخاص بك، مع إيلاء اهتمام خاص لنوع المتجه (كثيف أو متفرق) وأبعاده.</p>
<h3 id="Vector-Field" class="common-anchor-header">الحقل المتجه<button data-href="#Vector-Field" class="anchor-icon" translate="no">
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
    </button></h3><p>تخزن الحقول المتجهة التضمينات لأنواع البيانات غير المنظمة مثل النصوص والصور والصوت. قد تكون هذه التضمينات كثيفة أو متفرقة أو ثنائية، اعتمادًا على نوع البيانات وطريقة الاسترجاع المستخدمة. عادةً ما تُستخدم المتجهات الكثيفة للبحث الدلالي، بينما تُعد المتجهات المتفرقة أكثر ملاءمة للمطابقة النصية الكاملة أو المطابقة المعجمية. تُعد المتجهات الثنائية مفيدة عندما تكون موارد التخزين والحوسبة محدودة. قد تحتوي المجموعة على عدة حقول متجهة لتمكين استراتيجيات الاسترجاع متعددة الوسائط أو الهجينة. للحصول على دليل تفصيلي حول هذا الموضوع، يرجى الرجوع إلى <a href="/docs/ar/multi-vector-search.md">«البحث الهجين متعدد المتجهات</a>».</p>
<p>يدعم Milvus أنواع بيانات المتجهات التالية: <code translate="no">FLOAT_VECTOR</code> <a href="/docs/ar/dense-vector.md">للمتجهات الكثيفة</a>، و <code translate="no">SPARSE_FLOAT_VECTOR</code> <a href="/docs/ar/sparse_vector.md">للمتجهات المتفرقة</a>، و <code translate="no">BINARY_VECTOR</code> <a href="/docs/ar/binary-vector.md">للمتجهات الثنائية</a></p>
<h3 id="Scalar-Field" class="common-anchor-header">الحقل القياسي<button data-href="#Scalar-Field" class="anchor-icon" translate="no">
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
    </button></h3><p>تخزن الحقول القياسية القيم الأولية المنظمة — التي يُشار إليها عادةً باسم البيانات الوصفية — مثل الأرقام أو السلاسل النصية أو التواريخ. يمكن إرجاع هذه القيم جنبًا إلى جنب مع نتائج البحث المتجهية، وهي ضرورية للتصفية والفرز. تتيح لك هذه الحقول تضييق نطاق نتائج البحث استنادًا إلى سمات محددة، مثل قصر المستندات على فئة معينة أو نطاق زمني محدد.</p>
<p>يدعم Milvus الأنواع القياسية مثل <code translate="no">BOOL</code> و <code translate="no">INT8/16/32/64</code> و <code translate="no">FLOAT</code> و <code translate="no">DOUBLE</code> و <code translate="no">VARCHAR</code> و <code translate="no">JSON</code> و <code translate="no">ARRAY</code> لتخزين وتصفية البيانات غير المتجهة. تعزز هذه الأنواع دقة عمليات البحث وإمكانية تخصيصها.</p>
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
    </button></h2><p>عند تصميم مخطط، لا يكفي مجرد تعيين بياناتك إلى الحقول باستخدام أنواع البيانات المدعومة. فمن الضروري أن يكون لديك فهم شامل للعلاقات بين الحقول والاستراتيجيات المتاحة للتكوين. يضمن أخذ الميزات الرئيسية في الاعتبار أثناء مرحلة التصميم أن المخطط لا يلبي متطلبات معالجة البيانات الفورية فحسب، بل يكون أيضًا قابلاً للتوسع والتكيف مع الاحتياجات المستقبلية. من خلال دمج هذه الميزات بعناية، يمكنك بناء بنية بيانات قوية تعزز قدرات Milvus إلى أقصى حد وتدعم استراتيجيتك وأهدافك الأوسع نطاقًا في مجال البيانات. فيما يلي نظرة عامة على الميزات الرئيسية لإنشاء مخطط مجموعة:</p>
<h3 id="Primary-Key" class="common-anchor-header">المفتاح الأساسي<button data-href="#Primary-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>يُعد حقل المفتاح الأساسي مكونًا أساسيًّا للمخطط، حيث إنه يُعرِّف كل كيان داخل المجموعة بشكل فريد. يُعد تعريف المفتاح الأساسي أمرًا إلزاميًا. ويجب أن يكون حقلًا قياسيًا من نوع عدد صحيح أو سلسلة نصية، وأن يتم تمييزه بـ « <code translate="no">is_primary=True</code> ». اختياريًا، يمكنك تمكين « <code translate="no">auto_id</code> » للمفتاح الأساسي، حيث يتم تخصيص أرقام صحيحة له تلقائيًا تتزايد بشكل مترابط مع إدخال المزيد من البيانات إلى المجموعة.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/primary-field.md">«الحقل الأساسي وAutoID</a>».</p>
<h3 id="Partitioning" class="common-anchor-header">التقسيم<button data-href="#Partitioning" class="anchor-icon" translate="no">
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
    </button></h3><p>لتسريع عملية البحث، يمكنك اختيارياً تمكين التقسيم. من خلال تعيين حقل سكالي محدد للتقسيم وتحديد معايير التصفية بناءً على هذا الحقل أثناء عمليات البحث، يمكن تقييد نطاق البحث بشكل فعال ليقتصر على الأقسام ذات الصلة فقط. تعزز هذه الطريقة كفاءة عمليات الاسترجاع بشكل كبير من خلال تقليل نطاق البحث.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/use-partition-key.md">استخدام مفتاح التقسيم</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">المحلل<button data-href="#Analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>يُعد المحلل أداة أساسية لمعالجة البيانات النصية وتحويلها. وتتمثل وظيفته الرئيسية في تحويل النص الخام إلى رموز (token) وتنظيمها من أجل الفهرسة والاسترجاع. ويقوم بذلك عن طريق تقسيم السلسلة إلى رموز، وإزالة الكلمات الممنوعة، وتحويل الكلمات الفردية إلى رموز.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md">«نظرة عامة</a> على <a href="/docs/ar/analyzer-overview.md">المحلل</a>».</p>
<h3 id="Function" class="common-anchor-header">الوظيفة<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h3><p>يتيح لك Milvus تعريف وظائف مدمجة كجزء من المخطط لاشتقاق حقول معينة تلقائيًا. على سبيل المثال، يمكنك إضافة وظيفة BM25 مدمجة تُنشئ متجهًا متفرقًا من حقل " <code translate="no">VARCHAR</code> " لدعم البحث عن النص الكامل. تعمل هذه الحقول المشتقة من الوظائف على تبسيط المعالجة المسبقة وتضمن بقاء المجموعة قائمة بذاتها وجاهزة للاستعلام.</p>
<p>لمزيد من التفاصيل، راجع <a href="/docs/ar/full-text-search.md">«البحث</a> عن <a href="/docs/ar/full-text-search.md">النص الكامل</a>».</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">مثال من الواقع<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، سنعرض تصميم المخطط ومثالًا على الكود لتطبيق بحث في مستندات الوسائط المتعددة الموضح في الرسم البياني أعلاه. تم تصميم هذا المخطط لإدارة مجموعة بيانات تحتوي على مقالات مع تعيين البيانات إلى الحقول التالية:</p>
<table>
   <tr>
     <th><p><strong>الحقل</strong></p></th>
     <th><p><strong>مصدر البيانات</strong></p></th>
     <th><p><strong>يستخدمه طرق البحث</strong></p></th>
     <th><p><strong>المفتاح الأساسي</strong></p></th>
     <th><p><strong>مفتاح التقسيم</strong></p></th>
     <th><p><strong>المحلل</strong></p></th>
     <th><p><strong>مدخلات/مخرجات الوظيفة</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>يتم إنشاؤه تلقائيًا عند تمكين <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/ar/get-and-scalar-query.md">الاستعلام باستخدام Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>ن</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>العنوان (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>عنوان المقال</p></td>
     <td><p><a href="/docs/ar/keyword-match.md">مطابقة النص</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>الطابع الزمني (<code translate="no">INT32</code>)</p></td>
     <td><p>تاريخ النشر</p></td>
     <td><p><a href="/docs/ar/use-partition-key.md">التصفية حسب مفتاح التقسيم</a></p></td>
     <td><p>لا</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>نص (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>النص الخام للمقال</p></td>
     <td><p><a href="/docs/ar/multi-vector-search.md">البحث الهجين متعدد المتجهات</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>الإدخال</p></td>
   </tr>
   <tr>
     <td><p>text_dense_vector (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>متجه كثيف تم إنشاؤه بواسطة نموذج تضمين النص</p></td>
     <td><p><a href="/docs/ar/single-vector-search.md">البحث المتجهي الأساسي</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>متجه متفرق تم إنشاؤه تلقائيًا بواسطة دالة BM25 مدمجة</p></td>
     <td><p><a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>المخرجات</p></td>
   </tr>
</table>
<p>لمزيد من المعلومات حول المخططات وإرشادات تفصيلية حول إضافة أنواع مختلفة من الحقول، يرجى الرجوع إلى <a href="/docs/ar/schema.md">شرح المخطط</a>.</p>
<h3 id="Initialize-schema" class="common-anchor-header">تهيئة المخطط<button data-href="#Initialize-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>للبدء، نحتاج إلى إنشاء مخطط فارغ. تضع هذه الخطوة الأساس اللازم لتعريف نموذج البيانات.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">إضافة الحقول<button data-href="#Add-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد إنشاء المخطط، تتمثل الخطوة التالية في تحديد الحقول التي ستتألف منها بياناتك. يرتبط كل حقل بأنواع البيانات والسمات الخاصة به.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<li><p>المفتاح الأساسي: يُستخدم عنوان " <code translate="no">article_id</code> " كمفتاح أساسي، مما يتيح التخصيص التلقائي للمفاتيح الأساسية للكيانات الواردة.</p></li>
<li><p>مفتاح التقسيم: يتم تعيين <code translate="no">timestamp</code> كمفتاح تقسيم، مما يسمح بالتصفية حسب الأقسام. قد يكون ذلك</p></li>
<li><p>محلل النص: يتم تطبيق محلل النص على حقلين من نوع السلسلة هما <code translate="no">title</code> و <code translate="no">text</code> لدعم مطابقة النص والبحث عن النص الكامل على التوالي.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(اختياري) إضافة وظائف<button data-href="#Optional-Add-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>لتعزيز قدرات الاستعلام عن البيانات، يمكن دمج الدوال في المخطط. على سبيل المثال، يمكن إنشاء دالة لمعالجة الحقول المحددة ذات الصلة.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<li><p><a href="/docs/ar/create-collection.md">إنشاء مجموعة</a></p></li>
<li><p><a href="/docs/ar/alter-collection-field.md">تعديل حقل المجموعة</a></p></li>
</ul>
