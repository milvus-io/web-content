---
id: json-operators.md
title: مشغلات JSON
summary: >-
  يدعم Milvus عوامل التشغيل المتقدمة لاستعلام حقول JSON وتصفيتها، مما يجعلها
  مثالية لإدارة البيانات المعقدة والمنظمة. تتيح هذه العوامل إجراء استعلامات
  فعالة للغاية على مستندات JSON، مما يسمح لك باسترداد الكيانات بناءً على عناصر
  أو قيم أو شروط محددة داخل حقول JSON. سيوجهك هذا القسم إلى كيفية استخدام
  العوامل الخاصة بـ JSON في Milvus، مع تقديم أمثلة عملية لتوضيح وظائفها.
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
    </button></h1><p>يدعم Milvus عوامل تشغيل متقدمة لاستعلام حقول JSON وتصفيتها، مما يجعلها مثالية لإدارة البيانات المعقدة والمنظمة. تتيح هذه العوامل إجراء استعلامات فعالة للغاية على مستندات JSON، مما يسمح لك باسترداد الكيانات بناءً على عناصر أو قيم أو شروط محددة داخل حقول JSON. سيوجهك هذا القسم إلى كيفية استخدام عوامل JSON المحددة في Milvus، مع تقديم أمثلة عملية لتوضيح وظائفها.</p>
<div class="alert note">
<p>لا تستطيع حقول JSON التعامل مع الهياكل المعقدة والمتداخلة، وتتعامل مع جميع الهياكل المتداخلة على أنها سلاسل نصية عادية. لذلك، عند العمل مع حقول JSON، يُنصح بتجنب التداخل المفرط والتأكد من أن هياكل البيانات الخاصة بك مسطحة قدر الإمكان لتحقيق الأداء الأمثل.</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">عوامل JSON المتاحة<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus العديد من عوامل التشغيل القوية الخاصة بـ JSON التي تساعد في تصفية بيانات JSON والاستعلام عنها، وهذه العوامل هي:</p>
<ul>
<li><p><a href="#JSONCONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: يقوم بتصفية الكيانات التي يوجد فيها التعبير JSON المحدد داخل الحقل.</p></li>
<li><p><a href="#JSONCONTAINSALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: يضمن وجود جميع عناصر تعبير JSON المحدد في الحقل.</p></li>
<li><p><a href="#JSONCONTAINSANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: يقوم بتصفية الكيانات التي يوجد فيها عضو واحد على الأقل من تعبير JSON داخل الحقل.</p></li>
</ul>
<p>دعونا نستكشف هذه العوامل باستخدام أمثلة لنرى كيف يمكن تطبيقها في سيناريوهات واقعية.</p>
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
    </button></h2><p>يتحقق عامل التشغيل <code translate="no">json_contains</code> من وجود عنصر أو مصفوفة فرعية محددة داخل حقل JSON. وهو مفيد عندما تريد التأكد من أن مصفوفة أو كائن JSON يحتوي على قيمة معينة.</p>
<p><strong>مثال</strong></p>
<p>تخيل أن لديك مجموعة من المنتجات، يحتوي كل منها على حقل <code translate="no">tags</code> الذي يتضمن مصفوفة JSON من السلاسل، مثل <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. وتريد تصفية المنتجات التي تحتوي على العلامة <code translate="no">&quot;sale&quot;</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains(product[\&quot;tags\&quot;], \&quot;sale\&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، سيعرض Milvus جميع المنتجات التي يحتوي حقل <code translate="no">tags</code> فيها على العنصر <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>يضمن عامل <code translate="no">json_contains_all</code> وجود جميع عناصر تعبير JSON المحدد في الحقل المستهدف. وهو مفيد بشكل خاص عندما تحتاج إلى مطابقة قيم متعددة داخل مصفوفة JSON.</p>
<p><strong>مثال</strong></p>
<p>استكمالًا لسيناريو علامات المنتجات، إذا كنت تريد العثور على جميع المنتجات التي تحتوي على العلامات <code translate="no">&quot;electronics&quot;</code> و <code translate="no">&quot;sale&quot;</code> و <code translate="no">&quot;new&quot;</code> ، فيمكنك استخدام عامل التشغيل <code translate="no">json_contains_all</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_all(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;sale\&quot;, \&quot;new\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيُرجع هذا الاستعلام جميع المنتجات التي يحتوي فيها المصفوفة <code translate="no">tags</code> على العناصر الثلاثة المحددة: <code translate="no">&quot;electronics&quot;</code> و <code translate="no">&quot;sale&quot;</code> و <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">JSON_CONTAINS_ANY<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم عامل <code translate="no">json_contains_any</code> بتصفية الكيانات التي يحتوي الحقل فيها على عنصر واحد على الأقل من تعبير JSON. وهذا مفيد عندما تريد مطابقة الكيانات بناءً على أي قيمة واحدة من بين عدة قيم محتملة.</p>
<p><strong>مثال</strong></p>
<p>لنفترض أنك تريد تصفية المنتجات التي تحتوي على علامة واحدة على الأقل من العلامات التالية: <code translate="no">&quot;electronics&quot;</code> ، أو <code translate="no">&quot;sale&quot;</code> ، أو <code translate="no">&quot;new&quot;</code>. يمكنك استخدام عامل <code translate="no">json_contains_any</code> لتحقيق ذلك.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter := <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
std::string filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;json_contains_any(product[\&quot;tags\&quot;], [\&quot;electronics\&quot;, \&quot;new\&quot;, \&quot;clearance\&quot;])&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
filter=<span class="hljs-string">&#x27;json_contains_any(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>في هذه الحالة، سيعرض Milvus جميع المنتجات التي تحتوي على علامة واحدة على الأقل من العلامات الموجودة في القائمة <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. حتى لو كان المنتج يحتوي على علامة واحدة فقط من هذه العلامات، فسيتم تضمينه في النتيجة.</p>
