---
id: linear-decay.md
title: الاضمحلال الخطيCompatible with Milvus 2.6.x
summary: >-
  ينشئ التضاؤل الخطي انخفاضًا في خط مستقيم ينتهي عند نقطة الصفر المطلق في نتائج
  بحثك. على غرار العد التنازلي للحدث القادم حيث تتلاشى الأهمية تدريجيًا حتى
  انقضاء الحدث، يطبق التضاؤل الخطي انخفاضًا ثابتًا ومتوقعًا في الأهمية مع ابتعاد
  العناصر عن النقطة المثالية حتى تختفي تمامًا. يُعد هذا النهج مثاليًا عندما تريد
  معدل اضمحلال ثابت مع قطع واضح، مما يضمن استبعاد العناصر التي تتجاوز حدًا
  معينًا تمامًا من النتائج.
beta: Milvus 2.6.x
---
<h1 id="Linear-Decay" class="common-anchor-header">الاضمحلال الخطي<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Linear-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>ينشئ التضاؤل الخطي خطًا مستقيمًا ينتهى عند نقطة الصفر المطلق في نتائج بحثك. على غرار العد التنازلي للحدث القادم حيث تتلاشى الأهمية تدريجيًا حتى انقضاء الحدث، يطبق التضاؤل الخطي انخفاضًا ثابتًا ومتوقعًا في الأهمية مع ابتعاد العناصر عن النقطة المثالية حتى تختفي تمامًا. يُعد هذا الأسلوب مثاليًا عندما تريد معدل اضمحلال ثابت مع حد فاصل واضح، مما يضمن استبعاد العناصر التي تتجاوز حدًا معينًا تمامًا من النتائج.</p>
<p>على عكس دوال الاضمحلال الأخرى:</p>
<ul>
<li><p>يتبع الاضمحلال الغاوسي منحنى جرس يقترب تدريجيًا من الصفر ولكنه لا يصل أبدًا إلى الصفر</p></li>
<li><p>يحافظ الاضمحلال الأسي على ذيل طويل من الحد الأدنى من الأهمية يمتد إلى أجل غير مسمى</p></li>
</ul>
<p>ينشئ الاضمحلال الخطي بشكل فريد نقطة نهاية محددة، مما يجعله فعالاً بشكل خاص للتطبيقات ذات الحدود الطبيعية أو المواعيد النهائية.</p>
<h2 id="When-to-use-linear-decay" class="common-anchor-header">متى تستخدم التضاؤل الخطي<button data-href="#When-to-use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>التضاؤل الخطي فعال بشكل خاص في:</p>
<table>
   <tr>
     <th><p>حالة الاستخدام</p></th>
     <th><p>مثال</p></th>
     <th><p>لماذا يعمل التضاؤل الخطي بشكل جيد</p></th>
   </tr>
   <tr>
     <td><p>قوائم الأحداث</p></td>
     <td><p>منصات تذاكر الحفلات الموسيقية</p></td>
     <td><p>يضع حداً فاصلاً واضحاً للأحداث في المستقبل البعيد جداً</p></td>
   </tr>
   <tr>
     <td><p>العروض محدودة الوقت</p></td>
     <td><p>التخفيضات السريعة والعروض الترويجية</p></td>
     <td><p>يضمن عدم ظهور العروض منتهية الصلاحية أو التي ستنتهي صلاحيتها قريباً</p></td>
   </tr>
   <tr>
     <td><p>نصف قطر التوصيل</p></td>
     <td><p>توصيل الطعام وخدمات البريد السريع</p></td>
     <td><p>يفرض حدوداً جغرافية صارمة</p></td>
   </tr>
   <tr>
     <td><p>المحتوى المقيد عمرياً</p></td>
     <td><p>منصات المواعدة، خدمات الوسائط</p></td>
     <td><p>وضع حدود عمرية ثابتة</p></td>
   </tr>
</table>
<p>اختر الاضمحلال الخطي عندما:</p>
<ul>
<li><p>يحتوي تطبيقك على حدود أو موعد نهائي أو عتبة طبيعية</p></li>
<li><p>يجب استبعاد العناصر التي تتجاوز نقطة معينة تمامًا من النتائج</p></li>
<li><p>تحتاج إلى معدل انخفاض متسق يمكن التنبؤ به ومتسق في الأهمية</p></li>
<li><p>يجب أن يرى المستخدمون فرقاً واضحاً بين العناصر ذات الصلة وغير ذات الصلة</p></li>
</ul>
<h2 id="Steady-decline-principle" class="common-anchor-header">مبدأ الانحدار الثابت<button data-href="#Steady-decline-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>يخلق الاضمحلال الخطي انخفاضًا مستقيمًا ينخفض بمعدل ثابت حتى يصل إلى الصفر تمامًا. يظهر هذا النمط في العديد من السيناريوهات اليومية مثل مؤقتات العد التنازلي، ونضوب المخزون، واقتراب الموعد النهائي حيث يكون للملاءمة نقطة انتهاء صلاحية واضحة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/linear-decay.png" alt="Linear Decay" class="doc-image" id="linear-decay" />
   </span> <span class="img-wrapper"> <span>التضاؤل الخطي</span> </span></p>
<p>يوضح الرسم البياني أعلاه كيف سيؤثر الاضمحلال الخطي على قوائم الأحداث على منصة بيع التذاكر:</p>
<ul>
<li><p><code translate="no">origin</code> (التاريخ الحالي): اللحظة الحالية، حيث تكون الملاءمة في أقصى حد لها (1.0).</p></li>
<li><p><code translate="no">offset</code> (يوم واحد): "نافذة "الأحداث الفورية" - جميع الأحداث التي تحدث خلال اليوم التالي تحافظ على درجات الملاءمة الكاملة (1.0)، مما يضمن عدم معاقبة الأحداث الوشيكة جدًا بسبب الاختلافات الزمنية الطفيفة.</p></li>
<li><p><code translate="no">decay</code> (0.5): الدرجة على مسافة المقياس-يتحكم هذا المتغير في معدل انخفاض الملاءمة.</p></li>
<li><p><code translate="no">scale</code> (10 أيام): الفترة الزمنية التي تنخفض عندها الملاءمة إلى قيمة الاضمحلال-الأحداث التي تبعد 10 أيام تنخفض درجات الملاءمة إلى النصف (0.5).</p></li>
</ul>
<p>كما ترى من منحنى الخط المستقيم، فإن الأحداث التي تبعد 16 يومًا تقريبًا تكون أهميتها صفرًا تمامًا ولن تظهر في نتائج البحث على الإطلاق. يؤدي هذا إلى إنشاء حدود واضحة تضمن أن يرى المستخدمون الأحداث القادمة ذات الصلة فقط ضمن نافذة زمنية محددة.</p>
<p>يعكس هذا السلوك الطريقة التي يعمل بها تخطيط الأحداث عادةً - الأحداث الوشيكة هي الأكثر صلة، والأحداث في الأسابيع القادمة لها أهمية متناقصة، والأحداث البعيدة جدًا في المستقبل (أو التي مضت بالفعل) يجب ألا تظهر على الإطلاق.</p>
<h2 id="Formula" class="common-anchor-header">الصيغة<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>المعادلة الرياضية لحساب درجة التضاؤل الخطي هي</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>d</mi><mi>o</mi><mi>c</mi><mo stretchy="false">)</mo><mo>=</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mfrac><mrow><mi>s</mi><mo>−</mo><mi>max</mi><mo>⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi mathvariant="normal">∣</mi><mi>f</mi><mi>i</mi><mi>e</mi><mi>l</mi><mi>d</mi><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><msub><mi>e</mi><mrow><mi>d</mi><mi>o</mi><mi>c</mi></mrow></msub><mo>−</mo><mi>o</mi><mi>r</mi><mi>i</mi><mi>g</mi><mi>i</mi><mi>n</mi><mi mathvariant="normal">∣</mi><mo>−</mo><mi>o</mi><mi>f</mi><mi>f</mi><mi>s</mi><mi>e</mi><mi>t</mi><mo stretchy="false">)</mo></mrow><mi>s</mi></mfrac><mo separator="true">,</mo><mn>0</mn><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(doc) = \max\left( \frac{s - \max(0, |fieldvalue_{doc} - origin| - offset)}{s}, 0 \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">oc</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">∣</span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">oc</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">in</span><span class="mord">∣</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.10764em;">ff</span><span class="mord mathnormal">se</span><span class="mord mathnormal">t</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">0</span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span></span></span></span></span></p>
<p>أين:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>s</mi><mo>=</mo><mfrac><mrow><mi>s</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>e</mi></mrow><mrow><mo stretchy="false">(</mo><mn>1.0</mn><mo>−</mo><mi>d</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>y</mi><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">s = \frac{scale}{(1.0 - decay)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.3074em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mopen">(</span><span class="mord">1.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mclose">)</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">sc</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">e</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>بتوضيح ذلك بلغة بسيطة</p>
<ol>
<li><p>Calculate how far the field value is from the origin: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> ∣fieldvaluedoc−origin∣|fieldvalue_{doc} - origin|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">∣fieldvalue</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">doc​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">origin∣</span></span></span></span></p></li>
<li><p>اطرح الإزاحة (إن وجدت) ولكن لا تنخفض أبدًا إلى ما دون الصفر: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>الحد الأقصى</mi><mo stretchy="false">(</mo><mo separator="true">0،</mo><mi>المسافة-</mi><mi>الإزاحة</mi><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\الحد الأقصى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(0، المسافة- الإزاحة)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">الحد الأقص</span></span><span class="base"><span class="mord mathnormal">ى (0،</span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord mathnormal">المسافة</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord mathnormal">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"> <span class="strut" style="height:1em;vertical-align:-0.25em;"></span> <span class="mord mathnormal">الإزاحة</span><span class="mclose">)</span></span></span></span></p></li>
<li><p>حدد البارامتر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s من قيم المقياس والتضاؤل.</p></li>
<li><p>اطرح المسافة المعدلة من <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s واقسم على <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s</p></li>
<li><p>تأكد من أن النتيجة لا تنخفض أبدًا إلى ما دون الصفر: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>ماكس</mi><mo stretchy="false">(</mo><mo separator="true">النتيجة،</mo></mrow></semantics></math></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\ ماكس <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(النتيجة، 0)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">ماكس</span><span class="mopen">(</span><span class="mpunct">النتيجة،</span><span class="mspace" style="margin-right:0.1667em;"></span></span></span></span> 0 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">)</span></span></span></span></p></li>
</ol>
<p>تقوم عملية حساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s بتحويل معلمات المقياس والتضاؤل إلى النقطة التي تصل فيها النتيجة إلى صفر. على سبيل المثال، مع التضاؤل = 0.5 والمقياس = 7، ستصل الدرجة إلى الصفر تمامًا عند المسافة = 14 (ضعف قيمة المقياس).</p>
<h2 id="Use-linear-decay" class="common-anchor-header">استخدام التضاؤل الخطي<button data-href="#Use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن تطبيق الاضمحلال الخطي على كل من عمليات البحث المتجه القياسية وعمليات البحث المختلطة في ميلفوس. فيما يلي مقتطفات التعليمات البرمجية الرئيسية لتطبيق هذه الميزة.</p>
<div class="alert note">
<p>قبل استخدام دوال التضاؤل الخطي، يجب عليك أولاً إنشاء مجموعة تحتوي على حقول رقمية مناسبة (مثل الطوابع الزمنية والمسافات وغيرها) والتي سيتم استخدامها لحسابات التضاؤل. للحصول على أمثلة عملية كاملة بما في ذلك إعداد المجموعة، وتعريف المخطط، وإدراج البيانات، راجع <a href="/docs/ar/tutorial-implement-a-time-based-ranking-in-milvus.md">البرنامج التعليمي لمصنف التضاؤل</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">إنشاء مصنف اضمحلال</h3><p>بعد إعداد المجموعة الخاصة بك مع حقل رقمي (في هذا المثال، <code translate="no">event_date</code> كثوانٍ من الآن)، قم بإنشاء مصنف اضمحلال خطي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># Calculate current time</span>
current_time = <span class="hljs-built_in">int</span>(time.time())

<span class="hljs-comment"># Create a linear decay ranker for event listings</span>
ranker = Function(
    name=<span class="hljs-string">&quot;event_relevance&quot;</span>,               <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;event_date&quot;</span>],     <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;linear&quot;</span>,             <span class="hljs-comment"># Choose linear decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,           <span class="hljs-comment"># Current time</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,           <span class="hljs-comment"># 12 hour immediate events window</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>         <span class="hljs-comment"># 7 days (in seconds)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">تطبيقه على البحث المتجه القياسي</h3><p>بعد تحديد مصنف الاضمحلال الخاص بك، يمكنك تطبيقه أثناء عمليات البحث عن طريق تمريره إلى المعلمة <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],              <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">تطبيقه على البحث الهجين</h3><p>يمكن أيضًا تطبيق مصنفات الاضمحلال على عمليات البحث المختلط التي تجمع بين حقول متجهات متعددة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span>
<span class="highlighted-wrapper-line">    limit=<span class="hljs-number">10</span>,</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول عمليات البحث المختلط، راجع <a href="/docs/ar/multi-vector-search.md">البحث المختلط متعدد المتجهات</a>.</p>
