---
id: multi_tenancy.md
title: マルチテナント機能の実装
summary: >-
  Milvusにおけるマルチテナントとは、複数の顧客やチーム（テナントと呼ばれる）が、データを分離した環境を維持しつつ、同じクラスターを共有することを指します。
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">マルチテナント機能の実装<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusにおけるマルチテナントとは、複数の顧客やチーム（<strong>テナント</strong>と呼ばれる）が、データを分離した環境を維持しつつ、同じクラスターを共有することを指します。</p>
<p>Milvusは4つのマルチテナント戦略をサポートしており、それぞれがスケーラビリティ、データの分離、柔軟性の間で異なるトレードオフを提供します。このガイドでは、各オプションについて解説し、ユースケースに最適な戦略を選択できるよう支援します。</p>
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
    </button></h2><p>Milvusは、<strong>データベース</strong>、<strong>コレクション</strong>、<strong>パーティション</strong>、<strong>パーティションキー</strong>の4つのレベルでマルチテナント機能をサポートしています。</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">データベースレベルのマルチテナント<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>データベースレベルのマルチテナントでは、各テナントは1つ以上のコレクションを含む対応する<a href="/docs/ja/v2.6.x/manage_databases.md">データベース</a>を割り当てられます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>データベースレベルのマルチテナント</span>
  
 </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：データベースレベルのマルチテナント戦略は、デフォルトで最大64のテナントをサポートします。</p></li>
<li><p><strong>データの分離</strong>：各データベース内のデータは完全に分離されており、規制の厳しい環境や厳格なコンプライアンス要件を持つ顧客に最適な、エンタープライズグレードのデータ分離を実現します。</p></li>
<li><p><strong>柔軟性</strong>：各データベースには異なるスキーマを持つコレクションを含めることができ、非常に柔軟なデータ構成が可能であり、各テナントが独自のデータスキーマを持つことができます。</p></li>
<li><p><strong>その他</strong>：この戦略は RBAC もサポートしており、テナントごとのユーザーアクセスに対してきめ細かな制御が可能です。さらに、特定のテナントのデータを柔軟にロードまたは解放することで、ホットデータとコールドデータを効果的に管理できます。</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">コレクションレベルのマルチテナント<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションレベルのマルチテナントでは、各テナントに1つの<a href="/docs/ja/v2.6.x/manage-collections.md">コレクションが</a>割り当てられ、強力なデータ分離が実現されます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>コレクションレベルのマルチテナント</span>
  
 </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：クラスターはデフォルトで最大 65,536 のコレクションを保持できるため、この戦略ではクラスター内に同数のテナントを収容できます。</p></li>
<li><p><strong>データの分離</strong>：コレクションは互いに物理的に分離されています。この戦略により、強力なデータの分離が実現されます。</p></li>
<li><p><strong>柔軟性</strong>：この戦略では、各コレクションが独自のスキーマを持つことができるため、異なるデータスキーマを持つテナントに対応できます。</p></li>
<li><p><strong>その他</strong>：この戦略はRBACもサポートしており、テナントに対するきめ細かなアクセス制御が可能です。さらに、特定のテナントのデータを柔軟にロードまたは解放することで、ホットデータとコールドデータを効果的に管理できます。</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">パーティションレベルのマルチテナント<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>パーティションレベルのマルチテナントでは、各テナントは共有コレクション内で手動で作成された<a href="/docs/ja/v2.6.x/manage-partitions.md">パーティション</a>に割り当てられます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>パーティションレベルのマルチテナント</span>
  
 </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：1つのコレクションにつき最大1,024個のパーティションを保持できるため、その中に同数のテナントを収容できます。</p></li>
<li><p><strong>データの分離</strong>：各テナントのデータは、パーティションによって物理的に分離されます。</p></li>
<li><p><strong>柔軟性</strong>：この戦略では、すべてのテナントが同じデータスキーマを共有する必要があります。また、パーティションは手動で作成する必要があります。</p></li>
<li><p><strong>その他</strong>：パーティションレベルでは RBAC はサポートされていません。テナントは個別に、あるいは複数のパーティションにまたがってクエリを実行できるため、このアプローチは、テナントセグメントを横断した集計クエリや分析を伴うシナリオに最適です。さらに、特定のテナントのデータを柔軟にロードまたは解放することで、ホットデータとコールドデータを効果的に管理できます。</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">パーティションキーレベルのマルチテナント<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>この戦略では、すべてのテナントが単一のコレクションとスキーマを共有しますが、各テナントのデータは<a href="/docs/ja/v2.6.x/use-partition-key.md">パーティションキーの</a>値に基づいて、物理的に分離された16のパーティションに自動的にルーティングされます。各物理パーティションには複数のテナントが含まれる可能性がありますが、異なるテナントのデータは論理的に分離されたままです。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>パーティションキーレベルのマルチテナント</span>
  
 </span></p>
<ul>
<li><p><strong>スケーラビリティ</strong>：パーティションキーレベルの戦略は、数百万のテナントをサポートする最もスケーラブルなアプローチです。</p></li>
<li><p><strong>データ分離</strong>：複数のテナントが 1 つの物理パーティションを共有する可能性があるため、この戦略によるデータ分離は比較的弱くなります。</p></li>
<li><p><strong>柔軟性</strong>：すべてのテナントが同じデータスキーマを共有する必要があるため、この戦略ではデータの柔軟性が制限されます。</p></li>
<li><p><strong>その他</strong>：パーティションキーレベルでは RBAC はサポートされていません。テナントは個別に、あるいは複数のパーティションをまたいでクエリを実行できるため、このアプローチは、テナントセグメントを横断した集計クエリや分析を伴うシナリオに適しています。</p></li>
</ul>
<div class="alert note">
<p>パーティションキーフィールドにスカラーインデックスを作成することを推奨します。各物理パーティションには複数のテナントが含まれるため、Milvus は検索対象のパーティション内のすべてのエンティティに対してテナントフィルターを評価しますが、インデックスがない場合、これはフルスキャンとなります。詳細については、「<a href="/docs/ja/v2.6.x/use-partition-key.md#Index-Partition-Key">パーティションキーのインデックス作成</a>」を参照してください。</p>
</div>
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
     <th><p><strong>パーティションレベル</strong></p></th>
     <th><p><strong>パーティションキーレベル</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>データの分離</strong></p></td>
     <td><p>物理</p></td>
     <td><p>物理</p></td>
     <td><p>物理</p></td>
     <td><p>物理 + 論理</p></td>
   </tr>
   <tr>
     <td><p><strong>テナントの最大数</strong></p></td>
     <td><p>デフォルトでは 64 です。Milvus.yaml 設定ファイル内の `<code translate="no">maxDatabaseNum</code> ` パラメータを変更することで、この数を増やすことができます。 </p></td>
     <td><p>デフォルトは 65,536 です。Milvus.yaml 設定ファイルの<code translate="no">maxCollectionNum</code> パラメータを変更することで、この数を増やすことができます。</p></td>
     <td><p>コレクションあたり最大 1,024。 </p></td>
     <td><p>数百万</p></td>
   </tr>
   <tr>
     <td><p><strong>データスキーマの柔軟性</strong></p></td>
     <td><p>高い</p></td>
     <td><p>中</p></td>
     <td><p>低</p></td>
     <td><p>低</p></td>
   </tr>
   <tr>
     <td><p><strong>RBACのサポート</strong></p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
     <td><p>いいえ</p></td>
     <td><p>いいえ</p></td>
   </tr>
   <tr>
     <td><p><strong>検索パフォーマンス</strong></p></td>
     <td><p>高い</p></td>
     <td><p>高い</p></td>
     <td><p>中</p></td>
     <td><p>中</p></td>
   </tr>
   <tr>
     <td><p><strong>テナント間検索のサポート</strong></p></td>
     <td><p>いいえ</p></td>
     <td><p>いいえ</p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
   </tr>
   <tr>
     <td><p><strong>ホットデータとコールドデータの効果的な処理のサポート</strong></p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
     <td><p>はい</p></td>
     <td><p>いいえ現在、パーティションキーレベルの戦略ではサポートされていません。</p></td>
   </tr>
</table>
<p>Milvus でマルチテナント戦略を選択する際には、考慮すべき点がいくつかあります。</p>
<ol>
<li><p><strong>スケーラビリティ：</strong>パーティションキー &gt; パーティション &gt; コレクション &gt; データベース</p>
<p>非常に多くのテナント（数百万以上）をサポートする予定がある場合は、パーティションキーレベルの戦略を使用してください。</p></li>
<li><p><strong>厳格なデータ分離要件</strong>：データベース = コレクション &gt; パーティション &gt; パーティションキー</p>
<p>物理的なデータ分離の要件が厳しい場合は、データベース、コレクション、またはパーティションレベルの戦略を選択してください。</p></li>
<li><p><strong>各テナントのデータに対する柔軟なデータスキーマ：</strong>データベース &gt; コレクション &gt; パーティション = パーティションキー</p>
<p>データベースレベルおよびコレクションレベルの戦略では、データスキーマにおいて完全な柔軟性が確保されます。テナントごとのデータ構造が異なる場合は、データベースレベルまたはコレクションレベルのマルチテナントを選択してください。</p></li>
<li><p><strong>その他</strong></p>
<ol>
<li><p><strong>パフォーマンス：</strong>検索パフォーマンスは、インデックス、検索パラメータ、マシン構成など、さまざまな要因によって決まります。Milvusではパフォーマンスチューニングもサポートされています。マルチテナント戦略を選択する前に、実際のパフォーマンスをテストすることをお勧めします。</p></li>
<li><p><strong>ホットデータとコールドデータの効果的な処理</strong>：現在、データベースレベル、コレクションレベル、パーティションレベルの各戦略はすべて、ホットデータとコールドデータの処理に対応しています。</p></li>
<li><p><strong>テナント間検索</strong>：パーティションレベルおよびパーティションキーレベルの戦略のみが、テナント間クエリをサポートしています。</p></li>
</ol></li>
</ol>
