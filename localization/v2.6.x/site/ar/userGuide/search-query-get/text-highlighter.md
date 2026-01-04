---
id: text-highlighter.md
title: أداة تمييز النصCompatible with Milvus 2.6.8+
summary: >-
  تقوم أداة التظليل في Milvus بوضع تعليقات توضيحية للمصطلحات المتطابقة في الحقول
  النصية عن طريق تغليفها بعلامات قابلة للتخصيص. يساعد التظليل على شرح سبب تطابق
  المستند، ويحسن من إمكانية قراءة النتائج، ويدعم العرض الغني في تطبيقات البحث و
  RAG.
beta: Milvus 2.6.8+
---
<h1 id="Text-Highlighter" class="common-anchor-header">أداة تمييز النص<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#Text-Highlighter" class="anchor-icon" translate="no">
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
    </button></h1><p>تقوم أداة تمييز النص في Milvus بوضع تعليقات توضيحية للمصطلحات المتطابقة في الحقول النصية عن طريق تغليفها بعلامات قابلة للتخصيص. يساعد التظليل على توضيح سبب تطابق المستند، ويحسن من سهولة قراءة النتائج، ويدعم العرض الغني في تطبيقات البحث و RAG.</p>
<p>يتم تنفيذ التظليل كخطوة معالجة لاحقة على مجموعة نتائج البحث النهائية. وهو لا يؤثر على استرجاع المرشح أو منطق التصفية أو الترتيب أو التسجيل.</p>
<p>توفر أداة التمييز ثلاثة أبعاد مستقلة للتحكم:</p>
<ul>
<li><p><strong>المصطلحات التي يتم تمييزها</strong></p>
<p>يمكنك اختيار مصدر المصطلحات المميزة. على سبيل المثال، تمييز مصطلحات البحث المستخدمة في <strong>بحث النص الكامل BM25،</strong> أو مصطلحات الاستعلام المحددة في <strong>تعبيرات التصفية المستندة إلى النص</strong> (مثل شروط <code translate="no">TEXT_MATCH</code> ).</p></li>
<li><p><strong>كيفية عرض المصطلحات المميزة</strong></p>
<p>يمكنك التحكم في كيفية ظهور المصطلحات المتطابقة في مخرجات التظليل من خلال تكوين العلامات المدرجة قبل وبعد كل تطابق. على سبيل المثال، استخدم علامات بسيطة مثل <code translate="no">{}</code> أو علامات HTML مثل <code translate="no">&lt;em&gt;&lt;/em&gt;</code> للعرض الغني.</p></li>
<li><p><strong>كيفية إرجاع النص المميز</strong></p>
<p>يمكنك التحكم في كيفية إرجاع النتائج المميزة كأجزاء، بما في ذلك مكان بدء الأجزاء وطولها وعدد الأجزاء التي يتم إرجاعها.</p></li>
</ul>
<p>تستعرض الأقسام التالية هذه السيناريوهات.</p>
<h2 id="Search-term-highlighting-in-BM25-full-text-search" class="common-anchor-header">تظليل مصطلح البحث في بحث النص الكامل BM25<button data-href="#Search-term-highlighting-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>عند إجراء بحث في النص الكامل في BM25، يمكنك تمييز مصطلحات <strong>البحث</strong> في النتيجة التي تم إرجاعها للمساعدة في توضيح سبب تطابق المستند مع الاستعلام. لمعرفة المزيد حول البحث بالنص الكامل في BM25، راجع <a href="/docs/ar/full-text-search.md">البحث بالنص الكامل</a>.</p>
<p>في هذا السيناريو، تأتي المصطلحات المميزة مباشرةً من مصطلحات البحث المستخدمة في البحث عن النص الكامل BM25. يستخدم أداة التمييز هذه المصطلحات للتعليق على النص المطابق في النتيجة النهائية.</p>
<p>افترض أن المحتوى التالي مخزن في حقل نصي:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>تكوين أداة التمييز</strong></p>
<p>لتمييز مصطلحات البحث في البحث عن النص الكامل في BM25، قم بإنشاء <code translate="no">LexicalHighlighter</code> وقم بتمكين تمييز مصطلحات البحث للبحث عن النص الكامل في BM25:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_search_text=<span class="hljs-literal">True</span>   <span class="hljs-comment"># Enable search term highlighting for BM25 full text search</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال</p>
<ul>
<li><p><code translate="no">pre_tags</code> و <code translate="no">post_tags</code> التحكم في كيفية ظهور النص المميز في الإخراج. في هذه الحالة، يتم تغليف المصطلحات المتطابقة بـ <code translate="no">{}</code> (على سبيل المثال، <code translate="no">{term}</code>). يمكنك أيضًا توفير علامات متعددة كقائمة (على سبيل المثال، <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). عندما يتم تمييز مصطلحات متعددة، يتم تطبيق العلامات بالترتيب وتدويرها حسب تسلسل المطابقة.</p></li>
<li><p><code translate="no">highlight_search_text=True</code> يخبر ميلفوس باستخدام مصطلحات البحث في بحث النص الكامل BM25 كمصدر للمصطلحات المميزة.</p></li>
</ul>
<p>بمجرد إنشاء كائن التمييز، قم بتطبيق تكوينه على طلب البحث عن النص الكامل BM25:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],      <span class="hljs-comment"># Search term used in BM25 full text search</span>
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>إخراج التظليل</strong></p>
<p>عند تمكين التظليل، يقوم Milvus بإرجاع النص المميز في حقل مخصص <code translate="no">highlight</code>. بشكل افتراضي، يتم إرجاع المخرجات المميزة كجزء يبدأ من أول مصطلح مطابق.</p>
<p>في هذا المثال، مصطلح البحث هو <code translate="no">&quot;BM25&quot;</code> ، لذلك يتم تمييزه في النتيجة التي تم إرجاعها:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>للتحكم في موضع الأجزاء التي تم إرجاعها وطولها وعددها، راجع <a href="/docs/ar/text-highlighter.md#Fragment-based-highlighting-output">إرجاع النص المميز كأجزاء</a>.</p>
<h2 id="Query-term-highlighting-in-filtering" class="common-anchor-header">تمييز مصطلح الاستعلام في التصفية<button data-href="#Query-term-highlighting-in-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>بالإضافة إلى تمييز مصطلحات البحث، يمكنك تمييز المصطلحات المستخدمة في تعبيرات التصفية المستندة إلى النص.</p>
<div class="alert note">
<p>في الوقت الحالي، يتم دعم شرط التصفية <code translate="no">TEXT_MATCH</code> فقط لتمييز مصطلح الاستعلام. لمعرفة المزيد، راجع <a href="/docs/ar/keyword-match.md">مطابقة النص</a>.</p>
</div>
<p>في هذا السيناريو، تأتي المصطلحات المميزة من تعبيرات التصفية المستندة إلى النص. تحدد التصفية المستندات التي تتطابق مع المستندات، بينما تقوم أداة التمييز بتمييز امتدادات النص المتطابقة.</p>
<p>افترض أن المحتوى التالي مخزن في حقل نصي:</p>
<pre><code translate="no" class="language-python">This document explains how text filtering works <span class="hljs-keyword">in</span> Milvus.
<button class="copy-code-btn"></button></code></pre>
<p><strong>تكوين أداة التمييز</strong></p>
<p>لتمييز مصطلحات الاستعلام المستخدمة في التصفية، قم بإنشاء <code translate="no">LexicalHighlighter</code> وحدد <code translate="no">highlight_query</code> الذي يتوافق مع شرط التصفية:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_query=[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>,     <span class="hljs-comment"># Text filtering type</span>
        <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,         <span class="hljs-comment"># Target text field</span>
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;text filtering&quot;</span> <span class="hljs-comment"># Terms to highlight</span>
    }]
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">pre_tags</code> و <code translate="no">post_tags</code> التحكم في كيفية ظهور النص المميز في الإخراج. في هذه الحالة، يتم تغليف المصطلحات المتطابقة بـ <code translate="no">{}</code> (على سبيل المثال، <code translate="no">{term}</code>). يمكنك أيضًا توفير علامات متعددة كقائمة (على سبيل المثال، <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). عند تمييز مصطلحات متعددة، يتم تطبيق العلامات بالترتيب وتدويرها حسب تسلسل المطابقة.</p></li>
<li><p><code translate="no">highlight_query</code> يحدد مصطلحات التصفية التي يجب تمييزها.</p></li>
</ul>
<p>بمجرد إنشاء كائن أداة التمييز، قم بتطبيق نفس تعبير التصفية وتكوين أداة التمييز على طلب البحث الخاص بك:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(text, &quot;text filtering&quot;)&#x27;</span>,
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>تمييز المخرجات</strong></p>
<p>عندما يتم تمكين تمييز مصطلح الاستعلام للتصفية، يقوم ميلفوس بإرجاع النص المميز في حقل مخصص <code translate="no">highlight</code>. بشكل افتراضي، يتم إرجاع المخرجات المميزة كجزء يبدأ من أول مصطلح مطابق.</p>
<p>في هذا المثال، المصطلح المطابق الأول هو <code translate="no">&quot;text&quot;</code> ، لذلك يبدأ النص المميز الذي تم إرجاعه من هذا الموضع:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{text} {filtering} works in Milvus.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>للتحكم في موضع الأجزاء التي تم إرجاعها وطولها وعددها، راجع <a href="/docs/ar/text-highlighter.md#Fragment-based-highlighting-output">إرجاع النص المميز كأجزاء</a>.</p>
<h2 id="Fragment-based-highlighting-output" class="common-anchor-header">إخراج التظليل القائم على الأجزاء<button data-href="#Fragment-based-highlighting-output" class="anchor-icon" translate="no">
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
    </button></h2><p>بشكل افتراضي، يقوم برنامج Milvus بإرجاع النص المميز كأجزاء تبدأ من أول مصطلح مطابق. تسمح لك الإعدادات المتعلقة بالأجزاء بالتحكم بشكل أكبر في كيفية إرجاع الأجزاء، دون تغيير المصطلحات التي يتم تمييزها.</p>
<p>افترض أن المحتوى التالي مخزن في حقل نصي:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>تكوين أداة التمييز</strong></p>
<p>للتحكم في شكل الأجزاء المميزة، قم بتكوين الخيارات المتعلقة بالأجزاء في <code translate="no">LexicalHighlighter</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],
    highlight_search_text=<span class="hljs-literal">True</span>,
    fragment_offset=<span class="hljs-number">5</span>,     <span class="hljs-comment"># Number of characters to reserve before the first matched term</span>
    fragment_size=<span class="hljs-number">60</span>,      <span class="hljs-comment"># Max. length of each fragment to return</span>
    num_of_fragments=<span class="hljs-number">1</span>     <span class="hljs-comment"># Max. number of fragments to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا التكوين</p>
<ul>
<li><p><code translate="no">fragment_offset</code> يحتفظ بالسياق البادئ قبل المصطلح المميز الأول.</p></li>
<li><p><code translate="no">fragment_size</code> يحدد مقدار النص الذي يتم تضمينه في كل جزء.</p></li>
<li><p><code translate="no">num_of_fragments</code> يتحكم في عدد الأجزاء التي يتم إرجاعها.</p></li>
</ul>
<p>بمجرد إنشاء كائن أداة التمييز، قم بتطبيق تكوين أداة التمييز على طلب البحث الخاص بك:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>تسليط الضوء على الإخراج</strong></p>
<p>مع تمكين التظليل المستند إلى الأجزاء، يقوم Milvus بإرجاع النص المميز كأجزاء في الحقل <code translate="no">highlight</code>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;Use {BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذا الإخراج:</p>
<ul>
<li><p>لا يبدأ الجزء بالضبط عند <code translate="no">{BM25}</code> لأنه تم تعيين <code translate="no">fragment_offset</code>.</p></li>
<li><p>يتم إرجاع جزء واحد فقط لأن <code translate="no">num_of_fragments</code> هو 1.</p></li>
<li><p>يتم تحديد طول الجزء ب <code translate="no">fragment_size</code>.</p></li>
</ul>
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">التحضير<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل استخدام أداة التمييز، تأكد من تكوين مجموعتك بشكل صحيح.</p>
<p>يقوم المثال أدناه بإنشاء مجموعة تدعم البحث عن النص الكامل BM25 والاستعلامات <code translate="no">TEXT_MATCH</code> ، ثم إدراج نماذج من المستندات.</p>
<p><details></p>
<p><summary><strong>قم بإعداد مجموعتك</strong></summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    LexicalHighlighter,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;highlighter_demo&quot;</span>

<span class="hljs-comment"># Clean up existing collection</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

<span class="hljs-comment"># Define schema</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">2000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Required for BM25</span>
    enable_match=<span class="hljs-literal">True</span>,     <span class="hljs-comment"># Required for TEXT_MATCH</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="hljs-comment"># Add BM25 function</span>
schema.add_function(Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    function_type=FunctionType.BM25,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;sparse_vector&quot;</span>],
))

<span class="hljs-comment"># Create index</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>, <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>},
)

client.create_collection(collection_name=COLLECTION_NAME, schema=schema, index_params=index_params)

<span class="hljs-comment"># Insert sample documents</span>
docs = [
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications &quot;</span>
    <span class="hljs-string">&quot;of every size from running a demo chatbot to building web-scale search.&quot;</span>,
]
client.insert(collection_name=COLLECTION_NAME, data=[{<span class="hljs-string">&quot;text&quot;</span>: t} <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> docs])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;✓ Collection created with <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents\n&quot;</span>)

<span class="hljs-comment"># Helper for search params</span>
SEARCH_PARAMS = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.0</span>}}

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># ✓ Collection created with 4 documents</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-1-Highlight-search-terms-in-BM25-full-text-search" class="common-anchor-header">مثال 1: تمييز مصطلحات البحث في بحث النص الكامل BM25<button data-href="#Example-1-Highlight-search-terms-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h3><p>يوضح هذا المثال كيفية تمييز مصطلحات البحث في بحث النص الكامل BM25.</p>
<ul>
<li><p>يستخدم البحث عن النص الكامل BM25 <code translate="no">&quot;test&quot;</code> كمصطلح بحث</p></li>
<li><p>تقوم أداة التمييز بتغليف جميع تكرارات "اختبار" بالعلامات <code translate="no">{</code> و <code translate="no">}</code> </p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Highlight BM25 query terms</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>المخرجات المتوقعة</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{test} doc&#x27;]
[&#x27;{test} doc&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database that suits AI applications of every size from run&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-2-Highlight-query-terms-in-filtering" class="common-anchor-header">مثال 2: تمييز مصطلحات الاستعلام في التصفية<button data-href="#Example-2-Highlight-query-terms-in-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>يوضح هذا المثال كيفية تمييز المصطلحات المتطابقة بواسطة مرشح <code translate="no">TEXT_MATCH</code>.</p>
<ul>
<li><p>يستخدم BM25 بحث النص الكامل <code translate="no">&quot;test&quot;</code> كمصطلح استعلام</p></li>
<li><p>تضيف المعلمة <code translate="no">queries</code> المعلمة <code translate="no">&quot;my doc&quot;</code> إلى قائمة التظليل</p></li>
<li><p>تقوم أداة التظليل بتمييز جميع المصطلحات المتطابقة (<code translate="no">&quot;my&quot;</code> ، <code translate="no">&quot;test&quot;</code> ، ، <code translate="no">&quot;doc&quot;</code>) مع <code translate="no">{</code> و <code translate="no">}</code></p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,   <span class="hljs-comment"># Also highlight BM25 term</span></span>
<span class="highlighted-comment-line">    highlight_query=[                     <span class="hljs-comment"># Additional TEXT_MATCH terms to highlight</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my doc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>الناتج المتوقع</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{my} first {test} {doc}&#x27;]
[&#x27;{my} second {test} {doc}&#x27;]
[&#x27;{my} first {test} {doc}. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{my} second {test} {doc}. Milvus is an open-source vector database that suits AI applications of every siz&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-3-Return-highlights-as-fragments" class="common-anchor-header">مثال 3: إرجاع التظليل على شكل أجزاء<button data-href="#Example-3-Return-highlights-as-fragments" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذا المثال، يبحث الاستعلام عن <code translate="no">&quot;Milvus&quot;</code> ويعيد أجزاء التظليل في الإعدادات التالية:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> يحتفظ بما يصل إلى 20 حرفًا قبل أول جزء مميز كسياق رئيسي (الافتراضي هو 0).</p></li>
<li><p><code translate="no">fragment_size</code> يحد كل جزء إلى 60 حرفًا تقريبًا (الافتراضي هو 100).</p></li>
<li><p><code translate="no">num_of_fragments</code> يحد من عدد الأجزاء التي تم إرجاعها لكل قيمة نصية (الافتراضي هو 5).</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    fragment_offset=<span class="hljs-number">20</span>,  <span class="hljs-comment"># Keep 20 chars before match</span></span>
<span class="highlighted-comment-line">    fragment_size=<span class="hljs-number">60</span>,    <span class="hljs-comment"># Max ~60 chars per fragment</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;Milvus&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results[<span class="hljs-number">0</span>]):
    frags = hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}).get(<span class="hljs-string">&#x27;text&#x27;</span>, [])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Doc <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>: <span class="hljs-subst">{frags}</span>&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>الإخراج المتوقع</summary></p>
<pre><code translate="no" class="language-plaintext">Doc 1: [&#x27;my first test doc. {Milvus} is an open-source vector database &#x27;]
Doc 2: [&#x27;my second test doc. {Milvus} is an open-source vector database&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-4-Multi-query-highlighting" class="common-anchor-header">مثال 4: تمييز الاستعلامات المتعددة<button data-href="#Example-4-Multi-query-highlighting" class="anchor-icon" translate="no">
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
    </button></h3><p>عند البحث باستعلامات متعددة في بحث النص الكامل BM25، يتم تمييز نتائج كل استعلام بشكل مستقل. تحتوي نتائج الاستعلام الأول على إبرازات لمصطلح البحث الخاص به، وتحتوي نتائج الاستعلام الثاني على إبرازات لمصطلح البحث الخاص به، وهكذا. يستخدم كل استعلام نفس التكوين <code translate="no">highlighter</code> ولكن يتم تطبيقه بشكل مستقل.</p>
<p>في المثال أدناه:</p>
<ul>
<li><p>يبرز الاستعلام الأول <code translate="no">&quot;test&quot;</code> في مجموعة النتائج الخاصة به</p></li>
<li><p>يبرز الاستعلام الثاني <code translate="no">&quot;Milvus&quot;</code> في مجموعة النتائج الخاصة به</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>],  <span class="hljs-comment"># Two queries</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> nq_idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results):
    query_term = [<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>][nq_idx]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Query &#x27;<span class="hljs-subst">{query_term}</span>&#x27;:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;    <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>الناتج المتوقع</summary></p>
<pre><code translate="no" class="language-plaintext">Query &#x27;test&#x27;:
  [&#x27;{test} doc&#x27;]
  [&#x27;{test} doc&#x27;]
Query &#x27;Milvus&#x27;:
  [&#x27;{Milvus} is an open-source vector database built for GenAI applications.&#x27;]
  [&#x27;{Milvus} is an open-source vector database that suits AI applications of every size from running a dem&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-5-Custom-HTML-tags" class="common-anchor-header">مثال 5: علامات HTML مخصصة<button data-href="#Example-5-Custom-HTML-tags" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك استخدام أي علامات للتمييز، مثل علامات HTML الآمنة لواجهات مستخدم الويب. هذا مفيد عند عرض نتائج البحث في المتصفح.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>المخرجات المتوقعة</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
