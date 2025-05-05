---
id: multi_tenancy.md
title: マルチテナントの実装
summary: >-
  Milvusにおけるマルチテナントとは、複数の顧客またはチーム（テナントと呼ばれる）が、分離されたデータ環境を維持しながら同じクラスタを共有することを意味する。
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">マルチテナントの実装<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusにおけるマルチテナントとは、複数の顧客またはチーム（<strong>テナントと</strong>呼ばれる）が、分離されたデータ環境を維持しながら同じクラスタを共有することを意味します。</p>
<p>Milvusは4つのマルチテナント戦略をサポートしており、それぞれスケーラビリティ、データ分離、柔軟性のトレードオフが異なります。このガイドでは、各オプションについて説明し、ユースケースに最適な戦略を選択できるようにします。</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">マルチテナント戦略<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは4つのレベルでマルチテナンシーをサポートしています：<strong>データベース</strong>、<strong>コレクション</strong>、<strong>パーティション</strong>、<strong>パーティションキー</strong>です。</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">データベースレベルのマルチテナンシー</h3><p>データベースレベルのマルチテナンシーでは、各テナントは1つまたは複数のコレクションを含む対応する<a href="/docs/ja/manage_databases.md">データベースを</a>受け取ります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>データベースレベルのマルチテナンシー</span> </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：データベースレベルのマルチテナント戦略は、デフォルトで最大64テナントをサポートします。</p></li>
<li><p><strong>データの分離</strong>：各データベースのデータは完全に分離されており、規制環境や厳格なコンプライアンスを必要とするお客様に理想的なエンタープライズグレードのデータ分離を提供します。</p></li>
<li><p><strong>柔軟性</strong>：各データベースは異なるスキーマのコレクションを持つことができるため、柔軟性の高いデータ編成が可能で、各テナントは独自のデータスキーマを持つことができます。</p></li>
<li><p><strong>その他</strong>このストラテジーはRBACにも対応しており、テナントごとのユーザーアクセスをきめ細かく制御できます。さらに、特定のテナントのデータを柔軟にロードまたはリリースして、ホットデータとコールドデータを効率的に管理できます。</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">コレクションレベルのマルチテナント</h3><p>コレクションレベルのマルチテナントでは、各テナントに<a href="/docs/ja/manage-collections.md">コレクションが</a>割り当てられるため、データを強力に分離できます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>コレクションレベルのマルチテナント</span> </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：クラスタはデフォルトで最大65,536のコレクションを保持できるため、この戦略ではクラスタ内で同じ数のテナントを収容できます。</p></li>
<li><p><strong>データの分離</strong>：コレクションは互いに物理的に分離されています。このストラテジーは強力なデータ分離を提供します。</p></li>
<li><p><strong>柔軟性</strong>：この戦略では、各コレクションが独自のスキーマを持つことができ、異なるデータスキーマを持つテナントに対応できます。</p></li>
<li><p><strong>その他</strong>このストラテジーはRBACにも対応しており、テナントに対するきめ細かなアクセス制御が可能です。さらに、ホットデータとコールドデータを効果的に管理するために、特定のテナントに対して柔軟にデータをロードまたはリリースできます。</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">パーティションレベルのマルチテナント</h3><p>パーティションレベルのマルチテナントでは、各テナントは共有コレクション内で手動で作成した<a href="/docs/ja/manage-partitions.md">パーティションに</a>割り当てられます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>パーティションレベルのマルチテナント</span> </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：コレクションごとに最大1,024のパーティションを保持でき、同じ数のテナントをコレクション内に配置できます。</p></li>
<li><p><strong>データの分離</strong>：各テナントのデータはパーティションによって物理的に分離されます。</p></li>
<li><p><strong>柔軟性</strong>：この戦略では、すべてのテナントが同じデータスキーマを共有する必要があります。また、パーティションは手動で作成する必要がある。</p></li>
<li><p><strong>その他</strong>パーティションレベルでのRBACはサポートされていない。テナントは個別に、または複数のパーティションにまたがってクエリを実行できるため、テナント・セグメントにまたがる集計クエリや分析を含むシナリオに適しています。さらに、特定のテナントのデータを柔軟にロードまたはリリースして、ホットデータとコールドデータを効率的に管理できます。</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">パーティションキーレベルのマルチテナント</h3><p>この戦略では、すべてのテナントが単一のコレクションとスキーマを共有しますが、各テナントのデータは<a href="/docs/ja/use-partition-key.md">パーティション・キーの</a>値に基づいて、物理的に分離された16のパーティションに自動的にルーティングされます。各物理パーティションには複数のテナントを含めることができますが、異なるテナントのデータは論理的に分離されたままです。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>パーティション・キー・レベルのマルチ・テナント</span> </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：パーティション・キー・レベルの戦略は、数百万テナントをサポートする最もスケーラブルなアプローチです。</p></li>
<li><p><strong>データの分離</strong>：複数のテナントが物理パーティションを共有できるため、データの分離は比較的弱い。</p></li>
<li><p><strong>柔軟性</strong>：すべてのテナントが同じデータスキーマを共有する必要があるため、この戦略ではデータの柔軟性が制限されます。</p></li>
<li><p><strong>その他</strong>パーティション・キー・レベルでのRBACはサポートされていません。テナントは個別または複数のパーティションにまたがってクエリを実行できるため、テナント・セグメントにまたがる集計クエリや分析を含むシナリオに適しています。</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">適切なマルチテナント戦略の選択<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表は、4つのレベルのマルチテナント戦略を包括的に比較したものです。</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>データベースレベル</strong></p></th>
     <th><p><strong>コレクションレベル</strong></p></th>
     <th><p><strong>パーティション・レベル</strong></p></th>
     <th><p><strong>パーティション・キー・レベル</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>データ分離</strong></p></td>
     <td><p>物理的</p></td>
     <td><p>物理的</p></td>
     <td><p>物理的</p></td>
     <td><p>物理+論理</p></td>
   </tr>
   <tr>
     <td><p><strong>最大テナント数</strong></p></td>
     <td><p>デフォルトでは64。Milvus.yaml設定ファイルの<code translate="no">maxDatabaseNum</code> パラメータを変更することで増やすことができます。 </p></td>
     <td><p>デフォルトでは65,536。Milvus.yaml設定ファイルの<code translate="no">maxCollectionNum</code> パラメータを変更することで増やすことができます。</p></td>
     <td><p>コレクションあたり最大1,024。 </p></td>
     <td><p>数百万</p></td>
   </tr>
   <tr>
     <td><p><strong>データスキーマの柔軟性</strong></p></td>
     <td><p>高</p></td>
     <td><p>中</p></td>
     <td><p>低い</p></td>
     <td><p>低い</p></td>
   </tr>
   <tr>
     <td><p><strong>RBACサポート</strong></p></td>
     <td><p>あり</p></td>
     <td><p>あり</p></td>
     <td><p>なし</p></td>
     <td><p>いいえ</p></td>
   </tr>
   <tr>
     <td><p><strong>検索パフォーマンス</strong></p></td>
     <td><p>強い</p></td>
     <td><p>強い</p></td>
     <td><p>中</p></td>
     <td><p>中</p></td>
   </tr>
   <tr>
     <td><p><strong>クロステナント検索サポート</strong></p></td>
     <td><p>なし</p></td>
     <td><p>なし</p></td>
     <td><p>あり</p></td>
     <td><p>あり</p></td>
   </tr>
   <tr>
     <td><p><strong>ホットデータとコールドデータの効果的な処理のサポート</strong></p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
     <td><p>現在、パーティション・キー・レベル戦略はサポートされていない。</p></td>
   </tr>
</table>
<p>Milvusのマルチテナント戦略を選択する際に考慮すべきいくつかの要素があります。</p>
<ol>
<li><p><strong>スケーラビリティ：</strong>パーティション・キー &gt; パーティション &gt; コレクション &gt; データベース</p>
<p>非常に多くのテナント（数百万以上）をサポートすることが予想される場合は、パーティション・キー・レベルの戦略を使用してください。</p></li>
<li><p><strong>強力なデータ分離要件</strong>：データベース = コレクション &gt; パーティション &gt; パーティション・キー</p>
<p>物理的なデータ分離要件が厳しい場合は、データベース、コレクション、またはパーティション・レベルのストラテジーを選択してください。</p></li>
<li><p><strong>各テナントのデータに対する柔軟なデータ・スキーマ：</strong>データベース &gt; コレクション &gt; パーティション = パーティション・キー</p>
<p>データベース・レベルとコレクション・レベルのストラテジーでは、データ・スキーマを完全に柔軟に変更できます。テナントのデータ構造が異なる場合は、データベースレベルまたはコレクションレベルのマルチテナントを選択してください。</p></li>
<li><p><strong>その他</strong></p>
<ol>
<li><p><strong>パフォーマンス：</strong>検索パフォーマンスは、インデックス、検索パラメータ、マシン構成など様々な要因によって決定されます。Milvusはパフォーマンスチューニングもサポートしています。マルチテナント戦略を選択する前に、実際のパフォーマンスをテストすることをお勧めします。</p></li>
<li><p><strong>ホットデータとコールドデータの効果的な処理</strong>現在、データベースレベル、コレクションレベル、パーティションレベルのストラテジーはすべてホットデータとコールドデータの取り扱いをサポートしています。</p></li>
<li><p><strong>クロステナント検索</strong>：パーティション・レベルとパーティション・キー・レベルのストラテジーのみが、クロステナント検索をサポートしています。</p></li>
</ol></li>
</ol>
