---
id: force-merge.md
title: Compactage par fusion forcéeCompatible with Milvus 3.0.x
summary: >-
  Utilisez la compactation par fusion forcée pour regrouper les petits segments
  et améliorer les performances des requêtes ainsi que l'efficacité du stockage.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compactage par fusion forcée<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>La fusion forcée est conçue pour regrouper les segments petits et fragmentés en un nombre réduit de segments plus volumineux, afin d'améliorer les performances des requêtes et l'efficacité du stockage. Ce guide explique comment utiliser la compaction par fusion forcée.</p>
<div class="alert note">
<p>Cette fonctionnalité est en préversion publique. Ne l'utilisez pas dans des environnements de production.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">maxSize</code> L <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">a compaction</a> standard maintient la taille des segments proche de l’ <code translate="no">maxSize</code> ie configurée grâce à des fusions « plusieurs vers un », mais elle peut néanmoins laisser des fragments de taille moyenne qui ne peuvent pas être fusionnés davantage sans dépasser les limites. Par exemple, comme illustré ci-dessous, si une collection comporte cinq segments de 2 Mo et que l’ est de 3 Mo, la fusion de deux segments quelconques dépasserait la limite ; la compaction standard ne peut donc pas réduire davantage le nombre de segments et la structure fragmentée persiste.</p>
<p>La fusion forcée ajoute un paramètre « <code translate="no">target_size</code> » et permet, dans la mesure du possible, de réorganiser les segments pour les amener à la taille souhaitée avec une tolérance très stricte. Comme illustré ci-dessous, si l’ <code translate="no">target_size</code> spécifiée est de 4 Mo, les cinq petits segments de 2 Mo peuvent être fusionnés en un nombre réduit de segments plus volumineux. Cela réduit le nombre de segments excédentaires, prend en charge des cibles supérieures aux paramètres par défaut d’ <code translate="no">maxSize</code>, et, lorsque la cible est très volumineuse, permet au système de choisir une taille de sortie et un nombre de segments adaptés au matériel actuel et à la topologie de QueryNode.</p>
<p>Pour savoir quelle méthode de compactage utiliser, consultez <a href="#faq">la FAQ</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>La compaction par fusion forcée étend l’API existante <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API existante avec un paramètre « <code translate="no">target_size</code> ». Elle est entièrement rétrocompatible : les appels de compactage existants sans « <code translate="no">target_size</code> » continuent de fonctionner comme auparavant.</p>
<p>La compaction par fusion forcée s’exécute de manière asynchrone. Elle ne bloque pas les opérations de recherche ou de requête, bien qu’elle consomme des ressources d’E/S et de mémoire pendant son exécution.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Utilisation de la compaction par fusion forcée<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus version 3.0 ou ultérieure</p></li>
<li><p>PyMilvus 3.0 ou version ultérieure</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Configuration globale<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Les paramètres de configuration suivants contrôlent le comportement de la fusion forcée. Définissez-les dans le fichier de configuration de Milvus ou via des variables d'environnement.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Valeur par défaut</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>Taille maximale par défaut d'un segment en Mo. Utilisée comme valeur cible lorsque ` <code translate="no">target_size</code> ` est égal à 0 ou omis. Sert également de valeur minimale autorisée pour l'option explicite ` <code translate="no">target_size</code>`.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Seuil du nombre de segments pour la sélection de l’algorithme. Lorsque le nombre de segments dépasse cette valeur, Milvus utilise un algorithme glouton plus rapide pour la planification de la fusion.</p><ul><li><p><strong>Algorithme standard</strong> (utilisé lorsque le nombre de segments est inférieur ou égal à <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>) : produit des résultats de fusion plus optimaux, mais le calcul prend plus de temps.</p></li><li><p><strong>Algorithme glouton</strong> (utilisé lorsque le nombre de segments est supérieur à <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>) : effectue la planification beaucoup plus rapidement, au prix d’un regroupement des segments légèrement moins optimal.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La mémoire du DataNode est divisée par ce facteur pour calculer la taille maximale de segment que le système peut autoriser.</p><ul><li><p>Une valeur plus élevée alloue moins de mémoire à la fusion mais en laisse davantage pour les autres opérations du DataNode, ce qui améliore la stabilité du nœud.</p></li><li><p>Une valeur plus faible permet des fusions plus importantes mais augmente la pression sur la mémoire.</p></li><li><p>Par exemple, avec le facteur par défaut de 4,0 et un DataNode doté de 16 Go de mémoire, le budget de fusion est de 4 Go. Cela signifie que la taille totale des segments fusionnés au cours d’une seule opération ne peut pas dépasser 4 Go.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4,0</p></td>
     <td><p>La mémoire minimale d’un QueryNode est divisée par ce facteur. Utilisé lors du calcul automatique de la taille (<code translate="no">target_size=max_int64</code>) pour garantir que les segments fusionnés puissent être chargés par les QueryNodes.</p><ul><li><p>Une valeur plus élevée produit des segments plus petits, plus faciles à charger pour les QueryNodes.</p></li><li><p>Une valeur plus faible autorise des segments plus volumineux, mais peut entraîner des échecs de chargement sur les QueryNodes disposant d’une mémoire limitée.</p></li><li><p>Par exemple, avec le facteur par défaut de 4,0 et le plus petit QueryNode disposant de 16 Go de mémoire, la taille cible calculée automatiquement ne dépassera pas 4 Go. Cela empêche la fonction « Force Merge » de produire des segments si volumineux que les QueryNodes ne pourraient pas les charger.</p></li></ul></td>
   </tr>
</table>
<p>Pour appliquer les modifications ci-dessus à votre cluster Milvus, veuillez suivre les étapes décrites dans les sections « <a href="/docs/fr/configure-helm.md#Configure-Milvus-via-configuration-file">Configurer Milvus avec Helm</a> » et « <a href="/docs/fr/configure_operator.md">Configurer Milvus avec les opérateurs Milvus</a> ».</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Déclencher la compaction « Force Merge »<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Vous déclenchez la compaction « Force Merge » en appelant ` <code translate="no">compact()</code> ` avec le paramètre ` <code translate="no">target_size</code> `. Pour plus de détails sur les paramètres, consultez la section « <a href="#parameter-reference">Référence des paramètres</a> » ci-dessous.</p>
<p>Trois modes de compactage « Force Merge » sont disponibles :</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>Voici quelques exemples illustrant l’utilisation de chaque mode de compactage par fusion forcée.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Par défaut (compactage standard)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Taille cible explicite</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Calcul automatique de la taille</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Référence des paramètres</h4><p>Le tableau suivant explique les paramètres.</p>
<table>
   <tr>
     <th><p><strong>Paramètre</strong></p></th>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Obligatoire. Nom de la collection à compacter.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Facultatif. Taille cible du segment en Mo. Il existe 3 options pour la valeur de ce paramètre :</p><ul><li><p><strong>0 ou omis</strong>: utilise la valeur configurée pour « <code translate="no">dataCoord.segment.maxSize</code> » (par défaut : 512 Mo). Équivaut à un compactage standard.</p></li><li><p><strong>Valeur explicite</strong>: fusionne les segments pour obtenir une taille approximative en Mo (par ex. 2048). Doit être supérieure ou égale à l’ <code translate="no">dataCoord.segment.maxSize</code> configurée.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: calcule automatiquement la taille optimale en fonction de la répartition actuelle des segments et des ressources disponibles sur le nœud.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Si l’ <code translate="no">target_size</code> spécifiée est inférieure à la valeur configurée <code translate="no">dataCoord.segment.maxSize</code>, la requête est rejetée avec une erreur.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Vérifier la progression de la compaction<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>La compaction « Force Merge » s’exécute de manière asynchrone. Utilisez l’ID de tâche renvoyé pour vérifier la progression :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Bonnes pratiques<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>N’utilisez pas la compaction par fusion forcée dans les environnements de production.</strong></p></li>
<li><p><strong>Utilisez le mode de calcul automatique de la taille dans la plupart des cas.</strong> En définissant ` <code translate="no">target_size</code> ` sur ` <code translate="no">max_int64</code> `, Milvus analyse la répartition de vos segments et les ressources des nœuds pour déterminer la taille optimale. C'est l'approche recommandée, sauf si vous avez des exigences spécifiques en matière de dimensionnement.</p></li>
<li><p><strong>Tenez compte du compromis en termes de performances.</strong> La compaction par fusion forcée est une opération gourmande en ressources. Elle lit, fusionne et réécrit les données des segments. Planifiez-la pendant les périodes de faible trafic afin de minimiser l’impact sur la latence des requêtes.</p></li>
<li><p><strong>Surveillez le nombre de segments avant et après l’opération.</strong> Utilisez <code translate="no">get_compaction_state()</code> et <code translate="no">list_persistent_segments</code> pour vérifier que la compaction a bien généré, comme prévu, un nombre réduit de segments plus volumineux.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>En quoi la compaction « Force Merge » diffère-t-elle de la compaction standard ?</strong></p>
<p>Ces deux types d’opérations de compactage ont des objectifs différents.</p>
<ul>
<li><p>La compaction standard (targetSize=0 ou omis) est un processus de nettoyage incrémental « au mieux ».</p></li>
<li><p>La « Force Merge » (targetSize &gt; 0) est un processus de reconditionnement au niveau de la collection visant à produire des segments moins nombreux, plus volumineux et proches de la taille cible.</p></li>
</ul>
<p>La principale différence réside dans la structure de la fusion : la compaction standard se résume en fait à m → 1 par tâche, tandis que la « Force Merge » correspond à m → n sur l’ensemble des entrées groupées. C’est pourquoi la « Force Merge » permet de résoudre des configurations de segments que la compaction standard ne peut pas traiter. Le tableau suivant compare ces deux types d’opérations.</p>
<table>
   <tr>
     <th><p><strong>Dimension</strong></p></th>
     <th><p><strong>Compactage standard (par défaut)</strong></p></th>
     <th><p><strong>Fusion forcée</strong></p></th>
   </tr>
   <tr>
     <td><p>Déclencheur API</p></td>
     <td><p>targetSize=0 (ou non défini), pas d’indicateur Major/L0</p></td>
     <td><p>targetSize &gt; 0 (Mo)</p></td>
   </tr>
   <tr>
     <td><p>Objectif principal</p></td>
     <td><p>Nettoyage incrémental des fragments évidents ; maintenance de routine</p></td>
     <td><p>Consolidation à l'échelle de la collection à des fins de recherche et d'équilibrage</p></td>
   </tr>
   <tr>
     <td><p>Source de la taille des segments</p></td>
     <td><p>Valeur fixe dataCoord.segment.maxSize (configuration du serveur)</p></td>
     <td><p>Valeur targetSize définie par l’utilisateur, puis limitée par maxSafeSize pour des raisons de sécurité</p></td>
   </tr>
   <tr>
     <td><p>Validité des paramètres</p></td>
     <td><p>Aucun réglage de la taille par l’utilisateur</p></td>
     <td><p>La valeur targetSize définie par l’utilisateur doit être &gt;= dataCoord.segment.maxSize ; sinon, elle est rejetée</p></td>
   </tr>
   <tr>
     <td><p>Limite supérieure de sécurité</p></td>
     <td><p>Limite de configuration uniquement</p></td>
     <td><p>maxSafeSize = min(mémoire du nœud de requête, mémoire du nœud de données) / facteur de mémoire (en mode autonome sans mise en commun : divisé par deux)</p></td>
   </tr>
   <tr>
     <td><p>Forme de fusion</p></td>
     <td><p>m → 1 par tâche, sortie ≤ configMaxSize</p></td>
     <td><p>m → n, sorties proches de targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportement des segments moyens</p></td>
     <td><p>Peut rester bloqué de manière permanente (par exemple, deux segments à 60 % ne peuvent légalement pas former un seul segment à 120 %)</p></td>
     <td><p>Le regroupement + la division fonctionnent ; pas de schéma de « blocage à 60 % »</p></td>
   </tr>
   <tr>
     <td><p>Capacité d’aplatissement de la collection</p></td>
     <td><p>Limitée ; des exécutions répétées peuvent encore laisser de nombreux segments de taille moyenne</p></td>
     <td><p>Forte ; conçue pour réduire le nombre de segments et augmenter le taux de remplissage</p></td>
   </tr>
   <tr>
     <td><p>Prise en compte de la topologie</p></td>
     <td><p>Aucune</p></td>
     <td><p>Oui ; utilise la disposition des nœuds de requête, des répliques et des fragments</p></td>
   </tr>
   <tr>
     <td><p>Réglage du parallélisme des chemins de lecture</p></td>
     <td><p>Aucun</p></td>
     <td><p>Ajuste le nombre de résultats à l'aide de queryNodeCount / (répliques × shards) lorsque cela est valide</p></td>
   </tr>
   <tr>
     <td><p>Cas d'utilisation typique</p></td>
     <td><p>Nettoyage quotidien à fort taux de rotation après des opérations d’écriture/suppression</p></td>
     <td><p>Préparation des tests de performance, optimisation des recherches, alignement du parallélisme de chargement</p></td>
   </tr>
   <tr>
     <td><p>Portée prévue</p></td>
     <td><p>Ne pas s’attendre à un reconditionnement de l’ensemble de la collection</p></td>
     <td><p>Conçu pour un réagencement au niveau de la collection</p></td>
   </tr>
</table>
<p><strong>Conseils de sélection :</strong></p>
<ul>
<li><p>Optez pour la compaction standard pour un nettoyage incrémental à faible risque.</p></li>
<li><p>Optez pour la fusion forcée lorsque vous souhaitez explicitement restructurer la collection en un nombre réduit de segments plus volumineux, adaptés au comportement de recherche et de chargement.</p></li>
</ul>
<p><strong>En quoi la « fusion forcée » diffère-t-elle de la compaction par regroupement ?</strong></p>
<p>La compaction par regroupement (<code translate="no">is_clustering=True</code>) réorganise les données au sein des segments en fonction d’une clé de regroupement afin d’améliorer l’élagage des requêtes. La fusion forcée (<code translate="no">target_size=N</code>) optimise la taille des segments sans modifier la répartition des données. Ces deux opérations ont des objectifs différents et peuvent être utilisées conjointement : lancez d’abord la compaction par regroupement pour organiser les données, puis la fusion forcée pour consolider les segments obtenus.</p>
<p><strong>Puis-je exécuter « Force Merge » sur une collection en cours d’interrogation ?</strong></p>
<p>Oui. « Force Merge » s’exécute de manière asynchrone et ne bloque pas les requêtes. Cependant, cette opération consomme des ressources DataNode et des ressources d’E/S disque ; la latence des requêtes peut donc augmenter pendant la compaction. Pour obtenir les meilleurs résultats, planifiez « Force Merge » pendant les périodes de faible trafic.</p>
<p><strong>Que se passe-t-il si je définis une valeur target_size inférieure à maxSize ?</strong></p>
<p>La requête est rejetée avec une erreur. La taille cible doit être supérieure ou égale à la valeur configurée pour ` <code translate="no">dataCoord.segment.maxSize</code>`.</p>
