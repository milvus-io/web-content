---
id: choose-the-right-analyzer-for-your-use-case.md
title: اختيار المحلل المناسب لحالة الاستخدام الخاصة بك
summary: الملاحظات
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">اختيار المحلل المناسب لحالة الاستخدام الخاصة بك<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>يركز هذا الدليل على اتخاذ القرارات العملية لاختيار المحلل. للحصول على التفاصيل الفنية حول مكونات المحلل وكيفية إضافة معلمات المحلل، راجع <a href="/docs/ar/analyzer-overview.md">نظرة عامة على المحلل</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">فهم المحللات في دقيقتين<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>في Milvus، يقوم المحلل بمعالجة النص المخزن في هذا الحقل لجعله قابلاً للبحث عن ميزات مثل <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a> (BM25) أو <a href="/docs/ar/phrase-match.md">مطابقة العبارات</a> أو <a href="/docs/ar/keyword-match.md">مطابقة النص</a>. فكر فيه كمعالج نصي يحول المحتوى الخام الخاص بك إلى رموز قابلة للبحث.</p>
<p>يعمل المحلل في مسار عمل بسيط من مرحلتين:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل المحلِّل</span> </span></p>
<ol>
<li><p><strong>الترميز (مطلوب):</strong> تطبّق هذه المرحلة الأولية <strong>أداة ترميز</strong> لتقسيم سلسلة نصية متصلة إلى وحدات منفصلة ذات معنى تسمى الرموز. يمكن أن تختلف طريقة الترميز بشكل كبير اعتمادًا على اللغة ونوع المحتوى.</p></li>
<li><p><strong>تصفية الرموز (اختياري):</strong> بعد الترميز، يتم تطبيق <strong>المرشحات</strong> لتعديل الرموز أو إزالتها أو تنقيحها. يمكن أن تشمل هذه العمليات تحويل جميع الرموز إلى أحرف صغيرة، أو إزالة الكلمات الشائعة التي لا معنى لها (مثل الكلمات الوقفية)، أو اختزال الكلمات إلى شكلها الجذري (الجذعية).</p></li>
</ol>
<p><strong>مثال</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">لماذا اختيار المحلّل مهم<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن أن يؤدي اختيار المحلل الخاطئ إلى جعل المستندات ذات الصلة غير قابلة للبحث أو إرجاع نتائج غير ذات صلة.</p>
<p>يلخص الجدول التالي المشاكل الشائعة الناجمة عن الاختيار غير الصحيح للمحلل ويوفر حلولاً عملية لتشخيص مشاكل البحث.</p>
<table>
   <tr>
     <th><p>المشكلة</p></th>
     <th><p>الأعراض</p></th>
     <th><p>مثال (المدخلات والمخرجات)</p></th>
     <th><p>السبب (محلل سيء)</p></th>
     <th><p>الحل (محلل جيد)</p></th>
   </tr>
   <tr>
     <td><p>الإفراط في الترميز</p></td>
     <td><p>تفشل الاستعلامات النصية للمصطلحات التقنية أو المعرّفات أو عناوين URL في العثور على المستندات ذات الصلة.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ar/standard-analyzer.md"><code translate="no">standard</code></a> محلل</p></td>
     <td><p>استخدم أداة <a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> أداة ترميز؛ وادمجها مع <a href="/docs/ar/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> مرشح.</p></td>
   </tr>
   <tr>
     <td><p>الترميز الناقص</p></td>
     <td><p>فشل البحث عن أحد مكونات عبارة متعددة الكلمات في إرجاع المستندات التي تحتوي على العبارة الكاملة.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>محلل مع <a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> أداة ترميز</p></td>
     <td><p>استخدم أداة <a href="/docs/ar/standard-tokenizer.md"><code translate="no">standard</code></a> أداة ترميز للتقسيم على علامات الترقيم والمسافات، واستخدم عامل تصفية مخصص <a href="/docs/ar/regex-filter.md">من regex</a>.</p></td>
   </tr>
   <tr>
     <td><p>عدم تطابق اللغة</p></td>
     <td><p>نتائج البحث عن لغة معينة غير منطقية أو غير موجودة.</p></td>
     <td><p>النص الصيني: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (رمز رمزي واحد)</p></td>
     <td><p><a href="/docs/ar/english-analyzer.md"><code translate="no">english</code></a> محلل</p></td>
     <td><p>استخدم محللاً خاصاً بلغة معينة، مثل <a href="/docs/ar/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
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
    </button></h2><p>بالنسبة للعديد من حالات الاستخدام، لا تحتاج إلى القيام بأي شيء خاص. دعنا نحدد ما إذا كنت واحدًا منهم.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">السلوك الافتراضي: <code translate="no">standard</code> المحلل<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا لم تقم بتحديد محلل عند استخدام ميزات استرجاع النص مثل البحث عن النص الكامل، يستخدم ميلفوس تلقائيًا <a href="/docs/ar/standard-analyzer.md"><code translate="no">standard</code></a> المحلِّل.</p>
<p>محلل <code translate="no">standard</code> </p>
<ul>
<li><p>يقسم النص على المسافات وعلامات الترقيم</p></li>
<li><p>يحول جميع الرموز إلى أحرف صغيرة</p></li>
<li><p>يزيل مجموعة مضمنة من كلمات الوقف الشائعة في اللغة الإنجليزية ومعظم علامات الترقيم</p></li>
</ul>
<p><strong>مثال على التحويل</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">معايير القرار: فحص سريع<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم هذا الجدول لتحديد ما إذا كان محلل <code translate="no">standard</code> الافتراضي يلبي احتياجاتك بسرعة. إذا كان لا يلبي، فستحتاج إلى اختيار مسار مختلف.</p>
<table>
   <tr>
     <th><p>المحتوى الخاص بك</p></th>
     <th><p>هل المحلل القياسي مناسب؟</p></th>
     <th><p>لماذا</p></th>
     <th><p>ما تحتاجه</p></th>
   </tr>
   <tr>
     <td><p>منشورات المدونة الإنجليزية</p></td>
     <td><p>✅ نعم</p></td>
     <td><p>السلوك الافتراضي كافٍ.</p></td>
     <td><p>استخدم الافتراضي (لا حاجة إلى تكوين).</p></td>
   </tr>
   <tr>
     <td><p>المستندات الصينية</p></td>
     <td><p>❌ لا</p></td>
     <td><p>الكلمات الصينية ليس لها مسافات وسيتم التعامل معها كرمز واحد.</p></td>
     <td><p>استخدم محلل <a href="/docs/ar/chinese-analyzer.md"><code translate="no">chinese</code></a> محلل</p></td>
   </tr>
   <tr>
     <td><p>الوثائق الفنية</p></td>
     <td><p>❌ لا</p></td>
     <td><p>يتم تجريد علامات الترقيم من المصطلحات مثل <code translate="no">C++</code>.</p></td>
     <td><p>قم بإنشاء محلل مخصص باستخدام <a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> أداة ترميز و <a href="/docs/ar/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> مرشح.</p></td>
   </tr>
   <tr>
     <td><p>لغات مفصولة بمسافات مثل النص الفرنسي/الإسباني</p></td>
     <td><p>⚠️ ربما</p></td>
     <td><p>قد لا تتطابق الأحرف المعلمة (<code translate="no">café</code> مقابل <code translate="no">cafe</code>).</p></td>
     <td><p>يوصى باستخدام محلل مخصص مع <a href="/docs/ar/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> موصى به للحصول على نتائج أفضل.</p></td>
   </tr>
   <tr>
     <td><p>لغات متعددة اللغات أو غير معروفة</p></td>
     <td><p>❌ لا</p></td>
     <td><p>يفتقر محلل <code translate="no">standard</code> إلى المنطق الخاص باللغات اللازمة للتعامل مع مجموعات الأحرف المختلفة وقواعد الترميز.</p></td>
     <td><p>استخدم محللاً مخصصًا مع <a href="/docs/ar/icu-tokenizer.md"><code translate="no">icu</code></a> أداة الترميز لترميز الرموز أحادية الرمز. </p><p>بدلاً من ذلك، ضع في اعتبارك تكوين <a href="/docs/ar/multi-language-analyzers.md">محللات متعددة اللغات</a> أو <a href="/docs/ar/language-identifier.md">معرّف لغة</a> لمعالجة أكثر دقة للمحتوى متعدد اللغات.</p></td>
   </tr>
</table>
<p>إذا لم يتمكن محلل <code translate="no">standard</code> الافتراضي من تلبية متطلباتك، فأنت بحاجة إلى تنفيذ محلل مختلف. لديك مساران:</p>
<ul>
<li><p><a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">استخدام محلل مدمج</a> أو</p></li>
<li><p><a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">إنشاء محلل مخصص</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">المسار أ: استخدام محللات مدمجة<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>المحللات المدمجة هي حلول مهيأة مسبقاً للغات الشائعة. إنها أسهل طريقة للبدء عندما لا يكون المحلل القياسي الافتراضي مناسبًا تمامًا.</p>
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
     <th><p>دعم اللغة</p></th>
     <th><p>المكونات</p></th>
     <th><p>ملاحظات</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>معظم اللغات المفصولة بمسافات (الإنجليزية والفرنسية والألمانية والإسبانية وغيرها)</p></td>
     <td><ul><li><p>أداة الترميز: <code translate="no">standard</code></p></li><li><p>المرشحات: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>محلل للأغراض العامة لمعالجة النصوص الأولية. بالنسبة للسيناريوهات أحادية اللغة، توفر المحللات الخاصة بكل لغة (مثل <code translate="no">english</code>) أداءً أفضل.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>مخصص للغة الإنجليزية، والذي يطبق الجذعية وإزالة كلمات التوقف لمطابقة دلالات اللغة الإنجليزية بشكل أفضل</p></td>
     <td><ul><li><p>أداة ترميز: <code translate="no">standard</code></p></li><li><p>المرشحات <code translate="no">lowercase</code> <code translate="no">stemmer</code> , <code translate="no">stop</code></p></li></ul></td>
     <td><p>موصى به للمحتوى باللغة الإنجليزية فقط على <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>الصينية</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">jieba</code></p></li><li><p>المرشحات: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>يستخدم حاليًا القاموس الصيني المبسط افتراضيًا.</p></td>
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
    </button></h3><p>لاستخدام محلل مدمج، ما عليك سوى تحديد نوعه في <code translate="no">analyzer_params</code> عند تحديد مخطط الحقل الخاص بك.</p>
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
<p>للحصول على الاستخدام التفصيلي، راجع <a href="/docs/ar/full-text-search.md">بحث النص الكامل</a> أو <a href="/docs/ar/keyword-match.md">مطابقة النص</a> أو <a href="/docs/ar/phrase-match.md">مطابقة العبارة</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">المسار ب: إنشاء محلل مخصص<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>عندما لا تفي <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">الخيارات المضمنة</a> باحتياجاتك، يمكنك إنشاء محلل مخصص من خلال الجمع بين مُحلل الرموز ومجموعة من المرشحات. يمنحك ذلك تحكماً كاملاً في مسار معالجة النصوص.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">الخطوة 1: اختر أداة الترميز بناءً على اللغة<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>اختر أداة الترميز بناءً على اللغة الأساسية للمحتوى الخاص بك:</p>
<h4 id="Western-languages" class="common-anchor-header">اللغات الغربية</h4><p>بالنسبة للغات المفصولة فضائيًا، لديك هذه الخيارات:</p>
<table>
   <tr>
     <th><p>أداة الترميز</p></th>
     <th><p>كيف يعمل</p></th>
     <th><p>الأفضل ل</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>تقسيم النص بناءً على المسافات وعلامات الترقيم</p></td>
     <td><p>النص العام وعلامات الترقيم المختلطة</p></td>
     <td><ul><li><p>المدخلات <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>الإخراج <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>يقسم على أحرف المسافات البيضاء فقط</p></td>
     <td><p>محتوى معالج مسبقًا، نص منسق من قبل المستخدم</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>المخرجات <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">لغات شرق آسيا</h4><p>تتطلب اللغات المستندة إلى القاموس أدوات ترميز متخصصة لتجزئة الكلمات بشكل صحيح:</p>
<h5 id="Chinese" class="common-anchor-header">الصينية</h5><table>
   <tr>
     <th><p>أداة ترميز</p></th>
     <th><p>كيف يعمل</p></th>
     <th><p>الأفضل ل</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>التجزئة القائمة على القاموس الصيني مع خوارزمية ذكية</p></td>
     <td><p><strong>موصى به للمحتوى الصيني</strong> - يجمع بين القاموس والخوارزميات الذكية، المصممة خصيصًا للغة الصينية</p></td>
     <td><ul><li><p>المدخلات <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>المخرجات <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>التحليل الصرفي النقي القائم على القاموس مع القاموس الصيني<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p>بالمقارنة مع <code translate="no">jieba</code> ، يعالج النص الصيني بطريقة أكثر عمومية</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">"机器学习算法"</code></p></li><li><p>الإخراج: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">اليابانية والكورية</h5><table>
   <tr>
     <th><p>اللغة</p></th>
     <th><p>أداة الترميز</p></th>
     <th><p>خيارات القاموس</p></th>
     <th><p>الأفضل ل</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p>اليابانية</p></td>
     <td><p><a href="/docs/ar/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (للأغراض العامة)، <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (المصطلحات الحديثة)، <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (أكاديمي)</p></td>
     <td><p>التحليل الصرفي مع معالجة الاسم الصحيح</p></td>
     <td><ul><li><p>المدخلات <code translate="no">"東京都渋谷区"</code></p></li><li><p>المخرجات <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>الكورية</p></td>
     <td><p><a href="/docs/ar/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">كو-ديك</a></p></td>
     <td><p>التحليل الصرفي الكوري</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">"안녕하세요"</code></p></li><li><p>الإخراج: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">لغات متعددة اللغات أو غير معروفة</h4><p>للمحتوى الذي لا يمكن التنبؤ فيه باللغات أو المختلطة داخل المستندات:</p>
<table>
   <tr>
     <th><p>أداة الترميز</p></th>
     <th><p>كيف يعمل</p></th>
     <th><p>الأفضل ل</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>الترميز المدرك للرموز الأحادية (المكونات الدولية لليونيكود)</p></td>
     <td><p>النصوص المختلطة أو اللغات غير المعروفة أو عندما يكون الترميز البسيط كافياً</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>الإخراج: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>متى يتم استخدام الرمز الموحد الدولي</strong></p>
<ul>
<li><p>اللغات المختلطة حيث يكون تحديد اللغة غير عملي.</p></li>
<li><p>أنت لا تريد النفقات الزائدة <a href="/docs/ar/multi-language-analyzers.md">للمحللات متعددة اللغات</a> أو <a href="/docs/ar/language-identifier.md">معرف اللغة</a>.</p></li>
<li><p>المحتوى الذي يحتوي على لغة أساسية مع كلمات أجنبية عرضية لا تساهم إلا قليلاً في المعنى العام (على سبيل المثال، نص إنجليزي مع أسماء علامات تجارية متفرقة أو مصطلحات تقنية باللغة اليابانية أو الفرنسية).</p></li>
</ul>
<p><strong>الأساليب البديلة</strong>: للحصول على معالجة أكثر دقة للمحتوى متعدد اللغات، ضع في اعتبارك استخدام محلل متعدد اللغات أو معرّف اللغة. للحصول على التفاصيل، راجع محلل <a href="/docs/ar/multi-language-analyzers.md">متعدد اللغات</a> أو <a href="/docs/ar/language-identifier.md">معرّف اللغة</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">الخطوة 2: أضف مرشحات للدقة<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>بعد <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">اختيار أداة الترميز الخاصة بك،</a> قم بتطبيق عوامل التصفية بناءً على متطلبات البحث الخاصة بك وخصائص المحتوى.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">المرشحات شائعة الاستخدام</h4><p>هذه الفلاتر ضرورية لمعظم تكوينات اللغات المنفصلة عن بعضها البعض (الإنجليزية، والفرنسية، والألمانية، والإسبانية، وغيرها) وتحسّن جودة البحث بشكل كبير:</p>
<table>
   <tr>
     <th><p>التصفية</p></th>
     <th><p>كيف تعمل</p></th>
     <th><p>متى تستخدم</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>تحويل جميع الرموز إلى أحرف صغيرة</p></td>
     <td><p>عالمي - ينطبق على جميع اللغات ذات الأحرف الصغيرة</p></td>
     <td><ul><li><p>المدخلات <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>الإخراج <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>اختزال الكلمات إلى صيغتها الجذرية</p></td>
     <td><p>اللغات ذات تصريفات الكلمات (الإنجليزية والفرنسية والألمانية وغيرها)</p></td>
     <td><p>للإنجليزية</p><ul><li><p>المدخلات: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>الإخراج: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>إزالة الكلمات الشائعة التي لا معنى لها</p></td>
     <td><p>معظم اللغات - فعّالة بشكل خاص للغات ذات التصريفات الفراغية</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>الإخراج: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>بالنسبة للغات شرق آسيا (الصينية واليابانية والكورية وغيرها)، ركز على <a href="/docs/ar/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">المرشحات الخاصة بكل لغة</a> بدلاً من ذلك. عادةً ما تستخدم هذه اللغات أساليب مختلفة لمعالجة النصوص وقد لا تستفيد بشكل كبير من عملية التصفية.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">مرشحات تطبيع النص</h4><p>تعمل هذه المرشحات على توحيد اختلافات النص لتحسين اتساق المطابقة:</p>
<table>
   <tr>
     <th><p>المرشحات</p></th>
     <th><p>كيف تعمل</p></th>
     <th><p>متى تستخدم</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>تحويل الأحرف المعلمة إلى معادلات ASCII</p></td>
     <td><p>المحتوى الدولي، المحتوى الذي ينشئه المستخدم</p></td>
     <td><ul><li><p>المدخلات <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>الإخراج: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">تصفية الرموز</h4><p>التحكم في الرموز التي يتم الاحتفاظ بها بناءً على محتوى الحرف أو طوله:</p>
<table>
   <tr>
     <th><p>التصفية</p></th>
     <th><p>كيف يعمل</p></th>
     <th><p>متى تستخدم</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>إزالة رموز علامات الترقيم المستقلة</p></td>
     <td><p>تنظيف المخرجات من <code translate="no">jieba</code> ، <code translate="no">lindera</code> ، و <code translate="no">icu</code> الرموز المميزة التي ستعيد علامات الترقيم كرموز فردية</p></td>
     <td><ul><li><p>المدخلات <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>الإخراج: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>الاحتفاظ بالحروف والأرقام فقط</p></td>
     <td><p>المحتوى التقني، معالجة النص النظيف</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>الإخراج: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>إزالة الرموز خارج نطاق الطول المحدد</p></td>
     <td><p>تصفية الضوضاء (الرموز الطويلة بشكل مفرط)</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>الإخراج: <code translate="no">[['a'], ['very'], []]</code> (إذا كان <strong>الحد الأقصى = 10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>تصفية مستندة إلى نمط مخصص</p></td>
     <td><p>متطلبات الرموز الرمزية الخاصة بالمجال</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["test123", "prod456"]</code></p></li><li><p>الإخراج: <code translate="no">[[], ['prod456']]</code> (إذا كان <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">مرشحات خاصة باللغة</h4><p>تتعامل هذه المرشحات مع خصائص لغة محددة:</p>
<table>
   <tr>
     <th><p>عامل التصفية</p></th>
     <th><p>اللغة</p></th>
     <th><p>كيف تعمل</p></th>
     <th><p>أمثلة</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>الألمانية</p></td>
     <td><p>يقسم الكلمات المركبة إلى مكونات قابلة للبحث</p></td>
     <td><ul><li><p>المدخلات: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>الإخراج <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>الصينية</p></td>
     <td><p>يحتفظ بالأحرف الصينية + أبجدية رقمية</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>الإخراج: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>الصينية</p></td>
     <td><p>يحتفظ بالأحرف الصينية فقط</p></td>
     <td><ul><li><p>الإدخال: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>الإخراج: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">الخطوة 3: الجمع والتنفيذ<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>لإنشاء مُحلل مخصص، تقوم بتحديد مُحلل الرموز وقائمة من المرشحات في قاموس <code translate="no">analyzer_params</code>. يتم تطبيق المرشحات بالترتيب المدرجة به.</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">النهائي: اختبر مع <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>تحقق دائمًا من صحة التكوين الخاص بك قبل تطبيقه على مجموعة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>المشاكل الشائعة التي يجب التحقق منها</p>
<ul>
<li><p><strong>الإفراط في الترميز</strong>: المصطلحات الفنية التي يتم تقسيمها بشكل غير صحيح</p></li>
<li><p><strong>نقص الترميز</strong>: عدم فصل العبارات بشكل صحيح</p></li>
<li><p><strong>الرموز المفقودة</strong>: مصطلحات مهمة يتم تصفيتها</p></li>
</ul>
<p>للاطلاع على الاستخدام التفصيلي، راجع <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">Run_analyzer</a>.</p>
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
    </button></h2><p>يوفر هذا القسم التكوينات الموصى بها لأداة الترميز والتصفية لحالات الاستخدام الشائعة عند العمل مع أدوات التحليل في Milvus. اختر المجموعة التي تتوافق بشكل أفضل مع نوع المحتوى ومتطلبات البحث الخاصة بك.</p>
<div class="alert note">
<p>قبل تطبيق محلل على مجموعتك، نوصيك باستخدام <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> لاختبار أداء تحليل النص والتحقق من صحة أدائه.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">اللغات ذات علامات التشكيل (الفرنسية والإسبانية والألمانية وغيرها)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم أداة ترميز <code translate="no">standard</code> مع تحويل الأحرف الصغيرة، والوقف الخاص باللغة، وإزالة الكلمات المتوقفة. يعمل هذا التكوين أيضًا مع اللغات الأوروبية الأخرى عن طريق تعديل المعلمات <code translate="no">language</code> و <code translate="no">stop_words</code>.</p>
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
<h3 id="English-content" class="common-anchor-header">المحتوى الإنجليزي<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>لمعالجة النص الإنجليزي مع تصفية شاملة. يمكنك أيضًا استخدام <a href="/docs/ar/english-analyzer.md"><code translate="no">english</code></a> المدمج:</p>
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
    </button></h3><p>استخدم أداة الترميز <code translate="no">jieba</code> وطبِّق عامل تصفية الأحرف للاحتفاظ فقط بالأحرف الصينية والحروف اللاتينية والأرقام.</p>
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
<p>بالنسبة للغة الصينية المبسطة، <code translate="no">cnalphanumonly</code> يزيل جميع الرموز باستثناء الأحرف الصينية والنصوص الأبجدية الرقمية والأرقام. هذا يمنع علامات الترقيم من التأثير على جودة البحث.</p>
</div>
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
    </button></h3><p>استخدم أداة الترميز <code translate="no">lindera</code> مع القاموس والمرشحات اليابانية لتنظيف علامات الترقيم والتحكم في طول الرمز المميز:</p>
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
    </button></h3><p>على غرار اليابانية، باستخدام أداة الترميز <code translate="no">lindera</code> مع القاموس الكوري:</p>
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
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">محتوى مختلط أو متعدد اللغات<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>عند العمل مع محتوى يمتد على عدة لغات أو يستخدم نصوصًا بشكل غير متوقع، ابدأ بمحلل <code translate="no">icu</code>. يتعامل هذا المحلل المدرك للرموز الأحادية مع النصوص والرموز المختلطة بفعالية.</p>
<p><strong>التكوين الأساسي متعدد اللغات (بدون جذع)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>معالجة متقدمة متعددة اللغات</strong>:</p>
<p>لتحكم أفضل في سلوك الرموز عبر لغات مختلفة:</p>
<ul>
<li><p>استخدم تكوين <strong>محلل متعدد اللغات</strong>. للحصول على التفاصيل، راجع محلل <a href="/docs/ar/multi-language-analyzers.md">متعدد اللغات</a>.</p></li>
<li><p>تنفيذ معرّف <strong>لغة</strong> على المحتوى الخاص بك. للحصول على التفاصيل، راجع <a href="/docs/ar/language-identifier.md">معرّف اللغة</a>.</p></li>
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
    </button></h2><p>بعد تحديد المحلّل الخاص بك، يمكنك دمجه مع ميزات استرجاع النصوص التي يوفرها Milvus.</p>
<ul>
<li><p><strong>البحث عن النص الكامل</strong></p>
<p>تؤثر المحللات بشكل مباشر على البحث عن النص الكامل المستند إلى BM25 من خلال توليد المتجهات المتفرقة. استخدم نفس المحلّل لكل من الفهرسة والاستعلام لضمان اتساق الترميز. توفر المحللات الخاصة باللغات بشكل عام درجات BM25 أفضل من تلك العامة. للحصول على تفاصيل التنفيذ، راجع <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>.</p></li>
<li><p><strong>مطابقة النص</strong></p>
<p>تقوم عمليات مطابقة النص بإجراء مطابقة تامة للرموز بين الاستعلامات والمحتوى المفهرس بناءً على مخرجات المحلل. للحصول على تفاصيل التنفيذ، راجع <a href="/docs/ar/keyword-match.md">مطابقة النص</a>.</p></li>
<li><p><strong>مطابقة العبارات</strong></p>
<p>تتطلب مطابقة العبارات ترميزًا متناسقًا عبر التعبيرات متعددة الكلمات للحفاظ على حدود العبارات ومعناها. للحصول على تفاصيل التنفيذ، راجع <a href="/docs/ar/phrase-match.md">مطابقة العبارة</a>.</p></li>
</ul>
