<!-- Deployment note: Triggering redeploy on Sevalla, Sep 18, 2025 -->
# Staging PIN Gate
The /portal admin can be gated in staging via a hashed PIN.
1) Generate a SHA-256 hex of your PIN:
   node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1],'utf8').digest('hex'))" YOUR_PIN
2) Create a local .env with:
   VITE_PREVIEW_PIN_HASH=<paste_hex_here>
3) Leave the var empty to disable the gate; rebuild to apply.

## Build & Deploy (Sevalla Hosting)

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready files will be in the `dist/` folder.
3. **Preview locally (optional):**
   ```bash
   npm run preview
   ```
4. **Deploy:**
   Upload the contents of the `dist/` folder to your Sevalla hosting environment.

**Environment Variables:**
- See above for PIN gate setup if needed.

**Notes:**
- Node.js 18+ is recommended.
- If you encounter dependency issues, use the `--legacy-peer-deps` flag with npm.
