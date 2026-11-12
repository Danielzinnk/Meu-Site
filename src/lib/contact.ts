export const WHATSAPP_NUMBER = '5561981199161';
export const WHATSAPP_DISPLAY = '(61) 98119-9161';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = 'daniellima0809@hotmail.com';
export const INSTAGRAM = 'https://www.instagram.com/daniel_p.keller?obrf=MnMzb2R2bDcxaW40';
export const GITHUB = 'https://github.com/Danielzinnk';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
