---
id: time_sync.md
title: Sincronização de tempo
summary: Saiba mais sobre o sistema de sincronização de tempo em Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Sincronização de tempo<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico apresenta o mecanismo de sincronização de tempo no Milvus.</p>
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
    </button></h2><p>Os eventos no Milvus podem ser geralmente categorizados em dois tipos:</p>
<ul>
<li><p>Eventos de linguagem de definição de dados (DDL): criar/soltar uma coleção, criar/soltar uma partição, etc.</p></li>
<li><p>Eventos de linguagem de manipulação de dados (DML): inserção, pesquisa, etc.</p></li>
</ul>
<p>Qualquer evento, independentemente de ser DDL ou DML, é marcado com um carimbo de data/hora que pode indicar quando esse evento ocorre.</p>
<p>Suponhamos que dois utilizadores iniciam uma série de eventos DML e DDL no Milvus pela ordem temporal indicada na tabela seguinte.</p>
<table>
<thead>
<tr><th style="text-align:center">Carimbo de data/hora</th><th style="text-align:center">Utilizador 1</th><th style="text-align:center">Utilizador 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Criou uma coleção com o nome <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Efectuou uma pesquisa na coleção <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Inserção de dados <code translate="no">A1</code> na coleção <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Efectuou uma pesquisa na coleção <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Inserção de dados <code translate="no">A2</code> na coleção <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Efectuou uma pesquisa na coleção <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Dados eliminados <code translate="no">A1</code> da coleção <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Efectuou uma pesquisa na coleção <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>Idealmente, o utilizador 2 deve ser capaz de ver:</p>
<ul>
<li><p>Uma coleção vazia <code translate="no">C0</code> em <code translate="no">t2</code>.</p></li>
<li><p>Dados <code translate="no">A1</code> em <code translate="no">t7</code>.</p></li>
<li><p>Ambos os dados <code translate="no">A1</code> e <code translate="no">A2</code> em <code translate="no">t12</code>.</p></li>
<li><p>Apenas os dados <code translate="no">A2</code> em <code translate="no">t17</code> (uma vez que os dados <code translate="no">A1</code> foram eliminados da coleção antes deste ponto).</p></li>
</ul>
<p>Este cenário ideal pode ser facilmente alcançado quando existe apenas um único nó. No entanto, o Milvus é uma base de dados vetorial distribuída e, para garantir que todas as operações DML e DDL em nós diferentes são mantidas em ordem, o Milvus tem de resolver os dois problemas seguintes:</p>
<ol>
<li><p>O relógio de tempo é diferente para os dois utilizadores no exemplo acima se eles estiverem em nós diferentes. Por exemplo, se o utilizador 2 estiver 24 horas atrasado em relação ao utilizador 1, todas as operações do utilizador 1 só serão visíveis para o utilizador 2 no dia seguinte.</p></li>
<li><p>Pode haver latência de rede. Se o utilizador 2 efetuar uma pesquisa na coleção <code translate="no">C0</code> em <code translate="no">t17</code>, o Milvus deve poder garantir que todas as operações antes de <code translate="no">t17</code> são processadas e concluídas com êxito. Se a operação de eliminação em <code translate="no">t15</code> for atrasada devido à latência da rede, é muito provável que o utilizador 2 ainda possa ver os dados supostamente eliminados em <code translate="no">A1</code> quando efetuar uma pesquisa em <code translate="no">t17</code>.</p></li>
</ol>
<p>Por conseguinte, o Milvus adopta um sistema de sincronização do tempo (timetick) para resolver os problemas.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Oráculo de carimbo de data/hora (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>Para resolver o primeiro problema mencionado na secção anterior, o Milvus, tal como outros sistemas distribuídos, fornece um serviço de oráculo de carimbo de data/hora (TSO). Isto significa que todos os eventos no Milvus devem ser atribuídos com um carimbo de data/hora do TSO e não do relógio local.</p>
<p>O serviço TSO é fornecido pelo coordenador de raiz do Milvus. Os clientes podem atribuir um ou mais carimbos temporais num único pedido de atribuição de carimbos temporais.</p>
<p>Um carimbo de data/hora TSO é um tipo de <code translate="no">uint64</code> valor que é composto por uma parte física e uma parte lógica. A figura seguinte mostra o formato de um carimbo de data/hora.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>Como ilustrado, os 46 bits no início são a parte física, nomeadamente a hora UTC em milissegundos. Os últimos 18 bits são a parte lógica.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Sistema de sincronização do tempo (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção utiliza o exemplo de uma operação de inserção de dados para explicar o mecanismo de sincronização do tempo em Milvus.</p>
<p>Quando o proxy recebe um pedido de inserção de dados do SDK, divide as mensagens de inserção em diferentes fluxos de mensagens (<code translate="no">MsgStream</code>) de acordo com o valor hash das chaves primárias.</p>
<p>A cada mensagem de inserção (<code translate="no">InsertMsg</code>) é atribuído um carimbo de data/hora antes de ser enviada para o <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> é um wrapper da fila de mensagens, que é Pulsar por defeito no Milvus 2.0.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>Um princípio geral é que no <code translate="no">MsgStream</code>, os timestamps do<code translate="no">InsertMsgs</code> do mesmo proxy devem ser incrementais. No entanto, não existe essa regra para os <code translate="no">InsertMsgs</code> de diferentes proxies.</p>
<p>A figura seguinte é um exemplo de <code translate="no">InsertMsgs</code> num <code translate="no">MsgStream</code>. O snippet contém cinco <code translate="no">InsertMsgs</code>, três dos quais são de <code translate="no">Proxy1</code> e os restantes de <code translate="no">Proxy2</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>fluxo de mensagens</span> </span></p>
<p>Os carimbos de data/hora dos três <code translate="no">InsertMsgs</code> de <code translate="no">Proxy1</code> são incrementais, tal como os dois <code translate="no">InsertMsgs</code> de <code translate="no">Proxy2</code>. No entanto, não existe uma ordem específica entre <code translate="no">Proxy1</code> e <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>Um cenário possível é que, ao ler uma mensagem com carimbo de data/hora <code translate="no">110</code> de <code translate="no">Proxy2</code>, Milvus descobre que a mensagem com carimbo de data/hora <code translate="no">80</code> de <code translate="no">Proxy1</code> ainda está em <code translate="no">MsgStream</code>. Portanto, Milvus introduz um sistema de sincronização de tempo, timetick, para garantir que, ao ler uma mensagem de <code translate="no">MsgStream</code>, todas as mensagens com valores de carimbo de data/hora menores devem ser consumidas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>sincronização de tempo</span> </span></p>
<p>Como mostrado na figura acima,</p>
<ul>
<li><p>Cada proxy reporta periodicamente (a cada 200 ms por padrão) o maior valor de timestamp do último <code translate="no">InsertMsg</code> no <code translate="no">MsgStream</code>para o root coord.</p></li>
<li><p>A coord raiz identifica o valor mínimo de timestamp neste <code translate="no">Msgstream</code>, independentemente do proxy a que pertence o <code translate="no">InsertMsgs</code>. Em seguida, a coord de raiz insere este carimbo de data/hora mínimo em <code translate="no">Msgstream</code>. Este carimbo de data/hora é também designado por timetick.</p></li>
<li><p>Quando os componentes consumidores lêem o timetick inserido pelo root coord, compreendem que todas as mensagens de inserção com valores de timestamp mais pequenos foram consumidas. Por conseguinte, os pedidos relevantes podem ser executados em segurança sem interromper a ordem.</p></li>
</ul>
<p>A figura seguinte é um exemplo do sítio <code translate="no">Msgstream</code> com um timetick inserido.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>marca de tempo</span> </span></p>
<p><code translate="no">MsgStream</code> processa as mensagens em lotes de acordo com o tique de tempo para garantir que as mensagens de saída cumprem os requisitos do carimbo de data/hora.</p>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Saiba mais sobre o conceito de <a href="/docs/pt/v2.4.x/timestamp.md">carimbo de data/hora</a>.</li>
<li>Saiba mais sobre o <a href="/docs/pt/v2.4.x/data_processing.md">fluxo de trabalho de processamento de dados</a> no Milvus.</li>
</ul>
