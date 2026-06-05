---
id: pattern-matching.md
title: Correspondance de motifs
summary: >-
  Milvus prend en charge la recherche de motifs de chaîne avec les caractères
  génériques LIKE et les expressions régulières RE2. Utilisez les filtres de
  motifs pour faire correspondre les préfixes, les suffixes, les sous-chaînes,
  les codes structurés, les domaines de messagerie, les chemins d'accès aux URL
  et d'autres motifs de chaînes dans les champs VARCHAR, les chemins d'accès aux
  chaînes JSON ou les éléments ARRAY.
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
    </button></h1><p>Dans les applications de recherche agentique, la recherche vectorielle et le filtrage de type grep se complètent souvent. La recherche vectorielle récupère les entités qui sont sémantiquement pertinentes, tandis que la recherche de motifs restreint ces résultats par des structures de chaînes exactes, telles que les codes d'erreur, les préfixes de journaux, les domaines de messagerie, les chemins d'accès aux URL ou les identificateurs.</p>
<p>Dans Milvus, vous pouvez exprimer ces contraintes de motifs dans des filtres scalaires avec <code translate="no">LIKE</code> pour une simple correspondance de caractères génériques et <code translate="no">=~</code> ou <code translate="no">!~</code> pour les expressions régulières <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Vous pouvez combiner ces filtres avec <code translate="no">query</code>, <code translate="no">search</code>, ou la recherche hybride.</p>
<p>Les expressions de correspondance de motifs sont écrites dans le paramètre <code translate="no">filter</code>. Par exemple, la requête suivante correspond aux messages du journal qui contiennent un code d'erreur tel que <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Les exemples de cette page se concentrent sur l'expression affectée à <code translate="no">filter</code>. Vous pouvez utiliser la même syntaxe d'expression de filtre dans les opérations Milvus qui acceptent un filtre scalaire, comme <code translate="no">query</code>, <code translate="no">search</code>, et la recherche hybride.</p>
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
    </button></h2><p>La recherche de motifs est disponible pour les valeurs de type chaîne.</p>
<table>
<thead>
<tr><th>Cible</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> champ</td><td>Oui</td><td>Oui</td><td>Cible typique pour la recherche de motifs dans les champs de type chaîne de caractères.</td></tr>
<tr><td><code translate="no">JSON</code> chemin d'accès avec <code translate="no">VARCHAR</code> cast type</td><td>Oui</td><td>Oui</td><td>La valeur du chemin JSON doit être une chaîne pour les correspondances positives. Si vous créez un index sur le chemin JSON pour l'accélération, définissez <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> élément</td><td>Oui</td><td>Oui</td><td>Correspondre à un élément spécifique par index, tel que <code translate="no">tags[0]</code>. La recherche par motif n <strong>'</strong> analyse <strong>pas</strong> tous les éléments ; elle ne s'applique qu'à l'élément situé à l'index spécifié.</td></tr>
<tr><td>Cibles numériques, booléennes, vectorielles, <code translate="no">TEXT</code> ou autres cibles non<code translate="no">VARCHAR</code> </td><td>Non</td><td>Non</td><td>La recherche par motif n'est disponible que pour les valeurs <code translate="no">VARCHAR</code>, les chemins JSON qui se résolvent en chaînes ou les éléments <code translate="no">ARRAY&lt;VARCHAR&gt;</code> indexés.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Choisir LIKE ou regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Choisissez l'opérateur le plus simple qui exprime le motif dont vous avez besoin.</p>
<p>Si vous avez besoin d'une chaîne de caractères exacte, nous vous recommandons d'utiliser <code translate="no">==</code> au lieu de la recherche de motifs. N'utilisez <code translate="no">LIKE</code> ou regex que lorsque le filtre doit correspondre à un motif.</p>
<table>
<thead>
<tr><th>Exigence</th><th>Opérateur recommandé</th><th>Exemple</th><th>Description de l'opérateur</th></tr>
</thead>
<tbody>
<tr><td>Égalité exacte de la chaîne</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Correspondance exacte de la chaîne <code translate="no">active</code>.</td></tr>
<tr><td>Correspondance de préfixe simple</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Correspond aux chaînes qui commencent par <code translate="no">Prod</code>.</td></tr>
<tr><td>Correspondance de suffixe simple</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Correspond aux chaînes qui se terminent par <code translate="no">.json</code>.</td></tr>
<tr><td>Correspondance simple avec le contenu</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Recherche les valeurs qui contiennent <code translate="no">vector database</code> n'importe où dans la chaîne.</td></tr>
<tr><td>Correspondance avec un code structuré ou un motif de longueur fixe</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Recherche les chaînes qui contiennent <code translate="no">E</code> suivi de quatre chiffres, comme <code translate="no">E1001</code>.</td></tr>
<tr><td>Correspondance insensible à la casse</td><td><code translate="no">=~</code> avec <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Correspond à <code translate="no">error</code>, <code translate="no">ERROR</code>, ou à d'autres variantes de la casse.</td></tr>
<tr><td>Exclusion des valeurs correspondant à une expression rationnelle</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Exclut les chaînes commençant par <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Utilisez <code translate="no">LIKE</code> pour une simple recherche de caractères génériques. Utilisez les expressions rationnelles lorsque le motif nécessite des classes de caractères, des répétitions, des alternances telles que <code translate="no">error|failed</code>, des ancres ou une correspondance insensible à la casse.</p>
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
    </button></h2><p>L'opérateur <code translate="no">LIKE</code> permet d'effectuer une simple recherche de caractères génériques dans des chaînes de caractères. Il ne prend en charge que les caractères génériques suivants :</p>
<table>
<thead>
<tr><th>Joker</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Correspond à zéro ou plusieurs caractères.</td></tr>
<tr><td><code translate="no">_</code></td><td>Correspond à un seul caractère.</td></tr>
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
    </button></h3><p>Utilisez la position de <code translate="no">%</code> et <code translate="no">_</code> pour contrôler l'endroit où le texte fixe apparaît dans la chaîne recherchée.</p>
<table>
<thead>
<tr><th>Exigence</th><th>Modèle</th><th>Exemple de filtre</th></tr>
</thead>
<tbody>
<tr><td>Commence par un préfixe</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Se termine par un suffixe</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contient une sous-chaîne</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Correspond à un caractère à une position fixe</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportement de la correspondance LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez <code translate="no">LIKE</code> pour les correspondances de préfixe, de suffixe, de contient et de position fixe d'un seul caractère. <code translate="no">LIKE</code> ne prend pas en charge les classes de caractères telles que <code translate="no">[0-9]</code>, l'alternance telle que <code translate="no">error|failed</code>, les comptes de répétition tels que <code translate="no">{4}</code>, les ancres telles que <code translate="no">^</code> ou <code translate="no">$</code>, ou les drapeaux insensibles à la casse tels que <code translate="no">(?i)</code>. Utilisez regex pour ces motifs.</p>
<p>Utilisez <code translate="no">==</code> pour une égalité exacte des chaînes complètes. N'utilisez <code translate="no">LIKE</code> que si le filtre nécessite une correspondance avec des caractères génériques.</p>
<h2 id="Use-regex" class="common-anchor-header">Utiliser regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez les filtres regex lorsque le motif nécessite des caractéristiques d'expression régulière telles que les classes de caractères, la répétition, l'alternance, les ancres ou la correspondance insensible à la casse. Milvus applique une expression régulière <a href="https://github.com/google/re2/wiki/syntax">RE2</a> à une valeur de chaîne.</p>
<p>Le côté droit de <code translate="no">=~</code> ou <code translate="no">!~</code> doit être une chaîne littérale.</p>
<table>
<thead>
<tr><th>Opérateur</th><th>Signification</th><th>Exemple</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Correspond aux valeurs qui satisfont le motif de l'expression rationnelle.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Exclut les valeurs qui satisfont au motif de l'expression rationnelle.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Modèles de regex courants<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Les exemples suivants utilisent la syntaxe RE2 courante dans les expressions de filtre Milvus. Pour connaître la syntaxe complète des regex, reportez-vous à la référence <a href="https://github.com/google/re2/wiki/syntax">syntaxique</a> de <a href="https://github.com/google/re2/wiki/syntax">RE2</a>.</p>
<table>
<thead>
<tr><th>Exigence</th><th>Modèle</th><th>Exemple de filtre</th></tr>
</thead>
<tbody>
<tr><td>Contient du texte littéral</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Commence par un préfixe</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Se termine par un suffixe</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Correspond à une séquence de chiffres</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Correspond à un nombre fixe de chiffres</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Correspond à un domaine de courrier électronique</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Correspond à la casse de manière insensible</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Correspond à la chaîne complète</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Pour faire correspondre un ou plusieurs mots, utilisez l'alternance avec <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour faire correspondre des métacaractères de regex littéralement, échappez-les dans le motif de la regex. Par exemple, pour faire correspondre un point littéral (<code translate="no">\.</code> dans la regex), écrivez <code translate="no">\\.</code> dans une chaîne de filtre Python :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Remarque : les filtres regex Milvus suivent la syntaxe RE2. Si un motif de regex utilise une syntaxe que RE2 ne prend pas en charge ou qui n'est pas valide, Milvus rejette l'expression du filtre. Pour plus de détails sur les métacaractères regex, les drapeaux et le comportement de correspondance, reportez-vous à la référence <a href="https://github.com/google/re2/wiki/syntax">syntaxique RE2</a>.</p>
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
    </button></h3><p><strong>Correspondance de sous-chaîne</strong></p>
<p>La correspondance des regex de Milvus utilise la sémantique des sous-chaînes. Il n'est pas nécessaire que le motif corresponde à la totalité de la valeur du champ. Par exemple, le filtre suivant correspond à la fois à <code translate="no">E1001</code> et à <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour faire correspondre la valeur du champ entier, utilisez les ancres <code translate="no">^</code> et <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Champs VARCHAR annulables</strong></p>
<p>Les filtres regex ne correspondent pas aux valeurs nulles. Cela s'applique à la fois à <code translate="no">=~</code> et à <code translate="no">!~</code>. Si vous souhaitez exclure un motif d'expression régulière mais conserver les valeurs nulles, ajoutez explicitement <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Chemins JSON</strong></p>
<p>Pour les chemins JSON, les filtres regex se comportent différemment lorsque le chemin est manquant, nul ou qu'il se résout en une valeur autre qu'une chaîne :</p>
<table>
<thead>
<tr><th>Filtre</th><th>Inclut les valeurs manquantes/nulles/non-chaînes ?</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Non</td><td>Ne prend en compte que les valeurs de chaîne qui satisfont le motif de l'expression rationnelle.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Oui</td><td>Renvoie les entités dont le chemin d'accès est manquant, nul, non chaîne ou une chaîne qui ne correspond pas au motif de l'expression rationnelle.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Accélérer la recherche de motifs avec des index<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge plusieurs types d'index sur les champs de chaîne qui peuvent être utilisés avec <code translate="no">LIKE</code> et les filtres regex sur les champs <code translate="no">VARCHAR</code> ou les chemins de chaîne JSON, tels que <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> et <code translate="no">BITMAP</code>. Le filtrage par motif peut fonctionner sans index, mais un index peut améliorer les performances sur les grands ensembles de données.</p>
<p>L'efficacité de l'index dépend de l'expression du motif, de la capacité de Milvus à extraire des sous-chaînes littérales fixes, ainsi que de la cardinalité et de la distribution du champ cible. Les motifs de type préfixe tels que <code translate="no">name LIKE &quot;Prod%&quot;</code> peuvent bénéficier de stratégies d'indexation différentes de celles des motifs infixes ou suffixes tels que <code translate="no">description LIKE &quot;%vector%&quot;</code> ou <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilisez le tableau suivant comme point de départ, puis comparez avec votre propre charge de travail :</p>
<table>
<thead>
<tr><th>Modèle ou caractéristique des données</th><th>Index à envisager</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td>Contient des sous-chaînes littérales fixes, telles que <code translate="no">message =~ &quot;error.*timeout&quot;</code> ou <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Aide lorsque Milvus peut extraire des sous-chaînes littérales significatives du modèle. Pour plus de détails, voir <a href="/docs/fr/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtres de chaînes préfixes, exactes ou de type égalité, en particulier sur les champs de cardinalité faible à modérée</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, ou <code translate="no">BITMAP</code></td><td>Peut être plus efficace lorsque le champ a des valeurs répétées ou lorsque le filtre est proche de la correspondance exacte. Pour plus de détails, voir <a href="/docs/fr/stl-sort.md">STL_SORT</a>, <a href="/docs/fr/inverted.md">INVERTED</a> et <a href="/docs/fr/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Motifs de regex sans littéraux fixes, ou motifs dominés par des classes de caractères, des jetons courts ou des caractères génériques</td><td>Effectuer une analyse comparative avant de se fier à l'accélération de l'indexation</td><td>Ces motifs peuvent offrir une sélectivité limitée de l'index et peuvent se rabattre sur des analyses plus larges.</td></tr>
</tbody>
</table>
