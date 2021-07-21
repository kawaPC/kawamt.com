const http = require("http");
const https = require("https");

const sizeOf = require("image-size");
const visit = require("unist-util-visit");

module.exports = rehypeImsize;

function rehypeImsize(options) {
  const opts = options || {};
  const maxBufferLengths = opts.maxBufferLengths;

  return transformer;

  async function transformer(tree, _file) {
    const promises = [];
    visit(tree, "element", visitor);
    await Promise.all(promises);

    function visitor(node) {
      if (node.tagName !== "img") {
        return;
      }

      const src = node.properties.src;

      if (!src.startsWith("http")) {
        return;
      }

      const url = new URL(src);
      const client = url.protocol === "https:" ? https : http;

      const promise = new Promise(function (resolve) {
        try {
          client.get(url, function (response) {
            const request = this;

            const chunks = [];

            function setImageSize() {
              const buffer = Buffer.concat(chunks);
              const dimensions = sizeOf(buffer);

              node.properties.width = dimensions.width;
              node.properties.height = dimensions.height;
              resolve();
            }

            let bufferLengths = 0;

            response
              .on("data", function (chunk) {
                chunks.push(chunk);
                bufferLengths += chunk.length;

                // stop downloading images after maxBufferLengths
                if (maxBufferLengths && bufferLengths > maxBufferLengths) {
                  request.destroy();
                  setImageSize();
                }
              })
              .on("end", setImageSize);
          });
        } catch (error) {
          console.log(error);
          resolve();
        }
      });

      promises.push(promise);
    }
  }
}
