import AuthButton from '@/components/AuthButton'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='h-screen bg-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
