---
id: pattern-matching.md
title: مطابقة الأنماط
summary: >-
  يدعم Milvus مطابقة أنماط السلاسل باستخدام أنماط أحرف البدل LIKE والتعبيرات
  العادية RE2. استخدم مرشحات الأنماط لمطابقة البادئات واللاحقات والسلاسل الفرعية
  والرموز المهيكلة ونطاقات البريد الإلكتروني ومسارات عناوين URL وأنماط السلاسل
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
    </button></h1><p>في تطبيقات البحث الوكيل، غالبًا ما يكمل البحث المتجه ومطابقة الأنماط بأسلوب grep بعضهما البعض. يسترجع البحث المتجه الكيانات ذات الصلة من الناحية الدلالية، بينما تقوم مطابقة الأنماط بتضييق تلك النتائج من خلال تراكيب السلاسل الدقيقة، مثل رموز الأخطاء أو بادئات السجل أو مجالات البريد الإلكتروني أو مسارات عناوين URL أو المعرّفات.</p>
<p>في Milvus، يمكنك التعبير عن قيود الأنماط هذه في مرشحات قياسية باستخدام <code translate="no">LIKE</code> لمطابقة أحرف البدل البسيطة، و <code translate="no">=~</code> أو <code translate="no">!~</code> للتعبيرات العادية <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. يمكنك دمج هذه المرشحات مع <code translate="no">query</code> أو <code translate="no">search</code> أو البحث المختلط.</p>
<p>تتم كتابة تعبيرات مطابقة الأنماط في المعلمة <code translate="no">filter</code>. على سبيل المثال، يطابق الاستعلام التالي رسائل السجل التي تحتوي على رمز خطأ مثل <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>تركز الأمثلة الموجودة في هذه الصفحة على التعبير المعين إلى <code translate="no">filter</code>. يمكنك استخدام نفس صيغة تعبير المرشح في عمليات ملفوس التي تقبل مرشحًا قياسيًا، مثل <code translate="no">query</code> و <code translate="no">search</code> والبحث المختلط.</p>
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
    </button></h2><p>تتوفر مطابقة الأنماط لقيم السلاسل.</p>
<table>
<thead>
<tr><th>الهدف</th><th><code translate="no">LIKE</code></th><th>ريجكس <code translate="no">=~</code> / <code translate="no">!~</code></th><th>الملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> الحقل</td><td>نعم</td><td>نعم</td><td>الهدف النموذجي لمطابقة الأنماط على حقول السلاسل.</td></tr>
<tr><td><code translate="no">JSON</code> مسار بنوع <code translate="no">VARCHAR</code> يلقي </td><td>نعم</td><td>نعم</td><td>يجب أن تكون قيمة مسار JSON سلسلة للمطابقة الإيجابية. إذا قمت بإنشاء فهرس على مسار JSON للتسريع، قم بتعيين <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> عنصر</td><td>نعم</td><td>نعم</td><td>مطابقة عنصر معين حسب الفهرس، مثل <code translate="no">tags[0]</code>. <strong>لا</strong> تفحص مطابقة الأنماط جميع العناصر؛ فهي تنطبق فقط على العنصر الموجود في الفهرس المحدد.</td></tr>
<tr><td>عددية أو منطقية أو منطقية أو متجهة أو <code translate="no">TEXT</code> أو أهداف أخرى غير<code translate="no">VARCHAR</code> </td><td>لا يوجد</td><td>لا يوجد</td><td>مطابقة الأنماط متاحة فقط لقيم <code translate="no">VARCHAR</code> ، أو مسارات JSON التي تحل إلى سلاسل، أو عناصر <code translate="no">ARRAY&lt;VARCHAR&gt;</code> المفهرسة.</td></tr>
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
    </button></h2><p>اختر أبسط مشغل يعبر عن النمط الذي تحتاجه.</p>
<p>إذا كنت بحاجة إلى مطابقة سلسلة تامة، نوصيك باستخدام <code translate="no">==</code> بدلاً من مطابقة النمط. استخدم <code translate="no">LIKE</code> أو regex فقط عندما يحتاج عامل التصفية إلى مطابقة نمط.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>المشغل الموصى به</th><th>مثال</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>المساواة التامة للسلسلة</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>مطابقة تامة للسلسلة <code translate="no">active</code>.</td></tr>
<tr><td>مطابقة البادئة البسيطة</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>يطابق السلاسل التي تبدأ ب <code translate="no">Prod</code>.</td></tr>
<tr><td>مطابقة لاحقة بسيطة</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>يطابق السلاسل التي تنتهي ب <code translate="no">.json</code>.</td></tr>
<tr><td>يحتوي على تطابق بسيط</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>يطابق القيم التي تحتوي على <code translate="no">vector database</code> في أي مكان في السلسلة.</td></tr>
<tr><td>يطابق رمزًا منظمًا أو نمطًا ثابت الطول</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>يطابق السلاسل التي تحتوي بشكل حساس لحالة الأحرف على <code translate="no">E</code> متبوعة بأربعة أرقام، مثل <code translate="no">E1001</code>.</td></tr>
<tr><td>مطابقة نمط غير حساس لحالة الأحرف</td><td><code translate="no">=~</code> مع <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>يطابق <code translate="no">error</code> أو <code translate="no">ERROR</code> أو متغيرات حالة الأحرف الأخرى.</td></tr>
<tr><td>استبعاد القيم التي تتطابق مع نمط regex</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>استبعاد السلاسل التي تبدأ بـ <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>استخدم <code translate="no">LIKE</code> لمطابقة أحرف البدل البسيطة. استخدم regex عندما يحتاج النمط إلى فئات الأحرف، أو التكرار، أو التناوب مثل <code translate="no">error|failed</code> ، أو المراسي، أو المطابقة غير الحساسة لحالة الأحرف.</p>
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
    </button></h2><p>المشغل <code translate="no">LIKE</code> لمطابقة أحرف البدل البسيطة على قيم السلاسل. وهو يدعم أحرف البدل التالية فقط:</p>
<table>
<thead>
<tr><th>أحرف البدل</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>يطابق صفر أو أكثر من الأحرف.</td></tr>
<tr><td><code translate="no">_</code></td><td>يطابق حرف واحد فقط.</td></tr>
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
<tr><th>الشرط</th><th>النمط</th><th>مثال على التصفية</th></tr>
</thead>
<tbody>
<tr><td>يبدأ ببادئة</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>ينتهي بلاحقة</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>يحتوي على سلسلة فرعية</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>يطابق حرفًا واحدًا في موضع ثابت</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">سلوك مطابقة مثل<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>استخدم <code translate="no">LIKE</code> لمطابقة البادئة واللاحقة واللاحقة وتحتوي على حرف واحد في موضع ثابت. <code translate="no">LIKE</code> لا يدعم فئات الأحرف مثل <code translate="no">[0-9]</code> أو التناوب مثل <code translate="no">error|failed</code> أو التكرار مثل <code translate="no">{4}</code> أو التكرار مثل أو الارتكازات مثل <code translate="no">^</code> أو <code translate="no">$</code> أو الأعلام غير الحساسة لحالة الأحرف مثل <code translate="no">(?i)</code>. استخدم regex لهذه الأنماط.</p>
<p>استخدم <code translate="no">==</code> لمساواة السلسلة الكاملة بالضبط. استخدم <code translate="no">LIKE</code> فقط عندما يحتاج المرشح إلى مطابقة أحرف البدل.</p>
<h2 id="Use-regex" class="common-anchor-header">استخدام regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم مرشحات regex عندما يتطلب النمط ميزات التعبير العادي مثل فئات الأحرف أو التكرار أو التناوب أو نقاط الارتكاز أو المطابقة غير الحساسة لحالة الأحرف. يطبق Milvus تعبيرًا عاديًا <a href="https://github.com/google/re2/wiki/syntax">RE2</a> على قيمة سلسلة.</p>
<p>يجب أن يكون الجانب الأيمن من <code translate="no">=~</code> أو <code translate="no">!~</code> سلسلة حرفية.</p>
<table>
<thead>
<tr><th>المشغل</th><th>المعنى</th><th>مثال</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>يطابق القيم التي تفي بنمط regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>يستبعد القيم التي تفي بنمط regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">أنماط regex الشائعة<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>تستخدم الأمثلة التالية بناء جملة RE2 الشائعة في تعابير تصفية Milvus. للحصول على بناء جملة regex كامل، ارجع إلى مرجع <a href="https://github.com/google/re2/wiki/syntax">بناء جملة RE2</a>.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>النمط</th><th>مثال على التصفية</th></tr>
</thead>
<tbody>
<tr><td>يحتوي على نص حرفي</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>يبدأ ببادئة</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>ينتهي بلاحقة</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>يطابق تسلسل أرقام</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>يطابق عددًا ثابتًا من الأرقام</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>يطابق نطاق بريد إلكتروني</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>يتطابق مع حالة الأحرف</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>يطابق السلسلة الكاملة</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>لمطابقة كلمة واحدة من عدة كلمات، استخدم التناوب مع <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>عند مطابقة الأحرف الوصفية لـ regex حرفيًا، اهرب منها في نمط regex. على سبيل المثال، لمطابقة نقطة حرفية (<code translate="no">\.</code> في regex)، اكتب <code translate="no">\\.</code> في سلسلة مرشح Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ملاحظة: تتبع مرشحات ميلفوس ريجكس بناء الجملة RE2. إذا كان نمط regex يستخدم بناء الجملة الذي لا يدعمه RE2 أو إذا كان غير صالح، فإن Milvus يرفض تعبير المرشح. للحصول على تفاصيل حول الأحرف الوصفية وعلامات وعلامات وسلوك المطابقة، راجع مرجع <a href="https://github.com/google/re2/wiki/syntax">بناء جملة RE2</a>.</p>
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
    </button></h3><p><strong>مطابقة السلسلة الفرعية</strong></p>
<p>تستخدم مطابقة ميلفوس ريجكس دلالات السلسلة الفرعية. لا يحتاج النمط إلى مطابقة قيمة الحقل بالكامل. على سبيل المثال، يطابق عامل التصفية التالي كلاً من <code translate="no">E1001</code> و <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمطابقة قيمة الحقل بالكامل، استخدم علامتي الارتساء <code translate="no">^</code> و <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>حقول VARCHAR VARCHAR القابلة للفراغ</strong></p>
<p>لا تطابق عوامل تصفية Regex القيم الفارغة. ينطبق هذا على كل من <code translate="no">=~</code> و <code translate="no">!~</code>. إذا كنت تريد استبعاد نمط ريجكس مع الاحتفاظ بالقيم الفارغة، أضف صراحةً <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>مسارات JSON</strong></p>
<p>بالنسبة لمسارات JSON، تتصرف مرشحات regex بشكل مختلف عندما يكون المسار مفقودًا أو فارغًا أو يحل إلى قيمة غير سلسلة:</p>
<table>
<thead>
<tr><th>عامل التصفية</th><th>يشمل القيم المفقودة/الفارغة/غير السلسلة؟</th><th>ملاحظات</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>لا</td><td>يطابق فقط قيم السلسلة التي تفي بنمط regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>نعم</td><td>إرجاع الكيانات التي يكون فيها المسار مفقودًا أو فارغًا أو غير سلسلة أو سلسلة لا تتطابق مع نمط regex.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">تسريع مطابقة النمط مع الفهارس<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم ميلفوس العديد من أنواع الفهارس على حقول السلاسل التي يمكن استخدامها مع <code translate="no">LIKE</code> ومرشحات regex على حقول <code translate="no">VARCHAR</code> أو مسارات سلسلة JSON، مثل <code translate="no">NGRAM</code> و <code translate="no">STL_SORT</code> و <code translate="no">INVERTED</code> و <code translate="no">BITMAP</code>. يمكن أن تعمل مطابقة الأنماط بدون فهرس، ولكن يمكن للفهرس تحسين الأداء على مجموعات البيانات الكبيرة.</p>
<p>وتعتمد فعالية الفهرس على تعبير النمط، وما إذا كان بإمكان ميلفوس استخراج سلاسل فرعية حرفية ثابتة، ومدى كفاية وتوزيع الحقل المستهدف. قد تستفيد الأنماط ذات النمط البادئة مثل <code translate="no">name LIKE &quot;Prod%&quot;</code> من استراتيجيات فهرسة مختلفة عن الأنماط اللواحق أو اللواحق مثل <code translate="no">description LIKE &quot;%vector%&quot;</code> أو <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>استخدم الجدول التالي كنقطة بداية، ثم قم بالقياس مع عبء العمل الخاص بك:</p>
<table>
<thead>
<tr><th>النمط أو خاصية البيانات</th><th>فهرس يجب مراعاته</th><th>الملاحظات</th></tr>
</thead>
<tbody>
<tr><td>يحتوي على سلاسل فرعية حرفية ثابتة، مثل <code translate="no">message =~ &quot;error.*timeout&quot;</code> أو <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>يساعد عندما يستطيع Milvus استخراج سلاسل فرعية حرفية ذات معنى من النمط. لمزيد من التفاصيل، راجع <a href="/docs/ar/ngram.md">NGRAM</a>.</td></tr>
<tr><td>البادئة أو الدقيقة أو مرشحات السلاسل الشبيهة بالمساواة، خاصةً في الحقول ذات القالبية المنخفضة إلى المعتدلة</td><td><code translate="no">STL_SORT</code> <code translate="no">INVERTED</code> ، أو <code translate="no">BITMAP</code></td><td>قد تكون أكثر فعالية عندما يحتوي الحقل على قيم متكررة أو عندما يكون المرشح قريبًا من المطابقة التامة. لمزيد من التفاصيل، راجع <a href="/docs/ar/stl-sort.md">STL_SORT</a> و <a href="/docs/ar/inverted.md">INVERTED</a> و <a href="/docs/ar/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>أنماط Regex بدون حروف ثابتة، أو الأنماط التي تهيمن عليها فئات الأحرف أو الرموز القصيرة أو أحرف البدل</td><td>قم بالقياس قبل الاعتماد على تسريع الفهرس</td><td>قد توفر هذه الأنماط انتقائية محدودة للفهرس ويمكن أن تعود إلى عمليات مسح أوسع.</td></tr>
</tbody>
</table>
