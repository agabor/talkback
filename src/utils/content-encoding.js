const zlib = require("zlib")
import Headers from "./headers"

const ALGORITHMS = {
  gzip: {compress: zlib.gzipSync, uncompress: zlib.gunzipSync},
  deflate: {compress: zlib.deflateSync, uncompress: zlib.inflateSync}
}

export default class ContentEncoding {
  constructor(reqRes) {
    this.reqRes = reqRes
  }

  isUncompressed() {
    const contentEncoding = this.contentEncoding()
    return !contentEncoding || contentEncoding === 'identity'
  }

  supportedAlgorithm() {
    const contentEncoding = this.contentEncoding()
    return Object.keys(ALGORITHMS).includes(contentEncoding)
  }

  contentEncoding() {
    return Headers.read(this.reqRes.headers, 'content-encoding')
  }

  async uncompressedBody(bufferContent) {
    const contentEncoding = this.contentEncoding()

    if(!this.supportedAlgorithm()) {
      throw new Error(`Unsupported content-encoding ${contentEncoding}`)
    }

    return ALGORITHMS[contentEncoding].uncompress(bufferContent)
  }

  async compressedBody(bufferContent) {
    const contentEncoding = this.contentEncoding()

    if(!this.supportedAlgorithm()) {
      throw new Error(`Unsupported content-encoding ${contentEncoding}`)
    }

    return ALGORITHMS[contentEncoding].compress(bufferContent)
  }
}