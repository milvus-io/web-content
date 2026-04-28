---
id: phrase-match.md
title: Correspondance de phrasesCompatible with Milvus 2.6.x
summary: >-
  La correspondance des phrases vous permet de rechercher des documents
  contenant les termes de votre requête sous la forme d'une phrase exacte. Par
  défaut, les mots doivent apparaître dans le même ordre et être directement
  adjacents les uns aux autres. Par exemple, une requête portant sur "robotics
  machine learning" correspond à un texte tel que "...typical robotics machine
  learning models...", où les mots "robotics", "machine" et "learning"
  apparaissent dans l'ordre, sans aucun autre mot entre eux.
beta: Milvus 2.6.x
---
<h1 id="Phrase-Match" class="common-anchor-header">Correspondance de phrases<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>La correspondance des phrases vous permet de rechercher des documents contenant les termes de votre requête sous la forme d'une phrase exacte. Par défaut, les mots doivent apparaître dans le même ordre et être directement adjacents les uns aux autres. Par exemple, une requête portant sur <strong>"robotics machine learning"</strong> aboutit à un texte du type <em>"...typical robotics machine learning models...",</em> où les mots <strong>"robotics",</strong> <strong>"machine"</strong> et <strong>"learning"</strong> apparaissent dans l'ordre, sans aucun autre mot entre eux.</p>
<p>Cependant, dans le monde réel, la correspondance stricte des phrases peut être trop rigide. Vous pourriez vouloir faire correspondre un texte comme <em>"...des modèles d'apprentissage automatique largement adoptés en robotique...".</em> Dans ce cas, les mêmes mots-clés sont présents, mais pas côte à côte ni dans l'ordre original. Pour gérer cette situation, la recherche de phrases prend en charge le paramètre <code translate="no">slop</code>, qui introduit une certaine flexibilité. La valeur <code translate="no">slop</code> définit le nombre de décalages positionnels autorisés entre les termes de la phrase. Par exemple, avec une valeur <code translate="no">slop</code> de 1, une requête pour <strong>"machine learning"</strong> peut correspondre à un texte comme <em>"...machine deep learning...",</em> où un mot (<strong>"deep")</strong> sépare les termes originaux.</p>
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
    </button></h2><p>Alimentée par la bibliothèque du moteur de recherche <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, la correspondance de phrases fonctionne en analysant les informations relatives à la position des mots dans les documents. Le diagramme ci-dessous illustre le processus :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>Flux de travail de la correspondance de phrases</span> </span></p>
<ol>
<li><p><strong>Tokenisation des documents</strong>: Lorsque vous insérez des documents dans Milvus, le texte est divisé en tokens (mots ou termes individuels) à l'aide d'un analyseur, les informations de position étant enregistrées pour chaque token. Par exemple, <strong>doc_1</strong> est tokenisé en <strong>["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]</strong>. Pour plus d'informations sur les analyseurs, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md">Vue d'ensemble des analyseurs</a>.</p></li>
<li><p><strong>Création d'un index inversé</strong>: Milvus crée un index inversé, en associant chaque mot clé au(x) document(s) dans le(s)quel(s) il apparaît et aux positions du mot clé dans ces documents.</p></li>
<li><p><strong>Correspondance des phrases</strong>: lorsqu'une requête de phrase est exécutée, Milvus recherche chaque token dans l'index inversé et vérifie leurs positions pour déterminer s'ils apparaissent dans l'ordre et la proximité corrects. Le paramètre <code translate="no">slop</code> contrôle le nombre maximum de positions autorisées entre les mots correspondants :</p>
<ul>
<li><p><strong>slop = 0</strong> signifie que les mots doivent apparaître dans l <strong>'ordre exact et être immédiatement adjacents</strong> (c'est-à-dire sans mots supplémentaires entre eux).</p>
<ul>
<li>Dans l'exemple, seul <strong>doc_1</strong> (<strong>"machine"</strong> à <strong>pos=0</strong>, <strong>"learning"</strong> à <strong>pos=1</strong>) correspond exactement.</li>
</ul></li>
<li><p><strong>slop = 2</strong> permet jusqu'à deux positions de flexibilité ou de réarrangement entre les mots correspondants.</p>
<ul>
<li><p>Cela permet d'inverser l'ordre (<strong>"machine à apprendre")</strong> ou de laisser un petit espace entre les mots.</p></li>
<li><p>Par conséquent, les <strong>documents doc_1</strong>, <strong>doc_2</strong> (<strong>"learning"</strong> à <strong>pos=0</strong>, <strong>"machine"</strong> à <strong>pos=1</strong>) et <strong>doc_3</strong> (<strong>"learning"</strong> à <strong>pos=1</strong>, <strong>"machine"</strong> à <strong>pos=2</strong>) correspondent tous.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Activer la correspondance des phrases<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La correspondance de phrases fonctionne avec le type de champ <code translate="no">VARCHAR</code>, le type de données de chaîne dans Milvus. Pour activer la correspondance des phrases, configurez votre schéma de collecte en définissant les paramètres <code translate="no">enable_analyzer</code> et <code translate="no">enable_match</code> sur <code translate="no">True</code>, comme pour la <a href="/docs/fr/keyword-match.md">correspondance de texte</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Définissez <code translate="no">enable_analyzer</code> et <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour activer la correspondance de phrases pour un champ <code translate="no">VARCHAR</code> spécifique, définissez les paramètres <code translate="no">enable_analyzer</code> et <code translate="no">enable_match</code> sur <code translate="no">True</code> lorsque vous définissez le schéma du champ. Cette configuration indique à Milvus de tokeniser le texte et de créer un index inversé avec les informations de position requises pour une correspondance de phrases efficace.</p>
<p>Voici un exemple de définition de schéma pour activer la correspondance de phrases :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Facultatif : Configurer un analyseur<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>La précision de la correspondance des phrases dépend considérablement de l'analyseur utilisé pour tokeniser vos données textuelles. Différents analyseurs conviennent à différentes langues et à différents formats de texte, ce qui affecte la tokenisation et la précision de positionnement. La sélection d'un analyseur approprié pour votre cas d'utilisation spécifique permet d'optimiser les résultats de la recherche de phrases.</p>
<p>Par défaut, Milvus utilise l'analyseur standard, qui tokenise le texte en fonction des espaces blancs et de la ponctuation, supprime les tokens de plus de 40 caractères et convertit le texte en minuscules. Aucun paramètre supplémentaire n'est requis pour l'utilisation par défaut. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/standard-analyzer.md">Analyseur standard</a>.</p>
<p>Si votre application nécessite un analyseur spécifique, configurez-le à l'aide du paramètre <code translate="no">analyzer_params</code>. Par exemple, voici comment configurer l'analyseur <code translate="no">english</code> pour la recherche de phrases dans un texte anglais :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus prend en charge plusieurs analyseurs adaptés à différentes langues et à différents cas d'utilisation. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md">Vue d'ensemble des analyseurs</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Utiliser la correspondance de phrases<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez activé la correspondance pour un champ <code translate="no">VARCHAR</code> dans votre schéma de collecte, vous pouvez effectuer des correspondances de phrases à l'aide de l'expression <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>L'expression <code translate="no">PHRASE_MATCH</code> n'est pas sensible à la casse. Vous pouvez utiliser <code translate="no">PHRASE_MATCH</code> ou <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Syntaxe de l'expression PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez l'expression <code translate="no">PHRASE_MATCH</code> pour spécifier le champ, l'expression et la flexibilité facultative (<code translate="no">slop</code>) lors de la recherche. La syntaxe est la suivante :</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> Le nom du champ <code translate="no">VARCHAR</code> sur lequel vous effectuez des recherches de phrases.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> L'expression exacte à rechercher.</p></li>
<li><p><code translate="no">slop</code> (facultatif)<strong>:</strong> Un nombre entier spécifiant le nombre maximum de positions autorisées dans les éléments de correspondance.</p>
<ul>
<li><p><code translate="no">0</code> (par défaut) : Ne recherche que les expressions exactes. Exemple : Un filtre pour <strong>"machine learning"</strong> correspondra exactement à <strong>"machine learning"</strong>, mais pas à <strong>"machine boosts learning"</strong> ou <strong>"learning machine".</strong></p></li>
<li><p><code translate="no">1</code>: Permet des variations mineures, telles qu'un terme supplémentaire ou un changement mineur de position. Exemple : Un filtre pour <strong>"machine learning"</strong> correspondra à <strong>"machine boosts learning"</strong> (un jeton entre <strong>"machine"</strong> et <strong>"learning")</strong> mais pas <strong>à "learning machine"</strong> (termes inversés).</p></li>
<li><p><code translate="no">2</code>: Permet une plus grande flexibilité, y compris l'inversion de l'ordre des termes ou jusqu'à deux tokens entre eux. Exemple : Un filtre pour <strong>"machine learning"</strong> correspondra à <strong>"learning machine"</strong> (termes inversés) ou à <strong>"machine quickly boosts learning"</strong> (deux termes entre <strong>"machine"</strong> et <strong>"learning").</strong></p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Exemple de jeu de données<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Supposons que vous ayez une collection nommée <strong>tech_articles</strong> contenant les cinq entités suivantes :</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprentissage automatique renforce l'efficacité de l'analyse des données à grande échelle</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprentissage d'une approche basée sur la machine est vital pour les progrès de l'IA moderne"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Les architectures de machines d'apprentissage profond optimisent les charges de calcul</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"La machine améliore rapidement les performances du modèle pour un apprentissage continu"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprentissage d'algorithmes avancés élargit les capacités de l'IA.</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Requête avec correspondance de phrases<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Lors de l'utilisation de la méthode <code translate="no">query()</code>, <strong>PHRASE_MATCH</strong> agit comme un filtre scalaire. Seuls les documents contenant l'expression spécifiée (sous réserve de la marge autorisée) sont renvoyés.</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Exemple : slop = 0 (correspondance exacte)</h4><p>Cet exemple renvoie les documents contenant l'expression exacte <strong>"machine learning"</strong> sans aucun token supplémentaire entre les deux.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultats attendus :</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprentissage automatique améliore l'efficacité de l'analyse des données à grande échelle"</p></td>
   </tr>
</table>
<p>Seul le document 1 contient l'expression exacte " <strong>machine learning"</strong> dans l'ordre spécifié, sans aucun élément supplémentaire.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Recherche avec correspondance de phrases<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans les opérations de recherche, <strong>PHRASE_MATCH</strong> est utilisé pour filtrer les documents avant d'appliquer le classement par similarité vectorielle. Cette approche en deux étapes permet d'abord de restreindre l'ensemble des candidats par la correspondance textuelle, puis de reclasser ces candidats sur la base de l'intégration vectorielle.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Exemple : slop = 1</h4><p>Le filtre est appliqué aux documents qui contiennent l'expression <strong>"machine à apprendre"</strong> avec une légère flexibilité.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultats de l'appariement :</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprentissage d'une approche basée sur la machine est vital pour les progrès de l'IA moderne"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Les architectures de machines d'apprentissage en profondeur optimisent les charges de calcul.</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprentissage d'algorithmes de machine avancés accroît les capacités de l'IA".</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Exemple : slop = 2</h4><p>Cet exemple autorise une pente de 2, ce qui signifie que jusqu'à deux tokens supplémentaires (ou termes inversés) sont autorisés entre les mots <strong>"machine"</strong> et <strong>"learning".</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultats de la recherche :</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprentissage automatique renforce l'efficacité de l'analyse des données à grande échelle"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Les architectures de machines d'apprentissage profond optimisent les charges de calcul.</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Exemple : slop = 3</h4><p>Dans cet exemple, un slop de 3 offre encore plus de flexibilité. Le filtre recherche <strong>"machine learning"</strong> avec un maximum de trois positions de jetons autorisées entre les mots.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultats de la recherche :</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprentissage automatique renforce l'efficacité de l'analyse des données à grande échelle.</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprentissage d'une approche basée sur la machine est vital pour les progrès de l'IA moderne"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Les architectures de machines d'apprentissage profond optimisent les charges de calcul</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprentissage d'algorithmes avancés augmente les capacités de l'IA".</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Éléments à prendre en compte<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>L'activation de la recherche de phrases pour un champ déclenche la création d'un index inversé, qui consomme des ressources de stockage. Tenez compte de l'impact sur le stockage lorsque vous décidez d'activer cette fonctionnalité, car il varie en fonction de la taille du texte, des tokens uniques et de l'analyseur utilisé.</p></li>
<li><p>Une fois que vous avez défini un analyseur dans votre schéma, ses paramètres deviennent permanents pour cette collection. Si vous décidez qu'un autre analyseur répondrait mieux à vos besoins, vous pouvez envisager d'abandonner la collection existante et d'en créer une nouvelle avec la configuration d'analyseur souhaitée.</p></li>
<li><p>La performance de la correspondance des phrases dépend de la façon dont le texte est symbolisé. Avant d'appliquer un analyseur à l'ensemble de votre collection, utilisez la méthode <code translate="no">run_analyzer</code> pour examiner le résultat de la tokenisation. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Vue d'ensemble de l'analyseur</a>.</p></li>
<li><p>Règles d'échappement dans les expressions <code translate="no">filter</code>:</p>
<ul>
<li><p>Les caractères placés entre guillemets doubles ou simples dans les expressions sont interprétés comme des constantes de chaîne. Si la constante de chaîne comprend des caractères d'échappement, ceux-ci doivent être représentés par une séquence d'échappement. Par exemple, utilisez <code translate="no">\\</code> pour représenter <code translate="no">\</code>, <code translate="no">\\t</code> pour représenter une tabulation <code translate="no">\t</code>, et <code translate="no">\\n</code> pour représenter une nouvelle ligne.</p></li>
<li><p>Si une constante de chaîne est entourée de guillemets simples, un guillemet simple à l'intérieur de la constante doit être représenté par <code translate="no">\\'</code>, tandis qu'un guillemet double peut être représenté par <code translate="no">&quot;</code> ou <code translate="no">\\&quot;</code>. Exemple : <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Si une constante de chaîne est entourée de guillemets doubles, un guillemet double à l'intérieur de la constante doit être représenté par <code translate="no">\\&quot;</code> tandis qu'un guillemet simple peut être représenté par <code translate="no">'</code> ou <code translate="no">\\'</code>. Exemple : <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
