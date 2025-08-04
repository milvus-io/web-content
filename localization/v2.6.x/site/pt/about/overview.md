---
id: overview.md
title: O que é o Milvus
related_key: Milvus Overview
summary: >-
  O Milvus é uma base de dados vetorial de alto desempenho e altamente escalável
  que funciona de forma eficiente numa vasta gama de ambientes, desde um
  computador portátil a sistemas distribuídos de grande escala. Está disponível
  como software de código aberto e como um serviço em nuvem.
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
</span></span> é uma ave de rapina do género Milvus da família dos falcões Accipaitridae, famosa pela sua velocidade de voo, visão apurada e notável adaptabilidade.</p>
<style>
  audio::-webkit-media-controls { display: none !important; }</style>
<p>A Zilliz adopta o nome Milvus para a sua base de dados vetorial de código aberto, de elevado desempenho e altamente escalável, que funciona eficientemente numa vasta gama de ambientes, desde um computador portátil a sistemas distribuídos de grande escala. Está disponível como software de código aberto e como um serviço na nuvem.</p>
<p>Desenvolvido por Zilliz e rapidamente doado à LF AI &amp; Data Foundation no âmbito da Linux Foundation, o Milvus tornou-se um dos principais projectos de bases de dados vectoriais de código aberto do mundo. É distribuído ao abrigo da licença Apache 2.0 e a maioria dos colaboradores são especialistas da comunidade de computação de alto desempenho (HPC), especializados na criação de sistemas de grande escala e na otimização de código sensível ao hardware. Os principais colaboradores incluem profissionais da Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba e Microsoft.</p>
<p>Curiosamente, cada projeto de código aberto Zilliz tem o nome de um pássaro, uma convenção de nomes que simboliza a liberdade, a previsão e a evolução ágil da tecnologia.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Dados não estruturados, Embeddings e Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Os dados não estruturados, tais como texto, imagens e áudio, variam em formato e transportam uma semântica subjacente rica, o que torna a sua análise difícil. Para gerir esta complexidade, os embeddings são utilizados para converter dados não estruturados em vectores numéricos que captam as suas caraterísticas essenciais. Estes vectores são então armazenados numa base de dados vetorial, permitindo pesquisas e análises rápidas e escaláveis.</p>
<p>Milvus oferece capacidades robustas de modelação de dados, permitindo-lhe organizar os seus dados não estruturados ou multimodais em colecções estruturadas. Suporta uma vasta gama de tipos de dados para diferentes modelações de atributos, incluindo tipos numéricos e de caracteres comuns, vários tipos de vectores, matrizes, conjuntos e JSON, poupando-lhe o esforço de manter vários sistemas de bases de dados.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>Dados não estruturados, embeddings e Milvus</span> </span></p>
<p>Milvus oferece três modos de implantação, cobrindo uma ampla gama de escalas de dados - desde a prototipagem local em Jupyter Notebooks até clusters Kubernetes massivos que gerenciam dezenas de bilhões de vetores:</p>
<ul>
<li>O Milvus Lite é uma biblioteca Python que pode ser facilmente integrada nas suas aplicações. Como uma versão leve do Milvus, é ideal para prototipagem rápida em Jupyter Notebooks ou execução em dispositivos de borda com recursos limitados. <a href="/docs/pt/milvus_lite.md">Saiba mais</a>.</li>
<li>O Milvus Standalone é uma implantação de servidor de máquina única, com todos os componentes agrupados em uma única imagem Docker para uma implantação conveniente. <a href="/docs/pt/install_standalone-docker.md">Saiba mais</a>.</li>
<li>O Milvus Distributed pode ser implementado em clusters Kubernetes, apresentando uma arquitetura nativa da cloud concebida para cenários à escala de mil milhões ou ainda maiores. Essa arquitetura garante redundância em componentes críticos. <a href="/docs/pt/install_cluster-milvusoperator.md">Saiba mais</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">O que torna o Milvus tão rápido？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus foi concebido desde o primeiro dia para ser um sistema de base de dados vetorial altamente eficiente. Na maioria dos casos, Milvus supera outros bancos de dados vetoriais em 2-5x (veja os resultados do VectorDBBench). Esse alto desempenho é o resultado de várias decisões importantes de projeto:</p>
<p><strong>Otimização sensível ao hardware</strong>: Para acomodar o Milvus em vários ambientes de hardware, optimizámos o seu desempenho especificamente para muitas arquitecturas e plataformas de hardware, incluindo AVX512, SIMD, GPUs e SSD NVMe.</p>
<p><strong>Algoritmos de pesquisa avançados</strong>: O Milvus suporta uma vasta gama de algoritmos de indexação/pesquisa na memória e no disco, incluindo IVF, HNSW, DiskANN, entre outros, todos profundamente optimizados. Em comparação com implementações populares como FAISS e HNSWLib, Milvus oferece desempenho 30%-70% melhor.</p>
<p><strong>Mecanismo de pesquisa em C++</strong>: Mais de 80% do desempenho de uma base de dados vetorial é determinado pelo seu motor de pesquisa. O Milvus utiliza C++ para este componente crítico devido ao elevado desempenho da linguagem, à otimização de baixo nível e à gestão eficiente dos recursos. Mais importante ainda, Milvus integra numerosas optimizações de código sensíveis ao hardware, que vão desde a vectorização ao nível da montagem até à paralelização e programação multi-thread, para tirar o máximo partido das capacidades do hardware.</p>
<p><strong>Orientado a colunas</strong>: Milvus é um sistema de banco de dados vetorial orientado a colunas. As principais vantagens vêm dos padrões de acesso aos dados. Ao efetuar consultas, uma base de dados orientada por colunas lê apenas os campos específicos envolvidos na consulta, em vez de linhas inteiras, o que reduz consideravelmente a quantidade de dados acedidos. Além disso, as operações em dados baseados em colunas podem ser facilmente vectorizadas, permitindo que as operações sejam aplicadas em todas as colunas de uma só vez, melhorando ainda mais o desempenho.</p>
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
    </button></h2><p>Em 2022, Milvus suportou vetores de escala de bilhões e, em 2023, escalou até dezenas de bilhões com estabilidade consistente, alimentando cenários de grande escala para mais de 300 grandes empresas, incluindo Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, etc.</p>
<p>A arquitetura de sistema nativa da nuvem e altamente desacoplada de Milvus garante que o sistema pode expandir-se continuamente à medida que os dados crescem:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Arquitetura de sistema altamente dissociada de Milvus</span> </span></p>
<p>O próprio Milvus é totalmente sem estado, pelo que pode ser facilmente escalado com a ajuda de Kubernetes ou nuvens públicas. Além disso, os componentes do Milvus são bem desacoplados, com as três tarefas mais críticas - pesquisa, inserção de dados e indexação/compactação - projetadas como processos facilmente paralelizados, com lógica complexa separada. Isto assegura que o nó de consulta correspondente, o nó de dados e o nó de índice podem ser escalados independentemente, optimizando o desempenho e a eficiência de custos.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Tipos de pesquisas suportadas pelo Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus suporta vários tipos de funções de pesquisa para satisfazer as exigências de diferentes casos de utilização:</p>
<ul>
<li><a href="/docs/pt/single-vector-search.md#Basic-search">Pesquisa ANN</a>: Encontra os K vectores de topo mais próximos do seu vetor de consulta.</li>
<li><a href="/docs/pt/single-vector-search.md#Filtered-search">Pesquisa de filtragem</a>: Executa a pesquisa ANN sob condições de filtragem especificadas.</li>
<li><a href="/docs/pt/single-vector-search.md#Range-search">Pesquisa de intervalo</a>: Encontra vetores dentro de um raio especificado a partir do vetor de consulta.</li>
<li><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a>: Realiza a pesquisa ANN com base em vários campos vetoriais.</li>
<li><a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>: Pesquisa de texto completo com base no BM25.</li>
<li><a href="/docs/pt/weighted-ranker.md">Reranking</a>: Ajusta a ordem dos resultados da pesquisa com base em critérios adicionais ou num algoritmo secundário, refinando os resultados iniciais da pesquisa ANN.</li>
<li><a href="/docs/pt/get-and-scalar-query.md#Get-Entities-by-ID">Buscar</a>: Recupera dados pelas suas chaves primárias.</li>
<li><a href="/docs/pt/get-and-scalar-query.md#Use-Basic-Operators">Consulta</a>: Recupera dados utilizando expressões específicas.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Conjunto abrangente de caraterísticas<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Para além das principais funcionalidades de pesquisa mencionadas acima, o Milvus também fornece um conjunto de funcionalidades implementadas em torno das pesquisas ANN para que possa utilizar plenamente as suas capacidades.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API e SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">API RESTful</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK) (oficial)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (oficial)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (contribuição da Microsoft)</li>
<li>C++ SDK (em desenvolvimento)</li>
<li>Rust SDK (em desenvolvimento)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipos de dados avançados</h3><p>Para além dos tipos de dados primitivos, o Milvus suporta vários tipos de dados avançados e as respectivas métricas de distância aplicáveis.</p>
<ul>
<li><a href="/docs/pt/sparse_vector.md">Vectores esparsos</a></li>
<li><a href="/docs/pt/index-vector-fields.md">Vectores binários</a></li>
<li><a href="/docs/pt/use-json-fields.md">Suporte a JSON</a></li>
<li><a href="/docs/pt/array_data_type.md">Suporte a matrizes</a></li>
<li>Texto (em desenvolvimento)</li>
<li>Geolocalização (em desenvolvimento)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Porquê Milvus?</h3><ul>
<li><p><strong>Alto desempenho em escala e alta disponibilidade</strong></p>
<p>Milvus apresenta uma <a href="/docs/pt/architecture_overview.md">arquitetura distribuída</a> que separa a <a href="/docs/pt/data_processing.md#Data-query">computação do</a> <a href="/docs/pt/data_processing.md#Data-insertion">armazenamento</a>. O Milvus pode escalar horizontalmente e adaptar-se a diversos padrões de tráfego, alcançando um desempenho ótimo ao aumentar independentemente os nós de consulta para cargas de trabalho de leitura intensiva e os nós de dados para cargas de trabalho de escrita intensiva. Os microsserviços sem estado no K8s permitem <a href="/docs/pt/coordinator_ha.md#Coordinator-HA">uma rápida recuperação</a> de falhas, garantindo uma elevada disponibilidade. O suporte para <a href="/docs/pt/replica.md">réplicas</a> aumenta ainda mais a tolerância a falhas e a taxa de transferência ao carregar segmentos de dados em vários nós de consulta. Veja <a href="https://zilliz.com/vector-database-benchmark-tool">o benchmark</a> para comparação de desempenho.</p></li>
<li><p><strong>Suporte para vários tipos de índices vectoriais e aceleração de hardware</strong></p>
<p>O Milvus separa o sistema e o motor de pesquisa vetorial principal, permitindo-lhe suportar todos os principais tipos de índices vectoriais optimizados para diferentes cenários, incluindo HNSW, IVF, FLAT (força bruta), SCANN e DiskANN, com variações <a href="/docs/pt/index-explained.md">baseadas na quantização</a> e <a href="/docs/pt/mmap.md">mmap</a>. O Milvus optimiza a pesquisa vetorial para funcionalidades avançadas, como a <a href="/docs/pt/boolean.md">filtragem de metadados</a> e <a href="/docs/pt/range-search.md">a pesquisa por intervalos</a>. Além disso, o Milvus implementa a aceleração de hardware para melhorar o desempenho da pesquisa vetorial e oferece suporte à indexação de GPU, como o <a href="/docs/pt/gpu-cagra.md">CAGRA</a> da NVIDIA.</p></li>
<li><p><strong>Multitenancy flexível e armazenamento Hot/Cold</strong></p>
<p>O Milvus suporta <a href="/docs/pt/multi_tenancy.md#Multi-tenancy-strategies">multi-tenancy</a> através do isolamento ao nível da base de dados, coleção, partição ou chave de partição. As estratégias flexíveis permitem que um único cluster lide com centenas a milhões de inquilinos, garantindo também um desempenho de pesquisa optimizado e um controlo de acesso flexível. O Milvus melhora a relação custo-benefício com o armazenamento quente/frio. Os dados quentes acedidos com frequência podem ser armazenados na memória ou em SSDs para um melhor desempenho, enquanto os dados frios menos acedidos são mantidos num armazenamento mais lento e económico. Este mecanismo pode reduzir significativamente os custos, mantendo um elevado desempenho para tarefas críticas.</p></li>
<li><p><strong>Vetor esparso para pesquisa de texto integral e pesquisa híbrida</strong></p>
<p>Para além da pesquisa semântica através de vetor denso, o Milvus também suporta nativamente <a href="/docs/pt/full-text-search.md">a pesquisa de texto completo</a> com BM25, bem como a incorporação esparsa aprendida, como SPLADE e BGE-M3. Os utilizadores podem armazenar o vetor esparso e o vetor denso na mesma coleção e definir funções para classificar os resultados de vários pedidos de pesquisa. Ver exemplos de <a href="/docs/pt/full_text_search_with_milvus.md">pesquisa híbrida com pesquisa semântica + pesquisa de texto integral</a>.</p></li>
<li><p><strong>Segurança dos dados e controlo de acesso de grão fino</strong></p>
<p>Milvus garante a segurança dos dados através da implementação de <a href="/docs/pt/authenticate.md">autenticação obrigatória do utilizador</a>, <a href="/docs/pt/tls.md">encriptação TLS</a> e <a href="/docs/pt/rbac.md">controlo de acesso baseado em funções (RBAC)</a>. A autenticação do utilizador garante que apenas os utilizadores autorizados com credenciais válidas podem aceder à base de dados, enquanto a encriptação TLS protege todas as comunicações dentro da rede. Adicionalmente, o RBAC permite um controlo de acesso mais fino, atribuindo permissões específicas aos utilizadores com base nas suas funções. Estas caraterísticas fazem do Milvus uma escolha robusta e segura para aplicações empresariais, protegendo os dados sensíveis de acessos não autorizados e potenciais violações.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integrações de IA</h3><ul>
<li><p>Integrações de modelos de incorporação Os modelos de incorporação convertem dados não estruturados para a sua representação numérica no espaço de dados de alta dimensão, para que os possa armazenar em Milvus. Atualmente, o PyMilvus, o SDK Python, integra vários modelos de incorporação para que possa preparar rapidamente os seus dados em incorporação de vectores. Para obter detalhes, consulte <a href="/docs/pt/embeddings.md">Visão geral da incorporação</a>.</p></li>
<li><p>Integrações de modelos de ranqueamento No domínio da recuperação de informações e da IA generativa, um ranqueador é uma ferramenta essencial que otimiza a ordem dos resultados das pesquisas iniciais. O PyMilvus também integra vários modelos de reranking para otimizar a ordem dos resultados retornados das pesquisas iniciais. Para obter detalhes, consulte <a href="/docs/pt/rerankers-overview.md">Visão geral dos ranqueadores</a>.</p></li>
<li><p>LangChain e outras integrações de ferramentas de IA Na era da GenAI, as ferramentas, como a LangChain, ganham muita atenção dos programadores de aplicações. Como componente central, o Milvus serve normalmente como armazém de vectores nessas ferramentas. Para saber como integrar o Milvus nas suas ferramentas de IA favoritas, consulte as nossas <a href="/docs/pt/integrate_with_openai.md">Integrações</a> e <a href="/docs/pt/build-rag-with-milvus.md">Tutoriais</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Ferramentas e Ecossistema</h3><ul>
<li><p>Attu Attu é um GUI tudo-em-um intuitivo que o ajuda a gerir Milvus e os dados que armazena. Para mais informações, consulte o repositório <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher O Birdwatcher é uma ferramenta de depuração para o Milvus. Usando-o para se conectar ao etcd, você pode verificar o estado do seu sistema Milvus ou configurá-lo em tempo real. Para obter detalhes, consulte <a href="/docs/pt/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integrações do Promethus e do Grafana O Prometheus é um kit de ferramentas de monitoramento e alerta de sistema de código aberto para o Kubernetes. Grafana é uma pilha de visualização de código aberto que pode se conectar a todas as fontes de dados. Você pode usar o Promethus &amp; Grafana como provedor de serviços de monitoramento para monitorar visualmente o desempenho do Milvus distribuído. Para obter detalhes, consulte <a href="/docs/pt/monitor.md">Implantação de serviços de monitoramento</a>.</p></li>
<li><p>Milvus Backup O Milvus Backup é uma ferramenta que permite aos utilizadores fazer cópias de segurança e restaurar dados do Milvus. Ele fornece tanto CLI e API para se encaixar em diferentes cenários de aplicação. Para mais informações, consulte <a href="/docs/pt/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC pode capturar e sincronizar dados incrementais em instâncias Milvus e garante a fiabilidade dos dados de negócios, transferindo-os perfeitamente entre instâncias de origem e de destino, permitindo fácil backup incremental e recuperação de desastres. Para mais informações, consulte <a href="/docs/pt/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Conectores do Milvus O Milvus planeou um conjunto de conectores para que possa integrar o Milvus com ferramentas de terceiros, como o Apache Spark. Atualmente, pode utilizar o nosso Conector Spark para alimentar os dados do Milvus com o Apache Spark para processamento de aprendizagem automática. Para obter detalhes, consulte o <a href="/docs/pt/integrate_with_spark.md">Conector Spark-Milvus</a>.</p></li>
<li><p>Vetor Transmission Services (VTS) O Milvus fornece um conjunto de ferramentas para transferir os seus dados entre uma instância Milvus e um conjunto de fontes de dados, incluindo clusters Zilliz, Elasticsearch, Postgres (PgVector) e outra instância Milvus. Para mais informações, consulte <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
