---
id: vllm-ranker.md
title: Classificador vLLMCompatible with Milvus 2.6.x
summary: >-
  O vLLM Ranker utiliza a estrutura de inferência vLLM para melhorar a
  relevância da pesquisa através da classificação semântica. Representa uma
  abordagem avançada à ordenação de resultados de pesquisa que vai além da
  tradicional semelhança de vectores.
beta: Milvus 2.6.x
---
<h1 id="vLLM-Ranker" class="common-anchor-header">Classificador vLLM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#vLLM-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>O vLLM Ranker aproveita a estrutura de inferência <a href="https://docs.vllm.ai/en/latest/index.html">do vLLM</a> para melhorar a relevância da pesquisa por meio do reranking semântico. Ele representa uma abordagem avançada para a ordenação de resultados de pesquisa que vai além da similaridade vetorial tradicional.</p>
<p>O vLLM Ranker é particularmente valioso para aplicações em que a precisão e o contexto são críticos, tais como:</p>
<ul>
<li><p>Pesquisa de documentação técnica que requer uma compreensão profunda dos conceitos</p></li>
<li><p>Bancos de dados de pesquisa em que as relações semânticas superam a correspondência de palavras-chave</p></li>
<li><p>Sistemas de apoio ao cliente que precisam de fazer corresponder os problemas dos utilizadores a soluções relevantes</p></li>
<li><p>Pesquisa de comércio eletrónico que tem de compreender os atributos do produto e a intenção do utilizador</p></li>
</ul>
<p>Comparado ao <a href="/docs/pt/v2.6.x/tei-ranker.md">TEI Ranker</a>, o vLLM Ranker oferece maior flexibilidade na seleção e personalização de modelos, tornando-o ideal para aplicações de pesquisa especializadas ou complexas, em que as opções de configuração adicionais oferecem benefícios significativos.</p>
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
    </button></h2><p>Antes de implementar o vLLM Ranker no Milvus, certifique-se de que possui:</p>
<ul>
<li><p>Uma coleção do Milvus com um campo <code translate="no">VARCHAR</code> contendo o texto a ser ranqueado</p></li>
<li><p>Um serviço vLLM em execução com recursos de classificação. Para obter instruções detalhadas sobre a configuração de um serviço vLLM, consulte a <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">documentação oficial do vLLM</a>. Para verificar a disponibilidade do serviço vLLM:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Replace YOUR_VLLM_ENDPOINT_URL with the actual URL (e.g., http://&lt;service-ip&gt;:&lt;port&gt;/v1/rerank)</span>
<span class="hljs-comment"># Replace &#x27;BAAI/bge-reranker-base&#x27; if you deployed a different model</span>

curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;YOUR_VLLM_ENDPOINT_URL&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
  &quot;model&quot;: &quot;BAAI/bge-reranker-base&quot;,
  &quot;query&quot;: &quot;What is the capital of France?&quot;,
  &quot;documents&quot;: [
    &quot;The capital of Brazil is Brasilia.&quot;,
    &quot;The capital of France is Paris.&quot;,
    &quot;Horses and cows are both animals&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Uma resposta bem-sucedida deve retornar os documentos classificados por pontuações de relevância, semelhante à resposta da API de classificação do OpenAI.</p>
<p>Consulte a <a href="https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#re-rank-api">documentação</a> do <a href="https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#re-rank-api">servidor compatível com vLLM OpenAI</a> para obter mais argumentos e opções do servidor.</p></li>
</ul>
<h2 id="Create-a-vLLM-ranker-function" class="common-anchor-header">Criar uma função do vLLM ranker<button data-href="#Create-a-vLLM-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar o vLLM Ranker na sua aplicação Milvus, crie um objeto Function que especifique como o reranking deve funcionar. Esta função será passada para as operações de pesquisa do Milvus para melhorar a classificação dos resultados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a vLLM Ranker function</span>
vllm_ranker = Function(
    name=<span class="hljs-string">&quot;vllm_semantic_ranker&quot;</span>,    <span class="hljs-comment"># Choose a descriptive name</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Field containing text to rerank</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,        <span class="hljs-comment"># Specifies model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vllm&quot;</span>,         <span class="hljs-comment"># Specifies vLLM service</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://localhost:8080&quot;</span>,  <span class="hljs-comment"># vLLM service address</span>
        <span class="hljs-string">&quot;maxBatch&quot;</span>: <span class="hljs-number">64</span>,              <span class="hljs-comment"># Optional: batch size</span>
        <span class="hljs-string">&quot;truncate_prompt_tokens&quot;</span>: <span class="hljs-number">256</span>,  <span class="hljs-comment"># Optional: Use last 256 tokens</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="vLLM-ranker-specific-parameters" class="common-anchor-header">Parâmetros específicos do classificador vLLM</h3><p>Os parâmetros a seguir são específicos do classificador vLLM:</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Necessário?</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor / Exemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">truncate_prompt_tokens</code></p></td>
     <td><p>Não</p></td>
     <td><p>Se definido para um número inteiro <em>k</em>, utilizará apenas os últimos <em>k</em> tokens do prompt (ou seja, truncagem à esquerda). A predefinição é Nenhum (ou seja, sem truncamento).</p></td>
     <td><p><code translate="no">256</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Para parâmetros gerais partilhados por todos os classificadores de modelos (por exemplo, <code translate="no">provider</code>, <code translate="no">queries</code>), consulte <a href="/docs/pt/v2.6.x/model-ranker-overview.md#Create-a-model-ranker">Criar um classificador de modelos</a>.</p>
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
    </button></h2><p>Para aplicar o vLLM Ranker a uma pesquisa de vetor padrão:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with vLLM reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=vllm_ranker,                         <span class="hljs-comment"># Apply vLLM reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar à pesquisa híbrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>O vLLM Ranker também pode ser usado com a pesquisa híbrida para combinar métodos de recuperação densos e esparsos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with vLLM reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
    ranker=vllm_ranker,                        <span class="hljs-comment"># Apply vLLM reranking to combined results</span>
<span class="highlighted-wrapper-line">    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span></span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
