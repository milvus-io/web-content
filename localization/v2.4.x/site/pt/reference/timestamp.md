---
id: timestamp.md
title: Carimbo de data/hora em Milvus
summary: >-
  Conheça o conceito de carimbo de data/hora e os quatro principais parâmetros
  relacionados com o carimbo de data/hora na base de dados vetorial Milvus.
---
<h1 id="Timestamp" class="common-anchor-header">Carimbo de tempo<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico explica o conceito de carimbo de data/hora e apresenta os quatro principais parâmetros relacionados com o carimbo de data/hora na base de dados vetorial Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus é uma base de dados vetorial que pode pesquisar e consultar vectores convertidos a partir de dados não estruturados. Quando se efectua uma operação em linguagem de manipulação de dados (DML), incluindo <a href="https://milvus.io/docs/v2.1.x/data_processing.md">a inserção e eliminação de dados</a>, o Milvus atribui carimbos de data/hora às entidades envolvidas na operação. Por conseguinte, todas as entidades no Milvus têm um atributo de carimbo de data/hora. E os lotes de entidades na mesma operação DML partilham o mesmo valor de timestamp.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Parâmetros de carimbo de data/hora<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Vários parâmetros relacionados com o timestamp estão envolvidos quando se efectua uma pesquisa ou consulta de similaridade vetorial em Milvus.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> é um tipo de carimbo de data/hora utilizado para garantir que todas as actualizações de dados efectuadas por operações DML antes de <code translate="no">Guarantee_timestamp</code> são visíveis quando se efectua uma pesquisa ou consulta por semelhança de vectores. Por exemplo, se tiver inserido um lote de dados às 15h00 e outro lote às 17h00 e o valor de <code translate="no">Guarantee_timestamp</code> estiver definido como 18h00 durante uma pesquisa de semelhança de vectores. Isso significa que os dois lotes de dados inseridos às 15h e às 17h, respetivamente, devem ser envolvidos na pesquisa.</p>
<p>Se o endereço <code translate="no">Guarantee_timestamp</code> não estiver configurado, o Milvus considera automaticamente o momento em que o pedido de pesquisa é efectuado. Por conseguinte, a pesquisa é efectuada numa vista de dados com todas as actualizações de dados por operações DML antes da pesquisa.</p>
<p>Para evitar o trabalho de compreender o <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> dentro do Milvus, o utilizador não tem de configurar diretamente o parâmetro <code translate="no">Guarantee_timestamp</code>. Basta selecionar o <a href="https://milvus.io/docs/v2.1.x/consistency.md">nível de consistência</a> e o Milvus trata automaticamente o parâmetro <code translate="no">Guarantee_timestamp</code> por si. Cada nível de consistência corresponde a um determinado valor <code translate="no">Guarantee_timestamp</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">Exemplo</h4><p>Como mostra a ilustração acima, o valor de <code translate="no">Guarantee_timestamp</code> é definido como <code translate="no">2021-08-26T18:15:00</code> (para simplificar, o carimbo de data/hora neste exemplo é representado pela hora física). Quando efectua uma pesquisa ou consulta, todos os dados anteriores a 2021-08-26T18:15:00 são pesquisados ou consultados.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> é um tipo de carimbo de data/hora gerado e gerido automaticamente pelos nós de consulta em Milvus. É utilizado para indicar que operações DML são executadas pelos nós de consulta.</p>
<p>Os dados geridos pelos nós de consulta podem ser classificados em dois tipos:</p>
<ul>
<li><p>Dados históricos (ou também chamados de dados em lote)</p></li>
<li><p>Dados incrementais (ou também designados por dados em fluxo contínuo).</p></li>
</ul>
<p>No Milvus, é necessário carregar os dados antes de efetuar uma pesquisa ou consulta. Por isso, os dados em lote numa coleção são carregados pelo nó de consulta antes de ser feito um pedido de pesquisa ou consulta. No entanto, os dados em fluxo contínuo são inseridos ou eliminados do Milvus em tempo real, o que exige que o nó de consulta mantenha uma linha de tempo das operações DML e dos pedidos de pesquisa ou consulta. Por conseguinte, os nós de consulta utilizam <code translate="no">Service_timestamp</code> para manter essa cronologia. <code translate="no">Service_timestamp</code> pode ser visto como o momento em que determinados dados estão visíveis, uma vez que os nós de consulta podem garantir que todas as operações DML antes de <code translate="no">Service_timestamp</code> estão concluídas.</p>
<p>Quando há um pedido de pesquisa ou consulta de entrada, um nó de consulta compara os valores de <code translate="no">Service_timestamp</code> e <code translate="no">Guarantee_timestamp</code>. Existem principalmente dois cenários.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Cenário 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Como se mostra na figura 1, o valor de <code translate="no">Guarantee_timestamp</code> é definido como <code translate="no">2021-08-26T18:15:00</code>. Quando o valor de <code translate="no">Service_timestamp</code> é aumentado para <code translate="no">2021-08-26T18:15:01</code>, isso significa que todas as operações DML anteriores a este momento são executadas e concluídas pelo nó de consulta, incluindo as operações DML anteriores à hora indicada por <code translate="no">Guarantee_timestamp</code>. Como resultado, o pedido de pesquisa ou consulta pode ser executado imediatamente.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Cenário 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Como mostra a figura 2, o valor de <code translate="no">Guarantee_timestamp</code> é definido como <code translate="no">2021-08-26T18:15:00</code>, e o valor atual de <code translate="no">Service_timestamp</code> é apenas <code translate="no">2021-08-26T18:14:55</code>. Isto significa que apenas as operações DML anteriores a <code translate="no">2021-08-26T18:14:55</code> são executadas e concluídas, deixando inacabadas parte das operações DML posteriores a este ponto temporal mas anteriores a <code translate="no">Guarantee_timestamp</code>. Se a pesquisa ou consulta for executada neste ponto, alguns dos dados necessários são invisíveis e ainda não estão disponíveis, afectando seriamente a precisão dos resultados da pesquisa ou consulta. Por conseguinte, o nó de consulta precisa de adiar o pedido de pesquisa ou consulta até que as operações DML antes de <code translate="no">guarantee_timestamp</code> estejam concluídas (ou seja, quando <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Tecnicamente falando, <code translate="no">Graceful_time</code> não é um carimbo de data/hora, mas sim um período de tempo (por exemplo, 100ms). No entanto, vale a pena mencionar <code translate="no">Graceful_time</code> porque está fortemente relacionado com <code translate="no">Guarantee_timestamp</code> e <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> é um parâmetro configurável no ficheiro de configuração do Milvus. É utilizado para indicar o período de tempo que pode ser tolerado antes de determinados dados se tornarem visíveis. Em suma, as operações DML não concluídas durante <code translate="no">Graceful_time</code> podem ser toleradas.</p>
<p>Quando há um pedido de pesquisa ou de consulta a chegar, pode haver dois cenários.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Cenário 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Como mostra a figura 1, o valor de <code translate="no">Guarantee_timestamp</code> é definido como <code translate="no">2021-08-26T18:15:01</code>, e <code translate="no">Graceful_time</code> como <code translate="no">2s</code>. O valor de <code translate="no">Service_timestamp</code> é aumentado para <code translate="no">2021-08-26T18:15:00</code>. Embora o valor de <code translate="no">Service_timestamp</code> seja ainda inferior ao de <code translate="no">Guarantee_timestamp</code> e nem todas as operações DML antes de <code translate="no">2021-08-26T18:15:01</code> estejam concluídas, é tolerado um período de 2 segundos de invisibilidade dos dados, como indicado pelo valor de <code translate="no">Graceful_time</code>. Por conseguinte, o pedido de pesquisa ou consulta recebido pode ser executado imediatamente.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Cenário 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Como mostra a figura 2, o valor de <code translate="no">Guarantee_timestamp</code> é definido como <code translate="no">2021-08-26T18:15:01</code> e o de <code translate="no">Graceful_time</code> como <code translate="no">2s</code>. O valor atual de <code translate="no">Service_timestamp</code> é apenas <code translate="no">2021-08-26T18:14:54</code>. Isto significa que as operações DML esperadas ainda não estão concluídas e, mesmo tendo em conta os 2 segundos de tempo de tolerância, a invisibilidade dos dados continua a ser intolerável. Por conseguinte, o nó de consulta precisa de adiar o pedido de pesquisa ou de consulta até que determinados pedidos DML estejam concluídos (ou seja, quando <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
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
<li>Saiba como <a href="/docs/pt/v2.4.x/consistency.md">o carimbo de data/hora de garantia permite uma consistência ajustável no Milvus</a></li>
</ul>
