---
id: metric.md
title: أنواع المقاييس
summary: >-
  تُستخدم مقاييس التشابه لقياس أوجه التشابه بين المتجهات. يساعد اختيار مقياس
  المسافة المناسب في تحسين أداء التصنيف والتجميع بشكل كبير.
---
<h1 id="Metric-Types" class="common-anchor-header">أنواع المقاييس<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>تُستخدم مقاييس التشابه لقياس أوجه التشابه بين المتجهات. يساعد اختيار مقياس المسافة المناسب في تحسين أداء التصنيف والتجميع بشكل كبير.</p>
<p>يدعم ميلفوس حاليًا هذه الأنواع من مقاييس التشابه: المسافة الإقليدية (<code translate="no">L2</code>)، الضرب الداخلي (<code translate="no">IP</code>)، تشابه جيب التمام (<code translate="no">COSINE</code>)، <code translate="no">JACCARD</code> و <code translate="no">HAMMING</code> و <code translate="no">BM25</code> (المصممة خصيصًا للبحث عن النص الكامل على المتجهات المتفرقة).</p>
<p>يلخص الجدول أدناه التعيين بين أنواع الحقول المختلفة وأنواع المقاييس المقابلة لها.</p>
<table>
   <tr>
     <th><p>نوع الحقل</p></th>
     <th><p>نطاق البعد</p></th>
     <th><p>أنواع المقاييس المدعومة</p></th>
     <th><p>نوع القياس الافتراضي</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code> <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>لا حاجة لتحديد البُعد</p></td>
     <td><p><code translate="no">IP</code>، <code translate="no">BM25</code> (يستخدم فقط للبحث عن النص الكامل)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>بالنسبة للحقول المتجهة من النوع <code translate="no">SPARSE\_FLOAT\_VECTOR</code> ، استخدم النوع المتري <code translate="no">BM25</code> فقط عند إجراء بحث بالنص الكامل. لمزيد من المعلومات، راجع <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>.</p></li>
<li><p>بالنسبة للحقول المتجهة من النوع <code translate="no">BINARY_VECTOR</code> ، يجب أن تكون قيمة البعد (<code translate="no">dim</code>) من مضاعفات 8.</p></li>
</ul>
</div>
<p>يلخص الجدول أدناه خصائص قيم مسافة التشابه لجميع أنواع المقاييس المدعومة ونطاق قيمها.</p>
<table>
   <tr>
     <th><p>نوع المقياس</p></th>
     <th><p>خصائص قيم مسافات التشابه في المسافة</p></th>
     <th><p>نطاق قيمة مسافة التشابه</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>تشير القيمة الأصغر إلى تشابه أكبر.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>تشير القيمة الأكبر إلى تشابه أكبر.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>تشير القيمة الأكبر إلى تشابه أكبر.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>تشير القيمة الأصغر إلى تشابه أكبر.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>تشير القيمة الأصغر إلى تشابه أكبر.</p></td>
     <td><p>[0، خافت (متجه)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>تسجيل درجة الصلة بناءً على تكرار المصطلح وتكرار المستند المقلوب وتطبيع المستند.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">المسافة الإقليدية (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>تقيس المسافة الإقليدية بشكل أساسي طول القطعة التي تربط بين نقطتين.</p>
<p>معادلة المسافة الإقليدية هي كما يلي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>المسافة الإقليدية الإقليدية</span> </span></p>
<p>حيث <strong>a = (<sub>a0،</sub><sub>a1،</sub>...،...،<sub>an-1</sub>)</strong> و <strong>b = (<sub>b0،</sub><sub>b1،</sub>...،...، <sub>bn-1</sub>)</strong> نقطتان في الفضاء الإقليدي الإقليدي ن.</p>
<p>إنه مقياس المسافة الأكثر استخدامًا وهو مفيد جدًا عندما تكون البيانات متصلة.</p>
<div class="alert note">
<p>يحسب ميلفوس القيمة فقط قبل تطبيق الجذر التربيعي عند اختيار المسافة الإقليدية كمقياس للمسافة.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">الضرب الداخلي (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تعريف المسافة IP بين تضمينينين على النحو التالي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>صيغة IP</span> </span></p>
<p>يكون IP أكثر فائدة إذا كنت بحاجة إلى مقارنة بيانات غير طبيعية أو عندما تهتم بالمقدار والزاوية.</p>
<div class="alert note">
<p>إذا كنت تستخدم IP لحساب أوجه التشابه بين التضمينات، فيجب عليك تطبيع التضمينات. بعد التطبيع، يساوي حاصل الضرب الداخلي تشابه جيب التمام.</p>
</div>
<p>لنفترض أن X' تم تطبيعه من تضمين X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>صيغة التطبيع</span> </span></p>
<p>يكون الارتباط بين التضمينين على النحو التالي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>الارتباط بين التضمينين</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">تشابه جيب التمام<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم تشابه جيب التمام جيب تمام الزاوية بين مجموعتين من المتجهات لقياس مدى تشابههما. يمكنك التفكير في مجموعتي المتجهات على أنهما قطعتان مستقيمتان تبدآن من نفس النقطة، مثل [0،0،...]، لكنهما تشيران في اتجاهين مختلفين.</p>
<p>لحساب التشابه في جيب التمام بين مجموعتين من المتجهات <strong>A = (<sub>a0،</sub><sub>a1،</sub>...،<sub>an-1</sub>)</strong> <strong>وB = (<sub>b0،</sub><sub>b1،</sub>...، <sub>bn-1</sub>)</strong>، استخدم الصيغة التالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>تشابه جيب التمام</span> </span></p>
<p>يكون تشابه جيب التمام دائمًا في الفترة <strong>[-1، 1]</strong>. على سبيل المثال، متجهان متناسبان يكون تشابه جيب التمام بينهما <strong>1،</strong> ومتجهان متعامدان يكون التشابه بينهما <strong>0،</strong> ومتجهان متعاكسان يكون التشابه بينهما <strong>-1</strong>. كلما كان جيب التمام أكبر، كانت الزاوية بين المتجهين أصغر، ما يشير إلى أن هذين المتجهين أكثر تشابهًا مع بعضهما البعض.</p>
<p>بطرح التشابه في جيب التمام من 1، يمكنك الحصول على مسافة جيب التمام بين المتجهين.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">مسافة JACCARD<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>يقيس معامل التشابه JACCARD التشابه بين مجموعتين من العينات، ويُعرَّف بأنه مقدار التشابه بين مجموعتين محددتين مقسومًا على مقدار التشابه بين مجموعتين محددتين. يمكن تطبيقه فقط على مجموعات العينات المحدودة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>صيغة معامل التشابه JACCARD</span> </span></p>
<p>تقيس المسافة JACCARD التباين بين مجموعات البيانات ويتم الحصول عليها بطرح معامل التشابه JACCARD من 1. بالنسبة للمتغيرات الثنائية، تعادل المسافة JACCARD معامل تانيموتو.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>معادلة مسافة JACCARD</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">مسافة هامينج<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>تقيس مسافة HAMMING سلاسل البيانات الثنائية. المسافة بين سلسلتين متساويتين في الطول هي عدد مواضع البتات التي تختلف عندها البتات.</p>
<p>على سبيل المثال، لنفترض أن هناك سلسلتين، 1101 1001 و1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. وبما أن هذا يحتوي على اثنين من 1، فإن المسافة بين السلسلتين هي د (11011001، 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">تشابه BM25<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 هي طريقة قياس صلة النص المستخدمة على نطاق واسع، وهي مصممة خصيصًا <a href="/docs/ar/full-text-search.md">للبحث في النص الكامل</a>. وهي تجمع بين العوامل الرئيسية الثلاثة التالية:</p>
<ul>
<li><p><strong>تردد المصطلح (TF):</strong> يقيس مدى تكرار ظهور المصطلح في المستند. في حين أن الترددات الأعلى غالبًا ما تشير إلى أهمية أكبر، تستخدم BM25 معلمة التشبع <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">k1k_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span></span></span></span> k <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> لمنع المصطلحات المتكررة بشكل مفرط من الهيمنة على درجة الصلة.</p></li>
<li><p><strong>تردد المستند العكسي (IDF):</strong> يعكس أهمية المصطلح عبر المجموعة بأكملها. وتحصل المصطلحات التي تظهر في عدد أقل من المستندات على قيمة أعلى لتكرار المستند (IDF)، مما يشير إلى مساهمة أكبر في الأهمية.</p></li>
<li><p><strong>تطبيع طول المستند:</strong> تميل المستندات الأطول إلى الحصول على درجات أعلى بسبب احتوائها على مصطلحات أكثر. يخفف BM25 من هذا التحيز من خلال تطبيع أطوال المستندات، حيث يتحكم المعامل <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">bb</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> b في قوة هذا التطبيع.</p></li>
</ul>
<p>يتم حساب نقاط BM25 على النحو التالي:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>s</mi><mi>c</mi><mi>o</mi><mi>r</mi><mi>e</mi><mo stretchy="false">(</mo><mi>D</mi><mo separator="true">,</mo><mi>Q</mi><mo stretchy="false">)</mo><mo>=</mo><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><mi>I</mi><mi>D</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>⋅</mo><mfrac><mrow><mi>T</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo separator="true">,</mo><mi>D</mi><mo stretchy="false">)</mo><mo>⋅</mo><mo stretchy="false">(</mo><msub><mi>k</mi><mn>1</mn></msub><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><mrow><mi>T</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo separator="true">,</mo><mi>D</mi><mo stretchy="false">)</mo><mo>+</mo><msub><mi>k</mi><mn>1</mn></msub><mo>⋅</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mi>b</mi><mo>+</mo><mi>b</mi><mo>⋅</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>D</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi>a</mi><mi>v</mi><mi>g</mi><mi>d</mi><mi>l</mi></mrow></mfrac><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">score</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">Q</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.9291em;vertical-align:-1.2777em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.8081em;vertical-align:-1.3811em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.11em;"><span class="pstrut" style="height:3.01em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">TF</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">b</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">b</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.01em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">a</span><span class="mord mathnormal mtight" style="margin-right:0.03588em;">vg</span><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight" style="margin-right:0.01968em;">l</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.485em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">∣</span><span class="mord mathnormal mtight" style="margin-right:0.02778em;">D</span><span class="mord mtight">∣</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.4811em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span><span class="mclose">)</span></span></span><span style="top:-3.24em;"><span class="pstrut" style="height:3.01em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.687em;"><span class="pstrut" style="height:3.01em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">TF</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.3811em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></span></p>
<p>وصف المعلمة:</p>
<ul>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">QQ</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span></span></span></span> Q: نص الاستعلام المقدم من المستخدم.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">DD</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> D: المستند الذي يتم تقييمه.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>TF</mi><mo stretchy="false">(</mo><msub><mi>qi</mi></msub><mo separator="true">,</mo><mi>D</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">TF(q_i, D)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span></span></span></span> TF<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> D</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">)</span></span></span></span>: تكرار المصطلح الذي يمثل عدد مرات ظهور المصطلح <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qiq_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span></span></span></span>q <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>في المستند <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">DD</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> D.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>IDF</mi><mo stretchy="false">(</mo><msub><mi>qi</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">IDF(q_i)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">IDF</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>): تردد المستند العكسي، محسوبًا على النحو التالي:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>I</mi><mi>D</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>=</mo><mi>log</mi><mo>⁡</mo><mo stretchy="false">(</mo><mfrac><mrow><mi>N</mi><mo>−</mo><mi>n</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>+</mo><mn>0.5</mn></mrow><mrow><mi>n</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>+</mo><mn>0.5</mn></mrow></mfrac><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mop">lo<span style="margin-right:0.01389em;">g</span></span><span class="mopen">(</span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.5</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.5</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span></span></p>
<p>حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">NN</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> N هو العدد الإجمالي للمستندات في مجموعة المستندات،<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>وn</mi><mo stretchy="false">(</mo><msub><mi>qi</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n(q_i) n(q_i)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span></span></span></span> n<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> ) هو عدد المستندات التي تحتوي على المصطلح <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qq_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span></span></span></span> q <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">∣D∣|D|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">∣D∣</span></span></span></span>: طول المستند <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">DD</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> D (إجمالي عدد المصطلحات).</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">avgdlavgdlavgdl</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.01968em;">avgdl</span></span></span></span>: متوسط طول جميع المستندات في مجموعة المستندات.</p></li>
<li><p><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">k1k_1</span></span></span></span></span></span></span></span><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">k</span></span><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"></span></span></span></span></span></span></span></span></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>: يتحكم في تأثير تكرار المصطلح على النتيجة. تزيد القيم الأعلى من أهمية تكرار المصطلح. النطاق النموذجي هو [1.2، 2.0]، بينما يسمح ميلفوس بنطاق [0، 3].</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">bb</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> b: تتحكم في درجة تطبيع الطول، وتتراوح من 0 إلى 1. عندما تكون القيمة 0، لا يتم تطبيق أي تطبيع؛ وعندما تكون القيمة 1، يتم تطبيق التطبيع الكامل.</p></li>
</ul>
