---
id: language-identifier.md
title: 語言識別器Compatible with Milvus v2.5.15+
summary: >-
  language_identifier 是一個專門的 tokenizer，目的是透過自動化的語言分析過程來增強 Milvus
  的文字搜尋能力。它的主要功能是偵測文字欄位的語言，然後動態套用最適合該語言的預先設定分析器。這對於處理多種語言的應用程式特別有價值，因為它省去了按輸入進行手動語言分配的需要。
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">語言識別器<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> 是一個專門的標記器，旨在通過自動化語言分析過程來增強 Milvus 的文本搜索能力。它的主要功能是偵測文字欄位的語言，然後動態套用最適合該語言的預先設定分析器。這對於處理多種語言的應用程式特別有價值，因為它省去了按輸入進行手動語言分配的需要。</p>
<p>透過智慧型地將文字資料路由至適當的處理管道，<code translate="no">language_identifier</code> 可簡化多語言資料的擷取，並確保後續搜尋與檢索作業的精確標記化。</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">語言偵測工作流程<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> 會執行一系列步驟來處理文字串，這個工作流程對於使用者了解如何正確配置是非常重要的。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>語言偵測工作流程</span> </span></p>
<ol>
<li><p><strong>輸入：</strong>工作流程以文字串作為輸入開始。</p></li>
<li><p><strong>語言偵測：</strong>首先將此字串傳送到語言偵測引擎，嘗試識別語言。Milvus 支援兩個引擎：<strong>Whatlang</strong>和<strong>lingua</strong>。</p></li>
<li><p><strong>分析器選擇：</strong></p>
<ul>
<li><p><strong>成功：</strong>如果成功偵測到語言，系統會檢查偵測到的語言名稱是否在您的<code translate="no">analyzers</code> 字典中設定了相對應的分析器。如果找到匹配，系統就會將指定的分析器套用到輸入的文字上。例如，偵測到的 "Mandarin "文字會被路由到<code translate="no">jieba</code> tokenizer。</p></li>
<li><p><strong>回退：</strong>如果檢測失敗，或成功檢測到某種語言，但您沒有提供特定的分析器，系統會預設為預先設定的<strong>預設分析器</strong>。這是需要澄清的關鍵點；<code translate="no">default</code> 分析器是偵測失敗或沒有匹配分析器時的備用分析器。</p></li>
</ul></li>
</ol>
<p>選擇適當的分析器之後，文字會被標記化並加以處理，完成工作流程。</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">可用的語言偵測引擎<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供兩種語言偵測引擎供您選擇：</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>選擇取決於您應用程式的具體性能和準確性要求。</p>
<table>
   <tr>
     <th><p>引擎</p></th>
     <th><p>速度</p></th>
     <th><p>精確度</p></th>
     <th><p>輸出格式</p></th>
     <th><p>最適合</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>快速</p></td>
     <td><p>適合大多數語言</p></td>
     <td><p>語言名稱 (例如<code translate="no">"English"</code>,<code translate="no">"Mandarin"</code>,<code translate="no">"Japanese"</code>)</p><p><strong>參考：</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">支援語言表中的語言列</a></p></td>
     <td><p>速度極為重要的即時應用程式</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>較慢</p></td>
     <td><p>精確度較高，尤其是短篇文字</p></td>
     <td><p>英文名稱 (例如<code translate="no">"English"</code>,<code translate="no">"Chinese"</code>,<code translate="no">"Japanese"</code>)</p><p><strong>參考：</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">支援的語言清單</a></p></td>
     <td><p>精確度比速度更重要的應用程式</p></td>
   </tr>
</table>
<p>一個重要的考慮因素是引擎的命名慣例。雖然兩個引擎都會以英文傳回語言名稱，但它們對某些語言使用不同的術語 (例如<code translate="no">whatlang</code> 會傳回<code translate="no">Mandarin</code> ，而<code translate="no">lingua</code> 會傳回<code translate="no">Chinese</code>)。分析器的關鍵字必須完全符合所選偵測引擎所傳回的名稱。</p>
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
    </button></h2><p>要正確使用<code translate="no">language_identifier</code> tokenizer，必須採取下列步驟來定義和套用其設定。</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">步驟 1：選擇語言和分析器<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>設定<code translate="no">language_identifier</code> 的核心是針對您計劃支援的特定語言量身打造您的分析器。系統的運作方式是將偵測到的語言與正確的分析器相匹配，因此這一步對於精確的文字處理是非常重要的。</p>
<p>以下是推薦的語言與合適的 Milvus 分析器的對應表。此表可作為語言偵測引擎輸出與最佳工具之間的橋梁。</p>
<table>
   <tr>
     <th><p>語言 (偵測器輸出)</p></th>
     <th><p>推薦分析器</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>標準英語標記化，含詞幹和停止詞過濾。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (via whatlang) 或<code translate="no">Chinese</code> (via lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>針對非空間分隔文字的中文分詞。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>適用於複雜文字的強大標記器，包括日文。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>,<code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>可處理法語重音和字符的自訂配置。</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>匹配是關鍵：</strong>您的分析器名稱<strong>必須完全符合</strong>偵測引擎的語言輸出。例如，如果您使用<code translate="no">whatlang</code> ，中文文字的關鍵字必須是<code translate="no">Mandarin</code> 。</p></li>
<li><p><strong>最佳實務：</strong>上表提供了幾種常見語言的建議配置，但並非詳盡無遺的清單。如需更全面的分析儀選擇指南，請參閱<a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md">Choose the Right Analyzer for Your Use Case</a>。</p></li>
<li><p><strong>偵測器輸出</strong>：如需檢測引擎傳回的完整語言名稱清單，請參閱<a href="https://github.com/greyblake/whatlang-rs">Whatlang 支援的語言表</a>和<a href="https://github.com/pemistahl/lingua-rs">Lingua 支援的語言清單</a>。</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">步驟 2：定義 analyzer_params<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>要在 Milvus 中使用<code translate="no">language_identifier</code> tokenizer，請建立一個包含這些關鍵元件的字典：</p>
<p><strong>必需的元件：</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - 包含所有分析器配置的字典，其中必須包括：</p>
<ul>
<li><p><code translate="no">default</code> - 當語言偵測失敗或找不到匹配的分析器時使用的後備分析器</p></li>
<li><p><strong>特定語言的分析器</strong>- 每個都定義為<code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> ，其中：</p>
<ul>
<li><p><code translate="no">analyzer_name</code> 符合您選擇的偵測引擎輸出 (例如<code translate="no">&quot;English&quot;</code>,<code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> 遵循標準分析器參數格式 (請參閱<a href="/docs/zh-hant/analyzer-overview.md#Analyzer-types">分析器概述</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>可選元件：</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - 指定要使用的語言偵測引擎 (<code translate="no">whatlang</code> 或<code translate="no">lingua</code>)。如果未指定，則預設為<code translate="no">whatlang</code> </p></li>
<li><p><code translate="no">mapping</code> - 為您的分析器建立自訂別名，允許您使用描述性名稱，而非偵測引擎的確切輸出格式</p></li>
</ul>
<p>tokenizer 的工作方式是先偵測輸入文字的語言，然後從您的設定中選擇適當的分析器。如果檢測失敗或不存在匹配的分析器，它會自動返回到您的<code translate="no">default</code> 分析器。</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">建議使用：直接名稱匹配</h4><p>您的分析器名稱應該與您選擇的語言偵測引擎輸出完全匹配。這種方法比較簡單，而且可以避免潛在的混淆。</p>
<p>對於<code translate="no">whatlang</code> 和<code translate="no">lingua</code> ，請使用各自文件中顯示的語言名稱：</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">whatlang 支援的語言</a>(使用<strong>「語言</strong>」欄)</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingua 支援的語言</a></p></li>
</ul>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">替代方法：自訂名稱與映射</h4><p>如果您偏好使用自訂分析器名稱，或需要維持與現有組態的相容性，您可以使用<code translate="no">mapping</code> 參數。這會為您的分析器建立別名 - 原本的偵測引擎名稱和您自訂的名稱都可以使用。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>定義<code translate="no">analyzer_params</code> 之後，您可以在定義集合模式時，將它們套用到<code translate="no">VARCHAR</code> 欄位。這可讓 Milvus 使用指定的分析器來處理該欄位中的文字，以進行有效的標記化和過濾。詳情請參閱<a href="/docs/zh-hant/analyzer-overview.md#Example-use">範例使用</a>。</p>
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
    </button></h2><p>以下是一些常見情況的即用配置。每個範例都包含設定和驗證程式碼，讓您可以立即測試設定。</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">英文和中文檢測<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">歐洲語言重音規範化<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>, 
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">使用注意事項<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>每個欄位單一語言：</strong>它將欄位視為單一、同質的文字單位。其設計可處理不同資料記錄中的不同語言，例如一筆記錄包含英文句子，而下一筆記錄則包含法文句子。</p></li>
<li><p><strong>無混合語言字串：</strong>它<strong>不是</strong>設計來處理包含多種語言文字的單一字串。例如，單一<code translate="no">VARCHAR</code> 欄位同時包含英文句子和引述的日文詞組，將被視為單一語言處理。</p></li>
<li><p><strong>主要語言處理：</strong>在混合語言的情況下，偵測引擎很可能會識別主要語言，並將相應的分析器套用至整個文字。這將導致內嵌外文的標記化效果不佳或根本沒有標記化。</p></li>
</ul>
