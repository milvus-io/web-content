---
id: integrate_with_voyageai.md
title: Milvus와 VoyageAI를 사용한 시맨틱 검색
summary: 이 페이지에서는 벡터 데이터베이스와 VoyageAI의 임베딩 API의 통합에 대해 설명합니다.
---
<h1 id="Semantic-Search-with-Milvus-and-VoyageAI" class="common-anchor-header">Milvus와 VoyageAI를 사용한 시맨틱 검색<button data-href="#Semantic-Search-with-Milvus-and-VoyageAI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/semantic_search_with_milvus_and_voyageai.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/semantic_search_with_milvus_and_voyageai.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>이 가이드에서는 <a href="https://docs.voyageai.com/docs/embeddings">VoyageAI의 임베딩 API를</a> Milvus 벡터 데이터베이스와 함께 사용하여 텍스트에 대한 의미론적 검색을 수행하는 방법을 소개합니다.</p>
<h2 id="Getting-started" class="common-anchor-header">시작하기<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><p>시작하기 전에 Voyage API 키가 준비되어 있는지 확인하거나 <a href="https://dash.voyageai.com/api-keys">VoyageAI 웹사이트에서</a> 키를 받으세요.</p>
<p>이 예제에서 사용된 데이터는 책 제목입니다. <a href="https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks">여기에서</a> 데이터 세트를 다운로드하여 다음 코드를 실행하는 동일한 디렉터리에 넣을 수 있습니다.</p>
<p>먼저 Milvus 및 Voyage AI용 패키지를 설치합니다:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade voyageai pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속 요소를 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다. (화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택합니다.)</p>
</div>
<p>이제 임베딩을 생성하고 벡터 데이터베이스를 사용해 시맨틱 검색을 수행할 준비가 되었습니다.</p>
<h2 id="Searching-book-titles-with-VoyageAI--Milvus" class="common-anchor-header">VoyageAI 및 Milvus로 책 제목 검색하기<button data-href="#Searching-book-titles-with-VoyageAI--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제에서는 다운로드한 CSV 파일에서 책 제목 데이터를 로드하고, Voyage AI 임베딩 모델을 사용하여 벡터 표현을 생성한 다음, 의미 검색을 위해 Milvus 벡터 데이터베이스에 저장합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> voyageai
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

MODEL_NAME = <span class="hljs-string">&quot;voyage-law-2&quot;</span>  <span class="hljs-comment"># Which model to use, please check https://docs.voyageai.com/docs/embeddings for available models</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># Dimension of vector embedding</span>

<span class="hljs-comment"># Connect to VoyageAI with API Key.</span>
voyage_client = voyageai.Client(api_key=<span class="hljs-string">&quot;&lt;YOUR_VOYAGEAI_API_KEY&gt;&quot;</span>)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

vectors = voyage_client.embed(texts=docs, model=MODEL_NAME, truncation=<span class="hljs-literal">False</span>).embeddings

<span class="hljs-comment"># Prepare data to be stored in Milvus vector database.</span>
<span class="hljs-comment"># We can store the id, vector representation, raw text and labels such as &quot;subject&quot; in this case in Milvus.</span>
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]


<span class="hljs-comment"># Connect to Milvus, all data is stored in a local file named &quot;milvus_voyage_demo.db&quot;</span>
<span class="hljs-comment"># in current directory. You can also connect to a remote Milvus server following this</span>
<span class="hljs-comment"># instruction: https://milvus.io/docs/install_standalone-docker.md.</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus_voyage_demo.db&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;demo_collection&quot;</span>  <span class="hljs-comment"># Milvus collection name</span>
<span class="hljs-comment"># Create a collection to store the vectors and text.</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

<span class="hljs-comment"># Insert all data into Milvus vector database.</span>
res = milvus_client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&quot;insert_count&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusClient</code> 의 인수는 다음과 같습니다:</p>
<ul>
<li><code translate="no">uri</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>데이터 규모가 큰 경우, <a href="https://milvus.io/docs/quickstart.md">도커나 쿠버네티스에</a> 더 고성능의 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 <code translate="no">uri</code> 으로 사용하세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 을 조정하세요.</li>
</ul>
</div>
<p>이제 밀버스 벡터 데이터베이스에 있는 모든 데이터로 쿼리에 대한 벡터 임베딩을 생성하여 시맨틱 검색을 수행하고 벡터 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded?&quot;</span>]

query_vectors = voyage_client.embed(
    texts=queries, model=MODEL_NAME, truncation=<span class="hljs-literal">False</span>
).embeddings

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># target collection</span>
    data=query_vectors,  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">2</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)

<span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, q)
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res:
        <span class="hljs-built_in">print</span>(result)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: When was artificial intelligence founded?
[{'id': 0, 'distance': 0.7196218371391296, 'entity': {'text': 'Artificial intelligence was founded as an academic discipline in 1956.', 'subject': 'history'}}, {'id': 1, 'distance': 0.6297335028648376, 'entity': {'text': 'Alan Turing was the first person to conduct substantial research in AI.', 'subject': 'history'}}]
</code></pre>
<h2 id="Searching-images-with-VoyageAI--Milvus" class="common-anchor-header">VoyageAI &amp; Milvus로 이미지 검색하기<button data-href="#Searching-images-with-VoyageAI--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> base64
<span class="hljs-keyword">import</span> voyageai
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> urllib.request
<span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO
<span class="hljs-keyword">import</span> urllib.request
<span class="hljs-keyword">import</span> fitz  <span class="hljs-comment"># PyMuPDF</span>
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">pdf_url_to_screenshots</span>(<span class="hljs-params">url: <span class="hljs-built_in">str</span>, zoom: <span class="hljs-built_in">float</span> = <span class="hljs-number">1.0</span></span>) -&gt; <span class="hljs-built_in">list</span>[Image]:

    <span class="hljs-comment"># Ensure that the URL is valid</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> url.startswith(<span class="hljs-string">&quot;http&quot;</span>) <span class="hljs-keyword">and</span> url.endswith(<span class="hljs-string">&quot;.pdf&quot;</span>):
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;Invalid URL&quot;</span>)

    <span class="hljs-comment"># Read the PDF from the specified URL</span>
    <span class="hljs-keyword">with</span> urllib.request.urlopen(url) <span class="hljs-keyword">as</span> response:
        pdf_data = response.read()
    pdf_stream = BytesIO(pdf_data)
    pdf = fitz.<span class="hljs-built_in">open</span>(stream=pdf_stream, filetype=<span class="hljs-string">&quot;pdf&quot;</span>)

    images = []

    <span class="hljs-comment"># Loop through each page, render as pixmap, and convert to PIL Image</span>
    mat = fitz.Matrix(zoom, zoom)
    <span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pdf.page_count):
        pix = pdf[n].get_pixmap(matrix=mat)

        <span class="hljs-comment"># Convert pixmap to PIL Image</span>
        img = Image.frombytes(<span class="hljs-string">&quot;RGB&quot;</span>, [pix.width, pix.height], pix.samples)
        images.append(img)

    <span class="hljs-comment"># Close the document</span>
    pdf.close()

    <span class="hljs-keyword">return</span> images


<span class="hljs-keyword">def</span> <span class="hljs-title function_">image_to_base64</span>(<span class="hljs-params">image</span>):
    buffered = BytesIO()
    image.save(buffered, <span class="hljs-built_in">format</span>=<span class="hljs-string">&quot;JPEG&quot;</span>)
    img_str = base64.b64encode(buffered.getvalue())
    <span class="hljs-keyword">return</span> img_str.decode(<span class="hljs-string">&quot;utf-8&quot;</span>)

DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># Dimension of vector embedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>이제 Milvus를 위한 입력 데이터를 준비해야 합니다. 이전 장에서 만든 VoyageAI 클라이언트를 재사용해 보겠습니다. 사용 가능한 VoyageAI 멀티모달 임베딩 모델은 이 <a href="https://docs.voyageai.com/docs/multimodal-embeddings">페이지에서</a> 확인하세요.</p>
<pre><code translate="no" class="language-python">pages = pdf_url_to_screenshots(<span class="hljs-string">&quot;https://www.fdrlibrary.org/documents/356632/390886/readingcopy.pdf&quot;</span>, zoom=<span class="hljs-number">3.0</span>)
inputs = [[img] <span class="hljs-keyword">for</span> img <span class="hljs-keyword">in</span> pages]

vectors = client.multimodal_embed(inputs, model=<span class="hljs-string">&quot;voyage-multimodal-3&quot;</span>)

inputs = [i[<span class="hljs-number">0</span>] <span class="hljs-keyword">if</span> <span class="hljs-built_in">isinstance</span>(i[<span class="hljs-number">0</span>], <span class="hljs-built_in">str</span>) <span class="hljs-keyword">else</span> image_to_base64(i[<span class="hljs-number">0</span>]) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> inputs]
<span class="hljs-comment"># Prepare data to be stored in Milvus vector database.</span>
<span class="hljs-comment"># We can store the id, vector representation, raw text and labels such as &quot;subject&quot; in this case in Milvus.</span>
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors.embeddings[i], <span class="hljs-string">&quot;data&quot;</span>: inputs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;fruits&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(inputs))
]
<button class="copy-code-btn"></button></code></pre>
<p>다음으로 Milvus 데이터베이스 연결을 생성하고 임베딩을 Milvus 데이터베이스에 삽입합니다.</p>
<pre><code translate="no" class="language-python">milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus_voyage_multi_demo.db&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;demo_collection&quot;</span>  <span class="hljs-comment"># Milvus collection name</span>
<span class="hljs-comment"># Create a collection to store the vectors and text.</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

<span class="hljs-comment"># Insert all data into Milvus vector database.</span>
res = milvus_client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&quot;insert_count&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>이제 이미지를 검색할 준비가 되었습니다. 여기서 쿼리는 문자열이지만 이미지로도 쿼리할 수 있습니다. ( <a href="https://docs.voyageai.com/docs/multimodal-embeddings">여기에서</a> 멀티모달 API에 대한 설명서를 확인하세요.) 결과 이미지를 표시하기 위해 matplotlib를 사용합니다.</p>
<pre><code translate="no" class="language-python">queries = [[<span class="hljs-string">&quot;The consequences of a dictator&#x27;s peace&quot;</span>]]

query_vectors = client.multimodal_embed(
    inputs=queries, model=<span class="hljs-string">&quot;voyage-multimodal-3&quot;</span>, truncation=<span class="hljs-literal">False</span>
).embeddings

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># target collection</span>
    data=query_vectors,  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">4</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;data&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)

<span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, q)
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res:
        fig, axes = plt.subplots(<span class="hljs-number">1</span>, <span class="hljs-built_in">len</span>(result), figsize=(<span class="hljs-number">66</span>, <span class="hljs-number">6</span>))
        <span class="hljs-keyword">for</span> n, page <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result):
            page_num = page[<span class="hljs-string">&#x27;id&#x27;</span>]
            axes[n].imshow(pages[page_num])
            axes[n].axis(<span class="hljs-string">&quot;off&quot;</span>)

    plt.tight_layout()
    plt.show()
<button class="copy-code-btn"></button></code></pre>
