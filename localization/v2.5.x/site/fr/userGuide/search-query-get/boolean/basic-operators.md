---
id: basic-operators.md
summary: >-
  Milvus fournit un riche ensemble d'opérateurs de base pour vous aider à
  filtrer et à interroger efficacement les données. Ces opérateurs vous
  permettent d'affiner vos conditions de recherche en fonction de champs
  scalaires, de calculs numériques, de conditions logiques, etc. Il est
  essentiel de comprendre comment utiliser ces opérateurs pour élaborer des
  requêtes précises et maximiser l'efficacité de vos recherches.
title: Opérateurs de base
---
<h1 id="Basic-Operators​" class="common-anchor-header">Opérateurs de base<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fournit un ensemble riche d'opérateurs de base pour vous aider à filtrer et à interroger efficacement les données. Ces opérateurs vous permettent d'affiner vos conditions de recherche en fonction de champs scalaires, de calculs numériques, de conditions logiques, etc. Il est essentiel de comprendre comment utiliser ces opérateurs pour élaborer des requêtes précises et maximiser l'efficacité de vos recherches.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Opérateurs de comparaison<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Les opérateurs de comparaison sont utilisés pour filtrer les données en fonction de l'égalité, de l'inégalité ou de la taille. Ils s'appliquent aux champs numériques, de texte et de date.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Opérateurs de comparaison pris en charge.</h3><ul>
<li><p><code translate="no">==</code> (égal à)</p></li>
<li><p><code translate="no">!=</code> (différent de)</p></li>
<li><p><code translate="no">&gt;</code> (Supérieur à)</p></li>
<li><p><code translate="no">&lt;</code> (inférieur à)</p></li>
<li><p><code translate="no">&gt;=</code> (supérieur ou égal)</p></li>
<li><p><code translate="no">&lt;=</code> (Inférieur ou égal)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Exemple 1 : Filtrage avec Plus grand que ou égal à (<code translate="no">&gt;=</code>)</h3><p>Si vous voulez trouver toutes les entités dont le site <code translate="no">rating</code> est supérieur ou égal à 4.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Exemple 2 : Filtrage avec une valeur inférieure ou égale à (<code translate="no">&lt;=</code>)</h3><p>Pour trouver les entités dont l'adresse <code translate="no">discount</code> est inférieure ou égale à 10 %.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Opérateurs de plage<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Les opérateurs de plage permettent de filtrer les données en fonction d'ensembles ou de plages de valeurs spécifiques.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Opérateurs de plage pris en charge.</h3><ul>
<li><p><code translate="no">IN</code>: Utilisés pour faire correspondre des valeurs à l'intérieur d'un ensemble ou d'une plage spécifique.</p></li>
<li><p><code translate="no">LIKE</code>: Utilisé pour faire correspondre un modèle (principalement pour les champs de texte).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Exemple 1 : Utilisation de <code translate="no">IN</code> pour faire correspondre plusieurs valeurs</h3><p>Si vous souhaitez trouver toutes les entités dont la valeur <code translate="no">color</code> est soit &quot;rouge&quot;, soit &quot;verte&quot;, soit &quot;bleue&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>C'est utile lorsque vous souhaitez vérifier l'appartenance à une liste de valeurs.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Exemple 2 : utilisation de <code translate="no">LIKE</code> pour la recherche de motifs</h3><p>L'opérateur <code translate="no">LIKE</code> est utilisé pour la recherche de motifs dans les champs de type chaîne de caractères. Il peut faire correspondre des sous-chaînes à différentes positions dans le texte : en tant que <strong>préfixe</strong>, <strong>infixe</strong> ou <strong>suffixe</strong>. L'opérateur <code translate="no">LIKE</code> utilise le symbole <code translate="no">%</code> comme caractère de remplacement, qui peut correspondre à n'importe quel nombre de caractères (y compris zéro).</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Correspondance de préfixes (commence par)</h4><p>Pour effectuer une recherche par <strong>préfixe</strong>, où la chaîne commence par un motif donné, vous pouvez placer le motif au début et utiliser <code translate="no">%</code> pour rechercher tous les caractères qui le suivent. Par exemple, pour trouver tous les produits dont le site <code translate="no">name</code> commence par &quot;Prod&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Cela correspondra à tous les produits dont le nom commence par &quot;Prod&quot;, tels que &quot;Produit A&quot;, &quot;Produit B&quot;, etc.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Correspondance par suffixe (se termine par)</h4><p>Pour une correspondance par <strong>suffixe</strong>, lorsque la chaîne se termine par un motif donné, placez le symbole <code translate="no">%</code> au début du motif. Par exemple, pour trouver tous les produits dont le site <code translate="no">name</code> se termine par &quot;XYZ&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Cette recherche portera sur tous les produits dont le nom se termine par &quot;XYZ&quot;, tels que &quot;ProductXYZ&quot;, &quot;SampleXYZ&quot;, etc.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Correspondance infixe (contient)</h4><p>Pour effectuer une correspondance <strong>infixe</strong>, où le motif peut apparaître n'importe où dans la chaîne, vous pouvez placer le symbole <code translate="no">%</code> au début et à la fin du motif. Par exemple, pour trouver tous les produits dont le site <code translate="no">name</code> contient le mot &quot;Pro&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Cela correspondra à tous les produits dont le nom contient la sous-chaîne &quot;Pro&quot;, comme &quot;Product&quot;, &quot;ProLine&quot; ou &quot;SuperPro&quot;.</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">Opérateurs arithmétiques<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Les opérateurs arithmétiques vous permettent de créer des conditions basées sur des calculs impliquant des champs numériques.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Opérateurs arithmétiques pris en charge.</h3><ul>
<li><p><code translate="no">+</code> (Addition)</p></li>
<li><p><code translate="no">-</code> (Soustraction)</p></li>
<li><p><code translate="no">*</code> (Multiplication)</p></li>
<li><p><code translate="no">/</code> (division)</p></li>
<li><p><code translate="no">%</code> (Modulus)</p></li>
<li><p><code translate="no">**</code> (exponentiation)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Exemple 1 : Utilisation de l'addition (<code translate="no">+</code>)</h3><p>Pour trouver les entités dont le prix <code translate="no">total</code> est la somme de <code translate="no">base_price</code> et <code translate="no">tax</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Exemple 2 : Utilisation de la soustraction (<code translate="no">-</code>)</h3><p>Pour trouver les entités où <code translate="no">quantity</code> est supérieur à 50 et <code translate="no">quantity_sold</code> est inférieur à 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Exemple 3 : Utilisation de la multiplication (<code translate="no">*</code>)</h3><p>Pour trouver les entités où <code translate="no">price</code> est supérieur à 100 et <code translate="no">quantity</code> est supérieur à 10, multiplié.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Exemple 4 : Utilisation de la division (<code translate="no">/</code>)</h3><p>Pour trouver des produits où <code translate="no">total_price</code> divisé par <code translate="no">quantity</code> est inférieur à 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Exemple 5 : Utilisation du module (<code translate="no">%</code>)</h3><p>Pour trouver des entités dont le <code translate="no">id</code> est un nombre pair (c'est-à-dire divisible par 2).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Exemple 6 : Utilisation de l'exponentiation (<code translate="no">**</code>)</h3><p>Pour trouver les entités où <code translate="no">price</code> élevé à la puissance 2 est supérieur à 1000.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">Opérateurs logiques<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Les opérateurs logiques sont utilisés pour combiner plusieurs conditions dans une expression de filtre plus complexe. Ils comprennent <code translate="no">AND</code>, <code translate="no">OR</code>, et <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Opérateurs logiques pris en charge.</h3><ul>
<li><p><code translate="no">AND</code>: Combine plusieurs conditions qui doivent toutes être vraies.</p></li>
<li><p><code translate="no">OR</code>: Combine des conditions dont au moins une doit être vraie.</p></li>
<li><p><code translate="no">NOT</code>: Négation d'une condition.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Exemple 1 : Utilisation de <code translate="no">AND</code> pour combiner des conditions</h3><p>Trouver tous les produits pour lesquels <code translate="no">price</code> est supérieur à 100 et <code translate="no">stock</code> est supérieur à 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Exemple 2 : Utilisation de <code translate="no">OR</code> pour combiner des conditions</h3><p>Pour trouver tous les produits pour lesquels <code translate="no">color</code> est soit &quot;rouge&quot;, soit &quot;bleu&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Exemple 3 : Utilisation de <code translate="no">NOT</code> pour exclure une condition</h3><p>Pour trouver tous les produits pour lesquels <code translate="no">color</code> n'est pas &quot;vert&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Conseils sur l'utilisation des opérateurs de base avec les champs JSON et ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Si les opérateurs de base de Milvus sont polyvalents et peuvent être appliqués à des champs scalaires, ils peuvent également être utilisés efficacement avec les clés et les index des champs JSON et ARRAY.</p>
<p>Par exemple, si vous avez un champ <code translate="no">product</code> qui contient plusieurs clés comme <code translate="no">price</code>, <code translate="no">model</code>, et <code translate="no">tags</code>, faites toujours référence à la clé directement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Pour trouver les enregistrements dont la première température d'un tableau de températures enregistrées dépasse une certaine valeur, utilisez .</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Conclusion<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus propose une gamme d'opérateurs de base qui vous offrent une grande souplesse dans le filtrage et l'interrogation de vos données. En combinant des opérateurs de comparaison, de plage, arithmétiques et logiques, vous pouvez créer des expressions de filtrage puissantes pour réduire les résultats de vos recherches et récupérer efficacement les données dont vous avez besoin.</p>
