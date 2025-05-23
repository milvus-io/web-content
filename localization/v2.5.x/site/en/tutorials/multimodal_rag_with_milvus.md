---
id: multimodal_rag_with_milvus.md
summary: Multimodal RAG with Milvus
title: Multimodal RAG with Milvus
---
<h1 id="Multimodal-RAG-with-Milvus" class="common-anchor-header">Multimodal RAG with Milvus<button data-href="#Multimodal-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/multimodal_rag_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/multimodal_rag_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>If you want to experience the final effect of this tutorial, you can go directly to <a href="https://demos.milvus.io/multimodal-image-search/">online demo</a> and try it out.</p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/tutorials/quickstart/apps/multimodal_rag_with_milvus/pics/step3.jpg
"/></p>
<p>This tutorial showcases the multimodal RAG powered by Milvus, <a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/visual">Visualized BGE model</a>, and <a href="https://openai.com/index/hello-gpt-4o/">GPT-4o</a>. With this system, users are able to upload an image and edit text instructions, which are processed by BGE’s composed retrieval model to search for candidate images. GPT-4o then acts as a reranker, selecting the most suitable image and providing the rationale behind the choice. This powerful combination enables a seamless and intuitive image search experience, leveraging Milvus for efficient retrieval, BGE model for precise image processing and matching, and GPT-4o for advanced reranking.</p>
<h2 id="Preparation" class="common-anchor-header">Preparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-Dependencies" class="common-anchor-header">Install Dependencies</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai datasets opencv-python timm einops ftfy peft tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/FlagOpen/FlagEmbedding.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -e FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</div>
<h3 id="Download-Data" class="common-anchor-header">Download Data</h3><p>The following command will download the example data and extract to a local folder “./images_folder” including:</p>
<ul>
<li><p><strong>images</strong>: A subset of <a href="https://github.com/hyp1231/AmazonReviews2023">Amazon Reviews 2023</a> containing approximately 900 images from the categories "Appliance", "Cell_Phones_and_Accessories", and "Electronics".</p></li>
<li><p><strong>leopard.jpg</strong>: An example query image.</p></li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/bootcamp/releases/download/data/amazon_reviews_2023_subset.tar.gz</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">tar -xzf amazon_reviews_2023_subset.tar.gz</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-Embedding-Model" class="common-anchor-header">Load Embedding Model</h3><p>We will use the Visualized BGE model “bge-visualized-base-en-v1.5” to generate embeddings for both images and text.</p>
<p><strong>1. Download weight</strong></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://huggingface.co/BAAI/bge-visualized/resolve/main/Visualized_base_en_v1.5.pth</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>2. Build encoder</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> FlagEmbedding.visual.modeling <span class="hljs-keyword">import</span> Visualized_BGE


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Encoder</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, model_name: <span class="hljs-built_in">str</span>, model_path: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.model = Visualized_BGE(model_name_bge=model_name, model_weight=model_path)
        <span class="hljs-variable language_">self</span>.model.<span class="hljs-built_in">eval</span>()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_query</span>(<span class="hljs-params">self, image_path: <span class="hljs-built_in">str</span>, text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">float</span>]:
        <span class="hljs-keyword">with</span> torch.no_grad():
            query_emb = <span class="hljs-variable language_">self</span>.model.encode(image=image_path, text=text)
        <span class="hljs-keyword">return</span> query_emb.tolist()[<span class="hljs-number">0</span>]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">self, image_path: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">float</span>]:
        <span class="hljs-keyword">with</span> torch.no_grad():
            query_emb = <span class="hljs-variable language_">self</span>.model.encode(image=image_path)
        <span class="hljs-keyword">return</span> query_emb.tolist()[<span class="hljs-number">0</span>]


model_name = <span class="hljs-string">&quot;BAAI/bge-base-en-v1.5&quot;</span>
model_path = <span class="hljs-string">&quot;./Visualized_base_en_v1.5.pth&quot;</span>  <span class="hljs-comment"># Change to your own value if using a different model path</span>
encoder = Encoder(model_name, model_path)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Data" class="common-anchor-header">Load Data<button data-href="#Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>This section will load example images into the database with corresponding embeddings.</p>
<h3 id="Generate-embeddings" class="common-anchor-header">Generate embeddings</h3><p>Load all jpeg images from the data directory and apply the encoder to convert images to embeddings.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


<span class="hljs-comment"># Generate embeddings for the image dataset</span>
data_dir = (
    <span class="hljs-string">&quot;./images_folder&quot;</span>  <span class="hljs-comment"># Change to your own value if using a different data directory</span>
)
image_list = glob(
    os.path.join(data_dir, <span class="hljs-string">&quot;images&quot;</span>, <span class="hljs-string">&quot;*.jpg&quot;</span>)
)  <span class="hljs-comment"># We will only use images ending with &quot;.jpg&quot;</span>
image_dict = {}
<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> tqdm(image_list, desc=<span class="hljs-string">&quot;Generating image embeddings: &quot;</span>):
    <span class="hljs-keyword">try</span>:
        image_dict[image_path] = encoder.encode_image(image_path)
    <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> e:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Failed to generate embedding for <span class="hljs-subst">{image_path}</span>. Skipped.&quot;</span>)
        <span class="hljs-keyword">continue</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of encoded images:&quot;</span>, <span class="hljs-built_in">len</span>(image_dict))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Generating image embeddings: 100%|██████████| 900/900 [00:20&lt;00:00, 44.08it/s]

Number of encoded images: 900
</code></pre>
<h3 id="Insert-into-Milvus" class="common-anchor-header">Insert into Milvus</h3><p>Insert images with corresponding paths and embeddings into Milvus collection.</p>
<div class="alert note">
<p>As for the argument of <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Setting the <code translate="no">uri</code> as a local file, e.g. <code translate="no">./milvus_demo.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>If you have large scale of data, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">docker or kubernetes</a>. In this setup, please use the server uri, e.g.<code translate="no">http://localhost:19530</code>, as your <code translate="no">uri</code>.</li>
<li>If you want to use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and Api key</a> in Zilliz Cloud.</li>
</ul>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


dim = <span class="hljs-built_in">len</span>(<span class="hljs-built_in">list</span>(image_dict.values())[<span class="hljs-number">0</span>])
collection_name = <span class="hljs-string">&quot;multimodal_rag_demo&quot;</span>

<span class="hljs-comment"># Connect to Milvus client given URI</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

<span class="hljs-comment"># Create Milvus Collection</span>
<span class="hljs-comment"># By default, vector field name is &quot;vector&quot;</span>
milvus_client.create_collection(
    collection_name=collection_name,
    auto_id=<span class="hljs-literal">True</span>,
    dimension=dim,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Insert data into collection</span>
milvus_client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;image_path&quot;</span>: k, <span class="hljs-string">&quot;vector&quot;</span>: v} <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> image_dict.items()],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'insert_count': 900,
 'ids': [451537887696781312, 451537887696781313, ..., 451537887696782211],
 'cost': 0}
</code></pre>
<h2 id="Multimodal-Search-with-Generative-Reranker" class="common-anchor-header">Multimodal Search with Generative Reranker<button data-href="#Multimodal-Search-with-Generative-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>In this section, we will firstly search for relevant images by a multimodal query and then use LLM service to rerank the results and find the best one with explanation.</p>
<h3 id="Run-search" class="common-anchor-header">Run search</h3><p>Now we are ready to perform the advanced image search with query data composed of both image and text instruction.</p>
<pre><code translate="no" class="language-python">query_image = os.path.join(
    data_dir, <span class="hljs-string">&quot;leopard.jpg&quot;</span>
)  <span class="hljs-comment"># Change to your own query image path</span>
query_text = <span class="hljs-string">&quot;phone case with this image theme&quot;</span>

<span class="hljs-comment"># Generate query embedding given image and text instructions</span>
query_vec = encoder.encode_query(image_path=query_image, text=query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_vec],
    output_fields=[<span class="hljs-string">&quot;image_path&quot;</span>],
    limit=<span class="hljs-number">9</span>,  <span class="hljs-comment"># Max number of search results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Search parameters</span>
)[<span class="hljs-number">0</span>]

retrieved_images = [hit.get(<span class="hljs-string">&quot;entity&quot;</span>).get(<span class="hljs-string">&quot;image_path&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> search_results]
<span class="hljs-built_in">print</span>(retrieved_images)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['./images_folder/images/518Gj1WQ-RL._AC_.jpg', './images_folder/images/41n00AOfWhL._AC_.jpg', './images_folder/images/51Wqge9HySL._AC_.jpg', './images_folder/images/51R2SZiywnL._AC_.jpg', './images_folder/images/516PebbMAcL._AC_.jpg', './images_folder/images/51RrgfYKUfL._AC_.jpg', './images_folder/images/515DzQVKKwL._AC_.jpg', './images_folder/images/51BsgVw6RhL._AC_.jpg', './images_folder/images/51INtcXu9FL._AC_.jpg']
</code></pre>
<h3 id="Rerank-with-GPT-4o" class="common-anchor-header">Rerank with GPT-4o</h3><p>We will use an LLM to rank images and generate an explanation for the best result based on the user query and retrieved results.</p>
<p><strong>1. Create a panoramic view</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> cv2

img_height = <span class="hljs-number">300</span>
img_width = <span class="hljs-number">300</span>
row_count = <span class="hljs-number">3</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_panoramic_view</span>(<span class="hljs-params">query_image_path: <span class="hljs-built_in">str</span>, retrieved_images: <span class="hljs-built_in">list</span></span>) -&gt; np.ndarray:
    <span class="hljs-string">&quot;&quot;&quot;
    creates a 5x5 panoramic view image from a list of images

    args:
        images: list of images to be combined

    returns:
        np.ndarray: the panoramic view image
    &quot;&quot;&quot;</span>
    panoramic_width = img_width * row_count
    panoramic_height = img_height * row_count
    panoramic_image = np.full(
        (panoramic_height, panoramic_width, <span class="hljs-number">3</span>), <span class="hljs-number">255</span>, dtype=np.uint8
    )

    <span class="hljs-comment"># create and resize the query image with a blue border</span>
    query_image_null = np.full((panoramic_height, img_width, <span class="hljs-number">3</span>), <span class="hljs-number">255</span>, dtype=np.uint8)
    query_image = Image.<span class="hljs-built_in">open</span>(query_image_path).convert(<span class="hljs-string">&quot;RGB&quot;</span>)
    query_array = np.array(query_image)[:, :, ::-<span class="hljs-number">1</span>]
    resized_image = cv2.resize(query_array, (img_width, img_height))

    border_size = <span class="hljs-number">10</span>
    blue = (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)  <span class="hljs-comment"># blue color in BGR</span>
    bordered_query_image = cv2.copyMakeBorder(
        resized_image,
        border_size,
        border_size,
        border_size,
        border_size,
        cv2.BORDER_CONSTANT,
        value=blue,
    )

    query_image_null[img_height * <span class="hljs-number">2</span> : img_height * <span class="hljs-number">3</span>, <span class="hljs-number">0</span>:img_width] = cv2.resize(
        bordered_query_image, (img_width, img_height)
    )

    <span class="hljs-comment"># add text &quot;query&quot; below the query image</span>
    text = <span class="hljs-string">&quot;query&quot;</span>
    font_scale = <span class="hljs-number">1</span>
    font_thickness = <span class="hljs-number">2</span>
    text_org = (<span class="hljs-number">10</span>, img_height * <span class="hljs-number">3</span> + <span class="hljs-number">30</span>)
    cv2.putText(
        query_image_null,
        text,
        text_org,
        cv2.FONT_HERSHEY_SIMPLEX,
        font_scale,
        blue,
        font_thickness,
        cv2.LINE_AA,
    )

    <span class="hljs-comment"># combine the rest of the images into the panoramic view</span>
    retrieved_imgs = [
        np.array(Image.<span class="hljs-built_in">open</span>(img).convert(<span class="hljs-string">&quot;RGB&quot;</span>))[:, :, ::-<span class="hljs-number">1</span>] <span class="hljs-keyword">for</span> img <span class="hljs-keyword">in</span> retrieved_images
    ]
    <span class="hljs-keyword">for</span> i, image <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(retrieved_imgs):
        image = cv2.resize(image, (img_width - <span class="hljs-number">4</span>, img_height - <span class="hljs-number">4</span>))
        row = i // row_count
        col = i % row_count
        start_row = row * img_height
        start_col = col * img_width

        border_size = <span class="hljs-number">2</span>
        bordered_image = cv2.copyMakeBorder(
            image,
            border_size,
            border_size,
            border_size,
            border_size,
            cv2.BORDER_CONSTANT,
            value=(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>),
        )
        panoramic_image[
            start_row : start_row + img_height, start_col : start_col + img_width
        ] = bordered_image

        <span class="hljs-comment"># add red index numbers to each image</span>
        text = <span class="hljs-built_in">str</span>(i)
        org = (start_col + <span class="hljs-number">50</span>, start_row + <span class="hljs-number">30</span>)
        (font_width, font_height), baseline = cv2.getTextSize(
            text, cv2.FONT_HERSHEY_SIMPLEX, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>
        )

        top_left = (org[<span class="hljs-number">0</span>] - <span class="hljs-number">48</span>, start_row + <span class="hljs-number">2</span>)
        bottom_right = (org[<span class="hljs-number">0</span>] - <span class="hljs-number">48</span> + font_width + <span class="hljs-number">5</span>, org[<span class="hljs-number">1</span>] + baseline + <span class="hljs-number">5</span>)

        cv2.rectangle(
            panoramic_image, top_left, bottom_right, (<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>), cv2.FILLED
        )
        cv2.putText(
            panoramic_image,
            text,
            (start_col + <span class="hljs-number">10</span>, start_row + <span class="hljs-number">30</span>),
            cv2.FONT_HERSHEY_SIMPLEX,
            <span class="hljs-number">1</span>,
            (<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>),
            <span class="hljs-number">2</span>,
            cv2.LINE_AA,
        )

    <span class="hljs-comment"># combine the query image with the panoramic view</span>
    panoramic_image = np.hstack([query_image_null, panoramic_image])
    <span class="hljs-keyword">return</span> panoramic_image
<button class="copy-code-btn"></button></code></pre>
<p>Combine the query image and retrieved images with indices in a panoramic view.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image

combined_image_path = os.path.join(data_dir, <span class="hljs-string">&quot;combined_image.jpg&quot;</span>)
panoramic_image = create_panoramic_view(query_image, retrieved_images)
cv2.imwrite(combined_image_path, panoramic_image)

combined_image = Image.<span class="hljs-built_in">open</span>(combined_image_path)
show_combined_image = combined_image.resize((<span class="hljs-number">300</span>, <span class="hljs-number">300</span>))
show_combined_image.show()
<button class="copy-code-btn"></button></code></pre>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/multimodal_rag_with_milvus_22_0.png" alt="Create a panoramic view" class="doc-image" id="create-a-panoramic-view" />
    <span>Create a panoramic view</span>
  </span>
</p>
<p><strong>2. Rerank and explain</strong></p>
<p>We will send the combined image to multimodal LLM service together with proper prompts to rank the retrieved results with explanation. To enable GPT-4o as the LLM, you need to prepare your <a href="https://platform.openai.com/docs/quickstart">OpenAI API Key</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> base64

openai_api_key = <span class="hljs-string">&quot;sk-***&quot;</span>  <span class="hljs-comment"># Change to your OpenAI API Key</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_ranking_explanation</span>(<span class="hljs-params">
    combined_image_path: <span class="hljs-built_in">str</span>, caption: <span class="hljs-built_in">str</span>, infos: <span class="hljs-built_in">dict</span> = <span class="hljs-literal">None</span>
</span>) -&gt; <span class="hljs-built_in">tuple</span>[<span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], <span class="hljs-built_in">str</span>]:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(combined_image_path, <span class="hljs-string">&quot;rb&quot;</span>) <span class="hljs-keyword">as</span> image_file:
        base64_image = base64.b64encode(image_file.read()).decode(<span class="hljs-string">&quot;utf-8&quot;</span>)

    information = (
        <span class="hljs-string">&quot;You are responsible for ranking results for a Composed Image Retrieval. &quot;</span>
        <span class="hljs-string">&quot;The user retrieves an image with an &#x27;instruction&#x27; indicating their retrieval intent. &quot;</span>
        <span class="hljs-string">&quot;For example, if the user queries a red car with the instruction &#x27;change this car to blue,&#x27; a similar type of car in blue would be ranked higher in the results. &quot;</span>
        <span class="hljs-string">&quot;Now you would receive instruction and query image with blue border. Every item has its red index number in its top left. Do not misunderstand it. &quot;</span>
        <span class="hljs-string">f&quot;User instruction: <span class="hljs-subst">{caption}</span> \n\n&quot;</span>
    )

    <span class="hljs-comment"># add additional information for each image</span>
    <span class="hljs-keyword">if</span> infos:
        <span class="hljs-keyword">for</span> i, info <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(infos[<span class="hljs-string">&quot;product&quot;</span>]):
            information += <span class="hljs-string">f&quot;<span class="hljs-subst">{i}</span>. <span class="hljs-subst">{info}</span>\n&quot;</span>

    information += (
        <span class="hljs-string">&quot;Provide a new ranked list of indices from most suitable to least suitable, followed by an explanation for the top 1 most suitable item only. &quot;</span>
        <span class="hljs-string">&quot;The format of the response has to be &#x27;Ranked list: []&#x27; with the indices in brackets as integers, followed by &#x27;Reasons:&#x27; plus the explanation why this most fit user&#x27;s query intent.&quot;</span>
    )

    headers = {
        <span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>,
        <span class="hljs-string">&quot;Authorization&quot;</span>: <span class="hljs-string">f&quot;Bearer <span class="hljs-subst">{openai_api_key}</span>&quot;</span>,
    }

    payload = {
        <span class="hljs-string">&quot;model&quot;</span>: <span class="hljs-string">&quot;gpt-4o&quot;</span>,
        <span class="hljs-string">&quot;messages&quot;</span>: [
            {
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;content&quot;</span>: [
                    {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>: information},
                    {
                        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;image_url&quot;</span>,
                        <span class="hljs-string">&quot;image_url&quot;</span>: {<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">f&quot;data:image/jpeg;base64,<span class="hljs-subst">{base64_image}</span>&quot;</span>},
                    },
                ],
            }
        ],
        <span class="hljs-string">&quot;max_tokens&quot;</span>: <span class="hljs-number">300</span>,
    }

    response = requests.post(
        <span class="hljs-string">&quot;https://api.openai.com/v1/chat/completions&quot;</span>, headers=headers, json=payload
    )
    result = response.json()[<span class="hljs-string">&quot;choices&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;message&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>]

    <span class="hljs-comment"># parse the ranked indices from the response</span>
    start_idx = result.find(<span class="hljs-string">&quot;[&quot;</span>)
    end_idx = result.find(<span class="hljs-string">&quot;]&quot;</span>)
    ranked_indices_str = result[start_idx + <span class="hljs-number">1</span> : end_idx].split(<span class="hljs-string">&quot;,&quot;</span>)
    ranked_indices = [<span class="hljs-built_in">int</span>(index.strip()) <span class="hljs-keyword">for</span> index <span class="hljs-keyword">in</span> ranked_indices_str]

    <span class="hljs-comment"># extract explanation</span>
    explanation = result[end_idx + <span class="hljs-number">1</span> :].strip()

    <span class="hljs-keyword">return</span> ranked_indices, explanation
<button class="copy-code-btn"></button></code></pre>
<p>Get the image indices after ranking and the reason for the best result:</p>
<pre><code translate="no" class="language-python">ranked_indices, explanation = generate_ranking_explanation(
    combined_image_path, query_text
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>3. Display the best result with explanation</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(explanation)

best_index = ranked_indices[<span class="hljs-number">0</span>]
best_img = Image.<span class="hljs-built_in">open</span>(retrieved_images[best_index])
best_img = best_img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
best_img.show()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Reasons: The most suitable item for the user's query intent is index 6 because the instruction specifies a phone case with the theme of the image, which is a leopard. The phone case with index 6 has a thematic design resembling the leopard pattern, making it the closest match to the user's request for a phone case with the image theme.
</code></pre>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/multimodal_rag_with_milvus_28_1.png" alt="The best result" class="doc-image" id="the-best-result" />
    <span>The best result</span>
  </span>
</p>
<h3 id="Quick-Deploy" class="common-anchor-header">Quick Deploy</h3><p>To learn about how to start an online demo with this tutorial, please refer to <a href="https://github.com/milvus-io/bootcamp/tree/master/tutorials/quickstart/apps/multimodal_rag_with_milvus">the example application</a>.</p>
