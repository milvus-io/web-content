---
id: struct-array-operators.md
title: مشغلات StructArray
summary: >-
  تقوم مشغلات StructArray بتصفية الكيانات من خلال تقييم المسندات على الحقول
  الفرعية القياسية داخل حقل StructArray. استخدم هذه الصفحة كمرجع لصيغة العنصر
  element_filter ومجموعة مشغلات MATCH_*.
---
<h1 id="StructArray-Operators" class="common-anchor-header">مشغلات StructArray<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>تقوم مشغلات StructArray بتصفية الكيانات من خلال تقييم المسندات على الحقول الفرعية القياسية داخل حقل StructArray. استخدم هذه الصفحة كمرجع لصيغة المشغل " <code translate="no">element_filter</code> " ومجموعة مشغلات " <code translate="no">MATCH_*</code> ".</p>
<p>يحتوي تصفية StructArray على مجموعتين من العوامل:</p>
<table>
<thead>
<tr><th>مجموعة العوامل</th><th>الغرض الرئيسي</th><th>سلوك النتيجة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>مطابقة عناصر Struct التي تستوفي شرطًا قياسيًا.</td><td>في البحث على مستوى العناصر، يمكن أن تتضمن النتائج المطابقة إزاحات العناصر. في الاستعلام على مستوى الصفوف أو البحث المُصفى، يعتمد شكل النتيجة على واجهة برمجة التطبيقات (API) وحقول الإخراج.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>تحديد الكيانات حسب عدد عناصر Struct التي تستوفي شرطًا قياسيًا.</td><td>التصفية على مستوى الصفوف. لا تُرجع هذه العوامل إزاحات العناصر من تلقاء نفسها.</td></tr>
</tbody>
</table>
<p>استخدم الحقول الفرعية القياسية في عوامل StructArray. تُستخدم الحقول الفرعية المتجهة في مسارات البحث المتجهة ولا تُعد مدخلات لشروط قياسية.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">متى تستخدم أي عامل<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>الهدف</th><th>الاستخدام</th></tr>
</thead>
<tbody>
<tr><td>تقييد البحث المتجهي على مستوى العناصر ليقتصر على العناصر التي تتطابق مع الشروط القياسية.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>مطابقة شروط سكالارية متعددة داخل نفس عنصر Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>إرجاع الكيانات التي يفي فيها عنصر Struct واحد على الأقل بشرط ما فقط.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>إرجاع الكيانات التي تستوفي جميع عناصر Struct فيها الشرط فقط.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>إرجاع الكيانات التي يستوفي فيها ما لا يقل عن أو ما لا يزيد عن أو بالضبط <code translate="no">N</code> من عناصر Struct شرطًا ما.</td><td><code translate="no">MATCH_LEAST</code>، أو <code translate="no">MATCH_MOST</code> ، أو <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">مرشح العناصر<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم <code translate="no">element_filter(structArrayField, predicate)</code> لمطابقة عناصر Struct في حقل StructArray.</p>
<p>داخل الشرط، استخدم <code translate="no">$[subfield]</code> للإشارة إلى حقل فرعي قياسي لعنصر Struct الحالي.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>عند استخدام شروط متعددة داخل الشرط، تنطبق جميع إشارات <code translate="no">$[subfield]</code> على نفس عنصر Struct:</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>عند دمج شرط على مستوى الكيان مع <code translate="no">element_filter</code> ، ضع <code translate="no">element_filter</code> في نهاية التعبير:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> لا يمكن أن يظهر إلا مرة واحدة في تعبير التصفية. لا تقم بتداخل <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code> داخل <code translate="no">element_filter</code> آخر.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">مشغلات عائلة المطابقة<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم عوامل التشغيل <code translate="no">MATCH_*</code> عندما يتعين تحديد كيان بناءً على عدد عناصر Struct التي تستوفي شرطًا ما.</p>
<table>
<thead>
<tr><th>المُشغِّل</th><th>المعنى</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>يستوفي عنصر Struct واحد على الأقل الشرط.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>تستوفي جميع عناصر Struct الشرط.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>يستوفي ما لا يقل عن <code translate="no">N</code> عنصر من عناصر Struct الشرط.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>يستوفي ما لا يزيد عن <code translate="no">N</code> عن عناصر Struct الشرط.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>يستوفي <code translate="no">N</code> عنصرًا من عناصر Struct بالضبط الشرط.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> ويمكن لكل من <code translate="no">element_filter</code> التعبير عن أن عنصر Struct واحد على الأقل يستوفي الشرط. استخدم <code translate="no">MATCH_ANY</code> عندما تحتاج فقط إلى التصفية على مستوى الصف. استخدم <code translate="no">element_filter</code> عندما تحتاج إلى قيود على مستوى العنصر، مثل تصفية عناصر Struct التي تشارك في البحث المتجهي على مستوى العنصر.</p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> يُقيَّم إلى <code translate="no">true</code> إذا كان عنصر واحد على الأقل في StructArray يستوفي الشرط.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ StructArray فارغ، يُرجع <code translate="no">MATCH_ANY</code> القيمة <code translate="no">false</code>.</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> يُقيَّم إلى <code translate="no">true</code> إذا كان كل عنصر في StructArray يستوفي الشرط.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة إلى StructArray فارغ، تُرجع الدالة <code translate="no">MATCH_ALL</code> القيمة <code translate="no">true</code>.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">تُقيّم MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> يُقيَّم إلى <code translate="no">true</code> إذا كان عدد العناصر التي تستوفي الشرط أكبر من أو يساوي <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ <code translate="no">MATCH_LEAST</code> ، يجب أن يكون <code translate="no">threshold</code> عددًا صحيحًا موجبًا.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> تُحسب قيمتها بـ <code translate="no">true</code> إذا كان عدد العناصر التي تستوفي الشرط أقل من أو يساوي <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ <code translate="no">MATCH_MOST</code> ، يمكن أن يكون <code translate="no">threshold</code> صفرًا أو عددًا صحيحًا موجبًا.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> تُقيَّم إلى <code translate="no">true</code> إذا كان عدد العناصر التي تستوفي الشرط يساوي بالضبط <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ <code translate="no">MATCH_EXACT</code> ، يمكن أن يكون <code translate="no">threshold</code> صفرًا أو عددًا صحيحًا موجبًا.</p>
<h2 id="Supported-predicates" class="common-anchor-header">الشرطيات المدعومة<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>تمثل صيغة <code translate="no">$[...]</code> القيمة القياسية لعنصر Struct الحالي. يعتمد دعم الشرط على نوع الحقل الفرعي القياسي.</p>
<table>
<thead>
<tr><th>نوع الحقل الفرعي</th><th>دعم المسندات على مستوى العنصر</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>المسلمات القياسية مثل <code translate="no">$[has_code] == true</code> أو <code translate="no">!($[has_code] == true)</code>. تجنب التعبيرات المنطقية المجردة مثل <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code></td><td>المقارنة، النطاق المتسلسل، <code translate="no">in</code> ، <code translate="no">not in</code> ، التعبيرات الحسابية التي تحتوي على <code translate="no">+</code> ، <code translate="no">-</code> ، <code translate="no">*</code> ، <code translate="no">/</code> ، أو <code translate="no">%</code> متبوعة بمقارنة، والتركيبات المنطقية.</td></tr>
<tr><td><code translate="no">FLOAT</code>، <code translate="no">DOUBLE</code></td><td>المقارنة، النطاق المتسلسل، <code translate="no">in</code> ، <code translate="no">not in</code> ، التعبيرات الحسابية التي تحتوي على <code translate="no">+</code> ، <code translate="no">-</code> ، <code translate="no">*</code> ، أو <code translate="no">/</code> متبوعة بمقارنة، والتركيبات المنطقية. لا يُدعم عامل التشغيل <code translate="no">%</code> للحقول الفرعية ذات العلامة العائمة.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>مقارنة السلاسل، والنطاق المتسلسل، و <code translate="no">in</code> ، و <code translate="no">not in</code> ، و <code translate="no">like</code> ، و <code translate="no">=~</code> ، و <code translate="no">!~</code> ، والتركيبات المنطقية.</td></tr>
<tr><td>الحقول الفرعية للمتجهات</td><td>غير مدعومة كمدخلات للمسندات القياسية <code translate="no">$[...]</code>. استخدم الحقول الفرعية للمتجهات بدلاً من ذلك من خلال البحث في EmbeddingList أو البحث المتجهي على مستوى العنصر.</td></tr>
</tbody>
</table>
<p>تنطبق العوامل المنطقية مثل <code translate="no">&amp;&amp;</code> و <code translate="no">\|\|</code> و <code translate="no">!</code> على تعبيرات المسندات. على سبيل المثال، اكتب <code translate="no">!($[has_code] == true)</code> بدلاً من <code translate="no">!$[has_code]</code>.</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">المسندات غير المدعومة<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>لا تدعم المسندات على مستوى العناصر <code translate="no">$[...]</code> ما يلي:</p>
<ul>
<li><p>وظائف مطابقة النص، مثل <code translate="no">text_match(field, &quot;...&quot;)</code> أو <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>صيغة مسار JSON، و <code translate="no">exists</code> على مسارات JSON، أو دوال JSON مثل <code translate="no">json_contains</code> أو <code translate="no">json_contains_all</code> أو <code translate="no">json_contains_any</code>.</p></li>
<li><p>دوال حاويات المصفوفات مثل <code translate="no">array_contains</code> أو <code translate="no">array_contains_all</code> أو <code translate="no">array_contains_any</code> أو <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> أو <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>وظائف الهندسة / نظم المعلومات الجغرافية (GIS).</p></li>
<li><p>تعبيرات الطابع الزمني tz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>المسندات المتجهة على مستوى الحقل.</p></li>
<li><p>استدعاءات وظائف التصفية العامة ما لم تدعم توقيعات الوظائف المحددة ومسارات التنفيذ صراحةً المسندات على مستوى عناصر StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">قواعد بناء الجمل<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> أسماء العوامل لا تميز بين الأحرف الكبيرة والصغيرة.</p></li>
<li><p>استخدم <code translate="no">$[subfield]</code> فقط داخل المسندات <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code>.</p></li>
<li><p>لا تستخدم <code translate="no">$[subfield]</code> كمسار JSON أو حاوية صفيف أو مرجع لحقل متجه.</p></li>
<li><p>لا تقم بتداخل <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code> داخل عامل StructArray آخر.</p></li>
<li><p>استخدم <code translate="no">threshold=N</code> المسمى لـ <code translate="no">MATCH_LEAST</code> و <code translate="no">MATCH_MOST</code> و <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> عند استدعاءه على StructArray فارغ، يُرجع <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> عند استدعاءه على StructArray فارغ، يُرجع <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">انظر أيضًا<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a></p></li>
<li><p><a href="/docs/ar/basic-vector-search-with-structarray.md">البحث المتجهي الأساسي باستخدام StructArray</a></p></li>
<li><p><a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a></p></li>
<li><p><a href="/docs/ar/structarray-limits.md">حدود StructArray</a></p></li>
</ul>
