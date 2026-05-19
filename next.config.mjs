/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trigger Next.js dev server auto-reload
  env: {
    REBOOT_TIMESTAMP: Date.now().toString()
  }
}

export default nextConfig
