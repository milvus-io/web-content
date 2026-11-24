---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  استخدم فهارس MinHash LSH لتسريع عملية الكشف عن النصوص شبه المكررة والبحث عن
  التشابه باستخدام معامل جاكارد في مجموعات البيانات النصية الكبيرة.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>يعد إزالة التكرار والبحث عن التشابه بكفاءة أمرين بالغين الأهمية لمجموعات بيانات التعلم الآلي واسعة النطاق، خاصةً في مهام مثل تنظيف مجموعات النصوص التدريبية الخاصة بنماذج اللغة الكبيرة (LLMs). عند التعامل مع ملايين أو مليارات الوثائق، تصبح المطابقة الدقيقة التقليدية بطيئة للغاية ومكلفة.</p>
<p>يتيح فهرس <strong>MINHASH_LSH</strong> في Milvus إزالة التكرار التقريبي بسرعة وقابلية للتوسع ودقة عالية من خلال الجمع بين تقنيتين قويتين:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: يُنشئ بسرعة توقيعات مدمجة (أو «بصمات») لتقدير تشابه المستندات.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">التجزئة الحساسة للموقع (LSH)</a>: تبحث بسرعة عن مجموعات من المستندات المتشابهة بناءً على توقيعات MinHash الخاصة بها.</p></li>
</ul>
<p>يرشدك هذا الدليل إلى المفاهيم والمتطلبات الأساسية والإعداد وأفضل الممارسات لاستخدام MINHASH_LSH في Milvus.</p>
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">تشابه جاكارد<button data-href="#Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>يقيس تشابه جاكارد التداخل بين مجموعتين A و B، ويُعرَّف رسميًا على النحو التالي:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0962em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>حيث تتراوح قيمته بين 0 (منفصلان تمامًا) و1 (متطابقان).</p>
<p>ومع ذلك، فإن حساب تشابه جاكارد بدقة بين جميع أزواج المستندات في مجموعات البيانات واسعة النطاق مكلف من الناحية الحسابية —<strong>O(n²)</strong> من حيث الوقت والذاكرة عندما تكون <strong>n</strong> كبيرة. وهذا يجعل استخدامه غير ممكن في حالات مثل تنظيف مجموعة نصوص تدريب نماذج اللغة الكبيرة (LLM) أو تحليل المستندات على نطاق الويب.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">توقيعات MinHash: تشابه جاكارد التقريبي<button data-href="#MinHash-signatures-Approximate-Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> هي تقنية احتمالية توفر طريقة فعالة لتقدير تشابه جاكارد. تعمل هذه التقنية عن طريق تحويل كل مجموعة إلى <strong>متجه توقيع</strong> مضغوط، مع الحفاظ على معلومات كافية لتقدير تشابه المجموعات بكفاءة.</p>
<p><strong>الفكرة الأساسية</strong>:</p>
<p>كلما زاد التشابه بين المجموعتين، زادت احتمالية تطابق توقيعات MinHash الخاصة بهما في نفس المواضع. تتيح هذه الخاصية لـ MinHash تقدير تشابه جاكارد بين المجموعات تقريبياً.</p>
<p>تسمح هذه الخاصية لـ MinHash <strong>بتقدير تشابه جاكارد</strong> بين المجموعات دون الحاجة إلى مقارنة المجموعات الكاملة مباشرةً.</p>
<p>تتضمن عملية MinHash ما يلي:</p>
<ol>
<li><p><strong>التقسيم إلى شرائح</strong>: تحويل المستندات إلى مجموعات من تسلسلات الرموز المتداخلة (الشرائح)</p></li>
<li><p><strong>التجزئة (Hashing</strong>): تطبيق دوال تجزئة مستقلة متعددة على كل شريحة</p></li>
<li><p><strong>الاختيار الأد</strong>نى<strong>(Min Selection</strong>): بالنسبة لكل دالة تجزئة، تسجيل قيمة التجزئة <strong>الدنيا</strong> عبر جميع الشرائح</p></li>
</ol>
<p>يمكنك الاطلاع على العملية بأكملها كما هو موضح أدناه:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" /> 
   <span>سير عمل MinHash</span>
  
 </span></p>
<div class="alert note">
<p>يحدد عدد دوال التجزئة المستخدمة أبعاد توقيع MinHash. توفر الأبعاد الأعلى دقة تقريب أفضل، على حساب زيادة التخزين والحساب.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH لـ MinHash<button data-href="#LSH-for-MinHash" class="anchor-icon" translate="no">
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
    </button></h3><p>على الرغم من أن توقيعات MinHash تقلل بشكل كبير من تكلفة حساب التشابه الدقيق لـ Jaccard بين المستندات، إلا أن المقارنة الشاملة لكل زوج من متجهات التوقيع لا تزال غير فعالة على نطاق واسع.</p>
<p>لحل هذه المشكلة، يتم استخدام <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a>. تتيح LSH إجراء بحث سريع عن التشابه التقريبي من خلال ضمان تجميع العناصر المتشابهة في نفس «المجموعة» باحتمال كبير — مما يغني عن الحاجة إلى مقارنة كل زوج مباشرةً.</p>
<p>تتضمن العملية ما يلي:</p>
<ol>
<li><p><strong>تجزئة التوقيع:</strong></p>
<p>يتم تقسيم توقيع MinHash <em>ذي n أبعاد</em> إلى <em>b</em> نطاقات. يحتوي كل نطاق على <em>r</em> قيم تجزئة متتالية، وبالتالي فإن الطول الإجمالي للتوقيع يفي بالمعادلة: <em>n = b × r</em>.</p>
<p>على سبيل المثال، إذا كان لديك توقيع MinHash ذو 128 بُعدًا (<em>n = 128</em>) وقمت بتقسيمه إلى 32 نطاقًا (<em>b = 32</em>)، فإن كل نطاق يحتوي على 4 قيم تجزئة (<em>r = 4</em>).</p></li>
<li><p><strong>التجزئة على مستوى النطاقات:</strong></p>
<p>بعد التقسيم، تتم معالجة كل نطاق بشكل مستقل باستخدام دالة تجزئة قياسية لتخصيصه إلى مجموعة. إذا أنتجت توقيعان نفس قيمة التجزئة داخل نطاق ما — أي أنهما يقعان في نفس المجموعة — فيُعتبران تطابقين محتملين.</p></li>
<li><p><strong>اختيار المرشحين:</strong></p>
<p>يتم اختيار الأزواج التي تتطابق في نطاق واحد على الأقل كمرشحين للتشابه.</p></li>
</ol>
<div class="alert note">
<p>لماذا ينجح هذا الأسلوب؟</p>
<p>من الناحية الرياضية، إذا كان لتوقيعين تشابه جاكارد <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span>،</p>
<ul>
<li><p>فإن احتمال تطابقهما في صف واحد (موضع التجزئة) هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span></p></li>
<li><p>فإن احتمال تطابقهما في جميع الصفوف <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span> في نطاق ما يساوي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span></span></span></span></p></li>
<li><p>احتمال تطابقهما في <strong>شريط واحد على الأقل</strong> هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>1−</mo><mo stretchy="false">(</mo><msup><mi>1−sr</mi></msup><msup><mo stretchy="false">)</mo></msup></mrow><annotation encoding="application/x-tex">b1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span> (<span class="katex-base"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathnormal"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0991em;vertical-align:-0.25em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;"> </span></span></span></span></span></span></span></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></p></li>
</ul>
<p>للحصول على مزيد من التفاصيل، راجع <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">التجزئة الحساسة للموقع</a>.</p>
</div>
<p>لنفترض وجود ثلاث مستندات ذات توقيعات MinHash ذات 128 بُعدًا:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" /> 
   <span>سير عمل LSH 1</span>
  
 </span></p>
<p>أولاً، يقسم LSH التوقيع ذي الأبعاد الـ 128 إلى 32 نطاقًا، كل نطاق يتكون من 4 قيم متتالية:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" /> 
   <span>سير عمل LSH 2</span>
  
 </span></p>
<p>ثم يتم تجزئة كل نطاق إلى مجموعات مختلفة باستخدام دالة تجزئة. ويتم اختيار أزواج المستندات التي تشترك في المجموعات كمرشحات للتشابه. في المثال أدناه، يتم اختيار المستند A والمستند B كمرشحات للتشابه لأن نتائج تجزئتهما تتطابق في <strong>النطاق 0</strong>:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" /> 
   <span>سير عمل LSH 3</span>
  
 </span></p>
<div class="alert note">
<p>يتم التحكم في عدد النطاقات بواسطة المعلمة « <code translate="no">mh_lsh_band</code> ». لمزيد من المعلومات، راجع <a href="/docs/ar/minhash-lsh.md#Index-building-params">معلمات إنشاء الفهرس</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures" class="common-anchor-header">MHJACCARD: مقارنة توقيعات MinHash<button data-href="#MHJACCARD-Comparing-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>تقارب توقيعات MinHash تشابه جاكارد بين المجموعات باستخدام متجهات ثنائية ذات طول ثابت. ومع ذلك، نظرًا لأن هذه التوقيعات لا تحافظ على المجموعات الأصلية، لا يمكن تطبيق المقاييس القياسية مثل <code translate="no">JACCARD</code> أو <code translate="no">L2</code> أو <code translate="no">COSINE</code> مباشرةً لمقارنتها.</p>
<p>ولمعالجة هذه المشكلة، يقدم Milvus نوعًا متخصصًا من المقاييس يُسمى <code translate="no">MHJACCARD</code> ، وهو مصمم خصيصًا لمقارنة توقيعات MinHash.</p>
<p>عند استخدام MinHash في Milvus:</p>
<ul>
<li><p>يجب أن يكون حقل المتجه من النوع <code translate="no">BINARY_VECTOR</code></p></li>
<li><p>يجب أن يكون <code translate="no">index_type</code> من النوع <code translate="no">MINHASH_LSH</code> (أو <code translate="no">BIN_FLAT</code>)</p></li>
<li><p>يجب ضبط <code translate="no">metric_type</code> على <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>سيؤدي استخدام مقاييس أخرى إما إلى عدم صحة العملية أو إلى نتائج غير صحيحة.</p>
<p>لمزيد من المعلومات حول هذا النوع من المقاييس، راجع <a href="/docs/ar/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h3 id="Deduplication-workflow" class="common-anchor-header">سير عمل إزالة التكرار<button data-href="#Deduplication-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>تتيح عملية إزالة التكرار المدعومة بـ MinHash LSH لـ Milvus تحديد النصوص أو السجلات المنظمة شبه المكررة وتصفيتها بكفاءة قبل إدراجها في المجموعة.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/it9wwbcfwhft0rbwosacgltzneb.png" alt="It9wwbcfwhft0rbwosacgltzneb" class="doc-image" id="it9wwbcfwhft0rbwosacgltzneb" /> 
   <span>It9wwbcfwhft0rbwosacgltzneb</span>
  
 </span></p>
<ol>
<li><p><strong>التقسيم والمعالجة المسبقة</strong>: تقسيم البيانات النصية الواردة أو البيانات المنظمة (مثل السجلات والحقول) إلى أجزاء؛ وتوحيد النص (تحويل الأحرف إلى أحرف صغيرة، وإزالة علامات الترقيم)، وإزالة الكلمات الممنوعة حسب الحاجة.</p></li>
<li><p><strong>بناء السمات</strong>: إنشاء مجموعة الرموز المستخدمة في MinHash (مثل المقاطع من النص؛ ورموز الحقول المتسلسلة للبيانات المنظمة).</p></li>
<li><p><strong>إنشاء توقيع MinHash</strong>: حساب توقيعات MinHash لكل جزء أو سجل.</p></li>
<li><p><strong>تحويل المتجه الثنائي</strong>: تحويل التوقيع إلى متجه ثنائي متوافق مع Milvus.</p></li>
<li><p><strong>البحث قبل الإدراج</strong>: استخدام فهرس MinHash LSH للبحث في المجموعة المستهدفة عن العناصر شبه المكررة للعنصر الوارد.</p></li>
<li><p><strong>الإدراج والتخزين</strong>: إدراج العناصر الفريدة فقط في المجموعة. وتصبح هذه العناصر قابلة للبحث من أجل عمليات فحص إزالة التكرارات في المستقبل.</p></li>
</ol>
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
    </button></h2><p>قبل استخدام MinHash LSH في Milvus، يجب أولاً إنشاء <strong>توقيعات MinHash</strong>. هذه التوقيعات الثنائية المدمجة تقارب تشابه جاكارد بين المجموعات وهي مطلوبة للبحث القائم على <code translate="no">MHJACCARD</code> في Milvus.</p>
<div class="alert note">
<p>يمكنك إعداد توقيعات MinHash لفهرس <code translate="no">MINHASH_LSH</code> بطريقتين:</p>
<ul>
<li><p>إنشاء التوقيعات بنفسك باستخدام أدوات خارجية وإدراجها في حقل BINARY_VECTOR، أو</p></li>
<li><p>استخدام دالة MinHash المدمجة لإنشاء متجهات ثنائية متوافقة تلقائيًا من النص. للاطلاع على سير العمل من البداية إلى النهاية وخيارات التكوين الخاصة بدالة MinHash، راجع <a href="/docs/ar/minhash-function.md">دالة MinHash</a>.</p></li>
</ul>
</div>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">اختر طريقة لإنشاء توقيعات MinHash<button data-href="#Choose-a-method-to-generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>اعتمادًا على حجم العمل لديك، يمكنك الاختيار بين:</p>
<ul>
<li><p>استخدام <a href="https://ekzhu.github.io/datasketch/"><code translate="no">datasketch</code></a> للتبسيط (موصى به لإنشاء النماذج الأولية)</p></li>
<li><p>استخدام الأدوات الموزعة (مثل Spark وRay) لمجموعات البيانات واسعة النطاق</p></li>
<li><p>تنفيذ منطق مخصص (NumPy، C++، إلخ) إذا كان تحسين الأداء أمرًا بالغ الأهمية</p></li>
</ul>
<p>في هذا الدليل، نستخدم لغة " <code translate="no">datasketch</code> " لتبسيط العملية والتوافق مع تنسيق إدخال Milvus.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">تثبيت المكتبات المطلوبة<button data-href="#Install-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتثبيت الحزم اللازمة لهذا المثال:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">إنشاء توقيعات MinHash<button data-href="#Generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>سنقوم بإنشاء توقيعات MinHash ذات 256 بُعدًا، حيث يتم تمثيل كل قيمة هاش كعدد صحيح من 64 بت. ويتوافق هذا مع تنسيق المتجه المتوقع لـ <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>يبلغ حجم كل توقيع 256 × 64 بت = 2048 بايت. يمكن إدراج سلسلة البايتات هذه مباشرةً في حقل <code translate="no">BINARY_VECTOR</code>. لمزيد من المعلومات حول المتجهات الثنائية المستخدمة في Milvus، راجع <a href="/docs/ar/binary-vector.md">«المتجه الثنائي</a>».</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(اختياري) إعداد مجموعات الرموز الأولية (للبحث المُحسّن)<button data-href="#Optional-Prepare-raw-token-sets-for-refined-search" class="anchor-icon" translate="no">
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
    </button></h3><p>بشكل افتراضي، يستخدم Milvus توقيعات MinHash وفهرس LSH فقط للعثور على الجيران التقريبيين. هذه العملية سريعة ولكنها قد تُرجع نتائج إيجابية خاطئة أو تفوت التطابقات القريبة.</p>
<p>إذا كنت تريد <strong>تشابه جاكارد دقيقًا،</strong> فإن Milvus يدعم البحث المُحسّن الذي يستخدم مجموعات الرموز الأصلية. لتمكينه:</p>
<ul>
<li><p>قم بتخزين مجموعات الرموز كحقل منفصل في " <code translate="no">VARCHAR</code> "</p></li>
<li><p>اضبط « <code translate="no">&quot;with_raw_data&quot;: True</code> » عند <a href="/docs/ar/minhash-lsh.md#Build-index-parameters-and-create-collection">إنشاء معلمات الفهرس</a></p></li>
<li><p>وقم بتمكين <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> عند <a href="/docs/ar/minhash-lsh.md#Perform-similarity-search">إجراء بحث التشابه</a></p></li>
</ul>
<p><strong>مثال على استخراج مجموعة الرموز</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH" class="common-anchor-header">استخدم MinHash LSH<button data-href="#Use-MinHash-LSH" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن تصبح متجهات MinHash ومجموعات الرموز الأصلية جاهزة، يمكنك تخزينها وفهرستها والبحث فيها باستخدام Milvus مع <code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-your-cluster" class="common-anchor-header">اتصل بمجموعتك<button data-href="#Connect-to-your-cluster" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment">// Update if your URI is different</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">تحديد مخطط المجموعة<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>حدد مخططًا باستخدام:</p>
<ul>
<li><p>المفتاح الأساسي</p></li>
<li><p>حقل " <code translate="no">BINARY_VECTOR</code> " لتوقيعات MinHash</p></li>
<li><p>حقل " <code translate="no">VARCHAR</code> " لمجموعة الرموز الأصلية (في حالة تمكين البحث المحدد)</p></li>
<li><p>اختياريًا، حقل من نوع « <code translate="no">document</code> » للنص الأصلي</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">16384</span>) <span class="hljs-comment">// 256 hash values × 64 bits</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;token_set&quot;</span>) <span class="hljs-comment">// required for refinement</span>
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">16384</span>, <span class="hljs-comment">// 256 hash values × 64 bits</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;token_set&quot;</span>, <span class="hljs-comment">// required for refinement</span>
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">false</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;doc_id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;minhash_signature&quot;</span>).WithDataType(entity.FieldTypeBinaryVector).WithDim(<span class="hljs-number">16384</span>)). <span class="hljs-comment">// 256 hash values × 64 bits</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;token_set&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>)).        <span class="hljs-comment">// required for refinement</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;minhash_signature&quot;,
            &quot;dataType&quot;: &quot;BinaryVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 16384
            }
        },
        {
            &quot;fieldName&quot;: &quot;token_set&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">إنشاء معلمات الفهرس وإنشاء المجموعة<button data-href="#Build-index-parameters-and-create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>إنشاء فهرس <code translate="no">MINHASH_LSH</code> مع تمكين تصفية Jaccard:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;mh_element_bit_width&quot;</span>, <span class="hljs-number">64</span>); <span class="hljs-comment">// Must match signature bit width</span>
extraParams.put(<span class="hljs-string">&quot;mh_lsh_band&quot;</span>, <span class="hljs-number">16</span>);          <span class="hljs-comment">// Band count</span>
extraParams.put(<span class="hljs-string">&quot;with_raw_data&quot;</span>, <span class="hljs-literal">true</span>);      <span class="hljs-comment">// Required for Jaccard refinement</span>

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .indexType(IndexParam.IndexType.MINHASH_LSH)
        .metricType(IndexParam.MetricType.MHJACCARD)
        .extraParams(extraParams)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">MINHASH_LSH</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">MHJACCARD</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">mh_element_bit_width</span>: <span class="hljs-number">64</span>, <span class="hljs-comment">// Must match signature bit width</span>
            <span class="hljs-attr">mh_lsh_band</span>: <span class="hljs-number">16</span>,          <span class="hljs-comment">// Band count</span>
            <span class="hljs-attr">with_raw_data</span>: <span class="hljs-literal">true</span>,      <span class="hljs-comment">// Required for Jaccard refinement</span>
        },
    },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    schema,
    index_params,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">false</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, <span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index.NewMinHashLSHIndex(entity.MHJACCARD, <span class="hljs-number">16</span>). <span class="hljs-comment">// mh_lsh_band: band count</span>
        WithElementBitWidth(<span class="hljs-number">64</span>).                    <span class="hljs-comment">// Must match signature bit width</span>
        WithRawData(<span class="hljs-literal">true</span>))                          <span class="hljs-comment">// Required for Jaccard refinement</span>

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

err = loadTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;minhash_signature&quot;,
        &quot;metricType&quot;: &quot;MHJACCARD&quot;,
        &quot;indexType&quot;: &quot;MINHASH_LSH&quot;,
        &quot;params&quot;: {
            &quot;mh_element_bit_width&quot;: 64,
            &quot;mh_lsh_band&quot;: 16,
            &quot;with_raw_data&quot;: true
        }
    }
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول معلمات إنشاء الفهرس، راجع <a href="/docs/ar/minhash-lsh.md#Index-building-params">معلمات إنشاء الفهرس</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">إدراج البيانات<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة لكل مستند، قم بإعداد:</p>
<ul>
<li><p>توقيع MinHash ثنائي</p></li>
<li><p>سلسلة رموز مميزة متسلسلة</p></li>
<li><p>(اختياريًا) النص الأصلي</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">إجراء بحث التشابه<button data-href="#Perform-similarity-search" class="anchor-icon" translate="no">
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
    </button></h3><p>يدعم Milvus وضعين للبحث عن التشابه باستخدام MinHash LSH:</p>
<ul>
<li><p><strong>البحث التقريبي</strong> — يستخدم توقيعات MinHash و LSH فقط للحصول على نتائج سريعة ولكنها احتمالية.</p></li>
<li><p><strong>البحث الدقيق</strong> — يعيد حساب تشابه جاكارد باستخدام مجموعات الرموز الأصلية لتحسين الدقة.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 إعداد الاستعلام</h4><p>لإجراء بحث عن التشابه، قم بإنشاء توقيع MinHash لمستند الاستعلام. يجب أن يتطابق هذا التوقيع مع نفس البعد وتنسيق الترميز المستخدمين أثناء إدراج البيانات.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 البحث التقريبي (LSH فقط)</h4><p>يتميز هذا النوع بالسرعة وقابلية التوسع، ولكنه قد يغفل التطابقات القريبة أو يتضمن نتائج إيجابية خاطئة:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">approxResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = approxResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> approxResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {},</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

approxResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// querySig holds the query signature as a []byte</span>
approxResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; approxResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := approxResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-approxResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {}
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 البحث المُحسّن (موصى به لضمان الدقة):</h4><p>يتيح هذا إجراء مقارنة Jaccard دقيقة باستخدام مجموعات الرموز الأصلية المخزنة في Milvus. وهو أبطأ قليلاً ولكنه موصى به للمهام التي تتطلب جودة عالية:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>, <span class="hljs-literal">true</span>); <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;refine_k&quot;</span>, <span class="hljs-number">5</span>);                  <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">refinedResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = refinedResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> refinedResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mh_search_with_jaccard</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-attr">refine_k</span>: <span class="hljs-number">5</span>,                  <span class="hljs-comment">// Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    },</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

refinedResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

<span class="highlighted-comment-line">annParam := index.NewMinHashLSHAnnParam().</span>
<span class="highlighted-comment-line">    WithSearchWithJACCARD(<span class="hljs-literal">true</span>). <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">    WithRefineK(<span class="hljs-number">5</span>)               <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a []byte</span>
refinedResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-comment-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
<span class="highlighted-comment-line">    WithAnnParam(annParam).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; refinedResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := refinedResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-refinedResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {
        &quot;mh_search_with_jaccard&quot;: true,
        &quot;refine_k&quot;: 5
    }
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">معلمات الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم هذا القسم نظرة عامة على المعلمات المستخدمة لإنشاء فهرس وإجراء عمليات البحث فيه.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات إنشاء الفهرس<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/minhash-lsh.md#Build-index-parameters-and-create-collection">إنشاء فهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>عرض البت لكل قيمة تجزئة في توقيع MinHash. يجب أن يكون قابلاً للقسمة على 8.</p></td>
     <td><p>8، 16، 32، 64</p></td>
     <td><p>استخدم <code translate="no">32</code> للحصول على أداء ودقة متوازنين. استخدم <code translate="no">64</code> للحصول على دقة أعلى مع مجموعات بيانات أكبر. استخدم <code translate="no">16</code> لتوفير الذاكرة مع فقدان مقبول في الدقة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>عدد النطاقات التي يتم تقسيم توقيع MinHash إليها من أجل LSH. يتحكم في التوازن بين الاسترجاع والأداء.</p></td>
     <td><p>[1، <em>طول_التوقيع</em>]</p></td>
     <td><p>بالنسبة للتوقيعات ذات الأبعاد الـ 128: ابدأ بـ 32 نطاقًا (4 قيم لكل نطاق). قم بزيادة العدد إلى 64 للحصول على استرجاع أعلى، وقم بتخفيضه إلى 16 للحصول على أداء أفضل. يجب تقسيم طول التوقيع بالتساوي.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>ما إذا كان سيتم تخزين رموز التجزئة LSH في ذاكرة مجهولة (<code translate="no">true</code>) أو استخدام تعيين الذاكرة (<code translate="no">false</code>).</p></td>
     <td><p>صحيح، خطأ</p></td>
     <td><p>استخدم <code translate="no">false</code> لمجموعات البيانات الكبيرة (&gt;1M مجموعة) لتقليل استخدام الذاكرة. استخدم <code translate="no">true</code> لمجموعات البيانات الأصغر التي تتطلب أقصى سرعة بحث.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>تحديد ما إذا كان سيتم تخزين توقيعات MinHash الأصلية جنبًا إلى جنب مع رموز LSH من أجل التحسين.</p></td>
     <td><p>صحيح، خطأ</p></td>
     <td><p>استخدم <code translate="no">true</code> عندما تكون الدقة العالية مطلوبة وتكون تكلفة التخزين مقبولة. استخدم <code translate="no">false</code> لتقليل عبء التخزين مع انخفاض طفيف في الدقة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>احتمال الإيجابية الكاذبة لمرشح بلوم المستخدم في تحسين دلو LSH.</p></td>
     <td><p>[0.001، 0.1]</p></td>
     <td><p>استخدم <code translate="no">0.01</code> لتحقيق التوازن بين استخدام الذاكرة والدقة. القيم الأقل (<code translate="no">0.001</code>) تقلل من النتائج الإيجابية الخاطئة ولكنها تزيد من استهلاك الذاكرة. القيم الأعلى (<code translate="no">0.05</code>) توفر الذاكرة ولكنها قد تقلل من الدقة.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">معلمات البحث الخاصة بالفهرس<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/minhash-lsh.md#Perform-similarity-search">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>تحديد ما إذا كان سيتم إجراء حساب تشابه جاكارد الدقيق على النتائج المرشحة للتحسين.</p></td>
     <td><p>صحيح، خطأ</p></td>
     <td><p>استخدم " <code translate="no">true</code> " للتطبيقات التي تتطلب دقة عالية (مثل إزالة التكرارات). استخدم " <code translate="no">false</code> " لإجراء بحث تقريبي أسرع عندما يكون فقدان الدقة الطفيف مقبولًا.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>عدد النتائج المرشحة المطلوب استرجاعها قبل التحسين باستخدام معامل جاكارد. لا يكون هذا الخيار فعالًا إلا عندما تكون قيمة <code translate="no">mh_search_with_jaccard</code> هي <code translate="no">true</code>.</p></td>
     <td><p>[<em>top_k</em>, <em>top_k &amp;ast; 10</em>]</p></td>
     <td><p>اضبطه على 2-5 أضعاف القيمة المطلوبة <em>لـ top_k</em> لتحقيق توازن جيد بين الاسترجاع والأداء. تؤدي القيم الأعلى إلى تحسين الاسترجاع ولكنها تزيد من تكلفة الحساب.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>ما إذا كان سيتم تمكين تحسين الدُفعات لعدة استعلامات متزامنة.</p></td>
     <td><p>صحيح، خطأ</p></td>
     <td><p>استخدم <code translate="no">true</code> عند البحث باستخدام استعلامات متعددة في وقت واحد لتحقيق إنتاجية أفضل. استخدم <code translate="no">false</code> في سيناريوهات الاستعلام الفردي لتقليل الحمل الزائد على الذاكرة.</p></td>
   </tr>
</table>
