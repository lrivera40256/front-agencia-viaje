export function loadEpaycoScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('epayco-checkout-js')) return resolve()
    const script = document.createElement('script')
    script.id = 'epayco-checkout-js'
    script.src = import.meta.env.VITE_EPAYCO_CHECKOUT_URL
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('No se pudo cargar ePayco'))
    document.body.appendChild(script)
  })
}
