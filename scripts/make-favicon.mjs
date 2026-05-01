import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// PNG data captured from the browser canvas render of logo-drawing.svg
const pngs = {
  16: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChUlEQVR4AXRSTUhUURT+7h2KCKIiIa3AZ9owQy4EC0zMbBX9QEEuWs70Yz8bnTQoWujQwoXY1KbAihlx4SILpb9FPzOuLLK0CJxGpSdIWgkzlekbm/dO5750cJrpvHPe984593zv3HuuxDLRbo3WaDc/aSo04wwEq9o/PNGCf30Vy2VpAlUoIMMHY3rFzLZAGCRcm+O/HkvTChffGfPgP5ImUPnGF+99/kfD3UToI2FVxDauOQ5Cr2Xh9Nbb48Fc3aQJBq/2Bo+90euZKARJAUZIfhgbGA0mSqhuFMmUs735s/NalUKb4Jsz0MxFM4ZI6gaSngX8bklS0rsylYoIIi8RqXNpAFnXnwce3JAQJyVSXZBWv3R2jASrm/Z9rGzcPxtfkVo1L5L4Iec7t4xeCg34Sn3jdSUhYaYgUikcejdRujq5MAFYzwgiVBC9EJHShN+CaBUC+VcO77r3UxiTCzDCQ66L6q9wtg40O+Jxbf30157LT4fXCsIZAmoKYo1+3h5k9KxbFwA7IjpctGn728K8Qe5CM5hkR0PfXUc84enqef3yYferWiLUcpFOkryMtkr7bSICojJhwdN29EBZX7m7dw4GHIlEyYmhicnC2WQFAFW4Nz/WVKRaZ99Wm8DuwoSXBFoAaPerdx85d74eju+Jscovc9Mc4yGI0PJCFVNmE6iPKG8ldsrtFyaK2NfZtPjO8sliw5rlb/A0ahT+a2mCpYQiIoEQWMy8DesYlOoQ0JBDsgjsNYT0Yp6QrvZNPLYpV1tWFzkJeCrq7kfAsjQuSNkJS+7hUIZmEbg6RjwE8OWBl5P9WJSCqE9Pky3GFPAaBZkWq3N71VlE69z2WWRmM70/AAAA///Yp3AeAAAABklEQVQDACykEim4sWbrAAAAAElFTkSuQmCC",
  32: "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",
  48: "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"
};

function makeIco(pngMap) {
  const entries = Object.entries(pngMap).map(([size, b64]) => ({
    size: parseInt(size),
    data: Buffer.from(b64, 'base64'),
  }));

  const count = entries.length;
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize * count;

  // ICONDIR header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  // Directory entries
  const dirEntries = [];
  let offset = dataOffset;
  for (const { size, data } of entries) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size === 256 ? 0 : size, 0);  // width
    entry.writeUInt8(size === 256 ? 0 : size, 1);  // height
    entry.writeUInt8(0, 2);                          // color count
    entry.writeUInt8(0, 3);                          // reserved
    entry.writeUInt16LE(1, 4);                       // planes
    entry.writeUInt16LE(32, 6);                      // bit count
    entry.writeUInt32LE(data.length, 8);             // size of image data
    entry.writeUInt32LE(offset, 12);                 // offset from file start
    dirEntries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...entries.map(e => e.data)]);
}

const icoBuffer = makeIco(pngs);
const outPath = join(__dirname, '..', 'app', 'favicon.ico');
writeFileSync(outPath, icoBuffer);
console.log(`favicon.ico written (${icoBuffer.length} bytes) → ${outPath}`);
