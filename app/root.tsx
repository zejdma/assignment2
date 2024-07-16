import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import MainNavigation from "~/components/MainNavigation";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import { Product } from "./types/product";
import { storeCart, getStoredCart } from "./data/cart";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const cart = useLoaderData<Product[]>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-body pt-2 pr-4 pb-4 pl-4 md:pt-4 md:pr-16 md:pb-16 md:pl-16">
        <header>
          <MainNavigation cart={cart} />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export async function loader() {
  const products = await getStoredCart();
  return products;
}

export async function action({ cartItem }: { cartItem: Product | undefined }) {
  if (cartItem === undefined) {
    await storeCart("");
  } else {
    const existingCart = await getStoredCart();
    const updatedNotes = existingCart.concat(cartItem);
    await storeCart(updatedNotes);
  }
}
