---
id: model-ranker-overview.md
title: Visão geral do Model RankerCompatible with Milvus 2.6.x
summary: >-
  A pesquisa vetorial tradicional classifica os resultados puramente por
  semelhança matemática - o grau de correspondência dos vectores no espaço de
  alta dimensão. Apesar de eficiente, esta abordagem muitas vezes não tem
  verdadeira relevância semântica. Considere a pesquisa por "melhores práticas
  para otimização de bases de dados": poderá receber documentos com elevada
  semelhança vetorial que mencionam estes termos frequentemente, mas que não
  fornecem estratégias de otimização acionáveis.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Visão geral do Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>A pesquisa vetorial tradicional classifica os resultados puramente pela similaridade matemática - a proximidade dos vetores no espaço de alta dimensão. Apesar de eficiente, esta abordagem muitas vezes não tem verdadeira relevância semântica. Considere a pesquisa por <strong>"melhores práticas para otimização de bases de dados":</strong> poderá receber documentos com elevada semelhança vetorial que mencionam estes termos frequentemente, mas que não fornecem estratégias de otimização acionáveis.</p>
<p>O Model Ranker transforma a pesquisa do Milvus ao integrar modelos de linguagem avançados que compreendem as relações semânticas entre consultas e documentos. Em vez de se basear apenas na semelhança de vectores, avalia o significado e o contexto do conteúdo para fornecer resultados mais inteligentes e relevantes.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Os classificadores de modelos não podem ser utilizados com pesquisas de agrupamento.</p></li>
<li><p>Os campos usados para classificação de modelos devem ser do tipo texto (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Cada classificador de modelos pode usar apenas um campo <code translate="no">VARCHAR</code> de cada vez para avaliação.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Como funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Os classificadores de modelos integram capacidades de compreensão de modelos linguísticos no processo de pesquisa do Milvus através de um fluxo de trabalho bem definido:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>Visão geral do classificador de modelos</span> </span></p>
<ol>
<li><p><strong>Consulta inicial</strong>: A sua aplicação envia uma consulta ao Milvus</p></li>
<li><p><strong>Pesquisa vetorial</strong>: Milvus efectua uma pesquisa vetorial padrão para identificar documentos candidatos</p></li>
<li><p><strong>Recuperação de candidatos</strong>: O sistema identifica o conjunto inicial de documentos candidatos com base na semelhança dos vectores</p></li>
<li><p><strong>Avaliação de modelos</strong>: A função de classificação de modelos processa os pares consulta-documento:</p>
<ul>
<li><p>Envia a consulta original e os documentos candidatos para um serviço de modelo externo</p></li>
<li><p>O modelo de linguagem avalia a relevância semântica entre a consulta e cada documento</p></li>
<li><p>Cada documento recebe uma pontuação de relevância com base na compreensão semântica</p></li>
</ul></li>
<li><p><strong>Reordenação inteligente</strong>: Os documentos são reordenados com base nas pontuações de relevância geradas pelo modelo</p></li>
<li><p><strong>Resultados melhorados</strong>: A sua aplicação recebe resultados classificados por relevância semântica e não apenas por semelhança de vectores</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Escolha um fornecedor de modelos para as suas necessidades<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus suporta os seguintes provedores de serviços de modelo para reranking, cada um com caraterísticas distintas:</p>
<table>
   <tr>
     <th><p>Provedor</p></th>
     <th><p>Melhor para</p></th>
     <th><p>Caraterísticas</p></th>
     <th><p>Exemplo de caso de uso</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Aplicações complexas que exigem compreensão semântica profunda e personalização</p></td>
     <td><ul>
<li><p>Oferece suporte a vários modelos de linguagem grandes</p></li>
<li><p>Opções de implantação flexíveis</p></li>
<li><p>Requisitos computacionais mais altos</p></li>
<li><p>Maior potencial de personalização</p></li>
</ul></td>
     <td><p>Plataforma de investigação jurídica que implementa modelos específicos do domínio que compreendem a terminologia jurídica e as relações jurisprudenciais</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Implementação rápida com utilização eficiente de recursos</p></td>
     <td><ul>
<li><p>Serviço leve optimizado para operações de texto</p></li>
<li><p>Implementação mais fácil com menores requisitos de recursos</p></li>
<li><p>Modelos de classificação pré-otimizados</p></li>
<li><p>Despesas mínimas de infraestrutura</p></li>
</ul></td>
     <td><p>Sistema de gestão de conteúdos que necessita de capacidades de reanálise eficientes com requisitos padrão</p></td>
   </tr>
</table>
<p>Para obter informações detalhadas sobre a implementação de cada modelo de serviço, consulte a documentação específica:</p>
<ul>
<li><p><a href="/docs/pt/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/pt/tei-ranker.md">Classificador TEI</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">Implementação<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de implementar o Model Ranker, certifique-se de que tem:</p>
<ul>
<li><p>Uma coleção Milvus com um campo <code translate="no">VARCHAR</code> que contém o texto a ser classificado</p></li>
<li><p>Um serviço de modelo externo em execução (vLLM ou TEI) acessível à sua instância Milvus</p></li>
<li><p>Conectividade de rede apropriada entre Milvus e o serviço de modelo escolhido</p></li>
</ul>
<p>Os classificadores de modelos integram-se perfeitamente nas operações de pesquisa vetorial padrão e de pesquisa híbrida. A implementação implica a criação de um objeto Function que define a sua configuração de reanálise e a sua transmissão às operações de pesquisa.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Criar um classificador de modelos</h3><p>Para implementar a reclassificação de modelos, comece por definir um objeto Function com a configuração adequada:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot; or &quot;vllm&quot;</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Necessário?</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor / Exemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Identificador da sua função utilizado na execução de pesquisas.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Nome do campo de texto a utilizar para a reclassificação. Deve ser um campo do tipo <code translate="no">VARCHAR</code>.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o tipo de função que está a ser criada. Deve ser definido como <code translate="no">RERANK</code> para todos os classificadores de modelos.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Um dicionário que contém a configuração da função de reordenação baseada em modelos. Os parâmetros disponíveis (chaves) variam de acordo com o provedor (<code translate="no">tei</code> ou <code translate="no">vllm</code>). Consulte <a href="/docs/pt/vllm-ranker.md">vLLM Ranker</a> ou <a href="/docs/pt/tei-ranker.md">TEI Ranker</a> para obter mais detalhes.</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Tem de ser definido como <code translate="no">"model"</code> para ativar a reclassificação do modelo.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O provedor de serviços de modelo a ser usado para reranking.</p></td>
     <td><p><code translate="no">"tei"</code> ou <code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Lista de cadeias de consulta utilizadas pelo modelo de reclassificação para calcular as pontuações de relevância. O número de cadeias de consulta tem de corresponder exatamente ao número de consultas na sua operação de pesquisa (mesmo quando utiliza vectores de consulta em vez de texto), caso contrário será comunicado um erro.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Sim</p></td>
     <td><p>URL do serviço de modelo.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxBatch</code></p></td>
     <td><p>Não</p></td>
     <td><p>Número máximo de documentos a processar num único lote. Valores maiores aumentam a taxa de transferência, mas exigem mais memória.</p></td>
     <td><p><code translate="no">32</code> (predefinição)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar à pesquisa de vetor padrão</h3><p>Depois de definir o classificador de modelos, é possível aplicá-lo durante as operações de pesquisa, passando-o para o parâmetro classificador:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar à pesquisa híbrida</h3><p>Os classificadores de modelos também podem ser aplicados a operações de pesquisa híbrida que combinam vários campos vetoriais:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
