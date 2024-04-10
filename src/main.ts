import * as d3 from 'd3';

import { DEFAULT_SETTINGS, MindmapSettings } from './settings';

import { Markmap } from 'markmap-view';
import { Plugin } from 'obsidian';
import { Transformer } from 'markmap-lib';
import { createSVG } from './mindmap-svg';

export default class Mindmap extends Plugin {
	settings: MindmapSettings;

	async onload() {
    this.registerMarkdownCodeBlockProcessor(
      'mindmap', 
      async (source, el, ctx) => {
        let height = undefined;
        if (source.startsWith('---\n')) {
          source = source.slice(4);
          height = source.slice(0, source.indexOf('\n---'));
        }
        
        const transformer = new Transformer();
        const { root, features } = transformer.transform(source);
        const svgEl = createSVG(el, height);
        const options = {
          nodeMinHeight: 16,
          pan: true
        };
        
        const markmapSVG = Markmap.create(svgEl, options, root);
        markmapSVG.rescale(1);
        const s = d3.select(svgEl);
        const g = s.select('g');
        
        const transform = height ? "translate(7," + parseFloat(height.slice(height.indexOf(':') + 1))/2 + ") scale(1)" : "translate(7,70) scale(1)";
        g.transition().duration(750).attr('transform', transform);
      }
    );
  }

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
