---
id: language-identifier.md
title: 言語識別子Compatible with Milvus v2.5.15+
summary: >-
  language_identifierは、言語解析プロセスを自動化することで、Milvusのテキスト検索機能を強化するために設計された特殊なトークナイザーです。主な機能は、テキストフィールドの言語を検出し、その言語に最適な設定済みの解析器を動的に適用することです。これは、入力ごとに手動で言語を割り当てる必要がなくなるため、さまざまな言語を扱うアプリケーションで特に有用です。
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">言語識別子<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> は、言語解析プロセスを自動化することで、Milvusのテキスト検索機能を強化するために設計された専用のトークナイザーです。主な機能は、テキストフィールドの言語を検出し、その言語に最適な設定済みの解析器を動的に適用することです。これは、入力ごとに手動で言語を割り当てる必要がなくなるため、さまざまな言語を扱うアプリケーションで特に有用です。</p>
<p>テキストデータを適切な処理パイプラインにインテリジェントにルーティングすることで、<code translate="no">language_identifier</code> は、多言語データの取り込みを合理化し、その後の検索および取得操作のための正確なトークン化を保証します。</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">言語検出ワークフロー<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> は、テキスト文字列を処理するために一連のステップを実行します。このワークフローは、ユーザーが正しく設定する方法を理解する上で非常に重要です。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>言語検出ワークフロー</span> </span></p>
<ol>
<li><p><strong>入力：</strong>ワークフローは、テキスト文字列を入力として開始する。</p></li>
<li><p><strong>言語検出：</strong>この文字列はまず言語検出エンジンに渡され、言語の特定を試みる。milvusは<strong>whatlangと</strong> <strong>linguaの</strong>2つのエンジンをサポートしています。</p></li>
<li><p><strong>アナライザーの選択：</strong></p>
<ul>
<li><p><strong>成功：</strong>言語の検出に成功すると、検出された言語名に対応するアナライザが<code translate="no">analyzers</code> 辞書に設定されているかどうかがチェックされます。一致するアナライザが見つかると、指定したアナライザが入力テキストに適用されます。たとえば、"Mandarin" というテキストが検出されると、<code translate="no">jieba</code> のトークナイザにルーティングされます。</p></li>
<li><p><strong>フォールバック：</strong>検出が失敗した場合、または検出には成功したが特定のアナライザが指定されていない場合、システムは事前に設定された<strong>デフォルトのアナライザに</strong>デフォルト設定します。<code translate="no">default</code> アナライザーは、検出に失敗した場合にも、一致するアナライザーがない場合にも使用できます。</p></li>
</ul></li>
</ol>
<p>適切な解析器が選択されると、テキストがトークン化されて処理され、ワークフローが完了します。</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">利用可能な言語検出エンジン<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは2つの言語検出エンジンから選択することができます：</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>お客様のアプリケーションのパフォーマンスと精度の要件に応じてお選びいただけます。</p>
<table>
   <tr>
     <th><p>エンジン</p></th>
     <th><p>速度</p></th>
     <th><p>精度</p></th>
     <th><p>出力形式</p></th>
     <th><p>最適</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>速い</p></td>
     <td><p>ほとんどの言語に対応</p></td>
     <td><p>言語名 (例:<code translate="no">"English"</code>,<code translate="no">"Mandarin"</code>,<code translate="no">"Japanese"</code>)</p><p><strong>参照</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">対応言語表の言語欄</a></p></td>
     <td><p>速度が重要なリアルタイム・アプリケーション</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>遅い</p></td>
     <td><p>特に短いテキストでは高精度</p></td>
     <td><p>英語名 (例:<code translate="no">"English"</code>,<code translate="no">"Chinese"</code>,<code translate="no">"Japanese"</code>)</p><p><strong>参照：</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">サポート言語リスト</a></p></td>
     <td><p>速度よりも精度が重視される用途</p></td>
   </tr>
</table>
<p>重要な考慮点は、エンジンの命名規則です。どちらのエンジンも英語の言語名を返しますが、一部の言語では異なる用語を使用します（たとえば、<code translate="no">whatlang</code> は<code translate="no">Mandarin</code> を返し、<code translate="no">lingua</code> は<code translate="no">Chinese</code> を返します）。アナライザのキーは、選択した検出エンジンが返す名前と完全に一致する必要があります。</p>
<h2 id="Configuration" class="common-anchor-header">構成<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> トークナイザを正しく使用するには、次の手順で設定を定義し、適用する必要があります。</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">ステップ 1: 言語とアナライザの選択<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">language_identifier</code> の設定の核心は、サポートする予定の特定の言語に合わせてアナライザを調整することです。システムは、検出された言語と正しいアナライザをマッチングさせることで動作するため、このステップは正確なテキスト処理を行うために非常に重要です。</p>
<p>以下は、推奨される言語とMilvusアナライザーの対応表です。この表は言語検出エンジンの出力と最適なツールとの橋渡しをします。</p>
<table>
   <tr>
     <th><p>言語（検出出力）</p></th>
     <th><p>推奨アナライザー</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>ステミングとストップワードフィルタリングを含む標準的な英語のトークン化。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (whatlang 経由) または<code translate="no">Chinese</code> (lingua 経由)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>非スペース区切りのテキストに対する中国語の単語分割。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>日本語を含む複雑なスクリプト用のロバストなトークナイザー。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>,<code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>フランス語のアクセントや文字を処理するカスタム設定。</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>マッチングが鍵です：</strong>アナライザーの名前は、検出エンジンの言語出力と<strong>完全に一致する必要があります</strong>。たとえば、<code translate="no">whatlang</code> を使用する場合、中国語テキストのキーは<code translate="no">Mandarin</code> にする必要があります。</p></li>
<li><p><strong>ベスト・プラクティス：</strong>上の表は、いくつかの一般的な言語に対する推奨設定を示していますが、網羅的なリストではあ りません。アナライザーの選択に関するより包括的なガイドについては、「<a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md">ユースケースに適したアナライザーを選択する</a>」を参照してください。</p></li>
<li><p><strong>検出器の出力</strong>：検出エンジンが返す言語名の完全なリストは、<a href="https://github.com/greyblake/whatlang-rs">Whatlangサポート言語テーブルと</a> <a href="https://github.com/pemistahl/lingua-rs">Linguaサポート言語</a>リストを参照してください。</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">ステップ2： analyzer_paramsの定義<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusで<code translate="no">language_identifier</code> トークナイザーを使用するには、以下の主要コンポーネントを含む辞書を作成してください：</p>
<p><strong>必須コンポーネント</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config セット - すべての解析器設定を含む辞書：</p>
<ul>
<li><p><code translate="no">default</code> - 言語検出に失敗した場合、または一致する解析器が見つからない場合に使用されるフォールバック解析器。</p></li>
<li><p><strong>言語固有の解析器</strong>- それぞれ<code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> として定義されます：</p>
<ul>
<li><p><code translate="no">analyzer_name</code> 選択した検出エンジンの出力と一致する (例:<code translate="no">&quot;English&quot;</code>,<code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> 標準的なアナライザー・パラメーター・フォーマットに従う（<a href="/docs/ja/analyzer-overview.md#Analyzer-types">アナライザーの概要を</a>参照）。</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>オプションのコンポーネント：</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - 使用する言語検出エンジンを指定します (<code translate="no">whatlang</code> または<code translate="no">lingua</code>)。指定しない場合のデフォルトは<code translate="no">whatlang</code> です。</p></li>
<li><p><code translate="no">mapping</code> - アナライザ用のカスタムエイリアスを作成し、検出エンジンの正確な出力形式ではなく、説明的な名前を使用できるようにします。</p></li>
</ul>
<p>トークナイザは、まず入力テキストの言語を検出し、次に設定から適切なアナライザを選択します。検出が失敗した場合、または一致するアナライザが存在しない場合は、自動的に<code translate="no">default</code> アナライザにフォールバックします。</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">推奨名前の直接一致</h4><p>アナライザ名は、選択した言語検出エンジンの出力と正確に一致させる。この方法の方がシンプルで、潜在的な混乱を避けることができます。</p>
<p><code translate="no">whatlang</code> と<code translate="no">lingua</code> の両方について、それぞれのドキュメントに示されている言語名を使用してください：</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">whatlangがサポートしている言語</a>（<strong>"Language</strong>"列を使う）</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">linguaがサポートしている言語</a></p></li>
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
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">別のアプローチ：マッピングを使ったカスタム名</h4><p>カスタムの解析器名を使いたい場合や、既存の設定との互換性を保つ必要がある場合は、<code translate="no">mapping</code> 。このパラメータを使用すると、分析ツールのエイリアスが作成されます。</p>
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
<p><code translate="no">analyzer_params</code> を定義した後、コレクションスキーマを定義するときに、<code translate="no">VARCHAR</code> フィールドに適用できます。これにより、Milvusは指定した解析器を使用してフィールド内のテキストを処理し、効率的なトークン化とフィルタリングを行うことができます。詳細については、<a href="/docs/ja/analyzer-overview.md#Example-use">使用例を</a>参照してください。</p>
<h2 id="Examples" class="common-anchor-header">使用例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>ここでは、一般的なシナリオですぐに使用できる設定をいくつか紹介します。各例には設定と検証コードの両方が含まれているため、設定をすぐにテストできます。</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">英語と中国語の検出<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">アクセントを正規化したヨーロッパ言語<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
<h2 id="Usage-notes" class="common-anchor-header">使用上の注意<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>フィールドごとに単一言語：</strong>フィールドを1つの均質なテキスト単位として操作します。あるレコードには英語の文章が含まれ、次のレコードにはフランス語の文章が含まれるなど、異なるデータレコード間で異なる言語を扱うように設計されています。</p></li>
<li><p><strong>言語が混在した文字列は扱えない：</strong>複数の言語のテキストを含む単一の文字列を扱うようには設計されて<strong>いない</strong>。たとえば、英語の文章と引用符で囲まれた日本語のフレーズの両方を含む<code translate="no">VARCHAR</code> フィールドは、1 つの言語として処理されます。</p></li>
<li><p><strong>優勢言語処理：</strong>言語が混在するシナリオでは、検出エンジンが優勢な言語を識別し、対応するアナライザがテキスト全体に適用される可能性が高い。その結果、埋め込まれた外国語テキストのトークン化がうまくいかないか、まったく行われないことになります。</p></li>
</ul>
