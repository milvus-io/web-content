---
id: embed-with-mistral-ai.md
order: 11
summary: >-
  Cet article décrit comment utiliser la fonction MistralAIEmbeddingFunction
  pour encoder des documents et des requêtes à l'aide du modèle d'encodage
  Mistral AI.
title: Mistral AI
---
<h1 id="Mistral-AI" class="common-anchor-header">Mistral AI<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Les modèles d'intégration de<a href="https://mistral.ai/">Mistral AI</a> sont des modèles d'intégration de texte conçus pour convertir les entrées textuelles en vecteurs numériques denses, capturant efficacement le sens sous-jacent du texte. Ces modèles sont hautement optimisés pour des tâches telles que la recherche sémantique, la compréhension du langage naturel et les applications contextuelles, ce qui les rend adaptés à un large éventail de solutions basées sur l'IA.</p>
<p>Milvus s'intègre aux modèles d'intégration de Mistral AI via la classe MistralAIEmbeddingFunction. Cette classe fournit des méthodes pour encoder les documents et les requêtes à l'aide des modèles d'intégration de Mistral AI et pour renvoyer les intégrations sous forme de vecteurs denses compatibles avec l'indexation de Milvus. Pour utiliser cette fonctionnalité, obtenez une clé API de <a href="https://console.mistral.ai/">Mistral AI</a>.</p>
<p>Pour utiliser cette fonctionnalité, installez les dépendances nécessaires :</p>
<pre><code translate="no" class="language-python">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, instanciez la fonction MistralAIEmbeddingFunction :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> MistralAIEmbeddingFunction

ef = MistralAIEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>, <span class="hljs-comment"># Defaults to `mistral-embed`</span>
    api_key=<span class="hljs-string">&quot;MISTRAL_API_KEY&quot;</span> <span class="hljs-comment"># Provide your Mistral AI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Paramètres</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(chaîne</em>)</p>
<p>Le nom du modèle d'intégration de Mistral AI à utiliser pour l'encodage. La valeur par défaut est <code translate="no">mistral-embed</code>. Pour plus d'informations, voir <a href="https://docs.mistral.ai/capabilities/embeddings/">Embeddings</a>.</p></li>
<li><p><code translate="no">api_key</code> <em>(chaîne</em>)</p>
<p>La clé d'API permettant d'accéder à l'API de Mistral AI.</p></li>
</ul>
<p>Pour créer des embeddings pour les documents, utilisez la méthode <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat attendu est similaire à ce qui suit :</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.06051636</span>, <span class="hljs-number">0.03207397</span>, <span class="hljs-number">0.04684448</span>, ..., -<span class="hljs-number">0.01618958</span>,
       <span class="hljs-number">0.02442932</span>, -<span class="hljs-number">0.01302338</span>]), array([-<span class="hljs-number">0.04675293</span>, <span class="hljs-number">0.06512451</span>, <span class="hljs-number">0.04290771</span>, ..., -<span class="hljs-number">0.01454926</span>,
       <span class="hljs-number">0.0014801</span> , <span class="hljs-number">0.00686646</span>]), array([-<span class="hljs-number">0.05978394</span>, <span class="hljs-number">0.08728027</span>, <span class="hljs-number">0.02217102</span>, ..., -<span class="hljs-number">0.00681305</span>,
       <span class="hljs-number">0.03634644</span>, -<span class="hljs-number">0.01802063</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Pour créer des embeddings pour des requêtes, utilisez la méthode <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>,
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat attendu est similaire à ce qui suit :</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.04916382</span>, <span class="hljs-number">0.04568481</span>, <span class="hljs-number">0.03594971</span>, ..., -<span class="hljs-number">0.02653503</span>,
       <span class="hljs-number">0.02804565</span>, <span class="hljs-number">0.00600815</span>]), array([-<span class="hljs-number">0.05938721</span>, <span class="hljs-number">0.07098389</span>, <span class="hljs-number">0.01773071</span>, ..., -<span class="hljs-number">0.01708984</span>,
       <span class="hljs-number">0.03582764</span>, <span class="hljs-number">0.00366592</span>])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
