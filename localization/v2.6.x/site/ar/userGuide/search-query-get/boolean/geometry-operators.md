---
id: geometry-operators.md
title: مشغلات الهندسة
summary: >-
  يدعم Milvus مجموعة من عوامل التشغيل للتصفية المكانية على حقول GEOMETRY، والتي
  تعتبر ضرورية لإدارة البيانات الهندسية وتحليلها. تسمح لك هذه العوامل باسترداد
  الكيانات بناءً على العلاقات الهندسية بين الكائنات.
---
<h1 id="Geometry-Operators" class="common-anchor-header">مشغلات الهندسة<button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>يدعم ميلفوس مجموعة من المشغلات للتصفية المكانية على <code translate="no">GEOMETRY</code> الحقول، وهي ضرورية لإدارة وتحليل البيانات الهندسية. تسمح لك هذه المشغلات باسترداد الكيانات بناءً على العلاقات الهندسية بين الكائنات.</p>
<p>يعمل جميع مشغلي الهندسة من خلال أخذ وسيطتين هندسيتين: اسم الحقل <code translate="no">GEOMETRY</code> المحدد في مخطط مجموعتك وكائن هندسي مستهدف ممثل بتنسيق <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">نص معروف</a> (WKT).</p>
<p>لمعرفة المزيد عن <code translate="no">GEOMETRY</code> الحقول في ميلفوس، راجع <a href="/docs/ar/geometry-field.md">حقل الهندسة</a>.</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">مشغلات الهندسة المدعومة<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي قائمة بالعوامل الهندسية المتوفرة في Milvus.</p>
<div class="alert note">
<p>يجب أن تكون أسماء المشغلات <strong>كلها كبيرة</strong> أو <strong>كلها صغيرة</strong>. لا تخلط الحالات داخل نفس اسم المشغل.</p>
</div>
<table>
   <tr>
     <th><p>المشغل</p></th>
     <th><p>الوصف</p></th>
     <th><p>مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> / <code translate="no">st_equals(A, B)</code></p></td>
     <td><p>يُرجِع TRUE إذا كان الشكلان الهندسيان متطابقين مكانيًا، أي أن لهما نفس مجموعة النقاط والأبعاد.</p></td>
     <td><p>هل الشكلان الهندسيان (أ و ب) متماثلان تماماً في الفضاء؟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> / <code translate="no">st_contains(A, B)</code></p></td>
     <td><p>ترجع TRUE إذا كان الشكل الهندسي (أ) يحتوي تماماً على الشكل الهندسي (ب)، مع وجود نقطة واحدة مشتركة بينهما على الأقل.</p></td>
     <td><p>هل حدود المدينة (أ) تحتوي على حديقة معينة (ب)؟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> / <code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>تُرجع TRUE إذا كان الشكلان الهندسيان (أ) و(ب) يتقاطعان جزئياً ولكن لا يحتويان على بعضهما البعض بالكامل.</p></td>
     <td><p>هل يتقاطع طريقان (أ و ب) عند تقاطع؟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> / <code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>ترجع TRUE (صحيح) إذا كان للطريقين (أ) و(ب) نقطة مشتركة واحدة على الأقل. هذا هو الاستعلام المكاني الأكثر عمومية والأكثر استخدامًا.</p></td>
     <td><p>هل تتقاطع منطقة البحث (أ) مع أي من مواقع المتجر (ب)؟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> / <code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>يُرجِع TRUE إذا كانت المساحتان (أ) و(ب) من نفس البُعد، ومتداخلتين جزئياً، ولا تحتوي إحداهما على الأخرى بالكامل.</p></td>
     <td><p>هل قطعتا الأرض (أ و ب) متداخلتان؟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> / <code translate="no">st_touches(A, B)</code></p></td>
     <td><p>تُرجع TRUE إذا كانت قطعتا الأرض (أ) و(ب) تشتركان في حدود مشتركة ولكن لا تتقاطع تصميماتهما الداخلية.</p></td>
     <td><p>هل تشترك قطعتا أرض متجاورتان (أ و ب) في حدود مشتركة؟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> / <code translate="no">st_within(A, B)</code></p></td>
     <td><p>تُرجع TRUE إذا كان الشكلان الهندسيان (أ) و(ب) متضمنين بالكامل داخل الشكل الهندسي (ب)، مع وجود نقطة واحدة مشتركة على الأقل بين تصميميهما الداخليين. إنه معكوس <code translate="no">ST_Contains(B, A)</code>.</p></td>
     <td><p>هل توجد نقطة محددة (أ) ضمن نصف قطر بحث محدد (ب)؟</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> / <code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>ترجع TRUE إذا كانت المسافة بين الشكل الهندسي A والشكل الهندسي B أقل من أو تساوي المسافة المحددة.</p><p><strong>ملاحظة</strong>: يدعم الشكل الهندسي B حاليًا النقاط فقط. وحدة المسافة هي متر.</p></td>
     <td><p>ابحث عن جميع النقاط ضمن 5000 متر من نقطة محددة (B).</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_EQUALS / st_equals<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغّل <code translate="no">ST_EQUALS</code> بإرجاع TRUE إذا كان هناك هندسيان متطابقان مكانيًا، أي أن لهما نفس مجموعة النقاط والأبعاد. هذا مفيد للتحقق مما إذا كان كائنان هندسيان مخزنان يمثلان نفس الموقع والشكل بالضبط.</p>
<p><strong>مثال</strong></p>
<p>لنفترض أنك تريد التحقق مما إذا كان الشكل الهندسي المخزّن (مثل نقطة أو مضلع) مطابقًا تمامًا للشكل الهندسي الهدف. على سبيل المثال، يمكنك مقارنة نقطة مخزّنة بنقطة محددة ذات أهمية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to check if a geometry matches a specific point</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_EQUALS(geo_field, &#x27;POINT(10 20)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCONTAINS--stcontains" class="common-anchor-header">ST_CONTAINS / st_contains<button data-href="#STCONTAINS--stcontains" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغّل <code translate="no">ST_CONTAINS</code> بإرجاع TRUE إذا كانت الهندسة الأولى تحتوي بالكامل على الهندسة الثانية. هذا مفيد لإيجاد نقاط داخل مضلع، أو مضلعات أصغر داخل مضلع أكبر.</p>
<p><strong>مثال</strong></p>
<p>تخيّل أن لديك مجموعة من أحياء المدينة وتريد العثور على نقطة معيّنة ذات أهمية، مثل مطعم، تقع ضمن حدود منطقة معيّنة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries completely within a specific polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CONTAINS(geo_field, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCROSSES--stcrosses" class="common-anchor-header">ST_CROSSES / st_crosses<button data-href="#STCROSSES--stcrosses" class="anchor-icon" translate="no">
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
    </button></h2><p>يُرجع المشغّل <code translate="no">ST_CROSSES</code> <code translate="no">TRUE</code> إذا كان تقاطع شكلين هندسيين يشكّل هندسة ذات بُعد أقل من الأشكال الهندسية الأصلية. ينطبق هذا عادةً على خط يتقاطع مع مضلع أو خط آخر.</p>
<p><strong>مثال</strong></p>
<p>تريد العثور على جميع مسارات التنزه (سلاسل الخطوط) التي تتقاطع مع خط حدّي محدد (سلسلة خطوط أخرى) أو تدخل منطقة محمية (مضلع).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / st_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغّل <code translate="no">ST_INTERSECTS</code> بإرجاع <code translate="no">TRUE</code> إذا كان هناك أي نقطة مشتركة بين شكلين هندسيين في حدودهما أو داخلهما. هذا هو مشغل للأغراض العامة للكشف عن أي شكل من أشكال التداخل المكاني.</p>
<p><strong>مثال</strong></p>
<p>إذا كان لديك مجموعة من الطرق وترغب في العثور على جميع الطرق التي تتقاطع أو تلامس سلسلة خطية محددة تمثل طريقًا جديدًا مقترحًا، يمكنك استخدام <code translate="no">ST_INTERSECTS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that intersect with a specific line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo_field, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STOVERLAPS--stoverlaps" class="common-anchor-header">ST_OVERLAPS / st_overlaps<button data-href="#STOVERLAPS--stoverlaps" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغل <code translate="no">ST_OVERLAPS</code> بإرجاع <code translate="no">TRUE</code> إذا كان هناك تقاطع جزئي بين شكلين هندسيين من نفس البعد، حيث يكون للتقاطع نفسه نفس بُعد الشكلين الهندسيين الأصليين، ولكنه لا يساوي أيًا منهما.</p>
<p><strong>مثال</strong></p>
<p>لديك مجموعة من مناطق المبيعات المتداخلة وتريد العثور على جميع المناطق التي تتداخل جزئياً مع منطقة مبيعات جديدة مقترحة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOUCHES / st_touches<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغل <code translate="no">ST_TOUCHES</code> بإرجاع <code translate="no">TRUE</code> إذا تلامست حدود منطقتين هندسيتين، ولكن لم تتقاطع حدودهما الداخلية. هذا مفيد للكشف عن التجاورات.</p>
<p><strong>مثال</strong></p>
<p>إذا كانت لديك خريطة لطرود العقارات وتريد العثور على جميع الطرود المجاورة مباشرةً لحديقة عامة دون أي تداخل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_WITHIN / st_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغّل <code translate="no">ST_WITHIN</code> بإرجاع <code translate="no">TRUE</code> إذا كانت القطعة الهندسية الأولى تقع بالكامل داخل أو على حدود القطعة الهندسية الثانية. وهو عكس <code translate="no">ST_CONTAINS</code>.</p>
<p><strong>مثال</strong></p>
<p>تريد العثور على جميع المناطق السكنية الصغيرة التي تقع بالكامل داخل منطقة منتزه أكبر مخصصة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لمزيد من المعلومات حول كيفية استخدام حقل <code translate="no">GEOMETRY</code> ، راجع <a href="/docs/ar/geometry-field.md">حقل الهندسة</a>.</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / st_dwithin<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم المشغل <code translate="no">ST_DWITHIN</code> بإرجاع <code translate="no">TRUE</code> إذا كانت المسافة بين الحقل الهندسي (أ) والحقل الهندسي (ب) أقل من أو تساوي قيمة محددة (بالأمتار). حاليًا، يجب أن يكون الشكل الهندسي B نقطة.</p>
<p><strong>مثال</strong></p>
<p>لنفترض أن لديك مجموعة من مواقع المتاجر وتريد العثور على جميع المتاجر في نطاق 5000 متر من موقع عميل معين.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
