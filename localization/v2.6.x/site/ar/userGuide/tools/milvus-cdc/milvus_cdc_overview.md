---
id: milvus_cdc_overview.md
summary: >-
  يقوم برنامج Milvus CDC بنسخ تغييرات البيانات من مجموعة Milvus إلى مجموعة أخرى
  من أجل التعافي من الكوارث في وضع الاستعداد الأساسي.
title: ميلفوس CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">ميلفوس CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم برنامج Milvus CDC (التقاط بيانات التغيير) بنسخ تغييرات البيانات من مجموعة Milvus إلى أخرى. يمكنك استخدام CDC لإنشاء طوبولوجيا التعافي من الكوارث الأساسية - الاحتياطية ل Milvus.</p>
<p>في طوبولوجيا أساسية-احتياطية، تعمل مجموعة واحدة كمجموعة أساسية وتقبل عمليات الكتابة. تتلقى مجموعة أو أكثر من المجموعات الاحتياطية التغييرات باستمرار من المجموعة الأساسية ويمكنها خدمة حركة مرور القراءة. عندما تصبح المجموعة الأساسية غير متوفرة أو تحتاج إلى صيانة، يمكنك تحويل حركة مرور الخدمة إلى مجموعة احتياطية.</p>
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
    </button></h2><p>تحتوي الطوبولوجيا النموذجية على:</p>
<ul>
<li><strong>مجموعة أساسية</strong>: المجموعة المصدر للنسخ المتماثل. يقبل عمليات القراءة والكتابة.</li>
<li><strong>المجموعة الاحتياطية</strong>: مجموعة مستهدفة للنسخ المتماثل. تستقبل التغييرات من المجموعة الأساسية وتكون للقراءة فقط بينما تظل مجموعة احتياطية.</li>
<li><strong>عقدة CDC</strong>: مكون Milvus الذي يقوم بإعادة توجيه تغييرات WAL من المجموعة الأساسية الحالية إلى المجموعات الاحتياطية. نشر CDC على كل مجموعة قد تصبح أساسية بعد التبديل أو تجاوز الفشل.</li>
<li><strong>طوبولوجيا النسخ المتماثل</strong>: العلاقة المكوّنة من مصدر إلى هدف، مثل المجموعة أ -&gt; المجموعة ب. فيما يلي توضيح للطوبولوجيا. <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /><span>سير عمل CDC</span> </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">الطوبولوجيا المدعومة<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>أكثر عمليات نشر الأقراص المضغوطة شيوعًا هي عملية نشر واحدة أساسية وأخرى احتياطية:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>يدعم Milvus CDC أيضًا طوبولوجيا أساسية واحدة ومتعددة الاحتياط:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>لا تدعم Milvus CDC عمليات النشر متعدد الأساسي أو النشط النشط، حيث تقبل مجموعتان أو أكثر حركة مرور الكتابة في نفس الوقت.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">السلوك الأساسي والاحتياطي<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
<tr><th>الدور</th><th>يقرأ</th><th>الكتابات</th><th>سلوك النسخ المتماثل</th></tr>
</thead>
<tbody>
<tr><td>أساسي</td><td>نعم هذا صحيح</td><td>نعم</td><td>إرسال التغييرات إلى المجموعات الاحتياطية</td></tr>
<tr><td>الاستعداد</td><td>نعم</td><td>لا</td><td>يتلقى التغييرات المنسوخة من الأساسي</td></tr>
</tbody>
</table>
<p>ترفض المجموعة الاحتياطية طلبات الكتابة المباشرة. وهذا يمنع انقسام الدماغ ويحافظ على اتساق طوبولوجيا النسخ المتماثل.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">التبديل المخطط له مقابل التجاوز الفاشل<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus CDC طريقتين لنقل حركة مرور الخدمة من المجموعة الأساسية الحالية إلى مجموعة احتياطية.</p>
<table>
<thead>
<tr><th>التشغيل</th><th>الاستخدام عند</th><th>فقدان البيانات</th><th>السلوك المتوقع</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/ar/v2.6.x/cdc_switchover.md">التحويل</a></strong></td><td>لا يزال الوصول إلى الأساسي الحالي ممكناً، أو عند إجراء الصيانة المخطط لها</td><td>RPO = 0</td><td>ينتظر البيانات المنسوخة المتبقية قبل تغيير الأدوار</td></tr>
<tr><td><strong><a href="/docs/ar/v2.6.x/cdc_failover.md">تجاوز الفشل</a></strong></td><td>الأساسي الحالي غير متوفر ولا يمكن استرداده بسرعة</td><td>ممكن</td><td>ترقية الوضع الاحتياطي على الفور حتى يمكن استئناف الكتابة</td></tr>
</tbody>
</table>
<p>استخدم التحويل عندما لا يزال بإمكان الأساسي الحالي الاستجابة. استخدم التجاوز الفاشل فقط عندما تكون استعادة التوفر أكثر أهمية من انتظار الأساسي الأصلي.</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">تأخر CDC وسبب أهميته<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>تأخر CDC هو مقدار البيانات التي تمت كتابتها إلى المجموعة الأساسية ولكن لم يتم تطبيقها بعد على المجموعة الاحتياطية.</p>
<p>يؤثر تأخر CDC على كلا خياري الاسترداد:</p>
<ul>
<li>أثناء عملية التحويل، عادةً ما يعني التأخر الأقل في CDC اكتمال العملية بشكل أسرع.</li>
<li>أثناء تجاوز الفشل، يمثل التأخر في CDC نافذة البيانات التي قد تُفقد في حالة عدم توفر الأساسي الأصلي.</li>
</ul>
<p>يجب مراقبة تأخر CDC باستمرار وإبقائه منخفضاً قدر الإمكان. تتضمن صفحة <a href="/docs/ar/v2.6.x/set_up_cdc_replication.md">إعداد النسخ المتماثل للقرص المضغوط CDC</a> مثالاً من PromQL لتقدير التأخر في القرص المضغوط.</p>
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
    </button></h2><p>يوجد لـ Milvus CDC حالياً الحدود التالية:</p>
<ul>
<li>يدعم طوبولوجيات <strong>أحادية المبدأ</strong> فقط.</li>
<li>وهو <strong>لا</strong> يدعم الكتابة النشطة-النشطة أو الكتابة متعددة الأولويات.</li>
<li>يمكن للمجموعات الاحتياطية أن تخدم حركة مرور القراءة، لكنها ترفض الكتابات المباشرة أثناء بقائها في وضع الاستعداد.</li>
<li>قد يؤدي تجاوز الفشل إلى فقدان البيانات التي تمت كتابتها إلى الأساسي القديم ولكن لم يتم نسخها بعد إلى الاحتياطي.</li>
<li>يجب أن يتطابق التكوين <code translate="no">pchannels</code> مع تخطيط القناة الفعلي لكل مجموعة.</li>
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">هل يمكن للمجموعة الاحتياطية خدمة الاستعلامات؟<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم. يمكن للمجموعة الاحتياطية أن تخدم حركة مرور القراءة. ولا يمكنها قبول الكتابات حتى تصبح المجموعة الاحتياطية هي الأساسية.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">هل يدعم نظام Milvus CDC الكتابة النشطة-النشطة؟<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. تم تصميم Milvus CDC لطوبولوجيا أساسية واحدة. يمكن أن تتسبب الكتابة إلى مجموعات متعددة في نفس الوقت في انقسام الدماغ وتباعد البيانات.</p>
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
    </button></h3><p>لا. ينتظر التحويل حتى يتم نسخ البيانات المتبقية قبل أن يصبح الاحتياطي أساسيًا.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">هل يؤدي تجاوز الفشل إلى فقدان البيانات؟<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكن ذلك. قد تُفقد أي بيانات مكتوبة على النظام الأساسي القديم ولكن لم يتم نسخها بعد إلى النظام الاحتياطي.</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">ما مقدار البيانات التي يمكن فقدانها أثناء تجاوز الفشل؟<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>يتم تحديد فقدان البيانات المحتمل من خلال تأخر CDC في الوقت الذي أصبح فيه الأساسي غير متوفر.</p>
