import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Aquí puedes agregar etiquetas meta, enlaces a hojas de estilo, etc. */}
        <meta name="description" content="Descripción de la página" />
        <link rel="stylesheet" href="/ruta-a-tu-archivo-de-estilo.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
