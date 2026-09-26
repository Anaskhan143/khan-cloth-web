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
• Meters needed: 
• City / Address: 
• Phone: 

Free delivery all over Pakistan — please confirm.`
}

export function generalOrderMessage() {
  return `Assalam o Alaikum Khan Cloth!

I want to order fabric / ask about availability.
• Fabric interest: 
• Meters: 
• City / Address: 
• Phone: 

Free delivery all over Pakistan.`
}

export function tailoringMessage() {
  return `Assalam o Alaikum Khan Cloth!

I am interested in shalwar kameez stitching / measurement booking.
• Preferred visit day: 
• Phone: `
}
