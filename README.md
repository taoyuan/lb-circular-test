# lb-4-circular-test

This is a test repo to demonstrate a circular dependency issue with `lb4`.

## Steps to reproduce

1. Clone this repo
2. Run `yarn`
3. Run `yarn test`

## Expected result

The test should pass.

## Actual result

The test fails with the following error:

```
 Error thrown from get /tasks => TaskController.find Error: Circular dependency detected: controllers.UserController --> @UserController.constructor[0] --> repositories.UserRepository --> @UserRepository.constructor[1] --> repositories.TaskRepository --> @TaskRepository.constructor[1] --> repositories.UserRepository
```

## Notes

The testing codes:

```ts
  it('invokes GET /query', async () => {
    await client.get('/users').expect(200); // This line passes
    await client.get('/tasks').expect(200); // This line fails
  });
```

- The error is thrown for the second rest call to `GET /tasks`
- The dependency chain seams confusing. Shouldn't the circular dependency path be from `controllers.TaskController`? Why is `controllers.UserController` involved?
- No error is thrown with `singletons: false` in repositories.
- No error is thrown with all repositories injected in `controllers.UserController` constructor.
