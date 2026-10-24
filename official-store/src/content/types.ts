// Shared shapes for the mockup's content files.

export type ArtKind =
  | "suit"
  | "jacket"
  | "blouson"
  | "coat"
  | "shirt"
  | "tee"
  | "knit"
  | "trousers"
  | "skirt"
  | "dress"
  | "square"
  | "cap"
  | "shoes"
  | "belt"
  | "bag"
  | "case"
  | "wallet";

/** Drawing variants; each kind reads only the ones that apply to it. */
export type ArtVariant =
  | "db"
  | "wide"
  | "tapered"
  | "shorts"
  | "jeans"
  | "bow"
  | "vest"
  | "cardigan"
  | "polo"
  | "vneck"
  | "turtle"
  | "zip"
  | "hood"
  | "short"
  | "long"
  | "belted"
  | "leather"
  | "denim"
  | "down";

export type Art = {
  kind: ArtKind;
  /** Main colour of the item. */
  color: string;
  variant?: ArtVariant;
  /** Studio backdrop: 0 paper, 1 warm, 2 cool, 3 stone. */
  tone?: number;
};

/** Editorial "photos": still-life scenes drawn in SVG. */
export type SceneKind = "rail" | "hanger" | "atelier" | "interior" | "fold" | "fabric" | "facade" | "outfit";

export type Scene = {
  kind: SceneKind;
  /** Light and wall palette. */
  mood: "warm" | "cool" | "stone" | "dusk" | "paper" | "slate" | "umber";
  /** Garments shown in the scene (the first one leads). */
  items?: Art[];
  /** Mirror the composition. */
  flip?: boolean;
};

export type Gender = "men" | "women" | "unisex";

/** Second-level lines of the shop (see content/catalog). */
export type Line =
  | "knitwear"
  | "tailoring"
  | "outerwear"
  | "shirts"
  | "tops"
  | "dresses"
  | "skirts"
  | "trousers"
  | "denim"
  | "accessories";

export type SizeRun = "top" | "bottom" | "denim" | "women-top" | "women-bottom" | "free";

export type Swatch = { id: string; color: string; name: string; tone: number };

export type Product = Art & {
  id: string;
  model: string;
  gender: Gender;
  line: Line;
  /** Third-level section key inside the line, when it has one. */
  sub?: string;
  /** Korean product name without the colour, e.g. "울 캐시미어 하프 집업 니트". */
  name: string;
  /** "[10/27 예약 발송]", "[유니섹스]"… shown before the name in lists. */
  prefix?: string;
  nameEn: string;
  tagline: string;
  colorName: string;
  price: number;
  isNew: boolean;
  essential: boolean;
  best: boolean;
  upcoming: boolean;
  soldOut: boolean;
  sizeRun: SizeRun;
  sizes: string[];
  soldOutSizes: string[];
  /** Every colourway of the model, this one included. */
  swatches: Swatch[];
  material: string;
  materialTitle: string;
  desc: string;
  keywords: string;
  rating: number;
  reviews: number;
  /** Pseudo metrics behind the sort orders. */
  sales: number;
  order: number;
};
