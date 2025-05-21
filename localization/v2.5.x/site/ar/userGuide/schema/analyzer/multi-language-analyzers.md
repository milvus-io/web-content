---
id: multi-language-analyzers.md
title: المحللات متعددة اللغات
summary: >-
  عندما يقوم برنامج Milvus بتحليل النص، فإنه عادةً ما يطبّق محللاً واحدًا على
  حقل نصي كامل في مجموعة ما. إذا تم تحسين هذا المُحلل للغة الإنجليزية، فإنه
  يكافح مع قواعد الترميز والوقف المختلفة جدًا التي تتطلبها اللغات الأخرى، مثل
  الصينية أو الإسبانية أو الفرنسية، مما يؤدي إلى انخفاض معدل الاسترجاع. على سبيل
  المثال، البحث عن الكلمة الإسبانية "teléfono" (بمعنى "هاتف") قد يوقع مُحللًا
  يركز على اللغة الإنجليزية في مشكلة: قد يسقط اللكنة ولا يطبق أي جذعية خاصة
  باللغة الإسبانية، مما يؤدي إلى تجاهل النتائج ذات الصلة.
---
<h1 id="Multi-language-Analyzers" class="common-anchor-header">المحللات متعددة اللغات<button data-href="#Multi-language-Analyzers" class="anchor-icon" translate="no">
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
    </button></h1><p>عندما يقوم برنامج Milvus بإجراء تحليل نصي، فإنه عادةً ما يطبق محللًا واحدًا عبر حقل نصي كامل في مجموعة ما. إذا تم تحسين هذا المُحلل للغة الإنجليزية، فإنه يكافح مع قواعد الترميز والوقف المختلفة جدًا التي تتطلبها اللغات الأخرى، مثل الصينية أو الإسبانية أو الفرنسية، مما يؤدي إلى انخفاض معدل الاسترجاع. على سبيل المثال، البحث عن الكلمة الإسبانية <em>"teléfono"</em> (بمعنى <em>"هاتف")</em> قد يعيق المحلل الذي يركز على اللغة الإنجليزية: قد يسقط اللكنة ولا يطبق أي جذعية خاصة باللغة الإسبانية، مما يؤدي إلى تجاهل النتائج ذات الصلة.</p>
<p>تعمل المحللات متعددة اللغات على حل هذه المشكلة من خلال السماح لك بتهيئة عدة محللات لحقل نصي في مجموعة واحدة. وبهذه الطريقة، يمكنك تخزين مستندات متعددة اللغات في حقل نصي، ويقوم Milvus بتحليل النص وفقًا لقواعد اللغة المناسبة لكل مستند.</p>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>تعمل هذه الميزة فقط مع استرجاع النصوص المستندة إلى BM25 والمتجهات المتفرقة. لمزيد من المعلومات، راجع <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>.</p></li>
<li><p>يمكن لكل مستند في مجموعة واحدة استخدام محلل واحد فقط، يتم تحديده من خلال قيمة حقل معرف اللغة الخاص به.</p></li>
<li><p>قد يختلف الأداء بناءً على مدى تعقيد المحللات وحجم البيانات النصية.</p></li>
</ul>
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
    </button></h2><p>يوضح الرسم البياني التالي سير عمل تكوين واستخدام المحللات متعددة اللغات في ملفوس:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-language-analyzers-workflow.png" alt="Multi Language Analyzers Workflow" class="doc-image" id="multi-language-analyzers-workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل المحللين متعددي اللغات</span> </span></p>
<ol>
<li><p><strong>تكوين المحللات متعددة اللغات</strong>:</p>
<ul>
<li><p>قم بإعداد محللات متعددة اللغات باستخدام التنسيق: <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> ، حيث يتبع كل <code translate="no">analyzer_config</code> التكوين القياسي <code translate="no">analyzer_params</code> كما هو موضح في <a href="/docs/ar/analyzer-overview.md#Analyzer-types">نظرة عامة على المحلل</a>.</p></li>
<li><p>تحديد حقل معرّف خاص يحدد اختيار المحلل لكل مستند.</p></li>
<li><p>تكوين محلل <code translate="no">default</code> للتعامل مع اللغات غير المعروفة.</p></li>
</ul></li>
<li><p><strong>إنشاء مجموعة</strong>:</p>
<ul>
<li><p>تعريف المخطط مع الحقول الأساسية:</p>
<ul>
<li><p><strong>المفتاح_الأساسي</strong>: معرّف المستند الفريد.</p></li>
<li><p><strong>text_field</strong>: يخزن محتوى النص الأصلي.</p></li>
<li><p><strong>حقل_المعرف</strong>: يشير إلى المحلل الذي سيتم استخدامه لكل مستند.</p></li>
<li><p><strong>حقل_المتجه</strong>: يخزن التضمينات المتفرقة التي سيتم إنشاؤها بواسطة دالة BM25.</p></li>
</ul></li>
<li><p>تكوين دالة BM25 ومعلمات الفهرسة.</p></li>
</ul></li>
<li><p><strong>إدراج البيانات مع معرّفات اللغة</strong>:</p>
<ul>
<li><p>إضافة مستندات تحتوي على نص بلغات مختلفة، حيث يتضمن كل مستند قيمة معرف يحدد المحلل الذي سيتم استخدامه.</p></li>
<li><p>يختار Milvus المحلل المناسب بناءً على حقل المعرف، وتستخدم المستندات ذات المعرفات غير المعروفة محلل <code translate="no">default</code>.</p></li>
</ul></li>
<li><p><strong>البحث باستخدام محللات خاصة باللغة</strong>:</p>
<ul>
<li><p>توفير نص الاستعلام مع تحديد اسم محلل محدد، ويقوم Milvus بمعالجة الاستعلام باستخدام المحلل المحدد.</p></li>
<li><p>يحدث الترميز وفقًا لقواعد خاصة باللغة، ويعيد البحث نتائج مناسبة للغة بناءً على التشابه.</p></li>
</ul></li>
</ol>
<h2 id="Step-1-Configure-multianalyzerparams" class="common-anchor-header">الخطوة 1: تكوين multi_analyzer_params<button data-href="#Step-1-Configure-multianalyzerparams" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">multi_analyzer_params</code> هو كائن JSON واحد يحدد كيفية اختيار Milvus للمحلل المناسب لكل كيان:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">multi_analyzer_params = {
  <span class="hljs-comment"># Define language-specific analyzers</span>
  <span class="hljs-comment"># Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          <span class="hljs-comment"># English-optimized analyzer</span>
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          <span class="hljs-comment"># Chinese-optimized analyzer</span>
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          <span class="hljs-comment"># Required fallback analyzer</span>
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    <span class="hljs-comment"># Field determining analyzer selection</span>
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         <span class="hljs-comment"># Use &quot;cn&quot; as shorthand for Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          <span class="hljs-comment"># Use &quot;en&quot; as shorthand for English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;icu&quot;</span>);
    }});
}});
analyzerParams.put(<span class="hljs-string">&quot;by_field&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;alias&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;cn&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    put(<span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> multi_analyzer_params = {
  <span class="hljs-comment">// Define language-specific analyzers</span>
  <span class="hljs-comment">// Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          # <span class="hljs-title class_">English</span>-optimized analyzer
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          # <span class="hljs-title class_">Chinese</span>-optimized analyzer
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          # <span class="hljs-title class_">Required</span> fallback analyzer
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    # <span class="hljs-title class_">Field</span> determining analyzer selection
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;cn&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;en&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">multiAnalyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;english&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
        <span class="hljs-string">&quot;chinese&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},
        <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>},
    },
    <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-string">&quot;alias&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
        <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> multi_analyzer_params=<span class="hljs-string">&#x27;{
  &quot;analyzers&quot;: {
    &quot;english&quot;: {
      &quot;type&quot;: &quot;english&quot;
    },
    &quot;chinese&quot;: {
      &quot;type&quot;: &quot;chinese&quot;
    },
    &quot;default&quot;: {
      &quot;tokenizer&quot;: &quot;icu&quot;
    }
  },
  &quot;by_field&quot;: &quot;language&quot;,
  &quot;alias&quot;: {
    &quot;cn&quot;: &quot;chinese&quot;,
    &quot;en&quot;: &quot;english&quot;
  }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>مطلوب؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القواعد</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">analyzers</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يسرد كل محلل خاص باللغة التي يمكن لـ Milvus استخدامها لمعالجة النص. يتبع كل محلل في <code translate="no">analyzers</code> هذا التنسيق: <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_params&gt;</code>.</p></td>
     <td><ul>
<li>قم بتعريف كل محلل باستخدام صيغة <code translate="no">analyzer_params</code> القياسية (انظر <a href="/docs/ar/analyzer-overview.md#Analyzer-types">نظرة عامة على المحلل</a>).</li>
<li>أضف إدخالاً يكون مفتاحه <code translate="no">default</code> ؛ يعود ميلفوس إلى هذا المحلل كلما كانت القيمة المخزنة في <code translate="no">by_field</code> لا تتطابق مع أي اسم محلل آخر.</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">by_field</code></p></td>
     <td><p>نعم</p></td>
     <td><p>اسم الحقل الذي يخزن، لكل مستند، اللغة (أي اسم المحلل) التي يجب أن يطبقها ميلفوس.</p></td>
     <td><ul>
<li><p>يجب أن يكون حقلاً <code translate="no">VARCHAR</code> محدداً في المجموعة.</p></li>
<li><p>يجب أن تتطابق القيمة في كل صف تمامًا مع أحد أسماء المحللين (أو الأسماء المستعارة) المدرجة في <code translate="no">analyzers</code>.</p></li>
<li><p>إذا كانت قيمة أحد الصفوف مفقودة أو غير موجودة، يطبق ميلفوس تلقائيًا محلل <code translate="no">default</code>.</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">alias</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>ينشئ اختصارات أو أسماء بديلة للمحللات الخاصة بك، مما يسهل الرجوع إليها في التعليمات البرمجية الخاصة بك. يمكن أن يكون لكل محلل اسم مستعار واحد أو أكثر.</p></td>
     <td><p>يجب أن يرتبط كل اسم مستعار بمفتاح محلل موجود.</p></td>
   </tr>
</table>
<h2 id="Step-2-Create-collection" class="common-anchor-header">الخطوة 2: إنشاء مجموعة<button data-href="#Step-2-Create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>يتطلب إنشاء مجموعة مع دعم متعدد اللغات تكوين حقول وفهارس محددة:</p>
<h3 id="Add-fields" class="common-anchor-header">إضافة حقول</h3><p>في هذه الخطوة، قم بتعريف مخطط المجموعة بأربعة حقول أساسية:</p>
<ul>
<li><p><strong>حقل المفتاح الأساسي</strong> (<code translate="no">id</code>): معرف فريد لكل كيان في المجموعة. يتيح الإعداد <code translate="no">auto_id=True</code> لميلفوس إنشاء هذه المعرفات تلقائيًا.</p></li>
<li><p><strong>حقل مؤشر اللغة</strong> (<code translate="no">language</code>): يتوافق حقل VARCHAR هذا مع <code translate="no">by_field</code> المحدد في <code translate="no">multi_analyzer_params</code>. يقوم بتخزين معرف اللغة لكل كيان، والذي يخبر ميلفوس بالمحلل الذي يجب استخدامه.</p></li>
<li><p><strong>حقل محتوى النص</strong> (<code translate="no">text</code>): يخزن هذا الحقل VARCHAR البيانات النصية الفعلية التي تريد تحليلها والبحث فيها. يعد الإعداد <code translate="no">enable_analyzer=True</code> أمرًا بالغ الأهمية لأنه ينشط إمكانيات تحليل النص لهذا الحقل. يتم إرفاق التكوين <code translate="no">multi_analyzer_params</code> مباشرةً بهذا الحقل، مما ينشئ الاتصال بين بياناتك النصية والمحللات الخاصة باللغة.</p></li>
<li><p><strong>حقل المتجهات</strong> (<code translate="no">sparse</code>): سيخزن هذا الحقل المتجهات المتفرقة التي تم إنشاؤها بواسطة دالة BM25. تمثل هذه المتجهات الشكل القابل للتحليل لبياناتك النصية وهي ما يبحث عنه ميلفوس بالفعل.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import required modules</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Initialize a new schema</span>
schema = client.create_schema()

<span class="hljs-comment"># Step 2.1: Add a primary key field for unique document identification</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,                  <span class="hljs-comment"># Field name</span>
    datatype=DataType.INT64,          <span class="hljs-comment"># Integer data type</span>
    is_primary=<span class="hljs-literal">True</span>,                  <span class="hljs-comment"># Designate as primary key</span>
    auto_id=<span class="hljs-literal">True</span>                      <span class="hljs-comment"># Auto-generate IDs (recommended)</span>
)

<span class="hljs-comment"># Step 2.2: Add language identifier field</span>
<span class="hljs-comment"># This MUST match the &quot;by_field&quot; value in language_analyzer_config</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;language&quot;</span>,       <span class="hljs-comment"># Field name</span>
    datatype=DataType.VARCHAR,   <span class="hljs-comment"># String data type</span>
    max_length=<span class="hljs-number">255</span>               <span class="hljs-comment"># Maximum length (adjust as needed)</span>
)

<span class="hljs-comment"># Step 2.3: Add text content field with multi-language analysis capability</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,                           <span class="hljs-comment"># Field name</span>
    datatype=DataType.VARCHAR,                   <span class="hljs-comment"># String data type</span>
    max_length=<span class="hljs-number">8192</span>,                             <span class="hljs-comment"># Maximum length (adjust based on expected text size)</span>
    enable_analyzer=<span class="hljs-literal">True</span>,                        <span class="hljs-comment"># Enable text analysis</span>
    multi_analyzer_params=multi_analyzer_params  <span class="hljs-comment"># Connect with our language analyzers</span>
)

<span class="hljs-comment"># Step 2.4: Add sparse vector field to store the BM25 output</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,                   <span class="hljs-comment"># Field name</span>
    datatype=DataType.SPARSE_FLOAT_VECTOR  <span class="hljs-comment"># Sparse vector data type</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.FlushReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;language&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">255</span>)
        .build());

collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">8192</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .multiAnalyzerParams(analyzerParams)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Initialize schema array</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">255</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">8192</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">analyzer_params</span>: multi_analyzer_params,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

schema := entity.NewSchema()

schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;language&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">255</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">8192</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMultiAnalyzerParams(multiAnalyzerParams),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> languageField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;language&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 255
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> textField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;text&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 8192,
    &quot;enable_analyzer&quot;: true
  },
  &quot;multiAnalyzerParam&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$multi_analyzer_params</span>&quot;</span><span class="hljs-string">&#x27;
}&#x27;</span>

<span class="hljs-built_in">export</span> sparseField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;sparse&quot;,
  &quot;dataType&quot;: &quot;SparseFloatVector&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-BM25-function" class="common-anchor-header">تعريف دالة BM25</h3><p>عرّف دالة BM25 لتوليد تمثيلات متجهة متفرقة من بياناتك النصية الأولية:</p>
<div class="multipleCode">
   <a href="#plaintext">نص عادي</a> <a href="#java">جافا</a> <a href="#javascript">NodeJS جافا NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-plaintext"># Create the BM25 function
bm25_function = Function(
    name=&quot;text_to_vector&quot;,            # Descriptive function name
    function_type=FunctionType.BM25,  # Use BM25 algorithm
    input_field_names=[&quot;text&quot;],       # Process text from this field
    output_field_names=[&quot;sparse&quot;]     # Store vectors in this field
)

# Add the function to our schema
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">function</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_to_vector&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build();
collectionSchema.addFunction(function);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;bm25 function&quot;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
    <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;sparse&quot;</span>],
    <span class="hljs-attr">params</span>: {},
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction()
schema.WithFunction(function.WithName(<span class="hljs-string">&quot;text_to_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> <span class="hljs-keyword">function</span>=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;text_to_vector&quot;,
  &quot;type&quot;: &quot;BM25&quot;,
  &quot;inputFieldNames&quot;: [&quot;text&quot;],
  &quot;outputFieldNames&quot;: [&quot;sparse&quot;]
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$idField</span>,
    <span class="hljs-variable">$languageField</span>,
    <span class="hljs-variable">$textField</span>,
    <span class="hljs-variable">$sparseField</span>
  ],
  \&quot;functions\&quot;: [
    <span class="hljs-variable">$function</span>
  ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>تطبق هذه الدالة تلقائيًا المحلل المناسب على كل مدخل نصي بناءً على معرف اللغة الخاص به. لمزيد من المعلومات حول استرجاع النص المستند إلى BM25، راجع <a href="/docs/ar/full-text-search.md">البحث عن النص الكامل</a>.</p>
<h3 id="Configure-index-params" class="common-anchor-header">تكوين بارامترات الفهرس</h3><p>للسماح بالبحث الفعال، قم بإنشاء فهرس على حقل المتجه المتناثر:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Configure index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add index for sparse vector field</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,        <span class="hljs-comment"># Field to index (our vector field)</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,     <span class="hljs-comment"># Let Milvus choose optimal index type</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>          <span class="hljs-comment"># Must be BM25 for this feature</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>
}];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.BM25))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> IndexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;sparse&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;BM25&quot;,
    &quot;params&quot;: {}
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يعمل الفهرس على تحسين أداء البحث من خلال تنظيم المتجهات المتفرقة لحسابات تشابه BM25 الفعالة.</p>
<h3 id="Create-the-collection" class="common-anchor-header">إنشاء المجموعة</h3><p>تجمع خطوة الإنشاء النهائية هذه جميع تكويناتك السابقة معًا:</p>
<ul>
<li><p><code translate="no">collection_name=&quot;multilang_demo&quot;</code> يسمي مجموعتك للرجوع إليها في المستقبل</p></li>
<li><p><code translate="no">schema=schema</code> يطبق بنية الحقل والوظيفة التي حددتها.</p></li>
<li><p><code translate="no">index_params=index_params</code> تنفذ استراتيجية الفهرسة لعمليات بحث فعالة.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection</span>
COLLECTION_NAME = <span class="hljs-string">&quot;multilingual_documents&quot;</span>

<span class="hljs-comment"># Check if collection already exists</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)  <span class="hljs-comment"># Remove it for this example</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Dropped existing collection: <span class="hljs-subst">{COLLECTION_NAME}</span>&quot;</span>)

<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=COLLECTION_NAME,       <span class="hljs-comment"># Collection name</span>
    schema=schema,                         <span class="hljs-comment"># Our multilingual schema</span>
    index_params=index_params              <span class="hljs-comment"># Our search index configuration</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .collectionSchema(collectionSchema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;multilingual_documents&quot;</span>;

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: index_params,
  <span class="hljs-attr">functions</span>: functions
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;multilingual_documents\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$IndexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>في هذه المرحلة، ينشئ ميلفوس مجموعة فارغة مع دعم محلل متعدد اللغات، وجاهزة لاستقبال البيانات.</p>
<h2 id="Step-3-Insert-example-data" class="common-anchor-header">الخطوة 3: إدراج بيانات المثال<button data-href="#Step-3-Insert-example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>عند إضافة مستندات إلى مجموعتك متعددة اللغات، يجب أن يتضمن كل منها محتوى نصي ومعرّف لغة:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare multilingual documents</span>
documents = [
    <span class="hljs-comment"># English documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;en&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
    <span class="hljs-comment"># Chinese documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;cn&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
]

<span class="hljs-comment"># Insert the documents</span>
result = client.insert(COLLECTION_NAME, documents)

<span class="hljs-comment"># Print results</span>
inserted = result[<span class="hljs-string">&quot;insert_count&quot;</span>]            
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Successfully inserted <span class="hljs-subst">{inserted}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Successfully inserted 4 documents</span>
<span class="hljs-comment"># Documents by language: 2 English, 2 Chinese</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;String&gt; texts = Arrays.asList(
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>
);
List&lt;String&gt; languages = Arrays.asList(
        <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>
);

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; texts.size(); i++) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, texts.get(i));
    row.addProperty(<span class="hljs-string">&quot;language&quot;</span>, languages.get(i));
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Prepare multilingual documents</span>
<span class="hljs-keyword">const</span> documents = [
  <span class="hljs-comment">// English documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;english&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;en&quot;</span>,
  },
  <span class="hljs-comment">// Chinese documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;cn&quot;</span>,
  },
];

<span class="hljs-comment">// Insert the documents</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: documents,
});

<span class="hljs-comment">// Print results</span>
<span class="hljs-keyword">const</span> inserted = result.<span class="hljs-property">insert_count</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Successfully inserted <span class="hljs-subst">${inserted}</span> documents`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>);

<span class="hljs-comment">// Expected output:</span>
<span class="hljs-comment">// Successfully inserted 4 documents</span>
<span class="hljs-comment">// Documents by language: 2 English, 2 Chinese</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">column1 := column.NewColumnVarChar(<span class="hljs-string">&quot;text&quot;</span>,
    []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    })
column2 := column.NewColumnVarChar(<span class="hljs-string">&quot;language&quot;</span>,
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>).
    WithColumns(column1, column2),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [
    {
      &quot;text&quot;: &quot;Artificial intelligence is transforming technology&quot;,
      &quot;language&quot;: &quot;english&quot;
    },
    {
      &quot;text&quot;: &quot;Machine learning models require large datasets&quot;,
      &quot;language&quot;: &quot;en&quot;
    },
    {
      &quot;text&quot;: &quot;人工智能正在改变技术领域&quot;,
      &quot;language&quot;: &quot;chinese&quot;
    },
    {
      &quot;text&quot;: &quot;机器学习模型需要大型数据集&quot;,
      &quot;language&quot;: &quot;cn&quot;
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>أثناء الإدراج، يقوم ميلفوس</p>
<ol>
<li><p>يقرأ الحقل <code translate="no">language</code> الخاص بكل مستند</p></li>
<li><p>يطبّق المحلّل المقابل على الحقل <code translate="no">text</code> </p></li>
<li><p>توليد تمثيل متجه متناثر عبر دالة BM25</p></li>
<li><p>يخزن كلاً من النص الأصلي والمتجه المتناثر الذي تم إنشاؤه</p></li>
</ol>
<div class="alert note">
<p>لا تحتاج إلى توفير المتجه المتناثر مباشرةً؛ حيث تقوم الدالة BM25 بإنشائه تلقائيًا بناءً على النص والمحلل المحدد.</p>
</div>
<h2 id="Step-4-Perform-search-operations" class="common-anchor-header">الخطوة 4: إجراء عمليات البحث<button data-href="#Step-4-Perform-search-operations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Use-English-analyzer" class="common-anchor-header">استخدام محلل اللغة الإنجليزية</h3><p>عند البحث باستخدام محلل متعدد اللغات، يحتوي <code translate="no">search_params</code> على تكوين حاسم:</p>
<ul>
<li><p><code translate="no">metric_type=&quot;BM25&quot;</code> يجب أن يتطابق مع تكوين الفهرس الخاص بك.</p></li>
<li><p><code translate="no">analyzer_name=&quot;english&quot;</code> يحدد المحلل الذي سيتم تطبيقه على نص الاستعلام الخاص بك. هذا مستقل عن المحللات المستخدمة على المستندات المخزنة.</p></li>
<li><p><code translate="no">params={&quot;drop_ratio_search&quot;: &quot;0&quot;}</code> يتحكم في السلوك الخاص بـ BM25؛ هنا، يحتفظ بجميع المصطلحات في البحث. لمزيد من المعلومات، ارجع إلى <a href="/docs/ar/sparse_vector.md">Sparse Vector</a>.</p></li>
</ul>
<div class="multipleCode">
   <a href="#plaintext">نص عادي</a> <a href="#java">جافا</a> <a href="#javascript">NodeJS</a> <a href="#java">جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-plaintext">search_params = {
    &quot;metric_type&quot;: &quot;BM25&quot;,            # Must match index configuration
    &quot;analyzer_name&quot;: &quot;english&quot;,  # Analyzer that matches the query language
    &quot;drop_ratio_search&quot;: &quot;0&quot;,     # Keep all terms in search (tweak as needed)
}

# Execute the search
english_results = client.search(
    collection_name=COLLECTION_NAME,  # Collection to search
    data=[&quot;artificial intelligence&quot;],                # Query text
    anns_field=&quot;sparse&quot;,              # Field to search against
    search_params=search_params,      # Search configuration
    limit=3,                      # Max results to return
    output_fields=[&quot;text&quot;, &quot;language&quot;],  # Fields to include in the output
    consistency_level=&quot;Strong&quot;,       # Data‑consistency guarantee
)

# Display English search results
print(&quot;\n=== English Search Results ===&quot;)
for i, hit in enumerate(english_results[0]):
    print(f&quot;{i+1}. [{hit.score:.4f}] {hit.entity.get(&#x27;text&#x27;)} &quot;
          f&quot;(Language: {hit.entity.get(&#x27;language&#x27;)})&quot;)

# Expected output:
# === English Search Results ===
# 1. [2.7881] Artificial intelligence is transforming technology (Language: english)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> english_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;artificial intelligence&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;english&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});

<span class="hljs-comment">// Display English search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
english_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;artificial intelligence&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;metric_type&quot;: &quot;BM25&quot;,
    &quot;analyzer_name&quot;: &quot;english&quot;,
    &quot;drop_ratio_search&quot;: &quot;0&quot;  
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-Chinese-analyzer" class="common-anchor-header">استخدام المحلِّل الصيني</h3><p>يوضّح هذا المثال التحويل إلى المحلّل الصيني (باستخدام الاسم المستعار الخاص به <code translate="no">&quot;cn&quot;</code>) لنص استعلام مختلف. تظل جميع المعلمات الأخرى كما هي، ولكن الآن تتم معالجة نص الاستعلام باستخدام قواعد الترميز الخاصة بالصينية.</p>
<div class="multipleCode">
   <a href="#plaintext">نص عادي</a> <a href="#java">جافا</a> <a href="#javascript">NodeJS</a> <a href="#java">جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-plaintext">search_params[&quot;analyzer_name&quot;] = &quot;cn&quot;

chinese_results = client.search(
    collection_name=COLLECTION_NAME,  # Collection to search
    data=[&quot;人工智能&quot;],                # Query text
    anns_field=&quot;sparse&quot;,              # Field to search against
    search_params=search_params,      # Search configuration
    limit=3,                      # Max results to return
    output_fields=[&quot;text&quot;, &quot;language&quot;],  # Fields to include in the output
    consistency_level=&quot;Strong&quot;,       # Data‑consistency guarantee
)

# Display Chinese search results
print(&quot;\n=== Chinese Search Results ===&quot;)
for i, hit in enumerate(chinese_results[0]):
    print(f&quot;{i+1}. [{hit.score:.4f}] {hit.entity.get(&#x27;text&#x27;)} &quot;
          f&quot;(Language: {hit.entity.get(&#x27;language&#x27;)})&quot;)

# Expected output:
# === Chinese Search Results ===
# 1. [3.3814] 人工智能正在改变技术领域 (Language: chinese)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>);
searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;人工智能&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> cn_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;人工智能&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;cn&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});

<span class="hljs-comment">// Display Chinese search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
cn_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>)

resultSets, err = client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;人工智能&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;人工智能&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;analyzer_name&quot;: &quot;cn&quot;
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
