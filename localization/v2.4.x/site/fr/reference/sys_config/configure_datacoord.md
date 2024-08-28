---
id: configure_datacoord.md
related_key: configure
group: system_configuration.md
summary: Découvrez comment configurer dataCoord pour Milvus.
title: ''
---
<h1 id="dataCoord-related-Configurations" class="common-anchor-header">dataCoord-related Configurations<button data-href="#dataCoord-related-Configurations" class="anchor-icon" translate="no">
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
      <th class="width80">Description de la configuration</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Délai d'attente pour l'observation des chaînes (en secondes). La progression de la surveillance de la mise à jour du tickler d'un code de données réinitialise le délai d'attente.      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>
<h2 id="dataCoordchannelbalanceWithRpc" class="common-anchor-header"><code translate="no">dataCoord.channel.balanceWithRpc</code><button data-href="#dataCoordchannelbalanceWithRpc" class="anchor-icon" translate="no">
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
    </button></h2><table id="dataCoord.channel.balanceWithRpc">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Si la balance doit être activée avec RPC, la valeur par défaut est d'utiliser etcd watch     </td>
      <td>vrai</td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Les noeuds de données &lt;= cette version sont considérés comme des noeuds legacy, qui n'ont pas de watch() basé sur RPC. Ceci n'est utilisé que lors d'une mise à jour progressive où les nœuds anciens ne recevront pas de nouveaux canaux.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Durée après laquelle le gestionnaire de canaux commence à équilibrer les canaux en arrière-plan.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle avec lequel le gestionnaire de canaux vérifie l'état de l'équilibrage des canaux dml   </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle en secondes avec lequel le gestionnaire de canal avance les états des canaux      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Délai de notification des opérations sur les canaux (en secondes).      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille maximale d'un segment, unité : Mo : MB. datacoord.segment.maxSize et datacoord.segment.sealProportion déterminent ensemble si un segment peut être scellé.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille maximale d'un segment en Mo pour une collection ayant un index Disque      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        La proportion minimale de datacoord.segment.maxSize pour sceller un segment. datacoord.segment.maxSize et datacoord.segment.sealProportion déterminent ensemble si un segment peut être scellé.      </td>
      <td>0.12</td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Temps d'expiration de l'assignation du segment, unité : ms  </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Temps de tentative d'allocation du dernier lastExpire de rootCoord après un redémarrage      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Durée de vie maximale du segment en secondes, 24*60*60      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Si un segment n'a pas accepté d'enregistrements dml dans maxIdleTime et que la taille du segment est supérieure à</li>      
        <li>minSizeFromIdleToSealed, Milvus le scelle automatiquement.</li>      
        <li>Temps d'inactivité maximum du segment en secondes, 10*60.</li>      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille minimale en Mo du segment qui peut être mis en veille ou scellé.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Le nombre maximum de fichiers binlog pour un segment, le segment sera scellé si le nombre de fichiers binlog atteint la valeur maximum.</li>      
        <li>le segment sera scellé si le nombre de fichiers binlog atteint la valeur maximale.</li>      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Le segment est considéré comme "petit segment" lorsque le nombre de lignes est inférieur à  </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>(smallProportion * segment max # of rows).</li>      
        <li>Un compactage aura lieu sur des petits segments si le segment après compactage aura</li>      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>plus de (compactableProportion * segment max # of rows) lignes.</li>      
        <li>DOIT ÊTRE SUPÉRIEUR OU ÉGAL À <smallProportion>! !!</li>      
        <li>Pendant le compactage, la taille du segment # de lignes peut dépasser le segment max # de lignes de (expansionRate-1) * 100%. </li>      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Seuil de taille en Mo, si la taille totale des segments croissants de chaque tesson dépasse ce seuil, le segment croissant le plus grand est supprimé. </li>      
        <li>dépasse ce seuil, le segment croissant le plus grand sera scellé.</li>      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        si la mise à jour automatique de l'index du segment vers la version du moteur d'indexation est nécessaire      </td>
      <td>faux</td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        la durée minimale de l'intervalle (unité : secondes) entre les opérations de fusion sur un même segment      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Valeur du commutateur permettant d'activer ou non le compactage des segments. </li>      
        <li>Le compactage fusionne des segments de petite taille en un grand segment et efface les entités supprimées au-delà de la durée de rétention du Time Travel.</li>      </td>
      <td>vrai</td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Valeur du commutateur permettant d'activer ou non le compactage automatique des segments, au cours duquel data coord localise et fusionne les segments compactables en arrière-plan.</li>      
        <li>Cette configuration ne prend effet que lorsque dataCoord.enableCompaction est défini comme true.</li>      </td>
      <td>true (vrai)</td>
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
      <th class="width80">Description de la configuration</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Activer le compactage par regroupement      </td>
      <td>true</td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Activer le compactage automatique du clustering      </td>
      <td>faux</td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle de déclenchement du compactage en grappes en secondes      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle minimum entre les exécutions de compactage en grappe d'une collection, afin d'éviter un compactage redondant.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Si une collection n'a pas été compactée par clustering depuis plus longtemps que maxInterval, forcer le compactage      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Si la nouvelle taille des données est supérieure à newDataSizeThreshold, exécuter le compactage en grappe.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ratio maximum de taille de données dans le train Kmeans, s'il est plus grand, l'échantillonnage sera réduit pour respecter cette limite.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nombre maximum de centroïdes dans le train de Kmeans      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nombre minimum de centroïdes dans le train de Kmeans      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        taille minimale des clusters / taille moyenne dans le train de Kmeans      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        taille maximale de la grappe / taille moyenne dans le train de Kmeans      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        taille maximale des grappes dans le train de Kmeans      </td>
      <td>5g</td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        La taille minimale en octets pour forcer le déclenchement d'un compactage LevelZero, par défaut 8MB   </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        La taille maximale en octets pour forcer le déclenchement d'un compactage LevelZero, par défaut 64MB    </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Le nombre minimum de fichiers deltalog pour forcer le déclenchement d'un compactage LevelZero      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Le nombre maximum de fichiers deltalog pour forcer le déclenchement d'un LevelZero Compaction, par défaut 30  </td>
      <td>30</td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle de temps pour la synchronisation régulière des segments      </td>
      <td>300</td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Valeur du commutateur permettant d'activer le ramassage des ordures pour effacer les données rejetées dans le service MinIO ou S3.      </td>
      <td>vrai</td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle auquel la coordonnée des données effectue le ramassage des ordures, unité : seconde.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Durée de conservation des fichiers binaires non enregistrés (binlog). La définition d'une valeur raisonnablement élevée pour ce paramètre permet d'éviter de supprimer par erreur les fichiers binlog nouvellement créés et dépourvus de métadonnées. Unité : seconde.      </td>
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
      <th class="width80">Description du paramètre</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Durée de conservation des fichiers binlog des segments supprimés avant qu'ils ne soient effacés, unité : seconde.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nombre de goroutines simultanées pour supprimer les objets s3 abandonnés      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        fichier orphelin (fichier sur oss mais qui n'a pas été enregistré sur meta) sur le stockage d'objets intervalle d'analyse du ramasse-miettes en heures      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Activer l'équilibrage automatique      </td>
      <td>vrai</td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle de vérification de l'équilibre automatique configuré      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Nombre maximal de fichiers autorisés par tâche de pré-importation.      </td>
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
      <th class="width80">Valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        La période de rétention en secondes pour les tâches dans l'état Terminé ou Échoué.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Pour éviter la génération de petits segments, nous regrouperons les fichiers importés. Ce paramètre représente la somme des tailles de fichiers dans chaque groupe (chaque tâche d'importation).      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle de programmation de l'importation, mesuré en secondes.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        L'intervalle de vérification des importations, mesuré en secondes, est fixé à une fréquence élevée pour le vérificateur d'importations.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        L'intervalle de vérification des importations, mesuré en secondes, est fixé à une fréquence faible pour le vérificateur d'importations.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Nombre maximal de fichiers autorisés par demande d'importation.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Indique si l'opération d'importation doit attendre la fin de la construction de l'index.      </td>
      <td>vrai</td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        secondes. force stop node without graceful stop    </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Utilisation du slot du travail de compactage du clustering.      </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        utilisation des slots pour le travail de compactage par mélange.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Utilisation du slot pour la tâche de compactage l0.      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Adresse TCP/IP de dataCoord. Si elle n'est pas spécifiée, la première adresse non diffusable est utilisée.      </td>
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
      <th class="width80">Description Valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Port TCP de dataCoord      </td>
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
      <th class="width80">Valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille maximale de chaque requête RPC que le dataCoord peut envoyer, unité : octet     </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille maximale de chaque requête RPC que le dataCoord peut recevoir, unité : octet     </td>
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
      <th class="width80">Valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        La taille maximale de chaque requête RPC que les clients du dataCoord peuvent envoyer, unité : byte    </td>
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
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille maximale de chaque requête RPC que les clients de dataCoord peuvent recevoir, unité : octet     </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
