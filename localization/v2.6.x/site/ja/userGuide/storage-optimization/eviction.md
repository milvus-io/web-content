---
id: eviction.md
title: 立ち退きCompatible with Milvus 2.6.4+
summary: >-
  EvictionはMilvusの各QueryNodeのキャッシュリソースを管理します。有効にすると、リソースのしきい値に達すると自動的にキャッシュされたデータを削除し、安定したパフォーマンスを確保し、メモリやディスクの枯渇を防ぎます。
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">立ち退き<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>EvictionはMilvusの各QueryNodeのキャッシュリソースを管理します。有効にすると、リソースのしきい値に達すると自動的にキャッシュされたデータを削除し、安定したパフォーマンスを確保し、メモリやディスクの枯渇を防ぎます。</p>
<p>Evictionは<a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">Least Recently Used (LRU)</a>ポリシーを使用してキャッシュ領域を再利用します。メタデータは常にキャッシュされ、退避されることはありません。なぜなら、メタデータはクエリ計画に不可欠であり、通常は小さいからです。</p>
<div class="alert note">
<p>退避は明示的に有効にする必要があります。設定を行わないと、キャッシュされたデータはリソースが枯渇するまで蓄積され続けます。</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">立ち退きタイプ<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは2つの補完的な立ち退きモード<strong>（syncと</strong> <strong>async</strong>）をサポートしており、最適なリソース管理のために連携します：</p>
<table>
   <tr>
     <th><p>アスペクト</p></th>
     <th><p>同期立ち退き</p></th>
     <th><p>非同期立ち退き</p></th>
   </tr>
   <tr>
     <td><p>トリガー</p></td>
     <td><p>クエリまたは検索中にメモリ/ディスク使用量が内部制限を超えた場合。</p></td>
     <td><p>バックグラウンド・スレッドが定期的に使用量をチェックし、上限を超えた場合に退避をトリガする。</p></td>
   </tr>
   <tr>
     <td><p>動作</p></td>
     <td><p>キャッシュが再生成される間、クエリの実行は一時停止する。使用量が低いウォーターマークを下回るまで退避が継続される。</p></td>
     <td><p>使用量がハイ・ウォーターマークを超えると、ロー・ウォーターマーク以下になるまでデータを削除する。クエリーはブロックされない。</p></td>
   </tr>
   <tr>
     <td><p>最適な用途</p></td>
     <td><p>短時間のレイテンシ・スパイクに耐えられるワークロード、または非同期エビクションでは十分な速さで領域を回復できないワークロード。</p></td>
     <td><p>スムーズなパフォーマンスを必要とするレイテンシに敏感なワークロード。プロアクティブなリソース管理に最適。</p></td>
   </tr>
   <tr>
     <td><p>注意事項</p></td>
     <td><p>進行中のクエリに待ち時間を追加します。再利用可能なデータが不十分な場合、タイムアウトを引き起こす可能性があります。</p></td>
     <td><p>適切に調整されたウォーターマークが必要。バックグラウンドリソースのオーバーヘッドが若干発生する。</p></td>
   </tr>
   <tr>
     <td><p>設定</p></td>
     <td><p>設定方法<code translate="no">evictionEnabled: true</code></p></td>
     <td><p><code translate="no">backgroundEvictionEnabled: true</code> 経由で有効 (<code translate="no">evictionEnabled: true</code> が必要)</p></td>
   </tr>
</table>
<p><strong>推奨設定</strong>：</p>
<p>最適なバランスを保つために両方のモードを有効にする。非同期evictionはキャッシュの使用量を積極的に管理し、同期evictionはリソースが枯渇しそうになったときに安全なフォールバックとして機能する。</p>
<div class="alert note">
<p>evictableフィールドとevictableインデックスについては、evictionの単位がロードの粒度と一致します。スカラー/ベクターフィールドはチャンク単位でevictionされ、スカラー/ベクターインデックスはセグメント単位でevictionされます。</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">evictionの有効化<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">milvus.yaml</code> の<code translate="no">queryNode.segcore.tieredStorage</code> の下でevictionを構成する：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>タイプ</p></th>
     <th><p>値</p></th>
     <th><p>説明</p></th>
     <th><p>推奨使用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>ブール</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>立ち退き戦略のマスター・スイッチ。デフォルトは<code translate="no">false</code> 。 同期立ち退きモードを有効にします。</p></td>
     <td><p>Tiered Storageでは常に<code translate="no">true</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>ブール</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>バックグラウンドで非同期に立ち退きを実行します。<code translate="no">evictionEnabled: true</code> が必要です。デフォルトは<code translate="no">false</code> です。</p></td>
     <td><p>よりスムーズなクエリ・パフォーマンスを得るには<code translate="no">true</code> 。</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">透かしの設定<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>ウォーターマークは、メモリとディスクの両方について、キャッシュ退避の開始と終了のタイミングを定義します。各リソース・タイプには2つのしきい値があります：</p>
<ul>
<li><p><strong>高いウォーターマーク</strong>：使用量がこの値を超えると非同期エビクションが開始されます。</p></li>
<li><p><strong>低ウォーターマーク</strong>：使用量がこの値を下回るまで退避を継続する。</p></li>
</ul>
<div class="alert note">
<p>この構成は、<a href="/docs/ja/eviction.md#Enable-eviction">evictionが有効になっている</a>場合にのみ有効になります。</p>
</div>
<p><strong>YAMLの例</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>タイプ</p></th>
     <th><p>範囲</p></th>
     <th><p>説明</p></th>
     <th><p>推奨される使用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>フロート</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>退去が停止するメモリ使用量レベル。</p></td>
     <td><p><code translate="no">0.75</code> から開始します。QueryNodeのメモリが制限されている場合は少し下げてください。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>非同期evictionが開始するメモリ使用量レベル。</p></td>
     <td><p><code translate="no">0.8</code> で開始。頻繁なトリガーを防ぐために、低いウォーターマークから適切な間隔（例えば、0.05-0.10）を保つ。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>フロート</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>立ち退きを停止するディスク使用量レベル。</p></td>
     <td><p><code translate="no">0.75</code> から開始する。ディスクI/Oが制限されている場合は低く調整する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>フロート</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>非同期退避が開始するディスク使用量レベル。</p></td>
     <td><p><code translate="no">0.8</code> で開始。頻繁なトリガーを防ぐために、低いウォーターマークから適度な間隔（例えば0.05-0.10）を保つ。</p></td>
   </tr>
</table>
<p><strong>ベストプラクティス</strong>：</p>
<ul>
<li><p>QueryNodeの静的使用やクエリ時間のバーストに対して余裕を残すため、ウォーターマークの高低を~0.80以上に設定しない。</p></li>
<li><p>ハイウォーターマークとローウォーターマークの間に大きなギャップを作らないようにする。大きなギャップは各退去サイクルを長引かせ、待ち時間を増やす可能性がある。</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">キャッシュTTLの設定<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>キャッシュTTL（Time-to-Live）は</strong>、リソースのしきい値に達していなくても、設定された期間の後にキャッシュされたデータを自動的に削除します。これは、LRU消去と一緒に機能し、古いデータがキャッシュを無制限に占有するのを防ぎます。</p>
<div class="alert note">
<p>キャッシュ TTL は同じバックグラウンドスレッドで実行されるので、<code translate="no">backgroundEvictionEnabled: true</code> を必要とします。</p>
</div>
<p><strong>YAMLの例</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>タイプ</p></th>
     <th><p>単位</p></th>
     <th><p>説明</p></th>
     <th><p>推奨される使用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>整数</p></td>
     <td><p>秒</p></td>
     <td><p>キャッシュされたデータが期限切れになるまでの時間。期限切れのアイテムはバックグラウンドで削除されます。</p></td>
     <td><p>非常に動的なデータには短い TTL (数時間) を使用し、 安定したデータセットには長い TTL (数日) を使用します。時間ベースの有効期限を無効にするには0を設定します。</p></td>
   </tr>
</table>
<h2 id="Configure-overcommit-ratio" class="common-anchor-header">オーバーコミット率の設定<button data-href="#Configure-overcommit-ratio" class="anchor-icon" translate="no">
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
    </button></h2><p>オーバーコミット比率は、キャッシュのどれだけの部分を退避可能として予約するかを定義し、QueryNodeが一時的に通常の容量を超過しても、退避が強化されるようにします。</p>
<div class="alert note">
<p>この設定は、<a href="/docs/ja/eviction.md#Enable-eviction">evictionが有効な</a>場合にのみ有効です。</p>
</div>
<p><strong>YAMLの例</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Evictable Memory Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of physical memory is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-comment"># Evictable Disk Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of disk capacity is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>タイプ</p></th>
     <th><p>範囲</p></th>
     <th><p>説明</p></th>
     <th><p>推奨される使用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictableMemoryCacheRatio</code></p></td>
     <td><p>フロート</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>メモリキャッシュのうち退避可能なデータ用に割り当てられた部分。</p></td>
     <td><p><code translate="no">0.3</code> から開始。低い消去頻度の場合は (0.5-0.7) 増加させ、高いセグメント容量の場合は (0.1-0.2) 減少させる。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">evictableDiskCacheRatio</code></p></td>
     <td><p>フロート</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>ディスクキャッシュのうち、消去可能なデータに割り当てられる部分。</p></td>
     <td><p>ディスクI/Oがボトルネックにならない限り、メモリと同様の比率を使用する。</p></td>
   </tr>
</table>
<p><strong>境界動作</strong>：</p>
<ul>
<li><p><code translate="no">1.0</code>:すべてのキャッシュが退避可能。退避がトリガーされることはほとんどないが、QueryNodeごとに適合するセグメントは少なくなる。</p></li>
<li><p><code translate="no">0.0</code>:キャッシュを退避させない - 頻繁に退避させる。</p></li>
</ul>
