---
id: array-operators.md
title: مشغلات المصفوفات
summary: توفر Milvus مشغلات ARRAY لتصفية حقول ARRAY وتحديث قيم حقول ARRAY جزئيًا.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">مشغلات المصفوفات<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر Milvus مشغلات ARRAY لتصفية حقول ARRAY وتحديث قيم حقول ARRAY جزئيًا.</p>
<div class="alert note">
<p>يجب أن تكون جميع العناصر داخل المصفوفة من نفس النوع، ويتم التعامل مع الهياكل المتداخلة داخل المصفوفات على أنها سلاسل نصية عادية. لذلك، عند العمل مع حقول المصفوفات، يُنصح بتجنب التداخل المفرط والتأكد من أن هياكل البيانات الخاصة بك مسطحة قدر الإمكان لتحقيق الأداء الأمثل.</p>
</div>
<p>تغطي مشغلات المصفوفات في Milvus سيناريوهين للاستخدام:</p>
<ul>
<li><p>تعبيرات التصفية للاستعلام والبحث.</p></li>
<li><p>التحديثات الجزئية في طلبات « <code translate="no">upsert</code> ».</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">مشغلات ARRAY المتاحة<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي عوامل ARRAY المتاحة في Milvus.</p>
<table>
<thead>
<tr><th>المُشغِّل</th><th>الاستخدام في</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(المعرف، التعبير)</a></td><td>تعبير التصفية</td><td>يتحقق من وجود عنصر معين في حقل ARRAY.</td></tr>
<tr><td><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(المعرف، التعبير)</a></td><td>تعبير التصفية</td><td>يتحقق مما إذا كانت جميع العناصر الموجودة في قائمة محددة موجودة في حقل ARRAY.</td></tr>
<tr><td><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(المعرف، التعبير)</a></td><td>تعبير التصفية</td><td>يتحقق مما إذا كان أي عنصر في قائمة محددة موجودًا في حقل ARRAY.</td></tr>
<tr><td><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(المعرف)</a></td><td>تعبير التصفية</td><td>تُرجع عدد العناصر الموجودة في حقل ARRAY ويمكن دمجها مع عوامل المقارنة لأغراض التصفية.</td></tr>
<tr><td><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> مع <code translate="no">field_ops</code></td><td>يُضيف عناصر الحمولة إلى حقل ARRAY موجود. متوفر في Milvus الإصدار 2.6.17 والإصدارات الأحدث.</td></tr>
<tr><td><a href="/docs/ar/v2.6.x/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> مع <code translate="no">field_ops</code></td><td>يزيل كل عنصر من حقل ARRAY موجود يتطابق مع قيمة في حمولة الطلب. متوفر في Milvus الإصدار 2.6.17 والإصدارات الأحدث.</td></tr>
</tbody>
</table>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم عامل التشغيل « <code translate="no">ARRAY_CONTAINS</code> » بالتحقق من وجود عنصر معين في حقل صفيف. وهو مفيد عندما تريد العثور على الكيانات التي يحتوي صفيفها على عنصر معين.</p>
<p><strong>مثال</strong></p>
<p>لنفترض أن لديك حقل صفيف <code translate="no">history_temperatures</code> ، الذي يحتوي على أدنى درجات الحرارة المسجلة لسنوات مختلفة. للعثور على جميع الكيانات التي يحتوي صفيفها على القيمة <code translate="no">23</code> ، يمكنك استخدام تعبير التصفية التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إرجاع جميع الكيانات التي يحتوي فيها المصفوف « <code translate="no">history_temperatures</code> » على القيمة « <code translate="no">23</code> ».</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>يضمن عامل التشغيل <code translate="no">ARRAY_CONTAINS_ALL</code> وجود جميع عناصر القائمة المحددة في حقل المصفوفة. ويُعد هذا العامل مفيدًا عندما تريد مطابقة الكيانات التي تحتوي على قيم متعددة في المصفوفة.</p>
<p><strong>مثال</strong></p>
<p>إذا كنت تريد العثور على جميع الكيانات التي يحتوي مصفوفة <code translate="no">history_temperatures</code> فيها على كل من <code translate="no">23</code> و <code translate="no">24</code> ، فيمكنك استخدام:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إرجاع جميع الكيانات التي يحتوي فيها المصفوف <code translate="no">history_temperatures</code> على كلتا القيمتين المحددتين.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>يتحقق عامل التشغيل <code translate="no">ARRAY_CONTAINS_ANY</code> من وجود أي عنصر من العناصر الموجودة في القائمة المحددة في حقل المصفوفة. ويكون هذا مفيدًا عندما تريد مطابقة الكيانات التي تحتوي على قيمة واحدة على الأقل من القيم المحددة في المصفوفة.</p>
<p><strong>مثال</strong></p>
<p>للعثور على جميع الكيانات التي يحتوي مصفوفة <code translate="no">history_temperatures</code> فيها على إما <code translate="no">23</code> أو <code translate="no">24</code> ، يمكنك استخدام:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إرجاع جميع الكيانات التي يحتوي فيها المصفوف <code translate="no">history_temperatures</code> على قيمة واحدة على الأقل من القيم <code translate="no">23</code> أو <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>تُرجع دالة <code translate="no">ARRAY_LENGTH</code> طول (عدد عناصر) حقل المصفوفة. وهي تقبل معلمة واحدة فقط: معرف حقل المصفوفة.</p>
<p><strong>مثال</strong></p>
<p>للعثور على جميع الكيانات التي يحتوي فيها المصفوفة <code translate="no">history_temperatures</code> على أقل من 10 عناصر:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>سيُرجع هذا جميع الكيانات التي يحتوي مصفوفة <code translate="no">history_temperatures</code> الخاصة بها على أقل من 10 عناصر.</p>
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم عامل التشغيل <code translate="no">ARRAY_APPEND</code> بإلحاق عناصر الحمولة بحقل ARRAY موجود أثناء طلب <code translate="no">upsert</code>. وهو ليس تعبير تصفية. استخدمه عندما تريد إضافة قيم إلى مصفوفة دون الاستعلام أولاً عن قيمة المصفوفة الحالية.</p>
<p>يضيف المثال التالي بلغة Python <code translate="no">&quot;premium&quot;</code> إلى حقل ARRAY الخاص بـ <code translate="no">tags</code> للكيان الذي يكون مفتاحه الأساسي هو <code translate="no">1</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي إرفاق <code translate="no">ARRAY_APPEND</code> بحقل عبر <code translate="no">field_ops</code> إلى تمكين دلالات التحديث الجزئي لهذا الحقل. للاطلاع على سير العمل الكامل وأنواع العناصر المدعومة والحدود، راجع <a href="/docs/ar/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">«حقول ARRAY في Upsert باستخدام عوامل التحديث الجزئي</a>».</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم عامل " <code translate="no">ARRAY_REMOVE</code> " بإزالة كل عنصر من حقل ARRAY موجود يطابق قيمة في حمولة الطلب أثناء طلب " <code translate="no">upsert</code> ". وهو ليس تعبير تصفية. استخدمه عندما تريد إزالة القيم المطابقة من المصفوفة دون الاستعلام أولاً عن قيمة المصفوفة الحالية.</p>
<p>يزيل المثال التالي بلغة Python <code translate="no">&quot;trial&quot;</code> من حقل ARRAY الخاص بـ <code translate="no">tags</code> للكيان الذي يكون مفتاحه الأساسي هو <code translate="no">1</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>يؤدي ربط <code translate="no">ARRAY_REMOVE</code> بحقل عبر <code translate="no">field_ops</code> إلى تمكين دلالات التحديث الجزئي لهذا الحقل. للاطلاع على سير العمل الكامل وأنواع العناصر المدعومة والحدود، راجع <a href="/docs/ar/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">حقول ARRAY</a> في <a href="/docs/ar/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">Upsert مع مشغلات التحديث الجزئي</a>.</p>
