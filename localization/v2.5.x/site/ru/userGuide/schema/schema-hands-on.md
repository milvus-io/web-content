---
id: schema-hands-on.md
title: Проектирование схем на практике
summary: >-
  Milvus поддерживает определение модели данных через схему коллекции. Коллекция
  организует неструктурированные данные, такие как текст и изображения, вместе с
  их векторными представлениями, включая плотные и разреженные векторы различной
  точности, используемые для семантического поиска. Кроме того, Milvus
  поддерживает хранение и фильтрацию невекторных типов данных, называемых
  "скалярными". К скалярным типам относятся BOOL, INT8/16/32/64, FLOAT/DOUBLE,
  VARCHAR, JSON и Array.
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">Проектирование схем на практике<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>Информационно-поисковые системы (IR), также известные как поиск, необходимы для различных приложений искусственного интеллекта, таких как генерация с расширенным поиском (RAG), поиск изображений и рекомендации товаров. Первым шагом в разработке IR-системы является проектирование модели данных, которое включает в себя анализ бизнес-требований, определение способа организации информации и индексацию данных для обеспечения семантического поиска.</p>
<p>Milvus поддерживает определение модели данных через схему коллекции. Коллекция организует неструктурированные данные, такие как текст и изображения, вместе с их векторными представлениями, включая плотные и разреженные векторы различной точности, используемые для семантического поиска. Кроме того, Milvus поддерживает хранение и фильтрацию невекторных типов данных, называемых &quot;скалярными&quot;. К скалярным типам относятся BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON и Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>Пример схемы данных, предназначенной для поиска новостной статьи</span> </span></p>
<p>Проектирование модели данных поисковой системы включает в себя анализ потребностей бизнеса и абстрагирование информации в виде модели данных, выраженной в виде схемы. Например, для поиска по фрагменту текста его необходимо &quot;проиндексировать&quot;, преобразовав буквенную строку в вектор с помощью &quot;встраивания&quot;, что позволяет осуществлять векторный поиск. Помимо этого основного требования, может потребоваться хранение других свойств, таких как время публикации и автор. Эти метаданные позволяют уточнить семантический поиск с помощью фильтрации, возвращая только тексты, опубликованные после определенной даты или определенным автором. Кроме того, их может потребоваться получить вместе с основным текстом для отображения результатов поиска в приложении. Чтобы упорядочить эти фрагменты текста, каждому из них должен быть присвоен уникальный идентификатор, выраженный в виде целого числа или строки. Эти элементы необходимы для реализации сложной логики поиска.</p>
<p>Хорошо продуманная схема очень важна, поскольку она абстрагирует модель данных и решает, можно ли достичь бизнес-целей с помощью поиска. Кроме того, поскольку каждая строка данных, вставляемая в коллекцию, должна соответствовать схеме, это значительно помогает поддерживать согласованность данных и их долгосрочное качество. С технической точки зрения, четко определенная схема приводит к хорошо организованному хранению данных в столбцах и более чистой структуре индексов, что повышает производительность поиска.</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">Пример: Поиск новостей<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Допустим, мы хотим создать поиск для новостного сайта, и у нас есть корпус новостей с текстом, уменьшенными изображениями и другими метаданными. Сначала нам нужно проанализировать, как мы хотим использовать эти данные для поддержки бизнес-требований поиска. Представьте, что нам необходимо получать новости на основе уменьшенного изображения и краткого содержания, а также использовать метаданные, такие как информация об авторе и время публикации, в качестве критериев для фильтрации результатов поиска. Эти требования можно разделить на следующие.</p>
<ul>
<li><p>Для поиска изображений по тексту мы можем встраивать изображения в векторы с помощью мультимодальной модели встраивания, которая может отображать текстовые и графические данные в одно и то же латентное пространство.</p></li>
<li><p>Краткий текст статьи встраивается в векторы с помощью модели встраивания текста.</p></li>
<li><p>Для фильтрации по времени публикации даты хранятся в виде скалярного поля, а для эффективной фильтрации необходим индекс для скалярного поля. Другие более сложные структуры данных, такие как JSON, можно хранить в скалярном поле и выполнять поиск по их содержимому (индексирование JSON - это будущая функция).</p></li>
<li><p>Чтобы получить байт миниатюры изображения и отобразить его на странице результатов поиска, также хранится url изображения. Аналогично, для текста и заголовка резюме. (В качестве альтернативы мы можем хранить необработанный текст и данные файла изображения как скалярные поля, если это необходимо).</p></li>
<li><p>Чтобы улучшить результат поиска по краткому тексту, мы разработали гибридный подход к поиску. Для одного из путей поиска мы используем регулярную модель встраивания для генерации плотного вектора из текста, такую как OpenAI's <code translate="no">text-embedding-3-large</code> или open-source <code translate="no">bge-large-en-v1.5</code>. Эти модели хорошо отражают общую семантику текста. Другой путь - использовать модели разреженного встраивания, такие как BM25 или SPLADE, для генерации разреженного вектора, напоминающего полнотекстовый поиск, который хорошо улавливает детали и отдельные понятия в тексте. Milvus поддерживает использование обоих методов в одной коллекции данных благодаря своей многовекторной функции. Поиск по нескольким векторам может быть выполнен за одну операцию <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Наконец, нам также необходимо поле ID для идентификации каждой отдельной новостной страницы, формально называемой "сущностью" в терминологии Milvus. Это поле используется в качестве первичного ключа (или сокращенно "pk").</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">Имя поля</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (первичный ключ)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">заголовок</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">автор_инфо</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">публикация_тс</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">адрес_изображения</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">вектор_изображения</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">резюме</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">суммарный_плотный_вектор</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">сводный_разреженный_вектор</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">Тип</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">ПЛОСКИЙ_ВЕКТОР</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">РАЗРЕЖЕННЫЙ_ПЛОСКИЙ_ВЕКТОР</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">Нужный индекс</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (поддержка скоро появится)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">Как реализовать пример схемы<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">Создание схемы<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Сначала мы создадим экземпляр клиента Milvus, который можно использовать для подключения к серверу Milvus и управления коллекциями и данными. </p>
<p>Чтобы создать схему, мы используем <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> для создания объекта схемы и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> для добавления полей в схему.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>Вы можете заметить аргумент <code translate="no">uri</code> в <code translate="no">MilvusClient</code>, который используется для подключения к серверу Milvus. Вы можете задать эти аргументы следующим образом.</p>
<ul>
<li><p>Если вам нужна локальная векторная база данных только для небольших масштабов данных или создания прототипов, установка uri в качестве локального файла, например,<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</p></li>
<li><p>Если у вас большой объем данных, скажем, более миллиона векторов, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. В этом случае используйте адрес и порт сервера в качестве uri, например,<code translate="no">http://localhost:19530</code>. Если вы включили функцию аутентификации на Milvus, используйте "&lt;ваше_имя_пользователя&gt;:&lt;ваш_пароль&gt;" в качестве токена, в противном случае не задавайте токен.</p></li>
<li><p>Если вы используете <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу API</a> в Zilliz Cloud.</p></li>
</ul>
<p>Что касается <code translate="no">auto_id</code> в <code translate="no">MilvusClient.create_schema</code>, AutoID - это атрибут первичного поля, который определяет, нужно ли включать автоматическое приращение для первичного поля.  Поскольку мы установили поле<code translate="no">article_id</code> в качестве первичного ключа и хотим добавлять id статьи вручную, мы установили <code translate="no">auto_id</code> False, чтобы отключить эту функцию.</p>
<p>После добавления всех полей в объект схемы наш объект схемы соответствует записям в таблице выше.</p>
<h2 id="Define-Index​" class="common-anchor-header">Определение индекса<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>После определения схемы с различными полями, включая метаданные и векторные поля для изображений и сводных данных, на следующем этапе необходимо подготовить параметры индекса. Индексирование имеет решающее значение для оптимизации поиска и извлечения векторов, обеспечивая эффективную работу запросов. В следующем разделе мы определим параметры индекса для указанных векторных и скалярных полей в коллекции.</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>После настройки и применения параметров индекса Milvus оптимизируется для обработки сложных запросов к векторным и скалярным данным. Такое индексирование повышает производительность и точность поиска по сходству в коллекции, позволяя эффективно извлекать статьи, основанные на векторах изображений и суммарных векторах. Благодаря использованию <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a> для плотных векторов, <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a> для разреженных векторов и <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a> для скаляров, Milvus может быстро определять и возвращать наиболее релевантные результаты, значительно повышая общий пользовательский опыт и эффективность процесса поиска данных.</p>
<p>Существует множество типов индексов и метрик. Для получения дополнительной информации о них вы можете обратиться к разделам <a href="https://milvus.io/docs/overview.md#Index-types">Тип индекса Milvus</a> и <a href="https://milvus.io/docs/glossary.md#Metric-type">Тип метрики Milvus</a>.</p>
<h2 id="Create-Collection​" class="common-anchor-header">Создание коллекции<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Определив схему и индексы, мы создаем "коллекцию" с этими параметрами. Коллекция для Milvus - это как таблица для реляционной БД.</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Мы можем проверить, что коллекция была успешно создана, описав ее.</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">Другие соображения<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">Загрузка индекса<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>При создании коллекции в Milvus вы можете выбрать загрузку индекса сразу или отложить ее до массового ввода данных. Как правило, вам не нужно делать явный выбор, так как приведенные выше примеры показывают, что индекс автоматически создается для всех поступающих данных сразу после создания коллекции. Это обеспечивает немедленный поиск по поступившим данным. Однако если после создания коллекции выполняется большая массовая вставка и поиск данных не требуется до определенного момента, можно отложить построение индекса, опустив index_params в создании коллекции, и построить индекс, вызвав load явно после того, как будут получены все данные. Этот метод более эффективен для построения индекса на большой коллекции, но поиск не может быть выполнен до вызова load().</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">Как определить модель данных для нескольких арендаторов<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>Концепция нескольких арендаторов обычно используется в сценариях, когда одно программное приложение или сервис должны обслуживать несколько независимых пользователей или организаций, каждая из которых имеет свою собственную изолированную среду. Это часто встречается в облачных вычислениях, приложениях SaaS (Software as a Service) и системах баз данных. Например, в облачном сервисе хранения данных может использоваться многопользовательский подход, позволяющий разным компаниям хранить и управлять своими данными отдельно, используя при этом одну и ту же базовую инфраструктуру. Такой подход позволяет максимально эффективно использовать ресурсы, обеспечивая при этом безопасность и конфиденциальность данных для каждого арендатора.</p>
<p>Самый простой способ разграничить арендаторов - изолировать их данные и ресурсы друг от друга. Каждый арендатор либо имеет эксклюзивный доступ к определенным ресурсам, либо использует ресурсы совместно с другими для управления такими сущностями Milvus, как базы данных, коллекции и разделы. Для реализации многопользовательского режима Milvus существуют специальные методы, согласованные с этими сущностями. Для получения дополнительной информации вы можете обратиться к <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">странице Milvus multi-tenancy</a>.</p>
