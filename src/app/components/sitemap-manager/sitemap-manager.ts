import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapService } from '../../services/sitemap.service';

@Component({
  selector: 'app-sitemap-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sitemap-manager">
      <h2>Sitemap Manager</h2>
      
      <div class="sitemap-actions">
        <button 
          class="btn-primary" 
          (click)="generateAndDownloadSitemap()"
          [disabled]="isGenerating">
          <span *ngIf="!isGenerating">Generate & Download Sitemap</span>
          <span *ngIf="isGenerating">Generating...</span>
        </button>
        
        <button 
          class="btn-secondary" 
          (click)="viewSitemap()"
          [disabled]="isGenerating">
          View Sitemap XML
        </button>
      </div>

      <div *ngIf="sitemapContent" class="sitemap-preview">
        <h3>Sitemap Preview</h3>
        <pre class="xml-content">{{ sitemapContent }}</pre>
      </div>

      <div class="sitemap-info">
        <h3>Sitemap Information</h3>
        <ul>
          <li><strong>URL:</strong> https://vaultday.space/sitemap.xml</li>
          <li><strong>Last Updated:</strong> {{ lastUpdated }}</li>
          <li><strong>Total URLs:</strong> {{ totalUrls }}</li>
          <li><strong>Static Pages:</strong> 4 (Home, Privacy, Terms, About)</li>
          <li><strong>Dynamic Rooms:</strong> {{ dynamicRooms }}</li>
        </ul>
      </div>

      <div class="seo-tips">
        <h3>SEO Tips</h3>
        <ul>
          <li>✅ Sitemap includes all public pages</li>
          <li>✅ Dynamic chat rooms are included</li>
          <li>✅ Proper priority and changefreq set</li>
          <li>✅ Robots.txt configured</li>
          <li>⚠️ Submit sitemap to Google Search Console</li>
          <li>⚠️ Submit sitemap to Bing Webmaster Tools</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .sitemap-manager {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .sitemap-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .sitemap-preview {
      background: var(--bg-card);
      border: 1px solid var(--border-neon);
      border-radius: var(--radius-lg);
      padding: 1rem;
      margin-bottom: 2rem;
    }

    .xml-content {
      background: var(--bg-primary);
      color: var(--text-primary);
      padding: 1rem;
      border-radius: var(--radius-sm);
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .sitemap-info, .seo-tips {
      background: var(--bg-card);
      border: 1px solid var(--border-neon);
      border-radius: var(--radius-lg);
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .sitemap-info ul, .seo-tips ul {
      list-style: none;
      padding: 0;
    }

    .sitemap-info li, .seo-tips li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-subtle);
    }

    .sitemap-info li:last-child, .seo-tips li:last-child {
      border-bottom: none;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-md);
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: var(--neon-primary);
      color: var(--bg-primary);
    }

    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
    }

    .btn-secondary {
      background: var(--bg-card);
      color: var(--text-primary);
      border: 1px solid var(--border-neon);
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--neon-primary);
      color: var(--bg-primary);
    }

    .btn-primary:disabled, .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class SitemapManagerComponent implements OnInit {
  sitemapContent: string = '';
  isGenerating = false;
  lastUpdated = '';
  totalUrls = 0;
  dynamicRooms = 0;

  constructor(private sitemapService: SitemapService) {}

  ngOnInit() {
    this.lastUpdated = new Date().toLocaleDateString();
    this.generateSitemapPreview();
  }

  async generateSitemapPreview() {
    try {
      this.sitemapContent = await this.sitemapService.generateSitemap();
      this.totalUrls = (this.sitemapContent.match(/<url>/g) || []).length;
      this.dynamicRooms = (this.sitemapContent.match(/\/room\//g) || []).length;
    } catch (error) {
      console.error('Error generating sitemap preview:', error);
    }
  }

  async generateAndDownloadSitemap() {
    this.isGenerating = true;
    try {
      await this.generateSitemapPreview();
      this.sitemapService.downloadSitemap();
      this.lastUpdated = new Date().toLocaleDateString();
    } catch (error) {
      console.error('Error generating sitemap:', error);
    } finally {
      this.isGenerating = false;
    }
  }

  async viewSitemap() {
    await this.generateSitemapPreview();
  }
}
