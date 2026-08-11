---
id: data-infra-integration-overview.md
title: 데이터 인프라
summary: 'Milvus에서 사용하는 메타데이터 스토리지, 오브젝트 스토리지 및 메시지 큐에 대한 개요.'
---
<h1 id="Data-Infrastructure" class="common-anchor-header">데이터 인프라<button data-href="#Data-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 핵심 데이터 인프라로 메타데이터 저장소, 오브젝트 스토리지 및 메시지 큐를 활용합니다. 이 장에서는 구성할 수 있는 구성 요소들을 다룹니다:</p>
<ul>
<li><strong><a href="/docs/ko/etcd.md">메타데이터</a></strong> — Milvus는 메타데이터(컬렉션 스키마, 노드 상태, 소비 체크포인트)를 etcd에 저장합니다.</li>
<li><strong><a href="/docs/ko/object-storage.md">오브젝트 스토리지</a></strong> — Milvus는 인덱스 파일과 바이너리 로그를 MinIO, AWS S3 또는 기타 S3 호환/클라우드 오브젝트 스토리지에 저장합니다.</li>
<li><strong><a href="/docs/ko/mqtype-overview.md">메시지 큐</a></strong> — Milvus는 WAL(Write-Ahead Log)인 Woodpecker(기본값), Pulsar, Kafka 또는 RocksMQ를 사용합니다.</li>
</ul>
<p>기본적으로 새로 배포된 Milvus 3.x는 메시지 큐로 <strong>Woodpecker</strong>, 메타데이터 저장소로 <strong>etcd</strong>, 오브젝트 스토리지로 <strong>MinIO를</strong> 사용하여 실행되며, 별도의 메시징 인프라가 필요하지 않습니다.</p>
