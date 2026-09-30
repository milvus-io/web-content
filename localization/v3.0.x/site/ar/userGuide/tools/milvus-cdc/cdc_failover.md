---
id: cdc_failover.md
summary: تعرف على كيفية إجراء تجاوز الفشل عندما تصبح مجموعة Milvus الأساسية غير متوفرة.
title: تجاوز الفشل
---
<h1 id="Failover" class="common-anchor-header">تجاوز الفشل<button data-href="#Failover" class="anchor-icon" translate="no">
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
    </button></h1><p>يعمل التجاوز الفاشل على ترقية مجموعة احتياطية إلى مجموعة أساسية مستقلة عندما تكون المجموعة الأساسية الأصلية غير متوفرة تماماً. إنها عملية توفر أولاً وقد تفقد البيانات التي لم يتم نسخها قبل الفشل.</p>
<p>يفترض هذا الدليل أن الطوبولوجيا الأصلية:</p>
<pre><code translate="no" class="language-text">cluster-a (primary)  -&gt;  cluster-b (standby)
<button class="copy-code-btn"></button></code></pre>
<p>بعد تجاوز الفشل، يصبح <code translate="no">cluster-b</code> أساسيًا مستقلاً بعد تجاوز الفشل، يصبح أساسيًا مستقلًا:</p>
<pre><code translate="no" class="language-text">cluster-b (primary)
<button class="copy-code-btn"></button></code></pre>
<h2 id="When-to-Use-Failover" class="common-anchor-header">متى يتم استخدام تجاوز الفشل<button data-href="#When-to-Use-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم تجاوز الفشل فقط عندما:</p>
<ul>
<li>يتعذر على الأساسي الأصلي الاستجابة للطلبات.</li>
<li>لا يمكن استرداد الأساسي في غضون وقت مقبول.</li>
<li>استعادة توافر الكتابة أكثر أهمية من انتظار الأساسي القديم.</li>
</ul>
<p>إذا كان الأساسي لا يزال يمكن الوصول إليه، استخدم <a href="/docs/ar/cdc_switchover.md">التحويل</a> بدلاً من ذلك. يتجنب التحويل فقدان البيانات.</p>
<h2 id="Data-Loss-Risk" class="common-anchor-header">مخاطر فقدان البيانات<button data-href="#Data-Loss-Risk" class="anchor-icon" translate="no">
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
    </button></h2><p>لا ينتظر التجاوز الفاشل الأساسي القديم. قد تُفقد أي بيانات مكتوبة إلى الأساسي القديم ولكن لم يتم نسخها بعد إلى الاحتياطي.</p>
<p>يتم تحديد الفقدان المحتمل للبيانات من خلال تأخر CDC في الوقت الذي أصبح فيه الأساسي غير متوفر.</p>
<p>قبل تشغيل تجاوز الفشل، يجب فهم المفاضلة:</p>
<table>
<thead>
<tr><th>الهدف</th><th>تجاوز الفشل</th><th>تجاوز الفشل</th></tr>
</thead>
<tbody>
<tr><td>استعادة الكتابة أثناء تعذر الوصول إلى الأساسي</td><td>لا</td><td>لا</td></tr>
<tr><td>تجنب فقدان البيانات</td><td>نعم</td><td>غير مضمون</td></tr>
<tr><td>يتطلب استجابة أساسية قديمة للاستجابة</td><td>نعم</td><td>لا</td></tr>
</tbody>
</table>
<h2 id="Before-You-Begin" class="common-anchor-header">قبل أن تبدأ<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتأكيد ما يلي:</p>
<ul>
<li>الأساسي الأصلي غير متوفر.</li>
<li>لقد قررت عدم انتظار الاسترداد الأساسي.</li>
<li>يمكن إعادة توجيه حركة مرور التطبيقات إلى النظام الاحتياطي.</li>
<li>لن تقوم أتمتة حركة المرور بإعادة إرسال الكتابات إلى الأساسي القديم إذا تم استرداده.</li>
<li>لديك معرف المجموعة الاحتياطية والعنوان والرمز المميز وقنوات pchannels.</li>
</ul>
<p>أهم متطلبات السلامة هو منع انقسام الدماغ. بعد تجاوز الفشل، يجب أن يقبل الاحتياطي الذي تمت ترقيته فقط كتابات التطبيق.</p>
<h2 id="Build-the-Failover-Configuration" class="common-anchor-header">بناء تكوين تجاوز الفشل<button data-href="#Build-the-Failover-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>قم ببناء تكوين يحتوي فقط على الكتلة الاحتياطية ولا يحتوي على طوبولوجيا النسخ المتماثل. تعيين <code translate="no">force_promote=True</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># If you followed Set Up CDC Replication, cluster B is the original target cluster.</span>
cluster_b_id = target_cluster_id
cluster_b_addr = target_cluster_addr
cluster_b_client_addr = target_client_addr
cluster_b_token = target_cluster_token
cluster_b_pchannels = target_cluster_pchannels

failover_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_b_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_b_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_b_pchannels,
        }
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [],
    <span class="hljs-string">&quot;force_promote&quot;</span>: <span class="hljs-literal">True</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Promote-the-Standby" class="common-anchor-header">ترقية الاحتياطي<button data-href="#Promote-the-Standby" class="anchor-icon" translate="no">
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
    </button></h2><p>أرسل الطلب إلى المجموعة الاحتياطية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_b.update_replicate_configuration(**failover_config)
<span class="hljs-keyword">finally</span>:
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>إذا نجح الطلب، يصبح <code translate="no">cluster-b</code> أساسيًا مستقلاً ويمكنه قبول الكتابات.</p>
<h2 id="Redirect-Application-Traffic" class="common-anchor-header">إعادة توجيه حركة مرور التطبيق<button data-href="#Redirect-Application-Traffic" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد الترقية:</p>
<ol>
<li>إعادة توجيه حركة مرور الكتابة إلى <code translate="no">cluster-b</code>.</li>
<li>قم بإزالة <code translate="no">cluster-a</code> من نقاط نهاية الكتابة وموازنات التحميل وسجلات DNS والأتمتة.</li>
<li>تحقق من أن <code translate="no">cluster-b</code> يقبل الكتابة.</li>
<li>حافظ على <code translate="no">cluster-a</code> معزولاً حتى يتم إيقاف تشغيله أو إعادة بنائه بشكل صريح.</li>
</ol>
<p>مثال للتحقق من الكتابة:</p>
<pre><code translate="no" class="language-python">client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_b.insert(
        collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
        data=[{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>] * <span class="hljs-number">128</span>}],
    )
<span class="hljs-keyword">finally</span>:
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>اضبط اسم المجموعة وحقول المخطط لتتناسب مع النشر الخاص بك.</p>
<h2 id="Verify-the-Result" class="common-anchor-header">التحقق من النتيجة<button data-href="#Verify-the-Result" class="anchor-icon" translate="no">
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
    </button></h2><p>تحقق من المجموعة التي تمت ترقيتها مباشرة:</p>
<ul>
<li>تنجح عمليات الكتابة على <code translate="no">cluster-b</code>.</li>
<li>تُرجع عمليات القراءة البيانات المتوقعة.</li>
<li>لا يكتب أي مكون تطبيق إلى <code translate="no">cluster-a</code>.</li>
</ul>
<h2 id="Handling-the-Old-Primary" class="common-anchor-header">التعامل مع الأساسي القديم<button data-href="#Handling-the-Old-Primary" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تجاوز الفشل، تعامل مع <code translate="no">cluster-a</code> على أنه قديم. لا ترسل كتابات التطبيق إليه إذا أصبح قابلاً للوصول إليه مرة أخرى. قد يحتوي على بيانات لم يتم نسخها إلى <code translate="no">cluster-b</code> ، وقد يحتوي <code translate="no">cluster-b</code> بالفعل على كتابات جديدة بعد تجاوز الفشل.</p>
<p>لا تقم بإعادة الاتصال <code translate="no">cluster-a</code> بالطوبولوجيا القديمة تلقائيًا. إعادة تقديم الأساسي القديم هي مهمة استرداد منفصلة يجب التخطيط لها بعناية.</p>
<h2 id="Minimizing-Data-Loss" class="common-anchor-header">التقليل من فقدان البيانات<button data-href="#Minimizing-Data-Loss" class="anchor-icon" translate="no">
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
    </button></h2><p>لا يمكنك إزالة جميع مخاطر فقدان البيانات من تجاوز الفشل، ولكن يمكنك تقليلها:</p>
<ul>
<li>مراقبة تأخر CDC بشكل مستمر.</li>
<li>احتفظ بالمجموعات الاحتياطية مجهزة للتعامل مع معدل الكتابة الأساسي.</li>
<li>حافظ على انخفاض زمن انتقال الشبكة عبر المجموعات وفقدان الحزمة.</li>
<li>اجعل عمليات كتابة التطبيقات غير مؤكدة.</li>
<li>إعادة محاولة عمليات الكتابة التي يكون نجاحها غير مؤكد بعد تجاوز الفشل.</li>
<li>تفضيل التحويل عندما لا يزال بإمكان الأساسي الاستجابة.</li>
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
    </button></h2><h3 id="Does-failover-always-lose-data" class="common-anchor-header">هل يؤدي تجاوز الفشل دائمًا إلى فقدان البيانات؟<button data-href="#Does-failover-always-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، ولكن يمكن ذلك. إذا كانت جميع الكتابات قد تم نسخها بالفعل قبل فشل الأساسيّ، فلن يتم فقدان أي بيانات. أما إذا كان هناك تأخر في النسخ المضغوط، فقد تُفقد البيانات المتأخرة.</p>
<h3 id="How-long-does-failover-take" class="common-anchor-header">كم من الوقت يستغرق تجاوز الفشل؟<button data-href="#How-long-does-failover-take" class="anchor-icon" translate="no">
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
    </button></h3><p>عادةً ما يكتمل في غضون ثوانٍ، اعتمادًا على حالة المجموعة وتوافر مستوى التحكم في الطائرة الاحتياطية.</p>
<h3 id="Can-I-run-failover-on-the-primary" class="common-anchor-header">هل يمكنني تشغيل تجاوز الفشل على الأساسي؟<button data-href="#Can-I-run-failover-on-the-primary" class="anchor-icon" translate="no">
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
    </button></h3><p>لا، تجاوز الفشل مخصص للمجموعة الاحتياطية. إذا كان الأساسي الحالي متاحاً، استخدم التجاوز الاحتياطي.</p>
<h3 id="Can-the-old-primary-rejoin-automatically" class="common-anchor-header">هل يمكن إعادة انضمام الأساسي القديم تلقائياً؟<button data-href="#Can-the-old-primary-rejoin-automatically" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. بعد تجاوز الفشل، يجب التعامل مع الأساسي القديم على أنه قديم وإيقاف تشغيله أو إعادة بنائه قبل أن يتمكن من المشاركة في النسخ المتماثل مرة أخرى.</p>
<h3 id="How-do-I-avoid-split-brain" class="common-anchor-header">كيف يمكنني تجنب انقسام الدماغ؟<button data-href="#How-do-I-avoid-split-brain" class="anchor-icon" translate="no">
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
    </button></h3><p>تأكد من أن المجموعة التي تمت ترقيتها فقط هي التي تتلقى الكتابات. قم بإزالة الأساسي القديم من جميع مسارات الكتابة قبل أن يتمكن من الاسترداد وقبول حركة المرور.</p>
