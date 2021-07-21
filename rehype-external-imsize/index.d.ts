import { Plugin } from "unified";

declare const rehypeImsize: Plugin<[RehypeImsizeOptions?]>;

interface RehypeImsizeOptions {
  /**
   * ⚠️ The units should be specified in bytes.
   * Optionally check the buffer length and stop downloading images after a few kilobytes.
   * No need to download the entire image to get the dimensions.
   *
   * @default 1000
   */
  maxBufferLengths: number;
}

export = rehypeImsize;
