---
id: authenticate.md
summary: تعرف على كيفية إدارة مصادقة المستخدم في Milvus.
title: مصادقة وصول المستخدم
---

<h1 id="Authenticate-User-Access" class="common-anchor-header">مصادقة وصول المستخدم<button data-href="#Authenticate-User-Access" class="anchor-icon" translate="no">
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
    </button></h1><p>يشرح هذا الدليل كيفية إدارة مصادقة المستخدم في Milvus، بما في ذلك تمكين المصادقة والاتصال كمستخدم وتعديل بيانات اعتماد المستخدم.</p>
<div class="alert note">
<ul>
<li><p>TLS ومصادقة المستخدم هما نهجان مختلفان للأمان. إذا قمت بتمكين كل من مصادقة المستخدم و TLS في نظام Milvus الخاص بك، يجب عليك توفير اسم مستخدم وكلمة مرور ومسارات ملفات الشهادات. للحصول على معلومات حول كيفية تمكين TLS، راجع <a href="/docs/ar/v2.5.x/tls.md">التشفير في النقل</a>.</p></li>
<li><p>تستخدم مقتطفات التعليمات البرمجية في هذه الصفحة <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> الجديد (Python) للتفاعل مع Milvus. سيتم إصدار MilvusClient SDKs الجديدة للغات الأخرى في التحديثات المستقبلية.</p></li>
</ul>
</div>
<h2 id="Enable-user-authentication" class="common-anchor-header">تمكين مصادقة المستخدم<button data-href="#Enable-user-authentication" class="anchor-icon" translate="no">
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
    </button></h2><div class="filter">
 <a href="#operator">مُشغّل</a> <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a> <a href="#operator">Milvus</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<p>لتمكين مصادقة المستخدم لخادم Milvus الخاص بك، قم بتعيين common.security.authorizationEnabled إلى صواب في ملف تكوين Milvus <code translate="no">milvus.yaml</code>. لمزيد من المعلومات حول التكوينات، راجع <a href="https://milvus.io/docs/configure-docker.md?tab=component">تكوين Milvus مع Docker Compose</a>.</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">common</span>:
...
  <span class="hljs-attr">security</span>:
    <span class="hljs-attr">authorizationEnabled</span>: <span class="hljs-literal">true</span>
...
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-helm">
<p>لتمكين مصادقة المستخدم لخادم Milvus الخاص بك، قم بتعيين authorizationEnabled إلى صواب في ملف تكوين Milvus <code translate="no">values.yaml</code>. لمزيد من المعلومات حول التكوينات، راجع <a href="https://milvus.io/docs/configure-helm.md?tab=component">تكوين</a> ملف <a href="https://milvus.io/docs/configure-helm.md?tab=component">Milvus مع مخططات Helm</a>.</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">extraConfigFiles</span>:
  user.<span class="hljs-property">yaml</span>: |+
    <span class="hljs-attr">common</span>:
      <span class="hljs-attr">security</span>:
        <span class="hljs-attr">authorizationEnabled</span>: <span class="hljs-literal">true</span>
...
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-operator">
<p>لتمكين المصادقة، قم بتعيين <code translate="no">spec.common.security.authorizationEnabled</code> إلى <code translate="no">true</code> في ملف <code translate="no">Milvus</code> CRD. للمزيد من المعلومات حول قرص مالفوس CRD، راجع <a href="https://milvus.io/docs/configure_operator.md?tab=component">تكوين</a> ملف Milvus <a href="https://milvus.io/docs/configure_operator.md?tab=component">مع مشغل Milvus</a>.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    common:
      security:
        authorizationEnabled: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Connect-to-Milvus-with-authentication" class="common-anchor-header">الاتصال بـ Milvus مع المصادقة<button data-href="#Connect-to-Milvus-with-authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تمكين المصادقة، تحتاج إلى الاتصال بـ Milvus باستخدام اسم مستخدم وكلمة مرور. بشكل افتراضي، يتم إنشاء المستخدم <code translate="no">root</code> باستخدام كلمة المرور <code translate="no">Milvus</code> عند بدء تشغيل ملفوس. فيما يلي مثال على كيفية الاتصال بـ Milvus مع تمكين المصادقة باستخدام المستخدم الافتراضي <code translate="no">root</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use default `root` user to connect to Milvus</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>

<div class="alert note">
إذا فشلت في توفير رمز مميز صالح عند الاتصال بـ Milvus مع تمكين المصادقة، ستتلقى خطأ gRPC.</div>
<h2 id="Create-a-new-user" class="common-anchor-header">إنشاء مستخدم جديد<button data-href="#Create-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد الاتصال كمستخدم <code translate="no">root</code> الافتراضي، يمكنك إنشاء مستخدم جديد والمصادقة عليه كما يلي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># create a user</span>
client.create_user(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
)

<span class="hljs-comment"># verify the user has been created</span>

client.describe_user(<span class="hljs-string">&quot;user_1&quot;</span>)

<span class="hljs-comment"># output</span>
<span class="hljs-comment"># {&#x27;user_name&#x27;: &#x27;user_1&#x27;, &#x27;roles&#x27;: ()}</span>
<button class="copy-code-btn"></button></code></pre>

<p>للمزيد من المعلومات حول إنشاء مستخدمين، راجع <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/create_user.md">create_user()</a>.</p>
<h2 id="Connect-to-Milvus-with-a-new-user" class="common-anchor-header">الاتصال بـ Milvus باستخدام مستخدم جديد<button data-href="#Connect-to-Milvus-with-a-new-user" class="anchor-icon" translate="no">
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
    </button></h2><p>اتصل باستخدام بيانات اعتماد المستخدم الذي تم إنشاؤه حديثاً:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># connect to milvus with the newly created user</span>

client = MilvusClient(
uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
token=<span class="hljs-string">&quot;user_1:P@ssw0rd&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>

<h2 id="Update-user-password" class="common-anchor-header">تحديث كلمة مرور المستخدم<button data-href="#Update-user-password" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتغيير كلمة المرور لمستخدم موجود باستخدام الرمز التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># update password</span>

client.update_password(
user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
new_password=<span class="hljs-string">&quot;P@ssw0rd123&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>

<p>لمزيد من المعلومات حول تحديث كلمات مرور المستخدم، راجع <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/update_password.md">update_password()</a>.</p>
<p>إذا نسيت كلمة المرور القديمة، يوفر ميلفوس عنصر تهيئة يسمح لك بتعيين مستخدمين معينين كمستخدمين خارقين. هذا يلغي الحاجة إلى كلمة المرور القديمة عند إعادة تعيين كلمة المرور.</p>
<p>بشكل افتراضي، يكون الحقل <code translate="no">common.security.superUsers</code> في ملف تكوين ملف Milvus فارغًا، مما يعني أنه يجب على جميع المستخدمين تقديم كلمة المرور القديمة عند إعادة تعيين كلمة المرور الخاصة بهم. ومع ذلك، يمكنك تعيين مستخدمين محددين كمستخدمين متميزين لا يحتاجون إلى تقديم كلمة المرور القديمة. في المقتطف أدناه، تم تعيين <code translate="no">root</code> و <code translate="no">foo</code> كمستخدمين متميزين.</p>
<p>يجب عليك إضافة عنصر التكوين أدناه في ملف تكوين ميلفوس الذي يحكم تشغيل مثيل ميلفوس الخاص بك.</p>
<pre><code translate="no" class="language-yaml">common:
    security:
        superUsers: root, foo
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-user" class="common-anchor-header">إسقاط مستخدم<button data-href="#Drop-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>لإسقاط مستخدم، استخدم طريقة <code translate="no">drop_user()</code>.</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_user</span>(user_name=<span class="hljs-string">&quot;user_1&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
لإسقاط مستخدم، لا يمكن أن تكون المستخدم الذي يتم إسقاطه. وإلا فسيظهر خطأ.</div>
<h2 id="List-all-users" class="common-anchor-header">سرد جميع المستخدمين<button data-href="#List-all-users" class="anchor-icon" translate="no">
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
    </button></h2><p>سرد جميع المستخدمين.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># list all users</span>

client.list_users()
<button class="copy-code-btn"></button></code></pre>

<h2 id="Limitations" class="common-anchor-header">القيود<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>يجب ألا يكون اسم المستخدم فارغًا، ويجب ألا يتجاوز طوله 32 حرفًا. يجب أن يبدأ بحرف، وأن يحتوي فقط على أحرف سفلية أو أحرف أو أرقام.</li>
<li>يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل ويجب ألا يتجاوز طولها 256 حرفاً.</li>
</ol>
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
    </button></h2><ul>
<li>قد ترغب أيضًا في معرفة كيفية القيام بـ<ul>
<li><a href="/docs/ar/v2.5.x/scaleout.md">توسيع نطاق مجموعة ميلفوس</a></li>
</ul></li>
<li>إذا كنت مستعدًا لنشر مجموعتك على السحابة:<ul>
<li>تعرف على كيفية <a href="/docs/ar/v2.5.x/eks.md">نشر Milvus على Amazon EKS باستخدام Terraform</a></li>
<li>تعلم كيفية <a href="/docs/ar/v2.5.x/gcp.md">نشر مجموعة Milvus العنقودية على GCP باستخدام Kubernetes</a></li>
<li>تعرف على كيفية <a href="/docs/ar/v2.5.x/azure.md">نشر</a> مجموعة <a href="/docs/ar/v2.5.x/azure.md">ميلفوس على مايكروسوفت أزور باستخدام Kubernetes</a></li>
</ul></li>
</ul>
