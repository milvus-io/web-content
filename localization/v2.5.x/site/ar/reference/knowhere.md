---
id: knowhere.md
summary: تعرّف على "نولوجي" في ميلفوس.
title: مكان المعرفة
---
<h1 id="Knowhere" class="common-anchor-header">مكان المعرفة<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع "نوير"، محرك البحث المتجه الأساسي في ميلفوس.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>نوير هو محرك بحث متجهي مفتوح المصدر يتضمن العديد من مكتبات البحث عن التشابه المتجهي بما في ذلك <a href="https://github.com/facebookresearch/faiss">Faiss</a> و <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> و <a href="https://github.com/spotify/annoy">Annoy</a>. تم تصميم Knowhere أيضًا لدعم الحوسبة غير المتجانسة. فهو يتحكم في الأجهزة (وحدة المعالجة المركزية أو وحدة معالجة الرسومات) لتنفيذ طلبات بناء الفهرس والبحث. هكذا حصل Knowhere على اسمه - معرفة مكان تنفيذ العمليات. سيتم دعم المزيد من أنواع الأجهزة بما في ذلك DPU و TPU في الإصدارات المستقبلية.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">نوير في بنية ميلفوس<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح الشكل أدناه موقع نوير في بنية ميلفوس.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>نوير</span> </span></p>
<p>الطبقة السفلى هي أجهزة النظام. وفوقها مكتبات الفهرس التابعة لجهة خارجية. في الطبقة العليا، يتفاعل Knowhere مع عقدة الفهرس وعقدة الاستعلام عبر CGO، مما يسمح لحزم Go باستدعاء كود C.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">مزايا نوير<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي مزايا نوير على فايس.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">دعم BitsetView</h4><p>يقدم ميلفوس آلية مجموعة البتات لتحقيق "الحذف الناعم". لا يزال المتجه المحذوف حذفًا ناعمًا موجودًا في قاعدة البيانات ولكن لن يتم حسابه أثناء البحث أو الاستعلام عن تشابه المتجهات.</p>
<p>يتوافق كل بت في مجموعة البتات مع متجه مفهرس. إذا تم وضع علامة "1" على أحد المتجهات في مجموعة البتات، فهذا يعني أن هذا المتجه محذوف بشكل ناعم ولن يتم تضمينه أثناء البحث عن المتجهات. يتم تطبيق معلمة مجموعة البتات على جميع واجهات برمجة تطبيقات استعلام فهرس فايس المكشوفة في نوير، بما في ذلك فهارس وحدة المعالجة المركزية ووحدة معالجة الرسومات.</p>
<p>لمزيد من المعلومات حول آلية مجموعة البتات، راجع <a href="/docs/ar/v2.5.x/bitset.md">مجموعة البتات</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">دعم مقاييس تشابه متعددة لفهرسة المتجهات الثنائية</h4><p>يدعم Knowhere مقاييس <a href="/docs/ar/v2.5.x/metric.md#Hamming-distance">هامينج</a> <a href="/docs/ar/v2.5.x/metric.md#Jaccard-distance">وجاكارد</a> <a href="/docs/ar/v2.5.x/metric.md#Tanimoto-distance">وتانيموتو</a> <a href="/docs/ar/v2.5.x/metric.md#Superstructure">والبنية الفوقية</a> <a href="/docs/ar/v2.5.x/metric.md#Substructure">والبنية الفرعية</a>. يمكن استخدام Jaccard وTanimoto لقياس التشابه بين مجموعتي عينات بينما يمكن استخدام البنية الفائقة والبنية الفرعية لقياس تشابه البنى الكيميائية.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">دعم مجموعة تعليمات AVX512</h4><p>بصرف النظر عن <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a> <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">وSSE4.2</a> <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">وAVX2،</a> وهي مجموعات التعليمات المدعومة بالفعل من قبل Faiss، يدعم Knowhere أيضًا <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512،</a> والذي يمكنه <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">تحسين أداء بناء الفهرس والاستعلام بنسبة 20% إلى 30%</a> مقارنةً ب AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">التحديد التلقائي لتعليمات SIMD</h4><p>يدعم برنامج Knowhere استدعاء تعليمات SIMD المناسبة تلقائياً (على سبيل المثال، SIMD SSE وAVX وAVX2 وAVX512) على أي معالج وحدة معالجة مركزية (سواءً في الموقع أو على المنصات السحابية)، بحيث لا يحتاج المستخدمون إلى تحديد علامة SIMD يدوياً (على سبيل المثال، "-msse4") أثناء التجميع.</p>
<p>تم بناء Knowhere من خلال إعادة هيكلة قاعدة كود Faiss. يتم تحليل الدوال الشائعة (على سبيل المثال، حوسبة التشابه) التي تعتمد على تسريع SIMD. ثم يتم تنفيذ أربعة إصدارات لكل دالة (أي SSE، AVX، AVX2، AVX512) ويتم وضع كل منها في ملف مصدر منفصل. ثم يتم تجميع الملفات المصدرية بشكل فردي مع علامة SIMD المقابلة. لذلك، في وقت التشغيل، يمكن ل Knowhere اختيار تعليمات SIMD الأنسب تلقائيًا في وقت التشغيل بناءً على علامات وحدة المعالجة المركزية الحالية ثم ربط مؤشرات الدالة الصحيحة باستخدام التثبيت.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">تحسينات أخرى للأداء</h4><p>اقرأ <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">ميلفوس: نظام إدارة بيانات المتجهات المصمم لغرض معين</a> لمعرفة المزيد عن تحسين أداء نوير.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">بنية كود نوير<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>تتضمن العمليات الحسابية في Milvus بشكل أساسي العمليات المتجهة والقياسية. يتعامل Knowhere مع العمليات على فهرسة المتجهات فقط.</p>
<p>الفهرس هو بنية بيانات مستقلة عن البيانات المتجهة الأصلية. وعمومًا، تتطلب الفهرسة أربع خطوات: إنشاء فهرس، وتدريب البيانات، وإدراج البيانات، وبناء فهرس. في بعض تطبيقات الذكاء الاصطناعي، يتم فصل تدريب مجموعة البيانات عن البحث عن المتجهات. يتم تدريب البيانات من مجموعات البيانات أولاً ثم إدراجها في قاعدة بيانات متجهة مثل Milvus للبحث عن التشابه. على سبيل المثال، تفرق مجموعات البيانات المفتوحة sift1M و sift1B بين البيانات للتدريب والبيانات للاختبار.</p>
<p>ومع ذلك، في نوير، البيانات للتدريب والبحث هي نفسها في نوير. يقوم برنامج Knowhere بتدريب جميع البيانات في <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">مقطع</a> ما ثم يقوم بإدراج جميع البيانات المدربة وإنشاء فهرس لها.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>: الفئة الأساسية</h4><p><code translate="no">DataObj</code> هي الفئة الأساسية لجميع هياكل البيانات في نوير. <code translate="no">Size()</code> هي الطريقة الافتراضية الوحيدة في <code translate="no">DataObj</code>. ترث فئة الفهرس من <code translate="no">DataObj</code> مع حقل يسمى "size_". تحتوي فئة الفهرس أيضًا على طريقتين افتراضيتين - <code translate="no">Serialize()</code> و <code translate="no">Load()</code>. فئة <code translate="no">VecIndex</code> المشتقة من <code translate="no">Index</code> هي الفئة الأساسية الافتراضية لجميع الفهارس المتجهة. <code translate="no">VecIndex</code> توفر طرقًا تتضمن <code translate="no">Train()</code> و <code translate="no">Query()</code> و <code translate="no">GetStatistics()</code> و <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>الفئة الأساسية</span> </span></p>
<p>بعض أنواع الفهارس الأخرى مدرجة على اليمين في الشكل أعلاه.</p>
<ul>
<li><p>يحتوي فهرس فايس على فئتين أساسيتين: <code translate="no">FaissBaseIndex</code> لجميع الفهارس على متجهات النقطة العائمة، و <code translate="no">FaissBaseBinaryIndex</code> لجميع الفهارس على المتجهات الثنائية.</p></li>
<li><p><code translate="no">GPUIndex</code> هي الفئة الأساسية لجميع فهارس فايس GPU.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> هي الفئة الأساسية لجميع الفهارس المطورة ذاتيًا. بالنظر إلى أنه يتم تخزين معرّفات المتجهات فقط في ملف الفهرس، يمكن تقليل حجم الملف للمتجهات ذات الـ 128 بُعدًا بمقدار رتبتين من حيث الحجم.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>:: بحث القوة الغاشمة</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>من الناحية الفنية، <code translate="no">IDMAP</code> ليس فهرسًا، بل يُستخدم للبحث بالقوة الغاشمة. عندما يتم إدراج المتجهات في قاعدة البيانات، لا يلزم تدريب البيانات ولا بناء الفهرس. سيتم إجراء عمليات البحث مباشرة على بيانات المتجهات المدرجة.</p>
<p>ومع ذلك، من أجل اتساق الكود، يرث <code translate="no">IDMAP</code> أيضًا من فئة <code translate="no">VecIndex</code> بجميع واجهاتها الافتراضية. استخدام <code translate="no">IDMAP</code> هو نفسه استخدام المؤشرات الأخرى.</p>
<h4 id="IVF-indices" class="common-anchor-header">مؤشرات IVF</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>مؤشرات IVF (الملف المقلوب) هي الأكثر استخدامًا. فالفئة <code translate="no">IVF</code> مشتقة من <code translate="no">VecIndex</code> و <code translate="no">FaissBaseIndex</code> ، وتمتد كذلك إلى <code translate="no">IVFSQ</code> و <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> مشتق من <code translate="no">GPUIndex</code> و <code translate="no">IVF</code>. ثم <code translate="no">GPUIVF</code> يمتد كذلك إلى <code translate="no">GPUIVFSQ</code> و <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> هو مؤشر هجين مطور ذاتيًا. يتم تنفيذ مقياس كمي خشن على وحدة معالجة الرسومات بينما يتم البحث في الدلو على وحدة المعالجة المركزية. هذا النوع من الفهرس يمكن أن يقلل من حدوث نسخ الذاكرة بين وحدة المعالجة المركزية ووحدة معالجة الرسومات من خلال الاستفادة من قوة الحوسبة لوحدة معالجة الرسومات. <code translate="no">IVFSQHybrid</code> لديه نفس معدل الاستدعاء <code translate="no">GPUIVFSQ</code> ولكنه يأتي بأداء أفضل.</p>
<p>بنية الفئة الأساسية للمؤشرات الثنائية أبسط نسبيًا. <code translate="no">BinaryIDMAP</code> و <code translate="no">BinaryIVF</code> مشتقة من <code translate="no">FaissBaseBinaryIndex</code> و <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indices" class="common-anchor-header">مؤشرات الطرف الثالث</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>مؤشرات الطرف الثالث</span> </span></p>
<p>حاليًا، هناك نوعان فقط من مؤشرات الطرف الثالث مدعومان بصرف النظر عن مؤشر فايس: الفهرس القائم على الشجرة <code translate="no">Annoy</code> ، والفهرس القائم على الرسم البياني <code translate="no">HNSW</code>. هذان المؤشران الشائعان والمستخدمان بشكل متكرر من طرف ثالث كلاهما مشتق من <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">إضافة مؤشرات إلى "نوير<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت تريد إضافة مؤشرات جديدة إلى نوير، يمكنك أولاً الرجوع إلى المؤشرات الموجودة:</p>
<ul>
<li><p>لإضافة مؤشرات قائمة على الكمية، ارجع إلى <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>لإضافة مؤشرات قائمة على الرسم البياني، راجع <code translate="no">HNSW</code>.</p></li>
<li><p>لإضافة مؤشرات قائمة على الشجرة، ارجع إلى <code translate="no">Annoy</code>.</p></li>
</ul>
<p>بعد الإحالة إلى الفهرس الموجود، يمكنك اتباع الخطوات التالية لإضافة فهرس جديد إلى "نوير".</p>
<ol>
<li><p>أضف اسم الفهرس الجديد في <code translate="no">IndexEnum</code>. نوع البيانات هو سلسلة.</p></li>
<li><p>أضف فحص التحقق من صحة البيانات على الفهرس الجديد في الملف <code translate="no">ConfAdapter.cpp</code>. التحقق من الصحة هو بشكل أساسي للتحقق من صحة المعلمات لتدريب البيانات والاستعلام.</p></li>
<li><p>قم بإنشاء ملف جديد للفهرس الجديد. يجب أن تتضمن الفئة الأساسية للفهرس الجديد <code translate="no">VecIndex</code> ، والواجهة الافتراضية اللازمة <code translate="no">VecIndex</code>.</p></li>
<li><p>أضف منطق بناء الفهرس للفهرس الجديد في <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>أضف اختبار الوحدة ضمن الدليل <code translate="no">unittest</code>.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد التعرف على كيفية عمل Knowhere في ميلفوس، قد ترغب أيضًا في:</p>
<ul>
<li><p>التعرف على <a href="/docs/ar/v2.5.x/index.md">الأنواع المختلفة من المؤشرات التي يدعمها ملفوس</a>.</p></li>
<li><p>التعرف على <a href="/docs/ar/v2.5.x/bitset.md">آلية مجموعة البتات</a>.</p></li>
<li><p>فهم <a href="/docs/ar/v2.5.x/data_processing.md">كيفية معالجة البيانات</a> في ملفوس.</p></li>
</ul>
