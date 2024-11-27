---
id: integrate_with_cohere.md
summary: >-
  이 페이지에서는 밀버스를 벡터 데이터베이스로, 허깅 페이스를 임베딩 시스템으로 사용하여 질문에 대한 최적의 답변을 검색하는 방법에 대해
  설명합니다.
title: Milvus와 Cohere를 사용한 질문 답변하기
---
<h1 id="Question-Answering-Using-Milvus-and-Cohere" class="common-anchor-header">Milvus와 Cohere를 사용한 질문 답변하기<button data-href="#Question-Answering-Using-Milvus-and-Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Milvus를 벡터 데이터베이스로, Cohere를 임베딩 시스템으로 사용하여 SQuAD 데이터셋에 기반한 질문 답변 시스템을 만드는 방법을 설명합니다.</p>
<h2 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>이 페이지의 코드 스니펫을 사용하려면 <strong>pymilvus</strong>, <strong>cohere</strong>, <strong>pandas</strong>, <strong>numpy</strong> 및 <strong>tqdm이</strong> 설치되어 있어야 합니다. 이 패키지 중 <strong>pymilvus는</strong> Milvus용 클라이언트입니다. 시스템에 없는 경우 다음 명령을 실행하여 설치하세요:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus cohere pandas numpy tqdm
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 이 가이드에서 사용할 모듈을 로드해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> cohere
<span class="hljs-keyword">import</span> pandas
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">Collection</span>, utility
<button class="copy-code-btn"></button></code></pre>
<h2 id="Parameters" class="common-anchor-header">매개변수<button data-href="#Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 스니펫에서 사용되는 매개변수를 찾을 수 있습니다. 이 중 일부는 사용자 환경에 맞게 변경해야 합니다. 각 매개변수 옆에는 해당 매개변수가 무엇인지에 대한 설명이 나와 있습니다.</p>
<pre><code translate="no" class="language-python">FILE = <span class="hljs-string">&#x27;https://rajpurkar.github.io/SQuAD-explorer/dataset/train-v2.0.json&#x27;</span>  <span class="hljs-comment"># The SQuAD dataset url</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;question_answering_db&#x27;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># Embeddings size, cohere embeddings default to 4096 with the large model</span>
COUNT = <span class="hljs-number">5000</span>  <span class="hljs-comment"># How many questions to embed and insert into Milvus</span>
BATCH_SIZE = <span class="hljs-number">96</span> <span class="hljs-comment"># How large of batches to use for embedding and insertion</span>
MILVUS_HOST = <span class="hljs-string">&#x27;localhost&#x27;</span>  <span class="hljs-comment"># Milvus server URI</span>
MILVUS_PORT = <span class="hljs-string">&#x27;19530&#x27;</span>
COHERE_API_KEY = <span class="hljs-string">&#x27;replace-this-with-the-cohere-api-key&#x27;</span>  <span class="hljs-comment"># API key obtained from Cohere</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 페이지에서 사용된 모델과 데이터 세트에 대해 자세히 알아보려면 <a href="https://cohere.ai/">co:here</a> 및 <a href="https://rajpurkar.github.io/SQuAD-explorer/">SQuAD를</a> 참조하세요.</p>
<h2 id="Prepare-the-dataset" class="common-anchor-header">데이터 세트 준비하기<button data-href="#Prepare-the-dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>이 예에서는 질문에 답하기 위한 진실 소스로 스탠포드 질문 답변 데이터 집합(SQuAD)을 사용하겠습니다. 이 데이터 세트는 JSON 파일 형태로 제공되며, <strong>판다를</strong> 사용하여 로드하겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Download the dataset</span>
dataset = pandas.read_json(FILE)

<span class="hljs-comment"># Clean up the dataset by grabbing all the question answer pairs</span>
simplified_records = []
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset[<span class="hljs-string">&#x27;data&#x27;</span>]:
    <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> x[<span class="hljs-string">&#x27;paragraphs&#x27;</span>]:
        <span class="hljs-keyword">for</span> z <span class="hljs-keyword">in</span> y[<span class="hljs-string">&#x27;qas&#x27;</span>]:
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(z[<span class="hljs-string">&#x27;answers&#x27;</span>]) != <span class="hljs-number">0</span>:
                simplified_records.append({<span class="hljs-string">&#x27;question&#x27;</span>: z[<span class="hljs-string">&#x27;question&#x27;</span>], <span class="hljs-string">&#x27;answer&#x27;</span>: z[<span class="hljs-string">&#x27;answers&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;text&#x27;</span>]})

<span class="hljs-comment"># Grab the amount of records based on COUNT</span>
simplified_records = pandas.DataFrame.from_records(simplified_records)
simplified_records = simplified_records.sample(n=<span class="hljs-built_in">min</span>(COUNT, <span class="hljs-built_in">len</span>(simplified_records)), random_state = <span class="hljs-number">42</span>)

<span class="hljs-comment"># Check the length of the cleaned dataset matches count</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(simplified_records))
<button class="copy-code-btn"></button></code></pre>
<p>출력은 데이터 세트의 레코드 수여야 합니다.</p>
<pre><code translate="no" class="language-shell">5000
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection" class="common-anchor-header">컬렉션 만들기<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Milvus와 이 사용 사례를 위한 데이터베이스 설정에 대해 다룹니다. Milvus 내에서 컬렉션을 설정하고 색인을 생성해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus Database</span>
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)

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
    <span class="hljs-string">&#x27;metric_type&#x27;</span>:<span class="hljs-string">&#x27;IP&#x27;</span>,
    <span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>:{<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>}
}
collection.create_index(field_name=<span class="hljs-string">&quot;original_question_embedding&quot;</span>, index_params=index_params)
collection.load()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 설정했으면 데이터 삽입을 시작해야 합니다. 이 작업은 다음 세 단계로 이루어집니다.</p>
<ul>
<li>데이터 읽기</li>
<li>원래 질문 삽입하기</li>
<li>Milvus에서 방금 만든 컬렉션에 데이터를 삽입합니다.</li>
</ul>
<p>이 예제에서는 데이터에 원본 질문, 원본 질문의 임베딩, 원본 질문에 대한 답변이 포함됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up a co:here client.</span>
cohere_client = cohere.Client(COHERE_API_KEY)

<span class="hljs-comment"># Extract embeddings from questions using Cohere</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed</span>(<span class="hljs-params">texts, input_type</span>):
    res = cohere_client.embed(texts, model=<span class="hljs-string">&#x27;embed-multilingual-v3.0&#x27;</span>, input_type=input_type)
    <span class="hljs-keyword">return</span> res.embeddings

<span class="hljs-comment"># Insert each question, answer, and qustion embedding</span>
total = pandas.DataFrame()
<span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(np.array_split(simplified_records, (COUNT/BATCH_SIZE) + <span class="hljs-number">1</span>)):
    questions = batch[<span class="hljs-string">&#x27;question&#x27;</span>].tolist()
    embeddings = embed(questions, <span class="hljs-string">&quot;search_document&quot;</span>)
    
    data = [
        {
            <span class="hljs-string">&#x27;original_question&#x27;</span>: x,
            <span class="hljs-string">&#x27;answer&#x27;</span>: batch[<span class="hljs-string">&#x27;answer&#x27;</span>].tolist()[i],
            <span class="hljs-string">&#x27;original_question_embedding&#x27;</span>: embeddings[i]
        } <span class="hljs-keyword">for</span> i, x <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(questions)
    ]

    collection.insert(data=data)

time.sleep(<span class="hljs-number">10</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Ask-questions" class="common-anchor-header">질문하기<button data-href="#Ask-questions" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 데이터가 Milvus 컬렉션에 삽입되면, 질문 문구를 가져와서 Cohere로 임베딩하고 컬렉션으로 검색하여 시스템에 질문할 수 있습니다.</p>
<div class="alert note">
<p>삽입 직후 데이터에 대한 검색은 색인되지 않은 데이터를 무차별 대입 방식으로 검색하기 때문에 속도가 약간 느릴 수 있습니다. 새 데이터가 자동으로 색인되면 검색 속도가 빨라집니다.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search the cluster for an answer to a question text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">text, top_k = <span class="hljs-number">5</span></span>):

    <span class="hljs-comment"># AUTOINDEX does not require any search params </span>
    search_params = {}

    results = collection.search(
        data = embed([text], <span class="hljs-string">&quot;search_query&quot;</span>),  <span class="hljs-comment"># Embeded the question</span>
        anns_field=<span class="hljs-string">&#x27;original_question_embedding&#x27;</span>,
        param=search_params,
        limit = top_k,  <span class="hljs-comment"># Limit to top_k results per search</span>
        output_fields=[<span class="hljs-string">&#x27;original_question&#x27;</span>, <span class="hljs-string">&#x27;answer&#x27;</span>]  <span class="hljs-comment"># Include the original question and answer in the result</span>
    )

    distances = results[<span class="hljs-number">0</span>].distances
    entities = [ x.entity.to_dict()[<span class="hljs-string">&#x27;entity&#x27;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>] ]

    ret = [ {
        <span class="hljs-string">&quot;answer&quot;</span>: x[<span class="hljs-number">1</span>][<span class="hljs-string">&quot;answer&quot;</span>],
        <span class="hljs-string">&quot;distance&quot;</span>: x[<span class="hljs-number">0</span>],
        <span class="hljs-string">&quot;original_question&quot;</span>: x[<span class="hljs-number">1</span>][<span class="hljs-string">&#x27;original_question&#x27;</span>]
    } <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(distances, entities)]

    <span class="hljs-keyword">return</span> ret

<span class="hljs-comment"># Ask these questions</span>
search_questions = [<span class="hljs-string">&#x27;What kills bacteria?&#x27;</span>, <span class="hljs-string">&#x27;What\&#x27;s the biggest dog?&#x27;</span>]

<span class="hljs-comment"># Print out the results in order of [answer, similarity score, original question]</span>

ret = [ { <span class="hljs-string">&quot;question&quot;</span>: x, <span class="hljs-string">&quot;candidates&quot;</span>: search(x) } <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_questions ]
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷할 것입니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;question&quot;: &quot;What kills bacteria?&quot;,</span>
<span class="hljs-comment">#         &quot;candidates&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;farming&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.6261022090911865,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;What makes bacteria resistant to antibiotic treatment?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;Phage therapy&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.6093736886978149,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;What has been talked about to treat resistant bacteria?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;oral contraceptives&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.5902313590049744,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;In therapy, what does the antibacterial interact with?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;slowing down the multiplication of bacteria or killing the bacteria&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.5874154567718506,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;How do antibiotics work?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;in intensive farming to promote animal growth&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.5667208433151245,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;Besides in treating human disease where else are antibiotics used?&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;question&quot;: &quot;What&#x27;s the biggest dog?&quot;,</span>
<span class="hljs-comment">#         &quot;candidates&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;English Mastiff&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.7875324487686157,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;What breed was the largest dog known to have lived?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;forest elephants&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.5886962413787842,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;What large animals reside in the national park?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;Rico&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.5634892582893372,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;What is the name of the dog that could ID over 200 things?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;Iditarod Trail Sled Dog Race&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.546872615814209,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;Which dog-sled race in Alaska is the most famous?&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;answer&quot;: &quot;part of the family&quot;,</span>
<span class="hljs-comment">#                 &quot;distance&quot;: 0.5387814044952393,</span>
<span class="hljs-comment">#                 &quot;original_question&quot;: &quot;Most people today describe their dogs as what?&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
