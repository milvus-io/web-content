---
id: search_with_svs_vamana.md
summary: >-
  Créez et effectuez des recherches dans les index de graphes SVS Vamana en
  mémoire dans Milvus via le passage d'index FAISS, avec compression LeanVec ou
  LVQ en option sur les processeurs Intel.
title: Recherche avec SVS Vamana et Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Recherche avec SVS Vamana et Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) est la bibliothèque de recherche vectorielle haute performance d’Intel qui implémente l’algorithme de graphes Vamana. Dans Milvus, vous accédez à SVS Vamana via le <a href="https://milvus.io/docs/faiss.md">passage d’index FAISS</a>: définissez ` <code translate="no">index_type</code> ` sur ` <code translate="no">FAISS</code> ` et fournissez une chaîne de fabrication d’index ` <code translate="no">SVSVamana</code> ` ; Milvus construit et effectue alors la recherche dans l’index via l’intégration SVS de FAISS.</p>
<p>Vamana est la structure de graphe également utilisée par <a href="https://milvus.io/docs/diskann.md">DISKANN</a>, mais SVS Vamana conserve l’intégralité du graphe en mémoire. Il peut également compresser les vecteurs à l’aide de <strong>LeanVec</strong> ou de <strong>LVQ</strong>, ce qui réduit l’utilisation de la mémoire et accélère la recherche tout en conservant un taux de rappel très élevé.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 ou version ultérieure, compilé à partir du code source avec SVS activé</li>
<li>PyMilvus 3.0.0 ou version ultérieure</li>
<li>Un processeur Intel si vous utilisez un stockage de type « <code translate="no">LVQ*</code> » ou « <code translate="no">LeanVec*</code> » ; les stockages de type « <code translate="no">FP32</code> », « <code translate="no">FP16</code> » et « <code translate="no">SQ8</code> » fonctionnent sur n’importe quelle plateforme</li>
<li>Connaissance des <a href="https://milvus.io/docs/faiss.md">chaînes d'indexation FAISS</a></li>
</ul>
<div class="alert note">
<p>SVS n’est pas inclus dans la version par défaut de Milvus. Pour utiliser les chaînes de fabrication « <code translate="no">SVSVamana</code> », compilez Milvus à partir du code source avec l’option « <code translate="no">make USE_SVS=ON</code> ». Dans une compilation sans SVS, la création d’index échoue car Faiss ne reconnaît pas la chaîne de fabrication.</p>
</div>
<p>Les compressions LVQ et LeanVec ne fonctionnent que sur les processeurs Intel et sont plus rapides sur les processeurs dotés de l’AVX-512. Sur les autres processeurs, la création d’index échoue pour les chaînes de fabrication « <code translate="no">LVQ*</code> » et « <code translate="no">LeanVec*</code> ».</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">Fonctionnement de SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Graphique Vamana<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana construit un graphe de proximité à un seul niveau. Chaque vecteur est un nœud, et les arêtes relient les vecteurs susceptibles d’être des voisins proches. Pour construire le graphe, SVS procède comme suit pour chaque nœud <strong>x</strong>:</p>
<ol>
<li><p><strong>Recherche gloutonne</strong>: SVS explore le graphe construit jusqu’à présent, en conservant une liste de candidats de taille <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Élimination des voisins</strong>: les nœuds visités deviennent des voisins candidats pour <strong>x</strong>. SVS les examine par ordre croissant de distance par rapport à <strong>x</strong>. Un candidat <code translate="no">c</code> est ignoré si un voisin plus proche <code translate="no">n</code>, déjà conservé, satisfait à la condition <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. Cela permet de conserver les arêtes de longue portée et d’éliminer celles de courte portée redondantes, de sorte que la recherche puisse sauter d’un point à l’autre du graphe au lieu de le parcourir en se déplaçant d’un voisin le plus proche à la fois. L’élagage s’arrête une fois que le degré du graphe est atteint.</p></li>
<li><p><strong>Arêtes inverses</strong>: pour chaque nouveau voisin de <strong>x</strong>, SVS ajoute une arête inverse revenant vers <strong>x</strong> et élague la liste d’arêtes de ce voisin si celle-ci dépasse le degré du graphe.</p></li>
</ol>
<p>L’élagage s’effectue en deux passes : d’abord avec <code translate="no">alpha = 1</code>, puis avec la valeur configurée de <code translate="no">alpha</code>. Un degré de graphe plus élevé et une valeur de <code translate="no">construction_window_size</code> plus grande produisent un graphe plus dense et de meilleure qualité, mais utilisent davantage de mémoire et prennent plus de temps à construire.</p>
<p>Au moment de la recherche, SVS parcourt le graphe de manière gloutonne, en conservant dans la ` <code translate="no">search_window_size</code> ` les candidats les plus proches rencontrés jusqu’à présent. Il explore toujours ensuite le candidat non visité le plus proche. La recherche s’arrête dès que tous les voisins du nœud actuel sont plus éloignés de la requête que le pire candidat de la fenêtre. Une ` <code translate="no">search_window_size</code> ` plus grande explore davantage le graphe, ce qui augmente le rappel mais aussi la latence.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">Compression LeanVec<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> réduit à la fois le nombre de dimensions par vecteur et le nombre de bits par dimension. Un index LeanVec conserve deux représentations de chaque vecteur :</p>
<ul>
<li><p><strong>Primaire (dimensionnalité réduite)</strong>: une projection linéaire du vecteur vers un nombre réduit de dimensions. La recherche dans le graphe s’effectue sur cet ensemble de données primaire ; ainsi, la plupart des calculs de distance ont lieu dans l’espace de dimensionnalité réduite. Cela réduit à la fois les besoins en puissance de calcul et en bande passante mémoire. Par défaut, la dimensionnalité réduite correspond à la moitié de la dimensionnalité d’origine (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Secondaire (dimensionnalité complète)</strong>: le vecteur dans sa dimensionnalité d’origine. SVS reclassifie les candidats renvoyés par la recherche graphique primaire par rapport à cet ensemble de données secondaire afin de récupérer la précision perdue lors de la réduction de dimensionnalité.</p></li>
</ul>
<p>Les deux représentations sont quantifiées à l’aide de <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">la LVQ</a> (quantification vectorielle localement adaptative). Le composant « storage » de la chaîne d’initialisation sélectionne le codage. Par exemple, <code translate="no">LeanVec4x8</code> utilise 4 bits par dimension pour l’ensemble de données principal et 8 bits par dimension pour l’ensemble de données secondaire. Même l’étape de reclassement ne lit jamais de vecteur en précision pleine.</p>
<p>Par défaut, LeanVec apprend des projections distinctes pour les vecteurs indexés et pour les requêtes, afin de prendre en charge les requêtes issues d’une distribution différente de celle des vecteurs indexés (hors distribution, ou OOD). Cela fonctionne particulièrement bien pour les charges de travail intermodales telles que la recherche texte-image, et cela fonctionne également bien lorsque les requêtes proviennent de la même distribution que les vecteurs indexés. Milvus ne prend pas encore en charge la possibilité de transmettre des requêtes pour le calcul des projections ; par conséquent, seuls les vecteurs de base sont actuellement utilisés. L’entraînement OOD allonge le temps de compilation. Pour accélérer la construction au prix d’une légère perte de performances lors des requêtes, définissez ` <code translate="no">ood_training</code> ` sur ` <code translate="no">False</code>`.</p>
<h3 id="LVQ-compression" class="common-anchor-header">Compression LVQ<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour les ensembles de données comportant moins de 512 dimensions environ, il peut être plus efficace de ne pas effectuer de réduction de dimensionnalité et de se contenter d’une compression par quantification LVQ. À l’instar de LeanVec, un index LVQ conserve une représentation principale pour une recherche rapide et une représentation résiduelle pour le reclassement. Par exemple, <code translate="no">LVQ4x4</code> utilise 4 bits pour la représentation principale et 4 bits pour la représentation résiduelle. <code translate="no">LVQ4x0</code> et <code translate="no">LVQ8x0</code> ignorent le reclassement, ce qui accélère les requêtes si leur rappel est suffisamment bon pour votre charge de travail.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Choisissez une chaîne de fabrication<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>Les chaînes par défaut de SVS Vamana se présentent sous la forme <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, où <code translate="no">&lt;degree&gt;</code> correspond au nombre maximal d’arêtes par nœud dans le graphe.</p>
<table>
<thead>
<tr><th>Chaîne de départ</th><th>Stockage</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Vecteurs non compressés.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>Nombres à virgule flottante 16 bits</td><td>La moitié de la mémoire vectorielle d'<code translate="no">FP32</code>, avec une perte de précision minimale.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>Quantification scalaire sur 8 bits</td><td>Un quart de la mémoire vectorielle d'<code translate="no">FP32</code>.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ primaire, sans résidu</td><td>Processeurs Intel uniquement. Pas de reclassement.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ primaire et résiduel</td><td>Processeurs Intel uniquement.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec primaire et secondaire</td><td>processeurs Intel uniquement. Ajoutez le suffixe « <code translate="no">_&lt;dim&gt;</code> » pour définir la dimensionnalité réduite. Par exemple, « <code translate="no">LeanVec4x8_128</code> » réduit l’ensemble de données principal à 128 dimensions. Sans ce suffixe, la dimensionnalité réduite est « <code translate="no">dim / 2</code> ».</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> constitue un bon point de départ. À partir de là :</p>
<ul>
<li><p>Pour obtenir <strong>un rappel plus élevé</strong> au prix d’une consommation de mémoire plus importante, augmentez la dimensionnalité de LeanVec à l’aide du suffixe <code translate="no">_&lt;dim&gt;</code>.</p></li>
<li><p>Pour <strong>réduire l’empreinte mémoire</strong> au détriment d’une certaine perte de rappel, diminuez la dimensionnalité de LeanVec.</p></li>
<li><p>Pour les vecteurs de faible dimension, essayez ` <code translate="no">LVQ8</code>`.</p></li>
<li><p><strong>Sur les processeurs non Intel</strong>, utilisez <code translate="no">FP16</code> ou <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Créer l'index<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple suivant crée un index SVS Vamana avec un degré de graphe de 64 et une compression LeanVec. Développez le bloc de configuration et exécutez-le avant de créer l'index.</p>
<p><details></p>
<p><summary>Préparez la collection</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Définissez <code translate="no">index_type</code> sur <code translate="no">FAISS</code>, puis utilisez <code translate="no">faiss_index_name</code> pour sélectionner la recette SVS Vamana.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Effectuer une recherche dans l’index<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> contrôle le compromis entre le rappel et la latence, tout comme le paramètre « <code translate="no">ef</code> » pour <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. Définissez « <code translate="no">search_buffer_capacity</code> » sur une valeur au moins égale à celle-ci. La valeur par défaut de l’index pour ces deux paramètres est 10, et SVS rejette toute recherche dont la valeur de « <code translate="no">search_window_size</code> » est supérieure à celle de « <code translate="no">search_buffer_capacity</code> ».</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Si <code translate="no">limit</code> est supérieur à <code translate="no">search_window_size</code>, SVS étend la fenêtre à <code translate="no">limit</code> pour cette recherche.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">Paramètres SVS Vamana<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Les paramètres de construction suivants doivent être définis dans <code translate="no">params</code> au sein de <code translate="no">add_index()</code>, à côté de <code translate="no">faiss_index_name</code>. Vous ne pouvez pas les modifier une fois l’index construit.</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Valeur par défaut</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Taille de la liste de candidats utilisée pour trouver les voisins de chaque nœud lors de la construction du graphe. Des valeurs plus élevées améliorent la qualité du graphe et le taux de rappel, mais la construction prend plus de temps. Définissez-la au moins à la valeur du degré du graphe. 200 est une valeur couramment utilisée.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> pour <code translate="no">L2</code>, <code translate="no">0.95</code> pour <code translate="no">IP</code> et <code translate="no">COSINE</code></td><td>Intensité de l’élagage. Les valeurs éloignées de 1 permettent un élagage plus agressif, favorisant les arêtes de longue portée au détriment des arêtes redondantes de courte portée. Utilisez des valeurs supérieures à 1 pour <code translate="no">L2</code> et inférieures à 1 pour <code translate="no">IP</code> et <code translate="no">COSINE</code>. Conservez la valeur par défaut, sauf si vous avez mesuré une meilleure valeur sur vos données.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Degré dans la chaîne d’origine ou <code translate="no">32</code></td><td>Nombre maximal d’arêtes par nœud. Remplace le degré défini dans la chaîne d’usine. Les valeurs comprises entre [32, 128] conviennent à la plupart des charges de travail. Des valeurs plus élevées peuvent augmenter le rappel, mais utilisent davantage de mémoire et prennent plus de temps à construire.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Degré du graphe moins 4</td><td>Nombre d’arêtes qu’un nœud conserve après élagage dès lors qu’il dépasse le degré du graphe.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Nombre maximal de candidats pris en compte lors de l’élagage des voisins d’un nœud. Doit être supérieur à <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Indique si l’élagage prend en compte tous les nœuds visités au cours de la recherche de construction, et pas seulement les candidats finaux.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> suffixe de chaîne par défaut ou <code translate="no">dim / 2</code></td><td>LeanVec uniquement. Dimensionnalité réduite de l’ensemble de données principal. Remplace le suffixe de chaîne par défaut. Des valeurs plus faibles réduisent l’utilisation de la mémoire et accélèrent la recherche dans le graphe, mais diminuent le rappel.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> pour LeanVec</td><td>LeanVec uniquement. Indique s’il faut apprendre des projections distinctes pour les vecteurs indexés et les requêtes. Définissez ` <code translate="no">False</code> ` pour des constructions plus rapides. La définition de ` <code translate="no">True</code> ` pour toute instance autre que LeanVec échoue.</td></tr>
</tbody>
</table>
<p>Les paramètres de recherche suivants sont définis dans ` <code translate="no">search_params.params</code>`. Vous pouvez également les définir comme paramètres de construction, ce qui modifie les valeurs par défaut utilisées par l’index pour les recherches qui ne les spécifient pas.</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Valeur par défaut</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Nombre de candidats les plus proches conservés lors de la traversée du graphe. Des valeurs plus élevées augmentent le rappel et la latence.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Capacité du tampon de recherche. Doit être supérieure ou égale à <code translate="no">search_window_size</code>. Dans la plupart des cas, définissez-la à <code translate="no">search_window_size</code>. Pour LeanVec, essayez 1,5 fois <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">En savoir plus<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Consultez la documentation de référence <a href="https://milvus.io/docs/faiss.md">sur le passthrough de l’index FAISS</a> pour connaître le contrat général des chaînes de caractères, les limites et la gestion des erreurs.</li>
<li>Comparez avec l’implémentation Vamana sur disque dans <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>Consultez le <a href="https://github.com/intel/ScalableVectorSearch">dépôt SVS</a> pour obtenir des détails sur la compilation, l’optimisation des performances et l’API C++ sous-jacente.</li>
</ul>
