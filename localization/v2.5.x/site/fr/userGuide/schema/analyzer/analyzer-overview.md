---
id: analyzer-overview.md
title: Aperçu de l'analyseur
summary: >-
  Dans le traitement de texte, un analyseur est un composant crucial qui
  convertit le texte brut en un format structuré et consultable. Chaque
  analyseur se compose généralement de deux éléments principaux : le tokéniseur
  et le filtre. Ensemble, ils transforment le texte d'entrée en tokens, affinent
  ces tokens et les préparent pour une indexation et une recherche efficaces.
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">Aperçu de l'analyseur<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans le traitement de texte, un <strong>analyseur</strong> est un composant crucial qui convertit le texte brut en un format structuré et consultable. Chaque analyseur se compose généralement de deux éléments principaux : le <strong>tokéniseur</strong> et le <strong>filtre</strong>. Ensemble, ils transforment le texte d'entrée en tokens, affinent ces tokens et les préparent pour une indexation et une recherche efficaces.</p>
<p>Dans Milvus, les analyseurs sont configurés lors de la création de la collection lorsque vous ajoutez des champs <code translate="no">VARCHAR</code> au schéma de la collection. Les jetons produits par un analyseur peuvent être utilisés pour construire un index pour la recherche par mot-clé ou convertis en encastrements épars pour la recherche en texte intégral. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/keyword-match.md">Correspondance par mot-clé</a> ou <a href="/docs/fr/full-text-search.md">recherche en texte intégral</a>.</p>
<div class="alert note">
<p>L'utilisation d'analyseurs peut avoir un impact sur les performances.</p>
<ul>
<li><p><strong>Recherche en texte intégral :</strong> Pour la recherche en texte intégral, les canaux DataNode et <strong>QueryNode</strong> consomment les données plus lentement car ils doivent attendre la fin de la tokenisation. Par conséquent, les données nouvellement ingérées mettent plus de temps à être disponibles pour la recherche.</p></li>
<li><p><strong>Correspondance par mot-clé :</strong> Pour la correspondance par mot-clé, la création de l'index est également plus lente car la tokenisation doit être terminée avant qu'un index puisse être construit.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">Anatomie d'un analyseur<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>Un analyseur dans Milvus se compose d'un <strong>tokenizer</strong> et de <strong>zéro ou plusieurs</strong> filtres.</p>
<ul>
<li><p>Le<strong>tokenizer</strong>: Le tokenizer décompose le texte d'entrée en unités discrètes appelées tokens. Ces jetons peuvent être des mots ou des phrases, selon le type de tokenizer.</p></li>
<li><p><strong>Filtres</strong>: Des filtres peuvent être appliqués aux tokens pour les affiner, par exemple en les mettant en minuscules ou en supprimant les mots communs.</p></li>
</ul>
<p>Le flux de travail ci-dessous montre comment un analyseur traite un texte.</p>
<p><img translate="no" src="/docs/v2.5.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">Types d'analyseurs<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus propose deux types d'analyseurs pour répondre à différents besoins de traitement de texte.</p>
<ul>
<li><p><strong>Analyseur intégré</strong>: Il s'agit de configurations prédéfinies qui couvrent les tâches courantes de traitement de texte avec une configuration minimale. Les analyseurs intégrés sont idéaux pour les recherches générales, car ils ne nécessitent pas de configuration complexe.</p></li>
<li><p><strong>Analyseur personnalisé</strong>: Pour des besoins plus avancés, les analyseurs personnalisés vous permettent de définir votre propre configuration en spécifiant à la fois le tokenizer et zéro ou plusieurs filtres. Ce niveau de personnalisation est particulièrement utile pour les cas d'utilisation spécialisés nécessitant un contrôle précis du traitement du texte.</p></li>
</ul>
<div class="alert note">
<p>Si vous omettez les configurations de l'analyseur lors de la création de la collection, Milvus utilise par défaut l'analyseur <code translate="no">standard</code> pour tous les traitements de texte. Pour plus de détails, voir <a href="/docs/fr/standard-analyzer.md">Standard</a>.</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">Analyseur intégré</h3><p>Les analyseurs intégrés dans Milvus sont préconfigurés avec des tokenizers et des filtres spécifiques, ce qui vous permet de les utiliser immédiatement sans avoir à définir ces composants vous-même. Chaque analyseur intégré sert de modèle et comprend un tokenizer et des filtres prédéfinis, avec des paramètres facultatifs pour la personnalisation.</p>
<p>Par exemple, pour utiliser l'analyseur intégré <code translate="no">standard</code>, il suffit de spécifier son nom <code translate="no">standard</code> comme <code translate="no">type</code> et d'inclure éventuellement des configurations supplémentaires spécifiques à ce type d'analyseur, comme <code translate="no">stop_words</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<p>La configuration de l'analyseur intégré <code translate="no">standard</code> ci-dessus équivaut à la configuration d'un analyseur personnalisé avec les paramètres suivants, où les options <code translate="no">tokenizer</code> et <code translate="no">filter</code> sont explicitement définies pour obtenir la même fonctionnalité :</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus propose les analyseurs intégrés suivants, qui peuvent tous être utilisés directement en spécifiant leur nom dans le paramètre <code translate="no">type</code>.</p>
<ul>
<li><p><code translate="no">standard</code>: Adapté au traitement de texte général, appliquant une tokenisation standard et un filtrage des minuscules.</p></li>
<li><p><code translate="no">english</code>: Optimisé pour les textes en anglais, avec prise en charge des mots vides en anglais.</p></li>
<li><p><code translate="no">chinese</code>: Spécialisé dans le traitement de textes chinois, avec une tokénisation adaptée aux structures de la langue chinoise.</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">Analyseur personnalisé</h3><p>Pour un traitement de texte plus avancé, les analyseurs personnalisés de Milvus vous permettent de construire un pipeline de traitement de texte sur mesure en spécifiant à la fois un <strong>tokenizer</strong> et des filtres. Cette configuration est idéale pour les cas d'utilisation spécialisés nécessitant un contrôle précis.</p>
<h4 id="Tokenizer​" class="common-anchor-header">Tokenizer</h4><p>Le <strong>tokenizer</strong> est un composant <strong>obligatoire</strong> pour un analyseur personnalisé, qui initie le pipeline de l'analyseur en décomposant le texte d'entrée en unités discrètes ou en <strong>tokens</strong>. La tokenisation suit des règles spécifiques, telles que la division par des espaces blancs ou la ponctuation, en fonction du type de tokenizer. Ce processus permet un traitement plus précis et indépendant de chaque mot ou phrase.</p>
<p>Par exemple, un tokenizer convertit le texte <code translate="no">&quot;Vector Database Built for Scale&quot;</code> en jetons distincts.</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemple de spécification d'un tokenizer</strong>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">Filtre</h4><p>Les<strong>filtres</strong> sont des composants <strong>optionnels</strong> qui travaillent sur les jetons produits par le tokenizer, les transformant ou les affinant si nécessaire. Par exemple, après l'application d'un filtre <code translate="no">lowercase</code> aux termes tokenizés <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code>, le résultat pourrait être.</p>
<pre><code translate="no" class="language-SQL">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>Les filtres d'un analyseur personnalisé peuvent être <strong>intégrés</strong> ou <strong>personnalisés</strong>, en fonction des besoins de configuration.</p>
<ul>
<li><p><strong>Filtres intégrés</strong>: Préconfigurés par Milvus, ils ne nécessitent qu'une configuration minimale. Vous pouvez utiliser ces filtres prêts à l'emploi en spécifiant leur nom. Les filtres ci-dessous sont intégrés pour une utilisation directe.</p>
<ul>
<li><p><code translate="no">lowercase</code>: Convertit le texte en minuscules pour garantir une correspondance insensible à la casse. Pour plus de détails, voir <a href="/docs/fr/lowercase-filter.md">Minuscules</a>.</p></li>
<li><p><code translate="no">asciifolding</code>: Convertit les caractères non ASCII en équivalents ASCII, ce qui simplifie la gestion des textes multilingues. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/ascii-folding-filter.md">Pliage ASCII</a>.</p></li>
<li><p><code translate="no">alphanumonly</code>: Conserve uniquement les caractères alphanumériques en supprimant les autres. Pour plus de détails, voir <a href="/docs/fr/alphanumonly-filter.md">Alphanumonly</a>.</p></li>
<li><p><code translate="no">cnalphanumonly</code>: Supprime les jetons contenant des caractères autres que des caractères chinois, des lettres anglaises ou des chiffres. Pour plus de détails, voir <a href="/docs/fr/cnalphanumonly-filter.md">Cnalphanumonly</a>.</p></li>
<li><p><code translate="no">cncharonly</code>: Supprime les jetons contenant des caractères non chinois. Pour plus de détails, voir <a href="/docs/fr/cncharonly-filter.md">Cncharonly</a>.</p></li>
</ul>
<p><strong>Exemple d'utilisation d'un filtre intégré.</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtres personnalisés</strong>: Les filtres personnalisés permettent des configurations spécialisées. Vous pouvez définir un filtre personnalisé en choisissant un type de filtre valide (<code translate="no">filter.type</code>) et en ajoutant des paramètres spécifiques pour chaque type de filtre. Exemples de types de filtres qui prennent en charge la personnalisation.</p>
<ul>
<li><p><code translate="no">stop</code>: Supprime les mots courants spécifiés en définissant une liste de mots d'arrêt (par exemple, <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/stop-filter.md">Stop</a>.</p></li>
<li><p><code translate="no">length</code>: Exclut les tokens en fonction de critères de longueur, tels que la définition d'une longueur de token maximale. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/length-filter.md">Longueur</a>.</p></li>
<li><p><code translate="no">stemmer</code>: Réduit les mots à leur forme racine pour une correspondance plus souple. Pour plus d'informations, reportez-vous à la rubrique <a href="/docs/fr/stemmer-filter.md">Stemmer</a>.</p></li>
</ul>
<p><strong>Exemple de configuration d'un filtre personnalisé.</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">Exemple d'utilisation<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cet exemple, nous définissons un schéma de collection avec un champ vectoriel pour les enchâssements et deux champs <code translate="no">VARCHAR</code> pour les capacités de traitement de texte. Chaque champ <code translate="no">VARCHAR</code> est configuré avec ses propres paramètres d'analyse pour répondre à différents besoins de traitement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<p></p>
