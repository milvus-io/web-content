---
id: decay-ranker-overview.md
title: نظرة عامة على Decay RankerCompatible with Milvus 2.6.x
summary: >-
  في البحث المتجهي التقليدي، يتم ترتيب النتائج بناءً على تشابه المتجهات فقط — أي
  مدى تطابق المتجهات في الفضاء الرياضي. لكن في التطبيقات العملية، غالبًا ما
  يعتمد ما يجعل المحتوى ذا صلة حقيقية على عوامل تتجاوز مجرد التشابه الدلالي.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">نظرة عامة على Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>في البحث المتجهي التقليدي، يتم ترتيب النتائج بناءً على تشابه المتجهات فقط — أي مدى تطابق المتجهات في الفضاء الرياضي. لكن في التطبيقات الواقعية، غالبًا ما يعتمد ما يجعل المحتوى ذا صلة حقيقية على أكثر من مجرد التشابه الدلالي.</p>
<p>تأمل هذه السيناريوهات اليومية:</p>
<ul>
<li><p>بحث إخباري حيث يجب أن يحتل مقال الأمس مرتبة أعلى من مقال مشابه نُشر قبل ثلاث سنوات</p></li>
<li><p>أداة البحث عن المطاعم التي تعطي الأولوية للمطاعم التي تبعد 5 دقائق على تلك التي تتطلب 30 دقيقة بالسيارة</p></li>
<li><p>منصة للتجارة الإلكترونية تبرز المنتجات الشائعة حتى لو كانت أقل تشابهاً بقليل مع استعلام البحث</p></li>
</ul>
<p>تشترك جميع هذه السيناريوهات في حاجة مشتركة: تحقيق التوازن بين تشابه المتجهات وعوامل رقمية أخرى مثل الوقت أو المسافة أو الشعبية.</p>
<p>تعالج أدوات ترتيب التناقص في Milvus هذه الحاجة من خلال تعديل تصنيفات البحث بناءً على قيم الحقول الرقمية. فهي تتيح لك تحقيق التوازن بين تشابه المتجهات و«حداثة» المعلومات أو «قربها» أو الخصائص الرقمية الأخرى لبياناتك، مما يخلق تجارب بحث أكثر بديهية وذات صلة بالسياق.</p>
<h2 id="Usage-notes" class="common-anchor-header">ملاحظات حول الاستخدام<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>لا يمكن استخدام الترتيب التنازلي مع عمليات البحث المجمعة.</p></li>
<li><p>يجب أن يكون الحقل المستخدم لترتيب التناقص رقميًا (<code translate="no">INT8</code> ، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code> ، <code translate="no">FLOAT</code> ، أو <code translate="no">DOUBLE</code>).</p></li>
<li><p>لا يمكن لكل أداة تصنيف التضاؤل استخدام سوى حقل رقمي واحد.</p></li>
<li><p><strong>اتساق وحدة الوقت</strong>: عند استخدام ترتيب التناقص القائم على الوقت، يجب أن تتطابق وحدات المعلمات <code translate="no">origin</code> و <code translate="no">scale</code> و <code translate="no">offset</code> مع الوحدات المستخدمة في بيانات المجموعة:</p>
<ul>
<li><p>إذا كانت المجموعة تخزن الطوابع الزمنية <strong>بالثواني</strong>، فاستخدم الثواني لجميع المعلمات</p></li>
<li><p>إذا كانت المجموعة تخزن الطوابع الزمنية <strong>بالمللي ثانية</strong>، فاستخدم المللي ثانية لجميع المعلمات</p></li>
<li><p>إذا كانت المجموعة تخزن الطوابع الزمنية <strong>بالميكروثانية،</strong> فاستخدم الميكروثانية لجميع المعلمات</p></li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">كيفية العمل<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يعزز ترتيب التضاؤل البحث المتجه التقليدي من خلال دمج عوامل رقمية مثل الوقت أو المسافة الجغرافية في عملية الترتيب. تتبع العملية بأكملها المراحل التالية:</p>
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
    </button></h3><p>أولاً، يقوم Milvus بحساب درجات تشابه المتجهات وتوحيدها لضمان مقارنة متسقة:</p>
<ul>
<li><p>بالنسبة لمقاييس المسافة <strong>L2</strong> <strong>وJACCARD</strong> (حيث تشير القيم الأقل إلى تشابه أعلى):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي ذلك إلى تحويل المسافات إلى درجات تشابه تتراوح بين 0 و1، حيث كلما ارتفعت الدرجة كان ذلك أفضل.</p></li>
<li><p>بالنسبة لمقاييس <strong>IP</strong> <strong>وCOSINE</strong> <strong>وBM25</strong> (حيث تشير الدرجات الأعلى بالفعل إلى تطابقات أفضل): تُستخدم الدرجات مباشرةً دون تطبيع.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">المرحلة 2: حساب درجات التناقص<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد ذلك، يحسب Milvus درجة التناقص استنادًا إلى القيمة الرقمية للحقل (مثل الطابع الزمني أو المسافة) باستخدام أداة ترتيب التناقص التي اخترتها:</p>
<ul>
<li><p>يقوم كل مُصنِّف تضاؤل بتحويل القيم الرقمية الأولية إلى درجات صلة مُعَدَّلة تتراوح بين 0 و1</p></li>
<li><p>تمثل درجة التناقص مدى صلة العنصر بناءً على «مسافته» عن النقطة المثالية</p></li>
</ul>
<p>تختلف صيغة الحساب المحددة باختلاف نوع أداة ترتيب التناقص. للحصول على تفاصيل حول كيفية حساب درجة التناقص، راجع الصفحات المخصصة لـ <a href="/docs/ar/gaussian-decay.md#Formula">«التناقص الغاوسي</a>» <a href="/docs/ar/exponential-decay.md#Formula">و«التناقص الأسي</a>» <a href="/docs/ar/linear-decay.md#Formula">و«التناقص الخطي</a>».</p>
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
    </button></h3><p>أخيرًا، يجمع Milvus بين درجة التشابه المعيارية ودرجة التناقص لإنتاج درجة الترتيب النهائية:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>في حالات البحث المختلط (الذي يجمع بين حقول متجهات متعددة)، يأخذ Milvus أعلى درجة تشابه معيارية بين طلبات البحث:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>على سبيل المثال، إذا حصلت ورقة بحثية على 0.82 من تشابه المتجهات و0.91 من استرجاع النص القائم على BM25 في بحث هجين، يستخدم Milvus 0.91 كدرجة تشابه أساسية قبل تطبيق عامل التناقص.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">تصنيف التناقص في الواقع العملي<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>دعونا نرى ترتيب التناقص في سيناريو عملي — البحث عن <strong>«أوراق بحثية في مجال الذكاء الاصطناعي»</strong> مع التناقص القائم على الوقت:</p>
<div class="alert note">
<p>في هذا المثال، تعكس درجات التناقص كيف تتضاءل الصلة بالموضوع بمرور الوقت — حيث تحصل الأوراق البحثية الأحدث على درجات أقرب إلى 1.0، بينما تحصل الأوراق الأقدم على درجات أقل. يتم حساب هذه القيم باستخدام أداة ترتيب تناقص محددة. لمزيد من التفاصيل، راجع <a href="/docs/ar/decay-ranker-overview.md#Choose-the-right-decay-ranker">«اختيار أداة ترتيب التناقص المناسبة</a>».</p>
</div>
<table>
   <tr>
     <th><p>الورقة البحثية</p></th>
     <th><p>تشابه المتجهات</p></th>
     <th><p>درجة التشابه المعيارية</p></th>
     <th><p>تاريخ النشر</p></th>
     <th><p>درجة التناقص</p></th>
     <th><p>الدرجة النهائية</p></th>
     <th><p>الترتيب النهائي</p></th>
   </tr>
   <tr>
     <td><p>الورقة أ</p></td>
     <td><p>مرتفع</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>قبل أسبوعين</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>الورقة ب</p></td>
     <td><p>مرتفع جدًا</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>قبل 6 أشهر</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>4</td>
   </tr>
   <tr>
     <td><p>الورقة C</p></td>
     <td><p>متوسط</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>قبل يوم واحد</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>الورقة د</p></td>
     <td><p>متوسط-مرتفع</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>قبل 3 أسابيع</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>3</td>
   </tr>
</table>
<p>بدون إعادة الترتيب حسب التناقص، كانت الورقة ب ستحتل المرتبة الأعلى بناءً على التشابه المتجهي البحت (0.92). ومع ذلك، عند تطبيق إعادة الترتيب حسب التناقص:</p>
<ul>
<li><p>تقفز الورقة C إلى المرتبة الأولى على الرغم من تشابهها المتوسط لأنها حديثة جدًا (نُشرت أمس)</p></li>
<li><p>تنخفض الورقة «ب» إلى المرتبة الرابعة على الرغم من تشابهها الممتاز لأنها قديمة نسبيًا</p></li>
<li><p>تستخدم الورقة د تشابه COSINE، لذا تُستخدم درجتها البالغة 0.76 مباشرةً قبل تطبيق الترتيب التنازلي</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">اختر أداة إعادة الترتيب بالتناقص المناسبة<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم Milvus أدوات ترتيب بالتناقص مميزة - <code translate="no">gauss</code> ، <code translate="no">exp</code> ، <code translate="no">linear</code> ، كل منها مصمم لحالات استخدام محددة:</p>
<table>
   <tr>
     <th><p>أداة تصنيف التناقص</p></th>
     <th><p>الخصائص</p></th>
     <th><p>حالات الاستخدام المثالية</p></th>
     <th><p>سيناريو مثال</p></th>
   </tr>
   <tr>
     <td><p>غاوسي (<code translate="no">gauss</code>)</p></td>
     <td><p>انخفاض تدريجي يبدو طبيعيًا ويمتد بشكل معتدل</p></td>
     <td><ul><li><p>عمليات البحث العامة التي تتطلب نتائج متوازنة</p></li><li><p>التطبيقات التي يكون لدى المستخدمين فيها إحساس بديهي بالمسافة</p></li><li><p>عندما لا ينبغي أن تؤثر المسافة المعتدلة سلبًا بشكل كبير على النتائج</p></li></ul></td>
     <td><p>في البحث عن مطعم، تظل الأماكن عالية الجودة التي تبعد 3 كيلومترات قابلة للاكتشاف، على الرغم من ترتيبها في مرتبة أدنى من الخيارات القريبة</p></td>
   </tr>
   <tr>
     <td><p>أسي (<code translate="no">exp</code>)</p></td>
     <td><p>ينخفض بسرعة في البداية لكنه يحافظ على ذيل طويل</p></td>
     <td><ul><li><p>موجزات الأخبار التي يُعد فيها الحداثة عاملاً حاسماً</p></li><li><p>وسائل التواصل الاجتماعي حيث يجب أن يهيمن المحتوى الجديد</p></li><li><p>عندما يُفضل القرب بشدة، لكن يجب أن تظل العناصر البعيدة الاستثنائية مرئية</p></li></ul></td>
     <td><p>في تطبيق الأخبار، تحتل أخبار الأمس مرتبة أعلى بكثير من المحتوى الذي يعود إلى أسبوع مضى، لكن المقالات القديمة ذات الصلة الوثيقة بالموضوع قد تظهر مع ذلك</p></td>
   </tr>
   <tr>
     <td><p>خطي (<code translate="no">linear</code>)</p></td>
     <td><p>انخفاض متسق ويمكن التنبؤ به مع حد فاصل واضح</p></td>
     <td><ul><li><p>التطبيقات ذات الحدود الطبيعية</p></li><li><p>الخدمات ذات حدود المسافة</p></li><li><p>المحتوى الذي له تواريخ انتهاء الصلاحية أو عتبات واضحة</p></li></ul></td>
     <td><p>في أداة البحث عن الأحداث، لا تظهر الأحداث التي تتجاوز فترة أسبوعين في المستقبل على الإطلاق</p></td>
   </tr>
</table>
<p>للحصول على معلومات تفصيلية حول كيفية حساب كل مصنف تضاؤل للنتائج وأنماط التضاؤل المحددة، يرجى الرجوع إلى الوثائق المخصصة:</p>
<ul>
<li><p><a href="/docs/ar/gaussian-decay.md">التناقص الغاوسي</a></p></li>
<li><p><a href="/docs/ar/exponential-decay.md">التناقص الأسي</a></p></li>
<li><p><a href="/docs/ar/linear-decay.md">التناقص الخطي</a></p></li>
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
    </button></h2><p>يمكن تطبيق مصنفات التناقص على كل من عمليات البحث المتجهي القياسي والبحث الهجين في Milvus. فيما يلي مقتطفات الكود الرئيسية لتنفيذ هذه الميزة.</p>
<div class="alert note">
<p>قبل استخدام دوال التناقص، يجب أولاً إنشاء مجموعة تحتوي على الحقول الرقمية المناسبة (مثل الطوابع الزمنية والمسافات وما إلى ذلك) التي ستُستخدم في حسابات التناقص. للاطلاع على أمثلة عملية كاملة تشمل إعداد المجموعة وتعريف المخطط وإدراج البيانات، راجع <a href="/docs/ar/tutorial-implement-a-time-based-ranking-in-milvus.md">البرنامج التعليمي: تنفيذ الترتيب القائم على الوقت في Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">إنشاء أداة ترتيب التناقص<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>لتنفيذ الترتيب التنازلي، قم أولاً بتعريف كائن « <code translate="no">Function</code> » (مصنف التناقص) بالتكوين المناسب:</p>
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

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().getEpochSecond())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;time_decay&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-number">1735689600</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;timestamp&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(<span class="hljs-number">1735689600</span>)
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;time_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;timestamp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1735689600</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">15</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a decay function for timestamp-based decay</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;time_decay&quot;</span>)     <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;timestamp&quot;</span>)                <span class="hljs-comment">// Numeric field to use for decay</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                       <span class="hljs-comment">// Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
    .WithOrigin(<span class="hljs-keyword">new</span> DateTimeOffset(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, TimeSpan.Zero).ToUnixTimeSeconds()) <span class="hljs-comment">// Reference point (seconds)</span>
    .WithScale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                 <span class="hljs-comment">// 7 days in seconds (must match collection data unit)</span>
    .WithOffset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                    <span class="hljs-comment">// 1 day no-decay zone (must match collection data unit)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>);                            <span class="hljs-comment">// Half score at scale distance</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>مطلوب؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة/المثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>نعم</p></td>
     <td><p>معرف الدالة الخاص بك الذي يُستخدم عند تنفيذ عمليات البحث. اختر اسمًا وصفياً مناسباً لحالة الاستخدام الخاصة بك.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>نعم</p></td>
     <td><p>حقل رقمي لحساب درجة التلاشي. يحدد سمة البيانات التي سيتم استخدامها لحساب التلاشي (على سبيل المثال، الطوابع الزمنية للتلاشي المستند إلى الوقت، والإحداثيات للتلاشي المستند إلى الموقع). </p><p>يجب أن يكون حقلًا في مجموعتك يحتوي على قيم رقمية ذات صلة. يدعم INT8/16/32/64 وFLOAT وDOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد نوع الدالة التي يتم إنشاؤها.</p><p>يجب تعيينه على « <code translate="no">RERANK</code> » لجميع أدوات ترتيب التلاشي.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد طريقة إعادة الترتيب المطلوب استخدامها.</p><p>يجب ضبطه على " <code translate="no">"decay"</code> " لتمكين وظيفة ترتيب التناقص.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد أداة ترتيب التناقص الرياضية التي سيتم تطبيقها. يحدد شكل منحنى انخفاض الصلة.</p><p>انظر قسم <a href="/docs/ar/decay-ranker-overview.md#Choose-the-right-decay-ranker">«اختيار أداة الترتيب التناقصي المناسبة»</a> للحصول على إرشادات حول اختيار الدالة المناسبة.</p></td>
     <td><p><code translate="no">"gauss"</code>، أو <code translate="no">"exp"</code> ، أو <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>نعم</p></td>
     <td><p>نقطة مرجعية تُحسب منها درجة التناقص. تحصل العناصر التي تبلغ هذه القيمة على أقصى درجات الصلة.</p><p>بالنسبة للتناقص القائم على الوقت، يجب أن تتطابق وحدة الوقت مع بيانات مجموعتك.</p></td>
     <td><ul><li><p>بالنسبة للطوابع الزمنية: الوقت الحالي (على سبيل المثال، <code translate="no">int(time.time())</code>)</p></li><li><p>بالنسبة للموقع الجغرافي: الإحداثيات الحالية للمستخدم</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>نعم</p></td>
     <td><p>المسافة أو الوقت الذي تنخفض عنده الصلة إلى القيمة <code translate="no">decay</code>. يتحكم في مدى سرعة انخفاض الصلة.</p><p>بالنسبة للتناقص القائم على الوقت، يجب أن تتطابق وحدة الوقت مع بيانات المجموعة الخاصة بك.</p><p>تؤدي القيم الأكبر إلى انخفاض تدريجي في الصلة؛ بينما تؤدي القيم الأصغر إلى انخفاض أكثر حدة.</p></td>
     <td><ul><li><p>بالنسبة للوقت: الفترة بالثواني (على سبيل المثال، <code translate="no">7 * 24 * 60 * 60</code> لمدة 7 أيام)</p></li><li><p>بالنسبة للمسافة: بالمتر (على سبيل المثال، <code translate="no">5000</code> لمسافة 5 كم)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>لا</p></td>
     <td><p>يُنشئ "منطقة خالية من التناقص" حول <code translate="no">origin</code> حيث تحتفظ العناصر بدرجاتها الكاملة (درجة التناقص = 1.0).</p><p>بالنسبة للتناقص القائم على الوقت، يجب أن تتطابق وحدة الوقت مع بيانات المجموعة الخاصة بك.</p><p>تحتفظ العناصر الواقعة ضمن هذا النطاق من <code translate="no">origin</code> بأقصى درجة من الصلة.</p></td>
     <td><ul><li><p>بالنسبة للوقت: الفترة بالثواني (على سبيل المثال، <code translate="no">24 * 60 * 60</code> لمدة يوم واحد)</p></li><li><p>بالنسبة للمسافة: بالمتر (على سبيل المثال، <code translate="no">500</code> لمسافة 500 متر)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>لا</p></td>
     <td><p>قيمة النتيجة عند مسافة « <code translate="no">scale</code> »، تتحكم في انحدار المنحنى. تؤدي القيم الأقل إلى منحنيات انخفاض أكثر انحدارًا؛ بينما تؤدي القيم الأعلى إلى منحنيات انخفاض أكثر تدريجيّة.</p><p>يجب أن تكون القيمة بين 0 و 1.</p></td>
     <td><p><code translate="no">0.5</code> (الافتراضي)</p></td>
   </tr>
</table>
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
    </button></h3><p>بعد تعريف مُصنِّف التناقص الخاص بك، يمكنك تطبيقه أثناء عمليات البحث عن طريق تمريره إلى المعلمة <code translate="no">ranker</code>:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;vector_field&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;document&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;timestamp&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector_field&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Use the decay function in standard vector search</span>
SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    Vectors = [yourQueryVector], <span class="hljs-comment">// Replace with your query vector</span>
    VectorFieldName = <span class="hljs-string">&quot;vector_field&quot;</span>,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span> },  <span class="hljs-comment">// Include the decay field in outputs to see values</span>
        FunctionScoreReranker = rerank,              <span class="hljs-comment">// Apply the decay ranker here</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
