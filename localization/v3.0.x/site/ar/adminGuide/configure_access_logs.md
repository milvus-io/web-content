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
    </button></h1><p>تتيح ميزة سجلات الوصول في Milvus لمسؤولي الخادم تسجيل سلوك وصول المستخدمين وتحليله، مما يساعد في فهم جوانب مثل معدلات نجاح الاستعلامات وأسباب الفشل.</p>
<p>يقدم هذا الدليل إرشادات مفصلة حول تكوين سجلات الوصول في Milvus.</p>
<p>يعتمد تكوين سجلات الوصول على طريقة تثبيت Milvus:</p>
<ul>
<li><strong>التثبيت باستخدام Helm</strong>: قم بالتكوين في <code translate="no">values.yaml</code>. لمزيد من المعلومات، راجع <a href="/docs/ar/configure-helm.md">تكوين Milvus باستخدام Helm Charts</a>.</li>
<li><strong>التثبيت باستخدام Docker</strong>: قم بالتكوين في <code translate="no">milvus.yaml</code>. لمزيد من المعلومات، راجع <a href="/docs/ar/configure-docker.md">تكوين Milvus باستخدام Docker Compose</a>.</li>
<li><strong>التثبيت باستخدام Operator</strong>: قم بتعديل <code translate="no">spec.components</code> في ملف التكوين. لمزيد من المعلومات، راجع <a href="/docs/ar/configure_operator.md">تكوين Milvus باستخدام Milvus Operator</a>.</li>
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
    </button></h2><p>اختر من بين ثلاثة خيارات للتكوين وفقًا لاحتياجاتك:</p>
<ul>
<li><strong>التكوين الأساسي</strong>: للأغراض العامة.</li>
<li><strong>التكوين لملفات سجلات الوصول المحلية</strong>: لتخزين السجلات محليًا.</li>
<li><strong>التكوين لتحميل سجلات الوصول المحلية إلى MinIO</strong>: للتخزين والنسخ الاحتياطي في السحابة.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">التكوين الأساسي<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>يتضمن التكوين الأساسي تمكين سجلات الوصول وتحديد اسم ملف السجل أو استخدام stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: تحديد ما إذا كان سيتم تمكين ميزة سجل الوصول أم لا. القيمة الافتراضية هي <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: اسم ملف سجل الوصول. إذا تركت هذه المعلمة فارغة، فسيتم إخراج سجلات الوصول إلى stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">إعدادات ملفات سجلات الوصول المحلية<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتكوين التخزين المحلي لملفات سجلات الوصول باستخدام معلمات تشمل مسار الملف المحلي وحجم الملف وفترة التناوب:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتم تحديد هذه المعلمات عندما لا يكون الحقل « <code translate="no">filename</code> » فارغًا.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: مسار الملف المحلي حيث يتم تخزين ملف سجل الوصول. القيمة الافتراضية هي <code translate="no">/tmp/milvus_access</code>.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: الحد الأقصى المسموح به لحجم ملف سجل الوصول الواحد بالميغابايت. إذا وصل حجم ملف السجل إلى هذا الحد، فسيتم تشغيل عملية التناوب. تعمل هذه العملية على إغلاق ملف سجل الوصول الحالي، وإنشاء ملف سجل جديد، ومسح محتويات ملف السجل الأصلي. القيمة الافتراضية هي <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: الحد الأقصى للفاصل الزمني بالثواني المسموح به لتدوير ملف سجل الوصول الواحد. عند بلوغ الفاصل الزمني المحدد، يتم تشغيل عملية تدوير، مما يؤدي إلى إنشاء ملف سجل وصول جديد وإغلاق الملف السابق. القيمة الافتراضية هي <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: الحد الأقصى لعدد ملفات سجلات الوصول المختومة التي يمكن الاحتفاظ بها. إذا تجاوز عدد ملفات سجلات الوصول المختومة هذا الحد، فسيتم حذف أقدمها. القيمة الافتراضية هي <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">تكوين تحميل ملفات سجلات الوصول المحلية إلى MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتمكين الإعدادات وتهيئتها لتحميل ملفات سجلات الوصول المحلية إلى MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>عند تكوين معلمات MinIO، تأكد من تعيين إما <code translate="no">maxSize</code> أو <code translate="no">rotatedTime</code>. قد يؤدي عدم القيام بذلك إلى فشل عمليات تحميل ملفات سجلات الوصول المحلية إلى MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: تحديد ما إذا كان سيتم تحميل ملفات سجلات الوصول المحلية إلى MinIO أم لا. القيمة الافتراضية هي <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: مسار تخزين الكائنات لتحميل ملفات سجلات الوصول. القيمة الافتراضية هي <code translate="no">access_log/</code>.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: الفاصل الزمني المسموح به لتحميل ملفات سجلات الوصول. إذا تجاوز وقت تحميل ملف السجل هذا الفاصل الزمني، فسيتم حذف الملف. يؤدي تعيين القيمة إلى 0 إلى تعطيل هذه الميزة. القيمة الافتراضية هي <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">تكوين أداة التنسيق<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>تنسيق السجل الافتراضي المستخدم لجميع الطرق هو تنسيق <code translate="no">base</code> ، والذي لا يتطلب ارتباطات محددة بالطرق. ومع ذلك، إذا كنت ترغب في تخصيص إخراج السجل لطرق محددة، فيمكنك تعريف تنسيق سجل مخصص وتطبيقه على الطرق المرتبطة.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: يحدد تنسيق السجل باستخدام المقاييس الديناميكية. لمزيد من المعلومات، راجع <a href="#reference-supported-metrics">المقاييس المدعومة</a>.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: يسرد عمليات Milvus التي تستخدم أداة التنسيق هذه. للحصول على أسماء الطرق، راجع <strong>MilvusService</strong> في <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">طرق Milvus</a>.</li>
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
<tr><td><code translate="no">$method_name</code></td><td>اسم الطريقة</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>حالة الوصول: <strong>OK</strong> أو <strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>التعبير المستخدم في عمليات الاستعلام أو البحث أو الحذف</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>معرف التتبع (TraceID) المرتبط بالوصول</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>عنوان IP الخاص بالمستخدم</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>اسم المستخدم</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>حجم بيانات الاستجابة</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>رمز الخطأ الخاص بـ Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>رسالة الخطأ التفصيلية</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>اسم قاعدة بيانات Milvus المستهدفة</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>اسم مجموعة Milvus المستهدفة</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>اسم أو أسماء أقسام Milvus المستهدفة</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>الوقت المستغرق لإتمام الوصول</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>الوقت الذي تم فيه طباعة سجل الوصول (عادةً ما يعادل <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>الوقت الذي يبدأ فيه الوصول</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>الوقت الذي ينتهي فيه الوصول</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>إصدار Milvus SDK الذي يستخدمه المستخدم</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>نوع الخطأ: <strong>system_error</strong> أو <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>حقول الإخراج الخاصة بالطلب</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>بادئة المجموعة المحددة في <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>مستوى اتساق الطلب</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>حقل المتجه لطلب البحث أو البحث المختلط</td></tr>
<tr><td><code translate="no">$nq</code></td><td>عدد متجهات الاستعلام لطلب البحث أو البحث المختلط</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>معلمات البحث لطلب البحث أو البحث المختلط</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>معلمات الاستعلام الخاصة بطلب الاستعلام</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>وقت الطلب الذي يحدده العميل في بيانات تعريف gRPC</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>طول كل قيمة من قيم قوالب التعبيرات</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>ما إذا كان طلب upsert يمثل تحديثًا جزئيًا</td></tr>
</tbody>
</table>
