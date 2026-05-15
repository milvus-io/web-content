---
id: bm25-function.md
title: Fonction BM25
summary: >-
  La fonction BM25 permet la recherche en texte intégral en transformant le
  texte brut en vecteurs épars et en notant les documents en fonction de leur
  pertinence lexicale. Elle applique une correspondance basée sur les termes et
  une pondération basée sur la fréquence afin de permettre une récupération
  efficace des documents textuels qui correspondent étroitement aux termes de la
  requête.
---
<h1 id="BM25-Function" class="common-anchor-header">Fonction BM25<button data-href="#BM25-Function" class="anchor-icon" translate="no">
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
    </button></h1><p>La <strong>fonction BM25</strong> permet la <a href="/docs/fr/full-text-search.md">recherche en texte intégral</a> en transformant le texte brut en <strong>vecteurs épars</strong> et en notant les documents en fonction de leur pertinence lexicale. Elle applique une correspondance basée sur les termes et une pondération tenant compte de la fréquence afin de permettre une récupération efficace des documents textuels qui correspondent étroitement aux termes de la requête.</p>
<p>En tant que fonction textuelle locale, la fonction BM25 s'exécute dans Milvus et ne nécessite pas d'inférence de modèle ou d'intégrations externes. Elle fournit un mécanisme d'extraction déterministe et transparent pour les scénarios de recherche textuelle.</p>
<h2 id="How-BM25-works" class="common-anchor-header">Fonctionnement de la fonction BM25<button data-href="#How-BM25-works" class="anchor-icon" translate="no">
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
    </button></h2><p>L'algorithme <a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a> est un algorithme de notation de la pertinence basé sur les termes, largement utilisé dans la recherche de texte intégral. Dans Milvus, BM25 est mis en œuvre sous la forme d'un pipeline d'extraction clairsemé qui convertit le texte en représentations de poids des termes et extrait les <em>K</em> premiers documents à l'aide d'index clairsemés distribués.</p>
<p>Le flux de travail global se compose de deux voies symétriques : l'<strong>ingestion de documents</strong> et le <strong>traitement des requêtes</strong>, qui partagent la même logique d'analyse de texte.</p>
<h3 id="Document-ingestion-From-text-to-sparse-representation" class="common-anchor-header">L'ingestion de documents : Du texte à la représentation éparse<button data-href="#Document-ingestion-From-text-to-sparse-representation" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsqu'un document est inséré, son texte brut est d'abord traité par un <strong><a href="/docs/fr/analyzer-overview.md">analyseur</a></strong>, qui le transforme en termes individuels.</p>
<p>Par exemple, le document :</p>
<pre><code translate="no" class="language-plaintext">&quot;We are loving Milvus!&quot;
<button class="copy-code-btn"></button></code></pre>
<p>peut être analysé dans les termes suivants :</p>
<pre><code translate="no" class="language-plaintext">[&quot;we&quot;, &quot;love&quot;, &quot;milvus&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>Chaque document est ensuite représenté sous la forme d'une représentation de la fréquence des termes (TF), qui enregistre le nombre d'occurrences de chaque terme dans le document. Par exemple :</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;we&quot;: 1,
  &quot;love&quot;: 1,
  &quot;milvus&quot;: 1
}
<button class="copy-code-btn"></button></code></pre>
<p>En même temps, Milvus met à jour les statistiques au niveau du corpus, y compris :</p>
<ul>
<li><p>la fréquence des documents (FD) de chaque terme</p></li>
<li><p>la longueur moyenne des documents</p></li>
<li><p>les listes d'affichage qui associent chaque terme aux documents qui le contiennent.</p></li>
</ul>
<p>La représentation de la TF du document est insérée dans des <strong>encastrements clairsemés</strong>, où les affichages de termes sont répartis entre les nœuds pour une recherche évolutive.</p>
<h3 id="Query-text-process-Apply-IDF-weighting" class="common-anchor-header">Traitement du texte de la requête : Appliquer la pondération IDF<button data-href="#Query-text-process-Apply-IDF-weighting" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsqu'une requête textuelle est émise, elle est traitée par le <strong>même analyseur que</strong> celui utilisé lors de l'<a href="/docs/fr/bm25-function.md#Document-ingestion-From-text-to-sparse-representation">ingestion des documents</a>, ce qui garantit une segmentation cohérente des termes.</p>
<p>Par exemple, la requête :</p>
<pre><code translate="no" class="language-plaintext">&quot;who loves Milvus?&quot;
<button class="copy-code-btn"></button></code></pre>
<p>peut être analysée en :</p>
<pre><code translate="no" class="language-plaintext">[&quot;who&quot;, &quot;love&quot;, &quot;milvus&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>Pour chaque terme de la requête, Milvus recherche sa <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">fréquence inverse de document</a> (IDF) à partir des statistiques du corpus. L'IDF reflète le degré d'information d'un terme dans l'ensemble de la base de données : les termes plus rares reçoivent une pondération plus élevée, tandis que les termes courants reçoivent une pondération plus faible.</p>
<p>Conceptuellement, cela produit un ensemble de termes d'interrogation pondérés par l'IDF, comme par exemple :</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;who&quot;: 0.1,
  &quot;love&quot;: 0.5,
  &quot;milvus&quot;: 1.2
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="BM25-scoring-and-top-K-retrieval" class="common-anchor-header">Notation BM25 et recherche top K<button data-href="#BM25-scoring-and-top-K-retrieval" class="anchor-icon" translate="no">
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
    </button></h3><p>BM25 classe les documents en calculant un score de pertinence basé sur la correspondance des termes de la requête. La notation est effectuée au <strong>niveau des termes</strong> et agrégée au <strong>niveau des documents</strong>.</p>
<p><strong>Notation au niveau des termes</strong></p>
<p>Pour chaque terme de la requête apparaissant dans un document, BM25 calcule un score au niveau du terme :</p>
<pre><code translate="no" class="language-plaintext">term_score =
  IDF(term) ×
  TF_boost(term, document, k1) ×
  length_normalization(document, b)
<button class="copy-code-btn"></button></code></pre>
<p>Où :</p>
<ul>
<li><p><strong>IDF(terme)</strong> reflète la rareté du terme dans la collection</p></li>
<li><p><strong>TF_boost(..., k1)</strong> augmente avec la fréquence du terme mais sature lorsque la fréquence augmente</p></li>
<li><p><strong>length_normalization(..., b)</strong> ajuste le score en fonction de la longueur du document.</p></li>
</ul>
<p><strong>Notation au niveau du document et recherche Top-K</strong></p>
<p>Le score final du document est la somme des scores au niveau des termes pour tous les termes de la requête correspondants :</p>
<pre><code translate="no" class="language-plaintext">document_score =
  sum of term_score over all matched query terms
<button class="copy-code-btn"></button></code></pre>
<p>Les documents sont classés en fonction de leur score final, et les K documents ayant obtenu les meilleurs scores sont retournés.</p>
<h2 id="Before-you-start" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'utiliser la fonction BM25, planifiez le schéma de votre collection pour vous assurer qu'il prend en charge la recherche lexicale en texte intégral :</p>
<ul>
<li><p><strong>Un champ de texte pour le contenu brut</strong></p>
<p>Votre collection doit comporter un champ <code translate="no">VARCHAR</code> pour stocker le texte brut. Ce champ est la source du texte qui sera traité pour la recherche plein texte.</p></li>
<li><p><strong>Un analyseur pour le champ de texte</strong></p>
<p>Un analyseur doit être activé dans le champ de texte. L'analyseur définit la manière dont le texte est tokenisé et normalisé avant que la pertinence lexicale ne soit calculée par la fonction BM25.</p>
<p>Par défaut, Milvus fournit un analyseur intégré qui symbolise le texte en fonction des espaces blancs et de la ponctuation. Si votre application nécessite un comportement de tokénisation ou de normalisation personnalisé, vous pouvez définir un analyseur personnalisé. Voir <a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md">Choisir le bon analyseur pour votre cas d'utilisation</a> pour plus de détails.</p></li>
<li><p><strong>Un vecteur clairsemé pour la sortie BM25</strong></p>
<p>Votre collection doit inclure un champ <code translate="no">SPARSE_FLOAT_VECTOR</code> pour stocker les représentations éparses générées par la fonction BM25. Ce champ est utilisé pour l'indexation et l'extraction lors d'une recherche en texte intégral.</p></li>
</ul>
<p>Une fois que ces considérations au niveau du schéma sont réglées, vous pouvez créer la collection et utiliser la fonction BM25.</p>
<h2 id="Step-1-Create-a-collection-with-a-BM25-function" class="common-anchor-header">Étape 1 : Créer une collection avec une fonction BM25<button data-href="#Step-1-Create-a-collection-with-a-BM25-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser la fonction BM25, vous devez la définir lors de la création de la collection. La fonction fait partie du schéma de la collection et est appliquée automatiquement lors de l'insertion et de la recherche de données.</p>
<h4 id="Define-schema-fields" class="common-anchor-header">Définir les champs du schéma</h4><p>Le schéma de votre collection doit comprendre au moins trois champs obligatoires :</p>
<ul>
<li><p><strong>Champ primaire</strong>: Il identifie de manière unique chaque entité de la collection.</p></li>
<li><p><strong>Champ texte</strong> (<code translate="no">VARCHAR</code>) : Stocke les documents textuels bruts. Vous devez définir <code translate="no">enable_analyzer=True</code> afin que Milvus puisse traiter le texte pour le classement par pertinence de BM25. Par défaut, Milvus utilise l'analyseur <a href="/docs/fr/standard-analyzer.md"><code translate="no">standard</code></a> pour l'<a href="/docs/fr/standard-analyzer.md"> analyse</a> du texte. Pour configurer un autre analyseur, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md">Présentation de l'analyseur</a>.</p></li>
<li><p><strong>Champ vectoriel clair</strong> (<code translate="no">SPARSE_FLOAT_VECTOR</code>) : Stocke les encastrements épars générés automatiquement par la fonction BM25.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Primary field</span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Text field</span></span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># Sparse vector field; no dim required for sparse vectors</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey: token
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
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
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Define-the-BM25-function" class="common-anchor-header">Définition de la fonction BM25</h4><p>La fonction BM25 convertit le texte tokenisé en vecteurs épars qui prennent en charge l'évaluation BM25.</p>
<p>Définissez la fonction et ajoutez-la à votre schéma :</p>
<pre><code translate="no" class="language-python">bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
<span class="highlighted-wrapper-line">    function_type=FunctionType.BM25, <span class="hljs-comment"># Set to `BM25`</span></span>
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
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
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
<h4 id="Configure-the-index" class="common-anchor-header">Configurer l'index</h4><p>Après avoir défini le schéma avec les champs nécessaires et la fonction intégrée, configurez l'index pour votre collection.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,

    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }

)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
params.put(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>);
params.put(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>);

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(params)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>,
    index.NewAutoIndex(entity.MetricType(entity.BM25)))
    .WithExtraParam(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
            &quot;params&quot;:{
               &quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;,
               &quot;bm25_k1&quot;: 1.2,
               &quot;bm25_b&quot;: 0.75
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-the-collection" class="common-anchor-header">Créer la collection</h4><p>Créez maintenant la collection en utilisant le schéma et les paramètres d'index définis :</p>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
    <span class="hljs-attr">functions</span>: functions
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois la collection créée avec une fonction BM25, vous pouvez insérer du texte et effectuer des recherches lexicales sur la base d'une requête textuelle.</p>
<h2 id="Step-2-Insert-text-data-into-the-collection" class="common-anchor-header">Étape 2 : Insérer des données textuelles dans la collection<button data-href="#Step-2-Insert-text-data-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir configuré votre collection et votre index, vous êtes prêt à insérer des données textuelles. Pour ce faire, il vous suffit de fournir le texte brut. La fonction BM25 que nous avons définie précédemment génère automatiquement le vecteur épars pour chaque entrée de texte.</p>
<pre><code translate="no" class="language-python">client.insert(<span class="hljs-string">&#x27;my_collection&#x27;</span>, [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval is a field of study.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval focuses on finding relevant information in large datasets.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;data mining and information retrieval overlap in research.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
<span class="hljs-attr">data</span>: [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;text&quot;: &quot;information retrieval is a field of study.&quot;},
        {&quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;},
        {&quot;text&quot;: &quot;data mining and information retrieval overlap in research.&quot;}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text-query" class="common-anchor-header">Étape 3 : Recherche à l'aide d'une requête textuelle<button data-href="#Step-3-Search-with-text-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez inséré des données dans votre collection, vous pouvez effectuer des recherches en texte intégral à l'aide de requêtes de texte brut. Milvus convertit automatiquement votre requête en un vecteur clair et classe les résultats de recherche correspondants à l'aide de l'algorithme BM25, puis renvoie les topK (<code translate="no">limit</code>) résultats.</p>
<pre><code translate="no" class="language-python">search_params = {

}

res = client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>], <span class="hljs-comment"># Fields to return in search results; sparse field cannot be output</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;text: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;sparse&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,

)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        &quot;whats the focus of information retrieval?&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
        &quot;text&quot;
    ],
    &quot;searchParams&quot;:{
        &quot;params&quot;:{}
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
