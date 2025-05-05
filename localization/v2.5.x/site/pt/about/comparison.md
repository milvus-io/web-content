---
id: comparison.md
title: Comparação
summary: Este artigo compara o Milvus com outras soluções de pesquisa vetorial.
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">Comparação do Milvus com alternativas<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>Ao explorar várias opções de bases de dados vectoriais, este guia abrangente irá ajudá-lo a compreender as caraterísticas únicas do Milvus, garantindo que escolhe a base de dados que melhor se adapta às suas necessidades específicas. Em particular, o Milvus é uma das principais bases de dados vectoriais de código aberto, e <a href="https://zilliz.com/cloud">a Zilliz Cloud</a> oferece um serviço Milvus totalmente gerido. Para avaliar objetivamente o Milvus em relação aos seus concorrentes, considere a utilização de <a href="https://github.com/zilliztech/VectorDBBench#quick-start">ferramentas de benchmark</a> para analisar as métricas de desempenho.</p>
<h2 id="Milvus-highlights" class="common-anchor-header">Destaques do Milvus<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
<li><p><strong>Funcionalidade</strong>: O Milvus vai além da pesquisa básica de semelhanças vectoriais, suportando funcionalidades avançadas como <a href="https://milvus.io/docs/sparse_vector.md">vetor esparso</a>, <a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">vetor em massa</a>, <a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">pesquisa filtrada</a> e capacidades <a href="https://milvus.io/docs/multi-vector-search.md">de pesquisa híbrida</a>.</p></li>
<li><p><strong>Flexibilidade</strong>: O Milvus acomoda vários modos de implantação e vários SDKs, tudo dentro de um ecossistema robusto e integrado.</p></li>
<li><p><strong>Desempenho</strong>: O Milvus garante o processamento em tempo real com alta taxa de transferência e baixa latência, alimentado por algoritmos de indexação otimizados, como <a href="https://milvus.io/docs/index.md#HNSW">HNSW</a> e <a href="https://milvus.io/docs/disk_index.md">DiskANN</a>, e <a href="https://milvus.io/docs/gpu_index.md">aceleração</a> avançada <a href="https://milvus.io/docs/gpu_index.md">de GPU</a>.</p></li>
<li><p><strong>Escalabilidade</strong>: A sua arquitetura distribuída personalizada é escalável sem esforço, acomodando desde pequenos conjuntos de dados a colecções que excedem os 10 mil milhões de vectores.</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">Comparação geral<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Para comparar entre Milvus e Pinecone, duas soluções de bases de dados vectoriais, a tabela seguinte está estruturada de modo a realçar as diferenças entre as várias caraterísticas.</p>
<table>
<thead>
<tr><th>Caraterística</th><th>Pinecone</th><th>Milvus</th><th>Observações</th></tr>
</thead>
<tbody>
<tr><td>Modos de implementação</td><td>Apenas SaaS</td><td>Milvus Lite, Autónomo e Cluster no local, Zilliz Cloud Saas e BYOC</td><td>O Milvus oferece maior flexibilidade nos modos de implantação.</td></tr>
<tr><td>SDKs suportados</td><td>Python, JavaScript/TypeScript</td><td>Python, Java, NodeJS, Go, API Restful, C#, Rust</td><td>Milvus suporta uma maior variedade de linguagens de programação.</td></tr>
<tr><td>Estado do código aberto</td><td>Fechado</td><td>Código aberto</td><td>Milvus é uma popular base de dados vetorial de código aberto.</td></tr>
<tr><td>Escalabilidade</td><td>Escalar apenas para cima/baixo</td><td>Escalar para fora/para dentro e escalar para cima/baixo</td><td>O Milvus possui uma arquitetura distribuída para uma maior escalabilidade.</td></tr>
<tr><td>Disponibilidade</td><td>Arquitetura baseada em pods nas zonas disponíveis</td><td>Failover de zona disponível e HA entre regiões</td><td>O Milvus CDC (Change Data Capture) permite modos primário/em espera para uma maior disponibilidade.</td></tr>
<tr><td>Custo de desempenho (dólar por milhão de consultas)</td><td>A partir de US$ 0,178 para um conjunto de dados médio, US$ 1,222 para um conjunto de dados grande</td><td>O Zilliz Cloud começa em US$ 0,148 para um conjunto de dados médio, US$ 0,635 para um conjunto de dados grande; versão gratuita disponível</td><td>Consulte o <a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">relatório de classificação de custos</a>.</td></tr>
<tr><td>Aceleração de GPU</td><td>Não suportado</td><td>Suporte à GPU NVIDIA</td><td>A aceleração de GPU melhora significativamente o desempenho, muitas vezes em ordens de magnitude.</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">Comparação de terminologia<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Embora ambos desempenhem funções semelhantes como bases de dados vectoriais, a terminologia específica do domínio entre Milvus e Pinecone apresenta ligeiras variações. Segue-se uma comparação pormenorizada da terminologia.</p>
<table>
<thead>
<tr><th>Pinecone</th><th>Milvus</th><th>Observações</th></tr>
</thead>
<tbody>
<tr><td>Índice</td><td><a href="https://zilliz.com/comparison">Coleção</a></td><td>Em Pinecone, um índice serve como unidade organizacional para armazenar e gerir vectores de tamanho idêntico, e este índice está intimamente integrado com o hardware, conhecido como pods. Em contrapartida, as colecções Milvus têm um objetivo semelhante, mas permitem gerir várias colecções numa única instância.</td></tr>
<tr><td>Coleção</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">Backup</a></td><td>Em Pinecone, uma coleção é essencialmente um instantâneo estático de um índice, usado principalmente para fins de backup e não pode ser consultado. Em Milvus, a funcionalidade equivalente para criar cópias de segurança é mais transparente e tem um nome simples.</td></tr>
<tr><td>Espaço de nome</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">Chave de partição</a></td><td>Os espaços de nomes permitem a partição de vectores num índice em subconjuntos. Milvus fornece vários métodos como partição ou chave de partição para garantir o isolamento eficiente dos dados dentro de uma coleção.</td></tr>
<tr><td>Metadados</td><td><a href="https://milvus.io/docs/boolean.md">Campo escalar</a></td><td>O tratamento de metadados do Pinecone baseia-se em pares chave-valor, enquanto o Milvus permite campos escalares complexos, incluindo tipos de dados padrão e campos JSON dinâmicos.</td></tr>
<tr><td>Consulta</td><td><a href="https://milvus.io/docs/single-vector-search.md">Pesquisa</a></td><td>Nome do método utilizado para encontrar os vizinhos mais próximos de um determinado vetor, possivelmente com alguns filtros adicionais aplicados no topo.</td></tr>
<tr><td>Não disponível</td><td><a href="https://milvus.io/docs/with-iterators.md">Iterador</a></td><td>O Pinecone não possui uma funcionalidade para iterar através de todos os vectores de um índice. Milvus introduz os métodos Search Iterator e Query Iterator, melhorando as capacidades de recuperação de dados em conjuntos de dados.</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">Comparação de capacidades<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Capacidade</th><th>Pinecone</th><th>Milvus</th></tr>
</thead>
<tbody>
<tr><td>Modos de implementação</td><td>Apenas SaaS</td><td>Milvus Lite, Autónomo e Cluster no local, Zilliz Cloud Saas e BYOC</td></tr>
<tr><td>Funções de incorporação</td><td>Não disponível</td><td>Suporte com <a href="https://github.com/milvus-io/milvus-model">pymilvus[modelo]</a></td></tr>
<tr><td>Tipos de dados</td><td>String, Número, Bool, Lista de String</td><td>String, VarChar, Número (Int, Float, Double), Bool, Matriz, JSON, Vetor Float, Vetor Binário, BFloat16, Float16, Vetor esparso</td></tr>
<tr><td>Tipos de métricas e índices</td><td>Cos, Dot, Euclidiano<br/>Família P, Família S</td><td>Cosseno, IP (Ponto), L2 (Euclidiano), Hamming, Jaccard<br/>FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, SCANN, índices GPU</td></tr>
<tr><td>Conceção do esquema</td><td>Modo flexível</td><td>Modo flexível, modo estrito</td></tr>
<tr><td>Campos de vectores múltiplos</td><td>N/A</td><td>Pesquisa multi-vetorial e híbrida</td></tr>
<tr><td>Ferramentas de pesquisa</td><td>Conjuntos de dados, utilitários de texto, conetor Spark</td><td>Attu, Birdwatcher, Backup, CLI, CDC, conectores Spark e Kafka</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">Principais informações</h3><ul>
<li><p><strong>Modos de implementação</strong>: O Milvus oferece uma variedade de opções de implantação, incluindo implantação local, Docker, Kubernetes on-premises, Cloud SaaS e Bring Your Own Cloud (BYOC) para empresas, enquanto o Pinecone está limitado à implantação SaaS.</p></li>
<li><p><strong>Funções de incorporação</strong>: O Milvus suporta bibliotecas de incorporação adicionais, permitindo a utilização direta de modelos de incorporação para transformar dados de origem em vectores.</p></li>
<li><p><strong>Tipos de dados</strong>: Milvus suporta uma gama mais ampla de tipos de dados do que Pinecone, incluindo matrizes e JSON. Pinecone suporta apenas uma estrutura de metadados plana com strings, números, booleanos ou listas de strings como valores, enquanto Milvus pode lidar com qualquer objeto JSON, incluindo estruturas aninhadas, dentro de um campo JSON. O Pinecone limita o tamanho dos metadados a 40KB por vetor.</p></li>
<li><p><strong>Tipos de métricas e índices</strong>: Milvus suporta uma vasta seleção de tipos de métricas e índices para acomodar vários casos de utilização, enquanto Pinecone tem uma seleção mais limitada. Embora um índice para vetor seja obrigatório no Milvus, está disponível uma opção AUTO_INDEX para simplificar o processo de configuração.</p></li>
<li><p><strong>Desenho de esquemas</strong>: Milvus oferece modos <code translate="no">create_collection</code> flexíveis para a conceção de esquemas, incluindo uma configuração rápida com um esquema dinâmico para uma experiência sem esquema semelhante a Pinecone e uma configuração personalizada com campos de esquema predefinidos e índices semelhantes a um sistema de gestão de base de dados relacional (RDBMS).</p></li>
<li><p><strong>Múltiplos campos vectoriais</strong>: Milvus permite o armazenamento de múltiplos campos vectoriais numa única coleção, que pode ser esparsa ou densa e pode variar em dimensionalidade. O Pinecone não oferece uma funcionalidade comparável.</p></li>
<li><p><strong>Ferramentas</strong>: O Milvus oferece uma seleção mais extensa de ferramentas para gestão e utilização de bases de dados, tais como Attu, Birdwatcher, Backup, CLI, CDC e conetor Spark e Kafka.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><strong>Teste</strong>: Experimente o Milvus em primeira mão, começando com o <a href="https://milvus.io/docs/quickstart.md">quickstart</a> do Milvus ou inscrevendo-se <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">no Zilliz Cloud</a>.</p></li>
<li><p><strong>Saiba mais</strong>: Aprofunde-se nas funcionalidades do Milvus através dos nossos abrangentes <a href="https://milvus.io/docs/manage-collections.md">Guias</a> <a href="/docs/pt/glossary.md">de Terminologia</a> e <a href="https://milvus.io/docs/manage-collections.md">de Utilizador</a>.</p></li>
<li><p><strong>Explore alternativas</strong>: Para uma comparação mais alargada das opções de bases de dados vectoriais, explore os recursos adicionais <a href="https://zilliz.com/comparison">nesta página</a>.</p></li>
</ul>
