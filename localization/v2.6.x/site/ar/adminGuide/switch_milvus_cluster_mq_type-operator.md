---
id: switch_milvus_cluster_mq_type-operator.md
summary: تعرف على كيفية تبديل نوع قائمة انتظار الرسائل لمجموعة Milvus العنقودية.
title: تبديل نوع MQ لمجموعة Milvus Cluster
---
<h1 id="Switch-MQ-Type-for-Milvus-Cluster" class="common-anchor-header">تبديل نوع MQ لمجموعة Milvus Cluster<button data-href="#Switch-MQ-Type-for-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية تبديل نوع قائمة انتظار الرسائل (MQ) لنشر مجموعة Milvus الحالية. يدعم Milvus تبديل MQ عبر الإنترنت بين Pulsar وKafka وWoodpecker دون توقف.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>مثيل مجموعة Milvus قيد التشغيل مثبت عبر <a href="/docs/ar/v2.6.x/install_cluster-milvusoperator.md">مشغل Milvus</a> أو <a href="/docs/ar/v2.6.x/install_cluster-helm.md">Helm</a>.</li>
<li>تمت ترقية مثيل Milvus إلى أحدث إصدار يدعم ميزة تبديل MQ هذه.</li>
</ul>
<h2 id="Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="common-anchor-header">التبديل من بولسار/كافكا إلى نقار الخشب (MinIO)<button data-href="#Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><p>اتبع هذه الخطوات لتبديل نوع MQ من Pulsar أو Kafka إلى Woodpecker مع تخزين MinIO.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">الخطوة 1: تحقق من أن مثيل Milvus قيد التشغيل<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل التبديل، تأكد من تشغيل مثيل مجموعة Milvus بشكل صحيح. يمكنك التحقق من ذلك من خلال إنشاء مجموعة اختبارية وإدراج البيانات وتشغيل استعلام.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">الخطوة 2: (اختياري) التحقق من تكوين نقار الخشب<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>يضبط تكوين Milvus الافتراضي بالفعل نوع تخزين Woodpecker على MinIO، لذلك لا يلزم إجراء تكوين إضافي في معظم الحالات.</p>
<p>ومع ذلك، إذا كنت قد قمت بتخصيص تكوين Woodpecker مسبقًا، يجب التأكد من تعيين <code translate="no">woodpecker.storage.type</code> على <code translate="no">minio</code>. قم بتحديث تكوين Milvus <strong>دون</strong> تغيير القيمة <code translate="no">mqType</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>بالنسبة لـ <strong>Helm،</strong> راجع <a href="/docs/ar/v2.6.x/configure-helm.md">تكوين Milvus مع مخططات Helm</a> للحصول على إرشادات حول تحديث التكوين.</li>
<li>بالنسبة <strong>لمشغل Mil</strong>vus، راجع <a href="/docs/ar/v2.6.x/configure_operator.md">تكوين Milvus مع مشغل Milvus</a> للحصول على إرشادات حول تحديث التكوين.</li>
</ul>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">الخطوة 3: تنفيذ مفتاح التبديل MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي لتشغيل التبديل إلى Woodpecker:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>استبدل <code translate="no">&lt;mixcoord_addr&gt;</code> بالعنوان الفعلي لخدمة MixCoord الخاصة بك.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">الخطوة 4: تحقق من اكتمال التبديل<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>تكتمل عملية التبديل تلقائياً. راقب سجلات ميلفوس للرسائل الرئيسية التالية للتأكد من اكتمال عملية التبديل:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>في رسائل السجل أعلاه، <code translate="no">&lt;MQ1&gt;</code> هو نوع MQ المصدر (على سبيل المثال، <code translate="no">pulsar</code> أو <code translate="no">kafka</code>)، و <code translate="no">&lt;MQ2&gt;</code> هو نوع MQ الهدف (<code translate="no">woodpecker</code>).</p>
<ul>
<li>تشير الرسالة الأولى إلى اكتمال تحويل WAL من المصدر إلى الهدف.</li>
<li>تشير الرسالة الثانية إلى أن جميع القنوات الفعلية قد تم تبديلها.</li>
<li>تشير الرسالة الثالثة إلى أن التكوين <code translate="no">mq.type</code> قد تم تحديثه في etcd.</li>
</ul>
</div>
<h2 id="Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="common-anchor-header">التبديل من Woodpecker (MinIO) إلى Pulsar أو Kafka<button data-href="#Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>اتبع هذه الخطوات لتبديل نوع MQ من Woodpecker إلى Pulsar أو Kafka.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">الخطوة 1: تحقق من أن مثيل Milvus قيد التشغيل<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل التبديل، تأكد من تشغيل مثيل مجموعة ميلفوس بشكل صحيح.</p>
<h3 id="Step-2-Configure-the-target-MQ" class="common-anchor-header">الخطوة 2: قم بتكوين MQ الهدف<button data-href="#Step-2-Configure-the-target-MQ" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل تشغيل التبديل، تحتاج إلى التأكد من توفر خدمة MQ المستهدفة (بولسار أو كافكا) وتكوين الوصول الخاص بها في تكوين Milvus.</p>
<div class="alert note">
<p>تعتمد الخطوات الدقيقة في هذا القسم على ما إذا كنت تستخدم خدمة MQ داخلية (مجمعة) أو خارجية.</p>
</div>
<h4 id="Option-A-Internal-PulsarKafka-bundled-with-Helm" class="common-anchor-header">الخيار أ: بولسار/كافكا الداخلية (المجمعة مع Helm)</h4><p>إذا كنت تستخدم خدمة Pulsar أو Kafka المجمعة المجمعة التي تم نشرها بواسطة Helm، فقم بتحديث إصدار Helm لتمكين خدمة MQ المستهدفة وتعطيل Woodpecker. العلامة <code translate="no">streaming.enabled=true</code> مطلوبة لتمكين عقدة البث، وهو شرط أساسي لميزة تبديل MQ. على سبيل المثال، للتبديل إلى Pulsar:</p>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>بعد الترقية، تحقق من أن تكوين الوصول إلى MQ الهدف قد تم تحويله إلى تكوين Milvus. على سبيل المثال، بالنسبة لـ Pulsar</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar-proxy-address&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Option-B-Internal-PulsarKafka-managed-by-Milvus-Operator" class="common-anchor-header">الخيار ب: بولسار/كافكا الداخلي (تتم إدارته بواسطة مشغل Milvus)</h4><p>إذا كنت تستخدم مشغل Milvus، قم بتحديث مورد Milvus المخصص لتضمين تكوين الوصول إلى MQ الهدف. راجع <a href="/docs/ar/v2.6.x/configure_operator.md">تكوين Milvus مع مشغل Milvus</a> للحصول على تفاصيل حول تحديث تكوين Milvus.</p>
<h4 id="Option-C-External-PulsarKafka" class="common-anchor-header">الخيار ج: النابض الخارجي/كافكا الخارجي</h4><p>إذا كنت تستخدم خدمة بولسار أو كافكا خارجية، فلن تحتاج إلى تغيير <code translate="no">mqType</code>. ما عليك سوى إضافة تكوين الوصول إلى MQ الخارجي إلى <code translate="no">values.yaml</code> الخاص بك وإعادة تشغيل مثيل Milvus لعرض التكوين.</p>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">الخطوة 3: تنفيذ تبديل MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي لتشغيل التبديل إلى بولسار (استبدل <code translate="no">pulsar</code> بـ <code translate="no">kafka</code> في حالة التبديل إلى كافكا):</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>استبدل <code translate="no">&lt;mixcoord_addr&gt;</code> بالعنوان الفعلي لخدمة MixCoord الخاصة بك.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">الخطوة 4: تحقق من اكتمال التبديل<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>تكتمل عملية التبديل تلقائياً. راقب سجلات ميلفوس للرسائل الرئيسية التالية للتأكد من اكتمال عملية التبديل:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>في رسائل السجل أعلاه، <code translate="no">&lt;MQ1&gt;</code> هو نوع MQ المصدر (<code translate="no">woodpecker</code>)، و <code translate="no">&lt;MQ2&gt;</code> هو نوع MQ الهدف (على سبيل المثال، <code translate="no">pulsar</code> أو <code translate="no">kafka</code>).</p>
<ul>
<li>تشير الرسالة الأولى إلى اكتمال تحويل WAL من المصدر إلى الهدف.</li>
<li>تشير الرسالة الثانية إلى أن جميع القنوات الفعلية قد تم تبديلها.</li>
<li>تشير الرسالة الثالثة إلى أن تكوين <code translate="no">mq.type</code> قد تم تحديثه في etcd.</li>
</ul>
</div>
