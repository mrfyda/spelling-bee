import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark-plugin.min.css';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import GoogleAnalytics4 from '@/components/GoogleAnalytics4';

export function reportWebVitals(metric: NextWebVitalsMetric) {
    gtag('event', metric.name, {
        event_category:
            metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
    })
}

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <GoogleAnalytics4 />
            <Component {...pageProps} />
        </>
    )
}

export default App