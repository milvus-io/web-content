---
id: bitset.md
summary: تعرف على مجموعات البتات في Milvus.
title: مجموعة البتات
---
<h1 id="Bitset" class="common-anchor-header">مجموعة البتات<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع آلية مجموعة البتات التي تساعد في تمكين وظائف أساسية مثل تصفية السمات <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">وعمليات الحذف</a> في Milvus.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>مجموعة البتات (bitset) هي مجموعة من البتات. البتات هي عناصر لها قيمتان محتملتان فقط، وعادةً ما تكونا <code translate="no">0</code> و <code translate="no">1</code> ، أو القيم المنطقية <code translate="no">true</code> و <code translate="no">false</code>. في Milvus، مجموعات البتات هي مصفوفات من أرقام البتات <code translate="no">0</code> و <code translate="no">1</code> التي يمكن استخدامها لتمثيل بيانات معينة بشكل موجز وفعال، على عكس استخدام أرقام الصحيحية (ints) أو الأرقام العائمة (floats) أو الأحرف (chars). يكون الرقم الثنائي <code translate="no">0</code> بشكل افتراضي، ولا يتم تعيينه إلى <code translate="no">1</code> إلا إذا استوفى متطلبات معينة.</p>
<p>تُجرى العمليات على مجموعات البتات باستخدام <a href="/docs/ar/v2.6.x/boolean.md">المنطق البولياني</a>، حيث تكون قيمة الناتج إما صالحة أو غير صالحة، ويُشار إليها أيضًا بـ <code translate="no">1</code> و <code translate="no">0</code> على التوالي. على سبيل المثال، يمكن استخدام <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">العامل المنطقي</a> <code translate="no">AND</code> لمقارنة مجموعتي بتات بناءً على العناصر الموجودة في نفس مواقع الفهرس، مما ينتج عنه مجموعة بتات جديدة تحتوي على النتائج. إذا كان العنصران في موقع ما متطابقين، فسيتم كتابة <code translate="no">1</code> في ذلك الموقع في مجموعة البتات الجديدة؛ أما إذا كانا مختلفين، فسيتم كتابة <code translate="no">0</code>.</p>
<h2 id="Implementation" class="common-anchor-header">التنفيذ<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>مجموعة البتات هي آلية بسيطة لكنها قوية تساعد Milvus على إجراء تصفية السمات وحذف البيانات والاستعلام باستخدام ميزة «السفر عبر الزمن» (Time Travel).</p>
<h3 id="Attribute-filtering" class="common-anchor-header">تصفية السمات<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>نظرًا لأن مجموعات البتات لا تحتوي إلا على قيمتين محتملتين، فهي مثالية لتخزين نتائج <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">تصفية السمات</a>. يتم تمييز البيانات التي تستوفي متطلبات مرشح سمة معين بـ <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">حذف البيانات<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>تُعد مجموعات البتات طريقة موجزة لتخزين المعلومات حول ما إذا كان قد تم حذف صف في مقطع ما أم لا. يتم تمييز الكيانات المحذوفة بعلامة " <code translate="no">1</code> " في مجموعة البتات المقابلة، والتي <a href="https://milvus.io/blog/deleting-data-in-milvus.md">لن يتم حسابها</a> أثناء البحث أو الاستعلام.</p>
<h2 id="Examples" class="common-anchor-header">أمثلة<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>نقدم هنا ثلاثة أمثلة توضح كيفية استخدام مجموعات البتات في Milvus، مع الإشارة إلى جميع التطبيقات الرئيسية الثلاثة لمجموعات البتات التي تمت مناقشتها أعلاه. في الحالات الثلاث جميعها، يوجد مقطع يحتوي على 8 كيانات، ثم تحدث سلسلة من أحداث لغة معالجة البيانات (DML) بالترتيب الموضح أدناه.</p>
<ul>
<li>يتم إدراج أربعة من الكيانات، التي تكون قيم « <code translate="no">primary_key</code>» الخاصة بها هي [1، 2، 3، 4] على التوالي، عندما يساوي الطابع الزمني <code translate="no">ts</code> القيمة 100.</li>
<li>أما الكيانات الأربعة المتبقية، التي تبلغ قيم <code translate="no">primary_key</code>الخاصة بها [5، 6، 7، 8]، فيتم إدراجها عندما يساوي الطابع الزمني <code translate="no">ts</code> 200.</li>
<li>يتم حذف الكيانات التي تكون قيم <code translate="no">primary_key</code>الخاصة بها هي [7، 8] عندما يساوي الطابع الزمني <code translate="no">ts</code> 300.</li>
<li>فقط الكيانات التي تكون قيم <code translate="no">primary_key</code>s الخاصة بها هي [1، 3، 5، 7] هي التي تستوفي شروط تصفية السمات.</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>ترتيب أحداث DML</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">الحالة الأولى<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذه الحالة، يضبط المستخدم قيمة <code translate="no">time_travel</code> على 150، مما يعني أن المستخدم يجري استعلامًا على البيانات التي تستوفي <code translate="no">ts = 150</code>. توضح الشكل 1 عملية إنشاء مجموعة البتات.</p>
<p>خلال مرحلة التصفية الأولية، يجب أن يكون <code translate="no">filter_bitset</code> هو <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> ، حيث يتم تمييز الكيانات [1، 3، 5، 7] على أنها <code translate="no">1</code> لأنها نتائج تصفية صالحة.</p>
<p>ومع ذلك، لم يتم إدراج الكيانات [5، 6، 7، 8] في قاعدة بيانات المتجهات عندما يساوي <code translate="no">ts</code> 150. لذلك، يجب تمييز هذه الكيانات الأربعة بقيمة 0 بغض النظر عن شرط التصفية. والآن يجب أن تكون نتيجة مجموعة البتات هي <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>كما تمت مناقشته في <a href="#data-deletion">«حذف البيانات</a>»، يتم تجاهل الكيانات التي تم تمييزها بـ <code translate="no">1</code> أثناء البحث أو الاستعلام. يجب الآن عكس نتيجة مجموعة البتات (bitset) من أجل دمجها مع خريطة البتات الخاصة بالحذف، مما يعطينا <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>أما بالنسبة لمجموعة البتات الخاصة بالحذف <code translate="no">del_bitset</code> ، فيجب أن تكون القيمة الأولية <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. ومع ذلك، لا يتم حذف الكيانين 7 و8 حتى يصبح <code translate="no">ts</code> يساوي 300. لذلك، عندما يكون <code translate="no">ts</code> يساوي 150، يظل الكيانان 7 و8 صالحين. ونتيجة لذلك، تكون قيمة <code translate="no">del_bitset</code> بعد «السفر عبر الزمن» هي <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>الآن لدينا مجموعتا بتات بعد «السفر عبر الزمن» وتصفية السمات: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> و <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  اجمع هاتين المجموعتين باستخدام عامل المنطق الثنائي <code translate="no">OR</code>. القيمة النهائية لـ result_bitset هي <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ، مما يعني أنه سيتم حساب الكيانين 1 و 3 فقط في مرحلة البحث أو الاستعلام التالية.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>الشكل 1. البحث مع Time Travel = 150.</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">الحالة الثانية<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذه الحالة، يضبط المستخدم قيمة « <code translate="no">time_travel</code> » على 250. توضح الشكل 2 عملية إنشاء مجموعة البتات.</p>
<p>كما في الحالة الأولى، تكون قيمة « <code translate="no">filter_bitset</code> » الأولية هي <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>توجد جميع الكيانات في قاعدة البيانات المتجهة عندما تكون قيمة <code translate="no">ts</code> = 250. لذلك، تظل قيمة <code translate="no">filter_bitset</code> كما هي عند أخذ الطابع الزمني في الاعتبار. ومرة أخرى، نحتاج إلى عكس النتيجة للحصول على <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>أما بالنسبة لمجموعة بتات الحذف <code translate="no">del_bitset</code> ، فإن القيمة الأولية هي <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. ومع ذلك، لم يتم حذف الكيانين 7 و8 حتى وصلت قيمة <code translate="no">ts</code> إلى 300. وبالتالي، عندما تكون قيمة <code translate="no">ts</code> 250، يظل الكيانان 7 و8 صالحين. ونتيجة لذلك، فإن <code translate="no">del_bitset</code> بعد «السفر عبر الزمن» هي <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>الآن لدينا مجموعتا بتات بعد «السفر عبر الزمن» وتصفية السمات: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> و <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . نجمع هاتين المجموعتين باستخدام عامل المنطق الثنائي « <code translate="no">OR</code> ». تكون مجموعة البتات الناتجة (result_bitset) هي <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. أي أن الكيانات [1، 3، 5، 7] فقط هي التي سيتم حسابها في مرحلة البحث أو الاستعلام التالية.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>الشكل 2. البحث مع «السفر عبر الزمن» = 250.</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">الحالة الثالثة<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذه الحالة، يضبط المستخدم قيمة « <code translate="no">time_travel</code> » على 350. توضح الشكل 3 عملية توليد مجموعة البتات.</p>
<p>وكما في الحالات السابقة، فإن قيمة « <code translate="no">filter_bitset</code> » الأولية هي <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>توجد جميع الكيانات في قاعدة بيانات المتجهات عندما تكون قيمة <code translate="no">ts</code>= 350. وبالتالي، فإن القيمة النهائية المقلوبة لـ <code translate="no">filter_bitset</code> هي <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> ، وهي نفس القيمة الموجودة في الحالة الثانية.</p>
<p>أما بالنسبة لمجموعة بتات الحذف <code translate="no">del_bitset</code> ، وبما أن الكيانين 7 و8 قد تم حذفهما بالفعل عندما كان <code translate="no">ts = 350</code> ، فإن نتيجة <code translate="no">del_bitset</code> هي <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>الآن لدينا مجموعتا بتات بعد «السفر عبر الزمن» وتصفية السمات: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> و <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  نقوم بدمج هاتين المجموعتين باستخدام عامل المنطق الثنائي « <code translate="no">OR</code> ». النتيجة النهائية لـ « <code translate="no">result_bitset</code> » هي <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. أي أن الكيانات [1، 3، 5] فقط هي التي سيتم حسابها في مرحلة البحث أو الاستعلام التالية.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>الشكل 3. البحث مع «السفر عبر الزمن» = 350.</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">ماذا بعد ذلك<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن بعد أن تعرفت على كيفية عمل مجموعات البتات في Milvus، قد ترغب أيضًا في:</p>
<ul>
<li>تعلم كيفية <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">استخدام السلاسل لتصفية</a> نتائج البحث، أو الرجوع إلى <a href="https://milvus.io/docs/hybridsearch.md">«البحث الهجين»</a> في وثائقنا.</li>
<li>فهم <a href="https://milvus.io/docs/v2.1.x/data_processing.md">كيفية معالجة البيانات</a> في Milvus.</li>
</ul>
