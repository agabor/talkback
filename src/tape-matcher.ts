import ContentEncoding from "./utils/content-encoding"
import MediaType from "./utils/media-type"
import {Options} from "./options"
import Tape from "./tape"

const isEqual = require("lodash/isEqual")

export default class TapeMatcher {
  private readonly tape: Tape
  private readonly options: Options

  constructor(tape: Tape, options: Options) {
    this.tape = tape
    this.options = options
  }

  sameAs(otherTape: Tape) {
    const otherReq = otherTape.req
    const req = this.tape.req
    const sameURL = req.url === otherReq.url
    if (!sameURL) {
      if (!this.options.urlMatcher) {
        this.options.logger.debug(`Not same URL ${req.url} vs ${otherReq.url}`)
        return false
      }

      const urlMatches = this.options.urlMatcher(this.tape, otherReq)
      if (!urlMatches) {
        this.options.logger.debug(`Not same urlMatcher ${req.url} vs ${otherReq.url}`)
        return false
      }
    }

    const sameMethod = req.method === otherReq.method
    if (!sameMethod) {
      this.options.logger.debug(`Not same METHOD ${req.method} vs ${otherReq.method}`)
      return false
    }

    const currentHeadersLength = Object.keys(req.headers).length
    const otherHeadersLength = Object.keys(otherReq.headers).length
    const sameNumberOfHeaders = currentHeadersLength === otherHeadersLength
    if (!sameNumberOfHeaders) {
      this.options.logger.debug(`Not same #HEADERS ${JSON.stringify(req.headers)} vs ${JSON.stringify(otherReq.headers)}`)
      return false
    }

    let headersSame = true
    Object.keys(req.headers).forEach(k => {
      const entryHeader = req.headers[k]
      const header = otherReq.headers[k]

      headersSame = headersSame && entryHeader === header
    })
    if (!headersSame) {
      this.options.logger.debug(`Not same HEADERS values ${JSON.stringify(req.headers)} vs ${JSON.stringify(otherReq.headers)}`)
      return false
    }

    if (!this.options.ignoreBody) {
      const mediaType = new MediaType(req)
      const contentEncoding = new ContentEncoding(req)

      let sameBody = false
      if (contentEncoding.isUncompressed() && mediaType.isJSON() && req.body.length > 0 && otherReq.body.length > 0) {
        const parsedReqBody = JSON.parse(req.body.toString())
        const parsedOtherReqBody = JSON.parse(otherReq.body.toString())
        sameBody = isEqual(parsedReqBody, parsedOtherReqBody)
      } else {
        sameBody = req.body.equals(otherReq.body)
      }

      if (!sameBody) {
        if (!this.options.bodyMatcher) {
          this.options.logger.debug(`Not same BODY ${req.body} vs ${otherReq.body}`)
          return false
        }

        const bodyMatches = this.options.bodyMatcher(this.tape, otherReq)
        if (!bodyMatches) {
          this.options.logger.debug(`Not same bodyMatcher ${req.body} vs ${otherReq.body}`)
          return false
        }
      }
    }
    return true
  }
}
