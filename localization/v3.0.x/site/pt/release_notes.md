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
<tr><th>Versão do Milvus</th><th>Versão do SDK do Python</th><th>Versão do SDK do Node.js</th><th>Versão do SDK para Java</th><th>Versão do SDK para Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>O Milvus 3.0.0 foi oficialmente lançado! Com base na arquitetura «lake-native» introduzida na <a href="https://milvus.io/docs/release_notes.md#v30-beta">versão 3.0-beta</a>, esta versão conclui o que a versão beta iniciou: a «External Collection» abrange mais fluxos de trabalho «lakehouse»; o esquema suporta adição, preenchimento retroativo e eliminação online; o índice esparso é reconstruído em torno do SINDI; o StructArray e a pesquisa facetada completam o motor de recuperação; o passthrough do FAISS e o TEXT ampliam as opções de índice e modalidade; e o Woodpecker funciona como um serviço autónomo.</p>
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Coleção Externa: fluxos de trabalho «lakehouse» mais completos</h4><p>A versão 3.0-beta introduziu a Coleção Externa: referenciar ficheiros do «lakehouse» no local, criar índices e pesquisá-los sem copiar dados para o Milvus. Esta versão alarga essa funcionalidade para fluxos de trabalho completos de recuperação do «lakehouse». Os campos externos podem agora alimentar campos de saída de funções, tais como vetores esparsos BM25, assinaturas MinHash e incorporações de texto, pelo que os campos de recuperação de texto e derivados de modelos são criados no interior do Milvus sem copiar a tabela de origem. A atualização também suporta a evolução aditiva do esquema: quando a tabela externa ganha novas colunas, o Milvus aplica correções aos segmentos afetados, em vez de reconstruir a coleção.</p>
<p>Esta versão adiciona ainda um formato externo « <code translate="no">milvus-table</code> » que trata os metadados do Milvus Snapshot e os manifestos do Storage V3 como uma fonte externa, pelo que um instantâneo da coleção pode, por si só, ser servido como uma tabela externa — os sistemas de processamento em lote e de serviço obtêm uma visão partilhada, apoiada no manifesto, dos mesmos dados.</p>
<p>Para mais informações, consulte <a href="/docs/pt/create-an-external-collection.md">«Criar uma coleção externa</a> e <a href="/docs/pt/snapshots.md">instantâneos</a>».</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Esquema flexível: adicionar, preencher retroativamente e eliminar colunas em linha</h4><p>Os esquemas não permanecem estáticos em produção — os modelos incorporados são substituídos, as funcionalidades são atualizadas, os campos tornam-se obsoletos — e isto costumava implicar reconstruções completas da coleção com tempo de inatividade ou gravações duplicadas. A versão 3.0.0 fecha o ciclo: as colunas podem ser adicionadas, preenchidas e eliminadas enquanto o serviço continua.</p>
<p>O preenchimento retroativo funciona em ambas as direções. O preenchimento retroativo externo lida com valores calculados fora do Milvus: adicione uma coluna, crie um instantâneo da coleção como ponto de partida consistente, execute a tarefa offline, reescreva os valores e o Milvus indexa a nova coluna de forma incremental — uma atualização do modelo de incorporação em centenas de milhões de linhas torna-se um caminho ativo sem tempo de inatividade. O preenchimento interno abrange valores derivados do kernel: associe uma função BM25 ou MinHash a uma coleção existente e o seu campo de saída é calculado automaticamente com base nos dados existentes.</p>
<p>Para mais informações, consulte <a href="/docs/pt/add-fields-to-an-existing-collection.md">«Adicionar campos a uma coleção existente</a>».</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Reestruturação do índice esparso: SINDI, Block-Max WAND e Block-Max MaxScore</h4><p>O Milvus 3.0 atualiza o índice de vetores esparsos em todos os aspetos. Introduz novos algoritmos de pesquisa — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND e Block-Max MaxScore — juntamente com compressão de lista invertida, quantização configurável e seleção do algoritmo de pesquisa por carga de trabalho. O carregamento via mmap, a serialização e a pontuação BM25 também foram otimizados, reduzindo o armazenamento do índice e a sobrecarga de carregamento para pesquisas de vetores esparsos e de texto completo em grande escala. Em testes de desempenho internos, o índice BM25 comprimido é cerca de 3 vezes mais pequeno do que o índice esparso 2.6 com uma taxa de recuperação comparável, e o SINDI atinge até cerca de 10 vezes o QPS do MaxScore em incorporações esparsas aprendidas. Assim que a nova versão do índice for ativada (consulte as notas sobre compatibilidade e comportamento), o SINDI passa a ser o padrão para a pesquisa de IP esparso e o MaxScore passa a ser o padrão para o BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Cobertura do StructArray</h4><p>O StructArray suporta agora valores nulos, índices de bitmap, adição dinâmica de campos em coleções ativas e atualização parcial de campos de estrutura através de upsert, com cobertura REST e de importação em massa correspondente.</p>
<p>A pesquisa ao nível do elemento adiciona pesquisa híbrida entre subcampos vetoriais com agrupamento configurável por entidade (variantes max / sum / avg / top-k), além de pesquisa por intervalo e agrupamento dentro da mesma. A filtragem aninhada abrange os predicados <code translate="no">element_filter</code>, os quantificadores <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code>, o acesso posicional a subcampos, como <code translate="no">tags[0][name]</code>, e <code translate="no">array_length()</code> na coluna da estrutura.</p>
<p>Para mais informações, consulte <a href="/docs/pt/array-of-structs.md">StructArray</a> e <a href="/docs/pt/struct-array-operators.md">Operadores StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Agregação de pesquisa e pesquisa facetada</h4><p>A agregação de consultas da versão beta calcula estatísticas exatas sobre os dados filtrados; a versão 3.0.0 adiciona facetação ao caminho de pesquisa. Especifique um campo de faceta no momento da pesquisa e o Milvus devolve os principais valores de faceta, cada um representado pelo seu membro com melhor correspondência na classificação ANN e anotado com agregados como COUNT e AVG — a barra lateral de pesquisa facetada (marca, gama de preços, atributos) numa única solicitação, em vez de efetuar uma recuperação excessiva e contagem do lado do cliente.</p>
<h3 id="Function-Chain-reranking" class="common-anchor-header">Reclassificação da Cadeia de Funções<button data-href="#Function-Chain-reranking" class="anchor-icon" translate="no">
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
    </button></h3><p>A reclassificação é agora composível através da API da Cadeia de Funções, que executa um pipeline ordenado e tipado como parte de uma única solicitação de pesquisa. Uma cadeia pode combinar a reavaliação inicial L0 no QueryNode com a reclassificação pós-redução L2 no Proxy, suportando a transformação e combinação de pontuações, a reclassificação baseada em modelos, a ordenação e o corte de candidatos sem orquestração do lado do cliente. Esta versão adiciona também pontuação XGBoost nativa para reclassificação L0 utilizando modelos UBJ registados como FileResources, juntamente com os Hugging Face Inference Providers para incorporação de texto gerida pelo servidor e reclassificação por semelhança de frases.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Campos de texto longo TEXT</h4><p>Os campos TEXT elevam o texto longo a um nível de primeira classe, com a remoção dos limites de comprimento do lado do armazenamento: suportam <code translate="no">text_match</code>, <code translate="no">phrase_match</code> e BM25. Os valores inferiores a 64 KB permanecem na linha; os valores maiores são transferidos para ficheiros LOB ao nível da partição no formato Vortex, com a coluna a armazenar apenas referências <code translate="no">(file_id, offset)</code>. Os ficheiros LOB são partilhados entre segmentos, pelo que a compactação move as referências em vez de reescrever o texto. Para o RAG, isto significa recuperar vetores e texto de origem do mesmo repositório numa única operação de E/S — sem necessidade de utilizar um repositório de blobs externo.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Passagem de índice FAISS</h4><p>Um novo tipo de índice « <code translate="no">FAISS</code> » aceita cadeias de caracteres arbitrárias da fábrica de índices Faiss através do parâmetro « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — com os parâmetros de pesquisa passados, de modo que as receitas do Faiss são reproduzidas diretamente no Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Suporte aos formatos Vortex e Lance</h4><p>A camada de armazenamento ganha dois formatos colunares abertos: o Vortex como formato interno de próxima geração — codificações adaptativas (dicionário, RLE, compactação de bits, compressão específica para números de precisão flutuante), descompressão sem cópia, otimizado para cargas de trabalho mistas de vetores e escalares — e o Lance, a par do Parquet, para o intercâmbio no ecossistema aberto. O Vortex está destinado a tornar-se o formato interno predefinido, com o «filter pushdown» e uma variante local previstos no roteiro.</p>
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
<li><strong>Armazenamento V3 (Loon)</strong> — armazenamento colunar baseado em manifesto no armazenamento de objetos; a base para o Snapshot e a Coleção Externa.</li>
<li><strong>Consulta / Pesquisa ORDER BY</strong> — ordenação de vários campos do lado do servidor com ASC / DESC por campo.</li>
<li><strong>Agregação de consultas</strong> — COUNT / SUM / AVG / MIN / MAX com agrupamento, avaliadas do lado do servidor.</li>
<li><strong>EmbList + DiskANN</strong> — indexação multivectorial no disco para listas de incorporação StructArray, com percursos de aceleração como o Muvera e o Lemur.</li>
<li><strong>Função MinHash (doc-in, doc-out)</strong> — assinaturas MinHash do lado do servidor, além de « <code translate="no">MINHASH_LSH</code> » para deteção de quase-duplicados.</li>
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
<li><strong>As novas versões de índice são opcionais por enquanto.</strong> Os algoritmos de índice recém-introduzidos requerem o aumento manual da versão de índice de destino (<code translate="no">dataCoord.targetVecIndexVersion</code> para 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> para 4) antes de entrarem em vigor; uma versão posterior irá ativá-los por predefinição.</li>
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
<h4 id="Snapshot" class="common-anchor-header">Instantâneo</h4><p>O fornecimento e a descoberta em lote necessitam frequentemente da mesma coleção ao mesmo tempo. A avaliação de modelos A/B, a deduplicação em grande escala, a validação de preenchimento retroativo e a reversão de versões requerem todas uma visão estável da coleção enquanto as gravações ainda estão a ocorrer.</p>
<p>O Snapshot cria uma visão pontual e de leitura exclusiva de uma coleção, referenciando segmentos existentes em vez de copiar dados, pelo que o custo marginal de armazenamento é próximo de zero. Os trabalhos em lote podem ler a partir do Snapshot sob isolamento do tipo MVCC, enquanto a coleção ativa continua a aceitar gravações.</p>
<p>Para mais informações, consulte <a href="/docs/pt/snapshots.md">«Snapshots</a>», <a href="/docs/pt/manage-snapshots.md">«Gerir Snapshots</a>» e <a href="/docs/pt/snapshot-use-cases.md">«Casos de Utilização de Snapshots</a>».</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Consulta / Pesquisa por ordem</h4><p>A Pesquisa e a Consulta aceitam agora a ordenação por vários campos, com a ordenação transferida para o kernel do Milvus e os parâmetros « <code translate="no">ASC</code> » e « <code translate="no">DESC</code> » configuráveis por campo. Isto colmata uma lacuna comum em produção: a ordenação «Top-K» apenas por distância muitas vezes não corresponde às necessidades do negócio quando o item mais semelhante não é o mais barato, o mais recente ou o mais popular.</p>
<p>As aplicações já não têm de recuperar resultados em excesso e reordená-los no cliente para expressar uma classificação composta.</p>
<p>Para mais informações, consulte <a href="/docs/pt/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«Ordenar resultados de pesquisa por campos escalares</a> » e <a href="/docs/pt/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">«Ordenar resultados de consulta</a>».</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregação de consultas</h4><p>A produção de estatísticas de distribuição por inquilino, contagens de completude de campos ou progresso da implementação de versões a partir de uma Coleção Milvus exigia, anteriormente, a recuperação das entidades correspondentes para o cliente e a sua agregação nesse local. O Milvus 3.0 integra a agregação escalar ao estilo SQL no kernel. Uma chamada de consulta aceita expressões de agregação do tipo « <code translate="no">group_by_fields</code> » no formato « <code translate="no">output_fields</code> », incluindo « <code translate="no">count(*)</code> », « <code translate="no">count(&lt;field&gt;)</code> », « <code translate="no">sum(&lt;field&gt;)</code> », « <code translate="no">avg(&lt;field&gt;)</code> », « <code translate="no">min(&lt;field&gt;)</code> » e « <code translate="no">max(&lt;field&gt;)</code> ». A agregação é avaliada no lado do servidor após a filtragem.</p>
<p>Para mais informações, consulte <a href="/docs/pt/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">«Agregar resultados de consultas</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vetor nulo</h4><p>As incorporações são frequentemente produzidas de forma assíncrona, pelo que uma entidade pode chegar antes do seu vetor. Os dados multimodais também apresentam lacunas naturais, como um vídeo sem legendas ou um produto sem imagem. As versões anteriores não ofereciam uma solução adequada: as aplicações ou adiavam a gravação até que o vetor estivesse pronto ou preenchiam com um vetor provisório, e ambas as opções prejudicavam a qualidade da recuperação.</p>
<p>O Milvus 3.0 suporta o valor NULL em campos vetoriais em todos os seis tipos de vetores. A pesquisa ignora automaticamente os vetores NULL, a qualidade da recuperação não é afetada e os vetores NULL não ocupam efetivamente qualquer espaço de armazenamento. A funcionalidade « <code translate="no">AddField</code> » também se estende aos campos vetoriais no âmbito desta alteração: com « <code translate="no">nullable=True</code> », uma coleção existente pode adicionar novos campos vetoriais online sem necessidade de reconstrução.</p>
<p>Para mais informações, consulte <a href="/docs/pt/nullable-and-default.md">«Campos nulos</a>».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dicionário personalizado e dicionário de sinónimos</h4><p>Os tokenizadores predefinidos nem sempre cumprem os requisitos de qualidade de pesquisa em produção. O chinês, domínios verticais como medicina, direito e química, e corpora multilingues podem beneficiar substancialmente de dicionários personalizados e tabelas de sinónimos. Até agora, estes recursos existiam principalmente como reescritas de consultas do lado da aplicação.</p>
<p>O Milvus 3.0 adiciona um mecanismo FileResource para registar dicionários de tokenizadores personalizados, listas de sinónimos, listas de palavras de stop e regras de decomposição de compostos. Uma vez registado, um recurso pode ser referenciado a partir de qualquer tokenizador ou filtro e tem efeito no BM25, nos analisadores e no Text Match. Os dicionários e sinónimos podem agora ser versionados e geridos centralmente, em vez de ficarem dispersos pelo código da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/manage-file-resources.md">«Gerir Recursos</a> de <a href="/docs/pt/manage-file-resources.md">Ficheiro</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidades</h4><p>O TTL ao nível da coleção e ao nível da partição é demasiado genérico para muitos cenários de ciclo de vida e conformidade. Os diferentes inquilinos dentro da mesma coleção têm frequentemente regras de retenção diferentes, e as entidades individuais podem precisar de expirar de acordo com um calendário que não corresponde ao resto da coleção.</p>
<p>O Milvus 3.0 suporta o TTL por entidade. Basta declarar um campo « <code translate="no">TIMESTAMPTZ</code> » no esquema, marcá-lo como o campo TTL através de uma propriedade da coleção, e o Milvus recupera automaticamente as entidades expiradas. Isto abrange pedidos de «direito ao esquecimento», dados de sessão com prazo de validade e histórico de conversas delimitado, sem necessidade de limpeza do lado da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Definir TTL ao nível da entidade</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>O Milvus 2.6 adicionou o índice « <code translate="no">MINHASH_LSH</code> » para a deteção de quase-duplicados com base em conjuntos, mas as aplicações ainda tinham de calcular assinaturas MinHash antes de gravar dados no Milvus.</p>
<p>O Milvus 3.0 adiciona uma função MinHash do lado do servidor. Basta declarar um campo de entrada « <code translate="no">VARCHAR</code> » e um campo de saída « <code translate="no">BINARY_VECTOR</code> » no esquema, associar uma função « <code translate="no">FunctionType.MINHASH</code> », e o Milvus calcula as assinaturas durante a inserção, a inserção em massa e a pesquisa. Em conjunto com « <code translate="no">MINHASH_LSH</code> », isto suporta fluxos de trabalho de deduplicação para grandes conjuntos de dados, identificação por impressão digital e deteção de plágio no interior do Milvus.</p>
<p>Para mais informações, consulte <a href="/docs/pt/minhash-function.md">Função MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>A suposição de que «uma entidade = um vetor» já não se adequa à pesquisa moderna. Os documentos longos são divididos em muitos fragmentos, os modelos de interação tardia, como o ColBERT, emitem um vetor por token e as entidades multimodais podem conter várias perspetivas.</p>
<p>O EmbList armazena uma lista de vetores de comprimento variável por entidade, utilizando o « <code translate="no">DISKANN</code> » como índice no disco. O caminho no disco mantém a utilização da RAM sob controlo quando o corpus excede os limites de memória. O EmbList + « <code translate="no">DISKANN</code> » é a primeira variante da família mais ampla do StructList nesta versão RC. O resto da família, incluindo a filtragem StructList e a aceleração multivetorial Muvera / Lemur, está previsto para a versão oficial 3.0.</p>
<p>Para mais informações, consulte <a href="/docs/pt/search-with-embedding-lists.md">«Pesquisa com listas de incorporação</a>».</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>As cargas de trabalho de produção acumulam fragmentação de segmentos ao longo do tempo, o que provoca flutuações na latência das consultas e um aumento do consumo de armazenamento.</p>
<p>O Milvus 3.0 adiciona a capacidade de acionar explicitamente a compactação de segmentos durante janelas fora de pico, tanto no modo síncrono como no assíncrono.</p>
<p>Para mais informações, consulte <a href="/docs/pt/force-merge.md">«Compactação</a> por <a href="/docs/pt/force-merge.md">fusão forçada</a>».</p>
<h4 id="Storage-V3" class="common-anchor-header">Armazenamento V3</h4><p>O Milvus 3.0 apresenta o Armazenamento V3, um motor de armazenamento colunar baseado em manifestos, em que os dados e os metadados residem num armazenamento de objetos compatível com S3. Cada versão do conjunto de dados é capturada como um instantâneo de manifesto imutável, um ficheiro codificado em Avro que regista quais os grupos de colunas, registos delta e estatísticas que compõem o conjunto de dados.</p>
<p>Os manifestos são ficheiros Avro compactos e os registos delta registam eliminações ao nível da entidade sem reescrever os ficheiros de dados. Isto mantém a sobrecarga de metadados reduzida à medida que os conjuntos de dados crescem. O manifesto também dissocia o acompanhamento dos metadados do percurso da consulta, permitindo que uma Coleção gere mais segmentos sem comprometer o desempenho das consultas.</p>
<p>Como os estados são armazenados no armazenamento de objetos, o conjunto de dados é autodescritivo: qualquer leitor com acesso ao caminho de armazenamento pode descobri-lo e interpretá-lo sem necessidade de um catálogo central. Esta propriedade está na base das integrações com a External Collection, o Snapshot e futuras integrações com lagos de dados.</p>
