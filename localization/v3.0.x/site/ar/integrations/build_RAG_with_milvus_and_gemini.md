---
id: build_RAG_with_milvus_and_gemini.md
summary: >-
  في هذا البرنامج التعليمي، سنوضح لك في هذا البرنامج التعليمي كيفية إنشاء خط
  أنابيب RAG (استرجاع-توليد معزز) باستخدام Milvus و Gemini. سنستخدم نموذج Gemini
  لإنشاء نص بناءً على استعلام معين. سنستخدم أيضًا Milvus لتخزين واسترجاع النص
  الذي تم إنشاؤه.
title: بناء RAG مع Milvus وGemini
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_gemini.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_gemini.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Build-RAG-with-Milvus-and-Gemini" class="common-anchor-header">بناء RAG مع Milvus وGemini<button data-href="#Build-RAG-with-Milvus-and-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>تساعدك <a href="https://ai.google.dev/gemini-api/docs">واجهة برمجة تطبيقات Gemini</a> وGemini <a href="https://ai.google.dev/gemini-api/docs">API</a> <a href="https://ai.google.dev/aistudio">وGoogle AI Studio</a> على بدء العمل مع أحدث نماذج Google وتحويل أفكارك إلى تطبيقات قابلة للتطوير. يوفر Gemini إمكانية الوصول إلى نماذج لغوية قوية مثل <code translate="no">Gemini-2.5-Flash</code> و <code translate="no">Gemini-2.5-Pro</code> لمهام مثل توليد النصوص ومعالجة المستندات والرؤية وتحليل الصوت وغير ذلك. كما يقدم أيضًا <code translate="no">Gemini Embedding 2</code> ، وهو نموذج تضمين متعدد الوسائط يدعم النصوص والصور والفيديو والصوت ومستندات PDF بأبعاد إخراج مرنة عبر تعلم تمثيل ماتريوشكا. تسمح لك واجهة برمجة التطبيقات بإدخال سياق طويل بملايين الرموز، وضبط النماذج لمهام محددة، وإنشاء مخرجات منظمة مثل JSON، والاستفادة من إمكانيات مثل الاسترجاع الدلالي وتنفيذ التعليمات البرمجية.</p>
<p>في هذا البرنامج التعليمي، سنوضح لك في هذا البرنامج التعليمي كيفية إنشاء خط أنابيب RAG (استرجاع-جيل معزز) باستخدام Milvus و Gemini. سنستخدم نموذج Gemini لتوليد الاستجابات بناءً على استعلام معين، معززًا بالمعلومات ذات الصلة المسترجعة من Milvus.</p>
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">التبعيات والبيئة<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h3><p>أولاً، قم بتثبيت الحزم المطلوبة:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus milvus-lite google-genai requests tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<p>يجب عليك أولاً تسجيل الدخول إلى منصة Google AI Studio وإعداد <a href="https://aistudio.google.com/apikey">مفتاح api</a> <code translate="no">GEMINI_API_KEY</code> كمتغير بيئة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">إعداد البيانات<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>نحن نستخدم صفحات الأسئلة الشائعة من <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">وثائق Milvus Documentation 2.4.x</a> كمعرفة خاصة في RAG الخاص بنا، وهو مصدر بيانات جيد لخط أنابيب RAG بسيط.</p>
<p>قم بتنزيل الملف المضغوط واستخراج المستندات إلى المجلد <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>نقوم بتحميل جميع ملفات تخفيض السعر من المجلد <code translate="no">milvus_docs/en/faq</code>. بالنسبة لكل مستند، نستخدم ببساطة "# " لفصل المحتوى في الملف، وهو ما يمكن أن يفصل تقريبًا محتوى كل جزء رئيسي من ملف تخفيض السعر.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-LLM-and-Embedding-Model" class="common-anchor-header">إعداد LLM ونموذج التضمين<button data-href="#Prepare-the-LLM-and-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h3><p>نحن نستخدم <code translate="no">gemini-2.5-flash</code> كنموذج LLM، و <code translate="no">gemini-embedding-2-preview</code> كنموذج تضمين. <code translate="no">gemini-embedding-2-preview</code> هو أحدث نموذج تضمين متعدد الوسائط من Google، يدعم النصوص والصور والفيديو والصوت ومستندات PDF بأبعاد إخراج مرنة (128-3,072) عبر تعلم تمثيل ماتريوشكا.</p>
<p>لنحاول توليد استجابة اختبارية من LLM:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> google <span class="hljs-keyword">import</span> genai

client = genai.Client(api_key=os.environ[<span class="hljs-string">&quot;GEMINI_API_KEY&quot;</span>])

response = client.models.generate_content(
    model=<span class="hljs-string">&quot;gemini-2.5-flash&quot;</span>, contents=<span class="hljs-string">&quot;who are you&quot;</span>
)
<span class="hljs-built_in">print</span>(response.text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I am a large language model, trained by Google.

I'm designed to process and generate human-like text based on the vast amount of data I was trained on. This allows me to:

*   Answer questions
*   Provide summaries
*   Generate creative content
*   Translate languages
*   And much more

I don't have personal experiences, feelings, or consciousness. I'm a tool designed to be helpful and informative.
</code></pre>
<p>توليد تضمين اختبار وطباعة أبعاده وعناصره القليلة الأولى.</p>
<pre><code translate="no" class="language-python">test_embeddings = client.models.embed_content(
    model=<span class="hljs-string">&quot;gemini-embedding-2-preview&quot;</span>, contents=[<span class="hljs-string">&quot;This is a test1&quot;</span>, <span class="hljs-string">&quot;This is a test2&quot;</span>]
)

embedding_dim = <span class="hljs-built_in">len</span>(test_embeddings.embeddings[<span class="hljs-number">0</span>].values)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embeddings.embeddings[<span class="hljs-number">0</span>].values[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">3072
[-0.016769307, 0.013630492, 0.020277105, 0.0035285393, 0.003968259, -0.013498845, 0.028525498, 0.025498547, -0.021553498, 0.015233516]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">تحميل البيانات في ميلفوس<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">إنشاء المجموعة<button data-href="#Create-the-Collection" class="anchor-icon" translate="no">
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
    </button></h3><p>لنقم بتهيئة عميل ميلفوس وإعداد مجموعتنا:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>بالنسبة للوسيطة <code translate="no">MilvusClient</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">uri</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث أنه يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">ميلفوس لايت</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">uri</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
</ul>
</div>
<p>تحقق مما إذا كانت المجموعة موجودة بالفعل وأسقطها إذا كانت موجودة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء مجموعة جديدة بمعلمات محددة.</p>
<p>إذا لم نحدد أي معلومات عن الحقل، سيقوم ميلفوس تلقائيًا بإنشاء حقل افتراضي <code translate="no">id</code> للمفتاح الأساسي، وحقل <code translate="no">vector</code> لتخزين بيانات المتجه. يتم استخدام حقل JSON محجوز لتخزين الحقول غير المعرفة من قبل النظام الأساسي وقيمها.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    <span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,  # Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">إدراج البيانات<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتكرار الأسطر النصية وإنشاء التضمينات، ثم أدخل البيانات في ميلفوس.</p>
<p>هنا حقل جديد <code translate="no">text</code> ، وهو حقل غير محدد في مخطط المجموعة. ستتم إضافته تلقائيًا إلى حقل JSON الديناميكي المحجوز، والذي يمكن التعامل معه كحقل عادي على مستوى عالٍ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

doc = client.models.embed_content(model=<span class="hljs-string">&quot;gemini-embedding-2-preview&quot;</span>, contents=text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc.embeddings[i].values, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 72/72 [00:00&lt;00:00, 337796.30it/s]





{'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">بناء RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">استرجاع البيانات لاستعلام<button data-href="#Retrieve-data-for-a-query" class="anchor-icon" translate="no">
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
    </button></h3><p>لنحدد سؤالًا متكررًا عن ميلفوس.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ابحث عن السؤال في المجموعة واسترجع أفضل 3 مطابقات دلالية.</p>
<pre><code translate="no" class="language-python">quest_embed = client.models.embed_content(model=<span class="hljs-string">&quot;gemini-embedding-2-preview&quot;</span>, contents=question)

search_res = milvus_client.search(
    collection_name=collection_name,
    data=[quest_embed.embeddings[<span class="hljs-number">0</span>].values],
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>دعونا نلقي نظرة على نتائج البحث عن الاستعلام</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.864
    ],
    [
        &quot;Why is there no vector data in etcd?\n\netcd stores Milvus module metadata; MinIO stores entities.&quot;,
        0.7923
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.7857
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">استخدم LLM للحصول على استجابة RAG<button data-href="#Use-LLM-to-get-a-RAG-response" class="anchor-icon" translate="no">
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
    </button></h3><p>تحويل المستندات المسترجعة إلى تنسيق سلسلة.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>تحديد مطالبات النظام والمستخدم لنموذج اللغة. يتم تجميع هذه المطالبة مع المستندات المسترجعة من ميلفوس.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> google.genai <span class="hljs-keyword">import</span> types

SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>استخدم Gemini لإنشاء استجابة بناءً على المطالبات.</p>
<pre><code translate="no" class="language-python">response = client.models.generate_content(
    model=<span class="hljs-string">&quot;gemini-2.5-flash&quot;</span>,
    config=types.GenerateContentConfig(system_instruction=SYSTEM_PROMPT),
    contents=USER_PROMPT,
)
<span class="hljs-built_in">print</span>(response.text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two main ways:

1.  **Inserted Data:** This includes vector data, scalar data, and collection-specific schema. This type of data is stored in persistent storage as an incremental log. Milvus supports various object storage backends for this, such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS).
2.  **Metadata:** Metadata is generated within Milvus by its various modules. Each module's metadata is stored in etcd.
</code></pre>
<h2 id="Multimodal-Search" class="common-anchor-header">بحث متعدد الوسائط<button data-href="#Multimodal-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>نظرًا لأن <code translate="no">gemini-embedding-2-preview</code> يقوم بتعيين النص والصور والطرائق الأخرى في نفس مساحة التضمين، يمكننا إجراء بحث متعدد الوسائط - على سبيل المثال، استخدام استعلام نصي للعثور على الصور الأكثر صلة.</p>
<h3 id="Prepare-image-data" class="common-anchor-header">إعداد بيانات الصور<button data-href="#Prepare-image-data" class="anchor-icon" translate="no">
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
    </button></h3><p>نقوم بتحميل مجموعة من مخططات بنية RAG من مستودع Milvus Bootcamp لاستخدامها كمجموعة بيانات الصور الخاصة بنا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> urllib.request
<span class="hljs-keyword">from</span> pathlib <span class="hljs-keyword">import</span> Path

image_dir = Path(<span class="hljs-string">&quot;images&quot;</span>)
image_dir.mkdir(exist_ok=<span class="hljs-literal">True</span>)

image_files = [
    <span class="hljs-string">&quot;vanilla_rag.png&quot;</span>,
    <span class="hljs-string">&quot;hyde.png&quot;</span>,
    <span class="hljs-string">&quot;query_routing.png&quot;</span>,
    <span class="hljs-string">&quot;self_reflection.png&quot;</span>,
    <span class="hljs-string">&quot;hybrid_and_rerank.png&quot;</span>,
    <span class="hljs-string">&quot;hierarchical_index.png&quot;</span>,
]

base_url = <span class="hljs-string">&quot;https://raw.githubusercontent.com/milvus-io/bootcamp/master/pics/advanced_rag/&quot;</span>

<span class="hljs-keyword">for</span> fname <span class="hljs-keyword">in</span> image_files:
    path = image_dir / fname
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> path.exists():
        urllib.request.urlretrieve(base_url + fname, path)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Downloaded <span class="hljs-subst">{fname}</span>&quot;</span>)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Already exists <span class="hljs-subst">{fname}</span>&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nTotal images: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(image_files)}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Downloaded vanilla_rag.png
Downloaded hyde.png
Downloaded query_routing.png
Downloaded self_reflection.png
Downloaded hybrid_and_rerank.png
Downloaded hierarchical_index.png

Total images: 6
</code></pre>
<h3 id="Embed-images-and-store-in-Milvus" class="common-anchor-header">تضمين الصور وتخزينها في ملفوس<button data-href="#Embed-images-and-store-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>نقرأ كل صورة على شكل بايت ونمررها إلى <code translate="no">gemini-embedding-2-preview</code> لتوليد التضمينات، ثم نخزنها في مجموعة Milvus جديدة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> google.genai <span class="hljs-keyword">import</span> types

image_data = []

<span class="hljs-keyword">for</span> fname <span class="hljs-keyword">in</span> image_files:
    path = image_dir / fname
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(path, <span class="hljs-string">&quot;rb&quot;</span>) <span class="hljs-keyword">as</span> f:
        image_bytes = f.read()

    result = client.models.embed_content(
        model=<span class="hljs-string">&quot;gemini-embedding-2-preview&quot;</span>,
        contents=types.Part.from_bytes(data=image_bytes, mime_type=<span class="hljs-string">&quot;image/png&quot;</span>),
    )
    image_data.append(
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-built_in">len</span>(image_data),
            <span class="hljs-string">&quot;vector&quot;</span>: result.embeddings[<span class="hljs-number">0</span>].values,
            <span class="hljs-string">&quot;filename&quot;</span>: fname,
        }
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedded <span class="hljs-subst">{fname}</span>&quot;</span>)

<span class="hljs-comment"># Create a new collection for images</span>
image_collection = <span class="hljs-string">&quot;image_collection&quot;</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(image_collection):
    milvus_client.drop_collection(image_collection)

milvus_client.create_collection(
    collection_name=image_collection,
    dimension=<span class="hljs-built_in">len</span>(image_data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]),
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)

milvus_client.insert(collection_name=image_collection, data=image_data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nInserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(image_data)}</span> image embeddings (dim=<span class="hljs-subst">{<span class="hljs-built_in">len</span>(image_data[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;vector&#x27;</span>])}</span>)&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embedded vanilla_rag.png
Embedded hyde.png
Embedded query_routing.png
Embedded self_reflection.png
Embedded hybrid_and_rerank.png
Embedded hierarchical_index.png

Inserted 6 image embeddings (dim=3072)
</code></pre>
<h3 id="Cross-modal-search-Text-query-→-Image-results" class="common-anchor-header">البحث عبر الوسائط: استعلام نصي → نتائج الصور<button data-href="#Cross-modal-search-Text-query-→-Image-results" class="anchor-icon" translate="no">
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
    </button></h3><p>لنستخدم الآن استعلام نصي للبحث عبر تضمينات الصور. نظرًا لأنه يتم تعيين كل من النص والصور في نفس مساحة التضمين، يمكننا المقارنة بينهما مباشرةً.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display, Image

text_queries = [
    <span class="hljs-string">&quot;How does a basic RAG pipeline work?&quot;</span>,
    <span class="hljs-string">&quot;What is the hypothetical document embedding approach?&quot;</span>,
    <span class="hljs-string">&quot;How to combine hybrid search with reranking?&quot;</span>,
]

<span class="hljs-keyword">for</span> query <span class="hljs-keyword">in</span> text_queries:
    query_embed = client.models.embed_content(
        model=<span class="hljs-string">&quot;gemini-embedding-2-preview&quot;</span>, contents=query
    )

    results = milvus_client.search(
        collection_name=image_collection,
        data=[query_embed.embeddings[<span class="hljs-number">0</span>].values],
        limit=<span class="hljs-number">1</span>,
        search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},
        output_fields=[<span class="hljs-string">&quot;filename&quot;</span>],
    )

    best = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\nQuery: <span class="hljs-subst">{query}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Match: <span class="hljs-subst">{best[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;filename&#x27;</span>]}</span> (score: <span class="hljs-subst">{best[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>)&quot;</span>)
    display(Image(filename=<span class="hljs-built_in">str</span>(image_dir / best[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filename&quot;</span>]), width=<span class="hljs-number">600</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: How does a basic RAG pipeline work?
Match: vanilla_rag.png (score: 0.5132)
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build_RAG_with_milvus_and_gemini_38_1.png" alt="Vanilla RAG Pipeline" class="doc-image" id="vanilla-rag-pipeline" />
   </span> <span class="img-wrapper"> <span>خط أنابيب فانيلا RAG</span> </span></p>
<pre><code translate="no">Query: What is the hypothetical document embedding approach?
Match: hyde.png (score: 0.4756)
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build_RAG_with_milvus_and_gemini_38_3.png" alt="HyDE" class="doc-image" id="hyde" />
   </span> <span class="img-wrapper"> <span>HyDE</span> </span></p>
<pre><code translate="no">Query: How to combine hybrid search with reranking?
Match: hybrid_and_rerank.png (score: 0.5271)
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build_RAG_with_milvus_and_gemini_38_5.png" alt="Hybrid Retrieval and Reranking" class="doc-image" id="hybrid-retrieval-and-reranking" />
   </span> <span class="img-wrapper"> <span>الاسترجاع وإعادة الترتيب الهجين</span> </span></p>
<p>رائع! لقد أنشأنا بنجاح خط أنابيب RAG مع Milvus و Gemini، وأثبتنا البحث عبر الوسائط باستخدام استعلامات نصية لاسترداد الصور ذات الصلة - كل ذلك مدعومًا بمساحة التضمين الموحدة <code translate="no">gemini-embedding-2-preview</code>.</p>
