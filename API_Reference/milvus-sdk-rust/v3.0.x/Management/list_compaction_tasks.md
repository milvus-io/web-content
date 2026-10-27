# list_compaction_tasks()

Lists the compaction tasks still retained for a collection.

```rust
pub async fn list_compaction_tasks(&self, request: ListCompactionTasksRequest) -> Result<GetCompactionPlansResponse>
```

Terminal tasks are subject to server-side garbage collection; the result is not an audit log.

## Request Syntax

```rust
let request = ListCompactionTasksRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose retained compaction tasks are listed. Required.

**RETURN TYPE:**

*Result\<GetCompactionPlansResponse\>*

**RETURNS:**

A **GetCompactionPlansResponse** containing the retained tasks. The response's `compaction_id` is `0` because selection is by collection. Returns an `Error` if the operation fails.

```rust
GetCompactionPlansResponse
    compaction_id() // -> i64
    collection_name() // -> &str
    state() // -> CompactionStateCode
    merges() // -> &[CompactionMerge]
```

**METHODS:**

- `compaction_id()` (*i64*) -

    Always `0` for this operation.

- `collection_name()` (*&str*) -

    The collection whose tasks were listed.

- `state()` (*CompactionStateCode*) -

    The aggregate compaction state. See [CompactionStateCode](CompactionStateCode.md).

- `merges()` (*&[CompactionMerge]*) -

    The retained compaction tasks. See [CompactionMerge](CompactionMerge.md).

## Example

```rust
let request = ListCompactionTasksRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_compaction_tasks(request).await?;
for task in resp.merges() {
    println!("plan {}: {:?}", task.get_plan_id(), task.get_state());
}
```
