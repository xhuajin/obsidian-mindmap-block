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
        const { root, features } = await transformer.transform(source);
        
        const svgEl = createSVG(el, height);
        const options = {
          nodeMinHeight: 16,
          pan: true
        };
        try {
          const markmapSVG = Markmap.create(svgEl, options, root);
        } catch (error) {
            console.error(error);
        }
        // markmapSVG.rescale(1);
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
