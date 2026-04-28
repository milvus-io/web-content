---
id: configure_msgchannel.md
related_key: configure
group: system_configuration.md
summary: Saiba como configurar o msgChannel para o Milvus.
---
<h1 id="msgChannel-related-Configurations" class="common-anchor-header">Configurações relacionadas ao msgChannel<button data-href="#msgChannel-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico apresenta as configurações do Milvus relacionadas ao canal de mensagens.</p>
<h2 id="msgChannelchanNamePrefixcluster" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.cluster</code><button data-href="#msgChannelchanNamePrefixcluster" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.cluster">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do nome raiz do canal quando um canal de mensagem é criado.</li>      
        <li>Recomenda-se alterar este parâmetro antes de iniciar o Milvus pela primeira vez.</li>      
        <li>Para compartilhar uma instância do Pulsar entre várias instâncias do Milvus, considere alterar este parâmetro para um nome diferente do padrão para cada instância do Milvus antes de iniciá-las.</li>      </td>
      <td>by-dev</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixrootCoordTimeTick" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.rootCoordTimeTick</code><button data-href="#msgChannelchanNamePrefixrootCoordTimeTick" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.rootCoordTimeTick">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do sub-nome do canal de mensagens onde a coord raiz publica mensagens de time tick.</li>      
        <li>O prefixo completo do nome do canal é ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordTimeTick}</li>      
        <li>Cuidado: Alterar este parâmetro depois de utilizar o Milvus durante um período de tempo irá afetar o acesso a dados antigos.</li>      
        <li>Recomenda-se que este parâmetro seja alterado antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>rootcoord-timetick</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixrootCoordStatistics" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.rootCoordStatistics</code><button data-href="#msgChannelchanNamePrefixrootCoordStatistics" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.rootCoordStatistics">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do sub-nome do canal de mensagens onde o root coord publica suas próprias mensagens estatísticas.</li>      
        <li>O prefixo completo do nome do canal é ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordStatistics}</li>      
        <li>Cuidado: Alterar este parâmetro depois de utilizar o Milvus durante um período de tempo irá afetar o acesso a dados antigos.</li>      
        <li>Recomenda-se que este parâmetro seja alterado antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>rootcoord-statistics</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixrootCoordDml" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.rootCoordDml</code><button data-href="#msgChannelchanNamePrefixrootCoordDml" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.rootCoordDml">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do sub-nome do canal de mensagens onde o root coord publica mensagens DML (Data Manipulation Language).</li>      
        <li>O prefixo completo do nome do canal é ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordDml}</li>      
        <li>Cuidado: Alterar este parâmetro depois de utilizar o Milvus durante um período de tempo irá afetar o acesso a dados antigos.</li>      
        <li>Recomenda-se a alteração deste parâmetro antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>rootcoord-dml</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixqueryTimeTick" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.queryTimeTick</code><button data-href="#msgChannelchanNamePrefixqueryTimeTick" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.queryTimeTick">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do sub-nome do canal de mensagens onde o nó de consulta publica mensagens de marcação de tempo.</li>      
        <li>O prefixo completo do nome do canal é ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.queryTimeTick}</li>      
        <li>Cuidado: Alterar este parâmetro depois de utilizar o Milvus durante um período de tempo irá afetar o acesso a dados antigos.</li>      
        <li>Recomenda-se que este parâmetro seja alterado antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>queryTimeTick</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixdataCoordTimeTick" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.dataCoordTimeTick</code><button data-href="#msgChannelchanNamePrefixdataCoordTimeTick" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.dataCoordTimeTick">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do sub-nome do canal de mensagens onde o coordenador de dados publica as mensagens de time tick.</li>      
        <li>O prefixo completo do nome do canal é ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordTimeTick}</li>      
        <li>Cuidado: Alterar este parâmetro depois de utilizar o Milvus durante um período de tempo irá afetar o acesso a dados antigos.</li>      
        <li>Recomenda-se que este parâmetro seja alterado antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>datacoord-timetick-channel</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixdataCoordSegmentInfo" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.dataCoordSegmentInfo</code><button data-href="#msgChannelchanNamePrefixdataCoordSegmentInfo" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.dataCoordSegmentInfo">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do sub-nome do canal de mensagem onde a coordenada de dados publica mensagens de informação de segmento.</li>      
        <li>O prefixo completo do nome do canal é ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordSegmentInfo}</li>      
        <li>Cuidado: Alterar este parâmetro depois de utilizar o Milvus durante um período de tempo irá afetar o acesso a dados antigos.</li>      
        <li>Recomenda-se que este parâmetro seja alterado antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>segment-info-channel</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelsubNamePrefixdataCoordSubNamePrefix" class="common-anchor-header"><code translate="no">msgChannel.subNamePrefix.dataCoordSubNamePrefix</code><button data-href="#msgChannelsubNamePrefixdataCoordSubNamePrefix" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.subNamePrefix.dataCoordSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do nome da subscrição da coordenada de dados.</li>      
        <li>Atenção: A alteração deste parâmetro após um período de utilização do Milvus afectará o acesso aos dados antigos.</li>      
        <li>Recomenda-se que este parâmetro seja alterado antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>dataCoord</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelsubNamePrefixdataNodeSubNamePrefix" class="common-anchor-header"><code translate="no">msgChannel.subNamePrefix.dataNodeSubNamePrefix</code><button data-href="#msgChannelsubNamePrefixdataNodeSubNamePrefix" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.subNamePrefix.dataNodeSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo do nome da subscrição do nó de dados.</li>      
        <li>Cuidado: A alteração deste parâmetro após um período de utilização do Milvus afectará o acesso aos dados antigos.</li>      
        <li>Recomenda-se a alteração deste parâmetro antes de iniciar o Milvus pela primeira vez.</li>      </td>
      <td>dataNode</td>
    </tr>
  </tbody>
</table>
