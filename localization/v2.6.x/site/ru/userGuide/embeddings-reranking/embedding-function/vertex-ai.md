---
id: vertex-ai.md
title: Vertex AICompatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AI - это высокопроизводительный сервис, специально
  разработанный для моделей встраивания текста. В этом руководстве объясняется,
  как использовать Google Cloud Vertex AI с Milvus для эффективного создания
  моделей встраивания текста.
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">Vertex AI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AI</a> - это высокопроизводительный сервис, специально разработанный для моделей встраивания текста. В этом руководстве объясняется, как использовать Google Cloud Vertex AI с Milvus для эффективной генерации текстовых вкраплений.</p>
<p>Vertex AI поддерживает несколько моделей встраивания для различных случаев использования:</p>
<ul>
<li><p>gemini-embedding-001 (современная производительность в англоязычных, многоязычных и кодовых задачах)</p></li>
<li><p>text-embedding-005 (новейшая модель встраивания текста)</p></li>
<li><p>text-multilingual-embedding-002 (Новейшая модель многоязычного встраивания текста).</p></li>
</ul>
<p>Дополнительные сведения см. в разделе <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">Модели встраивания текста Vertex AI</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед настройкой Vertex AI убедитесь, что вы соответствуете этим требованиям:</p>
<ul>
<li><p><strong>Запустите Milvus версии 2.6 или выше</strong> - Убедитесь, что ваше развертывание соответствует минимальному требованию к версии.</p></li>
<li><p><strong>Создайте учетную запись службы Google Cloud</strong> - как минимум, вам понадобятся роли типа "Пользователь Vertex AI" или другие более специфические роли. Подробнее см. в разделе <a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">Создание учетных записей служб</a>.</p></li>
<li><p><strong>Загрузите файл ключа JSON учетной записи службы</strong> - надежно сохраните этот файл учетных данных на своем сервере или локальной машине. Подробнее см. в разделе <a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">Создание ключа учетной записи службы</a>.</p></li>
</ul>
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
    </button></h2><p>Прежде чем Milvus сможет вызвать Vertex AI, ему потребуется доступ к JSON-ключу учетной записи службы GCP. Мы поддерживаем два метода - выбирайте один из них в зависимости от ваших потребностей в развертывании и эксплуатации.</p>
<table>
   <tr>
     <th><p>Вариант</p></th>
     <th><p>Приоритет</p></th>
     <th><p>Лучший для</p></th>
   </tr>
   <tr>
     <td><p>Файл конфигурации (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>Высокий</p></td>
     <td><p>Постоянные настройки в масштабах всего кластера</p></td>
   </tr>
   <tr>
     <td><p>Переменные окружения (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>Низкий</p></td>
     <td><p>Контейнерные рабочие процессы, быстрые тесты</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Вариант 1: Файл конфигурации (рекомендуется и имеет более высокий приоритет)</h3><p>Milvus всегда будет отдавать предпочтение учетным данным, объявленным в <code translate="no">milvus.yaml</code>, а не любым переменным окружения для того же провайдера.</p>
<ol>
<li><p>Base64-кодирование вашего JSON-ключа</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Объявите учетные данные в <code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>Привяжите учетные данные к провайдеру Vertex AI</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Если впоследствии вам понадобится изменить ключи, просто обновите строку Base64 в разделе <code translate="no">credential_json</code> и перезапустите Milvus - никаких изменений в окружении или контейнерах не требуется.</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">Вариант 2: Переменные окружения</h3><p>Используйте этот метод, если вы предпочитаете вводить секреты во время развертывания. Milvus переходит к использованию env-vars только в том случае, если в <code translate="no">milvus.yaml</code> нет подходящей записи.</p>
<div class="alert note">
<p>Шаги настройки зависят от режима развертывания Milvus (автономный или распределенный кластер) и платформы оркестровки (Docker Compose или Kubernetes).</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<div class="alert note">
<p>Чтобы получить файл конфигурации Milvus<strong>(docker-compose.yaml</strong>), обратитесь к разделу <a href="/docs/ru/v2.6.x/configure-docker.md#Download-an-installation-file">"Скачать установочный файл"</a>.</p>
</div>
<ol>
<li><p><strong>Установите ключ в контейнер.</strong></p>
<p>Отредактируйте файл <code translate="no">docker-compose.yaml</code>, включив в него сопоставление томов с учетными данными:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>В предыдущей конфигурации:</p>
<ul>
<li><p>Используйте абсолютные пути для надежного доступа к файлам (<code translate="no">/home/user/credentials.json</code>, а не <code translate="no">~/credentials.json</code>).</p></li>
<li><p>Путь к контейнеру должен заканчиваться расширением <code translate="no">.json</code> </p></li>
<li><p><code translate="no">:ro</code> флаг обеспечивает доступ только для чтения для безопасности</p></li>
</ul></li>
<li><p><strong>Установите переменную окружения</strong></p>
<p>В том же файле <code translate="no">docker-compose.yaml</code> добавьте переменную окружения, указывающую на путь к учетным данным:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Применить изменения</strong></p>
<p>Перезапустите контейнер Milvus, чтобы активировать конфигурацию:</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>Чтобы получить файл конфигурации Milvus<strong>(values.yaml</strong>), обратитесь к разделу <a href="/docs/ru/v2.6.x/configure-helm.md#Configure-Milvus-via-configuration-file">Настройка Milvus через файл конфигурации</a>.</p>
</div>
<ol>
<li><p><strong>Создайте секрет Kubernetes</strong></p>
<p>Выполните эту команду на вашей управляющей машине (где настроен <strong>kubectl</strong> ):</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>В предыдущей команде:</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>: Имя для вашего секрета (настраиваемое)</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>: Локальное имя файла учетных данных GCP</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>: Пространство имен Kubernetes, в котором размещен Milvus</p></li>
</ul></li>
<li><p><strong>Настройте значения Helm</strong></p>
<p>Обновите <code translate="no">values.yaml</code> в зависимости от типа развертывания:</p>
<ul>
<li><p><strong>Для автономного развертывания</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Для распределенного развертывания (добавить к каждому компоненту)</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
  <span class="hljs-attr">volumes:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><strong>Примените конфигурацию Helm</strong></p>
<p>Разверните обновленную конфигурацию на вашем кластере:</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<h2 id="Use-embedding-function" class="common-anchor-header">Использовать функцию встраивания<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>После настройки Vertex AI выполните следующие шаги для определения и использования функций встраивания.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Шаг 1: Определите поля схемы</h3><p>Чтобы использовать функцию встраивания, создайте коллекцию с определенной схемой. Эта схема должна включать как минимум три необходимых поля:</p>
<ul>
<li><p>Первичное поле, которое уникально идентифицирует каждую сущность в коллекции.</p></li>
<li><p>Скалярное поле, в котором хранятся исходные данные для встраивания.</p></li>
<li><p>Векторное поле, зарезервированное для хранения векторных вкраплений, которые функция будет генерировать для скалярного поля.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Шаг 2: Добавьте функцию встраивания в схему</h3><p>Модуль Function в Milvus автоматически преобразует необработанные данные, хранящиеся в скалярном поле, во вкрапления и сохраняет их в явно определенном векторном поле.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Параметр</strong></p></th>
     <th><p><strong>Описание</strong></p></th>
     <th><p><strong>Требуется?</strong></p></th>
     <th><p><strong>Пример Значение</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Поставщик модели встраивания. Установите значение "vertexai".</p></td>
     <td><p>Да</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Указывает, какую модель встраивания Vertex AI следует использовать.</p></td>
     <td><p>Да</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>Идентификатор проекта Google Cloud.</p></td>
     <td><p>Да</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>Регион для службы Vertex AI. В настоящее время встраивания Vertex AI поддерживают в основном регион us-central1. По умолчанию - us-central1.</p></td>
     <td><p>Нет</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>Указывает тип задачи встраивания, влияющий на результаты встраивания. Принимаемые значения: DOC_RETRIEVAL (по умолчанию), CODE_RETRIEVAL (поддерживается только 005), STS (семантическое текстовое сходство).</p></td>
     <td><p>Нет</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Размерность выходных векторов эмбеддинга. Принимаются целые числа от 1 до 768. <strong>Примечание:</strong> Если указано, убедитесь, что размерность векторного поля в схеме соответствует этому значению.</p></td>
     <td><p>Нет</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
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
    </button></h2><p>После настройки функции встраивания обратитесь к <a href="/docs/ru/v2.6.x/embeddings.md">обзору функции</a>, чтобы получить дополнительные указания по настройке индекса, примеры вставки данных и операции семантического поиска.</p>
