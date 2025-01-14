---
id: quickstart_mem0_with_milvus.md
summary: >-
  في هذا البرنامج التعليمي، سنغطي في هذا البرنامج التعليمي العمليات الأساسية
  لإدارة ذاكرة Mem0 - إضافة واسترجاع وتحديث والبحث والحذف وتتبع سجل الذاكرة -
  باستخدام Milvus، وهي قاعدة بيانات متجهة مفتوحة المصدر عالية الأداء ومفتوحة
  المصدر تعمل على تشغيل التخزين والاسترجاع الفعال. ستوجهك هذه المقدمة العملية
  خلال عمليات الذاكرة التأسيسية لمساعدتك في بناء تفاعلات ذكاء اصطناعي مخصصة مع
  Mem0 و Milvus.
title: الشروع في العمل مع Mem0 وMilvus
---
<h1 id="Getting-Started-with-Mem0-and-Milvus" class="common-anchor-header">الشروع في العمل مع Mem0 وMilvus<button data-href="#Getting-Started-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/quickstart_mem0_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/quickstart_mem0_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://mem0.ai/">Mem0</a> عبارة عن طبقة ذاكرة ذكية لتطبيقات الذكاء الاصطناعي، مصممة لتقديم تفاعلات مخصصة وفعالة من خلال الاحتفاظ بتفضيلات المستخدم والتكيف المستمر بمرور الوقت. تُعد Mem0 مثالية لروبوتات الدردشة الآلية والأدوات التي تعتمد على الذكاء الاصطناعي، فهي تُنشئ تجارب سلسة مدركة للسياق.</p>
<p>في هذا البرنامج التعليمي، سنغطي في هذا البرنامج التعليمي العمليات الأساسية لإدارة ذاكرة Mem0 - إضافة واسترجاع وتحديث والبحث والحذف وتتبع سجل الذاكرة - باستخدام <a href="https://milvus.io/">Milvus،</a> وهي قاعدة بيانات متجهة مفتوحة المصدر عالية الأداء ومفتوحة المصدر تعمل على تشغيل التخزين والاسترجاع الفعال. ستوجهك هذه المقدمة العملية خلال عمليات الذاكرة التأسيسية لمساعدتك في بناء تفاعلات ذكاء اصطناعي مخصصة مع Mem0 وMilvus.</p>
<h2 id="Preparation" class="common-anchor-header">التحضير<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">تنزيل المكتبات المطلوبة</h3><pre><code translate="no" class="language-shell">$ pip install mem0ai pymilvus
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</blockquote>
<h3 id="Configure-Mem0-with-Milvus" class="common-anchor-header">تكوين Mem0 مع ميلفوس</h3><p>سنستخدم OpenAI باعتباره LLM في هذا المثال. يجب عليك إعداد <a href="https://platform.openai.com/docs/quickstart">مفتاح api</a> <code translate="no">OPENAI_API_KEY</code> كمتغير بيئة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>والآن، يمكننا تهيئة Mem0 لاستخدام Milvus كمخزن للمتجهات</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define Config</span>
<span class="hljs-keyword">from</span> mem0 <span class="hljs-keyword">import</span> Memory

config = {
    <span class="hljs-string">&quot;vector_store&quot;</span>: {
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>,
        <span class="hljs-string">&quot;config&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;quickstart_mem0_with_milvus&quot;</span>,
            <span class="hljs-string">&quot;embedding_model_dims&quot;</span>: <span class="hljs-string">&quot;1536&quot;</span>,
            <span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># Use local vector database for demo purpose</span>
        },
    },
    <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;v1.1&quot;</span>,
}

m = Memory.from_config(config)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>إذا كنت تحتاج فقط إلى قاعدة بيانات متجهات محلية للبيانات الصغيرة الحجم أو النماذج الأولية، فإن تعيين uri كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا Milvus <a href="https://milvus.io/docs/milvus_lite.md">Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، على سبيل المثال أكثر من مليون ناقل، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>. في هذا الإعداد، يُرجى استخدام عنوان الخادم والمنفذ كـ uri، على سبيل المثال<code translate="no">http://localhost:19530</code>. إذا قمت بتمكين خاصية المصادقة على Milvus، استخدم "&lt;your_username&gt;: &lt;your_password&gt;" كرمز مميز، وإلا فلا تقم بتعيين الرمز المميز.</li>
<li>إذا كنت تستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> في Zilliz Cloud.</li>
</ul>
</blockquote>
</div>
<h2 id="Managing-User-Memories-with-Mem0-and-Milvus" class="common-anchor-header">إدارة ذكريات المستخدم مع Mem0 و Milvus<button data-href="#Managing-User-Memories-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Adding-a-Memory" class="common-anchor-header">إضافة ذاكرة</h3><p>تقوم الدالة <code translate="no">add</code> بتخزين نص غير منظم في ميلفوس كذاكرة، وربطه بمستخدم معين وبيانات وصفية اختيارية.</p>
<p>هنا، نقوم بإضافة ذاكرة أليس، "أعمل على تحسين مهاراتي في التنس"، إلى جانب البيانات الوصفية ذات الصلة بالسياق إلى ملفوس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a memory to user: Working on improving tennis skills</span>
res = m.add(
    messages=<span class="hljs-string">&quot;I am working on improving my tennis skills.&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;hobbies&quot;</span>},
)

res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Working on improving tennis skills',
   'event': 'ADD'}],
 'relations': []}
</code></pre>
<h3 id="Update-a-Memory" class="common-anchor-header">تحديث الذاكرة</h3><p>يمكننا استخدام قيمة إرجاع الدالة <code translate="no">add</code> لاسترداد معرّف الذاكرة، مما يسمح لنا بتحديث هذه الذاكرة بمعلومات جديدة عبر <code translate="no">update</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get memory_id</span>
memory_id = res[<span class="hljs-string">&quot;results&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>]

<span class="hljs-comment"># Update this memory with new information: Likes to play tennis on weekends</span>
m.update(memory_id=memory_id, data=<span class="hljs-string">&quot;Likes to play tennis on weekends&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'message': 'Memory updated successfully!'}
</code></pre>
<h3 id="Get-All-Memory-For-a-User" class="common-anchor-header">الحصول على كل الذاكرة لمستخدم</h3><p>يمكننا استخدام الدالة <code translate="no">get_all</code> لعرض جميع الذكريات المدرجة أو التصفية حسب <code translate="no">user_id</code> في ميلفوس.</p>
<p>لاحظ أنه يمكننا أن نرى أن الذاكرة قد تغيرت الآن من &quot;العمل على تطوير مهارات التنس&quot; إلى &quot;يحب لعب التنس في عطلات نهاية الأسبوع&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get all memory for the user Alice</span>
m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'}]}
</code></pre>
<h3 id="View-Memory-Update-History" class="common-anchor-header">عرض سجل تحديث الذاكرة</h3><p>يمكننا أيضًا عرض سجل تحديث الذاكرة من خلال تحديد الذاكرة_المعرف التي نهتم بها عبر الدالة <code translate="no">history</code>.</p>
<pre><code translate="no" class="language-python">m.history(memory_id=memory_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'id': '71ed3cec-5d9a-4fa6-a009-59802450c0b9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': None,
  'new_memory': 'Working on improving tennis skills',
  'event': 'ADD',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': None},
 {'id': 'db2b003c-ffb7-42e4-bd8a-b9cf56a02bb9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': 'Working on improving tennis skills',
  'new_memory': 'Likes to play tennis on weekends',
  'event': 'UPDATE',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': '2024-11-01T19:33:47.619857-07:00'}]
</code></pre>
<h3 id="Search-Memory" class="common-anchor-header">البحث في الذاكرة</h3><p>يمكننا استخدام الدالة <code translate="no">search</code> للبحث عن الذاكرة الأكثر ارتباطًا بالمستخدم.</p>
<p>لنبدأ بإضافة ذاكرة أخرى لـ أليس.</p>
<pre><code translate="no" class="language-python">new_mem = m.<span class="hljs-keyword">add</span>(
    <span class="hljs-string">&quot;I have a linear algebra midterm exam on November 20&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;task&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>والآن، نتصل بـ <code translate="no">get_all</code> مع تحديد user_id للتحقق من أن لدينا بالفعل إدخالات ذاكرة 2 للمستخدم أليس.</p>
<pre><code translate="no" class="language-python">m.<span class="hljs-title function_">get_all</span>(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<p>يمكننا إجراء <code translate="no">search</code> الآن من خلال توفير <code translate="no">query</code> و <code translate="no">user_id</code>. لاحظ أننا نستخدم افتراضيًا مقياس <code translate="no">L2</code> للبحث عن التشابه، لذا فإن أصغر <code translate="no">score</code> يعني تشابهًا أكبر.</p>
<pre><code translate="no" class="language-python">m.<span class="hljs-title function_">search</span>(query=<span class="hljs-string">&quot;What are Alice&#x27;s hobbies&quot;</span>, user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'score': 1.2807445526123047,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'score': 1.728922724723816,
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<h3 id="Delete-Memory" class="common-anchor-header">حذف الذاكرة</h3><p>يمكننا أيضًا <code translate="no">delete</code> ذاكرة من خلال توفير الذاكرة المقابلة <code translate="no">memory_id</code>.</p>
<p>سنقوم بحذف الذاكرة "يحب لعب التنس في عطلات نهاية الأسبوع" حيث تم استرجاع <code translate="no">memory_id</code> الخاص بها بالفعل، واستدعاء <code translate="no">get_all</code> للتحقق من نجاح عملية الحذف.</p>
<pre><code translate="no" class="language-python">m.<span class="hljs-built_in">delete</span>(memory_id=memory_id)

m.get_all(<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
