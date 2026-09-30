---
id: choose-the-right-analyzer-for-your-use-case.md
title: اختر جهاز التحليل المناسب لحالة الاستخدام الخاصة بك
summary: ملاحظات
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">اختر جهاز التحليل المناسب لحالة الاستخدام الخاصة بك<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>يركز هذا الدليل على اتخاذ القرارات العملية لاختيار جهاز التحليل. للحصول على التفاصيل الفنية حول مكونات جهاز التحليل وكيفية إضافة معلمات جهاز التحليل، راجع " <a href="/docs/ar/analyzer-overview.md">نظرة عامة</a> على <a href="/docs/ar/analyzer-overview.md">جهاز التحليل</a>".</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">فهم أجهزة التحليل في دقيقتين<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>في Milvus، يقوم المحلل بمعالجة النص المخزن في هذا الحقل لجعله قابلاً للبحث عن ميزات مثل <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a> (BM25) أو <a href="/docs/ar/phrase-match.md">مطابقة العبارات</a> أو <a href="/docs/ar/keyword-match.md">مطابقة النص</a>. فكر فيه على أنه معالج نصي يحول المحتوى الخام الخاص بك إلى رموز قابلة للبحث.</p>
<p>يعمل المحلل في مسار بسيط من مرحلتين:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>سير عمل المحلل</span>
  
 </span></p>
<ol>
<li><p><strong>التقطيع إلى رموز (إجباري):</strong> تُطبق في هذه المرحلة الأولية أداة <strong>التقطيع إلى رموز</strong> لتقسيم سلسلة نصية متصلة إلى وحدات منفصلة ذات معنى تُسمى الرموز. قد تختلف طريقة التقطيع إلى رموز بشكل كبير اعتمادًا على اللغة ونوع المحتوى.</p></li>
<li><p><strong>تصفية الرموز (اختياري):</strong> بعد الترميز، تُطبق <strong>المرشحات</strong> لتعديل الرموز أو إزالتها أو تحسينها. يمكن أن تشمل هذه العمليات تحويل جميع الرموز إلى أحرف صغيرة، أو إزالة الكلمات الشائعة التي لا معنى لها (مثل الكلمات الممنوعة)، أو اختزال الكلمات إلى صيغتها الجذرية (الاستخلاص).</p></li>
</ol>
<p><strong>مثال</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">لماذا يهم اختيار أداة التحليل<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>قد يؤدي اختيار المحلل الخاطئ إلى جعل المستندات ذات الصلة غير قابلة للبحث أو إرجاع نتائج غير ذات صلة.</p>
<p>يلخص الجدول التالي المشكلات الشائعة الناتجة عن الاختيار غير السليم للمحلل، ويقدم حلولاً عملية لتشخيص مشكلات البحث.</p>
<table>
   <tr>
     <th><p>المشكلة</p></th>
     <th><p>الأعراض</p></th>
     <th><p>مثال (المدخلات والمخرجات)</p></th>
     <th><p>السبب (المحلل غير المناسب)</p></th>
     <th><p>الحل (محلل جيد)</p></th>
   </tr>
   <tr>
     <td><p>التجزئة المفرطة</p></td>
     <td><p>تفشل الاستعلامات النصية عن المصطلحات الفنية أو المعرفات أو عناوين URL في العثور على المستندات ذات الصلة.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ar/standard-analyzer.md"><code translate="no">standard</code></a> المحلل</p></td>
     <td><p>استخدم <a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> مُجزئ؛ وادمجه مع <a href="/docs/ar/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> مرشح.</p></td>
   </tr>
   <tr>
     <td><p>التجزئة الناقصة</p></td>
     <td><p>يفشل البحث عن أحد مكونات عبارة مكونة من عدة كلمات في إرجاع المستندات التي تحتوي على العبارة كاملة.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>محلل مع <a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> أداة التقطيع</p></td>
     <td><p>استخدم <a href="/docs/ar/standard-tokenizer.md"><code translate="no">standard</code></a> أداة تجزئة لتقسيم العبارة بناءً على علامات الترقيم والمسافات؛ واستخدم مرشحًا مخصصًا <a href="/docs/ar/regex-filter.md">يعتمد على التعبيرات العادية</a>.</p></td>
   </tr>
   <tr>
     <td><p>عدم تطابق اللغة</p></td>
     <td><p>نتائج البحث بلغة معينة غير منطقية أو غير موجودة.</p></td>
     <td><p>النص الصيني: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (رمز واحد)</p></td>
     <td><p><a href="/docs/ar/english-analyzer.md"><code translate="no">english</code></a> المحلل</p></td>
     <td><p>استخدم محللًا خاصًا باللغة، مثل <a href="/docs/ar/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>عدم تطابق طريقة الإدخال</p></td>
     <td><p>يكتب المستخدمون بالبينيين، لكن النص المفهرس يستخدم الأحرف الصينية.</p></td>
     <td><p>النص الصيني: <code translate="no">"足球"</code> ؛ نص الاستعلام: <code translate="no">"zuqiu"</code></p></td>
     <td><p>المحلل الذي يُنتج رموزًا بالأحرف الصينية فقط</p></td>
     <td><p>استخدم محللًا مخصصًا مع <a href="/docs/ar/jieba-tokenizer.md"><code translate="no">jieba</code></a> أداة التقطيع <a href="/docs/ar/pinyin-filter.md"><code translate="no">pinyin</code></a> filter.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">السؤال الأول: هل تحتاج إلى اختيار محلل؟<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>في العديد من حالات الاستخدام، لا تحتاج إلى القيام بأي شيء خاص. دعنا نحدد ما إذا كنت من بين هذه الحالات.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">السلوك الافتراضي: محلل « <code translate="no">standard</code> »<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا لم تحدد محللًا عند استخدام ميزات استرجاع النص مثل البحث عن النص الكامل، فإن Milvus يستخدم تلقائيًا محلل <a href="/docs/ar/standard-analyzer.md"><code translate="no">standard</code></a> المحلل تلقائيًا.</p>
<p>مُحلل « <code translate="no">standard</code> »:</p>
<ul>
<li><p>يقسم النص بناءً على المسافات وعلامات الترقيم</p></li>
<li><p>يحول جميع الرموز إلى أحرف صغيرة</p></li>
<li><p>يزيل مجموعة مدمجة من الكلمات الممنوعة الشائعة في اللغة الإنجليزية ومعظم علامات الترقيم</p></li>
</ul>
<p><strong>مثال على التحويل</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">معايير اتخاذ القرار: فحص سريع<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم هذا الجدول لتحديد بسرعة ما إذا كان محلل " <code translate="no">standard</code> " الافتراضي يلبي احتياجاتك. إذا لم يكن كذلك، فستحتاج إلى اختيار مسار مختلف.</p>
<table>
   <tr>
     <th><p>المحتوى الخاص بك</p></th>
     <th><p>هل المحلل القياسي مناسب؟</p></th>
     <th><p>لماذا</p></th>
     <th><p>ما تحتاجه</p></th>
   </tr>
   <tr>
     <td><p>منشورات مدونة باللغة الإنجليزية</p></td>
     <td><p>✅ نعم</p></td>
     <td><p>السلوك الافتراضي كافٍ.</p></td>
     <td><p>استخدم الإعداد الافتراضي (لا حاجة إلى تكوين).</p></td>
   </tr>
   <tr>
     <td><p>المستندات باللغة الصينية</p></td>
     <td><p>❌ لا</p></td>
     <td><p>الكلمات الصينية لا تحتوي على مسافات وسيتم التعامل معها كرمز واحد.</p></td>
     <td><p>استخدم محللًا مدمجًا <a href="/docs/ar/chinese-analyzer.md"><code translate="no">chinese</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>المستندات العربية</p></td>
     <td><p>❌ لا</p></td>
     <td><p>قد يتضمن النص العربي أشكالًا مختلفة للحروف، وعلامات التشكيل، والتطويل، والأرقام العربية-الهندية، والكلمات الممنوعة الشائعة في اللغة العربية التي تتطلب معالجة خاصة باللغة.</p></td>
     <td><p>استخدم محللًا مدمجًا <a href="/docs/ar/arabic-analyzer.md"><code translate="no">arabic</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>المستندات التايلاندية</p></td>
     <td><p>❌ لا</p></td>
     <td><p>النص التايلاندي عادةً لا يستخدم مسافات بين الكلمات، لذا فهو يحتاج إلى تجزئة الكلمات الخاصة باللغة.</p></td>
     <td><p>استخدم محللًا مدمجًا <a href="/docs/ar/thai-analyzer.md"><code translate="no">thai</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>الوثائق الفنية</p></td>
     <td><p>❌ لا</p></td>
     <td><p>يتم إزالة علامات الترقيم من مصطلحات مثل <code translate="no">C++</code>.</p></td>
     <td><p>قم بإنشاء محلل مخصص باستخدام <a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> مُجزئ الرموز و <a href="/docs/ar/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> مرشح.</p></td>
   </tr>
   <tr>
     <td><p>اللغات التي تفصل بين الكلمات بمسافات مثل النصوص باللغتين الفرنسية والإسبانية</p></td>
     <td><p>⚠️ ربما</p></td>
     <td><p>الأحرف المُشَدَّدة (<code translate="no">café</code> مقابل <code translate="no">cafe</code>) قد لا تتطابق.</p></td>
     <td><p>يُنصح باستخدام محلل مخصص مع <a href="/docs/ar/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> للحصول على نتائج أفضل.</p></td>
   </tr>
   <tr>
     <td><p>اللغات متعددة اللغات أو غير المعروفة</p></td>
     <td><p>❌ لا</p></td>
     <td><p>يفتقر محلل <code translate="no">standard</code> إلى المنطق الخاص باللغة المطلوب للتعامل مع مجموعات الأحرف المختلفة وقواعد التقطيع.</p></td>
     <td><p>استخدم محللًا مخصصًا مع <a href="/docs/ar/icu-tokenizer.md"><code translate="no">icu</code></a> أداة التقطيع من أجل التقطيع المتوافق مع يونيكود. </p><p>أو بدلاً من ذلك، ضع في اعتبارك تكوين <a href="/docs/ar/multi-language-analyzers.md">محللات متعددة اللغات</a> أو <a href="/docs/ar/language-identifier.md">معرّف لغة</a> لمعالجة المحتوى متعدد اللغات بدقة أكبر.</p></td>
   </tr>
</table>
<p>إذا كان محلل « <code translate="no">standard</code> » الافتراضي لا يلبي متطلباتك، فستحتاج إلى تنفيذ محلل آخر. أمامك مساران:</p>
<ul>
<li><p><a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">استخدام محلل مدمج</a> أو</p></li>
<li><p><a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">إنشاء محلل مخصص</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">الطريق أ: استخدام المحللات المدمجة<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>المحللات المدمجة هي حلول مُهيأة مسبقًا للغات الشائعة. وهي أسهل طريقة للبدء عندما لا يكون المحلل القياسي الافتراضي مناسبًا تمامًا.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">المحللات المدمجة المتاحة<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>المحلل</p></th>
     <th><p>اللغة المدعومة</p></th>
     <th><p>المكونات</p></th>
     <th><p>ملاحظات</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>معظم اللغات التي تفصل بين الكلمات بمسافات (الإنجليزية، الفرنسية، الألمانية، الإسبانية، إلخ)</p></td>
     <td><ul><li><p>أداة التقطيع: <code translate="no">standard</code></p></li><li><p>المرشحات: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>محلل عام الغرض لمعالجة النص الأولية. بالنسبة للسيناريوهات أحادية اللغة، توفر المحللات الخاصة باللغة (مثل <code translate="no">english</code>) أداءً أفضل.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>مخصص للغة الإنجليزية، ويطبق عملية استخلاص الجذور وإزالة الكلمات غير المهمة لتحسين المطابقة الدلالية باللغة الإنجليزية</p></td>
     <td><ul><li><p>أداة تجزئة الكلمات: <code translate="no">standard</code></p></li><li><p>الفلاتر: <code translate="no">lowercase</code> ، <code translate="no">stemmer</code> ، <code translate="no">stop</code></p></li></ul></td>
     <td><p>موصى به للمحتوى باللغة الإنجليزية فقط بدلاً من <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>الصينية</p></td>
     <td><ul><li><p>أداة تجزئة الكلمات: <code translate="no">jieba</code></p></li><li><p>المرشحات: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>يستخدم حاليًا قاموس الصينية المبسطة بشكل افتراضي.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>اللغة العربية</p></td>
     <td><ul><li><p>مُجزئ الكلمات: <code translate="no">standard</code></p></li><li><p>المرشحات: <code translate="no">lowercase</code> ، <code translate="no">decimaldigit</code> ، <code translate="no">arabic_normalization</code> ، <code translate="no">stemmer</code> ، <code translate="no">stop</code></p></li></ul></td>
     <td><p>موصى به للنصوص العربية بدلاً من <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>التايلاندية</p></td>
     <td><ul><li><p>أداة التقطيع: <code translate="no">thai</code></p></li><li><p>المرشحات: <code translate="no">lowercase</code> ، <code translate="no">decimaldigit</code> ، <code translate="no">stop</code></p></li></ul></td>
     <td><p>موصى به للنصوص التايلاندية بدلاً من <code translate="no">standard</code> أو التقطيع القائم على المسافات البيضاء.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">مثال على التنفيذ<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>لاستخدام محلل مدمج، ما عليك سوى تحديد نوعه في <code translate="no">analyzer_params</code> عند تعريف مخطط الحقل الخاص بك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>للحصول على تفاصيل الاستخدام، راجع <a href="/docs/ar/full-text-search.md">البحث</a> عن <a href="/docs/ar/full-text-search.md">النص الكامل</a> أو <a href="/docs/ar/keyword-match.md">مطابقة النص</a> أو <a href="/docs/ar/phrase-match.md">مطابقة العبارة</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">الطريقة ب: إنشاء محلل مخصص<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>عندما لا تلبي <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">الخيارات المدمجة</a> احتياجاتك، يمكنك إنشاء محلل مخصص عن طريق دمج أداة التقطيع مع مجموعة من المرشحات. يمنحك هذا تحكمًا كاملاً في مسار معالجة النص.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">الخطوة 1: حدد أداة التقطيع بناءً على اللغة<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>اختر أداة التقطيع بناءً على اللغة الأساسية للمحتوى الخاص بك:</p>
<h4 id="Western-languages" class="common-anchor-header">اللغات الغربية</h4><p>بالنسبة للغات التي تفصل بين الكلمات بمسافات، تتوفر لديك الخيارات التالية:</p>
<table>
   <tr>
     <th><p>أداة تجزئة النص</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>الأفضل لـ</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>يقسم النص بناءً على المسافات وعلامات الترقيم</p></td>
     <td><p>نص عام، علامات ترقيم متنوعة</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>المخرجات: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>يقسم النص بناءً على أحرف المسافات البيضاء فقط</p></td>
     <td><p>محتوى معالج مسبقًا، نص منسق من قبل المستخدم</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>المخرجات: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">لغات شرق آسيا</h4><p>تتطلب اللغات التي لا تستخدم المسافات بشكل متسق بين الكلمات أدوات تقطيع متخصصة لتقسيم الكلمات بشكل صحيح:</p>
<h5 id="Chinese" class="common-anchor-header">الصينية</h5><table>
   <tr>
     <th><p>أداة تجزئة</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>الأفضل لـ</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>التجزئة المستندة إلى القاموس الصيني باستخدام خوارزمية ذكية</p></td>
     <td><p><strong>موصى به للمحتوى الصيني</strong> - يجمع بين القاموس والخوارزميات الذكية، وهو مصمم خصيصًا للغة الصينية</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>المخرجات: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>تحليل صرفي يعتمد كليًا على القاموس باستخدام قاموس اللغة الصينية (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>بالمقارنة مع <code translate="no">jieba</code> ، يعالج النص الصيني بطريقة أكثر عمومية</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"机器学习算法"</code></p></li><li><p>المخرجات: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">التايلاندية</h5><p>بالنسبة لمعظم النصوص التايلاندية، استخدم <a href="/docs/ar/thai-analyzer.md"><code translate="no">thai</code></a> . استخدم أداة <a href="/docs/ar/thai-tokenizer.md"><code translate="no">thai</code></a> فقط عندما تحتاج إلى إنشاء مسار محلل مخصص.</p>
<table>
   <tr>
     <th><p>أداة تقطيع النصوص</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>الأفضل لـ</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>يقسم النص التايلاندي إلى رموز كلمات ويستبعد المسافات البيضاء والمقاطع التي تحتوي على علامات الترقيم فقط</p></td>
     <td><p>مسارات تحليل مخصصة للنصوص التايلاندية أو النصوص المختلطة بين التايلاندية والإنجليزية</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>المخرجات: <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">اليابانية والكورية</h5><table>
   <tr>
     <th><p>اللغة</p></th>
     <th><p>أداة التقطيع</p></th>
     <th><p>خيارات القاموس</p></th>
     <th><p>الأفضل لـ</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p>اليابانية</p></td>
     <td><p><a href="/docs/ar/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (للأغراض العامة)، <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (المصطلحات الحديثة)، <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (الأكاديمي)</p></td>
     <td><p>التحليل الصرفي مع معالجة الأسماء الخاصة</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">"東京都渋谷区"</code></p></li><li><p>المخرجات: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>الكورية</p></td>
     <td><p><a href="/docs/ar/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>التحليل الصرفي للغة الكورية</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"안녕하세요"</code></p></li><li><p>المخرجات: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">اللغات المتعددة أو غير المعروفة</h4><p>بالنسبة للمحتوى الذي تكون فيه اللغات غير متوقعة أو مختلطة داخل المستندات:</p>
<table>
   <tr>
     <th><p>أداة تجزئة الكلمات</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>الأفضل لـ</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>التقطيع المراعي لـ Unicode (المكونات الدولية لـ Unicode)</p></td>
     <td><p>النصوص المختلطة، أو اللغات غير المعروفة، أو عندما يكون التقطيع البسيط كافياً</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>المخرجات: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>متى تستخدم icu</strong>:</p>
<ul>
<li><p>اللغات المختلطة التي يكون فيها تحديد اللغة غير عملي.</p></li>
<li><p>عندما لا ترغب في تحمل العبء الإضافي <a href="/docs/ar/multi-language-analyzers.md">لمحللات اللغات المتعددة</a> أو أداة <a href="/docs/ar/language-identifier.md">تحديد اللغة</a>.</p></li>
<li><p>يحتوي المحتوى على لغة أساسية مع وجود كلمات أجنبية متفرقة لا تسهم كثيرًا في المعنى العام (على سبيل المثال، نص باللغة الإنجليزية يحتوي على أسماء علامات تجارية أو مصطلحات تقنية متفرقة باللغة اليابانية أو الفرنسية).</p></li>
</ul>
<p><strong>طرق بديلة</strong>: لمعالجة المحتوى متعدد اللغات بدقة أكبر، ضع في اعتبارك استخدام محللات متعددة اللغات أو محدد اللغة. لمزيد من التفاصيل، راجع <a href="/docs/ar/multi-language-analyzers.md">محللات متعددة اللغات</a> أو <a href="/docs/ar/language-identifier.md">محدد اللغة</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">الخطوة 2: إضافة عوامل تصفية لتحسين الدقة<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">تحديد أداة التقطيع</a>، قم بتطبيق المرشحات بناءً على متطلبات البحث المحددة وخصائص المحتوى.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">المرشحات الشائعة الاستخدام</h4><p>تعد هذه المرشحات أساسية لمعظم تكوينات اللغات المفصولة بمسافات (الإنجليزية، الفرنسية، الألمانية، الإسبانية، إلخ) وتحسّن جودة البحث بشكل كبير:</p>
<table>
   <tr>
     <th><p>المرشح</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>متى يُستخدم</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>تحويل جميع الرموز إلى أحرف صغيرة</p></td>
     <td><p>عام - ينطبق على جميع اللغات التي تميز بين الأحرف الكبيرة والصغيرة</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>المخرجات: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>تقليص الكلمات إلى صيغتها الأصلية</p></td>
     <td><p>اللغات التي تحتوي على تصريفات الكلمات (الإنجليزية، الفرنسية، الألمانية، إلخ)</p></td>
     <td><p>بالنسبة للغة الإنجليزية:</p><ul><li><p>الإدخال: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>الناتج: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>إزالة الكلمات الشائعة التي لا معنى لها</p></td>
     <td><p>معظم اللغات - فعال بشكل خاص للغات التي تفصل الكلمات بمسافات</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>المخرجات: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>بالنسبة للغات شرق آسيا (الصينية، اليابانية، الكورية، إلخ)، ركز بدلاً من ذلك على <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">المرشحات الخاصة بكل لغة</a>. عادةً ما تستخدم هذه اللغات أساليب مختلفة لمعالجة النصوص وقد لا تستفيد بشكل كبير من عملية استخلاص الجذور.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">مرشحات توحيد النص</h4><p>تعمل هذه المرشحات على توحيد الاختلافات في النص لتحسين اتساق المطابقة:</p>
<table>
   <tr>
     <th><p>المرشح</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>متى تُستخدم</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>تحويل الأحرف المُشَدَّدة إلى نظائرها في ASCII</p></td>
     <td><p>المحتوى الدولي، والمحتوى الذي ينشئه المستخدمون</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>المخرجات: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">تصفية الرموز</h4><p>التحكم في الرموز التي يتم الاحتفاظ بها بناءً على محتوى الحرف أو طوله:</p>
<table>
   <tr>
     <th><p>تصفية</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>متى تستخدم</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>إزالة الرموز النحوية المستقلة</p></td>
     <td><p>تنقية النتائج الناتجة عن أدوات تحليل العلامات التالية: <code translate="no">jieba</code> ، <code translate="no">lindera</code> ، <code translate="no">icu</code> ، والتي تعرض علامات الترقيم كوحدات منفردة</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>المخرجات: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>الاحتفاظ بالحروف والأرقام فقط</p></td>
     <td><p>المحتوى التقني، معالجة النص النظيف</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>المخرجات: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>إزالة الرموز التي تقع خارج نطاق الطول المحدد</p></td>
     <td><p>تصفية الضوضاء (الرموز الطويلة بشكل مفرط)</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>المخرجات: <code translate="no">[['a'], ['very'], []]</code> (إذا كان <strong>الحد الأقصى = 10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>التصفية المخصصة القائمة على الأنماط</p></td>
     <td><p>متطلبات الرموز الخاصة بالمجال</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["test123", "prod456"]</code></p></li><li><p>المخرجات: <code translate="no">[[], ['prod456']]</code> (إذا كان <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">مرشحات خاصة باللغة</h4><p>تتعامل هذه المرشحات مع خصائص لغوية محددة:</p>
<table>
   <tr>
     <th><p>المرشح</p></th>
     <th><p>اللغة</p></th>
     <th><p>كيفية العمل</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>الألمانية</p></td>
     <td><p>يقسم الكلمات المركبة إلى مكونات قابلة للبحث</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>المخرجات: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>الصينية</p></td>
     <td><p>يحتفظ بالأحرف الصينية + الأحرف الأبجدية الرقمية</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>المخرجات: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>الصينية</p></td>
     <td><p>يحتفظ بالأحرف الصينية فقط</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>المخرجات: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>الصينية</p></td>
     <td><p>يُصدر أشكال رموز بينيين للرموز الصينية</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["中文"]</code></p></li><li><p>المخرجات: <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">الخطوة 3: الدمج والتنفيذ<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>لإنشاء محلل مخصص، عليك تعريف أداة التقطيع وقائمة المرشحات في قاموس <code translate="no">analyzer_params</code>. يتم تطبيق المرشحات بالترتيب الذي ترد به في القائمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">النهاية: الاختبار باستخدام <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>تأكد دائمًا من صحة التكوين قبل تطبيقه على مجموعة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>المشكلات الشائعة التي يجب التحقق منها:</p>
<ul>
<li><p><strong>التقطيع المفرط</strong>: تقسيم المصطلحات الفنية بشكل غير صحيح</p></li>
<li><p><strong>التجزئة الناقصة</strong>: عدم فصل العبارات بشكل صحيح</p></li>
<li><p><strong>الرموز المفقودة</strong>: يتم استبعاد المصطلحات المهمة</p></li>
</ul>
<p>للحصول على تفاصيل الاستخدام، راجع <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">التكوينات الموصى بها حسب حالة الاستخدام<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم هذا القسم إعدادات مقترحة لمُجزئ الرموز والمرشحات لحالات الاستخدام الشائعة عند العمل مع أدوات التحليل في Milvus. اختر التركيبة التي تتناسب بشكل أفضل مع نوع المحتوى ومتطلبات البحث الخاصة بك.</p>
<div class="alert note">
<p>قبل تطبيق أداة التحليل على مجموعتك، نوصيك باستخدام <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> لاختبار أداء تحليل النص والتحقق من صحته.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">اللغات التي تحتوي على علامات التشكيل (الفرنسية، الإسبانية، الألمانية، إلخ)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم أداة التقطيع « <code translate="no">standard</code> » مع تحويل الأحرف إلى صغرى، واستخلاص الجذور الخاصة باللغة، وإزالة الكلمات الممنوعة. يعمل هذا التكوين أيضًا مع اللغات الأوروبية الأخرى عن طريق تعديل المعلمات « <code translate="no">language</code> » و« <code translate="no">stop_words</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">المحتوى باللغة الإنجليزية<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>لمعالجة النصوص الإنجليزية مع تصفية شاملة. يمكنك أيضًا استخدام أداة التحليل المدمجة <a href="/docs/ar/english-analyzer.md"><code translate="no">english</code></a> المُحلل المدمج:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">المحتوى الصيني<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم أداة تحليل الكلمات " <code translate="no">jieba</code> " وقم بتطبيق مرشح الأحرف للاحتفاظ فقط بالأحرف الصينية والحروف اللاتينية والأرقام.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>بالنسبة للصينية المبسطة، يقوم <code translate="no">cnalphanumonly</code> بإزالة جميع الرموز باستثناء الأحرف الصينية والنص الأبجدي الرقمي والأرقام. وهذا يمنع علامات الترقيم من التأثير على جودة البحث.</p>
</div>
<p>إذا كان من المحتمل أن يبحث المستخدمون عن نص صيني عن طريق كتابة بينيين، فاستخدم محللًا مخصصًا مع أداة تجزئة <code translate="no">jieba</code> وفلتر <a href="/docs/ar/pinyin-filter.md"><code translate="no">pinyin</code></a> بدلاً من محلل « <code translate="no">chinese</code> » المدمج.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">المحتوى الياباني<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم أداة تجزئة « <code translate="no">lindera</code> » مع القاموس الياباني والمرشحات لتنقية علامات الترقيم والتحكم في طول الرموز:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">المحتوى الكوري<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>على غرار اللغة اليابانية، استخدم أداة تجزئة <code translate="no">lindera</code> مع القاموس الكوري:</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">المحتوى المختلط أو متعدد اللغات<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>عند التعامل مع محتوى يمتد عبر لغات متعددة أو يستخدم أنظمة كتابة غير متوقعة، ابدأ باستخدام محلل <code translate="no">icu</code>. يتعامل هذا المحلل الذي يدعم Unicode مع أنظمة الكتابة والرموز المختلطة بفعالية.</p>
<p><strong>التكوين الأساسي متعدد اللغات (بدون استخلاص الجذور)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>المعالجة المتعددة اللغات المتقدمة</strong>:</p>
<p>للتحكم بشكل أفضل في سلوك الرموز عبر اللغات المختلفة:</p>
<ul>
<li><p>استخدم تكوين <strong>محلل متعدد اللغات</strong>. لمزيد من التفاصيل، راجع <a href="/docs/ar/multi-language-analyzers.md">المحللات متعددة اللغات</a>.</p></li>
<li><p>قم بتنفيذ <strong>معرّف اللغة</strong> على المحتوى الخاص بك. لمزيد من التفاصيل، راجع " <a href="/docs/ar/language-identifier.md">معرّف اللغة</a>".</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">التكامل مع ميزات استرجاع النصوص<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد اختيار المحلل الخاص بك، يمكنك دمجه مع ميزات استرجاع النص التي يوفرها Milvus.</p>
<ul>
<li><p><strong>البحث عن النص الكامل</strong></p>
<p>تؤثر المحللات بشكل مباشر على البحث عن النص الكامل القائم على BM25 من خلال إنشاء متجهات متفرقة. استخدم نفس المحلل لكل من الفهرسة والاستعلام لضمان تجزئة متسقة. توفر المحللات الخاصة باللغة عمومًا تقييم BM25 أفضل من المحللات العامة. للحصول على تفاصيل التنفيذ، راجع " <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>".</p></li>
<li><p><strong>مطابقة النص</strong></p>
<p>تقوم عمليات مطابقة النص بمطابقة الرموز بشكل دقيق بين الاستعلامات والمحتوى المفهرس بناءً على ناتج أداة التحليل الخاصة بك. للحصول على تفاصيل التنفيذ، راجع " <a href="/docs/ar/keyword-match.md">مطابقة النص</a>".</p></li>
<li><p><strong>مطابقة العبارات</strong></p>
<p>تتطلب مطابقة العبارات تجزئة متسقة عبر التعبيرات المكونة من عدة كلمات للحفاظ على حدود العبارات ومعناها. للحصول على تفاصيل التنفيذ، راجع " <a href="/docs/ar/phrase-match.md">مطابقة العبارات</a>".</p></li>
</ul>
