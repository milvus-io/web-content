---
id: search_with_svs_vamana.md
summary: >-
  يمكنك إنشاء فهرسات الرسوم البيانية SVS Vamana في الذاكرة والبحث فيها في Milvus
  من خلال ميزة تمرير الفهرس FAISS، مع إمكانية استخدام ضغط LeanVec أو LVQ
  اختياريًّا على معالجات Intel.
title: البحث باستخدام SVS Vamana و Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">البحث باستخدام SVS Vamana و Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) هي مكتبة البحث المتجه عالي الأداء من Intel التي تطبق خوارزمية Vamana للرسوم البيانية. في Milvus، يمكنك الوصول إلى SVS Vamana من خلال <a href="https://milvus.io/docs/faiss.md">تمرير فهرس FAISS</a>: اضبط <code translate="no">index_type</code> على <code translate="no">FAISS</code> وقم بتوفير سلسلة مصنع الفهرس <code translate="no">SVSVamana</code> ، وسيقوم Milvus بإنشاء الفهرس والبحث فيه من خلال تكامل SVS مع Faiss.</p>
<p>Vamana هي بنية الرسم البياني التي يستخدمها <a href="https://milvus.io/docs/diskann.md">DISKANN</a> أيضًا، لكن SVS Vamana يحتفظ بالرسم البياني بأكمله في الذاكرة. كما يمكنه ضغط المتجهات باستخدام <strong>LeanVec</strong> أو <strong>LVQ،</strong> مما يقلل من استخدام الذاكرة ويسرع عملية البحث مع الحفاظ على معدل استرجاع عالٍ جدًّا.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 أو أحدث، تم بناؤه من المصدر مع تمكين SVS</li>
<li>PyMilvus 3.0.0 أو أحدث</li>
<li>معالج Intel CPU إذا كنت تستخدم تخزين <code translate="no">LVQ*</code> أو <code translate="no">LeanVec*</code> ؛ أما التخزين <code translate="no">FP32</code> و <code translate="no">FP16</code> و <code translate="no">SQ8</code> فيعمل على أي منصة</li>
<li>الإلمام <a href="https://milvus.io/docs/faiss.md">بسلاسل مصانع الفهرسة</a> في <a href="https://milvus.io/docs/faiss.md">FAISS</a></li>
</ul>
<div class="alert note">
<p>لا يتم تضمين SVS في الإصدار الافتراضي لـ Milvus. لاستخدام مصانع <code translate="no">SVSVamana</code> ، قم ببناء Milvus من المصدر باستخدام <code translate="no">make USE_SVS=ON</code>. في الإصدار الذي لا يحتوي على SVS، يفشل بناء الفهرس لأن Faiss لا يتعرف على سلسلة المصنع.</p>
</div>
<p>يعمل ضغط LVQ و LeanVec فقط على معالجات Intel، ويعملان بشكل أسرع على المعالجات المزودة بـ AVX-512. على المعالجات الأخرى، يفشل إنشاء الفهرس لسلسلتَي مصانع <code translate="no">LVQ*</code> و <code translate="no">LeanVec*</code>.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">كيف يعمل SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">رسم بياني لـ Vamana<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>يقوم SVS Vamana ببناء مخطط قرب أحادي الطبقة. يمثل كل متجه عقدة، وتربط الحواف المتجهات التي من المرجح أن تكون جيرانًا قريبين. لبناء المخطط، يقوم SVS بما يلي لكل عقدة <strong>x</strong>:</p>
<ol>
<li><p><strong>البحث الجشع</strong>: يبحث SVS في الرسم البياني الذي تم إنشاؤه حتى الآن، مع الاحتفاظ بقائمة مرشحة بحجم <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>تقليم الجيران</strong>: تصبح العقد التي تمت زيارتها جيرانًا مرشحين لـ <strong>x</strong>. ويأخذها SVS في الاعتبار بترتيب المسافة المتزايدة عن <strong>x</strong>. يتم تخطي المرشح <code translate="no">c</code> إذا كان هناك جار أقرب <code translate="no">n</code> تم الاحتفاظ به بالفعل ويستوفي الشرط <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. وهذا يحافظ على الحواف بعيدة المدى ويستبعد الحواف قصيرة المدى الزائدة عن الحاجة، بحيث يمكن للبحث القفز عبر الرسم البياني بدلاً من التحرك خلاله جارًا أقرب واحدًا تلو الآخر. يتوقف الاستبعاد بمجرد الوصول إلى درجة الرسم البياني.</p></li>
<li><p><strong>الحواف العكسية</strong>: لكل جار جديد لـ <strong>x</strong>، يضيف SVS حافة عكسية تعود إلى <strong>x</strong> ويقوم بتقليص قائمة حواف ذلك الجار إذا تجاوزت درجة الرسم البياني.</p></li>
</ol>
<p>يتم إجراء عملية «التشذيب» على مرحلتين: أولًا باستخدام « <code translate="no">alpha = 1</code> »، ثم باستخدام « <code translate="no">alpha</code> » المُعدَّة مسبقًا. تؤدي درجة الرسم البياني الأكبر و« <code translate="no">construction_window_size</code> » إلى إنتاج رسم بياني أكثر كثافة وأعلى جودة، لكنهما يستهلكان ذاكرة أكبر ويستغرقان وقتًا أطول في الإنشاء.</p>
<p>في وقت البحث، يتجول SVS في الرسم البياني بطريقة جشعة، مع الاحتفاظ بـ <code translate="no">search_window_size</code> بأقرب المرشحين الذين تمت رؤيتهم حتى الآن. ويستكشف دائمًا أقرب مرشح لم تتم زيارته بعد. ينتهي البحث بمجرد أن يصبح كل جار للعقدة الحالية أبعد عن الاستعلام من أسوأ مرشح في النافذة. يؤدي استخدام <code translate="no">search_window_size</code> أكبر إلى استكشاف المزيد من الرسم البياني، مما يرفع معدل الاسترجاع ولكنه يزيد أيضًا من زمن الاستجابة.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">ضغط LeanVec<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>يقلل<a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> من عدد الأبعاد لكل متجه وعدد البتات لكل بُعد. يحتفظ فهرس LeanVec بتمثيلين لكل متجه:</p>
<ul>
<li><p><strong>الأساسي (الأبعاد المخفضة)</strong>: إسقاط خطي للمتجه إلى عدد أقل من الأبعاد. يتم إجراء البحث في الرسم البياني على مجموعة البيانات الأساسية هذه، لذا تتم معظم حسابات المسافة في الفضاء ذي الأبعاد الأقل. وهذا يقلل من متطلبات الحوسبة وعرض النطاق الترددي للذاكرة. بشكل افتراضي، تكون الأبعاد المخفضة نصف الأبعاد الأصلية (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>ثانوي (الأبعاد الكاملة)</strong>: المتجه بأبعاده الأصلية. يقوم SVS بإعادة ترتيب المرشحين الذين تم إرجاعهم بواسطة البحث الأولي في الرسم البياني مقابل مجموعة البيانات الثانوية هذه لاستعادة الدقة المفقودة بسبب تقليل الأبعاد.</p></li>
</ul>
<p>يتم تكمية كلا التمثيلين باستخدام <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (تكمية المتجهات المتكيفة محليًا). يحدد مكون التخزين في السلسلة الافتراضية طريقة الترميز. على سبيل المثال، يستخدم <code translate="no">LeanVec4x8</code> 4 بت لكل بُعد لمجموعة البيانات الأولية و8 بت لكل بُعد لمجموعة البيانات الثانوية. حتى خطوة إعادة الترتيب لا تقرأ أبدًا متجهًا بدقة كاملة.</p>
<p>بشكل افتراضي، يتعلم LeanVec إسقاطات منفصلة للمتجهات المفهرسة وللاستعلامات، لدعم الاستعلامات التي تأتي من توزيع مختلف عن المتجهات المفهرسة (خارج التوزيع، أو OOD). يعمل هذا بشكل جيد بشكل خاص مع أحمال العمل متعددة الوسائط مثل استرجاع النص إلى صورة، كما يعمل بشكل جيد أيضًا عندما تأتي الاستعلامات من نفس التوزيع الذي تنتمي إليه المتجهات المفهرسة. لا يدعم Milvus حتى الآن طريقة لتمرير الاستعلامات لحساب الإسقاطات، لذا يتم استخدام المتجهات الأساسية فقط حاليًا. يزيد تدريب OOD من وقت البناء. للبناء بشكل أسرع مع بعض التضحية بأداء الاستعلام، اضبط « <code translate="no">ood_training</code> » على « <code translate="no">False</code> ».</p>
<h3 id="LVQ-compression" class="common-anchor-header">ضغط LVQ<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة لمجموعات البيانات التي تحتوي على أقل من 512 بُعدًا تقريبًا، قد يكون تخطي عملية تقليل الأبعاد والضغط باستخدام تكمية LVQ فقط خيارًا أفضل. مثل LeanVec، يحتفظ فهرس LVQ بتمثيل أساسي للبحث السريع وتمثيل متبقي لإعادة الترتيب. على سبيل المثال، يستخدم <code translate="no">LVQ4x4</code> 4 بتات للتمثيل الأساسي و4 بتات للتمثيل المتبقي. يتخطى كل من <code translate="no">LVQ4x0</code> و <code translate="no">LVQ8x0</code> عملية إعادة الترتيب، مما يسرع الاستعلامات إذا كانت نسبة الاسترجاع (recall) جيدة بما يكفي لحمل العمل الخاص بك.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">اختر سلسلة مصنع<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>تتخذ سلاسل المصنع في SVS Vamana الشكل <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code> ، حيث يمثل <code translate="no">&lt;degree&gt;</code> الحد الأقصى لعدد الحواف لكل عقدة في الرسم البياني.</p>
<table>
<thead>
<tr><th>سلسلة المصنع</th><th>التخزين</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>متجهات غير مضغوطة.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>أرقام عائمة 16 بت</td><td>نصف سعة ذاكرة المتجهات في <code translate="no">FP32</code> ، مع الحد الأدنى من فقدان الدقة.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>تكمية القيم العددية ذات 8 بت</td><td>ربع سعة ذاكرة المتجهات في <code translate="no">FP32</code>.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>، <code translate="no">LVQ8x0</code></td><td>LVQ أساسي، بدون بقايا</td><td>معالجات Intel فقط. بدون إعادة ترتيب.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>، <code translate="no">LVQ4x8</code></td><td>LVQ أساسي ومتبقي</td><td>معالجات Intel فقط.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>، <code translate="no">LeanVec4x8</code> ، <code translate="no">LeanVec8x8</code></td><td>LeanVec الأساسي والثانوي</td><td>معالجات Intel فقط. أضف اللاحقة <code translate="no">_&lt;dim&gt;</code> لتعيين الأبعاد المخفضة. على سبيل المثال، <code translate="no">LeanVec4x8_128</code> يقلل مجموعة البيانات الأساسية إلى 128 بُعدًا. بدون اللاحقة، تكون الأبعاد المخفضة هي <code translate="no">dim / 2</code>.</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> تعد نقطة انطلاق جيدة. ومن هناك:</p>
<ul>
<li><p>للحصول على <strong>نسبة استرجاع أعلى</strong> مع بعض التكلفة على الذاكرة، قم بزيادة أبعاد LeanVec باستخدام اللاحقة <code translate="no">_&lt;dim&gt;</code>.</p></li>
<li><p>للحصول على <strong>حجم أصغر</strong> على حساب بعض الاسترجاع، قم بتقليل أبعاد LeanVec.</p></li>
<li><p>بالنسبة للمتجهات منخفضة الأبعاد، جرب <code translate="no">LVQ8</code>.</p></li>
<li><p><strong>على وحدات المعالجة المركزية (CPU) غير التابعة لشركة Intel،</strong> استخدم <code translate="no">FP16</code> أو <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">إنشاء الفهرس<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنشئ المثال التالي فهرس SVS Vamana بدرجة رسم بياني تبلغ 64 وباستخدام ضغط LeanVec. قم بتوسيع كتلة الإعداد وتشغيلها قبل إنشاء الفهرس.</p>
<p><details></p>
<p><summary>تحضير المجموعة</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>اضبط <code translate="no">index_type</code> على <code translate="no">FAISS</code> ، واستخدم <code translate="no">faiss_index_name</code> لتحديد وصفة SVS Vamana.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">البحث في الفهرس<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> يتحكم في التوازن بين الاسترجاع وزمن الاستجابة، كما يفعل <code translate="no">ef</code> بالنسبة لـ <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. اضبط <code translate="no">search_buffer_capacity</code> على نفس القيمة على الأقل. القيمة الافتراضية للفهرس لكليهما هي 10، ويرفض SVS أي بحث يكون فيه <code translate="no">search_window_size</code> أكبر من <code translate="no">search_buffer_capacity</code>.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>إذا كانت قيمة <code translate="no">limit</code> أكبر من <code translate="no">search_window_size</code> ، فإن SVS يرفع النافذة إلى <code translate="no">limit</code> لهذا البحث.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">معلمات SVS Vamana<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>توضع معلمات البناء التالية في <code translate="no">params</code> في <code translate="no">add_index()</code> ، بجوار <code translate="no">faiss_index_name</code>. لا يمكنك تغييرها بعد إنشاء الفهرس.</p>
<table>
<thead>
<tr><th>المعلمة</th><th>القيمة الافتراضية</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>حجم قائمة المرشحين المستخدمة للعثور على جيران كل عقدة أثناء إنشاء الرسم البياني. تؤدي القيم الأكبر إلى تحسين جودة الرسم البياني ومعدل الاسترجاع، ولكنها تستغرق وقتًا أطول في الإنشاء. اضبطها على درجة الرسم البياني على الأقل. 200 هو الخيار الشائع.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> بالنسبة لـ <code translate="no">L2</code> ، <code translate="no">0.95</code> بالنسبة لـ <code translate="no">IP</code> و <code translate="no">COSINE</code></td><td>قوة التقليم. القيم البعيدة عن 1 تقوم بالتقليم بشكل أكثر قوة، مفضلة الحواف بعيدة المدى على الحواف قصيرة المدى الزائدة عن الحاجة. استخدم قيمًا أعلى من 1 لـ <code translate="no">L2</code> وقيمًا أقل من 1 لـ <code translate="no">IP</code> و <code translate="no">COSINE</code>. احتفظ بالإعداد الافتراضي ما لم تكن قد قمت بقياس قيمة أفضل على بياناتك.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>الدرجة في السلسلة الافتراضية أو <code translate="no">32</code></td><td>العدد الأقصى للحواف لكل عقدة. يتجاوز الدرجة المحددة في السلسلة الافتراضية. القيم في النطاق [32، 128] تناسب معظم أحمال العمل. القيم الأعلى يمكن أن ترفع معدل الاسترجاع ولكنها تستهلك ذاكرة أكبر وتستغرق وقتًا أطول في الإنشاء.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>درجة الرسم البياني ناقص 4</td><td>عدد الحواف التي تحتفظ بها العقدة بعد عملية التقليم بمجرد تجاوزها درجة الرسم البياني.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>الحد الأقصى لعدد المرشحين الذين يتم أخذهم في الاعتبار عند تقليم جيران العقدة. يجب أن يكون أكبر من <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>ما إذا كان عملية التقليم تأخذ في الاعتبار كل العقد التي تمت زيارتها أثناء البحث عن البناء، وليس فقط المرشحين النهائيين.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> لاحقة سلسلة المصنع أو <code translate="no">dim / 2</code></td><td>LeanVec فقط. الأبعاد المخفضة لمجموعة البيانات الأساسية. يتجاوز لاحقة السلسلة الافتراضية. القيم الأصغر تقلل من استخدام الذاكرة وتسرع البحث في الرسم البياني، لكنها تقلل من معدل الاسترجاع.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> بالنسبة لـ LeanVec</td><td>LeanVec فقط. ما إذا كان سيتم تعلم إسقاطات منفصلة للمتجهات والاستعلامات المفهرسة. اضبط <code translate="no">False</code> لبناء أسرع. يؤدي ضبط <code translate="no">True</code> لأي مصنع بخلاف LeanVec إلى الفشل.</td></tr>
</tbody>
</table>
<p>تُدرج معلمات البحث التالية في <code translate="no">search_params.params</code>. يمكنك أيضًا تعيينها كمعلمات إنشاء، مما يغير الإعدادات الافتراضية التي يستخدمها الفهرس لعمليات البحث التي لم يتم تعيينها فيها.</p>
<table>
<thead>
<tr><th>المعلمة</th><th>القيمة الافتراضية</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>عدد المرشحين الأقرب الذين يتم الاحتفاظ بهم أثناء اجتياز الرسم البياني. تؤدي القيم الأكبر إلى زيادة معدل الاسترجاع وزيادة زمن الاستجابة.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>سعة مخزن البحث المؤقت. يجب أن تكون أكبر من أو تساوي <code translate="no">search_window_size</code>. في معظم الحالات، اضبطها لتساوي <code translate="no">search_window_size</code>. بالنسبة لـ LeanVec، جرب 1.5 ضعف <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">مزيد من المعلومات<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>اقرأ مرجع <a href="https://milvus.io/docs/faiss.md">تمرير فهرس FAISS</a> للاطلاع على العقد العام لسلسلة المصنع، والحدود، ومعالجة الأخطاء.</li>
<li>قارن ذلك بتنفيذ Vamana على القرص في <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>راجع <a href="https://github.com/intel/ScalableVectorSearch">مستودع SVS</a> للحصول على تفاصيل البناء، وضبط الأداء، وواجهة برمجة التطبيقات (API) الأساسية بلغة C++.</li>
</ul>
