---
id: bitset.md
summary: En savoir plus sur les bitsets à Milvus.
title: Bitset
---
<h1 id="Bitset" class="common-anchor-header">Bitset<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente le mécanisme de bitset qui permet d'activer des fonctionnalités clés telles que le filtrage d'attributs et les <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">opérations de suppression</a> dans Milvus.</p>
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
    </button></h2><p>Un ensemble de bits est un ensemble de bits. Les bits sont des éléments qui n'ont que deux valeurs possibles, le plus souvent <code translate="no">0</code> et <code translate="no">1</code>, ou des valeurs booléennes <code translate="no">true</code> et <code translate="no">false</code>. Dans Milvus, les ensembles de bits sont des tableaux de nombres de bits <code translate="no">0</code> et <code translate="no">1</code> qui peuvent être utilisés pour représenter certaines données de manière compacte et efficace, contrairement aux ints, aux floats ou aux chars. Un nombre de bits est <code translate="no">0</code> par défaut et n'est défini sur <code translate="no">1</code> que s'il répond à certaines exigences.</p>
<p>Les opérations sur les ensembles de bits sont effectuées en <a href="/docs/fr/v2.4.x/boolean.md">logique booléenne</a>, selon laquelle une valeur de sortie est soit valide, soit invalide, également désignée par <code translate="no">1</code> et <code translate="no">0</code> respectivement. Par exemple, l'<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">opérateur logique</a> <code translate="no">AND</code> peut être utilisé pour comparer deux ensembles de bits sur la base des éléments situés dans les mêmes positions d'index et produit un nouvel ensemble de bits avec les résultats. Si deux éléments d'une position sont identiques, le nouvel ensemble binaire contiendra <code translate="no">1</code> à cette position et <code translate="no">0</code> s'ils sont différents.</p>
<h2 id="Implementation" class="common-anchor-header">Mise en œuvre<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Le jeu de bits est un mécanisme simple mais puissant qui permet à Milvus d'effectuer le filtrage d'attributs, la suppression de données et l'interrogation avec Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Filtrage des attributs</h3><p>Comme les bitsets ne contiennent que deux valeurs possibles, ils sont parfaits pour stocker les résultats du <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">filtrage d'attributs</a>. Les données qui répondent aux exigences d'un filtre d'attribut donné sont marquées par <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Suppression de données</h3><p>Les bitsets constituent un moyen compact de stocker des informations indiquant si une ligne d'un segment a été supprimée. Les entités supprimées sont marquées par <code translate="no">1</code> dans le jeu de bits correspondant, qui <a href="https://milvus.io/blog/deleting-data-in-milvus.md">ne sera pas calculé</a> lors d'une recherche ou d'une interrogation.</p>
<h2 id="Examples" class="common-anchor-header">Exemples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous présentons ici trois exemples qui illustrent la manière dont les ensembles de bits sont utilisés dans Milvus, avec des références aux trois principales implémentations d'ensembles de bits discutées ci-dessus. Dans les trois cas, il y a un segment avec 8 entités, puis une série d'événements de langage de manipulation de données (DML) se déroule dans l'ordre indiqué ci-dessous.</p>
<ul>
<li>Quatre des entités, dont les <code translate="no">primary_key</code>sont respectivement [1, 2, 3, 4], sont insérées lorsque l'horodatage <code translate="no">ts</code> est égal à 100.</li>
<li>Les quatre autres entités, dont les adresses <code translate="no">primary_key</code>sont [5, 6, 7, 8], sont insérées lorsque l'horodatage <code translate="no">ts</code> est égal à 200.</li>
<li>Les entités dont les <code translate="no">primary_key</code>sont [7, 8] sont supprimées lorsque l'horodatage <code translate="no">ts</code> est égal à 300.</li>
<li>Seules les entités dont les adresses <code translate="no">primary_key</code>sont [1, 3, 5, 7] satisfont aux conditions de filtrage des attributs.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>Ordre des événements DML</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">Premier cas</h3><p>Dans ce cas, un utilisateur définit <code translate="no">time_travel</code> comme étant 150, ce qui signifie qu'il effectue une requête sur des données qui satisfont à <code translate="no">ts = 150</code>. Le processus de génération de l'ensemble de bits est illustré par la figure 1.</p>
<p>Au cours de la phase de filtrage initiale, <code translate="no">filter_bitset</code> devrait être <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, où les entités [1, 3, 5, 7] sont marquées comme <code translate="no">1</code> parce qu'elles sont des résultats de filtrage valides.</p>
<p>Cependant, les entités [4, 5, 6, 7] n'ont pas été insérées dans la base de données vectorielle lorsque <code translate="no">ts</code> est égal à 150. Par conséquent, ces quatre entités doivent être marquées comme 0, quelle que soit la condition de filtrage. Le résultat de l'ensemble de bits est maintenant <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Comme indiqué dans <a href="#data-deletion">Suppression des données</a>, les entités marquées par <code translate="no">1</code> sont ignorées lors d'une recherche ou d'une interrogation. Le résultat de l'ensemble de bits doit maintenant être inversé afin d'être combiné avec le bitmap de suppression, ce qui nous donne <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>En ce qui concerne le jeu de bits de suppression <code translate="no">del_bitset</code>, la valeur initiale devrait être <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Cependant, les entités 7 et 8 ne sont pas supprimées tant que <code translate="no">ts</code> n'a pas atteint la valeur 300. Par conséquent, lorsque <code translate="no">ts</code> vaut 150, les entités 7 et 8 sont encore valides. Par conséquent, la valeur de <code translate="no">del_bitset</code> après le voyage dans le temps est <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Nous avons maintenant deux ensembles de bits après le voyage dans le temps et le filtrage des attributs : <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> et <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Combinez ces deux ensembles de bits avec l'opérateur logique binaire <code translate="no">OR</code>. La valeur finale de result_bitset est <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, ce qui signifie que seules les entités 1 et 3 seront calculées lors de l'étape suivante de recherche ou d'interrogation.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>Figure 1. Recherche avec déplacement dans le temps = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">Deuxième cas</h3><p>Dans ce cas, l'utilisateur fixe la valeur de <code translate="no">time_travel</code> à 250. Le processus de génération de l'ensemble de bits est illustré par la figure 2.</p>
<p>Comme dans le premier cas, la valeur initiale de <code translate="no">filter_bitset</code> est <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Toutes les entités se trouvent dans la base de données vectorielle lorsque <code translate="no">ts</code> = 250. Par conséquent, le <code translate="no">filter_bitset</code> reste le même lorsque nous prenons en compte l'horodatage. Une fois de plus, nous devons inverser le résultat et obtenir <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>En ce qui concerne l'ensemble de bits de suppression <code translate="no">del_bitset</code>, la valeur initiale est <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Cependant, les entités 7 et 8 n'ont pas été supprimées avant que <code translate="no">ts</code> ne soit 300. Par conséquent, lorsque <code translate="no">ts</code> est à 250, les entités 7 et 8 sont encore valides. Par conséquent, le jeu de bits <code translate="no">del_bitset</code> après le voyage dans le temps est <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Nous avons maintenant deux ensembles de bits après le voyage dans le temps et le filtrage des attributs : <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> et <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Combinez ces deux ensembles de bits avec l'opérateur logique binaire <code translate="no">OR</code>. L'ensemble de bits résultant est <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. En d'autres termes, seules les entités [1, 3, 5, 7] seront calculées lors de l'étape suivante de recherche ou d'interrogation.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>Figure 2. Recherche avec déplacement dans le temps = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">Troisième cas</h3><p>Dans ce cas, l'utilisateur fixe <code translate="no">time_travel</code> à 350. Le processus de génération de l'ensemble de bits est illustré par la figure 3.</p>
<p>Comme dans les cas précédents, la valeur initiale de <code translate="no">filter_bitset</code> est <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Toutes les entités se trouvent dans la base de données vectorielle lorsque <code translate="no">ts</code>= 350. Par conséquent, le jeu de bits final inversé <code translate="no">filter_bitset</code> est <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, comme dans le deuxième cas.</p>
<p>Quant à l'ensemble de bits de suppression <code translate="no">del_bitset</code>, les entités 7 et 8 ayant déjà été supprimées lors de <code translate="no">ts = 350</code>, le résultat de <code translate="no">del_bitset</code> est donc <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Nous avons maintenant deux ensembles binaires après le voyage dans le temps et le filtrage des attributs : <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> et <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Combinez ces deux ensembles de bits avec l'opérateur logique binaire <code translate="no">OR</code>. L'ultime <code translate="no">result_bitset</code> est <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. En d'autres termes, seules les entités [1, 3, 5] seront calculées lors de l'étape suivante de recherche ou d'interrogation.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>Figure 3. Recherche avec voyage dans le temps = 350</span>. </span></p>
<h2 id="Whats-next" class="common-anchor-header">Et maintenant ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Maintenant que vous savez comment fonctionnent les ensembles de bits dans Milvus, vous pouvez également :</p>
<ul>
<li>Apprendre à <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utiliser des chaînes pour filtrer</a> vos résultats de recherche, ou vous référer à la <a href="https://milvus.io/docs/hybridsearch.md">recherche hybride</a> dans notre documentation.</li>
<li>Comprendre <a href="https://milvus.io/docs/v2.1.x/data_processing.md">comment les données sont traitées</a> dans Milvus.</li>
</ul>
