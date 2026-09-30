---
id: struct-array-operators.md
title: مشغلات المصفوفات الهيكليةCompatible with Milvus 3.0.x
summary: >-
  استخدم عوامل تصفية العناصر وعوامل عائلة التطابق لتصفية الحقول الفرعية القياسية
  داخل حقول StructArray.
beta: Milvus 3.0.x
---
<h1 id="StructArray-Operators" class="common-anchor-header">مشغلات المصفوفات الهيكلية<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>تخزن مصفوفة الهياكل، أو StructArray، في كيان ما مجموعة مرتبة من عناصر الهياكل. تشترك كل بنية في المصفوفة في نفس المخطط المحدد مسبقًا، والذي يتألف من حقول فرعية متعددة المتجهات والحقول القياسية. عندما يتم فهرسة حقل فرعي قياسي في Struct، يمكنك استخدام <strong>عوامل تصفية العناصر</strong> <strong>والعوامل في عائلة المطابقة</strong> لإجراء تصفية قياسية عليه.</p>
<p>يقوم عامل تصفية العناصر بتحديد الكيانات التي تحتوي على قيمة واحدة على الأقل في حقل StructArray مطابقة للمسند المحدد. في المقابل، يتم استخدام عوامل تشغيل عائلة المطابقة للعثور على الكيانات التي تحتوي على أعداد أو نسب محددة من القيم في حقل StructArray المطابق للمسند المحدد.</p>
<div class="alert note">
<p>عند إنشاء مسندات مقابل <code translate="no">$[subField]</code> ، تأكد من فهرسة الحقل الفرعي إذا كنت تعمل مع مجموعات بيانات واسعة النطاق، حيث يتطلب هذان العاملان تكرارًا عبر عناصر المصفوفة لكل كيان مرشح.</p>
</div>
<h2 id="Element-filter" class="common-anchor-header">مرشحات العناصر<button data-href="#Element-filter" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم مرشحات العناصر عندما تحتاج إلى التحقق مما إذا كان الكيان يحتوي على القيم التي تطابق مسندًا معينًا في حقل StructArray الخاص به.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>كما هو موضح في تعبير عامل تصفية العناصر أعلاه، يُرجع عامل تصفية العناصر الكيانات التي تحتوي على قطعة واحدة على الأقل تبدأ بـ "أحمر" في الحقل الفرعي <code translate="no">text</code>. المعلمة الأولى هي اسم حقل StructArray، بينما المعلمة الثانية هي المسند الذي ينطبق على الحقل الفرعي Struct.</p>
<p>يمكنك استخدام عوامل المقارنة، والنطاق، والعوامل الحسابية لبناء الشرط، والعوامل المنطقية لربط شروط متعددة، كما هو موضح في <a href="/docs/ar/v2.6.x/basic-operators.md">العوامل الأساسية</a>.</p>
<p>ومع ذلك، عندما تقوم ببناء تعبير مرشح يجمع بين مسند على مستوى الكيان وعامل تصفية عنصر، يجب عليك دائمًا وضع عامل تصفية العنصر في النهاية، كما هو موضح في المثال التالي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Match-family-operators" class="common-anchor-header">عوامل عائلة التطابق<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يعمل عاملا عائلة المطابقة على حقل StructArray أيضًا. بدلًا من التحقق ببساطة من وجود عنصر ما، يمكنك تحديد عدد العناصر (أو النسبة) التي يجب أن تستوفي مسند العنصر.</p>
<ul>
<li><p><a href="/docs/ar/v2.6.x/struct-array-operators.md#MATCHANY"><code translate="no">MATCH_ANY(identifier, predicate)</code></a>: تُرجع الكيانات التي تحتوي على جزء واحد على الأقل يبدأ بـ "أحمر" في الحقل الفرعي <code translate="no">text</code> ؛ من الناحية الدلالية، هذا يعادل <code translate="no">element_filter</code>.</p></li>
<li><p><a href="/docs/ar/v2.6.x/struct-array-operators.md#MATCHALL"><code translate="no">MATCH_ALL(identifier, predicate)</code></a>: تُرجع الكيانات التي تبدأ حقولها الفرعية النصية في جميع القطع ب "أحمر".</p></li>
<li><p><a href="/docs/ar/v2.6.x/struct-array-operators.md#MATCHLEAST"><code translate="no">MATCH_LEAST(identifier, predicate, k)</code></a>: تُرجع الكيانات التي تحتوي على الأقل على <code translate="no">k</code> قطع تبدأ ب "أحمر" في الحقل الفرعي <code translate="no">text</code>.</p></li>
<li><p><a href="/docs/ar/v2.6.x/struct-array-operators.md#MATCHMOST"><code translate="no">MATCH_MOST(identifier, predicate, k)</code></a>: تُرجع الكيانات التي تحتوي على <code translate="no">k</code> على الأكثر على أجزاء تبدأ ب "أحمر" في الحقل الفرعي <code translate="no">text</code>.</p></li>
<li><p><a href="/docs/ar/v2.6.x/struct-array-operators.md#MATCHEXACT"><code translate="no">MATCH_EXACT(identifier, predicate, k)</code></a>:: إرجاع الكيانات التي تحتوي بالضبط على <code translate="no">k</code> القطع التي تبدأ ب "أحمر" في الحقل الفرعي <code translate="no">text</code>.</p></li>
</ul>
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
    </button></h3><p>يُقيّم هذا المشغل على أنه صواب إذا كان عنصر <strong>واحد على الأقل</strong> في المصفوفة يستوفي المسند، مما يشير إلى أن المكافئ الهيكلي للمنطق <code translate="no">OR</code> عبر جميع عناصر المصفوفة.</p>
<p>مشغّلا MATCH_ANY ومرشحات العناصر متماثلان من الناحية الدلالية، ويمكنك استخدامهما بالتبادل. عندما تحتاج إلى التعبير عن المنطق <code translate="no">count(matches) &gt;= 1</code> ، يجب عليك استخدامهما.</p>
<p><strong>مثال:</strong></p>
<p>يقوم المثال التالي بإرجاع الكيانات التي يبدأ أي جزء من المستند فيها بحرف "أحمر".</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>يتم تقييم هذا المشغّل على أنه صواب فقط إذا كان <strong>كل</strong> عنصر في المصفوفة يستوفي المسند.</p>
<p>عندما تحتاج إلى التعبير عن المنطق <code translate="no">count(matches) == total elements</code> ، استخدم هذا المشغّل.</p>
<p><strong>مثال:</strong></p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p>هذا المشغل هو عامل تصفية كمي يقوم بإرجاع صواب إذا كان عدد العناصر التي تستوفي المسند <strong>أكبر من أو يساوي</strong> ثابتًا محددًا <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>عندما تحتاج إلى التعبير عن المنطق <code translate="no">count(matches) &gt;= k</code> ، استخدم هذا العامل.</p>
<p><strong>مثال:</strong></p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>هذا المشغل هو عامل تصفية كمي يقوم بإرجاع صواب إذا كان عدد العناصر التي تستوفي المسند <strong>أقل من أو يساوي</strong> ثابتًا محددًا <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>هذا مفيد بشكل خاص لتصفية الكيانات التي تستهدف كلمة أساسية معينة بشكل مفرط (تقليل الضوضاء).</p>
<p><strong>مثال:</strong></p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>هذا المشغل هو المشغل الكمي الأكثر تقييدًا في العائلة. يُرجع صحيحًا إذا وفقط إذا كان عدد العناصر التي تستوفي المسند هو <strong>بالضبط</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p><strong>مثال:</strong></p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
