---
id: warm-up.md
title: RéchauffementCompatible with Milvus 2.6.4+
summary: >-
  Dans Milvus, Warm Up complète Tiered Storage en éliminant la latence de
  premier accès qui se produit lorsque des données froides sont consultées pour
  la première fois. Une fois configuré, Warm Up précharge des champs ou des
  index sélectionnés dans le cache avant qu'un segment ne devienne
  interrogeable, ce qui garantit que les données fréquemment consultées sont
  disponibles immédiatement après le chargement.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Réchauffement<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, <strong>Warm Up</strong> complète Tiered Storage en éliminant la latence de premier accès qui se produit lorsque des données froides sont accédées pour la première fois. Une fois configuré, Warm Up précharge des champs ou des index sélectionnés dans le cache avant qu'un segment ne devienne interrogeable, ce qui garantit que les données fréquemment consultées sont disponibles immédiatement après le chargement.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Pourquoi réchauffer<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/fr/tiered-storage-overview.md#Lazy-load">Lazy Load</a> dans Tiered Storage améliore l'efficacité en ne chargeant initialement que les métadonnées. Cependant, cela peut entraîner un temps de latence lors de la première requête sur des données froides, car les blocs ou les index requis doivent être récupérés à partir du stockage objet.</p>
<p><strong>Warm Up</strong> résout ce problème en mettant proactivement en cache les données critiques lors de l'initialisation du segment.</p>
<p>Il est particulièrement utile dans les cas suivants</p>
<ul>
<li><p>Certains <strong>index scalaires</strong> sont fréquemment utilisés dans les conditions de filtrage.</p></li>
<li><p><strong>Les index vectoriels</strong> sont essentiels pour les performances de recherche et doivent être prêts immédiatement.</p></li>
<li><p><strong>La latence de démarrage à froid</strong> après le redémarrage du QueryNode ou le chargement d'un nouveau segment est inacceptable.</p></li>
</ul>
<p>En revanche, le réchauffement <strong>n'</strong> est <strong>pas recommandé</strong> pour les champs ou les index rarement interrogés. La désactivation de la fonction Warm Up réduit le temps de chargement des segments et préserve l'espace du cache, ce qui est idéal pour les grands champs vectoriels ou les champs scalaires non critiques.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Le réchauffement est contrôlé sous <code translate="no">queryNode.segcore.tieredStorage.warmup</code> dans <code translate="no">milvus.yaml</code>. Vous pouvez le configurer séparément pour les champs scalaires, les index scalaires, les champs vectoriels et les index vectoriels. Chaque cible prend en charge deux modes :</p>
<table>
   <tr>
     <th><p>Mode</p></th>
     <th><p>Mode Description</p></th>
     <th><p>Scénario typique</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code> (par défaut)</p></td>
     <td><p>Préchargement avant que le segment ne devienne interrogeable. Le temps de chargement augmente légèrement, mais la première requête n'entraîne aucune latence.</p></td>
     <td><p>À utiliser pour les données critiques en termes de performances qui doivent être immédiatement disponibles, telles que les index scalaires à haute fréquence ou les index vectoriels clés utilisés dans la recherche.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Sauter le préchargement. Le segment devient interrogeable plus rapidement, mais la première requête peut déclencher un chargement à la demande.</p></td>
     <td><p>À utiliser pour les données volumineuses ou rarement consultées, telles que les champs vectoriels bruts ou les champs scalaires non critiques.</p></td>
   </tr>
</table>
<p><strong>Exemple YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - &quot;sync&quot;: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - &quot;disable&quot;: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to &quot;sync&quot;, except for vector field which defaults to &quot;disable&quot;.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Valeurs</p></th>
     <th><p>Description des paramètres</p></th>
     <th><p>Cas d'utilisation recommandé</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Contrôle si les données des champs scalaires sont préchargées.</p></td>
     <td><p>N'utilisez <code translate="no">sync</code> que si les champs scalaires sont petits et fréquemment consultés dans les filtres. Sinon, <code translate="no">disable</code> pour réduire le temps de chargement.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Contrôle si les index scalaires sont préchargés.</p></td>
     <td><p>Utilisez <code translate="no">sync</code> pour les index scalaires impliqués dans des conditions de filtrage fréquentes ou des requêtes de plage.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Contrôle si les données des champs vectoriels sont préchargées.</p></td>
     <td><p>Généralement <code translate="no">disable</code> pour éviter une utilisation intensive du cache. Activez <code translate="no">sync</code> uniquement lorsque les vecteurs bruts doivent être récupérés immédiatement après la recherche (par exemple, résultats de similarité avec rappel de vecteur).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Contrôle si les index de vecteurs sont préchargés.</p></td>
     <td><p>Utilisez <code translate="no">sync</code> pour les index vectoriels qui sont essentiels à la latence de la recherche. Dans les charges de travail par lots ou à faible fréquence, <code translate="no">disable</code> pour une préparation plus rapide des segments.</p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">Meilleures pratiques<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Le préchauffage n'affecte que le <strong>chargement initial</strong>. Si les données mises en cache sont expulsées ultérieurement, la requête suivante les rechargera à la demande.</p>
<ul>
<li><p>Évitez d'abuser de <code translate="no">sync</code>. Le préchargement d'un trop grand nombre de champs augmente le temps de chargement et la pression sur le cache.</p></li>
<li><p>Commencez de manière prudente : activez Warm Up uniquement pour les champs et les index auxquels on accède fréquemment.</p></li>
<li><p>Surveillez la latence des requêtes et les mesures du cache, puis augmentez le préchargement si nécessaire.</p></li>
<li><p>Pour les charges de travail mixtes, appliquez <code translate="no">sync</code> aux collections sensibles aux performances et <code translate="no">disable</code> aux collections orientées vers la capacité.</p></li>
</ul>
