import * as d3 from "d3";

export function createSVG(containerEl: HTMLElement, height?: string): SVGElement {
  // removeExistingSVG();
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as unknown as SVGElement;
  console.log(svg)
  const s = d3.select(svg);
  const g = s.select('g');
  const transform = height ? "translate(7," + parseFloat(height.slice(height.indexOf(':') + 1))/2 + ") scale(1)" : "translate(7,70) scale(1)";
  g.transition().duration(750).attr('transform', transform);


  height = height || 'height: 100%';
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