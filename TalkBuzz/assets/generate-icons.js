// Simple icon generator - creates PNG from canvas-like buffer
// Since we can't use canvas in Node without deps, create minimal valid PNGs
const fs = require('fs');
const zlib = require('zlib');

function createPNG(size, r, g, b) {
  // Create raw RGBA pixel data
  const rawData = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      // Rounded rectangle with gradient approximation
      const cornerRadius = size * 0.2;
      const inCorner = (
        (x < cornerRadius && y < cornerRadius && Math.hypot(x - cornerRadius, y - cornerRadius) > cornerRadius) ||
        (x > size - cornerRadius && y < cornerRadius && Math.hypot(x - (size - cornerRadius), y - cornerRadius) > cornerRadius) ||
        (x < cornerRadius && y > size - cornerRadius && Math.hypot(x - cornerRadius, y - (size - cornerRadius)) > cornerRadius) ||
        (x > size - cornerRadius && y > size - cornerRadius && Math.hypot(x - (size - cornerRadius), y - (size - cornerRadius)) > cornerRadius)
      );
      if (inCorner) { rawData[idx] = 0; rawData[idx+1] = 0; rawData[idx+2] = 0; rawData[idx+3] = 0; continue; }
      // Gradient from indigo to cyan
      const t = (x + y) / (size * 2);
      const cr = Math.round(99 * (1 - t) + 34 * t);
      const cg = Math.round(102 * (1 - t) + 211 * t);
      const cb = Math.round(241 * (1 - t) + 238 * t);
      // White chat bubble in center
      const cx = size / 2, cy = size * 0.52;
      const bw = size * 0.3, bh = size * 0.28;
      const inBubble = Math.abs(x - cx) < bw && Math.abs(y - cy) < bh;
      if (inBubble) { rawData[idx] = 255; rawData[idx+1] = 255; rawData[idx+2] = 255; rawData[idx+3] = 240; continue; }
      rawData[idx] = cr; rawData[idx+1] = cg; rawData[idx+2] = cb; rawData[idx+3] = 255;
    }
  }
  // PNG header + IHDR + IDAT + IEND
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const typeB = Buffer.from(type);
    const combined = Buffer.concat([typeB, data]);
    const crc = crc32(combined);
    const crcB = Buffer.alloc(4); crcB.writeUInt32BE(crc >>> 0);
    return Buffer.concat([len, combined, crcB]);
  }
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
    return (c ^ 0xffffffff) >>> 0;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  const compressed = zlib.deflateSync(rawData);
  return Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))]);
}
fs.writeFileSync('assets/icon-192.png', createPNG(192, 0, 0, 0));
fs.writeFileSync('assets/icon-512.png', createPNG(512, 0, 0, 0));
console.log('PNG icons generated: icon-192.png, icon-512.png');
