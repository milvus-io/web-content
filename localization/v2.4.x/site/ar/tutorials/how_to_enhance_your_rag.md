---
id: how_to_enhance_your_rag.md
summary: >-
  مع تزايد شعبية تطبيقات RAG الجيل المعزز للاسترجاع RAG، هناك اهتمام متزايد
  بتحسين أدائها. تعرض هذه المقالة جميع الطرق الممكنة لتحسين خطوط أنابيب RAG
  وتوفر الرسوم التوضيحية المقابلة لمساعدتك على فهم استراتيجيات تحسين RAG السائدة
  بسرعة.
title: كيفية تحسين أداء خط أنابيب RAG الخاص بك
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">كيفية تحسين أداء خط أنابيب RAG الخاص بك<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>مع تزايد شعبية تطبيقات التوليد المعزز للاسترجاع<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG)</a>، هناك اهتمام متزايد بتحسين أدائها. تقدم هذه المقالة جميع الطرق الممكنة لتحسين خطوط أنابيب RAG وتوفر الرسوم التوضيحية المقابلة لمساعدتك على فهم استراتيجيات تحسين RAG السائدة بسرعة.</p>
<p>من المهم أن نلاحظ أننا سنقدم فقط استكشافًا عالي المستوى لهذه الاستراتيجيات والتقنيات، مع التركيز على كيفية تكاملها في نظام RAG. ومع ذلك، لن نخوض في التفاصيل المعقدة أو نوجهك خلال التنفيذ خطوة بخطوة.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">خط أنابيب RAG القياسي<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح الرسم البياني أدناه خط أنابيب RAG الأكثر بساطة. أولاً، يتم تحميل أجزاء المستند في مخزن متجه (مثل <a href="https://milvus.io/docs">Milvus</a> أو <a href="https://zilliz.com/cloud">Zilliz cloud</a>). بعد ذلك، يسترجع مخزن المتجهات الأجزاء الأكثر صلة بالاستعلام من أعلى K. ثم يتم حقن هذه الأجزاء ذات الصلة في موجه سياق <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM،</a> وأخيرًا، يقوم LLM بإرجاع الإجابة النهائية.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">أنواع مختلفة من تقنيات تحسين RAG<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكننا تصنيف أساليب تحسين RAG المختلفة استنادًا إلى أدوارها في مراحل خط أنابيب RAG.</p>
<ul>
<li><strong>تحسين الاستعلام</strong>: تعديل ومعالجة عملية الاستعلام الخاصة بمدخلات RAG للتعبير عن هدف الاستعلام أو معالجته بشكل أفضل.</li>
<li><strong>تحسين الفهرسة</strong>: تحسين إنشاء فهارس التجزئة باستخدام تقنيات مثل الفهرسة متعددة التجزئة أو الفهرسة التدريجية أو الفهرسة متعددة الاتجاهات.</li>
<li><strong>تحسين الاسترجاع</strong>: تطبيق تقنيات واستراتيجيات التحسين أثناء عملية الاسترجاع.</li>
<li><strong>تحسين المولد</strong>: تعديل المطالبات وتحسينها عند تجميع المطالبات لـ LLM لتوفير استجابات أفضل.</li>
<li><strong>تحسين خط أنابيب RAG</strong>: تبديل العمليات ديناميكيًا داخل خط أنابيب RAG بأكمله، بما في ذلك استخدام وكلاء أو أدوات لتحسين الخطوات الرئيسية في خط أنابيب RAG.</li>
</ul>
<p>بعد ذلك، سنقدم طرقًا محددة تحت كل فئة من هذه الفئات.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">تحسين الاستعلام<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>دعنا نستكشف أربع طرق فعالة لتحسين تجربة الاستعلام: الأسئلة الافتراضية، وتضمينات المستندات الافتراضية، والاستعلامات الفرعية، والمطالبات المتدرجة.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">إنشاء أسئلة افتراضية</h3><p>ينطوي إنشاء أسئلة افتراضية على استخدام LLM لتوليد أسئلة متعددة قد يطرحها المستخدمون حول المحتوى الموجود في كل جزء من المستند. قبل أن يصل استعلام المستخدم الفعلي إلى LLM، يسترجع مخزن المتجهات الأسئلة الافتراضية الأكثر صلة بالاستعلام الحقيقي، إلى جانب أجزاء المستندات المقابلة لها، ويعيد توجيهها إلى LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>تتجاوز هذه المنهجية مشكلة عدم التماثل بين النطاقات في عملية البحث المتجه من خلال الانخراط مباشرةً في عمليات البحث من استعلام إلى استعلام، مما يخفف العبء على عمليات البحث المتجه. ومع ذلك، فإنها تقدم نفقات إضافية وعدم يقين إضافي في توليد أسئلة افتراضية.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (تضمينات المستندات الافتراضية)</h3><p>يرمز HyDE إلى تضمينات المستندات الافتراضية. وهي تستفيد من LLM لصياغة &quot;مستند<strong><em>افتراضي</em></strong>&quot; أو إجابة <strong><em>وهمية</em></strong> استجابةً لاستعلام المستخدم الخالي من المعلومات السياقية. يتم بعد ذلك تحويل هذه الإجابة الوهمية إلى تضمينات متجهة واستخدامها للاستعلام عن أجزاء المستند الأكثر صلة داخل قاعدة بيانات متجهة. بعد ذلك، تسترجع قاعدة البيانات المتجهة أجزاء المستندات الأكثر صلة من أعلى K وتنقلها إلى LLM واستعلام المستخدم الأصلي لتوليد الإجابة النهائية.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>تشبه هذه الطريقة تقنية السؤال الافتراضي في معالجة عدم التماثل بين المجالات في عمليات البحث عن المتجهات. ومع ذلك، فإن لها أيضًا عيوبًا، مثل التكاليف الحسابية الإضافية والشكوك المتعلقة بتوليد إجابات وهمية.</p>
<p>لمزيد من المعلومات، راجع ورقة <a href="https://arxiv.org/abs/2212.10496">HyDE</a>.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">إنشاء استعلامات فرعية</h3><p>عندما يكون استعلام المستخدم معقدًا للغاية، يمكننا استخدام LLM لتقسيمه إلى استعلامات فرعية أبسط قبل تمريرها إلى قاعدة بيانات المتجهات و LLM. لنلقِ نظرة على مثال.</p>
<p>تخيل أن يسأل مستخدم: &quot;<strong><em>ما هي الاختلافات في الميزات بين ميلفوس وزيليز كلاود؟</em></strong>&quot; هذا السؤال معقد للغاية وقد لا يكون له إجابة مباشرة في قاعدة معارفنا. لمعالجة هذه المشكلة، يمكننا تقسيمه إلى استفسارين فرعيين أبسط:</p>
<ul>
<li>الاستعلام الفرعي 1: "ما هي ميزات ميلفوس؟</li>
<li>الاستعلام الفرعي 2: "ما هي ميزات زيليز كلاود؟</li>
</ul>
<p>بمجرد أن نحصل على هذه الاستعلامات الفرعية، نرسلها جميعًا إلى قاعدة بيانات المتجهات بعد تحويلها إلى تضمينات متجهة. ثم تعثر قاعدة بيانات المتجهات على أجزاء المستندات الأكثر صلة بكل استعلام فرعي. أخيرًا، يستخدم LLM هذه المعلومات لتوليد إجابة أفضل.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>ومن خلال تقسيم استعلام المستخدم إلى استعلامات فرعية، فإننا نسهّل على نظامنا العثور على المعلومات ذات الصلة وتقديم إجابات دقيقة، حتى للأسئلة المعقدة.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">إنشاء موجهات متدرجة</h3><p>هناك طريقة أخرى لتبسيط استعلامات المستخدم المعقدة وهي إنشاء <strong><em>مطالبات متدرجة</em></strong>. تتضمن هذه التقنية تجريد استفسارات المستخدم المعقدة إلى <em><em>&quot;</em>أسئلة متدرجة</em>&quot;** باستخدام LLM. بعد ذلك، تستخدم قاعدة البيانات المتجهة هذه الأسئلة المتدرجة لاسترداد أجزاء المستندات الأكثر صلة. أخيرًا، تقوم LLM بإنشاء إجابة أكثر دقة بناءً على أجزاء المستندات المسترجعة هذه.</p>
<p>دعونا نوضح هذه التقنية بمثال. لننظر إلى الاستعلام التالي، وهو استعلام معقد للغاية وليس من السهل الإجابة عليه مباشرةً:</p>
<p><strong><em>استعلام المستخدم الأصلي: "لديّ مجموعة بيانات تحتوي على 10 مليار سجل وأريد تخزينها في ملفوس للاستعلام. هل هذا ممكن؟</em></strong></p>
<p>لتبسيط استعلام المستخدم هذا، يمكننا استخدام LLM لتوليد سؤال تراجعي أكثر وضوحًا:</p>
<p><strong><em>سؤال الاسترجاع: "ما هو الحد الأقصى لحجم مجموعة البيانات التي يمكن لـ Milvus التعامل معها؟</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>يمكن أن تساعدنا هذه الطريقة في الحصول على إجابات أفضل وأكثر دقة للاستعلامات المعقدة. فهي تقسم السؤال الأصلي إلى شكل أبسط، مما يسهل على نظامنا العثور على المعلومات ذات الصلة وتقديم إجابات دقيقة.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">تحسين الفهرسة<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>يعد تحسين الفهرسة استراتيجية أخرى لتحسين أداء تطبيقات RAG الخاصة بك. دعنا نستكشف ثلاث تقنيات لتحسين الفهرسة.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">دمج أجزاء المستند تلقائيًا</h3><p>عند إنشاء فهرس، يمكننا استخدام مستويين من التفصيل: القطع الفرعية والقطع الأصلية المقابلة لها. في البداية، نبحث عن القطع الفرعية على مستوى أدق من التفاصيل. بعد ذلك، نطبق استراتيجية الدمج: إذا كان عدد محدد، <strong><em>n،</em></strong> من القطع الفرعية من أول <strong><em>k</em></strong> من القطع الفرعية ينتمي إلى نفس القطعة الأصل، فإننا نقدم هذه القطعة الأصل إلى LLM كمعلومات سياقية.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>تم تنفيذ هذه المنهجية في <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a>.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">إنشاء مؤشرات هرمية</h3><p>عند إنشاء فهارس للمستندات، يمكننا إنشاء فهرس من مستويين: فهرس لملخصات المستندات وآخر لقطع المستندات. تتألف عملية البحث المتجه من مرحلتين: في البداية، نقوم بتصفية المستندات ذات الصلة بناءً على الملخص، وبعد ذلك، نسترجع أجزاء المستندات المقابلة حصريًا ضمن هذه المستندات ذات الصلة.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>ويثبت هذا النهج فائدته في المواقف التي تتضمن أحجامًا كبيرة من البيانات أو الحالات التي تكون فيها البيانات ذات تسلسل هرمي، مثل استرجاع المحتوى داخل مجموعة مكتبات.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">الاسترجاع وإعادة الترتيب الهجين</h3><p>تدمج تقنية الاسترجاع وإعادة الترتيب الهجين طريقة أو أكثر من طرق الاسترجاع التكميلية مع <a href="https://zilliz.com/learn/vector-similarity-search">استرجاع التشابه المتجه</a>. ثم تقوم <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">أداة إعادة الترتيب</a> بإعادة ترتيب النتائج المسترجعة بناءً على مدى ملاءمتها لاستعلام المستخدم.</p>
<p>تتضمن خوارزميات الاسترجاع التكميلية الشائعة أساليب قائمة على التردد المعجمي مثل <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a> أو النماذج الكبيرة التي تستخدم التضمينات المتفرقة مثل <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>. وتتضمن خوارزميات إعادة الترتيب خوارزميات إعادة الترتيب RRF أو نماذج أكثر تعقيدًا مثل <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder،</a> والتي تشبه البنى الشبيهة بـ BERT.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>ويستفيد هذا النهج من أساليب الاسترجاع المتنوعة لتحسين جودة الاسترجاع ومعالجة الثغرات المحتملة في استرجاع المتجهات.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">تحسين المسترجع<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن أيضًا أن يؤدي تحسين مكون المسترجع داخل نظام RAG إلى تحسين تطبيقات RAG. دعونا نستكشف بعض الطرق الفعالة لتحسين المسترجع.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">استرجاع نافذة الجملة</h3><p>في نظام RAG الأساسي، يكون جزء المستند المُعطى إلى LLM عبارة عن نافذة أكبر تشمل جزء التضمين المسترجع. وهذا يضمن أن تتضمن المعلومات المقدمة إلى آلة استرجاع المستندات LLM نطاقًا أوسع من التفاصيل السياقية، مما يقلل من فقدان المعلومات. تعمل تقنية استرجاع نافذة الجملة على فصل جزء المستند المستخدم في استرجاع التضمين عن الجزء المقدم إلى آلية إدارة التعلم.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>ومع ذلك، قد يؤدي توسيع حجم النافذة إلى تقديم معلومات متداخلة إضافية. يمكننا تعديل حجم توسيع النافذة بناءً على احتياجات العمل المحددة.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">تصفية البيانات الوصفية</h3><p>لضمان الحصول على إجابات أكثر دقة، يمكننا تنقيح المستندات المسترجعة عن طريق تصفية البيانات الوصفية مثل الوقت والفئة قبل تمريرها إلى LLM. على سبيل المثال، إذا تم استرجاع التقارير المالية التي تغطي سنوات متعددة، فإن التصفية بناءً على السنة المطلوبة ستعمل على تنقيح المعلومات لتلبية متطلبات محددة. تثبت هذه الطريقة فعاليتها في الحالات التي تحتوي على بيانات شاملة وبيانات وصفية مفصلة، مثل استرجاع المحتوى في مجموعات المكتبات.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">تحسين المولدات<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>دعونا نستكشف المزيد من تقنيات تحسين RAG من خلال تحسين المولد داخل نظام RAG.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">ضغط موجه LLM</h3><p>يمكن أن تؤثر معلومات التشويش داخل أجزاء المستندات المسترجعة بشكل كبير على دقة الإجابة النهائية لـ RAG. كما تمثل نافذة المطالبة المحدودة في LLMs أيضًا عقبة أمام الحصول على إجابات أكثر دقة. ولمعالجة هذا التحدي، يمكننا ضغط التفاصيل غير ذات الصلة، والتأكيد على الفقرات الرئيسية، وتقليل طول السياق الكلي لقطع المستندات المسترجعة.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>ويشبه هذا النهج طريقة الاسترجاع وإعادة الترتيب الهجين التي تمت مناقشتها سابقًا، حيث يتم استخدام أداة إعادة الترتيب لغربلة أجزاء المستند غير ذات الصلة.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">ضبط ترتيب القطع في المطالبة</h3><p>في ورقة &quot;<a href="https://arxiv.org/abs/2307.03172">الضياع في المنتصف</a>&quot;، لاحظ الباحثون أن أجهزة استرجاع المستندات<a href="https://arxiv.org/abs/2307.03172">الضائعة</a> في المنتصف غالبًا ما تتجاهل المعلومات الموجودة في منتصف المستندات المعطاة أثناء عملية الاستدلال. وبدلاً من ذلك، يميلون إلى الاعتماد أكثر على المعلومات المقدمة في بداية المستندات ونهايتها.</p>
<p>استنادًا إلى هذه الملاحظة، يمكننا تعديل ترتيب الأجزاء المسترجعة لتحسين جودة الإجابة: عند استرجاع أجزاء معرفية متعددة، يتم وضع الأجزاء ذات الثقة المنخفضة نسبيًا في الوسط، ويتم وضع الأجزاء ذات الثقة العالية نسبيًا في الطرفين.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">تحسين خط أنابيب RAG<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكننا أيضًا تحسين أداء تطبيقات RAG الخاصة بك عن طريق تحسين خط أنابيب RAG بأكمله.</p>
<h3 id="Self-reflection" class="common-anchor-header">الانعكاس الذاتي</h3><p>يتضمن هذا النهج مفهوم الانعكاس الذاتي داخل وكلاء الذكاء الاصطناعي. إذن، كيف تعمل هذه التقنية؟</p>
<p>تكون بعض أجزاء المستند Top-K المسترجعة في البداية غامضة وقد لا تجيب على سؤال المستخدم مباشرةً. في مثل هذه الحالات، يمكننا إجراء جولة ثانية من الانعكاس للتحقق مما إذا كانت هذه الأجزاء يمكن أن تجيب على الاستعلام بشكل حقيقي.</p>
<p>يمكننا إجراء الانعكاس باستخدام طرق انعكاس فعالة مثل نماذج الاستدلال على اللغة الطبيعية (NLI) أو أدوات إضافية مثل عمليات البحث على الإنترنت للتحقق.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>وقد تم استكشاف مفهوم الانعكاس الذاتي هذا في العديد من الأوراق البحثية أو المشاريع، بما في ذلك <a href="https://arxiv.org/pdf/2310.11511.pdf">RAG الذاتي،</a> و <a href="https://arxiv.org/pdf/2401.15884.pdf">RAG التصحيحي،</a> و <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph،</a> إلخ.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">توجيه الاستعلام مع وكيل</h3><p>في بعض الأحيان، لا نضطر إلى استخدام نظام RAG للإجابة على الأسئلة البسيطة لأنه قد يؤدي إلى مزيد من سوء الفهم والاستدلال من المعلومات المضللة. في مثل هذه الحالات، يمكننا استخدام وكيل كموجه في مرحلة الاستعلام. يقوم هذا الوكيل بتقييم ما إذا كان الاستعلام يحتاج إلى المرور عبر خط أنابيب RAG. إذا كان الأمر كذلك، يتم البدء في خط أنابيب RAG اللاحق؛ وإلا فإن LLM يعالج الاستعلام مباشرةً.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>يمكن أن يتخذ الوكيل أشكالاً مختلفة، بما في ذلك نموذج تصنيف صغير أو نموذج تصنيف صغير أو حتى مجموعة من القواعد.</p>
<p>من خلال توجيه الاستعلامات بناءً على نية المستخدم، يمكنك إعادة توجيه جزء من الاستعلامات، مما يؤدي إلى زيادة كبيرة في وقت الاستجابة وتقليل ملحوظ في التشويش غير الضروري.</p>
<p>يمكننا توسيع نطاق تقنية توجيه الاستعلامات لتشمل عمليات أخرى داخل نظام RAG، مثل تحديد وقت استخدام أدوات مثل عمليات البحث على الويب أو إجراء استعلامات فرعية أو البحث عن الصور. ويضمن هذا النهج تحسين كل خطوة في نظام RAG بناءً على المتطلبات المحددة للاستعلام، مما يؤدي إلى استرجاع معلومات أكثر كفاءة ودقة.</p>
<h2 id="Summary" class="common-anchor-header">الملخص<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>على الرغم من أن خط أنابيب RAG الفانيليا قد يبدو بسيطًا، إلا أن تحقيق الأداء الأمثل للأعمال يتطلب غالبًا تقنيات تحسين أكثر تعقيدًا.</p>
<p>تلخص هذه المقالة مختلف الأساليب الشائعة لتحسين أداء تطبيقات RAG الخاصة بك. كما قدمنا أيضًا رسومًا توضيحية واضحة لمساعدتك على فهم هذه المفاهيم والتقنيات بسرعة وتسريع تنفيذها وتحسينها.</p>
<p>يمكنك الحصول على التطبيقات البسيطة للمناهج الرئيسية المدرجة في هذه المقالة على <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">رابط GitHub</a> هذا.</p>
