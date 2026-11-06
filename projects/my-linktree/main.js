/*
 * main.js · My Linktree.
 * Botão de compartilhar: usa o compartilhamento do celular quando existe,
 * senão copia o link da página e confirma (ou explica a falha) com aviso.
 */
document.documentElement.style.setProperty("--lt-cor", "#1f1f1f");

document.getElementById("btn-compartilhar").addEventListener("click", async () => {
  const url = location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: "Links de Douglas Novato", url });
      LT.aviso("Links compartilhados.");
      return;
    }
    await navigator.clipboard.writeText(url);
    LT.aviso("Link copiado. É só colar onde quiser.");
  } catch (e) {
    if (e && e.name === "AbortError") return LT.aviso("Compartilhamento cancelado.", "info");
    LT.aviso(`Não foi possível copiar. Copie este endereço: ${url}`, "erro", 7000);
  }
});
/* fim de main.js */
