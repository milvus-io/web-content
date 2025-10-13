---
id: choose-the-right-analyzer-for-your-use-case.md
title: ユースケースに適した分析装置の選択
summary: 備考
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">ユースケースに適した分析装置の選択<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>このガイドでは、アナライザを選択する際の実践的な意思決定に重点を置いています。アナライザーのコンポーネントやアナライザーパラメーターの追加方法に関する技術的な詳細については、<a href="/docs/ja/analyzer-overview.md">アナライザーの概要を</a>参照してください。</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">2分でわかる分析装置<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、アナライザーはこのフィールドに格納されたテキストを処理し、<a href="/docs/ja/full-text-search.md">全文検索</a>(BM25)、<a href="/docs/ja/phrase-match.md">フレーズ一致</a>、<a href="/docs/ja/keyword-match.md">テキスト一致などの</a>機能で検索できるようにします。生のコンテンツを検索可能なトークンに変換するテキストプロセッサとお考えください。</p>
<p>アナライザーは、シンプルな2段階のパイプラインで動作します：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>アナライザーのワークフロー</span> </span></p>
<ol>
<li><p><strong>トークン化（必須）：</strong> <strong>トー</strong>クン化（必須）：この最初の段階では、<strong>トークン化ツールを</strong>使用して、連続したテキスト文字列をトークンと呼ばれる意味のある個別の単位に分割します。トークン化の方法は、言語やコンテンツの種類によって大きく異なります。</p></li>
<li><p><strong>トークンのフィルタリング（オプション）：</strong>トークン化の後、<strong>フィルタを</strong>適用してトークンを変更、削除、洗練します。この処理には、すべてのトークンを小文字に変換する処理、一般的な無意味な単語 (ストップワードなど) を削除する処理、単語を語源の形に減らす処理 (ステミング) などがあります。</p></li>
</ol>
<p><strong>例</strong></p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">解析器の選択が重要な理由<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>解析器の選択を誤ると、関連文書が検索不能になったり、無関係な結果が返されたりすることがあります。</p>
<p>次の表は、不適切なアナライザーの選択によって発生する一般的な問題をまとめたもので、検索に関する問題を診断するための実用的な解決策を提供しています。</p>
<table>
   <tr>
     <th><p>問題点</p></th>
     <th><p>症状</p></th>
     <th><p>例（入力と出力）</p></th>
     <th><p>原因 (不適切なアナライザー)</p></th>
     <th><p>解決策（良いアナライザー）</p></th>
   </tr>
   <tr>
     <td><p>過剰なトークン化</p></td>
     <td><p>専門用語、識別子、URLのテキストクエリで関連文書が見つからない。</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> →<code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> →<code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ja/standard-analyzer.md"><code translate="no">standard</code></a>アナライザー</p></td>
     <td><p>トークン <a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>トークン化器を使う。 <a href="/docs/ja/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a>フィルタと組み合わせる。</p></td>
   </tr>
   <tr>
     <td><p>トークン不足</p></td>
     <td><p>複数単語のフレーズの構成要素を検索しても、完全なフレーズを含む文書を返すことができない。</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> →<code translate="no">['state-of-the-art']</code></p></td>
     <td><p>アナライザと <a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>トークン化器</p></td>
     <td><p>句読点やスペースを <a href="/docs/ja/standard-tokenizer.md"><code translate="no">standard</code></a><a href="/docs/ja/regex-filter.md">トークナイザーを使って</a>句読点やスペースで分割する。</p></td>
   </tr>
   <tr>
     <td><p>言語のミスマッチ</p></td>
     <td><p>特定の言語の検索結果が無意味または存在しない。</p></td>
     <td><p>中国語テキスト： <code translate="no">"机器学习"</code> →<code translate="no">['机器学习']</code> (1トークン)</p></td>
     <td><p><a href="/docs/ja/english-analyzer.md"><code translate="no">english</code></a>アナライザー</p></td>
     <td><p>以下のような、言語固有のアナライザーを使用してください。 <a href="/docs/ja/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">最初の質問解析器を選ぶ必要があるのか？<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>多くの場合、特別なことをする必要はありません。あなたがその一人であるかどうかを判断してみましょう。</p>
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
    </button></h3><p>全文検索のようなテキスト検索機能を使用する際にアナライザーを指定しない場合、Milvusは自動的に <a href="/docs/ja/standard-analyzer.md"><code translate="no">standard</code></a>アナライザを使用します。</p>
<p><code translate="no">standard</code> ：</p>
<ul>
<li><p>スペースと句読点でテキストを分割</p></li>
<li><p>すべてのトークンを小文字に変換します。</p></li>
<li><p>一般的な英語のストップワードとほとんどの句読点を除去します。</p></li>
</ul>
<p><strong>変換の例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">判定基準：クイックチェック<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>この表を使って、デフォルトの<code translate="no">standard</code> アナライザーがあなたのニーズを満たすかどうかをすばやく判断してください。適合しない場合は、別のパスを選択する必要があります。</p>
<table>
   <tr>
     <th><p>コンテンツ</p></th>
     <th><p>標準アナライザーでOK？</p></th>
     <th><p>なぜ</p></th>
     <th><p>必要なもの</p></th>
   </tr>
   <tr>
     <td><p>英語のブログ記事</p></td>
     <td><p>はい</p></td>
     <td><p>デフォルトの動作で十分。</p></td>
     <td><p>デフォルトを使う(設定不要)。</p></td>
   </tr>
   <tr>
     <td><p>中国語の文書</p></td>
     <td><p>いいえ</p></td>
     <td><p>中国語の単語にはスペースがなく、1つのトークンとして扱われます。</p></td>
     <td><p>組み込みの <a href="/docs/ja/chinese-analyzer.md"><code translate="no">chinese</code></a>アナライザを使います。</p></td>
   </tr>
   <tr>
     <td><p>技術文書</p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">C++</code> のような用語からは句読点が取り除かれます。</p></td>
     <td><p>トークナイザーと <a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>トークン化器と <a href="/docs/ja/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a>フィルタを持つカスタム解析器を作成します。</p></td>
   </tr>
   <tr>
     <td><p>フランス語/スペイン語テキストなど、スペースで区切られた言語</p></td>
     <td><p>⚠️ たぶん</p></td>
     <td><p>アクセント記号付き文字 (<code translate="no">café</code> vs.<code translate="no">cafe</code>) は一致しない場合があります。</p></td>
     <td><p>を使ったカスタム解析器を使うことをお勧めします。 <a href="/docs/ja/ascii-folding-filter.md"><code translate="no">asciifolding</code></a>を使ったカスタムアナライザをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p>多言語または未知の言語</p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">standard</code> アナライザには、異なる文字セットとトークン化ルールを処理するために必要な、言語固有のロジックがありません。</p></td>
     <td><p>カスタム解析器と <a href="/docs/ja/icu-tokenizer.md"><code translate="no">icu</code></a>を使用してください。 </p><p>あるいは、<a href="/docs/ja/multi-language-analyzers.md">多言語</a>コンテンツをより正確に処理するために、<a href="/docs/ja/multi-language-analyzers.md">多言語アナライザ</a>または<a href="/docs/ja/language-identifier.md">言語識別子を</a>設定することを検討してください。</p></td>
   </tr>
</table>
<p>デフォルトの<code translate="no">standard</code> アナライザーが要件を満たせない場合は、別のアナライザーを実装する必要があります。2つの方法があります：</p>
<ul>
<li><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">組み込みのアナライザーを使用</a>するか</p></li>
<li><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">カスタム解析器を作成する。</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">パスA：組み込みアナライザーを使用する<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>ビルトイン解析器は、一般的な言語用にあらかじめ設定されたソリューションです。デフォルトの標準アナライザーが完璧にフィットしない場合に、最も簡単に使い始めることができます。</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">利用可能なビルトイン・アナライザー<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
     <th><p>アナライザー</p></th>
     <th><p>対応言語</p></th>
     <th><p>コンポーネント</p></th>
     <th><p>備考</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>スペースで区切られたほとんどの言語（英語、フランス語、ドイツ語、スペイン語など）</p></td>
     <td><ul><li><p>トーケナイザー<code translate="no">standard</code></p></li><li><p>フィルタ：<code translate="no">lowercase</code></p></li></ul></td>
     <td><p>初期テキスト処理用の汎用解析器。単言語シナリオでは、言語固有のアナライザ (<code translate="no">english</code> など) の方が優れたパフォーマンスを発揮します。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>英語専用。英語のセマンティックマッチングを向上させるため、ステミングとストップワード除去を適用。</p></td>
     <td><ul><li><p>トーケナイザー：<code translate="no">standard</code></p></li><li><p>フィルター：<code translate="no">lowercase</code> <code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> 以上の英語のみのコンテンツに推奨。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>中国語</p></td>
     <td><ul><li><p>トーケナイザー：<code translate="no">jieba</code></p></li><li><p>フィルタ：<code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>現在、デフォルトで簡体字中国語辞書を使用。</p></td>
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
    </button></h3><p>組み込みの解析器を使用するには、フィールド・スキーマを定義する際に<code translate="no">analyzer_params</code> でそのタイプを指定するだけです。</p>
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
<p>詳細な使用方法については、<a href="/docs/ja/full-text-search.md">全文検索</a>、<a href="/docs/ja/keyword-match.md">テキスト一致</a>、<a href="/docs/ja/phrase-match.md">フレーズ一致を</a>参照してください。</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">パスB：カスタム・アナライザーを作成する<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">組み込みのオプションでは</a>ニーズに合わない場合は、トークナイザーとフィルター・セットを組み合わせてカスタム・アナライザーを作成することができます。これにより、テキスト処理パイプラインを完全に制御できるようになります。</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">ステップ 1: 言語に基づくトークナイザーの選択<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>コンテンツの主要言語に基づいてトークナイザを選択します：</p>
<h4 id="Western-languages" class="common-anchor-header">欧米言語</h4><p>スペースで区切られた言語の場合、以下のオプションがあります：</p>
<table>
   <tr>
     <th><p>トークナイザー</p></th>
     <th><p>機能</p></th>
     <th><p>最適</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>スペースと句読点に基づいてテキストを分割する</p></td>
     <td><p>一般的なテキスト、句読点の混在</p></td>
     <td><ul><li><p>入力<code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>出力<code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>空白文字のみで分割</p></td>
     <td><p>事前処理されたコンテンツ、ユーザーフォーマットされたテキスト</p></td>
     <td><ul><li><p>入力<code translate="no">"user_id = get_user_data()"</code></p></li><li><p>出力<code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">東アジア言語</h4><p>辞書ベースの言語では、適切な単語分割のために専用のトークナイザーが必要です：</p>
<h5 id="Chinese" class="common-anchor-header">中国語</h5><table>
   <tr>
     <th><p>トーケナイザー</p></th>
     <th><p>仕組み</p></th>
     <th><p>最適</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>インテリジェントアルゴリズムによる中国語辞書ベースのセグメンテーション</p></td>
     <td><p><strong>中国語コンテンツに推奨</strong>- 中国語用に特別に設計されたインテリジェントアルゴリズムと辞書の組み合わせ</p></td>
     <td><ul><li><p>入力<code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>出力<code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>中国語辞書を用いた純粋な辞書ベースの形態素解析<a href="https://cc-cedict.org/wiki/">（cc-cedict）</a></p></td>
     <td><p><code translate="no">jieba</code> と比較して、より一般的な方法で中国語テキストを処理する。</p></td>
     <td><ul><li><p>入力：<code translate="no">"机器学习算法"</code></p></li><li><p>出力：<code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">日本語と韓国語</h5><table>
   <tr>
     <th><p>言語</p></th>
     <th><p>トーケナイザー</p></th>
     <th><p>辞書オプション</p></th>
     <th><p>最適</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p>日本語</p></td>
     <td><p><a href="/docs/ja/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a>(汎用),<a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a>(現代用語),<a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a>(学術)</p></td>
     <td><p>固有名詞を扱う形態素解析</p></td>
     <td><ul><li><p>入力<code translate="no">"東京都渋谷区"</code></p></li><li><p>出力<code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>韓国語</p></td>
     <td><p><a href="/docs/ja/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>韓国語の形態素解析</p></td>
     <td><ul><li><p>入力<code translate="no">"안녕하세요"</code></p></li><li><p>出力<code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">多言語または未知の言語</h4><p>文書内で言語が予測できない、または混在しているコンテンツ向け：</p>
<table>
   <tr>
     <th><p>トーケナイザー</p></th>
     <th><p>仕組み</p></th>
     <th><p>対象</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Unicodeを意識したトークン化（International Components for Unicode）</p></td>
     <td><p>混合スクリプト、未知の言語、または単純なトークン化で十分な場合</p></td>
     <td><ul><li><p>入力<code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>出力：<code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>icuを使用する場合</strong>：</p>
<ul>
<li><p>言語識別が現実的でない混合言語。</p></li>
<li><p><a href="/docs/ja/multi-language-analyzers.md">多言語解析の</a>オーバーヘッドや<a href="/docs/ja/language-identifier.md">言語識別子を</a>必要としない場合。</p></li>
<li><p>コンテンツに主要言語があり、全体的な意味にはほとんど寄与しない外国語が時折含まれる場合（例えば、日本語やフランス語のブランド名や専門用語が散見される英語のテキスト）。</p></li>
</ul>
<p><strong>別のアプローチ</strong>：多言語コンテンツをより正確に扱うには、多言語アナライザまたは言語識別子の使用を検討してください。詳細については、<a href="/docs/ja/multi-language-analyzers.md">多言語アナライザ</a>または<a href="/docs/ja/language-identifier.md">言語識別子を</a>参照してください。</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">ステップ 2: 精度を高めるフィルタの追加<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">使用するトークナイザを選択</a>したら、検索要件とコンテンツの特性に基づいてフィルタを適用します。</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">よく使用されるフィルター</h4><p>これらのフィルタは、スペースで区切られたほとんどの言語設定（英語、フランス語、ドイツ語、スペイン語など）に不可欠であり、検索品質を大幅に向上させます：</p>
<table>
   <tr>
     <th><p>フィルター</p></th>
     <th><p>使用方法</p></th>
     <th><p>使用時期</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>すべてのトークンを小文字に変換</p></td>
     <td><p>ユニバーサル - 大文字小文字の区別があるすべての言語に適用されます。</p></td>
     <td><ul><li><p>入力<code translate="no">["Apple", "iPhone"]</code></p></li><li><p>出力<code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>単語を原形に戻す</p></td>
     <td><p>単語の屈折がある言語（英語、フランス語、ドイツ語など）</p></td>
     <td><p>英語の場合</p><ul><li><p>入力<code translate="no">["running", "runs", "ran"]</code></p></li><li><p>出力：<code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>一般的な無意味な単語を取り除く</p></td>
     <td><p>ほとんどの言語 - 特にスペースで区切られた言語に効果的</p></td>
     <td><ul><li><p>入力<code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>出力：<code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>東アジアの言語 (中国語、日本語、韓国語など) の場合は、代わりに<a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">言語固有のフィルターに</a>注目します。これらの言語では通常、テキスト処理に異なるアプローチが使用されるため、ステミングの効果が大 きく得られない場合があります。</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">テキスト正規化フィルター</h4><p>これらのフィルタは、テキストのバリエーションを標準化して、マッチングの一貫性を向上させます：</p>
<table>
   <tr>
     <th><p>フィルター</p></th>
     <th><p>機能</p></th>
     <th><p>使用時期</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>アクセント記号付き文字をASCII等価文字に変換する</p></td>
     <td><p>国際的なコンテンツ、ユーザーが作成したコンテンツ</p></td>
     <td><ul><li><p>入力<code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>出力<code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">トークンのフィルタリング</h4><p>文字の内容や長さに基づいて、保存するトークンを制御します：</p>
<table>
   <tr>
     <th><p>フィルター</p></th>
     <th><p>どのように機能するか</p></th>
     <th><p>いつ使うか</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>単体の句読点トークンを削除する</p></td>
     <td><p><code translate="no">jieba</code>,<code translate="no">lindera</code>,<code translate="no">icu</code> のトークナイザーからの出力をクリーンにする。これらのトークナイザーは句読点を単独のトークンとして返す。</p></td>
     <td><ul><li><p>入力<code translate="no">["Hello", "!", "world"]</code></p></li><li><p>出力：<code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>文字と数字だけを残す</p></td>
     <td><p>技術コンテンツ、クリーンなテキスト処理</p></td>
     <td><ul><li><p>入力<code translate="no">["user123", "test@email.com"]</code></p></li><li><p>出力：<code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>指定された長さの範囲外のトークンを除去</p></td>
     <td><p>ノイズ（過度に長いトークン）の除去</p></td>
     <td><ul><li><p>入力<code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>出力 <code translate="no">[['a'], ['very'], []]</code> (<strong>max=10 の</strong>場合)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>カスタムパターンベースのフィルタリング</p></td>
     <td><p>ドメイン固有のトークン要件</p></td>
     <td><ul><li><p>入力<code translate="no">["test123", "prod456"]</code></p></li><li><p>出力： <code translate="no">[[], ['prod456']]</code> (<strong>expr="^prod "</strong>の場合)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">言語固有のフィルタ</h4><p>これらのフィルタは特定の言語特性を扱います：</p>
<table>
   <tr>
     <th><p>フィルタ</p></th>
     <th><p>言語</p></th>
     <th><p>仕組み</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>ドイツ語</p></td>
     <td><p>複合語を検索可能な要素に分割する</p></td>
     <td><ul><li><p>入力<code translate="no">["dampfschifffahrt"]</code></p></li><li><p>出力<code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/cnalphanumonly-filter.md">スウェーデン語</a></p></td>
     <td><p>中国語</p></td>
     <td><p>漢字＋英数字を保持</p></td>
     <td><ul><li><p>入力<code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>出力<code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>中国語</p></td>
     <td><p>漢字のみを保持</p></td>
     <td><ul><li><p>入力<code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>出力<code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">ステップ3：結合と実装<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>カスタム分析器を作成するには、<code translate="no">analyzer_params</code> 辞書でトークナイザーとフィルターのリストを定義します。フィルターはリストされた順に適用されます。</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">最後にでテストします。<code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションに適用する前に、必ず設定を検証してください：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>チェックすべき一般的な問題</p>
<ul>
<li><p><strong>過剰なトークン化</strong>：専門用語が誤って分割されている</p></li>
<li><p><strong>トークン不足</strong>：フレーズが正しく分割されていない</p></li>
<li><p><strong>トークンの欠落</strong>：重要な用語が除外される</p></li>
</ul>
<p>詳細な使用方法については、<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzerを</a>参照してください。</p>
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
    </button></h2><p>このセクションでは、Milvusでアナライザーを使用する際の一般的なユースケース別に、推奨されるトークナイザーとフィルターの設定をご紹介します。コンテンツの種類と検索要件に最適な組み合わせを選択してください。</p>
<div class="alert note">
<p>アナライザをコレクションに適用する前に <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a>を使用して、テキスト分析のパフォーマンスをテストおよび検証することをお勧めします。</p>
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
    </button></h3><p>小文字変換、言語固有のステミング、ストップワード除去を備えた<code translate="no">standard</code> トー クナイザを使用します。この構成は、<code translate="no">language</code> および<code translate="no">stop_words</code> パラメータを変更することで、他のヨーロッパ言語でも機能します。</p>
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
<h3 id="English-content" class="common-anchor-header">英語コンテンツ<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>包括的なフィルタリングを伴う英語テキスト処理用。内蔵の <a href="/docs/ja/english-analyzer.md"><code translate="no">english</code></a>アナライザーも使用できます：</p>
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
    </button></h3><p><code translate="no">jieba</code> トークナイザを使用し、文字フィルタを適用して、中国語文字、ラテン文字、数字のみを保持します。</p>
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
<p>簡体字中国語の場合、<code translate="no">cnalphanumonly</code> は、漢字、英数字、数字以外のすべてのトークンを削除します。これにより、句読点が検索品質に影響するのを防ぐことができます。</p>
</div>
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
    </button></h3><p><code translate="no">lindera</code> のトークナイザーと日本語辞書およびフィルタを使用して、句読点を除去し、トークンの長さを制御します：</p>
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
    </button></h3><p>日本語と同様に、<code translate="no">lindera</code> トークナイザーと韓国語辞書を使用します：</p>
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
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">混合または多言語コンテンツ<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>複数の言語にまたがるコンテンツや、予測不可能なスクリプトを使用するコンテンツを扱う場合は、<code translate="no">icu</code> アナライザから始めましょう。この Unicode 対応アナライザは、混在するスクリプトや記号を効果的に処理します。</p>
<p><strong>基本的な多言語設定 (ステミングなし)：</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>高度な多言語処理</strong>：</p>
<p>高度な多言語処理: 異なる言語間でのトークンの動作をより適切に制御します：</p>
<ul>
<li><p><strong>多言語アナライザ</strong>設定を使用します。詳細については、「<a href="/docs/ja/multi-language-analyzers.md">多言語アナライザ</a>」を参照してください。</p></li>
<li><p>コンテンツに<strong>言語識別子を</strong>実装する。詳細については、<a href="/docs/ja/language-identifier.md">言語識別子を</a>参照してください。</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">テキスト検索機能との統合<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>アナライザーを選択した後、Milvusが提供するテキスト検索機能と統合することができます。</p>
<ul>
<li><p><strong>全文検索</strong></p>
<p>アナライザはスパースベクトル生成を通じてBM25ベースの全文検索に直接影響を与えます。一貫したトークン化を保証するために、インデックス作成とクエリの両方に同じアナライザを使用してください。言語固有のアナライザは、一般的に、汎用的なアナライザよりも優れた BM25 スコアリングを提供します。実装の詳細については、<a href="/docs/ja/full-text-search.md">全文検索を</a>参照してください。</p></li>
<li><p><strong>テキストマッチ</strong></p>
<p>テキストマッチ操作は、アナライザーの出力に基づき、クエリーとインデックスされたコンテンツの間で正確なトークンマッチングを行います。実装の詳細については、<a href="/docs/ja/keyword-match.md">テキストマッチを</a>参照してください。</p></li>
<li><p><strong>フレーズ一致</strong></p>
<p>フレーズ一致では、フレーズの境界と意味を維持するために、複数単語の表現間で一貫したトークン化が必要です。実装の詳細については、「<a href="/docs/ja/phrase-match.md">フレーズ・マッチ</a>」を参照してください。</p></li>
</ul>
