---
id: migrate_overview.md
summary: >-
  Este artigo apresenta uma visão geral da ferramenta de migração Milvus,
  incluindo as migrações suportadas, as funcionalidades e a arquitetura.
title: Visão geral da migração Milvus
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Visão geral da migração Milvus<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Reconhecendo as diversas necessidades da base de utilizadores, Milvus expandiu as suas ferramentas de migração não só para facilitar as actualizações das versões anteriores de Milvus 1.x, mas também para permitir a integração perfeita de dados de outros sistemas como <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> e <a href="https://github.com/facebookresearch/faiss">Faiss</a>. O projeto <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> foi concebido para colmatar a lacuna entre estes ambientes de dados variados e os últimos avanços da tecnologia Milvus, garantindo que pode aproveitar as funcionalidades e o desempenho melhorados sem problemas.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Migrações suportadas<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>A ferramenta <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> suporta uma variedade de caminhos de migração para acomodar diferentes necessidades dos utilizadores:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/es2m.md">Elasticsearch para Milvus 2.x</a>: Permite aos utilizadores migrar dados de ambientes Elasticsearch para tirar partido das capacidades de pesquisa vetorial optimizada do Milvus.</li>
<li><a href="/docs/pt/v2.4.x/f2m.md">Faiss para Milvus 2.x</a>: Fornecendo suporte experimental para a transferência de dados do Faiss, uma biblioteca popular para pesquisa eficiente de similaridade.</li>
<li><a href="/docs/pt/v2.4.x/m2m.md">Milvus 1.x para Milvus 2.x</a>: Garantir que os dados das versões anteriores sejam transferidos sem problemas para a estrutura mais recente.</li>
<li><a href="/docs/pt/v2.4.x/from-m2x.md">Milvus 2.3.x para Milvus 2.3.x ou superior</a>: Proporcionar um caminho de migração único para os utilizadores que já migraram para a versão 2.3.x.</li>
</ul>
<h2 id="Features" class="common-anchor-header">Caraterísticas<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus-migration foi concebido com caraterísticas robustas para lidar com diversos cenários de migração:</p>
<ul>
<li>Múltiplos métodos de interação: Pode efetuar migrações através de uma interface de linha de comandos ou através de uma API Restful, com flexibilidade na forma como as migrações são executadas.</li>
<li>Suporte para vários formatos de ficheiros e armazenamento em nuvem: A ferramenta <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> pode lidar com dados armazenados em ficheiros locais, bem como em soluções de armazenamento em nuvem, como S3, OSS e GCP, garantindo uma ampla compatibilidade.</li>
<li>Tratamento de tipos de dados: <a href="https://github.com/zilliztech/milvus-migration">A Milvus-migration</a> é capaz de lidar com dados vectoriais e campos escalares, tornando-a uma escolha versátil para diferentes necessidades de migração de dados.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Arquitetura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>A arquitetura do <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> foi estrategicamente concebida para facilitar processos eficientes de transmissão, análise e escrita de dados, permitindo capacidades de migração robustas em várias fontes de dados.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Arquitetura de Milvus-migration</span> </span></p>
<p>Na figura anterior:</p>
<ul>
<li><strong>Fonte de dados</strong>: <a href="https://github.com/zilliztech/milvus-migration">O Milvus-migration</a> suporta várias fontes de dados, incluindo o Elasticsearch através da <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">API scroll</a>, ficheiros de dados de armazenamento local ou na nuvem e bases de dados Milvus 1.x. Estas são acedidas e lidas de uma forma simplificada para iniciar o processo de migração.</li>
<li><strong>Pipeline de fluxo</strong>:<ul>
<li><strong>Processo de análise</strong>: Os dados das fontes são analisados de acordo com o seu formato. Por exemplo, para uma fonte de dados do Elasticsearch, é utilizado um analisador de formato do Elasticsearch, enquanto outros formatos utilizam os respectivos analisadores. Este passo é crucial para transformar os dados em bruto num formato estruturado que pode ser processado posteriormente.</li>
<li><strong>Processo de conversão</strong>: Após a análise, os dados são submetidos a um processo de conversão em que os campos são filtrados, os tipos de dados são convertidos e os nomes das tabelas são ajustados de acordo com o esquema Milvus 2.x pretendido. Isto garante que os dados estão em conformidade com a estrutura e os tipos esperados no Milvus.</li>
</ul></li>
<li><strong>Escrita e carregamento de dados</strong>:<ul>
<li><strong>Escrever dados</strong>: Os dados processados são escritos em ficheiros JSON ou NumPy intermédios, prontos a serem carregados no Milvus 2.x.</li>
<li><strong>Carregar dados</strong>: Os dados são finalmente carregados no Milvus 2.x utilizando a operação <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>, que grava de forma eficiente grandes volumes de dados nos sistemas de armazenamento do Milvus, quer sejam baseados na nuvem ou em armazenamento de ficheiros.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Planos para o futuro<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>A equipa de desenvolvimento está empenhada em melhorar <a href="https://github.com/zilliztech/milvus-migration">o Milvus-migration</a> com funcionalidades como:</p>
<ul>
<li><strong>Suporte para mais fontes de dados</strong>: Planos para alargar o suporte a bases de dados e sistemas de ficheiros adicionais, tais como Pinecone, Chroma, Qdrant. Se precisar de suporte para uma fonte de dados específica, envie sua solicitação por meio deste <a href="https://github.com/zilliztech/milvus-migration/issues">link de problema do GitHub</a>.</li>
<li><strong>Simplificação de comandos</strong>: Esforços para simplificar o processo de comando para facilitar a execução.</li>
<li><strong>Analisador</strong> / <strong>conversão</strong><strong>de SPI</strong>: A arquitetura espera incluir ferramentas de Interface de Fornecedor de Serviços (SPI) para análise e conversão. Estas ferramentas permitem implementações personalizadas que os utilizadores podem ligar ao processo de migração para tratar formatos de dados específicos ou regras de conversão.</li>
<li><strong>Retomada do ponto de verificação</strong>: Permite que as migrações sejam retomadas a partir do último ponto de controlo para aumentar a fiabilidade e a eficiência em caso de interrupções. Serão criados pontos de salvaguarda para garantir a integridade dos dados e são armazenados em bases de dados como o SQLite ou o MySQL para acompanhar o progresso do processo de migração.</li>
</ul>
