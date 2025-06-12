---
id: embed-with-voyage.md
order: 7
summary: >-
  Cet article décrit comment utiliser la fonction VoyageEmbeddingFunction pour
  encoder des documents et des requêtes à l'aide du modèle Voyage.
title: Embed Voyage
---
<h1 id="Voyage" class="common-anchor-header">Voyage<button data-href="#Voyage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus s'intègre aux modèles de Voyage via la classe VoyageEmbeddingFunction. Cette classe fournit des méthodes pour encoder les documents et les requêtes à l'aide des modèles Voyage et renvoyer les embeddings sous forme de vecteurs denses compatibles avec l'indexation Milvus. Pour utiliser cette fonctionnalité, obtenez une clé API de <a href="https://docs.voyageai.com/docs/api-key-and-installation">Voyage</a> en créant un compte sur leur plateforme.</p>
<p>Pour utiliser cette fonctionnalité, installez les dépendances nécessaires :</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, instanciez l'application <code translate="no">VoyageEmbeddingFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> VoyageEmbeddingFunction

voyage_ef = VoyageEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;voyage-3&quot;</span>, <span class="hljs-comment"># Defaults to `voyage-3`</span>
    api_key=VOYAGE_API_KEY <span class="hljs-comment"># Provide your Voyage API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Paramètres</strong>:</p>
<ul>
<li><code translate="no">model_name</code> (string) Le nom du modèle Voyage à utiliser pour l'encodage. Vous pouvez spécifier n'importe quel nom de modèle Voyage disponible, par exemple, <code translate="no">voyage-3-lite</code>, <code translate="no">voyage-finance-2</code>, etc. Si ce paramètre n'est pas spécifié, <code translate="no">voyage-3</code> sera utilisé. Pour obtenir la liste des modèles disponibles, reportez-vous à la <a href="https://docs.voyageai.com/docs/embeddings">documentation officielle de Voyage</a>.</li>
<li><code translate="no">api_key</code> (chaîne) La clé API pour accéder à l'API de Voyage. Pour plus d'informations sur la création d'une clé API, reportez-vous à <a href="https://docs.voyageai.com/docs/api-key-and-installation">Clé API et client Python</a>.</li>
</ul>
<p>Pour créer des embeddings pour les documents, utilisez la méthode <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = voyage_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, voyage_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat attendu est similaire à ce qui suit :</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">0.02582654</span>, -<span class="hljs-number">0.00907086</span>, -<span class="hljs-number">0.04604037</span>, ..., -<span class="hljs-number">0.01227521</span>,
        <span class="hljs-number">0.04420955</span>, -<span class="hljs-number">0.00038829</span>]), array([ <span class="hljs-number">0.03844212</span>, -<span class="hljs-number">0.01597065</span>, -<span class="hljs-number">0.03728884</span>, ..., -<span class="hljs-number">0.02118733</span>,
        <span class="hljs-number">0.03349845</span>,  <span class="hljs-number">0.0065346</span> ]), array([ <span class="hljs-number">0.05143557</span>, -<span class="hljs-number">0.01096631</span>, -<span class="hljs-number">0.02690451</span>, ..., -<span class="hljs-number">0.02416254</span>,
        <span class="hljs-number">0.07658645</span>,  <span class="hljs-number">0.03064499</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Pour créer des embeddings pour des requêtes, utilisez la méthode <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = voyage_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, voyage_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat attendu est similaire à ce qui suit :</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">0.01733501</span>, -<span class="hljs-number">0.0230672</span> , -<span class="hljs-number">0.05208827</span>, ..., -<span class="hljs-number">0.00957995</span>,
        <span class="hljs-number">0.04493361</span>,  <span class="hljs-number">0.01485138</span>]), array([ <span class="hljs-number">0.05937521</span>, -<span class="hljs-number">0.00729363</span>, -<span class="hljs-number">0.02184347</span>, ..., -<span class="hljs-number">0.02107683</span>,
        <span class="hljs-number">0.05706626</span>,  <span class="hljs-number">0.0263358</span> ])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
