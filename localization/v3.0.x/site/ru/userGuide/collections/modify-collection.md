---
id: modify-collection.md
title: Изменить коллекцию
summary: >-
  Вы можете переименовать коллекцию или изменить её настройки. На этой странице
  подробно описано, как изменить настройки коллекции.
---
<h1 id="Modify-Collection" class="common-anchor-header">Изменить коллекцию<button data-href="#Modify-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Вы можете переименовать коллекцию или изменить её настройки. На этой странице рассказывается, как изменить коллекцию.</p>
<h2 id="Rename-Collection" class="common-anchor-header">Переименование коллекции<button data-href="#Rename-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Переименовать коллекцию можно следующим образом.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.rename_collection(
    old_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    new_name=<span class="hljs-string">&quot;my_new_collection&quot;</span>
)

client.rename_collection(
    old_name=<span class="hljs-string">&quot;my_new_collection&quot;</span>,
    new_name=<span class="hljs-string">&quot;my_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.RenameCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">RenameCollectionReq</span> <span class="hljs-variable">renameCollectionReq</span> <span class="hljs-operator">=</span> RenameCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .newCollectionName(<span class="hljs-string">&quot;my_new_collection&quot;</span>)
        .build();

client.renameCollection(renameCollectionReq);

renameCollectionReq = RenameCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_new_collection&quot;</span>)
        .newCollectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build();

client.renameCollection(renameCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.RenameCollection(ctx, milvusclient.NewRenameCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;my_new_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RenameCollection(ctx, milvusclient.NewRenameCollectionOption(<span class="hljs-string">&quot;my_new_collection&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">rename_collection</span>(
        RenameCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">new_collection_name</span>(<span class="hljs-string">&quot;my_new_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">rename_collection</span>(
        RenameCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_new_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">new_collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">RenameCollection</span>(milvus::<span class="hljs-built_in">RenameCollectionRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                      .<span class="hljs-built_in">WithNewCollectionName</span>(<span class="hljs-string">&quot;my_new_collection&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">RenameCollection</span>(milvus::<span class="hljs-built_in">RenameCollectionRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_new_collection&quot;</span>)
                                      .<span class="hljs-built_in">WithNewCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">renameCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">new_collection_name</span>: <span class="hljs-string">&quot;my_new_collection&quot;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">renameCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_new_collection&quot;</span>,
    <span class="hljs-attr">new_collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> CLUSTER_ENDPOINT = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = CLUSTER_ENDPOINT,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.RenameCollectionAsync(<span class="hljs-keyword">new</span> RenameCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    NewCollectionName = <span class="hljs-string">&quot;my_new_collection&quot;</span>
});

<span class="hljs-keyword">await</span> client.RenameCollectionAsync(<span class="hljs-keyword">new</span> RenameCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;my_new_collection&quot;</span>,
    NewCollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/rename&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;newCollectionName&quot;: &quot;my_new_collection&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/rename&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_new_collection&quot;,
    &quot;newCollectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-Collection-Properties" class="common-anchor-header">Настройка свойств коллекции<button data-href="#Set-Collection-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>После создания коллекции можно изменить её свойства.</p>
<h3 id="Supported-properties" class="common-anchor-header">Поддерживаемые свойства<button data-href="#Supported-properties" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Свойство</p></th>
     <th><p>Описание</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection.ttl.seconds</code></p></td>
     <td><p>Если данные коллекции необходимо удалить по истечении определенного периода, рекомендуется установить для нее время жизни (Time-To-Live, TTL) в секундах. По истечении TTL Milvus удаляет все сущности из коллекции. </p><p>Удаление происходит асинхронно, что означает, что поиск и запросы по-прежнему возможны до завершения удаления.</p><p>Подробности см. в разделе <a href="/docs/ru/set-collection-ttl.md">«Установка TTL коллекции</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ttl_field</code></p></td>
     <td><p>Название поля « <code translate="no">TIMESTAMPTZ</code> », в котором хранится абсолютная метка времени истечения срока действия каждого объекта (TTL на уровне объекта). Срок действия каждого объекта истекает, когда реальное время достигает значения, хранящегося в этом поле; значение « <code translate="no">NULL</code> » в этом поле означает, что срок действия объекта никогда не истекает. Взаимоисключаемо с параметром « <code translate="no">collection.ttl.seconds</code> ».</p><p>Подробности см. в разделе <a href="/docs/ru/set-collection-ttl.md">«Установка TTL на уровне сущности</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mmap.enabled</code></p></td>
     <td><p>Отображение в память (Mmap) обеспечивает прямой доступ к памяти для больших файлов на диске, позволяя Milvus хранить индексы и данные как в памяти, так и на жестких дисках. Такой подход помогает оптимизировать политику размещения данных с учётом частоты доступа, расширяя объём хранилища для коллекций без ущерба для производительности поиска.</p><p>Подробности см. в разделе <a href="/docs/ru/mmap.md">«Использование mmap</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">partitionkey.isolation</code></p></td>
     <td><p>При включенной изоляции ключа раздела (Partition Key Isolation) Milvus группирует сущности на основе значения ключа раздела и создает отдельный индекс для каждой из этих групп. При получении запроса на поиск Milvus находит индекс на основе значения ключа раздела, указанного в условии фильтрации, и ограничивает область поиска сущностями, включенными в индекс, что позволяет избежать сканирования нерелевантных сущностей во время поиска и значительно повысить производительность поиска.</p><p>Подробности см. в разделе <a href="/docs/ru/use-partition-key.md#Use-Partition-Key-Isolation">«Использование изоляции ключа раздела</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dynamicfield.enabled</code></p></td>
     <td><p>Включает динамическое поле для коллекций, которые были созданы без его включения. После включения можно вставлять сущности с полями, не определёнными в исходной схеме. Подробности см. в разделе <a href="/docs/ru/enable-dynamic-field.md">«Динамическое поле</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">allow_insert_auto_id</code></p></td>
     <td><p>Указывает, разрешается ли коллекции принимать значения первичного ключа, предоставленные пользователем, если для коллекции включена функция AutoID.</p><ul><li><p>При значении <strong> «true</strong>»: при вставке, обновлении-вставке и массовом импорте используется первичный ключ, предоставленный пользователем, если он имеется; в противном случае значения первичного ключа генерируются автоматически.</p></li><li><p>При значении <strong> «false</strong>»: значения первичного ключа, предоставленные пользователем, отклоняются или игнорируются, а значения первичного ключа всегда генерируются автоматически. По умолчанию установлено значение <strong> «false</strong>».</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>Указывает часовой пояс по умолчанию для данной коллекции при обработке операций, чувствительных ко времени, в частности полей типа « <code translate="no">TIMESTAMPTZ</code> ». Внутренне временные метки хранятся в формате UTC, и Milvus преобразует значения для отображения и сравнения в соответствии с этим параметром. Если этот параметр установлен, часовой пояс коллекции переопределяет часовой пояс базы данных по умолчанию; параметр часового пояса в запросе может временно переопределить оба. Значение должно быть действительным <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">идентификатором часового пояса IANA</a> (например, <strong>Asia/Shanghai</strong>, <strong>America/Chicago</strong> или <strong>UTC</strong>). Подробнее об использовании поля <code translate="no">TIMESTAMPTZ</code> см. в <a href="/docs/ru/timestamptz-field.md">разделе «Поле TIMESTAMPTZ</a>».</p></td>
   </tr>
</table>
<h3 id="Example-1-Set-collection-level-TTL" class="common-anchor-header">Пример 1: Установка TTL на уровне коллекции<button data-href="#Example-1-Set-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Следующий фрагмент кода демонстрирует, как установить TTL коллекции.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">60</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">AlterCollectionPropertiesReq</span> <span class="hljs-variable">alterCollectionReq</span> <span class="hljs-operator">=</span> AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(Constant.TTL_SECONDS, <span class="hljs-string">&quot;60&quot;</span>)
        .build();

client.alterCollectionProperties(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/common&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_collection_properties</span>(
        AlterCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;60&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">AlterCollectionProperties</span>(milvus::<span class="hljs-built_in">AlterCollectionPropertiesRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                   .<span class="hljs-built_in">AddProperty</span>(milvus::COLLECTION_TTL_SECONDS, <span class="hljs-string">&quot;60&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">60</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.AlterCollectionPropertiesAsync(<span class="hljs-keyword">new</span> AlterCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Properties = { [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>] = <span class="hljs-string">&quot;60&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;collection.ttl.seconds&quot;: 60
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Set-entity-level-TTL" class="common-anchor-header">Пример 2: Установка TTL на уровне сущности<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Example-2-Set-entity-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Следующий фрагмент кода назначает существующее поле « <code translate="no">TIMESTAMPTZ</code> » (<code translate="no">expire_at</code>) в качестве поля TTL для TTL на уровне сущности. Коллекция должна уже содержать поле « <code translate="no">TIMESTAMPTZ</code> » с таким именем, а параметр « <code translate="no">collection.ttl.seconds</code> » не должен быть установлен — эти два режима TTL являются взаимоисключающими.</p>
<p>Полный рабочий процесс работы с TTL на уровне сущности (настройка схемы, вставка, запрос, обновление, удаление) см. в разделе <a href="/docs/ru/set-collection-ttl.md">«Настройка TTL на уровне сущности</a>».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>}</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">AlterCollectionPropertiesReq</span> <span class="hljs-variable">alterCollectionReq</span> <span class="hljs-operator">=</span> AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>)
        .build();

client.alterCollectionProperties(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_collection_properties</span>(
        AlterCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">AlterCollectionProperties</span>(milvus::<span class="hljs-built_in">AlterCollectionPropertiesRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                   .<span class="hljs-built_in">AddProperty</span>(<span class="hljs-string">&quot;ttl_field&quot;</span>, <span class="hljs-string">&quot;expire_at&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;ttl_field&quot;</span>: <span class="hljs-string">&quot;expire_at&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.AlterCollectionPropertiesAsync(<span class="hljs-keyword">new</span> AlterCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Properties = { [<span class="hljs-string">&quot;ttl_field&quot;</span>] = <span class="hljs-string">&quot;expire_at&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;ttl_field&quot;: &quot;expire_at&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Enable-mmap" class="common-anchor-header">Пример 3: Включение mmap<button data-href="#Example-3-Enable-mmap" class="anchor-icon" translate="no">
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
    </button></h3><p>Следующий фрагмент кода демонстрирует, как включить mmap.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">AlterCollectionPropertiesReq</span> <span class="hljs-variable">alterCollectionReq</span> <span class="hljs-operator">=</span> AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build();

client.alterCollectionProperties(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/common&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(common.MmapEnabledKey, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_collection_properties</span>(
        AlterCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">AlterCollectionProperties</span>(milvus::<span class="hljs-built_in">AlterCollectionPropertiesRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                   .<span class="hljs-built_in">AddProperty</span>(milvus::MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.AlterCollectionPropertiesAsync(<span class="hljs-keyword">new</span> AlterCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Properties = { [<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;mmap.enabled&quot;: &quot;true&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Enable-partition-key" class="common-anchor-header">Пример 4: Включение ключа разбиения<button data-href="#Example-4-Enable-partition-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Следующий фрагмент кода демонстрирует, как включить ключ разбиения.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">AlterCollectionPropertiesReq</span> <span class="hljs-variable">alterCollectionReq</span> <span class="hljs-operator">=</span> AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
        .build();

client.alterCollectionProperties(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_collection_properties</span>(
        AlterCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">AlterCollectionProperties</span>(milvus::<span class="hljs-built_in">AlterCollectionPropertiesRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                   .<span class="hljs-built_in">AddProperty</span>(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">true</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.AlterCollectionPropertiesAsync(<span class="hljs-keyword">new</span> AlterCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Properties = { [<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;partitionkey.isolation&quot;: &quot;true&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Enable-dynamic-field" class="common-anchor-header">Пример 5: Включение динамического поля<button data-href="#Example-5-Enable-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Следующий фрагмент кода демонстрирует, как включить динамическое поле.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={<span class="hljs-string">&quot;dynamicfield.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">AlterCollectionPropertiesReq</span> <span class="hljs-variable">alterCollectionReq</span> <span class="hljs-operator">=</span> AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(<span class="hljs-string">&quot;dynamicfield.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
        .build();

client.alterCollectionProperties(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(<span class="hljs-string">&quot;dynamicfield.enabled&quot;</span>, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_collection_properties</span>(
        AlterCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;dynamicfield.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">AlterCollectionProperties</span>(milvus::<span class="hljs-built_in">AlterCollectionPropertiesRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                   .<span class="hljs-built_in">AddProperty</span>(<span class="hljs-string">&quot;dynamicfield.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;dynamicfield.enabled&quot;</span>: <span class="hljs-literal">true</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.AlterCollectionPropertiesAsync(<span class="hljs-keyword">new</span> AlterCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Properties = { [<span class="hljs-string">&quot;dynamicfield.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;dynamicfield.enabled&quot;: &quot;true&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Enable-allowinsertautoid" class="common-anchor-header">Пример 6: Включение параметра allow_insert_auto_id<button data-href="#Example-6-Enable-allowinsertautoid" class="anchor-icon" translate="no">
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
    </button></h3><p>Свойство <code translate="no">allow_insert_auto_id</code> позволяет коллекции с включенной функцией AutoID принимать значения первичного ключа, указанные пользователем, при вставке, обновлении с вставкой и массовом импорте. При значении <strong>«true»</strong> Milvus использует указанное пользователем значение первичного ключа, если оно присутствует; в противном случае он генерирует его автоматически. По умолчанию установлено значение <strong>«false».</strong></p>
<p>В примере ниже показано, как включить параметр <code translate="no">allow_insert_auto_id</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;allow_insert_auto_id&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>}</span>
)
<span class="hljs-comment"># After enabling, inserts with a PK column will use that PK; otherwise Milvus auto-generates.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">AlterCollectionPropertiesReq</span> <span class="hljs-variable">alterCollectionReq</span> <span class="hljs-operator">=</span> AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(<span class="hljs-string">&quot;allow_insert_auto_id&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
        .build();

client.alterCollectionProperties(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(<span class="hljs-string">&quot;allow_insert_auto_id&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_collection_properties</span>(
        AlterCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;allow_insert_auto_id&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">AlterCollectionProperties</span>(milvus::<span class="hljs-built_in">AlterCollectionPropertiesRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                   .<span class="hljs-built_in">AddProperty</span>(<span class="hljs-string">&quot;allow_insert_auto_id&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;allow_insert_auto_id&quot;</span>: <span class="hljs-literal">true</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.AlterCollectionPropertiesAsync(<span class="hljs-keyword">new</span> AlterCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Properties = { [<span class="hljs-string">&quot;allow_insert_auto_id&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;allow_insert_auto_id&quot;: &quot;true&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-7-Set-collection-time-zone" class="common-anchor-header">Пример 7: Установка часового пояса коллекции<button data-href="#Example-7-Set-collection-time-zone" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете установить часовой пояс по умолчанию для вашей коллекции с помощью свойства <code translate="no">timezone</code>. Это определяет, как данные, связанные со временем, интерпретируются и отображаются для всех операций в коллекции, включая вставку данных, запросы и представление результатов.</p>
<p>Значение <code translate="no">timezone</code> должно быть допустимым <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">идентификатором часового пояса IANA</a>, например <code translate="no">Asia/Shanghai</code>, <code translate="no">America/Chicago</code> или <code translate="no">UTC</code>. Использование недопустимого или нестандартного значения приведет к ошибке при изменении свойства коллекции.</p>
<p>В примере ниже показано, как установить часовой пояс коллекции <strong>Asia/Shanghai</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;timezone&quot;</span>: <span class="hljs-string">&quot;Asia/Shanghai&quot;</span>}</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

<span class="hljs-type">AlterCollectionPropertiesReq</span> <span class="hljs-variable">alterCollectionReq</span> <span class="hljs-operator">=</span> AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)
        .build();

client.alterCollectionProperties(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;Asia/Shanghai&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_collection_properties</span>(
        AlterCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">AlterCollectionProperties</span>(milvus::<span class="hljs-built_in">AlterCollectionPropertiesRequest</span>()
                                                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                   .<span class="hljs-built_in">AddProperty</span>(<span class="hljs-string">&quot;timezone&quot;</span>, <span class="hljs-string">&quot;Asia/Shanghai&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;timezone&quot;</span>: <span class="hljs-string">&quot;Asia/Shanghai&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.AlterCollectionPropertiesAsync(<span class="hljs-keyword">new</span> AlterCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Properties = { [<span class="hljs-string">&quot;timezone&quot;</span>] = <span class="hljs-string">&quot;Asia/Shanghai&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;timezone&quot;: &quot;Asia/Shanghai&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Collection-Properties" class="common-anchor-header">Удаление свойств коллекции<button data-href="#Drop-Collection-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы также можете сбросить свойство коллекции, удалив его следующим образом.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    property_keys=[
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;
<span class="hljs-keyword">import</span> java.util.Collections;

client.dropCollectionProperties(DropCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/common&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">drop_collection_properties</span>(
        DropCollectionPropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">property_keys</span>([<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">DropCollectionProperties</span>(milvus::<span class="hljs-built_in">DropCollectionPropertiesRequest</span>()
                                                  .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                                  .<span class="hljs-built_in">AddPropertyKey</span>(milvus::COLLECTION_TTL_SECONDS));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: [<span class="hljs-string">&#x27;collection.ttl.seconds&#x27;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.DropCollectionPropertiesAsync(<span class="hljs-keyword">new</span> DropCollectionPropertiesReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    DeleteKeys = [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;propertyKeys&quot;: [
        &quot;collection.ttl.seconds&quot;
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
