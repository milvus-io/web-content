---
id: search_with_jev.md
summary: >-
  يُجري البحث المتجهي العثور على المعلومات ذات الصلة بالاستعلام. كما يتطلب إنشاء
  تطبيق بحث مفيد اتخاذ قرارات: أي المقاطع تجيب فعليًّا على السؤال، وما إذا كان
  يمكن إعادة استخدام إجابة سابقة، وما إذا كان لدى الوكيل أدلة كافية لوقف عملية
  البحث.
title: إنشاء RAG باستخدام Milvus + PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">البحث باستخدام Jev وMilvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>يبحث البحث المتجه عن المعلومات ذات الصلة بالاستعلام. يتطلب إنشاء تطبيق بحث مفيد اتخاذ قرارات: أي المقاطع تجيب فعليًا على السؤال، وما إذا كان يمكن إعادة استخدام إجابة سابقة، وما إذا كان لدى الوكيل أدلة كافية لوقف البحث.</p>
<p>يعالج كل من Milvus وJev أجزاء مختلفة من سير العمل هذا. يقوم <a href="https://milvus.io/">Milvus</a> بتخزين التضمينات واسترجاع السجلات المرشحة، مع استخدام مرشحات البيانات الوصفية لفرض قيود مثل إصدار المنتج أو نطاق قاعدة المعرفة. يقوم <a href="https://docs.typesafe.ai/introduction">Jev</a> بتقييم معنى النص المسترجع مقارنةً بالتعليمات. يمكن لتطبيقك استخدام أحكامه لاختيار الأدلة أو التحكم في خطوة البحث التالية.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">ماذا يفعل Jev؟<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم طلب Jev السياق وسؤال تقييم واحد أو أكثر. وتشمل <a href="https://docs.typesafe.ai/primitives">مخرجاته المحددة</a> نوعًا من الاختيار بين خيارات ثابتة، ودرجة مرتبة، واحتمال «نعم» أو «لا». تتيح هذه المخرجات لرمز التطبيق اتخاذ قرار دون تحليل تفسير مفتوح الصيغة. ولا يزال بإمكان نموذج التوليد كتابة إجابة أو استعلام بحث متابعة عند الحاجة.</p>
<p>على سبيل المثال، يسأل مستخدم عن كيفية تثبيت Atlas v2. يمكن لـ Milvus تقييد الاسترجاع على وثائق الإصدار v2 وإرجاع مقاطع مشابهة حول التثبيت والترقيات واستكشاف الأخطاء وإصلاحها. ثم يقوم Jev بتقييم المقاطع التي تشرح الإعداد الأولي. يقوم التطبيق بتمرير الأدلة المختارة إلى نموذج لتوليد الإجابات.</p>
<p>المسؤوليات واضحة ومباشرة:</p>
<ol>
<li><strong>الاسترجاع باستخدام Milvus:</strong> العثور على النتائج المرشحة ضمن قيود البيانات الوصفية المطلوبة.</li>
<li><strong>التقييم باستخدام Jev:</strong> تقييم تلك الاختيارات المرشحة وفقًا للسؤال ومعيار خاص بالمهمة.</li>
<li><strong>التنفيذ في كود التطبيق:</strong> إعادة ترتيب النتائج، وتصفية السياق، وإعادة استخدام إجابة ما، أو مواصلة البحث.</li>
</ol>
<p>تتم بعض القرارات قبل عملية الاسترجاع. يمكن لـ Jev اختيار نطاق البحث أو تقييم المستندات الواردة قبل دخولها إلى المجموعة. ويظل التحكم في الوصول والمرشحات الدقيقة من مسؤولية التطبيق.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">استكشف سيناريوهات البحث<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p>تحتوي <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">مجموعة «البحث باستخدام Jev»</a> على تسعة دروس تعليمية قابلة للتنفيذ. يستخدم كل منها مجموعة بيانات اصطناعية صغيرة ويعرض السجلات المسترجعة، والتقييمات، والإجراء الناتج.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">اختر أدلة أفضل<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">إعادة ترتيب نتائج البحث</a>: إعادة ترتيب الوثائق وذكريات وكيل الترميز. قد تشبه الذكرى المتعلقة بخطأ في منفذ الكمبيوتر المحمول مشكلة في اتصال الحاوية؛ بينما تسجل الذكرى الأكثر فائدة الإصلاح الفعلي للمضيف الخاص بالحاوية.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">تصفية السياق المسترجع</a>: التمييز بين تعليمات التثبيت الأولية ومقاطع الترقية واستكشاف الأخطاء وإصلاحها بعد أن يطبق Milvus مرشح الإصدار.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">إعادة ترتيب علاقات الرسم البياني</a>: أجب عن سؤال حول مكان ميلاد مؤلف كتاب عن طريق اختيار كل من الجسر الذي يربط بين الكتاب والمؤلف والعلاقة بين المؤلف ومكان الميلاد، ثم احتفظ بهذا الترتيب عند استرجاع المقاطع المصدرية.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">التحكم في البحث وإعادة استخدام الإجابات<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">تحديد متى يتوقف البحث</a>: يقترح نموذج التوليد عمليات بحث من الأدلة المتراكمة، بينما يقرر Jev ما إذا كان السؤال الأصلي قابلاً للإجابة. تشمل الأمثلة إجابة مباشرة، وسؤالاً يتطلب خطوتين، وحقيقة غير متوفرة تصل إلى حد البحث دون إجابة.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">توجيه استعلامات البحث</a>: اختر البحث في الوثائق أو الفواتير أو الذاكرة، ثم قم بتطبيق مرشح Milvus المقابل. أما الاستعلامات خارج النطاق فتسلك مسارًا منفصلاً.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">التحقق من صحة إعادة استخدام ذاكرة التخزين المؤقت الدلالية</a>: استرجع طلبًا مشابهًا مخزّنًا في ذاكرة التخزين المؤقت، ثم تحقق مما إذا كانت إجابته تلبي أيضًا متطلبات المهمة واللغة والسياق للطلب الجديد.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">تحسين وفحص مسار المعرفة<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">تنظيم المستندات قبل الفهرسة</a>: التمييز بين الإرشادات التشغيلية الجوهرية والمواد الترويجية أو غير المكتملة، من خلال إجراءات منفصلة للفهرسة والمراجعة والاستبعاد.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">فحص المقاطع المسترجعة</a>: تحديد النص الذي يحاول إعادة توجيه المساعد، مع الاحتفاظ بالنصائح الأمنية العادية. هذه خطوة فحص إضافية، وليست ضمانًا أمنيًا.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">تقييم أدلة البحث</a>: تقييم مدى صلة المقطع بالموضوع، وما إذا كانت الأدلة كافية، وما إذا كانت الإجابة تتضمن ادعاءات غير مدعومة. تم في الأمثلة إزالة الأدلة أو إضافة عبارة غير مدعومة عن قصد لإبراز الفرق بوضوح.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">واجهة جاهزة لإعادة الترتيب<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر<a href="https://github.com/milvus-io/milvus-model">نموذج Milvus</a> واجهة برمجة تطبيقات ( <code translate="no">JevRerankFunction</code>) من جانب التطبيق: قم بتمرير استعلام ونصوص المستندات المرشحة، واستقبل النتائج المُقيَّمة مع فهارسها الأصلية، مرتبة حسب الصلة. استخدم تلك الفهارس لإعادة ترتيب السجلات التي يعرضها Milvus.</p>
<p>تم دمج <a href="https://github.com/milvus-io/milvus-model/pull/90">تكامل Jev</a>. راجع <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">خيارات التنفيذ والمنشئ</a> لواجهة برمجة التطبيقات (API) الحالية. وهي تقبل <code translate="no">TYPESAFE_API_KEY</code> وتستخدم <code translate="no">jev-latest</code> كإعداد افتراضي. استخدم إصدار الحزمة الذي يتضمن هذا التكامل.</p>
<p>يستخدم الغلاف الحالي موجه صلة قائمًا على «الادعاء والدليل». تأكد من أن هذا المعيار يناسب مهمتك. بالنسبة للأحكام المخصصة مثل توافق الذاكرة أو الإيقاف أو التوجيه، اتبع الدروس المرتبطة باستخدام واجهة برمجة التطبيقات TypeSafe مباشرةً. توضح الدروس استدعاءات واجهة برمجة التطبيقات المباشرة من كود تطبيق Python.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">جربها مع Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">افتح البرنامج التعليمي الخاص بإعادة الترتيب في Colab</a> للبدء في استرجاع المرشحين وترتيبهم. للاطلاع على الإعداد المحلي وقائمة البرامج التعليمية الكاملة، راجع ملف <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">README الخاص بالمجموعة</a>.</p>
<p>تستخدم الأمثلة <a href="https://aistudio.google.com/apikey">مفتاح واجهة برمجة تطبيقات (API) لـ Gemini</a> للتضمينات <a href="https://console.typesafe.ai/">ومفتاح واجهة برمجة تطبيقات (API) لـ TypeSafe</a> لـ Jev. كما يستخدم البرنامج التعليمي الخاص بالبحث التفاعلي (agentic-search) Gemini لتوليد الاستعلامات والإجابات. يتم إرسال نص نموذجي إلى مزودي واجهة برمجة التطبيقات (API) هؤلاء، وقد تستهلك الاستدعاءات رصيدًا.</p>
<p>تعمل البرامج التعليمية مع <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> بشكل افتراضي وتتضمن خيارات اتصال بخادم Milvus أو <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. وينطبق نفس تقسيم العمل عبر جميع عمليات النشر: يقوم Milvus باسترداد المرشحين، ويقوم التطبيق بإرسال النص ذي الصلة إلى Jev للتقييم.</p>
<p>تعامل مع الأمثلة كنقاط انطلاق لمعاييرك وعتباتك الخاصة. لا تضمن درجة الصلة صحة الإجابة، ولا تحدد مجموعات البيانات التعليمية الصغيرة هذه دقة أو سرعة الإنتاج.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">استكشاف عمليات التنفيذ ونتائج التقييم<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>تطبق المشاريع مفتوحة المصدر التالية هذه الأفكار على سير عمل البحث الأكبر حجمًا. وتشرح التقارير المرتبطة بها مجموعات البيانات والمقارنات والقيود الخاصة بكل تجربة.</p>
<table>
<thead>
<tr><th>المشروع</th><th>حالة استخدام البحث</th><th>عمل Jev</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>ذاكرة Markdown دائمة لوكلاء البرمجة</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">تنفيذ Jev</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">التقييم</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">الرسم البياني المتجه RAG</a></td><td>استرجاع المتجهات والرسوم البيانية للأسئلة متعددة الخطوات</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">تنفيذ Jev</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">التقييم</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>البحث التكراري على المعرفة الخاصة</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">مشغل التجارب</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">تقييم إيقاف البحث</a> (تجربة مستقلة)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>إعادة استخدام الإجابات للطلبات المتوافقة</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">تنفيذ Jev</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">التقييم</a></td></tr>
</tbody>
</table>
<p>تتمثل مساهمة DeepSearcher في تجربة مستقلة لوقف البحث. تظهر روابط التنفيذ الأخرى تكاملات Jev الخاصة بمهام محددة. يجب قراءة نتائج هذه المشاريع في سياق التقييم الخاص بها، بدلاً من التعامل معها كمعيار قياس مشترك.</p>
