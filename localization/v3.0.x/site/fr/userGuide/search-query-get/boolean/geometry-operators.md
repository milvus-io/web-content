---
id: geometry-operators.md
title: Opérateurs géométriquesCompatible with Milvus 2.6.4+
summary: >-
  Milvus prend en charge un ensemble d'opérateurs de filtrage spatial sur les
  champs GEOMETRY, qui sont essentiels pour la gestion et l'analyse des données
  géométriques. Ces opérateurs permettent d'extraire des entités sur la base des
  relations géométriques entre les objets.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Operators" class="common-anchor-header">Opérateurs géométriques<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus prend en charge un ensemble d'opérateurs de filtrage spatial sur les champs <code translate="no">GEOMETRY</code>, qui sont essentiels pour la gestion et l'analyse des données géométriques. Ces opérateurs vous permettent d'extraire des entités sur la base des relations géométriques entre les objets.</p>
<p>Tous les opérateurs géométriques fonctionnent en prenant deux arguments géométriques : le nom du champ <code translate="no">GEOMETRY</code> défini dans le schéma de votre collection et un objet géométrique cible représenté au format <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text</a> (WKT).</p>
<h2 id="Use-syntax" class="common-anchor-header">Syntaxe d'utilisation<button data-href="#Use-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour filtrer sur un champ <code translate="no">GEOMETRY</code>, utilisez un opérateur géométrique dans une expression :</p>
<ul>
<li><p>Général : <code translate="no">{operator}(geo_field, '{wkt}')</code></p></li>
<li><p>Basé sur la distance : <code translate="no">ST_DWITHIN(geo_field, '{wkt}', distance)</code></p></li>
</ul>
<p>Où :</p>
<ul>
<li><p><code translate="no">operator</code> est l'un des opérateurs géométriques pris en charge (par exemple, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). Les noms des opérateurs doivent être en majuscules ou en minuscules. Pour obtenir la liste des opérateurs pris en charge, reportez-vous à la section <a href="/docs/fr/geometry-operators.md#Supported-geometry-operators">Opérateurs géométriques pris en charge</a>.</p></li>
<li><p><code translate="no">geo_field</code> est le nom de votre champ <code translate="no">GEOMETRY</code>.</p></li>
<li><p><code translate="no">'{wkt}'</code> est la représentation WKT de la géométrie à interroger.</p></li>
<li><p><code translate="no">distance</code> est le seuil spécifique à <code translate="no">ST_DWITHIN</code>.</p></li>
</ul>
<p>Pour en savoir plus sur les champs <code translate="no">GEOMETRY</code> dans Milvus, reportez-vous à la section <a href="/docs/fr/geometry-field.md">Champ géométrique</a>.</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">Opérateurs géométriques pris en charge<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant répertorie les opérateurs géométriques disponibles dans Milvus.</p>
<div class="alert note">
<p>Les noms des opérateurs doivent être <strong>en majuscules</strong> ou en <strong>minuscules</strong>. Ne mélangez pas les majuscules et les minuscules dans un même nom d'opérateur.</p>
</div>
<table>
   <tr>
     <th><p>Opérateur</p></th>
     <th><p>Description de l'opérateur</p></th>
     <th><p>Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> / <code translate="no">st_equals(A, B)</code></p></td>
     <td><p>Renvoie VRAI si deux géométries sont identiques dans l'espace, ce qui signifie qu'elles ont le même ensemble de points et la même dimension.</p></td>
     <td><p>Deux géométries (A et B) sont-elles exactement identiques dans l'espace ?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> / <code translate="no">st_contains(A, B)</code></p></td>
     <td><p>Renvoie VRAI si la géométrie A contient complètement la géométrie B, leurs intérieurs ayant au moins un point commun.</p></td>
     <td><p>Les limites d'une ville (A) contiennent-elles un parc spécifique (B) ?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> / <code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>Renvoie VRAI si les géométries A et B se croisent partiellement mais ne se contiennent pas entièrement.</p></td>
     <td><p>Deux routes (A et B) se croisent-elles à une intersection ?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> / <code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>Renvoie VRAI si les géométries A et B ont au moins un point commun. Il s'agit de la requête spatiale la plus générale et la plus utilisée.</p></td>
     <td><p>Une zone de recherche (A) croise-t-elle l'un des emplacements de magasin (B) ?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> / <code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>Renvoie VRAI si les géométries A et B sont de même dimension, se chevauchent partiellement et ne contiennent pas entièrement l'autre.</p></td>
     <td><p>Deux terrains (A et B) se chevauchent-ils ?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> / <code translate="no">st_touches(A, B)</code></p></td>
     <td><p>Retourne VRAI si les géométries A et B ont une limite commune mais que leurs intérieurs ne se croisent pas.</p></td>
     <td><p>Deux propriétés voisines (A et B) ont-elles une frontière commune ?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> / <code translate="no">st_within(A, B)</code></p></td>
     <td><p>Renvoie VRAI si la géométrie A est entièrement contenue dans la géométrie B, leurs intérieurs ayant au moins un point commun. C'est l'inverse de <code translate="no">ST_Contains(B, A)</code>.</p></td>
     <td><p>Un point d'intérêt spécifique (A) se trouve-t-il dans un rayon de recherche défini (B) ?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> / <code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>Renvoie VRAI si la distance entre la géométrie A et la géométrie B est inférieure ou égale à la distance spécifiée.</p><p><strong>Remarque</strong>: la géométrie B ne prend actuellement en charge que les points. L'unité de distance est le mètre.</p></td>
     <td><p>Trouver tous les points situés à moins de 5000 mètres d'un point spécifique (B).</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_EQUALS / st_equals<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_EQUALS</code> renvoie la valeur VRAIE si deux géométries sont identiques dans l'espace, c'est-à-dire si elles ont le même ensemble de points et la même dimension. Cet opérateur est utile pour vérifier si deux objets géométriques stockés représentent exactement le même emplacement et la même forme.</p>
<p><strong>Exemple</strong></p>
<p>Supposons que vous souhaitiez vérifier si une géométrie stockée (telle qu'un point ou un polygone) est exactement la même qu'une géométrie cible. Par exemple, vous pouvez comparer un point stocké à un point d'intérêt spécifique.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to check if a geometry matches a specific point</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_EQUALS(geo_field, &#x27;POINT(10 20)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCONTAINS--stcontains" class="common-anchor-header">ST_CONTAINS / st_contains<button data-href="#STCONTAINS--stcontains" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_CONTAINS</code> renvoie TRUE si la première géométrie contient complètement la seconde géométrie. Ceci est utile pour trouver des points à l'intérieur d'un polygone, ou des polygones plus petits à l'intérieur d'un plus grand.</p>
<p><strong>Exemple</strong></p>
<p>Imaginez que vous disposiez d'un ensemble de quartiers et que vous souhaitiez trouver un point d'intérêt spécifique, tel qu'un restaurant, situé à l'intérieur des limites d'un quartier donné.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries completely within a specific polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CONTAINS(geo_field, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCROSSES--stcrosses" class="common-anchor-header">ST_CROSSES / st_crosses<button data-href="#STCROSSES--stcrosses" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_CROSSES</code> renvoie <code translate="no">TRUE</code> si l'intersection de deux géométries forme une géométrie de dimension inférieure à celle des géométries d'origine. Cela s'applique typiquement à une ligne traversant un polygone ou une autre ligne.</p>
<p><strong>Exemple</strong></p>
<p>Vous souhaitez trouver tous les sentiers de randonnée (chaînes de lignes) qui traversent une ligne de démarcation spécifique (une autre chaîne de lignes) ou qui entrent dans une zone protégée (polygone).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / st_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_INTERSECTS</code> renvoie <code translate="no">TRUE</code> si deux géométries ont en commun un point de leurs limites ou de leurs intérieurs. Il s'agit d'un opérateur général permettant de détecter toute forme de chevauchement spatial.</p>
<p><strong>Exemple</strong></p>
<p>Si vous disposez d'une collection de routes et que vous souhaitez trouver toutes les routes qui traversent ou touchent une ligne spécifique représentant une nouvelle route proposée, vous pouvez utiliser <code translate="no">ST_INTERSECTS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that intersect with a specific line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo_field, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STOVERLAPS--stoverlaps" class="common-anchor-header">ST_OVERLAPS / st_overlaps<button data-href="#STOVERLAPS--stoverlaps" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_OVERLAPS</code> renvoie <code translate="no">TRUE</code> si deux géométries de même dimension ont une intersection partielle, où l'intersection elle-même a la même dimension que les géométries d'origine, mais n'est pas égale à l'une ou l'autre d'entre elles.</p>
<p><strong>Exemple</strong></p>
<p>Vous avez un ensemble de régions de vente qui se chevauchent et vous voulez trouver toutes les régions qui se chevauchent partiellement avec une nouvelle zone de vente proposée.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOUCHES / st_touches<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_TOUCHES</code> renvoie <code translate="no">TRUE</code> si les limites de deux géométries se touchent, mais que leurs intérieurs ne se croisent pas. Ceci est utile pour détecter les contiguïtés.</p>
<p><strong>Exemple</strong></p>
<p>Si vous disposez d'une carte des parcelles de propriété et que vous souhaitez trouver toutes les parcelles qui sont directement adjacentes à un parc public sans aucun chevauchement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_WITHIN / st_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_WITHIN</code> renvoie <code translate="no">TRUE</code> si la première géométrie se trouve entièrement à l'intérieur ou à la limite de la seconde géométrie. C'est l'inverse de <code translate="no">ST_CONTAINS</code>.</p>
<p><strong>Exemple</strong></p>
<p>Vous souhaitez trouver toutes les petites zones résidentielles situées entièrement à l'intérieur d'une zone de parc plus vaste.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d'informations sur l'utilisation d'un champ <code translate="no">GEOMETRY</code>, voir <a href="/docs/fr/geometry-field.md">Champ géométrique</a>.</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / st_dwithin<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ST_DWITHIN</code> renvoie <code translate="no">TRUE</code> si la distance entre la géométrie A et la géométrie B est inférieure ou égale à une valeur spécifiée (en mètres). Actuellement, la géométrie B doit être un point.</p>
<p><strong>Exemple</strong></p>
<p>Supposons que vous disposiez d'une collection d'emplacements de magasins et que vous souhaitiez trouver tous les magasins situés à moins de 5 000 mètres de l'emplacement d'un client spécifique.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
