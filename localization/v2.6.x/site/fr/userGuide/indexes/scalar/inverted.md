---
id: inverted.md
title: INVERTE
summary: >-
  L'index INVERTED de Milvus est conçu pour accélérer les requêtes de filtrage
  sur les champs scalaires et les champs JSON structurés. En associant les
  termes aux documents ou aux enregistrements qui les contiennent, les index
  inversés améliorent considérablement les performances des requêtes par rapport
  aux recherches brutes.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTE<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <code translate="no">INVERTED</code> de Milvus est conçu pour accélérer les requêtes de filtrage sur les champs scalaires et les champs JSON structurés. En associant les termes aux documents ou aux enregistrements qui les contiennent, les index inversés améliorent considérablement les performances des requêtes par rapport aux recherches brutes.</p>
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
    </button></h2><p>Basé sur <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus met en œuvre l'indexation inversée pour accélérer les requêtes de filtrage, en particulier pour les données textuelles. Voici comment cela fonctionne :</p>
<ol>
<li><p><strong>Tokeniser les données</strong>: Milvus prend vos données brutes - dans cet exemple, deux phrases :</p>
<ul>
<li><p><strong>"Milvus est une base de données vectorielle native dans le nuage".</strong></p></li>
<li><p><strong>"Milvus est très performant".</strong></p></li>
</ul>
<p>et les décompose en mots uniques (par exemple, <em>Milvus</em>, <em>est</em>, <em>cloud-native</em>, <em>vector</em>, <em>database</em>, <em>very</em>, <em>good</em>, <em>at</em>, <em>performance</em>).</p></li>
<li><p><strong>Construire le dictionnaire des termes</strong>: Ces mots uniques sont stockés dans une liste triée appelée <strong>Dictionnaire des termes</strong>. Ce dictionnaire permet à Milvus de vérifier rapidement si un mot existe et de localiser sa position dans l'index.</p></li>
<li><p><strong>Création de la liste inversée</strong>: Pour chaque mot du dictionnaire de termes, Milvus conserve une <strong>liste inversée</strong> indiquant les documents qui contiennent ce mot. Par exemple, <strong>"Milvus"</strong> apparaît dans les deux phrases, sa liste inversée pointe donc vers les deux ID de document.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>Inversé</span> </span></p>
<p>Le dictionnaire étant trié, le filtrage basé sur les termes peut être traité efficacement. Au lieu d'analyser tous les documents, Milvus se contente de rechercher le terme dans le dictionnaire et d'extraire sa liste inversée, ce qui accélère considérablement les recherches et les filtres sur les grands ensembles de données.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Indexer un champ scalaire ordinaire<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les champs scalaires tels que <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong> et <strong>ARRAY</strong>, la création d'un index inversé est simple. Utilisez la méthode <code translate="no">create_index()</code> avec le paramètre <code translate="no">index_type</code> défini sur <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Indexer un champ JSON<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus étend ses capacités d'indexation aux champs JSON, ce qui vous permet de filtrer efficacement les données imbriquées ou structurées stockées dans une seule colonne. Contrairement aux champs scalaires, lors de l'indexation d'un champ JSON, vous devez fournir deux paramètres supplémentaires :</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> Spécifie la clé imbriquée à indexer.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Définit le type de données (par exemple, <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code>, ou <code translate="no">&quot;bool&quot;</code>) dans lequel la valeur JSON extraite sera convertie.</p></li>
</ul>
<p>Par exemple, considérons un champ JSON nommé <code translate="no">metadata</code> avec la structure suivante :</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>Pour créer des index inversés sur des chemins JSON spécifiques, vous pouvez utiliser l'approche suivante :</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Paramètre Description</p></th>
     <th><p>Exemple Valeur</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Nom du champ JSON dans votre schéma.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Type d'index à créer ; actuellement, seul <code translate="no">INVERTED</code> est pris en charge pour l'indexation des chemins JSON.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Facultatif) Un nom d'index personnalisé. Spécifiez des noms différents si vous créez plusieurs index sur le même champ JSON.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Spécifie le chemin JSON à indexer. Vous pouvez cibler des clés imbriquées, des positions de tableau ou les deux (par exemple, <code translate="no">metadata["product_info"]["category"]</code> ou <code translate="no">metadata["tags"][0]</code>). Si le chemin est manquant ou si l'élément de tableau n'existe pas pour une ligne particulière, cette ligne est simplement ignorée lors de l'indexation et aucune erreur n'est générée.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Type de données vers lequel Milvus convertira les valeurs JSON extraites lors de la construction de l'index. Valeurs valides :</p>
<ul>
<li><p><code translate="no">"bool"</code> ou <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> ou <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> ou <code translate="no">"VARCHAR"</code></p>
<p><strong>Remarque</strong>: Pour les valeurs entières, Milvus utilise en interne le type double pour l'index. Les grands nombres entiers supérieurs à 2^53 perdent en précision. Si la conversion échoue (en raison d'une incompatibilité de type), aucune erreur n'est générée et la valeur de cette ligne n'est pas indexée.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Considérations sur l'indexation JSON<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>Logique de filtrage</strong>:</p>
<ul>
<li><p>Si vous <strong>créez un index de type double</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), seules les conditions de filtrage de type numérique peuvent utiliser l'index. Si le filtre compare un index double à une condition non numérique, Milvus revient à la recherche par force brute.</p></li>
<li><p>Si vous <strong>créez un index de type varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), seules les conditions de filtrage de type chaîne peuvent utiliser l'index. Sinon, Milvus revient à la force brute.</p></li>
<li><p>L'indexation<strong>booléenne</strong> se comporte de la même manière que l'indexation de type varchar.</p></li>
</ul></li>
<li><p><strong>Expressions de termes</strong>:</p>
<ul>
<li>Vous pouvez utiliser <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. Cependant, l'index ne fonctionne que pour les valeurs scalaires stockées sous ce chemin. Si <code translate="no">json[&quot;field&quot;]</code> est un tableau, la requête revient à la force brute (l'indexation de type tableau n'est pas encore prise en charge).</li>
</ul></li>
<li><p><strong>Précision numérique</strong>:</p>
<ul>
<li>En interne, Milvus indexe tous les champs numériques sous forme de doubles. Si une valeur numérique dépasse <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>, elle perd en précision et les requêtes sur ces valeurs hors plage peuvent ne pas correspondre exactement.</li>
</ul></li>
<li><p><strong>Intégrité des données</strong>:</p>
<ul>
<li>Milvus n'analyse pas et ne transforme pas les clés JSON au-delà de la distribution spécifiée. Si les données source sont incohérentes (par exemple, certaines lignes stockent une chaîne pour la clé <code translate="no">&quot;k&quot;</code> alors que d'autres stockent un nombre), certaines lignes ne seront pas indexées.</li>
</ul></li>
</ul>
