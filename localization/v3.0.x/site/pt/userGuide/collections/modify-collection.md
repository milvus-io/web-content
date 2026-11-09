---
id: modify-collection.md
title: Modificar coleção
summary: >-
  Pode renomear uma coleção ou alterar as suas definições. Esta página centra-se
  na forma de modificar uma coleção.
---
<h1 id="Modify-Collection" class="common-anchor-header">Modificar coleção<button data-href="#Modify-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Pode renomear uma coleção ou alterar as suas definições. Esta página centra-se em como modificar uma coleção.</p>
<h2 id="Rename-Collection" class="common-anchor-header">Renomear coleção<button data-href="#Rename-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode renomear uma coleção da seguinte forma.</p>
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
<h2 id="Set-Collection-Properties" class="common-anchor-header">Definir propriedades da coleção<button data-href="#Set-Collection-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode modificar as propriedades ao nível da coleção após a sua criação.</p>
<h3 id="Supported-properties" class="common-anchor-header">Propriedades suportadas<button data-href="#Supported-properties" class="anchor-icon" translate="no">
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
     <th><p>Propriedade</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection.ttl.seconds</code></p></td>
     <td><p>Se for necessário eliminar os dados de uma coleção após um período específico, considere definir o seu Tempo de Vida (TTL) em segundos. Quando o TTL expirar, o Milvus elimina todas as entidades da coleção. </p><p>A eliminação é assíncrona, o que significa que as pesquisas e consultas continuam a ser possíveis antes de a eliminação estar concluída.</p><p>Para mais detalhes, consulte <a href="/docs/pt/set-collection-ttl.md">Definir o TTL</a> da <a href="/docs/pt/set-collection-ttl.md">coleção</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ttl_field</code></p></td>
     <td><p>Nome do campo « <code translate="no">TIMESTAMPTZ</code> » que armazena o carimbo de data e hora de expiração absoluto de cada entidade (TTL ao nível da entidade). Cada entidade expira quando a hora real atinge o valor armazenado neste campo; um valor « <code translate="no">NULL</code> » neste campo significa que a entidade nunca expira. É mutuamente exclusivo com « <code translate="no">collection.ttl.seconds</code> ».</p><p>Para mais detalhes, consulte <a href="/docs/pt/set-collection-ttl.md">Definir o TTL ao nível da entidade</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mmap.enabled</code></p></td>
     <td><p>O mapeamento de memória (Mmap) permite o acesso direto à memória para ficheiros de grande dimensão no disco, permitindo que o Milvus armazene índices e dados tanto na memória como nos discos rígidos. Esta abordagem ajuda a otimizar a política de colocação de dados com base na frequência de acesso, expandindo a capacidade de armazenamento das coleções sem afetar o desempenho da pesquisa.</p><p>Para mais detalhes, consulte <a href="/docs/pt/mmap.md">«Utilizar mmap</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">partitionkey.isolation</code></p></td>
     <td><p>Com o «Isolamento da chave de partição» ativado, o Milvus agrupa as entidades com base no valor da chave de partição e cria um índice separado para cada um desses grupos. Ao receber um pedido de pesquisa, o Milvus localiza o índice com base no valor da Chave de Partição especificado na condição de filtragem e restringe o âmbito da pesquisa às entidades incluídas no índice, evitando assim a análise de entidades irrelevantes durante a pesquisa e melhorando significativamente o desempenho da pesquisa.</p><p>Para mais detalhes, consulte <a href="/docs/pt/use-partition-key.md#Use-Partition-Key-Isolation">«Utilizar o isolamento da chave de partição</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dynamicfield.enabled</code></p></td>
     <td><p>Ativa o campo dinâmico para coleções que foram criadas sem que este estivesse ativado. Uma vez ativado, é possível inserir entidades com campos não definidos no esquema original. Para mais detalhes, consulte <a href="/docs/pt/enable-dynamic-field.md">«Campo dinâmico</a>».</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">allow_insert_auto_id</code></p></td>
     <td><p>Determina se uma coleção pode aceitar valores de chave primária fornecidos pelo utilizador quando a opção AutoID estiver ativada para a coleção.</p><ul><li><p>Quando definido como <strong> «true</strong>»: as inserções, as atualizações com inserção (upserts) e as importações em massa utilizam a chave primária fornecida pelo utilizador, se esta existir; caso contrário, os valores da chave primária são gerados automaticamente.</p></li><li><p>Quando definido como <strong> «false</strong>»: os valores de chave primária fornecidos pelo utilizador são rejeitados ou ignorados e os valores de chave primária são sempre gerados automaticamente. O valor predefinido é <strong> «false</strong>».</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>Especifica o fuso horário predefinido para esta coleção ao lidar com operações sensíveis ao tempo, especialmente campos « <code translate="no">TIMESTAMPTZ</code> ». Os carimbos de data/hora são armazenados internamente em UTC, e o Milvus converte os valores para exibição e comparação de acordo com esta configuração. Se definido, o fuso horário da coleção substitui o fuso horário predefinido da base de dados; o parâmetro de fuso horário de uma consulta pode substituir temporariamente ambos. O valor deve ser um <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">identificador de fuso horário IANA</a> válido (por exemplo, <strong>Asia/Shanghai</strong>, <strong>America/Chicago</strong> ou <strong>UTC</strong>). Para obter detalhes sobre como utilizar um campo « <code translate="no">TIMESTAMPTZ</code> », consulte <a href="/docs/pt/timestamptz-field.md">o campo TIMESTAMPTZ</a>.</p></td>
   </tr>
</table>
<h3 id="Example-1-Set-collection-level-TTL" class="common-anchor-header">Exemplo 1: Definir o TTL ao nível da recolha<button data-href="#Example-1-Set-collection-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>O seguinte fragmento de código demonstra como definir o TTL da coleção.</p>
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
<h3 id="Example-2-Set-entity-level-TTL" class="common-anchor-header">Exemplo 2: Definir o TTL ao nível da entidade<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Example-2-Set-entity-level-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>O seguinte fragmento de código designa um campo « <code translate="no">TIMESTAMPTZ</code> » (<code translate="no">expire_at</code>) já existente como o campo TTL para o TTL ao nível da entidade. A coleção já deve conter um campo « <code translate="no">TIMESTAMPTZ</code> » com esse nome, e « <code translate="no">collection.ttl.seconds</code> » não deve estar definido — os dois modos de TTL são mutuamente exclusivos.</p>
<p>Para conhecer o fluxo de trabalho completo do TTL ao nível da entidade (configuração do esquema, inserção, consulta, atualização, eliminação), consulte <a href="/docs/pt/set-collection-ttl.md">Definir o TTL ao nível da entidade</a>.</p>
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
<h3 id="Example-3-Enable-mmap" class="common-anchor-header">Exemplo 3: Ativar o mmap<button data-href="#Example-3-Enable-mmap" class="anchor-icon" translate="no">
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
    </button></h3><p>O seguinte fragmento de código demonstra como ativar o mmap.</p>
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
<h3 id="Example-4-Enable-partition-key" class="common-anchor-header">Exemplo 4: Ativar a chave de partição<button data-href="#Example-4-Enable-partition-key" class="anchor-icon" translate="no">
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
    </button></h3><p>O trecho de código a seguir demonstra como ativar a chave de partição.</p>
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
<h3 id="Example-5-Enable-dynamic-field" class="common-anchor-header">Exemplo 5: Ativar o campo dinâmico<button data-href="#Example-5-Enable-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h3><p>O trecho de código a seguir demonstra como ativar o campo dinâmico.</p>
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
<h3 id="Example-6-Enable-allowinsertautoid" class="common-anchor-header">Exemplo 6: Ativar a propriedade `allow_insert_auto_id`<button data-href="#Example-6-Enable-allowinsertautoid" class="anchor-icon" translate="no">
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
    </button></h3><p>A propriedade ` <code translate="no">allow_insert_auto_id</code> ` permite que uma coleção com o AutoID ativado aceite valores de chave primária fornecidos pelo utilizador durante as operações de inserção, atualização com inserção (upsert) e importação em massa. Quando definida como <strong>«true»</strong>, o Milvus utiliza o valor da chave primária fornecido pelo utilizador, se estiver presente; caso contrário, gera-o automaticamente. O valor predefinido é <strong>«false».</strong></p>
<p>O exemplo abaixo mostra como ativar a propriedade ` <code translate="no">allow_insert_auto_id</code>`:</p>
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
<h3 id="Example-7-Set-collection-time-zone" class="common-anchor-header">Exemplo 7: Definir o fuso horário da coleção<button data-href="#Example-7-Set-collection-time-zone" class="anchor-icon" translate="no">
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
    </button></h3><p>Pode definir um fuso horário predefinido para a sua coleção utilizando a propriedade <code translate="no">timezone</code>. Isto determina como os dados relacionados com o tempo são interpretados e apresentados para todas as operações dentro da coleção, incluindo a inserção de dados, a consulta e a apresentação de resultados.</p>
<p>O valor de ` <code translate="no">timezone</code> ` deve ser um <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">identificador de fuso horário IANA</a> válido, como <code translate="no">Asia/Shanghai</code>, <code translate="no">America/Chicago</code> ou <code translate="no">UTC</code>. A utilização de um valor inválido ou não padrão resultará num erro ao modificar a propriedade da coleção.</p>
<p>O exemplo abaixo mostra como definir o fuso horário da coleção para <strong>Asia/Shanghai</strong>:</p>
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
<h2 id="Drop-Collection-Properties" class="common-anchor-header">Eliminar propriedades da coleção<button data-href="#Drop-Collection-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>Também é possível repor uma propriedade da coleção removendo-a da seguinte forma.</p>
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
