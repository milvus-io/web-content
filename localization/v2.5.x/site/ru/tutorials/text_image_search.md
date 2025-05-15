---
id: text_image_search.md
summary: >-
  В этом уроке мы рассмотрим, как реализовать поиск изображений по тексту с
  помощью модели CLIP (Contrastive Language-Image Pretraining) от OpenAI и
  Milvus. Мы будем генерировать вкрапления изображений с помощью CLIP, хранить
  их в Milvus и выполнять эффективный поиск по сходству.
title: Поиск по тексту в изображениях с помощью Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Поиск по тексту в изображениях с помощью Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Поиск по тексту и изображению - это передовая технология, позволяющая пользователям искать изображения по текстовым описаниям на естественном языке. Она использует предварительно обученную мультимодальную модель для преобразования текста и изображений во вложения в общее семантическое пространство, что позволяет проводить сравнение на основе сходства.</p>
<p>В этом учебном пособии мы рассмотрим, как реализовать поиск изображений по тексту с помощью модели CLIP (Contrastive Language-Image Pretraining) от OpenAI и Milvus. Мы будем генерировать вкрапления изображений с помощью CLIP, хранить их в Milvus и выполнять эффективный поиск по сходству.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед началом работы убедитесь, что у вас готовы все необходимые пакеты и данные примеров.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Установите зависимости</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> для работы с базой данных Milvus</li>
<li><strong>clip</strong> для работы с моделью CLIP</li>
<li><strong>pillow</strong> для обработки и визуализации изображений</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, вам может потребоваться <strong>перезапустить среду выполнения</strong> (перейдите в меню "Runtime" в верхней части интерфейса и выберите "Restart session" из выпадающего меню).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Загрузка данных примера</h3><p>В качестве примера изображений мы будем использовать подмножество набора данных <a href="https://www.image-net.org">ImageNet</a> (100 классов, 10 изображений для каждого класса). Следующая команда загрузит данные примера и распакует их в локальную папку <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Настройка Milvus</h3><p>Прежде чем продолжить, настройте сервер Milvus и подключитесь к нему, используя свой URI (и, по желанию, токен):</p>
<ul>
<li><p><strong>Milvus Lite (рекомендуется для удобства)</strong>: Установите URI на локальный файл, например ./milvus.db. Это автоматически задействует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в одном файле.</p></li>
<li><p><strong>Docker или Kubernetes (для больших массивов данных)</strong>: Для работы с большими массивами данных разверните более производительный сервер Milvus с помощью <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. В этом случае для подключения используйте URI сервера, например http://localhost:19530.</p></li>
<li><p><strong>Zilliz Cloud (управляемый сервис)</strong>: Если вы используете <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис Milvus, задайте публичную конечную точку в качестве URI и ключ API в качестве токена.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Начало работы<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь, когда у вас есть необходимые зависимости и данные, пришло время настроить экстракторы функций и начать работу с Milvus. В этом разделе мы рассмотрим основные этапы создания системы поиска по тексту и изображению. Наконец, мы продемонстрируем, как получать и визуализировать изображения на основе текстовых запросов.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Определите экстракторы признаков</h3><p>Мы будем использовать предварительно обученную модель CLIP для создания вкраплений изображений и текста. В этом разделе мы загрузим предварительно обученный <strong>ViT-B/32</strong> вариант CLIP и определим вспомогательные функции для кодирования изображений и текста:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: обрабатывает и кодирует изображения в векторы признаков</li>
<li><code translate="no">encode_text(text)</code>: Кодирует текстовые запросы в векторы признаков.</li>
</ul>
<p>Обе функции нормализуют выходные признаки для обеспечения согласованных сравнений путем приведения векторов к единичной длине, что необходимо для точных расчетов косинусного сходства.</p>
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
<h3 id="Data-Ingestion" class="common-anchor-header">Сбор данных</h3><p>Чтобы обеспечить семантический поиск по изображениям, нам сначала нужно сгенерировать вкрапления для всех изображений и сохранить их в векторной базе данных для эффективного индексирования и поиска. В этом разделе представлено пошаговое руководство по вводу данных об изображениях в Milvus.</p>
<p><strong>1. Создание коллекции Milvus</strong></p>
<p>Перед хранением вкраплений изображений необходимо создать коллекцию Milvus. Следующий код демонстрирует, как создать коллекцию в режиме быстрой настройки с типом метрики COSINE по умолчанию. Коллекция включает в себя следующие поля:</p>
<ul>
<li><p><code translate="no">id</code>: : Первичное поле с включенным автоматическим идентификатором.</p></li>
<li><p><code translate="no">vector</code>: : Поле для хранения векторных вложений с плавающей точкой.</p></li>
</ul>
<p>Если вам нужна собственная схема, обратитесь к <a href="https://milvus.io/docs/create-collection.md">документации Milvus</a> за подробными инструкциями.</p>
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
<p><strong>2. Вставка данных в Milvus</strong></p>
<p>На этом этапе мы используем предопределенный кодировщик изображений для создания вкраплений для всех JPEG-изображений в каталоге данных примера. Затем эти вкрапления вставляются в коллекцию Milvus вместе с соответствующими путями к файлам. Каждая запись в коллекции состоит из:</p>
<ul>
<li><strong>Вектор встраивания</strong>: Численное представление изображения. Хранится в поле <code translate="no">vector</code>.</li>
<li><strong>Путь к файлу</strong>: Расположение файла изображения для ссылки. Хранится в поле <code translate="no">filepath</code> как динамическое поле.</li>
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
<h3 id="Peform-a-Search" class="common-anchor-header">Выполнение поиска</h3><p>Теперь запустим поиск по текстовому запросу. В результате будут получены наиболее релевантные изображения на основе их семантического сходства с заданным текстовым описанием.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Визуализация результатов:</p>
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
