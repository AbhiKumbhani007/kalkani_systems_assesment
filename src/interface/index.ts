export interface CharacterData {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
    };
  };
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
}

export interface Pagination {
  current_page: number;
  has_next_page: false;
  items: { count: number; total: number; per_page: number };
  last_visible_page: number;
}
