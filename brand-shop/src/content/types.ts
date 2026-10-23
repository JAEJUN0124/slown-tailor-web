// Shared shapes for the mockup's content files.

export type ArtKind =
  | "suit"
  | "jacket"
  | "coat"
  | "shirt"
  | "knit"
  | "trousers"
  | "skirt"
  | "dress"
  | "tie"
  | "bowtie"
  | "square"
  | "cufflinks"
  | "shoes"
  | "pump"
  | "bag"
  | "case"
  | "belt"
  | "wallet";

/** Drawing variants; each kind reads only the ones that apply to it. */
export type ArtVariant = "tux" | "db" | "wide" | "bow" | "vest" | "cardigan" | "belted" | "loafer";

export type Art = {
  kind: ArtKind;
  /** Main colour of the item. */
  color: string;
  variant?: ArtVariant;
  /** Studio backdrop: 0 neutral, 1 warm, 2 cool, 3 ivory. */
  tone?: number;
};

export type Gender = "MEN" | "WOMEN" | "UNISEX";

/** Top-level shelves of the brand shop. */
export type Shelf = "men" | "women" | "shoes-acc";

export type Tag = "재입고" | "단독" | "이번주신상";

export type Swatch = { id: string; color: string; name: string };

/** Size runs; each has its own chart on the product page. */
export type SizeKey =
  | "menTailoring"
  | "womenTailoring"
  | "menShirt"
  | "knit"
  | "menPants"
  | "womenPants"
  | "menShoes"
  | "womenShoes"
  | "belt"
  | "free";

export type Product = Art & {
  id: string;
  model: string;
  gender: Gender;
  /** "(MEN) Single Breasted Wool Suit - Charcoal" */
  name: string;
  title: string;
  colorName: string;
  colorKo: string;
  shelf: Shelf;
  sub: string;
  price: number;
  /** Set when the item is discounted (outlet). */
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  likes: number;
  tag?: Tag;
  soldOut?: boolean;
  isNew?: boolean;
  outlet?: boolean;
  sizeKey: SizeKey;
  sizes: string[];
  /** Sizes shown but not orderable. */
  soldOutSizes: string[];
  /** Every colourway of the model, this one included. */
  swatches: Swatch[];
  code: string;
  season: string;
  fit: string;
  material: string;
  desc: string;
  keywords: string;
  /** Pseudo metrics that drive the ranking and sort orders. */
  sales: number;
  clicks: number;
  order: number;
  fastShipping: boolean;
  pickup: boolean;
  giftWrap: boolean;
};
