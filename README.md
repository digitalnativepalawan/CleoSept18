# Staging PIN Gate
The /portal admin can be gated in staging via a hashed PIN.
1) Generate a SHA-256 hex of your PIN:
   node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1],'utf8').digest('hex'))" YOUR_PIN
2) Create a local .env with:
   VITE_PREVIEW_PIN_HASH=<paste_hex_here>
3) Leave the var empty to disable the gate; rebuild to apply.
