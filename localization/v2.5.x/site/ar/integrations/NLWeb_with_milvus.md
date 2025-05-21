---
id: NLWeb_with_milvus.md
summary: >-
  تعرف على كيفية دمج Microsoft NLWeb مع Milvus لإنشاء واجهات لغة طبيعية قوية
  لمواقع الويب. يوضح هذا البرنامج التعليمي كيفية الاستفادة من إمكانيات قاعدة
  بيانات Milvus المتجهة للبحث الدلالي الفعال وتخزين التضمين واسترجاع السياق في
  تطبيقات NLWeb.
title: استخدام NLWeb مع ميلفوس
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">استخدام NLWeb مع ميلفوس<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>إن<a href="https://github.com/microsoft/NLWeb">NLWeb من مايكروسوفت</a> هو إطار عمل مقترح يتيح واجهات اللغة الطبيعية لمواقع الويب، باستخدام <a href="https://schema.org/">Schema.org،</a> وتنسيقات مثل RSS وبروتوكول MCP الناشئ.</p>
<p>يتم دعم<a href="https://milvus.io/">Milvus</a> كواجهة خلفية لقاعدة بيانات متجهة داخل NLWeb لتضمين التخزين والبحث الفعال عن التشابه المتجهي، مما يتيح استرجاع السياق القوي لتطبيقات معالجة اللغة الطبيعية.</p>
<blockquote>
<p>تعتمد هذه الوثائق بشكل أساسي على وثائق <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">البدء السريع</a> الرسمية. إذا وجدت أي محتوى قديم أو غير متناسق، يُرجى إعطاء الأولوية للوثائق الرسمية ولا تتردد في إثارة مشكلة لنا.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">الاستخدام<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن تكوين NLWeb لاستخدام ميلفوس كمحرك استرجاع. فيما يلي دليل حول كيفية إعداد واستخدام NLWeb مع Milvus.</p>
<h3 id="Installation" class="common-anchor-header">التثبيت</h3><p>استنساخ الريبو وإعداد بيئتك:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">تهيئة ميلفوس</h3><p>لاستخدام <strong>ميلفوس،</strong> قم بتحديث التكوين الخاص بك.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">قم بتحديث ملفات التكوين في <code translate="no">code/config</code></h4><p>افتح الملف <code translate="no">config_retrieval.yaml</code> وأضف تكوين Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">تحميل البيانات</h3><p>بمجرد التهيئة، قم بتحميل المحتوى الخاص بك باستخدام موجز RSS.</p>
<p>من الدليل <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى استيعاب المحتوى في مجموعة ميلفوس الخاصة بك، وتخزين كل من البيانات النصية والتضمينات المتجهة.</p>
<h3 id="Running-the-Server" class="common-anchor-header">تشغيل الخادم</h3><p>لبدء تشغيل NLWeb، من الدليل <code translate="no">code</code> ، قم بالتشغيل:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك الآن الاستعلام عن المحتوى الخاص بك عبر اللغة الطبيعية باستخدام إما واجهة مستخدم الويب على http://localhost:8000/ أو مباشرةً من خلال واجهة برمجة تطبيقات REST API المتوافقة مع MCP.</p>
<h2 id="Further-Reading" class="common-anchor-header">مزيد من القراءة<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">وثائق ميلفوس</a></li>
<li><a href="https://github.com/microsoft/NLWeb">مصدر NLWeb</a></li>
<li>حياة استعلام الدردشة</li>
<li>تعديل السلوك عن طريق تغيير المطالبات</li>
<li>تعديل تدفق التحكم</li>
<li>تعديل واجهة المستخدم</li>
</ul>
