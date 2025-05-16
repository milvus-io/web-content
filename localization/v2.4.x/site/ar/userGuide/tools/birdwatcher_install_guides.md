---
id: birdwatcher_install_guides.md
summary: تعرف على كيفية تثبيت Birdwatch لتصحيح أخطاء ميلفوس.
title: تثبيت Birdwatcher
---
<h1 id="Install-Birdwatcher" class="common-anchor-header">تثبيت Birdwatcher<button data-href="#Install-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية تثبيت Birdwatcher.</p>
<h2 id="Local-install" class="common-anchor-header">التثبيت المحلي<button data-href="#Local-install" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت قد قمت بتثبيت ميلفوس ستاندالون <a href="/docs/ar/v2.4.x/install_standalone-docker.md">باستخدام docker،</a> فمن الأفضل تنزيل وتثبيت النسخة الثنائية المدمجة، أو تثبيت Birdwatcher كوحدة Go مشتركة، أو بناء Birdwatcher من المصدر.</p>
<ul>
<li><p>قم بتثبيته كوحدة Go مشتركة.</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go install github.com/milvus-io/birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك تشغيل Birdwatcher على النحو التالي:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">go</span> run main.<span class="hljs-keyword">go</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم ببنائه من المصدر.</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go build -o birdwatcher main.go
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك تشغيل Birdwatcher على النحو التالي:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتنزيل النسخة الثنائية المبنية مسبقًا</p>
<p>أولاً، افتح <a href="https://github.com/milvus-io/birdwatcher/releases/latest">صفحة الإصدار الأخير،</a> وابحث عن الثنائيات المجهزة.</p>
<pre><code translate="no" class="language-shell">wget -O birdwatcher.tar.gz \
https://github.com/milvus-io/birdwatcher/releases/download/latest/birdwatcher_&lt;os&gt;_&lt;<span class="hljs-built_in">arch</span>&gt;.tar.gz
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك فك ضغط كرة القطران واستخدام Birdwatcher على النحو التالي:</p>
<pre><code translate="no" class="language-shell">tar -xvzf birdwatcher.tar.gz
./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Install-as-a-Kubernetes-pod" class="common-anchor-header">التثبيت كجراب Kubernetes<button data-href="#Install-as-a-Kubernetes-pod" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت قد قمت بتثبيت إما Milvus Standalone <a href="/docs/ar/v2.4.x/install_standalone-helm.md">باستخدام مخططات Helm</a> أو <a href="/docs/ar/v2.4.x/install_standalone-operator.md">Milvus Operator</a> أو Milvus Cluster <a href="/docs/ar/v2.4.x/install_cluster-helm.md">باستخدام مخططات Helm</a> أو <a href="/docs/ar/v2.4.x/install_cluster-milvusoperator.md">Milvus Operator،</a> يُنصح بتثبيت Birdwatcher كجراب Kubernetes.</p>
<h3 id="Prepare-deploymentyml" class="common-anchor-header">إعداد deployment.yml</h3><pre><code translate="no" class="language-yml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: birdwatcher
spec:
  selector:
    matchLabels:
      app: birdwatcher
  template:
    metadata:
      labels:
        app: birdwatcher
    spec:
      containers:
      - name: birdwatcher
        image: milvusdb/birdwatcher
        resources:
          limits:
            memory: <span class="hljs-string">&quot;128Mi&quot;</span>
            cpu: <span class="hljs-string">&quot;500m&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا لم تكن الصورة المتوفرة على DockerHub هي الأحدث، يمكنك إنشاء صورة لـ Birdwatcher باستخدام ملف Dockerfile المرفق مع الكود المصدري كما يلي:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
docker build -t milvusdb/birdwatcher .
<button class="copy-code-btn"></button></code></pre>
<p>لنشر صورة مبنية محليًا، تحتاج إلى إضافة <code translate="no">imagePullPolicy</code> إلى المواصفات المذكورة أعلاه وتعيينها إلى <code translate="no">Never</code>.</p>
<pre><code translate="no" class="language-yaml">...
      - name: birdwatcher
        image: milvusdb/birdwatcher
        imagePullPolicy: Never
...
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Apply-deploymentyml" class="common-anchor-header">تطبيق deployment.yml</h3><p>احفظ YAML أعلاه في ملف وسمه <code translate="no">deployment.yml</code> ، وقم بتشغيل الأمر التالي</p>
<pre><code translate="no" class="language-shell">kubectl apply -f deployment.yml
<button class="copy-code-btn"></button></code></pre>
