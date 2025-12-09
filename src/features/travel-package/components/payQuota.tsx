  import { useEffect } from 'react'
  import axios from 'axios'
  declare global {
    interface Window {
      ePayco: any
    }
  }
  export default function BotonPago({ quotaId }) {
    useEffect(() => {
      const script = document.createElement('script')
      script.src = 'https://checkout.epayco.co/checkout.js'
      script.async = true
      document.body.appendChild(script)
    }, [])

    const handlePay = async () => {
      const res = await axios.post(`http://localhost:3333/quota/pay/${quotaId}`)
      const data = res.data

      const handler = window.ePayco.checkout.configure({
        key: data.publicKey,
        test: data.test,
      })
      console.log(data);
      
      handler.open({
        name: "Agencia de Viajes",
        description: data.description,
        invoice: data.invoice,
        currency: data.currency,
        amount: 199999,
        tax_base: "0",
        tax: "0",
        country: "CO",
        lang: "es",
        response: "http://localhost:8080/travel-packages/68e09bac47ac265f8a06b4b9",
        confirmation: data.confirmationUrl,
        methodconfirmation: 'POST',  

      })
    }

    return <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold mb-2" onClick={handlePay}>Pagar cuota</button>
  }
