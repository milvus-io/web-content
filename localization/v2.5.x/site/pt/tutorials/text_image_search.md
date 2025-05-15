---
id: text_image_search.md
summary: >-
  Neste tutorial, vamos explorar como implementar a recuperação de imagens
  baseadas em texto usando o modelo CLIP (Contrastive Language-Image
  Pretraining) da OpenAI e o Milvus. Iremos gerar embeddings de imagens com o
  CLIP, armazená-las no Milvus e efetuar pesquisas de semelhança eficientes.
title: Pesquisa de texto para imagem com Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Pesquisa de texto para imagem com Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>A pesquisa de texto para imagem é uma tecnologia avançada que permite aos utilizadores pesquisar imagens utilizando descrições de texto em linguagem natural. Utiliza um modelo multimodal pré-treinado para converter texto e imagens em embeddings num espaço semântico partilhado, permitindo comparações baseadas em semelhanças.</p>
<p>Neste tutorial, vamos explorar como implementar a recuperação de imagens baseadas em texto usando o modelo CLIP (Contrastive Language-Image Pretraining) da OpenAI e o Milvus. Vamos gerar embeddings de imagens com o CLIP, armazená-los no Milvus e realizar pesquisas de similaridade eficientes.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de começar, certifique-se de que tem todos os pacotes necessários e dados de exemplo prontos.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Instale as dependências</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> para interagir com a base de dados Milvus</li>
<li><strong>clip</strong> para trabalhar com o modelo CLIP</li>
<li><strong>pillow</strong> para processamento e visualização de imagens</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, poderá ter de <strong>reiniciar o tempo de execução</strong> (navegue até ao menu "Tempo de execução" na parte superior da interface e selecione "Reiniciar sessão" no menu pendente).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Descarregar dados de exemplo</h3><p>Iremos utilizar um subconjunto do conjunto de dados <a href="https://www.image-net.org">ImageNet</a> (100 classes, 10 imagens para cada classe) como imagens de exemplo. O comando seguinte descarrega os dados de exemplo e extrai-os para a pasta local <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Configurar o Milvus</h3><p>Antes de continuar, configure o seu servidor Milvus e ligue-se utilizando o seu URI (e, opcionalmente, um token):</p>
<ul>
<li><p><strong>Milvus Lite (recomendado por conveniência)</strong>: Defina o URI para um ficheiro local, como ./milvus.db. Isso aproveita automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados em um único arquivo.</p></li>
<li><p><strong>Docker ou Kubernetes (para dados em grande escala)</strong>: Para lidar com conjuntos de dados maiores, implante um servidor Milvus de melhor desempenho usando <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Neste caso, utilize o URI do servidor, como http://localhost:19530, para se ligar.</p></li>
<li><p><strong>Zilliz Cloud (Serviço Gerido)</strong>: Se estiver a utilizar o <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, o serviço de nuvem totalmente gerido do Milvus, defina o Public Endpoint como URI e a API Key como token.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Começar a utilizar<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora que tem as dependências e os dados necessários, está na altura de configurar os extractores de caraterísticas e começar a trabalhar com o Milvus. Esta secção irá guiá-lo através dos principais passos da construção de um sistema de pesquisa de texto para imagem. Por fim, demonstraremos como recuperar e visualizar imagens com base em consultas de texto.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Definir extractores de caraterísticas</h3><p>Utilizaremos um modelo CLIP pré-treinado para gerar embeddings de imagem e texto. Nesta secção, carregamos a variante <strong>ViT-B/32</strong> pré-treinada do CLIP e definimos funções auxiliares para codificar imagem e texto:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: Processa e codifica imagens em vectores de caraterísticas</li>
<li><code translate="no">encode_text(text)</code>: Codifica consultas de texto em vectores de caraterísticas</li>
</ul>
<p>Ambas as funções normalizam as caraterísticas de saída para garantir comparações consistentes, convertendo os vectores para comprimento unitário, o que é essencial para cálculos precisos de semelhança de cosseno.</p>
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
<h3 id="Data-Ingestion" class="common-anchor-header">Ingestão de dados</h3><p>Para permitir a pesquisa semântica de imagens, precisamos primeiro de gerar embeddings para todas as imagens e armazená-las numa base de dados de vectores para uma indexação e recuperação eficientes. Esta secção fornece um guia passo-a-passo para ingerir dados de imagens no Milvus.</p>
<p><strong>1. Criar uma coleção Milvus</strong></p>
<p>Antes de armazenar os embeddings de imagens, é necessário criar uma coleção Milvus. O código seguinte demonstra como criar uma coleção num modo de configuração rápida com o tipo de métrica COSINE predefinido. A coleção inclui os seguintes campos:</p>
<ul>
<li><p><code translate="no">id</code>: Um campo primário com a ID automática activada.</p></li>
<li><p><code translate="no">vector</code>: Um campo para armazenar as incorporações de vectores de vírgula flutuante.</p></li>
</ul>
<p>Se precisar de um esquema personalizado, consulte a <a href="https://milvus.io/docs/create-collection.md">documentação do Milvus</a> para obter instruções detalhadas.</p>
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
<p><strong>2. Inserir dados no Milvus</strong></p>
<p>Neste passo, usamos um codificador de imagem predefinido para gerar embeddings para todas as imagens JPEG no diretório de dados de exemplo. Estes embeddings são depois inseridos na coleção do Milvus, juntamente com os caminhos dos ficheiros correspondentes. Cada entrada na coleção é composta por:</p>
<ul>
<li><strong>Vetor de incorporação</strong>: A representação numérica da imagem. Armazenado no campo <code translate="no">vector</code>.</li>
<li><strong>Caminho do ficheiro</strong>: A localização do ficheiro de imagem para referência. Armazenado no campo <code translate="no">filepath</code> como um campo dinâmico.</li>
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
<h3 id="Peform-a-Search" class="common-anchor-header">Efetuar uma pesquisa</h3><p>Agora, vamos executar uma pesquisa usando uma consulta de texto de exemplo. Isto irá recuperar as imagens mais relevantes com base na sua semelhança semântica com a descrição de texto fornecida.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Visualize os resultados:</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
