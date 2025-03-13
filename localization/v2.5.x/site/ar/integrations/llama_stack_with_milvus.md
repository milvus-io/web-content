---
id: llama_stack_with_milvus.md
title: بناء RAG مع كومة لاما مع ميلفوس
related_key: Llama Stack
summary: >-
  يقدم هذا البرنامج التعليمي كيفية إنشاء خادم Llama Stack Server مهيأ باستخدام
  Milvus، مما يتيح لك استيراد بياناتك الخاصة لتكون بمثابة قاعدة معرفية. سنقوم
  بعد ذلك بإجراء استعلامات على الخادم، وإنشاء تطبيق RAG كامل.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">بناء RAG مع Llama Stack مع Milvus<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack</a> هو نهج مكدس<a href="https://github.com/meta-llama/llama-stack/tree/main">Llama</a> Stack هو نهج موجه نحو الخدمة يعتمد على واجهة برمجة التطبيقات أولاً لبناء تطبيقات الذكاء الاصطناعي للإنتاج. وهو يوفر مكدسًا عالميًا يسمح للمطورين بالتطوير في أي مكان، والنشر في كل مكان، والاستفادة من وحدات البناء الجاهزة للإنتاج مع استقلالية حقيقية للمزود. تركز حزمة Llama Stack على نماذج Llama الخاصة ب Meta، وقابلية التركيب، والجاهزية للإنتاج، والنظام البيئي للشراكة.</p>
<p>سنقدم في هذا البرنامج التعليمي كيفية بناء خادم Llama Stack المكدس الذي تم تكوينه باستخدام Milvus، مما يتيح لك استيراد بياناتك الخاصة لتكون بمثابة قاعدة معرفية. سنقوم بعد ذلك بإجراء استعلامات على الخادم، وإنشاء تطبيق RAG كامل.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">إعداد البيئة<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>هناك العديد من الطرق لبدء تشغيل خادم Llama Stack، مثل <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">مكتبة</a> أو <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">بناء توزيع،</a> إلخ. لكل مكوّن في Llama Stack، يمكن أيضًا اختيار مزودين مختلفين. لذلك، هناك العديد من الطرق لبدء تشغيل خادم Llama Stack.</p>
<p>يستخدم هذا البرنامج التعليمي التكوين التالي كمثال لبدء تشغيل الخدمة. إذا كنت ترغب في بدء تشغيله بطريقة أخرى، يرجى الرجوع إلى <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">بدء تشغيل خادم Llama Stack</a>.</p>
<ul>
<li>نستخدم كوندا لبناء توزيع مخصص مع تكوين ميلفوس.</li>
<li>نستخدم <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a> كموفر LLM.</li>
<li>نستخدم الافتراضي <code translate="no">all-MiniLM-L6-v2</code> كنموذج التضمين.</li>
</ul>
<div class="alert note">
<p>يشير هذا البرنامج التعليمي بشكل أساسي إلى دليل التثبيت الرسمي <a href="https://llama-stack.readthedocs.io/en/latest/index.html">لوثائق Llama Stack</a>. إذا وجدت أي أجزاء قديمة في هذا البرنامج التعليمي، يمكنك إعطاء الأولوية لاتباع الدليل الرسمي وإنشاء مشكلة لنا.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">بدء تشغيل خادم لاما ستاك<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">إعداد البيئة</h3><p>نظرًا لأننا بحاجة إلى استخدام الذكاء الاصطناعي معًا كخدمة LLM، يجب علينا أولاً تسجيل الدخول إلى الموقع الرسمي لتقديم طلب للحصول على <a href="https://api.together.xyz/settings/api-keys">مفتاح API</a> وتعيين مفتاح API <code translate="no">TOGETHER_API_KEY</code> كمتغير بيئة.</p>
<p>استنساخ كود مصدر Llama Stack</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>إنشاء بيئة كوندا وتثبيت التبعيات</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>قم بتعديل المحتوى في <code translate="no">llama_stack/llama_stack/template/together/run.yaml</code> ، وتغيير قسم vector_io إلى تكوين ميلفوس ذي الصلة. على سبيل المثال، أضف:</p>
<pre><code translate="no" class="language-yaml">vector_io:
- provider_id: milvus
  provider_type: inline::milvus
  config:
    db_path: ~/.llama/distributions/together/milvus_store.db

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>في Llama Stack، يمكن تكوين Milvus بطريقتين: التكوين المحلي، وهو <code translate="no">inline::milvus</code> ، والتكوين عن بعد، وهو <code translate="no">remote::milvus</code>.</p>
<ul>
<li><p>أبسط طريقة هي التكوين المحلي، والتي تتطلب تعيين <code translate="no">db_path</code> ، وهو مسار لتخزين ملفات <a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a> محليًا.</p></li>
<li><p>التكوين عن بعد مناسب لتخزين البيانات الكبيرة.</p>
<ul>
<li>إذا كان لديك كمية كبيرة من البيانات، يمكنك إعداد خادم Milvus فعال على <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>. في هذا الإعداد، يرجى استخدام URI الخادم URI، على سبيل المثال، <code translate="no">http://localhost:19530</code> ، كـ <code translate="no">uri</code>. الافتراضي <code translate="no">token</code> هو <code translate="no">root:Milvus</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، فاضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> في Zilliz Cloud.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">بناء التوزيع من القالب</h3><p>قم بتشغيل الأمر التالي لبناء التوزيع:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-<span class="hljs-built_in">type</span> conda
<button class="copy-code-btn"></button></code></pre>
<p>سيتم إنشاء ملف على <code translate="no">~/.llama/distributions/together/together-run.yaml</code>. بعد ذلك، قم بتشغيل هذا الأمر لبدء تشغيل الخادم:</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~<span class="hljs-regexp">/.llama/</span>distributions/together/together-run.<span class="hljs-property">yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>إذا سار كل شيء بسلاسة، يجب أن ترى خادم Llama Stack يعمل بنجاح على المنفذ 8321.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">تنفيذ RAG من العميل<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد بدء تشغيل الخادم، يمكنك كتابة كود العميل للوصول إليه. إليك عينة من الشيفرة البرمجية:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">from</span> llama_stack_client.types <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> llama_stack_client.lib.agents.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> llama_stack_client.types.agent_create_params <span class="hljs-keyword">import</span> AgentConfig

<span class="hljs-comment"># See https://www.together.ai/models for all available models</span>
INFERENCE_MODEL = <span class="hljs-string">&quot;meta-llama/Llama-3.3-70B-Instruct-Turbo&quot;</span>
LLAMA_STACK_PORT = <span class="hljs-number">8321</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_http_client</span>():
    <span class="hljs-keyword">from</span> llama_stack_client <span class="hljs-keyword">import</span> LlamaStackClient

    <span class="hljs-keyword">return</span> LlamaStackClient(
        base_url=<span class="hljs-string">f&quot;http://localhost:<span class="hljs-subst">{LLAMA_STACK_PORT}</span>&quot;</span>  <span class="hljs-comment"># Your Llama Stack Server URL</span>
    )


client = create_http_client()

<span class="hljs-comment"># Documents to be used for RAG</span>
urls = [<span class="hljs-string">&quot;chat.rst&quot;</span>, <span class="hljs-string">&quot;llama3.rst&quot;</span>, <span class="hljs-string">&quot;memory_optimizations.rst&quot;</span>, <span class="hljs-string">&quot;lora_finetune.rst&quot;</span>]
documents = [
    Document(
        document_id=<span class="hljs-string">f&quot;num-<span class="hljs-subst">{i}</span>&quot;</span>,
        content=<span class="hljs-string">f&quot;https://raw.githubusercontent.com/pytorch/torchtune/main/docs/source/tutorials/<span class="hljs-subst">{url}</span>&quot;</span>,
        mime_type=<span class="hljs-string">&quot;text/plain&quot;</span>,
        metadata={},
    )
    <span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(urls)
]

<span class="hljs-comment"># Register a vector database</span>
vector_db_id = <span class="hljs-string">f&quot;test-vector-db-<span class="hljs-subst">{uuid.uuid4().<span class="hljs-built_in">hex</span>}</span>&quot;</span>
client.vector_dbs.register(
    vector_db_id=vector_db_id,
    embedding_model=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>,
    embedding_dimension=<span class="hljs-number">384</span>,
    provider_id=<span class="hljs-string">&quot;milvus&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inserting...&quot;</span>)
<span class="hljs-comment"># Insert the documents into the vector database</span>
client.tool_runtime.rag_tool.insert(
    documents=documents, vector_db_id=vector_db_id, chunk_size_in_tokens=<span class="hljs-number">1024</span>,
)

agent_config = AgentConfig(
    model=INFERENCE_MODEL,
    <span class="hljs-comment"># Define instructions for the agent ( aka system prompt)</span>
    instructions=<span class="hljs-string">&quot;You are a helpful assistant&quot;</span>,
    enable_session_persistence=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># Define tools available to the agent</span>
    toolgroups=[{<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;builtin::rag&quot;</span>, <span class="hljs-string">&quot;args&quot;</span>: {<span class="hljs-string">&quot;vector_db_ids&quot;</span>: [vector_db_id]}}],
)

rag_agent = Agent(client, agent_config)
session_id = rag_agent.create_session(<span class="hljs-string">&quot;test-session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;finish init agent...&quot;</span>)
user_prompt = (
    <span class="hljs-string">&quot;What are the top 5 topics that were explained? Only list succinct bullet points.&quot;</span>
)

<span class="hljs-comment"># Get the final answer from the agent</span>
response = rag_agent.create_turn(
    messages=[{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt}],
    session_id=session_id,
    stream=<span class="hljs-literal">False</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Response: &quot;</span>)
<span class="hljs-built_in">print</span>(response.output_message.content)
<button class="copy-code-btn"></button></code></pre>
<p>قم بتشغيل هذا الرمز لتنفيذ استعلام RAG. إذا كان كل شيء يعمل بشكل صحيح، يجب أن يبدو الإخراج هكذا:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI&#x27;s Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
<button class="copy-code-btn"></button></code></pre>
