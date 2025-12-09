export async function iniciarPagoCuota(id: number) {
  const res = await fetch(`http://localhost:3333/quota/pay/${id}`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error('Error al iniciar pago')
  return res.json()
}