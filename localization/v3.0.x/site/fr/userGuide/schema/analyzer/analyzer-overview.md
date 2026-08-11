---
id: analyzer-overview.md
title: Présentation de l'analyseur
summary: >-
  Dans le traitement de texte, un analyseur est un composant essentiel qui
  convertit le texte brut en un format structuré et consultable. Chaque
  analyseur se compose généralement de deux éléments principaux : un tokeniseur
  et un filtre. Ensemble, ils transforment le texte d'entrée en tokens, affinent
  ces derniers et les préparent en vue d'un indexage et d'une recherche
  efficaces.
---
<h1 id="Analyzer-Overview" class="common-anchor-header">Présentation de l'analyseur<button data-href="#Analyzer-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans le traitement de texte, un <strong>analyseur</strong> est un composant essentiel qui convertit le texte brut en un format structuré et consultable. Chaque analyseur se compose généralement de deux éléments principaux : <strong>un tokeniseur</strong> et <strong>un filtre</strong>. Ensemble, ils transforment le texte d'entrée en tokens, affinent ces tokens et les préparent pour un indexage et une recherche efficaces.</p>
<p>Dans Milvus, les analyseurs sont configurés lors de la création d’une collection, lorsque vous ajoutez des champs d’ <code translate="no">VARCHAR</code> s au schéma de la collection. Les tokens générés par un analyseur peuvent être utilisés pour construire un index destiné à la correspondance par mot-clé ou convertis en représentations clairsemées pour la recherche en texte intégral. Pour plus d’informations, consultez les sections <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>, <a href="/docs/fr/phrase-match.md">Correspondance de phrases</a> ou <a href="/docs/fr/keyword-match.md">Correspondance de texte</a>.</p>
<div class="alert note">
<p>L’utilisation d’analyseurs peut avoir un impact sur les performances :</p>
<ul>
<li><p><strong>Recherche en texte intégral :</strong> pour la recherche en texte intégral, les canaux <strong>DataNode</strong> et <strong>QueryNode</strong> consomment les données plus lentement, car ils doivent attendre la fin de la tokenisation. Par conséquent, les données nouvellement ingérées mettent plus de temps à être disponibles pour la recherche.</p></li>
<li><p><strong>Correspondance par mot-clé :</strong> pour la correspondance par mot-clé, la création d’index est également plus lente, car la tokenisation doit être terminée avant qu’un index puisse être construit.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer" class="common-anchor-header">Anatomie d’un analyseur<button data-href="#Anatomy-of-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Milvus, un analyseur se compose exactement d’un <strong>tokeniseur</strong> et de <strong>zéro ou plusieurs</strong> filtres.</p>
<ul>
<li><p><strong>Tokeniseur</strong>: le tokeniseur divise le texte d’entrée en unités distinctes appelées « tokens ». Ces tokens peuvent être des mots ou des expressions, selon le type de tokeniseur.</p></li>
<li><p><strong>Filtres</strong>: des filtres peuvent être appliqués aux tokens afin de les affiner davantage, par exemple en les mettant en minuscules ou en supprimant les mots courants.</p></li>
</ul>
<div class="alert note">
<p>Les tokeniseurs ne prennent en charge que le format UTF-8. La prise en charge d’autres formats sera ajoutée dans les prochaines versions.</p>
</div>
<p>Le flux de travail ci-dessous illustre la manière dont un analyseur traite le texte.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-process-workflow.png" alt="Analyzer Process Workflow" class="doc-image" id="analyzer-process-workflow" /> 
   <span>Flux de travail du processus d’analyse</span>
  
 </span></p>
<h2 id="Analyzer-types" class="common-anchor-header">Types d'analyseurs<button data-href="#Analyzer-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus propose deux types d’analyseurs pour répondre à différents besoins en matière de traitement de texte :</p>
<ul>
<li><p><strong>Analyseur intégré</strong>: il s'agit de configurations prédéfinies qui couvrent les tâches courantes de traitement de texte avec un minimum de configuration. Les analyseurs intégrés sont idéaux pour les recherches générales, car ils ne nécessitent aucune configuration complexe.</p></li>
<li><p><strong>Analyseur personnalisé</strong>: pour des besoins plus avancés, les analyseurs personnalisés vous permettent de définir votre propre configuration en spécifiant à la fois le tokeniseur et zéro ou plusieurs filtres. Ce niveau de personnalisation est particulièrement utile pour les cas d'utilisation spécialisés où un contrôle précis du traitement du texte est nécessaire.</p></li>
</ul>
<div class="alert note">
<ul>
<li>Si vous omettez de définir des configurations d’analyseur lors de la création d’une collection, Milvus utilise par défaut l’analyseur « <code translate="no">standard</code> » pour tout le traitement de texte. Pour plus de détails, consultez la section <a href="/docs/fr/standard-analyzer.md">Analyseur standard</a>.</li>
<li>Pour des performances optimales en matière de recherche et de requêtes, choisissez un analyseur adapté à la langue de vos données textuelles. Par exemple, bien que l’analyseur « <code translate="no">standard</code> » soit polyvalent, il n’est pas forcément le meilleur choix pour les langues présentant des structures grammaticales particulières, telles que le chinois, l’arabe, le thaï, le japonais ou le coréen. Dans de tels cas, il est préférable d’utiliser un analyseur spécifique à la langue, tel que <a href="/docs/fr/chinese-analyzer.md"><code translate="no">chinese</code></a>, <a href="/docs/fr/arabic-analyzer.md"><code translate="no">arabic</code></a>, ou <a href="/docs/fr/thai-analyzer.md"><code translate="no">thai</code></a>, ou des analyseurs personnalisés dotés de tokeniseurs spécialisés (tels que <a href="/docs/fr/lindera-tokenizer.md"><code translate="no">lindera</code></a>, <a href="/docs/fr/icu-tokenizer.md"><code translate="no">icu</code></a>) et des filtres est vivement recommandé pour garantir une tokenisation précise et de meilleurs résultats de recherche.</li>
</ul>
</div>
<h3 id="Built-in-analyzer" class="common-anchor-header">Analyseur intégré<button data-href="#Built-in-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Les analyseurs intégrés à Milvus sont préconfigurés avec des tokeniseurs et des filtres spécifiques, ce qui vous permet de les utiliser immédiatement sans avoir à définir vous-même ces composants. Chaque analyseur intégré sert de modèle comprenant un tokeniseur et des filtres prédéfinis, avec des paramètres optionnels permettant une personnalisation.</p>
<p>Par exemple, pour utiliser l’analyseur intégré « <code translate="no">standard</code> », il suffit de spécifier son nom « <code translate="no">standard</code> » comme « <code translate="no">type</code> » et, si vous le souhaitez, d’inclure des configurations supplémentaires spécifiques à ce type d’analyseur, telles que « <code translate="no">stop_words</code> » :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment">// Defines a list of common words (stop words) to exclude from tokenization</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour vérifier le résultat de l’exécution d’un analyseur, utilisez la méthode ` <code translate="no">run_analyzer</code> ` :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment"># Run analyzer</span>
result = client.run_analyzer(
    text,
    analyzer_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascrip# Sample text to analyze</span>
<span class="hljs-keyword">const</span> text = <span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>

<span class="hljs-comment">// Run analyzer</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    text,
    analyzer_params
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;An efficient system relies on a robust analyzer to correctly process text for various applications.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat sera le suivant :</p>
<pre><code translate="no" class="language-plaintext">[&#x27;efficient&#x27;, &#x27;system&#x27;, &#x27;relies&#x27;, &#x27;on&#x27;, &#x27;robust&#x27;, &#x27;analyzer&#x27;, &#x27;to&#x27;, &#x27;correctly&#x27;, &#x27;process&#x27;, &#x27;text&#x27;, &#x27;various&#x27;, &#x27;applications&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>Cela démontre que l’analyseur tokenise correctement le texte d’entrée en filtrant les mots vides <code translate="no">&quot;a&quot;</code>, <code translate="no">&quot;an&quot;</code> et <code translate="no">&quot;for&quot;</code>, tout en renvoyant les tokens significatifs restants.</p>
<p>La configuration de l’analyseur intégré « <code translate="no">standard</code> » ci-dessus équivaut à la configuration d’un <a href="/docs/fr/analyzer-overview.md#Custom-analyzer">analyseur personnalisé</a> avec les paramètres suivants, où les options « <code translate="no">tokenizer</code> » et « <code translate="no">filter</code> » sont explicitement définies pour obtenir une fonctionnalité similaire :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       &quot;lowercase&quot;,
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
   ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus propose les analyseurs intégrés suivants, chacun étant conçu pour répondre à des besoins spécifiques en matière de traitement de texte :</p>
<ul>
<li><p><code translate="no">standard</code>: Convient au traitement de texte généraliste, en appliquant une tokenisation standard et un filtrage des minuscules.</p></li>
<li><p><code translate="no">english</code>: Optimisé pour les textes en anglais, avec prise en charge des mots vides anglais.</p></li>
<li><p><code translate="no">chinese</code>: Spécialisé dans le traitement des textes en chinois, avec notamment une tokenisation adaptée aux structures de la langue chinoise.</p></li>
<li><p><code translate="no">arabic</code>: Spécialisé dans le traitement des textes en arabe, avec normalisation arabe, normalisation des chiffres décimaux, lemmatisation arabe et suppression des mots vides en arabe.</p></li>
<li><p><code translate="no">thai</code>: Spécialisé dans le traitement des textes en thaï, avec segmentation des mots en thaï, normalisation des chiffres décimaux et suppression des mots vides en thaï.</p></li>
</ul>
<h3 id="Custom-analyzer" class="common-anchor-header">Analyseur personnalisé<button data-href="#Custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour un traitement de texte plus avancé, les analyseurs personnalisés de Milvus vous permettent de créer un pipeline de traitement de texte sur mesure en spécifiant à la fois un <strong>tokeniseur</strong> et <strong>des filtres</strong>. Cette configuration est idéale pour les cas d’utilisation spécialisés nécessitant un contrôle précis.</p>
<h4 id="Tokenizer" class="common-anchor-header">Tokeniseur</h4><p>Le <strong>tokeniseur</strong> est un composant <strong>obligatoire</strong> d’un analyseur personnalisé ; il lance le pipeline d’analyse en décomposant le texte d’entrée en unités distinctes, ou <strong>tokens</strong>. La tokenisation suit des règles spécifiques, telles que la division par espaces ou par signes de ponctuation, selon le type de tokeniseur. Ce processus permet un traitement plus précis et indépendant de chaque mot ou expression.</p>
<p>Par exemple, un tokeniseur convertirait le texte « <code translate="no">&quot;Vector Database Built for Scale&quot;</code> » en tokens distincts :</p>
<pre><code translate="no" class="language-plaintext">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemple de spécification d’un tokenizer</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;whitespace&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;whitespace&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter" class="common-anchor-header">Filtre</h4><p><strong>Les filtres</strong> sont des composants <strong>facultatifs</strong> qui agissent sur les tokens générés par le tokeniseur, en les transformant ou en les affinant selon les besoins. Par exemple, après avoir appliqué un filtre « <code translate="no">lowercase</code> » aux termes tokenisés « <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code> », le résultat pourrait être :</p>
<pre><code translate="no" class="language-sql">[&quot;vector&quot;, &quot;database&quot;, &quot;built&quot;, &quot;for&quot;, &quot;scale&quot;]
<button class="copy-code-btn"></button></code></pre>
<p>Les filtres d’un analyseur personnalisé peuvent être <strong>intégrés</strong> ou <strong>personnalisés</strong>, selon les besoins de configuration.</p>
<ul>
<li><p><strong>Filtres intégrés</strong>: préconfigurés par Milvus, ils ne nécessitent qu’une configuration minimale. Vous pouvez utiliser ces filtres tels quels en spécifiant leur nom. Les filtres ci-dessous sont intégrés et prêts à l’emploi :</p>
<ul>
<li><p><code translate="no">lowercase</code>: Convertit le texte en minuscules, garantissant ainsi une correspondance insensible à la casse. Pour plus de détails, consultez la section « <a href="/docs/fr/lowercase-filter.md">Minuscules</a> ».</p></li>
<li><p><code translate="no">asciifolding</code>: Convertit les caractères non ASCII en leurs équivalents ASCII, ce qui simplifie le traitement des textes multilingues. Pour plus de détails, consultez la section « <a href="/docs/fr/ascii-folding-filter.md">ASCII folding</a> ».</p></li>
<li><p><code translate="no">alphanumonly</code>: Ne conserve que les caractères alphanumériques en supprimant les autres. Pour plus de détails, consultez la section « <a href="/docs/fr/alphanumonly-filter.md">Alphanumonly</a> ».</p></li>
<li><p><code translate="no">cnalphanumonly</code>: Supprime les tokens contenant tout caractère autre que des caractères chinois, des lettres anglaises ou des chiffres. Pour plus de détails, voir « <a href="/docs/fr/cnalphanumonly-filter.md">Cnalphanumonly</a> ».</p></li>
<li><p><code translate="no">cncharonly</code>: Supprime les tokens contenant des caractères non chinois. Pour plus de détails, voir <a href="/docs/fr/cncharonly-filter.md">Cncharonly</a>.</p></li>
<li><p><code translate="no">pinyin</code>: Ajoute des formes de tokens en pinyin pour les tokens chinois, ce qui permet une correspondance basée sur le pinyin pour le texte chinois. Pour plus de détails, voir « <a href="/docs/fr/pinyin-filter.md">Pinyin</a> ».</p></li>
</ul>
<p><strong>Exemple d'utilisation d'un filtre intégré :</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment">// Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [&quot;lowercase&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtres personnalisés</strong>: les filtres personnalisés permettent des configurations spécialisées. Vous pouvez définir un filtre personnalisé en choisissant un type de filtre valide (<code translate="no">filter.type</code>) et en ajoutant des paramètres spécifiques pour chaque type de filtre. Exemples de types de filtres prenant en charge la personnalisation :</p>
<ul>
<li><p><code translate="no">stop</code>: Supprime les mots courants spécifiés en définissant une liste de mots vides (par exemple, <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). Pour plus de détails, consultez la section <a href="/docs/fr/stop-filter.md">Mots vides</a>.</p></li>
<li><p><code translate="no">length</code>: Exclut des tokens en fonction de critères de longueur, par exemple en définissant une longueur maximale pour les tokens. Pour plus de détails, consultez la section « <a href="/docs/fr/length-filter.md">Longueur</a> ».</p></li>
<li><p><code translate="no">stemmer</code>: Réduit les mots à leur forme de racine pour une correspondance plus flexible. Pour plus de détails, voir « <a href="/docs/fr/stemmer-filter.md">Stemmer</a> ».</p></li>
</ul>
<p><strong>Exemple de configuration d’un filtre personnalisé :</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
            put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
        }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment">// Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment">// Customizes stop words for this filter type</span>
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use" class="common-anchor-header">Exemple d'utilisation<button data-href="#Example-use" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cet exemple, vous allez créer un schéma de collection comprenant :</p>
<ul>
<li><p>Un champ vectoriel pour les représentations.</p></li>
<li><p>Deux champs d'<code translate="no">VARCHAR</code> s pour le traitement de texte :</p>
<ul>
<li><p>Un champ utilise un analyseur intégré.</p></li>
<li><p>L'autre utilise un analyseur personnalisé.</p></li>
</ul></li>
</ul>
<p>Avant d’intégrer ces configurations à votre collection, vous allez vérifier chaque analyseur à l’aide de la méthode ` <code translate="no">run_analyzer</code> `.</p>
<h3 id="Step-1-Initialize-MilvusClient-and-create-schema" class="common-anchor-header">Étape 1 : Initialiser MilvusClient et créer un schéma<button data-href="#Step-1-Initialize-MilvusClient-and-create-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Commencez par configurer le client Milvus et créer un nouveau schéma.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Set up a Milvus client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a new schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
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

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">true</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-and-verify-analyzer-configurations" class="common-anchor-header">Étape 2 : Définir et vérifier les configurations des analyseurs<button data-href="#Step-2-Define-and-verify-analyzer-configurations" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Configurez et vérifiez un analyseur intégré</strong> (<code translate="no">english</code>)<strong>:</strong></p>
<ul>
<li><p><strong>Configuration :</strong> définissez les paramètres de l'analyseur intégré pour l'anglais.</p></li>
<li><p><strong>Vérification :</strong> utilisez <code translate="no">run_analyzer</code> pour vérifier que la configuration produit la tokenisation attendue.</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Built-in analyzer configuration for English text processing</span>
analyzer_params_built_in = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Verify built-in analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_built_in)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Built-in analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Built-in analyzer output: [&#x27;milvus&#x27;, &#x27;simplifi&#x27;, &#x27;text&#x27;, &#x27;analysi&#x27;, &#x27;search&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParamsBuiltin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParamsBuiltin.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus simplifies text ana

lysis for search.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Use a built-in analyzer for VARCHAR field `title_en`</span>
<span class="hljs-keyword">const</span> analyzerParamsBuiltIn = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus simplifies text analysis for search.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configurer et vérifier un analyseur personnalisé :</strong></p>
<ul>
<li><p><strong>Configuration :</strong> définissez un analyseur personnalisé qui utilise un tokeniseur standard ainsi qu’un filtre de mise en minuscules intégré et des filtres personnalisés pour la longueur des tokens et les mots vides.</p></li>
<li><p><strong>Vérification :</strong> utilisez <code translate="no">run_analyzer</code> pour vous assurer que la configuration personnalisée traite le texte comme prévu.</p></li>
</ul>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#javascript">NodeJS</a>
<a href="#go">Go</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Custom analyzer configuration with a standard tokenizer and custom filters</span>
analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter: convert tokens to lowercase</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,  <span class="hljs-comment"># Custom filter: restrict token length</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,  <span class="hljs-comment"># Custom filter: remove specified stop words</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Verify custom analyzer configuration</span>
sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>
result = client.run_analyzer(sample_text, analyzer_params_custom)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer output:&quot;</span>, result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Custom analyzer output: [&#x27;milvus&#x27;, &#x27;provides&#x27;, &#x27;flexible&#x27;, &#x27;customizable&#x27;, &#x27;analyzers&#x27;, &#x27;robust&#x27;, &#x27;text&#x27;, &#x27;processing&#x27;]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Configure a custom analyzer</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
                    put(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">40</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    put(<span class="hljs-string">&quot;stop_words&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}
        )
);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Configure a custom analyzer for VARCHAR field `title`</span>
<span class="hljs-keyword">const</span> analyzerParamsCustom = {
  <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
  <span class="hljs-attr">filter</span>: [
    <span class="hljs-string">&quot;lowercase&quot;</span>,
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;length&quot;</span>,
      <span class="hljs-attr">max</span>: <span class="hljs-number">40</span>,
    },
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;stop&quot;</span>,
      <span class="hljs-attr">stop_words</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>],
    },
  ],
};
<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>;
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>({
    <span class="hljs-attr">text</span>: sample_text, 
    <span class="hljs-attr">analyzer_params</span>: analyzer_params_built_in
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-string">&quot;lowercase&quot;</span>, 
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
        <span class="hljs-string">&quot;max&quot;</span>:  <span class="hljs-number">40</span>,
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
        <span class="hljs-string">&quot;stop_words&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>},
    }}}
    
bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Milvus provides flexible, customizable analyzers for robust text processing.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># curl</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-3-Add-fields-to-the-schema" class="common-anchor-header">Étape 3 : Ajouter des champs au schéma<button data-href="#Step-3-Add-fields-to-the-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Maintenant que vous avez vérifié vos configurations d'analyseur, ajoutez-les aux champs de votre schéma :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add VARCHAR field &#x27;title_en&#x27; using the built-in analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_built_in,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add VARCHAR field &#x27;title&#x27; using the custom analyzer configuration</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_custom,
    enable_match=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add a vector field for embeddings</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)

<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .analyzerParams(analyzerParams)
        .enableMatch(<span class="hljs-literal">true</span>) <span class="hljs-comment">// must enable this if you use TextMatch</span>
        .build());

<span class="hljs-comment">// Add vector field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());
<span class="hljs-comment">// Add primary field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = {
  <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
      <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_en&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsBuiltIn,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzer_params</span>: analyzerParamsCustom,
      <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
    },
  ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithAnalyzerParams(analyzerParams).
    WithEnableMatch(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Prepare-index-parameters-and-create-the-collection" class="common-anchor-header">Étape 4 : Préparer les paramètres d'index et créer la collection<button data-href="#Step-4-Prepare-index-parameters-and-create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up index parameters for the vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)

<span class="hljs-comment"># Create the collection with the defined schema and index parameters</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Set up index params for vector field</span>
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: indexParams,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Collection created successfully!&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.COSINE))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, idx)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois l'analyseur configuré, vous pouvez l'intégrer aux fonctionnalités de recherche de texte fournies par Milvus. Pour plus de détails :</p>
<ul>
<li><p><a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a></p></li>
<li><p><a href="/docs/fr/keyword-match.md">Correspondance de texte</a></p></li>
<li><p><a href="/docs/fr/phrase-match.md">Correspondance de phrases</a></p></li>
</ul>
