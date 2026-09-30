---
id: consistency.md
summary: تعرف على مستويات الاتساق الأربعة في ميلفوس.
title: الاتساق
---
<h1 id="Consistency" class="common-anchor-header">الاتساق<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع مستويات الاتساق الأربعة في ميلفوس والسيناريوهات الأنسب لها. كما يتناول هذا الموضوع الآلية الكامنة وراء ضمان الاتساق في ميلفوس.</p>
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
    </button></h2><p>يشير الاتساق في قاعدة البيانات الموزعة على وجه التحديد إلى الخاصية التي تضمن أن كل عقدة أو نسخة متماثلة لديها نفس طريقة عرض البيانات عند كتابة أو قراءة البيانات في وقت معين.</p>
<p>يدعم ميلفوس أربعة مستويات من الاتساق: الاتساق القوي، والثبات المحدود، والجلسة، وفي النهاية. مستوى الاتساق الافتراضي في ميلفوس هو مستوى الاتساق المحدود.  يمكنك بسهولة ضبط مستوى الاتساق عند إجراء <a href="/docs/ar/single-vector-search.md">بحث أحادي المتجه</a> أو <a href="/docs/ar/multi-vector-search.md">بحث مختلط</a> أو <a href="/docs/ar/get-and-scalar-query.md">استعلام</a> لجعله يناسب تطبيقك على أفضل وجه.</p>
<h2 id="Consistency-levels" class="common-anchor-header">مستويات الاتساق<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>كما هو محدد في نظرية <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC،</a> يجب على قاعدة البيانات الموزعة أن تفاضل بين الاتساق والتوافر والكمون. ينطوي الاتساق العالي على دقة عالية ولكن أيضًا زمن انتقال عالٍ للبحث، بينما يؤدي الاتساق المنخفض إلى سرعة بحث سريعة ولكن مع فقدان معين في رؤية البيانات. لذلك، تناسب مستويات الاتساق المختلفة سيناريوهات مختلفة.</p>
<p>فيما يلي شرح للاختلافات بين مستويات الاتساق الأربعة التي يدعمها ميلفوس والسيناريوهات التي تناسب كل منها.</p>
<h3 id="Strong" class="common-anchor-header">قوي<button data-href="#Strong" class="anchor-icon" translate="no">
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
    </button></h3><p>المستوى القوي هو أعلى مستويات الاتساق وأكثرها صرامة. يضمن أن يتمكن المستخدمون من قراءة أحدث إصدار من البيانات.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>الاتساق القوي</span> </span></p>
<p>وفقًا لنظرية PACELC، إذا تم ضبط مستوى الاتساق على قوي، سيزداد زمن الاستجابة. لذلك، نوصي باختيار الاتساق القوي أثناء الاختبارات الوظيفية لضمان دقة نتائج الاختبار. كما أن الاتساق القوي هو الأنسب للتطبيقات التي لديها طلب صارم على اتساق البيانات على حساب سرعة البحث. مثال على ذلك يمكن أن يكون نظاماً مالياً عبر الإنترنت يتعامل مع مدفوعات الطلبات والفواتير.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">التقادم المحدود<button data-href="#Bounded-staleness" class="anchor-icon" translate="no">
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
    </button></h3><p>يسمح التقادم المحدود، كما يوحي اسمه، بعدم اتساق البيانات خلال فترة زمنية معينة. ومع ذلك، بشكل عام، تكون البيانات متسقة دائمًا بشكل عام خارج تلك الفترة الزمنية.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>اتساق التقادم المحدود</span> </span></p>
<p>يعد الثبات المحدود مناسبًا للسيناريوهات التي تحتاج إلى التحكم في زمن انتقال البحث ويمكن أن تقبل عدم اتساق البيانات المتقطع. على سبيل المثال، في أنظمة التوصية مثل محركات التوصية بالفيديو، يكون لعدم ظهور البيانات أحيانًا تأثير ضئيل على معدل الاستدعاء الإجمالي، ولكن يمكن أن يعزز أداء نظام التوصية بشكل كبير.</p>
<h3 id="Session" class="common-anchor-header">الجلسة<button data-href="#Session" class="anchor-icon" translate="no">
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
    </button></h3><p>تضمن الجلسة أن جميع عمليات كتابة البيانات يمكن إدراكها على الفور في القراءة خلال نفس الجلسة. بعبارة أخرى، عند كتابة البيانات عبر عميل واحد، تصبح البيانات المدرجة حديثًا قابلة للبحث على الفور.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>اتساق جلسة العمل</span> </span></p>
<p>نوصي باختيار جلسة العمل كمستوى اتساق لتلك السيناريوهات التي يكون فيها الطلب على اتساق البيانات في نفس الجلسة مرتفعًا. يمكن أن يكون أحد الأمثلة على ذلك حذف بيانات إدخال كتاب من نظام المكتبة، وبعد تأكيد الحذف وتحديث الصفحة (جلسة مختلفة)، يجب ألا يكون الكتاب مرئيًا في نتائج البحث.</p>
<h3 id="Eventually" class="common-anchor-header">في النهاية<button data-href="#Eventually" class="anchor-icon" translate="no">
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
    </button></h3><p>لا يوجد ترتيب مضمون لعمليات القراءة والكتابة، وتتقارب النسخ المتماثلة في النهاية إلى نفس الحالة بالنظر إلى عدم إجراء عمليات كتابة أخرى. في ظل الاتساق "في نهاية المطاف"، تبدأ النسخ المتماثلة العمل على طلبات القراءة بأحدث القيم المحدثة. الاتساق النهائي هو المستوى الأضعف بين المستويات الأربعة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>الاتساق النهائي</span> </span></p>
<p>ومع ذلك، وفقًا لنظرية PACELC، يمكن تقصير زمن انتقال البحث بشكل كبير عند التضحية بالاتساق. ولذلك، فإن الاتساق النهائي هو الأنسب للسيناريوهات التي لا تتطلب طلبًا كبيرًا على اتساق البيانات ولكنها تتطلب أداء بحث سريعًا للغاية. من الأمثلة على ذلك استرجاع مراجعات وتقييمات منتجات أمازون بمستوى الاتساق النهائي.</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">ضمان الطابع الزمني<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>يحقق ميلفوس مستويات اتساق مختلفة من خلال تقديم <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">الطابع الزمني</a> للضمان (GuaranteeTs).</p>
<p>يعمل GuaranteeTs على إبلاغ عقد الاستعلام بأنه لن يتم تنفيذ طلب البحث أو الاستعلام حتى يمكن رؤية جميع البيانات قبل GuaranteeTs من قبل عقد الاستعلام. عند تحديد مستوى الاتساق، سيتم تعيين مستوى الاتساق إلى قيمة GuaranteeTs محددة. تتوافق قيم GuaranteeTs المختلفة مع مستويات اتساق مختلفة:</p>
<ul>
<li><p><strong>قوي</strong>: يتم تعيين GuaranteeTs على أنها مطابقة لأحدث طابع زمني للنظام، وتنتظر عقد الاستعلام حتى يمكن رؤية جميع البيانات قبل الطابع الزمني الأحدث للنظام، قبل معالجة طلب البحث أو الاستعلام.</p></li>
<li><p><strong>التقادم المحدود</strong>: يتم تعيين GuaranteeTs على أنه أصغر نسبيًا من الطابع الزمني الأحدث للنظام، وتبحث عقد الاستعلام على عرض بيانات مقبولة وأقل تحديثًا.</p></li>
<li><p><strong>جلسة</strong>: يستخدم العميل الطابع الزمني لأحدث عملية كتابة كـ GuaranteeTs، بحيث يمكن لكل عميل على الأقل استرداد البيانات التي أدخلها نفس العميل.</p></li>
<li><p><strong>في النهاية</strong>: يتم تعيين GuaranteeTs على قيمة صغيرة جدًا لتخطي التحقق من الاتساق. تبحث عقد الاستعلام على الفور في طريقة عرض البيانات الموجودة.</p></li>
</ul>
<p>راجع <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">كيفية عمل GuaranteeTs</a> للمزيد من المعلومات حول الآلية الكامنة وراء ضمان مستويات مختلفة من الاتساق في ميلفوس.</p>
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
<li>تعرف على كيفية ضبط مستوى الاتساق عند:<ul>
<li><a href="/docs/ar/single-vector-search.md">إجراء بحث أحادي المتجه</a></li>
<li><a href="/docs/ar/multi-vector-search.md">إجراء بحث مختلط</a></li>
<li><a href="/docs/ar/get-and-scalar-query.md">إجراء استعلام قياسي</a></li>
</ul></li>
</ul>
