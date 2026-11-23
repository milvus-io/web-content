---
id: pattern-matching.md
title: Correspondência de padrões
summary: >-
  Corresponder valores de cadeias de caracteres com padrões curinga LIKE ou
  expressões regulares RE2 em filtros escalares.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Correspondência de padrões<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize <code translate="no">LIKE</code> para correspondência com caracteres curinga e <code translate="no">=~</code> ou <code translate="no">!~</code> para expressões regulares <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Estes filtros escalares correspondem a estruturas de cadeias de caracteres, tais como códigos de erro, prefixos, domínios de e-mail ou percursos de URL na pesquisa <code translate="no">query</code>, <code translate="no">search</code> e na pesquisa híbrida.</p>
<div class="alert note">
<p>Estes filtros correspondem a valores de cadeia de caracteres. Não alteram os tokens do analisador nem ativam <a href="/docs/pt/keyword-match.md">a correspondência</a> de texto baseada em tokens ( <code translate="no">TEXT_MATCH</code> ) e <a href="/docs/pt/keyword-match.md">a correspondência</a> de <a href="/docs/pt/regex-filter.md">expressões regulares</a> ( <code translate="no">PHRASE_MATCH</code>). Consulte <a href="/docs/pt/regex-filter.md">«Filtro do Analisador de Expressões Regulares»</a> e <a href="/docs/pt/keyword-match.md">«Correspondência de Texto»</a> para obter informações sobre esses mecanismos.</p>
</div>
<p>As expressões de correspondência de padrões são escritas no parâmetro « <code translate="no">filter</code> ». Por exemplo, a consulta seguinte corresponde a mensagens de registo que contenham um código de erro como « <code translate="no">E1001</code> »:</p>
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

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .filter(<span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>)</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

res, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;log_events&quot;</span>).
<span class="highlighted-wrapper-line">    WithFilter(<span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">query</span>(
    QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">r#&quot;message =~ &quot;E[0-9]{4}&quot;&quot;#</span>)</span>
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>])
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> res.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_events&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(message =~ &quot;E[0-9]{4}&quot;)&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;message&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;severity&quot;</span>);

milvus::QueryResponse response;
status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>);

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span> });

  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;log_events&#x27;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;severity&#x27;</span>],
  });
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
}

<span class="hljs-title function_">main</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
  process.<span class="hljs-property">exitCode</span> = <span class="hljs-number">1</span>;
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;log_events&quot;</span>,
    Expression = <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_events&quot;,
    &quot;filter&quot;: &quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;message&quot;, &quot;severity&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Os exemplos restantes mostram a expressão atribuída a « <code translate="no">filter</code> ».</p>
<div class="alert note">
<p>O operando da esquerda pode ser um campo de coleção, como <code translate="no">message</code>, ou um subcampo de StructArray num índice de elemento específico, como <code translate="no">struct[0][subfield] =~ &quot;E[0-9]{4}&quot;</code>. Consulte <a href="/docs/pt/struct-array-operators.md">Operadores de StructArray</a>.</p>
</div>
<h2 id="Supported-field-types" class="common-anchor-header">Tipos de campo suportados<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>A correspondência de padrões está disponível para valores de cadeia de caracteres.</p>
<table>
<thead>
<tr><th>Alvo</th><th><code translate="no">LIKE</code></th><th>Expressão regular <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sim</td><td>Sim</td><td>Alvo típico para a correspondência de padrões em campos de cadeia de caracteres.</td></tr>
<tr><td><code translate="no">JSON</code> caminho com um valor de cadeia de caracteres</td><td>Sim</td><td>Sim</td><td>As correspondências positivas requerem valores de cadeia de caracteres. Para definições de caminho de índice/conversão, consulte <a href="/docs/pt/json-indexing.md#Understand-cast-types">Indexação JSON</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sim</td><td>Sim</td><td>Corresponde a um elemento específico por índice, como <code translate="no">tags[0]</code>. A correspondência de padrões <strong>não</strong> analisa todos os elementos; aplica-se apenas ao elemento no índice especificado.</td></tr>
<tr><td>Alvos numéricos, booleanos, vetoriais, « <code translate="no">TEXT</code> » ou outros alvos que não sejam cadeias de caracteres</td><td>Não</td><td>Não</td><td>Os padrões requerem valores de cadeia de caracteres.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Escolha LIKE ou regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize « <code translate="no">==</code> » para igualdade exata de cadeias de caracteres; caso contrário, escolha um operador da tabela seguinte:</p>
<table>
<thead>
<tr><th>Requisito</th><th>Operador recomendado</th><th>Exemplo</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>Igualdade exata de cadeias de caracteres</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Correspondência exata da cadeia de caracteres « <code translate="no">active</code> ».</td></tr>
<tr><td>Correspondência simples de prefixo</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Corresponde a cadeias que começam por <code translate="no">Prod</code>.</td></tr>
<tr><td>Correspondência simples de sufixo</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Corresponde a cadeias que terminam com <code translate="no">.json</code>.</td></tr>
<tr><td>Correspondência simples por «contém»</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Corresponde a valores que contenham <code translate="no">vector database</code> em qualquer parte da cadeia de caracteres.</td></tr>
<tr><td>Correspondência com um código estruturado ou padrão de comprimento fixo</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Corresponde a cadeias de caracteres que, distinguindo maiúsculas de minúsculas, contenham « <code translate="no">E</code> » seguido de quatro dígitos, como « <code translate="no">E1001</code> ».</td></tr>
<tr><td>Correspondência de padrões sem distinção entre maiúsculas e minúsculas</td><td><code translate="no">=~</code> com <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Corresponde a <code translate="no">error</code>, <code translate="no">ERROR</code> ou outras variantes de maiúsculas e minúsculas.</td></tr>
<tr><td>Excluir valores que correspondam a um padrão de expressão regular</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Exclui cadeias de caracteres que comecem por <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<h2 id="Use-LIKE" class="common-anchor-header">Utilizar LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>O operador <code translate="no">LIKE</code> destina-se à correspondência simples com caracteres curinga em valores de cadeia de caracteres. Apenas suporta os seguintes caracteres curinga:</p>
<table>
<thead>
<tr><th>Caractere curinga</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Corresponde a zero ou mais caracteres.</td></tr>
<tr><td><code translate="no">_</code></td><td>Corresponde a exatamente um carácter.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Padrões LIKE comuns<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize a posição de <code translate="no">%</code> e <code translate="no">_</code> para controlar onde o texto fixo aparece na cadeia correspondente.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Padrão</th><th>Exemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Começa com um prefixo</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Termina com um sufixo</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contém uma subcadeia</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Corresponde a um carácter numa posição fixa</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportamento de correspondência LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize « <code translate="no">LIKE</code> » para correspondências de prefixo, sufixo, «contém» e de um único carácter numa posição fixa. « <code translate="no">LIKE</code> » não suporta classes de caracteres como « <code translate="no">[0-9]</code> », alternâncias como « <code translate="no">error|failed</code> », contagens de repetições como « <code translate="no">{4}</code> », âncoras como « <code translate="no">^</code> » ou « <code translate="no">$</code> », nem sinalizadores de indiferença a maiúsculas e minúsculas como « <code translate="no">(?i)</code> ». Utilize expressões regulares (regex) para esses padrões.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">Escapar caracteres curinga num padrão LIKE<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Para corresponder literalmente a <code translate="no">%</code>, <code translate="no">_</code> ou <code translate="no">\</code>, escape o carácter com uma barra invertida (<code translate="no">\</code>):</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> corresponde ao valor literal <code translate="no">%</code>.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> corresponde a valores que começam com o literal « <code translate="no">_</code> ».</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> corresponde a valores que começam com uma barra invertida literal.</li>
</ul>
<p>Os literais de cadeia de caracteres «raw», escritos como <code translate="no">r&quot;...&quot;</code> ou <code translate="no">r'...'</code>, mantêm as barras invertidas tal como estão nas expressões de filtro do Milvus. São recomendados para <code translate="no">LIKE</code> e padrões de expressões regulares que contenham barras invertidas. Sem uma cadeia de caracteres «raw», os literais de cadeia de caracteres normais continuam a processar sequências de escape antes de o padrão ser avaliado, pelo que poderão ser necessárias mais barras invertidas.</p>
<h2 id="Use-regex" class="common-anchor-header">Utilizar expressões regulares<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>As expressões regulares suportam classes de caracteres, repetição, alternância, âncoras e correspondência insensível a maiúsculas e minúsculas. O operando direito de <code translate="no">=~</code> ou <code translate="no">!~</code> deve ser um literal de cadeia:</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th><th>Exemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Corresponde a valores que satisfazem o padrão de expressão regular.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Exclui valores que satisfaçam o padrão de expressão regular.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Using-raw-string-literals" class="common-anchor-header">Utilização de literais de cadeia de caracteres em bruto<button data-href="#Using-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize literais de cadeia de caracteres em formato bruto (<code translate="no">r&quot;...&quot;</code> ou <code translate="no">r'...'</code>) para passar barras invertidas tal como estão para o RE2, evitando o escape adicional nas cadeias de filtro normais:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">r&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`filename =~ r&quot;\.json$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;filename =~ r&quot;\.json$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(filename =~ r&quot;\.json$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;filename =~ r&quot;\\.json$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto corresponde a cadeias que terminam em <code translate="no">.json</code>, tais como <code translate="no">report.json</code>.</p>
<p>Sem uma string «raw» na expressão de filtro do Milvus, os literais de string normais processam sequências de escape antes de o padrão de expressão regular ser avaliado. Os caracteres literais com escape podem, por isso, exigir barras invertidas adicionais na string da linguagem de host.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">Padrões comuns de expressões regulares<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Os exemplos seguintes utilizam sintaxe RE2 comum nas expressões de filtro do Milvus. Para obter a sintaxe completa de expressões regulares, consulte a referência <a href="https://github.com/google/re2/wiki/syntax">de sintaxe RE2</a>.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Padrão</th><th>Exemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Contém texto literal</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Começa com um prefixo</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Termina com um sufixo</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Corresponde a uma sequência de dígitos</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Corresponde a um número fixo de dígitos</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Corresponde a um domínio de e-mail</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Corresponde sem distinção entre maiúsculas e minúsculas</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Corresponde à cadeia completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Para corresponder a uma de várias palavras, utilize a alternância com « <code translate="no">|</code> »:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;error|failed|timeout&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message =~ &quot;error|failed|timeout&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message =~ &quot;error|failed|timeout&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ao corresponder metacaracteres de expressões regulares literalmente, utilize o caractere de escape no padrão da expressão regular. Por exemplo, para corresponder a um ponto literal (<code translate="no">\.</code> na expressão regular), escreva <code translate="no">\\.</code> numa cadeia de código-fonte em Python, Java, Go ou Node.js:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`email =~ &quot;@gmail\\.com$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;email =~ &quot;@gmail\.com$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(email =~ &quot;@gmail\\.com$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O Milvus rejeita padrões de expressões regulares inválidos e sintaxe que <a href="https://github.com/google/re2/wiki/syntax">o RE2</a> não suporta.</p>
</div>
<h3 id="Matching-behavior" class="common-anchor-header">Comportamento de correspondência<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Correspondência de subcadeias</strong></p>
<p>A correspondência de expressões regulares do Milvus utiliza a semântica de subcadeias. O padrão não precisa de corresponder ao valor completo do campo. Por exemplo, o filtro seguinte corresponde tanto a <code translate="no">E1001</code> como a <code translate="no">failed with E1001 after retry</code>:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message =~ &quot;E[0-9]{4}&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message =~ &quot;E[0-9]{4}&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para corresponder ao valor completo do campo, utilize as âncoras <code translate="no">^</code> e <code translate="no">$</code>:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
filter := <span class="hljs-string">`code =~ &quot;^E[0-9]{4}$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;code =~ &quot;^E[0-9]{4}$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(code =~ &quot;^E[0-9]{4}$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
filter=<span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campos VARCHAR nulos</strong></p>
<p>Os filtros de expressões regulares não correspondem a valores nulos. Isto aplica-se tanto a <code translate="no">=~</code> como a <code translate="no">!~</code>. Se pretender excluir um padrão de expressão regular, mas manter os valores nulos, adicione explicitamente <code translate="no">OR field IS NULL</code>:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message !~ &quot;^DEBUG&quot; OR message IS NULL`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message !~ &quot;^DEBUG&quot; OR message IS NULL&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message !~ &quot;^DEBUG&quot; OR message IS NULL)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Caminhos JSON</strong></p>
<p>No caso dos caminhos JSON, os filtros de expressões regulares comportam-se de forma diferente quando o caminho está em falta, é nulo ou resulta num valor que não seja uma cadeia de caracteres:</p>
<table>
<thead>
<tr><th>Filtro</th><th>Inclui valores ausentes/nulos/que não sejam cadeias de caracteres?</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Não</td><td>Corresponde apenas a valores de cadeia de caracteres que satisfaçam o padrão de expressão regular.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sim</td><td>Devolve entidades em que o caminho está em falta, é nulo, não é uma cadeia de caracteres ou é uma cadeia de caracteres que não corresponde ao padrão de expressão regular.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Acelerar a correspondência de padrões com índices<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>A correspondência de padrões funciona sem um índice escalar. Para opções de aceleração e respetivas condições de elegibilidade, consulte <a href="/docs/pt/scalar_index.md#String-pattern-indexes">Seleção de índices de padrões de cadeia de caracteres</a>. Para índices de caminho JSON, verifique os <a href="/docs/pt/json-indexing.md#Index-requirements">pré-requisitos específicos do JSON</a>.</p>
<div class="alert note">
<p>O planeamento da consulta pode simplificar uma expressão LIKE sem caracteres curinga para igualdade, ou uma expressão regular simples com âncora para igualdade, correspondência de prefixo ou sufixo. Por exemplo, « <code translate="no">name =~ &quot;^abc$&quot;</code> » torna-se um teste de igualdade e segue o suporte à pesquisa de igualdade. Verifique o suporte do índice para a operação após esta simplificação, e não apenas para o operador escrito na expressão original.</p>
</div>
