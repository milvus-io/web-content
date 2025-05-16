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
    </button></h1><p>O Milvus é uma base de dados vetorial de alto desempenho e altamente escalável que funciona de forma eficiente numa vasta gama de ambientes, desde um computador portátil a sistemas distribuídos de grande escala. Está disponível como software de código aberto e como um serviço na nuvem.</p>
<p>O Milvus é um projeto de código aberto da LF AI &amp; Data Foundation, distribuído ao abrigo da licença Apache 2.0. A maioria dos colaboradores são especialistas da comunidade de computação de alto desempenho (HPC), especializados na construção de sistemas de grande escala e na otimização de código sensível ao hardware. Os principais colaboradores incluem profissionais da Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba e Microsoft.</p>
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
    </button></h2><p>Dados não estruturados, como texto, imagens e áudio, variam em formato e carregam uma rica semântica subjacente, o que torna sua análise desafiadora. Para gerir esta complexidade, os embeddings são utilizados para converter dados não estruturados em vectores numéricos que captam as suas caraterísticas essenciais. Estes vectores são depois armazenados numa base de dados vetorial, permitindo pesquisas e análises rápidas e escaláveis.</p>
<p>Milvus oferece capacidades robustas de modelação de dados, permitindo-lhe organizar os seus dados não estruturados ou multimodais em colecções estruturadas. Suporta uma vasta gama de tipos de dados para diferentes modelações de atributos, incluindo tipos numéricos e de caracteres comuns, vários tipos de vectores, matrizes, conjuntos e JSON, poupando-lhe o esforço de manter vários sistemas de bases de dados.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>Dados não estruturados, embeddings e Milvus</span> </span></p>
<p>O Milvus oferece três modos de implantação, cobrindo uma ampla gama de escalas de dados - desde a prototipagem local em Jupyter Notebooks até clusters Kubernetes massivos que gerenciam dezenas de bilhões de vetores:</p>
<ul>
<li>O Milvus Lite é uma biblioteca Python que pode ser facilmente integrada nas suas aplicações. Como uma versão leve do Milvus, é ideal para prototipagem rápida em Jupyter Notebooks ou execução em dispositivos de borda com recursos limitados. <a href="/docs/pt/v2.4.x/milvus_lite.md">Saiba mais</a>.</li>
<li>O Milvus Standalone é uma implantação de servidor de máquina única, com todos os componentes agrupados em uma única imagem Docker para uma implantação conveniente. <a href="/docs/pt/v2.4.x/install_standalone-docker.md">Saiba mais</a>.</li>
<li>O Milvus Distributed pode ser implementado em clusters Kubernetes, apresentando uma arquitetura nativa da cloud concebida para cenários à escala de mil milhões ou ainda maiores. Essa arquitetura garante redundância em componentes críticos. <a href="/docs/pt/v2.4.x/install_cluster-milvusoperator.md">Saiba mais</a>.</li>
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
<p><strong>Mecanismo de pesquisa em C++</strong>: Mais de 80% do desempenho de uma base de dados vetorial é determinado pelo seu motor de pesquisa. O Milvus utiliza C++ para este componente crítico devido ao elevado desempenho da linguagem, à otimização de baixo nível e à gestão eficiente dos recursos. Mais importante ainda, o Milvus integra numerosas optimizações de código sensíveis ao hardware, que vão desde a vectorização ao nível da montagem até à paralelização e programação multi-thread, para tirar o máximo partido das capacidades do hardware.</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/highly-decoupled-architecture.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
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
<li><a href="/docs/pt/v2.4.x/single-vector-search.md#Basic-search">Pesquisa ANN</a>: Encontra os K vectores de topo mais próximos do seu vetor de consulta.</li>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md#Filtered-search">Pesquisa de filtragem</a>: Executa a pesquisa ANN sob condições de filtragem especificadas.</li>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md#Range-search">Pesquisa de intervalo</a>: Encontra vetores dentro de um raio especificado a partir do vetor de consulta.</li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa híbrida</a>: Realiza a pesquisa ANN com base em vários campos vetoriais.</li>
<li>Pesquisa de palavras-chave: Pesquisa de palavras-chave com base no BM25.</li>
<li><a href="/docs/pt/v2.4.x/reranking.md">Reranking</a>: Ajusta a ordem dos resultados da pesquisa com base em critérios adicionais ou num algoritmo secundário, refinando os resultados iniciais da pesquisa ANN.</li>
<li><a href="/docs/pt/v2.4.x/get-and-scalar-query.md#Get-Entities-by-ID">Buscar</a>: Recupera dados pelas suas chaves primárias.</li>
<li><a href="/docs/pt/v2.4.x/get-and-scalar-query.md#Use-Basic-Operators">Consulta</a>: Recupera dados utilizando expressões específicas.</li>
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
    </button></h2><p>Para além das principais funcionalidades de pesquisa mencionadas acima, o Milvus também fornece um conjunto de funcionalidades implementadas em torno das pesquisas ANN para que possa utilizar plenamente as suas capacidades.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API e SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">API RESTful</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK) (oficial)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (oficial)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (contribuição da Microsoft)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipos de dados avançados</h3><p>Para além dos tipos de dados primitivos, o Milvus suporta vários tipos de dados avançados e as respectivas métricas de distância aplicáveis.</p>
<ul>
<li><a href="/docs/pt/v2.4.x/sparse_vector.md">Vectores esparsos</a></li>
<li><a href="/docs/pt/v2.4.x/index-vector-fields.md">Vectores binários</a></li>
<li><a href="/docs/pt/v2.4.x/use-json-fields.md">Suporte a JSON</a></li>
<li><a href="/docs/pt/v2.4.x/array_data_type.md">Suporte a matrizes</a></li>
<li><a href="/docs/pt/v2.4.x/metric.md">Métricas de distância</a></li>
</ul>
<h3 id="Acceleration" class="common-anchor-header">Aceleração</h3><ul>
<li><p>Algoritmos de Busca O Milvus suporta um conjunto de algoritmos de indexação e busca ajustáveis. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/index.md">Índice na memória</a>, <a href="/docs/pt/v2.4.x/disk_index.md">Índice no disco</a> e <a href="/docs/pt/v2.4.x/gpu_index.md">Índice de GPU</a>.</p></li>
<li><p>Partições e chaves de partição As partições são subdivisões de uma coleção Milvus. É possível escolher um campo escalar como chave de partição para um melhor desempenho de pesquisa. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/manage-partitions.md">Gerenciar partições</a> e <a href="/docs/pt/v2.4.x/use-partition-key.md">Usar chave de partição</a>.</p></li>
<li><p>Modelo de consistência ajustável A consistência garante que cada nó ou réplica do Milvus tenha a mesma visão dos dados ao escrever ou ler dados em um determinado momento. É possível ajustar facilmente o nível de consistência ao realizar pesquisas ANN no Milvus. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/consistency.md">Consistência</a>.</p></li>
<li><p>Importação de dados de alto rendimento Para importar um grande volume de dados para o Milvus em vez de inseri-los um após o outro, considere usar nossas ferramentas de importação de dados de alto rendimento. Para mais detalhes, consulte <a href="/docs/pt/v2.4.x/prepare-source-data.md">Preparar dados de origem</a> e <a href="/docs/pt/v2.4.x/import-data.md">Importar dados</a>.</p></li>
<li><p>Suporte Multi-tenancy Milvus implementou uma série de caraterísticas orientadas para cenários multi-tenancy, incluindo Partition Key, Clustering Key, e mais. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/multi_tenancy.md">Estratégias de multilocação</a>.</p></li>
</ul>
<h3 id="Security-and-Authorization" class="common-anchor-header">Segurança e Autorização</h3><ul>
<li><p>Modelo de consistência ajustável A consistência garante que cada nó ou réplica do Milvus tenha a mesma visão dos dados ao escrever ou ler dados em um determinado momento. É possível ajustar facilmente o nível de consistência ao realizar pesquisas ANN no Milvus. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/consistency.md">Consistência</a>.</p></li>
<li><p>Isolamento de dados e controlo de recursos Para cenários de multi-tenancy, o isolamento de dados é o requisito básico de segurança. Milvus implementa vários recursos para resolver suas preocupações de segurança. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/resource_group.md">Gerenciar grupos de recursos</a> e <a href="/docs/pt/v2.4.x/clustering-compaction.md">Compactação de clustering</a>.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integrações de IA</h3><ul>
<li><p>Integrações de modelos de incorporação Os modelos de incorporação convertem dados não estruturados para a sua representação numérica num espaço de dados de elevada dimensão, para que possa armazená-los em Milvus. Atualmente, o PyMilvus, o SDK Python, integra vários modelos de incorporação para que possa preparar rapidamente os seus dados em incorporação de vectores. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/embeddings.md">Visão geral da incorporação</a>.</p></li>
<li><p>Integrações de modelos de ranqueamento No domínio da recuperação de informações e da IA generativa, um ranqueador é uma ferramenta essencial que otimiza a ordem dos resultados das pesquisas iniciais. O PyMilvus também integra vários modelos de reranking para otimizar a ordem dos resultados retornados das pesquisas iniciais. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/rerankers-overview.md">Visão geral dos ranqueadores</a>.</p></li>
<li><p>LangChain e outras integrações de ferramentas de IA Na era da GenAI, as ferramentas, como a LangChain, ganham muita atenção dos programadores de aplicações. Como componente central, o Milvus serve normalmente como armazém de vectores nessas ferramentas. Para saber como integrar o Milvus nas suas ferramentas de IA favoritas, consulte as nossas <a href="/docs/pt/v2.4.x/integrate_with_openai.md">Integrações</a> e <a href="/docs/pt/v2.4.x/build-rag-with-milvus.md">Tutoriais</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Ferramentas e Ecossistema</h3><ul>
<li><p>Attu Attu é um GUI intuitivo e tudo-em-um que o ajuda a gerir o Milvus e os dados que armazena. Para mais informações, consulte o repositório <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher Birdwatcher é uma ferramenta de depuração para o Milvus. Usando-o para se conectar ao etcd, você pode verificar o estado do seu sistema Milvus ou configurá-lo em tempo real. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integrações do Promethus e do Grafana O Prometheus é um kit de ferramentas de monitoramento e alerta de sistema de código aberto para o Kubernetes. Grafana é uma pilha de visualização de código aberto que pode se conectar a todas as fontes de dados. Você pode usar o Promethus &amp; Grafana como provedor de serviços de monitoramento para monitorar visualmente o desempenho do Milvus distribuído. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/monitor.md">Implantação de serviços de monitoramento</a>.</p></li>
<li><p>Milvus Backup O Milvus Backup é uma ferramenta que permite aos utilizadores fazer cópias de segurança e restaurar dados do Milvus. Ele fornece tanto CLI e API para se encaixar em diferentes cenários de aplicação. Para mais informações, consulte <a href="/docs/pt/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC pode capturar e sincronizar dados incrementais em instâncias Milvus e garante a fiabilidade dos dados de negócios, transferindo-os perfeitamente entre instâncias de origem e de destino, permitindo fácil backup incremental e recuperação de desastres. Para mais informações, consulte <a href="/docs/pt/v2.4.x/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Conectores do Milvus O Milvus planeou um conjunto de conectores para que possa integrar o Milvus com ferramentas de terceiros, como o Apache Spark. Atualmente, pode utilizar o nosso Conector Spark para alimentar os dados do Milvus com o Apache Spark para processamento de aprendizagem automática. Para obter detalhes, consulte o <a href="/docs/pt/v2.4.x/integrate_with_spark.md">Conector Spark-Milvus</a>.</p></li>
<li><p>Vetor Transmission Services (VTS) O Milvus fornece um conjunto de ferramentas para transferir os seus dados entre uma instância Milvus e um conjunto de fontes de dados, incluindo clusters Zilliz, Elasticsearch, Postgres (PgVector) e outra instância Milvus. Para mais informações, consulte <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
