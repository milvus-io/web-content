---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: Milvus를 설치하기 전에 필요한 준비 사항을 Docker Compose로 알아보세요.
title: Docker Compose로 Milvus를 설치하기 위한 요구 사항
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">Docker Compose로 Milvus를 설치하기 위한 요구 사항<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 인스턴스를 설치하기 전에 하드웨어와 소프트웨어가 요구 사항을 충족하는지 확인하세요.</p>
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
<tr><td>CPU</td><td><ul><li>인텔 2세대 코어 CPU 이상</li><li>Apple 실리콘</li></ul></td><td><ul><li>독립형: 4코어 이상</li><li>클러스터: 8코어 이상</li></ul></td><td></td></tr>
<tr><td>CPU 명령어 세트</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 내에서 벡터 유사성 검색 및 인덱스 구축을 위해서는 CPU가 단일 명령어, 다중 데이터(SIMD) 확장 세트를 지원해야 합니다. CPU가 나열된 SIMD 확장 중 하나 이상을 지원하는지 확인하세요. 자세한 내용은 <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVX를 지원하는 CPU를</a> 참조하세요.</td></tr>
<tr><td>RAM</td><td><ul><li>독립형: 8G</li><li>클러스터: 32G</li></ul></td><td><ul><li>독립형: 16G</li><li>클러스터 128G</li></ul></td><td>RAM 크기는 데이터 볼륨에 따라 다릅니다.</td></tr>
<tr><td>하드 드라이브</td><td>SATA 3.0 SSD 이상</td><td>NVMe SSD 이상</td><td>하드 드라이브의 크기는 데이터 용량에 따라 다릅니다.</td></tr>
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
<tr><td>macOS 10.14 이상</td><td>Docker 데스크톱</td><td>최소 2개의 가상 CPU(vCPU)와 8GB의 초기 메모리를 사용하도록 Docker 가상 머신(VM)을 설정하세요. 그렇지 않으면 설치에 실패할 수 있습니다. <br/>자세한 내용은 <a href="https://docs.docker.com/desktop/mac/install/">Mac에 도커 데스크톱 설치하기를</a> 참조하세요.</td></tr>
<tr><td>Linux 플랫폼</td><td><ul><li>Docker 19.03 이상</li><li>Docker Compose 1.25.1 이상</li></ul></td><td>자세한 내용은 <a href="https://docs.docker.com/engine/install/">도커 엔진 설치</a> 및 <a href="https://docs.docker.com/compose/install/">도커 컴포즈 설치를</a> 참조하세요.</td></tr>
<tr><td>WSL 2가 활성화된 Windows</td><td>Docker 데스크톱</td><td>소스 코드 및 Linux 컨테이너에 바인드 마운트된 기타 데이터는 Windows 파일 시스템 대신 Linux 파일 시스템에 저장하는 것이 좋습니다.<br/>자세한 내용은 <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">WSL 2 백엔드가 있는 Windows에 Docker Desktop 설치를</a> 참조하세요.</td></tr>
</tbody>
</table>
<p>다음 종속성은 Docker 스크립트 또는 Docker Compose 구성을 사용하여 Milvus Standalone을 설치할 때 자동으로 가져와 구성됩니다:</p>
<table>
<thead>
<tr><th>소프트웨어</th><th>버전</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td><a href="#Additional-disk-requirements">추가 디스크 요구 사항을</a> 참조하세요.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">추가 디스크 요구 사항</h3><p>디스크 성능은 etcd에 매우 중요합니다. 로컬 NVMe SSD를 사용할 것을 적극 권장합니다. 디스크 응답 속도가 느리면 클러스터 선출이 자주 발생하여 결국 etcd 서비스가 저하될 수 있습니다.</p>
<p>디스크가 적격한지 테스트하려면 <a href="https://github.com/axboe/fio">fio를</a> 사용하세요.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>이상적으로는 디스크가 500 IOPS 이상이고 99번째 백분위수 fsync 지연 시간이 10ms 미만이어야 합니다. 자세한 요구 사항은 etcd <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">문서를</a> 참조하세요.</p>
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
    </button></h2><p>하드웨어 및 소프트웨어가 위의 요구 사항을 충족하는 경우 다음을 수행할 수 있습니다.</p>
<ul>
<li><a href="/docs/ko/v2.4.x/install_standalone-docker.md">Docker에서 Milvus 실행</a></li>
<li><a href="/docs/ko/v2.4.x/install_standalone-docker-compose.md">Docker Compose로 Milvus 실행하기</a></li>
</ul>
