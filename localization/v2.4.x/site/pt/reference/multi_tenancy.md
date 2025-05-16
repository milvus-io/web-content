---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multi-tenancy em Milvus.
title: Estratégias multi-tenancy
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Estratégias de multilocação<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>À medida que o ChatGPT ganha popularidade, mais programadores estão a criar os seus próprios serviços SaaS utilizando a pilha CVP (ChatGPT, Vetor Database, Prompt). Este guia explica como obter multilocação no Milvus, um dos bancos de dados vetoriais mais usados no mundo, para acompanhar essa tendência.</p>
<p>O multilocatário é uma arquitetura em que uma única instância do Milvus serve vários locatários. A forma mais simples de distinguir os utilizadores é separando os seus dados e recursos dos dos outros. Cada locatário tem os seus próprios recursos dedicados ou partilha recursos com outros para gerir objectos Milvus como bases de dados, colecções e partições. Com base nestes objectos, existem métodos correspondentes para conseguir o multi-tenancy Milvus.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">Multitenancy orientado para a base de dados<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Desde a versão 2.2.9 do Milvus, a base de dados de objectos está agora disponível. É possível criar várias bases de dados num único cluster Milvus. Esta nova funcionalidade permite obter um multi-tenancy orientado para a base de dados, atribuindo uma base de dados a cada inquilino, de modo a que estes possam criar as suas próprias colecções e partições para tirar o máximo partido dos seus dados. No entanto, esta estratégia garante o isolamento dos dados e o desempenho da pesquisa para os inquilinos, mas os recursos podem ser desperdiçados em inquilinos inactivos.</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">Multitenancy orientado para colecções<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Existem duas formas possíveis de conseguir um multilocatário orientado para colecções.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">Uma coleção para todos os inquilinos</h3><p>A utilização de uma única coleção para implementar o multilocatário, adicionando um campo de locatário para distinguir entre locatários, é uma opção simples. Ao efetuar pesquisas ANN para um locatário específico, adicione uma expressão de filtro para filtrar todas as entidades que pertencem a outros locatários. Esta é a forma mais simples de alcançar o multi-tenancy. No entanto, tenha em atenção que o desempenho do filtro pode tornar-se o estrangulamento das pesquisas ANN.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">Uma coleção por locatário</h3><p>Outra abordagem consiste em criar uma coleção para cada locatário para armazenar os seus próprios dados, em vez de armazenar os dados de todos os locatários numa única coleção. Isto permite um melhor isolamento dos dados e um melhor desempenho das consultas. No entanto, tenha em atenção que esta abordagem requer um maior investimento na programação de recursos, na capacidade operacional e nos custos e pode não ser aplicável se o número de inquilinos exceder o número máximo de colecções que um único cluster Milvus suporta.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">Multilocação orientada para a partição<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Existem também duas formas possíveis de conseguir um multi-tenancy orientado por partições:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">Uma partição por inquilino</h3><p>Gerir uma única coleção é muito mais fácil do que gerir várias colecções. Em vez de criar várias colecções, considere a possibilidade de atribuir uma partição a cada locatário para obter um isolamento de dados e uma gestão de memória flexíveis. O desempenho de pesquisa do multilocatário orientado para a partição é muito melhor do que o multilocatário orientado para a coleção. No entanto, tenha em atenção que o número de inquilinos da coleção não deve exceder o número máximo de partições que uma coleção pode conter.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Multilocação baseada em chaves de partição</h3><p>Milvus 2.2.9 introduz uma nova caraterística chamada chave de partição. Aquando da criação de uma coleção, nomeie um campo de inquilino e torne-o no campo de chave de partição. Milvus irá armazenar entidades numa partição de acordo com os valores no campo chave da partição. Ao efetuar pesquisas ANN, o Milvus muda para uma partição com base na chave de partição especificada, filtra as entidades de acordo com a chave de partição e pesquisa entre as entidades filtradas.</p>
</div>
<p>Essa estratégia eleva o limite do número máximo de locatários que uma coleção do Milvus pode suportar e simplifica muito o gerenciamento de recursos, pois o Milvus gerencia automaticamente as partições para você.</p>
<p>Recapitulando, pode utilizar uma ou algumas das estratégias multi-tenancy acima referidas para formar a sua própria solução. A tabela a seguir faz comparações entre essas estratégias em termos de isolamento de dados, desempenho de pesquisa e número máximo de locatários.</p>
<table>
<thead>
<tr><th></th><th>Isolamento de dados</th><th>Desempenho da pesquisa</th><th>Número máximo de locatários</th><th>Cenários recomendados</th></tr>
</thead>
<tbody>
<tr><td>Orientada para a base de dados</td><td>Forte</td><td>Forte</td><td>64</td><td>Para aqueles que necessitam que as colecções variem com os projectos, especialmente adequado para o isolamento de dados entre departamentos na sua organização.</td></tr>
<tr><td>Uma coleção para todos</td><td>Fraca</td><td>Média</td><td>N/A</td><td>Para aqueles que têm recursos limitados e não são sensíveis ao isolamento de dados.</td></tr>
<tr><td>Uma coleção por inquilino</td><td>Forte</td><td>Forte</td><td>Menos de 10.000</td><td>Para aqueles que têm menos de 10.000 inquilinos por cluster.</td></tr>
<tr><td>Uma partição por locatário</td><td>Média</td><td>Forte</td><td>4,096</td><td>Para aqueles que têm menos de 4.096 locatários por coleção.</td></tr>
<tr><td>Baseado em chave de partição</td><td>Média</td><td>Forte</td><td>10,000,000+</td><td>Para aqueles que prevêem um rápido aumento de locatários para milhões.</td></tr>
</tbody>
</table>
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
    </button></h2><p><a href="/docs/pt/v2.4.x/manage_databases.md">Gerir</a><a href="/docs/pt/v2.4.x/schema.md">o esquema</a><a href="/docs/pt/v2.4.x/manage_databases.md">das bases de dados</a></p>
