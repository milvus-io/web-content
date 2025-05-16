---
id: limit_collection_counts.md
title: Fixer des limites au nombre d'encaissements
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Limiter le nombre de collections<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Une instance Milvus autorise jusqu'à 65 536 collections. Cependant, un trop grand nombre de collections peut entraîner des problèmes de performances. Il est donc recommandé de limiter le nombre de collections créées dans une instance Milvus.</p>
<p>Ce guide explique comment limiter le nombre de collections dans une instance Milvus.</p>
<p>La configuration varie en fonction du mode d'installation de l'instance Milvus.</p>
<ul>
<li><p>Pour les instances Milvus installées à l'aide de Helm Charts</p>
<p>Ajouter la configuration au fichier <code translate="no">values.yaml</code> dans la section <code translate="no">config</code>. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/configure-helm.md">Configurer Milvus avec Helm Charts</a>.</p></li>
<li><p>Pour les instances Milvus installées à l'aide de Docker Compose</p>
<p>Ajouter la configuration au fichier <code translate="no">milvus.yaml</code> que vous avez utilisé pour démarrer l'instance Milvus. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/configure-docker.md">Configurer Milvus avec Docker Compose</a>.</p></li>
<li><p>Pour les instances Milvus installées à l'aide de Operator</p>
<p>Ajouter la configuration à la section <code translate="no">spec.components</code> de la ressource personnalisée <code translate="no">Milvus</code>. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/configure_operator.md">Configurer Milvus avec Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Options de configuration<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p>Le paramètre <code translate="no">maxGeneralCapacity</code> définit le nombre maximum de collections que l'instance Milvus actuelle peut contenir. La valeur par défaut est <code translate="no">65536</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Calcul du nombre de collections<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans une collection, il est possible de configurer de multiples shards et partitions. Les groupes sont des unités logiques utilisées pour répartir les opérations d'écriture de données entre plusieurs nœuds de données. Les partitions sont des unités logiques utilisées pour améliorer l'efficacité de la récupération des données en ne chargeant qu'un sous-ensemble des données de la collection. Lorsque vous calculez le nombre de collections dans l'instance actuelle de Milvus, vous devez également compter les unités de stockage (shards) et les partitions.</p>
<p>Par exemple, supposons que vous ayez déjà créé <strong>100</strong> collections, avec <strong>2</strong> tessons et <strong>4</strong> partitions dans <strong>60</strong> d'entre elles et avec <strong>1</strong> tesson et <strong>12</strong> partitions dans les <strong>40</strong> autres collections. Le nombre actuel de collections peut être calculé comme suit :</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>Dans l'exemple ci-dessus, vous avez déjà utilisé <strong>960</strong> des limites par défaut. Maintenant, si vous voulez créer une nouvelle collection avec <strong>4</strong> tessons et <strong>20</strong> partitions, vous recevrez l'invite d'erreur suivante parce que le nombre total de collections dépasse la capacité maximale :</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>Pour éviter cette erreur, vous pouvez soit réduire le nombre de tessons ou de partitions dans les collections existantes ou nouvelles, soit supprimer certaines collections, soit augmenter la valeur de <code translate="no">maxGeneralCapacity</code>.</p>
