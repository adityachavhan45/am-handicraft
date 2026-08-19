import { CollectionBanner } from "@/components/CollectionBanner";
import { ProductListingClient } from "@/components/ProductListingClient";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <>
      <CollectionBanner
        title="Shop Handcrafted Decor"
        text="Browse artisan-made pieces for homes, gifting, festive styling, and meaningful everyday spaces."
        image="https://cdn.shopify.com/s/files/1/0709/1522/7956/files/Handicrafts_Image_Jan_5_2026_02_05_23_PM.png?v=1767602490"
        eyebrow="Premium Frontend Demo"
      />
      <ProductListingClient products={products} />
    </>
  );
}
