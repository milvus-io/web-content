---
id: best-practices-for-tiered-storage.md
title: Meilleures pratiques pour le stockage hiérarchiséCompatible with Milvus 2.6.4+
summary: >-
  Milvus propose le stockage hiérarchisé pour vous aider à traiter efficacement
  les données à grande échelle tout en équilibrant la latence des requêtes, la
  capacité et l'utilisation des ressources. Ce guide résume les configurations
  recommandées pour les charges de travail typiques et explique le raisonnement
  qui sous-tend chaque stratégie de réglage.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">Meilleures pratiques pour le stockage hiérarchisé<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus propose le stockage hiérarchisé pour vous aider à traiter efficacement les données à grande échelle tout en équilibrant la latence des requêtes, la capacité et l'utilisation des ressources. Ce guide résume les configurations recommandées pour les charges de travail typiques et explique le raisonnement qui sous-tend chaque stratégie de réglage.</p>
<h2 id="Before-you-start" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 ou version ultérieure</p></li>
<li><p>Les QueryNodes doivent disposer de ressources locales dédiées (mémoire et disque). Les environnements partagés peuvent fausser l'estimation du cache et conduire à une mauvaise évaluation de l'éviction.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">Choisir la bonne stratégie<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Le stockage hiérarchisé offre des stratégies de chargement et de mise en cache flexibles qui peuvent être combinées pour s'adapter à votre charge de travail.</p>
<table>
   <tr>
     <th><p>Objectif</p></th>
     <th><p>Objectif recommandé</p></th>
     <th><p>Mécanisme clé</p></th>
   </tr>
   <tr>
     <td><p>Minimiser la latence de la première requête</p></td>
     <td><p>Précharger les champs critiques</p></td>
     <td><p>Réchauffement</p></td>
   </tr>
   <tr>
     <td><p>Traiter efficacement les données à grande échelle</p></td>
     <td><p>Chargement à la demande</p></td>
     <td><p>Chargement paresseux + chargement partiel</p></td>
   </tr>
   <tr>
     <td><p>Maintenir la stabilité à long terme</p></td>
     <td><p>Prévenir le débordement du cache</p></td>
     <td><p>Eviction</p></td>
   </tr>
   <tr>
     <td><p>Équilibrer les performances et la capacité</p></td>
     <td><p>Combiner la précharge et la mise en cache dynamique</p></td>
     <td><p>Configuration hybride</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">Scénario 1 : recherche en temps réel et à faible latence<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quand utiliser</strong></p>
<ul>
<li><p>Le temps de latence des requêtes est critique (par exemple, recommandation en temps réel ou classement des recherches).</p></li>
<li><p>Les index vectoriels de base et les filtres scalaires sont fréquemment consultés.</p></li>
<li><p>La constance des performances importe plus que la vitesse de démarrage</p></li>
</ul>
<p><strong>Configuration recommandée</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Raison d'être</strong></p>
<ul>
<li><p>L'échauffement élimine la latence du premier accès pour les index scalaires et vectoriels à haute fréquence.</p></li>
<li><p>L'éviction en arrière-plan maintient une pression stable sur le cache sans bloquer les requêtes.</p></li>
<li><p>La désactivation du TTL du cache évite les rechargements inutiles pour les données chaudes.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">Scénario 2 : analyse hors ligne par lots<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quand utiliser</strong></p>
<ul>
<li><p>La tolérance à la latence des requêtes est élevée</p></li>
<li><p>Les charges de travail impliquent des ensembles de données massifs ou de nombreux segments.</p></li>
<li><p>La capacité et le débit sont prioritaires par rapport à la réactivité.</p></li>
</ul>
<p><strong>Configuration recommandée</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Raison d'être</strong></p>
<ul>
<li><p>La désactivation de l'échauffement accélère le démarrage lors de l'initialisation de nombreux segments.</p></li>
<li><p>Des filigranes plus élevés permettent une utilisation plus dense du cache, ce qui améliore la capacité de charge totale.</p></li>
<li><p>Le TTL du cache nettoie automatiquement les données inutilisées pour libérer de l'espace local.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">Scénario 3 : déploiement hybride (mixte en ligne et hors ligne)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Quand utiliser</strong></p>
<ul>
<li><p>Un seul cluster sert à la fois les charges de travail en ligne et analytiques.</p></li>
<li><p>Certaines collections nécessitent une faible latence, d'autres privilégient la capacité.</p></li>
</ul>
<p><strong>Stratégie recommandée</strong></p>
<ul>
<li><p>Appliquer la <strong>configuration en temps réel</strong> aux collections sensibles à la latence</p></li>
<li><p>Appliquer la <strong>configuration hors ligne</strong> aux collections analytiques ou d'archivage</p></li>
<li><p>Ajuster les ratios evictableMemoryCacheRatio, cacheTtl et watermark indépendamment pour chaque type de charge de travail.</p></li>
</ul>
<p><strong>Raison d'être</strong></p>
<p>La combinaison des configurations permet un contrôle fin de l'allocation des ressources.</p>
<p>Les collections critiques conservent des garanties de faible latence, tandis que les collections secondaires peuvent gérer davantage de segments et de volumes de données.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">Conseils de réglage supplémentaires<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Aspect</p></th>
     <th><p>Recommandation</p></th>
     <th><p>Explication</p></th>
   </tr>
   <tr>
     <td><p><strong>Périmètre d'échauffement</strong></p></td>
     <td><p>Ne préchargez que les champs ou les index dont la fréquence de requête est élevée.</p></td>
     <td><p>Le préchargement inutile augmente le temps de chargement et l'utilisation des ressources.</p></td>
   </tr>
   <tr>
     <td><p><strong>Réglage de l'éviction</strong></p></td>
     <td><p>Commencez par les filigranes par défaut (75-80 %) et ajustez-les progressivement.</p></td>
     <td><p>Un petit écart entraîne une éviction fréquente ; un grand écart retarde la libération des ressources.</p></td>
   </tr>
   <tr>
     <td><p><strong>TTL du cache</strong></p></td>
     <td><p>Désactiver pour les ensembles de données stables et chaudes ; activer (par exemple, 1 à 3 jours) pour les données dynamiques.</p></td>
     <td><p>Empêche l'accumulation de cache périmé tout en équilibrant la charge de nettoyage.</p></td>
   </tr>
   <tr>
     <td><p><strong>Taux de surengagement</strong></p></td>
     <td><p>Éviter les valeurs &gt; 0,7, sauf si la marge de manœuvre des ressources est importante.</p></td>
     <td><p>Un surengagement excessif peut entraîner un battement du cache et une latence instable.</p></td>
   </tr>
   <tr>
     <td><p><strong>Surveillance</strong></p></td>
     <td><p>Suivre le taux de réussite du cache, l'utilisation des ressources et la fréquence d'éviction.</p></td>
     <td><p>Des charges à froid fréquentes peuvent indiquer que le réchauffement ou les filigranes doivent être ajustés.</p></td>
   </tr>
</table>
