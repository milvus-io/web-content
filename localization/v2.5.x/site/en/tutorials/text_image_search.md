---
id: text_image_search.md
summary: >-
  In this tutorial, we will explore how to implement text-based image retrieval
  using OpenAI’s CLIP (Contrastive Language-Image Pretraining) model and Milvus.
  We will generate image embeddings with CLIP, store them in Milvus, and perform
  efficient similarity searches.
title: Text-to-Image Search with Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Text-to-Image Search with Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Text-to-image search is an advanced technology that allows users to search for images using natural language text descriptions. It leverages a pretrained multimodal model to convert both text and images into embeddings in a shared semantic space, enabling similarity-based comparisons.</p>
<p>In this tutorial, we will explore how to implement text-based image retrieval using OpenAI’s CLIP (Contrastive Language-Image Pretraining) model and Milvus. We will generate image embeddings with CLIP, store them in Milvus, and perform efficient similarity searches.</p>
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
    </button></h2><p>Before you start, make sure you have all the required packages and example data ready.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Install dependencies</h3><ul>
<li><strong>pymilvus>=2.4.2</strong> for interacting with the Milvus database</li>
<li><strong>clip</strong> for working with the CLIP model</li>
<li><strong>pillow</strong> for image processing and visualization</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you’re using Google Colab, you may need to <strong>restart the runtime</strong> (Navigate to the “Runtime” menu at the top of the interface, and select “Restart session” from the dropdown menu.)</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Download example data</h3><p>We will use a subset of the <a href="https://www.image-net.org">ImageNet</a> dataset (100 classes, 10 images for each class) as example images. The following command will download the example data and extract it to the local folder <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Set up Milvus</h3><p>Before proceeding, set up your Milvus server and connect using your URI (and optionally, a token):</p>
<ul>
<li><p><strong>Milvus Lite (Recommended for Convenience)</strong>: Set the URI to a local file, such as ./milvus.db. This automatically leverages <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in a single file.</p></li>
<li><p><strong>Docker or Kubernetes (For Large-Scale Data)</strong>: For handling larger datasets, deploy a more performant Milvus server using <a href="https://milvus.io/docs/quickstart.md">Docker or Kubernetes</a>. In this case, use the server URI, such as http://localhost:19530, to connect.</p></li>
<li><p><strong>Zilliz Cloud (Managed Service)</strong>: If you’re using <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, Milvus’s fully managed cloud service, set the the Public Endpoint as URI and API Key as token.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Getting Started<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that you have the necessary dependencies and data, it’s time to set up feature extractors and start working with Milvus. This section will walk you through the key steps of building a text-to-image search system. Finally, we’ll demonstrate how to retrieve and visualize images based on text queries.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Define feature extractors</h3><p>We will use a pretrained CLIP model to generate image and text embeddings. In this section, we load the pretrained <strong>ViT-B/32</strong> variant of CLIP and define helper functions for encoding image and text:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: Processes and encodes images into feature vectors</li>
<li><code translate="no">encode_text(text)</code>: Encodes text queries into feature vectors</li>
</ul>
<p>Both functions normalize the output features to ensure consistent comparisons by converting vectors to unit length, which is essential for accurate cosine similarity calculations.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> clip
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image


<span class="hljs-comment"># Load CLIP model</span>
model_name = <span class="hljs-string">&quot;ViT-B/32&quot;</span>
model, preprocess = clip.load(model_name)
model.<span class="hljs-built_in">eval</span>()


<span class="hljs-comment"># Define a function to encode images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">image_path</span>):
    image = preprocess(Image.<span class="hljs-built_in">open</span>(image_path)).unsqueeze(<span class="hljs-number">0</span>)
    image_features = model.encode_image(image)
    image_features /= image_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the image features</span>
    <span class="hljs-keyword">return</span> image_features.squeeze().tolist()


<span class="hljs-comment"># Define a function to encode text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">text</span>):
    text_tokens = clip.tokenize(text)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the text features</span>
    <span class="hljs-keyword">return</span> text_features.squeeze().tolist()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Ingestion" class="common-anchor-header">Data Ingestion</h3><p>To enable semantic image search, we first need to generate embeddings for all images and store them in a vector database for efficient indexing and retrieval. This section provides a step-by-step guide to ingesting image data into Milvus.</p>
<p><strong>1. Create Milvus Collection</strong></p>
<p>Before storing image embeddings, you need to create a Milvus collection. The following code demonstrates how to create a collection in a quick-setup mode with the default COSINE metric type. The collection includes the following fields:</p>
<ul>
<li><p><code translate="no">id</code>: A primary field with auto ID enabled.</p></li>
<li><p><code translate="no">vector</code>: A field for storing floating-point vector embeddings.</p></li>
</ul>
<p>If you need a custom schema, refer to the <a href="https://milvus.io/docs/create-collection.md">Milvus documentation</a> for detailed instructions.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;image_collection&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection in quickstart mode</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">512</span>,  <span class="hljs-comment"># this should match the dimension of the image embedding</span>
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># auto generate id and store in the id field</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable dynamic field for scalar fields</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>2. Insert Data into Milvus</strong></p>
<p>In this step, we use a predefined image encoder to generate embeddings for all JPEG images in the example data directory. These embeddings are then inserted into the Milvus collection, along with their corresponding file paths. Each entry in the collection consists of:</p>
<ul>
<li><strong>Embedding vector</strong>: The numerical representation of the image. Stored in the field <code translate="no">vector</code>.</li>
<li><strong>File path</strong>: The location of the image file for reference. Stored in the field <code translate="no">filepath</code> as a dynamic field.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


image_dir = <span class="hljs-string">&quot;./images_folder/train&quot;</span>
raw_data = []

<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> glob(os.path.join(image_dir, <span class="hljs-string">&quot;**/*.JPEG&quot;</span>)):
    image_embedding = encode_image(image_path)
    image_dict = {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filepath&quot;</span>: image_path}
    raw_data.append(image_dict)
insert_result = milvus_client.insert(collection_name=collection_name, data=raw_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Inserted&quot;</span>, insert_result[<span class="hljs-string">&quot;insert_count&quot;</span>], <span class="hljs-string">&quot;images into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 1000 images into Milvus.
</code></pre>
<h3 id="Peform-a-Search" class="common-anchor-header">Peform a Search</h3><p>Now, let’s run a search using an example text query. This will retrieve the most relevant images based on their semantic similarity to the given text description.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Visualize results:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display


width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

result_images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filepath&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        result_images.append(img)

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result_images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query text: <span class="hljs-subst">{query_text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSearch results:&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query text: a white dog

Search results:
</code></pre>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
    <span>png</span>
  </span>
</p>
