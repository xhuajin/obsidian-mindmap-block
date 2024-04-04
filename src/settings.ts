import { App, PluginSettingTab } from "obsidian";

import Mindmap from "./main";

export interface MindmapSettings {
  asetting: string;
}

export const DEFAULT_SETTINGS: MindmapSettings = {
  asetting: "default",
}

export class SampleSettingTab extends PluginSettingTab {
  plugin: Mindmap;
  
  constructor(app: App, plugin: Mindmap) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this
    containerEl.empty()

    containerEl.createEl('h1', { text: 'Mindmap settings' });
  }
}