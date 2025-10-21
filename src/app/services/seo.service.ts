import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateTitle(title: string) {
    this.title.setTitle(`${title} | VaultDay`);
  }

  updateDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'twitter:description', content: description });
  }

  updateKeywords(keywords: string) {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  updateOpenGraph(title: string, description: string, image?: string) {
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
    }
  }

  updateTwitterCard(title: string, description: string, image?: string) {
    this.meta.updateTag({ property: 'twitter:title', content: title });
    this.meta.updateTag({ property: 'twitter:description', content: description });
    if (image) {
      this.meta.updateTag({ property: 'twitter:image', content: image });
    }
  }

  setHomePageSEO() {
    this.updateTitle('VaultDay - Vault it today. Gone tomorrow');
    this.updateDescription('Ứng dụng chat đơn giản và hiện đại. Tin nhắn tự động xóa khi đồng hồ điểm 0h. Tham gia phòng chat ngay!');
    this.updateKeywords('chat app, nhắn tin, chat room, vaultday, chat online, tin nhắn tự động xóa');
    this.updateOpenGraph('VaultDay - Vault it today. Gone tomorrow', 'Ứng dụng chat đơn giản và hiện đại. Tin nhắn tự động xóa khi đồng hồ điểm 0h.');
    this.updateTwitterCard('VaultDay - Vault it today. Gone tomorrow', 'Ứng dụng chat đơn giản và hiện đại. Tin nhắn tự động xóa khi đồng hồ điểm 0h.');
  }

  setChatRoomSEO(roomName: string) {
    this.updateTitle(`Chat Room: ${roomName}`);
    this.updateDescription(`Tham gia phòng chat ${roomName} trên VaultDay. Tin nhắn tự động xóa khi đồng hồ điểm 0h.`);
    this.updateKeywords(`chat room ${roomName}, nhắn tin ${roomName}, vaultday chat`);
    this.updateOpenGraph(`Chat Room: ${roomName}`, `Tham gia phòng chat ${roomName} trên VaultDay.`);
    this.updateTwitterCard(`Chat Room: ${roomName}`, `Tham gia phòng chat ${roomName} trên VaultDay.`);
  }
}
