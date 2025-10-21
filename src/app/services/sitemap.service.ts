import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private readonly BASE_URL = 'https://vaultday.space';

  constructor(private databaseService: DatabaseService) {}

  // Generate dynamic sitemap XML
  async generateSitemap(): Promise<string> {
    const urls = await this.getAllUrls();
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    urls.forEach(url => {
      sitemap += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
    });

    sitemap += '</urlset>';
    return sitemap;
  }

  // Get all URLs for sitemap
  private async getAllUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = [];

    // Static pages
    urls.push({
      loc: `${this.BASE_URL}/`,
      lastmod: this.getCurrentDate(),
      changefreq: 'weekly',
      priority: '1.0'
    });

    urls.push({
      loc: `${this.BASE_URL}/privacy`,
      lastmod: this.getCurrentDate(),
      changefreq: 'monthly',
      priority: '0.3'
    });

    urls.push({
      loc: `${this.BASE_URL}/terms`,
      lastmod: this.getCurrentDate(),
      changefreq: 'monthly',
      priority: '0.3'
    });

    urls.push({
      loc: `${this.BASE_URL}/about`,
      lastmod: this.getCurrentDate(),
      changefreq: 'monthly',
      priority: '0.5'
    });

    // Dynamic chat rooms
    try {
      const { data: publicRooms } = await this.databaseService.getPublicRooms();
      if (publicRooms && publicRooms.length > 0) {
        publicRooms.forEach(room => {
          urls.push({
            loc: `${this.BASE_URL}/room/${room.id}`,
            lastmod: this.formatDate(room.created_at),
            changefreq: 'daily',
            priority: '0.7'
          });
        });
      }
    } catch (error) {
      console.warn('Could not fetch public rooms for sitemap:', error);
    }

    return urls;
  }

  // Get current date in ISO format
  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Format date for sitemap
  private formatDate(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  // Download sitemap as file
  downloadSitemap(): void {
    this.generateSitemap().then(sitemap => {
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}
