---
id: integrate_with_hugging-face.md
summary: >-
  This page goes over how to search for the best answer to questions using
  Milvus as the Vector Database and Hugging Face as the embedding system.
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
    </button></h1><p>This page illustrates how to build a question-answering system using Milvus as the vector database and Hugging Face as the embedding system.</p>
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
    </button></h2><p>Code snippets on this page require <strong>pymilvus</strong>, <strong>transformers</strong>, and <strong>datasets</strong> installed. Packages <strong>transformers</strong> and <strong>datasets</strong> are the Hugging Face packages to create the pipeline and <strong>pymilvus</strong> is the client for Milvus. If not present on your system, run the following commands to install them:</p>
<pre><code translate="no" class="language-shell">pip install transformers datasets pymilvus torch
<button class="copy-code-btn"></button></code></pre>
<p>Then you need to load the modules to be used in this guide.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, FieldSchema, CollectionSchema, DataType, Collection, utility
<span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset_builder, load_dataset, Dataset
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">from</span> torch <span class="hljs-keyword">import</span> clamp, <span class="hljs-built_in">sum</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Parameters" class="common-anchor-header">Parameters<button data-href="#Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Here we can find the parameters used in the following snippets. Some of them need to be changed to fit your environment. Beside each is a description of what it is.</p>
<pre><code translate="no" class="language-python">DATASET = <span class="hljs-string">&#x27;squad&#x27;</span>  <span class="hljs-comment"># Huggingface Dataset to use</span>
MODEL = <span class="hljs-string">&#x27;bert-base-uncased&#x27;</span>  <span class="hljs-comment"># Transformer to use for embeddings</span>
TOKENIZATION_BATCH_SIZE = <span class="hljs-number">1000</span>  <span class="hljs-comment"># Batch size for tokenizing operation</span>
INFERENCE_BATCH_SIZE = <span class="hljs-number">64</span>  <span class="hljs-comment"># batch size for transformer</span>
INSERT_RATIO = <span class="hljs-number">.001</span>  <span class="hljs-comment"># How many titles to embed and insert</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;huggingface_db&#x27;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">768</span>  <span class="hljs-comment"># Embeddings size</span>
LIMIT = <span class="hljs-number">10</span>  <span class="hljs-comment"># How many results to search for</span>
MILVUS_HOST = <span class="hljs-string">&quot;localhost&quot;</span>
MILVUS_PORT = <span class="hljs-string">&quot;19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>To know more about the model and dataset used on this page, refer to <a href="https://huggingface.co/bert-base-uncased">bert-base-uncased</a> and <a href="https://huggingface.co/datasets/squad">squad</a>.</p>
<h2 id="Create-a-collection" class="common-anchor-header">Create a collection<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>This section deals with Milvus and setting up the database for this use case. Within Milvus, we need to set up a collection and index it.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus Database</span>
connections.connect(uri=URI, user=USER, password=PASSWORD, secure=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Remove collection if it already exists</span>
<span class="hljs-keyword">if</span> utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)

<span class="hljs-comment"># Create collection which includes the id, title, and embedding.</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;original_question&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;answer&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;original_question_embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name=COLLECTION_NAME, schema=schema)

<span class="hljs-comment"># Create an IVF_FLAT index for collection.</span>
index_params = {
    <span class="hljs-string">&#x27;metric_type&#x27;</span>:<span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>:{<span class="hljs-string">&quot;nlist&quot;</span>:<span class="hljs-number">1536</span>}
}
collection.create_index(field_name=<span class="hljs-string">&quot;original_question_embedding&quot;</span>, index_params=index_params)
collection.load()
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
    </button></h2><p>Once we have the collection set up we need to start inserting our data. This is done in three steps</p>
<ul>
<li>tokenizing the original question,</li>
<li>embedding the tokenized question, and</li>
<li>inserting the embedding, original question, and answer.</li>
</ul>
<p>In this example, the data includes the original question, the original question’s embedding, and the answer to the original question.</p>
<pre><code translate="no" class="language-python">data_dataset = load_dataset(DATASET, split=<span class="hljs-string">&#x27;all&#x27;</span>)
<span class="hljs-comment"># Generates a fixed subset. To generate a random subset, remove the seed setting. For details, see &lt;https://huggingface.co/docs/datasets/v2.9.0/en/package_reference/main_classes#datasets.Dataset.train_test_split.seed&gt;</span>
data_dataset = data_dataset.train_test_split(test_size=INSERT_RATIO, seed=<span class="hljs-number">42</span>)[<span class="hljs-string">&#x27;test&#x27;</span>]
<span class="hljs-comment"># Clean up the data structure in the dataset.</span>
data_dataset = data_dataset.<span class="hljs-built_in">map</span>(<span class="hljs-keyword">lambda</span> val: {<span class="hljs-string">&#x27;answer&#x27;</span>: val[<span class="hljs-string">&#x27;answers&#x27;</span>][<span class="hljs-string">&#x27;text&#x27;</span>][<span class="hljs-number">0</span>]}, remove_columns=[<span class="hljs-string">&#x27;answers&#x27;</span>])

tokenizer = AutoTokenizer.from_pretrained(MODEL)

<span class="hljs-comment"># Tokenize the question into the format that bert takes.</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">tokenize_question</span>(<span class="hljs-params">batch</span>):
    results = tokenizer(batch[<span class="hljs-string">&#x27;question&#x27;</span>], add_special_tokens = <span class="hljs-literal">True</span>, truncation = <span class="hljs-literal">True</span>, padding = <span class="hljs-string">&quot;max_length&quot;</span>, return_attention_mask = <span class="hljs-literal">True</span>, return_tensors = <span class="hljs-string">&quot;pt&quot;</span>)
    batch[<span class="hljs-string">&#x27;input_ids&#x27;</span>] = results[<span class="hljs-string">&#x27;input_ids&#x27;</span>]
    batch[<span class="hljs-string">&#x27;token_type_ids&#x27;</span>] = results[<span class="hljs-string">&#x27;token_type_ids&#x27;</span>]
    batch[<span class="hljs-string">&#x27;attention_mask&#x27;</span>] = results[<span class="hljs-string">&#x27;attention_mask&#x27;</span>]
    <span class="hljs-keyword">return</span> batch

<span class="hljs-comment"># Generate the tokens for each entry.</span>
data_dataset = data_dataset.<span class="hljs-built_in">map</span>(tokenize_question, batch_size=TOKENIZATION_BATCH_SIZE, batched=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Set the ouput format to torch so it can be pushed into embedding model</span>
data_dataset.set_format(<span class="hljs-string">&#x27;torch&#x27;</span>, columns=[<span class="hljs-string">&#x27;input_ids&#x27;</span>, <span class="hljs-string">&#x27;token_type_ids&#x27;</span>, <span class="hljs-string">&#x27;attention_mask&#x27;</span>], output_all_columns=<span class="hljs-literal">True</span>)

model = AutoModel.from_pretrained(MODEL)
<span class="hljs-comment"># Embed the tokenized question and take the mean pool with respect to attention mask of hidden layer.</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed</span>(<span class="hljs-params">batch</span>):
    sentence_embs = model(
                input_ids=batch[<span class="hljs-string">&#x27;input_ids&#x27;</span>],
                token_type_ids=batch[<span class="hljs-string">&#x27;token_type_ids&#x27;</span>],
                attention_mask=batch[<span class="hljs-string">&#x27;attention_mask&#x27;</span>]
                )[<span class="hljs-number">0</span>]
    input_mask_expanded = batch[<span class="hljs-string">&#x27;attention_mask&#x27;</span>].unsqueeze(-<span class="hljs-number">1</span>).expand(sentence_embs.size()).<span class="hljs-built_in">float</span>()
    batch[<span class="hljs-string">&#x27;question_embedding&#x27;</span>] = <span class="hljs-built_in">sum</span>(sentence_embs * input_mask_expanded, <span class="hljs-number">1</span>) / clamp(input_mask_expanded.<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>), <span class="hljs-built_in">min</span>=<span class="hljs-number">1e-9</span>)
    <span class="hljs-keyword">return</span> batch

data_dataset = data_dataset.<span class="hljs-built_in">map</span>(embed, remove_columns=[<span class="hljs-string">&#x27;input_ids&#x27;</span>, <span class="hljs-string">&#x27;token_type_ids&#x27;</span>, <span class="hljs-string">&#x27;attention_mask&#x27;</span>], batched = <span class="hljs-literal">True</span>, batch_size=INFERENCE_BATCH_SIZE)

<span class="hljs-comment"># Due to the varchar constraint we are going to limit the question size when inserting</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_function</span>(<span class="hljs-params">batch</span>):
    insertable = [
        batch[<span class="hljs-string">&#x27;question&#x27;</span>],
        [x[:<span class="hljs-number">995</span>] + <span class="hljs-string">&#x27;...&#x27;</span> <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(x) &gt; <span class="hljs-number">999</span> <span class="hljs-keyword">else</span> x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&#x27;answer&#x27;</span>]],
        batch[<span class="hljs-string">&#x27;question_embedding&#x27;</span>].tolist()
    ]    
    collection.insert(insertable)

data_dataset.<span class="hljs-built_in">map</span>(insert_function, batched=<span class="hljs-literal">True</span>, batch_size=<span class="hljs-number">64</span>)
collection.flush()
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Once all the data is inserted and indexed within Milvus, we can ask questions and see what the closest answers are.</p>
<pre><code translate="no" class="language-python">questions = {<span class="hljs-string">&#x27;question&#x27;</span>:[<span class="hljs-string">&#x27;When was chemistry invented?&#x27;</span>, <span class="hljs-string">&#x27;When was Eisenhower born?&#x27;</span>]}
question_dataset = Dataset.from_dict(questions)

question_dataset = question_dataset.<span class="hljs-built_in">map</span>(tokenize_question, batched = <span class="hljs-literal">True</span>, batch_size=TOKENIZATION_BATCH_SIZE)
question_dataset.set_format(<span class="hljs-string">&#x27;torch&#x27;</span>, columns=[<span class="hljs-string">&#x27;input_ids&#x27;</span>, <span class="hljs-string">&#x27;token_type_ids&#x27;</span>, <span class="hljs-string">&#x27;attention_mask&#x27;</span>], output_all_columns=<span class="hljs-literal">True</span>)
question_dataset = question_dataset.<span class="hljs-built_in">map</span>(embed, remove_columns=[<span class="hljs-string">&#x27;input_ids&#x27;</span>, <span class="hljs-string">&#x27;token_type_ids&#x27;</span>, <span class="hljs-string">&#x27;attention_mask&#x27;</span>], batched = <span class="hljs-literal">True</span>, batch_size=INFERENCE_BATCH_SIZE)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">batch</span>):
    res = collection.search(batch[<span class="hljs-string">&#x27;question_embedding&#x27;</span>].tolist(), anns_field=<span class="hljs-string">&#x27;original_question_embedding&#x27;</span>, param = {}, output_fields=[<span class="hljs-string">&#x27;answer&#x27;</span>, <span class="hljs-string">&#x27;original_question&#x27;</span>], limit = LIMIT)
    overall_id = []
    overall_distance = []
    overall_answer = []
    overall_original_question = []
    <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
        ids = []
        distance = []
        answer = []
        original_question = []
        <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
            ids.append(hit.<span class="hljs-built_in">id</span>)
            distance.append(hit.distance)
            answer.append(hit.entity.get(<span class="hljs-string">&#x27;answer&#x27;</span>))
            original_question.append(hit.entity.get(<span class="hljs-string">&#x27;original_question&#x27;</span>))
        overall_id.append(ids)
        overall_distance.append(distance)
        overall_answer.append(answer)
        overall_original_question.append(original_question)
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&#x27;id&#x27;</span>: overall_id,
        <span class="hljs-string">&#x27;distance&#x27;</span>: overall_distance,
        <span class="hljs-string">&#x27;answer&#x27;</span>: overall_answer,
        <span class="hljs-string">&#x27;original_question&#x27;</span>: overall_original_question
    }
question_dataset = question_dataset.<span class="hljs-built_in">map</span>(search, batched=<span class="hljs-literal">True</span>, batch_size = <span class="hljs-number">1</span>)
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> question_dataset:
    <span class="hljs-built_in">print</span>()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Question:&#x27;</span>)
    <span class="hljs-built_in">print</span>(x[<span class="hljs-string">&#x27;question&#x27;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Answer, Distance, Original Question&#x27;</span>)
    <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(x[<span class="hljs-string">&#x27;answer&#x27;</span>], x[<span class="hljs-string">&#x27;distance&#x27;</span>], x[<span class="hljs-string">&#x27;original_question&#x27;</span>]):
        <span class="hljs-built_in">print</span>(x)
<button class="copy-code-btn"></button></code></pre>
<p>The output would vary with the subset of data you have downloaded if you leave <a href="#Insert-data">the <code translate="no">seed</code> parameter of the <code translate="no">train_test_split()</code> method</a> unspecified, and should be similar to the following:</p>
<pre><code translate="no" class="language-python">Question:
When was chemistry invented?
Answer, Distance, Original <span class="hljs-title function_">Question</span>
<span class="hljs-params">(<span class="hljs-string">&#x27;until 1870&#x27;</span>, tensor(<span class="hljs-number">12.7554</span>)</span>, <span class="hljs-string">&#x27;When did the Papal States exist?&#x27;</span>)
(<span class="hljs-string">&#x27;October 1992&#x27;</span>, tensor(<span class="hljs-number">12.8504</span>), <span class="hljs-string">&#x27;When were free elections held?&#x27;</span>)
(<span class="hljs-string">&#x27;1787&#x27;</span>, tensor(<span class="hljs-number">14.8283</span>), <span class="hljs-string">&#x27;When was the Tower constructed?&#x27;</span>)
(<span class="hljs-string">&#x27;taxation&#x27;</span>, tensor(<span class="hljs-number">17.1399</span>), <span class="hljs-string">&#x27;How did Hobson argue to rid the world of imperialism?&#x27;</span>)
(<span class="hljs-string">&#x27;1981&#x27;</span>, tensor(<span class="hljs-number">18.9243</span>), <span class="hljs-string">&quot;When was ZE&#x27;s Mutant Disco released?&quot;</span>)
(<span class="hljs-string">&#x27;salt and iron&#x27;</span>, tensor(<span class="hljs-number">19.8073</span>), <span class="hljs-string">&#x27;What natural resources did the Chinese government have a monopoly on?&#x27;</span>)
(<span class="hljs-string">&#x27;Medieval Latin&#x27;</span>, tensor(<span class="hljs-number">20.9864</span>), <span class="hljs-string">&quot;What was the Latin of Charlemagne&#x27;s era later known as?&quot;</span>)
(<span class="hljs-string">&#x27;military education&#x27;</span>, tensor(<span class="hljs-number">21.0572</span>), <span class="hljs-string">&#x27;What Prussian system was superior to the French example?&#x27;</span>)
(<span class="hljs-string">&#x27;Edgar Bronfman Jr.&#x27;</span>, tensor(<span class="hljs-number">21.6317</span>), <span class="hljs-string">&#x27;Who was the head of Seagram?&#x27;</span>)
(<span class="hljs-string">&#x27;because of persecution, increased poverty and better economic opportunities&#x27;</span>, tensor(<span class="hljs-number">23.1249</span>), <span class="hljs-string">&#x27;Why did more than half a million people flee?&#x27;</span>)

Question:
When was Eisenhower born?
Answer, Distance, Original <span class="hljs-title function_">Question</span>
<span class="hljs-params">(<span class="hljs-string">&#x27;until 1870&#x27;</span>, tensor(<span class="hljs-number">17.2719</span>)</span>, <span class="hljs-string">&#x27;When did the Papal States exist?&#x27;</span>)
(<span class="hljs-string">&#x27;1787&#x27;</span>, tensor(<span class="hljs-number">17.3752</span>), <span class="hljs-string">&#x27;When was the Tower constructed?&#x27;</span>)
(<span class="hljs-string">&#x27;October 1992&#x27;</span>, tensor(<span class="hljs-number">20.3766</span>), <span class="hljs-string">&#x27;When were free elections held?&#x27;</span>)
(<span class="hljs-string">&#x27;1992&#x27;</span>, tensor(<span class="hljs-number">21.0860</span>), <span class="hljs-string">&#x27;In what year was the Premier League created?&#x27;</span>)
(<span class="hljs-string">&#x27;1981&#x27;</span>, tensor(<span class="hljs-number">23.1728</span>), <span class="hljs-string">&quot;When was ZE&#x27;s Mutant Disco released?&quot;</span>)
(<span class="hljs-string">&#x27;Medieval Latin&#x27;</span>, tensor(<span class="hljs-number">23.5315</span>), <span class="hljs-string">&quot;What was the Latin of Charlemagne&#x27;s era later known as?&quot;</span>)
(<span class="hljs-string">&#x27;Poland, Bulgaria, the Czech Republic, Slovakia, Hungary, Albania, former East Germany and Cuba&#x27;</span>, tensor(<span class="hljs-number">25.1409</span>), <span class="hljs-string">&#x27;Where was Russian schooling mandatory in the 20th century?&#x27;</span>)
(<span class="hljs-string">&#x27;Antonio B. Won Pat&#x27;</span>, tensor(<span class="hljs-number">25.8398</span>), <span class="hljs-string">&#x27;What is the name of the international airport in Guam?&#x27;</span>)
(<span class="hljs-string">&#x27;1973&#x27;</span>, tensor(<span class="hljs-number">26.7827</span>), <span class="hljs-string">&#x27;In what year did the State Management Scheme cease?&#x27;</span>)
(<span class="hljs-string">&#x27;2019&#x27;</span>, tensor(<span class="hljs-number">27.1236</span>), <span class="hljs-string">&#x27;When will Argo be launched?&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
