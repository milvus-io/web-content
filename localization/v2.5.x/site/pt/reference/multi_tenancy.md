---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multi-tenancy em Milvus.
title: Estratégias multi-tenancy
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Estratégias multi-tenancy<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>Em muitos casos de utilização, os programadores pretendem executar um cluster Milvus e servir vários inquilinos, tais como um par de equipas de produtos ou milhões de utilizadores finais. Este guia explica algumas estratégias diferentes para alcançar o multi-tenancy no Milvus.</p>
<p>O Milvus foi concebido para suportar o multi-tenancy ao nível da base de dados, coleção ou partição. O objetivo do multi-tenancy é separar os dados e os recursos uns dos outros. A implementação de multi-tenancy a diferentes níveis pode atingir diferentes graus de isolamento, mas também envolve diferentes despesas. Explicamos de seguida as suas vantagens e desvantagens.</p>
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
    </button></h2><p>Desde a versão 2.2.9 do Milvus, é possível criar múltiplas bases de dados num único cluster Milvus. Esta funcionalidade permite obter um multi-tenancy orientado para a base de dados, atribuindo uma base de dados a cada inquilino, de modo a que estes possam criar as suas próprias colecções. Esta abordagem proporciona o melhor isolamento de dados e recursos para os inquilinos, mas está limitada a 64 bases de dados num cluster, no máximo.</p>
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
    </button></h2><p>Existem duas formas possíveis de conseguir um multi-tenancy orientado para colecções.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">Uma coleção para todos os inquilinos</h3><p>A utilização de uma única coleção para implementar o multilocatário, adicionando um campo de inquilino para distinguir entre inquilinos, é uma opção simples. Ao efetuar pesquisas ANN para um locatário específico, adicione uma expressão de filtro para filtrar todas as entidades que pertencem a outros locatários. Esta é a forma mais simples de alcançar o multi-tenancy. No entanto, tenha em atenção que o desempenho do filtro pode tornar-se o ponto de estrangulamento das pesquisas ANN. Para melhorar o desempenho da pesquisa, pode otimizar com o multi-tenancy orientado para a partição abaixo.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">Uma coleção por inquilino</h3><p>Outra abordagem consiste em criar uma coleção para cada inquilino para armazenar os seus próprios dados, em vez de armazenar os dados de todos os inquilinos numa única coleção. Isso proporciona melhor isolamento de dados e desempenho de consulta. No entanto, não se esqueça de que esta abordagem requer mais recursos na programação e está limitada a 10.000 colecções num cluster, no máximo.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">Multilocação orientada para partições<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Há duas maneiras de obter multilocação orientada por partição:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">Uma partição por inquilino</h3><p>Gerir uma única coleção é muito mais fácil do que gerir várias colecções. Em vez de criar várias colecções, considere atribuir uma partição a cada locatário para obter um isolamento de dados e uma gestão de memória flexíveis. O desempenho de pesquisa do multilocatário orientado para a partição é muito melhor do que o multilocatário orientado para a coleção. No entanto, tenha em atenção que o número de inquilinos da coleção não deve exceder o número máximo de partições que uma coleção pode conter.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Multilocação baseada em chaves de partição</h3><p>O Milvus 2.2.9 introduz uma nova funcionalidade chamada chave de partição. Aquando da criação de uma coleção, nomeie um campo de inquilino e torne-o no campo de chave de partição. Milvus irá armazenar entidades numa partição de acordo com o valor hash do campo chave da partição. Ao efetuar pesquisas ANN, o Milvus apenas pesquisa a partição que contém a chave de partição. Isto reduzirá largamente o âmbito da pesquisa, obtendo assim um melhor desempenho do que sem a chave de partição.</p>
</div>
<p>Esta estratégia reduz o limite do número máximo de inquilinos que uma coleção Milvus pode suportar e simplifica bastante a gestão de recursos, uma vez que o Milvus gere automaticamente as partições por si.</p>
<p>Recapitulando, é possível usar uma ou algumas das estratégias de multilocação acima para formar sua própria solução. A tabela a seguir faz comparações entre essas estratégias em termos de isolamento de dados, desempenho de pesquisa e número máximo de locatários.</p>
<table>
<thead>
<tr><th></th><th>Isolamento de dados</th><th>Desempenho da pesquisa</th><th>Número máximo de locatários</th><th>Cenários recomendados</th></tr>
</thead>
<tbody>
<tr><td>Orientada para a base de dados</td><td>Forte</td><td>Forte</td><td>64</td><td>Para aqueles que necessitam que as colecções variem com os projectos, especialmente adequado para o isolamento de dados entre departamentos na sua organização.</td></tr>
<tr><td>Uma coleção para todos</td><td>Fraca</td><td>Média</td><td>N/A</td><td>Para aqueles que têm recursos limitados e não são sensíveis ao isolamento de dados.</td></tr>
<tr><td>Uma coleção por inquilino</td><td>Forte</td><td>Forte</td><td>Menos de 10.000</td><td>Para aqueles que têm menos de 10.000 inquilinos por cluster.</td></tr>
<tr><td>Uma partição por locatário</td><td>Média</td><td>Forte</td><td>1,024</td><td>Para aqueles que têm menos de 1.024 locatários por coleção.</td></tr>
<tr><td>Baseado em chave de partição</td><td>Média</td><td>Forte</td><td>10,000,000+</td><td>Para aqueles que prevêem um rápido aumento de inquilinos para milhões.</td></tr>
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
    </button></h2><p><a href="/docs/pt/manage_databases.md">Gerir</a><a href="/docs/pt/schema.md">o esquema</a><a href="/docs/pt/manage_databases.md">das bases de dados</a></p>
