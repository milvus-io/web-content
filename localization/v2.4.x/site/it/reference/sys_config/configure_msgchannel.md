---
id: configure_msgchannel.md
related_key: configure
group: system_configuration.md
summary: Scoprite come configurare msgChannel per Milvus.
title: ''
---
<h1 id="msgChannel-related-Configurations" class="common-anchor-header">Configurazioni relative al canale dei messaggi<button data-href="#msgChannel-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce le configurazioni relative al canale dei messaggi di Milvus.</p>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefisso del nome radice del canale quando viene creato un canale di messaggi.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      
        <li>Per condividere un'istanza di Pulsar tra più istanze di Milvus, si consiglia di cambiare questo parametro con un nome diverso da quello predefinito per ogni istanza di Milvus prima di avviarle.</li>      </td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sotto-nome prefisso del canale di messaggi in cui il coord root pubblica i messaggi di time tick.</li>      
        <li>Il nome completo del canale è ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordTimeTick}.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sotto-nome prefisso del canale di messaggi in cui il root coord pubblica i propri messaggi di statistica.</li>      
        <li>Il prefisso completo del nome del canale è ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordStatistics}.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
      <td>statistiche di rootcoord</td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sotto-nome prefisso del canale di messaggi in cui il root coord pubblica i messaggi del Data Manipulation Language (DML).</li>      
        <li>Il nome completo del canale è ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordDml}.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sotto-nome prefisso del canale di messaggi in cui il nodo di interrogazione pubblica i messaggi di time tick.</li>      
        <li>Il nome completo del canale è ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.queryTimeTick}.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sotto-nome prefisso del canale di messaggi in cui il coordinatore dei dati pubblica i messaggi di time tick.</li>      
        <li>Il nome completo del canale è ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordTimeTick}.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
      <td>canale datacoord-timetick</td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sotto-nome prefisso del canale di messaggi in cui il data coord pubblica i messaggi di informazione sul segmento.</li>      
        <li>Il prefisso completo del nome del canale è ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordSegmentInfo}.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
      <td>segmento-info-canale</td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefisso del nome della sottoscrizione del coord. dati.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
      <td>datiCoord</td>
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
      <th class="width80">Descrizione</th>
      <th class="width20">Valore predefinito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefisso del nome della sottoscrizione del nodo dati.</li>      
        <li>Attenzione: La modifica di questo parametro dopo aver utilizzato Milvus per un certo periodo di tempo influisce sull'accesso ai vecchi dati.</li>      
        <li>Si consiglia di modificare questo parametro prima di avviare Milvus per la prima volta.</li>      </td>
      <td>nodo dati</td>
    </tr>
  </tbody>
</table>
