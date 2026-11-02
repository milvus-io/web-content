---
id: pinyin-filter.md
title: PinyinCompatible with Milvus 3.0.x
summary: >-
  Le filtre pinyin convertit les tokens de caractères chinois en tokens pinyin
  lors de l'analyse du texte, ce qui permet d'effectuer des correspondances
  basées sur le pinyin pour les textes en chinois.
beta: Milvus 3.0.x
---
<h1 id="Pinyin" class="common-anchor-header">Pinyin<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Pinyin" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche de texte en chinois nécessite souvent que les utilisateurs saisissent les caractères chinois exactement tels qu'ils apparaissent dans le texte indexé. Dans les processus de recherche de noms, de saisie semi-automatique et de recherche au fur et à mesure de la saisie, les utilisateurs tapent fréquemment le pinyin à la place des caractères chinois. Par exemple, un utilisateur peut saisir « <code translate="no">zuqiu</code> » pour rechercher « <code translate="no">足球</code> ». Le filtre « <code translate="no">pinyin</code> » ajoute des tokens pinyin à la sortie de l’analyseur afin que le texte chinois puisse correspondre à la saisie en pinyin sans qu’il soit nécessaire de gérer un champ pinyin distinct.</p>
<p>Le filtre « <code translate="no">pinyin</code> » est généralement utilisé avec le tokeniseur <a href="/docs/fr/jieba-tokenizer.md">Jieba</a> pour le texte chinois. Il fonctionne dans un pipeline de filtres d’analyseur personnalisé et peut générer plusieurs formes de tokens pinyin pour un même token chinois.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser les options par défaut, spécifiez « <code translate="no">&quot;pinyin&quot;</code> » dans la section « <code translate="no">filter</code> » de ` <code translate="no">analyzer_params</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;pinyin&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;pinyin&quot;</span>},
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;pinyin&quot;</span>}}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;pinyin&quot;</span> }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;jieba&quot;,
  &quot;filter&quot;: [&quot;pinyin&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cette syntaxe abrégée conserve les tokens chinois d’origine et génère des tokens pinyin au niveau des caractères. Elle ne génère pas de pinyin composé ni d’initiales pinyin, sauf si vous activez explicitement ces options.</p>
<p>Pour un contrôle total, spécifiez le filtre sous forme d’objet et configurez les formats de tokens pinyin générés par Milvus.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;filter&quot;</span>: [</span>
<span class="highlighted-comment-line">        {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">        }</span>
<span class="highlighted-comment-line">    ],</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
Map&lt;String, Object&gt; pinyinFilter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
pinyinFilter.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(pinyinFilter));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;type&quot;</span>:                       <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>:              <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>:           <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>:    <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>,
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>
        }
    ]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>},
            {<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>}
        }
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>,
        },
    ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;pinyin&quot;</span>,
            [<span class="hljs-string">&quot;keep_original&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>] = <span class="hljs-literal">false</span>
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;jieba&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;pinyin&quot;,
      &quot;keep_original&quot;: true,
      &quot;keep_full_pinyin&quot;: true,
      &quot;keep_joined_full_pinyin&quot;: false,
      &quot;keep_separate_first_letter&quot;: false
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le filtre accepte les paramètres suivants.</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Type</th><th>Valeur par défaut</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">keep_original</code></td><td>Booléen</td><td><code translate="no">true</code></td><td>Conserve le token chinois d'origine dans la sortie de l'analyseur.</td></tr>
<tr><td><code translate="no">keep_full_pinyin</code></td><td>Booléen</td><td><code translate="no">true</code></td><td>Génère des tokens Pinyin au niveau des caractères. Par exemple, « <code translate="no">中文</code> » produit « <code translate="no">zhong</code> » et « <code translate="no">wen</code> ».</td></tr>
<tr><td><code translate="no">keep_joined_full_pinyin</code></td><td>Booléen</td><td><code translate="no">false</code></td><td>Génère un token pinyin combiné pour chaque token source. Par exemple, « <code translate="no">中文</code> » produit « <code translate="no">zhongwen</code> ».</td></tr>
<tr><td><code translate="no">keep_separate_first_letter</code></td><td>Booléen</td><td><code translate="no">false</code></td><td>Génère un token « initiales pinyin » pour chaque token source. Par exemple, <code translate="no">中文</code> génère <code translate="no">zw</code>.</td></tr>
</tbody>
</table>
<p>Le filtre agit sur les tokens générés par le tokeniseur. Pour un texte en chinois, utilisez-le avec un tokeniseur tel que <code translate="no">jieba</code>.</p>
<h2 id="Examples" class="common-anchor-header">Exemples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d’appliquer la configuration de l’analyseur à votre schéma de collection, vérifiez son comportement avec <code translate="no">run_analyzer</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;中文测试&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;中文测试&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">sample_text</span> = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

std::string sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> sampleText = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-comment"># The run_analyzer request is sent directly to the endpoint below.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-text-with-character-level-Pinyin" class="common-anchor-header">Faire correspondre un texte chinois avec le pinyin au niveau des caractères<button data-href="#Match-Chinese-text-with-character-level-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>Le filtre <code translate="no">pinyin</code> par défaut conserve les tokens chinois d’origine et génère des tokens pinyin au niveau des caractères.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;pinyin&quot;</span>));

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;pinyin&quot;</span>},
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[sample_text])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;pinyin&quot;</span>}}
};

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(sample_text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">filter</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
};

<span class="hljs-keyword">const</span> char_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
    <span class="hljs-attr">text</span>: sample_text,
    analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(char_result.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;pinyin&quot;</span> }
};

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, result.Results.SelectMany(r =&gt; r.Tokens).Select(t =&gt; t.Token)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
        &quot;text&quot;: [&quot;中文测试&quot;],
        &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;: \&quot;jieba\&quot;, \&quot;filter\&quot;: [\&quot;pinyin\&quot;]}&quot;
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Résultat attendu :</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhong&#x27;, &#x27;wen&#x27;, &#x27;测试&#x27;, &#x27;ce&#x27;, &#x27;shi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-joined-Pinyin" class="common-anchor-header">Faire correspondre des termes chinois avec leur pinyin complet<button data-href="#Match-Chinese-terms-with-joined-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>Activez l’option « <code translate="no">keep_joined_full_pinyin</code> » lorsque vous souhaitez qu’un terme chinois corresponde à sa forme complète en pinyin joint.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
Map&lt;String, Object&gt; pinyinFilter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
pinyinFilter.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(pinyinFilter));

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;type&quot;</span>:                       <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>:              <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>:           <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>:    <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>,
        },
    },
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>
        }
    ]
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[sample_text])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>},
            {<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>}
        }
    }}
};

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(sample_text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">filter</span>: [
        {
            <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-attr">keep_original</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">keep_full_pinyin</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">keep_joined_full_pinyin</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">keep_separate_first_letter</span>: <span class="hljs-literal">false</span>,
        },
    ],
};

<span class="hljs-keyword">const</span> joined_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
    <span class="hljs-attr">text</span>: sample_text,
    analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(joined_result.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;pinyin&quot;</span>,
            [<span class="hljs-string">&quot;keep_original&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>] = <span class="hljs-literal">false</span>
        }
    }
};

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, result.Results.SelectMany(r =&gt; r.Tokens).Select(t =&gt; t.Token)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
        &quot;text&quot;: [&quot;中文测试&quot;],
        &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;: \&quot;jieba\&quot;, \&quot;filter\&quot;: [{\&quot;type\&quot;: \&quot;pinyin\&quot;, \&quot;keep_original\&quot;: true, \&quot;keep_full_pinyin\&quot;: false, \&quot;keep_joined_full_pinyin\&quot;: true, \&quot;keep_separate_first_letter\&quot;: false}]}&quot;
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Résultat attendu :</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhongwen&#x27;, &#x27;测试&#x27;, &#x27;ceshi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-Pinyin-initials" class="common-anchor-header">Associer des termes chinois à leurs initiales en pinyin<button data-href="#Match-Chinese-terms-with-Pinyin-initials" class="anchor-icon" translate="no">
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
    </button></h3><p>Activez l'option « <code translate="no">keep_separate_first_letter</code> » lorsque vous souhaitez qu'un terme chinois corresponde aux initiales de sa forme en pinyin.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
Map&lt;String, Object&gt; pinyinFilter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
pinyinFilter.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">true</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(pinyinFilter));

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;type&quot;</span>:                       <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>:              <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>:           <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>:    <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">true</span>,
        },
    },
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">true</span>
        }
    ]
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[sample_text])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>},
            {<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">true</span>}
        }
    }}
};

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(sample_text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">filter</span>: [
        {
            <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-attr">keep_original</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">keep_full_pinyin</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">keep_joined_full_pinyin</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">keep_separate_first_letter</span>: <span class="hljs-literal">true</span>,
        },
    ],
};

<span class="hljs-keyword">const</span> initials_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
    <span class="hljs-attr">text</span>: sample_text,
    analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(initials_result.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;pinyin&quot;</span>,
            [<span class="hljs-string">&quot;keep_original&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>] = <span class="hljs-literal">true</span>
        }
    }
};

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, result.Results.SelectMany(r =&gt; r.Tokens).Select(t =&gt; t.Token)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
        &quot;text&quot;: [&quot;中文测试&quot;],
        &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;: \&quot;jieba\&quot;, \&quot;filter\&quot;: [{\&quot;type\&quot;: \&quot;pinyin\&quot;, \&quot;keep_original\&quot;: true, \&quot;keep_full_pinyin\&quot;: false, \&quot;keep_joined_full_pinyin\&quot;: false, \&quot;keep_separate_first_letter\&quot;: true}]}&quot;
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Résultat attendu :</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zw&#x27;, &#x27;测试&#x27;, &#x27;cs&#x27;]
<button class="copy-code-btn"></button></code></pre>
