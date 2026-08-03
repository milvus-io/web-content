---
id: model-ranker-overview.md
title: Visão geral do Model RankerCompatible with Milvus 2.6.x
summary: >-
  A pesquisa vetorial tradicional classifica os resultados exclusivamente com
  base na semelhança matemática — ou seja, no grau de correspondência entre os
  vetores num espaço de alta dimensão. Embora eficiente, esta abordagem muitas
  vezes não tem em conta a verdadeira relevância semântica. Considere, por
  exemplo, uma pesquisa por «melhores práticas para a otimização de bases de
  dados»: poderá obter documentos com elevada semelhança vetorial que mencionem
  frequentemente estes termos, mas que, na realidade, não forneçam estratégias
  de otimização que possam ser postas em prática.
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
    </button></h1><p>A pesquisa vetorial tradicional classifica os resultados exclusivamente com base na semelhança matemática — ou seja, na proximidade entre os vetores num espaço de alta dimensão. Embora eficiente, esta abordagem muitas vezes ignora a verdadeira relevância semântica. Considere a pesquisa por <strong>«melhores práticas para otimização de bases de dados»:</strong> poderá receber documentos com elevada semelhança vetorial que mencionam frequentemente estes termos, mas que, na realidade, não fornecem estratégias de otimização aplicáveis.</p>
<p>O Model Ranker transforma a pesquisa do Milvus ao integrar modelos linguísticos avançados que compreendem as relações semânticas entre consultas e documentos. Em vez de se basear exclusivamente na semelhança vetorial, avalia o significado e o contexto do conteúdo para apresentar resultados mais inteligentes e relevantes.</p>
<h2 id="Limits" class="common-anchor-header">Limitações<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Os classificadores de modelos não podem ser utilizados com pesquisas agrupadas.</p></li>
<li><p>Os campos utilizados para a reclassificação do modelo devem ser do tipo texto (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Cada «Model Ranker» só pode utilizar um campo « <code translate="no">VARCHAR</code> » de cada vez para avaliação.</p></li>
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
    </button></h2><p>Os classificadores de modelos integram capacidades de compreensão de modelos de linguagem no processo de pesquisa do Milvus através de um fluxo de trabalho bem definido:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>Visão geral do classificador de modelos</span>
  
 </span></p>
<ol>
<li><p><strong>Consulta inicial</strong>: a sua aplicação envia uma consulta ao Milvus</p></li>
<li><p><strong>Pesquisa vetorial</strong>: O Milvus realiza uma pesquisa vetorial padrão para identificar documentos candidatos</p></li>
<li><p><strong>Recuperação de candidatos</strong>: O sistema identifica o conjunto inicial de documentos candidatos com base na semelhança vetorial</p></li>
<li><p><strong>Avaliação do modelo</strong>: A função «Model Ranker» processa pares de consulta-documento:</p>
<ul>
<li><p>Envia a consulta original e os documentos candidatos para um serviço de modelo externo</p></li>
<li><p>O modelo de linguagem avalia a relevância semântica entre a consulta e cada documento</p></li>
<li><p>Cada documento recebe uma pontuação de relevância com base na compreensão semântica</p></li>
</ul></li>
<li><p><strong>Reordenação inteligente</strong>: Os documentos são reordenados com base nas pontuações de relevância geradas pelo modelo</p></li>
<li><p><strong>Resultados melhorados</strong>: A sua aplicação recebe resultados ordenados por relevância semântica, em vez de apenas por semelhança vetorial</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Escolha um fornecedor de modelos adequado às suas necessidades<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta os seguintes fornecedores de serviços de modelos para reclassificação, cada um com características distintas:</p>
<table>
   <tr>
     <th><p>Fornecedor</p></th>
     <th><p>Ideal para</p></th>
     <th><p>Características</p></th>
     <th><p>Exemplo de caso de utilização</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Aplicações complexas que exigem uma compreensão semântica profunda e personalização</p></td>
     <td><ul><li><p>Suporta vários modelos de linguagem de grande dimensão</p></li><li><p>Opções de implementação flexíveis</p></li><li><p>Requisitos computacionais mais elevados</p></li><li><p>Maior potencial de personalização</p></li></ul></td>
     <td><p>Plataforma de investigação jurídica que implementa modelos específicos do domínio, capazes de compreender a terminologia jurídica e as relações entre a jurisprudência</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Implementação rápida com utilização eficiente de recursos</p></td>
     <td><ul><li><p>Serviço leve, otimizado para operações de texto</p></li><li><p>Implementação mais fácil com menores requisitos de recursos</p></li><li><p>Modelos de reclassificação pré-otimizados</p></li><li><p>Custo de infraestrutura mínimo</p></li></ul></td>
     <td><p>Sistema de gestão de conteúdos que necessita de capacidades eficientes de reclassificação com requisitos padrão</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>Aplicações empresariais que dão prioridade à fiabilidade e à facilidade de integração</p></td>
     <td><ul><li><p>Fiabilidade e escalabilidade de nível empresarial</p></li><li><p>Serviço gerido sem manutenção de infraestrutura</p></li><li><p>Capacidades de reclassificação multilingue</p></li><li><p>Limitação de taxa e tratamento de erros integrados</p></li></ul></td>
     <td><p>Plataforma de comércio eletrónico que requer uma pesquisa de alta disponibilidade com desempenho consistente da API e catálogos de produtos multilingues</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>Aplicações RAG com requisitos específicos de desempenho e contexto</p></td>
     <td><ul><li><p>Modelos especificamente treinados para tarefas de reclassificação</p></li><li><p>Controlos granulares de truncamento para documentos de comprimentos variados</p></li><li><p>Inferência otimizada para cargas de trabalho de produção</p></li><li><p>Várias variantes de modelos (rerank-2, rerank-lite, etc.)</p></li></ul></td>
     <td><p>Base de dados de investigação com comprimentos de documentos variáveis, exigindo um controlo de desempenho ajustado e uma compreensão semântica especializada</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Aplicações que processam documentos longos com prioridades de rentabilidade</p></td>
     <td><ul><li><p>Segmentação avançada de documentos com sobreposição configurável</p></li><li><p>Pontuação baseada em fragmentos (o fragmento com a pontuação mais elevada representa o documento)</p></li><li><p>Suporte a diversos modelos de reclassificação</p></li><li><p>Custo-eficaz, com variantes de modelo padrão e profissional</p></li></ul></td>
     <td><p>Sistema de pesquisa de documentação técnica que processa manuais e artigos extensos que requerem segmentação inteligente e controlo de sobreposição</p></td>
   </tr>
   <tr>
     <td><p>Hugging Face</p></td>
     <td><p>Aplicações que utilizam modelos de similaridade de frases do Hugging Face alojados</p></td>
     <td><ul><li><p>Utiliza o fornecedor « <code translate="no">hf-inference</code> » hospedado</p></li><li><p>Seleciona modelos a partir do Hugging Face Hub</p></li><li><p>Calcula uma pontuação de similaridade de frases por candidato</p></li><li><p>Utiliza autenticação por chave de API</p></li></ul></td>
     <td><p>Aplicações de pesquisa semântica que pretendem reclassificar textos candidatos com um modelo do Hugging Face sem ter de operar um serviço de inferência separado</p></td>
   </tr>
</table>
<p>Para obter informações detalhadas sobre a implementação de cada serviço de modelo, consulte a documentação dedicada:</p>
<ul>
<li><p><a href="/docs/pt/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/pt/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/pt/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/pt/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/pt/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
<li><p><a href="/docs/pt/v2.6.x/hugging-face-ranker.md">Classificador Hugging Face</a></p></li>
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
<li><p>Uma coleção Milvus com um campo « <code translate="no">VARCHAR</code> » que contenha o texto a ser reclassificado</p></li>
<li><p>Um serviço de modelo externo em execução, acessível à sua instância do Milvus</p></li>
<li><p>Conectividade de rede adequada entre o Milvus e o serviço de modelo escolhido</p></li>
</ul>
<p>Os Model Rankers integram-se perfeitamente tanto com operações de pesquisa vetorial padrão como com operações de pesquisa híbrida. A implementação envolve a criação de um objeto Function que define a sua configuração de reclassificação e a sua passagem para as operações de pesquisa.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Criar um classificador de modelos<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Para implementar a reclassificação por modelo, defina primeiro um objeto Function com a configuração adequada. Neste exemplo, utilizamos o TEI como prestador de serviços:</p>
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

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Obrigatório?</p></th>
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
     <td><p>Nome do campo de texto a utilizar para a reclassificação.</p><p>Tem de ser um campo do tipo « <code translate="no">VARCHAR</code> ».</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o tipo de função que está a ser criada.</p><p>Deve ser definido como « <code translate="no">RERANK</code> » para todos os classificadores de modelos.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Um dicionário que contém a configuração para a função de reclassificação baseada em modelo. Os parâmetros (chaves) disponíveis variam consoante o prestador de serviços.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Deve ser definido como « <code translate="no">"model"</code> » para ativar a reclassificação do modelo.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O prestador de serviços de modelos a utilizar para a reclassificação.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Lista de cadeias de consulta utilizadas pelo modelo de reclassificação para calcular os índices de relevância.</p><p>O número de cadeias de consulta deve corresponder exatamente ao número de consultas na sua operação de pesquisa (mesmo quando se utilizam vetores de consulta em vez de texto); caso contrário, será reportado um erro.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Sim</p></td>
     <td><p>URL do serviço do modelo.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Não</p></td>
     <td><p>Número máximo de documentos a processar num único lote. Valores mais elevados aumentam o rendimento, mas requerem mais memória.</p></td>
     <td><p><code translate="no">32</code> (padrão)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar à pesquisa vetorial padrão<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Depois de definir o seu classificador de modelo, pode aplicá-lo durante as operações de pesquisa, passando-o para o parâmetro «ranker»:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
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
