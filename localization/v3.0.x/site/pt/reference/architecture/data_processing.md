---
id: data_processing.md
summary: Saiba mais sobre o procedimento de processamento de dados no Milvus.
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
    </button></h1><p>Este artigo apresenta uma descrição detalhada da implementação da inserção de dados, da criação de índices e da consulta de dados no Milvus.</p>
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
    </button></h2><p>É possível escolher o número de fragmentos que uma coleção utiliza no Milvus — cada fragmento é mapeado para um canal virtual (<em>vchannel</em>). Conforme ilustrado abaixo, o Milvus atribui então cada <em>vchannel</em> a um canal físico (<em>pchannel</em>), e cada <em>pchannel</em> é associado a um Nodo de Streaming específico.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel, PChannel e Nó de Streaming</span>
  
 </span></p>
<p>Após a verificação dos dados, o proxy dividirá a mensagem gravada em vários pacotes de dados de fragmentos, de acordo com as regras de encaminhamento de fragmentos especificadas.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>Canais 1</span>
  
 </span></p>
<p>Em seguida, os dados gravados de um fragmento (<em>vchannel</em>) são enviados para o nó de streaming correspondente do <em>pchannel</em>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>fluxo de escrita</span>
  
 </span></p>
<p>O Nodo de Streaming atribui um Timestamp Oracle (TSO) a cada pacote de dados para estabelecer uma ordenação total das operações. Realiza verificações de consistência na carga útil antes de a gravar no registo de gravação antecipada (WAL) subjacente. Assim que os dados forem confirmados de forma duradoura no WAL, fica garantido que não se perderão — mesmo em caso de falha, o nó de streaming pode reproduzir o WAL para recuperar totalmente todas as operações pendentes.</p>
<p>Entretanto, o Nodo de Streaming também divide de forma assíncrona as entradas confirmadas do WAL em segmentos discretos. Existem dois tipos de segmentos:</p>
<ul>
<li><strong>Segmento em crescimento</strong>: quaisquer dados que ainda não tenham sido persistidos no armazenamento de objetos.</li>
<li><strong>Segmento selado</strong>: todos os dados foram persistidos no armazenamento de objetos; os dados do segmento selado são imutáveis.</li>
</ul>
<p>A transição de um segmento em crescimento para um segmento selado é denominada «flush». O Nodo de Streaming desencadeia um «flush» assim que tiver ingerido e gravado todas as entradas WAL disponíveis para esse segmento — ou seja, quando já não houver registos pendentes no registo de gravação antecipada subjacente —, momento em que o segmento é finalizado e otimizado para leitura.</p>
<h2 id="Index-building" class="common-anchor-header">Criação de índices<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>A criação de índices é realizada pelo nó de dados. Para evitar a criação frequente de índices devido a atualizações de dados, uma coleção no Milvus é dividida em segmentos, cada um com o seu próprio índice.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>Criação de índices</span>
  
 </span></p>
<p>O Milvus suporta a criação de índices para cada campo vetorial, campo escalar e campo primário. Tanto a entrada como a saída da construção de índices envolvem o armazenamento de objetos: o nó de dados carrega os instantâneos de registo a indexar a partir de um segmento (que se encontra no armazenamento de objetos) para a memória, deserializa os dados e metadados correspondentes para construir o índice, serializa o índice quando a construção do índice é concluída e volta a gravá-lo no armazenamento de objetos.</p>
<p>A construção de índices envolve principalmente operações com vetores e matrizes e, por isso, é intensiva em termos de computação e memória. Os vetores não podem ser indexados de forma eficiente com índices tradicionais baseados em árvores devido à sua natureza de alta dimensão, mas podem ser indexados com técnicas mais maduras neste domínio, tais como índices baseados em clusters ou em grafos. Independentemente do seu tipo, a construção de índices envolve cálculos iterativos massivos para vetores de grande escala, tais como o algoritmo K-means ou a travessia de grafos.</p>
<p>Ao contrário da indexação de dados escalares, a construção de índices vetoriais tem de tirar pleno partido da aceleração SIMD (instrução única, dados múltiplos). O Milvus possui suporte nativo para conjuntos de instruções SIMD, por exemplo, SSE, AVX2 e AVX512. Dada a natureza «instável» e a elevada exigência de recursos da criação de índices vetoriais, a elasticidade torna-se de importância crucial para o Milvus em termos económicos. Futuras versões do Milvus irão aprofundar as explorações na computação heterogénea e na computação sem servidor para reduzir os custos associados.</p>
<p>Além disso, o Milvus também suporta filtragem escalar e consulta de campos primários. Possui índices integrados para melhorar a eficiência das consultas, como índices de filtro de Bloom, índices hash, índices baseados em árvores e índices invertidos, e planeia introduzir mais índices externos, como índices bitmap e índices aproximados.</p>
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
    </button></h2><p>A consulta de dados refere-se ao processo de pesquisa numa coleção especificada de <em>k</em> vetores mais próximos de um vetor-alvo ou de <em>todos</em> os vetores dentro de um intervalo de distância especificado em relação ao vetor. Os vetores são devolvidos juntamente com a sua chave primária e campos correspondentes.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>Consulta de dados</span>
  
 </span></p>
<p>Uma coleção no Milvus é dividida em vários segmentos; o Nodo de Streaming carrega segmentos em crescimento e mantém dados em tempo real, enquanto os Nodos de Consulta carregam segmentos selados.</p>
<p>Quando chega um pedido de consulta/pesquisa, o proxy transmite o pedido a todos os Nós de Streaming responsáveis pelos fragmentos relacionados, para uma pesquisa simultânea.</p>
<p>Quando chega um pedido de consulta, o proxy solicita simultaneamente aos Nós de Streaming que contêm os fragmentos correspondentes que executem a pesquisa.</p>
<p>Cada Nodo de Streaming gera um plano de consulta, pesquisa os seus dados locais em crescimento e contacta simultaneamente os Nodos de Consulta remotos para recuperar resultados históricos, agregando-os depois num único resultado de fragmento.</p>
<p>Por fim, o proxy recolhe todos os resultados dos fragmentos, funde-os no resultado final e devolve-o ao cliente.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>Transferência</span>
  
 </span></p>
<p>Quando o segmento em crescimento num nó de streaming é transferido para um segmento selado — ou quando um nó de dados conclui uma compactação —, o coordenador inicia uma operação de transferência para converter esses dados em crescimento em dados históricos. O Coordenador distribui então uniformemente os segmentos selados por todos os Nós de Consulta, equilibrando a utilização de memória, a sobrecarga da CPU e a contagem de segmentos, e liberta qualquer segmento redundante.</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Saiba como <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utilizar a base de dados vetorial Milvus para consultas em tempo real</a>.</li>
<li>Saiba mais sobre <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">a inserção e a persistência de dados no Milvus</a>.</li>
<li>Saiba como <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">os dados são processados no Milvus</a>.</li>
</ul>
