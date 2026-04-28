---
id: tls.md
title: التشفير أثناء النقل
summary: تعرف على كيفية تمكين بروكسي TLS في Milvus.
---
<h1 id="Encryption-in-Transit" class="common-anchor-header">التشفير أثناء النقل<button data-href="#Encryption-in-Transit" class="anchor-icon" translate="no">
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
    </button></h1><p>TLS (أمان طبقة النقل) هو بروتوكول تشفير لضمان أمان الاتصال. يستخدم وكيل Milvus بروكسي Milvus مصادقة TLS أحادية الاتجاه وثنائية الاتجاه.</p>
<p>يصف هذا الموضوع كيفية تمكين TLS في وكيل Milvus لكل من gRPC وRESTful عمليات النقل.</p>
<div class="alert note">
<p>TLS ومصادقة المستخدم هما نهجان مختلفان للأمان. إذا قمت بتمكين كل من مصادقة المستخدم ومصادقة TLS في نظام Milvus الخاص بك، فستحتاج إلى توفير اسم مستخدم وكلمة مرور ومسارات ملفات الشهادات. للحصول على معلومات حول كيفية تمكين مصادقة المستخدم، راجع <a href="/docs/ar/authenticate.md">مصادقة وصول المستخدم</a>.</p>
</div>
<h2 id="Create-your-own-certificate" class="common-anchor-header">إنشاء الشهادة الخاصة بك<button data-href="#Create-your-own-certificate" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية</h3><p>تأكد من تثبيت OpenSSL. إذا لم تقم بتثبيته، قم <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">بإنشاء</a> OpenSSL <a href="https://github.com/openssl/openssl/blob/master/INSTALL.md">وتثبيته</a> أولاً.</p>
<pre><code translate="no" class="language-shell">openssl version
<button class="copy-code-btn"></button></code></pre>
<p>إذا لم يكن OpenSSL غير مثبت. يمكن تثبيته باستخدام الأمر التالي في Ubuntu.</p>
<pre><code translate="no" class="language-shell">sudo apt install openssl
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-files" class="common-anchor-header">إنشاء الملفات</h3><ol>
<li>قم بإنشاء الملف <code translate="no">gen.sh</code>.</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">mkdir</span> cert &amp;&amp; <span class="hljs-built_in">cd</span> cert
<span class="hljs-built_in">touch</span> gen.sh
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>انسخ البرنامج النصي التالي إلى <code translate="no">gen.sh</code>.</li>
</ol>
<p>من الضروري تكوين <code translate="no">CommonName</code> في الملف <code translate="no">gen.sh</code>. يشير <code translate="no">CommonName</code> إلى اسم الخادم الذي يجب أن يحدده العميل أثناء الاتصال.</p>
<p><details><summary><code translate="no">gen.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">#</span><span class="language-bash">!/usr/bin/env sh</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">your variables</span>
Country=&quot;US&quot;
State=&quot;CA&quot;
Location=&quot;Redwood City&quot;
Organization=&quot;zilliz&quot;
OrganizationUnit=&quot;devops&quot;
CommonName=&quot;localhost&quot;
ExpireDays=3650 # 10 years
<span class="hljs-meta prompt_">
# </span><span class="language-bash">generate private key <span class="hljs-keyword">for</span> ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out ca.key
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key
<span class="hljs-meta prompt_">
# </span><span class="language-bash">create a new ca certificate</span>
openssl req -x509 -new -nodes -key ca.key -sha256 -days 36500 -out ca.pem \
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">prepare extension config <span class="hljs-keyword">for</span> signing certificates</span>
echo &#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;$CommonName &gt; openssl.cnf
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>تعتبر المتغيرات في الملف <code translate="no">gen.sh</code> ضرورية لعملية إنشاء ملف طلب توقيع الشهادة. المتغيرات الخمسة الأولى هي معلومات التوقيع الأساسية، بما في ذلك البلد والولاية والموقع والمنظمة ووحدة التنظيم. يجب توخي الحذر عند تكوين <code translate="no">CommonName</code> حيث سيتم التحقق منها أثناء الاتصال بين العميل والخادم.</p>
<h3 id="Run-gensh-to-generate-certificate" class="common-anchor-header">تشغيل <code translate="no">gen.sh</code> لإنشاء شهادة</h3><p>قم بتشغيل الملف <code translate="no">gen.sh</code> لإنشاء الشهادة.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x gen.sh
./gen.sh
<button class="copy-code-btn"></button></code></pre>
<p>سيتم إنشاء الملفات السبعة التالية: <code translate="no">ca.key</code> ، <code translate="no">ca.pem</code> ، <code translate="no">ca.srl</code> ، ، <code translate="no">server.key</code> ، <code translate="no">server.pem</code> ، <code translate="no">client.key</code> ، <code translate="no">client.pem</code>.</p>
<p>تأكد من الاحتفاظ بالملفات <code translate="no">ca.key</code> ، <code translate="no">ca.pem</code> ، ، <code translate="no">ca.srl</code> آمنة من أجل تجديد شهاداتك لاحقًا. يتم استخدام الملفين <code translate="no">server.key</code> و <code translate="no">server.pem</code> من قبل الخادم، ويتم استخدام الملفين <code translate="no">client.key</code> و <code translate="no">client.pem</code> من قبل العميل.</p>
<h3 id="Renew-certificates-optional" class="common-anchor-header">تجديد الشهادات (اختياري)</h3><p>إذا كنت ترغب في تجديد الشهادات في بعض الحالات، على سبيل المثال إذا كانت ستنتهي صلاحيتها قريباً، يمكنك استخدام البرنامج النصي التالي.</p>
<p>تحتاج إلى <code translate="no">ca.key</code> و <code translate="no">ca.pem</code> و <code translate="no">ca.srl</code> في دليل العمل الخاص بك.</p>
<p><details><summary><code translate="no">renew.sh</code></summary></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">#</span><span class="language-bash">!/usr/bin/env sh</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">your variables</span>
Country=&quot;US&quot;
State=&quot;CA&quot;
Location=&quot;Redwood City&quot;
Organization=&quot;zilliz&quot;
OrganizationUnit=&quot;devops&quot;
CommonName=&quot;localhost&quot;
ExpireDays=3650 # 10 years
<span class="hljs-meta prompt_">
# </span><span class="language-bash">generate private key <span class="hljs-keyword">for</span> ca, server and client</span>
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key
<span class="hljs-meta prompt_">
# </span><span class="language-bash">prepare extension config <span class="hljs-keyword">for</span> signing certificates</span>
echo &#x27;[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = &#x27;$CommonName &gt; openssl.cnf
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign server certificate with ca</span>
openssl req -new -key server.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<span class="hljs-meta prompt_">
# </span><span class="language-bash">sign client certificate with ca</span>
openssl req -new -key client.key\
  -subj &quot;/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName&quot;\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>قم بتشغيل الملف <code translate="no">renew.sh</code> لإنشاء الشهادة.</p>
<pre><code translate="no"><span class="hljs-built_in">chmod</span> +x renew.sh
./renew.sh
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-a-Milvus-server-with-TLS" class="common-anchor-header">إعداد خادم Milvus مع TLS<button data-href="#Set-up-a-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح هذا القسم خطوات تكوين خادم Milvus مع تشفير TLS.</p>
<h3 id="Setup-for-Docker-Compose" class="common-anchor-header">الإعداد لـ Docker Compose</h3><h4 id="1-Modify-the-Milvus-server-configuration" class="common-anchor-header">1. تعديل تكوين خادم Milvus</h4><p>لتمكين TLS الخارجي، أضف التكوينات التالية في ملف <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">http:</span>
    <span class="hljs-comment"># for now milvus do not support config restful on same port with grpc</span>
    <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
<span class="hljs-attr">tls:</span>
  <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/milvus/tls/server.pem</span>
  <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/milvus/tls/server.key</span>
  <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/milvus/tls/ca.pem</span>

<span class="hljs-attr">common:</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">1</span>
<button class="copy-code-btn"></button></code></pre>
<p>المعلمات:</p>
<ul>
<li><code translate="no">serverPemPath</code>: المسار إلى ملف شهادة الخادم.</li>
<li><code translate="no">serverKeyPath</code>: المسار إلى ملف مفتاح الخادم.</li>
<li><code translate="no">caPemPath</code>: المسار إلى ملف شهادة CA.</li>
<li><code translate="no">tlsMode</code>: وضع TLS للخدمة الخارجية. قيم صالحة:<ul>
<li><code translate="no">1</code>: مصادقة أحادية الاتجاه، حيث يتطلب الخادم فقط شهادة ويقوم العميل بالتحقق منها. يتطلب هذا الوضع <code translate="no">server.pem</code> و <code translate="no">server.key</code> من جانب الخادم، و <code translate="no">server.pem</code> من جانب العميل.</li>
<li><code translate="no">2</code>: المصادقة ثنائية الاتجاه، حيث يتطلب كل من الخادم والعميل شهادات لإنشاء اتصال آمن. يتطلب هذا الوضع <code translate="no">server.pem</code> و <code translate="no">server.key</code> و <code translate="no">ca.pem</code> من جانب الخادم، و <code translate="no">client.pem</code> و <code translate="no">client.key</code> و <code translate="no">ca.pem</code> من جانب العميل.</li>
</ul></li>
</ul>
<p>لتمكين TLS الداخلي، أضف التكوينات التالية في الملف <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">internaltls:</span>
  <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/milvus/tls/server.pem</span>
  <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/milvus/tls/server.key</span>
  <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/milvus/tls/ca.pem</span>

<span class="hljs-attr">common:</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">internaltlsEnabled:</span> <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<p>المعلمات:</p>
<ul>
<li><code translate="no">serverPemPath</code>: المسار إلى ملف شهادة الخادم.</li>
<li><code translate="no">serverKeyPath</code>: المسار إلى ملف مفتاح الخادم.</li>
<li><code translate="no">caPemPath</code>: المسار إلى ملف شهادة CA.</li>
<li><code translate="no">internaltlsEnabled</code>: ما إذا كان سيتم تمكين TLS الداخلي. في الوقت الحالي يتم دعم TLS أحادي الاتجاه فقط.</li>
</ul>
<h4 id="2-Map-certificate-files-to-the-container" class="common-anchor-header">2. تعيين ملفات الشهادات إلى الحاوية</h4><h5 id="Prepare-certificate-files" class="common-anchor-header">إعداد ملفات الشهادات</h5><p>قم بإنشاء مجلد جديد باسم <code translate="no">tls</code> في نفس دليل <code translate="no">docker-compose.yaml</code>. انسخ <code translate="no">server.pem</code> و <code translate="no">server.key</code> و <code translate="no">ca.pem</code> إلى المجلد <code translate="no">tls</code>. ضعهم في بنية دليل على النحو التالي:</p>
<pre><code translate="no">├── docker-compose.yml
├── milvus.yaml
└── tls
<span class="hljs-code">     ├── server.pem
     ├── server.key
     └── ca.pem
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Update-Docker-Compose-configuration" class="common-anchor-header">قم بتحديث تكوين Docker Compose</h4><p>قم بتحرير الملف <code translate="no">docker-compose.yaml</code> لتعيين مسارات ملفات الشهادات داخل الحاوية كما هو موضح أدناه:</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:latest</span>
    <span class="hljs-attr">command:</span> [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;standalone&quot;</span>]
    <span class="hljs-attr">security_opt:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">seccomp:unconfined</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ETCD_ENDPOINTS:</span> <span class="hljs-string">etcd:2379</span>
      <span class="hljs-attr">MINIO_ADDRESS:</span> <span class="hljs-string">minio:9000</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/tls:/milvus/tls</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h5 id="Deploy-Milvus-using-Docker-Compose" class="common-anchor-header">نشر ميلفوس باستخدام Docker Compose</h5><p>قم بتنفيذ الأمر التالي لنشر ميلفوس:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setup-for-Milvus-Operator" class="common-anchor-header">إعداد مشغل Milvus</h3><p>ضع ملفات الشهادة في دليل العمل الخاص بك. يجب أن تبدو بنية الدليل هكذا:</p>
<pre><code translate="no">├── milvus.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء سر مع ملفات الشهادة:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>لتمكين TLS الخارجي، أضف التكوينات التالية في الملف <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># tlsMode for external service 1 for one-way TLS, 2 for Mutual TLS, 0 for disable</span>
    <span class="hljs-attr">tls:</span>
      <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/certs/server.pem</span>
      <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/certs/server.key</span>
      <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/certs/ca.pem</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">secret:</span>
          <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">volumeMounts:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
        <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>لتمكين TLS الداخلي، أضف التكوينات التالية في الملف <code translate="no">milvus.yaml</code>:</p>
<p>تذكر استبدال الحقل <code translate="no">internaltls.sni</code> بالاسم الشائع في شهاداتك.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">http:</span>
        <span class="hljs-comment"># for now not support config restful on same port with grpc</span>
        <span class="hljs-comment"># so we set to 8080, grpc will still use 19530</span>
        <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span> 
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">internaltlsEnabled:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># whether to enable internal tls</span>
    <span class="hljs-comment"># Configure tls certificates path for internal service</span>
    <span class="hljs-attr">internaltls:</span>
      <span class="hljs-attr">serverPemPath:</span> <span class="hljs-string">/certs/server.pem</span>
      <span class="hljs-attr">serverKeyPath:</span> <span class="hljs-string">/certs/server.key</span>
      <span class="hljs-attr">caPemPath:</span> <span class="hljs-string">/certs/ca.pem</span>
      <span class="hljs-attr">sni:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># the CommonName in your certificates</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># mount the certs secret to the milvus container</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">secret:</span>
          <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">volumeMounts:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
        <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
        <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>إنشاء ملف Milvus CR:</p>
<pre><code translate="no" class="language-bash">kubectl create -f milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="setup-for-Milvus-Helm" class="common-anchor-header">الإعداد لـ Milvus Helm</h3><p>ضع ملفات الشهادة في دليل العمل الخاص بك. يجب أن تبدو بنية الدليل هكذا:</p>
<pre><code translate="no">├── values.yaml (<span class="hljs-keyword">to</span> be created later)
├── server.pem
├── server.<span class="hljs-keyword">key</span>
└── ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>إنشاء سر مع ملفات الشهادة:</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
<button class="copy-code-btn"></button></code></pre>
<p>لتمكين TLS الخارجي، أضف التكوينات التالية في الملف <code translate="no">values.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        # for now not support config restful on same port with grpc
        # so we set to 8080, grpc will still use 19530
        port: 8080 
    common:
      security:
        tlsMode: 1 # tlsMode for external service 1 means set to 2 to enable Mutual TLS
    # Configure tls certificates path for external service
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
</span><span class="hljs-comment"># mount the certs secret to the milvus container</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>لتمكين TLS الداخلي، أضف التكوينات التالية في الملف <code translate="no">values.yaml</code>:</p>
<p>تذكر استبدال الحقل <code translate="no">internaltls.sni</code> بالاسم الشائع في شهاداتك.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        internaltlsEnabled: true # whether to enable internal tls
    # Configure tls certificates path for internal service
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost
</span><span class="hljs-comment"># mount the certs secret to the milvus container</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">certs</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">certs</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/certs</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء إصدار ميلفوس:</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update milvus
helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-Internal-TLS-enabled" class="common-anchor-header">التحقق من تمكين TLS الداخلي<button data-href="#Verify-Internal-TLS-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>من الصعب التحقق من TLS الداخلي مباشرة. يمكنك التحقق من سجل Milvus لمعرفة ما إذا كان TLS الداخلي ممكّنًا.</p>
<p>في سجل Milvus، يجب أن ترى الرسالة التالية إذا تم تمكين TLS الداخلي:</p>
<pre><code translate="no"><span class="hljs-selector-attr">[...date time...]</span> <span class="hljs-selector-attr">[INFO]</span> <span class="hljs-selector-attr">[utils/util.go:56]</span> <span class="hljs-selector-attr">[<span class="hljs-string">&quot;Internal TLS Enabled&quot;</span>]</span> <span class="hljs-selector-attr">[value=true]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-the-Milvus-server-with-TLS" class="common-anchor-header">الاتصال بخادم Milvus باستخدام TLS<button data-href="#Connect-to-the-Milvus-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لتفاعلات SDK، استخدم الإعدادات التالية اعتماداً على وضع TLS.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">اتصال TLS أحادي الاتجاه</h3><p>قم بتوفير المسار إلى <code translate="no">server.pem</code> وتأكد من تطابق <code translate="no">server_name</code> مع <code translate="no">CommonName</code> الذي تم تكوينه في الشهادة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    server_pem_path=<span class="hljs-string">&quot;path_to/server.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">اتصال TLS ثنائي الاتجاه</h3><p>قم بتوفير المسارات إلى <code translate="no">client.pem</code> و <code translate="no">client.key</code> و <code translate="no">ca.pem</code> وتأكد من أن <code translate="no">server_name</code> يطابق <code translate="no">CommonName</code> المكوّن في الشهادة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;https://localhost:19530&quot;</span>,
    secure=<span class="hljs-literal">True</span>,
    client_pem_path=<span class="hljs-string">&quot;path_to/client.pem&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;path_to/client.key&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;path_to/ca.pem&quot;</span>,
    server_name=<span class="hljs-string">&quot;localhost&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>انظر <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls1.py">example_tls1.py</a> و <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls2.py">example_tls2.py</a> لمزيد من المعلومات.</p>
<h2 id="Connect-to-the-Milvus-RESTful-server-with-TLS" class="common-anchor-header">الاتصال بخادم Milvus RESTful مع TLS<button data-href="#Connect-to-the-Milvus-RESTful-server-with-TLS" class="anchor-icon" translate="no">
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
    </button></h2><p>بالنسبة لواجهات برمجة تطبيقات RESTful، يمكنك التحقق من TLS باستخدام الأمر <code translate="no">curl</code>.</p>
<h3 id="One-way-TLS-connection" class="common-anchor-header">اتصال TLS أحادي الاتجاه</h3><pre><code translate="no" class="language-bash">curl --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
<h3 id="Two-way-TLS-connection" class="common-anchor-header">اتصال TLS ثنائي الاتجاه</h3><pre><code translate="no" class="language-bash">curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
<button class="copy-code-btn"></button></code></pre>
