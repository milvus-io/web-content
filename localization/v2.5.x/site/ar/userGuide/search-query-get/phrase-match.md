---
id: phrase-match.md
title: مطابقة العباراتCompatible with Milvus 2.5.17+
summary: >-
  يتيح لك تطابق العبارات البحث عن المستندات التي تحتوي على مصطلحات الاستعلام
  كعبارة تامة. بشكل افتراضي، يجب أن تظهر الكلمات بنفس الترتيب وبجوار بعضها البعض
  مباشرةً. على سبيل المثال، يتطابق الاستعلام عن "تعلم الآلة الروبوتية" مع نص مثل
  "...نماذج تعلم الآلة الروبوتية النموذجية..."، حيث تظهر الكلمات "روبوتات"
  و"آلة" و"تعلم" في تسلسل دون أي كلمات أخرى بينها.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">مطابقة العبارات<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>تتيح لك مطابقة العبارة البحث عن المستندات التي تحتوي على مصطلحات الاستعلام الخاصة بك كعبارة تامة. بشكل افتراضي، يجب أن تظهر الكلمات بنفس الترتيب وبجوار بعضها البعض مباشرةً. على سبيل المثال، يطابق الاستعلام عن <strong>"تعلّم الآلة الروبوتية"</strong> نصًا مثل <em>"... نماذج تعلّم الآلة الروبوتية النموذجية..."،</em> حيث تظهر الكلمات <strong>"روبوتات" و</strong> <strong>"آلة"</strong> و <strong>"تعلّم"</strong> في تسلسل دون وجود كلمات أخرى بينها.</p>
<p>ومع ذلك، في سيناريوهات العالم الحقيقي، يمكن أن تكون مطابقة العبارات الصارمة صارمة للغاية. قد ترغب في مطابقة نص مثل <em>"... نماذج التعلم الآلي المعتمدة على نطاق واسع في مجال الروبوتات...".</em> هنا، توجد نفس الكلمات الرئيسية ولكن ليس جنبًا إلى جنب أو بالترتيب الأصلي. للتعامل مع هذا، تدعم مطابقة العبارات معلمة <code translate="no">slop</code> ، والتي تقدم مرونة. تحدد القيمة <code translate="no">slop</code> عدد التبدلات الموضعية المسموح بها بين المصطلحات في العبارة. على سبيل المثال، باستخدام <code translate="no">slop</code> من 1، يمكن أن يطابق الاستعلام عن <strong>"التعلم الآلي"</strong> نصًا مثل <em>"...التعلم العميق للآلة..."،</em> حيث تفصل كلمة واحدة (<strong>"عميق")</strong> بين المصطلحات الأصلية.</p>
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
    </button></h2><p>بدعم من مكتبة محرك البحث <a href="https://github.com/quickwit-oss/tantivy">Tantivy،</a> تعمل مطابقة العبارات من خلال تحليل المعلومات الموضعية للكلمات داخل المستندات. يوضح الرسم البياني أدناه العملية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل مطابقة العبارات</span> </span></p>
<ol>
<li><p><strong>ترميز المستند</strong>: عندما تقوم بإدراج مستندات في Milvus، يتم تقسيم النص إلى رموز (كلمات أو مصطلحات فردية) باستخدام محلل، مع تسجيل المعلومات الموضعية لكل رمز. على سبيل المثال، يتم ترميز <strong>المستند_1</strong> إلى <strong>["آلة" (الموضع = 0)، "تعلم" (الموضع = 1)، "تعزيزات" (الموضع = 2)، "كفاءة" (الموضع = 3)]</strong>. لمزيد من المعلومات حول المحلِّلات، راجع <a href="/docs/ar/v2.5.x/analyzer-overview.md">نظرة عامة</a> على <a href="/docs/ar/v2.5.x/analyzer-overview.md">المحلِّل</a>.</p></li>
<li><p><strong>إنشاء فهرس مقلوب</strong>: يقوم ميلفوس ببناء فهرس مقلوب، حيث يقوم بتعيين كل رمز رمزي إلى المستند (المستندات) التي يظهر فيها ومواضع الرمز في تلك المستندات.</p></li>
<li><p><strong>مطابقة العبارة</strong>: عندما يتم تنفيذ استعلام عن العبارة، يبحث Milvus عن كل رمز في الفهرس المقلوب ويتحقق من مواضعها لتحديد ما إذا كانت تظهر بالترتيب الصحيح والقرب. تتحكم المعلمة <code translate="no">slop</code> في الحد الأقصى لعدد المواضع المسموح بها بين الرموز المطابقة:</p>
<ul>
<li><p><strong>الانحدار = 0</strong> يعني أن الرموز يجب أن تظهر بالترتيب <strong>الدقيق والمتجاورة مباشرةً</strong> (أي لا توجد كلمات إضافية بينهما).</p>
<ul>
<li>في المثال، <strong>المستند_1</strong> فقط (<strong>"آلة"</strong> في <strong>الموضع = 0،</strong> <strong>"تعلم"</strong> في <strong>الموضع = 1</strong>) يتطابق تمامًا.</li>
</ul></li>
<li><p><strong>الانحدار = 2</strong> يسمح بما يصل إلى موضعين من المرونة أو إعادة الترتيب بين الرموز المطابقة.</p>
<ul>
<li><p>يسمح ذلك بالترتيب المعكوس (<strong>"آلة التعلم")</strong> أو فجوة صغيرة بين الرموز.</p></li>
<li><p>وبالتالي، يتطابق كل من <strong>doc_1</strong> و <strong>doc_2</strong> (<strong>"تعلم"</strong> عند الموضع <strong>= 0،</strong> و <strong>"آلة"</strong> عند الموضع <strong>= 1</strong>)، و <strong>doc_3</strong> (<strong>"تعلم"</strong> عند <strong>الموضع = 1،</strong> و <strong>"آلة"</strong> عند <strong>الموضع = 2</strong>).</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">تمكين مطابقة العبارة<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>تعمل مطابقة العبارات مع نوع الحقل <code translate="no">VARCHAR</code> ، وهو نوع بيانات السلسلة في Milvus. لتمكين مطابقة العبارات، قم بتكوين مخطط مجموعتك عن طريق تعيين كل من المعلمات <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code> إلى <code translate="no">True</code> ، على غرار <a href="/docs/ar/v2.5.x/keyword-match.md">مطابقة النص</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">قم بتعيين <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>لتمكين مطابقة العبارات لحقل <code translate="no">VARCHAR</code> محدد، قم بتعيين كل من المعلمات <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code> إلى <code translate="no">True</code> عند تحديد مخطط الحقل. يرشد هذا التكوين ميلفوس إلى ترميز النص وإنشاء فهرس مقلوب مع المعلومات الموضعية المطلوبة لمطابقة العبارات بكفاءة.</p>
<p>فيما يلي مثال على تعريف مخطط لتمكين مطابقة العبارات:</p>
<p>[نوع كتلة غير مدعوم]</p>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">اختياري: تكوين محلل<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>تعتمد دقة مطابقة العبارات بشكل كبير على المحلل المستخدم لترميز بياناتك النصية. تتناسب المحللات المختلفة مع لغات وتنسيقات نصية مختلفة، مما يؤثر على الترميز والدقة الموضعية. سيؤدي اختيار محلل مناسب لحالة الاستخدام الخاصة بك إلى تحسين نتائج مطابقة العبارات.</p>
<p>بشكل افتراضي، يستخدم Milvus المحلل القياسي، الذي يقوم بترميز النص استنادًا إلى المسافات البيضاء وعلامات الترقيم، ويزيل الرموز التي يزيد طولها عن 40 حرفًا، ويحول النص إلى أحرف صغيرة. لا توجد معلمات إضافية مطلوبة للاستخدام الافتراضي. راجع <a href="/docs/ar/v2.5.x/standard-analyzer.md">المحلل القياسي</a> للحصول على التفاصيل.</p>
<p>إذا كان تطبيقك يتطلب محللًا معينًا، فقم بتكوينه باستخدام المعلمة <code translate="no">analyzer_params</code>. على سبيل المثال، إليك كيفية تكوين محلل <code translate="no">english</code> لمطابقة العبارات في النص الإنجليزي:</p>
<p>[نوع الكتلة غير المدعوم]</p>
<p>يدعم Milvus العديد من المحللات المصممة خصيصًا للغات وحالات الاستخدام المختلفة. للحصول على معلومات مفصلة، راجع <a href="/docs/ar/v2.5.x/analyzer-overview.md">نظرة عامة على المحلل</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">استخدام مطابقة العبارة<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن تقوم بتمكين المطابقة لحقل <code translate="no">VARCHAR</code> في مخطط مجموعتك، يمكنك إجراء مطابقة العبارة باستخدام التعبير <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>التعبير <code translate="no">PHRASE_MATCH</code> غير حساس لحالة الأحرف. يمكنك استخدام إما <code translate="no">PHRASE_MATCH</code> أو <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">بناء جملة تعبير PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم التعبير <code translate="no">PHRASE_MATCH</code> لتحديد الحقل والعبارة والمرونة الاختيارية (<code translate="no">slop</code>) عند البحث. بناء الجملة هو:</p>
<p>[نوع الكتلة غير المدعوم]</p>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> اسم الحقل <code translate="no">VARCHAR</code> الذي تقوم بإجراء مطابقات العبارة عليه.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> العبارة المراد البحث عنها بالضبط.</p></li>
<li><p><code translate="no">slop</code> (اختياري)<strong>:</strong> عدد صحيح يحدد الحد الأقصى لعدد المواضع المسموح بها في الرموز المطابقة.</p>
<ul>
<li><p><code translate="no">0</code> (افتراضي): يطابق العبارات الدقيقة فقط. مثال: سيطابق عامل التصفية لـ <strong>"التعلّم الآلي"</strong> عبارة <strong>"</strong> التعلّم <strong>الآلي"</strong> تمامًا، ولكن ليس <strong>"الآلة تعزز التعلّم"</strong> أو <strong>"آلة التعلّم".</strong></p></li>
<li><p><code translate="no">1</code>: يسمح باختلاف طفيف، مثل مصطلح إضافي واحد أو تغيير بسيط في الموضع. مثال: سيطابق عامل تصفية لـ <strong>"تعلّم الآلة"</strong> <strong>"آلة تعزز التعلّم"</strong> (رمز واحد بين <strong>"آلة"</strong> و <strong>"تعلّم")</strong> ولكن ليس <strong>"آلة التعلّم"</strong> (المصطلحات معكوسة).</p></li>
<li><p><code translate="no">2</code>: يسمح بمزيد من المرونة، بما في ذلك ترتيب المصطلح المعكوس أو ما يصل إلى رمزين بينهما. مثال: سيطابق مرشح <strong>"تعلّم الآلة"</strong> مع <strong>"آلة التعلّم</strong> <strong>"</strong> (المصطلحات المعكوسة) أو <strong>"آلة</strong> التعلّم <strong>بسرعة تعزز التعلّم"</strong> (رمزين بين <strong>"آلة"</strong> و <strong>"تعلّم")</strong>.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">مثال على مجموعة البيانات<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>لنفترض أن لديك مجموعة باسم <strong>tech_articles</strong> تحتوي على الكيانات الخمسة التالية:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"التعلم الآلي يعزز الكفاءة في تحليل البيانات على نطاق واسع"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"تعلم النهج القائم على الآلة أمر حيوي لتقدم الذكاء الاصطناعي الحديث"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"تعمل البنى الآلية للتعلم العميق على تحسين الأحمال الحاسوبية"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"تعمل الآلة بسرعة على تحسين أداء النموذج للتعلم المستمر"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"تعلم خوارزميات الآلة المتقدمة يوسع قدرات الذكاء الاصطناعي"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">الاستعلام مع مطابقة العبارة<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>عند استخدام الأسلوب <code translate="no">query()</code> ، يعمل <strong>PHRASE_MATCH</strong> كمرشح قياسي. لا يتم إرجاع سوى المستندات التي تحتوي على العبارة المحددة (مع مراعاة الانحدار المسموح به).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">مثال: المنحدر = 0 (مطابقة تامة)</h4><p>يقوم هذا المثال بإرجاع المستندات التي تحتوي على عبارة <strong>"التعلم الآلي"</strong> بالضبط دون أي رموز إضافية بينهما.</p>
<p>[نوع الكتلة غير المدعوم]</p>
<p><strong>نتائج المطابقة المتوقعة:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"التعلم الآلي يعزز الكفاءة في تحليل البيانات على نطاق واسع"</p></td>
   </tr>
</table>
<p>يحتوي المستند 1 فقط على العبارة الدقيقة " <strong>تعلّم الآلة"</strong> بالترتيب المحدد بدون رموز إضافية.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">البحث مع مطابقة العبارة<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>في عمليات البحث، يتم استخدام <strong>PHRASE_MATCH</strong> لتصفية المستندات مسبقًا قبل تطبيق ترتيب تشابه المتجهات. يعمل هذا النهج المكون من خطوتين أولاً على تضييق المجموعة المرشحة عن طريق المطابقة النصية ثم إعادة ترتيب تلك المستندات المرشحة بناءً على تضمينات المتجهات.</p>
<h4 id="Example-slop--1" class="common-anchor-header">مثال: المنحدر = 1</h4><p>هنا، نسمح هنا بـ انحدار 1. يتم تطبيق المرشح على المستندات التي تحتوي على عبارة <strong>"آلة التعلم"</strong> مع مرونة طفيفة.</p>
<p>[نوع الكتلة غير المدعوم]</p>
<p><strong>نتائج المطابقة:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"تعلم النهج القائم على الآلة أمر حيوي لتقدم الذكاء الاصطناعي الحديث"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"تعمل بنيات آلة التعلم العميق على تحسين الأحمال الحسابية"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"تعلم خوارزميات الآلة المتقدمة يوسع قدرات الذكاء الاصطناعي"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">مثال: انحدار = 2</h4><p>يسمح هذا المثال بـ 2 مائل، مما يعني أنه يُسمح بما يصل إلى رمزين إضافيين (أو مصطلحين معكوسين) بين كلمتي <strong>"آلة"</strong> و <strong>"تعلم".</strong></p>
<p>[نوع الكتلة غير المدعوم]</p>
<p><strong>نتائج المطابقة:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"التعلم الآلي يعزز الكفاءة في تحليل البيانات على نطاق واسع"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"تعمل بنيات آلة التعلم العميق على تحسين الأحمال الحسابية"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">مثال: المنحدر = 3</h4><p>في هذا المثال، يوفر المنحدر 3 المزيد من المرونة. يبحث المرشح عن <strong>"التعلم الآلي"</strong> مع السماح بما يصل إلى ثلاثة مواضع رمزية بين الكلمات.</p>
<p>[نوع الكتلة غير المدعوم]</p>
<p><strong>نتائج المطابقة:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"التعلم الآلي يعزز الكفاءة في تحليل البيانات على نطاق واسع"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"تعلم نهج قائم على الآلة أمر حيوي لتقدم الذكاء الاصطناعي الحديث"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"تعمل البنى الآلية للتعلم العميق على تحسين الأحمال الحاسوبية"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"تعلم خوارزميات الآلة المتقدمة يوسع قدرات الذكاء الاصطناعي"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">الاعتبارات<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>يؤدي تمكين مطابقة العبارات لحقل ما إلى إنشاء فهرس مقلوب، مما يستهلك موارد التخزين. ضع في اعتبارك تأثير التخزين عند اتخاذ قرار تمكين هذه الميزة، حيث يختلف ذلك بناءً على حجم النص والرموز الفريدة والمحلل المستخدم.</p></li>
<li><p>بمجرد تحديد محلل في المخطط الخاص بك، تصبح إعداداته دائمة لتلك المجموعة. إذا قررت أن محللًا مختلفًا يناسب احتياجاتك بشكل أفضل، يمكنك التفكير في إسقاط المجموعة الحالية وإنشاء مجموعة جديدة بتكوين المحلل المطلوب.</p></li>
<li><p>يعتمد أداء مطابقة العبارات على كيفية ترميز النص. قبل تطبيق محلل على مجموعتك بالكامل، استخدم الطريقة <code translate="no">run_analyzer</code> لمراجعة مخرجات الترميز. لمزيد من المعلومات، راجع <a href="/docs/ar/v2.5.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">نظرة عامة</a> على <a href="/docs/ar/v2.5.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">المحلل</a>.</p></li>
<li><p>قواعد الهروب في تعبيرات <code translate="no">filter</code>:</p>
<ul>
<li><p>يتم تفسير الأحرف المحاطة بعلامات اقتباس مزدوجة أو علامات اقتباس مفردة داخل التعبيرات على أنها ثوابت سلسلة. إذا كان ثابت السلسلة يتضمن أحرف هروب، فيجب تمثيل أحرف الهروب بتسلسل الهروب. على سبيل المثال، استخدم <code translate="no">\\</code> لتمثيل <code translate="no">\</code> و <code translate="no">\\t</code> لتمثيل علامة تبويب <code translate="no">\t</code> و <code translate="no">\\n</code> لتمثيل سطر جديد.</p></li>
<li><p>إذا كان ثابت السلسلة محاطًا بعلامات اقتباس مفردة، يجب تمثيل علامة اقتباس مفردة داخل الثابت على أنه <code translate="no">\\'</code> بينما يمكن تمثيل علامة الاقتباس المزدوجة إما <code translate="no">&quot;</code> أو <code translate="no">\\&quot;</code>. مثال: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>إذا كان ثابت السلسلة محاطًا بعلامات اقتباس مزدوجة، يجب تمثيل علامة اقتباس مزدوجة داخل الثابت على أنه <code translate="no">\\&quot;</code> بينما يمكن تمثيل علامة الاقتباس المفردة إما <code translate="no">'</code> أو <code translate="no">\\'</code>. مثال: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
