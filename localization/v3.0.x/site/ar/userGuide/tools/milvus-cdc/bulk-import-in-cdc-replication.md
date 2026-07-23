---
id: bulk-import-in-cdc-replication.md
summary: >-
  تعرف على كيفية إجراء استيراد جماعي إلى مجموعات Milvus التي تستخدم النسخ
  المتماثل عبر CDC.
title: الاستيراد المجمّع في تكرار CDC
---
<h1 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">الاستيراد المجمّع في تكرار CDC<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>يشرح هذا الدليل كيفية تنفيذ استيراد مجمّع على مجموعات Milvus التي تشكل جزءًا من بنية تكرار CDC. في المجموعة المتكررة، يجب أن يستخدم الاستيراد المجمّع آلية الالتزام ثنائي المراحل (2PC) بحيث يتم الالتزام بالاستيراد كنقطة واحدة مرتبة عبر المجموعة الأساسية والمجموعة الاحتياطية.</p>
<p>في هذا الدليل، تمثل المجموعة الأساسية مجموعة Milvus المصدر، بينما تمثل المجموعة الاحتياطية مجموعة Milvus الهدف.</p>
<p>قبل البدء، تأكد من أن تكرار CDC قد تم تكوينه بالفعل بين مجموعاتك. للحصول على التفاصيل، راجع <a href="/docs/ar/set_up_cdc_replication.md">إعداد تكرار CDC</a>.</p>
<h2 id="Why-2PC-is-required" class="common-anchor-header">لماذا يُعد 2PC ضروريًا<button data-href="#Why-2PC-is-required" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم الالتزام التلقائي بعملية الاستيراد المجمّع العادية عند انتهاء مهمة الاستيراد، مما يجعل البيانات المستوردة مرئية على الفور. في بنية تكرار CDC، لا يُسمح بهذا السلوك لأن المجموعتين الرئيسية والاحتياطية يجب أن تجعلا البيانات المستوردة مرئية في نفس النقطة المنطقية.</p>
<p>بدلاً من ذلك، قم بتشغيل الاستيراد في وضع الالتزام ثنائي المراحل عن طريق تعيين « <code translate="no">auto_commit=false</code> »:</p>
<ol>
<li><p><strong>مرحلة الاستيراد</strong>: يقوم Milvus بتحميل البيانات على المجموعة الأساسية ونسخ عملية الاستيراد إلى المجموعة الاحتياطية، لكن البيانات المستوردة تظل غير مرئية. تتوقف مهمة الاستيراد عند حالة " <code translate="no">Uncommitted</code> " وتدخل في حالة انتظار.</p></li>
<li><p><strong>مرحلة الالتزام</strong>: تقوم بشكل صريح بالالتزام بمهمة الاستيراد على المجموعة الأساسية. يتم نسخ الالتزام إلى المجموعة الاحتياطية كحاجز واحد مرتب، بحيث تجعل كلتا المجموعتين البيانات المستوردة مرئية في نفس النقطة المنطقية.</p></li>
</ol>
<h2 id="Step-1-Enable-import-in-a-replicating-cluster" class="common-anchor-header">الخطوة 1: تمكين الاستيراد في المجموعة المتكررة<button data-href="#Step-1-Enable-import-in-a-replicating-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تعطيل الاستيراد في المجموعة المتكررة بشكل افتراضي. قم بتمكينه عن طريق تعيين <code translate="no">dataCoord.import.enableInReplicatingCluster</code> إلى <code translate="no">true</code> في كل من المجموعة الرئيسية والمجموعة الاحتياطية.</p>
<p>إذا قمت بنشر Milvus باستخدام Milvus Operator، فأضف الإعداد التالي إلى <code translate="no">spec.config</code> لكل مورد من موارد <code translate="no">Milvus</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">dataCoord:</span>
      <span class="hljs-attr">import:</span>
        <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>إذا قمت بتكوين Milvus مباشرةً من خلال <code translate="no">milvus.yaml</code> ، فأضف الإعداد التالي:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">import:</span>
    <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكن تحديث هذا الإعداد، لذا يمكن أن يدخل حيز التنفيذ دون الحاجة إلى إعادة تشغيل كاملة.</p>
<p>عند تمكين هذا الإعداد، لا تقبل المجموعة المتكررة سوى عمليات الاستيراد التي تستخدم <code translate="no">auto_commit=false</code>. يسرد الجدول التالي الطلبات المرفوضة الشائعة:</p>
<table>
<thead>
<tr><th>الحالة</th><th>رسالة الخطأ</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dataCoord.import.enableInReplicatingCluster</code> غير ممكّن</td><td><code translate="no">import in replicating cluster is not supported yet</code></td></tr>
<tr><td><code translate="no">auto_commit=true</code> تم إرساله</td><td><code translate="no">auto_commit=true import in replicating cluster is not supported</code></td></tr>
</tbody>
</table>
<h2 id="Step-2-Run-a-2PC-import" class="common-anchor-header">الخطوة 2: تشغيل عملية استيراد 2PC<button data-href="#Step-2-Run-a-2PC-import" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتشغيل جميع استدعاءات الاستيراد على المجموعة الأساسية. يتم نسخ البيانات المستوردة وقرار التثبيت تلقائيًا إلى المجموعة الاحتياطية، لذا لا تقم بإرسال أو تثبيت عملية الاستيراد على المجموعة الاحتياطية بنفسك.</p>
<p>تقوم كل مجموعة بقراءة ملفات الاستيراد من مخزن الكائنات الخاص بها. تأكد من وجود الملفات المراد استيرادها في كل من مخزن الكائنات الأساسي والاحتياطي. يمكنك تحميل الملفات إلى كلتا المجموعتين، أو استخدام مخزن كائنات يمكن لكلتا المجموعتين قراءته. إذا كانت الملفات مفقودة في المجموعة الاحتياطية، فسيفشل الاستيراد المنسوخ هناك مع ظهور خطأ "الكائن غير موجود".</p>
<p>يستخدم المثال التالي أدوات مساعدة الاستيراد المستندة إلى REST من <code translate="no">pymilvus.bulk_writer</code>. قيم <code translate="no">url</code> هي نفس عناوين Milvus التي تستخدمها لنداءات واجهة برمجة التطبيقات (API) الأخرى.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time

<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> bulk_import, commit_import, get_import_progress

primary_url = <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
standby_url = <span class="hljs-string">&quot;http://127.0.0.1:19531&quot;</span>

collection_name = <span class="hljs-string">&quot;demo_collection&quot;</span>

<span class="hljs-comment"># Object-storage paths of the files to import. Prepare these files the same</span>
<span class="hljs-comment"># way as a normal bulk import, for example by using BulkWriter.</span>
files = [
    [<span class="hljs-string">&quot;import-data/part-1.parquet&quot;</span>],
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">wait_for_state</span>(<span class="hljs-params">url, job_id, target_state, timeout=<span class="hljs-number">600</span></span>):
    deadline = time.time() + timeout
    <span class="hljs-keyword">while</span> time.time() &lt; deadline:
        resp = get_import_progress(url=url, job_id=job_id)
        data = resp.json().get(<span class="hljs-string">&quot;data&quot;</span>, {})
        state = data.get(<span class="hljs-string">&quot;state&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;[<span class="hljs-subst">{url}</span>] job <span class="hljs-subst">{job_id}</span> state=<span class="hljs-subst">{state}</span>, progress=<span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;progress&#x27;</span>)}</span>&quot;</span>)

        <span class="hljs-keyword">if</span> state == target_state:
            <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">if</span> state == <span class="hljs-string">&quot;Failed&quot;</span>:
            <span class="hljs-keyword">raise</span> RuntimeError(
                <span class="hljs-string">f&quot;import job <span class="hljs-subst">{job_id}</span> failed on <span class="hljs-subst">{url}</span>: <span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;reason&#x27;</span>)}</span>&quot;</span>
            )

        time.sleep(<span class="hljs-number">3</span>)

    <span class="hljs-keyword">raise</span> TimeoutError(<span class="hljs-string">f&quot;job <span class="hljs-subst">{job_id}</span> did not reach <span class="hljs-subst">{target_state}</span> on <span class="hljs-subst">{url}</span>&quot;</span>)


<span class="hljs-comment"># Start a 2PC import on the primary cluster. In a replicating cluster,</span>
<span class="hljs-comment"># auto_commit=false is required, and the job stops at the Uncommitted state.</span>
resp = bulk_import(
    url=primary_url,
    collection_name=collection_name,
    files=files,
    options={<span class="hljs-string">&quot;auto_commit&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>},
)
job_id = resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;started 2PC import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until both clusters report Uncommitted. The same job ID is used on the</span>
<span class="hljs-comment"># primary and standby clusters because the import is replicated through CDC.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)

<span class="hljs-comment"># Commit once on the primary cluster. Do not commit on the standby cluster.</span>
commit_import(url=primary_url, job_id=job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;committed import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until the import is completed and visible on both clusters.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;import committed and visible on both clusters&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Why-wait-for-Uncommitted-on-both-clusters" class="common-anchor-header">لماذا الانتظار حتى <code translate="no">Uncommitted</code> على كلتا المجموعتين<button data-href="#Why-wait-for-Uncommitted-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>لا يؤدي إجراء التثبيت قبل انتهاء المجموعة الاحتياطية من الاستيراد إلى إتلاف البيانات، ولكن المجموعة الاحتياطية لا تزال في مرحلة اللحاق بالركب عند تطبيق التثبيت. يؤدي الانتظار حتى تبلغ كل من المجموعة الأساسية والمجموعة الاحتياطية بـ <code translate="no">Uncommitted</code> إلى تأكيد أن البيانات المستوردة قد تم نسخها بالكامل وأن كلا المجموعتين جاهزتان لعرضها معًا.</p>
<h2 id="Step-3-Verify-the-data" class="common-anchor-header">الخطوة 3: التحقق من البيانات<button data-href="#Step-3-Verify-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد وصول المهمة إلى حالة " <code translate="no">Completed</code>" (تم التزام)، تصبح الكيانات المستوردة مرئية على كلتا المجموعتين. قم بتحميل المجموعة واستعلامها على المجموعة الأساسية، ثم قم بتشغيل نفس الاستعلام على المجموعة الاحتياطية دون تحميل المجموعة يدويًا هناك وتأكد من وجود الكيانات المستوردة على كلتا المجموعتين.</p>
<p>تكون المجموعة الاحتياطية للقراءة فقط طالما ظلت في وضع الاستعداد. لا تقم بإرسال عمليات الاستيراد أو عمليات التثبيت أو أي عمليات DDL أو DCL أخرى مباشرةً إلى المجموعة الاحتياطية. قم بتنفيذ هذه العمليات على المجموعة الأساسية ودع تكرار CDC يطبقها على المجموعة الاحتياطية.</p>
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
    </button></h2><h3 id="Which-cluster-should-I-run-the-import-and-commit-on" class="common-anchor-header">على أي مجموعة يجب أن أقوم بتشغيل الاستيراد والتثبيت؟<button data-href="#Which-cluster-should-I-run-the-import-and-commit-on" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الاستيراد والتثبيت على المجموعة الأساسية. تتلقى المجموعة الاحتياطية كلاً من البيانات المستوردة والتثبيت من خلال تكرار CDC.</p>
<h3 id="Do-I-need-to-commit-on-the-standby-cluster" class="common-anchor-header">هل أحتاج إلى إجراء عملية التثبيت على المجموعة الاحتياطية؟<button data-href="#Do-I-need-to-commit-on-the-standby-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>لا. يؤدي إجراء عملية التثبيت على المجموعة الأساسية إلى نسخ عملية التثبيت إلى المجموعة الاحتياطية كحاجز واحد مرتب.</p>
<h3 id="Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="common-anchor-header">لماذا يفشل الاستيراد مع ظهور الخطأ « <code translate="no">import in replicating cluster is not supported yet</code> »؟<button data-href="#Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">dataCoord.import.enableInReplicatingCluster</code> لم يتم تمكين الخيار " <code translate="no">true</code> " على تلك المجموعة. اضبطه على " " في كل من المجموعة الرئيسية والمجموعة الاحتياطية.</p>
<h3 id="Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="common-anchor-header">لماذا يفشل الاستيراد مع " <code translate="no">auto_commit=true import in replicating cluster is not supported</code>"؟<button data-href="#Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="anchor-icon" translate="no">
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
    </button></h3><p>في المجموعة التي تتم فيها عملية النسخ المتماثل، لا تُقبل سوى عمليات الاستيراد ثنائية الخطوة (2PC) التي تستخدم " <code translate="no">auto_commit=false</code> ". قم بتعيين " <code translate="no">options={&quot;auto_commit&quot;: &quot;false&quot;}</code> " في طلب الاستيراد.</p>
