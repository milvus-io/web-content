# RowData

One data row for insert or upsert: a record keyed by field name.

```typescript
export interface RowData {
  [x: string]: FieldData;
}
```

**FIELDS:**

- **[field: string]** (*FieldData*) -

    The field value, keyed by the field name.
