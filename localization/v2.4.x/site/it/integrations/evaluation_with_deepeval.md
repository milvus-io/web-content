---
id: evaluation_with_deepeval.md
summary: >-
  Questa guida mostra come utilizzare DeepEval per valutare una pipeline
  Retrieval-Augmented Generation (RAG) costruita su Milvus.
title: Valutazione con DeepEval
---
<h1 id="Evaluation-with-DeepEval" class="common-anchor-header">Valutazione con DeepEval<button data-href="#Evaluation-with-DeepEval" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/evaluation_with_deepeval.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/evaluation_with_deepeval.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Questa guida mostra come utilizzare <a href="https://docs.confident-ai.com/">DeepEval</a> per valutare una pipeline Retrieval-Augmented Generation (RAG) costruita su <a href="https://milvus.io/">Milvus</a>.</p>
<p>Il sistema RAG combina un sistema di recupero con un modello generativo per generare nuovo testo sulla base di un prompt dato. Il sistema recupera prima i documenti rilevanti da un corpus utilizzando Milvus e poi utilizza un modello generativo per generare nuovo testo sulla base dei documenti recuperati.</p>
<p>DeepEval è un framework che aiuta a valutare le pipeline RAG. Esistono strumenti e framework che aiutano a costruire queste pipeline, ma valutarle e quantificarne le prestazioni può essere difficile. È qui che entra in gioco DeepEval.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di eseguire questo notebook, assicuratevi di avere installato le seguenti dipendenze:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade pymilvus openai requests tqdm pandas deepeval
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Restart session" dal menu a discesa).</p>
</div>
<p>In questo esempio utilizzeremo OpenAI come LLM. È necessario preparare la <a href="https://platform.openai.com/docs/quickstart">chiave api</a> <code translate="no">OPENAI_API_KEY</code> come variabile d'ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-RAG-pipeline" class="common-anchor-header">Definire la pipeline RAG<button data-href="#Define-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Definiamo la classe RAG che utilizza Milvus come archivio vettoriale e OpenAI come LLM. La classe contiene il metodo <code translate="no">load</code>, che carica i dati di testo in Milvus, il metodo <code translate="no">retrieve</code>, che recupera i dati di testo più simili alla domanda data, e il metodo <code translate="no">answer</code>, che risponde alla domanda data con la conoscenza recuperata.</p>
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
            consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
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
<p>Inizializziamo la classe RAG con i client OpenAI e Milvus.</p>
<pre><code translate="no" class="language-python">openai_client = <span class="hljs-title class_">OpenAI</span>()
milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

my_rag = <span class="hljs-title function_">RAG</span>(openai_client=openai_client, milvus_client=milvus_client)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Per quanto riguarda l'argomento di <code translate="no">MilvusClient</code>:</p>
<ul>
<li>L'impostazione di <code translate="no">uri</code> come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. In questa configurazione, utilizzare l'uri del server, ad esempio<code translate="no">http://localhost:19530</code>, come <code translate="no">uri</code>.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Run-the-RAG-pipeline-and-get-results" class="common-anchor-header">Eseguire la pipeline RAG e ottenere i risultati<button data-href="#Run-the-RAG-pipeline-and-get-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizziamo la <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">guida allo sviluppo di Milvus</a> come conoscenza privata nel nostro RAG, che è una buona fonte di dati per una semplice pipeline RAG.</p>
<p>Scaricarla e caricarla nella pipeline RAG.</p>
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
<p>Definiamo una domanda di interrogazione sul contenuto della documentazione della guida allo sviluppo. Quindi utilizziamo il metodo <code translate="no">answer</code> per ottenere la risposta e i testi contestuali recuperati.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>
my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">('The hardware requirements specification to build and run Milvus from source code is as follows:\n\n- 8GB of RAM\n- 50GB of free disk space',
 ['Hardware Requirements\n\nThe following specification (either physical or virtual machine resources) is recommended for Milvus to build and run from source code.\n\n```\n- 8GB of RAM\n- 50GB of free disk space\n```\n\n##',
  'Building Milvus on a local OS/shell environment\n\nThe details below outline the hardware and software requirements for building on Linux and MacOS.\n\n##',
  &quot;Software Requirements\n\nAll Linux distributions are available for Milvus development. However a majority of our contributor worked with Ubuntu or CentOS systems, with a small portion of Mac (both x86_64 and Apple Silicon) contributors. If you would like Milvus to build and run on other distributions, you are more than welcome to file an issue and contribute!\n\nHere's a list of verified OS types where Milvus can successfully build and run:\n\n- Debian/Ubuntu\n- Amazon Linux\n- MacOS (x86_64)\n- MacOS (Apple Silicon)\n\n##&quot;])
</code></pre>
<p>Ora prepariamo alcune domande con le corrispondenti risposte di verità. Otteniamo le risposte e i contesti dalla nostra pipeline RAG.</p>
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
      <th>domanda</th>
      <th>contesti</th>
      <th>risposta</th>
      <th>verità_terra</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>quali sono le specifiche dei requisiti hardware...</td>
      <td>[Requisiti hardware] Le seguenti specifiche...</td>
      <td>Le specifiche dei requisiti hardware per...</td>
      <td>Se si vuole costruire Milvus ed eseguirlo da sorgente...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Qual è il linguaggio di programmazione usato per scrivere...</td>
      <td>[CMake &amp; Conan] La libreria di algoritmi di Milvus...</td>
      <td>Il linguaggio di programmazione utilizzato per scrivere Knowher...</td>
      <td>Il linguaggio di programmazione utilizzato per scrivere Knowher...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Che cosa si deve garantire prima di eseguire la copertura del codice...</td>
      <td>[Copertura del codice] Prima di inviare il pull ...</td>
      <td>Prima di eseguire la copertura del codice, occorre assicurarsi ...</td>
      <td>Prima di eseguire la copertura del codice, è necessario ...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Evaluating-Retriever" class="common-anchor-header">Valutazione di Retriever<button data-href="#Evaluating-Retriever" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si valuta un retriever in sistemi di modelli linguistici di grandi dimensioni (LLM), è fondamentale valutare quanto segue:</p>
<ol>
<li><p><strong>Rilevanza del ranking</strong>: Quanto efficacemente il retriever dà priorità alle informazioni rilevanti rispetto ai dati irrilevanti.</p></li>
<li><p><strong>Recupero contestuale</strong>: La capacità di catturare e recuperare informazioni contestualmente rilevanti in base all'input.</p></li>
<li><p><strong>Equilibrio</strong>: La capacità del retriever di gestire le dimensioni dei pezzi di testo e la portata del recupero per ridurre al minimo le irrilevanze.</p></li>
</ol>
<p>Insieme, questi fattori forniscono una comprensione completa del modo in cui il retriever stabilisce le priorità, cattura e presenta le informazioni più utili.</p>
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
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">Stai utilizzando l'ultima <span style="color: #6a00ff; text-decoration-color: #6a00ff">metrica di precisione contestuale</span> di DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">usando gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">).</span><span style="color: #374151; text-decoration-color: #374151">..</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Si sta eseguendo l'ultima <span style="color: #6a00ff; text-decoration-color: #6a00ff">metrica di richiamo contestuale</span> di DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">usando gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">).</span><span style="color: #374151; text-decoration-color: #374151">..</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Stai eseguendo l'ultima <span style="color: #6a00ff; text-decoration-color: #6a00ff">metrica di rilevanza contestuale</span> di DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">usando gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">).</span><span style="color: #374151; text-decoration-color: #374151">..</span></pre>
<pre><code translate="no">Event loop is already running. Applying nest_asyncio patch to allow async execution...


Evaluating 3 test case(s) in parallel: |██████████|100% (3/3) [Time Taken: 00:11,  3.91s/test case]
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #05f58d; text-decoration-color: #05f58d">✓</span> Test terminati 🎉! Eseguire <span style="color: #008000; text-decoration-color: #008000">'deepeval login'</span> per visualizzare i risultati della valutazione su Confident AI. 
‼️ NOTA: È anche possibile eseguire valutazioni su TUTTE le metriche di deepeval direttamente su Confident AI.</pre>
<h2 id="Evaluating-Generation" class="common-anchor-header">Valutazione della generazione<button data-href="#Evaluating-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Per valutare la qualità dei risultati generati nei modelli linguistici di grandi dimensioni (LLM), è importante concentrarsi su due aspetti chiave:</p>
<ol>
<li><p><strong>Pertinenza</strong>: Valutare se il prompt guida efficacemente l'LLM a generare risposte utili e contestualmente appropriate.</p></li>
<li><p><strong>Fedeltà</strong>: Misurare l'accuratezza dell'output, assicurandosi che il modello produca informazioni corrette dal punto di vista fattuale e prive di allucinazioni o contraddizioni. Il contenuto generato deve essere in linea con le informazioni fattuali fornite nel contesto di ricerca.</p></li>
</ol>
<p>L'insieme di questi fattori garantisce che gli output siano rilevanti e affidabili.</p>
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
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">Stai utilizzando l'ultima <span style="color: #6a00ff; text-decoration-color: #6a00ff">metrica di pertinenza delle risposte</span> di DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">usando gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">).</span><span style="color: #374151; text-decoration-color: #374151">..</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">✨ Stai eseguendo l'ultima <span style="color: #6a00ff; text-decoration-color: #6a00ff">metrica di fedeltà</span> di DeepEval! <span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">usando gpt-4o, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict=False</span><span style="color: #374151; text-decoration-color: #374151">, </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">async_mode=True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre><code translate="no">Event loop is already running. Applying nest_asyncio patch to allow async execution...


Evaluating 3 test case(s) in parallel: |██████████|100% (3/3) [Time Taken: 00:11,  3.97s/test case]
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #05f58d; text-decoration-color: #05f58d">✓</span> Test terminati 🎉! Eseguire <span style="color: #008000; text-decoration-color: #008000">'deepeval login'</span> per visualizzare i risultati della valutazione su Confident AI. 
‼️ NOTA: È anche possibile eseguire valutazioni su TUTTE le metriche di deepeval direttamente su Confident AI.</pre>
