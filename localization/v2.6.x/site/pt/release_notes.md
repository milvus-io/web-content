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
<tr><th style="text-align:center">Versão do Milvus</th><th style="text-align:center">Versão do SDK do Python</th><th style="text-align:center">Versão do SDK do Node.js</th><th style="text-align:center">Versão do SDK Java</th><th style="text-align:center">Versão do SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>O Milvus 2.6.0-rc1 apresenta uma arquitetura simplificada e nativa da nuvem, concebida para melhorar a eficiência operacional, a utilização de recursos e o custo total de propriedade, reduzindo a complexidade da implementação. Esta versão adiciona novas funcionalidades focadas no desempenho, na pesquisa e no desenvolvimento. Os principais recursos incluem quantização de 1 bit de alta precisão (RaBitQ) e uma camada de cache dinâmica para ganhos de desempenho, deteção quase duplicada com MinHash e correspondência precisa de frases para pesquisa avançada e funções de incorporação automatizadas com modificação de esquema online para aprimorar a experiência do desenvolvedor.</p>
<div class="alert note">
<p>Esta é uma versão de pré-lançamento do Milvus 2.6.0. Para experimentar as funcionalidades mais recentes, instale esta versão como uma nova implementação. A atualização do Milvus v2.5.x ou anterior para 2.6.0-rc1 não é suportada.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Alterações na arquitetura</h3><p>Desde a versão 2.6, o Milvus introduziu alterações significativas na arquitetura com o objetivo de melhorar o desempenho, a escalabilidade e a facilidade de utilização. Para obter mais informações, consulte <a href="/docs/pt/v2.6.x/architecture_overview.md">Visão geral da arquitetura do Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nó de streaming (GA)</h4><p>Nas versões anteriores, os dados de streaming eram escritos no WAL pelo Proxy e lidos pelo QueryNode e DataNode. Esta arquitetura dificultava a obtenção de consenso no lado da escrita, exigindo uma lógica complexa no lado da leitura. Além disso, o delegador de consultas estava localizado no QueryNode, o que dificultava a escalabilidade. O Milvus 2.5.0 introduziu o Streaming Node, que se tornou GA na versão 2.6.0. Este componente é agora responsável por todas as operações de leitura/escrita WAL ao nível do shard e serve também como delegador de consultas, resolvendo os problemas acima mencionados e permitindo novas optimizações.</p>
<p><strong>Aviso importante de atualização</strong>: O Streaming Node é uma mudança significativa na arquitetura, portanto, uma atualização direta para o Milvus 2.6.0-rc1 a partir de versões anteriores não é suportada.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL nativo do Woodpecker</h4><p>Milvus anteriormente dependia de sistemas externos como Kafka ou Pulsar para seu WAL. Embora funcionais, esses sistemas adicionavam uma complexidade operacional significativa e sobrecarga de recursos, particularmente para implantações de pequeno e médio porte. No Milvus 2.6, esses sistemas foram substituídos pelo Woodpecker, um sistema WAL nativo da nuvem criado especificamente para esse fim. O Woodpecker foi concebido para armazenamento de objectos, suportando modos de disco zero baseados em armazenamento local e de objectos, simplificando as operações e melhorando o desempenho e a escalabilidade.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusão de DataNode e IndexNode</h4><p>No Milvus 2.6, tarefas como compactação, importação em massa, coleta de estatísticas e construção de índices agora são gerenciadas por um agendador unificado. A função de persistência de dados anteriormente gerida pelo DataNode foi transferida para o Streaming Node. Para simplificar a implantação e a manutenção, o IndexNode e o DataNode foram fundidos em um único componente DataNode. Este nó consolidado executa agora todas estas tarefas críticas, reduzindo a complexidade operacional e optimizando a utilização de recursos.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusão do coordenador no MixCoord</h4><p>A conceção anterior com módulos RootCoord, QueryCoord e DataCoord separados introduziu complexidade na comunicação entre módulos. Para simplificar a conceção do sistema, estes componentes foram fundidos num único coordenador unificado denominado MixCoord. Esta consolidação reduz a complexidade da programação distribuída, substituindo a comunicação baseada na rede por chamadas de funções internas, resultando num funcionamento mais eficiente do sistema e num desenvolvimento e manutenção simplificados.</p>
<h3 id="Key-Features" class="common-anchor-header">Caraterísticas principais</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Quantização de 1 bit RaBitQ</h4><p>Para lidar com conjuntos de dados de grande escala, a quantização de 1 bit é uma técnica eficaz para melhorar a utilização de recursos e o desempenho da pesquisa. No entanto, os métodos tradicionais podem ter um impacto negativo na recuperação. Em colaboração com os autores da pesquisa original, o Milvus 2.6 apresenta o RaBitQ, uma solução de quantização de 1 bit que mantém alta precisão de recuperação enquanto oferece os benefícios de recurso e desempenho da compactação de 1 bit.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/v2.6.x/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Aprimoramento da capacidade JSON</h4><p>O Milvus 2.6 aprimora seu suporte ao tipo de dados JSON com as seguintes melhorias:</p>
<ul>
<li><strong>Desempenho</strong>: A indexação de caminho JSON agora é oficialmente suportada, permitindo a criação de índices invertidos em caminhos específicos dentro de objetos JSON (por exemplo, <code translate="no">meta.user.location</code>). Isso evita varreduras completas de objetos e melhora a latência de consultas com filtros complexos.</li>
<li><strong>Funcionalidade</strong>: Para suportar uma lógica de filtragem mais complexa, esta versão adiciona suporte para as funções <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> e <code translate="no">CAST</code>. Olhando para o futuro, nosso trabalho no suporte a JSON continua. Estamos entusiasmados em prever que as próximas versões oficiais apresentarão recursos ainda mais poderosos, como a <strong>fragmentação de JSON</strong> e um <strong>índice JSON FLAT</strong>, projetado para melhorar drasticamente o desempenho em dados JSON altamente aninhados.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Aprimoramento da função Analyzer/Tokenizer</h4><p>Esta versão melhora significativamente as capacidades de processamento de texto com várias actualizações do Analyzer e do Tokenizer:</p>
<ul>
<li>Uma nova sintaxe <a href="/docs/pt/v2.6.x/analyzer-overview.md#Example-use">do Run Analyzer</a> está disponível para validar as configurações do tokenizador.</li>
<li>O <a href="/docs/pt/v2.6.x/lindera-tokenizer.md">tokenizador Lindera</a> foi integrado para melhorar o suporte de idiomas asiáticos, como japonês e coreano.</li>
<li>A seleção de tokenizador em nível de linha agora é suportada, com o <a href="/docs/pt/v2.6.x/icu-tokenizer.md">tokenizador ICU</a> de uso geral disponível como um recurso para cenários multilíngues.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Entrada de dados, saída de dados com funções de incorporação</h4><p>O Milvus 2.6 introduz uma capacidade "Data-in, Data-Out" que simplifica o desenvolvimento de aplicações de IA através da integração direta com modelos de incorporação de terceiros (por exemplo, da OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Os utilizadores podem agora inserir e consultar dados de texto em bruto, e o Milvus chamará automaticamente o serviço de modelo especificado para converter o texto em vectores em tempo real. Isto elimina a necessidade de um pipeline de conversão de vectores separado.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/v2.6.x/embedding-function-overview.md">Visão geral da função de incorporação</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Correspondência de frases</h4><p>A Correspondência de Frases é uma funcionalidade de pesquisa de texto que devolve resultados apenas quando a sequência exacta de palavras numa consulta aparece consecutivamente e na ordem correta num documento.</p>
<p><strong>Caraterísticas principais</strong>:</p>
<ul>
<li>Sensível à ordem: As palavras devem aparecer na mesma ordem que na consulta.</li>
<li>Correspondência consecutiva: As palavras têm de aparecer uma ao lado da outra, exceto se for utilizado um valor de inclinação.</li>
<li>Inclinação (opcional): Um parâmetro ajustável que permite um pequeno número de palavras intermédias, possibilitando a correspondência difusa de frases.</li>
</ul>
<p>Para mais informações, consulte <a href="/docs/pt/v2.6.x/phrase-match.md">Correspondência de frases</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Índice LSH MinHash (Beta)</h4><p>Para atender à necessidade de desduplicação de dados no treinamento de modelos, o Milvus 2.6 adiciona suporte para índices MINHASH_LSH. Esse recurso fornece um método computacionalmente eficiente e escalável para estimar a similaridade Jaccard entre documentos para identificar quase duplicatas. Os utilizadores podem gerar assinaturas MinHash para os seus documentos de texto durante o pré-processamento e utilizar o índice MINHASH_LSH no Milvus para encontrar eficazmente conteúdos semelhantes em conjuntos de dados de grande escala, melhorando a limpeza dos dados e a qualidade do modelo.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Funções de decaimento com reconhecimento de tempo</h4><p>O Milvus 2.6 introduz funções de decaimento sensíveis ao tempo para lidar com cenários em que o valor da informação muda com o tempo. Durante a reclassificação de resultados, os utilizadores podem aplicar funções de decaimento exponencial, gaussiano ou linear com base num campo de carimbo de data/hora para ajustar a pontuação de relevância de um documento. Isto garante que o conteúdo mais recente pode ser priorizado, o que é fundamental para aplicações como feeds de notícias, comércio eletrónico e a memória de um agente de IA.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/v2.6.x/decay-ranker-overview.md">Visão geral do Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Adicionar campo para evolução do esquema online</h4><p>Para fornecer maior flexibilidade de esquema, Milvus 2.6 agora suporta a adição de um novo campo escalar ou vetorial a um esquema de coleção existente online. Isso evita a necessidade de criar uma nova coleção e realizar uma migração de dados quando os requisitos da aplicação mudam.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/v2.6.x/add-fields-to-an-existing-collection.md">Adicionar campos a uma coleção existente</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Suporte ao vetor INT8</h4><p>Em resposta ao uso crescente de modelos quantizados que produzem embeddings inteiros de 8 bits, o Milvus 2.6 adiciona suporte nativo a tipos de dados para vetores INT8. Isto permite aos utilizadores ingerir estes vectores diretamente, sem descodificação, poupando computação, largura de banda de rede e custos de armazenamento. Esse recurso é inicialmente suportado para índices da família HNSW.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/v2.6.x/dense-vector.md">Vetor denso</a>.</p>
