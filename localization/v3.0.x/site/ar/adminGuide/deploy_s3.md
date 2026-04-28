---
id: deploy_s3.md
title: تكوين تخزين الكائنات باستخدام Docker Compose أو Helm
related_key: 'S3, storage'
summary: تعرف على كيفية إعداد تخزين S3 لميلفوس باستخدام Docker Compose أو Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">تكوين تخزين الكائنات باستخدام Docker Compose أو Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>يستخدم ميلفوس MinIO لتخزين الكائنات بشكل افتراضي، ولكنه يدعم أيضًا استخدام <a href="https://aws.amazon.com/s3/">خدمة التخزين البسيط من أمازون (S3)</a> كتخزين كائنات دائم لملفات السجل والفهرس. يصف هذا الموضوع كيفية تكوين S3 لميلفوس. يمكنك تخطي هذا الموضوع إذا كنت راضيًا عن MinIO.</p>
<p>يمكنك تكوين S3 باستخدام <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> أو على K8s.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">تكوين S3 باستخدام Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. تكوين S3</h3><p><a href="https://min.io/product/overview">MinIO</a> متوافق مع S3. لتهيئة S3 مع Docker Compose، قم بتوفير القيم الخاصة بك للقسم <code translate="no">minio</code> في الملف <code translate="no">milvus.yaml</code> على مسار ميلفوس/كونفيغس.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>راجع <a href="/docs/ar/configure_minio.md">تكوينات MinIO/S3</a> لمزيد من المعلومات.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. صقل docker-compose.yaml</h3><p>يمكنك أيضًا إزالة متغير البيئة <code translate="no">MINIO_ADDRESS</code> لخدمة milvus في <code translate="no">docker-compose.yaml</code>. بشكل افتراضي سيستخدم ميلفوس المينيو المحلي بدلاً من S3 الخارجي.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. قم بتشغيل ميلفوس</h3><p>قم بتشغيل الأمر التالي لبدء تشغيل Milvus الذي يستخدم تكوينات S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">لا تدخل التكوينات حيز التنفيذ إلا بعد بدء تشغيل Milvus. انظر <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">بدء تشغيل Milvus</a> لمزيد من المعلومات.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">تكوين S3 على K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لمجموعات Milvus على K8s، يمكنك تكوين S3 في نفس الأمر الذي يبدأ تشغيل Milvus. وبدلاً من ذلك، يمكنك تكوين S3 باستخدام الملف <code translate="no">values.yml</code> على المسار /charts/milvus في مستودع <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> قبل بدء تشغيل Milvus.</p>
<p>يسرد الجدول التالي مفاتيح تكوين S3 في ملف YAML.</p>
<table>
<thead>
<tr><th>المفتاح</th><th>الوصف</th><th>القيمة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>تمكين أو تعطيل MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>تمكين S3 أو تعطيله.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>نقطة النهاية للوصول إلى S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>منفذ الوصول إلى S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>المسار الجذر للتخزين S3.</td><td>سلسلة emtpy افتراضيًا.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>معرّف مفتاح الوصول لـ S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>مفتاح الوصول السري لـ S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>اسم دلو S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>ما إذا كان يجب استخدام SSL عند الاتصال</td><td>القيم الافتراضية لـ <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">استخدام ملف YAML</h3><ol>
<li>تكوين القسم <code translate="no">minio</code> في الملف <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>تكوين قسم <code translate="no">externalS3</code> باستخدام قيمك في الملف <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>بعد تكوين الأقسام السابقة وحفظ الملف <code translate="no">values.yaml</code> ، قم بتشغيل الأمر التالي لتثبيت ملف Milvus الذي يستخدم تكوينات S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">استخدام الأمر</h3><p>لتثبيت ملف Milvus وتكوين S3، قم بتشغيل الأمر التالي باستخدام قيمك.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=&lt;your_s3_endpoint&gt; --set externalS3.port=&lt;your_s3_port&gt; --set externalS3.accessKey=&lt;your_s3_access_key_id&gt; --set externalS3.secretKey=&lt;your_s3_secret_key&gt; --set externalS3.bucketName=&lt;your_bucket_name&gt;
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
<li><a href="/docs/ar/deploy_etcd.md">تكوين التخزين التعريفي باستخدام Docker Compose أو Helm</a></li>
<li><a href="/docs/ar/deploy_pulsar.md">تكوين تخزين الرسائل باستخدام Docker Compose أو Helm</a></li>
</ul>
