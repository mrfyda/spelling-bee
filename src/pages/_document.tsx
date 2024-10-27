import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="favicon.ico" />

                <meta name="color-scheme" content="light dark" />
                <meta name="theme-color" content="#111111" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#eeeeee" media="(prefers-color-scheme: dark)" />

                <link rel="apple-touch-icon" href="logo192.png" />
            </Head>
            <body>
                <Main />
                <NextScript />

                {/* Global Site Tag (gtag.js) - Google Analytics */}
                {/* Necessary to prevent error: window.gtag is not defined for Next.js-hydration */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                        `,
                    }}
                />
            </body>
        </Html>
    )
}