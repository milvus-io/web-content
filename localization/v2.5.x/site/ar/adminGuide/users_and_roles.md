---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  يحقق Milvus التحكم الدقيق في الوصول من خلال التحكم في الوصول من خلال RBAC.
  يمكنك البدء بإنشاء مستخدمين وأدوار، ثم تعيين امتيازات أو مجموعات امتيازات
  للأدوار، وأخيراً إدارة التحكم في الوصول من خلال منح الأدوار للمستخدمين. تضمن
  هذه الطريقة كفاءة وأمان إدارة الوصول. تقدم هذه الصفحة كيفية إنشاء المستخدمين
  والأدوار في Milvus.
title: إنشاء المستخدمين والأدوار
---
<h1 id="Create-Users--Roles​" class="common-anchor-header">إنشاء المستخدمين والأدوار<button data-href="#Create-Users--Roles​" class="anchor-icon" translate="no">
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
    </button></h1><p>يحقق Milvus التحكم الدقيق في الوصول من خلال التحكم في الوصول من خلال RBAC. يمكنك البدء بإنشاء مستخدمين وأدوار، ثم تعيين امتيازات أو مجموعات امتيازات للأدوار، وأخيراً إدارة التحكم في الوصول من خلال منح الأدوار للمستخدمين. تضمن هذه الطريقة كفاءة وأمان إدارة الوصول. تقدم هذه الصفحة كيفية إنشاء المستخدمين والأدوار في Milvus.</p>
<h2 id="User​" class="common-anchor-header">المستخدم<button data-href="#User​" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تهيئة مثيل Milvus، يتم إنشاء مستخدم جذر تلقائياً للمصادقة عند الاتصال ب Milvus للمرة الأولى. اسم المستخدم للمستخدم الجذر هو <code translate="no">root</code> وكلمة المرور هي <code translate="no">Milvus</code>. الدور الافتراضي للمستخدم الجذر هو <code translate="no">admin</code> ، والذي لديه حق الوصول إلى جميع الموارد. لضمان أمن البيانات، يرجى الحفاظ على بيانات اعتماد المستخدم الجذر آمنة لمنع الوصول غير المصرح به.</p>
<p>للعمليات اليومية، نوصي بإنشاء مستخدمين بدلاً من استخدام المستخدم الجذر.</p>
<h3 id="Create-a-user​" class="common-anchor-header">إنشاء مستخدم</h3><p>يوضح المثال التالي كيفية إنشاء مستخدم باسم المستخدم <code translate="no">user_1</code> وكلمة المرور <code translate="no">P@ssw0rd</code>. يجب أن يتبع اسم المستخدم وكلمة المرور للمستخدم القواعد التالية.</p>
<ul>
<li><p>اسم المستخدم: يجب أن يبدأ بحرف ويمكن أن يتضمن فقط أحرفًا كبيرة أو صغيرة وأرقامًا وشروطًا سفلية.</p></li>
<li><p>كلمة المرور: يجب أن يتراوح طولها بين 8 و64 حرفًا ويجب أن تتضمن ثلاثة مما يلي: أحرف كبيرة وأحرف صغيرة وأرقام وأحرف خاصة.</p></li>
</ul>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#shell">جافا</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client = <span class="hljs-title class_">MilvusClient</span>(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
client.<span class="hljs-title function_">create_user</span>(user_name=<span class="hljs-string">&quot;user_1&quot;</span>, password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateUserReq;​
​
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build();​
        ​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-type">CreateUserReq</span> <span class="hljs-variable">createUserReq</span> <span class="hljs-operator">=</span> CreateUserReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​
        .build();​
        ​
client.createUser(createUserReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createUser</span>({​
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,​
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,​
 });​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;userName&quot;: &quot;user_1&quot;,​
    &quot;password&quot;: &quot;P@ssw0rd&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Update-password​" class="common-anchor-header">تحديث كلمة المرور</h3><p>بعد إنشاء مستخدم، يمكنك تحديث كلمة المرور إذا نسيت.</p>
<p>يجب أن تتبع كلمة المرور الجديدة القاعدة التالية.</p>
<ul>
<li>يجب أن تتكون من 8-64 حرفًا وأن تتضمن ثلاثة مما يلي: أحرف كبيرة وأحرف صغيرة وأرقام وأحرف خاصة. </li>
</ul>
<p>يوضح المثال التالي كيفية تحديث كلمة المرور للمستخدم <code translate="no">user_1</code> إلى <code translate="no">NewP@ssw0rd</code>.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#shell">جافا</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">update_password</span>(​
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,​
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,​
    new_password=<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.UpdatePasswordReq;​
​
<span class="hljs-type">UpdatePasswordReq</span> <span class="hljs-variable">updatePasswordReq</span> <span class="hljs-operator">=</span> UpdatePasswordReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​
        .newPassword(<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>)​
        .build();​
client.updatePassword(updatePasswordReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">updateUser</span>({​
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,​
   <span class="hljs-attr">newPassword</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,​
   <span class="hljs-attr">oldPassword</span>: <span class="hljs-string">&#x27;NewP@ssw0rd&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/update_password&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;newPassword&quot;: &quot;P@ssw0rd!&quot;,​
    &quot;userName&quot;: &quot;user_1&quot;,​
    &quot;password&quot;: &quot;P@ssw0rd&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="List-users​" class="common-anchor-header">سرد المستخدمين</h3><p>بعد إنشاء عدة مستخدمين، يمكنك سرد وعرض جميع المستخدمين الحاليين.</p>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">list_users</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; resp = client.<span class="hljs-title function_">listUsers</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">listUsers</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>فيما يلي مثال على الإخراج. <code translate="no">root</code> هو المستخدم الافتراضي الذي تم إنشاؤه تلقائيًا في Milvus. <code translate="no">user_1</code> هو المستخدم الجديد الذي تم إنشاؤه للتو.</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;root&#x27;</span>, <span class="hljs-string">&#x27;user_1&#x27;</span>]​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Role​" class="common-anchor-header">الدور<button data-href="#Role​" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Milvus دورًا مدمجًا يسمى <code translate="no">admin</code> ، وهو دور مسؤول يمكنه الوصول إلى الموارد ضمن جميع المثيلات ولديه امتيازات لجميع العمليات. للحصول على إدارة وصول أكثر دقة وأمان محسّن للبيانات، يوصى بإنشاء أدوار مخصصة بناءً على احتياجاتك.</p>
<h3 id="Create-a-role​" class="common-anchor-header">إنشاء دور</h3><p>يوضح المثال التالي كيفية إنشاء دور باسم <code translate="no">role_a</code>. </p>
<p>يجب أن يتبع اسم الدور القاعدة التالية.</p>
<ul>
<li>يجب أن يبدأ بحرف ويمكن أن يتضمن فقط أحرفًا كبيرة أو صغيرة وأرقامًا وشرطات سفلية.&quot;</li>
</ul>
<div class="multipleCode">
 <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#shell">جافا</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_role</span>(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateRoleReq;​
<span class="hljs-type">CreateRoleReq</span> <span class="hljs-variable">createRoleReq</span> <span class="hljs-operator">=</span> CreateRoleReq.builder()​
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)​
        .build();​
       ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">createRole</span>(createRoleReq);​
<span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createRole</span>({​
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;roleName&quot;: &quot;role_a&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="List-roles​" class="common-anchor-header">سرد الأدوار</h3><p>بعد إنشاء عدة أدوار، يمكنك سرد جميع الأدوار الموجودة وعرضها.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">list_roles</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; roles = client.<span class="hljs-title function_">listRoles</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">listRoles</span>(​
    <span class="hljs-attr">includeUserInfo</span>: <span class="hljs-title class_">True</span>​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>فيما يلي مثال على الإخراج. <code translate="no">admin</code> هو الدور الافتراضي في ميلفوس. <code translate="no">role_a</code> هو الدور الجديد الذي تم إنشاؤه للتو.</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;role_a&#x27;</span>]​

<button class="copy-code-btn"></button></code></pre>
