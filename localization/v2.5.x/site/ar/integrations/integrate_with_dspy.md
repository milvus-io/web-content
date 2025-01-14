---
id: integrate_with_dspy.md
summary: >-
  يوضّح هذا الدليل كيفية استخدام MilvusRM، وهي إحدى وحدات مسترجع DSPy، لتحسين
  برامج RAG.
title: دمج ميلفوس مع DSPy
---
<h1 id="Integrate-Milvus-with-DSPy" class="common-anchor-header">دمج ميلفوس مع DSPy<button data-href="#Integrate-Milvus-with-DSPy" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="What-is-DSPy" class="common-anchor-header">ما هو DSPy<button data-href="#What-is-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>يُعدّ DSPy، الذي قدمته مجموعة ستانفورد للبرمجة اللغوية العصبية (NLP)، إطار عمل برمجي رائد مصمم لتحسين المطالبات والأوزان داخل النماذج اللغوية، وهو ذو قيمة خاصة في السيناريوهات التي يتم فيها دمج نماذج لغوية كبيرة (LLMs) عبر مراحل متعددة من خط الأنابيب. على عكس تقنيات هندسة المطالبة التقليدية التي تعتمد على الصياغة اليدوية والتعديل، تتبنى DSPy نهجًا قائمًا على التعلم. ومن خلال استيعاب أمثلة الأسئلة والأجوبة، يقوم DSPy بإنشاء مطالبات محسّنة ديناميكيًا ومصممة خصيصًا لمهام محددة. تتيح هذه المنهجية المبتكرة إعادة التجميع السلس لخطوط الأنابيب بأكملها، مما يلغي الحاجة إلى إجراء تعديلات يدوية مستمرة على المطالبات. يوفر بناء الجملة البيثوني في DSPy العديد من الوحدات القابلة للتركيب والتعريف، مما يبسط من تعليمات LLMs.</p>
<h2 id="Benefits-of-using-DSPy" class="common-anchor-header">فوائد استخدام DSPy<button data-href="#Benefits-of-using-DSPy" class="anchor-icon" translate="no">
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
<li>نهج البرمجة: يوفر DSPy نهج برمجة منهجي لتطوير خطوط أنابيب LLM من خلال تجريد خطوط الأنابيب كرسوم بيانية لتحويل النصوص بدلاً من مجرد المطالبة فقط بآليات LLM. تتيح وحداته التوضيحية تصميمًا منظمًا وتحسينًا منظمًا، لتحل محل طريقة التجربة والخطأ في قوالب المطالبة التقليدية.</li>
<li>تحسين الأداء: يُظهر DSPy مكاسب كبيرة في الأداء مقارنةً بالطرق الحالية. ومن خلال دراسات الحالة، يتفوق على نماذج المطالبة القياسية والعروض التوضيحية التي أنشأها الخبراء، مما يُظهر تعدد استخداماته وفعاليته حتى عند تجميعها في نماذج LM أصغر.</li>
<li>التجريد المعياري: يُلخص DSPy بفعالية الجوانب المعقدة لتطوير خط أنابيب LM، مثل التحلل والضبط الدقيق واختيار النموذج. وباستخدام DSPy، يمكن ترجمة برنامج موجز بسلاسة إلى تعليمات لنماذج مختلفة، مثل GPT-4 أو Llama2-13b أو T5-base، مما يسهل عملية التطوير ويعزز الأداء.</li>
</ul>
<h2 id="Modules" class="common-anchor-header">الوحدات النمطية<button data-href="#Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>هناك العديد من المكونات التي تساهم في بناء خط أنابيب LLM. سنقوم هنا بوصف بعض المكونات الرئيسية لتوفير فهم عالي المستوى لكيفية عمل DSPy.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dspy-01.png" alt="DSPy Modules" class="doc-image" id="dspy-modules" />
   </span> <span class="img-wrapper"> <span>وحدات DSPy</span> </span></p>
<p>التوقيع: تعمل التواقيع في DSPy كمواصفات تعريفية، تحدد سلوك المدخلات/المخرجات للوحدات النمطية، وتوجه نموذج اللغة في تنفيذ المهام. الوحدة النمطية: تعمل وحدات DSPy كمكونات أساسية للبرامج التي تستفيد من نماذج اللغة (LMs). فهي تستخلص تقنيات التوجيه المختلفة، مثل سلسلة الأفكار أو ReAct، وهي قابلة للتكيف للتعامل مع أي توقيع DSPy. وبفضل المعلمات القابلة للتعلم والقدرة على معالجة المدخلات وإنتاج المخرجات، يمكن دمج هذه الوحدات لتشكيل برامج أكبر، مستوحاة من وحدات الشبكة العصبية في PyTorch ولكنها مصممة خصيصًا لتطبيقات LM. المُحسِّن: تعمل المحسّنات في DSPy على ضبط معلمات برامج DSPy، مثل المطالبات وأوزان LLM، لزيادة المقاييس المحددة مثل الدقة إلى أقصى حد، مما يعزز كفاءة البرنامج.</p>
<h2 id="Why-Milvus-in-DSPy" class="common-anchor-header">لماذا ميلفوس في DSPy<button data-href="#Why-Milvus-in-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy هو إطار برمجة قوي يعزز تطبيقات RAG. يحتاج مثل هذا التطبيق إلى استرداد معلومات مفيدة لتحسين جودة الإجابة، وهو ما يحتاج إلى قاعدة بيانات متجهة. Milvus هي قاعدة بيانات متجهية معروفة مفتوحة المصدر لتحسين الأداء وقابلية التوسع. مع MilvusRM، وهي وحدة استرجاع في DSPy، يصبح دمج Milvus سلسًا. والآن، يمكن للمطورين تحديد برامج RAG وتحسينها بسهولة باستخدام DSPy، مستفيدين من قدرات البحث المتجهية القوية التي تتمتع بها Milvus. هذا التعاون يجعل تطبيقات RAG أكثر كفاءة وقابلية للتطوير، حيث يجمع بين قدرات البرمجة في DSPy وميزات البحث في Milvus.</p>
<h2 id="Examples" class="common-anchor-header">أمثلة<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>والآن، لنستعرض مثالاً سريعًا لتوضيح كيفية الاستفادة من Milvus في DSPy لتحسين تطبيق RAG.</p>
<h3 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية</h3><p>قبل إنشاء تطبيق RAG، قم بتثبيت DSPy و PyMilvus.</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;dspy-ai[milvus]&quot;</span>
$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى **إعادة تشغيل وقت التشغيل** (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</div>
<h3 id="Loading-the-dataset" class="common-anchor-header">تحميل مجموعة البيانات</h3><p>في هذا المثال، نستخدم HotPotQA، وهي مجموعة من أزواج الأسئلة والأجوبة المعقدة، كمجموعة بيانات التدريب الخاصة بنا. يمكننا تحميلها من خلال فئة HotPotQA.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

<span class="hljs-comment"># Load the dataset.</span>
dataset = HotPotQA(
    train_seed=<span class="hljs-number">1</span>, train_size=<span class="hljs-number">20</span>, eval_seed=<span class="hljs-number">2023</span>, dev_size=<span class="hljs-number">50</span>, test_size=<span class="hljs-number">0</span>
)

<span class="hljs-comment"># Tell DSPy that the &#x27;question&#x27; field is the input. Any other fields are labels and/or metadata.</span>
trainset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.train]
devset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.dev]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Ingest-data-into-the-Milvus-vector-database" class="common-anchor-header">إدخال البيانات في قاعدة بيانات ميلفوس المتجهة</h3><p>أدخل معلومات السياق في مجموعة Milvus لاسترجاع المتجهات. يجب أن تحتوي هذه المجموعة على حقل <code translate="no">embedding</code> وحقل <code translate="no">text</code>. نستخدم نموذج OpenAI <code translate="no">text-embedding-3-small</code> الخاص بـ OpenAI كوظيفة تضمين الاستعلام الافتراضية في هذه الحالة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&lt;YOUR_OPENAI_API_KEY&gt;&quot;</span>
MILVUS_URI = <span class="hljs-string">&quot;example.db&quot;</span>
MILVUS_TOKEN = <span class="hljs-string">&quot;&quot;</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection
<span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> openai_embedding_function

client = MilvusClient(uri=MILVUS_URI, token=MILVUS_TOKEN)

<span class="hljs-keyword">if</span> <span class="hljs-string">&quot;dspy_example&quot;</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> client.list_collections():
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        overwrite=<span class="hljs-literal">True</span>,
        dimension=<span class="hljs-number">1536</span>,
        primary_field_name=<span class="hljs-string">&quot;id&quot;</span>,
        vector_field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_type=<span class="hljs-string">&quot;int&quot;</span>,
        metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
        max_length=<span class="hljs-number">65535</span>,
        enable_dynamic=<span class="hljs-literal">True</span>,
    )
text = requests.get(
    <span class="hljs-string">&quot;https://raw.githubusercontent.com/wxywb/dspy_dataset_sample/master/sample_data.txt&quot;</span>
).text

<span class="hljs-keyword">for</span> idx, passage <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(text.split(<span class="hljs-string">&quot;\n&quot;</span>)):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(passage) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">continue</span>
    client.insert(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        data=[
            {
                <span class="hljs-string">&quot;id&quot;</span>: idx,
                <span class="hljs-string">&quot;embedding&quot;</span>: openai_embedding_function(passage)[<span class="hljs-number">0</span>],
                <span class="hljs-string">&quot;text&quot;</span>: passage,
            }
        ],
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-MilvusRM" class="common-anchor-header">تعريف MilvusRM.</h3><p>الآن، تحتاج إلى تعريف MilvusRM.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> MilvusRM
<span class="hljs-keyword">import</span> dspy

retriever_model = MilvusRM(
    collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
    uri=MILVUS_URI,
    token=MILVUS_TOKEN,  <span class="hljs-comment"># ignore this if no token is required for Milvus connection</span>
    embedding_function=openai_embedding_function,
)
turbo = dspy.OpenAI(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
dspy.settings.configure(lm=turbo)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Building-signatures" class="common-anchor-header">بناء التواقيع</h3><p>الآن بعد أن قمنا بتحميل البيانات، دعنا نبدأ في تحديد التواقيع للمهام الفرعية لخط الأنابيب الخاص بنا. يمكننا تحديد المدخلات البسيطة <code translate="no">question</code> والمخرجات <code translate="no">answer</code> ، ولكن بما أننا نبني خط أنابيب RAG، سنقوم باسترداد المعلومات السياقية من Milvus. لذلك دعونا نحدد توقيعنا على أنه <code translate="no">context, question --&gt; answer</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GenerateAnswer</span>(dspy.Signature):
    <span class="hljs-string">&quot;&quot;&quot;Answer questions with short factoid answers.&quot;&quot;&quot;</span>

    context = dspy.InputField(desc=<span class="hljs-string">&quot;may contain relevant facts&quot;</span>)
    question = dspy.InputField()
    answer = dspy.OutputField(desc=<span class="hljs-string">&quot;often between 1 and 5 words&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>نقوم بتضمين أوصاف قصيرة للحقول <code translate="no">context</code> و <code translate="no">answer</code> لتحديد إرشادات أوضح حول ما سيتلقاه النموذج وما يجب أن يولده.</p>
<h3 id="Building-the-pipeline" class="common-anchor-header">بناء خط الأنابيب</h3><p>الآن، دعونا نحدد خط أنابيب RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>(dspy.Module):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rm</span>):
        <span class="hljs-built_in">super</span>().__init__()
        <span class="hljs-variable language_">self</span>.retrieve = rm

        <span class="hljs-comment"># This signature indicates the task imposed on the COT module.</span>
        <span class="hljs-variable language_">self</span>.generate_answer = dspy.ChainOfThought(GenerateAnswer)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">forward</span>(<span class="hljs-params">self, question</span>):
        <span class="hljs-comment"># Use milvus_rm to retrieve context for the question.</span>
        context = <span class="hljs-variable language_">self</span>.retrieve(question).passages
        <span class="hljs-comment"># COT module takes &quot;context, query&quot; and output &quot;answer&quot;.</span>
        prediction = <span class="hljs-variable language_">self</span>.generate_answer(context=context, question=question)
        <span class="hljs-keyword">return</span> dspy.Prediction(
            context=[item.long_text <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> context], answer=prediction.answer
        )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Executing-the-pipeline-and-getting-the-results" class="common-anchor-header">تنفيذ خط الأنابيب والحصول على النتائج</h3><p>الآن، قمنا ببناء خط أنابيب RAG. لنجربه ونحصل على النتائج.</p>
<pre><code translate="no" class="language-python">rag = RAG(retriever_model)
<span class="hljs-built_in">print</span>(rag(<span class="hljs-string">&quot;who write At My Window&quot;</span>).answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Townes Van Zandt
</code></pre>
<p>يمكننا تقييم النتائج الكمية على مجموعة البيانات.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.evaluate.evaluate <span class="hljs-keyword">import</span> Evaluate
<span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

evaluate_on_hotpotqa = Evaluate(
    devset=devset, num_threads=<span class="hljs-number">1</span>, display_progress=<span class="hljs-literal">False</span>, display_table=<span class="hljs-number">5</span>
)

metric = dspy.evaluate.answer_exact_match
score = evaluate_on_hotpotqa(rag, metric=metric)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optimizing-the-pipeline" class="common-anchor-header">تحسين خط الأنابيب</h3><p>بعد تحديد هذا البرنامج، الخطوة التالية هي التجميع. تقوم هذه العملية بتحديث المعلمات داخل كل وحدة نمطية لتحسين الأداء. تعتمد عملية التجميع على ثلاثة عوامل حاسمة:</p>
<ul>
<li>مجموعة التدريب: سنستخدم أمثلة الأسئلة والأجوبة الـ 20 من مجموعة بيانات التدريب لهذا العرض التوضيحي.</li>
<li>مقياس التحقق من الصحة: سنقوم بإنشاء مقياس <code translate="no">validate_context_and_answer</code> بسيط. يتحقق هذا المقياس من دقة الإجابة المتوقعة ويضمن أن السياق المسترجع يتضمن الإجابة.</li>
<li>المحسِّن المحدد (المحسِّن عن بُعد): يشتمل المحول البرمجي في DSPy على العديد من المحسنات عن بُعد المصممة لتحسين برامجك بفعالية.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.teleprompt <span class="hljs-keyword">import</span> BootstrapFewShot

<span class="hljs-comment"># Validation logic: check that the predicted answer is correct.# Also check that the retrieved context does contain that answer.</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">validate_context_and_answer</span>(<span class="hljs-params">example, pred, trace=<span class="hljs-literal">None</span></span>):
    answer_EM = dspy.evaluate.answer_exact_match(example, pred)
    answer_PM = dspy.evaluate.answer_passage_match(example, pred)
    <span class="hljs-keyword">return</span> answer_EM <span class="hljs-keyword">and</span> answer_PM


<span class="hljs-comment"># Set up a basic teleprompter, which will compile our RAG program.</span>
teleprompter = BootstrapFewShot(metric=validate_context_and_answer)

<span class="hljs-comment"># Compile!</span>
compiled_rag = teleprompter.<span class="hljs-built_in">compile</span>(rag, trainset=trainset)

<span class="hljs-comment"># Now compiled_rag is optimized and ready to answer your new question!</span>
<span class="hljs-comment"># Now, let’s evaluate the compiled RAG program.</span>
score = evaluate_on_hotpotqa(compiled_rag, metric=metric)
<span class="hljs-built_in">print</span>(score)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;compile_rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<p>وقد زادت درجة Ragas من قيمتها السابقة 50.0 إلى 52.0، مما يشير إلى تحسن في جودة الإجابة.</p>
<h2 id="Summary" class="common-anchor-header">ملخص<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>يمثل DSPy قفزة في تفاعلات النموذج اللغوي من خلال واجهته القابلة للبرمجة، والتي تسهل التحسين الخوارزمي والآلي لمطالبات النموذج وأوزانه. ومن خلال الاستفادة من DSPy لتنفيذ RAG، تصبح القدرة على التكيف مع نماذج اللغة أو مجموعات البيانات المختلفة أمرًا سهلاً، مما يقلل بشكل كبير من الحاجة إلى التدخلات اليدوية المملة.</p>
