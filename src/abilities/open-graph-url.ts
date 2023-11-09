export class OpenGraphUrl {
    public init(): void {
        let metaTag = document.querySelector('meta[property="og:url"]');

        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('property', 'og:url');
            document.head.appendChild(metaTag);
        }

        const canonical = document.querySelector('link[rel="canonical"]');

        if (canonical) {
            metaTag.setAttribute('content', canonical.getAttribute('href')!);
        }
    }
}
