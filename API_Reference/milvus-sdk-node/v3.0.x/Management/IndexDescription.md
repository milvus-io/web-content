# IndexDescription

Describes one index on a collection, as returned by index-description operations.

```typescript
export interface IndexDescription {
  index_name: string;
  indexID: number;
  params: KeyValuePair[];
  field_name: string;
  indexed_rows: string;
  total_rows: string;
  state: string;
  index_state_fail_reason: string;
  pending_index_rows: string;
}
```

**FIELDS:**

- **index_name** (*string*) -

    The index name.

- **indexID** (*number*) -

    The index ID.

- **params** (*KeyValuePair[]*) -

    The index parameters as key-value pairs.

- **field_name** (*string*) -

    The field the index is built on.

- **indexed_rows** (*string*) -

    The number of rows indexed so far.

- **total_rows** (*string*) -

    The total number of rows to index.

- **state** (*string*) -

    The index build state.

- **index_state_fail_reason** (*string*) -

    The failure reason when the index build failed.

- **pending_index_rows** (*string*) -

    The number of rows pending index build.
