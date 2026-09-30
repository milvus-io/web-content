---
id: overview.md
title: O que é o Milvus?
related_key: Milvus Overview
summary: >-
  O Milvus é uma base de dados vetorial de alto desempenho e altamente escalável
  que funciona de forma eficiente numa vasta gama de ambientes, desde um
  computador portátil até sistemas distribuídos em grande escala. Está
  disponível tanto como software de código aberto como serviço na nuvem.
---
<h1 id="What-is-Milvus" class="common-anchor-header">O que é o Milvus?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>O Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> é uma ave de rapina do género Milvus, da família dos Accipitridae, conhecida pela sua velocidade em voo, visão apurada e notável capacidade de adaptação.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>A Zilliz adotou o nome Milvus para a sua base de dados vetorial de código aberto, de alto desempenho e altamente escalável, que funciona de forma eficiente numa vasta gama de ambientes, desde um computador portátil até sistemas distribuídos em grande escala. Está disponível tanto como software de código aberto como serviço na nuvem.</p>
<p>Desenvolvido pela Zilliz e em breve doado à LF AI &amp; Data Foundation, sob a égide da Linux Foundation, o Milvus tornou-se um dos principais projetos de bases de dados vetoriais de código aberto a nível mundial. É distribuído sob a licença Apache 2.0, e a maioria dos colaboradores são especialistas da comunidade de computação de alto desempenho (HPC), especializados na construção de sistemas de grande escala e na otimização de código sensível ao hardware. Entre os principais colaboradores contam-se profissionais da Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba e Microsoft.</p>
<p>Curiosamente, todos os projetos de código aberto da Zilliz têm nomes de aves, uma convenção de nomenclatura que simboliza a liberdade, a visão de futuro e a evolução ágil da tecnologia.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Dados não estruturados, embeddings e Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Os dados não estruturados, tais como texto, imagens e áudio, variam em formato e contêm uma rica semântica subjacente, o que torna a sua análise um desafio. Para gerir esta complexidade, utilizam-se embeddings para converter dados não estruturados em vetores numéricos que captam as suas características essenciais. Estes vetores são depois armazenados numa base de dados vetorial, permitindo pesquisas e análises rápidas e escaláveis.</p>
<p>O Milvus oferece capacidades robustas de modelação de dados, permitindo-lhe organizar os seus dados não estruturados ou multimodais em coleções estruturadas. Suporta uma vasta gama de tipos de dados para diferentes modelos de atributos, incluindo tipos numéricos e de caracteres comuns, vários tipos de vetores, matrizes, conjuntos e JSON, poupando-lhe o esforço de manter múltiplos sistemas de bases de dados.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>Dados não estruturados, embeddings e o Milvus</span>
  
 </span></p>
<p>O Milvus oferece três modos de implementação, abrangendo uma vasta gama de escalas de dados — desde a prototipagem local em Jupyter Notebooks até a grandes clusters de Kubernetes que gerem dezenas de milhares de milhões de vetores:</p>
<ul>
<li>O Milvus Lite é uma biblioteca Python que pode ser facilmente integrada nas suas aplicações. Sendo uma versão leve do Milvus, é ideal para prototipagem rápida em Jupyter Notebooks ou para execução em dispositivos de borda com recursos limitados. <a href="/docs/pt/milvus_lite.md">Saiba mais</a>.</li>
<li>O Milvus Standalone é uma implementação de servidor numa única máquina, com todos os componentes agrupados numa única imagem Docker para uma implementação conveniente. <a href="/docs/pt/install_standalone-docker.md">Saiba mais</a>.</li>
<li>O Milvus Distributed pode ser implementado em clusters do Kubernetes, apresentando uma arquitetura nativa da nuvem concebida para cenários na escala de milhares de milhões ou ainda maiores. Esta arquitetura garante redundância nos componentes críticos. <a href="/docs/pt/install_cluster-milvusoperator.md">Saiba mais</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">O que torna o Milvus tão rápido?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus foi concebido desde o início para ser um sistema de base de dados vetorial altamente eficiente. Na maioria dos casos, o Milvus supera outras bases de dados vetoriais em 2 a 5 vezes (consulte os resultados do VectorDBBench). Este elevado desempenho é o resultado de várias decisões-chave de conceção:</p>
<p><strong>Otimização adaptada ao hardware</strong>: Para adaptar o Milvus a vários ambientes de hardware, otimizámos o seu desempenho especificamente para muitas arquiteturas e plataformas de hardware, incluindo AVX512, SIMD, GPUs e SSD NVMe.</p>
<p><strong>Algoritmos de pesquisa avançados</strong>: O Milvus suporta uma vasta gama de algoritmos de indexação/pesquisa na memória e no disco, incluindo IVF, HNSW, DiskANN e outros, todos eles profundamente otimizados. Em comparação com implementações populares como o FAISS e o HNSWLib, o Milvus oferece um desempenho 30% a 70% superior.</p>
<p><strong>Motor de pesquisa em C++</strong>: Mais de 80% do desempenho de uma base de dados vetorial é determinado pelo seu motor de pesquisa. O Milvus utiliza C++ para este componente crítico devido ao elevado desempenho da linguagem, à otimização de baixo nível e à gestão eficiente de recursos. Mais importante ainda, o Milvus integra inúmeras otimizações de código sensíveis ao hardware, que vão desde a vetorização ao nível da linguagem de montagem até à paralelização e agendamento multithread, para tirar pleno partido das capacidades do hardware.</p>
<p><strong>Orientado para colunas</strong>: O Milvus é um sistema de base de dados vetorial orientado para colunas. As principais vantagens decorrem dos padrões de acesso aos dados. Ao realizar consultas, uma base de dados orientada para colunas lê apenas os campos específicos envolvidos na consulta, em vez de linhas inteiras, o que reduz significativamente a quantidade de dados acedidos. Além disso, as operações em dados baseados em colunas podem ser facilmente vetorizadas, permitindo que as operações sejam aplicadas em colunas inteiras de uma só vez, melhorando ainda mais o desempenho.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">O que torna o Milvus tão escalável<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>Em 2022, o Milvus suportava vetores na ordem dos mil milhões e, em 2023, escalou para dezenas de mil milhões com estabilidade consistente, impulsionando cenários de grande escala para mais de 300 grandes empresas, incluindo a Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, etc.</p>
<p>A arquitetura de sistema nativa da nuvem e altamente desacoplada do Milvus garante que o sistema possa expandir-se continuamente à medida que os dados crescem:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Arquitetura de sistema altamente desacoplada do Milvus</span>
  
 </span></p>
<p>O próprio Milvus é totalmente sem estado, pelo que pode ser facilmente dimensionado com a ajuda do Kubernetes ou de nuvens públicas. Além disso, os componentes do Milvus estão bem desacoplados, sendo que as três tarefas mais críticas — pesquisa, inserção de dados e indexação/compactação — foram concebidas como processos facilmente paralelizáveis, com a lógica complexa separada. Isto garante que o nó de consulta, o nó de dados e o nó de índice correspondentes possam ser dimensionados tanto verticalmente como horizontalmente de forma independente, otimizando o desempenho e a eficiência de custos.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Tipos de pesquisas suportados pelo Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta vários tipos de funções de pesquisa para satisfazer as exigências de diferentes casos de utilização:</p>
<ul>
<li><a href="/docs/pt/single-vector-search.md#Basic-search">Pesquisa ANN</a>: Encontra os K vetores mais próximos do seu vetor de consulta.</li>
<li><a href="/docs/pt/single-vector-search.md#Filtered-search">Pesquisa com filtragem</a>: Realiza uma pesquisa ANN sob condições de filtragem especificadas.</li>
<li><a href="/docs/pt/single-vector-search.md#Range-search">Pesquisa por intervalo</a>: Encontra vetores dentro de um raio especificado a partir do seu vetor de consulta.</li>
<li><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a>: Realiza uma pesquisa ANN com base em vários campos vetoriais.</li>
<li><a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>: Pesquisa de texto completo com base no BM25.</li>
<li><a href="/docs/pt/weighted-ranker.md">Reordenação</a>: Ajusta a ordem dos resultados da pesquisa com base em critérios adicionais ou num algoritmo secundário, refinando os resultados iniciais da pesquisa ANN.</li>
<li><a href="/docs/pt/get-and-scalar-query.md#Get-Entities-by-ID">Recuperação</a>: Recupera dados pelas suas chaves primárias.</li>
<li><a href="/docs/pt/get-and-scalar-query.md#Use-Basic-Operators">Consulta</a>: Recupera dados utilizando expressões específicas.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Conjunto abrangente de funcionalidades<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Para além das principais funcionalidades de pesquisa mencionadas acima, o Milvus também disponibiliza um conjunto de funcionalidades implementadas em torno das pesquisas ANN, para que possa tirar o máximo partido das suas capacidades.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API e SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">API RESTful</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (SDK para Python) (oficial)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">SDK para Go</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">SDK para Java</a> (oficial)</li>
<li>SDK para<a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) (oficial)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (contribuição da Microsoft)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">SDK em C++</a> (oficial)</li>
<li>SDK Rust (em desenvolvimento)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipos de dados avançados<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>Para além dos tipos de dados primitivos, o Milvus suporta vários tipos de dados avançados e as respetivas métricas de distância aplicáveis.</p>
<ul>
<li><a href="/docs/pt/sparse_vector.md">Vetores esparsos</a></li>
<li><a href="/docs/pt/index-vector-fields.md">Vetores binários</a></li>
<li><a href="/docs/pt/use-json-fields.md">Suporte a JSON</a></li>
<li><a href="/docs/pt/array_data_type.md">Suporte a matrizes</a></li>
<li><a href="/docs/pt/geometry-field.md">Geolocalização</a></li>
<li>Texto (em desenvolvimento)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Porquê o Milvus?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>Alto desempenho em escala e alta disponibilidade</strong></p>
<p>O Milvus apresenta uma <a href="/docs/pt/architecture_overview.md">arquitetura distribuída</a> que separa <a href="/docs/pt/data_processing.md#Data-query">a computação</a> do <a href="/docs/pt/data_processing.md#Data-insertion">armazenamento</a>. O Milvus pode escalar horizontalmente e adaptar-se a diversos padrões de tráfego, alcançando um desempenho ideal ao aumentar de forma independente os nós de consulta para cargas de trabalho com grande volume de leituras e os nós de dados para cargas de trabalho com grande volume de gravações. Os microsserviços sem estado no K8s permitem <a href="/docs/pt/coordinator_ha.md#Coordinator-HA">uma recuperação rápida</a> em caso de falha, garantindo alta disponibilidade. O suporte a <a href="/docs/pt/replica.md">réplicas</a> melhora ainda mais a tolerância a falhas e a taxa de transferência, ao carregar segmentos de dados em vários nós de consulta. Consulte <a href="https://zilliz.com/vector-database-benchmark-tool">o benchmark</a> para uma comparação de desempenho.</p></li>
<li><p><strong>Suporte a vários tipos de índices vetoriais e aceleração por hardware</strong></p>
<p>O Milvus separa o sistema do motor de pesquisa vetorial principal, permitindo-lhe suportar todos os principais tipos de índices vetoriais otimizados para diferentes cenários, incluindo HNSW, IVF, FLAT (força bruta), SCANN e DiskANN, com variações <a href="/docs/pt/index-explained.md">baseadas em quantização</a> e <a href="/docs/pt/mmap.md">mmap</a>. O Milvus otimiza a pesquisa vetorial para funcionalidades avançadas, tais como <a href="/docs/pt/boolean.md">a filtragem de metadados</a> e <a href="/docs/pt/range-search.md">a pesquisa por intervalo</a>. Além disso, o Milvus implementa aceleração por hardware para melhorar o desempenho da pesquisa vetorial e suporta a indexação por GPU, como <a href="/docs/pt/gpu-cagra.md">o CAGRA</a> da NVIDIA.</p></li>
<li><p><strong>Multilocação flexível e armazenamento «quente»/«frio»</strong></p>
<p>O Milvus suporta <a href="/docs/pt/multi_tenancy.md#Multi-tenancy-strategies">a multilocação</a> através do isolamento ao nível da base de dados, da coleção, da partição ou da chave de partição. As estratégias flexíveis permitem que um único cluster lide com centenas a milhões de locatários, garantindo também um desempenho de pesquisa otimizado e um controlo de acesso flexível. O Milvus melhora a relação custo-benefício com o armazenamento «quente» e «frio». Os dados «quentes», acedidos com frequência, podem ser armazenados na memória ou em SSDs para um melhor desempenho, enquanto os dados «frios», menos acedidos, são mantidos num armazenamento mais lento e económico. Este mecanismo pode reduzir significativamente os custos, mantendo ao mesmo tempo um elevado desempenho para tarefas críticas.</p></li>
<li><p><strong>Vetor esparso para pesquisa de texto completo e pesquisa híbrida</strong></p>
<p>Para além da pesquisa semântica através de vetores densos, o Milvus também suporta nativamente <a href="/docs/pt/full-text-search.md">a pesquisa de texto completo</a> com BM25, bem como incorporações esparsas aprendidas, tais como SPLADE e BGE-M3. Os utilizadores podem armazenar vetores esparsos e vetores densos na mesma coleção e definir funções para reclassificar os resultados de múltiplas solicitações de pesquisa. Veja exemplos de <a href="/docs/pt/full_text_search_with_milvus.md">pesquisa híbrida com pesquisa semântica + pesquisa de texto completo</a>.</p></li>
<li><p><strong>Segurança de dados e controlo de acesso granular</strong></p>
<p>O Milvus garante a segurança dos dados através da implementação <a href="/docs/pt/authenticate.md">de autenticação obrigatória de utilizadores</a>, <a href="/docs/pt/tls.md">encriptação TLS</a> e <a href="/docs/pt/rbac.md">Controlo de Acesso Baseado em Funções (RBAC)</a>. A autenticação de utilizadores garante que apenas utilizadores autorizados com credenciais válidas possam aceder à base de dados, enquanto a encriptação TLS protege todas as comunicações dentro da rede. Além disso, o RBAC permite um controlo de acesso granular, atribuindo permissões específicas aos utilizadores com base nas suas funções. Estas funcionalidades tornam o Milvus uma escolha robusta e segura para aplicações empresariais, protegendo dados sensíveis contra o acesso não autorizado e potenciais violações.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integrações de IA<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Integrações de modelos de incorporação
Os modelos de incorporação convertem dados não estruturados na sua representação numérica num espaço de dados de alta dimensão, para que possa armazená-los no Milvus. Atualmente, o PyMilvus, o SDK para Python, integra vários modelos de incorporação para que possa preparar rapidamente os seus dados em incorporações vetoriais. Para mais detalhes, consulte <a href="/docs/pt/embeddings.md">a Visão Geral da Incorporação</a>.</p></li>
<li><p>Integrações de modelos de reclassificação
No domínio da recuperação de informação e da IA generativa, um reclassificador é uma ferramenta essencial que otimiza a ordem dos resultados das pesquisas iniciais. O PyMilvus também integra vários modelos de reclassificação para otimizar a ordem dos resultados devolvidos pelas pesquisas iniciais. Para mais detalhes, consulte <a href="/docs/pt/rerankers-overview.md">a Visão Geral dos Reclassificadores</a>.</p></li>
<li><p>Integrações com o LangChain e outras ferramentas de IA
Na era da IA gerativa (GenAI), ferramentas como o LangChain têm vindo a atrair muita atenção por parte dos programadores de aplicações. Como componente central, o Milvus funciona normalmente como armazenamento de vetores nessas ferramentas. Para saber como integrar o Milvus nas suas ferramentas de IA preferidas, consulte <a href="/docs/pt/integrate_with_openai.md">as</a> nossas <a href="/docs/pt/integrate_with_openai.md">Integrações</a> e <a href="/docs/pt/build-rag-with-milvus.md">Tutoriais</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Ferramentas e ecossistema<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Attu
O Attu é uma interface gráfica intuitiva e multifuncional que o ajuda a gerir o Milvus e os dados que este armazena. Para mais detalhes, consulte o repositório <a href="https://github.com/zilliztech/attu">do Attu</a>.</p></li>
<li><p>Birdwatcher
O Birdwatcher é uma ferramenta de depuração para o Milvus. Ao utilizá-la para se ligar ao etcd, pode verificar o estado do seu sistema Milvus ou configurá-lo em tempo real. Para mais detalhes, consulte o <a href="/docs/pt/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integrações com o Prometheus e o Grafana
O Prometheus é um conjunto de ferramentas de código aberto para monitorização e alertas do sistema no Kubernetes. O Grafana é uma plataforma de visualização de código aberto que se pode ligar a todas as fontes de dados. Pode utilizar o Prometheus e o Grafana como prestadores de serviços de monitorização para monitorizar visualmente o desempenho do Milvus distribuído. Para mais detalhes, consulte <a href="/docs/pt/monitor.md">«Implementação de serviços de monitorização</a>».</p></li>
<li><p>Milvus Backup
O Milvus Backup é uma ferramenta que permite aos utilizadores efetuar cópias de segurança e restaurar dados do Milvus. Disponibiliza tanto a CLI como a API para se adaptar a diferentes cenários de aplicação. Para mais detalhes, consulte <a href="/docs/pt/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC)
O Milvus CDC pode replicar alterações de dados de um cluster do Milvus para outro, para recuperação de desastres em modo primário-de reserva. Para mais detalhes, consulte <a href="/docs/pt/milvus_cdc_overview.md">Milvus CDC</a>.</p></li>
<li><p>Conectores do Milvus
O Milvus disponibiliza um conjunto de conectores para que possa integrar o Milvus de forma transparente com ferramentas de terceiros, como o Apache Spark. Atualmente, pode utilizar o nosso Conector Spark para enviar os seus dados do Milvus para o Apache Spark, para processamento de aprendizagem automática. Para mais detalhes, consulte <a href="/docs/pt/integrate_with_spark.md">Conector Spark-Milvus</a>.</p></li>
<li><p>Serviços de Transmissão de Vetores (VTS)
O Milvus fornece um conjunto de ferramentas para transferir os seus dados entre uma instância do Milvus e várias fontes de dados, incluindo clusters Zilliz, Elasticsearch, Postgres (PgVector) e outra instância do Milvus. Para mais detalhes, consulte <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
