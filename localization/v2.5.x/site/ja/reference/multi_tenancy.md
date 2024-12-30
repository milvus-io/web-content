---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Milvusのマルチテナント。
title: マルチテナント戦略
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">マルチテナント戦略<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>多くのユースケースにおいて、開発者は1つのMilvusクラスタを運用し、数人の製品チームや数百万人のエンドユーザなど、複数のテナントにサービスを提供したいと考えています。このガイドでは、Milvusでマルチテナントを実現するためのいくつかの戦略について説明します。</p>
<p>Milvusはデータベース、コレクション、またはパーティションレベルでマルチテナンシーをサポートするように設計されています。マルチテナントの目的は、データとリソースを互いに分離することです。異なるレベルでマルチテナンシーを実装することにより、異なる分離の程度を達成することができますが、異なるオーバーヘッドも伴います。ここではそのトレードオフについて説明する。</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">データベース指向マルチテナンシー<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusバージョン2.2.9以降、1つのMilvusクラスタに複数のデータベースを作成することができるようになりました。この機能により、テナントごとにデータベースを割り当て、テナントごとにコレクションを作成することで、データベース指向のマルチテナントを実現することができます。このアプローチはテナントにとって最適なデータとリソースの分離を提供しますが、1クラスタに最大64データベースまでという制限があります。</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">コレクション指向のマルチテナント<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクション指向のマルチテナントを実現するには2つの方法が考えられます。</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">すべてのテナントに1つのコレクション</h3><p>テナントを区別するためにテナント・フィールドを追加することで、単一のコレクションを使用してマルチテナントを実装するのは簡単なオプションです。特定のテナントに対してANN検索を行う場合、フィルタ式を追加して、他のテナントに属するすべてのエンティティをフィルタリングします。これは、マルチテナントを実現する最も簡単な方法です。ただし、フィルタのパフォーマンスがANN検索のボトルネックになる可能性があることに注意してください。検索パフォーマンスを向上させるには、以下のパーティション指向のマルチテナントで最適化できます。</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">テナントごとに1つのコレクション</h3><p>すべてのテナントのデータを1つのコレクションに格納するのではなく、テナントごとにコレクションを作成してデータを格納する方法もあります。これにより、データの分離とクエリのパフォーマンスが向上します。ただし、このアプローチはスケジューリングに多くのリソースを必要とし、クラスタ内のコレクション数は最大でも10,000に制限されることに留意してください。</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">パーティション指向のマルチテナント<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティション指向のマルチテナンシーを実現するには2つの方法があります：</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">テナントごとに1つのパーティション</h3><p>1つのコレクションを管理するのは、複数のコレクションを管理するよりもはるかに簡単です。複数のコレクションを作成する代わりに、テナントごとにパーティションを割り当てて、柔軟なデータ分離とメモリ管理を実現することを検討してください。パーティション指向のマルチテナントの検索パフォーマンスは、コレクション指向のマルチテナントよりもはるかに優れています。ただし、コレクションのテナントの数は、コレクションが保持できるパーティションの最大数を超えてはならないことに注意してください。</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">パーティションキーベースのマルチテナンシー</h3><p>Milvus 2.2.9では、パーティションキーという新機能が導入されました。コレクションの作成時に、テナントフィールドを指定し、それをパーティションキーフィールドにします。Milvusはパーティションキーフィールドのハッシュ値に従って、パーティションにエンティティを格納する。ANN検索を行う際、Milvusはパーティションキーを含むパーティションのみを検索する。これにより、検索範囲が大幅に縮小されるため、パーティション・キーがない場合よりもパフォーマンスが向上する。</p>
</div>
<p>この戦略により、Milvusコレクションがサポートできる最大テナント数の制限が解除され、Milvusが自動的にパーティションを管理するため、リソース管理が大幅に簡素化されます。</p>
<p>まとめると、上記のマルチテナント戦略のいずれか、またはいくつかを使用して独自のソリューションを形成することができます。以下の表は、データ分離、検索パフォーマンス、最大テナント数の観点からこれらの戦略を比較したものです。</p>
<table>
<thead>
<tr><th></th><th>データ分離</th><th>検索パフォーマンス</th><th>最大テナント数</th><th>推奨シナリオ</th></tr>
</thead>
<tbody>
<tr><td>データベース指向</td><td>強い</td><td>強い</td><td>64</td><td>プロジェクトによってコレクションを変える必要がある場合、特に組織内の部署間でデータを分離するのに適しています。</td></tr>
<tr><td>すべてのコレクションに1つのコレクション</td><td>弱い</td><td>中</td><td>該当なし</td><td>リソースが限られており、データの分離に無頓着な場合。</td></tr>
<tr><td>テナントごとに1つのコレクション</td><td>強い</td><td>強い</td><td>10,000未満</td><td>クラスタあたりのテナント数が10,000未満の場合。</td></tr>
<tr><td>テナントごとに1パーティション</td><td>中</td><td>強い</td><td>4,096</td><td>コレクションあたりのテナント数が4,096未満の場合。</td></tr>
<tr><td>パーティションキーベース</td><td>中</td><td>強い</td><td>10,000,000+</td><td>数百万テナントの急激な増加が予測される場合。</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">次の課題<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ja/manage_databases.md">データベース・</a><a href="/docs/ja/schema.md">スキーマの</a><a href="/docs/ja/manage_databases.md">管理</a></p>
