---
id: language-identifier.md
title: معرّف اللغةCompatible with Milvus v2.5.15+
summary: >-
  مُعرّف_اللغة هو مُعرّف لغة متخصص مصمم لتعزيز قدرات البحث عن النص في ميلفوس من
  خلال أتمتة عملية تحليل اللغة. وتتمثل وظيفته الأساسية في اكتشاف لغة الحقل النصي
  ومن ثم تطبيق محلل تم تكوينه مسبقًا بشكل ديناميكي وهو الأكثر ملاءمة لتلك اللغة.
  يعد هذا الأمر ذا قيمة خاصة للتطبيقات التي تتعامل مع مجموعة متنوعة من اللغات،
  حيث إنه يلغي الحاجة إلى تعيين اللغة يدويًا على أساس كل مدخل.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">معرّف اللغة<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> هو مُعرّف لغة متخصص مصمم لتعزيز قدرات البحث عن النص في ميلفوس من خلال أتمتة عملية تحليل اللغة. وتتمثل وظيفته الأساسية في الكشف عن لغة حقل النص ثم تطبيق محلل تم تكوينه مسبقًا بشكل ديناميكي وهو الأكثر ملاءمة لتلك اللغة. يعد هذا الأمر ذا قيمة خاصة للتطبيقات التي تتعامل مع مجموعة متنوعة من اللغات، حيث أنه يلغي الحاجة إلى تعيين اللغة يدويًا على أساس كل مدخل.</p>
<p>من خلال توجيه البيانات النصية بذكاء إلى خط أنابيب المعالجة المناسب، يعمل <code translate="no">language_identifier</code> على تبسيط عملية استيعاب البيانات متعددة اللغات ويضمن ترميزًا دقيقًا لعمليات البحث والاسترجاع اللاحقة.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">سير عمل الكشف عن اللغة<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم <code translate="no">language_identifier</code> بتنفيذ سلسلة من الخطوات لمعالجة سلسلة نصية، وهو سير عمل مهم للمستخدمين لفهم كيفية تكوينه بشكل صحيح.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل اكتشاف اللغة</span> </span></p>
<ol>
<li><p><strong>الإدخال:</strong> يبدأ سير العمل بسلسلة نصية كمدخلات.</p></li>
<li><p><strong>اكتشاف اللغة:</strong> يتم تمرير هذه السلسلة أولاً إلى محرك اكتشاف اللغة، والذي يحاول تحديد اللغة. يدعم Milvus محركين: <strong>whatlang</strong> و <strong>lingua</strong>.</p></li>
<li><p><strong>اختيار المحلّل:</strong></p>
<ul>
<li><p><strong>النجاح:</strong> إذا تم اكتشاف اللغة بنجاح، يتحقق النظام مما إذا كان اسم اللغة المكتشفة يحتوي على محلل مطابق تم تكوينه في قاموسك <code translate="no">analyzers</code>. إذا تم العثور على تطابق، يقوم النظام بتطبيق المحلل المحدد على النص المدخل. على سبيل المثال، سيتم توجيه النص المكتشف "لغة الماندرين" إلى محلل الرموز <code translate="no">jieba</code>.</p></li>
<li><p><strong>احتياطي:</strong> إذا فشل الاكتشاف، أو إذا تم اكتشاف لغة ما بنجاح ولكنك لم تقدم محللًا محددًا لها، يقوم النظام بالتطبيق الافتراضي <strong>لمحلل افتراضي</strong> تم تكوينه مسبقًا. هذه نقطة مهمة للتوضيح؛ فالمحلل <code translate="no">default</code> هو محلل احتياطي لكل من فشل الكشف وعدم وجود محلل مطابق.</p></li>
</ul></li>
</ol>
<p>بعد اختيار المحلّل المناسب، يتم ترميز النص ومعالجته، ليكتمل سير العمل.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">محركات الكشف اللغوي المتاحة<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم ميلفوس الاختيار بين محركين للكشف عن اللغة:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>يعتمد الاختيار على متطلبات الأداء والدقة المحددة لتطبيقك.</p>
<table>
   <tr>
     <th><p>المحرك</p></th>
     <th><p>السرعة</p></th>
     <th><p>الدقة</p></th>
     <th><p>تنسيق الإخراج</p></th>
     <th><p>الأفضل ل</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>سريع</p></td>
     <td><p>جيد لمعظم اللغات</p></td>
     <td><p>أسماء اللغات (على سبيل المثال، <code translate="no">"English"</code> ، <code translate="no">"Mandarin"</code> ، ، <code translate="no">"Japanese"</code>)</p><p><strong>المرجع</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">عمود اللغة في جدول اللغات المدعومة</a></p></td>
     <td><p>تطبيقات الوقت الحقيقي حيث السرعة أمر بالغ الأهمية</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>أبطأ</p></td>
     <td><p>دقة أعلى، خاصة للنصوص القصيرة</p></td>
     <td><p>أسماء اللغات الإنجليزية (على سبيل المثال، <code translate="no">"English"</code> ، <code translate="no">"Chinese"</code> ، ، <code translate="no">"Japanese"</code>)</p><p><strong>مرجع:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">قائمة اللغات المدعومة</a></p></td>
     <td><p>التطبيقات التي تكون فيها الدقة أكثر أهمية من السرعة</p></td>
   </tr>
</table>
<p>هناك اعتبار حاسم هو اصطلاح التسمية الخاص بالمحرك. بينما يقوم كلا المحركين بإرجاع أسماء اللغات باللغة الإنجليزية، إلا أنهما يستخدمان مصطلحات مختلفة لبعض اللغات (على سبيل المثال، <code translate="no">whatlang</code> يُرجع <code translate="no">Mandarin</code> ، بينما <code translate="no">lingua</code> يُرجع <code translate="no">Chinese</code>). يجب أن يكون مفتاح المحلل مطابقًا تمامًا للاسم الذي يُرجعه محرك الكشف المختار.</p>
<h2 id="Configuration" class="common-anchor-header">التكوين<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستخدام أداة الترميز <code translate="no">language_identifier</code> بشكل صحيح، يجب اتخاذ الخطوات التالية لتحديد تكوينها وتطبيقها.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">الخطوة 1: اختر لغاتك ومحللاتك<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>إن جوهر إعداد <code translate="no">language_identifier</code> هو تخصيص المحللات الخاصة بك للغات المحددة التي تخطط لدعمها. يعمل النظام من خلال مطابقة اللغة المكتشفة مع المحلل الصحيح، لذا فإن هذه الخطوة ضرورية لمعالجة النص بدقة.</p>
<p>فيما يلي جدول موصى به لتعيين اللغات مع محللات ميلفوس المناسبة. يعمل هذا الجدول كجسر بين مخرجات محرك الكشف عن اللغة وأفضل أداة للمهمة.</p>
<table>
   <tr>
     <th><p>اللغة (مخرجات الكاشف)</p></th>
     <th><p>المحلل الموصى به</p></th>
     <th><p>الوصف</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>ترميز قياسي للغة الإنجليزية مع تصفية الجذعية وكلمات التوقف.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (عن طريق whatlang) أو <code translate="no">Chinese</code> (عن طريق lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>تجزئة الكلمات الصينية للنصوص غير المحدّدة المسافات.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>أداة ترميز قوية للنصوص المعقدة، بما في ذلك اليابانية.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>تكوين مخصص يتعامل مع اللكنات والأحرف الفرنسية.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>المطابقة هي المفتاح:</strong> <strong>يجب أن يتطابق</strong> اسم المحلل الخاص بك <strong>تمامًا مع</strong> مخرجات اللغة لمحرك الكشف. على سبيل المثال، إذا كنت تستخدم <code translate="no">whatlang</code> ، يجب أن يكون مفتاح النص الصيني <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>أفضل الممارسات:</strong> يوفر الجدول أعلاه التكوينات الموصى بها لبعض اللغات الشائعة، ولكنها ليست قائمة شاملة. للحصول على دليل أكثر شمولاً حول اختيار أجهزة التحليل، راجع <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md">اختيار المحلل المناسب لحالة الاستخدام الخاصة بك</a>.</p></li>
<li><p><strong>مخرجات الكاشف</strong>: للحصول على قائمة كاملة بأسماء اللغات التي تُرجعها محركات الكشف، راجع <a href="https://github.com/greyblake/whatlang-rs">جدول اللغات المدعومة من Whatlang</a> <a href="https://github.com/pemistahl/lingua-rs">وقائمة اللغات المدعومة من Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">الخطوة 2: تحديد analyzer_params<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>لاستخدام أداة الترميز <code translate="no">language_identifier</code> في Milvus، قم بإنشاء قاموس يحتوي على هذه المكونات الرئيسية:</p>
<p><strong>المكونات المطلوبة:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> مجموعة التكوين - قاموس يحتوي على جميع تكوينات المحلل، والتي يجب أن تتضمن:</p>
<ul>
<li><p><code translate="no">default</code> - المحلل الاحتياطي المستخدم في حالة فشل اكتشاف اللغة أو عدم العثور على محلل مطابق</p></li>
<li><p><strong>المحللات الخاصة باللغة</strong> - كل محلل<strong>خاص باللغة</strong> - يتم تعريف كل منها على أنه <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> ، حيث:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> يطابق مخرجات محرك الكشف الذي اخترته (على سبيل المثال، <code translate="no">&quot;English&quot;</code> ، <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> يتبع تنسيق معلمات المحلل القياسي (انظر <a href="/docs/ar/analyzer-overview.md#Analyzer-types">نظرة عامة على المحلل</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>مكونات اختيارية:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - يحدد محرك اكتشاف اللغة المراد استخدامه (<code translate="no">whatlang</code> أو <code translate="no">lingua</code>). افتراضي إلى <code translate="no">whatlang</code> إذا لم يتم تحديده</p></li>
<li><p><code translate="no">mapping</code> - ينشئ أسماء مستعارة مخصصة لمحللاتك، مما يسمح لك باستخدام أسماء وصفية بدلاً من تنسيق الإخراج الدقيق لمحرك الكشف</p></li>
</ul>
<p>يعمل الرمز المميز من خلال الكشف أولاً عن لغة النص المدخل، ثم تحديد المحلل المناسب من التكوين الخاص بك. في حالة فشل الكشف أو عدم وجود محلل مطابق، فإنه يعود تلقائيًا إلى محلل <code translate="no">default</code> الخاص بك.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">موصى به: مطابقة الاسم المباشر</h4><p>يجب أن تتطابق أسماء المحللات الخاصة بك تمامًا مع مخرجات محرك اكتشاف اللغة الذي اخترته. هذا النهج أبسط ويتجنب الالتباس المحتمل.</p>
<p>بالنسبة لكل من <code translate="no">whatlang</code> و <code translate="no">lingua</code> ، استخدم أسماء اللغات كما هو موضح في الوثائق الخاصة بكل منها:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">اللغات المدعومة من whatlang</a> (استخدم عمود<strong>"اللغة</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">اللغات المدعومة من lingua</a></p></li>
</ul>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">النهج البديل: الأسماء المخصصة مع التعيين</h4><p>إذا كنت تفضل استخدام أسماء المحللين المخصصة أو تحتاج إلى الحفاظ على التوافق مع التكوينات الحالية، يمكنك استخدام المعلمة <code translate="no">mapping</code>. يؤدي هذا إلى إنشاء أسماء مستعارة لمحللاتك - ستعمل كل من أسماء محرك الكشف الأصلية وأسماءك المخصصة.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>بعد تحديد <code translate="no">analyzer_params</code> ، يمكنك تطبيقها على حقل <code translate="no">VARCHAR</code> عند تحديد مخطط المجموعة. يسمح ذلك لميلفوس بمعالجة النص في ذلك الحقل باستخدام المحلل المحدد من أجل ترميز وتصفية فعالة. لمزيد من التفاصيل، راجع <a href="/docs/ar/analyzer-overview.md#Example-use">مثال الاستخدام</a>.</p>
<h2 id="Examples" class="common-anchor-header">أمثلة<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي بعض التكوينات الجاهزة للاستخدام للسيناريوهات الشائعة. يتضمن كل مثال كلاً من التكوين ورمز التحقق حتى تتمكن من اختبار الإعداد على الفور.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">الكشف عن اللغة الإنجليزية والصينية<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">اللغات الأوروبية مع تطبيع اللكنة<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>, 
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p><strong>لغة واحدة لكل حقل:</strong> يعمل على الحقل كوحدة نصية واحدة متجانسة. وهو مصمم للتعامل مع لغات مختلفة عبر سجلات بيانات مختلفة، مثل أن يحتوي أحد السجلات على جملة إنجليزية ويحتوي السجل التالي على جملة فرنسية.</p></li>
<li><p><strong>لا توجد سلاسل لغات مختلطة:</strong> <strong>لم</strong> يتم تصميمه للتعامل مع سلسلة واحدة تحتوي على نص من لغات متعددة. على سبيل المثال، سيتم معالجة حقل واحد <code translate="no">VARCHAR</code> يحتوي على جملة إنجليزية وعبارة يابانية مقتبسة كلغة واحدة.</p></li>
<li><p><strong>معالجة اللغة السائدة:</strong> في سيناريوهات اللغات المختلطة، من المرجح أن يحدد محرك الكشف اللغة السائدة، وسيتم تطبيق المحلل المقابل على النص بأكمله. سيؤدي ذلك إلى ضعف أو عدم وجود ترميز للنص الأجنبي المضمّن.</p></li>
</ul>
