---
id: configure_querycoord.md
related_key: configure
group: system_configuration.md
summary: Découvrez comment configurer queryCoord pour Milvus.
title: ''
---
<h1 id="queryCoord-related-Configurations" class="common-anchor-header">Configurations liées à queryCoord<button data-href="#queryCoord-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Configuration connexe de queryCoord, utilisée pour gérer la topologie et l'équilibrage de la charge pour les nœuds de requête, et le transfert de segments en croissance vers des segments scellés.</p>
<h2 id="queryCoordautoHandoff" class="common-anchor-header"><code translate="no">queryCoord.autoHandoff</code><button data-href="#queryCoordautoHandoff" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoHandoff">
  <thead>
    <tr>
      <th class="width80">Description de la configuration</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Valeur de commutation permettant de contrôler le remplacement automatique d'un segment croissant par le segment scellé indexé correspondant lorsque le segment croissant atteint le seuil de scellement.</li>      
        <li>Si ce paramètre est défini comme faux, Milvus recherche simplement les segments croissants par force brute.</li>      </td>
      <td>vrai</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordautoBalance" class="common-anchor-header"><code translate="no">queryCoord.autoBalance</code><button data-href="#queryCoordautoBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Valeur de commutation permettant d'équilibrer automatiquement l'utilisation de la mémoire entre les nœuds de requête en répartissant uniformément les opérations de chargement et de libération des segments.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordautoBalanceChannel" class="common-anchor-header"><code translate="no">queryCoord.autoBalanceChannel</code><button data-href="#queryCoordautoBalanceChannel" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.autoBalanceChannel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Activer le canal d'équilibrage automatique      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalancer" class="common-anchor-header"><code translate="no">queryCoord.balancer</code><button data-href="#queryCoordbalancer" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balancer">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        équilibreur automatique utilisé pour les segments sur les queryNodes      </td>
      <td>Équilibreur basé sur le score</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordglobalRowCountFactor" class="common-anchor-header"><code translate="no">queryCoord.globalRowCountFactor</code><button data-href="#queryCoordglobalRowCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.globalRowCountFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        le poids utilisé lors de l'équilibrage des segments entre les queryNodes      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordscoreUnbalanceTolerationFactor" class="common-anchor-header"><code translate="no">queryCoord.scoreUnbalanceTolerationFactor</code><button data-href="#queryCoordscoreUnbalanceTolerationFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.scoreUnbalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        la valeur minimale pour l'étendue déséquilibrée entre les nœuds de départ et d'arrivée lors de l'équilibrage      </td>
      <td>0.05</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordreverseUnBalanceTolerationFactor" class="common-anchor-header"><code translate="no">queryCoord.reverseUnBalanceTolerationFactor</code><button data-href="#queryCoordreverseUnBalanceTolerationFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.reverseUnBalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        la plus grande valeur pour le déséquilibre entre les nœuds de départ et d'arrivée après l'équilibrage      </td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordoverloadedMemoryThresholdPercentage" class="common-anchor-header"><code translate="no">queryCoord.overloadedMemoryThresholdPercentage</code><button data-href="#queryCoordoverloadedMemoryThresholdPercentage" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.overloadedMemoryThresholdPercentage">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Le seuil d'utilisation de la mémoire (en pourcentage) dans un nœud de requête pour déclencher l'équilibrage du segment scellé.      </td>
      <td>90</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalanceIntervalSeconds" class="common-anchor-header"><code translate="no">queryCoord.balanceIntervalSeconds</code><button data-href="#queryCoordbalanceIntervalSeconds" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balanceIntervalSeconds">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        L'intervalle auquel la coordination de la requête équilibre l'utilisation de la mémoire entre les nœuds de requête.      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordmemoryUsageMaxDifferencePercentage" class="common-anchor-header"><code translate="no">queryCoord.memoryUsageMaxDifferencePercentage</code><button data-href="#queryCoordmemoryUsageMaxDifferencePercentage" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.memoryUsageMaxDifferencePercentage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Le seuil de différence d'utilisation de la mémoire (en pourcentage) entre deux nœuds de requête pour déclencher l'équilibrage du segment scellé.      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrowCountFactor" class="common-anchor-header"><code translate="no">queryCoord.rowCountFactor</code><button data-href="#queryCoordrowCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.rowCountFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        le poids du nombre de lignes utilisé lors de l'équilibrage des segments entre les nœuds de requête      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentCountFactor" class="common-anchor-header"><code translate="no">queryCoord.segmentCountFactor</code><button data-href="#queryCoordsegmentCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentCountFactor">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        le poids du nombre de segments utilisé lors de l'équilibrage des segments entre les queryNodes      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordglobalSegmentCountFactor" class="common-anchor-header"><code translate="no">queryCoord.globalSegmentCountFactor</code><button data-href="#queryCoordglobalSegmentCountFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.globalSegmentCountFactor">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        le poids du nombre de segments utilisé lors de l'équilibrage des segments entre les queryNodes      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentCountMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.segmentCountMaxSteps</code><button data-href="#queryCoordsegmentCountMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        générateur de plan basé sur le nombre de segments pas max   </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrowCountMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.rowCountMaxSteps</code><button data-href="#queryCoordrowCountMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.rowCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        pas max du générateur de plan basé sur le décompte des segments      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordrandomMaxSteps" class="common-anchor-header"><code translate="no">queryCoord.randomMaxSteps</code><button data-href="#queryCoordrandomMaxSteps" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.randomMaxSteps">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        pas maximum du générateur de plan basé sur le nombre de segments      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrowingRowCountWeight" class="common-anchor-header"><code translate="no">queryCoord.growingRowCountWeight</code><button data-href="#queryCoordgrowingRowCountWeight" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.growingRowCountWeight">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        le poids en mémoire du nombre de rangées de segments croissants      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoorddelegatorMemoryOverloadFactor" class="common-anchor-header"><code translate="no">queryCoord.delegatorMemoryOverloadFactor</code><button data-href="#queryCoorddelegatorMemoryOverloadFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.delegatorMemoryOverloadFactor">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        le facteur de la mémoire surchargée du délégateur      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbalanceCostThreshold" class="common-anchor-header"><code translate="no">queryCoord.balanceCostThreshold</code><button data-href="#queryCoordbalanceCostThreshold" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.balanceCostThreshold">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Seuil du coût d'équilibrage, si la différence de coût du groupe après l'exécution du plan d'équilibrage est inférieure à cette valeur, le plan ne sera pas exécuté.      </td>
      <td>0.001</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordchannelTaskTimeout" class="common-anchor-header"><code translate="no">queryCoord.channelTaskTimeout</code><button data-href="#queryCoordchannelTaskTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.channelTaskTimeout">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        1 minute      </td>
      <td>60000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordsegmentTaskTimeout" class="common-anchor-header"><code translate="no">queryCoord.segmentTaskTimeout</code><button data-href="#queryCoordsegmentTaskTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.segmentTaskTimeout">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        2 minutes      </td>
      <td>120000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordheartbeatAvailableInterval" class="common-anchor-header"><code translate="no">queryCoord.heartbeatAvailableInterval</code><button data-href="#queryCoordheartbeatAvailableInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.heartbeatAvailableInterval">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        10s, Seuls les QueryNodes qui ont récupéré des battements de cœur pendant cette durée sont disponibles.      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoorddistRequestTimeout" class="common-anchor-header"><code translate="no">queryCoord.distRequestTimeout</code><button data-href="#queryCoorddistRequestTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.distRequestTimeout">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Délai d'attente pour la distribution des données de querycoord à partir des querynodes, en millisecondes.      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordheatbeatWarningLag" class="common-anchor-header"><code translate="no">queryCoord.heatbeatWarningLag</code><button data-href="#queryCoordheatbeatWarningLag" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.heatbeatWarningLag">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        la valeur du délai pour l'avertissement du rapport de querycoord lorsque le dernier battement de chaleur est trop ancien, en millisecondes      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckHealthInterval" class="common-anchor-header"><code translate="no">queryCoord.checkHealthInterval</code><button data-href="#queryCoordcheckHealthInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkHealthInterval">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        3s, l'intervalle pendant lequel la coordination des requêtes tente de vérifier l'état de santé du nœud de requête      </td>
      <td>3000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckHealthRPCTimeout" class="common-anchor-header"><code translate="no">queryCoord.checkHealthRPCTimeout</code><button data-href="#queryCoordcheckHealthRPCTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkHealthRPCTimeout">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        100ms, le délai d'attente du rpc de vérification de l'état de santé du nœud d'interrogation      </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordbrokerTimeout" class="common-anchor-header"><code translate="no">queryCoord.brokerTimeout</code><button data-href="#queryCoordbrokerTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.brokerTimeout">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5000ms, délai d'attente rpc du courtier querycoord      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcollectionRecoverTimes" class="common-anchor-header"><code translate="no">queryCoord.collectionRecoverTimes</code><button data-href="#queryCoordcollectionRecoverTimes" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.collectionRecoverTimes">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        si les délais de récupération de la collection atteignent la limite pendant l'état de chargement, la libérer      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordobserverTaskParallel" class="common-anchor-header"><code translate="no">queryCoord.observerTaskParallel</code><button data-href="#queryCoordobserverTaskParallel" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.observerTaskParallel">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        numéro de la tâche du répartiteur de l'observateur parallèle      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckAutoBalanceConfigInterval" class="common-anchor-header"><code translate="no">queryCoord.checkAutoBalanceConfigInterval</code><button data-href="#queryCoordcheckAutoBalanceConfigInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkAutoBalanceConfigInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        l'intervalle de vérification de la configuration de la balance automatique      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckNodeSessionInterval" class="common-anchor-header"><code translate="no">queryCoord.checkNodeSessionInterval</code><button data-href="#queryCoordcheckNodeSessionInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkNodeSessionInterval">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle (en secondes) de vérification de la session de cluster querynode      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgracefulStopTimeout" class="common-anchor-header"><code translate="no">queryCoord.gracefulStopTimeout</code><button data-href="#queryCoordgracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        secondes. forcer l'arrêt du nœud sans arrêt gracieux      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordenableStoppingBalance" class="common-anchor-header"><code translate="no">queryCoord.enableStoppingBalance</code><button data-href="#queryCoordenableStoppingBalance" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.enableStoppingBalance">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        si l'activation de l'arrêt de l'équilibre      </td>
      <td>vrai</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordchannelExclusiveNodeFactor" class="common-anchor-header"><code translate="no">queryCoord.channelExclusiveNodeFactor</code><button data-href="#queryCoordchannelExclusiveNodeFactor" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.channelExclusiveNodeFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        le numéro de nœud le plus bas pour activer le mode exclusif du canal     </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcollectionObserverInterval" class="common-anchor-header"><code translate="no">queryCoord.collectionObserverInterval</code><button data-href="#queryCoordcollectionObserverInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.collectionObserverInterval">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        l'intervalle de l'observateur de la collecte      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcheckExecutedFlagInterval" class="common-anchor-header"><code translate="no">queryCoord.checkExecutedFlagInterval</code><button data-href="#queryCoordcheckExecutedFlagInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.checkExecutedFlagInterval">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalle de contrôle du drapeau exécuté pour forcer le retrait de la dist.     </td>
      <td>100</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordupdateCollectionLoadStatusInterval" class="common-anchor-header"><code translate="no">queryCoord.updateCollectionLoadStatusInterval</code><button data-href="#queryCoordupdateCollectionLoadStatusInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.updateCollectionLoadStatusInterval">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5m, intervalle maximum pour la mise à jour de l'état de chargement de la collecte      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordcleanExcludeSegmentInterval" class="common-anchor-header"><code translate="no">queryCoord.cleanExcludeSegmentInterval</code><button data-href="#queryCoordcleanExcludeSegmentInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.cleanExcludeSegmentInterval">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        la durée du segment d'exclusion du pipeline propre utilisé pour filtrer les données non valides, en secondes      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordip" class="common-anchor-header"><code translate="no">queryCoord.ip</code><button data-href="#queryCoordip" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.ip">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Adresse TCP/IP de queryCoord. Si elle n'est pas spécifiée, la première adresse non diffusable est utilisée.      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordport" class="common-anchor-header"><code translate="no">queryCoord.port</code><button data-href="#queryCoordport" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Port TCP du queryCoord      </td>
      <td>19531</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.serverMaxSendSize</code><button data-href="#queryCoordgrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille maximale de chaque requête RPC que le queryCoord peut envoyer, unité : octet     </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.serverMaxRecvSize</code><button data-href="#queryCoordgrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Taille maximale de chaque requête RPC que le queryCoord peut recevoir, unité : octet     </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.clientMaxSendSize</code><button data-href="#queryCoordgrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        La taille maximale de chaque requête RPC que les clients du queryCoord peuvent envoyer, unité : byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="queryCoordgrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">queryCoord.grpc.clientMaxRecvSize</code><button data-href="#queryCoordgrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="queryCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        La taille maximale de chaque requête RPC que les clients sur queryCoord peuvent recevoir, unité : byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
