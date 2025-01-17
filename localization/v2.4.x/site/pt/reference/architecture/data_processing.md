---
id: data_processing.md
summary: Saiba mais sobre o procedimento de tratamento de dados em Milvus.
title: Processamento de dados
---
<h1 id="Data-processing" class="common-anchor-header">Processamento de dados<button data-href="#Data-processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Este artigo fornece uma descrição pormenorizada da implementação da inserção de dados, da criação de índices e da consulta de dados no Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Inserção de dados<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>É possível especificar um número de fragmentos para cada coleção no Milvus, correspondendo cada fragmento a um canal virtual<em>(vchannel</em>). Como mostra a figura a seguir, Milvus atribui a cada vchannel no broker de log um canal físico<em>(pchannel</em>). Qualquer pedido de inserção/eliminação de entrada é encaminhado para os fragmentos com base no valor de hash da chave primária.</p>
<p>A validação dos pedidos DML é transferida para o proxy porque o Milvus não tem transacções complicadas. O proxy solicita um carimbo de data/hora para cada pedido de inserção/eliminação ao TSO (Timestamp Oracle), que é o módulo de cronometragem que se encontra no coordenador de raiz. Com o carimbo de data/hora mais antigo a ser substituído pelo mais recente, os carimbos de data/hora são utilizados para determinar a sequência dos pedidos de dados que estão a ser processados. O proxy recupera informações em lotes a partir da coordenação de dados, incluindo segmentos de entidades e chaves primárias, para aumentar o rendimento global e evitar sobrecarregar o nó central.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canais 1</span> </span></p>
<p>Tanto as operações DML (linguagem de manipulação de dados) como as operações DDL (linguagem de definição de dados) são escritas na sequência de registo, mas às operações DDL só é atribuído um canal devido à sua baixa frequência de ocorrência.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>Canais 2</span> </span></p>
<p><em>Os canais V</em> são mantidos nos nós subjacentes do corretor de registos. Cada canal é fisicamente indivisível e está disponível para qualquer nó, mas apenas um. Quando a taxa de ingestão de dados atinge um estrangulamento, considere duas coisas: se o nó do corretor de registos está sobrecarregado e precisa de ser escalado; e se existem fragmentos suficientes para garantir o equilíbrio de carga para cada nó.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>Sequência de registo de escrita</span> </span></p>
<p>O diagrama acima encapsula quatro componentes envolvidos no processo de escrita da sequência de registos: o proxy, o corretor de registos, o nó de dados e o armazenamento de objectos. O processo envolve quatro tarefas: validação de pedidos DML, publicação-assinatura da sequência de registos, conversão de um registo de fluxo contínuo para instantâneos de registos e persistência de instantâneos de registos. As quatro tarefas são dissociadas umas das outras para garantir que cada tarefa é tratada pelo tipo de nó correspondente. Os nós do mesmo tipo são iguais e podem ser escalados de forma elástica e independente para acomodar várias cargas de dados, nomeadamente dados de fluxo contínuo maciços e altamente flutuantes.</p>
<h2 id="Index-building" class="common-anchor-header">Construção de índices<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>A construção de índices é efectuada por nós de índice. Para evitar a criação frequente de índices para actualizações de dados, uma coleção em Milvus é dividida em segmentos, cada um com o seu próprio índice.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Construção de índices</span> </span></p>
<p>O Milvus suporta a construção de índices para cada campo vetorial, campo escalar e campo primário. Tanto a entrada como a saída da construção de índices estão relacionadas com o armazenamento de objectos: O nó de índice carrega os instantâneos de registo para indexar a partir de um segmento (que está no armazenamento de objectos) para a memória, desserializa os dados e metadados correspondentes para construir o índice, serializa o índice quando a construção do índice está concluída e escreve-o de volta para o armazenamento de objectos.</p>
<p>A construção de índices envolve principalmente operações vectoriais e matriciais e, por isso, exige muita computação e memória. Os vectores não podem ser indexados eficientemente com índices tradicionais baseados em árvores devido à sua natureza altamente dimensional, mas podem ser indexados com técnicas especialmente concebidas para esta tarefa, tais como índices baseados em clusters ou grafos. Independentemente do seu tipo, a construção de um índice envolve cálculos iterativos maciços para vectores de grande escala, tais como K-means ou graph traversal.</p>
<p>Ao contrário da indexação para dados escalares, a construção de um índice vetorial beneficia muito da aceleração SIMD (instrução única, dados múltiplos). O Milvus tem suporte inato para conjuntos de instruções SIMD, por exemplo, SSE, AVX2 e AVX512. Dado o "soluço" e a natureza intensiva de recursos da construção de índices vectoriais, a elasticidade torna-se crucialmente importante para o Milvus em termos económicos. As futuras versões do Milvus irão explorar mais a computação heterogénea e a computação sem servidor para reduzir os custos associados.</p>
<p>Milvus também suporta filtragem escalar e consulta de campos primários. Tem índices incorporados para melhorar a eficiência da consulta, por exemplo, índices de filtro Bloom, índices de hash, índices baseados em árvores e índices invertidos, e planeia introduzir mais índices externos, por exemplo, índices de mapa de bits e índices aproximados.</p>
<h2 id="Data-query" class="common-anchor-header">Consulta de dados<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>O termo "consulta de dados" refere-se ao processo de pesquisa de uma coleção especificada para o número <em>k</em> de vectores mais próximos de um vetor alvo ou para <em>todos os</em> vectores dentro de um intervalo de distância especificado para o vetor. Os vectores são devolvidos juntamente com a chave primária e os campos correspondentes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Consulta de dados</span> </span></p>
<p>Uma coleção no Milvus é dividida em vários segmentos e os nós de consulta carregam índices por segmento. Quando um pedido de pesquisa chega, ele é transmitido para todos os nós de consulta para uma pesquisa simultânea. Cada nó poda então os segmentos locais, procura vectores que satisfaçam os critérios, reduz e devolve os resultados da pesquisa.</p>
<p>Os nós de consulta são independentes uns dos outros numa consulta de dados. Cada nó é responsável apenas por duas tarefas: Carregar ou libertar segmentos seguindo as instruções do coordenador da consulta; efetuar uma pesquisa dentro dos segmentos locais. E o proxy é responsável por reduzir os resultados da pesquisa de cada nó de consulta e devolver os resultados finais ao cliente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Transferência</span> </span></p>
<p>Existem dois tipos de segmentos, segmentos crescentes (para dados incrementais) e segmentos selados (para dados históricos). Os nós de consulta subscrevem o vchannel para receber actualizações recentes (dados incrementais) como segmentos crescentes. Quando um segmento em crescimento atinge um limiar predefinido, a coordenação de dados sela-o e começa a construção do índice. Em seguida, uma operação de <em>handoff</em> iniciada pelo coordenador da consulta transforma os dados incrementais em dados históricos. A coordenação da consulta distribuirá os segmentos selados uniformemente entre todos os nós de consulta de acordo com o uso da memória, a sobrecarga da CPU e o número de segmentos.</p>
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
    </button></h2><ul>
<li>Saiba como <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">usar o banco de dados vetorial Milvus para consulta em tempo real</a>.</li>
<li>Saiba mais sobre a <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">inserção de dados e a persistência de dados no Milvus</a>.</li>
<li>Saiba como <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">os dados são processados no Milvus</a>.</li>
</ul>
