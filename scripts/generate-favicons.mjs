import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const repoRoot = path.resolve(__dirname, '..');
const assetsDir = path.resolve(repoRoot, 'attached_assets');
const publicDir = path.resolve(repoRoot, 'client', 'public');

async function findProfileImage() {
  const files = await fs.readdir(assetsDir);
  const candidates = files.filter((f) => /Profile Picture/i.test(f) && /\.(png|jpe?g|webp)$/i.test(f));
  if (candidates.length === 0) {
    throw new Error('Could not find a profile picture in attached_assets (looking for files matching "Profile Picture*.(png|jpg|jpeg|webp)")');
  }
  // Prefer the most recently modified matching file
  const stats = await Promise.all(
    candidates.map(async (f) => ({
      file: f,
      mtimeMs: (await fs.stat(path.join(assetsDir, f))).mtimeMs,
    }))
  );
  stats.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return path.join(assetsDir, stats[0].file);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function generate() {
  await ensureDir(publicDir);
  const input = await findProfileImage();

  const outputs = [
    { file: 'favicon-16x16.png', size: 16 },
    { file: 'favicon-32x32.png', size: 32 },
    { file: 'apple-touch-icon.png', size: 180 },
    { file: 'android-chrome-192x192.png', size: 192 },
    { file: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { file, size } of outputs) {
    const outPath = path.join(publicDir, file);
    const circleSvg = Buffer.from(
      `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
         <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#fff" />
       </svg>`
    );

    await sharp(input)
      .resize(size, size, { fit: 'cover', position: 'attention' })
      // Apply circular alpha mask to "remove" background outside the subject area
      .composite([{ input: circleSvg, blend: 'dest-in' }])
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Wrote ${file}`);
  }
}

try {
  await generate();
  console.log('✅ Favicons generated from profile picture.');
} catch (err) {
  console.error('❌ Failed to generate favicons:', err);
  process.exit(1);
}
