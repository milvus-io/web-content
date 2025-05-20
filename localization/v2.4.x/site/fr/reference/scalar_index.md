---
id: scalar_index.md
related_key: scalar_index
summary: Indice scalaire en Milvus.
title: Index scalaire
---
<h1 id="Scalar-Index" class="common-anchor-header">Index scalaire<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus prend en charge les recherches filtrées combinant des champs scalaires et vectoriels. Pour améliorer l'efficacité des recherches impliquant des champs scalaires, Milvus a introduit l'indexation des champs scalaires à partir de la version 2.1.0. Cet article présente une vue d'ensemble de l'indexation des champs scalaires dans Milvus, vous aidant à comprendre sa signification et sa mise en œuvre.</p>
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
    </button></h2><p>Lorsque vous effectuez des recherches de similarité vectorielle dans Milvus, vous pouvez utiliser des opérateurs logiques pour organiser les champs scalaires en expressions booléennes.</p>
<p>Lorsque Milvus reçoit une demande de recherche avec une telle expression booléenne, il analyse l'expression booléenne dans un arbre syntaxique abstrait (AST) afin de générer un plan physique pour le filtrage des attributs. Milvus applique ensuite le plan physique dans chaque segment pour générer un <a href="/docs/fr/v2.4.x/bitset.md">jeu de bits</a> comme résultat du filtrage et inclut le résultat comme paramètre de recherche vectorielle pour réduire la portée de la recherche. Dans ce cas, la vitesse des recherches vectorielles dépend fortement de la vitesse du filtrage d'attributs.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>Filtrage d'attributs dans un segment</span> </span></p>
<p>L'indexation des champs scalaires est un moyen d'assurer la rapidité du filtrage des attributs en triant les valeurs des champs scalaires d'une manière particulière afin d'accélérer la recherche d'informations.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Algorithmes d'indexation des champs scalaires<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus vise à obtenir une faible utilisation de la mémoire, une grande efficacité de filtrage et un temps de chargement court grâce à ses algorithmes d'indexation des champs scalaires. Ces algorithmes sont classés en deux catégories principales : l'<a href="#auto-indexing">indexation automatique</a> et l'<a href="#inverted-indexing">indexation inversée</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Indexation automatique</h3><p>Milvus propose l'option <code translate="no">AUTOINDEX</code> pour vous éviter de devoir choisir manuellement un type d'index. Lors de l'appel de la méthode <code translate="no">create_index</code>, si l'option <code translate="no">index_type</code> n'est pas spécifiée, Milvus sélectionne automatiquement le type d'index le plus approprié en fonction du type de données.</p>
<p>Le tableau suivant répertorie les types de données pris en charge par Milvus et les algorithmes d'indexation automatique correspondants.</p>
<table>
<thead>
<tr><th>Type de données</th><th>Algorithme d'indexation automatique</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Index inversé</td></tr>
<tr><td>INT8</td><td>Index inversé</td></tr>
<tr><td>INT16</td><td>Index inversé</td></tr>
<tr><td>INT32</td><td>Indice inversé</td></tr>
<tr><td>INT64</td><td>Indice inversé</td></tr>
<tr><td>FLOAT</td><td>Indice inversé</td></tr>
<tr><td>DOUBLE</td><td>Index inversé</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Indexation inversée</h3><p>L'indexation inversée offre un moyen flexible de créer un index pour un champ scalaire en spécifiant manuellement les paramètres de l'index. Cette méthode fonctionne bien pour différents scénarios, y compris les requêtes ponctuelles, les requêtes de correspondance de motifs, les recherches en texte intégral, les recherches JSON, les recherches booléennes et même les requêtes de correspondance de préfixes.</p>
<p>Les index inversés mis en œuvre dans Milvus sont alimentés par <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, une bibliothèque de moteur de recherche en texte intégral. Tantivy garantit que l'indexation inversée dans Milvus est à la fois efficace et rapide.</p>
<p>Un index inversé se compose de deux éléments principaux : un dictionnaire de termes et une liste inversée. Le dictionnaire de termes comprend tous les mots tokenisés triés par ordre alphabétique, tandis que la liste inversée contient la liste des documents dans lesquels chaque mot apparaît. Cette configuration rend les requêtes ponctuelles et les requêtes par plage beaucoup plus rapides et efficaces que les recherches par force brute.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>Schéma de l'index inversé</span> </span></p>
<p>Les avantages de l'utilisation d'un index inversé sont particulièrement évidents dans les opérations suivantes :</p>
<ul>
<li><strong>Requête ponctuelle</strong>: Par exemple, lors de la recherche de documents contenant le mot <strong>Milvus</strong>, le processus commence par vérifier si <strong>Milvus</strong> est présent dans le dictionnaire des termes. S'il n'est pas trouvé, aucun document ne contient le mot. En revanche, s'il est trouvé, la liste inversée associée à <strong>Milvus</strong> est récupérée, indiquant les documents qui contiennent le mot. Cette méthode est beaucoup plus efficace qu'une recherche brute dans un million de documents, car le dictionnaire de termes triés réduit considérablement le temps nécessaire pour trouver le mot <strong>Milvus</strong>.</li>
<li><strong>Interrogation par plage</strong>: L'efficacité des requêtes de portée, telles que la recherche de documents contenant des mots alphabétiquement supérieurs à <strong>très</strong>, est également améliorée par le dictionnaire de termes triés. Cette approche est plus efficace qu'une recherche brute et fournit des résultats plus rapides et plus précis.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Résultats des tests</h3><p>Pour démontrer les améliorations de performances apportées par les index scalaires dans Milvus, une expérience a été menée pour comparer les performances de plusieurs expressions utilisant l'indexation inversée et la recherche par force brute sur des données brutes.</p>
<p>L'expérience a consisté à tester diverses expressions dans deux conditions : avec un index inversé et avec une recherche par force brute. Pour garantir l'équité, la même distribution des données a été maintenue entre les tests, en utilisant la même collection à chaque fois. Avant chaque test, la collection a été libérée et l'index a été supprimé et reconstruit. En outre, une requête à chaud a été effectuée avant chaque test pour minimiser l'impact des données froides et chaudes, et chaque requête a été exécutée plusieurs fois pour garantir la précision.</p>
<p>Pour un ensemble de données d'<strong>un million d'</strong> enregistrements, l'utilisation d'un <strong>index inversé</strong> peut améliorer jusqu'à <strong>30 fois</strong> les performances pour les requêtes ponctuelles. Les gains de performance peuvent être encore plus significatifs pour des ensembles de données plus importants.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Recommandations en matière de performances<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour tirer pleinement parti des capacités de Milvus en matière d'indexation de champs scalaires et libérer sa puissance dans les recherches de similarité vectorielle, vous pouvez avoir besoin d'un modèle pour estimer la taille de la mémoire requise en fonction des données dont vous disposez.</p>
<p>Les tableaux suivants répertorient les fonctions d'estimation pour tous les types de données pris en charge par Milvus.</p>
<ul>
<li><p>Champs numériques</p>
<table>
<thead>
<tr><th>Type de données</th><th>Fonction d'estimation de la mémoire (Mo)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>Champs de la chaîne</p>
<table>
<thead>
<tr><th>Longueur de la chaîne</th><th>Fonction d'estimation de la mémoire (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Pour indexer un champ scalaire, lisez <a href="/docs/fr/v2.4.x/index-scalar-fields.md">Construire un index sur des scalaires</a>.</p></li>
<li><p>Pour en savoir plus sur les termes et les règles mentionnés ci-dessus, lisez</p>
<ul>
<li><a href="/docs/fr/v2.4.x/bitset.md">Bitset</a></li>
<li><a href="/docs/fr/v2.4.x/multi-vector-search.md">Recherche hybride</a></li>
<li><a href="/docs/fr/v2.4.x/boolean.md">Règles des expressions booléennes</a></li>
<li><a href="/docs/fr/v2.4.x/schema.md#Supported-data-type">Types de données pris en charge</a></li>
</ul></li>
</ul>
