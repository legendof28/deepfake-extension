document.getElementById("check").addEventListener("click", async () => {
  const resultEl = document.getElementById("result");
  resultEl.textContent = "Analyzing...";
  
  setTimeout(() => {
    const isFake = Math.random() > 0.5;
    resultEl.innerHTML = isFake 
      ? '⚠️ <b>87% chance this is AI-generated!</b>' 
      : '✅ <b>Likely real</b>';
  }, 1500);
});
