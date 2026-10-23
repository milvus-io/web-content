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
    </button></h1><p>Descubra as novidades do Milvus! Esta página resume as novas funcionalidades, melhorias, problemas conhecidos e correções de erros em cada versão. Sugerimos que visite regularmente esta página para se manter a par das atualizações.</p>
<h2 id="v303" class="common-anchor-header">v3.0.3<button data-href="#v303" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 14 de outubro de 2026</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do SDK do Python</th><th>Versão do SDK para Node.js</th><th>Versão do SDK para Java</th><th>Versão do SDK para Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.3</td><td>3.0.2</td><td>3.0.6</td><td>3.0.10</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>É com grande entusiasmo que anunciamos o lançamento do Milvus v3.0.3! Esta versão introduz a «Function Chain» na «Hybrid Search», atualizações parciais ao nível do elemento para campos «Array», «Struct» e «JSON», e filtragem « <code translate="no">IS NULL</code> » em campos vetoriais nulos, juntamente com reforço de segurança e um vasto conjunto de correções de estabilidade; tenha em atenção as alterações compatíveis com versões anteriores nas rotas REST da V1 na porta de métricas, nos privilégios de importação de binlog e no modo de acesso predefinido do produtor Pulsar.</p>
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
<li>Adicionado suporte à Function Chain à Pesquisa Híbrida, permitindo que uma cadeia de nível superior L2, que comece com <code translate="no">merge</code>, defina a fusão e a reclassificação, e permitindo que cada subpesquisa execute a sua própria cadeia L0/L1 antes da fusão (<a href="https://github.com/milvus-io/milvus/pull/53541">#53541</a>)</li>
<li>Adicionado suporte para substituir elementos individuais de Array, elementos de Struct array ou os seus subcampos, e caminhos JSON em atualizações parciais, disponível no SDK Go e no REST v2 (<a href="https://github.com/milvus-io/milvus/pull/53746">#53746</a>)</li>
<li>Adicionado suporte a campos dinâmicos às cadeias de funções na pesquisa e na pesquisa híbrida (<a href="https://github.com/milvus-io/milvus/pull/54011">#54011</a>)</li>
<li>Adicionado suporte para expressões de filtro do tipo « <code translate="no">IS NULL</code> » e « <code translate="no">IS NOT NULL</code> » em campos vetoriais nulos, com verificações de validade em lote para uma avaliação eficiente (<a href="https://github.com/milvus-io/milvus/pull/54020">#54020</a>)</li>
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
<li>Adicionada autenticação de raiz opcional para pontos de extremidade de gestão na porta de métricas (<code translate="no">common.security.adminAuthEnabled</code>, desativada por predefinição) e ocultadas credenciais e outros valores sensíveis de dumps de configuração, respostas HTTP e registos (<a href="https://github.com/milvus-io/milvus/pull/53499">#53499</a>)</li>
<li>Preservadas as chaves primárias das entidades existentes em upsert completo em coleções AutoID, atribuindo novos IDs apenas às chaves que não forem encontradas; esses upserts requerem agora que a coleção esteja carregada (<a href="https://github.com/milvus-io/milvus/pull/53511">#53511</a>)</li>
<li>Adicionados os algoritmos de compressão gRPC «snappy» e «s2», tornou-se o codec «zstd» configurável e reforçou-se a descompressão gRPC contra alocações de tamanho excessivo (<a href="https://github.com/milvus-io/milvus/pull/53598">#53598</a>)</li>
<li>Bloquearam-se os caminhos de importação que apontam para os diretórios de armazenamento interno do Milvus e passou a ser exigido o novo privilégio « <code translate="no">ImportBinlog</code> » ao nível do cluster para importações binlog (<code translate="no">backup=true</code>) e L0; isto inativa as funções não administrativas que possuem apenas o privilégio « <code translate="no">Import</code> » ao nível da coleção, até que lhes seja concedido o privilégio « <code translate="no">ImportBinlog</code> » (<a href="https://github.com/milvus-io/milvus/pull/53680">#53680</a>)</li>
<li>Otimização das gravações de conjuntos de bits para pesquisas de índices suportadas pelo Tantivy, tornando as gravações de IDs de documentos contíguos cerca de 7 vezes mais rápidas em microbenchmarks (<a href="https://github.com/milvus-io/milvus/pull/53700">#53700</a>)</li>
<li>Reduzidas as cópias redundantes de carga útil e metadados no caminho de execução de consultas em C++ (<a href="https://github.com/milvus-io/milvus/pull/53756">#53756</a>)</li>
<li>Carregamento diferido das estatísticas JSON para segmentos selados até à primeira utilização quando o aquecimento está desativado, para que os segmentos cujas estatísticas JSON nunca são consultadas deixem de suportar o custo de carregamento (<a href="https://github.com/milvus-io/milvus/pull/53888">#53888</a>)</li>
<li>Adicionada uma pré-verificação opcional do QueryCoord que estima a procura de memória e disco local antes do carregamento de coleções ou partições, com métricas de procura por grupo de recursos (<a href="https://github.com/milvus-io/milvus/pull/53905">#53905</a>)</li>
<li>Reduzida a sobrecarga por bloco nas expressões de filtro e na pesquisa «group-by» em segmentos selados, através da leitura de dados por meio do instantâneo da coluna fixada na solicitação (<a href="https://github.com/milvus-io/milvus/pull/53984">#53984</a>)</li>
<li>Acelerou a descodificação RPC protobuf com o descodificador fastPB para os percursos de pesquisa, consulta, inserção e upsert, ativado por predefinição e controlável através de <code translate="no">common.enableFastPB</code> (<a href="https://github.com/milvus-io/milvus/pull/53995">#53995</a>, <a href="https://github.com/milvus-io/milvus/pull/54003">#54003</a>)</li>
<li>Removidas as rotas REST legadas do <code translate="no">/api/v1/*</code> sem sublinhado (incluindo <code translate="no">/api/v1/health</code>) da porta de métricas e adicionado <code translate="no">proxy.http.enableV1</code> para desativar as APIs V1 restantes; trata-se de uma alteração compatibilidade, pelo que os clientes devem migrar para a API REST V2 ou para um SDK gRPC e utilizar <code translate="no">/healthz</code> ou <code translate="no">/livez</code> para testes de integridade (<a href="https://github.com/milvus-io/milvus/pull/54028">#54028</a>)</li>
<li>Fixámos o stemmer do analisador independentemente do Tantivy, para que os analisadores integrados e personalizados continuem a produzir os mesmos tokens stemmed para os índices de texto existentes durante as atualizações do Tantivy (<a href="https://github.com/milvus-io/milvus/pull/54097">#54097</a>)</li>
<li>Reduzimos o atraso na entrega de resultados assíncronos completos do segcore sob carga elevada do executor, para que os resultados finais sejam disponibilizados mais cedo, em vez de ficarem a aguardar atrás de tarefas em fila (<a href="https://github.com/milvus-io/milvus/pull/54127">#54127</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Corrigiu-se um problema em que uma tarefa de importação em duas fases com um « <code translate="no">timeout</code> » que expirava durante o commit falhava e era revertida, removendo dados que já estavam visíveis para consultas, e em que o cancelamento de uma tarefa de importação não interrompia as suas tarefas em execução nos DataNodes (<a href="https://github.com/milvus-io/milvus/pull/53481">#53481</a>)</li>
<li>Corrigido um problema em que, com o Pulsar como WAL, um StreamingNode podia continuar a escrever num canal depois de outro nó o ter assumido, causando a perda de linhas confirmadas; o <code translate="no">pulsar.producerAccessMode</code> predefinido é agora <code translate="no">exclusive</code>, o que requer o Pulsar 2.8.0 ou posterior (<a href="https://github.com/milvus-io/milvus/pull/53539">#53539</a>)</li>
<li>Corrigiu-se um problema em que o Milvus autónomo, implementado com o Docker Compose ou o <code translate="no">standalone_embed.sh</code>, podia falhar ao escrever em diretórios de dados montados por ligação pertencentes ao utilizador root, tanto em novas instalações como em atualizações (<a href="https://github.com/milvus-io/milvus/pull/53564">#53564</a>, <a href="https://github.com/milvus-io/milvus/pull/53615">#53615</a>)</li>
<li>Corrigido um problema em que as pesquisas em segmentos em crescimento com um índice provisório podiam falhar intermitentemente com erros de redução enquanto os dados estavam a ser inseridos em simultâneo (<a href="https://github.com/milvus-io/milvus/pull/53574">#53574</a>)</li>
<li>Corrigido um problema em que um StreamingNode podia utilizar o modo Woodpecker errado quando o comando « <code translate="no">AlterWAL</code> » era executado imediatamente após a atualização da configuração de armazenamento do Woodpecker, o que fazia com que a recuperação do WAL ficasse bloqueada após o reinício seguinte (<a href="https://github.com/milvus-io/milvus/pull/53584">#53584</a>)</li>
<li>Corrigido um problema em que as inserções em coleções com campos de geometria podiam ficar bloqueadas sob carga sustentada de consultas GIS quando a cache de geometria estava ativada (<a href="https://github.com/milvus-io/milvus/pull/53609">#53609</a>)</li>
<li>Corrigido um problema em que o Milvus podia bloquear durante o encerramento ou ficar bloqueado em chamadas de registo quando a saída de registo ficava bloqueada (<a href="https://github.com/milvus-io/milvus/pull/53625">#53625</a>)</li>
<li>Corrigido um problema em que a atualização de uma coleção externa a partir de uma fonte de instantâneo do Milvus inválida, ou a partir de metadados de instantâneo malformados ou que utilizassem uma versão não suportada, não falhava imediatamente e podia permanecer pendente até ao tempo limite (<a href="https://github.com/milvus-io/milvus/pull/53695">#53695</a>, <a href="https://github.com/milvus-io/milvus/pull/54034">#54034</a>)</li>
<li>Corrigido um problema em que consultas LIKE contendo caracteres NUL em campos indexados por ngram podiam causar a falha do QueryNode ou devolver correspondências incorretas (<a href="https://github.com/milvus-io/milvus/pull/53711">#53711</a>)</li>
<li>Corrigido um problema em que o ponto de extremidade de verificação de integridade reportava um nó como pronto antes de todos os seus componentes terem concluído o registo (<a href="https://github.com/milvus-io/milvus/pull/53735">#53735</a>)</li>
<li>Corrigido um problema em que o carregamento de uma coleção podia indicar conclusão ao ignorar segmentos recuperados que possuíam apenas um manifesto V3 confirmado, fazendo com que os respetivos dados não aparecessem nos resultados da consulta (<a href="https://github.com/milvus-io/milvus/pull/53782">#53782</a>)</li>
<li>Corrigido um problema em que as cópias de instantâneos entre buckets de objetos de grande dimensão (cerca de 2 GB) podiam atingir o tempo limite no OSS; os objetos acima do novo limite configurável de tamanho de bloco de cópia ( <code translate="no">minio.multipartCopyThreshold</code> ) (padrão 1 GiB) são agora copiados com cópia multiparte do lado do servidor (<a href="https://github.com/milvus-io/milvus/pull/53789">#53789</a>)</li>
<li>Corrigido um problema em que as operações de instantâneo (criar, eliminar, fixar, desfixar, exportar e restaurar) podiam ser limitadas ou rejeitadas pelos limites de taxa de DDL da coleção e pela recusa forçada de DDL (<a href="https://github.com/milvus-io/milvus/pull/53791">#53791</a>)</li>
<li>Corrigido um problema em que a importação de Parquet armazenava NULL em vez do valor por defeito do campo para linhas nulas em campos Timestamptz que permitem valores nulos (<a href="https://github.com/milvus-io/milvus/pull/53808">#53808</a>)</li>
<li>Corrigido um problema em que os reclassificadores baseados em modelos podiam atribuir pontuações aos documentos errados quando o serviço de reclassificação devolvia resultados numa ordem diferente, produzindo resultados de pesquisa classificados incorretamente (<a href="https://github.com/milvus-io/milvus/pull/53813">#53813</a>)</li>
<li>Corrigido um problema em que os pedidos de pesquisa e consulta podiam falhar com o erro « <code translate="no">collection not loaded</code> » durante um período prolongado após um canal ter sido reequilibrado para outro QueryNode (<a href="https://github.com/milvus-io/milvus/pull/53814">#53814</a>)</li>
<li>Corrigido um problema em que a pesquisa por agrupamento com um tamanho de grupo estrito podia devolver grupos com menos de <code translate="no">group_size</code> resultados, mesmo quando existiam entidades correspondentes suficientes (<a href="https://github.com/milvus-io/milvus/pull/53899">#53899</a>)</li>
<li>Corrigiu-se um problema em que os utilizadores podiam visualizar metadados de coleções às quais não tinham acesso através do DescribeCollection e podiam chamar RPCs de segment-info e réplica sem os privilégios necessários (<a href="https://github.com/milvus-io/milvus/pull/54033">#54033</a>)</li>
<li>Corrigiu-se um problema em que a função « <code translate="no">phrase_match</code> » podia corresponder a documentos que contivessem um termo de consulta repetido apenas uma vez, e melhorou-se o desempenho da correspondência de frases através da atualização do Tantivy (<a href="https://github.com/milvus-io/milvus/pull/54030">#54030</a>)</li>
<li>Corrigido um problema em que um vetor esparso malformado numa solicitação Search ou HybridSearch podia causar uma escrita fora dos limites do heap no nó de consulta; essas solicitações são agora rejeitadas com o ` <code translate="no">ParameterInvalid</code> ` (<a href="https://github.com/milvus-io/milvus/pull/54035">#54035</a>)</li>
<li>Corrigiu-se um problema em que o progresso da construção do índice podia ignorar dados de importação confirmados ou indicar «Concluído» enquanto segmentos descarregados ainda aguardavam para serem ordenados e indexados (<a href="https://github.com/milvus-io/milvus/pull/54037">#54037</a>)</li>
<li>Corrigido um problema em que as operações RESTful de inserção e upsert devolviam sucesso, mas armazenavam cadeias JSON sem aspas ou reescreviam silenciosamente valores numéricos; essas entradas são agora preservadas ou rejeitadas, uma opção <code translate="no">compatibilityMode</code> restaura a conversão antiga e as linhas escritas anteriormente não são reparadas (<a href="https://github.com/milvus-io/milvus/pull/54072">#54072</a>)</li>
</ul>
<h2 id="v302" class="common-anchor-header">v3.0.2<button data-href="#v302" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 20 de setembro de 2026</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do SDK Python</th><th>Versão do SDK do Node.js</th><th>Versão do SDK para Java</th><th>Versão do SDK para Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.2</td><td>3.0.2</td><td>3.0.6</td><td>3.0.10</td><td>3.0.2</td></tr>
</tbody>
</table>
<p>É com grande entusiasmo que anunciamos o lançamento do Milvus v3.0.2! Esta versão centra-se no desempenho das pesquisas e consultas — eliminando a contenção de hot-path na pesquisa filtrada, no agrupamento por e na criação de índices —, juntamente com um suporte reforçado a coleções externas e ao Storage V2, e um vasto conjunto de correções de estabilidade nas áreas de streaming, compactação e gestão de índices.</p>
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
<li>Filtragem ARRAY otimizada através da fusão de predicados «contains» encadeados numa única expressão « <code translate="no">ContainsAny</code> » / «<code translate="no">ContainsAll</code> » no planeador de consultas (<a href="https://github.com/milvus-io/milvus/pull/52365">#52365</a>)</li>
<li>Adicionado suporte a pontos finais personalizados compatíveis com S3 em coleções externas através da opção <code translate="no">extfs.endpoint_url</code>, com validação de configurações de pontos finais inseguras ou conflitantes (<a href="https://github.com/milvus-io/milvus/pull/52814">#52814</a>)</li>
<li>Unificámos os filtros de pertença Bloom e Roaring numa única expressão <code translate="no">membership_match</code>, com suporte correspondente no cliente Go para a criação e consulta de ambos os tipos de filtro (<a href="https://github.com/milvus-io/milvus/pull/53019">#53019</a>)</li>
<li>Reduzida a amplificação de gravação durante a criação de índices baseados em Tantivy, diminuindo a E/S de disco para índices de correspondência de texto, NGRAM e estatísticas de chaves JSON (<a href="https://github.com/milvus-io/milvus/pull/53057">#53057</a>)</li>
<li>Adicionado controlo de admissão nos pontos finais RESTful v2 DQL que devolve um código de estado HTTP 429 com « <code translate="no">Retry-After</code> » antes da descodificação do pedido, quando a fila de consultas do proxy estiver cheia (<a href="https://github.com/milvus-io/milvus/pull/53111">#53111</a>)</li>
<li>Reduzido um ponto crítico de contagem de referências atómicas no percurso de avaliação do filtro escalar, que representava cerca de 48% do tempo de CPU das folhas na pesquisa, melhorando o rendimento da pesquisa filtrada (<a href="https://github.com/milvus-io/milvus/pull/53167">#53167</a>)</li>
<li>Melhorou-se a escalabilidade do conjunto de threads de armazenamento, substituindo a implementação personalizada por « <code translate="no">folly::CPUThreadPoolExecutor</code> » e restaurando o dimensionamento elástico dos trabalhadores (<a href="https://github.com/milvus-io/milvus/pull/53184">#53184</a>)</li>
<li>Melhorou-se a correspondência dos registos de acesso REST, de modo a que os formatadores sejam comparados com o caminho da URL analisada, e os métodos configurados aplicam-se agora a pedidos que incluem parâmetros de consulta (<a href="https://github.com/milvus-io/milvus/pull/53147">#53147</a>)</li>
<li>Adicionado suporte à difusão idempotente, para que as solicitações repetidas deixem de criar tarefas duplicadas, tendo o ` <code translate="no">BulkImport</code> ` como o primeiro a adotar esta funcionalidade (<a href="https://github.com/milvus-io/milvus/pull/53228">#53228</a>)</li>
<li>Adicionados caracteres configuráveis de divisão de frases para o tokenizador Lindera, permitindo que as entradas do dicionário do utilizador que contenham pontuação sejam correspondidas como um único token (<a href="https://github.com/milvus-io/milvus/pull/53287">#53287</a>)</li>
<li>Adicionada uma verificação de versão do cluster que ativa automaticamente a materialização de funções «write-before» apenas após todos os nós terem concluído a atualização, evitando inconsistências de versões mistas durante atualizações progressivas (<a href="https://github.com/milvus-io/milvus/pull/53261">#53261</a>)</li>
<li>Atualizou o Woodpecker para a v0.1.42, corrigindo falhas de recuperação do WAL em segmentos vazios finalizados e melhorando a estabilidade e as métricas do caminho de adição (<a href="https://github.com/milvus-io/milvus/pull/53295">#53295</a>)</li>
<li>Reduzida a sobrecarga atómica e de contagem de referências por chunk no caminho quente de pesquisa e consulta, fixando um instantâneo de segmento selado uma vez por pedido (<a href="https://github.com/milvus-io/milvus/pull/53301">#53301</a>)</li>
<li>Melhorou-se a latência das atualizações parciais, substituindo as esperas do TimeTick por bloqueios otimistas baseados em instantâneos, e aperfeiçoou-se o tratamento do AutoID para que as chaves primárias existentes sejam preservadas e os IDs devolvidos mantenham a ordem de entrada (<a href="https://github.com/milvus-io/milvus/pull/53337">#53337</a>)</li>
<li>Reduzida a construção redundante de visualizações de linhas ao agrupar resultados de pesquisa por campos VARCHAR ou JSON em segmentos selados, diminuindo a sobrecarga da pesquisa por agrupamento (<a href="https://github.com/milvus-io/milvus/pull/53500">#53500</a>)</li>
<li>Adicionada uma API de conformidade que reporta a convergência da configuração de carga globalmente e por grupo de recursos, abrangendo a operacionalidade das réplicas, a visibilidade das consultas, os recursos residuais e a localização do WAL (<a href="https://github.com/milvus-io/milvus/pull/53517">#53517</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Corrigido um problema em que as consultas podiam devolver resultados incorretos após um campo de matriz de estrutura ter sido eliminado e adicionado novamente (<a href="https://github.com/milvus-io/milvus/pull/52921">#52921</a>)</li>
<li>Corrigidas falhas de autenticação SASL/SCRAM-SHA-256 ao ligar-se a brokers do Apache Kafka 4.x, através da atualização da librdkafka para a versão 2.6.1 (<a href="https://github.com/milvus-io/milvus/pull/53086">#53086</a>)</li>
<li>Corrigido um problema em que todos os canais de uma réplica eram atribuídos a um único nó de consulta, causando encerramentos repetidos por falta de memória e deixando a réplica inoperacional (<a href="https://github.com/milvus-io/milvus/pull/53094">#53094</a>)</li>
<li>Corrigido o bloqueio repetido do WAL que paralisava as gravações num PChannel durante 45 a 60 segundos a cada poucos minutos em condições de ingestão sustentada (<a href="https://github.com/milvus-io/milvus/pull/53118">#53118</a>)</li>
<li>Corrigida a compactação do Storage V2 que eliminava caminhos de grupo físico válidos, o que podia desalinhar os índices de colunas compactadas nos segmentos compactados (<a href="https://github.com/milvus-io/milvus/pull/53202">#53202</a>)</li>
<li>Corrigida a exibição de chaves de encriptação de coleções e credenciais de armazenamento de objetos nos registos de compactação (<a href="https://github.com/milvus-io/milvus/pull/53226">#53226</a>)</li>
<li>Corrigidos os aliases de deslocamento de matrizes de estruturas desatualizados que podiam apresentar dados incorretos após a reabertura de um segmento selado (<a href="https://github.com/milvus-io/milvus/pull/53154">#53154</a>)</li>
<li>Corrigida a sincronização de recursos de ficheiros que era executada antes de qualquer recurso ser adicionado, o que podia apagar ficheiros locais do nó no arranque ou no registo do nó (<a href="https://github.com/milvus-io/milvus/pull/53170">#53170</a>)</li>
<li>Corrigido um problema em que um bloco incompleto do binlog podia ser tratado silenciosamente como totalmente lido, com o risco de perda de dados nos resultados de consultas e compactação (<a href="https://github.com/milvus-io/milvus/pull/53263">#53263</a>)</li>
<li>Corrigido um problema em que o espaço de armazenamento de segmentos eliminados nunca era recuperado para coleções sem qualquer índice ativo (<a href="https://github.com/milvus-io/milvus/pull/53252">#53252</a>)</li>
<li>Corrigida a estimativa imprecisa de recursos ao carregar índices de vetores esparsos, o que podia levar a um tratamento incorreto dos dados brutos e a avisos repetidos no QueryNode (<a href="https://github.com/milvus-io/milvus/pull/53249">#53249</a>)</li>
<li>Corrigido um problema em que um nó de streaming congelado fora do grupo de recursos primário podia ser descongelado inesperadamente durante o reequilíbrio (<a href="https://github.com/milvus-io/milvus/pull/53229">#53229</a>)</li>
<li>Corrigida uma falha na ligação ao Google Cloud Storage em que as credenciais do GCP (IAM e HMAC) não estavam registadas antes da verificação prévia do gestor de blocos (<a href="https://github.com/milvus-io/milvus/pull/53288">#53288</a>)</li>
<li>Corrigido um problema em que os registos C++ eram inesperadamente gravados no diretório <code translate="no">/tmp</code>, em vez de serem encaminhados para a saída de registos unificada (<a href="https://github.com/milvus-io/milvus/pull/53293">#53293</a>)</li>
<li>Corrigida a falha nos commits de preenchimento retroativo com um erro HTTP 500 quando um resultado do Spark abrangia várias partições (<a href="https://github.com/milvus-io/milvus/pull/53346">#53346</a>)</li>
<li>Corrigida uma fuga de memória no DataNode em que uma tarefa de construção de índice ou análise cancelada nunca libertava a memória nativa do objeto que já tinha construído (<a href="https://github.com/milvus-io/milvus/pull/53348">#53348</a>)</li>
<li>Corrigido um problema em que a importação do binlog falhava quando um campo vetorial nulo não possuía ficheiros de binlog (<a href="https://github.com/milvus-io/milvus/pull/53363">#53363</a>)</li>
<li>Corrigidos campos de saída incompletos ou incorretos quando os pedidos de pesquisa e consulta liam dados de tabelas externas (<a href="https://github.com/milvus-io/milvus/pull/53372">#53372</a>, <a href="https://github.com/milvus-io/milvus/pull/53385">#53385</a>)</li>
<li>Corrigiram-se linhas de vetores esparsos e IDs de partição duplicados em pedidos REST, bem como problemas de propriedade e limpeza de memória que podiam causar falhas ou fugas quando as consultas terminavam prematuramente (<a href="https://github.com/milvus-io/milvus/pull/53402">#53402</a>)</li>
<li>Corrigido um problema em que uma compactação que reportava a conclusão sem uma carga útil de resultados podia causar a falha do DataCoord ou deixar a tarefa de compactação bloqueada, em vez de ser repetida corretamente (<a href="https://github.com/milvus-io/milvus/pull/53443">#53443</a>)</li>
<li>Corrigido um problema em que as propriedades dos ficheiros de dados externos eram perdidas durante a criação de manifestos de segmentos, fazendo com que as coleções externas perdessem os metadados dos ficheiros de origem (<a href="https://github.com/milvus-io/milvus/pull/53444">#53444</a>)</li>
<li>Corrigida uma falha do QueryNode que podia ocorrer ao processar pedidos « <code translate="no">count(*)</code> » no nível de registo de depuração, nomeadamente durante atualizações progressivas (<a href="https://github.com/milvus-io/milvus/pull/53474">#53474</a>)</li>
<li>Corrigido um problema em que as tarefas de criação de índices e estatísticas continuavam a consumir recursos dos trabalhadores após o seu segmento, índice ou coleção terem sido eliminados, e melhorada a limpeza de ficheiros de índice órfãos (<a href="https://github.com/milvus-io/milvus/pull/53515">#53515</a>)</li>
<li>Corrigido o tratamento do caminho de armazenamento local para que os dados gravados por diferentes componentes sejam sempre colocados onde os leitores e a recolha de lixo esperam que estejam, com atualização automática para implementações locais existentes (<a href="https://github.com/milvus-io/milvus/pull/53530">#53530</a>)</li>
<li>Corrigidas as tarefas de criação de índices que tentavam repetidamente sem fim quando um segmento continha documentos JSON malformados; essas criações falham agora rapidamente, em vez de consumirem recursos dos trabalhadores indefinidamente (<a href="https://github.com/milvus-io/milvus/pull/53531">#53531</a>)</li>
<li>Corrigidas as restaurações simultâneas de instantâneos direcionadas para a mesma coleção: as restaurações são agora serializadas e uma restauração para um destino existente é rejeitada com um erro claro «já existe na base de dados», em vez de ocorrerem conflitos ou fugas de recursos (<a href="https://github.com/milvus-io/milvus/pull/53586">#53586</a>)</li>
<li>Corrigida a corrupção de chaves de encriptação binárias em interfaces de armazenamento e o desalinhamento de cursores nos leitores compactados do Storage V2 projetado, através da atualização do milvus-storage (<a href="https://github.com/milvus-io/milvus/pull/53569">#53569</a>)</li>
</ul>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 9 de setembro de 2026</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do SDK Python</th><th>Versão do SDK do Node.js</th><th>Versão do SDK para Java</th><th>Versão do SDK para Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>É com grande entusiasmo que anunciamos o lançamento do Milvus v3.0.1! Esta versão inclui a gestão de instantâneos REST v2, capacidades alargadas de reclassificação e suporte ao campo TEXT no cliente Go e na API RESTful, a par de melhorias de desempenho e correções relativas ao Storage V3, à consistência dos dados e à segurança.</p>
<h3 id="Features-improvements" class="common-anchor-header">Melhorias nas funcionalidades<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
<li>Adicionadas APIs REST v2 para gestão nativa de instantâneos ao nível da coleção e restauração assíncrona (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>, <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>Adicionado um limiar configurável para o número de resultados, para controlar a seleção do caminho de saída do comando «Take» em operações de pesquisa e consulta (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>Adicionado suporte a campos TEXT ao cliente Go e à API RESTful (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>Adicionadas taxas de IOPS de leitura iniciais e máximas configuráveis para Tabelas Externas (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>Adicionada uma configuração opcional para que as tarefas de atualização de coleções externas aguardem até que todos os segmentos estejam indexados antes de reportarem a conclusão, sem atrasar a publicação de dados (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>Adicionado suporte à reclassificação L1 às cadeias de funções de pesquisa (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>Adicionada reclassificação RRF ponderada com pesos opcionais por pedido ANN no FunctionScore, REST, pesquisa híbrida legada e no cliente Go (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>, <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">Melhorias de estabilidade<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
<li>Melhorou-se a segurança da memória nos índices e caches RTree de geometria, bem como o tratamento de consultas WKB não analisáveis e de geometria vazia (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>Melhoria na gestão de memória através da restauração do orçamento de memória transitória a nível do processo e da correção das estimativas de memória para o carregamento simultâneo de campos do Storage V2/V3 e do carregamento de índices escalares V3 (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>Redução dos estrangulamentos de transferência e do consumo de memória durante a criação de índices de coleções externas, através da paralelização de leituras e da transmissão de dados vetoriais brutos para o disco (<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>)</li>
<li>Melhoria do débito do Woodpecker para cargas de trabalho de pequenos lotes e alta simultaneidade, através do agrupamento em lotes de adições de clientes e da exposição das definições de sincronização (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>Melhoria da consistência da propriedade e do tempo de vida do leitor de registos, do tratamento de blobs vazios e da comunicação de erros de leitura em todos os percursos de armazenamento e compactação (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>Melhoria da eficiência da sondagem de hash de agrupamento com um pipeline intercalado de quatro vias e salvaguardas para colisões e limites de rehash (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>Redução da sobrecarga de processamento de inserções, ignorando a análise do corpo da inserção no WAL para coleções sem campos de saída BM25 ou MinHash (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>Melhoria na comunicação de falhas de armazenamento e no tratamento de novas tentativas, preservando as classificações de erros transitórios e permanentes em todas as camadas de execução (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>Melhoria do desempenho das consultas espaciais através da ativação, por predefinição, da divisão em «grosso/refinado» do GIS e da fusão de predicados na mesma coluna (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>Melhoria na programação de tarefas de indexação de texto e fragmentação de JSON, com controlo de admissão baseado em backlog partilhado e prioridade de envio alternada (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>Adicionado suporte a mmap para mapeamentos de deslocamento de segmentos selados, com opções de carregamento dedicadas e contabilização de recursos de disco (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>Carregamento de dados do Storage V2 otimizado através da execução, sob demanda, de estimativas de memória por blocos por coluna (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>Adicionado suporte ao AutoIndex do lado do servidor para índices vinculados a novos campos de saída de funções, permitindo que os pedidos add_function_field omitam parâmetros de índice ou especifiquem AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>Reduziram-se as cargas úteis dos relatórios de distribuição do QueryNode através de relatórios incrementais com recurso ao relatório completo, e reduziram-se as alocações de memória durante a recolha de métricas (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>, <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>Melhorou-se a resistência do hash de palavras-passe, aumentando o custo do bcrypt de 4 para 10, sendo necessária a rotação de credenciais para atualizar os hashes existentes (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>Reduzida a descodificação redundante durante as importações de Parquet, lendo apenas as colunas folha necessárias para os subcampos de matrizes de estruturas (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>Melhorou o agrupamento de fusão forçada com planeamento baseado no tamanho em várias rondas e tornou obsoleta a configuração do limiar de planeamento legado (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>Atualização do cgosymbolizer para evitar que os processos do Milvus executados como PID 1 fiquem bloqueados após falhas nativas (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>Melhorou-se a validação da contagem de linhas para entradas de realce semântico (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>Melhoria no controlo de repetições de importação com backoff configurável para repetições de escrita (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>, <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>, <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>Melhorou-se a gestão do ciclo de vida das tarefas de análise, recuperando versões de estatísticas desatualizadas e mantendo os estados finais (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>, <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>Melhoria na coordenação do ciclo de vida dos segmentos, aguardando a libertação do segmento após tempos de espera de bloqueio (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>Melhoria na ordenação do armazenamento para compactação de dados com uma fusão k-way (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>Redução da expansão do buffer de validade de campos nulos, através da preservação de máscaras compactadas no acesso a blocos, na avaliação de expressões e nas estatísticas JSON (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>Proteção melhorada de credenciais confidenciais, chaves de API, hashes de palavras-passe RBAC e detalhes de fontes de recolha externas, impedindo a sua exposição em registos ou mensagens de erro (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>, <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>, <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>Melhoria do controlo de concorrência de atualizações parciais com validação CAS otimista e novas tentativas seguras para conflitos elegíveis (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>Melhoria da estabilidade dos instantâneos de leitura de segmentos em crescimento e da gestão do tempo de vida dos instantâneos de esquema (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>Redução das varreduras redundantes de metadados de autorização durante as cópias de segurança (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>Melhoria no mapeamento de IDs de vetores nulos, transferindo-o para a camada de índice, unificando o tratamento de IDs lógicos e suportando mapeamentos baseados em mmap para índices selados (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>Sincronização melhorada entre a compilação Sonic JIT e o carregamento de plug-ins Go em compilações para CPU e GPU (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>Melhoria na resolução do canal do caminho de escrita do proxy através da cache de metadados, eliminando RPCs redundantes do coordenador e melhorando a classificação de erros (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>Tempo de cálculo de recall reduzido de aproximadamente 3,08 segundos para 18,5 milissegundos com topk=100000 no benchmark relatado (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>Filtro de campos nulos otimizado através da reutilização de bitmaps de validade, reduzindo o armazenamento redundante de deslocamentos nulos e acelerando as cópias de conjuntos de bits (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>, <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>, <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>Melhoria dos índices escalares híbridos em subcampos de estruturas aninhadas, utilizando STL_SORT quando o número de elementos distintos atinge o limite de cardinalidade do mapa de bits (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>Melhorou-se a eficiência da filtragem de IDs de segmentos na cache de metadados (<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>Reduzidas as alocações de memória nas funções auxiliares de hash (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>Otimização da ordenação de resultados de reclassificação combinados, eliminando consultas ao mapa por comparação (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>Segurança de memória melhorada ao lidar com valores predefinidos JSON e visualizações de cadeias de caracteres não terminadas em NUL (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>Melhorados os tempos de compilação em C++ com compilação unificada por âmbito, melhorado o armazenamento em cache do compilador e reduzido o trabalho de compilação redundante (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>Melhoria da cobertura e atualização das métricas do sistema de ficheiros através da recolha de métricas de sistemas de ficheiros em cache no momento da recolha, preservando os nomes e rótulos das métricas existentes (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>Adicionada uma definição atualizável «growingBuildThreadRate» para configurar o número de threads por segmento em crescimento durante a compilação do índice provisório, mantendo o padrão de thread única (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>Adicionado suporte à gravação de dados de campo mmap à versão 3.0 através de um backport, com a opção queryNode.mmap.writeback desativada por predefinição (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correções de erros<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Corrigidos resultados incorretos e validação inconsistente de predicados em consultas JSON, ARRAY e TIMESTAMPTZ, incluindo predicados de tipos mistos, comparações de números grandes e filtragem em vários lotes (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>Corrigida a inconsistência na atualização de dados durante atualizações paralelas de coleções externas quando os ficheiros de origem de um segmento abrangiam várias tarefas (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>Corrigidas as expressões MATCH que aceitavam predicados que não operavam ao nível do elemento (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>Corrigido o erro em que as pesquisas sem correspondências falhavam com um erro de tipo de ID não suportado (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>Corrigido o bloqueio do Milvus autónomo durante o encerramento, adicionando um tempo limite de migração configurável com um valor predefinido de 10 segundos (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>Corrigido o problema em que os pedidos de incorporação de tabelas externas utilizavam a identidade de cluster errada quando os trabalhadores do DataNode eram partilhados entre clusters de serviço (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>Corrigido um problema que impedia a atualização de integration_id e model_deployment_id para funções TextEmbedding (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>Corrigidas as respostas HTTP JSON que omitiam o estado explícito «ok=false» para segmentos de preenchimento retroativo com falha (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>Corrigidos os erros nos uploads de objetos MinIO que resultavam no código de erro HTTP 400 XAmzContentChecksumMismatch quando repetidos após tempos de espera de transporte ou de baixa velocidade (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>, <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>Corrigido o bloqueio do equilíbrio de segmentos entre QueryNodes quando o Serviço de Streaming estava ativado (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>, <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>Corrigida a perda silenciosa de dados durante a compactação mista quando os registos retidos não podiam ser reconstruídos (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>Corrigida a perda de definições de coleção nas restaurações de instantâneos, que passavam inesperadamente para a consistência forte (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>Corrigida a situação em que as eliminações em streaming não incluíam segmentos selados recém-carregados, permitindo que os dados eliminados continuassem a ser pesquisáveis (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>Corrigida a construção incorreta de índices aninhados para dados vazios (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>Corrigidos os impasses ao mudar para o serviço de streaming que deixavam as operações em espera indefinidamente (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>Corrigidos valores predefinidos incorretos de geometria durante a compactação e a reconstrução de registos, bem como marcações nulas incorretas para valores de geometria preenchidos por predefinição nas importações de Parquet (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>Corrigida a rejeição de segmentos V3 válidos durante a compactação e a recuperação após um reinício do DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>, <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>, <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>, <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>, <a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>, <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>Corrigidas falhas no carregamento de segmentos com um erro de metadados de versão em falta ao utilizar índices escalares híbridos em subcampos de matriz VARCHAR em estruturas (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>Corrigida a falha na atualização de colunas externas quando um manifesto atualizado era reaberto (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>Corrigido o tratamento incorreto do fuso horário em pesquisas com condições dependentes do tempo (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>Corrigido o tratamento incorreto de entradas ArrayOfVector em pedidos de pesquisa (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>Corrigida a falha nas inserções que não rejeitavam linhas que excediam o limite de tamanho suportado (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>Corrigido o problema em que os índices provisórios ignoravam a versão do índice de destino configurada (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>Corrigido o problema em que as consultas que utilizavam «order_by» não devolviam campos de saída de vetor denso (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>, <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>Corrigida a situação em que privilégios revogados continuavam em vigor após serem removidos de um grupo de privilégios (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>Corrigida a contagem incorreta de ficheiros binlog e as etiquetas do formato de armazenamento para segmentos do Storage V3 após reinicializações do DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>, <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>Corrigido o bloqueio das restaurações de instantâneos externos devido a verificações de versão de workers não fiáveis ou à repetição de tentativas com workers não suportados até ao tempo limite (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>Corrigidas falhas no carregamento de segmentos para índices HYBRID em subcampos de matrizes de estruturas com ficheiros STLSORT legados da versão 3.0.0, sem necessidade de reindexação (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>Corrigidas falhas de sistema ao processar buffers de dados Arrow C de comprimento zero (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>Corrigido o tratamento incorreto de falhas ao carregar ou reabrir segmentos do Storage V3 após erros no manifesto, preservando o estado existente do segmento para novas tentativas seguras (<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>)</li>
<li>Corrigidas falhas nas consultas quando os filtros de elementos ARRAY encontravam lotes completos de NULL ou matrizes vazias antes dos elementos seguintes (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>Corrigidos trabalhos de preenchimento retroativo que confirmavam incorporações desatualizadas após a alteração do esquema da coleção (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>Corrigida a situação em que campos ausentes nos registos do Storage V3 eram devolvidos como NULL em vez dos seus valores predefinidos declarados (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>, <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>, <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>Corrigidas falhas de cópia do lado do servidor que impediam a restauração de instantâneos do Storage V3 no GCS com credenciais IAM/OAuth, incluindo cópias de objetos com mais de 5 GiB (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>Corrigido o acesso não autenticado através de chamadas gRPC em streaming na porta do proxy externo (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>Corrigida a perda dos carimbos de data e hora de commit originais dos dados após a compactação em cluster (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>Corrigidas falhas nos nós de streaming causadas por falhas repetidas de flush após a adição de um campo TEXT a coleções com segmentos existentes do Storage V2 (<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>)</li>
<li>Corrigida a falha em que linhas expiradas em segmentos do Storage V3 não acionavam a compactação baseada no campo TTL e permaneciam armazenadas até que outra condição de compactação fosse satisfeita (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>Corrigida a inconsistência nas chaves primárias geradas automaticamente entre as coleções de origem e de destino durante importações replicadas por CDC (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>Corrigida a perda de gravações simultâneas durante a migração do backend WAL (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>, <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>, <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>Corrigido o problema em que índices HYBRID aninhados, reconstruídos ou compactados com dados de alta cardinalidade se tornavam ilegíveis após a reversão para uma versão anterior (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>Corrigido o tratamento de elementos nulos em linhas de vetores densos externos, passando a aceitar linhas nulas totalmente nulas e adicionando um tratamento configurável para linhas parcialmente nulas (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>Corrigidas contagens incorretas de linhas de segmentos V3 e falhas repetidas na compactação por ordenação após failover do nó de streaming (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>Corrigidas as consultas que combinavam condições de intervalo com «OR», omitindo registos no limite inferior inclusivo (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>Corrigidas as pesquisas por chave primária que não preservavam a ordem de ID solicitada (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>Corrigido um problema em que a adição de um campo TEXT após a ativação do Storage V3 impedia o carregamento de segmentos em crescimento existentes do Storage V2, interrompendo as operações de flush, ordenação e indexação (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>Corrigidos instantâneos que incluíam segmentos do Storage V3 não confirmados, fazendo com que as restaurações fossem reportadas como bem-sucedidas, embora os segmentos restaurados não pudessem ser carregados (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>, <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>Corrigida a falha no carregamento de índices de texto do Storage V3 quando os seus ficheiros estavam armazenados em diretórios aninhados de tarefas ou versões (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 29 de julho de 2026</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do SDK Python</th><th>Versão do SDK do Node.js</th><th>Versão do SDK para Java</th><th>Versão do SDK para Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>O Milvus 3.0.0 foi oficialmente lançado! Com base na arquitetura «lake-native» introduzida na <a href="https://milvus.io/docs/release_notes.md#v30-beta">versão 3.0-beta</a>, esta versão conclui o que a versão beta iniciou: a «External Collection» abrange mais fluxos de trabalho «lakehouse»; o esquema suporta adição, preenchimento retroativo e eliminação online; o índice esparso foi reconstruído em torno do SINDI; o StructArray e a pesquisa facetada completam o motor de recuperação; o passthrough do FAISS e o TEXT ampliam as opções de índice e modalidade; e o Woodpecker funciona como um serviço autónomo.</p>
<p>Veja o vídeo abaixo para saber mais sobre o Milvus 3.0 e participe na sessão de perguntas e respostas (AMA) com os principais responsáveis pela manutenção:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Se ainda não conhece a linha 3.0, a secção «Resumo das funcionalidades do Core 3.0» abaixo resume as capacidades introduzidas na versão 3.0-beta; as <a href="https://milvus.io/docs/release_notes.md#v30-beta">notas de lançamento da versão 3.0-beta</a> contêm as descrições completas.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Novidades na versão 3.0.0 (desde a versão 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Coleção Externa: fluxos de trabalho «lakehouse» mais completos</h4><p>A versão 3.0-beta introduziu a «Coleção Externa»: referenciar ficheiros do «lakehouse» no local, criar índices e pesquisá-los sem copiar dados para o Milvus. Esta versão alarga esta funcionalidade para fluxos de trabalho completos de recuperação do «lakehouse». Os campos externos podem agora alimentar campos de saída de funções, tais como vetores esparsos BM25, assinaturas MinHash e incorporações de texto, pelo que os campos de recuperação de texto e derivados de modelos são criados no interior do Milvus sem copiar a tabela de origem. A atualização também suporta a evolução aditiva do esquema: quando a tabela externa ganha novas colunas, o Milvus aplica correções aos segmentos afetados, em vez de reconstruir a coleção.</p>
<p>Esta versão adiciona ainda um formato externo « <code translate="no">milvus-table</code> » que trata os metadados do Milvus Snapshot e os manifestos do Storage V3 como uma fonte externa, pelo que um instantâneo da coleção pode, por si só, ser servido como uma tabela externa — os sistemas de processamento em lote e de serviço obtêm uma visão partilhada, apoiada no manifesto, dos mesmos dados.</p>
<p>Para mais informações, consulte <a href="/docs/pt/create-an-external-collection.md">«Criar uma coleção externa</a> e <a href="/docs/pt/snapshots.md">instantâneos</a>».</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Esquema flexível: adicionar, preencher retroativamente e eliminar colunas em linha</h4><p>Os esquemas não permanecem estáticos em produção — os modelos incorporados são substituídos, as funcionalidades são atualizadas, os campos tornam-se obsoletos — e isto costumava implicar reconstruções completas da coleção com tempo de inatividade ou gravações duplas. A versão 3.0.0 fecha o ciclo: as colunas podem ser adicionadas, preenchidas e eliminadas enquanto o serviço continua.</p>
<p>O preenchimento retroativo funciona em ambas as direções. O preenchimento retroativo externo lida com valores calculados fora do Milvus: adicione uma coluna, crie um instantâneo da coleção como ponto de partida consistente, execute a tarefa offline, grave os valores de volta e o Milvus indexa a nova coluna de forma incremental — uma atualização do modelo de incorporação em centenas de milhões de linhas torna-se um caminho ativo sem tempo de inatividade. O preenchimento interno abrange valores derivados do kernel: associe uma função BM25 ou MinHash a uma coleção existente e o seu campo de saída é calculado automaticamente com base nos dados existentes.</p>
<p>Para mais informações, consulte <a href="/docs/pt/add-fields-to-an-existing-collection.md">«Adicionar campos a uma coleção existente</a>».</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Reestruturação do índice esparso: SINDI, Block-Max WAND e Block-Max MaxScore</h4><p>O Milvus 3.0 atualiza o índice de vetores esparsos em todos os aspetos. Introduz novos algoritmos de pesquisa — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND e Block-Max MaxScore — juntamente com compressão de lista invertida, quantização configurável e seleção do algoritmo de pesquisa por carga de trabalho. O carregamento via mmap, a serialização e a pontuação BM25 também foram otimizados, reduzindo o armazenamento do índice e a sobrecarga de carregamento para pesquisas de vetores esparsos e de texto completo em grande escala. Em testes de desempenho internos, o índice BM25 comprimido é cerca de 3 vezes menor do que o índice esparso 2.6 com uma taxa de recuperação comparável, e o SINDI atinge até cerca de 10 vezes o QPS do MaxScore em incorporações esparsas aprendidas. Assim que a nova versão do índice for ativada (consulte as notas sobre compatibilidade e comportamento), o SINDI passa a ser o padrão para a pesquisa de IP esparsa e o MaxScore passa a ser o padrão para o BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Cobertura do StructArray</h4><p>O StructArray suporta agora valores nulos, índices de bitmap, adição dinâmica de campos em coleções ativas e atualização parcial de campos de estrutura através de «upsert», com cobertura REST e de importação em massa correspondente.</p>
<p>A pesquisa ao nível do elemento adiciona pesquisa híbrida entre subcampos vetoriais com agrupamento configurável por entidade (variantes max / sum / avg / top-k), além de pesquisa por intervalo e agrupamento dentro da mesma. A filtragem aninhada abrange os predicados <code translate="no">element_filter</code>, os quantificadores <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code>, o acesso posicional a subcampos, como <code translate="no">tags[0][name]</code>, e <code translate="no">array_length()</code> na coluna da estrutura.</p>
<p>Para mais informações, consulte <a href="/docs/pt/array-of-structs.md">StructArray</a> e <a href="/docs/pt/struct-array-operators.md">Operadores StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Agregação de pesquisa e pesquisa facetada</h4><p>A agregação de consultas da versão beta calcula estatísticas exatas sobre dados filtrados; a versão 3.0.0 adiciona facetas ao caminho de pesquisa. Especifique um campo de faceta no momento da pesquisa e o Milvus devolve os principais valores de faceta, cada um representado pelo seu membro com melhor correspondência na classificação ANN e anotado com agregados como COUNT e AVG — a barra lateral de pesquisa facetada (marca, gama de preços, atributos) numa única solicitação, em vez de recuperar e contar em excesso do lado do cliente.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Reclassificação da Cadeia de Funções</h4><p>A reclassificação é agora composível através da API da Cadeia de Funções, que executa um pipeline ordenado e tipado como parte de uma única solicitação de pesquisa. Uma cadeia pode combinar a reavaliação inicial L0 no QueryNode com a reclassificação pós-redução L2 no Proxy, suportando a transformação e combinação de pontuações, a reclassificação baseada em modelos, a ordenação e o corte de candidatos sem orquestração do lado do cliente. Esta versão também adiciona pontuação XGBoost nativa para reclassificação L0 utilizando modelos UBJ registados como FileResources, juntamente com os Hugging Face Inference Providers para incorporação de texto gerida pelo servidor e reclassificação por semelhança de frases.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Campos de texto longo TEXT</h4><p>Os campos TEXT tornam o texto longo de primeira classe, com a remoção dos limites de comprimento do lado do armazenamento: suportam <code translate="no">text_match</code>, <code translate="no">phrase_match</code> e BM25. Os valores inferiores a 64 KB permanecem na linha; os valores maiores são transferidos para ficheiros LOB ao nível da partição no formato Vortex, com a coluna a armazenar apenas referências <code translate="no">(file_id, offset)</code>. Os ficheiros LOB são partilhados entre segmentos, pelo que a compactação move referências em vez de reescrever texto. Para o RAG, isto significa recuperar vetores e texto de origem da mesma base de dados numa única operação de E/S — sem necessidade de utilizar uma base de dados blob externa.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Passagem de índice FAISS</h4><p>Um novo tipo de índice « <code translate="no">FAISS</code> » aceita cadeias de caracteres arbitrárias da fábrica de índices Faiss através do parâmetro « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — com os parâmetros de pesquisa passados, de modo que as receitas do Faiss são reproduzidas diretamente no Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Suporte aos formatos Vortex e Lance</h4><p>A camada de armazenamento ganha dois formatos colunares abertos: o Vortex como formato interno de próxima geração — codificações adaptativas (dicionário, RLE, compactação de bits, compressão específica para números flutuantes), descompressão sem cópia, otimizado para cargas de trabalho mistas de vetores e escalares — e o Lance, a par do Parquet, para o intercâmbio no ecossistema aberto. O Vortex está destinado a tornar-se o formato interno predefinido, com o «filter pushdown» e uma variante local previstos no roteiro.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Implementação autónoma do Woodpecker</h4><p>O Woodpecker, o WAL no centro do percurso de gravação em streaming, pode agora ser implementado como um serviço independente, em vez de estar incorporado noutros nós — escalabilidade independente, isolamento de falhas e observabilidade, tal como qualquer outro microsserviço. Isto é particularmente importante para grandes clusters e cargas de trabalho com elevado volume de gravações.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Resumo das funcionalidades principais da versão 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>As funcionalidades abaixo foram introduzidas na <a href="https://milvus.io/docs/release_notes.md#v30-beta">versão 3.0-beta</a> e fazem parte da versão 3.0.0; consulte as notas da versão beta para obter as descrições completas.</p>
<ul>
<li><strong>Coleção Externa</strong> — consultar dados do lakehouse (Parquet, Lance, Iceberg, Vortex) no local: sem cópia, apenas de leitura, sincronizados através de atualização incremental.</li>
<li><strong>Snapshot</strong> — vistas de recolha de dados de leitura apenas, num momento específico, por referência de segmento, com armazenamento marginal quase nulo.</li>
<li><strong>Armazenamento V3 (Loon)</strong> — armazenamento colunar baseado em manifesto em armazenamento de objetos; a base para o Snapshot e a Coleção Externa.</li>
<li><strong>Consulta / Pesquisa ORDER BY</strong> — ordenação de vários campos do lado do servidor com ASC / DESC por campo.</li>
<li><strong>Agregação de consultas</strong> — COUNT / SUM / AVG / MIN / MAX com agrupamento, avaliadas no lado do servidor.</li>
<li><strong>EmbList + DiskANN</strong> — indexação multivectorial no disco para listas de incorporação StructArray, com percursos de aceleração como o Muvera e o Lemur.</li>
<li><strong>Função MinHash (doc-in, doc-out)</strong> — assinaturas MinHash do lado do servidor, juntamente com « <code translate="no">MINHASH_LSH</code> » para deteção de quase-duplicados.</li>
<li><strong>Vetores nulos</strong> — NULL em todos os seis tipos de vetores; a pesquisa ignora linhas NULL e o AddField estende-se aos campos vetoriais.</li>
<li><strong>TTL de entidade</strong> — expiração por linha determinada por um campo TIMESTAMPTZ.</li>
<li><strong>FileResource</strong> — dicionários, listas de sinónimos e listas de palavras de exclusão geridos pelo cluster para analisadores, BM25 e Text Match.</li>
<li><strong>Force Merge</strong> — compactação de segmentos acionada por operador, em modo síncrono ou assíncrono.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Notas sobre compatibilidade e comportamento<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
<li><strong>O Storage V3 (Loon) está desativado por predefinição.</strong> As funcionalidades que dependem dele — tais como os campos Snapshot e TEXT — requerem a sua ativação manual através de <code translate="no">common.storage.useLoonFFI</code>. O Storage V3 será ativado por predefinição numa versão posterior.</li>
<li><strong>A compatibilidade e a reversão entre as versões 2.6 e 3.0 estão garantidas</strong> — uma implementação da versão 3.0 pode ser revertida para a versão 2.6. No entanto, assim que ativar ou utilizar funcionalidades que alterem o formato de dados serializados (por exemplo, o Storage V3), a reversão deixa de ser possível.</li>
<li><strong>As novas versões de índice são opcionais por enquanto.</strong> Os algoritmos de índice recém-introduzidos requerem o aumento manual da versão de índice alvo (<code translate="no">dataCoord.targetVecIndexVersion</code> para 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> para 4) antes de entrarem em vigor; uma versão posterior irá ativá-los por predefinição.</li>
<li><strong>As imagens de GPU passam para o CUDA 12.9</strong> e deixam de preservar a compatibilidade com a GPU do Ubuntu 20.04.</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 9 de maio de 2026</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do SDK do Python</th><th>Versão do SDK do Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>O Milvus 3.0-beta amplia a base de dados vetorial do Milvus com uma nova integração no ecossistema Open Lake: a «External Collection» permite ao Milvus consultar tabelas externas do Lake sem cópia (zero-copy), e o Spark pode ler as coleções do Milvus diretamente através do Snapshot. Esta versão traz também uma recuperação mais rica, um esquema mais expressivo, uma personalização mais aprofundada da pesquisa de texto, controlos mais precisos do ciclo de vida dos dados e dos modelos, e mais controlos do lado do operador. O Milvus 3.0 é o núcleo central do Zilliz Lakebase, impulsionando o seu serviço unificado, a descoberta e o processamento em lote.</p>
<h3 id="Key-Features" class="common-anchor-header">Principais funcionalidades<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Coleção Externa</h4><p>Em pipelines de dados de IA típicos, terabytes de embeddings e metadados já se encontram no armazenamento de objetos como tabelas Parquet, Lance ou Iceberg. Copiar esses dados para o Milvus duplica o custo de armazenamento, adiciona um pipeline ETL que tem de ser mantido em sincronia e afasta a governança de dados do cliente.</p>
<p>A Recolha Externa elimina a necessidade de cópia. Uma Recolha do Milvus pode referenciar ficheiros onde estes já se encontram, e o Milvus gere apenas o esquema, os índices e a execução de consultas. Uma atualização incremental mantém a coleção alinhada com os ficheiros subjacentes. Os clientes cujos dados não podem sair do lago de dados, como as equipas das áreas financeira e de saúde, podem executar a recuperação de vetores nesses dados no local onde se encontram. Um único conjunto de dados residente no lago de dados também pode ser servido a partir de várias instâncias do Milvus em simultâneo.</p>
<p>Para mais informações, consulte <a href="/docs/pt/create-an-external-collection.md">«Criar uma coleção externa</a>».</p>
<h4 id="Snapshot" class="common-anchor-header">Instantâneo</h4><p>A disponibilização e a descoberta em lote necessitam frequentemente da mesma coleção ao mesmo tempo. A avaliação de modelos A/B, a deduplicação em grande escala, a validação de preenchimento retroativo e a reversão de versões requerem todas uma visão estável da coleção enquanto as gravações ainda estão a ocorrer.</p>
<p>O Snapshot cria uma visão pontual e de leitura exclusiva de uma coleção, referenciando segmentos existentes em vez de copiar dados, pelo que o custo marginal de armazenamento é próximo de zero. Os trabalhos em lote podem ler a partir do Snapshot sob isolamento do tipo MVCC, enquanto a coleção ativa continua a aceitar gravações.</p>
<p>Para mais informações, consulte <a href="/docs/pt/snapshots.md">«Snapshots</a>», <a href="/docs/pt/manage-snapshots.md">«Gerir Snapshots</a>» e <a href="/docs/pt/snapshot-use-cases.md">«Casos de Utilização de Snapshots</a>».</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Consulta / Pesquisa «Order By»</h4><p>A pesquisa e a consulta aceitam agora a ordenação por vários campos, com a ordenação transferida para o kernel do Milvus e os parâmetros « <code translate="no">ASC</code> » e « <code translate="no">DESC</code> » configuráveis por campo. Isto colmata uma lacuna comum em produção: a ordenação «Top-K» apenas por distância muitas vezes não corresponde às necessidades do negócio quando o item mais semelhante não é o mais barato, o mais recente ou o mais popular.</p>
<p>As aplicações já não precisam de recuperar resultados em excesso e reordená-los no cliente para expressar uma classificação composta.</p>
<p>Para mais informações, consulte <a href="/docs/pt/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«Ordenar resultados de pesquisa por campos escalares</a> » e <a href="/docs/pt/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">«Ordenar resultados de consulta</a>».</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregação de consultas</h4><p>A produção de estatísticas de distribuição por inquilino, contagens de completude de campos ou progresso da implementação de versões a partir de uma Coleção Milvus exigia, anteriormente, a recuperação das entidades correspondentes para o cliente e a sua agregação nesse local. O Milvus 3.0 integra a agregação escalar ao estilo SQL no kernel. Uma chamada de consulta aceita expressões de agregação do tipo « <code translate="no">group_by_fields</code> » no formato « <code translate="no">output_fields</code> », incluindo « <code translate="no">count(*)</code> », « <code translate="no">count(&lt;field&gt;)</code> », « <code translate="no">sum(&lt;field&gt;)</code> », « <code translate="no">avg(&lt;field&gt;)</code> », « <code translate="no">min(&lt;field&gt;)</code> » e « <code translate="no">max(&lt;field&gt;)</code> ». A agregação é avaliada no lado do servidor após a filtragem.</p>
<p>Para mais informações, consulte <a href="/docs/pt/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">«Agregar resultados de consultas</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vetor nulo</h4><p>As incorporações são frequentemente produzidas de forma assíncrona, pelo que uma entidade pode chegar antes do seu vetor. Os dados multimodais também apresentam lacunas naturais, como um vídeo sem legendas ou um produto sem imagem. As versões anteriores não ofereciam uma solução adequada: as aplicações ou adiavam a gravação até que o vetor estivesse pronto ou preenchiam com um vetor provisório, e ambas as opções prejudicavam a qualidade da recuperação.</p>
<p>O Milvus 3.0 suporta o valor NULL em campos vetoriais em todos os seis tipos de vetores. A pesquisa ignora automaticamente os vetores NULL, a qualidade da recuperação não é afetada e os vetores NULL não ocupam efetivamente qualquer espaço de armazenamento. A funcionalidade « <code translate="no">AddField</code> » também se estende aos campos vetoriais no âmbito desta alteração: com « <code translate="no">nullable=True</code> », uma coleção existente pode adicionar novos campos vetoriais online sem necessidade de reconstrução.</p>
<p>Para mais informações, consulte <a href="/docs/pt/nullable-and-default.md">Campos nulos</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dicionário personalizado e dicionário de sinónimos</h4><p>Os tokenizadores predefinidos nem sempre cumprem os requisitos de qualidade de pesquisa em produção. O chinês, domínios verticais como medicina, direito e química, e corpora multilingues podem beneficiar substancialmente de dicionários personalizados e tabelas de sinónimos. Até agora, estes recursos existiam principalmente como reescritas de consultas do lado da aplicação.</p>
<p>O Milvus 3.0 adiciona um mecanismo FileResource para registar dicionários de tokenizadores personalizados, listas de sinónimos, listas de palavras de stop e regras de decomposição de compostos. Uma vez registado, um recurso pode ser referenciado a partir de qualquer tokenizador ou filtro e entra em vigor no BM25, nos analisadores e no Text Match. Os dicionários e sinónimos podem agora ser versionados e geridos centralmente, em vez de ficarem dispersos pelo código da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/manage-file-resources.md">«Gerir Recursos</a> de <a href="/docs/pt/manage-file-resources.md">Ficheiro</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidades</h4><p>O TTL ao nível da coleção e ao nível da partição é demasiado genérico para muitos cenários de ciclo de vida e conformidade. Diferentes inquilinos dentro da mesma coleção têm frequentemente regras de retenção diferentes, e as entidades individuais podem precisar de expirar de acordo com um calendário que não corresponde ao resto da coleção.</p>
<p>O Milvus 3.0 suporta o TTL por entidade. Basta declarar um campo « <code translate="no">TIMESTAMPTZ</code> » no esquema, marcá-lo como o campo TTL através de uma propriedade da coleção e o Milvus recupera automaticamente as entidades expiradas. Isto abrange pedidos de «direito ao esquecimento», dados de sessão com prazo de validade e histórico de conversações delimitado, sem necessidade de limpeza do lado da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Definir TTL ao nível da entidade</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>O Milvus 2.6 adicionou o índice « <code translate="no">MINHASH_LSH</code> » para a deteção de quase-duplicados com base em conjuntos, mas as aplicações ainda tinham de calcular assinaturas MinHash antes de gravar dados no Milvus.</p>
<p>O Milvus 3.0 adiciona uma função MinHash do lado do servidor. Basta declarar um campo de entrada « <code translate="no">VARCHAR</code> » e um campo de saída « <code translate="no">BINARY_VECTOR</code> » no esquema, associar uma função « <code translate="no">FunctionType.MINHASH</code> », e o Milvus calcula as assinaturas durante a inserção, a inserção em massa e a pesquisa. Em conjunto com « <code translate="no">MINHASH_LSH</code> », isto suporta fluxos de trabalho de deduplicação para grandes conjuntos de dados, identificação por impressão digital e deteção de plágio no interior do Milvus.</p>
<p>Para mais informações, consulte <a href="/docs/pt/minhash-function.md">Função MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>A suposição de que «uma entidade = um vetor» já não se adequa à pesquisa moderna. Os documentos longos são divididos em muitos fragmentos, os modelos de interação tardia, como o ColBERT, emitem um vetor por token e as entidades multimodais podem conter várias perspetivas.</p>
<p>O EmbList armazena uma lista de vetores de comprimento variável por entidade, utilizando o « <code translate="no">DISKANN</code> » como índice no disco. O caminho no disco mantém a utilização da RAM sob controlo quando o corpus excede os limites de memória. O EmbList + « <code translate="no">DISKANN</code> » é a primeira variante da família mais ampla do StructList nesta versão RC. O resto da família, incluindo a filtragem StructList e a aceleração multivetorial Muvera / Lemur, está previsto para o lançamento oficial da versão 3.0.</p>
<p>Para mais informações, consulte <a href="/docs/pt/search-with-embedding-lists.md">«Pesquisa com listas de incorporação</a>».</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>As cargas de trabalho de produção acumulam fragmentação de segmentos ao longo do tempo, o que provoca flutuações na latência das consultas e um aumento do espaço de armazenamento.</p>
<p>O Milvus 3.0 adiciona a capacidade de acionar explicitamente a compactação de segmentos durante janelas fora de pico, tanto no modo síncrono como no assíncrono.</p>
<p>Para mais informações, consulte <a href="/docs/pt/force-merge.md">«Compactação</a> por <a href="/docs/pt/force-merge.md">fusão forçada</a>».</p>
<h4 id="Storage-V3" class="common-anchor-header">Armazenamento V3</h4><p>O Milvus 3.0 apresenta o Armazenamento V3, um motor de armazenamento colunar baseado em manifestos, no qual os dados e os metadados residem num armazenamento de objetos compatível com S3. Cada versão do conjunto de dados é capturada como um instantâneo de manifesto imutável, um ficheiro codificado em Avro que regista quais os grupos de colunas, registos delta e estatísticas que compõem o conjunto de dados.</p>
<p>Os manifestos são ficheiros Avro compactos e os registos delta registam eliminações ao nível da entidade sem reescrever os ficheiros de dados. Isto mantém a sobrecarga de metadados reduzida à medida que os conjuntos de dados crescem. O manifesto também dissocia o acompanhamento dos metadados do percurso da consulta, permitindo que uma Coleção gere mais segmentos sem comprometer o desempenho das consultas.</p>
<p>Como os estados são armazenados no armazenamento de objetos, o conjunto de dados é autodescritivo: qualquer leitor com acesso ao caminho de armazenamento pode descobri-lo e interpretá-lo sem necessidade de um catálogo central. Esta propriedade está na base das integrações com Colecções Externas, Snapshots e futuros lagos de dados.</p>
