# bot-schedule

Schedule commands

## Config (config.yaml)

```yaml
schedule:
  jobs:
    - pattern: "once every minute"
      command: "proxy"
    - pattern: "once every hour"
      command: "bitcoin"
    - pattern: "startup"
      command: "say hello"
```

## Which pattern can I use?

This command uses the text and cron parsers of the `later` lib (http://bunkat.github.io/later/parsers.html).

You can also use `startup` pattern to run a command at startup.
