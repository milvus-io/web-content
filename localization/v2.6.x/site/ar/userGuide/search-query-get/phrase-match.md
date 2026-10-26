---
id: phrase-match.md
title: المطابقة العبارةCompatible with Milvus 2.5.17+
summary: >-
  تتيح لك «مطابقة العبارة» البحث عن المستندات التي تحتوي على مصطلحات استعلامك
  كعبارة دقيقة. بشكل افتراضي، يجب أن تظهر الكلمات بنفس الترتيب وأن تكون متجاورة
  مباشرةً. على سبيل المثال، يتطابق الاستعلام عن «robotics machine learning» مع
  نص مثل «…typical robotics machine learning models…»، حيث تظهر الكلمات
  «robotics» و«machine» و«learning» بالتسلسل دون وجود كلمات أخرى بينها.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">المطابقة العبارة<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>تتيح لك مطابقة العبارة البحث عن المستندات التي تحتوي على مصطلحات الاستعلام كعبارة دقيقة. بشكل افتراضي، يجب أن تظهر الكلمات بنفس الترتيب ومتجاورة مباشرةً. على سبيل المثال، يتطابق الاستعلام عن <strong>"robotics machine learning"</strong> مع نص مثل <em>"...typical robotics machine learning models..."</em>، حيث تظهر الكلمات <strong>"robotics"</strong> و <strong>"machine"</strong> و <strong>"learning"</strong> بالتسلسل دون وجود كلمات أخرى بينها.</p>
<p>ومع ذلك، في السيناريوهات الواقعية، قد تكون مطابقة العبارة الصارمة مفرطة في الصرامة. قد ترغب في مطابقة نص مثل <em>«…نماذج التعلم الآلي المعتمدة على نطاق واسع في مجال الروبوتات…».</em> هنا، توجد الكلمات الرئيسية نفسها ولكنها ليست متجاورة أو بالترتيب الأصلي. للتعامل مع هذا الأمر، تدعم مطابقة العبارة المعلمة « <code translate="no">slop</code> »، التي توفر مرونة. تحدد قيمة « <code translate="no">slop</code> » عدد التغييرات المسموح بها في ترتيب الكلمات داخل العبارة. على سبيل المثال، إذا كانت قيمة « <code translate="no">slop</code> » تساوي 1، فإن استعلام <strong>«machine learning»</strong> يمكن أن يطابق نصًا مثل <em>«…machine deep learning…»،</em> حيث تفصل كلمة واحدة (<strong>«deep»</strong>) بين المصطلحات الأصلية.</p>
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
    </button></h2><p>تعمل مطابقة العبارات، المدعومة بمكتبة محرك البحث <a href="https://github.com/quickwit-oss/tantivy">Tantivy،</a> من خلال تحليل المعلومات المتعلقة بمواقع الكلمات داخل المستندات. يوضح الرسم البياني أدناه هذه العملية:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>سير عمل مطابقة العبارات</span>
  
 </span></p>
<ol>
<li><p><strong>تقسيم المستند إلى رموز</strong>: عند إدراج المستندات في Milvus، يتم تقسيم النص إلى رموز (كلمات أو مصطلحات فردية) باستخدام أداة تحليل، مع تسجيل معلومات الموضع لكل رمز. على سبيل المثال، يتم تجزئة <strong>doc_1</strong> إلى <strong>[“machine” (pos=0)، “learning” (pos=1)، “boosts” (pos=2)، “efficiency” (pos=3)]</strong>. لمزيد من المعلومات حول أدوات التحليل، راجع <a href="/docs/ar/v2.6.x/analyzer-overview.md">نظرة عامة</a> على <a href="/docs/ar/v2.6.x/analyzer-overview.md">أدوات التحليل</a>.</p></li>
<li><p><strong>إنشاء الفهرس المعكوس</strong>: يقوم Milvus بإنشاء فهرس معكوس، حيث يربط كل رمز بالوثيقة (أو الوثائق) التي يظهر فيها ومواقع الرموز في تلك الوثائق.</p></li>
<li><p><strong>مطابقة العبارات</strong>: عند تنفيذ استعلام عبارة، يبحث Milvus عن كل رمز في الفهرس المعكوس ويتحقق من مواقعه لتحديد ما إذا كانت تظهر بالترتيب الصحيح والقرب الصحيح. يتحكم المعامل <code translate="no">slop</code> في الحد الأقصى لعدد المواقع المسموح بها بين الرموز المتطابقة:</p>
<ul>
<li><p><strong>slop = 0</strong> يعني أن الرموز يجب أن تظهر <strong>بالترتيب الدقيق وأن تكون متجاورة مباشرة</strong> (أي لا توجد كلمات إضافية بينها).</p>
<ul>
<li>في المثال، لا يتطابق تمامًا سوى <strong>doc_1</strong> (<strong>«machine»</strong> في <strong>الموضع 0</strong>، <strong>و«learning»</strong> في <strong>الموضع 1</strong>).</li>
</ul></li>
<li><p><strong>slop = 2</strong> يسمح بمرونة أو إعادة ترتيب تصل إلى موضعين بين الرموز المتطابقة.</p>
<ul>
<li><p>وهذا يسمح بترتيب معكوس (<strong>«learning machine»</strong>) أو وجود فجوة صغيرة بين الرموز.</p></li>
<li><p>وبالتالي، فإن <strong>doc_1</strong> و <strong>doc_2</strong> (<strong>«learning»</strong> في <strong>الموضع 0</strong>، <strong>و«machine»</strong> في <strong>الموضع 1</strong>)، و <strong>doc_3</strong> (<strong>«learning»</strong> في <strong>الموضع 1</strong>، <strong>و«machine»</strong> في <strong>الموضع 2</strong>) تتطابق جميعها.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">تمكين مطابقة العبارات<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>تعمل مطابقة العبارات مع نوع الحقل « <code translate="no">VARCHAR</code> »، وهو نوع بيانات السلسلة في Milvus. لتمكين مطابقة العبارات، قم بتكوين مخطط المجموعة الخاص بك عن طريق تعيين كل من المعلمتين « <code translate="no">enable_analyzer</code> » و« <code translate="no">enable_match</code> » إلى « <code translate="no">True</code> »، على غرار <a href="/docs/ar/v2.6.x/keyword-match.md">مطابقة النص</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">اضبط <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>لتمكين مطابقة العبارات لحقل <code translate="no">VARCHAR</code> معين، اضبط كل من المعلمتين <code translate="no">enable_analyzer</code> و <code translate="no">enable_match</code> على <code translate="no">True</code> عند تعريف مخطط الحقل. يوجه هذا التكوين Milvus إلى تجزئة النص وإنشاء فهرس معكوس مع المعلومات الموضعية المطلوبة لمطابقة العبارات بكفاءة.</p>
<p>فيما يلي مثال على تعريف مخطط لتمكين مطابقة العبارات:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>تعتمد دقة مطابقة العبارات بشكل كبير على المحلل المستخدم لتقسيم بيانات النص إلى رموز. تتناسب المحللات المختلفة مع اللغات وتنسيقات النص المختلفة، مما يؤثر على عملية التقسيم ودقة المواقع. سيؤدي اختيار محلل مناسب لحالة الاستخدام المحددة الخاصة بك إلى تحسين نتائج مطابقة العبارات.</p>
<p>بشكل افتراضي، يستخدم Milvus المحلل القياسي، الذي يقوم بتجزئة النص إلى رموز بناءً على المسافات البيضاء وعلامات الترقيم، ويزيل الرموز التي يزيد طولها عن 40 حرفًا، ويحول النص إلى أحرف صغيرة. لا توجد معلمات إضافية مطلوبة للاستخدام الافتراضي. راجع <a href="/docs/ar/v2.6.x/standard-analyzer.md">المحلل القياسي</a> للحصول على التفاصيل.</p>
<p>إذا كان تطبيقك يتطلب محللًا محددًا، فقم بتكوينه باستخدام المعلمة <code translate="no">analyzer_params</code>. على سبيل المثال، إليك كيفية تكوين محلل <code translate="no">english</code> لمطابقة العبارات في النص باللغة الإنجليزية:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>يدعم Milvus العديد من المحللات المصممة خصيصًا للغات وحالات الاستخدام المختلفة. للحصول على معلومات تفصيلية، راجع <a href="/docs/ar/v2.6.x/analyzer-overview.md">«نظرة عامة على المحلل</a>».</p>
<h2 id="Use-phrase-match" class="common-anchor-header">استخدام مطابقة العبارات<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد تمكين المطابقة لحقل « <code translate="no">VARCHAR</code> » في مخطط المجموعة الخاص بك، يمكنك إجراء مطابقات العبارات باستخدام التعبير « <code translate="no">PHRASE_MATCH</code> ».</p>
<div class="alert note">
<p>التعبير <code translate="no">PHRASE_MATCH</code> لا يميز بين الأحرف الكبيرة والصغيرة. يمكنك استخدام إما <code translate="no">PHRASE_MATCH</code> أو <code translate="no">phrase_match</code>.</p>
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
    </button></h3><p>استخدم تعبير <code translate="no">PHRASE_MATCH</code> لتحديد الحقل والعبارة والمرونة الاختيارية (<code translate="no">slop</code>) عند البحث. وصيغة التعبير هي:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> اسم حقل « <code translate="no">VARCHAR</code> » الذي تُجري عليه عمليات مطابقة العبارات.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> العبارة الدقيقة المراد البحث عنها.</p></li>
<li><p><code translate="no">slop</code> (اختياري)<strong>:</strong> عدد صحيح يحدد الحد الأقصى لعدد المواضع المسموح بها في الرموز المطابقة.</p>
<ul>
<li><p><code translate="no">0</code> (الافتراضي): يطابق العبارات الدقيقة فقط. مثال: سيطابق مرشح عبارة <strong>«machine learning»</strong> <strong>عبارة «machine learning»</strong> بالضبط، ولكنه لن يطابق <strong>«machine boosts learning»</strong> أو <strong>«learning machine».</strong></p></li>
<li><p><code translate="no">1</code>: يسمح باختلافات طفيفة، مثل مصطلح إضافي واحد أو تغيير بسيط في الموضع. مثال: سيطابق مرشح عبارة <strong>«machine learning»</strong> <strong>عبارة «machine boosts learning»</strong> (رمز واحد بين <strong>«machine»</strong> <strong>و«learning»</strong>) ولكنه لن يطابق <strong>«learning machine»</strong> (عكس ترتيب المصطلحين).</p></li>
<li><p><code translate="no">2</code>: يسمح بمرونة أكبر، بما في ذلك عكس ترتيب المصطلحات أو وجود ما يصل إلى رمزين بينهما. مثال: سيطابق عامل التصفية الخاص بـ <strong>«machine learning»</strong> <strong>عبارة «learning machine»</strong> (عكس ترتيب المصطلحات) أو <strong>«machine quickly boosts learning»</strong> (وجود رمزين بين <strong>«machine»</strong> <strong>و«learning»</strong>).</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">مجموعة بيانات نموذجية<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
     <td><p>"يعد تعلم النهج القائم على الآلة أمرًا حيويًا لتقدم الذكاء الاصطناعي الحديث"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"تعمل بنى التعلم العميق للآلات على تحسين الأحمال الحسابية"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"تعمل الآلة على تحسين أداء النموذج بسرعة من أجل التعلم المستمر"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"يؤدي تعلم خوارزميات الآلات المتقدمة إلى توسيع قدرات الذكاء الاصطناعي"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">الاستعلام باستخدام مطابقة العبارة<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>عند استخدام طريقة <code translate="no">query()</code> ، تعمل <strong>PHRASE_MATCH</strong> كمرشح قياسي. يتم إرجاع المستندات التي تحتوي على العبارة المحددة فقط (مع مراعاة التفاوت المسموح به).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">مثال: slop = 0 (مطابقة تامة)</h4><p>يعرض هذا المثال المستندات التي تحتوي على العبارة <strong>«machine learning»</strong> بالضبط دون أي رموز إضافية بينها.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
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
<p>يحتوي المستند 1 فقط على العبارة الدقيقة <strong>"machine learning"</strong> بالترتيب المحدد دون أي رموز إضافية.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">البحث باستخدام مطابقة العبارات<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>في عمليات البحث، تُستخدم <strong>PHRASE_MATCH</strong> لتصفية المستندات قبل تطبيق ترتيب التشابه المتجهي. تعمل هذه الطريقة المكونة من خطوتين أولاً على تضييق مجموعة المرشحين من خلال المطابقة النصية، ثم إعادة ترتيب تلك المرشحين بناءً على التضمينات المتجهة.</p>
<h4 id="Example-slop--1" class="common-anchor-header">مثال: slop = 1</h4><p>هنا، نسمح بـ slop يساوي 1. يتم تطبيق المرشح على المستندات التي تحتوي على العبارة <strong>«learning machine»</strong> مع مرونة طفيفة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>نتائج المطابقة:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"يعد تعلم النهج القائم على الآلة أمرًا حيويًا لتقدم الذكاء الاصطناعي الحديث"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"تعمل بنى التعلم العميق على تحسين الأحمال الحسابية"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"يؤدي تعلم الخوارزميات الآلية المتقدمة إلى توسيع قدرات الذكاء الاصطناعي"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">مثال: slop = 2</h4><p>يسمح هذا المثال بـ slop يساوي 2، مما يعني أنه يُسمح بوجود ما يصل إلى رمزين إضافيين (أو مصطلحين معكوسين) بين الكلمتين <strong>"machine"</strong> و <strong>"learning".</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
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
     <td><p>"تعمل بنى آلات التعلم العميق على تحسين الأحمال الحسابية"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">مثال: slop = 3</h4><p>في هذا المثال، يوفر القيمة slop البالغة 3 مزيدًا من المرونة. يبحث المرشح عن عبارة <strong>"machine learning"</strong> مع السماح بوجود ما يصل إلى ثلاثة مواضع للرموز الفاصلة بين الكلمات.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
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
     <td><p>"يعد تعلم النهج القائم على الآلة أمرًا حيويًا لتقدم الذكاء الاصطناعي الحديث"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"تعمل بنى التعلم العميق للآلات على تحسين الأحمال الحسابية"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"يؤدي تعلم الخوارزميات الآلية المتقدمة إلى توسيع قدرات الذكاء الاصطناعي"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">اعتبارات<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>يؤدي تمكين مطابقة العبارات لحقل ما إلى إنشاء فهرس معكوس، مما يستهلك موارد التخزين. ضع في اعتبارك تأثير ذلك على التخزين عند اتخاذ قرار بتمكين هذه الميزة، حيث يختلف هذا التأثير بناءً على حجم النص، والرموز الفريدة، والمحلل المستخدم.</p></li>
<li><p>بمجرد تحديد محلل في مخططك، تصبح إعداداته دائمة لتلك المجموعة. إذا قررت أن محللًا مختلفًا يناسب احتياجاتك بشكل أفضل، فيمكنك التفكير في حذف المجموعة الحالية وإنشاء مجموعة جديدة بتكوين المحلل المطلوب.</p></li>
<li><p>يعتمد أداء مطابقة العبارات على كيفية تقسيم النص إلى رموز. قبل تطبيق محلل على مجموعتك بأكملها، استخدم طريقة <code translate="no">run_analyzer</code> لمراجعة ناتج تقسيم النص إلى رموز. لمزيد من المعلومات، راجع <a href="/docs/ar/v2.6.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">نظرة عامة</a> على <a href="/docs/ar/v2.6.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">المحلل</a>.</p></li>
<li><p>قواعد الهروب في تعبيرات <code translate="no">filter</code>:</p>
<ul>
<li><p>يتم تفسير الأحرف المحاطة بعلامات الاقتباس المزدوجة أو المفردة داخل التعبيرات على أنها ثوابت سلاسل. إذا كانت ثابتة السلسلة تتضمن أحرف الهروب، فيجب تمثيل أحرف الهروب بتسلسل الهروب. على سبيل المثال، استخدم <code translate="no">\\</code> لتمثيل <code translate="no">\</code> ، و <code translate="no">\\t</code> لتمثيل علامة الجدولة <code translate="no">\t</code> ، و <code translate="no">\\n</code> لتمثيل سطر جديد.</p></li>
<li><p>إذا كانت ثابتة السلسلة محاطة بعلامات اقتباس مفردة، فيجب تمثيل علامة الاقتباس المفردة داخل الثابتة على أنها <code translate="no">\\'</code> بينما يمكن تمثيل علامة الاقتباس المزدوجة إما على أنها <code translate="no">&quot;</code> أو <code translate="no">\\&quot;</code>. مثال: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>إذا كان الثابت السلسلي محاطًا بعلامات اقتباس مزدوجة، فيجب تمثيل علامة الاقتباس المزدوجة داخل الثابت على النحو التالي: <code translate="no">\\&quot;</code> ، بينما يمكن تمثيل علامة الاقتباس المفردة إما على النحو التالي: <code translate="no">'</code> أو <code translate="no">\\'</code>. مثال: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
