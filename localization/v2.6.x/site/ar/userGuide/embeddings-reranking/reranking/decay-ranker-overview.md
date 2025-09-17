---
id: decay-ranker-overview.md
title: نظرة عامة على مصنف التضاؤلCompatible with Milvus 2.6.x
summary: >-
  في البحث المتجه التقليدي، يتم ترتيب النتائج في البحث المتجه التقليدي من خلال
  التشابه المتجهي فقط - أي مدى تطابق المتجهات في الفضاء الرياضي. ولكن في تطبيقات
  العالم الحقيقي، غالبًا ما يعتمد ما يجعل المحتوى وثيق الصلة حقًا على أكثر من
  مجرد التشابه الدلالي.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">نظرة عامة على مصنف التضاؤل<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>في البحث المتجه التقليدي، يتم ترتيب النتائج في البحث المتجه التقليدي عن طريق التشابه المتجهي فقط - أي مدى تطابق المتجهات في الفضاء الرياضي. ولكن في تطبيقات العالم الحقيقي، غالباً ما يعتمد ما يجعل المحتوى وثيق الصلة حقاً على أكثر من مجرد التشابه الدلالي.</p>
<p>فكّر في هذه السيناريوهات اليومية:</p>
<ul>
<li><p>البحث عن الأخبار حيث يجب أن يحتل مقال الأمس مرتبة أعلى من مقال مشابه من ثلاث سنوات مضت</p></li>
<li><p>أداة البحث عن المطاعم التي تعطي الأولوية للأماكن التي تبعد 5 دقائق عن تلك التي تتطلب 30 دقيقة بالسيارة</p></li>
<li><p>منصة للتجارة الإلكترونية تعزز المنتجات الشائعة حتى عندما تكون أقل تشابهًا مع استعلام البحث</p></li>
</ul>
<p>تشترك جميع هذه السيناريوهات في حاجة مشتركة: موازنة التشابه المتجه مع عوامل رقمية أخرى مثل الوقت أو المسافة أو الشعبية.</p>
<p>تلبي مصنفات التضاؤل في Milvus هذه الحاجة من خلال تعديل تصنيفات البحث بناءً على قيم الحقول الرقمية. فهي تسمح لك بموازنة تشابه المتجهات مع "الحداثة" أو "القرب" أو الخصائص الرقمية الأخرى لبياناتك، مما يخلق تجارب بحث أكثر سهولة وملاءمة للسياق.</p>
<h2 id="Usage-notes" class="common-anchor-header">ملاحظات الاستخدام<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>لا يمكن استخدام ترتيب التضاؤل مع عمليات بحث التجميع.</p></li>
<li><p>يجب أن يكون الحقل المستخدم لترتيب الاضمحلال رقميًا (<code translate="no">INT8</code> أو <code translate="no">INT16</code> أو <code translate="no">INT32</code> أو <code translate="no">INT64</code> أو <code translate="no">FLOAT</code> أو <code translate="no">DOUBLE</code>).</p></li>
<li><p>يمكن لكل مرتبة اضمحلال استخدام حقل رقمي واحد فقط.</p></li>
<li><p><strong>اتساق الوحدة الزمنية</strong>: عند استخدام تصنيف الاضمحلال المستند إلى الوقت، يجب أن تتطابق وحدات المعلمات <code translate="no">origin</code> و <code translate="no">scale</code> و <code translate="no">offset</code> مع الوحدات المستخدمة في بيانات مجموعتك:</p>
<ul>
<li>إذا كانت مجموعتك تخزن الطوابع الزمنية <strong>بالثواني،</strong> فاستخدم الثواني لجميع المعلمات</li>
<li>إذا كانت مجموعتك تخزن الطوابع الزمنية <strong>بالمللي</strong> ثانية، فاستخدم المللي ثانية لجميع المعلمات</li>
<li>إذا كانت مجموعتك تخزن الطوابع الزمنية <strong>بالميكروثانية،</strong> فاستخدم الميكروثانية لجميع المعلمات</li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيف يعمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل ترتيب التضاؤل على تحسين البحث المتجه التقليدي من خلال دمج عوامل رقمية مثل الوقت أو المسافة الجغرافية في عملية الترتيب. تتبع العملية بأكملها المراحل التالية:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">المرحلة 1: حساب درجات التشابه المعيارية<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>أولاً، يقوم Milvus بحساب درجات تشابه المتجهات وتطبيعها لضمان اتساق المقارنة:</p>
<ul>
<li><p>بالنسبة لمقاييس المسافة <strong>L2</strong> و <strong>JACCARD</strong> (حيث تشير القيم المنخفضة إلى تشابه أعلى):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي ذلك إلى تحويل المسافات إلى درجات تشابه بين 0-1، حيث يكون الأعلى أفضل.</p></li>
<li><p>بالنسبة لمقاييس <strong>IP</strong> <strong>وCOSINE</strong> <strong>وBM25</strong> (حيث تشير الدرجات الأعلى بالفعل إلى تطابق أفضل): تُستخدم الدرجات مباشرةً دون تطبيع.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">المرحلة 2: حساب درجات الاضمحلال<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد ذلك، يقوم Milvus بحساب درجة الاضمحلال بناءً على قيمة الحقل الرقمي (مثل الطابع الزمني أو المسافة) باستخدام مصنف الاضمحلال الذي اخترته:</p>
<ul>
<li><p>يقوم كل مصنف اضمحلال بتحويل القيم الرقمية الأولية إلى درجات ملاءمة طبيعية بين 0-1</p></li>
<li><p>تمثل درجة التضاؤل مدى ملاءمة العنصر بناءً على "المسافة" بينه وبين النقطة المثالية</p></li>
</ul>
<p>تختلف معادلة الحساب المحددة بناءً على نوع مصنف التضاؤل. للحصول على تفاصيل حول كيفية حساب درجة التضاؤل، راجع الصفحات المخصصة <a href="/docs/ar/gaussian-decay.md#Formula">للتضاؤل الغاوسي،</a> <a href="/docs/ar/exponential-decay.md#Formula">والتضاؤل الأسي،</a> <a href="/docs/ar/linear-decay.md#Formula">والتضاؤل الخطي</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">المرحلة 3: حساب الدرجات النهائية<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>أخيرًا، يجمع Milvus بين درجة التشابه الطبيعي ودرجة التضاؤل لإنتاج درجة الترتيب النهائية:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>في حالات البحث المختلط (الجمع بين حقول متجهات متعددة)، يأخذ Milvus أقصى درجة تشابه طبيعية بين طلبات البحث:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>على سبيل المثال، إذا حصلت ورقة بحثية على 0.82 من التشابه المتجه و0.91 من استرجاع النص المستند إلى BM25 في بحث مختلط، يستخدم ميلفوس 0.91 كدرجة تشابه أساسية قبل تطبيق عامل الاضمحلال.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">ترتيب الاضمحلال أثناء العمل<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>دعونا نرى ترتيب الاضمحلال في سيناريو عملي - البحث عن <strong>"أوراق بحثية للذكاء الاصطناعي"</strong> مع اضمحلال زمني:</p>
<div class="alert note">
<p>في هذا المثال، تعكس درجات التضاؤل في هذا المثال كيف تتضاءل الأهمية مع مرور الوقت - تحصل الأوراق البحثية الأحدث على درجات أقرب إلى 1.0، بينما تحصل الأوراق الأقدم على درجات أقل. يتم حساب هذه القيم باستخدام مصنف اضمحلال محدد. للحصول على التفاصيل، راجع <a href="/docs/ar/decay-ranker-overview.md#Choose-the-right-decay-ranker">اختيار مصنف الاضمحلال الصحيح</a>.</p>
</div>
<table>
   <tr>
     <th><p>الأوراق</p></th>
     <th><p>متجه التشابه</p></th>
     <th><p>درجة التشابه المعيارية</p></th>
     <th><p>تاريخ النشر</p></th>
     <th><p>درجة الاضمحلال</p></th>
     <th><p>النتيجة النهائية</p></th>
     <th><p>الترتيب النهائي</p></th>
   </tr>
   <tr>
     <td><p>الورقة أ</p></td>
     <td><p>عالية</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>منذ 2 أسابيع</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>الورقة ب</p></td>
     <td><p>عالية جداً</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>منذ 6 أشهر</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>الورق ج</p></td>
     <td><p>متوسط</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>منذ 1 يوم</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>الورقة د</p></td>
     <td><p>متوسط-عالي</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>منذ 3 أسابيع</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>بدون إعادة ترتيب الاضمحلال، ستحتل الورقة (ب) أعلى مرتبة بناءً على التشابه البحت للمتجهات (0.92). ومع ذلك، مع تطبيق إعادة ترتيب الاضمحلال:</p>
<ul>
<li><p>تقفز الورقة (ج) إلى المركز رقم 1 على الرغم من التشابه المتوسط لأنها حديثة جدًا (نُشرت بالأمس)</p></li>
<li><p>تنخفض الورقة ب إلى المركز رقم 3 على الرغم من التشابه الممتاز لأنها قديمة نسبيًا</p></li>
<li><p>تستخدم الورقة D المسافة L2 (حيث يكون الأقل أفضل)، لذلك يتم تطبيع درجتها من 1.2 إلى 0.76 قبل تطبيق التضاؤل</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">اختر مصنف الاضمحلال الصحيح<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم ميلفوس مصنفات اضمحلال متميزة - <code translate="no">gauss</code> ، <code translate="no">exp</code> ، <code translate="no">linear</code> ، وكل منها مصمم لحالات استخدام محددة:</p>
<table>
   <tr>
     <th><p>مصنف الاضمحلال</p></th>
     <th><p>الخصائص</p></th>
     <th><p>حالات الاستخدام المثالية</p></th>
     <th><p>مثال على السيناريو</p></th>
   </tr>
   <tr>
     <td><p>غاوسي (<code translate="no">gauss</code>)</p></td>
     <td><p>انخفاض تدريجي طبيعي الشعور يمتد بشكل معتدل</p></td>
     <td><ul>
<li><p>عمليات البحث العامة التي تتطلب نتائج متوازنة</p></li>
<li><p>التطبيقات التي يكون لدى المستخدمين فيها إحساس بديهي بالمسافة</p></li>
<li><p>عندما لا ينبغي أن تؤدي المسافة المعتدلة إلى معاقبة النتائج بشدة</p></li>
</ul></td>
     <td><p>في بحث عن مطعم، تظل الأماكن ذات الجودة العالية التي تبعد 3 كم قابلة للاكتشاف، على الرغم من أنها تحتل مرتبة أقل من الخيارات القريبة</p></td>
   </tr>
   <tr>
     <td><p>أسي (<code translate="no">exp</code>)</p></td>
     <td><p>يتناقص بسرعة في البداية ولكنه يحافظ على ذيل طويل</p></td>
     <td><ul>
<li><p>موجز الأخبار حيث يكون التكرار أمرًا بالغ الأهمية</p></li>
<li><p>وسائل التواصل الاجتماعي حيث يجب أن يهيمن المحتوى الجديد</p></li>
<li><p>عندما يكون القرب مفضلاً بقوة ولكن يجب أن تظل العناصر البعيدة الاستثنائية مرئية</p></li>
</ul></td>
     <td><p>في تطبيق الأخبار، تحتل قصص الأمس مرتبة أعلى بكثير من المحتوى الذي مضى عليه أسبوع، ولكن يمكن أن تظل المقالات القديمة ذات الصلة الوثيقة بالموضوع تظهر</p></td>
   </tr>
   <tr>
     <td><p>خطي (<code translate="no">linear</code>)</p></td>
     <td><p>الانخفاض المتسق والمتوقع مع وجود حد فاصل واضح</p></td>
     <td><ul>
<li><p>التطبيقات ذات الحدود الطبيعية</p></li>
<li><p>الخدمات ذات حدود المسافة</p></li>
<li><p>محتوى بتواريخ انتهاء صلاحية أو حدود واضحة</p></li>
</ul></td>
     <td><p>في أداة البحث عن الأحداث، لا تظهر الأحداث التي تتجاوز نافذة مستقبلية لمدة أسبوعين على الإطلاق</p></td>
   </tr>
</table>
<p>للحصول على معلومات مفصلة حول كيفية حساب كل مصنف اضمحلال للنتائج وأنماط اضمحلال محددة، راجع الوثائق المخصصة:</p>
<ul>
<li><p><a href="/docs/ar/gaussian-decay.md">الاضمحلال الغاوسي</a></p></li>
<li><p><a href="/docs/ar/exponential-decay.md">التضاؤل الأسي</a></p></li>
<li><p><a href="/docs/ar/linear-decay.md">التضاؤل الخطي</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">مثال على التنفيذ<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن تطبيق مصنفات التضاؤل على كل من عمليات البحث المتجه القياسية وعمليات البحث المختلطة في ميلفوس. فيما يلي مقتطفات الشيفرة الرئيسية لتنفيذ هذه الميزة.</p>
<div class="alert note">
<p>قبل استخدام دوال الاضمحلال، يجب عليك أولاً إنشاء مجموعة تحتوي على حقول رقمية مناسبة (مثل الطوابع الزمنية والمسافات وغيرها) والتي سيتم استخدامها لحسابات الاضمحلال. للحصول على أمثلة عملية كاملة بما في ذلك إعداد المجموعة وتعريف المخطط وإدراج البيانات، راجع <a href="/docs/ar/tutorial-implement-a-time-based-ranking-in-milvus.md">البرنامج التعليمي: تنفيذ الترتيب المستند إلى الوقت في ميلفوس</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">إنشاء مصنف اضمحلال<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>لتنفيذ تصنيف التضاؤل، قم أولاً بتعريف كائن <code translate="no">Function</code> بالتكوين المناسب:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>مطلوب؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة/مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>نعم</p></td>
     <td><p>معرّف للدالة المستخدمة عند تنفيذ عمليات البحث. اختر اسمًا وصفيًا مناسبًا لحالة الاستخدام الخاصة بك.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>نعم</p></td>
     <td><p>حقل رقمي لحساب درجة التضاؤل. يحدد سمة البيانات التي سيتم استخدامها لحساب التضاؤل (على سبيل المثال، الطوابع الزمنية للتضاؤل المستند إلى الوقت، والإحداثيات للتضاؤل المستند إلى الموقع). 
 يجب أن يكون حقلاً في مجموعتك يحتوي على قيم رقمية ذات صلة. يدعم INT8/16/32/64، وFLOAT، وDouble.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نعم</p></td>
     <td><p>تحديد نوع الدالة التي يتم إنشاؤها. يجب تعيينها على <code translate="no">RERANK</code> لجميع مرتبات التضاؤل.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد أسلوب إعادة الترتيب المطلوب استخدامه. يجب تعيينه إلى <code translate="no">"decay"</code> لتمكين وظيفة ترتيب التضاؤل.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>نعم</p></td>
     <td><p>تحديد مصنف التضاؤل الرياضي المطلوب تطبيقه. يحدد شكل المنحنى الخاص بانخفاض الملاءمة. راجع قسم <a href="/docs/ar/decay-ranker-overview.md#Choose-the-right-decay-ranker">اختيار مصنف التضاؤل الصحيح</a> للحصول على إرشادات حول اختيار الدالة المناسبة.</p></td>
     <td><p><code translate="no">"gauss"</code> <code translate="no">"exp"</code> ، أو <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>نعم</p></td>
     <td><p>النقطة المرجعية التي يتم من خلالها حساب درجة التضاؤل. تحصل العناصر عند هذه القيمة على أقصى درجات الملاءمة. بالنسبة للتضاؤل المستند إلى الوقت، يجب أن تتطابق وحدة الوقت مع بيانات المجموعة الخاصة بك.</p></td>
     <td><ul>
<li>بالنسبة للطوابع الزمنية: الوقت الحالي (على سبيل المثال، <code translate="no">int(time.time())</code>)</li>
<li>بالنسبة للموقع الجغرافي: إحداثيات المستخدم الحالية</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.scale</code></p></td>
     <td><p>نعم</p></td>
     <td><p>المسافة أو الوقت الذي تنخفض فيه الصلة إلى القيمة <code translate="no">decay</code>. يتحكم في مدى سرعة انخفاض الصلة بالموضوع. بالنسبة للتضاؤل المستند إلى الوقت، يجب أن تتطابق وحدة الوقت مع بيانات المجموعة الخاصة بك. تؤدي القيم الأكبر إلى انخفاض تدريجي أكثر في الملاءمة؛ بينما تؤدي القيم الأصغر إلى انخفاض أكثر حدة.</p></td>
     <td><ul>
<li>للوقت: الفترة بالثواني (على سبيل المثال، <code translate="no">7 * 24 * 60 * 60</code> لمدة 7 أيام)</li>
<li>للمسافة: بالأمتار (على سبيل المثال، <code translate="no">5000</code> لـ 5 كم)</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.offset</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>ينشئ "منطقة عدم اضمحلال" حول <code translate="no">origin</code> حيث تحافظ العناصر على الدرجات الكاملة (درجة الاضمحلال = 1.0). تحافظ العناصر داخل هذا النطاق من <code translate="no">origin</code> على أقصى قدر من الأهمية. بالنسبة للتضاؤل المستند إلى الوقت، يجب أن تتطابق وحدة الوقت مع بيانات المجموعة الخاصة بك.</p></td>
     <td><ul>
<li>بالنسبة للوقت: الفترة بالثواني (على سبيل المثال، <code translate="no">24 * 60 * 60</code> لمدة يوم واحد)</li>
<li>للمسافة: متر (على سبيل المثال، <code translate="no">500</code> لـ 500 متر)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>قيمة الدرجة في المسافة <code translate="no">scale</code> ، تتحكم في انحدار المنحنى. تُنشئ القيم المنخفضة منحنيات انحدار أكثر حدة؛ بينما تُنشئ القيم الأعلى منحنيات انحدار أكثر تدرجًا. يجب أن تكون بين 0 و1.</p></td>
     <td><p><code translate="no">0.5</code> (افتراضي)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">تنطبق على البحث المتجه القياسي<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد تحديد مصنف الانحدار، يمكنك تطبيقه أثناء عمليات البحث عن طريق تمريره إلى المعلمة <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">تنطبق على البحث الهجين<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكن أيضًا تطبيق مصنفات التضاؤل على عمليات البحث الهجين التي تجمع بين حقول متجهات متعددة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>في البحث المختلط، يعثر ميلفوس أولاً على أقصى درجة تشابه من جميع حقول المتجهات، ثم يطبق عامل التضاؤل على تلك الدرجة.</p>
