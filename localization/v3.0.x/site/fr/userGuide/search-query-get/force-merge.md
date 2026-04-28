---
id: force-merge.md
title: Compaction de Force MergeCompatible with Milvus 3.0.x
summary: >-
  Utilisez le compactage par fusion forcée pour consolider les petits segments
  et améliorer les performances des requêtes et l'efficacité du stockage.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compaction de Force Merge<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge est conçu pour consolider les petits segments fragmentés en segments plus petits et plus grands afin d'améliorer les performances des requêtes et l'efficacité du stockage. Ce guide explique comment utiliser le compactage par fusion forcée.</p>
<div class="alert note">
<p>Cette fonctionnalité est en avant-première publique. Ne l'utilisez pas dans les environnements de production.</p>
</div>
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
    </button></h2><p>Le <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">compactage</a> standard maintient la taille des segments près de la valeur configurée <code translate="no">maxSize</code> grâce à des fusions plusieurs à plusieurs, mais il peut toujours laisser des fragments de taille moyenne qui ne peuvent pas être fusionnés davantage sans dépasser les limites. Par exemple, comme illustré ci-dessous, si une collection comporte cinq segments de 2 Mo et que <code translate="no">maxSize</code> est de 3 Mo, la fusion de deux segments dépasserait la limite, de sorte que le compactage standard ne peut pas réduire davantage le nombre de segments et que la disposition fragmentée subsiste.</p>
<p>Forcer la fusion ajoute un paramètre <code translate="no">target_size</code> et permet de réorganiser les segments en fonction de la taille souhaitée dans le cadre d'une tolérance étroite lorsque cela est possible. Comme illustré ci-dessous, si la taille spécifiée pour <code translate="no">target_size</code> est de 4 Mo, les cinq petits segments de 2 Mo peuvent être fusionnés en un plus petit nombre de segments plus grands. Cela permet de réduire le nombre excessif de segments, de prendre en charge des cibles plus grandes que les paramètres par défaut de <code translate="no">maxSize</code> et, lorsque la cible est très grande, de laisser le système choisir une taille de sortie et un nombre de segments pratiques pour le matériel actuel et la topologie de QueryNode.</p>
<p>Pour savoir quelle méthode de compactage utiliser, voir la <a href="#faq">FAQ</a>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>Le compactage par fusion forcée étend l'API <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> existante avec un paramètre <code translate="no">target_size</code>. Il est entièrement rétrocompatible : les appels de compactage existants sans <code translate="no">target_size</code> continuent de fonctionner comme auparavant.</p>
<p>La fusion forcée fonctionne de manière asynchrone. Elle ne bloque pas les opérations de recherche ou de requête, bien qu'elle consomme des ressources d'E/S et de mémoire pendant l'exécution.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Utiliser le compactage par fusion forcée<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>Milvus version 2.6.15 ou ultérieure</p></li>
<li><p>pymilvus 2.6.13 ou version ultérieure</p></li>
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
    </button></h3><p>Les paramètres de configuration suivants contrôlent le comportement de Force Merge. Définissez-les dans le fichier de configuration de Milvus ou via des variables d'environnement.</p>
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
     <th><p>Valeur par défaut Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>512</p></td>
     <td><p>Taille maximale du segment par défaut en Mo. Utilisée comme cible lorsque <code translate="no">target_size</code> est égal à 0 ou omis. Sert également de valeur minimale autorisée pour <code translate="no">target_size</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Seuil du nombre de segments pour la sélection de l'algorithme. Lorsque le nombre de segments dépasse cette valeur, Milvus utilise un algorithme gourmand plus rapide pour la planification de la fusion.</p><ul><li><p><strong>Algorithme standard</strong> (utilisé lorsque le nombre de segments &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>) : produit des résultats de fusion plus optimaux mais prend plus de temps à calculer.</p></li><li><p><strong>Algorithme gourmand</strong> (utilisé lorsque le nombre de segments &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>) : achève la planification beaucoup plus rapidement au prix d'un regroupement de segments légèrement moins optimal.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La mémoire du DataNode est divisée par ce facteur pour calculer la plus grande taille de segment que le système peut autoriser.</p><ul><li><p>Une valeur plus élevée alloue moins de mémoire à la fusion mais en laisse plus pour les autres opérations du DataNode, ce qui améliore la stabilité du nœud.</p></li><li><p>Une valeur plus faible permet des fusions plus importantes, mais augmente la pression sur la mémoire.</p></li><li><p>Par exemple, avec le facteur par défaut de 4,0 et un DataNode doté d'une mémoire de 16 Go, le budget de fusion est de 4 Go. Cela signifie que la taille totale des segments fusionnés en une seule opération ne peut pas dépasser 4 Go.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La mémoire minimale du QueryNode est divisée par ce facteur. Utilisé lors du calcul automatique de la taille (<code translate="no">target_size=max_int64</code>) pour s'assurer que les segments fusionnés peuvent être chargés par les QueryNodes.</p><ul><li><p>Une valeur élevée produit des segments plus petits qui sont plus faciles à charger par les QueryNodes.</p></li><li><p>Une valeur plus petite permet d'obtenir des segments plus grands, mais peut entraîner des échecs de chargement sur les nœuds de requête dont la mémoire est limitée.</p></li><li><p>Par exemple, avec le facteur par défaut de 4,0 et le plus petit QueryNode disposant de 16 Go de mémoire, la taille cible auto-calculée ne dépassera pas 4 Go. Cela empêche Force Merge de produire des segments si grands que les QueryNodes ne peuvent pas les charger.</p></li></ul></td>
   </tr>
</table>
<p>Pour appliquer les modifications ci-dessus à votre cluster Milvus, veuillez suivre les étapes des sections <a href="/docs/fr/configure-helm.md#Configure-Milvus-via-configuration-file">Configurer Milvus avec Helm</a> et <a href="/docs/fr/configure_operator.md">Configurer Milvus avec Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Déclencher le compactage par fusion forcée<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Vous déclenchez le compactage Force Merge en appelant <code translate="no">compact()</code> avec le paramètre <code translate="no">target_size</code>. Pour plus d'informations sur les paramètres, voir la section <a href="#parameter-reference">Référence des paramètres</a> ci-dessous.</p>
<p>Trois modes de compactage par fusion forcée sont disponibles :</p>
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
<p>Les exemples suivants montrent comment utiliser chaque mode de compactage par fusion forcée.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Valeur par défaut (compactage standard)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

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
<h4 id="Parameter-reference" class="common-anchor-header">Référence des paramètres</h4><p>Le tableau suivant explique les paramètres.</p>
<table>
   <tr>
     <th><p><strong>Paramètre</strong></p></th>
     <th><p><strong>Type de paramètre</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Obligatoire. Le nom de la collection à compacter.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Facultatif. La taille du segment cible en Mo. Il existe 3 options pour la valeur du paramètre :</p><ul><li><p><strong>0 ou omis</strong>: utilise la valeur configurée <code translate="no">dataCoord.segment.maxSize</code> (par défaut : 512 Mo). Équivalent au compactage standard.</p></li><li><p><strong>Valeur explicite</strong>: fusionne les segments pour obtenir approximativement la taille spécifiée en Mo (par exemple, 2048). Doit être supérieur ou égal à la valeur configurée <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Calcule automatiquement la taille optimale en fonction de la distribution actuelle des segments et des ressources disponibles du nœud.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Si l'adresse <code translate="no">target_size</code> spécifiée est inférieure à l'adresse <code translate="no">dataCoord.segment.maxSize</code> configurée, la demande est rejetée avec une erreur.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Vérifier la progression du compactage<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>Le compactage de Force Merge s'exécute de manière asynchrone. Utilisez l'ID du travail renvoyé pour vérifier la progression :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p><strong>N'utilisez pas le compactage par fusion forcée dans les environnements de production.</strong></p></li>
<li><p><strong>Utilisez le mode de calcul automatique de la taille dans la plupart des cas.</strong> La définition de <code translate="no">target_size</code> sur <code translate="no">max_int64</code> permet à Milvus d'analyser la distribution de vos segments et les ressources des nœuds pour déterminer la meilleure taille. Il s'agit de l'approche recommandée, sauf si vous avez des exigences spécifiques en matière de taille.</p></li>
<li><p><strong>Tenez compte du compromis de performance.</strong> Le compactage par fusion forcée est une opération gourmande en ressources. Elle lit, fusionne et réécrit les données des segments. Programmez-la pendant les périodes de faible trafic pour minimiser l'impact sur la latence des requêtes.</p></li>
<li><p><strong>Surveillez le nombre de segments avant et après l'opération.</strong> Utilisez <code translate="no">get_compaction_state()</code> et <code translate="no">list_persistent_segments</code> pour vérifier que le compactage a produit des segments moins nombreux et plus grands, comme prévu.</p></li>
</ul>
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
    </button></h2><p><strong>En quoi Force Merge diffère-t-il du compactage standard ?</strong></p>
<p>Ces deux types d'opérations de compactage ont des objectifs différents.</p>
<ul>
<li><p>Le compactage standard (targetSize=0 ou omis) est une méthode de nettoyage incrémentielle et la plus efficace possible.</p></li>
<li><p>La fusion forcée (targetSize&gt;0) est un chemin de reconditionnement au niveau de la collection pour produire des segments moins nombreux, plus grands et proches de la cible.</p></li>
</ul>
<p>La principale différence réside dans la forme de la fusion : le compactage standard est effectivement m → 1 par tâche, tandis que la fusion forcée est m → n sur l'ensemble des entrées groupées. C'est la raison pour laquelle la fusion forcée peut résoudre des dispositions de segments que le compactage standard ne peut pas résoudre. Le tableau suivant compare les deux types d'opérations.</p>
<table>
   <tr>
     <th><p><strong>Dimension</strong></p></th>
     <th><p><strong>Compactage standard (par défaut)</strong></p></th>
     <th><p><strong>Fusion forcée</strong></p></th>
   </tr>
   <tr>
     <td><p>Déclenchement de l'API</p></td>
     <td><p>targetSize=0 (ou non défini), pas de drapeau Major/L0</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Objectif principal</p></td>
     <td><p>Nettoyage progressif des fragments évidents ; maintenance de routine</p></td>
     <td><p>Consolidation à l'échelle de la collection pour la recherche et l'équilibre</p></td>
   </tr>
   <tr>
     <td><p>Source de la taille des segments</p></td>
     <td><p>Fixed dataCoord.segment.maxSize (configuration du serveur)</p></td>
     <td><p>Taille cible de l'utilisateur, puis taille de sécurité limitée par maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Validité des paramètres</p></td>
     <td><p>Pas de réglage de la taille de l'utilisateur</p></td>
     <td><p>La taille cible de l'utilisateur doit être &gt;= dataCoord.segment.maxSize ; sinon, elle est rejetée.</p></td>
   </tr>
   <tr>
     <td><p>Limite supérieure de sécurité</p></td>
     <td><p>Limite de configuration uniquement</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (standalone non-pooling : encore divisé par deux)</p></td>
   </tr>
   <tr>
     <td><p>Forme de la fusion</p></td>
     <td><p>m → 1 par tâche, sortie &lt;= configMaxSize</p></td>
     <td><p>m → n, sorties proches de targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportement des segments moyens</p></td>
     <td><p>Peut être bloqué de manière permanente (par exemple, deux segments de 60 % ne peuvent pas légalement devenir un segment de 120 %).</p></td>
     <td><p>Repack + split fonctionne ; pas de schéma "bloqué à 60%".</p></td>
   </tr>
   <tr>
     <td><p>Capacité d'aplanissement de la collection</p></td>
     <td><p>Limitée ; des exécutions répétées peuvent encore laisser de nombreux segments moyens.</p></td>
     <td><p>Forte ; conçue pour réduire le nombre de segments et augmenter le taux de remplissage.</p></td>
   </tr>
   <tr>
     <td><p>Prise en compte de la topologie</p></td>
     <td><p>Aucune</p></td>
     <td><p>Oui ; utilise QueryNode/replica/shard layout</p></td>
   </tr>
   <tr>
     <td><p>Réglage du parallélisme de lecture</p></td>
     <td><p>Aucun</p></td>
     <td><p>Ajuste le nombre de sorties en utilisant queryNodeCount / (replicas × shards) lorsque c'est valide</p></td>
   </tr>
   <tr>
     <td><p>Cas d'utilisation typique</p></td>
     <td><p>Nettoyage quotidien à forte consommation après les écritures/suppressions</p></td>
     <td><p>Préparation du benchmark, optimisation de la recherche, alignement du parallélisme de charge</p></td>
   </tr>
   <tr>
     <td><p>Attentes en matière d'étendue</p></td>
     <td><p>Ne pas s'attendre à un reconditionnement complet de la collection</p></td>
     <td><p>Destiné à un résultat de reconditionnement au niveau de la collection</p></td>
   </tr>
</table>
<p><strong>Conseils de sélection :</strong></p>
<ul>
<li><p>Choisissez le compactage standard pour un nettoyage incrémental à faible risque.</p></li>
<li><p>Choisissez la fusion forcée lorsque vous souhaitez explicitement remodeler la collection en segments moins nombreux et plus grands, alignés sur le comportement de recherche et de chargement.</p></li>
</ul>
<p><strong>En quoi la fusion forcée diffère-t-elle du compactage par regroupement ?</strong></p>
<p>Le<a href="/docs/fr/clustering-compaction.md">compactage par regroupement</a> (<code translate="no">is_clustering=True</code>) réorganise les données au sein des segments sur la base d'une clé de regroupement afin d'améliorer l'élagage de la recherche. Force Merge (<code translate="no">target_size=N</code>) optimise la taille des segments sans modifier la distribution des données. Ils ont des objectifs différents et peuvent être utilisés ensemble - exécutez d'abord le compactage par regroupement pour organiser les données, puis Force Merge pour consolider les segments résultants.</p>
<p><strong>Puis-je exécuter Force Merge sur une collection qui fait l'objet d'une requête ?</strong></p>
<p>Oui. Force Merge s'exécute de manière asynchrone et ne bloque pas les requêtes. Cependant, elle consomme des ressources DataNode et des ressources d'E/S de disque, de sorte que la latence des requêtes peut augmenter pendant le compactage. Pour obtenir les meilleurs résultats, planifiez Force Merge pendant les périodes de faible trafic.</p>
<p><strong>Que se passe-t-il si je définis une target_size inférieure à maxSize ?</strong></p>
<p>La requête est rejetée avec une erreur. La taille cible doit être supérieure ou égale à la taille configurée <code translate="no">dataCoord.segment.maxSize</code>.</p>
