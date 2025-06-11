---
id: voyage-ai.md
title: Voyage AICompatible with Milvus 2.6.x
summary: >-
  В этой теме описывается, как настраивать и использовать функции встраивания
  Voyage AI в Milvus.
beta: Milvus 2.6.x
---
<h1 id="Voyage-AI" class="common-anchor-header">Voyage AI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Voyage-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как настраивать и использовать функции встраивания Voyage AI в Milvus.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Выбор модели встраивания<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает модели встраивания, предоставляемые Voyage AI. Ниже приведены доступные в настоящее время модели встраивания для быстрого ознакомления:</p>
<table>
   <tr>
     <th><p>Название модели</p></th>
     <th><p>Размеры</p></th>
     <th><p>Максимальное количество токенов</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p>voyage-3-large</p></td>
     <td><p>1,024 (по умолчанию), 256, 512, 2,048</p></td>
     <td><p>32,000</p></td>
     <td><p>Наилучшее качество поиска для общего назначения и многоязычного использования.</p></td>
   </tr>
   <tr>
     <td><p>voyage-3</p></td>
     <td><p>1,024</p></td>
     <td><p>32,000</p></td>
     <td><p>Оптимизировано для общего назначения и качества многоязычного поиска. Подробности см. в <a href="https://blog.voyageai.com/2024/09/18/voyage-3/">блоге</a>.</p></td>
   </tr>
   <tr>
     <td><p>voyage-3-lite</p></td>
     <td><p>512</p></td>
     <td><p>32,000</p></td>
     <td><p>Оптимизирована по задержкам и стоимости. Подробности см. в <a href="https://blog.voyageai.com/2024/09/18/voyage-3/">блоге</a>.</p></td>
   </tr>
   <tr>
     <td><p>voyage-code-3</p></td>
     <td><p>1,024 (по умолчанию), 256, 512, 2,048</p></td>
     <td><p>32,000</p></td>
     <td><p>Оптимизировано для поиска кодов. Подробности см. в <a href="https://blog.voyageai.com/2024/12/04/voyage-code-3/">блоге</a>.</p></td>
   </tr>
   <tr>
     <td><p>voyage-finance-2</p></td>
     <td><p>1,024</p></td>
     <td><p>32,000</p></td>
     <td><p>Оптимизировано для поиска финансов и RAG. Подробности см. в <a href="https://blog.voyageai.com/2024/06/03/domain-specific-embeddings-finance-edition-voyage-finance-2/">блоге</a>.</p></td>
   </tr>
   <tr>
     <td><p>voyage-law-2</p></td>
     <td><p>1,024</p></td>
     <td><p>16,000</p></td>
     <td><p>Оптимизирован для поиска по юридическим вопросам и RAG. Также улучшена производительность во всех доменах. Подробности см. в <a href="https://blog.voyageai.com/2024/04/15/domain-specific-embeddings-and-retrieval-legal-edition-voyage-law-2/">блоге</a>.</p></td>
   </tr>
   <tr>
     <td><p>voyage-code-2</p></td>
     <td><p>1,536</p></td>
     <td><p>16,000</p></td>
     <td><p>Оптимизирован для поиска кода (на 17 % лучше, чем у альтернативных вариантов) / Предыдущее поколение вкраплений кода. Подробности см. в <a href="https://blog.voyageai.com/2024/01/23/voyage-code-2-elevate-your-code-retrieval/">блоге</a>.</p></td>
   </tr>
</table>
<p>Подробности см. в разделе <a href="https://docs.voyageai.com/reference/embeddings-api">Модели встраивания текста</a>.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Настройка учетных данных<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus должен знать ваш ключ Voyage AI API, прежде чем он сможет запрашивать встраивания. Milvus предоставляет два способа настройки учетных данных:</p>
<ul>
<li><p><strong>Файл конфигурации (рекомендуется):</strong> Храните ключ API в <code translate="no">milvus.yaml</code>, чтобы при каждом перезапуске узла он подбирался автоматически.</p></li>
<li><p><strong>Переменные окружения:</strong> Вводим ключ во время развертывания - идеально для Docker Compose.</p></li>
</ul>
<p>Выберите один из двух описанных ниже методов - конфигурационный файл проще поддерживать на пустом металле и виртуальных машинах, а маршрут с переменными окружения подходит для контейнерных рабочих процессов.</p>
<div class="alert note">
<p>Если ключ API для одного и того же провайдера присутствует и в файле конфигурации, и в переменной окружения, Milvus всегда использует значение в <code translate="no">milvus.yaml</code> и игнорирует переменную окружения.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Вариант 1: Конфигурационный файл (рекомендуется и имеет более высокий приоритет)</h3><p>Храните ваши API-ключи в <code translate="no">milvus.yaml</code>; Milvus считывает их при запуске и переопределяет любую переменную окружения для того же провайдера.</p>
<ol>
<li><p>** Объявите свои ключи в разделе <code translate="no">credential:</code></p>
<p>Вы можете перечислить один или много API-ключей - дайте каждому из них ярлык, который вы придумаете и на который будете ссылаться позже.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Размещение ключей API здесь делает их постоянными при перезагрузке и позволяет вам переключаться между ключами, просто меняя метку.</p></li>
<li><p><strong>Укажите Milvus, какой ключ использовать для вызовов служб</strong></p>
<p>В том же файле укажите провайдеру Voyage AI на метку, которую он должен использовать.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">voyageai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.voyageai.com/v1/embeddings   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это свяжет определенный ключ с каждым запросом, который Milvus отправляет на конечную точку встраивания Voyage AI.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Вариант 2: Переменная среды</h3><p>Используйте этот метод, если вы запускаете Milvus с Docker Compose и предпочитаете хранить секреты вне файлов и образов.</p>
<p>Milvus возвращается к переменной окружения только в том случае, если ключ для провайдера не найден в <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Переменная</p></th>
     <th><p>Требуется</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_VOYAGEAI_API_KEY</code></p></td>
     <td><p>Да</p></td>
     <td><p>Ваш действительный ключ API Voyage AI.</p></td>
   </tr>
</table>
<p>В файле <strong>docker-compose.yaml</strong> установите переменную окружения <code translate="no">MILVUSAI_VOYAGEAI_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Voyage AI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_VOYAGEAI_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_VOYAGEAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Блок <code translate="no">environment:</code> вводит ключ только в контейнер Milvus, оставляя вашу хостовую ОС нетронутой. Подробнее см. в разделе <a href="/docs/ru/configure-docker.md#Configure-Milvus-with-Docker-Compose">Настройка Milvus с помощью Docker Compose</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Использование функции встраивания<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>После настройки учетных данных выполните следующие шаги, чтобы определить и использовать функции встраивания.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Шаг 1: Определите поля схемы</h3><p>Чтобы использовать функцию встраивания, создайте коллекцию с определенной схемой. Эта схема должна включать как минимум три необходимых поля:</p>
<ul>
<li><p>Первичное поле, которое уникально идентифицирует каждую сущность в коллекции.</p></li>
<li><p>Скалярное поле, в котором хранятся исходные данные для встраивания.</p></li>
<li><p>Векторное поле, зарезервированное для хранения векторных вкраплений, которые функция будет генерировать для скалярного поля.</p></li>
</ul>
<p>Следующий пример определяет схему с одним скалярным полем <code translate="no">&quot;document&quot;</code> для хранения текстовых данных и одним векторным полем <code translate="no">&quot;dense&quot;</code> для хранения вкраплений, которые будут сгенерированы модулем Function. Не забудьте задать размерность вектора (<code translate="no">dim</code>), чтобы она соответствовала выходным данным выбранной вами модели встраивания.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Шаг 2: Добавьте функцию встраивания в схему</h3><p>Модуль Function в Milvus автоматически преобразует исходные данные, хранящиеся в скалярном поле, во вкрапления и сохраняет их в явно определенном векторном поле.</p>
<p>В примере ниже добавлен модуль Function (<code translate="no">voya</code>), который преобразует скалярное поле <code translate="no">&quot;document&quot;</code> в эмбеддинги, сохраняя полученные векторы в векторном поле <code translate="no">&quot;dense&quot;</code>, определенном ранее.</p>
<p>Определив функцию встраивания, добавьте ее в схему коллекции. Это даст указание Milvus использовать указанную функцию встраивания для обработки и хранения вкраплений из ваших текстовых данных.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;voya&quot;</span>,                                  <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,     <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],               <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                 <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                      <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;voyageai&quot;</span>,                   <span class="hljs-comment"># Must be set to &quot;voyageai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;voyage-3-large&quot;</span>,                 <span class="hljs-comment"># Specifies the embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,      # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.voyageai.com/v1/embeddings&quot;,     # Defaults to the official endpoint if omitted</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1024&quot;                           # Output dimension of the vector embeddings after truncation</span>
        <span class="hljs-comment"># &quot;truncation&quot;: &quot;true&quot;                    # Whether to truncate the input texts to fit within the context length. Defaults to true.</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">Следующие шаги<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>После настройки функции встраивания обратитесь к <a href="/docs/ru/embedding-function-overview.md">обзору функций</a> для получения дополнительных указаний по настройке индекса, примеров вставки данных и операций семантического поиска.</p>
