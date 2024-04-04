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

        const transformer = new Transformer();
        const { root, features } = transformer.transform(source);
        const svgEl = createSVG(el, '1.5em');
        const options = {
          nodeMinHeight: 16,
          pan: true
        };
        const markmapSVG = Markmap.create(svgEl, options, root);
        markmapSVG.rescale(1);
        const s = d3.select(svgEl);
        const g = s.select('g');
        console.log(g);
        g.transition().duration(750).attr('transform', 'translate(7,70) scale(1)');
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
