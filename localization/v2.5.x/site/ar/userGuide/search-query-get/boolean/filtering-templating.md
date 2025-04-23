---
id: filtering-templating.md
title: تصميم عامل التصفية
summary: >-
  في Milvus، يمكن أن تؤثر تعبيرات التصفية المعقدة التي تحتوي على العديد من
  العناصر، خاصةً تلك التي تتضمن أحرفًا غير ASCII مثل أحرف CJK، بشكل كبير على
  أداء الاستعلام. ولمعالجة هذه المشكلة، يقدم ميلفوس آلية نمذجة تعبيرات التصفية
  المصممة لتحسين الكفاءة من خلال تقليل الوقت المستغرق في تحليل التعبيرات
  المعقدة. تشرح هذه الصفحة استخدام نموذج تعبير المرشح في عمليات البحث والاستعلام
  والحذف.
---
<h1 id="Filter-Templating" class="common-anchor-header">تصميم عامل التصفية<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>في Milvus، يمكن أن تؤثر تعبيرات التصفية المعقدة التي تحتوي على العديد من العناصر، خاصة تلك التي تتضمن أحرفًا غير ASCII مثل أحرف CJK، بشكل كبير على أداء الاستعلام. ولمعالجة هذه المشكلة، يقدم ميلفوس آلية نمذجة تعبيرات التصفية المصممة لتحسين الكفاءة من خلال تقليل الوقت المستغرق في تحليل التعبيرات المعقدة. تشرح هذه الصفحة استخدام نموذج تعبير المرشح في عمليات البحث والاستعلام والحذف.</p>
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
    </button></h2><p>يسمح لك نمذجة تعبير التصفية بإنشاء تعبيرات التصفية مع العناصر النائبة التي يمكن استبدالها ديناميكيًا بقيم أثناء تنفيذ الاستعلام. باستخدام القالب، يمكنك تجنب تضمين المصفوفات الكبيرة أو التعبيرات المعقدة مباشرةً في عامل التصفية، مما يقلل من وقت التحليل ويحسن أداء الاستعلام.</p>
<p>لنفترض أن لديك تعبير مرشح يتضمن حقلين، <code translate="no">age</code> و <code translate="no">city</code> ، وتريد العثور على جميع الأشخاص الذين تزيد أعمارهم عن 25 عامًا ويعيشون إما في "北京 海" (بكين) أو "海 海" (شنغهاي). بدلاً من تضمين القيم مباشرة في تعبير المرشح، يمكنك استخدام قالب:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>هنا، <code translate="no">{age}</code> و <code translate="no">{city}</code> هي عناصر نائبة سيتم استبدالها بالقيم الفعلية في <code translate="no">filter_params</code> عند تنفيذ الاستعلام.</p>
<p>يتميز استخدام قالب تعبير المرشح في ميلفوس بالعديد من المزايا الرئيسية:</p>
<ul>
<li><p><strong>تقليل وقت التحليل</strong>: من خلال استبدال تعبيرات التصفية الكبيرة أو المعقدة بالعناصر النائبة، يقضي النظام وقتًا أقل في تحليل المرشح ومعالجته.</p></li>
<li><p><strong>تحسين أداء الاستعلام</strong>: مع انخفاض تكاليف التحليل الزائدة، يتحسن أداء الاستعلام، مما يؤدي إلى زيادة معدل الاستجابة السريعة وأوقات استجابة أسرع.</p></li>
<li><p><strong>قابلية التوسع</strong>: مع نمو مجموعات البيانات الخاصة بك وزيادة تعقيد تعبيرات التصفية، يضمن النمذجة أن يظل الأداء فعالاً وقابلاً للتطوير.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">عمليات البحث<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لعمليات البحث في Milvus، يُستخدم التعبير <code translate="no">filter</code> لتحديد شرط التصفية، وتُستخدم المعلمة <code translate="no">filter_params</code> لتحديد قيم العناصر النائبة. يحتوي القاموس <code translate="no">filter_params</code> على القيم الديناميكية التي سيستخدمها ميلفوس للاستعاضة عنها في تعبير التصفية.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، سيستبدل ميلفوس ديناميكيًا <code translate="no">{age}</code> ب <code translate="no">25</code> و <code translate="no">{city}</code> ب <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> عند تنفيذ البحث.</p>
<h2 id="Query-Operations" class="common-anchor-header">عمليات الاستعلام<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن تطبيق آلية النمذجة نفسها على عمليات الاستعلام في ميلفوس. في الدالة <code translate="no">query</code> ، يمكنك تحديد تعبير المرشح واستخدام <code translate="no">filter_params</code> لتحديد القيم المراد استبدالها.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>باستخدام <code translate="no">filter_params</code> ، يتعامل ميلفوس بكفاءة مع الإدراج الديناميكي للقيم، مما يحسن من سرعة تنفيذ الاستعلام.</p>
<h2 id="Delete-Operations" class="common-anchor-header">عمليات الحذف<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك أيضًا استخدام قالب تعبير المرشح في عمليات الحذف. على غرار البحث والاستعلام، يحدد تعبير <code translate="no">filter</code> الشروط، ويوفر <code translate="no">filter_params</code> القيم الديناميكية للعناصر النائبة.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>يعمل هذا الأسلوب على تحسين أداء عمليات الحذف، خاصة عند التعامل مع شروط التصفية المعقدة.</p>
<h2 id="Conclusion" class="common-anchor-header">الخلاصة<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>يعد نموذج تعبير المرشح أداة أساسية لتحسين أداء الاستعلام في ميلفوس. باستخدام العناصر النائبة والقاموس <code translate="no">filter_params</code> ، يمكنك تقليل الوقت المستغرق في تحليل تعبيرات التصفية المعقدة بشكل كبير. وهذا يؤدي إلى تنفيذ الاستعلام بشكل أسرع وأداء أفضل بشكل عام.</p>
