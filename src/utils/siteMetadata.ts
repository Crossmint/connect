import { FALLBACK_ORIGIN_ICON } from '../consts/fallbackImage';
import { AppMetadata } from '../types/index';

/**
 * Returns whether the given image URL exists
 */
function imgExists(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            const img = document.createElement('img');
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Extracts a name for the site from the DOM
 */
const getSiteName = (window: Window): string => {
    const { document } = window;

    const siteName = document.querySelector<HTMLMetaElement>('head > meta[property="og:site_name"]');
    if (siteName) {
        return siteName.content;
    }

    const metaTitle = document.querySelector<HTMLMetaElement>('head > meta[name="title"]');
    if (metaTitle) {
        return metaTitle.content;
    }

    if (document.title && document.title.length > 0) {
        return document.title;
    }

    return window.location.hostname;
};

// There is a bug here? Sometimes the icon isnt correctly extracted
/**
 * Extracts an icon for the site from the DOM
 */
async function getSiteIcon(window: Window): Promise<string> {
    try {
        const { document } = window;

        // Use the site's favicon if it exists
        let icon = document.querySelector<HTMLLinkElement>('head > link[rel="shortcut icon"]');
        if (icon && (await imgExists(icon.href))) {
            return icon.href;
        }

        // Search through available icons in no particular order
        icon = Array.from(document.querySelectorAll<HTMLLinkElement>('head > link[rel="icon"]')).find((_icon) =>
            Boolean(_icon.href)
        ) as HTMLLinkElement | null;
        if (icon && (await imgExists(icon.href))) {
            return icon.href;
        }

        return FALLBACK_ORIGIN_ICON;
    } catch (error) {
        return FALLBACK_ORIGIN_ICON;
    }
}

export default async function buildSiteMetadata(appMetadata?: AppMetadata) {
    return {
        name: appMetadata && appMetadata.name ? appMetadata.name : getSiteName(window),
        icon: appMetadata && appMetadata.icon ? appMetadata.icon : await getSiteIcon(window),
        url: window.location.origin,
    };
}
