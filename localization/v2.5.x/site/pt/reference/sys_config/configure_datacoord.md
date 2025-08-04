---
id: configure_datacoord.md
related_key: configure
group: system_configuration.md
summary: Saiba como configurar o dataCoord para o Milvus.
---
<h1 id="dataCoord-related-Configurations" class="common-anchor-header">Configurações relacionadas com dataCoord<button data-href="#dataCoord-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="dataCoordchannelwatchTimeoutInterval" class="common-anchor-header"><code translate="no">dataCoord.channel.watchTimeoutInterval</code><button data-href="#dataCoordchannelwatchTimeoutInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.watchTimeoutInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Tempo limite para a observação de canais (em segundos). O progresso da observação da atualização do tickler do nó de dados reiniciará o temporizador de tempo limite.      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannellegacyVersionWithoutRPCWatch" class="common-anchor-header"><code translate="no">dataCoord.channel.legacyVersionWithoutRPCWatch</code><button data-href="#dataCoordchannellegacyVersionWithoutRPCWatch" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.legacyVersionWithoutRPCWatch">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Datanodes &lt;= esta versão são considerados como legacy nodes, que não tem rpc based watch(). Isto só é utilizado durante a atualização contínua, em que os nós antigos não recebem novos canais      </td>
      <td>2.4.1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelbalanceSilentDuration" class="common-anchor-header"><code translate="no">dataCoord.channel.balanceSilentDuration</code><button data-href="#dataCoordchannelbalanceSilentDuration" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.balanceSilentDuration">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        A duração após a qual o gestor de canais inicia o equilíbrio de canais em segundo plano     </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelbalanceInterval" class="common-anchor-header"><code translate="no">dataCoord.channel.balanceInterval</code><button data-href="#dataCoordchannelbalanceInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.balanceInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo com o qual o gestor de canais verifica o estado do equilíbrio de canais dml   </td>
      <td>360</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelcheckInterval" class="common-anchor-header"><code translate="no">dataCoord.channel.checkInterval</code><button data-href="#dataCoordchannelcheckInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.checkInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo em segundos com que o gestor de canais avança os estados dos canais      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelnotifyChannelOperationTimeout" class="common-anchor-header"><code translate="no">dataCoord.channel.notifyChannelOperationTimeout</code><button data-href="#dataCoordchannelnotifyChannelOperationTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.notifyChannelOperationTimeout">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Tempo limite para notificar as operações do canal (em segundos).      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxSize" class="common-anchor-header"><code translate="no">dataCoord.segment.maxSize</code><button data-href="#dataCoordsegmentmaxSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de um segmento, unidade: MB. datacoord.segment.maxSize e datacoord.segment.sealProportion determinam em conjunto se um segmento pode ser selado.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentdiskSegmentMaxSize" class="common-anchor-header"><code translate="no">dataCoord.segment.diskSegmentMaxSize</code><button data-href="#dataCoordsegmentdiskSegmentMaxSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.diskSegmentMaxSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Tamanho máximo de um segmento em MB para a coleção que tem índice de disco     </td>
      <td>2048</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentsealProportion" class="common-anchor-header"><code translate="no">dataCoord.segment.sealProportion</code><button data-href="#dataCoordsegmentsealProportion" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.sealProportion">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        A proporção mínima de datacoord.segment.maxSize para selar um segmento. datacoord.segment.maxSize e datacoord.segment.sealProportion juntos determinam se um segmento pode ser selado.      </td>
      <td>0.12</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentsealProportionJitter" class="common-anchor-header"><code translate="no">dataCoord.segment.sealProportionJitter</code><button data-href="#dataCoordsegmentsealProportionJitter" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.sealProportionJitter">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        proporção de selagem do segmento, valor por defeito 0.1(10%), se a proporção de selagem for 12%, com jitter=0.1, a proporção efetivamente aplicada será 10.8~12%      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentassignmentExpiration" class="common-anchor-header"><code translate="no">dataCoord.segment.assignmentExpiration</code><button data-href="#dataCoordsegmentassignmentExpiration" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.assignmentExpiration">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Tempo de expiração da atribuição do segmento, unidade: ms  </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentallocLatestExpireAttempt" class="common-anchor-header"><code translate="no">dataCoord.segment.allocLatestExpireAttempt</code><button data-href="#dataCoordsegmentallocLatestExpireAttempt" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.allocLatestExpireAttempt">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tempo que tenta atribuir o último lastExpire de rootCoord após o reinício      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxLife" class="common-anchor-header"><code translate="no">dataCoord.segment.maxLife</code><button data-href="#dataCoordsegmentmaxLife" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxLife">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Tempo de vida máximo do segmento em segundos, 24*60*60      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxIdleTime" class="common-anchor-header"><code translate="no">dataCoord.segment.maxIdleTime</code><button data-href="#dataCoordsegmentmaxIdleTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxIdleTime">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Se um segmento não aceitar registos dml no maxIdleTime e o tamanho do segmento for superior a</li>      
        <li>minSizeFromIdleToSealed, o Milvus selá-lo-á automaticamente.</li>      
        <li>O tempo máximo de inatividade do segmento em segundos, 10*60.</li>      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentminSizeFromIdleToSealed" class="common-anchor-header"><code translate="no">dataCoord.segment.minSizeFromIdleToSealed</code><button data-href="#dataCoordsegmentminSizeFromIdleToSealed" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.minSizeFromIdleToSealed">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho mínimo em MB do segmento que pode ficar inativo a partir do momento em que é selado.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentmaxBinlogFileNumber" class="common-anchor-header"><code translate="no">dataCoord.segment.maxBinlogFileNumber</code><button data-href="#dataCoordsegmentmaxBinlogFileNumber" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.maxBinlogFileNumber">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>O número máximo de ficheiros binlog (que é igual ao número do ficheiro binlog da chave primária) para um segmento, </li>      
        <li>o segmento será encerrado se o número de ficheiros binlog atingir o valor máximo.</li>      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentsmallProportion" class="common-anchor-header"><code translate="no">dataCoord.segment.smallProportion</code><button data-href="#dataCoordsegmentsmallProportion" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.smallProportion">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O segmento é considerado como "segmento pequeno" quando o seu número de linhas é inferior a </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentcompactableProportion" class="common-anchor-header"><code translate="no">dataCoord.segment.compactableProportion</code><button data-href="#dataCoordsegmentcompactableProportion" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.compactableProportion">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>(smallProportion * número máximo de linhas do segmento).</li>      
        <li>Uma compactação ocorrerá em segmentos pequenos se o segmento após a compactação tiver</li>      </td>
      <td>0.85</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentexpansionRate" class="common-anchor-header"><code translate="no">dataCoord.segment.expansionRate</code><button data-href="#dataCoordsegmentexpansionRate" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segment.expansionRate">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>sobre (compactableProportion * segmento max # of rows) linhas.</li>      
        <li>DEVE SER MAIOR OU IGUAL A <smallProportion>!!!</li>      
        <li>Durante a compactação, o tamanho do segmento # de linhas pode exceder o segmento max # de linhas em (expansionRate-1) * 100%. </li>      </td>
      <td>1.25</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsealPolicychannelgrowingSegmentsMemSize" class="common-anchor-header"><code translate="no">dataCoord.sealPolicy.channel.growingSegmentsMemSize</code><button data-href="#dataCoordsealPolicychannelgrowingSegmentsMemSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.sealPolicy.channel.growingSegmentsMemSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>O limite de tamanho em MB, se o tamanho total dos segmentos crescentes de cada fragmento </li>      
        <li>exceder este limite, o maior segmento em crescimento será selado.</li>      </td>
      <td>4096</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordautoUpgradeSegmentIndex" class="common-anchor-header"><code translate="no">dataCoord.autoUpgradeSegmentIndex</code><button data-href="#dataCoordautoUpgradeSegmentIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.autoUpgradeSegmentIndex">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        se o índice de segmento de atualização automática para a versão do motor de índice      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsegmentFlushInterval" class="common-anchor-header"><code translate="no">dataCoord.segmentFlushInterval</code><button data-href="#dataCoordsegmentFlushInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.segmentFlushInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        a duração mínima do intervalo (unidade: segundos) entre operações de flusing no mesmo segmento      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordenableCompaction" class="common-anchor-header"><code translate="no">dataCoord.enableCompaction</code><button data-href="#dataCoordenableCompaction" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.enableCompaction">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Valor de comutação para controlar se a compactação do segmento é activada. </li>      
        <li>A compactação funde segmentos de tamanho pequeno num segmento grande e limpa as entidades eliminadas para além da duração de aluguer do Time Travel.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionenableAutoCompaction" class="common-anchor-header"><code translate="no">dataCoord.compaction.enableAutoCompaction</code><button data-href="#dataCoordcompactionenableAutoCompaction" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.enableAutoCompaction">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Alterne o valor para controlar se a compactação automática do segmento é ativada, durante a qual o data coord localiza e mescla segmentos compactáveis em segundo plano.</li>      
        <li>Esta configuração tem efeito apenas quando dataCoord.enableCompaction é definido como true.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiontaskPrioritizer" class="common-anchor-header"><code translate="no">dataCoord.compaction.taskPrioritizer</code><button data-href="#dataCoordcompactiontaskPrioritizer" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.taskPrioritizer">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>compaction task prioritizer, options: [predefinição, nível, mistura]. </li>      
        <li>a predefinição é FIFO.</li>      
        <li>o nível é priorizado por nível: primeiro as compactações L0, depois as compactações mix, depois as compactações clustering.</li>      
        <li>mix é priorizado por nível: compactações mix primeiro, depois compactações L0, depois compactações de agrupamento.</li>      </td>
      <td>predefinição</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiontaskQueueCapacity" class="common-anchor-header"><code translate="no">dataCoord.compaction.taskQueueCapacity</code><button data-href="#dataCoordcompactiontaskQueueCapacity" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.taskQueueCapacity">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tamanho da fila de tarefas de compactação      </td>
      <td>100000</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiondropTolerance" class="common-anchor-header"><code translate="no">dataCoord.compaction.dropTolerance</code><button data-href="#dataCoordcompactiondropTolerance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.dropTolerance">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        A tarefa de compactação será limpa depois de terminada durante mais tempo do que este tempo (em segundos)      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactiongcInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.gcInterval</code><button data-href="#dataCoordcompactiongcInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.gcInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo de tempo em segundos para a compactação gc  </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionmixtriggerInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.mix.triggerInterval</code><button data-href="#dataCoordcompactionmixtriggerInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.mix.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo de tempo, em segundos, para acionar a compactação da mistura      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzerotriggerInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.triggerInterval</code><button data-href="#dataCoordcompactionlevelzerotriggerInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo de tempo em segundos para acionar a compactação L0  </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggerminSize" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.minSize</code><button data-href="#dataCoordcompactionlevelzeroforceTriggerminSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.minSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho mínimo em bytes para forçar o acionamento de uma Compactação LevelZero, predefinido como 8MB   </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggermaxSize" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.maxSize</code><button data-href="#dataCoordcompactionlevelzeroforceTriggermaxSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.maxSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo em bytes para forçar o acionamento de uma Compactação LevelZero, por defeito 64MB    </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggerdeltalogMinNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.deltalogMinNum</code><button data-href="#dataCoordcompactionlevelzeroforceTriggerdeltalogMinNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.deltalogMinNum">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O número mínimo de ficheiros deltalog para forçar o acionamento de uma Compactação LevelZero      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionlevelzeroforceTriggerdeltalogMaxNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.levelzero.forceTrigger.deltalogMaxNum</code><button data-href="#dataCoordcompactionlevelzeroforceTriggerdeltalogMaxNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.levelzero.forceTrigger.deltalogMaxNum">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O número máximo de ficheiros deltalog para forçar o acionamento de uma Compactação LevelZero, predefinido como 30  </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingleratiothreshold" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.ratio.threshold</code><button data-href="#dataCoordcompactionsingleratiothreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.ratio.threshold">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O limiar do rácio de um segmento para desencadear uma única compactação, predefinido como 0,2   </td>
      <td>0.2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingledeltalogmaxsize" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.deltalog.maxsize</code><button data-href="#dataCoordcompactionsingledeltalogmaxsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.deltalog.maxsize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho do deltalog de um segmento para acionar uma única compactação, por defeito 16MB    </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingledeltalogmaxnum" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.deltalog.maxnum</code><button data-href="#dataCoordcompactionsingledeltalogmaxnum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.deltalog.maxnum">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        A contagem deltalog de um segmento para acionar uma compactação, por defeito 200   </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionsingleexpiredlogmaxsize" class="common-anchor-header"><code translate="no">dataCoord.compaction.single.expiredlog.maxsize</code><button data-href="#dataCoordcompactionsingleexpiredlogmaxsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.single.expiredlog.maxsize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho do registo expirado de um segmento para desencadear uma compactação, predefinido como 10MB    </td>
      <td>10485760</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringenable" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.enable</code><button data-href="#dataCoordcompactionclusteringenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.enable">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar a compactação de clustering      </td>
      <td>verdadeiro</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringautoEnable" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.autoEnable</code><button data-href="#dataCoordcompactionclusteringautoEnable" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.autoEnable">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar a compactação automática de clusters      </td>
      <td>falso</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringtriggerInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.triggerInterval</code><button data-href="#dataCoordcompactionclusteringtriggerInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalo de ativação da compactação de clustering em segundos      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringminInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.minInterval</code><button data-href="#dataCoordcompactionclusteringminInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.minInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo mínimo entre execuções de compactação de clustering de uma coleção, para evitar compactação redundante      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxInterval" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxInterval</code><button data-href="#dataCoordcompactionclusteringmaxInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Se uma coleção não tiver sido compactada em cluster há mais tempo do que maxInterval, força a compactação      </td>
      <td>259200</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringnewDataSizeThreshold" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.newDataSizeThreshold</code><button data-href="#dataCoordcompactionclusteringnewDataSizeThreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.newDataSizeThreshold">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Se o tamanho dos novos dados for superior a newDataSizeThreshold, executar a compactação de clusters      </td>
      <td>512m</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxTrainSizeRatio" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxTrainSizeRatio</code><button data-href="#dataCoordcompactionclusteringmaxTrainSizeRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxTrainSizeRatio">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        rácio de tamanho máximo de dados no treino Kmeans, se for maior do que isso, reduzirá a amostragem para atingir este limite      </td>
      <td>0.8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxCentroidsNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxCentroidsNum</code><button data-href="#dataCoordcompactionclusteringmaxCentroidsNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxCentroidsNum">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        número máximo de centróides no comboio Kmeans      </td>
      <td>10240</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringminCentroidsNum" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.minCentroidsNum</code><button data-href="#dataCoordcompactionclusteringminCentroidsNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.minCentroidsNum">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Número mínimo de centróides no comboio Kmeans      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringminClusterSizeRatio" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.minClusterSizeRatio</code><button data-href="#dataCoordcompactionclusteringminClusterSizeRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.minClusterSizeRatio">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tamanho mínimo dos clusters / tamanho médio da formação Kmeans      </td>
      <td>0.01</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxClusterSizeRatio" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxClusterSizeRatio</code><button data-href="#dataCoordcompactionclusteringmaxClusterSizeRatio" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxClusterSizeRatio">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tamanho máximo do cluster / tamanho médio do comboio Kmeans      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcompactionclusteringmaxClusterSize" class="common-anchor-header"><code translate="no">dataCoord.compaction.clustering.maxClusterSize</code><button data-href="#dataCoordcompactionclusteringmaxClusterSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.compaction.clustering.maxClusterSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tamanho máximo do cluster no comboio Kmeans      </td>
      <td>5g</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordsyncSegmentsInterval" class="common-anchor-header"><code translate="no">dataCoord.syncSegmentsInterval</code><button data-href="#dataCoordsyncSegmentsInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.syncSegmentsInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo de tempo para sincronizar regularmente segmentos      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordindexmemSizeEstimateMultiplier" class="common-anchor-header"><code translate="no">dataCoord.index.memSizeEstimateMultiplier</code><button data-href="#dataCoordindexmemSizeEstimateMultiplier" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.index.memSizeEstimateMultiplier">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Quando o tamanho da memória não é definido pelo procedimento de índice, multiplicador para estimar o tamanho da memória dos dados de índice      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordenableGarbageCollection" class="common-anchor-header"><code translate="no">dataCoord.enableGarbageCollection</code><button data-href="#dataCoordenableGarbageCollection" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.enableGarbageCollection">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Valor de comutação para controlar se é activada a recolha de lixo para limpar os dados descartados no serviço MinIO ou S3.      </td>
      <td>verdadeiro</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcinterval" class="common-anchor-header"><code translate="no">dataCoord.gc.interval</code><button data-href="#dataCoordgcinterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.interval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor predefinido</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo em que a coordenação de dados efectua a recolha de lixo, unidade: segundo.      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcmissingTolerance" class="common-anchor-header"><code translate="no">dataCoord.gc.missingTolerance</code><button data-href="#dataCoordgcmissingTolerance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.missingTolerance">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        A duração da retenção dos ficheiros de registo binário não gravados (binlog). Definir um valor razoavelmente grande para este parâmetro evita a eliminação errónea dos ficheiros binlog recém-criados que não possuem metadados. Unidade: segundo.      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcdropTolerance" class="common-anchor-header"><code translate="no">dataCoord.gc.dropTolerance</code><button data-href="#dataCoordgcdropTolerance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.dropTolerance">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        A duração da retenção dos ficheiros binlog dos segmentos eliminados antes de serem apagados, unidade: segundo.      </td>
      <td>10800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcremoveConcurrent" class="common-anchor-header"><code translate="no">dataCoord.gc.removeConcurrent</code><button data-href="#dataCoordgcremoveConcurrent" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.removeConcurrent">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        número de goroutines simultâneas para remover objectos s3 eliminados      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgcscanInterval" class="common-anchor-header"><code translate="no">dataCoord.gc.scanInterval</code><button data-href="#dataCoordgcscanInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gc.scanInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ficheiro órfão (ficheiro no oss mas que não foi registado no meta) no armazenamento de objectos intervalo de pesquisa da recolha de lixo em horas     </td>
      <td>168</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordbrokerTimeout" class="common-anchor-header"><code translate="no">dataCoord.brokerTimeout</code><button data-href="#dataCoordbrokerTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.brokerTimeout">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5000ms, dataCoord broker rpc timeout      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordautoBalance" class="common-anchor-header"><code translate="no">dataCoord.autoBalance</code><button data-href="#dataCoordautoBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ativar o equilíbrio automático      </td>
      <td>verdadeiro</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordcheckAutoBalanceConfigInterval" class="common-anchor-header"><code translate="no">dataCoord.checkAutoBalanceConfigInterval</code><button data-href="#dataCoordcheckAutoBalanceConfigInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.checkAutoBalanceConfigInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        o intervalo de verificação do equilíbrio automático configurado      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportfilesPerPreImportTask" class="common-anchor-header"><code translate="no">dataCoord.import.filesPerPreImportTask</code><button data-href="#dataCoordimportfilesPerPreImportTask" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.filesPerPreImportTask">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O número máximo de ficheiros permitido por tarefa de pré-importação.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimporttaskRetention" class="common-anchor-header"><code translate="no">dataCoord.import.taskRetention</code><button data-href="#dataCoordimporttaskRetention" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.taskRetention">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O período de retenção em segundos para tarefas no estado Concluído ou Falhado.      </td>
      <td>10800</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportmaxSizeInMBPerImportTask" class="common-anchor-header"><code translate="no">dataCoord.import.maxSizeInMBPerImportTask</code><button data-href="#dataCoordimportmaxSizeInMBPerImportTask" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.maxSizeInMBPerImportTask">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Para evitar a geração de pequenos segmentos, vamos reagrupar os ficheiros importados. Este parâmetro representa a soma dos tamanhos dos ficheiros em cada grupo (cada ImportTask).      </td>
      <td>6144</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportscheduleInterval" class="common-anchor-header"><code translate="no">dataCoord.import.scheduleInterval</code><button data-href="#dataCoordimportscheduleInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.scheduleInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo para o agendamento da importação, medido em segundos.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportcheckIntervalHigh" class="common-anchor-header"><code translate="no">dataCoord.import.checkIntervalHigh</code><button data-href="#dataCoordimportcheckIntervalHigh" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.checkIntervalHigh">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo para verificar a importação, medido em segundos, é definido como uma frequência elevada para o verificador de importação.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportcheckIntervalLow" class="common-anchor-header"><code translate="no">dataCoord.import.checkIntervalLow</code><button data-href="#dataCoordimportcheckIntervalLow" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.checkIntervalLow">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O intervalo para verificar a importação, medido em segundos, está definido para uma frequência baixa para o verificador de importação.      </td>
      <td>120</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportmaxImportFileNumPerReq" class="common-anchor-header"><code translate="no">dataCoord.import.maxImportFileNumPerReq</code><button data-href="#dataCoordimportmaxImportFileNumPerReq" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.maxImportFileNumPerReq">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O número máximo de ficheiros permitido por um único pedido de importação.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportmaxImportJobNum" class="common-anchor-header"><code translate="no">dataCoord.import.maxImportJobNum</code><button data-href="#dataCoordimportmaxImportJobNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.maxImportJobNum">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Número máximo de trabalhos de importação que estão a ser executados ou pendentes.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordimportwaitForIndex" class="common-anchor-header"><code translate="no">dataCoord.import.waitForIndex</code><button data-href="#dataCoordimportwaitForIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.import.waitForIndex">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Indica se a operação de importação aguarda a conclusão da construção do índice.      </td>
      <td>verdadeiro</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgracefulStopTimeout" class="common-anchor-header"><code translate="no">dataCoord.gracefulStopTimeout</code><button data-href="#dataCoordgracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        segundos. forçar paragem do nó sem paragem graciosa      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordslotclusteringCompactionUsage" class="common-anchor-header"><code translate="no">dataCoord.slot.clusteringCompactionUsage</code><button data-href="#dataCoordslotclusteringCompactionUsage" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.slot.clusteringCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        utilização da ranhura da tarefa de compactação do agrupamento.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordslotmixCompactionUsage" class="common-anchor-header"><code translate="no">dataCoord.slot.mixCompactionUsage</code><button data-href="#dataCoordslotmixCompactionUsage" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.slot.mixCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Utilização da ranhura da tarefa de compactação de mistura.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordslotl0DeleteCompactionUsage" class="common-anchor-header"><code translate="no">dataCoord.slot.l0DeleteCompactionUsage</code><button data-href="#dataCoordslotl0DeleteCompactionUsage" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.slot.l0DeleteCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Utilização da ranhura do trabalho de compactação l0.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordip" class="common-anchor-header"><code translate="no">dataCoord.ip</code><button data-href="#dataCoordip" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.ip">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Endereço TCP/IP de dataCoord. Se não for especificado, utilizar o primeiro endereço não transmissível      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordport" class="common-anchor-header"><code translate="no">dataCoord.port</code><button data-href="#dataCoordport" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.port">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Porta TCP de dataCoord      </td>
      <td>13333</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.serverMaxSendSize</code><button data-href="#dataCoordgrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que o dataCoord pode enviar, unidade: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.serverMaxRecvSize</code><button data-href="#dataCoordgrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que o dataCoord pode receber, unidade: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.clientMaxSendSize</code><button data-href="#dataCoordgrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que os clientes no dataCoord podem enviar, unidade: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordgrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">dataCoord.grpc.clientMaxRecvSize</code><button data-href="#dataCoordgrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de cada pedido RPC que os clientes em dataCoord podem receber, unidade: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
