export function createSVG(containerEl: HTMLElement, height?: string): SVGElement {
  height = height || 'height: 100%';
  removeExistingSVG();
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as unknown as SVGElement;
  svg.id = 'markmap';
  svg.setAttr('style', 'width: 100%;' + height + "px;");
  
  containerEl.appendChild(svg);
  return svg;
}

export function removeExistingSVG() {
  const existing = document.getElementById('markmap');
  if(existing && existing.parentElement) {
      existing.parentElement.removeChild(existing);
  }
}

export function getComputedCss(el: HTMLElement) {
  const computed = getComputedStyle(el);
  const color = computed.getPropertyValue('--text-normal');
  const font = `1em ${computed.getPropertyValue('--default-font')}`;
  return { color, font };
}