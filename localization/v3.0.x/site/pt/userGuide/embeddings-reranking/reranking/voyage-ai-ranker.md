---
id: voyage-ai-ranker.md
title: Voyage AI RankerCompatible with Milvus 2.6.x
summary: >-
  O Voyage AI Ranker recorre aos algoritmos de reclassificação especializados da
  Voyage AI para melhorar a relevância da pesquisa através da reclassificação
  semântica. Oferece capacidades de reclassificação de alto desempenho,
  otimizadas para a geração aumentada por recuperação (RAG) e para aplicações de
  pesquisa.
beta: Milvus 2.6.x
---
<h1 id="Voyage-AI-Ranker" class="common-anchor-header">Voyage AI Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Voyage-AI-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>O Voyage AI Ranker utiliza os algoritmos de reclassificação especializados <a href="https://www.voyageai.com/">da Voyage AI</a> para melhorar a relevância da pesquisa através da reclassificação semântica. Oferece capacidades de reclassificação de alto desempenho, otimizadas para a geração aumentada por recuperação (RAG) e aplicações de pesquisa.</p>
<p>O Voyage AI Ranker é particularmente valioso para aplicações que requerem:</p>
<ul>
<li><p>Compreensão semântica avançada com modelos especificamente treinados para tarefas de reclassificação</p></li>
<li><p>Processamento de alto desempenho com inferência otimizada para cargas de trabalho de produção</p></li>
<li><p>Controlos flexíveis de truncamento para lidar com documentos de comprimentos variados</p></li>
<li><p>Desempenho ajustado com precisão em diferentes variantes de modelo (rerank-2, rerank-lite, etc.)</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de implementar o Voyage AI Ranker no Milvus, certifique-se de que dispõe de:</p>
<ul>
<li><p>Uma coleção do Milvus com um campo « <code translate="no">VARCHAR</code> » que contenha o texto a ser reclassificado</p></li>
<li><p>Uma chave de API válida do Voyage AI com acesso aos rerankers. Registe-se na <a href="https://www.voyageai.com/">plataforma do Voyage AI</a> para obter as suas credenciais de API. Pode:</p>
<ul>
<li><p>Definir a variável de ambiente <code translate="no">VOYAGE_API_KEY</code>, ou</p></li>
<li><p>Especificar a chave API diretamente na configuração do classificador</p></li>
</ul></li>
</ul>
<h2 id="Create-a-Voyage-AI-ranker-function" class="common-anchor-header">Criar uma função de reclassificador da Voyage AI<button data-href="#Create-a-Voyage-AI-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar o Voyage AI Ranker na sua aplicação Milvus, crie um objeto Function que especifique como a reclassificação deve funcionar. Esta função será passada para as operações de pesquisa do Milvus para melhorar a classificação dos resultados.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure Voyage AI Ranker</span>
voyageai_ranker = Function(
    name=<span class="hljs-string">&quot;voyageai_semantic_ranker&quot;</span>,        <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;voyageai&quot;</span>,             <span class="hljs-comment"># Specifies Voyage AI as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;rerank-2.5&quot;</span>,           <span class="hljs-comment"># Voyage AI reranker to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;truncation&quot;</span>: <span class="hljs-literal">True</span>,                 <span class="hljs-comment"># Optional: enable input truncation (default: True)</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-voyage-api-key&quot; # Optional: if not set, uses VOYAGE_API_KEY env var</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                       .functionType(FunctionType.RERANK)
                       .name(<span class="hljs-string">&quot;voyageai_semantic_ranker&quot;</span>)
                       .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                       .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>)
                       .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;voyageai&quot;</span>)
                       .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;rerank-2.5&quot;</span>)
                       .param(<span class="hljs-string">&quot;queries&quot;</span>, <span class="hljs-string">&quot;[\&quot;renewable energy developments\&quot;]&quot;</span>)
                       .param(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-string">&quot;128&quot;</span>)
                       .param(<span class="hljs-string">&quot;truncation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                       .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

ranker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;voyageai_semantic_ranker&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>).
    WithParam(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;voyageai&quot;</span>).
    WithParam(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;rerank-2.5&quot;</span>).
    WithParam(<span class="hljs-string">&quot;queries&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;renewable energy developments&quot;</span>}).
    WithParam(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-number">128</span>).
    WithParam(<span class="hljs-string">&quot;truncation&quot;</span>, <span class="hljs-literal">true</span>)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;your_collection&quot;</span>).
    WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;dense_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">768</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;your_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;your_collection&quot;,
    &quot;schema&quot;: {
        &quot;autoID&quot;: false,
        &quot;enableDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;document&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 65535
                }
            },
            {
                &quot;fieldName&quot;: &quot;dense_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: 768
                }
            }
        ]
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Voyage-AI-ranker-specific-parameters" class="common-anchor-header">Parâmetros específicos do classificador Voyage AI<button data-href="#Voyage-AI-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Os seguintes parâmetros são específicos do classificador Voyage AI:</p>
<table>
   <tr>
     <th><p><strong>Parâmetro</strong></p></th>
     <th><p><strong>Obrigatório?</strong></p></th>
     <th><p><strong>Descrição</strong></p></th>
     <th><p><strong>Valor / Exemplo</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Deve ser definido como « <code translate="no">"model"</code> » para ativar a reclassificação do modelo.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O fornecedor de serviços de modelo a utilizar para a reclassificação.</p></td>
     <td><p><code translate="no">"voyageai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O reclassificador da Voyage AI a utilizar entre os modelos suportados na plataforma Voyage AI.</p><p>Para obter uma lista dos reclassificadores disponíveis, consulte<a href="https://docs.voyageai.com/docs/reranker"> a documentação</a> da <a href="https://docs.voyageai.com/docs/reranker">Voyage AI</a>.</p></td>
     <td><p><code translate="no">"rerank-2.5"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Lista de cadeias de consulta utilizadas pelo modelo de reclassificação para calcular os índices de relevância. O número de cadeias de consulta deve corresponder exatamente ao número de consultas na sua operação de pesquisa (mesmo quando se utilizam vetores de consulta em vez de texto); caso contrário, será reportado um erro.</p></td>
     <td><p><em>["consulta de pesquisa"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Não</p></td>
     <td><p>Uma vez que os serviços do modelo podem não processar todos os dados de uma só vez, isto define o tamanho do lote para aceder ao serviço do modelo em várias solicitações.</p></td>
     <td><p><code translate="no">128</code> (padrão)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation</code></p></td>
     <td><p>Não</p></td>
     <td><p>Se se deve truncar a entrada para cumprir o «limite de comprimento do contexto» na consulta e nos documentos.</p><ul><li><p>Se <code translate="no">True</code>, a consulta e os documentos serão truncados para caberem dentro do limite de comprimento do contexto, antes de serem processados pelo modelo de reclassificação.</p></li><li><p>Se for « <code translate="no">False</code> », será gerado um erro quando a consulta exceder 8 000 tokens para <code translate="no">rerank-2.5</code> e <code translate="no">rerank-2.5-lite</code>; 4 000 tokens para <code translate="no">rerank-2</code>; 2 000 tokens para <code translate="no">rerank-2-lite</code> e <code translate="no">rerank-1</code>; e 1 000 tokens para <code translate="no">rerank-lite-1</code>, ou se a soma do número de tokens na consulta e do número de tokens em qualquer documento individual exceder 16 000 para <code translate="no">rerank-2</code>; 8 000 para <code translate="no">rerank-2-lite</code> e <code translate="no">rerank-1</code>; e 4 000 para <code translate="no">rerank-lite-1</code>.</p></li></ul></td>
     <td><p><code translate="no">True</code> (padrão) ou <code translate="no">False</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Não</p></td>
     <td><p>Credencial de autenticação para aceder aos serviços da API do Voyage AI. Se não for especificada, o sistema procurará a variável de ambiente <code translate="no">VOYAGE_API_KEY</code>.</p></td>
     <td><p><em>"your-voyage-api-key"</em></p></td>
   </tr>
</table>
<div class="alert note">
<p>Para parâmetros gerais partilhados por todos os classificadores de modelos (por exemplo, <code translate="no">provider</code>, <code translate="no">queries</code>), consulte <a href="/docs/pt/model-ranker-overview.md#Create-a-model-ranker">Criar um classificador de modelos</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar à pesquisa vetorial padrão<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Para aplicar o Voyage AI Ranker a uma pesquisa vetorial padrão:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with Voyage AI reranker</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],  <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=voyageai_ranker,                     <span class="hljs-comment"># Apply Voyage AI reranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection&quot;</span>)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;AI Research Progress&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;What is AI&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">functionScore := entity.NewFunctionScore().AddFunction(ranker)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;your_collection&quot;</span>, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">5</span>,           <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(yourQueryVector)},
).WithANNSField(<span class="hljs-string">&quot;dense_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithFunctionScore(functionScore).
    WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Println(resultSets)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># The ranker configuration is passed with the search request</span>
<span class="hljs-built_in">export</span> rankerFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;voyageai_semantic_ranker&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document&quot;
    ],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;model&quot;,
        &quot;provider&quot;: &quot;voyageai&quot;,
        &quot;model_name&quot;: &quot;rerank-2.5&quot;,
        &quot;queries&quot;: [
            &quot;renewable energy developments&quot;
        ],
        &quot;max_client_batch_size&quot;: 128,
        &quot;truncation&quot;: true
    }
}&#x27;</span>

<span class="hljs-comment"># A query vector matching the collection dimension</span>
<span class="hljs-built_in">export</span> QUERY_VECTOR=$(jq -n <span class="hljs-string">&#x27;[range(768) | 0.01]&#x27;</span>)

request=$(jq -n \
--argjson vec <span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span> \
--argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$rankerFunction</span>&quot;</span> \
<span class="hljs-string">&#x27;{
    collectionName: &quot;your_collection&quot;,
    data: [$vec],
    annsField: &quot;dense_vector&quot;,
    limit: 5,
    outputFields: [&quot;document&quot;],
    consistencyLevel: &quot;Bounded&quot;,
    functionScore: {functions: [$fn]}
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
