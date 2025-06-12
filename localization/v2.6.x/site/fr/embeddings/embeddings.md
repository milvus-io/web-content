---
id: embeddings.md
order: 1
summary: Apprenez à générer des embeddings pour vos données.
title: Vue d'ensemble de l'intégration
---
<h1 id="Embedding-Overview" class="common-anchor-header">Vue d'ensemble de l'intégration<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>L'intégration est un concept d'apprentissage automatique qui permet de mapper des données dans un espace à haute dimension, où les données ayant une sémantique similaire sont placées à proximité les unes des autres. Il s'agit généralement d'un réseau neuronal profond de BERT ou d'autres familles de transformateurs. Le modèle d'intégration peut représenter efficacement la sémantique du texte, des images et d'autres types de données avec une série de nombres connus sous le nom de vecteurs. L'une des principales caractéristiques de ces modèles est que la distance mathématique entre les vecteurs dans l'espace à haute dimension peut indiquer la similarité de la sémantique du texte ou des images d'origine. Cette propriété ouvre la voie à de nombreuses applications de recherche d'informations, telles que les moteurs de recherche sur le web comme Google et Bing, la recherche de produits et les recommandations sur les sites de commerce électronique, ainsi que le paradigme récemment populaire de la génération augmentée de recherche (RAG) dans l'intelligence artificielle générative.</p>
<p>Il existe deux catégories principales d'encastrements, chacune produisant un type de vecteur différent :</p>
<ul>
<li><p><strong>L</strong>'<strong>encastrement dense</strong>: La plupart des modèles d'intégration représentent l'information sous la forme d'un vecteur à virgule flottante de centaines ou de milliers de dimensions. Les résultats sont appelés vecteurs "denses" car la plupart des dimensions ont des valeurs non nulles. Par exemple, le modèle d'intégration à code source ouvert BAAI/bge-base-fr-v1.5 produit des vecteurs de 768 nombres à virgule flottante (vecteur flottant à 768 dimensions).</p></li>
<li><p><strong>Enrobage clairsemé</strong>: En revanche, les vecteurs de sortie des encapsulages épars ont la plupart des dimensions égales à zéro, c'est-à-dire des vecteurs "épars". Ces vecteurs ont souvent des dimensions beaucoup plus élevées (des dizaines de milliers ou plus) qui sont déterminées par la taille du vocabulaire de jetons. Les vecteurs épars peuvent être générés par des réseaux neuronaux profonds ou par l'analyse statistique de corpus de textes. En raison de leur facilité d'interprétation et de leurs meilleures capacités de généralisation hors domaine, les vecteurs épars sont de plus en plus adoptés par les développeurs en complément des vecteurs denses.</p></li>
</ul>
<p>Milvus est une base de données vectorielles conçue pour la gestion, le stockage et l'extraction de données vectorielles. Grâce à l'intégration des modèles d'intégration et de <a href="https://milvus.io/docs/rerankers-overview.md">reclassement</a>, vous pouvez facilement transformer un texte original en vecteurs consultables ou reclasser les résultats à l'aide de modèles puissants afin d'obtenir des résultats plus précis pour le RAG. Cette intégration simplifie la transformation du texte et élimine le besoin de composants d'intégration ou de reclassement supplémentaires, ce qui rationalise le développement et la validation des RAG.</p>
<p>Pour créer des embeddings en action, voir <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Utilisation du modèle de PyMilvus pour générer des embeddings de texte</a>.</p>
<table>
<thead>
<tr><th>Fonction d'intégration</th><th>Type de fonction</th><th>API ou Open-sourced</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">transformateur de phrases</a></td><td>Dense</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Sparse</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Hybride</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">cohère</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Instructeur</a></td><td>Dense</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Mistral AI</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">mGTE</a></td><td>Hybride</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">Modèle2Vec</a></td><td>Hybride</td><td>En libre accès</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/GeminiEmbeddingFunction/GeminiEmbeddingFunction.md">Gemini</a></td><td>Hybride</td><td>Privé</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Exemple 1 : utiliser la fonction d'intégration par défaut pour générer des vecteurs denses<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser les fonctions d'intégration avec Milvus, installez d'abord la bibliothèque client PyMilvus avec le sous-paquetage <code translate="no">model</code> qui contient tous les utilitaires de génération d'intégration.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le sous-paquet <code translate="no">model</code> prend en charge différents modèles d'intégration, depuis <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>, jusqu'aux modèles pré-entraînés <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>. Par souci de simplicité, cet exemple utilise le modèle <code translate="no">DefaultEmbeddingFunction</code> qui est un modèle de transformateur de phrase <strong>tout-MiniLM-L6-v2</strong>. Le modèle pèse environ 70 Mo et il sera téléchargé lors de la première utilisation :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat attendu est similaire à ce qui suit :</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Exemple 2 : Générer des vecteurs denses et épars en un seul appel avec le modèle BGE M3<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cet exemple, nous utilisons le modèle hybride <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> pour intégrer du texte dans des vecteurs denses et épars et les utiliser pour retrouver des documents pertinents. Les étapes générales sont les suivantes :</p>
<ol>
<li><p>Incorporer le texte dans des vecteurs denses et épars à l'aide du modèle BGE-M3 ;</p></li>
<li><p>Mise en place d'une collection Milvus pour stocker les vecteurs denses et épars ;</p></li>
<li><p>Insérer les données dans Milvus ;</p></li>
<li><p>Rechercher et inspecter le résultat.</p></li>
</ol>
<p>Tout d'abord, nous devons installer les dépendances nécessaires.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    FieldSchema, CollectionSchema, DataType,
    Collection, AnnSearchRequest, RRFRanker, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Utiliser BGE M3 pour encoder les documents et les requêtes pour la recherche par incorporation.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
