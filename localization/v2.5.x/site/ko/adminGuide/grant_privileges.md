---
id: grant_privileges.md
title: 역할에 권한 또는 권한 그룹 부여하기
summary: 역할이 만들어지면 해당 역할에 권한을 부여할 수 있습니다. 이 가이드에서는 역할에 권한 또는 권한 그룹을 부여하는 방법을 소개합니다.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">역할에 권한 또는 권한 그룹 부여하기<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>역할이 만들어지면 해당 역할에 권한을 부여할 수 있습니다. 이 가이드에서는 역할에 권한 또는 권한 그룹을 부여하는 방법을 소개합니다.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">역할에 권한 또는 권한 그룹 부여하기<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5에서는 권한 부여 작업을 간소화하는 새로운 버전의 API가 도입되었습니다. 역할에 권한을 부여할 때 더 이상 개체 유형을 조회할 필요가 없습니다. 다음은 매개변수와 해당 설명입니다.</p>
<ul>
<li><p><strong>role_name:</strong> 권한 또는 권한 그룹을 부여해야 하는 대상 역할의 이름입니다.</p></li>
<li><p><strong>리소스</strong>: 특정 인스턴스, 데이터베이스 또는 컬렉션이 될 수 있는 권한의 대상 리소스입니다.</p></li>
</ul>
<p>다음 표에서는 <code translate="no">client.grantV2()</code> 메서드에서 리소스를 지정하는 방법을 설명합니다.</p>
<table>
   <tr>
     <th><p><strong>레벨</strong></p></th>
     <th><p><strong>리소스</strong></p></th>
     <th><p><strong>부여 방법</strong></p></th>
     <th><p><strong>참고</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>컬렉션</strong></p></td>
     <td><p>특정 컬렉션</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>대상 컬렉션의 이름과 대상 컬렉션이 속한 데이터베이스의 이름을 입력합니다.</p></td>
   </tr>
   <tr>
     <td><p>특정 데이터베이스 아래의 모든 컬렉션</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>대상 데이터베이스의 이름과 와일드카드 <code translate="no">*</code> 를 컬렉션 이름으로 입력합니다.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>데이터베이스</strong></p></td>
     <td><p>특정 데이터베이스</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>대상 데이터베이스의 이름과 와일드카드 <code translate="no">*</code> 를 컬렉션 이름으로 입력합니다.</p></td>
   </tr>
   <tr>
     <td><p>현재 인스턴스 아래의 모든 데이터베이스</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>데이터베이스 이름으로 <code translate="no">*</code>, 컬렉션 이름으로 <code translate="no">*</code> 을 입력합니다.</p></td>
   </tr>
   <tr>
     <td><p><strong>인스턴스</strong></p></td>
     <td><p>현재 인스턴스</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>데이터베이스 이름으로 <code translate="no">*</code>, 컬렉션 이름으로 <code translate="no">*</code> 을 입력합니다.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>권한</strong>: 역할에 부여해야 하는 특정 권한 또는 <a href="/docs/ko/privilege_group.md">권한 그룹입니다</a>. 현재 Milvus는 부여할 수 있는 56가지 유형의 권한을 제공합니다. 아래 표에는 Milvus의 권한이 나열되어 있습니다.</p>
<p><div class="alert note"></p>
<p>아래 표의 유형 열은 권한을 빠르게 조회할 수 있도록 사용자별로 구분한 것으로, 분류 목적으로만 사용됩니다. 권한을 부여할 때 유형을 이해할 필요는 없습니다. 해당 권한을 입력하기만 하면 됩니다.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>유형</strong></p></th>
<th><p><strong>권한</strong></p></th>
<th><p><strong>설명</strong></p></th>
<th><p><strong>클라이언트 측의 관련 API 설명</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>데이터베이스 권한</p></td>
<td><p>ListDatabases</p></td>
<td><p>현재 인스턴스의 모든 데이터베이스 보기</p></td>
<td><p><a href="/docs/ko/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>데이터베이스의 세부 정보 보기</p></td>
<td><p><a href="/docs/ko/manage_databases.md">DescribeDatabase</a></p></td>
</tr>
<tr>
<td><p>CreateDatabase</p></td>
<td><p>데이터베이스 생성</p></td>
<td><p><a href="/docs/ko/manage_databases.md">CreateDatabase</a></p></td>
</tr>
<tr>
<td><p>DropDatabase</p></td>
<td><p>데이터베이스 삭제</p></td>
<td><p><a href="/docs/ko/manage_databases.md">DropDatabase</a></p></td>
</tr>
<tr>
<td><p>데이터베이스 변경</p></td>
<td><p>데이터베이스 속성 수정</p></td>
<td><p><a href="/docs/ko/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>수집 권한</p></td>
<td><p>GetFlushState</p></td>
<td><p>컬렉션 플러시 작업 상태 확인</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>컬렉션의 로드 상태 확인</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>컬렉션의 로딩 진행률 확인</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>컬렉션 표시</p></td>
<td><p>컬렉션 권한이 있는 모든 컬렉션 보기</p></td>
<td><p><a href="/docs/ko/view-collections.md">ShowCollections</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>컬렉션의 모든 별칭 보기</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ListAliases</a></p></td>
</tr>
<tr>
<td><p>DescribeCollection</p></td>
<td><p>컬렉션의 세부 정보 보기</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">DescribeCollection</a></p></td>
</tr>
<tr>
<td><p>DescribeAlias</p></td>
<td><p>별칭의 세부 정보 보기</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">DescribeAlias</a></p></td>
</tr>
<tr>
<td><p>GetStatistics</p></td>
<td><p>컬렉션의 통계(예: 컬렉션의 엔티티 수)를 가져옵니다.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
</tr>
<tr>
<td><p>CreateCollection</p></td>
<td><p>컬렉션을 만듭니다.</p></td>
<td><p><a href="/docs/ko/create-collection.md">CreateCollection</a></p></td>
</tr>
<tr>
<td><p>DropCollection</p></td>
<td><p>컬렉션 삭제</p></td>
<td><p><a href="/docs/ko/drop-collection.md">DropCollection</a></p></td>
</tr>
<tr>
<td><p>Load</p></td>
<td><p>컬렉션 로드</p></td>
<td><p><a href="/docs/ko/load-and-release.md">로드 컬렉션/로드</a><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">진행률/로드</a><a href="/docs/ko/load-and-release.md">상태 가져오기</a></p></td>
</tr>
<tr>
<td><p>릴리스</p></td>
<td><p>컬렉션 릴리스</p></td>
<td><p><a href="/docs/ko/load-and-release.md">ReleaseCollection</a></p></td>
</tr>
<tr>
<td><p>Flush</p></td>
<td><p>컬렉션의 모든 엔티티를 봉인된 세그먼트에 유지합니다. 플러시 작업 후에 삽입된 모든 엔티티는 새 세그먼트에 저장됩니다.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">플러시/겟플로우</a><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">상태</a></p></td>
</tr>
<tr>
<td><p>압축</p></td>
<td><p>수동으로 압축 트리거</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Compact</a></p></td>
</tr>
<tr>
<td><p>RenameCollection</p></td>
<td><p>컬렉션 이름 바꾸기</p></td>
<td><p><a href="/docs/ko/modify-collection.md">RenameCollection</a></p></td>
</tr>
<tr>
<td><p>CreateAlias</p></td>
<td><p>컬렉션의 별칭을 만듭니다.</p></td>
<td><p><a href="/docs/ko/manage-aliases.md">CreateAlias</a></p></td>
</tr>
<tr>
<td><p>DropAlias</p></td>
<td><p>컬렉션의 별칭 삭제</p></td>
<td><p><a href="/docs/ko/manage-aliases.md">DropAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>데이터베이스의 모든 컬렉션을 플러시합니다.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>파티션 권한</p></td>
<td><p>HasPartition</p></td>
<td><p>파티션 존재 여부 확인</p></td>
<td><p><a href="/docs/ko/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>ShowPartitions</p></td>
<td><p>컬렉션의 모든 파티션 보기</p></td>
<td><p><a href="/docs/ko/manage-partitions.md">ShowPartitions</a></p></td>
</tr>
<tr>
<td><p>CreatePartition</p></td>
<td><p>파티션 만들기</p></td>
<td><p><a href="/docs/ko/manage-partitions.md">CreatePartition</a></p></td>
</tr>
<tr>
<td><p>DropPartition</p></td>
<td><p>파티션 삭제</p></td>
<td><p><a href="/docs/ko/manage-partitions.md">DropPartition</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>인덱스 권한</p></td>
<td><p>IndexDetail</p></td>
<td><p>인덱스의 상세 정보 보기</p></td>
<td><p><a href="/docs/ko/index-vector-fields.md">색인 설명/색인 상태 가져오기/색인 빌드 진행률 가져오기</a></p></td>
</tr>
<tr>
<td><p>CreateIndex</p></td>
<td><p>인덱스 생성</p></td>
<td><p><a href="/docs/ko/index-vector-fields.md">CreateIndex</a></p></td>
</tr>
<tr>
<td><p>DropIndex</p></td>
<td><p>인덱스 삭제</p></td>
<td><p><a href="/docs/ko/index-vector-fields.md">DropIndex</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>리소스 관리 권한</p></td>
<td><p>LoadBalance</p></td>
<td><p>부하 분산 달성</p></td>
<td><p><a href="/docs/ko/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>CreateResourceGroup</p></td>
<td><p>리소스 그룹 생성</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CreateResourceGroup</a></p></td>
</tr>
<tr>
<td><p>DropResourceGroup</p></td>
<td><p>리소스 그룹 삭제</p></td>
<td><p><a href="/docs/ko/resource_group.md">DropResourceGroup</a></p></td>
</tr>
<tr>
<td><p>리소스 그룹 업데이트</p></td>
<td><p>리소스 그룹 업데이트</p></td>
<td><p><a href="/docs/ko/resource_group.md">UpdateResourceGroups</a></p></td>
</tr>
<tr>
<td><p>DescribeResourceGroup</p></td>
<td><p>리소스 그룹의 세부 정보 보기</p></td>
<td><p><a href="/docs/ko/resource_group.md">DescribeResourceGroup</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>현재 인스턴스의 모든 리소스 그룹 보기</p></td>
<td><p><a href="/docs/ko/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>리소스 그룹 간 노드 전송</p></td>
<td><p><a href="/docs/ko/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>리소스 그룹 간 복제본 전송</p></td>
<td><p><a href="/docs/ko/resource_group.md">TransferReplica</a></p></td>
</tr>
<tr>
<td><p>BackupRBAC</p></td>
<td><p>현재 인스턴스에서 모든 RBAC 관련 작업에 대한 백업을 생성합니다.</p></td>
<td><p>BackupRBAC</p></td>
</tr>
<tr>
<td><p>RestoreRBAC</p></td>
<td><p>현재 인스턴스에 있는 모든 RBAC 관련 작업의 백업을 복원합니다.</p></td>
<td><p>RestoreRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>엔터티 권한</p></td>
<td><p>쿼리</p></td>
<td><p>쿼리 수행</p></td>
<td><p><a href="/docs/ko/get-and-scalar-query.md">쿼리</a></p></td>
</tr>
<tr>
<td><p>검색</p></td>
<td><p>검색 수행</p></td>
<td><p><a href="/docs/ko/single-vector-search.md">검색</a></p></td>
</tr>
<tr>
<td><p>삽입</p></td>
<td><p>엔티티 삽입</p></td>
<td><p><a href="/docs/ko/insert-update-delete.md">삽입</a></p></td>
</tr>
<tr>
<td><p>삭제</p></td>
<td><p>엔터티 삭제</p></td>
<td><p><a href="/docs/ko/delete-entities.md">삭제</a></p></td>
</tr>
<tr>
<td><p>Upsert</p></td>
<td><p>엔터티 위로 삽입</p></td>
<td><p><a href="/docs/ko/upsert-entities.md">Upsert</a></p></td>
</tr>
<tr>
<td><p>가져오기</p></td>
<td><p>엔티티 대량 삽입 또는 가져오기</p></td>
<td><p><a href="/docs/ko/import-data.md">대량 삽입/가져오기</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>RBAC 권한</p></td>
<td><p>소유권 만들기</p></td>
<td><p>사용자 또는 역할 만들기</p></td>
<td><p><a href="/docs/ko/users_and_roles.md">사용자 만들기/역할 만들기</a></p></td>
</tr>
<tr>
<td><p>UpdateUser</p></td>
<td><p>사용자의 비밀번호 업데이트</p></td>
<td><p><a href="/docs/ko/users_and_roles.md">UpdateCredential</a></p></td>
</tr>
<tr>
<td><p>DropOwnership</p></td>
<td><p>사용자 비밀번호 또는 역할 삭제</p></td>
<td><p><a href="/docs/ko/drop_users_roles.md">자격증명 삭제/역할 삭제</a></p></td>
</tr>
<tr>
<td><p>SelectOwnership</p></td>
<td><p>특정 역할이 부여된 모든 사용자 보기</p></td>
<td><p><a href="/docs/ko/grant_roles.md">SelectRole/SelectGrant</a></p></td>
</tr>
<tr>
<td><p>소유권 관리</p></td>
<td><p>사용자 또는 역할을 관리하거나 사용자에게 역할을 부여합니다.</p></td>
<td><p><a href="/docs/ko/privilege_group.md">사용자 역할/권한 운영/권한 운영V2</a></p></td>
</tr>
<tr>
<td><p>SelectUser</p></td>
<td><p>사용자에게 부여된 모든 역할 보기</p></td>
<td><p><a href="/docs/ko/grant_roles.md">SelectUser</a></p></td>
</tr>
<tr>
<td><p>권한 그룹 만들기</p></td>
<td><p>권한 그룹 만들기</p></td>
<td><p><a href="/docs/ko/privilege_group.md">CreatePrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>DropPrivilegeGroup</p></td>
<td><p>권한 그룹 삭제</p></td>
<td><p><a href="/docs/ko/privilege_group.md">DropPrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>현재 인스턴스의 모든 권한 그룹 보기</p></td>
<td><p><a href="/docs/ko/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>권한 그룹 운영</p></td>
<td><p>권한 그룹에 권한을 추가하거나 권한 그룹에서 권한을 제거합니다.</p></td>
<td><p><a href="/docs/ko/privilege_group.md">OperatePrivilegeGroup</a></p></td>
</tr>
</table></p></li>
</ul>
<p>다음 예는 <code translate="no">default</code> 데이터베이스 아래의 <code translate="no">collection_01</code> 에 대한 <code translate="no">PrivilegeSearch</code> 권한과 <code translate="no">privilege_group_1</code> 라는 권한 그룹을 <code translate="no">role_a</code> 역할에 부여하는 방법을 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;Search&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});
    
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;privilege_group_1&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;privilege_group_1&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">역할 설명하기<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예는 <code translate="no">describe_role</code> 메서드를 사용하여 <code translate="no">role_a</code> 역할에 부여된 권한을 보는 방법을 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.describe_role(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

role, err := client.DescribeRole(ctx, milvusclient.NewDescribeRoleOption(<span class="hljs-string">&quot;role_a&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음은 출력 예시입니다.</p>
<pre><code translate="no" class="language-python">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">역할에서 권한 또는 권한 그룹 해지하기<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예는 <code translate="no">default</code> 데이터베이스의 <code translate="no">collection_01</code> 에 있는 <code translate="no">PrivilegeSearch</code> 권한과 <code translate="no">role_a</code> 역할에 부여된 권한 그룹 <code translate="no">privilege_group_1</code> 을 해지하는 방법을 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
        WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;ClusterReadOnly&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
