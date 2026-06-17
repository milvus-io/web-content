# FieldData

This is the template class that represents column-based data for a single field. Concrete aliases cover every supported data type. Instances of the concrete types are used when inserting data via `InsertRequest::WithRowsData()` or reading query/search results via `QueryResults::OutputField()` and `SingleResult::OutputField()`.

## Scalar type aliases

## Vector type aliases

`BinaryVecFieldData` extends `FieldData<std::vector<uint8_t>, DataType::BINARY_VECTOR>` and adds string-based convenience methods: `AddAsString()`, `DataAsString()`, and static helpers `ToBinaryStrings()` / `ToBinaryString()` / `ToUnsignedChars()`.

## Array type aliases

`ArrayFieldData<T, Et>` extends `FieldData<std::vector<T>, DataType::ARRAY>` and stores each entity row as a `std::vector<T>`.

## Shared-pointer aliases

Every concrete type has a corresponding `*Ptr` alias, e.g.:

## Example

