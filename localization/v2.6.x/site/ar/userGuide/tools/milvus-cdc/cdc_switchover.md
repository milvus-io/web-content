---
id: cdc_switchover.md
summary: >-
  تعرف على كيفية إجراء عملية تبديل مخطط لها بين مجموعات Milvus الأساسية
  والاحتياطية باستخدام Milvus CDC.
title: التحويل
---
<h1 id="Switchover" class="common-anchor-header">التحويل<button data-href="#Switchover" class="anchor-icon" translate="no">
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
    </button></h1><p>يؤدي التحويل إلى تغيير الاتجاه الأساسي-الاحتياطي دون فقدان البيانات. استخدمه عندما تكون الكتلة الأساسية الحالية لا تزال قابلة للوصول إليها، أو عندما تحتاج إلى نقل حركة المرور للصيانة.</p>
<p>يفترض هذا الدليل أن الطوبولوجيا الحالية هي:</p>
<pre><code translate="no" class="language-text">cluster-a (primary)  -&gt;  cluster-b (standby)
<button class="copy-code-btn"></button></code></pre>
<p>بعد التحويل، تصبح الطوبولوجيا:</p>
<pre><code translate="no" class="language-text">cluster-b (primary)  -&gt;  cluster-a (standby)
<button class="copy-code-btn"></button></code></pre>
<h2 id="When-to-Use-Switchover" class="common-anchor-header">متى تستخدم التحويل<button data-href="#When-to-Use-Switchover" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم التحويل عندما:</p>
<ul>
<li>أنت تقوم بالصيانة على الأساسي الحالي.</li>
<li>يكون الأساسي متدهورًا جزئيًا ولكن لا يزال بإمكانه الاستجابة للطلبات.</li>
<li>تحتاج إلى RPO = 0 ولا يمكنك قبول فقدان البيانات.</li>
</ul>
<p>لا تستخدم التحويل إذا كان الأساسي غير متوفر تمامًا. في هذه الحالة، استخدم <a href="/docs/ar/v2.6.x/cdc_failover.md">تجاوز الفشل</a>.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">قبل البدء<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>تحقق مما يلي قبل البدء:</p>
<ul>
<li>يمكن الوصول إلى كلا المجموعتين.</li>
<li>النسخ المتماثل CDC سليم.</li>
<li>تأخر CDC منخفض بما يكفي لوقت الاسترداد المستهدف.</li>
<li>يمكن إيقاف عمليات كتابة التطبيقات مؤقتاً أو إعادة المحاولة أثناء تغيير الدور.</li>
<li>لقد قمت بإعداد تكوين الطوبولوجيا الجديد.</li>
</ul>
<p>يضمن التبديل عدم فقدان البيانات، لكن وقت العملية يعتمد على كمية البيانات المتبقية التي يجب نسخها.</p>
<h2 id="Build-the-New-Topology" class="common-anchor-header">إنشاء الطوبولوجيا الجديدة<button data-href="#Build-the-New-Topology" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بإنشاء تكوين استبدال كامل حيث يصبح <code translate="no">cluster-b</code> هو المصدر و <code translate="no">cluster-a</code> هو الهدف.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># If you followed Set Up CDC Replication, cluster A is the original source cluster,</span>
<span class="hljs-comment"># and cluster B is the original target cluster.</span>
cluster_a_id = source_cluster_id
cluster_a_addr = source_cluster_addr
cluster_a_client_addr = source_client_addr
cluster_a_token = source_cluster_token
cluster_a_pchannels = source_cluster_pchannels

cluster_b_id = target_cluster_id
cluster_b_addr = target_cluster_addr
cluster_b_client_addr = target_client_addr
cluster_b_token = target_cluster_token
cluster_b_pchannels = target_cluster_pchannels

switchover_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_a_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_a_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_a_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_a_pchannels,
        },
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_b_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_b_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_b_pchannels,
        },
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [
        {
            <span class="hljs-string">&quot;source_cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;target_cluster_id&quot;</span>: cluster_a_id,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-the-New-Topology" class="common-anchor-header">تطبيق الطوبولوجيا الجديدة<button data-href="#Apply-the-New-Topology" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتطبيق نفس التكوين على كلا المجموعتين. أرسل الطلب إلى المجموعة الأساسية الحالية أولاً، ثم أرسله إلى المجموعة الاحتياطية. إذا قمت بالتبديل لاحقاً، قم بعكس الترتيب لأن <code translate="no">cluster-b</code> هو الأساسي الحالي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client_a = MilvusClient(uri=cluster_a_client_addr, token=cluster_a_token)
client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_a.update_replicate_configuration(**switchover_config)
    client_b.update_replicate_configuration(**switchover_config)
<span class="hljs-keyword">finally</span>:
    client_a.close()
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>ينتقل الأساسي القديم إلى وضع الاستعداد ويرفض الكتابات الجديدة. ينتظر الاحتياطي القديم البيانات المنسوخة المتبقية، ويرقي نفسه إلى أساسي ثم يقبل الكتابات.</p>
<p>إذا فشل الطلب بسبب خطأ عابر في الشبكة أو الخدمة، أعد المحاولة بنفس التكوين.</p>
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
    </button></h2><p>بعد أن يصبح <code translate="no">cluster-b</code> أساسيًا:</p>
<ol>
<li>قم بتوجيه حركة مرور الكتابة إلى <code translate="no">cluster-b</code>.</li>
<li>تأكيد نجاح عمليات القراءة والكتابة على <code translate="no">cluster-b</code>.</li>
<li>تأكد من أن <code translate="no">cluster-a</code> لم يعد يتلقى كتابات التطبيق.</li>
<li>استمر في مراقبة النسخ المتماثل من <code translate="no">cluster-b</code> إلى <code translate="no">cluster-a</code>.</li>
</ol>
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
    </button></h2><p>تحقق من أن <code translate="no">cluster-b</code> يعمل كأساسي جديد وأن البيانات لا تزال متسقة. تتضمن عمليات التحقق الشائعة ما يلي:</p>
<ul>
<li>مقارنة أعداد الصفوف للمجموعات المهمة.</li>
<li>الاستعلام عن المفاتيح الأساسية المعروفة من كلا المجموعتين.</li>
<li>قم بإجراء بحث تمثيلي على المفتاح الأساسي الجديد والاحتياطي القديم.</li>
<li>قم بإجراء كتابة صغيرة على <code translate="no">cluster-b</code> وتأكد من نسخها إلى <code translate="no">cluster-a</code>.</li>
</ul>
<h2 id="Switch-Back" class="common-anchor-header">التبديل مرة أخرى<button data-href="#Switch-Back" class="anchor-icon" translate="no">
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
    </button></h2><p>للتبديل مرة أخرى في وقت لاحق، قم بتطبيق الطوبولوجيا الأصلية مرة أخرى:</p>
<pre><code translate="no" class="language-text">cluster-a -&gt; cluster-b
<button class="copy-code-btn"></button></code></pre>
<p>استخدم نفس تدفق التبديل. تأكد من إمكانية الوصول إلى الأساسي الحالي وأن النسخ المتماثل سليم قبل إعادة التبديل.</p>
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
    </button></h2><h3 id="Does-switchover-lose-data" class="common-anchor-header">هل يفقد التحويل البيانات؟<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
<h3 id="Do-I-need-to-stop-application-writes" class="common-anchor-header">هل أحتاج إلى إيقاف كتابات التطبيق؟<button data-href="#Do-I-need-to-stop-application-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب عليك إيقاف الكتابات مؤقتًا أو جعل الكتابات قابلة لإعادة المحاولة أثناء تغيير الدور. يتم رفض الكتابات المرسلة إلى الأساسي القديم بعد أن يتم إلغاء التبديل.</p>
<h3 id="Why-does-switchover-take-longer-than-expected" class="common-anchor-header">لماذا يستغرق التبديل وقتاً أطول من المتوقع؟<button data-href="#Why-does-switchover-take-longer-than-expected" class="anchor-icon" translate="no">
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
    </button></h3><p>السبب الأكثر شيوعًا هو تأخر CDC. يجب أن يتلقى الأساسي الجديد البيانات المتبقية قبل أن يتمكن من تولي المسؤولية بأمان مع RPO = 0.</p>
<h3 id="Can-I-retry-a-failed-switchover-request" class="common-anchor-header">هل يمكنني إعادة محاولة طلب التحويل الفاشل؟<button data-href="#Can-I-retry-a-failed-switchover-request" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم. أعد المحاولة بنفس الطوبولوجيا المستهدفة.</p>
<h3 id="What-happens-to-the-old-primary" class="common-anchor-header">ماذا يحدث للابتدائي القديم؟<button data-href="#What-happens-to-the-old-primary" class="anchor-icon" translate="no">
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
    </button></h3><p>يصبح الأساسي القديم في وضع الاستعداد. لا ينبغي أن يتلقى بعد ذلك عمليات كتابة التطبيق.</p>
