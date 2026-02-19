---
id: siliconflow-ranker.md
title: Classificador SiliconFlowCompatible with Milvus 2.6.x
summary: >-
  O SiliconFlow Ranker utiliza os modelos de classificação abrangentes do
  SiliconFlow para melhorar a relevância da pesquisa através da classificação
  semântica. Fornece capacidades flexíveis de fragmentação de documentos e
  suporta uma vasta gama de modelos de classificação especializados de vários
  fornecedores.
beta: Milvus 2.6.x
---
<h1 id="SiliconFlow-Ranker" class="common-anchor-header">Classificador SiliconFlow<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFlow-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>O SiliconFlow Ranker aproveita os modelos de classificação abrangentes <a href="https://www.siliconflow.com/">do SiliconFlow</a> para melhorar a relevância da pesquisa através da classificação semântica. Fornece capacidades flexíveis de fragmentação de documentos e suporta uma vasta gama de modelos de classificação especializados de vários fornecedores.</p>
<p>O SiliconFlow Ranker é particularmente valioso para aplicativos que exigem:</p>
<ul>
<li><p>Agrupamento avançado de documentos com sobreposição configurável para lidar com documentos longos</p></li>
<li><p>Acesso a diversos modelos de reranking, incluindo a série BAAI/bge-reranker e outros modelos especializados</p></li>
<li><p>Pontuação flexível baseada em pedaços, em que o pedaço de maior pontuação representa a pontuação do documento</p></li>
<li><p>Reranking econômico com suporte para variantes de modelo padrão e profissional</p></li>
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
    </button></h2><p>Antes de implementar o SiliconFlow Ranker no Milvus, certifique-se de ter:</p>
<ul>
<li><p>Uma coleção Milvus com um campo <code translate="no">VARCHAR</code> que contém o texto a ser classificado</p></li>
<li><p>Uma chave API válida do SiliconFlow com acesso aos modelos de classificação. Registe-se na <a href="https://www.siliconflow.com/">plataforma do SiliconFlow</a> para obter as suas credenciais de API. Você pode:</p>
<ul>
<li><p>Definir a variável de ambiente <code translate="no">SILICONFLOW_API_KEY</code>, ou</p></li>
<li><p>Especificar a chave da API diretamente na configuração do classificador</p></li>
</ul></li>
</ul>
<h2 id="Create-a-SiliconFlow-ranker-function" class="common-anchor-header">Criar uma função do classificador do SiliconFlow<button data-href="#Create-a-SiliconFlow-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar o SiliconFlow Ranker na sua aplicação Milvus, crie um objeto Function que especifique como o reranking deve funcionar. Esta função será transmitida às operações de pesquisa do Milvus para melhorar a classificação dos resultados.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure SiliconFlow Ranker</span>
siliconflow_ranker = Function(
    name=<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>,     <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,          <span class="hljs-comment"># Specifies SiliconFlow as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>, <span class="hljs-comment"># SiliconFlow reranking model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>: <span class="hljs-number">5</span>,            <span class="hljs-comment"># Optional: max chunks per document for supported models</span>
        <span class="hljs-string">&quot;overlap_tokens&quot;</span>: <span class="hljs-number">50</span>,               <span class="hljs-comment"># Optional: token overlap between chunks for supported models</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-siliconflow-api-key&quot; # Optional: if not set, uses SILICONFLOW_API_KEY env var</span>
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
                       .name(<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>)
                       .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                       .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>)
                       .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;siliconflow&quot;</span>)
                       .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>)
                       .param(<span class="hljs-string">&quot;queries&quot;</span>, <span class="hljs-string">&quot;[\&quot;renewable energy developments\&quot;]&quot;</span>)
                       .param(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-string">&quot;32&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>)
                       .param(<span class="hljs-string">&quot;overlap_tokens&quot;</span>, <span class="hljs-string">&quot;50&quot;</span>)
                       .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SiliconFlow-ranker-specific-parameters" class="common-anchor-header">Parâmetros específicos do classificador SiliconFlow<button data-href="#SiliconFlow-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Os parâmetros seguintes são específicos do classificador SiliconFlow:</p>
<table>
   <tr>
     <th><p><strong>Parâmetro</strong></p></th>
     <th><p><strong>Necessário?</strong></p></th>
     <th><p><strong>Descrição</strong></p></th>
     <th><p><strong>Valor / Exemplo</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Tem de ser definido para <code translate="no">"model"</code> para permitir a reclassificação do modelo.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O fornecedor de serviços de modelos a utilizar para a reclassificação.</p></td>
     <td><p><code translate="no">"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O modelo de reanálise do SiliconFlow a utilizar a partir dos modelos suportados na plataforma SiliconFlow.</p><p>Para obter uma lista dos modelos de reclassificação disponíveis, consulte a <a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">documentação do SiliconFlow</a>.</p></td>
     <td><p><code translate="no">"BAAI/bge-reranker-v2-m3"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Lista de cadeias de caracteres de consulta utilizadas pelo modelo de classificação para calcular as pontuações de relevância. O número de cadeias de consulta deve corresponder exatamente ao número de consultas na sua operação de pesquisa (mesmo quando utiliza vectores de consulta em vez de texto), caso contrário será comunicado um erro.</p></td>
     <td><p><em>["consulta de pesquisa"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Não</p></td>
     <td><p>Uma vez que os serviços de modelo podem não processar todos os dados de uma só vez, isto define o tamanho do lote para aceder ao serviço de modelo em vários pedidos.</p></td>
     <td><p><code translate="no">128</code> (predefinição)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_chunks_per_doc</code></p></td>
     <td><p>Não</p></td>
     <td><p>Número máximo de blocos gerados a partir de um documento. Os documentos longos são divididos em vários blocos para cálculo e a pontuação mais elevada entre os blocos é considerada como a pontuação do documento. Suportado apenas por modelos específicos: <code translate="no">BAAI/bge-reranker-v2-m3</code>, <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code>, e <code translate="no">netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code translate="no">5</code>, <code translate="no">10</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">overlap_tokens</code></p></td>
     <td><p>Não</p></td>
     <td><p>Número de sobreposições de tokens entre blocos adjacentes quando os documentos são divididos em blocos. Isto assegura a continuidade entre os limites dos pedaços para uma melhor compreensão semântica. Apenas suportado por modelos específicos: <code translate="no">BAAI/bge-reranker-v2-m3</code>, <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code>, e <code translate="no">netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code translate="no">50</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Não</p></td>
     <td><p>Credencial de autenticação para aceder aos serviços da API do SiliconFlow. Se não for especificado, o sistema procurará a variável de ambiente <code translate="no">SILICONFLOW_API_KEY</code>.</p></td>
     <td><p><em>"your-siliconflow-api-key"</em></p></td>
   </tr>
</table>
<p><strong>Suporte de funcionalidades específicas do modelo</strong>: Os parâmetros <code translate="no">max_chunks_per_doc</code> e <code translate="no">overlap_tokens</code> são suportados apenas por modelos específicos. Ao usar outros modelos, esses parâmetros serão ignorados.</p>
<div class="alert note">
<p>Para parâmetros gerais compartilhados entre todos os classificadores de modelo (por exemplo, <code translate="no">provider</code>, <code translate="no">queries</code>), consulte <a href="/docs/pt/model-ranker-overview.md#Create-a-model-ranker">Criar um classificador de modelo</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar à pesquisa de vetor padrão<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Para aplicar o SiliconFlow Ranker a uma pesquisa de vetor padrão:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with SiliconFlow reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],  <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                  <span class="hljs-comment"># Apply SiliconFlow reranking</span></span>
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
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
