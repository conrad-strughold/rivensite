cd /d C:\Users\mvpru\riven && ^
powershell -NoProfile -Command ^
"$cfg=@'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',              // custom domain at root
  build: { outDir: 'docs' } // GitHub Pages serves /docs on main
})
'@; Set-Content -Path vite.config.js -Value $cfg -Encoding UTF8; ^
New-Item -ItemType Directory -Force docs | Out-Null; ^
Set-Content -Path docs/CNAME -Value 'riven.finance' -Encoding ASCII" && ^
npm run build && ^
git add -A && git commit -m "publish: main/docs Pages (fixed vite.config.js)" && ^
git push
