---
id: limitations.md
title: Milvus制限
related_key: Limitations
summary: Milvus使用中の制限について学ぶ。
---

<h1 id="Milvus-Limits" class="common-anchor-header">Milvusの限界<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、AIアプリケーションとベクトル類似性検索を強化するために、最高のベクトルデータベースを提供することをお約束します。しかしながら、Milvusチームはユーザーエクスペリエンスを向上させるため、より多くの機能と最適なユーティリティの導入に継続的に取り組んでいます。このページでは、Milvusを使用する際にユーザが遭遇する可能性のある既知の制限について説明します。</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">リソース名の長さ<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>リソース</th><th>制限</th></tr>
</thead>
<tbody>
<tr><td>コレクション</td><td>255文字</td></tr>
<tr><td>フィールド</td><td>255文字</td></tr>
<tr><td>インデックス</td><td>255文字</td></tr>
<tr><td>パーティション</td><td>255文字</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">命名規則<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>リソース名には数字、文字、アンダースコア(_)を含めることができます。リソース名は文字またはアンダースコア(_)で始まる必要があります。</p>
<h2 id="Number-of-resources" class="common-anchor-header">リソース数<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>リソース数</th><th>制限数</th></tr>
</thead>
<tbody>
<tr><td>コレクション数</td><td>65,536</td></tr>
<tr><td>接続/プロキシ</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">コレクション内のリソース数<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>リソース数</th><th>リミット</th></tr>
</thead>
<tbody>
<tr><td>パーティション</td><td>4,096</td></tr>
<tr><td>シャード</td><td>16</td></tr>
<tr><td>フィールド</td><td>64</td></tr>
<tr><td>インデックス</td><td>1</td></tr>
<tr><td>エンティティ</td><td>無制限</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">文字列の長さ<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>データ型</th><th>制限</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">ベクトルの次元<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>プロパティ</th><th>限界値</th></tr>
</thead>
<tbody>
<tr><td>次元数</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">RPCごとの入出力<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>動作</th><th>リミット</th></tr>
</thead>
<tbody>
<tr><td>挿入</td><td>64MBまで</td></tr>
<tr><td>検索</td><td>64 MB</td></tr>
<tr><td>クエリー</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">ロード制限<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>現在のリリースでは、実行エンジンのメモリリソースを確保するため、ロードするデータはすべてのクエリノードの総メモリリソースの90%以下でなければなりません。</p>
<h2 id="Search-limits" class="common-anchor-header">検索制限<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>ベクトル</th><th>制限</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (最も類似した結果を返す数）</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (検索リクエスト数）</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">異なる検索タイプにおけるインデックスの制限<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表は、異なるインデックス・タイプにおける様々な検索動作のサポートの概要を示している。</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>フラット</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_ブルートフォース</th><th>スパースインバーテッドインデックス</th><th>スパースワンド</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>基本検索</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>パーティション検索</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>生データ検索による基本検索</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>ページネーション付き基本検索</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>フィルタ検索</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>範囲検索</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td></tr>
<tr><td>グループ化検索</td><td>はい</td><td>いいえ</td><td>はい</td><td>はい</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td></tr>
<tr><td>イテレータによる検索</td><td>いいえ</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td></tr>
<tr><td>ハイブリッド検索</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい(RRFRankerのみ)</td><td>はい(RRFRankerのみ)</td><td>はい</td><td>はい</td></tr>
<tr><td>照会/取得</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>イテレータによるクエリ</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>はい</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>はい</td><td>はい</td></tr>
</tbody>
</table>
