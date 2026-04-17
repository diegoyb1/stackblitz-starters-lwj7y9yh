import './globals.css'

export const metadata = {
  title: 'CINFRA — Consorcio Infraestructura',
  description: 'Inversión vanguardista en infraestructura y activos renovables de alta calidad.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
