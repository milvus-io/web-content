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
    </button></h1><p>Descubra o que há de novo no Milvus! Esta página resume as novas funcionalidades, melhorias, problemas conhecidos e correcções de erros em cada versão. Pode encontrar as notas de lançamento para cada versão lançada após a v2.5.0 nesta secção. Sugerimos que visite regularmente esta página para se informar sobre as actualizações.</p>
<h2 id="v2514" class="common-anchor-header">v2.5.14<button data-href="#v2514" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 2 de julho de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do SDK do Python</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.14</td><td>2.5.12</td><td>2.5.11</td><td>2.5.10</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o Milvus 2.5.14! Esta versão oferece uma série de melhorias de desempenho e estabilidade, incluindo um pool de cache de pedaços separado, auto-indexação para campos JSON e cache local para estatísticas de segmento BM25. Esta versão também resolve vários bugs críticos, como uma explosão de thread no observador de arquivos e possíveis panics no QueryCoord, para garantir um sistema mais robusto e confiável. Recomendamos que actualize para a versão 2.5.14 para beneficiar destas últimas actualizações!</p>
<h3 id="Dependency-upgrade" class="common-anchor-header">Atualização de dependências</h3><ul>
<li>Atualização do Minio para RELEASE.2024-05-28T17-19-04Z para corrigir alguns CVEs<a href="https://github.com/milvus-io/milvus/pull/43063">(#43063</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Adicionado um pool de cache de pedaços separado<a href="https://github.com/milvus-io/milvus/pull/42901">(#42901</a>).</li>
<li>Adicionado suporte para <code translate="no">AUTOINDEX</code> em campos JSON<a href="https://github.com/milvus-io/milvus/pull/42161">(#42161</a>).</li>
<li>Usado o nome em inglês como identificadores de idioma para todos os tipos de idioma<a href="https://github.com/milvus-io/milvus/pull/42601">(#42601</a>).</li>
<li>Activada a execução de um analisador por um campo de coleção<a href="https://github.com/milvus-io/milvus/pull/42812">(#42812</a>).</li>
<li>Actualizada a versão do Knowhere<a href="https://github.com/milvus-io/milvus/pull/42939">(#42939</a>).</li>
<li>Adicionada uma interface de tamanho ao leitor de ficheiros para eliminar as chamadas <code translate="no">statobject</code> durante as leituras<a href="https://github.com/milvus-io/milvus/pull/42911">(#42911</a>).</li>
<li>Introduzida uma cache local para as estatísticas do segmento BM25<a href="https://github.com/milvus-io/milvus/pull/42924">(#42924</a>, <a href="https://github.com/milvus-io/milvus/pull/42646">#42646</a>).</li>
<li>Preenchido em <code translate="no">dbname</code> para <code translate="no">operateprivilegev2request</code> no intercetor<a href="https://github.com/milvus-io/milvus/pull/42904">(#42904</a>).</li>
<li>Evitou a modificação de metadados de campo ao renomear uma coleção ou base de dados<a href="https://github.com/milvus-io/milvus/pull/42876">(#42876</a>).</li>
<li>Tornou o Web UI alternável através da configuração<a href="https://github.com/milvus-io/milvus/pull/42815">(#42815</a>).</li>
<li>Evitou a utilização do pool de threads quando uma coluna está pronta na cache de pedaços<a href="https://github.com/milvus-io/milvus/pull/42804">(#42804</a>).</li>
<li>Ativado o coletor Tantivy para definir o bitset diretamente<a href="https://github.com/milvus-io/milvus/pull/39748">(#39748</a>, <a href="https://github.com/milvus-io/milvus/pull/42881">#42881</a>).</li>
<li>Substituídas chaves de mapa baseadas em ponteiros por IDs no coletor de lixo<a href="https://github.com/milvus-io/milvus/pull/42654">(#42654</a>).</li>
<li>Optimizado o uso de memória durante a recolha de lixo<a href="https://github.com/milvus-io/milvus/pull/42631">(#42631</a>).</li>
<li>Adicionado suporte para impressão de NQ e parâmetros para pesquisa e consulta de registos<a href="https://github.com/milvus-io/milvus/pull/42545">(#42545</a>).</li>
<li>Manipulados valores nullable e default corretamente durante a inserção em massa<a href="https://github.com/milvus-io/milvus/pull/42072">(#42072</a>).</li>
<li>Definidos os nomes das threads para o pool de threads do Segcore<a href="https://github.com/milvus-io/milvus/pull/42596">(#42596</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Pré-alocados IDs suficientes durante a importação de dados para evitar falhas<a href="https://github.com/milvus-io/milvus/pull/42935">(#42935</a>).</li>
<li>Atualizado o Tantivy para corrigir uma explosão de thread no observador de ficheiros<a href="https://github.com/milvus-io/milvus/pull/42828">(#42828</a>, <a href="https://github.com/milvus-io/milvus/pull/42713">#42713</a>).</li>
<li>Corrigido um problema em que os dados filtrados se tornavam invisíveis sob TTL<a href="https://github.com/milvus-io/milvus/pull/42944">(#42944</a>).</li>
<li>Removidos os resultados da expressão nula em cache para evitar filtragem incorrecta<a href="https://github.com/milvus-io/milvus/pull/42783">(#42783</a>).</li>
<li>Rejeitada a divisão ou o módulo por zero em expressões aritméticas binárias<a href="https://github.com/milvus-io/milvus/pull/42887">(#42887</a>).</li>
<li>Assegurado que o gráfico de fluxo liberta os recursos da função depois de todos os nós serem fechados<a href="https://github.com/milvus-io/milvus/pull/42775">(#42775</a>).</li>
<li>Corrigido um problema em que o DataCoord podia ficar preso durante uma atualização da v2.5 para a v2.6<a href="https://github.com/milvus-io/milvus/pull/42669">(#42669</a>).</li>
<li>Adicionada uma pré-verificação para evitar a conversão de tipos de dados não suportados<a href="https://github.com/milvus-io/milvus/pull/42678">(#42678</a>).</li>
<li>Adicionada proteção de concorrência e fecho para a função BM25<a href="https://github.com/milvus-io/milvus/pull/42599">(#42599</a>).</li>
<li>Filtrados os nós de consulta de fluxo do grupo de recursos durante as actualizações<a href="https://github.com/milvus-io/milvus/pull/42594">(#42594</a>).</li>
<li>Corrigido um problema com <code translate="no">is_not_in</code> expressões para o índice Trie<a href="https://github.com/milvus-io/milvus/pull/42886">(#42886</a>).</li>
<li>Corrigido um problema que impedia o Rocksmq de parar graciosamente<a href="https://github.com/milvus-io/milvus/pull/42843">(#42843</a>).</li>
<li>Correção da otimização de poda para <code translate="no">OR</code> expressões lógicas para podar apenas se os nós filhos forem podáveis<a href="https://github.com/milvus-io/milvus/pull/42915">(#42915</a>).</li>
<li>Corrigido um pânico QueryCoord causado pelo controlador que não esperava que o verificador terminasse<a href="https://github.com/milvus-io/milvus/pull/42726">(#42726</a>).</li>
<li>Corrigido um problema em que pequenos segmentos perdiam tarefas de ordenação de chave primária devido a estarem incorretamente marcados como indexados<a href="https://github.com/milvus-io/milvus/pull/42615">(#42615</a>).</li>
<li>Reduzida a simultaneidade total da tarefa DataNode no modo Autónomo para evitar erros OOM<a href="https://github.com/milvus-io/milvus/pull/42809">(#42809</a>).</li>
<li>Forneceu erros explícitos para operações aritméticas em tipos não suportados<a href="https://github.com/milvus-io/milvus/pull/42890">(#42890</a>).</li>
</ul>
<h2 id="v2513" class="common-anchor-header">v2.5.13<button data-href="#v2513" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 10 de junho de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.13</td><td>2.5.11</td><td>2.5.10</td><td>2.5.10</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o Milvus 2.5.13! Esta versão melhora a sua experiência com novas funcionalidades, tais como a capacidade de eliminar propriedades de campo e utilizar uma função <code translate="no">cast</code> para índices JSON. Também oferece uma série de melhorias gerais de desempenho e estabilidade, ao mesmo tempo que resolve vários erros para garantir um sistema mais robusto. Encorajamo-lo a atualizar para a versão 2.5.13 e a explorar estas últimas actualizações!</p>
<h3 id="Features" class="common-anchor-header">Funcionalidades</h3><ul>
<li>Adicionado suporte para eliminar propriedades de um campo<a href="https://github.com/milvus-io/milvus/pull/41954">(#41954</a>).</li>
<li>Adicionada uma função <code translate="no">cast</code> para utilização com índices JSON<a href="https://github.com/milvus-io/milvus/pull/42504">(#42504</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Aumentado o tamanho padrão do buffer de importação<a href="https://github.com/milvus-io/milvus/pull/42542">(#42542</a>).</li>
<li>Acelerado o processo de construção do expedidor<a href="https://github.com/milvus-io/milvus/pull/42544">(#42544</a>).</li>
<li>Removidas as restrições de equilíbrio entre as tarefas de canal e segmento<a href="https://github.com/milvus-io/milvus/pull/42410">(#42410</a>).</li>
<li>Definida a imagem GPU CAGRA como padrão<a href="https://github.com/milvus-io/milvus/pull/42193">(#42193</a>).</li>
<li>A API <code translate="no">DescribeIndex</code> RESTful suporta agora o retorno de parâmetros de índice<a href="https://github.com/milvus-io/milvus/pull/42080">(#42080</a>).</li>
<li>Activada a execução de um analisador por um campo da coleção para evitar a criação e destruição frequente do analisador<a href="https://github.com/milvus-io/milvus/pull/42119">(#42119</a>).</li>
<li>Adicionado suporte para balanceamento de múltiplas colecções num único trigger<a href="https://github.com/milvus-io/milvus/pull/42134">(#42134</a>).</li>
<li>Agora considera <code translate="no">nq</code> (número de consultas) ao identificar consultas lentas<a href="https://github.com/milvus-io/milvus/pull/42125">(#42125</a>).</li>
<li>O lado do servidor agora preenche automaticamente campos nulos ausentes<a href="https://github.com/milvus-io/milvus/pull/42120">(#42120</a>).</li>
<li>Adicionado suporte para filtragem de dados expirados usando TTL<a href="https://github.com/milvus-io/milvus/pull/41960">(#41960</a>, <a href="https://github.com/milvus-io/milvus/pull/42121">#42121</a>, <a href="https://github.com/milvus-io/milvus/pull/42103">#42103</a>).</li>
<li>Compactação de expiração refinada para recuperar espaço de um pequeno número de eliminações mais antigas<a href="https://github.com/milvus-io/milvus/pull/42052">(#42052</a>).</li>
<li>Os registos de acesso suportam agora a obtenção de expressões e campos de pesquisa híbridos<a href="https://github.com/milvus-io/milvus/pull/41921">(#41921</a>).</li>
<li>Adicionada semântica de movimento explícito à interface <code translate="no">get_batch_view</code> <a href="https://github.com/milvus-io/milvus/pull/42402">(#42402</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigida uma fuga no pipeline/delegador<a href="https://github.com/milvus-io/milvus/pull/42583">(#42583</a>).</li>
<li>Corrigida a lógica de seleção do delegador ao libertar um segmento para evitar um potencial pânico MixCoord<a href="https://github.com/milvus-io/milvus/pull/42572">(#42572</a>).</li>
<li>Corrigido um erro que poderia causar corrupção de escrita de dados durante a validação<a href="https://github.com/milvus-io/milvus/pull/42555">(#42555</a>).</li>
<li>Adicionada uma verificação para garantir que o tipo de elenco é uma matriz para expressões JSON <code translate="no">contains</code> <a href="https://github.com/milvus-io/milvus/pull/42185">(#42185</a>).</li>
<li>Corrigido um problema com auto-IDs duplicados entre operações de importação e inserção<a href="https://github.com/milvus-io/milvus/pull/42520">(#42520</a>).</li>
<li>Assegurado que as tarefas de estatísticas de segmentos de importação são acionadas apenas pelo <code translate="no">import_checker</code> <a href="https://github.com/milvus-io/milvus/pull/42487">(#42487</a>).</li>
<li>Corrigido um erro com <code translate="no">is null</code> para o índice Marisa<a href="https://github.com/milvus-io/milvus/pull/42421">(#42421</a>).</li>
<li>Assegurado que as tarefas de estatísticas são apenas despoletadas para segmentos descarregados<a href="https://github.com/milvus-io/milvus/pull/42425">(#42425</a>).</li>
<li>Repor o estado da compactação quando as estatísticas do segmento são terminadas<a href="https://github.com/milvus-io/milvus/pull/42005">(#42005</a>).</li>
<li>Actualizada a versão Tantivy para corrigir um stemmer panic<a href="https://github.com/milvus-io/milvus/pull/42172">(#42172</a>).</li>
<li>Corrigido um problema em que os campos de saída do vetor não podiam ser recuperados quando se usava um novo índice provisório<a href="https://github.com/milvus-io/milvus/pull/42183">(#42183</a>).</li>
<li>Evitado confiar no Knowhere para controlo de threads ao chamar o iterador Knowhere<a href="https://github.com/milvus-io/milvus/pull/42133">(#42133</a>).</li>
<li>Corrigido um problema em que os segmentos podiam ser libertados prematuramente durante uma operação de canal de equilíbrio<a href="https://github.com/milvus-io/milvus/pull/42043">(#42043</a>).</li>
<li>A interface <code translate="no">DescribeIndex</code> RESTful inclui agora um carimbo de data/hora<a href="https://github.com/milvus-io/milvus/pull/42105">(#42105</a>).</li>
<li>Usado o bloqueio para garantir a atomicidade da queda de índices de segmentos<a href="https://github.com/milvus-io/milvus/pull/42076">(#42076</a>).</li>
<li>Corrigido um proxy panic no gestor de clientes shard<a href="https://github.com/milvus-io/milvus/pull/42026">(#42026</a>).</li>
<li>Corrigida a lógica de atribuição de slots de importação<a href="https://github.com/milvus-io/milvus/pull/41982">(#41982</a>).</li>
<li>Corrigido um erro onde o ponto de tempo para compactação de expiração forçada falhava em reiniciar<a href="https://github.com/milvus-io/milvus/pull/42000">(#42000</a>).</li>
</ul>
<h2 id="v2512" class="common-anchor-header">v2.5.12<button data-href="#v2512" class="anchor-icon" translate="no">
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
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.12</td><td>2.5.10</td><td>2.5.9</td><td>2.5.9</td></tr>
</tbody>
</table>
<p>Temos o prazer de lhe apresentar o Milvus 2.5.12! Esta versão introduz novas capacidades, como o suporte de índice JSON para expressões <code translate="no">contains</code>, juntamente com várias melhorias, incluindo respostas actualizadas da API <code translate="no">DescribeCollection</code> e compactação de expiração de dados mais rigorosa. Esta versão também incorpora importantes actualizações de dependências para corrigir CVEs e numerosas correcções de erros para melhorar a estabilidade e o desempenho. Encorajamo-lo a atualizar para o Milvus 2.5.12 para beneficiar destas últimas melhorias e correcções!</p>
<h3 id="Features" class="common-anchor-header">Caraterísticas</h3><ul>
<li>Adicionado suporte a índice JSON para JSON <code translate="no">contains</code> expr<a href="https://github.com/milvus-io/milvus/pull/41658">(#41658</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>A API <code translate="no">DescribeCollection</code> inclui agora o carimbo de data/hora da atualização nos seus resultados<a href="https://github.com/milvus-io/milvus/pull/41600">(#41600</a>).</li>
<li>A interface <code translate="no">DescribeIndex</code> agora fornece informações sobre a versão do índice<a href="https://github.com/milvus-io/milvus/pull/41841">(#41841</a>).</li>
<li>Adicionado suporte para compactação de expiração mais rigorosa para limpar dados eliminados sem necessariamente esperar por um grande número de eliminações<a href="https://github.com/milvus-io/milvus/pull/41856">(#41856</a>).</li>
<li>Versões de dependência aumentadas para endereçar CVEs<a href="https://github.com/milvus-io/milvus/pull/41590">(#41590</a>, <a href="https://github.com/milvus-io/milvus/pull/41878">#41878</a>, <a href="https://github.com/milvus-io/milvus/pull/41742">#41742</a>, <a href="https://github.com/milvus-io/milvus/pull/41697">#41697</a>).</li>
<li>Adicionadas verificações de autorização para as tarefas <code translate="no">DescribeCollection</code> e <code translate="no">DescribeDatabase</code> <a href="https://github.com/milvus-io/milvus/pull/41799">(#41799</a>).</li>
<li>A API RESTful suporta agora níveis de consistência para operações de consulta/obtenção<a href="https://github.com/milvus-io/milvus/pull/41830">(#41830</a>).</li>
<li>Adicionado suporte para alterar descrições de colecções<a href="https://github.com/milvus-io/milvus/pull/41547">(#41547</a>).</li>
<li>O CDC suporta agora a sincronização de múltiplas APIs DDL<a href="https://github.com/milvus-io/milvus/pull/41594">(#41594</a>, <a href="https://github.com/milvus-io/milvus/pull/41679">#41679</a>).</li>
<li>Adicionado um tempo limite para a receção de mensagens em <code translate="no">MQMsgStream</code> <a href="https://github.com/milvus-io/milvus/pull/41603">(#41603</a>).</li>
<li>Verificações de quota de disco são agora ignoradas para importações L0<a href="https://github.com/milvus-io/milvus/pull/41572">(#41572</a>).</li>
<li>Adicionados parâmetros para ignorar excepções de tipo de configuração<a href="https://github.com/milvus-io/milvus/pull/41773">(#41773</a>).</li>
<li>Definido worker <code translate="no">totalSlot</code> em modo standalone para metade do que em modo cluster<a href="https://github.com/milvus-io/milvus/pull/41731">(#41731</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigida uma fuga de goroutine em <code translate="no">ants.pool</code> <a href="https://github.com/milvus-io/milvus/pull/41893">(#41893</a>).</li>
<li>Foi corrigido um problema em que o nome do analisador não era definido em sub-solicitações de pesquisa híbrida<a href="https://github.com/milvus-io/milvus/pull/41897">(#41897</a>).</li>
<li>Corrigido um problema de atribuição dupla em <code translate="no">ChannelManager</code> <a href="https://github.com/milvus-io/milvus/pull/41877">(#41877</a>).</li>
<li>Foi corrigido um problema em que as definições de nível de registo eram ineficazes em <code translate="no">ThreadWatcher</code> <a href="https://github.com/milvus-io/milvus/pull/41887">(#41887</a>).</li>
<li>Impedida a criação de índices para segmentos de importação não ordenados quando as estatísticas estão activadas<a href="https://github.com/milvus-io/milvus/pull/41865">(#41865</a>).</li>
<li>Corrigida uma fuga de goroutine no leitor de importação<a href="https://github.com/milvus-io/milvus/pull/41870">(#41870</a>).</li>
<li>Corrigida uma fuga de memória do analisador causada pelo corredor da função não estar fechado<a href="https://github.com/milvus-io/milvus/pull/41840">(#41840</a>).</li>
<li>Corrigido um problema em que as contagens eram recolhidas agrupadas por partição em vez de recolha<a href="https://github.com/milvus-io/milvus/pull/41789">(#41789</a>).</li>
<li>Corrigido um problema com palavras-passe inesperadas para o utilizador root<a href="https://github.com/milvus-io/milvus/pull/41818">(#41818</a>).</li>
<li>Evitaram-se crashes quando <code translate="no">contains_all</code> ou <code translate="no">contains_any</code> é usado com um array vazio<a href="https://github.com/milvus-io/milvus/pull/41756">(#41756</a>).</li>
<li>Corrigidos problemas de compilação no Windows<a href="https://github.com/milvus-io/milvus/pull/41617">(#41617</a>).</li>
<li>Desativado o perfil de blocos e mutex na arquitetura ARM para prevenir erros SIGSEGV<a href="https://github.com/milvus-io/milvus/pull/41823">(#41823</a>).</li>
<li>Corrigido um erro <code translate="no">no candidate segments</code> para pequenas tarefas de importação<a href="https://github.com/milvus-io/milvus/pull/41772">(#41772</a>).</li>
<li>Assegurado o fallback para a sessão <code translate="no">MixCoord</code> quando atualizado para <code translate="no">MixCoord</code> <a href="https://github.com/milvus-io/milvus/pull/41773">(#41773</a>).</li>
<li><code translate="no">GetValueFromConfig</code> agora devolve <code translate="no">nullopt</code> em vez de lançar uma exceção<a href="https://github.com/milvus-io/milvus/pull/41711">(#41711</a>).</li>
<li>Adicionado um mutex de bloqueio exclusivo em <code translate="no">DropSegmentsOfPartition</code> para evitar potenciais falhas com DDL concorrente em partições<a href="https://github.com/milvus-io/milvus/pull/41619">(#41619</a>).</li>
</ul>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.5.11! Esta versão introduz novas e poderosas funcionalidades como a capacidade de multi-analisador e suporte alargado a tokenizadores (Jieba, Lindera, ICU, Language Identifier). Também fizemos várias melhorias, incluindo atualizações dinâmicas do pool de threads de carregamento de segmentos e filtragem de exclusão otimizada durante as importações de binlogs. As principais correções de erros abordam possíveis problemas de queda de segmento, falhas de pesquisa BM25 e erros de filtragem de estatísticas JSON.</p>
<p>Recomendamos que atualize para a versão 2.5.11 para aproveitar essas melhorias e correções!</p>
<h3 id="Features" class="common-anchor-header">Recursos</h3><ul>
<li>Adicionada a capacidade de configurar vários analisadores (tokenizadores) para suporte a vários idiomas e selecionar o apropriado com base na instrução dos dados de entrada<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>Melhoria da funcionalidade do analisador BM25<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>Introduziu uma API <code translate="no">run_analyzer</code> para execuções secas para ajudar a analisar os resultados da tokenização. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/analyzer-overview.md">Visão geral do analisador</a>.</li>
<li>Tokenizadores<ul>
<li>Adicionado suporte para personalizar os parâmetros do tokenizador Jieba.</li>
<li>Adicionado suporte para o tokenizador Lindera. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/lindera-tokenizer.md">Lindera</a>.</li>
<li>Adicionado suporte para o tokenizador ICU. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/icu-tokenizer.md">ICU</a>.</li>
<li>Adicionado um tokenizador de identificador de idioma para deteção de idioma.</li>
</ul></li>
<li>Filtros<ul>
<li>Suporte de idioma expandido para o filtro de palavras de parada incorporado. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/stop-filter.md">Parar</a>.</li>
<li>Adicionado um filtro <code translate="no">remove_punct</code> para remover sinais de pontuação. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/removepunct-filter.md">Remover pontuação</a>.</li>
<li>Adicionado um filtro <code translate="no">regex</code> para filtragem de texto baseada em padrões. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/regex-filter.md">Regex</a>.</li>
</ul></li>
</ul></li>
<li>Adicionado suporte para modificar a capacidade máxima dos campos de matriz<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>Adicionado suporte para expressões de intervalo binário em índices de caminho JSON<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>Adicionado suporte para tipos de correspondência infixa e sufixa em estatísticas JSON<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Activadas actualizações dinâmicas para o tamanho do conjunto de threads de carregamento de segmentos<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>).</li>
<li>Filtragem de eliminação acelerada durante a importação do binlog<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>).</li>
<li>Adicionados parâmetros de monitorização para o rácio do filtro de expressão<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>Adicionada uma opção de configuração para forçar a reconstrução de índices para a versão mais recente<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>Melhorada a mensagem de registo de erros para a política de lista<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>Manuseamento adaptado para hífenes nos cabeçalhos de metadados gRPC<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>Atualização da versão Go para 1.24.1 para resolver CVEs<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correções de erros</h3><ul>
<li>Corrigido um problema em que os segmentos poderiam não ser descartados corretamente ao descartar uma partição<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>Corrigida a inserção em massa para utilizar a lista de campos de entrada do executor da função em vez da lista de campos do esquema<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>).</li>
<li>Corrigidas as falhas de pesquisa BM25 que ocorriam quando <code translate="no">avgdl</code> (comprimento médio do documento) era NaN<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>Correção de etiquetas imprecisas nas métricas QueryNode<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>Foi corrigido um problema em que a criação do índice de estatísticas JSON podia falhar se os dados contivessem um mapa vazio<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>Corrigida a API <code translate="no">AlterCollection</code> para guardar corretamente o carimbo de data/hora de modificação<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li>Corrigido um erro de filtragem intermitente nas estatísticas JSON em <code translate="no">ConjunctExpr</code> e melhorada a lógica de cálculo da ranhura da tarefa para acelerar a criação de estatísticas JSON<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>).</li>
<li>Corrigida uma fuga de oráculo IDF no cálculo de estatísticas BM25<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>Assegurado que os tópicos pré-criados são verificados primeiro durante a validação do número de shard<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>).</li>
<li>Corrigido um relatório de deadlock erróneo que ocorria nos testes unitários<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 21 de abril de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.10 oferece melhor desempenho de pesquisa e carregamento, relatórios de métricas aprimorados e suporte SVE expandido para computação métrica acelerada. Esta versão também inclui várias correcções de erros que aumentam a estabilidade e a correção. Encorajamo-lo a atualizar ou a experimentar - o seu feedback é inestimável para nos ajudar a tornar o Milvus ainda melhor!</p>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Ignorar o relatório de métricas de índice para índices inexistentes<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>Usa o modo de varrimento para LIKE mesmo quando existe um índice invertido<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>Otimizar o desempenho para expressões LIKE<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)</li>
<li>Otimizar o formato do índice para um melhor desempenho de carregamento<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful: tornar configurável o tempo limite predefinido<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)</li>
<li>Ativar o suporte SVE para o cálculo da métrica L2 nas funções FP16 / NY<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Correção do índice JSON que não funciona para filtros de cadeia<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>Saltar a verificação de dimensão para campos não vectoriais na pré-verificação<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>Alterar coleção actualiza agora o esquema corretamente<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>Atualizar a versão do knowhere para corrigir a compilação do macOS<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>Evitar o pânico ao listar índices antes da inicialização do índice de segmento estar concluída<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>Resolver a regressão de desempenho ao alterar um nível de registo<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>Fechar o cliente antes de remover o cliente trabalhador<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 11 de abril de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o Milvus 2.5.9, que traz um desempenho melhorado para estatísticas de chaves JSON, capacidades de indexação melhoradas e várias correcções de erros críticos que reforçam a estabilidade e o tratamento de dados. Encorajamo-lo a atualizar ou a experimentar esta versão e, como sempre, o seu feedback é muito apreciado à medida que continuamos a aperfeiçoar o Milvus.</p>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Suporte para ignorar a normalização de pontuação para o reranker ponderado<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>Melhorar o desempenho da construção de estatísticas chave JSON ao adicionar documentos em lotes<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>Utilizar <code translate="no">int32</code> ao criar índices de matriz para tipos de elementos <code translate="no">int8</code>/<code translate="no">int16</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>Alinhar os resultados da pesquisa de força bruta com o comportamento do índice JSON para a expressão <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Foi corrigido um problema que causava confusão no traceID se o cliente enviasse um traceID<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>Corrigida uma potencial falha devido à utilização incorrecta de <code translate="no">noexcept</code>, levando a falhas de IO<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>Resolvido um ciclo de balanço normal infinito acionado após a suspensão do balanço<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>Mostrar colecções agora suporta objectos concedidos a grupos de privilégios personalizados<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>Corrigida uma falha na recuperação de posições de canais replicados<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>Corrigido um potencial vazamento de thread causado por timeouts RESTful<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>Adicionado um mapa de bits claro para o modo de salto de lote<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>Corrigido um problema em que a remoção de um tipo de índice falhava no armazenamento remoto em modo local<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>Utilizar <code translate="no">element_type</code> para o array <code translate="no">isNull</code> operadores<a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>Removida a reposição de métricas para garantir relatórios exactos<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>Corrigido um erro que impedia os dados <code translate="no">null</code> de serem filtrados por expressões <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>Ignorados segmentos crescentes sem posição inicial para a política de selagem<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>Evitada a atualização dos pedidos de pesquisa/consulta originais durante novas tentativas<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>Corrigida uma falha de segmentação se <code translate="no">LoadArrowReaderFromRemote</code> for executado num caminho de exceção<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>Resolvidos os problemas de balanço manual e verificação de balanço<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>O esquema validado não é <code translate="no">nil</code> para estatísticas JSON com <code translate="no">DescribeCollection</code> preguiçoso<a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>Resolvido um erro de movimento do cursor ao comparar duas colunas<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>Resolvida uma falha ao inserir tanto <code translate="no">null</code> como arrays não-nulos com mmap crescente aberto<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>Corrigido um problema de compilação arm64<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>Adicionado um modo de bypass thread pool para evitar o bloqueio de operações de inserção/carregamento por índices crescentes<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>Corrigidos erros de formato JSON<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>Corrigido um erro 404 na WebUI quando <code translate="no">http.enablepprof</code> é falso<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 1 de abril de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.5.8, com melhorias nas expressões JSON, validação UTF-8, uso de memória e lógica de balanceamento. Esta versão também inclui várias correcções de erros importantes para melhorar a concorrência e o tratamento de dados. Encorajamo-lo a atualizar ou a experimentar e, como sempre, o seu feedback ajuda-nos a aperfeiçoar continuamente o Milvus!</p>
<h3 id="Features" class="common-anchor-header">Caraterísticas</h3><ul>
<li>Suporte a expressões JSON <code translate="no">null</code>/<code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>Suporte à análise de vectores esparsos de estruturas Parquet em inserções em massa<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Equilibra a coleção com a maior contagem de linhas primeiro<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>Suporte para validação de strings UTF-8 durante a importação<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>Adicionar validação UTF-8 para todos os campos VARCHAR<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>Evitar nova consulta se a pesquisa híbrida apenas solicitar o PK como campo de saída<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>Aperfeiçoar as vistas de matriz para otimizar a utilização da memória<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>Adicionar uma configuração de intervalo de acionamento para o equilíbrio automático<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)</li>
<li>Converter múltiplas expressões OR para expressão IN<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>Suporte para critérios de compactação manual detalhados<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>Retenção de tokens em bruto para registo de auditoria<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>Otimizar a utilização do meta mutex do DataCoord<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li>Introduzir subscrições em lote em <code translate="no">MsgDispatcher</code> <a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigida uma falha envolvendo entrada anulável e tipos de dados mmap crescentes<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>Corrigida a potencial perda de dados em operações de eliminação causadas por IDs de binlogs duplicados<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>Adicionados bloqueios de índice de campo para <code translate="no">GetSegmentsIndexStates</code> para evitar potenciais pânicos na inserção durante a criação de colecções<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>Corrigidos problemas de concorrência no registo do consumidor Rocksmq<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>Recuperação de todos os registos delta filhos para carregamento de segmentos<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>Correção de resultados errados causados pela utilização do índice JSON quando <code translate="no">iterative_filter</code> é especificado<a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>Assegurada uma maior prioridade para a operação <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>Correção do <code translate="no">WithGroupSize</code> durante a redução<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>Aumentado o número de slots proporcionalmente à medida que o tamanho do segmento cresce<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>Definido o tempo de fila da tarefa antes de a colocar em fila<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>Corrigido o desequilíbrio de canais nos DataNodes<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>Definidas as configurações padrão corretas para os slots de tarefas<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK: Definido sinalizadores anuláveis de acordo com FieldSchema para inserção baseada em linha<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 21 de março de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.5.7, com destaque para o recém-introduzido recurso JSON Path Index. Isto permite-lhe criar índices invertidos em colunas dinâmicas ou JSON para melhorar significativamente o desempenho das consultas. Juntamente com esta nova funcionalidade, fizemos inúmeras melhorias e correcções de erros para uma maior fiabilidade, um tratamento de erros mais refinado e uma melhor usabilidade. Encorajamo-lo a atualizar ou a experimentar e, como sempre, o seu feedback é muito apreciado à medida que continuamos a melhorar o Milvus!</p>
<h3 id="Features" class="common-anchor-header">Caraterísticas</h3><ul>
<li><strong>Índice de caminho JSON</strong>: Para atender às necessidades dos usuários de esquemas dinâmicos, o Milvus 2.5.7 introduz a capacidade de construir índices em colunas dinâmicas e colunas JSON. Com esta funcionalidade, é possível criar índices invertidos para colunas dinâmicas específicas ou caminhos JSON, contornando efetivamente o processo de carregamento JSON mais lento e melhorando consideravelmente o desempenho da consulta. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/use-json-fields.md">Campo JSON</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Reordenar subexpressões para expressões conjuntas<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>Adicionar mais opções de configuração para <code translate="no">interimindex</code> para suportar modos refinados<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>Utilizar métricas de contador corretas para cálculos globais de WA<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>Tornar a configuração de poda de segmento atualizável<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>Adicionar uma política de selagem de canais baseada no bloqueio de L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>Refinar metadados de tarefas com bloqueio de nível de chave<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>Remover etiquetas de coleção e partição desnecessárias das métricas<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>Melhorar as mensagens de erro de importação<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li>Evitar a conversão de fatias de bytes do corpo para strings em <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>Registar a posição inicial das mensagens de eliminação<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>Suporta a recuperação de binlogs de segmentos com a nova interface <code translate="no">GetSegmentsInfo</code> <a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Utilizar <code translate="no">newInsertDataWithFunctionOutputField</code> quando importar ficheiros binlog<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>Corrigido um problema em que as propriedades mmap não se aplicavam quando se criava uma coleção<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>Não apagar o ficheiro centroids quando a amostragem falha; em vez disso, esperar pelo GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>Corrigido o problema de perda de mensagens durante a procura<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>Removidos os alvos de atraso após o expedidor principal<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>Adicionada entrada de bitmap limpa para cada loop de lote<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>Protegido <code translate="no">GetSegmentIndexes</code> com um RLock<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>Evitadas falhas de segmentação causadas pela recuperação de conjuntos de dados vectoriais vazios<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>Corrigido o filtro "not-equal" do índice JSON<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>Corrigido o carregamento de offset nulo no índice invertido<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>Corrigida a lógica de limpeza de lixo de <code translate="no">jsonKey</code> stats e melhorado o filtro JSON key stats<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>Apanhados erros de ponteiro JSON inválido<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>O privilégio estrela RBAC agora retorna vazio ao listar políticas<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>Evitado o pânico quando um campo não existe no esquema no QueryNode<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>Corrigido um problema de coleção de referência para pesquisa/consulta<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>Manuseamento de linhas vazias para vectores esparsos<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>Adicionada uma verificação de parâmetro de tipo/índice duplicado ao criar colecções<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>Movido <code translate="no">metaHeader</code> para o cliente para evitar corridas de dados<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 10 de março de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.5.6, que apresenta melhorias valiosas para toolchains, logging, métricas e manipulação de array, bem como várias correções de bugs para maior confiabilidade e desempenho. Esta atualização inclui um tratamento refinado da concorrência, tarefas de compactação mais robustas e outras melhorias importantes. Encorajamo-lo a atualizar ou a experimentar e, como sempre, agradecemos o seu feedback para nos ajudar a melhorar continuamente o Milvus!</p>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Atualização da cadeia de ferramentas Go para 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Atualização da versão Rust para 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Atualização da versão Etcd para 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>Verificar apenas o tipo de elemento para arrays não nulos<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>Remover os registos de depuração no manipulador do grupo de recursos (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>Melhorar o registo para o resolvedor gRPC<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>Adicionar mais métricas para componentes CGO assíncronos<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>Limpar a cache de localização dos fragmentos depois de uma coleção ser lançada<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigida a corrupção de array causada por ignorar a validade<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>Foi corrigido um problema em que as expressões <code translate="no">null</code> não funcionavam para campos JSON<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>Corrigido um problema que armazenava o offset errado ao construir Tantivy com um campo anulável<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>Saltava a execução de estatísticas para segmentos zero<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>Corrigida a estimativa de tamanho de memória para arrays<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>Passado um ponteiro knapsack para evitar múltiplas compactações<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>Corrigido um problema de falha com a inserção em massa<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>Preveniu fugas no fluxo de mensagens ao terminar corretamente o expedidor principal<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>Corrigidos problemas de concorrência para <code translate="no">null</code> offsets<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>Corrigida a análise do <code translate="no">import end ts</code> <a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>Melhorado o tratamento de erros e testes unitários para a função <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>Adicionada uma verificação de parâmetro duplicado para <code translate="no">CreateIndex</code> <a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>Resolvido um problema que impedia as tarefas de compactação quando o tamanho excedia o limite máximo<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>Corrigido o consumo duplicado do fluxo para segmentos invisíveis<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>Alterada a variável CMake para mudar para <code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>Corrigido um problema em que a eliminação de propriedades de BD via RESTful falhava<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>Utilizado um tipo de mensagem diferente para a API <code translate="no">OperatePrivilegeV2</code> <a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>Corrigida uma corrida de dados na cache delta de tarefas<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>Resolvida uma fuga na cache delta de tarefas causada por IDs de tarefas duplicados<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 26 de fevereiro de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.5 traz melhorias significativas no número de colecções e partições que um único cluster pode suportar. Agora é totalmente viável executar o Milvus com 10K coleções e 100K partições. Esta versão também resolve vários bugs críticos, incluindo estatísticas de correspondência em falta e um problema de deadlock em consultas multi-stage. Além disso, inclui várias melhorias de observabilidade e segurança. Recomendamos vivamente que todos os utilizadores que estejam a executar o Milvus 2.5.x façam a atualização o mais rapidamente possível.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Atualização de dependências</h3><p>Atualizado para ETCD 3.5.18 para corrigir vários CVEs.</p>
<ul>
<li>[2.5] Atualização do raft para cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] Versão actualizada do Knowhere<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Bugs Críticos</h3><ul>
<li>[2.5] Usado o prefixo <code translate="no">text_log</code> para o ficheiro textmatchindex null offset<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] Adicionado pool de sub-tarefas para tarefas multi-estágio para evitar deadlock<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>[2.5] Corrigido o deadlock do agendador de tarefas<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] Corrigida a condição de corrida que causava a criação de múltiplos índices idênticos<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] Corrigido o problema onde as colecções com nomes duplicados podiam ser criadas<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>Corrigida a falha de pesquisa da expressão nula<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] Corrigido o erro onde a correspondência de prefixo falhava quando os wildcards estavam no prefixo<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>Cancelamento de subcontextos em cascata quando o pedido HTTP expirava<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] Corrigida a fuga de cache delta de tarefa na tarefa reduzir<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] Corrigido querycoord panic em caso de canto<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] Função isbalanced melhorada para contar corretamente os pares de citações<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] Corrigido -1 negativo executando tarefas de compactação<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] Corrigido o erro onde um segmento pode nunca ser transferido de selado para descarga<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>Saltava a criação de índice de chave primária ao carregar o índice pk<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] Saltava a criação do índice de texto quando o segmento era zero após a ordenação<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] Corrigida a falha em procurar a posição mais antiga<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>Ignorada a opção de crescimento perdida no hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] Corrigido altercollection incapaz de modificar o nível de consistência<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>Corrigida a falha de importação devido à contagem de 0 linhas<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] Corrigido o resultado errado do módulo para o tipo longo<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] Adicionado e utilizado o contexto de tempo de vida para o acionamento da compactação<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] Verificada a libertação da coleção antes da verificação do alvo<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Corrigida a falha de paragem graciosa do Rootcoord e recurso limitado do CI<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] Removido o campo de carga &amp; verificação do tamanho da coluna do esquema<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Removido o parâmetro mmap.enable no parâmetro type ao criar o índice<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] Não passava o nome do índice ao eliminar propriedades<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] Os segmentos devolviam tanto resultados crescentes como selados<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] Resolvido o problema do mapa concorrente<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] Resolvido o conflito no teste da tarefa QC<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] Corrigido o carregamento da coleção preso se ocorresse compactação ou GC<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] Corrigida a distribuição desigual causada pela fuga de cache delta da tarefa de execução<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] Regressava cedo quando saltava o índice do pk de carga<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] Corrigido o utilizador root ser capaz de listar todas as colecções mesmo quando <code translate="no">common.security.rootShouldBindRole</code> estava definido<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] Corrigida a fuga de informação do flowgraph<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] Usado formatador de item param para evitar sobreposição de setconfig<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] Nome do privilégio do metastore verificado com o nome do privilégio "all"<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] Adicionado limitador de taxa para RESTful v1<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] Removido o número de partição codificado no manipulador RESTful<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><h4 id="Observability" class="common-anchor-header">Observabilidade</h4><ul>
<li>Adicionada a métrica monitor para obter dados em bruto<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] Adicionada métrica de latência do vetor de obtenção e mensagem de erro de limite de pedido refinado<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] Adicionada métrica para a fila de proxy<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>Expostos mais dados de métricas<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] Adicionadas métricas para expressão de análise<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] Adicionado campo de registo DSL para hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] Saltava a atualização das métricas do índice se o índice fosse abandonado<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] Informação do pprof despejada se o progresso da paragem do componente tiver expirado<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] Adicionada API de gestão para verificar o estado do balanço do querycoord<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Otimização do Agendador de Tarefas Stats/Compactação/Index</h4><ul>
<li>Política de agendamento de tarefas de índice refinada<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] Limitada a velocidade de geração da tarefa de estatísticas<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>Adicionadas configurações para o agendamento da compactação<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] Verificou a compactação L0 apenas com o mesmo canal quando declarado<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] Ajustada a estimativa de memória do carregador de segmentos para índices provisórios<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] Usada a posição de início para o segmento de selagem pela política de tempo de vida<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>Removida a meta tarefa quando a tarefa já não era necessária<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] Acelerou a listagem de objectos durante a importação do binlog<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>Suportada a criação de colecções com descrição<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] Exportado o intervalo de tempo limite do pedido de índice na configuração<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] Valor padrão proxy.maxTaskNum sincronizado para 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>Diminuído o limite de snapshot de dump de 10w para 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] Evitou a cópia de bytes de string para slice para batch pk existe<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>Suportado o retorno de propriedades configuráveis ao descrever o índice<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>Optimizado o desempenho da expressão para certos pontos<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] Formato de resultado optimizado de getQueryNodeDistribution<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] Activada a observação da amplificação de escrita<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] Devolvidos resultados top-k ao pesquisar em RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] Adicionado o açúcar sintático withEnableMatch<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] O índice provisório suportava diferentes tipos de índices e mais tipos de dados (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] Sincronização dos commits do GoSDK a partir do ramo master<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>Manteve a consistência da memória e meta do emissor<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>Transmitido com notificação baseada em eventos<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] Mensagem de erro refinada para verificação de esquema e índice<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] Repor o tipo de índice automático predefinido para escalar<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] Tarefa de compactação L0 novamente enfileirada quando a pré-verificação falhou<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 23 de janeiro de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Temos o prazer de anunciar o lançamento do Milvus 2.5.4, que introduz optimizações chave de desempenho e novas funcionalidades como o isolamento PartitionKey, Sparse Index com DAAT MaxScore, e mecanismos de bloqueio melhorados. Um destaque desta versão é o seu suporte para 10.000 colecções e 1 milhão de partições, o que constitui um marco importante para casos de utilização multi-tenant. Esta versão também corrige vários erros que melhoram a estabilidade e a fiabilidade gerais, dois dos erros críticos podem causar perda de dados. Encorajamo-lo a atualizar ou a experimentar esta última versão e aguardamos os seus comentários para nos ajudar a aperfeiçoar continuamente o Milvus!</p>
<h3 id="Features" class="common-anchor-header">Caraterísticas</h3><ul>
<li>Suporta o isolamento PartitionKey para melhorar o desempenho com várias chaves de partição<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/use-partition-key.md">Usar chave de partição</a>.</li>
<li>O Sparse Index agora suporta DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. Para obter mais informações, consulte <a href="/docs/pt/v2.5.x/sparse_vector.md">Vetor esparso</a>.</li>
<li>Adiciona suporte para <code translate="no">is_null</code> na expressão<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>Os privilégios de raiz podem ser personalizados<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Suporte para 10K colecções e 1milhão de partições num cluster<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>Informação delta dos segmentos em cache para acelerar o Query Coordinator<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>Leitura de metadados em simultâneo ao nível da coleção para acelerar a recuperação de falhas<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>Granularidade de bloqueio refinada no QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>Estilo unificado usando CStatus para lidar com as chamadas NewCollection CGO<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>Saltou a geração do limitador de partição se nenhuma partição estiver definida<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>Adicionado mais suporte à API RESTful<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>Removidos os filtros Bloom desnecessários no QueryNode e DataNode para reduzir a utilização de memória<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>Aceleração do carregamento de dados através da aceleração da geração, agendamento e execução de tarefas no QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>Reduzido o bloqueio no DataCoord para acelerar as operações de carregamento e inserção<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>Adicionados nomes de campos primários em <code translate="no">SearchResult</code> e <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>Utilizado tanto o tamanho do binlog como o tamanho do índice como padrão de limitação da quota do disco<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>Optimizada a utilização de memória para pesquisa de texto completo knowhere/#1011</li>
<li>Adicionado controlo de versão para índices escalares<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>Melhorada a velocidade de obtenção de informação de coleção do RootCoord, evitando cópias desnecessárias<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Correcções de erros críticos</h3><ul>
<li>Corrigidas as falhas de pesquisa para chaves primárias com índices<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>Corrigido um potencial problema de perda de dados causado pelo reinício do MixCoord e pela descarga em simultâneo<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>Corrigida uma falha de eliminação despoletada por uma concorrência imprópria entre tarefas de estatísticas e compactação L0 após o reinício do MixCoord<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>Corrigida a incompatibilidade do índice invertido escalar ao atualizar do 2.4 para o 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigidos problemas de consulta lenta causados pela granularidade de bloqueio grosseiro durante o carregamento de várias colunas<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>Foi corrigido um problema em que a utilização de aliases podia fazer com que um iterador atravessasse a base de dados errada<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>Corrigida uma falha na atualização do grupo de recursos ao alterar a base de dados<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>Foi corrigido um problema esporádico em que o índice tantivy não podia eliminar ficheiros de índice durante o lançamento<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>Corrigida a indexação lenta causada por ter demasiadas threads<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>Corrigido um problema que impedia que as verificações de quota de disco fossem ignoradas durante a importação em massa<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>Resolvidos os problemas de congelamento causados por demasiados consumidores da fila de mensagens, limitando a concorrência<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>Corrigidos os timeouts de consulta causados por reinícios do MixCoord durante compactações em grande escala<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>Corrigidos os problemas de desequilíbrio de canal causados pelo tempo de inatividade do nó<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>Corrigido um problema que poderia fazer com que o equilíbrio do canal ficasse preso.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>Corrigido um problema em que as verificações de nível de privilégio do grupo personalizado RBAC tornavam-se ineficazes<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>Corrigida uma falha ao recuperar o número de linhas em índices vazios<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>Corrigida uma estimativa de memória incorrecta para pequenos segmentos<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 13 de janeiro de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.3 oferece correcções de erros críticos e melhorias de desempenho para melhorar a estabilidade geral, a fiabilidade e a facilidade de utilização. Esta versão aperfeiçoa o tratamento da concorrência, reforça a indexação e a recuperação de dados e actualiza vários componentes-chave para uma experiência de utilizador mais robusta.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Foi corrigido um problema em que a utilização de um filtro <code translate="no">IN</code> numa chave primária <code translate="no">VARCHAR</code> podia devolver resultados vazios.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>Foi corrigido um problema de concorrência entre as operações de consulta e eliminação que podia levar a resultados incorrectos.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>Foi corrigida uma falha causada pela filtragem iterativa quando um <code translate="no">expr</code> estava vazio num pedido de consulta.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>Foi corrigido um problema em que um erro de disco durante as actualizações de configuração levava à utilização de definições de configuração predefinidas.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>Corrigida uma potencial perda de dados eliminados devido à compactação de clustering.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>Corrigida uma consulta de correspondência de texto quebrada em segmentos de dados crescentes.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>Corrigidas as falhas de recuperação causadas pelo índice que não continha os dados originais para vectores esparsos.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>Corrigida uma possível condição de corrida de campo de coluna causada por consultas simultâneas e carregamento de dados.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>Corrigidas as falhas de inserção em massa quando os campos nullable ou default_value não estavam incluídos nos dados.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Adicionada uma API de grupo de recursos para a interface RESTful.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>Optimizado o desempenho da recuperação, aproveitando os métodos SIMD do conjunto de bits.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>Utilizado o carimbo de data/hora MVCC como carimbo de data/hora de garantia quando especificado.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>Adicionada a métrica de eliminação em falta.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Etcd atualizado para a versão v3.5.16.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>Criado um novo pacote Go para gerir protos.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 3 de janeiro de 2025</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.2 suporta a modificação do comprimento máximo das colunas VARCHAR e resolve vários problemas críticos relacionados com a simultaneidade, quedas de partição e tratamento de estatísticas BM25 durante a importação. Recomendamos vivamente a atualização para esta versão para uma maior estabilidade e desempenho.</p>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><ul>
<li>Geração de registos de utilização do disco apenas quando o caminho especificado não existe.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>Adicionado um parâmetro para ajustar o comprimento máximo do VARCHAR e restaurado o limite para 65.535.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>Conversão de tipo de parâmetro suportado para expressões.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigido potenciais bloqueios em cenários de concorrência.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>Gerado o ficheiro index_null_offset apenas para campos que suportam valores nulos.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>Corrigida a utilização do plano de recuperação após o free na fase de redução.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>Reconhecidas expressões com AND e OR em maiúsculas.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>Permitida a queda de partições com sucesso mesmo que o carregamento tenha falhado.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>Corrigidos os problemas de registo do ficheiro BM25 stats durante a importação.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: December 26, 2024</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.1 concentra-se numa série de correcções de erros que abordam o carregamento de memória, listagens RBAC, equilíbrio de nós de consulta e indexação de segmentos selados, melhorando também a IU Web e os interceptores. Recomendamos vivamente a atualização para a versão 2.5.1 para maior estabilidade e fiabilidade.</p>
<h3 id="Improvement" class="common-anchor-header">Melhorias</h3><ul>
<li>Atualização das páginas de recolha e consulta da IU da Web.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigidos problemas de OOM adicionando um fator de memória às estimativas de carregamento.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Corrigida a expansão do grupo de privilégios ao listar políticas no RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Corrigidos os problemas com a listagem de grupos de privilégios e colecções.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Corrigido o balanceador para evitar sobrecarregar repetidamente o mesmo nó de consulta.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Corrigidas as tarefas de equilíbrio inesperadas acionadas após o reinício do QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Corrigidas as actualizações de configuração de carga que não se aplicavam ao carregamento de colecções.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Corrigida a contagem de leitura zero durante a importação de dados.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Corrigida a descodificação Unicode para chaves JSON em expressões.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Corrigido o nome do intercetor DB para alterCollectionField em 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Corrigido parâmetros de índice vazios para segmentos selados ao usar a pesquisa de força bruta BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 23 de dezembro de 2024</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.0 traz avanços significativos para melhorar a usabilidade, a escalabilidade e o desempenho dos utilizadores que lidam com pesquisa vetorial e gestão de dados em grande escala. Com esta versão, o Milvus integra novas funcionalidades poderosas, como a pesquisa baseada em termos, a compactação de clusters para consultas optimizadas e o suporte versátil para métodos de pesquisa vetorial esparsos e densos. As melhorias na gestão de clusters, indexação e tratamento de dados introduzem novos níveis de flexibilidade e facilidade de utilização, tornando o Milvus uma base de dados vetorial ainda mais robusta e fácil de utilizar.</p>
<h3 id="Key-Features" class="common-anchor-header">Caraterísticas principais</h3><h4 id="Full-Text-Search" class="common-anchor-header">Pesquisa de texto completo</h4><p>Milvus 2.5 suporta pesquisa de texto completo implementada com Sparse-BM25! Esta funcionalidade é um complemento importante às fortes capacidades de pesquisa semântica do Milvus, especialmente em cenários que envolvem palavras raras ou termos técnicos. Em versões anteriores, o Milvus suportava vectores esparsos para ajudar em cenários de pesquisa por palavras-chave. Estes vectores esparsos eram gerados fora do Milvus por modelos neurais como o SPLADEv2/BGE-M3 ou modelos estatísticos como o algoritmo BM25.</p>
<p>Com a ajuda do <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, o Milvus 2.5 tem analisadores integrados e extração de vectores esparsos, alargando a API de apenas receber vectores como entrada para aceitar diretamente texto. As informações estatísticas do BM25 são actualizadas em tempo real à medida que os dados são inseridos, melhorando a facilidade de utilização e a precisão. Além disso, os vectores esparsos baseados em algoritmos de vizinho mais próximo aproximado (ANN) oferecem um desempenho mais poderoso do que os sistemas de pesquisa de palavras-chave padrão.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/analyzer-overview.md">Visão geral do Analyzer</a> e <a href="/docs/pt/v2.5.x/full-text-search.md">Pesquisa de texto completo</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">WebUI de gestão de clusters (Beta)</h4><p>Para melhor suportar dados massivos e funcionalidades ricas, o design sofisticado do Milvus inclui várias dependências, numerosas funções de nó, estruturas de dados complexas e muito mais. Estes aspectos podem representar desafios para a utilização e manutenção.</p>
<p>Milvus 2.5 introduz uma WebUI de Gerenciamento de Cluster embutida, reduzindo a dificuldade de manutenção do sistema através da visualização de informações complexas do ambiente de tempo de execução do Milvus. Isso inclui detalhes de bancos de dados e coleções, segmentos, canais, dependências, estado de saúde do nó, informações de tarefas, consultas lentas e muito mais.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/v2.5.x/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Correspondência de texto</h4><p>Milvus 2.5 utiliza analisadores e indexação de <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para pré-processamento de texto e construção de índices, suportando correspondência precisa de linguagem natural de dados de texto com base em termos específicos. Esta funcionalidade é utilizada principalmente para pesquisa filtrada para satisfazer condições específicas e pode incorporar filtragem escalar para refinar os resultados da consulta, permitindo pesquisas de semelhança dentro de vectores que satisfazem critérios escalares.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/analyzer-overview.md">Visão geral do Analyzer</a> e <a href="/docs/pt/v2.5.x/keyword-match.md">Correspondência de texto</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Índice de bitmap</h4><p>Um novo índice de dados escalar foi adicionado à família Milvus. O índice BitMap utiliza uma matriz de bits, de comprimento igual ao número de linhas, para representar a existência de valores e acelerar as pesquisas.</p>
<p>Os índices Bitmap têm sido tradicionalmente eficazes para campos de baixa cardinalidade, que têm um número modesto de valores distintos - por exemplo, uma coluna que contém informações de género com apenas dois valores possíveis: masculino e feminino.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/bitmap.md">Índice de bitmap</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullable &amp; Valor Padrão</h4><p>Milvus agora suporta a configuração de propriedades anuláveis e valores padrão para campos escalares que não sejam o campo de chave primária. Para campos escalares marcados como <code translate="no">nullable=True</code>, os utilizadores podem omitir o campo ao inserir dados; o sistema irá tratá-lo como um valor nulo ou valor por defeito (se definido) sem lançar um erro.</p>
<p>Os valores por defeito e as propriedades anuláveis proporcionam uma maior flexibilidade ao Milvus. Os utilizadores podem utilizar esta funcionalidade para campos com valores incertos ao criar colecções. Também simplifica a migração de dados de outros sistemas de base de dados para o Milvus, permitindo a manipulação de conjuntos de dados que contêm valores nulos, preservando as definições originais de valores por defeito.</p>
<p>Para mais informações, consulte <a href="/docs/pt/v2.5.x/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ baseado em Faiss</h4><p>Através de uma estreita colaboração com a comunidade Faiss, o algoritmo HNSW em Faiss registou melhorias significativas tanto na funcionalidade como no desempenho. Por questões de estabilidade e manutenção, o Milvus 2.5 migrou oficialmente seu suporte ao HNSW da hnswlib para o Faiss.</p>
<p>Baseado em Faiss, Milvus 2.5 suporta múltiplos métodos de quantização em HNSW para atender às necessidades de diferentes cenários: SQ (Scalar Quantizers), PQ (Product Quantizer), e PRQ (Product Residual Quantizer). SQ e PQ são mais comuns; SQ oferece um bom desempenho de consulta e velocidade de construção, enquanto PQ oferece uma melhor recuperação com o mesmo rácio de compressão. Muitas bases de dados vectoriais utilizam normalmente a quantização binária, que é uma forma simples de quantização SQ.</p>
<p>PRQ é uma fusão de PQ e AQ (Quantizador Aditivo). Em comparação com o PQ, requer tempos de construção mais longos para proporcionar uma melhor recuperação, especialmente a taxas de compressão elevadas, dizendo compressão binária.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Compactação por agrupamento (Beta)</h4><p>O Milvus 2.5 introduz o Clustering Compaction para acelerar as pesquisas e reduzir os custos em grandes colecções. Ao especificar um campo escalar como uma chave de agrupamento, os dados são redistribuídos por intervalo para otimizar o armazenamento e a recuperação. Agindo como um índice global, este recurso permite que o Milvus retire eficientemente os dados durante as consultas baseadas em metadados de agrupamento, melhorando o desempenho da pesquisa quando filtros escalares são aplicados.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/clustering-compaction.md">Compactação de clustering</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Outros recursos</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Nó de fluxo contínuo (Beta)</h4><p>O Milvus 2.5 introduz um novo componente chamado nó de streaming, que fornece serviços de Write-Ahead Logging (WAL). Isto permite ao Milvus obter consenso antes e depois de ler e escrever canais, desbloqueando novas caraterísticas, funcionalidades e optimizações. Esta funcionalidade está desactivada por defeito no Milvus 2.5 e estará oficialmente disponível na versão 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Suporte a IPv6</h4><p>Milvus agora suporta IPv6, permitindo maior conetividade e compatibilidade de rede.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Importação em massa de CSV</h4><p>Para além dos formatos JSON e Parquet, o Milvus suporta agora a importação direta em massa de dados em formato CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Modelos de Expressão para Aceleração de Consultas</h4><p>Milvus agora suporta modelos de expressões, melhorando a eficiência da análise de expressões, particularmente em cenários com expressões complexas.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/filtering-templating.md">Modelos de filtros</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Melhorias no GroupBy</h4><ul>
<li><strong>Tamanho do grupo personalizável</strong>: Adicionado suporte para especificar o número de entradas retornadas para cada grupo.</li>
<li><strong>Pesquisa GroupBy híbrida</strong>: Suporta a pesquisa GroupBy híbrida com base em várias colunas de vetor.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Aprimoramentos do iterador</h4><ul>
<li><strong>Suporte a MVCC</strong>: Os utilizadores podem agora utilizar iteradores sem serem afectados por alterações de dados subsequentes, como inserções e eliminações, graças ao Controlo de Concorrência Multi-Versão (MVCC).</li>
<li><strong>Cursor Persistente</strong>: O Milvus agora suporta um cursor persistente para o QueryIterator, permitindo que os utilizadores retomem a iteração a partir da última posição após um reinício do Milvus sem necessidade de reiniciar todo o processo de iteração.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Otimização da eliminação</h4><p>Melhoria da velocidade e redução da utilização de memória para eliminações em grande escala, optimizando a utilização de bloqueios e a gestão de memória.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Atualização de dependências</h4><p>Atualizada para ETCD 3.5.16 e Pulsar 3.0.7 LTS, corrigindo CVEs existentes e melhorando a segurança. Nota: A atualização para o Pulsar 3.x não é compatível com as versões anteriores 2.x.</p>
<p>Para os utilizadores que já têm uma implementação Milvus a funcionar, é necessário atualizar os componentes ETCD e Pulsar antes de poder utilizar as novas caraterísticas e funções. Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/upgrade-pulsar-v3.md">Atualizar a Pulsar de 2.x para 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Armazenamento local V2</h4><p>Introduziu um novo formato de arquivo local no Milvus 2.5, melhorando a eficiência de carregamento e consulta para dados escalares, reduzindo a sobrecarga de memória e estabelecendo as bases para futuras otimizações.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Otimização da análise de expressões</h4><p>Melhoria da análise de expressões através da implementação de cache para expressões repetidas, atualização do ANTLR e otimização do desempenho das cláusulas <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Desempenho aprimorado da simultaneidade de DDL</h4><p>Otimizado o desempenho de simultaneidade das operações da Linguagem de Definição de Dados (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Alinhamento de recursos da API RESTful</h4><p>Alinhamento das funcionalidades da API RESTful com outros SDKs para fins de consistência.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Atualizações de segurança e configuração</h4><p>Suporte a TLS para proteger a comunicação entre nós em ambientes mais complexos ou corporativos. Para obter detalhes, consulte <a href="/docs/pt/v2.5.x/tls.md">Configuração de segurança</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Aprimoramentos de desempenho de compactação</h4><p>Removidas as limitações de segmento máximo na compactação mista e agora prioriza primeiro os segmentos menores, melhorando a eficiência e acelerando as consultas em conjuntos de dados grandes ou fragmentados.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Balanceamento de canais com base em pontuação</h4><p>Introduzida uma política que equilibra dinamicamente as cargas entre os canais, melhorando a utilização de recursos e a estabilidade geral em implantações de grande escala.</p>
