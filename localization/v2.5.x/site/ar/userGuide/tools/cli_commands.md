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
<p><h3 id="clear">الخيارات</h3></p>
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
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(اختياري) اسم uri. الافتراضي هو &quot;http://127.0.0.1:19530&quot;.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-الرمز المميز</td><td style="text-align:left">(اختياري) الرمز المميز ل zilliz cloud apikey أو <code translate="no">username:password</code>. الافتراضي هو لا شيء.</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">-tlsmode</td><td style="text-align:left">(اختياري) - تعيين وضع TLS: 0 (لا يوجد تشفير)، 1 (تشفير أحادي الاتجاه)، 2 (التشفير ثنائي الاتجاه غير مدعوم بعد). الافتراضي هو 0</td></tr>
<tr><td style="text-align:left">-شهادة</td><td style="text-align:left">-Cert</td><td style="text-align:left">(اختياري) المسار إلى ملف شهادة العميل. العمل مع التشفير أحادي الاتجاه</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">عرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="connect">مثال</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//127.0.0.1:19530</span>
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
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[مطلوب] اسم قاعدة البيانات في ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
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
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[مطلوب] اسم قاعدة البيانات في ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> database -<span class="hljs-title function_">db</span> (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">الخيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[مطلوب] اسم قاعدة البيانات في ميلفوس.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">أمثلة</h3><h4 id="Example-1" class="common-anchor-header">مثال 1</h4><p>يقوم المثال التالي بحذف قاعدة البيانات <code translate="no">testdb</code> في ميلفوس.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> database -db testdb
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
<tr><td style="text-align:left">-p</td><td style="text-align:left">-كلمة المرور</td><td style="text-align:left">كلمة مرور المستخدم في ميلفوس. الافتراضي هو &quot;لا شيء&quot;.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-اسم المستخدم</td><td style="text-align:left">اسم المستخدم في ميلفوس. الافتراضي هو &quot;بلا&quot;.</td></tr>
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
<pre><code translate="no" class="language-shell">create <span class="hljs-built_in">alias</span> -c (text) -a (text) [-A]
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>مثال 2</h4></p>
<div class="alert note">يعتمد المثال 2 على المثال 1.</div>
<p>ينقل المثال التالي الاسم المستعار <code translate="no">carAlias1</code> من المجموعة <code translate="no">car</code> إلى المجموعة <code translate="no">car2</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car2 -A -a carAlias1
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
<pre><code translate="no" class="language-shell">create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة.</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">-الحقل -Sschema-field</td><td style="text-align:left">(متعدد) مخطط الحقل بتنسيق <code translate="no">&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code>.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-Sschema-المجال الأساسي</td><td style="text-align:left">اسم حقل المفتاح الأساسي.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-المعرف التلقائي للمخطط</td><td style="text-align:left">(اختياري) علم لإنشاء المعرفات تلقائيًا.</td></tr>
<tr><td style="text-align:left">-desc</td><td style="text-align:left">-وصف-نظرية-وصف</td><td style="text-align:left">(اختياري) وصف المجموعة.</td></tr>
<tr><td style="text-align:left">-مستوى</td><td style="text-align:left">-مستوى الاتساق</td><td style="text-align:left">(اختياري) مستوى الاتساق: محدود، جلسة عمل، قوي، نهائي.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-هو ديناميكي</td><td style="text-align:left">(اختياري) يدعم مخطط المجموعة الحقول الديناميكية أم لا.</td></tr>
<tr><td style="text-align:left">-s</td><td style="text-align:left">-عدد الأجزاء</td><td style="text-align:left">(اختياري) عدد الأجزاء</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="create-collection">مثال</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">## For array field: --schema-field support &lt;fieldName&gt;:&lt;dataType&gt;:&lt;maxCapacity&gt;:&lt;elementDataType&gt;(:&lt;maxLength&gt;if Varchar)</span>

milvus_cli &gt; create collection -c car -f <span class="hljs-built_in">id</span>:INT64:primary_field -f vector:FLOAT_VECTOR:<span class="hljs-number">128</span> -f color:INT64:color -f brand:ARRAY:<span class="hljs-number">64</span>:VARCHAR:<span class="hljs-number">128</span> -p <span class="hljs-built_in">id</span> -A -d <span class="hljs-string">&#x27;car_collection&#x27;</span>
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
<p><h3 id="creat-partition">الخيارات</h3></p>
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
<p><h3 id="creat-index">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="creat-index">مثال</h3></p>
<p>لإنشاء فهرس لحقل ومطالبته بالإدخال المطلوب:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2

The name of the field to create an index <span class="hljs-keyword">for</span> (vector): vector

Index name: vectorIndex

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index <span class="hljs-built_in">type</span> FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED, ) []: IVF_FLAT

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index metric <span class="hljs-built_in">type</span> (L2, IP, HAMMING, TANIMOTO, COSINE, ) []:

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
<h3 id="Syntax" class="common-anchor-header">بناء الجملة</h3><pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> user -<span class="hljs-title function_">u</span> (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">خيارات</h3><table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-اسم المستخدم</td><td style="text-align:left">اسم المستخدم.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">مثال</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> user -u zilliz
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> role -<span class="hljs-title function_">r</span> (text)
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> role -r role1
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> alias -<span class="hljs-title function_">a</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم المستعار</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-الاسم المستعار-الاسم المستعار</td><td style="text-align:left">الاسم المستعار.</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
<tr><td style="text-align:left"></td></tr>
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> collection -<span class="hljs-title function_">c</span> (text)
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> collection -c car
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
<pre><code translate="no"><span class="hljs-keyword">delete</span> entities -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text)
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
<pre><code translate="no">milvus_cli &gt; <span class="hljs-keyword">delete</span> entities -c car

<span class="hljs-title class_">The</span> expression to specify entities to be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

<span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!

<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: y
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> partition -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text)
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> partition -c car -p new_partition
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> index -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">in</span> (text)
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> index -c car -<span class="hljs-keyword">in</span> indexName
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
<pre><code translate="no" class="language-shell">grant role -r role1 -u user1
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
<p><h3 >خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 >مثال</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
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
<pre><code translate="no" class="language-shell">grant role -r role1 -u user1
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
<p><h3 >الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 >مثال</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
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
    </button></h2><p>يعرض المعلومات التفصيلية للمجموعة.</p>
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
    </button></h2><p>يعرض المعلومات التفصيلية للفهرس.</p>
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
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">exit</span>
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
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">help</span> &lt;<span class="hljs-built_in">command</span>&gt;
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
<h2 id="import" class="common-anchor-header">استيراد<button data-href="#import" class="anchor-icon" translate="no">
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
<p><h3 id="import">بناء الجملة</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -<span class="hljs-title function_">c</span> (text)[-<span class="hljs-title function_">p</span> (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-اسم المجموعة</td><td style="text-align:left">اسم المجموعة التي يتم إدراج البيانات فيها.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-قسم</td><td style="text-align:left">(اختياري) اسم القسم الذي يتم إدراج البيانات فيه. يشير عدم تمرير خيار القسم هذا إلى اختيار القسم "_default".</td></tr>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="import">مثال 1</h3>
يستورد المثال التالي ملف CSV محلي.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">import</span> -c car <span class="hljs-string">&#x27;examples/import_csv/vectors.csv&#x27;</span>

Reading csv file...  [<span class="hljs-comment">####################################]  100%</span>

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed <span class="hljs-number">50001</span> lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   <span class="hljs-number">50000</span>
Total collection entities:              <span class="hljs-number">150000</span>
Milvus timestamp:           <span class="hljs-number">428849214449254403</span>
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">المثال 2</h3>
يستورد المثال التالي ملف CSV عن بعد.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; import -c car <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;</span>

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
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
    </button></h2><p>سرد كافة المستخدمين.</p>
<h3 id="Syntax" class="common-anchor-header">بناء الجملة</h3><pre><code translate="no" class="language-shell">list <span class="hljs-built_in">users</span>
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
<pre><code translate="no" class="language-shell">load -c (text) [-p (text)]
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
<p><h3 id="query">خيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="query">مثال</h3>
<h4 id="query">مثال 1</h4></p>
<p>لإجراء استعلام والمطالبة بالإدخال المطلوب:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id <span class="hljs-keyword">in</span> [ <span class="hljs-number">428960801420883491</span>, <span class="hljs-number">428960801420883492</span>,
<span class="hljs-number">428960801420883493</span> ]

<span class="hljs-function">Name of partitions that contain <span class="hljs-title">entities</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []:
<span class="hljs-literal">default</span>

A list of fields to <span class="hljs-title">return</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date. [0]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s <span class="hljs-keyword">by</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">set</span>. [5]:
</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="query">مثال 2</h4></p>
<p>لإجراء استعلام ومطالبتك بالإدخال المطلوب:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">428960801420883491</span>

Name of partitions that contain entities(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []:
default

A <span class="hljs-built_in">list</span> of fields to <span class="hljs-keyword">return</span>(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []: <span class="hljs-built_in">id</span>, color,
brand

timeout []:

Guarantee timestamp. This instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date. [<span class="hljs-number">0</span>]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-built_in">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s by default <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-built_in">set</span>. [<span class="hljs-number">5</span>]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">تحرير<button data-href="#release" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-shell">release -c (text) [-p (text)]
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
<p><h3 id="search">الخيارات</h3></p>
<table>
<thead>
<tr><th style="text-align:left">الخيار</th><th style="text-align:left">الاسم الكامل</th><th style="text-align:left">الوصف</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض التعليمات الخاصة باستخدام الأمر.</td></tr>
</tbody>
</table>
<p><h3 id="search">أمثلة</h3>
<h4 id="search">مثال 1</h4></p>
<p>لإجراء بحث على ملف csv ومطالبتك بالإدخال المطلوب:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file
<span class="hljs-keyword">out</span> headers): examples/import_csv/search_vectors.csv

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">مثال 2</h4></p>
<p>لإجراء بحث على مجموعة مفهرسة ومطالبتك بالإدخال المطلوب:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file without headers):
    [[0.71, 0.76, 0.17, 0.13, 0.42, 0.07, 0.15, 0.67, 0.58, 0.02, 0.39, 0.47, 0.58, 0.88, 0.73, 0.31, 0.23, 0.57, 0.33, 0.2, 0.03, 0.43, 0.78, 0.49, 0.17, 0.56, 0.76, 0.54, 0.45, 0.46, 0.05, 0.1, 0.43, 0.63, 0.29, 0.44, 0.65, 0.01, 0.35, 0.46, 0.66, 0.7, 0.88, 0.07, 0.49, 0.92, 0.57, 0.5, 0.16, 0.77, 0.98, 0.1, 0.44, 0.88, 0.82, 0.16, 0.67, 0.63, 0.57, 0.55, 0.95, 0.13, 0.64, 0.43, 0.71, 0.81, 0.43, 0.65, 0.76, 0.7, 0.05, 0.24, 0.03, 0.9, 0.46, 0.28, 0.92, 0.25, 0.97, 0.79, 0.73, 0.97, 0.49, 0.28, 0.64, 0.19, 0.23, 0.51, 0.09, 0.1, 0.53, 0.03, 0.23, 0.94, 0.87, 0.14, 0.42, 0.82, 0.91, 0.11, 0.91, 0.37, 0.26, 0.6, 0.89, 0.6, 0.32, 0.11, 0.98, 0.67, 0.12, 0.66, 0.47, 0.02, 0.15, 0.6, 0.64, 0.57, 0.14, 0.81, 0.75, 0.11, 0.49, 0.78, 0.16, 0.63, 0.57, 0.18]]

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The specified number of <span class="hljs-built_in">decimal</span> places of returned distance [-1]: 5

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">مثال 3</h4></p>
<p>لإجراء بحث على مجموعة غير مفهرسة ومطالبتك بالإدخال المطلوب: مثال 3:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, car2): car

The vectors of search data(the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: <span class="hljs-number">5</span>

The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">2</span>

The boolean expression used to <span class="hljs-built_in">filter</span> attribute []:

The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []:

timeout []:

Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]:

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
<p><h3 id="show-connection">خيارات</h3></p>
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
<tr><td style="text-align:left">-مساعدة</td><td style="text-align:left">غير متوفر</td><td style="text-align:left">يعرض تعليمات استخدام الأمر.</td></tr>
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
<pre><code translate="no" class="language-shell">$ milvus_cli --version
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
