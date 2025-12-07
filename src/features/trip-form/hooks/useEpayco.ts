import { useEffect } from "react";

export const useEpayco = () => {
  const key = import.meta.env.VITE_EPAYCO_PUBLIC_KEY;
  const checkoutUrl = import.meta.env.VITE_EPAYCO_CHECKOUT_URL;

  // 🧩 Cargar el script solo una vez
  useEffect(() => {
    const existingScript = document.getElementById("epayco-checkout");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = checkoutUrl;
      script.id = "epayco-checkout";
      script.async = true;
      script.onload = () => console.log("✅ ePayco cargado correctamente");
      script.onerror = () => console.error("❌ Error al cargar ePayco");
      document.body.appendChild(script);
    }
  }, []);

  // 🔹 Abrir el checkout cuando se necesite
  const openEpaycoCheckout = (order: any) => {
    const epayco = (window as any).ePayco;
    if (!epayco) {
      alert("El script de ePayco aún no se ha cargado. Intenta de nuevo en un momento.");
      return;
    }

    const handler = epayco.checkout.configure({
      key,
      test: true,
    });

    handler.open({
      external: false,
      amount: order.total,
      name: order.productName,
      description: order.productDescription,
      currency: "cop",
      country: "CO",
      response: import.meta.env.VITE_EPAYCO_RESPONSE_URL,
      confirmation: import.meta.env.VITE_EPAYCO_CONFIRMATION_URL,
    });
  };

  return { openEpaycoCheckout };
};
