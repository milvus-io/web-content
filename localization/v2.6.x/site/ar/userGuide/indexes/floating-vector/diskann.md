---
id: diskann.md
title: ديسكان
summary: >-
  في السيناريوهات واسعة النطاق، حيث يمكن أن تتضمن مجموعات البيانات مليارات أو
  حتى تريليونات من المتجهات، غالبًا ما تفشل طرق الفهرسة القياسية داخل الذاكرة
  (على سبيل المثال، HNSW و IVF_FLAT) في مواكبة ذلك بسبب قيود الذاكرة. يقدم
  DISKANN نهجًا قائمًا على الأقراص يعالج هذه التحديات من خلال الحفاظ على دقة
  وسرعة بحث عالية عندما يتجاوز حجم مجموعة البيانات ذاكرة الوصول العشوائي
  المتاحة.
---
<h1 id="DISKANN" class="common-anchor-header">ديسكان<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>في السيناريوهات واسعة النطاق، حيث يمكن أن تتضمن مجموعات البيانات مليارات أو حتى تريليونات من المتجهات، غالبًا ما تفشل طرق الفهرسة القياسية داخل الذاكرة (مثل <a href="/docs/ar/hnsw.md">HNSW</a> و <a href="/docs/ar/ivf-flat.md">IVF_FLAT</a>) في مواكبة ذلك بسبب قيود الذاكرة. يقدم <strong>DISKANN</strong> نهجًا قائمًا على الأقراص يعالج هذه التحديات من خلال الحفاظ على دقة وسرعة بحث عالية عندما يتجاوز حجم مجموعة البيانات ذاكرة الوصول العشوائي المتاحة.</p>
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
    </button></h2><p>يجمع<strong>DISKANN</strong> بين تقنيتين رئيسيتين للبحث المتجه الفعال:</p>
<ul>
<li><p><strong>الرسم البياني Vamana Graph</strong> - فهرس <strong>قائم على القرص</strong> <strong>قائم على الرسم البياني</strong> يربط بين نقاط البيانات (أو المتجهات) للتنقل الفعال أثناء البحث.</p></li>
<li><p><strong>تكميم المنتج (PQ)</strong> - طريقة ضغط <strong>في الذاكرة</strong> تقلل من حجم المتجهات، مما يتيح إجراء حسابات تقريبية سريعة للمسافة بين المتجهات.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">بناء الفهرس</h3><h4 id="Vamana-graph" class="common-anchor-header">الرسم البياني فامانا</h4><p>يُعدّ الرسم البياني Vamana محوريًا في استراتيجية DISKANN القائمة على القرص. ويمكنه التعامل مع مجموعات بيانات كبيرة جدًا لأنه لا يحتاج إلى التواجد بشكل كامل في الذاكرة أثناء الإنشاء أو بعده.</p>
<p>يوضح الشكل التالي كيف يتم بناء الرسم البياني لـ Vamana.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>ديسكان</span> </span></p>
<ol>
<li><p><strong>الاتصالات العشوائية الأولية:</strong> يتم تمثيل كل نقطة بيانات (متجه) كعقدة في الرسم البياني. يتم توصيل هذه العقد في البداية بشكل عشوائي، مما يشكل شبكة كثيفة. وعادةً ما تبدأ العقدة بحوالي 500 حافة (أو وصلات) للاتصال الواسع.</p></li>
<li><p><strong>التنقيح من أجل الكفاءة:</strong> يخضع الرسم البياني العشوائي الأولي لعملية تحسين لجعله أكثر كفاءة للبحث. ويتضمن ذلك خطوتين رئيسيتين:</p>
<ul>
<li><p><strong>تشذيب الحواف الزائدة عن الحاجة:</strong> تتجاهل الخوارزمية الاتصالات غير الضرورية بناءً على المسافات بين العقد. تعطي هذه الخطوة الأولوية للحواف الأعلى جودة.</p>
<p>تقيد المعلمة <code translate="no">max_degree</code> الحد الأقصى لعدد الحواف لكل عقدة. يؤدي ارتفاع <code translate="no">max_degree</code> إلى رسم بياني أكثر كثافة، مما قد يؤدي إلى العثور على المزيد من الجيران ذوي الصلة (استدعاء أعلى) ولكن أيضًا زيادة استخدام الذاكرة ووقت البحث.</p></li>
<li><p><strong>إضافة اختصارات استراتيجية:</strong> يقدم Vamana حوافًا بعيدة المدى، تربط بين نقاط البيانات المتباعدة في فضاء المتجه. تسمح هذه الاختصارات لعمليات البحث بالقفز بسرعة عبر الرسم البياني، متجاوزةً العقد الوسيطة ومسرّعةً عملية التنقل بشكل كبير.</p>
<p>تحدد المعلمة <code translate="no">search_list_size</code> اتساع عملية تنقيح الرسم البياني. يؤدي ارتفاع <code translate="no">search_list_size</code> إلى توسيع نطاق البحث عن الجيران أثناء الإنشاء ويمكن أن يحسّن الدقة النهائية، ولكنه يزيد من وقت بناء الفهرس.</p></li>
</ul></li>
</ol>
<p>لمعرفة المزيد حول ضبط <a href="/docs/ar/diskann.md#diskann-params">البارامترات، راجع بارامترات DISKANN</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>يستخدم DISKANN <strong>PQ</strong> لضغط المتجهات عالية الأبعاد إلى تمثيلات أصغر<strong>(رموز PQ</strong>)، والتي يتم تخزينها في الذاكرة لإجراء حسابات المسافة التقريبية السريعة.</p>
<p>تدير المعلمة <code translate="no">pq_code_budget_gb_ratio</code> بصمة الذاكرة المخصصة لتخزين رموز PQ هذه. وهي تمثل النسبة بين الحجم الإجمالي للمتجهات (بالجيجابايت) والمساحة المخصصة لتخزين رموز PQ. يمكنك حساب ميزانية رمز PQ الفعلية (بالجيجابايت) باستخدام هذه الصيغة:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>حيث</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> هو الحجم الإجمالي للمتجهات (بالجيجابايت).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> هي نسبة يحددها المستخدم، تمثل جزءًا من إجمالي حجم البيانات المحجوزة لرموز PQ. تسمح هذه المعلمة بالمفاضلة بين دقة البحث وموارد الذاكرة. لمزيد من المعلومات حول ضبط المعلمة، راجع <a href="/docs/ar/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">تكوينات DISKANN</a>.</p></li>
</ul>
<p>للحصول على التفاصيل الفنية حول طريقة PQ الأساسية، راجع <a href="/docs/ar/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">عملية البحث</h3><p>بمجرد إنشاء الفهرس (الرسم البياني Vamana على القرص ورموز PQ في الذاكرة)، يقوم DISKANN بإجراء عمليات بحث ANN على النحو التالي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>ديسكان 2</span> </span></p>
<ol>
<li><p><strong>الاستعلام ونقطة الدخول:</strong> يتم توفير متجه استعلام لتحديد موقع أقرب جيرانه. يبدأ DISKANN من نقطة دخول مختارة في الرسم البياني لـ Vamana، وغالبًا ما تكون عقدة بالقرب من النقطة المركزية العالمية لمجموعة البيانات. يمثّل المتجه المركزي العالمي متوسط جميع المتجهات، مما يساعد على تقليل مسافة العبور عبر الرسم البياني للعثور على الجيران المطلوبين.</p></li>
<li><p><strong>استكشاف الجوار:</strong> تجمع الخوارزمية الجيران المرشحين المحتملين (دوائر باللون الأحمر في الشكل) من حواف العقدة الحالية، مستفيدةً من رموز PQ في الذاكرة لتقريب المسافات بين هؤلاء المرشحين ومتجه الاستعلام. هؤلاء الجيران المرشحون المحتملون هم العقد المتصلة مباشرةً بنقطة الدخول المحددة من خلال الحواف في الرسم البياني ل Vamana.</p></li>
<li><p><strong>اختيار العقد لحساب المسافة بدقة:</strong> من النتائج التقريبية، يتم اختيار مجموعة فرعية من الجيران الواعدين (الدوائر باللون الأخضر في الشكل) لإجراء تقييمات دقيقة للمسافة باستخدام متجهاتهم الأصلية غير المضغوطة. يتطلب ذلك قراءة البيانات من القرص، وهو ما قد يستغرق وقتًا طويلاً. يستخدم DISKANN معلمتين للتحكم في هذا التوازن الدقيق بين الدقة والسرعة:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: الحصة التي تتحكم في اتساع نطاق البحث، وتحدد عدد الجيران المرشحين الذين يتم اختيارهم بالتوازي لاستكشاف جيرانهم. يؤدي وجود <code translate="no">beam_width_ratio</code> أكبر إلى استكشاف أوسع، مما قد يؤدي إلى دقة أعلى ولكن أيضًا زيادة التكلفة الحسابية وإدخال/إخراج القرص. يتم تحديد عرض الشعاع، أو عدد العقد المختارة، باستخدام المعادلة: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: نسبة الذاكرة المخصصة للتخزين المؤقت لبيانات القرص التي يتم الوصول إليها بشكل متكرر. يساعد هذا التخزين المؤقت على تقليل عمليات الإدخال/الإخراج من القرص إلى الحد الأدنى، مما يجعل عمليات البحث المتكررة أسرع لأن البيانات موجودة بالفعل في الذاكرة.</p></li>
</ul>
<p>لمعرفة المزيد حول ضبط المعلمات، راجع <a href="/docs/ar/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">تكوينات DISKANN</a>.</p></li>
<li><p><strong>الاستكشاف التكراري:</strong> يقوم البحث بشكل متكرر بتنقيح مجموعة المرشحين بشكل متكرر، مع إجراء تقييمات تقريبية (باستخدام PQ) بشكل متكرر متبوعة بفحوصات دقيقة (باستخدام المتجهات الأصلية من القرص) حتى يتم العثور على عدد كافٍ من الجيران.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">تمكين DISKANN في ميلفوس<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>بشكل افتراضي، يتم تعطيل <strong>DISKANN</strong> في Milvus لإعطاء الأولوية لسرعة الفهارس داخل الذاكرة لمجموعات البيانات التي تتناسب بشكل مريح مع ذاكرة الوصول العشوائي. ومع ذلك، إذا كنت تعمل مع مجموعات بيانات ضخمة أو ترغب في الاستفادة من قابلية <strong>DISKANN</strong> للتوسع وتحسين SSD، يمكنك تمكينه بسهولة.</p>
<p>إليك كيفية تمكين DISKANN في ميلفوس:</p>
<ol>
<li><p><strong>تحديث ملف تهيئة ميلفوس</strong></p>
<ol>
<li><p>حدد موقع ملف تكوين Milvus الخاص بك<strong>.</strong> (راجع وثائق Milvus حول التكوين للحصول على تفاصيل حول العثور على هذا الملف).</p></li>
<li><p>ابحث عن المعلمة <code translate="no">queryNode.enableDisk</code> وقم بتعيين قيمتها إلى <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>تحسين التخزين لـ DISKANN</strong></p></li>
</ol>
<p>لضمان أفضل أداء مع DISKANN، يوصى بتخزين بيانات Milvus على محرك أقراص NVMe SSD سريع. إليك كيفية القيام بذلك لكل من عمليات نشر Milvus Standalone و Cluster:</p>
<ul>
<li><p><strong>ميلفوس مستقل</strong></p>
<ul>
<li><p>قم بتركيب دليل بيانات Milvus على قرص NVMe SSD داخل حاوية Milvus. يمكنك القيام بذلك في الملف <code translate="no">docker-compose.yml</code> أو باستخدام أدوات إدارة الحاويات الأخرى.</p></li>
<li><p>على سبيل المثال، إذا تم تركيب قرص NVMe SSD الخاص بك على <code translate="no">/mnt/nvme</code> ، يمكنك تحديث قسم <code translate="no">volumes</code>من <code translate="no">docker-compose.yml</code> الخاص بك على هذا النحو:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>مجموعة ميلفوس العنقودية</strong></p>
<ul>
<li><p>قم بتحميل دليل بيانات Milvus على محرك أقراص NVMe SSD في كل من حاويات QueryNode و IndexNode. يمكنك تحقيق ذلك من خلال إعداد تزامن الحاوية الخاصة بك.</p></li>
<li><p>من خلال تركيب البيانات على محرك أقراص NVMe SSD في كلا النوعين من العقد، فإنك تضمن سرعات قراءة وكتابة عالية لكل من عمليات البحث والفهرسة.</p></li>
</ul></li>
</ul>
<p>بمجرد إجراء هذه التغييرات، قم بإعادة تشغيل مثيل Milvus الخاص بك حتى تدخل الإعدادات حيز التنفيذ. الآن، ستستفيد Milvus من إمكانيات DISKANN للتعامل مع مجموعات البيانات الكبيرة، مما يوفر بحثًا متجهًا فعالاً وقابلاً للتطوير.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">تكوين DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن تكوين معلمات DISKANN باستخدام طريقتين أساسيتين:</p>
<ul>
<li><p><strong>ملف تكوين Milvus:</strong> ضبط معلمات DISKANN من خلال ملف تكوين Milvus. هذه الطريقة مناسبة لتعيين خيارات التكوين العامة لمثيل Milvus الخاص بك.</p></li>
<li><p><strong>Milvus SDK:</strong> قم بضبط معلمات DISKANN بدقة باستخدام Milvus SDK أثناء إنشاء الفهرس أو عمليات البحث. يتيح ذلك المزيد من التحكم الدقيق وتعديلات المعلمات الديناميكية بناءً على حالات استخدام محددة.</p></li>
</ul>
<div class="alert note">
<p>يتجاوز التكوين الذي يتم إجراؤه بواسطة SDK أي إعدادات محددة في ملف التكوين، مما يوفر المرونة والتحكم لتطبيقات ومجموعات بيانات محددة.</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">ملف تكوين Milvus</h3><p>فيما يلي مثال على كيفية تعيين معلمات DISKANN في ملف <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">تكوين SDK</h3><p>فيما يلي مثال على كيفية تعيين معلمات DISKANN باستخدام Milvus SDK.</p>
<h4 id="Build" class="common-anchor-header">إنشاء</h4><p>لإنشاء فهرس <code translate="no">IVF_FLAT</code> على حقل متجه في ملف ميلفوس، استخدم الطريقة <code translate="no">add_index()</code> ، مع تحديد <code translate="no">index_type</code> و <code translate="no">metric_type</code> والمعلمات الإضافية للفهرس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>وبمجرد تكوين معلمات الفهرس، يمكنك إنشاء الفهرس باستخدام الأسلوب <code translate="no">create_index()</code> مباشرةً أو تمرير بارامترات الفهرس في الأسلوب <code translate="no">create_collection</code>. لمزيد من التفاصيل، راجع <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a>.</p>
<h4 id="Search" class="common-anchor-header">البحث</h4><p>بمجرد إنشاء الفهرس وإدراج الكيانات، يمكنك إجراء عمليات بحث التشابه على الفهرس.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="DISKANN-params" class="common-anchor-header">بارامزات DISKANN<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>يسمح لك الضبط الدقيق لمعلمات DISKKANN بتكييف سلوكها مع مجموعة البيانات الخاصة بك وعبء عمل البحث، وتحقيق التوازن الصحيح بين السرعة والدقة واستخدام الذاكرة.</p>
<h3 id="Index-building-params" class="common-anchor-header">بارامترات بناء الفهرس</h3><p>تؤثر هذه المعلمات على كيفية إنشاء فهرس DISKANN. يمكن أن يؤثر تعديلها على حجم الفهرس ووقت الإنشاء وجودة البحث.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>فامانا</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>يتحكم في الحد الأقصى لعدد الاتصالات (الحواف) التي يمكن أن تحتويها كل نقطة بيانات في الرسم البياني فامانا.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1, 512]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">56</code></p></td>
     <td><p>تنشئ القيم الأعلى رسومات بيانية أكثر كثافة، مما قد يزيد من الاستدعاء (العثور على المزيد من النتائج ذات الصلة) ولكن أيضًا يزيد من استخدام الذاكرة ووقت الإنشاء. 
 في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>يحدد عدد الجيران المرشحين الذين تم أخذهم في الاعتبار لكل نقطة بيانات أثناء إنشاء الرسم البياني.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح <strong>المدى</strong>: [1، <em>int_max</em>]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">100</code></p></td>
     <td><p>تؤدي القيم الأكبر إلى رسوم بيانية أكثر شمولاً، مما قد يحسن من جودة البحث ولكن أيضًا يزيد من وقت الإنشاء. 
 في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [K, 10K].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>يتحكم في مقدار الذاكرة المخصصة للتخزين المؤقت للأجزاء التي يتم الوصول إليها بشكل متكرر من الرسم البياني أثناء إنشاء الفهرس.</p></td>
     <td><p><strong>النوع</strong>: عائم <strong>المدى</strong>: [0.0, 0.3)</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">0.10</code></p></td>
     <td><p>تؤدي القيمة الأعلى إلى تخصيص ذاكرة أكبر للتخزين المؤقت، مما يقلل بشكل كبير من إدخال/إخراج القرص ولكن يستهلك المزيد من ذاكرة النظام. تستخدم القيمة المنخفضة ذاكرة أقل للتخزين المؤقت، مما قد يزيد من الحاجة إلى الوصول إلى القرص. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>يتحكم في حجم رموز PQ (تمثيلات مضغوطة لنقاط البيانات) مقارنة بحجم البيانات غير المضغوطة.</p></td>
     <td><p><strong>النوع</strong>: عائم <strong>النطاق</strong>: (0.0، 0.25]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">0.125</code></p></td>
     <td><p>تؤدي النسبة الأعلى إلى نتائج بحث أكثر دقة من خلال تخصيص نسبة أكبر من الذاكرة لرموز PQ، مما يؤدي فعليًا إلى تخزين المزيد من المعلومات حول المتجهات الأصلية. ومع ذلك، يتطلب ذلك ذاكرة أكبر، مما يحد من القدرة على التعامل مع مجموعات البيانات الكبيرة. تقلل النسبة الأقل من استخدام الذاكرة ولكن من المحتمل أن تضحي بالدقة، حيث تحتفظ رموز PQ الأصغر بمعلومات أقل. هذا النهج مناسب للسيناريوهات التي تكون فيها قيود الذاكرة مصدر قلق، مما قد يتيح فهرسة مجموعات بيانات أكبر.</p>
<p>في معظم الحالات، نوصيك بتعيين قيمة ضمن هذا النطاق: (0.0625، 0.25]</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>تؤثر هذه المعلمات على كيفية إجراء DISKANN لعمليات البحث. يمكن أن يؤثر ضبطها على سرعة البحث، والكمون واستخدام الموارد.</p>
<table>
   <tr>
     <th></th>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p>فامانا</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>يتحكم في درجة التوازي أثناء البحث من خلال تحديد الحد الأقصى لعدد طلبات الإدخال/الإخراج المتوازي للقرص بالنسبة لعدد أنوية وحدة المعالجة المركزية المتوفرة.</p></td>
     <td><p><strong>النوع</strong>: <strong>نطاق</strong> عائم: [1، الحد الأقصى (128/رقم وحدة المعالجة المركزية، 16)]</p>
<p><strong>القيمة الافتراضية</strong>: <code translate="no">4.0</code></p></td>
     <td><p>تعمل القيم الأعلى على زيادة التوازي، مما قد يؤدي إلى تسريع البحث على الأنظمة ذات وحدات المعالجة المركزية القوية ومحركات أقراص الحالة الصلبة. ومع ذلك، قد يؤدي تعيينها أعلى من اللازم إلى تنافس مفرط على الموارد. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [1.0, 4.0].</p></td>
   </tr>
</table>
