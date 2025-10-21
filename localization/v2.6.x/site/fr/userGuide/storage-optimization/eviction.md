---
id: eviction.md
title: EvictionCompatible with Milvus 2.6.4+
summary: >-
  L'éviction gère les ressources du cache de chaque nœud de requête dans Milvus.
  Lorsqu'elle est activée, elle supprime automatiquement les données mises en
  cache lorsque les seuils de ressources sont atteints, ce qui garantit des
  performances stables et empêche l'épuisement de la mémoire ou du disque.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Eviction<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>L'éviction gère les ressources de cache de chaque nœud de requête dans Milvus. Lorsqu'elle est activée, elle supprime automatiquement les données mises en cache lorsque les seuils de ressources sont atteints, ce qui garantit des performances stables et empêche l'épuisement de la mémoire ou du disque.</p>
<p>L'éviction utilise une politique de <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">moindre utilisation (LRU)</a> pour récupérer l'espace du cache. Les métadonnées sont toujours mises en cache et ne sont jamais évacuées, car elles sont essentielles pour la planification des requêtes et sont généralement de petite taille.</p>
<div class="alert note">
<p>L'éviction doit être explicitement activée. Sans configuration, les données mises en cache continueront à s'accumuler jusqu'à ce que les ressources soient épuisées.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Types d'éviction<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge deux modes d'éviction complémentaires<strong>(synchrone</strong> et <strong>asynchrone</strong>) qui fonctionnent ensemble pour une gestion optimale des ressources :</p>
<table>
   <tr>
     <th><p>Aspect</p></th>
     <th><p>Éviction synchrone</p></th>
     <th><p>Éviction asynchrone</p></th>
   </tr>
   <tr>
     <td><p>Déclenchement</p></td>
     <td><p>Pendant une requête ou une recherche, lorsque l'utilisation de la mémoire/du disque dépasse les limites internes.</p></td>
     <td><p>Le thread d'arrière-plan vérifie périodiquement l'utilisation et déclenche l'éviction lorsque le filigrane est dépassé.</p></td>
   </tr>
   <tr>
     <td><p>Comportement</p></td>
     <td><p>L'exécution de la requête est interrompue pendant que le cache est récupéré. L'expulsion se poursuit jusqu'à ce que l'utilisation passe sous le seuil inférieur.</p></td>
     <td><p>Exécution continue en arrière-plan ; suppression des données lorsque l'utilisation dépasse le filigrane élevé jusqu'à ce qu'elle tombe en dessous du filigrane bas. Les requêtes ne sont pas bloquées.</p></td>
   </tr>
   <tr>
     <td><p>Idéal pour</p></td>
     <td><p>Les charges de travail qui peuvent tolérer de brefs pics de latence ou lorsque l'éviction asynchrone ne peut pas récupérer l'espace assez rapidement.</p></td>
     <td><p>Charges de travail sensibles à la latence et nécessitant des performances régulières. Idéal pour une gestion proactive des ressources.</p></td>
   </tr>
   <tr>
     <td><p>Avertissement</p></td>
     <td><p>Ajoute de la latence aux requêtes en cours. Peut entraîner des dépassements de délai si le nombre de données récupérables est insuffisant.</p></td>
     <td><p>Nécessite des filigranes correctement réglés. Légère surcharge des ressources en arrière-plan.</p></td>
   </tr>
   <tr>
     <td><p>Configuration</p></td>
     <td><p>Activé via <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Activé via <code translate="no">backgroundEvictionEnabled: true</code> (nécessite <code translate="no">evictionEnabled: true</code>)</p></td>
   </tr>
</table>
<p><strong>Configuration recommandée</strong>:</p>
<p>Activez les deux modes pour un équilibre optimal. L'éviction asynchrone gère l'utilisation du cache de manière proactive, tandis que l'éviction synchrone agit comme une solution de secours lorsque les ressources sont presque épuisées.</p>
<div class="alert note">
<p>Pour les champs et les index évitables, l'unité d'éviction correspond à la granularité de chargement : les champs scalaires/vectoriels sont évincés par bloc, et les index scalaires/vectoriels sont évincés par segment.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Activer l'éviction<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Configurez l'éviction sous <code translate="no">queryNode.segcore.tieredStorage</code> à l'adresse <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Type de paramètre</p></th>
     <th><p>Valeurs</p></th>
     <th><p>Description du cas d'utilisation</p></th>
     <th><p>Cas d'utilisation recommandé</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Interrupteur principal pour la stratégie d'éviction. La valeur par défaut est <code translate="no">false</code>. Active le mode d'éviction par synchronisation.</p></td>
     <td><p>Toujours défini sur <code translate="no">true</code> dans le stockage par paliers.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Exécute l'éviction de manière asynchrone en arrière-plan. Nécessite <code translate="no">evictionEnabled: true</code>. La valeur par défaut est <code translate="no">false</code>.</p></td>
     <td><p>Utilisez <code translate="no">true</code> pour une meilleure performance des requêtes ; cela réduit la fréquence d'éviction synchrone.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Configuration des filigranes<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Les points de repère définissent le moment où l'éviction du cache commence et se termine pour la mémoire et le disque. Chaque type de ressource dispose de deux seuils :</p>
<ul>
<li><p><strong>Filigrane élevé</strong>: L'éviction asynchrone commence lorsque l'utilisation dépasse cette valeur.</p></li>
<li><p><strong>Filigrane bas</strong>: L'éviction se poursuit jusqu'à ce que l'utilisation tombe en dessous de cette valeur.</p></li>
</ul>
<div class="alert note">
<p>Cette configuration ne prend effet que lorsque <a href="/docs/fr/eviction.md#Enable-eviction">l'éviction est activée</a>.</p>
</div>
<p><strong>Exemple YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Type de paramètre</p></th>
     <th><p>Plage</p></th>
     <th><p>Description de la configuration</p></th>
     <th><p>Cas d'utilisation recommandé</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>float (flotteur)</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Niveau d'utilisation de la mémoire où l'éviction s'arrête.</p></td>
     <td><p>Commencer à <code translate="no">0.75</code>. Diminuer légèrement si la mémoire du QueryNode est limitée.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Niveau d'utilisation de la mémoire où l'éviction asynchrone commence.</p></td>
     <td><p>Commence à <code translate="no">0.8</code>. Maintenir un écart raisonnable par rapport au filigrane bas (par exemple, 0,05-0,10) afin d'éviter des déclenchements fréquents.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>flottant</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Niveau d'utilisation du disque où l'expulsion s'arrête.</p></td>
     <td><p>Commencez à <code translate="no">0.75</code>. Ajuster à la baisse si les E/S disque sont limitées.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Niveau d'utilisation du disque où l'éviction asynchrone commence.</p></td>
     <td><p>Commence à <code translate="no">0.8</code>. Maintenez un écart raisonnable par rapport au filigrane inférieur (par exemple, 0,05-0,10) afin d'éviter des déclenchements fréquents.</p></td>
   </tr>
</table>
<p><strong>Meilleures pratiques</strong>:</p>
<ul>
<li><p>Ne pas fixer les filigranes haut et bas au-dessus de ~0,80 pour laisser une marge de manœuvre pour l'utilisation statique du QueryNode et les rafales de requêtes.</p></li>
<li><p>Évitez les grands écarts entre les filigranes haut et bas ; les grands écarts prolongent chaque cycle d'éviction et peuvent ajouter de la latence.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Configurer le TTL du cache<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>La durée de vie du cache (TTL)</strong> supprime automatiquement les données mises en cache après une durée déterminée, même si les seuils de ressources ne sont pas atteints. Il fonctionne en parallèle avec l'éviction LRU pour empêcher les données périmées d'occuper le cache indéfiniment.</p>
<div class="alert note">
<p>Cache TTL nécessite <code translate="no">backgroundEvictionEnabled: true</code>, car il s'exécute sur le même thread d'arrière-plan.</p>
</div>
<p><strong>Exemple YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Type de paramètre</p></th>
     <th><p>Unité</p></th>
     <th><p>Description de l'unité</p></th>
     <th><p>Cas d'utilisation recommandé</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>entier</p></td>
     <td><p>secondes</p></td>
     <td><p>Durée avant l'expiration des données mises en cache. Les éléments expirés sont supprimés en arrière-plan.</p></td>
     <td><p>Utilisez un TTL court (heures) pour les données très dynamiques ; utilisez un TTL long (jours) pour les ensembles de données stables. Définissez 0 pour désactiver l'expiration basée sur le temps.</p></td>
   </tr>
</table>
<h2 id="Configure-overcommit-ratio" class="common-anchor-header">Configuration du taux de surengagement<button data-href="#Configure-overcommit-ratio" class="anchor-icon" translate="no">
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
    </button></h2><p>Les ratios d'overcommit définissent la part du cache réservée à l'éviction, ce qui permet aux QueryNodes de dépasser temporairement la capacité normale avant que l'éviction ne s'intensifie.</p>
<div class="alert note">
<p>Cette configuration ne prend effet que lorsque <a href="/docs/fr/eviction.md#Enable-eviction">l'éviction est activée</a>.</p>
</div>
<p><strong>Exemple YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Evictable Memory Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of physical memory is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-comment"># Evictable Disk Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of disk capacity is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Type de paramètre</p></th>
     <th><p>Fourchette</p></th>
     <th><p>Description de la configuration</p></th>
     <th><p>Cas d'utilisation recommandé</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictableMemoryCacheRatio</code></p></td>
     <td><p>flottant</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Partie de la mémoire cache allouée aux données pouvant être supprimées.</p></td>
     <td><p>Démarrage à <code translate="no">0.3</code>. Augmenter (0,5-0,7) pour une fréquence d'éviction plus faible ; diminuer (0,1-0,2) pour une capacité de segment plus élevée.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">evictableDiskCacheRatio</code></p></td>
     <td><p>flottant</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>Partie du cache du disque allouée aux données pouvant être évincées.</p></td>
     <td><p>Utiliser des ratios similaires à ceux de la mémoire, sauf si les E/S disque deviennent un goulot d'étranglement.</p></td>
   </tr>
</table>
<p><strong>Comportement limite</strong>:</p>
<ul>
<li><p><code translate="no">1.0</code>: Tout le cache est évitable - l'éviction se déclenche rarement, mais il y a moins de segments par noeud de requête.</p></li>
<li><p><code translate="no">0.0</code>: Pas de cache évitable - l'éviction se produit fréquemment ; davantage de segments peuvent être traités, mais la latence peut augmenter.</p></li>
</ul>
