pg_error_parser
===

A micro-module to make sense of error messages in postgresql. Works well with the `pg` module.

```
npm install pg_error_parser
```

Usage
---

#### format(error)

Takes an error object and adds more information to it. Useful when logging error objects and needing to see some normalized data.

Error lookups are based on the `sqlState` key of the error object.

Format will add the following keys to the error object:

##### code_name

Values such as `not_null_violation`, `unique_violation`, or `invalid_sql_statement_name`.

##### code_level

The severity of the error, either `info`, `warning`, or `error`.

##### code_group_name

A human readable name for this type of error like `Integrity Constraint Violation`, `Invalid Transaction State`, or `Data Exception`.


```js
var pg = require('pg');
var pgep = require('pg_error_parser');
var client = new pg.Client();


client.query(text, params, function(err, result) {
  done();
  if (err) {
    err = pgep.format(err);
    // error object now has additional keys
    console.error(err);
    return callback(err);
  }
  callback(null, result);
});

```

#### getLevel(code)

Returns the error level of a given code.

```js
getLevel('23505')
// error

getLevel('01P01')
// warn

getLevel('00000')
// info
```

#### getCodeName(code)

Returns the code name of a given code.

```js
getLevel('23505')
// unique_violation

getLevel('01P01')
// deprecated_feature

getLevel('00000')
// successful_completion
```

#### getGroupName(code)

Returns the human readable name for and error if this type.

```js
getLevel('23505')
// Integrity Constraint Violation

getLevel('01P01')
// Warning

getLevel('00000')
// Successful Completion
```

License
===

MIT