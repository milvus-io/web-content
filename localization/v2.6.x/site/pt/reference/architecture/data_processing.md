---
id: data_processing.md
summary: Saiba mais sobre o procedimento de tratamento de dados em Milvus.
title: Processamento de dados
---
<h1 id="Data-Processing" class="common-anchor-header">Processamento de dados<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Este artigo fornece uma descrição detalhada da implementação da inserção de dados, construção de índices e consulta de dados no Milvus.</p>
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
    </button></h2><p>É possível escolher quantos shards uma coleção usa no Milvus - cada shard é mapeado para um canal virtual<em>(vchannel</em>). Como ilustrado abaixo, o Milvus atribui cada <em>vchannel</em> a um canal físico<em>(pchannel</em>), e cada <em>pchannel</em> é vinculado a um nó de streaming específico.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>VChannel PChannel e StreamingNode</span> </span></p>
<p>Após a verificação dos dados, o proxy dividirá a mensagem escrita em vários pacotes de dados de fragmentos, de acordo com as regras de encaminhamento de fragmentos especificadas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canais 1</span> </span></p>
<p>Em seguida, os dados escritos de um fragmento<em>(vchannel</em>) são enviados para o nó de transmissão correspondente do <em>pchannel</em>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>fluxo de escrita</span> </span></p>
<p>O Nó de Fluxo atribui um Oráculo de Carimbo de Tempo (TSO) a cada pacote de dados para estabelecer uma ordenação total das operações. Ele executa verificações de consistência na carga útil antes de escrevê-la no log de escrita antecipada (WAL) subjacente. Uma vez que os dados são confirmados de forma duradoura no WAL, é garantido que não serão perdidos - mesmo no caso de uma falha, o nó de streaming pode reproduzir o WAL para recuperar totalmente todas as operações pendentes.</p>
<p>Enquanto isso, o StreamingNode também corta de forma assíncrona as entradas do WAL confirmadas em segmentos discretos. Existem dois tipos de segmentos:</p>
<ul>
<li><strong>Segmento crescente</strong>: quaisquer dados que não tenham sido pré-sistemados no armazenamento de objetos.</li>
<li><strong>Segmento sel</strong>ado: todos os dados foram persistidos no armazenamento de objectos, os dados do segmento selado são imutáveis.</li>
</ul>
<p>A transição de um segmento crescente para um segmento selado é chamada de descarga. O nó de streaming aciona um flush assim que ingere e escreve todas as entradas WAL disponíveis para esse segmento, ou seja, quando não há mais registros pendentes no log de gravação antecipada subjacente, momento em que o segmento é finalizado e otimizado para leitura.</p>
<h2 id="Index-building" class="common-anchor-header">Construção de índice<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>A construção do índice é executada pelo nó de dados. Para evitar a construção frequente de índices para atualizações de dados, uma coleção no Milvus é dividida em segmentos, cada um com seu próprio índice.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Construção de índices</span> </span></p>
<p>Milvus suporta a construção de índices para cada campo vetorial, campo escalar e campo primário. Tanto a entrada como a saída da construção de índices estão ligadas ao armazenamento de objectos: O nó de dados carrega os instantâneos de registo para indexar a partir de um segmento (que está no armazenamento de objectos) para a memória, desserializa os dados e metadados correspondentes para construir o índice, serializa o índice quando a construção do índice está concluída e escreve-o de volta para o armazenamento de objectos.</p>
<p>A criação de índices envolve principalmente operações vectoriais e matriciais e, por isso, exige muita computação e memória. Os vectores não podem ser indexados de forma eficiente com índices tradicionais baseados em árvores devido à sua natureza de elevada dimensão, mas podem ser indexados com técnicas mais maduras neste domínio, como os índices baseados em clusters ou grafos. Independentemente do seu tipo, a construção de índices envolve cálculos iterativos maciços para vectores de grande dimensão, como o Kmeans ou o graph traverse.</p>
<p>Ao contrário da indexação para dados escalares, a construção de índices vectoriais tem de tirar o máximo partido da aceleração SIMD (instrução única, dados múltiplos). O Milvus tem suporte inato para conjuntos de instruções SIMD, por exemplo, SSE, AVX2 e AVX512. Dado o "soluço" e a natureza intensiva de recursos da construção de índices vectoriais, a elasticidade torna-se crucialmente importante para o Milvus em termos económicos. As futuras versões do Milvus irão explorar mais a computação heterogénea e a computação sem servidor para reduzir os custos associados.</p>
<p>Para além disso, o Milvus também suporta filtragem escalar e consulta de campos primários. Tem índices incorporados para melhorar a eficiência da consulta, por exemplo, índices de filtro Bloom, índices de hash, índices baseados em árvores e índices invertidos, e planeia introduzir mais índices externos, por exemplo, índices de mapa de bits e índices aproximados.</p>
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
    </button></h2><p>A consulta de dados refere-se ao processo de pesquisa de uma coleção especificada para o número <em>k</em> de vectores mais próximos de um vetor alvo ou para <em>todos os</em> vectores dentro de um intervalo de distância especificado para o vetor. Os vectores são devolvidos juntamente com a chave primária e os campos correspondentes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Consulta de dados</span> </span></p>
<p>Uma coleção em Milvus é dividida em vários segmentos; o nó de fluxo contínuo carrega segmentos crescentes e mantém os dados em tempo real, enquanto os nós de consulta carregam segmentos selados.</p>
<p>Quando chega um pedido de consulta/pesquisa, o proxy transmite o pedido a todos os Streaming Nodes responsáveis pelos shards relacionados para pesquisa simultânea.</p>
<p>Quando um pedido de consulta chega, o proxy solicita simultaneamente aos nós de fluxo contínuo que detêm os fragmentos correspondentes para executar a pesquisa.</p>
<p>Cada nó de fluxo contínuo gera um plano de consulta, pesquisa os seus dados crescentes locais e contacta simultaneamente nós de consulta remotos para obter resultados históricos, agregando-os depois num único resultado de fragmento.</p>
<p>Finalmente, o proxy recolhe todos os resultados dos fragmentos, funde-os no resultado final e devolve-o ao cliente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Handoff</span> </span></p>
<p>Quando o segmento crescente em um Streaming Node é descarregado em um segmento selado - ou quando um Data Node completa uma compactação - o Coordinator inicia uma operação de handoff para converter esses dados crescentes em dados históricos. Em seguida, o coordenador distribui uniformemente os segmentos selados entre todos os nós de consulta, equilibrando o uso da memória, a sobrecarga da CPU e a contagem de segmentos, e libera qualquer segmento redundante.</p>
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
