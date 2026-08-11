---
id: milvus_cdc_overview.md
summary: >-
  يقوم Milvus CDC بنسخ التغييرات التي تطرأ على البيانات من إحدى مجموعات Milvus
  إلى أخرى، وذلك لأغراض الاستعادة بعد الكوارث بين النظام الأساسي والنظام
  الاحتياطي.
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم Milvus CDC (التقاط تغييرات البيانات) بنسخ تغييرات البيانات من مجموعة Milvus إلى أخرى. يمكنك استخدام CDC لإنشاء بنية استعادة البيانات بعد الكوارث من النوع "الأساسي-الاحتياطي" لـ Milvus.</p>
<p>في بنية «الأساسي-الاحتياطي»، تعمل إحدى المجموعات كمجموعة أساسية وتقبل عمليات الكتابة. وتستقبل مجموعة احتياطية واحدة أو أكثر التغييرات باستمرار من المجموعة الأساسية ويمكنها تلبية حركة مرور القراءة. وعندما تصبح المجموعة الأساسية غير متاحة أو تحتاج إلى صيانة، يمكنك تحويل حركة مرور الخدمة إلى مجموعة احتياطية.</p>
<h2 id="Architecture" class="common-anchor-header">البنية<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>تتضمن البنية النموذجية ما يلي:</p>
<ul>
<li><strong>المجموعة الرئيسية</strong>: المجموعة المصدر للنسخ المتماثل. وهي تقبل عمليات القراءة والكتابة.</li>
<li><strong>المجموعة الاحتياطية</strong>: المجموعة المستهدفة للنسخ المتماثل. تتلقى التغييرات من المجموعة الرئيسية وتكون للقراءة فقط طالما ظلت في وضع الاحتياط.</li>
<li><strong>عقدة CDC</strong>: مكون من مكونات Milvus يقوم بإعادة توجيه تغييرات WAL من المجموعة الرئيسية الحالية إلى المجموعات الاحتياطية. قم بنشر CDC على كل مجموعة قد تصبح رئيسية بعد التبديل أو التحويل التلقائي.</li>
<li><strong>بنية النسخ المتماثل</strong>: العلاقة المُعدة بين المصدر والهدف، مثل المجموعة-أ -&gt; المجموعة-ب.
فيما يلي رسم توضيحي للبنية. <span class="img-wrapper">

  
   <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /> 
 <span>   سير عمل CDC</span>
  
 </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">الطوبولوجيات المدعومة<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>أكثر طرق نشر CDC شيوعًا هي مجموعة رئيسية واحدة ومجموعة احتياطية واحدة:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>يدعم Milvus CDC أيضًا طوبولوجيا رئيسية واحدة وعدة مجموعات احتياطية:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>لا يدعم Milvus CDC عمليات النشر ذات الخوادم الرئيسية المتعددة أو النشر بنمط «نشط-نشط»، حيث تقبل مجموعتان أو أكثر من المجموعات حركة الكتابة في نفس الوقت.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">سلوك الخادم الأساسي والخادم الاحتياطي<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>الدور</th><th>عمليات القراءة</th><th>الكتابة</th><th>سلوك النسخ المتماثل</th></tr>
</thead>
<tbody>
<tr><td>الأساسي</td><td>نعم</td><td>نعم</td><td>يرسل التغييرات إلى مجموعات الاحتياط</td></tr>
<tr><td>الاحتياطي</td><td>نعم</td><td>لا</td><td>يتلقى التغييرات المنسوخة من المجموعة الأساسية</td></tr>
</tbody>
</table>
<p>ترفض المجموعة الاحتياطية طلبات الكتابة المباشرة. وهذا يمنع حدوث "انقسام الدماغ" ويحافظ على اتساق بنية النسخ المتماثل.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">التحويل المخطط مقابل التحويل التلقائي<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus CDC طريقتين لنقل حركة مرور الخدمة من المجموعة الأساسية الحالية إلى المجموعة الاحتياطية.</p>
<table>
<thead>
<tr><th>العملية</th><th>يُستخدم عندما</th><th>فقدان البيانات</th><th>السلوك المتوقع</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/ar/cdc_switchover.md">التحويل</a></strong></td><td>لا يزال النظام الأساسي الحالي متاحًا، أو إذا كنت تقوم بصيانة مخططة</td><td>RPO = 0</td><td>ينتظر وصول البيانات المتبقية التي تمت نسخها قبل تغيير الأدوار</td></tr>
<tr><td><strong><a href="/docs/ar/cdc_failover.md">التحويل التلقائي</a></strong></td><td>الخادم الأساسي الحالي غير متاح ولا يمكن استعادته بسرعة</td><td>ممكن</td><td>يرقي الخادم الاحتياطي على الفور حتى يمكن استئناف عمليات الكتابة</td></tr>
</tbody>
</table>
<p>استخدم التبديل (switchover) كلما كان الخادم الأساسي الحالي لا يزال قادرًا على الاستجابة. استخدم التحويل التلقائي (failover) فقط عندما تكون استعادة التوافر أكثر أهمية من انتظار الخادم الأساسي الأصلي.</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">تأخر CDC وأهميته<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>تأخر CDC هو كمية البيانات التي تمت كتابتها إلى المجموعة الأساسية ولكن لم يتم تطبيقها بعد على المجموعة الاحتياطية.</p>
<p>يؤثر تأخر CDC على خياري الاستعادة:</p>
<ul>
<li>أثناء عملية التبديل، عادةً ما يعني انخفاض تأخر CDC أن العملية تكتمل بشكل أسرع.</li>
<li>أثناء التحويل التلقائي، يمثل تأخر CDC نافذة البيانات التي قد تُفقد في حالة عدم توفر الخادم الأساسي الأصلي.</li>
</ul>
<p>يجب عليك مراقبة تأخر CDC باستمرار والحفاظ عليه عند أدنى مستوى ممكن. تتضمن صفحة " <a href="/docs/ar/set_up_cdc_replication.md">إعداد تكرار CDC</a> " مثالاً على PromQL لتقدير تأخر CDC.</p>
<h2 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">الاستيراد المجمّع في تكرار CDC<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>في طوبولوجيا تكرار CDC، يجب أن يستخدم الاستيراد المجمّع وضع الالتزام ثنائي المراحل (2PC) مع " <code translate="no">auto_commit=false</code>". قم بتشغيل الاستيراد والالتزام على المجموعة الأساسية فقط، وتأكد من أن ملفات الاستيراد متاحة لكل من المجموعة الأساسية والمجموعة الاحتياطية. للحصول على التفاصيل، راجع " <a href="/docs/ar/bulk-import-in-cdc-replication.md">الاستيراد المجمّع في تكرار CDC</a>".</p>
<h2 id="Limitations" class="common-anchor-header">القيود<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>يخضع Milvus CDC حاليًا للقيود التالية:</p>
<ul>
<li>يدعم طوبولوجيات <strong>ذات رئيسي واحد</strong> فقط.</li>
<li><strong>لا</strong> يدعم الكتابة بنمط نشط-نشط أو متعدد الأساسي.</li>
<li>يمكن للمجموعات الاحتياطية خدمة حركة مرور القراءة، لكنها ترفض عمليات الكتابة المباشرة طالما ظلت في وضع الاحتياطي.</li>
<li>قد يؤدي التحويل التلقائي إلى فقدان البيانات التي تمت كتابتها إلى المجموعة الرئيسية القديمة ولكن لم يتم نسخها بعد إلى المجموعة الاحتياطية.</li>
<li>يجب أن يتطابق تكوين « <code translate="no">pchannels</code> » مع التخطيط الفعلي للقنوات في كل مجموعة.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">هل يمكن لمجموعة احتياطية تلبية الاستعلامات؟<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم. يمكن للمجموعة الاحتياطية معالجة حركة القراءة. ولا يمكنها قبول عمليات الكتابة حتى تصبح المجموعة الأساسية.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">هل يدعم Milvus CDC عمليات الكتابة النشطة-النشطة؟<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. تم تصميم Milvus CDC لتوبولوجيا ذات مجموعة رئيسية واحدة. قد تؤدي الكتابة إلى مجموعات متعددة في نفس الوقت إلى حدوث انقسام في المعالجة وتباين في البيانات.</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">هل يؤدي التبديل إلى فقدان البيانات؟<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. ينتظر التبديل حتى يتم نسخ البيانات المتبقية قبل أن تصبح المجموعة الاحتياطية هي المجموعة الأساسية.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">هل يؤدي التحويل التلقائي في حالة الفشل إلى فقدان البيانات؟<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم، قد يؤدي ذلك إلى فقدان البيانات. قد تُفقد أي بيانات تمت كتابتها إلى الخادم الأساسي القديم ولم يتم نسخها بعد إلى الخادم الاحتياطي.</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">ما مقدار البيانات التي يمكن أن تُفقد أثناء عملية التحويل التلقائي؟<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>يقتصر الفقدان المحتمل للبيانات على تأخر CDC في الوقت الذي أصبح فيه الخادم الأساسي غير متاح.</p>
