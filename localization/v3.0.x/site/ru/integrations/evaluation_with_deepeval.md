---
id: evaluation_with_deepeval.md
summary: >-
  В этом руководстве показано, как использовать DeepEval для оценки конвейера
  Retrieval-Augmented Generation (RAG), построенного на базе Milvus.
title: Оценка с помощью DeepEval
---
<h1 id="Evaluation-with-DeepEval" class="common-anchor-header">Оценка с помощью DeepEval<button data-href="#Evaluation-with-DeepEval" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/evaluation_with_deepeval.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/evaluation_with_deepeval.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Это руководство демонстрирует, как использовать <a href="https://docs.confident-ai.com/">DeepEval</a> для оценки конвейера Retrieval-Augmented Generation (RAG), построенного на базе <a href="https://milvus.io/">Milvus</a>.</p>
<p>Система RAG объединяет поисковую систему с генеративной моделью для создания нового текста на основе заданного запроса. Сначала система извлекает релевантные документы из корпуса с помощью Milvus, а затем использует генеративную модель для создания нового текста на основе извлеченных документов.</p>
<p>DeepEval - это фреймворк, который помогает оценивать конвейеры RAG. Существуют инструменты и фреймворки, которые помогают создавать такие конвейеры, но оценить их и определить количественную производительность может быть непросто. Именно здесь на помощь приходит DeepEval.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Прежде чем запускать этот блокнот, убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade pymilvus milvus-lite openai requests tqdm pandas deepeval
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, то для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<p>В этом примере мы будем использовать OpenAI в качестве LLM. Вам следует подготовить <a href="https://platform.openai.com/docs/quickstart">api ключ</a> <code translate="no">OPENAI_API_KEY</code> в качестве переменной окружения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-RAG-pipeline" class="common-anchor-header">Определение конвейера RAG<button data-href="#Define-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Мы определим класс RAG, использующий Milvus в качестве векторного хранилища и OpenAI в качестве LLM. Класс содержит метод <code translate="no">load</code>, который загружает текстовые данные в Milvus, метод <code translate="no">retrieve</code>, который извлекает наиболее похожие на заданный вопрос текстовые данные, и метод <code translate="no">answer</code>, который отвечает на заданный вопрос с помощью извлеченных знаний.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


<span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>:
    <span class="hljs-string">&quot;&quot;&quot;
    RAG(Retrieval-Augmented Generation) class built upon OpenAI and Milvus.
    &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, openai_client: OpenAI, milvus_client: MilvusClient</span>):
        <span class="hljs-variable language_">self</span>._prepare_openai(openai_client)
        <span class="hljs-variable language_">self</span>._prepare_milvus(milvus_client)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_emb_text</span>(<span class="hljs-params">self, text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]:
        <span class="hljs-keyword">return</span> (
            <span class="hljs-variable language_">self</span>.openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-variable language_">self</span>.embedding_model)
            .data[<span class="hljs-number">0</span>]
            .embedding
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_prepare_openai</span>(<span class="hljs-params">
        self,
        openai_client: OpenAI,
        embedding_model: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
        llm_model: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    </span>):
        <span class="hljs-variable language_">self</span>.openai_client = openai_client
        <span class="hljs-variable language_">self</span>.embedding_model = embedding_model
        <span class="hljs-variable language_">self</span>.llm_model = llm_model
        <span class="hljs-variable language_">self</span>.SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
            Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
        &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.USER_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
            Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
            &lt;context&gt;
            {context}
            &lt;/context&gt;
            &lt;question&gt;
            {question}
            &lt;/question&gt;
        &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_prepare_milvus</span>(<span class="hljs-params">
        self, milvus_client: MilvusClient, collection_name: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;rag_collection&quot;</span>
    </span>):
        <span class="hljs-variable language_">self</span>.milvus_client = milvus_client
        <span class="hljs-variable language_">self</span>.collection_name = collection_name
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.milvus_client.has_collection(<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.milvus_client.drop_collection(<span class="hljs-variable language_">self</span>.collection_name)
        embedding_dim = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._emb_text(<span class="hljs-string">&quot;demo&quot;</span>))
        <span class="hljs-variable language_">self</span>.milvus_client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            dimension=embedding_dim,
            metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
            consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/tune_consistency.md#Consistency-Level for more details.</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">load</span>(<span class="hljs-params">self, texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        <span class="hljs-string">&quot;&quot;&quot;
        Load the text data into Milvus.
        &quot;&quot;&quot;</span>
        data = []
        <span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(texts, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
            data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: <span class="hljs-variable language_">self</span>._emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})
        <span class="hljs-variable language_">self</span>.milvus_client.insert(collection_name=<span class="hljs-variable language_">self</span>.collection_name, data=data)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve</span>(<span class="hljs-params">self, question: <span class="hljs-built_in">str</span>, top_k: <span class="hljs-built_in">int</span> = <span class="hljs-number">3</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]:
        <span class="hljs-string">&quot;&quot;&quot;
        Retrieve the most similar text data to the given question.
        &quot;&quot;&quot;</span>
        search_res = <span class="hljs-variable language_">self</span>.milvus_client.search(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            data=[<span class="hljs-variable language_">self</span>._emb_text(question)],
            limit=top_k,
            search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># inner product distance</span>
            output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
        )
        retrieved_texts = [res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
        <span class="hljs-keyword">return</span> retrieved_texts[:top_k]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">answer</span>(<span class="hljs-params">
        self,
        question: <span class="hljs-built_in">str</span>,
        retrieval_top_k: <span class="hljs-built_in">int</span> = <span class="hljs-number">3</span>,
        return_retrieved_text: <span class="hljs-built_in">bool</span> = <span class="hljs-literal">False</span>,
    </span>):
        <span class="hljs-string">&quot;&quot;&quot;
        Answer the given question with the retrieved knowledge.
        &quot;&quot;&quot;</span>
        retrieved_texts = <span class="hljs-variable language_">self</span>.retrieve(question, top_k=retrieval_top_k)
        user_prompt = <span class="hljs-variable language_">self</span>.USER_PROMPT.<span class="hljs-built_in">format</span>(
            context=<span class="hljs-string">&quot;\n&quot;</span>.join(retrieved_texts), question=question
        )
        response = <span class="hljs-variable language_">self</span>.openai_client.chat.completions.create(
            model=<span class="hljs-variable language_">self</span>.llm_model,
            messages=[
                {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-variable language_">self</span>.SYSTEM_PROMPT},
                {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
            ],
        )
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> return_retrieved_text:
            <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content, retrieved_texts
<button class="copy-code-btn"></button></code></pre>
<p>Инициализируем класс RAG с клиентами OpenAI и Milvus.</p>
<pre><code translate="no" class="language-python">openai_client = OpenAI()
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

my_rag = RAG(openai_client=openai_client, milvus_client=milvus_client)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Что касается аргумента <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Установка <code translate="no">uri</code> в качестве локального файла, например,<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubernetes</a>. В этом случае используйте ури сервера, например<code translate="no">http://localhost:19530</code>, в качестве <code translate="no">uri</code>.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, измените <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу Api</a> в Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Run-the-RAG-pipeline-and-get-results" class="common-anchor-header">Запустите конвейер RAG и получите результаты<button data-href="#Run-the-RAG-pipeline-and-get-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Мы используем <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">руководство по разработке Milvus</a> в качестве приватного знания в нашем RAG, которое является хорошим источником данных для простого конвейера RAG.</p>
<p>Скачайте его и загрузите в конвейер RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> urllib.request
<span class="hljs-keyword">import</span> os

url = <span class="hljs-string">&quot;https://raw.githubusercontent.com/milvus-io/milvus/master/DEVELOPMENT.md&quot;</span>
file_path = <span class="hljs-string">&quot;./Milvus_DEVELOPMENT.md&quot;</span>

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(file_path):
    urllib.request.urlretrieve(url, file_path)
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
    file_text = file.read()

text_lines = file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
my_rag.load(text_lines)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 47/47 [00:20&lt;00:00,  2.26it/s]
</code></pre>
<p>Определим вопрос запроса о содержании документации руководства по разработке. А затем воспользуемся методом <code translate="no">answer</code>, чтобы получить ответ и извлеченные контекстные тексты.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>
my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">('The hardware requirements specification to build and run Milvus from source code is as follows:\n\n- 8GB of RAM\n- 50GB of free disk space',
 ['Hardware Requirements\n\nThe following specification (either physical or virtual machine resources) is recommended for Milvus to build and run from source code.\n\n```\n- 8GB of RAM\n- 50GB of free disk space\n```\n\n##',
  'Building Milvus on a local OS/shell environment\n\nThe details below outline the hardware and software requirements for building on Linux and MacOS.\n\n##',
  &quot;Software Requirements\n\nAll Linux distributions are available for Milvus development. However a majority of our contributor worked with Ubuntu or CentOS systems, with a small portion of Mac (both x86_64 and Apple Silicon) contributors. If you would like Milvus to build and run on other distributions, you are more than welcome to file an issue and contribute!\n\nHere's a list of verified OS types where Milvus can successfully build and run:\n\n- Debian/Ubuntu\n- Amazon Linux\n- MacOS (x86_64)\n- MacOS (Apple Silicon)\n\n##&quot;])
</code></pre>
<p>Теперь подготовим несколько вопросов с соответствующими им ответами. Мы получим ответы и контексты из нашего конвейера RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> Dataset
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

question_list = [
    <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>,
    <span class="hljs-string">&quot;What is the programming language used to write Knowhere?&quot;</span>,
    <span class="hljs-string">&quot;What should be ensured before running code coverage?&quot;</span>,
]
ground_truth_list = [
    <span class="hljs-string">&quot;If you want to build Milvus and run from source code, the recommended hardware requirements specification is:\n\n- 8GB of RAM\n- 50GB of free disk space.&quot;</span>,
    <span class="hljs-string">&quot;The programming language used to write Knowhere is C++.&quot;</span>,
    <span class="hljs-string">&quot;Before running code coverage, you should make sure that your code changes are covered by unit tests.&quot;</span>,
]
contexts_list = []
answer_list = []
<span class="hljs-keyword">for</span> question <span class="hljs-keyword">in</span> tqdm(question_list, desc=<span class="hljs-string">&quot;Answering questions&quot;</span>):
    answer, contexts = my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
    contexts_list.append(contexts)
    answer_list.append(answer)

df = pd.DataFrame(
    {
        <span class="hljs-string">&quot;question&quot;</span>: question_list,
        <span class="hljs-string">&quot;contexts&quot;</span>: contexts_list,
        <span class="hljs-string">&quot;answer&quot;</span>: answer_list,
        <span class="hljs-string">&quot;ground_truth&quot;</span>: ground_truth_list,
    }
)
rag_results = Dataset.from_pandas(df)
df
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">/Users/eureka/miniconda3/envs/zilliz/lib/python3.9/site-packages/tqdm/auto.py:21: TqdmWarning: IProgress not found. Please update jupyter and ipywidgets. See https://ipywidgets.readthedocs.io/en/stable/user_install.html
  from .autonotebook import tqdm as notebook_tqdm
Answering questions: 100%|██████████| 3/3 [00:03&lt;00:00,  1.06s/it]
</code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>вопрос</th>
      <th>контексты</th>
      <th>ответ</th>
      <th>обоснованная_истина</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Что такое спецификация требований к оборудованию...</td>
      <td>[Требования к аппаратному обеспечению\n\nСледующая специф...</td>
      <td>Спецификация требований к аппаратному обеспечению для бу...</td>
      <td>Если вы хотите собрать Milvus и запустить его из источн...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Какой язык программирования используется для написа...</td>
      <td>[CMake &amp; Conan\n\nБиблиотека алгоритмов Mil...</td>
      <td>Язык программирования, используемый для написания Knowher...</td>
      <td>Язык программирования, используемый для написания Knowher...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Что необходимо убедиться перед запуском кода, покрыв...</td>
      <td>[Покрытие кода\n\nПеред отправкой вашего pull ...</td>
      <td>Перед запуском покрытия кода следует убедиться, что...</td>
      <td>Перед выполнением покрытия кода, вы должны сделать ...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Evaluating-Retriever" class="common-anchor-header">Оценка ретривера<button data-href="#Evaluating-Retriever" class="anchor-icon" translate="no">
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
    </button></h2><p>При оценке ретривера в системах с большими языковыми моделями (LLM) очень важно оценить следующее:</p>
<ol>
<li><p><strong>Релевантность ранжирования</strong>: Насколько эффективно ретривер отдает предпочтение релевантной информации перед нерелевантной.</p></li>
<li><p><strong>Контекстный поиск</strong>: Способность улавливать и извлекать контекстуально релевантную информацию на основе входных данных.</p></li>
<li><p><strong>Баланс</strong>: Насколько хорошо ретривер управляет размером текстового фрагмента и объемом поиска, чтобы свести к минимуму нерелевантность.</p></li>
</ol>
<p>В совокупности эти факторы дают полное представление о том, как ретривер расставляет приоритеты, захватывает и представляет наиболее полезную информацию.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> deepeval.metrics <span class="hljs-keyword">import</span> (
    ContextualPrecisionMetric,
    ContextualRecallMetric,
    ContextualRelevancyMetric,
)
<span class="hljs-keyword">from</span> deepeval.test_case <span class="hljs-keyword">import</span> LLMTestCase
<span class="hljs-keyword">from</span> deepeval <span class="hljs-keyword">import</span> evaluate

contextual_precision = ContextualPrecisionMetric()
contextual_recall = ContextualRecallMetric()
contextual_relevancy = ContextualRelevancyMetric()

test_cases = []

<span class="hljs-keyword">for</span> index, row <span class="hljs-keyword">in</span> df.iterrows():
    test_case = LLMTestCase(
        <span class="hljs-built_in">input</span>=row[<span class="hljs-string">&quot;question&quot;</span>],
        actual_output=row[<span class="hljs-string">&quot;answer&quot;</span>],
        expected_output=row[<span class="hljs-string">&quot;ground_truth&quot;</span>],
        retrieval_context=row[<span class="hljs-string">&quot;contexts&quot;</span>],
    )
    test_cases.append(test_case)

<span class="hljs-comment"># test_cases</span>
result = evaluate(
    test_cases=test_cases,
    metrics=[contextual_precision, contextual_recall, contextual_relevancy],
    print_results=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Change to True to see detailed metric results</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">/Users/eureka/miniconda3/envs/zilliz/lib/python3.9/site-packages/deepeval/__init__.py:49: UserWarning: You are using deepeval version 1.1.6, however version 1.2.2 is available. You should consider upgrading via the &quot;pip install --upgrade deepeval&quot; command.
  warnings.warn(
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Вы используете новейшую <span style="color: #6a00ff; text-decoration-color: #6a00ff">метрику контекстной точности</span> DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">используется gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Вы используете последнюю версию <span style="color: #6a00ff; text-decoration-color: #6a00ff">метрики Contextual Recall</span> от DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">использование gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Вы выполняете последнюю метрику <span style="color: #6a00ff; text-decoration-color: #6a00ff">контекстной релевантности</span> DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">использование gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre><code translate="no">Event loop is already running. Applying nest_asyncio patch to allow async execution...


Evaluating 3 test case(s) in parallel: |██████████|100% (3/3) [Time Taken: 00:11,  3.91s/test case]
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #05f58d; text-decoration-color: #05f58d">✓</span> Тесты завершены 🎉! Запустите <span style="color: #008000; text-decoration-color: #008000">'deepeval login'</span> для просмотра результатов оценки на Confident AI. 
‼️ ПРИМЕЧАНИЕ: Вы также можете запустить оценку ВСЕХ метрик deepeval непосредственно на Confident AI.</pre>
<h2 id="Evaluating-Generation" class="common-anchor-header">Оценка генерации<button data-href="#Evaluating-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы оценить качество генерируемых результатов в больших языковых моделях (LLM), важно сосредоточиться на двух ключевых аспектах:</p>
<ol>
<li><p><strong>Релевантность</strong>: Оцените, насколько эффективно подсказка направляет LLM на генерацию полезных и контекстуально подходящих ответов.</p></li>
<li><p><strong>Верность</strong>: Измерьте точность результатов, чтобы убедиться, что модель выдает информацию, которая соответствует фактам и не содержит галлюцинаций или противоречий. Генерируемый контент должен соответствовать фактической информации, представленной в контексте поиска.</p></li>
</ol>
<p>Эти факторы в совокупности обеспечивают актуальность и надежность результатов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> deepeval.metrics <span class="hljs-keyword">import</span> AnswerRelevancyMetric, FaithfulnessMetric
<span class="hljs-keyword">from</span> deepeval.test_case <span class="hljs-keyword">import</span> LLMTestCase
<span class="hljs-keyword">from</span> deepeval <span class="hljs-keyword">import</span> evaluate

answer_relevancy = AnswerRelevancyMetric()
faithfulness = FaithfulnessMetric()

test_cases = []

<span class="hljs-keyword">for</span> index, row <span class="hljs-keyword">in</span> df.iterrows():
    test_case = LLMTestCase(
        <span class="hljs-built_in">input</span>=row[<span class="hljs-string">&quot;question&quot;</span>],
        actual_output=row[<span class="hljs-string">&quot;answer&quot;</span>],
        expected_output=row[<span class="hljs-string">&quot;ground_truth&quot;</span>],
        retrieval_context=row[<span class="hljs-string">&quot;contexts&quot;</span>],
    )
    test_cases.append(test_case)

<span class="hljs-comment"># test_cases</span>
result = evaluate(
    test_cases=test_cases,
    metrics=[answer_relevancy, faithfulness],
    print_results=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Change to True to see detailed metric results</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Вы используете новейшую <span style="color: #6a00ff; text-decoration-color: #6a00ff">метрику релевантности ответов</span> DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">использование gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Вы запускаете последнюю <span style="color: #6a00ff; text-decoration-color: #6a00ff">метрику верности ответов</span> DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">использование gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre><code translate="no">Event loop is already running. Applying nest_asyncio patch to allow async execution...


Evaluating 3 test case(s) in parallel: |██████████|100% (3/3) [Time Taken: 00:11,  3.97s/test case]
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #05f58d; text-decoration-color: #05f58d">✓</span> Тесты завершены 🎉! Запустите <span style="color: #008000; text-decoration-color: #008000">'deepeval login'</span> для просмотра результатов оценки на Confident AI. 
‼️ ПРИМЕЧАНИЕ: Вы также можете запустить оценку ВСЕХ метрик deepeval непосредственно на Confident AI.</pre>
