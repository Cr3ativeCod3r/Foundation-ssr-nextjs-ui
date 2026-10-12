/**
 * Analytics events (GA4). Sends through gtag when it is loaded, otherwise queues
 * in dataLayer so Google Tag Manager or a later-added GA4 tag can pick them up.
 */

export type ReportEvent = 'report_pdf_download' | 'report_dashboard_open' | 'report_partner_click';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: ReportEvent, params: Record<string, string>): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
}
