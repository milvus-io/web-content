---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  تعرّف على تعريف المستخدمين والأدوار والكائنات والامتيازات في التحكم في الوصول
  المستند إلى الأدوار (RBAC).
title: المستخدمون والامتيازات والأدوار
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">المستخدمون والامتيازات والأدوار<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع نظرة عامة على التحكم في الوصول المستند إلى الدور (RBAC) في ملفوس، ويوضح بالتفصيل التعريفات والعلاقات بين المستخدمين والأدوار والكائنات والامتيازات.</p>
<p>يوضح الشكل التالي العلاقة بين الكائنات والامتيازات والأدوار والمستخدمين.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>المستخدمون_والأدوار</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">المفاهيم الرئيسية<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>لإدارة التحكم في الوصول إلى موارد Milvus، من المهم فهم المكونات الرئيسية لنظام التحكم في الوصول إلى موارد Milvus: أنواع الكائنات وأسماء الكائنات والمستخدمين والأدوار والامتيازات.</p>
<ul>
<li><p><strong>نوع</strong> الكائن: فئة الكائن الذي يتم تعيين امتياز له. يمكن أن يكون نوع الكائن:</p>
<ul>
<li><code translate="no">Global</code>: كائنات على مستوى النظام، مما يسمح للمستخدم بتنفيذ إجراءات تؤثر على جميع المجموعات أو المستخدمين أو الإعدادات على مستوى النظام.</li>
<li><code translate="no">Collection</code>: كائنات خاصة بمجموعات محددة، مما يسمح للمستخدم بتنفيذ إجراءات مثل إنشاء فهارس، وتحميل البيانات، وإدراج البيانات أو حذفها، والاستعلام عن البيانات داخل مجموعة محددة.</li>
<li><code translate="no">User</code>: الكائنات المتعلقة بإدارة المستخدم، مما يسمح للمستخدم بإدارة بيانات الاعتماد والأدوار لمستخدمي قاعدة البيانات، مثل تحديث بيانات اعتماد المستخدم أو عرض تفاصيل المستخدم.</li>
</ul></li>
<li><p><strong>اسم الكائن</strong>: الاسم المحدد للكائن للتحكم في الوصول إليه. على سبيل المثال:</p>
<ul>
<li>إذا كان نوع الكائن هو <code translate="no">Global</code> ، فيجب تعيين اسم الكائن على حرف البدل (<code translate="no">*</code>)، مما يشير إلى جميع الكائنات من النوع المحدد.</li>
<li>إذا كان نوع الكائن هو <code translate="no">Collection</code> ، فإن اسم الكائن هو اسم مجموعة.</li>
<li>إذا كان نوع الكائن هو <code translate="no">User</code> ، فإن اسم الكائن هو اسم مستخدم قاعدة البيانات.</li>
</ul></li>
<li><p><strong>المستخدم</strong>: هو الشخص أو التطبيق الذي يتفاعل مع ميلفوس، والذي يتكون من اسم مستخدم وكلمة مرور مقابلة.</p></li>
<li><p><strong>الامتياز</strong>: يحدد الإجراءات التي يمكن تنفيذها والموارد التي يمكن الوصول إليها. لا يتم منح الامتيازات مباشرة للمستخدمين ولكن يتم تعيينها للأدوار.</p></li>
<li><p><strong>الدور</strong>: يحدد مجموعة الامتيازات التي يمتلكها المستخدم لكائنات معينة. بمجرد ربط الدور بمستخدم، يرث المستخدم جميع الامتيازات الممنوحة لهذا الدور.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">مثال: منح الامتيازات<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح مقتطف الشيفرة التالي كيفية منح امتياز <code translate="no">CreateIndex</code> لدور على مجموعة معينة:</p>
<div class="multipleCode">
   <a href="#python">بايثون </a> <a href="#java">جافا</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">milvusClient.grant_privilege(
    role_name=<span class="hljs-string">&quot;CUSTOM_ROLE_NAME&quot;</span>,
    object_type=<span class="hljs-string">&quot;Collection&quot;</span>,  <span class="hljs-comment"># Valid value: Global, Collection or User.</span>
    privilege=<span class="hljs-string">&quot;CreateIndex&quot;</span>,   <span class="hljs-comment"># See the table below for valid privilege names and relevant API descriptions.</span>
    object_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>  <span class="hljs-comment"># The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GrantPrivilegeReq</span> <span class="hljs-variable">grantPrivilegeReq</span> <span class="hljs-operator">=</span> GrantPrivilegeReq.builder()
        .roleName(<span class="hljs-string">&quot;roleName&quot;</span>)
        .objectName(<span class="hljs-string">&quot;CollectionName&quot;</span>) <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
        .objectType(<span class="hljs-string">&quot;Collection&quot;</span>) <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
        .privilege(<span class="hljs-string">&quot;CreateIndex&quot;</span>) <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
        .build();
client.grantPrivilege(grantPrivilegeReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">milvusClient.<span class="hljs-title function_">grantPrivilege</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-attr">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   <span class="hljs-attr">objectName</span>: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   <span class="hljs-attr">privilegeName</span>: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>للحصول على مزيد من المعلومات حول واجهات برمجة التطبيقات المتعلقة بالامتيازات، راجع <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>للحصول على مزيد من المعلومات حول واجهات برمجة التطبيقات المرتبطة بالامتيازات، راجع <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> و <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>للحصول على مزيد من المعلومات حول واجهات برمجة التطبيقات المتعلقة بالامتيازات، راجع <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> و <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">المستخدمون والأدوار الافتراضية<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم ميلفوس بإنشاء مستخدم <code translate="no">root</code> افتراضيًا بكلمة مرور افتراضية <code translate="no">Milvus</code>. يتم منح المستخدم <code translate="no">root</code> امتيازات <code translate="no">admin</code> ، مما يعني أن هذا المستخدم <code translate="no">root</code> يمكنه الوصول إلى جميع الموارد وتنفيذ جميع الإجراءات.</p>
<p>إذا اقترن المستخدم بالدور <code translate="no">public</code> ، يحق له الحصول على الامتيازات التالية:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">قائمة أنواع الكائنات والامتيازات<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي القيم التي يمكنك اختيارها عند <a href="/docs/ar/rbac.md">تمكين RBAC</a>.</p>
<table>
<thead>
<tr><th>نوع الكائن</th><th>اسم الامتياز</th><th>وصف واجهة برمجة التطبيقات ذات الصلة من جانب العميل</th></tr>
</thead>
<tbody>
<tr><td>المجموعة</td><td>إنشاء فهرس</td><td>إنشاء فهرس</td></tr>
<tr><td>مجموعة</td><td>إسقاط الفهرس</td><td>الفهرس المنسدل</td></tr>
<tr><td>مجموعة</td><td>تفاصيل الفهرس</td><td>وصف الفهرس/تحديد الفهرس/تحديد الفهرس/تحديد تقدم إنشاء الفهرس</td></tr>
<tr><td>المجموعة</td><td>تحميل</td><td>تحميلالمجموعة/تحصيلتحميلالتحميلالتقدم/تحصيل حالة التحميل</td></tr>
<tr><td>المجموعة</td><td>GetLoadingProgress</td><td>GetLoadingProgress</td></tr>
<tr><td>مجموعة</td><td>الحصول على حالة التحميل</td><td>الحصول على حالة التحميل</td></tr>
<tr><td>مجموعة</td><td>الإصدار</td><td>مجموعة الإصدار</td></tr>
<tr><td>مجموعة</td><td>إدراج</td><td>إدراج</td></tr>
<tr><td>مجموعة</td><td>حذف</td><td>حذف</td></tr>
<tr><td>مجموعة</td><td>إدراج</td><td>إدراج</td></tr>
<tr><td>مجموعة</td><td>بحث</td><td>بحث</td></tr>
<tr><td>المجموعة</td><td>تدفق</td><td>تدفق/حالة التدفق/حالة التدفق</td></tr>
<tr><td>مجموعة</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>مجموعة</td><td>استعلام</td><td>استعلام</td></tr>
<tr><td>مجموعة</td><td>الحصول على إحصائيات</td><td>الحصول على إحصائيات المجموعة</td></tr>
<tr><td>المجموعة</td><td>ضغط</td><td>ضغط</td></tr>
<tr><td>التجميع</td><td>استيراد</td><td>الإدخال/الاستيراد بالجملة</td></tr>
<tr><td>مجموعة</td><td>LoadBalance</td><td>LoadBalance</td></tr>
<tr><td>مجموعة</td><td>إنشاء قسم</td><td>إنشاء قسم</td></tr>
<tr><td>مجموعة</td><td>قسم الإسقاط</td><td>قسم الإسقاط</td></tr>
<tr><td>مجموعة</td><td>إظهارالأقسام</td><td>إظهارالأقسام</td></tr>
<tr><td>مجموعة</td><td>يحتوي على قسم</td><td>يحتوي على قسم</td></tr>
<tr><td>عالمي</td><td>الكل</td><td>جميع أذونات عمليات API في هذا الجدول</td></tr>
<tr><td>عام</td><td>إنشاء مجموعة</td><td>إنشاء مجموعة</td></tr>
<tr><td>عام</td><td>إسقاط مجموعة</td><td>مجموعة الإسقاط</td></tr>
<tr><td>عامة</td><td>وصف المجموعة</td><td>وصف المجموعة</td></tr>
<tr><td>عام</td><td>إظهار المجموعات</td><td>إظهار المجموعات</td></tr>
<tr><td>عالمي</td><td>إعادة تسمية مجموعة</td><td>إعادة تسمية المجموعة</td></tr>
<tr><td>عام</td><td>مسح الكل</td><td>مسح الكل</td></tr>
<tr><td>عام</td><td>إنشاء ملكية</td><td>إنشاء مستخدم إنشاء دور</td></tr>
<tr><td>عالمي</td><td>إسقاط الملكية</td><td>حذفالملكية المسقطة</td></tr>
<tr><td>عالمي</td><td>تحديدالملكية</td><td>تحديدالدور/تحديد الملكية</td></tr>
<tr><td>عالمي</td><td>إدارةالملكية</td><td>إدارةالملكية/اختيارالملكية العالمية</td></tr>
<tr><td>عالمي</td><td>إنشاءResResourceGroup</td><td>إنشاء مجموعة موارد</td></tr>
<tr><td>عالمي</td><td>إسقاطResResourceGroup</td><td>DropResResResourceGroup</td></tr>
<tr><td>عالمي</td><td>وصف مجموعة الموارد</td><td>وصفRescribeResResourceGroup</td></tr>
<tr><td>عالمي</td><td>ListResResourceGroups</td><td>ListResResourceGroups</td></tr>
<tr><td>عالمي</td><td>عقدة النقل</td><td>عقدة النقل</td></tr>
<tr><td>عالمي</td><td>TransferReplica</td><td>TransferReplica</td></tr>
<tr><td>عالمي</td><td>إنشاء قاعدة بيانات</td><td>إنشاء قاعدة بيانات</td></tr>
<tr><td>عالمي</td><td>إسقاط قاعدة البيانات</td><td>قاعدة بيانات منسدلة</td></tr>
<tr><td>عالمي</td><td>قائمة قواعد البيانات</td><td>ListDatabases ListDatabases</td></tr>
<tr><td>عالمي</td><td>إنشاء تعريفا</td><td>CreateAlias</td></tr>
<tr><td>عالمي</td><td>إسقاط التعريفي</td><td>DropAlias</td></tr>
<tr><td>عالمي</td><td>وصف التعريفي</td><td>وصف التعريفي</td></tr>
<tr><td>عالمي</td><td>قائمة التعريجات</td><td>ListAliases ListAliases</td></tr>
<tr><td>مستخدم</td><td>تحديثالمستخدم</td><td>تحديثالمعتمد</td></tr>
<tr><td>مستخدم</td><td>تحديد مستخدم</td><td>تحديد مستخدم</td></tr>
</tbody>
</table>
<div class="alert note">
<li>أسماء الكائنات والامتيازات حساسة لحالة الأحرف.</li>
<li>لمنح جميع الامتيازات لنوع من الكائن، مثل المجموعة، عام، مستخدم، استخدم "*" لاسم الامتياز. </li>
<li>اسم الامتياز "*" للكائن العام لا يتضمن امتياز الكل، لأن امتياز الكل يتضمن جميع الأذونات، بما في ذلك أي مجموعة وكائن مستخدم.</li>
</div>
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
<li>تعلم كيفية <a href="/docs/ar/rbac.md">تمكين RBAC</a>.</li>
</ul>
