---
id: exponential-decay.md
title: الانحدار الأسيCompatible with Milvus 2.6.x
summary: >-
  يؤدي التناقص الأسي إلى انخفاض حاد في البداية يتبعه ذيل طويل في نتائج البحث.
  وعلى غرار دورة الأخبار العاجلة، حيث تتضاءل الصلة بالموضوع بسرعة في البداية،
  لكن بعض القصص تحتفظ بأهميتها بمرور الوقت، فإن التناقص الأسي يفرض عقوبة حادة
  على العناصر التي تقع خارج نطاقك المثالي بقليل، مع الحفاظ في الوقت نفسه على
  إمكانية اكتشاف العناصر البعيدة. ويُعد هذا النهج مثاليًّا عندما ترغب في إعطاء
  أولوية كبيرة للقرب أو الحداثة، دون أن ترغب في استبعاد الخيارات الأبعد تمامًا.
beta: Milvus 2.6.x
---
<h1 id="Exponential-Decay" class="common-anchor-header">الانحدار الأسي<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Exponential-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>يؤدي التناقص الأسي إلى انخفاض حاد في البداية يتبعه ذيل طويل في نتائج البحث. مثل دورة الأخبار العاجلة حيث تتضاءل الصلة بالموضوع بسرعة في البداية، لكن بعض القصص تحتفظ بأهميتها بمرور الوقت، فإن التناقص الأسي يفرض عقوبة حادة على العناصر التي تقع خارج نطاقك المثالي مباشرةً، مع الحفاظ في الوقت نفسه على إمكانية اكتشاف العناصر البعيدة. يُعد هذا النهج مثاليًا عندما ترغب في إعطاء أولوية كبيرة للقرب أو الحداثة، لكنك لا تريد استبعاد الخيارات الأبعد تمامًا.</p>
<p>على عكس دوال التناقص الأخرى:</p>
<ul>
<li><p>يؤدي التناقص الغاوسي إلى انخفاض تدريجي أكثر على شكل جرس</p></li>
<li><p>ينخفض التناقص الخطي بمعدل ثابت حتى يصل إلى الصفر تمامًا</p></li>
</ul>
<p>يُطبق التناقص الأسي العقوبة بشكل فريد «مُقدماً»، حيث يُطبق معظم تخفيض الصلة في وقت مبكر مع الحفاظ على ذيل طويل من الصلة الدنيا التي لا تساوي صفرًا.</p>
<h2 id="When-to-use-exponential-decay" class="common-anchor-header">متى تستخدم التناقص الأسي<button data-href="#When-to-use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>يُعد التناقص الأسي فعالاً بشكل خاص في الحالات التالية:</p>
<table>
   <tr>
     <th><p>حالة الاستخدام</p></th>
     <th><p>مثال</p></th>
     <th><p>لماذا يعمل التناقص الأسي بشكل جيد</p></th>
   </tr>
   <tr>
     <td><p>موجزات الأخبار</p></td>
     <td><p>بوابات الأخبار العاجلة</p></td>
     <td><p>يقلل بسرعة من أهمية الأخبار القديمة مع الاستمرار في عرض القصص المهمة التي تعود إلى أيام مضت</p></td>
   </tr>
   <tr>
     <td><p>الخطوط الزمنية لوسائل التواصل الاجتماعي</p></td>
     <td><p>موجزات الأنشطة، تحديثات الحالة</p></td>
     <td><p>تركز على المحتوى الجديد، لكنها تسمح بظهور المحتوى القديم الذي انتشر على نطاق واسع</p></td>
   </tr>
   <tr>
     <td><p>أنظمة الإشعارات</p></td>
     <td><p>تحديد أولويات التنبيهات</p></td>
     <td><p>يخلق إحساسًا بالاستعجال بالنسبة للتنبيهات الحديثة مع الحفاظ على ظهور التنبيهات المهمة</p></td>
   </tr>
   <tr>
     <td><p>العروض السريعة</p></td>
     <td><p>العروض المحدودة المدة</p></td>
     <td><p>يقلل من ظهور العروض بسرعة مع اقتراب الموعد النهائي</p></td>
   </tr>
</table>
<p>اختر التناقص الأسي في الحالات التالية:</p>
<ul>
<li><p>يتوقع المستخدمون أن تهيمن العناصر الحديثة جدًا أو القريبة جدًا على النتائج بشكل كبير</p></li>
<li><p>يجب أن تظل العناصر الأقدم أو الأبعد قابلة للاكتشاف إذا كانت ذات صلة استثنائية</p></li>
<li><p>يجب أن يكون الانخفاض في الصلة مركّزًا في البداية (أكثر حدة في البداية، وأكثر تدريجيًا لاحقًا)</p></li>
</ul>
<h2 id="Sharp-drop-off-principle" class="common-anchor-header">مبدأ الانخفاض الحاد<button data-href="#Sharp-drop-off-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>يُنتج التناقص الأسي منحنى ينخفض بسرعة في البداية، ثم يتسطح تدريجيًا ليشكل ذيلًا طويلًا يقترب من الصفر دون أن يصل إليه أبدًا. يظهر هذا النمط الرياضي بشكل متكرر في الظواهر الطبيعية مثل الاضمحلال الإشعاعي، وانخفاض عدد السكان، وملاءمة المعلومات بمرور الوقت.</p>
<div class="alert note">
<p>يجب أن تستخدم جميع معلمات الوقت (<code translate="no">origin</code> ، <code translate="no">offset</code> ، <code translate="no">scale</code>) نفس وحدة قياس بيانات المجموعة. إذا كانت مجموعتك تخزن الطوابع الزمنية بوحدة قياس مختلفة (مللي ثانية، ميكروثانية)، فقم بتعديل جميع المعلمات وفقًا لذلك.</p>
</div>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/exp-decay.png" alt="Exp Decay" class="doc-image" id="exp-decay" /> 
   <span>التناقص الأسي</span>
  
 </span></p>
<p>يوضح الرسم البياني أعلاه كيف يؤثر التناقص الأسي على تصنيفات المقالات الإخبارية في منصة إخبارية رقمية:</p>
<ul>
<li><p><code translate="no">origin</code> (الوقت الحالي): اللحظة الحالية، حيث تصل الصلة إلى أقصى مستوياتها (1.0).</p></li>
<li><p><code translate="no">offset</code> (3 ساعات): «نافذة الأخبار العاجلة» — تحتفظ جميع الأخبار المنشورة خلال آخر 3 ساعات بدرجات صلة كاملة (1.0)، مما يضمن عدم معاقبة الأخبار الحديثة جدًّا دون داعٍ بسبب اختلافات زمنية طفيفة.</p></li>
<li><p><code translate="no">decay</code> (0.5): الدرجة عند مسافة المقياس — تتحكم هذه المعلمة في مدى انخفاض الدرجات بشكل كبير مع مرور الوقت.</p></li>
<li><p><code translate="no">scale</code> (24 ساعة): الفترة الزمنية التي تنخفض فيها الصلة إلى قيمة التناقص — تنخفض درجات الصلة للمقالات الإخبارية التي مر عليها 24 ساعة بالضبط إلى النصف (0.5).</p></li>
</ul>
<p>وكما ترى من المنحنى، تستمر المقالات الإخبارية التي مضى عليها أكثر من 24 ساعة في انخفاض صلتها بالموضوع، لكنها لا تصل أبدًا إلى الصفر تمامًا. حتى المقالات التي تعود إلى عدة أيام مضت تحتفظ بقدر ضئيل من الصلة بالموضوع، مما يسمح للأخبار المهمة ولكن القديمة بالظهور في موجزك (وإن كان ترتيبها أقل).</p>
<p>يحاكي هذا السلوك الطريقة التي تعمل بها صلة الأخبار عادةً — حيث تهيمن الأخبار الحديثة جدًّا بقوة، لكن الأخبار الأقدم المهمة يمكنها أن تبرز إذا كانت ذات صلة استثنائية باهتمامات المستخدم.</p>
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
    </button></h2><p>الصيغة الرياضية لحساب درجة التناقص الأسي هي:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>d</mi><mi>o</mi><mi>c</mi><mo stretchy="false">)</mo><mo>=</mo><mi>exp</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mi>λ</mi><mo>⋅</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mn>0</mn><mo separator="true">,</mo><mrow><mo fence="true">∣</mo><mi>f</mi><mi>i</mi><mi>e</mi><mi>l</mi><mi>d</mi><mi>v</mi><mi>a</mi><mi>l</mi><mi>u</mi><msub><mi>e</mi><mrow><mi>d</mi><mi>o</mi><mi>c</mi></mrow></msub><mo>−</mo><mi>o</mi><mi>r</mi><mi>i</mi><mi>g</mi><mi>i</mi><mi>n</mi><mo fence="true">∣</mo></mrow><mo>−</mo><mi>o</mi><mi>f</mi><mi>f</mi><mi>s</mi><mi>e</mi><mi>t</mi><mo fence="true">)</mo></mrow><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(doc) = \exp\left( \lambda \cdot \max\left(0, \left|fieldvalue_{doc} - origin\right| - offset \right) \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">oc</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">∣</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight">oc</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">in</span><span class="mclose delimcenter" style="top:0em;">∣</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">se</span><span class="mord mathnormal">t</span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span></span></span></span></span></p>
<p>حيث:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>λ</mi><mo>=</mo><mfrac><mrow><mi>ln</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>d</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>y</mi><mo stretchy="false">)</mo></mrow><mrow><mi>s</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>e</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">\lambda = \frac{\ln(decay)}{scale}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">sc</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mop">ln</span><span class="mopen">(</span><span class="mord mathnormal">d</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>توضيح ذلك بلغة بسيطة:</p>
<ol>
<li><p>احسب المسافة بين قيمة الحقل و«الأصل»: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> ∣fieldvaluedoc−origin∣|fieldvalue_{doc} - origin|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"></span><span class="mord"><span class="mord mathnormal">∣fieldvalue</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">doc​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mbin"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin"> −</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0278em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;"> </span><span class="mord">origin∣</span></span></span></span>.</p></li>
<li><p>اطرح الإزاحة (إن وجدت) ولكن لا تقل أبدًا عن الصفر: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>max⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi>distance−offset</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\max(0, distance - offset)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal"></span><span class="mord mathnormal">distance</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal"> </span><span class="mord mathnormal">offset</span><span class="mclose">)</span></span></span></span>.</p></li>
<li><p>اضرب في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ،</span></span></span></span> الذي يتم حسابه من معلمات المقياس والتلاشي.</p></li>
<li><p>احسب الأس، الذي يعطيك قيمة بين 0 و 1: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>exp⁡</mo><mo stretchy="false">(</mo><mi>λ⋅value</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\lambda \cdot value)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord mathnormal" style="margin-right:0.0359em;"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;"> </span><span class="mord mathnormal">value</span><span class="mclose">)</span></span></span></span>.</p></li>
</ol>
<p>يحول حساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span> معلمات المقياس والتلاشي إلى معلمة المعدل للدالة الأسية. كلما كانت قيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span> سالبة أكثر، زاد انحدار الانخفاض الأولي.</p>
<h2 id="Use-exponential-decay" class="common-anchor-header">استخدام التلاشي الأسي<button data-href="#Use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن تطبيق التلاشي الأسي على كل من عمليات البحث المتجهي القياسي والبحث الهجين في Milvus. فيما يلي مقتطفات الكود الرئيسية لتنفيذ هذه الميزة.</p>
<div class="alert note">
<p>قبل استخدام دوال التضاؤل، يجب عليك أولاً إنشاء مجموعة تحتوي على الحقول الرقمية المناسبة (مثل الطوابع الزمنية والمسافات وما إلى ذلك) التي سيتم استخدامها لحسابات التضاؤل. للحصول على أمثلة عملية كاملة تشمل إعداد المجموعة وتعريف المخطط وإدخال البيانات، راجع <a href="/docs/ar/tutorial-implement-a-time-based-ranking-in-milvus.md">دليل Decay Ranker</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">إنشاء مُصنِّف التناقص<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد إعداد مجموعتك بحقل رقمي (في هذا المثال، <code translate="no">publish_time</code>)، قم بإنشاء مُصنِّف التناقص الأسي:</p>
<div class="alert note">
<p><strong>اتساق وحدة الوقت</strong>: عند استخدام التضاؤل القائم على الوقت، تأكد من أن المعلمات <code translate="no">origin</code> و <code translate="no">scale</code> و <code translate="no">offset</code> تستخدم نفس وحدة الوقت المستخدمة في بيانات المجموعة. إذا كانت المجموعة تخزن الطوابع الزمنية بالثواني، فاستخدم الثواني لجميع المعلمات. وإذا كانت تستخدم الميلي ثانية، فاستخدم الميلي ثانية لجميع المعلمات.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create an exponential decay ranker for news recency</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;news_recency&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;publish_time&quot;</span>],   <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;exp&quot;</span>,                <span class="hljs-comment"># Choose exponential decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime.now().timestamp()),  <span class="hljs-comment"># Current time (seconds, matching collection data)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,            <span class="hljs-comment"># 3 hour breaking news window (seconds)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>             <span class="hljs-comment"># 24 hours (in seconds, matching collection data)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;news_recency&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;publish_time&quot;</span>))
        .function(<span class="hljs-string">&quot;exp&quot;</span>)
        .origin(System.currentTimeMillis() / <span class="hljs-number">1000</span>)  <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
        .offset(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)            <span class="hljs-comment">// 3 hour breaking news window (seconds)</span>
        .decay(<span class="hljs-number">0.5</span>)                     <span class="hljs-comment">// Half score at scale distance</span>
        .scale(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)            <span class="hljs-comment">// 24 hours (in seconds, matching collection data)</span>
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;time&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
)

<span class="hljs-comment">// Create an exponential decay ranker for news recency</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;news_recency&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;publish_time&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;exp&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, time.Now().Unix()).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">3</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Create an exponential decay ranker for news recency</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">origin</span> = std::time::SystemTime::<span class="hljs-title function_ invoke__">now</span>()
    .<span class="hljs-title function_ invoke__">duration_since</span>(std::time::UNIX_EPOCH)
    .<span class="hljs-title function_ invoke__">unwrap</span>()
    .<span class="hljs-title function_ invoke__">as_secs</span>();
<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;news_recency&quot;</span>)
        .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;exp&quot;</span>)
        .<span class="hljs-title function_ invoke__">origin</span>(origin)
        .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>)
        .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
    <span class="hljs-keyword">let</span> <span class="hljs-variable">value</span> = rerank.<span class="hljs-title function_ invoke__">get_function</span>().<span class="hljs-title function_ invoke__">clone</span>().<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;publish_time&quot;</span>]);
    rerank.<span class="hljs-title function_ invoke__">function</span>(value)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;ctime&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;news_recency&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;publish_time&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;exp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(std::<span class="hljs-built_in">time</span>(<span class="hljs-literal">nullptr</span>));  <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;news_recency&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;publish_time&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;exp&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() / <span class="hljs-number">1000</span>), <span class="hljs-comment">// Current time (seconds)</span>
    <span class="hljs-attr">offset</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,                   <span class="hljs-comment">// 3 hour breaking news window (seconds)</span>
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,                            <span class="hljs-comment">// Half score at scale distance</span>
    <span class="hljs-attr">scale</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,                   <span class="hljs-comment">// 24 hours (seconds)</span>
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create an exponential decay ranker for news recency</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;news_recency&quot;</span>)  <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;publish_time&quot;</span>)           <span class="hljs-comment">// Numeric field to use</span>
    .WithFunction(<span class="hljs-string">&quot;exp&quot;</span>)                      <span class="hljs-comment">// Choose exponential decay</span>
    .WithOrigin(DateTimeOffset.UtcNow.ToUnixTimeSeconds())  <span class="hljs-comment">// Current time (seconds, matching collection data)</span>
    .WithOffset(<span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                  <span class="hljs-comment">// 3 hour breaking news window (seconds)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>)                          <span class="hljs-comment">// Half score at scale distance</span>
    .WithScale(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);                 <span class="hljs-comment">// 24 hours (in seconds, matching collection data)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not expose a standalone &quot;create a decay ranker&quot;</span>
<span class="hljs-comment"># endpoint. The decay function is passed inline through the functionScore</span>
<span class="hljs-comment"># field of the search request (see the next section).</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">تطبيق على البحث المتجه القياسي<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تعريف مُصنِّف التضاؤل الخاص بك، يمكنك تطبيقه أثناء عمليات البحث عن طريق تمريره إلى المعلمة <code translate="no">ranker</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[your_query_vector],             <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;collection_name&quot;</span>;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>))))  <span class="hljs-comment">// Replace with your query vector</span>
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)                    <span class="hljs-comment">// Vector field to search</span>
        .limit(<span class="hljs-number">10</span>)                             <span class="hljs-comment">// Number of results</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>))  <span class="hljs-comment">// Fields to return</span>
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)           <span class="hljs-comment">// Apply the decay ranker</span>
                .build())
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

<span class="hljs-comment">// Apply decay ranker to vector search</span>
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;collection_name&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{
        entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>}, <span class="hljs-comment">// Replace with your query vector</span>
    }).
    WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>).                    <span class="hljs-comment">// Vector field to search</span>
    WithOutputFields(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>). <span class="hljs-comment">// Fields to return</span>
    WithFunctionReranker(rerank).              <span class="hljs-comment">// Apply the decay ranker</span>
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Apply decay ranker to vector search</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;dense&quot;</span>)                                <span class="hljs-comment">// Vector field to search</span>
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>]])) <span class="hljs-comment">// Replace with your query vector</span>
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)                                             <span class="hljs-comment">// Number of results</span>
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>])             <span class="hljs-comment">// Fields to return</span>
        .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank))    <span class="hljs-comment">// Apply the decay ranker</span>
        .<span class="hljs-title function_ invoke__">consistency_level</span>(ConsistencyLevel::Strong)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;dense&quot;</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;publish_time&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector)
                   .<span class="hljs-built_in">WithConsistencyLevel</span>(milvus::ConsistencyLevel::STRONG);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>]], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank, <span class="hljs-comment">// Apply the decay ranker</span>
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Apply decay ranker to vector search</span>
<span class="hljs-keyword">var</span> result = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;dense&quot;</span>,                    <span class="hljs-comment">// Vector field to search</span>
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(yourQueryVector) },  <span class="hljs-comment">// Replace with your query vector</span>
    Limit = <span class="hljs-number">10</span>,                                   <span class="hljs-comment">// Number of results</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span> }, <span class="hljs-comment">// Fields to return</span>
        FunctionScoreReranker = rerank,             <span class="hljs-comment">// Apply the decay ranker</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl -s http://localhost:19530/v2/vectordb/entities/search \
    -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -d <span class="hljs-string">&#x27;{
        &quot;collectionName&quot;: &quot;collection_name&quot;,
        &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]],
        &quot;annsField&quot;: &quot;dense&quot;,
        &quot;limit&quot;: 10,
        &quot;outputFields&quot;: [&quot;title&quot;, &quot;publish_time&quot;],
        &quot;functionScore&quot;: {
            &quot;functions&quot;: [{
                &quot;name&quot;: &quot;news_recency&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [&quot;publish_time&quot;],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;decay&quot;,
                    &quot;function&quot;: &quot;exp&quot;,
                    &quot;origin&quot;: 1790872778,
                    &quot;offset&quot;: 10800,
                    &quot;decay&quot;: 0.5,
                    &quot;scale&quot;: 86400
                }
            }],
            &quot;params&quot;: {}
        },
        &quot;consistencyLevel&quot;: &quot;Strong&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
