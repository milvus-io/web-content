---
id: bitmap.md
title: BITMAP
related_key: bitmap
summary: >-
  L'indexation bitmap est une technique d'indexation efficace conçue pour
  améliorer les performances des requêtes sur des champs scalaires à faible
  cardinalité.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indexation bitmap est une technique d'indexation efficace conçue pour améliorer les performances des requêtes sur des champs scalaires à faible cardinalité. La cardinalité fait référence au nombre de valeurs distinctes dans un champ. Les champs comportant moins d'éléments distincts sont considérés comme étant de faible cardinalité.</p>
<p>Ce type d'index permet de réduire le temps d'extraction des requêtes scalaires en représentant les valeurs des champs dans un format binaire compact et en effectuant des opérations bit à bit efficaces sur ces valeurs. Par rapport à d'autres types d'index, les index bitmap ont généralement une meilleure efficacité spatiale et des vitesses d'interrogation plus rapides lorsqu'ils traitent des champs à faible cardinalité.</p>
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
    </button></h2><p>Le terme "bitmap" combine deux mots : <strong>Bit</strong> et <strong>Map</strong>. Un bit représente la plus petite unité de données dans un ordinateur, qui ne peut contenir que la valeur <strong>0</strong> ou <strong>1</strong>. Une carte, dans ce contexte, fait référence au processus de transformation et d'organisation des données en fonction de la valeur à attribuer à 0 et à 1.</p>
<p>Un index bitmap se compose de deux éléments principaux : les bitmaps et les clés. Les clés représentent les valeurs uniques du champ indexé. À chaque valeur unique correspond une image binaire. La longueur de ces images est égale au nombre d'enregistrements de la collection. Chaque bit dans le bitmap correspond à un enregistrement de la collection. Si la valeur du champ indexé d'un enregistrement correspond à la clé, le bit correspondant est mis à <strong>1</strong>; sinon, il est mis à <strong>0</strong>.</p>
<p>Considérons une collection de documents avec des champs <strong>Catégorie</strong> et <strong>Public</strong>. Nous voulons retrouver les documents qui appartiennent à la catégorie <strong>Tech</strong> et qui sont ouverts au <strong>public</strong>. Dans ce cas, les clés de nos index bitmap sont <strong>Tech</strong> et <strong>Public</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>Indexation bitmap</span> </span></p>
<p>Comme le montre la figure, les index bitmap pour <strong>Catégorie</strong> et <strong>Public</strong> sont les suivants.</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], ce qui montre que seuls les 1er et 3e documents appartiennent à la catégorie <strong>Tech</strong>.</p></li>
<li><p><strong>Public</strong>: [1, 0, 0, 1, 0], ce qui montre que seuls les 1er et 4e documents sont ouverts au <strong>public</strong>.</p></li>
</ul>
<p>Pour trouver les documents qui correspondent aux deux critères, nous effectuons une opération ET bit à bit sur ces deux images.</p>
<ul>
<li><strong>Tech</strong> AND <strong>Public</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>Le bitmap résultant [1, 0, 0, 0, 0] indique que seul le premier document<strong>(ID</strong> <strong>1)</strong> répond aux deux critères. L'utilisation d'index bitmap et d'opérations bitwise efficaces permet de restreindre rapidement le champ de la recherche et d'éviter d'avoir à parcourir l'ensemble des données.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Créer un index bitmap<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour créer un index bitmap dans Milvus, utilisez la méthode <code translate="no">create_index()</code> et définissez le paramètre <code translate="no">index_type</code> sur <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, nous créons un index bitmap sur le champ <code translate="no">category</code> de la collection <code translate="no">my_collection</code>. La méthode <code translate="no">add_index()</code> est utilisée pour spécifier le nom du champ, le type d'index et le nom de l'index.</p>
<p>Une fois l'index bitmap créé, vous pouvez utiliser le paramètre <code translate="no">filter</code> dans les opérations de requête pour effectuer un filtrage scalaire basé sur le champ indexé. Cela vous permet de réduire efficacement les résultats de la recherche à l'aide de l'index bitmap. Pour plus d'informations, voir <a href="/docs/fr/boolean.md">Filtrage des métadonnées</a>.</p>
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
    </button></h2><ul>
<li><p>Les index bitmap ne sont pris en charge que pour les champs scalaires qui ne sont pas des clés primaires.</p></li>
<li><p>Le type de données du champ doit être l'un des suivants.</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (les éléments doivent être l'un des suivants : <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Les index bitmap ne prennent pas en charge les types de données suivants.</p>
<ul>
<li><p><code translate="no">FLOAT</code> <code translate="no">DOUBLE</code>: Les types de données à virgule flottante ne sont pas compatibles avec la nature binaire des index bitmap.</p></li>
<li><p><code translate="no">JSON</code>: Les types de données JSON ont une structure complexe qui ne peut pas être représentée efficacement à l'aide d'index bitmap.</p></li>
</ul></li>
<li><p>Les index bitmap ne conviennent pas aux champs à forte cardinalité (c'est-à-dire aux champs comportant un grand nombre de valeurs distinctes).</p>
<ul>
<li><p>En règle générale, les index bitmap sont plus efficaces lorsque la cardinalité d'un champ est inférieure à 500.</p></li>
<li><p>Lorsque la cardinalité dépasse ce seuil, les avantages des index bitmap en termes de performances diminuent et la surcharge de stockage devient importante.</p></li>
<li><p>Pour les champs de cardinalité élevée, envisagez d'utiliser d'autres techniques d'indexation, telles que les index inversés, en fonction de votre cas d'utilisation spécifique et des exigences de la requête.</p></li>
</ul></li>
</ul>
