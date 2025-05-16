---
id: funnel_search_with_matryoshka.md
summary: >-
  Dans ce carnet, nous examinons comment utiliser les encastrements Matryoshka
  avec Milvus pour la recherche sémantique. Nous illustrons un algorithme appelé
  "funnel search" qui nous permet d'effectuer une recherche de similarité sur un
  petit sous-ensemble de nos dimensions d'intégration sans baisse drastique du
  rappel.
title: Recherche en entonnoir avec Matryoshka Embeddings
---
<h1 id="Funnel-Search-with-Matryoshka-Embeddings" class="common-anchor-header">Recherche en entonnoir avec Matryoshka Embeddings<button data-href="#Funnel-Search-with-Matryoshka-Embeddings" class="anchor-icon" translate="no">
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
    </button></h1><div style='margin: auto; width: 50%;'><img translate="no" src='/docs/v2.5.x/assets/funnel-search.png' width='100%'></div>
Lors de la construction de systèmes de recherche vectorielle efficaces, l'un des principaux défis consiste à gérer les coûts de stockage tout en maintenant une latence et un rappel acceptables. Les modèles d'intégration modernes produisent des vecteurs comportant des centaines ou des milliers de dimensions, ce qui entraîne une surcharge de stockage et de calcul importante pour le vecteur brut et l'index.<p>Traditionnellement, les besoins en stockage sont réduits par l'application d'une méthode de quantification ou de réduction de la dimensionnalité juste avant la construction de l'index. Par exemple, nous pouvons économiser de l'espace de stockage en réduisant la précision à l'aide de la quantification par produit (PQ) ou le nombre de dimensions à l'aide de l'analyse en composantes principales (ACP). Ces méthodes analysent l'ensemble des vecteurs pour en trouver un plus compact qui préserve les relations sémantiques entre les vecteurs.</p>
<p>Bien qu'efficaces, ces approches standard ne réduisent la précision ou la dimensionnalité qu'une seule fois et à une seule échelle. Mais que se passerait-il si nous pouvions maintenir simultanément plusieurs couches de détails, comme une pyramide de représentations de plus en plus précises ?</p>
<p>C'est là qu'interviennent les encastrements Matryoshka. Nommées d'après les poupées russes gigognes (voir illustration), ces constructions astucieuses intègrent plusieurs échelles de représentation dans un seul vecteur. Contrairement aux méthodes traditionnelles de post-traitement, les Matryoshka embeddings apprennent cette structure multi-échelle au cours du processus d'apprentissage initial. Le résultat est remarquable : non seulement l'intégration complète capture la sémantique de l'entrée, mais chaque préfixe de sous-ensemble imbriqué (première moitié, premier quart, etc.) fournit une représentation cohérente, bien que moins détaillée.</p>
<p>Dans ce carnet, nous examinons comment utiliser les encastrements Matryoshka avec Milvus pour la recherche sémantique. Nous illustrons un algorithme appelé "funnel search" qui nous permet d'effectuer une recherche de similarité sur un petit sous-ensemble de nos dimensions d'encastrement sans baisse drastique du rappel.</p>
<h2 id="Preparation" class="common-anchor-header">Préparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install datasets numpy pandas pymilvus sentence-transformers tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour le CPU uniquement :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour CUDA 11.8 :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118</span>
<button class="copy-code-btn"></button></code></pre>
<p>La commande d'installation de CUDA 11.8 n'est qu'un exemple. Veuillez confirmer votre version CUDA lors de l'installation de PyTorch.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> functools

<span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Matryoshka-Embedding-Model" class="common-anchor-header">Charger le modèle d'intégration Matryoshka<button data-href="#Load-Matryoshka-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Au lieu d'utiliser un modèle d'intégration standard tel que <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2"><code translate="no">sentence-transformers/all-MiniLM-L12-v2</code></a>nous utilisons <a href="https://huggingface.co/nomic-ai/nomic-embed-text-v1">un modèle de Nomic</a> entraîné spécialement pour produire des embeddings Matryoshka.</p>
<pre><code translate="no" class="language-python">model = SentenceTransformer(
    <span class="hljs-comment"># Remove &#x27;device=&#x27;mps&#x27; if running on non-Mac device</span>
    <span class="hljs-string">&quot;nomic-ai/nomic-embed-text-v1.5&quot;</span>,
    trust_remote_code=<span class="hljs-literal">True</span>,
    device=<span class="hljs-string">&quot;mps&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&lt;All keys matched successfully&gt;
</code></pre>
<h2 id="Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="common-anchor-header">Chargement de l'ensemble de données, intégration des éléments et construction de la base de données vectorielle<button data-href="#Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Le code suivant est une modification de celui de la page de documentation <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Movie Search with Sentence Transformers and Milvus".</a> Tout d'abord, nous chargeons le jeu de données de HuggingFace. Il contient environ 35k entrées, chacune correspondant à un film ayant un article Wikipédia. Nous utiliserons les champs <code translate="no">Title</code> et <code translate="no">PlotSummary</code> dans cet exemple.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dataset({
    features: ['Release Year', 'Title', 'Origin/Ethnicity', 'Director', 'Cast', 'Genre', 'Wiki Page', 'Plot', 'PlotSummary'],
    num_rows: 34886
})
</code></pre>
<p>Ensuite, nous nous connectons à une base de données Milvus Lite, nous spécifions le schéma de données et nous créons une collection avec ce schéma. Nous stockerons à la fois l'intégration non normalisée et le premier sixième de l'intégration dans des champs distincts. La raison en est que nous avons besoin du premier 1/6e de l'intégration de Matryoshka pour effectuer une recherche de similarité, et des 5/6e restants de l'intégration pour le reclassement et l'amélioration des résultats de la recherche.</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">768</span>
search_dim = <span class="hljs-number">128</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;./wiki-movie-plots-matryoshka.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    <span class="hljs-comment"># First sixth of unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    <span class="hljs-comment"># Entire unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus ne prend pas actuellement en charge la recherche sur des sous-ensembles d'enchâssements, c'est pourquoi nous divisons les enchâssements en deux parties : la tête représente le sous-ensemble initial du vecteur à indexer et à rechercher, et la queue est le reste. Le modèle est formé pour la recherche de similarité par distance cosinusoïdale, nous normalisons donc les intégrations de tête. Cependant, afin de calculer ultérieurement les similarités pour des sous-ensembles plus importants, nous devons stocker la norme de l'intégration de la tête, afin de pouvoir la dé-normaliser avant de la joindre à la queue.</p>
<p>Pour effectuer une recherche via le premier 1/6e de l'intégration, nous devrons créer un index de recherche vectorielle sur le champ <code translate="no">head_embedding</code>. Plus tard, nous comparerons les résultats de la "recherche en entonnoir" à ceux d'une recherche vectorielle classique, et construirons donc également un index de recherche sur l'ensemble de l'intégration.</p>
<p><em>Il est important de noter que nous utilisons la métrique de distance <code translate="no">COSINE</code> plutôt que <code translate="no">IP</code>, car sinon nous devrions tenir compte des normes d'intégration, ce qui compliquerait la mise en œuvre (cela aura plus de sens une fois que l'algorithme de recherche en entonnoir aura été décrit).</em></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Enfin, nous codons les résumés de l'intrigue pour l'ensemble des 35 000 films et entrons les encastrements correspondants dans la base de données.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    <span class="hljs-comment"># This particular model requires us to prefix &#x27;search_document:&#x27; to stored entities</span>
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Output of embedding model is unnormalized</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:57&lt;00:00,  5.18s/it]
</code></pre>
<h2 id="Performing-Funnel-Search" class="common-anchor-header">Recherche en entonnoir<button data-href="#Performing-Funnel-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Mettons maintenant en œuvre une "recherche en entonnoir" en utilisant le premier 1/6e des dimensions de l'encastrement de Matryoshka. J'ai en tête trois films à récupérer et j'ai produit mon propre résumé de l'intrigue pour interroger la base de données. Nous intégrons les requêtes, puis nous effectuons une recherche vectorielle sur le champ <code translate="no">head_embedding</code>, ce qui nous permet d'obtenir 128 résultats.</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&quot;An archaeologist searches for ancient artifacts while fighting Nazis.&quot;</span>,
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>,
    <span class="hljs-string">&quot;A young couple with a kid look after a hotel during winter and the husband goes insane.&quot;</span>,
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


<span class="hljs-comment"># This particular model requires us to prefix &#x27;search_query:&#x27; to queries</span>
instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries]
search_data = embed_search(instruct_queries)

<span class="hljs-comment"># Normalize head embeddings</span>
head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data]

<span class="hljs-comment"># Perform standard vector search on first sixth of embedding dimensions</span>
res = client.search(
    collection_name=collection_name,
    data=head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>À ce stade, nous avons effectué une recherche sur un espace vectoriel beaucoup plus petit et nous sommes donc susceptibles d'avoir réduit la latence et les besoins de stockage de l'index par rapport à une recherche sur l'espace complet. Examinons les 5 premiers résultats pour chaque requête :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits][:<span class="hljs-number">5</span>]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
The Passage
Counterblast
Dominion: Prequel to the Exorcist

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
How to Deal
Shorts
Blackbird
Valentine
Unfriended

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
Ghostkeeper
Our Vines Have Tender Grapes
The Ref
Impact
The House in Marsh Road
</code></pre>
<p>Comme nous pouvons le constater, le rappel a souffert de la troncature des encastrements lors de la recherche. La recherche en entonnoir résout ce problème grâce à une astuce astucieuse : nous pouvons utiliser le reste des dimensions d'intégration pour reclasser et élaguer notre liste de candidats afin de récupérer les performances d'extraction sans effectuer de recherches vectorielles supplémentaires coûteuses.</p>
<p>Pour faciliter la présentation de l'algorithme de recherche en entonnoir, nous convertissons les résultats de la recherche Milvus pour chaque requête en un cadre de données Pandas.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hits_to_dataframe</span>(<span class="hljs-params">hits: pymilvus.client.abstract.Hits</span>) -&gt; pd.DataFrame:
    <span class="hljs-string">&quot;&quot;&quot;
    Convert a Milvus search result to a Pandas dataframe. This function is specific to our data schema.

    &quot;&quot;&quot;</span>
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]
    rows_dict = [
        {<span class="hljs-string">&quot;title&quot;</span>: x[<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;embedding&quot;</span>: torch.tensor(x[<span class="hljs-string">&quot;embedding&quot;</span>])} <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> rows
    ]
    <span class="hljs-keyword">return</span> pd.DataFrame.from_records(rows_dict)


dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]
<button class="copy-code-btn"></button></code></pre>
<p>Pour effectuer une recherche en entonnoir, nous itérons sur les sous-ensembles de plus en plus grands des encastrements. À chaque itération, nous classons les candidats en fonction des nouvelles similarités et nous éliminons une partie des candidats les moins bien classés.</p>
<p>Concrètement, à l'étape précédente, nous avons récupéré 128 candidats en utilisant 1/6 des dimensions de l'intégration et de la requête. La première étape de la recherche en entonnoir consiste à recalculer les similitudes entre les requêtes et les candidats en utilisant le <em>premier tiers des dimensions</em>. Les 64 candidats les plus bas sont éliminés. Nous répétons ensuite ce processus avec les <em>deux premiers tiers des dimensions</em>, puis avec <em>toutes les dimensions</em>, en réduisant successivement le nombre de candidats à 32 et à 16.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># An optimized implementation would vectorize the calculation of similarity scores across rows (using a matrix)</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_score</span>(<span class="hljs-params">row, query_emb=<span class="hljs-literal">None</span>, dims=<span class="hljs-number">768</span></span>):
    emb = F.normalize(row[<span class="hljs-string">&quot;embedding&quot;</span>][:dims], dim=-<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> (emb @ query_emb).item()


<span class="hljs-comment"># You could also add a top-K parameter as a termination condition</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">funnel_search</span>(<span class="hljs-params">
    df: pd.DataFrame, query_emb, scales=[<span class="hljs-number">256</span>, <span class="hljs-number">512</span>, <span class="hljs-number">768</span>], prune_ratio=<span class="hljs-number">0.5</span>
</span>) -&gt; pd.DataFrame:
    <span class="hljs-comment"># Loop over increasing prefixes of the embeddings</span>
    <span class="hljs-keyword">for</span> dims <span class="hljs-keyword">in</span> scales:
        <span class="hljs-comment"># Query vector must be normalized for each new dimensionality</span>
        emb = torch.tensor(query_emb[:dims] / np.linalg.norm(query_emb[:dims]))

        <span class="hljs-comment"># Score</span>
        scores = df.apply(
            functools.partial(calculate_score, query_emb=emb, dims=dims), axis=<span class="hljs-number">1</span>
        )
        df[<span class="hljs-string">&quot;scores&quot;</span>] = scores

        <span class="hljs-comment"># Re-rank</span>
        df = df.sort_values(by=<span class="hljs-string">&quot;scores&quot;</span>, ascending=<span class="hljs-literal">False</span>)

        <span class="hljs-comment"># Prune (in our case, remove half of candidates at each step)</span>
        df = df.head(<span class="hljs-built_in">int</span>(prune_ratio * <span class="hljs-built_in">len</span>(df)))

    <span class="hljs-keyword">return</span> df


dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, search_data)
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">5</span>][<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
 0           &quot;Pimpernel&quot; Smith
1               Black Hunters
29    Raiders of the Lost Ark
34             The Master Key
51            My Gun Is Quick
Name: title, dtype: object 

A teenager fakes illness to get off school and have adventures with two friends. 
 21               How I Live Now
32     On the Edge of Innocence
77             Bratz: The Movie
4                    Unfriended
108                  Simon Says
Name: title, dtype: object 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
 9         The Shining
0         Ghostkeeper
11     Fast and Loose
7      Killing Ground
12         Home Alone
Name: title, dtype: object 
</code></pre>
<p>Nous avons pu rétablir le rappel sans effectuer de recherches vectorielles supplémentaires ! Qualitativement, ces résultats semblent avoir un meilleur rappel pour "Raiders of the Lost Ark" et "The Shining" que la recherche vectorielle standard du tutoriel, <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Movie Search using Milvus and Sentence Transformers",</a> qui utilise un modèle d'intégration différent. Cependant, elle ne parvient pas à trouver "Ferris Bueller's Day Off", sur lequel nous reviendrons plus loin dans le carnet. (Voir l'article <a href="https://arxiv.org/abs/2205.13147">Matryoshka Representation Learning</a> pour plus d'expériences quantitatives et d'analyses comparatives).</p>
<h2 id="Comparing-Funnel-Search-to-Regular-Search" class="common-anchor-header">Comparaison entre la recherche en entonnoir et la recherche normale<button data-href="#Comparing-Funnel-Search-to-Regular-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Comparons les résultats de notre recherche en entonnoir à une recherche vectorielle standard <em>sur le même ensemble de données avec le même modèle d'intégration</em>. Nous effectuons une recherche sur les encastrements complets.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search on entire embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=search_data,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
Raiders of the Lost Ark
The Master Key
My Gun Is Quick

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
A Walk to Remember
Ferris Bueller's Day Off
How I Live Now
On the Edge of Innocence
Bratz: The Movie

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
The Shining
Ghostkeeper
Fast and Loose
Killing Ground
Home Alone
</code></pre>
<p>À l'exception des résultats pour "Un adolescent fait semblant d'être malade pour ne pas aller à l'école...", les résultats de la recherche en entonnoir sont presque identiques à ceux de la recherche complète, même si la recherche en entonnoir a été effectuée sur un espace de recherche de 128 dimensions contre 768 dimensions pour la recherche normale.</p>
<h2 id="Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="common-anchor-header">Enquête sur l'échec du rappel de la recherche en entonnoir pour Ferris Bueller's Day Off<button data-href="#Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="anchor-icon" translate="no">
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
    </button></h2><p>Pourquoi la recherche en entonnoir n'a-t-elle pas permis de retrouver Ferris Bueller's Day Off ? Examinons s'il figurait ou non dans la liste originale des candidats ou s'il a été filtré par erreur.</p>
<pre><code translate="no" class="language-python">queries2 = [
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries2]
search_data2 = embed_search(instruct_queries)
head_search2 = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data2]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=head_search2,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">256</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries2[<span class="hljs-number">0</span>])
    <span class="hljs-keyword">for</span> idx, row <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(rows):
        <span class="hljs-keyword">if</span> row[<span class="hljs-string">&quot;title&quot;</span>].strip() == <span class="hljs-string">&quot;Ferris Bueller&#x27;s Day Off&quot;</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Row <span class="hljs-subst">{idx}</span>: Ferris Bueller&#x27;s Day Off&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: A teenager fakes illness to get off school and have adventures with two friends.
Row 228: Ferris Bueller's Day Off
</code></pre>
<p>Nous constatons que le problème réside dans le fait que la liste initiale des candidats n'était pas assez grande, ou plutôt que l'occurrence souhaitée n'était pas assez similaire à la requête au niveau de granularité le plus élevé. En passant de <code translate="no">128</code> à <code translate="no">256</code>, la recherche est couronnée de succès. <em>Nous devrions établir une règle empirique pour fixer le nombre de candidats sur un ensemble retenu afin d'évaluer empiriquement le compromis entre le rappel et la latence.</em></p>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries2, dfs, search_data2)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>), <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">A teenager fakes illness to get off school and have adventures with two friends. 
       A Walk to Remember
Ferris Bueller's Day Off
          How I Live Now
On the Edge of Innocence
        Bratz: The Movie
              Unfriended
              Simon Says 
</code></pre>
<h2 id="Does-the-order-matter-Prefix-vs-suffix-embeddings" class="common-anchor-header">L'ordre a-t-il de l'importance ? Intégration des préfixes et des suffixes.<button data-href="#Does-the-order-matter-Prefix-vs-suffix-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Le modèle a été entraîné à bien faire correspondre les préfixes récursivement plus petits des enchâssements. L'ordre des dimensions que nous utilisons a-t-il une importance ? Par exemple, pourrions-nous également prendre des sous-ensembles d'enchâssements qui sont des suffixes ? Dans cette expérience, nous inversons l'ordre des dimensions dans les encastrements de Matryoshka et effectuons une recherche en entonnoir.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./wikiplots-matryoshka-flipped.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">huggingface/tokenizers: The current process just got forked, after parallelism has already been used. Disabling parallelism to avoid deadlocks...
To disable this warning, you can either:
    - Avoid using `tokenizers` before the fork if possible
    - Explicitly set the environment variable TOKENIZERS_PARALLELISM=(true | false)
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Encode and flip embeddings</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    embeddings = torch.flip(embeddings, dims=[-<span class="hljs-number">1</span>])
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:50&lt;00:00,  5.08s/it]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Normalize head embeddings</span>

flip_search_data = [
    torch.flip(torch.tensor(x), dims=[-<span class="hljs-number">1</span>]).cpu().numpy() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data
]
flip_head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> flip_search_data]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=flip_head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, flip_search_data)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(
        d[<span class="hljs-string">&quot;query&quot;</span>],
        <span class="hljs-string">&quot;\n&quot;</span>,
        d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>, header=<span class="hljs-literal">False</span>),
        <span class="hljs-string">&quot;\n&quot;</span>,
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
       &quot;Pimpernel&quot; Smith
          Black Hunters
Raiders of the Lost Ark
         The Master Key
        My Gun Is Quick
            The Passage
        The Mole People 

A teenager fakes illness to get off school and have adventures with two friends. 
                       A Walk to Remember
                          How I Live Now
                              Unfriended
Cirque du Freak: The Vampire's Assistant
                             Last Summer
                                 Contest
                                 Day One 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
         Ghostkeeper
     Killing Ground
Leopard in the Snow
              Stone
          Afterglow
         Unfaithful
     Always a Bride 
</code></pre>
<p>Le rappel est beaucoup plus faible que la recherche en entonnoir ou la recherche normale, comme prévu (le modèle d'intégration a été formé par apprentissage contrastif sur les préfixes des dimensions d'intégration, et non sur les suffixes).</p>
<h2 id="Summary" class="common-anchor-header">Résumé<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Voici une comparaison des résultats de nos recherches entre les différentes méthodes :</p>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-raiders-of-the-lost-ark.png' width='100%'></div>
<div style='margin: auto; width: 100%;'><img translate="no" src='/docs/v2.5.x/assets/results-ferris-buellers-day-off.png' width='100%'></div>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-the-shining.png' width='100%'></div>
Nous avons montré comment utiliser les Matryoshka embeddings avec Milvus pour réaliser un algorithme de recherche sémantique plus efficace appelé "funnel search". Nous avons également exploré l'importance des étapes de reclassement et d'élagage de l'algorithme, ainsi qu'un mode d'échec lorsque la liste initiale de candidats est trop petite. Enfin, nous avons discuté de l'importance de l'ordre des dimensions lors de la formation des sous-embranchements - il doit être le même que celui pour lequel le modèle a été entraîné. Ou plutôt, ce n'est que parce que le modèle a été entraîné d'une certaine manière que les préfixes des encastrements sont significatifs. Vous savez maintenant comment mettre en œuvre les encastrements Matryoshka et la recherche en entonnoir pour réduire les coûts de stockage de la recherche sémantique sans trop sacrifier les performances de recherche !
