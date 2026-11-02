---
id: struct-array-operators.md
title: مشغلات StructArray
summary: >-
  تقوم مشغلات StructArray بتصفية الكيانات من خلال تقييم المسلسلات المنطقية على
  الحقول الفرعية القياسية داخل حقل StructArray. استخدم هذه الصفحة كمرجع لصيغة
  العناصر التالية: element_filter، ومجموعة مشغلات MATCH_*، والمسلسلات المنطقية
  على مستوى الصفوف في مسارات StructArray.
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
    </button></h1><p>تقوم مشغلات StructArray بتصفية الكيانات من خلال تقييم المسندات على الحقول الفرعية القياسية داخل حقل StructArray. استخدم هذه الصفحة كمرجع لصيغة <code translate="no">element_filter</code> ، ومجموعة مشغلات <code translate="no">MATCH_*</code> ، والمسندات على مستوى الصفوف في مسارات StructArray.</p>
<p>يحتوي تصفية StructArray على مجموعتين من العوامل ومجموعة من المسندات على مستوى الصف للمسارات:</p>
<table>
<thead>
<tr><th>نموذج التصفية</th><th>الغرض الرئيسي</th><th>سلوك النتيجة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>مطابقة عناصر Struct التي تستوفي شرطًا قياسيًا.</td><td>في البحث على مستوى العناصر، يمكن أن تتضمن النتائج المطابقة إزاحات العناصر. في الاستعلام على مستوى الصفوف أو البحث المُصفى، يعتمد شكل النتيجة على واجهة برمجة التطبيقات (API) وحقول الإخراج.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>تحديد الكيانات بناءً على عدد عناصر Struct التي تستوفي شرطًا قياسيًا.</td><td>التصفية على مستوى الصفوف. لا تُرجع هذه العوامل إزاحات العناصر من تلقاء نفسها.</td></tr>
<tr><td>شروط المسار على مستوى الصف</td><td>اختبر موضع عنصر واحد، أو احسب عناصر Struct، أو اختبر قيم الحقول الفرعية عبر العناصر بدون شرط " <code translate="no">$[...]</code> ".</td><td>التصفية على مستوى الصف. لا تُرجع هذه المسندات إزاحات العناصر.</td></tr>
</tbody>
</table>
<p>استخدم الحقول الفرعية القياسية في مشغلات StructArray. تُستخدم الحقول الفرعية المتجهة في مسارات البحث المتجهة ولا تُعد مدخلات للمسلّطات القياسية.</p>
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
    </button></h2><p>اختر عاملًا وفقًا لهدف التصفية:</p>
<table>
<thead>
<tr><th>الهدف</th><th>الاستخدام</th></tr>
</thead>
<tbody>
<tr><td>تقييد البحث المتجهي على مستوى العناصر ليقتصر على العناصر التي تتطابق مع الشروط القياسية.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>مطابقة شروط قياسية متعددة داخل نفس عنصر Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>إرجاع الكيانات التي يفي فيها عنصر Struct واحد على الأقل بشرط ما فقط.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>إرجاع الكيانات التي تستوفي جميع عناصر Struct فيها شرطًا ما فقط.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>إرجاع الكيانات التي يستوفي فيها عدد من عناصر Struct يساوي «على الأقل» أو «على الأكثر» أو «بالضبط» <code translate="no">N</code> شرطًا ما.</td><td><code translate="no">MATCH_LEAST</code>، <code translate="no">MATCH_MOST</code> ، أو <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>التحقق من عنصر Struct في موضع محدد، مثل الجزء الأول.</td><td>مسار موضعي مثل <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>التصفية حسب عدد عناصر Struct في كيان ما.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>تحقق مما إذا كان أي عنصر من عناصر Struct يحتوي على قيمة حقل فرعي، دون الجمع بين الشروط على نفس العنصر.</td><td><code translate="no">array_contains</code>، <code translate="no">array_contains_any</code> ، أو <code translate="no">array_contains_all</code> على مسار حقل فرعي مثل <code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">بيانات أمثلة<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>تُظهر أمثلة الكيانات الجزئية التالية حقول <code translate="no">chunks</code> فقط <strong>للكيان A</strong> <strong>والكيان B</strong>. وهي ليست حمولات إدراج كاملة.</p>
<p><strong>الكيان أ</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>الكيان ب</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
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
<p>داخل المسند، استخدم <code translate="no">$[subfield]</code> للإشارة إلى حقل فرعي قياسي لعنصر Struct الحالي.</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>يتطابق كل من الكيان أ والكيان ب: جميع العناصر السبعة المعروضة لها <code translate="no">section</code> مضبوطة على <code translate="no">&quot;index&quot;</code>.</p>
<p>عند استخدام شروط متعددة داخل المسند، تنطبق جميع إشارات <code translate="no">$[subfield]</code> على نفس عنصر Struct:</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>الكيان B هو الوحيد الذي يتطابق: حيث تستوفي عناصره الثلاثة كلا الشرطين.</p>
<p>عند دمج مسند على مستوى الكيان مع <code translate="no">element_filter</code> ، ضع <code translate="no">element_filter</code> في نهاية التعبير:</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>يوضح مثال <code translate="no">category</code> ترتيب التعبير بشكل مستقل عن بيانات المثال، التي لا تحدد <code translate="no">category</code>.</p>
<p><code translate="no">element_filter</code> يمكن أن يظهر مرة واحدة فقط في تعبير التصفية. لا تقم بتداخل <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code> داخل <code translate="no">element_filter</code> آخر.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">عوامل عائلة المطابقة<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم عوامل « <code translate="no">MATCH_*</code> » عندما يتعين تحديد كيان بناءً على عدد عناصر «Struct» التي تستوفي شرطًا ما. وللعوامل المعاني التالية:</p>
<table>
<thead>
<tr><th>المُشغِّل</th><th>المعنى</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>يستوفي عنصر Struct واحد على الأقل الشرط.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>تستوفي جميع عناصر Struct الشرط.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>يستوفي ما لا يقل عن <code translate="no">N</code> من عناصر Struct الشرط.</td></tr>
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
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>يتطابق كل من الكيان A والكيان B لأن كلاً منهما يحتوي على عنصر واحد على الأقل مع تعيين <code translate="no">section</code> إلى <code translate="no">&quot;index&quot;</code>.</p>
<p>بالنسبة لمصفوفة StructArray فارغة، تُرجع قيمة <code translate="no">MATCH_ANY</code> النتيجة <code translate="no">false</code>.</p>
<h3 id="MATCHALL" class="common-anchor-header">يُقيَّم MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> تُقيَّم إلى <code translate="no">true</code> إذا كان كل عنصر في StructArray يستوفي الشرط.</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>يتطابق كل من الكيان A والكيان B لأن كل عنصر معروض له <code translate="no">has_code</code> مضبوط على <code translate="no">true</code>.</p>
<p>بالنسبة لـ StructArray فارغ، تُرجع <code translate="no">MATCH_ALL</code> القيمة <code translate="no">true</code>.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">يُقيَّم MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> تُقيَّم بقيمة <code translate="no">true</code> إذا كان عدد العناصر التي تستوفي الشرط أكبر من أو يساوي <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>الكيان B هو الوحيد المطابق: الكيان A لا يحتوي على أي عناصر مؤهلة، بينما يحتوي الكيان B على ثلاثة عناصر.</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> تُقيَّم بقيمة <code translate="no">true</code> إذا كان عدد العناصر التي تستوفي الشرط أقل من أو يساوي <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>لا يتطابق أي من الكيانين: يحتوي الكيان A على أربعة عناصر مؤهلة، بينما يحتوي الكيان B على ثلاثة.</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> تُقيَّم بقيمة <code translate="no">true</code> إذا كان عدد العناصر التي تستوفي الشرط يساوي بالضبط <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>لا يتطابق أي من الكيانين لأن كلاهما لا يحتوي على عنصر يكون فيه <code translate="no">section</code> مسمّى بـ <code translate="no">&quot;filter&quot;</code>.</p>
<p>بالنسبة لـ <code translate="no">MATCH_EXACT</code> ، يمكن أن تكون <code translate="no">threshold</code> صفرًا أو عددًا صحيحًا موجبًا.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">المسندات على مستوى الصف في مسارات StructArray<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>بالإضافة إلى <code translate="no">element_filter</code> و <code translate="no">MATCH_*</code> ، يمكن لتعبير التصفية العادي الإشارة إلى حقل StructArray أو أحد حقوله الفرعية القياسية مباشرةً. يتم تقييم هذه المسندات على مستوى الكيان ولا تُرجع إزاحات العناصر.</p>
<h3 id="Subfield-access" class="common-anchor-header">الوصول إلى الحقول الفرعية<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">الوصول إلى عنصر Struct حسب الموضع</h4><p>استخدم <code translate="no">structArrayField[index][subfield]</code> للإشارة إلى حقل فرعي سكالي واحد لعنصر Struct في موضع يبدأ من الصفر. اكتب الموضع أولاً، ثم اسم الحقل الفرعي. المسار المعكوس <code translate="no">chunks[quality_score][0] &gt; 0.8</code> غير صالح.</p>
<p>على سبيل المثال، اختبر درجة جودة العنصر الأول:</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>الكيان B هو الوحيد الذي يطابق هذا التعبير.</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة للكيان A والكيان B، يتطابق مسند القسم الأول مع كلا الكيانين، بينما يتطابق مسند النتيجة الثاني مع الكيان B فقط، ولا يتطابق نطاق النتيجة الصارم مع أي منهما. يُعد مسند <code translate="no">page</code> مثالًا عامًا؛ ولا تحدد البيانات المثالية <code translate="no">page</code>.</p>
<p>تدعم المسارات الموضعية المقارنة، و <code translate="no">in</code> ، و <code translate="no">not in</code> ، ومسندات النطاق المتسلسلة على الحقول الفرعية القياسية. لا تتطابق الكيانات عندما لا يحتوي حقل StructArray الخاص بها على عنصر في ذلك الموضع.</p>
<h3 id="ARRAY-operators" class="common-anchor-header">مشغلات ARRAY<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">عدد عناصر Struct</h4><p>استخدم <code translate="no">array_length(structArrayField)</code> للتصفية حسب عدد عناصر Struct في الكيان. يُرجع <code translate="no">array_length</code> على مسار حقل فرعي، مثل <code translate="no">array_length(chunks[section])</code> ، نفس العدد، لأن كل حقل فرعي يحتوي على قيمة واحدة لكل عنصر Struct.</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>تتطابق شروط العد الخاصة بالحقل الأصلي مع كلا الكيانين في حالة <code translate="no">&gt;= 3</code> ، ولا تتطابق مع أي منهما في حالة <code translate="no">== 1</code>. يمكنك أيضًا حساب القيم في مسار حقل فرعي:</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>يتطابق الكيان B فقط لأن الحقل الفرعي <code translate="no">quality_score</code> الخاص به يحتوي على ثلاث قيم.</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">اختبار قيم الحقول الفرعية عبر العناصر</h4><p>على سبيل المثال، اختبر ما إذا كانت أي درجة جودة تساوي <code translate="no">0.74</code>:</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>الكيان A هو الوحيد الذي يتطابق.</p>
<p>استخدم <code translate="no">array_contains</code> أو <code translate="no">array_contains_any</code> أو <code translate="no">array_contains_all</code> على مسار حقل فرعي قياسي لاختبار قيم هذا الحقل الفرعي عبر جميع عناصر Struct في الكيان. يتم تقييم كل مسار حقل فرعي على حدة، لذا يمكن أن تستوفي عناصر Struct المختلفة الشروط الموضوعة على الحقول الفرعية المختلفة.</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لبيانات المثال، تتطابق تعبيرات <code translate="no">array_contains</code> و <code translate="no">array_contains_any</code> مع كلا الكيانين. أما تعبير <code translate="no">array_contains_all</code> فلا يتطابق مع أي منهما لأن أياً من الكيانين لا يحتوي على قسم <code translate="no">&quot;search&quot;</code>. لا توضح هذه الأمثلة الشروط التي تستوفيها عناصر مختلفة في حقول فرعية مختلفة.</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> يختار نفس الكيانات مثل <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. استخدم <code translate="no">MATCH_*</code> أو <code translate="no">element_filter</code> عندما يجب استيفاء عدة شروط لنفس عنصر Struct، لأن المسندات <code translate="no">$[...]</code> يتم تقييمها لكل عنصر على حدة.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">اختبار ما إذا كان حقل StructArray القابل للقيمة الفارغة (nullable) هو قيمة فارغة<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">IS NULL</code> أو <code translate="no">IS NOT NULL</code> على حقل StructArray قابل للقيمة NULL لاختبار قيمة الحقل بالكامل. تنطبق القيمة NULL على حقل StructArray بأكمله، لذا تقبل هذه المسندات اسم الحقل فقط، وليس مسار حقل فرعي.</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>لمعرفة قابلية التطبيق، راجع <a href="/docs/ar/structarray-limits.md#Nullable-and-dynamic-schema-limits">حدود المخططات القابلة للقيمة null والديناميكية</a>. يحتوي كل من الكيان A والكيان B على قيم StructArray غير NULL.</p>
<h2 id="Supported-predicates" class="common-anchor-header">المسندات المدعومة<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>تمثل صيغة « <code translate="no">$[...]</code> » القيمة العددية لعنصر Struct الحالي. يعتمد دعم المسندات على نوع الحقل الفرعي العددي:</p>
<table>
<thead>
<tr><th>نوع الحقل الفرعي</th><th>دعم المسندات على مستوى العنصر</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>المسندات القياسية مثل <code translate="no">$[has_code] == true</code> أو <code translate="no">!($[has_code] == true)</code>. تجنب التعبيرات المنطقية المجردة مثل <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>، <code translate="no">INT16</code> ، <code translate="no">INT32</code> ، <code translate="no">INT64</code></td><td>المقارنة، والنطاق المتسلسل، و <code translate="no">in</code> ، و <code translate="no">not in</code> ، والتعبيرات الحسابية التي تحتوي على <code translate="no">+</code> ، و <code translate="no">-</code> ، و <code translate="no">*</code> ، و <code translate="no">/</code> ، أو <code translate="no">%</code> متبوعة بمقارنة، والتركيبات المنطقية.</td></tr>
<tr><td><code translate="no">FLOAT</code>، <code translate="no">DOUBLE</code></td><td>المقارنة، والنطاق المتسلسل، و <code translate="no">in</code> ، و <code translate="no">not in</code> ، والتعبيرات الحسابية التي تحتوي على <code translate="no">+</code> ، أو <code translate="no">-</code> ، أو <code translate="no">*</code> ، أو <code translate="no">/</code> متبوعة بمقارنة، والتركيبات المنطقية. لا يُدعم عامل التشغيل <code translate="no">%</code> للحقول الفرعية ذات العلامة العائمة.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>مقارنة السلاسل، والنطاق المتسلسل، و <code translate="no">in</code> ، و <code translate="no">not in</code> ، و <code translate="no">like</code> ، و <code translate="no">=~</code> ، و <code translate="no">!~</code> ، والتركيبات المنطقية.</td></tr>
<tr><td>الحقول الفرعية للمتجهات</td><td>غير مدعومة كمدخلات للمسندات القياسية <code translate="no">$[...]</code>. استخدم الحقول الفرعية للمتجهات بدلاً من ذلك من خلال البحث في EmbeddingList أو البحث المتجهي على مستوى العنصر.</td></tr>
</tbody>
</table>
<p>تنطبق العوامل المنطقية مثل <code translate="no">&amp;&amp;</code> و <code translate="no">||</code> و <code translate="no">!</code> على تعبيرات المسندات. على سبيل المثال، اكتب <code translate="no">!($[has_code] == true)</code> بدلاً من <code translate="no">!$[has_code]</code>.</p>
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
<li><p>بناء جملة مسار JSON، و <code translate="no">exists</code> على مسارات JSON، أو دوال JSON مثل <code translate="no">json_contains</code> أو <code translate="no">json_contains_all</code> أو <code translate="no">json_contains_any</code>.</p></li>
<li><p>دوال حاويات المصفوفات مثل <code translate="no">array_contains</code> أو <code translate="no">array_contains_all</code> أو <code translate="no">array_contains_any</code> أو <code translate="no">array_length</code> على <code translate="no">$[subfield]</code>. استخدم هذه الدوال بدلاً من ذلك على مسار حقل فرعي مثل <code translate="no">chunks[section]</code> في مسند على مستوى الصف.</p></li>
<li><p><code translate="no">$[subfield] is null</code> أو <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>وظائف الهندسة / نظم المعلومات الجغرافية.</p></li>
<li><p>تعبيرات الطابع الزمني tz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>المسندات المتجهة على مستوى الحقل.</p></li>
<li><p>استدعاءات وظائف التصفية العامة ما لم تدعم توقيعات الوظائف المحددة ومسارات التنفيذ صراحةً المسندات على مستوى عناصر StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">قواعد بناء الجملة<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>اتبع قواعد بناء الجملة التالية:</p>
<ul>
<li><p><code translate="no">MATCH_*</code> أسماء المشغلات لا تميز بين الأحرف الكبيرة والصغيرة.</p></li>
<li><p>استخدم <code translate="no">$[subfield]</code> فقط داخل المسندات <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code>. على سبيل المثال، يتم رفض <code translate="no">array_length($[section])</code>.</p></li>
<li><p>لا تستخدم <code translate="no">$[subfield]</code> كمسار JSON أو حاوية صفيف أو مرجع حقل متجه.</p></li>
<li><p>لا تقم بتداخل <code translate="no">element_filter</code> أو <code translate="no">MATCH_*</code> داخل مشغل StructArray آخر.</p></li>
<li><p>استخدم <code translate="no">threshold=N</code> المسمى لـ <code translate="no">MATCH_LEAST</code> و <code translate="no">MATCH_MOST</code> و <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p>في المسارات الموضعية، اكتب موضع العنصر قبل اسم الحقل الفرعي: <code translate="no">chunks[0][section]</code> ، وليس <code translate="no">chunks[section][0]</code>.</p></li>
<li><p>استخدم <code translate="no">IS NULL</code> و <code translate="no">IS NOT NULL</code> فقط على حقل StructArray بأكمله، مثل <code translate="no">chunks is null</code>. لا تستخدمهما في مسار حقل فرعي مثل <code translate="no">chunks[section]</code> أو في <code translate="no">$[subfield]</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> على StructArray فارغ يُرجع <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> عند استخدامها على StructArray فارغ، تُرجع <code translate="no">true</code>.</p></li>
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
    </button></h2><p>للحصول على إرشادات ذات صلة، انظر:</p>
<ul>
<li><p><a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a></p></li>
<li><p><a href="/docs/ar/basic-vector-search-with-structarray.md">البحث المتجهي الأساسي باستخدام StructArray</a></p></li>
<li><p><a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a></p></li>
<li><p><a href="/docs/ar/structarray-limits.md">حدود StructArray</a></p></li>
</ul>
