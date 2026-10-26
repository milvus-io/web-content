# RowPolicyType

This is an enumeration that provides the following constants.

## Constants

- UNKNOWN (0)

    The row-policy type is unknown.

- PERMISSIVE (1)

    A permissive row policy. It filters the rows visible to a principal using the `usingExpr`, and validates the rows written by a principal using the `checkExpr`.

- RESTRICTIVE (2)

    A restrictive row policy. It restricts the rows visible to a principal using the `usingExpr`, and validates the rows written by a principal using the `checkExpr`.
