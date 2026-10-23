---
id: roadmap.md
title: Roteiro do Milvus
related_key: Milvus roadmap
summary: >-
  Explore o plano de desenvolvimento do Milvus para pesquisa, análise, evolução
  de esquemas, integração com o data lake e desempenho nas versões 3.0 e 3.1.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Roteiro do Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus 3.0 reúne a pesquisa multivetorial, consultas ao estilo SQL, esquemas flexíveis e acesso a dados em armazenamento de tipo «data lake». As próximas etapas baseiam-se nessa base, com consultas mais avançadas, modelos de dados mais abrangentes e melhorias no desempenho e na escalabilidade. Este roteiro descreve essas prioridades para o Milvus de código aberto.</p>
<p>O Milvus 3.0 está disponível ao público a partir da <strong>versão 3.0.1</strong>. As funcionalidades lançadas abaixo foram introduzidas na <strong>versão 3.0.0</strong>; as funcionalidades em pré-visualização e as funcionalidades opcionais são identificadas sempre que aparecem. A série <strong>3.0.x</strong> amplia estas funcionalidades, enquanto a versão <strong>3.1 está prevista para dezembro de 2026</strong>. As funcionalidades planeadas e as datas-alvo podem sofrer alterações à medida que o desenvolvimento avança.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">Pesquisa e recuperação<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>O roteiro de recuperação centra-se na combinação de mais sinais de relevância no Milvus, desde a correspondência de texto e representações multivetoriais até à reclassificação e facetas dos resultados de pesquisa.</p>
<p><strong>Disponível na versão 3.0</strong></p>
<ul>
<li><strong>Recuperação multivectorial:</strong> a pesquisa StructArray suporta Muvera e Lemur, com « <code translate="no">element_filter</code> » para filtragem ao nível dos elementos. As políticas de correspondência incluem « <code translate="no">MATCH_ANY</code> », « <code translate="no">MATCH_ALL</code> », « <code translate="no">MATCH_LEAST</code> », « <code translate="no">MATCH_MOST</code> » e « <code translate="no">MATCH_EXACT</code> ».</li>
<li><strong>Correspondência e semelhança de texto:</strong> os dicionários personalizados e os sinónimos adaptam a recuperação de texto às necessidades da aplicação. A filtragem por expressões regulares (Regex) suporta a correspondência de padrões, e o MinHash suporta a deteção de quase-duplicados.</li>
<li><strong>Reclassificação e inferência:</strong> O Milvus 3.0 introduz um conjunto inicial de capacidades de reclassificação da Function Chain, juntamente com o Hugging Face Inference Provider. As restantes capacidades da Function Chain estão previstas para a versão 3.0.x.</li>
<li><strong>Agregação de pesquisa:</strong> A agregação de pesquisa fornece facetas sobre os resultados da pesquisa.</li>
</ul>
<p><strong>Previsto para a versão 3.0.x</strong></p>
<p>Está previsto que a série 3.0.x adicione correspondência aproximada e estatísticas globais, bem como suporte completo à Function Chain.</p>
<p><strong>Previsto para a versão 3.1</strong></p>
<p>Os planos incluem a recuperação baseada em Grep, uma integração mais estreita da pesquisa de vizinho mais próximo aproximado (ANN) e da filtragem através da fusão de ANN e filtro, bem como melhorias na recuperação esparsa.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">Análise e consultas ao estilo SQL<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus está a alargar o seu motor de consultas para que as aplicações possam ordenar e agregar dados em simultâneo com a recuperação. A próxima fase irá adicionar junções, vistas materializadas e cálculos personalizados.</p>
<p><strong>Disponível na versão 3.0</strong></p>
<p>As consultas e a pesquisa suportam a ordenação com o ` <code translate="no">ORDER BY</code>`. A «Query Aggregation» adiciona o ` <code translate="no">GROUP BY</code> ` para o cálculo de estatísticas agrupadas.</p>
<p><strong>Planeado para a versão 3.1</strong></p>
<ul>
<li><strong>Consultas mais avançadas:</strong> introdução de junções, começando por semi-junções, e coleções de vistas materializadas.</li>
<li><strong>Atualizações e integridade dos dados:</strong> Suporte a atualizações no local e à deduplicação de chaves primárias durante a ingestão.</li>
<li><strong>Iteração de consultas e semântica JSON:</strong> Adição de um iterador de consultas com estado, JSON <code translate="no">GROUP BY</code> e semântica NULL para SQL/JSON.</li>
<li><strong>Cálculo personalizado:</strong> Suporte a funções definidas pelo utilizador (UDFs) em Python.</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">Esquema e tipos de dados flexíveis<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>O trabalho no esquema centra-se na evolução das coleções existentes e na representação de uma gama mais ampla de dados. Abrange alterações de campos, estruturas multivectoriais, texto longo e expiração de entidades.</p>
<p><strong>Disponível na versão 3.0</strong></p>
<ul>
<li><strong>Alterações de esquema online:</strong> as coleções existentes suportam a adição de campos online, incluindo campos vetoriais e de <code translate="no">Array&lt;Struct&gt;</code>. A remoção de campos está disponível em <strong>pré-visualização</strong> e pode ter limitações.</li>
<li><strong>Preenchimento retroativo para dados existentes:</strong> o preenchimento retroativo externo utiliza o Spark Connector. O preenchimento retroativo interno associa uma função BM25 ou MinHash a uma coleção e calcula a sua saída com base nos dados existentes.</li>
<li><strong>Dados de texto e multivetor:</strong> O tipo « <code translate="no">TEXT</code> » armazena texto longo, enquanto o «StructArray» suporta a recuperação de interação tardia através de « <code translate="no">MAX_SIM</code> ». O « <code translate="no">TEXT</code> » requer a ativação do Storage V3.</li>
<li><strong>Valores NULL e expiração:</strong> Os campos vetoriais aceitam valores NULL, e o tempo de vida (TTL) ao nível da entidade controla a expiração.</li>
</ul>
<p><strong>Planeado para a versão 3.0.x</strong></p>
<p>As melhorias de esquema previstas expandem o suporte do StructArray a tipos, valores NULL e à adição e remoção de campos. Também adicionam suporte a fórmulas moleculares e filtros « <code translate="no">IS NULL</code> » / « <code translate="no">IS NOT NULL</code> » para campos vetoriais.</p>
<p><strong>Planeado para a versão 3.1</strong></p>
<p>As próximas extensões do modelo de dados incluem JSON e Struct aninhados, chaves primárias compostas, coleções sem campos vetoriais e vetores esparsos em StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">Integração com o «lake» e controlo de versões dos dados<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus está a desenvolver uma integração mais estreita com o armazenamento em «lake» e o processamento em lote. As coleções externas proporcionam acesso aos dados onde estes se encontram, enquanto os instantâneos servem de base para o controlo de versões dos dados.</p>
<p><strong>Disponível na versão 3.0</strong></p>
<ul>
<li><strong>Acesso a dados externos:</strong> a Coleção Externa suporta dados Lance, Parquet e Iceberg.</li>
<li><strong>Instantâneos e integração em lote:</strong> os instantâneos capturam uma versão dos dados da coleção, e o Spark Connector suporta fluxos de trabalho em lote.</li>
<li><strong>Base de armazenamento:</strong> O Storage V3 (Loon) oferece suporte opcional ao Vortex e ao Lance. Está desativado por predefinição e é ativado através de <code translate="no">common.storage.useLoonFFI</code>. Tanto o Snapshot como o <code translate="no">TEXT</code> dependem dele.</li>
</ul>
<p><strong>Planeado para a versão 3.0.x</strong></p>
<p>As melhorias previstas permitem que um instantâneo de recolha do Milvus funcione como uma recolha externa. O suporte a tabelas externas também se expande para a fragmentação de JSON, adição de campos de função e remoção de campos.</p>
<p><strong>Planeado para a versão 3.1</strong></p>
<p>Os planos incluem índices esparsos e escalares baseados no S3, juntamente com a eliminação através da importação.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">Desempenho, indexação e escalabilidade<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>O roteiro de desempenho abrange índices de recuperação, execução de consultas e crescimento do cluster. Aborda também a recuperação e as consultas que têm de ler dados a partir do armazenamento de objetos.</p>
<p><strong>Disponível na versão 3.0</strong></p>
<ul>
<li><strong>Indexação esparsa:</strong> a reformulação da indexação esparsa introduz o SINDI.</li>
<li><strong>Escolha do índice:</strong> O índice de passagem « <code translate="no">FAISS</code> » aceita cadeias de caracteres da fábrica de índices Faiss, com opções que incluem SVS, Panorama, PQ, IVFPQ e ScaNN. A indexação DiskANN também está disponível para listas incorporadas (EmbList).</li>
<li><strong>Compactação:</strong> A função «Force Merge» proporciona controlo explícito sobre a fusão de segmentos.</li>
</ul>
<p><strong>Planeado para a versão 3.1</strong></p>
<ul>
<li><strong>Consultas sensíveis ao armazenamento:</strong> Adicionar o pushdown de predicados para o Vortex, incluindo poda ao nível da página e índices de salto.</li>
<li><strong>Crescimento do cluster e multilocação:</strong> Suporte à divisão de fragmentos, chaves de fragmentação personalizadas e otimizações de multilocação.</li>
<li><strong>Execução de consultas e indexação:</strong> Desenvolver o QueryView, melhorar o suporte a coleções extensas, a redução de resultados em fluxo e o suporte a múltiplos índices.</li>
<li><strong>Fiabilidade de gravação:</strong> Suporte a gravações idempotentes.</li>
<li><strong>Cache de armazenamento de objetos:</strong> Utilizar o Talon como cache S3 para melhorar a recuperação de falhas e o desempenho de consultas inativas.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">Para além da versão 3.1<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>O trabalho a longo prazo inclui o «time-travel» e a reversão de instantâneos. O seu âmbito e calendário de lançamento ainda estão por confirmar.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">Ajude a definir o roteiro<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Partilhe as cargas de trabalho, as limitações e os pedidos de funcionalidades que são importantes para as suas aplicações nas <a href="https://github.com/milvus-io/milvus/discussions">Discussões do GitHub</a>. Comunique erros através <a href="https://github.com/milvus-io/milvus/issues">das Issues do GitHub</a>.</p>
<p>Para contribuir com código ou documentação, comece pelo <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Guia do Colaborador</a>.</p>
