---
id: multi_tenancy.md
title: Implementar Multi-tenancy
summary: >-
  No Milvus, multi-tenancy significa que vários clientes ou equipas - designados
  por tenants - partilham o mesmo cluster, mantendo ambientes de dados isolados.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Implementar Multi-tenancy<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>Em Milvus, multi-tenancy significa que vários clientes ou equipas - referidos como <strong>tenants -</strong>partilham o mesmo cluster enquanto mantêm ambientes de dados isolados.</p>
<p>O Milvus suporta quatro estratégias de multi-tenancy, cada uma oferecendo um compromisso diferente entre escalabilidade, isolamento de dados e flexibilidade. Este guia apresenta cada opção, ajudando-o a escolher a estratégia mais adequada para o seu caso de utilização.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Estratégias de multilocação<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus suporta multi-tenancy em quatro níveis: <strong>Banco de dados</strong>, <strong>Coleção</strong>, <strong>Partição</strong> e <strong>Chave de Partição</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Multitenancy ao nível da base de dados</h3><p>Com o multi-tenancy ao nível da base de dados, cada inquilino recebe uma <a href="/docs/pt/manage_databases.md">base de dados</a> correspondente que contém uma ou mais colecções.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multiluguer ao nível da base de dados</span> </span></p>
<ul>
<li><p><strong>Escalabilidade</strong>: A estratégia de multi-tenancy ao nível da base de dados suporta um máximo de 64 inquilinos por defeito.</p></li>
<li><p><strong>Isolamento de dados</strong>: Os dados em cada base de dados são totalmente separados, oferecendo um isolamento de dados de nível empresarial ideal para ambientes regulamentados ou clientes com necessidades de conformidade rigorosas.</p></li>
<li><p><strong>Flexibilidade</strong>: Cada base de dados pode ter colecções com esquemas diferentes, oferecendo uma organização de dados altamente flexível e permitindo que cada inquilino tenha o seu próprio esquema de dados.</p></li>
<li><p><strong>Outros</strong>: Esta estratégia também suporta o RBAC, permitindo um controlo refinado do acesso do utilizador por inquilino. Além disso, pode carregar ou libertar dados de forma flexível para inquilinos específicos para gerir eficazmente os dados quentes e frios.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multitenancy ao nível da coleção</h3><p>Com o multilocatário ao nível da coleção, é atribuída uma <a href="/docs/pt/manage-collections.md">coleção</a> a cada inquilino, oferecendo um forte isolamento de dados.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multiluguer ao nível da coleção</span> </span></p>
<ul>
<li><p><strong>Escalabilidade</strong>: Uma vez que um cluster pode conter até 65.536 colecções por predefinição, esta estratégia pode acomodar o mesmo número de inquilinos no cluster.</p></li>
<li><p><strong>Isolamento de dados</strong>: As colecções são fisicamente isoladas umas das outras. Esta estratégia proporciona um forte isolamento de dados.</p></li>
<li><p><strong>Flexibilidade</strong>: Esta estratégia permite que cada coleção tenha o seu próprio esquema, acomodando inquilinos com diferentes esquemas de dados.</p></li>
<li><p><strong>Outros</strong>: Esta estratégia também suporta RBAC, permitindo um controlo de acesso granular sobre os locatários. Além disso, pode carregar ou libertar dados de forma flexível para inquilinos específicos para gerir eficazmente dados quentes e frios.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multitenancy em nível de partição</h3><p>No multilocatário ao nível da partição, cada locatário é atribuído a uma <a href="/docs/pt/manage-partitions.md">partição</a> criada manualmente dentro de uma coleção partilhada.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multiluguer ao nível da partição</span> </span></p>
<ul>
<li><p><strong>Escalabilidade</strong>: Uma coleção pode conter até 1024 partições por coleção, permitindo o mesmo número de inquilinos dentro da mesma.</p></li>
<li><p><strong>Isolamento de dados</strong>: Os dados de cada locatário são fisicamente separados por partições.</p></li>
<li><p><strong>Flexibilidade</strong>: Esta estratégia requer que todos os locatários partilhem o mesmo esquema de dados. E as partições precisam de ser criadas manualmente.</p></li>
<li><p><strong>Outros</strong>: O RBAC não é suportado no nível da partição. Os locatários podem ser consultados individualmente ou em várias partições, o que torna essa abordagem adequada para cenários que envolvem consultas agregadas ou análises em segmentos de locatários. Além disso, é possível carregar ou liberar dados de forma flexível para locatários específicos para gerenciar dados quentes e frios com eficiência.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multilocação em nível de chave de partição</h3><p>Com esta estratégia, todos os locatários partilham uma única coleção e esquema, mas os dados de cada locatário são automaticamente encaminhados para 16 partições fisicamente isoladas com base no valor <a href="/docs/pt/use-partition-key.md">da chave de partição</a>. Embora cada partição física possa conter vários locatários, os dados de diferentes locatários permanecem logicamente separados.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Nível da chave de partição Multi-inquilino</span> </span></p>
<ul>
<li><p><strong>Escalabilidade</strong>: A estratégia de nível de chave de partição oferece a abordagem mais escalável, suportando milhões de locatários.</p></li>
<li><p><strong>Isolamento de dados</strong>: Esta estratégia oferece um isolamento de dados relativamente fraco porque vários locatários podem partilhar uma partição física.</p></li>
<li><p><strong>Flexibilidade</strong>: Como todos os locatários devem compartilhar o mesmo esquema de dados, essa estratégia oferece flexibilidade limitada de dados.</p></li>
<li><p><strong>Outros</strong>: O RBAC não é suportado no nível da chave de partição. Os locatários podem ser consultados individualmente ou em várias partições, o que torna esta abordagem adequada para cenários que envolvem consultas agregadas ou análises em segmentos de locatários.</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Escolher a estratégia multi-tenancy correta<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela abaixo oferece uma comparação abrangente entre os quatro níveis de estratégias de multilocação.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Nível da base de dados</strong></p></th>
     <th><p><strong>Nível de coleção</strong></p></th>
     <th><p><strong>Nível de partição</strong></p></th>
     <th><p><strong>Nível de chave de partição</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Isolamento de dados</strong></p></td>
     <td><p>Físico</p></td>
     <td><p>Físico</p></td>
     <td><p>Físico</p></td>
     <td><p>Físico + Lógico</p></td>
   </tr>
   <tr>
     <td><p><strong>Número máximo de locatários</strong></p></td>
     <td><p>Por defeito, 64. Pode aumentá-lo modificando o parâmetro <code translate="no">maxDatabaseNum</code> no ficheiro de configuração Milvus.yaml. </p></td>
     <td><p>Por predefinição, 65.536. Pode ser aumentado modificando o parâmetro <code translate="no">maxCollectionNum</code> no ficheiro de configuração Milvus.yaml.</p></td>
     <td><p>Até 1 024 por coleção. </p></td>
     <td><p>Milhões de euros</p></td>
   </tr>
   <tr>
     <td><p><strong>Flexibilidade do esquema de dados</strong></p></td>
     <td><p>Alta</p></td>
     <td><p>Média</p></td>
     <td><p>Baixa</p></td>
     <td><p>Baixa</p></td>
   </tr>
   <tr>
     <td><p><strong>Suporte RBAC</strong></p></td>
     <td><p>Sim</p></td>
     <td><p>Sim</p></td>
     <td><p>Não</p></td>
     <td><p>Não</p></td>
   </tr>
   <tr>
     <td><p><strong>Desempenho da pesquisa</strong></p></td>
     <td><p>Forte</p></td>
     <td><p>Forte</p></td>
     <td><p>Médio</p></td>
     <td><p>Médio</p></td>
   </tr>
   <tr>
     <td><p><strong>Suporte de pesquisa entre inquilinos</strong></p></td>
     <td><p>Não</p></td>
     <td><p>Não</p></td>
     <td><p>Sim</p></td>
     <td><p>Sim</p></td>
   </tr>
   <tr>
     <td><p><strong>Suporte para o tratamento eficaz de dados quentes e frios</strong></p></td>
     <td><p>Sim</p></td>
     <td><p>Sim</p></td>
     <td><p>Sim</p></td>
     <td><p>Não Atualmente, não há suporte para a estratégia de nível de chave de partição.</p></td>
   </tr>
</table>
<p>Há vários factores a considerar quando se escolhe a estratégia multi-tenancy em Milvus.</p>
<ol>
<li><p><strong>Escalabilidade:</strong> Chave de partição &gt; Partição &gt; Coleção &gt; Base de dados</p>
<p>Se espera suportar um número muito grande de locatários (milhões ou mais), utilize a estratégia de nível de chave de partição.</p></li>
<li><p><strong>Fortes requisitos de isolamento de dados</strong>: Base de dados = Coleção &gt; Partição &gt; Chave de partição</p>
<p>Escolha estratégias de nível de banco de dados, coleção ou partição se tiver requisitos rígidos de isolamento de dados físicos.</p></li>
<li><p><strong>Esquema de dados flexível para os dados de cada locatário:</strong> Base de dados &gt; Coleção &gt; Partição = Chave de partição</p>
<p>As estratégias ao nível da base de dados e ao nível da coleção proporcionam total flexibilidade nos esquemas de dados. Se as estruturas de dados dos seus inquilinos forem diferentes, escolha multilocação ao nível da base de dados ou ao nível da coleção.</p></li>
<li><p><strong>Outros</strong></p>
<ol>
<li><p><strong>Desempenho:</strong> O desempenho da pesquisa é determinado por vários factores, incluindo índices, parâmetros de pesquisa e configurações de máquina. O Milvus também suporta o ajuste de desempenho. Recomenda-se testar o desempenho real antes de selecionar uma estratégia de multi-tenancy.</p></li>
<li><p><strong>Tratamento eficaz de dados quentes e frios</strong>: Atualmente, as estratégias ao nível da base de dados, ao nível da coleção e ao nível da partição suportam o tratamento de dados quentes e frios.</p></li>
<li><p><strong>Pesquisas entre locatários</strong>: Somente as estratégias em nível de partição e em nível de chave de partição suportam consultas entre locatários.</p></li>
</ol></li>
</ol>
