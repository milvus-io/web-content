---
id: dashscope.md
title: DashScopeCompatible with Milvus 2.6.x
summary: >-
  В этой теме описывается, как настраивать и использовать функции встраивания
  DashScope в Milvus.
beta: Milvus 2.6.x
---
<h1 id="DashScope" class="common-anchor-header">DashScope<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#DashScope" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как настраивать и использовать функции встраивания DashScope в Milvus.</p>
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
    </button></h2><p>Ниже приведены доступные на данный момент модели встраивания DashScope для быстрого ознакомления:</p>
<table>
   <tr>
     <th><p>Название модели</p></th>
     <th><p>Размеры</p></th>
     <th><p>Максимальное количество токенов в строке</p></th>
     <th><p>Поддерживаемые языки</p></th>
   </tr>
   <tr>
     <td><p>text-embedding-v3</p></td>
     <td><p>1 024 (по умолчанию), 768 или 512</p></td>
     <td><p>8,192</p></td>
     <td><p>Китайский, английский, испанский, французский, португальский, индонезийский, японский, корейский, немецкий, русский и более 50 других языков</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-v2</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>Китайский, английский, испанский, французский, португальский, индонезийский, японский, корейский, немецкий, русский</p></td>
   </tr>
   <tr>
     <td><p>text-embedding-v1</p></td>
     <td><p>1,536</p></td>
     <td><p>2,048</p></td>
     <td><p>Китайский, английский, испанский, французский, португальский, индонезийский, японский, корейский, немецкий, русский</p></td>
   </tr>
</table>
<p>Модель встраивания <strong>text-embedding-v3</strong> поддерживает уменьшение размера встраивания с помощью параметра <code translate="no">dim</code>. Как правило, большие вкрапления более дороги с точки зрения вычислений, памяти и хранения. Возможность регулировать количество измерений позволяет лучше контролировать общую стоимость и производительность. Более подробную информацию о каждой модели см. в разделе <a href="https://help.aliyun.com/zh/model-studio/user-guide/embedding?disableWebsiteRedirect=true">"Встраивание"</a>.</p>
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
    </button></h2><p>Milvus должен знать ваш API-ключ DashScope, прежде чем сможет запрашивать встраивания. Milvus предоставляет два способа настройки учетных данных:</p>
<ul>
<li><p><strong>Файл конфигурации (рекомендуется):</strong> Храните ключ API в <code translate="no">milvus.yaml</code>, чтобы при каждом перезапуске узла он автоматически подхватывался.</p></li>
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
<li><p><strong>Укажите Milvus, какой ключ использовать для вызовов DashScope</strong></p>
<p>В том же файле укажите провайдеру DashScope на метку, которую вы хотите использовать.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">dashscope:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://dashscope-intl.aliyuncs.com/compatible-mode/v1   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>Это свяжет определенный ключ с каждым запросом, который Milvus отправляет на конечную точку встраивания DashScope.</p></li>
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
     <td><p><code translate="no">MILVUSAI_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Да</p></td>
     <td><p>Делает ключ DashScope доступным внутри каждого контейнера Milvus <em>(игнорируется, если ключ для DashScope существует в <code translate="no">milvus.yaml</code></em> ).</p></td>
   </tr>
</table>
<p>В файле <strong>docker-compose.yaml</strong> установите переменную окружения <code translate="no">MILVUSAI_DASHSCOPE_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the DashScope API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_DASHSCOPE_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_DASHSCOPE_API_KEY&gt;</span>
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
<p>В примере ниже добавлен модуль Function (<code translate="no">ali</code>), который преобразует скалярное поле <code translate="no">&quot;document&quot;</code> в эмбеддинги, сохраняя полученные векторы в векторном поле <code translate="no">&quot;dense&quot;</code>, определенном ранее.</p>
<p>Определив функцию встраивания, добавьте ее в схему коллекции. Это даст указание Milvus использовать указанную функцию встраивания для обработки и хранения вкраплений из ваших текстовых данных.</p>
<pre><code translate="no" class="language-python">
<span class="hljs-comment"># Define embedding function specifically for model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;ali&quot;</span>,                                     <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific embedding parameters</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;dashscope&quot;</span>,                    <span class="hljs-comment"># Embedding provider name (must be &quot;dashscope&quot;)</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-v3&quot;</span>,          <span class="hljs-comment"># Specific embedding model used</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;                # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1024&quot;,                            # Optional: Shorten the output vector dimension</span>
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
