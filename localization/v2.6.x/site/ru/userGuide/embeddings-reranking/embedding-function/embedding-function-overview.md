---
id: embedding-function-overview.md
title: Обзор функции встраиванияCompatible with Milvus 2.6.x
summary: >-
  Модуль Function в Milvus позволяет преобразовывать необработанные текстовые
  данные в векторные вкрапления путем автоматического вызова внешних провайдеров
  моделей (например, OpenAI, AWS Bedrock, Google Vertex AI и т. д.). С помощью
  модуля Function вам больше не нужно вручную взаимодействовать с API для
  встраивания - Milvus сам управляет всем процессом отправки запросов
  провайдерам, получения встраиваний и их хранения в ваших коллекциях. Для
  семантического поиска вам нужно предоставить только исходные данные запроса,
  но не вектор запроса. Milvus генерирует вектор запроса с помощью той же
  модели, которую вы использовали для встраивания, сравнивает его с сохраненными
  векторами и возвращает наиболее релевантные результаты.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Обзор функции встраивания<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Модуль Function в Milvus позволяет преобразовывать необработанные текстовые данные в векторные вкрапления путем автоматического вызова внешних провайдеров моделей (таких как OpenAI, AWS Bedrock, Google Vertex AI и т. д.). С помощью модуля Function вам больше не нужно вручную взаимодействовать с API для встраивания - Milvus сам управляет всем процессом отправки запросов провайдерам, получения встраиваний и их хранения в ваших коллекциях. Для семантического поиска вам нужно предоставить только исходные данные запроса, но не вектор запроса. Milvus генерирует вектор запроса по той же модели, которую вы использовали для встраивания, сравнивает его с сохраненными векторами и возвращает наиболее релевантные результаты.</p>
<h2 id="Limits" class="common-anchor-header">Ограничения<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Любое поле ввода, в которое встраивается модуль Function, всегда должно содержать значение; если будет предоставлен null, модуль выдаст ошибку.</p></li>
<li><p>Модуль Function обрабатывает только те поля, которые явно определены в схеме коллекции; он не генерирует вставки для динамических полей.</p></li>
<li><p>Встраиваемые поля ввода должны иметь тип <code translate="no">VARCHAR</code>.</p></li>
<li><p>Модуль Function может внедрить поле ввода в:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Преобразования в <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code> или <code translate="no">BFLOAT16_VECTOR</code> не поддерживаются.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Модуль Function превращает необработанный текст в векторные вложения, вызывая внешнего поставщика моделей по вашему выбору. Различные провайдеры поддерживают разные модели, форматы встраивания и методы аутентификации, которые описаны ниже.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">Поддерживаемые поставщики моделей</h3><table>
   <tr>
     <th><p>Провайдер</p></th>
     <th><p>Типичные модели</p></th>
     <th><p>Тип встраивания</p></th>
     <th><p>Метод аутентификации</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/openai.md">OpenAI</a></p></td>
     <td><p>text-embedding-3-*</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API-ключ</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Развертывание на основе</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Ключ API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API-ключ</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Пара AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/vertex-ai.md">Вершинный ИИ</a></p></td>
     <td><p>text-embedding-005</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>GCP service-account JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/voyage-ai.md">Вояж ИИ</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API-ключ</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API ключ</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API ключ</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ru/hugging-face-tei.md">Обнимающееся лицо</a></p></td>
     <td><p>Любая модель, обслуживаемая TEI</p></td>
     <td><p>Плотный (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Необязательный ключ API</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">Рабочий процесс</h3><p>На следующей схеме показано, как функция работает в Milvus.</p>
<ol>
<li><p><strong>Входной текст</strong>: Пользователи вводят в Milvus исходные данные (например, документы).</p></li>
<li><p><strong>Генерация вкраплений</strong>: Модуль Function в Milvus автоматически вызывает настроенный поставщик моделей для преобразования исходных данных в векторные вкрапления.</p></li>
<li><p><strong>Хранить эмбеддинги</strong>: Полученные эмбеддинги хранятся в явно определенных векторных полях в коллекциях Milvus.</p></li>
<li><p><strong>Запрашивать текст</strong>: Пользователи отправляют текстовые запросы в Milvus.</p></li>
<li><p><strong>Семантический поиск</strong>: Milvus преобразует запросы в векторные вкрапления, проводит поиск по сходству с хранящимися вкраплениями и извлекает релевантные результаты.</p></li>
<li><p><strong>Возврат результатов</strong>: Milvus возвращает приложению наиболее подходящие результаты.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>Обзор функций встраивания</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">Управление учетными данными</h3><p>Для подключения к внешним API для встраивания требуются учетные данные для аутентификации (ключи API или пары доступ/секретный ключ). Раскрытие этих учетных данных в коде вашего приложения создает риски безопасности. Milvus решает эту проблему, надежно храня учетные данные в конфигурационном файле Milvus (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>Добавьте учетные данные</strong>: В блоке верхнего уровня <code translate="no">credential:</code> присвойте каждой учетной записи уникальную метку; затем укажите на эту метку в блоке <code translate="no">function:</code>.</p></li>
<li><p><strong>Сервер загружает конфигурацию</strong>: Milvus считывает YAML-файл, кэширует необработанные ключи в памяти и запоминает только их метки (например, <code translate="no">apikey1</code>).</p></li>
<li><p><strong>Вызов функции</strong>: Опционально укажите аргумент <code translate="no">credential</code>.</p>
<ul>
<li><p>Если вместе с определением функции указать имя учетной записи, Milvus использует указанную учетную запись.</p></li>
<li><p>Если вы опустите этот аргумент, Milvus автоматически вернется к учетной записи, настроенной для данного поставщика модели в <code translate="no">milvus.yaml</code>.</p>
<p>В любом случае секретный ключ никогда не покинет сервер.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Переполнение конфигурации учетных данных</span> </span></p>
<div class="alert note">
<p>Если вы развертываете Milvus с помощью Docker Compose, вы также можете вводить те же поля через переменные окружения. Точные имена переменных см. в руководствах по конкретным провайдерам.</p>
</div>
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
    </button></h2><p>Прежде чем использовать функцию встраивания в Milvus, настройте учетные данные доступа.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">Шаг 1: Добавьте учетные данные в конфигурацию Milvus</h3><p>В файле <code translate="no">milvus.yaml</code> отредактируйте блок <code translate="no">credential</code>, добавив в него записи для каждого провайдера, к которому требуется доступ:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Тип провайдера</p></th>
     <th><p>Необходимые поля</p></th>
     <th><p>Пример конфигурации</p></th>
   </tr>
   <tr>
     <td><p>Пара AK/SK (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>API-ключ (OpenAI, Voyage AI и т.д.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>GCP service-account JSON (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Шаг 2: Настройте параметры провайдера</h3><p>В том же файле конфигурации отредактируйте блок <code translate="no">function</code>, чтобы указать Milvus, какой ключ использовать для встраивания вызовов сервиса:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения о том, как применять конфигурацию Milvus, см. в разделе <a href="/docs/ru/dynamic_config.md">Настройка Milvus на лету</a>.</p>
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
    </button></h2><p>После того как учетные данные настроены, выполните следующие шаги, чтобы определить и использовать функции встраивания.</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Шаг 2: Добавьте функцию встраивания в схему</h3><p>Модуль Function в Milvus автоматически преобразует исходные данные, хранящиеся в скалярном поле, во вкрапления и сохраняет их в явно определенном векторном поле.</p>
<p>Приведенный ниже пример добавляет модуль Function (<code translate="no">openai_embedding</code>), который преобразует скалярное поле <code translate="no">&quot;document&quot;</code> в эмбеддинги, сохраняя полученные векторы в векторном поле <code translate="no">&quot;dense&quot;</code>, определенном ранее.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Пример Значение</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Уникальный идентификатор для функции встраивания в Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Тип используемой функции встраивания. Возможные значения:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: Генерирует плотные векторы, отражающие семантический смысл текста.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: Генерирует разреженные векторы на основе алгоритма ранжирования BM25, который рассчитывает оценки релевантности с использованием частоты терминов и обратной частоты документов. Дополнительные сведения см. в разделе <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Скалярное поле, содержащее исходные данные для вставки. В настоящее время этот параметр принимает только одно имя поля.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Векторное поле для хранения сгенерированных вкраплений. В настоящее время этот параметр принимает только одно имя поля.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Словарь, содержащий конфигурации встраивания. Примечание: Параметры внутри <code translate="no">params</code> зависят от поставщиков моделей встраивания.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Поставщик модели встраивания.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Указывает, какую модель встраивания использовать.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Метка учетной записи, определенная в разделе верхнего уровня <code translate="no">credential:</code> на сайте <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>При указании этого параметра Milvus извлекает соответствующую пару ключей или API-токен и подписывает запрос на стороне сервера.</p></li>
<li><p>Если метка не указана (<code translate="no">None</code>), Milvus возвращается к учетной записи, явно настроенной для провайдера целевой модели в <code translate="no">milvus.yaml</code>.</p></li>
<li><p>Если метка неизвестна или отсутствует ключ, вызов завершается неудачей.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Количество измерений для выходных вкраплений. Для моделей OpenAI третьего поколения вы можете сократить полный вектор, чтобы снизить стоимость и время ожидания без существенной потери семантической информации. Для получения дополнительной информации см. <a href="https://openai.com/blog/new-embedding-models-and-api-updates">сообщение в блоге OpenAI</a>. <strong>Примечание:</strong> Если вы сокращаете размерность вектора, убедитесь, что значение <code translate="no">dim</code>, указанное в методе <code translate="no">add_field</code> схемы для векторного поля, соответствует конечной выходной размерности вашей функции встраивания.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Идентификатор уровня пользователя для отслеживания использования API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Для коллекций с несколькими скалярными полями, требующими преобразования текста в вектор, добавьте в схему коллекции отдельные функции, обеспечив каждой функции уникальное имя и значение <code translate="no">output_field_names</code>.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Шаг 3: Настройте индекс</h3><p>Определив схему с необходимыми полями и встроенной функцией, настройте индекс для коллекции. Чтобы упростить этот процесс, используйте <code translate="no">AUTOINDEX</code> в качестве <code translate="no">index_type</code>, опция, которая позволяет Milvus выбрать и настроить наиболее подходящий тип индекса на основе структуры ваших данных.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Шаг 4: Создание коллекции</h3><p>Теперь создайте коллекцию, используя заданную схему и параметры индекса.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Шаг 5: Вставка данных</h3><p>После настройки коллекции и индекса вы готовы вставить исходные данные. В этом процессе вам нужно только предоставить исходный текст. Модуль Function, который мы определили ранее, автоматически генерирует соответствующий разреженный вектор для каждой текстовой записи.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Шаг 6: Выполните поиск вектора</h3><p>После вставки данных выполните семантический поиск по необработанному тексту запроса. Milvus автоматически преобразует ваш запрос в вектор вложения, извлекает релевантные документы на основе сходства и возвращает наиболее подходящие результаты.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения об операциях поиска и запроса см. в разделе <a href="/docs/ru/single-vector-search.md">Базовый векторный поиск</a> и <a href="/docs/ru/get-and-scalar-query.md">запрос</a>.</p>
