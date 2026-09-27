import { shop } from '../data/shop'

export function whatsappUrl(message: string) {
  const text = encodeURIComponent(message.trim())
  return `https://wa.me/${shop.whatsapp}?text=${text}`
}

export function fabricOrderMessage(
  fabricName: string,
  pricePerMeter: number,
  colorName?: string,
) {
  const colorLine = colorName ? `• Colour: ${colorName}\n` : ''
  return `Assalam o Alaikum Khan Cloth!

I want to order fabric:
• Fabric: ${fabricName}
${colorLine}• Price shown: Rs ${pricePerMeter}/meter (please confirm)
• Meters needed: (e.g. 3.5 – 4 for shalwar kameez)
• City / Address: 
• Phone: 

Free delivery all over Pakistan — usually 2–4 working days after confirmation.`
}

export function generalOrderMessage() {
  return `Assalam o Alaikum Khan Cloth!

I want to order fabric / ask about availability.
• Fabric interest: 
• Colour: 
• Meters: (e.g. 3.5 – 4 for shalwar kameez)
• City / Address: 
• Phone: 

Free delivery all over Pakistan.`
}

export function tailoringMessage() {
  return `Assalam o Alaikum Khan Cloth!

I want shalwar kameez stitching.
• Prefer: Shop measurement / I will share measurements
• Measurements (if ready): 
• Fabric: (from shop / sending my own)
• City / Delivery address: 
• Phone: `
}
