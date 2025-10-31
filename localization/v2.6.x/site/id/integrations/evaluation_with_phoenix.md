---
id: evaluation_with_phoenix.md
summary: >-
  Panduan ini mendemonstrasikan cara menggunakan Arize Pheonix untuk
  mengevaluasi pipeline Retrieval-Augmented Generation (RAG) yang dibangun di
  atas Milvus.
title: Evaluasi dengan Arize Pheonix
---
<h1 id="Evaluation-with-Arize-Pheonix" class="common-anchor-header">Evaluasi dengan Arize Pheonix<button data-href="#Evaluation-with-Arize-Pheonix" class="anchor-icon" translate="no">
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
<p>Panduan ini mendemonstrasikan cara menggunakan <a href="https://phoenix.arize.com/">Arize Pheonix</a> untuk mengevaluasi pipeline Retrieval-Augmented Generation (RAG) yang dibangun di atas <a href="https://milvus.io/">Milvus</a>.</p>
<p>Sistem RAG menggabungkan sistem pengambilan dengan model generatif untuk menghasilkan teks baru berdasarkan perintah yang diberikan. Sistem ini pertama-tama mengambil dokumen yang relevan dari korpus menggunakan Milvus, dan kemudian menggunakan model generatif untuk menghasilkan teks baru berdasarkan dokumen yang diambil.</p>
<p>Arize Pheonix adalah sebuah kerangka kerja yang membantu Anda mengevaluasi pipeline RAG Anda. Ada alat dan kerangka kerja yang ada yang membantu Anda membangun pipeline ini, tetapi mengevaluasinya dan mengukur kinerja pipeline Anda bisa jadi sulit. Di sinilah Arize Pheonix hadir.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum menjalankan notebook ini, pastikan Anda telah menginstal dependensi berikut ini:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade pymilvus milvus-lite openai requests tqdm pandas <span class="hljs-string">&quot;arize-phoenix&gt;=4.29.0&quot;</span> nest_asyncio
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja terinstal, Anda mungkin perlu <strong>memulai ulang runtime</strong> (klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<p>Kita akan menggunakan OpenAI sebagai LLM dalam contoh ini. Anda harus menyiapkan <a href="https://platform.openai.com/docs/quickstart">kunci api</a> <code translate="no">OPENAI_API_KEY</code> sebagai variabel lingkungan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-comment"># os.environ[&quot;OPENAI_API_KEY&quot;] = &quot;sk-*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-RAG-pipeline" class="common-anchor-header">Mendefinisikan pipeline RAG<button data-href="#Define-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Kita akan mendefinisikan kelas RAG yang menggunakan Milvus sebagai penyimpan vektor, dan OpenAI sebagai LLM. Kelas ini berisi metode <code translate="no">load</code>, yang memuat data teks ke dalam Milvus, metode <code translate="no">retrieve</code>, yang mengambil data teks yang paling mirip dengan pertanyaan yang diberikan, dan metode <code translate="no">answer</code>, yang menjawab pertanyaan yang diberikan dengan pengetahuan yang telah diambil.</p>
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
            consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
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
<p>Mari kita inisialisasi kelas RAG dengan klien OpenAI dan Milvus.</p>
<pre><code translate="no" class="language-python">openai_client = OpenAI()
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

my_rag = RAG(openai_client=openai_client, milvus_client=milvus_client)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Adapun argumen dari <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Menetapkan <code translate="no">uri</code> sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</li>
<li>Jika Anda memiliki data dalam skala besar, Anda dapat mengatur server Milvus yang lebih berkinerja pada <a href="https://milvus.io/docs/quickstart.md">docker atau kubernetes</a>. Dalam pengaturan ini, silakan gunakan uri server, misalnya<code translate="no">http://localhost:19530</code>, sebagai <code translate="no">uri</code>.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">kunci Public Endpoint dan Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Run-the-RAG-pipeline-and-get-results" class="common-anchor-header">Jalankan pipeline RAG dan dapatkan hasilnya<button data-href="#Run-the-RAG-pipeline-and-get-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Kami menggunakan <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">panduan pengembangan Milvus</a> sebagai pengetahuan pribadi dalam RAG kami, yang merupakan sumber data yang baik untuk pipeline RAG sederhana.</p>
<p>Unduh dan muat ke dalam pipeline RAG.</p>
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
<p>Mari kita mendefinisikan pertanyaan kueri tentang konten dokumentasi panduan pengembangan. Lalu gunakan metode <code translate="no">answer</code> untuk mendapatkan jawaban dan teks konteks yang diambil.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>
my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">('The hardware requirements specification to build and run Milvus from source code are:\n\n- 8GB of RAM\n- 50GB of free disk space',
 ['Hardware Requirements\n\nThe following specification (either physical or virtual machine resources) is recommended for Milvus to build and run from source code.\n\n```\n- 8GB of RAM\n- 50GB of free disk space\n```\n\n##',
  'Building Milvus on a local OS/shell environment\n\nThe details below outline the hardware and software requirements for building on Linux and MacOS.\n\n##',
  &quot;Software Requirements\n\nAll Linux distributions are available for Milvus development. However a majority of our contributor worked with Ubuntu or CentOS systems, with a small portion of Mac (both x86_64 and Apple Silicon) contributors. If you would like Milvus to build and run on other distributions, you are more than welcome to file an issue and contribute!\n\nHere's a list of verified OS types where Milvus can successfully build and run:\n\n- Debian/Ubuntu\n- Amazon Linux\n- MacOS (x86_64)\n- MacOS (Apple Silicon)\n\n##&quot;])
</code></pre>
<p>Sekarang mari kita siapkan beberapa pertanyaan dengan jawaban ground truth yang sesuai. Kita mendapatkan jawaban dan konteks dari pipeline RAG kita.</p>
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
      <th>pertanyaan</th>
      <th>konteks</th>
      <th>jawaban</th>
      <th>ground_truth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>apa spesifikasi kebutuhan perangkat keras yang ...</td>
      <td>[Persyaratan Perangkat Keras\n\nSpesifikasi berikut ini adalah spesifikasi ...</td>
      <td>Spesifikasi persyaratan perangkat keras untuk membangun ...</td>
      <td>Jika Anda ingin membangun Milvus dan menjalankannya dari sumber ...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Apa bahasa pemrograman yang digunakan untuk menulis ...</td>
      <td>[CMake &amp; Conan\n\nPustaka algoritme dari Mil...</td>
      <td>Bahasa pemrograman yang digunakan untuk menulis Knowher...</td>
      <td>Bahasa pemrograman yang digunakan untuk menulis Knowher...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Apa yang harus dipastikan sebelum menjalankan cakupan kode ...</td>
      <td>[Cakupan kode\n\nSebelum mengirimkan pull ...</td>
      <td>Sebelum menjalankan cakupan kode, Anda harus memastikan ...</td>
      <td>Sebelum menjalankan cakupan kode, Anda harus membuat ...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Evaluation-with-Arize-Phoenix" class="common-anchor-header">Evaluasi dengan Arize Phoenix<button data-href="#Evaluation-with-Arize-Phoenix" class="anchor-icon" translate="no">
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
    </button></h2><p>Kami menggunakan Arize Phoenix untuk mengevaluasi pipeline retrieval-augmented generation (RAG) kami, dengan fokus pada dua metrik utama:</p>
<ul>
<li><p><strong>Evaluasi Halusinasi</strong>: Menentukan apakah konten tersebut faktual atau halusinasi (informasi yang tidak sesuai dengan konteks), untuk memastikan integritas data.</p>
<ul>
<li><strong>Penjelasan Halusinasi</strong>: Menjelaskan mengapa suatu tanggapan bersifat faktual atau tidak.</li>
</ul></li>
<li><p><strong>Evaluasi QA</strong>: Menilai keakuratan jawaban model terhadap pertanyaan masukan.</p>
<ul>
<li><strong>Penjelasan QA</strong>: Merinci mengapa suatu jawaban benar atau salah.</li>
</ul></li>
</ul>
<h3 id="Phoenix-Tracing-Overview" class="common-anchor-header">Ikhtisar Penelusuran Phoenix<button data-href="#Phoenix-Tracing-Overview" class="anchor-icon" translate="no">
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
    </button></h3><p>Phoenix menyediakan <strong>penelusuran yang kompatibel dengan OTEL</strong> untuk aplikasi LLM, dengan integrasi untuk kerangka kerja seperti <strong>Langchain</strong>, <strong>LlamaIndex</strong>, dan SDK seperti <strong>OpenAI</strong> dan <strong>Mistral</strong>. Penelusuran menangkap seluruh aliran permintaan, menawarkan wawasan ke dalam:</p>
<ul>
<li><strong>Latensi Aplikasi</strong>: Mengidentifikasi dan mengoptimalkan panggilan LLM yang lambat dan kinerja komponen.</li>
<li><strong>Penggunaan Token</strong>: Memecah konsumsi token untuk pengoptimalan biaya.</li>
<li><strong>Pengecualian Runtime</strong>: Menangkap masalah kritis seperti pembatasan kecepatan.</li>
<li><strong>Dokumen</strong> yang<strong>Diambil</strong>: Menganalisis pengambilan dokumen, skor, dan urutan.</li>
</ul>
<p>Dengan memanfaatkan penelusuran Phoenix, Anda dapat <strong>mengidentifikasi kemacetan</strong>, <strong>mengoptimalkan sumber daya</strong>, dan <strong>memastikan keandalan sistem</strong> di berbagai kerangka kerja dan bahasa.</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phoenix01.png" alt="Alt Text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>Alt Text</span> </span></p>
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
      <th>input</th>
      <th>konteks</th>
      <th>keluaran</th>
      <th>ground_truth</th>
      <th>konteks</th>
      <th>referensi</th>
      <th>evaluasi_halusinasi</th>
      <th>penjelasan_halusinasi</th>
      <th>qa_eval</th>
      <th>qa_eksplanasi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>apa spesifikasi kebutuhan perangkat keras ...</td>
      <td>[Persyaratan Perangkat Keras\n\nSpesifikasi berikut ini adalah spesifikasi ...</td>
      <td>Spesifikasi kebutuhan perangkat keras untuk membangun ...</td>
      <td>Jika Anda ingin membuat Milvus dan menjalankannya dari sumber ...</td>
      <td>[Persyaratan Perangkat Keras] Spesifikasi berikut ini untuk membangun ...</td>
      <td>[Persyaratan Perangkat Keras\n\nSpesifikasi berikut ini untuk membangun ...</td>
      <td>faktual</td>
      <td>Untuk menentukan apakah jawaban tersebut faktual atau halus...</td>
      <td>benar</td>
      <td>Untuk menentukan apakah jawabannya benar, kita perlu...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Apa bahasa pemrograman yang digunakan untuk menulis ...</td>
      <td>[CMake &amp; Conan\n\nPustaka algoritma dari Mil...</td>
      <td>Bahasa pemrograman yang digunakan untuk menulis Knowher...</td>
      <td>Bahasa pemrograman yang digunakan untuk menulis Knowher...</td>
      <td>[CMake &amp; Conan\n\nPustaka algoritma dari Mil...</td>
      <td>[CMake &amp; Conan\n\nPustaka algoritma dari Mil...</td>
      <td>faktual</td>
      <td>Untuk menentukan apakah jawaban tersebut faktual atau halus...</td>
      <td>benar</td>
      <td>Untuk menentukan apakah jawabannya benar, kita perlu...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Apa yang harus dipastikan sebelum menjalankan cakupan kode ...</td>
      <td>[Cakupan kode\n\nSebelum mengirimkan pull ...</td>
      <td>Sebelum menjalankan cakupan kode, Anda harus memastikan ...</td>
      <td>Sebelum menjalankan cakupan kode, Anda harus membuat ...</td>
      <td>[Cakupan kode\n\nSebelum mengirimkan pull ...</td>
      <td>[Cakupan kode\n\nSebelum mengirimkan penarikan Anda ...</td>
      <td>faktual</td>
      <td>Teks referensi menentukan bahwa sebelum menjalankan ...</td>
      <td>benar</td>
      <td>Untuk menentukan apakah jawabannya benar, kita perlu...</td>
    </tr>
  </tbody>
</table>
</div>
