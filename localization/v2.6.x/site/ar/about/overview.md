---
id: overview.md
title: ما هو ميلفوس
related_key: Milvus Overview
summary: >-
  Milvus عبارة عن قاعدة بيانات متجهة عالية الأداء وقابلة للتطوير بشكل كبير تعمل
  بكفاءة عبر مجموعة واسعة من البيئات، بدءًا من الكمبيوتر المحمول وحتى الأنظمة
  الموزعة على نطاق واسع. وهي متاحة كبرنامج مفتوح المصدر وخدمة سحابية.
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
    </button></h1><p><span>ميلفوس <span style="display: inline-block; vertical-align: middle;">
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
</span></span> هو طائر جارح من جنس ميلفوس من فصيلة الصقور Accipaitridae، يشتهر بسرعته في الطيران وبصره الحاد وقدرته الرائعة على التكيف.</p>
<style>
  الصوت::-webkit-media-controls { العرض: لا شيء !مهم؛ }</style>
<p>تتبنى Zilliz اسم Milvus لقاعدة البيانات المتجهة عالية الأداء مفتوحة المصدر وعالية الأداء والقابلة للتطوير بكفاءة عالية والتي تعمل بكفاءة عبر مجموعة واسعة من البيئات، من الكمبيوتر المحمول إلى الأنظمة الموزعة على نطاق واسع. وهي متاحة كبرنامج مفتوح المصدر وخدمة سحابية على حد سواء.</p>
<p>تم تطويره من قبل Zilliz وسرعان ما تم التبرع به لمؤسسة LF AI &amp; Data Foundation التابعة لمؤسسة لينكس، وقد أصبح Milvus أحد مشاريع قواعد البيانات المتجهة الرائدة في العالم مفتوحة المصدر. يتم توزيعه بموجب ترخيص Apache 2.0، ومعظم المساهمين فيه هم خبراء من مجتمع الحوسبة عالية الأداء (HPC)، متخصصون في بناء أنظمة واسعة النطاق وتحسين التعليمات البرمجية المدركة للأجهزة. ومن بين المساهمين الأساسيين محترفون من Zilliz، و ARM، و NVIDIA، و AMD، و Intel، و Meta، و IBM، و Salesforce، و Alibaba، و Microsoft.</p>
<p>ومن المثير للاهتمام أن كل مشروع من مشاريع Zilliz مفتوحة المصدر سُمي على اسم طائر، وهو اصطلاح تسمية يرمز إلى الحرية واستشراف المستقبل والتطور السريع للتكنولوجيا.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">البيانات غير المهيكلة، والتضمينات، وميلفوس<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>تتنوع البيانات غير المهيكلة، مثل النصوص والصور والصوت، من حيث التنسيق وتحمل دلالات غنية ضمنية، مما يجعل تحليلها صعبًا. لإدارة هذا التعقيد، تُستخدم التضمينات لتحويل البيانات غير المهيكلة إلى متجهات رقمية تلتقط خصائصها الأساسية. ثم يتم تخزين هذه المتجهات في قاعدة بيانات متجهة، مما يتيح إجراء عمليات بحث وتحليلات سريعة وقابلة للتطوير.</p>
<p>يوفر Milvus إمكانات قوية لنمذجة البيانات، مما يتيح لك تنظيم بياناتك غير المنظمة أو متعددة الوسائط في مجموعات منظمة. وهو يدعم مجموعة واسعة من أنواع البيانات لنمذجة السمات المختلفة، بما في ذلك الأنواع العددية والحرفية الشائعة، وأنواع المتجهات المختلفة، والمصفوفات، والمجموعات، وJSON، مما يوفر عليك جهد الحفاظ على أنظمة قواعد بيانات متعددة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>البيانات غير المهيكلة، والتضمينات، و Milvus</span> </span></p>
<p>يوفر Milvus ثلاثة أوضاع نشر، تغطي مجموعة واسعة من مقاييس البيانات - من النماذج الأولية المحلية في دفاتر Jupyter Notebooks إلى مجموعات Kubernetes الضخمة التي تدير عشرات المليارات من المتجهات:</p>
<ul>
<li>Milvus Lite هي مكتبة بايثون يمكن دمجها بسهولة في تطبيقاتك. وباعتبارها نسخة خفيفة الوزن من Milvus، فهي مثالية للنماذج الأولية السريعة في دفاتر Jupyter Notebooks أو التشغيل على أجهزة متطورة ذات موارد محدودة. <a href="/docs/ar/milvus_lite.md">اعرف المزيد</a>.</li>
<li>Milvus Standalone هو عبارة عن نشر خادم أحادي الجهاز، مع تجميع جميع المكونات في صورة Docker واحدة للنشر المريح. اعرف <a href="/docs/ar/install_standalone-docker.md">المزيد</a>.</li>
<li>يمكن نشر Milvus Distributed على مجموعات Kubernetes، التي تتميز ببنية سحابية أصلية مصممة لسيناريوهات على نطاق مليار أو حتى سيناريوهات أكبر. تضمن هذه البنية التكرار في المكونات الهامة. <a href="/docs/ar/install_cluster-milvusoperator.md">اعرف المزيد</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">ما الذي يجعل ميلفوس سريعًا جدًا？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>تم تصميم Milvus منذ اليوم الأول ليكون نظام قاعدة بيانات متجه عالي الكفاءة. في معظم الحالات، يتفوق Milvus على قواعد البيانات المتجهة الأخرى بمعدل 2-5 أضعاف (راجع نتائج VectorDBBench). هذا الأداء العالي هو نتيجة للعديد من قرارات التصميم الرئيسية:</p>
<p><strong>التحسين المدرك للأجهزة</strong>: لاستيعاب Milvus في بيئات الأجهزة المختلفة، قمنا بتحسين أدائها خصيصًا للعديد من بنيات الأجهزة والمنصات، بما في ذلك AVX512 وSIMD ووحدات معالجة الرسومات وNVMe SSD.</p>
<p><strong>خوارزميات بحث متقدمة</strong>: يدعم Milvus مجموعة واسعة من خوارزميات الفهرسة/البحث في الذاكرة وعلى القرص، بما في ذلك خوارزميات الفهرسة/البحث في الذاكرة وعلى القرص، بما في ذلك IVF وHNSW وDiskANN وغيرها، والتي تم تحسينها جميعًا بشكل كبير. ومقارنةً بالتطبيقات الشائعة مثل FAISS وHNSWLib، يقدم Milvus أداءً أفضل بنسبة 30%-70%.</p>
<p><strong>محرك البحث في C++</strong>: يتم تحديد أكثر من 80% من أداء قاعدة البيانات المتجهة من خلال محرك البحث الخاص بها. Milvus uses C++ for this critical component due to the language’s high performance, low-level optimization, and efficient resource management. والأهم من ذلك أن Milvus يدمج العديد من التحسينات البرمجية المدركة للأجهزة، بدءًا من التحسينات على مستوى التجميع إلى التوازي والجدولة متعددة الخيوط للاستفادة الكاملة من قدرات الأجهزة.</p>
<p>موجه<strong>نحو العمود</strong>: Milvus هو نظام قاعدة بيانات متجه موجه نحو الأعمدة. تأتي المزايا الأساسية من أنماط الوصول إلى البيانات. عند إجراء الاستعلامات، تقرأ قاعدة البيانات الموجهة نحو الأعمدة فقط الحقول المحددة المتضمنة في الاستعلام، بدلاً من الصفوف بأكملها، مما يقلل بشكل كبير من كمية البيانات التي يتم الوصول إليها. بالإضافة إلى ذلك، يمكن تحويل العمليات على البيانات المستندة إلى الأعمدة بسهولة، مما يسمح بتطبيق العمليات على الأعمدة بأكملها في وقت واحد، مما يعزز الأداء بشكل أكبر.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">ما الذي يجعل Milvus قابلاً للتطوير<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>في عام 2022، دعمت Milvus المتجهات على نطاق مليار متجه، وفي عام 2023، توسعت إلى عشرات المليارات مع ثبات ثابت، مما أدى إلى تشغيل سيناريوهات واسعة النطاق لأكثر من 300 شركة كبرى، بما في ذلك Salesforce وPayPal وShopee وAirbnb وEbnb وEbay وNVIDIA وIBM وAT&amp;T وLINE وRobLOX وInflection وغيرها.</p>
<p>تضمن بنية نظام ميلفوس السحابية الأصلية والمنفصلة للغاية أن النظام يمكن أن يتوسع باستمرار مع نمو البيانات:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>بنية النظام المنفصلة للغاية في ميلفوس</span> </span></p>
<p>إن Milvus نفسه عديم الحالة بالكامل، لذا يمكن توسيع نطاقه بسهولة بمساعدة Kubernetes أو السحابة العامة. بالإضافة إلى ذلك، تم فصل مكونات Milvus بشكل جيد، حيث تم تصميم المهام الثلاث الأكثر أهمية - البحث، وإدخال البيانات، والفهرسة/التجميع - كعمليات متوازية بسهولة، مع فصل المنطق المعقد. يضمن ذلك إمكانية توسيع نطاق عقدة الاستعلام وعقدة البيانات وعقدة الفهرس المقابلة لها بشكل مستقل، مما يحسّن الأداء وكفاءة التكلفة.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">أنواع عمليات البحث التي تدعمها ميلفوس<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus أنواعًا مختلفة من وظائف البحث لتلبية متطلبات حالات الاستخدام المختلفة:</p>
<ul>
<li><a href="/docs/ar/single-vector-search.md#Basic-search">بحث الشبكة النانوية</a>: البحث عن أفضل متجهات K الأقرب إلى متجه الاستعلام الخاص بك.</li>
<li><a href="/docs/ar/single-vector-search.md#Filtered-search">بحث التصفية</a>: يقوم بإجراء بحث ANN في ظل شروط تصفية محددة.</li>
<li><a href="/docs/ar/single-vector-search.md#Range-search">بحث النطاق</a>: البحث عن المتجهات داخل نصف قطر محدد من متجه الاستعلام الخاص بك.</li>
<li><a href="/docs/ar/multi-vector-search.md">بحث هجين</a>: إجراء بحث ANN بناءً على حقول متجهات متعددة.</li>
<li><a href="/docs/ar/full-text-search.md">بحث بالنص الكامل</a>: بحث بالنص الكامل استنادًا إلى BM25.</li>
<li><a href="/docs/ar/weighted-ranker.md">إعادة الترتيب</a>: يضبط ترتيب نتائج البحث استنادًا إلى معايير إضافية أو خوارزمية ثانوية، مع تنقيح نتائج بحث الشبكة العصبية الاصطناعية الأولية.</li>
<li><a href="/docs/ar/get-and-scalar-query.md#Get-Entities-by-ID">إحضار</a>: استرجاع البيانات حسب مفاتيحها الأساسية.</li>
<li><a href="/docs/ar/get-and-scalar-query.md#Use-Basic-Operators">استعلام</a>: استرجاع البيانات باستخدام تعبيرات محددة.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">مجموعة الميزات الشاملة<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>بالإضافة إلى ميزات البحث الرئيسية المذكورة أعلاه، يوفر Milvus أيضًا مجموعة من الميزات المنفذة حول عمليات بحث الشبكة الوطنية للبحث بحيث يمكنك الاستفادة الكاملة من إمكانياته.</p>
<h3 id="API-and-SDK" class="common-anchor-header">واجهة برمجة التطبيقات و SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a> (رسمي)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK) (رسمي)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (رسمي)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">جافا SDK</a> (رسمي)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (رسمي)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (ساهمت بها مايكروسوفت)</li>
<li>C++ SDK (قيد التطوير)</li>
<li>Rust SDK (قيد التطوير)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">أنواع البيانات المتقدمة</h3><p>بالإضافة إلى أنواع البيانات البدائية، تدعم ميلفوس أنواع بيانات متقدمة مختلفة ومقاييس المسافة المطبقة الخاصة بها.</p>
<ul>
<li><a href="/docs/ar/sparse_vector.md">المتجهات المتفرقة</a></li>
<li><a href="/docs/ar/index-vector-fields.md">المتجهات الثنائية</a></li>
<li><a href="/docs/ar/use-json-fields.md">دعم JSON</a></li>
<li><a href="/docs/ar/array_data_type.md">دعم المصفوفات</a></li>
<li>النص (قيد التطوير)</li>
<li>تحديد الموقع الجغرافي (قيد التطوير)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">لماذا ميلفوس؟</h3><ul>
<li><p><strong>الأداء العالي على نطاق واسع والتوافر العالي</strong></p>
<p>يتميز ميلفوس <a href="/docs/ar/architecture_overview.md">ببنية موزعة</a> تفصل بين <a href="/docs/ar/data_processing.md#Data-query">الحوسبة</a> <a href="/docs/ar/data_processing.md#Data-insertion">والتخزين</a>. يمكن لـ Milvus أن يتوسع أفقياً ويتكيف مع أنماط حركة المرور المتنوعة، ويحقق الأداء الأمثل من خلال زيادة عقد الاستعلام بشكل مستقل لأعباء العمل الثقيلة في القراءة وعقدة البيانات لأعباء العمل الثقيلة في الكتابة. تتيح الخدمات المصغرة عديمة الحالة على K8s إمكانية <a href="/docs/ar/coordinator_ha.md#Coordinator-HA">التعافي السريع</a> من الفشل، مما يضمن توافرًا عاليًا. يعمل دعم <a href="/docs/ar/replica.md">النسخ المتماثلة</a> على تعزيز تحمل الأخطاء والإنتاجية من خلال تحميل مقاطع البيانات على عقد استعلام متعددة. انظر <a href="https://zilliz.com/vector-database-benchmark-tool">المعيار</a> لمقارنة الأداء.</p></li>
<li><p><strong>دعم مختلف أنواع الفهرس المتجه وتسريع الأجهزة</strong></p>
<p>يفصل Milvus بين النظام ومحرك البحث المتجه الأساسي، مما يسمح له بدعم جميع أنواع الفهرس المتجه الرئيسية التي تم تحسينها لسيناريوهات مختلفة، بما في ذلك HNSW و IVF و FLAT (القوة الغاشمة) و SCANN و DiskANN، مع الاختلافات <a href="/docs/ar/index-explained.md">القائمة على التكميم</a> و <a href="/docs/ar/mmap.md">mmap</a>. يعمل Milvus على تحسين البحث المتجه للميزات المتقدمة مثل <a href="/docs/ar/boolean.md">تصفية البيانات الوصفية</a> <a href="/docs/ar/range-search.md">والبحث في النطاق</a>. بالإضافة إلى ذلك، يطبّق Milvus تسريع الأجهزة لتحسين أداء البحث المتجه ويدعم فهرسة وحدة معالجة الرسومات، مثل <a href="/docs/ar/gpu-cagra.md">CAGRA</a> من NVIDIA.</p></li>
<li><p><strong>مرونة تعدد الاستئجار والتخزين المرن والبارد/التخزين الساخن/البارد</strong></p>
<p>يدعم برنامج Milvus تعدد <a href="/docs/ar/multi_tenancy.md#Multi-tenancy-strategies">الاستئجار</a> من خلال العزل على مستوى قاعدة البيانات أو المجموعة أو القسم أو مفتاح القسم. وتسمح الاستراتيجيات المرنة لمجموعة واحدة بالتعامل مع مئات إلى ملايين المستأجرين، كما تضمن أداء بحث محسّن وتحكم مرن في الوصول. يعزز Milvus فعالية التكلفة مع التخزين الساخن/البارد. يمكن تخزين البيانات الساخنة التي يتم الوصول إليها بشكل متكرر في الذاكرة أو على محركات أقراص الحالة الصلبة لتحسين الأداء، بينما يتم الاحتفاظ بالبيانات الباردة الأقل وصولاً على تخزين أبطأ وأقل فعالية من حيث التكلفة. يمكن لهذه الآلية أن تقلل التكاليف بشكل كبير مع الحفاظ على الأداء العالي للمهام الحرجة.</p></li>
<li><p><strong>المتجهات المتفرقة للبحث في النص الكامل والبحث الهجين</strong></p>
<p>بالإضافة إلى البحث الدلالي من خلال المتجه الكثيف، يدعم Milvus أيضًا البحث في <a href="/docs/ar/full-text-search.md">النص الكامل</a> مع BM25 بالإضافة إلى التضمين المتناثر المتعلم مثل SPLADE وBGE-M3. يمكن للمستخدمين تخزين المتجه المتناثر والمتجه الكثيف في نفس المجموعة، وتحديد وظائف لإعادة ترتيب النتائج من طلبات بحث متعددة. انظر أمثلة على <a href="/docs/ar/full_text_search_with_milvus.md">البحث الهجين مع البحث الدلالي + البحث النصي الكامل</a>.</p></li>
<li><p><strong>أمن البيانات والتحكم في الوصول الدقيق</strong></p>
<p>يضمن Milvus أمان البيانات من خلال تنفيذ <a href="/docs/ar/authenticate.md">المصادقة الإلزامية للمستخدم،</a> <a href="/docs/ar/tls.md">وتشفير TLS،</a> والتحكم <a href="/docs/ar/rbac.md">في الوصول المستند إلى الأدوار (RBAC)</a>. تضمن مصادقة المستخدم أن المستخدمين المصرح لهم فقط الذين لديهم بيانات اعتماد صالحة يمكنهم الوصول إلى قاعدة البيانات، بينما يعمل تشفير TLS على تأمين جميع الاتصالات داخل الشبكة. بالإضافة إلى ذلك، يسمح نظام التحكم في الوصول القائم على التحكم في الوصول (RBAC) بالتحكم الدقيق في الوصول من خلال تعيين أذونات محددة للمستخدمين بناءً على أدوارهم. هذه الميزات تجعل من Milvus خيارًا قويًا وآمنًا لتطبيقات المؤسسات، مما يحمي البيانات الحساسة من الوصول غير المصرح به والانتهاكات المحتملة.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">تكاملات الذكاء الاصطناعي</h3><ul>
<li><p>تضمين تكامل النماذج تضمين النماذج تضمين النماذج تحويل البيانات غير المهيكلة إلى تمثيلها الرقمي في مساحة بيانات عالية الأبعاد بحيث يمكنك تخزينها في Milvus. في الوقت الحالي، تدمج PyMilvus، وهي مجموعة تطوير البرمجيات Python SDK، العديد من نماذج التضمين بحيث يمكنك إعداد بياناتك بسرعة إلى تضمينات متجهة. لمزيد من التفاصيل، راجع <a href="/docs/ar/embeddings.md">نظرة عامة على التضمين</a>.</p></li>
<li><p>تكامل نماذج إعادة الترتيب في مجال استرجاع المعلومات والذكاء الاصطناعي التوليدي، تُعد أداة إعادة الترتيب أداة أساسية تعمل على تحسين ترتيب النتائج من عمليات البحث الأولية. يدمج PyMilvus أيضًا العديد من نماذج إعادة الترتيب لتحسين ترتيب النتائج التي يتم إرجاعها من عمليات البحث الأولية. لمزيد من التفاصيل، ارجع إلى <a href="/docs/ar/rerankers-overview.md">نظرة عامة على أدوات إعادة الترتيب</a>.</p></li>
<li><p>تكامل أداة LangChain وغيرها من أدوات الذكاء الاصطناعي في عصر الذكاء الاصطناعي الجيني، تحظى الأدوات، مثل LangChain، باهتمام كبير من مطوري التطبيقات. وباعتباره مكونًا أساسيًا، عادةً ما يعمل Milvus كمخزن للمتجهات في مثل هذه الأدوات. للتعرف على كيفية دمج Milvus في أدوات الذكاء الاصطناعي المفضلة لديك، راجع <a href="/docs/ar/integrate_with_openai.md">عمليات التكامل</a> <a href="/docs/ar/build-rag-with-milvus.md">والبرامج التعليمية</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">الأدوات والمنظومة</h3><ul>
<li><p>Attu Attu عبارة عن واجهة مستخدم رسومية بديهية شاملة تساعدك على إدارة Milvus والبيانات التي يخزنها. لمزيد من التفاصيل، راجع مستودع <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher Birdwatcher هي أداة تصحيح أخطاء ميلفوس. باستخدامها للاتصال بـ etcd، يمكنك التحقق من حالة نظام ميلفوس الخاص بك أو تهيئته أثناء التنقل. لمزيد من التفاصيل، راجع <a href="/docs/ar/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>تكامل بروميثيوس وغرافانا Prometheus و Grafana Prometheus هي مجموعة أدوات مفتوحة المصدر لمراقبة النظام والتنبيه لـ Kubernetes. Grafana عبارة عن مكدس تصور مفتوح المصدر يمكنه الاتصال بجميع مصادر البيانات. يمكنك استخدام Promethus &amp; Grafana كمزود خدمة مراقبة لمراقبة أداء موزع ميلفوس بصريًا. لمزيد من التفاصيل، راجع <a href="/docs/ar/monitor.md">نشر خدمات المراقبة</a>.</p></li>
<li><p>النسخ الاحتياطي ميلفوس النسخ الاحتياطي Milvus Backup Milvus Backup هي أداة تسمح للمستخدمين بالنسخ الاحتياطي واستعادة بيانات ميلفوس. وهي توفر كلاً من واجهة برمجة التطبيقات CLI وواجهة برمجة التطبيقات لتتناسب مع سيناريوهات التطبيقات المختلفة. لمزيد من التفاصيل، راجع ملف <a href="/docs/ar/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>تغيير بيانات Milvus Capture Data Change (CDC) يمكن لـ Milvus-CDC التقاط ومزامنة البيانات المتزايدة في مثيلات Milvus ويضمن موثوقية بيانات الأعمال من خلال نقلها بسلاسة بين المثيلات المصدر والهدف، مما يسمح بالنسخ الاحتياطي التزايدي واستعادة البيانات في حالات الكوارث بسهولة. لمزيد من التفاصيل، راجع <a href="/docs/ar/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>موصلات Milvus Connectors خططت Milvus مجموعة من الموصلات لتتمكن من دمج Milvus بسلاسة مع أدوات الطرف الثالث، مثل Apache Spark. حاليًا، يمكنك استخدام موصل Spark Connector الخاص بنا لتغذية بيانات Milvus الخاصة بك إلى Apache Spark لمعالجة التعلم الآلي. للحصول على التفاصيل، راجع <a href="/docs/ar/integrate_with_spark.md">Spark-Milvus Connector</a>.</p></li>
<li><p>خدمات نقل المتجهات (VTS) توفر Milvus مجموعة من الأدوات لتتمكن من نقل بياناتك بين مثيل Milvus ومجموعة من مصادر البيانات، بما في ذلك مجموعات Zilliz، وElasticsearch، وPostgres (PgVector)، ومثيل Milvus آخر. لمزيد من التفاصيل، راجع <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
