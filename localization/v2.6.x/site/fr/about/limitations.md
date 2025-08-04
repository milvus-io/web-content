---
id: limitations.md
title: Limites de Milvus
related_key: Limitations
summary: Apprenez à connaître les limites de l'utilisation de Milvus.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Limites de Milvus<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus s'engage à fournir les meilleures bases de données vectorielles pour alimenter les applications d'IA et la recherche de similarités vectorielles. Cependant, l'équipe travaille en permanence à l'ajout de nouvelles fonctionnalités et des meilleurs utilitaires pour améliorer l'expérience de l'utilisateur. Cette page énumère certaines limites connues que les utilisateurs peuvent rencontrer lors de l'utilisation de Milvus.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">Longueur du nom d'une ressource<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Ressource</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Collecte</td><td>255 caractères</td></tr>
<tr><td>Champ</td><td>255 caractères</td></tr>
<tr><td>Index</td><td>255 caractères</td></tr>
<tr><td>Partition</td><td>255 caractères</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Règles de dénomination<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Le nom d'une ressource telle que le nom de la collection, de la partition ou de l'index peut contenir des chiffres, des lettres et des traits de soulignement (_). Le nom d'une ressource doit commencer par une lettre ou un trait de soulignement (_).</p>
<h2 id="Number-of-resources" class="common-anchor-header">Nombre de ressources<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Ressource</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Collection</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">Nombre de ressources dans une collection<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Ressources</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Partition</td><td>1,024</td></tr>
<tr><td>Part</td><td>16</td></tr>
<tr><td>Champ</td><td>64</td></tr>
<tr><td>Index</td><td>1</td></tr>
<tr><td>Entité</td><td>illimité</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Longueur d'une chaîne de caractères<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Type de données</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">Dimensions d'un vecteur<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Propriété</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Dimension</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">Entrées et sorties par RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Fonctionnement</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Insertion</td><td>64 MO</td></tr>
<tr><td>Recherche</td><td>64 MB</td></tr>
<tr><td>Requête</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">Limites de chargement<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans la version actuelle, les données à charger doivent être inférieures à 90 % des ressources mémoire totales de tous les nœuds de requête afin de réserver des ressources mémoire au moteur d'exécution.</p>
<h2 id="Search-limits" class="common-anchor-header">Limites de recherche<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<thead>
<tr><th>Vecteurs</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (nombre de résultats les plus similaires à renvoyer)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (nombre de demandes de recherche)</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Limites de l'index pour différents types de recherche<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant donne un aperçu de la prise en charge des différents comportements de recherche selon les différents types d'index.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>FLAT</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>INDEX_INVERTI_SPARSE</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Recherche de base</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche de partition</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche de base avec récupération des données brutes</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche de base avec pagination</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche filtrée</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche de portée</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche de groupes</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Non</td><td>Non</td></tr>
<tr><td>Recherche avec itérateur</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche hybride</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui (uniquement RRFRanker)</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Interroger/obtenir</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Requête avec itérateur</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
</tbody>
</table>
