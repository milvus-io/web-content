---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  يُعد إلغاء التكرار والبحث عن التشابه بكفاءة أمرًا بالغ الأهمية لمجموعات بيانات
  التعلم الآلي واسعة النطاق، خاصةً بالنسبة لمهام مثل تنظيف مجموعات التدريب
  لنماذج اللغات الكبيرة (LLMs). عند التعامل مع ملايين أو مليارات المستندات، تصبح
  المطابقة الدقيقة التقليدية بطيئة ومكلفة للغاية.
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
    </button></h1><p>يعد إلغاء التكرار والبحث عن التشابه بكفاءة أمرًا بالغ الأهمية لمجموعات بيانات التعلم الآلي واسعة النطاق، خاصةً بالنسبة لمهام مثل تنظيف مجموعات التدريب لنماذج اللغات الكبيرة (LLMs). عند التعامل مع ملايين أو مليارات المستندات، تصبح المطابقة التامة التقليدية بطيئة ومكلفة للغاية.</p>
<p>يُتيح فهرس <strong>MINHASH_LSH</strong> في Milvus إمكانية إلغاء البيانات المكررة التقريبية السريعة والقابلة للتطوير والدقيقة من خلال الجمع بين تقنيتين قويتين:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: يولد بسرعة توقيعات مضغوطة (أو "بصمات أصابع") لتقدير تشابه المستندات.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">التجزئة الحساسة للموقع (LSH)</a>: العثور بسرعة على مجموعات من المستندات المتشابهة بناءً على توقيعات MinHash الخاصة بها.</p></li>
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">تشابه جاكارد</h3><p>يقيس تشابه جاكارد التداخل بين مجموعتين (أ) و(ب)، ويُعرّف رسميًا على النحو التالي:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>حيث تتراوح قيمته من 0 (منفصلتان تمامًا) إلى 1 (متطابقتان).</p>
<p>ومع ذلك، فإن حساب تشابه جاكارد بالضبط بين جميع أزواج المستندات في مجموعات البيانات واسعة النطاق مكلف حسابيًا - O<strong>(n²)</strong> من حيث الوقت والذاكرة عندما يكون <strong>n</strong> كبيرًا. هذا يجعلها غير مجدية لحالات الاستخدام مثل تنظيف مجموعة تدريب LLM أو تحليل المستندات على نطاق الويب.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">تواقيع MinHash: تشابه جاكارد التقريبي</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> هي تقنية احتمالية توفر طريقة فعالة لتقدير تشابه جاكارد. وهي تعمل عن طريق تحويل كل مجموعة إلى <strong>متجه توقيع</strong> مضغوط، مع الحفاظ على معلومات كافية لتقريب تشابه المجموعة بكفاءة.</p>
<p><strong>الفكرة الأساسية</strong>:</p>
<p>كلما زاد تشابه المجموعتين، زادت احتمالية تطابق توقيعات MinHash الخاصة بهما في نفس المواضع. تمكّن هذه الخاصية MinHash من تقريب تشابه جاكارد بين المجموعتين.</p>
<p>تسمح هذه الخاصية ل MinHash بتقريب <strong>تشابه جاكارد</strong> بين المجموعتين دون الحاجة إلى مقارنة المجموعتين الكاملتين مباشرةً.</p>
<p>تتضمن عملية MinHash MinHash:</p>
<ol>
<li><p><strong>التجزئة</strong>: تحويل المستندات إلى مجموعات من التسلسلات الرمزية المتداخلة (التجزئة)</p></li>
<li><p><strong>التجزئة</strong>: تطبيق دوال تجزئة مستقلة متعددة على كل تجزئة</p></li>
<li><p><strong>التحديد الأدنى</strong>: بالنسبة لكل دالة تجزئة، قم بتسجيل <strong>الحد الأدنى</strong> لقيمة التجزئة عبر جميع التجزئات</p></li>
</ol>
<p>يمكنك رؤية العملية بأكملها موضحة أدناه:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل التجزئة المصغرة</span> </span></p>
<div class="alert note">
<p>يحدد عدد دوال التجزئة المستخدمة بُعدية توقيع MinHash. توفر الأبعاد الأعلى دقة تقريب أفضل، على حساب زيادة التخزين والحساب.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH ل MinHash</h3><p>في حين أن توقيعات MinHash MinHash تقلل بشكل كبير من تكلفة حساب تشابه Jaccard الدقيق بين المستندات، إلا أن المقارنة الشاملة بين كل زوج من متجهات التوقيع لا تزال غير فعالة على نطاق واسع.</p>
<p>لحل هذه المشكلة، يتم استخدام <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a>. يتيح LSH إمكانية البحث التقريبي السريع عن التشابه التقريبي من خلال ضمان تجزئة العناصر المتشابهة في نفس "الدلو" باحتمالية عالية - مما يجنب الحاجة إلى مقارنة كل زوج مباشرةً.</p>
<p>تتضمن العملية:</p>
<ol>
<li><p><strong>تجزئة التواقيع:</strong></p>
<p>يتم تقسيم توقيع MinHash <em>ذي الأبعاد n إلى نطاقات</em> <em>b</em>. يحتوي كل نطاق على <em>ص من</em> قيم التجزئة المتتالية، وبالتالي فإن طول التوقيع الإجمالي يحقق: <em>n = b × r</em>.</p>
<p>على سبيل المثال، إذا كان لديك توقيع MinHash ذو 128 بُعدًا<em>(n = 128</em>) وقسمته إلى 32 نطاقًا<em>(b = 32</em>)، فإن كل نطاق يحتوي على 4 قيم تجزئة<em>(r = 4</em>).</p></li>
<li><p><strong>التجزئة على مستوى النطاق:</strong></p>
<p>بعد التجزئة، تتم معالجة كل نطاق بشكل مستقل باستخدام دالة تجزئة قياسية لتعيينه إلى دلو. إذا أنتج توقيعان نفس قيمة التجزئة داخل النطاق - أي أنهما يقعان في نفس الدلو - يتم اعتبارهما متطابقين محتملين.</p></li>
<li><p><strong>اختيار المرشح:</strong></p>
<p>يتم اختيار الأزواج التي تتطابق في نطاق واحد على الأقل كمرشحين للتشابه.</p></li>
</ol>
<div class="alert note">
<p>لماذا تعمل هذه الطريقة؟</p>
<p>رياضياً، إذا كان هناك توقيعان متشابهان في جاكارد <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">s</annotation></semantics></math></span></span>,</p>
<ul>
<li><p>يكون احتمال تطابقهما في صف واحد (موضع التجزئة) هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s</p></li>
<li><p><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span>احتمالية تطابقهما في جميع الصفوف في النطاق هي</span></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p>احتمال تطابقهما في <strong>نطاق واحد على الأقل</strong> هو:</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>لمزيد من التفاصيل، راجع <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">التجزئة الحساسة للموقع</a>.</p>
</div>
<p>ضع في اعتبارك ثلاثة مستندات بتوقيعات MinHash ذات 128 بُعدًا:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>سير عمل Lsh 1</span> </span></p>
<p>أولاً، يقسّم LSH التوقيع ذا ال 128 بُعدًا إلى 32 نطاقًا كل منها 4 قيم متتالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>سير عمل Lsh 2</span> </span></p>
<p>بعد ذلك، يتم تجزئة كل نطاق إلى دلاء مختلفة باستخدام دالة تجزئة. يتم اختيار أزواج المستندات التي تشترك في دلاء كمرشحين للتشابه. في المثال أدناه، يتم اختيار المستند A والمستند B كمرشحين للتشابه حيث تتطابق نتائج التجزئة الخاصة بهما في <strong>النطاق 0</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>سير عمل Lsh 3</span> </span></p>
<div class="alert note">
<p>يتم التحكم في عدد النطاقات بواسطة المعلمة <code translate="no">mh_lsh_band</code>. لمزيد من المعلومات، راجع <a href="/docs/ar/minhash-lsh.md#Index-building-params">بارامترات بناء الفهرس</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD: مقارنة توقيعات MinHash MinHash في ميلفوس</h3><p>تقارب تواقيع MinHash توقيعات MinHash تشابه جاكارد بين المجموعات باستخدام متجهات ثنائية ذات طول ثابت. ومع ذلك، نظرًا لأن هذه التواقيع لا تحافظ على المجموعات الأصلية، فلا يمكن تطبيق المقاييس القياسية مثل <code translate="no">JACCARD</code> أو <code translate="no">L2</code> أو <code translate="no">COSINE</code> مباشرةً لمقارنتها.</p>
<p>لمعالجة هذه المشكلة، يقدم Milvus نوع مقياس متخصص يسمى <code translate="no">MHJACCARD</code> ، مصمم خصيصًا لمقارنة تواقيع MinHash.</p>
<p>عند استخدام MinHash في Milvus:</p>
<ul>
<li><p>يجب أن يكون الحقل المتجه من النوع <code translate="no">BINARY_VECTOR</code></p></li>
<li><p>يجب أن يكون <code translate="no">index_type</code> <code translate="no">MINHASH_LSH</code> (أو <code translate="no">BIN_FLAT</code>)</p></li>
<li><p>يجب تعيين <code translate="no">metric_type</code> على <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>سيكون استخدام مقاييس أخرى إما غير صالح أو سيؤدي إلى نتائج غير صحيحة.</p>
<p>لمزيد من المعلومات حول هذا النوع من المقاييس، راجع <a href="/docs/ar/metric.md#MHJACCARD">MHJACCARD</a>.</p>
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
    </button></h2><p>قبل استخدام MinHash LSH في Milvus، يجب عليك أولاً إنشاء <strong>تواقيع MinHash</strong>. تقارب هذه التواقيع الثنائية المدمجة تشابه جاكارد بين المجموعات وهي مطلوبة للبحث المستند إلى <code translate="no">MHJACCARD</code> في ملفوس.</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">اختر طريقة لتوليد تواقيع MinHash</h3><p>اعتمادًا على عبء العمل الخاص بك، يمكنك اختيار:</p>
<ul>
<li><p>استخدام Python <code translate="no">datasketch</code> للتبسيط (موصى به للنماذج الأولية)</p></li>
<li><p>استخدام الأدوات الموزعة (مثل Spark وRay) لمجموعات البيانات واسعة النطاق</p></li>
<li><p>تنفيذ منطق مخصص (NumPy، C++C، إلخ) إذا كان ضبط الأداء أمرًا بالغ الأهمية</p></li>
</ul>
<p>في هذا الدليل، نستخدم <code translate="no">datasketch</code> للتبسيط والتوافق مع تنسيق إدخال ميلفوس.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">تثبيت المكتبات المطلوبة</h3><p>قم بتثبيت الحزم اللازمة لهذا المثال:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">توليد تواقيع MinHash</h3><p>سننشئ تواقيع MinHash ذات 256 بُعدًا، مع تمثيل كل قيمة تجزئة كعدد صحيح 64 بت. يتوافق هذا مع تنسيق المتجه المتوقع لـ <code translate="no">MINHASH_LSH</code>.</p>
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
<p>كل توقيع هو 256 × 64 بت = 2048 بايت. يمكن إدراج سلسلة البايت هذه مباشرة في حقل Milvus <code translate="no">BINARY_VECTOR</code>. لمزيد من المعلومات حول المتجهات الثنائية المستخدمة في ملفوس، راجع <a href="/docs/ar/binary-vector.md">المتجه الثنائي</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(اختياري) إعداد مجموعات الرموز الخام (للبحث المكرر)</h3><p>بشكل افتراضي، يستخدم Milvus تواقيع MinHash وفهرس LSH فقط للعثور على الجيران التقريبي. هذا سريع ولكنه قد يُرجع نتائج إيجابية خاطئة أو قد يفوتك تطابق تقريبي.</p>
<p>إذا كنت تريد <strong>تشابه جاكارد دقيق،</strong> فإن ميلفوس يدعم البحث المنقح الذي يستخدم مجموعات الرموز الأصلية. لتمكينه</p>
<ul>
<li><p>تخزين مجموعات الرموز كحقل منفصل <code translate="no">VARCHAR</code> </p></li>
<li><p>قم بتعيين <code translate="no">&quot;with_raw_data&quot;: True</code> عند <a href="/docs/ar/minhash-lsh.md#Build-index-parameters-and-create-collection">إنشاء معلمات الفهرس</a></p></li>
<li><p>وتمكين <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> عند <a href="/docs/ar/minhash-lsh.md#Perform-similarity-search">إجراء بحث التشابه</a></p></li>
</ul>
<p><strong>مثال على استخراج مجموعة الرموز الرمزية</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">استخدام MinHash LSH في ميلفوس<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن تصبح ناقلات MinHash ومجموعات الرموز الأصلية جاهزة، يمكنك تخزينها وفهرستها والبحث فيها باستخدام Milvus مع <code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">الاتصال بـ Milvus</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">تعريف مخطط المجموعة</h3><p>قم بتعريف مخطط بـ</p>
<ul>
<li><p>المفتاح الأساسي</p></li>
<li><p>حقل <code translate="no">BINARY_VECTOR</code> لتوقيعات MinHash MinHash</p></li>
<li><p>حقل <code translate="no">VARCHAR</code> لمجموعة الرموز الأصلية (إذا تم تمكين البحث المنقح)</p></li>
<li><p>اختياريًا، حقل <code translate="no">document</code> للنص الأصلي</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">إنشاء معلمات الفهرس وإنشاء مجموعة</h3><p>بناء فهرس <code translate="no">MINHASH_LSH</code> مع تمكين تنقيح جاكارد:</p>
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
<p>لمزيد من المعلومات حول معلمات بناء الفهرس، راجع <a href="/docs/ar/minhash-lsh.md#Index-building-params">بارامز بناء الفهرس</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">إدراج البيانات</h3><p>لكل مستند، قم بإعداد</p>
<ul>
<li><p>توقيع ثنائي MinHash ثنائي</p></li>
<li><p>سلسلة مجموعة رموز متسلسلة</p></li>
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
<h3 id="Perform-similarity-search" class="common-anchor-header">إجراء بحث التشابه</h3><p>يدعم ميلفوس طريقتين للبحث عن التشابه باستخدام MinHash LSH:</p>
<ul>
<li><p><strong>البحث التقريبي</strong> - يستخدم فقط توقيعات MinHash و LSH للحصول على نتائج سريعة ولكن احتمالية.</p></li>
<li><p><strong>البحث المنقح</strong> - إعادة حساب تشابه جاكارد باستخدام مجموعات الرموز الأصلية لتحسين الدقة.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 إعداد الاستعلام</h4><p>لإجراء بحث تشابه، قم بإنشاء توقيع MinHash لمستند الاستعلام. يجب أن يتطابق هذا التوقيع مع نفس البعد وتنسيق الترميز المستخدم أثناء إدراج البيانات.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 البحث التقريبي (LSH فقط)</h4><p>هذا سريع وقابل للتطوير ولكن قد يفوتك تطابق قريب أو قد يتضمن نتائج إيجابية خاطئة:</p>
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
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 البحث المنقح (موصى به من أجل الدقة):</h4><p>يتيح ذلك إجراء مقارنة دقيقة بين جاكارد باستخدام مجموعات الرموز الأصلية المخزنة في ميلفوس. إنه أبطأ قليلاً ولكن يوصى به للمهام الحساسة للجودة:</p>
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
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">بارامترات الفهرس<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم هذا القسم نظرة عامة على المعلمات المستخدمة لبناء الفهرس وإجراء عمليات البحث على الفهرس.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">params</code> عند <a href="/docs/ar/minhash-lsh.md#Build-index-parameters-and-create-collection">إنشاء فهرس</a>.</p>
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
     <td><p>8, 16, 32, 64</p></td>
     <td><p>استخدم <code translate="no">32</code> للحصول على أداء ودقة متوازنين. استخدم <code translate="no">64</code> للحصول على دقة أعلى مع مجموعات بيانات أكبر. استخدم <code translate="no">16</code> لحفظ الذاكرة مع خسارة مقبولة في الدقة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>عدد النطاقات لتقسيم توقيع MinHash لـ LSH. يتحكم في المفاضلة بين الاستدعاء والأداء.</p></td>
     <td><p>[1، <em>طول_التوقيع</em>]</p></td>
     <td><p>للتوقيعات ذات 128 نطاقًا: ابدأ ب 32 نطاقًا (4 قيم/نطاق). قم بالزيادة إلى 64 لاستدعاء أعلى، وقلل إلى 16 لأداء أفضل. يجب تقسيم طول التوقيع بالتساوي.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>ما إذا كان يجب تخزين رموز تجزئة LSH في ذاكرة مجهولة (<code translate="no">true</code>) أو استخدام تعيين الذاكرة (<code translate="no">false</code>).</p></td>
     <td><p>صواب، خطأ</p></td>
     <td><p>استخدم <code translate="no">false</code> لمجموعات البيانات الكبيرة (&gt; 1 مليون مجموعة) لتقليل استخدام الذاكرة. استخدم <code translate="no">true</code> لمجموعات البيانات الأصغر التي تتطلب أقصى سرعة بحث.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>ما إذا كان سيتم تخزين توقيعات MinHash الأصلية إلى جانب رموز LSH للتنقيح.</p></td>
     <td><p>صواب، خطأ</p></td>
     <td><p>استخدم <code translate="no">true</code> عند الحاجة إلى دقة عالية وتكلفة تخزين مقبولة. استخدم <code translate="no">false</code> لتقليل نفقات التخزين الزائدة مع تقليل الدقة بشكل طفيف.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>الاحتمال الإيجابي الخاطئ لمرشح بلوم المستخدم في تحسين دلو LSH.</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>استخدم <code translate="no">0.01</code> للحصول على استخدام متوازن للذاكرة والدقة. تقلل القيم المنخفضة (<code translate="no">0.001</code>) من النتائج الإيجابية الخاطئة ولكنها تزيد من الذاكرة. توفر القيم الأعلى (<code translate="no">0.05</code>) الذاكرة ولكنها قد تقلل من الدقة.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">بارامترات البحث الخاصة بالفهرس</h3><p>يسرد الجدول التالي المعلمات التي يمكن تكوينها في <code translate="no">search_params.params</code> عند <a href="/docs/ar/minhash-lsh.md#Perform-similarity-search">البحث في الفهرس</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>ما إذا كان سيتم إجراء حساب تشابه جاكارد الدقيق على النتائج المرشحة للتنقية.</p></td>
     <td><p>صواب، خطأ</p></td>
     <td><p>استخدم <code translate="no">true</code> للتطبيقات التي تتطلب دقة عالية (على سبيل المثال، إلغاء التكرار). استخدم <code translate="no">false</code> للبحث التقريبي الأسرع عندما يكون فقدان الدقة الطفيف مقبولاً.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>عدد المرشحين المطلوب استرجاعهم قبل تنقيح جاكارد. فعال فقط عندما يكون <code translate="no">mh_search_with_jaccard</code> هو <code translate="no">true</code>.</p></td>
     <td><p><em>[top_k</em>, *top_k * 10*]</p></td>
     <td><p>اضبطه على 2-5 أضعاف <em>top_k</em> المطلوب لتحقيق توازن جيد بين الاستدعاء والأداء. تعمل القيم الأعلى على تحسين الاستدعاء ولكنها تزيد من تكلفة الحساب.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>ما إذا كان سيتم تمكين التحسين الدفعي للاستعلامات المتزامنة المتعددة.</p></td>
     <td><p>صواب، خطأ</p></td>
     <td><p>استخدم <code translate="no">true</code> عند البحث باستعلامات متعددة في وقت واحد لتحسين الإنتاجية. استخدم <code translate="no">false</code> لسيناريوهات الاستعلام الفردي لتقليل نفقات الذاكرة الزائدة.</p></td>
   </tr>
</table>
