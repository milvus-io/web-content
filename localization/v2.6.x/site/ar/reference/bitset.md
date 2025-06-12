---
id: bitset.md
summary: تعرف على مجموعات البتات في ميلفوس.
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
    </button></h1><p>يقدم هذا الموضوع آلية مجموعة البتات التي تساعد في تمكين الوظائف الرئيسية مثل تصفية السمات <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">وعمليات الحذف</a> في ميلفوس.</p>
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
    </button></h2><p>مجموعة البتات هي مجموعة من البتات. البتات هي عناصر ذات قيمتين محتملتين فقط، عادةً <code translate="no">0</code> و <code translate="no">1</code> ، أو قيم منطقية <code translate="no">true</code> و <code translate="no">false</code>. في ميلفوس، مجموعات البتات هي صفائف من أرقام البتات <code translate="no">0</code> و <code translate="no">1</code> التي يمكن استخدامها لتمثيل بيانات معينة بشكل مضغوط وفعال على عكس الإنتس أو العوامة أو الأحرف. رقم البت هو <code translate="no">0</code> بشكل افتراضي ولا يتم تعيينه إلى <code translate="no">1</code> إلا إذا كان يفي بمتطلبات معينة.</p>
<p>تُجرى العمليات على مجموعات البت باستخدام <a href="/docs/ar/boolean.md">المنطق المنطقي،</a> والتي بموجبها تكون قيمة الخرج إما صالحة أو غير صالحة، ويُشار إليها أيضًا بـ <code translate="no">1</code> و <code translate="no">0</code> على التوالي. على سبيل المثال، يمكن استخدام <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">المشغل المنطقي</a> <code translate="no">AND</code> للمقارنة بين مجموعتي بتات استنادًا إلى عنصرين في نفس مواضع الفهرس وإنتاج مجموعة بتات جديدة بالنتائج. إذا كان عنصران في موضع ما متماثلين، فسيتم كتابة مجموعة البتات الجديدة <code translate="no">1</code> في ذلك الموضع؛ <code translate="no">0</code> إذا كانا مختلفين.</p>
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
    </button></h2><p>Bitset هي آلية بسيطة لكنها قوية تساعد ميلفوس على تنفيذ تصفية السمات وحذف البيانات والاستعلام مع السفر عبر الزمن.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">تصفية السمات</h3><p>بما أن مجموعات البت تحتوي على قيمتين محتملتين فقط، فهي مثالية لتخزين نتائج <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">تصفية السمات</a>. يتم تمييز البيانات التي تفي بمتطلبات مرشح سمة معينة بـ <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">حذف البيانات</h3><p>تعمل مجموعات البتات كطريقة مضغوطة لتخزين المعلومات حول ما إذا كان صف في مقطع ما قد تم حذفه. يتم وضع علامة على الكيانات المحذوفة بـ <code translate="no">1</code> في مجموعة البتات المقابلة، والتي <a href="https://milvus.io/blog/deleting-data-in-milvus.md">لن يتم حسابها</a> أثناء البحث أو الاستعلام.</p>
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
    </button></h2><p>نقدم هنا ثلاثة أمثلة توضح كيفية استخدام مجموعات البتات في ميلفوس، مع إشارات إلى جميع التطبيقات الرئيسية الثلاثة لمجموعات البتات التي تمت مناقشتها أعلاه. في جميع الحالات الثلاث، يوجد مقطع يحتوي على 8 كيانات ثم يتم تنفيذ سلسلة من أحداث لغة معالجة البيانات (DML) بالترتيب الموضح أدناه.</p>
<ul>
<li>يتم إدراج أربعة من الكيانات، التي تكون <code translate="no">primary_key</code>s [1، 2، 3، 4] على التوالي، عندما يساوي الطابع الزمني <code translate="no">ts</code> 100.</li>
<li>يتم إدراج الكيانات الأربعة الباقية، التي <code translate="no">primary_key</code>s هي [5، 6، 7، 8]، عندما يساوي الطابع الزمني <code translate="no">ts</code> 200.</li>
<li>يتم حذف الكيانات التي <code translate="no">primary_key</code>s هي [7، 8] عندما يساوي الطابع الزمني <code translate="no">ts</code> 300.</li>
<li>الكيانات التي تكون <code translate="no">primary_key</code>s [1، 3، 5، 7] هي فقط الكيانات التي تكون s [1، 3، 5، 7] التي تستوفي شروط تصفية السمات.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>ترتيب أحداث DML</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">الحالة الأولى</h3><p>في هذه الحالة، يقوم المستخدم بتعيين <code translate="no">time_travel</code> على أنه 150، مما يعني أن المستخدم يجري استعلامًا عن البيانات التي تفي <code translate="no">ts = 150</code>. يوضح الشكل 1 عملية توليد مجموعة البتات.</p>
<p>أثناء مرحلة التصفية الأولية، يجب أن يكون <code translate="no">filter_bitset</code> <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> ، حيث يتم تمييز الكيانات [1، 3، 5، 7] على أنها <code translate="no">1</code> لأنها نتائج تصفية صالحة.</p>
<p>ومع ذلك، لم يتم إدراج الكيانات [4، 5، 6، 7] في قاعدة بيانات المتجهات عندما <code translate="no">ts</code> يساوي 150. لذلك، يجب تمييز هذه الكيانات الأربعة على أنها 0 بغض النظر عن شرط التصفية. الآن يجب أن تكون نتيجة مجموعة البتات <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>كما تمت مناقشته في <a href="#data-deletion">حذف البيانات،</a> يتم تجاهل الكيانات التي تم تمييزها بـ <code translate="no">1</code> أثناء البحث أو الاستعلام. يجب الآن قلب نتيجة مجموعة البتات لكي يتم دمجها مع الصورة النقطية للحذف، مما يعطينا <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>أما بالنسبة لمجموعة بتات الحذف <code translate="no">del_bitset</code> ، فيجب أن تكون القيمة الأولية <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. ومع ذلك، لا يتم حذف الكيانين 7 و 8 حتى <code translate="no">ts</code> هو 300. لذلك، عندما يكون <code translate="no">ts</code> هو 150، فإن الكيانين 7 و 8 لا يزالان صالحين. ونتيجة لذلك، فإن القيمة <code translate="no">del_bitset</code> بعد السفر عبر الزمن هي <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>لدينا الآن مجموعتا بت بعد السفر عبر الزمن وتصفية السمة: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> و <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  اجمع بين مجموعتي البت هاتين مع عامل المنطق الثنائي <code translate="no">OR</code>. القيمة النهائية لـ result_bitset هي <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ، مما يعني أنه سيتم حساب الكيانين 1 و 3 فقط في مرحلة البحث أو الاستعلام التالية.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>الشكل 1. البحث مع السفر عبر الزمن = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">الحالة الثانية</h3><p>في هذه الحالة، يضبط المستخدم <code translate="no">time_travel</code> على 250. يوضح الشكل 2 عملية توليد مجموعة البتات.</p>
<p>كما في الحالة الأولى، تكون مجموعة البتات الأولية <code translate="no">filter_bitset</code> هي <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>تكون جميع الكيانات في قاعدة بيانات المتجهات عندما يكون <code translate="no">ts</code> = 250. ولذلك، يبقى <code translate="no">filter_bitset</code> كما هو عندما نحلل الطابع الزمني. مرة أخرى، نحتاج إلى قلب النتيجة والحصول على <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>أما بالنسبة لمجموعة البتات المحذوفة <code translate="no">del_bitset</code> ، فإن القيمة الأولية هي <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. ومع ذلك، لم يتم حذف الكيانين 7 و 8 حتى <code translate="no">ts</code> هو 300. لذلك، عندما يكون <code translate="no">ts</code> هو 250، فإن الكيانين 7 و 8 لا يزالان صالحين. ونتيجة لذلك، فإن <code translate="no">del_bitset</code> بعد السفر عبر الزمن هو <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>الآن لدينا مجموعتا بت بعد السفر عبر الزمن وتصفية السمة: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> و <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . اجمع بين مجموعتي البت هاتين مع عامل المنطق الثنائي <code translate="no">OR</code>. مجموعة_البتات الناتجة هي <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. وهذا يعني أنه لن يتم احتساب سوى العناصر [1، 3، 5، 7] في مرحلة البحث أو الاستعلام التالية.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>الشكل 2. البحث مع السفر عبر الزمن = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">الحالة الثالثة</h3><p>في هذه الحالة، يضبط المستخدم <code translate="no">time_travel</code> على 350. يوضح الشكل 3 عملية توليد مجموعة البتات.</p>
<p>كما هو الحال مع الحالات السابقة، تكون مجموعة البتات الأولية <code translate="no">filter_bitset</code> هي <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>تكون جميع الكيانات في قاعدة بيانات المتجهات عندما يكون <code translate="no">ts</code>= 350. وبالتالي، فإن مجموعة البتات النهائية المقلوبة <code translate="no">filter_bitset</code> هي <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> ، كما في الحالة الثانية.</p>
<p>أما بالنسبة إلى مجموعة البتات المحذوفة <code translate="no">del_bitset</code> ، نظرًا لأن الكيانين 7 و 8 قد تم حذفهما بالفعل عند <code translate="no">ts = 350</code> ، وبالتالي، فإن نتيجة <code translate="no">del_bitset</code> هي <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>الآن لدينا مجموعتا بت بعد السفر عبر الزمن وتصفية السمات: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> و <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  اجمع بين مجموعتي البت هاتين مع عامل المنطق الثنائي <code translate="no">OR</code>. النهائي <code translate="no">result_bitset</code> هو <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. وهذا يعني أنه سيتم حساب الكيانات [1، 3، 5] فقط في مرحلة البحث أو الاستعلام التالية.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>الشكل 3. البحث مع السفر عبر الزمن = 350</span>. </span></p>
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
    </button></h2><p>الآن بعد أن عرفت كيف تعمل مجموعات البتات في ميلفوس، قد ترغب أيضًا بـ</p>
<ul>
<li>تعلّم كيفية <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">استخدام السلاسل لتصفية</a> نتائج البحث، أو راجع <a href="https://milvus.io/docs/hybridsearch.md">البحث الهجين</a> في مستنداتنا.</li>
<li>فهم <a href="https://milvus.io/docs/v2.1.x/data_processing.md">كيفية معالجة البيانات</a> في ملفوس.</li>
</ul>
