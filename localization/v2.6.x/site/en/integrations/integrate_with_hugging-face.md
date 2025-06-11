---
id: integrate_with_hugging-face.md
summary: >-
  This tutorial shows how to build a question answering system using Hugging
  Face as the data loader & embedding generator for data processing and Milvus
  as the vector database for semantic search.
title: Question Answering Using Milvus and Hugging Face
---
<h1 id="Question-Answering-Using-Milvus-and-Hugging-Face" class="common-anchor-header">Question Answering Using Milvus and Hugging Face<button data-href="#Question-Answering-Using-Milvus-and-Hugging-Face" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/qa_with_milvus_and_hf.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/qa_with_milvus_and_hf.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>A question answering system based on semantic search works by finding the most similar question from a dataset of question-answer pairs for a given query question. Once the most similar question is identified, the corresponding answer from the dataset is considered as the answer for the query. This approach relies on semantic similarity measures to determine the similarity between questions and retrieve relevant answers.</p>
<p>This tutorial shows how to build a question answering system using <a href="https://huggingface.co">Hugging Face</a> as the data loader & embedding generator for data processing and <a href="https://milvus.io">Milvus</a> as the vector database for semantic search.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Before you begin<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>You need to make sure all required dependencies are installed:</p>
<ul>
<li><code translate="no">pymilvus</code>: a python package works with the vector database service powered by Milvus or Zilliz Cloud.</li>
<li><code translate="no">datasets</code>, <code translate="no">transformers</code>: Hugging Face packages manage data and utilize models.</li>
<li><code translate="no">torch</code>: a powerful library provides efficient tensor computation and deep learning tools.</li>
</ul>
<pre><code translate="no" class="language-python">$ pip install --upgrade pymilvus transformers datasets torch
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong>. (Click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Prepare data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>In this section, we will load example question-answer pairs from the Hugging Face Datasets. As a demo, we only take partial data from the validation split of <a href="https://huggingface.co/datasets/rajpurkar/squad">SQuAD</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset


DATASET = <span class="hljs-string">&quot;squad&quot;</span>  <span class="hljs-comment"># Name of dataset from HuggingFace Datasets</span>
INSERT_RATIO = <span class="hljs-number">0.001</span>  <span class="hljs-comment"># Ratio of example dataset to be inserted</span>

data = load_dataset(DATASET, split=<span class="hljs-string">&quot;validation&quot;</span>)
<span class="hljs-comment"># Generates a fixed subset. To generate a random subset, remove the seed.</span>
data = data.train_test_split(test_size=INSERT_RATIO, seed=<span class="hljs-number">42</span>)[<span class="hljs-string">&quot;test&quot;</span>]
<span class="hljs-comment"># Clean up the data structure in the dataset.</span>
data = data.<span class="hljs-built_in">map</span>(
    <span class="hljs-keyword">lambda</span> val: {<span class="hljs-string">&quot;answer&quot;</span>: val[<span class="hljs-string">&quot;answers&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>][<span class="hljs-number">0</span>]},
    remove_columns=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;answers&quot;</span>, <span class="hljs-string">&quot;context&quot;</span>],
)

<span class="hljs-comment"># View summary of example data</span>
<span class="hljs-built_in">print</span>(data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dataset({
    features: ['title', 'question', 'answer'],
    num_rows: 11
})
</code></pre>
<p>To generate embeddings for questions, you are able to select a text embedding model from Hugging Face Models. In this tutorial, we will use a small sentencce embedding model <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a> as example.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">import</span> torch

MODEL = (
    <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>  <span class="hljs-comment"># Name of model from HuggingFace Models</span>
)
INFERENCE_BATCH_SIZE = <span class="hljs-number">64</span>  <span class="hljs-comment"># Batch size of model inference</span>

<span class="hljs-comment"># Load tokenizer &amp; model from HuggingFace Hub</span>
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModel.from_pretrained(MODEL)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">batch</span>):
    <span class="hljs-comment"># Tokenize sentences</span>
    encoded_input = tokenizer(
        batch[<span class="hljs-string">&quot;question&quot;</span>], padding=<span class="hljs-literal">True</span>, truncation=<span class="hljs-literal">True</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>
    )

    <span class="hljs-comment"># Compute token embeddings</span>
    <span class="hljs-keyword">with</span> torch.no_grad():
        model_output = model(**encoded_input)

    <span class="hljs-comment"># Perform pooling</span>
    token_embeddings = model_output[<span class="hljs-number">0</span>]
    attention_mask = encoded_input[<span class="hljs-string">&quot;attention_mask&quot;</span>]
    input_mask_expanded = (
        attention_mask.unsqueeze(-<span class="hljs-number">1</span>).expand(token_embeddings.size()).<span class="hljs-built_in">float</span>()
    )
    sentence_embeddings = torch.<span class="hljs-built_in">sum</span>(
        token_embeddings * input_mask_expanded, <span class="hljs-number">1</span>
    ) / torch.clamp(input_mask_expanded.<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>), <span class="hljs-built_in">min</span>=<span class="hljs-number">1e-9</span>)

    <span class="hljs-comment"># Normalize embeddings</span>
    batch[<span class="hljs-string">&quot;question_embedding&quot;</span>] = torch.nn.functional.normalize(
        sentence_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>
    )
    <span class="hljs-keyword">return</span> batch


data = data.<span class="hljs-built_in">map</span>(encode_text, batched=<span class="hljs-literal">True</span>, batch_size=INFERENCE_BATCH_SIZE)
data_list = data.to_list()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Insert data<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Now we have question-answer pairs ready with question embeddings. The next step is to insert them into the vector database.</p>
<p>We will first need to connect to Milvus service and create a Milvus collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


MILVUS_URI = <span class="hljs-string">&quot;./huggingface_milvus_test.db&quot;</span>  <span class="hljs-comment"># Connection URI</span>
COLLECTION_NAME = <span class="hljs-string">&quot;huggingface_test&quot;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">384</span>  <span class="hljs-comment"># Embedding dimension depending on model</span>

milvus_client = MilvusClient(MILVUS_URI)
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    dimension=DIMENSION,
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable auto id</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable dynamic fields</span>
    vector_field_name=<span class="hljs-string">&quot;question_embedding&quot;</span>,  <span class="hljs-comment"># Map vector field name and embedding column in dataset</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>As for the argument of <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Setting the <code translate="no">uri</code> as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>If you have large scale of data, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">docker or kubernetes</a>. In this setup, please use the server uri, e.g.<code translate="no">http://localhost:19530</code>, as your <code translate="no">uri</code>.</li>
<li>If you want to use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and Api key</a> in Zilliz Cloud.</li>
</ul>
</div>
<p>Insert all data into the collection:</p>
<pre><code translate="no" class="language-python">milvus_client.insert(collection_name=COLLECTION_NAME, data=data_list)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'insert_count': 11,
 'ids': [450072488481390592, 450072488481390593, 450072488481390594, 450072488481390595, 450072488481390596, 450072488481390597, 450072488481390598, 450072488481390599, 450072488481390600, 450072488481390601, 450072488481390602],
 'cost': 0}
</code></pre>
<h2 id="Ask-questions" class="common-anchor-header">Ask questions<button data-href="#Ask-questions" class="anchor-icon" translate="no">
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
    </button></h2><p>Once all the data is inserted into Milvus, we can ask questions and see what the closest answers are.</p>
<pre><code translate="no" class="language-python">questions = {
    <span class="hljs-string">&quot;question&quot;</span>: [
        <span class="hljs-string">&quot;What is LGM?&quot;</span>,
        <span class="hljs-string">&quot;When did Massachusetts first mandate that children be educated in schools?&quot;</span>,
    ]
}

<span class="hljs-comment"># Generate question embeddings</span>
question_embeddings = [v.tolist() <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> encode_text(questions)[<span class="hljs-string">&quot;question_embedding&quot;</span>]]

<span class="hljs-comment"># Search across Milvus</span>
search_results = milvus_client.search(
    collection_name=COLLECTION_NAME,
    data=question_embeddings,
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># How many search results to output</span>
    output_fields=[<span class="hljs-string">&quot;answer&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>],  <span class="hljs-comment"># Include these fields in search results</span>
)

<span class="hljs-comment"># Print out results</span>
<span class="hljs-keyword">for</span> q, res <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(questions[<span class="hljs-string">&quot;question&quot;</span>], search_results):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Question:&quot;</span>, q)
    <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> res:
        <span class="hljs-built_in">print</span>(
            {
                <span class="hljs-string">&quot;answer&quot;</span>: r[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;answer&quot;</span>],
                <span class="hljs-string">&quot;score&quot;</span>: r[<span class="hljs-string">&quot;distance&quot;</span>],
                <span class="hljs-string">&quot;original question&quot;</span>: r[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;question&quot;</span>],
            }
        )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: What is LGM?
{'answer': 'Last Glacial Maximum', 'score': 0.956273078918457, 'original question': 'What does LGM stands for?'}
{'answer': 'coordinate the response to the embargo', 'score': 0.2120140939950943, 'original question': 'Why was this short termed organization created?'}
{'answer': '&quot;Reducibility Among Combinatorial Problems&quot;', 'score': 0.1945795714855194, 'original question': 'What is the paper written by Richard Karp in 1972 that ushered in a new era of understanding between intractability and NP-complete problems?'}


Question: When did Massachusetts first mandate that children be educated in schools?
{'answer': '1852', 'score': 0.9709997177124023, 'original question': 'In what year did Massachusetts first require children to be educated in schools?'}
{'answer': 'several regional colleges and universities', 'score': 0.34164726734161377, 'original question': 'In 1890, who did the university decide to team up with?'}
{'answer': '1962', 'score': 0.1931006908416748, 'original question': 'When were stromules discovered?'}
</code></pre>
