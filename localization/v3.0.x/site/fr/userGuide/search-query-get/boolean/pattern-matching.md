---
id: pattern-matching.md
title: Correspondance de motifs
summary: >-
  Milvus prend en charge la correspondance de chaînes de caractères à l'aide de
  caractères génériques LIKE et d'expressions régulières RE2. Utilisez des
  filtres de correspondance pour rechercher des préfixes, des suffixes, des
  sous-chaînes, des codes structurés, des domaines de messagerie, des chemins
  d'accès URL et d'autres motifs de chaînes dans les champs VARCHAR, les chemins
  de chaînes JSON ou les éléments ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Correspondance de motifs<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans les applications de recherche agentique, la recherche vectorielle et la correspondance de motifs de type « grep » se complètent souvent. La recherche vectorielle extrait les entités sémantiquement pertinentes, tandis que la correspondance de motifs affine ces résultats en fonction de structures de chaînes exactes, telles que les codes d’erreur, les préfixes de journaux, les domaines de messagerie, les chemins d’URL ou les identifiants.</p>
<p>Dans Milvus, vous pouvez exprimer ces contraintes de motif dans des filtres scalaires à l’aide de ` <code translate="no">LIKE</code> ` pour une correspondance simple avec des caractères génériques, et de ` <code translate="no">=~</code> ` ou ` <code translate="no">!~</code> ` pour les expressions régulières <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Vous pouvez combiner ces filtres avec la recherche par ` <code translate="no">query</code>`, ` <code translate="no">search</code>` ou la recherche hybride.</p>
<p>Les expressions de correspondance de motifs sont définies dans le paramètre <code translate="no">filter</code>. Par exemple, la requête suivante permet de trouver les messages de journal contenant un code d’erreur tel que <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Les exemples présentés sur cette page se concentrent sur l’expression attribuée à <code translate="no">filter</code>. Vous pouvez utiliser la même syntaxe d’expression de filtre dans les opérations Milvus qui acceptent un filtre scalaire, telles que <code translate="no">query</code>, <code translate="no">search</code> et la recherche hybride.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Types de champs pris en charge<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La correspondance de motifs est disponible pour les valeurs de type chaîne de caractères.</p>
<table>
<thead>
<tr><th>Cible</th><th><code translate="no">LIKE</code></th><th><code translate="no">=~</code> / <code translate="no">!~</code></th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> champ</td><td>Oui</td><td>Oui</td><td>Cible typique pour la correspondance de motifs sur les champs de chaîne de caractères.</td></tr>
<tr><td><code translate="no">JSON</code> chemin avec type de conversion « <code translate="no">VARCHAR</code> »</td><td>Oui</td><td>Oui</td><td>La valeur du chemin JSON doit être une chaîne de caractères pour que les correspondances soient positives. Si vous créez un index sur le chemin JSON à des fins d'accélération, définissez <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> élément</td><td>Oui</td><td>Oui</td><td>Permet de faire correspondre un élément spécifique par index, par exemple <code translate="no">tags[0]</code>. La correspondance de motif <strong>ne</strong> parcourt <strong>pas</strong> tous les éléments ; elle s’applique uniquement à l’élément situé à l’index spécifié.</td></tr>
<tr><td>Cibles numériques, booléennes, vectorielles, de type « <code translate="no">TEXT</code> » ou autres cibles non «<code translate="no">VARCHAR</code> »</td><td>Non</td><td>Non</td><td>La correspondance de motif n’est disponible que pour les valeurs de type « <code translate="no">VARCHAR</code> », les chemins JSON qui se résolvent en chaînes de caractères ou les éléments indexés de type « <code translate="no">ARRAY&lt;VARCHAR&gt;</code> ».</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Choisissez LIKE ou une expression régulière<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Choisissez l’opérateur le plus simple qui exprime le motif dont vous avez besoin.</p>
<p>Si vous avez besoin d’une correspondance exacte de chaîne de caractères, nous vous recommandons d’utiliser « <code translate="no">==</code> » plutôt que la correspondance de motifs. N’utilisez « <code translate="no">LIKE</code> » ou « regex » que lorsque le filtre doit correspondre à un motif.</p>
<table>
<thead>
<tr><th>Exigence</th><th>Opérateur recommandé</th><th>Exemple</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>Égalité exacte de chaînes</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Correspondance exacte de la chaîne « <code translate="no">active</code> ».</td></tr>
<tr><td>Correspondance simple par préfixe</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Correspond aux chaînes commençant par « <code translate="no">Prod</code> ».</td></tr>
<tr><td>Correspondance simple par suffixe</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Correspond aux chaînes se terminant par « <code translate="no">.json</code> ».</td></tr>
<tr><td>Correspondance simple « contient »</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Recherche les valeurs contenant « <code translate="no">vector database</code> » n'importe où dans la chaîne.</td></tr>
<tr><td>Recherche d’un code structuré ou d’un motif de longueur fixe</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Recherche les chaînes de caractères qui contiennent, en respectant la casse, « <code translate="no">E</code> » suivi de quatre chiffres, par exemple « <code translate="no">E1001</code> ».</td></tr>
<tr><td>Correspondance de motif sans distinction de casse</td><td><code translate="no">=~</code> avec <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Recherche « <code translate="no">error</code> », « <code translate="no">ERROR</code> » ou d’autres variantes de casse.</td></tr>
<tr><td>Exclure les valeurs correspondant à un motif d’expression régulière</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Exclut les chaînes commençant par <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Utilisez « <code translate="no">LIKE</code> » pour une correspondance simple avec des caractères génériques. Utilisez une expression régulière lorsque le motif nécessite des classes de caractères, des répétitions, des alternatives telles que « <code translate="no">error|failed</code> », des ancrages ou une correspondance sans distinction de casse.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Utiliser LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur « <code translate="no">LIKE</code> » sert à effectuer une correspondance simple avec des caractères génériques sur des valeurs de chaîne. Il ne prend en charge que les caractères génériques suivants :</p>
<table>
<thead>
<tr><th>Caractère générique</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Correspond à zéro ou plusieurs caractères.</td></tr>
<tr><td><code translate="no">_</code></td><td>Correspond à exactement un caractère.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Modèles LIKE courants<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez la position de <code translate="no">%</code> et <code translate="no">_</code> pour contrôler l'emplacement du texte fixe dans la chaîne correspondante.</p>
<table>
<thead>
<tr><th>Exigence</th><th>Motif</th><th>Exemple de filtre</th></tr>
</thead>
<tbody>
<tr><td>Commence par un préfixe</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Se termine par un suffixe</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contient une sous-chaîne</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Correspond à un caractère à une position fixe</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportement de correspondance LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez « <code translate="no">LIKE</code> » pour les correspondances de préfixe, de suffixe, de contenu et de caractère unique à position fixe. « <code translate="no">LIKE</code> » ne prend pas en charge les classes de caractères telles que « <code translate="no">[0-9]</code> », les alternatives telles que « <code translate="no">error|failed</code> », les nombres de répétitions tels que « <code translate="no">{4}</code> », les ancres telles que « <code translate="no">^</code> » ou « <code translate="no">$</code> », ni les indicateurs de sensibilité à la casse tels que « <code translate="no">(?i)</code> ». Utilisez « regex » pour ces motifs.</p>
<p>Utilisez <code translate="no">==</code> pour une égalité exacte de la chaîne complète. N'utilisez <code translate="no">LIKE</code> que lorsque le filtre nécessite une correspondance avec des caractères génériques.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">Échappement des caractères génériques dans un motif LIKE<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans les motifs de type « <code translate="no">LIKE</code> », « <code translate="no">%</code> » correspond à zéro ou plusieurs caractères et « <code translate="no">_</code> » correspond exactement à un caractère. Pour faire correspondre littéralement « <code translate="no">%</code> », « <code translate="no">_</code> » ou « <code translate="no">\</code> », échappez le caractère à l’aide d’une barre oblique inversée (<code translate="no">\</code>) :</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> correspond à la valeur littérale <code translate="no">%</code>.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> correspond aux valeurs commençant par le caractère littéral « <code translate="no">_</code> ».</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> correspond aux valeurs commençant par une barre oblique inversée littérale.</li>
</ul>
<p>Les littéraux de chaîne brute, écrits sous la forme <code translate="no">r&quot;...&quot;</code> ou <code translate="no">r'...'</code>, conservent les barres obliques inversées telles quelles dans les expressions de filtre Milvus. Ils sont recommandés pour les expressions « <code translate="no">LIKE</code> » et les motifs d’expressions régulières contenant des barres obliques inversées. Sans chaîne brute, les littéraux de chaîne ordinaires continuent de traiter les séquences d’échappement avant l’évaluation du motif ; il peut donc être nécessaire d’ajouter des barres obliques inversées supplémentaires.</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">Utilisez les expressions régulières<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez des filtres d’expressions régulières lorsque le motif nécessite des fonctionnalités d’expressions régulières telles que les classes de caractères, la répétition, l’alternance, les ancres ou la correspondance insensible à la casse. Milvus applique une expression régulière <a href="https://github.com/google/re2/wiki/syntax">RE2</a> à une valeur de chaîne.</p>
<p>Le côté droit de <code translate="no">=~</code> ou <code translate="no">!~</code> doit être un littéral de chaîne.</p>
<table>
<thead>
<tr><th>Opérateur</th><th>Signification</th><th>Exemple</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Correspond aux valeurs qui satisfont au motif d'expression régulière.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Exclut les valeurs qui correspondent au motif d'expression régulière.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">Utilisez des littéraux de chaîne bruts<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>Les littéraux de chaîne bruts sont recommandés pour les expressions régulières contenant des barres obliques inversées. Dans une chaîne brute, écrite sous la forme <code translate="no">r&quot;...&quot;</code> ou <code translate="no">r'...'</code>, les barres obliques inversées sont transmises telles quelles au moteur d'expressions régulières. Cela évite l'échappement supplémentaire requis par les littéraux de chaîne ordinaires.</p>
<p>Par exemple :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela correspond aux chaînes contenant une valeur de type date, telle que <code translate="no">2026-07-01</code>.</p>
<p>Sans chaîne brute, les littéraux de chaîne ordinaires traitent les séquences d’échappement avant l’évaluation du motif d’expression régulière ; ainsi, des motifs tels que <code translate="no">\d</code>, <code translate="no">\s</code> ou des caractères littéraux échappés peuvent nécessiter des barres obliques inversées supplémentaires.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">Motifs d’expressions régulières courants<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Les exemples suivants utilisent la syntaxe RE2 courante dans les expressions de filtrage Milvus. Pour la syntaxe complète des expressions régulières, reportez-vous à la référence <a href="https://github.com/google/re2/wiki/syntax">de syntaxe RE2</a>.</p>
<table>
<thead>
<tr><th>Condition</th><th>Mot-clé</th><th>Exemple de filtre</th></tr>
</thead>
<tbody>
<tr><td>Contient du texte littéral</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Commence par un préfixe</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Se termine par un suffixe</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Correspond à une séquence de chiffres</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Correspond à un nombre fixe de chiffres</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Correspond à un domaine de messagerie</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Correspond sans tenir compte de la casse</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Correspond à la chaîne complète</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Pour rechercher l'un parmi plusieurs mots, utilisez l'alternance avec <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lorsque vous souhaitez faire correspondre littéralement des métacaractères d'expressions régulières, échappez-les dans le motif d'expression régulière. Par exemple, pour faire correspondre un point littéral (<code translate="no">\.</code> dans une expression régulière), écrivez <code translate="no">\\.</code> dans une chaîne de filtre Python :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Remarque : les filtres d’expressions régulières de Milvus suivent la syntaxe RE2. Si un motif d’expression régulière utilise une syntaxe non prise en charge par RE2 ou est invalide pour toute autre raison, Milvus rejette l’expression de filtre. Pour plus de détails sur les métacaractères, les indicateurs et le comportement de correspondance des expressions régulières, consultez la référence <a href="https://github.com/google/re2/wiki/syntax">syntaxique RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Comportement de correspondance<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Correspondance de sous-chaînes</strong></p>
<p>La correspondance d’expressions régulières de Milvus utilise la sémantique des sous-chaînes. Le motif n’a pas besoin de correspondre à la valeur entière du champ. Par exemple, le filtre suivant correspond à la fois à <code translate="no">E1001</code> et à <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour faire correspondre la valeur complète du champ, utilisez les ancrages <code translate="no">^</code> et <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Champs VARCHAR pouvant contenir des valeurs nulles</strong></p>
<p>Les filtres Regex ne correspondent pas aux valeurs nulles. Cela s'applique aussi bien à « <code translate="no">=~</code> » qu'à « <code translate="no">!~</code> ». Si vous souhaitez exclure un motif Regex tout en conservant les valeurs nulles, ajoutez explicitement « <code translate="no">OR field IS NULL</code> » :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Chemins JSON</strong></p>
<p>Pour les chemins JSON, les filtres d’expressions régulières se comportent différemment lorsque le chemin est manquant, nul ou qu’il renvoie une valeur non textuelle :</p>
<table>
<thead>
<tr><th>Filtre</th><th>Inclut-il les valeurs manquantes/null/non-chaîne ?</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Non</td><td>Ne correspond qu’aux valeurs de type chaîne de caractères qui satisfont au motif d’expression régulière.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Oui</td><td>Renvoie les entités dont le chemin est manquant, nul, non-chaîne ou une chaîne qui ne correspond pas au motif d'expression régulière.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Accélérer la correspondance de motifs grâce aux index<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge plusieurs types d’index sur les champs de type chaîne de caractères, qui peuvent être utilisés conjointement avec des filtres « <code translate="no">LIKE</code> » et des filtres d’expressions régulières sur les champs « <code translate="no">VARCHAR</code> » ou les chemins d’accès sous forme de chaînes JSON, tels que <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> et <code translate="no">BITMAP</code>. La correspondance de motifs peut fonctionner sans index, mais un index peut améliorer les performances sur des ensembles de données volumineux.</p>
<p>L'efficacité de l'index dépend de l'expression du motif, de la capacité de Milvus à extraire des sous-chaînes littérales fixes, ainsi que de la cardinalité et de la distribution du champ cible. Les motifs de type préfixe, tels que <code translate="no">name LIKE &quot;Prod%&quot;</code>, peuvent bénéficier de stratégies d'indexation différentes de celles utilisées pour les motifs de type infixe ou suffixe, tels que <code translate="no">description LIKE &quot;%vector%&quot;</code> ou <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilisez le tableau suivant comme point de départ, puis effectuez des tests de performance avec votre propre charge de travail :</p>
<table>
<thead>
<tr><th>Modèle ou caractéristique des données</th><th>Index à envisager</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td>Contient des sous-chaînes littérales fixes, telles que <code translate="no">message =~ &quot;error.*timeout&quot;</code> ou <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Utile lorsque Milvus peut extraire des sous-chaînes littérales significatives du modèle. Pour plus de détails, reportez-vous à <a href="/docs/fr/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtres de chaînes de caractères de type préfixe, exacts ou d’égalité, en particulier sur les champs présentant une cardinalité faible à modérée</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> ou <code translate="no">BITMAP</code></td><td>Peuvent s’avérer plus efficaces lorsque le champ comporte des valeurs répétées ou lorsque le filtre s’apparente à une correspondance exacte. Pour plus de détails, reportez-vous à <a href="/docs/fr/stl-sort.md">STL_SORT</a>, <a href="/docs/fr/inverted.md">INVERTED</a> et <a href="/docs/fr/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Motifs Regex sans littéraux fixes, ou motifs dominés par des classes de caractères, des tokens courts ou des caractères génériques</td><td>Effectuez des tests de performance avant de vous fier à l’accélération par index</td><td>Ces motifs peuvent offrir une sélectivité d’index limitée et peuvent se rabattre sur des balayages plus larges.</td></tr>
</tbody>
</table>
