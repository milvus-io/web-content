---
id: bitset.md
summary: Découvrez les ensembles de bits dans Milvus.
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
    </button></h1><p>Cette rubrique présente le mécanisme de bitset qui permet de mettre en œuvre des fonctionnalités clés telles que le filtrage par attributs et <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">les opérations de suppression</a> dans Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Un ensemble de bits (bitset) est un ensemble de bits. Les bits sont des éléments ne pouvant prendre que deux valeurs : le plus souvent <code translate="no">0</code> et <code translate="no">1</code>, ou des valeurs booléennes <code translate="no">true</code> et <code translate="no">false</code>. Dans Milvus, les ensembles de bits sont des tableaux de nombres de bits <code translate="no">0</code> et <code translate="no">1</code> qui permettent de représenter certaines données de manière compacte et efficace, contrairement aux entiers (ints), aux nombres à virgule flottante (floats) ou aux caractères (chars). Un nombre binaire est par défaut de type « <code translate="no">0</code> » et n’est défini comme « <code translate="no">1</code> » que s’il répond à certaines exigences.</p>
<p>Les opérations sur les ensembles de bits s’effectuent selon <a href="/docs/fr/boolean.md">la logique booléenne</a>, selon laquelle une valeur de sortie est soit valide, soit invalide, également désignées respectivement par <code translate="no">1</code> et <code translate="no">0</code>. Par exemple, <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">l’opérateur logique</a> <code translate="no">AND</code> permet de comparer deux ensembles de bits en fonction des éléments occupant les mêmes positions d’index et génère un nouvel ensemble de bits contenant les résultats. Si deux éléments occupant une même position sont identiques, alors dans le nouvel ensemble de bits, <code translate="no">1</code> sera écrit à cette position ; <code translate="no">0</code> s’ils sont différents.</p>
<h2 id="Implementation" class="common-anchor-header">Implémentation<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Le jeu de bits est un mécanisme simple mais puissant qui aide Milvus à effectuer le filtrage par attribut, la suppression de données et les requêtes avec Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Filtrage par attribut<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>Comme les ensembles de bits ne contiennent que deux valeurs possibles, ils sont parfaits pour stocker les résultats d’ <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">un filtrage par attribut</a>. Les données qui répondent aux critères d’un filtre d’attribut donné sont marquées par « <code translate="no">1</code> ».</p>
<h3 id="Data-deletion" class="common-anchor-header">Suppression de données<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>Les bitsets constituent un moyen compact de stocker des informations indiquant si une ligne d’un segment a été supprimée. Les entités supprimées sont marquées par « <code translate="no">1</code> » dans le bitset correspondant, qui <a href="https://milvus.io/blog/deleting-data-in-milvus.md">ne sera pas pris en compte</a> lors d’une recherche ou d’une requête.</p>
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
    </button></h2><p>Nous présentons ici trois exemples illustrant l’utilisation des ensembles de bits dans Milvus, en faisant référence aux trois principales implémentations d’ensembles de bits évoquées ci-dessus. Dans les trois cas, il existe un segment comportant 8 entités, puis une série d’événements du langage de manipulation des données (DML) se déroule dans l’ordre indiqué ci-dessous.</p>
<ul>
<li>Quatre des entités, dont les « <code translate="no">primary_key</code>» sont respectivement [1, 2, 3, 4], sont insérées lorsque l’horodatage « <code translate="no">ts</code> » est égal à 100.</li>
<li>Les quatre autres entités, dont les <code translate="no">primary_key</code>s sont [5, 6, 7, 8], sont insérées lorsque l’horodatage <code translate="no">ts</code> est égal à 200.</li>
<li>Les entités dont les <code translate="no">primary_key</code>s sont [7, 8] sont supprimées lorsque l’horodatage <code translate="no">ts</code> est égal à 300.</li>
<li>Seules les entités dont les valeurs d’ <code translate="no">primary_key</code>sont [1, 3, 5, 7] satisfont aux conditions du filtrage par attribut.</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>Ordre des événements DML</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">Premier cas<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans ce cas, un utilisateur définit l’ <code translate="no">time_travel</code> sur 150, ce qui signifie qu’il effectue une requête sur les données qui satisfont à <code translate="no">ts = 150</code>. Le processus de génération du jeu de bits est illustré par la figure 1.</p>
<p>Au cours de la phase de filtrage initiale, l’ <code translate="no">filter_bitset</code> doit être <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, où les entités [1, 3, 5, 7] sont marquées comme <code translate="no">1</code> car elles constituent des résultats de filtrage valides.</p>
<p>Cependant, les entités [5, 6, 7, 8] n’ont pas été insérées dans la base de données vectorielle lorsque l’ <code translate="no">ts</code> est égal à 150. Par conséquent, ces quatre entités doivent être marquées de 0, quelle que soit la condition de filtrage. Le résultat du jeu de bits doit désormais être <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Comme indiqué dans la section « <a href="#data-deletion">Suppression de données</a> », les entités marquées par <code translate="no">1</code> sont ignorées lors d’une recherche ou d’une requête. Le résultat du jeu de bits doit désormais être inversé afin d’être combiné avec le bitmap de suppression, ce qui donne <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Quant au jeu de bits de suppression <code translate="no">del_bitset</code>, sa valeur initiale devrait être <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Cependant, les entités 7 et 8 ne sont supprimées que lorsque <code translate="no">ts</code> vaut 300. Par conséquent, lorsque <code translate="no">ts</code> vaut 150, les entités 7 et 8 sont toujours valides. Il en résulte que la valeur de <code translate="no">del_bitset</code> après le « Time Travel » est <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Nous disposons désormais de deux ensembles de bits après l’application de Time Travel et du filtrage par attribut : <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> et <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Combinez ces deux ensembles de bits à l’aide de l’opérateur logique binaire <code translate="no">OR</code>. La valeur finale de result_bitset est <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, ce qui signifie que seules les entités 1 et 3 seront prises en compte lors de l’étape suivante de recherche ou de requête.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>Figure 1. Recherche avec Time Travel = 150.</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">Deuxième cas<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans ce cas, l’utilisateur définit « <code translate="no">time_travel</code> » sur 250. Le processus de génération des ensembles de bits est illustré par la figure 2.</p>
<p>Comme dans le cas n° 1, l’ <code translate="no">filter_bitset</code> initial est <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Toutes les entités se trouvent dans la base de données vectorielle lorsque <code translate="no">ts</code> = 250. Par conséquent, <code translate="no">filter_bitset</code> reste inchangé lorsque l’on tient compte de l’horodatage. Là encore, il faut inverser le résultat pour obtenir <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Quant au jeu de bits de suppression <code translate="no">del_bitset</code>, la valeur initiale est <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. Cependant, les entités 7 et 8 n’ont été supprimées qu’à partir de <code translate="no">ts</code> = 300. Par conséquent, lorsque <code translate="no">ts</code> = 250, les entités 7 et 8 sont toujours valides. Il en résulte que le jeu de bits <code translate="no">del_bitset</code> après le « Time Travel » est <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Nous disposons désormais de deux ensembles de bits après le « Time Travel » et le filtrage par attributs : <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> et <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Combinez ces deux ensembles de bits à l’aide de l’opérateur logique binaire « <code translate="no">OR</code> ». L’ensemble de bits résultant (result_bitset) est <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Autrement dit, seules les entités [1, 3, 5, 7] seront prises en compte lors de l’étape suivante de recherche ou de requête.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>Figure 2. Recherche avec Time Travel = 250.</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">Troisième cas<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans ce cas, l’utilisateur définit « <code translate="no">time_travel</code> » sur 350. Le processus de génération des ensembles de bits est illustré par la figure 3.</p>
<p>Comme dans les cas précédents, l’ <code translate="no">filter_bitset</code> e initiale est <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Toutes les entités se trouvent dans la base de données vectorielle lorsque <code translate="no">ts</code>= 350. Par conséquent, le <code translate="no">filter_bitset</code> final, inversé, est <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, identique à celui du cas n° 2.</p>
<p>Quant à l’ensemble de bits de suppression <code translate="no">del_bitset</code>, les entités 7 et 8 ayant déjà été supprimées lorsque <code translate="no">ts = 350</code>, le résultat de <code translate="no">del_bitset</code> est donc <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Nous disposons désormais de deux ensembles de bits après le « Time Travel » et le filtrage par attribut : <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> et <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Combinez ces deux ensembles de bits à l’aide de l’opérateur logique binaire « <code translate="no">OR</code> ». Le résultat final <code translate="no">result_bitset</code> est <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Autrement dit, seules les entités [1, 3, 5] seront prises en compte lors de la phase suivante de recherche ou de requête.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>Figure 3. Recherche avec Time Travel = 350.</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Maintenant que vous savez comment fonctionnent les ensembles de bits dans Milvus, vous souhaiterez peut-être également :</p>
<ul>
<li>Apprendre à <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">utiliser des chaînes de caractères pour filtrer</a> vos résultats de recherche, ou consulter la section « <a href="https://milvus.io/docs/hybridsearch.md">Recherche hybride</a> » dans notre documentation.</li>
<li>Comprendre <a href="https://milvus.io/docs/v2.1.x/data_processing.md">comment les données sont traitées</a> dans Milvus.</li>
</ul>
