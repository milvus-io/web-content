---
id: integrate_with_voyageai.md
title: Семантический поиск с помощью Milvus и VoyageAI
summary: >-
  На этой странице рассматривается интеграция векторной базы данных с API
  встраивания VoyageAI.
---
<h1 id="Semantic-Search-with-Milvus-and-VoyageAI" class="common-anchor-header">Семантический поиск с помощью Milvus и VoyageAI<button data-href="#Semantic-Search-with-Milvus-and-VoyageAI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/semantic_search_with_milvus_and_voyageai.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/semantic_search_with_milvus_and_voyageai.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>В этом руководстве показано, как можно использовать <a href="https://docs.voyageai.com/docs/embeddings">VoyageAI's Embedding API</a> с векторной базой данных Milvus для проведения семантического поиска по тексту.</p>
<h2 id="Getting-started" class="common-anchor-header">Начало работы<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><p>Прежде чем начать, убедитесь, что у вас готов ключ Voyage API, или получите его на <a href="https://dash.voyageai.com/api-keys">сайте VoyageAI</a>.</p>
<p>В этом примере используются данные о названиях книг. Вы можете скачать набор данных <a href="https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks">здесь</a> и поместить его в ту же директорию, где вы запускаете следующий код.</p>
<p>Сначала установите пакет для Milvus и Voyage AI:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade voyageai pymilvus milvus-lite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, для включения только что установленных зависимостей вам, возможно, потребуется <strong>перезапустить среду выполнения</strong>. (Нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<p>После этого мы готовы к генерации вкраплений и использованию векторной базы данных для семантического поиска.</p>
<h2 id="Searching-book-titles-with-VoyageAI--Milvus" class="common-anchor-header">Поиск названий книг с помощью VoyageAI и Milvus<button data-href="#Searching-book-titles-with-VoyageAI--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем примере мы загружаем данные о названиях книг из загруженного CSV-файла, используем модель встраивания Voyage AI для генерации векторных представлений и сохраняем их в векторной базе данных Milvus для семантического поиска.</p>
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
<p>Что касается аргумента <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Установка <code translate="no">uri</code> в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, поскольку он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubernetes</a>. В этом случае используйте ури сервера, например<code translate="no">http://localhost:19530</code>, в качестве <code translate="no">uri</code>.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу Api</a> в Zilliz Cloud.</li>
</ul>
</div>
<p>Теперь, имея все данные в векторной базе Milvus, мы можем выполнять семантический поиск, генерируя векторные вкрапления для запроса и осуществляя векторный поиск.</p>
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
<h2 id="Searching-images-with-VoyageAI--Milvus" class="common-anchor-header">Поиск изображений с помощью VoyageAI и Milvus<button data-href="#Searching-images-with-VoyageAI--Milvus" class="anchor-icon" translate="no">
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
<p>Затем нам нужно подготовить входные данные для Milvus. Воспользуемся клиентом VoyageAI, который мы создали в предыдущей главе. Доступную модель мультимодального встраивания VoyageAI смотрите на этой <a href="https://docs.voyageai.com/docs/multimodal-embeddings">странице</a>.</p>
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
<p>Далее мы создадим соединение с базой данных Milvus и вставим в нее эмбеддинги.</p>
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
<p>Теперь мы готовы к поиску изображений. Здесь запрос - это строка, но мы можем запрашивать и изображения. (Мы используем matplotlib для отображения результатов.</p>
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
