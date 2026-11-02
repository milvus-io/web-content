---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Milvus Standalone을 설치하기 전에 필요한 준비 사항을 확인하세요.
title: Milvus Standalone 설치 요구 사항
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Milvus Standalone 설치 요구 사항<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Standalone 인스턴스를 설치하기 전에 하드웨어 및 소프트웨어가 요구 사항을 충족하는지 확인하십시오.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">하드웨어 요구 사항<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>구성 요소</th><th>요구 사항</th><th>권장 사항</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>인텔 2세대 코어 CPU 이상</li><li>Apple Silicon</li></ul></td><td><ul><li>단독: 4코어 이상</li><li>클러스터: 8코어 이상</li></ul></td><td></td></tr>
<tr><td>CPU 명령어 세트</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 내에서 벡터 유사도 검색 및 인덱스 생성을 수행하려면 CPU가 단일 명령어 다중 데이터(SIMD) 확장 세트를 지원해야 합니다. CPU가 나열된 SIMD 확장 중 적어도 하나를 지원하는지 확인하십시오. 자세한 내용은 <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVX를 지원하는 CPU를</a> 참조하십시오.</td></tr>
<tr><td>RAM</td><td><ul><li>단독 시스템: 8G</li><li>클러스터: 32G</li></ul></td><td><ul><li>단독 시스템: 16G</li><li>클러스터: 128G</li></ul></td><td>RAM 용량은 데이터 양에 따라 달라집니다.</td></tr>
<tr><td>하드 드라이브</td><td>SATA 3.0 SSD 이상</td><td>NVMe SSD 이상</td><td>하드 드라이브의 용량은 데이터 양에 따라 다릅니다.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">소프트웨어 요구 사항<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<tr><th>운영 체제</th><th>소프트웨어</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>Docker Desktop에서 지원하는 macOS</td><td>Docker Desktop</td><td>Docker 가상 머신(VM)에 최소 8GB의 메모리를 할당하고, 위의 하드웨어 권장 사항에 따라 CPU 크기를 조정하십시오. <br/>자세한 내용은 <a href="https://docs.docker.com/desktop/setup/install/mac-install/">Mac에 Docker Desktop 설치하기를</a> 참조하십시오.</td></tr>
<tr><td>Linux 플랫폼</td><td><ul><li>Docker 19.03 이상</li><li>Docker Compose 플러그인 V2 이상(Compose 배포용)</li></ul></td><td>자세한 내용은 <a href="https://docs.docker.com/engine/install/">Docker Engine 설치</a> 및 <a href="https://docs.docker.com/compose/install/">Docker Compose 설치를</a> 참조하십시오.</td></tr>
<tr><td>WSL 2가 활성화된 Windows</td><td>Docker Desktop</td><td>소스 코드 및 Linux 컨테이너에 바인드 마운트된 기타 데이터는 Windows 파일 시스템이 아닌 Linux 파일 시스템에 저장하는 것이 좋습니다.<br/>자세한 내용은 <a href="https://docs.docker.com/desktop/features/wsl/">'WSL 2 백엔드를 사용하는 Windows에 Docker Desktop 설치'를</a> 참조하십시오.</td></tr>
</tbody>
</table>
<p>Compose 가이드에서는 구형 <code translate="no">docker-compose</code> V1 명령어가 아닌 <code translate="no">docker compose</code> 를 사용합니다. 가이드를 따르기 전에 플러그인을 확인하십시오:</p>
<pre><code translate="no" class="language-bash">docker compose version
<button class="copy-code-btn"></button></code></pre>
<p>설치 방법에 따라 종속성이 제공되는 방식이 결정됩니다. 다운로드한 스크립트나 Compose 파일에 고정된 이미지 버전을 사용하십시오:</p>
<table>
<thead>
<tr><th>구성 요소</th><th>Docker 스크립트</th><th>Docker Compose</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>Milvus 컨테이너에 내장됨</td><td>별도의 컨테이너; <a href="#Additional-disk-requirements">추가 디스크 요구 사항을</a> 참조하십시오.</td></tr>
<tr><td>오브젝트 스토리지</td><td>로컬 파일 시스템; MinIO 컨테이너 없음</td><td>Compose 파일에 이미지가 고정된 MinIO 컨테이너</td></tr>
<tr><td>Woodpecker</td><td>Milvus와 번들로 제공됨; 로컬 파일 시스템 WAL 백엔드</td><td>Milvus와 번들로 제공됨; MinIO/객체 스토리지 WAL 백엔드</td></tr>
<tr><td>Pulsar</td><td>선택적 외부 서비스; 기본적으로 설치되지 않음</td><td>선택적 외부 서비스; 기본적으로 설치되지 않음</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">추가 디스크 요구 사항<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>디스크 성능은 etcd에 매우 중요합니다. 로컬 NVMe SSD를 사용하는 것이 강력히 권장됩니다. 디스크 응답 속도가 느리면 클러스터 선거가 빈번하게 발생하여 결국 etcd 서비스 성능이 저하될 수 있습니다.</p>
<p>디스크가 요구 사항을 충족하는지 테스트하려면 <a href="https://github.com/axboe/fio">fio를</a> 사용하십시오.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>이상적으로는 etcd 전용 디스크가 500 IOPS 이상을 달성하고, 99번째 백분위수 fsync 지연 시간이 10ms 미만이어야 합니다. 더 자세한 요구 사항은 etcd <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">문서를</a> 참조하십시오.</p>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>하드웨어 및 소프트웨어가 위의 요구 사항을 충족한다면, 다음 단계를 진행할 수 있습니다.</p>
<ul>
<li><a href="/docs/ko/install_standalone-docker.md">Docker에서 Milvus 실행</a></li>
<li><a href="/docs/ko/install_standalone-docker-compose.md">Docker Compose를 사용하여 Milvus 실행</a></li>
</ul>
