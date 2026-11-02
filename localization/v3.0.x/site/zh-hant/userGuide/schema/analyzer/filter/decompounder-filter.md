---
id: decompounder-filter.md
title: 複合詞拆分器
summary: 使用「拆分複合詞」篩選器，透過內嵌字典或已登錄的檔案資源來拆分複合詞。
---
<h1 id="Decompounder" class="common-anchor-header">複合詞拆分器<button data-href="#Decompounder" class="anchor-icon" translate="no">
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
    </button></h1><p>「<code translate="no">decompounder</code> 」篩選器會根據指定的字典，將複合詞拆分為個別組成部分，使搜尋複合詞的各部分更加容易。此篩選器對於經常使用複合詞的語言（例如德語）特別有用。</p>
<p>組成部分字典可透過 `<code translate="no">word_list</code> ` 參數直接提供，或透過 `<code translate="no">word_list_file</code> ` 參數從<a href="/docs/zh-hant/manage-file-resources.md">已註冊的檔案資源中</a>載入。</p>
<h2 id="Configuration" class="common-anchor-header">設定<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">decompounder</code> 篩選器可透過<code translate="no">word_list</code> 參數直接提供其組成詞彙表，或透過<code translate="no">word_list_file</code> 參數從已註冊的檔案資源載入。</p>
<h3 id="Inline-word-list" class="common-anchor-header">內嵌詞彙表<button data-href="#Inline-word-list" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">decompounder</code> 篩選器是 Milvus 中的自訂篩選器。若要使用它，請在篩選器配置中指定<code translate="no">&quot;type&quot;: &quot;decompounder&quot;</code> ，並搭配<code translate="no">word_list</code> 參數，該參數提供待辨識的單字組成部分字典。</p>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>);
                    put(<span class="hljs-string">&quot;word_list&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>]
    }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>},
            {<span class="hljs-string">&quot;word_list&quot;</span>, {<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>}}
        }
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment">// Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment">// Specifies the filter type as decompounder</span>
            [<span class="hljs-string">&quot;word_list&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span> }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;decompounder&quot;,
      &quot;word_list&quot;: [
        &quot;dampf&quot;,
        &quot;schiff&quot;,
        &quot;fahrt&quot;,
        &quot;brot&quot;,
        &quot;backen&quot;,
        &quot;automat&quot;
      ]
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">decompounder</code> 過濾器接受以下可配置參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">word_list</code></p></td>
     <td><p>用於拆分複合詞的詞彙組件清單。此字典決定複合詞如何被分解為個別詞彙。</p></td>
   </tr>
</table>
<p><code translate="no">decompounder</code> 過濾器是針對分詞器所產生的詞項進行處理，因此必須與分詞器搭配使用。有關 Milvus 中可用的分詞器清單，請參閱<a href="/docs/zh-hant/standard-tokenizer.md">「標準分詞器</a>」及其相關頁面。</p>
<p>定義完「<code translate="no">analyzer_params</code> 」後，您可在定義集合架構時將其套用至<code translate="no">VARCHAR</code> 欄位。這使 Milvus 能使用指定的分析器處理該欄位中的文字，以實現高效的詞元化與篩選。詳細資訊請參閱<a href="/docs/zh-hant/analyzer-overview.md#Example-use">「使用範例</a>」。</p>
<h3 id="Load-word-components-from-a-file-resource" class="common-anchor-header">從檔案資源載入單字組成部分<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Load-word-components-from-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h3><p>對於大型組件字典（尤其是完整語言的單字清單），請將組件儲存於檔案中，並將該檔案註冊為遠端檔案資源，然後透過 `<code translate="no">word_list_file</code> ` 參數在篩選器中引用該檔案。您可以單獨使用 `<code translate="no">word_list_file</code> `，或與內嵌的 `<code translate="no">word_list</code>` 搭配使用；當兩者皆設定時，篩選器會將這兩個來源合併為單一組件清單。</p>
<p>該檔案為純 UTF‑8 文字<strong>，每行</strong>包含<strong>一個元件詞</strong>。例如：</p>
<pre><code translate="no" class="language-plaintext">dampf
schiff
fahrt
brot
backen
automat
<button class="copy-code-btn"></button></code></pre>
<p>將檔案上傳至您的 Milvus 叢集所設定使用的物件儲存庫，然後進行註冊：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Register the uploaded file under a name you&#x27;ll reference from analyzer configs.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;de_components&quot;</span>,
    path=<span class="hljs-string">&quot;file/decompounder.txt&quot;</span>,    <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>透過 `<code translate="no">word_list_file</code>` 在篩選器中引用已註冊的資源：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;de_components&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;decompounder.txt&quot;</span>,
        },
    }],
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">word_list_file</code> 參數接受具有以下欄位的物件：</p>
<table>
   <tr>
     <th><p><strong>欄位</strong></p></th>
     <th><p><strong>說明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>資源類型。若要註冊透過<code translate="no">add_file_resource</code> 註冊的檔案，請使用<code translate="no">"remote"</code> 。至於自託管部署中使用的<code translate="no">"local"</code> 變體，請參閱《<a href="/docs/zh-hant/manage-file-resources.md">管理檔案資源</a>》。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">resource_name</code></p></td>
     <td><p>該檔案在<code translate="no">add_file_resource</code> 註冊時所使用的名稱。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">file_name</code></p></td>
     <td><p>已註冊資源的物件儲存路徑中的檔案名稱部分（例如，若資源是透過<code translate="no">path="file/decompounder.txt"</code> 註冊的，則為<code translate="no">"decompounder.txt"</code> ）。</p></td>
   </tr>
</table>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>在將分析器設定套用至您的集合架構之前，請使用<code translate="no">run_analyzer</code> 方法驗證其行為。</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">分析器設定<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>);
                    put(<span class="hljs-string">&quot;word_list&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>]
    }]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>},
            {<span class="hljs-string">&quot;word_list&quot;</span>, {<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>}}
        }
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment">// Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment">// Specifies the filter type as decompounder</span>
            [<span class="hljs-string">&quot;word_list&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span> }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;decompounder&quot;,
      &quot;word_list&quot;: [
        &quot;dampf&quot;,
        &quot;schiff&quot;,
        &quot;fahrt&quot;,
        &quot;brot&quot;,
        &quot;backen&quot;,
        &quot;automat&quot;
      ]
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">使用以下方式進行驗證<code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>

<span class="hljs-comment"># Run the analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
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

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParamsStr(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>]
    }]
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(
    RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])
        .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, result.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

std::string text = <span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>;
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; token : result.<span class="hljs-built_in">Tokens</span>()) {
        std::cout &lt;&lt; token.token_ &lt;&lt; <span class="hljs-string">&quot; &quot;</span>;
    }
    std::cout &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;dampfschifffahrt brotbackautomat&#x27;</span>,
  <span class="hljs-attr">analyzer_params</span>: analyzer_params
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Sample text to analyze</span>
<span class="hljs-keyword">var</span> sampleText = <span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>;

<span class="hljs-keyword">var</span> result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> r <span class="hljs-keyword">in</span> result.Results)
{
    Console.WriteLine(<span class="hljs-string">&quot;Analyzer output: &quot;</span> + <span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, r.Tokens.Select(t =&gt; t.Token)));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:\&quot;standard\&quot;,\&quot;filter\&quot;:[{\&quot;type\&quot;:\&quot;decompounder\&quot;,\&quot;word_list\&quot;:[\&quot;dampf\&quot;,\&quot;schiff\&quot;,\&quot;fahrt\&quot;,\&quot;brot\&quot;,\&quot;backen\&quot;,\&quot;automat\&quot;]}]}&quot;,
    &quot;text&quot;: [&quot;dampfschifffahrt brotbackautomat&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">預期輸出<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;dampf&#x27;</span>, <span class="hljs-string">&#x27;schiff&#x27;</span>, <span class="hljs-string">&#x27;fahrt&#x27;</span>, <span class="hljs-string">&#x27;brotbackautomat&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
