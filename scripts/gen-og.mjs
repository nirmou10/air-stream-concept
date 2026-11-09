// Generates public/og-image.png (1200x630, navy, "AIR-STREAM" text).
// Run: bun scripts/gen-og.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const W = 1200;
const H = 630;
const NAVY = [22, 41, 77]; // #16294d
const WHITE = [244, 241, 234];
const ORANGE = [232, 114, 42]; // #e8722a

const FONT = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  "-": ["00000", "00000", "01110", "00000", "00000", "00000", "00000"],
};

const text = "AIR-STREAM";
const scale = 22;
const charW = 5 * scale;
const gap = 1 * scale;
const totalW = text.length * charW + (text.length - 1) * gap;
const startX = Math.floor((W - totalW) / 2);
const startY = Math.floor((H - 7 * scale) / 2) - 10;

const px = new Uint8Array(W * H * 3);
for (let i = 0; i < W * H; i++) {
  px[i * 3] = NAVY[0];
  px[i * 3 + 1] = NAVY[1];
  px[i * 3 + 2] = NAVY[2];
}

function setPixel(x, y, c) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  px[i] = c[0];
  px[i + 1] = c[1];
  px[i + 2] = c[2];
}

let cx = startX;
for (const ch of text) {
  const glyph = FONT[ch];
  for (let gy = 0; gy < 7; gy++) {
    for (let gx = 0; gx < 5; gx++) {
      if (glyph[gy][gx] !== "1") continue;
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          setPixel(cx + gx * scale + sx, startY + gy * scale + sy, WHITE);
        }
      }
    }
  }
  cx += charW + gap;
}

// Orange underline bar under the wordmark
const barW = Math.floor(totalW * 0.6);
const barX = Math.floor((W - barW) / 2);
const barY = startY + 7 * scale + 48;
const barH = 10;
for (let y = barY; y < barY + barH; y++) {
  for (let x = barX; x < barX + barW; x++) setPixel(x, y, ORANGE);
}

// PNG encode
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0;
  Buffer.from(px.buffer, y * W * 3, W * 3).copy(raw, y * (1 + W * 3) + 1);
}
const idat = deflateSync(raw, { level: 9 });

const crcTable = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
function crc32(buf) {
  let c = -1;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type RGB

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

writeFileSync(new URL("../public/og-image.png", import.meta.url), png);
console.log(`wrote public/og-image.png (${png.length} bytes)`);
