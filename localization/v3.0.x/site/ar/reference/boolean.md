---
id: boolean.md
summary: تعرف على قواعد التعبير المنطقي في ميلفوس.
title: قواعد التصفية العددية
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">قواعد التصفية العددية<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم التعبير المسند بإخراج قيمة منطقية. يقوم ميلفوس بإجراء تصفية عددية من خلال البحث باستخدام المسندات. يقوم التعبير المسند، عند تقييمه، بإرجاع إما TRUE أو FALSE. اعرض <a href="/api-reference/pymilvus/v2.4.x/About.md">مرجع Python SDK API</a> للحصول على تعليمات حول استخدام التعبيرات المسندة.</p>
<p>تصف قواعد نحو<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> قواعد التعبيرات المنطقية:</p>
<pre><code translate="no">Expr = LogicalExpr | NIL
LogicalExpr = LogicalExpr BinaryLogicalOp LogicalExpr 
              | UnaryLogicalOp LogicalExpr
              | <span class="hljs-string">&quot;(&quot;</span> LogicalExpr <span class="hljs-string">&quot;)&quot;</span>
              | SingleExpr;
BinaryLogicalOp = <span class="hljs-string">&quot;&amp;&amp;&quot;</span> | <span class="hljs-string">&quot;and&quot;</span> | <span class="hljs-string">&quot;||&quot;</span> | <span class="hljs-string">&quot;or&quot;</span>;
UnaryLogicalOp = <span class="hljs-string">&quot;not&quot;</span>;
SingleExpr = TermExpr | CompareExpr;
TermExpr = IDENTIFIER <span class="hljs-string">&quot;in&quot;</span> ConstantArray;
Constant = INTEGER | FLOAT
ConstantExpr = Constant
               | ConstantExpr BinaryArithOp ConstantExpr
               | UnaryArithOp ConstantExpr;
                                                          
ConstantArray = <span class="hljs-string">&quot;[&quot;</span> ConstantExpr { <span class="hljs-string">&quot;,&quot;</span> ConstantExpr } <span class="hljs-string">&quot;]&quot;</span>;
UnaryArithOp = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span>
BinaryArithOp = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span> | <span class="hljs-string">&quot;**&quot;</span>;
CompareExpr = IDENTIFIER CmpOp IDENTIFIER
              | IDENTIFIER CmpOp ConstantExpr
              | ConstantExpr CmpOp IDENTIFIER
              | ConstantExpr CmpOpRestricted IDENTIFIER CmpOpRestricted ConstantExpr;
CmpOpRestricted = <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span>;
CmpOp = <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span> | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;==&quot;</span>| <span class="hljs-string">&quot;!=&quot;</span>;
MatchOp = <span class="hljs-string">&quot;like&quot;</span> | <span class="hljs-string">&quot;LIKE&quot;</span>;
JsonArrayOps = JsonDefs <span class="hljs-string">&quot;(&quot;</span> IDENTIFIER <span class="hljs-string">&quot;,&quot;</span> JsonExpr | JsonArray <span class="hljs-string">&quot;)&quot;</span>;
JsonArrayDefs = <span class="hljs-string">&quot;json_contains&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_all&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_any&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ANY&quot;</span>;
JsonExpr =  Constant | ConstantArray | STRING | BOOLEAN;
JsonArray = <span class="hljs-string">&quot;[&quot;</span> JsonExpr { <span class="hljs-string">&quot;,&quot;</span> JsonExpr } <span class="hljs-string">&quot;]&quot;</span>;
ArrayOps = ArrayDefs <span class="hljs-string">&quot;(&quot;</span> IDENTIFIER <span class="hljs-string">&quot;,&quot;</span> ArrayExpr | Array <span class="hljs-string">&quot;)&quot;</span>;
ArrayDefs = <span class="hljs-string">&quot;array_contains&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_all&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_any&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY&quot;</span>
           | <span class="hljs-string">&quot;array_length&quot;</span>       | <span class="hljs-string">&quot;ARRAY_LENGTH&quot;</span>;
ArrayExpr =  Constant | ConstantArray | STRING | BOOLEAN;
Array = <span class="hljs-string">&quot;[&quot;</span> ArrayExpr { <span class="hljs-string">&quot;,&quot;</span> ArrayExpr } <span class="hljs-string">&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<p>يسرد الجدول التالي وصف كل رمز مذكور في قواعد التعبيرات المنطقية أعلاه.</p>
<table>
<thead>
<tr><th>الرمز</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>التعريف</td></tr>
<tr><td>,</td><td>التسلسل</td></tr>
<tr><td>;</td><td>الإنهاء</td></tr>
<tr><td>|</td><td>التناوب.</td></tr>
<tr><td>{...}</td><td>التكرار.</td></tr>
<tr><td>(...)</td><td>تجميع.</td></tr>
<tr><td>لا شيء</td><td>فارغ. يمكن أن يكون التعبير سلسلة فارغة.</td></tr>
<tr><td>INTEGER</td><td>الأعداد الصحيحة مثل 1، 2، 3.</td></tr>
<tr><td>عائم</td><td>أرقام عائمة مثل 1.0، 2.0.</td></tr>
<tr><td>كونست</td><td>أعداد صحيحة أو أرقام عائمة.</td></tr>
<tr><td>معرّف</td><td>معرّف. في ميلفوس، يمثل المعرف اسم الحقل.</td></tr>
<tr><td>LogicalOp</td><td>LogicalOp هو مشغل منطقي يدعم دمج أكثر من عملية علائقية في مقارنة واحدة. القيمة العائدة من LogicalOp هي إما TRUE (1) أو FALSE (0). هناك نوعان من LogicalOps، بما في ذلك BinaryLogicalOps و UnaryLogicalOps.</td></tr>
<tr><td>الأحادي المنطقي</td><td>يشير UnaryLogicalOp إلى المشغّل المنطقي الأحادي "ليس".</td></tr>
<tr><td>BinaryLogicalOp</td><td>العوامل المنطقية الثنائية التي تنفذ إجراءات على معاملين. في التعبير المعقد الذي يحتوي على معاملين أو أكثر، يعتمد ترتيب التقييم على قواعد الأسبقية.</td></tr>
<tr><td>حسابيOp</td><td>يقوم ArithmeticOp، أي عامل حسابي، بتنفيذ عمليات رياضية مثل الجمع والطرح على المعاملات.</td></tr>
<tr><td>UnaryArithOp</td><td>UnaryArithOp هو مشغّل حسابي يقوم بإجراء عملية على معامل واحد. يغيّر UnaryArithOp السالب تعبيرًا موجبًا إلى سالب، أو العكس.</td></tr>
<tr><td>ثنائيArithOp</td><td>يُجري BinaryArithOp، أي مشغّل ثنائي، عمليات على معاملين. في التعبير المركب الذي يحتوي على معاملين أو أكثر، يعتمد ترتيب التقييم على قواعد الأسبقية.</td></tr>
<tr><td>CmpOp</td><td>CmpOp هو مشغّل علائقي ينفذ عمليات على معاملين اثنين.</td></tr>
<tr><td>CmpOpRestricted</td><td>يقتصر CmpOpRestricted على "أقل من" و "مساوٍ".</td></tr>
<tr><td>ثابتExpr</td><td>يمكن أن يكون ConstantExpr ثابتًا أو ثنائيًا على اثنين من ConstExprs أو أحاديًا على ثابت واحد. يتم تعريفه بشكل متكرر.</td></tr>
<tr><td>مصفوفة ثابتة</td><td>يتم تغليف ConstantArray بأقواس مربعة، ويمكن تكرار ConstantExpr في الأقواس المربعة. يجب أن تتضمن ConstantArray على الأقل ConstantExpr واحدًا على الأقل.</td></tr>
<tr><td>مصطلحExpr</td><td>يُستخدم TermExpr للتحقق مما إذا كانت قيمة المعرّف تظهر في ConstantArray أم لا. يتم تمثيل TermExpr بحرف "في".</td></tr>
<tr><td>قارنإكسبر</td><td>يمكن أن يكون تعبير المقارنة، أي تعبير المقارنة عمليات علائقية على معرّفين، أو عمليات علائقية على معرّف واحد ومعرّف واحد ConstantExpr، أو عمليات ثلاثية على معرّفين ثابتين ومعرّف واحد.</td></tr>
<tr><td>مفردExpr</td><td>يمكن أن يكون SingleExpr، أي التعبير المفرد، إما مصطلحExpr أو مقارنةExpr.</td></tr>
<tr><td>LogicalExpr</td><td>يمكن أن يكون LogicalExpr تعبيرًا ثنائيًا منطقيًا ثنائيًا على تعبيرين منطقيين، أو تعبيرًا أحاديًا منطقيًا أحاديًا على تعبير منطقي واحد، أو تعبيرًا منطقيًا مجمّعًا داخل قوسين، أو تعبيرًا أحاديًا. يُعرَّف LogicalExpr بشكل متكرر.</td></tr>
<tr><td>Expr</td><td>Expr، وهو اختصار يعني التعبير، يمكن أن يكون LogicalExpr أو NIL.</td></tr>
<tr><td>تطابق</td><td>يقارن MatchOp، أي مشغل مطابقة، سلسلة بثابت سلسلة أو بادئة سلسلة أو لاحقة أو ثابت لاحقة.</td></tr>
<tr><td>JsonArrayOp</td><td>يتحقق JsonOp، أي مشغّل JSON، مما إذا كان المعرف المحدد يحتوي على العناصر المحددة.</td></tr>
<tr><td>ArrayOp</td><td>يتحقق ArrayOp، أي مشغّل مصفوفة، من احتواء المعرّف المحدّد على العناصر المحدّدة.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">المشغلات<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">المشغلات المنطقية<button data-href="#Logical-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>يقوم المشغلات المنطقية بإجراء مقارنة بين تعبيرين.</p>
<table>
<thead>
<tr><th>الرمز</th><th>عملية</th><th>مثال</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>'و' &amp;&amp;&amp;</td><td>و</td><td>expr1 &amp; &amp; expr2</td><td>صحيح إذا كان كل من expr1 و expr2 صحيحين.</td></tr>
<tr><td>'أو' ||</td><td>أو</td><td>expr1 || expr2</td><td>صحيح إذا كان كل من expr1 أو expr2 صحيحين.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">العوامل الحسابية الثنائية<button data-href="#Binary-arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>تحتوي العوامل الحسابية الثنائية على معاملين ويمكنها إجراء عمليات حسابية أساسية وإرجاع النتيجة المقابلة.</p>
<table>
<thead>
<tr><th>الرمز</th><th>العملية</th><th>مثال</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>الإضافة</td><td>أ + ب</td><td>جمع المعاملين.</td></tr>
<tr><td>-</td><td>الطرح</td><td>أ - ب</td><td>اطرح المعامل الثاني من المعامل الأول.</td></tr>
<tr><td>*</td><td>الضرب</td><td>أ * ب</td><td>ضرب المعاملين.</td></tr>
<tr><td>/</td><td>القسمة</td><td>أ/ب</td><td>قسمة المعامل الأول على المعامل الثاني.</td></tr>
<tr><td>**</td><td>القوة</td><td>أ ** ب</td><td>ارفع المعامل الأول إلى قوة المعامل الثاني.</td></tr>
<tr><td>%</td><td>مودولو</td><td>أ % ب</td><td>قسمة المعامل الأول على المعامل الثاني وإعطاء الجزء المتبقي.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">العوامل العلائقية<button data-href="#Relational-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>تستخدم العوامل العلائقية الرموز للتحقق من التساوي أو عدم المساواة أو الترتيب النسبي بين تعبيرين.</p>
<table>
<thead>
<tr><th>الرمز</th><th>العملية</th><th>مثال</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>أقل من</td><td>أ &lt;ب</td><td>صحيح إذا كان a أقل من b.</td></tr>
<tr><td>&gt;</td><td>أكبر من</td><td>أ &gt; ب</td><td>صحيح إذا كانت أ أكبر من ب.</td></tr>
<tr><td>==</td><td>يساوي</td><td>أ = = ب</td><td>صواب إذا كان أ يساوي ب.</td></tr>
<tr><td>!=</td><td>لا يساوي</td><td>أ != ب</td><td>صواب إذا كان أ لا يساوي ب.</td></tr>
<tr><td>&lt;=</td><td>أقل من أو يساوي</td><td>أ &lt;= ب</td><td>صواب إذا كان أ أقل من أو يساوي ب.</td></tr>
<tr><td>&gt;=</td><td>أكبر من أو يساوي</td><td>أ &gt;= ب</td><td>صواب إذا كان أ أكبر من أو يساوي ب.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">أسبقية وربط العوامل<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي أسبقية وربط المعاملات. يتم سرد المعاملات من الأعلى إلى الأسفل، بأسبقية تنازلية.</p>
<table>
<thead>
<tr><th>الأسبقية</th><th>المعامل</th><th>الوصف</th><th>الارتباطية</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>يونياري أرثوب</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>2</td><td>لا</td><td>يونياري لوجيكوب</td><td>من اليمين إلى اليسار</td></tr>
<tr><td>3</td><td>**</td><td>ثنائي أرثوب</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>6</td><td>&lt; <= > &gt;&gt;=</td><td>CmpOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>8</td><td>مثل LIKE</td><td>ماتشوبوب</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>9</td><td>مصفوفة_تحتوي على ARRAY_CONTAINS</td><td>مصفوفة</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>10</td><td>صفيف_يحتوي_الجميع ARRAY_CONTAINS_ALL</td><td>مصفوفة</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>11</td><td>json_concontains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>11</td><td>مصفوفة_تحتوي_على_أي ARRAY_CONTAINS_ANY</td><td>مصفوفة</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>12</td><td>طول_المصفوفة ARRAY_LENGTH</td><td>مصفوفة</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>13</td><td>و&amp;و</td><td>BinaryLogicOp</td><td>من اليسار إلى اليمين</td></tr>
<tr><td>14</td><td>| أو</td><td>BinaryLogicOp</td><td>من اليسار إلى اليمين</td></tr>
</tbody>
</table>
<p>يتم تقييم التعبيرات عادةً من اليسار إلى اليمين. يتم تقييم التعبيرات المعقدة واحدًا تلو الآخر. يتم تحديد ترتيب تقييم التعبيرات حسب أسبقية العوامل المستخدمة.</p>
<p>إذا احتوى تعبير ما على عاملين أو أكثر بنفس الأسبقية، يتم تقييم العامل الموجود إلى اليسار أولاً.</p>
<div class="alert note">
<p>على سبيل المثال، سيتم تقييم 10/2 * 5 على أنه (10/2) والناتج مضروبًا في 5.</p>
</div>
<p>عندما يجب أن تتم معالجة عملية ذات أسبقية أقل أولاً، يجب أن تكون بين قوسين.</p>
<div class="alert note">
<p>على سبيل المثال، 30 / 2 + 8. يتم تقييم ذلك عادةً على أنه 30 مقسومًا على 2 ثم 8 مضافًا إلى الناتج. إذا كنت تريد القسمة على 2 + 8، يجب أن تُكتب على شكل 30 / (2 + 8).</p>
</div>
<p>يمكن تداخل الأقواس داخل التعبيرات. يتم تقييم التعبيرات القوسية الداخلية أولًا.</p>
<h2 id="Usage" class="common-anchor-header">الاستخدام<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم سرد نماذج لجميع استخدامات التعبيرات المنطقية المتاحة في ميلفوس على النحو التالي (<code translate="no">int64</code> يمثل الحقل القياسي الذي يحتوي على بيانات من نوع INT64، <code translate="no">float</code> يمثل الحقل القياسي الذي يحتوي على بيانات من نوع الفاصلة العائمة، و <code translate="no">VARCHAR</code> يمثل الحقل القياسي الذي يحتوي على بيانات من نوع VARCHAR):</p>
<ol>
<li>CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 &gt; 0&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;0 &lt; int64 &lt; 400&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;500 &lt;= int64 &lt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-type">VARCHAR</span> <span class="hljs-operator">&gt;</span> &quot;str1&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>BinaryLogicalOp والقوسين</li>
</ol>
<pre><code translate="no">&quot;(int64 &gt; <span class="hljs-number">0</span> &amp;&amp; int64 &lt; <span class="hljs-number">400</span>) or (int64 &gt; <span class="hljs-number">500</span> &amp;&amp; int64 &lt; <span class="hljs-number">1000</span>)&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>مصطلحExpr و UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">VARCHAR not in <span class="hljs-selector-attr">[<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr وBinaryLogicalOp وCmpOp (على حقول مختلفة)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp وCmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp و UnaryArithOp أو BinaryArithOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;200+300 &lt; int64 &lt;= 500+500&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="7">
<li>تطابق</li>
</ol>
<pre><code translate="no"><span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;prefix%&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;%suffix&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;%middle%&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;_suffix&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="8">
<li>JsonArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, JsonExpr)</code></p>
<p>إذا كان تعبير JSON الخاص بعبارة <code translate="no">JSON_CONTAINS</code> (الوسيطة الثانية) قائمة، فيجب أن يكون المعرف (الوسيطة الأولى) قائمة قائمة قائمة. خلاف ذلك، يتم تقييم العبارة دائمًا إلى خطأ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>يجب أن يكون تعبير JSON في عبارة <code translate="no">JSON_CONTAINS_ALL</code> دائمًا قائمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>يجب أن يكون تعبير JSON في عبارة <code translate="no">JSON_CONTAINS_ANY</code> دائمًا قائمة. وإلا فإنها تعمل مثل <code translate="no">JSON_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<ol start="9">
<li>مصفوفة</li>
</ol>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code></p>
<p>إذا كان تعبير المصفوفة في عبارة <code translate="no">ARRAY_CONTAINS</code> (الوسيطة الثانية) قائمة، فيجب أن يكون المعرف (الوسيطة الأولى) قائمة قائمة قائمة. وإلا فإن العبارة تُقيّم دائمًا على خطأ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>يجب أن يكون تعبير الصفيف في عبارة <code translate="no">ARRAY_CONTAINS_ALL</code> دائمًا قائمة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>يجب أن يكون تعبير الصفيف في عبارة <code translate="no">ARRAY_CONTAINS_ANY</code> دائمًا قائمة. وإلا فإنها تعمل مثل <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>تحقق من عدد العناصر في مصفوفة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن بعد أن تعرفت على كيفية عمل مجموعات البتات في ميلفوس، قد ترغب أيضًا في:</p>
<ul>
<li>تعلّم كيفية إجراء <a href="/docs/ar/multi-vector-search.md">بحث هجين</a>.</li>
<li>تعلم كيفية <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">استخدام السلاسل لتصفية</a> نتائج البحث.</li>
<li>تعلم كيفية <a href="/docs/ar/enable-dynamic-field.md">استخدام الحقول الديناميكية في بناء التعبيرات المنطقية</a>.</li>
</ul>
