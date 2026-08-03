---
id: array-operators.md
title: Opérateurs ARRAY
summary: >-
  Milvus fournit des opérateurs ARRAY permettant de filtrer les champs ARRAY et
  de mettre à jour partiellement les valeurs de ces champs.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Opérateurs ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fournit des opérateurs ARRAY permettant de filtrer les champs ARRAY et de mettre à jour partiellement les valeurs de ces champs.</p>
<div class="alert note">
<p>Tous les éléments d'un tableau doivent être du même type, et les structures imbriquées au sein des tableaux sont traitées comme de simples chaînes de caractères. Par conséquent, lorsque vous travaillez avec des champs ARRAY, il est conseillé d'éviter les imbrications trop profondes et de veiller à ce que vos structures de données soient aussi plates que possible pour des performances optimales.</p>
</div>
<p>Les opérateurs ARRAY de Milvus couvrent deux cas d’utilisation :</p>
<ul>
<li><p>Les expressions de filtrage pour les requêtes et les recherches.</p></li>
<li><p>Mises à jour partielles dans les requêtes « <code translate="no">upsert</code> ».</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Opérateurs ARRAY disponibles<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant répertorie les opérateurs ARRAY disponibles dans Milvus.</p>
<table>
<thead>
<tr><th>Opérateur</th><th>Utilisation dans</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/fr/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(identifiant, expr)</a></td><td>Expression de filtrage</td><td>Vérifie si un élément spécifique existe dans un champ ARRAY.</td></tr>
<tr><td><a href="/docs/fr/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(identifiant, expr)</a></td><td>Expression de filtrage</td><td>Vérifie si tous les éléments d'une liste spécifiée existent dans un champ ARRAY.</td></tr>
<tr><td><a href="/docs/fr/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(identifiant, expr)</a></td><td>Expression de filtrage</td><td>Vérifie si au moins un élément d'une liste spécifiée figure dans un champ ARRAY.</td></tr>
<tr><td><a href="/docs/fr/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(identifiant)</a></td><td>Expression de filtrage</td><td>Renvoie le nombre d'éléments d'un champ ARRAY et peut être combinée avec des opérateurs de comparaison à des fins de filtrage.</td></tr>
<tr><td><a href="/docs/fr/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> avec <code translate="no">field_ops</code></td><td>Ajoute des éléments de charge utile à un champ ARRAY existant. Disponible dans Milvus v2.6.17 et versions ultérieures.</td></tr>
<tr><td><a href="/docs/fr/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> avec <code translate="no">field_ops</code></td><td>Supprime tous les éléments d’un champ ARRAY existant qui correspondent à une valeur de la charge utile de la requête. Disponible à partir de Milvus v2.6.17.</td></tr>
</tbody>
</table>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur « <code translate="no">ARRAY_CONTAINS</code> » vérifie si un élément spécifique existe dans un champ de type « ARRAY ». Il est utile lorsque vous souhaitez rechercher des entités dans lesquelles un élément donné est présent dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Supposons que vous disposiez d’un champ de type tableau <code translate="no">history_temperatures</code>, qui contient les températures minimales enregistrées pour différentes années. Pour trouver toutes les entités dont le tableau contient la valeur <code translate="no">23</code>, vous pouvez utiliser l’expression de filtrage suivante :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités pour lesquelles le tableau ` <code translate="no">history_temperatures</code> ` contient la valeur ` <code translate="no">23</code>`.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>L’opérateur « <code translate="no">ARRAY_CONTAINS_ALL</code> » garantit que tous les éléments de la liste spécifiée sont présents dans le champ de type tableau. Cet opérateur est utile lorsque vous souhaitez faire correspondre des entités contenant plusieurs valeurs dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Si vous souhaitez rechercher toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » contient à la fois « <code translate="no">23</code> » et « <code translate="no">24</code> », vous pouvez utiliser :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » contient les deux valeurs spécifiées.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>L’opérateur ` <code translate="no">ARRAY_CONTAINS_ANY</code> ` vérifie si l’un des éléments de la liste spécifiée est présent dans le champ de type tableau. Cela est utile lorsque vous souhaitez faire correspondre les entités qui contiennent au moins l’une des valeurs spécifiées dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Pour rechercher toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » contient soit « <code translate="no">23</code> », soit « <code translate="no">24</code> », vous pouvez utiliser :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités dont le tableau ` <code translate="no">history_temperatures</code> ` contient au moins l’une des valeurs suivantes : ` <code translate="no">23</code> ` ou ` <code translate="no">24</code>`.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>L'<code translate="no">ARRAY_LENGTH</code> renvoie la longueur (nombre d'éléments) d'un champ de type tableau. Elle accepte exactement un paramètre : l'identifiant du champ de type tableau.</p>
<p><strong>Exemple</strong></p>
<p>Pour rechercher toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » comporte moins de 10 éléments :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » comporte moins de 10 éléments.</p>
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ARRAY_APPEND</code> ajoute des éléments de charge utile à un champ ARRAY existant lors d'une requête d'<code translate="no">upsert</code>. Il ne s'agit pas d'une expression de filtrage. Utilisez-le lorsque vous souhaitez ajouter des valeurs à un tableau sans interroger au préalable la valeur actuelle du tableau.</p>
<p>L’exemple Python suivant ajoute des éléments via ` <code translate="no">&quot;premium&quot;</code> ` au champ `ARRAY` de l’entité dont la clé primaire est ` <code translate="no">1</code>` lors d’une requête ` <code translate="no">tags</code> ` :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>L’ajout de <code translate="no">ARRAY_APPEND</code> à un champ via <code translate="no">field_ops</code> active la sémantique de mise à jour partielle pour ce champ. Pour connaître le workflow complet, les types d’éléments pris en charge et les limites, consultez <a href="/docs/fr/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">la section Champs ARRAY « Upsert » en mode fusion</a>.</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>L’opérateur « <code translate="no">ARRAY_REMOVE</code> » supprime tous les éléments d’un champ ARRAY existant qui correspondent à une valeur de la charge utile de la requête lors d’une requête « <code translate="no">upsert</code> ». Il ne s’agit pas d’une expression de filtrage. Utilisez-le lorsque vous souhaitez supprimer les valeurs correspondantes d’un tableau sans interroger au préalable la valeur actuelle du tableau.</p>
<p>L’exemple Python suivant supprime les éléments « <code translate="no">&quot;trial&quot;</code> » du champ ARRAY « <code translate="no">tags</code> » de l’entité dont la clé primaire est « <code translate="no">1</code> » :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>L’association d’ <code translate="no">ARRAY_REMOVE</code> à un champ via <code translate="no">field_ops</code> active la sémantique de mise à jour partielle pour ce champ. Pour connaître le workflow complet, les types d’éléments pris en charge et les limites, reportez-vous à <a href="/docs/fr/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">la section Champs ARRAY « Upsert » en mode fusion</a>.</p>
