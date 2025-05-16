---
id: time_sync.md
title: Synchronisation du temps
summary: Découvrez le système de synchronisation temporelle de Milvus.
---
<h1 id="Time-Synchronization" class="common-anchor-header">Synchronisation temporelle<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente le mécanisme de synchronisation temporelle dans Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Les événements dans Milvus peuvent généralement être classés en deux catégories :</p>
<ul>
<li><p>Les événements du langage de définition des données (DDL) : créer/supprimer une collection, créer/supprimer une partition, etc.</p></li>
<li><p>Événements du langage de manipulation des données (DML) : insertion, recherche, etc.</p></li>
</ul>
<p>Tout événement, qu'il s'agisse d'un événement DDL ou DML, est marqué d'un horodatage qui peut indiquer le moment où il s'est produit.</p>
<p>Supposons que deux utilisateurs lancent une série d'événements DML et DDL dans Milvus dans l'ordre chronologique indiqué dans le tableau suivant.</p>
<table>
<thead>
<tr><th style="text-align:center">Horodatage</th><th style="text-align:center">Utilisateur 1</th><th style="text-align:center">Utilisateur 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">Création d'une collection nommée <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">Effectue une recherche sur la collection <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">Insertion des données <code translate="no">A1</code> dans la collection <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">Effectué une recherche sur la collection <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">Insertion des données <code translate="no">A2</code> dans la collection <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">Effectue une recherche sur la collection <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">Suppression des données <code translate="no">A1</code> de la collection <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">Effectué une recherche sur la collection <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>Idéalement, l'utilisateur 2 devrait être en mesure de voir :</p>
<ul>
<li><p>Une collection vide <code translate="no">C0</code> à <code translate="no">t2</code>.</p></li>
<li><p>Les données <code translate="no">A1</code> à <code translate="no">t7</code>.</p></li>
<li><p>Les données <code translate="no">A1</code> et <code translate="no">A2</code> sur <code translate="no">t12</code>.</p></li>
<li><p>Seulement les données <code translate="no">A2</code> à <code translate="no">t17</code> (car les données <code translate="no">A1</code> ont été supprimées de la collection avant ce point).</p></li>
</ul>
<p>Ce scénario idéal peut être facilement réalisé lorsqu'il n'y a qu'un seul nœud. Cependant, Milvus est une base de données vectorielle distribuée et, pour garantir que toutes les opérations DML et DDL dans les différents nœuds sont maintenues en ordre, Milvus doit résoudre les deux problèmes suivants :</p>
<ol>
<li><p>L'horloge est différente pour les deux utilisateurs de l'exemple ci-dessus s'ils se trouvent sur des nœuds différents. Par exemple, si l'utilisateur 2 a 24 heures de retard sur l'utilisateur 1, toutes les opérations de l'utilisateur 1 ne sont pas visibles pour l'utilisateur 2 avant le lendemain.</p></li>
<li><p>Il peut y avoir une latence du réseau. Si l'utilisateur 2 effectue une recherche sur la collection <code translate="no">C0</code> à l'adresse <code translate="no">t17</code>, Milvus doit pouvoir garantir que toutes les opérations avant <code translate="no">t17</code> sont traitées et terminées avec succès. Si l'opération de suppression à <code translate="no">t15</code> est retardée en raison de la latence du réseau, il est très probable que l'utilisateur 2 puisse encore voir les données prétendument supprimées <code translate="no">A1</code> lorsqu'il effectue une recherche à <code translate="no">t17</code>.</p></li>
</ol>
<p>Milvus adopte donc un système de synchronisation temporelle (timetick) pour résoudre ces problèmes.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">Oracle d'horodatage (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour résoudre le premier problème mentionné dans la section précédente, Milvus, comme d'autres systèmes distribués, fournit un service d'oracle d'horodatage (TSO). Cela signifie que tous les événements de Milvus doivent être affectés d'un horodatage provenant de TSO plutôt que de l'horloge locale.</p>
<p>Le service TSO est fourni par le coordinateur racine de Milvus. Les clients peuvent attribuer un ou plusieurs horodatages dans une seule demande d'attribution d'horodatage.</p>
<p>Un horodatage TSO est un type de valeur <code translate="no">uint64</code> qui se compose d'une partie physique et d'une partie logique. La figure ci-dessous illustre le format d'un horodatage.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>Comme illustré, les 46 bits du début constituent la partie physique, à savoir le temps UTC en millisecondes. Les 18 derniers bits constituent la partie logique.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">Système de synchronisation temporelle (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section utilise l'exemple d'une opération d'insertion de données pour expliquer le mécanisme de synchronisation temporelle dans Milvus.</p>
<p>Lorsque le proxy reçoit une demande d'insertion de données du SDK, il divise les messages d'insertion en différents flux de messages (<code translate="no">MsgStream</code>) en fonction de la valeur de hachage des clés primaires.</p>
<p>Chaque message d'insertion (<code translate="no">InsertMsg</code>) se voit attribuer un horodatage avant d'être envoyé à <code translate="no">MsgStream</code>.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> est une enveloppe de la file d'attente de messages, qui est Pulsar par défaut dans Milvus 2.0.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>Un principe général est que dans <code translate="no">MsgStream</code>, les horodatages de<code translate="no">InsertMsgs</code> provenant du même proxy doivent être incrémentaux. Cependant, il n'existe pas de règle de ce type pour les <code translate="no">InsertMsgs</code> provenant de mandataires différents.</p>
<p>La figure suivante est un exemple de <code translate="no">InsertMsgs</code> dans un <code translate="no">MsgStream</code>. Le snippet contient cinq <code translate="no">InsertMsgs</code>, dont trois proviennent de <code translate="no">Proxy1</code> et le reste de <code translate="no">Proxy2</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>Les horodatages des trois <code translate="no">InsertMsgs</code> provenant de <code translate="no">Proxy1</code> sont incrémentaux, de même que les deux <code translate="no">InsertMsgs</code> provenant de <code translate="no">Proxy2</code>. Cependant, il n'y a pas d'ordre particulier entre <code translate="no">Proxy1</code> et <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> .</p>
<p>Un scénario possible est que, lors de la lecture d'un message portant l'horodatage <code translate="no">110</code> à partir de <code translate="no">Proxy2</code>, Milvus constate que le message portant l'horodatage <code translate="no">80</code> à partir de <code translate="no">Proxy1</code> est toujours dans <code translate="no">MsgStream</code>. Par conséquent, Milvus introduit un système de synchronisation temporelle, timetick, pour garantir que, lors de la lecture d'un message à partir de <code translate="no">MsgStream</code>, tous les messages avec des valeurs d'horodatage plus petites doivent être consommés.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>synchronisation_temporelle</span> </span></p>
<p>Comme le montre la figure ci-dessus,</p>
<ul>
<li><p>Chaque proxy signale périodiquement (toutes les 200 ms par défaut) la plus grande valeur d'horodatage du dernier <code translate="no">InsertMsg</code> dans le <code translate="no">MsgStream</code>à la coordonnée racine.</p></li>
<li><p>Le coordonnateur racine identifie la valeur minimale de l'horodatage sur ce site <code translate="no">Msgstream</code>, quel que soit le proxy auquel appartient le site <code translate="no">InsertMsgs</code>. Ensuite, le coordonnateur racine insère cet horodatage minimum dans le site <code translate="no">Msgstream</code>. Cet horodatage est également appelé "timetick".</p></li>
<li><p>Lorsque les composants consommateurs lisent le timetick inséré par le coordonnateur racine, ils comprennent que tous les messages d'insertion avec des valeurs d'horodatage inférieures ont été consommés. Par conséquent, les demandes pertinentes peuvent être exécutées en toute sécurité sans interrompre l'ordre.</p></li>
</ul>
<p>La figure suivante est un exemple du site <code translate="no">Msgstream</code> avec l'insertion d'un timetick.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>timetick</span> </span></p>
<p><code translate="no">MsgStream</code> traite les messages par lots en fonction du time tick afin de s'assurer que les messages de sortie répondent aux exigences de l'horodatage.</p>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Découvrez le concept d'<a href="/docs/fr/v2.4.x/timestamp.md">horodatage</a>.</li>
<li>Découvrir le <a href="/docs/fr/v2.4.x/data_processing.md">flux de traitement des données</a> dans Milvus.</li>
</ul>
