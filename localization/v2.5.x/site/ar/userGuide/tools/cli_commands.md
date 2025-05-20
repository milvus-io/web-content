---
id: cli_commands.md
summary: تفاعل مع ميلفوس باستخدام الأوامر.
title: مرجع أوامر Milvus_CLI
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">مرجع أوامر Milvus_CLI<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>واجهة سطر الأوامر Milvus (CLI) هي أداة سطر أوامر تدعم الاتصال بقاعدة البيانات وعمليات البيانات واستيراد البيانات وتصديرها.</p>
<p>يقدم هذا الموضوع جميع الأوامر المدعومة والخيارات المقابلة لها. كما يتم تضمين بعض الأمثلة للرجوع إليها.</p>
<h2 id="Command-Groups" class="common-anchor-header">مجموعات الأوامر<button data-href="#Command-Groups" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تنظيم أوامر Milvus CLI في المجموعات التالية:</p>
<ul>
<li><code translate="no">create</code>: إنشاء مجموعة أو قاعدة بيانات أو قسم أو مستخدم أو دور أو فهرس</li>
<li><code translate="no">delete</code>: حذف المجموعة أو قاعدة البيانات أو القسم أو الاسم المستعار أو المستخدم أو الدور أو الفهرس</li>
<li><code translate="no">list</code>: قائمة بالمجموعات أو قواعد البيانات أو الأقسام أو المستخدمين أو الأدوار أو المنح أو الفهارس</li>
<li><code translate="no">show</code>: إظهار الاتصال أو قاعدة البيانات أو المجموعة أو التحميل_التقدم أو تقدم الفهرس</li>
<li><code translate="no">grant</code>: منح دور أو امتياز</li>
<li><code translate="no">revoke</code>: إبطال الدور أو الامتياز</li>
<li><code translate="no">load</code>: تحميل مجموعة أو قسم</li>
<li><code translate="no">release</code>: تحرير المجموعة أو القسم</li>
<li><code translate="no">use</code>: استخدام قاعدة البيانات</li>
<li><code translate="no">rename</code>: إعادة تسمية المجموعة</li>
<li><code translate="no">insert</code>: إدراج كيانات (ملف أو صف)</li>
</ul>
<h2 id="clear" class="common-anchor-header">مسح<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>مسح الشاشة.</p>
<p><h3 id="clear">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">الاتصال<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>يتصل بميلفوس.</p>
<p><h3 id="connect">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
connect [-uri (text)] [-t (text)] [-tls (0|1)] [-cert (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(اختياري) اسم uri. الافتراضي هو "http://127.0.0.1:19530".</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-الرمز المميز</td><td style="text-align:left">(اختياري) الرمز المميز ل zilliz cloud apikey أو <code translate="no">username:password</code>. الافتراضي هو لا شيء.</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">-tlsmode</td><td style="text-align:left">(اختياري) تعيين وضع TLS: 0 (لا يوجد تشفير)، 1 (تشفير أحادي الاتجاه)، 2 (التشفير ثنائي الاتجاه غير مدعوم بعد). الافتراضي هو 0</td></tr>
<tr><td style="text-align:left">-شهادة</td><td style="text-align:left">-Cert</td><td style="text-align:left">(اختياري) المسار إلى ملف شهادة العميل. العمل مع التشفير أحادي الاتجاه</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">عرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="connect">مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">إنشاء قاعدة بيانات<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>إنشاء قاعدة بيانات في ميلفوس</p>
<p><h3 id="create-database">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[مطلوب] اسم قاعدة البيانات في ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><h4 id="Example-1" class="common-anchor-header">مثال 1</h4><p>يقوم المثال التالي بإنشاء قاعدة البيانات <code translate="no">testdb</code> في ميلفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">استخدام قاعدة البيانات<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدام قاعدة البيانات في ملفوس</p>
<p><h3 id="use-database">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[مطلوب] اسم قاعدة البيانات في ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><h4 id="Example-1" class="common-anchor-header">مثال 1</h4><p>يستخدم المثال التالي قاعدة البيانات <code translate="no">testdb</code> في ميلفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">قائمة قواعد البيانات<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>سرد قواعد البيانات في ملفوس</p>
<p><h3 id="list-database">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">list databases
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><h4 id="Example-1" class="common-anchor-header">المثال 1</h4><p>يسرد المثال التالي قائمة قواعد البيانات في ملفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">حذف قاعدة البيانات<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>حذف قاعدة بيانات في ملفوس</p>
<p><h3 id="delete-database">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">delete database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[مطلوب] اسم قاعدة البيانات في ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><h4 id="Example-1" class="common-anchor-header">مثال 1</h4><p>يقوم المثال التالي بحذف قاعدة البيانات <code translate="no">testdb</code> في ميلفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">إنشاء مستخدم<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>إنشاء مستخدم في ملفوس</p>
<p><h3 id="create-user">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-كلمة المرور</td><td style="text-align:left">كلمة مرور المستخدم في ميلفوس. الافتراضي هو "لا شيء".</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-اسم المستخدم</td><td style="text-align:left">اسم المستخدم في ميلفوس. الافتراضي هو "بلا".</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><h4 id="Example-1" class="common-anchor-header">مثال 1</h4><p>ينشئ المثال التالي المستخدم <code translate="no">zilliz</code> وكلمة المرور <code translate="no">zilliz</code> في ميلفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">إنشاء دور<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>إنشاء دور في ميلفوس</p>
<p><h3 id="create-role">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">اسم دور دور ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><h4 id="Example-1" class="common-anchor-header">مثال 1</h4><p>المثال التالي إنشاء الدور <code translate="no">role1</code> في ميلفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">إنشاء اسم مستعار<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>تحديد أسماء مستعارة فريدة لمجموعة ما.</p>
<div class="alert note">يمكن أن تحتوي المجموعة على عدة أسماء مستعارة. ومع ذلك، يتوافق الاسم المستعار مع مجموعة واحدة كحد أقصى.</div>
<p><h3 id="create-alias">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">create alias -c (text) -a (text) [-A]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-الاسم المستعار</td><td style="text-align:left">الاسم المستعار.</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-تغيير</td><td style="text-align:left">(اختياري) علامة لنقل الاسم المستعار إلى مجموعة محددة.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">أمثلة</h3></p>
<p><h4>مثال 1</h4></p>
<p>ينشئ المثال التالي <code translate="no">carAlias1</code> و <code translate="no">carAlias2</code> الأسماء المستعارة للمجموعة <code translate="no">car</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>مثال 2</h4></p>
<div class="alert note">يعتمد المثال 2 على المثال 1.</div>
<p>ينقل المثال التالي الاسم المستعار <code translate="no">carAlias1</code> من المجموعة <code translate="no">car</code> إلى المجموعة <code translate="no">car2</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">إنشاء مجموعة<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>إنشاء مجموعة.</p>
<p><h3 id="create-collection">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">create collection
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">مثال تفاعلي</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create collection

Please input collection name: car
Please input auto id [False]: False
Please input description []: car collection
Is support dynamic field [False]: False
Please input consistency level(Strong(0),Bounded(1), Session(2), and Eventually(3)) [1]: 1
Please input shards number [1]: 1

Field name: id
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: primary key
Is id the primary key? [y/N]: y

Field name: vector
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): FLOAT_VECTOR
Field description []: vector field
Dimension: 128

Field name: color
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: color field
Nullable [False]: False
Default value (type: INT64) [Not set]: 0

Do you want to add embedding function? [y/N]: n
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">إنشاء قسم<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>إنشاء قسم.</p>
<p><h3 id="creat-partition">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-التقسيم</td><td style="text-align:left">اسم القسم.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-الوصف</td><td style="text-align:left">(اختياري) وصف القسم.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">إنشاء فهرس<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>إنشاء فهرس لحقل ما.</p>
<div class="alert note"> تدعم المجموعة حاليًا فهرسًا واحدًا كحد أقصى.</div>
<p><h3 id="creat-index">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">مثال تفاعلي</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">حذف مستخدم<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>حذف مستخدم</p>
<h3 id="Syntax" class="common-anchor-header">بناء الجملة</h3><pre><code translate="no" class="language-shell">delete user -u (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-اسم المستخدم</td><td style="text-align:left">اسم المستخدم.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">مثال</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; delete user -u zilliz

Warning! You are trying to delete the user in milvus. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-role" class="common-anchor-header">حذف الدور<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>حذف الدور في ميلفوس</p>
<p><h3 id="delete-role">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">delete role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">اسم دور دور ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><p>يقوم المثال التالي بحذف الدور <code translate="no">role1</code> في ميلفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">حذف الاسم المستعار<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>حذف اسم مستعار.</p>
<p><h3 id="delete-alias">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">delete alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم المستعار</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-الاسم المستعار-الاسم المستعار</td><td style="text-align:left">الاسم المستعار.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">حذف مجموعة<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>حذف مجموعة.</p>
<p><h3 id="delete-collection">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">delete collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة المراد حذفها.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">حذف الكيانات<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>حذف الكيانات.</p>
<p><h3 id="delete-entities">بناء الجملة</h3></p>
<pre><code translate="no">delete entities -c (<span class="hljs-selector-tag">text</span>) -<span class="hljs-selector-tag">p</span> (<span class="hljs-selector-tag">text</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي تنتمي إليها الكيانات المراد حذفها.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">(اختياري) اسم القسم المراد حذفه.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">مثال</h3></p>
<pre><code translate="no">milvus_cli &gt; delete entities -c car

The expression <span class="hljs-keyword">to</span> specify entities <span class="hljs-keyword">to</span> be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

Warning! You are trying <span class="hljs-keyword">to</span> delete the entities <span class="hljs-keyword">of</span> collection. This action cannot be undone!
<span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">حذف قسم<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>حذف قسم.</p>
<p><h3 id="delete-partition">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">delete partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي ينتمي إليها القسم المراد حذفه.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">اسم القسم المراد حذفه.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">حذف الفهرس<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يقوم بحذف فهرس وملفات الفهرس المقابلة.</p>
<div class="alert note"> تدعم المجموعة حالياً فهرساً واحداً كحد أقصى.</div>
<p><h3 id="delete-index">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">delete index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-في</td><td style="text-align:left">-اسم الفهرس</td><td style="text-align:left">اسم اسم الفهرس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 >مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete index -c car -in indexName

Warning! You are trying to delete the index of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-role" class="common-anchor-header">منح دور<button data-href="#grant-role" class="anchor-icon" translate="no">
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
    </button></h2><p>منح دور للمستخدم</p>
<p><h3 id="grant-user">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">grant role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">اسم دور دور ميلفوس.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-اسم المستخدم</td><td style="text-align:left">اسم المستخدم لمستخدم ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 >مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilege" class="common-anchor-header">منح امتياز<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>تعيين امتياز لدور ما.</p>
<p><h3 id="assign-privilege">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="assign-privilege">مثال تفاعلي</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-role" class="common-anchor-header">إبطال الدور<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>إبطال الدور المعين لمستخدم.</p>
<p><h3 id="grant-user">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">revoke role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">اسم دور دور ميلفوس.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-اسم المستخدم</td><td style="text-align:left">اسم المستخدم لمستخدم ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 >مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">إبطال امتياز<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>إبطال امتياز تم تعيينه مسبقاً لدور ما.</p>
<p><h3 id="revoke-privilege">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege">مثال تفاعلي</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">إظهار المجموعة<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>إظهار المعلومات التفصيلية للمجموعة.</p>
<p><h3 id="show-collection">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3>مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-partition" class="common-anchor-header">إظهار القسم<button data-href="#show-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>يعرض المعلومات التفصيلية لقسم ما.</p>
<p><h3 id="show-partition">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي ينتمي إليها القسم.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">اسم القسم.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3>مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">إظهار الفهرس<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>يعرض المعلومات التفصيلية لفهرس ما.</p>
<p><h3 id="show-index">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-في</td><td style="text-align:left">-اسم الفهرس</td><td style="text-align:left">اسم الفهرس.</td></tr>
</tbody>
</table>
<p>|-المساعدة |عرض التعليمات الخاصة باستخدام الأمر. |</p>
<p><h3 >مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show index -c test_collection -in index_name
<button class="copy-code-btn"></button></code></pre>
<h2 id="exit" class="common-anchor-header">خروج<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>يغلق نافذة سطر الأوامر.</p>
<p><h3 id="exit">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">exit
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">تعليمات<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>يعرض تعليمات استخدام الأمر.</p>
<p><h3 id="help">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">help &lt;command&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">الأوامر</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الأمر</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">مسح</td><td style="text-align:left">مسح الشاشة.</td></tr>
<tr><td style="text-align:left">الاتصال</td><td style="text-align:left">يتصل بميلفوس.</td></tr>
<tr><td style="text-align:left">إنشاء</td><td style="text-align:left">إنشاء مجموعة وقاعدة بيانات وقسم ومستخدم ودور وفهرس.</td></tr>
<tr><td style="text-align:left">منح</td><td style="text-align:left">منح الدور والامتياز.</td></tr>
<tr><td style="text-align:left">إبطال</td><td style="text-align:left">إبطال الدور والامتياز .</td></tr>
<tr><td style="text-align:left">حذف</td><td style="text-align:left">حذف المجموعة أو قاعدة البيانات أو القسم أو الاسم المستعار أو المستخدم أو الدور أو الفهرس.</td></tr>
<tr><td style="text-align:left">إنهاء</td><td style="text-align:left">يغلق نافذة سطر الأوامر.</td></tr>
<tr><td style="text-align:left">تعليمات</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
<tr><td style="text-align:left">إدراج</td><td style="text-align:left">يستورد البيانات إلى قسم.</td></tr>
<tr><td style="text-align:left">قائمة</td><td style="text-align:left">سرد المجموعات أو قواعد البيانات أو الأقسام أو المستخدمين أو الأدوار أو المنح أو الفهارس.</td></tr>
<tr><td style="text-align:left">تحميل</td><td style="text-align:left">تحميل مجموعة أو قسم.</td></tr>
<tr><td style="text-align:left">استعلام</td><td style="text-align:left">يعرض نتائج الاستعلام التي تطابق جميع المعايير التي تقوم بإدخالها.</td></tr>
<tr><td style="text-align:left">إصدار</td><td style="text-align:left">تحرير مجموعة أو قسم.</td></tr>
<tr><td style="text-align:left">بحث</td><td style="text-align:left">إجراء بحث تشابه متجه أو بحث مختلط.</td></tr>
<tr><td style="text-align:left">إظهار</td><td style="text-align:left">إظهار الاتصال أو قاعدة البيانات أو المجموعة أو التحميل_التقدم أو الفهرس_التقدم.</td></tr>
<tr><td style="text-align:left">إعادة تسمية</td><td style="text-align:left">إعادة تسمية المجموعة</td></tr>
<tr><td style="text-align:left">استخدام</td><td style="text-align:left">استخدام قاعدة البيانات</td></tr>
<tr><td style="text-align:left">الإصدار</td><td style="text-align:left">يعرض إصدار Milvus_CLI.</td></tr>
</tbody>
</table>
<h2 id="insert" class="common-anchor-header">إدراج<button data-href="#insert" class="anchor-icon" translate="no">
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
    </button></h2><p>يستورد البيانات المحلية أو البعيدة إلى قسم.</p>
<p><h3 id="insert">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">insert file -c (text) [-p (text)] [-t (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي يتم إدراج البيانات فيها.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">(اختياري) اسم القسم الذي يتم إدراج البيانات فيه. يشير عدم تمرير خيار القسم هذا إلى اختيار القسم "_default".</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-مهلة</td><td style="text-align:left">(اختياري) مدة زمنية اختيارية بالثواني للسماح بإدخال طلب استدعاء الطلبات المتكررة. إذا لم يتم تعيين المهلة، يستمر العميل في الانتظار حتى يستجيب الخادم أو يحدث خطأ.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="insert">مثال 1</h3>
يقوم المثال التالي باستيراد ملف CSV محلي.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;examples/import_csv/vectors.csv&#x27;

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">المثال 2</h3>
يستورد المثال التالي ملف CSV بعيد.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="insert-row" class="common-anchor-header">إدراج صف<button data-href="#insert-row" class="anchor-icon" translate="no">
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
    </button></h2><p>إدراج صف من البيانات في مجموعة.</p>
<p><h3 id="insert-row">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">insert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-row">مثال تفاعلي</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">قائمة المستخدمين<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد جميع المستخدمين.</p>
<h3 id="Syntax" class="common-anchor-header">بناء الجملة</h3><pre><code translate="no" class="language-shell">list users
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">خيارات</h3><p>|الخيار |الاسم الكامل |الوصف |-المساعدة |عرض التعليمات الخاصة باستخدام الأمر. |</p>
<h2 id="List-roles" class="common-anchor-header">سرد الأدوار<button data-href="#List-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>سرد الأدوار في ملفوس</p>
<p><h3 id="list-role">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">خيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-grants" class="common-anchor-header">سرد المنح<button data-href="#List-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>سرد المنح في ميلفوس</p>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">اسم دور دور ميلفوس.</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">-اسم الكائن</td><td style="text-align:left">اسم الكائن الخاص بكائن ميلفوس.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-نوع الكائن</td><td style="text-align:left">عام أو مجموعة أو مستخدم.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متاح</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list grants -r role1 -o object1 -t Collection
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-collections" class="common-anchor-header">سرد المجموعات<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>سرد كافة المجموعات.</p>
<p><h3 id="list-collections">بناء الجملة<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">خيارات<h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">قائمة الفهارس<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد كافة الفهارس الخاصة بمجموعة ما.</p>
<div class="alert note"> تدعم المجموعة حاليًا فهرسًا واحدًا كحد أقصى. </div>
<p><h3 id="list-indexes">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">سرد الأقسام<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد كافة أقسام المجموعة.</p>
<p><h3 id="list-partitions">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">تحميل<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>تحميل مجموعة أو قسم من مساحة القرص الصلب إلى ذاكرة الوصول العشوائي.</p>
<p><h3 id="load">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">load collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي ينتمي إليها القسم.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">(اختياري/متعدد) اسم القسم.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">استعلام<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>يعرض نتائج الاستعلام التي تطابق كافة المعايير التي تقوم بإدخالها.</p>
<p><h3 id="query">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">مثال تفاعلي</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492, 428960801420883493 ]

Name of partitions that contain entities(split by &quot;,&quot; if multiple) []: default

A list of fields to return(split by &quot;,&quot; if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date. [0]:

Graceful time. Only used in bounded consistency level. If graceful_time is set, PyMilvus will use current timestamp minus the graceful_time as the guarantee_timestamp. This option is 5s by default if not set. [5]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">الإصدار<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>تحرير مجموعة أو قسم من ذاكرة الوصول العشوائي.</p>
<p><h3 id="release">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">release collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي ينتمي إليها القسم.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">(اختياري/متعدد) اسم القسم.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">بحث<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>إجراء بحث تشابه متجه أو بحث هجين.</p>
<p><h3 id="search">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">مثال تفاعلي</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, test_collection): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field&#x27;s of collection. You can also import a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Search parameter nprobe&#x27;s value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to search (split by &quot;,&quot; if multiple) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-connection" class="common-anchor-header">سرد الاتصالات<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>سرد الاتصالات.</p>
<p><h3 id="show-connection">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">list connections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="show-indexprogress" class="common-anchor-header">إظهار تقدم الفهرسة<button data-href="#show-indexprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>يعرض تقدم فهرسة الكيانات.</p>
<p><h3 id="show-index-progress">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي تنتمي إليها الكيانات.</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-الفهرس</td><td style="text-align:left">(اختياري) اسم الفهرس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">إظهار تقدم التحميل<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>يعرض تقدم تحميل مجموعة ما.</p>
<p><h3 id="show-loading-progress">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي تنتمي إليها الكيانات.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">(اختياري/متعدد) اسم قسم التحميل.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">الإصدار<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>يعرض إصدار Milvus_CLI.</p>
<p><h3 id="version">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<div class="alert note"> يمكنك أيضًا التحقق من إصدار Milvus_CLI في shell كما هو موضح في المثال التالي. في هذه الحالة، يعمل <code translate="no">milvus_cli --version</code> كأمر.</div>
<p><h3 id="version">مثال</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">milvus_cli --version</span>
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
