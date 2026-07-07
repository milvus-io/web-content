---
id: object-storage.md
title: 오브젝트 스토리지
---
<h1 id="Object-Storage" class="common-anchor-header">오브젝트 스토리지<button data-href="#Object-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 데이터의 대부분을 차지하는 인덱스 파일과 바이너리 로그를 오브젝트 스토리지에 저장합니다. Milvus는 MinIO와 다양한 S3 호환 및 클라우드 오브젝트 스토리지를 지원합니다.</p>
<h2 id="Supported-object-storage" class="common-anchor-header">지원되는 오브젝트 스토리지<button data-href="#Supported-object-storage" class="anchor-icon" translate="no">
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
<tr><th>제공업체/서비스</th><th style="text-align:center">Milvus 오브젝트 스토리지로 지원</th></tr>
</thead>
<tbody>
<tr><td>MinIO</td><td style="text-align:center">✔️ (자체 호스팅 배포 시 기본값)</td></tr>
<tr><td>AWS S3</td><td style="text-align:center">✔️</td></tr>
<tr><td>Azure Blob Storage</td><td style="text-align:center">✔️</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td style="text-align:center">✔️</td></tr>
<tr><td>Aliyun OSS</td><td style="text-align:center">✔️</td></tr>
<tr><td>텐센트 COS</td><td style="text-align:center">✔️</td></tr>
<tr><td>화웨이 클라우드 OBS</td><td style="text-align:center">✔️</td></tr>
<tr><td>기타 S3 호환 스토리지</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>구성에 대한 자세한 내용은 <a href="/docs/ko/deploy_s3.md">‘Docker Compose 또는 Helm을 사용하여 오브젝트 스토리지 구성’</a> 및 <a href="/docs/ko/object_storage_operator.md">‘Milvus Operator를 사용하여 오브젝트 스토리지 구성’을</a> 참조하십시오.</p>
<h2 id="Additional-requirements-when-using-embedded-Woodpecker" class="common-anchor-header">임베디드 Woodpecker 사용 시 추가 요구 사항<button data-href="#Additional-requirements-when-using-embedded-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 <strong>Woodpecker</strong> 메시지 큐를 오브젝트 스토리지 백엔드(<code translate="no">storage.type=minio</code>)와 함께 실행할 경우, Woodpecker는 사전 기록 로그(write-ahead log)를 동일한 오브젝트 스토리지에 기록하며 <strong>엄격한 S3 조건부 쓰기(Conditional-Write) 세манти크를</strong> 요구합니다. 모든 오브젝트 스토리지 서비스가 이 요건을 충족하는 것은 아닙니다. 예를 들어, Huawei Cloud OBS는 일반 Milvus 오브젝트 스토리지로는 작동하지만, 현재 Woodpecker 백엔드로는 <strong>지원되지</strong> 않습니다.</p>
<p>제공업체별 정확한 요구 사항은 <a href="/docs/ko/woodpecker.md">Woodpecker</a> 페이지의 오브젝트 스토리지 호환성 매트릭스를 참조하십시오.</p>
