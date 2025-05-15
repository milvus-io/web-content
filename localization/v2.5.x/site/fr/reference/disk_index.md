---
id: disk_index.md
related_key: disk_index
summary: >-
  Mécanisme d'indexation des disques dans Milvus pour une recherche vectorielle
  optimisée.
title: Index sur disque
---
<h1 id="On-disk-Index" class="common-anchor-header">Index sur disque<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Cet article présente DiskANN, un algorithme d'indexation sur disque pour les recherches vectorielles optimisées sur disque. Basé sur les graphes de Vamana, DiskANN permet d'effectuer des recherches vectorielles sur disque efficaces dans les grands ensembles de données.</p>
<p>Pour améliorer les performances des requêtes, vous pouvez <a href="/docs/fr/index-vector-fields.md">spécifier un type d'index</a> pour chaque champ vectoriel.</p>
<div class="alert note"> 
Actuellement, un champ vectoriel ne prend en charge qu'un seul type d'index. Milvus supprime automatiquement l'ancien index lors du changement de type d'index.</div>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser DiskANN dans Milvus, il faut que</p>
<ul>
<li>L'instance Milvus fonctionne sous Ubuntu 18.04.6 ou une version ultérieure.</li>
<li>Le chemin de données Milvus doit être monté sur un disque SSD NVMe pour des performances optimales :<ul>
<li>Pour une instance Milvus autonome, le chemin de données doit être <strong>/var/lib/milvus/data</strong> dans le conteneur où l'instance s'exécute.</li>
<li>Pour une instance Milvus Cluster, le chemin de données doit être <strong>/var/lib/milvus/data</strong> dans les conteneurs où s'exécutent les QueryNodes et les IndexNodes.</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser DiskANN, veillez à</p>
<ul>
<li>N'utilisez que des vecteurs flottants ayant au moins une dimension dans vos données.</li>
<li>d'utiliser uniquement la distance euclidienne (L2), le produit intérieur (IP) ou COSINE pour mesurer la distance entre les vecteurs.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Paramètres d'index et de recherche<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>Paramètres de construction d'index</p>
<p>Lors de la création d'un index DiskANN, utilisez <code translate="no">DISKANN</code> comme type d'index. Aucun paramètre d'index n'est nécessaire.</p></li>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Taille de la liste des candidats ; une taille plus importante permet d'obtenir un taux de rappel plus élevé, mais avec des performances dégradées.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">Configurations Milvus liées à DiskANN<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN est paramétrable. Vous pouvez modifier les paramètres liés à DiskANN dans <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> afin d'améliorer ses performances.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Paramètre</th><th>Description du paramètre</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Degré maximal du graphe de Vamana. <br/> Une valeur plus élevée permet d'obtenir un taux de rappel plus important, mais augmente la taille de l'index et le temps nécessaire à sa construction.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Taille de la liste des candidats. <br/> Une valeur plus élevée augmente le temps consacré à la construction de l'index mais offre un taux de rappel plus élevé. <br/> Fixez-la à une valeur inférieure à <code translate="no">MaxDegree</code>, sauf si vous avez besoin de réduire le temps de construction de l'index.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Limite de taille du code PQ. <br/> Une valeur plus élevée offre un taux de rappel plus important mais augmente l'utilisation de la mémoire.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Rapport entre les numéros de nœuds mis en cache et les données brutes. <br/> Une valeur plus élevée améliore la performance de la construction de l'index mais augmente l'utilisation de la mémoire.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Rapport entre le nombre maximum de requêtes IO par itération de recherche et le nombre de CPU.</td><td>[1, max(128 / nombre de CPU, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Résolution des problèmes<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>Comment traiter l'erreur <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code>?</p>
<p>Le noyau Linux propose la fonction E/S asynchrone non bloquante (AIO) qui permet à un processus de lancer simultanément plusieurs opérations d'E/S sans avoir à attendre la fin de l'une d'entre elles. Cela permet d'améliorer les performances des applications qui peuvent chevaucher le traitement et les E/S.</p>
<p>Les performances peuvent être ajustées à l'aide du fichier virtuel <code translate="no">/proc/sys/fs/aio-max-nr</code> dans le système de fichiers proc. Le paramètre <code translate="no">aio-max-nr</code> détermine le nombre maximum de requêtes simultanées autorisées.</p>
<p>La valeur par défaut de <code translate="no">aio-max-nr</code> est <code translate="no">65535</code>, mais vous pouvez la régler sur <code translate="no">10485760</code>.</p></li>
</ul>
