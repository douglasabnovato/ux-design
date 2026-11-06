// INICIO: SEÇÃO HEADER - JAVASCRIPT
export function openWhatsApp(message, phone = "5532988367667") {
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank");
}
// FIM: SEÇÃO HEADER - JAVASCRIPT