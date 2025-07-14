---
id: build_rag_on_arm.md
summary: >-
  В этом руководстве вы узнаете, как создать приложение Retrieval-Augmented
  Generation (RAG) на инфраструктуре на базе Arm. Для хранения векторов мы
  используем Zilliz Cloud, полностью управляемую векторную базу данных Milvus.
  Zilliz Cloud доступна в таких крупных облаках, как AWS, GCP и Azure. В данной
  демонстрации мы используем Zilliz Cloud, развернутый на AWS с помощью машин
  Arm. Для LLM мы используем модель Llama-3.1-8B на процессоре сервера AWS на
  базе Arm, используя llama.cpp.
title: Построение RAG на архитектуре Arm
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">Построение RAG на архитектуре Arm<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>Процессоры<a href="https://www.arm.com/">Arm</a> активно используются в широком спектре приложений, включая традиционные задачи машинного обучения (ML) и искусственного интеллекта (AI).</p>
<p>В этом руководстве вы узнаете, как построить приложение Retrieval-Augmented Generation (RAG) на инфраструктуре на базе Arm. Для хранения векторов мы используем <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемую векторную базу данных Milvus. Zilliz Cloud доступна в таких крупных облаках, как AWS, GCP и Azure. В данной демонстрации мы используем Zilliz Cloud, развернутый на AWS с помощью машин Arm. Для LLM мы используем модель <code translate="no">Llama-3.1-8B</code> на процессоре сервера AWS на базе Arm с помощью <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>Для выполнения этого примера мы рекомендуем использовать <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>, который обеспечивает экономически эффективный способ запуска рабочих нагрузок ML на серверах на базе Arm. Этот ноутбук был протестирован на экземпляре AWS Graviton3 <code translate="no">c7g.2xlarge</code> с системой Ubuntu 22.04 LTS.</p>
<p>Для выполнения этого примера вам потребуется не менее четырех ядер и 8 ГБ оперативной памяти. Настройте дисковое хранилище объемом не менее 32 ГБ. Мы рекомендуем использовать экземпляр с такими же или лучшими характеристиками.</p>
<p>После запуска экземпляра подключитесь к нему и выполните следующие команды для подготовки среды.</p>
<p>Установите python на сервер:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>Создайте и активируйте виртуальную среду:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>Установите необходимые зависимости python:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Автономная загрузка данных<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Создание коллекции</h3><p>Для хранения и получения векторных данных мы используем <a href="https://zilliz.com/cloud">облако Zilliz Cloud</a>, развернутое на AWS, с машинами на базе Arm. Чтобы быстро начать, просто бесплатно <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">зарегистрируйте учетную запись</a> на Zilliz Cloud.</p>
<div class="alert note">
<p>В дополнение к Zilliz Cloud можно использовать и самостоятельный хостинг Milvus (более сложный в настройке). Мы также можем развернуть <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> и <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> на машинах на базе ARM. Более подробную информацию об установке Milvus можно найти в <a href="https://milvus.io/docs/install-overview.md">документации по установке</a>.</p>
</div>
<p>Мы задаем <code translate="no">uri</code> и <code translate="no">token</code> в качестве <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точки и Api ключа</a> в Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Проверьте, не существует ли уже коллекция, и удалите ее, если она существует.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Создаем новую коллекцию с указанными параметрами.</p>
<p>Если мы не укажем информацию о полях, Milvus автоматически создаст поле по умолчанию <code translate="no">id</code> для первичного ключа и поле <code translate="no">vector</code> для хранения векторных данных. Зарезервированное поле JSON используется для хранения не определенных схемой полей и их значений.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>В качестве типа метрики по умолчанию мы используем внутреннее произведение расстояний. Для получения дополнительной информации о типах расстояний вы можете обратиться к <a href="https://milvus.io/docs/metric.md?tab=floating">странице Метрики сходства</a>.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Подготовка данных</h3><p>Мы используем страницы FAQ из <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus Documentation 2.4.x</a> в качестве частных знаний в нашей RAG, которая является хорошим источником данных для простого RAG-конвейера.</p>
<p>Скачайте zip-файл и распакуйте документы в папку <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>Мы загружаем все файлы разметки из папки <code translate="no">milvus_docs/en/faq</code>. Для каждого документа мы просто используем "# " для разделения содержимого в файле, что позволяет примерно разделить содержимое каждой основной части файла разметки.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Вставка данных</h3><p>Мы подготовили простую, но эффективную модель встраивания <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a>, которая может преобразовывать текст в векторы встраивания.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Итерация по строкам текста, создание вкраплений, а затем вставка данных в Milvus.</p>
<p>Вот новое поле <code translate="no">text</code>, которое является неопределенным полем в схеме коллекции. Оно будет автоматически добавлено в зарезервированное динамическое поле JSON, которое на высоком уровне может рассматриваться как обычное поле.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Запуск сервиса LLM на платформе Arm<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе мы создадим и запустим сервис <code translate="no">llama.cpp</code> на процессоре на базе Arm.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Модель Llama 3.1 и llama.cpp</h3><p><a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">Модель Llama-3.1-8B</a> от Meta относится к семейству моделей Llama 3.1 и является бесплатной для использования в исследовательских и коммерческих целях. Прежде чем использовать модель, посетите <a href="https://llama.meta.com/llama-downloads/">сайт</a> Llama и заполните форму для запроса доступа.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a> - это проект с открытым исходным кодом на языке C/C++, который обеспечивает эффективный вывод LLM на различном оборудовании - как локально, так и в облаке. Вы можете удобно разместить модель Llama 3.1 с помощью <code translate="no">llama.cpp</code>.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">Загрузите и соберите llama.cpp</h3><p>Выполните следующие команды, чтобы установить make, cmake, gcc, g++ и другие инструменты, необходимые для сборки llama.cpp из исходного кода:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы готовы приступить к сборке <code translate="no">llama.cpp</code>.</p>
<p>Клонируйте репозиторий исходных текстов для llama.cpp:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>По умолчанию <code translate="no">llama.cpp</code> собирается только для CPU в Linux и Windows. Вам не нужно предоставлять никаких дополнительных переключателей, чтобы собрать его для процессора Arm, на котором вы его запускаете.</p>
<p>Запустите <code translate="no">make</code> для сборки:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Проверьте правильность сборки <code translate="no">llama.cpp</code>, выполнив команду help:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>Если <code translate="no">llama.cpp</code> был собран правильно, вы увидите отображение опции help. Выходной фрагмент выглядит следующим образом:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>Теперь вы можете загрузить модель с помощью huggingface cli:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>Формат модели GGUF, представленный командой llama.cpp, использует сжатие и квантование для уменьшения точности весов до 4-битных целых чисел, что значительно снижает требования к вычислительным ресурсам и памяти и делает процессоры Arm CPU эффективными для вывода LLM.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">Переквантование весов модели</h3><p>Для повторного квантования выполните команду</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>В результате будет создан новый файл <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code>, содержащий перенастроенные веса, которые позволяют <code translate="no">llama-cli</code> использовать SVE 256 и поддержку MATMUL_INT8.</p>
<div class="alert note">
<p>Эта реквантизация оптимальна именно для Гравитона3. Для Гравитона2 оптимальная реквантизация должна быть выполнена в формате <code translate="no">Q4_0_4_4</code>, а для Гравитона4 наиболее подходящим для реквантизации является формат <code translate="no">Q4_0_4_8</code>.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">Запуск службы LLM</h3><p>Вы можете использовать серверную программу llama.cpp и отправлять запросы через OpenAI-совместимый API. Это позволяет разрабатывать приложения, которые многократно взаимодействуют с LLM без необходимости многократно запускать и останавливать его. Кроме того, вы можете получить доступ к серверу с другой машины, на которой LLM размещен по сети.</p>
<p>Запустите сервер из командной строки, и он будет слушать порт 8080:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>Вы также можете настроить параметры запущенного LLM, чтобы адаптировать его к оборудованию вашего сервера для достижения идеальной производительности. Дополнительные сведения о параметрах см. в команде <code translate="no">llama-server --help</code>.</p>
<p>Если вам сложно выполнить этот шаг, вы можете обратиться к <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">официальным документам</a> для получения дополнительной информации.</p>
<p>Вы запустили службу LLM на вашем процессоре на базе Arm. Далее мы напрямую взаимодействуем с сервисом с помощью OpenAI SDK.</p>
<h2 id="Online-RAG" class="common-anchor-header">Онлайн RAG<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">Клиент LLM и модель встраивания</h3><p>Мы инициализируем LLM-клиент и подготовим модель встраивания.</p>
<p>Для LLM мы используем OpenAI SDK, чтобы запросить запущенный ранее сервис Llama. Нам не нужно использовать какой-либо API-ключ, потому что на самом деле это наш локальный сервис llama.cpp.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Сгенерируйте тестовое вложение и выведите его размерность и первые несколько элементов.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Получение данных для запроса</h3><p>Давайте зададим частый вопрос о Milvus.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Найдем этот вопрос в коллекции и получим семантические топ-3 совпадения.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Давайте посмотрим на результаты поиска по этому запросу.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Использование LLM для получения ответа RAG</h3><p>Преобразуйте полученные документы в строковый формат.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>Используйте LLM для создания ответа на основе подсказок. Мы установили параметр <code translate="no">model</code> в значение <code translate="no">not-used</code>, поскольку он является избыточным параметром для службы llama.cpp.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>Поздравляем! Вы создали приложение RAG на базе инфраструктуры Arm.</p>
