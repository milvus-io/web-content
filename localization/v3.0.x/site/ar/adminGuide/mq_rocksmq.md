---
id: mq_rocksmq.md
title: RocksMQ
---
<h1 id="Use-RocksMQ-as-the-Milvus-Message-Queue" class="common-anchor-header">استخدام RocksMQ كقائمة انتظار الرسائل في Milvus<button data-href="#Use-RocksMQ-as-the-Milvus-Message-Queue" class="anchor-icon" translate="no">
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
    </button></h1><p>RocksMQ هو قائمة انتظار رسائل مدمجة (WAL) مرفقة مع Milvus، وهي متاحة لـ <strong>Milvus Standalone فقط</strong>. كانت هذه هي قائمة انتظار الرسائل الافتراضية في الإصدارات السابقة من Milvus؛ أما في Milvus 3.x، فيستخدم Milvus Standalone <a href="/docs/ar/woodpecker.md">Woodpecker</a> المدمج بشكل افتراضي.</p>
<h2 id="Version-compatibility" class="common-anchor-header">توافق الإصدارات<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
<li><strong>الإصدار المستقل فقط</strong> — <strong>لا</strong> يتم دعم RocksMQ في Milvus Distributed (المجموعة). راجع <a href="/docs/ar/mqtype-overview.md#Supported-message-queues">مصفوفة دعم قوائم انتظار الرسائل</a>.</li>
<li>يأتي RocksMQ مرفقًا مع Milvus، لذا لا توجد نسخة منفصلة لتثبيتها.</li>
<li>كانت هذه هي قائمة انتظار الرسائل الافتراضية في الإصدارات السابقة من Milvus، وقد حلت محلها قائمة انتظار الرسائل المدمجة Woodpecker في Milvus 3.x.</li>
</ul>
<h2 id="Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="common-anchor-header">نشر Milvus Standalone مع RocksMQ باستخدام Docker<button data-href="#Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install" class="common-anchor-header">التثبيت<button data-href="#Install" class="anchor-icon" translate="no">
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
    </button></h3><p>اتبع <a href="/docs/ar/install_standalone-docker.md">إرشادات «تشغيل Milvus في Docker</a>». في Milvus 3.x، يكون Woodpecker هو الإعداد الافتراضي في الوضع المستقل، لذا قم بتغيير نوع قائمة انتظار الرسائل إلى RocksMQ بشكل صريح. يقوم البرنامج النصي للتمهيد بكتابة ملف « <code translate="no">user.yaml</code> » جديد عند <strong>أول</strong> تشغيل لـ « <code translate="no">start</code> »، لذا قم بتعيين النوع <strong>بعد</strong> ذلك التشغيل الأول ثم قم بإعادة تشغيل الخدمة ( <code translate="no">restart</code> ) لتطبيق التغيير (يحتفظ الأمر « <code translate="no">restart</code> » بـ « <code translate="no">user.yaml</code> »):</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-rocksmq &amp;&amp; <span class="hljs-built_in">cd</span> milvus-rocksmq
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># 1. First start — boots the container and writes a default user.yaml</span>
bash standalone_embed.sh start

<span class="hljs-comment"># 2. Set the message queue to RocksMQ</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: rocksmq
EOF

<span class="hljs-comment"># 3. Restart to apply the change</span>
bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
يُقصد بتغيير <code translate="no">mq.type</code> بهذه الطريقة مثيلًا <b>جديدًا تمامًا</b> (لا توجد مجموعات بعد). لتغيير قائمة انتظار الرسائل لمثيل يحتوي بالفعل على بيانات، اتبع إجراء التبديل بدلاً من ذلك.
</div>
<h3 id="Configure" class="common-anchor-header">التكوين<button data-href="#Configure" class="anchor-icon" translate="no">
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
    </button></h3><p>لضبط RocksMQ، أضف قسم <code translate="no">rocksmq</code> إلى ملف <code translate="no">user.yaml</code> وأعد تشغيل الخدمة:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<span class="hljs-attr">rocksmq:</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">/var/lib/milvus/rdb_data</span>   <span class="hljs-comment"># where messages are stored</span>
  <span class="hljs-attr">lrucacheratio:</span> <span class="hljs-number">0.06</span>              <span class="hljs-comment"># rocksdb cache memory ratio</span>
  <span class="hljs-attr">rocksmqPageSize:</span> <span class="hljs-number">67108864</span>        <span class="hljs-comment"># 64 MB, size of each message page</span>
  <span class="hljs-attr">retentionTimeInMinutes:</span> <span class="hljs-number">4320</span>     <span class="hljs-comment"># 3 days</span>
  <span class="hljs-attr">retentionSizeInMB:</span> <span class="hljs-number">8192</span>          <span class="hljs-comment"># 8 GB</span>
  <span class="hljs-attr">compactionInterval:</span> <span class="hljs-number">86400</span>        <span class="hljs-comment"># 1 day, trigger rocksdb compaction</span>
  <span class="hljs-attr">compressionTypes:</span> [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall" class="common-anchor-header">إلغاء التثبيت<button data-href="#Uninstall" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">bash standalone_embed.sh stop
bash standalone_embed.sh delete
<button class="copy-code-btn"></button></code></pre>
<h2 id="Notes" class="common-anchor-header">ملاحظات<button data-href="#Notes" class="anchor-icon" translate="no">
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
<li><strong>الترقية من الإصدار 2.5.x إلى الإصدار 2.6.x:</strong> <strong>قيود قائمة انتظار الرسائل</strong>: عند الترقية إلى Milvus v3.0-beta، يجب الحفاظ على اختيارك الحالي لقائمة انتظار الرسائل. لا يتم دعم التبديل بين أنظمة قوائم انتظار الرسائل المختلفة أثناء الترقية. سيتوفر دعم تغيير أنظمة قوائم انتظار الرسائل في الإصدارات المستقبلية.
نظرًا لأن الإصدار 2.6.x يغير الإعداد الافتراضي للنسخة المستقلة إلى Woodpecker، قم بتثبيت <code translate="no">mq.type: rocksmq</code> في ملف <code translate="no">user.yaml</code> <strong>قبل</strong> الترقية إذا كنت ترغب في الاحتفاظ بـ RocksMQ.</li>
<li>لتغيير قائمة انتظار الرسائل لمثيل قيد التشغيل، راجع التبديل من RocksMQ إلى Woodpecker.</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">ما هي الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ar/woodpecker.md">Woodpecker (قائمة انتظار الرسائل الافتراضية)</a></li>
</ul>
