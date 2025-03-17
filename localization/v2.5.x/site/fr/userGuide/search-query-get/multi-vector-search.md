---
id: multi-vector-search.md
order: 2
summary: >-
  Ce guide explique comment effectuer une recherche hybride dans Milvus et
  comprendre le classement des résultats.
title: Recherche hybride
---
<h1 id="Hybrid-Search​" class="common-anchor-header">Recherche hybride<button data-href="#Hybrid-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche hybride est une méthode de recherche qui effectue simultanément plusieurs recherches ANN, réorganise plusieurs ensembles de résultats issus de ces recherches ANN et renvoie finalement un seul ensemble de résultats. L'utilisation de la recherche hybride peut améliorer la précision de la recherche. Zilliz permet d'effectuer une recherche hybride sur une collection comportant plusieurs champs vectoriels. </p>
<p>La recherche hybride est le plus souvent utilisée dans des scénarios incluant des recherches vectorielles peu denses et des recherches multimodales. Ce guide montre comment effectuer une recherche hybride dans Zilliz à l'aide d'un exemple spécifique.</p>
<h2 id="Scenarios​" class="common-anchor-header">Scénarios<button data-href="#Scenarios​" class="anchor-icon" translate="no">
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
    </button></h2><p>La recherche hybride convient aux deux scénarios suivants.</p>
<h3 id="Sparse-Dense-Vector-Search​" class="common-anchor-header">Recherche de vecteurs denses et épars</h3><p>Différents types de vecteurs peuvent représenter différentes informations, et l'utilisation de différents modèles d'intégration peut représenter de manière plus complète différentes caractéristiques et aspects des données. Par exemple, l'utilisation de différents modèles d'intégration pour la même phrase peut générer un vecteur dense pour représenter le sens sémantique et un vecteur clairsemé pour représenter la fréquence des mots dans la phrase.</p>
<ul>
<li><p><strong>Vecteurs épars :</strong> Les vecteurs épars se caractérisent par leur dimensionnalité élevée et la présence de quelques valeurs non nulles. Cette structure les rend particulièrement adaptés aux applications traditionnelles de recherche d'informations. Dans la plupart des cas, le nombre de dimensions utilisées dans les vecteurs épars correspond à différents tokens dans une ou plusieurs langues. Chaque dimension se voit attribuer une valeur qui indique l'importance relative de ce mot dans le document. Cette disposition s'avère avantageuse pour les tâches qui impliquent la mise en correspondance de textes.</p></li>
<li><p><strong>Vecteurs denses :</strong> Les vecteurs denses sont des encastrements dérivés des réseaux neuronaux. Lorsqu'ils sont disposés dans un tableau ordonné, ces vecteurs capturent l'essence sémantique du texte d'entrée. Il convient de noter que les vecteurs denses ne sont pas limités au traitement de texte ; ils sont également largement utilisés dans le domaine de la vision par ordinateur pour représenter la sémantique des données visuelles. Ces vecteurs denses, généralement générés par des modèles d'intégration de texte, sont caractérisés par le fait que la plupart ou tous les éléments sont non nuls. Les vecteurs denses sont donc particulièrement efficaces pour les applications de recherche sémantique, car ils peuvent renvoyer les résultats les plus similaires sur la base de la distance vectorielle, même en l'absence de correspondances textuelles exactes. Cette capacité permet d'obtenir des résultats de recherche plus nuancés et tenant compte du contexte, en saisissant souvent des relations entre des concepts qui pourraient échapper aux approches basées sur les mots-clés.</p></li>
</ul>
<p>Pour plus de détails, voir <a href="/docs/fr/sparse_vector.md">Vecteur clair</a> et <a href="/docs/fr/dense-vector.md">Vecteur dense</a>.</p>
<h3 id="Multimodal-Search​" class="common-anchor-header">Recherche multimodale</h3><p>La recherche multimodale fait référence à la recherche de similarités entre des données non structurées et plusieurs modalités (images, vidéos, audio, texte, etc.). Par exemple, une personne peut être représentée à l'aide de différentes modalités de données telles que les empreintes digitales, les empreintes vocales et les traits du visage. La recherche hybride permet d'effectuer plusieurs recherches simultanément. Par exemple, la recherche d'une personne avec des empreintes digitales et des empreintes vocales similaires.</p>
<h2 id="Workflow​" class="common-anchor-header">Déroulement des opérations<button data-href="#Workflow​" class="anchor-icon" translate="no">
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
    </button></h2><p>La procédure principale pour effectuer une recherche hybride est la suivante.</p>
<ol>
<li><p>Générer des vecteurs denses à l'aide de modèles d'intégration tels que <a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERT</a> et <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformers</a>.</p></li>
<li><p>Générer des vecteurs peu denses à l'aide de modèles d'intégration tels que <a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADE</a>, etc. Dans Milvus, vous pouvez utiliser la fonction pour générer des vecteurs peu denses. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p></li>
<li><p>Créez une collection et définissez le schéma de la collection qui inclut les champs de vecteurs denses et épars.</p></li>
<li><p>Insérez des vecteurs peu denses dans la collection créée à l'étape précédente.</p></li>
<li><p>Effectuez une recherche hybride : La recherche ANN sur les vecteurs denses renverra un ensemble de K premiers résultats les plus similaires, et la correspondance de texte sur les vecteurs peu denses renverra également un ensemble de K premiers résultats.</p></li>
<li><p>Normalisation : Normaliser les scores des deux ensembles de résultats les plus similaires, en convertissant les scores en une plage comprise entre [0 et 1].</p></li>
<li><p>Choisir une stratégie de reclassement appropriée pour fusionner et reclasser les deux ensembles de résultats top-K et obtenir un ensemble final de résultats top-K.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>Processus de recherche hybride</span> </span></p>
<h2 id="Examples​" class="common-anchor-header">Exemples<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section utilise un exemple spécifique pour illustrer comment effectuer une recherche hybride sur des vecteurs peu denses afin d'améliorer la précision des recherches de texte.</p>
<h3 id="Create-a-collection-with-multiple-vector-fields​" class="common-anchor-header">Créer une collection avec plusieurs champs vectoriels</h3><p>Le processus de création d'une collection comprend trois parties : la définition du schéma de la collection, la configuration des paramètres de l'index et la création de la collection.</p>
<h4 id="Define-schema​" class="common-anchor-header">Définir le schéma</h4><p>Dans cet exemple, plusieurs champs vectoriels doivent être définis dans le schéma de la collection. Actuellement, chaque collection peut inclure jusqu'à 4 champs vectoriels par défaut. Mais vous pouvez également modifier la valeur de  <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a>  pour inclure jusqu'à 10 champs vectoriels dans une collection.</p>
<p>L'exemple suivant définit un schéma de collection, où <code translate="no">dense</code> et <code translate="no">sparse</code> sont les deux champs vectoriels.</p>
<ul>
<li><p><code translate="no">id</code>: Ce champ sert de clé primaire pour le stockage des identifiants de texte. Le type de données de ce champ est INT64.</p></li>
<li><p><code translate="no">text</code>: Ce champ est utilisé pour stocker le contenu textuel. Le type de données de ce champ est VARCHAR, avec une longueur maximale de 1000 caractères.</p></li>
<li><p><code translate="no">dense</code>: Ce champ est utilisé pour stocker les vecteurs denses des textes. Le type de données de ce champ est FLOAT_VECTOR, avec une dimension vectorielle de 768.</p></li>
<li><p><code translate="no">sparse</code>: Ce champ est utilisé pour stocker les vecteurs peu denses des textes. Le type de données de ce champ est SPARSE_FLOAT_VECTOR. Dans cet exemple, nous utilisons la fonction pour générer des vecteurs épars.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_field=<span class="hljs-literal">True</span>,​
)​
<span class="hljs-comment"># Add fields to schema​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)​
<span class="hljs-comment"># Define a sparse vector field to generate spare vectors with BM25</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">false</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">1000</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">768</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// WIP​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// Create a collection in customized setup mode​</span>
<span class="hljs-comment">// Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: false,​
        &quot;enabledDynamicField&quot;: true,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;text&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 1000​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;sparse&quot;,​
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
            },​
            {​
                &quot;fieldName&quot;: &quot;dense&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;768&quot;​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Lors de la recherche de vecteurs épars, vous pouvez simplifier le processus de génération de vecteurs d'intégration épars en tirant parti des fonctionnalités de la recherche plein texte. Pour plus de détails, voir <a href="/docs/fr/full-text-search.md">Recherche de texte intégral</a>.</p>
<h4 id="Define-function-to-generate-sparse-vectors​" class="common-anchor-header">Définir une fonction pour générer des vecteurs épars</h4><p>Pour générer des vecteurs épars, vous pouvez utiliser la fonction Function dans Milvus. L'exemple suivant définit une fonction pour générer des vecteurs épars à l'aide de l'algorithme BM25. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define function to generate sparse vectors</span>

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">functions</span> = [
    {
      name: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      description: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-built_in">type</span>: FunctionType.BM25,
      input_field_names: [<span class="hljs-string">&#x27;text&#x27;</span>],
      output_field_names: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      params: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ],
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
                &quot;params&quot;: {}
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-index​" class="common-anchor-header">Créer un index</h4><p>Après avoir défini le schéma de la collection, il est nécessaire de configurer les index des vecteurs et les métriques de similarité. Dans cet exemple, un index IVF_FLAT est créé pour le champ vectoriel dense <code translate="no">dense</code>, et un index SPARSE_INVERTED_INDEX est créé pour le champ vectoriel clairsemé <code translate="no">sparse</code>. Pour en savoir plus sur les types d'index pris en charge, voir <a href="https://milvus.io/docs/index.md?tab=floating">Index Explained</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
<span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()​
​
<span class="hljs-comment"># Add indexes​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},​
)​
​
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,  <span class="hljs-comment"># Set to `BM25` when using function to generate sparse vectors</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
denseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForDenseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;dense_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(denseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
sparseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);​ <span class="hljs-comment">// Algorithm used for building and querying the index</span>
<span class="hljs-title class_">IndexParam</span> indexParamForSparseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">BM25</span>)​
        .<span class="hljs-title function_">extraParams</span>(sparseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexParams.<span class="hljs-title function_">add</span>(indexParamForDenseField);​
indexParams.<span class="hljs-title function_">add</span>(indexParamForSparseField);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
},{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>​
}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_index&quot;,​
            &quot;indexType&quot;:&quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;:128}​
        },​
        {​
            &quot;fieldName&quot;: &quot;sparse&quot;,​
            &quot;metricType&quot;: &quot;BM25&quot;,​
            &quot;indexName&quot;: &quot;sparse_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection​" class="common-anchor-header">Création d'une collection</h4><p>Créez une collection nommée <code translate="no">demo</code> avec le schéma de collection et les index configurés dans les deux étapes précédentes.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
    <span class="hljs-attr">index_params</span>: index_params,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Insérer les données</h3><p>Insérez les vecteurs peu denses dans la collection <code translate="no">demo</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">2.7242085933685303</span>, <span class="hljs-number">6.021071434020996</span>, <span class="hljs-number">0.4754035174846649</span>, <span class="hljs-number">9.358858108520508</span>, <span class="hljs-number">5.173221111297607</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">1</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">8.584294319152832</span>, <span class="hljs-number">2.7640628814697266</span>, <span class="hljs-number">9.558855056762695</span>, <span class="hljs-number">2.584272861480713</span>, <span class="hljs-number">4.705013275146484</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;text&quot;</span>: docs[<span class="hljs-number">2</span>], <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">2.5525057315826416</span>, <span class="hljs-number">3.8815805912017822</span>, <span class="hljs-number">9.343480110168457</span>, <span class="hljs-number">7.888997554779053</span>, <span class="hljs-number">4.500918388366699</span>]},
]
​
res = client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    data=data​
)​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
<span class="hljs-type">float</span>[] dense1 = {<span class="hljs-number">2.7242086f</span>, <span class="hljs-number">6.0210714f</span>, <span class="hljs-number">0.47540352f</span>, <span class="hljs-number">9.3588581f</span>, <span class="hljs-number">5.1732211f</span>};
<span class="hljs-type">float</span>[] dense2 = {<span class="hljs-number">8.5842943f</span>, <span class="hljs-number">2.7640628f</span>, <span class="hljs-number">9.5588550f</span>, <span class="hljs-number">2.5842728f</span>, <span class="hljs-number">4.7050133f</span>};
<span class="hljs-type">float</span>[] dense3 = {<span class="hljs-number">2.5525057f</span>, <span class="hljs-number">3.8815806f</span>, <span class="hljs-number">9.3434801f</span>, <span class="hljs-number">7.8889976f</span>, <span class="hljs-number">4.5009184f</span>};
String[] docs = {
            <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
            <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
            <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>
};
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">0</span>]);
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">1</span>]);
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, docs[<span class="hljs-number">2</span>]);
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));
​
List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);​
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .data(data)​
        .build();​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>
];

<span class="hljs-keyword">const</span> data = [
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">0</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">2.7242085933685303</span>, <span class="hljs-number">6.021071434020996</span>, <span class="hljs-number">0.4754035174846649</span>, <span class="hljs-number">9.358858108520508</span>, <span class="hljs-number">5.173221111297607</span>]
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">1</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">8.584294319152832</span>, <span class="hljs-number">2.7640628814697266</span>, <span class="hljs-number">9.558855056762695</span>, <span class="hljs-number">2.584272861480713</span>, <span class="hljs-number">4.705013275146484</span>]
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">text</span>: docs[<span class="hljs-number">2</span>],
        <span class="hljs-attr">dense</span>: [<span class="hljs-number">2.5525057315826416</span>, <span class="hljs-number">3.8815805912017822</span>, <span class="hljs-number">9.343480110168457</span>, <span class="hljs-number">7.888997554779053</span>, <span class="hljs-number">4.500918388366699</span>]
    }
];
​
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [
            {
                &quot;id&quot;: 1,
                &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;,
                &quot;dense&quot;: [2.7242085933685303, 6.021071434020996, 0.4754035174846649, 9.358858108520508, 5.173221111297607]
            },
            {
                &quot;id&quot;: 2,
                &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;,
                &quot;dense&quot;: [8.584294319152832, 2.7640628814697266, 9.558855056762695, 2.584272861480713, 4.705013275146484]
            },
            {
                &quot;id&quot;: 3,
                &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;,
                &quot;dense&quot;: [2.5525057315826416, 3.8815805912017822, 9.343480110168457, 7.888997554779053, 4.500918388366699]
            }
        ],​
    &quot;collectionName&quot;: &quot;hybrid_search_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances​" class="common-anchor-header">Créer plusieurs instances AnnSearchRequest</h3><p>La recherche hybride est mise en œuvre en créant plusieurs <code translate="no">AnnSearchRequest</code> dans la fonction <code translate="no">hybrid_search()</code>, où chaque <code translate="no">AnnSearchRequest</code> représente une demande de recherche ANN de base pour un champ vectoriel spécifique. Par conséquent, avant d'effectuer une recherche hybride, il est nécessaire de créer un site <code translate="no">AnnSearchRequest</code> pour chaque champ vectoriel.</p>
<div class="alert note">
<p>Dans la recherche hybride, chaque site <code translate="no">AnnSearchRequest</code> ne prend en charge qu'un seul vecteur de requête.</p>
</div>
<p>Supposons que le texte de la requête "Qui a lancé la recherche sur l'IA ?" ait déjà été converti en vecteurs épars et denses. Sur cette base, deux requêtes de recherche <code translate="no">AnnSearchRequest</code> sont créées pour les champs vectoriels <code translate="no">sparse</code> et <code translate="no">dense</code> respectivement, comme le montre l'exemple suivant.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">AnnSearchRequest</span>​
​
search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.7425515055656433</span>, <span class="hljs-number">7.774101734161377</span>, <span class="hljs-number">0.7397570610046387</span>, <span class="hljs-number">2.429982900619507</span>, <span class="hljs-number">3.8253049850463867</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_1)

search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&#x27;Who started AI research&#x27;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_2)

reqs = [request_1, request_2]
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.TextVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.IndexParam;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MilvusSearchRequest</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
        <span class="hljs-type">float</span>[] denseQueryVector = {
                <span class="hljs-number">0.7425515f</span>, <span class="hljs-number">7.7741017f</span>, <span class="hljs-number">0.73975706f</span>, <span class="hljs-number">2.4299829f</span>, <span class="hljs-number">3.825305f</span>
        };

        <span class="hljs-type">String</span> <span class="hljs-variable">sparseQueryText</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Who started AI research&quot;</span>;

        List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(denseQueryVector));

        List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">TextVec</span>(sparseQueryText));

        List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

        searchRequests.add(AnnSearchReq.builder()
                .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)  <span class="hljs-comment">// Field Name</span>
                .vectors(queryDenseVectors) <span class="hljs-comment">// Query Vector</span>
                .metricType(IndexParam.MetricType.IP) <span class="hljs-comment">// Inner Product Metric</span>
                .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>) <span class="hljs-comment">// Search Params</span>
                .topK(<span class="hljs-number">2</span>) <span class="hljs-comment">// Limit results to top 2</span>
                .build());

        searchRequests.add(AnnSearchReq.builder()
                .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>) <span class="hljs-comment">// Field Name</span>
                .vectors(querySparseVectors) <span class="hljs-comment">// Query Text Vector</span>
                .metricType(IndexParam.MetricType.BM25) <span class="hljs-comment">// BM25 Metric for sparse</span>
                .params(<span class="hljs-string">&quot;{}&quot;</span>) <span class="hljs-comment">// No additional parameters for BM25</span>
                .topK(<span class="hljs-number">2</span>) <span class="hljs-comment">// Limit results to top 2</span>
                .build());

        System.out.println(<span class="hljs-string">&quot;Generated Search Requests:&quot;</span>);
        searchRequests.forEach(System.out::println);
    }
}


<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">0.7425515055656433</span>, <span class="hljs-number">7.774101734161377</span>, <span class="hljs-number">0.7397570610046387</span>, <span class="hljs-number">2.429982900619507</span>, <span class="hljs-number">3.8253049850463867</span>]], 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: { <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span> } 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
};

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;Who started AI research&quot;</span>], 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {} <span class="hljs-comment">// BM25 does not require extra parameters</span>
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
};

<span class="hljs-comment">// Combine both search parameters into a single request list</span>
<span class="hljs-keyword">const</span> reqs = [search_param_1, search_param_2];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.7425515055656433, 7.774101734161377, 0.7397570610046387, 2.429982900619507, 3.8253049850463867]], 
        &quot;anns_field&quot;: &quot;dense&quot;,
        &quot;param&quot;: {
            &quot;metric_type&quot;: &quot;IP&quot;,
            &quot;params&quot;: {
                &quot;nprobe&quot;: 10
            }
        },
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [&quot;Who started AI research&quot;],
        &quot;anns_field&quot;: &quot;sparse&quot;,
        &quot;param&quot;: {
            &quot;metric_type&quot;: &quot;BM25&quot;,
            &quot;params&quot;: {}
        },
        &quot;limit&quot;: 2
    }
]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://your-milvus-server-address/v1/vector/search&quot;</span> \
     -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&quot;<span class="hljs-variable">$req</span>&quot;</span>


<button class="copy-code-btn"></button></code></pre>
<p>Comme le paramètre <code translate="no">limit</code> est fixé à 2, chaque <code translate="no">AnnSearchRequest</code> renvoie 2 résultats de recherche. Dans cet exemple, 2 <code translate="no">AnnSearchRequest</code> sont créés, ce qui donne un total de 4 résultats de recherche.</p>
<h3 id="Configure-a-reranking-strategy​" class="common-anchor-header">Configurer une stratégie de reclassement</h3><p>Pour fusionner et reclasser les deux ensembles de résultats de recherche ANN, il est nécessaire de sélectionner une stratégie de reclassement appropriée. Zilliz prend en charge deux types de stratégie de reclassement : <strong>WeightedRanker</strong> et <strong>RRFRanker</strong>. Lors du choix d'une stratégie de reclassement, il convient de se demander si l'accent est mis sur une ou plusieurs recherches ANN de base sur les champs vectoriels.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Cette stratégie est recommandée si vous souhaitez que les résultats mettent l'accent sur un champ vectoriel particulier. Le WeightedRanker vous permet d'attribuer des poids plus élevés à certains champs vectoriels, ce qui les met davantage en valeur. Par exemple, dans les recherches multimodales, les descriptions textuelles d'une image peuvent être considérées comme plus importantes que les couleurs de cette image.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Cette stratégie est recommandée lorsqu'il n'y a pas d'importance particulière. Le RRF peut équilibrer efficacement l'importance de chaque champ vectoriel.</p></li>
</ul>
<p>Pour plus de détails sur les mécanismes de ces deux stratégies de reclassement, reportez-vous à la section <a href="/docs/fr/reranking.md">Reranking</a>.</p>
<p>Les deux exemples suivants montrent comment utiliser les stratégies de reclassement WeightedRanker et RRFRanker.</p>
<ol>
<li><p><strong>Exemple 1 : utilisation de WeightedRanker</strong></p>
<p>Lors de l'utilisation de la stratégie WeightedRanker, les valeurs de poids doivent être entrées dans la fonction <code translate="no">WeightedRanker</code>. Le nombre de recherches ANN de base dans une recherche hybride correspond au nombre de valeurs à entrer. Les valeurs saisies doivent être comprises dans l'intervalle [0,1], les valeurs proches de 1 indiquant une plus grande importance.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">WeightedRanker</span>​
​
ranker = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;ws&quot;,​
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Exemple 2 : utilisation de RRFRanker</strong></p>
<p>Lorsque vous utilisez la stratégie RRFRanker, vous devez saisir la valeur du paramètre <code translate="no">k</code> dans le RRFRanker. La valeur par défaut de <code translate="no">k</code> est 60. Ce paramètre permet de déterminer comment les classements sont combinés à partir de différentes recherches ANN, afin d'équilibrer et de mélanger l'importance de toutes les recherches.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">RRFRanker</span>​
​
ranker = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;rrf&quot;,​
        &quot;params&quot;: { &quot;k&quot;: 100}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search​" class="common-anchor-header">Effectuer une recherche hybride</h3><p>Avant d'effectuer une recherche hybride, il est nécessaire de charger la collection en mémoire. Si l'un des champs vectoriels de la collection n'a pas d'index ou n'est pas chargé, une erreur se produira lors de l'appel de la méthode de recherche hybride. </p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
res = client.hybrid_search(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    reqs=reqs,​
    ranker=ranker,​
    limit=<span class="hljs-number">2</span>​
)​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .searchRequests(searchRequests)​
        .ranker(reranker)​
        .topK(<span class="hljs-number">2</span>)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>​
})​
​
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;​
​
<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],​
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,​
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,​
    \&quot;rerank\&quot;: {​
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,​
        \&quot;params\&quot;: {​
            \&quot;k\&quot;: 10​
        }​
    },​
    \&quot;limit\&quot;: 3,​
    \&quot;outputFields\&quot;: [​
        \&quot;user_id\&quot;,​
        \&quot;word_count\&quot;,​
        \&quot;book_describe\&quot;​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Le résultat est le suivant.</p>
<pre><code translate="no" class="language-json">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]​

<button class="copy-code-btn"></button></code></pre>
<p>Puisque <code translate="no">limit=2</code> est spécifié dans la recherche hybride, Zilliz classera les quatre résultats de recherche de l'étape 3 et ne renverra finalement que les deux premiers résultats les plus similaires. </p>
