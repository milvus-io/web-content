---
id: overview.md
title: ما هو Milvus؟
related_key: Milvus Overview
summary: >-
  Milvus هي قاعدة بيانات متجهة عالية الأداء وقابلة للتوسع بشكل كبير، تعمل بكفاءة
  في مجموعة واسعة من البيئات، بدءًا من أجهزة الكمبيوتر المحمولة وصولاً إلى
  الأنظمة الموزعة واسعة النطاق. وهي متاحة كبرنامج مفتوح المصدر وكخدمة سحابية.
---
<h1 id="What-is-Milvus" class="common-anchor-header">ما هو ميلفوس؟<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> هو طائر جارح ينتمي إلى جنس Milvus من عائلة الصقور Accipaitridae، ويشتهر بسرعته في الطيران، وبصره الحاد، وقدرته الرائعة على التكيف.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>تتبنى Zilliz اسم Milvus لقاعدة بياناتها المتجهة مفتوحة المصدر عالية الأداء والقابلة للتوسع بشكل كبير، والتي تعمل بكفاءة عبر مجموعة واسعة من البيئات، بدءًا من أجهزة الكمبيوتر المحمولة وصولًا إلى الأنظمة الموزعة واسعة النطاق. وهي متاحة كبرنامج مفتوح المصدر وكخدمة سحابية.</p>
<p>تم تطوير Milvus بواسطة Zilliz وسيتم التبرع به قريبًا إلى مؤسسة LF AI &amp; Data التابعة لمؤسسة Linux، وقد أصبح أحد المشاريع الرائدة عالميًا في مجال قواعد البيانات المتجهة مفتوحة المصدر. يتم توزيعه بموجب ترخيص Apache 2.0، ومعظم المساهمين هم خبراء من مجتمع الحوسبة عالية الأداء (HPC)، متخصصون في بناء أنظمة واسعة النطاق وتحسين الكود المراعي لخصائص الأجهزة. ومن بين المساهمين الرئيسيين محترفون من Zilliz وARM وNVIDIA وAMD وIntel وMeta وIBM وSalesforce وAlibaba وMicrosoft.</p>
<p>ومن المثير للاهتمام أن كل مشروع مفتوح المصدر من Zilliz يحمل اسم طائر، وهي قاعدة تسمية ترمز إلى الحرية والبصيرة والتطور السريع للتكنولوجيا.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">البيانات غير المنظمة، والتضمينات، وMilvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>تتنوع البيانات غير المنظمة، مثل النصوص والصور والمقاطع الصوتية، في تنسيقاتها وتحمل دلالات أساسية غنية، مما يجعل تحليلها أمرًا صعبًا. ولإدارة هذه التعقيدات، تُستخدم التضمينات لتحويل البيانات غير المنظمة إلى متجهات عددية تلتقط خصائصها الأساسية. ثم يتم تخزين هذه المتجهات في قاعدة بيانات متجهة، مما يتيح إجراء عمليات بحث وتحليلات سريعة وقابلة للتوسع.</p>
<p>يوفر Milvus إمكانيات قوية لنمذجة البيانات، مما يتيح لك تنظيم بياناتك غير المنظمة أو متعددة الوسائط في مجموعات منظمة. وهو يدعم مجموعة واسعة من أنواع البيانات لنمذجة السمات المختلفة، بما في ذلك الأنواع الرقمية وأنواع الأحرف الشائعة، وأنواع المتجهات المختلفة، والمصفوفات، والمجموعات، وJSON، مما يوفر عليك عناء صيانة أنظمة قواعد بيانات متعددة.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>البيانات غير المنظمة، والتضمينات، وMilvus</span>
  
 </span></p>
<p>يقدم Milvus ثلاثة أوضاع للنشر، تغطي نطاقًا واسعًا من أحجام البيانات — بدءًا من إنشاء النماذج الأولية المحلية في Jupyter Notebooks وصولًا إلى مجموعات Kubernetes الضخمة التي تدير عشرات المليارات من المتجهات:</p>
<ul>
<li>Milvus Lite هي مكتبة Python يمكن دمجها بسهولة في تطبيقاتك. وباعتبارها نسخة خفيفة الوزن من Milvus، فهي مثالية لإنشاء النماذج الأولية السريعة في Jupyter Notebooks أو للتشغيل على الأجهزة الطرفية ذات الموارد المحدودة. <a href="/docs/ar/milvus_lite.md">تعرف على المزيد</a>.</li>
<li>Milvus Standalone هو نشر خادم على جهاز واحد، حيث يتم تجميع جميع المكونات في صورة Docker واحدة لتسهيل عملية النشر. <a href="/docs/ar/install_standalone-docker.md">تعرف على المزيد</a>.</li>
<li>يمكن نشر Milvus Distributed على مجموعات Kubernetes، ويتميز بهيكلية سحابية أصلية مصممة لسيناريوهات بمليارات أو حتى أكبر من ذلك. تضمن هذه الهيكلية التكرار في المكونات الحيوية. <a href="/docs/ar/install_cluster-milvusoperator.md">تعرف على المزيد</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">ما الذي يجعل Milvus سريعًا جدًّا؟<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>صُمم Milvus منذ البداية ليكون نظام قاعدة بيانات متجهة عالي الكفاءة. في معظم الحالات، يتفوق Milvus على قواعد البيانات المتجهة الأخرى بمقدار 2 إلى 5 أضعاف (انظر نتائج VectorDBBench). ويأتي هذا الأداء العالي نتيجة لعدة قرارات تصميمية رئيسية:</p>
<p><strong>التحسين المراعي لخصائص الأجهزة</strong>: لتكييف Milvus مع بيئات الأجهزة المختلفة، قمنا بتحسين أدائه خصيصًا للعديد من البنى والمنصات المادية، بما في ذلك AVX512 وSIMD ووحدات معالجة الرسومات (GPUs) ومحركات الأقراص الصلبة SSD من نوع NVMe.</p>
<p><strong>خوارزميات بحث متقدمة</strong>: يدعم Milvus مجموعة واسعة من خوارزميات الفهرسة/البحث في الذاكرة وعلى القرص، بما في ذلك IVF وHNSW وDiskANN وغيرها، وقد تم تحسينها جميعًا بشكل عميق. مقارنةً بالتطبيقات الشائعة مثل FAISS وHNSWLib، يقدم Milvus أداءً أفضل بنسبة تتراوح بين 30% و70%.</p>
<p><strong>محرك بحث بلغة C++</strong>: يتحدد أكثر من 80% من أداء قاعدة البيانات المتجهة بواسطة محرك البحث الخاص بها. يستخدم Milvus لغة C++ لهذا المكون الحيوي نظرًا للأداء العالي لهذه اللغة، والتحسين على المستوى المنخفض، والإدارة الفعالة للموارد. والأهم من ذلك، يدمج Milvus العديد من تحسينات الكود التي تراعي خصائص الأجهزة، بدءًا من التحويل إلى الصيغة المتجهة على مستوى التجميع وصولًا إلى التوازي متعدد الخيوط والجدولة، وذلك للاستفادة الكاملة من قدرات الأجهزة.</p>
<p><strong>موجهة للأعمدة</strong>: Milvus هو نظام قاعدة بيانات متجهة للأعمدة. وتكمن المزايا الرئيسية في أنماط الوصول إلى البيانات. عند تنفيذ الاستعلامات، لا تقرأ قاعدة البيانات الموجهة للأعمدة سوى الحقول المحددة التي يشملها الاستعلام، بدلاً من الصفوف بأكملها، مما يقلل بشكل كبير من كمية البيانات التي يتم الوصول إليها. بالإضافة إلى ذلك، يمكن تحويل العمليات التي تُجرى على البيانات القائمة على الأعمدة إلى متجهات بسهولة، مما يسمح بتطبيق العمليات على الأعمدة بأكملها دفعة واحدة، مما يعزز الأداء بشكل أكبر.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">ما الذي يجعل Milvus قابلة للتوسع إلى هذا الحد<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>في عام 2022، دعم Milvus متجهات بمليارات الوحدات، وفي عام 2023، توسع إلى عشرات المليارات مع استقرار ثابت، مما دعم سيناريوهات واسعة النطاق لأكثر من 300 مؤسسة كبرى، بما في ذلك Salesforce وPayPal وShopee وAirbnb وeBay وNVIDIA و IBM وAT&amp;T وLINE وROBLOX وInflection وغيرها.</p>
<p>تضمن بنية نظام Milvus السحابية الأصلية وعالية الفصل أن النظام يمكنه التوسع باستمرار مع نمو البيانات:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>بنية نظام Milvus عالية الفصل</span>
  
 </span></p>
<p>يتميز Milvus نفسه بأنه خالٍ تمامًا من الحالة (stateless)، مما يتيح توسيع نطاقه بسهولة بمساعدة Kubernetes أو السحابات العامة. بالإضافة إلى ذلك، تتميز مكونات Milvus بفصل جيد، حيث تم تصميم المهام الثلاث الأكثر أهمية — البحث، وإدخال البيانات، والفهرسة/الضغط — كعمليات يمكن تشغيلها بالتوازي بسهولة، مع فصل المنطق المعقد عنها. وهذا يضمن أن عقدة الاستعلام وعقدة البيانات وعقدة الفهرس المقابلة يمكن توسيع نطاقها عموديًا وأفقيًا بشكل مستقل، مما يؤدي إلى تحسين الأداء والكفاءة من حيث التكلفة.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">أنواع عمليات البحث التي يدعمها Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus أنواعًا متنوعة من وظائف البحث لتلبية متطلبات حالات الاستخدام المختلفة:</p>
<ul>
<li><a href="/docs/ar/single-vector-search.md#Basic-search">البحث باستخدام الشبكات العصبية الاصطناعية (ANN)</a>: يبحث عن أفضل K متجهات هي الأقرب إلى متجه الاستعلام الخاص بك.</li>
<li><a href="/docs/ar/single-vector-search.md#Filtered-search">البحث بالتصفية</a>: يُجري بحثًا باستخدام الشبكة العصبية الاصطناعية (ANN) في ظل شروط تصفية محددة.</li>
<li><a href="/docs/ar/single-vector-search.md#Range-search">البحث في النطاق</a>: يبحث عن المتجهات ضمن نطاق محدد من متجه الاستعلام الخاص بك.</li>
<li><a href="/docs/ar/multi-vector-search.md">البحث الهجين</a>: يجري بحثًا باستخدام الشبكة العصبية الاصطناعية (ANN) استنادًا إلى حقول متجهات متعددة.</li>
<li><a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>: بحث عن النص الكامل استنادًا إلى BM25.</li>
<li><a href="/docs/ar/weighted-ranker.md">إعادة الترتيب</a>: يضبط ترتيب نتائج البحث بناءً على معايير إضافية أو خوارزمية ثانوية، مما يؤدي إلى تحسين نتائج البحث الأولي باستخدام الشبكة العصبية الاصطناعية (ANN).</li>
<li><a href="/docs/ar/get-and-scalar-query.md#Get-Entities-by-ID">الجلب</a>: يسترد البيانات حسب مفاتيحها الأساسية.</li>
<li><a href="/docs/ar/get-and-scalar-query.md#Use-Basic-Operators">الاستعلام</a>: يسترد البيانات باستخدام تعبيرات محددة.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">مجموعة ميزات شاملة<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>بالإضافة إلى ميزات البحث الرئيسية المذكورة أعلاه، يوفر Milvus أيضًا مجموعة من الميزات التي تم تنفيذها حول عمليات البحث باستخدام الشبكات العصبية الاصطناعية (ANN) حتى تتمكن من الاستفادة الكاملة من قدراته.</p>
<h3 id="API-and-SDK" class="common-anchor-header">واجهة برمجة التطبيقات (API) ومجموعة أدوات تطوير البرامج (SDK)<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">واجهة</a> برمجة التطبيقات (<a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">API) RESTful</a> (رسمية)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (حزمة تطوير البرامج لـ Python) (رسمية)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">Go SDK</a> (رسمي)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">Java SDK</a> (رسمي)</li>
<li><a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) SDK (رسمي)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (بمساهمة من Microsoft)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">C++ SDK</a> (رسمي)</li>
<li>Rust SDK (قيد التطوير)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">أنواع البيانات المتقدمة<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>بالإضافة إلى أنواع البيانات الأولية، يدعم Milvus أنواعًا متنوعة من البيانات المتقدمة ومقاييس المسافة القابلة للتطبيق الخاصة بكل منها.</p>
<ul>
<li><a href="/docs/ar/sparse_vector.md">المتجهات المتفرقة</a></li>
<li><a href="/docs/ar/index-vector-fields.md">المتجهات الثنائية</a></li>
<li><a href="/docs/ar/use-json-fields.md">دعم JSON</a></li>
<li><a href="/docs/ar/array_data_type.md">دعم المصفوفات</a></li>
<li>النص (قيد التطوير)</li>
<li>تحديد الموقع الجغرافي (قيد التطوير)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">لماذا Milvus؟<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
<li><p><strong>أداء عالٍ على نطاق واسع وتوافر عالٍ</strong></p>
<p>يتميز Milvus <a href="/docs/ar/architecture_overview.md">بهيكلية موزعة</a> تفصل بين <a href="/docs/ar/data_processing.md#Data-query">الحوسبة</a> <a href="/docs/ar/data_processing.md#Data-insertion">والتخزين</a>. يمكن لـ Milvus التوسع أفقيًا والتكيف مع أنماط حركة المرور المتنوعة، مما يحقق الأداء الأمثل من خلال زيادة عقد الاستعلام بشكل مستقل لأحمال العمل التي تعتمد بشكل كبير على القراءة، وعقد البيانات لأحمال العمل التي تعتمد بشكل كبير على الكتابة. تتيح الخدمات الصغيرة غير المرتبطة بالحالة على K8s <a href="/docs/ar/coordinator_ha.md#Coordinator-HA">الاستعادة السريعة</a> من الأعطال، مما يضمن التوافر العالي. كما يعزز دعم <a href="/docs/ar/replica.md">النسخ</a> المتماثلة من تحمل الأعطال والإنتاجية عن طريق تحميل شرائح البيانات على عدة عقد استعلام. انظر <a href="https://zilliz.com/vector-database-benchmark-tool">معيار الأداء</a> لمقارنة الأداء.</p></li>
<li><p><strong>دعم أنواع مختلفة من فهارس المتجهات وتسريع الأجهزة</strong></p>
<p>يفصل Milvus بين النظام ومحرك البحث المتجهي الأساسي، مما يتيح له دعم جميع أنواع الفهارس المتجهة الرئيسية المُحسَّنة لمختلف السيناريوهات، بما في ذلك HNSW وIVF وFLAT (القوة الغاشمة) وSCANN وDiskANN، مع الاختلافات <a href="/docs/ar/index-explained.md">القائمة على التكمية</a> <a href="/docs/ar/mmap.md">وmmap</a>. يقوم Milvus بتحسين البحث المتجهي من أجل الميزات المتقدمة مثل <a href="/docs/ar/boolean.md">تصفية البيانات الوصفية</a> <a href="/docs/ar/range-search.md">والبحث عن النطاق</a>. بالإضافة إلى ذلك، يطبق Milvus تسريع الأجهزة لتحسين أداء البحث المتجهي ويدعم الفهرسة باستخدام وحدة معالجة الرسومات (GPU)، مثل <a href="/docs/ar/gpu-cagra.md">CAGRA</a> من NVIDIA.</p></li>
<li><p><strong>مرونة في الاستخدام المتعدد والتخزين الساخن/البارد</strong></p>
<p>يدعم Milvus <a href="/docs/ar/multi_tenancy.md#Multi-tenancy-strategies">الاستخدام المتعدد</a> من خلال العزل على مستوى قاعدة البيانات أو المجموعة أو القسم أو مفتاح القسم. تتيح الاستراتيجيات المرنة لمجموعة واحدة التعامل مع مئات إلى ملايين المستخدمين، كما تضمن أداء بحث مُحسَّنًا وتحكمًا مرنًا في الوصول. يعزز Milvus الفعالية من حيث التكلفة من خلال التخزين الساخن/البارد. يمكن تخزين البيانات الساخنة التي يتم الوصول إليها بشكل متكرر في الذاكرة أو على محركات أقراص SSD لتحسين الأداء، بينما يتم الاحتفاظ بالبيانات الباردة التي يتم الوصول إليها بشكل أقل على وسائط تخزين أبطأ وفعالة من حيث التكلفة. يمكن لهذه الآلية أن تقلل التكاليف بشكل كبير مع الحفاظ على أداء عالٍ للمهام الحرجة.</p></li>
<li><p><strong>المتجهات المتفرقة للبحث عن النص الكامل والبحث الهجين</strong></p>
<p>بالإضافة إلى البحث الدلالي من خلال المتجهات الكثيفة، يدعم Milvus أيضًا بشكل أصلي <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a> باستخدام BM25 بالإضافة إلى التضمين المتفرق المُتعلَّم مثل SPLADE وBGE-M3. يمكن للمستخدمين تخزين المتجهات المتفرقة والمتجهات الكثيفة في نفس المجموعة، وتحديد وظائف لإعادة ترتيب النتائج من طلبات بحث متعددة. انظر أمثلة على <a href="/docs/ar/full_text_search_with_milvus.md">البحث الهجين باستخدام البحث الدلالي + البحث عن النص الكامل</a>.</p></li>
<li><p><strong>أمن البيانات والتحكم الدقيق في الوصول</strong></p>
<p>يضمن Milvus أمن البيانات من خلال تطبيق <a href="/docs/ar/authenticate.md">المصادقة الإلزامية للمستخدمين،</a> <a href="/docs/ar/tls.md">وتشفير TLS،</a> <a href="/docs/ar/rbac.md">والتحكم في الوصول القائم على الأدوار (RBAC)</a>. تضمن مصادقة المستخدمين أن المستخدمين المصرح لهم الذين يمتلكون بيانات اعتماد صالحة هم فقط من يمكنهم الوصول إلى قاعدة البيانات، بينما يعمل تشفير TLS على تأمين جميع الاتصالات داخل الشبكة. بالإضافة إلى ذلك، يتيح نظام RBAC التحكم الدقيق في الوصول من خلال تعيين أذونات محددة للمستخدمين بناءً على أدوارهم. تجعل هذه الميزات من Milvus خيارًا قويًا وآمنًا لتطبيقات المؤسسات، حيث تحمي البيانات الحساسة من الوصول غير المصرح به والانتهاكات المحتملة.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">تكاملات الذكاء الاصطناعي<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
<li><p>تكامل نماذج التضمين
تعمل نماذج التضمين على تحويل البيانات غير المنظمة إلى تمثيلها الرقمي في فضاء البيانات عالي الأبعاد بحيث يمكنك تخزينها في Milvus. حاليًا، يدمج PyMilvus، وهو SDK لـ Python، عدة نماذج تضمين بحيث يمكنك تحضير بياناتك بسرعة لتصبح تضمينات متجهة. لمزيد من التفاصيل، راجع <a href="/docs/ar/embeddings.md">نظرة عامة على التضمين</a>.</p></li>
<li><p>تكامل نماذج إعادة الترتيب
في مجال استرجاع المعلومات والذكاء الاصطناعي التوليدي، يُعد أداة إعادة الترتيب أداة أساسية تعمل على تحسين ترتيب نتائج عمليات البحث الأولية. كما يدمج PyMilvus العديد من نماذج إعادة الترتيب لتحسين ترتيب النتائج التي يتم إرجاعها من عمليات البحث الأولية. لمزيد من التفاصيل، راجع <a href="/docs/ar/rerankers-overview.md">«نظرة عامة</a> على <a href="/docs/ar/rerankers-overview.md">أدوات إعادة الترتيب</a>».</p></li>
<li><p>تكامل LangChain وأدوات الذكاء الاصطناعي الأخرى
في عصر الذكاء الاصطناعي التوليدي (GenAI)، تحظى أدوات مثل LangChain باهتمام كبير من مطوري التطبيقات. وباعتباره مكونًا أساسيًا، يعمل Milvus عادةً كمخزن للمتجهات في مثل هذه الأدوات. لمعرفة كيفية دمج Milvus في أدوات الذكاء الاصطناعي المفضلة لديك، راجع قسم <a href="/docs/ar/integrate_with_openai.md">«التكاملات</a> <a href="/docs/ar/build-rag-with-milvus.md">والبرامج التعليمية</a>».</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">الأدوات والنظام البيئي<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
<li><p>Attu
Attu هي واجهة مستخدم رسومية (GUI) شاملة وسهلة الاستخدام تساعدك على إدارة Milvus والبيانات التي يخزنها. لمزيد من التفاصيل، راجع مستودع <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher
Birdwatcher هي أداة تصحيح أخطاء لـ Milvus. باستخدامها للاتصال بـ etcd، يمكنك التحقق من حالة نظام Milvus الخاص بك أو تهيئته على الفور. لمزيد من التفاصيل، راجع <a href="/docs/ar/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>تكاملات Prometheus و Grafana
Prometheus هي مجموعة أدوات مفتوحة المصدر لمراقبة النظام وإرسال التنبيهات لـ Kubernetes. Grafana هي منصة تصور مفتوحة المصدر يمكنها الاتصال بجميع مصادر البيانات. يمكنك استخدام Prometheus و Grafana كمزود خدمة المراقبة لمراقبة أداء Milvus الموزع بصريًا. لمزيد من التفاصيل، راجع <a href="/docs/ar/monitor.md">«نشر خدمات المراقبة</a>».</p></li>
<li><p>النسخ الاحتياطي في Milvus
النسخ الاحتياطي في Milvus هو أداة تتيح للمستخدمين إجراء النسخ الاحتياطي لبيانات Milvus واستعادتها. وهي توفر كل من واجهة سطر الأوامر (CLI) وواجهة برمجة التطبيقات (API) لتتناسب مع سيناريوهات التطبيق المختلفة. لمزيد من التفاصيل، راجع <a href="/docs/ar/milvus_backup_overview.md">النسخ الاحتياطي في Milvus</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC)
يمكن لـ Milvus-CDC التقاط البيانات التراكمية ومزامنتها في مثيلات Milvus، كما يضمن موثوقية البيانات التجارية من خلال نقلها بسلاسة بين المثيلات المصدر والهدف، مما يتيح إجراء النسخ الاحتياطي التراكمي واستعادة البيانات بعد الكوارث بسهولة. لمزيد من التفاصيل، راجع <a href="/docs/ar/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>موصلات Milvus
أعدت Milvus مجموعة من الموصلات لتتمكن من دمج Milvus بسلاسة مع أدوات الجهات الخارجية، مثل Apache Spark. حاليًا، يمكنك استخدام موصل Spark الخاص بنا لتغذية بيانات Milvus الخاصة بك إلى Apache Spark لمعالجتها باستخدام التعلم الآلي. لمزيد من التفاصيل، راجع <a href="/docs/ar/integrate_with_spark.md">موصل Spark-Milvus</a>.</p></li>
<li><p>خدمات نقل المتجهات (VTS)
توفر Milvus مجموعة من الأدوات لنقل بياناتك بين مثيل Milvus ومجموعة من مصادر البيانات، بما في ذلك مجموعات Zilliz وElasticsearch وPostgres (PgVector) ومثيل Milvus آخر. لمزيد من التفاصيل، راجع <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
