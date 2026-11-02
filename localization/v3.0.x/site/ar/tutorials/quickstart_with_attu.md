---
id: quickstart_with_attu.md
summary: >-
  استخدم «Attu Desktop» و«Python» لإنشاء مجموعة في «Milvus»، وإدراج تمثيلات
  نصية، وفحص نتائج البحث المتجهي.
title: البدء السريع مع Attu - واجهة المستخدم على الويب الخاصة بـ Milvus
---
<h1 id="Quick-Start-with-Attu---the-Web-UI-of-Milvus" class="common-anchor-header">البدء السريع مع Attu - واجهة المستخدم على الويب الخاصة بـ Milvus<button data-href="#Quick-Start-with-Attu---the-Web-UI-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. مقدمة<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> هي أداة إدارة لـ Milvus. تتميز بواجهة مستخدم رسومية (GUI) سهلة الاستخدام، تتيح لك التفاعل بسهولة مع قواعد البيانات الخاصة بك. وببضع نقرات فقط، يمكنك عرض حالة المجموعة الخاصة بك، وإدارة البيانات الوصفية، وإجراء استعلامات البيانات، وغير ذلك الكثير.</p>
<hr>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل البدء، قم بإعداد ما يلي:</p>
<ul>
<li>خادم Milvus قيد التشغيل يمكن لكل من Attu وبيئة Python الخاصة بك الوصول إليه. يستخدم هذا البرنامج التعليمي Milvus Standalone الموجود على <code translate="no">http://localhost:19530</code> ، وليس ملف Milvus Lite المحلي <code translate="no">.db</code>.</li>
<li>إصدار Attu متوافق مع الخادم الخاص بك. يدعم Attu 3.0 Milvus 2.6.0 والإصدارات الأحدث، بما في ذلك Milvus 3.x؛ استخدم <a href="https://github.com/zilliztech/attu#compatibility">جدول التوافق</a> للخوادم الأقدم.</li>
<li>بيئة Python بها إصدار PyMilvus متوافق مع الخادم الخاص بك. راجع <a href="/docs/ar/install-pymilvus.md">«تثبيت Milvus Python SDK</a> » <a href="/docs/ar/release_notes.md">و«ملاحظات الإصدار</a>». بالنسبة لإصدار SDK المستخدم في فرع الوثائق هذا، قم بتثبيت التبعيات model extra و progress-bar:</li>
</ul>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>تستخدم خطوات إعداد البيانات أيضًا <code translate="no">wget</code> و <code translate="no">unzip</code>. تقوم وظيفة التضمين بتنزيل نموذجها عند الاستخدام الأول، لذا اسمح بالوصول عبر الشبكة إلى مضيف النموذج أو قم بإعداد ذاكرة التخزين المؤقت للنموذج مسبقًا. توضح لقطات الشاشة سير العمل؛ وقد تختلف التسميات والتخطيطات بين إصدارات Attu.</p>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. تثبيت تطبيق سطح المكتب<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>قم بتنزيل إصدار سطح المكتب من Attu من خلال زيارة <a href="https://github.com/zilliztech/attu/releases">صفحة إصدارات Attu على GitHub</a>. حدد الإصدار المناسب لنظام التشغيل الخاص بك واتبع خطوات التثبيت.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">ملاحظة لنظام macOS (رقاقة سلسلة M):<button data-href="#Note-for-macOS-M-series-chip" class="anchor-icon" translate="no">
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
    </button></h3><p>إذا واجهت الخطأ التالي:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل الأمر التالي في Terminal لتجاوز هذه المشكلة:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. الاتصال بـ Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Attu الاتصال بكل من <strong>Milvus Standalone</strong> و <strong>Zilliz Cloud،</strong> مما يوفر مرونة للعمل مع قواعد البيانات المحلية أو المستضافة على السحابة.</p>
<p>لاستخدام Milvus Standalone محليًا:</p>
<ol>
<li>ابدأ تشغيل Milvus Standalone باتباع <a href="https://milvus.io/docs/install_standalone-docker.md">دليل تثبيت Milvus</a>.</li>
<li>افتح Attu وأدخل معلومات الاتصال:
<ul>
<li>عنوان Milvus: عنوان URI لخادم Milvus Standalone الخاص بك، على سبيل المثال http://localhost:19530</li>
<li>الإعدادات الاختيارية الأخرى: يمكنك ضبطها وفقًا لتكوينات Milvus الخاصة بك أو تركها على الإعدادات الافتراضية.</li>
</ul></li>
<li>انقر على «Connect» للوصول إلى قاعدة البيانات الخاصة بك.</li>
</ol>
<blockquote>
<p>يمكنك أيضًا الاتصال بـ Milvus المُدار بالكامل على <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. ما عليك سوى تعيين " <code translate="no">Milvus Address</code> " و" <code translate="no">token</code> " على " <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint" و"API key</a> " لمثيل Zilliz Cloud الخاص بك.</p>
</blockquote>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. تحضير البيانات وإنشاء المجموعة وإدراج البيانات<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 إعداد البيانات<button data-href="#41-Prepare-the-Data" class="anchor-icon" translate="no">
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
    </button></h3><p>نستخدم صفحات الأسئلة الشائعة من <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">أرشيف</a> ثابت <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">لوثائق Milvus 2.4.x</a> كنص نموذجي. الأرشيف عبارة عن مجموعة بيانات استرجاع، وليس إصدار الخادم أو SDK المراد تثبيته.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">تنزيل البيانات واستخراجها:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">معالجة ملفات Markdown:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>, encoding=<span class="hljs-string">&quot;utf-8&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> text_lines:
    <span class="hljs-keyword">raise</span> RuntimeError(<span class="hljs-string">&quot;No FAQ files found. Check the extracted milvus_docs/en/faq directory.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 إنشاء التضمينات<button data-href="#42-Generate-Embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>تحديد نموذج التضمين لإنشاء تضمينات نصية باستخدام <code translate="no">milvus_model</code>. نستخدم نموذج <code translate="no">DefaultEmbeddingFunction</code> كمثال، وهو نموذج تضمين خفيف الوزن ومدرب مسبقًا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">الناتج:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 إنشاء مجموعة<button data-href="#43-Create-Collection" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتوصيل Python بنفس نقطة نهاية Milvus وقاعدة البيانات التي حددتها في Attu. إذا تم تمكين المصادقة، فقم بتكوين بيانات الاعتماد المقابلة في كلا العميلين. قم بإنشاء مجموعة:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop the tutorial collection if it exists so the steps can be rerun from the top.</span>
<span class="hljs-comment"># Choose a different collection_name if &quot;attu_tutorial&quot; already holds data you want to keep.</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/tune_consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 إدراج البيانات<button data-href="#44-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بالتكرار عبر أسطر النص، وأنشئ عمليات التضمين، وأدخل البيانات في Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 تصور البيانات والمخطط<button data-href="#45-Visualize-Data-and-Schema" class="anchor-icon" translate="no">
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
    </button></h3><p>في Attu، قم بتحديث قائمة المجموعات وافتح <code translate="no">attu_tutorial</code>. يتضمن مخطط الإعداد السريع مفتاحًا أساسيًا هو <code translate="no">id</code> وحقلًا هو <code translate="no">vector</code> الذي يكون بعده <code translate="no">embedding_dim</code> ، مع مقياس <code translate="no">Inner Product (IP)</code>. يتم تخزين قيم <code translate="no">text</code> في الحقل الديناميكي. انظر <a href="/docs/ar/create-collection.md">إنشاء مجموعة</a> <a href="/docs/ar/enable-dynamic-field.md">وحقل ديناميكي</a> للاطلاع على خيارات المخطط الصريحة. يعتمد عدد الكيانات على النص النموذجي المستخرج، لذا استخدم عدد الصفوف التي أدخلتها بدلاً من الرقم الموجود في لقطات الشاشة.</p>
<p>بالإضافة إلى ذلك، يمكننا عرض البيانات التي تم إدخالها، بما في ذلك المعرف (ID) وتضمينات المتجهات والحقول الديناميكية التي تخزن البيانات الوصفية مثل محتوى النص. تدعم الواجهة التصفية والاستعلام بناءً على شروط محددة أو حقول ديناميكية.</p>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. تصور نتائج البحث والعلاقات<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>يوفر Attu واجهة قوية لتصور واستكشاف علاقات البيانات. لفحص نقاط البيانات التي تم إدخالها وعلاقات التشابه بينها، اتبع الخطوات التالية:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>إجراء بحث</strong><button data-href="#51-Perform-a-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>انتقل إلى علامة التبويب <strong>«البحث المتجهي» (Vector Search</strong> ) في Attu.</p>
<ol>
<li>انقر على زر " <strong>إنشاء بيانات عشوائية</strong> " لإنشاء استعلامات اختبارية.</li>
<li>انقر على <strong>«Search»</strong> (بحث) لاسترداد النتائج بناءً على البيانات التي تم إنشاؤها.</li>
</ol>
<p>يتم عرض النتائج في جدول، يوضح المعرفات ودرجات التشابه والحقول الديناميكية لكل كيان مطابق. تختبر المتجهات العشوائية سير عمل البحث، وليس الصلة الدلالية. للحصول على استعلام نصي ذي مغزى، قم بترميزه باستخدام نفس دالة " <code translate="no">embedding_model.encode_queries()</code> " المستخدمة في هذه المجموعة، ثم ابحث باستخدام هذا المتجه. انظر <a href="/docs/ar/single-vector-search.md">"البحث باستخدام متجه واحد</a> " للاطلاع على مثال بلغة Python.</p>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>استكشاف علاقات البيانات</strong><button data-href="#52-Explore-Data-Relationships" class="anchor-icon" translate="no">
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
    </button></h3><p>انقر على زر <strong>«استكشاف»</strong> في لوحة النتائج لتصور العلاقات بين متجه الاستعلام ونتائج البحث في <strong>بنية تشبه الرسم البياني المعرفي</strong>.</p>
<ul>
<li>تمثل <strong>العقدة المركزية</strong> متجه البحث.</li>
<li>تمثل <strong>العقد المتصلة</strong> نتائج البحث، وسيؤدي النقر عليها إلى عرض المعلومات التفصيلية للعقدة المقابلة.</li>
</ul>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>توسيع الرسم البياني</strong><button data-href="#53-Expand-the-Graph" class="anchor-icon" translate="no">
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
    </button></h3><p>انقر نقرًا مزدوجًا على أي عقدة من نتائج البحث لتوسيع روابطها. يكشف هذا الإجراء عن علاقات إضافية بين العقدة المحددة ونقاط البيانات الأخرى في المجموعة، مما يؤدي إلى إنشاء <strong>رسم بياني معرفي أكبر ومترابط</strong>.</p>
<p>تتيح هذه العرض الموسع استكشافًا أعمق لكيفية ارتباط نقاط البيانات، استنادًا إلى تشابه المتجهات.</p>
<p align="center">
  <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. الخلاصة<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>يبسط Attu إدارة البيانات المتجهة المخزنة في Milvus وعرضها بصريًا. بدءًا من إدخال البيانات وصولًا إلى تنفيذ الاستعلامات والاستكشاف التفاعلي، يوفر Attu واجهة سهلة الاستخدام للتعامل مع مهام البحث المتجهة المعقدة. بفضل ميزات مثل دعم المخططات الديناميكية، وعروض البحث الرسومية، وفلاتر الاستعلام المرنة، يمكّن Attu المستخدمين من تحليل مجموعات البيانات الضخمة بفعالية.</p>
<p>من خلال الاستفادة من أدوات الاستكشاف المرئي التي يوفرها Attu، يمكن للمستخدمين فهم بياناتهم بشكل أفضل، وتحديد العلاقات الخفية، واتخاذ قرارات تستند إلى البيانات. ابدأ اليوم في استكشاف مجموعات البيانات الخاصة بك باستخدام Attu وMilvus!</p>
<hr>
