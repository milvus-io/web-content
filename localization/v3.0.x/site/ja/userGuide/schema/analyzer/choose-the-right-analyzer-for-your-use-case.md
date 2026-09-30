---
id: choose-the-right-analyzer-for-your-use-case.md
title: 用途に合ったアナライザーの選び方
summary: 注記
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">用途に合ったアナライザーの選び方<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>このガイドでは、アナライザー選定における実践的な意思決定に焦点を当てています。アナライザーの構成要素やパラメータの追加方法に関する技術的な詳細については、「<a href="/docs/ja/analyzer-overview.md">アナライザーの概要</a>」を参照してください。</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">2分で理解するアナライザー<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、アナライザーがこのフィールドに保存されたテキストを処理し、<a href="/docs/ja/full-text-search.md">全文検索</a>（BM25）、<a href="/docs/ja/phrase-match.md">フレーズ一致</a>、<a href="/docs/ja/keyword-match.md">テキスト一致</a>などの機能で検索可能にします。アナライザーは、生のコンテンツを検索可能なトークンに変換するテキストプロセッサだと考えてください。</p>
<p>アナライザーは、以下の2段階からなるシンプルなパイプラインで動作します：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>アナライザーのワークフロー</span>
  
 </span></p>
<ol>
<li><p><strong>トークン化（必須）：</strong>この初期段階では、<strong>トークナイザー</strong>を適用して、連続したテキスト文字列を「トークン」と呼ばれる個別の意味のある単位に分割します。トークン化の手法は、言語やコンテンツの種類によって大きく異なります。</p></li>
<li><p><strong>トークンのフィルタリング（オプション）：</strong>トークン化の後、<strong>フィルタを</strong>適用してトークンを変更、削除、または精緻化します。これらの操作には、すべてのトークンを小文字に変換すること、一般的な無意味な単語（ストップワードなど）を削除すること、または単語を語幹形に還元すること（ステミング）などが含まれます。</p></li>
</ol>
<p><strong>例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">アナライザーの選択が重要な理由<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>不適切なアナライザーを選択すると、関連性の高いドキュメントが検索できなくなったり、無関係な結果が返されたりすることがあります。</p>
<p>以下の表は、不適切なアナライザーの選択によって引き起こされる一般的な問題をまとめ、検索上の問題を診断するための実用的な解決策を示しています。</p>
<table>
   <tr>
     <th><p>問題</p></th>
     <th><p>症状</p></th>
     <th><p>例（入力と出力）</p></th>
     <th><p>原因（不適切なアナライザー）</p></th>
     <th><p>解決策（適切なアナライザー）</p></th>
   </tr>
   <tr>
     <td><p>トークン化の過剰</p></td>
     <td><p>技術用語、識別子、またはURLを含むテキストクエリで、関連するドキュメントが見つからない。</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> →<code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> →<code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ja/standard-analyzer.md"><code translate="no">standard</code></a> アナライザー</p></td>
     <td><p>tokenizer <a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> トークナイザーを使用し、 <a href="/docs/ja/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> フィルターと組み合わせる。</p></td>
   </tr>
   <tr>
     <td><p>トークン化不足</p></td>
     <td><p>複数語からなるフレーズの構成要素を検索しても、そのフレーズ全体を含むドキュメントが返されない。</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> →<code translate="no">['state-of-the-art']</code></p></td>
     <td><p>以下の <a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> トークナイザー</p></td>
     <td><p>トークナイザーを備えた <a href="/docs/ja/standard-tokenizer.md"><code translate="no">standard</code></a> トークナイザーを使用して、句読点やスペースで分割します。カスタム<a href="/docs/ja/regex-filter.md">正規表現</a>フィルターを使用します。</p></td>
   </tr>
   <tr>
     <td><p>言語の不一致</p></td>
     <td><p>特定の言語の検索結果が意味をなさないか、まったく表示されない。</p></td>
     <td><p>中国語のテキスト：<code translate="no">"机器学习"</code> →<code translate="no">['机器学习']</code> （1つのトークン）</p></td>
     <td><p><a href="/docs/ja/english-analyzer.md"><code translate="no">english</code></a> アナライザー</p></td>
     <td><p>言語固有のアナライザー（例： <a href="/docs/ja/chinese-analyzer.md"><code translate="no">chinese</code></a>。</p></td>
   </tr>
   <tr>
     <td><p>入力方法の不一致</p></td>
     <td><p>ユーザーはピンインを入力していますが、インデックス化されたテキストには漢字が使用されています。</p></td>
     <td><p>中国語のテキスト：<code translate="no">"足球"</code> ；クエリテキスト：<code translate="no">"zuqiu"</code></p></td>
     <td><p>漢字トークンのみを出力するアナライザー</p></td>
     <td><p>以下の <a href="/docs/ja/jieba-tokenizer.md"><code translate="no">jieba</code></a> tokenizerおよび <a href="/docs/ja/pinyin-filter.md"><code translate="no">pinyin</code></a> フィルターを備えたカスタムアナライザーを使用します。</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">最初の質問：アナライザーを選択する必要がありますか？<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>多くのユースケースでは、特別な設定は必要ありません。あなたのケースがそれに該当するかどうかを確認しましょう。</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">デフォルトの動作：<code translate="no">standard</code> アナライザー<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>全文検索などのテキスト検索機能を使用する際にアナライザーを指定しない場合、Milvusは自動的に <a href="/docs/ja/standard-analyzer.md"><code translate="no">standard</code></a> アナライザーを自動的に使用します。</p>
<p><code translate="no">standard</code> アナライザー：</p>
<ul>
<li><p>スペースや句読点でテキストを分割します</p></li>
<li><p>すべてのトークンを小文字に変換します</p></li>
<li><p>組み込みの一般的な英語のストップワードと、ほとんどの句読点を削除します</p></li>
</ul>
<p><strong>変換例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">判断基準：簡単な確認<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>この表を使用して、デフォルトの<code translate="no">standard</code> アナライザーが要件を満たしているかどうかを素早く判断してください。要件を満たさない場合は、別の方法を選択する必要があります。</p>
<table>
   <tr>
     <th><p>コンテンツ</p></th>
     <th><p>標準アナライザーで問題ありませんか？</p></th>
     <th><p>理由</p></th>
     <th><p>必要なもの</p></th>
   </tr>
   <tr>
     <td><p>英語のブログ記事</p></td>
     <td><p>✅ はい</p></td>
     <td><p>デフォルトの動作で十分です。</p></td>
     <td><p>デフォルト設定を使用する（設定不要）。</p></td>
   </tr>
   <tr>
     <td><p>中国語のドキュメント</p></td>
     <td><p>❌ いいえ</p></td>
     <td><p>中国語の単語にはスペースが含まれていないため、1つのトークンとして扱われます。</p></td>
     <td><p>組み込みの <a href="/docs/ja/chinese-analyzer.md"><code translate="no">chinese</code></a> アナライザーを使用します。</p></td>
   </tr>
   <tr>
     <td><p>アラビア語の文書</p></td>
     <td><p>❌ いいえ</p></td>
     <td><p>アラビア語のテキストには、文字の異体、発音記号、タトゥイール、アラビア・インド数字、および言語固有の処理を必要とする一般的なアラビア語のストップワードが含まれる場合があります。</p></td>
     <td><p>組み込みの <a href="/docs/ja/arabic-analyzer.md"><code translate="no">arabic</code></a> アナライザーを使用してください。</p></td>
   </tr>
   <tr>
     <td><p>タイ語の文書</p></td>
     <td><p>❌ いいえ</p></td>
     <td><p>タイ語のテキストでは通常、単語間にスペースが使用されないため、言語固有の単語分割が必要です。</p></td>
     <td><p>組み込みの <a href="/docs/ja/thai-analyzer.md"><code translate="no">thai</code></a> アナライザーを使用してください。</p></td>
   </tr>
   <tr>
     <td><p>技術文書</p></td>
     <td><p>❌ いいえ</p></td>
     <td><p>「<code translate="no">C++</code> 」のような用語から句読点が削除されます。</p></td>
     <td><p>トークナイザーを使用して、カスタムアナライザーを作成します <a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> トークナイザーと <a href="/docs/ja/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> フィルターを備えたカスタムアナライザーを作成します。</p></td>
   </tr>
   <tr>
     <td><p>フランス語やスペイン語など、スペースで区切られた言語のテキスト</p></td>
     <td><p>⚠️ 場合によっては</p></td>
     <td><p>アクセント付き文字（<code translate="no">café</code> 対<code translate="no">cafe</code> ）が一致しない可能性があります。</p></td>
     <td><p>より良い結果を得るためには、 <a href="/docs/ja/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> を使用することをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p>多言語または未知の言語</p></td>
     <td><p>❌ 不可</p></td>
     <td><p><code translate="no">standard</code> アナライザーには、さまざまな文字セットやトークン化ルールを処理するために必要な、言語固有のロジックが欠けています。</p></td>
     <td><p>ユニコード対応のトークナイゼーションを行うには、 <a href="/docs/ja/icu-tokenizer.md"><code translate="no">icu</code></a> ユニコード対応のトークナイザーを備えたカスタムアナライザーを使用してください。 </p><p>あるいは、多言語コンテンツをより正確に処理するために、<a href="/docs/ja/multi-language-analyzers.md">多言語アナライザや</a> <a href="/docs/ja/language-identifier.md">言語識別子の</a>設定を検討してください。</p></td>
   </tr>
</table>
<p>デフォルトの `<code translate="no">standard</code> ` アナライザーが要件を満たせない場合は、別のアナライザーを実装する必要があります。その方法には 2 つの選択肢があります。</p>
<ul>
<li><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">組み込みのアナライザーを使用するか</a>、</p></li>
<li><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">カスタムアナライザーを作成する</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">方法 A：組み込みアナライザーの使用<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>組み込みアナライザは、一般的な言語向けにあらかじめ設定されたソリューションです。デフォルトの標準アナライザが完全に適合しない場合、これらを使用するのが最も簡単な導入方法です。</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">利用可能な組み込みアナライザ<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>アナライザ</p></th>
     <th><p>対応言語</p></th>
     <th><p>コンポーネント</p></th>
     <th><p>備考</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>スペース区切りが主流の言語（英語、フランス語、ドイツ語、スペイン語など）</p></td>
     <td><ul><li><p>トークナイザー：<code translate="no">standard</code></p></li><li><p>フィルター：<code translate="no">lowercase</code></p></li></ul></td>
     <td><p>初期のテキスト処理用の汎用アナライザー。単一言語のシナリオでは、言語固有のアナライザー（<code translate="no">english</code> など）の方が優れたパフォーマンスを発揮します。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>英語専用であり、英語の意味的マッチングを向上させるためにステミングとストップワードの除去を行います。</p></td>
     <td><ul><li><p>トークナイザー：<code translate="no">standard</code></p></li><li><p>フィルター：<code translate="no">lowercase</code> 、<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> よりも、英語のみのコンテンツに推奨されます。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>中国語</p></td>
     <td><ul><li><p>トークナイザー：<code translate="no">jieba</code></p></li><li><p>フィルター:<code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>現在、デフォルトで簡体字中国語辞書を使用しています。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>アラビア語</p></td>
     <td><ul><li><p>トークナイザー:<code translate="no">standard</code></p></li><li><p>フィルター：<code translate="no">lowercase</code> 、<code translate="no">decimaldigit</code> 、<code translate="no">arabic_normalization</code> 、<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> よりもアラビア語テキストにはこちらが推奨されます。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>タイ語</p></td>
     <td><ul><li><p>トークナイザー:<code translate="no">thai</code></p></li><li><p>フィルター：<code translate="no">lowercase</code> 、<code translate="no">decimaldigit</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> や空白ベースのトークン化よりも、タイ語テキストにはこちらが推奨されます。</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">実装例<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>組み込みのアナライザーを使用するには、フィールドスキーマを定義する際に、<code translate="no">analyzer_params</code> でそのタイプを指定するだけです。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>詳細な使用方法については、「<a href="/docs/ja/full-text-search.md">全文検索</a>」、「<a href="/docs/ja/keyword-match.md">テキスト一致</a>」、「<a href="/docs/ja/phrase-match.md">フレーズ一致</a>」を参照してください。</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">方法 B: カスタムアナライザーの作成<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">組み込みのオプションで</a>要件を満たせない場合は、トークナイザーと一連のフィルターを組み合わせて、カスタムアナライザーを作成することができます。これにより、テキスト処理パイプラインを完全に制御できるようになります。</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">ステップ 1: 言語に基づいてトークナイザーを選択する<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>コンテンツの主要言語に基づいてトークナイザーを選択してください：</p>
<h4 id="Western-languages" class="common-anchor-header">西洋言語</h4><p>スペース区切りの言語については、以下のオプションがあります：</p>
<table>
   <tr>
     <th><p>トークナイザー</p></th>
     <th><p>仕組み</p></th>
     <th><p>適した用途</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>スペースや句読点に基づいてテキストを分割します</p></td>
     <td><p>一般的なテキスト、さまざまな句読点が混在している場合</p></td>
     <td><ul><li><p>入力：<code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>出力:<code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>空白文字でのみ分割する</p></td>
     <td><p>前処理済みのコンテンツ、ユーザーが書式設定したテキスト</p></td>
     <td><ul><li><p>入力:<code translate="no">"user_id = get_user_data()"</code></p></li><li><p>出力:<code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">東アジア言語</h4><p>単語間のスペースが統一されていない言語では、適切な単語分割を行うために専用のトークナイザーが必要です:</p>
<h5 id="Chinese" class="common-anchor-header">中国語</h5><table>
   <tr>
     <th><p>トークナイザー</p></th>
     <th><p>仕組み</p></th>
     <th><p>最適な用途</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>インテリジェントなアルゴリズムを用いた中国語辞書ベースのセグメンテーション</p></td>
     <td><p><strong>中国語コンテンツに推奨</strong>- 辞書とインテリジェントなアルゴリズムを組み合わせ、中国語向けに特別に設計されています</p></td>
     <td><ul><li><p>入力：<code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>出力：<code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>中国語辞書（<a href="https://cc-cedict.org/wiki/">cc-cedict</a>）を用いた純粋な辞書ベースの形態素解析</p></td>
     <td><p><code translate="no">jieba</code> と比較して、中国語テキストをより汎用的な方法で処理します</p></td>
     <td><ul><li><p>入力:<code translate="no">"机器学习算法"</code></p></li><li><p>出力:<code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">タイ語</h5><p>ほとんどのタイ語テキストについては、組み込みの <a href="/docs/ja/thai-analyzer.md"><code translate="no">thai</code></a> アナライザーを使用してください。スタンドアロンの <a href="/docs/ja/thai-tokenizer.md"><code translate="no">thai</code></a> トークナイザーは、カスタムアナライザーパイプラインを構築する必要がある場合にのみ使用してください。</p>
<table>
   <tr>
     <th><p>トークナイザー</p></th>
     <th><p>仕組み</p></th>
     <th><p>最適な用途</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>タイ語のテキストを単語トークンに分割し、空白や句読点のみからなるセグメントを除外します</p></td>
     <td><p>タイ語またはタイ語と英語が混在するテキスト向けのカスタムアナライザパイプライン</p></td>
     <td><ul><li><p>入力：<code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>出力：<code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">日本語および韓国語</h5><table>
   <tr>
     <th><p>言語</p></th>
     <th><p>トークナイザー</p></th>
     <th><p>辞書オプション</p></th>
     <th><p>最適用途</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p>日本語</p></td>
     <td><p><a href="/docs/ja/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a>（汎用）、<a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a>（現代用語）、<a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a>（学術用語）</p></td>
     <td><p>固有名詞の処理を伴う形態素解析</p></td>
     <td><ul><li><p>入力:<code translate="no">"東京都渋谷区"</code></p></li><li><p>出力:<code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>韓国語</p></td>
     <td><p><a href="/docs/ja/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>韓国語の形態素解析</p></td>
     <td><ul><li><p>入力:<code translate="no">"안녕하세요"</code></p></li><li><p>出力:<code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">多言語または不明な言語</h4><p>文書内で言語が予測不能、または混在しているコンテンツの場合：</p>
<table>
   <tr>
     <th><p>トークナイザー</p></th>
     <th><p>仕組み</p></th>
     <th><p>最適な用途</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Unicode対応のトークン化（International Components for Unicode）</p></td>
     <td><p>複数の文字体系が混在する場合、言語が不明な場合、または単純なトークン化で十分な場合</p></td>
     <td><ul><li><p>入力：<code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>出力：<code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>icu を使用すべき場合</strong>:</p>
<ul>
<li><p>言語の識別が現実的でない混合言語の場合。</p></li>
<li><p><a href="/docs/ja/multi-language-analyzers.md">多言語アナライザや</a> <a href="/docs/ja/language-identifier.md">言語識別子の</a>オーバーヘッドを避けたい場合。</p></li>
<li><p>コンテンツには主要な言語があり、全体的な意味にほとんど影響を与えない外来語が散見される場合（例：英語のテキストに、日本語やフランス語のブランド名や専門用語が散見される場合）。</p></li>
</ul>
<p><strong>代替アプローチ</strong>:多言語コンテンツをより正確に処理するには、多言語アナライザや言語識別子の使用を検討してください。詳細については、「<a href="/docs/ja/multi-language-analyzers.md">多言語アナライザ</a>」または「<a href="/docs/ja/language-identifier.md">言語識別子</a>」を参照してください。</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">ステップ 2: 精度を高めるためのフィルターを追加する<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">トークナイザーを選択</a>したら、具体的な検索要件やコンテンツの特性に基づいてフィルターを適用します。</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">よく使用されるフィルター</h4><p>これらのフィルターは、スペース区切りの言語設定（英語、フランス語、ドイツ語、スペイン語など）のほとんどにおいて不可欠であり、検索品質を大幅に向上させます：</p>
<table>
   <tr>
     <th><p>フィルター</p></th>
     <th><p>仕組み</p></th>
     <th><p>使用すべき場面</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>すべてのトークンを小文字に変換する</p></td>
     <td><p>汎用 - 大文字と小文字が区別されるすべての言語に適用されます</p></td>
     <td><ul><li><p>入力：<code translate="no">["Apple", "iPhone"]</code></p></li><li><p>出力:<code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>単語を語幹形に還元する</p></td>
     <td><p>語形変化のある言語（英語、フランス語、ドイツ語など）</p></td>
     <td><p>英語の場合：</p><ul><li><p>入力:<code translate="no">["running", "runs", "ran"]</code></p></li><li><p>出力:<code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>意味のない一般的な単語を除去する</p></td>
     <td><p>ほとんどの言語 ― 特にスペース区切り形式の言語で効果的</p></td>
     <td><ul><li><p>入力:<code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>出力:<code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>東アジア言語（中国語、日本語、韓国語など）については、代わりに<a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">言語固有のフィルタに</a>重点を置いてください。これらの言語では通常、テキスト処理に異なるアプローチが採用されており、ステミングによる効果はそれほど期待できません。</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">テキスト正規化フィルター</h4><p>これらのフィルターは、テキストのバリエーションを標準化し、マッチングの一貫性を向上させます：</p>
<table>
   <tr>
     <th><p>フィルター</p></th>
     <th><p>仕組み</p></th>
     <th><p>使用すべき場面</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>アクセント付き文字をASCII相当の文字に変換する</p></td>
     <td><p>国際的なコンテンツ、ユーザー生成コンテンツ</p></td>
     <td><ul><li><p>入力：<code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>出力:<code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">トークンのフィルタリング</h4><p>文字の内容や長さに基づいて、どのトークンを保持するかを制御する:</p>
<table>
   <tr>
     <th><p>フィルタ</p></th>
     <th><p>仕組み</p></th>
     <th><p>使用場面</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>単独の句読点トークンを削除する</p></td>
     <td><p><code translate="no">jieba</code> 、<code translate="no">lindera</code> 、<code translate="no">icu</code> 各トークナイザーの出力をクリーンアップします。これらのトークナイザーは、句読点を単一のトークンとして返します</p></td>
     <td><ul><li><p>入力:<code translate="no">["Hello", "!", "world"]</code></p></li><li><p>出力:<code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>文字と数字のみを残す</p></td>
     <td><p>技術的な内容、クリーンなテキスト処理</p></td>
     <td><ul><li><p>入力:<code translate="no">["user123", "test@email.com"]</code></p></li><li><p>出力:<code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>指定された長さの範囲外のトークンを削除する</p></td>
     <td><p>ノイズ（過度に長いトークン）をフィルタリングする</p></td>
     <td><ul><li><p>入力:<code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>出力:<code translate="no">[['a'], ['very'], []]</code> （<strong>max=10</strong>の場合）</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>カスタムパターンに基づくフィルタリング</p></td>
     <td><p>ドメイン固有のトークン要件</p></td>
     <td><ul><li><p>入力:<code translate="no">["test123", "prod456"]</code></p></li><li><p>出力:<code translate="no">[[], ['prod456']]</code> (<strong>expr="^prod"</strong> の場合)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">言語固有のフィルタ</h4><p>これらのフィルタは、特定の言語の特性を処理します:</p>
<table>
   <tr>
     <th><p>フィルタ</p></th>
     <th><p>言語</p></th>
     <th><p>動作原理</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>ドイツ語</p></td>
     <td><p>複合語を検索可能な構成要素に分割します</p></td>
     <td><ul><li><p>入力:<code translate="no">["dampfschifffahrt"]</code></p></li><li><p>出力:<code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>中国語</p></td>
     <td><p>漢字と英数字のみを保持する</p></td>
     <td><ul><li><p>入力:<code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>出力:<code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>中国語</p></td>
     <td><p>漢字のみを残す</p></td>
     <td><ul><li><p>入力:<code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>出力:<code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>中国語</p></td>
     <td><p>中国語のトークンに対してピンインのトークン形式を出力する</p></td>
     <td><ul><li><p>入力:<code translate="no">["中文"]</code></p></li><li><p>出力:<code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">ステップ3: 結合と実装<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>カスタムアナライザーを作成するには、<code translate="no">analyzer_params</code> 辞書内でトークナイザーとフィルタのリストを定義します。フィルタはリストされた順序で適用されます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">最終段階：以下のコマンドでテストします<code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションに適用する前に、必ず設定を検証してください:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>確認すべき一般的な問題:</p>
<ul>
<li><p><strong>過剰なトークン化</strong>：専門用語が誤って分割されている</p></li>
<li><p><strong>トークン化不足</strong>：フレーズが適切に分割されていない</p></li>
<li><p><strong>トークンの欠落</strong>：重要な用語が除外されている</p></li>
</ul>
<p>詳細な使用方法については、<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>を参照してください。</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">ユースケース別の推奨設定<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、Milvusでアナライザーを使用する際の一般的なユースケースに対する、推奨されるトークナイザーおよびフィルターの設定について説明します。コンテンツの種類や検索要件に最も適した組み合わせを選択してください。</p>
<div class="alert note">
<p>コレクションにアナライザーを適用する前に、 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> を使用して、テキスト分析のパフォーマンスをテストおよび検証することをお勧めします。</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">アクセント記号のある言語（フランス語、スペイン語、ドイツ語など）<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">standard</code> トークナイザーを使用し、小文字変換、言語固有のステミング、およびストップワードの除去を設定してください。この設定は、<code translate="no">language</code> および<code translate="no">stop_words</code> パラメータを変更することで、他のヨーロッパ言語にも適用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">英語のコンテンツ<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>包括的なフィルタリングを伴う英語テキストの処理には、組み込みの <a href="/docs/ja/english-analyzer.md"><code translate="no">english</code></a> アナライザーを使用することも可能です：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">中国語コンテンツ<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">jieba</code> トークナイザーを使用し、文字フィルターを適用して、漢字、ラテン文字、および数字のみを残します。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>簡体字中国語の場合、<code translate="no">cnalphanumonly</code> は漢字、英数字、および数字以外のすべてのトークンを削除します。これにより、句読点が検索品質に影響を与えるのを防ぎます。</p>
</div>
<p>ユーザーがピンインを入力して中国語のテキストを検索する可能性がある場合は、組み込みの<code translate="no">jieba</code> アナライザーの代わりに、 トークナイザーと <a href="/docs/ja/pinyin-filter.md"><code translate="no">pinyin</code></a><code translate="no">chinese</code> フィルターを備えたカスタムアナライザーを使用してください。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">日本語コンテンツ<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">lindera</code> トークナイザーを日本語辞書およびフィルターと組み合わせて使用し、句読点を除去してトークンの長さを制御します:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">韓国語コンテンツ<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>日本語と同様に、韓国語辞書とフィルターを備えた<code translate="no">lindera</code> トークナイザーを使用します：</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">混合言語または多言語コンテンツ<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>複数の言語にまたがるコンテンツや、文字体系が予測不能なコンテンツを扱う場合は、まず<code translate="no">icu</code> アナライザーから始めてください。このUnicode対応のアナライザーは、混在する文字体系や記号を効果的に処理します。</p>
<p><strong>基本的な多言語設定（ステミングなし）</strong>：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>高度な多言語処理</strong>：</p>
<p>異なる言語間でのトークン化の挙動をより細かく制御するには：</p>
<ul>
<li><p><strong>多言語アナライザー</strong>の設定を使用してください。詳細については、「<a href="/docs/ja/multi-language-analyzers.md">多言語アナライザー</a>」を参照してください。</p></li>
<li><p>コンテンツに<strong>言語識別子</strong>を実装してください。詳細については、「<a href="/docs/ja/language-identifier.md">言語識別子</a>」を参照してください。</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">テキスト検索機能との連携<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>アナライザーを選択した後、Milvusが提供するテキスト検索機能と統合できます。</p>
<ul>
<li><p><strong>全文検索</strong></p>
<p>アナライザーは、スパースベクトルの生成を通じて、BM25ベースの全文検索に直接影響を与えます。一貫したトークン化を確保するため、インデックス作成とクエリ実行の両方で同じアナライザーを使用してください。一般的に、言語固有のアナライザーは、汎用的なアナライザーよりも優れたBM25スコアを提供します。実装の詳細については、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p></li>
<li><p><strong>テキストマッチ</strong></p>
<p>テキストマッチ操作は、アナライザーの出力を基に、クエリとインデックス化されたコンテンツの間でトークンの完全一致検索を行います。実装の詳細については、<a href="/docs/ja/keyword-match.md">「テキストマッチ</a>」を参照してください。</p></li>
<li><p><strong>フレーズ一致</strong></p>
<p>フレーズ一致では、フレーズの境界と意味を維持するために、複数語からなる表現全体で一貫したトークン化が必要です。実装の詳細については、「<a href="/docs/ja/phrase-match.md">フレーズ一致</a>」を参照してください。</p></li>
</ul>
