---
id: pattern-matching.md
title: مطابقة الأنماط
summary: >-
  يدعم Milvus مطابقة أنماط السلاسل باستخدام أنماط الأحرف البدلية LIKE والتعبيرات
  النمطية RE2. استخدم مرشحات الأنماط لمطابقة البادئات واللواحق والسلاسل الفرعية
  والرموز المنظمة ومجالات البريد الإلكتروني ومسارات عناوين URL وأنماط السلاسل
  الأخرى في حقول VARCHAR أو مسارات سلاسل JSON أو عناصر ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">مطابقة الأنماط<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>في تطبيقات البحث التفاعلي، غالبًا ما يكمل كل من البحث المتجه ومطابقة الأنماط على غرار grep بعضهما البعض. يسترد البحث المتجه الكيانات ذات الصلة من الناحية الدلالية، بينما تضيق مطابقة الأنماط نطاق تلك النتائج بناءً على هياكل سلاسل نصية محددة، مثل رموز الأخطاء، أو بادئات السجلات، أو نطاقات البريد الإلكتروني، أو مسارات عناوين URL، أو المعرفات.</p>
<p>في Milvus، يمكنك التعبير عن قيود الأنماط هذه في مرشحات قياسية باستخدام <code translate="no">LIKE</code> لمطابقة أحرف البدل البسيطة، و <code translate="no">=~</code> أو <code translate="no">!~</code> للتعبيرات العادية <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. يمكنك دمج هذه المرشحات مع <code translate="no">query</code> أو <code translate="no">search</code> أو البحث الهجين.</p>
<p>تُكتب تعبيرات مطابقة الأنماط في المعلمة <code translate="no">filter</code>. على سبيل المثال، يطابق الاستعلام التالي رسائل السجل التي تحتوي على رمز خطأ مثل <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>تركز الأمثلة الواردة في هذه الصفحة على التعبير المخصص لـ <code translate="no">filter</code>. يمكنك استخدام نفس صيغة تعبير المرشح في عمليات Milvus التي تقبل مرشحًا قياسيًا، مثل <code translate="no">query</code> و <code translate="no">search</code> والبحث الهجين.</p>
<h2 id="Supported-field-types" class="common-anchor-header">أنواع الحقول المدعومة<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>تتوفر مطابقة الأنماط للقيم النصية.</p>
<table>
<thead>
<tr><th>الهدف</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> الحقل</td><td>نعم</td><td>نعم</td><td>الهدف النموذجي لمطابقة الأنماط في حقول السلسلة.</td></tr>
<tr><td><code translate="no">JSON</code> مسار مع نوع التحويل <code translate="no">VARCHAR</code> </td><td>نعم</td><td>نعم</td><td>يجب أن تكون قيمة مسار JSON سلسلة نصية للحصول على مطابقات إيجابية. إذا قمت بإنشاء فهرس على مسار JSON من أجل التسريع، فقم بتعيين <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> العنصر</td><td>نعم</td><td>نعم</td><td>مطابقة عنصر معين حسب الفهرس، مثل <code translate="no">tags[0]</code>. <strong>لا</strong> تقوم مطابقة الأنماط بمسح جميع العناصر؛ بل تنطبق فقط على العنصر الموجود في الفهرس المحدد.</td></tr>
<tr><td>أهداف رقمية، أو منطقية، أو متجهة، أو <code translate="no">TEXT</code> ، أو أهداف أخرى غير<code translate="no">VARCHAR</code> </td><td>لا</td><td>لا</td><td>مطابقة الأنماط متاحة فقط لقيم <code translate="no">VARCHAR</code> ، أو مسارات JSON التي تُحل إلى سلاسل، أو عناصر <code translate="no">ARRAY&lt;VARCHAR&gt;</code> المفهرسة.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">اختر LIKE أو regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>اختر أبسط عامل يعبر عن النمط الذي تحتاجه.</p>
<p>إذا كنت بحاجة إلى مطابقة سلسلة نصية دقيقة، نوصيك باستخدام <code translate="no">==</code> بدلاً من مطابقة الأنماط. استخدم <code translate="no">LIKE</code> أو regex فقط عندما يحتاج المرشح إلى مطابقة نمط ما.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>المشغل الموصى به</th><th>مثال</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>المطابقة التامة للسلسلة</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>التطابق التام للسلسلة <code translate="no">active</code>.</td></tr>
<tr><td>المطابقة البسيطة للبادئة</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>تطابق السلاسل التي تبدأ بـ <code translate="no">Prod</code>.</td></tr>
<tr><td>مطابقة بسيطة لللاحقة</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>تطابق السلاسل التي تنتهي بـ <code translate="no">.json</code>.</td></tr>
<tr><td>مطابقة بسيطة لـ "يحتوي على"</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>تطابق القيم التي تحتوي على <code translate="no">vector database</code> في أي مكان في السلسلة.</td></tr>
<tr><td>مطابقة رمز منظم أو نمط ذي طول ثابت</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>تطابق السلاسل التي تحتوي، مع مراعاة الأحرف الكبيرة والصغيرة، على <code translate="no">E</code> متبوعًا بأربعة أرقام، مثل <code translate="no">E1001</code>.</td></tr>
<tr><td>مطابقة الأنماط دون التمييز بين الأحرف الكبيرة والصغيرة</td><td><code translate="no">=~</code> مع <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>تطابق <code translate="no">error</code> أو <code translate="no">ERROR</code> أو أي أشكال أخرى بأحرف كبيرة أو صغيرة.</td></tr>
<tr><td>استبعاد القيم التي تتطابق مع نمط تعبير عادي</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>يستبعد السلاسل التي تبدأ بـ <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>استخدم <code translate="no">LIKE</code> للمطابقة البسيطة باستخدام أحرف البدل. استخدم regex عندما يحتاج النمط إلى فئات الأحرف، أو التكرار، أو البدائل مثل <code translate="no">error|failed</code> ، أو نقاط الربط، أو المطابقة غير الحساسة لحالة الأحرف.</p>
<h2 id="Use-LIKE" class="common-anchor-header">استخدم LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>يُستخدم عامل <code translate="no">LIKE</code> للمطابقة البسيطة باستخدام أحرف البدل على قيم السلاسل. وهو يدعم أحرف البدل التالية فقط:</p>
<table>
<thead>
<tr><th>حرف البدل</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>يطابق صفرًا أو أكثر من الأحرف.</td></tr>
<tr><td><code translate="no">_</code></td><td>تطابق حرفًا واحدًا بالضبط.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">أنماط LIKE الشائعة<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم موضع <code translate="no">%</code> و <code translate="no">_</code> للتحكم في مكان ظهور النص الثابت في السلسلة المتطابقة.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>النمط</th><th>مثال على التصفية</th></tr>
</thead>
<tbody>
<tr><td>يبدأ ببادئة</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>ينتهي بلاحقة</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>يحتوي على سلسلة فرعية</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>يتطابق مع حرف واحد في موضع ثابت</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">سلوك المطابقة LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">LIKE</code> لمطابقات البادئة واللاحقة والمحتوى والحرف الواحد في موضع ثابت. لا يدعم <code translate="no">LIKE</code> فئات الأحرف مثل <code translate="no">[0-9]</code> ، أو التناوب مثل <code translate="no">error|failed</code> ، أو عدد التكرارات مثل <code translate="no">{4}</code> ، أو المراسي مثل <code translate="no">^</code> أو <code translate="no">$</code> ، أو علامات عدم التمييز بين الأحرف الكبيرة والصغيرة مثل <code translate="no">(?i)</code>. استخدم regex لهذه الأنماط.</p>
<p>استخدم <code translate="no">==</code> لمطابقة السلسلة الكاملة بالضبط. استخدم <code translate="no">LIKE</code> فقط عندما يحتاج المرشح إلى مطابقة أحرف البدل.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">تهرب أحرف البدل في نمط LIKE<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>في أنماط <code translate="no">LIKE</code> ، تتطابق <code translate="no">%</code> مع صفر أو أكثر من الأحرف، بينما تتطابق <code translate="no">_</code> مع حرف واحد بالضبط. لمطابقة <code translate="no">%</code> أو <code translate="no">_</code> أو <code translate="no">\</code> حرفيًا، قم بتفادي الحرف باستخدام شرطة مائلة عكسية (<code translate="no">\</code>):</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> تطابق القيمة الحرفية <code translate="no">%</code>.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> تتطابق مع القيم التي تبدأ بالرمز الحرفي <code translate="no">_</code>.</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> تتطابق مع القيم التي تبدأ بعلامة مائلة عكسية حرفية.</li>
</ul>
<p>تحتفظ القيم الحرفية للسلسلة الخام، المكتوبة على النحو <code translate="no">r&quot;...&quot;</code> أو <code translate="no">r'...'</code> ، بالشرطات المائلة العكسية حرفياً في تعبيرات مرشح Milvus. ويوصى باستخدامها في <code translate="no">LIKE</code> وأنماط التعبيرات النمطية التي تحتوي على شرطات مائلة عكسية. وبدون سلسلة خام، لا تزال القيم الحرفية العادية للسلسلة تعالج تسلسلات الهروب قبل تقييم النمط، لذا قد يتطلب الأمر المزيد من الشرطات المائلة العكسية.</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">استخدم التعبيرات النمطية<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم مرشحات التعبيرات النمطية (regex) عندما يتطلب النمط ميزات التعبيرات النمطية مثل فئات الأحرف، والتكرار، والتناوب، والمراسي، أو المطابقة غير الحساسة لحالة الأحرف. يطبق Milvus تعبيرًا نمطيًا <a href="https://github.com/google/re2/wiki/syntax">من نوع RE2</a> على قيمة السلسلة.</p>
<p>يجب أن يكون الجانب الأيمن من <code translate="no">=~</code> أو <code translate="no">!~</code> عبارة نصية.</p>
<table>
<thead>
<tr><th>المُشغِّل</th><th>المعنى</th><th>مثال</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>يطابق القيم التي تستوفي نمط التعبير العادي.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>يستبعد القيم التي تتوافق مع نمط التعبير النمطي.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">استخدام القيم الثابتة للسلسلة الخام<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>يُنصح باستخدام السلاسل النصية الخام لأنماط التعبيرات النمطية التي تحتوي على خطوط مائلة عكسية. في السلسلة النصية الخام، المكتوبة على النحو التالي: <code translate="no">r&quot;...&quot;</code> أو <code translate="no">r'...'</code> ، يتم تمرير الخطوط المائلة العكسية إلى محرك التعبيرات النمطية حرفياً. وهذا يتجنب الهروب الإضافي المطلوب في السلاسل النصية العادية.</p>
<p>على سبيل المثال:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتطابق هذا مع السلاسل التي تحتوي على قيمة تشبه التاريخ مثل <code translate="no">2026-07-01</code>.</p>
<p>بدون سلسلة نصية خام، تقوم السلاسل النصية العادية بمعالجة تسلسلات الهروب قبل تقييم نمط التعبير العادي، لذا قد تتطلب أنماط مثل <code translate="no">\d</code> أو <code translate="no">\s</code> أو الأحرف النصية التي تم الهروب منها علامات مائلة عكسية إضافية.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">أنماط التعبيرات النمطية الشائعة<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>تستخدم الأمثلة التالية صيغة RE2 الشائعة في تعبيرات تصفية Milvus. للاطلاع على صيغة التعبيرات النمطية الكاملة، راجع مرجع <a href="https://github.com/google/re2/wiki/syntax">صيغة RE2</a>.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>النمط</th><th>مثال على التصفية</th></tr>
</thead>
<tbody>
<tr><td>يحتوي على نص حرفي</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>يبدأ ببادئة</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>ينتهي بلاحقة</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>يتطابق مع تسلسل أرقام</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>يتطابق مع عدد ثابت من الأرقام</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>يتطابق مع نطاق بريد إلكتروني</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>تطابق دون التمييز بين الأحرف الكبيرة والصغيرة</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>تطابق السلسلة الكاملة</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>لمطابقة إحدى الكلمات المتعددة، استخدم البدائل باستخدام <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>عند مطابقة أحرف خاصة في التعبير النمطي حرفيًا، قم بتحويلها في نمط التعبير النمطي. على سبيل المثال، لمطابقة نقطة حرفية (<code translate="no">\.</code> في التعبير النمطي)، اكتب <code translate="no">\\.</code> في سلسلة مرشح Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ملاحظة: تتبع مرشحات التعبيرات النمطية في Milvus صيغة RE2. إذا استخدم نمط التعبير النمطي صيغة لا تدعمها RE2 أو كانت غير صالحة لأي سبب آخر، فإن Milvus يرفض تعبير المرشح. للحصول على تفاصيل حول أحرف التعبيرات النمطية الخاصة والعلامات وسلوك المطابقة، راجع مرجع <a href="https://github.com/google/re2/wiki/syntax">صيغة RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">سلوك المطابقة<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>مطابقة أجزاء السلسلة</strong></p>
<p>تستخدم مطابقة التعبيرات النمطية في Milvus دلالات السلسلة الفرعية. لا يلزم أن يتطابق النمط مع قيمة الحقل بالكامل. على سبيل المثال، يتطابق المرشح التالي مع كل من <code translate="no">E1001</code> و <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمطابقة قيمة الحقل بالكامل، استخدم المراسي <code translate="no">^</code> و <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>حقول VARCHAR القابلة للقيمة الفارغة</strong></p>
<p>لا تتطابق عوامل تصفية Regex مع القيم الفارغة. وينطبق هذا على كل من <code translate="no">=~</code> و <code translate="no">!~</code>. إذا كنت ترغب في استبعاد نمط Regex مع الاحتفاظ بالقيم الفارغة، فأضف <code translate="no">OR field IS NULL</code> بشكل صريح:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>مسارات JSON</strong></p>
<p>بالنسبة لمسارات JSON، تتصرف مرشحات التعبيرات النمطية بشكل مختلف عندما يكون المسار مفقودًا أو فارغًا أو يُحل إلى قيمة غير سلسلة:</p>
<table>
<thead>
<tr><th>المرشح</th><th>هل يشمل القيم المفقودة/الصفرية/غير السلسلية؟</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>لا</td><td>يتطابق فقط مع القيم النصية التي تستوفي نمط التعبير العادي.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>نعم</td><td>يعرض الكيانات التي يكون مسارها مفقودًا أو فارغًا أو غير نصي أو عبارة عن سلسلة لا تتطابق مع نمط التعبير العادي.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">تسريع مطابقة الأنماط باستخدام الفهارس<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus عدة أنواع من الفهارس في حقول السلاسل التي يمكن استخدامها مع <code translate="no">LIKE</code> وفلاتر التعبيرات العادية في حقول <code translate="no">VARCHAR</code> أو مسارات سلاسل JSON، مثل <code translate="no">NGRAM</code> و <code translate="no">STL_SORT</code> و <code translate="no">INVERTED</code> و <code translate="no">BITMAP</code>. يمكن أن تعمل مطابقة الأنماط بدون فهرس، لكن الفهرس يمكن أن يحسن الأداء في مجموعات البيانات الكبيرة.</p>
<p>تعتمد فعالية الفهرس على تعبير النمط، وما إذا كان بإمكان Milvus استخراج سلاسل فرعية حرفية ثابتة، بالإضافة إلى عدد عناصر الحقل المستهدف وتوزيعها. قد تستفيد الأنماط ذات البادئة، مثل <code translate="no">name LIKE &quot;Prod%&quot;</code> ، من استراتيجيات فهرسة مختلفة عن الأنماط ذات الوسيطة أو اللاحقة، مثل <code translate="no">description LIKE &quot;%vector%&quot;</code> أو <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>استخدم الجدول التالي كنقطة انطلاق، ثم قم بإجراء مقارنة مع حمل العمل الخاص بك:</p>
<table>
<thead>
<tr><th>النمط أو خاصية البيانات</th><th>الفهرس الذي يجب أخذه في الاعتبار</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td>يحتوي على سلاسل فرعية حرفية ثابتة، مثل <code translate="no">message =~ &quot;error.*timeout&quot;</code> أو <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>يكون ذلك مفيدًا عندما يتمكن Milvus من استخراج سلاسل فرعية حرفية ذات معنى من النمط. لمزيد من التفاصيل، راجع <a href="/docs/ar/ngram.md">NGRAM</a>.</td></tr>
<tr><td>مرشحات السلاسل البادئة أو الدقيقة أو الشبيهة بالمساواة، خاصةً في الحقول ذات الكثافة المنخفضة إلى المتوسطة</td><td><code translate="no">STL_SORT</code>، أو <code translate="no">INVERTED</code> ، أو <code translate="no">BITMAP</code></td><td>قد تكون أكثر فعالية عندما يحتوي الحقل على قيم متكررة أو عندما يكون المرشح قريبًا من المطابقة الدقيقة. لمزيد من التفاصيل، راجع <a href="/docs/ar/stl-sort.md">STL_SORT</a> و <a href="/docs/ar/inverted.md">INVERTED</a> و <a href="/docs/ar/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>أنماط Regex التي لا تحتوي على قيم حرفية ثابتة، أو الأنماط التي تهيمن عليها فئات الأحرف، أو الرموز القصيرة، أو أحرف البدل</td><td>قم بإجراء اختبار الأداء قبل الاعتماد على تسريع الفهرس</td><td>قد توفر هذه الأنماط انتقائية محدودة للفهرس ويمكن أن تلجأ إلى عمليات مسح أوسع نطاقًا.</td></tr>
</tbody>
</table>
