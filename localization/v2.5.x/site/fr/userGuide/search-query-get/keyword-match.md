---
id: keyword-match.md
summary: >-
  La correspondance par mot-clé dans Milvus permet une recherche précise de
  documents sur la base de termes spécifiques. Cette fonction est principalement
  utilisée pour la recherche filtrée afin de satisfaire des conditions
  spécifiques et peut incorporer le filtrage scalaire pour affiner les résultats
  de la requête, permettant des recherches de similarité dans les vecteurs qui
  répondent aux critères scalaires.
title: Correspondance de mots-clés
---
<h1 id="Keyword-Match​" class="common-anchor-header">Correspondance de mots-clés<button data-href="#Keyword-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche par mot-clé dans Milvus permet d'extraire des documents avec précision sur la base de termes spécifiques. Cette fonction est principalement utilisée pour la recherche filtrée afin de satisfaire des conditions spécifiques et peut incorporer le filtrage scalaire pour affiner les résultats de la requête, permettant des recherches de similarité dans les vecteurs qui répondent aux critères scalaires.</p>
<div class="alert note">
<p>La correspondance par mot-clé se concentre sur la recherche d'occurrences exactes des termes de la requête, sans évaluer la pertinence des documents correspondants. Si vous souhaitez récupérer les documents les plus pertinents en fonction de la signification sémantique et de l'importance des termes de la requête, nous vous recommandons d'utiliser la <a href="/docs/fr/full-text-search.md">recherche en texte intégral</a>.</p>
</div>
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
    </button></h2><p>Milvus intègre <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> pour alimenter son index inversé sous-jacent et sa recherche par mot-clé. Pour chaque entrée de texte, Milvus l'indexe en suivant la procédure.</p>
<ol>
<li><p><a href="/docs/fr/analyzer-overview.md">Analyseur</a>: L'analyseur traite le texte d'entrée en le transformant en mots individuels, ou tokens, puis en appliquant des filtres si nécessaire. Cela permet à Milvus de construire un index basé sur ces tokens.</p></li>
<li><p><a href="/docs/fr/index-scalar-fields.md">Indexation</a>: Après l'analyse du texte, Milvus crée un index inversé qui associe chaque token unique aux documents qui le contiennent.</p></li>
</ol>
<p>Lorsqu'un utilisateur effectue une recherche par mots-clés, l'index inversé est utilisé pour retrouver rapidement tous les documents contenant les mots-clés. Cette méthode est beaucoup plus rapide que l'analyse individuelle de chaque document.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>Correspondance par mot-clé</span> </span></p>
<h2 id="Enable-keyword-match" class="common-anchor-header">Activer la recherche par mot-clé<button data-href="#Enable-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La correspondance par mot-clé fonctionne sur le type de champ <code translate="no">VARCHAR</code>, qui est essentiellement le type de données chaîne dans Milvus. Pour activer la correspondance de mots-clés, définissez <code translate="no">enable_analyzer</code> et <code translate="no">enable_match</code> sur <code translate="no">True</code>, puis configurez éventuellement un analyseur pour l'analyse de texte lors de la définition de votre schéma de collecte.</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">Définir <code translate="no">enable_analyzer</code> et <code translate="no">enable_match</code></h3><p>Pour activer la correspondance des mots-clés pour un champ <code translate="no">VARCHAR</code> spécifique, définissez les paramètres <code translate="no">enable_analyzer</code> et <code translate="no">enable_match</code> sur <code translate="no">True</code> lors de la définition du schéma de champ. Cela indique à Milvus de tokeniser le texte et de créer un index inversé pour le champ spécifié, ce qui permet des correspondances de mots clés rapides et efficaces.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">Facultatif : Configurer un analyseur</h3><p>Les performances et la précision de la recherche par mot-clé dépendent de l'analyseur sélectionné. Différents analyseurs sont adaptés à diverses langues et structures de texte, de sorte que le choix du bon analyseur peut avoir un impact significatif sur les résultats de recherche pour votre cas d'utilisation spécifique.</p>
<p>Par défaut, Milvus utilise l'analyseur <code translate="no">standard</code>, qui donne un sens au texte en fonction des espaces blancs et de la ponctuation, supprime les tokens de plus de 40 caractères et convertit le texte en minuscules. Aucun paramètre supplémentaire n'est nécessaire pour appliquer ce paramètre par défaut. Pour plus d'informations, voir <a href="/docs/fr/standard-analyzer.md">Standard</a>.</p>
<p>Si un autre analyseur est nécessaire, vous pouvez le configurer à l'aide du paramètre <code translate="no">analyzer_params</code>. Par exemple, pour appliquer l'analyseur <code translate="no">english</code> au traitement du texte anglais.</p>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus propose également d'autres analyseurs adaptés à différentes langues et à différents scénarios. Pour plus de détails, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md">Vue d'ensemble</a>.</p>
<h2 id="Use-keyword-match" class="common-anchor-header">Utiliser la correspondance de mots-clés<button data-href="#Use-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez activé la correspondance de mots-clés pour un champ VARCHAR dans votre schéma de collecte, vous pouvez effectuer des correspondances de mots-clés à l'aide de l'expression <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">Syntaxe de l'expression TEXT_MATCH</h3><p>L'expression <code translate="no">TEXT_MATCH</code> est utilisée pour spécifier le champ et les mots-clés à rechercher. Sa syntaxe est la suivante.</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: Le nom du champ VARCHAR à rechercher.</p></li>
<li><p><code translate="no">text</code>: Les mots-clés à rechercher. Plusieurs mots-clés peuvent être séparés par des espaces ou d'autres délimiteurs appropriés en fonction de la langue et de l'analyseur configuré.</p></li>
</ul>
<p>Par défaut, <code translate="no">TEXT_MATCH</code> utilise la logique de correspondance <strong>OR</strong>, ce qui signifie qu'il renverra les documents qui contiennent n'importe lequel des mots-clés spécifiés. Par exemple, pour rechercher des documents contenant les mots-clés <code translate="no">machine</code> ou <code translate="no">deep</code> dans le champ <code translate="no">text</code>, utilisez l'expression suivante.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez également combiner plusieurs expressions <code translate="no">TEXT_MATCH</code> à l'aide d'opérateurs logiques pour effectuer une correspondance <strong>ET</strong>. Par exemple, pour rechercher les documents contenant les mots-clés <code translate="no">machine</code> et <code translate="no">deep</code> dans le champ <code translate="no">text</code>, utilisez l'expression suivante.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-keyword-match​" class="common-anchor-header">Recherche avec correspondance de mots-clés</h3><p>La correspondance par mot-clé peut être utilisée en combinaison avec la recherche de similarité vectorielle pour restreindre le champ de recherche et améliorer les performances de la recherche. En filtrant la collection à l'aide de la correspondance de mots-clés avant la recherche de similarité vectorielle, vous pouvez réduire le nombre de documents à rechercher, ce qui accélère les temps de recherche.</p>
<p>Dans cet exemple, l'expression <code translate="no">filter</code> filtre les résultats de la recherche pour n'inclure que les documents qui correspondent aux mots-clés spécifiés <code translate="no">keyword1</code> ou <code translate="no">keyword2</code>. La recherche vectorielle de similarité est ensuite effectuée sur ce sous-ensemble de documents filtrés.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-keyword-match​" class="common-anchor-header">Requête avec correspondance de mots-clés</h3><p>La correspondance par mot-clé peut également être utilisée pour le filtrage scalaire dans les opérations de requête. En spécifiant une expression <code translate="no">TEXT_MATCH</code> dans le paramètre <code translate="no">expr</code> de la méthode <code translate="no">query()</code>, vous pouvez récupérer les documents qui correspondent aux mots-clés donnés.</p>
<p>L'exemple ci-dessous permet d'extraire les documents dont le champ <code translate="no">text</code> contient les deux mots-clés <code translate="no">keyword1</code> et <code translate="no">keyword2</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">Points à prendre en considération<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>L'activation de la recherche par mot-clé pour un champ déclenche la création d'un index inversé, qui consomme des ressources de stockage. Tenez compte de l'impact sur le stockage lorsque vous décidez d'activer cette fonctionnalité, car il varie en fonction de la taille du texte, des jetons uniques et de l'analyseur utilisé.</p></li>
<li><p>Une fois que vous avez défini un analyseur dans votre schéma, ses paramètres deviennent permanents pour cette collection. Si vous décidez qu'un autre analyseur répondrait mieux à vos besoins, vous pouvez envisager d'abandonner la collection existante et d'en créer une nouvelle avec la configuration d'analyseur souhaitée.</p></li>
</ul>
