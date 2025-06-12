---
id: build_rag_on_arm.md
summary: >-
  في هذا البرنامج التعليمي، ستتعلم في هذا البرنامج التعليمي كيفية إنشاء تطبيق
  الجيل المعزز للاسترجاع (RAG) على البنى التحتية القائمة على الذراع. بالنسبة
  لتخزين المتجهات، نستخدم Zilliz Cloud، قاعدة بيانات Milvus vector المدارة
  بالكامل. تتوفر Zilliz Cloud على السحابة الرئيسية مثل AWS وGCP وAzure. في هذا
  العرض التوضيحي نستخدم Zilliz Cloud المنشورة على AWS مع أجهزة Arm. بالنسبة إلى
  LLM، نستخدم نموذج Llama-3.1-8B على وحدة المعالجة المركزية للخوادم القائمة على
  AWS Arm باستخدام llama.cpp.
title: بناء RAG على بنية Arm
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">بناء RAG على بنية Arm<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>يتم استخدام وحدات المعالجة المركزية<a href="https://www.arm.com/">Arm</a> على نطاق واسع عبر مجموعة واسعة من التطبيقات، بما في ذلك حالات استخدام التعلم الآلي (ML) والذكاء الاصطناعي (AI) التقليدية.</p>
<p>في هذا البرنامج التعليمي، ستتعلم في هذا البرنامج التعليمي كيفية إنشاء تطبيق استرجاع-مُعزَّز (RAG) على البنى التحتية القائمة على الذراع. لتخزين المتجهات، نستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud</a>، وهي قاعدة بيانات Milvus vector المدارة بالكامل. تتوفر Zilliz Cloud على السحابة الرئيسية مثل AWS وGCP وAzure. في هذا العرض التوضيحي نستخدم Zilliz Cloud المنشورة على AWS مع أجهزة Arm. بالنسبة إلى LLM، نستخدم نموذج <code translate="no">Llama-3.1-8B</code> على وحدة المعالجة المركزية للخوادم القائمة على الذراع على AWS باستخدام <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>لتشغيل هذا المثال، نوصيك باستخدام <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton،</a> الذي يوفر طريقة فعالة من حيث التكلفة لتشغيل أحمال عمل التعلم الآلي على الخوادم القائمة على الذراع. تم اختبار هذا الكمبيوتر الدفتري على مثيل AWS Graviton3 <code translate="no">c7g.2xlarge</code> مع نظام Ubuntu 22.04 LTS.</p>
<p>تحتاج إلى أربعة أنوية على الأقل وذاكرة وصول عشوائي بسعة 8 جيجابايت لتشغيل هذا المثال. قم بتكوين تخزين القرص حتى 32 جيجابايت على الأقل. نوصي باستخدام مثيل بنفس المواصفات أو أفضل.</p>
<p>بعد تشغيل المثيل، قم بالاتصال به وتشغيل الأوامر التالية لإعداد البيئة.</p>
<p>تثبيت بايثون على الخادم:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>إنشاء بيئة افتراضية وتفعيلها:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>تثبيت تبعيات بايثون المطلوبة:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">تحميل البيانات دون اتصال<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">إنشاء المجموعة</h3><p>نحن نستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud</a> المنتشر على AWS مع الأجهزة القائمة على الذراع لتخزين واسترجاع البيانات المتجهة. للبدء سريعًا، ما عليك سوى <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">تسجيل حساب</a> على Zilliz Cloud مجانًا.</p>
<div class="alert note">
<p>وبالإضافة إلى Zilliz Cloud، فإن Milvus المستضاف ذاتيًا هو أيضًا خيار (أكثر تعقيدًا في الإعداد). يمكننا أيضًا نشر <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> و <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> على الأجهزة المستندة إلى ARM. لمزيد من المعلومات حول تثبيت Milvus، يرجى الرجوع إلى <a href="https://milvus.io/docs/install-overview.md">وثائق التثبيت</a>.</p>
</div>
<p>نقوم بتعيين <code translate="no">uri</code> و <code translate="no">token</code> <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">كنقطة نهاية عامة ومفتاح Api</a> في Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>تحقق مما إذا كانت المجموعة موجودة بالفعل وأسقطها إذا كانت موجودة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>قم بإنشاء مجموعة جديدة بمعلمات محددة.</p>
<p>إذا لم نحدد أي معلومات عن الحقل، سيقوم ميلفوس تلقائيًا بإنشاء حقل افتراضي <code translate="no">id</code> للمفتاح الأساسي، وحقل <code translate="no">vector</code> لتخزين بيانات المتجه. يتم استخدام حقل JSON محجوز لتخزين الحقول غير المعرفة من قبل الهيكلية وقيمها.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>نستخدم مسافة الضرب الداخلي كنوع القياس الافتراضي. لمزيد من المعلومات حول أنواع المسافات، يمكنك الرجوع إلى <a href="https://milvus.io/docs/metric.md?tab=floating">صفحة مقاييس التشابه</a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">إعداد البيانات</h3><p>نحن نستخدم صفحات الأسئلة الشائعة من <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">وثائق ميلفوس 2.4.x</a> كمعرفة خاصة في RAG الخاص بنا، وهو مصدر بيانات جيد لخط أنابيب RAG بسيط.</p>
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
<h3 id="Insert-data" class="common-anchor-header">إدراج البيانات</h3><p>نقوم بإعداد نموذج تضمين بسيط وفعّال <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">في</a> الوقت نفسه <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">كل -MiniLM-L6-v2</a> يمكنه تحويل النص إلى متجهات تضمين.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>قم بتكرار الأسطر النصية وإنشاء التضمينات، ثم قم بإدراج البيانات في ملف Milvus.</p>
<p>هنا حقل جديد <code translate="no">text</code> ، وهو حقل غير محدد في مخطط المجموعة. ستتم إضافته تلقائيًا إلى حقل JSON الديناميكي المحجوز، والذي يمكن التعامل معه كحقل عادي على مستوى عالٍ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">إطلاق خدمة LLM على الذراع<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، سنقوم ببناء وتشغيل خدمة <code translate="no">llama.cpp</code> على وحدة المعالجة المركزية القائمة على الذراع.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">نموذج Llama 3.1 و llama.cpp</h3><p>ينتمي <a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">نموذج Llama-3.1-8B</a> من Meta إلى عائلة نماذج Llama 3.1 وهو مجاني للاستخدام لأغراض بحثية وتجارية. قبل استخدام النموذج، قم بزيارة <a href="https://llama.meta.com/llama-downloads/">موقع Llama على الويب</a> واملأ النموذج لطلب الوصول.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a> هو مشروع C/C++ المفتوح المصدر الذي يتيح الاستدلال الفعال لنموذج LLM على مجموعة متنوعة من الأجهزة - سواءً محليًا أو في السحابة. يمكنك استضافة نموذج Llama 3.1 بسهولة باستخدام <code translate="no">llama.cpp</code>.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">قم بتنزيل وبناء llama.cpp</h3><p>قم بتشغيل الأوامر التالية لتثبيت الأوامر make و cmake و gcc و g++ وغيرها من الأدوات الأساسية المطلوبة لبناء llama.cpp من المصدر:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>أنت الآن جاهز لبدء البناء <code translate="no">llama.cpp</code>.</p>
<p>استنسخ المستودع المصدر ل llama.cpp:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>بشكل افتراضي، يتم إنشاء <code translate="no">llama.cpp</code> لوحدة المعالجة المركزية فقط على نظامي لينكس وويندوز. لا تحتاج إلى توفير أي مفاتيح إضافية لإنشائه لوحدة المعالجة المركزية Arm التي تقوم بتشغيله عليها.</p>
<p>قم بتشغيل <code translate="no">make</code> لبنائه:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>تحقق من أن <code translate="no">llama.cpp</code> قد تم بناؤه بشكل صحيح عن طريق تشغيل أمر المساعدة:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>إذا تم بناء <code translate="no">llama.cpp</code> بشكل صحيح، فسترى خيار المساعدة معروضًا. يبدو مقتطف الإخراج هكذا:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>يمكنك الآن تنزيل النموذج باستخدام huggingface cli:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>يستخدم تنسيق نموذج GGUF، الذي قدمه فريق llama.cpp، الضغط والتكميم لتقليل دقة الوزن إلى أعداد صحيحة 4 بت، مما يقلل بشكل كبير من المتطلبات الحسابية والذاكرة ويجعل وحدات المعالجة المركزية Arm فعالة في الاستدلال على LLM.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">إعادة تكميم أوزان النموذج</h3><p>لإعادة التكنيز، قم بتشغيل</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي هذا إلى إخراج ملف جديد، <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code> ، والذي يحتوي على أوزان معاد تكوينها تسمح <code translate="no">llama-cli</code> باستخدام SVE 256 ودعم MATMUL_INT8.</p>
<div class="alert note">
<p>إعادة التهيئة هذه هي الأمثل خصيصًا لـ Graviton3. بالنسبة إلى Graviton2، يجب إجراء إعادة التهيئة المثلى بتنسيق <code translate="no">Q4_0_4_4</code> ، وبالنسبة إلى Graviton4، فإن تنسيق <code translate="no">Q4_0_4_8</code> هو الأنسب لإعادة التهيئة.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">بدء تشغيل خدمة LLM</h3><p>يمكنك استخدام برنامج خادم llama.cpp وإرسال الطلبات عبر واجهة برمجة تطبيقات متوافقة مع OpenAI. يسمح لك ذلك بتطوير تطبيقات تتفاعل مع LLM عدة مرات دون الحاجة إلى بدء تشغيله وإيقافه بشكل متكرر. بالإضافة إلى ذلك، يمكنك الوصول إلى الخادم من جهاز آخر حيث يتم استضافة LLM عبر الشبكة.</p>
<p>قم ببدء تشغيل الخادم من سطر الأوامر، ويستمع على المنفذ 8080:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>يمكنك أيضًا ضبط معلمات LLM الذي تم تشغيله لتكييفه مع أجهزة الخادم لديك للحصول على أداء مثالي. لمزيد من المعلومات عن المعلمات، راجع الأمر <code translate="no">llama-server --help</code>.</p>
<p>إذا كنت تواجه صعوبة في تنفيذ هذه الخطوة، يمكنك الرجوع إلى <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">المستندات الرسمية</a> لمزيد من المعلومات.</p>
<p>لقد قمت ببدء تشغيل خدمة LLM على وحدة المعالجة المركزية القائمة على الذراع. بعد ذلك، نتفاعل مباشرةً مع الخدمة باستخدام OpenAI SDK.</p>
<h2 id="Online-RAG" class="common-anchor-header">RAG عبر الإنترنت<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">عميل LLM ونموذج التضمين</h3><p>نقوم بتهيئة عميل LLM وإعداد نموذج التضمين.</p>
<p>بالنسبة لـ LLM، نستخدم OpenAI SDK لطلب خدمة Llama التي تم إطلاقها من قبل. لا نحتاج إلى استخدام أي مفتاح API لأنه في الواقع خدمة llama.cpp المحلية الخاصة بنا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>توليد تضمين اختبار وطباعة بُعده والعناصر القليلة الأولى.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">استرجاع البيانات لاستعلام</h3><p>لنحدد سؤالًا متكررًا عن ميلفوس.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ابحث عن السؤال في المجموعة واسترجع أفضل 3 مطابقات دلالية.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>لنلقِ نظرة على نتائج البحث عن الاستعلام</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">استخدم LLM للحصول على استجابة RAG</h3><p>تحويل المستندات المسترجعة إلى تنسيق سلسلة.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>استخدم LLM لإنشاء استجابة بناءً على المطالبات. قمنا بتعيين المعلمة <code translate="no">model</code> إلى <code translate="no">not-used</code> نظرًا لأنها معلمة زائدة عن الحاجة لخدمة llama.cpp.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>تهانينا! لقد قمت ببناء تطبيق RAG فوق البنى التحتية القائمة على الذراع.</p>
