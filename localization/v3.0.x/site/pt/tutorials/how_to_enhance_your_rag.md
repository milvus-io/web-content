---
id: how_to_enhance_your_rag.md
summary: >-
  Com a crescente popularidade das aplicações RAG (Retrieval Augmented
  Generation), existe uma preocupação crescente em melhorar o seu desempenho.
  Este artigo apresenta todas as formas possíveis de otimizar os pipelines RAG e
  fornece ilustrações correspondentes para o ajudar a compreender rapidamente as
  principais estratégias de otimização RAG.
title: Como melhorar o desempenho do seu pipeline RAG
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">Como melhorar o desempenho do seu pipeline RAG<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Com a crescente popularidade das aplicações Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>), existe uma preocupação crescente em melhorar o seu desempenho. Este artigo apresenta todas as formas possíveis de otimizar os pipelines RAG e fornece ilustrações correspondentes para o ajudar a compreender rapidamente as principais estratégias de otimização RAG.</p>
<p>É importante observar que forneceremos apenas uma exploração de alto nível dessas estratégias e técnicas, concentrando-nos em como elas se integram a um sistema RAG. No entanto, não entraremos em detalhes intrincados nem o orientaremos na implementação passo a passo.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">Um pipeline RAG padrão<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>O diagrama abaixo mostra o pipeline RAG mais simples e simples. Em primeiro lugar, os blocos de documentos são carregados num armazenamento de vectores (como o <a href="https://milvus.io/docs">Milvus</a> ou o <a href="https://zilliz.com/cloud">Zilliz cloud</a>). Em seguida, o armazém de vectores recupera os Top-K fragmentos mais relevantes relacionados com a consulta. Estes fragmentos relevantes são então injectados no prompt de contexto do <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a> e, finalmente, o LLM devolve a resposta final.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">Vários tipos de técnicas de melhoramento das RAG<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>Podemos classificar diferentes abordagens de melhoramento das RAG com base nas suas funções nas fases do processo das RAG.</p>
<ul>
<li><strong>Melhoria da consulta</strong>: Modificar e manipular o processo de consulta da entrada do RAG para melhor expressar ou processar a intenção da consulta.</li>
<li><strong>Melhoria da indexação</strong>: Otimizar a criação de índices de chunking utilizando técnicas como o multi-chunking, a indexação por etapas ou a indexação multi-vias.</li>
<li><strong>Melhoria do recuperador</strong>: Aplicação de técnicas e estratégias de otimização durante o processo de recuperação.</li>
<li><strong>Melhoria do gerador</strong>: Ajustar e otimizar os prompts durante a montagem dos prompts para o LLM, de modo a fornecer melhores respostas.</li>
<li><strong>Melhoria do RAG Pipeline</strong>: Mudança dinâmica de processos dentro de todo o pipeline do RAG, incluindo a utilização de agentes ou ferramentas para otimizar as principais etapas do pipeline do RAG.</li>
</ul>
<p>De seguida, apresentamos os métodos específicos de cada uma destas categorias.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">Aprimoramento de consultas<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Vamos explorar quatro métodos eficazes para melhorar a sua experiência de consulta: Perguntas hipotéticas, Embeddings de documentos hipotéticos, Subconsultas e Prompts de retrocesso.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">Criando perguntas hipotéticas</h3><p>A criação de perguntas hipotéticas envolve a utilização de um LLM para gerar várias perguntas que os utilizadores podem fazer sobre o conteúdo de cada fragmento de documento. Antes que a consulta real do utilizador chegue ao LLM, o armazenamento de vectores recupera as perguntas hipotéticas mais relevantes relacionadas com a consulta real, juntamente com os pedaços de documentos correspondentes, e encaminha-os para o LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Esta metodologia contorna o problema da assimetria entre domínios no processo de pesquisa vetorial, envolvendo-se diretamente em pesquisas de pergunta para pergunta, aliviando a carga sobre as pesquisas vectoriais. No entanto, introduz uma sobrecarga adicional e incerteza na geração de perguntas hipotéticas.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (Hypothetical Document Embeddings)</h3><p>HyDE significa Hypothetical Document Embeddings. Utiliza um LLM para criar um<strong><em>"documento hipotético</em></strong>" ou uma resposta <strong><em>falsa</em></strong> em resposta a uma pergunta do utilizador desprovida de informações contextuais. Esta resposta falsa é então convertida em embeddings vectoriais e utilizada para consultar os pedaços de documentos mais relevantes numa base de dados vetorial. Subsequentemente, a base de dados vetorial recupera os K blocos de documentos mais relevantes e transmite-os ao LLM e à consulta original do utilizador para gerar a resposta final.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este método é semelhante à técnica da pergunta hipotética na abordagem da assimetria entre domínios nas pesquisas vectoriais. No entanto, também tem desvantagens, como os custos computacionais adicionais e as incertezas da geração de respostas falsas.</p>
<p>Para mais informações, consulte o documento <a href="https://arxiv.org/abs/2212.10496">HyDE</a>.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">Criar subconsultas</h3><p>Quando uma consulta do utilizador é demasiado complicada, podemos utilizar um LLM para a dividir em subconsultas mais simples antes de as passar para a base de dados vetorial e para o LLM. Vejamos um exemplo.</p>
<p>Imagine um utilizador a perguntar:<strong><em>"Quais são as diferenças de funcionalidades entre o Milvus e o Zilliz Cloud?</em></strong>" Esta pergunta é bastante complexa e pode não ter uma resposta direta na nossa base de conhecimentos. Para resolver esta questão, podemos dividi-la em duas subconsultas mais simples:</p>
<ul>
<li>Subconsulta 1: "Quais são as caraterísticas do Milvus?"</li>
<li>Subconsulta 2: "Quais são as caraterísticas do Zilliz Cloud?"</li>
</ul>
<p>Quando tivermos estas subconsultas, enviamo-las todas para a base de dados vetorial, depois de as convertermos em embeddings vectoriais. A base de dados vetorial encontra, então, os Top-K dos documentos mais relevantes para cada subconsulta. Finalmente, o LLM usa esta informação para gerar uma resposta melhor.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Ao dividir a consulta do utilizador em subconsultas, tornamos mais fácil para o nosso sistema encontrar informações relevantes e fornecer respostas precisas, mesmo para perguntas complexas.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">Criação de prompts de retrocesso</h3><p>Outra forma de simplificar as consultas complexas do utilizador é através da criação de <strong><em>prompts de retrocesso</em></strong>. Esta técnica consiste em abstrair as perguntas complexas dos utilizadores em <em><em>"</em>perguntas de retorno</em>"** utilizando um LLM. Em seguida, uma base de dados vetorial utiliza estas perguntas de retorno para obter os fragmentos de documentos mais relevantes. Por fim, o LLM gera uma resposta mais exacta com base nestes pedaços de documentos recuperados.</p>
<p>Vamos ilustrar esta técnica com um exemplo. Considere-se a seguinte pergunta, que é bastante complexa e não é fácil de responder diretamente:</p>
<p><strong><em>Consulta original do utilizador: "Tenho um conjunto de dados com 10 mil milhões de registos e quero armazená-lo no Milvus para consulta. É possível?"</em></strong></p>
<p>Para simplificar esta consulta do utilizador, podemos utilizar um LLM para gerar uma pergunta de retorno mais simples:</p>
<p><strong><em>Pergunta de retorno: "Qual é o limite de tamanho do conjunto de dados que o Milvus consegue suportar?"</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este método pode ajudar-nos a obter respostas melhores e mais precisas a perguntas complexas. Divide a pergunta original numa forma mais simples, tornando mais fácil para o nosso sistema encontrar informações relevantes e fornecer respostas precisas.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">Melhoria da indexação<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>A melhoria da indexação é outra estratégia para melhorar o desempenho das suas aplicações RAG. Vamos explorar três técnicas de melhoria da indexação.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">Fusão automática de blocos de documentos</h3><p>Ao construir um índice, podemos empregar dois níveis de granularidade: pedaços filhos e seus pedaços pais correspondentes. Inicialmente, procuramos por pedaços filhos num nível mais fino de detalhe. Depois, aplicamos uma estratégia de fusão: se um número específico, <strong><em>n</em></strong>, de pedaços filhos dos primeiros <strong><em>k</em></strong> pedaços filhos pertencerem ao mesmo pedaço pai, fornecemos este pedaço pai ao LLM como informação contextual.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Esta metodologia foi implementada no <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a>.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">Construção de índices hierárquicos</h3><p>Ao criar índices para documentos, podemos estabelecer um índice de dois níveis: um para resumos de documentos e outro para pedaços de documentos. O processo de pesquisa vetorial é composto por duas fases: inicialmente, filtramos os documentos relevantes com base no resumo e, posteriormente, recuperamos os pedaços de documentos correspondentes exclusivamente dentro desses documentos relevantes.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Esta abordagem revela-se vantajosa em situações que envolvem grandes volumes de dados ou instâncias em que os dados são hierárquicos, como a recuperação de conteúdos numa coleção de biblioteca.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">Recuperação e reavaliação híbridas</h3><p>A técnica de recuperação e reordenação híbridas integra um ou mais métodos de recuperação suplementares com a <a href="https://zilliz.com/learn/vector-similarity-search">recuperação por semelhança de vectores</a>. Em seguida, um <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">reranker</a> classifica os resultados recuperados com base na sua relevância para a consulta do utilizador.</p>
<p>Os algoritmos de recuperação suplementar mais comuns incluem métodos baseados na frequência lexical, como o <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a>, ou grandes modelos que utilizam embeddings esparsos, como o <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>. Os algoritmos de reclassificação incluem RRF ou modelos mais sofisticados como o <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>, que se assemelha a arquitecturas do tipo BERT.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Esta abordagem tira partido de diversos métodos de recuperação para melhorar a qualidade da recuperação e colmatar potenciais lacunas na recuperação de vectores.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">Melhoria do recuperador<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>O aperfeiçoamento do componente recuperador do sistema RAG também pode melhorar as aplicações RAG. Vamos explorar alguns métodos eficazes para melhorar o recuperador.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">Recuperação da janela de frases</h3><p>Num sistema RAG básico, o fragmento de documento fornecido ao LLM é uma janela maior que engloba o fragmento de incorporação recuperado. Isto garante que a informação fornecida ao LLM inclui uma gama mais alargada de detalhes contextuais, minimizando a perda de informação. A técnica de recuperação por janela de frase separa o fragmento de documento utilizado para a recuperação da incorporação do fragmento fornecido à LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>No entanto, a expansão do tamanho da janela pode introduzir informações adicionais de interferência. Podemos ajustar o tamanho da expansão da janela com base nas necessidades específicas da empresa.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">Filtragem de metadados</h3><p>Para garantir respostas mais precisas, podemos refinar os documentos recuperados filtrando metadados como tempo e categoria antes de os passar para o LLM. Por exemplo, se forem recuperados relatórios financeiros que abrangem vários anos, a filtragem baseada no ano desejado refinará as informações para atender a requisitos específicos. Este método revela-se eficaz em situações com dados extensos e metadados detalhados, como a recuperação de conteúdos em colecções de bibliotecas.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">Melhoria do gerador<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Vamos explorar mais técnicas de otimização RAG, melhorando o gerador num sistema RAG.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">Compressão do prompt LLM</h3><p>A informação de ruído nos fragmentos de documentos recuperados pode afetar significativamente a precisão da resposta final do RAG. A janela limitada da mensagem nos LLMs também representa um obstáculo para respostas mais exactas. Para responder a este desafio, podemos comprimir pormenores irrelevantes, enfatizar parágrafos-chave e reduzir o comprimento total do contexto dos fragmentos de documentos recuperados.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Esta abordagem é semelhante ao método híbrido de recuperação e classificação anterior, em que um classificador é utilizado para selecionar os fragmentos de documentos irrelevantes.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">Ajustar a ordem dos pedaços no prompt</h3><p>No artigo<a href="https://arxiv.org/abs/2307.03172">"Lost in the middle</a>" (<a href="https://arxiv.org/abs/2307.03172">Perdido no meio</a>), os investigadores observaram que os LLM ignoram frequentemente a informação no meio de determinados documentos durante o processo de raciocínio. Em vez disso, tendem a confiar mais na informação apresentada no início e no fim dos documentos.</p>
<p>Com base nesta observação, podemos ajustar a ordem dos pedaços recuperados para melhorar a qualidade da resposta: ao recuperar vários pedaços de conhecimento, os pedaços com confiança relativamente baixa são colocados no meio, e os pedaços com confiança relativamente alta são posicionados em ambas as extremidades.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">Melhoria do pipeline RAG<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Também podemos melhorar o desempenho das suas aplicações RAG, melhorando todo o pipeline RAG.</p>
<h3 id="Self-reflection" class="common-anchor-header">Autorreflexão</h3><p>Esta abordagem incorpora o conceito de autorreflexão nos agentes de IA. Então, como é que esta técnica funciona?</p>
<p>Algumas partes de documentos Top-K recuperadas inicialmente são ambíguas e podem não responder diretamente à pergunta do utilizador. Nesses casos, podemos efetuar uma segunda ronda de reflexão para verificar se esses blocos podem realmente responder à pergunta.</p>
<p>Podemos efetuar a reflexão utilizando métodos de reflexão eficientes, como modelos de Inferência da Linguagem Natural (NLI) ou ferramentas adicionais, como pesquisas na Internet para verificação.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este conceito de autorreflexão foi explorado em vários documentos ou projectos, incluindo <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a>, etc.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">Encaminhamento de consultas com um agente</h3><p>Por vezes, não é necessário utilizar um sistema RAG para responder a perguntas simples, uma vez que isso pode resultar em mais mal-entendidos e inferências a partir de informação enganadora. Nesses casos, podemos utilizar um agente como encaminhador na fase de consulta. Este agente avalia se a consulta precisa de passar pela conduta RAG. Em caso afirmativo, é iniciada a conduta RAG subsequente; caso contrário, o LLM aborda diretamente a consulta.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>O agente pode assumir várias formas, incluindo um LLM, um pequeno modelo de classificação ou mesmo um conjunto de regras.</p>
<p>Ao encaminhar as consultas com base na intenção do utilizador, é possível redirecionar uma parte das consultas, o que leva a um aumento significativo do tempo de resposta e a uma redução notável do ruído desnecessário.</p>
<p>Podemos alargar a técnica de encaminhamento de consultas a outros processos do sistema RAG, como determinar quando utilizar ferramentas como as pesquisas na Web, efetuar subconsultas ou pesquisar imagens. Esta abordagem garante que cada etapa do sistema RAG é optimizada com base nos requisitos específicos da consulta, conduzindo a uma recuperação de informações mais eficiente e precisa.</p>
<h2 id="Summary" class="common-anchor-header">Resumo<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Embora um pipeline RAG básico possa parecer simples, a obtenção de um desempenho comercial ótimo requer frequentemente técnicas de otimização mais sofisticadas.</p>
<p>Este artigo resume várias abordagens populares para melhorar o desempenho das suas aplicações RAG. Também fornecemos ilustrações claras para ajudá-lo a entender rapidamente esses conceitos e técnicas e acelerar sua implementação e otimização.</p>
<p>Você pode obter as implementações simples das principais abordagens listadas neste artigo neste <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">link do GitHub</a>.</p>
