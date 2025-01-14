---
id: time_sync.md
title: مزامنة الوقت
summary: تعرف على نظام مزامنة الوقت في ميلفوس.
---
<h1 id="Time-Synchronization" class="common-anchor-header">مزامنة الوقت<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع آلية مزامنة الوقت في ميلفوس.</p>
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
    </button></h2><p>يمكن تصنيف الأحداث في ميلفوس بشكل عام إلى نوعين:</p>
<ul>
<li><p>أحداث لغة تعريف البيانات (DDL): إنشاء/إسقاط مجموعة، إنشاء/إسقاط قسم، إلخ.</p></li>
<li><p>أحداث لغة معالجة البيانات (DML): إدراج، بحث، إلخ.</p></li>
</ul>
<p>يتم تمييز أي حدث، بغض النظر عن كونه حدث لغة تعريف البيانات (DDL) أو حدث لغة معالجة البيانات (DML)، بطابع زمني يمكن أن يشير إلى وقت وقوع هذا الحدث.</p>
<p>لنفترض أن هناك مستخدمين اثنين يقومان ببدء سلسلة من أحداث لغة معالجة البيانات (DML) و DDL في ميلفوس بالترتيب الزمني الموضح في الجدول التالي.</p>
<table>
<thead>
<tr><th style="text-align:center">الطابع الزمني</th><th style="text-align:center">المستخدم 1</th><th style="text-align:center">المستخدم 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">أنشأ مجموعة باسم <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">إجراء بحث على المجموعة <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">تم إدراج البيانات <code translate="no">A1</code> في المجموعة <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">إجراء بحث في المجموعة <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">تم إدراج البيانات <code translate="no">A2</code> في المجموعة <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">إجراء بحث في المجموعة <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">تم حذف البيانات <code translate="no">A1</code> من المجموعة <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">إجراء بحث في المجموعة <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>من الناحية المثالية، يجب أن يكون المستخدم 2 قادرًا على رؤية</p>
<ul>
<li><p>مجموعة فارغة <code translate="no">C0</code> في <code translate="no">t2</code>.</p></li>
<li><p>البيانات <code translate="no">A1</code> في <code translate="no">t7</code>.</p></li>
<li><p>كل من البيانات <code translate="no">A1</code> و <code translate="no">A2</code> على <code translate="no">t12</code>.</p></li>
<li><p>البيانات فقط <code translate="no">A2</code> في <code translate="no">t17</code> (حيث تم حذف البيانات <code translate="no">A1</code> من المجموعة قبل هذه النقطة).</p></li>
</ul>
<p>يمكن تحقيق هذا السيناريو المثالي بسهولة عندما تكون هناك عقدة واحدة فقط. ومع ذلك، فإن ميلفوس عبارة عن قاعدة بيانات متجهة موزعة، ولضمان الحفاظ على جميع عمليات DML وDDL في العقد المختلفة بالترتيب، يحتاج ميلفوس إلى معالجة المشكلتين التاليتين</p>
<ol>
<li><p>تختلف الساعة الزمنية للمستخدمين الاثنين في المثال أعلاه إذا كانا على عقد مختلفة. على سبيل المثال، إذا كان المستخدم 2 متأخرًا بـ 24 ساعة عن المستخدم 1، فإن جميع العمليات التي يقوم بها المستخدم 1 لا تكون مرئية للمستخدم 2 حتى اليوم التالي.</p></li>
<li><p>يمكن أن يكون هناك تأخير في الشبكة. إذا أجرى المستخدم 2 بحثًا على المجموعة <code translate="no">C0</code> على <code translate="no">t17</code> ، يجب أن يكون ميلفوس قادرًا على ضمان معالجة جميع العمليات قبل <code translate="no">t17</code> وإتمامها بنجاح. إذا تأخرت عملية الحذف على الموقع <code translate="no">t15</code> بسبب زمن انتقال الشبكة، فمن المحتمل جدًا أن يظل بإمكان المستخدم 2 رؤية البيانات المفترض حذفها <code translate="no">A1</code> عند إجراء بحث على <code translate="no">t17</code>.</p></li>
</ol>
<p>لذلك، يتبنى ميلفوس نظام مزامنة الوقت (timetick) لحل المشكلة.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">أوراكل الطابع الزمني (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>لحل المشكلة الأولى المذكورة في القسم السابق، يوفر ميلفوس، مثل الأنظمة الموزعة الأخرى، خدمة أوراكل الطابع الزمني (TSO). هذا يعني أنه يجب تخصيص جميع الأحداث في Milvus بطابع زمني من TSO بدلاً من الساعة المحلية.</p>
<p>يتم توفير خدمة TSO من قبل المنسق الجذر في Milvus. يمكن للعملاء تخصيص طابع زمني واحد أو أكثر في طلب تخصيص طابع زمني واحد.</p>
<p>الطابع الزمني TSO هو نوع من القيمة <code translate="no">uint64</code> التي تتكون من جزء مادي وجزء منطقي. يوضح الشكل أدناه تنسيق الطابع الزمني.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>كما هو موضح، فإن ال 46 بت في البداية هي الجزء المادي، أي التوقيت العالمي المنسق بالمللي ثانية. آخر 18 بت هو الجزء المنطقي.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">نظام مزامنة الوقت (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم هذا القسم مثالاً لعملية إدخال بيانات لشرح آلية مزامنة الوقت في ميلفوس.</p>
<p>عندما يتلقى الوكيل طلب إدراج بيانات من SDK، فإنه يقسم رسائل الإدراج إلى تدفقات رسائل مختلفة (<code translate="no">MsgStream</code>) وفقًا لقيمة تجزئة المفاتيح الأساسية.</p>
<p>يتم تعيين طابع زمني لكل رسالة إدراج (<code translate="no">InsertMsg</code>) قبل إرسالها إلى <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> هو عبارة عن غلاف لقائمة انتظار الرسائل، وهو Pulsar افتراضيًا في Milvus 2.0.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>أحد المبادئ العامة هو أنه في <code translate="no">MsgStream</code> ، يجب أن تكون الطوابع الزمنية لـ<code translate="no">InsertMsgs</code> من نفس الوكيل متزايدة. ومع ذلك، لا توجد مثل هذه القاعدة لتلك الخاصة بـ <code translate="no">InsertMsgs</code> من وكلاء مختلفين.</p>
<p>الشكل التالي هو مثال على <code translate="no">InsertMsgs</code> في <code translate="no">MsgStream</code>. يحتوي المقتطف على خمسة <code translate="no">InsertMsgs</code> ، ثلاثة منها من <code translate="no">Proxy1</code> والباقي من <code translate="no">Proxy2</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>إن الطوابع الزمنية للثلاثة <code translate="no">InsertMsgs</code> من <code translate="no">Proxy1</code> هي طوابع زمنية متزايدة، وكذلك الأمر بالنسبة للاثنين <code translate="no">InsertMsgs</code> من <code translate="no">Proxy2</code>. ومع ذلك، لا يوجد ترتيب معين بين <code translate="no">Proxy1</code> و <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>يتمثل أحد السيناريوهات المحتملة في أنه عند قراءة رسالة ذات طابع زمني <code translate="no">110</code> من <code translate="no">Proxy2</code> ، يجد ميلفوس أن الرسالة ذات الطابع الزمني <code translate="no">80</code> من <code translate="no">Proxy1</code> لا تزال في <code translate="no">MsgStream</code>. لذلك، يقدم ميلفوس نظام مزامنة الوقت، timetick، لضمان أنه عند قراءة رسالة من <code translate="no">MsgStream</code> ، يجب استهلاك جميع الرسائل ذات قيم الطابع الزمني الأصغر.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>مزامنة_الوقت</span> </span></p>
<p>كما هو موضح في الشكل أعلاه,</p>
<ul>
<li><p>يقوم كل وكيل بشكل دوري (كل 200 مللي ثانية بشكل افتراضي) بالإبلاغ عن أكبر قيمة طابع زمني لأحدث <code translate="no">InsertMsg</code> في <code translate="no">MsgStream</code>إلى التنسيق الجذر.</p></li>
<li><p>يحدد التنسيق الجذر الحد الأدنى لقيمة الطابع الزمني الأدنى على هذا <code translate="no">Msgstream</code> ، بغض النظر عن الوكيل الذي ينتمي إليه <code translate="no">InsertMsgs</code>. ثم يقوم جذر التنسيق بإدراج هذا الحد الأدنى للطابع الزمني في <code translate="no">Msgstream</code>. يسمى هذا الطابع الزمني أيضًا بالعلامة الزمنية.</p></li>
<li><p>عندما تقرأ المكونات المستهلكة الطابع الزمني الذي أدرجه جذر التنسيق، فإنها تفهم أن جميع رسائل الإدراج ذات قيم الطابع الزمني الأصغر قد استهلكت. لذلك، يمكن تنفيذ الطلبات ذات الصلة بأمان دون مقاطعة الترتيب.</p></li>
</ul>
<p>الشكل التالي هو مثال على <code translate="no">Msgstream</code> مع إدراج طابع زمني.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>timetick</span> </span></p>
<p><code translate="no">MsgStream</code> بمعالجة الرسائل على دفعات وفقًا للعلامة الزمنية للتأكد من أن الرسائل الناتجة تفي بمتطلبات الطابع الزمني. في المثال أعلاه، سوف يستهلك جميع السجلات باستثناء <code translate="no">InsertMsgs</code> من <code translate="no">Proxy2</code> على <code translate="no">Timestamp: 120</code> لأنه بعد آخر علامة زمنية.</p>
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
<li>تعرف على مفهوم <a href="/docs/ar/timestamp.md">الطابع</a> الزمني.</li>
<li>تعرف على <a href="/docs/ar/data_processing.md">سير عمل معالجة البيانات</a> في ميلفوس.</li>
</ul>
