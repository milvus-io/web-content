---
id: timestamp.md
title: الطابع الزمني في ميلفوس
summary: >-
  تعرّف على مفهوم الطابع الزمني والمعلمات الأربعة الرئيسية المتعلقة بالطابع
  الزمني في قاعدة بيانات متجه ميلفوس.
---
<h1 id="Timestamp" class="common-anchor-header">الطابع الزمني<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>يشرح هذا الموضوع مفهوم الطابع الزمني ويقدم المعلمات الأربعة الرئيسية المتعلقة بالطابع الزمني في قاعدة بيانات متجه ميلفوس.</p>
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
    </button></h2><p>Milvus هي قاعدة بيانات متجهة يمكنها البحث والاستعلام عن المتجهات المحولة من بيانات غير منظمة. عند إجراء عملية بلغة معالجة البيانات (DML)، بما في ذلك <a href="https://milvus.io/docs/v2.1.x/data_processing.md">إدراج البيانات وحذفها،</a> تقوم Milvus بتعيين طوابع زمنية للكيانات المشاركة في العملية. لذلك، تحتوي جميع الكيانات في Milvus على سمة الطابع الزمني. وتشترك مجموعات الكيانات في نفس عملية DML في نفس قيمة الطابع الزمني.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">معلمات الطابع الزمني<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تضمين العديد من المعلمات المتعلقة بالطابع الزمني عند إجراء بحث أو استعلام تشابه متجه في Milvus.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> هي نوع من الطوابع الزمنية المستخدمة للتأكد من أن جميع تحديثات البيانات بواسطة عمليات DML قبل <code translate="no">Guarantee_timestamp</code> تكون مرئية عند إجراء بحث أو استعلام تشابه متجه. على سبيل المثال، إذا قمت بإدراج دفعة من البيانات في الساعة 3 مساءً، ودفعة أخرى في الساعة 5 مساءً، وتم تعيين قيمة <code translate="no">Guarantee_timestamp</code> على أنها 6 مساءً أثناء إجراء بحث تشابه المتجهات. هذا يعني أن دفعتي البيانات التي تم إدراجها في الساعة 3 مساءً و5 مساءً على التوالي يجب أن تكونا متضمنتين في البحث.</p>
<p>إذا لم يتم تكوين <code translate="no">Guarantee_timestamp</code> ، فإن ميلفوس يأخذ تلقائيًا النقطة الزمنية التي يتم فيها طلب البحث. لذلك، يتم إجراء البحث على طريقة عرض البيانات مع جميع تحديثات البيانات بواسطة عمليات DML قبل البحث.</p>
<p>لتوفير عناء فهم <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> داخل Milvus، لا يتعين عليك كمستخدم تكوين معلمة <code translate="no">Guarantee_timestamp</code> مباشرةً. تحتاج فقط إلى اختيار <a href="https://milvus.io/docs/v2.1.x/consistency.md">مستوى الات</a>ساق، ويتعامل Milvus تلقائيًا مع المعلمة <code translate="no">Guarantee_timestamp</code> نيابةً عنك. يتوافق كل مستوى تناسق مع قيمة <code translate="no">Guarantee_timestamp</code> معينة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">مثال</h4><p>كما هو موضح في الرسم التوضيحي أعلاه، يتم تعيين قيمة <code translate="no">Guarantee_timestamp</code> على أنها <code translate="no">2021-08-26T18:15:00</code> (للتبسيط، يتم تمثيل الطابع الزمني في هذا المثال بالوقت الفعلي). عند إجراء بحث أو استعلام، يتم البحث أو الاستعلام عن جميع البيانات قبل 2021-08-26T18:15:00.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> هو نوع من الطوابع الزمنية التي يتم إنشاؤها وإدارتها تلقائيًا بواسطة عقد الاستعلام في Milvus. يتم استخدامه للإشارة إلى عمليات DML التي يتم تنفيذها بواسطة عقد الاستعلام.</p>
<p>يمكن تصنيف البيانات التي تديرها عقد الاستعلام إلى نوعين:</p>
<ul>
<li><p>البيانات التاريخية (أو تسمى أيضًا البيانات الدفعية)</p></li>
<li><p>البيانات التزايدية (أو تسمى أيضاً البيانات المتدفقة).</p></li>
</ul>
<p>في ميلفوس، تحتاج إلى تحميل البيانات قبل إجراء بحث أو استعلام. لذلك، يتم تحميل البيانات الدفعية في المجموعة بواسطة عقدة الاستعلام قبل إجراء بحث أو طلب استعلام. ومع ذلك، يتم إدراج البيانات المتدفقة في Milvus أو حذفها منه بشكل سريع، الأمر الذي يتطلب من عقدة الاستعلام الاحتفاظ بجدول زمني لعمليات DML وطلبات البحث أو الاستعلام. ونتيجةً لذلك، تستخدم عقد الاستعلام <code translate="no">Service_timestamp</code> للاحتفاظ بمثل هذا الجدول الزمني. <code translate="no">Service_timestamp</code> يمكن اعتباره النقطة الزمنية التي تكون فيها بيانات معينة مرئية حيث يمكن لعقد الاستعلام التأكد من اكتمال جميع عمليات DML قبل <code translate="no">Service_timestamp</code>.</p>
<p>عند وجود طلب بحث أو استعلام وارد، تقوم عقدة الاستعلام بمقارنة قيم <code translate="no">Service_timestamp</code> و <code translate="no">Guarantee_timestamp</code>. هناك سيناريوهان أساسيان.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">السيناريو 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>كما هو موضح في الشكل 1، يتم تعيين قيمة <code translate="no">Guarantee_timestamp</code> على أنها <code translate="no">2021-08-26T18:15:00</code>. عندما يتم زيادة قيمة <code translate="no">Service_timestamp</code> إلى <code translate="no">2021-08-26T18:15:01</code> ، فهذا يعني أن جميع عمليات DML قبل هذه النقطة الزمنية يتم تنفيذها وإكمالها بواسطة عقدة الاستعلام، بما في ذلك عمليات DML قبل الوقت المشار إليه <code translate="no">Guarantee_timestamp</code>. ونتيجة لذلك، يمكن تنفيذ طلب البحث أو الاستعلام على الفور.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">السيناريو 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>كما هو موضح في الشكل 2، يتم تعيين قيمة <code translate="no">Guarantee_timestamp</code> على أنها <code translate="no">2021-08-26T18:15:00</code> ، والقيمة الحالية لـ <code translate="no">Service_timestamp</code> هي فقط <code translate="no">2021-08-26T18:14:55</code>. هذا يعني أن عمليات DML فقط قبل <code translate="no">2021-08-26T18:14:55</code> يتم تنفيذها وإكمالها، تاركًا جزءًا من عمليات DML بعد هذه النقطة الزمنية ولكن قبل <code translate="no">Guarantee_timestamp</code> غير مكتملة. إذا تم تنفيذ البحث أو الاستعلام عند هذه النقطة، فإن بعض البيانات المطلوبة تكون غير مرئية وغير متوفرة بعد، مما يؤثر بشكل خطير على دقة نتائج البحث أو الاستعلام. لذلك، تحتاج عقدة الاستعلام إلى تأجيل طلب البحث أو الاستعلام حتى تكتمل عمليات DML قبل <code translate="no">guarantee_timestamp</code> (أي عندما <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>من الناحية الفنية، <code translate="no">Graceful_time</code> ليس طابعًا زمنيًا، بل هو فترة زمنية (على سبيل المثال 100 مللي ثانية). ومع ذلك، فإن <code translate="no">Graceful_time</code> جدير بالذكر لأنه يرتبط ارتباطًا وثيقًا بـ <code translate="no">Guarantee_timestamp</code> و <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> هو معلمة قابلة للتكوين في ملف تكوين ميلفوس. يتم استخدامه للإشارة إلى الفترة الزمنية التي يمكن تحملها قبل أن تصبح بيانات معينة مرئية. باختصار، يمكن التسامح مع عمليات DML غير المكتملة أثناء <code translate="no">Graceful_time</code>.</p>
<p>عندما يكون هناك طلب بحث أو استعلام وارد، يمكن أن يكون هناك سيناريوهان.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>وقت_المهلة</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">السيناريو 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>كما هو موضح في الشكل 1، يتم تعيين قيمة <code translate="no">Guarantee_timestamp</code> على أنها <code translate="no">2021-08-26T18:15:01</code> ، و <code translate="no">Graceful_time</code> على أنها <code translate="no">2s</code>. تتم زيادة قيمة <code translate="no">Service_timestamp</code> إلى <code translate="no">2021-08-26T18:15:00</code>. على الرغم من أن قيمة <code translate="no">Service_timestamp</code> لا تزال أصغر من قيمة <code translate="no">Guarantee_timestamp</code> ولا تكتمل جميع عمليات DML قبل <code translate="no">2021-08-26T18:15:01</code> ، يتم التسامح مع فترة ثانيتين من عدم رؤية البيانات كما هو موضح في قيمة <code translate="no">Graceful_time</code>. لذلك، يمكن تنفيذ طلب البحث أو الاستعلام الوارد على الفور.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">السيناريو 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>كما هو موضح في الشكل 2، يتم تعيين قيمة <code translate="no">Guarantee_timestamp</code> على أنها <code translate="no">2021-08-26T18:15:01</code> ، و <code translate="no">Graceful_time</code> على أنها <code translate="no">2s</code>. القيمة الحالية لـ <code translate="no">Service_timestamp</code> هي <code translate="no">2021-08-26T18:14:54</code> فقط، وهذا يعني أن عمليات DML المتوقعة لم تكتمل بعد وحتى مع إعطاء ثانيتين من الوقت المريح، لا يزال إخفاء البيانات غير محتمل. لذلك، تحتاج عقدة الاستعلام إلى تأجيل البحث أو طلب الاستعلام حتى تكتمل طلبات DML معينة (أي عندما <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
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
    </button></h2><ul>
<li>تعلم كيف <a href="/docs/ar/consistency.md">يتيح الطابع الزمني المضمون الاتساق القابل للضبط في Milvus</a></li>
</ul>
