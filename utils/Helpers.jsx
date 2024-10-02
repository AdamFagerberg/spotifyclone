export function CalcTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000).toFixed(0);

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function CheckVisibility(containerRef) {
  const container = containerRef.current;
  if (!container) return;

  const items = container.querySelectorAll(".playlist-item");
  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (rect.left < containerRect.left || rect.right > containerRect.right) {
      item.style.visibility = "hidden";
    } else {
      item.style.visibility = "visible";
    }
  });
}
