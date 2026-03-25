---
id: metric.md
summary: >-
  يدعم Milvus مجموعة متنوعة من مقاييس التشابه، بما في ذلك المسافة الإقليدية
  والمنتج الداخلي وجاكارد وغيرها.
title: مقاييس التشابه
---
<h1 id="Similarity-Metrics" class="common-anchor-header">مقاييس التشابه<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>في ميلفوس، تُستخدم مقاييس التشابه لقياس أوجه التشابه بين المتجهات. يساعد اختيار مقياس مسافة جيد في تحسين أداء التصنيف والتجميع بشكل كبير.</p>
<p>يوضح الجدول التالي كيفية ملاءمة مقاييس التشابه المستخدمة على نطاق واسع مع مختلف أشكال البيانات المدخلة وفهارس ملفوس. يدعم Milvus حاليًا أنواعًا مختلفة من البيانات، بما في ذلك تضمينات النقطة العائمة (المعروفة غالبًا باسم متجهات النقطة العائمة أو المتجهات الكثيفة)، والتضمينات الثنائية (المعروفة أيضًا باسم المتجهات الثنائية)، والتضمينات المتفرقة (المعروفة أيضًا باسم المتجهات المتفرقة).</p>
<div class="filter">
 <a href="#floating">تضمينات النقطة العائمة التضمينات</a> <a href="#binary">الثنائية التضمينات الثنائية</a> <a href="#sparse">التضمينات المتفرقة</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">الأنواع المترية</th>
    <th class="tg-0pky">أنواع الفهرس</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>المسافة الإقليدية (L2)</li><li>الضرب الداخلي (IP)</li><li>تشابه جيب التمام (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>مسطح</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">أنواع المقاييس</th>
    <th class="tg-0pky">أنواع الفهرس</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>جاكارد</li><li>هامينغ</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">الأنواع المترية</th>
    <th class="tg-0pky">أنواع الفهرس</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>الفهرس_المتفرق_المقلوب_الفهرس</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">المسافة الإقليدية (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h3><p>بشكل أساسي، تقيس المسافة الإقليدية طول القطعة التي تربط بين نقطتين.</p>
<p>معادلة المسافة الإقليدية هي كما يلي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>المسافة الإقليدية</span> </span></p>
<p>حيث <strong>a</strong> = (<sub>a0،</sub><sub>a1،</sub>...،...،<sub>an-1</sub>) و <strong>b</strong> = (<sub>b0،</sub><sub>b0،</sub>...، <sub>bn-1</sub>) نقطتان في الفضاء الإقليديدي ن</p>
<p>إنه مقياس المسافة الأكثر استخدامًا وهو مفيد جدًا عندما تكون البيانات متصلة.</p>
<div class="alert note">
يحسب ميلفوس القيمة فقط قبل تطبيق الجذر التربيعي عند اختيار المسافة الإقليدية كمقياس للمسافة.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">الضرب الداخلي (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h3><p>تُعرَّف المسافة IP بين تضمينينين متجهين على النحو التالي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span><span class="img-wrapper"><span>IP</span> </span></p>
<p>يكون IP أكثر فائدة إذا كنت بحاجة إلى مقارنة بيانات غير طبيعية أو عندما تهتم بالمقدار والزاوية.</p>
<div class="alert note">
<p>إذا قمت بتطبيق مقياس المسافة IP على التضمينات المطبعة، فستكون النتيجة مكافئة لحساب تشابه جيب التمام بين التضمينات.</p>
</div>
<p>لنفترض أن X' تم تطبيعه من التضمين X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>تطبيع</span> </span></p>
<p>يكون الارتباط بين التضمينين على النحو التالي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>التطبيع</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">تشابه جيب التمام<button data-href="#Cosine-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>يستخدم تشابه جيب التمام جيب تمام الزاوية بين مجموعتين من المتجهات لقياس مدى تشابههما. يمكنك التفكير في مجموعتي المتجهات على أنهما قطعتان مستقيمتان تبدآن من نقطة الأصل نفسها ([0،0،...]) ولكنهما تشيران في اتجاهين مختلفين.</p>
<p>لحساب التشابه في جيب التمام بين مجموعتين من المتجهات <strong>A = (<sub>a0،</sub><sub>a1،</sub>...،<sub>an-1</sub>)</strong> <strong>وB = (<sub>b0،</sub><sub>b1،</sub>...، <sub>bn-1</sub>)</strong>، استخدم الصيغة التالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>تشابه_جيب_التمام</span> </span></p>
<p>يكون تشابه جيب التمام دائمًا في الفترة <strong>[-1, 1]</strong>. على سبيل المثال، يكون التشابه بين متجهين متناسبين بجيب التمام يساوي <strong>1،</strong> ويكون التشابه بين متجهين متعامدين متعامدين يساوي <strong>0،</strong> ويكون التشابه بين متجهين متعاكسين يساوي <strong>-1</strong>. كلما كان جيب التمام أكبر، كانت الزاوية بين المتجهين أصغر، مما يشير إلى أن هذين المتجهين أكثر تشابهًا مع بعضهما البعض.</p>
<p>بطرح جيب التمام من 1، يمكنك الحصول على مسافة جيب التمام بين متجهين.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">مسافة جاكارد<button data-href="#Jaccard-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>يقيس معامل جاكارد للتشابه التشابه بين مجموعتين من العينات، ويُعرَّف بأنه مقدار التشابه بين مجموعتين محددتين مقسومًا على مقدار التشابه بين مجموعتين محددتين. لا يمكن تطبيقه إلا على مجموعات العينات المحدودة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>معامل تشابه جاكارد</span> </span></p>
<p>تقيس مسافة جاكارد التباين بين مجموعات البيانات ويتم الحصول عليها بطرح معامل تشابه جاكارد من 1. بالنسبة للمتغيرات الثنائية، تعادل مسافة جاكارد معامل تانيموتو.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>مسافة جاكارد</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">مسافة هامينغ<button data-href="#Hamming-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>تقيس مسافة هامينج سلاسل البيانات الثنائية. المسافة بين سلسلتين متساويتين في الطول هي عدد مواضع البتات التي تختلف عندها البتات.</p>
<p>على سبيل المثال، لنفترض أن هناك سلسلتين، 1101 1001 و1101 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. وبما أن هذا يحتوي على اثنين من 1، فإن مسافة هامينغ، د (11011001، 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">التشابه الهيكلي<button data-href="#Structural-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>عندما تظهر بنية كيميائية ما كجزء من بنية كيميائية أكبر، تسمى الأولى بنية فرعية والثانية تسمى بنية فوقية. على سبيل المثال، الإيثانول هو بنية فرعية لحمض الأسيتيك، وحمض الأسيتيك هو بنية فوقية للإيثانول.</p>
<p>يُستخدم التشابه البنائي لتحديد ما إذا كانت هناك صيغتان كيميائيتان متشابهتان من حيث كون إحداهما بنية فوقية أو بنية فرعية للأخرى.</p>
<p>لتحديد ما إذا كان A بنية فوقية ل B، استخدم الصيغة التالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>البنية الفوقية</span> </span></p>
<p>حيث:</p>
<ul>
<li>أ هو التمثيل الثنائي للصيغة الكيميائية المراد استرجاعها</li>
<li>B هو التمثيل الثنائي للصيغة الكيميائية في قاعدة البيانات</li>
</ul>
<p>بمجرد إرجاعها <code translate="no">0</code> ، فإن <strong>A</strong> ليست بنية فوقية لـ <strong>B</strong>. وإلا فإن النتيجة تكون العكس.</p>
<p>لتحديد ما إذا كانت A بنية فرعية لـ B، استخدم الصيغة التالية</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>البنية الفرعية</span> </span></p>
<p>حيث:</p>
<ul>
<li>أ هو التمثيل الثنائي للصيغة الكيميائية المراد استرجاعها</li>
<li>B هو التمثيل الثنائي للصيغة الكيميائية في قاعدة البيانات</li>
</ul>
<p>بمجرد إرجاعها <code translate="no">0</code> ، فإن <strong>A</strong> ليست بنية فرعية لـ <strong>B</strong>. وإلا فإن النتيجة تكون العكس.</p>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">لماذا لا تكون نتيجة أعلى 1 من البحث المتجه هي متجه البحث نفسه، إذا كان نوع المقياس هو الضرب الداخلي؟</font></summary>يحدث هذا إذا لم تقم بتطبيع المتجهات عند استخدام الضرب الداخلي كمقياس للمسافة.</details>
<details>
<summary><font color="#4fc4f9">ما هو التطبيع؟ لماذا يلزم التطبيع؟</font></summary></p>
<p>يشير التطبيع إلى عملية تحويل التضمين (المتجه) بحيث يساوي معياره 1. إذا كنت تستخدم الضرب الداخلي لحساب أوجه تشابه التضمينات، فيجب عليك تطبيع التضمينات. بعد التطبيع، يساوي حاصل الضرب الداخلي تشابه جيب التمام.</p>
<p>
راجع <a href="https://en.wikipedia.org/wiki/Unit_vector">ويكيبيديا</a> لمزيد من المعلومات.</p>
</details>
<details>
<summary><font color="#4fc4f9">لماذا أحصل على نتائج مختلفة باستخدام المسافة الإقليدية (L2) والضرب الداخلي (IP) كمقياس للمسافة؟</font></summary>تحقق مما إذا كانت المتجهات طبيعية. إذا لم تكن كذلك، فأنت بحاجة إلى تطبيع المتجهات أولاً. من الناحية النظرية، تختلف أوجه التشابه التي تم التوصل إليها بواسطة L2 عن أوجه التشابه التي تم التوصل إليها بواسطة IP، إذا لم يتم تطبيع المتجهات.</details>
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
    </button></h2><ul>
<li>تعرف على المزيد حول <a href="/docs/ar/index.md">أنواع الفهارس</a> المدعومة في ميلفوس.</li>
</ul>
