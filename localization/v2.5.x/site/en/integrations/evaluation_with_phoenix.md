---
id: evaluation_with_phoenix.md
summary: >-
  This guide demonstrates how to use Arize Pheonix to evaluate a
  Retrieval-Augmented Generation (RAG) pipeline built upon Milvus.
title: Evaluation with Arize Pheonix
---
<h1 id="Evaluation-with-Arize-Pheonix" class="common-anchor-header">Evaluation with Arize Pheonix<button data-href="#Evaluation-with-Arize-Pheonix" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/evaluation_with_phoenix.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/evaluation_with_phoenix.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>This guide demonstrates how to use <a href="https://phoenix.arize.com/">Arize Pheonix</a> to evaluate a Retrieval-Augmented Generation (RAG) pipeline built upon <a href="https://milvus.io/">Milvus</a>.</p>
<p>The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using Milvus, and then uses a generative model to generate new text based on the retrieved documents.</p>
<p>Arize Pheonix is a framework that helps you evaluate your RAG pipelines. There are existing tools and frameworks that help you build these pipelines but evaluating it and quantifying your pipeline performance can be hard. This is where Arize Pheonix comes in.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before running this notebook, make sure you have the following dependencies installed:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade pymilvus openai requests tqdm pandas <span class="hljs-string">&quot;arize-phoenix&gt;=4.29.0&quot;</span> nest_asyncio
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</div>
<p>We will use OpenAI as the LLM in this example. You should prepare the <a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> as an environment variable.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-comment"># os.environ[&quot;OPENAI_API_KEY&quot;] = &quot;sk-*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-RAG-pipeline" class="common-anchor-header">Define the RAG pipeline<button data-href="#Define-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>We will define the RAG class that use Milvus as the vector store, and OpenAI as the LLM.
The class contains the <code translate="no">load</code> method, which loads the text data into Milvus, the <code translate="no">retrieve</code> method, which retrieves the most similar text data to the given question, and the <code translate="no">answer</code> method, which answers the given question with the retrieved knowledge.</p>
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
            consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
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
<p>Let’s initialize the RAG class with OpenAI and Milvus clients.</p>
<pre><code translate="no" class="language-python">openai_client = OpenAI()
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

my_rag = RAG(openai_client=openai_client, milvus_client=milvus_client)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>As for the argument of <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Setting the <code translate="no">uri</code> as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>If you have large scale of data, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">docker or kubernetes</a>. In this setup, please use the server uri, e.g.<code translate="no">http://localhost:19530</code>, as your <code translate="no">uri</code>.</li>
<li>If you want to use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and Api key</a> in Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Run-the-RAG-pipeline-and-get-results" class="common-anchor-header">Run the RAG pipeline and get results<button data-href="#Run-the-RAG-pipeline-and-get-results" class="anchor-icon" translate="no">
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
    </button></h2><p>We use the <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">Milvus development guide</a> to be as the private knowledge in our RAG, which is a good data source for a simple RAG pipeline.</p>
<p>Download it and load it into the rag pipeline.</p>
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
<pre><code translate="no">Creating embeddings: 100%|██████████| 47/47 [00:12&lt;00:00,  3.84it/s]
</code></pre>
<p>Let’s define a query question about the content of the development guide documentation. And then use the <code translate="no">answer</code> method to get the answer and the retrieved context texts.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>
my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">('The hardware requirements specification to build and run Milvus from source code are:\n\n- 8GB of RAM\n- 50GB of free disk space',
 ['Hardware Requirements\n\nThe following specification (either physical or virtual machine resources) is recommended for Milvus to build and run from source code.\n\n```\n- 8GB of RAM\n- 50GB of free disk space\n```\n\n##',
  'Building Milvus on a local OS/shell environment\n\nThe details below outline the hardware and software requirements for building on Linux and MacOS.\n\n##',
  &quot;Software Requirements\n\nAll Linux distributions are available for Milvus development. However a majority of our contributor worked with Ubuntu or CentOS systems, with a small portion of Mac (both x86_64 and Apple Silicon) contributors. If you would like Milvus to build and run on other distributions, you are more than welcome to file an issue and contribute!\n\nHere's a list of verified OS types where Milvus can successfully build and run:\n\n- Debian/Ubuntu\n- Amazon Linux\n- MacOS (x86_64)\n- MacOS (Apple Silicon)\n\n##&quot;])
</code></pre>
<p>Now let’s prepare some questions with its corresponding ground truth answers. We get answers and contexts from our RAG pipeline.</p>
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
Answering questions: 100%|██████████| 3/3 [00:03&lt;00:00,  1.04s/it]
</code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
<pre><code translate="no">.dataframe tbody tr th {
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
      <th>question</th>
      <th>contexts</th>
      <th>answer</th>
      <th>ground_truth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>what is the hardware requirements specificatio...</td>
      <td>[Hardware Requirements\n\nThe following specif...</td>
      <td>The hardware requirements specification to bui...</td>
      <td>If you want to build Milvus and run from sourc...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>What is the programming language used to write...</td>
      <td>[CMake &amp; Conan\n\nThe algorithm library of Mil...</td>
      <td>The programming language used to write Knowher...</td>
      <td>The programming language used to write Knowher...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>What should be ensured before running code cov...</td>
      <td>[Code coverage\n\nBefore submitting your pull ...</td>
      <td>Before running code coverage, it should be ens...</td>
      <td>Before running code coverage, you should make ...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Evaluation-with-Arize-Phoenix" class="common-anchor-header">Evaluation with Arize Phoenix<button data-href="#Evaluation-with-Arize-Phoenix" class="anchor-icon" translate="no">
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
    </button></h2><p>We use Arize Phoenix to evaluate our retrieval-augmented generation (RAG) pipeline, focusing on two key metrics:</p>
<ul>
<li><p><strong>Hallucination Evaluation</strong>: Determines if the content is factual or hallucinatory (information not grounded in context), ensuring data integrity.</p>
<ul>
<li><strong>Hallucination Explanation</strong>: Explains why a response is factual or not.</li>
</ul></li>
<li><p><strong>QA Evaluation</strong>: Assesses the accuracy of model answers to input queries.</p>
<ul>
<li><strong>QA Explanation</strong>: Details why an answer is correct or incorrect.</li>
</ul></li>
</ul>
<h3 id="Phoenix-Tracing-Overview" class="common-anchor-header">Phoenix Tracing Overview</h3><p>Phoenix provides <strong>OTEL-compatible tracing</strong> for LLM applications, with integrations for frameworks like <strong>Langchain</strong>, <strong>LlamaIndex</strong>, and SDKs such as <strong>OpenAI</strong> and <strong>Mistral</strong>. Tracing captures the entire request flow, offering insights into:</p>
<ul>
<li><strong>Application Latency</strong>: Identify and optimize slow LLM invocations and component performance.</li>
<li><strong>Token Usage</strong>: Break down token consumption for cost optimization.</li>
<li><strong>Runtime Exceptions</strong>: Capture critical issues like rate-limiting.</li>
<li><strong>Retrieved Documents</strong>: Analyze document retrieval, score, and order.</li>
</ul>
<p>By utilizing Phoenix’s tracing, you can <strong>identify bottlenecks</strong>, <strong>optimize resources</strong>, and <strong>ensure system reliability</strong> across various frameworks and languages.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> phoenix <span class="hljs-keyword">as</span> px
<span class="hljs-keyword">from</span> phoenix.trace.openai <span class="hljs-keyword">import</span> OpenAIInstrumentor

<span class="hljs-comment"># To view traces in Phoenix, you will first have to start a Phoenix server. You can do this by running the following:</span>
session = px.launch_app()

<span class="hljs-comment"># Initialize OpenAI auto-instrumentation</span>
OpenAIInstrumentor().instrument()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">🌍 To view the Phoenix app in your browser, visit http://localhost:6006/
📖 For more information on how to use Phoenix, check out https://docs.arize.com/phoenix
</code></pre>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/phoenix01.png" alt="Alt Text" class="doc-image" id="alt-text" />
    <span>Alt Text</span>
  </span>
</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

<span class="hljs-keyword">from</span> phoenix.evals <span class="hljs-keyword">import</span> HallucinationEvaluator, OpenAIModel, QAEvaluator, run_evals

nest_asyncio.apply()  <span class="hljs-comment"># This is needed for concurrency in notebook environments</span>

<span class="hljs-comment"># Set your OpenAI API key</span>
eval_model = OpenAIModel(model=<span class="hljs-string">&quot;gpt-4o&quot;</span>)

<span class="hljs-comment"># Define your evaluators</span>
hallucination_evaluator = HallucinationEvaluator(eval_model)
qa_evaluator = QAEvaluator(eval_model)

<span class="hljs-comment"># We have to make some minor changes to our dataframe to use the column names expected by our evaluators</span>
<span class="hljs-comment"># for `hallucination_evaluator` the input df needs to have columns &#x27;output&#x27;, &#x27;input&#x27;, &#x27;context&#x27;</span>
<span class="hljs-comment"># for `qa_evaluator` the input df needs to have columns &#x27;output&#x27;, &#x27;input&#x27;, &#x27;reference&#x27;</span>
df[<span class="hljs-string">&quot;context&quot;</span>] = df[<span class="hljs-string">&quot;contexts&quot;</span>]
df[<span class="hljs-string">&quot;reference&quot;</span>] = df[<span class="hljs-string">&quot;contexts&quot;</span>]
df.rename(columns={<span class="hljs-string">&quot;question&quot;</span>: <span class="hljs-string">&quot;input&quot;</span>, <span class="hljs-string">&quot;answer&quot;</span>: <span class="hljs-string">&quot;output&quot;</span>}, inplace=<span class="hljs-literal">True</span>)
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">all</span>(
    column <span class="hljs-keyword">in</span> df.columns <span class="hljs-keyword">for</span> column <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;output&quot;</span>, <span class="hljs-string">&quot;input&quot;</span>, <span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;reference&quot;</span>]
)

<span class="hljs-comment"># Run the evaluators, each evaluator will return a dataframe with evaluation results</span>
<span class="hljs-comment"># We upload the evaluation results to Phoenix in the next step</span>
hallucination_eval_df, qa_eval_df = run_evals(
    dataframe=df,
    evaluators=[hallucination_evaluator, qa_evaluator],
    provide_explanation=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">run_evals |██████████| 6/6 (100.0%) | ⏳ 00:03&lt;00:00 |  1.64it/s
</code></pre>
<pre><code translate="no" class="language-python">results_df = df.copy()
results_df[<span class="hljs-string">&quot;hallucination_eval&quot;</span>] = hallucination_eval_df[<span class="hljs-string">&quot;label&quot;</span>]
results_df[<span class="hljs-string">&quot;hallucination_explanation&quot;</span>] = hallucination_eval_df[<span class="hljs-string">&quot;explanation&quot;</span>]
results_df[<span class="hljs-string">&quot;qa_eval&quot;</span>] = qa_eval_df[<span class="hljs-string">&quot;label&quot;</span>]
results_df[<span class="hljs-string">&quot;qa_explanation&quot;</span>] = qa_eval_df[<span class="hljs-string">&quot;explanation&quot;</span>]
results_df.head()
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }
<pre><code translate="no">.dataframe tbody tr th {
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
      <th>input</th>
      <th>contexts</th>
      <th>output</th>
      <th>ground_truth</th>
      <th>context</th>
      <th>reference</th>
      <th>hallucination_eval</th>
      <th>hallucination_explanation</th>
      <th>qa_eval</th>
      <th>qa_explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>what is the hardware requirements specificatio...</td>
      <td>[Hardware Requirements\n\nThe following specif...</td>
      <td>The hardware requirements specification to bui...</td>
      <td>If you want to build Milvus and run from sourc...</td>
      <td>[Hardware Requirements\n\nThe following specif...</td>
      <td>[Hardware Requirements\n\nThe following specif...</td>
      <td>factual</td>
      <td>To determine if the answer is factual or hallu...</td>
      <td>correct</td>
      <td>To determine if the answer is correct, we need...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>What is the programming language used to write...</td>
      <td>[CMake &amp; Conan\n\nThe algorithm library of Mil...</td>
      <td>The programming language used to write Knowher...</td>
      <td>The programming language used to write Knowher...</td>
      <td>[CMake &amp; Conan\n\nThe algorithm library of Mil...</td>
      <td>[CMake &amp; Conan\n\nThe algorithm library of Mil...</td>
      <td>factual</td>
      <td>To determine if the answer is factual or hallu...</td>
      <td>correct</td>
      <td>To determine if the answer is correct, we need...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>What should be ensured before running code cov...</td>
      <td>[Code coverage\n\nBefore submitting your pull ...</td>
      <td>Before running code coverage, it should be ens...</td>
      <td>Before running code coverage, you should make ...</td>
      <td>[Code coverage\n\nBefore submitting your pull ...</td>
      <td>[Code coverage\n\nBefore submitting your pull ...</td>
      <td>factual</td>
      <td>The reference text specifies that before runni...</td>
      <td>correct</td>
      <td>To determine if the answer is correct, we need...</td>
    </tr>
  </tbody>
</table>
</div>
