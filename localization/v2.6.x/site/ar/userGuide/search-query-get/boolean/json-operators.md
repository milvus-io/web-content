---
id: json-operators.md
title: مشغلات JSON
summary: >-
  تدعم Milvus عوامل تشغيل متقدمة للاستعلام عن حقول JSON وتصفيتها، مما يجعلها
  مثالية لإدارة البيانات المعقدة والمنظمة. تتيح هذه العوامل الاستعلام الفعال
  للغاية عن مستندات JSON، مما يسمح لك باسترداد الكيانات بناءً على عناصر أو قيم
  أو شروط محددة داخل حقول JSON. سيرشدك هذا القسم إلى كيفية استخدام مشغلات JSON
  الخاصة ب JSON في Milvus، مع تقديم أمثلة عملية لتوضيح وظائفها.
---
<h1 id="JSON-Operators" class="common-anchor-header">مشغلات JSON<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>تدعم Milvus مشغلات متقدمة للاستعلام عن حقول JSON وتصفيتها، مما يجعلها مثالية لإدارة البيانات المعقدة والمنظمة. تتيح هذه المشغلات الاستعلام الفعال للغاية عن مستندات JSON، مما يسمح لك باسترداد الكيانات بناءً على عناصر أو قيم أو شروط محددة داخل حقول JSON. سيرشدك هذا القسم إلى كيفية استخدام مشغلي JSON في Milvus، مع تقديم أمثلة عملية لتوضيح وظائفهم.</p>
<div class="alert note">
<p>لا يمكن لحقول JSON التعامل مع البنى المعقدة والمتداخلة وتتعامل مع جميع البنى المتداخلة كسلاسل عادية. ولذلك، عند العمل مع حقول JSON، يُنصح بتجنب التداخل العميق بشكل مفرط والتأكد من أن هياكل البيانات الخاصة بك مسطحة قدر الإمكان لتحقيق الأداء الأمثل.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">معاملات JSON المتاحة<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر ميلفوس العديد من عوامل تشغيل JSON القوية التي تساعد في تصفية بيانات JSON والاستعلام عنها، وهذه العوامل هي</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, expr)</code>: تصفية الكيانات التي يوجد فيها تعبير JSON المحدد داخل الحقل.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code>: يضمن وجود جميع عناصر تعبير JSON المحدد في الحقل.</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code>: يقوم بتصفية الكيانات التي يوجد فيها عنصر واحد على الأقل من تعبير JSON داخل الحقل.</p></li>
</ul>
<p>دعونا نستكشف هذه العوامل مع أمثلة لنرى كيف يمكن تطبيقها في سيناريوهات العالم الحقيقي.</p>
<h2 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>يتحقق المشغل <code translate="no">json_contains</code> مما إذا كان هناك عنصر معين أو مصفوفة فرعية موجودة داخل حقل JSON. يكون مفيدًا عندما تريد التأكد من احتواء مصفوفة أو كائن JSON على قيمة معينة.</p>
<p><strong>مثال</strong></p>
<p>تخيل أن لديك مجموعة من المنتجات، لكل منها حقل <code translate="no">tags</code> يحتوي على مصفوفة JSON من السلاسل، مثل <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. تريد تصفية المنتجات التي تحتوي على العلامة <code translate="no">&quot;sale&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، سيعيد Milvus جميع المنتجات التي يحتوي فيها الحقل <code translate="no">tags</code> على العنصر <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">json_contains_all<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>يضمن المشغل <code translate="no">json_contains_all</code> وجود جميع عناصر تعبير JSON المحدد في الحقل الهدف. وهو مفيد بشكل خاص عندما تحتاج إلى مطابقة قيم متعددة داخل مصفوفة JSON.</p>
<p><strong>مثال</strong></p>
<p>استمرارًا لسيناريو علامات المنتج، إذا كنت تريد العثور على جميع المنتجات التي تحتوي على العلامات <code translate="no">&quot;electronics&quot;</code> و <code translate="no">&quot;sale&quot;</code> و <code translate="no">&quot;new&quot;</code> ، يمكنك استخدام المشغّل <code translate="no">json_contains_all</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيعيد هذا الاستعلام جميع المنتجات حيث تحتوي المصفوفة <code translate="no">tags</code> على العناصر الثلاثة المحددة: <code translate="no">&quot;electronics&quot;</code> و <code translate="no">&quot;sale&quot;</code> و <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">json_contains_any<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغل <code translate="no">json_contains_any</code> بتصفية الكيانات التي يوجد فيها عضو واحد على الأقل من تعبير JSON داخل الحقل. يكون هذا مفيدًا عندما تريد مطابقة الكيانات بناءً على أي قيمة من عدة قيم ممكنة.</p>
<p><strong>مثال</strong></p>
<p>لنفترض أنك تريد تصفية المنتجات التي تحتوي على واحدة على الأقل من العلامات <code translate="no">&quot;electronics&quot;</code> أو <code translate="no">&quot;sale&quot;</code> أو <code translate="no">&quot;new&quot;</code>. يمكنك استخدام المشغل <code translate="no">json_contains_any</code> لتحقيق ذلك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذه الحالة، سيعيد Milvus جميع المنتجات التي تحتوي على واحدة على الأقل من العلامات في القائمة <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. حتى إذا كان المنتج يحتوي على إحدى هذه العلامات فقط، فسيتم تضمينه في النتيجة.</p>
