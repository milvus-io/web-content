---
id: configure_access_logs.md
title: تكوين سجلات الوصول
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">تكوين سجلات الوصول<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>تسمح ميزة سجلات الوصول في Milvus لمديري الخوادم بتسجيل وتحليل سلوك وصول المستخدم، مما يساعد في فهم جوانب مثل معدلات نجاح الاستعلام وأسباب الفشل.</p>
<p>يوفر هذا الدليل إرشادات مفصلة حول تكوين سجلات الوصول في ملفوس.</p>
<p>يعتمد تكوين سجلات الوصول على طريقة تثبيت ميلفوس:</p>
<ul>
<li><strong>تثبيت Helm</strong>: التهيئة في <code translate="no">values.yaml</code>. لمزيد من المعلومات، راجع <a href="/docs/ar/configure-helm.md">تكوين Milvus مع مخططات Helm</a>.</li>
<li><strong>تثبيت Docker</strong>: التهيئة في <code translate="no">milvus.yaml</code>. للمزيد من المعلومات، راجع <a href="/docs/ar/configure-docker.md">تكوين Milvus مع Docker Compose</a>.</li>
<li><strong>تثبيت المشغل</strong>: تعديل <code translate="no">spec.components</code> في ملف التكوين. لمزيد من المعلومات، راجع <a href="/docs/ar/configure_operator.md">تكوين Milvus مع مشغل Milvus</a>.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">خيارات التكوين<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>اختر من بين ثلاثة خيارات تكوين بناءً على احتياجاتك:</p>
<ul>
<li><strong>التكوين الأساسي</strong>: للأغراض العامة.</li>
<li><strong>التكوين لملفات سجلات الوصول المحلية</strong>: لتخزين السجلات محلياً.</li>
<li><strong>تكوين لتحميل سجلات الوصول المحلية إلى MinIO</strong>: للتخزين السحابي والنسخ الاحتياطي.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">التكوين الأساسي</h3><p>يتضمن التكوين الأساسي تمكين سجلات الوصول وتحديد اسم ملف السجل أو استخدام stdout.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: ما إذا كنت تريد تمكين ميزة سجل الوصول. الإعداد الافتراضي إلى <strong>خطأ</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: اسم ملف سجل الوصول. إذا تركت هذه المعلمة فارغة، ستتم طباعة سجلات الوصول إلى stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">تكوين ملفات سجلات الوصول المحلية</h3><p>تكوين التخزين المحلي لملفات سجلات الوصول مع معلمات تتضمن مسار الملف المحلي، وحجم الملف، والفاصل الزمني للتناوب:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتم تحديد هذه المعلمات عندما يكون <code translate="no">filename</code> غير فارغ.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: مسار الملف المحلي حيث يتم تخزين ملف سجل الوصول.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: الحجم الأقصى بالميغابايت المسموح به لملف سجل وصول واحد. إذا وصل حجم ملف السجل إلى هذا الحد، سيتم تشغيل عملية تدوير. تقوم هذه العملية بإغلاق ملف سجل الوصول الحالي وإنشاء ملف سجل جديد ومسح محتويات ملف السجل الأصلي.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: الحد الأقصى للفاصل الزمني بالثواني المسموح به لتدوير ملف سجل وصول واحد. عند الوصول إلى الفاصل الزمني المحدد، يتم تشغيل عملية تدوير، مما يؤدي إلى إنشاء ملف سجل وصول جديد وإغلاق الملف السابق.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: الحد الأقصى لعدد ملفات سجلات الوصول المختومة التي يمكن الاحتفاظ بها. إذا تجاوز عدد ملفات سجلات الوصول المختومة هذا الحد، فسيتم حذف أقدمها.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">تكوين لتحميل ملفات سجل الوصول المحلي إلى MinIO</h3><p>قم بتمكين الإعدادات وتكوينها لتحميل ملفات سجل الوصول المحلي إلى MinIO:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>عند تكوين معلمات MinIO، تأكد من تعيين إما <code translate="no">maxSize</code> أو <code translate="no">rotatedTime</code>. قد يؤدي عدم القيام بذلك إلى عدم نجاح تحميل ملفات سجلات الوصول المحلية إلى MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: ما إذا كان سيتم تحميل ملفات سجلات الوصول المحلية إلى MinIO. الإعداد الافتراضي إلى <strong>خطأ</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: مسار تخزين الكائن لتحميل ملفات سجلات الوصول.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: الفاصل الزمني المسموح به لتحميل ملفات سجل الوصول. إذا تجاوز وقت تحميل ملف السجل هذا الفاصل الزمني، فسيتم حذف الملف. يؤدي تعيين القيمة إلى 0 إلى تعطيل هذه الميزة.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">تكوين المنسق<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>تنسيق السجل الافتراضي المستخدم لجميع الأساليب هو التنسيق <code translate="no">base</code> ، والذي لا يتطلب اقترانات محددة للأسلوب. ومع ذلك، إذا كنت ترغب في تخصيص إخراج السجل لطرق محددة، يمكنك تحديد تنسيق سجل مخصص وتطبيقه على الطرق المرتبطة.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: يحدد تنسيق السجل بمقاييس ديناميكية. لمزيد من المعلومات، راجع <a href="#reference-supported-metrics">المقاييس المدعومة</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: يسرد عمليات Milvus باستخدام هذا التنسيق. للحصول على أسماء الأساليب، راجع <strong>MilvusService</strong> في <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">أساليب Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">مرجع: المقاييس المدعومة<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>اسم المقياس</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>اسم الأسلوب</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>حالة الوصول <strong>موافق</strong> أو <strong>فشل</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>التعبير المستخدم في عمليات الاستعلام أو البحث أو الحذف</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>معرّف التتبع المرتبط بالوصول</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>عنوان IP الخاص بالمستخدم</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>اسم المستخدم</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>حجم بيانات الاستجابة</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>رمز الخطأ الخاص بميلفوس</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>رسالة الخطأ التفصيلية</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>اسم قاعدة بيانات ملفوس المستهدفة</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>اسم مجموعة ملفوس المستهدفة</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>اسم أو أسماء قسم (أقسام) ملفوس المستهدفة</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>الوقت المستغرق لإكمال الوصول</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>الوقت الذي تتم فيه طباعة سجل الوصول (عادةً ما يعادل <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>الوقت الذي يبدأ فيه الوصول</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>الوقت الذي ينتهي فيه الوصول</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>إصدار مجموعة أدوات تطوير البرمجيات Milvus SDK التي يستخدمها المستخدم</td></tr>
</tbody>
</table>
