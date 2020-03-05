# Changelog

## v2.1.0
- Add support for JSON Schema media-types
- Rewrite talkback to Typescript

## v2.0.0
- Drop node 8 support. Min. required version is node 10
- Order of properties is ignored when matching JSON tapes body

## v1.12.0
- Store compressed (gzip, deflate) human-readable bodies as plain text 

## v1.11.1
- Dependencies updates

## v1.11.0
- Add `latency` option
- Add `errorRate` option
- Add `requestDecorator` option
- Expose default options as `talkback.Options.Default`

## v1.10.0
- Load tapes from deep directories
- Add `tapeNameGenerator` option. (thanks **[@tartale](https://github.com/tartale)**)
- Introduce record modes through `record` option. 
- Allow `record` option to take a function to change recording mode based on the request
- Allow `fallbackMode` option to take a function to change fallback mode based on the request

- Bugfix: wrong Content-Length when tapes contain multi-bytes characters. (thanks **[@sebflipper](https://github.com/sebflipper)**)
- **DEPRECATION**: `record` option will no longer take boolean values
- **DEPRECATION**: `fallbackMode` options `404` and `proxy` have been replaced by `NOT_FOUND` and `PROXY` respectively

## v1.9.0
- `responseDecorator` is now called for both matched tapes as well as the initial response returned by the proxied server

## v1.8.1
- Fix bug with HEAD requests

## v1.8.0
- Pretty print JSON requests & responses in saved tapes
- Always ignore `content-length` header for tape matching 
- Add `name` option
- Print `name` in Summary title

## v1.7.0
- Add `https` server option.
- Add `urlMatcher` option to customize how the request URL is matched against saved tapes.

## v1.6.0
- Add `responseDecorator` option to add dynamism to saved tapes responses.
- Add `hasTapeBeenUsed` and `resetTapeUsage` methods to the server interface. (thanks **[@sjaakieb](https://github.com/sjaakieb)**)

## v1.5.0
- Add `bodyMatcher` option to customize how the request body is matched against saved tapes.

## v1.4.0
- Add `ignoreBody` option (thanks **[@meop](https://github.com/meop)**)
- Add `fallbackMode` option to allow to proxy unknown requests if no tape exists. Defaults to 404 error. (thanks **[@meop](https://github.com/meop)**)

## v1.3.0
- Add `ignoreQueryParams` option
- Updated dependencies

## v1.2.0
- Add `debug` option to print verbose information about tapes matching. Defaults to `false`
- [Thanks @roypa] Fix bug that mixed `req` and `res` humanReadble property

## v1.1.4
- Add `silent` option to mute information console output on requests
