---
id: limitations.md
title: Limites de Milvus
related_key: Limitations
summary: Découvrez les limites liées à l'utilisation de Milvus.
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
    </button></h1><p>Milvus s'engage à fournir les meilleures bases de données vectorielles pour alimenter les applications d'IA et la recherche de similarité vectorielle. Cependant, l'équipe travaille en permanence à l'ajout de nouvelles fonctionnalités et des meilleurs outils pour améliorer l'expérience utilisateur. Cette page répertorie certaines limitations connues auxquelles les utilisateurs peuvent être confrontés lors de l'utilisation de Milvus.</p>
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
<tr><td>Base de données</td><td>255 caractères</td></tr>
<tr><td>Collection</td><td>255 caractères</td></tr>
<tr><td>Champ</td><td>255 caractères</td></tr>
<tr><td>Index</td><td>255 caractères</td></tr>
<tr><td>Partition</td><td>255  caractères</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Règles de nommage<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Le nom d'une ressource, tel que le nom d'une collection, d'une partition ou d'un index, peut contenir des chiffres, des lettres et des traits de soulignement (_). Un nom de ressource doit commencer par une lettre ou un trait de soulignement (_).</p>
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
<tr><td>Collection</td><td>65 536</td></tr>
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
<tr><th>Ressource</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Partition</td><td>1 024</td></tr>
<tr><td>Segment</td><td>16</td></tr>
<tr><td>Champ</td><td>64</td></tr>
<tr><td>Index</td><td>1</td></tr>
<tr><td>Entité</td><td>illimité</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Longueur d'une chaîne<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<tr><td>VARCHAR</td><td>65 535</td></tr>
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
<tr><td>Dimension</td><td>32 768</td></tr>
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
<tr><th>Opération</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Insertion</td><td>64 Mo</td></tr>
<tr><td>Recherche</td><td>64 Mo</td></tr>
<tr><td>Requête</td><td>64 Mo</td></tr>
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
    </button></h2><p>Dans la version actuelle, les données à charger doivent représenter moins de 90 % des ressources mémoire totales de tous les nœuds de requête afin de réserver des ressources mémoire pour le moteur d’exécution.</p>
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
<tr><td><code translate="no">topk</code> (nombre de résultats les plus similaires à renvoyer)</td><td>16 384</td></tr>
<tr><td><code translate="no">nq</code> (nombre de requêtes de recherche)</td><td>16 384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Limites d'indexation selon les différents types de recherche<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant présente un aperçu de la prise en charge des différents comportements de recherche selon les types d'index.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>FLAT</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_FORCE_BRUTE</th><th>INDEX_INVERSÉ_CLARSEMÉ</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Recherche simple</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche de partition</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche simple avec récupération des données brutes</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche simple avec pagination</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche filtrée</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche par plage</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche par regroupement</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Non</td><td>Non</td></tr>
<tr><td>Recherche avec itérateur</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Recherche hybride</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui (RRFRanker uniquement)</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Requête/Récupération</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Requête avec itérateur</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td><td>Non</td><td>Non</td><td>Non</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
</tbody>
</table>
