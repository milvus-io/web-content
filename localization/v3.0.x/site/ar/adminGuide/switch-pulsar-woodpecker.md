---
id: switch-pulsar-woodpecker.md
title: التبديل بين Pulsar و Woodpecker
summary: >-
  قم بالتبديل بين Pulsar و Woodpecker في قائمة انتظار الرسائل الخاصة بمجموعة
  Milvus، باستخدام Helm أو Milvus Operator.
---
<h1 id="Switch-between-Pulsar-and-Woodpecker" class="common-anchor-header">التبديل بين Pulsar و Woodpecker<button data-href="#Switch-between-Pulsar-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية التبديل بين <strong>Pulsar</strong> (مدمج أو خارجي) و <strong>Woodpecker</strong> (خلفية MinIO) لقائمة انتظار الرسائل (MQ) في <strong>مجموعة Milvus،</strong> في كلا الاتجاهين. للاطلاع على سير العمل العام والمتطلبات الأساسية، راجع <a href="/docs/ar/switch-mq-type.md">"التبديل بين أنواع MQ</a>".</p>
<div class="alert note">
<p><strong>المتطلبات الأساسية:</strong> تتوفر ميزة «التبديل بين قوائم انتظار الرسائل» في <strong>Milvus 3.0 والإصدارات الأحدث</strong>. قم بترقية مثيل Milvus الخاص بك إلى Milvus 3.0 أو إصدار أحدث قبل البدء — فهذه الميزة غير متوفرة في الإصدارات الأقدم.</p>
</div>
<div class="alert warning">
<p>يعد تبديل قائمة انتظار الرسائل <strong>عملية تنطوي على مخاطر عالية</strong>. اختر القسم الذي يتوافق مع طريقة النشر <strong>الخاصة بك</strong> — <strong>باستخدام Helm</strong> أو <strong>باستخدام Milvus Operator</strong> — واتبع التعليمات من البداية إلى النهاية. لا تخلط بين أوامر Helm و Operator.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">باستخدام Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Helm" class="common-anchor-header">التبديل من Pulsar إلى Woodpecker (Helm)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>الخطوة 1: تحقق من تشغيل مثيل Milvus.</strong> تأكد من أن مجموعة Milvus تعمل بشكل صحيح — على سبيل المثال، عن طريق إنشاء مجموعة اختبارية، وإدخال البيانات، وتشغيل استعلام.</p>
<p><strong>الخطوة 2: تنفيذ عملية التبديل إلى MQ.</strong> افتح واجهة إدارة MixCoord، ثم استدعِ واجهة برمجة التطبيقات (API) الخاصة بالتبديل:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>في محطة طرفية أخرى:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>الخطوة 3: تحقق من اكتمال عملية التبديل.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>يتم تسجيل التبديل الناجح في <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<p><strong>الخطوة 4: (اختياري) إيقاف Pulsar وتنظيفه.</strong> بالنسبة لـ Pulsar <strong>المدمج،</strong> قم بتعطيل Pulsar وتمكين Woodpecker، ثم احذف PVCs الخاصة بـ Pulsar:</p>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ Pulsar <strong>الخارجي،</strong> قم بتنظيف مواضيع Milvus في مثيل Pulsar الخارجي. تتبع مواضيع Milvus التنسيق <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> (على سبيل المثال، <code translate="no">by-dev-rootcoord-dml_10_464633776992639586v0</code>).</p>
<div class="alert note">
<p>إذا كنت تخطط للعودة إلى Pulsar لاحقًا، فقم بتنظيف البيانات/المواضيع أولاً لتجنب التعارضات. نظرًا لقيود مخطط Helm، لا يمكن حاليًا العودة إلى مثيل Pulsar <strong>المدمج</strong>.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Helm" class="common-anchor-header">التحول من Woodpecker إلى Pulsar (Helm)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>الخطوة 1: تحقق من أن مثيل Milvus قيد التشغيل.</strong></p>
<p><strong>الخطوة 2: قم بتكوين اتصال Pulsar المستهدف وأعد تشغيل Milvus.</strong> يتطلب التبديل أن يكون Milvus على دراية مسبقة باتصال Pulsar، لذا قم بكتابته في <code translate="no">user.yaml</code> عبر <code translate="no">extraConfigFiles</code> وقم بتطبيقه باستخدام <code translate="no">helm upgrade</code> (الذي يقوم بتدوير البودات). يُعد <code translate="no">streaming.enabled=true</code> ضروريًا لميزة Switch MQ.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: &lt;pulsar addr&gt;
      port: &lt;pulsar port, e.g. 6650&gt;
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>انتظر حتى تصبح جميع البودات جاهزة، ثم تأكد من أن تكوين الوصول إلى Pulsar قد تم تضمينه في تكوين Milvus.</p>
<p><strong>الخطوة 3: تنفيذ التبديل إلى MQ.</strong></p>
<div class="alert note">
<p>تأكد من أن Pulsar الهدف لا يحتوي على مواضيع Milvus من تكوين سابق. إذا كان هذا هو التبديل الأول إلى Pulsar، فتخط هذه الملاحظة؛ وإلا فقم أولاً بتنظيف مواضيع Milvus المتبقية التي تحمل نفس الأسماء.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>في محطة طرفية أخرى:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>الخطوة 4: تحقق من اكتمال عملية التبديل.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>يُسجل التبديل الناجح الرسالة التالية: <code translate="no">[mqTypeValue=pulsar]</code>.</p>
<p><strong>الخطوة 5: (اختياري) قم بإزالة بيانات Woodpecker.</strong> احذف بيانات Woodpecker الموجودة على MinIO/S3 (تحت <code translate="no">&lt;rootPath&gt;/wp/...</code> ، وعادةً ما تكون <code translate="no">files/wp/...</code>) وبيانات تعريف Woodpecker في etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). إذا كنت تخطط للعودة إلى Woodpecker لاحقًا، فقم بإزالة هذه الملفات أولاً.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">باستخدام Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="common-anchor-header">التبديل من Pulsar إلى Woodpecker (مشغل Milvus)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>الخطوة 1: تحقق من أن مثيل Milvus قيد التشغيل.</strong></p>
<p><strong>الخطوة 2: تنفيذ عملية التبديل في MQ.</strong> خدمة MixCoord غير مكشوفة، لذا قم بتشغيل واجهة برمجة تطبيقات (API) التبديل من داخل بود MixCoord:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>الخطوة 3: تحقق من اكتمال عملية التبديل.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>يتم تسجيل التبديل الناجح في <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<p><strong>الخطوة 4: قم بتحديث نوع MQ في Operator.</strong> قم بتحديث التكوين الذي يديره<strong>Operator</strong> حتى لا يقوم Operator بإلغاء عملية التبديل. قم بإنشاء <code translate="no">change_configmap.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>الخطوة 5: (اختياري) إيقاف Pulsar وتنظيف النظام.</strong> بالنسبة لـ Pulsar <strong>المدمج،</strong> قم بإلغاء تثبيت إصدار Pulsar وحذف PVCs الخاصة به:</p>
<pre><code translate="no" class="language-shell">helm uninstall my-release-pulsar
kubectl get pvc | grep my-release-pulsar
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ Pulsar <strong>الخارجي،</strong> قم بتنظيف مواضيع Milvus (تنسيق <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<div class="alert note">
<p>إذا كنت تخطط للعودة إلى Pulsar لاحقًا، فقم بتنظيف البيانات/المواضيع أولاً لتجنب التعارضات. نظرًا لقيود مخطط Helm، لا يمكن حاليًا العودة إلى مثيل Pulsar <strong>المدمج</strong>.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="common-anchor-header">التبديل من Woodpecker إلى Pulsar (مشغل Milvus)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>الخطوة 1: تحقق من أن مثيل Milvus قيد التشغيل.</strong></p>
<p><strong>الخطوة 2: قم بتكوين اتصال Pulsar المستهدف وأعد تشغيل Milvus.</strong> ضع اتصال Pulsar ضمن <code translate="no">spec.config</code> (يقوم المشغل بتحويل <code translate="no">spec.config</code> إلى <code translate="no">user.yaml</code>) وقم بتعيين نوع MQ؛ يؤدي تطبيق CR إلى تحديث البودات بالتكوين الجديد.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">addr&gt;</span>
      <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">port,</span> <span class="hljs-string">e.g.</span> <span class="hljs-number">6650</span><span class="hljs-string">&gt;
  dependencies:
    msgStreamType: pulsar
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>انتظر حتى تصبح جميع البودات جاهزة، ثم تأكد من أن تكوين الوصول إلى Pulsar قد تم تحويله إلى تكوين Milvus.</p>
<p><strong>الخطوة 3: تنفيذ التبديل إلى MQ.</strong></p>
<div class="alert note">
<p>تأكد من أن Pulsar الهدف لا يحتوي على مواضيع Milvus من تكوين سابق. إذا كان هذا هو التبديل الأول إلى Pulsar، فتخط هذه الملاحظة؛ وإلا فقم أولاً بتنظيف مواضيع Milvus المتبقية التي تحمل نفس الأسماء.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>الخطوة 4: تحقق من اكتمال عملية التبديل.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>يتم تسجيل التحويل الناجح في <code translate="no">[mqTypeValue=pulsar]</code>.</p>
<p><strong>الخطوة 5: (اختياري) قم بإزالة بيانات Woodpecker.</strong> احذف بيانات Woodpecker الموجودة على MinIO/S3 (تحت <code translate="no">&lt;rootPath&gt;/wp/...</code> ، وعادةً ما تكون <code translate="no">files/wp/...</code>) وبيانات تعريف Woodpecker في etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). إذا كنت تخطط للعودة إلى Woodpecker لاحقًا، فقم بإزالة هذه الملفات أولاً.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">السيناريوهات المدعومة<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>مصدر MQ</th><th>مستقبل MQ</th><th>Helm</th><th>مشغل Milvus</th></tr>
</thead>
<tbody>
<tr><td>Pulsar المدمج</td><td>وودبيكر (MinIO)</td><td><strong>مدعوم</strong></td><td><strong>مدعوم</strong></td></tr>
<tr><td>Pulsar خارجي</td><td>وودبيكر (MinIO)</td><td><strong>مدعوم</strong></td><td><strong>مدعوم</strong></td></tr>
<tr><td>وودبيكر (MinIO)</td><td>Pulsar الخارجي</td><td><strong>مدعوم</strong></td><td><strong>مدعوم</strong></td></tr>
<tr><td>بولسار</td><td>وودبيكر (محلي)</td><td><strong>مدعوم ولكن غير موصى به</strong> (تحتاج جميع الوحدات إلى نظام ملفات مشترك)</td><td><strong>غير مدعوم</strong></td></tr>
</tbody>
</table>
