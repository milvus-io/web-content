---
id: release_notes.md
summary: Notas de lançamento do Milvus
title: Notas de lançamento
---
<h1 id="Release-Notes" class="common-anchor-header">Notas de lançamento<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Descubra o que há de novo no Milvus! Esta página resume as novas funcionalidades, melhorias, problemas conhecidos e correcções de erros em cada versão. Pode encontrar as notas de lançamento para cada versão lançada após a v2.6.0 nesta secção. Sugerimos que visite regularmente esta página para se informar sobre as actualizações.</p>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 21 de novembro de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versão do Milvus</th><th style="text-align:left">Versão do SDK do Python</th><th style="text-align:left">Versão do SDK do Node.js</th><th style="text-align:left">Versão do SDK Java</th><th style="text-align:left">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.6.6, que inclui uma série de novas capacidades poderosas, melhorias de desempenho e correcções de erros essenciais. Esta atualização introduz caraterísticas importantes como o tipo de dados Geospatial e Timestampz, Boost ranker para rescoring, etc. Esta versão também tem muitas melhorias cruciais no desempenho da filtragem escalar. Vários erros críticos foram também resolvidos para garantir uma maior estabilidade e fiabilidade. Com esta versão, o Milvus continua a proporcionar uma experiência mais robusta e eficiente a todos os utilizadores. Abaixo estão os principais destaques desta versão.</p>
<ul>
<li>Tipo de dados geoespaciais: Milvus introduz suporte para o tipo de dados <code translate="no">Geometry</code>, que representa objetos geométricos compatíveis com OGC, como <code translate="no">POINT</code>, <code translate="no">LINESTRING</code>, e <code translate="no">POLYGON</code>. Este tipo suporta múltiplos operadores de relação espacial (st_contains, st_intersects, st_within, st_dwithin, ...) e fornece um índice espacial <code translate="no">RTREE</code> para acelerar a filtragem espacial e a execução de consultas. Isto permite o armazenamento e a consulta eficientes de formas geoespaciais para LBS, cartografia e outras cargas de trabalho espaciais.</li>
<li>Tipo de dados Timestamptz: Milvus introduz o tipo de dados TIMESTAMPTZ, fornecendo reconhecimento de fuso horário para todos os dados temporais. Esta funcionalidade permite uma gestão de dados consistente em implementações globais, permitindo aos utilizadores definir um contexto de tempo predefinido utilizando a propriedade de fuso horário em bases de dados e colecções. Crucialmente, o campo suporta totalmente a filtragem baseada em expressões para consultas de intervalos de tempo, e as operações de recuperação (consulta e pesquisa) suportam um parâmetro de fuso horário para conversão instantânea e imediata de carimbos de data/hora para o formato local necessário na saída.</li>
<li>Boost Ranker: Em vez de confiar apenas na semelhança semântica calculada com base nas distâncias vectoriais, o Boost Ranker permite que o Milvus utilize a condição de filtragem opcional dentro da função para encontrar correspondências entre os candidatos a resultados de pesquisa e aumenta as pontuações dessas correspondências aplicando o peso especificado, ajudando a promover ou rebaixar as classificações das entidades correspondentes no resultado final.</li>
<li>O índice STL_SORT suporta agora os tipos de dados VARCHAR e TIMESTAMPTZ.</li>
<li>Agora é possível ativar o campo dinâmico de uma coleção existente alterando-a.</li>
<li>Corrigido cve-2025-63811.</li>
</ul>
<h3 id="Features" class="common-anchor-header">Funcionalidades<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Adicionada nova configuração e activadas as configurações de atualização dinâmica<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Corrigido cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>Removidas grandes matrizes de id de segmentos dos registos de querynode<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>Actualizados múltiplos locais onde o expr copiava os valores de entrada em cada ciclo<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>Optimizado o desempenho do termo expr<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)</li>
<li>Predefinição de pedaços de vetor para segmentos selados não indexados<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>Expr: apenas prefetched chunks uma vez<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>Adicionado suporte nullable para geometria e tipos timestamptz<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>Aumento do ttl da sessão de 10s para 30s<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>Adicionadas mais métricas para a estrutura ddl<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>Actualizada a versão da configuração maxconnections<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>Saltou a verificação do id da fonte<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>Suportada a configuração max_connection para armazenamento remoto<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>Prevenido o pânico ao adicionar a verificação de ponteiro nulo ao limpar o insertrecord pk2offset<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>Efectuada alguma otimização de scalar field fetching em cenários de armazenamento em camadas<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>Corrigido o erro tipográfico dos parâmetros do analisador<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>Substituído index_type ao criar um índice de segmento<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)</li>
<li>Adicionado suporte rbac para updatereplicateconfiguration<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>Aumentada a versão do go para 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>Desativado o jsonshredding para a configuração por omissão<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>Unificado o buffer alinhado para ambos i/o com buffer e direto<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>Renomeados os parâmetros de configuração do utilizador relacionados com o jsonstats<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)</li>
<li>Tornou a configuração do pool de threads do knowhere atualizável<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>Patch escolhido a dedo do novo framework ddl e cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>Definida a versão do esquema ao criar uma nova coleção<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>Ficheiros jsonl/ndjson suportados para bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>Esperou que o cliente de fluxo de replicação terminasse<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>Tornou a geometrycache numa configuração opcional<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>Patch escolhido a dedo do novo framework ddl e cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>Não iniciou o cdc por defeito<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>Patch escolhido a dedo da nova estrutura ddl e cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)</li>
<li>Removido o limite máximo do número de campos vectoriais<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>Mostrado o tempo de criação do trabalho de importação<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>Optimizada a inicialização do bitmap do scalarindexsort para consultas de intervalo<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>Ativado o stl_sort para suportar varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>Extraída a lógica do cliente shard para um pacote dedicado<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>Refacturada a gestão de privilégios extraindo a cache de privilégios para um pacote separado<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>Valores padrão json suportados em fillfielddata<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>Atualizado enabledynamicfield e schemaversion durante a modificação da coleção<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Corrigido o pânico de atualização parcial com timestamptz<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>Usada a versão 2.6.6 para atualização do ddl do milvus<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>Usado o último timetick para expirar a cache<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>Fez o streamingnode sair quando falhava a inicialização<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>Protegido o tbb concurrent_map emplace para evitar deadlock de condições de corrida<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)</li>
<li>Preveniu o pânico quando o streaming coord desligava mas o query coord continuava a funcionar<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>Definido task init quando o trabalhador não tinha tarefa<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)</li>
<li>Evitado deadlock no runcomponent quando o prepare falhava<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)</li>
<li>Evitado o pânico quando se fechava duas vezes o canal de transmissão de ack<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)</li>
<li>Correção do backfill do valor por defeito durante o addfield<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)</li>
<li>Compactado o histórico de atribuições do canal para diminuir o tamanho da informação de recuperação de atribuições<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>Tratados corretamente os valores por defeito durante a compactação para campos adicionados<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>Removido o validatefieldname no dropindex<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>Tarefa de compactação ignorada quando o segmento de não era saudável<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>Definidas as propriedades do esquema antes de transmitir a coleção alter<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)</li>
<li>Evento de base de dados armazenado se a chave fosse inválida<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>Corrigido o bug de bulkimport para o campo struct<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>Falha ao obter dados brutos para o índice híbrido<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>Retenção antecipada da coleção para evitar que fosse libertada antes da conclusão da consulta<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>Utilizado o bloqueio de chave de recurso correto para o ddl e utilizado o novo ddl na réplica de transferência<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>Corrigida a compatibilidade do índice após a atualização<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>Corrigido o erro de canal não disponível e libertado o bloqueio de colecções<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>Removida a meta coleção quando se deixa cair a partição<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>Corrigido o segmento de destino marcado como abandonado para guardar o resultado das estatísticas duas vezes<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>Atualizado erradamente o timetick da informação da coleção<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>Adicionada a dependência tzdata para permitir o reconhecimento do id do fuso horário do iana<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>Correção do cálculo do offset dos dados do campo nas funções de rerank para pesquisa em massa<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>Corrigida a geometria do filtro para crescer com mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Próximo campo não considerava struct<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>Valor do grupo era nulo<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>Fornecida estimativa de tamanho exato para arrays de setas cortadas em compactação<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>Corrigida a corrida de dados no cliente de fluxo replicado<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>Saltava a construção do índice de texto para colunas recentemente adicionadas<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>Ignorados acidentalmente segmentos selados na compactação l0<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>Movido o finishload antes da criação do índice de texto para assegurar a disponibilidade dos dados em bruto<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>Não utilizou json_shredding para json path is null<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>Correcções relacionadas com o timestamptz<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321</a>)</li>
<li>Corrigida a falha do segmento de carga devido ao erro de utilização do disco<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>Suportado valor padrão json na compactação<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>Calculado o tamanho correto do lote para o índice de geometria do segmento em crescimento<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>Aplicado o patch de bug da estrutura ddl<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>Corrigida falha na recolha de alterações com a definição de mmap para struct<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>Inicializado o intervalo de timestamp em composite binlog writer<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>Saltou a criação do diretório tmp para aumentar o índice da r-tree<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>Evitou potenciais condições de corrida ao atualizar o executor<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>Permitido "[" e "]" no nome do índice<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>Corrigido o erro de destruição de json quando o json estava vazio mas não nulo<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>Assegurado que a operação de append só podia ser cancelada pela própria carteira e não pelo rpc<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>Resolvido o problema de acesso ao armazenamento em nuvem do wp gcp com ak/sk<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>Corrigida a importação de dados geométricos nulos<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>Adicionada verificação de null para packed_writer_ em jsonstatsparquetwriter::close()<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>Falha no mmap emb_list_meta na lista de incorporação<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>Actualizada a métrica numentities do querynode quando a coleção não tinha segmentos<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>Prevenida a repetição de tentativas ao importar strings utf-8 inválidas<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>Manuseamento de dados de campos vazios na redução/classificação para o cenário de nova tentativa<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>Corrigido o pânico ao parar graciosamente o cdc<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>Corrigida a contaminação do token auth, suporte oss/cos, logs de erros de sincronização redundantes<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>Manuseado dados totalmente nulos em stringindexsort para prevenir timeout de carregamento<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>Desactivada a construção da versão antiga do jsonstats a partir do pedido<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>Corrigido o erro na importação de dados geométricos<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>Corrigido o bug de importação de parquet em struct<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>Adicionado getmetrics de volta ao indexnodeserver para garantir a compatibilidade<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>Corrigida falha na recolha de alterações para sub-campos de struct<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>Corrigido o mmap de nível de coleção não ter efeito para struct<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>Prevenida a corrida de dados na atualização do notificador de coleção querycoord<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>Manuseamento dos valores por defeito do campo json na camada de armazenamento<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>Dupla verificação para evitar que o iter fosse apagado por outra thread<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>Corrigido o bug da função gis para filtrar a geometria<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 11 de novembro de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versão Milvus</th><th style="text-align:left">Versão Python SDK</th><th style="text-align:left">Versão SDK do Node.js</th><th style="text-align:left">Versão do SDK Java</th><th style="text-align:left">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.6.5, que corrige uma <strong>vulnerabilidade de segurança crítica</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> e é atualizado para Go 1.24.9. Recomendamos vivamente a <strong>todos os utilizadores do Milvus 2.6.x que actualizem para a versão 2.6.5</strong> o mais rapidamente possível. Esta atualização também inclui várias outras melhorias e correcções de erros, proporcionando aos utilizadores uma experiência mais robusta e eficiente.</p>
<h3 id="Improvements" class="common-anchor-header">Melhorias<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Atualizada a tag de imagem do construtor atualizando o go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>Ignorada a verificação do ID da fonte<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>O valor do grupo é nulo<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>Inicializado o intervalo de timestamp em composite binlog writer (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Manuseamento de dados de campos vazios no cenário de redução/rerank para requery (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Adicionada verificação de null para packed_writer_ em jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>Saltou a construção do índice de texto para colunas recentemente adicionadas<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>Ignorados acidentalmente segmentos selados na compactação l0<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>Movido o finishload antes da criação do índice de texto para assegurar a disponibilidade de dados em bruto<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>Suportado valor padrão json na compactação<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>Atualizado o milvus-storage para corrigir a inicialização duplicada do aws sdk (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 21 de outubro de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versão do Milvus</th><th style="text-align:left">Versão do SDK do Python</th><th style="text-align:left">Versão do SDK do Node.js</th><th style="text-align:left">Versão do SDK Java</th><th style="text-align:left">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.6.4, que apresenta uma série de novas capacidades poderosas, melhorias de desempenho e correcções de erros essenciais. Esta atualização apresenta recursos importantes, como o Struct in ARRAY para modelagem avançada de dados. Além disso, ativamos o JSON Shredding por padrão, melhorando ainda mais o desempenho e a eficiência da consulta. Vários erros críticos também foram corrigidos para garantir maior estabilidade e fiabilidade. Com esta versão, o Milvus continua a proporcionar uma experiência mais robusta e eficiente a todos os utilizadores. Abaixo estão os principais destaques desta versão.</p>
<h3 id="Features" class="common-anchor-header">Funcionalidades<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Struct em ARRAY: Milvus introduziu o novo tipo de dados, Struct, permitindo aos utilizadores organizar e gerir vários campos relacionados numa única entidade. Atualmente, Struct só pode ser utilizado como um elemento em DataType.ARRAY, permitindo funcionalidades como Array of Vetor, em que cada linha contém vários vectores, abrindo novas possibilidades para modelação e pesquisa de dados complexos.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>Suporte ao modelo Qwen GTE-rerank-v2 no DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li><strong>Versão Go actualizada para 1.24.6</strong> com construtor de imagens<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Activada a fragmentação JSON predefinida<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>Adicionada quota de disco para o tamanho do binlog carregado para evitar falhas de carregamento do nó de consulta<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>Ativado o suporte mmap para struct array em MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>Adicionada a gestão da camada de cache para TextMatchIndex<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>Optimizado o desempenho da pesquisa inversa de bitmap (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Actualizada a versão do Knowhere<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Removidas as verificações de utilização lógica durante o carregamento de segmentos<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>Adicionado campo de registo de acesso para informação do comprimento do valor do modelo<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>Permitida a substituição do tipo de índice atual durante a construção do índice<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>Adicionados parâmetros de carregamento para o índice vetorial<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>Gestão unificada do estado da tarefa do executor de compactação<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>Adicionados registos refinados para o agendador de tarefas no QueryCoord<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>Assegurado que accesslog.$consistency_level representa o valor real utilizado (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Removido o gestor de canais redundante do datacoord<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Removido o GCC do Dockerfile de compilação para corrigir o CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>Assegurada a ordenação determinística dos resultados da pesquisa quando as pontuações são iguais<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>Classificado novamente antes da nova consulta se o reranker não usasse dados de campo<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>Assegurado o cumprimento da promessa quando CreateArrowFileSystem lança uma exceção<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>Corrigida a configuração de encriptação de disco em falta<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>Corrigida a desativação do verificador de saldo que causava um problema de paragem de saldo<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>Corrigido o problema em que "não igual" não incluía "nenhum"<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>Suportado o valor por defeito JSON em CreateArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>Utilizada a string de depuração curta para evitar novas linhas nos registos de depuração<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>Corrigida a expressão exists para o índice plano JSON<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>Unificada a semântica do caminho de existência do JSON<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>Corrigido o pânico causado por mensagem de inserção interna vazia<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>Parâmetros AI/SAQ actualizados<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>Removido o limite de deduplicação quando o autoindex está desativado<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>Evitadas operações simultâneas de reset/add nas métricas do DataCoord<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>Corrigido o bug em JSON_contains(path, int)<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>Evitada a evicção na camada de cache durante o manuseamento de JSON<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>Corrigido resultados errados do filtro exp quando saltado<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>Verificado se o nó de consulta é SQN com etiqueta e lista de nós de streaming<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>Corrigido BM25 com boost retornando resultados não ordenados<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>Corrigida a importação em massa com ID automático<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>Sistema de ficheiros passado via FileManagerContext ao carregar o índice<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>Usado "eventualmente" e corrigido o ID da tarefa que aparece em ambos os estados de execução e concluído<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>Removido o tick de hora de início incorreto para evitar filtrar DMLs com timeticks inferiores a ele<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>Tornado o fornecedor de credenciais AWS num singleton<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>Desactivada a fragmentação para caminhos JSON contendo dígitos<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>Corrigido teste unitário válido para TestUnaryRangeJsonNullable<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>Correção dos testes unitários e remoção da lógica de fallback do sistema de ficheiros<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 11 de outubro de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versão do Milvus</th><th style="text-align:left">Versão do SDK do Python</th><th style="text-align:left">Versão do SDK do Node.js</th><th style="text-align:left">Versão do SDK Java</th><th style="text-align:left">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.6.3, que introduz uma variedade de novas funcionalidades, melhorias e correcções de erros críticos. Esta versão melhora o desempenho do sistema, expande a funcionalidade e corrige problemas importantes, proporcionando uma experiência mais estável a todos os utilizadores. Abaixo estão os destaques desta versão:</p>
<h3 id="New-Features" class="common-anchor-header">Novos recursos<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>Chave primária com AutoID ativado: Os utilizadores podem agora escrever o campo da chave primária quando <code translate="no">autoid</code> está ativado.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Compactação manual para segmentos L0: Adicionado suporte para compactar manualmente segmentos L0.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>Codificação do ID do cluster no AutoID: Os IDs gerados automaticamente irão agora incluir o ID do cluster.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>Suporte ao Tokenizer gRPC: Integração do tokenizador gRPC para maior flexibilidade de consulta.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Aperfeiçoado o verificador de equilíbrio através da implementação de uma fila de prioridades, melhorando a distribuição de tarefas.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>Estatísticas BM25 pré-carregadas para segmentos selados e serialização optimizada.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Campos nulos podem agora ser usados como entrada para funções BM25.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>Adicionado suporte para Azure Blob Storage no Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Limpados pequenos ficheiros logo após a compactação de segmentos do Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>Ativada a funcionalidade de pontuação aleatória para consultas de reforço.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>Novas opções de configuração para o tipo de vetor <code translate="no">int8</code> em autoindexação.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>Adicionados itens de parâmetros para controlar a política de consulta de pesquisa híbrida.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>Adicionado suporte para controlar a inserção de campos de saída de função.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>A função de decaimento suporta agora a fusão de pontuação configurável para um melhor desempenho.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>Melhorado o desempenho da pesquisa binária em cadeias de caracteres.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>Introduzido o suporte para filtros esparsos em consultas. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>Várias actualizações para melhorar a funcionalidade do índice em camadas.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>Adicionado rastreio de utilização de recursos de armazenamento para pesquisas escalares e vectoriais.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>Adicionada a utilização de armazenamento para apagar/upsert/restful<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>Activados alvos de descarga granular para operações <code translate="no">flushall</code>.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>Datanodes irão agora utilizar um sistema de ficheiros não-singleton para uma melhor gestão de recursos.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>Adicionadas opções de configuração para processamento em lote nos metadados. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>As mensagens de erro incluem agora o nome da base de dados para uma melhor clareza.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>Movido o teste de tracer para o repositório <code translate="no">milvus-common</code> para uma melhor modularização.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>Movidos os ficheiros de teste da unidade API C para o diretório <code translate="no">src</code> para uma melhor organização.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>O Go SDK permite agora que os utilizadores insiram dados de chave primária se <code translate="no">autoid</code> estiver ativado.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Resolvidas as vulnerabilidades CVE-2020-25576 e WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>Corrigido um problema em que os recursos lógicos eram utilizados para métricas no centro de quotas em nós de streaming.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>Definido <code translate="no">mixcoord</code> em <code translate="no">activatefunc</code> ao ativar o modo de espera.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>Removida a inicialização redundante dos componentes de armazenamento V2. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Corrigido o bloqueio da tarefa de compactação devido à saída do ciclo do executor.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>Reembolsado o uso de recursos carregados no destruidor <code translate="no">insert/deleterecord</code>.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>Corrigido um problema onde o replicador não podia parar e melhorado o validador de configuração de replicação.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>Definido <code translate="no">mmap_file_raii_</code> para <code translate="no">nullptr</code> quando o mmap está desativado.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>Fez com que o <code translate="no">diskfilemanager</code> utilizasse o sistema de ficheiros do contexto.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>Anfitrião virtual forçado para OSS e COS no armazenamento V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>Definido <code translate="no">report_value</code> valor por defeito quando <code translate="no">extrainfo</code> não é <code translate="no">nil</code> para compatibilidade.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>Limpou a métrica da coleção depois de deixar cair colecções no rootcoord.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>Corrigida a falha de carregamento do segmento devido ao campo duplicado <code translate="no">mmap.enable</code> propriedades.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>Corrigidos erros de análise de configuração de carga para réplicas dinâmicas.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Manipulada a entrada de linha para coluna para colunas dinâmicas no Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 19 de setembro de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versão do Milvus</th><th style="text-align:left">Versão do SDK do Python</th><th style="text-align:left">Versão do SDK do Node.js</th><th style="text-align:left">Versão do SDK Java</th><th style="text-align:left">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.6.2! Esta atualização introduz novos recursos poderosos, melhorias significativas de desempenho e correções críticas que tornam o sistema mais estável e pronto para produção. Os destaques incluem atualizações parciais de campo com upsert, JSON Shredding para acelerar a filtragem dinâmica de campo, indexação NGram para consultas LIKE mais rápidas e evolução de esquema mais flexível em coleções existentes. Com base no feedback da comunidade, esta versão oferece uma base mais sólida para implementações no mundo real, e encorajamos todos os utilizadores a actualizarem para tirarem partido destas melhorias.</p>
<h3 id="Features" class="common-anchor-header">Recursos<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Adicionado suporte a JSON Shredding para acelerar a filtragem dinâmica de campos. Para obter detalhes, consulte <a href="/docs/pt/json-shredding.md">Fragmentação de JSON</a>.</li>
<li>Adicionado suporte para NGRAM Index para acelerar a operação semelhante. Para obter detalhes, consulte <a href="/docs/pt/ngram.md">NGRAM</a>.</li>
<li>Adicionado suporte para actualizações parciais de campos com a API upsert. Para obter detalhes, consulte <a href="/docs/pt/upsert-entities.md">Upsert Entities</a>.</li>
<li>Adicionado suporte para a função Boost. Para obter detalhes, consulte <a href="/docs/pt/boost-ranker.md">Boost Ranker</a>.</li>
<li>Adicionado suporte para campos de grupo por JSON e campos dinâmicos<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>Adicionado suporte para ativar o esquema dinâmico em colecções existentes<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>Adicionado suporte para a eliminação de índices sem libertar colecções<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>[StorageV2] Alterado o tamanho do ficheiro de registo para o tamanho comprimido<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Adicionados campos filhos na informação de carregamento<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] Adicionado suporte para incluir chaves de partição e clustering no grupo de sistemas<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Removido o tempo limite para tarefas de compactação<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Construção activada com o Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Utilizada a informação do grupo para estimar a utilização da lógica<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Utilizada informação de divisão de grupo para estimar a utilização<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] Resultados de grupos de colunas guardados na compactação<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Adicionadas configurações para a política de divisão baseada no tamanho<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] Adicionado suporte para política de divisão baseada no esquema e no tamanho<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] Adicionada política de divisão configurável<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] Adicionadas mais métricas e configurações<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Adicionado suporte para esperar que todos os índices estejam prontos antes de carregar segmentos<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Adicionada métrica de latência de núcleo interno para nó de rescore<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>Formato de registo de acesso optimizado ao imprimir parâmetros KV<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Adicionada configuração para modificar o tamanho do lote do snapshot do dump<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>Reduzido o intervalo de limpeza da tarefa de compactação<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>Melhorado o merge sort para suportar múltiplos campos<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Adicionada estimativa de recursos de carga para índice em camadas<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>Adicionada configuração de autoindexação para casos de deduplicação<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Adicionada configuração para permitir caracteres personalizados em nomes (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Adicionado suporte para cchannel para serviço de streaming<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Adicionado mutex e verificação de intervalo para proteger eliminações simultâneas<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Alinhado o comportamento das expressões exists entre força bruta e índice<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Corrigido erro ao renomear para uma coleção abandonada<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Verificado o comprimento dos campos filhos<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Ativado o Azure por predefinição<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Corrigido o caminho de carregamento de compactações L0 sob datanodes de pooling<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>Renomeação não permitida se a encriptação da base de dados estiver activada<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Eliminação não permitida da propriedade dynamicfield.enable<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>Tarefas marcadas como falhadas quando o ID pré-alocado é inválido<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Verificações MVCC ignoradas em expressões de comparação PK<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>Corrigido o bug json_contains para stats<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Adicionada a verificação do sistema de ficheiros de inicialização para o nó de consulta e nó de streaming<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Corrigido alvo de compactação vazio quando o segmento era recolhido pelo lixo<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Corrigida a condição de corrida ao inicializar o índice de timestamp<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Verificado se arraydata é nulo para evitar pânico<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Corrigido o bug de construção de estatísticas JSON para objectos aninhados<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Evitado mmap rewrite por múltiplos campos JSON<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Formatos de dados válidos unificados<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Escondidas as credenciais dos fornecedores de embedding/reranking no web UI<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Correção do caminho do statslog sob os datanodes de pooling<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>Corrigido o caminho do oráculo IDF<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Usado o checkpoint do snapshot de recuperação se nenhum vchannel estiver a recuperar<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Limitado o número de colunas nas estatísticas JSON<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Feito índice de n-grama de contagem de recursos de carga<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>Deduzido o tipo de métrica a partir de resultados de pesquisa não vazios<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Corrigida a escrita multi-segmento escrevendo apenas um segmento<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Corrigida a ordenação de fusão fora do intervalo<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>Adicionada verificação UTF-8 antes de executar a função BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Repetição da sessão antiga se existir<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Adicionado limite de tamanho de buffer Kafka para evitar datanode OOM<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>Corrigido o pânico ao estender o intervalo de proteção do bloqueio<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>Corrigido segmentos crescentes não sendo descarregados na mudança de esquema<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Manipulou erros de IO<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>Evitado o pânico se o caminho do índice Tantivy não existir<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 3 de setembro de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versão do Milvus</th><th style="text-align:left">Versão do Python SDK</th><th style="text-align:left">Versão do SDK do Node.js</th><th style="text-align:left">Versão do SDK Java</th><th style="text-align:left">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.6.1! Esta versão baseia-se nos principais avanços arquitectónicos das versões anteriores, fornecendo melhorias críticas centradas na estabilidade da produção, no desempenho e na robustez operacional. Esta versão aborda os principais comentários da comunidade e fortalece o sistema para implantações em grande escala. Recomendamos vivamente a todos os utilizadores que actualizem para beneficiarem de um sistema mais estável, com melhor desempenho e mais fiável.</p>
<h3 id="Improvements" class="common-anchor-header">Melhorias<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Suporta sistemas de ficheiros compatíveis com POSIX para armazenamento remoto<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Introduz rerankers baseados em modelos<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Optimiza o desempenho de expressões de comparação em campos de chave primária<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Recolhe o doc_id da lista de lançamentos diretamente para acelerar a correspondência de texto<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Optimiza o desempenho da consulta convertendo várias condições != numa única cláusula NOT IN<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Melhora a gestão de recursos para a camada de cache durante o carregamento do segmento<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>Melhora a estimativa de memória para índices provisórios durante o carregamento de dados<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Torna configurável o rácio de construção para índices provisórios<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Adiciona um limite de taxa de escrita configurável para o gravador de disco<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Os parâmetros do SegCore podem agora ser actualizados dinamicamente sem reiniciar o serviço Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Adiciona métricas de latência gRPC unificadas para melhor observabilidade<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Inclui timestamps de pedidos de clientes nos cabeçalhos gRPC para simplificar a depuração<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Suporta o nível de registo de rastreio para segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Adiciona um interrutor configurável para ajustar as garantias de consistência para maior disponibilidade<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Implementa um mecanismo robusto de rewatch para lidar com falhas de conexão etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Melhora a lógica de verificação de integridade do nó interno<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Otimiza o acesso aos metadados ao listar coleções<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Actualiza o cliente Pulsar para a versão oficial v0.15.1 e adiciona mais registos<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Actualiza aws-sdk de 1.9.234 para 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Suporta actualizações dinâmicas de intervalos para componentes de ticker<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Melhora a auto-deteção de conjuntos de instruções ARM SVE para operações de bitset<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Melhora a mensagem de erro quando uma correspondência de texto ou frase falha<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Melhora a mensagem de erro para incompatibilidades de dimensão de vetor<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Melhora o relatório de erros para tempos limite de anexação quando o armazenamento de objectos não está disponível<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Corrige um potencial problema de OOM (Out-Of-Memory) durante as importações de ficheiros Parquet<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Corrige um problema em que os nós em espera não podiam recuperar se a sua concessão expirasse<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Lida com o estado de repetição de compactação corretamente<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Corrige um potencial impasse entre pedidos de leitura contínua e carregamento de índices que poderia impedir o carregamento de índices<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Corrige um erro que poderia fazer com que as eliminações de dados falhassem em cenários de alta concorrência<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Corrige uma potencial condição de corrida ao carregar índices de texto e JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>Corrige uma inconsistência de estado do nó que poderia ocorrer após um reinício do QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>Assegura que um QueryNode "sujo" é corretamente limpo após um reinício<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Corrige um problema em que o estado de repetição não era tratado corretamente para pedidos com cargas não vazias<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>Corrige um problema em que o gravador em massa v2 não usava o nome correto do balde<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Melhora a segurança escondendo itens sensíveis do ponto final RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>Assegura que os uploads de objectos para o pica-pau são idempotentes durante as tentativas de timeout<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>Não permite a importação de elementos nulos em campos de array de ficheiros Parquet<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Corrige um erro em que a cache proxy não era invalidada após a criação de um alias de coleção<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Melhora o mecanismo interno de descoberta de serviços para nós de streaming<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Corrige a lógica do grupo de recursos para filtrar corretamente os nós de transmissão<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Adiciona a etiqueta databaseName às métricas para evitar conflitos de nomes em ambientes com várias bases de dados<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Corrige um erro lógico no manuseamento do estado da tarefa interna<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Optimiza o tempo de inicialização das métricas internas para evitar potenciais pânicos<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Corrige uma potencial falha rara no servidor HTTP interno<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 6 de agosto de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versão do Milvus</th><th style="text-align:left">Versão do SDK do Python</th><th style="text-align:left">Versão do SDK do Node.js</th><th style="text-align:left">Versão do SDK Java</th><th style="text-align:left">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>O Milvus 2.6.0 foi oficialmente lançado! Com base na arquitetura criada na versão <a href="#v260-rc1">2.6.0-rc1</a>, esta versão pronta para produção resolve vários problemas de estabilidade e desempenho, ao mesmo tempo que introduz novas capacidades poderosas, incluindo o Storage Format V2, processamento JSON avançado e funcionalidades de pesquisa melhoradas. Com extensas correcções de erros e optimizações baseadas no feedback da comunidade durante a fase RC, o Milvus 2.6.0 está pronto para ser explorado e adotado.</p>
<div class="alert warning">
<p>A atualização direta a partir de versões anteriores à 2.6.0 não é suportada devido a alterações arquitectónicas. Por favor, siga o nosso <a href="/docs/pt/upgrade_milvus_cluster-operator.md">guia de atualização</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">O que há de novo na versão 2.6.0 (desde RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Formato de armazenamento otimizado v2</h4><p>Para enfrentar os desafios do armazenamento misto de dados escalares e vectoriais, especialmente pesquisas de pontos em dados não estruturados, o Milvus 2.6 introduz o Storage Format V2. Este novo formato de armazenamento colunar adaptativo adopta uma estratégia de disposição "fusão de colunas estreitas + independência de colunas largas", resolvendo fundamentalmente os estrangulamentos de desempenho ao lidar com pesquisas pontuais e recuperações de pequenos lotes em bases de dados vectoriais.</p>
<p>O novo formato suporta agora um acesso aleatório eficiente sem amplificação de E/S e alcança ganhos de desempenho até 100x em comparação com o formato Parquet básico adotado anteriormente, tornando-o ideal para cargas de trabalho de IA que requerem processamento analítico e recuperação vetorial precisa. Além disso, ele pode reduzir a contagem de arquivos em até 98% para cargas de trabalho típicas. O consumo de memória para compactação principal é reduzido em 300%, e as operações de E/S são otimizadas em até 80% para leituras e mais de 600% para gravações.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Índice plano JSON (beta)</h4><p>O Milvus 2.6 introduz o JSON Flat Index para lidar com esquemas JSON altamente dinâmicos. Ao contrário do JSON Path Index, que requer a pré-declaração de caminhos específicos e seus tipos esperados, o JSON Flat Index descobre e indexa automaticamente todas as estruturas aninhadas sob um determinado caminho. Ao indexar um campo JSON, ele achata recursivamente toda a sub-árvore, criando entradas de índice invertidas para cada par caminho-valor que encontra, independentemente da profundidade ou tipo. Este achatamento automático torna o JSON Flat Index ideal para esquemas em evolução onde novos campos aparecem sem aviso. Por exemplo, se indexar um campo "metadata", o sistema tratará automaticamente de novos campos aninhados como "metadata.version2.features.experimental" à medida que aparecerem nos dados de entrada, sem exigir uma nova configuração do índice.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Chamada de recursos do Core 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Para obter informações detalhadas sobre alterações na arquitetura e funcionalidades introduzidas na versão 2.6.0-RC, consulte a <a href="#v260-rc1">Nota de versão 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Simplificação da arquitetura</h4><ul>
<li>Streaming Node (GA) - Gerenciamento centralizado do WAL</li>
<li>WAL nativo com o Woodpecker - Removida a dependência do Kafka/Pulsar</li>
<li>Coordenadores unificados (MixCoord); IndexNode e DataNode fundidos - Redução da complexidade dos componentes</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Pesquisa e análise</h4><ul>
<li>Quantização de 1 bit RaBitQ com elevada recuperação</li>
<li>Correspondência de frases</li>
<li>MinHash LSH para deduplicação</li>
<li>Funções de classificação sensíveis ao tempo</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Experiência do programador</h4><ul>
<li>Funções de incorporação para fluxo de trabalho "data-in, data-out</li>
<li>Evolução do esquema em linha</li>
<li>Suporte de vetor INT8</li>
<li>Tokenizadores melhorados para suporte de linguagem global</li>
<li>Camada de cache com carregamento lento - Processa conjuntos de dados maiores que a memória</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 18 de junho de 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Versão Milvus</th><th style="text-align:center">Versão do SDK do Python</th><th style="text-align:center">Versão do SDK do Node.js</th><th style="text-align:center">Versão do SDK Java</th><th style="text-align:center">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>O Milvus 2.6.0-rc1 apresenta uma arquitetura simplificada e nativa da nuvem, concebida para melhorar a eficiência operacional, a utilização de recursos e o custo total de propriedade, reduzindo a complexidade da implementação. Esta versão adiciona novas funcionalidades focadas no desempenho, na pesquisa e no desenvolvimento. Os principais recursos incluem quantização de 1 bit de alta precisão (RaBitQ) e uma camada de cache dinâmica para ganhos de desempenho, deteção quase duplicada com MinHash e correspondência precisa de frases para pesquisa avançada e funções de incorporação automatizadas com modificação de esquema online para aprimorar a experiência do desenvolvedor.</p>
<div class="alert note">
<p>Esta é uma versão de pré-lançamento do Milvus 2.6.0. Para experimentar as funcionalidades mais recentes, instale esta versão como uma nova implementação. A atualização do Milvus v2.5.x ou anterior para 2.6.0-rc1 não é suportada.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Alterações na arquitetura<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Desde a versão 2.6, o Milvus introduziu alterações significativas na arquitetura com o objetivo de melhorar o desempenho, a escalabilidade e a facilidade de utilização. Para obter mais informações, consulte <a href="/docs/pt/architecture_overview.md">Visão geral da arquitetura do Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nó de streaming (GA)</h4><p>Nas versões anteriores, os dados de streaming eram escritos no WAL pelo Proxy e lidos pelo QueryNode e DataNode. Esta arquitetura dificultava a obtenção de consenso no lado da escrita, exigindo uma lógica complexa no lado da leitura. Além disso, o delegador de consultas estava localizado no QueryNode, o que dificultava a escalabilidade. O Milvus 2.5.0 introduziu o Streaming Node, que se tornou GA na versão 2.6.0. Este componente é agora responsável por todas as operações de leitura/escrita WAL ao nível do shard e serve também como delegador de consultas, resolvendo os problemas acima mencionados e permitindo novas optimizações.</p>
<p><strong>Aviso importante de atualização</strong>: O Streaming Node é uma mudança significativa na arquitetura, portanto, uma atualização direta para o Milvus 2.6.0-rc1 a partir de versões anteriores não é suportada.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL nativo do Woodpecker</h4><p>Milvus anteriormente dependia de sistemas externos como Kafka ou Pulsar para seu WAL. Embora funcionais, esses sistemas adicionavam uma complexidade operacional significativa e sobrecarga de recursos, particularmente para implantações de pequeno e médio porte. No Milvus 2.6, esses sistemas foram substituídos pelo Woodpecker, um sistema WAL nativo da nuvem criado especificamente para esse fim. O Woodpecker foi concebido para armazenamento de objectos, suportando modos de disco zero baseados em armazenamento local e de objectos, simplificando as operações e melhorando o desempenho e a escalabilidade.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusão de DataNode e IndexNode</h4><p>No Milvus 2.6, tarefas como compactação, importação em massa, coleta de estatísticas e construção de índices agora são gerenciadas por um agendador unificado. A função de persistência de dados, anteriormente gerida pelo DataNode, foi transferida para o Streaming Node. Para simplificar a implantação e a manutenção, o IndexNode e o DataNode foram fundidos em um único componente DataNode. Este nó consolidado executa agora todas estas tarefas críticas, reduzindo a complexidade operacional e optimizando a utilização de recursos.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusão do coordenador no MixCoord</h4><p>A conceção anterior com módulos RootCoord, QueryCoord e DataCoord separados introduziu complexidade na comunicação entre módulos. Para simplificar a conceção do sistema, estes componentes foram fundidos num único coordenador unificado denominado MixCoord. Esta consolidação reduz a complexidade da programação distribuída, substituindo a comunicação baseada na rede por chamadas de funções internas, resultando num funcionamento mais eficiente do sistema e num desenvolvimento e manutenção simplificados.</p>
<h3 id="Key-Features" class="common-anchor-header">Caraterísticas principais<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Quantização de 1 bit RaBitQ</h4><p>Para lidar com conjuntos de dados de grande escala, a quantização de 1 bit é uma técnica eficaz para melhorar a utilização de recursos e o desempenho da pesquisa. No entanto, os métodos tradicionais podem ter um impacto negativo na recuperação. Em colaboração com os autores da pesquisa original, o Milvus 2.6 apresenta o RaBitQ, uma solução de quantização de 1 bit que mantém alta precisão de recuperação enquanto oferece os benefícios de recurso e desempenho da compactação de 1 bit.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Aprimoramento da capacidade JSON</h4><p>O Milvus 2.6 aprimora seu suporte ao tipo de dados JSON com as seguintes melhorias:</p>
<ul>
<li><strong>Desempenho</strong>: A indexação de caminho JSON agora é oficialmente suportada, permitindo a criação de índices invertidos em caminhos específicos dentro de objetos JSON (por exemplo, <code translate="no">meta.user.location</code>). Isso evita varreduras completas de objetos e melhora a latência de consultas com filtros complexos.</li>
<li><strong>Funcionalidade</strong>: Para suportar uma lógica de filtragem mais complexa, esta versão adiciona suporte para as funções <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> e <code translate="no">CAST</code>. Olhando para o futuro, nosso trabalho no suporte a JSON continua. Estamos entusiasmados em prever que as próximas versões oficiais apresentarão recursos ainda mais poderosos, como a <strong>fragmentação de JSON</strong> e um <strong>índice JSON FLAT</strong>, projetado para melhorar drasticamente o desempenho em dados JSON altamente aninhados.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Aprimoramento da função Analyzer/Tokenizer</h4><p>Esta versão melhora significativamente as capacidades de processamento de texto com várias actualizações do Analyzer e do Tokenizer:</p>
<ul>
<li>Uma nova sintaxe <a href="/docs/pt/analyzer-overview.md#Example-use">do Run Analyzer</a> está disponível para validar as configurações do tokenizador.</li>
<li>O <a href="/docs/pt/lindera-tokenizer.md">tokenizador Lindera</a> foi integrado para melhorar o suporte de idiomas asiáticos, como japonês e coreano.</li>
<li>A seleção de tokenizador em nível de linha agora é suportada, com o <a href="/docs/pt/icu-tokenizer.md">tokenizador ICU</a> de uso geral disponível como um recurso para cenários multilíngues.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Entrada de dados, saída de dados com funções de incorporação</h4><p>O Milvus 2.6 introduz uma capacidade "Data-in, Data-Out" que simplifica o desenvolvimento de aplicações de IA através da integração direta com modelos de incorporação de terceiros (por exemplo, da OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Os utilizadores podem agora inserir e consultar dados de texto em bruto, e o Milvus chamará automaticamente o serviço de modelo especificado para converter o texto em vectores em tempo real. Isto elimina a necessidade de um pipeline de conversão de vectores separado.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/embedding-function-overview.md">Visão geral da função de incorporação</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Correspondência de frases</h4><p>A Correspondência de Frases é uma funcionalidade de pesquisa de texto que devolve resultados apenas quando a sequência exacta de palavras numa consulta aparece consecutivamente e na ordem correta num documento.</p>
<p><strong>Caraterísticas principais</strong>:</p>
<ul>
<li>Sensível à ordem: As palavras devem aparecer na mesma ordem que na consulta.</li>
<li>Correspondência consecutiva: As palavras têm de aparecer uma ao lado da outra, exceto se for utilizado um valor de inclinação.</li>
<li>Inclinação (opcional): Um parâmetro ajustável que permite um pequeno número de palavras intermédias, possibilitando a correspondência difusa de frases.</li>
</ul>
<p>Para mais informações, consulte <a href="/docs/pt/phrase-match.md">Correspondência de frases</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Índice LSH MinHash (Beta)</h4><p>Para atender à necessidade de desduplicação de dados no treinamento de modelos, o Milvus 2.6 adiciona suporte para índices MINHASH_LSH. Esse recurso fornece um método computacionalmente eficiente e escalável para estimar a similaridade Jaccard entre documentos para identificar quase duplicatas. Os utilizadores podem gerar assinaturas MinHash para os seus documentos de texto durante o pré-processamento e utilizar o índice MINHASH_LSH no Milvus para encontrar eficazmente conteúdos semelhantes em conjuntos de dados de grande escala, melhorando a limpeza dos dados e a qualidade do modelo.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Funções de decaimento com reconhecimento de tempo</h4><p>O Milvus 2.6 introduz funções de decaimento sensíveis ao tempo para lidar com cenários em que o valor da informação muda com o tempo. Durante a reclassificação de resultados, os utilizadores podem aplicar funções de decaimento exponencial, gaussiano ou linear com base num campo de carimbo de data/hora para ajustar a pontuação de relevância de um documento. Isto garante que o conteúdo mais recente pode ser priorizado, o que é fundamental para aplicações como feeds de notícias, comércio eletrónico e a memória de um agente de IA.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/decay-ranker-overview.md">Visão geral do Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Adicionar campo para evolução do esquema online</h4><p>Para fornecer maior flexibilidade de esquema, Milvus 2.6 agora suporta a adição de um novo campo escalar a um esquema de coleção existente online. Isso evita a necessidade de criar uma nova coleção e realizar uma migração de dados quando os requisitos da aplicação mudam.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/add-fields-to-an-existing-collection.md">Adicionar campos a uma coleção existente</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Suporte ao vetor INT8</h4><p>Em resposta ao uso crescente de modelos quantizados que produzem embeddings inteiros de 8 bits, o Milvus 2.6 adiciona suporte nativo a tipos de dados para vetores INT8. Isto permite aos utilizadores ingerir estes vectores diretamente sem descodificação, poupando computação, largura de banda de rede e custos de armazenamento. Esse recurso é inicialmente suportado para índices da família HNSW.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/dense-vector.md">Vetor denso</a>.</p>
