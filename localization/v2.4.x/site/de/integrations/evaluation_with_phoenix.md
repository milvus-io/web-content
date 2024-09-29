---
id: evaluation_with_phoenix.md
summary: >-
  Dieser Leitfaden zeigt, wie man Arize Pheonix verwendet, um eine
  Retrieval-Augmented Generation (RAG) Pipeline zu evaluieren, die auf Milvus
  aufbaut.
title: Auswertung mit Arize Pheonix
---
<h1 id="Evaluation-with-Arize-Pheonix" class="common-anchor-header">Auswertung mit Arize Pheonix<button data-href="#Evaluation-with-Arize-Pheonix" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/evaluation_with_phoenix.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a></p>
<p>Diese Anleitung zeigt, wie man <a href="https://phoenix.arize.com/">Arize Pheonix</a> verwendet, um eine Retrieval-Augmented Generation (RAG) Pipeline zu evaluieren, die auf <a href="https://milvus.io/">Milvus</a> aufbaut.</p>
<p>Das RAG-System kombiniert ein Retrieval-System mit einem generativen Modell, um neuen Text auf der Grundlage einer vorgegebenen Aufforderung zu generieren. Das System sucht zunächst mit Milvus relevante Dokumente aus einem Korpus und verwendet dann ein generatives Modell, um neuen Text auf der Grundlage der gefundenen Dokumente zu generieren.</p>
<p>Arize Pheonix ist ein Framework, das Ihnen hilft, Ihre RAG-Pipelines zu bewerten. Es gibt bereits Tools und Frameworks, die Ihnen bei der Erstellung dieser Pipelines helfen, aber die Bewertung und Quantifizierung der Leistung Ihrer Pipeline kann schwierig sein. Hier kommt Arize Pheonix ins Spiel.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Vergewissern Sie sich, dass Sie die folgenden Abhängigkeiten installiert haben, bevor Sie dieses Notizbuch ausführen:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade pymilvus openai requests tqdm pandas <span class="hljs-string">&quot;arize-phoenix&gt;=4.29.0&quot;</span> nest_asyncio
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Rand des Bildschirms und wählen Sie "Sitzung neu starten" aus dem Dropdown-Menü).</p>
</div>
<p>Wir werden in diesem Beispiel OpenAI als LLM verwenden. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">Api-Schlüssel</a> <code translate="no">OPENAI_API_KEY</code> als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

# os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-RAG-pipeline" class="common-anchor-header">Definieren Sie die RAG-Pipeline<button data-href="#Define-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir werden die RAG-Klasse definieren, die Milvus als Vektorspeicher und OpenAI als LLM verwendet. Die Klasse enthält die Methode <code translate="no">load</code>, die die Textdaten in Milvus lädt, die Methode <code translate="no">retrieve</code>, die die ähnlichsten Textdaten zur gegebenen Frage abruft, und die Methode <code translate="no">answer</code>, die die gegebene Frage mit dem abgerufenen Wissen beantwortet.</p>
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
<p>Initialisieren wir die RAG-Klasse mit OpenAI- und Milvus-Clients.</p>
<pre><code translate="no" class="language-python">openai_client = <span class="hljs-title class_">OpenAI</span>()
milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

my_rag = <span class="hljs-title function_">RAG</span>(openai_client=openai_client, milvus_client=milvus_client)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Was das Argument von <code translate="no">MilvusClient</code> betrifft:</p>
<ul>
<li>Die Einstellung von <code translate="no">uri</code> als lokale Datei, z.B.<code translate="no">./milvus.db</code>, ist die bequemste Methode, da sie automatisch <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> nutzt, um alle Daten in dieser Datei zu speichern.</li>
<li>Wenn Sie große Datenmengen haben, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-Uri, z. B.<code translate="no">http://localhost:19530</code>, als <code translate="no">uri</code>.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, verwenden möchten, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
</ul>
</div>
<h2 id="Run-the-RAG-pipeline-and-get-results" class="common-anchor-header">Führen Sie die RAG-Pipeline aus und erhalten Sie die Ergebnisse<button data-href="#Run-the-RAG-pipeline-and-get-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir verwenden das <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">Milvus-Entwicklungshandbuch</a> als privates Wissen in unserer RAG, was eine gute Datenquelle für eine einfache RAG-Pipeline ist.</p>
<p>Laden Sie es herunter und laden Sie es in die RAG-Pipeline.</p>
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
<p>Lassen Sie uns eine Abfrage über den Inhalt der Dokumentation des Entwicklungshandbuchs definieren. Und dann verwenden wir die Methode <code translate="no">answer</code>, um die Antwort und die abgerufenen Kontexttexte zu erhalten.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>
my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">('The hardware requirements specification to build and run Milvus from source code are:\n\n- 8GB of RAM\n- 50GB of free disk space',
 ['Hardware Requirements\n\nThe following specification (either physical or virtual machine resources) is recommended for Milvus to build and run from source code.\n\n```\n- 8GB of RAM\n- 50GB of free disk space\n```\n\n##',
  'Building Milvus on a local OS/shell environment\n\nThe details below outline the hardware and software requirements for building on Linux and MacOS.\n\n##',
  &quot;Software Requirements\n\nAll Linux distributions are available for Milvus development. However a majority of our contributor worked with Ubuntu or CentOS systems, with a small portion of Mac (both x86_64 and Apple Silicon) contributors. If you would like Milvus to build and run on other distributions, you are more than welcome to file an issue and contribute!\n\nHere's a list of verified OS types where Milvus can successfully build and run:\n\n- Debian/Ubuntu\n- Amazon Linux\n- MacOS (x86_64)\n- MacOS (Apple Silicon)\n\n##&quot;])
</code></pre>
<p>Lassen Sie uns nun einige Fragen mit den entsprechenden Antworten vorbereiten. Wir erhalten die Antworten und Kontexte aus unserer RAG-Pipeline.</p>
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
      <th>Frage</th>
      <th>Kontexte</th>
      <th>Antwort</th>
      <th>grund_wahrheit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Wie lauten die spezifischen Hardware-Anforderungen...</td>
      <td>[Hardware-Anforderungen\n\nDie folgende Spezifi...</td>
      <td>Die Spezifikation der Hardware-Anforderungen für...</td>
      <td>Wenn Sie Milvus bauen und von der Quelle...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Welche Programmiersprache wird zum Schreiben von...</td>
      <td>[CMake &amp; Conan\n\nDie Algorithmenbibliothek von Mil...</td>
      <td>Mit welcher Programmiersprache wird Knowher...</td>
      <td>Welche Programmiersprache wird zum Schreiben von Knowher...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Was sollte sichergestellt werden, bevor die Codeabdeckung...</td>
      <td>[Codeabdeckung\n\nVor dem Einreichen Ihrer Pull ...</td>
      <td>Bevor die Codeabdeckung durchgeführt wird, sollte sie...</td>
      <td>Bevor Sie Code Coverage durchführen, sollten Sie ...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Evaluation-with-Arize-Phoenix" class="common-anchor-header">Auswertung mit Arize Phoenix<button data-href="#Evaluation-with-Arize-Phoenix" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir verwenden Arize Phoenix, um unsere Retrieval-Augmented Generation (RAG) Pipeline zu evaluieren und konzentrieren uns dabei auf zwei Schlüsselmetriken:</p>
<ul>
<li><p><strong>Halluzinationsauswertung</strong>: Bestimmt, ob der Inhalt faktisch oder halluzinatorisch ist (Informationen, die nicht im Kontext begründet sind), und stellt die Datenintegrität sicher.</p>
<ul>
<li><strong>Erläuterung der Halluzinationen</strong>: Erläutert, warum eine Antwort sachlich ist oder nicht.</li>
</ul></li>
<li><p><strong>QA-Auswertung</strong>: Bewertet die Genauigkeit der Modellantworten auf Eingabeabfragen.</p>
<ul>
<li><strong>QA-Erklärung</strong>: Erklärt, warum eine Antwort richtig oder falsch ist.</li>
</ul></li>
</ul>
<h3 id="Phoenix-Tracing-Overview" class="common-anchor-header">Phoenix Tracing Überblick</h3><p>Phoenix bietet <strong>OTEL-kompatibles Tracing</strong> für LLM-Anwendungen, mit Integrationen für Frameworks wie <strong>Langchain</strong>, <strong>LlamaIndex</strong> und SDKs wie <strong>OpenAI</strong> und <strong>Mistral</strong>. Tracing erfasst den gesamten Anfragefluss und bietet Einblicke in:</p>
<ul>
<li><strong>Anwendungslatenz</strong>: Identifizieren und optimieren Sie langsame LLM-Aufrufe und die Leistung von Komponenten.</li>
<li><strong>Token-Verwendung</strong>: Aufschlüsselung des Token-Verbrauchs zur Kostenoptimierung.</li>
<li><strong>Laufzeitausnahmen</strong>: Erfassen Sie kritische Probleme wie Ratenbeschränkung.</li>
<li><strong>Abgerufene Dokumente</strong>: Analysieren Sie den Abruf von Dokumenten, die Bewertung und die Reihenfolge.</li>
</ul>
<p>Durch die Nutzung des Tracing von Phoenix können Sie <strong>Engpässe identifizieren</strong>, <strong>Ressourcen optimieren</strong> und <strong>die Systemzuverlässigkeit</strong> über verschiedene Frameworks und Sprachen hinweg <strong>sicherstellen</strong>.</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/images/phoenix01.png" alt="Alt Text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>Alt-Text</span> </span></p>
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
<pre><code translate="no" class="language-python">results_df = df.<span class="hljs-built_in">copy</span>()
results_df[<span class="hljs-string">&quot;hallucination_eval&quot;</span>] = hallucination_eval_df[<span class="hljs-string">&quot;label&quot;</span>]
results_df[<span class="hljs-string">&quot;hallucination_explanation&quot;</span>] = hallucination_eval_df[<span class="hljs-string">&quot;explanation&quot;</span>]
results_df[<span class="hljs-string">&quot;qa_eval&quot;</span>] = qa_eval_df[<span class="hljs-string">&quot;label&quot;</span>]
results_df[<span class="hljs-string">&quot;qa_explanation&quot;</span>] = qa_eval_df[<span class="hljs-string">&quot;explanation&quot;</span>]
results_df.head()
<button class="copy-code-btn"></button></code></pre>
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
      <th>Eingabe</th>
      <th>Kontexte</th>
      <th>Ausgabe</th>
      <th>Grund_Wahrheit</th>
      <th>Kontext</th>
      <th>Referenz</th>
      <th>halluzination_eval</th>
      <th>halluzination_explanation</th>
      <th>qa_eval</th>
      <th>qa_erläuterung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Wie lauten die spezifischen Hardware-Anforderungen...</td>
      <td>[Hardware-Anforderungen\n\nDie folgende Spezifi...</td>
      <td>Die Spezifikation der Hardware-Anforderungen für den Bau...</td>
      <td>Wenn Sie Milvus bauen und von der Quelle aus betreiben wollen...</td>
      <td>[Hardware-Anforderungen\n\nDie folgenden Spezi...</td>
      <td>[Hardware-Anforderungen\n\nDie folgenden Spezi...</td>
      <td>faktisch</td>
      <td>Um festzustellen, ob die Antwort sachlich oder hallu...</td>
      <td>richtig</td>
      <td>Um festzustellen, ob die Antwort richtig ist, müssen wir...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Welche Programmiersprache wird zum Schreiben von...</td>
      <td>[CMake &amp; Conan\n\nDie Algorithmenbibliothek von Mil...</td>
      <td>Mit welcher Programmiersprache wird Knowher...</td>
      <td>Die Programmiersprache, mit der Knowher...</td>
      <td>[CMake &amp; Conan\n\nDie Algorithmus-Bibliothek von Mil...</td>
      <td>[CMake &amp; Conan\n\nDie Algorithmus-Bibliothek von Mil...</td>
      <td>faktisch</td>
      <td>Um festzustellen, ob die Antwort sachlich oder hallu...</td>
      <td>richtig</td>
      <td>Um festzustellen, ob die Antwort richtig ist, müssen wir...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Was sollte vor der Durchführung der Code Coverage...</td>
      <td>[Codeabdeckung\n\nVor dem Einreichen Ihrer Pull ...</td>
      <td>Bevor die Codeabdeckung durchgeführt wird, sollte sie...</td>
      <td>Bevor Sie Code Coverage durchführen, sollten Sie ...</td>
      <td>[Codeabdeckung\n\nBevor Sie Ihre Pull-Datei einreichen ...</td>
      <td>[Codeabdeckung\n\nBefore submitting your pull ...</td>
      <td>sachlich</td>
      <td>Der Referenztext gibt an, dass vor der Ausführung der ...</td>
      <td>richtig</td>
      <td>Um festzustellen, ob die Antwort richtig ist, müssen wir...</td>
    </tr>
  </tbody>
</table>
</div>
