---
id: deploy_etcd.md
title: تكوين التخزين التعريفي باستخدام Docker Compose أو Helm
related_key: "S3, storage"
summary: تعرف على كيفية تكوين التخزين التعريفي لـ Milvus باستخدام Docker Compose/Helm.
---

<h1 id="Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">تكوين التخزين التعريفي باستخدام Docker Compose أو Helm<button data-href="#Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>يستخدم ميلفوس إلخd لتخزين البيانات الوصفية. يقدم هذا الموضوع كيفية تكوين إلخd مع Docker Compose أو Helm.</p>
<h2 id="Configure-etcd-with-Docker-Compose" class="common-anchor-header">تكوين إلخ د مع Docker Compose<button data-href="#Configure-etcd-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-etcd" class="common-anchor-header">1. تكوين إلخd</h3><p>لتكوين etcd مع Docker Compose، قم بتوفير القيم الخاصة بك لقسم <code translate="no">etcd</code> في الملف <code translate="no">milvus.yaml</code> في مسار milvus/configs.</p>
<pre><code translate="no">etcd:
  endpoints:
    - localhost:<span class="hljs-number">2379</span>
  rootPath: by-dev <span class="hljs-comment"># The root path where data are stored in etcd</span>
  metaSubPath: meta <span class="hljs-comment"># metaRootPath = rootPath + &#x27;/&#x27; + metaSubPath</span>
  kvSubPath: kv <span class="hljs-comment"># kvRootPath = rootPath + &#x27;/&#x27; + kvSubPath</span>
  log:
    <span class="hljs-comment"># path is one of:</span>
    <span class="hljs-comment">#  - &quot;default&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stderr&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stdout&quot; as os.Stdout,</span>
    <span class="hljs-comment">#  - file path to append server logs to.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log</span>
    path: stdout
    level: info <span class="hljs-comment"># Only supports debug, info, warn, error, panic, or fatal. Default &#x27;info&#x27;.</span>
  use:
    <span class="hljs-comment"># please adjust in embedded Milvus: true</span>
    embed: false <span class="hljs-comment"># Whether to enable embedded Etcd (an in-process EtcdServer).</span>
  data:
    <span class="hljs-comment"># Embedded Etcd only.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/etcdData/</span>
    <span class="hljs-built_in">dir</span>: default.etcd
<button class="copy-code-btn"></button></code></pre>
<p>انظر <a href="/docs/ar/v2.5.x/configure_etcd.md">التكوينات المتعلقة بـ etcd</a> لمزيد من المعلومات.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. تشغيل ميلفوس</h3><p>قم بتشغيل الأمر التالي لبدء تشغيل Milvus الذي يستخدم تكوينات إلخd.</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">تسري التكوينات فقط بعد بدء تشغيل ميلفوس. انظر <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">بدء تشغيل Milvus</a> لمزيد من المعلومات.</div>
<h2 id="Configure-etcd-on-K8s" class="common-anchor-header">تكوين إلخd على K8s<button data-href="#Configure-etcd-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمجموعات ميلفوس على K8s، يمكنك تكوين إلخd في نفس الأمر الذي يبدأ تشغيل ميلفوس. أو بدلاً من ذلك، يمكنك تكوين إلخd باستخدام الملف <code translate="no">values.yml</code> على المسار /charts/milvus في مستودع <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> قبل بدء تشغيل Milvus.</p>
<p>يسرد الجدول التالي مفاتيح تكوين إلخd في ملف YAML.</p>
<table>
<thead>
<tr><th>المفتاح</th><th>الوصف</th><th>القيمة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">etcd.enabled</code></td><td>تمكين أو تعطيل إلخd.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.enabled</code></td><td>تمكين أو تعطيل إلخd الخارجي أو تعطيله.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.endpoints</code></td><td>نقطة النهاية للوصول إلى إلخd.</td><td></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">استخدام ملف YAML</h3><ol>
<li>تكوين القسم <code translate="no">etcd</code> باستخدام قيمك في الملف <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">etcd</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>تكوين قسم <code translate="no">externaletcd</code> باستخدام قيمك في الملف <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalEtcd:
  enabled: <span class="hljs-literal">true</span>
  <span class="hljs-comment">## the endpoints of the external etcd</span>
  endpoints:
    - &lt;your_etcd_IP&gt;:2379
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>بعد تهيئة الأقسام السابقة وحفظ الملف <code translate="no">values.yaml</code> ، قم بتشغيل الأمر التالي لتثبيت ملف ميلفوس الذي يستخدم تكوينات إلخd.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">استخدام الأمر</h3><p>لتثبيت ملف Milvus وتكوين etcd، قم بتشغيل الأمر التالي باستخدام قيمك.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> etcd.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externaletcd.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalEtcd.endpoints={&lt;your_etcd_IP&gt;:2379}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>تعلم كيفية تكوين تبعيات Milvus الأخرى باستخدام Docker Compose أو Helm:</p>
<ul>
<li><a href="/docs/ar/v2.5.x/deploy_s3.md">تهيئة تخزين الكائنات باستخدام Docker Compose أو Helm</a></li>
<li><a href="/docs/ar/v2.5.x/deploy_pulsar.md">تكوين تخزين الرسائل باستخدام Docker Compose أو Helm</a></li>
</ul>
