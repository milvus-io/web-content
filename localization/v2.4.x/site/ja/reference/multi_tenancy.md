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
    </button></h1><p>ChatGPTの普及に伴い、CVP(ChatGPT, Vector Database, Prompt)スタックを利用して独自のSaaSサービスを作る開発者が増えています。本ガイドでは、このトレンドに対応するため、世界で最も広く利用されているベクターデータベースの一つであるMilvusでマルチテナントを実現する方法を解説します。</p>
<p>マルチテナントとは、1つのMilvusインスタンスが複数のテナントにサービスを提供するアーキテクチャです。テナントを区別する最も簡単な方法は、テナントのデータとリソースを他のテナントから分離することです。各テナントは、データベース、コレクション、パーティションなどのMilvusオブジェクトを管理するために、それぞれ専用のリソースを持つか、他のテナントとリソースを共有します。これらのオブジェクトに基づいて、Milvusのマルチテナントを実現するための対応する方法があります。</p>
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
    </button></h2><p>Milvusバージョン2.2.9からオブジェクトデータベースが利用できるようになりました。一つのMilvusクラスタに複数のデータベースを作成することができます。この新機能により、各テナントにデータベースを割り当てることで、データベース指向のマルチテナントを実現し、各テナントが独自のコレクションやパーティションを作成してデータを最大限に活用できるようになります。ただし、この戦略ではテナントのデータ分離と検索パフォーマンスは確保されるが、アイドル状態のテナントではリソースが無駄になる可能性がある。</p>
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
    </button></h2><p>コレクション指向のマルチテナントを実現するには、2つの方法が考えられます。</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">すべてのテナントに1つのコレクション</h3><p>テナントを区別するためにテナントフィールドを追加することによって、1つのコレクションを使用してマルチテナントを実装することは簡単なオプションです。特定のテナントに対してANN検索を行う場合、フィルタ式を追加して、他のテナントに属するすべてのエンティティをフィルタリングします。これは、マルチテナントを実現する最も簡単な方法です。ただし、フィルタのパフォーマンスがANN検索のボトルネックになる可能性があることに注意してください。</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">テナントごとに1つのコレクション</h3><p>もう1つの方法は、すべてのテナントのデータを1つのコレクションに格納するのではなく、テナントごとに独自のデータを格納するコレクションを作成することです。これにより、データの分離とクエリのパフォーマンスが向上します。ただし、このアプローチではリソースのスケジューリング、運用能力、コストへの投資が必要となり、テナントの数が単一のMilvusクラスタがサポートするコレクションの最大数を超える場合は適用できない可能性があることに留意してください。</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">パーティション指向マルチテナント<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティション指向のマルチテナンシーを実現するには、2つの方法が考えられます：</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">テナントごとに1つのパーティション</h3><p>単一のコレクションを管理することは、複数のコレクションを管理するよりもはるかに簡単です。複数のコレクションを作成する代わりに、テナントごとにパーティションを割り当てて、柔軟なデータ分離とメモリ管理を実現することを検討してください。パーティション指向のマルチテナントの検索パフォーマンスは、コレクション指向のマルチテナントよりもはるかに優れています。ただし、コレクションのテナントの数は、コレクションが保持できるパーティションの最大数を超えてはならないことに注意してください。</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">パーティションキーベースのマルチテナンシー</h3><p>Milvus 2.2.9ではパーティションキーという新機能が導入されました。コレクションの作成時に、テナントフィールドを指定し、それをパーティションキーフィールドにします。Milvusはパーティション・キー・フィールドの値に従って、エンティティをパーティションに格納する。ANN検索を行う際、Milvusは指定されたパーティション・キーに基づくパーティションに変更し、パーティション・キーに従ってエンティティをフィルタリングし、フィルタリングされたエンティティ間で検索を行う。</p>
</div>
<p>この戦略により、Milvusコレクションがサポートできる最大テナント数の制限が解除され、Milvusが自動的にパーティションを管理するため、リソース管理が大幅に簡素化されます。</p>
<p>要約すると、上記のマルチテナント戦略のいずれかまたはいくつかを使用して、独自のソリューションを形成することができます。以下の表は、データ分離、検索パフォーマンス、最大テナント数の観点からこれらの戦略を比較したものです。</p>
<table>
<thead>
<tr><th></th><th>データ分離</th><th>検索パフォーマンス</th><th>最大テナント数</th><th>推奨シナリオ</th></tr>
</thead>
<tbody>
<tr><td>データベース指向</td><td>強い</td><td>強い</td><td>64</td><td>プロジェクトによって異なるコレクションが必要な場合、特に組織内の部署間でデータを分離するのに適しています。</td></tr>
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
    </button></h2><p><a href="/docs/ja/v2.4.x/manage_databases.md">データベース・</a><a href="/docs/ja/v2.4.x/schema.md">スキーマの</a><a href="/docs/ja/v2.4.x/manage_databases.md">管理</a></p>
